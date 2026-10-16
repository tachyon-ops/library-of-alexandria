import type { SourceRecord } from "@lib/core";
import { getJson } from "./http";
import type { SourceAdapter } from "./types";

/**
 * ClinicalTrials.gov API v2: registered trials, including ones not yet
 * published. This is where new treatments appear first.
 * Docs: https://clinicaltrials.gov/data-api/api
 */

interface CtStudy {
  protocolSection?: {
    identificationModule?: { nctId?: string; briefTitle?: string; officialTitle?: string };
    statusModule?: { overallStatus?: string; startDateStruct?: { date?: string }; completionDateStruct?: { date?: string } };
    sponsorCollaboratorsModule?: { leadSponsor?: { name?: string } };
    descriptionModule?: { briefSummary?: string };
    conditionsModule?: { conditions?: string[] };
    designModule?: { studyType?: string; phases?: string[]; enrollmentInfo?: { count?: number } };
    armsInterventionsModule?: { interventions?: { type?: string; name?: string }[] };
    contactsLocationsModule?: { locations?: { facility?: string; city?: string; country?: string }[] };
  };
  hasResults?: boolean;
}

interface CtResponse {
  studies?: CtStudy[];
}

export function parseClinicalTrials(json: CtResponse): SourceRecord[] {
  const out: SourceRecord[] = [];
  for (const s of json.studies ?? []) {
    const p = s.protocolSection;
    const id = p?.identificationModule?.nctId;
    const title = p?.identificationModule?.briefTitle ?? p?.identificationModule?.officialTitle;
    if (!id || !title) continue;
    const studyType = p?.designModule?.studyType ?? null;
    const start = p?.statusModule?.startDateStruct?.date;
    out.push({
      kind: "trial",
      externalId: `nct:${id}`,
      origin: "clinicaltrials.gov",
      title,
      url: `https://clinicaltrials.gov/study/${id}`,
      doi: null,
      venue: p?.sponsorCollaboratorsModule?.leadSponsor?.name ?? null,
      year: start ? Number(start.slice(0, 4)) : null,
      authors: [],
      abstract: p?.descriptionModule?.briefSummary ?? null,
      citedBy: null,
      declaredDesign: studyType === "INTERVENTIONAL" ? "rct" : studyType === "OBSERVATIONAL" ? "cohort" : null,
      sampleSize: p?.designModule?.enrollmentInfo?.count ?? null,
      extra: {
        status: p?.statusModule?.overallStatus ?? null,
        phases: p?.designModule?.phases ?? [],
        hasResults: s.hasResults ?? false,
        conditions: p?.conditionsModule?.conditions ?? [],
        interventions: (p?.armsInterventionsModule?.interventions ?? []).map((i) => i.name).filter(Boolean),
        countries: [...new Set((p?.contactsLocationsModule?.locations ?? []).map((l) => l.country).filter(Boolean))],
      },
    });
  }
  return out;
}

export const clinicalTrials: SourceAdapter = {
  name: "clinicaltrials",
  kinds: ["trial"],
  async search(query, { limit }) {
    const url = new URL("https://clinicaltrials.gov/api/v2/studies");
    url.searchParams.set("query.term", query);
    url.searchParams.set("pageSize", String(limit));
    url.searchParams.set("sort", "LastUpdatePostDate:desc");
    return parseClinicalTrials(await getJson<CtResponse>(url.toString()));
  },
};
