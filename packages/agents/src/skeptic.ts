import { z } from "zod";
import { CONTROVERSY } from "@lib/core";
import type { Llm } from "./llm";
import { LIBRARIAN, topicContext } from "./prompts";

export const ReviewSchema = z.object({
  summary: z.string().describe("4 to 8 sentences: the state of knowledge, strongest findings first, with numbers"),
  gaps: z.array(z.string()).describe("Open questions the evidence does not answer yet"),
  merges: z.array(z.object({ keep: z.number().int(), drop: z.array(z.number().int()) })).describe("Duplicate claims to merge"),
  labels: z.array(z.object({ index: z.number().int(), controversy: z.enum(CONTROVERSY) })).describe("Only claims whose label should change"),
  controversies: z.array(
    z.object({
      kind: z.enum(["contradiction", "contested", "fringe", "commercial_hype", "weak_evidence", "replication_failure"]),
      claimIndexes: z.array(z.number().int()),
      note: z.string().describe("What is disputed, by whom, and what would settle it"),
    }),
  ),
});
export type Review = z.infer<typeof ReviewSchema>;

export interface ReviewableClaim {
  statement: string;
  tier: string;
  controversy: string;
  sourceCount: number;
  years: number[];
}

/** Skeptic: merges duplicates, finds contradictions and hype, and writes the topic summary. */
export async function reviewTopic(
  llm: Llm,
  input: { topic: { title: string; brief: string | null }; path: string[]; claims: ReviewableClaim[]; entityNames: string[] },
): Promise<Review> {
  const list = input.claims
    .map((c, i) => `[${i}] (${c.tier}, ${c.controversy}, ${c.sourceCount} src, ${c.years.join("/") || "?"}) ${c.statement}`)
    .join("\n");
  const review = await llm.structured({
    role: "skeptic",
    schema: ReviewSchema,
    maxTokens: 6000,
    system: `${LIBRARIAN}
You are the skeptic. Your job is calibration.
- Merge claims that state the same finding.
- Flag contradictions between claims, single-study claims treated as established, and treatments marketed ahead of evidence.
- Keep frontier ideas visible; label them, do not delete them.
- The summary leads with what is best supported (T1 > T6) and states plainly where evidence is thin.`,
    prompt: `${topicContext(input.topic, input.path)}
Claims (index, tier, label, source count, years):
${list || "(none yet)"}
Entities found on the web: ${input.entityNames.join("; ") || "none"}`,
  });
  const n = input.claims.length;
  const ok = (i: number) => Number.isInteger(i) && i >= 0 && i < n;
  const kept = new Set<number>();
  const dropped = new Set<number>();
  const merges: Review["merges"] = [];
  for (const m of review.merges) {
    if (!ok(m.keep) || dropped.has(m.keep)) continue;
    const drop = m.drop.filter((d) => ok(d) && d !== m.keep && !kept.has(d) && !dropped.has(d) && dropped.add(d));
    if (drop.length > 0) {
      kept.add(m.keep);
      merges.push({ keep: m.keep, drop });
    }
  }
  return {
    ...review,
    merges,
    labels: review.labels.filter((l) => ok(l.index)),
    controversies: review.controversies.map((c) => ({ ...c, claimIndexes: c.claimIndexes.filter(ok) })),
  };
}
