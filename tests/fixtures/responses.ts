/** Trimmed API responses in the documented shapes of each source. */

export const europePmcResponse = {
  hitCount: 2,
  resultList: {
    result: [
      {
        id: "38000001",
        source: "MED",
        pmid: "38000001",
        doi: "10.1000/vitri.2024.1",
        title: "Cumulative live birth after <i>planned</i> oocyte vitrification: a meta-analysis",
        authorString: "Cobo A, Garcia-Velasco JA, Doyle JO.",
        pubYear: "2024",
        abstractText: "<h4>Background</h4>Age at freezing and number of mature oocytes predict live birth. Pooled n=5,200.",
        citedByCount: 41,
        journalInfo: { journal: { title: "Human Reproduction Update" } },
        pubTypeList: { pubType: ["Meta-Analysis", "Journal Article"] },
      },
      {
        id: "PPR900001",
        source: "PPR",
        title: "Short-course rapamycin before oocyte retrieval",
        authorString: "Li J.",
        pubYear: "2025",
        abstractText: "Randomised trial in 100 women with prior IVF failure.",
        pubTypeList: { pubType: ["Preprint"] },
      },
      { id: "x", source: "MED" },
    ],
  },
};

export const openAlexResponse = {
  results: [
    {
      id: "https://openalex.org/W4000000001",
      doi: "https://doi.org/10.1000/VITRI.2024.1",
      display_name: "Cumulative live birth after planned oocyte vitrification: a meta-analysis",
      publication_year: 2024,
      cited_by_count: 55,
      type: "review",
      abstract_inverted_index: { Age: [0], at: [1], freezing: [2], predicts: [3], "birth.": [5], live: [4] },
      primary_location: { landing_page_url: "https://example.org/a", source: { display_name: "Hum Reprod Update" } },
      authorships: [{ author: { display_name: "Ana Cobo" } }],
    },
    {
      id: "https://openalex.org/W4000000002",
      doi: null,
      display_name: "Uterine receptivity after 45",
      publication_year: 2023,
      cited_by_count: 3,
      type: "article",
      abstract_inverted_index: null,
      primary_location: { landing_page_url: "https://example.org/b", source: null },
      authorships: [],
    },
  ],
};

export const clinicalTrialsResponse = {
  studies: [
    {
      protocolSection: {
        identificationModule: { nctId: "NCT07000001", briefTitle: "Rapamycin Before IVF in Repeated Failure" },
        statusModule: { overallStatus: "RECRUITING", startDateStruct: { date: "2025-03" } },
        sponsorCollaboratorsModule: { leadSponsor: { name: "Nankai University" } },
        descriptionModule: { briefSummary: "Randomised, placebo-controlled." },
        conditionsModule: { conditions: ["Infertility"] },
        designModule: { studyType: "INTERVENTIONAL", phases: ["PHASE2"], enrollmentInfo: { count: 200 } },
        armsInterventionsModule: { interventions: [{ type: "DRUG", name: "Sirolimus" }] },
        contactsLocationsModule: { locations: [{ facility: "Tianjin Hospital", country: "China" }, { country: "China" }] },
      },
      hasResults: false,
    },
    { protocolSection: { identificationModule: {} } },
  ],
};
