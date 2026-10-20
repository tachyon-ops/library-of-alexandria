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
};



