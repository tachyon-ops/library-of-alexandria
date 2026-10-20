import { z } from "zod";
import { CONTROVERSY } from "@lib/core";
import type { Llm } from "./llm";
import { LIBRARIAN, topicContext } from "./prompts";

export const BenchmarkSchema = z.object({
  metric: z.string().describe("Short metric or percentage (e.g. '31.1%', '8.6%', '~85%')"),
  label: z.string().describe("What this benchmark measures across the population or clinical subgroup"),
  source: z.string().describe("Key citation or paper reference (e.g. 'PMC8244281', 'Seifer 2023')"),
  sourceUrl: z.string().optional().describe("URL to paper or trial registry if available"),
});

export const LeverSchema = z.object({
  name: z.string().describe("Intervention name (e.g. 'Natural-cycle FET', 'Growth hormone', 'Rapamycin')"),
  category: z.string().describe("Decision stage or operational phase (e.g. 'Preparation & Transfer', 'Ovarian adjuncts', 'Cellular & Nuclear')"),
  description: z.string().describe("Brief clinical description or mechanism"),
  bestEvidence: z.string().describe("Key trial, RCT, or systematic review (e.g. 'COMPETE RCT, 902 ovulatory women')"),
  effect: z.string().describe("Measured effect with numbers (e.g. 'Live birth 54.0% vs 43.0% · RR 1.26 (1.10–1.44)')"),
  reading: z.string().describe("Clinical / mechanistic reading or nuance (why it works/fails, subgroup limits)"),
  verdict: z.enum([
    "Supported",
    "Targeted",
    "Guideline",
    "Weak",
    "Not supported",
    "Trial only",
    "Lab only",
    "Case by case",
  ]).describe("Evaluated verdict based on the evidence"),
  sourceUrl: z.string().optional().describe("URL to paper or trial if available"),
});

export const ArticleSectionSchema = z.object({
  kicker: z.string().optional().describe("Short editorial section kicker (e.g. 'Section I · Primary Literature')"),
  heading: z.string().describe("Section heading"),
  paragraphs: z.array(z.string()).describe("1 to 3 substantive narrative paragraphs with numbers, study designs, and citations"),
  callout: z.string().optional().describe("Optional key quantitative highlight or clinical reading callout"),
});

export const TopicArticleSchema = z.object({
  title: z.string().describe("Editorial monograph title for the branch"),
  subtitle: z.string().describe("Sub-headline framing the scientific scope and empirical certainty"),
  synopsis: z.string().describe("Executive synopsis paragraph summarizing what is settled vs contested"),
  sections: z.array(ArticleSectionSchema).default([]).describe("2 to 4 editorial blog-style sections walking through the primary research, mechanisms, and debates"),
  conclusions: z.string().describe("Calibrated conclusions paragraph synthesising actionable findings and next sweeps"),
  keyTakeaways: z.array(z.string()).default([]).describe("3 to 5 bullet takeaways with numbers and study grades"),
});

export const SynthesisSchema = z.object({
  benchmarks: z.array(BenchmarkSchema).default([]).describe("2 to 4 baseline probability benchmarks or hard numbers establishing the prior odds"),
  levers: z.array(LeverSchema).default([]).describe("Key interventions/levers evaluated as a decision ledger, stratified across subgroups"),
  clinicalQuestions: z.array(z.string()).default([]).describe("3 to 5 sharp questions to ask a specialist or clinic consultation"),
  sweepQueue: z.array(z.string()).default([]).describe("3 to 5 open frontiers or trials in progress queued for the next research sweep"),
  article: TopicArticleSchema.optional().describe("Blog-style State of the Field research article with synopsis, narrative sections, conclusions, and key takeaways"),
});

export const ReviewSchema = z.object({
  summary: z.string().describe("4 to 8 sentences: the state of knowledge, strongest findings first, with numbers"),
  gaps: z.array(z.string()).describe("Open questions the evidence does not answer yet"),
  synthesis: SynthesisSchema.optional().describe("Structured decision ledger: baseline odds benchmarks, evaluated levers, clinic questions, and sweep queue"),
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
You are the skeptic and field chronicler. Your job is calibration and editorial synthesis.
- Merge claims that state the same finding.
- Flag contradictions between claims, single-study claims treated as established, and treatments marketed ahead of evidence.
- Keep frontier ideas visible; label them, do not delete them.
- The summary leads with what is best supported (T1 > T6) and states plainly where evidence is thin.
- Synthesize an evaluated decision ledger (benchmarks, levers, clinical questions, sweep queue, and article):
  * Benchmarks: 2 to 4 baseline probability anchors or hard demographic/clinical rates that ground the topic.
  * Levers: Concrete interventions evaluated across operational/decision stages. Group findings across canonical clinical subgroups (e.g., age bands, ovulatory status, prior failure history) for humanity, not an isolated single person. Name landmark trials, measured effect sizes (with %, RR, or OR), clinical reading, and assign an honest verdict (Supported, Targeted, Guideline, Weak, Not supported, Trial only, Lab only, Case by case).
  * Clinical questions: 3 to 5 sharp, high-yield questions for specialist consultations.
  * Sweep queue: 3 to 5 open frontiers or ongoing trials to track next.
  * Article: Compose a structured blog-style State of the Field research article (title, subtitle, synopsis, 2–4 narrative sections covering primary research, mechanisms/levers, and contested frontiers, plus calibrated conclusions and key takeaways).`,
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
