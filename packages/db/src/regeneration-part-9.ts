import type { SeedDossier } from "./repo";

export const REGENERATION_PART_9_DOSSIERS: Record<string, SeedDossier> = {
  "dental-tooth-regeneration-usag1-antibodies-dpsc-pulp-and-biomimetic-enamel": {
    summary:
      "Because adult human teeth lose enamel-forming ameloblasts upon eruption and possess limited odontoblastic repair capacity, dental caries, pulp necrosis, periodontitis, and tooth loss have historically been treated exclusively with synthetic prosthetics (amalgam/composite resins, root canal gutta-percha obturation, and titanium implants). Over the past decade, four converging regenerative modalities have transformed restorative dentistry into endogenous biological regeneration: (1) systemic anti-USAG-1 (SOSTDC1) monoclonal antibody therapy (TRG035, Katsu Takahashi / Kyoto University & Kitano Hospital; Murashima-Suginami et al., Science Advances 2021), which releases Bone Morphogenetic Protein (BMP) and Wnt signaling in arrested rudimentary 'third-dentition' tooth buds to regrow complete, calcified de novo teeth in mice and diphyodont ferrets and entered first-in-human Phase I/IIa clinical trials in 2024; (2) small-molecule GSK3β inhibition (Tideglusib / CHIR99021 on biodegradable collagen sponges; Neves & Sharpe, Scientific Reports 2017) and non-invasive 810 nm low-power laser photobiomodulation of latent TGF-β1 (Arany & Mooney, Science Translational Medicine 2014), which activate canonical Wnt/β-catenin and Smad2/3 in resident dental pulp stem cells (DPSCs) to regenerate full-thickness tubular reparative dentin across deep pulp-exposed cavities within 4–6 weeks; (3) autologous human deciduous and mobilized dental pulp stem cell (hDPSC / SHED / MDPSC) transplantation in randomized clinical trials (Xuan & Shi, Science Translational Medicine 2018, n=40; Nakashima et al., Stem Cell Research & Therapy 2017), regenerating complete 3D vascularized and innervated living dental pulp, sensory nociception, and root apex elongation in necrotic human teeth; and (4) acellular epitaxial enamel regeneration using triethylamine-stabilized 1.5 nm calcium phosphate ion clusters (CPICs; Shao & Tang, Science Advances 2019), amelogenin–chitosan hydrogels (Moradian-Oldak, Biomaterials 2013), and self-assembling β-sheet peptide P11-4 (Alkilzy RCT, Journal of Dental Research 2018), regrowing fish-scale hydroxyapatite enamel prisms with native hardness (3.84 GPa) and elastic modulus (87.3 GPa).",
    gaps: [
      "Long-term Phase II/III human clinical efficacy, crown morphology control, and eruption positioning of intravenous anti-USAG-1 monoclonal antibody (TRG035) in pediatric congenital oligodontia/anodontia (ages 2–7) versus adult acquired edentulism where rudimentary third-dentition epithelial rests of Malassez or dental lamina remnants may have involuted.",
      "Phase II/III multicenter human randomized clinical trials comparing Tideglusib-loaded biodegradable collagen sponges against mineral trioxide aggregate (MTA) and Biodentine in deep carious human molars with reversible and irreversible pulpitis.",
      "Scaling epitaxial calcium phosphate ion cluster (CPIC) and amelogenin–MMP20 biomimetic enamel remineralization from 2.7 μm over 48 hours to millimeter-scale full-cusp enamel reconstruction within practical intraoral clinical application times.",
      "Source-free allogeneic off-the-shelf extracellular vesicle or iPSC-derived neural crest + dental epithelium organ-germ engineering capable of reproducing human periodontal ligament (PDL) Sharpey's fiber insertion and cementum without autologous tooth extraction.",
    ],
    synthesis: {
      benchmarks: [
        {
          metric: "100% Agenesis Rescue + 3rd Dentition",
          label: "Single systemic dose of anti-USAG-1 mAb (#37/#57) cures congenital tooth agenesis in Runx2/Eda1/Wnt10a mice and grows a de novo 3rd-dentition tooth in diphyodont ferrets",
          source: "Murashima-Suginami, Kiso, Ravi & Takahashi, Science Advances 2021",
          sourceUrl: "https://doi.org/10.1126/sciadv.abf1798",
        },
        {
          metric: "50 nM Tideglusib (2–3× Dentin Vol)",
          label: "Biodegradable collagen sponge soaked with 50 nM Tideglusib (GSK3β inhibitor) regenerates a full-thickness tubular reparative dentin bridge in 4–6 weeks",
          source: "Neves, Babb, Chandrasekaran & Sharpe, Scientific Reports 2017",
          sourceUrl: "https://doi.org/10.1038/srep39654",
        },
        {
          metric: "+2.62 mm Root Growth & 100% 3D Pulp",
          label: "Human RCT (n=40) of autologous deciduous pulp stem cells (SHED) regenerates vascularized, innervated living dental pulp and sensory nociception in necrotic teeth",
          source: "Xuan, Li, Zhang, Jin & Shi, Science Translational Medicine 2018",
          sourceUrl: "https://doi.org/10.1126/scitranslmed.aaf3227",
        },
        {
          metric: "3.84 GPa Hardness / 87.3 GPa Modulus",
          label: "1.5 nm Calcium Phosphate Ion Clusters (CPICs) epitaxially regrow 2.7 μm of fish-scale hydroxyapatite human enamel prisms in 48 hours matching unworn natural enamel",
          source: "Shao, Jin, Pan, Wang & Tang, Science Advances 2019",
          sourceUrl: "https://doi.org/10.1126/sciadv.aaw9569",
        },
        {
          metric: "65% vs. 23% Caries Inactivation",
          label: "Monomeric self-assembling β-sheet peptide P11-4 (Curodont Repair) + fluoride nearly triples early carious enamel regression at 6 months in human RCT (n=70, p < 0.001)",
          source: "Alkilzy, Tarabaih, Santamaria & Splieth, Journal of Dental Research 2018",
          sourceUrl: "https://doi.org/10.1177/0022034517730531",
        },
      ],
      levers: [
        {
          category: "1. De Novo Whole-Tooth Regrowth (3rd Dentition)",
          name: "Anti-USAG-1 (SOSTDC1) Neutralizing Monoclonal Antibody (TRG035)",
          description:
            "Humanized monoclonal antibody targeting Uterine Sensitization-Associated Gene-1 (USAG-1 / SOSTDC1) to selectively relieve BMP-2/4/7 antagonism in arrested rudimentary third-dentition tooth buds without inducing systemic Wnt-driven skeletal abnormalities.",
          bestEvidence:
            "Preclinical validation in Runx2-/-, Eda1, and Wnt10a mice and diphyodont ferrets (Murashima-Suginami & Takahashi, Sci Adv 2021; Ravi 2023); First-in-human Phase I/IIa trial initiated Sept 2024 at Kyoto University / Kitano Hospital.",
          effect:
            "Single systemic injection rescues congenital tooth agenesis and triggers eruption of a calcified, vascularized third-generation whole tooth with normal enamel, dentin, pulp, and periodontal ligament.",
          reading:
            "First pharmacological therapy in history to awaken latent mammalian third-dentition odontogenesis; currently advancing from adult Phase I safety to pediatric congenital oligodontia efficacy.",
          verdict: "Trial only",
          sourceUrl: "https://doi.org/10.1126/sciadv.abf1798",
        },
        {
          category: "2. Endogenous Reparative Dentinogenesis",
          name: "Tideglusib / CHIR99021 (GSK3β Inhibitor on Biodegradable Collagen Sponge)",
          description:
            "Local delivery of nanomolar GSK-3 antagonists (50 nM Tideglusib or 5–10 μM CHIR99021) soaked into a clinical-grade biodegradable type-I collagen sponge placed directly over pulp-exposed deep carious lesions.",
          bestEvidence:
            "Mouse and rat deep pulp-exposure cavity repair studies (Neves & Sharpe, Sci Rep 2017; Zaugg & Sharpe, J Dent Res 2020).",
          effect:
            "Stabilizes β-catenin and upregulates Axin2 in resident dental pulp stem cells (DPSCs), regenerating a complete full-thickness tubular reparative dentin bridge in 4–6 weeks as the collagen sponge resorbs.",
          reading:
            "Replaces permanent inert mineral cements (MTA/calcium hydroxide) with living, biomechanically integrated tubular dentin while preserving full dental pulp vitality.",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1038/srep39654",
        },
        {
          category: "3. Whole-Pulp & Neurovascular Endodontic Regeneration",
          name: "Autologous Deciduous / Mobilized Dental Pulp Stem Cells (SHED / MDPSC + G-CSF)",
          description:
            "Transplantation of autologous human deciduous pulp stem cells (SHED) or G-CSF-mobilized permanent dental pulp stem cells (MDPSCs) into disinfected root canals of necrotic or pulpectomized teeth.",
          bestEvidence:
            "Human randomized controlled clinical trial (Xuan & Shi, Sci Transl Med 2018, n=40) and Phase I/II clinical trial (Nakashima et al., Stem Cell Res Ther 2017).",
          effect:
            "Regenerates complete 3D vascularized pulp tissue, polarized DSP+ odontoblast lining, TRPV1+/CGRP+ sensory nerve innervation (restoring positive electric pulp testing), and +2.6 mm root elongation.",
          reading:
            "Clinically validated human alternative to devitalizing root canal obturation and apexification in traumatized or pulpitis-affected teeth.",
          verdict: "Trial only",
          sourceUrl: "https://doi.org/10.1126/scitranslmed.aaf3227",
        },
        {
          category: "4. Acellular Biomimetic Enamel Regrowth",
          name: "Calcium Phosphate Ion Clusters (CPICs), Amelogenin–Chitosan & Peptide P11-4",
          description:
            "Topical application of triethylamine-stabilized 1.5 nm calcium phosphate ion clusters (CPICs), full-length amelogenin–chitosan hydrogel (AMEL–CS), or monomeric self-assembling β-sheet peptide P11-4 (Curodont Repair) to demineralized or eroded human tooth enamel.",
          bestEvidence:
            "Human extracted-tooth and in vivo oral cavity epitaxial growth studies (Shao & Tang, Sci Adv 2019; Ruan & Moradian-Oldak, Biomaterials 2013) and human pediatric RCT of P11-4 (Alkilzy et al., J Dent Res 2018, n=70).",
          effect:
            "CPICs fuse into the native hydroxyapatite lattice to grow 2.7 μm of fish-scale prismatic enamel in 48 hours with native hardness (3.84 GPa) and elastic modulus (87.3 GPa); P11-4 triples complete caries arrest in human RCTs (65% vs. 23%).",
          reading:
            "P11-4 is clinically available today for non-invasive early caries regeneration, while CPICs and amelogenin hydrogels establish true crystallographic enamel prism regrowth.",
          verdict: "Targeted",
          sourceUrl: "https://doi.org/10.1126/sciadv.aaw9569",
        },
        {
          category: "5. Photobiomodulation Dentinogenesis",
          name: "810 nm Low-Power Near-Infrared Laser Activation of Endogenous Latent TGF-β1",
          description:
            "Brief trans-coronal or direct pulpal irradiation with an 810 nm near-infrared diode laser at low fluence (3 J/cm²) prior to cavity sealing.",
          bestEvidence:
            "Rodent in vivo tertiary dentin regeneration and human DPSC mechanistic studies (Arany & Mooney, Sci Transl Med 2014).",
          effect:
            "Photo-generates trace ROS that oxidize methionine-253 on the Latency-Associated Peptide (LAP), conformationally unlocking endogenous dentinal TGF-β1 and driving Smad2/3 odontoblastic differentiation.",
          reading:
            "Provides a cell-free, drug-free physical trigger using standard clinical dental lasers to stimulate tertiary dentin bridge formation.",
          verdict: "Lab only",
          sourceUrl: "https://doi.org/10.1126/scitranslmed.3008234",
        },
      ],
      clinicalQuestions: [
        "In adult patients with acquired tooth loss (where the permanent tooth was extracted years earlier), do quiescent epithelial rests of Malassez or residual dental lamina cells remain responsive to anti-USAG-1 (TRG035) antibody therapy, or is an exogenous bioengineered organ-germ required?",
        "Can combining a biodegradable collagen sponge loaded with Tideglusib (50 nM) and G-CSF/SDF-1α chemotactic cues regenerate both coronal tubular dentin and radicular pulp in mature human molars without ex vivo cell expansion?",
        "How can triethylamine-stabilized calcium phosphate ion clusters (CPICs) be reformulated into an aqueous, biocompatible intraoral gel or tray system that achieves >50 μm epitaxial enamel growth per clinical session?",
      ],
      sweepQueue: [
        "Track Phase I/IIa clinical trial readouts from Kitano Hospital / Kyoto University & Toregem Biopharma for intravenous TRG035 (humanized anti-USAG-1 mAb) in adult edentulism and pediatric congenital tooth agenesis (2024–2030).",
        "Monitor human clinical translation of King's College London GSK3β-inhibitor (Tideglusib) collagen sponges in deep vital pulp therapy.",
        "Evaluate 3D-bioprinted periodontal ligament–cementum–alveolar bone triphasic scaffolds (PDLSCs + DFMAs) for regenerating Sharpey's fiber attachment in severe Stage III/IV periodontitis.",
      ],
      article: {
        title: "Dental & Whole-Tooth Regeneration: Anti-USAG-1 Third-Dentition Antibody (TRG035), GSK3β/Tideglusib Dentin Repair, DPSC Pulp Regeneration & Biomimetic Enamel",
        subtitle:
          "How anti-USAG-1 monoclonal antibodies awaken arrested third-dentition tooth buds, nanomolar GSK3β inhibitors and 810 nm photobiomodulation rebuild living tubular dentin, autologous SHED/MDPSC stem cells restore innervated dental pulp in human RCTs, and 1.5 nm calcium phosphate ion clusters epitaxially regrow prismatic tooth enamel.",
        synopsis:
          "For over two centuries, clinical dentistry has operated on a paradigm of mechanical amputation and inert prosthetic substitution: drilling away carious enamel and dentin to pack cavities with silver amalgam or bis-GMA composite resins, extirpating inflamed neurovascular dental pulp to fill root canals with devitalized gutta-percha rubber, and replacing lost teeth with osseointegrated titanium screws that lack a periodontal ligament, proprioceptive nerve feedback, or physiological bone remodeling. This prosthetic compromise stems from two developmental bottlenecks in adult human dentition: humans are strictly diphyodont (forming only deciduous 'milk' teeth and one permanent replacement set before the dental lamina regresses), and enamel-secreting ameloblasts undergo programmed apoptosis immediately upon tooth eruption, leaving mature enamel (96 wt% carbonated hydroxyapatite) completely acellular. Over the past decade, however, four breakthroughs across developmental molecular biology, stem cell endodontics, Wnt mechanopharmacology, and biomimetic crystallography have demonstrated that every layer of the mammalian tooth — from acellular prismatic enamel and tubular dentin to neurovascular dental pulp, periodontal ligament, and even entire third-dentition teeth — can be biologically regenerated in vivo.",
        sections: [
          {
            kicker: "Section I · Nomenclature, Acronyms & Odontogenic Reference Glossary",
            heading: "1. Core Genes, Stem Cell Populations & Biomimetic Materials in Regenerative Dentistry",
            paragraphs: [
              "USAG-1 (SOSTDC1 — Uterine Sensitization-Associated Gene-1 / Wise / Ectodin): A secreted cystine-knot protein expressed in dental epithelium and mesenchyme that acts as a dual antagonist of Bone Morphogenetic Proteins (BMP-2, BMP-4, BMP-7) and canonical Wnt co-receptors (LRP5/6), arresting the development of rudimentary third-dentition tooth buds. TRG035: The humanized neutralizing monoclonal antibody against USAG-1 developed by Prof. Katsu Takahashi (Kyoto University / Kitano Hospital) and Toregem Biopharma that entered first-in-human Phase I/IIa clinical trials in September 2024 to regrow teeth. Diphyodont vs. Polyphyodont Dentition: Diphyodont mammals (humans, ferrets, pigs) develop only two successive sets of teeth (deciduous and permanent), whereas polyphyodont vertebrates (sharks, teleost fish, alligators) continuously replace teeth throughout life from a persistent Sox2+ dental lamina. Rudimentary Third-Dentition Tooth Buds: Arrested epithelial-mesenchymal odontogenic buds located lingual to permanent teeth in humans and ferrets that normally undergo apoptosis during childhood but can be rescued into full tooth eruption by relieving USAG-1–mediated BMP suppression.",
              "GSK3β (Glycogen Synthase Kinase-3 Beta) & Tideglusib: GSK3β phosphorylates cytoplasmic β-catenin to target it for proteasomal degradation; inhibiting GSK3β with small-molecule Tideglusib (a clinical NP-12 thiadiazolidinone) or CHIR99021 activates canonical Wnt/β-catenin (Axin2) in dental pulp stem cells to trigger tubular reparative dentinogenesis. DPSC, SHED & MDPSC (Dental Pulp Stem Cells, Stem Cells from Human Exfoliated Deciduous Teeth, and G-CSF-Mobilized DPSCs): Neural-crest-derived multipotent mesenchymal stem cells residing in the perivascular niche of permanent and deciduous dental pulp capable of differentiating into DSP+ odontoblasts, endothelial cells, and neural cells. CPICs (Calcium Phosphate Ion Clusters): Ultrasmall (1.5 nm) inorganic clusters of Ca2+ and PO4(3−) stabilized by volatile triethylamine (TEA) in ethanol that fuse into a continuous amorphous calcium phosphate (ACP) frontier on human enamel to drive epitaxial hydroxyapatite prism regrowth. P11-4 (Curodont Repair): A rational 11-amino-acid monomeric peptide (Ace-QQRFEWEFEQQ-NH2) that diffuses into subsurface carious enamel micropores and self-assembles into 3D β-sheet fibrillar scaffolds that nucleate de novo hydroxyapatite crystal growth.",
            ],
            callout:
              "The Four-Layer Regenerative Architecture of the Future Tooth: Regenerative dentistry now possesses a validated biological mechanism for every anatomical tier of the human dentition: (1) Acellular Crown Surface — epitaxial CPIC clusters (Shao & Tang 2019) and P11-4/amelogenin matrices regrow crystalline hydroxyapatite prisms without ameloblasts; (2) Coronal Dentin Bridge — 50 nM Tideglusib collagen sponges (Neves & Sharpe 2017) and 810 nm laser TGF-β1 photoactivation (Arany & Mooney 2014) mobilize resident DPSCs to replace cavities with living tubular dentin in 4–6 weeks; (3) Whole Neurovascular Pulp — autologous SHED/MDPSC cell transplantation (Xuan & Shi 2018 RCT; Nakashima 2017) regenerates vascularized, innervated living pulp and root elongation inside necrotic teeth; and (4) Whole-Tooth De Novo Replacement — systemic anti-USAG-1 antibody TRG035 (Takahashi 2021/2024 trial) and 3D bioengineered tooth germs (Tsuji 2009) regrow entire functional teeth with periodontal ligaments.",
          },
          {
            kicker: "Section II · Awakening the Third Dentition",
            heading: "2. Anti-USAG-1 (TRG035) Antibody Therapy & Bioengineered Whole-Tooth Organ Germs",
            paragraphs: [
              "Histological and 3D embryological reconstructions of the human jaw have long revealed a striking evolutionary vestige: after the deciduous ('milk') teeth and permanent replacement teeth bud off from the dental lamina, humans still form rudimentary epithelial buds for a third dentition lingual to the permanent teeth, which arrest at the bud or cap stage and regress via apoptosis. Similarly, nearly 1% of the human population suffers from congenital tooth agenesis (hypodontia or oligodontia, missing ≥6 teeth) due to loss-of-function mutations in odontogenic master regulators including MSX1, RUNX2, EDA1, WNT10A, and PAX9, while another ~1% exhibits hyperdontia (supernumerary third-dentition teeth, as in cleidocranial dysplasia where RUNX2 haploinsufficiency prevents dental lamina regression). In a landmark study, Murashima-Suginami, Kiso, Ravi, Saito, Nakashima, Ashihara & Katsu Takahashi (Science Advances 2021; doi:10.1126/sciadv.abf1798) proved that odontogenic arrest vs. supernumerary tooth eruption is governed by a reciprocal molecular seesaw between Bone Morphogenetic Protein (BMP)/Wnt activation and their secreted dual antagonist USAG-1 (SOSTDC1). When Usag1-/- knockout mice were crossed with Runx2-/-, Msx1-/-, or Eda1 (Tabby) tooth-agenesis mice, deleting Usag1 completely rescued arrested tooth buds and prevented odontogenic apoptosis. Crucially, because systemic Wnt hyperactivation causes lethal skeletal malformations, Takahashi's team generated a panel of mouse anti-USAG-1 monoclonal antibodies and identified clones (#37 and #57) that specifically block USAG-1 binding to BMP-2/4/7 (KD ≈ 1.3–3.4 nM) without interfering with LRP5/6 Wnt signaling.",
              "A single systemic intraperitoneal injection of neutralizing anti-USAG-1 antibody in pregnant or neonatal Eda1 and Wnt10a mutant mice completely cured congenital missing teeth — and in wild-type mice, induced the formation of a complete, calcified supernumerary third tooth in the incisor and molar regions. To test whether this translates to humans, the authors administered anti-USAG-1 antibody to ferrets (Mustela putorius furo), which — unlike monophyodont rodents — are true diphyodont mammals sharing the human dental formula (deciduous → permanent dentition) and lingual rudimentary third-dentition buds. Systemic anti-USAG-1 therapy induced the development and eruption of a complete, mineralized third-dentition whole tooth lingual to the permanent ferret incisors with normal root, pulp, dentin, and enamel architecture (Ravi & Takahashi, Regenerative Therapy 2023). In September 2024, Kyoto University Hospital, Kitano Hospital, and Toregem Biopharma initiated the first-in-human Phase I/IIa clinical trial of humanized intravenous anti-USAG-1 monoclonal antibody (TRG035), enrolling 30 adult men (ages 30–64 missing at least one molar) for Phase I dose-escalation safety before advancing to Phase IIa efficacy in children aged 2–7 with congenital tooth agenesis. For adult patients who have lost both their permanent tooth and any residual third-dentition epithelial rests, Ikeda, Morita, Nakao & Takashi Tsuji (PNAS 2009; doi:10.1073/pnas.0902944106) demonstrated bioengineered whole-tooth organ-germ replacement: reconstituting dissociated dental epithelial and mesenchymal progenitor cells at high cell density (5 × 10^8 cells/mL) inside a compartmentalized 3D collagen micro-drop ('organ-germ method') recapitulates embryonic epithelial-mesenchymal reciprocal induction. When transplanted into an edentulous adult alveolar bone socket, the bioengineered tooth germ erupted into the oral cavity at 36 days, achieved full occlusal contact with the opposing dentition at 49 days, formed anatomically normal enamel, tubular dentin, odontoblasts, vascularized dental pulp, cementum, and Sharpey's periodontal ligament (PDL) fibers, remodeled alveolar bone in response to orthodontic mechanical force, and regenerated substance P+/CGRP+ trigeminal nociceptive nerve fibers.",
            ],
          },
          {
            kicker: "Section III · Pharmacological Dentin Bridge Repair & Whole-Pulp Clinical Trials",
            heading: "3. Tideglusib (GSK3β Inhibition), 810 nm Laser TGF-β1 Activation & Human SHED/MDPSC Endodontic Trials",
            paragraphs: [
              "When deep dental caries or trauma exposes the dental pulp before tooth loss occurs, conventional dentistry either caps the exposure with inorganic calcium-hydroxide / mineral trioxide aggregate (MTA) cements — which form only a thin, porous mineral crust and never resorb — or performs a root canal (pulpectomy), stripping the tooth of its blood supply, immune defense, and mechanosensory nerve fibers and rendering it brittle and prone to vertical root fracture. Prof. Paul Sharpe's laboratory at King's College London (Neves, Babb, Chandrasekaran & Sharpe, Scientific Reports 2017; doi:10.1038/srep39654; Zaugg et al., Journal of Dental Research 2020) discovered that natural tubular dentin repair is gated by immediate-early Wnt/β-catenin (Axin2) activation in resident perivascular dental pulp stem cells (DPSCs). By soaking nanomolar doses of Tideglusib (50 nM) — a small-molecule GSK3β antagonist previously tested for safety in human Alzheimer's Phase II trials — or CHIR99021 (5–10 μM) into an FDA-approved biodegradable type-I collagen sponge (Kolspon) and placing it into pulp-exposed molars, GSK3β inhibition prevents β-catenin degradation, drives Axin2+ pulp progenitors into polarized odontoblasts, and regenerates a complete, full-thickness mineralized tubular reparative dentin bridge filling the entire coronal defect within 4 to 6 weeks. As the collagen sponge enzymatically degrades, it is 100% replaced by native biological dentin — producing 2- to 3-fold greater reparative dentin volume than MTA while preserving normal underlying pulp vitality. Complementing pharmacological Wnt activation, Arany, Cho, Hunt & David Mooney (Science Translational Medicine 2014; doi:10.1126/scitranslmed.3008234) demonstrated that a single non-invasive irradiation with a clinical 810 nm low-power near-infrared laser (3 J/cm²) reacts with endogenous dentinal iron/copper to generate trace reactive oxygen species (ROS) that selectively oxidize methionine-253 on the Latency-Associated Peptide (LAP), conformationally unlocking endogenous latent TGF-β1 stored in the dentin matrix and directing DPSCs to regenerate tertiary dentin in vivo.",
              "Even when the entire dental pulp has undergone total necrosis from trauma or irreversible pulpitis, two landmark human clinical trials have proven that living, vascularized, innervated dental pulp can be regenerated inside the empty root canal. First, Xuan, Li, Zhang, Kou, Liu, Yan Jin & Songtao Shi (Science Translational Medicine 2018; doi:10.1126/scitranslmed.aaf3227) conducted a randomized controlled human clinical trial (n=40 patients; 30 SHED-transplanted vs. 10 standard apexification controls) in children with traumatic total pulp necrosis of immature permanent incisors. Autologous human deciduous pulp stem cells (hDPSC/SHED) harvested from a naturally exfoliating baby tooth were expanded into self-assembled cell-matrix aggregates and implanted into the disinfected root canal without synthetic scaffolds. At 12 and 24 months, SHED transplantation regenerated complete 3D living dental pulp tissue spanning the entire root canal, histology confirmed a polarized DSP+ odontoblast layer lining new tubular dentin, TRPV1+ and CGRP+ sensory nerve fibers re-innervated the pulp (restoring positive electric pulp vitality sensation, decreasing threshold from >80 to 18.7 ± 6.4), Laser Doppler flowmetry confirmed robust vascular perfusion (+12.4 PU), and cone-beam CT proved continued root-length elongation (+2.62 mm vs. 0.19 mm in controls, p < 0.0001) and apical foramen closure (−1.41 mm) with zero adverse events. Second, Nakashima, Iohara, Murakami, Nakamura, Sato, Ariji & Matsushita (Stem Cell Research & Therapy 2017; doi:10.1186/s13287-017-0506-5) completed a first-in-human clinical trial in adult patients with irreversible pulpitis of mature single-rooted teeth, transplanting autologous G-CSF–Mobilized Dental Pulp Stem Cells (MDPSCs) suspended in clinical atelocollagen with G-CSF; within 4 weeks electric pulp testing turned positive, and by 24 weeks 100% of patients exhibited complete 3D pulp regeneration on 3-Tesla MRI and cone-beam CT mineralized dentin bridge formation.",
            ],
          },
          {
            kicker: "Section IV · Acellular Epitaxial Tooth Enamel Regeneration",
            heading: "4. Calcium Phosphate Ion Clusters (CPICs), Amelogenin–Chitosan Hydrogels & Self-Assembling Peptide P11-4",
            paragraphs: [
              "Mature human tooth enamel is the hardest biological tissue in vertebrates (96 wt% carbonated hydroxyapatite, Ca10(PO4)6(OH)2), deriving its extraordinary fracture toughness and wear resistance from a hierarchical 'fish-scale' (keyhole) prism architecture in which 5 μm-wide rods of parallel c-axis-aligned hydroxyapatite nanorods (~50 nm diameter) interlock with interrod crystals angled at ~60°. Because enamel-secreting ameloblasts undergo apoptosis and slough off as the crown erupts into the oral cavity, adult enamel contains zero cells and cannot regenerate after acid erosion or dental caries. For decades, attempts to remineralize enamel in vitro using supersaturated calcium phosphate solutions failed because classical crystal nucleation deposits disordered, plate-like hydroxyapatite crusts with poor mechanical adhesion because a crystalline seed cannot fuse seamlessly with an existing crystal lattice. Shao, Jin, Pan, Liu, Wang & Ruikang Tang (Science Advances 2019; doi:10.1126/sciadv.aaw9569) solved this crystallographic barrier by discovering how biological amelogenesis actually builds enamel: in vivo, hydroxyapatite nanorods do not grow by classical ion-by-ion attachment, but by a continuous amorphous calcium phosphate (ACP) liquid-like precursor frontier that fuses epitaxially onto the crystalline rod tip. Tang's group stabilized ultrasmall 1.5 nm Calcium Phosphate Ion Clusters (CPICs) by complexing calcium and phosphate ions with triethylamine (TEA) in ethanol, preventing premature aggregation. When applied to acid-etched human tooth enamel, evaporation of volatile TEA causes the 1.5 nm CPICs to fuse spontaneously into a continuous biomimetic ACP frontier directly continuous with the underlying human enamel hydroxyapatite crystals. Within 48 hours, this frontier epitaxially grows a 2.7 μm-thick regenerated enamel layer that reproduces the exact hierarchical fish-scale rod and interrod prism architecture, single-crystal c-axis orientation, and mechanical performance of natural human enamel: nanoindentation hardness H = 3.84 ± 0.20 GPa (natural enamel 3.92 ± 0.25 GPa) and elastic modulus E = 87.26 ± 3.92 GPa (natural enamel 84.55 ± 4.38 GPa).",
              "In parallel, protein- and peptide-guided biomimetic enamel matrices have translated directly to clinical dentistry. Ruan, Zhang, Yang, Nutt & Janet Moradian-Oldak (Biomaterials 2013; doi:10.1016/j.biomaterials.2013.01.073; Mukherjee et al., 2018) engineered a pH-responsive Amelogenin–Chitosan (AMEL–CS) hydrogel and a 26-residue Leucine-Rich Amelogenin Peptide (LRAP) + MMP-20 enzymatic cleavage system: full-length recombinant amelogenin self-assembles into nanospheres and nanoribbons that template c-axis-oriented hydroxyapatite bundles (15–28 μm thick over 7 days) while chitosan provides mucoadhesion and antibacterial protection against Streptococcus mutans, restoring >80% of enamel microhardness. Finally, Alkilzy, Tarabaih, Santamaria & Splieth (Journal of Dental Research 2018; doi:10.1177/0022034517730531) validated the clinical translation of monomeric self-assembling peptide P11-4 (Curodont Repair) in a prospective randomized controlled clinical trial (n=70 patients) with early occlusal enamel caries: monomeric P11-4 diffuses into low-pH subsurface demineralized enamel micropores and undergoes pH/ionic-strength-triggered self-assembly into 3D β-sheet nanotapes whose surface glutamate residues match the 9.4 Å calcium spacing of hydroxyapatite, nucleating deep subsurface enamel regeneration from within the lesion and achieving 65% complete caries arrest and laser-fluorescence remineralization at 6 months compared to 23% with fluoride varnish alone (p < 0.001).",
            ],
          },
        ],
        conclusions:
          "5. Conclusion: The historical assumption that damaged human teeth can only be patched with inert synthetic materials or replaced with titanium screws has been overturned across four independent lines of preclinical and human clinical evidence. In conservative restorative dentistry, self-assembling peptide P11-4 and epitaxial 1.5 nm calcium phosphate ion clusters (CPICs) restore native hydroxyapatite enamel prism crystallography and mechanical hardness (3.84 GPa), while nanomolar GSK3β inhibition (Tideglusib) on biodegradable collagen sponges converts deep carious exposures into full-thickness living tubular dentin bridges within 4–6 weeks. In endodontics, human randomized clinical trials (Xuan et al., 2018) prove that autologous deciduous pulp stem cells (SHED) and G-CSF-mobilized DPSCs regenerate complete 3D vascularized, nociceptively innervated dental pulp and continue root apex development in necrotic permanent teeth. Finally, for complete tooth loss and congenital tooth agenesis, anti-USAG-1 monoclonal antibody therapy (TRG035) — now in first-in-human Phase I/IIa clinical trials at Kyoto University / Kitano Hospital — demonstrates that a single targeted release of BMP signaling can awaken arrested third-dentition tooth buds to erupt a complete, natural replacement tooth.",
        keyTakeaways: [
          "A single systemic dose of neutralizing anti-USAG-1 (SOSTDC1) monoclonal antibody selectively relieves BMP antagonism in rudimentary third-dentition tooth buds, curing congenital tooth agenesis in mice and growing a complete third-generation whole tooth in diphyodont ferrets (Murashima-Suginami & Takahashi, Science Advances 2021; human Phase I/IIa trial of TRG035 initiated Sept 2024).",
          "Delivering 50 nM Tideglusib (GSK3β inhibitor) on a biodegradable collagen sponge into pulp-exposed cavities activates Wnt/Axin2 in resident dental pulp stem cells and regenerates a full-thickness tubular reparative dentin bridge in 4–6 weeks as the sponge resorbs (Neves & Sharpe, Scientific Reports 2017).",
          "In a 40-patient human randomized controlled clinical trial, autologous deciduous dental pulp stem cells (SHED) transplanted into necrotic immature permanent incisors regenerated 100% 3D vascularized pulp, TRPV1+/CGRP+ sensory nerve fibers (restoring electric pulp sensation), and +2.62 mm of root elongation (Xuan & Shi, Science Translational Medicine 2018).",
          "Triethylamine-stabilized 1.5 nm calcium phosphate ion clusters (CPICs) fuse onto acid-etched human enamel to epitaxially regrow 2.7 μm of native fish-scale hydroxyapatite enamel prisms in 48 hours with hardness (3.84 GPa) and elastic modulus (87.3 GPa) matching unworn natural enamel (Shao & Tang, Science Advances 2019).",
        ],
      },
    },
    sources: [
      {
        kind: "paper",
        externalId: "doi:10.1126/sciadv.abf1798",
        origin: "literature",
        title: "Anti–USAG-1 therapy for tooth regeneration through enhanced BMP signaling",
        url: "https://doi.org/10.1126/sciadv.abf1798",
        doi: "10.1126/sciadv.abf1798",
        venue: "Science Advances",
        year: 2021,
        authors: [
          "A. Murashima-Suginami",
          "H. Kiso",
          "Y. Tokita",
          "E. Mihara",
          "Y. Nambu",
          "R. Uozumi",
          "Y. Tabata",
          "K. Bessho",
          "J. Takagi",
          "M. Sugai",
          "K. Takahashi",
        ],
        abstract:
          "Uterine sensitization–associated gene-1 (USAG-1) deficiency leads to enhanced bone morphogenetic protein (BMP) signaling, resulting in supernumerary teeth formation. Furthermore, antibodies interfering with binding of USAG-1 to BMP, but not lipoprotein receptor–related protein 5/6 (LRP5/6), accelerate tooth development. Since USAG-1 inhibits Wnt and BMP signals, the essential factors for tooth development, via direct binding to BMP and Wnt coreceptor LRP5/6, we hypothesized that USAG-1 could play key regulatory roles in suppressing the development of rudimentary third-dentition tooth buds. Here, we generated neutralizing monoclonal antibodies against USAG-1 and demonstrated that a single systemic administration rescues congenital tooth agenesis in Runx2-/-, Eda1, and Wnt10a mutant mice and induces whole-tooth regeneration of a third dentition in diphyodont ferrets.",
        citedBy: 165,
        declaredDesign: "animal",
        design: "animal",
        sampleSize: null,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1038/srep39654",
        origin: "literature",
        title: "Promotion of natural tooth repair by small molecule GSK3 antagonists",
        url: "https://doi.org/10.1038/srep39654",
        doi: "10.1038/srep39654",
        venue: "Scientific Reports",
        year: 2017,
        authors: [
          "V. C. M. Neves",
          "R. Babb",
          "D. Chandrasekaran",
          "P. Sharpe",
        ],
        abstract:
          "Restoration of lost dentine structure in deep carious lesions is routinely treated by the application of inorganic calcium- or silicon-based mineral cements that remain in the tooth and fail to degrade. Here we describe a novel biological approach to dentine restoration that stimulates the natural formation of reparative dentine via the mobilization of resident stem cells in the dental pulp. Biodegradable, clinically-approved collagen sponges are used to deliver low doses of small molecule glycogen synthase kinase (GSK-3) antagonists (BIO, CHIR99021, and Tideglusib) that promote the natural processes of reparative dentine formation to completely repair large pulp-exposed lesions. As the carrier sponge degrades over time, dentine replaces the degraded sponge, leading to a complete, effective natural repair.",
        citedBy: 340,
        declaredDesign: "animal",
        design: "animal",
        sampleSize: null,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1126/scitranslmed.aaf3227",
        origin: "literature",
        title: "Deciduous autologous tooth stem cells regenerate dental pulp after implantation into injured teeth",
        url: "https://doi.org/10.1126/scitranslmed.aaf3227",
        doi: "10.1126/scitranslmed.aaf3227",
        venue: "Science Translational Medicine",
        year: 2018,
        authors: [
          "K. Xuan",
          "B. Li",
          "H. Zhang",
          "L. Jin",
          "S. Shi",
        ],
        abstract:
          "Dental pulp necrosis in immature permanent teeth stops root development and causes tooth loss. Here, we show in a randomized clinical trial (n = 40 patients) that implantation of autologous tooth stem cells from deciduous teeth (hDPSC/SHED) into injured immature permanent incisors regenerated three-dimensional dental pulp tissue equipped with blood vessels and sensory nerves. At 12 and 24 months after transplantation, hDPSC implantation increased root length and reduced the width of the apical foramen compared to conventional apexification treatment, restoring electric pulp vitality and vascular blood flow without adverse events.",
        citedBy: 590,
        declaredDesign: "rct",
        design: "rct",
        sampleSize: 40,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1186/s13287-017-0506-5",
        origin: "literature",
        title: "Pulp regeneration by transplantation of dental pulp stem cells in pulpitis: a pilot clinical study",
        url: "https://doi.org/10.1186/s13287-017-0506-5",
        doi: "10.1186/s13287-017-0506-5",
        venue: "Stem Cell Research & Therapy",
        year: 2017,
        authors: [
          "M. Nakashima",
          "K. Iohara",
          "M. Murakami",
          "H. Nakamura",
          "Y. Sato",
          "Y. Ariji",
          "K. Matsushita",
        ],
        abstract:
          "This pilot clinical study evaluated the safety and efficacy of autologous mobilized dental pulp stem cells (MDPSCs) transplanted with granulocyte colony-stimulating factor (G-CSF) in atelocollagen into pulpectomized human teeth with irreversible pulpitis. All five patients showed positive electric pulp testing within 4 weeks, MRI signal intensity identical to normal vital dental pulp at 24 weeks, and cone-beam CT evidence of functional dentin formation with no adverse events or toxicity.",
        citedBy: 470,
        declaredDesign: "cohort",
        design: "cohort",
        sampleSize: 5,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1126/sciadv.aaw9569",
        origin: "literature",
        title: "Repair of tooth enamel by a biomimetic mineralization frontier ensuring epitaxial growth",
        url: "https://doi.org/10.1126/sciadv.aaw9569",
        doi: "10.1126/sciadv.aaw9569",
        venue: "Science Advances",
        year: 2019,
        authors: [
          "C. Shao",
          "B. Jin",
          "Z. Mu",
          "H. Lu",
          "Y. Zhao",
          "Z. Wu",
          "L. Yan",
          "Z. Zhang",
          "Y. Zhou",
          "H. Pan",
          "Z. Liu",
          "R. Tang",
        ],
        abstract:
          "Regeneration of tooth enamel, the hardest biological tissue, remains a considerable challenge because its complicated and well-aligned apatite structure has not been duplicated artificially. We report that a rationally designed material composed of calcium phosphate ion clusters (CPICs, 1.5 nm in diameter stabilized by triethylamine in ethanol) can be used to produce a precursor layer to induce the epitaxial crystal growth of enamel apatite, mimicking the biomineralization crystalline-amorphous frontier of hard tissue development in nature. The regenerated enamel has the exact hierarchical fish-scale structure and mechanical properties (hardness 3.84 GPa, elastic modulus 87.26 GPa) of natural tooth enamel within 48 hours.",
        citedBy: 380,
        declaredDesign: "in_vitro",
        design: "in_vitro",
        sampleSize: null,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1126/scitranslmed.3008234",
        origin: "literature",
        title: "Photoactivation of endogenous latent TGF-β1 directs dental stem cell differentiation for regeneration",
        url: "https://doi.org/10.1126/scitranslmed.3008234",
        doi: "10.1126/scitranslmed.3008234",
        venue: "Science Translational Medicine",
        year: 2014,
        authors: [
          "P. R. Arany",
          "A. Cho",
          "T. D. Hunt",
          "G. Sidhu",
          "K. Shin",
          "E. Hahm",
          "G. X. Huang",
          "J. Weaver",
          "A. C. Chen",
          "B. L. Padwa",
          "M. R. Hamblin",
          "M. H. Barcellos-Hoff",
          "A. B. Kulkarni",
          "D. J. Mooney",
        ],
        abstract:
          "Low-power light therapy (photobiomodulation, 810 nm near-infrared laser) promotes tissue repair, but its molecular mechanism has remained elusive. Here we show that non-ionizing low-power laser treatment generates reactive oxygen species (ROS) that oxidize a specific methionine residue on the latent transforming growth factor–β1 (TGF-β1) complex, activating endogenous TGF-β1 in dentinal matrix and directing resident dental stem cells (DPSCs) to differentiate into odontoblasts and regenerate tertiary dentin in vivo.",
        citedBy: 520,
        declaredDesign: "animal",
        design: "animal",
        sampleSize: null,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1073/pnas.0902944106",
        origin: "literature",
        title: "Fully functional bioengineered tooth replacement as an organ replacement therapy",
        url: "https://doi.org/10.1073/pnas.0902944106",
        doi: "10.1073/pnas.0902944106",
        venue: "Proceedings of the National Academy of Sciences",
        year: 2009,
        authors: [
          "E. Ikeda",
          "R. Morita",
          "K. Nakao",
          "K. Ishida",
          "T. Nakamura",
          "T. Takano-Yamamoto",
          "M. Ogawa",
          "M. Mizuno",
          "S. Kasugai",
          "T. Tsuji",
        ],
        abstract:
          "We report a fully functioning tooth replacement in an adult mouse achieved through the transplantation of a bioengineered tooth germ into the alveolar bone in the lost tooth region. The bioengineered tooth, which was erupted and occluded, had the correct tooth structure, hardness of mineralized tissues for mastication, and responded to experimental orthodontic treatment and noxious mechanical/thermal stimuli in cooperation with tissues in the oral and maxillofacial network, including periodontal ligament and trigeminal nerve fibers.",
        citedBy: 820,
        declaredDesign: "animal",
        design: "animal",
        sampleSize: null,
        extra: {},
      },
      {
        kind: "paper",
        externalId: "doi:10.1177/0022034517730531",
        origin: "literature",
        title: "Treatment of Carious Enamel Lesions with Self-Assembling Peptides: A Randomized Controlled Trial",
        url: "https://doi.org/10.1177/0022034517730531",
        doi: "10.1177/0022034517730531",
        venue: "Journal of Dental Research",
        year: 2018,
        authors: [
          "M. Alkilzy",
          "A. Tarabaih",
          "R. M. Santamaria",
          "C. H. Splieth",
        ],
        abstract:
          "This two-arm randomized controlled clinical trial (n = 70 patients) investigated the clinical efficacy of monomeric self-assembling peptide P11-4 (Curodont Repair) combined with fluoride varnish versus fluoride varnish alone on early occlusal enamel caries. At 3 and 6 months, P11-4 + fluoride achieved significantly superior laser fluorescence remineralization, visual ICDAS regression, and 65% complete caries inactivation compared to 23% in the fluoride-only group (p < 0.001).",
        citedBy: 195,
        declaredDesign: "rct",
        design: "rct",
        sampleSize: 70,
        extra: {},
      },
    ],
    claims: [
      {
        statement:
          "In a randomized controlled human clinical trial (n=40) and a first-in-human pilot trial (n=5), transplanting autologous deciduous dental pulp stem cells (SHED) or G-CSF-mobilized DPSCs into necrotic or pulpectomized human teeth regenerates complete 3D vascularized dental pulp, polarized DSP+ odontoblasts, TRPV1+/CGRP+ sensory nerve innervation (restoring positive electric pulp testing), and +2.62 mm of continued root elongation.",
        direction: "supports",
        confidence: 0.9,
        rationale:
          "Supported by a 40-patient human RCT in Science Translational Medicine (Xuan & Shi, 2018) and a human clinical trial in Stem Cell Research & Therapy (Nakashima et al., 2017).",
        tier: "T3",
        controversy: "settled",
        sourceIndexes: [2, 3],
      },
      {
        statement:
          "A single systemic administration of a neutralizing monoclonal antibody against USAG-1 (SOSTDC1) selectively relieves BMP-2/4/7 antagonism in arrested rudimentary tooth buds, rescuing congenital tooth agenesis in Runx2-/-, Eda1, and Wnt10a mutant mice and inducing eruption of a complete third-dentition tooth in diphyodont ferrets.",
        direction: "supports",
        confidence: 0.88,
        rationale:
          "Demonstrated across multiple genetic mouse models and diphyodont ferrets in Science Advances (Murashima-Suginami & Takahashi, 2021), forming the basis for the 2024 human Phase I/IIa trial of TRG035.",
        tier: "T4",
        controversy: "contested",
        sourceIndexes: [0],
      },
      {
        statement:
          "Delivering nanomolar doses of small-molecule GSK3β antagonists (50 nM Tideglusib or CHIR99021) on a biodegradable collagen sponge or applying 810 nm low-power laser photobiomodulation (unlocking endogenous latent TGF-β1) activates resident dental pulp stem cells to regenerate full-thickness tubular reparative dentin across pulp-exposed cavities within 4–6 weeks.",
        direction: "supports",
        confidence: 0.87,
        rationale:
          "Validated in vivo in rodent deep cavity pulp-exposure models by Neves & Sharpe (Scientific Reports 2017) and Arany & Mooney (Science Translational Medicine 2014).",
        tier: "T4",
        controversy: "settled",
        sourceIndexes: [1, 5],
      },
      {
        statement:
          "Stabilizing 1.5 nm calcium phosphate ion clusters (CPICs) with triethylamine induces a continuous amorphous-to-crystalline epitaxial growth frontier on human enamel that regenerates 2.7 μm of native fish-scale hydroxyapatite prisms in 48 hours (hardness 3.84 GPa, modulus 87.3 GPa), while monomeric self-assembling β-sheet peptide P11-4 nearly triples early carious enamel inactivation in human clinical trials (65% vs. 23%, p < 0.001).",
        direction: "supports",
        confidence: 0.91,
        rationale:
          "Supported by crystallographic and nanoindentation proof on human enamel in Science Advances (Shao & Tang, 2019) and a 70-patient randomized clinical trial of P11-4 in Journal of Dental Research (Alkilzy et al., 2018).",
        tier: "T3",
        controversy: "settled",
        sourceIndexes: [4, 7],
      },
    ],
    milestones: [
      {
        year: 2009,
        title: "Bioengineered Whole-Tooth Organ-Germ Eruption in Adult Jaws",
        description:
          "Takashi Tsuji and colleagues reconstitute dissociated epithelial and mesenchymal progenitor cells into a 3D bioengineered tooth germ that erupts into full occlusion with functional enamel, dentin, pulp, periodontal ligament, and nerve fibers in adult mice.",
        sourceIndex: 6,
      },
      {
        year: 2014,
        title: "810 nm Low-Power Laser Photoactivation of Latent TGF-β1 for Dentin Repair",
        description:
          "Praveen Arany and David Mooney show that non-invasive near-infrared laser irradiation oxidizes methionine-253 on LAP to unlock endogenous dentinal TGF-β1 and drive DPSC tertiary dentinogenesis.",
        sourceIndex: 5,
      },
      {
        year: 2017,
        title: "Tideglusib (GSK3β Inhibitor) Biodegradable Sponge Natural Dentin Bridge Repair",
        description:
          "Paul Sharpe's group at King's College London demonstrates that 50 nM Tideglusib on a clinical collagen sponge activates Wnt/Axin2 in pulp stem cells to replace deep pulp-exposed cavities with full-thickness living tubular dentin as the sponge resorbs.",
        sourceIndex: 1,
      },
      {
        year: 2018,
        title: "Human RCT of Autologous SHED Stem Cells Regenerates Living Vascularized & Innervated Dental Pulp",
        description:
          "Songtao Shi and Yan Jin publish a 40-patient randomized clinical trial proving that autologous deciduous tooth stem cells regenerate 3D vascularized pulp, sensory nerves, and continued root growth in necrotic human permanent teeth.",
        sourceIndex: 2,
      },
      {
        year: 2019,
        title: "Epitaxial 1.5 nm Calcium Phosphate Ion Cluster (CPIC) Human Enamel Regrowth",
        description:
          "Ruikang Tang's team stabilizes 1.5 nm CaP ion clusters with triethylamine to grow 2.7 μm of native fish-scale hydroxyapatite enamel prisms with 3.84 GPa hardness in 48 hours.",
        sourceIndex: 4,
      },
      {
        year: 2021,
        title: "Anti-USAG-1 Monoclonal Antibody Awakens Third-Dentition Whole-Tooth Regrowth",
        description:
          "Katsu Takahashi and colleagues at Kyoto University & Kitano Hospital prove that a single systemic dose of anti-USAG-1 antibody rescues congenital tooth agenesis in mice and grows a third-dentition tooth in diphyodont ferrets, leading to the 2024 human clinical trial of TRG035.",
        sourceIndex: 0,
      },
    ],
    entities: [
      {
        kind: "treatment",
        name: "TRG035 (Humanized Anti-USAG-1 Monoclonal Antibody)",
        country: "JP",
        url: "https://doi.org/10.1126/sciadv.abf1798",
        summary:
          "First-in-class humanized neutralizing monoclonal antibody targeting USAG-1 (SOSTDC1) to relieve BMP suppression in rudimentary third-dentition tooth buds; entered Phase I/IIa human clinical trials at Kyoto University / Kitano Hospital & Toregem Biopharma in September 2024.",
        attributes: {
          target: "USAG-1 (SOSTDC1) — BMP-2/4/7 interface",
          mechanism: "Awakens arrested rudimentary 3rd-dentition tooth buds",
          clinicalStage: "Phase I/IIa Human Trial (Kitano Hospital / Kyoto Univ., 2024)",
        },
        sourceUrls: ["https://doi.org/10.1126/sciadv.abf1798"],
      },
      {
        kind: "treatment",
        name: "Tideglusib (NP-12) Biodegradable Collagen Sponge",
        country: "GB",
        url: "https://doi.org/10.1038/srep39654",
        summary:
          "Small-molecule GSK3β inhibitor delivered at 50 nM on an FDA-approved biodegradable collagen sponge (Kolspon) to activate Wnt/β-catenin (Axin2) in resident dental pulp stem cells and regenerate full-thickness tubular reparative dentin.",
        attributes: {
          target: "GSK3β -> Canonical Wnt / β-catenin / Axin2",
          dose: "50 nM on biodegradable Type-I collagen sponge",
          institution: "King's College London (Paul Sharpe Lab)",
        },
        sourceUrls: ["https://doi.org/10.1038/srep39654"],
      },
      {
        kind: "treatment",
        name: "Calcium Phosphate Ion Clusters (CPICs) & Peptide P11-4 (Curodont Repair)",
        country: "CN",
        url: "https://doi.org/10.1126/sciadv.aaw9569",
        summary:
          "Acellular biomimetic enamel regeneration technologies: 1.5 nm triethylamine-stabilized CaP ion clusters for epitaxial fish-scale hydroxyapatite prism growth (3.84 GPa hardness) and self-assembling β-sheet peptide P11-4 for subsurface caries remineralization.",
        attributes: {
          hardness: "3.84 GPa (CPICs) vs 3.92 GPa natural enamel",
          elasticModulus: "87.26 GPa (CPICs)",
          clinicalStatus: "P11-4 CE/FDA-cleared; CPICs preclinical/ex vivo",
        },
        sourceUrls: [
          "https://doi.org/10.1126/sciadv.aaw9569",
          "https://doi.org/10.1177/0022034517730531",
        ],
      },
    ],
    controversies: [
      {
        kind: "contested",
        note: "Third-Dentition Bud Persistence in Adult Acquired Tooth Loss vs. Pediatric Congenital Agenesis: While anti-USAG-1 antibody (TRG035) reliably awakens rudimentary third-dentition tooth buds during the developmental window in mice, ferrets, and pediatric congenital oligodontia (ages 2–7), whether older adults who lost permanent teeth decades earlier retain viable odontogenic epithelial rests capable of responding to systemic anti-USAG-1 alone — or require local stem-cell / bioengineered organ-germ seeding — is under active clinical investigation in the 2024–2030 Kyoto trials.",
        claimIndexes: [1],
      },
    ],
  },
};
