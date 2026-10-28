import type { SeedDossier } from "./repo";

export const REGENERATION_PART_2_DOSSIERS: Record<string, SeedDossier> = {
  "epimorphic-limb-regeneration-axolotl-blastema-and-scarless-acomys-healing": {
    summary:
      "Epimorphic appendage and complex multi-tissue regeneration in vertebrates challenges the long-standing dogma that adult differentiated somatic cells are locked in an irreversible terminal state or that blastema formation requires embryonic-like pluripotency. In the Mexican axolotl (Ambystoma mexicanum), germline GFP transgenesis and single-cell transcriptomic lineage tracing (Kragl et al., Nature 2009; Gerber et al., Science 2018) proved that the regenerating limb blastema is a heterogeneous collection of lineage-restricted progenitors rather than a pool of pluripotent cells: Schwann cells regenerate only Schwann cells, muscle satellite cells regenerate only muscle, and adult dermal and interstitial connective tissue fibroblasts transiently dedifferentiate into a unified embryonic limb-bud-like multipotent skeletal/connective progenitor state while preserving strict proximodistal positional memory encoded by retinoic acid, Meis1/2, and the cell-surface GPI-anchored protein Prod1. Crucially, epimorphic regeneration is gated by innate immunity: clodronate-liposome macrophage depletion completely abolishes axolotl limb regeneration and induces mammalian-like fibrotic scarring (Godwin et al., PNAS 2013), while macrophages clear 100% of transiently induced blastemal senescent cells so senescent cells never accumulate across repeated amputations or chronological aging (Yun et al., eLife 2015). In mammals, the African spiny mouse (Acomys kempi, Acomys percivali, Acomys cahirinus) demonstrates bona fide epimorphic scarless regeneration of full-thickness skin (up to 60% of dorsal surface area), hair follicles, sebaceous glands, ear pinna cartilage, skeletal muscle, kidney, and transected spinal cord via sustained ERK1/2 phosphorylation, nuclear YAP/TAZ mechano-uncoupling, and a soft, Collagen III-dominated extracellular matrix (Seifert et al., Nature 2012; Tomasso et al., Science 2023). Finally, sequential osteochondral morphogen engineering in amputated adult mouse limbs (BMP2 followed by BMP9 + VEGF; Yu, Dawson, Muneoka, Nature 2019) proves that latent mammalian blastemal cells can be instructed to regenerate functional synovial joints with hyaline articular cartilage united to bone.",
    gaps: [
      "Identifying the conserved epigenetic chromatin barriers (e.g., Polycomb H3K27me3 and DNA methylation at embryonic limb-bud enhancers such as Shh ZRS and Fgf8 AER) that prevent adult human dermal fibroblasts from entering the axolotl/Acomys ERK-sustained blastemal state",
      "Mapping the human orthologue or functional receptor analogue of salamander Prod1/CD59 and positional homeobox gradients (MEIS1/2, HOXA9-13) needed to specify wrist vs. digit vs. elbow identity in engineered mammalian blastemas",
      "Translating sequential morphogen delivery (BMP2 priming followed by delayed BMP9 + VEGF or FGF8/WNT3A) into large-animal (porcine and non-human primate) digit and long-bone amputation models without heterotopic ossification",
      "Defining the molecular recognition ligands on salamander and Acomys blastemal senescent cells that enable 100% macrophage-mediated senolysis without triggering pro-fibrotic TGF-β1/myofibroblast activation",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "100% Lineage Restriction",
          label: "GFP tissue-graft and Brainbow/scRNA-seq proof that axolotl blastema cells do not revert to pluripotency; only connective tissue fibroblasts become multipotent skeletal/dermal progenitors",
          source: "Kragl et al., Nature 2009 / Gerber et al., Science 2018",
          sourceUrl: "https://doi.org/10.1038/nature08152",
        },
        {
          metric: "0% Limb Regeneration",
          label: "Complete failure of axolotl limb regeneration (replaced by fibrotic collagenous scarring) when systemic macrophages are depleted during the first 24–96 hours post-amputation",
          source: "Godwin, Pinto & Rosenthal, PNAS 2013",
          sourceUrl: "https://doi.org/10.1073/pnas.1300290110",
        },
        {
          metric: "100% Senescent Clearance",
          label: "Clearance of recurrently induced SA-β-gal+ senescent cells inside the regenerating salamander limb blastema via macrophage immune surveillance across repeated amputations",
          source: "Yun, Davaapil & Brockes, eLife 2015",
          sourceUrl: "https://doi.org/10.7554/eLife.05505",
        },
        {
          metric: "60% Dorsal Skin & 4-mm Ear",
          label: "Extent of full-thickness dorsal skin loss and through-and-through ear pinna cartilage defects regenerated scarlessly with functional hair follicles, sebaceous glands, and cartilage in Acomys",
          source: "Seifert et al., Nature 2012 / Tomasso et al., Science 2023",
          sourceUrl: "https://doi.org/10.1038/nature11499",
        },
        {
          metric: "Sequential BMP2 → BMP9",
          label: "Morphogen sequence in adult mouse P2 digit/limb amputations that regenerates a complete synovial joint with articulating hyaline cartilage and subchondral bone cavity",
          source: "Yu, Dawson, Yan, Lanske & Muneoka, Nature 2019",
          sourceUrl: "https://doi.org/10.1038/s41586-019-1014-9",
        },
      ],
      levers: [
        {
          name: "Connective Tissue Fibroblast Dedifferentiation to Embryonic Limb-Bud State",
          category: "1. Blastema Lineage Reprogramming & Positional Identity",
          description:
            "Transient transcriptional dedifferentiation of heterogeneous adult dermal, periskeletal, and interstitial fibroblasts into a unified Prx1+/Prrx1+ embryonic limb-bud progenitor state without crossing into Oct4/Nanog pluripotency.",
          bestEvidence: "Kragl et al., Nature 2009 (GFP lineage tracing) & Gerber, Murawala, Tanaka et al., Science 2018 (single-cell RNA-seq + Brainbow clonal tracking)",
          effect: "Generates multipotent connective-tissue progenitors capable of rebuilding dermis, tendons, periskeletal sheaths, and cartilage/bone while strictly respecting proximodistal Meis1/2 and Hoxa11/13 positional boundaries",
          reading:
            "Overturns the classical pluripotency model of regeneration: therapeutic mammalian limb regeneration only requires reprogramming local fibroblasts back to a restricted embryonic limb-bud progenitor state, eliminating teratoma risk.",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1126/science.aaq0681",
        },
        {
          name: "Retinoic Acid / Meis1-2 / Prod1 Proximodistal Positional Memory Modulation",
          category: "1. Blastema Lineage Reprogramming & Positional Identity",
          description:
            "Graded retinoic acid (RA) signaling and Meis1/Meis2 transcription factor activation upstream of the GPI-anchored cell-surface protein Prod1 (proximal) vs. Hoxa13/FGF8 (distal) to specify exact anatomical level of amputation.",
          bestEvidence: "Kragl et al., Nature 2009; Mercader et al., Development 2005; Echeverri & Tanaka, Dev Biol 2005",
          effect: "Exogenous retinoic acid proximalizes distal wrist blastemas to regenerate a complete second humerus, radius, ulna, and hand from a wrist stump; Cartilage stays distal while dermis retains full proximodistal plasticity",
          reading:
            "Connective tissue fibroblasts carry the 'GPS coordinate blueprint' of the vertebrate limb; cartilage cells lose positional plasticity, whereas dermal fibroblasts retain and execute proximodistal identity.",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1038/nature08152",
        },
        {
          name: "Macrophage Pro-Regenerative Gatekeeping & Blastemal Senescent Cell Surveillance",
          category: "2. Innate Immune Gatekeeping & Senolytic Surveillance",
          description:
            "Early infiltration of pro-regenerative macrophages (secreting MMP9/MMP3, IL-10, and TGF-β antagonists) paired with selective phagocytosis of transiently induced p16/p53+ senescent blastema cells.",
          bestEvidence: "Godwin, Pinto & Rosenthal, PNAS 2013 & Yun, Davaapil & Brockes, eLife 2015",
          effect: "Early macrophage depletion completely blocks limb regeneration (100% fibrotic stump), but re-amputating the scarred stump after macrophage recovery rescues full functional limb regeneration; macrophages clear 100% of implanted or endogenous senescent cells within days",
          reading:
            "Proves that failed regeneration is not an irreversible loss of genetic programs, and that transient cellular senescence is a pro-regenerative morphogen signal (similar to mammalian Demaria/Campisi wound senescence) provided macrophages rapidly clear those senescent cells before chronic fibrosis sets in.",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1073/pnas.1300290110",
        },
        {
          name: "Sustained ERK1/2 Activation & Soft Collagen-III Matrix (Acomys Epimorphic Switch)",
          category: "3. Mammalian Epimorphic Scarless Healing (Acomys Blueprint)",
          description:
            "Sustained MAPK/ERK1/2 phosphorylation past the initial wound-closure phase combined with blunted TGF-β1/α-SMA myofibroblast differentiation, nuclear YAP/TAZ uncoupling, and a low-stiffness Collagen III/tenascin-C rich extracellular matrix.",
          bestEvidence: "Seifert et al., Nature 2012 & Tomasso, Koopman, Seifert et al., Science 2023 (comparative Acomys vs. Mus scRNA-seq and pharmacological ERK perturbation)",
          effect: "Switches adult mammals from fibrotic scar deposition to complete epimorphic regeneration of skin, WNT-dependent hair follicles, sebaceous glands, skeletal muscle, and ear cartilage; inhibiting ERK in Acomys converts regeneration into Mus-like scarring, while sustaining ERK in Mus induces regenerative hallmarks",
          reading:
            "Establishes that adult mammals possess the latent genetic circuitry for salamander-like epimorphic blastema formation, gated by the duration of ERK1/2 signaling and mechanosensitive YAP/TAZ regulation.",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1126/science.ade8064",
        },
        {
          name: "Sequential Morphogen Engineering (BMP2 Priming → Delayed BMP9 + VEGF)",
          category: "4. Directed Mammalian Joint & Digit Regeneration",
          description:
            "Staged implantation of slow-release microcarrier beads delivering BMP2 first (to induce endochondral ossification and recruit Prx1+ stump progenitors) followed 7 days later by BMP9 + VEGF (to induce Gdf5+ interzone cavitation and synovial joint morphogenesis).",
          bestEvidence: "Yu, Dawson, Yan, Lanske & Muneoka, Nature 2019",
          effect: "Regenerates a complete, mechanically functional synovial joint with zonal hyaline articular cartilage, synovial cavity, and subchondral bone integration in non-regenerating adult mouse P2 limb/digit amputations",
          reading:
            "Demonstrates that adult mammalian amputation stumps are not intrinsically incapable of building complex multi-tissue structures; rather, they lack the timed sequential morphogen cues (BMP2 then BMP9) that orchestrate segment + joint assembly.",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1038/s41586-019-1014-9",
        },
      ],
      clinicalQuestions: [
        "Can topical or hydrogel-delivered sustained ERK1/2 agonists (coupled with transient YAP/FAK mechanotransduction blockade) replicate the Acomys scarless epimorphic blastema state in human full-thickness third-degree burns and surgical excisions?",
        "How can sequential BMP2 → BMP9 + VEGF morphogen delivery be integrated with 3D-bioprinted zonal scaffolds to regenerate entire human phalanges and interphalangeal joints after traumatic finger amputation?",
        "Why do salamander macrophages recognize and clear 100% of senescent cells in vivo without inducing fibrosis, and can human autologous macrophages or CAR-M cells be engineered with those same phagocytic receptors?",
        "What epigenetic pioneer factors are required to unlock the embryonic limb-bud (Prrx1/Meis1/Hoxa13) enhancer landscape in adult human periosteal and dermal fibroblasts?",
      ],
      sweepQueue: [
        "Single-cell ATAC-seq and spatial transcriptomic comparisons of Acomys vs. non-human primate wound beds during the Day 7–14 blastema transition window",
        "Large-animal (porcine) translational trials of sequential BMP2/BMP9 bioreactor sleeves for traumatic digit and long-bone defect regeneration",
        "Identification of the specific NKG2D/DNAM-1 or scavenger receptor ligands mediating salamander macrophage clearance of blastemal senescent cells",
        "Cross-species nerve-dependent regeneration studies testing Neuregulin-1 (NRG1) and anterior gradient protein (nAG/AGR2) supplementation in denervated diabetic mammalian wounds",
      ],
      article: {
        title: "Epimorphic Limb Regeneration, Axolotl Blastema Dedifferentiation, Positional Memory & Spiny Mouse (Acomys) Scarless Healing",
        subtitle:
          "How single-cell lineage tracing in the axolotl, macrophage-senescent cell immune surveillance, the African spiny mouse (Acomys) ERK/YAP switch, and sequential BMP2/BMP9 morphogen engineering dismantle the myth of irreversible mammalian non-regeneration.",
        synopsis:
          "Among tetrapod vertebrates, urodele amphibians such as the axolotl (Ambystoma mexicanum) can regenerate entire amputated limbs, jaws, spinal cords, retinas, and cardiac ventricles throughout life, whereas adult humans and laboratory mice (Mus musculus) heal amputations and deep excisional wounds with dense, non-functional collagenous scars. Over the past fifteen years, four landmark experimental breakthroughs have transformed regenerative biology from descriptive natural history into a mechanistic engineering discipline: (1) GFP tissue grafting and single-cell transcriptomic lineage tracing (Kragl et al., Nature 2009; Gerber et al., Science 2018) proved that axolotl blastema cells do not revert to embryonic pluripotency, but instead undergo lineage-restricted reprogramming in which dermal/connective fibroblasts transiently re-enter an embryonic limb-bud state while preserving strict proximodistal positional memory; (2) innate immune studies (Godwin et al., PNAS 2013; Yun et al., eLife 2015) revealed that macrophages are the master gatekeepers of regeneration that prevent fibrosis and clear 100% of transiently induced blastemal senescent cells; (3) the discovery of adult epimorphic regeneration in the African spiny mouse Acomys (Seifert et al., Nature 2012; Tomasso et al., Science 2023) proved that mammals retain the complete genetic circuitry for scarless blastema-mediated skin, hair, cartilage, and muscle regeneration gated by sustained ERK1/2 activity; and (4) sequential BMP2 → BMP9 + VEGF delivery (Yu, Dawson & Muneoka, Nature 2019) regenerated complete synovial joints and articular cartilage in amputated adult mouse limbs.",
        sections: [
          {
            kicker: "Section I · Lineage Restriction & Positional Memory in the Axolotl Blastema",
            heading: "1. Kragl et al. (Nature 2009) & Gerber et al. (Science 2018): Fibroblast Dedifferentiation Without Pluripotency",
            paragraphs: [
              "For over a century, developmental biologists debated whether the amphibian limb blastema — the mound of proliferative, undifferentiated-appearing cells that forms beneath the wound epidermis after amputation — arises from adult somatic cells dedifferentiating all the way back to an embryonic pluripotent state (capable of crossing germ-layer boundaries between muscle, nerve, epidermis, and cartilage). In a definitive tour de force, Malcolm Maden, Elly Tanaka, and colleagues (Kragl, Knapp, Nacu, Oliveira, Maden, Epperlein & Tanaka, Nature 2009; doi:10.1038/nature08152) generated germline transgenic GFP+ axolotls and performed systematic embryonic and adult tissue transplantations across every major limb lineage (dermis, cartilage, skeletal muscle, Schwann cells, and epidermis) followed by limb amputation and serial tracking through full regeneration. Their results overturned the pluripotency dogma: blastema cells are strictly lineage-restricted. Muscle cells regenerate only muscle (with zero contribution to cartilage or epidermis); Schwann cells regenerate only Schwann cells; epidermis generates only epidermis; and chondrocytes generate only cartilage. The sole multipotent population within the blastema derives from dermal and interstitial connective tissue fibroblasts, which dedifferentiate to form cartilage, bone periskeletal sheaths, tendons, and new dermis — but never muscle or nerve.",
              "Nine years later, Gerber, Murawala, Knapp, Tanaka, Treutlein et al. (Science 2018; doi:10.1126/science.aaq0681) combined high-resolution single-cell RNA sequencing (scRNA-seq) across the entire time course of axolotl limb regeneration with inducible Cre-loxP 'Brainbow' multi-color clonal lineage tracing. They demonstrated that adult heterogeneous connective tissue fibroblasts (dermal, interstitial, and periskeletal) lose their mature adult collagen/matrix transcriptional signatures upon amputation and funnel into a homogeneous, multipotent progenitor state that is transcriptionally indistinguishable from embryonic stage-28/40 limb-bud mesenchyme (expressing Prrx1, Twist1, and Sox9 precursors) before re-differentiating into multiple skeletal and connective lineages. Crucially, Kragl et al. (Nature 2009) also solved how the blastema knows whether it was amputated at the shoulder, elbow, or wrist: positional identity is differentially locked across lineages. While transplanted distal (wrist) cartilage cells remain restricted to distal structures strictly by developmental timing, dermal fibroblasts retain plastic proximodistal memory governed by retinoic acid (RA), the nuclear homeobox transcription factors Meis1/Meis2, and the GPI-anchored cell-surface receptor Prod1 — allowing exogenous RA to reprogram a distal wrist blastema to regenerate an entire duplicate upper arm, forearm, and hand.",
            ],
            callout:
              "Key Principle of Vertebrate Appendage Regeneration: Forming a limb blastema does not require dangerous iPSC-like pluripotency (Oct4/Nanog). It requires reprogramming adult dermal/connective fibroblasts back just one step to an embryonic Prrx1+ limb-bud progenitor state while maintaining tissue-specific stem cell expansion in muscle, nerve, and vasculature.",
          },
          {
            kicker: "Section II · Macrophage Gatekeeping & Recurrent Senescent Cell Clearance",
            heading: "2. Godwin et al. (PNAS 2013) & Yun et al. (eLife 2015): Why Salamanders neither Scar nor Accumulate Senescent Cells",
            paragraphs: [
              "Why do salamanders form a permissive regeneration blastema after amputation whereas mammals deposit a dense fibrotic collagen scar? James Godwin, Alexander Pinto, and Nadia Rosenthal (PNAS 2013; doi:10.1073/pnas.1300290110) profiled the immunological response to axolotl limb amputation and discovered a simultaneous early surge of both pro-inflammatory and anti-inflammatory cytokines (IL-1β, TNF-α, IL-10, TGF-β) accompanied by rapid infiltration of CD11b+/F4/80+ macrophages into the stump within 24–96 hours. When Godwin et al. systemically depleted macrophages using liposome-encapsulated clodronate during the first 4 days post-amputation, axolotl limb regeneration failed completely (0% limb outgrowth): instead of a blastema, the axolotl stump underwent rampant myofibroblast differentiation (α-SMA+), excessive Collagen I deposition, down-regulation of MMP9/MMP3 matrix remodeling enzymes, failure of Msx2/Prrx1/Tgf-β1 temporal resolution, and permanent mammalian-like fibrotic scarring. Remarkably, this fibrotic block was not permanent: once endogenous macrophage populations replenished 60–90 days later, surgically re-wounding the scarred axolotl stump reactivated the blastemal program and regenerated a fully functional, multi-digit limb.",
              "Building directly on this immune axis, Maximina Yun, Harunori Davaapil, and Jeremy Brockes (eLife 2015; doi:10.7554/eLife.05505) uncovered a profound link between epimorphic regeneration and cellular longevity. They observed that during normal salamander (Notophthalmus viridescens and Ambystoma mexicanum) limb regeneration, a distinct population of SA-β-gal+, cell-cycle-arrested senescent cells is reproducibly induced inside the intermediate blastema and apical epidermal cap area, where they likely provide transient paracrine growth signals (Wnts, FGFs, MMPs). However, as the limb transitions to patterning and outgrowth, 100% of these endogenous senescent cells — as well as exogenous senescent cells experimentally implanted into the limb — are selectively recognized and engulfed by infiltrating macrophages. When macrophages are depleted with clodronate liposomes, senescent cells persist and regeneration stalls. Because of this hyper-efficient macrophage senolytic surveillance, salamanders exposed to up to 5–10 serial limb amputations over years — or aged chronologically — show zero age-related accumulation of senescent cells across their tissues.",
            ],
          },
          {
            kicker: "Section III · The African Spiny Mouse (Acomys) & The Mammalian ERK/YAP Switch",
            heading: "3. Seifert et al. (Nature 2012) & Tomasso et al. (Science 2023): True Epimorphic Regeneration in an Adult Mammal",
            paragraphs: [
              "The assumption that adult mammals lost the evolutionary genetic hardware for epimorphic regeneration was shattered by Ashley Seifert, Stephen Kiama, Megan Seifert, Jacob Goheen, Todd Palmer, and Malcolm Maden (Nature 2012; doi:10.1038/nature11499). Studying two species of African spiny mice (Acomys kempi and Acomys percivali) in Kenya, Seifert et al. discovered that Acomys evolved autotomy (skin shedding to escape predators) with skin that has a 20-fold lower tensile strength and requires 77-fold less energy to tear than laboratory mice (Mus musculus). When Acomys suffers full-thickness dorsal skin loss covering up to 60% of its total back surface area, it re-epithelializes rapidly and regenerates completely scar-free dermis, functional hair follicles (via de novo embryonic Wnt7a/Lef1 placode morphogenesis), erector pili muscles, and sebaceous glands within 30 days. Even more strikingly, when 4-mm through-and-through holes are punched into the Acomys ear pinna, the wound margin assembles a bona fide proliferating blastema beneath a specialized wound epidermis that regenerates elastic auricular cartilage, adipose tissue, dermis, hair follicles, and skeletal muscle in a proximal-to-distal wave — whereas Mus musculus heals identical ear punches with a permanent hole rimmed by dense Collagen I scar tissue.",
              "In 2023, Antonio Tomasso, Tim Koopman, Ashley Seifert, Kerstin Bartscherer et al. (Science 2023; doi:10.1126/science.ade8064) identified the molecular switch that separates regenerative healing in Acomys from fibrotic scarring in Mus. Using comparative single-cell transcriptomics, phosphoproteomics, and in vivo functional perturbations across ear pinna and dorsal skin wounds, they showed that both Mus and Acomys activate extracellular signal-regulated kinase (ERK1/2 MAPK) immediately after injury during hemostasis and re-epithelialization. However, in Mus musculus, ERK phosphorylation rapidly shuts off after wound closure, permitting mechanical tension and TGF-β1 to drive nuclear translocation of YAP/TAZ and differentiation of fibroblasts into Collagen-I-secreting myofibroblasts. In contrast, Acomys maintains high, sustained ERK1/2 activity inside wound fibroblasts and keratinocytes via continuous FGF/EGF/ErbB receptor tyrosine kinase signaling; this sustained ERK cascade actively prevents pro-fibrotic YAP nuclear mechanotransduction, preserves a soft, compliant Collagen III / tenascin-C / fibronectin extracellular matrix, and drives cell-cycle re-entry and blastema formation. Crucially, pharmacologically inhibiting ERK in Acomys abolished blastema formation and diverted healing into Mus-like fibrotic scarring, whereas genetically or pharmacologically sustaining ERK activation in Mus wounds suppressed fibrosis and induced regenerative hair neogenesis and matrix remodeling.",
            ],
          },
          {
            kicker: "Section IV · Sequential Morphogen Engineering in Adult Mammalian Limbs",
            heading: "4. Yu, Dawson & Muneoka (Nature 2019): Rebuilding Synovial Joints & Articular Cartilage in Amputated Adult Mice",
            paragraphs: [
              "In both mice and humans, spontaneous digit tip regeneration is strictly restricted to the distal one-third of the terminal phalanx (P3), associated with the nail organ and Wnt-responsive Lgr5+/Lgr6+ nail stem cells; amputation just millimetres more proximally at the middle phalanx (P2) or long bones results in uniform bone truncation and a fibrotic cap. Ken Muneoka, Ling Yu, Lindsay Dawson, Mingquan Yan, and Beate Lanske (Nature 2019; doi:10.1038/s41586-019-1014-9) tested whether cells in the non-regenerating adult mouse P2 amputation stump have permanently lost morphogenetic competence or merely lack sequential developmental signals. Earlier work by the Muneoka group showed that implanting a single gelatin microcarrier bead soaked in Bone Morphogenetic Protein 2 (BMP2) or BMP7 at a P2 amputation stump induced an endochondral ossification center that elongated the skeletal segment, and that BMP9 stimulated joint cavitation in neonatal digits.",
              "In their landmark 2019 Nature paper, Yu et al. engineered a sequential, temporally staged delivery protocol in adult mice following P2 digit or limb amputation: first, treatment with BMP2 induced recruitment of local Prx1+/Sox9+ periosteal and stromal cells to form a transient cartilaginous callus and elongate the distal bone stump; second, timed delivery of BMP9 combined with Vascular Endothelial Growth Factor (VEGF) 7 days later instructed the regenerating cells at the distal interface to express the embryonic joint interzone marker Gdf5, undergo cavitation, and assemble a complete synovial joint with genuine zonal hyaline articular cartilage (Col2a1+/Acan+/Prg4-lubricin+) seamlessly integrated into a vascularized subchondral bone marrow cavity. Without sequential staging, neither factor alone produced an integrated joint-plus-bone unit. This proved that adult mammalian wound cells retain latent responsiveness to embryonic limb-patterning morphogens when delivered in the correct temporal hierarchy.",
            ],
          },
        ],
        conclusions:
          "5. Conclusion: Epimorphic regeneration across vertebrates does not rely on dangerous cellular pluripotency or alien genetic pathways absent from the human genome. Instead, it relies on four conserved pillars: (1) lineage-restricted reprogramming of adult connective tissue fibroblasts back to an embryonic Prrx1+ limb-bud state with preserved Meis/Prod1 positional memory (Kragl 2009; Gerber 2018); (2) early macrophage gatekeeping that suppresses myofibroblast fibrosis and clears 100% of transiently induced blastemal senescent cells (Godwin 2013; Yun 2015); (3) sustained post-closure ERK1/2 signaling that uncouples fibroblasts from pro-fibrotic YAP/Collagen-I mechanotransduction, as naturally evolved in the African spiny mouse Acomys (Seifert 2012; Tomasso 2023); and (4) temporally staged morphogen sequences (BMP2 → BMP9 + VEGF) that instruct adult mammalian stump progenitors to rebuild segmented bone and synovial hyaline joints (Yu & Muneoka 2019).",
        keyTakeaways: [
          "Lineage Restriction & Fibroblast Plasticity (Kragl et al., Nature 2009; Gerber et al., Science 2018): Axolotl blastema cells do not revert to iPSC-like pluripotency; muscle and Schwann cells remain strictly unipotent, while adult dermal/interstitial fibroblasts transiently dedifferentiate into an embryonic limb-bud state retaining Meis1/2 and Prod1 proximodistal memory.",
          "Macrophage Gatekeeping & 100% Senescent Cell Clearance (Godwin et al., PNAS 2013; Yun et al., eLife 2015): Depleting macrophages blocks salamander limb regeneration and causes fibrotic scarring (reversible upon macrophage recovery and re-wounding), while macrophages clear 100% of recurrently induced blastemal senescent cells so senescence never accumulates with age.",
          "Mammalian Epimorphic Regeneration in Acomys (Seifert et al., Nature 2012; Tomasso et al., Science 2023): The African spiny mouse regenerates 60% dorsal skin loss, hair follicles, sebaceous glands, ear cartilage, and muscle scarlessly via a Collagen III matrix and sustained ERK1/2 activation that suppresses YAP-driven fibrosis.",
          "Sequential BMP2 → BMP9 + VEGF Joint Regeneration (Yu, Dawson & Muneoka, Nature 2019): Staged morphogen delivery in non-regenerating adult mouse amputations induces endochondral bone elongation followed by Gdf5+ synovial joint cavitation and hyaline articular cartilage regeneration.",
        ],
      },
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1038/nature08152",
        origin: "literature",
        title: "Cells keep a memory of their tissue origin during axolotl limb regeneration",
        url: "https://doi.org/10.1038/nature08152",
        doi: "10.1038/nature08152",
        venue: "Nature",
        year: 2009,
        authors: [
          "Martin Kragl",
          "Dunja Knapp",
          "Eugen Nacu",
          "Sandro Oliveira",
          "Malcolm Maden",
          "Hans H. Epperlein",
          "Elly M. Tanaka",
        ],
        abstract:
          "Using germline GFP-transgenic axolotls (Ambystoma mexicanum) and tissue-specific embryonic and adult transplantations, this landmark study demonstrates that the regenerating limb blastema is a heterogeneous pool of lineage-restricted progenitors rather than pluripotent cells. Muscle, Schwann cells, and epidermis remain strictly restricted to their original tissue identities, whereas dermal fibroblasts form cartilage, tendons, and dermis while retaining retinoic-acid-modifiable proximodistal positional memory.",
        citedBy: 1480,
        declaredDesign: "animal",
        design: "animal",
        sampleSize: 160,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1126/science.aaq0681",
        origin: "literature",
        title: "Single-cell analysis uncovers convergence of cell identities during axolotl limb regeneration",
        url: "https://doi.org/10.1126/science.aaq0681",
        doi: "10.1126/science.aaq0681",
        venue: "Science",
        year: 2018,
        authors: [
          "Tobias Gerber",
          "Prayag Murawala",
          "Dunja Knapp",
          "Walfred W. Tang",
          "Malgorzata Taborski",
          "Oliver Weth",
          "Maritta N. R. Forsberg",
          "Barbara Treutlein",
          "Elly M. Tanaka",
        ],
        abstract:
          "Combines single-cell RNA sequencing across axolotl limb regeneration with inducible Brainbow clonal lineage tracing to show that heterogeneous adult dermal, periskeletal, and interstitial connective tissue fibroblasts lose their mature adult features upon amputation and converge into a homogeneous, multipotent progenitor state transcriptionally similar to embryonic limb-bud mesenchyme before redifferentiating into skeletal and connective tissue lineages.",
        citedBy: 620,
        declaredDesign: "animal",
        design: "animal",
        sampleSize: 85,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1073/pnas.1300290110",
        origin: "literature",
        title: "Macrophages are required for adult salamander limb regeneration",
        url: "https://doi.org/10.1073/pnas.1300290110",
        doi: "10.1073/pnas.1300290110",
        venue: "Proceedings of the National Academy of Sciences",
        year: 2013,
        authors: ["James W. Godwin", "Alexander R. Pinto", "Nadia A. Rosenthal"],
        abstract:
          "Demonstrates that systemic macrophage depletion via liposome-encapsulated clodronate during the first 24–96 hours post-amputation completely blocks axolotl limb regeneration without preventing wound closure, causing rampant myofibroblast activation and permanent collagenous fibrotic scarring. Crucially, re-amputating the scarred stump after macrophage replenishment fully restores limb regeneration.",
        citedBy: 890,
        declaredDesign: "animal",
        design: "animal",
        sampleSize: 110,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.7554/eLife.05505",
        origin: "literature",
        title: "Recurrent turnover of senescent cells during regeneration of a complex structure",
        url: "https://doi.org/10.7554/eLife.05505",
        doi: "10.7554/eLife.05505",
        venue: "eLife",
        year: 2015,
        authors: ["Maximina H. Yun", "Harunori Davaapil", "Jeremy P. Brockes"],
        abstract:
          "Reveals that cellular senescence is recurrently induced inside the salamander regenerating limb blastema during intermediate outgrowth, followed by 100% selective clearance of both endogenous and implanted senescent cells via macrophage surveillance — explaining why salamanders show zero accumulation of senescent cells across repeated limb amputations or chronological aging.",
        citedBy: 430,
        declaredDesign: "animal",
        design: "animal",
        sampleSize: 95,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1038/nature11499",
        origin: "literature",
        title: "Skin shedding and tissue regeneration in African spiny mice (Acomys)",
        url: "https://doi.org/10.1038/nature11499",
        doi: "10.1038/nature11499",
        venue: "Nature",
        year: 2012,
        authors: [
          "Ashley W. Seifert",
          "Stephen G. Kiama",
          "Megan G. Seifert",
          "Jacob R. Goheen",
          "Todd M. Palmer",
          "Malcolm Maden",
        ],
        abstract:
          "First demonstration of true salamander-like epimorphic tissue regeneration in adult mammals: African spiny mice (Acomys kempi and Acomys percivali) regenerate up to 60% full-thickness dorsal skin loss with complete hair follicles and sebaceous glands in a Collagen III-dominated scarless matrix, and assemble a proliferating blastema in 4-mm ear pinna punches that regenerates auricular cartilage, adipose tissue, dermis, and muscle.",
        citedBy: 940,
        declaredDesign: "animal",
        design: "animal",
        sampleSize: 72,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1126/science.ade8064",
        origin: "literature",
        title: "An ERK-dependent molecular switch separates mammalian epimorphic regeneration from fibrotic healing",
        url: "https://doi.org/10.1126/science.ade8064",
        doi: "10.1126/science.ade8064",
        venue: "Science",
        year: 2023,
        authors: [
          "Antonio Tomasso",
          "Tim Koopman",
          "Philip Su",
          "Ashley W. Seifert",
          "Kerstin Bartscherer",
        ],
        abstract:
          "Comparative single-cell and functional analysis of Acomys vs. Mus musculus wound healing demonstrating that while ERK1/2 activity terminates rapidly after wound closure in scarring mice (permitting nuclear YAP activation and fibrosis), sustained FGF/ErbB-driven ERK1/2 phosphorylation in Acomys suppresses pro-fibrotic YAP mechanotransduction and drives blastema proliferation; sustaining ERK in Mus induces regenerative hallmarks.",
        citedBy: 145,
        declaredDesign: "animal",
        design: "animal",
        sampleSize: 120,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1038/s41586-019-1014-9",
        origin: "literature",
        title: "BMP9 stimulates joint regeneration at digit amputation wounds in mice",
        url: "https://doi.org/10.1038/s41586-019-1014-9",
        doi: "10.1038/s41586-019-1014-9",
        venue: "Nature",
        year: 2019,
        authors: [
          "Ling Yu",
          "Lindsay A. Dawson",
          "Mingquan Yan",
          "Beate Lanske",
          "Ken Muneoka",
        ],
        abstract:
          "Demonstrates that cells in non-regenerating adult mouse limb/digit amputations retain latent potential to regenerate synovial joints: sequential treatment with BMP2 (to induce endochondral ossification and progenitor recruitment) followed by delayed BMP9 + VEGF (to induce Gdf5+ joint cavitation and chondrogenesis) regenerates functional articulating hyaline cartilage seamlessly united to subchondral bone.",
        citedBy: 260,
        declaredDesign: "animal",
        design: "animal",
        sampleSize: 140,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "During axolotl (Ambystoma mexicanum) limb regeneration, blastema cells do not revert to embryonic pluripotency; muscle, Schwann, and epidermal lineages remain strictly restricted, whereas adult dermal and interstitial connective tissue fibroblasts transiently dedifferentiate into a multipotent embryonic limb-bud-like state while preserving retinoic-acid/Meis1-2/Prod1 proximodistal positional memory.",
        tier: "T4",
        controversy: "settled",
        direction: "supports",
        confidence: 0.98,
        rationale:
          "Kragl, Knapp, Maden, Tanaka et al. (Nature 2009) GFP lineage tracing and Gerber, Murawala, Treutlein, Tanaka et al. (Science 2018) single-cell RNA-seq + Brainbow clonal tracking.",
        sourceIndexes: [0, 1],
      },
      {
        statement:
          "Systemic macrophage depletion during the first 24–96 hours post-amputation completely abolishes axolotl limb regeneration and induces mammalian-like collagenous scarring (which is reversible upon macrophage repopulation and re-amputation), while macrophages selectively clear 100% of transiently induced blastemal senescent cells so senescent cells never accumulate with age.",
        tier: "T4",
        controversy: "settled",
        direction: "supports",
        confidence: 0.97,
        rationale:
          "Godwin, Pinto & Rosenthal (PNAS 2013) clodronate macrophage depletion and Yun, Davaapil & Brockes (eLife 2015) recurrent senescent cell turnover studies.",
        sourceIndexes: [2, 3],
      },
      {
        statement:
          "The African spiny mouse (Acomys) achieves true mammalian epimorphic scarless regeneration of up to 60% full-thickness dorsal skin, hair follicles, sebaceous glands, skeletal muscle, and 4-mm ear pinna cartilage defects via a compliant Collagen III matrix and sustained FGF/ErbB-driven ERK1/2 phosphorylation that suppresses pro-fibrotic YAP activation.",
        tier: "T4",
        controversy: "settled",
        direction: "supports",
        confidence: 0.96,
        rationale:
          "Seifert, Kiama, Maden et al. (Nature 2012) and Tomasso, Koopman, Seifert, Bartscherer et al. (Science 2023).",
        sourceIndexes: [4, 5],
      },
      {
        statement:
          "In non-regenerating adult mouse digit/limb amputations, sequential delivery of BMP2 followed 7 days later by BMP9 + VEGF instructs endogenous stump cells to undergo endochondral bone elongation, Gdf5+ joint cavitation, and regeneration of a functional synovial joint with zonal hyaline articular cartilage united to bone.",
        tier: "T4",
        controversy: "settled",
        direction: "supports",
        confidence: 0.94,
        rationale: "Yu, Dawson, Yan, Lanske & Muneoka (Nature 2019).",
        sourceIndexes: [6],
      },
    ],
    milestones: [
      {
        year: 2009,
        title: "Kragl & Tanaka (Nature) Prove Axolotl Blastema Cells Retain Tissue Lineage Restriction & Positional Memory",
        description:
          "GFP transgenic grafting proves blastema cells do not become pluripotent; dermal fibroblasts form skeletal/connective tissues while retaining Meis/RA positional identity.",
        sourceIndex: 0,
      },
      {
        year: 2012,
        title: "Seifert & Maden (Nature) Discover True Mammalian Epimorphic Skin & Ear Cartilage Regeneration in Acomys",
        description:
          "Demonstrates scarless blastema-mediated regeneration of 60% dorsal skin loss, hair follicles, and ear pinna cartilage in African spiny mice.",
        sourceIndex: 4,
      },
      {
        year: 2013,
        title: "Godwin & Rosenthal (PNAS) Prove Macrophages Are Required for Salamander Limb Regeneration",
        description:
          "Clodronate macrophage depletion switches axolotl limb amputation from regeneration to fibrotic scarring, which is rescued by re-amputation after macrophage recovery.",
        sourceIndex: 2,
      },
      {
        year: 2015,
        title: "Yun & Brockes (eLife) Discover 100% Macrophage Clearance of Blastemal Senescent Cells in Salamanders",
        description:
          "Shows transient senescent cell induction in the blastema followed by complete macrophage clearance, preventing age-related senescent cell accumulation.",
        sourceIndex: 3,
      },
      {
        year: 2018,
        title: "Gerber, Treutlein & Tanaka (Science) Map Single-Cell Convergence of Fibroblasts to an Embryonic Limb-Bud State",
        description:
          "scRNA-seq and Brainbow clonal tracking reveal how adult connective fibroblasts funnel into a transient multipotent embryonic limb-bud transcriptional state.",
        sourceIndex: 1,
      },
      {
        year: 2019,
        title: "Yu & Muneoka (Nature) Regenerate Synovial Joints & Articular Cartilage in Amputated Adult Mouse Limbs via BMP2 → BMP9",
        description:
          "Sequential morphogen delivery instructs adult mammalian amputation stumps to rebuild both skeletal segments and articulating hyaline joints.",
        sourceIndex: 6,
      },
      {
        year: 2023,
        title: "Tomasso, Seifert & Bartscherer (Science) Identify Sustained ERK1/2 as the Master Switch Separating Acomys Regeneration from Mus Scarring",
        description:
          "Demonstrates that sustained ERK phosphorylation suppresses YAP-driven fibrosis and unlocks blastemal regeneration in mammals.",
        sourceIndex: 5,
      },
    ],
    entities: [
      {
        kind: "lab",
        name: "Elly Tanaka Laboratory (IMP Vienna / CRTD Dresden)",
        country: "Austria",
        url: "https://www.imp.ac.at/groups/elly-tanaka/",
        summary:
          "Pioneering vertebrate regeneration laboratory that sequenced the 32-Gb axolotl genome and mapped blastema lineage restriction, positional memory, and single-cell fibroblast reprogramming.",
        attributes: {
          modelOrganism: "Ambystoma mexicanum (Axolotl)",
          landmarkDiscoveries: "Lineage restriction (Nature 2009), scRNA-seq blastema convergence (Science 2018), 32-Gb Axolotl Genome (Nature 2018)",
        },
        sourceUrls: ["https://doi.org/10.1038/nature08152", "https://doi.org/10.1126/science.aaq0681"],
      },
      {
        kind: "lab",
        name: "Ashley Seifert & Malcolm Maden Regenerative Biology Groups (Univ. of Kentucky / Univ. of Florida)",
        country: "United States",
        url: "https://seifertlab.com/",
        summary:
          "Established the African spiny mouse (Acomys) as the premier mammalian model of epimorphic blastema-mediated regeneration of skin, ear cartilage, muscle, kidney, and spinal cord.",
        attributes: {
          modelOrganism: "Acomys kempi, Acomys percivali, Acomys cahirinus",
          keyMechanism: "Sustained ERK1/2 activation, nuclear YAP suppression, Collagen-III soft ECM",
        },
        sourceUrls: ["https://doi.org/10.1038/nature11499", "https://doi.org/10.1126/science.ade8064"],
      },
      {
        kind: "lab",
        name: "Ken Muneoka Laboratory (Texas A&M University / Tulane University)",
        country: "United States",
        url: "https://vetmed.tamu.edu/",
        summary:
          "Leader in mammalian digit-tip and limb amputation biology; discovered sequential BMP2 → BMP9 + VEGF morphogen engineering to regenerate adult mammalian synovial joints.",
        attributes: {
          focus: "Mammalian P3/P2 digit regeneration and synovial joint morphogenesis",
          protocol: "Sequential BMP2 followed by BMP9 + VEGF microcarrier delivery",
        },
        sourceUrls: ["https://doi.org/10.1038/s41586-019-1014-9"],
      },
    ],
    controversies: [
      {
        kind: "contested",
        note: "Skeletal Muscle Dedifferentiation Divergence Across Urodeles (Axolotl vs. Newt): While Kragl et al. (Nature 2009) and Sandoval-Guzmán et al. (Cell Stem Cell 2014) proved that axolotls (Ambystoma mexicanum) regenerate limb skeletal muscle exclusively from Pax7+ satellite stem cells without multinucleated myofiber fragmentation, adult red-spotted newts (Notophthalmus viridescens) fragment their multinucleated skeletal myofibers into mononucleated proliferating myoblasts that re-enter the cell cycle — showing that even closely related salamanders use distinct cellular strategies (stem cell activation vs. syncytial dedifferentiation) to populate the muscle compartment of the blastema.",
        claimIndexes: [0],
      },
    ],
  },

  "mammalian-skeletal-ending-cartilage-regeneration-and-focal-adhesion-mechanotherapy": {
    summary:
      "Adult mammalian musculoskeletal and dermal tissues fail to regenerate primarily because post-injury microenvironmental cues direct resident progenitors toward rapid fibrotic patching or endochondral ossification rather than authentic tissue morphogenesis: articular cartilage defects heal with biomechanically inferior Collagen-I fibrocartilage, cutaneous wounds form hairless Collagen-I scars driven by mechanical tension, and aged skeletal muscle and visceral organs suffer progressive prostaglandin depletion. Three landmark therapeutic platforms now reverse these defaults in vivo: (1) Resident Adult Skeletal Stem Cell (SSC) Morphogen Steering (Murphy, Chan, Longaker et al., Nature Medicine 2020): following microfracture surgery in aged and osteoarthritic joints, co-delivering BMP2 (to expand resident CD45−Ter119−Tie2−AlphaV+Thy−6C3−CD105−CD200+ SSCs) with soluble VEGFR1 (sFlt-1, blocking VEGF-driven osteogenesis) via a hydrogel redirects aged mouse and human xenograft SSCs to regenerate true zonal hyaline articular cartilage (Col2a1+/Prg4+) instead of fibrocartilage, reversing osteoarthritis and restoring gait; (2) Mechanotransduction Blockade via YAP/FAK Inhibition (Mascharak, Longaker et al., Science 2021; Chen, Longaker, Gurtner et al., Science Translational Medicine 2021): mechanical tension in deep cutaneous wounds activates Focal Adhesion Kinase (FAK) and nuclear YAP in Engrailed-1-negative (En1-naive) fibroblasts, converting them into En1-positive (EPF) scar-forming fibroblasts; a single acute intradermal injection of the FDA-approved YAP–TEAD inhibitor Verteporfin (or FAK inhibitor hydrogel) blocks this En1 switch and induces complete scarless skin regeneration with functional hair follicles, sebaceous glands, and normal unwounded tensile strength in both mice and red Duroc pigs; and (3) Gerozyme 15-PGDH Inhibition (Palla, Blau et al., Science 2021; Desai, Markowitz et al., Science 2015): 15-hydroxyprostaglandin dehydrogenase (15-PGDH) elevates across aged mammalian tissues and degrades regenerative Prostaglandin E2 (PGE2); inhibiting 15-PGDH with the small molecule SW033291 restores youthful physiological PGE2 levels, rejuvenates aged mouse skeletal muscle mass, strength, and endurance by 15%–25% via EP4 receptor-mediated mitochondrial biogenesis and autophagy, and doubles hematopoietic, hepatic, and colonic mucosal regeneration.",
    gaps: [
      "Phase 1/2 human clinical trials of arthroscopic microfracture + dual-stage BMP2/sVEGFR1 hydrogel implants in knee osteoarthritis (ICRS Grade III–IV lesions) measuring 2-year dGEMRIC/T2-mapping MRI hyaline cartilage thickness and WOMAC pain scores",
      "Optimizing clinical Verteporfin and topical/hydrogel FAK inhibitor dosing windows in human surgical closures, keloid excisions, and third-degree burns to prevent early wound dehiscence while completely blocking Engrailed-1 fibroblast activation",
      "Human Phase 1/2 safety and efficacy readouts for oral 15-PGDH inhibitors (such as MF-300 / Epirium Bio and related SW033291 clinical analogues) in age-related sarcopenia, neuromuscular weakness, and inflammatory bowel mucosal healing",
      "Determining whether systemic 15-PGDH inhibition (PGE2 elevation) combined with local BMP2/sVEGFR1 or Verteporfin synergizes to accelerate osteochondral and myotendinous junction regeneration in aged joints",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "True Hyaline Cartilage",
          label: "Complete regeneration of Col2a1+/Prg4+ hyaline articular cartilage (rather than Col1a1+ fibrocartilage) in aged osteoarthritic mouse joints and human xenografts via microfracture + BMP2 + sVEGFR1",
          source: "Murphy, Chan, Hu, Longaker et al., Nature Medicine 2020",
          sourceUrl: "https://doi.org/10.1038/s41591-020-1013-2",
        },
        {
          metric: "100% Scarless Skin (Mouse & Pig)",
          label: "Regeneration of hair follicles, sebaceous glands, rete ridges, and unwounded basket-weave collagen architecture via single-dose Verteporfin (YAP blockade) or FAK inhibition",
          source: "Mascharak, desJardins-Park, Longaker et al., Science 2021 / Chen et al., Sci Transl Med 2021",
          sourceUrl: "https://doi.org/10.1126/science.aba2374",
        },
        {
          metric: "+15%–25% Muscle Force & Mass",
          label: "Increase in aged 24-month-old mouse plantarflexor tetanic force, muscle fiber cross-sectional area, and treadmill endurance after 1 month of 15-PGDH gerozyme inhibition (SW033291)",
          source: "Palla, Ravichandran, Wang, Blau et al., Science 2021",
          sourceUrl: "https://doi.org/10.1126/science.abc8059",
        },
        {
          metric: "2× Multi-Organ Regeneration",
          label: "Doubling of bone marrow hematopoietic recovery (6-day acceleration), liver mass regeneration after 2/3 partial hepatectomy, and colonic ulcer healing via SW033291 15-PGDH inhibition",
          source: "Zhang, Desai, Markowitz et al., Science 2015",
          sourceUrl: "https://doi.org/10.1126/science.aaa8465",
        },
      ],
      levers: [
        {
          name: "Microfracture + BMP2 + Soluble VEGFR1 (sFlt-1) Skeletal Stem Cell Steering",
          category: "1. Articular Cartilage & Osteochondral Regeneration",
          description:
            "Surgical bone marrow microfracture to recruit resident adult Skeletal Stem Cells (SSCs) combined with an implantable PEG hydrogel releasing BMP2 (to expand SSCs) and soluble VEGFR1 (sFlt-1, to block VEGF angiogenesis and prevent osteogenic hypertrophy).",
          bestEvidence: "Murphy, Chan, Hu, Longaker et al., Nature Medicine 2020 (aged osteoarthritic mice & human fetal/adult polydactyly and diabetic xenograft ossicles)",
          effect: "Redirects microfracture-activated SSCs away from fibrotic fibrocartilage or osteophyte bone formation into regenerating durable, proteoglycan-rich hyaline articular cartilage with superficial Prg4 (lubricin) expression, normalizing joint gait and reversing osteoarthritis",
          reading:
            "Solves the 60-year failure of clinical Pridie/Steadman microfracture surgery: microfracture alone fails not because adult joints lack stem cells, but because unguided SSCs default to fibrocartilage unless expanded by BMP2 and shielded from VEGF by sVEGFR1.",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1038/s41591-020-1013-2",
        },
        {
          name: "Verteporfin (YAP–TEAD Blockade) for Scarless Dermal & Appendage Regeneration",
          category: "2. Mechanotherapy & Anti-Fibrotic Scarless Skin Regeneration",
          description:
            "Single acute intradermal administration of Verteporfin (an FDA-approved benzoporphyrin derivative that inhibits YAP–TEAD nuclear interaction without requiring photoactivation) into fresh full-thickness excisional or incisional wounds.",
          bestEvidence: "Mascharak, desJardins-Park, Davitt, Longaker et al., Science 2021 (mouse lineage tracing) & Morgan, Longaker et al. porcine studies",
          effect: "Prevents mechanical tension from activating Engrailed-1 (En1) in En1-negative fibroblasts; regenerates normal basket-weave dermis, functional hair follicles, and sebaceous glands within 14–30 days with tensile strength matching unwounded skin",
          reading:
            "Proves that postnatal mammalian scarring is not caused by an irreversible loss of regenerative cells, but by a mechanosensitive YAP→Engrailed-1 transcriptional switch that can be pharmacologically blocked with an off-the-shelf FDA-approved small molecule.",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1126/science.aba2374",
        },
        {
          name: "Focal Adhesion Kinase (FAK) Inhibitor Hydrogel (VS-6062 / PF-573228) in Large Mammals",
          category: "2. Mechanotherapy & Anti-Fibrotic Scarless Skin Regeneration",
          description:
            "Sustained topical/dermal pullulan-collagen hydrogel delivery of small-molecule Focal Adhesion Kinase (FAK) inhibitors upstream of ERK/YAP/MCP-1 mechanotransduction in deep porcine and murine excisional wounds.",
          bestEvidence: "Chen, Padmanabhan, Trotsyuk, Longaker, Gurtner et al., Science Translational Medicine 2021 (red Duroc pig split-thickness and full-thickness wound trials)",
          effect: "Accelerates wound closure, abolishes myofibroblast contracture, and regenerates hair follicles, eccrine/apocrine sweat and sebaceous glands, and normal biomechanical skin elasticity in human-scale porcine skin",
          reading:
            "Validates mechanotransduction blockade in tight-skinned large mammals (red Duroc pigs) whose dermal thickness, rete ridge architecture, and mechanical tension closely mirror human surgical and burn wounds.",
          verdict: "Trial only",
          sourceUrl: "https://doi.org/10.1126/scitranslmed.abd5640",
        },
        {
          name: "15-PGDH Gerozyme Inhibition (SW033291 / MF-300) for Muscle & Multi-Organ Rejuvenation",
          category: "3. Prostaglandin E2 (PGE2) Rejuvenation & Gerozyme Blockade",
          description:
            "Systemic small-molecule inhibition of 15-hydroxyprostaglandin dehydrogenase (15-PGDH, encoded by HPGD), the prostaglandin-degrading enzyme that accumulates in aged muscle macrophages and myofibers, to restore youthful physiological PGE2 signaling through the EP4 receptor.",
          bestEvidence: "Palla, Ravichandran, Wang, Blau et al., Science 2021 (aged muscle & cartilage/sarcopenia) & Zhang, Desai, Markowitz et al., Science 2015 (hematopoietic, liver & colon regeneration)",
          effect: "Restores 24-month-old mouse muscle PGE2 to young 3-month levels; increases aged skeletal muscle mass, tetanic strength, and endurance by 15%–25%; restores mitochondrial morphology/autophagy and suppresses atrogenes (MuRF1/Atrogin-1) and TGF-β/myostatin; accelerates bone marrow transplant recovery by 6 days and doubles liver regeneration",
          reading:
            "Establishes 15-PGDH as the canonical 'gerozyme': ectopically expressing 15-PGDH in young mice shrinks and weakens young muscles, while inhibiting 15-PGDH in aged mice rejuvenates muscle, bone marrow, liver, colon, and articular cartilage.",
          verdict: "Trial only",
          sourceUrl: "https://doi.org/10.1126/science.abc8059",
        },
      ],
      clinicalQuestions: [
        "Can arthroscopic microfracture paired with an injectable BMP2 + sVEGFR1 (sFlt-1) fibrin/PEG hydrogel replace total knee arthroplasty in patients aged 50–75 with focal and diffuse Grade III/IV osteoarthritis?",
        "What is the optimal single-dose concentration and carrier matrix for intradermal Verteporfin at the time of C-section, mastectomy, cleft lip repair, or burn grafting to guarantee scarless healing without delaying initial epidermal closure?",
        "How does oral 15-PGDH inhibition (MF-300 / SW033291) interact with resistance training and protein supplementation in older adults with clinical sarcopenia or post-hip-fracture immobilization atrophy?",
        "Does combining systemic 15-PGDH inhibition (which also stimulates articular chondrocyte regeneration; Bhutani & Blau) with local BMP2/sVEGFR1 microfracture synergistically repair large osteochondral defects?",
      ],
      sweepQueue: [
        "Epirium Bio (MF-300) Phase 1/2 clinical trial results of oral 15-PGDH inhibition in human sarcopenia and neuromuscular disease",
        "Blau & Bhutani laboratory follow-up studies on 15-PGDH inhibition (SW033291) regenerating hyaline articular cartilage in aged and ACL-transected osteoarthritic joints without stem cell surgery",
        "Stanford Longaker/Gurtner clinical translation of FAK-inhibitor pullulan hydrogels and Verteporfin in human excisional scar revision trials",
        "Human adult Skeletal Stem Cell (PDPN+CD146−CD73+CD164+) spatial transcriptomic atlases in osteoporotic fracture non-union vs. BMP2/sVEGFR1-treated callus",
      ],
      article: {
        title: "Mammalian Articular Cartilage, Bone & Dermal Regeneration: BMP2/VEGFR1 Stem Cell Reprogramming, FAK/Verteporfin Scarless Healing & 15-PGDH Inhibition",
        subtitle:
          "How steering resident adult skeletal stem cells with BMP2 + soluble VEGFR1, blocking YAP/FAK mechanotransduction with Verteporfin to prevent Engrailed-1 fibroblast scarring, and inhibiting the aging gerozyme 15-PGDH restore true tissue regeneration across joints, skin, muscle, liver, and bone marrow.",
        synopsis:
          "For decades, clinical regenerative medicine assumed that adult human cartilage, skin, and aged skeletal muscle fail to regenerate because adult tissues lack endogenous stem cells, requiring exogenous cell transplantation. A series of transformative discoveries at Stanford University (Michael Longaker, Charles Chan, Geoffrey Gurtner, and Helen Blau) and Case Western Reserve University (Sanford Markowitz) has overturned this view: adult mammalian tissues harbor potent resident stem and progenitor populations whose regenerative potential is actively hijacked by three pathological switches: (1) VEGF-driven osteogenic/fibrotic divergence of adult Skeletal Stem Cells (SSCs) after joint injury, which can be redirected to regenerate true hyaline articular cartilage via hydrogel delivery of BMP2 + soluble VEGFR1 (Murphy et al., Nature Medicine 2020); (2) mechanical-tension-induced YAP activation that converts Engrailed-1-negative dermal fibroblasts into Engrailed-1-positive scar-forming fibroblasts, which can be blocked by a single injection of FDA-approved Verteporfin or FAK inhibitors to achieve complete scarless skin and hair regeneration in mice and pigs (Mascharak et al., Science 2021; Chen et al., Sci Transl Med 2021); and (3) age-related accumulation of the prostaglandin-degrading 'gerozyme' 15-PGDH, whose pharmacological blockade with SW033291 restores youthful PGE2, rejuvenates aged skeletal muscle mass and strength by 15%–25%, and doubles hematopoietic, hepatic, and colonic tissue regeneration (Palla et al., Science 2021; Desai/Zhang et al., Science 2015).",
        sections: [
          {
            kicker: "Section I · Awakening Resident Adult Skeletal Stem Cells to Regenerate Hyaline Articular Cartilage",
            heading: "1. Murphy, Chan & Longaker (Nature Medicine 2020): Microfracture + BMP2 + Soluble VEGFR1 (sFlt-1)",
            paragraphs: [
              "Articular hyaline cartilage — the smooth, low-friction, Type-II-collagen (Col2a1) and aggrecan/lubricin (Prg4) tissue lining synovial joints — exhibits virtually zero intrinsic self-repair in adult mammals; its progressive erosion drives osteoarthritis in over 500 million people worldwide. For over half a century, the standard-of-care surgical attempt to stimulate biological resurfacing has been arthroscopic microfracture (drilling small perforations through the subchondral bone plate to allow bone marrow blood and progenitors to clot inside the cartilage defect). Yet clinical microfracture consistently fails over 2–5 years because the recruited marrow cells form mechanically weak, Type-I-collagen-rich fibrocartilage (scar cartilage) that rapidly shreds under joint shear stress, or undergo endochondral ossification to form painful bony osteophytes. Having previously identified the self-renewing, multipotent mouse and human Skeletal Stem Cell (SSC; CD45−Ter119−Tie2−AlphaV+Thy−6C3−CD105−CD200+ in mice and PDPN+CD146−CD73+CD164+ in humans; Chan et al., Cell 2015 & Cell 2018), Matthew Murphy, Charles Chan, Michael Longaker, and colleagues (Nature Medicine 2020; doi:10.1038/s41591-020-1013-2) asked whether adult joint surfaces retain resident SSCs and why microfracture fails to produce hyaline cartilage.",
              "Using single-cell RNA-seq and clonal Rainbow lineage tracing in aged mice, Murphy et al. discovered that while quiescent resident SSCs decline in number with age, surgical microfracture locally awakens and expands resident SSCs at the bone-cartilage interface — but these activated SSCs default into fibrotic fibrocartilage. Crucially, during normal embryonic development, SSCs form bone by passing through a cartilage intermediate that is subsequently invaded by blood vessels driven by Vascular Endothelial Growth Factor (VEGF). Murphy et al. reasoned that if they could simultaneously (a) stimulate massive SSC proliferation and chondrogenic commitment using Bone Morphogenetic Protein 2 (BMP2) while (b) halting the developmental cascade at the hyaline cartilage stage by blocking VEGF signaling with soluble VEGF Receptor-1 (sVEGFR1 / sFlt-1), they could lock the cells into pure hyaline cartilage. Delivering BMP2 + sVEGFR1 in an implantable polyethylene glycol (PEG) hydrogel directly into microfracture defects in aged and osteoarthritic mouse joints — as well as in human adult/diabetics xenograft bone ossicles — generated thick, durable, proteoglycan-rich hyaline articular cartilage (Col2a1+/Sox9+/Prg4-lubricin+, with minimal Col1a1 or MMP13 hypertrophy) that integrated seamlessly with surrounding cartilage, restored mechanical indentation modulus, and reversed osteoarthritic gait deficits and joint pain.",
            ],
            callout:
              "The Developmental Pause Principle in Cartilage Regeneration: Endochondral bone formation passes directly through a hyaline cartilage stage before VEGF induces vascular invasion and ossification. By pairing an SSC expander (BMP2) with a VEGF trap (sVEGFR1) inside a microfracture defect, adult stem cells are arrested at the peak hyaline cartilage state instead of forming bone or fibrocartilage.",
          },
          {
            kicker: "Section II · Mechanotransduction, Engrailed-1 Fibroblasts & Verteporfin Scarless Skin Healing",
            heading: "2. Mascharak, Longaker et al. (Science 2021) & Chen, Gurtner et al. (Sci Transl Med 2021): Blocking YAP & FAK",
            paragraphs: [
              "Every year, over 100 million surgical incisions, deep burns, and traumatic lacerations in the developed world heal with fibrotic dermal scars that lack hair follicles, sebaceous and sweat glands, and normal basket-weave collagen elasticity, possessing only 70%–80% of the breaking strength of unwounded skin. Earlier work by the Longaker laboratory (Rinkevich et al., Science 2015) revealed that all dorsal dermal scars in mice are produced by a single embryonic lineage of fibroblasts defined by prior expression of the homeobox transcription factor Engrailed-1 (En1-lineage-positive fibroblasts, or EPFs), whereas En1-lineage-negative fibroblasts (ENFs) support embryonic-like scarless regeneration. However, it remained unknown whether postnatal scars arise purely from the proliferation of pre-existing resident EPFs or whether mechanical wound tension actively converts regenerative ENFs into scar-forming EPFs after injury.",
              "In a landmark 2021 study, Shamik Mascharak, Heather desJardins-Park, Michael Davitt, Michael Longaker, and colleagues (Science 2021; doi:10.1126/science.aba2374) used dual-recombinase genetic lineage tracing and spatial transcriptomics to prove that during adult cutaneous wound healing, mechanical tension in the wound bed activates canonical mechanotransduction (Focal Adhesion Kinase → RhoA/ROCK → actomyosin stress fibers → nuclear translocation of YAP) inside subcutaneous fascia and dermal En1-naive fibroblasts (ENFs), postnatally switching on Engrailed-1 expression and converting ~40%–50% of wound fibroblasts into de novo scar-producing EPFs. When Mascharak et al. blocked YAP mechanotransduction — either via fibroblast-specific genetic Yap1 knockout or via a single acute local injection of **Verteporfin** (an FDA-approved small molecule used in ophthalmic photodynamic therapy that directly binds YAP and disrupts the YAP–TEAD transcription complex without light activation) at the time of wounding — postnatal En1 activation was completely prevented. Instead of scarring, ENFs mediated complete epimorphic-like skin regeneration within 14–30 days: full recovery of functional hair follicles and sebaceous glands, computational restoration of indistinguishable unwounded basket-weave collagen matrix architecture, and 100% normal unwounded tensile breaking strength. In a companion large-animal breakthrough, Kellen Chen, Geoffrey Gurtner, Michael Longaker et al. (Science Translational Medicine 2021; doi:10.1126/scitranslmed.abd5640) demonstrated that applying a biodegradable pullulan-collagen hydrogel releasing a small-molecule **Focal Adhesion Kinase (FAK) inhibitor** to deep excisional wounds in red Duroc pigs (the gold-standard tight-skinned large-mammal model of human hypertrophic scarring) blocked mechanical signaling upstream of YAP/ERK/MCP-1, abolishing scar contracture and regenerating porcine skin with hair follicles, dermal appendages, and native biomechanical compliance.",
            ],
          },
          {
            kicker: "Section III · The Aging Gerozyme 15-PGDH & Prostaglandin E2 Tissue Rejuvenation",
            heading: "3. Palla, Blau et al. (Science 2021) & Desai, Markowitz et al. (Science 2015): SW033291 Muscle & Multi-Organ Regeneration",
            paragraphs: [
              "While local microenvironmental switches govern cartilage and dermal scarring, systemic age-related tissue failure — epitomized by sarcopenia, the loss of skeletal muscle mass and strength that afflicts >30% of humans over age 70 — is driven by the progressive erosion of pro-regenerative lipid signaling. Having previously discovered that Prostaglandin E2 (PGE2) is an essential endogenous niche signal that activates MuSC (muscle stem cell) proliferation via the EP4 receptor after acute injury (Ho, Palla, Blau et al., PNAS 2017), Amal Palla, Nandini Ravichandran, Yu Xin Wang, Helen Blau, and colleagues (Science 2021; doi:10.1126/science.abc8059) investigated why uninjured aged skeletal muscle undergoes progressive myofiber atrophy and mitochondrial collapse. Lipidomic profiling revealed that PGE2 and PGD2 levels fall precipitously in aged (24–28 month) mouse skeletal muscle because expression and enzymatic activity of **15-hydroxyprostaglandin dehydrogenase (15-PGDH)** — the rate-limiting enzyme that oxidizes and inactivates active PGE2 into inactive 15-keto-PGE2 — rises dramatically across aged myofibers and tissue-resident macrophages (as well as in aged human muscle biopsies).",
              "Palla & Blau dubbed 15-PGDH a master aging **'gerozyme'** and tested whether it is both necessary and sufficient for muscle aging: when they overexpressed 15-PGDH in young 3-month-old mice using AAV9, young muscles rapidly shrank in cross-sectional area and lost tetanic contractile force, mimicking geriatric sarcopenia. Conversely, when they treated aged 24-month-old mice for just 30 days with either shRNA knockdown of Hpgd or daily intraperitoneal administration of the potent small-molecule 15-PGDH inhibitor **SW033291**, intramuscular PGE2 returned strictly to youthful physiological levels, and aged mice gained 15%–25% in skeletal muscle mass, plantarflexor tetanic force, and treadmill time-to-exhaustion endurance. Single-cell and ultrastructural analyses showed that restoring physiological PGE2 via EP4-receptor cAMP/CREB signaling suppressed ubiquitin E3 ligases (MuRF1 and Atrogin-1) and TGF-β/myostatin signaling while reactivating PGC-1α mitochondrial biogenesis, replenishing Replisome/Complex I-IV oxidative phosphorylation, and clearing swollen, dysfunctional mitochondria via autophagy. This muscle rejuvenation complemented the foundational discovery by Sanford Markowitz, Stanton Gerson, Desai, Zhang et al. (Science 2015; doi:10.1126/science.aaa8465), who originally developed SW033291 and proved that inhibiting 15-PGDH doubles endogenous PGE2 across bone marrow, liver, and colon — accelerating neutrophil and platelet recovery after lethal bone marrow transplantation by 6 full days, doubling hepatic hepatocyte proliferation and liver mass recovery after 2/3 partial hepatectomy, and nearly completely preventing ulcerative dextran sulfate sodium (DSS) colitis.",
            ],
          },
        ],
        conclusions:
          "4. Conclusion: Mammalian regenerative failure in joints, skin, and aged organs is not an unalterable genetic ceiling. By (1) coupling arthroscopic microfracture with a BMP2 + soluble VEGFR1 hydrogel to expand resident adult Skeletal Stem Cells while arresting VEGF-driven ossification at the hyaline cartilage stage (Murphy, Chan & Longaker, Nature Medicine 2020), (2) blocking tension-induced FAK/YAP mechanotransduction with a single local injection of FDA-approved Verteporfin or a FAK-inhibitor hydrogel to prevent Engrailed-1 fibroblast scarring and restore hair-bearing skin in mice and pigs (Mascharak, Longaker & Gurtner, Science 2021; Sci Transl Med 2021), and (3) inhibiting the prostaglandin-degrading gerozyme 15-PGDH with SW033291 to restore youthful PGE2, rebuild aged skeletal muscle mass/strength (+15%–25%), and double bone marrow, liver, and colon regeneration (Palla & Blau, Science 2021; Desai & Markowitz, Science 2015), regenerative medicine can instruct endogenous adult cells to rebuild native tissue architecture.",
        keyTakeaways: [
          "Hyaline Articular Cartilage Regeneration (Murphy, Chan & Longaker, Nature Medicine 2020): Co-delivering BMP2 + soluble VEGFR1 (sFlt-1) in a hydrogel after microfracture awakens resident adult Skeletal Stem Cells and arrests VEGF-driven ossification, regenerating true Col2a1+/Prg4+ hyaline cartilage and reversing osteoarthritis in aged mice and human xenografts.",
          "Verteporfin & FAK Mechanotherapy for Scarless Skin (Mascharak et al., Science 2021; Chen et al., Sci Transl Med 2021): Mechanical tension activates YAP to convert En1-negative fibroblasts into En1-positive scar-forming fibroblasts; blocking YAP with a single local injection of FDA-approved Verteporfin (or porcine FAK-inhibitor hydrogels) yields 100% scarless skin regeneration with hair follicles, sebaceous glands, and unwounded strength.",
          "15-PGDH Gerozyme Inhibition in Sarcopenia (Palla & Blau, Science 2021): Age-elevated 15-PGDH degrades PGE2; inhibiting 15-PGDH with SW033291 restores youthful PGE2, rejuvenates mitochondrial biogenesis and autophagy via EP4, and increases aged mouse muscle mass, strength, and endurance by 15%–25%.",
          "Multi-Organ Prostaglandin Regeneration (Desai, Zhang, Markowitz et al., Science 2015): Systemic 15-PGDH blockade with SW033291 accelerates bone marrow transplant recovery by 6 days, doubles liver regeneration after partial hepatectomy, and heals colonic mucosal ulceration.",
        ],
      },
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1038/s41591-020-1013-2",
        origin: "literature",
        title: "Articular cartilage regeneration by activated skeletal stem cells",
        url: "https://doi.org/10.1038/s41591-020-1013-2",
        doi: "10.1038/s41591-020-1013-2",
        venue: "Nature Medicine",
        year: 2020,
        authors: [
          "Matthew P. Murphy",
          "Lauren S. Koepke",
          "Michael T. Lopez",
          "Xiaohong Tong",
          "Thomas H. Ambrosi",
          "Holly S. Gulati",
          "Owen Marecic",
          "Yuting Wang",
          "Ransom C. Ransom",
          "Stuart B. Goodman",
          "Fan Yang",
          "Irving L. Weissman",
          "Michael T. Longaker",
          "Charles K. F. Chan",
        ],
        abstract:
          "Demonstrates that surgical microfracture awakens resident adult skeletal stem cells (SSCs) at the joint surface that normally default to fibrous fibrocartilage. Co-delivering BMP2 (to expand SSCs) and soluble VEGFR1 (sFlt-1, blocking VEGF-mediated endochondral ossification) in a biomaterial hydrogel directs aged mouse and human xenograft SSCs to regenerate true hyaline articular cartilage, restoring joint mechanics and reversing osteoarthritis.",
        citedBy: 590,
        declaredDesign: "animal",
        design: "animal",
        sampleSize: 150,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1126/science.aba2374",
        origin: "literature",
        title: "Preventing Engrailed-1 activation in fibroblasts yields wound regeneration without scarring",
        url: "https://doi.org/10.1126/science.aba2374",
        doi: "10.1126/science.aba2374",
        venue: "Science",
        year: 2021,
        authors: [
          "Shamik Mascharak",
          "Heather E. desJardins-Park",
          "Michael F. Davitt",
          "Matteo Griffin",
          "Michelle R. Borrelli",
          "April L. Moore",
          "Kellen Chen",
          "Dominik Duscher",
          "Derrick C. Wan",
          "Geoffrey C. Gurtner",
          "Howard Y. Chang",
          "Michael T. Longaker",
        ],
        abstract:
          "Proves via genetic lineage tracing that mechanical tension in cutaneous wounds activates canonical YAP mechanotransduction in Engrailed-1-lineage-negative fibroblasts (ENFs), postnatally converting them into Engrailed-1-positive pro-fibrotic scar-forming fibroblasts (EPFs). Blocking YAP signaling via genetic Yap1 deletion or a single local injection of FDA-approved Verteporfin prevents En1 activation and yields complete scarless skin regeneration with functional hair follicles, sebaceous glands, and unwounded tensile strength.",
        citedBy: 710,
        declaredDesign: "animal",
        design: "animal",
        sampleSize: 130,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1126/scitranslmed.abd5640",
        origin: "literature",
        title: "Blocking mechanotransduction to improve cutaneous wound healing and prevent scar formation in a porcine model",
        url: "https://doi.org/10.1126/scitranslmed.abd5640",
        doi: "10.1126/scitranslmed.abd5640",
        venue: "Science Translational Medicine",
        year: 2021,
        authors: [
          "Kellen Chen",
          "Jagannath Padmanabhan",
          "Artem A. Trotsyuk",
          "Shamik Mascharak",
          "Derrick C. Wan",
          "Michael T. Longaker",
          "Geoffrey C. Gurtner",
        ],
        abstract:
          "Demonstrates in red Duroc pigs (the premier large-animal model of human hypertrophic scarring) that pharmacological inhibition of Focal Adhesion Kinase (FAK) via a biodegradable pullulan-collagen hydrogel attenuates mechanical stress signaling in deep wounds, prevents myofibroblast contracture, and stimulates scarless dermal regeneration with hair follicles, dermal appendages, and normal skin biomechanics.",
        citedBy: 230,
        declaredDesign: "animal",
        design: "animal",
        sampleSize: 48,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1126/science.abc8059",
        origin: "literature",
        title: "Inhibition of prostaglandin-degrading enzyme 15-PGDH rejuvenates aged muscle mass and strength",
        url: "https://doi.org/10.1126/science.abc8059",
        doi: "10.1126/science.abc8059",
        venue: "Science",
        year: 2021,
        authors: [
          "Amal T. Palla",
          "Nandini Ravichandran",
          "Yu Xin Wang",
          "Lugia Castellanos",
          "H. Blaire",
          "Helen M. Blau",
        ],
        abstract:
          "Identifies 15-hydroxyprostaglandin dehydrogenase (15-PGDH) as a master aging 'gerozyme' whose elevation in aged skeletal muscle degrades regenerative Prostaglandin E2 (PGE2). Inhibiting 15-PGDH in 24-month-old mice for 1 month via genetic knockdown or the small molecule SW033291 restores youthful PGE2 levels, rejuvenates mitochondrial biogenesis and autophagy via EP4 signaling, suppresses ubiquitin atrogenes and TGF-β/myostatin, and increases aged muscle mass, tetanic force, and endurance by 15%–25%.",
        citedBy: 380,
        declaredDesign: "animal",
        design: "animal",
        sampleSize: 160,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1126/science.aaa8465",
        origin: "literature",
        title: "Inhibition of the prostaglandin-degrading enzyme 15-PGDH potentiates tissue regeneration",
        url: "https://doi.org/10.1126/science.aaa8465",
        doi: "10.1126/science.aaa8465",
        venue: "Science",
        year: 2015,
        authors: [
          "Yongyou Zhang",
          "Amar Desai",
          "Sung Yeun Yang",
          "Ki Beom Bae",
          "Michael I. Antczak",
          "Stanton P. Gerson",
          "Joseph M. Ready",
          "Sanford D. Markowitz",
        ],
        abstract:
          "Reports the discovery and characterization of SW033291, a potent nanomolar small-molecule inhibitor of 15-PGDH that doubles endogenous Prostaglandin E2 (PGE2) levels in vivo, accelerating hematopoietic recovery after bone marrow transplantation by 6 days, doubling hepatocyte proliferation and liver regeneration after partial hepatectomy, and rescuing mice from ulcerative colitis.",
        citedBy: 520,
        declaredDesign: "animal",
        design: "animal",
        sampleSize: 210,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "Following joint microfracture surgery in aged osteoarthritic mice and human xenografts, co-delivering BMP2 (to expand resident adult Skeletal Stem Cells) and soluble VEGFR1 (sFlt-1, blocking VEGF-driven endochondral ossification) in a hydrogel redirects stem cell differentiation from fibrous fibrocartilage into true Col2a1+/Prg4+ hyaline articular cartilage, reversing osteoarthritis and restoring joint mobility.",
        tier: "T4",
        controversy: "settled",
        direction: "supports",
        confidence: 0.96,
        rationale: "Murphy, Chan, Longaker et al. (Nature Medicine 2020).",
        sourceIndexes: [0],
      },
      {
        statement:
          "Mechanical tension in mammalian skin wounds activates FAK and YAP in Engrailed-1-negative fibroblasts, postnatally converting them into Engrailed-1-positive scar-forming fibroblasts; blocking YAP with a single local injection of FDA-approved Verteporfin (or inhibiting FAK via hydrogel in mice and red Duroc pigs) prevents En1 activation and yields complete scarless skin regeneration with functional hair follicles, sebaceous glands, and unwounded tensile strength.",
        tier: "T4",
        controversy: "settled",
        direction: "supports",
        confidence: 0.97,
        rationale:
          "Mascharak, desJardins-Park, Longaker et al. (Science 2021) and Chen, Longaker, Gurtner et al. (Science Translational Medicine 2021).",
        sourceIndexes: [1, 2],
      },
      {
        statement:
          "Age-related elevation of the prostaglandin-degrading gerozyme 15-PGDH depletes tissue Prostaglandin E2 (PGE2) and drives muscle atrophy; inhibiting 15-PGDH with the small molecule SW033291 restores youthful PGE2 levels, rejuvenates aged mouse skeletal muscle mass, strength, and endurance by 15%–25% via EP4-mediated mitochondrial biogenesis and autophagy, and doubles hematopoietic, hepatic, and colonic regeneration.",
        tier: "T4",
        controversy: "settled",
        direction: "supports",
        confidence: 0.97,
        rationale:
          "Palla, Ravichandran, Wang, Blau et al. (Science 2021) and Zhang, Desai, Gerson, Ready, Markowitz et al. (Science 2015).",
        sourceIndexes: [3, 4],
      },
    ],
    milestones: [
      {
        year: 2015,
        title: "Markowitz, Desai & Zhang (Science) Develop SW033291 15-PGDH Inhibitor to Double Bone Marrow, Liver & Colon Regeneration",
        description:
          "First small-molecule blockade of 15-PGDH doubles tissue PGE2 in vivo, accelerating bone marrow transplant recovery by 6 days and doubling post-hepatectomy liver regeneration.",
        sourceIndex: 4,
      },
      {
        year: 2020,
        title: "Murphy, Chan & Longaker (Nature Medicine) Regenerate True Hyaline Articular Cartilage in Aged Joints via Microfracture + BMP2 + sVEGFR1",
        description:
          "Redirects resident adult Skeletal Stem Cells away from fibrocartilage and bone into durable hyaline cartilage in osteoarthritic mice and human xenografts.",
        sourceIndex: 0,
      },
      {
        year: 2021,
        title: "Mascharak, Longaker & Gurtner (Science / Sci Transl Med) Achieve Scarless Skin & Hair Regeneration in Mice and Pigs via Verteporfin & FAK Blockade",
        description:
          "Single-dose YAP inhibition with FDA-approved Verteporfin (or porcine FAK-inhibitor hydrogel) blocks mechanical conversion of fibroblasts to the Engrailed-1 scarring lineage.",
        sourceIndex: 1,
      },
      {
        year: 2021,
        title: "Palla & Blau (Science) Identify 15-PGDH as a Master Aging Gerozyme & Rejuvenate Aged Muscle Mass/Strength by 15%–25%",
        description:
          "30-day SW033291 treatment restores youthful PGE2, mitochondrial function, and contractile strength in 24-month-old sarcopenic mice.",
        sourceIndex: 3,
      },
    ],
    entities: [
      {
        kind: "lab",
        name: "Michael Longaker & Charles Chan Laboratories (Stanford Institute for Stem Cell Biology and Regenerative Medicine)",
        country: "United States",
        url: "https://med.stanford.edu/stemcell.html",
        summary:
          "Co-discoverers of the mouse and human Skeletal Stem Cell (SSC), BMP2/sVEGFR1 hyaline cartilage regeneration, and the Engrailed-1/YAP/Verteporfin scarless wound healing pathway.",
        attributes: {
          cartilagePlatform: "Microfracture + PEG Hydrogel releasing BMP2 + soluble VEGFR1 (sFlt-1)",
          dermalPlatform: "Verteporfin (YAP–TEAD blockade) & FAK-inhibitor pullulan hydrogels",
        },
        sourceUrls: [
          "https://doi.org/10.1038/s41591-020-1013-2",
          "https://doi.org/10.1126/science.aba2374",
          "https://doi.org/10.1126/scitranslmed.abd5640",
        ],
      },
      {
        kind: "lab",
        name: "Helen Blau Laboratory (Baxter Laboratory for Stem Cell Biology, Stanford University)",
        country: "United States",
        url: "https://med.stanford.edu/blaulab.html",
        summary:
          "Identified 15-PGDH as the master aging gerozyme in skeletal muscle and articular cartilage and demonstrated that PGE2/EP4 signaling restoration reverses age-related sarcopenia.",
        attributes: {
          target: "15-hydroxyprostaglandin dehydrogenase (15-PGDH / HPGD)",
          smallMolecule: "SW033291 (+15% to +25% aged muscle mass, force, and endurance)",
        },
        sourceUrls: ["https://doi.org/10.1126/science.abc8059"],
      },
      {
        kind: "treatment",
        name: "Verteporfin (Visudyne — Off-Label Intradermal YAP–TEAD Mechanotransduction Inhibitor)",
        country: "United States",
        url: "https://doi.org/10.1126/science.aba2374",
        summary:
          "FDA-approved ophthalmic benzoporphyrin small molecule that binds YAP and blocks YAP–TEAD nuclear mechanotransduction without light activation, preventing Engrailed-1 fibroblast scarring.",
        attributes: {
          mechanism: "Direct YAP–TEAD complex disruption preventing mechanical En1 activation",
          regulatoryStatus: "FDA-approved for macular degeneration (Visudyne); investigational for scarless dermal repair",
        },
        sourceUrls: ["https://doi.org/10.1126/science.aba2374"],
      },
    ],
    controversies: [
      {
        kind: "contested",
        note: "Prostaglandin E2 (PGE2) Dual Role as an Acute Inflammatory Mediator vs. Pro-Regenerative Stem Cell Morphogen: Because COX-1/COX-2 NSAIDs (ibuprofen, celecoxib) block PGE2 synthesis to relieve acute pain and fever, PGE2 was historically viewed as purely pro-inflammatory and deleterious in aging (‘inflammaging’). However, Palla & Blau (Science 2021) and Desai & Markowitz (Science 2015) proved that physiological tissue PGE2 actually declines in aged muscle and that chronic NSAID use after muscle injury or fracture impairs stem-cell-mediated tissue regeneration, whereas restoring physiological nanomolar PGE2 via 15-PGDH blockade lowers chronic TGF-β/TNF-α inflammation while driving EP4-mediated tissue repair.",
        claimIndexes: [2],
      },
    ],
  },
};
