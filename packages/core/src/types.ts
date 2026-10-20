import type { Controversy, Direction, StudyDesign, Tier } from "./evidence";

export const SOURCE_KINDS = ["paper", "preprint", "trial", "web", "regulation", "news"] as const;
export type SourceKind = (typeof SOURCE_KINDS)[number];

/** A source as an adapter returns it, before it is stored. */
export interface SourceRecord {
  kind: SourceKind;
  /** Stable id inside its origin: "europepmc:MED:123", "openalex:W123", "nct:NCT0123". */
  externalId: string;
  origin: string;
  title: string;
  url: string | null;
  doi: string | null;
  venue: string | null;
  year: number | null;
  authors: string[];
  abstract: string | null;
  citedBy: number | null;
  /** Design as declared by the origin (publication type, trial phase), if any. */
  declaredDesign: string | null;
  sampleSize: number | null;
  extra: Record<string, unknown>;
}

export const ENTITY_KINDS = ["clinic", "treatment", "trial", "lab", "company", "regulation", "person"] as const;
export type EntityKind = (typeof ENTITY_KINDS)[number];

export const TOPIC_STATUSES = ["idle", "queued", "researching", "ready", "error"] as const;
export type TopicStatus = (typeof TOPIC_STATUSES)[number];

export const SYNTHESIS_VERDICTS = [
  "Supported",
  "Targeted",
  "Guideline",
  "Weak",
  "Not supported",
  "Trial only",
  "Lab only",
  "Case by case",
] as const;
export type SynthesisVerdict = (typeof SYNTHESIS_VERDICTS)[number];

export interface SynthesisBenchmark {
  metric: string;
  label: string;
  source: string;
  sourceUrl?: string;
}

export interface SynthesisLever {
  name: string;
  category: string;
  description: string;
  bestEvidence: string;
  effect: string;
  reading: string;
  verdict: SynthesisVerdict;
  sourceUrl?: string;
}

export interface TopicArticleSection {
  kicker?: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: string;
}

export interface TopicArticle {
  title: string;
  subtitle: string;
  synopsis: string;
  sections: TopicArticleSection[];
  conclusions: string;
  keyTakeaways: string[];
}

export interface TopicSynthesis {
  benchmarks?: SynthesisBenchmark[];
  levers?: SynthesisLever[];
  clinicalQuestions?: string[];
  sweepQueue?: string[];
  article?: TopicArticle;
}

export interface Topic {
  id: string;
  parentId: string | null;
  slug: string;
  title: string;
  brief: string | null;
  depth: number;
  status: TopicStatus;
  summary: string | null;
  gaps: string[];
  synthesis?: TopicSynthesis | null;
  lastResearchedAt: Date | null;
}

export interface Claim {
  id: string;
  topicId: string;
  statement: string;
  tier: Tier;
  controversy: Controversy;
  direction: Direction;
  confidence: number;
  rationale: string | null;
  designs: StudyDesign[];
}

export const JOB_KINDS = ["plan", "harvest", "extract", "scan", "review"] as const;
export type JobKind = (typeof JOB_KINDS)[number];

export interface ResearchQueries {
  literature: string[];
  trials: string[];
  web: string[];
}
