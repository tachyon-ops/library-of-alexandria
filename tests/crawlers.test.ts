import { describe, expect, it } from "vitest";
import { parseClinicalTrials, parseEuropePmc, parseOpenAlex } from "@lib/crawlers";
import { clinicalTrialsResponse, europePmcResponse, openAlexResponse } from "./fixtures/responses";

describe("Europe PMC parser", () => {
  const rows = parseEuropePmc(europePmcResponse);
  it("skips untitled rows and strips markup", () => {
    expect(rows).toHaveLength(2);
    expect(rows[0]!.title).toBe("Cumulative live birth after planned oocyte vitrification: a meta-analysis");
    expect(rows[0]!.abstract).not.toContain("<h4>");
  });
  it("reads design, venue, authors and DOI", () => {
    expect(rows[0]).toMatchObject({
      kind: "paper",
      declaredDesign: "meta_analysis",
      venue: "Human Reproduction Update",
      doi: "10.1000/vitri.2024.1",
      year: 2024,
      citedBy: 41,
    });
    expect(rows[0]!.authors).toEqual(["Cobo A", "Garcia-Velasco JA", "Doyle JO"]);
  });
  it("marks preprints", () => {
    expect(rows[1]).toMatchObject({ kind: "preprint", externalId: "europepmc:PPR:PPR900001", doi: null });
  });
});

describe("OpenAlex parser", () => {
  const rows = parseOpenAlex(openAlexResponse);
  it("rebuilds abstracts and normalises DOIs to match Europe PMC", () => {
    expect(rows[0]!.abstract).toBe("Age at freezing predicts live birth.");
    expect(rows[0]!.doi).toBe("10.1000/vitri.2024.1");
    expect(rows[0]!.declaredDesign).toBe("systematic_review");
    expect(rows[0]!.externalId).toBe("openalex:W4000000001");
  });
  it("falls back to the landing page without a DOI", () => {
    expect(rows[1]).toMatchObject({ url: "https://example.org/b", abstract: null, venue: null });
  });
});

describe("ClinicalTrials.gov parser", () => {
  const rows = parseClinicalTrials(clinicalTrialsResponse);
  it("reads trial status, size and countries", () => {
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      kind: "trial",
      externalId: "nct:NCT07000001",
      url: "https://clinicaltrials.gov/study/NCT07000001",
      year: 2025,
      sampleSize: 200,
      declaredDesign: "rct",
      venue: "Nankai University",
    });
    expect(rows[0]!.extra).toMatchObject({ status: "RECRUITING", interventions: ["Sirolimus"], countries: ["China"] });
  });
});
