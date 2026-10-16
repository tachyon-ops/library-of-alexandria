"use server";

import { createTopic, getTopic, requestResearch } from "@lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@/lib/data";

const autoDepth = () => Number(process.env.AUTO_EXPAND_DEPTH ?? 1);

export async function startTopic(formData: FormData): Promise<void> {
  const title = String(formData.get("title") ?? "").trim();
  const brief = String(formData.get("brief") ?? "").trim() || null;
  const parentId = String(formData.get("parentId") ?? "") || null;
  if (!title) return;
  const topic = await createTopic(sql(), { title, brief, parentId });
  if (formData.get("research") === "on") await requestResearch(sql(), topic.id, autoDepth());
  revalidatePath("/", "layout");
  redirect(`/topic/${topic.slug}`);
}

export async function researchTopic(formData: FormData): Promise<void> {
  const id = String(formData.get("topicId") ?? "");
  const depth = formData.get("withBranches") === "on" ? autoDepth() : 0;
  const topic = id ? await getTopic(sql(), id) : null;
  if (!topic) return;
  await requestResearch(sql(), topic.id, depth);
  revalidatePath("/", "layout");
}
