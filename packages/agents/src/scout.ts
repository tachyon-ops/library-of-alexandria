import { z } from "zod";
import type { ResearchQueries } from "@lib/core";
import type { Llm } from "./llm";
import { LIBRARIAN, topicContext } from "./prompts";

export const PlanSchema = z.object({
  subtopics: z
    .array(z.object({ title: z.string(), brief: z.string() }))
    .describe(
      "At most 6 sub-branches named with canonical scientific or academic taxonomy terms (MeSH / discipline nomenclature) that aggregate the field across the general human population",
    ),
  literatureQueries: z.array(z.string()).describe("3 to 6 keyword queries for Europe PMC and OpenAlex"),
  trialQueries: z.array(z.string()).describe("0 to 3 queries for ClinicalTrials.gov; empty if the topic has no clinical side"),
  webQueries: z
    .array(z.string())
    .describe("0 to 4 web research tasks for clinics, products, regulations, companies or news; empty if not useful"),
  frontierAngles: z.array(z.string()).describe("Up to 4 frontier or controversial angles a careful reviewer should not miss"),
});
export type Plan = z.infer<typeof PlanSchema>;

/** Scout: splits a topic into branches and writes the search queries the harvesters run. */
export async function planTopic(
  llm: Llm,
  input: { topic: { title: string; brief: string | null }; path: string[]; existingChildren: string[] },
): Promise<Plan & { queries: ResearchQueries }> {
  const plan = await llm.structured({
    role: "scout",
    schema: PlanSchema,
    maxTokens: 3000,
    system: `${LIBRARIAN}
You are the scout. You decide how a topic branches into canonical scientific sub-disciplines and what to search for.
Name every sub-branch with formal scientific or academic taxonomy terms (MeSH or established discipline nomenclature) that aggregate findings across the general population. Never name branches after a narrow personal scenario, an arbitrary age cutoff, or conversational phrasing.
Queries are keyword searches, 2 to 8 words, no boolean syntax. Include one query aimed at recent milestones and one aimed at criticism or failed replications.
For web tasks, write a one-sentence instruction, for example "Find clinical centres and regulatory frameworks offering X, with published outcomes and pricing".`,
    prompt: `${topicContext(input.topic, input.path)}
Existing sub-branches (do not repeat): ${input.existingChildren.length ? input.existingChildren.join("; ") : "none"}
Plan the research for this topic.`,
  });
  const cap = <T>(xs: T[], n: number) => xs.slice(0, n);
  const queries = {
    literature: cap([...plan.literatureQueries, ...plan.frontierAngles], 8),
    trials: cap(plan.trialQueries, 3),
    web: cap(plan.webQueries, 4),
  };
  return { ...plan, subtopics: cap(plan.subtopics, 6), queries };
}
