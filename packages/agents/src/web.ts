import { z } from "zod";
import { ENTITY_KINDS } from "@lib/core";
import type { Citation, Llm } from "./llm";
import { clip, LIBRARIAN, topicContext } from "./prompts";

export const EntitiesSchema = z.object({
  entities: z.array(
    z.object({
      kind: z.enum(ENTITY_KINDS),
      name: z.string(),
      country: z.string().describe("ISO country name, or empty string if unknown"),
      url: z.string().describe("Official URL from the research notes, or empty string"),
      summary: z.string().describe("One or two sentences: what it is and why it is relevant"),
      attributes: z
        .array(z.object({ key: z.string(), value: z.string() }))
        .describe("Facts stated in the notes: success rates, prices, age limits, trial status, approval dates"),
      sourceUrls: z.array(z.string()).describe("URLs from the citation list that support this entity"),
    }),
  ),
});

export interface FoundEntity {
  kind: (typeof ENTITY_KINDS)[number];
  name: string;
  country: string | null;
  url: string | null;
  summary: string | null;
  attributes: Record<string, string>;
  sourceUrls: string[];
}

/**
 * Web crawler for what papers do not list: clinics, treatments on offer,
 * companies, regulation. Two steps, because search citations and strict JSON
 * output cannot be combined in one call: first research with citations, then
 * structure the notes, keeping only URLs the search actually returned.
 */
export async function scanWeb(
  llm: Llm,
  input: { topic: { title: string; brief: string | null }; path: string[]; task: string; maxSearches: number },
): Promise<{ entities: FoundEntity[]; citations: Citation[] }> {
  const research = await llm.webResearch({
    role: "web",
    maxSearches: input.maxSearches,
    system: `${LIBRARIAN}
You are the web crawler. Prefer official sites, registries, regulators and peer-reviewed reports over blogs and forums.
Write compact research notes: named entities, where they are, what they offer, and any figures with their source.`,
    prompt: `${topicContext(input.topic, input.path)}
Task: ${input.task}`,
  });
  if (!research.text.trim()) return { entities: [], citations: [] };

  const allowed = new Set(research.citations.map((c) => c.url));
  const cited = research.citations.map((c) => `- ${c.url} | ${c.title ?? ""}`).join("\n");
  const out = await llm.structured({
    role: "web",
    schema: EntitiesSchema,
    maxTokens: 6000,
    system: `${LIBRARIAN}
Turn research notes into a list of entities. Only include facts present in the notes. Only use URLs from the citation list.`,
    prompt: `<web>
${clip(research.text, 20000)}
</web>
Citation list:
${cited || "(none)"}`,
  });

  const entities = out.entities
    .filter((e) => e.name.trim())
    .map((e) => {
      const sourceUrls = e.sourceUrls.filter((u) => allowed.has(u));
      return {
        kind: e.kind,
        name: e.name.trim(),
        country: e.country.trim() || null,
        url: e.url.trim() && /^https?:\/\//.test(e.url) ? e.url.trim() : null,
        summary: e.summary.trim() || null,
        attributes: Object.fromEntries(e.attributes.filter((a) => a.key && a.value).map((a) => [a.key, a.value])),
        sourceUrls,
      };
    })
    // An entity no returned page supports is dropped: the crawler must not invent clinics.
    .filter((e) => e.sourceUrls.length > 0);
  return { entities, citations: research.citations };
}
