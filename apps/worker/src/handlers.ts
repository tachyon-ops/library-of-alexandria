import { planTopic, readSources, reviewTopic, scanWeb, type Llm } from "@lib/agents";
import { normaliseDesign, tierForClaim, type StudyDesign } from "@lib/core";
import type { SourceAdapter } from "@lib/crawlers";
import * as repo from "@lib/db";
import type { Job, Sql } from "@lib/db";

export interface Config {
  sourcesPerQuery: number;
  readerBatch: number;
  /** Sources read per topic per research run; the rest wait for "Research again". */
  maxSourcesPerTopic: number;
  maxWebSearchesPerJob: number;
  /** Levels of subtopics researched automatically below the topic a person starts. */
  autoExpandDepth: number;
  /** Hard floor on how deep the tree may grow from automatic planning. */
  maxTreeDepth: number;
}

export interface Deps {
  sql: Sql;
  llm: Llm;
  literature: SourceAdapter[];
  trials: SourceAdapter[];
  config: Config;
  log: (msg: string) => void;
}

export function configFromEnv(env = process.env): Config {
  const n = (v: string | undefined, d: number) => (v && Number.isFinite(Number(v)) ? Number(v) : d);
  return {
    sourcesPerQuery: n(env.SOURCES_PER_QUERY, 10),
    readerBatch: 10,
    maxSourcesPerTopic: n(env.MAX_SOURCES_PER_TOPIC, 60),
    maxWebSearchesPerJob: n(env.MAX_WEB_SEARCHES_PER_JOB, 8),
    autoExpandDepth: n(env.AUTO_EXPAND_DEPTH, 1),
    maxTreeDepth: 6,
  };
}

export async function runJob(d: Deps, job: Job): Promise<void> {
  const topic = job.topicId ? await repo.getTopic(d.sql, job.topicId) : null;
  if (!topic) throw new Error(`job ${job.id}: topic not found`);
  const ancestors = await repo.getAncestors(d.sql, topic.id);
  const path = ancestors.map((a) => a.title);
  const ctx = { topic: { title: topic.title, brief: topic.brief }, path };

  switch (job.kind) {
    case "plan": {
      await repo.setTopicStatus(d.sql, topic.id, "researching");
      const children = await repo.getChildren(d.sql, topic.id);
      const plan = await planTopic(d.llm, { ...ctx, existingChildren: children.map((c) => c.title) });
      // Enqueue harvest and scan for the current topic first so its own sources are collected before child branches.
      const litQueries = plan.queries.literature.length > 0 ? plan.queries.literature : [topic.title];
      await repo.enqueueJob(d.sql, "harvest", topic.id, { literature: litQueries, trials: plan.queries.trials });
      for (const task of plan.queries.web) await repo.enqueueJob(d.sql, "scan", topic.id, { task });

      const autoDepth = Number(job.payload.autoDepth ?? 0);
      const branchTitles = [...children.map((c) => c.title)];
      if (topic.depth < d.config.maxTreeDepth) {
        const known = new Set(children.map((c) => c.title.toLowerCase()));
        for (const s of plan.subtopics) {
          if (known.has(s.title.toLowerCase())) continue;
          known.add(s.title.toLowerCase());
          branchTitles.push(s.title);
          const child = await repo.createTopic(d.sql, { title: s.title, brief: s.brief, parentId: topic.id });
          await repo.setTopicSummaryIfEmpty(
            d.sql,
            child.id,
            `${s.title} is a sub-discipline of ${topic.title} examining ${s.brief.charAt(0).toLowerCase()}${s.brief.slice(1)}`,
          );
          if (autoDepth > 0) await repo.requestResearch(d.sql, child.id, autoDepth - 1);
        }
      }
      // Seeded children that were never researched follow the same rule.
      if (autoDepth > 0) {
        for (const c of children) if (c.status === "idle") await repo.requestResearch(d.sql, c.id, autoDepth - 1);
      }
      if (!topic.summary) {
        const baseOverview = topic.brief
          ? `${topic.title} examines ${topic.brief.charAt(0).toLowerCase()}${topic.brief.slice(1)}`
          : `${topic.title} synthesises primary scientific literature, clinical trials, and empirical evidence across this discipline.`;
        const subLine =
          branchTitles.length > 0 ? ` Core sub-disciplines include ${branchTitles.slice(0, 6).join("; ")}.` : "";
        await repo.setTopicSummaryIfEmpty(d.sql, topic.id, `${baseOverview}${subLine}`);
      }
      d.log(`plan ${topic.slug}: ${plan.subtopics.length} branches, ${litQueries.length} lit / ${plan.queries.trials.length} trial / ${plan.queries.web.length} web`);
      return;
    }

    case "harvest": {
      const rawLit = (job.payload.literature as string[] | undefined) ?? [];
      const lit = rawLit.length > 0 ? rawLit : [topic.title];
      const trials = (job.payload.trials as string[] | undefined) ?? [];
      const runs: [SourceAdapter, string][] = [
        ...lit.flatMap((q) => d.literature.map((a) => [a, q] as [SourceAdapter, string])),
        ...trials.flatMap((q) => d.trials.map((a) => [a, q] as [SourceAdapter, string])),
      ];
      let stored = 0;
      const failures: string[] = [];
      for (const [adapter, query] of runs) {
        try {
          const records = await adapter.search(query, { limit: d.config.sourcesPerQuery });
          stored += (await repo.upsertSources(d.sql, topic.id, records, query)).length;
        } catch (err) {
          failures.push(`${adapter.name} "${query}": ${(err as Error).message}`);
        }
      }
      // One dead source should not stop the topic; all of them failing should.
      if (runs.length > 0 && failures.length === runs.length) throw new Error(`every source failed:\n${failures.join("\n")}`);
      if (failures.length) d.log(`harvest ${topic.slug}: ${failures.length} source errors\n  ${failures.join("\n  ")}`);
      d.log(`harvest ${topic.slug}: ${stored} source links`);
      await repo.enqueueJob(d.sql, "extract", topic.id);
      return;
    }

    case "extract": {
      const batch = await repo.unreadSources(d.sql, topic.id, d.config.readerBatch);
      if (batch.length > 0) {
        const reading = await readSources(d.llm, { ...ctx, sources: batch });
        const designs = new Map<number, { design: StudyDesign; sampleSize: number | null }>();
        batch.forEach((s, i) => designs.set(i, { design: normaliseDesign(s.declaredDesign), sampleSize: s.sampleSize }));
        for (const s of reading.sources) {
          const src = batch[s.index]!;
          // The reader's classification refines the origin's; a declared synthesis or RCT is kept.
          const declared = normaliseDesign(src.declaredDesign);
          const design = declared !== "unknown" ? declared : s.design;
          const sampleSize = s.sampleSize > 0 ? s.sampleSize : src.sampleSize;
          designs.set(s.index, { design, sampleSize });
          await repo.setSourceDesign(d.sql, src.id, design, sampleSize);
        }
        for (const c of reading.claims) {
          await repo.insertClaim(d.sql, {
            topicId: topic.id,
            statement: c.statement,
            tier: tierForClaim(c.sourceIndexes.map((i) => designs.get(i)!)),
            controversy: c.controversy,
            direction: c.direction,
            confidence: c.confidence,
            rationale: c.rationale,
            sourceIds: c.sourceIndexes.map((i) => batch[i]!.id),
          });
        }
        for (const m of reading.milestones) {
          await repo.insertMilestone(d.sql, {
            topicId: topic.id,
            year: m.year,
            title: m.title,
            description: m.description,
            sourceId: batch[m.sourceIndex]!.id,
          });
        }
        await repo.markExtracted(d.sql, topic.id, batch.map((s) => s.id));
        d.log(`extract ${topic.slug}: ${batch.length} sources -> ${reading.claims.length} claims, ${reading.milestones.length} milestones`);
      }
      const readThisRun = Number(job.payload.read ?? 0) + batch.length;
      const remaining = await repo.countUnreadSources(d.sql, topic.id);
      const more = remaining > 0 && batch.length > 0 && readThisRun < d.config.maxSourcesPerTopic;
      await repo.enqueueJob(d.sql, more ? "extract" : "review", topic.id, more ? { read: readThisRun } : {}, more ? 0 : 5);
      return;
    }

    case "scan": {
      const task = String(job.payload.task ?? "");
      if (!task) return;
      const { entities } = await scanWeb(d.llm, { ...ctx, task, maxSearches: d.config.maxWebSearchesPerJob });
      for (const e of entities) await repo.upsertEntity(d.sql, topic.id, e);
      d.log(`scan ${topic.slug}: ${entities.length} entities for "${task}"`);
      return;
    }

    case "review": {
      const claims = await repo.topicClaims(d.sql, topic.id);
      const entities = await repo.topicEntities(d.sql, topic.id);
      const review = await reviewTopic(d.llm, {
        ...ctx,
        claims: claims.map((c) => ({
          statement: c.statement,
          tier: c.tier,
          controversy: c.controversy,
          sourceCount: c.sources.length,
          years: [...new Set(c.sources.map((s) => s.year).filter((y): y is number => y != null))].slice(0, 4),
        })),
        entityNames: entities.map((e) => `${e.name} (${e.kind})`),
      });
      for (const m of review.merges) {
        const keep = claims[m.keep]!.id;
        await repo.mergeClaims(d.sql, keep, m.drop.map((i) => claims[i]!.id));
        await repo.setClaimTier(d.sql, keep, tierForClaim(await repo.claimSourceDesigns(d.sql, keep)));
      }
      for (const l of review.labels) await repo.setClaimControversy(d.sql, claims[l.index]!.id, l.controversy);
      await repo.replaceControversies(
        d.sql,
        topic.id,
        review.controversies.map((c) => ({ kind: c.kind, note: c.note, claimIds: c.claimIndexes.map((i) => claims[i]!.id) })),
      );
      await repo.saveTopicReview(d.sql, topic.id, review.summary, review.gaps);
      d.log(`review ${topic.slug}: ${review.merges.length} merges, ${review.controversies.length} controversies`);
      return;
    }
  }
}
