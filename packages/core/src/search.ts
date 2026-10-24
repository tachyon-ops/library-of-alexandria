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
  canonicalSlug?: string | null;
  existingTopicId?: string | null;
  existingTopicSlug?: string | null;
  crossLinkIds?: string[];
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
  suggestedBranches: SuggestedBranch[];
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
  "compare",
  "comparing",
  "could",
  "did",
  "difference",
  "differences",
  "do",
  "does",
  "doing",
  "down",
  "during",
  "each",
  "effect",
  "effects",
  "end",
  "evidence",
  "exist",
  "exists",
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
  "kind",
  "kinds",
  "know",
  "library",
  "like",
  "look",
  "looking",
  "me",
  "method",
  "methods",
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
  "type",
  "types",
  "under",
  "until",
  "up",
  "use",
  "using",
  "very",
  "vs",
  "versus",
  "want",
  "was",
  "way",
  "ways",
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
  ivm: "IVM",
  prp: "PRP",
  "pgt-a": "PGT-A",
  "pgt-m": "PGT-M",
  "pgt-sr": "PGT-SR",
  pgt: "PGT",
  amh: "AMH",
  afc: "AFC",
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
  mst: "MST",
  pnt: "PNT",
  hla: "HLA",
  kir: "KIR",
  nk: "NK",
  "sflt-1": "sFlt-1",
  plgf: "PlGF",
  gnrh: "GnRH",
  hcg: "hCG",
  tese: "TESE",
  tesa: "TESA",
  dfi: "DFI",
  zimot: "ZyMōt",
  zymot: "ZyMōt",
  embryoglue: "EmbryoGlue",
  rhamm: "RHAMM",
  cd44: "CD44",
  cd138: "CD138",
  rif: "RIF",
  "1pn": "1PN",
  "2pn": "2PN",
  "0pn": "0PN",
  "3pn": "3PN",
  "1pn/2pn": "1PN/2PN",
  "2pn/1pn": "2PN/1PN",
  "bb/aa": "BB/AA",
  "aa/bb": "AA/BB",
  aa: "AA",
  ab: "AB",
  ba: "BA",
  bb: "BB",
  bc: "BC",
  cc: "CC",
  mii: "MII",
  mi: "MI",
  gv: "GV",
  icm: "ICM",
  te: "TE",
  ser: "SER",
  eshre: "ESHRE",
  asrm: "ASRM",
  crispr: "CRISPR",
  ai: "AI",
  mond: "MOND",
  mihsc: "MiHsC",
  qcd: "QCD",
  qed: "QED",
  qft: "QFT",
  gr: "GR",
  lqg: "LQG",
  "ads/cft": "AdS/CFT",
  lcdm: "ΛCDM",
  wimp: "WIMP",
  susy: "SUSY",
  lhc: "LHC",
  ligo: "LIGO",
  cmb: "CMB",
  btfr: "BTFR",
  rar: "RAR",
  pde: "PDE",
  pdes: "PDEs",
  sde: "SDE",
  sdes: "SDEs",
  ito: "Itô",
  kam: "KAM",
  bqp: "BQP",
  rmt: "RMT",
  evt: "EVT",
  mcmc: "MCMC",
  emh: "EMH",
  capm: "CAPM",
  garch: "GARCH",
  arch: "ARCH",
  arima: "ARIMA",
  var: "VaR",
  cvar: "CVaR",
  lob: "LOB",
  hft: "HFT",
  lppl: "LPPL",
  sabr: "SABR",
  dsge: "DSGE",
  vpin: "VPIN",
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
 * Strips conversational question scaffolding anywhere in a string and normalises
 * informal conjunctions so titles reflect canonical academic nomenclature.
 */
function stripConversationalScaffolding(raw: string): string {
  return raw
    .trim()
    .replace(/[?!.]+$/g, "")
    // Fix common conversational typo "X end Y" -> "X and Y"
    .replace(/\b([a-z0-9]+)\s+end\s+([a-z0-9]+)\b/gi, "$1 and $2")
    // Strip inline or leading question scaffolding such as "-what grading methods are there for"
    .replace(
      /(?:^|[-–—,:;]\s*|\s+)(?:what\s+(?:is|are)\s+the\s+(?:evidence|methods|options|criteria|systems|protocols|studies|findings)\s+(?:on|for|about|in|of)|what\s+(?:[a-z]+\s+){0,2}(?:methods|systems|criteria|protocols|options|treatments|approaches)\s+(?:are\s+there|exist|do\s+we\s+have)\s+(?:for|on|in|to|of)|what\s+(?:is|are|does|do)|how\s+(?:does|do|to|can|is|are)|are\s+there\s+(?:any\s+)?(?:articles|papers|studies|methods|treatments)\s+(?:on|about|for|in)|tell\s+me\s+about|search\s+for|find\s+(?:articles|papers|studies)\s+(?:on|about|for)|can\s+you\s+explain|evidence\s+(?:on|for|of)|papers\s+(?:on|about))\s+/gi,
      " ",
    )
    .replace(/\b(?:are\s+there\s+for|are\s+there|do\s+we\s+have\s+for|exist\s+for)\b/gi, " ")
    .replace(/\s*[-–—]+\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Formats a user search query or natural-language question into a clean
 * canonical scientific branch title.
 */
export function suggestTopicTitle(query: string): string {
  const cleaned = stripConversationalScaffolding(query);
  const base = cleaned || query.trim().replace(/[?!.]+$/g, "") || "New Research Inquiry";
  if (/^(?:embryo\s*glue|hyaluronan\s+(?:embryo\s+)?transfer\s+medi(?:um|a))$/i.test(base.trim())) {
    return "Hyaluronan-Enriched Embryo Transfer Media (EmbryoGlue) & Implantation Adherence";
  }
  const words = base.split(/\s+/);
  const smallWords = new Set(["a", "an", "and", "as", "at", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "vs", "with"]);

  return words
    .map((word, idx) => {
      const cleanWord = word.replace(/^[-–—,:;]+|[-–—,:;]+$/g, "");
      if (!cleanWord) return "";
      const lower = cleanWord.toLowerCase();
      if (ACRONYM_CASE[lower]) return ACRONYM_CASE[lower]!;
      // Handle slash-joined tokens such as BB/AA or 1PN/2PN
      if (cleanWord.includes("/")) {
        return cleanWord
          .split("/")
          .map((part) => {
            const pLower = part.toLowerCase();
            return ACRONYM_CASE[pLower] ?? (part.charAt(0).toUpperCase() + part.slice(1));
          })
          .join("/");
      }
      if (idx > 0 && smallWords.has(lower)) return lower;
      return cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1);
    })
    .filter(Boolean)
    .join(" ")
    .slice(0, 90);
}

/**
 * Canonical and legacy slug equivalences across earlier database seeds so taxonomy
 * placement and protection work regardless of whether a node has its v0.1 legacy slug
 * or its expanded encyclopaedic slug.
 */
const LEGACY_SLUG_ALIASES: Record<string, string[]> = {
  "reproductive-medicine-human-fertility": ["human-fertility"],
  "ovarian-reserve-oocyte-cryopreservation": [
    "human-fertility-using-eggs-vitrified-at-a-younger-age",
    "using-eggs-vitrified-at-a-younger-age",
  ],
  "assisted-reproductive-technology-gamete-donation": [
    "human-fertility-donor-eggs-in-europe",
    "donor-eggs-in-europe",
  ],
  "endometrial-receptivity-implantation-biology": [
    "human-fertility-uterine-receptivity-and-implantation-failure",
    "uterine-receptivity-and-implantation-failure",
  ],
  "andrology-male-factor-infertility": [
    "human-fertility-male-factor-after-40",
    "male-factor-after-40",
    "male-reproductive-biology-andrology",
  ],
  "translational-geroprotective-reproductive-biology": [
    "human-fertility-frontier-fertility-treatments",
    "frontier-fertility-treatments",
  ],
  "advanced-maternal-age-pregnancy-after-40": [
    "human-fertility-pregnancy-after-44",
    "pregnancy-after-44",
    "maternal-perinatal-epidemiology-advanced-age",
    "maternal-fetal-medicine-obstetrics",
  ],
  "hyaluronan-embryo-transfer-media-embryoglue-implantation-adherence": [
    "reproductive-medicine-human-fertility-bb-aa-1pn-2pn-what-grading-methods-are-the-41",
  ],
  "blastocyst-morphological-grading-gardner-criteria-morphokinetics": [
    "reproductive-medicine-human-fertility-bb-aa-1pn-2pn-what-grading-methods-are-the",
  ],
  "zygote-pronuclear-scoring-2pn-1pn-3pn-fertilisation": [
    "reproductive-medicine-human-fertility-1pn-2pn-what-grading-methods-are-there-for",
  ],
  "oocyte-nuclear-maturity-and-morphological-grading": [
    "reproductive-medicine-human-fertility-oocytes-what-grading-methods-are-there-for",
  ],
  "inter-transfer-interval-immediate-vs-delayed-frozen-embryo-transfer": [
    "endometrial-receptivity-implantation-biology-wait-a-few-months-and-take-opportun",
  ],
};

/**
 * Checks whether `nodeSlug` represents the target discipline `targetSlug` (or one of its
 * known legacy aliases) without falsely matching child topics whose slug merely starts with
 * `${parent.slug}-...`.
 */
export function nodeMatchesSlug(nodeSlug: string, targetSlug: string): boolean {
  const candidates = [targetSlug, ...(LEGACY_SLUG_ALIASES[targetSlug] ?? [])];
  for (const candidate of candidates) {
    if (nodeSlug === candidate || nodeSlug.endsWith(`-${candidate}`)) {
      return true;
    }
  }
  return false;
}

/**
 * High-frequency domain nouns that appear across many distinct sub-disciplines and therefore
 * should never by themselves cause a narrow leaf inquiry (depth >= 4) to capture an unrelated
 * sibling inquiry as its child.
 */
const BROAD_DOMAIN_TERMS = new Set([
  "embryo",
  "embryos",
  "blastocyst",
  "blastocysts",
  "oocyte",
  "oocytes",
  "egg",
  "eggs",
  "sperm",
  "fertility",
  "infertility",
  "reproductive",
  "ivf",
  "icsi",
  "pregnancy",
  "transfer",
  "cycle",
  "cycles",
  "human",
  "clinical",
  "treatment",
  "treatments",
  "therapy",
  "therapies",
]);

const DOMAIN_HINTS: { slugSubstring: string; keywords: string[] }[] = [
  {
    slugSubstring: "mond-modified-newtonian-dynamics-and-galactic-rotation",
    keywords: ["mond", "milgrom", "tully-fisher", "btfr", "radial acceleration", "sparc", "mcgaugh", "teves", "aest", "external field effect", "rotation curve"],
  },
  {
    slugSubstring: "quantised-inertia-horizon-mechanics-and-unruh-radiation",
    keywords: ["quantised inertia", "quantized inertia", "mihsc", "mcculloch", "unruh", "rindler", "horizon mechanics", "anti-gravity", "antigravity", "propellantless", "podkletnov", "tajmar"],
  },
  {
    slugSubstring: "dark-matter-adhoc-epistemology-and-gr-breakdown-limits",
    keywords: ["dark matter", "ad-hoc", "adhoc", "wide binary", "wide binaries", "chae", "hernandez", "wimp", "xenonnt", "lux-zeplin", "halo", "breakdown", "galaxy rotation"],
  },
  {
    slugSubstring: "modified-emergent-and-frontier-gravity-theories",
    keywords: ["mond", "milgrom", "quantised inertia", "quantized inertia", "mihsc", "unruh", "wide binary", "wide binaries", "dark matter", "btfr", "rotation curve", "emergent gravity", "verlinde"],
  },
  {
    slugSubstring: "string-theory-m-theory-and-holographic-duality",
    keywords: ["string theory", "superstring", "m-theory", "calabi-yau", "ads/cft", "maldacena", "holographic", "swampland", "d-brane", "brane"],
  },
  {
    slugSubstring: "loop-quantum-gravity-spin-foams-and-causal-sets",
    keywords: ["loop quantum gravity", "lqg", "spin foam", "spin network", "ashtekar", "rovelli", "causal set", "asymptotic safety", "big bounce"],
  },
  {
    slugSubstring: "standard-model-gauge-theories-and-particle-physics",
    keywords: ["standard model", "higgs", "electroweak", "yang-mills", "qcd", "chromodynamics", "qed", "quark", "neutrino", "muon g-2", "fermilab", "lhc", "cern", "gauge"],
  },
  {
    slugSubstring: "quantum-mechanics-hilbert-space-and-entanglement",
    keywords: ["quantum mechanics", "schrodinger", "hilbert space", "entanglement", "bell", "chsh", "nonlocality", "decoherence", "wavefunction", "pilot-wave", "bohm", "many-worlds"],
  },
  {
    slugSubstring: "quantum-information-computing-and-error-correction",
    keywords: ["quantum computing", "qubit", "shor", "grover", "surface code", "error correction", "bqp", "quantum information", "teleportation"],
  },
  {
    slugSubstring: "analytical-mechanics-lagrangian-hamiltonian-symplectic",
    keywords: ["lagrangian", "hamiltonian", "symplectic", "least action", "euler-lagrange", "poisson bracket", "liouville", "kam theorem", "three-body", "classical mechanics"],
  },
  {
    slugSubstring: "thermodynamics-statistical-mechanics-and-entropy",
    keywords: ["thermodynamics", "statistical mechanics", "boltzmann", "gibbs", "partition function", "entropy", "ising", "renormalization", "jarzynski", "phase transition"],
  },
  {
    slugSubstring: "electrodynamics-maxwell-equations-and-classical-fields",
    keywords: ["electrodynamics", "maxwell", "electromagnetism", "poynting", "lorentz force", "magnetohydrodynamics", "mhd", "plasma", "navier-stokes"],
  },
  {
    slugSubstring: "relativity-gravitation-spacetime-physics",
    keywords: ["general relativity", "special relativity", "einstein", "spacetime", "gravitational wave", "ligo", "black hole", "kerr", "schwarzschild", "equivalence principle", "hubble tension"],
  },
  {
    slugSubstring: "differential-geometry-manifolds-and-topology",
    keywords: ["differential geometry", "manifold", "riemannian", "tensor", "fibre bundle", "fiber bundle", "topology", "homotopy", "chern-simons", "curvature"],
  },
  {
    slugSubstring: "group-theory-lie-algebras-and-symmetry",
    keywords: ["group theory", "lie group", "lie algebra", "noether", "representation theory", "symmetry", "poincare group", "su(3)", "su(2)"],
  },
  {
    slugSubstring: "functional-analysis-pdes-and-dynamical-systems",
    keywords: ["functional analysis", "banach", "operator algebra", "spectral theorem", "partial differential", "pde", "dynamical system", "lyapunov", "chaos", "ergodic"],
  },
  {
    slugSubstring: "probability-theory-stochastic-calculus-and-statistics",
    keywords: ["probability", "stochastic calculus", "ito", "brownian motion", "wiener", "martingale", "girsanov", "feynman-kac", "sde", "extreme value", "random matrix", "marchenko-pastur", "bayesian"],
  },
  {
    slugSubstring: "quantitative-finance-stochastic-calculus-and-derivatives",
    keywords: ["quantitative finance", "fin-quant", "finquant", "black-scholes", "bachelier", "derivatives", "option pricing", "heston", "sabr", "rough volatility", "risk-neutral", "greeks", "jump-diffusion"],
  },
  {
    slugSubstring: "econometrics-financial-time-series-and-statistical-arbitrage",
    keywords: ["econometrics", "time series", "garch", "arch", "arima", "cointegration", "ornstein-uhlenbeck", "statistical arbitrage", "stat-arb", "pairs trading", "kalman", "kelly criterion", "sharpe", "lopez de prado", "backtest", "alpha"],
  },
  {
    slugSubstring: "financial-markets-asset-pricing-and-market-microstructure",
    keywords: ["financial market", "asset pricing", "microstructure", "limit order book", "lob", "kyle", "glosten-milgrom", "bid-ask", "market impact", "fama-french", "capm", "efficient market", "liquidity", "order flow", "hft"],
  },
  {
    slugSubstring: "econophysics-complex-systems-and-tail-risk",
    keywords: ["econophysics", "mandelbrot", "fat tail", "power law", "tail risk", "sornette", "dragon-king", "lppl", "multifractal", "systemic risk", "contagion"],
  },
  {
    slugSubstring: "macroeconomics-political-economy-and-economic-history",
    keywords: ["macroeconomics", "monetary", "central bank", "inflation", "interest rate", "yield curve", "minsky", "dsge", "fiscal", "credit cycle"],
  },
  {
    slugSubstring: "microeconomics-game-theory-and-market-design",
    keywords: ["microeconomics", "game theory", "nash", "auction", "mechanism design", "adverse selection", "moral hazard", "prospect theory", "general equilibrium"],
  },
  {
    slugSubstring: "oocyte-nuclear-maturity-and-morphological-grading",
    keywords: ["oocyte grading", "oocyte morphology", "mii", "germinal vesicle", "polar body", "perivitelline", "zona pellucida", "ooplasm", "dysmorphism", "cumulus-oocyte"],
  },
  {
    slugSubstring: "zygote-pronuclear-scoring-2pn-1pn-3pn-fertilisation",
    keywords: ["1pn", "2pn", "0pn", "3pn", "pronuclear", "pronuclei", "pronucleus", "zygote", "fertilisation check", "fertilization check", "digyny", "polyspermy"],
  },
  {
    slugSubstring: "blastocyst-morphological-grading-gardner-criteria-morphokinetics",
    keywords: ["gardner", "bb/aa", "aa/bb", "4aa", "4bb", "5aa", "3bb", "blastocyst grading", "embryo grading", "inner cell mass", "trophectoderm", "morphokinetics", "time-lapse"],
  },
  {
    slugSubstring: "hyaluronan-embryo-transfer-media-embryoglue-implantation-adherence",
    keywords: ["embryo glue", "embryoglue", "hyaluronan", "hyaluronic acid", "adherence medium", "adherence media", "transfer medium", "transfer media", "cd44", "rhamm"],
  },
  {
    slugSubstring: "inter-transfer-interval-immediate-vs-delayed-frozen-embryo-transfer",
    keywords: [
      "immediate fet",
      "delayed fet",
      "postponed fet",
      "inter-transfer",
      "next embryo transfer",
      "failed embryo transfer",
      "failed transfer",
      "last embryo",
      "washout",
      "consecutive fet",
      "spaced out",
      "wait a few months",
      "endometrial reset",
      "next period",
    ],
  },
  {
    slugSubstring: "ovarian-reserve-oocyte-cryopreservation",
    keywords: ["vitrified", "vitrification", "cryopreservation", "egg freezing", "oocyte", "oocytes", "thaw", "warming", "amh", "follicle", "euploid", "aneuploidy", "duostim"],
  },
  {
    slugSubstring: "endometrial-receptivity-implantation-biology",
    keywords: [
      "endometrial",
      "endometrium",
      "uterine",
      "implantation",
      "fet",
      "luteal",
      "progesterone",
      "era",
      "adenomyosis",
      "endometriosis",
      "scratch",
      "hysteroscopy",
      "embryo glue",
      "embryoglue",
      "hyaluronan",
      "hyaluronic acid",
      "transfer medium",
      "transfer media",
      "adherence medium",
      "embryo transfer",
      "rif",
      "implantation failure",
      "cd44",
      "cd138",
      "endometritis",
    ],
  },
  {
    slugSubstring: "andrology-male-factor-infertility",
    keywords: ["sperm", "male", "paternal", "icsi", "zymot", "dna fragmentation", "dfi", "testicular", "tese", "andrology", "semen", "varicocele", "motility"],
  },
  {
    slugSubstring: "assisted-reproductive-technology-gamete-donation",
    keywords: ["donor", "donation", "recipient", "oocyte donation", "spain", "portugal", "czech", "greece", "anonymity", "clinic", "immunology", "kir", "hla", "blastocyst", "gardner", "1pn", "2pn", "grading", "pgt-a"],
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

interface CanonicalFacetSpec {
  slug: string;
  title: string;
  brief: string;
  parentSlugs: string[];
  matches: (qLower: string, terms: Set<string>) => boolean;
}

/**
 * Canonical scientific sub-disciplines that AI maps multi-faceted inquiries onto
 * so user questions are decomposed into clean, formal taxonomy branches rather than
 * raw conversational strings.
 */
const CANONICAL_TOPIC_FACETS: CanonicalFacetSpec[] = [
  {
    slug: "hyaluronan-embryo-transfer-media-embryoglue-implantation-adherence",
    title: "Hyaluronan-Enriched Embryo Transfer Media (EmbryoGlue) & Implantation Adherence",
    brief:
      "Randomised clinical trials, Cochrane meta-analyses, and biophysical mechanisms of hyaluronan-enriched embryo transfer medium (EmbryoGlue, 0.5 mg/mL hyaluronan) versus standard low-hyaluronan transfer media: CD44 and RHAMM receptor-mediated embryo–endometrial apposition, luminal fluid viscosity, live-birth and clinical pregnancy rates across fresh and frozen-thawed embryo transfers (FET), recurrent implantation failure (RIF) and maternal age ≥35 subgroups, multiple pregnancy risk, and ESHRE add-on guidance.",
    parentSlugs: [
      "endometrial-receptivity-implantation-biology",
      "assisted-reproductive-technology-gamete-donation",
      "reproductive-medicine-human-fertility",
    ],
    matches: (q, terms) =>
      /\b(embryo\s*glue|embryoglue|hyaluronan|hyaluronic\s+acid|adherence\s+medi(?:um|a)|transfer\s+medi(?:um|a))\b/.test(q) ||
      terms.has("embryoglue") ||
      terms.has("hyaluronan") ||
      (terms.has("glue") &&
        (terms.has("embryo") || terms.has("embryos") || terms.has("transfer") || terms.has("fet") || terms.has("ivf") || terms.has("implantation"))),
  },
  {
    slug: "inter-transfer-interval-immediate-vs-delayed-frozen-embryo-transfer",
    title: "Inter-Transfer Interval: Immediate vs. Delayed Frozen Embryo Transfer (FET) & Endometrial Reset",
    brief:
      "Immediate next-menstrual-cycle Frozen Embryo Transfer (FET) versus multi-month delayed transfer after a failed embryo transfer or retrieval, cryostorage duration safety at −196°C, HPO-axis washout from programmed HRT to natural ovulatory cycles, CD138 chronic endometritis clearance, and strategic optimization before transferring a final remaining embryo.",
    parentSlugs: [
      "endometrial-receptivity-implantation-biology",
      "reproductive-medicine-human-fertility",
    ],
    matches: (q, terms) =>
      /\b(immediate\s+(?:vs\.?|versus|or)\s+(?:delayed|postponed|spaced)|inter-transfer\s+interval|next\s+embryo\s+transfer|failed\s+(?:embryo\s+)?transfer|last\s+embryo|wait\s+a\s+few\s+months|consecutive\s+(?:or|vs\.?|versus)\s+spaced)\b/.test(
        q,
      ) ||
      ((terms.has("transfer") || terms.has("fet") || terms.has("embryo")) &&
        (terms.has("immediate") ||
          terms.has("delayed") ||
          terms.has("postponed") ||
          terms.has("consecutive") ||
          terms.has("spaced") ||
          terms.has("reset") ||
          terms.has("wait") ||
          terms.has("period"))),
  },
  {
    slug: "blastocyst-morphological-grading-gardner-criteria-morphokinetics",
    title: "Blastocyst Morphological Grading (Gardner AA/BB System) & Embryo Morphokinetics",
    brief:
      "Gardner & Schoolcraft blastocyst scoring (expansion stages 1–6, Inner Cell Mass grades A–C, Trophectoderm grades A–C: AA, AB, BA, BB, BC, CC), Day 3 cleavage compaction, time-lapse morphokinetic intervals, euploidy correlation, and live-birth outcomes.",
    parentSlugs: [
      "assisted-reproductive-technology-gamete-donation",
      "reproductive-medicine-human-fertility",
    ],
    matches: (q, terms) =>
      /\b(bb\/aa|aa\/bb|4aa|5aa|3aa|4ab|4ba|4bb|3bb|5bb|gardner|morphokinetic|morphokinetics|time-lapse|inner cell mass|trophectoderm)\b/.test(q) ||
      ((terms.has("bb") || terms.has("aa")) && (terms.has("grading") || terms.has("embryo") || terms.has("embryos") || terms.has("blastocyst"))) ||
      ((terms.has("embryo") || terms.has("embryos") || terms.has("blastocyst") || terms.has("blastocysts")) &&
        (terms.has("grading") || terms.has("grade") || terms.has("grades") || terms.has("morphology") || terms.has("scoring"))),
  },
  {
    slug: "zygote-pronuclear-scoring-2pn-1pn-3pn-fertilisation",
    title: "Zygote Pronuclear Scoring (2PN, 1PN, 0PN & 3PN) & Fertilisation Ploidy Assessment",
    brief:
      "ESHRE/Istanbul fertilisation check at 16–18 hours post-insemination, normal diploid 2PN2PB zygotes, monopronuclear (1PN) and appronuclear (0PN) biparental diploid rescue via PGT-A/SNP haplotyping, and tripronuclear (3PN) polyspermy/digyny exclusion.",
    parentSlugs: [
      "assisted-reproductive-technology-gamete-donation",
      "reproductive-medicine-human-fertility",
    ],
    matches: (q, terms) =>
      /\b(1pn|2pn|0pn|3pn|pronuclear|pronuclei|pronucleus|zygote\s+grading|zygote\s+scoring|fertilis[a-z]+\s+check|fertiliz[a-z]+\s+check)\b/.test(q) ||
      terms.has("1pn") ||
      terms.has("2pn") ||
      terms.has("0pn") ||
      terms.has("3pn") ||
      terms.has("pronuclear"),
  },
  {
    slug: "oocyte-nuclear-maturity-and-morphological-grading",
    title: "Oocyte Nuclear Maturity (MII/MI/GV) & Morphological Grading",
    brief:
      "Istanbul consensus oocyte assessment, Metaphase II (MII) vs Metaphase I (MI) and Germinal Vesicle (GV) nuclear maturity, polar body integrity, perivitelline space, zona pellucida birefringence, smooth endoplasmic reticulum (SER) aggregates, and cytoplasmic dysmorphisms.",
    parentSlugs: [
      "ovarian-reserve-oocyte-cryopreservation",
      "reproductive-medicine-human-fertility",
    ],
    matches: (q, terms) =>
      /\b(oocyte\s+grading|oocytes?\s+morphology|egg\s+grading|polar\s+body|germinal\s+vesicle|perivitelline|ooplasm|zona\s+pellucida|metaphase\s+ii)\b/.test(q) ||
      ((terms.has("oocyte") || terms.has("oocytes") || terms.has("egg") || terms.has("eggs") || terms.has("mii") || terms.has("gv")) &&
        (terms.has("grading") || terms.has("grade") || terms.has("grades") || terms.has("morphology") || terms.has("maturity") || terms.has("scoring") || terms.has("quality"))),
  },
  {
    slug: "mitochondrial-replacement-therapy-ooplasmic-transfer",
    title: "Mitochondrial Replacement Therapy & Ooplasmic Transfer",
    brief:
      "Maternal spindle transfer (MST), pronuclear transfer (PNT), germinal vesicle transfer, autologous mitochondrial injection, heteroplasmy drift, and clinical trials preserving 100% parental nuclear DNA.",
    parentSlugs: [
      "translational-geroprotective-reproductive-biology",
      "reproductive-medicine-human-fertility",
    ],
    matches: (q) => /\b(spindle\s+transfer|pronuclear\s+transfer|mitochondrial\s+replacement|ooplasmic\s+transfer|\bmst\b|\bpnt\b|\bmrt\b)\b/.test(q),
  },
  {
    slug: "in-vitro-gametogenesis-pluripotent-stem-cell-reprogramming",
    title: "In Vitro Gametogenesis & Pluripotent Stem Cell Reprogramming",
    brief:
      "Reconstitution of human oogenesis from induced pluripotent stem cells (iPSCs), primordial germ cell specification, meiotic checkpoints, and iPSC-derived ovarian support cells (engineered IVM).",
    parentSlugs: [
      "translational-geroprotective-reproductive-biology",
      "reproductive-medicine-human-fertility",
    ],
    matches: (q) => /\b(in\s+vitro\s+gametogenesis|\bivg\b|ovarian\s+support\s+cell|gameto|fertilo)\b/.test(q),
  },
  {
    slug: "mtor-pathway-modulation-follicular-longevity",
    title: "mTOR Pathway Modulation & Follicular Longevity",
    brief:
      "Mechanistic and clinical studies of mTORC1 inhibition (rapamycin VIBRANT trial), NAD+/NMN sirtuin spindle stabilization, and spermidine mitophagy activation in ovarian aging.",
    parentSlugs: [
      "translational-geroprotective-reproductive-biology",
      "reproductive-medicine-human-fertility",
    ],
    matches: (q, terms) =>
      // Trigger only when part of a multi-concept query or question so single custom topic titles stay direct
      (terms.has("rapamycin") || terms.has("mtor") || terms.has("nmn") || terms.has("spermidine") || terms.has("coq10")) &&
      (/[,?;]|(\band\b)|(\bvs\b)|(\bwhat\b)|(\bhow\b)/.test(q) && terms.size >= 4),
  },
  {
    slug: "intraovarian-platelet-rich-plasma-stem-cell-biologics",
    title: "Intraovarian Platelet-Rich Plasma & Stem Cell Biologics",
    brief:
      "Hippo pathway in vitro activation (IVA), paracrine angiogenic signaling, autologous PRP, extracellular vesicles, and clinical evaluation of intraovarian biologics.",
    parentSlugs: [
      "translational-geroprotective-reproductive-biology",
      "reproductive-medicine-human-fertility",
    ],
    matches: (q, terms) =>
      (terms.has("prp") || /\b(platelet-rich\s+plasma|ovarian\s+rejuvenation|in\s+vitro\s+activation)\b/.test(q)) &&
      (/[,?;]|(\band\b)|(\bvs\b)|(\bwhat\b)|(\bhow\b)/.test(q) && terms.size >= 3),
  },
  {
    slug: "sperm-chromatin-integrity-dna-fragmentation-diagnostics",
    title: "Sperm Chromatin Integrity & DNA Fragmentation Diagnostics",
    brief:
      "Oxidative and apoptotic mechanisms of sperm DNA damage, microfluidic chip sorting (ZyMōt), testicular sperm bypass (TESA/TESE), and comparative diagnostic accuracy of TUNEL, SCSA, SCD, and Comet assays.",
    parentSlugs: [
      "andrology-male-factor-infertility",
      "reproductive-medicine-human-fertility",
    ],
    matches: (q, terms) =>
      /\b(dna\s+fragmentation|\bdfi\b|zymot|zimot|microfluidic\s+sperm|testicular\s+sperm|\btesa\b|\btese\b)\b/.test(q) ||
      (terms.has("sperm") && (terms.has("fragmentation") || terms.has("chromatin") || terms.has("zymot"))),
  },
  {
    slug: "paternal-age-effects-on-gamete-embryo-offspring-health",
    title: "Paternal Age Effects on Gamete, Embryo & Offspring Health",
    brief:
      "Epidemiological and molecular effects of paternal age across the lifespan on blastocyst development, de novo germline mutations, and offspring health.",
    parentSlugs: [
      "andrology-male-factor-infertility",
      "reproductive-medicine-human-fertility",
    ],
    matches: (q) => /\b(paternal\s+age|male\s+age|older\s+father)\b/.test(q),
  },
  {
    slug: "lifestyle-metabolic-and-environmental-fertility-optimization",
    title: "Lifestyle, Metabolic Health & Natural Conception Optimization",
    brief:
      "Impact of insulin sensitivity, circadian sleep architecture, physical activity, thermal and endocrine-disrupting chemical exposure, and body composition on natural fecundity, ovulatory regularity, and time-to-pregnancy.",
    parentSlugs: [
      "reproductive-medicine-human-fertility",
    ],
    matches: (q, terms) =>
      (terms.has("lifestyle") || /\b(organically\s+conceiv|natural\s+conception|conceiv[a-z]+\s+naturally)\b/.test(q)) &&
      (terms.has("fertility") || terms.has("conceiving") || terms.has("conceive") || terms.has("conception") || terms.has("sperm") || terms.has("ovarian")),
  },
  {
    slug: "reproductive-nutrition-dietary-patterns-and-fertility",
    title: "Reproductive Nutrition, Dietary Patterns & Ovulatory Function",
    brief:
      "Mediterranean and pro-fertility dietary cohorts (EARTH and Nurses' Health Study II), omega-3 polyunsaturated fatty acids, glycemic load, folate-methylation pathways, and clinical fecundability outcomes.",
    parentSlugs: [
      "reproductive-medicine-human-fertility",
    ],
    matches: (q, terms) =>
      (terms.has("nutrition") || terms.has("diet") || terms.has("dietary")) &&
      (terms.has("fertility") || terms.has("conceiving") || terms.has("conception") || terms.has("sperm") || terms.has("ovarian") || terms.has("oocyte") || terms.has("embryo")),
  },
  {
    slug: "micronutrient-antioxidant-and-mitochondrial-fertility-supplementation",
    title: "Micronutrient, Antioxidant & Mitochondrial Fertility Supplementation",
    brief:
      "Randomised trials and meta-analyses of Coenzyme Q10 (ubiquinol), myo-inositol, DHEA, L-carnitine, N-acetylcysteine, melatonin, methylfolate, vitamin D, and zinc/selenium on oocyte maturity, sperm chromatin integrity, and live birth.",
    parentSlugs: [
      "translational-geroprotective-reproductive-biology",
      "reproductive-medicine-human-fertility",
    ],
    matches: (q, terms) =>
      (terms.has("supplement") || terms.has("supplements") || terms.has("supplementation") || terms.has("micronutrient") || terms.has("antioxidant")) &&
      (terms.has("fertility") || terms.has("conceiving") || terms.has("conception") || terms.has("sperm") || terms.has("ovarian") || terms.has("oocyte") || terms.has("embryo")),
  },
  {
    slug: "ovarian-rejuvenation-follicular-activation-and-geroprotective-therapy",
    title: "Ovarian Rejuvenation, Follicular Activation & Geroprotective Therapy",
    brief:
      "Intraovarian platelet-rich plasma (PRP), Hippo/PI3K pathway primordial follicle activation, mTOR modulation (rapamycin), NAD+/sirtuin mitochondrial restoration, and stem-cell secretome trials in diminished ovarian reserve.",
    parentSlugs: [
      "translational-geroprotective-reproductive-biology",
      "ovarian-reserve-oocyte-cryopreservation",
      "reproductive-medicine-human-fertility",
    ],
    matches: (q, terms) =>
      /\b(rejuvenat[a-z]*)\b/.test(q) &&
      (terms.has("ovarian") || terms.has("ovary") || terms.has("ovaries") || terms.has("oocyte") || terms.has("oocytes") || terms.has("egg") || terms.has("eggs")),
  },
  {
    slug: "spermatogenesis-oxidative-stress-and-male-gamete-rejuvenation",
    title: "Spermatogenesis, Oxidative Stress & Male Gamete Rejuvenation",
    brief:
      "Testicular mitochondrial bioenergetics, reactive oxygen species (ROS) mitigation, hormonal axis restoration, varicocele/scrotal thermoregulation, and antioxidant/lifestyle interventions on sperm motility, morphology, and DNA fragmentation.",
    parentSlugs: [
      "andrology-male-factor-infertility",
      "reproductive-medicine-human-fertility",
    ],
    matches: (q, terms) =>
      /\b(rejuvenat[a-z]*)\b/.test(q) &&
      (terms.has("sperm") || terms.has("spermatogenesis") || terms.has("semen") || terms.has("male") || terms.has("testicular")),
  },
  {
    slug: "mond-modified-newtonian-dynamics-and-galactic-rotation",
    title: "Modified Newtonian Dynamics (MOND), Relativistic Extensions & Galactic Dynamics",
    brief:
      "Milgrom's acceleration threshold a0 ≈ 1.2×10^-10 m/s^2, zero-parameter Baryonic Tully–Fisher and Radial Acceleration Relations across SPARC galaxies, the External Field Effect, and AeST relativistic field theory.",
    parentSlugs: [
      "modified-emergent-and-frontier-gravity-theories",
      "relativity-gravitation-spacetime-physics",
      "physics-and-cosmology",
    ],
    matches: (q, terms) =>
      (terms.has("mond") || terms.has("milgrom") || terms.has("btfr")) &&
      (/[,?;]|(\band\b)|(\bvs\b)|(\bversus\b)|(\bwhat\b)|(\bhow\b)/.test(q) && terms.size >= 4),
  },
  {
    slug: "quantised-inertia-horizon-mechanics-and-unruh-radiation",
    title: "Quantised Inertia (MiHsC), Horizon Mechanics, Unruh Radiation & Anti-Gravity Propulsion",
    brief:
      "Mike McCulloch's Hubble-scale Casimir/Rindler horizon model of inertia, Unruh radiation damping, zero-parameter galaxy rotation and wide-binary predictions, and laboratory horizon-drive/anti-gravity thrust bounds.",
    parentSlugs: [
      "modified-emergent-and-frontier-gravity-theories",
      "relativity-gravitation-spacetime-physics",
      "physics-and-cosmology",
    ],
    matches: (q, terms) =>
      (/\b(quantised\s+inertia|quantized\s+inertia|mihsc|unruh)\b/.test(q) || terms.has("mihsc")) &&
      (/[,?;]|(\band\b)|(\bvs\b)|(\bversus\b)|(\bwhat\b)|(\bhow\b)/.test(q) && terms.size >= 4),
  },
  {
    slug: "dark-matter-adhoc-epistemology-and-gr-breakdown-limits",
    title: "Dark Matter Ad-Hoc Parameters vs. General Relativity Breakdown at Galactic & Wide-Binary Scales",
    brief:
      "Epistemic audit of per-galaxy ΛCDM halo parameter fitting and 40-year WIMP direct-detection nulls versus the empirical breakdown of General Relativity in galactic rotation curves and Gaia DR3 wide binary star systems.",
    parentSlugs: [
      "modified-emergent-and-frontier-gravity-theories",
      "relativity-gravitation-spacetime-physics",
      "physics-and-cosmology",
    ],
    matches: (q) =>
      /\b(dark\s+matter|wide\s+binar(?:y|ies)|wimp)\b/.test(q) &&
      /[,?;]|(\band\b)|(\bvs\b)|(\bversus\b)|(\bwhat\b)|(\bhow\b)/.test(q),
  },
];

function scoreNodeForQuery(
  node: SearchTreeNode,
  queryLower: string,
  terms: string[],
  matchedTopicIds: Set<string>,
): number {
  const titleLower = node.title.toLowerCase();
  const briefLower = (node.brief ?? "").toLowerCase();
  let score = 0;
  let specificTermMatches = 0;

  for (const term of terms) {
    if (term.length < 3 && !ACRONYM_CASE[term]) continue;
    const isBroad = BROAD_DOMAIN_TERMS.has(term);
    if (titleLower.includes(term)) {
      score += isBroad ? 1 : 5;
      if (!isBroad) specificTermMatches++;
    } else if (briefLower.includes(term)) {
      score += isBroad ? 1 : 3;
      if (!isBroad) specificTermMatches++;
    }
  }

  for (const hint of DOMAIN_HINTS) {
    if (nodeMatchesSlug(node.slug, hint.slugSubstring)) {
      for (const kw of hint.keywords) {
        if (queryLower.includes(kw)) {
          const isBroadKw = BROAD_DOMAIN_TERMS.has(kw);
          score += isBroadKw ? 2 : 6;
          if (!isBroadKw) specificTermMatches++;
        }
      }
    }
  }

  // Narrow depth >= 4 inquiries must never capture sibling inquiries based solely on broad nouns like "embryo"
  if (node.depth >= 4 && specificTermMatches === 0) {
    return 0;
  }

  if (matchedTopicIds.has(node.id) && score > 0) {
    score += 4;
  }
  if (score > 0 && node.depth >= 1 && node.depth <= 3) {
    score += 3;
  }
  return score;
}

function buildSingleBranchProposal(
  clause: string,
  eligibleNodes: SearchTreeNode[],
  allTreeNodes: SearchTreeNode[],
  matchedTopics: SearchTopicMatch[],
): SuggestedBranch {
  const title = suggestTopicTitle(clause);
  const cleanClause = stripConversationalScaffolding(clause) || title;
  const brief = `Synthesise the peer-reviewed record on ${cleanClause}: systematic reviews, randomised clinical trials, large cohort studies, quantitative effect sizes, safety signals, and active trials.`;

  if (eligibleNodes.length === 0) {
    return {
      title,
      brief,
      parentId: null,
      parentTitle: null,
      parentSlug: null,
      reason: "Creates a new root discipline in the Tree of Knowledge.",
      canonicalSlug: null,
      existingTopicId: null,
      existingTopicSlug: null,
    };
  }

  const terms = extractSearchTerms(clause);
  const queryLower = cleanClause.toLowerCase();
  const matchedTopicIds = new Set(matchedTopics.map((m) => m.id));

  // Check if an existing node in the tree already has virtually the same title
  const existingExact = allTreeNodes.find(
    (n) => n.title.toLowerCase() === title.toLowerCase(),
  );
  if (existingExact) {
    const parent = allTreeNodes.find((n) => n.id === existingExact.parentId) ?? null;
    return {
      title: existingExact.title,
      brief: existingExact.brief ?? brief,
      parentId: parent?.id ?? existingExact.parentId,
      parentTitle: parent?.title ?? null,
      parentSlug: parent?.slug ?? null,
      reason: `Canonical branch already present in the Tree of Knowledge${parent ? ` under ${parent.title}` : ""}.`,
      canonicalSlug: existingExact.slug,
      existingTopicId: existingExact.id,
      existingTopicSlug: existingExact.slug,
    };
  }

  let bestNode: SearchTreeNode | null = null;
  let bestScore = 0;

  for (const node of eligibleNodes) {
    const score = scoreNodeForQuery(node, queryLower, terms, matchedTopicIds);
    if (score > bestScore) {
      bestScore = score;
      bestNode = node;
    }
  }

  // If no domain hint or multi-term overlap matched, fall back to a matched canonical discipline (depth <= 3) from search
  if (!bestNode) {
    for (const matched of matchedTopics) {
      const eligible = eligibleNodes.find((n) => n.id === matched.id && n.depth <= 3);
      if (eligible) {
        return {
          title,
          brief,
          parentId: eligible.id,
          parentTitle: eligible.title,
          parentSlug: eligible.slug,
          reason: `Placed by AI under ${eligible.title} based on archive proximity.`,
          canonicalSlug: null,
          existingTopicId: null,
          existingTopicSlug: null,
        };
      }
    }
  }

  if (bestNode) {
    return {
      title,
      brief,
      parentId: bestNode.id,
      parentTitle: bestNode.title,
      parentSlug: bestNode.slug,
      reason: `Placed by AI under ${bestNode.title} based on scientific domain taxonomy.`,
      canonicalSlug: null,
      existingTopicId: null,
      existingTopicSlug: null,
    };
  }

  const fallback =
    eligibleNodes.find((n) => nodeMatchesSlug(n.slug, "reproductive-medicine-human-fertility")) ??
    eligibleNodes.find((n) => n.depth === 0) ??
    eligibleNodes[0]!;

  return {
    title,
    brief,
    parentId: fallback.id,
    parentTitle: fallback.title,
    parentSlug: fallback.slug,
    reason: `Placed by AI under ${fallback.title}.`,
    canonicalSlug: null,
    existingTopicId: null,
    existingTopicSlug: null,
  };
}

/**
 * Splits a multi-clause or multi-subject question into distinct scientific sub-inquiries
 * when the question asks about 2 to 4 separate mechanisms, methods, or topics.
 */
function splitCompoundInquiryClauses(query: string): string[] {
  const cleaned = stripConversationalScaffolding(query);
  if (!cleaned) return [];

  // Only split if the user clearly wrote a compound question with commas, semicolons, or "vs"/"versus"
  const hasExplicitSeparators = /[,;]|\b(?:vs\.?|versus)\b/i.test(cleaned);
  if (!hasExplicitSeparators) return [cleaned];

  const rawParts = cleaned
    .split(/\s*(?:;|,|\bvs\.?\b|\bversus\b|\band\b)\s*/i)
    .map((p) => p.trim())
    .filter((p) => extractSearchTerms(p).length >= 1 && p.length >= 3);

  if (rawParts.length < 2 || rawParts.length > 5) return [cleaned];
  return rawParts.slice(0, 4);
}

/**
 * AI Tree Organiser: decomposes a user question or research inquiry into 1, 2, 3, or more
 * canonical scientific branches and determines the exact parent discipline in the Tree of
 * Knowledge for each branch.
 */
export function inferBranchProposals(
  query: string,
  treeNodes: SearchTreeNode[],
  matchedTopics: SearchTopicMatch[] = [],
): SuggestedBranch[] {
  const eligibleNodes = treeNodes.filter((n) => n.depth < 5);
  const normalizedQuery = query
    .trim()
    .replace(/\b([a-z0-9]+)\s+end\s+([a-z0-9]+)\b/gi, "$1 and $2");
  const qLower = normalizedQuery.toLowerCase();
  const termSet = new Set(extractSearchTerms(normalizedQuery));

  const proposals: SuggestedBranch[] = [];
  const usedTitles = new Set<string>();

  // 1. Check canonical scientific facets first (supports spawning 2, 3, or more topics from one question)
  for (const facet of CANONICAL_TOPIC_FACETS) {
    if (!facet.matches(qLower, termSet)) continue;
    if (usedTitles.has(facet.title.toLowerCase())) continue;
    usedTitles.add(facet.title.toLowerCase());

    const existingNode = treeNodes.find(
      (n) =>
        nodeMatchesSlug(n.slug, facet.slug) ||
        n.title.toLowerCase() === facet.title.toLowerCase(),
    );
    const existingParent = existingNode?.parentId
      ? treeNodes.find((n) => n.id === existingNode.parentId) ?? null
      : null;

    let parentNode: SearchTreeNode | null = null;
    for (const candidateSlug of facet.parentSlugs) {
      const found = eligibleNodes.find(
        (n) =>
          n.id !== existingNode?.id &&
          nodeMatchesSlug(n.slug, candidateSlug),
      );
      if (found) {
        parentNode = found;
        break;
      }
    }
    if (!parentNode) {
      parentNode = existingParent;
    }
    if (!parentNode && eligibleNodes.length > 0) {
      const fallback = buildSingleBranchProposal(facet.title, eligibleNodes, treeNodes, matchedTopics);
      parentNode = eligibleNodes.find((n) => n.id === fallback.parentId) ?? eligibleNodes[0]!;
    }

    proposals.push({
      title: existingNode?.title ?? facet.title,
      brief: existingNode?.brief ?? facet.brief,
      parentId: parentNode?.id ?? null,
      parentTitle: parentNode?.title ?? null,
      parentSlug: parentNode?.slug ?? null,
      reason: existingNode
        ? `Canonical discipline already organised under ${parentNode?.title ?? "the Tree of Knowledge"}.`
        : `Organised by AI under ${parentNode?.title ?? "the Tree of Knowledge"} using canonical scientific taxonomy.`,
      canonicalSlug: facet.slug,
      existingTopicId: existingNode?.id ?? null,
      existingTopicSlug: existingNode?.slug ?? null,
    });

    if (proposals.length >= 4) break;
  }

  if (proposals.length > 0) {
    return proposals;
  }

  // 2. General multi-clause decomposition for compound questions outside pre-indexed facets
  const clauses = splitCompoundInquiryClauses(normalizedQuery);
  if (clauses.length >= 2) {
    for (const clause of clauses) {
      const proposal = buildSingleBranchProposal(clause, eligibleNodes, treeNodes, matchedTopics);
      const key = proposal.title.toLowerCase();
      if (!usedTitles.has(key)) {
        usedTitles.add(key);
        proposals.push(proposal);
      }
      if (proposals.length >= 4) break;
    }
    if (proposals.length >= 2) {
      return proposals;
    }
  }

  // 3. Single canonical branch placement
  return [buildSingleBranchProposal(normalizedQuery, eligibleNodes, treeNodes, matchedTopics)];
}

/**
 * Recommends the primary parent topic in the Tree of Knowledge under which to spawn
 * a sub-branch for the given query. For multi-branch inquiries, see `inferBranchProposals`.
 */
export function inferBranchProposal(
  query: string,
  treeNodes: SearchTreeNode[],
  matchedTopics: SearchTopicMatch[] = [],
): SuggestedBranch {
  return inferBranchProposals(query, treeNodes, matchedTopics)[0]!;
}

/**
 * Foundational structural trunks of the Tree of Knowledge whose canonical position
 * is fixed by the taxonomy skeleton and should never be reparented automatically.
 */
const PROTECTED_TAXONOMY_SLUGS = new Set([
  "applied-sciences-medicine-longevity",
  "life-sciences-biology-biomedicine",
  "physical-sciences-chemistry-cosmology",
  "formal-sciences-mathematics-logic-statistics",
  "economics-financial-markets-quantitative-finance",
  "reproductive-medicine-human-fertility",
  "geroscience-longevity-cellular-rejuvenation",
  "neuroscience-cognition-brain-aging",
  "physics-and-cosmology",
  "mathematics-and-theoretical-foundations",
  "probability-statistics-stochastic-processes",
  "computer-science-artificial-intelligence",
  "ovarian-reserve-oocyte-cryopreservation",
  "assisted-reproductive-technology-gamete-donation",
  "endometrial-receptivity-implantation-biology",
  "andrology-male-factor-infertility",
  "translational-geroprotective-reproductive-biology",
  "maternal-perinatal-epidemiology-advanced-age",
  "classical-mechanics-analytical-dynamics",
  "quantum-mechanics-many-body-theory",
  "particle-physics-and-standard-model",
  "relativity-gravitation-spacetime-physics",
  "quantum-gravity-string-theory-holography",
  "modified-emergent-and-frontier-gravity-theories",
  "differential-geometry-topology-manifolds",
  "algebra-lie-groups-representation-theory",
  "functional-analysis-pde-operator-theory",
  "stochastic-calculus-sdes-random-matrices",
  "statistical-inference-bayesian-econometrics",
  "asset-pricing-market-microstructure",
  "derivatives-volatility-quantitative-strategies",
  "econophysics-complex-systems-tail-risk",
]);

export interface TaxonomyReassessment {
  topicId: string;
  currentParentId: string | null;
  recommendedParentId: string | null;
  recommendedParentTitle: string | null;
  recommendedParentSlug: string | null;
  shouldMove: boolean;
  reason: string;
  crossLinks: Array<{
    linkedTopicId: string;
    linkedTopicSlug: string;
    linkedTopicTitle: string;
    relation: string;
    note: string;
  }>;
}

/**
 * Continuously re-assesses a topic's canonical taxonomy placement and cross-discipline links
 * against the live Tree of Knowledge using its title, brief, summary, and harvested evidence.
 */
export function reassessTopicTaxonomy(
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
): TaxonomyReassessment {
  const currentParent = topic.parentId
    ? treeNodes.find((n) => n.id === topic.parentId) ?? null
    : null;

  // Collect all descendants of `topic.id` so we never introduce a cycle
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

  const eligibleParents = treeNodes.filter(
    (n) => !descendantIds.has(n.id) && n.depth < 5,
  );

  const combinedText = [topic.title, topic.brief ?? "", topic.summary ?? "", extraEvidenceText]
    .filter(Boolean)
    .join(" ")
    .replace(/\b([a-z0-9]+)\s+end\s+([a-z0-9]+)\b/gi, "$1 and $2");
  const lowerText = combinedText.toLowerCase();
  const terms = extractSearchTerms(combinedText);
  const termSet = new Set(terms);
  const emptySet = new Set<string>();

  // Discover cross-discipline links across other branches in the tree
  const scoredPeers = treeNodes
    .filter(
      (n) =>
        n.id !== topic.id &&
        n.id !== topic.parentId &&
        !descendantIds.has(n.id) &&
        n.depth >= 1,
    )
    .map((n) => ({
      node: n,
      score: scoreNodeForQuery(n, lowerText, terms, emptySet),
    }))
    .filter((x) => x.score >= 8)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const crossLinks = scoredPeers.map(({ node }) => ({
    linkedTopicId: node.id,
    linkedTopicSlug: node.slug,
    linkedTopicTitle: node.title,
    relation: "intersects",
    note: `Shared mechanisms, study designs, or quantitative benchmarks between ${topic.title} and ${node.title}.`,
  }));

  // Protected structural trunks stay where they are, while still receiving cross-discipline links
  const isProtectedTrunk = Array.from(PROTECTED_TAXONOMY_SLUGS).some((s) =>
    nodeMatchesSlug(topic.slug, s),
  );

  if (isProtectedTrunk || eligibleParents.length === 0) {
    return {
      topicId: topic.id,
      currentParentId: topic.parentId,
      recommendedParentId: topic.parentId,
      recommendedParentTitle: currentParent?.title ?? null,
      recommendedParentSlug: currentParent?.slug ?? null,
      shouldMove: false,
      reason: "Protected canonical taxonomy trunk.",
      crossLinks,
    };
  }

  // 1. Check canonical scientific facets first
  for (const facet of CANONICAL_TOPIC_FACETS) {
    const slugMatches = nodeMatchesSlug(topic.slug, facet.slug);
    if (!slugMatches && !facet.matches(lowerText, termSet)) continue;

    for (const candidateSlug of facet.parentSlugs) {
      const canonicalParent = eligibleParents.find((n) =>
        nodeMatchesSlug(n.slug, candidateSlug),
      );
      if (canonicalParent) {
        const shouldMove = topic.parentId !== canonicalParent.id;
        return {
          topicId: topic.id,
          currentParentId: topic.parentId,
          recommendedParentId: canonicalParent.id,
          recommendedParentTitle: canonicalParent.title,
          recommendedParentSlug: canonicalParent.slug,
          shouldMove,
          reason: shouldMove
            ? `Re-routed from ${currentParent?.title ?? "root"} to canonical parent ${canonicalParent.title}.`
            : `Verified under canonical parent ${canonicalParent.title}.`,
          crossLinks,
        };
      }
    }
  }

  // 2. Score all eligible parent disciplines using title + brief + harvested evidence
  const currentScore = currentParent
    ? scoreNodeForQuery(currentParent, lowerText, terms, emptySet)
    : 0;

  let bestCandidate: SearchTreeNode | null = null;
  let bestScore = 0;
  for (const candidate of eligibleParents) {
    const s = scoreNodeForQuery(candidate, lowerText, terms, emptySet);
    if (s > bestScore) {
      bestScore = s;
      bestCandidate = candidate;
    }
  }

  if (!bestCandidate || bestCandidate.id === topic.parentId) {
    return {
      topicId: topic.id,
      currentParentId: topic.parentId,
      recommendedParentId: topic.parentId,
      recommendedParentTitle: currentParent?.title ?? null,
      recommendedParentSlug: currentParent?.slug ?? null,
      shouldMove: false,
      reason: `Current placement under ${currentParent?.title ?? "root"} remains optimal.`,
      crossLinks,
    };
  }

  const isOrphanRoot = topic.parentId === null && bestScore >= 5;
  const currentParentUnrelated = currentScore === 0 && bestScore >= 6;
  const isEscapingNarrowSiblingParent = Boolean(
    currentParent &&
      currentParent.depth >= 4 &&
      bestCandidate.depth <= 3 &&
      bestScore > currentScore,
  );
  const isMoreSpecificChildOfCurrent =
    bestCandidate.parentId === topic.parentId && bestScore >= currentScore + 5;
  const isStrongerAcrossTree = bestScore >= currentScore + 10;

  const shouldMove =
    isOrphanRoot ||
    currentParentUnrelated ||
    isEscapingNarrowSiblingParent ||
    isMoreSpecificChildOfCurrent ||
    isStrongerAcrossTree;

  return {
    topicId: topic.id,
    currentParentId: topic.parentId,
    recommendedParentId: shouldMove ? bestCandidate.id : topic.parentId,
    recommendedParentTitle: shouldMove ? bestCandidate.title : (currentParent?.title ?? null),
    recommendedParentSlug: shouldMove ? bestCandidate.slug : (currentParent?.slug ?? null),
    shouldMove,
    reason: shouldMove
      ? `Re-routed from ${currentParent?.title ?? "root"} to ${bestCandidate.title} (taxonomy score ${bestScore} vs ${currentScore}).`
      : `Current placement under ${currentParent?.title ?? "root"} retained (score ${currentScore} vs ${bestScore}).`,
    crossLinks,
  };
}


/**
 * Synthesises a grounded, cited briefing from library search results and
 * recommends how the AI organises 1, 2, 3, or more research branches in the tree.
 */
export function synthesizeSearchBriefing(
  query: string,
  results: LibrarySearchResults,
  treeNodes: SearchTreeNode[],
  precomputedBranches?: SuggestedBranch[],
): SearchSynthesis {
  const terms = results.terms.length > 0 ? results.terms : extractSearchTerms(query);
  const suggestedBranches =
    precomputedBranches && precomputedBranches.length > 0
      ? precomputedBranches
      : inferBranchProposals(query, treeNodes, results.topics);
  const suggestedBranch = suggestedBranches[0]!;

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
        `The library does not yet hold extracted findings, clinical trials, or peer-reviewed papers matching these terms. The AI has organised this inquiry into ${suggestedBranches.length === 1 ? `a canonical scientific branch under ${suggestedBranch.parentTitle ?? "the Tree of Knowledge"}` : `${suggestedBranches.length} canonical scientific branches across the Tree of Knowledge`} so autonomous scout, literature harvester, reader, and skeptic workers can investigate it.`,
      ],
      citations: [],
      matchedLevers: [],
      matchedBenchmarks: [],
      suggestedBranch,
      suggestedBranches,
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
      : `Partial coverage in the library (${headlineParts.join(" · ")}) — AI has also organised ${suggestedBranches.length === 1 ? "a dedicated sub-branch" : `${suggestedBranches.length} dedicated sub-branches`} below.`;

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
    suggestedBranches,
  };
}
