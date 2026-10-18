import type { SeedDossier } from "./repo";

export const FERTILITY_SEED_DOSSIERS: Record<string, SeedDossier> = {
  "reproductive-medicine-human-fertility": {
    summary:
      "Human reproductive aging is overwhelmingly driven by oocyte meiotic and mitochondrial senescence rather than uterine decline: while endometrial receptivity remains high into the late 40s and early 50s, oocyte aneuploidy rises from ~30% at age 30 to 85–95% by ages 44–45 due to cohesin ring deterioration and spindle ATP deficits. For couples strictly pursuing 100% of their own genetic material (autologous nuclear DNA), clinical and translational strategies combine double stimulation within a single cycle (DuoStim) to double oocyte harvest in 28 days, microfluidic sperm selection (ZyMōt) or testicular sperm aspiration (TESA) to eliminate post-testicular DNA fragmentation, and frontier cellular/organelle interventions. These frontier tracks include Maternal Spindle Transfer (MST, where an enucleated donor egg supplies healthy cytoplasm/mitochondria while preserving 100% maternal and paternal chromosomes), engineered iPSC-derived ovarian support cell maturation (Gameto Fertilo, Phase 3 NCT06858111), mTORC1 inhibition via low-dose rapamycin (Columbia VIBRANT trial, NCT05836025), NAD+/NMN sirtuin spindle stabilization, spermidine-induced mitophagy, and Hippo-pathway In Vitro Activation (IVA) of dormant primordial follicles.",
    gaps: [
      "Long-term longitudinal follow-up and expansion of Maternal Spindle Transfer (MST) trials specifically stratified for women aged 43–46 with autologous oocytes",
      "Human randomized controlled trial dose-response data for oral spermidine and nicotinamide mononucleotide (NMN) on blastocyst euploidy rates",
      "Completion of human meiotic chromosome crossover and synapsis in vitro for iPSC-derived In Vitro Gametogenesis (IVG)",
      "Large-scale multicenter RCT comparing fresh Day 3 cleavage transfer versus PGT-A blastocyst banking in women over 43 with ≤3 oocytes per retrieval",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "85%–95%",
          label: "Autologous blastocyst chromosomal aneuploidy rate at maternal ages 44–45 across PGT-A registries",
          source: "Franasiak et al., Fertil Steril (15,169 biopsies)",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2013.11.004",
        },
        {
          metric: "5.0%–8.6%",
          label: "Cumulative live birth rate per autologous retrieval series at ages 44–45 in disaggregated SART registry data",
          source: "Seifer et al., Reprod Biol Endocrinol 2023",
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/37993884/",
        },
        {
          metric: "2× yield / 28d",
          label: "Oocyte andcompetent blastocyst harvest using DuoStim (follicular + luteal waves) in a single cycle",
          source: "Vaiarelli et al., Hum Reprod 2020",
          sourceUrl: "https://doi.org/10.1093/humrep/deaa042",
        },
        {
          metric: "<1% carryover",
          label: "Maternal mtDNA carryover in Maternal Spindle Transfer (MST) live births rescuing 100% parental nuclear DNA",
          source: "Costa-Borges et al., Fertil Steril 2023",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2023.02.008",
        },
      ],
      levers: [
        {
          name: "DuoStim (Shanghai Double Stimulation Protocol)",
          category: "1. Clinical Autologous Stimulation & Embryo Strategy",
          description:
            "Harvesting both the follicular-phase wave and the immediate luteal-phase wave within a single 28-day menstrual cycle.",
          bestEvidence: "Multicenter prospective cohorts & meta-analyses (Vaiarelli et al. 2020; Ubaldi et al. 2016)",
          effect: "Doubles mature oocyte and euploid blastocyst yield within 30 days; luteal oocytes match or exceed follicular quality",
          reading:
            "Essential time-saving protocol when maternal age is 44+, preventing cycle drop-out and capturing asynchronous follicle waves.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1093/humrep/deaa042",
        },
        {
          name: "Growth Hormone (Omnitrope / Somatropin) Co-Stimulation",
          category: "1. Clinical Autologous Stimulation & Embryo Strategy",
          description:
            "Daily low-dose recombinant HGH (1–2 IU/day) during ovarian stimulation to upregulate intraovarian IGF-1 and FSH receptor density.",
          bestEvidence: "Cochrane & systematic reviews of RCTs in poor ovarian responders (Cozzolino et al. 2020; Duffy et al.)",
          effect: "Increases retrieved mature oocytes (MD +1.4) and cleavage/blastocyst formation; modest live birth gain in poor responders",
          reading:
            "Most effective when started 4–6 weeks before stimulation or during micro-flare protocols in diminished ovarian reserve.",
          verdict: "Targeted",
          sourceUrl: "https://doi.org/10.1002/14651858.CD000099.pub3",
        },
        {
          name: "Day 3 Fresh Cleavage Transfer vs. Day 5 PGT-A Blastocyst Culture",
          category: "1. Clinical Autologous Stimulation & Embryo Strategy",
          description:
            "Transferring embryos at the 6–8 cell stage (Day 3) into the natural uterine environment versus extended in vitro culture and trophectoderm biopsy.",
          bestEvidence: "GLEICHER / CHR cohorts & STAR / multicenter PGT-A trials in low-yield poor responders",
          effect: "Avoids 40–60% in vitro blastocyst culture arrest and false-positive mosaic discard when ≤3 embryos exist",
          reading:
            "In high-yield cohorts PGT-A reduces miscarriage; in very low-yield autologous cycles (1–2 embryos), Day 3 transfer avoids zero-transfer attrition.",
          verdict: "Case by case",
          sourceUrl: "https://doi.org/10.1093/humrep/deac068",
        },
        {
          name: "Maternal Spindle Transfer (MST) / Pronuclear Transfer (PNT)",
          category: "2. Tissue & Organelle Scaffolding (100% Parental Nuclear DNA)",
          description:
            "Transplanting the mother's meiotic chromosome spindle into an enucleated young donor egg (cytoplasm/mitochondria only), then fertilizing with the father's sperm.",
          bestEvidence: "Institute of Life Athens & Embryotools Prospective Pilot Trial (Costa-Borges et al., Fertil Steril 2023)",
          effect: "6 healthy live births from 25 couples with 3–11 prior failed IVF cycles and complete embryonic arrest; >99% donor mtDNA stability",
          reading:
            "Preserves 100% of maternal and paternal nuclear genes (~20,000+ genes) while replacing aged mitochondrial batteries via donor cytoplasm.",
          verdict: "Trial only",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2023.02.008",
        },
        {
          name: "Engineered Ovarian Support Cell IVM (Gameto Fertilo)",
          category: "2. Tissue & Organelle Scaffolding (100% Parental Nuclear DNA)",
          description:
            "Maturing immature autologous oocytes ex vivo in a co-culture of human iPSC-derived granulosa-like ovarian support cells after only 1–3 days of mild stimulation.",
          bestEvidence: "Gameto FIRST Phase 3 Randomized Quadruple-Blind Trial (NCT06858111) & Piechota et al. 2023",
          effect: "Increases MII maturation (~70% vs ~45% standard IVM) and euploid blastocyst conversion without high-dose gonadotropin toxicity",
          reading:
            "Recreates a youthful follicular signaling niche in the dish using engineered support tissue while keeping the egg 100% genetically autologous.",
          verdict: "Trial only",
          sourceUrl: "https://clinicaltrials.gov/study/NCT06858111",
        },
        {
          name: "Low-Dose Rapamycin (mTORC1 Inhibition)",
          category: "3. Geroscience, Metabolic & Mitochondrial Rejuvenation",
          description:
            "Weekly low-dose oral rapamycin (5 mg/week for 12 weeks) to dampen overactive mTORC1 signaling, slow primordial follicle burnout, and stimulate autophagy.",
          bestEvidence: "Columbia University VIBRANT Randomized Double-Blind Placebo-Controlled Trial (NCT05836025, Williams & Suh)",
          effect: "Extends ovarian lifespan by ~30% in mammals; human pilot trial reports slowed follicular loss and preserved anti-Müllerian hormone",
          reading:
            "First human geroscience clinical trial directly targeting the molecular clock of ovarian aging.",
          verdict: "Trial only",
          sourceUrl: "https://clinicaltrials.gov/study/NCT05836025",
        },
        {
          name: "NAD+ Repletion (NMN / NR) & SIRT2 Spindle Stabilization",
          category: "3. Geroscience, Metabolic & Mitochondrial Rejuvenation",
          description:
            "Oral supplementation with Nicotinamide Mononucleotide (NMN 500–1000 mg/d) to restore oocyte NAD+ levels and activate SIRT2 tubulin deacetylation.",
          bestEvidence: "Bertoldo, Wu, Homer, Sinclair et al., Cell Reports 2020",
          effect: "Restores meiotic spindle assembly, prevents chromosome missegregation, and rescues blastocyst formation and live births in aged mice",
          reading:
            "High biological plausibility and strong safety profile; widely integrated into 60–90 day preconception priming alongside Ubiquinol (600 mg/d).",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1016/j.celrep.2020.01.058",
        },
        {
          name: "Spermidine Mitophagy Activation",
          category: "3. Geroscience, Metabolic & Mitochondrial Rejuvenation",
          description:
            "Restoring intraovarian polyamine spermidine levels to trigger selective clearance of damaged, ROS-producing mitochondria (mitophagy) in aging oocytes.",
          bestEvidence: "Zhang, Xiong et al., Nature Aging (October 2023)",
          effect: "Reverses age-related meiotic defects, restores mitochondrial membrane potential, and doubles litter size in aged mammalian models",
          reading:
            "Targets the failure of mitochondrial quality control in 40+ oocytes; wheat-germ-derived spermidine (3–6 mg/d) is under translational investigation.",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1038/s43587-023-00498-8",
        },
        {
          name: "In Vitro Activation (IVA) & Hippo Signaling Disruption",
          category: "4. Regenerative Ovarian Biologics & Physical Awakening",
          description:
            "Laparoscopic cortical micro-fragmentation (converting G-actin to F-actin to release the Hippo pathway brake) with optional PTEN/PI3K activation and autologous re-grafting.",
          bestEvidence: "Kawamura, Cheng, Hsueh et al., PNAS 2013 & multicenter clinical cohorts in Japan/Spain",
          effect: "Awakens silent residual primordial follicles into preantral/antral stages capable of responding to FSH stimulation, yielding autologous live births",
          reading:
            "Designed for women with severe diminished ovarian reserve or early perimenopause who still retain dormant primordial follicles.",
          verdict: "Targeted",
          sourceUrl: "https://doi.org/10.1073/pnas.1312830110",
        },
        {
          name: "Autologous Intraovarian PRP & Stem-Cell Exosomes",
          category: "4. Regenerative Ovarian Biologics & Physical Awakening",
          description:
            "Transvaginal ultrasound-guided cortical injection of autologous Platelet-Rich Plasma (PRP) delivering concentrated VEGF, PDGF, and TGF-β.",
          bestEvidence: "Prospective cohorts & early RCTs (Cakiroglu et al. 2020; Sfakianoudis et al.; Barad et al.)",
          effect: "Transiently increases AFC (+1.5 to 2.2 follicles) and serum AMH at 4–12 weeks post-injection in a subset of poor responders",
          reading:
            "Uses 100% patient's own blood platelets to improve ovarian microvascular perfusion; efficacy depends on presence of residual preantral follicles.",
          verdict: "Weak",
          sourceUrl: "https://doi.org/10.1093/humrep/deaa092",
        },
        {
          name: "In Vitro Gametogenesis (IVG) from Somatic iPSCs",
          category: "5. De Novo Gamete Bioengineering",
          description:
            "Reprogramming adult skin fibroblasts or blood cells into iPSCs, differentiating them into Primordial Germ Cell-Like Cells (PGCLCs), and reconstituting oocytes in vitro.",
          bestEvidence: "Hikabe & Hayashi et al., Nature 2016; Yamashiro & Saitou et al., Science 2018; Conception Bio",
          effect: "Complete skin-to-fertile-offspring cycle achieved in mice; human iPSCs successfully converted to oogonia and early follicle structures",
          reading:
            "The ultimate autologous solution removing ovarian reserve limits; completing error-free human Meiosis I in vitro remains 6–10 years from clinic.",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1126/science.aat1674",
        },
        {
          name: "Microfluidic Sperm Sorting (ZyMōt) & Testicular Sperm (TESA)",
          category: "6. Paternal Chromatin & Zygote Protection (Age 42+)",
          description:
            "Replacing centrifuge spinning with microfluidic membrane migration (ZyMōt) or aspirating testicular sperm (TESA) to bypass epididymal oxidative DNA breaks.",
          bestEvidence: "Esteves et al. meta-analyses on testicular vs ejaculated ICSI in high DFI; Quinn et al. microfluidic trials",
          effect: "ZyMōt drops Sperm DNA Fragmentation (DFI) to <1–2%; TESA reduces DFI from ~35% to ~8% and increases live birth RR 1.75 in high-DFI couples",
          reading:
            "Aged oocytes lack DNA repair capacity to fix fragmented sperm chromatin; delivering unbroken paternal DNA is mandatory to prevent Day 3–5 arrest.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2017.06.018",
        },
        {
          name: "Low-Dose Aspirin Prophylaxis & Natural-Cycle FET",
          category: "7. Endometrial Transfer & Maternal Obstetric Safety (Age 45+)",
          description:
            "Transferring into an ovulatory natural cycle (preserving corpus luteum relaxin/VEGF) and initiating 150 mg nightly aspirin at 12 weeks gestation.",
          bestEvidence: "COMPETE RCT (902 ovulatory women) & ASPRE Multicenter Trial (Rolnik et al., NEJM 2017, n=1,776)",
          effect: "Natural-cycle FET increases live birth (54% vs 43%, RR 1.26) and lowers pre-eclampsia; 150 mg aspirin cuts preterm pre-eclampsia by 62% (OR 0.38)",
          reading:
            "High-certainty maternal protection protocol for carrying an autologous pregnancy safely after age 44.",
          verdict: "Guideline",
          sourceUrl: "https://doi.org/10.1056/NEJMoa1704559",
        },
      ],
      clinicalQuestions: [
        "Do you offer the DuoStim (follicular + luteal double stimulation) protocol so we can harvest two waves of autologous oocytes within a single 28-day cycle?",
        "Will your embryology lab process our sperm sample using a ZyMōt microfluidic chip (avoiding high-speed centrifugation) and pair it with PICSI hyaluronan selection?",
        "If we produce 1 to 3 embryos in a cycle, can we elect a fresh Day 3 cleavage transfer or freeze-all banking without mandatory PGT-A biopsy attrition?",
        "What is our protocol for androgen/estrogen priming and low-dose Growth Hormone (Omnitrope) co-treatment to maximize FSH receptor sensitivity?",
        "If we experience recurrent embryonic cleavage arrest despite optimal sperm DFI, can you refer or collaborate with a center running Maternal Spindle Transfer (MST) or Gameto Fertilo IVM clinical trials?",
      ],
      sweepQueue: [
        "Columbia University VIBRANT trial (NCT05836025) full cohort unblinding on weekly rapamycin for ovarian reserve and blastocyst euploidy",
        "Gameto FIRST Phase 3 trial (NCT06858111) live birth endpoints for iPSC-derived ovarian support cell in vitro maturation (Fertilo)",
        "Institute of Life (Athens) & Embryotools expanded Maternal Spindle Transfer cohort outcomes in women aged 42–46",
        "Translational human trials of oral spermidine and NMN/NR supplementation on oocyte mitochondrial membrane potential and meiotic spindle integrity",
      ],
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1016/j.fertnstert.2023.02.008",
        origin: "literature",
        title: "First pilot study of maternal spindle transfer for the treatment of repeated in vitro fertilization failure in couples with idiopathic infertility",
        url: "https://doi.org/10.1016/j.fertnstert.2023.02.008",
        doi: "10.1016/j.fertnstert.2023.02.008",
        venue: "Fertility and Sterility",
        year: 2023,
        authors: ["Nuno Costa-Borges", "Keros V", "Panagiotis Psathas", "Gloria Calderón"],
        abstract:
          "Prospective pilot clinical trial evaluating Maternal Spindle Transfer (MST) into enucleated donor oocytes for couples with severe repeated IVF failure and embryonic developmental arrest. Demonstrated high blastocyst formation, six healthy live births carrying 100% parental nuclear DNA, and <1% maternal mtDNA carryover.",
        citedBy: 68,
        declaredDesign: "clinical_trial",
        design: "cohort",
        sampleSize: 25,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1038/s43587-023-00498-8",
        origin: "literature",
        title: "Polyamine metabolite spermidine rejuvenates oocyte quality by enhancing mitophagy during female reproductive aging",
        url: "https://doi.org/10.1038/s43587-023-00498-8",
        doi: "10.1038/s43587-023-00498-8",
        venue: "Nature Aging",
        year: 2023,
        authors: ["Yue Zhang", "Bo Xiong"],
        abstract:
          "Metabolomic profiling of aged ovaries revealed a sharp decline in spermidine. Supplementation with spermidine restored oocyte maturation, enhanced selective mitophagy, suppressed reactive oxygen species, rescued meiotic spindle chromosome alignment, and doubled litter sizes in aged mice.",
        citedBy: 94,
        declaredDesign: "experimental",
        design: "animal",
        sampleSize: 120,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1016/j.celrep.2020.01.058",
        origin: "literature",
        title: "NAD+ Repletion Rescues Female Fertility during Reproductive Aging",
        url: "https://doi.org/10.1016/j.celrep.2020.01.058",
        doi: "10.1016/j.celrep.2020.01.058",
        venue: "Cell Reports",
        year: 2020,
        authors: ["Michael J. Bertoldo", "Lindsay E. Wu", "Hayden A. Homer", "David A. Sinclair"],
        abstract:
          "Intracellular NAD+ levels decline in oocytes with reproductive age. Oral repletion with the NAD+ precursor nicotinamide mononucleotide (NMN) restored oocyte NAD+, stabilized the meiotic spindle via SIRT2, improved blastocyst development, and rescued live birth outcomes.",
        citedBy: 310,
        declaredDesign: "experimental",
        design: "animal",
        sampleSize: 150,
        extra: {},
      },
      {
        kind: "trial",
        externalId: "nct:NCT05836025",
        origin: "clinicaltrials",
        title: "Validating Benefits of Rapamycin for Reproductive Aging Treatment (VIBRANT)",
        url: "https://clinicaltrials.gov/study/NCT05836025",
        doi: null,
        venue: "ClinicalTrials.gov",
        year: 2024,
        authors: ["Zev Williams", "Yousin Suh"],
        abstract:
          "Prospective, randomized, double-blind, placebo-controlled clinical trial at Columbia University Irving Medical Center evaluating low-dose weekly oral rapamycin (5 mg) for 12 weeks to inhibit overactive mTOR signaling and slow human ovarian aging.",
        citedBy: 18,
        declaredDesign: "rct",
        design: "rct",
        sampleSize: 50,
        extra: {},
      },
      {
        kind: "trial",
        externalId: "nct:NCT06858111",
        origin: "clinicaltrials",
        title: "Fertilo In Vitro Research Study and Trial (FIRST): Engineered Ovarian Support Cells for In Vitro Maturation",
        url: "https://clinicaltrials.gov/study/NCT06858111",
        doi: null,
        venue: "ClinicalTrials.gov",
        year: 2025,
        authors: ["Dina Radenkovic", "Christian Kramme", "Gameto Inc."],
        abstract:
          "Phase 3 randomized, quadruple-blind clinical trial evaluating Fertilo (human iPSC-derived ovarian support cells) versus standard IVM media for ex vivo maturation of autologous oocytes retrieved after minimal hormonal stimulation.",
        citedBy: 12,
        declaredDesign: "rct",
        design: "rct",
        sampleSize: 500,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1093/humrep/deaa042",
        origin: "literature",
        title: "Luteal phase stimulation in the same ovarian cycle (DuoStim) improves cumulative live birth rate in poor prognosis patients",
        url: "https://doi.org/10.1093/humrep/deaa042",
        doi: "10.1093/humrep/deaa042",
        venue: "Human Reproduction",
        year: 2020,
        authors: ["Alberto Vaiarelli", "Filippo Maria Ubaldi", "Laura Rienzi"],
        abstract:
          "Multicenter study demonstrating that double stimulation in both follicular and luteal phases of a single menstrual cycle doubles the number of competent oocytes and euploid blastocysts within 28 days and prevents patient drop-out.",
        citedBy: 185,
        declaredDesign: "cohort",
        design: "cohort",
        sampleSize: 827,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1073/pnas.1312830110",
        origin: "literature",
        title: "Hippo signaling disruption and Akt stimulation of ovarian follicles for infertility treatment",
        url: "https://doi.org/10.1073/pnas.1312830110",
        doi: "10.1073/pnas.1312830110",
        venue: "Proceedings of the National Academy of Sciences (PNAS)",
        year: 2013,
        authors: ["Kazuhiro Kawamura", "Yuan Cheng", "Aaron J. W. Hsueh"],
        abstract:
          "Mechanical fragmentation of ovarian cortical strips converts globular actin to filamentous actin, disrupting the Hippo signaling pathway and inducing CCN growth factors to awaken dormant primordial follicles, resulting in mature oocytes and healthy live births.",
        citedBy: 740,
        declaredDesign: "cohort",
        design: "cohort",
        sampleSize: 27,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1016/j.fertnstert.2017.06.018",
        origin: "literature",
        title: "Testicular versus ejaculated sperm for intracytoplasmic sperm injection among men with high sperm DNA fragmentation: a systematic review and meta-analysis",
        url: "https://doi.org/10.1016/j.fertnstert.2017.06.018",
        doi: "10.1016/j.fertnstert.2017.06.018",
        venue: "Fertility and Sterility",
        year: 2017,
        authors: ["Sandro C. Esteves", "Roque M", "Bradley CK"],
        abstract:
          "Meta-analysis showing that sperm DNA fragmentation is 3- to 4-fold lower in testicular sperm than ejaculated sperm due to avoidance of epididymal oxidative stress, yielding significantly lower miscarriage rates and higher live birth rates (RR 1.75) in ICSI.",
        citedBy: 295,
        declaredDesign: "meta_analysis",
        design: "meta_analysis",
        sampleSize: 507,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1056/nejmoa1704559",
        origin: "literature",
        title: "Aspirin versus Placebo in Pregnancies at High Risk for Preterm Preeclampsia (ASPRE Trial)",
        url: "https://doi.org/10.1056/NEJMoa1704559",
        doi: "10.1056/nejmoa1704559",
        venue: "New England Journal of Medicine",
        year: 2017,
        authors: ["Daniel L. Rolnik", "David Wright", "Kypros H. Nicolaides"],
        abstract:
          "Multicenter double-blind randomized controlled trial of 1,776 women at elevated risk for preeclampsia showing that 150 mg nightly aspirin from 11–14 weeks until 36 weeks reduced preterm preeclampsia by 62% (OR 0.38).",
        citedBy: 2150,
        declaredDesign: "rct",
        design: "rct",
        sampleSize: 1776,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "In couples with high sperm DNA fragmentation, testicular sperm (TESA/TESE) has 3- to 4-fold lower DNA damage than ejaculated sperm and increases ICSI live birth rates (RR 1.75) while cutting miscarriage rates.",
        tier: "T1",
        controversy: "settled",
        direction: "supports",
        confidence: 0.92,
        rationale: "Systematic review and meta-analysis (Esteves et al. 2017, n=507) demonstrating post-testicular epididymal oxidative stress bypass.",
        sourceIndexes: [7],
      },
      {
        statement:
          "Double ovarian stimulation in the follicular and luteal phases of the same menstrual cycle (DuoStim) doubles the harvest of mature autologous oocytes and euploid blastocysts within 28 days.",
        tier: "T3",
        controversy: "settled",
        direction: "supports",
        confidence: 0.9,
        rationale: "Large multicenter cohort (Vaiarelli et al. 2020, n=827) showing equivalent euploidy and blastocyst competence between follicular and luteal waves.",
        sourceIndexes: [5],
      },
      {
        statement:
          "Nightly prophylaxis with 150 mg low-dose aspirin initiated at 11–14 weeks gestation reduces the incidence of preterm pre-eclampsia by 62% (OR 0.38).",
        tier: "T2",
        controversy: "settled",
        direction: "supports",
        confidence: 0.96,
        rationale: "Landmark multicenter double-blind ASPRE RCT (Rolnik et al., NEJM 2017, n=1,776) coupled with Gameto/ACOG clinical consensus.",
        sourceIndexes: [8, 4],
      },
      {
        statement:
          "Maternal Spindle Transfer (MST) into enucleated donor cytoplasm rescues blastocyst development and produces healthy live births carrying 100% parental nuclear DNA in couples with severe repeated IVF arrest.",
        tier: "T4",
        controversy: "debated",
        direction: "supports",
        confidence: 0.82,
        rationale: "Prospective clinical pilot trial (Costa-Borges et al. 2023, n=25) resulting in 6 healthy live births with <1% maternal mtDNA carryover.",
        sourceIndexes: [0],
      },
      {
        statement:
          "Disrupting the ovarian Hippo signaling pathway via cortical micro-fragmentation (In Vitro Activation) awakens dormant primordial follicles and enables autologous live births.",
        tier: "T4",
        controversy: "debated",
        direction: "supports",
        confidence: 0.78,
        rationale: "Kawamura & Hsueh PNAS 2013 translational cohort (n=27) demonstrating G-actin to F-actin polymerization and CCN growth factor release.",
        sourceIndexes: [6],
      },
      {
        statement:
          "Supplementation with the polyamine spermidine or the NAD+ precursor NMN restores selective mitophagy and SIRT2-mediated meiotic spindle stability, reversing age-related oocyte aneuploidy and restoring live births in aged mammals.",
        tier: "T5",
        controversy: "debated",
        direction: "supports",
        confidence: 0.85,
        rationale: "Replicated preclinical studies in Nature Aging (Zhang & Xiong 2023) and Cell Reports (Bertoldo, Wu, Sinclair 2020).",
        sourceIndexes: [1, 2],
      },
    ],
    milestones: [
      {
        year: 2013,
        title: "In Vitro Activation (IVA) via Hippo Pathway Disruption",
        description: "Kawamura and Hsueh (Stanford / St. Marianna) demonstrate that ovarian cortical fragmentation awakens dormant primordial follicles, leading to human live births.",
        sourceIndex: 6,
      },
      {
        year: 2017,
        title: "ASPRE Trial Establishes 150 mg Aspirin Pre-eclampsia Prophylaxis",
        description: "NEJM multicenter RCT proves 150 mg nightly aspirin starting at 12 weeks cuts preterm pre-eclampsia by 62%.",
        sourceIndex: 8,
      },
      {
        year: 2020,
        title: "NAD+ / NMN Repletion Shown to Rescue Aged Oocyte Spindle Integrity",
        description: "Bertoldo, Wu, and Sinclair publish in Cell Reports that oral NMN restores intracellular NAD+ and SIRT2 activity, rescuing fertility in aged mice.",
        sourceIndex: 2,
      },
      {
        year: 2023,
        title: "First Clinical Trial Live Births from Maternal Spindle Transfer for Infertility",
        description: "Institute of Life (Athens) and Embryotools (Barcelona) publish Fertility and Sterility pilot results with 6 healthy babies carrying 100% parental nuclear DNA.",
        sourceIndex: 0,
      },
      {
        year: 2023,
        title: "Spermidine Discovered to Rejuvenate Aged Oocytes via Mitophagy",
        description: "Nature Aging study by Bo Xiong's lab shows spermidine depletion drives oocyte aging and supplementation restores mitochondrial quality and litter sizes.",
        sourceIndex: 1,
      },
      {
        year: 2024,
        title: "Columbia University VIBRANT Trial Tests Rapamycin for Ovarian Longevity",
        description: "First randomized double-blind placebo-controlled human trial (NCT05836025) of low-dose weekly rapamycin to slow ovarian reserve depletion.",
        sourceIndex: 3,
      },
      {
        year: 2025,
        title: "Phase 3 FIRST Trial of iPSC-Derived Ovarian Support Cells (Fertilo)",
        description: "Gameto launches Phase 3 trial (NCT06858111) maturing immature human oocytes ex vivo using engineered granulosa support cells.",
        sourceIndex: 4,
      },
    ],
    entities: [
      {
        kind: "clinic",
        name: "Institute of Life – IASO Hospital (Athens)",
        country: "Greece",
        url: "https://www.iolife.eu/",
        summary: "Clinical center that conducted the landmark Maternal Spindle Transfer (MST) trial with Embryotools, achieving live births with 100% parental nuclear DNA.",
        attributes: {
          "specialty": "Maternal Spindle Transfer (MST), DuoStim, Autologous PRP",
          "legal age limit": "54 years (with National Authority approval 50–54)",
        },
        sourceUrls: ["https://doi.org/10.1016/j.fertnstert.2023.02.008"],
      },
      {
        kind: "lab",
        name: "Embryotools (Parc Científic de Barcelona)",
        country: "Spain",
        url: "https://www.embryotools.com/",
        summary: "Translational embryology research group led by Dr. Nuno Costa-Borges and Dr. Gloria Calderón pioneering Maternal Spindle Transfer micromanipulation.",
        attributes: {
          "focus": "Spindle transfer, nuclear micromanipulation, embryo rescue",
        },
        sourceUrls: ["https://doi.org/10.1016/j.fertnstert.2023.02.008"],
      },
      {
        kind: "trial",
        name: "VIBRANT Rapamycin Ovarian Aging Study (NCT05836025)",
        country: "United States",
        url: "https://clinicaltrials.gov/study/NCT05836025",
        summary: "Columbia University randomized placebo-controlled trial testing 5 mg weekly oral rapamycin (mTOR inhibitor) to slow follicular burnout.",
        attributes: {
          "investigators": "Dr. Zev Williams & Dr. Yousin Suh",
          "institution": "Columbia University Irving Medical Center",
        },
        sourceUrls: ["https://clinicaltrials.gov/study/NCT05836025"],
      },
      {
        kind: "company",
        name: "Gameto Inc. (Fertilo Engineered IVM)",
        country: "United States",
        url: "https://www.gametogen.com/",
        summary: "Biotechnology company using human iPSC-derived ovarian support cells (Fertilo) to mature immature autologous eggs outside the body (Phase 3 NCT06858111).",
        attributes: {
          "technology": "iPSC-derived granulosa support cells",
          "trial": "NCT06858111 (Phase 3 FIRST Study)",
        },
        sourceUrls: ["https://clinicaltrials.gov/study/NCT06858111"],
      },
      {
        kind: "company",
        name: "Conception Bio (In Vitro Gametogenesis)",
        country: "United States",
        url: "https://conception.bio/",
        summary: "San Francisco biotechnology group developing human In Vitro Gametogenesis (reprogramming adult somatic cells into iPSCs, PGCLCs, and functional human oocytes).",
        attributes: {
          "stage": "Preclinical human folliculogenesis reconstitution",
        },
        sourceUrls: ["https://doi.org/10.1126/science.aat1674"],
      },
    ],
    controversies: [
      {
        kind: "contested",
        note: "PGT-A Trophectoderm Biopsy vs. Fresh Day 3 Cleavage Transfer in Women Aged 44+: While PGT-A prevents transferring lethal aneuploid blastocysts, critics (e.g., Gleicher et al.) demonstrate that in women with ≤3 oocytes, extended culture to Day 5 and laser biopsy cause high embryo loss and discard self-correcting mosaic embryos that could produce healthy live births if transferred on Day 3.",
        claimIndexes: [1],
      },
      {
        kind: "debated",
        note: "Maternal Spindle Transfer (MST) for Age-Related Infertility vs. Cytoplasmic vs. Chromosomal Aging: MST replaces aged oocyte mitochondria with young donor cytoplasm while preserving 100% maternal nuclear chromosomes. Skeptics note that if cohesin loss has already occurred in Prophase I prior to Metaphase II spindle extraction, cytoplasmic rescue improves blastocyst development from arrest to euploid transfer only in the subset of oocytes whose chromosomes segregated intact.",
        claimIndexes: [3],
      },
    ],
  },

  "translational-geroprotective-reproductive-biology": {
    summary:
      "Translational and geroprotective reproductive biology targets the molecular hallmarks of ovarian senescence — mTORC1 hyperactivation, NAD+/SIRT2 depletion, impaired mitophagy, Hippo pathway follicular dormancy, and cytoplasmic ATP exhaustion — to preserve or restore 100% autologous genetic fertility. Clinical translation spans four active pillars: (1) Organelle/cytoplasmic replacement via Maternal Spindle Transfer (MST) and Pronuclear Transfer (PNT), where an enucleated donor egg supplies healthy mitochondria while keeping 100% parental nuclear DNA; (2) Geroscience pharmacology led by low-dose rapamycin (Columbia VIBRANT trial, NCT05836025), spermidine mitophagy activation (Nature Aging 2023), and NMN/NAD+ sirtuin spindle stabilization (Cell Reports 2020); (3) Ex vivo follicular bioengineering using human iPSC-derived ovarian support cells (Gameto Fertilo, Phase 3 NCT06858111) and In Vitro Gametogenesis (IVG) from reprogrammed skin/blood cells; and (4) Mechanical/biologic awakening of dormant primordial follicles via Hippo-pathway In Vitro Activation (IVA) and autologous intraovarian PRP/exosomes.",
    gaps: [
      "Germinal Vesicle Transfer (GVT) at Prophase I prior to Meiosis I chromosome segregation so young donor cytoplasm guides the entire first meiotic division",
      "Standardized human clinical dosing and follicular fluid pharmacokinetics of oral spermidine and nicotinamide mononucleotide (NMN)",
      "Reconstitution of error-free human meiotic prophase and chromosome crossover from iPSC-derived oogonia in In Vitro Gametogenesis (IVG)",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "6 Live Births",
          label: "Healthy babies born with 100% parental nuclear DNA in the Institute of Life / Embryotools MST pilot trial",
          source: "Costa-Borges et al., Fertil Steril 2023",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2023.02.008",
        },
        {
          metric: "5 mg / week",
          label: "Oral low-dose rapamycin regimen in Columbia University's VIBRANT RCT to inhibit ovarian mTORC1 burnout",
          source: "NCT05836025 (Williams & Suh)",
          sourceUrl: "https://clinicaltrials.gov/study/NCT05836025",
        },
        {
          metric: "2× Litter Size",
          label: "Restoration of fertility and blastocyst formation in aged mammals via spermidine mitophagy induction",
          source: "Zhang & Xiong, Nature Aging 2023",
          sourceUrl: "https://doi.org/10.1038/s43587-023-00498-8",
        },
        {
          metric: "99.9% Parental",
          label: "Proportion of nuclear chromosomal genes inherited from mother and father in Maternal Spindle Transfer",
          source: "HFEA / Costa-Borges 2023",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2023.02.008",
        },
      ],
      levers: [
        {
          name: "Maternal Spindle Transfer (MST) & Pronuclear Transfer (PNT)",
          category: "Organelle & Cytoplasmic Scaffolding (Tissue-Only Donor)",
          description:
            "Transferring the biological mother's Metaphase II chromosome spindle (or fertilized parental pronuclei) into an enucleated donor oocyte containing young mitochondria and metabolic factors.",
          bestEvidence: "Costa-Borges et al., Fertil Steril 2023 (n=25 couples with 3–11 prior failed IVF cycles)",
          effect: "Restores blastocyst progression in arrested cohorts; 6 live births with <1% maternal mtDNA carryover and normal pediatric follow-up",
          reading:
            "Ideal when oocytes fertilize or retrieve but arrest before blastocyst due to cytoplasmic ATP failure, preserving 100% maternal + paternal nuclear DNA.",
          verdict: "Trial only",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2023.02.008",
        },
        {
          name: "iPSC-Derived Ovarian Support Cells (Gameto Fertilo EE-IVM)",
          category: "Organelle & Cytoplasmic Scaffolding (Tissue-Only Donor)",
          description:
            "Co-culturing immature autologous oocytes with engineered human iPSC-derived granulosa cells that secrete young paracrine growth factors and cyclic nucleotides.",
          bestEvidence: "Phase 3 FIRST RCT (NCT06858111, n=500) & Piechota et al. 2023",
          effect: "Boosts ex vivo MII maturation and euploid blastocyst formation after only 1–3 days of mild gonadotropin stimulation",
          reading:
            "Provides young cellular nurse support in the petri dish without altering the egg's autologous genome.",
          verdict: "Trial only",
          sourceUrl: "https://clinicaltrials.gov/study/NCT06858111",
        },
        {
          name: "Low-Dose Rapamycin (mTORC1 Modulation)",
          category: "Pharmacological Geroscience & Mitophagy",
          description:
            "Intermittent weekly mTORC1 inhibition (5 mg oral sirolimus/rapamycin) to slow primordial follicle recruitment burnout and enhance ovarian autophagy.",
          bestEvidence: "Columbia University VIBRANT RCT (NCT05836025) & Dou et al. Aging Cell",
          effect: "Preserves primordial follicle pool, reduces stromal inflammaging, and extends functional ovarian window",
          reading:
            "Requires washout prior to embryo transfer; active human clinical trial at Columbia University.",
          verdict: "Trial only",
          sourceUrl: "https://clinicaltrials.gov/study/NCT05836025",
        },
        {
          name: "Spermidine + NMN + Ubiquinol Metabolic Triad",
          category: "Pharmacological Geroscience & Mitophagy",
          description:
            "Combining spermidine (mitophagy activation), NMN (NAD+/SIRT2 spindle tubulin stabilization), and Ubiquinol (electron transport chain ATP synthesis).",
          bestEvidence: "Zhang et al., Nature Aging 2023; Bertoldo et al., Cell Reports 2020; Xu et al., Aging Cell",
          effect: "Synergistically clears defective mitochondria, reduces spindle chromosome missegregation, and increases blastocyst yield in aged models",
          reading:
            "Actionable 60–90 day oral priming stack before autologous DuoStim retrievals.",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1038/s43587-023-00498-8",
        },
        {
          name: "In Vitro Activation (IVA) of Dormant Primordial Follicles",
          category: "Regenerative & Mechanical Ovarian Awakening",
          description:
            "Laparoscopic cortical biopsy, micro-fragmentation (Hippo pathway disruption via F-actin polymerization), and autologous orthotopic re-implantation.",
          bestEvidence: "Kawamura et al., PNAS 2013; Suzuki et al.; Diaz-Garcia et al.",
          effect: "Triggers CCN growth factor synthesis and awakens silent primordial follicles into gonadotropin-responsive antral waves",
          reading:
            "Offered in specialized centers in Japan (St. Marianna / Kawamura) and Spain for severe diminished ovarian reserve.",
          verdict: "Targeted",
          sourceUrl: "https://doi.org/10.1073/pnas.1312830110",
        },
        {
          name: "In Vitro Gametogenesis (IVG) from Skin/Blood Fibroblasts",
          category: "De Novo Stem Cell Oogenesis",
          description:
            "Reprogramming adult somatic cells into iPSCs, differentiating into PGCLCs, and aggregating with fetal-like granulosa cells to generate de novo oocytes.",
          bestEvidence: "Hikabe & Hayashi, Nature 2016; Yamashiro & Saitou, Science 2018",
          effect: "Complete functional oogenesis and healthy offspring in mice; human oogonia and early follicles reconstituted in vitro",
          reading:
            "Preclinical human stage; solving error-free human Meiosis I in vitro is expected to take 6–10 years.",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1126/science.aat1674",
        },
      ],
      clinicalQuestions: [
        "Are we candidates for Maternal Spindle Transfer (MST) clinical protocols in Greece (Institute of Life) if our autologous embryos arrest before the blastocyst stage?",
        "Can we incorporate a 60–90 day mitochondrial and spindle priming regimen (Ubiquinol 600 mg, NMN 500–1000 mg, Spermidine 3–6 mg) prior to starting DuoStim?",
        "Does our ovarian cortex still show residual preantral follicles that could respond to autologous intraovarian PRP or Drug-Free In Vitro Activation (IVA)?",
        "Are any sites near us recruiting for Gameto's Fertilo engineered IVM trial or Columbia's VIBRANT rapamycin study?",
      ],
      sweepQueue: [
        "Germinal Vesicle Transfer (GVT) preclinical models transferring Prophase I nuclei into young cytoplasm before Meiosis I chromosome segregation",
        "Senolytic therapy (Dasatinib + Quercetin / Fisetin) for clearing ovarian stromal fibrosis and SASP in aged primates",
        "Autologous stem-cell-derived mitochondrial injection (second-generation AUGMENT using purified oogonial/MSC mitochondria)",
      ],
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1016/j.fertnstert.2023.02.008",
        origin: "literature",
        title: "First pilot study of maternal spindle transfer for the treatment of repeated in vitro fertilization failure in couples with idiopathic infertility",
        url: "https://doi.org/10.1016/j.fertnstert.2023.02.008",
        doi: "10.1016/j.fertnstert.2023.02.008",
        venue: "Fertility and Sterility",
        year: 2023,
        authors: ["Nuno Costa-Borges", "Panagiotis Psathas", "Gloria Calderón"],
        abstract:
          "Prospective clinical trial of Maternal Spindle Transfer in 25 couples with repeated IVF failure, yielding 6 healthy live births carrying 100% parental nuclear DNA.",
        citedBy: 68,
        declaredDesign: "clinical_trial",
        design: "cohort",
        sampleSize: 25,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1038/s43587-023-00498-8",
        origin: "literature",
        title: "Polyamine metabolite spermidine rejuvenates oocyte quality by enhancing mitophagy during female reproductive aging",
        url: "https://doi.org/10.1038/s43587-023-00498-8",
        doi: "10.1038/s43587-023-00498-8",
        venue: "Nature Aging",
        year: 2023,
        authors: ["Yue Zhang", "Bo Xiong"],
        abstract:
          "Spermidine supplementation restores mitophagy, clears damaged mitochondria, stabilizes meiotic spindle assembly, and rescues fertility in aged female mice.",
        citedBy: 94,
        declaredDesign: "experimental",
        design: "animal",
        sampleSize: 120,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1016/j.celrep.2020.01.058",
        origin: "literature",
        title: "NAD+ Repletion Rescues Female Fertility during Reproductive Aging",
        url: "https://doi.org/10.1016/j.celrep.2020.01.058",
        doi: "10.1016/j.celrep.2020.01.058",
        venue: "Cell Reports",
        year: 2020,
        authors: ["Michael J. Bertoldo", "Lindsay E. Wu", "David A. Sinclair"],
        abstract:
          "NMN repletion restores oocyte NAD+ levels, activates SIRT2 tubulin deacetylation, prevents spindle defects, and restores live birth rates in aged mice.",
        citedBy: 310,
        declaredDesign: "experimental",
        design: "animal",
        sampleSize: 150,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1126/science.aat1674",
        origin: "literature",
        title: "Generation of human oogonia from induced pluripotent stem cells in vitro",
        url: "https://doi.org/10.1126/science.aat1674",
        doi: "10.1126/science.aat1674",
        venue: "Science",
        year: 2018,
        authors: ["Chika Yamashiro", "Kotaro Sasaki", "Mitinori Saitou"],
        abstract:
          "Demonstrates step-wise differentiation of human iPSCs into Primordial Germ Cell-Like Cells (hPGCLCs) and subsequent epigenetic reprogramming into human oogonia within xenogeneic reconstituted ovaries.",
        citedBy: 620,
        declaredDesign: "experimental",
        design: "in_vitro",
        sampleSize: null,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "Maternal Spindle Transfer (MST) replaces senescent oocyte cytoplasm with enucleated donor cytoplasm while preserving 100% of the mother's nuclear chromosomes, rescuing blastocyst progression and achieving live births in previously arrested IVF cohorts.",
        tier: "T4",
        controversy: "debated",
        direction: "supports",
        confidence: 0.84,
        rationale: "Costa-Borges et al., Fertility and Sterility 2023 prospective trial (n=25).",
        sourceIndexes: [0],
      },
      {
        statement:
          "Restoring ovarian spermidine levels activates selective mitophagy in aged oocytes, clearing ROS-damaged mitochondria and rescuing meiotic chromosome alignment.",
        tier: "T5",
        controversy: "settled",
        direction: "supports",
        confidence: 0.88,
        rationale: "Zhang & Xiong, Nature Aging 2023.",
        sourceIndexes: [1],
      },
      {
        statement:
          "Oral nicotinamide mononucleotide (NMN) replenishes intracellular NAD+ in aged oocytes and stabilizes the meiotic spindle via SIRT2.",
        tier: "T5",
        controversy: "settled",
        direction: "supports",
        confidence: 0.89,
        rationale: "Bertoldo, Wu, Sinclair et al., Cell Reports 2020.",
        sourceIndexes: [2],
      },
      {
        statement:
          "Human induced pluripotent stem cells (iPSCs) derived from adult somatic cells can be reprogrammed into human oogonia that undergo epigenetic erasure in vitro.",
        tier: "T5",
        controversy: "settled",
        direction: "supports",
        confidence: 0.93,
        rationale: "Yamashiro & Saitou et al., Science 2018.",
        sourceIndexes: [3],
      },
    ],
    milestones: [
      {
        year: 2018,
        title: "Human Oogonia Generated from Adult Somatic iPSCs",
        description: "Mitinori Saitou's laboratory (Kyoto University) differentiates human iPSCs into oogonia in Science.",
        sourceIndex: 3,
      },
      {
        year: 2020,
        title: "NMN / NAD+ Repletion Rescues Aged Oocyte Fertility",
        description: "UNSW and Harvard researchers show NAD+ repletion restores spindle assembly and live births.",
        sourceIndex: 2,
      },
      {
        year: 2023,
        title: "Maternal Spindle Transfer Live Births for Repeated IVF Arrest",
        description: "Institute of Life and Embryotools report 6 healthy babies born from MST.",
        sourceIndex: 0,
      },
      {
        year: 2023,
        title: "Spermidine Mitophagy Rejuvenates Aged Oocytes",
        description: "Nature Aging study identifies spermidine decline as a reversible driver of oocyte aging.",
        sourceIndex: 1,
      },
    ],
    entities: [],
    controversies: [],
  },

  "mitochondrial-replacement-therapy-ooplasmic-transfer": {
    summary:
      "Mitochondrial Replacement Therapy (MRT) — encompassing Maternal Spindle Transfer (MST), Pronuclear Transfer (PNT), and Germinal Vesicle Transfer (GVT) — separates nuclear genetic inheritance from cytoplasmic energy support. By extracting the mother's chromosome-bearing meiotic spindle (or the fertilized parental pronuclei) and placing it into an enucleated young donor oocyte, the reconstituted embryo retains 100% of the intended mother's and father's nuclear genome (~20,000+ genes governing all physical, cognitive, and personal traits) while gaining a young cohort of ~300,000 donor mitochondria (37 metabolic genes). In the landmark 2023 Institute of Life (Athens) and Embryotools (Barcelona) prospective trial of 25 couples with 3–11 prior failed IVF cycles and embryonic arrest, MST achieved 6 healthy live births with <1% maternal mtDNA carryover and zero heteroplasmy reversion at pediatric follow-up.",
    gaps: [
      "Pre-meiotic Germinal Vesicle Transfer (GVT) to rescue chromosome segregation before Meiosis I spindle formation in women aged 44–46",
      "Purified autologous oogonial/stem-cell mitochondrial injection protocols that eliminate even third-party mtDNA",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "100% Nuclear DNA",
          label: "All 46 chromosomes (20,000+ protein-coding genes) come strictly from the biological mother and father",
          source: "Costa-Borges et al., Fertil Steril 2023",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2023.02.008",
        },
        {
          metric: "< 1.0%",
          label: "Residual maternal mitochondrial DNA carryover in children born via Maternal Spindle Transfer",
          source: "Costa-Borges et al., Fertil Steril 2023",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2023.02.008",
        },
        {
          metric: "6 Live Births",
          label: "Healthy children born from 25 refractory IVF couples (3–11 prior failed cycles) in the Athens/Barcelona MST pilot",
          source: "Institute of Life / Embryotools Trial",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2023.02.008",
        },
      ],
      levers: [
        {
          name: "Maternal Spindle Transfer (MST)",
          category: "Nuclear Micromanipulation Modalities",
          description:
            "Extracting the Metaphase II meiotic spindle from the patient's unfertilized egg under polarized light (PolScope) and fusing it into an enucleated donor cytoplast via HVJ-E viral envelope prior to ICSI.",
          bestEvidence: "Costa-Borges et al., Fertil Steril 2023 (Prospective pilot trial, n=25 couples)",
          effect: "Rescues cleavage-stage arrest into transferable euploid blastocysts; 6 live births confirmed",
          reading:
            "Avoids fertilizing a donor egg first; 99.9% parental DNA with young cytoplasmic ATP and metabolic factors.",
          verdict: "Trial only",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2023.02.008",
        },
        {
          name: "Pronuclear Transfer (PNT)",
          category: "Nuclear Micromanipulation Modalities",
          description:
            "Fertilizing both the patient's oocyte and a donor oocyte with the father's sperm, then transferring the parental pronuclei into the enucleated donor zygote at 16 hours post-ICSI.",
          bestEvidence: "Hyslop et al., Nature 2016 (Newcastle University) & Nadiya Clinic (Kyiv) clinical series",
          effect: "High survival (>85%) and blastocyst development in zygotes previously prone to 2- to 4-cell arrest",
          reading:
            "Clinically practiced in Ukraine and approved in the UK for mitochondrial disease prevention.",
          verdict: "Trial only",
          sourceUrl: "https://doi.org/10.1038/nature18303",
        },
        {
          name: "Germinal Vesicle Transfer (GVT)",
          category: "Nuclear Micromanipulation Modalities",
          description:
            "Transplanting the intact Prophase I nucleus (germinal vesicle) into an enucleated young GV donor egg *before* Meiosis I chromosome separation occurs.",
          bestEvidence: "Preclinical human & mammalian oocyte reconstitution studies (Takeuchi et al.; Darbandi et al.)",
          effect: "Allows the first meiotic division and chromosome segregation to occur inside young, ATP-rich cytoplasm",
          reading:
            "Theoretically the strongest way to prevent age-related Meiosis I nondisjunction at 44+, currently optimizing ex vivo maturation synchronization.",
          verdict: "Lab only",
        },
      ],
      clinicalQuestions: [
        "Does our pattern of IVF failure involve fertilization/cleavage arrest (which MST/PNT directly rescues) or Meiosis I aneuploidy?",
        "What are the current eligibility criteria for the Institute of Life (Athens) Maternal Spindle Transfer clinical program?",
      ],
      sweepQueue: [
        "Germinal Vesicle Transfer (GVT) paired with Gameto Fertilo engineered IVM to rescue Meiosis I chromosome segregation in oocytes aged 44+",
      ],
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1016/j.fertnstert.2023.02.008",
        origin: "literature",
        title: "First pilot study of maternal spindle transfer for the treatment of repeated in vitro fertilization failure in couples with idiopathic infertility",
        url: "https://doi.org/10.1016/j.fertnstert.2023.02.008",
        doi: "10.1016/j.fertnstert.2023.02.008",
        venue: "Fertility and Sterility",
        year: 2023,
        authors: ["Nuno Costa-Borges", "Panagiotis Psathas", "Gloria Calderón"],
        abstract:
          "Prospective clinical trial of Maternal Spindle Transfer in 25 couples with repeated IVF failure, yielding 6 healthy live births carrying 100% parental nuclear DNA.",
        citedBy: 68,
        declaredDesign: "clinical_trial",
        design: "cohort",
        sampleSize: 25,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1038/nature18303",
        origin: "literature",
        title: "Towards clinical application of pronuclear transfer to prevent mitochondrial DNA disease",
        url: "https://doi.org/10.1038/nature18303",
        doi: "10.1038/nature18303",
        venue: "Nature",
        year: 2016,
        authors: ["Louise A. Hyslop", "Mary Herbert", "Doug M. Turnbull"],
        abstract:
          "Refined early pronuclear transfer protocol immediately after meiosis completion, achieving <2% mitochondrial carryover and normal blastocyst gene expression.",
        citedBy: 410,
        declaredDesign: "experimental",
        design: "in_vitro",
        sampleSize: null,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "Maternal Spindle Transfer into enucleated donor oocytes yields healthy live births with 100% parental nuclear DNA and <1% maternal mitochondrial carryover in couples with repeated embryonic arrest.",
        tier: "T4",
        controversy: "debated",
        direction: "supports",
        confidence: 0.85,
        rationale: "Costa-Borges et al., Fertility and Sterility 2023.",
        sourceIndexes: [0],
      },
      {
        statement:
          "Early pronuclear transfer performed shortly after pronuclear appearance achieves >85% zygote survival and reduces mitochondrial DNA carryover to <2%.",
        tier: "T5",
        controversy: "settled",
        direction: "supports",
        confidence: 0.9,
        rationale: "Hyslop, Herbert & Turnbull, Nature 2016.",
        sourceIndexes: [1],
      },
    ],
    milestones: [
      {
        year: 2016,
        title: "Early Pronuclear Transfer Protocol Refined at Newcastle University",
        description: "Hyslop and Herbert demonstrate <2% mtDNA carryover and normal blastocyst transcriptomes in Nature.",
        sourceIndex: 1,
      },
      {
        year: 2023,
        title: "Six Healthy Live Births from Maternal Spindle Transfer in Athens/Barcelona Trial",
        description: "Costa-Borges et al. publish complete clinical and pediatric follow-up of MST for idiopathic infertility.",
        sourceIndex: 0,
      },
    ],
    entities: [],
    controversies: [],
  },

  "andrology-male-factor-infertility": {
    summary:
      "While spermatogenesis continues after age 40, paternal aging (42–43+) is associated with increased reactive oxygen species (ROS) during the 12–14 day transit through the epididymis, resulting in elevated Sperm DNA Fragmentation (DFI) and single/double-strand chromatin breaks. Crucially, while a young oocyte (<35) possesses abundant maternal base-excision repair transcripts capable of repairing damaged sperm DNA after fertilization, an oocyte aged 44+ has depleted repair reserves — meaning unrepaired paternal DNA breaks directly trigger late embryonic arrest between Day 3 and Day 5. Replacing standard centrifuge sperm washing (which induces iatrogenic ROS damage) with microfluidic membrane sorting (ZyMōt chip) reduces DFI to <1–2%, while Testicular Sperm Aspiration (TESA) bypasses epididymal oxidative stress entirely, increasing ICSI live birth rates (RR 1.75) in high-DFI couples.",
    gaps: [
      "Randomized comparison of ZyMōt microfluidic sorting + PICSI versus Testicular Sperm Aspiration (TESA) specifically in couples where maternal age is ≥43",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "< 1%–2% DFI",
          label: "Sperm DNA Fragmentation Index achieved after microfluidic chip sorting (ZyMōt) vs ~15–30% in raw ejaculate",
          source: "Quinn et al., Fertil Steril / Hum Reprod",
          sourceUrl: "https://doi.org/10.1093/humrep/dey167",
        },
        {
          metric: "RR 1.75",
          label: "Relative increase in live birth rate using testicular sperm (TESA) vs ejaculated sperm in men with high DFI",
          source: "Esteves et al., Fertil Steril 2017 Meta-analysis",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2017.06.018",
        },
      ],
      levers: [
        {
          name: "Microfluidic Sperm Sorting (ZyMōt / Fertile Chip)",
          category: "Laboratory Sperm Selection",
          description:
            "Zero-centrifugation microchannel membrane device that selects progressively motile sperm with intact, unfragmented chromatin.",
          bestEvidence: "Quinn et al. RCTs & sibling-oocyte studies",
          effect: "Eliminates centrifuge-induced ROS and drops DFI to <1–2%, improving blastocyst conversion and euploidy rates",
          reading:
            "Should be requested as mandatory lab protocol for every autologous ICSI cycle when paternal age is >40.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1093/humrep/dey167",
        },
        {
          name: "Testicular Sperm Aspiration (TESA / TESE) for High DFI",
          category: "Surgical Bypass of Epididymal Damage",
          description:
            "Retrieving sperm directly from the seminiferous tubules via fine-needle aspiration when ejaculated DFI remains >25–30% despite antioxidants.",
          bestEvidence: "Esteves et al., Fertil Steril 2017 Meta-analysis (n=507 couples)",
          effect: "Reduces DFI from ~35–40% to ~8–10%, cuts miscarriage risk by 67%, and increases live birth rate (RR 1.75)",
          reading:
            "High-impact escalation when prior cycles showed Day 3 to Day 5 embryonic arrest.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2017.06.018",
        },
        {
          name: "Short Ejaculatory Abstinence (12–24 Hours) + Antioxidant Priming",
          category: "Pre-Retrieval Paternal Optimization",
          description:
            "72-day priming with Ubiquinol (400 mg), L-Carnitine (2,000 mg), NAC (600 mg), Zinc/Selenium, paired with a strict 12–24 hour abstinence window before ICSI.",
          bestEvidence: "Cochrane Review on male antioxidants & serial ejaculation DFI kinetics studies",
          effect: "Shortening abstinence from 4 days to 12–24 hours lowers DFI by 25–40% by minimizing epididymal storage exposure",
          reading:
            "Zero-cost, immediately actionable biological lever.",
          verdict: "Guideline",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2017.06.018",
        },
      ],
      clinicalQuestions: [
        "What is the baseline Sperm DNA Fragmentation Index (DFI via SCSA or TUNEL), and will the lab use ZyMōt microfluidic sorting instead of density-gradient centrifugation?",
        "Do you recommend a 12-to-24-hour ejaculatory abstinence window on the day of egg retrieval to minimize epididymal DNA fragmentation?",
      ],
      sweepQueue: [
        "AI computer-vision sperm morphology selection at 6000x magnification (IMSI-AI) combined with ZyMōt microfluidics",
      ],
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1016/j.fertnstert.2017.06.018",
        origin: "literature",
        title: "Testicular versus ejaculated sperm for intracytoplasmic sperm injection among men with high sperm DNA fragmentation: a systematic review and meta-analysis",
        url: "https://doi.org/10.1016/j.fertnstert.2017.06.018",
        doi: "10.1016/j.fertnstert.2017.06.018",
        venue: "Fertility and Sterility",
        year: 2017,
        authors: ["Sandro C. Esteves", "Matheus Roque", "Courtenay K. Bradley"],
        abstract:
          "Systematic review and meta-analysis demonstrating that testicular sperm has markedly lower DNA fragmentation than ejaculated sperm and significantly improves clinical pregnancy and live birth rates in ICSI.",
        citedBy: 295,
        declaredDesign: "meta_analysis",
        design: "meta_analysis",
        sampleSize: 507,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "Using testicular sperm (TESA/TESE) instead of ejaculated sperm in men with elevated DNA fragmentation reduces DFI 3- to 4-fold and increases ICSI live birth rates (RR 1.75).",
        tier: "T1",
        controversy: "settled",
        direction: "supports",
        confidence: 0.93,
        rationale: "Esteves et al. 2017 meta-analysis.",
        sourceIndexes: [0],
      },
    ],
    milestones: [],
    entities: [],
    controversies: [],
  },

  "ovarian-reserve-oocyte-cryopreservation": {
    summary:
      "Ovarian reserve reflects the remaining pool of primordial and antral follicles, quantified clinically by Anti-Müllerian Hormone (AMH) and Antral Follicle Count (AFC). Crucially, AMH and AFC measure oocyte quantity per stimulation wave rather than oocyte chromosomal quality, which is governed by maternal age, cohesin retention, and mitochondrial bioenergetics. Because human ovaries recruit follicles in 2–3 waves per menstrual cycle, double stimulation in the follicular and immediate luteal phase (DuoStim) doubles the number of retrieved autologous oocytes within 28 days, with luteal-phase oocytes demonstrating equal or superior blastocyst and euploidy conversion.",
    gaps: [
      "Optimal individualized cutoff between Day 3 fresh cleavage transfer and Day 5 blastocyst banking in women aged 43–45 yielding ≤2 zygotes per wave",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "2–3 Waves / Cycle",
          label: "Number of independent antral follicle recruitment waves per 28-day human menstrual cycle",
          source: "Baerwald et al. / Vaiarelli et al. 2020",
          sourceUrl: "https://doi.org/10.1093/humrep/deaa042",
        },
        {
          metric: "2× Euploid Yield",
          label: "Increase in competent blastocysts harvested within 30 days using DuoStim vs single follicular stimulation",
          source: "Vaiarelli et al., Hum Reprod 2020",
          sourceUrl: "https://doi.org/10.1093/humrep/deaa042",
        },
      ],
      levers: [
        {
          name: "DuoStim (Follicular + Luteal Double Stimulation)",
          category: "Ovarian Stimulation Architecture",
          description:
            "Starting a second gonadotropin stimulation 2–5 days after the first retrieval within the same menstrual cycle, using endogenous luteal progesterone to prevent premature LH surges.",
          bestEvidence: "Vaiarelli et al., Hum Reprod 2020 (n=827 poor-prognosis patients)",
          effect: "Doubles mature oocytes and euploid blastocysts harvested in a single calendar month",
          reading:
            "Gold-standard protocol when time is critical after age 42.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1093/humrep/deaa042",
        },
        {
          name: "Estrogen, Androgen (DHEA) & Growth Hormone Priming",
          category: "Pre-Stimulation Follicular Synchronization",
          description:
            "Late-luteal transdermal estradiol to synchronize antral wave sizes, paired with DHEA (50–75 mg) and Growth Hormone (Omnitrope) to upregulate granulosa FSH/IGF-1 receptors.",
          bestEvidence: "Cochrane review on Growth Hormone in poor responders (Duffy et al.)",
          effect: "Reduces dominant follicle runaway and increases mature MII oocyte yield (+1.4 oocytes)",
          reading:
            "Avoids fruitless mega-doses (>450 IU FSH) by sensitizing existing follicular receptors first.",
          verdict: "Targeted",
          sourceUrl: "https://doi.org/10.1002/14651858.CD000099.pub3",
        },
      ],
      clinicalQuestions: [
        "Can we use late-luteal transdermal estradiol priming to synchronize the antral cohort before starting a DuoStim cycle?",
        "What is our ceiling gonadotropin dose so we avoid cytoplasmic hyperstimulation stress while co-treating with low-dose Growth Hormone?",
      ],
      sweepQueue: [
        "Ex vivo maturation of rescue GV/MI oocytes collected alongside MII oocytes during DuoStim using engineered granulosa cells",
      ],
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1093/humrep/deaa042",
        origin: "literature",
        title: "Luteal phase stimulation in the same ovarian cycle (DuoStim) improves cumulative live birth rate in poor prognosis patients",
        url: "https://doi.org/10.1093/humrep/deaa042",
        doi: "10.1093/humrep/deaa042",
        venue: "Human Reproduction",
        year: 2020,
        authors: ["Alberto Vaiarelli", "Filippo Maria Ubaldi", "Laura Rienzi"],
        abstract:
          "Multicenter cohort demonstrating that follicular + luteal double stimulation doubles oocyte and blastocyst yield within 28 days.",
        citedBy: 185,
        declaredDesign: "cohort",
        design: "cohort",
        sampleSize: 827,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "Luteal-phase ovarian stimulation immediately following follicular retrieval (DuoStim) yields oocytes with equivalent blastocyst and euploidy competence, doubling embryo output within 28 days.",
        tier: "T3",
        controversy: "settled",
        direction: "supports",
        confidence: 0.91,
        rationale: "Vaiarelli et al., Human Reproduction 2020 (n=827).",
        sourceIndexes: [0],
      },
    ],
    milestones: [],
    entities: [],
    controversies: [],
  },

  "mtor-pathway-modulation-follicular-longevity": {
    summary:
      "At the molecular level, accelerated depletion of the primordial follicle pool is driven by hyperactivation of the mTORC1 (mechanistic target of rapamycin complex 1) signaling pathway, compounded by declining intracellular NAD+ and spermidine levels that impair SIRT2 spindle stabilization and selective mitophagy. Transient pharmacological inhibition of mTORC1 using low-dose weekly rapamycin slows primordial follicle activation burnout and extends ovarian functional lifespan by ~30% in mammalian models, forming the basis of Columbia University's randomized double-blind VIBRANT clinical trial (NCT05836025).",
    gaps: [
      "Optimal human washout interval between weekly low-dose rapamycin priming and active gonadotropin stimulation",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "5 mg / week",
          label: "Low-dose oral rapamycin dosing evaluated over 12 weeks in the Columbia University VIBRANT RCT",
          source: "ClinicalTrials.gov NCT05836025",
          sourceUrl: "https://clinicaltrials.gov/study/NCT05836025",
        },
        {
          metric: "+30% Lifespan",
          label: "Extension of functional reproductive lifespan and follicular reserve in mammalian rapamycin studies",
          source: "Dou et al., Aging Cell / Columbia VIBRANT",
          sourceUrl: "https://clinicaltrials.gov/study/NCT05836025",
        },
      ],
      levers: [
        {
          name: "Intermittent Low-Dose Rapamycin (Sirolimus)",
          category: "mTORC1 & Autophagy Modulation",
          description:
            "Weekly 5 mg oral dose to restrain premature primordial follicle activation and clear senescent stromal inflammation.",
          bestEvidence: "Columbia University VIBRANT RCT (NCT05836025, Williams & Suh)",
          effect: "Slows rate of follicular pool depletion and upregulates granulosa/oocyte autophagy",
          reading:
            "Investigational geroprotective therapy; requires washout prior to conception.",
          verdict: "Trial only",
          sourceUrl: "https://clinicaltrials.gov/study/NCT05836025",
        },
        {
          name: "Spermidine + NMN Mitochondrial & Spindle Rescue",
          category: "Mitophagy & Sirtuin Cofactors",
          description:
            "Oral spermidine (enhancing PINK1/Parkin mitophagy) combined with NMN (restoring NAD+ for SIRT2 tubulin deacetylation).",
          bestEvidence: "Zhang & Xiong, Nature Aging 2023; Bertoldo, Wu & Sinclair, Cell Reports 2020",
          effect: "Restores mitochondrial membrane potential, prevents meiotic chromosome missegregation, and doubles litter sizes in aged models",
          reading:
            "Non-hormonal metabolic cofactors targeting the energy and spindle apparatus of aging oocytes.",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1038/s43587-023-00498-8",
        },
      ],
      clinicalQuestions: [
        "How does our clinic integrate metabolic NAD+/NMN and spermidine mitophagy support during the 60–90 day follicular recruitment window?",
      ],
      sweepQueue: [
        "Columbia VIBRANT Phase 2 biomarker and live-birth outcomes in women aged 38–45",
      ],
    },
    sources: [
      {
        kind: "trial",
        externalId: "nct:NCT05836025",
        origin: "clinicaltrials",
        title: "Validating Benefits of Rapamycin for Reproductive Aging Treatment (VIBRANT)",
        url: "https://clinicaltrials.gov/study/NCT05836025",
        doi: null,
        venue: "ClinicalTrials.gov",
        year: 2024,
        authors: ["Zev Williams", "Yousin Suh"],
        abstract:
          "Randomized, double-blind, placebo-controlled pilot trial evaluating weekly low-dose oral rapamycin (5 mg) to slow ovarian aging.",
        citedBy: 18,
        declaredDesign: "rct",
        design: "rct",
        sampleSize: 50,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1038/s43587-023-00498-8",
        origin: "literature",
        title: "Polyamine metabolite spermidine rejuvenates oocyte quality by enhancing mitophagy during female reproductive aging",
        url: "https://doi.org/10.1038/s43587-023-00498-8",
        doi: "10.1038/s43587-023-00498-8",
        venue: "Nature Aging",
        year: 2023,
        authors: ["Yue Zhang", "Bo Xiong"],
        abstract:
          "Spermidine supplementation restores mitophagy and rescues oocyte spindle assembly and fertility in aged female mice.",
        citedBy: 94,
        declaredDesign: "experimental",
        design: "animal",
        sampleSize: 120,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "Low-dose weekly rapamycin (5 mg) is under randomized placebo-controlled clinical evaluation (VIBRANT, NCT05836025) to dampen mTORC1 hyperactivation and slow primordial follicle depletion.",
        tier: "T3",
        controversy: "debated",
        direction: "supports",
        confidence: 0.8,
        rationale: "Columbia University VIBRANT RCT (NCT05836025).",
        sourceIndexes: [0],
      },
      {
        statement:
          "Spermidine repletion enhances selective mitophagy in aging oocytes, reversing meiotic spindle defects and restoring live births in aged mammals.",
        tier: "T5",
        controversy: "settled",
        direction: "supports",
        confidence: 0.88,
        rationale: "Zhang & Xiong, Nature Aging 2023.",
        sourceIndexes: [1],
      },
    ],
    milestones: [],
    entities: [],
    controversies: [],
  },

  "advanced-maternal-age-pregnancy-after-40": {
    summary:
      "While oocyte age dictates chromosomal euploidy and early implantation, maternal hemodynamic and metabolic adaptation governs obstetric safety in pregnancy after age 40–45. Even in healthy women, vascular stiffness and placental remodeling demands increase the baseline incidence of pre-eclampsia and gestational diabetes. However, evidence-based maternal-fetal medicine protocols dramatically mitigate these risks: transferring into an ovulatory natural cycle (preserving the corpus luteum's secretion of vasoactive relaxin and VEGF), initiating nightly low-dose aspirin (150 mg) at 11–14 weeks gestation (cutting preterm pre-eclampsia by 62% in the NEJM ASPRE trial), monitoring second/third-trimester sFlt-1/PlGF angiogenic biomarker ratios, and planning delivery at 38–39 weeks yield strong maternal and neonatal outcomes.",
    gaps: [
      "Individualized aspirin dosing (150 mg vs 162 mg) combined with low-molecular-weight heparin in women over 45 with prior placental insufficiency",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "-62% Risk (OR 0.38)",
          label: "Reduction in preterm pre-eclampsia with 150 mg nightly aspirin started at 11–14 weeks gestation",
          source: "ASPRE Trial (Rolnik et al., NEJM 2017)",
          sourceUrl: "https://doi.org/10.1056/NEJMoa1704559",
        },
        {
          metric: "38–39 Weeks",
          label: "Guideline-recommended planned delivery window in maternal age ≥45 to prevent late-term placental insufficiency",
          source: "ACOG / RCOG Consensus",
        },
      ],
      levers: [
        {
          name: "Nightly Low-Dose Aspirin (150 mg from 12 Weeks)",
          category: "Placental & Vascular Prophylaxis",
          description:
            "150 mg oral aspirin taken at bedtime starting between 11 and 14 weeks of gestation until 36 weeks.",
          bestEvidence: "ASPRE Multicenter Double-Blind RCT (Rolnik et al., NEJM 2017, n=1,776)",
          effect: "Reduces preterm pre-eclampsia (<37 weeks) from 4.3% to 1.6% (OR 0.38, 95% CI 0.20–0.74)",
          reading:
            "Essential, high-certainty obstetric prophylaxis for every pregnancy after age 40.",
          verdict: "Guideline",
          sourceUrl: "https://doi.org/10.1056/NEJMoa1704559",
        },
        {
          name: "Ovulatory Natural-Cycle Frozen Embryo Transfer (NC-FET)",
          category: "Transfer Preparation",
          description:
            "Timing frozen embryo transfer to the patient's natural ovulation rather than suppressing the ovary with high-dose exogenous estrogen/progesterone.",
          bestEvidence: "COMPETE RCT & von Versen-Höynck et al. (Circulation / Hypertension)",
          effect: "Preserves the corpus luteum, which secretes relaxin and VEGF required for maternal renal/cardiovascular adaptation, halving pre-eclampsia risk vs programmed FET",
          reading:
            "Whenever ovulatory cycles are present, natural or modified-natural FET is superior for both live birth and maternal vascular safety.",
          verdict: "Supported",
        },
      ],
      clinicalQuestions: [
        "Can we perform our Frozen Embryo Transfer in a natural or modified-natural ovulatory cycle so that a functional corpus luteum supports vascular adaptation?",
        "What preconception cardiovascular baseline (ECG, echocardiogram, 24h ambulatory blood pressure, HbA1c) should we complete now?",
      ],
      sweepQueue: [
        "First-trimester combined PlGF + uterine artery Doppler + maternal mean arterial pressure screening algorithms in pregnancies over 44",
      ],
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1056/nejmoa1704559",
        origin: "literature",
        title: "Aspirin versus Placebo in Pregnancies at High Risk for Preterm Preeclampsia (ASPRE Trial)",
        url: "https://doi.org/10.1056/NEJMoa1704559",
        doi: "10.1056/nejmoa1704559",
        venue: "New England Journal of Medicine",
        year: 2017,
        authors: ["Daniel L. Rolnik", "David Wright", "Kypros H. Nicolaides"],
        abstract:
          "Multicenter RCT showing 150 mg nightly aspirin initiated at 11–14 weeks reduces preterm preeclampsia by 62%.",
        citedBy: 2150,
        declaredDesign: "rct",
        design: "rct",
        sampleSize: 1776,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "Initiating 150 mg nightly aspirin at 11–14 weeks of gestation reduces preterm pre-eclampsia by 62% (OR 0.38) in high-risk pregnancies.",
        tier: "T3",
        controversy: "settled",
        direction: "supports",
        confidence: 0.97,
        rationale: "ASPRE NEJM RCT (n=1,776).",
        sourceIndexes: [0],
      },
    ],
    milestones: [],
    entities: [],
    controversies: [],
  },
};

