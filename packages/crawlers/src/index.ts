import { clinicalTrials } from "./clinicaltrials";
import { europePmc, europePmcRecent } from "./europepmc";
import { openAlex } from "./openalex";
import type { SourceAdapter } from "./types";

export { parseClinicalTrials } from "./clinicaltrials";
export { parseEuropePmc } from "./europepmc";
export { parseOpenAlex } from "./openalex";
export type { SearchOptions, SourceAdapter } from "./types";

/** Adapters for literature queries: the most cited, the newest, and the cross-disciplinary index. */
export const LITERATURE_ADAPTERS: SourceAdapter[] = [europePmc, europePmcRecent, openAlex];

/** Adapters for registered trials. */
export const TRIAL_ADAPTERS: SourceAdapter[] = [clinicalTrials];

export { clinicalTrials, europePmc, europePmcRecent, openAlex };
