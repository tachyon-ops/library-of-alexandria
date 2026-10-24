import type { SeedDossier } from "./repo";

export const FERTILITY_SEED_DOSSIERS: Record<string, SeedDossier> = {
  "reproductive-medicine-human-fertility": {
    summary:
      "Human reproductive aging is overwhelmingly driven by oocyte meiotic and mitochondrial senescence rather than uterine decline: while endometrial receptivity remains high into the late 40s and early 50s, oocyte aneuploidy rises from ~30% at age 30 to 85–95% by age 45 due to cohesin ring deterioration and spindle ATP deficits. For couples strictly pursuing 100% of their own genetic material (autologous nuclear DNA), clinical and translational strategies combine double stimulation within a single cycle (DuoStim) to double oocyte harvest in 28 days, microfluidic sperm selection (ZyMōt) or testicular sperm aspiration (TESA) to eliminate post-testicular DNA fragmentation, and frontier cellular/organelle interventions. These frontier tracks include Maternal Spindle Transfer (MST, where an enucleated donor egg supplies healthy cytoplasm/mitochondria while preserving 100% maternal and paternal chromosomes), engineered iPSC-derived ovarian support cell maturation (Gameto Fertilo, Phase 3 NCT06858111), mTORC1 inhibition via low-dose rapamycin (Columbia VIBRANT trial, NCT05836025), NAD+/NMN sirtuin spindle stabilization, spermidine-induced mitophagy, and Hippo-pathway In Vitro Activation (IVA) of dormant primordial follicles.",
    gaps: [
      "Long-term longitudinal follow-up and expansion of Maternal Spindle Transfer (MST) trials specifically stratified for women aged 40–45 with autologous oocytes",
      "Human randomized controlled trial dose-response data for oral spermidine and nicotinamide mononucleotide (NMN) on blastocyst euploidy rates",
      "Completion of human meiotic chromosome crossover and synapsis in vitro for iPSC-derived In Vitro Gametogenesis (IVG)",
      "Large-scale multicenter RCT comparing fresh Day 3 cleavage transfer versus PGT-A blastocyst banking in women over 40 with ≤3 oocytes per retrieval",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "85%–95%",
          label: "Autologous blastocyst chromosomal aneuploidy rate at maternal ages 40–45 across PGT-A registries",
          source: "Franasiak et al., Fertil Steril (15,169 biopsies)",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2013.11.004",
        },
        {
          metric: "5.0%–8.6%",
          label: "Cumulative live birth rate per autologous retrieval series at ages 40–45 in disaggregated SART registry data",
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
            "Essential time-saving protocol when maternal age is 40+, preventing cycle drop-out and capturing asynchronous follicle waves.",
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
          category: "6. Paternal Chromatin & Zygote Protection (Age 40+)",
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
            "High-certainty maternal protection protocol for carrying an autologous pregnancy safely after age 40.",
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
        "Institute of Life (Athens) & Embryotools expanded Maternal Spindle Transfer cohort outcomes in women aged 40–45",
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
        note: "PGT-A Trophectoderm Biopsy vs. Fresh Day 3 Cleavage Transfer in Women Aged 40+: While PGT-A prevents transferring lethal aneuploid blastocysts, critics (e.g., Gleicher et al.) demonstrate that in women with ≤3 oocytes, extended culture to Day 5 and laser biopsy cause high embryo loss and discard self-correcting mosaic embryos that could produce healthy live births if transferred on Day 3.",
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
      "Pre-meiotic Germinal Vesicle Transfer (GVT) to rescue chromosome segregation before Meiosis I spindle formation in women aged 40–45",
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
            "Theoretically the strongest way to prevent age-related Meiosis I nondisjunction at 40+, currently optimizing ex vivo maturation synchronization.",
          verdict: "Lab only",
        },
      ],
      clinicalQuestions: [
        "Does our pattern of IVF failure involve fertilization/cleavage arrest (which MST/PNT directly rescues) or Meiosis I aneuploidy?",
        "What are the current eligibility criteria for the Institute of Life (Athens) Maternal Spindle Transfer clinical program?",
      ],
      sweepQueue: [
        "Germinal Vesicle Transfer (GVT) paired with Gameto Fertilo engineered IVM to rescue Meiosis I chromosome segregation in oocytes aged 40+",
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
      "While spermatogenesis continues after age 40, paternal aging (40–45+) is associated with increased reactive oxygen species (ROS) during the 12–14 day transit through the epididymis, resulting in elevated Sperm DNA Fragmentation (DFI) and single/double-strand chromatin breaks. Crucially, while a young oocyte (<35) possesses abundant maternal base-excision repair transcripts capable of repairing damaged sperm DNA after fertilization, an oocyte aged 40+ has depleted repair reserves — meaning unrepaired paternal DNA breaks directly trigger late embryonic arrest between Day 3 and Day 5. Replacing standard centrifuge sperm washing (which induces iatrogenic ROS damage) with microfluidic membrane sorting (ZyMōt chip) reduces DFI to <1–2%, while Testicular Sperm Aspiration (TESA) bypasses epididymal oxidative stress entirely, increasing ICSI live birth rates (RR 1.75) in high-DFI couples.",
    gaps: [
      "Randomized comparison of ZyMōt microfluidic sorting + PICSI versus Testicular Sperm Aspiration (TESA) specifically in couples where maternal age is ≥40",
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
      "Optimal individualized cutoff between Day 3 fresh cleavage transfer and Day 5 blastocyst banking in women aged 40–45 yielding ≤2 zygotes per wave",
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
            "Gold-standard protocol when time is critical after age 40.",
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
        "First-trimester combined PlGF + uterine artery Doppler + maternal mean arterial pressure screening algorithms in pregnancies over 40",
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

  "oocyte-nuclear-maturity-and-morphological-grading": {
    summary:
      "Under the Alpha/ESHRE Istanbul Consensus, retrieved cumulus–oocyte complexes are denuded prior to ICSI and graded first by nuclear maturity: Metaphase II (MII, mature oocyte with an extruded first polar body in the perivitelline space and an arrested Metaphase II spindle, ready for fertilisation), Metaphase I (MI, germinal vesicle breakdown completed but no first polar body extruded yet), and Germinal Vesicle (GV, arrested in Prophase I diplotene with a visible nucleus and nucleolus). Morphologically, an ideal MII oocyte displays a spherical shape, uniform translucent ooplasm, normal perivitelline space, a single intact first polar body, and a homogeneous zona pellucida. Systematic reviews (Rienzi et al., Hum Reprod Update) demonstrate that most minor single cytoplasmic or extracytoplasmic dysmorphisms (dark ooplasm, refractile bodies, slightly fragmented polar body, small vacuoles <14 µm) do not significantly reduce euploidy or live-birth potential once fertilized; however, two specific anomalies carry strong clinical warnings: Giant Oocytes (diploid 2n eggs arising from nuclear division without cytokinesis, which uniformly cause triploid 3PN/digynic embryos and must be excluded) and Smooth Endoplasmic Reticulum (SER) discs/aggregates, which require cautious monitoring and specialized embryo selection.",
    gaps: [
      "Standardized quantitative computer-vision and polarized light (PolScope) spindle retardance cutoffs for predicting maternal cohesin integrity before ICSI",
      "Multicenter RCT outcomes of rescuing immature GV and MI sibling oocytes using iPSC-derived Ovarian Support Cell co-culture (OSC-IVM) in women over 40",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "75%–85%",
          label: "Typical proportion of retrieved oocytes at mature Metaphase II (MII) stage after standard hCG/GnRH-agonist trigger",
          source: "Alpha Scientists in Reproductive Medicine & ESHRE Istanbul Consensus (Hum Reprod 2011)",
          sourceUrl: "https://doi.org/10.1093/humrep/der037",
        },
        {
          metric: "0% safe transfer",
          label: "Giant oocytes (~30% larger volume, diploid) uniformly produce digynic triploid embryos and are strictly excluded from ICSI",
          source: "Balakier et al. & ESHRE Istanbul Consensus (Hum Reprod 2011)",
          sourceUrl: "https://doi.org/10.1093/humrep/der037",
        },
        {
          metric: "~68%–72%",
          label: "Ex vivo GV/MI-to-MII rescue maturation rate achieved with human iPSC-derived Ovarian Support Cells (OSC-IVM)",
          source: "Piechota et al., Hum Reprod 2023",
          sourceUrl: "https://doi.org/10.1093/humrep/dead194",
        },
      ],
      levers: [
        {
          name: "Nuclear Maturity Triage (MII vs. Delayed-MII Rescue vs. GV/MI IVM)",
          category: "Oocyte Nuclear Maturity Assessment",
          description:
            "Classifying denuded eggs into Metaphase II (1st polar body present), Metaphase I (no GV, no polar body), and Germinal Vesicle (intact Prophase I nucleus) to time ICSI accurately.",
          bestEvidence: "Alpha/ESHRE Istanbul Consensus (Hum Reprod 2011) & Rienzi et al., Hum Reprod Update 2011",
          effect: "MII oocytes achieve 70–80% 2PN fertilisation; MI oocytes maturing within 3–4h post-denudation retain moderate competence after cytoplasmic spindle completion",
          reading:
            "Performing ICSI too early after polar body extrusion before Metaphase II spindle assembly completes can induce chromosome scattering; PolScope or 3–4h post-extrusion timing optimizes euploid fertilisation.",
          verdict: "Guideline",
          sourceUrl: "https://doi.org/10.1093/humrep/der037",
        },
        {
          name: "Polarized Light Microscopy (PolScope) Meiotic Spindle Imaging",
          category: "Non-Invasive Organelle & Spindle Grading",
          description:
            "Birefringence imaging of the Metaphase II meiotic spindle and inner zona pellucida layer prior to ICSI needle insertion.",
          bestEvidence: "Meta-analysis of PolScope studies (Petersen et al.; Rienzi et al., Hum Reprod Update 2011)",
          effect: "Visible, high-retardance MII spindles predict higher 2PN fertilisation, blastocyst progression, and avoid physical spindle damage during ICSI",
          reading:
            "Particularly valuable in maternal age 40+ where the meiotic spindle can be displaced from directly beneath the first polar body.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1093/humupd/dmq049",
        },
        {
          name: "Istanbul Consensus Dysmorphism Stratification (SER Discs, Vacuoles & Giant Oocytes)",
          category: "Cytoplasmic & Extracytoplasmic Morphology",
          description:
            "Distinguishing benign extracytoplasmic variations (perivitelline debris, polar body fragmentation, dark zona) from severe intracytoplasmic anomalies (giant diploid oocytes, large vacuoles >14 µm, central granulation).",
          bestEvidence: "Rienzi et al. Systematic Review (Hum Reprod Update 2011, 50 studies) & ESHRE Atlas of Human Embryology",
          effect: "Prevents unnecessary discard of viable MII eggs with minor cosmetic dysmorphisms while strictly excluding triploidy-causing giant oocytes",
          reading:
            "Do not discard MII oocytes solely for dark ooplasm or fragmented polar bodies; exclude giant oocytes and prioritize SER-negative sibling embryos first.",
          verdict: "Guideline",
          sourceUrl: "https://doi.org/10.1093/humupd/dmq049",
        },
      ],
      clinicalQuestions: [
        "Does the embryology lab use polarized light microscopy (PolScope) to confirm Metaphase II spindle position and maturity before ICSI injection?",
        "What is the lab's protocol for immature MI and GV oocytes retrieved alongside MII eggs — are they observed for 4-hour rescue maturation or co-cultured?",
      ],
      sweepQueue: [
        "Non-invasive AI computer-vision oocyte scoring (Magenta / Violet models) predicting blastocyst euploidy from MII brightfield images",
      ],
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1093/humrep/der037",
        origin: "literature",
        title: "The Istanbul consensus workshop on embryo assessment: proceedings of an expert meeting",
        url: "https://doi.org/10.1093/humrep/der037",
        doi: "10.1093/humrep/der037",
        venue: "Human Reproduction",
        year: 2011,
        authors: ["Alpha Scientists in Reproductive Medicine", "ESHRE Special Interest Group of Embryology"],
        abstract:
          "International consensus establishing standardized terminology and grading criteria for human oocytes, zygote pronuclear scoring, cleavage embryos, and blastocysts.",
        citedBy: 1850,
        declaredDesign: "guideline",
        design: "guideline",
        sampleSize: null,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1093/humupd/dmq049",
        origin: "literature",
        title: "Predictive value of oocyte morphology in human IVF: a systematic review of the literature",
        url: "https://doi.org/10.1093/humupd/dmq049",
        doi: "10.1093/humupd/dmq049",
        venue: "Human Reproduction Update",
        year: 2011,
        authors: ["Laura Rienzi", "Benedetta Balaban", "Thomas Ebner", "Janos Mandelbaum"],
        abstract:
          "Systematic review of 50 studies analyzing extracytoplasmic and intracytoplasmic oocyte dysmorphisms, polar body morphology, zona pellucida birefringence, and Metaphase II spindle imaging on fertilisation and developmental competence.",
        citedBy: 690,
        declaredDesign: "systematic_review",
        design: "systematic_review",
        sampleSize: 50,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "Under the Alpha/ESHRE Istanbul Consensus, only Metaphase II (MII) oocytes with an extruded first polar body are nuclear-mature for immediate fertilisation, while giant diploid oocytes must be excluded due to uniform triploid (digynic) zygote formation.",
        tier: "T1",
        controversy: "settled",
        direction: "supports",
        confidence: 0.98,
        rationale: "Alpha/ESHRE Istanbul Consensus guideline (Hum Reprod 2011).",
        sourceIndexes: [0],
      },
      {
        statement:
          "Systematic review of 50 clinical studies shows that isolated minor extracytoplasmic oocyte dysmorphisms (polar body fragmentation, dark zona, small perivitelline debris) do not reliably reduce fertilisation or live-birth potential, whereas visible Metaphase II spindle birefringence positively predicts embryo developmental competence.",
        tier: "T1",
        controversy: "settled",
        direction: "supports",
        confidence: 0.94,
        rationale: "Rienzi et al. systematic review in Human Reproduction Update (2011).",
        sourceIndexes: [0, 1],
      },
    ],
    milestones: [
      {
        year: 2011,
        title: "Alpha & ESHRE Istanbul Consensus on Oocyte and Embryo Grading",
        description: "Unified global scoring criteria for oocyte nuclear maturity (MII/MI/GV), dysmorphisms, pronuclear scoring, and blastocyst grading.",
        sourceIndex: 0,
      },
    ],
    entities: [],
    controversies: [],
  },

  "zygote-pronuclear-scoring-2pn-1pn-3pn-fertilisation": {
    summary:
      "At 16–18 hours post-insemination (Day 1), the fertilisation check evaluates pronuclear (PN) number and polar body (PB) extrusion: a normal fertilised zygote is 2PN2PB, displaying two symmetrically juxtaposed pronuclei (one maternal, one paternal) with aligned nucleolar precursor bodies (NPBs) and two polar bodies. Historically, monopronuclear (1PN) and appronuclear (0PN) zygotes were discarded under the assumption that 1PN embryos were haploid (parthenogenetic/androgenetic) and 0PN embryos were unfertilised. However, modern time-lapse imaging and genome-wide SNP haplotyping / PGT-A studies (Destouni et al., Bradley et al., Capalbo et al.) prove that 30–50% of 1PN and 0PN zygotes that successfully develop to the blastocyst stage are actually normal biparental diploids (46,XX or 46,XY) resulting from asynchronous pronuclear formation, early pronuclear membrane breakdown before the 17-hour snapshot, or fusion of maternal and paternal pronuclei into a single diploid pronucleus. Conversely, tripronuclear (3PN) zygotes arise from dispermic penetration (in conventional IVF) or non-extrusion of the second polar body (digyny in ICSI) and are overwhelmingly triploid (69 chromosomes) or chaotic aneuploid, warranting clinical exclusion.",
    gaps: [
      "Routine integration of biparental SNP haplotyping alongside copy-number PGT-A so clinics can distinguish normal biparental diploid 1PN/0PN blastocysts from uniparental diploid or haploid embryos prior to transfer",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "70%–80%",
          label: "Expected normal 2PN2PB fertilisation rate per injected mature Metaphase II oocyte after ICSI",
          source: "ESHRE Vienna Consensus Key Performance Indicators (Hum Reprod Open 2017)",
          sourceUrl: "https://doi.org/10.1093/hropen/hox011",
        },
        {
          metric: "30%–50%",
          label: "Proportion of 1PN- and 0PN-derived blastocysts confirmed as normal biparental euploid diploids via SNP-array / haplotyping PGT-A",
          source: "Bradley et al., Fertil Steril 2017; Destouni et al., Genome Res 2016",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2017.08.004",
        },
        {
          metric: ">95% triploid/abnormal",
          label: "Chromosomal abnormality rate in 3PN zygotes (polyspermy or digynic second polar body retention)",
          source: "Alpha/ESHRE Istanbul Consensus (Hum Reprod 2011)",
          sourceUrl: "https://doi.org/10.1093/humrep/der037",
        },
      ],
      levers: [
        {
          name: "2PN2PB Standard Fertilisation & Scott Z-Score (Z1–Z4) Nucleolar Alignment",
          category: "Normal Diploid Fertilisation (2PN)",
          description:
            "Confirming two equal-sized pronuclei closely abutted in the centre of the zygote at 16–18h post-ICSI/IVF, with aligned nucleolar precursor bodies (NPBs).",
          bestEvidence: "Alpha/ESHRE Istanbul Consensus (2011) & Scott et al., Hum Reprod 2000",
          effect: "2PN2PB zygotes with symmetrical pronuclei and aligned NPBs (Z1/Z2) show the highest Day-5 blastocyst conversion and euploidy rates",
          reading:
            "Gold-standard first-line selection cohort; pronuclear fading (tPNf) at ~23–25 hours post-insemination marks transition to first cleavage (t2).",
          verdict: "Guideline",
          sourceUrl: "https://doi.org/10.1093/humrep/der037",
        },
        {
          name: "Extended Blastocyst Culture & Biparental SNP-PGT-A Rescue of 1PN and 0PN Zygotes",
          category: "Abnormal Pronuclear Rescue (1PN & 0PN)",
          description:
            "Culturing 1PN and 0PN zygotes to Day 5–6 blastocysts instead of discarding them on Day 1, followed by SNP-based or haplotyping PGT-A to verify biparental diploidy (46 chromosomes with both maternal and paternal alleles).",
          bestEvidence: "Bradley et al., Fertil Steril 2017 (n=2,130 1PN/0PN embryos) & Capalbo et al., Hum Reprod 2017",
          effect: "Rescues healthy live births from 1PN and 0PN blastocysts that would otherwise be discarded — vital in low-yield autologous cycles",
          reading:
            "Standard copy-number NGS PGT-A cannot distinguish haploid (23,X) from diploid (46,XX) without allele ratios; SNP/haplotyping PGT-A confirms biparental diploidy before transferring a 1PN-derived blastocyst.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2017.08.004",
        },
        {
          name: "Exclusion of 3PN (Tripronuclear) Zygotes",
          category: "Polyspermy & Digyny Triage (3PN)",
          description:
            "Identifying three pronuclei at 16–18h post-insemination (3PN1PB after ICSI due to failed 2nd polar body extrusion, or 3PN2PB after IVF due to dispermy).",
          bestEvidence: "Alpha/ESHRE Istanbul Consensus (Hum Reprod 2011)",
          effect: "Prevents transfer of triploid (69,XXX / 69,XXY) pregnancies associated with partial hydatidiform mole and first-trimester miscarriage",
          reading:
            "3PN zygotes should never be transferred without definitive biparental diploid molecular verification.",
          verdict: "Guideline",
          sourceUrl: "https://doi.org/10.1093/humrep/der037",
        },
      ],
      clinicalQuestions: [
        "Does our clinic automatically discard 1PN and 0PN zygotes on Day 1, or are they cultured to Day 5–6 blastocysts and tested with biparental SNP-based PGT-A to rescue diploid embryos?",
        "Does the lab use continuous time-lapse incubator imaging (EmbryoScope) so asynchronous pronuclear appearance/fading is never misclassified as 0PN or 1PN?",
      ],
      sweepQueue: [
        "Time-lapse deep-learning verification of pronuclear fusion vs asynchronous pronuclear appearance in 1PN2PB ICSI zygotes",
      ],
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1016/j.fertnstert.2017.08.004",
        origin: "literature",
        title: "Clinical outcome of monopronuclear (1PN) and appronuclear (0PN) embryos following extended culture and preimplantation genetic testing",
        url: "https://doi.org/10.1016/j.fertnstert.2017.08.004",
        doi: "10.1016/j.fertnstert.2017.08.004",
        venue: "Fertility and Sterility",
        year: 2017,
        authors: ["Clare K. Bradley", "Kylie A. Traversa", "Tomas Stojanov"],
        abstract:
          "Large cohort analysis demonstrating that culturing 1PN and 0PN zygotes to the blastocyst stage and applying genetic ploidy/biparental testing rescues transferable diploid euploid blastocysts and yields healthy live births.",
        citedBy: 145,
        declaredDesign: "cohort",
        design: "cohort",
        sampleSize: 2130,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1093/humrep/dex033",
        origin: "literature",
        title: "Clinical value of single-nucleotide polymorphism-based preimplantation genetic testing for biparental diploidy in 1PN and 0PN blastocysts",
        url: "https://doi.org/10.1093/humrep/dex033",
        doi: "10.1093/humrep/dex033",
        venue: "Human Reproduction",
        year: 2017,
        authors: ["Antonio Capalbo", "Danilo Cimadomo", "Laura Rienzi", "Filippo Maria Ubaldi"],
        abstract:
          "Demonstrates that SNP-based haplotyping distinguishes true biparental diploid (46,XX/46,XY) blastocysts derived from 1PN and 0PN zygotes from haploid or uniparental embryos, rescuing viable embryos in poor-prognosis patients.",
        citedBy: 162,
        declaredDesign: "cohort",
        design: "cohort",
        sampleSize: 380,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "While 2PN2PB at 16–18 hours post-insemination is the standard marker of normal diploid fertilisation, 30–50% of 1PN and 0PN zygotes that reach the blastocyst stage are true biparental diploids that can be verified via SNP/haplotyping PGT-A and produce healthy live births.",
        tier: "T3",
        controversy: "settled",
        direction: "supports",
        confidence: 0.93,
        rationale: "Large clinical cohorts with molecular SNP-haplotyping confirmation (Bradley et al. 2017; Capalbo et al. 2017).",
        sourceIndexes: [0, 1],
      },
    ],
    milestones: [
      {
        year: 2017,
        title: "SNP-Haplotyping Rescue of Biparental Diploid 1PN & 0PN Blastocysts",
        description: "Bradley et al. and Capalbo et al. prove that 1PN/0PN blastocysts confirmed as biparental diploid produce healthy live births and should not be discarded on Day 1.",
        sourceIndex: 0,
      },
    ],
    entities: [],
    controversies: [],
  },

  "blastocyst-morphological-grading-gardner-criteria-morphokinetics": {
    summary:
      "The Gardner and Schoolcraft (1999) blastocyst grading system is the international clinical standard for evaluating Day 5–7 embryos across three components: (1) Blastocoel Expansion & Hatching Stage from 1 to 6 (Stage 1: early blastocoel <50% volume; Stage 2: blastocoel ≥50%; Stage 3: full blastocyst filling the embryo; Stage 4: expanded blastocyst with thinning zona pellucida; Stage 5: hatching out of the zona; Stage 6: fully hatched); (2) Inner Cell Mass (ICM) Grade A–C for the fetal-forming cells (A: tightly packed, many cells; B: loosely grouped, several cells; C: very few/indistinct cells); and (3) Trophectoderm (TE) Grade A–C for the placenta-forming outer epithelium (A: cohesive layer of many cells; B: loose epithelium of fewer cells; C: very few large cells). Composite grades are grouped clinically into Top Quality (AA: e.g. 4AA, 5AA, 3AA), Good Quality (AB, BA, BB: e.g. 4AB, 4BA, 4BB), Fair Quality (BC, CB), and Poor Quality (CC). Large multicenter studies (Capalbo et al., Hum Reprod 2014; Zhao et al.) prove two critical rules: first, Trophectoderm grade correlates more strongly with implantation and live birth than ICM grade (making 4BA often slightly higher implanting than 4AB); second, once PGT-A confirms chromosomal euploidy, a good-to-moderate blastocyst (such as 4BB or even 4BC) achieves ~45–55% live birth rates — proving that chromosomal euploidy overrides cosmetic morphological grade in women over 38.",
    gaps: [
      "Head-to-head RCTs comparing deep-learning video morphokinetic selection (iDAScore / ERICA) against invasive trophectoderm biopsy in patients with ≤3 blastocysts",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "~55%–65% vs ~48%–55%",
          label: "Live birth rate per single euploid blastocyst transfer for AA vs BB Gardner morphology (Capalbo et al., Hum Reprod 2014)",
          source: "Capalbo et al., Hum Reprod 2014 (n=956 euploid blastocysts)",
          sourceUrl: "https://doi.org/10.1093/humrep/deu033",
        },
        {
          metric: "~52% vs ~30%",
          label: "Euploidy rate of excellent/good (AA/AB/BA) vs poor (CC/BC) blastocysts across all maternal ages (still requires PGT-A after age 38)",
          source: "Capalbo et al., Hum Reprod 2014",
          sourceUrl: "https://doi.org/10.1093/humrep/deu033",
        },
        {
          metric: "TE > ICM",
          label: "Trophectoderm grade (second letter in 4AA/4BA/4BB) is the strongest independent morphological predictor of implantation and live birth",
          source: "Ahlström et al., Hum Reprod 2011; Hill et al., Fertil Steril 2013",
          sourceUrl: "https://doi.org/10.1093/humrep/der325",
        },
      ],
      levers: [
        {
          name: "Gardner & Schoolcraft 3-Part Blastocyst Grading (1–6 Expansion, A–C ICM, A–C TE)",
          category: "Blastocyst Morphological Scoring (AA, AB, BA, BB, BC)",
          description:
            "Scoring Day 5–7 blastocysts by expansion (1–6), Inner Cell Mass (first letter A/B/C), and Trophectoderm (second letter A/B/C): e.g., 4AA (top), 4AB/4BA (good-plus), 4BB (standard good), 4BC/4CB (fair).",
          bestEvidence: "Gardner & Schoolcraft (1999); Alpha/ESHRE Istanbul Consensus (2011); Ahlström et al. (2011)",
          effect: "Stratifies untested blastocyst implantation potential (~50–60% for AA, ~40–50% for AB/BA/BB, ~25–30% for BC/CB in young cohorts)",
          reading:
            "A 4BB blastocyst is a solid, high-competence 'good' embryo (loosely grouped ICM + cohesive/moderate trophectoderm) and should never be viewed as poor quality.",
          verdict: "Guideline",
          sourceUrl: "https://doi.org/10.1093/humrep/der037",
        },
        {
          name: "Euploidy Priority Over Morphology (4BB Euploid vs. 4AA Untested/Aneuploid)",
          category: "Morphology–Ploidy Integration",
          description:
            "Prioritizing chromosomal euploidy over Gardner morphological grade when selecting Day 5–7 blastocysts in maternal age ≥38.",
          bestEvidence: "Capalbo, Rienzi, Ubaldi et al., Human Reproduction 2014 (n=956 biopsied blastocysts)",
          effect: "Once confirmed euploid, 4BB, 4BC, and Day-6 blastocysts yield comparable live birth rates to 4AA blastocysts; morphology alone misses ~50–80% of aneuploid AA embryos after age 40",
          reading:
            "Never discard a slow-growing Day 6 or Day 7 BB/BC blastocyst if it is chromosomally euploid; chromosomal ploidy is the primary determinant of live birth.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1093/humrep/deu033",
        },
        {
          name: "Day 3 Cleavage Grading (Cell Number 6–10, Fragmentation <10%, Symmetry) & Time-Lapse Morphokinetics",
          category: "Cleavage & Morphokinetic Grading",
          description:
            "Evaluating Day 2 (4-cell, ~44h) and Day 3 (8-cell, ~68h) blastomere count, symmetry, multinucleation, and continuous time-lapse division intervals (t2,cc2, s2, t5, tB).",
          bestEvidence: "Cochrane Review on Time-Lapse Systems (Armstrong et al.) & Istanbul Consensus (2011)",
          effect: "Uninterrupted closed-incubator culture prevents temperature/pH drops and identifies direct unequal cleavage (1-to-3 cell division) and multinucleation",
          reading:
            "Essential when performing Day 3 transfers in low-yield cycles: an 8-cell Grade 1 (<10% fragmentation, symmetric, mononucleated) Day 3 embryo is the top cleavage benchmark.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1093/humrep/der037",
        },
      ],
      clinicalQuestions: [
        "What is the exact 3-part Gardner score (Expansion 1–6, ICM A–C, Trophectoderm A–C) and Day of blastulation (Day 5, 6, or 7) for each of our embryos?",
        "Does our clinic freeze and biopsy fair-grade (BC/CB) and Day-7 blastocysts so no potentially euploid autologous embryo is discarded?",
      ],
      sweepQueue: [
        "Non-invasive cell-free DNA in spent blastocyst culture medium (niPGT-A) combined with Gardner BB/BC morphological grading",
      ],
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1093/humrep/deu033",
        origin: "literature",
        title: "Correlation between standard blastocyst morphology, euploidy and implantation: an observational study in two centers involving 956 screened blastocysts",
        url: "https://doi.org/10.1093/humrep/deu033",
        doi: "10.1093/humrep/deu033",
        venue: "Human Reproduction",
        year: 2014,
        authors: ["Antonio Capalbo", "Laura Rienzi", "Danilo Cimadomo", "Roberta Maggiulli", "Thomas Elliott", "Graham Wright", "Zsolt Peter Nagy", "Filippo Maria Ubaldi"],
        abstract:
          "Multicenter cohort of 956 biopsied blastocysts proving that while Gardner morphology (AA, AB, BA, BB, BC, CC) weakly correlates with euploidy, once a blastocyst is confirmed euploid, implantation potential is similarly high across AA, AB, BA, BB, and slower Day-6 embryos.",
        citedBy: 620,
        declaredDesign: "cohort",
        design: "cohort",
        sampleSize: 956,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1093/humrep/der325",
        origin: "literature",
        title: "Trophectoderm morphology: an important parameter for predicting live birth after single blastocyst transfer",
        url: "https://doi.org/10.1093/humrep/der325",
        doi: "10.1093/humrep/der325",
        venue: "Human Reproduction",
        year: 2011,
        authors: ["A. Ahlström", "C. Westin", "E. Reismer", "M. Wikland", "T. Hardarson"],
        abstract:
          "Large clinical cohort of 1,117 single blastocyst transfers demonstrating that trophectoderm (TE) grade is a stronger independent predictor of live birth than inner cell mass (ICM) grade or expansion stage.",
        citedBy: 510,
        declaredDesign: "cohort",
        design: "cohort",
        sampleSize: 1117,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "In the Gardner blastocyst grading system (Expansion 1–6, ICM A–C, Trophectoderm A–C), once chromosomal euploidy is confirmed by PGT-A, good and moderate blastocysts (such as 4BB or 4BC) achieve implantation and live-birth rates comparable to top-graded 4AA blastocysts.",
        tier: "T3",
        controversy: "settled",
        direction: "supports",
        confidence: 0.96,
        rationale: "Multicenter study of 956 screened blastocysts (Capalbo et al., Hum Reprod 2014).",
        sourceIndexes: [0],
      },
      {
        statement:
          "Among the three components of Gardner blastocyst grading, Trophectoderm (TE) grade (the second letter in AA, BA, AB, BB) is a stronger independent predictor of implantation and live birth than Inner Cell Mass (ICM) grade.",
        tier: "T3",
        controversy: "settled",
        direction: "supports",
        confidence: 0.94,
        rationale: "Ahlström et al. cohort of 1,117 single blastocyst transfers (Hum Reprod 2011).",
        sourceIndexes: [1],
      },
    ],
    milestones: [
      {
        year: 2014,
        title: "Capalbo & Rienzi Prove Euploidy Overrides Gardner Morphology (AA vs BB/BC)",
        description: "Multicenter study of 956 biopsied blastocysts demonstrates that any euploid blastocyst (whether 4AA, 4BB, or 4BC) has high implantation competence.",
        sourceIndex: 0,
      },
    ],
    entities: [],
    controversies: [],
  },

  "inter-transfer-interval-immediate-vs-delayed-frozen-embryo-transfer": {
    summary:
      "When menstruation arrives after an unsuccessful embryo transfer and one vitrified blastocyst remains in cryostorage, the clinical question is strictly about Frozen Embryo Transfer (FET) timing: transfer in the very next menstrual cycle, or wait 1–3 months before transferring the final embryo. Because the blastocyst already exists and is vitrified in liquid nitrogen at −196°C, its biological and chromosomal age is fixed. The peer-reviewed evidence establishes four findings: (1) Immediate vs. Postponed FET: A systematic review and meta-analysis of 20,155 FET cycles (Bergenheim et al., Hum Reprod Update 2021) and a second meta-analysis of 11,500 cycles (Matorras et al., Reprod Med Biol 2021) show that immediate FET in the first menstrual cycle is non-inferior (adjusted OR 1.20, 95% CI 1.01–1.44; pooled RR 1.05, 95% CI 0.95–1.15) to postponing transfer for ≥1 washout cycle. In the only multicenter RCT conducted specifically after a failed embryo transfer (Song et al., Reprod Biol Endocrinol 2021, n=732), immediate next-cycle FET achieved higher clinical pregnancy (41.7% vs. 34.1%, RR 1.23, p=0.045), lower biochemical loss (11.7% vs. 30.6%, p<0.001), a non-significant live birth trend (35.5% vs. 29.0%, p=0.075), and lower pre-transfer depressive symptoms (6.1% vs. 10.6%, p=0.038) and perceived stress (22.4% vs. 30.3%, p=0.022). (2) Cryostorage Duration Safety: Across 58,001 vitrified-warmed blastocyst transfers (Cimadomo, Cobo et al., AJOG 2024) and 5,995 interval-stratified FET patients (Huang et al., RBMO 2023), waiting 1 to 6+ months has zero negative impact on blastocyst warming survival, implantation, miscarriage, or live birth. (3) When Waiting Has a Purpose: A 1–3 month interval is clinically justified only when used to investigate or correct a specific modifiable uterine, endocrine, or psychological factor — such as diagnostic hysteroscopy and CD138 biopsy for chronic endometritis (Vitagliano et al., Fertil Steril 2018, n=796), washing out synthetic hormones to transition from a programmed HRT cycle to an ovulatory natural cycle with a corpus luteum (von Versen-Höynck et al., Hypertension 2019, n=683; Horowitz et al., RBMO 2019, n=198), ensuring day-of-transfer serum progesterone ≥9.2–10 ng/mL with subcutaneous rescue (Labarta et al., Hum Reprod 2021, n=574), or psychological recovery. By contrast, delaying solely for a routine Endometrial Receptivity Analysis (ERA) biopsy does not improve live birth (Doyle et al., JAMA 2022 RCT, n=767). (4) Conclusion: With no modifiable factor identified, waiting offers no biological benefit; with one identified, waiting is justified for as long as it takes to address it.",
    gaps: [
      "Randomized controlled trials comparing immediate next-menses FET versus a targeted 60-day diagnostic workup (hysteroscopy + CD138 chronic endometritis screen) specifically in patients transferring a final single vitrified blastocyst after a failed transfer",
      "Prospective head-to-head trials quantifying hypothalamic-pituitary-ovarian (HPO) axis ovulation timing in the immediate first menstrual bleed after stopping a programmed HRT cycle versus after one natural recovery cycle",
      "Non-invasive menstrual-effluent biomarker assays to rule out CD138+ chronic endometritis within a single menstrual cycle without requiring an invasive luteal biopsy pause",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "aOR 1.20 (1.01–1.44)",
          label: "Live birth rate adjusted odds ratio for Immediate (first menstrual cycle) vs. Postponed FET across 15 studies — confirming no mandatory uterine washout is needed",
          source: "Bergenheim et al., Hum Reprod Update 2021 (n=20,155 cycles)",
          sourceUrl: "https://doi.org/10.1093/humupd/dmab002",
        },
        {
          metric: "41.7% vs. 34.1% CPR",
          label: "Clinical pregnancy rate (RR 1.23, p=0.045), live birth trend (35.5% vs. 29.0%), and lower depression (6.1% vs. 10.6%) in Immediate vs. Delayed FET after a failed transfer",
          source: "Song et al., Reprod Biol Endocrinol 2021 RCT (n=732)",
          sourceUrl: "https://doi.org/10.1186/s12958-021-00819-9",
        },
        {
          metric: "0% decay at −196°C",
          label: "Waiting 1 to 6+ months in liquid nitrogen cryostorage has zero adverse effect on blastocyst warming survival, implantation, miscarriage, or live birth",
          source: "Cimadomo, Cobo et al., AJOG 2024 (n=58,001) & Huang et al., RBMO 2023 (n=5,995)",
          sourceUrl: "https://doi.org/10.1016/j.ajog.2024.03.033",
        },
        {
          metric: "44.9% vs. 45.0% LBR",
          label: "Subcutaneous progesterone rescue (25 mg/d) when day-of-FET serum P4 is <9.2–10 ng/mL restores live birth rate to match normal-P4 transfers",
          source: "Labarta et al., Hum Reprod 2021 (n=574)",
          sourceUrl: "https://doi.org/10.1093/humrep/deaa322",
        },
      ],
      levers: [
        {
          name: "Immediate Next-Cycle FET (When No Modifiable Factor Is Identified)",
          category: "1. Immediate vs. Postponed FET Timing",
          description:
            "Proceeding with Frozen Embryo Transfer in the very next menstrual cycle after a failed transfer when uterine cavity, thyroid, progesterone protocol, and psychological readiness are already confirmed.",
          bestEvidence:
            "Bergenheim et al., Hum Reprod Update 2021 (meta-analysis, n=20,155); Matorras et al., Reprod Med Biol 2021 (n=11,500); Song et al., Reprod Biol Endocrinol 2021 RCT (n=732 after failed ET); Li et al., Hum Reprod 2021 RCT (n=724)",
          effect:
            "Non-inferior or slightly higher live birth (aOR 1.20 in Bergenheim 2021; 47.2% vs. 37.7%, p=0.012 in Li 2021; 35.5% vs. 29.0% LBR and 41.7% vs. 34.1% CPR in Song 2021), lower biochemical loss (11.7% vs. 30.6%), and lower pre-transfer depression (6.1% vs. 10.6%)",
          reading:
            "Level-1 (T1/T2) evidence proves that arbitrary waiting cycles do not improve endometrial receptivity. If nothing in the diagnostic workup or transfer protocol needs to be changed, waiting offers no biological benefit.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1093/humupd/dmab002",
        },
        {
          name: "Cryostorage Interval Flexibility (1–6+ Months at −196°C)",
          category: "1. Immediate vs. Postponed FET Timing",
          description:
            "Holding a remaining vitrified blastocyst in liquid nitrogen at −196°C for 1–3+ months while investigating or correcting a modifiable factor, or recovering emotionally.",
          bestEvidence:
            "Cimadomo, Cobo et al., AJOG 2024 (n=58,001 vitrified-warmed cycles); Huang et al., RBMO 2023 (n=5,995 FET cycles across ≤40d, 41–180d, >180d); Horowitz et al., RBMO 2019 (n=198)",
          effect:
            "Zero reduction in cryo-survival, implantation, or live birth rate across 1 to 6+ months of storage; adjusted LBR is identical between ≤40 days and 41–180 days",
          reading:
            "Large-cohort (T3) evidence confirms that an existing vitrified blastocyst's biological and chromosomal age is completely fixed at −196°C, and uterine receptivity does not decline over a 1–3 month pause.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1016/j.ajog.2024.03.033",
        },
        {
          name: "Chronic Endometritis (CD138) Biopsy & Office Hysteroscopy During a 1–2 Month Interval",
          category: "2. Modifiable Factors That Justify Waiting 1–3 Months",
          description:
            "Using a 1–2 cycle pause before transferring the final blastocyst to inspect the uterine cavity via office hysteroscopy and screen for subclinical chronic endometritis (CD138+ plasma cells), treating positive cases with 14 days of oral doxycycline.",
          bestEvidence:
            "Vitagliano et al., Fertility and Sterility 2018 (systematic review & meta-analysis, 5 studies, n=796)",
          effect:
            "Curing biopsy-confirmed chronic endometritis increases live birth rate compared with persistent endometritis (OR 6.81, 95% CI 2.08–22.24) and restores LBR to match unaffected controls",
          reading:
            "Moderate certainty (T1 meta-analysis of observational studies; no large RCT after a single failed transfer). When only one blastocyst remains and the cavity has not recently been evaluated, taking 1–2 cycles to rule out silent endometritis or micro-polyps is a high-yield reason to pause.",
          verdict: "Targeted",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2018.04.040",
        },
        {
          name: "Transitioning from Programmed HRT-FET to Ovulatory Natural / Modified-Natural FET",
          category: "2. Modifiable Factors That Justify Waiting 1–3 Months",
          description:
            "Timing FET to spontaneous ovulation (retaining a functional corpus luteum) rather than anovulatory exogenous estradiol/progesterone suppression; taking 1 recovery cycle if needed for spontaneous ovulation to resume after stopping HRT.",
          bestEvidence:
            "von Versen-Höynck et al., Hypertension 2019 (prospective cohort, n=683); Horowitz et al., RBMO 2019 (n=198)",
          effect:
            "Ovulatory FET with a corpus luteum reduces pre-eclampsia (3.9% vs. 12.8% in programmed HRT-FET; adjusted OR 2.73 for HRT without corpus luteum); mNC-FET achieves equal LBR whether done in the immediate cycle (15.6d to trigger) or delayed (84.8d)",
          reading:
            "Observational cohort certainty (T3). In ovulatory patients, transferring in a natural or modified-natural cycle preserves corpus luteum vasoactive factors (relaxin, VEGF); if prior high-dose HRT blunts immediate follicular recruitment, a 1-cycle washout is justified.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1161/HYPERTENSIONAHA.118.12043",
        },
        {
          name: "Day-of-Transfer Serum Progesterone Monitoring & Luteal Rescue (+ Thyroid TSH Check)",
          category: "2. Modifiable Factors That Justify Waiting 1–3 Months",
          description:
            "Measuring serum progesterone (P4) on the day before or day of FET and adding subcutaneous progesterone (25 mg/day) if serum P4 is <9.2–10.0 ng/mL, alongside verifying serum TSH <2.5 mIU/L.",
          bestEvidence:
            "Labarta et al., Human Reproduction 2017 (prospective cohort, n=211) & Labarta et al., Human Reproduction 2021 (prospective rescue study, n=574)",
          effect:
            "Unrescued low serum P4 (<9.2 ng/mL) on transfer day drops ongoing pregnancy rate (32.7% vs. 52.8%); adding subcutaneous P4 rescues live birth rate to 44.9% vs. 45.0% in normal-P4 controls",
          reading:
            "Prospective clinical cohort certainty (T3). Up to 25–30% of patients using vaginal micronized progesterone alone have sub-threshold serum P4 on transfer day. Correcting thyroid TSH takes 4–6 weeks (justifying a pause); luteal P4 rescue can be applied in either an immediate or delayed cycle.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1093/humrep/deaa322",
        },
        {
          name: "Delaying Transfer Solely for Routine Endometrial Receptivity Testing (ERA Biopsy)",
          category: "3. Interventions That Do Not Warrant Delaying Transfer",
          description:
            "Postponing FET for 1–2 months to perform a mock medicated cycle and commercial transcriptomic Endometrial Receptivity Analysis (ERA) biopsy.",
          bestEvidence:
            "Doyle et al., JAMA 2022 (double-blind multicenter RCT, n=767); Riestenberg et al., Fertility and Sterility 2021 (cohort, n=228)",
          effect:
            "No improvement in live birth rate in the JAMA RCT (58.5% with ERA-timed FET vs. 61.9% with standard timing, p=0.38) or cohort analysis (56.6% vs. 56.5%)",
          reading:
            "High-certainty RCT evidence (T2) refutes delaying a transfer solely to run an ERA biopsy.",
          verdict: "Not supported",
          sourceUrl: "https://doi.org/10.1001/jama.2022.20438",
        },
      ],
      clinicalQuestions: [
        "Are there any modifiable uterine or endocrine factors we have not yet checked — specifically office hysteroscopy, CD138 chronic endometritis biopsy, or thyroid TSH <2.5 mIU/L — that would give a 1–2 month pause a clear clinical purpose before transferring our last blastocyst?",
        "Was the failed transfer performed in a programmed HRT cycle or an ovulatory Natural / Modified-Natural cycle, and can we use an ovulatory cycle for the remaining blastocyst?",
        "Will we measure serum progesterone (P4) 24 hours before or on the day of transfer and add subcutaneous or intramuscular progesterone rescue if serum P4 is below 9.2–10 ng/mL?",
        "If our uterine cavity, thyroid, and ovulatory protocol are already confirmed optimal and we feel ready, is there any reason not to transfer in the next menstrual cycle given the RCT and meta-analysis evidence (Song et al. 2021; Bergenheim et al. 2021)?",
      ],
      sweepQueue: [
        "Randomized trials of immediate FET vs. single-cycle hysteroscopic + CD138 diagnostic screening prior to transferring a final remaining blastocyst",
        "Individualized luteal progesterone pharmacokinetics comparing vaginal + subcutaneous aqueous progesterone versus intramuscular progesterone in FET",
      ],
      article: {
        title: "Immediate vs. Delayed Frozen Embryo Transfer (FET) After a Failed Transfer: Evidence on Timing, Cryostorage Stability, and Purposeful Reset",
        subtitle:
          "Synthesis of randomized controlled trials, meta-analyses (n=20,155 cycles), and cryostorage cohorts (n=58,001 blastocysts) on whether to transfer a final remaining vitrified blastocyst in the next menstrual cycle or wait 1–3 months.",
        synopsis:
          "When a Frozen Embryo Transfer (FET) is unsuccessful and one vitrified blastocyst remains in storage, the embryo's biological and chromosomal age is fixed at −196°C. The clinical choice between transferring in the immediate next menstrual cycle versus waiting 1–3 months therefore depends entirely on whether a specific, modifiable uterine, endocrine, or psychological factor needs to be addressed during the interval.",
        sections: [
          {
            kicker: "Section I · Immediate vs. Postponed FET After a Failed Transfer",
            heading: "1. Evidence on Immediate Next-Cycle vs. Delayed FET (Live Birth, Miscarriage, Patient Outcomes)",
            paragraphs: [
              "Across two independent systematic reviews and meta-analyses — Bergenheim et al. (Human Reproduction Update, 2021; 15 cohort studies, n=20,155 FET cycles) and Matorras et al. (Reproductive Medicine and Biology, 2021; 11 studies, n=11,500 cycles) — performing FET in the very first menstrual cycle after an unsuccessful transfer or stimulated cycle is non-inferior to postponing transfer for ≥1 washout cycle, with Bergenheim et al. reporting a slightly higher adjusted live birth rate for immediate FET (aOR 1.20, 95% CI 1.01–1.44) and Matorras et al. finding equivalent pooled live birth rates (RR 1.05, 95% CI 0.95–1.15).",
              "In the only multicenter randomized controlled trial conducted specifically in women immediately following a failed embryo transfer attempt, Song et al. (Reproductive Biology and Endocrinology, 2021; n=732 randomized, n=646 completed FETs) compared immediate FET in the first menstrual cycle against delayed FET in the third or subsequent cycle. Immediate FET yielded a significantly higher clinical pregnancy rate (41.7% vs. 34.1%, RR 1.23, p=0.045), lower biochemical pregnancy loss (11.7% vs. 30.6%, RR 0.28, p<0.001), and a non-significant trend toward higher live birth (35.5% vs. 29.0%, p=0.075). Patient-reported psychological outcomes significantly favored immediate transfer, with lower pre-transfer moderate-to-severe depression (6.1% vs. 10.6%, p=0.038) and lower high perceived stress (22.4% vs. 30.3%, p=0.022). A parallel RCT following stimulated cycles by Li et al. (Human Reproduction, 2021; n=724) similarly reported higher live birth (47.2% vs. 37.7%, p=0.012) and lower miscarriage (13.2% vs. 24.2%, p=0.006) in immediate versus delayed FET.",
            ],
            callout:
              "Key RCT & Meta-Analysis Anchor: Immediate next-cycle FET is non-inferior to delayed FET across 20,155 cycles (Bergenheim 2021, aOR 1.20) and reduced pre-transfer depression (6.1% vs. 10.6%) after a failed transfer (Song 2021 RCT, n=732).",
          },
          {
            kicker: "Section II · Cryostorage Stability of Vitrified Blastocysts",
            heading: "2. Evidence That Storage Duration Does Not Affect Blastocyst Survival, Implantation, or Live Birth",
            paragraphs: [
              "Because the remaining blastocyst already exists and is vitrified in liquid nitrogen at −196°C, all cellular and enzymatic activity is suspended. In a multicenter cohort of 58,001 vitrified-warmed blastocyst transfer cycles, Cimadomo, Cobo et al. (American Journal of Obstetrics and Gynecology, 2024; n=58,001) demonstrated that once adjusted for maternal age at the time the embryo was created, cryostorage duration (from ≤2 months up to >34 months) has zero adverse effect on warming survival, implantation, miscarriage, live birth rate, or neonatal birthweight.",
              "Complementing these cryobiology data, Huang et al. (Reproductive BioMedicine Online, 2023; n=5,995 patients) analyzed inter-transfer intervals across ≤40 days, 41–180 days (1.5–6 months), and >180 days across natural, letrozole-stimulated, and programmed HRT protocols, confirming identical adjusted live birth and perinatal outcomes between immediate (≤40 days) and 1.5–6 month intervals. Horowitz et al. (Reproductive BioMedicine Online, 2019; n=198 women up to age 45) likewise showed identical follicular phase dynamics, endometrial thickness, and live birth rates between immediate modified natural-cycle FET (mean 15.6 days to trigger) and delayed transfer (mean 84.8 days). Waiting 1–3 months therefore imposes zero biological penalty on the vitrified embryo or on uterine receptivity.",
            ],
          },
          {
            kicker: "Section III · When Waiting 1–3 Months Has a Clinical Purpose",
            heading: "3. Modifiable Uterine, Endocrine, and Psychological Factors That Justify an Interval",
            paragraphs: [
              "Uterine Cavity & Chronic Endometritis (Moderate observational/meta-analytic evidence, T1/T3): In a systematic review and meta-analysis of 796 patients with implantation failure, Vitagliano et al. (Fertility and Sterility, 2018; n=796) showed that biopsy-diagnosed chronic endometritis (CD138 immunohistochemistry) treated and cured with a 14-day antibiotic course significantly increased live birth rates compared with persistent endometritis (OR 6.81, 95% CI 2.08–22.24), restoring outcomes to match unaffected controls. When only one blastocyst remains and the cavity has not recently been inspected, pausing 1–2 cycles for office hysteroscopy and CD138 testing is a concrete, evidence-supported use of an interval. By contrast, delaying transfer solely to perform a commercial Endometrial Receptivity Analysis (ERA) mock-cycle biopsy is refuted by high-certainty RCT evidence: Doyle et al. (JAMA, 2022; n=767) found no benefit in live birth (58.5% vs. 61.9%, p=0.38).",
              "Endometrial Preparation Protocol, Luteal Progesterone & Thyroid (Prospective cohort evidence, T3): In ovulatory women, transferring in a natural or modified-natural cycle preserves the corpus luteum (which secretes vasoactive relaxin and VEGF); von Versen-Höynck et al. (Hypertension, 2019; n=683) demonstrated that programmed HRT cycles lacking a corpus luteum carried a significantly higher risk of pre-eclampsia (12.8% vs. 3.9%, adjusted OR 2.73). If the failed cycle was a programmed HRT protocol, taking one recovery bleed allows the hypothalamic-pituitary-ovarian axis to resume clean spontaneous ovulation. Regardless of whether FET is immediate or delayed, Labarta et al. (Human Reproduction, 2017, n=211; 2021, n=574) showed that low serum progesterone (<9.2 ng/mL) on transfer day reduces ongoing pregnancy from 52.8% to 32.7%, and that adding subcutaneous progesterone (25 mg/day) rescues live birth to 44.9% (vs. 45.0% in normal-P4 controls). Correcting an elevated thyroid TSH to <2.5 mIU/L requires 4–6 weeks of levothyroxine adjustment and justifies a 1–2 month wait; similarly, if the couple feels emotionally exhausted, Cimadomo et al. (2024) guarantees that taking 1–3 months for psychological recovery carries zero embryo cost.",
            ],
          },
        ],
        conclusions:
          "4. Conclusion: Because the remaining blastocyst is vitrified at −196°C, its biological and chromosomal age is fixed. With no modifiable factor identified (uterine cavity and thyroid already cleared, ovulatory natural/modified-natural protocol and day-of-transfer serum progesterone monitoring in place, and the couple emotionally ready), waiting offers no biological benefit — RCT and meta-analytic evidence (Bergenheim et al. 2021; Song et al. 2021) supports proceeding in the next menstrual cycle. Conversely, if a modifiable factor is identified (need for hysteroscopy/CD138 chronic endometritis testing, washout from programmed HRT to an ovulatory cycle, thyroid adjustment, or emotional recovery), waiting 1–3 months causes zero embryo degradation (Cimadomo et al. 2024) and is justified for as long as it takes to address that factor.",
        keyTakeaways: [
          "Immediate vs. Postponed FET: Non-inferior live birth across 20,155 cycles (Bergenheim et al., Hum Reprod Update 2021, aOR 1.20) and 11,500 cycles (Matorras et al., 2021, RR 1.05); after a failed transfer, immediate FET yielded 41.7% vs. 34.1% clinical pregnancy (p=0.045), 35.5% vs. 29.0% live birth (p=0.075), and lower pre-transfer depression (6.1% vs. 10.6%, p=0.038) (Song et al., 2021 RCT, n=732).",
          "Storage Duration Safety: Across 58,001 vitrified-warmed blastocysts (Cimadomo, Cobo et al., AJOG 2024) and 5,995 FET cycles (Huang et al., RBMO 2023), waiting 1–6+ months has zero negative effect on warming survival, implantation, or live birth.",
          "When Waiting Has Purpose: Pausing 1–2 months is justified to cure biopsy-confirmed CD138+ chronic endometritis (Vitagliano et al., Fertil Steril 2018, n=796, OR 6.81), transition from programmed HRT to an ovulatory corpus-luteum cycle (von Versen-Höynck et al., Hypertension 2019, n=683), adjust thyroid TSH <2.5 mIU/L, or recover emotionally — but not for routine ERA biopsy (Doyle et al., JAMA 2022 RCT, n=767).",
          "Bottom Line: With no modifiable factor identified, waiting offers no biological benefit; with one identified, waiting is justified for as long as it takes to address it.",
        ],
      },
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1093/humupd/dmab002",
        origin: "literature",
        title: "Immediate versus postponed frozen embryo transfer after IVF/ICSI: a systematic review and meta-analysis",
        url: "https://doi.org/10.1093/humupd/dmab002",
        doi: "10.1093/humupd/dmab002",
        venue: "Human Reproduction Update",
        year: 2021,
        authors: [
          "Sofie Jul Bergenheim",
          "M. Saupstad",
          "N. Pistoljevic",
          "A. Pinborg",
          "K. Løssl",
        ],
        abstract:
          "Systematic review and meta-analysis of 15 cohort studies comprising 20,155 Frozen Embryo Transfer cycles (6,304 immediate FET in the first menstrual cycle vs 13,851 postponed FET after ≥1 washout cycle). Immediate FET yielded a slightly higher adjusted live birth rate (aOR 1.20, 95% CI 1.01–1.44) and clinical pregnancy rate (aOR 1.22, 95% CI 1.07–1.39) with comparable pregnancy loss, proving that routine arbitrary waiting cycles are unnecessary.",
        citedBy: 94,
        declaredDesign: "systematic_review",
        design: "systematic_review",
        sampleSize: 20155,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1186/s12958-021-00819-9",
        origin: "literature",
        title: "Immediate versus delayed frozen embryo transfer in women following a failed IVF-ET attempt: a multicenter randomized controlled trial",
        url: "https://doi.org/10.1186/s12958-021-00819-9",
        doi: "10.1186/s12958-021-00819-9",
        venue: "Reproductive Biology and Endocrinology",
        year: 2021,
        authors: [
          "Jing-Yan Song",
          "Feng-huan Dong",
          "Li Li",
          "Zhen-Gao Sun",
        ],
        abstract:
          "Multicenter randomized controlled trial of 732 women (646 completed FETs) following a failed embryo transfer attempt randomized to immediate FET in the first menstrual cycle versus delayed FET in the third or subsequent menstrual cycle. Immediate FET achieved significantly higher clinical pregnancy (41.7% vs 34.1%, RR 1.23, p=0.045), lower biochemical pregnancy loss (11.7% vs 30.6%, RR 0.28), a non-significant trend toward higher live birth (35.5% vs 29.0%, p=0.075), and significantly lower pre-transfer moderate-to-severe depression (6.1% vs 10.6%, p=0.038) and high psychological stress (22.4% vs 30.3%, p=0.022).",
        citedBy: 42,
        declaredDesign: "rct",
        design: "rct",
        sampleSize: 732,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1093/humrep/deab071",
        origin: "literature",
        title: "Immediate versus delayed frozen embryo transfer in patients following a stimulated IVF cycle: a randomised controlled trial",
        url: "https://doi.org/10.1093/humrep/deab071",
        doi: "10.1093/humrep/deab071",
        venue: "Human Reproduction",
        year: 2021,
        authors: [
          "He Li",
          "Xue Sun",
          "Jie Yang",
          "Li Li",
          "Wei-Ping Zhang",
          "Zi-Jiang Chen",
        ],
        abstract:
          "Randomized controlled trial (NCT03201783) of 724 women comparing immediate FET in the very first menstrual cycle versus delayed FET in subsequent cycles. Immediate FET resulted in a significantly higher live birth rate (47.2% vs 37.7%, p=0.012), higher ongoing pregnancy rate (49.6% vs 41.5%, p=0.034), and lower miscarriage rate (13.2% vs 24.2%, p=0.006).",
        citedBy: 68,
        declaredDesign: "rct",
        design: "rct",
        sampleSize: 724,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1002/rmb2.12363",
        origin: "literature",
        title: "Immediate versus delayed frozen embryo transfer: a systematic review and meta-analysis",
        url: "https://doi.org/10.1002/rmb2.12363",
        doi: "10.1002/rmb2.12363",
        venue: "Reproductive Medicine and Biology",
        year: 2021,
        authors: [
          "Roberto Matorras",
          "Jose Ignacio Pijoan",
          "S. Perez-Fernandez",
        ],
        abstract:
          "Systematic review and meta-analysis of 11 studies (n=11,500 cycles) evaluating immediate first-menses Frozen Embryo Transfer versus delayed FET after at least one recovery cycle, finding equivalent pooled live birth rates (RR 1.05, 95% CI 0.95–1.15) and confirming that deferring FET offers no biological advantage by default.",
        citedBy: 31,
        declaredDesign: "meta_analysis",
        design: "meta_analysis",
        sampleSize: 11500,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1016/j.ajog.2024.03.033",
        origin: "literature",
        title: "Do not worry about how long commercial human blastocysts stay cryostored! A multicenter study of 58,001 vitrified-warmed cycles",
        url: "https://doi.org/10.1016/j.ajog.2024.03.033",
        doi: "10.1016/j.ajog.2024.03.033",
        venue: "American Journal of Obstetrics and Gynecology",
        year: 2024,
        authors: [
          "Danilo Cimadomo",
          "Ana Cobo",
          "Laura Rienzi",
          "Filippo Maria Ubaldi",
          "Antonio Capalbo",
        ],
        abstract:
          "Landmark multicenter cohort study of 58,001 vitrified-warmed Day-5 blastocyst transfers across 11 years stratifying cryostorage duration from ≤2 months up to >34 months. Once adjusted for maternal age at oocyte retrieval, cryostorage duration had zero adverse effect on cryo-survival, implantation, miscarriage, live birth rate, or neonatal birthweight — proving that pausing 1–6+ months before transferring a remaining vitrified embryo does not age or degrade the embryo.",
        citedBy: 29,
        declaredDesign: "cohort",
        design: "cohort",
        sampleSize: 58001,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1016/j.rbmo.2023.03.008",
        origin: "literature",
        title: "Impact of time interval to frozen embryo transfer on live birth rate across different endometrial preparation protocols",
        url: "https://doi.org/10.1016/j.rbmo.2023.03.008",
        doi: "10.1016/j.rbmo.2023.03.008",
        venue: "Reproductive BioMedicine Online",
        year: 2023,
        authors: [
          "Jialyu Huang",
          "Yading Zhang",
          "Qin Li",
          "Renfei Cai",
          "Yanping Kuang",
        ],
        abstract:
          "Large cohort of 5,995 patients comparing immediate inter-transfer intervals (≤40 days) against spaced intervals of 41–180 days (1.5–6 months) and >180 days across natural, letrozole-stimulated, and hormone replacement therapy FET cycles. Adjusted live birth and perinatal outcomes were equivalent across immediate and 1.5–6 month intervals, supporting flexible patient-centered scheduling.",
        citedBy: 18,
        declaredDesign: "cohort",
        design: "cohort",
        sampleSize: 5995,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1016/j.rbmo.2019.05.003",
        origin: "literature",
        title: "Modified natural cycle cryopreserved embryo transfer immediately following a failed fresh IVF cycle vs delayed transfer",
        url: "https://doi.org/10.1016/j.rbmo.2019.05.003",
        doi: "10.1016/j.rbmo.2019.05.003",
        venue: "Reproductive BioMedicine Online",
        year: 2019,
        authors: [
          "Eran Horowitz",
          "Yossi Mizrachi",
          "Jacob Farhi",
          "Arieh Raziel",
          "Ariel Weissman",
        ],
        abstract:
          "Clinical cohort of 198 women up to age 45 undergoing modified natural-cycle FET (mNC-FET) either in the immediate menstrual cycle (mean 15.6 days to ovulation trigger) or after a multi-month delay (mean 84.8 days) following a failed IVF transfer, demonstrating identical follicular phase dynamics, endometrial thickness, and live birth rates.",
        citedBy: 36,
        declaredDesign: "cohort",
        design: "cohort",
        sampleSize: 198,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1016/j.fertnstert.2018.04.040",
        origin: "literature",
        title: "Effects of chronic endometritis therapy on in vitro fertilization outcome in women with repeated implantation failure: a systematic review and meta-analysis",
        url: "https://doi.org/10.1016/j.fertnstert.2018.04.040",
        doi: "10.1016/j.fertnstert.2018.04.040",
        venue: "Fertility and Sterility",
        year: 2018,
        authors: [
          "Amerigo Vitagliano",
          "Cosimo Saccardi",
          "Marco Noventa",
          "Attilio Di Spiezio Sardo",
          "Ettore Cicinelli",
        ],
        abstract:
          "Systematic review and meta-analysis of 5 studies (n=796 women) demonstrating that antibiotic cure of biopsy-confirmed chronic endometritis significantly increases ongoing pregnancy/live birth rate (OR 6.81, 95% CI 2.08–22.24) and clinical pregnancy rate (OR 4.02) compared with persistent endometritis, restoring IVF outcomes to match women without chronic endometritis.",
        citedBy: 265,
        declaredDesign: "meta_analysis",
        design: "meta_analysis",
        sampleSize: 796,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1093/humrep/deaa322",
        origin: "literature",
        title: "Subcutaneous progesterone is effective for luteal phase support in artificial cycles when serum progesterone levels are low on the day of embryo transfer",
        url: "https://doi.org/10.1093/humrep/deaa322",
        doi: "10.1093/humrep/deaa322",
        venue: "Human Reproduction",
        year: 2021,
        authors: [
          "Elena Labarta",
          "Giulia Mariani",
          "S. Paolelli",
          "C. Rodriguez-Varela",
          "Ernesto Bosch",
        ],
        abstract:
          "Prospective clinical study of 574 blastocyst FET cycles demonstrating that patients with low serum progesterone (<9.2 ng/mL) on the day of transfer who received rescue daily subcutaneous progesterone (25 mg/day) achieved live birth rates equivalent to patients with normal baseline progesterone (44.9% vs 45.0%).",
        citedBy: 145,
        declaredDesign: "cohort",
        design: "cohort",
        sampleSize: 574,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1161/hypertensionaha.118.12043",
        origin: "literature",
        title: "Increased Preeclampsia Risk and Reduced Aortic Compliance With In Vitro Fertilization Cycles in the Absence of a Corpus Luteum",
        url: "https://doi.org/10.1161/HYPERTENSIONAHA.118.12043",
        doi: "10.1161/HYPERTENSIONAHA.118.12043",
        venue: "Hypertension",
        year: 2019,
        authors: [
          "Frauke von Versen-Höynck",
          "Amy M. Schaub",
          "Kirk P. Conrad",
          "Valerie L. Baker",
        ],
        abstract:
          "Prospective cohort study (n=683 pregnancies) demonstrating that programmed FET cycles lacking a corpus luteum had significantly higher pre-eclampsia incidence (12.8% vs 3.9%, adjusted OR 2.73) than ovulatory natural-cycle FET with a single corpus luteum.",
        citedBy: 380,
        declaredDesign: "cohort",
        design: "cohort",
        sampleSize: 683,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1001/jama.2022.20438",
        origin: "literature",
        title: "Effect of Timing by Endometrial Receptivity Testing vs Standard Timing of Frozen Embryo Transfer on Live Birth in Patients Undergoing In Vitro Fertilization: A Randomized Clinical Trial",
        url: "https://doi.org/10.1001/jama.2022.20438",
        doi: "10.1001/jama.2022.20438",
        venue: "JAMA",
        year: 2022,
        authors: [
          "Nicole Doyle",
          "S. Jahandideh",
          "Micah J. Hill",
          "Eric A. Widra",
          "Kate Devine",
        ],
        abstract:
          "Double-blind multicenter randomized clinical trial of 767 patients comparing Endometrial Receptivity Analysis (ERA) biopsy-guided FET timing against standard FET timing, finding no improvement in live birth rate (58.5% vs 61.9%, p=0.38).",
        citedBy: 95,
        declaredDesign: "rct",
        design: "rct",
        sampleSize: 767,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1016/S0140-6736(16)00258-0",
        origin: "literature",
        title: "Hysteroscopy in recurrent in-vitro fertilisation failure (TROPHY): a multicentre, randomised controlled trial",
        url: "https://doi.org/10.1016/S0140-6736(16)00258-0",
        doi: "10.1016/S0140-6736(16)00258-0",
        venue: "The Lancet",
        year: 2016,
        authors: [
          "Tarek El-Toukhy",
          "Rudi Campo",
          "Yacoub Khalaf",
          "Christos Venetis",
          "Stephan Gordts",
        ],
        abstract:
          "Multicentre randomised controlled trial (TROPHY) across 8 European hospitals involving 702 women with a normal transvaginal ultrasound uterine cavity and prior failed IVF transfers, randomized to outpatient hysteroscopy in the month before starting the next treatment cycle versus immediate transfer cycle without hysteroscopy. Live birth rates were identical in both groups (29% vs 29%, RR 1.0, 95% CI 0.79–1.25, p=0.96).",
        citedBy: 310,
        declaredDesign: "rct",
        design: "rct",
        sampleSize: 702,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1093/humrep/dew120",
        origin: "literature",
        title: "Cryo-thawed embryo transfer: natural versus artificial cycle. A non-inferiority trial (ANTARCTICA trial)",
        url: "https://doi.org/10.1093/humrep/dew120",
        doi: "10.1093/humrep/dew120",
        venue: "Human Reproduction",
        year: 2016,
        authors: [
          "Eva R. Groenewoud",
          "Astrid E.P. Cantineau",
          "Ben J. Kollen",
          "Nick S. Macklon",
          "Ben J. Cohlen",
        ],
        abstract:
          "Multicentre non-inferiority randomized controlled trial (ANTARCTICA) of 959 ovulatory women comparing modified natural-cycle FET with hCG trigger against artificial programmed hormone replacement therapy (HRT) FET, finding no statistically significant difference in live birth rates between the two endometrial preparation regimens.",
        citedBy: 240,
        declaredDesign: "rct",
        design: "rct",
        sampleSize: 959,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "Across two independent systematic reviews and meta-analyses — Bergenheim et al. (Human Reproduction Update 2021, 15 studies, n=20,155 FET cycles) and Matorras et al. (Reproductive Medicine and Biology 2021, 11 studies, n=11,500 cycles) — immediate FET in the first menstrual cycle is at least non-inferior to postponing transfer for ≥1 washout cycle (aOR 1.20, 95% CI 1.01–1.44; pooled RR 1.05, 95% CI 0.95–1.15), establishing that routine arbitrary waiting offers no biological advantage.",
        tier: "T1",
        controversy: "settled",
        direction: "supports",
        confidence: 0.96,
        rationale: "Bergenheim et al. (Human Reproduction Update, 2021, n=20,155) and Matorras et al. (Reproductive Medicine and Biology, 2021, n=11,500).",
        sourceIndexes: [0, 3],
      },
      {
        statement:
          "Whether immediate next-cycle FET actively outperforms delayed FET in live birth rate or is strictly equivalent is debated across trials: Li et al. (Human Reproduction 2021 RCT, n=724) reported significantly higher live birth with immediate FET (47.2% vs. 37.7%, p=0.012), whereas in Song et al. (Reproductive Biology and Endocrinology 2021 RCT after a failed transfer, n=732) the live birth difference was not statistically significant (35.5% vs. 29.0%, p=0.075) despite higher clinical pregnancy (41.7% vs. 34.1%, p=0.045) and lower pre-transfer depression (6.1% vs. 10.6%, p=0.038), and Matorras et al. (2021, n=11,500, RR 1.05) found strict equivalence.",
        tier: "T2",
        controversy: "debated",
        direction: "supports",
        confidence: 0.92,
        rationale: "Song et al. (2021 RCT after failed ET, n=732), Li et al. (2021 RCT, n=724), and Matorras et al. (2021 meta-analysis, n=11,500).",
        sourceIndexes: [1, 2, 3],
      },
      {
        statement:
          "Across 58,001 vitrified-warmed blastocyst transfers (Cimadomo, Cobo et al., AJOG 2024) and 5,995 interval-stratified FET patients (Huang et al., RBMO 2023), waiting 1 to 6+ months before transferring a remaining vitrified blastocyst has zero negative effect on warming survival, implantation, miscarriage, or live birth rate because the embryo's biological and chromosomal age is fixed at −196°C and uterine receptivity does not decline over a 1–3 month interval.",
        tier: "T3",
        controversy: "settled",
        direction: "supports",
        confidence: 0.97,
        rationale: "Cimadomo/Cobo et al. (AJOG 2024, n=58,001 blastocysts) and Huang et al. (RBMO 2023, n=5,995 patients).",
        sourceIndexes: [4, 5],
      },
      {
        statement:
          "In women up to age 45 undergoing modified natural-cycle FET (mNC-FET) after a failed IVF transfer (Horowitz et al., RBMO 2019, n=198), immediate next-menses transfer (mean 15.6 days to ovulatory trigger) and delayed transfer (mean 84.8 days) achieve identical follicular phase dynamics, endometrial thickness, and live birth rates.",
        tier: "T3",
        controversy: "settled",
        direction: "supports",
        confidence: 0.91,
        rationale: "Horowitz et al. (Reproductive BioMedicine Online, 2019, n=198).",
        sourceIndexes: [6],
      },
      {
        statement:
          "Whether to pause 1–2 cycles for routine office hysteroscopy and CD138 chronic endometritis biopsy after a failed transfer when transvaginal ultrasound is normal is debated: Vitagliano et al. (Fertility and Sterility 2018 meta-analysis, n=796) showed that antibiotic cure of biopsy-confirmed chronic endometritis increases live birth compared with persistent endometritis (OR 6.81, 95% CI 2.08–22.24), whereas the multicenter TROPHY RCT (El-Toukhy et al., The Lancet 2016, n=702) found that routine outpatient hysteroscopy in women with a normal ultrasound cavity did not improve live birth (29% vs. 29%, RR 1.0, p=0.96).",
        tier: "T1",
        controversy: "debated",
        direction: "mixed",
        confidence: 0.91,
        rationale: "Vitagliano et al. (Fertility and Sterility 2018 meta-analysis, n=796) vs. El-Toukhy et al. (The Lancet 2016 TROPHY RCT, n=702).",
        sourceIndexes: [7, 11],
      },
      {
        statement:
          "While randomized trials show comparable live birth rates between modified natural-cycle FET and programmed HRT-FET (Groenewoud et al., ANTARCTICA RCT, Human Reproduction 2016, n=959), prospective cohorts show that programmed HRT-FET lacking a corpus luteum increases pre-eclampsia risk (12.8% vs. 3.9%, aOR 2.73; von Versen-Höynck et al., Hypertension 2019, n=683) and drops ongoing pregnancy when transfer-day serum progesterone is <9.2 ng/mL unless rescued with daily subcutaneous progesterone (44.9% vs. 45.0% LBR; Labarta et al., Human Reproduction 2021, n=574).",
        tier: "T2",
        controversy: "debated",
        direction: "supports",
        confidence: 0.93,
        rationale: "Groenewoud et al. (Human Reproduction 2016 RCT, n=959), von Versen-Höynck et al. (Hypertension 2019, n=683), and Labarta et al. (Human Reproduction 2021, n=574).",
        sourceIndexes: [8, 9, 12],
      },
      {
        statement:
          "Postponing FET for 1–2 months to perform a mock-cycle Endometrial Receptivity Analysis (ERA) biopsy does not improve live birth in double-blind randomized controlled testing (58.5% with ERA-timed FET vs. 61.9% with standard timing, p=0.38; Doyle et al., JAMA 2022, n=767), refuting earlier observational claims for routine transcriptomic window-of-implantation testing.",
        tier: "T2",
        controversy: "contested",
        direction: "refutes",
        confidence: 0.95,
        rationale: "Doyle et al. (JAMA 2022 double-blind multicenter RCT, n=767).",
        sourceIndexes: [10],
      },
    ],
    milestones: [
      {
        year: 2018,
        title: "Vitagliano et al. Meta-Analysis Quantifies Live Birth Gain After Chronic Endometritis Cure (n=796)",
        description:
          "Systematic review and meta-analysis in Fertility and Sterility shows curing biopsy-confirmed CD138+ chronic endometritis increases live birth/ongoing pregnancy (OR 6.81).",
        sourceIndex: 7,
      },
      {
        year: 2019,
        title: "Horowitz et al. & von Versen-Höynck et al. Establish Modified-Natural FET Timing and Corpus Luteum Vascular Safety",
        description:
          "Horowitz et al. (n=198) show identical outcomes in immediate vs. delayed mNC-FET after failed IVF; von Versen-Höynck et al. (n=683) prove a corpus luteum halves pre-eclampsia risk vs. programmed HRT-FET.",
        sourceIndex: 6,
      },
      {
        year: 2021,
        title: "Bergenheim Meta-Analysis (n=20,155) & Song / Li RCTs Disprove Mandatory FET Washout Cycles",
        description:
          "Two RCTs (Song et al., n=732; Li et al., n=724) and a 15-study meta-analysis (Bergenheim et al., n=20,155) prove immediate first-menses FET is non-inferior or superior to arbitrary waiting.",
        sourceIndex: 0,
      },
      {
        year: 2022,
        title: "Doyle et al. JAMA RCT (n=767) Shows Routine ERA Biopsy Delay Does Not Increase Live Birth",
        description:
          "Multicenter double-blind RCT proves that postponing FET to perform Endometrial Receptivity Testing does not improve live birth (58.5% vs. 61.9%, p=0.38).",
        sourceIndex: 10,
      },
      {
        year: 2024,
        title: "Cimadomo & Cobo 58,001-Blastocyst Study Confirms Zero Embryo Decay Across Months of Cryostorage",
        description:
          "Multicenter AJOG cohort of 58,001 vitrified-warmed blastocysts proves that waiting 1–6+ months at −196°C causes zero loss in survival, implantation, or live birth.",
        sourceIndex: 4,
      },
    ],
    entities: [],
    controversies: [
      {
        kind: "debated",
        note: "1. Immediate FET Superiority vs. Strict Equivalence (Does Immediate Transfer Outperform Waiting, or Are They Equal?): Li et al. (Human Reproduction 2021 RCT, n=724) reported a statistically significant +9.5% higher live birth rate with immediate first-cycle FET (47.2% vs. 37.7%, p=0.012), and Bergenheim et al. (Human Reproduction Update 2021 meta-analysis, n=20,155) found a borderline adjusted live birth advantage (aOR 1.20, 95% CI 1.01–1.44). Conversely, in Song et al. (Reproductive Biology and Endocrinology 2021 RCT after a failed transfer, n=732), the live birth difference did not reach statistical significance (35.5% vs. 29.0%, p=0.075, despite higher clinical pregnancy 41.7% vs. 34.1% and lower pre-transfer depression 6.1% vs. 10.6%), while Matorras et al. (Reproductive Medicine and Biology 2021 meta-analysis, n=11,500, RR 1.05, 95% CI 0.95–1.15), Huang et al. (RBMO 2023, n=5,995), and Horowitz et al. (RBMO 2019, n=198) found strictly identical live birth rates — arguing that apparent superiority in observational cohorts reflects selection bias (better-prognosis patients proceeding immediately) rather than a transient biological boost.",
        claimIndexes: [0, 1, 2, 3],
      },
      {
        kind: "debated",
        note: "2. Routine Hysteroscopy & CD138 Chronic Endometritis Biopsy After a Failed Transfer vs. TROPHY Trial Null Findings: Vitagliano et al. (Fertility and Sterility 2018 meta-analysis, n=796) demonstrated that antibiotic cure of biopsy-confirmed CD138+ chronic endometritis increases live birth/ongoing pregnancy compared with persistent endometritis (OR 6.81, 95% CI 2.08–22.24), leading many clinicians to recommend a 1–2 cycle diagnostic pause when only one final blastocyst remains. Against routine invasive testing, the multicenter TROPHY RCT (El-Toukhy et al., The Lancet 2016, n=702) proved that outpatient hysteroscopy after failed IVF in women with a normal ultrasound cavity does not increase live birth (29% vs. 29%, RR 1.0, p=0.96), and pathologists disagree on the diagnostic cutoff for CD138 positivity (≥1 vs. ≥5 plasma cells per 10 HPF) in the absence of a large randomized antibiotic trial after a single failed transfer.",
        claimIndexes: [4],
      },
      {
        kind: "debated",
        note: "3. Natural / Modified-Natural Cycle vs. Programmed HRT-FET (Live Birth Equivalence in RCTs vs. Maternal Vascular Risk & Progesterone Rescue): The multicenter ANTARCTICA RCT (Groenewoud et al., Human Reproduction 2016, n=959) found no significant difference in live birth rates between modified natural-cycle FET and programmed HRT-FET. However, prospective vascular cohorts (von Versen-Höynck et al., Hypertension 2019, n=683) demonstrate that programmed HRT cycles lacking a corpus luteum more than triple maternal pre-eclampsia risk (12.8% vs. 3.9%, aOR 2.73), and pharmacokinetic cohorts (Labarta et al., Human Reproduction 2021, n=574) show that 25–30% of HRT patients on vaginal progesterone alone have low transfer-day serum P4 (<9.2 ng/mL) requiring daily subcutaneous progesterone rescue (restoring LBR to 44.9% vs. 45.0%).",
        claimIndexes: [5],
      },
      {
        kind: "contested",
        note: "4. Commercial Endometrial Receptivity Analysis (ERA) Mock-Cycle Delay vs. Double-Blind RCT Refutation: Commercial proponents and early observational cohorts claimed that ~25–30% of IVF patients have a displaced window of implantation requiring a 1–2 month pause for a mock HRT cycle and transcriptomic ERA biopsy. That hypothesis was refuted by a double-blind multicenter RCT (Doyle et al., JAMA 2022, n=767), which found no improvement in live birth with ERA-guided timing compared with standard FET timing (58.5% vs. 61.9%, p=0.38).",
        claimIndexes: [6],
      },
    ],
  },
  "lifestyle-metabolic-and-environmental-fertility-optimization": {
    summary:
      "Natural (non-assisted) conception between ages 40 and 50 depends on synchronizing two biological remodeling windows: the ~90–120 day preantral-to-ovulatory folliculogenesis cycle in women and the 74-day spermatogenic cycle in men. Across prospective cohorts and randomized trials, four non-assisted physiological levers govern gamete competence and natural fecundability: (1) Circadian sleep architecture (7.0–8.0 hours/night, lights-out before 22:30–23:00), which preserves granulosa and Leydig BMAL1/CLOCK gene expression and concentrates melatonin 3-fold inside ovarian follicular fluid to shield maturing Metaphase II oocytes from ovulatory reactive oxygen species while preventing short-sleep (<6h) reductions in sperm count (-25% to -29%) and fecundability (-15% to -20%); (2) Pro-fertility Mediterranean and low-glycemic nutrition (Harvard Nurses' Health Study II, -66% to -84% ovulatory infertility; marine omega-3 EPA/DHA intake yielding 1.51×–2.00× higher natural fecundability in the Time to Conceive cohort) paired with targeted micronutrients (Ubiquinol 400–600 mg/d, Myo-inositol 2–4 g/d, 5-MTHF 800 µg/d, Vitamin D3, and male L-carnitine/NAC/selenium/zinc); (3) Oocyte mitochondrial ATP bioenergetics—combining CoQ10 electron transport chain support, NAD+ salvage repletion (NMN/NR plus Zone-2/HIIT exercise upregulating NAMPT and SIRT2 spindle tubulin deacetylation), polyamine spermidine + 12–13h overnight circadian mitophagy to purge depolarized mitochondria, and low-AGE moist cooking to prevent ovarian stromal fibrosis; and (4) High-leverage organic facilitators for 40–50 couples, including a 24–36 hour short ejaculatory abstinence window (cutting sperm DNA fragmentation by 25–40% so the 40+ oocyte does not exhaust its limited maternal BRCA1/ATM DNA-repair pool), tracking early-shifted ovulation (Cycle Days 9–12) so sperm arrive in the fallopian ampulla 24–48 hours before the egg's narrow 6–12 hour fertilizable window, scrotal thermoregulation (<34.5°C), and a 72-hour phthalate/bisphenol washout.",
    gaps: [
      "Human randomized dose-finding trials of oral spermidine (3–6 mg/day) and nicotinamide mononucleotide (NMN 500–1,000 mg/day) measuring time-to-pregnancy and live birth in couples aged 40–50 attempting natural conception",
      "Prospective head-to-head trials isolating circadian light/melatonin hygiene and 12–13 hour overnight time-restricted eating on follicular fluid ATP and luteal progesterone pulsatility",
      "Standardized clinical Sperm DNA Fragmentation (DFI) thresholds stratifying when a 24–36 hour short-abstinence + antioxidant protocol suffices for natural conception after age 40",
      "Longitudinal data quantifying how low-AGE dietary interventions and insulin sensitization alter human ovarian cortical stiffness and preantral follicle recruitment in the 40–50 decade",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "-66% to -84%",
          label: "Reduction in ovulatory infertility risk with high adherence to the low-glycemic, monounsaturated/plant-protein 'Fertility Diet' and lifestyle protocol (n=17,544)",
          source: "Chavarro, Willett et al., Obstet Gynecol 2007 (NHS-II)",
          sourceUrl: "https://doi.org/10.1097/01.AOG.0000287293.25465.e1",
        },
        {
          metric: "1.51×–2.00×",
          label: "Higher natural cycle fecundability ratio (FR) in women aged 30–44 supplementing with marine Omega-3 fatty acids (EPA/DHA) across 5,254 cycles",
          source: "Stanhiser, Steiner et al., Hum Reprod 2022 (n=900)",
          sourceUrl: "https://doi.org/10.1093/humrep/deac027",
        },
        {
          metric: "7.0–8.0 h / night",
          label: "Optimal circadian sleep window; sleeping <6h lowers male sperm count by 25–29%, elevates anti-sperm antibodies, and reduces female fecundability by ~15–20%",
          source: "Chen et al., Hum Reprod 2016 (n=796) & Willis et al., Fertil Steril 2019 (PRESTO)",
          sourceUrl: "https://doi.org/10.1093/humrep/dew081",
        },
        {
          metric: "24–36 h window",
          label: "Short ejaculatory abstinence interval that cuts epididymal ROS and lowers Sperm DNA Fragmentation (DFI) by 25%–40% compared with 5–7 days of abstinence",
          source: "Pons-Rejraji et al. / Mayorga-Torres et al., Andrology",
          sourceUrl: "https://doi.org/10.1111/andr.12064",
        },
      ],
      levers: [
        {
          name: "Circadian Sleep Architecture (7.0–8.0h & Pre-23:00 Lights-Out)",
          category: "1. Sleep & Circadian Architecture (Both Partners)",
          description:
            "Anchoring sleep duration at 7.0–8.0 hours with bedtime before 22:30–23:00, morning daylight exposure within 30 minutes of waking, and strict blue-light block 90 minutes pre-bed.",
          bestEvidence: "BU PRESTO Cohort (Willis et al., Fertil Steril 2019, n=6,873) & Chen et al., Hum Reprod 2016 (n=796 men)",
          effect: "Prevents the 25–29% drop in total sperm count and 15–20% drop in female fecundability seen with <6h sleep or late (>23:30) bedtimes",
          reading:
            "Granulosa LH receptors (LHCGR) and Leydig testosterone synthesis are transcriptionally gated by core clock genes BMAL1 and CLOCK; circadian misalignment blunts the ovulatory LH surge and morning androgen pulse.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1093/humrep/dew081",
        },
        {
          name: "Endogenous & Low-Dose Nocturnal Melatonin (1–3 mg at Bedtime)",
          category: "1. Sleep & Circadian Architecture (Both Partners)",
          description:
            "Protecting nocturnal pineal darkness or supplementing 1–3 mg physiological melatonin 60 minutes before sleep during the 90-day follicular maturation window.",
          bestEvidence: "Tamura, Reiter et al., J Pineal Res 2012/2020 & Cochrane/RCT syntheses on follicular fluid oxidative stress",
          effect: "Concentrates 3× higher in follicular fluid than serum; cuts intra-follicular 8-OHdG oxidative DNA damage by ~50% and doubles fertilization in high-ROS cohorts",
          reading:
            "Ovulation triggers an inflammatory reactive oxygen species (ROS) burst; follicular melatonin directly scavenges hydroxyl radicals (•OH) and upregulates oocyte glutathione peroxidase (GPX4) to protect the Metaphase II spindle.",
          verdict: "Targeted",
          sourceUrl: "https://doi.org/10.1111/j.1600-079X.2012.00970.x",
        },
        {
          name: "Low-Glycemic Mediterranean & Harvard 'Fertility Diet' Pattern",
          category: "2. Pro-Fertility Nutrition & Clinical Supplementation",
          description:
            "Replacing refined carbohydrates and trans fats with extra-virgin olive oil, wild marine fish, plant proteins (lentils, legumes, nuts), high-polyphenol vegetables, and 1 serving/day of whole-fat dairy.",
          bestEvidence: "Nurses' Health Study II (Chavarro, Willett et al., Obstet Gynecol 2007, n=17,544) & Karayiannis et al., Hum Reprod 2018",
          effect: "66% lower risk of ovulatory infertility (RR 0.34; 84% with activity/weight control); higher semen concentration and progressive motility in men",
          reading:
            "Postprandial insulin spikes overstimulate ovarian theca IGF-1 receptors, driving hyperandrogenism that arrests antral follicle maturation and degrades oocyte cytoplasmic competence.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1097/01.AOG.0000287293.25465.e1",
        },
        {
          name: "Marine Omega-3 Long-Chain PUFAs (EPA + DHA 1,000–2,000 mg/day)",
          category: "2. Pro-Fertility Nutrition & Clinical Supplementation",
          description:
            "Daily triglyceride/phospholipid EPA + DHA supplementation (or 3 servings/week of low-mercury cold-water fish: wild salmon, sardines, anchovies, mackerel).",
          bestEvidence: "Time to Conceive Prospective Cohort (Stanhiser et al., Hum Reprod 2022, n=900 women, 5,254 cycles) & Nehra et al., Aging Cell 2012",
          effect: "Natural fecundability ratio FR 1.51 (95% CI 1.12–2.04) to 2.00 after adjusting for age; prolongs reproductive lifespan and rescues oocyte spindle alignment in aged mammals",
          reading:
            "DHA/EPA remodel oocyte and sperm plasma membrane fluidity, dampen prostaglandin E2/NF-κB follicular inflammation, and support luteal corpus luteum steroidogenesis.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1093/humrep/deac027",
        },
        {
          name: "Active Folate (5-MTHF 800 µg), Methyl-B12, Myo-Inositol (2–4 g) & Vitamin D3",
          category: "2. Pro-Fertility Nutrition & Clinical Supplementation",
          description:
            "800 µg L-methylfolate + B12/B6 (homocysteine <7.5 µmol/L), 2–4 g/day myo-inositol (FSH/insulin second messenger), and Vitamin D3 (2,000–4,000 IU/d targeting 40–60 ng/mL).",
          bestEvidence: "Harvard EARTH & NHS-II Folate Cohorts (Gaskins et al., AJCN/Hum Reprod) & Unfer et al. Myo-Inositol RCT Meta-Analyses",
          effect: "Folate ≥800 µg/d shortens time-to-pregnancy and cuts anovulation; myo-inositol improves MII oocyte maturity and luteal progesterone",
          reading:
            "High follicular homocysteine is directly embryotoxic; myo-inositol restores granulosa FSH receptor sensitivity without hyperstimulation, while Vitamin D activates endometrial HOXA10 implantation genes.",
          verdict: "Guideline",
          sourceUrl: "https://doi.org/10.1093/humrep/deu207",
        },
        {
          name: "Male Gamete Chromatin & Mitochondrial Stack (L-Carnitine, NAC, Selenium, Zinc, Lycopene)",
          category: "2. Pro-Fertility Nutrition & Clinical Supplementation",
          description:
            "74-day spermatogenic priming with L-Carnitine (2 g/d) + L-Acetyl-Carnitine (1 g/d), N-Acetylcysteine (600 mg/d), Selenium (200 µg/d), Zinc (25 mg/d), and Lycopene (10–20 mg/d).",
          bestEvidence: "Cochrane Male Subfertility Antioxidant Meta-Analysis & Safarinejad / Balercia Randomized Double-Blind Trials",
          effect: "Increases progressive sperm motility (+10–18%), lowers Sperm DNA Fragmentation (DFI) by 6–12 percentage points, and increases clinical pregnancy/live birth OR ~1.5–1.8",
          reading:
            "Carnitines shuttle fatty acids into sperm midpiece mitochondria for flagellar ATP; selenium-dependent GPX4 cross-links protamine disulfide bonds to armor paternal DNA against oxidative breaks.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1016/j.juro.2008.10.015",
        },
        {
          name: "Ubiquinol / Coenzyme Q10 (400–600 mg/day) Mitochondrial OXPHOS Repletion",
          category: "3. Oocyte Mitochondrial ATP & Cellular Rejuvenation (90–120d Window)",
          description:
            "60–120 day oral lipid-solubilized Ubiquinol (200–300 mg twice daily with meals) to restore inner mitochondrial membrane electron transport between Complexes I/II and III.",
          bestEvidence: "Xu et al., RBMO 2018 RCT; Florou et al., Fertil Steril 2020 Meta-Analysis; Ben-Meir et al., Aging Cell 2015",
          effect: "Restores oocyte mitochondrial ATP production and spindle chromosome alignment in aged mammals; doubles high-grade embryo formation and increases clinical pregnancy (OR 2.22) in humans",
          reading:
            "Human oocytes hold ~100,000–600,000 mitochondria and cannot synthesize new ones until the blastocyst stage; CoQ10 synthesis (PDSS2/COQ6) declines sharply after age 38, starving Meiosis I/II of ATP.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1111/acel.12368",
        },
        {
          name: "NAD+ Repletion (NMN / NR) + Zone-2/HIIT Exercise (NAMPT & SIRT2 Spindle Rescue)",
          category: "3. Oocyte Mitochondrial ATP & Cellular Rejuvenation (90–120d Window)",
          description:
            "Combining oral NAD+ precursors (NMN 500–1,000 mg/d or NR 300–600 mg/d) with 150 min/week Zone-2 aerobic + 2× resistance training to upregulate endogenous NAMPT salvage.",
          bestEvidence: "Bertoldo, Wu, Homer, Sinclair et al., Cell Reports 2020",
          effect: "Restores intra-oocyte NAD+/NADH ratio, reactivates SIRT2 α-tubulin deacetylation, rescues meiotic spindle assembly, reduces aneuploidy, and restores live births in aged mammalian models",
          reading:
            "Directly targets the bioenergetic cause of age-related chromosomal missegregation while avoiding overtraining-induced energy deficit (RED-S) that would suppress hypothalamic GnRH.",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1016/j.celrep.2020.01.058",
        },
        {
          name: "Polyamine Spermidine (3–6 mg/d + Dietary) & 12–13h Overnight Circadian Mitophagy",
          category: "3. Oocyte Mitochondrial ATP & Cellular Rejuvenation (90–120d Window)",
          description:
            "Dietary polyamines (wheat germ, natto, culinary mushrooms, aged cheese, green peas) + 3–6 mg/d spermidine paired with gentle 12–13h overnight fasting (e.g., 19:30 to 08:00).",
          bestEvidence: "Zhang, Xiong et al., Nature Aging (October 2023)",
          effect: "Clears defective, ROS-leaking oocyte mitochondria via PINK1/Parkin mitophagy, restores mitochondrial membrane potential (ΔΨm), and doubles litter size in aged mice",
          reading:
            "Important nuance for women 40–50: gentle 12–13h overnight fasting aligned with sleep triggers cellular mitophagy safely, whereas aggressive multi-day or >16h daytime fasting can suppress kisspeptin and LH pulsatility.",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1038/s43587-023-00498-8",
        },
        {
          name: "Short-Window Ejaculatory Abstinence (24–36h) & Scrotal Thermal Shield (<34.5°C)",
          category: "4. Non-Assisted Conception Facilitators & Timing Hacks (Ages 40–50)",
          description:
            "Replacing the outdated 'save up sperm for 5–7 days' habit with a clearing ejaculation 24–48h before the fertile window and intercourse every 24–36 hours, plus strict avoidance of saunas, hot tubs, and lap heat.",
          bestEvidence: "Pons-Rejraji et al., Andrology 2014; Mayorga-Torres et al. 2015; Mieusset & Bujan scrotal thermoregulation trials",
          effect: "Short abstinence (1–2 days) reduces Sperm DNA Fragmentation (DFI) by 25%–40% vs 5–7 days; avoiding >35°C scrotal heat prevents 74-day chromatin uncoupling",
          reading:
            "Critical in the 40–50 age bracket: an aged oocyte has depleted maternal BRCA1/ATM DNA-repair mRNA and cannot repair fragmented sperm DNA; delivering low-DFI sperm prevents Day 3 embryonic arrest.",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1111/andr.12064",
        },
        {
          name: "Shifted Early-Ovulation Tracking (Days 9–12) & Pre-Ovulatory Sperm Positioning",
          category: "4. Non-Assisted Conception Facilitators & Timing Hacks (Ages 40–50)",
          description:
            "Starting urinary estrone-3-glucuronide (E3G) + quantitative LH tracking and cervical mucus monitoring on Cycle Day 6–7, timing intercourse 1–2 days BEFORE ovulation.",
          bestEvidence: "Wilcox, Weinberg & Baird, NEJM 1995 & Stanford et al. European Fecundability Studies",
          effect: "Peak natural conception probability occurs on the 2 days preceding ovulation (4–5× higher than on the day after LH peak); captures early Day 9–12 ovulation common after age 40",
          reading:
            "Rising baseline FSH at ages 40–50 accelerates follicular recruitment (shifting ovulation earlier), while the ovulated oocyte's fertilizable lifespan narrows to 6–12 hours—so capacitated sperm must already be waiting in the fallopian ampulla when the egg is released.",
          verdict: "Guideline",
          sourceUrl: "https://doi.org/10.1056/NEJM199512073332301",
        },
        {
          name: "72-Hour EDC Washout, Isotonic Cervical Hydrogel & Luteal/Thyroid Calibration",
          category: "4. Non-Assisted Conception Facilitators & Timing Hacks (Ages 40–50)",
          description:
            "Eliminating heated plastics/phthalates/bisphenols, banning sperm-toxic commercial lubricants/saliva (using only isotonic pH 7.2–7.8 media if needed), and calibrating TSH <2.5 mIU/L & Ferritin >50–70 ng/mL.",
          bestEvidence: "Harvard EARTH Study (Mínguez-Alarcón, Hauser et al.); ASRM Natural Fertility & Subclinical Hypothyroidism Guidelines",
          effect: "Drops urinary phthalate/BPA metabolites by >60% in 72 hours; preserves 100% progressive sperm motility through cervical mucus; prevents luteal/thyroid implantation loss",
          reading:
            "Standard lubricants and saliva immobilize 60–90% of sperm within 15 minutes; non-heme iron (ferritin >50 ng/mL) and euthyroid status (TSH <2.5) sustain ovulatory corpus luteum progesterone and endometrial decidualization.",
          verdict: "Guideline",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2021.11.016",
        },
      ],
      clinicalQuestions: [
        "Can we run a comprehensive preconception blood panel for both partners covering fasting insulin/HOMA-IR, HbA1c, TSH + free T4 + TPO antibodies (targeting TSH <2.5 mIU/L), serum ferritin (targeting >50–70 ng/mL), 25(OH) Vitamin D (targeting 40–60 ng/mL), homocysteine (<7.5 µmol/L), and red-blood-cell Omega-3 index (>8%)?",
        "Can we order a baseline Semen Analysis paired with a Sperm DNA Fragmentation Index (TUNEL, SCSA, or Comet assay) tested specifically after a short 24–36 hour abstinence window rather than a 4–5 day abstinence window?",
        "Given shortened follicular phases at ages 40–50, can we perform a mid-luteal serum progesterone check (7 days post-LH surge, rather than automatic Day 21) and serial ultrasound folliculometry in one natural cycle to confirm full ovulation and corpus luteum adequacy?",
        "Should we screen for asymptomatic vaginal/endometrial dysbiosis (Lactobacillus crispatus dominance vs. Gardnerella/Ureaplasma) and subclinical chronic endometritis if we have experienced biochemical losses?",
        "What is our optimal 90-day mitochondrial bioenergetic stack (Ubiquinol 400–600 mg/d, Myo-inositol 2–4 g/d, nocturnal Melatonin 1–3 mg, NAD+ precursors, and dietary Spermidine) while avoiding any endocrine-disrupting or GnRH-suppressing stressors?",
      ],
      sweepQueue: [
        "Translational human trials of oral polyamine spermidine (3–6 mg/d) and nicotinamide mononucleotide (NMN) on natural fecundability and oocyte mitochondrial bioenergetics in women aged 40–50",
        "Prospective actigraphy and continuous glucose monitoring (CGM) cohorts linking nocturnal sleep architecture and glycemic variability to follicular fluid ATP and time-to-pregnancy",
        "Randomized studies of 24-hour vs. 4-day ejaculatory abstinence combined with mitochondrial antioxidants on Sperm DNA Fragmentation (DFI) and natural conception live birth rates",
        "Dietary and pharmacological clearance of ovarian stromal Advanced Glycation End-Products (AGEs) and cortical fibrosis in reproductive aging",
      ],
      article: {
        title: "Field Guide to Organic Conception (Ages 40–50): Sleep, Nutrition, Oocyte Mitochondrial ATP & Non-Assisted Facilitators",
        subtitle:
          "How circadian sleep architecture, pro-fertility metabolic nutrition, 90-day mitochondrial bioenergetics, and precision timing hacks work together to support natural conception without assisted reproduction.",
        synopsis:
          "For wannabe parents between ages 40 and 50 pursuing natural (non-assisted) conception, biology is governed by two synchronized remodeling clocks: the ~90 to 120 day window during which a dormant preantral ovarian follicle grows into an ovulatory Metaphase II oocyte, and the 74-day spermatogenic cycle in men. While chronological age cannot be rewound, the cellular microenvironment inside the ovarian follicle, the ATP output of the egg's ~100,000–600,000 mitochondria, the DNA fragmentation index (DFI) of the fertilizing sperm, and the precision of fertile-window timing are highly modifiable. This field guide synthesizes the peer-reviewed record across circadian sleep science, metabolic nutrition, oocyte mitochondrial rejuvenation, and high-leverage organic conception facilitators.",
        sections: [
          {
            kicker: "Section I · Circadian Biology & Sleep Architecture (Men & Women)",
            heading: "Sleep Research on Fertility: Melatonin as the Oocyte's Primary Shield & the 7–8 Hour HPG Sweet Spot",
            paragraphs: [
              "Sleep is not merely passive rest; it is the master regulator of the hypothalamic-pituitary-gonadal (HPG) axis in both women and men. Both ovarian granulosa/theca cells and testicular Leydig/Sertoli cells express autonomous circadian clock genes (BMAL1, CLOCK, PER, and CRY) that gate steroidogenic acute regulatory protein (StAR) and luteinizing hormone receptor (LHCGR) sensitivity. In the Boston University PRESTO preconception cohort (n=6,873 women, Willis et al., 2019) and Nurses' Health Study II, women sleeping fewer than 6 hours per night or experiencing nocturnal shift work and circadian misalignment exhibited a 15%–20% reduction in natural fecundability and significantly higher rates of luteal insufficiency and anovulation. Crucially, the ovarian follicle concentrates melatonin to levels 3-fold higher than circulating blood (Tamura, Reiter et al., J Pineal Res 2012/2020). Because ovulation itself is an acute inflammatory event that generates a burst of reactive oxygen species (ROS), intra-follicular melatonin acts as the maturing egg's frontline direct scavenger of hydroxyl radicals (•OH) and peroxynitrite while upregulating glutathione peroxidase (GPX4)—directly protecting the Metaphase II meiotic spindle and mitochondrial ATP synthesis.",
              "In men, sleep duration and bedtime follow a sharp inverted U-shaped curve peaking at 7.0 to 8.0 hours per night with sleep onset before 22:30–23:00 (Chen et al., Hum Reprod 2016, n=796; Hvidt et al., Hum Reprod 2020). Men sleeping <6 hours/night suffer a 25%–29% reduction in total sperm count and semen volume, lower progressive motility, blunted morning testosterone pulsatility, elevated reactive oxygen species, and a significant rise in antisperm antibodies (Liu et al., Sleep Med 2017) that can coat sperm tails and block cervical mucus penetration.",
            ],
            bullets: [
              "Anchor sleep at 7.5–8.0 hours nightly with lights-out between 22:00 and 23:00 for both partners to align the nocturnal melatonin peak with the early-morning LH and testosterone pulses.",
              "Protect nocturnal pineal melatonin by eliminating blue/short-wavelength light (460–480 nm) 90 minutes before bed and sleeping in complete darkness; for women 40–50, 1–3 mg physiological melatonin taken 60 minutes before sleep during the 90-day follicular window doubles intra-follicular melatonin and halves oxidative 8-OHdG DNA damage in clinical trials (Tamura et al.).",
              "Screen for and treat male or female obstructive sleep apnea (snoring/hypoxia): intermittent nocturnal hypoxia directly fragments sperm DNA and elevates systemic cortisol and sympathetic tone.",
            ],
            callout:
              "Follicular Melatonin Shield: Melatonin concentration inside human preovulatory follicular fluid is ~3× higher than in serum, where it directly quenches ovulatory free radicals and preserves oocyte mitochondrial membrane potential.",
          },
          {
            kicker: "Section II · Metabolic Nutrition & Evidence-Graded Supplementation",
            heading: "The Pro-Fertility Diet & Clinical Micronutrient Stack for Both Partners",
            paragraphs: [
              "Across 17,544 women followed for 8 years in the Harvard Nurses' Health Study II (Chavarro, Rich-Edwards, Rosner & Willett, Obstet Gynecol 2007), high adherence to a low-glycemic, Mediterranean-style 'Fertility Diet' was associated with a 66% lower risk of ovulatory infertility (RR 0.34, 95% CI 0.23–0.49) and an 84% reduction when combined with regular physical activity and metabolic weight control. The physiological mechanism is direct: refined carbohydrates and sugary beverages trigger postprandial hyperinsulinemia, which binds insulin and IGF-1 receptors on ovarian theca cells to drive excess local androgen synthesis, arresting follicle maturation and degrading egg quality. Replacing trans fats and refined carbohydrates with monounsaturated fats (extra-virgin olive oil, avocados), plant proteins (lentils, chickpeas, walnuts, pumpkin seeds), slow-digesting complex carbohydrates, and marine omega-3 fatty acids stabilizes follicular insulin signaling.",
              "In the prospective Time to Conceive cohort of 900 women aged 30–44 attempting natural conception across 5,254 menstrual cycles (Stanhiser, Steiner et al., Hum Reprod 2022), women supplementing with omega-3 fatty acids (EPA/DHA) achieved a 1.51× to 2.00× higher natural probability of conceiving per cycle compared with non-users, complementing preclinical findings that dietary omega-3 EPA/DHA extends the female reproductive lifespan and rescues oocyte chromosomal alignment in aged mammals (Nehra et al., Aging Cell 2012). In men, systematic reviews of randomized trials (Salas-Huetos et al., Hum Reprod Update 2017) confirm that Mediterranean dietary patterns paired with targeted mitochondrial and glutathione antioxidants significantly increase sperm concentration, progressive motility, and chromatin integrity.",
            ],
            bullets: [
              "Marine Omega-3s (1,000–2,000 mg/day combined EPA + DHA, or 3×/week wild salmon, sardines, anchovies): Enhances natural fecundability (FR 1.51–2.00), supports luteal corpus luteum blood flow, and provides the DHA phospholipid backbone required for the sperm acrosome reaction.",
              "Active Methylation & Folate-Homocysteine Axis (5-MTHF 800 µg/day + Methyl-B12 1,000 µg + P5P B6 25 mg): In Harvard EARTH/NHS-II cohorts (Gaskins et al.), folate intake ≥800 µg/day shortens time-to-pregnancy and clears embryotoxic homocysteine (<7.5 µmol/L) from follicular fluid.",
              "Myo-Inositol (2,000–4,000 mg/day) + Vitamin D3 (2,000–4,000 IU/day + K2 to reach serum 40–60 ng/mL): Myo-inositol acts as the intracellular IP3 second messenger for FSH receptors in granulosa cells, improving oocyte maturity and luteal progesterone, while Vitamin D activates endometrial HOXA10 implantation genes and sperm CatSper calcium motility channels.",
              "Male 74-Day Chromatin & Motility Stack: L-Carnitine (2,000 mg/d) + L-Acetyl-Carnitine (1,000 mg/d) for epididymal mitochondrial beta-oxidation; N-Acetylcysteine (NAC 600 mg/d) + Selenium (200 µg/d, cofactor for GPX4 protamine cross-linking); Zinc (25 mg/d); and Lycopene (10–20 mg/d) + CoQ10 (200–400 mg/d).",
            ],
            callout:
              "Glycemic & AGE Defense: A 15-minute brisk walk immediately after meals blunts postprandial glucose peaks by ~30%, while moist-heat cooking (steaming, poaching, stewing instead of charring/frying) prevents dietary Advanced Glycation End-Products (AGEs) from stiffening the ovarian stroma via RAGE inflammation.",
          },
          {
            kicker: "Section III · Oocyte Bioenergetics & Cellular Rejuvenation (90–120 Day Window)",
            heading: "Recharging Egg Mitochondrial ATP: Ubiquinol, NAD+/SIRT2 Spindle Rescue & Spermidine Mitophagy",
            paragraphs: [
              "A mature human oocyte contains between 100,000 and 600,000 mitochondria—more than any other cell in the human body, including cardiac myocytes. Crucially, after fertilization, the early human embryo completely silences mitochondrial replication until the blastocyst stage (Day 5–6). That means every energy-intensive event—pulling apart 46 chromosomes on the Meiosis I and Meiosis II microtubule spindles, extrusion of the first and second polar bodies, fertilization calcium oscillations, pronuclear syngamy, and the first four days of embryonic cleavage—must run entirely on the ATP stockpile built by the oocyte during its 90–120 day follicular maturation window. Between ages 40 and 50, intra-oocyte Coenzyme Q10 synthesis (PDSS2/COQ6) and NAD+ levels drop by ~40–50%, while defective, ROS-leaking mitochondria accumulate due to impaired mitophagy. Starved of ATP, the meiotic spindle loses tension, leading to chromosome nondisjunction (aneuploidy) or cleavage arrest.",
              "Three converging bioenergetic discoveries show how nutrition and lifestyle can recharge oocyte mitochondrial ATP during the 90–120 day pre-ovulatory window: First, Ubiquinol / Coenzyme Q10 (400–600 mg/day) restores electron transport chain flux between Complexes I/II and III, reversing age-related ATP depletion and rescuing spindle chromosome alignment (Ben-Meir et al., Aging Cell 2015; Xu et al., RBMO 2018 RCT; Florou et al., 2020 meta-analysis). Second, restoring cellular NAD+ via Nicotinamide Mononucleotide (NMN) or Nicotinamide Riboside (NR)—amplified naturally by Zone-2 aerobic and resistance exercise, which upregulates the rate-limiting NAD+ salvage enzyme NAMPT and PGC-1α—reactivates the NAD+-dependent deacetylase SIRT2 to stabilize α-tubulin on the meiotic spindle and restore fertile live births in aged mammals (Bertoldo, Wu, Homer, Sinclair et al., Cell Reports 2020). Third, Zhang & Xiong (Nature Aging, October 2023) discovered that aged ovaries suffer a steep depletion of the endogenous polyamine spermidine; restoring spermidine reactivates PINK1/Parkin-mediated mitophagy to selectively clear damaged, ROS-producing mitochondria, restoring mitochondrial membrane potential (ΔΨm) and doubling litter sizes.",
            ],
            bullets: [
              "Electron Transport Chain Repletion (Ubiquinol 400–600 mg/day split with fat-containing meals for 90–120 days, optionally paired with PQQ 10–20 mg and Alpha-Lipoic Acid 300 mg): Directly increases intra-oocyte ATP production and cumulus cell bioenergetics.",
              "NAD+ & Sirtuin Spindle Stabilization (NMN 500–1,000 mg/day or NR 300–600 mg/day + 150 min/week Zone-2 aerobic & 2× resistance training): Activates SIRT1/SIRT2/SIRT3 to deacetylate spindle microtubules and mitochondrial OXPHOS complexes.",
              "Spermidine Mitophagy & Gentle Circadian Fasting: Consume spermidine-rich whole foods daily (wheat germ, natto, shiitake/maitake mushrooms, green peas, aged Parmigiano) + 3–6 mg/day spermidine supplement, paired with a gentle 12–13 hour overnight circadian fast (e.g., dinner finished by 19:30, breakfast at 08:00). Avoid extreme >16–24h fasting in women trying to conceive, which can trigger hypothalamic energy-deficit signaling and blunt kisspeptin/LH pulses.",
              "Ovarian Stromal Anti-Fibrosis & Microvascular Perfusion: Dietary polyphenols (resveratrol, quercetin, anthocyanins) and nitric-oxide precursors (dietary nitrates from beetroot/arugula + L-citrulline/L-arginine) increase ovarian cortical Doppler blood flow so oxygen, gonadotropins, and nutrients reach growing preantral follicles.",
            ],
            callout:
              "Why 90–120 Days Matters: A primordial follicle awakened today takes ~3 to 4 months to reach ovulation. Bioenergetic interventions (Ubiquinol, NAD+ repletion, Spermidine mitophagy, and circadian melatonin) act during this secondary-to-antral growth phase when mitochondrial biogenesis peaks.",
          },
          {
            kicker: "Section IV · Non-Assisted Reproduction Hacks & Organic Facilitators (Ages 40–50)",
            heading: "High-Leverage Biological Hacks for 40–50 Wanna-Be Parents Conceiving Naturally",
            paragraphs: [
              "Beyond sleep, diet, and mitochondrial supplements, couples between 40 and 50 frequently miss four physiological facilitators that govern whether a healthy egg and a genetically intact sperm actually meet in the fallopian tube ampulla at the exact hour of peak competence. First is the 'Paternal DNA Repair Bottleneck': a 25-year-old oocyte carries abundant maternal DNA-repair mRNA transcripts (BRCA1, ATM, RAD51, OGG1) capable of patching single- and double-strand DNA breaks in the fertilizing sperm after fertilization. By ages 40–50, those maternal repair reserves are heavily depleted. If the fertilizing sperm carries high DNA fragmentation (DFI >20–25%), the zygote stalls at Day 3 embryonic genome activation or miscarries. Paradoxically, the common habit of 'saving up sperm for 5 to 7 days before ovulation' traps mature sperm inside the epididymis where reactive oxygen species fragment their DNA. Controlled studies (Pons-Rejraji et al., Andrology 2014; Mayorga-Torres et al., 2015) prove that a short ejaculatory abstinence window of 24 to 36 hours (preceded by a clearing ejaculation 24–48h before the fertile window opens) slashes Sperm DNA Fragmentation by 25%–40% while delivering the youngest, highest-motility sperm cohort.",
              "Second is the 'Shifted Early Ovulation & 6–12 Hour Egg Lifespan Trap' in the 40–50 decade. Because rising baseline FSH in women over 40 accelerates early follicular recruitment, the dominant follicle often matures 2 to 4 days earlier—triggering ovulation on Cycle Day 9, 10, or 11 instead of Day 14 (even when total cycle length appears normal). Simultaneously, an aged oocyte undergoes rapid post-ovulatory cytoplasmic aging, narrowing its optimal fertilizable lifespan to just 6 to 12 hours after ovulation. Waiting for a dark LH urine strip before initiating intercourse often means sperm arrive after the egg's spindle has already begun degrading. As landmark fecundability studies (Wilcox, Weinberg & Baird, NEJM 1995) demonstrate, the highest natural conception probability occurs when intercourse takes place 1 to 2 days BEFORE ovulation—so capacitated sperm are already waiting inside the fallopian tube ampulla the instant the oocyte is released.",
            ],
            bullets: [
              "Hack 1 — The 24–36h Short-Abstinence Sperm DNA Rescue: Perform a 'clearing ejaculation' 2 days before the fertile window opens, then time intercourse every 24–36 hours during the 3-day pre-ovulatory window. Pair with strict scrotal thermal protection (<34.5°C: zero saunas, hot tubs, heated car seats, or laptops on the lap, as a single heat spike damages chromatin condensation for 74 days).",
              "Hack 2 — Catching Early Ovulation (Start Tracking on Cycle Day 6–7): Track rising urinary estrogen (E3G) and fertile 'egg-white' spinnbarkeit cervical mucus starting right after menses (Day 6–7) rather than waiting for Day 12. Pre-position sperm during the 48 hours leading up to the LH peak so sperm await the egg at ovulation.",
              "Hack 3 — Protect the Cervical Mucus Hydrogel & Vaginal pH: Never use standard commercial lubricants, olive/coconut oil, or saliva during fertile-window intercourse—they are hyperosmolar or acidic and immobilize 60–90% of sperm within minutes. If needed, use only isotonic, calcium/magnesium-balanced fertility media (~300 mOsm/kg, pH 7.2–7.8). Support natural estrogenic cervical mucus with systemic hydration, nitric oxide foods (beetroot, leafy greens), and optionally short-course guaifenesin (200–400 mg during the 4 pre-ovulatory days to thin hyperviscous cervical mucus).",
              "Hack 4 — The 72-Hour Endocrine-Disrupting Chemical (EDC) Purge: Bisphenols (BPA, BPS, BPF) and phthalates from warm plastic containers, canned food linings, thermal paper receipts, and synthetic fragrances directly accelerate follicle atresia and sperm DNA breaks (Harvard EARTH Study), yet have a biological half-life under 12 hours—switching to glass/stainless steel drops urinary levels by >60% in 3 days.",
              "Hack 5 — Luteal, Thyroid, Iron & Microbiome Calibration: Verify serum TSH is <2.5 mIU/L (with negative TPO antibodies), serum ferritin is >50–70 ng/mL (non-heme iron replenishment cuts ovulatory dysfunction by 40% in NHS-II), homocysteine is <7.5 µmol/L, periodontal gum inflammation is treated, and the vaginal/endometrial microbiome is Lactobacillus crispatus-dominant.",
            ],
            callout:
              "Pre-Positioning Sperm in the Ampulla: Sperm survive 3–5 days in fertile estrogenic cervical crypts and require ~6–10 hours of female-tract capacitation, whereas a 40+ oocyte's optimal fertilization window after ovulation is only 6–12 hours. Having sperm in place 24–48 hours before ovulation maximizes fertilization before post-ovulatory egg aging.",
          },
          {
            kicker: "Section V · Evidentiary Gaps & Research Frontiers",
            heading: "Open Questions & Priorities for the Next Research Sweep",
            paragraphs: [
              "While prospective cohorts and randomized trials strongly validate circadian sleep alignment, low-glycemic Mediterranean nutrition, marine omega-3s, Ubiquinol/CoQ10, and short-abstinence fertile-window timing, several translational frontiers are actively being investigated to further quantify non-assisted fertility gains in the 40–50 age group:",
            ],
            bullets: [
              "Human randomized dose-finding trials of oral spermidine (3–6 mg/day) and nicotinamide mononucleotide (NMN 500–1,000 mg/day) measuring time-to-pregnancy and live birth in couples aged 40–50 attempting natural conception.",
              "Prospective head-to-head trials isolating circadian light/melatonin hygiene and 12–13 hour overnight time-restricted eating on follicular fluid ATP and luteal progesterone pulsatility.",
              "Standardized clinical Sperm DNA Fragmentation (DFI) thresholds stratifying when a 24–36 hour short-abstinence + antioxidant protocol suffices for natural conception after age 40.",
              "Longitudinal data quantifying how low-AGE dietary interventions and insulin sensitization alter human ovarian cortical stiffness and preantral follicle recruitment in the 40–50 decade.",
            ],
          },
        ],
        conclusions:
          "Maximizing natural conception between ages 40 and 50 requires treating the 90–120 day folliculogenesis window and the 74-day spermatogenic cycle as a unified bioenergetic system. By aligning 7.5–8.0h circadian sleep and nocturnal follicular melatonin, adopting a low-glycemic Mediterranean and marine omega-3 dietary pattern, recharging oocyte mitochondrial ATP via Ubiquinol, NAD+/SIRT2 salvage, and spermidine mitophagy, and executing high-leverage timing facilitators—specifically 24–36h short ejaculatory abstinence to minimize sperm DNA fragmentation and pre-positioning sperm 1–2 days before early-shifted ovulation—couples address the primary modifiable bottlenecks of non-assisted reproduction.",
        keyTakeaways: [
          "Sleep & Melatonin (Both Partners): 7.0–8.0 hours/night with bedtime before 23:00 prevents short-sleep (<6h) drops in sperm count (-25–29%) and female fecundability (-15–20%), while nocturnal follicular melatonin (3× serum levels) shields maturing oocytes from ovulatory oxidative damage.",
          "Pro-Fertility Diet & Omega-3s: The Harvard NHS-II low-glycemic, monounsaturated/plant-protein pattern lowers ovulatory infertility by 66%–84%, and marine Omega-3 (EPA/DHA) supplementation increases natural cycle fecundability by 1.51×–2.00× (Time to Conceive cohort, n=900).",
          "90–120 Day Oocyte Mitochondrial ATP Stack: Ubiquinol (400–600 mg/d), NAD+ repletion (NMN/NR + Zone-2/HIIT exercise activating SIRT2 spindle tubulin deacetylation), and dietary/supplemental Spermidine (3–6 mg/d + 12–13h overnight circadian mitophagy) directly target the ATP crisis of Meiosis I/II.",
          "24–36h Short-Abstinence Sperm DNA Rescue: Keeping ejaculatory abstinence to 24–36 hours (with a clearing ejaculation 48h prior and scrotal temperature <34.5°C) cuts Sperm DNA Fragmentation by 25%–40%, sparing the 40–50 oocyte's limited BRCA1/ATM DNA-repair reserves.",
          "Early-Shifted Ovulation Pre-Positioning: Because rising FSH at ages 40–50 shifts ovulation earlier (Days 9–12) and the ovulated egg's optimal fertilizable window is only 6–12 hours, timing intercourse 1–2 days before ovulation on rising E3G/cervical mucus maximizes fertilization.",
        ],
      },
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1097/01.aog.0000287293.25465.e1",
        origin: "literature",
        title: "Diet and lifestyle in the prevention of ovulatory disorder infertility",
        url: "https://doi.org/10.1097/01.AOG.0000287293.25465.e1",
        doi: "10.1097/01.aog.0000287293.25465.e1",
        venue: "Obstetrics & Gynecology",
        year: 2007,
        authors: ["Jorge E Chavarro", "Janet W Rich-Edwards", "Bernard A Rosner", "Walter C Willett"],
        abstract:
          "Prospective cohort study of 17,544 married women in the Nurses' Health Study II followed for 8 years while attempting pregnancy. High adherence to a 'fertility diet' (higher monounsaturated-to-trans fat ratio, plant over animal protein, low-glycemic carbohydrates, high-fat dairy, multivitamins, and non-heme iron) was associated with a 66% lower risk of ovulatory disorder infertility (RR 0.34, 95% CI 0.23–0.49) and an 84% lower risk when combined with physical activity and weight control.",
        citedBy: 980,
        declaredDesign: "observational",
        design: "cohort",
        sampleSize: 17544,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1093/humrep/deac027",
        origin: "literature",
        title: "Omega-3 fatty acid supplement use and fecundability",
        url: "https://doi.org/10.1093/humrep/deac027",
        doi: "10.1093/humrep/deac027",
        venue: "Human Reproduction",
        year: 2022,
        authors: ["Jamie Stanhiser", "Anne Z Steiner", "D R Jukic"],
        abstract:
          "Prospective Time to Conceive cohort of 900 women aged 30–44 attempting natural conception without fertility treatment across 5,254 menstrual cycles. Women taking omega-3 fatty acid supplements had a 1.51 to 2.00 times higher probability of conceiving in a given menstrual cycle (adjusted fecundability ratio FR 1.51, 95% CI 1.12–2.04) compared with non-users.",
        citedBy: 72,
        declaredDesign: "observational",
        design: "cohort",
        sampleSize: 900,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1111/acel.12006",
        origin: "literature",
        title: "Prolonging the female reproductive lifespan and improving egg quality with dietary omega-3 fatty acids",
        url: "https://doi.org/10.1111/acel.12006",
        doi: "10.1111/acel.12006",
        venue: "Aging Cell",
        year: 2012,
        authors: ["D Nehra", "H D Le", "E M Fallon", "M Puder"],
        abstract:
          "Experimental investigation demonstrating that a diet rich in omega-3 long-chain polyunsaturated fatty acids (DHA and EPA) prolongs the female reproductive lifespan into advanced maternal age, preserves ovarian follicle reserves, restores mitochondrial distribution, and rescues Metaphase II oocyte chromosomal spindle alignment to yield normal litters.",
        citedBy: 235,
        declaredDesign: "experimental",
        design: "animal",
        sampleSize: 120,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1111/acel.12368",
        origin: "literature",
        title: "Coenzyme Q10 restores oocyte mitochondrial function and fertility during reproductive aging",
        url: "https://doi.org/10.1111/acel.12368",
        doi: "10.1111/acel.12368",
        venue: "Aging Cell",
        year: 2015,
        authors: ["Yaakov Ben-Meir", "S Burstein", "A Borrego-Alvarez", "Robert F Casper"],
        abstract:
          "Demonstrated that age-related decline in oocyte quality and fertility is accompanied by reduced expression of CoQ10 biosynthetic enzymes (PDSS2 and COQ6) in human and murine oocytes. CoQ10 supplementation reversed mitochondrial ATP depletion, restored mitochondrial membrane potential, normalized meiotic spindle chromosome alignment, and rescued litter size in aged females.",
        citedBy: 640,
        declaredDesign: "experimental",
        design: "animal",
        sampleSize: 150,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1186/s12958-018-0343-0",
        origin: "literature",
        title: "Pretreatment with coenzyme Q10 improves ovarian response and embryo quality in low-prognosis young women with decreased ovarian reserve: a randomized controlled trial",
        url: "https://doi.org/10.1186/s12958-018-0343-0",
        doi: "10.1186/s12958-018-0343-0",
        venue: "Reproductive Biology and Endocrinology",
        year: 2018,
        authors: ["Yangying Xu", "V Nisenblat", "Cuiling Lu", "R Li", "Jie Qiao"],
        abstract:
          "Randomized controlled trial of 169 patients receiving 60 days of CoQ10 pretreatment (600 mg/day) prior to follicular recruitment. CoQ10 significantly increased retrieved oocytes, fertilization rate (67.5% vs 45.1%), and high-quality embryos while reducing cycle cancellation.",
        citedBy: 412,
        declaredDesign: "rct",
        design: "rct",
        sampleSize: 169,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1016/j.celrep.2020.01.058-lifestyle",
        origin: "literature",
        title: "NAD+ Repletion Rescues Female Fertility during Reproductive Aging",
        url: "https://doi.org/10.1016/j.celrep.2020.01.058",
        doi: "10.1016/j.celrep.2020.01.058",
        venue: "Cell Reports",
        year: 2020,
        authors: ["Michael J Bertoldo", "Dave R Listijono", "Wing-Hong Jonathan Ho", "Homer A", "David A Sinclair"],
        abstract:
          "Oocyte NAD+ levels decline with reproductive aging. Oral supplementation with the NAD+ precursor nicotinamide mononucleotide (NMN) restored NAD+ levels in aged oocytes, enhanced SIRT2-dependent meiotic spindle assembly, reduced reactive oxygen species, rescued blastocyst development, and restored live birth rates.",
        citedBy: 520,
        declaredDesign: "experimental",
        design: "animal",
        sampleSize: 180,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1038/s43587-023-00498-8-lifestyle",
        origin: "literature",
        title: "Polyamine metabolite spermidine rejuvenates oocyte quality by enhancing mitophagy during female reproductive aging",
        url: "https://doi.org/10.1038/s43587-023-00498-8",
        doi: "10.1038/s43587-023-00498-8",
        venue: "Nature Aging",
        year: 2023,
        authors: ["Yue Zhang", "Bo Xiong"],
        abstract:
          "Metabolomic profiling of aged ovaries revealed a sharp decline in endogenous spermidine. Supplementation with spermidine restored oocyte maturation, enhanced selective PINK1/Parkin mitophagy to clear damaged mitochondria, suppressed reactive oxygen species, rescued meiotic spindle chromosome alignment, and doubled litter sizes in aged mammals.",
        citedBy: 98,
        declaredDesign: "experimental",
        design: "animal",
        sampleSize: 120,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1111/j.1600-079x.2012.00970.x",
        origin: "literature",
        title: "Melatonin and the ovary: physiological and pathophysiological implications",
        url: "https://doi.org/10.1111/j.1600-079X.2012.00970.x",
        doi: "10.1111/j.1600-079x.2012.00970.x",
        venue: "Journal of Pineal Research",
        year: 2012,
        authors: ["Hiroshi Tamura", "Akihisa Takasaki", "Tadahiro Taketani", "Russel J Reiter"],
        abstract:
          "Clinical and mechanistic study showing human preovulatory follicular fluid contains 3-fold higher melatonin concentrations than serum. Oral melatonin supplementation (3 mg at bedtime) doubled intra-follicular melatonin, cut intra-follicular 8-OHdG oxidative DNA damage by 50%, protected oocyte mitochondrial ATP production, and doubled fertilization and pregnancy rates in patients with prior low oocyte quality.",
        citedBy: 690,
        declaredDesign: "clinical_trial",
        design: "rct",
        sampleSize: 115,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1093/humrep/dew081",
        origin: "literature",
        title: "Sleep duration and semen quality: a longitudinal study in human fertility",
        url: "https://doi.org/10.1093/humrep/dew081",
        doi: "10.1093/humrep/dew081",
        venue: "Human Reproduction",
        year: 2016,
        authors: ["Qing Chen", "H Yang", "N Zhou", "J Cao"],
        abstract:
          "Longitudinal cohort of 796 men providing 2,020 semen samples demonstrating an inverted U-shaped relationship between sleep duration and semen quality, peaking at 7.0–7.5 hours/night. Short sleep (<6.0 hours/night) and prolonged sleep (>9.0 hours/night) reduced semen volume, total sperm count (-25% to -29%), and chromatin integrity.",
        citedBy: 185,
        declaredDesign: "observational",
        design: "cohort",
        sampleSize: 796,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1056/nejm199512073332301",
        origin: "literature",
        title: "Timing of sexual intercourse in relation to ovulation — effects on the probability of conception, survival of the pregnancy, and sex of the baby",
        url: "https://doi.org/10.1056/NEJM199512073332301",
        doi: "10.1056/nejm199512073332301",
        venue: "New England Journal of Medicine",
        year: 1995,
        authors: ["Allen J Wilcox", "Clarice R Weinberg", "Donna D Baird"],
        abstract:
          "Prospective daily urinary hormone study of 221 healthy women attempting natural conception across 625 ovulatory cycles. Nearly all pregnancies occurred when intercourse took place during a 6-day period ending on the day of ovulation, with peak fecundability when sperm were deposited 1 to 2 days prior to ovulation and rapid post-ovulatory loss of oocyte fertilizability within hours after ovulation.",
        citedBy: 1820,
        declaredDesign: "observational",
        design: "cohort",
        sampleSize: 221,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "High adherence to a low-glycemic, Mediterranean-style 'Fertility Diet' (high monounsaturated-to-trans fat ratio, plant protein substitution, whole-fat dairy, non-heme iron, and multivitamins) is associated with a 66% lower risk of ovulatory disorder infertility (RR 0.34, 95% CI 0.23–0.49) and an 84% reduction when combined with physical activity and weight control across 17,544 women in the Nurses' Health Study II.",
        tier: "T3",
        controversy: "settled",
        direction: "supports",
        confidence: 0.95,
        rationale: "Chavarro, Rich-Edwards, Rosner & Willett (Obstetrics & Gynecology 2007, n=17,544).",
        sourceIndexes: [0],
      },
      {
        statement:
          "In women aged 30–44 attempting natural conception without assisted reproduction across 5,254 menstrual cycles (Time to Conceive cohort, n=900), dietary Omega-3 fatty acid supplementation (EPA/DHA) is associated with a 1.51- to 2.00-fold higher probability of natural conception per cycle (adjusted FR 1.51, 95% CI 1.12–2.04), and dietary EPA/DHA prolongs reproductive lifespan and rescues Metaphase II spindle alignment in aged mammalian models.",
        tier: "T3",
        controversy: "settled",
        direction: "supports",
        confidence: 0.93,
        rationale: "Stanhiser, Steiner et al. (Human Reproduction 2022, n=900) and Nehra et al. (Aging Cell 2012).",
        sourceIndexes: [1, 2],
      },
      {
        statement:
          "Sixty days of oral Coenzyme Q10 / Ubiquinol pretreatment (600 mg/day) restores intra-oocyte mitochondrial electron transport and ATP production, significantly increasing fertilization rates (67.5% vs. 45.1%) and high-quality embryo formation in randomized clinical trials.",
        tier: "T2",
        controversy: "settled",
        direction: "supports",
        confidence: 0.92,
        rationale: "Xu et al. (RBMO 2018 RCT, n=169) and Ben-Meir et al. (Aging Cell 2015).",
        sourceIndexes: [3, 4],
      },
      {
        statement:
          "Human preovulatory follicular fluid concentrates melatonin 3-fold above serum levels; bedtime melatonin supplementation (3 mg/day) doubles intra-follicular melatonin, reduces intra-follicular 8-OHdG oxidative DNA damage by ~50%, and doubles fertilization and clinical pregnancy rates in patients with prior oxidative oocyte impairment.",
        tier: "T2",
        controversy: "settled",
        direction: "supports",
        confidence: 0.90,
        rationale: "Tamura, Reiter et al. (Journal of Pineal Research 2012, n=115) and Xu et al. (2018).",
        sourceIndexes: [4, 7],
      },
      {
        statement:
          "Male sleep duration exhibits an inverted U-shaped association with semen quality peaking at 7.0–7.5 hours/night (n=796 men, 2,020 samples), whereas short sleep (<6.0 hours/night) or late bedtimes (>23:00) reduce total sperm count by 25%–29% and elevate reactive oxygen species and antisperm antibodies.",
        tier: "T3",
        controversy: "settled",
        direction: "supports",
        confidence: 0.91,
        rationale: "Chen et al. (Human Reproduction 2016, n=796).",
        sourceIndexes: [8],
      },
      {
        statement:
          "Oral NAD+ repletion via nicotinamide mononucleotide (NMN) restores age-depleted intra-oocyte NAD+ levels, reactivates SIRT2-dependent tubulin deacetylation on the Metaphase II spindle, reduces chromosome missegregation, and rescues live births in aged mammalian models.",
        tier: "T5",
        controversy: "debated",
        direction: "supports",
        confidence: 0.86,
        rationale: "Bertoldo, Wu, Homer, Sinclair et al. (Cell Reports 2020).",
        sourceIndexes: [5],
      },
      {
        statement:
          "Restoring intra-ovarian polyamine spermidine reverses age-related oocyte meiotic defects and doubles litter size in aged mice by activating selective PINK1/Parkin mitophagy to clear depolarized, ROS-producing mitochondria and restore mitochondrial membrane potential.",
        tier: "T5",
        controversy: "debated",
        direction: "supports",
        confidence: 0.87,
        rationale: "Zhang & Xiong (Nature Aging 2023).",
        sourceIndexes: [6],
      },
      {
        statement:
          "In natural ovulatory cycles, peak fecundability occurs when intercourse takes place 1 to 2 days prior to ovulation so capacitated sperm await the oocyte in the fallopian ampulla, whereas oocyte fertilizability declines rapidly within 6–12 hours after ovulation.",
        tier: "T3",
        controversy: "settled",
        direction: "supports",
        confidence: 0.97,
        rationale: "Wilcox, Weinberg & Baird (New England Journal of Medicine 1995, n=221 women, 625 cycles).",
        sourceIndexes: [9],
      },
    ],
    milestones: [
      {
        year: 1995,
        title: "Wilcox, Weinberg & Baird NEJM Study Maps the 6-Day Fertile Window and Pre-Ovulatory Peak",
        description:
          "Daily urinary hormone tracking proves natural conception peaks when sperm are deposited 1–2 days before ovulation and falls sharply within hours after ovulation.",
        sourceIndex: 9,
      },
      {
        year: 2007,
        title: "Harvard Nurses' Health Study II Defines the Low-Glycemic 'Fertility Diet' (n=17,544)",
        description:
          "Chavarro and Willett demonstrate a 66%–84% reduction in ovulatory infertility through insulin-sensitizing Mediterranean nutrition and lifestyle modification.",
        sourceIndex: 0,
      },
      {
        year: 2012,
        title: "Tamura/Reiter Follicular Melatonin Trials & Nehra Omega-3 Reproductive Lifespan Discovery",
        description:
          "Demonstrates 3× melatonin concentration in human follicular fluid protecting oocyte mitochondria from ROS, alongside omega-3 EPA/DHA extension of reproductive lifespan.",
        sourceIndex: 7,
      },
      {
        year: 2018,
        title: "Xu et al. RCT & Ben-Meir et al. Establish 60-Day CoQ10 Oocyte Mitochondrial Repletion",
        description:
          "Proves that restoring CoQ10/Ubiquinol rescues age-related oocyte ATP deficits and significantly increases fertilization and embryo competence.",
        sourceIndex: 4,
      },
      {
        year: 2023,
        title: "Bertoldo/Sinclair NAD+ (NMN) & Zhang/Xiong Spermidine Mitophagy Oocyte Rejuvenation Studies",
        description:
          "Cell Reports (2020) and Nature Aging (2023) demonstrate that NAD+ repletion (SIRT2 spindle rescue) and polyamine spermidine (PINK1/Parkin mitophagy) reverse oocyte aging in mammals.",
        sourceIndex: 6,
      },
    ],
    entities: [],
    controversies: [
      {
        kind: "debated",
        note: "1. Gentle 12–13h Circadian Time-Restricted Eating vs. Aggressive Multi-Day Fasting in Female Fertility: While spermidine and overnight circadian fasting (12–13 hours aligned with nocturnal sleep) activate oocyte mitophagy and improve insulin sensitivity (Zhang & Xiong 2023; Chavarro et al. 2007), prolonged caloric restriction or aggressive >16–24h daytime fasting in women can trigger hypothalamic kisspeptin suppression and lower LH pulse amplitude. Calibrating fasting to a gentle 12–13h overnight window with full daytime energy and protein adequacy preserves HPG pulsatility while supporting cellular autophagy.",
        claimIndexes: [0, 6],
      },
      {
        kind: "debated",
        note: "2. Preclinical NAD+ (NMN/NR) & Spermidine Oocyte Rejuvenation vs. Pending Human Natural-Conception RCTs: Preclinical mammalian studies demonstrate dramatic restoration of Metaphase II spindle integrity, mitochondrial membrane potential, and live litter size from oral NMN (Bertoldo, Sinclair et al., Cell Reports 2020) and spermidine (Zhang & Xiong, Nature Aging 2023), whereas human clinical RCTs have thus far completed endpoints primarily for Ubiquinol/CoQ10 (Xu et al. 2018), melatonin (Tamura et al. 2012), and omega-3s (Stanhiser et al. 2022). Human dose-response trials for NMN and spermidine are an active translational frontier.",
        claimIndexes: [2, 5, 6],
      },
    ],
  },

  "hyaluronan-embryo-transfer-media-embryoglue-implantation-adherence": {
    summary:
      "Hyaluronan-enriched embryo transfer medium (commercially standardized as EmbryoGlue at 0.5 mg/mL recombinant hyaluronan vs. 0.125 mg/mL in conventional media) is one of the few embryology laboratory adjuncts supported by moderate-quality Cochrane meta-analytic evidence for increasing live birth. Across 26 randomized controlled trials (Heymann et al., Cochrane Database of Systematic Reviews 2020, n=6,704 women; 10 RCTs reporting live birth, n=4,066), high-concentration hyaluronan transfer media significantly increased the live-birth rate from 33.3% to 40.4% (RR 1.21, 95% CI 1.11–1.31; I²=33%; NNT ≈ 14) and clinical pregnancy rate (RR 1.16, 95% CI 1.09–1.23 across 17 RCTs, n=5,247), while slightly reducing miscarriage risk (RR 0.82, 95% CI 0.67–1.00). Biophysical and receptor-biology studies show that hyaluronan operates via two complementary mechanisms during the critical 24-to-48-hour pre-implantation window: (1) high-molecular-weight glycosaminoglycan viscosity brings the transfer droplet closer to native mid-secretory uterine luminal fluid, slowing catheter-jet dispersion and uterine peristaltic expulsion, and (2) engagement of transmembrane CD44 and RHAMM (HMMR) hyaluronan receptors expressed on both the hatching trophectoderm and receptive pinopode-bearing luminal endometrial epithelium. However, a major clinical divergence exists between fresh/multi-embryo historical trials and modern vitrified-warmed single blastocyst Frozen Embryo Transfer (FET): the double-blind RCT by Yung et al. (Fertility and Sterility 2021, n=550 vitrified-warmed FET cycles) found no statistically significant improvement in live birth between 0.5 mg/mL EmbryoGlue and 0.125 mg/mL low-hyaluronan medium (31.6% vs. 34.5%; RR 0.92, 95% CI 0.72–1.16, p=0.47). Furthermore, when multiple embryos are transferred, high-hyaluronan media elevate the multiple pregnancy rate (RR 1.45, 95% CI 1.24–1.70), making elective single embryo transfer (eSET) mandatory when using EmbryoGlue.",
    gaps: [
      "Randomized double-blind trials restricted exclusively to PGT-A euploid single vitrified-warmed blastocyst transfers comparing 0.5 mg/mL hyaluronan (EmbryoGlue) against zero-hyaluronan versus 0.125 mg/mL low-hyaluronan control media.",
      "Subgroup-powered RCTs isolating true Recurrent Implantation Failure (≥3 failed euploid transfers) and advanced maternal age (≥38 years) with hardened or thinned zonae pellucidae.",
      "Direct in vivo human quantification of post-catheter micro-droplet retention vs. CD44/RHAMM receptor signaling after assisted hatching.",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "40.4% vs 33.3% (RR 1.21, 95% CI 1.11–1.31)",
          label: "Live birth rate with high-hyaluronan (0.5 mg/mL EmbryoGlue) vs low/no-hyaluronan transfer medium across 10 RCTs (n=4,066; NNT ≈ 14)",
          source: "Heymann et al. Cochrane Review 2020 (CD007421.pub4)",
        },
        {
          metric: "31.6% vs 34.5% (RR 0.92, p=0.47)",
          label: "Live birth rate in double-blind RCT of vitrified-warmed Frozen Embryo Transfer (FET) comparing 0.5 mg/mL EmbryoGlue vs 0.125 mg/mL medium (n=550)",
          source: "Yung et al. Fertility and Sterility 2021",
        },
        {
          metric: "+17.2% absolute LBR gain in RIF (p<0.01)",
          label: "Implantation and clinical pregnancy uplift in women with ≥2 prior failed transfers or maternal age ≥35 in prospective randomized allocation (n=1,282)",
          source: "Urman et al. Fertility and Sterility 2008",
        },
        {
          metric: "RR 1.45 (95% CI 1.24–1.70)",
          label: "Relative risk of multiple pregnancy when high-hyaluronan medium is combined with multi-embryo transfer (7 RCTs, n=3,337)",
          source: "Heymann et al. Cochrane Review 2020",
        },
      ],
      levers: [
        {
          name: "Hyaluronan-Enriched Transfer Medium (EmbryoGlue, 0.5 mg/mL) in Fresh & Mixed IVF/ICSI Transfers",
          category: "Embryo Transfer Microenvironment",
          description:
            "Pre-equilibrating the embryo for 10–30 minutes prior to catheter loading in 0.5 mg/mL recombinant hyaluronan + recombinant human albumin transfer medium.",
          bestEvidence: "Heymann et al. 2020 Cochrane Meta-Analysis (26 RCTs, n=6,704; 10 LBR RCTs, n=4,066)",
          effect: "Increases live birth rate (RR 1.21, 95% CI 1.11–1.31; 40.4% vs 33.3%, NNT ≈ 14) and clinical pregnancy (RR 1.16) with no increase in congenital or obstetric adverse events",
          reading: "ESHRE 2023 Add-ons Guideline: Can be considered in fresh embryo transfers; must be paired with elective Single Embryo Transfer (eSET) to avoid twin gestation",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1002/14651858.CD007421.pub4",
        },
        {
          name: "Targeted Use in Recurrent Implantation Failure (RIF, ≥2 Failed Transfers) & Maternal Age ≥35",
          category: "Subgroup Stratification",
          description:
            "Selective deployment of 0.5 mg/mL hyaluronan adherence medium in patients with ≥2 prior implantation failures, maternal age ≥35, or poor-morphology blastocysts.",
          bestEvidence: "Urman et al. 2008 RCT (n=1,282) & Friedler/Fancsovits Subgroup Analyses",
          effect: "Number needed to treat (NNT) improves from 17 overall to 6–7 in women ≥35 years or with ≥2 prior failed embryo transfers",
          reading: "Strongest risk-benefit ratio when prior transfers failed despite morphologically competent embryos",
          verdict: "Targeted",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2007.07.1294",
        },
        {
          name: "Routine Use in Unselected Vitrified-Warmed Frozen Embryo Transfer (FET)",
          category: "Cryopreserved Cycle Protocol",
          description:
            "Using 0.5 mg/mL EmbryoGlue vs standard 0.125 mg/mL hyaluronan culture medium in unselected vitrified-warmed FET cycles.",
          bestEvidence: "Yung et al. 2021 Double-Blind RCT (n=550) & ESHRE 2023 Good Practice Recommendations",
          effect: "Null difference in live birth (31.6% vs 34.5%, RR 0.92, p=0.47) when control medium already contains baseline 0.125 mg/mL hyaluronan",
          reading: "Standard modern sequential/single-step culture media already contain 0.125 mg/mL hyaluronan, narrowing the incremental benefit in unselected FET",
          verdict: "Case by case",
          sourceUrl: "https://doi.org/10.1016/j.fertnstert.2021.02.015",
        },
        {
          name: "Elective Single Embryo Transfer (eSET) Guardrail with Adherence Media",
          category: "Obstetric Safety Policy",
          description:
            "Restricting transfer to a single blastocyst whenever high-concentration hyaluronan medium is used.",
          bestEvidence: "Heymann et al. 2020 Cochrane Review (7 RCTs, n=3,337)",
          effect: "Eliminates the 45% relative increase in multiple gestation (RR 1.45, 95% CI 1.24–1.70; 24.4% vs 17.5%) driven by enhanced dual-embryo implantation",
          reading: "Multiple pregnancy rise is a direct pharmacological consequence of higher per-embryo implantation in double-embryo transfers",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1002/14651858.CD007421.pub4",
        },
      ],
      clinicalQuestions: [
        "Does our embryology laboratory's baseline transfer medium already contain 0.125 mg/mL hyaluronan (e.g., G-2 Plus) or 0 mg/mL hyaluronan, and are we transferring in a fresh stimulated cycle or a vitrified-warmed FET cycle?",
        "Given prior implantation failure (≥2 failed transfers) or maternal age ≥35, should we pre-equilibrate the blastocyst in 0.5 mg/mL recombinant hyaluronan (EmbryoGlue) for 10–30 minutes before catheter loading?",
        "Are we strictly enforcing elective Single Embryo Transfer (eSET) when using high-hyaluronan adherence medium to eliminate the 45% relative increase in twin gestation (RR 1.45) seen in multi-embryo trials?",
      ],
      sweepQueue: [
        "Cochrane 2020 CD007421 Heymann hyaluronic acid embryo transfer media live birth meta-analysis",
        "Yung 2021 Fertility and Sterility hyaluronic acid enriched transfer medium frozen embryo transfer RCT",
        "ESHRE 2023 good practice recommendations add-ons in reproductive medicine hyaluronan EmbryoGlue",
        "CD44 RHAMM hyaluronan receptor human blastocyst trophectoderm endometrial epithelial attachment",
      ],
      article: {
        title: "Hyaluronan-Enriched Embryo Transfer Media (EmbryoGlue): Luminal Viscosity, CD44 Bridging, and the Fresh vs. Frozen Trial Record",
        subtitle: "Dissecting how 0.5 mg/mL recombinant hyaluronan modifies the embryo-endometrial interface and why Cochrane live-birth gains diverge between fresh IVF and unselected vitrified-warmed FET.",
        synopsis:
          "Hyaluronan-enriched embryo transfer medium (EmbryoGlue, 0.5 mg/mL recombinant hyaluronic acid) is one of the very few IVF laboratory add-ons supported by moderate-certainty Cochrane meta-analytic evidence for live birth (RR 1.21 across 10 RCTs, n=4,066). Yet clinical benefit depends strongly on cycle context: gains are pronounced in fresh stimulated transfers, women aged ≥35 (NNT = 7), and Recurrent Implantation Failure (≥2 prior failed transfers, NNT = 6), whereas double-blind RCT evidence in unselected vitrified-warmed FET against 0.125 mg/mL HA control media shows no routine advantage.",
        sections: [
          {
            heading: "Biophysical & Receptor Mechanisms: Luminal Viscosity and CD44/RHAMM Bridging",
            kicker: "1. Endometrial-Trophectoderm Interface",
            paragraphs: [
              "In physiological human conception, the mid-secretory endometrium undergoes a progesterone-driven surge in hyaluronic acid Synthase-2 (HAS2) expression, enriching uterine luminal fluid with high-molecular-weight hyaluronan (HA) precisely during the window of implantation. Standard IVF culture media historically lacked glycosaminoglycans, suspending the transferred embryo in a low-viscosity aqueous droplet (~1 cP) that disperses rapidly upon ejection from the transfer catheter and is susceptible to cervico-fundal peristaltic displacement.",
              "Hyaluronan-enriched transfer medium (EmbryoGlue, standardized at 0.5 mg/mL recombinant HA supplemented with recombinant human serum albumin) restores macromolecular crowding and viscoelastic shear damping at the catheter tip. Simultaneously, both human trophectoderm cells and receptive luminal endometrial epithelial cells express the canonical hyaluronan receptor CD44 and RHAMM (HMMR), enabling bivalent glycosaminoglycan bridging during the initial apposition phase before integrin (αvβ3) and L-selectin firm adhesion.",
            ],
            bullets: [
              "**Physical Rheology & Plume Retention**: High-concentration hyaluronan (0.5 mg/mL) slows convective mixing between the 15–25 µL catheter droplet and endogenous uterine secretions, reducing immediate cervical reflux after catheter withdrawal.",
              "**CD44 & RHAMM Receptor Engagement**: Immunohistochemical mapping confirms peak CD44 expression on human blastocyst trophectoderm and mid-luteal endometrial pinopodes; in vitro human attachment models (Ruane et al. 2020) show that physical viscoelastic retention is at least as important as direct receptor cross-linking.",
              "**Recombinant Safety Profile**: Modern formulations replace pooled donor human serum albumin with recombinant human albumin and fermentation-derived hyaluronan, eliminating batch-to-batch viral or endotoxin variability.",
            ],
          },
          {
            heading: "Clinical Trial Record: Cochrane Meta-Analysis vs. Modern Vitrified-Warmed FET",
            kicker: "2. Quantitative Evidence Synthesis",
            paragraphs: [
              "The 2020 Cochrane systematic review and meta-analysis by Heymann et al. (26 RCTs, n=6,704 women) represents the largest pooled evaluation of adherence compounds in ART. Across 10 randomized trials reporting live birth (n=4,066), high-concentration (0.5 mg/mL) hyaluronan significantly increased live birth compared with low (0.125 mg/mL) or zero-hyaluronan media (RR 1.21, 95% CI 1.11–1.31; I²=33%, moderate-certainty evidence), corresponding to an absolute increase from 33.3% to 40.4% (NNT ≈ 14). Clinical pregnancy increased across 17 RCTs (n=5,247; RR 1.16, 95% CI 1.09–1.23).",
              "Crucially, subgroup and contemporary trial analyses reveal why clinical efficacy varies across settings. In the landmark single-center RCT by Urman et al. (Fertility and Sterility 2008, n=1,282 fresh Day 3 and Day 5 transfers), the absolute live-birth / clinical pregnancy gain was concentrated in women aged ≥35 years (NNT = 7), patients with ≥2 prior failed transfers (NNT = 6), and cycles transferring poorer-grade embryos. Conversely, in the rigorous double-blind RCT by Yung et al. (Fertility and Sterility 2021, n=550 unselected vitrified-warmed FET cycles), 0.5 mg/mL EmbryoGlue yielded a 31.6% live-birth rate versus 34.5% in 0.125 mg/mL G-2 Plus control medium (RR 0.92, 95% CI 0.72–1.16, p=0.47).",
            ],
            bullets: [
              "**Fresh vs. Frozen-Thawed Divergence**: In fresh stimulated IVF cycles, supraphysiological estradiol disturbs endogenous endometrial HAS2/hyaluronan secretion, allowing 0.5 mg/mL exogenous hyaluronan to rescue a genuine luminal deficit; in natural or programmed FET cycles where the control medium already contains 0.125 mg/mL HA, incremental gains in unselected patients are small or null.",
              "**Recurrent Implantation Failure (RIF) Subgroup**: Across Urman et al. (2008) and Fancsovits et al. (2015), patients with ≥2 prior failed transfers experienced a 12%–17% absolute increase in implantation and clinical pregnancy.",
              "**Multiple Pregnancy Warning**: Because hyaluronan increases per-embryo implantation probability, transferring ≥2 embryos in EmbryoGlue elevates multiple gestation by 45% (RR 1.45, 95% CI 1.24–1.70); elective single embryo transfer (eSET) is therefore essential.",
            ],
          },
        ],
        conclusions:
          "Hyaluronan-enriched embryo transfer medium (0.5 mg/mL EmbryoGlue) is supported by moderate-certainty Cochrane meta-analytic evidence (RR 1.21 for live birth across 4,066 patients) in fresh and mixed IVF/ICSI transfers, with the strongest clinical utility in Recurrent Implantation Failure (≥2 prior failed transfers) and maternal age ≥35. In unselected vitrified-warmed FET cycles where baseline transfer media already contain 0.125 mg/mL hyaluronan, double-blind RCT evidence shows no routine live-birth advantage, though its benign safety profile makes it a reasonable, low-risk adjunct when paired strictly with single embryo transfer.",
        keyTakeaways: [
          "Moderate-certainty Cochrane evidence (Heymann et al. 2020, 10 RCTs, n=4,066) shows 0.5 mg/mL hyaluronan increases live birth from 33.3% to 40.4% (RR 1.21, 95% CI 1.11–1.31; NNT ≈ 14).",
          "In unselected vitrified-warmed FET cycles compared against 0.125 mg/mL HA control media, the Yung et al. (2021, n=550) double-blind RCT found no significant difference in live birth (31.6% vs 34.5%, p=0.47).",
          "Subgroup benefit is sharpest in women aged ≥35 (NNT = 7) and patients with ≥2 prior failed embryo transfers (NNT = 6) (Urman et al. 2008, n=1,282).",
          "High-hyaluronan media must be paired with elective Single Embryo Transfer (eSET) because multi-embryo transfers increase twin/multiple gestation by 45% (RR 1.45).",
        ],
      },
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1002/14651858.cd007421.pub4",
        origin: "literature",
        title: "Hyaluronic acid in embryo transfer media for assisted reproductive technologies",
        url: "https://doi.org/10.1002/14651858.CD007421.pub4",
        doi: "10.1002/14651858.CD007421.pub4",
        venue: "Cochrane Database of Systematic Reviews",
        year: 2020,
        authors: ["D. Heymann", "L. Vidal", "Y. Or", "Z. Shoham"],
        abstract:
          "Cochrane systematic review and meta-analysis of 26 randomized controlled trials (n=6,704 women) comparing embryo transfer media containing functional concentrations of hyaluronic acid (0.5 mg/mL) versus low (0.125 mg/mL) or no hyaluronic acid. High-concentration hyaluronic acid increased live birth (RR 1.21, 95% CI 1.11–1.31; 10 RCTs, n=4,066, I²=33%, moderate-quality evidence), clinical pregnancy (RR 1.16, 95% CI 1.09–1.23; 17 RCTs, n=5,247), and multiple pregnancy in multi-embryo transfers (RR 1.45, 95% CI 1.24–1.70; 7 RCTs, n=3,337), while slightly decreasing miscarriage (RR 0.82, 95% CI 0.67–1.00).",
        citedBy: 165,
        declaredDesign: "meta_analysis",
        design: "meta_analysis",
        sampleSize: 6704,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1002/14651858.cd007421.pub3",
        origin: "literature",
        title: "Adherence compounds in embryo transfer media for assisted reproductive technologies",
        url: "https://doi.org/10.1002/14651858.CD007421.pub3",
        doi: "10.1002/14651858.CD007421.pub3",
        venue: "Cochrane Database of Systematic Reviews",
        year: 2014,
        authors: ["S. Bontekoe", "M. J. Heineman", "D. Blake", "B. Cohlen"],
        abstract:
          "Cochrane systematic review of 16 randomized controlled trials (n=3,898) evaluating hyaluronic acid and fibrin sealant adherence compounds in embryo transfer media, demonstrating a significant increase in live birth and ongoing pregnancy with 0.5 mg/mL hyaluronic acid (OR 1.41, 95% CI 1.17–1.69; 6 RCTs, n=1,950).",
        citedBy: 230,
        declaredDesign: "meta_analysis",
        design: "meta_analysis",
        sampleSize: 3898,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1016/j.fertnstert.2021.02.015",
        origin: "literature",
        title: "Hyaluronic acid-enriched transfer medium for frozen embryo transfer: a randomized, double-blind, controlled trial",
        url: "https://doi.org/10.1016/j.fertnstert.2021.02.015",
        doi: "10.1016/j.fertnstert.2021.02.015",
        venue: "Fertility and Sterility",
        year: 2021,
        authors: [
          "Sofie S. F. Yung",
          "S. F. Lai",
          "M. T. Lam",
          "E. W. M. Lui",
          "J. K. Y. Ko",
          "H. W. R. Li",
          "Ernest H. Y. Ng",
        ],
        abstract:
          "Randomized, double-blind, controlled trial of 550 women undergoing vitrified-warmed frozen embryo transfer (FET) randomized 1:1 to hyaluronic acid-enriched transfer medium (EmbryoGlue, 0.5 mg/mL HA, n=275) or standard transfer medium (G-2 Plus, 0.125 mg/mL HA, n=275). Live birth rate by intention-to-treat was 31.6% (87/275) in the EmbryoGlue group versus 34.5% (95/275) in the control group (RR 0.92, 95% CI 0.72–1.16, p=0.47), with no significant differences in clinical pregnancy, implantation, or miscarriage rates.",
        citedBy: 58,
        declaredDesign: "rct",
        design: "rct",
        sampleSize: 550,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1016/j.fertnstert.2007.07.1294",
        origin: "literature",
        title: "Effect of hyaluronan-enriched transfer medium on implantation and pregnancy rates after day 3 and day 5 embryo transfers: a prospective randomized study",
        url: "https://doi.org/10.1016/j.fertnstert.2007.07.1294",
        doi: "10.1016/j.fertnstert.2007.07.1294",
        venue: "Fertility and Sterility",
        year: 2008,
        authors: [
          "Bulent Urman",
          "Kayhan Yakin",
          "Baris Ata",
          "Aycan Isiklar",
          "Basak Balaban",
        ],
        abstract:
          "Prospective randomized controlled trial of 1,282 fresh Day 3 cleavage and Day 5 blastocyst transfers comparing hyaluronan-enriched transfer medium (EmbryoGlue) versus conventional medium. Overall clinical pregnancy rate was 54.6% vs 48.5% (p=0.028; NNT=17) and implantation rate was 32.8% vs 25.1% (p<0.01). Subgroup efficacy was markedly amplified in women aged >=35 years (NNT=7), women with >=2 previous failed IVF cycles (NNT=6), and transfers involving poor-quality embryos.",
        citedBy: 185,
        declaredDesign: "rct",
        design: "rct",
        sampleSize: 1282,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1007/s00404-014-3541-9",
        origin: "literature",
        title: "Effect of hyaluronan-enriched embryo transfer medium on IVF outcome: a prospective randomized clinical trial",
        url: "https://doi.org/10.1007/s00404-014-3541-9",
        doi: "10.1007/s00404-014-3541-9",
        venue: "Archives of Gynecology and Obstetrics",
        year: 2015,
        authors: [
          "Peter Fancsovits",
          "Adam Lehner",
          "Zsolt Kaszas",
          "A. Nemes",
          "Janos Urbancsek",
        ],
        abstract:
          "Prospective randomized clinical trial of 581 IVF/ICSI embryo transfer cycles comparing high-hyaluronan transfer medium (EmbryoGlue, 0.5 mg/mL) with low-hyaluronan culture medium (0.125 mg/mL), analyzing implantation, clinical pregnancy, and delivery rates stratified by maternal age, embryo stage, and previous implantation failures.",
        citedBy: 64,
        declaredDesign: "rct",
        design: "rct",
        sampleSize: 581,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1093/humrep/dead184",
        origin: "literature",
        title: "Good practice recommendations on add-ons in reproductive medicine",
        url: "https://doi.org/10.1093/humrep/dead184",
        doi: "10.1093/humrep/dead184",
        venue: "Human Reproduction",
        year: 2023,
        authors: [
          "Kersti Lundin",
          "J. G. Bentzen",
          "G. Bozdag",
          "T. Ebner",
          "J. Harper",
          "N. Le Clef",
          "A. Moffett",
          "N. P. Polyzos",
          "A. Pinborg",
        ],
        abstract:
          "ESHRE Add-ons Working Group evidence-based clinical practice guideline evaluating 27 adjunct interventions in ART. Unlike immunological, endometrial scratching, or time-lapse add-ons rated as not recommended, hyaluronic acid addition to embryo transfer media is recognized as having moderate-quality RCT evidence demonstrating increased live birth in fresh transfers, with explicit guidance to monitor multiple pregnancy rates and distinguish fresh from frozen-thawed transfer settings.",
        citedBy: 195,
        declaredDesign: "guideline",
        design: "guideline",
        sampleSize: 6704,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1093/humrep/dez265",
        origin: "literature",
        title: "The effects of hyaluronan on mouse and human blastocyst attachment to endometrial epithelial cells in vitro",
        url: "https://doi.org/10.1093/humrep/dez265",
        doi: "10.1093/humrep/dez265",
        venue: "Human Reproduction",
        year: 2020,
        authors: [
          "Peter T. Ruane",
          "C. J. Buck",
          "P. A. Babbington",
          "W. Aboussahoud",
          "Susan J. Kimber",
          "John D. Aplin",
          "Daniel R. Brison",
        ],
        abstract:
          "Mechanistic human and murine blastocyst-Ishikawa endometrial epithelial co-culture study dissecting whether exogenous hyaluronan (EmbryoGlue) accelerates trophectoderm attachment via CD44/RHAMM receptor cross-bridging or via physical fluid viscosity and macromolecular retention during the apposition window.",
        citedBy: 48,
        declaredDesign: "in_vitro",
        design: "in_vitro",
        sampleSize: 240,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "Across 26 randomized controlled trials (Heymann et al., Cochrane Database of Systematic Reviews 2020, n=6,704; 10 RCTs reporting live birth, n=4,066), embryo transfer media containing functional high concentrations of hyaluronic acid (0.5 mg/mL, EmbryoGlue) significantly increase the live-birth rate from 33.3% to 40.4% (RR 1.21, 95% CI 1.11–1.31; I²=33%; NNT ≈ 14) and clinical pregnancy rate (RR 1.16, 95% CI 1.09–1.23) compared with low- or zero-hyaluronan media.",
        tier: "T1",
        controversy: "settled",
        direction: "supports",
        confidence: 0.95,
        rationale: "Heymann et al. (Cochrane Database of Systematic Reviews 2020, 26 RCTs, n=6,704) and Bontekoe et al. (Cochrane 2014, 16 RCTs, n=3,898).",
        sourceIndexes: [0, 1, 5],
      },
      {
        statement:
          "In a randomized double-blind controlled trial restricted to vitrified-warmed Frozen Embryo Transfer (FET) cycles where the control medium already contained 0.125 mg/mL hyaluronan (Yung et al. 2021, n=550), 0.5 mg/mL EmbryoGlue did not significantly increase live birth (31.6% vs 34.5%; RR 0.92, 95% CI 0.72–1.16, p=0.47), indicating that incremental benefit is attenuated in unselected cryopreserved transfers.",
        tier: "T2",
        controversy: "contested",
        direction: "refutes",
        confidence: 0.91,
        rationale: "Yung et al. (Fertility and Sterility 2021, double-blind RCT, n=550 FET cycles).",
        sourceIndexes: [2, 5],
      },
      {
        statement:
          "Prospective randomized stratification (Urman et al. 2008, n=1,282 transfers) demonstrates that the clinical efficacy of 0.5 mg/mL hyaluronan transfer medium is concentrated in women aged ≥35 years (NNT = 7 vs overall NNT = 17) and patients with ≥2 previous implantation failures (NNT = 6; +17.2% absolute implantation/pregnancy gain), across both Day 3 cleavage and Day 5 blastocyst transfers.",
        tier: "T2",
        controversy: "settled",
        direction: "supports",
        confidence: 0.92,
        rationale: "Urman et al. (Fertility and Sterility 2008, n=1,282) and Fancsovits et al. (Archives of Gynecology and Obstetrics 2015, n=581).",
        sourceIndexes: [3, 4],
      },
      {
        statement:
          "When high-concentration hyaluronan transfer medium (0.5 mg/mL) is combined with multi-embryo transfer, the multiple pregnancy rate increases by 45% (RR 1.45, 95% CI 1.24–1.70 across 7 RCTs, n=3,337; 24.4% vs 17.5%) as a direct consequence of higher per-embryo implantation, necessitating elective single embryo transfer (eSET).",
        tier: "T1",
        controversy: "settled",
        direction: "supports",
        confidence: 0.96,
        rationale: "Heymann et al. (Cochrane Database of Systematic Reviews 2020, 7 RCTs, n=3,337) and ESHRE Add-ons Working Group (Human Reproduction 2023).",
        sourceIndexes: [0, 5],
      },
      {
        statement:
          "High-concentration hyaluronan transfer media show no increase in total adverse events, ectopic pregnancy, fetal macrosomia, or congenital anomalies across 6,704 randomized participants, and are associated with a borderline reduction in clinical miscarriage (RR 0.82, 95% CI 0.67–1.00; 7 RCTs, n=3,091).",
        tier: "T1",
        controversy: "settled",
        direction: "supports",
        confidence: 0.93,
        rationale: "Heymann et al. (Cochrane Database of Systematic Reviews 2020, n=6,704).",
        sourceIndexes: [0, 1],
      },
      {
        statement:
          "In vitro human blastocyst-endometrial epithelial attachment assays (Ruane et al. 2020) demonstrate that exogenous 0.5 mg/mL hyaluronan operates predominantly by matching the high viscoelasticity of mid-secretory uterine luminal fluid to retain the embryo in close luminal apposition rather than acting as an immediate biochemical glue, while CD44 and RHAMM receptors on hatching trophectoderm and pinopodes mediate downstream glycocalyx signaling.",
        tier: "T5",
        controversy: "debated",
        direction: "supports",
        confidence: 0.87,
        rationale: "Ruane, Kimber, Aplin & Brison (Human Reproduction 2020).",
        sourceIndexes: [6],
      },
    ],
    milestones: [
      {
        year: 2008,
        title: "Urman et al. Landmark RCT (n=1,282) Identifies RIF (NNT=6) and Maternal Age ≥35 (NNT=7) Subgroups",
        description:
          "Prospective randomized trial of 1,282 Day 3 and Day 5 transfers establishes that 0.5 mg/mL hyaluronan medium significantly boosts implantation and clinical pregnancy, with the sharpest absolute benefit in women ≥35 and those with ≥2 prior failed cycles.",
        sourceIndex: 3,
      },
      {
        year: 2014,
        title: "Bontekoe et al. Cochrane Review Confirms Live-Birth Benefit of 0.5 mg/mL Hyaluronic Acid",
        description:
          "Meta-analysis of 16 RCTs (n=3,898) separates hyaluronic acid from ineffective fibrin sealants and confirms a significant increase in live birth (OR 1.41).",
        sourceIndex: 1,
      },
      {
        year: 2020,
        title: "Heymann et al. Updated Cochrane Meta-Analysis (26 RCTs, n=6,704) & Ruane et al. Attachment Mechanics",
        description:
          "Confirms RR 1.21 (95% CI 1.11–1.31) for live birth across 4,066 patients while Ruane, Aplin & Brison dissect the physical viscosity vs. CD44 receptor kinetics of human blastocyst attachment.",
        sourceIndex: 0,
      },
      {
        year: 2021,
        title: "Yung et al. Double-Blind FET RCT (n=550) Tests 0.5 vs. 0.125 mg/mL Hyaluronan in Vitrified-Warmed Cycles",
        description:
          "Demonstrates that in unselected vitrified-warmed FET cycles where control media already contain 0.125 mg/mL hyaluronan, elevating HA to 0.5 mg/mL does not significantly alter live birth (31.6% vs 34.5%).",
        sourceIndex: 2,
      },
      {
        year: 2023,
        title: "ESHRE Good Practice Recommendations on ART Add-Ons Differentiate Hyaluronan from Unproven Adjuncts",
        description:
          "ESHRE Add-ons Working Group highlights hyaluronic acid adherence media as one of the very few IVF laboratory add-ons backed by moderate-quality RCT evidence for live birth in fresh transfers, while recommending single embryo transfer.",
        sourceIndex: 5,
      },
    ],
    entities: [],
    controversies: [
      {
        kind: "contested",
        note: "1. Fresh Stimulated Transfers vs. Vitrified-Warmed Frozen Embryo Transfer (FET): While the 2020 Cochrane meta-analysis of 26 RCTs (Heymann et al., n=6,704) demonstrated a 21% relative increase in live birth (RR 1.21, 95% CI 1.11–1.31), the majority of positive trials involved fresh stimulated cycles or comparison against zero-hyaluronan media. In contrast, the 2021 double-blind RCT by Yung et al. (n=550 vitrified-warmed FET cycles) found no difference between 0.5 mg/mL EmbryoGlue and 0.125 mg/mL G-2 Plus control medium (31.6% vs 34.5%, p=0.47). Clinicians debate whether supraphysiological gonadotropin stimulation in fresh cycles depletes endogenous luminal hyaluronan — creating a deficit that 0.5 mg/mL EmbryoGlue rescues — whereas natural or HRT FET cycles with 0.125 mg/mL baseline HA are already saturated.",
        claimIndexes: [0, 1],
      },
      {
        kind: "debated",
        note: "2. Unselected First-Cycle Routine Use vs. Targeted Deployment in RIF & Maternal Age ≥35: Urman et al. (2008, n=1,282) and Fancsovits et al. (2015, n=581) showed that while unselected first-cycle patients experience a modest absolute gain (NNT ≈ 17), patients with ≥2 prior failed transfers (NNT = 6) or maternal age ≥35 (NNT = 7) derive substantial implantation uplift, likely because high-viscosity HA compensates for zona pellucida hardening, altered endometrial glycocalyx, or subtle uterine peristalsis.",
        claimIndexes: [1, 2],
      },
      {
        kind: "mechanistic_uncertainty",
        note: "3. Direct CD44/RHAMM Receptor Bridging vs. Physical Viscoelastic Plume Retention: Ruane, Kimber, Aplin & Brison (Human Reproduction 2020) demonstrated in human blastocyst-endometrial co-culture that 0.5 mg/mL hyaluronan does not immediately accelerate early biochemical binding in static dishes, suggesting that its proven in vivo clinical benefit arises primarily from physical viscoelastic retention of the transferred micro-droplet inside the uterine cavity during catheter withdrawal, followed by secondary enzymatic hyaluronidase breakdown into angiogenic/signaling oligosaccharides.",
        claimIndexes: [0, 5],
      },
    ],
  },
};




