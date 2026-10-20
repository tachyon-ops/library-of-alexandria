import { describe, expect, it } from "vitest";
import {
  extractSearchTerms,
  inferBranchProposal,
  inferBranchProposals,
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
import {
  ALL_SEED_DOSSIERS,
  CROSS_DISCIPLINE_LINKS,
  ECONOMICS_FINANCE_DOSSIERS,
  ENCYCLOPAEDIC_TRUNKS,
  MATH_SEED_DOSSIERS,
  PHYSICS_CLASSICAL_DOSSIERS,
  PHYSICS_FRONTIER_GRAVITY_DOSSIERS,
  PHYSICS_GRAVITY_STRING_DOSSIERS,
  PHYSICS_QUANTUM_DOSSIERS,
  type SeedNode,
} from "@lib/db";

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
  it("looks up scientific glossary terms across biomedical, physics, mathematics, and quantitative finance", () => {
    const auto = lookupGlossaryTerm("Autologous");
    expect(auto?.term).toBe("Autologous");
    expect(auto?.synopsis).toContain("own body");

    const oocytes = lookupGlossaryTerm("oocytes,");
    expect(oocytes?.term).toBe("Oocyte (Egg Cell)");

    const zymot = lookupGlossaryTerm("ZyMōt");
    expect(zymot?.term).toContain("ZyMōt");

    const gardner = lookupGlossaryTerm("4BB");
    expect(gardner?.term).toContain("Gardner Blastocyst Grading");
    expect(gardner?.synopsis).toContain("Inner Cell Mass");

    const pronuclear = lookupGlossaryTerm("2PN");
    expect(pronuclear?.term).toContain("Pronuclear Scoring");
    expect(pronuclear?.whyItMatters).toContain("1PN");

    const mond = lookupGlossaryTerm("MOND");
    expect(mond?.term).toContain("MOND");
    expect(mond?.synopsis).toContain("Milgrom");

    const qi = lookupGlossaryTerm("Quantised Inertia");
    expect(qi?.term).toContain("Quantised Inertia");
    expect(qi?.synopsis).toContain("Unruh");

    const wideBinaries = lookupGlossaryTerm("wide binaries");
    expect(wideBinaries?.term).toContain("Wide Binary");
    expect(wideBinaries?.whyItMatters).toContain("Gaia");

    const ito = lookupGlossaryTerm("Itô's Lemma");
    expect(ito?.term).toContain("Itô");
    expect(ito?.synopsis).toContain("quadratic variation");

    const cointegration = lookupGlossaryTerm("cointegration");
    expect(cointegration?.term).toContain("Cointegration");
    expect(cointegration?.synopsis).toContain("Ornstein");

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
  it("extracts search terms, decomposes multi-topic questions into canonical branches, and synthesises grounded briefings", () => {
    expect(extractSearchTerms("What is the evidence on rapamycin for ovarian reserve after 40?")).toEqual([
      "rapamycin",
      "ovarian",
      "reserve",
      "40",
    ]);
    expect(suggestTopicTitle("what is the evidence on coq10 and prp for ivf?")).toBe("CoQ10 and PRP for IVF");
    expect(suggestTopicTitle("how does mond and quantised inertia explain wide binaries?")).toContain("MOND");

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
        id: "t-ovarian",
        parentId: "t-root",
        slug: "ovarian-reserve-oocyte-cryopreservation",
        title: "Ovarian Reserve & Oocyte Cryopreservation",
        brief: "Oocyte vitrification, follicular waves, oocyte maturity",
        depth: 1,
      },
      {
        id: "t-art",
        parentId: "t-root",
        slug: "assisted-reproductive-technology-gamete-donation",
        title: "Assisted Reproductive Technology & Gamete Donation",
        brief: "IVF, ICSI, embryo selection, blastocyst culture",
        depth: 1,
      },
      {
        id: "t-frontier",
        parentId: "t-root",
        slug: "translational-geroprotective-reproductive-biology",
        title: "Translational & Geroprotective Reproductive Biology",
        brief: "Rapamycin, IVG, MRT, PRP",
        depth: 1,
      },
      {
        id: "t-grav",
        parentId: null,
        slug: "modified-emergent-and-frontier-gravity-theories",
        title: "Modified, Emergent & Frontier Gravity Theories",
        brief: "MOND, Quantised Inertia, wide binaries, dark matter limits",
        depth: 2,
      },
      {
        id: "t-quant",
        parentId: null,
        slug: "quantitative-finance-stochastic-calculus-and-derivatives",
        title: "Quantitative Finance, Stochastic Calculus & Derivatives Pricing",
        brief: "Black-Scholes, Ito calculus, martingale pricing",
        depth: 2,
      },
      {
        id: "t-statarb",
        parentId: null,
        slug: "econometrics-financial-time-series-and-statistical-arbitrage",
        title: "Econometrics, Financial Time Series, Statistical Arbitrage & Alpha Research",
        brief: "GARCH, cointegration, Ornstein-Uhlenbeck",
        depth: 2,
      },
    ];

    const proposal = inferBranchProposal("rapamycin mtor follicular longevity", treeNodes);
    expect(proposal.parentId).toBe("t-frontier");
    expect(proposal.title).toBe("Rapamycin mTOR Follicular Longevity");

    const gravProposal = inferBranchProposal("quantised inertia mond wide binary stars", treeNodes);
    expect(gravProposal.parentId).toBe("t-grav");

    const quantProposal = inferBranchProposal("black scholes ito stochastic volatility", treeNodes);
    expect(quantProposal.parentId).toBe("t-quant");

    // Multi-topic decomposition: a single question about BB/AA, 1PN/2PN, oocytes, and embryos spawns 3 canonical branches
    const gradingBranches = inferBranchProposals(
      "BB/AA, 1PN/2PN -what grading methods are there for oocytes end embryos",
      treeNodes,
    );
    expect(gradingBranches).toHaveLength(3);
    expect(gradingBranches.map((b) => b.title)).toEqual([
      "Blastocyst Morphological Grading (Gardner AA/BB System) & Embryo Morphokinetics",
      "Zygote Pronuclear Scoring (2PN, 1PN, 0PN & 3PN) & Fertilisation Ploidy Assessment",
      "Oocyte Nuclear Maturity (MII/MI/GV) & Morphological Grading",
    ]);
    expect(gradingBranches[0]!.parentId).toBe("t-art");
    expect(gradingBranches[1]!.parentId).toBe("t-art");
    expect(gradingBranches[2]!.parentId).toBe("t-ovarian");
    for (const b of gradingBranches) {
      expect(b.title.toLowerCase()).not.toContain("what grading methods");
      expect(b.title.toLowerCase()).not.toContain("end embryos");
    }

    // Multi-topic decomposition in physics (MOND, Quantised Inertia, Dark Matter / Wide Binaries)
    const gravityBranches = inferBranchProposals(
      "How do MOND, Quantised Inertia, and dark matter compare in wide binary stars?",
      treeNodes,
    );
    expect(gravityBranches).toHaveLength(3);
    expect(gravityBranches.every((b) => b.parentId === "t-grav")).toBe(true);

    // General multi-clause decomposition outside pre-indexed canonical facets
    const compoundBranches = inferBranchProposals(
      "Black-Scholes option pricing vs GARCH volatility clustering",
      treeNodes,
    );
    expect(compoundBranches).toHaveLength(2);
    expect(compoundBranches[0]!.parentId).toBe("t-quant");
    expect(compoundBranches[1]!.parentId).toBe("t-statarb");

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
    expect(synthesis.suggestedBranches.length).toBeGreaterThanOrEqual(1);
  });
});

describe("encyclopaedic tree, cross-discipline links, and curated dossiers", () => {
  function collectSlugs(nodes: SeedNode[]): Set<string> {
    const out = new Set<string>();
    const walk = (list: SeedNode[]) => {
      for (const node of list) {
        out.add(node.slug);
        if (node.children) walk(node.children);
      }
    };
    walk(nodes);
    return out;
  }

  it("maps every dossier and cross-discipline link to a valid tree node and validates all references", () => {
    const treeSlugs = collectSlugs(ENCYCLOPAEDIC_TRUNKS);

    expect(Object.keys(PHYSICS_CLASSICAL_DOSSIERS)).toHaveLength(5);
    expect(Object.keys(PHYSICS_QUANTUM_DOSSIERS)).toHaveLength(5);
    expect(Object.keys(PHYSICS_GRAVITY_STRING_DOSSIERS)).toHaveLength(5);
    expect(Object.keys(PHYSICS_FRONTIER_GRAVITY_DOSSIERS)).toHaveLength(4);
    expect(Object.keys(MATH_SEED_DOSSIERS)).toHaveLength(7);
    expect(Object.keys(ECONOMICS_FINANCE_DOSSIERS)).toHaveLength(7);
    expect(Object.keys(ALL_SEED_DOSSIERS)).toHaveLength(43);

    for (const [slug, dossier] of Object.entries(ALL_SEED_DOSSIERS)) {
      expect(treeSlugs.has(slug), `dossier slug ${slug} must exist in ENCYCLOPAEDIC_TRUNKS`).toBe(true);
      expect(dossier.summary.length).toBeGreaterThan(80);
      expect(dossier.gaps.length).toBeGreaterThanOrEqual(1);
      expect((dossier.synthesis.benchmarks ?? []).length).toBeGreaterThanOrEqual(1);
      expect((dossier.synthesis.levers ?? []).length).toBeGreaterThanOrEqual(1);
      expect((dossier.synthesis.clinicalQuestions ?? []).length).toBeGreaterThanOrEqual(1);
      expect((dossier.synthesis.sweepQueue ?? []).length).toBeGreaterThanOrEqual(1);
      expect(dossier.sources.length).toBeGreaterThanOrEqual(1);
      expect(dossier.claims.length).toBeGreaterThanOrEqual(1);
      if (!(slug in PHYSICS_CLASSICAL_DOSSIERS || slug in PHYSICS_QUANTUM_DOSSIERS || slug in PHYSICS_GRAVITY_STRING_DOSSIERS || slug in PHYSICS_FRONTIER_GRAVITY_DOSSIERS || slug in MATH_SEED_DOSSIERS || slug in ECONOMICS_FINANCE_DOSSIERS)) {
        expect(dossier.milestones.length).toBeGreaterThanOrEqual(0);
      } else {
        expect(dossier.sources.length).toBeGreaterThanOrEqual(4);
        expect(dossier.claims.length).toBeGreaterThanOrEqual(4);
        expect(dossier.milestones.length).toBeGreaterThanOrEqual(4);
      }

      for (const claim of dossier.claims) {
        expect(claim.sourceIndexes.length).toBeGreaterThanOrEqual(1);
        for (const idx of claim.sourceIndexes) {
          expect(idx).toBeGreaterThanOrEqual(0);
          expect(idx).toBeLessThan(dossier.sources.length);
        }
      }
      for (const controversy of dossier.controversies) {
        expect(controversy.claimIndexes.length).toBeGreaterThanOrEqual(1);
        for (const idx of controversy.claimIndexes) {
          expect(idx).toBeGreaterThanOrEqual(0);
          expect(idx).toBeLessThan(dossier.claims.length);
        }
      }
      for (const milestone of dossier.milestones) {
        if (milestone.sourceIndex !== undefined) {
          expect(milestone.sourceIndex).toBeGreaterThanOrEqual(0);
          expect(milestone.sourceIndex).toBeLessThan(dossier.sources.length);
        }
      }
    }

    for (const link of CROSS_DISCIPLINE_LINKS) {
      expect(treeSlugs.has(link.slugA), `link slugA ${link.slugA} must exist in tree`).toBe(true);
      expect(treeSlugs.has(link.slugB), `link slugB ${link.slugB} must exist in tree`).toBe(true);
      expect(link.note.length).toBeGreaterThan(20);
    }

    // Verify visibility of ad-hoc dark matter parameters and GR breakdown on galaxy rotation & wide binary scales
    const grBreakdown = ALL_SEED_DOSSIERS["dark-matter-adhoc-epistemology-and-gr-breakdown-limits"]!;
    expect(grBreakdown.summary.toLowerCase()).toContain("ad-hoc");
    expect(grBreakdown.summary.toLowerCase()).toContain("wide binary");
    const mond = ALL_SEED_DOSSIERS["mond-modified-newtonian-dynamics-and-galactic-rotation"]!;
    expect(mond.summary).toContain("Milgrom");
    const qi = ALL_SEED_DOSSIERS["quantised-inertia-horizon-mechanics-and-unruh-radiation"]!;
    expect(qi.summary).toContain("Unruh");
  });
});


