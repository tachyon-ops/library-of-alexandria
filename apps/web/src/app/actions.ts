"use server";

import { inferBranchProposals, reassessTopicTaxonomy, type SearchTreeNode, type Topic } from "@lib/core";
import {
  createTopic,
  getChildren,
  getTopic,
  linkTopics,
  listTree,
  moveTopic,
  requestResearch,
  searchLibrary,
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
async function triggerRemoteWorker(): Promise<void> {
  const token = process.env.GITHUB_DISPATCH_TOKEN?.trim();
  const repo = process.env.GITHUB_REPO?.trim();
  if (!token || !repo) return;
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

  const proposals = inferBranchProposals(rawQuery, treeNodes, rawResults.topics);
  const organisedTopics: Topic[] = [];

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
      });
      const parentPrefix = proposal.parentTitle ? ` under ${proposal.parentTitle}` : "";
      await setTopicSummaryIfEmpty(
        db,
        topic.id,
        `${proposal.title} is a canonical scientific branch${parentPrefix} investigating ${proposal.brief.charAt(0).toLowerCase()}${proposal.brief.slice(1)}`,
      );
    } else {
      const assessment = reassessTopicTaxonomy(topic, treeNodes);
      if (assessment.shouldMove && assessment.recommendedParentId !== topic.parentId) {
        topic = await moveTopic(db, topic.id, assessment.recommendedParentId);
      }
      for (const link of assessment.crossLinks) {
        await linkTopics(db, topic.id, link.linkedTopicId, link.relation, link.note);
      }
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
    for (const t of organisedTopics) {
      await requestResearch(db, t.id, autoDepth());
    }
    await triggerRemoteWorker();
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
  const assessment = reassessTopicTaxonomy(topic, treeNodes);
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


