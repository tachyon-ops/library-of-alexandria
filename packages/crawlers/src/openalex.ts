import { invertedIndexToText, normaliseDoi, type SourceRecord } from "@lib/core";
import { getJson } from "./http";
import type { SourceAdapter } from "./types";

/**
 * OpenAlex covers every field of science (about 250M works), not only
 * medicine, which is what lets the library branch into any topic.
 * Docs: https://docs.openalex.org
 */

interface OaWork {
  id: string;
  doi?: string | null;
  display_name?: string | null;
  publication_year?: number | null;
  cited_by_count?: number;
  type?: string | null;
  abstract_inverted_index?: Record<string, number[]> | null;
  primary_location?: { landing_page_url?: string | null; source?: { display_name?: string | null } | null } | null;
  authorships?: { author?: { display_name?: string | null } }[];
}

interface OaResponse {
  results?: OaWork[];
}

export function parseOpenAlex(json: OaResponse): SourceRecord[] {
  return (json.results ?? [])
    .filter((w) => w.display_name)
    .map((w) => {
      const doi = normaliseDoi(w.doi);
      const type = w.type ?? null;
      return {
        kind: type === "preprint" ? "preprint" : "paper",
        externalId: `openalex:${w.id.replace("https://openalex.org/", "")}`,
        origin: "openalex",
        title: w.display_name!,
        url: doi ? `https://doi.org/${doi}` : (w.primary_location?.landing_page_url ?? w.id),
        doi,
        venue: w.primary_location?.source?.display_name ?? null,
        year: w.publication_year ?? null,
        authors: (w.authorships ?? []).map((a) => a.author?.display_name ?? "").filter(Boolean).slice(0, 12),
        abstract: invertedIndexToText(w.abstract_inverted_index),
        citedBy: w.cited_by_count ?? null,
        declaredDesign: type === "review" ? "systematic_review" : null,
        sampleSize: null,
        extra: { openalexType: type },
      } satisfies SourceRecord;
    });
}

export const openAlex: SourceAdapter = {
  name: "openalex",
  kinds: ["paper", "preprint"],
  async search(query, { limit }) {
    const url = new URL("https://api.openalex.org/works");
    url.searchParams.set("search", query);
    url.searchParams.set("filter", "has_abstract:true");
    url.searchParams.set("per-page", String(limit));
    url.searchParams.set("sort", "relevance_score:desc");
    if (process.env.CONTACT_EMAIL) url.searchParams.set("mailto", process.env.CONTACT_EMAIL);
    return parseOpenAlex(await getJson<OaResponse>(url.toString()));
  },
};
