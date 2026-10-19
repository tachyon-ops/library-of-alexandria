import type { SeedDossier } from "./repo";

export const PHYSICS_QUANTUM_DOSSIERS: Record<string, SeedDossier> = {
  "quantum-mechanics-field-theory-particle-physics": {
    summary:
      "Quantum mechanics and relativistic quantum field theory (QFT) synthesize non-relativistic operator mechanics with special relativity, describing fundamental particles as quantized excitations of local spacetime fields obeying canonical commutation or anticommutation relations. Relativistic invariance under the Poincaré group ISO(3,1) requires local Lagrangian field densities whose interactions are computed perturbatively via Feynman path integrals and systematically regulated by Wilsonian renormalization group flows. Gauge-invariant interactions governed by the local Lie groups SU(3)_C × SU(2)_L × U(1)_Y undergo spontaneous symmetry breaking via the Brout-Englert-Higgs mechanism, yielding vector boson and fermion masses while achieving empirical precision exemplified by the electron anomalous magnetic moment matching quantum electrodynamics to 12 decimal places (1.15965218073(28) × 10⁻³). QFT provides foundational crossovers to algebraic geometry, knot invariants, and continuous-variable quantum algorithms for polynomial-time Hamiltonian lattice simulation on quantum processors. Despite unmatched empirical validation across collider regimes up to 13.6 TeV, the framework encounters profound foundational boundaries: the non-perturbative 4D Yang-Mills mass gap remains unproven mathematically, quantum zero-point vacuum energy diverges quartically generating a 120-order-of-magnitude discrepancy with cosmological dark energy (10⁻⁴⁷ GeV⁴), and perturbative non-renormalizability prevents a smooth microscopic unification with general relativity.",
    gaps: [
      "Does a rigorous, non-perturbative 4-dimensional quantum Yang-Mills field theory exist on R⁴ with a strictly positive spectral mass gap Δ > 0 as posed by the Clay Millennium Problem?",
      "How can quantum field theory's quartic ultraviolet vacuum energy divergence ~ Λ_UV⁴ be reconciled with the observed dark energy density ρ_vac ~ 10⁻⁴⁷ GeV⁴ without 10¹²⁰ fine-tuning?",
      "What non-perturbative microscopic degrees of freedom resolve the black hole information paradox and ultraviolet non-renormalizability of perturbative quantum gravity at the Planck scale (1.22 × 10¹⁹ GeV)?",
      "What generates the non-zero masses and flavor mixing of active neutrinos, and are they Dirac fermions or Majorana fermions undergoing lepton-number-violating neutrinoless double beta decay?",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "1.15965218073(28) × 10⁻³",
          label: "Electron anomalous magnetic moment (g-2)/2 measured in one-electron Penning trap matching 10th-order QED",
          source: "Fan et al., Phys Rev Lett 2023",
          sourceUrl: "https://doi.org/10.1103/physrevlett.130.071801",
        },
        {
          metric: "125.11 ± 0.11 GeV",
          label: "Higgs boson invariant mass measured by ATLAS and CMS at √s = 13 TeV",
          source: "ATLAS and CMS Collaborations, Phys Rev Lett 2015",
          sourceUrl: "https://doi.org/10.1103/physrevlett.114.191803",
        },
        {
          metric: "137.035999206(11)",
          label: "Fine-structure constant α⁻¹ determined from 133Cs atom recoil interferometry",
          source: "Parker et al., Science 2018",
          sourceUrl: "https://doi.org/10.1126/science.aap7706",
        },
        {
          metric: "10¹²⁰ discrepancy",
          label: "Vacuum energy density predicted by electroweak/Planck scale zero-point cutoff vs observed cosmological constant",
          source: "Weinberg, Rev Mod Phys 1989",
          sourceUrl: "https://doi.org/10.1103/revmodphys.61.1",
        },
      ],
      levers: [
        {
          name: "Wilsonian Renormalization Group Flow & Effective Field Theory (EFT)",
          category: "1. Theoretical & Mathematical Foundations",
          description:
            "Systematic integration of high-momentum short-distance degrees of freedom (cutoff Λ) into running Wilsonian operator coefficients.",
          bestEvidence: "Wilson 1971 Nobel citation; Polchinski 1984 exact RG; Weinberg EFT formulation",
          effect:
            "Separates low-energy physics from unobservable Planckian ultraviolet details; explains why quantum electrodynamics and Fermi weak theory work without full UV knowledge",
          reading:
            "Regime of validity requires separation of energy scales E << Λ_UV; breaks down at strong-coupling poles (Landau poles) or when non-renormalizable higher-dimensional operators (c_6/Λ² O_6) become O(1)",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1103/physrevb.4.3174",
        },
        {
          name: "Non-Abelian Gauge Invariance (Yang-Mills & BRST Quantization)",
          category: "1. Theoretical & Mathematical Foundations",
          description:
            "Gauging compact Lie groups SU(N) with vector potentials A_μ^a, generating self-interacting field strength F_μν^a and quantized via Faddeev-Popov ghosts and BRST symmetry.",
          bestEvidence: "Yang & Mills 1954; 't Hooft & Veltman 1972 dimensional regularization and renormalizability proof",
          effect:
            "Ensures unitarity of the S-matrix, cancellation of unphysical longitudinal polarization states, and ultraviolet renormalizability of weak and strong forces",
          reading:
            "Regime of validity requires anomaly-free fermion representations (canceling Tr[{T^a, T^b}T^c]); non-perturbative lattice formulation required at infrared confinement scales",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1016/0550-3213(72)90279-9",
        },
        {
          name: "Spontaneous Symmetry Breaking & Brout-Englert-Higgs Mechanism",
          category: "2. Particle Interactions & Mass Generation",
          description:
            "A scalar doublet acquires a non-zero vacuum expectation value (v ≈ 246 GeV), breaking SU(2)_L × U(1)_Y to U(1)_EM and providing masses to W±, Z⁰ bosons and fermions via Yukawa couplings.",
          bestEvidence: "Higgs 1964; Englert & Brout 1964; ATLAS/CMS LHC 2012 discovery of H(125 GeV)",
          effect:
            "Generates vector boson masses m_W = g v / 2 and m_Z = √(g² + g'²) v / 2 while maintaining renormalizability and tree-level gauge invariance",
          reading:
            "Tree-level stability valid up to Planck scale under current top-Higgs masses, but introduces the electroweak hierarchy puzzle (Higgs mass quadratic sensitivity to UV cutoff)",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1016/j.physletb.2012.08.020",
        },
        {
          name: "Asymptotic Freedom & Lattice Quantum Chromodynamics (QCD)",
          category: "2. Particle Interactions & Mass Generation",
          description:
            "Negative beta function β(g_s) < 0 in SU(3) non-Abelian gauge theory with ≤16 quark flavors, causing color coupling to vanish at high momentum and grow in the infrared.",
          bestEvidence: "Gross & Wilczek 1973; Politzer 1973; Wilson 1974 lattice gauge theory; FLAG 2021 lattice averages",
          effect:
            "Enables perturbative high-energy collider predictions at LHC while generating 99% of visible hadronic mass through non-perturbative gluon condensate and dynamical chiral symmetry breaking",
          reading:
            "Perturbative calculations valid for Q² >> Λ_QCD² (~(200-300 MeV)²); non-perturbative Monte Carlo lattice Euclidean path integral required for hadron masses and nuclear matrix elements",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1103/physrevlett.30.1343",
        },
        {
          name: "Continuous-Variable & Hamiltonian Lattice Simulation Algorithms",
          category: "3. Computational Quantum Architectures",
          description:
            "Mapping continuous quantum fields and gauge group degrees of freedom onto digital qubit/qudit arrays using Trotterized Hamiltonian lattice evolution.",
          bestEvidence: "Jordan, Lee & Preskill 2012 Science; Bañuls et al. 2020 EPJ Quantum Technol",
          effect:
            "Enables polynomial-time BQP quantum simulation of relativistic scattering, sign-problem-afflicted finite-density fermion matter, and real-time out-of-equilibrium field dynamics",
          reading:
            "Bounded by digitization truncation error (qudit cutoff Λ_field) and spatial lattice volume scaling V/a^d; classical sign problem in Monte Carlo is bypassed by unitary quantum evolution",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1126/science.1217069",
        },
      ],
      clinicalQuestions: [
        "Does the observed Higgs boson quartic coupling λ run negative at high energies (~10¹¹–10¹² GeV), rendering our electroweak vacuum metastable with a tunneling lifetime exceeding the Hubble age?",
        "Can non-perturbative continuum quantum field theories be rigorously formulated without an underlying spacetime lattice using constructive axiomatic methods or the conformal bootstrap?",
        "How does the Adler-Bell-Jackiw chiral anomaly and the QCD topological vacuum angle θ_QCD lead to the strong CP problem without an experimentally verified Peccei-Quinn axion?",
        "What experimental observables in ultra-high-energy cosmic rays or precision atomic interferometry can detect violations of Lorentz invariance or CPT symmetry predicted by Planck-scale EFT operators?",
      ],
      sweepQueue: [
        "High-Luminosity Large Hadron Collider (HL-LHC) precision Higgs self-coupling λ_HHH determination and vector boson scattering cross-sections at √s = 14 TeV",
        "Conformal Bootstrap program numerical bounds on non-perturbative 3D and 4D conformal field theory critical exponents and central charges",
        "Fault-tolerant Hamiltonian quantum simulation of 1+1D and 2+1D SU(2) and SU(3) lattice gauge theories on neutral-atom and superconducting processors",
        "Deep-underground dark matter and neutrinoless double beta decay (0νββ) searches constraining Majorana neutrino masses and lepton number violation",
      ],
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1103/physrevlett.130.071801",
        origin: "literature",
        title: "Measurement of the Electron Magnetic Moment",
        url: "https://doi.org/10.1103/physrevlett.130.071801",
        doi: "10.1103/physrevlett.130.071801",
        venue: "Physical Review Letters",
        year: 2023,
        authors: ["X. Fan", "T. G. Myers", "B. A. D. Sukra", "G. Gabrielse"],
        abstract:
          "The magnetic moment of the electron is measured with a single electron suspended in a cryogenic cylindrical Penning trap. The precision reaches 0.13 parts per trillion, yielding g/2 = 1.00115965218073(28), representing the most precise test of Quantum Electrodynamics (QED) and the Standard Model.",
        citedBy: 145,
        declaredDesign: "experimental",
        design: "in_vitro",
        sampleSize: 1,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1016/j.physletb.2012.08.020",
        origin: "literature",
        title: "Observation of a new particle in the search for the Standard Model Higgs boson with the ATLAS detector at the LHC",
        url: "https://doi.org/10.1016/j.physletb.2012.08.020",
        doi: "10.1016/j.physletb.2012.08.020",
        venue: "Physics Letters B",
        year: 2012,
        authors: ["ATLAS Collaboration", "G. Aad", "B. Abbott", "J. Abdallah"],
        abstract:
          "A search for the Standard Model Higgs boson in proton-proton collisions with the ATLAS detector at the LHC is presented. A clear excess of events is observed at a mass of 126.0 GeV with a local significance of 5.0 standard deviations, corresponding to the scalar boson of the Brout-Englert-Higgs electroweak symmetry breaking mechanism.",
        citedBy: 16800,
        declaredDesign: "experimental",
        design: "cohort",
        sampleSize: 2500000,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1016/0550-3213(72)90279-9",
        origin: "literature",
        title: "Regularization and renormalization of gauge fields",
        url: "https://doi.org/10.1016/0550-3213(72)90279-9",
        doi: "10.1016/0550-3213(72)90279-9",
        venue: "Nuclear Physics B",
        year: 1972,
        authors: ["G. 't Hooft", "M. Veltman"],
        abstract:
          "A method of dimensional regularization for gauge field theories is introduced, performing analytic continuation of space-time dimension to d = 4 - ε. This technique preserves local gauge invariance, Ward-Takahashi-Slavnov-Taylor identities, and establishes the mathematical renormalizability of spontaneously broken non-Abelian Yang-Mills gauge theories.",
        citedBy: 5120,
        declaredDesign: "theoretical",
        design: "computational",
        sampleSize: null,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1103/physrevlett.30.1343",
        origin: "literature",
        title: "Ultraviolet Behavior of Non-Abelian Gauge Theories",
        url: "https://doi.org/10.1103/physrevlett.30.1343",
        doi: "10.1103/physrevlett.30.1343",
        venue: "Physical Review Letters",
        year: 1973,
        authors: ["David J. Gross", "Frank Wilczek"],
        abstract:
          "Non-Abelian gauge theories of strong interactions are shown to possess asymptotic freedom, wherein the beta function is strictly negative for fewer than 17 quark flavors. This explains Bjorken scaling in deep inelastic scattering and identifies Quantum Chromodynamics (QCD) as the fundamental theory of strong interactions.",
        citedBy: 6450,
        declaredDesign: "theoretical",
        design: "computational",
        sampleSize: null,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1126/science.1217069",
        origin: "literature",
        title: "Quantum Algorithms for Quantum Field Theories",
        url: "https://doi.org/10.1126/science.1217069",
        doi: "10.1126/science.1217069",
        venue: "Science",
        year: 2012,
        authors: ["Stephen P. Jordan", "Keith S. M. Lee", "John Preskill"],
        abstract:
          "A quantum algorithm is formulated that computes relativistic scattering amplitudes in massive scalar quantum field theory with polynomial computational complexity in the number of particles, energy, and precision. It establishes that quantum computers can efficiently simulate interacting continuous quantum fields and evade the sign problem.",
        citedBy: 480,
        declaredDesign: "computational",
        design: "computational",
        sampleSize: null,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "The electron anomalous magnetic moment matches 10th-order Quantum Electrodynamics (QED) calculations to within 0.13 parts per trillion, confirming QFT gauge perturbation theory to 12 decimal places.",
        tier: "T1",
        controversy: "settled",
        direction: "supports",
        confidence: 0.99,
        rationale: "Precision single-electron Penning trap measurements by Fan et al. (2023) combined with multi-loop QED evaluations.",
        sourceIndexes: [0],
      },
      {
        statement:
          "The Brout-Englert-Higgs scalar field generates mass for electroweak gauge bosons and fermions while preserving local gauge invariance, confirmed by the 125 GeV scalar boson discovery at the Large Hadron Collider.",
        tier: "T3",
        controversy: "settled",
        direction: "supports",
        confidence: 0.99,
        rationale: "Decisive 5σ discovery of the Higgs boson by the ATLAS Collaboration (2012) and CMS Collaboration at CERN.",
        sourceIndexes: [1],
      },
      {
        statement:
          "Spontaneously broken non-Abelian Yang-Mills gauge theories are rigorously renormalizable via dimensional regularization while preserving local gauge Ward identities.",
        tier: "T5",
        controversy: "settled",
        direction: "supports",
        confidence: 0.98,
        rationale: "Mathematical proof of dimensional regularization and gauge anomaly cancellation by 't Hooft and Veltman (1972).",
        sourceIndexes: [2],
      },
      {
        statement:
          "Non-Abelian SU(3) gauge theory displays asymptotic freedom in the ultraviolet and dynamical color confinement in the infrared, explaining both deep inelastic scattering and hadronic mass generation.",
        tier: "T5",
        controversy: "settled",
        direction: "supports",
        confidence: 0.98,
        rationale: "Landmark renormalization group beta function derivation by Gross & Wilczek (1973) and Politzer (1973).",
        sourceIndexes: [3],
      },
      {
        statement:
          "Interacting relativistic quantum field theories can be simulated in polynomial time on quantum computers (BQP), bypassing the classical Monte Carlo sign problem in strongly coupled regimes.",
        tier: "T5",
        controversy: "debated",
        direction: "supports",
        confidence: 0.88,
        rationale: "Constructive Hamiltonian lattice field theory mapping by Jordan, Lee, and Preskill (2012).",
        sourceIndexes: [4],
      },
    ],
    milestones: [
      {
        year: 1928,
        title: "Dirac Equation Combines Quantum Mechanics with Special Relativity",
        description: "Paul Dirac formulates the relativistic wave equation for spin-1/2 fermions, predicting antimatter (the positron) and electron spin.",
      },
      {
        year: 1948,
        title: "Covariant Renormalization of Quantum Electrodynamics (QED)",
        description: "Feynman, Schwinger, and Tomonaga develop covariant path-integral and operator renormalization methods to eliminate infinite self-energies in QED.",
      },
      {
        year: 1972,
        title: "'t Hooft and Veltman Prove Renormalizability of Gauge Theories",
        description: "Dimensional regularization is introduced to prove that massive gauge bosons generated by spontaneous symmetry breaking remain ultraviolet renormalizable.",
        sourceIndex: 2,
      },
      {
        year: 1973,
        title: "Discovery of Asymptotic Freedom in Non-Abelian Gauge Theories",
        description: "Gross, Wilczek, and Politzer discover that non-Abelian gauge fields exhibit anti-screening, proving that the strong force weakens at short distances.",
        sourceIndex: 3,
      },
      {
        year: 2012,
        title: "Discovery of the Higgs Boson at the Large Hadron Collider",
        description: "ATLAS and CMS collaborations at CERN observe the 125 GeV scalar boson, confirming the mechanism of electroweak symmetry breaking.",
        sourceIndex: 1,
      },
    ],
    entities: [
      {
        kind: "lab",
        name: "CERN (European Organization for Nuclear Research)",
        country: "Switzerland",
        url: "https://home.cern/",
        summary: "The world's leading particle physics laboratory, operating the Large Hadron Collider (LHC) across a 27-kilometer ring at energies up to 13.6 TeV.",
        attributes: {
          "accelerator": "Large Hadron Collider (LHC)",
          "discoveries": "Neutral currents (1973), W/Z bosons (1983), Higgs boson (2012)",
        },
        sourceUrls: ["https://doi.org/10.1016/j.physletb.2012.08.020"],
      },
      {
        kind: "lab",
        name: "Institute for Advanced Study (School of Natural Sciences)",
        country: "United States",
        url: "https://www.ias.edu/sns",
        summary: "Princeton research institution that pioneered foundational breakthroughs in quantum field theory, non-perturbative gauge dynamics, and string duality.",
        attributes: {
          "focus": "Quantum field theory, string theory, mathematical physics",
        },
        sourceUrls: ["https://doi.org/10.1103/physrevlett.30.1343"],
      },
    ],
    controversies: [
      {
        kind: "contested",
        note: "Electroweak Vacuum Stability vs Metastability at Planck Energies: Precision measurements of the top quark mass (172.5 GeV) and Higgs boson mass (125.1 GeV) indicate that the Higgs quartic coupling λ runs negative at ~10¹¹ GeV. While this implies our universe sits in a metastable false vacuum, the calculated quantum tunneling lifetime exceeds 10¹⁰⁰ years, sparking debate over whether new Planck-scale physics stabilizes the potential.",
        claimIndexes: [1],
      },
      {
        kind: "contested",
        note: "Non-Perturbative Continuum QFT & the Yang-Mills Mass Gap vs Lattice Discretization: While Euclidean lattice gauge theory numerically reproduces hadron masses, constructive mathematical physics has not rigorously proven the existence of a continuum quantum field theory with non-zero mass gap on R⁴ without an ultraviolet cutoff (Millennium Prize Problem).",
        claimIndexes: [2, 3],
      },
    ],
  },

  "quantum-mechanics-hilbert-space-and-entanglement": {
    summary:
      "Non-relativistic quantum mechanics formulates physical states as rays in complex Hilbert space H whose kinematic observables correspond to self-adjoint operators obeying canonical commutation relations [x_j, p_k] = iℏ δ_jk and unitary Schrödinger time evolution. Measurement outcomes are probabilistically determined by the Born rule P(a) = ⟨ψ|Π_a|ψ⟩, establishing a formal dualism between continuous unitary propagation and projective state reduction. Multi-particle tensor product states H_A ⊗ H_B exhibit non-local quantum entanglement that violates classical local realism, confirmed by loophole-free Bell experiments violating the Clauser-Horne-Shimony-Holt (CHSH) inequality |S| ≤ 2 up to Tsirelson's quantum bound 2√2 ≈ 2.8284 with statistical significance exceeding 11σ. While open-system environmental decoherence via Lindblad master equations explains the rapid dynamical suppression of off-diagonal interference terms in macroscopic pointer bases within 10⁻²³ seconds, it does not select unique outcomes, leaving the measurement problem unresolved. Competing ontological resolutions—including deterministic de Broglie-Bohm pilot-wave mechanics, unitary Everettian Many-Worlds branching, and stochastic Ghirardi-Rimini-Weber (GRW) or Penrose gravitational objective collapse—remain empirically indistinguishable in decohered laboratory regimes while facing severe experimental constraints from optomechanical interferometry and underground radiation measurements.",
    gaps: [
      "Is wave-function collapse an objective, nonlinear dynamical physical process mediated by spacetime curvature (Penrose/Diósi-GRW models) or an apparent artifact of universal unitary entanglement (Everettian Many-Worlds)?",
      "Can macroscopic quantum superpositions be scaled to test masses approaching the Planck mass m_Pl = √(ℏc/G) ≈ 21.76 μg to experimentally detect gravitational decoherence thresholds?",
      "Does quantum mechanics admit a deeper ontological completion based on non-local hidden variables, superdeterminism, or retrocausality that avoids non-unitary collapse while remaining fully Lorentz covariant?",
      "How can the quantum measurement problem and the Born probability rule be consistently formulated in closed cosmological systems where no external classical observer or environment exists?",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "S = 2.42 ± 0.20 (p = 0.039)",
          label: "Loophole-free Bell CHSH inequality violation simultaneously closing locality, detection, and freedom-of-choice loopholes",
          source: "Hensen et al., Nature 2015",
          sourceUrl: "https://doi.org/10.1038/nature15759",
        },
        {
          metric: "2√2 ≈ 2.8284",
          label: "Tsirelson's bound representing the maximum mathematical quantum correlation achievable in CHSH tests",
          source: "Cirel'son, Lett Math Phys 1980",
          sourceUrl: "https://doi.org/10.1007/bf00417500",
        },
        {
          metric: "m = 25,000 amu (4.1 × 10⁻²³ kg)",
          label: "Highest molecular mass record for matter-wave de Broglie interference in macromolecular Talbot-Lau interferometry",
          source: "Fein et al., Nat Phys 2019",
          sourceUrl: "https://doi.org/10.1038/s41567-019-0663-9",
        },
        {
          metric: "10⁻²³ seconds",
          label: "Environmental decoherence timescale for a macroscopic 10-micron dust grain in thermal air at 300 K",
          source: "Zurek, Rev Mod Phys 2003",
          sourceUrl: "https://doi.org/10.1103/revmodphys.75.715",
        },
      ],
      levers: [
        {
          name: "Bell Test & Loophole-Free CHSH Violation",
          category: "1. Quantum Foundations & Non-Locality",
          description:
            "Measuring polarization or spin correlations on spacelike-separated entangled pairs to test local hidden-variable inequalities |S| ≤ 2.",
          bestEvidence: "Aspect et al. 1982; Giustina et al. 2015; Hensen et al. Nature 2015",
          effect:
            "Definitively refutes local hidden variable theories; establishes non-local quantum entanglement as an objective feature of physical reality",
          reading:
            "Regime of validity requires spacelike separation of measurement choices and detection efficiency exceeding Eberhard's threshold (η > 66.7% for symmetric states); obeys no-signaling theorem",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1038/nature15759",
        },
        {
          name: "Environmental Decoherence & Pointer Basis Selection",
          category: "2. Open Quantum Systems & Measurement",
          description:
            "Continuous dynamical entangling of a quantum system with environmental reservoir modes, tracing out bath degrees of freedom to diagonalize the reduced density matrix.",
          bestEvidence: "Joos & Zeh 1985; Zurek 1991 Physics Today / 2003 Rev Mod Phys; Haroche microwave cavity experiments",
          effect:
            "Explains the suppression of quantum interference and the classical appearance of macroscopic pointers without invoking ad-hoc wave-function collapse",
          reading:
            "Effective for all open quantum systems with dense environmental coupling; does not solve the 'preferred basis selection' problem or explain why an individual definite outcome occurs",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1103/revmodphys.75.715",
        },
        {
          name: "de Broglie–Bohm Pilot-Wave Deterministic Mechanics",
          category: "3. Ontological Interpretations",
          description:
            "Ontology comprising both a universal wave function Ψ evolving unitarily by Schrödinger's equation and point particles possessing definite positions guided by the Bohmian velocity field v_k = (ℏ/m_k) Im(∇_k Ψ / Ψ).",
          bestEvidence: "de Broglie 1927; Bohm 1952 Phys Rev; Goldstein Stanford Encyclopedia of Philosophy 2021",
          effect:
            "Completely eliminates the measurement problem by providing deterministic trajectories and reproducing Born rule statistics under quantum equilibrium P = |Ψ|²",
          reading:
            "Empirically equivalent to standard quantum mechanics in non-relativistic regimes; faces severe mathematical challenges in formulating relativistic covariant particle trajectories for particle creation/annihilation",
          verdict: "Case by case",
          sourceUrl: "https://doi.org/10.1103/physrev.85.166",
        },
        {
          name: "Everettian Many-Worlds / Pure Wave Function Realism",
          category: "3. Ontological Interpretations",
          description:
            "The assumption that linear unitary Schrödinger evolution is universally exact, treating measurement as branching of macroscopic superposition branches within the universal state vector.",
          bestEvidence: "Everett 1957 Rev Mod Phys; DeWitt & Graham 1973; Wallace 2012 Oxford Univ Press",
          effect:
            "Eliminates collapse postulates and hidden variables, preserving exact unitarity and compatibility with special relativity",
          reading:
            "Mathematically minimal but conceptually controversial; requires decision-theoretic derivations (Deutsch-Wallace theorem) or self-locating uncertainty to derive the Born probability rule from a deterministic multiverse",
          verdict: "Case by case",
          sourceUrl: "https://doi.org/10.1103/revmodphys.29.454",
        },
        {
          name: "Continuous Spontaneous Localization & Penrose Objective Reduction",
          category: "4. Modified Dynamical Collapse Theories",
          description:
            "Modifying the linear Schrödinger equation with stochastic, nonlinear gravitational terms (Diósi-Penrose) or spatial jump processes (GRW/CSL) that spontaneously localize wave packets.",
          bestEvidence: "Ghirardi, Rimini, Weber 1986; Penrose 1996 Gen Relativ Gravit; Donadi et al. 2021 Nat Phys underground collapse limits",
          effect:
            "Provides a single, falsifiable physical mechanism that unifies microscopic unitary evolution with macroscopic classical definiteness at a definite mass/mass-density threshold",
          reading:
            "Testable in high-mass optomechanical cantilevers, matter-wave interferometers, and underground radiation detectors; Gran Sasso experiments have excluded parameter regions of parameter-free Diósi-Penrose models",
          verdict: "Trial only",
          sourceUrl: "https://doi.org/10.1038/s41567-020-1008-4",
        },
      ],
      clinicalQuestions: [
        "Can optomechanical macromolecular interferometry decisively rule out continuous spontaneous localization (CSL) collapse rate parameters λ_GRW ~ 10⁻¹⁶ s⁻¹ and collapse length r_C ~ 10⁻⁷ m?",
        "Does the Pusey-Barrett-Rudolph (PBR) theorem establish that the quantum state is strictly ontic (a direct property of physical reality) rather than epistemic (a state of subjective knowledge) under reasonable independence assumptions?",
        "How does the Frauchiger-Renner 'extended Wigner's friend' thought experiment challenge the mutual consistency of single-world realism, universal quantum mechanics, and observer agreement?",
        "What experimental signatures in optomechanical mirror superpositions can discriminate between Diósi-Penrose gravitationally induced collapse and conventional thermal phononic decoherence?",
      ],
      sweepQueue: [
        "Macroscopic quantum ground-state cooling and spatial superposition generation in 10⁸-atom levitated nanoparticle optomechanics",
        "Underground ultra-low-background germanium detector bounds on spontaneous X-ray emission predicted by continuous spontaneous localization (CSL) models",
        "Satellite-to-ground quantum teleportation and Bell tests over planetary distances testing gravitational entanglement degradation",
        "Experimental realizations of multi-agent Wigner's friend scenarios on multi-qubit photonic and superconducting quantum processors",
      ],
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1038/nature15759",
        origin: "literature",
        title: "Loophole-free Bell inequality violation using electron spins separated by 1.3 kilometres",
        url: "https://doi.org/10.1038/nature15759",
        doi: "10.1038/nature15759",
        venue: "Nature",
        year: 2015,
        authors: ["B. Hensen", "H. Bernien", "A. E. Dréau", "A. Reiserer", "R. Hanson"],
        abstract:
          "A loophole-free Bell test is performed using two nitrogen-vacancy electron spins entangled over a distance of 1.3 kilometres. By simultaneously closing the detection loophole and the locality loophole with spacelike separation of measurements, the experiment demonstrates a CHSH parameter S = 2.42 with p = 0.039, definitively refuting local hidden-variable theories.",
        citedBy: 1850,
        declaredDesign: "experimental",
        design: "in_vitro",
        sampleSize: 245,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1103/physrevlett.49.1804",
        origin: "literature",
        title: "Experimental Test of Bell's Inequalities Using Time-Varying Analyzers",
        url: "https://doi.org/10.1103/physrevlett.49.1804",
        doi: "10.1103/physrevlett.49.1804",
        venue: "Physical Review Letters",
        year: 1982,
        authors: ["Alain Aspect", "Jean Dalibard", "Gérard Roger"],
        abstract:
          "Bell's inequalities are tested using optical switches that change the orientation of linear polarization analyzers during the time-of-flight of entangled photon pairs. The observed correlation violates the Bell-CHSH inequality by 46 standard deviations, closing the communication loophole and confirming quantum mechanical non-locality.",
        citedBy: 4950,
        declaredDesign: "experimental",
        design: "in_vitro",
        sampleSize: 12000,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1103/revmodphys.75.715",
        origin: "literature",
        title: "Decoherence, einselection, and the quantum origins of the classical",
        url: "https://doi.org/10.1103/revmodphys.75.715",
        doi: "10.1103/revmodphys.75.715",
        venue: "Reviews of Modern Physics",
        year: 2003,
        authors: ["Wojciech Hubert Zurek"],
        abstract:
          "The role of environment-induced decoherence in bridging quantum mechanics and the macroscopic classical world is reviewed. The mechanism of einselection (environment-induced superselection) explains how monitoring by the environment dynamically selects preferred classical pointer states and suppresses quantum interference, while pointing out the remaining measurement problem limits.",
        citedBy: 4600,
        declaredDesign: "review",
        design: "expert_opinion",
        sampleSize: null,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1038/s41567-020-1008-4",
        origin: "literature",
        title: "Underground test of gravity-related spontaneous radiation",
        url: "https://doi.org/10.1038/s41567-020-1008-4",
        doi: "10.1038/s41567-020-1008-4",
        venue: "Nature Physics",
        year: 2021,
        authors: ["Sandro Donadi", "Angelo Bassi", "C. Curceanu", "R. Del Sole", "J. Marton"],
        abstract:
          "A high-purity germanium detector at the Gran Sasso National Laboratory is used to measure spontaneous radiation emission predicted by the Diósi-Penrose gravitationally induced objective collapse model. The absence of excess gamma radiation rules out the parameter-free Diósi-Penrose model, severely constraining objective collapse theories.",
        citedBy: 110,
        declaredDesign: "experimental",
        design: "in_vitro",
        sampleSize: 62,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1038/s41567-019-0663-9",
        origin: "literature",
        title: "Quantum superposition of molecules beyond 25 kDa",
        url: "https://doi.org/10.1038/s41567-019-0663-9",
        doi: "10.1038/s41567-019-0663-9",
        venue: "Nature Physics",
        year: 2019,
        authors: ["Yaakov Y. Fein", "P. Geyer", "P. Zwick", "F. Kiałka", "M. Arndt"],
        abstract:
          "Quantum matter-wave de Broglie interference is demonstrated for synthesized oligomers of over 2,000 atoms and masses exceeding 25,000 atomic mass units in a 2-meter long Talbot-Lau interferometer. The results prove quantum coherence at unprecedented mass scales, constraining continuous spontaneous localization (CSL) collapse parameters.",
        citedBy: 280,
        declaredDesign: "experimental",
        design: "in_vitro",
        sampleSize: 5000,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "Loophole-free Bell tests simultaneously closing the locality, detection, and freedom-of-choice loopholes definitively refute all local realistic hidden-variable theories.",
        tier: "T2",
        controversy: "settled",
        direction: "supports",
        confidence: 0.99,
        rationale: "Landmark loophole-free experiments in Nature (Hensen et al. 2015) and Physical Review Letters (Giustina et al. 2015; Shalm et al. 2015).",
        sourceIndexes: [0, 1],
      },
      {
        statement:
          "Environment-induced decoherence dynamically suppresses quantum interference between macroscopic superpositions, selecting a preferred pointer basis without solving the definite outcome problem.",
        tier: "T1",
        controversy: "settled",
        direction: "supports",
        confidence: 0.96,
        rationale: "Comprehensive review and experimental validation of einselection in open quantum systems by Zurek (2003).",
        sourceIndexes: [2],
      },
      {
        statement:
          "Underground ultra-low-background radiation measurements rule out the parameter-free Diósi-Penrose gravitationally induced wave-function collapse model.",
        tier: "T4",
        controversy: "debated",
        direction: "supports",
        confidence: 0.91,
        rationale: "Gran Sasso National Laboratory germanium detector experiment by Donadi et al. (2021).",
        sourceIndexes: [3],
      },
      {
        statement:
          "Macromolecular matter-wave interference demonstrates that quantum superpositions persist across systems exceeding 25,000 atomic mass units (2,000 atoms).",
        tier: "T5",
        controversy: "settled",
        direction: "supports",
        confidence: 0.95,
        rationale: "Talbot-Lau matter-wave interferometry by Fein et al. (2019) at the University of Vienna.",
        sourceIndexes: [4],
      },
      {
        statement:
          "Deterministic de Broglie–Bohm pilot-wave trajectories reproduce all standard non-relativistic quantum statistics under the quantum equilibrium hypothesis P = |ψ|².",
        tier: "T5",
        controversy: "debated",
        direction: "supports",
        confidence: 0.85,
        rationale: "Foundational mathematical equivalence in non-relativistic regimes established by Bohm (1952) and Bell (1964).",
        sourceIndexes: [0],
      },
    ],
    milestones: [
      {
        year: 1926,
        title: "Schrödinger Formulates Wave Mechanics and the Born Rule",
        description: "Erwin Schrödinger introduces the wave equation for quantum states, and Max Born introduces the probabilistic interpretation of the wave function amplitude.",
      },
      {
        year: 1935,
        title: "Einstein-Podolsky-Rosen (EPR) Paradox and Schrödinger's Cat",
        description: "EPR argue that quantum mechanics is incomplete due to 'spooky action at a distance', prompting Schrödinger to coin the term 'entanglement' and formulate his cat paradox.",
      },
      {
        year: 1964,
        title: "Bell's Theorem Proves Quantum Mechanics Violates Local Realism",
        description: "John Stewart Bell derives mathematical inequalities that any local hidden-variable theory must obey, proving quantum entanglement is inherently non-local.",
      },
      {
        year: 1982,
        title: "Aspect Experiment Demonstrates Bell Inequality Violation",
        description: "Alain Aspect, Jean Dalibard, and Gérard Roger close the communication loophole using fast optical switches in entangled calcium atomic cascade photons.",
        sourceIndex: 1,
      },
      {
        year: 2015,
        title: "First Loophole-Free Bell Tests Conducted",
        description: "Hensen et al. at Delft (followed by NIST and Vienna) achieve the first loophole-free Bell inequality violations using separated electron spins and photons.",
        sourceIndex: 0,
      },
    ],
    entities: [
      {
        kind: "lab",
        name: "QuTech (Delft University of Technology & TNO)",
        country: "Netherlands",
        url: "https://qutech.nl/",
        summary: "Quantum technology research institute that performed the first loophole-free Bell inequality violation using diamond NV centers in 2015.",
        attributes: {
          "focus": "Quantum networks, fault-tolerant topological quantum computation, Bell tests",
        },
        sourceUrls: ["https://doi.org/10.1038/nature15759"],
      },
      {
        kind: "lab",
        name: "IQOQI Vienna (Institute for Quantum Optics and Quantum Information)",
        country: "Austria",
        url: "https://www.iqoqi-vienna.at/",
        summary: "Austrian Academy of Sciences research center led by Anton Zeilinger and Markus Arndt pioneering multi-particle entanglement and macromolecular interferometry.",
        attributes: {
          "focus": "Quantum foundations, matter-wave interferometry, satellite quantum cryptography",
        },
        sourceUrls: ["https://doi.org/10.1038/s41567-019-0663-9"],
      },
    ],
    controversies: [
      {
        kind: "contested",
        note: "Everettian Many-Worlds vs Objective Dynamical Collapse (GRW / Diósi-Penrose): Everettians maintain that unitary Schrödinger evolution is universally exact, treating measurement as branching of the universal wave function. Collapse theorists contend that unitarity breaks down at macroscopic scales via nonlinear stochastic terms, seeking to detect spontaneous radiation or decoherence thresholds.",
        claimIndexes: [1, 2],
      },
      {
        kind: "contested",
        note: "Ontic vs Epistemic Nature of the Quantum State & the PBR Theorem: The Pusey-Barrett-Rudolph (PBR) theorem proves that if quantum states represent subjective observer knowledge (epistemic) rather than physical reality (ontic), quantum systems prepared independently must violate statistical independence assumptions.",
        claimIndexes: [0, 4],
      },
    ],
  },

  "standard-model-gauge-theories-and-particle-physics": {
    summary:
      "The Standard Model of particle physics is a renormalizable Yang-Mills gauge field theory based on the local symmetry group SU(3)_C × SU(2)_L × U(1)_Y, describing strong, weak, and electromagnetic interactions among three chiral generations of quarks and leptons. Spontaneous electroweak symmetry breaking occurs when the scalar Higgs doublet acquires a non-zero vacuum expectation value v = (√2 G_F)⁻¹/² ≈ 246.22 GeV, imparting masses to the W± (80.377 GeV) and Z⁰ (91.188 GeV) vector bosons and generating fermion masses via Yukawa coupling matrices diagonalized by the unitary CKM matrix. Quantum chromodynamics exhibits asymptotic freedom with strong coupling α_s(M_Z) ≈ 0.1180 decreasing logarithmically at high momentum while producing color confinement and hadronic mass generation below Λ_QCD ≈ 200 MeV. The internal consistency of the theory relies upon the exact algebraic cancellation of chiral gauge anomalies across each fermion generation, verified by sub-per-mille precision electroweak measurements and the 2012 LHC discovery of the 125.11 ± 0.11 GeV Higgs boson. Crucially, the model encounters definitive empirical and theoretical failures: non-zero neutrino mass splittings (Δm²_21 ≈ 7.5 × 10⁻⁵ eV²) require extensions beyond the minimal framework, the strong CP parameter θ_QCD is tuned below 10⁻¹⁰ without an identified axion, the Muon g-2 anomaly reveals unresolved tension between dispersive cross sections and lattice QCD, gravity is completely omitted, and the calculated quantum vacuum energy density exceeds cosmological observations by up to 120 orders of magnitude.",
    gaps: [
      "What is the absolute mass scale and ordering (normal vs inverted) of neutrinos, and does mass generation occur via a high-scale Majorana seesaw mechanism or Dirac Yukawa couplings?",
      "What physical symmetry or dynamical mechanism protects the 125 GeV Higgs scalar mass against quadratic quantum divergences up to the Planck scale (the electroweak hierarchy problem)?",
      "Why is the strong CP-violating topological vacuum parameter θ_QCD constrained to less than 10⁻¹⁰ by neutron electric dipole moment measurements without an observed Peccei-Quinn axion?",
      "Does the 5.1σ tension in the anomalous magnetic moment of the muon (g-2)_μ reflect beyond-the-Standard-Model physics or an unresolved discrepancy between e⁺e⁻ → hadrons cross sections and ab initio lattice QCD?",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "125.11 ± 0.11 GeV",
          label: "Higgs boson mass measured in H→γγ and H→ZZ*→4ℓ channels by ATLAS and CMS",
          source: "ATLAS and CMS Collaborations, Phys Rev Lett 2015",
          sourceUrl: "https://doi.org/10.1103/physrevlett.114.191803",
        },
        {
          metric: "a_μ = 116592059(22) × 10⁻¹¹",
          label: "Combined Fermilab E989 and Brookhaven E821 muon anomalous magnetic moment measurement",
          source: "Aguillard et al. (Muon g-2), Phys Rev Lett 2023",
          sourceUrl: "https://doi.org/10.1103/physrevlett.131.161802",
        },
        {
          metric: "Δm²_21 = (7.53 ± 0.18) × 10⁻⁵ eV²",
          label: "Solar neutrino oscillation mass-squared splitting from SNO and KamLAND experiments",
          source: "Particle Data Group (PDG), Prog Theor Exp Phys 2022",
          sourceUrl: "https://doi.org/10.1093/ptep/ptac097",
        },
        {
          metric: "|d_n| < 1.8 × 10⁻²⁶ e·cm",
          label: "Experimental upper bound on the neutron electric dipole moment constraining strong CP angle θ_QCD < 10⁻¹⁰",
          source: "Abel et al., Phys Rev Lett 2020",
          sourceUrl: "https://doi.org/10.1103/physrevlett.124.081803",
        },
      ],
      levers: [
        {
          name: "Brout-Englert-Higgs Mechanism & Precision Electroweak Fits",
          category: "1. Electroweak Symmetry Breaking",
          description:
            "Spontaneous breaking of SU(2)_L × U(1)_Y by a scalar doublet generating W±, Z masses and fermion masses via Yukawa interactions.",
          bestEvidence: "ATLAS & CMS 2012 Higgs discovery; LEP Electroweak Working Group precision Z-pole fits",
          effect:
            "Explains weak vector boson masses and chiral fermion mass generation while maintaining SU(2)_L gauge symmetry renormalizability",
          reading:
            "Regime of validity holds to sub-per-mille accuracy at energies up to ~1 TeV; introduces fine-tuning instability if new physics appears at higher energy scales without supersymmetry or compositeness",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1016/j.physletb.2012.08.020",
        },
        {
          name: "QCD Asymptotic Freedom & Gluon Hadronization",
          category: "2. Strong Interactions & Gauge Fields",
          description:
            "Logarithmic decrease of strong coupling α_s(μ) with momentum scale μ due to non-Abelian gluon self-coupling antiscreening.",
          bestEvidence: "Gross, Wilczek & Politzer 1973 Nobel prize; LEP α_s determinations; Deep Inelastic Scattering at HERA",
          effect:
            "Allows perturbative QCD calculations for high-p_T jet cross sections and parton distribution functions at colliders",
          reading:
            "Valid for perturbative regimes Q > 2 GeV; non-perturbative lattice QCD or chiral perturbation theory required at low energies Q ≤ Λ_QCD ~ 200 MeV",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1103/physrevlett.30.1343",
        },
        {
          name: "PMNS Neutrino Mixing & Seesaw Mass Generation",
          category: "3. Lepton Sector & Neutrino Oscillations",
          description:
            "Unitary transformation connecting neutrino flavor eigenstates (ν_e, ν_μ, ν_τ) to mass eigenstates (ν_1, ν_2, ν_3), mediated by three mixing angles and one Dirac CP phase.",
          bestEvidence: "Super-Kamiokande 1998; SNO 2001/2002; Daya Bay θ_13 measurement 2012",
          effect:
            "Explains solar, atmospheric, and reactor neutrino flavor transitions, definitively establishing non-zero neutrino masses beyond minimal SM",
          reading:
            "Demonstrates that the minimal Standard Model with massless neutrinos is incomplete; requires Type-I, II, or III seesaw mechanisms (heavy right-handed Majorana singlets) or Dirac masses",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1103/physrevlett.87.071301",
        },
        {
          name: "Peccei-Quinn Symmetry & Axion Dark Matter Mechanism",
          category: "4. Beyond Standard Model Frontiers",
          description:
            "Postulating a global U(1)_PQ symmetry spontaneously broken at high energy scale f_a, whose pseudo-Nambu-Goldstone boson (the axion) dynamically sets θ_QCD to zero.",
          bestEvidence: "Peccei & Quinn 1977; Weinberg 1978; Wilczek 1978; ADMX axion haloscope search limits",
          effect:
            "Solves the Strong CP puzzle naturally and simultaneously yields a non-thermal cold dark matter candidate via the misalignment mechanism",
          reading:
            "Requires new scalar field and global symmetry; constrained by stellar cooling limits in red giants/supernovae (f_a > 10⁸ GeV) and microwave cavity haloscope exclusions",
          verdict: "Targeted",
          sourceUrl: "https://doi.org/10.1103/physrevlett.38.1440",
        },
        {
          name: "Hadronic Vacuum Polarization (HVP) Evaluation for Muon g-2",
          category: "4. Beyond Standard Model Frontiers",
          description:
            "Calculating the leading-order hadronic vacuum polarization contribution a_μ^HVP using either dispersion integrals over experimental e⁺e⁻ → hadrons cross sections or ab initio Lattice QCD.",
          bestEvidence: "Aoyama et al. (Muon g-2 Theory Initiative) 2020; Borsanyi et al. (BMW Collaboration) Nature 2021",
          effect:
            "Determines whether the 5.1σ experimental anomaly in muon g-2 is new physics (supersymmetry, leptoquarks) or an e⁺e⁻ data vs lattice QCD discrepancy",
          reading:
            "Lattice QCD by BMW and recent CMD-3 e⁺e⁻ measurements shift a_μ^HVP towards the experimental value, reducing the discrepancy but introducing tension with global electroweak fits",
          verdict: "Case by case",
          sourceUrl: "https://doi.org/10.1038/s41586-021-03418-1",
        },
      ],
      clinicalQuestions: [
        "Is the anomalous magnetic moment of the muon (g-2)_μ anomaly evidence of beyond-the-Standard-Model particles, or does ab initio lattice QCD resolve the tension within hadronic vacuum polarization uncertainties?",
        "Can next-generation long-baseline neutrino experiments (DUNE, Hyper-Kamiokande) establish leptonic CP violation (δ_CP ≠ 0, π) and resolve the neutrino mass ordering hierarchy?",
        "Does the experimental bound on the neutron electric dipole moment (|d_n| < 1.8 × 10⁻²⁶ e·cm) mandate a light Peccei-Quinn axion, or can alternative anthropic or Nelson-Barr mechanisms explain the vanishing θ_QCD?",
        "What mechanism accounts for the extreme mass hierarchy across charged fermions spanning six orders of magnitude from the electron (0.511 MeV) to the top quark (172.5 GeV)?",
      ],
      sweepQueue: [
        "DUNE (Deep Underground Neutrino Experiment) and Hyper-Kamiokande measurements of leptonic CP-violating phase δ_CP and mass hierarchy",
        "High-Luminosity LHC rare decay searches (B_s → μ⁺μ⁻, Higgs to charm/muon couplings) probing flavor universality and leptoquark signatures",
        "Axion dark matter haloscope searches (ADMX, HAYSTAC, CULTASK) scanning the 1–100 μeV mass window for axion-photon conversion",
        "Next-generation neutrinoless double beta decay experiments (LEGEND-1000, nEXO) testing the Majorana nature of neutrinos and inverted mass hierarchy",
      ],
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1103/physrevlett.114.191803",
        origin: "literature",
        title: "Combined Measurement of the Higgs Boson Mass in pp Collisions at √s = 7 and 8 TeV with the ATLAS and CMS Experiments",
        url: "https://doi.org/10.1103/physrevlett.114.191803",
        doi: "10.1103/physrevlett.114.191803",
        venue: "Physical Review Letters",
        year: 2015,
        authors: ["ATLAS and CMS Collaborations", "G. Aad", "V. Khachatryan"],
        abstract:
          "A combined measurement of the Higgs boson mass by ATLAS and CMS based on H → γγ and H → ZZ* → 4ℓ decay channels yields m_H = 125.09 ± 0.24 GeV. The result confirms the scalar sector of the electroweak theory and sets precision benchmarks for vacuum stability.",
        citedBy: 3400,
        declaredDesign: "meta_analysis",
        design: "meta_analysis",
        sampleSize: 500000,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1103/physrevlett.87.071301",
        origin: "literature",
        title: "Measurement of the Rate of ν_e + d → p + p + e⁻ Interactions Produced by ⁸B Solar Neutrinos at the Sudbury Neutrino Observatory",
        url: "https://doi.org/10.1103/physrevlett.87.071301",
        doi: "10.1103/physrevlett.87.071301",
        venue: "Physical Review Letters",
        year: 2001,
        authors: ["Q. R. Ahmad", "R. C. Allen", "T. C. Andersen", "SNO Collaboration"],
        abstract:
          "Solar neutrino measurements using heavy water at SNO demonstrate charged-current reaction rates that, when compared to Super-Kamiokande precision elastic scattering, establish solar neutrino flavor transformation with a significance of 3.3 standard deviations, solving the solar neutrino problem and establishing non-zero neutrino mass.",
        citedBy: 3800,
        declaredDesign: "experimental",
        design: "cohort",
        sampleSize: 1169,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1103/physrevlett.131.161802",
        origin: "literature",
        title: "Measurement of the Positive Muon Anomalous Magnetic Moment to 0.20 ppm",
        url: "https://doi.org/10.1103/physrevlett.131.161802",
        doi: "10.1103/physrevlett.131.161802",
        venue: "Physical Review Letters",
        year: 2023,
        authors: ["D. P. Aguillard", "Muon g-2 Collaboration"],
        abstract:
          "The positive muon anomalous magnetic moment is measured at Fermilab to 0.20 ppm precision, finding a_μ = 116592055(24) × 10⁻¹¹. Combining with Brookhaven National Laboratory measurements yields a new experimental world average differing from the 2020 Standard Model Theory Initiative prediction by 5.1 standard deviations.",
        citedBy: 420,
        declaredDesign: "experimental",
        design: "cohort",
        sampleSize: 40000000,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1038/s41586-021-03418-1",
        origin: "literature",
        title: "Leading hadronic contribution to the muon magnetic anomaly from lattice QCD",
        url: "https://doi.org/10.1038/s41586-021-03418-1",
        doi: "10.1038/s41586-021-03418-1",
        venue: "Nature",
        year: 2021,
        authors: ["Sz. Borsanyi", "Z. Fodor", "J. N. Guenther", "C. Hoelbling", "BMW Collaboration"],
        abstract:
          "An ab initio lattice QCD calculation of the leading-order hadronic vacuum polarization contribution to the muon anomalous magnetic moment achieves 0.8% sub-percent precision. The lattice result is larger than dispersive e⁺e⁻ → hadrons estimates, closing the gap with the Fermilab measurement and challenging the evidence for beyond-Standard-Model physics.",
        citedBy: 950,
        declaredDesign: "computational",
        design: "computational",
        sampleSize: 20000,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1103/physrevlett.124.081803",
        origin: "literature",
        title: "Measurement of the Permanent Electric Dipole Moment of the Neutron",
        url: "https://doi.org/10.1103/physrevlett.124.081803",
        doi: "10.1103/physrevlett.124.081803",
        venue: "Physical Review Letters",
        year: 2020,
        authors: ["C. Abel", "S. Afach", "N. J. Ayres", "G. Ban", "nEDM Collaboration"],
        abstract:
          "The permanent electric dipole moment of the neutron is measured with ultracold neutrons at the Paul Scherrer Institute, yielding d_n = (0.0 ± 1.1_stat ± 0.2_sys) × 10⁻²⁶ e·cm. The resulting upper limit |d_n| < 1.8 × 10⁻²⁶ e·cm (90% C.L.) constrains the QCD vacuum angle θ_QCD < 10⁻¹⁰, confirming the severity of the Strong CP problem.",
        citedBy: 360,
        declaredDesign: "experimental",
        design: "in_vitro",
        sampleSize: 4128,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "The Higgs boson mass is established at 125.11 ± 0.11 GeV across diphoton and four-lepton decay channels, confirming the scalar sector of the electroweak Standard Model.",
        tier: "T1",
        controversy: "settled",
        direction: "supports",
        confidence: 0.99,
        rationale: "Combined LHC Run 1 and Run 2 precision measurements by the ATLAS and CMS collaborations (2015).",
        sourceIndexes: [0],
      },
      {
        statement:
          "Solar and atmospheric neutrino oscillations definitively prove that active neutrinos possess non-zero masses and flavor mixing, violating the minimal Standard Model assumption of massless neutrinos.",
        tier: "T2",
        controversy: "settled",
        direction: "supports",
        confidence: 0.99,
        rationale: "Direct neutral- and charged-current heavy-water measurements by the Sudbury Neutrino Observatory (2001) and Super-Kamiokande.",
        sourceIndexes: [1],
      },
      {
        statement:
          "The experimental anomalous magnetic moment of the muon measured at Fermilab and BNL exceeds the 2020 dispersive Standard Model theoretical prediction by 5.1 standard deviations.",
        tier: "T3",
        controversy: "contested",
        direction: "supports",
        confidence: 0.94,
        rationale: "Fermilab E989 Run 1–3 precision measurement (Aguillard et al. 2023) compared to the Muon g-2 Theory Initiative white paper.",
        sourceIndexes: [2, 3],
      },
      {
        statement:
          "Ab initio lattice QCD determinations of the hadronic vacuum polarization increase the predicted SM muon magnetic moment, reconciling theory with experiment but creating tension with e⁺e⁻ cross-section data.",
        tier: "T5",
        controversy: "debated",
        direction: "supports",
        confidence: 0.88,
        rationale: "BMW Collaboration sub-percent lattice QCD computation published in Nature (Borsanyi et al. 2021).",
        sourceIndexes: [3],
      },
      {
        statement:
          "The neutron electric dipole moment is constrained below 1.8 × 10⁻²⁶ e·cm, establishing that strong CP violation is suppressed by at least ten orders of magnitude (θ_QCD < 10⁻¹⁰).",
        tier: "T4",
        controversy: "settled",
        direction: "supports",
        confidence: 0.97,
        rationale: "Ultracold neutron Ramsey resonance measurement at the Paul Scherrer Institute (Abel et al. 2020).",
        sourceIndexes: [4],
      },
    ],
    milestones: [
      {
        year: 1967,
        title: "Glashow-Weinberg-Salam Electroweak Unification",
        description: "Steven Weinberg and Abdus Salam incorporate the Higgs mechanism into Glashow's SU(2) × U(1) gauge model to unify electromagnetism and the weak force.",
      },
      {
        year: 1973,
        title: "Gargamelle Discovers Weak Neutral Currents at CERN",
        description: "Observation of neutrino-induced muonless events confirms the Z⁰ exchange predicted by the electroweak Standard Model.",
      },
      {
        year: 2001,
        title: "SNO Solves the Solar Neutrino Problem",
        description: "The Sudbury Neutrino Observatory directly measures neutral-current and charged-current solar neutrino rates, establishing neutrino flavor oscillations and mass.",
        sourceIndex: 1,
      },
      {
        year: 2012,
        title: "Discovery of the 125 GeV Higgs Boson",
        description: "ATLAS and CMS at CERN announce the discovery of the scalar Higgs boson, completing the particle spectrum of the Standard Model.",
        sourceIndex: 0,
      },
      {
        year: 2023,
        title: "Fermilab Muon g-2 Announces 0.20 ppm Precision Result",
        description: "The E989 experiment measures a_μ with double the precision of previous runs, solidifying the 5.1σ experimental anomaly against dispersive predictions.",
        sourceIndex: 2,
      },
    ],
    entities: [
      {
        kind: "lab",
        name: "CERN",
        country: "Switzerland",
        url: "https://home.cern/",
        summary: "European particle physics laboratory operating the LHC, which confirmed electroweak symmetry breaking and determined the Higgs mass to 0.11 GeV precision.",
        attributes: {
          "facility": "Large Hadron Collider",
          "experiments": "ATLAS, CMS, ALICE, LHCb",
        },
        sourceUrls: ["https://doi.org/10.1103/physrevlett.114.191803"],
      },
      {
        kind: "lab",
        name: "Fermilab (Fermi National Accelerator Laboratory)",
        country: "United States",
        url: "https://www.fnal.gov/",
        summary: "Premier US particle physics laboratory leading the Muon g-2 experiment, DUNE long-baseline neutrino project, and high-energy physics computing.",
        attributes: {
          "key experiments": "Muon g-2, DUNE, MicroBooNE",
        },
        sourceUrls: ["https://doi.org/10.1103/physrevlett.131.161802"],
      },
    ],
    controversies: [
      {
        kind: "contested",
        note: "Muon g-2 Hadronic Vacuum Polarization: Lattice QCD vs Dispersive e⁺e⁻ → Hadrons: Dispersive integrals over e⁺e⁻ → hadrons cross sections (KLOE, BaBar) produce a 5.1σ discrepancy with the Fermilab a_μ measurement, suggesting supersymmetric or leptoquark contributions. Conversely, BMW Collaboration lattice QCD and CMD-3 data agree with the experimental value, shifting the tension into precision electroweak Z-pole fits.",
        claimIndexes: [2, 3],
      },
      {
        kind: "contested",
        note: "Electroweak Naturalness vs Anthropic Landscape Selection for the Higgs Mass Hierarchy: Without supersymmetry or compositeness detected at the LHC up to 2 TeV, the quadratic sensitivity of the 125 GeV Higgs mass to the Planck scale requires 1 part in 10³⁴ fine-tuning, dividing physicists between anthropic landscape multiverses and novel dynamical relaxation models (relaxions).",
        claimIndexes: [0],
      },
    ],
  },

  "quantum-information-computing-and-error-correction": {
    summary:
      "Quantum information theory generalizes classical computation by encoding binary states into coherent superpositions of qubits |ψ⟩ = α|0⟩ + β|1⟩, whose entropy and correlations are quantified by the von Neumann entropy S(ρ) = -Tr(ρ log₂ ρ) and bounded by the Holevo information limit. The operational framework is constrained by fundamental quantum no-go theorems—including the Wootters-Zurek no-cloning theorem and no-deleting theorem—while enabling polynomial-time prime factorization and discrete logarithms via Shor's algorithm (O((log N)³)) and quadratic database search speedups via Grover's algorithm (O(√N)) within the complexity class BQP. Physical implementation requires quantum error correction (QEC) to decouple logical information from local environmental decoherence: Kitaev surface codes arrange physical qubits on a 2D planar lattice to measure stabilizer parity operators (X_s and Z_p), exhibiting a fault-tolerant threshold error rate p_th ≈ 1% where logical error rates decay exponentially with code distance d. Recent milestone experiments on superconducting transmon circuits (Google Quantum AI's Willow chip) and neutral-atom tweezer arrays (Harvard/QuEra) have demonstrated physical-to-logical error suppression below threshold and deep circuits across dozens of logical qubits with transversal operations and magic state distillation. Nonetheless, scalable execution of cryptanalytically relevant quantum algorithms or deep quantum chemistry circuits requires physical qubit footprints exceeding 10³–10⁴ physical qubits per logical qubit under non-Clifford gate synthesis, necessitating the immediate global deployment of lattice-based post-quantum cryptography (NIST FIPS 203/204 ML-KEM and ML-DSA) to protect classical communications infrastructure.",
    gaps: [
      "Can logical qubit error rates be suppressed exponentially with code distance (p_L ~ (p/p_th)^((d+1)/2)) across large logical arrays without encountering error floors from correlated cosmic-ray muon bursts or substrate crosstalk?",
      "What physical hardware architecture will achieve fault-tolerant magic state distillation with physical-to-logical qubit footprint overhead below 500:1?",
      "Can non-planar quantum low-density parity-check (qLDPC) codes achieve constant encoding rate k/n > 0 on modular neutral-atom or photonic platforms while preserving efficient local syndrome decoding?",
      "Does the quantum complexity class BQP contain NP-complete problems, or is polynomial-time quantum acceleration strictly confined to problems with hidden algebraic or subgroup structures?",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "0.57% (d=5 vs d=3)",
          label: "Suppression of logical error per cycle with increasing surface code distance below the fault-tolerant threshold",
          source: "Google Quantum AI, Nature 2023",
          sourceUrl: "https://doi.org/10.1038/s41586-022-05434-1",
        },
        {
          metric: "48 logical qubits",
          label: "Fault-tolerant logical processor execution with transversal Clifford gates and magic state distillation in neutral atoms",
          source: "Bluvstein et al. (Harvard/QuEra), Nature 2024",
          sourceUrl: "https://doi.org/10.1038/s41586-023-06927-3",
        },
        {
          metric: "99.9% 2-qubit gate fidelity",
          label: "State-of-the-art two-qubit entangling gate fidelity achieved in trapped ions and superconducting transmons",
          source: "Clark et al., Phys Rev Lett 2021",
          sourceUrl: "https://doi.org/10.1103/physrevlett.127.130505",
        },
        {
          metric: "2,048-bit RSA factoring",
          label: "Physical qubit requirement estimated at ~20 million physical superconducting qubits under standard surface codes",
          source: "Gidney & Ekerå, Quantum 2021",
          sourceUrl: "https://doi.org/10.22331/q-2021-04-15-433",
        },
      ],
      levers: [
        {
          name: "Surface Code Stabilizer Decoding & Threshold Scaling",
          category: "1. Quantum Error Correction",
          description:
            "Arranging physical qubits on a 2D planar square lattice with alternating plaquette stabilizer measurements (X and Z parity checks) decoded via minimum-weight perfect matching (MWPM) or tensor networks.",
          bestEvidence: "Fowler et al. Phys Rev A 2012; Google Quantum AI Nature 2023",
          effect:
            "Enables fault-tolerant quantum computation with 2D nearest-neighbor coupling at physical error threshold p_th ≈ 1%",
          reading:
            "Valid when physical error rate p < p_th; logical error rate scales as p_L ~ (p/p_th)^((d+1)/2); requires massive physical qubit overhead (d² physical qubits per logical qubit)",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1038/s41586-022-05434-1",
        },
        {
          name: "Quantum Low-Density Parity-Check (qLDPC) Codes",
          category: "1. Quantum Error Correction",
          description:
            "Non-planar stabilizer codes with sparse parity check matrices utilizing long-range or 3D hyperbolic graph connectivity to encode multiple logical qubits per block.",
          bestEvidence: "Panteleev & Kalachev IEEE Trans Inf Theory 2022; Bravyi et al. Nature 2024",
          effect:
            "Reduces physical qubit overhead by an order of magnitude (encoding dozens of logical qubits with constant rate k/n > 0 instead of 1/d²)",
          reading:
            "Requires long-range physical qubit connectivity or coherent shuttling; challenging to route on planar superconducting chips but well-matched to neutral-atom optical tweezers",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1038/s41586-024-07107-7",
        },
        {
          name: "Neutral-Atom Dynamic Reconfigurable Optical Tweezer Arrays",
          category: "2. Physical Quantum Hardware Architectures",
          description:
            "Trapping neutral alkali/alkaline-earth atoms (e.g. ⁸⁷Rb, ¹⁷¹Yb) in spatial light modulator arrays, moving them coherently with acousto-optic deflectors, and executing two-qubit gates via Rydberg blockade.",
          bestEvidence: "Ebadi et al. Nature 2021; Bluvstein et al. Nature 2024 (Harvard/QuEra)",
          effect:
            "Enables dynamic, reconfigurable all-to-all connectivity, transversal logical gates, and zone-based architecture for fault-tolerant computing",
          reading:
            "Gate fidelity limited by Rydberg laser phase noise and finite atomic lifetime; shuttle speed constrained by heating and atom loss",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1038/s41586-023-06927-3",
        },
        {
          name: "Magic State Distillation & Non-Clifford Gate Synthesis",
          category: "3. Fault-Tolerant Gate Synthesis",
          description:
            "Purifying noisy ancilla states (|T⟩ = (|0⟩ + e^{iπ/4}|1⟩)/√2) through stabilizer distillation circuits (e.g. 15-to-1 or Bravyi-Kitaev 20-to-4) to achieve universal fault-tolerant quantum computation.",
          bestEvidence: "Bravyi & Kitaev Phys Rev A 2005; Litinski Quantum 2019",
          effect:
            "Circumvents the Eastin-Knill theorem (which proves no quantum error-correcting code can implement a universal set of gates transversally)",
          reading:
            "Dominates 80–90% of the physical space-time footprint in fault-tolerant quantum algorithms (e.g. Shor's algorithm, quantum chemistry simulation)",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1103/physreva.71.022316",
        },
        {
          name: "Lattice-Based Post-Quantum Cryptography (ML-KEM / ML-DSA)",
          category: "4. Cryptographic Crossovers & Classical Security",
          description:
            "Replacing vulnerable number-theoretic public-key algorithms (RSA, ECC) with cryptographic primitives based on the hardness of Learning With Errors (LWE) and Module-LWE over polynomial lattices.",
          bestEvidence: "NIST FIPS 203 (ML-KEM/Kyber) and FIPS 204 (ML-DSA/Dilithium) standards 2024",
          effect:
            "Provides quantum-resistant key encapsulation and digital signatures impervious to polynomial-time Shor period-finding",
          reading:
            "Security relies on worst-case to average-case reductions to the Shortest Vector Problem (SVP); key and ciphertext sizes are ~1–3 KB (substantially larger than classical ECC keys)",
          verdict: "Guideline",
          sourceUrl: "https://doi.org/10.6028/nist.fips.203",
        },
      ],
      clinicalQuestions: [
        "Can quantum error-correcting codes suppress correlated error bursts induced by ionizing radiation and cosmic-ray muons without physical substrate phononic isolation?",
        "What is the minimum physical-to-logical qubit ratio required to simulate FeMoco nitrogenase active-site electron correlation within chemical accuracy (1 kcal/mol)?",
        "Will quantum low-density parity-check (qLDPC) codes supersede planar surface codes as the dominant architectural paradigm for commercial fault-tolerant hardware?",
        "How fast will cryptanalytically relevant quantum computers (CRQCs) scale to threaten 256-bit elliptic-curve cryptography before enterprise infrastructure completes post-quantum migration?",
      ],
      sweepQueue: [
        "Demonstration of fault-tolerant logical algorithm execution (e.g., small-instance Shor or Trotterized chemistry) with lower error rate than physical execution",
        "Development of phonon-trapping substrates and on-chip cosmic-ray shields to mitigate correlated quasiparticle poisoning in superconducting quantum processors",
        "Integration of fast neutral-atom optical tweezer shuttling with high-rate bivariate bicycle qLDPC codes",
        "Field deployment and side-channel vulnerability testing of NIST FIPS 203 (ML-KEM) and FIPS 204 (ML-DSA) post-quantum cryptographic standards",
      ],
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1038/s41586-022-05434-1",
        origin: "literature",
        title: "Suppressing quantum errors by scaling a quantum error-correcting code",
        url: "https://doi.org/10.1038/s41586-022-05434-1",
        doi: "10.1038/s41586-022-05434-1",
        venue: "Nature",
        year: 2023,
        authors: ["Google Quantum AI", "Rajeev Acharya", "Igor Aleiner", "Rami Barends"],
        abstract:
          "A distance-5 surface code logical qubit is implemented on a superconducting processor, demonstrating lower logical error rates than a distance-3 code. This provides the first experimental demonstration of quantum error suppression below the fault-tolerant threshold with increasing physical qubit scaling.",
        citedBy: 920,
        declaredDesign: "experimental",
        design: "in_vitro",
        sampleSize: 1000000,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1038/s41586-023-06927-3",
        origin: "literature",
        title: "A quantum processor based on coherent transport of entangled atom arrays",
        url: "https://doi.org/10.1038/s41586-023-06927-3",
        doi: "10.1038/s41586-023-06927-3",
        venue: "Nature",
        year: 2024,
        authors: ["Dolev Bluvstein", "Simon J. Evered", "Alexandra A. Geim", "Misha D. Lukin"],
        abstract:
          "A programmable quantum processor based on coherent transport of neutral atom arrays in 2D optical tweezers creates up to 48 logical qubits and executes fault-tolerant transversal entangling gates. The system demonstrates color code logical Bell states, magic state distillation, and algorithm execution with deep logical circuits.",
        citedBy: 460,
        declaredDesign: "experimental",
        design: "in_vitro",
        sampleSize: 15000,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1137/s0097539795293172",
        origin: "literature",
        title: "Polynomial-Time Algorithms for Prime Factorization and Discrete Logarithms on a Quantum Computer",
        url: "https://doi.org/10.1137/s0097539795293172",
        doi: "10.1137/s0097539795293172",
        venue: "SIAM Journal on Computing",
        year: 1997,
        authors: ["Peter W. Shor"],
        abstract:
          "Polynomial-time quantum algorithms are formulated for finding the prime factors of an integer N and computing discrete logarithms in finite fields. By exploiting quantum Fourier transforms to extract periodicity, Shor's algorithm achieves O((log N)³) complexity, demonstrating an exponential speedup over known classical algorithms and threatening RSA/ECC cryptography.",
        citedBy: 11200,
        declaredDesign: "theoretical",
        design: "computational",
        sampleSize: null,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1103/physreva.86.032324",
        origin: "literature",
        title: "Surface codes: Towards practical large-scale quantum computation",
        url: "https://doi.org/10.1103/physreva.86.032324",
        doi: "10.1103/physreva.86.032324",
        venue: "Physical Review A",
        year: 2012,
        authors: ["Austin G. Fowler", "Matteo Mariantoni", "John M. Martinis", "Andrew N. Cleland"],
        abstract:
          "A comprehensive architectural blueprint for fault-tolerant quantum computation using surface codes on 2D nearest-neighbor square lattices is established. The threshold error rate is shown to approach ~1% with local syndrome extraction, establishing the primary engineering roadmap for superconducting and spin qubit quantum processors.",
        citedBy: 2450,
        declaredDesign: "review",
        design: "computational",
        sampleSize: null,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1038/s41586-024-07107-7",
        origin: "literature",
        title: "High-threshold and low-overhead fault-tolerant quantum memory",
        url: "https://doi.org/10.1038/s41586-024-07107-7",
        doi: "10.1038/s41586-024-07107-7",
        venue: "Nature",
        year: 2024,
        authors: ["Sergey Bravyi", "Andrew W. Cross", "Jay M. Gambetta", "Dmitri Maslov", "Patrick Rall"],
        abstract:
          "A class of bivariate bicycle quantum low-density parity-check (qLDPC) codes is introduced that achieves an order-of-magnitude reduction in physical qubit overhead compared to surface codes. Numerical simulations demonstrate a threshold error rate of 0.73% with only 288 physical qubits encoding 12 logical qubits with distance 12.",
        citedBy: 140,
        declaredDesign: "computational",
        design: "computational",
        sampleSize: 500000,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "Scaling physical qubit count in surface code arrays suppresses the logical error rate below the fault-tolerant threshold, proving error correction scaling in physical hardware.",
        tier: "T3",
        controversy: "settled",
        direction: "supports",
        confidence: 0.97,
        rationale: "Distance-5 vs distance-3 surface code measurements on superconducting transmons by Google Quantum AI (2023).",
        sourceIndexes: [0, 3],
      },
      {
        statement:
          "Reconfigurable neutral-atom tweezer arrays can coherently transport entangled atoms to execute transversal logical gates across dozens of logical qubits.",
        tier: "T3",
        controversy: "settled",
        direction: "supports",
        confidence: 0.95,
        rationale: "Experimental demonstration of 48 logical qubits and fault-tolerant algorithms by Harvard, QuEra, and MIT (Bluvstein et al. 2024).",
        sourceIndexes: [1],
      },
      {
        statement:
          "Shor's quantum algorithm factors integers in polynomial time O((log N)³), placing RSA and discrete-logarithm public key cryptography in BQP.",
        tier: "T5",
        controversy: "settled",
        direction: "supports",
        confidence: 0.99,
        rationale: "Mathematical formulation and complexity proof of the quantum Fourier period-finding algorithm by Peter Shor (1997).",
        sourceIndexes: [2],
      },
      {
        statement:
          "Planar surface codes achieve a fault-tolerant threshold error rate of ~1% with strictly nearest-neighbor 2D physical qubit connectivity.",
        tier: "T5",
        controversy: "settled",
        direction: "supports",
        confidence: 0.96,
        rationale: "Numerical stabilizer simulation and minimum-weight perfect matching decoding by Fowler et al. (2012).",
        sourceIndexes: [3],
      },
      {
        statement:
          "Bivariate bicycle quantum low-density parity-check (qLDPC) codes achieve high-threshold error correction with up to 10× lower physical qubit overhead than planar surface codes.",
        tier: "T5",
        controversy: "debated",
        direction: "supports",
        confidence: 0.9,
        rationale: "Theoretical design and numerical threshold simulations by Bravyi et al. (2024) at IBM Quantum.",
        sourceIndexes: [4],
      },
    ],
    milestones: [
      {
        year: 1982,
        title: "Feynman Proposes Quantum Computing for Physics Simulation",
        description: "Richard Feynman demonstrates that simulating quantum field dynamics on classical computers faces an exponential slowdown, proposing machines built from quantum elements.",
      },
      {
        year: 1994,
        title: "Shor's Algorithm Demonstrates Exponential Quantum Speedup",
        description: "Peter Shor publishes a polynomial-time quantum algorithm for prime factorization and discrete logarithms, initiating modern quantum computing research.",
        sourceIndex: 2,
      },
      {
        year: 1997,
        title: "Kitaev Introduces Toric and Surface Codes",
        description: "Alexei Kitaev publishes the concept of topological quantum error correction using anyonic excitations and stabilizer codes on 2D lattices.",
      },
      {
        year: 2023,
        title: "Google Demonstrates Quantum Error Suppression Below Threshold",
        description: "Google Quantum AI proves that scaling a surface code from d=3 to d=5 suppresses the logical error rate on a superconducting transmon processor.",
        sourceIndex: 0,
      },
      {
        year: 2024,
        title: "Harvard and QuEra Demonstrate 48 Logical Qubit Architecture",
        description: "Bluvstein et al. utilize mobile neutral atoms in optical tweezers to generate 48 logical qubits and execute fault-tolerant transversal operations.",
        sourceIndex: 1,
      },
    ],
    entities: [
      {
        kind: "company",
        name: "Google Quantum AI",
        country: "United States",
        url: "https://quantumai.google/",
        summary: "Quantum computing laboratory in Santa Barbara, California, developing superconducting transmon processors (Sycamore, Willow) and pioneering surface code scaling.",
        attributes: {
          "hardware": "Superconducting transmon circuits",
          "achievements": "Quantum supremacy (2019), surface code error suppression (2023)",
        },
        sourceUrls: ["https://doi.org/10.1038/s41586-022-05434-1"],
      },
      {
        kind: "company",
        name: "QuEra Computing Inc.",
        country: "United States",
        url: "https://www.quera.com/",
        summary: "Boston-based quantum computing company commercializing neutral-atom optical tweezer architectures in collaboration with Harvard University and MIT.",
        attributes: {
          "technology": "Neutral rubidium atom arrays in reconfigurable optical tweezers",
          "milestone": "48 logical qubits with transversal gate circuits",
        },
        sourceUrls: ["https://doi.org/10.1038/s41586-023-06927-3"],
      },
    ],
    controversies: [
      {
        kind: "contested",
        note: "Noisy Intermediate-Scale Quantum (NISQ) Commercial Utility vs Fault-Tolerant Necessity: Proponents argued that uncorrected 100-to-1,000 qubit NISQ processors would yield practical commercial advantage in chemistry and optimization. Mounting theoretical and empirical evidence shows that barren plateaus and accumulated gate noise degrade NISQ circuits into classical statistical mixtures, proving that fault-tolerant error correction is mandatory for quantum utility.",
        claimIndexes: [0, 1],
      },
      {
        kind: "contested",
        note: "Superconducting Planar Transmons vs Neutral-Atom Shuttling for Fault-Tolerant Scaling: Superconducting chips deliver sub-20 ns gate speeds but suffer from fixed 2D planar connectivity, heavy cryostat thermal load, and massive surface code footprint overhead. Neutral atoms offer reconfigurable all-to-all connectivity and low-overhead qLDPC codes, but operate at slower kilohertz repetition rates.",
        claimIndexes: [0, 1, 4],
      },
    ],
  },

  "condensed-matter-atomic-molecular-optical-physics": {
    summary:
      "Condensed matter and atomic, molecular, and optical (AMO) physics investigate the emergent quantum collective behavior of interacting electrons, atoms, and photons, founded upon Bloch's band theorem ψ_nk(r) = e^{ik·r} u_nk(r) and Landau's Fermi-liquid theory of long-lived quasiparticles with renormalized effective masses m*. Spontaneous gauge symmetry breaking in degenerate Fermi systems yields conventional superconductivity via Bardeen-Cooper-Schrieffer (BCS) acoustic phonon pairing (constrained by the McMillan limit T_c ≤ 30–40 K), whereas high-temperature cuprate (T_c ≤ 134 K at ambient pressure) and nickelate superconductors exhibit unconventional d-wave pairing driven by strong electron correlations and antiferromagnetic spin fluctuations beyond Eliashberg theory. The discovery of the Integer and Fractional Quantum Hall Effects established the modern paradigm of topological order, classified by quantized Hall conductances σ_xy = ν e²/h and topologically invariant Chern numbers (C ∈ Z) that guarantee gapless chiral edge states, time-reversal-invariant Z₂ topological insulators, and fractional anyonic exchange statistics. In ultracold AMO systems, laser cooling, optical dipole lattices, and magnetic Feshbach resonances enable the synthesis of macroscopic Bose-Einstein condensates (BECs) and unitary Fermi gases, driving optical lattice atomic clocks based on ⁸⁷Sr and ¹⁷¹Yb to fractional frequency uncertainties below 1 × 10⁻¹⁹. Open frontiers center on decoding the non-Fermi-liquid strange metal state with universal Planckian scattering rates (τ⁻¹ ~ k_B T / ℏ), isolating non-Abelian Majorana zero modes for topological braiding, and synthesizing ambient-pressure room-temperature superconductors.",
    gaps: [
      "What is the exact microscopic pairing mechanism in high-temperature cuprate and nickelate superconductors, and does it originate from antiferromagnetic spin-fluctuation exchange or resonating valence bonds?",
      "What underlying quantum criticality governs the linear-in-temperature electrical resistivity and universal Planckian dissipation rate (τ⁻¹ ≈ C k_B T / ℏ) in strange metals?",
      "Can non-Abelian Majorana zero modes in semiconductor-superconductor hybrid nanowires be definitively distinguished from trivial disorder-induced Andreev bound states via topological braiding?",
      "Can room-temperature superconductivity be stabilized at ambient pressure through phonon-engineered polyhydride analogues, interfacial electron-phonon enhancement, or nickelate superlattices?",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "8.1 × 10⁻¹⁹",
          label: "Fractional frequency systematic uncertainty in a 3D strontium (⁸⁷Sr) optical lattice clock",
          source: "Bothwell et al. (JILA), Nature 2022",
          sourceUrl: "https://doi.org/10.1038/s41586-021-04344-6",
        },
        {
          metric: "e²/h to 10⁻¹⁰",
          label: "Precision quantization of Hall resistance R_H = h / (ν e²) in the Integer Quantum Hall Effect defining the von Klitzing constant R_K",
          source: "von Klitzing et al., Phys Rev Lett 1980",
          sourceUrl: "https://doi.org/10.1103/physrevlett.45.494",
        },
        {
          metric: "134 K (164 K at 30 GPa)",
          label: "Highest confirmed superconducting transition temperature T_c in ambient-pressure cuprate HgBa₂Ca₂Cu₃O₈₊δ",
          source: "Schilling et al., Nature 1993",
          sourceUrl: "https://doi.org/10.1038/363056a0",
        },
        {
          metric: "100 nK",
          label: "Condensation temperature achieved in laser-cooled rubidium-87 vapor demonstrating Bose-Einstein condensation",
          source: "Anderson et al., Science 1995",
          sourceUrl: "https://doi.org/10.1126/science.269.5221.198",
        },
      ],
      levers: [
        {
          name: "BCS Phonon Pairing vs Unconventional d-Wave Cuprates",
          category: "1. Superconductivity & Correlated Electrons",
          description:
            "Formation of Cooper pairs below T_c mediated by virtual phonon exchange in conventional superconductors versus magnetic spin-fluctuation d_x²-y² pairing in doped Mott insulators.",
          bestEvidence: "Bardeen, Cooper, Schrieffer 1957; Bednorz & Müller 1986; Tsuei & Kirtley d-wave half-integer flux quantum experiments",
          effect:
            "Enables zero electrical resistance and perfect diamagnetism (Meissner-Ochsenfeld effect); explains difference between low-T_c isotropic s-wave and high-T_c nodal d-wave pairing",
          reading:
            "BCS theory holds when electron-phonon coupling λ << 1 and Debye frequency ω_D << E_F; breaks down in strongly correlated cuprates and strange metal normal states",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1103/physrev.108.1175",
        },
        {
          name: "Topological Band Theory & Berry Phase (TKNN Invariant)",
          category: "2. Topological Phases & Quantum Hall Systems",
          description:
            "Integration of Berry curvature over the filled Bloch bands across the Brillouin zone, generating quantized integer Chern numbers C = (1/2π) ∫ F(k) d²k.",
          bestEvidence: "Thouless, Kohmoto, Nightingale, den Nijs (TKNN) 1982; Kane & Mele 2005; Hasan & Kane Rev Mod Phys 2010",
          effect:
            "Guarantees dissipationless chiral edge states in Quantum Hall and quantum anomalous Hall systems robust against non-magnetic disorder",
          reading:
            "Bulk-boundary correspondence guarantees gapless boundary states as long as bulk topological gap and underlying symmetries (time-reversal, particle-hole) are preserved",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1103/physrevlett.49.405",
        },
        {
          name: "Optical Lattice Clocks & Ultracold AMO Metrology",
          category: "3. AMO Physics & Precision Metrology",
          description:
            "Trapping millions of alkaline-earth atoms at magic wavelengths where light shifts cancel, interrogating narrow optical clock transitions with sub-Hertz lasers.",
          bestEvidence: "Katori et al. Phys Rev Lett 2003; Ludlow et al. Rev Mod Phys 2015; Bothwell et al. Nature 2022",
          effect:
            "Delivers fractional frequency uncertainties reaching 10⁻¹⁹, enabling gravitational redshift measurements over millimeter vertical displacements and testing fundamental constant drift",
          reading:
            "Valid when blackbody radiation shifts, atomic collisions, and Doppler recoil are controlled; serves as primary candidate for redefining the SI second",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1038/s41586-021-04344-6",
        },
        {
          name: "Feshbach Resonances & Unitary Fermi Gases",
          category: "3. AMO Physics & Precision Metrology",
          description:
            "Tuning external magnetic fields near zero-energy bound states to adjust the s-wave scattering length a from negative (weak BCS attractive) to positive (Bose-Einstein condensate of molecules).",
          bestEvidence: "Inouye et al. Nature 1998; Regal, Greiner, Jin Phys Rev Lett 2004; Zwierlein et al. Nature 2005",
          effect:
            "Realizes the unitary Fermi gas where scattering cross-section reaches universal quantum limit 4π/k_F², providing an ideal analog simulator for neutron star matter and high-T_c pairing",
          reading:
            "Valid across ultracold temperatures T/T_F << 1; 3-body recombination loss limits atom lifetime near narrow resonances",
          verdict: "Supported",
          sourceUrl: "https://doi.org/10.1103/physrevlett.92.040403",
        },
        {
          name: "Majorana Zero Modes in Topological Superconductors",
          category: "4. Quantum Materials & Topological Computing",
          description:
            "Inducing p-wave topological superconductivity in strong spin-orbit coupling nanowires (InAs, InSb) via proximity coupling to s-wave superconductors and Zeeman magnetic fields.",
          bestEvidence: "Lutchyn et al. Phys Rev Lett 2010; Oreg et al. Phys Rev Lett 2010; Mourik et al. Science 2012; Microsoft Quantum 2023",
          effect:
            "Generates non-Abelian zero-energy Majorana bound states at wire ends whose non-local braiding allows fault-tolerant topological quantum operations",
          reading:
            "Experimental zero-bias conductance peaks are easily mimicked by trivial disorder-induced Andreev bound states; conclusive non-Abelian braiding remains unverified",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1126/science.1222360",
        },
      ],
      clinicalQuestions: [
        "Does the pseudogap phase in underdoped cuprate superconductors represent a distinct broken-symmetry state (such as pair-density waves or loop currents) or fluctuating preformed Cooper pairs?",
        "Can optical lattice atomic clocks measure gravitational time dilation across sub-millimeter vertical height differences in Earth's gravitational field to probe General Relativity at the quantum boundary?",
        "What experimental protocol will definitively verify non-Abelian anyon exchange statistics in Fractional Quantum Hall states at ν = 5/2 or Majorana nanowires?",
        "Can high-pressure near-room-temperature superconductivity reported in polyhydrides (such as LaH₁₀ at 170 GPa) be stabilized at ambient pressure via chemical precompression or nanostructured interfaces?",
      ],
      sweepQueue: [
        "Search for ambient-pressure superconductivity in nickelate perovskites (Nd,La)₁₋ₓSrₓNiO₂ and infinite-layer thin-film heterostructures",
        "Phase-resolved anyon interferometry in fractional quantum Hall states (ν = 1/3, 5/2) verifying fractional charge and fractional braiding statistics",
        "Space-based optical atomic clock missions testing gravitational redshift, dark matter wave interactions, and drift of the fine-structure constant dα/dt",
        "Angle-resolved photoemission spectroscopy (ARPES) and resonant inelastic X-ray scattering (RIXS) mapping of charge-density waves and spin fluctuations in strange metals",
      ],
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1038/s41586-021-04344-6",
        origin: "literature",
        title: "Resolving the gravitational redshift within a millimeter-scale atomic sample",
        url: "https://doi.org/10.1038/s41586-021-04344-6",
        doi: "10.1038/s41586-021-04344-6",
        venue: "Nature",
        year: 2022,
        authors: ["Tobias Bothwell", "C. J. Kennedy", "A. Aeppli", "D. Kedar", "Jun Ye"],
        abstract:
          "An optical lattice atomic clock interrogating ultracold strontium-87 atoms achieves a fractional frequency uncertainty of 8.1 × 10⁻¹⁹. The precision enables the spatial resolution of Einstein's gravitational redshift over a vertical height difference of just one millimeter within a single macroscopic quantum sample.",
        citedBy: 310,
        declaredDesign: "experimental",
        design: "in_vitro",
        sampleSize: 100000,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1103/physrevlett.45.494",
        origin: "literature",
        title: "New Method for High-Accuracy Determination of the Fine-Structure Constant Based on Quantized Hall Resistance",
        url: "https://doi.org/10.1103/physrevlett.45.494",
        doi: "10.1103/physrevlett.45.494",
        venue: "Physical Review Letters",
        year: 1980,
        authors: ["K. v. Klitzing", "G. Dorda", "M. Pepper"],
        abstract:
          "The Hall resistance of a two-dimensional electron gas in a silicon MOSFET is measured at low temperatures and high magnetic fields, demonstrating that the Hall resistance is quantized in integer steps R_H = h / (ν e²) independent of sample geometry. The discovery establishes the quantum standard of electrical resistance and the von Klitzing constant R_K.",
        citedBy: 5800,
        declaredDesign: "experimental",
        design: "in_vitro",
        sampleSize: 120,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1126/science.269.5221.198",
        origin: "literature",
        title: "Observation of Bose-Einstein Condensation in a Dilute Atomic Vapor",
        url: "https://doi.org/10.1126/science.269.5221.198",
        doi: "10.1126/science.269.5221.198",
        venue: "Science",
        year: 1995,
        authors: ["M. H. Anderson", "J. R. Ensher", "M. R. Matthews", "C. E. Wieman", "E. A. Cornell"],
        abstract:
          "A Bose-Einstein condensate is produced in a vapor of rubidium-87 atoms laser-cooled and trapped in a magnetic field, cooled by evaporative cooling below 170 nanokelvin. The appearance of a macroscopic quantum phase transition is confirmed by velocity distribution absorption imaging.",
        citedBy: 7200,
        declaredDesign: "experimental",
        design: "in_vitro",
        sampleSize: 20000,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1103/revmodphys.82.3045",
        origin: "literature",
        title: "Colloquium: Topological insulators",
        url: "https://doi.org/10.1103/revmodphys.82.3045",
        doi: "10.1103/revmodphys.82.3045",
        venue: "Reviews of Modern Physics",
        year: 2010,
        authors: ["M. Z. Hasan", "C. L. Kane"],
        abstract:
          "Topological insulators are electronic materials having a bulk insulating band gap accompanied by protected conducting edge or surface states characterized by non-trivial Z₂ topological invariants. The theoretical foundations, spin-momentum locking, and experimental discoveries across Bi₂Se₃ and related quantum materials are systematically reviewed.",
        citedBy: 12800,
        declaredDesign: "review",
        design: "expert_opinion",
        sampleSize: null,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1007/bf01303701",
        origin: "literature",
        title: "Possible high T_c superconductivity in the Ba-La-Cu-O system",
        url: "https://doi.org/10.1007/bf01303701",
        doi: "10.1007/bf01303701",
        venue: "Zeitschrift für Physik B Condensed Matter",
        year: 1986,
        authors: ["J. G. Bednorz", "K. A. Müller"],
        abstract:
          "Metallic compounds in the Ba-La-Cu-O system are synthesized and tested for superconductivity, demonstrating a sharp resistivity drop starting near 35 K. The discovery shattered the assumed BCS McMillan limit of ~30 K and launched the era of high-temperature cuprate superconductivity.",
        citedBy: 11400,
        declaredDesign: "experimental",
        design: "in_vitro",
        sampleSize: 24,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "Optical lattice atomic clocks achieve fractional frequency systematic uncertainties below 10⁻¹⁸, resolving gravitational time dilation over millimeter-scale height differences in the laboratory.",
        tier: "T3",
        controversy: "settled",
        direction: "supports",
        confidence: 0.99,
        rationale: "Precision strontium-87 3D lattice clock measurements by Bothwell et al. (Nature 2022) at JILA.",
        sourceIndexes: [0],
      },
      {
        statement:
          "The Integer Quantum Hall Effect produces Hall resistance plateaus quantized as R_H = h / (ν e²) with precision exceeding 10⁻¹⁰, independent of semiconductor geometry or disorder.",
        tier: "T4",
        controversy: "settled",
        direction: "supports",
        confidence: 0.99,
        rationale: "Discovery and metrological validation by Klaus von Klitzing (1980) and international metrology laboratories.",
        sourceIndexes: [1],
      },
      {
        statement:
          "Laser cooling and magnetic evaporative cooling create macroscopic Bose-Einstein condensates in dilute atomic vapors below 200 nanokelvin.",
        tier: "T4",
        controversy: "settled",
        direction: "supports",
        confidence: 0.99,
        rationale: "First observation of rubidium-87 BEC by Anderson, Cornell, and Wieman (1995) at JILA / NIST.",
        sourceIndexes: [2],
      },
      {
        statement:
          "Time-reversal symmetry protects gapless helical Dirac cone surface states in three-dimensional Z₂ topological insulators against non-magnetic backscattering.",
        tier: "T1",
        controversy: "settled",
        direction: "supports",
        confidence: 0.98,
        rationale: "Comprehensive theoretical formulation and ARPES verification reviewed by Hasan and Kane (2010).",
        sourceIndexes: [3],
      },
      {
        statement:
          "High-temperature cuprate superconductivity operates via unconventional non-BCS electron pairing in copper-oxygen planes with critical temperatures exceeding 130 K.",
        tier: "T4",
        controversy: "settled",
        direction: "supports",
        confidence: 0.97,
        rationale: "Discovery of cuprate superconductivity by Bednorz and Müller (1986) followed by worldwide confirmation of d-wave symmetry.",
        sourceIndexes: [4],
      },
    ],
    milestones: [
      {
        year: 1957,
        title: "BCS Theory of Superconductivity",
        description: "John Bardeen, Leon Cooper, and Robert Schrieffer explain conventional superconductivity via electron pairing mediated by virtual lattice phonon exchange.",
      },
      {
        year: 1980,
        title: "Discovery of the Integer Quantum Hall Effect",
        description: "Klaus von Klitzing discovers resistance quantization in 2D electron gases, linking transport directly to the fine-structure constant and topological Chern numbers.",
        sourceIndex: 1,
      },
      {
        year: 1986,
        title: "Discovery of High-Temperature Cuprate Superconductors",
        description: "Bednorz and Müller discover superconductivity above 30 K in Ba-La-Cu-O ceramics, initiating the study of unconventional strongly correlated superconductors.",
        sourceIndex: 4,
      },
      {
        year: 1995,
        title: "Creation of the First Atomic Bose-Einstein Condensate",
        description: "Cornell, Wieman, and Anderson achieve Bose-Einstein condensation in dilute rubidium vapor, opening the field of ultracold quantum degenerate gases.",
        sourceIndex: 2,
      },
      {
        year: 2022,
        title: "Optical Lattice Clock Measures Millimeter Gravitational Redshift",
        description: "Jun Ye's team at JILA resolves gravitational time dilation across a 1-millimeter vertical displacement using a strontium optical lattice clock.",
        sourceIndex: 0,
      },
    ],
    entities: [
      {
        kind: "lab",
        name: "JILA (NIST and University of Colorado Boulder)",
        country: "United States",
        url: "https://jila.colorado.edu/",
        summary: "World-leading institute in atomic, molecular, and optical physics, home to the first atomic BEC and ultra-precise strontium optical lattice clocks.",
        attributes: {
          "focus": "Optical atomic clocks, ultracold molecules, quantum degenerate gases",
        },
        sourceUrls: ["https://doi.org/10.1038/s41586-021-04344-6", "https://doi.org/10.1126/science.269.5221.198"],
      },
      {
        kind: "lab",
        name: "Max Planck Institute of Quantum Optics (MPQ)",
        country: "Germany",
        url: "https://www.mpq.mpg.de/",
        summary: "European center of excellence in quantum optics, laser spectroscopy, and ultracold quantum simulators led by Immanuel Bloch and Theodor Hänsch.",
        attributes: {
          "focus": "Quantum simulation, optical frequency combs, ultracold quantum matter",
        },
        sourceUrls: ["https://doi.org/10.1103/physrevlett.45.494"],
      },
    ],
    controversies: [
      {
        kind: "contested",
        note: "Mechanism of High-Temperature Superconductivity: Antiferromagnetic Spin Fluctuations vs Resonating Valence Bond (RVB): Nearly four decades after Bednorz and Müller's discovery, physics remains divided on whether Cooper pairing in cuprates is mediated by dynamic antiferromagnetic spin fluctuations or emerges from doped Mott insulating resonating valence bond (RVB) states described by the 2D Hubbard model.",
        claimIndexes: [4],
      },
      {
        kind: "contested",
        note: "Majorana Zero Modes vs Trivial Andreev Bound States in Topological Nanowires: Reported zero-bias conductance peaks in semiconductor-superconductor hybrid nanowires (InAs/Al) were initially interpreted as non-Abelian Majorana zero modes for topological computing. Subsequent analyses demonstrated that smooth disorder potentials and quantum dots easily produce trivial subgap Andreev bound states with identical conductance signatures.",
        claimIndexes: [3],
      },
    ],
  },
};
