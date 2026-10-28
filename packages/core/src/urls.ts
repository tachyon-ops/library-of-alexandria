import { slugify } from "./index";

/**
 * Curated 1–3 word URL segments for canonical disciplines and known legacy slugs.
 * Combined with ancestor segments, these produce clean hierarchical URLs such as:
 * `/topic/natural-sciences/biomedicine/reproductive-medicine/endometrial-receptivity/embryoglue`
 */
export const SHORT_TOPIC_SEGMENTS: Record<string, string> = {
  // Root trunks (depth 0)
  "natural-and-life-sciences": "natural-sciences",
  "formal-sciences-mathematics-and-computing": "mathematics-computing",
  "communication-language-semiotics-and-media": "communication-language",
  "arts-literature-and-aesthetics": "arts-literature",
  "philosophy-ethics-and-epistemology": "philosophy",
  "history-and-archaeology": "history-archaeology",
  "economics-and-political-economy": "economics-finance",
  "law-and-jurisprudence": "law",
  "politics-governance-and-international-relations": "politics-governance",
  "architecture-engineering-and-urbanism": "architecture-engineering",

  // Physics & Cosmology
  "physics-and-cosmology": "physics",
  "classical-mechanics-thermodynamics-electromagnetism": "classical-physics",
  "analytical-mechanics-lagrangian-hamiltonian-symplectic": "analytical-mechanics",
  "thermodynamics-statistical-mechanics-and-entropy": "thermodynamics",
  "electrodynamics-maxwell-equations-and-classical-fields": "electrodynamics",
  "relativity-gravitation-spacetime-physics": "relativity-gravitation",
  "quantum-gravity-string-theory-loop-quantum-gravity": "quantum-gravity",
  "string-theory-m-theory-and-holographic-duality": "string-theory",
  "loop-quantum-gravity-spin-foams-and-causal-sets": "loop-quantum-gravity",
  "modified-emergent-and-frontier-gravity-theories": "modified-gravity",
  "mond-modified-newtonian-dynamics-and-galactic-rotation": "mond",
  "quantised-inertia-horizon-mechanics-and-unruh-radiation": "quantised-inertia",
  "dark-matter-adhoc-epistemology-and-gr-breakdown-limits": "dark-matter-epistemology",
  "roger-penrose-twistor-theory-singularities-cosmology": "roger-penrose",
  "quantum-mechanics-field-theory-particle-physics": "quantum-physics",
  "quantum-mechanics-hilbert-space-and-entanglement": "quantum-mechanics",
  "standard-model-gauge-theories-and-particle-physics": "standard-model",
  "quantum-information-computing-and-error-correction": "quantum-computing",
  "condensed-matter-atomic-molecular-optical-physics": "condensed-matter",

  // Chemistry & Biology
  "chemistry-and-molecular-sciences": "chemistry",
  "physical-chemistry-quantum-chemistry-chemical-physics": "physical-chemistry",
  "inorganic-coordination-and-solid-state-chemistry": "inorganic-chemistry",
  "organic-supramolecular-and-synthetic-chemistry": "organic-chemistry",
  "biochemistry-chemical-biology-and-abiogenesis": "biochemistry",
  "biology-and-life-sciences": "biology",
  "molecular-cellular-and-evolutionary-biology": "molecular-biology",
  "biological-taxonomy-systematics-tree-of-life": "taxonomy-systematics",
  "zoology-and-the-animal-kingdom-metazoa": "zoology",
  "invertebrate-zoology-porifera-mollusca-arthropoda": "invertebrates",
  "vertebrate-zoology-chordata-fishes-birds-mammals": "vertebrates",
  "ethology-animal-cognition-and-biosemiotics": "ethology",
  "botany-mycology-microbiology-and-ecology": "botany-ecology",

  // Biomedicine & Reproductive Medicine
  "medicine-health-and-longevity": "biomedicine",
  "reproductive-medicine-human-fertility": "reproductive-medicine",
  "human-fertility": "reproductive-medicine",
  "ovarian-reserve-oocyte-cryopreservation": "ovarian-reserve",
  "using-eggs-vitrified-at-a-younger-age": "ovarian-reserve",
  "human-fertility-using-eggs-vitrified-at-a-younger-age": "ovarian-reserve",
  "oocyte-nuclear-maturity-and-morphological-grading": "oocyte-maturity",
  "endometrial-receptivity-implantation-biology": "endometrial-receptivity",
  "uterine-receptivity-and-implantation-failure": "endometrial-receptivity",
  "human-fertility-uterine-receptivity-and-implantation-failure": "endometrial-receptivity",
  "inter-transfer-interval-immediate-vs-delayed-frozen-embryo-transfer": "fet-transfer-interval",
  "reproductive-medicine-human-fertility-consecutive-or-spaced-out-40s-yo-female-iv": "fet-transfer-interval",
  "hyaluronan-embryo-transfer-media-embryoglue-implantation-adherence": "embryoglue",
  "reproductive-medicine-human-fertility-bb-aa-1pn-2pn-what-grading-methods-are-the-41": "embryoglue",
  "embryo-glue": "embryoglue",
  "embryoglue": "embryoglue",
  "fet-endometrial-preparation-luteal-progesterone-and-implantation-biologics": "fet-protocols-biologics",
  "andrology-male-factor-infertility": "andrology",
  "male-factor-after-40": "andrology",
  "human-fertility-male-factor-after-40": "andrology",
  "sperm-chromatin-integrity-dna-fragmentation-diagnostics": "sperm-dna-fragmentation",
  "paternal-age-effects-on-gamete-embryo-offspring-health": "paternal-age",
  "assisted-reproductive-technology-gamete-donation": "assisted-reproduction",
  "donor-eggs-in-europe": "assisted-reproduction",
  "human-fertility-donor-eggs-in-europe": "assisted-reproduction",
  "zygote-pronuclear-scoring-2pn-1pn-3pn-fertilisation": "zygote-pronuclear-scoring",
  "blastocyst-morphological-grading-gardner-criteria-morphokinetics": "blastocyst-grading",
  "reproductive-medicine-human-fertility-bb-aa-1pn-2pn-what-grading-methods-are-the": "blastocyst-grading",
  "monopronuclear-1pn-and-low-grade-blastocyst-transfer-optimization": "1pn-low-grade-blastocysts",
  "translational-geroprotective-reproductive-biology": "geroprotective-reproduction",
  "frontier-fertility-treatments": "geroprotective-reproduction",
  "human-fertility-frontier-fertility-treatments": "geroprotective-reproduction",
  "mitochondrial-replacement-therapy-ooplasmic-transfer": "mitochondrial-replacement",
  "in-vitro-gametogenesis-pluripotent-stem-cell-reprogramming": "in-vitro-gametogenesis",
  "mtor-pathway-modulation-follicular-longevity": "mtor-follicular-longevity",
  "intraovarian-platelet-rich-plasma-stem-cell-biologics": "intraovarian-prp",
  "advanced-maternal-age-pregnancy-after-40": "maternal-age-pregnancy",
  "pregnancy-after-44": "maternal-age-pregnancy",
  "human-fertility-pregnancy-after-44": "maternal-age-pregnancy",
  "lifestyle-metabolic-and-environmental-fertility-optimization": "natural-conception-lifestyle",
  "reproductive-medicine-human-fertility-improve-fertility-organically-conceiving-b": "natural-conception-lifestyle",
  "gamete-rejuvenation-mitochondrial-bioenergetics-and-natural-conception-after-40": "gamete-rejuvenation",
  "harvard-fertility-diet-and-earth-preconception-nutrition": "harvard-fertility-diet",
  "blue-zones-high-fertility-populations-and-reproductive-longevity-genetics": "blue-zones-longevity",
  "geroscience-cellular-senescence-longevity-biology": "geroscience-longevity",
  "epigenetic-clocks-dna-methylation-and-biological-age-biomarkers": "epigenetic-clocks",
  "organ-specific-proteomic-clocks-and-multi-omic-aging-signatures": "proteomic-organ-clocks",
  "partial-cellular-reprogramming-yamanaka-factors-and-epigenetic-reset": "yamanaka-reprogramming",
  "chemical-and-mrna-transient-reprogramming-without-oncogenic-transformation": "chemical-mrna-reprogramming",
  "cellular-senescence-sasp-senolytics-and-senomorphics": "senolytics-sasp",
  "immunotherapy-car-t-and-vaccines-for-senescent-cell-clearance": "senolytic-car-t-vaccines",
  "nutrient-sensing-mtor-ampk-igf1-and-geroprotective-pharmacology": "mtor-rapamycin-geroprotectors",
  "caloric-restriction-fasting-mimetics-and-human-calerie-trials": "caloric-restriction-fmd",
  "nad-metabolism-sirtuins-cd38-inhibition-and-mitochondrial-rejuvenation": "nad-sirtuins-cd38",
  "mitophagy-activators-urolithin-a-spermidine-glynac-and-ss31": "mitophagy-urolithin-glynac",
  "telomere-dynamics-telomerase-tert-and-replicative-immortality": "telomeres-telomerase",
  "heterochronic-parabiosis-therapeutic-plasma-exchange-and-systemic-factors": "parabiosis-plasma-exchange",
  "thymic-regeneration-immunosenescence-and-inflammaging-reversal": "thymic-immune-rejuvenation",
  "proteostasis-autophagy-extracellular-matrix-stiffening-and-age-crosslinks": "proteostasis-ecm-crosslinks",
  "comparative-longevity-genomics-naked-mole-rats-bowhead-whales-and-centenarians": "comparative-longevity-genomics",
  "physiological-hormesis-vo2max-sauna-cold-shock-and-circadian-longevity": "vo2max-sauna-hormesis",
  "developmental-bioelectricity-morphogenetic-fields-and-levin-anatomical-homeostasis": "bioelectricity-levin-morphogenesis",
  "xenobots-anthrobots-cancer-bioelectric-normalization-and-synthetic-living-machines": "anthrobots-xenobots-bioelectric",
  "epimorphic-limb-regeneration-axolotl-blastema-and-scarless-acomys-healing": "axolotl-acomys-limb-regeneration",
  "mammalian-skeletal-ending-cartilage-regeneration-and-focal-adhesion-mechanotherapy": "cartilage-verteporfin-15pgdh",
  "hippo-yap-taz-pathway-cardiomyocyte-proliferation-and-organ-regeneration": "hippo-yap-heart-regeneration",
  "sensory-organ-regeneration-cochlear-hair-cells-and-retinal-muller-glia": "cochlear-retinal-regeneration",
  "vascular-endothelial-aging-vegf-microcirculation-and-nitric-oxide-rejuvenation": "vegf-microvascular-rejuvenation",
  "klotho-fgf23-mineral-metabolism-and-renal-cardiovascular-longevity": "klotho-fgf23-longevity",
  "line1-retrotransposons-cgas-sting-and-nlrp3-sterile-inflammaging": "line1-cgas-sting-nlrp3",
  "endogenous-geroprotective-metabolites-taurine-akg-ergothioneine-and-h2s": "taurine-akg-ergothioneine",
  "gut-microbiome-longevity-centenarian-isoallolca-akkermansia-and-young-fmt": "centenarian-microbiome-fmt",
  "membrane-pacemaker-peroxidation-index-elovl2-plasmalogens-and-ferroptosis": "membrane-pacemaker-elovl2",
  "nuclear-lamina-architecture-lamin-a-sirt7-and-heterochromatin-maintenance": "nuclear-lamina-progerin",
  "whole-organ-bioengineering-decellularized-scaffolds-3d-bioprinting-and-xenotransplantation": "organ-bioprinting-xenotransplant",
  "transcriptional-elongation-speed-rna-pol-ii-splicing-fidelity-and-ribosomal-aging": "rna-pol2-splicing-fidelity",
  "organ-cryopreservation-nanowarming-vitrification-and-metabolic-torpor-biostasis": "organ-vitrification-torpor",
  "dental-tooth-regeneration-usag1-antibodies-dpsc-pulp-and-biomimetic-enamel": "dental-tooth-regeneration",
  "neuroscience-cognitive-science-and-consciousness": "neuroscience",
  "brain-aging-glymphatic-clearance-klotho-and-neuro-rejuvenation": "brain-glymphatic-klotho",

  // Communication, Arts, Humanities, Governance
  "linguistics-philology-and-language-evolution": "linguistics",
  "semiotics-sign-systems-and-philosophy-of-language": "semiotics",
  "media-ecology-marshall-mcluhan-communication-theory": "media-ecology",
  "information-theory-cybernetics-and-rhetoric": "information-theory",
  "world-literature-poetics-and-comparative-mythology": "world-literature",
  "visual-arts-painting-sculpture-and-iconography": "visual-arts",
  "musicology-harmony-acoustics-and-performing-arts": "musicology",
  "aesthetics-art-history-and-philosophy-of-beauty": "aesthetics",
  "pure-applied-mathematics-geometry-and-topology": "pure-mathematics",
  "differential-geometry-manifolds-and-topology": "differential-geometry",
  "group-theory-lie-algebras-and-symmetry": "lie-groups-symmetry",
  "functional-analysis-pdes-and-dynamical-systems": "functional-analysis",
  "probability-theory-stochastic-calculus-and-statistics": "stochastic-calculus",
  "logic-computation-information-artificial-intelligence": "computation-ai",
  "epistemology-philosophy-of-science-scientific-method": "epistemology",
  "metaphysics-philosophy-of-mind-and-consciousness": "metaphysics-mind",
  "moral-philosophy-bioethics-and-political-philosophy": "ethics-bioethics",
  "ancient-civilisations-epigraphy-near-eastern-archaeology": "ancient-civilisations",
  "history-of-science-technology-and-libraries": "history-of-libraries",
  "macroeconomics-political-economy-and-economic-history": "macroeconomics",
  "microeconomics-game-theory-and-market-design": "microeconomics-game-theory",
  "financial-markets-asset-pricing-and-market-microstructure": "financial-markets",
  "quantitative-finance-stochastic-calculus-and-derivatives": "quantitative-finance",
  "econometrics-financial-time-series-and-statistical-arbitrage": "econometrics-stat-arb",
  "econophysics-complex-systems-and-tail-risk": "econophysics-tail-risk",
  "constitutional-international-and-bioethical-law": "constitutional-law",
  "political-theory-comparative-institutions-geopolitics": "political-theory",
  "architectural-history-structural-engineering-urban-systems": "architectural-history",
};

/**
 * Maps legacy or short slugs to their canonical database seed slug.
 */
export const LEGACY_URL_SLUG_TO_CANONICAL: Record<string, string> = {
  "reproductive-medicine-human-fertility-bb-aa-1pn-2pn-what-grading-methods-are-the-41":
    "hyaluronan-embryo-transfer-media-embryoglue-implantation-adherence",
  "embryo-glue": "hyaluronan-embryo-transfer-media-embryoglue-implantation-adherence",
  "embryoglue": "hyaluronan-embryo-transfer-media-embryoglue-implantation-adherence",
  "reproductive-medicine-human-fertility-bb-aa-1pn-2pn-what-grading-methods-are-the":
    "blastocyst-morphological-grading-gardner-criteria-morphokinetics",
  "blastocyst-grading": "blastocyst-morphological-grading-gardner-criteria-morphokinetics",
  "reproductive-medicine-human-fertility-consecutive-or-spaced-out-40s-yo-female-iv":
    "inter-transfer-interval-immediate-vs-delayed-frozen-embryo-transfer",
  "fet-transfer-interval": "inter-transfer-interval-immediate-vs-delayed-frozen-embryo-transfer",
  "reproductive-medicine-human-fertility-improve-fertility-organically-conceiving-b":
    "lifestyle-metabolic-and-environmental-fertility-optimization",
  "natural-conception-lifestyle": "lifestyle-metabolic-and-environmental-fertility-optimization",
  "human-fertility": "reproductive-medicine-human-fertility",
  "using-eggs-vitrified-at-a-younger-age": "ovarian-reserve-oocyte-cryopreservation",
  "human-fertility-using-eggs-vitrified-at-a-younger-age": "ovarian-reserve-oocyte-cryopreservation",
  "uterine-receptivity-and-implantation-failure": "endometrial-receptivity-implantation-biology",
  "human-fertility-uterine-receptivity-and-implantation-failure": "endometrial-receptivity-implantation-biology",
  "male-factor-after-40": "andrology-male-factor-infertility",
  "human-fertility-male-factor-after-40": "andrology-male-factor-infertility",
  "donor-eggs-in-europe": "assisted-reproductive-technology-gamete-donation",
  "human-fertility-donor-eggs-in-europe": "assisted-reproductive-technology-gamete-donation",
  "frontier-fertility-treatments": "translational-geroprotective-reproductive-biology",
  "human-fertility-frontier-fertility-treatments": "translational-geroprotective-reproductive-biology",
  "pregnancy-after-44": "advanced-maternal-age-pregnancy-after-40",
  "human-fertility-pregnancy-after-44": "advanced-maternal-age-pregnancy-after-40",
};

const SEGMENT_STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "can",
  "do",
  "does",
  "for",
  "from",
  "how",
  "in",
  "into",
  "is",
  "it",
  "its",
  "methods",
  "of",
  "on",
  "or",
  "our",
  "should",
  "that",
  "the",
  "their",
  "there",
  "these",
  "this",
  "to",
  "via",
  "vs",
  "versus",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "with",
]);

/**
 * Produces a concise 1–3 word URL segment (≤ 28 characters) for a topic node
 * without any inherited parent prefix.
 */
export function shortTopicSegment(
  slug: string,
  title?: string | null,
  parentSlug?: string | null,
): string {
  const cleanSlug = slug.trim().toLowerCase();
  const direct = SHORT_TOPIC_SEGMENTS[cleanSlug];
  if (direct) return direct;

  if (
    title &&
    (/\bembryo\s*glue\b/i.test(title) || /\bhyaluronan-enriched\s+embryo\s+transfer\s+media\b/i.test(title))
  ) {
    return "embryoglue";
  }

  // Prefer extracting from the human-readable title when provided
  if (title && title.trim().length > 0) {
    const withoutParens = title.replace(/\([^)]*\)/g, " ").trim();
    const rawWords = slugify(withoutParens.length >= 4 ? withoutParens : title)
      .split("-")
      .filter((w) => w.length > 0 && !SEGMENT_STOP_WORDS.has(w));
    if (rawWords.length > 0) {
      const chosen = rawWords.slice(0, 3).join("-");
      return chosen.slice(0, 28).replace(/-+$/g, "") || "topic";
    }
  }

  // Otherwise strip any inherited parentSlug prefix from slug
  let remainder = cleanSlug;
  if (parentSlug) {
    const cleanParent = parentSlug.trim().toLowerCase();
    if (remainder.startsWith(`${cleanParent}-`) && remainder.length > cleanParent.length + 1) {
      remainder = remainder.slice(cleanParent.length + 1);
    }
  }

  const mapped = SHORT_TOPIC_SEGMENTS[remainder];
  if (mapped) return mapped;

  const tokens = remainder
    .split("-")
    .filter((w) => w.length > 0 && !SEGMENT_STOP_WORDS.has(w));
  const chosen = (tokens.length > 0 ? tokens : remainder.split("-")).slice(0, 3).join("-");
  return chosen.slice(0, 28).replace(/-+$/g, "") || "topic";
}

export interface UrlTreeNode {
  id: string;
  parentId: string | null;
  slug: string;
  title?: string | null;
}

/**
 * Computes the canonical nested URL path (without the leading `/topic/`) for every node
 * in a flat tree list, e.g.:
 * `natural-sciences/biomedicine/reproductive-medicine/endometrial-receptivity/embryoglue`
 */
export function buildNestedTopicPaths<T extends UrlTreeNode>(nodes: T[]): {
  byId: Map<string, string>;
  byRawSlug: Map<string, string>;
} {
  const nodeById = new Map<string, T>(nodes.map((n) => [n.id, n]));
  const segmentById = new Map<string, string>();
  const usedByParent = new Map<string, Set<string>>();

  for (const node of nodes) {
    const parent = node.parentId ? nodeById.get(node.parentId) : null;
    const parentKey = node.parentId ?? "__root__";
    let used = usedByParent.get(parentKey);
    if (!used) {
      used = new Set<string>();
      usedByParent.set(parentKey, used);
    }

    const baseSeg = shortTopicSegment(node.slug, node.title, parent?.slug);
    let candidate = baseSeg;
    if (used.has(candidate)) {
      const extraTokens = slugify(node.title || node.slug)
        .split("-")
        .filter((w) => w.length > 1 && !SEGMENT_STOP_WORDS.has(w) && !baseSeg.split("-").includes(w));
      if (extraTokens.length > 0) {
        candidate = `${baseSeg}-${extraTokens[0]}`.slice(0, 32).replace(/-+$/g, "");
      }
      let counter = 2;
      while (used.has(candidate)) {
        candidate = `${baseSeg}-${counter++}`;
      }
    }
    used.add(candidate);
    segmentById.set(node.id, candidate);
  }

  const byId = new Map<string, string>();
  const byRawSlug = new Map<string, string>();

  const computePath = (node: T, visited = new Set<string>()): string => {
    const cached = byId.get(node.id);
    if (cached) return cached;
    visited.add(node.id);
    const ownSeg = segmentById.get(node.id) ?? shortTopicSegment(node.slug, node.title);
    const parent = node.parentId && !visited.has(node.parentId) ? nodeById.get(node.parentId) : null;
    const fullPath = parent ? `${computePath(parent, visited)}/${ownSeg}` : ownSeg;
    byId.set(node.id, fullPath);
    return fullPath;
  };

  for (const node of nodes) {
    const nested = computePath(node);
    byRawSlug.set(node.slug, nested);
  }

  // Also map known legacy aliases so any lookup by legacy or canonical slug resolves to the nested path
  for (const [legacySlug, canonicalSlug] of Object.entries(LEGACY_URL_SLUG_TO_CANONICAL)) {
    const targetPath = byRawSlug.get(canonicalSlug) ?? byRawSlug.get(legacySlug);
    if (targetPath) {
      byRawSlug.set(legacySlug, targetPath);
      if (!byRawSlug.has(canonicalSlug)) {
        byRawSlug.set(canonicalSlug, targetPath);
      }
    }
  }

  return { byId, byRawSlug };
}

/**
 * Resolves an array of URL segments from `/topic/[...slug]` to the matching tree node,
 * its canonical nested path, and any canonical seed slug alias.
 */
export function resolveTopicFromUrlSegments<T extends UrlTreeNode>(
  rawSegments: string[],
  nodes: T[],
): {
  node: T | null;
  canonicalNestedPath: string | null;
  canonicalSeedSlug: string | null;
} {
  const segments = rawSegments
    .map((s) => {
      try {
        return decodeURIComponent(s).trim().toLowerCase();
      } catch {
        return s.trim().toLowerCase();
      }
    })
    .filter(Boolean);

  if (segments.length === 0) {
    return { node: null, canonicalNestedPath: null, canonicalSeedSlug: null };
  }

  const { byId, byRawSlug } = buildNestedTopicPaths(nodes);
  const joinedPath = segments.join("/");
  const lastSeg = segments[segments.length - 1]!;

  // 1. Exact match on full nested path
  for (const node of nodes) {
    if (byId.get(node.id) === joinedPath) {
      return {
        node,
        canonicalNestedPath: joinedPath,
        canonicalSeedSlug: LEGACY_URL_SLUG_TO_CANONICAL[node.slug] ?? node.slug,
      };
    }
  }

  // 2. Match last segment against raw DB slug or legacy alias
  const canonicalFromLast = LEGACY_URL_SLUG_TO_CANONICAL[lastSeg] ?? null;
  const directBySlug = nodes.find(
    (n) =>
      n.slug.toLowerCase() === lastSeg ||
      (canonicalFromLast !== null && n.slug.toLowerCase() === canonicalFromLast),
  );
  if (directBySlug) {
    return {
      node: directBySlug,
      canonicalNestedPath: byId.get(directBySlug.id) ?? null,
      canonicalSeedSlug: canonicalFromLast ?? directBySlug.slug,
    };
  }

  // 3. Match last segment against short segment (disambiguating by ancestor segments when multiple match)
  const leafCandidates = nodes.filter((n) => {
    const nested = byId.get(n.id) ?? "";
    const leaf = nested.split("/").pop();
    return leaf === lastSeg || shortTopicSegment(n.slug, n.title) === lastSeg;
  });

  if (leafCandidates.length === 1) {
    const matched = leafCandidates[0]!;
    return {
      node: matched,
      canonicalNestedPath: byId.get(matched.id) ?? null,
      canonicalSeedSlug: LEGACY_URL_SLUG_TO_CANONICAL[matched.slug] ?? matched.slug,
    };
  }

  if (leafCandidates.length > 1) {
    const parentSegments = segments.slice(0, -1);
    let best = leafCandidates[0]!;
    let bestScore = -1;
    for (const cand of leafCandidates) {
      const candParts = (byId.get(cand.id) ?? "").split("/").slice(0, -1);
      const overlap = parentSegments.filter((s) => candParts.includes(s)).length;
      if (overlap > bestScore) {
        bestScore = overlap;
        best = cand;
      }
    }
    return {
      node: best,
      canonicalNestedPath: byId.get(best.id) ?? null,
      canonicalSeedSlug: LEGACY_URL_SLUG_TO_CANONICAL[best.slug] ?? best.slug,
    };
  }

  // 4. Reverse lookup in SHORT_TOPIC_SEGMENTS if the canonical seed topic is not yet in DB
  const seedFromSegment =
    canonicalFromLast ??
    Object.entries(SHORT_TOPIC_SEGMENTS).find(([, shortSeg]) => shortSeg === lastSeg)?.[0] ??
    null;

  if (seedFromSegment) {
    const existingAlias = nodes.find(
      (n) =>
        n.slug === seedFromSegment ||
        LEGACY_URL_SLUG_TO_CANONICAL[n.slug] === seedFromSegment,
    );
    if (existingAlias) {
      return {
        node: existingAlias,
        canonicalNestedPath: byId.get(existingAlias.id) ?? byRawSlug.get(seedFromSegment) ?? null,
        canonicalSeedSlug: seedFromSegment,
      };
    }
    return {
      node: null,
      canonicalNestedPath: null,
      canonicalSeedSlug: seedFromSegment,
    };
  }

  return { node: null, canonicalNestedPath: null, canonicalSeedSlug: null };
}
