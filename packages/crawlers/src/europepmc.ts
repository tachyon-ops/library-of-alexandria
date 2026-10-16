import { normaliseDoi, type SourceRecord } from "@lib/core";
import { getJson } from "./http";
import type { SourceAdapter } from "./types";

/**
 * Europe PMC indexes PubMed/MEDLINE, PubMed Central and the major preprint
 * servers, and returns abstracts in one call ("core" result type).
 * Docs: https://europepmc.org/RestfulWebService
 */

interface EpmcResult {
  id: string;
  source: string;
  pmid?: string;
  doi?: string;
  title?: string;
  authorString?: string;
  pubYear?: string;
  abstractText?: string;
  citedByCount?: number;
  journalInfo?: { journal?: { title?: string } };
  bookOrReportDetails?: { publisher?: string };
  pubTypeList?: { pubType?: string[] };
}

interface EpmcResponse {
  resultList?: { result?: EpmcResult[] };
}

const PUB_TYPE_DESIGN: [RegExp, string][] = [
  [/practice guideline|guideline/i, "guideline"],
  [/meta-analysis/i, "meta_analysis"],
  [/systematic review/i, "systematic_review"],
  [/randomized controlled trial/i, "rct"],
  [/case reports?/i, "case_report"],
  [/observational study/i, "cohort"],
  [/preprint/i, "unknown"],
];

export function parseEuropePmc(json: EpmcResponse): SourceRecord[] {
  return (json.resultList?.result ?? [])
    .filter((r) => r.title)
    .map((r) => {
      const types = r.pubTypeList?.pubType ?? [];
      const design = PUB_TYPE_DESIGN.find(([re]) => types.some((t) => re.test(t)))?.[1] ?? null;
      const isPreprint = r.source === "PPR";
      return {
        kind: isPreprint ? "preprint" : "paper",
        externalId: `europepmc:${r.source}:${r.id}`,
        origin: "europepmc",
        title: stripTags(r.title!),
        url: r.doi ? `https://doi.org/${r.doi}` : `https://europepmc.org/article/${r.source}/${r.id}`,
        doi: normaliseDoi(r.doi),
        venue: r.journalInfo?.journal?.title ?? r.bookOrReportDetails?.publisher ?? null,
        year: r.pubYear ? Number(r.pubYear) : null,
        authors: (r.authorString ?? "").split(",").map((a) => a.trim().replace(/\.$/, "")).filter(Boolean).slice(0, 12),
        abstract: r.abstractText ? stripTags(r.abstractText) : null,
        citedBy: r.citedByCount ?? null,
        declaredDesign: design,
        sampleSize: null,
        extra: { pubTypes: types, pmid: r.pmid ?? null },
      } satisfies SourceRecord;
    });
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

export const europePmc: SourceAdapter = {
  name: "europepmc",
  kinds: ["paper", "preprint"],
  async search(query, { limit }) {
    const url = new URL("https://www.ebi.ac.uk/europepmc/webservices/rest/search");
    url.searchParams.set("query", `TITLE_ABS:(${query})`);
    url.searchParams.set("format", "json");
    url.searchParams.set("resultType", "core");
    url.searchParams.set("pageSize", String(limit));
    url.searchParams.set("sort", "CITED desc");
    return parseEuropePmc(await getJson<EpmcResponse>(url.toString()));
  },
};

/** Same index, newest first: the frontier view of a query. */
export const europePmcRecent: SourceAdapter = {
  name: "europepmc-recent",
  kinds: ["paper", "preprint"],
  async search(query, { limit }) {
    const since = new Date().getFullYear() - 2;
    const url = new URL("https://www.ebi.ac.uk/europepmc/webservices/rest/search");
    url.searchParams.set("query", `TITLE_ABS:(${query}) AND PUB_YEAR:[${since} TO 3000]`);
    url.searchParams.set("format", "json");
    url.searchParams.set("resultType", "core");
    url.searchParams.set("pageSize", String(limit));
    url.searchParams.set("sort", "P_PDATE_D desc");
    return parseEuropePmc(await getJson<EpmcResponse>(url.toString()));
  },
};
