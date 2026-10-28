import { fileURLToPath } from "node:url";
import { getSql, type Sql } from "./client";
import { ECONOMICS_FINANCE_DOSSIERS } from "./economics-finance-dossiers";
import { FERTILITY_SEED_DOSSIERS } from "./fertility-dossiers";
import { LONGEVITY_SEED_DOSSIERS } from "./longevity-dossiers";
import { MATH_SEED_DOSSIERS } from "./math-dossiers";
import { PHYSICS_CLASSICAL_DOSSIERS } from "./physics-classical-dossiers";
import { PHYSICS_FRONTIER_GRAVITY_DOSSIERS } from "./physics-frontier-gravity-dossiers";
import { PHYSICS_GRAVITY_STRING_DOSSIERS } from "./physics-gravity-string-dossiers";
import { PHYSICS_QUANTUM_DOSSIERS } from "./physics-quantum-dossiers";
import { REGENERATION_SEED_DOSSIERS } from "./regeneration-dossiers";
import { ensureSeedTopic, getTopicBySlug, isSeedComplete, linkTopics, type SeedDossier, seedTopicDossier } from "./repo";

export const ALL_SEED_DOSSIERS: Record<string, SeedDossier> = {
  ...FERTILITY_SEED_DOSSIERS,
  ...LONGEVITY_SEED_DOSSIERS,
  ...REGENERATION_SEED_DOSSIERS,
  ...PHYSICS_CLASSICAL_DOSSIERS,
  ...PHYSICS_QUANTUM_DOSSIERS,
  ...PHYSICS_GRAVITY_STRING_DOSSIERS,
  ...PHYSICS_FRONTIER_GRAVITY_DOSSIERS,
  ...MATH_SEED_DOSSIERS,
  ...ECONOMICS_FINANCE_DOSSIERS,
};

export interface SeedNode {
  slug: string;
  title: string;
  brief: string;
  children?: SeedNode[];
}

/**
 * Canonical encyclopaedic trunks and general branches of human knowledge
 * (Pinakes / Arbre Encyclopédique), seeded across the sciences, communication,
 * semiotics, arts, humanities, and governance.
 */
export const ENCYCLOPAEDIC_TRUNKS: SeedNode[] = [
  {
    slug: "natural-and-life-sciences",
    title: "Natural & Life Sciences",
    brief:
      "Physics, chemistry, earth and planetary sciences, molecular and cellular biology, zoology and biological taxonomy, ecology, and biomedical sciences.",
    children: [
      {
        slug: "physics-and-cosmology",
        title: "Physics & Cosmology",
        brief:
          "Fundamental laws of matter, energy, motion, fields, spacetime, quantum mechanics, the Standard Model, string theory, modified/emergent gravity (MOND, Quantised Inertia), and the empirical regime limits of General Relativity and dark matter.",
        children: [
          {
            slug: "classical-mechanics-thermodynamics-electromagnetism",
            title: "Classical Mechanics, Thermodynamics & Electromagnetism",
            brief:
              "Newtonian, Lagrangian, and Hamiltonian mechanics, symplectic phase-space geometry, continuum and fluid dynamics, statistical mechanics, entropy, and Maxwellian electrodynamics.",
            children: [
              {
                slug: "analytical-mechanics-lagrangian-hamiltonian-symplectic",
                title: "Analytical Mechanics: Newtonian, Lagrangian, Hamiltonian & Symplectic Dynamics",
                brief:
                  "Principle of least action, Euler–Lagrange equations, Noether's theorem, Hamiltonian phase-space flows, Poisson brackets, Liouville's theorem, KAM theory, and three-body chaos.",
              },
              {
                slug: "thermodynamics-statistical-mechanics-and-entropy",
                title: "Thermodynamics, Statistical Mechanics & Non-Equilibrium Entropy",
                brief:
                  "Laws of thermodynamics, Boltzmann–Gibbs statistical ensembles, partition functions, Landau phase transitions, Wilson renormalization group, and non-equilibrium fluctuation theorems.",
              },
              {
                slug: "electrodynamics-maxwell-equations-and-classical-fields",
                title: "Classical Electrodynamics, Maxwell's Equations & Continuum Field Dynamics",
                brief:
                  "Covariant Maxwell equations, U(1) gauge invariance, Poynting flux, Liénard–Wiechert radiation, magnetohydrodynamics, Navier–Stokes turbulence, and radiation-reaction limits.",
              },
            ],
          },
          {
            slug: "relativity-gravitation-spacetime-physics",
            title: "Relativity, Gravitation & Spacetime Physics",
            brief:
              "Special and general relativity, Lorentzian spacetime geometry, gravitational waves, black hole horizons, and empirical breakdown regimes at Planckian singularities and ultralow accelerations (a < a0).",
            children: [
              {
                slug: "quantum-gravity-string-theory-loop-quantum-gravity",
                title: "Quantum Gravity, String Theory & Loop Quantum Gravity",
                brief:
                  "Non-renormalizability of perturbative Einstein gravity, Bekenstein–Hawking black hole entropy, the Page curve information paradox, superstring/M-theory, and background-independent quantum geometry.",
                children: [
                  {
                    slug: "string-theory-m-theory-and-holographic-duality",
                    title: "String Theory, M-Theory, Calabi–Yau Compactification & AdS/CFT Holography",
                    brief:
                      "Relativistic strings, Green–Schwarz anomaly cancellation, 11D M-theory, D-brane black hole microstates, Maldacena's AdS/CFT duality, the 10^500 landscape, and Swampland constraints.",
                  },
                  {
                    slug: "loop-quantum-gravity-spin-foams-and-causal-sets",
                    title: "Loop Quantum Gravity, Spin Foams, Causal Dynamical Triangulations & Asymptotic Safety",
                    brief:
                      "Ashtekar–Barbero connections, SU(2) spin networks, discrete Planck-scale area/volume spectra, EPRL spin foams, Loop Quantum Cosmology bounce, and causal set theory.",
                  },
                ],
              },
              {
                slug: "modified-emergent-and-frontier-gravity-theories",
                title: "Modified, Emergent & Frontier Gravity Theories",
                brief:
                  "Modified Newtonian Dynamics (MOND), relativistic AeST/TeVeS, McCulloch's Quantised Inertia (MiHsC), Verlinde's emergent gravity, wide-binary tests, and the epistemic limits of ad-hoc dark matter halos.",
                children: [
                  {
                    slug: "mond-modified-newtonian-dynamics-and-galactic-rotation",
                    title: "Modified Newtonian Dynamics (MOND), Relativistic Extensions & Galactic Dynamics",
                    brief:
                      "Milgrom's acceleration threshold a0 ≈ 1.2×10^-10 m/s^2, zero-parameter Baryonic Tully–Fisher and Radial Acceleration Relations across SPARC galaxies, the External Field Effect, and AeST relativistic field theory.",
                  },
                  {
                    slug: "quantised-inertia-horizon-mechanics-and-unruh-radiation",
                    title: "Quantised Inertia (MiHsC), Horizon Mechanics, Unruh Radiation & Anti-Gravity Propulsion",
                    brief:
                      "Mike McCulloch's Hubble-scale Casimir/Rindler horizon model of inertia, Unruh radiation damping, zero-parameter galaxy rotation and wide-binary predictions, and laboratory horizon-drive/anti-gravity thrust bounds.",
                  },
                  {
                    slug: "dark-matter-adhoc-epistemology-and-gr-breakdown-limits",
                    title: "Dark Matter Ad-Hoc Parameters vs. General Relativity Breakdown at Galactic & Wide-Binary Scales",
                    brief:
                      "Epistemic audit of per-galaxy ΛCDM halo parameter fitting and 40-year WIMP direct-detection nulls versus the empirical breakdown of General Relativity in galactic rotation curves and Gaia DR3 wide binary star systems.",
                  },
                ],
              },
              {
                slug: "roger-penrose-twistor-theory-singularities-cosmology",
                title: "Sir Roger Penrose: Mathematical Physics, Twistor Theory & Cosmology",
                brief:
                  "Penrose–Hawking singularity theorems, cosmic censorship, trapped surfaces, the Penrose process, spin networks, twistor theory, aperiodic Penrose tilings, Conformal Cyclic Cosmology (CCC), and gravitational Objective Reduction (Orch-OR).",
              },
            ],
          },
          {
            slug: "quantum-mechanics-field-theory-particle-physics",
            title: "Quantum Mechanics, Quantum Field Theory & Particle Physics",
            brief:
              "Wave mechanics, Hilbert space operator formalism, Bell nonlocality, relativistic Quantum Field Theory, the SU(3)×SU(2)×U(1) Standard Model, and fault-tolerant quantum information.",
            children: [
              {
                slug: "quantum-mechanics-hilbert-space-and-entanglement",
                title: "Quantum Mechanics: Wave Mechanics, Entanglement, Nonlocality & Measurement",
                brief:
                  "Schrödinger and Dirac equations, canonical commutation relations, Born rule, EPR paradox, loophole-free Bell–CHSH inequality violations, decoherence, and interpretations of the measurement problem.",
              },
              {
                slug: "standard-model-gauge-theories-and-particle-physics",
                title: "The Standard Model: Gauge Symmetries, Electroweak Unification, QCD & Anomalies",
                brief:
                  "Local SU(3)_C × SU(2)_L × U(1)_Y Yang–Mills gauge theory, QED anomalous magnetic moment precision, QCD asymptotic freedom and confinement, the Brout–Englert–Higgs mechanism, neutrino oscillations, and g-2 tensions.",
              },
              {
                slug: "quantum-information-computing-and-error-correction",
                title: "Quantum Information, Quantum Computing & Fault-Tolerant Error Correction",
                brief:
                  "Von Neumann entropy, no-cloning theorem, Shor and Grover algorithms, BQP complexity, decoherence thresholds, Kitaev surface codes, and sub-threshold logical qubits.",
              },
            ],
          },
          {
            slug: "condensed-matter-atomic-molecular-optical-physics",
            title: "Condensed Matter, Atomic, Molecular & Optical Physics",
            brief:
              "Electronic band structure, Landau symmetry breaking, BCS and high-Tc superconductivity, Integer and Fractional Quantum Hall Effects, topological insulators, Bose–Einstein condensates, and optical atomic clocks.",
          },
        ],
      },
      {
        slug: "chemistry-and-molecular-sciences",
        title: "Chemistry & Molecular Sciences",
        brief:
          "Atomic and molecular structure, chemical bonding, quantum chemistry, thermodynamics, reaction kinetics, synthesis, materials, and the molecular basis of life.",
        children: [
          {
            slug: "physical-chemistry-quantum-chemistry-chemical-physics",
            title: "Physical Chemistry, Quantum Chemistry & Chemical Physics",
            brief:
              "Ab initio electronic structure, density functional theory, molecular orbital theory, chemical thermodynamics, ultrafast spectroscopy, and reaction dynamics at the physics–chemistry interface.",
          },
          {
            slug: "inorganic-coordination-and-solid-state-chemistry",
            title: "Inorganic, Coordination & Solid-State Chemistry",
            brief:
              "Main-group and transition-metal coordination complexes, ligand field theory, organometallics, heterogeneous catalysis, crystallography, and solid-state materials.",
          },
          {
            slug: "organic-supramolecular-and-synthetic-chemistry",
            title: "Organic, Supramolecular & Synthetic Chemistry",
            brief:
              "Carbon-based molecular architecture, reaction mechanisms, asymmetric catalysis, total synthesis of natural products, polymers, and non-covalent supramolecular self-assembly.",
          },
          {
            slug: "biochemistry-chemical-biology-and-abiogenesis",
            title: "Biochemistry, Chemical Biology & Origin of Life (Abiogenesis)",
            brief:
              "Protein folding, enzyme catalysis, bioenergetics, metabolic networks, prebiotic chemistry, the RNA world hypothesis, and the chemical emergence of living systems.",
          },
        ],
      },
      {
        slug: "biology-and-life-sciences",
        title: "Biology & Life Sciences",
        brief:
          "Cellular and molecular organization of living organisms, genetics, evolutionary theory, systematics and taxonomy across the domains of life, zoology, botany, and ecology.",
        children: [
          {
            slug: "molecular-cellular-and-evolutionary-biology",
            title: "Molecular, Cellular & Evolutionary Biology",
            brief:
              "Genome replication and transcription, epigenetics, organelle biology, developmental gene regulatory networks, natural selection, population genetics, and speciation.",
          },
          {
            slug: "biological-taxonomy-systematics-tree-of-life",
            title: "Biological Taxonomy, Systematics & the Tree of Life",
            brief:
              "Linnaean classification, phylogenetic systematics, cladistics, molecular phylogenomics, and the evolutionary domains of Archaea, Bacteria, and Eukarya.",
          },
          {
            slug: "zoology-and-the-animal-kingdom-metazoa",
            title: "Zoology & the Animal Kingdom (Metazoa)",
            brief:
              "Evolutionary radiation, comparative anatomy, physiology, embryology, and diversity of multicellular animals from basal sponges to vertebrates.",
            children: [
              {
                slug: "invertebrate-zoology-porifera-mollusca-arthropoda",
                title: "Invertebrate Zoology: Sponges, Cnidarians, Molluscs & Arthropods",
                brief:
                  "Porifera, Cnidaria, Lophotrochozoa (cephalopod neurobiology and molluscan diversity), Ecdysozoa (insects, arachnids, crustaceans, nematodes), and Echinodermata.",
              },
              {
                slug: "vertebrate-zoology-chordata-fishes-birds-mammals",
                title: "Vertebrate Zoology: Fishes, Amphibians, Reptiles, Birds & Mammals",
                brief:
                  "Chordate body plans, craniate evolution, ichthyology, herpetology, avian physiology and migration, and mammalian evolution including cetaceans and primates.",
              },
              {
                slug: "ethology-animal-cognition-and-biosemiotics",
                title: "Ethology, Animal Cognition & Biosemiotics",
                brief:
                  "Comparative animal behaviour, Tinbergen's four questions, navigation, tool use, vocal and chemical animal communication, Umwelt theory, and zoosemiotics.",
              },
            ],
          },
          {
            slug: "botany-mycology-microbiology-and-ecology",
            title: "Botany, Mycology, Microbiology & Ecology",
            brief:
              "Photosynthesis and plant physiology, mycorrhizal fungal networks, bacteriophages and microbial communities, trophic dynamics, and biosphere biogeochemistry.",
          },
        ],
      },
      {
        slug: "medicine-health-and-longevity",
        title: "Medicine, Health & Longevity",
        brief:
          "Clinical medicine, pathophysiology, epidemiology, pharmacology, geroscience, neuroscience, preventive medicine, and translational therapeutics across the human lifespan.",
        children: [
          {
            slug: "reproductive-medicine-human-fertility",
            title: "Reproductive Medicine & Human Fertility",
            brief:
              "Physiology, epidemiology, pathology, and clinical interventions in human reproduction across the lifespan, including gametogenesis, ovarian reserve, cryopreservation, endometrial receptivity, andrology, assisted reproductive technology, maternal-fetal medicine, and translational reproductive biology.",
            children: [
              {
                slug: "ovarian-reserve-oocyte-cryopreservation",
                title: "Ovarian Reserve & Oocyte Cryopreservation",
                brief:
                  "Follicular dynamics, ovarian aging across the reproductive lifespan, double stimulation (DuoStim), oocyte vitrification, warming survival, and cumulative live birth outcomes.",
                children: [
                  {
                    slug: "oocyte-nuclear-maturity-and-morphological-grading",
                    title: "Oocyte Nuclear Maturity (MII/MI/GV) & Morphological Grading",
                    brief:
                      "Istanbul consensus oocyte assessment, Metaphase II (MII) vs Metaphase I (MI) and Germinal Vesicle (GV) nuclear maturity, polar body integrity, perivitelline space, zona pellucida birefringence, smooth endoplasmic reticulum (SER) aggregates, and cytoplasmic dysmorphisms.",
                  },
                ],
              },
              {
                slug: "endometrial-receptivity-implantation-biology",
                title: "Endometrial Receptivity & Implantation Biology",
                brief:
                  "Endometrial physiology, natural-cycle versus programmed embryo transfer, hyaluronan-enriched adherence media (EmbryoGlue), inter-transfer intervals (immediate vs. delayed FET and endometrial reset), recurrent implantation failure, reproductive immunology, and maternal-fetal microRNA exchange.",
                children: [
                  {
                    slug: "inter-transfer-interval-immediate-vs-delayed-frozen-embryo-transfer",
                    title: "Inter-Transfer Interval: Immediate vs. Delayed Frozen Embryo Transfer (FET) & Endometrial Reset",
                    brief:
                      "Immediate next-menstrual-cycle Frozen Embryo Transfer (FET) versus multi-month delayed transfer after a failed embryo transfer or retrieval, cryostorage duration safety at −196°C, HPO-axis washout from programmed HRT to natural ovulatory cycles, CD138 chronic endometritis clearance, and strategic optimization before transferring a final remaining embryo.",
                  },
                  {
                    slug: "hyaluronan-embryo-transfer-media-embryoglue-implantation-adherence",
                    title: "Hyaluronan-Enriched Embryo Transfer Media (EmbryoGlue) & Implantation Adherence",
                    brief:
                      "Randomised clinical trials, Cochrane meta-analyses, and biophysical mechanisms of hyaluronan-enriched embryo transfer medium (EmbryoGlue, 0.5 mg/mL hyaluronan) versus standard low-hyaluronan transfer media: CD44 and RHAMM receptor-mediated embryo–endometrial apposition, luminal fluid viscosity, live-birth and clinical pregnancy rates across fresh and frozen-thawed embryo transfers (FET), recurrent implantation failure (RIF) and maternal age ≥35 subgroups, multiple pregnancy risk, and ESHRE add-on guidance.",
                  },
                  {
                    slug: "fet-endometrial-preparation-luteal-progesterone-and-implantation-biologics",
                    title: "Frozen Embryo Transfer (FET) Protocols, Luteal Progesterone Rescue & Implantation Biologics (PRP, PBMC, Microbiome)",
                    brief:
                      "Comparative effectiveness of ovulatory natural, letrozole-stimulated, and programmed HRT frozen embryo transfer protocols (COMPETE RCT), transfer-day serum progesterone rescue (iLPS with subcutaneous Prolutex or IM P4), CD138 chronic endometritis and Lactobacillus crispatus + lactoferrin microbiome reconstitution, pre-transfer vascular/circadian conditioning, immediate post-transfer ambulation, luteal GnRH-agonist bolus, and intrauterine autologous hCG-activated PBMC and leukocyte-poor PRP biologics.",
                  },
                ],
              },
              {
                slug: "andrology-male-factor-infertility",
                title: "Andrology & Male Factor Infertility",
                brief:
                  "Spermatogenesis, sperm chromatin and DNA integrity, microfluidic sperm selection (ZyMōt), testicular sperm aspiration (TESA), paternal age effects after 40, and clinical interventions.",
                children: [
                  {
                    slug: "sperm-chromatin-integrity-dna-fragmentation-diagnostics",
                    title: "Sperm Chromatin Integrity & DNA Fragmentation Diagnostics",
                    brief:
                      "Oxidative and apoptotic mechanisms of sperm DNA damage, microfluidic chip sorting, testicular sperm bypass, and comparative diagnostic accuracy of TUNEL, SCSA, SCD, and Comet assays.",
                  },
                  {
                    slug: "paternal-age-effects-on-gamete-embryo-offspring-health",
                    title: "Paternal Age Effects on Gamete, Embryo & Offspring Health",
                    brief:
                      "Epidemiological and molecular effects of paternal age across the lifespan on blastocyst development, de novo germline mutations, and offspring health.",
                  },
                ],
              },
              {
                slug: "assisted-reproductive-technology-gamete-donation",
                title: "Assisted Reproductive Technology & Gamete Donation",
                brief:
                  "In vitro fertilisation, intracytoplasmic sperm injection, embryo selection, third-party reproduction, outcomes, and international regulatory frameworks.",
                children: [
                  {
                    slug: "zygote-pronuclear-scoring-2pn-1pn-3pn-fertilisation",
                    title: "Zygote Pronuclear Scoring (2PN, 1PN, 0PN & 3PN) & Fertilisation Ploidy Assessment",
                    brief:
                      "ESHRE/Istanbul fertilisation check at 16–18 hours post-insemination, normal diploid 2PN2PB zygotes, monopronuclear (1PN) and appronuclear (0PN) biparental diploid rescue via PGT-A/SNP haplotyping, and tripronuclear (3PN) polyspermy/digyny exclusion.",
                  },
                  {
                    slug: "blastocyst-morphological-grading-gardner-criteria-morphokinetics",
                    title: "Blastocyst Morphological Grading (Gardner AA/BB System) & Embryo Morphokinetics",
                    brief:
                      "Gardner & Schoolcraft blastocyst scoring (expansion stages 1–6, Inner Cell Mass grades A–C, Trophectoderm grades A–C: AA, AB, BA, BB, BC, CC), Day 3 cleavage compaction, time-lapse morphokinetic intervals, euploidy correlation, and live-birth outcomes.",
                  },
                  {
                    slug: "monopronuclear-1pn-and-low-grade-blastocyst-transfer-optimization",
                    title: "Monopronuclear (1PN) & Low-Grade Blastocyst (BC/CB/CC) Ploidy Triage, Lab Adjuncts & Perinatal Outcomes",
                    brief:
                      "Time-lapse morphokinetics and SNP-haplotyping of monopronuclear (1PN) zygotes across conventional IVF (96.9% biparental diploid at blastocyst stage) and ICSI (65.9% biparental diploid), blastocyst culture as a biological haploidy filter, avoidance of double-vitrification biopsy trauma, first-trimester SNP-based NIPT verification, perinatal safety of low-grade (BC/CB/CC) blastocysts, and laboratory transfer adjuncts.",
                  },
                ],
              },
              {
                slug: "translational-geroprotective-reproductive-biology",
                title: "Translational & Geroprotective Reproductive Biology",
                brief:
                  "In vitro gametogenesis, mitochondrial replacement therapy (maternal spindle and pronuclear transfer), engineered ovarian support cell IVM, Hippo-pathway in vitro activation, mTOR/rapamycin modulation, NAD+/NMN and spermidine mitophagy, and intraovarian biologics.",
                children: [
                  {
                    slug: "mitochondrial-replacement-therapy-ooplasmic-transfer",
                    title: "Mitochondrial Replacement Therapy & Ooplasmic Transfer",
                    brief:
                      "Maternal spindle transfer (MST), pronuclear transfer (PNT), germinal vesicle transfer, autologous mitochondrial injection, heteroplasmy drift, and clinical trials preserving 100% parental nuclear DNA.",
                  },
                  {
                    slug: "in-vitro-gametogenesis-pluripotent-stem-cell-reprogramming",
                    title: "In Vitro Gametogenesis & Pluripotent Stem Cell Reprogramming",
                    brief:
                      "Reconstitution of human oogenesis from induced pluripotent stem cells (iPSCs), primordial germ cell specification, meiotic checkpoints, and iPSC-derived ovarian support cells (engineered IVM).",
                  },
                  {
                    slug: "mtor-pathway-modulation-follicular-longevity",
                    title: "mTOR Pathway Modulation & Follicular Longevity",
                    brief:
                      "Mechanistic and clinical studies of mTORC1 inhibition (rapamycin VIBRANT trial), NAD+/NMN sirtuin spindle stabilization, and spermidine mitophagy activation in ovarian aging.",
                  },
                  {
                    slug: "intraovarian-platelet-rich-plasma-stem-cell-biologics",
                    title: "Intraovarian Platelet-Rich Plasma & Stem Cell Biologics",
                    brief:
                      "Hippo pathway in vitro activation (IVA), paracrine angiogenic signaling, autologous PRP, extracellular vesicles, and clinical evaluation of intraovarian biologics.",
                  },
                ],
              },
              {
                slug: "advanced-maternal-age-pregnancy-after-40",
                title: "Advanced Maternal Age & Pregnancy After 40",
                brief:
                  "Maternal cardiovascular and metabolic adaptation, low-dose aspirin pre-eclampsia prophylaxis, sFlt-1/PlGF biomarkers, gestational diabetes, placental biology, and perinatal outcomes after age 40.",
              },
              {
                slug: "lifestyle-metabolic-and-environmental-fertility-optimization",
                title: "Lifestyle, Metabolic Health & Natural Conception Optimization",
                brief:
                  "Non-assisted reproductive optimization at 40–50: circadian sleep and follicular melatonin signaling, pro-fertility nutrition and targeted micronutrient protocols, oocyte mitochondrial ATP bioenergetics (CoQ10, NAD+, spermidine mitophagy), and organic facilitators (24–36h sperm DNA fragmentation reduction, early-shifted fertile window timing, cervical mucus protection, and endocrine/toxin clearance).",
                children: [
                  {
                    slug: "gamete-rejuvenation-mitochondrial-bioenergetics-and-natural-conception-after-40",
                    title: "Gamete Rejuvenation (Oocyte & Sperm), Mitochondrial Bioenergetics, Sport Physiology & Natural Conception at 40+",
                    brief:
                      "Exhaustive open-literature synthesis of sperm rejuvenation (1–3h double ejaculation, Astaxanthin, L-Carnitine, Myo-Inositol, Leydig StAR restoration), ovarian and oocyte rejuvenation (CD38 blockade, NMN/NR + Apigenin/Quercetin, Spermidine/Urolithin A mitophagy, Connexin-37/43 transzonal projections, stromal fibrosis reversal, 830 nm photobiomodulation), exercise physiology and RED-S luteal preservation, microplastic/AGE clearance, and natural conception epidemiology (AMH dissociation, Lipiodol tubal flushing, and 3-DPO corpus luteum rescue) at ages 40–45.",
                  },
                  {
                    slug: "harvard-fertility-diet-and-earth-preconception-nutrition",
                    title: "The Harvard Fertility Diet (NHS-II) & EARTH Study Preconception Nutrition",
                    brief:
                      "Comprehensive synthesis of the Harvard Nurses' Health Study II (n=17,544; 66%–84% reduction in ovulatory infertility), the MGH EARTH Pro-Fertility Diet in ART (n=357; 56% vs. 33% live birth rate), the sex-specific full-fat vs. skim dairy paradox (IGF-1/insulinemic index vs. MFGM/CLA), plant vs. animal protein (RR 0.50), trans-fat PPAR-γ blockade (RR 2.31), glycemic load & hepatic HNF-4α/SHBG regulation, the USDA/Harvard Pesticide Residue Burden Score (RR 1.88 live birth swap; -49% sperm count in high-pesticide consumers), whole-grain endometrial thickness (+0.4 mm/serving), soy isoflavone BPA neutralization, the LIFE seafood cohort (FOR 1.61; 92% 12-month pregnancy), and male Prudent/Mediterranean + FERTINUTS trials.",
                  },
                  {
                    slug: "blue-zones-high-fertility-populations-and-reproductive-longevity-genetics",
                    title: "Blue Zones, High-Fertility Populations & Reproductive Longevity Genetics (40–50+)",
                    brief:
                      "Biodemographic, nutritional, immunological, and genomic synthesis of natural late-life fertility (ages 40–50+) across Blue Zones (Sardinia Ogliastra/Barbagia, Ikaria, Okinawa, Nicoya, Loma Linda) and high-fertility populations (Hutterites TFR 9.8 & HLA-G/HLA dissimilarity, Bolivian Tsimane TFR 9.0 & zero vascular calcification, Yoruba of Igbo-Ora dual-FSH dizygotic twinning, Cândido Godói TP53/LIF), the evolutionary coupling of motherhood ≥40 with centenarian survival (OR 4.0, Perls Nature 1997; brothers' mortality RR 0.786, Smith 2009), and the 290 genetic loci of human ovarian aging (Ruth et al., Nature 2021, n=201,323: BRCA1/2, MCM8/9, HELQ, CHEK2 DNA repair).",
                  },
                ],
              },
            ],
          },
          {
            slug: "geroscience-cellular-senescence-longevity-biology",
            title: "Geroscience, Cellular Senescence & Longevity Biology",
            brief:
              "Hallmarks of biological aging, telomere dynamics, epigenetic clocks, senolytics, autophagy, NAD+ and sirtuin metabolism, caloric restriction mimetics, and partial cellular reprogramming.",
            children: [
              {
                slug: "epigenetic-clocks-dna-methylation-and-biological-age-biomarkers",
                title: "Epigenetic Clocks, DNA Methylation & Biological Age Biomarkers (Horvath, GrimAge, DunedinPACE)",
                brief:
                  "First-, second-, and third-generation DNA methylation clocks (Horvath 353-CpG pan-tissue, Hannum, PhenoAge, GrimAge2, DunedinPACE), PRC2/TET/DNMT drift, CausAge/AdaptAge/DamAge Mendelian randomization, and universal mammalian pan-tissue clocks.",
                children: [
                  {
                    slug: "organ-specific-proteomic-clocks-and-multi-omic-aging-signatures",
                    title: "Organ-Specific Plasma Proteomic Clocks, IgG Glycan Clocks & Multi-Omic Aging Trajectories",
                    brief:
                      "Stanford 5,000-protein SomaScan organ-specific plasma aging clocks (Oh & Wyss-Coray Nature 2023), UK Biobank 2,897-protein Olink organ clocks, non-linear human multi-omic aging waves at ages 34, 44, 60, and 78 (Lehallier 2019; Shen & Snyder 2024), and IgG N-glycan (GlycanAge) immunosenescence biomarkers.",
                  },
                ],
              },
              {
                slug: "partial-cellular-reprogramming-yamanaka-factors-and-epigenetic-reset",
                title: "Partial Cellular Reprogramming, Yamanaka Factors (OSKM/OSK) & Epigenetic Information Reset",
                brief:
                  "Cyclic in vivo OSKM reprogramming (Ocampo & Izpisua Belmonte Cell 2016), c-Myc-free AAV-OSK optic nerve regeneration and Information Theory of Aging validation (Lu & Sinclair Nature 2020; Yang & Sinclair Cell 2023), 124-week-old mouse +109% remaining lifespan extension (Macip Nature Aging 2024), and 30-year human fibroblast maturation-phase epigenetic reset (Gill & Reik eLife 2022).",
                children: [
                  {
                    slug: "chemical-and-mrna-transient-reprogramming-without-oncogenic-transformation",
                    title: "Chemical Cocktails & Transient mRNA Delivery for Non-Oncogenic Partial Reprogramming",
                    brief:
                      "Four-day non-integrating modified mRNA reprogramming (OSKMLN) of aged human fibroblasts, endothelial cells, chondrocytes, and muscle stem cells (Sarkar, Rando & Sebastiano Nat Commun 2020) and six small-molecule chemical reprogramming cocktails (VC6TF; Yang & Sinclair Aging 2023).",
                  },
                ],
              },
              {
                slug: "cellular-senescence-sasp-senolytics-and-senomorphics",
                title: "Cellular Senescence, SASP Paracrine Cascades, Senolytics & Senomorphics",
                brief:
                  "p16INK4a/p21CIP1 arrest, the Senescence-Associated Secretory Phenotype (SASP), Senescent Cell Anti-Apoptotic Pathways (SCAPs), INK-ATTAC genetic clearance (Baker & van Deursen Nature 2016), hit-and-run Dasatinib + Quercetin (Xu & Kirkland Nat Med 2018; Hickson human biopsy RCT 2019), Fisetin (Yousefzadeh & Niedernhofer 2018), FOXO4-DRI peptide (Baar Cell 2017), and SASP-suppressing senomorphics.",
                children: [
                  {
                    slug: "immunotherapy-car-t-and-vaccines-for-senescent-cell-clearance",
                    title: "Senolytic CAR-T Cells (uPAR, NKG2DL), GPNMB Vaccines & Immune Clearance of Senescent Cells",
                    brief:
                      "Lifelong prophylactic and therapeutic uPAR-targeted senolytic CAR-T cells (Amor & Lowe Nature 2020 / Nature Aging 2024), NKG2D-ligand CAR-T cells in aged non-human primates, GPNMB senolytic peptide vaccination (Suda & Minamino Nature 2021), PD-L1/PD-L2/HLA-E immune checkpoint evasion, and Procyanidin C1 (+64.2% remaining mouse lifespan).",
                  },
                ],
              },
              {
                slug: "nutrient-sensing-mtor-ampk-igf1-and-geroprotective-pharmacology",
                title: "Nutrient-Sensing Networks (mTORC1, AMPK, IIS/FOXO3) & Geroprotective Pharmacology",
                brief:
                  "NIA Interventions Testing Program (ITP) gold-standard lifespan extensions via Rapamycin (+23%–28%, Harrison Nature 2009 / Miller 2014), Acarbose (+22% male), 17α-Estradiol (+19% male), Canagliflozin (+14% male), rapalog + trametinib + lithium triple synergy (+48%), human low-dose weekly mTORC1 inhibition (Mannick 2014/2018), and the TAME metformin framework.",
                children: [
                  {
                    slug: "caloric-restriction-fasting-mimetics-and-human-calerie-trials",
                    title: "Caloric Restriction, Circadian Time-Restricted Feeding, Fasting-Mimicking Diets & Human CALERIE Trials",
                    brief:
                      "Circadian active-phase feeding (+35% vs +10% mouse lifespan; Acosta-Rodríguez & Takahashi Science 2022), the 2-year NIH CALERIE Phase 2 human RCT (14% CR slows DunedinPACE by 2%–3% and regenerates the thymus via PLA2G7 suppression; Waziry Nat Aging 2023; Spadaro & Dixit Science 2022), and 5-day Fasting-Mimicking Diet cycles (−2.5 yr human biological age; Brandhorst, Levine & Longo Nat Commun 2024).",
                  },
                  {
                    slug: "endogenous-geroprotective-metabolites-taurine-akg-ergothioneine-and-h2s",
                    title: "Endogenous Longevity Metabolites: Taurine Deficiency Reversal, Calcium α-Ketoglutarate (Ca-AKG), Ergothioneine (SLC22A4) & Hydrogen Sulfide (H2S)",
                    brief:
                      "Reversal of >80% age-related taurine depletion (+10%–12% mouse lifespan & primate healthspan; Singh & Yadav Science 2023), Calcium α-Ketoglutarate TET/JMJD3 cosubstrate & 41%–46% morbidity compression (Asadi Shahmirzadi & Kennedy Cell Metab 2020), Ergothioneine OCTN1/SLC22A4 cytoprotection (HR 0.79 CV mortality; Smith 2020; Katsube 2024), and CSE-derived H2S protein persulfidation.",
                  },
                ],
              },
              {
                slug: "nad-metabolism-sirtuins-cd38-inhibition-and-mitochondrial-rejuvenation",
                title: "NAD+ Metabolism, Sirtuins (SIRT1–SIRT7), CD38 Inhibition & Mitochondrial Bioenergetics",
                brief:
                  "SASP-induced macrophage CD38 NADase sink (Camacho-Pereira & Chini Cell Metab 2016; Covarrubias & Verdin Nat Metab 2020), nuclear NAD+ depletion and HIF-1α pseudohypoxia reversal (Gomes & Sinclair Cell 2013), SIRT6 mammalian lifespan extension (+23%–30%; Roichman & Cohen Nat Commun 2021), NAMPT exercise induction, and human NMN/NR clinical trials (Yoshino, Klein & Imai Science 2021).",
                children: [
                  {
                    slug: "mitophagy-activators-urolithin-a-spermidine-glynac-and-ss31",
                    title: "Mitophagy & Mitochondrial Quality Control: Urolithin A, Spermidine, GlyNAC & Elamipretide (SS-31)",
                    brief:
                      "PINK1/Parkin mitophagy induction via Urolithin A (+45% worm lifespan, +12% human muscle strength RCT; Auwerx Nat Med 2016 / Singh Cell Rep Med 2022), Spermidine EP300 inhibition and eIF5A-TFEB hypusination (Madeo & Kroemer Nat Med 2016 / Nat Cell Biol 2024), GlyNAC glutathione and β-oxidation restoration in older adults (Kumar & Sekhar J Gerontol 2023), and SS-31 cardiolipin stabilization.",
                  },
                ],
              },
              {
                slug: "telomere-dynamics-telomerase-tert-and-replicative-immortality",
                title: "Telomere Attrition, Shelterin Complex, Telomerase (TERT) Gene Therapy & Replicative Senescence",
                brief:
                  "Species telomere shortening rate law (R² = 0.934; Whittemore & Blasco PNAS 2019), telomere-p53-PGC1α mitochondrial repression (Sahin & DePinho Nature 2011), AAV9-TERT and MCMV-TERT mammalian lifespan extension (+24% to +41.4% without excess cancer; Blasco 2012; Jaijyan & Zhu PNAS 2022), small-molecule TERT Activating Compound (TAC; Shim & DePinho Cell 2024), and endurance/HIIT telomerase activation (Werner & Laufs Eur Heart J 2019).",
              },
              {
                slug: "heterochronic-parabiosis-therapeutic-plasma-exchange-and-systemic-factors",
                title: "Heterochronic Parabiosis, Therapeutic Plasma Exchange (TPE) & Systemic Circulating Rejuvenation Factors",
                brief:
                  "Stem cell niche rejuvenation via shared young circulation (Conboy & Rando Nature 2005), extended 3-month parabiosis epigenetic clock reversal (−20% to −30%) and post-detachment lifespan extension (Zhang, Gladyshev & White Nature Aging 2023), Neutral Blood Exchange / human Therapeutic Plasma Exchange with 5% Albumin (−1.3 to −2.6 yr biological age; Conboy 2020/2022; AMBAR Phase 3 RCT), and circulating PF4, TIMP2, and Oxytocin.",
              },
              {
                slug: "thymic-regeneration-immunosenescence-and-inflammaging-reversal",
                title: "Thymic Involution Reversal, Immunosenescence, Inflammaging & Hematopoietic Rejuvenation",
                brief:
                  "Human MRI thymic regeneration and −2.5 year GrimAge reversal in the TRIIM trial (rhGH + DHEA + Metformin; Fahy & Horvath Aging Cell 2019), solid-organ senescence driven by Ercc1-deficient aged immune cells (Yousefzadeh & Niedernhofer Nature 2021), and antibody depletion of aged myeloid-biased hematopoietic stem cells to restore youthful adaptive immunity (Ross & Weissman Nature 2024).",
              },
              {
                slug: "proteostasis-autophagy-extracellular-matrix-stiffening-and-age-crosslinks",
                title: "Loss of Proteostasis, Chaperone-Mediated Autophagy, ECM Cross-Linking (AGEs) & Tissue Fibrosis",
                brief:
                  "Beclin-1–BCL2 uncoupling and mammalian macroautophagy lifespan extension (+12%; Fernández & Levine Nature 2018), LAMP2A Chaperone-Mediated Autophagy and CA77.1 (Bourdenx & Cuervo Cell 2021), Glucosepane non-enzymatic Maillard cross-linking (>90% of aged human collagen cross-links; Monnier 2005), and Piezo1 mechanotransduction reset of stiffened stem cell niches (Segel & Franklin Nature 2019).",
              },
              {
                slug: "comparative-longevity-genomics-naked-mole-rats-bowhead-whales-and-centenarians",
                title: "Comparative Biology of Extreme Longevity: Bowhead Whales, Naked Mole-Rats, Greenland Sharks & Human Centenarians",
                brief:
                  "Universal inverse scaling of somatic mutation rates with mammalian lifespan (47 vs 796 mut/yr; Cagan & Martincorena Nature 2022), naked mole-rat high-molecular-weight hyaluronic acid transfer into mice (nmrHas2 extends lifespan and cuts cancer 50%–70%; Gorbunova & Seluanov Nature 2023), rodent SIRT6 DSB repair evolution (Cell 2019), Bowhead whale CIRBP/ERCC1 (211+ yr), elephant 20-copy TP53, and human centenarian alleles (FOXO3A, APOE ε2, IGF1R, LAV-BPIFB4).",
              },
              {
                slug: "physiological-hormesis-vo2max-sauna-cold-shock-and-circadian-longevity",
                title: "Physiological Hormesis, Cardiorespiratory Fitness (VO2max), Thermal Stress (HSPs), Klotho & Circadian Clocks",
                brief:
                  "Elite VO2max 80% all-cause mortality reduction (HR 0.20, n=122,007; Mandsager & Jaber JAMA Netw Open 2018), 2-year Norwegian 4×4 HIIT reversal of middle-aged cardiac left ventricular stiffness (−25%; Howden & Levine Circulation 2018), late-life resistance training reversal of muscle epigenetic clocks (Murach & Horvath Aging Cell 2022), Finnish dry sauna HSP70 hormesis (−40% mortality, −65% dementia; Laukkanen 2015), and cold-shock RBM3 synaptic protection.",
              },
              {
                slug: "developmental-bioelectricity-morphogenetic-fields-and-levin-anatomical-homeostasis",
                title: "Developmental Bioelectricity, Resting Potential (Vmem) Morphogenetic Codes & Anatomical Homeostasis (Michael Levin / Tufts)",
                brief:
                  "Non-neural gap-junction (Connexin/Innexin) resting membrane voltage (Vmem) pattern memories and top-down morphogenetic fields (TAME; Levin Cell 2021), 24-hour 5-drug BioDome bioreactor regeneration of adult Xenopus hindlimbs over 18 months (Murugan & Levin Sci Adv 2022), progesterone BioDome limb regeneration (Herrera-Rincon 2018), permanent two-headed planarian bioelectric memory (Durant & Levin Biophys J 2017), and morphostasis decay aging theory.",
                children: [
                  {
                    slug: "xenobots-anthrobots-cancer-bioelectric-normalization-and-synthetic-living-machines",
                    title: "Anthrobots, Xenobots, Bioelectric Cancer Normalization & Self-Assembling Synthetic Living Machines",
                    brief:
                      "Self-assembling adult human tracheal epithelial Anthrobots that bridge and heal scratched human neural tissue without genetic modification (Gumuskaya & Levin Adv Sci 2023), AI-designed self-replicating Xenopus Xenobots (Kriegman, Bongard & Levin PNAS 2020/2021), and hyperpolarizing ion-channel/optogenetic normalization of KRAS/Gli1 tumors (Chernet & Levin Oncotarget 2016).",
                  },
                ],
              },
              {
                slug: "epimorphic-limb-regeneration-axolotl-blastema-and-scarless-acomys-healing",
                title: "Epimorphic Limb Regeneration, Axolotl Blastema Dedifferentiation, Positional Memory & Spiny Mouse (Acomys) Scarless Healing",
                brief:
                  "Lineage-restricted axolotl blastema dedifferentiation and Meis1/Prod1/RA positional memory (Kragl & Tanaka Nature 2009; Gerber Science 2018), obligatory macrophage clearance of blastema senescent cells (Godwin PNAS 2013; Yun & Brockes eLife 2015), African Spiny Mouse (Acomys) ERK-YAP scarless mammalian organ regeneration (Seifert Nature 2012 / Science 2023), and sequential BMP2→BMP9 mammalian joint regeneration (Yu & Muneoka Nature 2019).",
                children: [
                  {
                    slug: "mammalian-skeletal-ending-cartilage-regeneration-and-focal-adhesion-mechanotherapy",
                    title: "Mammalian Articular Cartilage, Bone & Dermal Regeneration: BMP2/VEGFR1 Stem Cell Reprogramming, FAK/Verteporfin Scarless Healing & 15-PGDH Inhibition",
                    brief:
                      "Resident adult skeletal stem cell reprogramming into hyaline articular cartilage via BMP2 + soluble VEGFR1 (Murphy, Chan & Longaker Nat Med 2020), Verteporfin YAP-blockade scarless skin and hair-follicle regeneration in mice and pigs (Mascharak & Longaker Science 2021), and 15-PGDH gerozyme inhibition (SW033291) to restore PGE2 and rejuvenate aged muscle and bone marrow (Palla & Blau Science 2021).",
                  },
                ],
              },
              {
                slug: "hippo-yap-taz-pathway-cardiomyocyte-proliferation-and-organ-regeneration",
                title: "Hippo–YAP/TAZ Signaling, Adult Cardiomyocyte Proliferation, Agrin/ERBB2 & Mammalian Heart and Liver Regeneration",
                brief:
                  "Post-infarction adult heart regeneration via AAV9-Sav1 Hippo knockdown in mice and pigs (Leach & Martin Nature 2017; Liu Sci Transl Med 2021), neonatal ECM Agrin and transient ERBB2 cardiomyocyte dedifferentiation (Bassat & Tzahor Nature 2017), reversible MST1/2 kinase inhibition (XMU-MP-1) for liver and intestinal regeneration (Fan & Zhou Sci Transl Med 2016), and Cpt1b fatty-acid oxidation blockade (Bae & Sadek Nature 2023).",
              },
              {
                slug: "vascular-endothelial-aging-vegf-microcirculation-and-nitric-oxide-rejuvenation",
                title: "Vascular Endothelial Aging, Microvascular Capillary Rarefaction, VEGF-A Lifespan Extension & Nitric Oxide–SIRT1 Rejuvenation",
                brief:
                  "Counteracting age-related sFlt-1 decoy trapping with 2-fold systemic VEGF-A to prevent capillary rarefaction and extend mouse lifespan by 48% in males and 39% in females (Grunewald & Keshet Science 2021), endothelial NAD+–SIRT1–H2S capillary restoration (+56%–80% endurance; Das & Sinclair Cell 2018), and CD31high/Emcnhigh Type H osteogenic capillaries (Kusumbe & Adams Nature 2014/2016).",
                children: [
                  {
                    slug: "klotho-fgf23-mineral-metabolism-and-renal-cardiovascular-longevity",
                    title: "The α-Klotho / FGF23 Endocrine Axis, Phosphate Toxicity, Renal Tubule Regeneration & Systemic Anti-Fibrotic Longevity",
                    brief:
                      "Discovery of the Klotho anti-aging hormone (+20%–30.8% mouse lifespan; Kuro-o Nature 1997; Kurosu Science 2005), the mammalian Phosphate Toxicity aging law via renal FGF23–Klotho NaPi-2a/2c clearance, and soluble α-Klotho decoy blockade of TGF-βR2, Wnt, and IGF-1R to reverse renal and cardiovascular fibrosis.",
                  },
                ],
              },
              {
                slug: "line1-retrotransposons-cgas-sting-and-nlrp3-sterile-inflammaging",
                title: "LINE-1 Retrotransposon De-Repression, Cytoplasmic Chromatin, cGAS–STING Type-I Interferon & NLRP3 Inflammasome Blockade",
                brief:
                  "Late-senescence LINE-1 retrotransposon de-repression and cytoplasmic cDNA interferon SASP reversed by Lamivudine/3TC (De Cecco & Sedivy Nature 2019; Simon & Gorbunova Cell Metab 2019), small-molecule H-151 STING blockade against leaked mtDNA neuroinflammation (Gulen & Ablasser Nature 2023), and NLRP3 inflammasome restraint by β-hydroxybutyrate (Youm & Dixit Nat Med 2015).",
              },
              {
                slug: "gut-microbiome-longevity-centenarian-isoallolca-akkermansia-and-young-fmt",
                title: "Microbiome-Driven Longevity: Centenarian Secondary Bile Acids (IsoalloLCA), Akkermansia muciniphila, Indoles & Young Fecal Microbiota Transfer",
                brief:
                  "Japanese centenarian Odoribacteraceae synthesis of antimicrobial/Treg-inducing isoalloLCA (Sato & Honda Nature 2021), gut compositional uniqueness and microbial indole survival signatures (Wilmanski & Price Nat Metab 2021), young-to-aged microbiota transfer reversal of hippocampal neuroinflammation (Boehme & Cryan Nat Aging 2021), and Akkermansia muciniphila lifespan extension (+13.5%; Bárcena & López-Otín Nat Med 2019).",
              },
              {
                slug: "membrane-pacemaker-peroxidation-index-elovl2-plasmalogens-and-ferroptosis",
                title: "The Membrane Pacemaker Theory of Aging, ELOVL2 Epigenetic Rescue, Plasmalogens & Ferroptosis (GPX4) Restraint",
                brief:
                  "Cross-species inverse scaling of maximum lifespan with mitochondrial Membrane Peroxidation Index (Hulbert 2007), epigenetic rescue of ELOVL2 promoter hypermethylation to restore retinal ultra-long-chain PUFAs and vision (Chen & Skowronska-Krawczyk Aging Cell 2020), vinyl-ether plasmalogens, and 1.75M-lifespan GWAS iron/heme ferroptosis restraint (Timmers & Deelen Nat Commun 2020; Stockwell Cell 2022).",
              },
              {
                slug: "nuclear-lamina-architecture-lamin-a-sirt7-and-heterochromatin-maintenance",
                title: "Nuclear Lamina Architecture (Lamin A/C, B1), Progerin Base-Editing Reversal, NAT10/Remodelin & Heterochromatin Maintenance",
                brief:
                  "In vivo Adenine Base Editing of LMNA c.1824C>T extending HGPS mouse lifespan by +140% to normal old age (Koblan, Collins & Liu Nature 2021), cryptic progerin splicing in normal human aging (Scaffidi & Misteli Science 2006), NAT10 inhibition with Remodelin to detach SUN1 microtubule tension (Larrieu & Jackson Science 2014), and SIRT7/WRN heterochromatin tethering.",
              },
              {
                slug: "whole-organ-bioengineering-decellularized-scaffolds-3d-bioprinting-and-xenotransplantation",
                title: "Whole-Organ Replacement: Perfusion Decellularized Scaffolds, SWIFT Vascularized 3D Bioprinting & 69-Edit CRISPR Xenotransplantation",
                brief:
                  "Whole-heart and kidney perfusion decellularization and iPSC recellularization (Ott & Taylor Nat Med 2008/2013), intravascular stereolithography and SWIFT sacrificial 3D bioprinting in cardiac organoid matrices (Grigoryan & Miller Science 2019; Skylar-Scott & Lewis Sci Adv 2019), and 69-edit CRISPR porcine kidney xenotransplantation sustaining primate life for 758 days (Anand, Kawai, Qin & Church Nature 2023).",
              },
              {
                slug: "transcriptional-elongation-speed-rna-pol-ii-splicing-fidelity-and-ribosomal-aging",
                title: "RNA Polymerase II Elongation Speed, Alternative Splicing Fidelity (SFA-1/SRSF), Resveralogue Spliceosome Reset & Ribosomal Pausing",
                brief:
                  "Cross-species age-related acceleration of RNA Polymerase II elongation speed and lifespan extension (+10%–20%) by slowing Pol II or restoring Histone H3 (Debès, Partridge & Beyer Nature 2023), SFA-1 spliceosome fidelity in dietary restriction (Heintz & Mair Nature 2017), resveralogue SRSF/TERT splicing reset (Latorre & Harries 2017), and cotranslational ribosome collision quality control (Stein & Frydman Nature 2022).",
              },
              {
                slug: "organ-cryopreservation-nanowarming-vitrification-and-metabolic-torpor-biostasis",
                title: "Cryobiology, Ice-Free Organ Vitrification & RF Nanowarming (100-Day Kidney Transplant), Ultrasound-Induced Torpor & Reversible Biostasis",
                brief:
                  "Life-sustaining transplantation of rat kidneys vitrified for 100 days at −150°C and rewarmed uniformly via radiofrequency iron-oxide nanowarming (Han, Finger & Bischof Nat Commun 2023), non-invasive preoptic ultrasound-induced synthetic torpor via TRPM2 (Yang & Chen Nat Metab 2023; Hrvatin & Greenberg Nature 2020), and complete epigenetic clock arrest during mammalian hibernation (Pinho & Horvath Nat Ecol Evol 2022).",
              },
            ],
          },
          {
            slug: "neuroscience-cognitive-science-and-consciousness",
            title: "Neuroscience, Cognitive Science & Consciousness",
            brief:
              "Synaptic transmission, neural circuit dynamics, memory consolidation, neuroimaging, neural correlates of consciousness, and neuropsychiatric pathophysiology.",
            children: [
              {
                slug: "brain-aging-glymphatic-clearance-klotho-and-neuro-rejuvenation",
                title: "Brain Aging, Glymphatic Amyloid/Tau Clearance, α-Klotho, PF4 & Neural Stem Cell Rejuvenation",
                brief:
                  "Slow-wave N3 sleep 60% interstitial expansion and astrocytic AQP4 glymphatic β-amyloid clearance (Xie & Nedergaard Science 2013), 40 Hz VIP-interneuron gamma glymphatic washout (Murdock & Tsai Nature 2024), single low-dose α-Klotho cognitive enhancement in aged rhesus macaques (Castner & Dubal Nature Aging 2023), Platelet Factor 4 (PF4) synaptic rejuvenation (Villeda Nature 2023), and myeloid PGE2-EP2 metabolic reset (Minhas & Andreasson Nature 2021).",
              },
              {
                slug: "sensory-organ-regeneration-cochlear-hair-cells-and-retinal-muller-glia",
                title: "Sensory Organ Regeneration: Cochlear Hair Cell Reprogramming (CHIR99021 + VPA), Retinal Müller Glia (ASCL1) & Otoferlin Gene Therapy",
                brief:
                  "Clonal expansion (>2,000-fold) and hair-cell differentiation of adult mammalian Lgr5+ cochlear supporting cells via CHIR99021 + Valproic Acid (McLean, Edge, Langer & Karp Cell Rep 2017), in vivo ASCL1 + HDACi reprogramming of adult mammalian retinal Müller glia into light-responsive neurons (Jorstad & Reh Nature 2017; Todd PNAS 2022), and human AAV1-OTOF congenital deafness reversal (Lv & Shu Lancet 2024).",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "communication-language-semiotics-and-media",
    title: "Communication, Language, Semiotics & Media",
    brief:
      "Human language and philology, semiotic sign systems, media ecology (Marshall McLuhan, Harold Innis, Walter Ong), rhetoric, cybernetics, and communication networks.",
    children: [
      {
        slug: "linguistics-philology-and-language-evolution",
        title: "Linguistics, Philology & Evolution of Human Language",
        brief:
          "Phonology, morphology, syntax, semantics, pragmatics, historical-comparative philology, decipherment of ancient scripts, and evolutionary origins of language.",
      },
      {
        slug: "semiotics-sign-systems-and-philosophy-of-language",
        title: "Semiotics, Sign Systems & Philosophy of Language",
        brief:
          "Peircean triadic semiotics (icon, index, symbol), Saussurean structural semiology, Umberto Eco, Roland Barthes, Yuri Lotman's semiosphere, and reference and meaning.",
      },
      {
        slug: "media-ecology-marshall-mcluhan-communication-theory",
        title: "Media Ecology, Marshall McLuhan & Communication Theory",
        brief:
          "Marshall McLuhan ('the medium is the message', hot and cool media, the Global Village, the tetrad of media laws), Harold Innis (time- vs space-biased media), Walter Ong (orality and literacy), and digital media ecology.",
      },
      {
        slug: "information-theory-cybernetics-and-rhetoric",
        title: "Information Theory, Cybernetics & Rhetoric",
        brief:
          "Claude Shannon's mathematical theory of communication, channel capacity and entropy, Norbert Wiener's cybernetics and feedback loops, and classical and modern rhetoric.",
      },
    ],
  },
  {
    slug: "arts-literature-and-aesthetics",
    title: "Arts, Literature & Aesthetics",
    brief:
      "World literature and poetics, visual arts and iconography, musicology and acoustics, performing arts, and aesthetic philosophy across human civilisations.",
    children: [
      {
        slug: "world-literature-poetics-and-comparative-mythology",
        title: "World Literature, Poetics & Comparative Mythology",
        brief:
          "Epic poetry (from Gilgamesh and Homer to Dante and Milton), lyric and dramatic poetics, the rise of the novel, narratology, translation studies, and comparative mythology.",
      },
      {
        slug: "visual-arts-painting-sculpture-and-iconography",
        title: "Visual Arts, Painting, Sculpture & Iconography",
        brief:
          "Palaeolithic parietal art, classical sculpture, perspective and optics in Renaissance painting, intaglio engraving, modern movements, and Panofskian iconology.",
      },
      {
        slug: "musicology-harmony-acoustics-and-performing-arts",
        title: "Musicology, Harmony, Acoustics & Performing Arts",
        brief:
          "Pythagorean and just intonation, counterpoint, tonal and modal harmony, ethnomusicology, musical acoustics, psychoacoustics, theatre, and cinema.",
      },
      {
        slug: "aesthetics-art-history-and-philosophy-of-beauty",
        title: "Aesthetics, Art History & Philosophy of Beauty",
        brief:
          "Theories of beauty, proportion, mimesis, the sublime, formalism, and artistic judgment from Plato, Aristotle, and Kant to contemporary aesthetics.",
      },
    ],
  },
  {
    slug: "formal-sciences-mathematics-and-computing",
    title: "Formal Sciences, Mathematics & Computing",
    brief:
      "Pure and applied mathematics, differential geometry, Lie groups, functional analysis, measure-theoretic probability, stochastic calculus, mathematical statistics, theoretical computer science, and artificial intelligence.",
    children: [
      {
        slug: "pure-applied-mathematics-geometry-and-topology",
        title: "Pure & Applied Mathematics, Geometry & Topology",
        brief:
          "Number theory, algebra, real and complex analysis, differential geometry, Lie groups, functional analysis, dynamical systems, and partial differential equations.",
        children: [
          {
            slug: "differential-geometry-manifolds-and-topology",
            title: "Differential Geometry, Manifolds, Tensor Calculus & Algebraic Topology",
            brief:
              "Riemannian and Lorentzian manifolds, Levi-Civita curvature tensors, symplectic 2-forms, principal fibre bundles, Chern–Pontryagin invariants, Calabi–Yau manifolds, and information geometry.",
          },
          {
            slug: "group-theory-lie-algebras-and-symmetry",
            title: "Group Theory, Lie Algebras, Representation Theory & Noetherian Symmetry",
            brief:
              "Galois groups, continuous Lie groups and Lie algebras, Noether's first and second theorems, Wigner's Poincaré representations, SU(3)×SU(2)×U(1) gauge symmetries, and renormalization scale invariance.",
          },
          {
            slug: "functional-analysis-pdes-and-dynamical-systems",
            title: "Functional Analysis, Operator Algebras, PDEs & Nonlinear Dynamical Systems",
            brief:
              "Infinite-dimensional Hilbert and Banach spaces, spectral theory of unbounded operators, Sobolev PDEs (Schrödinger, Maxwell, Navier–Stokes, Black–Scholes), KAM tori, and chaotic attractors.",
          },
        ],
      },
      {
        slug: "probability-theory-stochastic-calculus-and-statistics",
        title: "Probability Theory, Stochastic Calculus, Martingales & Mathematical Statistics",
        brief:
          "Kolmogorov measure-theoretic probability, Brownian motion, Itô stochastic calculus, Doob martingales, Girsanov's theorem, Feynman–Kac PDE duality, Extreme Value Theory, Bayesian inference, and Random Matrix Theory.",
      },
      {
        slug: "logic-computation-information-artificial-intelligence",
        title: "Logic, Computation, Information & Artificial Intelligence",
        brief:
          "Mathematical logic, Gödel incompleteness, Turing computability, complexity theory, Shannon information entropy, cryptography, statistical machine learning, and autonomous reasoning systems.",
      },
    ],
  },
  {
    slug: "philosophy-ethics-and-epistemology",
    title: "Philosophy, Ethics & Epistemology",
    brief:
      "Metaphysics, epistemology, philosophy of science, philosophy of mind, moral philosophy, and the history of human thought.",
    children: [
      {
        slug: "epistemology-philosophy-of-science-scientific-method",
        title: "Epistemology, Philosophy of Science & Scientific Method",
        brief:
          "Theories of knowledge, Bayesian inference, Popperian falsificationism, Kuhnian paradigm shifts, causal inference, and reproducibility in empirical science.",
      },
      {
        slug: "metaphysics-philosophy-of-mind-and-consciousness",
        title: "Metaphysics, Philosophy of Mind & Consciousness",
        brief:
          "Ontology, causation, time, personal identity, intentionality, functionalism, panpsychism, and the hard problem of conscious experience.",
      },
      {
        slug: "moral-philosophy-bioethics-and-political-philosophy",
        title: "Moral Philosophy, Bioethics & Political Philosophy",
        brief:
          "Virtue ethics, deontology, consequentialism, medical and reproductive bioethics, justice, and ethical governance of emerging technologies.",
      },
    ],
  },
  {
    slug: "history-and-archaeology",
    title: "History & Archaeology",
    brief:
      "Ancient, medieval, early-modern, and contemporary world history, epigraphy, philology, historiography, and material archaeology.",
    children: [
      {
        slug: "ancient-civilisations-epigraphy-near-eastern-archaeology",
        title: "Ancient Civilisations, Epigraphy & Near Eastern Archaeology",
        brief:
          "Sumer, Akkad, Babylon, Pharaonic and Ptolemaic Egypt, the Greco-Roman Mediterranean, Indus and Yellow River civilisations, cuneiform tablets, and papyrology.",
      },
      {
        slug: "history-of-science-technology-and-libraries",
        title: "History of Science, Technology & Libraries",
        brief:
          "From the Royal Library of Alexandria and Baghdad's Bayt al-Hikma to the printing press, the Scientific Revolution, and open digital archives.",
      },
    ],
  },
  {
    slug: "economics-and-political-economy",
    title: "Economics, Finance & Political Economy",
    brief:
      "Microeconomics, game theory, macroeconomics, central banking, financial markets, market microstructure, stochastic quantitative finance, econometrics, statistical arbitrage, and econophysics.",
    children: [
      {
        slug: "macroeconomics-political-economy-and-economic-history",
        title: "Macroeconomics, Monetary Theory, Central Banking & Economic History",
        brief:
          "Endogenous growth, monetary and fiscal regimes, New Keynesian DSGE vs Lucas critique, yield-curve dynamics, Minsky financial instability, and long-run sovereign credit cycles.",
      },
      {
        slug: "microeconomics-game-theory-and-market-design",
        title: "Microeconomics, Game Theory, Information Economics & Mechanism Design",
        brief:
          "Arrow–Debreu general equilibrium, Kahneman–Tversky prospect theory, Nash and Bayesian equilibria, Akerlof adverse selection, signaling, VCG/Milgrom–Wilson auctions, and stable matching.",
      },
      {
        slug: "financial-markets-asset-pricing-and-market-microstructure",
        title: "Financial Markets, Asset Pricing & Market Microstructure",
        brief:
          "Stochastic discount factors, Fama–French factor models, Adaptive Markets, limit order books, Kyle's lambda, Glosten–Milgrom adverse selection, square-root market impact, and VPIN order-flow toxicity.",
        children: [
          {
            slug: "quantitative-finance-stochastic-calculus-and-derivatives",
            title: "Quantitative Finance, Stochastic Calculus & Derivatives Pricing",
            brief:
              "Bachelier and Black–Scholes–Merton dynamic replication, Harrison–Kreps–Pliska risk-neutral martingale pricing, Feynman–Kac PDEs, Heston/SABR/Rough volatility, and tail-hedging breakdowns.",
          },
          {
            slug: "econometrics-financial-time-series-and-statistical-arbitrage",
            title: "Econometrics, Financial Time Series, Statistical Arbitrage & Alpha Research",
            brief:
              "ARCH/GARCH volatility clustering, Engle–Granger and Johansen cointegration, Ornstein–Uhlenbeck mean reversion, Kalman filtering, Random Matrix Theory covariance cleaning, Kelly sizing, and Deflated Sharpe Ratio.",
          },
          {
            slug: "econophysics-complex-systems-and-tail-risk",
            title: "Econophysics, Complex Financial Networks, Mandelbrot Fractals & Tail Risk",
            brief:
              "Mandelbrot multifractals, inverse-cubic power-law tails (α ≈ 3), Extreme Value Theory and Expected Shortfall, Ising spin-glass herding, Sornette LPPLS crash diagnostics, and systemic network contagion.",
          },
        ],
      },
    ],
  },
  {
    slug: "law-and-jurisprudence",
    title: "Law & Jurisprudence",
    brief:
      "Constitutional, civil, criminal, administrative, and international law, comparative legal theory, bioethics, and regulatory frameworks.",
    children: [
      {
        slug: "constitutional-international-and-bioethical-law",
        title: "Constitutional, International & Bioethical Law",
        brief:
          "Comparative constitutionalism, human rights treaties, intellectual property, and regulatory law governing medicine, biotechnology, and artificial intelligence.",
      },
    ],
  },
  {
    slug: "politics-governance-and-international-relations",
    title: "Politics, Governance & International Relations",
    brief:
      "Political theory, comparative institutions, public policy, diplomacy, security studies, and civic administration.",
    children: [
      {
        slug: "political-theory-comparative-institutions-geopolitics",
        title: "Political Theory, Comparative Institutions & Geopolitics",
        brief:
          "State formation, democratic and republican institutions, public choice, international order, and science and technology policy.",
      },
    ],
  },
  {
    slug: "architecture-engineering-and-urbanism",
    title: "Architecture, Engineering & Urbanism",
    brief:
      "Structural and civil engineering, architectural history and theory, sustainable materials, urban planning, and infrastructure systems.",
    children: [
      {
        slug: "architectural-history-structural-engineering-urban-systems",
        title: "Architectural History, Structural Engineering & Urban Systems",
        brief:
          "Classical and vernacular architecture, structural mechanics, acoustic and thermal design, civic libraries, and resilient urban ecosystems.",
      },
    ],
  },
];

/**
 * Cross-branch and cross-trunk connections uniting disciplines that intersect across the tree.
 */
export const CROSS_DISCIPLINE_LINKS: {
  slugA: string;
  slugB: string;
  relation: string;
  note: string;
}[] = [
  // Physics ↔ Mathematics & Statistics
  {
    slugA: "physics-and-cosmology",
    slugB: "formal-sciences-mathematics-and-computing",
    relation: "bridges",
    note: "Differential geometry, Lie algebras, Hilbert-space operator theory, and stochastic calculus provide the structural language of physical law from Planck scales to cosmology.",
  },
  {
    slugA: "analytical-mechanics-lagrangian-hamiltonian-symplectic",
    slugB: "differential-geometry-manifolds-and-topology",
    relation: "bridges",
    note: "Symplectic 2-forms ω = ∑ dp_i ∧ dq_i on cotangent bundles T*Q and Darboux's theorem form the exact geometric foundation of Hamiltonian phase-space mechanics.",
  },
  {
    slugA: "analytical-mechanics-lagrangian-hamiltonian-symplectic",
    slugB: "group-theory-lie-algebras-and-symmetry",
    relation: "bridges",
    note: "Emmy Noether's First Theorem maps every continuous Lie group symmetry of the Lagrangian action directly to a conserved physical current (energy, momentum, angular momentum).",
  },
  {
    slugA: "analytical-mechanics-lagrangian-hamiltonian-symplectic",
    slugB: "functional-analysis-pdes-and-dynamical-systems",
    relation: "intersects",
    note: "Hamilton–Jacobi PDEs, Kolmogorov–Arnold–Moser (KAM) invariant tori, and Lyapunov exponents govern integrable vs chaotic trajectories in classical and celestial mechanics.",
  },
  {
    slugA: "thermodynamics-statistical-mechanics-and-entropy",
    slugB: "probability-theory-stochastic-calculus-and-statistics",
    relation: "bridges",
    note: "Boltzmann–Gibbs ensembles, partition functions, Einstein–Smoluchowski Brownian motion, and Fokker–Planck stochastic diffusion unite statistical physics with measure-theoretic probability.",
  },
  {
    slugA: "thermodynamics-statistical-mechanics-and-entropy",
    slugB: "information-theory-cybernetics-and-rhetoric",
    relation: "bridges",
    note: "Boltzmann entropy S = k_B ln Ω, Shannon information entropy H = -∑ p_i log p_i, Jaynes maximum-entropy inference, and Landauer's k_B T ln 2 erasure limit unify thermodynamics and information.",
  },
  {
    slugA: "electrodynamics-maxwell-equations-and-classical-fields",
    slugB: "differential-geometry-manifolds-and-topology",
    relation: "intersects",
    note: "Exterior differential 2-forms (dF = 0, d*F = μ0 J) and U(1) principal bundle curvature express Maxwell's electromagnetic equations in coordinate-free geometric form.",
  },
  {
    slugA: "electrodynamics-maxwell-equations-and-classical-fields",
    slugB: "standard-model-gauge-theories-and-particle-physics",
    relation: "bridges",
    note: "Classical U(1) electromagnetic gauge invariance is the direct Abelian prototype for Quantum Electrodynamics and non-Abelian SU(3)_C × SU(2)_L × U(1)_Y Yang–Mills gauge theories.",
  },
  {
    slugA: "quantum-mechanics-hilbert-space-and-entanglement",
    slugB: "functional-analysis-pdes-and-dynamical-systems",
    relation: "bridges",
    note: "Dirac–von Neumann quantum mechanics is built on infinite-dimensional separable Hilbert spaces, C*-algebras, and the spectral theorem for unbounded self-adjoint operators.",
  },
  {
    slugA: "quantum-mechanics-hilbert-space-and-entanglement",
    slugB: "probability-theory-stochastic-calculus-and-statistics",
    relation: "intersects",
    note: "The Born rule |ψ|^2, Feynman–Kac path integrals, and non-Kolmogorovian Bell–CHSH entanglement correlations connect quantum measurement to probability theory.",
  },
  {
    slugA: "standard-model-gauge-theories-and-particle-physics",
    slugB: "group-theory-lie-algebras-and-symmetry",
    relation: "bridges",
    note: "Wigner's Poincaré group classification of mass/spin, Gell-Mann's SU(3) Eightfold Way, and the SU(3)_C × SU(2)_L × U(1)_Y Lie algebra define all elementary particles and gauge interactions.",
  },
  {
    slugA: "standard-model-gauge-theories-and-particle-physics",
    slugB: "differential-geometry-manifolds-and-topology",
    relation: "intersects",
    note: "Principal fibre bundle connections, Yang–Mills curvature 2-forms, and Chern–Pontryagin topological instanton invariants govern non-perturbative gauge field theory.",
  },
  {
    slugA: "quantum-information-computing-and-error-correction",
    slugB: "logic-computation-information-artificial-intelligence",
    relation: "bridges",
    note: "BQP complexity, Shor's prime-factoring algorithm, Kitaev topological surface codes, and post-quantum lattice cryptography unite quantum mechanics and theoretical computer science.",
  },
  {
    slugA: "condensed-matter-atomic-molecular-optical-physics",
    slugB: "differential-geometry-manifolds-and-topology",
    relation: "intersects",
    note: "Berry phase connections, TKNN Chern invariants, and topological insulators apply algebraic topology directly to quantized Hall conductance in solid-state physics.",
  },
  {
    slugA: "relativity-gravitation-spacetime-physics",
    slugB: "differential-geometry-manifolds-and-topology",
    relation: "bridges",
    note: "Pseudo-Riemannian Lorentzian 4-manifolds, Levi-Civita metric connections, and the Riemann/Einstein curvature tensors form the exact mathematical core of General Relativity.",
  },
  {
    slugA: "string-theory-m-theory-and-holographic-duality",
    slugB: "differential-geometry-manifolds-and-topology",
    relation: "bridges",
    note: "Ricci-flat Kähler Calabi–Yau manifolds, homological mirror symmetry, and Ryu–Takayanagi holographic entanglement surfaces drive deep dualities between string theory and geometry.",
  },
  {
    slugA: "loop-quantum-gravity-spin-foams-and-causal-sets",
    slugB: "group-theory-lie-algebras-and-symmetry",
    relation: "intersects",
    note: "SU(2) spin networks, Ashtekar–Barbero connection variables, and SL(2,C) EPRL spin-foam intertwiners quantize discrete Planckian area and volume via Lie representation theory.",
  },
  // Frontier Gravity, MOND, Quantised Inertia & Dark Matter / GR Breakdown Epistemology
  {
    slugA: "mond-modified-newtonian-dynamics-and-galactic-rotation",
    slugB: "dark-matter-adhoc-epistemology-and-gr-breakdown-limits",
    relation: "bridges",
    note: "Milgrom's acceleration constant a0 ≈ 1.2×10^-10 m/s^2 predicts galactic rotation curves and the Baryonic Tully–Fisher relation with zero free per-galaxy halo parameters, exposing the ad-hoc parameter fitting of ΛCDM.",
  },
  {
    slugA: "quantised-inertia-horizon-mechanics-and-unruh-radiation",
    slugB: "dark-matter-adhoc-epistemology-and-gr-breakdown-limits",
    relation: "bridges",
    note: "McCulloch's Quantised Inertia (MiHsC) derives inertia from Rindler and Hubble horizon damping of Unruh radiation, predicting galactic rotation flattening and Gaia DR3 wide-binary boosts with zero free parameters.",
  },
  {
    slugA: "quantised-inertia-horizon-mechanics-and-unruh-radiation",
    slugB: "quantum-mechanics-hilbert-space-and-entanglement",
    relation: "intersects",
    note: "Horizon-scale Casimir confinement of quantum vacuum fluctuations and Unruh thermal radiation link relativistic quantum field effects directly to macroscopic inertial mass.",
  },
  {
    slugA: "dark-matter-adhoc-epistemology-and-gr-breakdown-limits",
    slugB: "epistemology-philosophy-of-science-scientific-method",
    relation: "bridges",
    note: "Comparing 2–3 adjustable dark-matter halo parameters per galaxy (plus 40 years of direct-detection nulls) against zero-parameter modified-gravity scaling laws exemplifies Lakatosian auxiliary hypotheses vs Popperian falsifiability.",
  },
  // Economics, Finance & Fin-Quant ↔ Mathematics, Statistics & Physics
  {
    slugA: "economics-and-political-economy",
    slugB: "formal-sciences-mathematics-and-computing",
    relation: "bridges",
    note: "Convex optimization, game theory, stochastic calculus, econometrics, and algorithmic mechanism design form the formal mathematical backbone of modern economics and quantitative finance.",
  },
  {
    slugA: "microeconomics-game-theory-and-market-design",
    slugB: "pure-applied-mathematics-geometry-and-topology",
    relation: "bridges",
    note: "Brouwer and Kakutani topological fixed-point theorems prove the existence of Nash strategic equilibria and Arrow–Debreu competitive general equilibria.",
  },
  {
    slugA: "microeconomics-game-theory-and-market-design",
    slugB: "logic-computation-information-artificial-intelligence",
    relation: "intersects",
    note: "Algorithmic game theory, Vickrey–Clarke–Groves auction complexity, and multi-agent reinforcement learning connect microeconomic incentives directly to computation.",
  },
  {
    slugA: "macroeconomics-political-economy-and-economic-history",
    slugB: "econometrics-financial-time-series-and-statistical-arbitrage",
    relation: "bridges",
    note: "Structural vector autoregressions (SVAR), cointegration, state-space Kalman filtering, and regime-switching models test macroeconomic monetary and credit-cycle theories.",
  },
  {
    slugA: "macroeconomics-political-economy-and-economic-history",
    slugB: "history-of-science-technology-and-libraries",
    relation: "intersects",
    note: "Endogenous technological growth (Romer, Mokyr), scientific institutions, and multi-century sovereign debt/inflation archives unite economic history with the history of science.",
  },
  {
    slugA: "financial-markets-asset-pricing-and-market-microstructure",
    slugB: "probability-theory-stochastic-calculus-and-statistics",
    relation: "bridges",
    note: "Stochastic discount factors, martingale pricing measures, Hawkes point processes for limit-order-book arrivals, and Bayesian Kyle/Glosten–Milgrom filtering govern asset pricing and microstructure.",
  },
  {
    slugA: "quantitative-finance-stochastic-calculus-and-derivatives",
    slugB: "probability-theory-stochastic-calculus-and-statistics",
    relation: "bridges",
    note: "Itô's Lemma, Girsanov's measure transformation, and the Harrison–Kreps–Pliska Fundamental Theorem of Asset Pricing apply continuous-time martingale theory directly to derivatives replication.",
  },
  {
    slugA: "quantitative-finance-stochastic-calculus-and-derivatives",
    slugB: "functional-analysis-pdes-and-dynamical-systems",
    relation: "bridges",
    note: "The Black–Scholes–Merton parabolic pricing PDE is mapped via the Feynman–Kac theorem directly onto the heat diffusion equation and parabolic operator semigroups.",
  },
  {
    slugA: "quantitative-finance-stochastic-calculus-and-derivatives",
    slugB: "quantum-mechanics-field-theory-particle-physics",
    relation: "intersects",
    note: "Euclidean path integrals, Feynman–Kac propagators, and Langevin/Fokker–Planck equations share identical mathematical structure across quantum mechanics and quantitative derivatives pricing.",
  },
  {
    slugA: "econometrics-financial-time-series-and-statistical-arbitrage",
    slugB: "probability-theory-stochastic-calculus-and-statistics",
    relation: "bridges",
    note: "Ornstein–Uhlenbeck SDEs, Engle–Granger/Johansen cointegration, ARCH/GARCH volatility clustering, and Marchenko–Pastur random matrix theory power statistical arbitrage and portfolio inference.",
  },
  {
    slugA: "econometrics-financial-time-series-and-statistical-arbitrage",
    slugB: "logic-computation-information-artificial-intelligence",
    relation: "intersects",
    note: "Combinatorial purged cross-validation (CPCV), Deflated Sharpe Ratio multiple-testing corrections, and Shannon–Kelly bet sizing govern statistical machine learning in financial markets.",
  },
  {
    slugA: "econophysics-complex-systems-and-tail-risk",
    slugB: "thermodynamics-statistical-mechanics-and-entropy",
    relation: "bridges",
    note: "Ising spin-glass herding models, renormalization group critical exponents, and non-equilibrium phase transitions map statistical physics directly onto financial market crashes.",
  },
  {
    slugA: "econophysics-complex-systems-and-tail-risk",
    slugB: "probability-theory-stochastic-calculus-and-statistics",
    relation: "bridges",
    note: "Mandelbrot's Lévy stable Paretian laws, universal inverse-cubic power-law tails (α ≈ 3), and Pickands–Balkema–de Haan Extreme Value Theory replace Gaussian tail assumptions in risk management.",
  },
  // Chemistry, Biology, Medicine, Humanities & Governance Crossovers
  {
    slugA: "physical-chemistry-quantum-chemistry-chemical-physics",
    slugB: "quantum-mechanics-field-theory-particle-physics",
    relation: "bridges",
    note: "Quantum mechanics of atomic orbitals, Dirac–Schrödinger electronic structure, and molecular spectroscopy unite Physics and Chemistry.",
  },
  {
    slugA: "physical-chemistry-quantum-chemistry-chemical-physics",
    slugB: "classical-mechanics-thermodynamics-electromagnetism",
    relation: "intersects",
    note: "Statistical mechanics, chemical thermodynamics, and electrodynamics govern both physical states of matter and chemical equilibrium.",
  },
  {
    slugA: "inorganic-coordination-and-solid-state-chemistry",
    slugB: "condensed-matter-atomic-molecular-optical-physics",
    relation: "intersects",
    note: "Crystallography, electronic band theory, superconductors, and quantum materials sit at the intersection of solid-state chemistry and condensed matter physics.",
  },
  {
    slugA: "organic-supramolecular-and-synthetic-chemistry",
    slugB: "biochemistry-chemical-biology-and-abiogenesis",
    relation: "bridges",
    note: "Asymmetric catalysis, non-covalent supramolecular self-assembly, and prebiotic carbon synthesis bridge synthetic organic chemistry and the molecular origins of life.",
  },
  {
    slugA: "biochemistry-chemical-biology-and-abiogenesis",
    slugB: "molecular-cellular-and-evolutionary-biology",
    relation: "bridges",
    note: "Enzymatic catalysis, nucleic acid chemistry, bioenergetics, and prebiotic abiogenesis connect molecular chemistry directly to living cells.",
  },
  {
    slugA: "biological-taxonomy-systematics-tree-of-life",
    slugB: "logic-computation-information-artificial-intelligence",
    relation: "intersects",
    note: "Maximum-likelihood and Bayesian Markov Chain Monte Carlo (MCMC) phylogenomics apply computational graph and statistical inference algorithms to reconstruct the Tree of Life.",
  },
  {
    slugA: "botany-mycology-microbiology-and-ecology",
    slugB: "thermodynamics-statistical-mechanics-and-entropy",
    relation: "intersects",
    note: "Photosynthetic quantum-thermodynamic energy transduction, trophic cascades, and Prigogine dissipative structures govern biosphere ecology.",
  },
  {
    slugA: "roger-penrose-twistor-theory-singularities-cosmology",
    slugB: "pure-applied-mathematics-geometry-and-topology",
    relation: "bridges",
    note: "Differential geometry, complex projective twistor spaces, spin networks, and non-periodic Penrose tilings link pure geometry to spacetime physics.",
  },
  {
    slugA: "roger-penrose-twistor-theory-singularities-cosmology",
    slugB: "neuroscience-cognitive-science-and-consciousness",
    relation: "intersects",
    note: "Orchestrated Objective Reduction (Orch-OR) and non-computable cognition connect Penrose's gravitational quantum mechanics to neuroscience and consciousness.",
  },
  {
    slugA: "roger-penrose-twistor-theory-singularities-cosmology",
    slugB: "logic-computation-information-artificial-intelligence",
    relation: "intersects",
    note: "Gödelian incompleteness arguments in The Emperor's New Mind and Shadows of the Mind engage the limits of algorithmic computation.",
  },
  {
    slugA: "quantum-gravity-string-theory-loop-quantum-gravity",
    slugB: "quantum-mechanics-field-theory-particle-physics",
    relation: "bridges",
    note: "Unification of general relativity and quantum field theory via string/M-theory, AdS/CFT duality, and background-independent loop quantization.",
  },
  {
    slugA: "modified-emergent-and-frontier-gravity-theories",
    slugB: "quantum-mechanics-field-theory-particle-physics",
    relation: "intersects",
    note: "Unruh radiation, Rindler horizons, and quantum vacuum fluctuations in Quantised Inertia and emergent entropic gravity link quantum fields to galactic dynamics.",
  },
  {
    slugA: "ethology-animal-cognition-and-biosemiotics",
    slugB: "semiotics-sign-systems-and-philosophy-of-language",
    relation: "bridges",
    note: "Biosemiotics and zoosemiotics (von Uexküll's Umwelt, Sebeok, Hoffmeyer) examine sign production and interpretation across the animal kingdom.",
  },
  {
    slugA: "linguistics-philology-and-language-evolution",
    slugB: "ancient-civilisations-epigraphy-near-eastern-archaeology",
    relation: "intersects",
    note: "Comparative philology and epigraphy decipher Sumerian cuneiform, Egyptian hieroglyphs, Linear B, and the earliest written records of humanity.",
  },
  {
    slugA: "media-ecology-marshall-mcluhan-communication-theory",
    slugB: "history-of-science-technology-and-libraries",
    relation: "intersects",
    note: "Media ecology traces how transitions from oral culture and manuscript scriptoria to print and electronic networks restructure human knowledge.",
  },
  {
    slugA: "information-theory-cybernetics-and-rhetoric",
    slugB: "logic-computation-information-artificial-intelligence",
    relation: "bridges",
    note: "Shannon entropy, error-correcting codes, and Wiener's cybernetic feedback unite communication theory with computer science and AI.",
  },
  {
    slugA: "world-literature-poetics-and-comparative-mythology",
    slugB: "ancient-civilisations-epigraphy-near-eastern-archaeology",
    relation: "intersects",
    note: "Philological reconstruction of Gilgamesh, Homeric epics, and Ptolemaic Alexandrian scholia connects comparative literature directly to material archaeology.",
  },
  {
    slugA: "visual-arts-painting-sculpture-and-iconography",
    slugB: "differential-geometry-manifolds-and-topology",
    relation: "intersects",
    note: "Renaissance linear perspective (Brunelleschi, Alberti, Piero della Francesca) directly catalysed projective geometry and optical mathematics.",
  },
  {
    slugA: "musicology-harmony-acoustics-and-performing-arts",
    slugB: "classical-mechanics-thermodynamics-electromagnetism",
    relation: "intersects",
    note: "Wave equations, harmonic overtone series, resonance, and psychoacoustics link musical harmony directly to physical acoustics.",
  },
  {
    slugA: "aesthetics-art-history-and-philosophy-of-beauty",
    slugB: "group-theory-lie-algebras-and-symmetry",
    relation: "intersects",
    note: "Crystallographic wallpaper groups, golden-ratio quasicrystalline proportions, and symmetry transformations link formal aesthetics to mathematical group theory.",
  },
  {
    slugA: "neuroscience-cognitive-science-and-consciousness",
    slugB: "metaphysics-philosophy-of-mind-and-consciousness",
    relation: "bridges",
    note: "Neural correlates of consciousness, perceptual binding, and the hard problem of qualia bridge empirical neuroscience and philosophy of mind.",
  },
  {
    slugA: "geroscience-cellular-senescence-longevity-biology",
    slugB: "translational-geroprotective-reproductive-biology",
    relation: "bridges",
    note: "mTOR modulation, mitochondrial bioenergetics, and cellular rejuvenation connect systemic longevity biology to reproductive aging.",
  },
  {
    slugA: "moral-philosophy-bioethics-and-political-philosophy",
    slugB: "constitutional-international-and-bioethical-law",
    relation: "bridges",
    note: "Normative bioethics and philosophy of law shape constitutional rights and international regulation of medicine and biotechnology.",
  },
  {
    slugA: "political-theory-comparative-institutions-geopolitics",
    slugB: "microeconomics-game-theory-and-market-design",
    relation: "bridges",
    note: "Social choice theory (Arrow's impossibility theorem), public choice, voting mechanism design, and strategic deterrence unite political science and game theory.",
  },
  {
    slugA: "architectural-history-structural-engineering-urban-systems",
    slugB: "classical-mechanics-thermodynamics-electromagnetism",
    relation: "bridges",
    note: "Continuum mechanics, Cauchy stress–strain elasticity, catenary arch statics, and building thermodynamics ground architectural engineering in classical physics.",
  },
  {
    slugA: "oocyte-nuclear-maturity-and-morphological-grading",
    slugB: "zygote-pronuclear-scoring-2pn-1pn-3pn-fertilisation",
    relation: "bridges",
    note: "Metaphase II nuclear maturity, first polar body extrusion, and cytoplasmic ATP reserves directly govern normal 2PN2PB pronuclear formation vs 1PN/3PN fertilisation anomalies at 16–18 hours post-insemination.",
  },
  {
    slugA: "zygote-pronuclear-scoring-2pn-1pn-3pn-fertilisation",
    slugB: "blastocyst-morphological-grading-gardner-criteria-morphokinetics",
    relation: "bridges",
    note: "Day-1 pronuclear ploidy (2PN vs biparental diploid 1PN/0PN rescue) and early syngamy timings (tPNf, t2) predict Day 5–6 blastocyst expansion and Gardner ICM/trophectoderm grades (AA/AB/BA/BB).",
  },
  {
    slugA: "oocyte-nuclear-maturity-and-morphological-grading",
    slugB: "blastocyst-morphological-grading-gardner-criteria-morphokinetics",
    relation: "intersects",
    note: "Oocyte nuclear competence (MII vs IVM-rescued MI/GV) and meiotic spindle integrity determine embryonic genome activation at the 8-cell stage and subsequent Gardner blastocyst expansion.",
  },
  {
    slugA: "inter-transfer-interval-immediate-vs-delayed-frozen-embryo-transfer",
    slugB: "endometrial-receptivity-implantation-biology",
    relation: "bridges",
    note: "Connects Frozen Embryo Transfer timing (immediate next-menses transfer vs. 1–3 month interval for a vitrified blastocyst at −196°C) with modifiable endometrial receptivity factors (CD138 chronic endometritis, natural-cycle corpus luteum, and luteal progesterone rescue).",
  },
  {
    slugA: "lifestyle-metabolic-and-environmental-fertility-optimization",
    slugB: "mtor-pathway-modulation-follicular-longevity",
    relation: "bridges",
    note: "Connects endogenous circadian melatonin, ubiquinol (CoQ10), NAD+/NAMPT salvage, and dietary spermidine mitophagy with follicular longevity and Metaphase II meiotic spindle bioenergetics.",
  },
  {
    slugA: "lifestyle-metabolic-and-environmental-fertility-optimization",
    slugB: "sperm-chromatin-integrity-dna-fragmentation-diagnostics",
    relation: "bridges",
    note: "Connects 24–36 hour short ejaculatory abstinence, scrotal thermoregulation (<34.5°C), circadian sleep (7–8h), and L-carnitine/NAC/lycopene supplementation directly to Sperm DNA Fragmentation Index (DFI) reduction.",
  },
  {
    slugA: "hyaluronan-embryo-transfer-media-embryoglue-implantation-adherence",
    slugB: "inter-transfer-interval-immediate-vs-delayed-frozen-embryo-transfer",
    relation: "intersects",
    note: "Links 0.5 mg/mL hyaluronan adherence media (EmbryoGlue) in fresh vs. vitrified-warmed FET cycles with post-failure endometrial reset and single-blastocyst transfer protocols.",
  },
  {
    slugA: "hyaluronan-embryo-transfer-media-embryoglue-implantation-adherence",
    slugB: "assisted-reproductive-technology-gamete-donation",
    relation: "bridges",
    note: "Connects embryology laboratory transfer media rheology (0.5 mg/mL vs. 0.125 mg/mL hyaluronan) and elective single embryo transfer (eSET) policy directly to luminal endometrial apposition.",
  },
  {
    slugA: "monopronuclear-1pn-and-low-grade-blastocyst-transfer-optimization",
    slugB: "fet-endometrial-preparation-luteal-progesterone-and-implantation-biologics",
    relation: "bridges",
    note: "Connects monopronuclear (1PN) and low-grade (BC/CB/CC) blastocyst ploidy triage and embryology lab adjuncts directly to ovulatory FET protocols, transfer-day progesterone rescue, and intrauterine hCG-PBMC/PRP biologics.",
  },
  {
    slugA: "monopronuclear-1pn-and-low-grade-blastocyst-transfer-optimization",
    slugB: "hyaluronan-embryo-transfer-media-embryoglue-implantation-adherence",
    relation: "intersects",
    note: "Links 0.5 mg/mL hyaluronan transfer medium (NNT=8 in poor-quality embryos, Urman et al. 2008) and partial laser zona thinning with low-grade and 1PN blastocyst implantation.",
  },
  {
    slugA: "gamete-rejuvenation-mitochondrial-bioenergetics-and-natural-conception-after-40",
    slugB: "mtor-pathway-modulation-follicular-longevity",
    relation: "bridges",
    note: "Connects ovarian CD38 NADase inhibition (Apigenin/Quercetin) + NMN/NR SIRT2–BubR1 spindle stabilization, Spermidine eIF5A hypusination mitophagy, and stromal fibrosis reversal to follicular longevity.",
  },
  {
    slugA: "gamete-rejuvenation-mitochondrial-bioenergetics-and-natural-conception-after-40",
    slugB: "sperm-chromatin-integrity-dna-fragmentation-diagnostics",
    relation: "bridges",
    note: "Connects 1–3 hour consecutive double ejaculation (Scarselli 2019: euploidy 27.5% to 43.6%), Astaxanthin, L-Carnitine, Myo-Inositol midpiece MMP hyperpolarization, and Leydig StAR restoration directly to paternal chromatin integrity.",
  },
  {
    slugA: "gamete-rejuvenation-mitochondrial-bioenergetics-and-natural-conception-after-40",
    slugB: "advanced-maternal-age-pregnancy-after-40",
    relation: "intersects",
    note: "Links the JAMA AMH-fecundability dissociation (Steiner 2017: 84% vs 75% natural conception at 12 cycles), H2Oil Lipiodol tubal flushing (39.7% ongoing pregnancy), and 3-DPO corpus luteum rescue to reproductive outcomes after age 40.",
  },
  {
    slugA: "harvard-fertility-diet-and-earth-preconception-nutrition",
    slugB: "endometrial-receptivity-implantation-biology",
    relation: "bridges",
    note: "Connects the MGH EARTH Pro-Fertility Diet (Gaskins 2019: 56% vs 33% ART live birth), whole-grain bran endometrial thickening (+0.4 mm/serving, Gaskins 2016), and soy isoflavone neutralization of Bisphenol A (Chavarro 2016) directly to uterine implantation biology.",
  },
  {
    slugA: "harvard-fertility-diet-and-earth-preconception-nutrition",
    slugB: "sperm-chromatin-integrity-dna-fragmentation-diagnostics",
    relation: "bridges",
    note: "Connects the EARTH male pesticide residue study (-49% total sperm count in high-pesticide produce consumers, Chiu 2015), the Danish Young Men Prudent diet (+42M sperm count, Nassan 2020), and the FERTINUTS RCT (Salas-Huetos 2018: -4.0% DFI) to paternal gamete quality.",
  },
  {
    slugA: "blue-zones-high-fertility-populations-and-reproductive-longevity-genetics",
    slugB: "geroscience-cellular-senescence-longevity-biology",
    relation: "bridges",
    note: "Connects the evolutionary coupling of natural motherhood ≥40 with centenarian survival (OR 4.0, Perls Nature 1997; brothers' mortality RR 0.786, Smith 2009), Ikarian CD38 NADase inhibition, Okinawan spermidine mitophagy, and the 290 ovarian aging DNA-repair loci (Ruth Nature 2021) to systemic longevity biology.",
  },
  {
    slugA: "blue-zones-high-fertility-populations-and-reproductive-longevity-genetics",
    slugB: "advanced-maternal-age-pregnancy-after-40",
    relation: "intersects",
    note: "Links the Sardinian Blue Zone late-maternal reproduction phenotype (15–22% natural births ≥40 with -25% lower stillbirth/preterm loss, Astolfi 2008; Salaris 2016), Hutterite HLA-G implantation tolerance, and Tsimane vascular preservation to pregnancy after 40.",
  },
  {
    slugA: "epigenetic-clocks-dna-methylation-and-biological-age-biomarkers",
    slugB: "partial-cellular-reprogramming-yamanaka-factors-and-epigenetic-reset",
    relation: "bridges",
    note: "DNA methylation clocks (Horvath, GrimAge2, DunedinPACE) provide the primary quantitative readout for TET1/2-dependent biological age reversal by OSK/OSKM Yamanaka factors.",
  },
  {
    slugA: "epigenetic-clocks-dna-methylation-and-biological-age-biomarkers",
    slugB: "information-theory-cybernetics-and-rhetoric",
    relation: "bridges",
    note: "Shannon's Mathematical Theory of Communication (observer-backup-decoder correction of analog channel noise) directly inspired Sinclair's Information Theory of Epigenetic Aging (Lu et al., Nature 2020; Yang et al., Cell 2023).",
  },
  {
    slugA: "organ-specific-proteomic-clocks-and-multi-omic-aging-signatures",
    slugB: "brain-aging-glymphatic-clearance-klotho-and-neuro-rejuvenation",
    relation: "bridges",
    note: "Stanford SomaScan organ-specific plasma proteomic clocks (Oh & Wyss-Coray, Nature 2023) quantify brain biological aging and Alzheimer's progression 15 years before clinical symptoms.",
  },
  {
    slugA: "cellular-senescence-sasp-senolytics-and-senomorphics",
    slugB: "nad-metabolism-sirtuins-cd38-inhibition-and-mitochondrial-rejuvenation",
    relation: "bridges",
    note: "SASP cytokines secreted by p16INK4a+ senescent cells induce a 3–5-fold expansion of CD38+ pro-inflammatory macrophages that destroy tissue NAD+ (Chini 2016; Verdin 2020).",
  },
  {
    slugA: "immunotherapy-car-t-and-vaccines-for-senescent-cell-clearance",
    slugB: "thymic-regeneration-immunosenescence-and-inflammaging-reversal",
    relation: "bridges",
    note: "Endogenous clearance of uPAR+/GPNMB+ senescent cells requires rejuvenating thymic T-cell output (TRIIM) and depleting myeloid-biased aged hematopoietic stem cells (Ross & Weissman, Nature 2024).",
  },
  {
    slugA: "nutrient-sensing-mtor-ampk-igf1-and-geroprotective-pharmacology",
    slugB: "mtor-pathway-modulation-follicular-longevity",
    relation: "bridges",
    note: "Transient mTORC1 inhibition (Rapamycin) preserves both systemic multi-organ healthspan (+23%–28% lifespan in NIA ITP mice) and the primordial ovarian follicle pool (Dou et al., 2017; VIBRANT trial).",
  },
  {
    slugA: "caloric-restriction-fasting-mimetics-and-human-calerie-trials",
    slugB: "thymic-regeneration-immunosenescence-and-inflammaging-reversal",
    relation: "bridges",
    note: "In the 2-year NIH CALERIE human RCT, 14% caloric restriction downregulated adipose macrophage PLA2G7 and regenerated functional MRI thymic volume and naive T-cell output (Spadaro & Dixit, Science 2022).",
  },
  {
    slugA: "mitophagy-activators-urolithin-a-spermidine-glynac-and-ss31",
    slugB: "gamete-rejuvenation-mitochondrial-bioenergetics-and-natural-conception-after-40",
    relation: "bridges",
    note: "Spermidine eIF5A-TFEB mitophagy (Zhang, Nature Aging 2023) and Urolithin A PINK1/Parkin quality control restore mitochondrial membrane potential in both aged skeletal muscle and Metaphase II oocytes.",
  },
  {
    slugA: "telomere-dynamics-telomerase-tert-and-replicative-immortality",
    slugB: "nad-metabolism-sirtuins-cd38-inhibition-and-mitochondrial-rejuvenation",
    relation: "bridges",
    note: "Critically short telomeres activate p53 to repress PGC-1α/β mitochondrial biogenesis (Sahin & DePinho, Nature 2011), while nuclear SIRT1/SIRT6 deacylases stabilize telomeric heterochromatin.",
  },
  {
    slugA: "heterochronic-parabiosis-therapeutic-plasma-exchange-and-systemic-factors",
    slugB: "brain-aging-glymphatic-clearance-klotho-and-neuro-rejuvenation",
    relation: "bridges",
    note: "Platelet Factor 4 (PF4 / CXCL4) and TIMP2 in young plasma and α-Klotho signaling cross/signal to the aged hippocampus to suppress microglial TNF-α and restore synaptic plasticity (Villeda & Dubal, Nature / Nature Aging 2023) while Therapeutic Plasma Exchange slows Alzheimer's decline by 52%–71% (AMBAR RCT).",
  },
  {
    slugA: "comparative-longevity-genomics-naked-mole-rats-bowhead-whales-and-centenarians",
    slugB: "blue-zones-high-fertility-populations-and-reproductive-longevity-genetics",
    relation: "bridges",
    note: "Human centenarian alleles (FOXO3A, APOE ε2, IGF1R, LAV-BPIFB4) and vertebrate DNA-repair adaptations (SIRT6, ERCC1, BRCA1/2) couple extreme systemic longevity with extended reproductive lifespan.",
  },
  {
    slugA: "physiological-hormesis-vo2max-sauna-cold-shock-and-circadian-longevity",
    slugB: "brain-aging-glymphatic-clearance-klotho-and-neuro-rejuvenation",
    relation: "bridges",
    note: "High-intensity exercise and Finnish sauna bathing elevate circulating α-Klotho, BDNF, Irisin, HSP70, and cold-shock RBM3, reducing 20-year Alzheimer's and dementia risk by 65% (Laukkanen 2017).",
  },
  {
    slugA: "geroscience-cellular-senescence-longevity-biology",
    slugB: "thermodynamics-statistical-mechanics-and-entropy",
    relation: "intersects",
    note: "Biological aging reflects open-system non-equilibrium thermodynamic entropy accumulation across genomic, epigenetic, and extracellular matrix networks, countered by ATP-driven maintenance and repair.",
  },
  {
    slugA: "developmental-bioelectricity-morphogenetic-fields-and-levin-anatomical-homeostasis",
    slugB: "information-theory-cybernetics-and-rhetoric",
    relation: "bridges",
    note: "Michael Levin's Technological Approach to Mind Everywhere (TAME) models gap-junction-coupled somatic resting potential (Vmem) networks as Wienerian cybernetic homeostats that store a non-genetic anatomical target morphology and minimize morphogenetic error.",
  },
  {
    slugA: "developmental-bioelectricity-morphogenetic-fields-and-levin-anatomical-homeostasis",
    slugB: "electrodynamics-maxwell-equations-and-classical-fields",
    relation: "bridges",
    note: "Nernst–Planck electrodiffusion and Goldman–Hodgkin–Katz resting membrane voltage (Vmem) gradients across gap-junction-coupled tissues act as macroscopic physical bioelectric fields guiding embryogenesis and limb regeneration (Murugan & Levin, Science Advances 2022).",
  },
  {
    slugA: "xenobots-anthrobots-cancer-bioelectric-normalization-and-synthetic-living-machines",
    slugB: "logic-computation-information-artificial-intelligence",
    relation: "bridges",
    note: "Evolutionary multi-objective AI algorithms (Kriegman, Bongard & Levin, PNAS 2020/2021) design living Xenopus cellular configurations (Xenobots) capable of kinematic self-replication, while adult human epithelial cells self-assemble into neural-healing Anthrobots (Gumuskaya & Levin, Advanced Science 2023).",
  },
  {
    slugA: "epimorphic-limb-regeneration-axolotl-blastema-and-scarless-acomys-healing",
    slugB: "cellular-senescence-sasp-senolytics-and-senomorphics",
    relation: "bridges",
    note: "Salamander blastemas transiently induce senescent cells to secrete regenerative Wnt/FGF morphogens and then clear 100% of them via macrophage surveillance so senescent cells never accumulate with age (Yun & Brockes, eLife 2015; Godwin, PNAS 2013).",
  },
  {
    slugA: "mammalian-skeletal-ending-cartilage-regeneration-and-focal-adhesion-mechanotherapy",
    slugB: "hippo-yap-taz-pathway-cardiomyocyte-proliferation-and-organ-regeneration",
    relation: "bridges",
    note: "YAP/TAZ mechanotransduction exhibits tissue-specific duality: nuclear YAP activation unlocks adult cardiomyocyte and liver regeneration (Martin, Nature 2017), whereas Verteporfin YAP inhibition in dermal fibroblasts prevents Engrailed-1 fibrotic scarring and regenerates hair follicles (Longaker, Science 2021).",
  },
  {
    slugA: "partial-cellular-reprogramming-yamanaka-factors-and-epigenetic-reset",
    slugB: "sensory-organ-regeneration-cochlear-hair-cells-and-retinal-muller-glia",
    relation: "bridges",
    note: "AAV-OSK partial reprogramming regenerates crushed retinal ganglion axons (Lu & Sinclair, Nature 2020), complementing ASCL1 + HDACi reprogramming of endogenous adult retinal Müller glia into light-responsive neurons (Jorstad & Reh, Nature 2017) and CHIR99021 + VPA cochlear hair cell regeneration (McLean & Edge, Cell Reports 2017).",
  },
  {
    slugA: "vascular-endothelial-aging-vegf-microcirculation-and-nitric-oxide-rejuvenation",
    slugB: "nad-metabolism-sirtuins-cd38-inhibition-and-mitochondrial-rejuvenation",
    relation: "bridges",
    note: "NMN + hydrogen sulfide (NaHS) activates endothelial SIRT1 to reverse microvascular capillary rarefaction and increase aged mouse endurance by 56%–80% (Das & Sinclair, Cell 2018), synergizing with systemic VEGF-A lifespan extension (+48% male lifespan; Grunewald & Keshet, Science 2021).",
  },
  {
    slugA: "klotho-fgf23-mineral-metabolism-and-renal-cardiovascular-longevity",
    slugB: "brain-aging-glymphatic-clearance-klotho-and-neuro-rejuvenation",
    relation: "bridges",
    note: "Soluble α-Klotho acts both systemically as an anti-fibrotic TGF-βR2/Wnt/IGF-1R decoy and FGF23 phosphaturic coreceptor (+20%–30.8% lifespan; Kurosu & Kuro-o, Science 2005) and centrally via PF4 to enhance aged primate working memory (Castner & Dubal, Nature Aging 2023).",
  },
  {
    slugA: "line1-retrotransposons-cgas-sting-and-nlrp3-sterile-inflammaging",
    slugB: "cellular-senescence-sasp-senolytics-and-senomorphics",
    relation: "bridges",
    note: "De-repression of nuclear LINE-1 retrotransposons in late senescence synthesizes cytoplasmic cDNA that triggers cGAS–STING Type-I Interferon inflammaging, reversible by nucleoside reverse-transcriptase inhibitor Lamivudine/3TC (De Cecco & Sedivy, Nature 2019) or STING inhibitor H-151 (Gulen & Ablasser, Nature 2023).",
  },
  {
    slugA: "endogenous-geroprotective-metabolites-taurine-akg-ergothioneine-and-h2s",
    slugB: "epigenetic-clocks-dna-methylation-and-biological-age-biomarkers",
    relation: "bridges",
    note: "Calcium α-ketoglutarate (Ca-AKG) serves as the obligate cosubstrate for TET1–3 DNA demethylases and JMJD3 histone demethylases, compressing mouse late-life morbidity by 41%–46% (Asadi Shahmirzadi & Kennedy, Cell Metabolism 2020), while taurine repletion extends mammalian lifespan by 10%–12% (Singh & Yadav, Science 2023).",
  },
  {
    slugA: "gut-microbiome-longevity-centenarian-isoallolca-akkermansia-and-young-fmt",
    slugB: "blue-zones-high-fertility-populations-and-reproductive-longevity-genetics",
    relation: "bridges",
    note: "Japanese centenarian gut microbiomes harbor Odoribacteraceae that synthesize bactericidal/Treg-inducing isoalloLCA bile acids (Sato & Honda, Nature 2021) alongside high-uniqueness microbial indole production (Wilmanski & Price, Nature Metabolism 2021).",
  },
  {
    slugA: "membrane-pacemaker-peroxidation-index-elovl2-plasmalogens-and-ferroptosis",
    slugB: "comparative-longevity-genomics-naked-mole-rats-bowhead-whales-and-centenarians",
    relation: "bridges",
    note: "Across naked mole-rats, echidnas, bowhead whales, and humans, maximum species lifespan scales inversely (R² > 0.85) with the mitochondrial phospholipid Peroxidation Index (Hulbert 2007) and systemic iron/ferroptosis burden (Timmers & Deelen, Nature Communications 2020).",
  },
  {
    slugA: "nuclear-lamina-architecture-lamin-a-sirt7-and-heterochromatin-maintenance",
    slugB: "epigenetic-clocks-dna-methylation-and-biological-age-biomarkers",
    relation: "bridges",
    note: "Cryptic LMNA splicing into Progerin and Lamin B1 depletion detach peripheral heterochromatin (LADs) during normal human aging (Scaffidi & Misteli, Science 2006), while in vivo Adenine Base Editing of LMNA extends progeroid mouse lifespan by 140% (Koblan, Collins & Liu, Nature 2021).",
  },
  {
    slugA: "whole-organ-bioengineering-decellularized-scaffolds-3d-bioprinting-and-xenotransplantation",
    slugB: "organ-cryopreservation-nanowarming-vitrification-and-metabolic-torpor-biostasis",
    relation: "bridges",
    note: "Ending the human organ shortage combines 69-edit CRISPR porcine xenotransplantation (758-day primate survival; Anand & Church, Nature 2023) and SWIFT 3D bioprinting (Skylar-Scott & Lewis, 2019) with 100-day ice-free organ vitrification and radiofrequency nanowarming (Han, Finger & Bischof, Nature Communications 2023).",
  },
  {
    slugA: "organ-cryopreservation-nanowarming-vitrification-and-metabolic-torpor-biostasis",
    slugB: "ovarian-reserve-oocyte-cryopreservation",
    relation: "bridges",
    note: "Scales the physical principles of ultra-rapid ice-free vitrification from Metaphase II oocytes and blastocysts (Kuwayama 2005) to whole vascularized kidneys via silica-coated iron-oxide nanoparticle RF nanowarming (Han & Bischof, Nature Communications 2023).",
  },
  {
    slugA: "transcriptional-elongation-speed-rna-pol-ii-splicing-fidelity-and-ribosomal-aging",
    slugB: "telomere-dynamics-telomerase-tert-and-replicative-immortality",
    relation: "bridges",
    note: "Restoring youthful RNA Pol II elongation speed (Debès, Partridge & Beyer, Nature 2023) and SRSF/HNRNP spliceosome fidelity with resveralogues rescues full-length catalytic hTERT splicing and elongates aged human fibroblast telomeres (Latorre & Harries, 2017).",
  },
];

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

/**
 * Enforces the non-destructive seeding policy for Dev/CI reset seeders:
 * 1. Database host MUST be strictly `localhost` or `127.0.0.1` (or `::1`).
 * 2. Environment MUST explicitly include `ALLOW_DESTRUCTIVE_SEED=true`.
 */
export function assertLocalResetAllowed(
  connectionUrl: string | undefined,
  env: NodeJS.ProcessEnv = process.env,
): void {
  if (!connectionUrl) {
    throw new Error("Refusing destructive seed reset: database connection URL is not set.");
  }
  let parsed: URL;
  try {
    parsed = new URL(connectionUrl);
  } catch {
    throw new Error("Refusing destructive seed reset: invalid database connection URL.");
  }
  const host = parsed.hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (!LOCAL_HOSTS.has(host)) {
    throw new Error(
      `Refusing destructive seed reset on non-local host "${parsed.hostname}". Only localhost / 127.0.0.1 is permitted.`,
    );
  }
  if (env.ALLOW_DESTRUCTIVE_SEED !== "true") {
    throw new Error(
      "Refusing destructive seed reset: explicit ALLOW_DESTRUCTIVE_SEED=true is required.",
    );
  }
}

async function ensureNode(sql: Sql, node: SeedNode, parentId: string | null, depth = 0): Promise<void> {
  const childNames = (node.children ?? []).map((c) => c.title);
  const subSentence =
    childNames.length > 0 ? ` Core branches include ${childNames.join("; ")}.` : "";
  const defaultSummary = `${node.title} investigates ${node.brief.charAt(0).toLowerCase()}${node.brief.slice(1)}${subSentence}`;
  const existing = await ensureSeedTopic(sql, {
    slug: node.slug,
    title: node.title,
    brief: node.brief,
    parentId,
    depth,
    summary: defaultSummary,
    dossier: ALL_SEED_DOSSIERS[node.slug],
  });
  for (const child of node.children ?? []) {
    await ensureNode(sql, child, existing.id, existing.depth + 1);
  }
}

function collectSeedSlugs(nodes: SeedNode[], out: string[] = []): string[] {
  for (const n of nodes) {
    out.push(n.slug);
    if (n.children) collectSeedSlugs(n.children, out);
  }
  return out;
}

export async function seed(sql: Sql): Promise<void> {
  const allSlugs = collectSeedSlugs(ENCYCLOPAEDIC_TRUNKS);
  const dossierEntries = Object.entries(ALL_SEED_DOSSIERS);
  const complete = await isSeedComplete(sql, {
    slugs: allSlugs,
    minLinks: CROSS_DISCIPLINE_LINKS.length,
    dossierSlugs: dossierEntries.map(([slug]) => slug),
    dossierMinClaims: dossierEntries.reduce((sum, [, d]) => sum + d.claims.length, 0),
    dossierMinSources: dossierEntries.reduce((sum, [, d]) => sum + d.sources.length, 0),
  });
  if (complete) return;

  for (const trunk of ENCYCLOPAEDIC_TRUNKS) {
    await ensureNode(sql, trunk, null, 0);
  }
  for (const link of CROSS_DISCIPLINE_LINKS) {
    const a = await getTopicBySlug(sql, link.slugA);
    const b = await getTopicBySlug(sql, link.slugB);
    if (a && b) {
      await linkTopics(sql, a.id, b.id, link.relation, link.note);
    }
  }
  for (const [slug, dossier] of dossierEntries) {
    const topic = await getTopicBySlug(sql, slug);
    if (topic) {
      await seedTopicDossier(sql, topic.id, dossier, { populateTopicFields: false });
    }
  }

  // Additively enrich the existing user inquiry on consecutive vs. spaced IVF/FET cycles after 40
  const legacyIntervalTopic = await getTopicBySlug(
    sql,
    "advanced-maternal-age-pregnancy-after-40-frontier-studies-on-40-fertility-and-ne-41",
  );
  const fetIntervalDossier =
    ALL_SEED_DOSSIERS["inter-transfer-interval-immediate-vs-delayed-frozen-embryo-transfer"];
  if (legacyIntervalTopic && fetIntervalDossier) {
    await seedTopicDossier(sql, legacyIntervalTopic.id, fetIntervalDossier, {
      populateTopicFields: false,
    });
    const canonicalFetNode = await getTopicBySlug(
      sql,
      "inter-transfer-interval-immediate-vs-delayed-frozen-embryo-transfer",
    );
    if (canonicalFetNode) {
      await linkTopics(
        sql,
        legacyIntervalTopic.id,
        canonicalFetNode.id,
        "bridges",
        "Connects immediate next-menstrual-cycle Frozen Embryo Transfer versus a 1–3 month interval for a vitrified blastocyst at −196°C.",
      );
    }
  }

  // Additively enrich any existing user inquiry on organic/lifestyle conception optimization
  const lifestyleDossier =
    ALL_SEED_DOSSIERS["lifestyle-metabolic-and-environmental-fertility-optimization"];
  if (lifestyleDossier) {
    for (const legacySlug of [
      "improve-fertility-organically-conceiving-by-improving-lifestyle",
      "human-fertility-improve-fertility-organically-conceiving-by-improving-lifestyle",
      "reproductive-medicine-human-fertility-improve-fertility-organically-conceiving-b",
      "lifestyle-metabolic-health-natural-conception-optimization",
      "reproductive-medicine-human-fertility-lifestyle-metabolic-health-natural-concept",
    ]) {
      const legacyTopic = await getTopicBySlug(sql, legacySlug);
      if (legacyTopic) {
        await seedTopicDossier(sql, legacyTopic.id, lifestyleDossier, {
          populateTopicFields: false,
        });
      }
    }
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  if (process.argv.includes("--reset") || process.env.RESET_SEED === "true") {
    assertLocalResetAllowed(process.env.DATABASE_URL, process.env);
  }
  const sql = getSql();
  seed(sql)
    .then(() => {
      console.log("Seeded the encyclopaedic Tree of Knowledge, cross-discipline links, and curated dossiers");
      return sql.end();
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

