"use server";

import { reassessTopicTaxonomyWithAi, resolveInquiryBranches } from "@lib/agents";
import { type SearchTreeNode, type Topic } from "@lib/core";
import {
  ALL_SEED_DOSSIERS,
  createTopic,
  getChildren,
  getTopic,
  linkTopics,
  listTree,
  logUsage,
  moveTopic,
  requestResearch,
  searchLibrary,
  seedTopicDossier,
  setTopicSummaryIfEmpty,
} from "@lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { normaliseTopicTitle, sql } from "@/lib/data";

const autoDepth = () => Number(process.env.AUTO_EXPAND_DEPTH ?? 1);

/**
 * When hosted on Vercel with GitHub Actions as the worker, optionally wake the
 * `worker.yml` workflow immediately via `workflow_dispatch` so jobs start right
 * away instead of waiting for the 15-minute cron schedule.
 */
export async function triggerRemoteWorker(): Promise<void> {
  const token = (
    process.env.GITHUB_DISPATCH_TOKEN ??
    process.env.GITHUB_TOKEN ??
    process.env.GH_TOKEN ??
    ""
  ).trim();
  if (!token) return;
  const repo = process.env.GITHUB_REPO?.trim() || "tachyon-ops/library-of-alexandria";
  const ref = process.env.GITHUB_REF?.trim() || "master";
  try {
    await fetch(`https://api.github.com/repos/${repo}/actions/workflows/worker.yml/dispatches`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({ ref }),
    });
  } catch {
    // Non-fatal: the scheduled GitHub Actions cron will still pick up the queued job.
  }
}

export async function wakeWorker(formData?: FormData): Promise<void> {
  await triggerRemoteWorker();
  const slug = String(formData?.get("slug") ?? "").trim();
  revalidatePath("/", "layout");
  if (slug) {
    revalidatePath(`/topic/${slug}`);
  }
}

/**
 * AI Tree Organiser action: takes a natural-language question or inquiry, decomposes it
 * into 1, 2, 3, or more canonical scientific branches, places each under its proper
 * parent discipline in the Tree of Knowledge, links intersecting branches, and queues
 * autonomous research.
 */
export async function organizeInquiry(formData: FormData): Promise<void> {
  const rawQuery = String(formData.get("query") ?? formData.get("title") ?? "").trim();
  if (!rawQuery) return;
  const shouldResearch = formData.get("research") !== "off";
  const customTitle = String(formData.get("customTitle") ?? "").trim();
  const customParentId = String(formData.get("customParentId") ?? "").trim();
  const customBrief = String(formData.get("customBrief") ?? "").trim();

  const db = sql();
  const [rawTree, rawResults] = await Promise.all([
    listTree(db),
    searchLibrary(db, rawQuery, 24),
  ]);

  const treeNodes: SearchTreeNode[] = rawTree.map((r) => ({
    id: r.id,
    parentId: r.parentId,
    slug: r.slug,
    title: normaliseTopicTitle(r.title),
    brief: r.brief,
    depth: r.depth,
  }));

  const proposals = await resolveInquiryBranches(rawQuery, treeNodes, rawResults.topics, {
    onUsage: (u) => {
      void logUsage(db, {
        jobId: null,
        role: u.role,
        model: u.model,
        inputTokens: u.inputTokens,
        outputTokens: u.outputTokens,
        webSearches: u.webSearches,
      }).catch(() => {});
    },
  });
  let hasManualParentOverride = false;

  if (proposals.length === 1) {
    const first = proposals[0]!;
    if (customTitle && customTitle.toLowerCase() !== first.title.toLowerCase()) {
      const matchedByCustomTitle = treeNodes.find(
        (n) => n.title.toLowerCase() === customTitle.toLowerCase(),
      );
      first.title = customTitle;
      first.existingTopicId = matchedByCustomTitle?.id ?? null;
      first.existingTopicSlug = matchedByCustomTitle?.slug ?? null;
      if (!matchedByCustomTitle) {
        first.canonicalSlug = null;
      }
    }
    if (customParentId) {
      const chosenParent = treeNodes.find((n) => n.id === customParentId);
      if (chosenParent && chosenParent.id !== first.parentId) {
        first.parentId = chosenParent.id;
        first.parentTitle = chosenParent.title;
        first.parentSlug = chosenParent.slug;
        hasManualParentOverride = true;
      }
    }
    if (customBrief) {
      first.brief = customBrief;
    }
  }

  const organisedTopics: Topic[] = [];
  const seededDossierTopicIds = new Set<string>();

  for (const proposal of proposals) {
    let topic: Topic | null = null;

    if (proposal.existingTopicId) {
      topic = await getTopic(db, proposal.existingTopicId);
    }

    if (!topic && proposal.parentId) {
      const siblings = await getChildren(db, proposal.parentId);
      topic =
        siblings.find((s) => s.title.toLowerCase() === proposal.title.toLowerCase()) ??
        null;
    }

    if (!topic) {
      topic = await createTopic(db, {
        title: proposal.title,
        brief: proposal.brief,
        parentId: proposal.parentId,
        slug: proposal.canonicalSlug ?? null,
      });
      const parentPrefix = proposal.parentTitle ? ` under ${proposal.parentTitle}` : "";
      await setTopicSummaryIfEmpty(
        db,
        topic.id,
        `${proposal.title} is a canonical scientific branch${parentPrefix} investigating ${proposal.brief.charAt(0).toLowerCase()}${proposal.brief.slice(1)}`,
      );
    } else if (hasManualParentOverride && proposal.parentId && topic.parentId !== proposal.parentId) {
      topic = await moveTopic(db, topic.id, proposal.parentId);
    } else {
      const assessment = await reassessTopicTaxonomyWithAi(undefined, topic, treeNodes, "", {
        onUsage: (u) => {
          void logUsage(db, {
            jobId: null,
            role: u.role,
            model: u.model,
            inputTokens: u.inputTokens,
            outputTokens: u.outputTokens,
            webSearches: u.webSearches,
          }).catch(() => {});
        },
      });
      if (assessment.shouldMove && assessment.recommendedParentId !== topic.parentId) {
        topic = await moveTopic(db, topic.id, assessment.recommendedParentId);
      }
      for (const link of assessment.crossLinks) {
        await linkTopics(db, topic.id, link.linkedTopicId, link.relation, link.note);
      }
    }

    if (proposal.crossLinkIds && proposal.crossLinkIds.length > 0) {
      for (const crossId of proposal.crossLinkIds) {
        if (crossId !== topic.id && crossId !== topic.parentId) {
          await linkTopics(
            db,
            topic.id,
            crossId,
            "intersects",
            `Cross-linked by AI Taxonomist for shared scientific mechanisms across ${topic.title}.`,
          );
        }
      }
    }

    const matchingDossier =
      (proposal.canonicalSlug ? ALL_SEED_DOSSIERS[proposal.canonicalSlug] : undefined) ??
      ALL_SEED_DOSSIERS[topic.slug];
    if (matchingDossier) {
      await seedTopicDossier(db, topic.id, matchingDossier);
      seededDossierTopicIds.add(topic.id);
      topic = (await getTopic(db, topic.id)) ?? topic;
    }

    organisedTopics.push(topic);
  }

  // Cross-link branches when a single inquiry spawns or unifies multiple canonical topics
  if (organisedTopics.length >= 2) {
    for (let i = 0; i < organisedTopics.length; i++) {
      for (let j = i + 1; j < organisedTopics.length; j++) {
        const a = organisedTopics[i]!;
        const b = organisedTopics[j]!;
        await linkTopics(
          db,
          a.id,
          b.id,
          "intersects",
          `Co-organised by AI from research inquiry connecting ${a.title} and ${b.title}.`,
        );
      }
    }
  }

  if (shouldResearch) {
    let enqueuedAny = false;
    for (const t of organisedTopics) {
      if (seededDossierTopicIds.has(t.id)) continue;
      await requestResearch(db, t.id, autoDepth());
      enqueuedAny = true;
    }
    if (enqueuedAny) {
      await triggerRemoteWorker();
    }
  }

  revalidatePath("/", "layout");
  const primary = organisedTopics[0];
  if (!primary) return;

  if (organisedTopics.length > 1) {
    const slugs = organisedTopics.map((t) => t.slug).join(",");
    redirect(`/topic/${primary.slug}?spawned=${encodeURIComponent(slugs)}`);
  }
  redirect(`/topic/${primary.slug}`);
}

export async function startTopic(formData: FormData): Promise<void> {
  return organizeInquiry(formData);
}

export async function reparentTopic(formData: FormData): Promise<void> {
  const topicId = String(formData.get("topicId") ?? "").trim();
  const newParentId = String(formData.get("parentId") ?? "").trim();
  if (!topicId || !newParentId) return;
  const db = sql();
  const topic = await getTopic(db, topicId);
  if (!topic || topic.parentId === newParentId) return;
  await moveTopic(db, topic.id, newParentId);
  revalidatePath("/", "layout");
  revalidatePath(`/topic/${topic.slug}`);
}

export async function researchTopic(formData: FormData): Promise<void> {
  const id = String(formData.get("topicId") ?? "");
  const depth = formData.get("withBranches") === "on" ? autoDepth() : 0;
  const db = sql();
  const topic = id ? await getTopic(db, id) : null;
  if (!topic) return;

  const rawTree = await listTree(db);
  const treeNodes: SearchTreeNode[] = rawTree.map((r) => ({
    id: r.id,
    parentId: r.parentId,
    slug: r.slug,
    title: normaliseTopicTitle(r.title),
    brief: r.brief,
    depth: r.depth,
  }));
  const assessment = await reassessTopicTaxonomyWithAi(undefined, topic, treeNodes, "", {
    onUsage: (u) => {
      void logUsage(db, {
        jobId: null,
        role: u.role,
        model: u.model,
        inputTokens: u.inputTokens,
        outputTokens: u.outputTokens,
        webSearches: u.webSearches,
      }).catch(() => {});
    },
  });
  if (assessment.shouldMove && assessment.recommendedParentId !== topic.parentId) {
    await moveTopic(db, topic.id, assessment.recommendedParentId);
  }
  for (const link of assessment.crossLinks) {
    await linkTopics(db, topic.id, link.linkedTopicId, link.relation, link.note);
  }

  await requestResearch(db, topic.id, depth);
  await triggerRemoteWorker();
  revalidatePath("/", "layout");
}
