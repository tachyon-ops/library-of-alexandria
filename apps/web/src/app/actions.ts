"use server";

import { createTopic, getTopic, requestResearch } from "@lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@/lib/data";

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

export async function startTopic(formData: FormData): Promise<void> {
  const title = String(formData.get("title") ?? "").trim();
  const brief = String(formData.get("brief") ?? "").trim() || null;
  const parentId = String(formData.get("parentId") ?? "") || null;
  if (!title) return;
  const topic = await createTopic(sql(), { title, brief, parentId });
  if (formData.get("research") === "on") {
    await requestResearch(sql(), topic.id, autoDepth());
    await triggerRemoteWorker();
  }
  revalidatePath("/", "layout");
  redirect(`/topic/${topic.slug}`);
}

export async function researchTopic(formData: FormData): Promise<void> {
  const id = String(formData.get("topicId") ?? "");
  const depth = formData.get("withBranches") === "on" ? autoDepth() : 0;
  const topic = id ? await getTopic(sql(), id) : null;
  if (!topic) return;
  await requestResearch(sql(), topic.id, depth);
  await triggerRemoteWorker();
  revalidatePath("/", "layout");
}
