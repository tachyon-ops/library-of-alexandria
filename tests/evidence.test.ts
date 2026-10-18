import { describe, expect, it } from "vitest";
import { invertedIndexToText, lookupGlossaryTerm, normaliseDesign, normaliseDoi, slugify, tierForClaim, tierForSource } from "@lib/core";

describe("evidence tiers", () => {
  it("maps designs to tiers", () => {
    expect(tierForSource("meta_analysis")).toBe("T1");
    expect(tierForSource("rct", 400)).toBe("T2");
    expect(tierForSource("animal")).toBe("T5");
    expect(tierForSource("news_or_web")).toBe("T6");
  });

  it("downgrades small trials and cohorts by one step", () => {
    expect(tierForSource("rct", 40)).toBe("T3");
    expect(tierForSource("cohort", 60)).toBe("T4");
    expect(tierForSource("meta_analysis", 10)).toBe("T1");
  });

  it("takes the best supporting source, but one trial alone is not T2", () => {
    expect(tierForClaim([{ design: "case_report" }, { design: "cohort", sampleSize: 5000 }])).toBe("T3");
    expect(tierForClaim([{ design: "rct", sampleSize: 900 }])).toBe("T3");
    expect(tierForClaim([{ design: "rct", sampleSize: 900 }, { design: "case_report" }])).toBe("T3");
    expect(tierForClaim([{ design: "rct", sampleSize: 900 }, { design: "rct", sampleSize: 300 }])).toBe("T2");
    expect(tierForClaim([{ design: "systematic_review" }])).toBe("T1");
    expect(tierForClaim([])).toBe("T6");
  });

  it("normalises loose design labels", () => {
    expect(normaliseDesign("Meta Analysis")).toBe("meta_analysis");
    expect(normaliseDesign("case-control")).toBe("case_control");
    expect(normaliseDesign("whatever")).toBe("unknown");
    expect(normaliseDesign(null)).toBe("unknown");
  });
});

describe("helpers", () => {
  it("slugifies titles with accents", () => {
    expect(slugify("Gravidez após os 44: riscos")).toBe("gravidez-apos-os-44-riscos");
  });
  it("rebuilds OpenAlex abstracts", () => {
    expect(invertedIndexToText({ eggs: [1], Frozen: [0], survive: [2] })).toBe("Frozen eggs survive");
  });
  it("normalises DOIs", () => {
    expect(normaliseDoi("https://doi.org/10.1093/HUMREP/deac249")).toBe("10.1093/humrep/deac249");
  });
  it("looks up scientific glossary terms and morphological roots", () => {
    const auto = lookupGlossaryTerm("Autologous");
    expect(auto?.term).toBe("Autologous");
    expect(auto?.synopsis).toContain("own body");

    const oocytes = lookupGlossaryTerm("oocytes,");
    expect(oocytes?.term).toBe("Oocyte (Egg Cell)");

    const zymot = lookupGlossaryTerm("ZyMōt");
    expect(zymot?.term).toContain("ZyMōt");

    const morph = lookupGlossaryTerm("folliculogenesis");
    expect(morph?.synopsis).toContain("small sac / follicle");
  });
});
