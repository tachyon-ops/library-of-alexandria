import { z } from "zod";
import {
  inferBranchProposals,
  nodeMatchesSlug,
  reassessTopicTaxonomy,
  type SearchTopicMatch,
  type SearchTreeNode,
  type SuggestedBranch,
  type TaxonomyReassessment,
} from "@lib/core";
import { createLlm, hasLlmConfigured, type Llm, type Usage } from "./llm";
import { clip, LIBRARIAN } from "./prompts";

export const TaxonomySchema = z.object({
  branches: z
    .array(
      z.object({
        title: z
          .string()
          .describe(
            "Formal scientific or academic discipline title (MeSH or established academic nomenclature, e.g. 'Hyaluronan-Enriched Embryo Transfer Media (EmbryoGlue) & Implantation Adherence'). Never conversational phrasing.",
          ),
        brief: z
          .string()
          .describe(
            "1 to 2 sentence academic scope stating the biological/physical/mathematical mechanisms, study designs, quantitative effect sizes, and open questions.",
          ),
        parentIndex: z
          .number()
          .describe(
            "Index (0..N-1) of the best parent discipline in <tree>. Choose a canonical depth 1-3 umbrella discipline (e.g. 'Endometrial Receptivity & Implantation Biology'), never a narrow depth-4 leaf sibling.",
          ),
        existingNodeIndex: z
          .number()
          .describe(
            "Index (0..N-1) in <tree> if an existing node already covers this exact topic, or -1 if a new sub-branch should be spawned under parentIndex.",
          ),
        crossLinkIndexes: z
          .array(z.number())
          .describe(
            "0 to 3 indexes (0..N-1) of other related nodes in <tree> that share mechanisms or intersect with this branch.",
          ),
        reason: z
          .string()
          .describe("One-sentence scientific rationale for placing this branch under the selected parent discipline."),
      }),
    )
    .describe(
      "1 to 4 canonical scientific branches that answer or decompose the inquiry. Return 1 branch for a single concept, or 2 to 4 branches when a multi-part question spans distinct scientific sub-disciplines.",
    ),
});

export type TaxonomyPlan = z.infer<typeof TaxonomySchema>;

function formatTreeForPrompt(nodes: SearchTreeNode[]): string {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  return nodes
    .map((n, idx) => {
      const parent = n.parentId ? byId.get(n.parentId) : null;
      const parentTag = parent ? `, under "${parent.title}"` : ", root trunk";
      const briefSnippet = n.brief ? ` — ${clip(n.brief, 110)}` : "";
      return `[${idx}] (depth ${n.depth}${parentTag}) ${n.title}${briefSnippet}`;
    })
    .join("\n");
}

/**
 * Taxonomist agent: uses a fast, low-cost language model (`MODEL_TAXONOMIST`) to
 * translate any natural-language search query or research inquiry into 1..4 canonical
 * scientific branches, match existing nodes in the Tree of Knowledge, and select the
 * exact parent discipline by scientific domain rather than naive keyword overlap.
 */
export async function classifyInquiry(
  llm: Llm,
  input: {
    query: string;
    treeNodes: SearchTreeNode[];
    matchedTopics?: SearchTopicMatch[];
  },
): Promise<SuggestedBranch[]> {
  const { query, treeNodes, matchedTopics = [] } = input;
  const fallback = inferBranchProposals(query, treeNodes, matchedTopics);
  if (treeNodes.length === 0 || !query.trim()) {
    return fallback;
  }

  // Only nodes at depth <= 4 are shown; depth 1-3 umbrella disciplines are preferred as parents
  const candidateNodes = treeNodes.filter((n) => n.depth <= 4);
  if (candidateNodes.length === 0) {
    return fallback;
  }

  const treeText = formatTreeForPrompt(candidateNodes);
  const heuristicHint = fallback
    .map(
      (b, i) =>
        `Heuristic candidate ${i + 1}: "${b.title}" under "${b.parentTitle ?? "root"}"${b.existingTopicSlug ? ` (matches existing node "${b.title}")` : ""}`,
    )
    .join("\n");

  const plan = await llm.structured({
    role: "taxonomist",
    schema: TaxonomySchema,
    maxTokens: 1200,
    system: `${LIBRARIAN}
You are the taxonomist for the Tree of Knowledge.
When a person searches or asks a question, you decide:
1. Whether an existing node in <tree> already covers this exact scientific topic (set existingNodeIndex to its index in <tree>, or -1 if it is a new sub-branch).
2. What canonical scientific title (MeSH or established discipline nomenclature) and 1-2 sentence academic brief the branch should have. Never use raw conversational questions as titles.
3. Which parent discipline (parentIndex in <tree>) owns this topic scientifically:
   - Always place specific interventions, media, biomarkers, or mechanisms under their true biological/physical/mathematical umbrella discipline (depth 1 to 3), NEVER under a narrow depth-4 sibling inquiry just because they share a generic word like "embryo" or "oocyte".
   - Example: "Embryo Glue" (hyaluronan-enriched embryo transfer medium for implantation adherence) belongs under "Endometrial Receptivity & Implantation Biology" (or "Assisted Reproductive Technology & Gamete Donation"), NEVER under "Blastocyst Morphological Grading (Gardner AA/BB System) & Embryo Morphokinetics".
4. Decompose multi-part questions into 2 to 4 separate branches only when the user genuinely asks about multiple distinct sub-disciplines.`,
    prompt: `<inquiry>${clip(query.trim(), 500)}</inquiry>
<heuristic_notes>
${heuristicHint}
</heuristic_notes>
<tree>
${treeText}
</tree>
Classify this inquiry into 1 to 4 canonical scientific branches in the Tree of Knowledge.`,
  });

  const validBranches: SuggestedBranch[] = [];
  const seenTitles = new Set<string>();

  for (const raw of plan.branches.slice(0, 4)) {
    const cleanTitle = raw.title.trim();
    if (!cleanTitle) continue;

    const existingNode =
      Number.isInteger(raw.existingNodeIndex) &&
      raw.existingNodeIndex >= 0 &&
      raw.existingNodeIndex < candidateNodes.length
        ? candidateNodes[raw.existingNodeIndex]!
        : null;

    let parentNode =
      Number.isInteger(raw.parentIndex) &&
      raw.parentIndex >= 0 &&
      raw.parentIndex < candidateNodes.length
        ? candidateNodes[raw.parentIndex]!
        : null;

    // Never allow a narrow depth-4 leaf node to act as the parent of a new sibling branch if its depth-3 parent exists
    if (!existingNode && parentNode && parentNode.depth >= 4 && parentNode.parentId) {
      const umbrellaParent = treeNodes.find((n) => n.id === parentNode!.parentId);
      if (umbrellaParent) {
        parentNode = umbrellaParent;
      }
    }

    if (existingNode && (!parentNode || parentNode.id === existingNode.id)) {
      parentNode = existingNode.parentId
        ? treeNodes.find((n) => n.id === existingNode.parentId) ?? null
        : null;
    }

    if (!parentNode && !existingNode) {
      const fallbackParentId = fallback[0]?.parentId;
      parentNode =
        (fallbackParentId ? treeNodes.find((n) => n.id === fallbackParentId) : null) ??
        candidateNodes.find((n) => n.depth === 2) ??
        candidateNodes[0]!;
    }

    const finalTitle = existingNode ? existingNode.title : cleanTitle.slice(0, 110);
    const titleKey = finalTitle.toLowerCase();
    if (seenTitles.has(titleKey)) continue;
    seenTitles.add(titleKey);

    const crossLinkIds = Array.from(
      new Set(
        (raw.crossLinkIndexes ?? [])
          .filter((idx) => Number.isInteger(idx) && idx >= 0 && idx < candidateNodes.length)
          .map((idx) => candidateNodes[idx]!.id)
          .filter((id) => id !== existingNode?.id && id !== parentNode?.id),
      ),
    ).slice(0, 3);

    // Preserve canonicalSlug if heuristic matched the same canonical facet
    const matchedHeuristic = fallback.find(
      (f) =>
        (existingNode && f.existingTopicId === existingNode.id) ||
        f.title.toLowerCase() === finalTitle.toLowerCase() ||
        (f.canonicalSlug && existingNode && nodeMatchesSlug(existingNode.slug, f.canonicalSlug)),
    );

    validBranches.push({
      title: finalTitle,
      brief: existingNode?.brief ?? (raw.brief.trim() || fallback[0]?.brief || finalTitle),
      parentId: parentNode?.id ?? existingNode?.parentId ?? null,
      parentTitle: parentNode?.title ?? null,
      parentSlug: parentNode?.slug ?? null,
      reason:
        raw.reason.trim() ||
        (existingNode
          ? `Canonical discipline already organised under ${parentNode?.title ?? "the Tree of Knowledge"}.`
          : `Organised by AI Taxonomist under ${parentNode?.title ?? "the Tree of Knowledge"}.`),
      canonicalSlug: matchedHeuristic?.canonicalSlug ?? existingNode?.slug ?? null,
      existingTopicId: existingNode?.id ?? null,
      existingTopicSlug: existingNode?.slug ?? null,
      crossLinkIds,
    });
  }

  return validBranches.length > 0 ? validBranches : fallback;
}

/**
 * Resolves a user search query or inquiry into canonical branches using the fast AI Taxonomist
 * when an LLM provider is configured, with a strict timeout and deterministic fallback so
 * `/search` and `organizeInquiry` never block or fail if offline.
 */
export async function resolveInquiryBranches(
  query: string,
  treeNodes: SearchTreeNode[],
  matchedTopics: SearchTopicMatch[] = [],
  options: {
    llm?: Llm;
    env?: NodeJS.ProcessEnv;
    onUsage?: (u: Usage) => Promise<void> | void;
    timeoutMs?: number;
  } = {},
): Promise<SuggestedBranch[]> {
  const deterministic = inferBranchProposals(query, treeNodes, matchedTopics);
  const env = options.env ?? process.env;
  const llm = options.llm ?? (hasLlmConfigured(env) ? createLlm(options.onUsage, env) : null);
  if (!llm) {
    return deterministic;
  }

  const timeoutMs = options.timeoutMs ?? 3500;
  try {
    const aiPromise = classifyInquiry(llm, { query, treeNodes, matchedTopics });
    const timeoutPromise = new Promise<SuggestedBranch[]>((resolve) =>
      setTimeout(() => resolve(deterministic), timeoutMs),
    );
    return await Promise.race([aiPromise, timeoutPromise]);
  } catch {
    return deterministic;
  }
}

/**
 * Re-assesses an existing topic's placement in the Tree of Knowledge using deterministic
 * canonical facet rules first, and consulting the fast AI Taxonomist when a non-protected
 * topic may be misplaced (e.g. under a depth >= 4 leaf sibling or with low parent affinity).
 */
export async function reassessTopicTaxonomyWithAi(
  llm: Llm | null | undefined,
  topic: {
    id: string;
    slug: string;
    title: string;
    brief: string | null;
    parentId: string | null;
    depth: number;
    summary?: string | null;
  },
  treeNodes: SearchTreeNode[],
  extraEvidenceText = "",
  options: {
    env?: NodeJS.ProcessEnv;
    onUsage?: (u: Usage) => Promise<void> | void;
  } = {},
): Promise<TaxonomyReassessment> {
  const base = reassessTopicTaxonomy(topic, treeNodes, extraEvidenceText);
  if (base.reason === "Protected canonical taxonomy trunk." || base.shouldMove) {
    return base;
  }

  const currentParent = topic.parentId ? treeNodes.find((n) => n.id === topic.parentId) ?? null : null;
  const needsAiCheck =
    (currentParent !== null && currentParent.depth >= 4) ||
    (topic.depth >= 3 && base.reason.includes("(score 0 vs"));

  if (!needsAiCheck) {
    return base;
  }

  const env = options.env ?? process.env;
  const activeLlm = llm ?? (hasLlmConfigured(env) ? createLlm(options.onUsage, env) : null);
  if (!activeLlm) {
    return base;
  }

  try {
    const descendantIds = new Set<string>([topic.id]);
    let added = true;
    while (added) {
      added = false;
      for (const n of treeNodes) {
        if (n.parentId && descendantIds.has(n.parentId) && !descendantIds.has(n.id)) {
          descendantIds.add(n.id);
          added = true;
        }
      }
    }
    const eligibleNodes = treeNodes.filter((n) => !descendantIds.has(n.id) && n.depth < 5);
    const proposals = await classifyInquiry(activeLlm, {
      query: `${topic.title}. ${topic.brief ?? ""} ${clip(extraEvidenceText, 300)}`.trim(),
      treeNodes: eligibleNodes,
    });
    const primary = proposals[0];
    if (!primary || !primary.parentId || primary.parentId === topic.parentId) {
      return base;
    }
    const recommendedParent = eligibleNodes.find((n) => n.id === primary.parentId);
    if (!recommendedParent) {
      return base;
    }

    const aiCrossLinks = (primary.crossLinkIds ?? [])
      .map((id) => treeNodes.find((n) => n.id === id))
      .filter((n): n is SearchTreeNode => Boolean(n && n.id !== topic.id && n.id !== recommendedParent.id))
      .map((node) => ({
        linkedTopicId: node.id,
        linkedTopicSlug: node.slug,
        linkedTopicTitle: node.title,
        relation: "intersects",
        note: `Shared mechanisms, study designs, or quantitative benchmarks between ${topic.title} and ${node.title}.`,
      }));

    return {
      topicId: topic.id,
      currentParentId: topic.parentId,
      recommendedParentId: recommendedParent.id,
      recommendedParentTitle: recommendedParent.title,
      recommendedParentSlug: recommendedParent.slug,
      shouldMove: true,
      reason: `Re-routed by AI Taxonomist from ${currentParent?.title ?? "root"} to ${recommendedParent.title}: ${primary.reason}`,
      crossLinks: aiCrossLinks.length > 0 ? aiCrossLinks : base.crossLinks,
    };
  } catch {
    return base;
  }
}
