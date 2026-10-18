import { describe, expect, it } from "vitest";
import {
  extractSearchTerms,
  inferBranchProposal,
  invertedIndexToText,
  lookupGlossaryTerm,
  normaliseDesign,
  normaliseDoi,
  slugify,
  suggestTopicTitle,
  synthesizeSearchBriefing,
  tierForClaim,
  tierForSource,
} from "@lib/core";

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
  it("looks up scientific glossary terms, general dictionary words, and morphological roots", () => {
    const auto = lookupGlossaryTerm("Autologous");
    expect(auto?.term).toBe("Autologous");
    expect(auto?.synopsis).toContain("own body");

    const oocytes = lookupGlossaryTerm("oocytes,");
    expect(oocytes?.term).toBe("Oocyte (Egg Cell)");

    const zymot = lookupGlossaryTerm("ZyMōt");
    expect(zymot?.term).toContain("ZyMōt");

    const morph = lookupGlossaryTerm("folliculogenesis");
    expect(morph?.synopsis).toContain("small sac / follicle");

    const frontier = lookupGlossaryTerm("frontier");
    expect(frontier?.term).toBe("Frontier");
    expect(frontier?.synopsis).toContain("leading edge");

    const studies = lookupGlossaryTerm("studies");
    expect(studies).not.toBeNull();
    expect(studies?.synopsis.length).toBeGreaterThan(15);

    const anyWord = lookupGlossaryTerm("uncharacteristically");
    expect(anyWord).not.toBeNull();
    expect(anyWord?.synopsis.length).toBeGreaterThan(10);
  });
  it("extracts search terms, suggests branch placement, and synthesises grounded briefings", () => {
    expect(extractSearchTerms("What is the evidence on rapamycin for ovarian reserve after 40?")).toEqual([
      "rapamycin",
      "ovarian",
      "reserve",
      "40",
    ]);
    expect(suggestTopicTitle("what is the evidence on coq10 and prp for ivf?")).toBe("CoQ10 and PRP for IVF");

    const treeNodes = [
      {
        id: "t-root",
        parentId: null,
        slug: "reproductive-medicine-human-fertility",
        title: "Reproductive Medicine & Human Fertility",
        brief: "Root fertility branch",
        depth: 0,
      },
      {
        id: "t-frontier",
        parentId: "t-root",
        slug: "translational-geroprotective-reproductive-biology",
        title: "Translational & Geroprotective Reproductive Biology",
        brief: "Rapamycin, IVG, MRT, PRP",
        depth: 1,
      },
    ];

    const proposal = inferBranchProposal("rapamycin mtor follicular longevity", treeNodes);
    expect(proposal.parentId).toBe("t-frontier");
    expect(proposal.title).toBe("Rapamycin mTOR Follicular Longevity");

    const synthesis = synthesizeSearchBriefing(
      "rapamycin",
      {
        query: "rapamycin",
        terms: ["rapamycin"],
        topics: [
          {
            id: "t-frontier",
            parentId: "t-root",
            slug: "translational-geroprotective-reproductive-biology",
            title: "Translational & Geroprotective Reproductive Biology",
            brief: "Frontier biology",
            summary: "Short-course mTOR modulation slows primordial follicle activation.",
            status: "ready",
            depth: 1,
            claimCount: 1,
            synthesis: {
              levers: [
                {
                  name: "Low-dose Rapamycin (mTOR inhibition)",
                  category: "Geroprotective",
                  description: "Weekly oral rapamycin protocol",
                  bestEvidence: "VIBRANT Phase 2 RCT",
                  effect: "Slows follicular attrition",
                  reading: "Investigational protocol",
                  verdict: "Trial only",
                },
              ],
            },
          },
        ],
        claims: [
          {
            id: "c-1",
            topicId: "t-frontier",
            topicSlug: "translational-geroprotective-reproductive-biology",
            topicTitle: "Translational & Geroprotective Reproductive Biology",
            statement: "Short-course rapamycin preserves ovarian primordial follicle pool in preclinical and early human trials.",
            tier: "T3",
            controversy: "contested",
            direction: "supports",
            confidence: 0.7,
            rationale: "Early trial data.",
            sources: [
              {
                id: "s-1",
                title: "VIBRANT ovarian aging trial",
                url: "https://clinicaltrials.gov/study/NCT05836025",
                year: 2024,
                design: "rct",
                venue: "ClinicalTrials.gov",
              },
            ],
          },
        ],
        sources: [],
        entities: [],
      },
      treeNodes,
    );

    expect(synthesis.coverageStatus).toBe("strong");
    expect(synthesis.bestTier).toBe("T3");
    expect(synthesis.matchedLevers).toHaveLength(1);
    expect(synthesis.paragraphs.length).toBeGreaterThanOrEqual(2);
    expect(synthesis.citations.length).toBeGreaterThanOrEqual(2);
  });
});

