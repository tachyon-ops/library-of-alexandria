import {
  CONTROVERSY_LABELS,
  TIER_LABELS,
  TIERS,
  normaliseDesign,
  tierForSource,
  type Controversy,
  type Tier,
} from "./evidence";
import type {
  SynthesisBenchmark,
  SynthesisLever,
  TopicArticle,
  TopicArticleSection,
  TopicStatus,
  TopicSynthesis,
} from "./types";

export interface ArticleInputClaim {
  id: string;
  statement: string;
  tier: Tier;
  controversy: Controversy | string;
  direction: string;
  rationale: string | null;
  sources: Array<{
    id: string;
    title: string | null;
    url: string | null;
    year: number | null;
    design: string | null;
    venue: string | null;
  }>;
}

export interface ArticleInputSource {
  id: string;
  title: string;
  url: string | null;
  doi?: string | null;
  venue: string | null;
  year: number | null;
  authors: string[];
  design: string | null;
  citedBy: number | null;
}

export interface ArticleInputMilestone {
  year: number;
  title: string;
  description: string | null;
  sourceUrl: string | null;
}

export interface ArticleInputDebate {
  kind: string;
  note: string;
}

export interface ArticleInputEntity {
  kind: string;
  name: string;
  country: string | null;
  summary: string | null;
  url: string | null;
}

export interface TierBarDatum {
  tier: Tier;
  label: string;
  count: number;
  percentage: number;
}

export interface DesignBarDatum {
  category: string;
  tier: Tier;
  count: number;
  percentage: number;
}

export interface YearBucketDatum {
  bucket: string;
  count: number;
  percentage: number;
}

export interface VerdictBarDatum {
  verdict: string;
  count: number;
  percentage: number;
}

export interface FeaturedStudy {
  citationNumber: number;
  id: string;
  title: string;
  authorsLabel: string;
  venue: string | null;
  year: number | null;
  designLabel: string;
  tier: Tier;
  citedBy: number | null;
  url: string | null;
  doi: string | null;
}

export interface FieldResearchMonograph {
  title: string;
  subtitle: string;
  editionBadge: string;
  isLiveDispatch: boolean;
  readingMinutes: number;
  bestTier: Tier | null;
  synopsis: string;
  sections: TopicArticleSection[];
  conclusions: string;
  keyTakeaways: string[];
  charts: {
    tierDistribution: TierBarDatum[];
    tierSourceBasis: "claims" | "sources";
    designBreakdown: DesignBarDatum[];
    yearHistogram: YearBucketDatum[];
    verdictProfile: VerdictBarDatum[];
    settledCount: number;
    debatedCount: number;
    frontierCount: number;
  };
  benchmarks: SynthesisBenchmark[];
  levers: SynthesisLever[];
  featuredStudies: FeaturedStudy[];
}

function cleanDesignLabel(design: string | null | undefined): string {
  const norm = normaliseDesign(design ?? null);
  switch (norm) {
    case "meta_analysis":
      return "Meta-analysis";
    case "systematic_review":
      return "Systematic review";
    case "guideline":
      return "Practice guideline";
    case "rct":
      return "Randomised trial (RCT)";
    case "registry":
      return "Registry study";
    case "cohort":
      return "Cohort study";
    case "case_control":
      return "Case-control study";
    case "cross_sectional":
      return "Cross-sectional study";
    case "case_series":
      return "Case series";
    case "case_report":
      return "Case report";
    case "animal":
      return "Preclinical animal model";
    case "in_vitro":
      return "In vitro / cellular study";
    case "computational":
      return "Computational / mathematical model";
    case "expert_opinion":
      return "Consensus / expert review";
    default:
      return "Indexed publication";
  }
}

function formatAuthors(authors: string[] | null | undefined): string {
  if (!Array.isArray(authors) || authors.length === 0) return "Indexed research group";
  if (authors.length === 1) return authors[0]!;
  if (authors.length === 2) return `${authors[0]} & ${authors[1]}`;
  return `${authors[0]} et al.`;
}

/**
 * Builds a complete blog-style State of the Field Research Monograph from a branch's
 * AI synthesis handover (`synthesis.article`) and live database records (`claims`, `sources`,
 * `benchmarks`, `levers`, `milestones`, `debates`, and `entities`).
 */
export function buildDynamicFieldArticle(input: {
  title: string;
  brief: string | null;
  status: TopicStatus;
  summary: string | null;
  gaps: string[];
  synthesis: TopicSynthesis | null;
  ancestors: Array<{ title: string; slug: string }>;
  children: Array<{ title: string; slug: string; brief: string | null }>;
  claims: ArticleInputClaim[];
  sources: ArticleInputSource[];
  milestones: ArticleInputMilestone[];
  debates: ArticleInputDebate[];
  entities: ArticleInputEntity[];
}): FieldResearchMonograph {
  const {
    title,
    brief,
    status,
    summary,
    gaps,
    synthesis,
    ancestors,
    children,
    claims,
    sources,
    milestones,
    debates,
    entities,
  } = input;

  const aiArticle: TopicArticle | undefined = synthesis?.article;
  const benchmarks = Array.isArray(synthesis?.benchmarks) ? synthesis.benchmarks : [];
  const levers = Array.isArray(synthesis?.levers) ? synthesis.levers : [];
  const sweepQueue = Array.isArray(synthesis?.sweepQueue) ? synthesis.sweepQueue : [];

  const isLiveDispatch =
    (status === "queued" || status === "researching") && claims.length === 0;

  // 1. Compute Tier Distribution (from claims when available, otherwise inferred from source study designs)
  const tierCounts: Record<Tier, number> = { T1: 0, T2: 0, T3: 0, T4: 0, T5: 0, T6: 0 };
  const tierSourceBasis: "claims" | "sources" = claims.length > 0 ? "claims" : "sources";

  if (claims.length > 0) {
    for (const c of claims) {
      if (c.tier in tierCounts) tierCounts[c.tier]++;
    }
  } else {
    for (const s of sources) {
      const t = tierForSource(normaliseDesign(s.design), null);
      tierCounts[t]++;
    }
  }

  const totalTierItems = Math.max(
    1,
    Object.values(tierCounts).reduce((acc, n) => acc + n, 0),
  );
  const tierDistribution: TierBarDatum[] = TIERS.map((t) => ({
    tier: t,
    label: TIER_LABELS[t],
    count: tierCounts[t],
    percentage: Math.round((tierCounts[t] / totalTierItems) * 100),
  }));

  const bestTier: Tier | null =
    TIERS.find((t) => tierCounts[t] > 0) ?? null;

  // 2. Compute Study Design Breakdown across indexed sources
  const designBuckets: Array<{ category: string; tier: Tier; count: number }> = [
    { category: "Meta-analyses, Systematic Reviews & Guidelines", tier: "T1", count: 0 },
    { category: "Randomised Controlled Trials (RCTs)", tier: "T2", count: 0 },
    { category: "Prospective Cohorts & Clinical Registries", tier: "T3", count: 0 },
    { category: "Observational & Clinical Case Series", tier: "T4", count: 0 },
    { category: "Preclinical, Cellular & Computational Models", tier: "T5", count: 0 },
    { category: "Primary Literature & Archive Records", tier: "T6", count: 0 },
  ];

  for (const s of sources) {
    const norm = normaliseDesign(s.design);
    if (norm === "meta_analysis" || norm === "systematic_review" || norm === "guideline") {
      designBuckets[0]!.count++;
    } else if (norm === "rct") {
      designBuckets[1]!.count++;
    } else if (norm === "cohort" || norm === "registry" || norm === "case_control") {
      designBuckets[2]!.count++;
    } else if (norm === "cross_sectional" || norm === "case_series" || norm === "case_report") {
      designBuckets[3]!.count++;
    } else if (norm === "animal" || norm === "in_vitro" || norm === "computational") {
      designBuckets[4]!.count++;
    } else {
      designBuckets[5]!.count++;
    }
  }

  const totalSources = Math.max(1, sources.length);
  const designBreakdown: DesignBarDatum[] = designBuckets
    .filter((b) => b.count > 0)
    .map((b) => ({
      category: b.category,
      tier: b.tier,
      count: b.count,
      percentage: Math.round((b.count / totalSources) * 100),
    }));

  // 3. Publication Year Velocity Histogram
  const yearGroups: Record<string, number> = {
    "≤ 2010": 0,
    "2011–2016": 0,
    "2017–2020": 0,
    "2021–2023": 0,
    "2024–2026+": 0,
  };
  for (const s of sources) {
    if (!s.year || s.year < 1800) continue;
    if (s.year <= 2010) yearGroups["≤ 2010"]!++;
    else if (s.year <= 2016) yearGroups["2011–2016"]!++;
    else if (s.year <= 2020) yearGroups["2017–2020"]!++;
    else if (s.year <= 2023) yearGroups["2021–2023"]!++;
    else yearGroups["2024–2026+"]!++;
  }
  const maxYearBucket = Math.max(1, ...Object.values(yearGroups));
  const yearHistogram: YearBucketDatum[] = Object.entries(yearGroups).map(([bucket, count]) => ({
    bucket,
    count,
    percentage: Math.round((count / maxYearBucket) * 100),
  }));

  // 4. Epistemic Consensus & Verdict Profile
  let settledCount = 0;
  let debatedCount = 0;
  let frontierCount = 0;
  for (const c of claims) {
    if (c.controversy === "settled") settledCount++;
    else if (c.controversy === "debated") debatedCount++;
    else frontierCount++;
  }

  const verdictMap = new Map<string, number>();
  for (const l of levers) {
    verdictMap.set(l.verdict, (verdictMap.get(l.verdict) ?? 0) + 1);
  }
  const totalLevers = Math.max(1, levers.length);
  const verdictProfile: VerdictBarDatum[] = Array.from(verdictMap.entries()).map(([verdict, count]) => ({
    verdict,
    count,
    percentage: Math.round((count / totalLevers) * 100),
  }));

  // 5. Select Featured Landmark Studies (sorted by design tier + citation impact)
  const scoredSources = sources.map((s, idx) => {
    const tier = tierForSource(normaliseDesign(s.design), null);
    const tierRank = 6 - TIERS.indexOf(tier);
    const citeBoost = Math.min(5, Math.log10(Math.max(1, (s.citedBy ?? 0) + 1)));
    const recencyBoost = s.year && s.year >= 2021 ? 1.5 : 0;
    return {
      source: s,
      citationNumber: idx + 1,
      tier,
      score: tierRank * 3 + citeBoost + recencyBoost,
    };
  });
  scoredSources.sort((a, b) => b.score - a.score);

  const featuredStudies: FeaturedStudy[] = scoredSources.slice(0, 6).map(({ source, citationNumber, tier }) => ({
    citationNumber,
    id: source.id,
    title: source.title,
    authorsLabel: formatAuthors(source.authors),
    venue: source.venue,
    year: source.year,
    designLabel: cleanDesignLabel(source.design),
    tier,
    citedBy: source.citedBy,
    url: source.url ?? (source.doi ? `https://doi.org/${source.doi}` : null),
    doi: source.doi ?? null,
  }));

  const sourceIndexById = new Map<string, number>();
  sources.forEach((s, i) => sourceIndexById.set(s.id, i + 1));

  // 6. Compose Article Title, Subtitle, Synopsis, Sections & Conclusions
  const lineageLabel =
    ancestors.length > 0
      ? ancestors.map((a) => a.title).slice(-2).join(" → ")
      : "The Tree of Knowledge";

  const useBespokeAiArticle =
    aiArticle !== undefined && !isMechanicalFallbackArticle(aiArticle);

  const articleTitle =
    useBespokeAiArticle && aiArticle?.title
      ? aiArticle.title
      : `State of the Field: ${title}`;

  const articleSubtitle =
    useBespokeAiArticle && aiArticle?.subtitle
      ? aiArticle.subtitle
      : brief
        ? `${brief.endsWith(".") ? brief : `${brief}.`} Grounded synthesis across ${sources.length} primary sources and ${claims.length} graded findings within ${lineageLabel}.`
        : `An evidence-graded scientific monograph synthesising ${sources.length} indexed publications, clinical trials, and empirical benchmarks within ${lineageLabel}.`;

  const synopsisText =
    useBespokeAiArticle && aiArticle?.synopsis
      ? aiArticle.synopsis
      : summary && summary.length > 60
        ? summary
        : composeFallbackSynopsis(title, brief, lineageLabel, claims, sources, benchmarks, children);

  const sections: TopicArticleSection[] =
    useBespokeAiArticle && aiArticle && Array.isArray(aiArticle.sections) && aiArticle.sections.length >= 2
      ? aiArticle.sections
      : composeFallbackSections({
          title,
          brief,
          lineageLabel,
          claims,
          sources,
          featuredStudies,
          benchmarks,
          levers,
          milestones,
          debates,
          entities,
          children,
          gaps,
          sweepQueue,
          sourceIndexById,
        });

  const conclusionsText =
    useBespokeAiArticle && aiArticle?.conclusions
      ? aiArticle.conclusions
      : composeFallbackConclusions({
          title,
          claims,
          sources,
          levers,
          gaps,
          sweepQueue,
          bestTier,
          isLiveDispatch,
        });

  const keyTakeaways: string[] =
    useBespokeAiArticle && aiArticle && Array.isArray(aiArticle.keyTakeaways) && aiArticle.keyTakeaways.length > 0
      ? aiArticle.keyTakeaways
      : composeKeyTakeaways({
          title,
          benchmarks,
          levers,
          claims,
          featuredStudies,
          gaps,
          sweepQueue,
        });

  const wordCount =
    synopsisText.split(/\s+/).length +
    conclusionsText.split(/\s+/).length +
    sections.reduce(
      (acc, sec) =>
        acc +
        sec.paragraphs.reduce((pAcc, p) => pAcc + p.split(/\s+/).length, 0) +
        (sec.bullets ?? []).reduce((bAcc, b) => bAcc + b.split(/\s+/).length, 0),
      0,
    );
  const readingMinutes = Math.max(3, Math.round(wordCount / 180));

  return {
    title: articleTitle,
    subtitle: articleSubtitle,
    editionBadge: isLiveDispatch
      ? "Live Field Dispatch · Autonomous Research in Progress"
      : "State of the Field Monograph · AI Research Synthesis",
    isLiveDispatch,
    readingMinutes,
    bestTier,
    synopsis: synopsisText,
    sections,
    conclusions: conclusionsText,
    keyTakeaways,
    charts: {
      tierDistribution,
      tierSourceBasis,
      designBreakdown,
      yearHistogram,
      verdictProfile,
      settledCount,
      debatedCount,
      frontierCount,
    },
    benchmarks,
    levers,
    featuredStudies,
  };
}

function composeFallbackSynopsis(
  title: string,
  brief: string | null,
  lineageLabel: string,
  claims: ArticleInputClaim[],
  sources: ArticleInputSource[],
  benchmarks: SynthesisBenchmark[],
  children: Array<{ title: string; slug: string; brief: string | null }>,
): string {
  const scopeSentence = brief
    ? `${title} sits within ${lineageLabel} and investigates ${brief.charAt(0).toLowerCase()}${brief.slice(1)}`
    : `${title} is a canonical branch within ${lineageLabel} synthesising primary peer-reviewed literature, clinical trial registries, and quantitative mechanisms.`;

  const highTierClaims = claims.filter((c) => c.tier === "T1" || c.tier === "T2");
  const evidenceSentence =
    claims.length > 0
      ? `Across the archive, ${claims.length} graded findings have been extracted from ${sources.length} indexed publications, including ${highTierClaims.length} high-certainty (T1/T2) consensus and randomised-trial findings.`
      : sources.length > 0
        ? `The autonomous harvester has indexed ${sources.length} primary scientific publications and trial records across this branch, spanning systematic reviews, clinical cohorts, and mechanistic investigations.`
        : `This branch is queued for autonomous literature harvesting across Europe PMC, OpenAlex, and ClinicalTrials.gov.`;

  const benchmarkSentence =
    benchmarks.length > 0
      ? ` Baseline calibration anchors in this field include ${benchmarks
          .slice(0, 2)
          .map((b) => `${b.metric} (${b.label}, ${b.source})`)
          .join(" and ")}.`
      : children.length > 0
        ? ` Key sub-disciplines organised under this branch include ${children
            .slice(0, 4)
            .map((c) => c.title)
            .join(", ")}.`
        : "";

  return `${scopeSentence} ${evidenceSentence}${benchmarkSentence}`;
}

function composeFallbackSections(args: {
  title: string;
  brief: string | null;
  lineageLabel: string;
  claims: ArticleInputClaim[];
  sources: ArticleInputSource[];
  featuredStudies: FeaturedStudy[];
  benchmarks: SynthesisBenchmark[];
  levers: SynthesisLever[];
  milestones: ArticleInputMilestone[];
  debates: ArticleInputDebate[];
  entities: ArticleInputEntity[];
  children: Array<{ title: string; slug: string; brief: string | null }>;
  gaps: string[];
  sweepQueue: string[];
  sourceIndexById: Map<string, number>;
}): TopicArticleSection[] {
  const {
    title,
    brief,
    lineageLabel,
    claims,
    sources,
    featuredStudies,
    benchmarks,
    levers,
    milestones,
    debates,
    entities,
    children,
    gaps,
    sweepQueue,
    sourceIndexById,
  } = args;

  const sections: TopicArticleSection[] = [];

  // Section 1: Empirical Findings & Primary Research Record
  const sec1Paragraphs: string[] = [];
  if (claims.length > 0) {
    const topClaims = claims.slice(0, 4);
    const claimLines = topClaims.map((c) => {
      const refs = c.sources
        .slice(0, 2)
        .map((s) => {
          const n = sourceIndexById.get(s.id);
          return n ? `[${n}]` : s.year ? `(${s.year})` : "";
        })
        .filter(Boolean)
        .join("");
      return `[${c.tier}] ${c.statement}${refs ? ` ${refs}` : ""}`;
    });
    sec1Paragraphs.push(
      `The primary research record in ${title} is stratified by study design so that meta-analyses and replicated randomised controlled trials (T1–T2) carry greater epistemic weight than observational cohorts (T3–T4) or preclinical laboratory work (T5). Leading graded findings establish the core empirical baseline: ${claimLines.slice(0, 2).join(" ")}`,
    );
    if (claimLines.length > 2) {
      sec1Paragraphs.push(
        `Further clinical and mechanistic stratification across the literature demonstrates: ${claimLines.slice(2).join(" ")}`,
      );
    }
  } else if (featuredStudies.length > 0) {
    const studySummaries = featuredStudies
      .slice(0, 4)
      .map(
        (s) =>
          `"${s.title}" (${s.authorsLabel}${s.venue ? `, ${s.venue}` : ""}${s.year ? `, ${s.year}` : ""} — ${s.designLabel}${s.citedBy ? `, ${s.citedBy} citations` : ""}) [${s.citationNumber}]`,
      );
    sec1Paragraphs.push(
      `Across the ${sources.length} indexed publications in ${title}, foundational and high-impact studies include ${studySummaries.slice(0, 2).join("; ")}.`,
    );
    if (studySummaries.length > 2) {
      sec1Paragraphs.push(
        `Complementary investigations in the archive examine ${studySummaries.slice(2).join("; ")}. As the reader and skeptic agents complete full-batch extraction, each finding from these studies is assigned an explicit T1–T6 methodological grade.`,
      );
    }
  } else {
    sec1Paragraphs.push(
      `Autonomous literature harvesters query Europe PMC, OpenAlex, and ClinicalTrials.gov to assemble the primary evidence base for ${title}, grading every extracted finding from T1 (meta-analyses and practice guidelines) to T5 (cellular and animal mechanisms).`,
    );
  }

  sections.push({
    kicker: "Section I · Primary Literature & Evidence Synthesis",
    heading: "What the Peer-Reviewed Record Establishes",
    paragraphs: sec1Paragraphs,
    callout:
      benchmarks.length > 0
        ? `Baseline calibration anchor: ${benchmarks[0]!.metric} — ${benchmarks[0]!.label} (${benchmarks[0]!.source}).`
        : undefined,
  });

  // Section 2: Evaluated Levers, Mechanisms & Quantitative Comparisons
  const sec2Paragraphs: string[] = [];
  if (levers.length > 0) {
    const supported = levers.filter(
      (l) => l.verdict === "Supported" || l.verdict === "Guideline" || l.verdict === "Targeted",
    );
    const exploratory = levers.filter(
      (l) => l.verdict === "Trial only" || l.verdict === "Lab only" || l.verdict === "Weak" || l.verdict === "Not supported",
    );
    if (supported.length > 0) {
      sec2Paragraphs.push(
        `When evaluated as a quantitative decision and mechanism ledger, the best-supported interventions and frameworks in ${title} are: ${supported
          .slice(0, 3)
          .map(
            (l) =>
              `${l.name} (${l.verdict} — ${l.effect}; landmark evidence: ${l.bestEvidence}: ${l.reading})`,
          )
          .join("; ")}.`,
      );
    }
    if (exploratory.length > 0) {
      sec2Paragraphs.push(
        `By contrast, interventions and hypotheses that remain experimental, subgroup-restricted, or unsupported by randomised endpoints include: ${exploratory
          .slice(0, 3)
          .map((l) => `${l.name} (${l.verdict} — ${l.effect}; ${l.reading})`)
          .join("; ")}.`,
      );
    }
  }
  if (children.length > 0) {
    sec2Paragraphs.push(
      `Within the Tree of Knowledge, this field branches into ${children.length} specialised sub-disciplines: ${children
        .slice(0, 5)
        .map((c) => `${c.title}${c.brief ? ` (${c.brief.replace(/\.$/, "")})` : ""}`)
        .join("; ")}.`,
    );
  }
  if (sec2Paragraphs.length === 0) {
    const venues = [...new Set(sources.map((s) => s.venue).filter((v): v is string => Boolean(v)))].slice(0, 4);
    sec2Paragraphs.push(
      `Within ${lineageLabel}, mechanistic and clinical evaluation in ${title} focuses on ${brief ? brief.replace(/\.$/, "").toLowerCase() : "distinguishing replicated causal effects from observational confounding"}.${venues.length > 0 ? ` Primary publications in the current corpus span ${venues.join(", ")}.` : ""}`,
    );
  }
  sections.push({
    kicker: "Section II · Mechanisms, Interventions & Subgroup Calibration",
    heading: "Comparative Evaluation of Levers & Theoretical Models",
    paragraphs: sec2Paragraphs,
  });

  // Section 3: Historical Trajectory, Contested Debates & Active Trials
  const sec3Paragraphs: string[] = [];
  if (milestones.length > 0) {
    const sortedMilestones = [...milestones].sort((a, b) => a.year - b.year);
    sec3Paragraphs.push(
      `Chronologically, the field evolved through key inflection points: ${sortedMilestones
        .slice(0, 4)
        .map((m) => `in ${m.year}, ${m.title}${m.description ? ` (${m.description.replace(/\.$/, "")})` : ""}`)
        .join("; ")}.`,
    );
  }
  if (debates.length > 0) {
    sec3Paragraphs.push(
      `Active scientific debates and unresolved methodological tensions centre on: ${debates
        .slice(0, 3)
        .map((d) => `${d.note} (${d.kind.replace(/_/g, " ")})`)
        .join(" ")}`,
    );
  }
  const frontierClaims = claims.filter((c) => c.controversy !== "settled");
  if (frontierClaims.length > 0 && debates.length === 0) {
    sec3Paragraphs.push(
      `Contested and frontier findings currently under investigation include: ${frontierClaims
        .slice(0, 2)
        .map(
          (c) =>
            `[${c.tier} · ${CONTROVERSY_LABELS[c.controversy as Controversy] ?? c.controversy}] ${c.statement}${c.rationale ? ` (${c.rationale})` : ""}`,
        )
        .join(" ")}`,
    );
  }
  if (entities.length > 0) {
    sec3Paragraphs.push(
      `Active research groups, trials, and regulatory benchmarks tracked in this space include ${entities
        .slice(0, 4)
        .map((e) => `${e.name}${e.country ? ` (${e.country})` : ""}${e.summary ? ` — ${e.summary.replace(/\.$/, "")}` : ""}`)
        .join("; ")}.`,
    );
  }

  if (sec3Paragraphs.length > 0) {
    sections.push({
      kicker: "Section III · Historical Trajectory & Contested Frontiers",
      heading: "Evolution of the Field, Open Debates & Active Trials",
      paragraphs: sec3Paragraphs,
    });
  }

  // Section 4 (or Section 3 if no milestones/debates yet): Open Questions, Methodological Gaps & Next Research Sweep
  const openFrontiers = Array.from(new Set([...gaps, ...sweepQueue].map((g) => g.trim()).filter(Boolean)));
  const sec4Paragraphs: string[] = [];
  if (openFrontiers.length > 0) {
    sec4Paragraphs.push(
      `Methodological priorities and open empirical questions queued for the next research sweep across ${title} focus on resolving subgroup effect sizes, causal mechanisms, and long-term outcomes:`,
    );
  } else {
    sec4Paragraphs.push(
      `Ongoing autonomous research sweeps continue to monitor newly registered clinical trials, preprints, and systematic reviews in ${title} to refine subgroup effect sizes and update epistemic grades.`,
    );
  }
  sections.push({
    kicker: `Section ${sections.length === 3 ? "IV" : "III"} · Evidentiary Gaps & Research Frontiers`,
    heading: "Open Questions & Priorities for the Next Research Sweep",
    paragraphs: sec4Paragraphs,
    bullets: openFrontiers.length > 0 ? openFrontiers.slice(0, 6) : undefined,
  });

  return sections;
}

function isMechanicalFallbackArticle(article: TopicArticle | undefined): boolean {
  if (!article || !Array.isArray(article.sections) || article.sections.length < 2) return true;
  return article.sections.some((sec) =>
    (sec.paragraphs ?? []).some(
      (p) =>
        p.startsWith("Critical evidentiary gaps and methodological priorities identified across ") ||
        p.startsWith("Methodological priorities and open empirical questions queued for the next research sweep across ") ||
        p.startsWith("The primary research record in "),
    ),
  );
}

function composeFallbackConclusions(args: {
  title: string;
  claims: ArticleInputClaim[];
  sources: ArticleInputSource[];
  levers: SynthesisLever[];
  gaps: string[];
  sweepQueue: string[];
  bestTier: Tier | null;
  isLiveDispatch: boolean;
}): string {
  const { title, claims, sources, levers, gaps, sweepQueue, bestTier, isLiveDispatch } = args;

  const statusOpening = isLiveDispatch
    ? `This live field dispatch for ${title} synthesises ${sources.length} indexed publications while autonomous workers complete full claim extraction and skeptic calibration.`
    : `Taken together, the evidence record in ${title} (${sources.length} primary sources, ${claims.length} graded claims${bestTier ? `, highest certainty ${bestTier} — ${TIER_LABELS[bestTier]}` : ""}) separates replicated high-tier findings from early-stage hypotheses.`;

  const supportedLevers = levers.filter(
    (l) => l.verdict === "Supported" || l.verdict === "Guideline" || l.verdict === "Targeted",
  );
  const leverConclusion =
    supportedLevers.length > 0
      ? ` The most robust actionable levers supported by current evidence are ${supportedLevers
          .slice(0, 3)
          .map((l) => `${l.name} (${l.effect})`)
          .join(", ")}.`
      : "";

  const openCount = new Set([...gaps, ...sweepQueue].filter(Boolean)).size;
  const gapConclusion =
    openCount > 0
      ? ` The ${openCount} open research ${openCount === 1 ? "priority" : "priorities"} detailed above guide the next autonomous literature and clinical trial sweep.`
      : ` Subsequent research sweeps will continue tracking newly registered clinical trials and preprints to update this monograph.`;

  return `${statusOpening}${leverConclusion}${gapConclusion}`;
}

function composeKeyTakeaways(args: {
  title: string;
  benchmarks: SynthesisBenchmark[];
  levers: SynthesisLever[];
  claims: ArticleInputClaim[];
  featuredStudies: FeaturedStudy[];
  gaps: string[];
  sweepQueue: string[];
}): string[] {
  const { title, benchmarks, levers, claims, featuredStudies, gaps, sweepQueue } = args;
  const takeaways: string[] = [];

  for (const b of benchmarks.slice(0, 2)) {
    takeaways.push(`${b.metric}: ${b.label} (${b.source}).`);
  }
  for (const l of levers.slice(0, 2)) {
    takeaways.push(`${l.name} [${l.verdict}]: ${l.effect} — ${l.reading}`);
  }
  if (takeaways.length < 4) {
    for (const c of claims.slice(0, 4 - takeaways.length)) {
      takeaways.push(`[${c.tier}] ${c.statement}`);
    }
  }
  if (takeaways.length < 3 && featuredStudies.length > 0) {
    for (const s of featuredStudies.slice(0, 3 - takeaways.length)) {
      takeaways.push(
        `Landmark study [${s.citationNumber}]: "${s.title}" (${s.authorsLabel}${s.year ? `, ${s.year}` : ""} · ${s.designLabel}).`,
      );
    }
  }
  const nextFrontier = gaps[0] ?? sweepQueue[0];
  if (nextFrontier && takeaways.length < 5) {
    takeaways.push(`Open frontier in ${title}: ${nextFrontier}`);
  }
  return takeaways;
}
