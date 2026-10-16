import { z } from "zod";
import { CONTROVERSY, DIRECTIONS, STUDY_DESIGNS } from "@lib/core";
import type { Llm } from "./llm";
import { clip, LIBRARIAN, topicContext } from "./prompts";

export const ReadingSchema = z.object({
  sources: z.array(
    z.object({
      index: z.number().int(),
      relevant: z.boolean(),
      design: z.enum(STUDY_DESIGNS),
      sampleSize: z.number().int().describe("Participants or units analysed; 0 if not stated"),
    }),
  ),
  claims: z.array(
    z.object({
      statement: z.string().describe("One self-contained finding with its number, population and design, in plain words"),
      sourceIndexes: z.array(z.number().int()),
      direction: z.enum(DIRECTIONS),
      confidence: z.number().describe("0 to 1: how well the cited abstracts support the statement as written"),
      controversy: z.enum(CONTROVERSY),
      rationale: z.string().describe("One sentence: why this matters for the topic, or why it is disputed"),
    }),
  ),
  milestones: z.array(
    z.object({
      year: z.number().int(),
      title: z.string(),
      description: z.string(),
      sourceIndex: z.number().int(),
    }),
  ),
});
export type Reading = z.infer<typeof ReadingSchema>;

export interface ReadableSource {
  title: string;
  year: number | null;
  venue: string | null;
  abstract: string | null;
  declaredDesign: string | null;
  sampleSize: number | null;
  kind: string;
}

/** Reader: turns a batch of abstracts into claims and milestones, and classifies each study's design. */
export async function readSources(
  llm: Llm,
  input: { topic: { title: string; brief: string | null }; path: string[]; sources: ReadableSource[] },
): Promise<Reading> {
  const docs = input.sources
    .map(
      (s, i) => `<source index="${i}" kind="${s.kind}" year="${s.year ?? "?"}" venue="${s.venue ?? ""}" declared_design="${s.declaredDesign ?? ""}" declared_n="${s.sampleSize ?? ""}">
Title: ${s.title}
${clip(s.abstract, 2400) || "(no abstract)"}
</source>`,
    )
    .join("\n");
  const reading = await llm.structured({
    role: "reader",
    schema: ReadingSchema,
    maxTokens: 8000,
    system: `${LIBRARIAN}
You are the reader. From the abstracts given, extract findings relevant to the topic.
- Classify every source's design and sample size from its abstract (one entry per source index).
- A claim must be supported by the abstracts you cite; merge findings that say the same thing.
- Use "fringe" for ideas outside the mainstream, "commercial_hype" for products promoted ahead of evidence, "contested" when sources disagree.
- A milestone is a dated first: a first birth, first trial, approval, landmark result. Most batches have none.
- Ignore sources that are off-topic (mark relevant=false).`,
    prompt: `${topicContext(input.topic, input.path)}
${docs}`,
  });
  const n = input.sources.length;
  const inRange = (i: number) => Number.isInteger(i) && i >= 0 && i < n;
  return {
    sources: reading.sources.filter((s) => inRange(s.index)),
    claims: reading.claims
      .map((c) => ({ ...c, sourceIndexes: [...new Set(c.sourceIndexes.filter(inRange))], confidence: clamp01(c.confidence) }))
      .filter((c) => c.sourceIndexes.length > 0 && c.statement.trim().length > 0),
    milestones: reading.milestones.filter((m) => inRange(m.sourceIndex) && m.year > 1000 && m.year <= new Date().getFullYear() + 1),
  };
}

function clamp01(x: number): number {
  return Number.isFinite(x) ? Math.min(1, Math.max(0, x)) : 0.5;
}
