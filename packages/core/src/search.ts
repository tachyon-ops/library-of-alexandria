import type { Controversy, Direction, StudyDesign, Tier } from "./evidence";
import type { EntityKind, SynthesisBenchmark, SynthesisLever, TopicStatus, TopicSynthesis } from "./types";

export interface SearchTopicMatch {
  id: string;
  parentId: string | null;
  slug: string;
  title: string;
  brief: string | null;
  summary: string | null;
  status: TopicStatus;
  depth: number;
  claimCount: number;
  synthesis?: TopicSynthesis | null;
}

export interface SearchClaimMatch {
  id: string;
  topicId: string;
  topicSlug: string;
  topicTitle: string;
  statement: string;
  tier: Tier;
  controversy: Controversy;
  direction: Direction;
  confidence: number;
  rationale: string | null;
  sources: {
    id: string;
    title: string;
    url: string | null;
    year: number | null;
    design: string | null;
    venue: string | null;
  }[];
}

export interface SearchSourceMatch {
  id: string;
  kind: string;
  origin: string;
  title: string;
  url: string | null;
  doi: string | null;
  venue: string | null;
  year: number | null;
  authors: string[];
  abstract: string | null;
  citedBy: number | null;
  design: StudyDesign | string | null;
  topics: { slug: string; title: string }[];
}

export interface SearchEntityMatch {
  id: string;
  topicId: string;
  topicSlug: string;
  topicTitle: string;
  kind: EntityKind;
  name: string;
  country: string | null;
  url: string | null;
  summary: string | null;
}

export interface LibrarySearchResults {
  query: string;
  terms: string[];
  topics: SearchTopicMatch[];
  claims: SearchClaimMatch[];
  sources: SearchSourceMatch[];
  entities: SearchEntityMatch[];
}

export interface SearchTreeNode {
  id: string;
  parentId: string | null;
  slug: string;
  title: string;
  brief: string | null;
  depth: number;
}

export interface SearchCitation {
  index: number;
  label: string;
  url: string;
  meta: string;
  isInternal: boolean;
}

export interface MatchedSynthesisLever extends SynthesisLever {
  topicSlug: string;
  topicTitle: string;
}

export interface MatchedSynthesisBenchmark extends SynthesisBenchmark {
  topicSlug: string;
  topicTitle: string;
}

export interface SuggestedBranch {
  title: string;
  brief: string;
  parentId: string | null;
  parentTitle: string | null;
  parentSlug: string | null;
  reason: string;
}

export interface SearchSynthesis {
  coverageStatus: "strong" | "partial" | "unexplored";
  bestTier: Tier | null;
  headline: string;
  paragraphs: string[];
  citations: SearchCitation[];
  matchedLevers: MatchedSynthesisLever[];
  matchedBenchmarks: MatchedSynthesisBenchmark[];
  suggestedBranch: SuggestedBranch;
}

const STOPWORDS = new Set([
  "a",
  "about",
  "above",
  "after",
  "against",
  "all",
  "also",
  "am",
  "an",
  "and",
  "any",
  "are",
  "article",
  "articles",
  "as",
  "ask",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "between",
  "both",
  "but",
  "by",
  "can",
  "could",
  "did",
  "do",
  "does",
  "doing",
  "down",
  "during",
  "each",
  "effect",
  "effects",
  "evidence",
  "explain",
  "find",
  "findings",
  "for",
  "from",
  "further",
  "get",
  "give",
  "had",
  "has",
  "have",
  "having",
  "how",
  "i",
  "idea",
  "ideas",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "just",
  "know",
  "library",
  "like",
  "look",
  "looking",
  "me",
  "more",
  "most",
  "my",
  "need",
  "new",
  "no",
  "nor",
  "not",
  "now",
  "of",
  "off",
  "on",
  "once",
  "only",
  "or",
  "other",
  "our",
  "out",
  "over",
  "own",
  "paper",
  "papers",
  "please",
  "literature",
  "question",
  "research",
  "results",
  "same",
  "say",
  "says",
  "search",
  "searching",
  "see",
  "should",
  "show",
  "so",
  "some",
  "specific",
  "studies",
  "study",
  "such",
  "tell",
  "than",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "think",
  "this",
  "those",
  "through",
  "to",
  "too",
  "topic",
  "topics",
  "under",
  "until",
  "up",
  "use",
  "using",
  "very",
  "want",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "whom",
  "why",
  "will",
  "with",
  "work",
  "works",
  "would",
  "you",
  "your",
]);

const ACRONYM_CASE: Record<string, string> = {
  ivf: "IVF",
  icsi: "ICSI",
  ivg: "IVG",
  prp: "PRP",
  "pgt-a": "PGT-A",
  "pgt-m": "PGT-M",
  "pgt-sr": "PGT-SR",
  pgt: "PGT",
  amh: "AMH",
  fsh: "FSH",
  lh: "LH",
  dna: "DNA",
  rna: "RNA",
  mrna: "mRNA",
  mtor: "mTOR",
  coq10: "CoQ10",
  dhea: "DHEA",
  nad: "NAD+",
  nmn: "NMN",
  rct: "RCT",
  era: "ERA",
  fet: "FET",
  ohss: "OHSS",
  pcos: "PCOS",
  dor: "DOR",
  poi: "POI",
  mrt: "MRT",
  hla: "HLA",
  nk: "NK",
  "sflt-1": "sFlt-1",
  plgf: "PlGF",
  gnrh: "GnRH",
  hcg: "hCG",
  tese: "TESE",
  zimot: "ZyMōt",
  zymot: "ZyMōt",
  crispr: "CRISPR",
  ai: "AI",
};

const TIER_ORDER: Record<Tier, number> = {
  T1: 1,
  T2: 2,
  T3: 3,
  T4: 4,
  T5: 5,
  T6: 6,
};

/**
 * Extracts up to 8 meaningful search terms from a natural-language question,
 * article title, DOI, or concept query.
 */
export function extractSearchTerms(query: string): string[] {
  const cleaned = query
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
  if (!cleaned) return [];

  const maybeDoi = cleaned.match(/10\.\d{4,9}\/[-._;()/:a-z0-9]+/i);
  if (maybeDoi) {
    return [maybeDoi[0].toLowerCase()];
  }

  const rawTokens = cleaned
    .replace(/[^a-z0-9+.-]+/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^[.-]+|[.-]+$/g, ""))
    .filter((t) => t.length >= 2);

  const filtered = rawTokens.filter((t) => !STOPWORDS.has(t));
  const chosen = filtered.length > 0 ? filtered : rawTokens;

  const seen = new Set<string>();
  const result: string[] = [];
  for (const token of chosen) {
    if (!seen.has(token)) {
      seen.add(token);
      result.push(token);
      if (result.length >= 8) break;
    }
  }
  return result;
}

/**
 * Formats a user search query or natural-language question into a clean
 * canonical scientific branch title.
 */
export function suggestTopicTitle(query: string): string {
  const trimmed = query
    .trim()
    .replace(/[?!.]+$/g, "")
    .replace(
      /^(what\s+is\s+the\s+evidence\s+(on|for|about)|what\s+(is|are|does|do)|how\s+(does|do|to|can)|are\s+there\s+(any\s+)?(articles|papers|studies)\s+(on|about|for)|tell\s+me\s+about|search\s+for|find\s+(articles|papers|studies)\s+(on|about|for)|can\s+you\s+explain|evidence\s+(on|for|of)|papers\s+(on|about))\s+/i,
      "",
    )
    .trim();

  const base = trimmed || query.trim() || "New Research Inquiry";
  const words = base.split(/\s+/);
  const smallWords = new Set(["a", "an", "and", "as", "at", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "vs", "with"]);

  return words
    .map((word, idx) => {
      const lower = word.toLowerCase();
      if (ACRONYM_CASE[lower]) return ACRONYM_CASE[lower]!;
      if (idx > 0 && smallWords.has(lower)) return lower;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ")
    .slice(0, 90);
}

const DOMAIN_HINTS: { slugSubstring: string; keywords: string[] }[] = [
  {
    slugSubstring: "ovarian-reserve-oocyte-cryopreservation",
    keywords: ["vitrified", "vitrification", "cryopreservation", "egg freezing", "oocyte", "thaw", "warming", "amh", "follicle", "euploid", "aneuploidy"],
  },
  {
    slugSubstring: "endometrial-receptivity-implantation-biology",
    keywords: ["endometrial", "endometrium", "uterine", "implantation", "fet", "luteal", "progesterone", "era", "adenomyosis", "endometriosis", "endo", "scratch", "hysteroscopy"],
  },
  {
    slugSubstring: "andrology-male-factor-infertility",
    keywords: ["sperm", "male", "paternal", "icsi", "zymot", "dna fragmentation", "dfi", "testicular", "tese", "andrology", "semen", "varicocele", "motility"],
  },
  {
    slugSubstring: "assisted-reproductive-technology-gamete-donation",
    keywords: ["donor", "donation", "recipient", "oocyte donation", "spain", "portugal", "czech", "greece", "anonymity", "clinic", "immunology", "kir", "hla"],
  },
  {
    slugSubstring: "translational-geroprotective-reproductive-biology",
    keywords: ["rapamycin", "mtor", "ivg", "gametogenesis", "stem cell", "mitochondrial", "spindle", "prp", "platelet", "rejuvenation", "nad", "nmn", "coq10", "melatonin", "dhea", "senolytic", "geroprotective", "longevity", "frontier"],
  },
  {
    slugSubstring: "advanced-maternal-age-pregnancy-after-40",
    keywords: ["maternal age", "pregnancy after", "44", "45", "pre-eclampsia", "preeclampsia", "aspirin", "sflt", "plgf", "obstetric", "perinatal", "gestational", "placenta", "cesarean"],
  },
  {
    slugSubstring: "reproductive-medicine-human-fertility",
    keywords: ["fertility", "infertility", "reproductive", "ivf", "conception", "embryo", "blastocyst", "pregnancy", "ovulation", "hormone"],
  },
];

/**
 * Recommends the best parent topic in the Tree of Knowledge under which to spawn
 * a new sub-branch for the given query.
 */
export function inferBranchProposal(
  query: string,
  treeNodes: SearchTreeNode[],
  matchedTopics: SearchTopicMatch[] = [],
): SuggestedBranch {
  const title = suggestTopicTitle(query);
  const cleanQuery = query.trim() || title;
  const brief = `Synthesise the peer-reviewed record on ${cleanQuery}: systematic reviews, randomised clinical trials, large cohort studies, quantitative effect sizes, safety signals, and active trials.`;

  const eligibleNodes = treeNodes.filter((n) => n.depth < 5);
  if (eligibleNodes.length === 0) {
    return {
      title,
      brief,
      parentId: null,
      parentTitle: null,
      parentSlug: null,
      reason: "Creates a new root discipline in the Tree of Knowledge.",
    };
  }

  const terms = extractSearchTerms(query);
  const queryLower = cleanQuery.toLowerCase();

  // 1. If a matched topic from search is eligible, prefer it as the parent branch.
  for (const matched of matchedTopics) {
    const eligible = eligibleNodes.find((n) => n.id === matched.id);
    if (eligible) {
      return {
        title,
        brief,
        parentId: eligible.id,
        parentTitle: eligible.title,
        parentSlug: eligible.slug,
        reason: `Closest matching discipline in the archive (${eligible.title}).`,
      };
    }
  }

  // 2. Score all eligible tree nodes by keyword & domain hint overlap.
  let bestNode: SearchTreeNode | null = null;
  let bestScore = 0;

  for (const node of eligibleNodes) {
    const hay = `${node.title} ${node.brief ?? ""} ${node.slug}`.toLowerCase();
    let score = 0;
    for (const term of terms) {
      if (hay.includes(term)) score += 3;
    }
    for (const hint of DOMAIN_HINTS) {
      if (node.slug.includes(hint.slugSubstring)) {
        for (const kw of hint.keywords) {
          if (queryLower.includes(kw)) score += 4;
        }
      }
    }
    // Slight preference for depth 1-2 specialist disciplines over umbrella trunks when tied
    if (score > 0 && node.depth >= 1 && node.depth <= 3) {
      score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestNode = node;
    }
  }

  if (bestNode) {
    return {
      title,
      brief,
      parentId: bestNode.id,
      parentTitle: bestNode.title,
      parentSlug: bestNode.slug,
      reason: `Placed under ${bestNode.title} based on domain taxonomy match.`,
    };
  }

  // 3. Fallback to the primary fertility/medicine discipline or first root node.
  const fallback =
    eligibleNodes.find((n) => n.slug.includes("reproductive-medicine-human-fertility")) ??
    eligibleNodes.find((n) => n.depth === 0) ??
    eligibleNodes[0]!;

  return {
    title,
    brief,
    parentId: fallback.id,
    parentTitle: fallback.title,
    parentSlug: fallback.slug,
    reason: `Placed under ${fallback.title} (can be changed before launching).`,
  };
}

/**
 * Synthesises a grounded, cited briefing from library search results and
 * recommends where a new research branch can be spawned.
 */
export function synthesizeSearchBriefing(
  query: string,
  results: LibrarySearchResults,
  treeNodes: SearchTreeNode[],
): SearchSynthesis {
  const terms = results.terms.length > 0 ? results.terms : extractSearchTerms(query);
  const suggestedBranch = inferBranchProposal(query, treeNodes, results.topics);

  const sortedClaims = [...results.claims].sort(
    (a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || b.confidence - a.confidence,
  );
  const bestTier: Tier | null = sortedClaims.length > 0 ? sortedClaims[0]!.tier : null;

  // Match synthesis levers & benchmarks across matched topics (or all topics with synthesis)
  const matchedLevers: MatchedSynthesisLever[] = [];
  const matchedBenchmarks: MatchedSynthesisBenchmark[] = [];

  for (const t of results.topics) {
    let syn: TopicSynthesis | null = null;
    if (typeof t.synthesis === "string") {
      try {
        syn = JSON.parse(t.synthesis);
      } catch {
        syn = null;
      }
    } else if (t.synthesis && typeof t.synthesis === "object") {
      syn = t.synthesis;
    }
    if (!syn) continue;
    for (const lever of Array.isArray(syn.levers) ? syn.levers : []) {
      const text = `${lever.name} ${lever.category} ${lever.description} ${lever.bestEvidence} ${lever.effect} ${lever.reading}`.toLowerCase();
      if (terms.length === 0 || terms.some((term) => text.includes(term))) {
        matchedLevers.push({ ...lever, topicSlug: t.slug, topicTitle: t.title });
      }
    }
    for (const bm of Array.isArray(syn.benchmarks) ? syn.benchmarks : []) {
      const text = `${bm.metric} ${bm.label} ${bm.source}`.toLowerCase();
      if (terms.length === 0 || terms.some((term) => text.includes(term))) {
        matchedBenchmarks.push({ ...bm, topicSlug: t.slug, topicTitle: t.title });
      }
    }
  }

  const citations: SearchCitation[] = [];
  const citationMap = new Map<string, number>();

  function cite(label: string, url: string, meta: string, isInternal: boolean): number {
    const key = `${url}::${label}`;
    const existing = citationMap.get(key);
    if (existing) return existing;
    const index = citations.length + 1;
    citationMap.set(key, index);
    citations.push({ index, label, url, meta, isInternal });
    return index;
  }

  const totalMatches =
    results.topics.length + results.claims.length + results.sources.length + results.entities.length;

  if (totalMatches === 0) {
    return {
      coverageStatus: "unexplored",
      bestTier: null,
      headline: `No graded findings or indexed papers match "${query.trim()}" in the archive yet.`,
      paragraphs: [
        `The library does not yet hold extracted findings, clinical trials, or peer-reviewed papers matching these terms. You can launch an autonomous research branch below under ${suggestedBranch.parentTitle ?? "the Tree of Knowledge"} to dispatch the scout, literature harvesters, reader, and skeptic agents on this question.`,
      ],
      citations: [],
      matchedLevers: [],
      matchedBenchmarks: [],
      suggestedBranch,
    };
  }

  const hasStrongCoverage =
    sortedClaims.length >= 2 ||
    (bestTier !== null && (bestTier === "T1" || bestTier === "T2")) ||
    matchedLevers.length > 0 ||
    results.topics.some((t) => t.status === "ready" && Boolean(t.summary));

  const coverageStatus: "strong" | "partial" = hasStrongCoverage ? "strong" : "partial";

  const headlineParts: string[] = [];
  if (bestTier) {
    headlineParts.push(`Best evidence grade ${bestTier}`);
  }
  if (sortedClaims.length > 0) {
    headlineParts.push(`${sortedClaims.length} graded ${sortedClaims.length === 1 ? "finding" : "findings"}`);
  }
  if (results.sources.length > 0) {
    headlineParts.push(`${results.sources.length} indexed ${results.sources.length === 1 ? "source" : "sources"}`);
  }
  if (results.topics.length > 0) {
    headlineParts.push(`${results.topics.length} ${results.topics.length === 1 ? "discipline" : "disciplines"}`);
  }

  const headline =
    coverageStatus === "strong"
      ? `Synthesised from the library archive (${headlineParts.join(" · ")}).`
      : `Partial coverage in the library (${headlineParts.join(" · ")}) — you can also spawn a dedicated sub-branch below.`;

  const paragraphs: string[] = [];

  // Paragraph 1: Topic overview + Evaluated Decision Ledger levers
  if (matchedLevers.length > 0) {
    const topLevers = matchedLevers.slice(0, 2);
    const leverSentences = topLevers.map((l) => {
      const topicRef = cite(l.topicTitle, `/topic/${l.topicSlug}`, "Evaluated Decision Ledger", true);
      const srcRef = l.sourceUrl
        ? ` [${cite(`${l.name} (${l.bestEvidence})`, l.sourceUrl, l.verdict, false)}]`
        : "";
      return `In ${l.topicTitle} [${topicRef}], ${l.name} carries a "${l.verdict}" verdict (${l.bestEvidence}): ${l.effect} — ${l.reading}${srcRef}`;
    });
    paragraphs.push(leverSentences.join(" "));
  } else if (results.topics.length > 0 && results.topics[0]!.summary) {
    const topTopic = results.topics[0]!;
    const summaryText = topTopic.summary ?? "";
    const ref = cite(topTopic.title, `/topic/${topTopic.slug}`, `Discipline summary (${topTopic.claimCount} findings)`, true);
    const firstSentences = summaryText
      .split(/(?<=[.!?])\s+/)
      .slice(0, 2)
      .join(" ");
    paragraphs.push(`Under ${topTopic.title} [${ref}]: ${firstSentences}`);
  }

  // Paragraph 2: Graded claims (T1 -> T6)
  if (sortedClaims.length > 0) {
    const topClaims = sortedClaims.slice(0, 3);
    const claimSentences = topClaims.map((c) => {
      const topicRef = cite(c.topicTitle, `/topic/${c.topicSlug}`, `${c.tier} · ${c.controversy.replace(/_/g, " ")}`, true);
      const primarySource = c.sources[0];
      const sourceRef =
        primarySource && primarySource.url
          ? ` [${cite(
              primarySource.title,
              primarySource.url,
              [primarySource.venue, primarySource.year, primarySource.design?.replace(/_/g, " ")].filter(Boolean).join(" · "),
              false,
            )}]`
          : "";
      const controversyTag =
        c.controversy !== "settled" ? ` (${c.controversy.replace(/_/g, " ")})` : "";
      return `[${c.tier}${controversyTag}] ${c.statement} [${topicRef}]${sourceRef}`;
    });
    paragraphs.push(claimSentences.join(" "));
  }

  // Paragraph 3: Indexed papers / trials / entities when helpful
  if (results.sources.length > 0 && sortedClaims.length < 2) {
    const topSources = results.sources.slice(0, 2);
    const sourceDesc = topSources
      .map((s) => {
        const meta = [s.venue, s.year, s.design ? String(s.design).replace(/_/g, " ") : null].filter(Boolean).join(", ");
        if (s.url) {
          const ref = cite(s.title, s.url, meta || s.origin, false);
          return `"${s.title}" (${meta || s.origin}) [${ref}]`;
        }
        return `"${s.title}" (${meta || s.origin})`;
      })
      .join("; ");
    paragraphs.push(`Indexed literature matching your query includes ${sourceDesc}.`);
  } else if (matchedBenchmarks.length > 0) {
    const bm = matchedBenchmarks[0]!;
    const ref = cite(bm.topicTitle, `/topic/${bm.topicSlug}`, `Baseline benchmark · ${bm.source}`, true);
    paragraphs.push(`Calibrated baseline benchmark in ${bm.topicTitle} [${ref}]: ${bm.metric} — ${bm.label} (${bm.source}).`);
  }

  return {
    coverageStatus,
    bestTier,
    headline,
    paragraphs,
    citations,
    matchedLevers: matchedLevers.slice(0, 4),
    matchedBenchmarks: matchedBenchmarks.slice(0, 4),
    suggestedBranch,
  };
}
