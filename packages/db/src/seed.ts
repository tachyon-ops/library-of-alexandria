import { fileURLToPath } from "node:url";
import { getSql, type Sql } from "./client";
import { createTopic, getTopicBySlug, linkTopics, moveTopic, setTopicSummaryIfEmpty } from "./repo";

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
          "Fundamental laws of matter, energy, motion, fields, spacetime, quantum phenomena, gravitation, and the origin and structure of the cosmos.",
        children: [
          {
            slug: "classical-mechanics-thermodynamics-electromagnetism",
            title: "Classical Mechanics, Thermodynamics & Electromagnetism",
            brief:
              "Newtonian, Lagrangian, and Hamiltonian mechanics, continuum and fluid dynamics, statistical mechanics, entropy, and Maxwellian electrodynamics.",
          },
          {
            slug: "relativity-gravitation-spacetime-physics",
            title: "Relativity, Gravitation & Spacetime Physics",
            brief:
              "Special and general relativity, Riemannian spacetime geometry, gravitational waves, black hole horizons, and relativistic cosmology.",
            children: [
              {
                slug: "quantum-gravity-string-theory-loop-quantum-gravity",
                title: "Quantum Gravity, String Theory & Loop Quantum Gravity",
                brief:
                  "Superstring theory, M-theory, AdS/CFT holographic correspondence, loop quantum gravity, spin foams, causal set theory, and asymptotic safety.",
              },
              {
                slug: "modified-emergent-and-frontier-gravity-theories",
                title: "Modified, Emergent & Frontier Gravity Theories",
                brief:
                  "Modified Newtonian Dynamics (MOND), TeVeS, Verlinde's entropic/emergent gravity, Quantised Inertia / Horizon Mechanics (McCulloch / MiHsC), scalar-tensor f(R) theories, and galactic rotation curves.",
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
              "Wave mechanics, Hilbert space formalism, entanglement, decoherence, Quantum Electrodynamics, Quantum Chromodynamics, the Standard Model, and neutrino/collider physics.",
          },
          {
            slug: "condensed-matter-atomic-molecular-optical-physics",
            title: "Condensed Matter, Atomic, Molecular & Optical Physics",
            brief:
              "Electronic band structure, superconductivity, topological phases of matter, Bose–Einstein condensates, quantum optics, and photonics.",
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
                  "Follicular dynamics, ovarian aging across the reproductive lifespan, oocyte vitrification, warming survival, and cumulative live birth outcomes.",
              },
              {
                slug: "endometrial-receptivity-implantation-biology",
                title: "Endometrial Receptivity & Implantation Biology",
                brief:
                  "Endometrial physiology, recurrent implantation failure, reproductive immunology, and the reproductive tract microbiome.",
              },
              {
                slug: "andrology-male-factor-infertility",
                title: "Andrology & Male Factor Infertility",
                brief:
                  "Spermatogenesis, sperm chromatin and DNA integrity, paternal age effects after 40 across the population, varicocele, and clinical interventions.",
              },
              {
                slug: "assisted-reproductive-technology-gamete-donation",
                title: "Assisted Reproductive Technology & Gamete Donation",
                brief:
                  "In vitro fertilisation, intracytoplasmic sperm injection, embryo selection, third-party reproduction, outcomes, and international regulatory frameworks.",
              },
              {
                slug: "translational-geroprotective-reproductive-biology",
                title: "Translational & Geroprotective Reproductive Biology",
                brief:
                  "In vitro gametogenesis, mitochondrial replacement therapy, ovarian tissue cryopreservation and transplantation, mTOR modulation, and intraovarian biologics.",
              },
              {
                slug: "advanced-maternal-age-pregnancy-after-40",
                title: "Advanced Maternal Age & Pregnancy After 40",
                brief:
                  "Maternal cardiovascular and metabolic adaptation, hypertensive disorders of pregnancy, gestational diabetes, placental biology, and perinatal outcomes in pregnancy after age 40.",
              },
            ],
          },
          {
            slug: "geroscience-cellular-senescence-longevity-biology",
            title: "Geroscience, Cellular Senescence & Longevity Biology",
            brief:
              "Hallmarks of biological aging, telomere dynamics, epigenetic clocks, senolytics, autophagy, NAD+ and sirtuin metabolism, caloric restriction mimetics, and partial cellular reprogramming.",
          },
          {
            slug: "neuroscience-cognitive-science-and-consciousness",
            title: "Neuroscience, Cognitive Science & Consciousness",
            brief:
              "Synaptic transmission, neural circuit dynamics, memory consolidation, neuroimaging, neural correlates of consciousness, and neuropsychiatric pathophysiology.",
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
      "Pure and applied mathematics, geometry, topology, logic, probability and statistics, theoretical computer science, artificial intelligence, and systems architecture.",
    children: [
      {
        slug: "pure-applied-mathematics-geometry-and-topology",
        title: "Pure & Applied Mathematics, Geometry & Topology",
        brief:
          "Number theory, algebra, real and complex analysis, differential geometry, algebraic topology, dynamical systems, and partial differential equations.",
      },
      {
        slug: "logic-computation-information-artificial-intelligence",
        title: "Logic, Computation, Information & Artificial Intelligence",
        brief:
          "Mathematical logic, Gödel incompleteness, Turing computability, complexity theory, cryptography, statistical machine learning, and autonomous reasoning systems.",
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
    title: "Economics & Political Economy",
    brief:
      "Microeconomics, macroeconomics, econometrics, economic history, public finance, industrial organisation, and global trade.",
    children: [
      {
        slug: "macroeconomics-political-economy-and-economic-history",
        title: "Macroeconomics, Political Economy & Economic History",
        brief:
          "Economic growth, monetary and fiscal institutions, demographic transitions, innovation economics, and long-run living standards.",
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
    slugA: "biochemistry-chemical-biology-and-abiogenesis",
    slugB: "molecular-cellular-and-evolutionary-biology",
    relation: "bridges",
    note: "Enzymatic catalysis, nucleic acid chemistry, bioenergetics, and prebiotic abiogenesis connect molecular chemistry directly to living cells.",
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
    slugA: "musicology-harmony-acoustics-and-performing-arts",
    slugB: "classical-mechanics-thermodynamics-electromagnetism",
    relation: "intersects",
    note: "Wave equations, harmonic overtone series, resonance, and psychoacoustics link musical harmony directly to physical acoustics.",
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
];

async function ensureNode(sql: Sql, node: SeedNode, parentId: string | null): Promise<void> {
  let existing = await getTopicBySlug(sql, node.slug);
  if (!existing) {
    existing = await createTopic(sql, { title: node.title, brief: node.brief, parentId });
    await sql`UPDATE topics SET slug = ${node.slug} WHERE id = ${existing.id} AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = ${node.slug} AND id <> ${existing.id})`;
  } else if (parentId && existing.parentId !== parentId) {
    existing = await moveTopic(sql, existing.id, parentId);
  }
  const childNames = (node.children ?? []).map((c) => c.title);
  const subSentence =
    childNames.length > 0 ? ` Core branches include ${childNames.join("; ")}.` : "";
  await setTopicSummaryIfEmpty(
    sql,
    existing.id,
    `${node.title} investigates ${node.brief.charAt(0).toLowerCase()}${node.brief.slice(1)}${subSentence}`,
  );
  for (const child of node.children ?? []) {
    await ensureNode(sql, child, existing.id);
  }
}

export async function seed(sql: Sql): Promise<void> {
  for (const trunk of ENCYCLOPAEDIC_TRUNKS) {
    await ensureNode(sql, trunk, null);
  }
  for (const link of CROSS_DISCIPLINE_LINKS) {
    const a = await getTopicBySlug(sql, link.slugA);
    const b = await getTopicBySlug(sql, link.slugB);
    if (a && b) {
      await linkTopics(sql, a.id, b.id, link.relation, link.note);
    }
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const sql = getSql();
  seed(sql)
    .then(() => {
      console.log("Seeded the encyclopaedic Tree of Knowledge and cross-discipline links");
      return sql.end();
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
