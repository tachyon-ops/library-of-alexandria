/**
 * Evidence model. Every claim in the library carries a tier, derived
 * deterministically from the study designs that support it, so the grading
 * is auditable and does not depend on a model's mood.
 */

export const STUDY_DESIGNS = [
  "guideline",
  "systematic_review",
  "meta_analysis",
  "rct",
  "registry",
  "cohort",
  "case_control",
  "cross_sectional",
  "case_series",
  "case_report",
  "animal",
  "in_vitro",
  "computational",
  "expert_opinion",
  "news_or_web",
  "unknown",
] as const;
export type StudyDesign = (typeof STUDY_DESIGNS)[number];

/** T1 is strongest. */
export const TIERS = ["T1", "T2", "T3", "T4", "T5", "T6"] as const;
export type Tier = (typeof TIERS)[number];

export const TIER_LABELS: Record<Tier, string> = {
  T1: "Synthesis of trials",
  T2: "Randomised trial",
  T3: "Observational, large",
  T4: "Observational, small or case-based",
  T5: "Preclinical or mechanistic",
  T6: "Opinion, news or unverified",
};

const DESIGN_TIER: Record<StudyDesign, Tier> = {
  guideline: "T1",
  systematic_review: "T1",
  meta_analysis: "T1",
  rct: "T2",
  registry: "T3",
  cohort: "T3",
  case_control: "T3",
  cross_sectional: "T4",
  case_series: "T4",
  case_report: "T4",
  animal: "T5",
  in_vitro: "T5",
  computational: "T5",
  expert_opinion: "T6",
  news_or_web: "T6",
  unknown: "T6",
};

const SMALL_STUDY = 100;

export function tierRank(t: Tier): number {
  return TIERS.indexOf(t) + 1;
}

/** Tier of one source, with a one-step downgrade for small trials and cohorts. */
export function tierForSource(design: StudyDesign, sampleSize?: number | null): Tier {
  const base = DESIGN_TIER[design];
  if (sampleSize != null && sampleSize > 0 && sampleSize < SMALL_STUDY && (base === "T2" || base === "T3")) {
    return TIERS[TIERS.indexOf(base) + 1] as Tier;
  }
  return base;
}

/**
 * Tier of a claim: the best tier among its supporting sources. A claim cannot
 * sit in T2 with only one T2-grade trial (even alongside weaker studies),
 * because one trial is not yet a finding.
 */
export function tierForClaim(sources: { design: StudyDesign; sampleSize?: number | null }[]): Tier {
  if (sources.length === 0) return "T6";
  const tiers = sources.map((s) => tierForSource(s.design, s.sampleSize));
  const best = tiers.reduce((a, b) => (tierRank(a) <= tierRank(b) ? a : b));
  if (best === "T2" && tiers.filter((t) => t === "T2").length < 2) return "T3";
  return best;
}

export function normaliseDesign(raw: string | null | undefined): StudyDesign {
  const v = (raw ?? "").toLowerCase().replace(/[\s-]+/g, "_");
  return (STUDY_DESIGNS as readonly string[]).includes(v) ? (v as StudyDesign) : "unknown";
}

/** How settled a claim is. "fringe" is a label, not a verdict: it marks claims to examine, not to hide. */
export const CONTROVERSY = ["settled", "debated", "contested", "fringe", "commercial_hype"] as const;
export type Controversy = (typeof CONTROVERSY)[number];

export const CONTROVERSY_LABELS: Record<Controversy, string> = {
  settled: "Settled",
  debated: "Debated",
  contested: "Contested",
  fringe: "Frontier / fringe",
  commercial_hype: "Marketed ahead of evidence",
};

export const DIRECTIONS = ["supports", "refutes", "mixed", "no_effect", "unclear"] as const;
export type Direction = (typeof DIRECTIONS)[number];
