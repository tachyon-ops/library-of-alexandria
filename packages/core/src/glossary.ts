export interface GlossaryEntry {
  term: string;
  domain: string;
  synopsis: string;
  whyItMatters?: string;
  etymology?: string;
}

interface RawGlossaryDef extends GlossaryEntry {
  aliases?: string[];
}

const CURATED_GLOSSARY: RawGlossaryDef[] = [
  {
    term: "Autologous",
    aliases: ["autologously"],
    domain: "Reproductive Biology & Medicine",
    synopsis:
      "Derived from your own body, tissues, or genetic material — as opposed to coming from a third-party donor.",
    whyItMatters:
      "In fertility, autologous IVF means using the intended mother's own eggs and the intended father's own sperm, preserving 100% of both parents' nuclear DNA.",
    etymology: "Greek autos ('self') + logos ('relation, origin').",
  },
  {
    term: "Allogeneic",
    aliases: ["allogenic", "heterologous"],
    domain: "Reproductive Biology & Medicine",
    synopsis:
      "Originating from another person of the same species (such as a third-party egg, sperm, or tissue donor).",
    whyItMatters:
      "In maternal spindle transfer, an enucleated allogeneic donor egg provides only the cellular cytoplasm/mitochondria while the nuclear chromosomes remain autologous.",
    etymology: "Greek allos ('other') + genos ('kind, race, origin').",
  },
  {
    term: "Oocyte (Egg Cell)",
    aliases: ["oocyte", "oocytes", "ovum", "ova", "ooplasm", "ooplasmic"],
    domain: "Reproductive Biology",
    synopsis:
      "A female germ cell (egg) inside the ovary that carries the mother's 23 chromosomes and all the cellular energy machinery needed to start an embryo.",
    whyItMatters:
      "Human oocytes are formed before birth and remain paused in cell division for decades; rescuing oocyte energy and chromosome alignment is the central focus of frontier fertility research.",
    etymology: "Greek oion ('egg') + kytos ('cell, vessel').",
  },
  {
    term: "Oogonia",
    aliases: ["oogonium", "oogenesis"],
    domain: "Reproductive Biology",
    synopsis:
      "Early precursor germ cells in the ovary that multiply and develop into immature oocytes (eggs).",
    whyItMatters:
      "In Vitro Gametogenesis (IVG) aims to reprogram adult skin or blood cells into oogonia and then mature them into functional eggs in the lab.",
    etymology: "Greek oion ('egg') + gone ('generation, offspring').",
  },
  {
    term: "Zygote",
    aliases: ["zygotes", "zygotic"],
    domain: "Embryology",
    synopsis:
      "The very first single-celled fertilized egg formed the moment a sperm fuses with an oocyte, uniting the mother's and father's chromosomes.",
    whyItMatters:
      "During the zygote stage (Day 1), the two parental pronuclei are visible before merging to begin embryonic cell division.",
    etymology: "Greek zygotos ('yoked, joined together').",
  },
  {
    term: "Cleavage Stage (Day 2–3 Embryo)",
    aliases: ["cleavage", "blastomere", "blastomeres", "morula"],
    domain: "Embryology",
    synopsis:
      "The first 72 hours after fertilization when the zygote divides into 2, 4, and then 8 cells without growing in overall size.",
    whyItMatters:
      "Until the 8-cell stage (Day 3), the embryo relies almost entirely on the mother's egg cytoplasm and mitochondria before activating its own combined genome.",
  },
  {
    term: "Blastocyst (Day 5–6 Embryo)",
    aliases: ["blastocyst", "blastocysts", "blastocoel"],
    domain: "Embryology",
    synopsis:
      "An advanced 5- to 6-day-old embryo containing 100–200 cells organized into two distinct parts: the inner cell mass (which becomes the baby) and the trophectoderm (which becomes the placenta).",
    whyItMatters:
      "Reaching the blastocyst stage proves the embryo successfully activated its own DNA, though in low-yield cycles some fragile embryos fare better in the uterus than in a Day-5 lab dish.",
    etymology: "Greek blastos ('sprout, bud') + kystis ('sac, bladder').",
  },
  {
    term: "Trophectoderm",
    aliases: ["trophoblast", "trophectodermal"],
    domain: "Embryology",
    synopsis:
      "The outer layer of cells surrounding a blastocyst that implants into the uterine lining and forms the placenta.",
    whyItMatters:
      "During PGT-A genetic testing, 5–8 cells are biopsied from the trophectoderm rather than the inner cell mass.",
    etymology: "Greek trophe ('nourishment') + ektos ('outside') + derma ('skin').",
  },
  {
    term: "Inner Cell Mass (ICM)",
    aliases: ["icm", "embryoblast"],
    domain: "Embryology",
    synopsis:
      "The cluster of cells inside a blastocyst that develops directly into the fetus itself.",
    whyItMatters:
      "Even when the outer trophectoderm shows mosaic chromosome errors, the inner cell mass can sometimes self-correct and form a chromosomally normal baby.",
  },
  {
    term: "Gardner Blastocyst Grading (Expansion 1–6, ICM A–C, TE A–C: AA, AB, BA, BB, BC)",
    aliases: ["gardner", "4aa", "5aa", "3aa", "4ab", "4ba", "4bb", "3bb", "5bb", "4bc", "aa/bb", "bb/aa"],
    domain: "Clinical Embryology",
    synopsis:
      "The standard three-part blastocyst scoring system (e.g., 4AA or 4BB): a number from 1 to 6 for cavity expansion and hatching, a first letter (A, B, or C) for the Inner Cell Mass (fetus-forming cells), and a second letter (A, B, or C) for the Trophectoderm (placenta-forming cells).",
    whyItMatters:
      "AA, AB, BA, and BB blastocysts all have high implantation potential; however, morphological grade only weakly predicts chromosomal euploidy in women over 40, where a 4BB euploid embryo outperforms a 4AA aneuploid embryo, and trophectoderm grade correlates slightly more strongly with implantation than ICM grade.",
  },
  {
    term: "Pronuclear Scoring (2PN, 1PN, 0PN & 3PN Fertilisation Check)",
    aliases: ["2pn", "1pn", "0pn", "3pn", "pronucleus", "pronuclei", "pronuclear", "1pn/2pn", "2pn/1pn"],
    domain: "Clinical Embryology",
    synopsis:
      "The fertilisation check performed 16–18 hours after ICSI or IVF to count pronuclei inside the zygote: 2PN (two pronuclei, one maternal and one paternal) is normal fertilisation; 1PN has a single visible pronucleus; 0PN has none visible at check; and 3PN is triploid (three pronuclei).",
    whyItMatters:
      "While 3PN zygotes are chromosomally triploid and excluded from transfer, 30–50% of 1PN and 0PN zygotes that reach the blastocyst stage (especially after conventional IVF or asynchronous pronuclear fading) are actually normal biparental diploids that can be rescued via SNP-based PGT-A and produce healthy live births.",
  },
  {
    term: "Oocyte Nuclear Maturity & Morphology (MII, MI, GV & Istanbul Consensus)",
    aliases: ["gv", "polar body", "perivitelline", "ooplasm", "zona pellucida", "dysmorphisms"],
    domain: "Clinical Embryology",
    synopsis:
      "Assessment of retrieved oocytes before insemination: nuclear maturity classifies eggs as Metaphase II (MII, mature with extruded first polar body, ready for ICSI), Metaphase I (MI, immature without polar body), or Germinal Vesicle (GV, arrested in Prophase I), alongside cytoplasmic and extracytoplasmic morphology.",
    whyItMatters:
      "Only MII oocytes can be fertilized immediately, though immature GV/MI oocytes can sometimes be rescued via engineered Ovarian Support Cell IVM; most mild cytoplasmic variations do not prevent healthy live birth, whereas giant oocytes and smooth endoplasmic reticulum (SER) discs carry specific clinical cautions.",
  },
  {
    term: "Euploid",
    aliases: ["euploidy"],
    domain: "Genetics",
    synopsis:
      "Having the exact, balanced number of chromosomes required for normal human development (46 chromosomes: 23 pairs).",
    whyItMatters:
      "Once a confirmed euploid blastocyst is transferred, implantation and live birth rates (~50–65%) are largely independent of maternal age.",
    etymology: "Greek eu ('good, true, even') + ploos ('fold, multiple').",
  },
  {
    term: "Aneuploidy (Aneuploid)",
    aliases: ["aneuploidy", "aneuploid", "aneuploidies", "trisomy", "monosomy"],
    domain: "Genetics",
    synopsis:
      "Having an extra or missing chromosome in an egg, sperm, or embryo (for example, 45 or 47 chromosomes instead of 46).",
    whyItMatters:
      "Age-related errors in how chromosomes separate inside the egg are the primary cause of failed implantation and miscarriage after age 40.",
    etymology: "Greek an- ('not') + eu ('even') + ploos ('fold').",
  },
  {
    term: "Mosaicism (Mosaic Embryo)",
    aliases: ["mosaic", "mosaicism", "mosaics"],
    domain: "Genetics & Embryology",
    synopsis:
      "An embryo that contains a mixture of both chromosomally normal (euploid) cells and abnormal (aneuploid) cells.",
    whyItMatters:
      "Human embryos can often self-correct mosaicism by pushing abnormal cells out into the placenta while normal cells form a healthy baby.",
  },
  {
    term: "Meiosis & Meiotic Spindle",
    aliases: ["meiosis", "meiotic", "spindle", "metaphase", "mii"],
    domain: "Cell Biology & Genetics",
    synopsis:
      "Meiosis is the specialized cell division that halves an egg or sperm's chromosomes from 46 to 23. The meiotic spindle is the delicate network of protein fibers that lines up and pulls those chromosomes apart.",
    whyItMatters:
      "The meiotic spindle requires huge amounts of mitochondrial ATP energy and NAD+/SIRT2 activity to separate chromosomes cleanly without errors.",
    etymology: "Greek meiosis ('lessening, halving').",
  },
  {
    term: "Cohesin",
    aliases: ["cohesins"],
    domain: "Molecular Biology",
    synopsis:
      "Molecular protein rings that act like glue holding chromosome pairs together inside a woman's eggs from before birth until ovulation.",
    whyItMatters:
      "Because cohesin rings gradually weaken over 40+ years, chromosomes can drift apart prematurely during ovulation, causing aneuploidy.",
  },
  {
    term: "Nondisjunction",
    aliases: ["non-disjunction", "missegregation"],
    domain: "Genetics",
    synopsis:
      "The failure of paired chromosomes to separate evenly during cell division, leaving one daughter cell with an extra chromosome and the other missing one.",
    whyItMatters:
      "Stabilizing the egg's energy supply (via mitochondria, CoQ10, NMN, and spermidine) aims to prevent nondisjunction during oocyte maturation.",
  },
  {
    term: "Mitochondria & mtDNA",
    aliases: ["mitochondria", "mitochondrion", "mitochondrial", "mtdna"],
    domain: "Cell Biology",
    synopsis:
      "The microscopic power plants inside every cell that generate ATP (cellular energy). They carry a tiny circular loop of 37 metabolic genes (mtDNA), separate from the 20,000+ nuclear genes that determine who we are.",
    whyItMatters:
      "A mature egg contains ~100,000 to 500,000 mitochondria — more than any other cell in the body — to power fertilization and early embryo growth.",
    etymology: "Greek mitos ('thread') + khondrion ('granule').",
  },
  {
    term: "Maternal Spindle Transfer (MST)",
    aliases: ["mst", "nuclear", "enucleated", "enucleation", "karyoplast", "cytoplast"],
    domain: "Frontier Reproductive Technology",
    synopsis:
      "A micromanipulation technique where the mother's nuclear chromosomes (spindle) are removed from her egg and placed into a healthy donor egg whose own nucleus has been removed (enucleated), then fertilized with the father's sperm.",
    whyItMatters:
      "Allows a couple to have a child with 100% of their own nuclear genetic heritage (all 46 chromosomes) while using young donor cytoplasm/mitochondria as cellular battery support.",
  },
  {
    term: "Pronuclear Transfer (PNT)",
    aliases: ["pnt", "pronuclei", "pronucleus", "pronuclear"],
    domain: "Frontier Reproductive Technology",
    synopsis:
      "A mitochondrial replacement technique performed just after fertilization: the mother's and father's paired pronuclei (containing 100% of their chromosomes) are transferred into an enucleated donor zygote with healthy cytoplasm.",
    whyItMatters:
      "Rescues embryos that otherwise stop dividing due to cytoplasmic energy exhaustion while preserving both parents' genetic identity.",
  },
  {
    term: "Cytoplasm (Ooplasm)",
    aliases: ["cytoplasm", "cytoplasmic"],
    domain: "Cell Biology",
    synopsis:
      "The gel-like fluid and organelles (including mitochondria, proteins, and nutrients) inside a cell that surround the nucleus.",
    whyItMatters:
      "In tissue-only donor procedures like Spindle Transfer, the donor contributes only the cytoplasm (the cellular workspace), not the nuclear genome.",
    etymology: "Greek kytos ('cell') + plasma ('something molded').",
  },
  {
    term: "Heteroplasmy",
    aliases: ["heteroplasmic", "homoplasmy"],
    domain: "Genetics",
    synopsis:
      "The presence of more than one type of mitochondrial DNA within a single cell (for example, a small carryover of maternal mitochondria alongside donor mitochondria).",
    whyItMatters:
      "In Maternal Spindle Transfer trials, embryologists minimize maternal mitochondrial carryover to <1% so the cell's energy machinery remains uniform.",
  },
  {
    term: "Mitophagy & Autophagy",
    aliases: ["mitophagy", "autophagy", "autophagic"],
    domain: "Geroscience & Cell Biology",
    synopsis:
      "The cell's built-in recycling and self-cleaning system. Autophagy clears damaged proteins; mitophagy specifically identifies and recycles worn-out, defective mitochondria.",
    whyItMatters:
      "Compounds like spermidine and low-dose rapamycin activate mitophagy/autophagy in aging ovaries, clearing out damaged mitochondria that release toxic free radicals.",
    etymology: "Greek autos ('self') / mitos ('mitochondria') + phagein ('to eat').",
  },
  {
    term: "mTOR & Rapamycin (Sirolimus)",
    aliases: ["mtor", "mtorc1", "rapamycin", "sirolimus", "vibrant"],
    domain: "Geroscience & Longevity",
    synopsis:
      "mTOR (mechanistic target of rapamycin) is a master cellular nutrient sensor that controls cell growth and aging. Rapamycin is an FDA-approved medication that gently turns down overactive mTOR signaling.",
    whyItMatters:
      "Overactive mTOR causes ovaries to burn through dormant eggs too quickly; the Columbia University VIBRANT trial tests low-dose weekly rapamycin to slow ovarian aging and improve egg quality.",
  },
  {
    term: "Spermidine",
    aliases: ["polyamine", "polyamines"],
    domain: "Geroscience & Reproductive Biology",
    synopsis:
      "A natural polyamine compound found in living cells (and foods like wheat germ) that triggers cellular self-cleaning (autophagy and mitophagy).",
    whyItMatters:
      "A landmark 2023 Nature Aging study showed that spermidine levels drop in aging ovaries, and restoring spermidine rescues egg quality and chromosome alignment by clearing defective mitochondria.",
  },
  {
    term: "NAD+, NMN & Sirtuins (SIRT2)",
    aliases: ["nad", "nad+", "nmn", "nr", "sirtuin", "sirtuins", "sirt1", "sirt2", "sirt3"],
    domain: "Geroscience & Cellular Metabolism",
    synopsis:
      "NAD+ is a vital coenzyme that fuels cellular energy and repair. NMN (Nicotinamide Mononucleotide) is a precursor your body uses to make NAD+, which activates repair enzymes called sirtuins (especially SIRT2).",
    whyItMatters:
      "SIRT2 directly stabilizes the egg's meiotic spindle during division; replenishing NAD+ with NMN restored spindle stability and live births in aged animal models (Cell Reports, 2020).",
  },
  {
    term: "In Vitro Gametogenesis (IVG)",
    aliases: ["ivg", "gametogenesis", "pgclc", "pgclcs"],
    domain: "Frontier Biotechnology",
    synopsis:
      "Creating new eggs or sperm in a laboratory dish by reprogramming a person's ordinary adult cells (such as skin or blood cells) into stem cells and then into germ cells (PGCLCs).",
    whyItMatters:
      "IVG aims to remove the biological clock entirely by making fresh, young oocytes carrying 100% of the mother's DNA, though human clinical use is still 6–10 years away.",
    etymology: "Latin in vitro ('in glass / in the lab') + Greek gamete ('spouse/germ cell') + genesis ('creation').",
  },
  {
    term: "Induced Pluripotent Stem Cells (iPSCs)",
    aliases: ["ipsc", "ipscs", "pluripotent", "reprogramming"],
    domain: "Stem Cell Biology",
    synopsis:
      "Adult cells (like skin or blood cells) that have been genetically rewound back to an embryonic-like stem cell state capable of becoming any cell type in the body.",
    whyItMatters:
      "iPSCs are the starting point for both In Vitro Gametogenesis (making eggs from skin cells) and Engineered Ovarian Support Cells (like Gameto's Fertilo).",
  },
  {
    term: "In Vitro Maturation (IVM) & Fertilo",
    aliases: ["ivm", "fertilo", "gameto", "gv"],
    domain: "Reproductive Biotechnology",
    synopsis:
      "Collecting immature eggs from small ovarian follicles with minimal hormone injections and letting them finish maturing outside the body in a specialized lab dish.",
    whyItMatters:
      "Gameto's Fertilo platform enhances IVM by co-culturing immature eggs with young, stem-cell-derived ovarian support cells (granulosa cells) to mimic a youthful follicle environment.",
  },
  {
    term: "Granulosa & Cumulus Cells",
    aliases: ["granulosa", "cumulus", "theca"],
    domain: "Ovarian Biology",
    synopsis:
      "The somatic 'nurse' cells that surround, feed, and send hormonal signals to the growing egg inside an ovarian follicle.",
    whyItMatters:
      "An egg cannot mature on its own; it depends on granulosa cells for energy molecules, hormones, and developmental signals.",
  },
  {
    term: "In Vitro Activation (IVA) & Hippo Pathway",
    aliases: ["iva", "hippo", "yap", "pten", "pi3k", "akt"],
    domain: "Regenerative Reproductive Medicine",
    synopsis:
      "A surgical/laboratory technique where a tiny piece of ovarian tissue is fragmented into micro-cubes to turn off the 'Hippo' cellular brake (and optionally treated with PTEN/PI3K activators), waking up sleeping follicles before re-implanting the tissue.",
    whyItMatters:
      "Even when ovarian reserve looks depleted on ultrasound, silent primordial follicles often remain in the ovary and can be awakened through Hippo pathway disruption.",
  },
  {
    term: "Platelet-Rich Plasma (PRP) & Exosomes",
    aliases: ["prp", "intraovarian", "exosome", "exosomes", "secretome", "ev", "evs"],
    domain: "Regenerative Biologics",
    synopsis:
      "PRP is a concentrated preparation of your own blood platelets rich in healing growth factors. Exosomes are microscopic messenger bubbles secreted by stem cells or platelets that trigger tissue repair and new blood vessel growth.",
    whyItMatters:
      "Injected directly into the ovaries under ultrasound guidance, autologous PRP and exosomes aim to improve blood flow and awaken preantral follicles without foreign DNA.",
  },
  {
    term: "Primordial & Antral Follicles (AFC)",
    aliases: ["follicle", "follicles", "follicular", "primordial", "preantral", "antral", "afc"],
    domain: "Ovarian Physiology",
    synopsis:
      "A follicle is a tiny fluid-filled sac in the ovary that houses one immature egg. Primordial follicles are the microscopic sleeping reserve; antral follicles are the awakened follicles visible on ultrasound (counted as AFC).",
    whyItMatters:
      "Standard IVF hormones only work on antral follicles, while frontier methods (IVA, PRP, Rapamycin) target the deeper primordial and preantral reserve.",
  },
  {
    term: "Anti-Müllerian Hormone (AMH)",
    aliases: ["amh"],
    domain: "Reproductive Endocrinology",
    synopsis:
      "A hormone secreted by small growing follicles in the ovaries. A blood test for AMH estimates the size of the currently active ovarian reserve (egg quantity, not egg quality).",
    whyItMatters:
      "AMH predicts how many eggs might be retrieved in a single IVF cycle, but it does not measure chromosome health or natural conception ability per ovulated egg.",
  },
  {
    term: "Follicle-Stimulating Hormone (FSH) & LH",
    aliases: ["fsh", "lh", "gonadotropin", "gonadotropins", "menopur", "gonal-f"],
    domain: "Reproductive Endocrinology",
    synopsis:
      "Pituitary hormones that drive egg growth (FSH) and trigger final egg maturation and ovulation (LH). Injectable gonadotropins are purified/recombinant versions used in IVF stimulation.",
    whyItMatters:
      "At age 44+, baseline FSH is often already high; gentle priming (estrogen, testosterone/DHEA, growth hormone) helps follicles respond to stimulation without receptor burnout.",
  },
  {
    term: "DuoStim (Double Stimulation / Shanghai Protocol)",
    aliases: ["duostim", "luteal"],
    domain: "Clinical IVF Protocol",
    synopsis:
      "Performing two egg retrievals within a single 28-day menstrual cycle: one in the first half (follicular phase) and a second immediately afterward in the second half (luteal phase).",
    whyItMatters:
      "Takes advantage of multiple monthly follicle recruitment waves to double egg collection in half the calendar time — crucial when every month counts.",
  },
  {
    term: "PGT-A (Preimplantation Genetic Testing for Aneuploidy)",
    aliases: ["pgt-a", "pgt", "pgs", "nipgt-a", "biopsy"],
    domain: "Embryo Genetics",
    synopsis:
      "Testing a Day 5–6 blastocyst before transfer to count its chromosomes and check whether it is euploid (46 chromosomes) or aneuploid.",
    whyItMatters:
      "PGT-A prevents transferring lethal aneuploid embryos and reduces miscarriage risk, though in low-yield cycles some clinicians prefer fresh Day-3 transfer to avoid biopsy stress and false mosaic discards.",
  },
  {
    term: "ICSI & PICSI",
    aliases: ["icsi", "picsi", "imsi"],
    domain: "Andrology & Embryology Lab",
    synopsis:
      "ICSI (Intracytoplasmic Sperm Injection) injects a single selected sperm directly into an egg. PICSI selects that sperm by testing its ability to bind to hyaluronan (a natural hydrogel surrounding the egg), which only mature sperm with intact DNA can do.",
    whyItMatters:
      "Essential when paternal age is 40+, ensuring only a biochemically mature sperm fertilizes each precious oocyte.",
  },
  {
    term: "Microfluidic Sperm Sorting (ZyMōt)",
    aliases: ["zymot", "microfluidic", "microfluidics"],
    domain: "Andrology & Embryology Lab",
    synopsis:
      "A gentle laboratory chip with microscopic channels that lets the healthiest, most motile sperm swim through naturally — replacing traditional high-speed centrifuge spinning.",
    whyItMatters:
      "Centrifuge spinning generates reactive oxygen species that break sperm DNA; ZyMōt sorting drops Sperm DNA Fragmentation (DFI) to under 1–2%.",
  },
  {
    term: "Sperm DNA Fragmentation (DFI / SDF)",
    aliases: ["dfi", "sdf", "scsa", "tunel", "chromatin", "protamination", "protamine"],
    domain: "Andrology",
    synopsis:
      "Physical breaks or chemical damage in the genetic strands (chromatin) carried inside the head of the sperm, measured as a percentage (DNA Fragmentation Index, or DFI).",
    whyItMatters:
      "Young eggs can repair damaged sperm DNA after fertilization, but eggs over age 40 have limited repair capacity — making low sperm DFI (<15%) critical to prevent Day 3–5 embryo arrest.",
  },
  {
    term: "TESA / TESE (Testicular Sperm Aspiration)",
    aliases: ["tesa", "tese", "epididymis", "epididymal"],
    domain: "Andrology",
    synopsis:
      "A quick, minimally invasive procedure that collects fresh sperm directly from the testicle using a fine needle, bypassing the epididymis (the storage tube where most oxidative DNA damage happens).",
    whyItMatters:
      "In men with persistently high ejaculated DNA fragmentation (>25–30%), testicular sperm typically has 3x–4x lower DNA fragmentation and yields higher blastocyst rates.",
  },
  {
    term: "Vitrification (Cryopreservation)",
    aliases: ["vitrification", "vitrified", "cryopreservation", "cryopreserved", "warming"],
    domain: "Cryobiology",
    synopsis:
      "Ultra-rapid flash-freezing of eggs, embryos, or ovarian tissue into a glass-like solid state without forming sharp ice crystals that would pierce the cell.",
    whyItMatters:
      "Modern vitrification achieves >90–95% survival rates for embryos and allows embryo banking across multiple DuoStim cycles.",
    etymology: "Latin vitrum ('glass') + facere ('to make').",
  },
  {
    term: "Endometrium & Endometrial Receptivity",
    aliases: ["endometrium", "endometrial", "decidua", "receptivity", "implantation"],
    domain: "Reproductive Physiology",
    synopsis:
      "The inner lining of the uterus where an embryo implants and forms the placenta. Receptivity is the specific biological window when this lining is ready to accept a blastocyst.",
    whyItMatters:
      "Unlike the ovary, the uterus ages very slowly and remains highly capable of supporting a healthy pregnancy well into a woman's late 40s and early 50s.",
  },
  {
    term: "Pre-eclampsia (sFlt-1 / PlGF)",
    aliases: ["preeclampsia", "pre-eclampsia", "sflt-1", "plgf", "eclampsic"],
    domain: "Maternal-Fetal Medicine",
    synopsis:
      "A pregnancy complication marked by high blood pressure and placental vascular stress. Measured and predicted early using the blood ratio of two placental proteins: sFlt-1 and PlGF.",
    whyItMatters:
      "Risk increases in pregnancies over age 40, but taking nightly low-dose aspirin (100–150 mg) starting at 12 weeks of pregnancy cuts pre-eclampsia risk by more than 50%.",
  },
  {
    term: "Senolytics & Senescence (SASP)",
    aliases: ["senolytic", "senolytics", "senescence", "senescent", "sasp", "fibrosis", "stroma", "stromal"],
    domain: "Geroscience",
    synopsis:
      "Senescent cells are aged 'zombie' cells that stop dividing and secrete inflammatory chemicals (SASP) that stiffen surrounding tissue (fibrosis). Senolytics are compounds (like fisetin or quercetin) that clear these zombie cells.",
    whyItMatters:
      "Clearing senescent cells and fibrosis from the ovarian stroma ('the soil') helps restore microvascular blood flow to remaining follicles.",
  },
  {
    term: "Ubiquinol (Coenzyme Q10 / CoQ10)",
    aliases: ["ubiquinol", "coq10", "coenzyme"],
    domain: "Cellular Metabolism",
    synopsis:
      "The active, bioavailable antioxidant form of Coenzyme Q10 that sits inside the inner membrane of mitochondria to transport electrons and generate ATP energy.",
    whyItMatters:
      "High-dose Ubiquinol (600 mg/day) for 60–90 days prior to IVF supports mitochondrial energy production in maturing oocytes and sperm.",
  },
  {
    term: "Growth Hormone (Omnitrope / Somatropin / IGF-1)",
    aliases: ["omnitrope", "somatropin", "hgh", "igf-1"],
    domain: "Reproductive Endocrinology",
    synopsis:
      "A peptide hormone that stimulates the liver and ovaries to produce Insulin-like Growth Factor 1 (IGF-1), increasing FSH receptor sensitivity and mitochondrial function in growing follicles.",
    whyItMatters:
      "Randomized trials in poor responders show that adding Growth Hormone during IVF stimulation increases mature oocyte and blastocyst yield.",
  },
  {
    term: "DHEA (Dehydroepiandrosterone)",
    aliases: ["dhea", "dhea-s", "androgen", "androgens"],
    domain: "Reproductive Endocrinology",
    synopsis:
      "A mild natural pro-hormone produced by the adrenal glands that ovaries convert into local testosterone and estrogen to nurture early preantral follicles.",
    whyItMatters:
      "Used for 6–8 weeks before IVF in women with low baseline androgen levels to increase the number of small follicles recruited into the antral pool.",
  },
  {
    term: "Randomized Controlled Trial (RCT)",
    aliases: ["rct", "rcts", "randomised", "randomized", "placebo"],
    domain: "Evidence & Study Design (Tier T2)",
    synopsis:
      "The gold-standard clinical experiment where participants are randomly assigned to receive either the real treatment or a control/placebo, eliminating selection bias.",
    whyItMatters:
      "In Alexander's Library, replicated RCTs with ≥100 patients earn Tier T2, whereas single small studies or non-randomized series are graded lower.",
  },
  {
    term: "Meta-Analysis & Systematic Review",
    aliases: ["meta-analysis", "systematic", "cochrane"],
    domain: "Evidence & Study Design (Tier T1)",
    synopsis:
      "A comprehensive study that gathers all published clinical trials on a question and mathematically pools their data together to find the true overall effect.",
    whyItMatters:
      "Represents the highest level of scientific evidence (Tier T1) in the Library's grading hierarchy.",
  },
  {
    term: "Cohort & Registry Study",
    aliases: ["cohort", "registry", "retrospective", "prospective", "observational"],
    domain: "Evidence & Study Design (Tier T3)",
    synopsis:
      "An observational study that tracks a real-world group of patients over time (such as national IVF registries like SART or HFEA) without randomly assigning treatments.",
    whyItMatters:
      "Provides massive real-world sample sizes (Tier T3), though differences between patient groups can sometimes confound results.",
  },
  {
    term: "Relative Risk (RR), Odds Ratio (OR) & Confidence Interval (CI)",
    aliases: ["rr", "or", "ci", "p-value"],
    domain: "Biostatistics",
    synopsis:
      "Measures of how much a treatment changes the likelihood of an outcome compared to no treatment (e.g., RR 1.26 means a 26% relative increase). The 95% Confidence Interval shows the likely range of the true effect.",
    whyItMatters:
      "If a 95% Confidence Interval for RR or OR crosses 1.0, the difference could be due to chance alone.",
  },
  {
    term: "Frontier",
    aliases: ["frontiers", "frontier-angle", "frontier-angles"],
    domain: "Research & Epistemology",
    synopsis:
      "The leading edge of scientific inquiry where emerging hypotheses, novel biological mechanisms, and early-phase clinical interventions are actively investigated before reaching textbook consensus.",
    whyItMatters:
      "In Alexander's Library, frontier research (such as In Vitro Gametogenesis, Maternal Spindle Transfer, and ovarian mTOR modulation) stays visible and graded by study design rather than being censored.",
    etymology: "Old French frontiere ('borderland, front line'), from Latin frons ('forehead, front').",
  },
  {
    term: "Peer-Reviewed",
    aliases: ["peer-review", "refereed"],
    domain: "Scientific Publishing",
    synopsis:
      "Evaluated and critiqued by independent scientists in the same field before publication in an academic journal to verify methodology, statistical rigor, and conclusions.",
    whyItMatters:
      "Peer-reviewed studies form the backbone of Tiers T1–T5, whereas unreviewed preprints and press releases are weighed more cautiously.",
  },
  {
    term: "Prophylaxis (Prophylactic)",
    aliases: ["prophylaxis", "prophylactic", "preventive", "preventative"],
    domain: "Clinical Medicine",
    synopsis:
      "A preventive medical measure or treatment given ahead of time to stop a disease or complication from developing.",
    whyItMatters:
      "Nightly low-dose aspirin (100–150 mg) started at 12–16 weeks of gestation is the standard prophylaxis to prevent preterm pre-eclampsia in pregnancies over age 40.",
    etymology: "Greek prophylaktikos ('guarding beforehand').",
  },
  {
    term: "Pathophysiology",
    aliases: ["pathophysiological", "pathogenesis"],
    domain: "Biomedical Science",
    synopsis:
      "The functional biological changes and disordered cellular processes that cause, accompany, or result from a disease or condition.",
    etymology: "Greek pathos ('suffering, disease') + physis ('nature, function') + logos ('study').",
  },
  {
    term: "Biomarker",
    aliases: ["biomarkers"],
    domain: "Clinical Diagnostics",
    synopsis:
      "A measurable biological molecule, hormone, or genetic signature in blood, tissue, or follicular fluid that indicates a physiological state, reserve, or disease risk.",
    whyItMatters:
      "Key reproductive biomarkers include AMH and AFC (ovarian reserve), DFI (sperm DNA integrity), and the sFlt-1/PlGF ratio (placental vascular health).",
  },
  {
    term: "Translational Research",
    aliases: ["translational"],
    domain: "Biomedical Science",
    synopsis:
      "Research that bridges basic laboratory discoveries ('bench') directly into human clinical trials and patient treatments ('bedside').",
    whyItMatters:
      "Translational reproductive biology converts cellular longevity discoveries (like NAD+, spermidine, and mTOR modulation) into human fertility protocols.",
  },
  {
    term: "Geroprotective (Geroscience)",
    aliases: ["geroprotective", "geroprotector", "geroprotectors", "geroscience"],
    domain: "Geroscience & Longevity",
    synopsis:
      "Interventions or compounds designed to protect cells and tissues from biological aging by targeting core aging pathways (such as mitochondrial dysfunction, mTOR overactivity, and cellular senescence).",
    whyItMatters:
      "The ovary ages faster than almost any other human organ, making it the primary testing ground for geroprotective medicine.",
    etymology: "Greek geron ('old age') + Latin protegere ('to protect').",
  },
  {
    term: "Natural-Cycle vs Programmed FET",
    aliases: ["fet", "nc-fet", "hrt-fet"],
    domain: "Clinical IVF & Embryo Transfer",
    synopsis:
      "Frozen Embryo Transfer (FET) can be timed either to the woman's own natural ovulation (Natural-Cycle FET, preserving the corpus luteum) or to synthetic estrogen/progesterone pills without ovulation (Programmed/Medicated FET).",
    whyItMatters:
      "Large RCTs (such as the COMPETE trial) and cohort studies show that Natural-Cycle FET in ovulatory women yields higher live birth rates and significantly lower pre-eclampsia risk because the natural corpus luteum secretes vasoactive hormones like relaxin.",
  },
  {
    term: "Corpus Luteum",
    aliases: ["luteum"],
    domain: "Reproductive Physiology",
    synopsis:
      "The temporary endocrine structure that forms in the ovary right after an egg is ovulated, producing natural progesterone, estrogen, and relaxin to support early pregnancy and placental blood vessels.",
    etymology: "Latin corpus ('body') + luteum ('yellow').",
  },
  {
    term: "Lagrangian & Hamiltonian Mechanics",
    aliases: ["lagrangian", "hamiltonian", "symplectic", "euler-lagrange", "liouville"],
    domain: "Classical & Mathematical Physics",
    synopsis:
      "Reformulations of Newtonian mechanics around scalar energy functions and the Principle of Least Action (δS = 0), evolving states on symplectic phase-space manifolds.",
    whyItMatters:
      "Provides the direct mathematical bridge from classical trajectories to quantum commutators ([q, p] = iℏ), path integrals, gauge field theories, and optimal control in quantitative finance.",
  },
  {
    term: "Noether's Theorem",
    aliases: ["noether", "noetherian"],
    domain: "Mathematical Physics & Group Theory",
    synopsis:
      "Emmy Noether's 1918 theorem proving that every continuous differentiable symmetry of the action of a physical system corresponds to an exact conservation law.",
    whyItMatters:
      "Time translation invariance yields energy conservation; spatial translation yields momentum conservation; rotational symmetry yields angular momentum; and U(1) phase symmetry yields electric charge conservation.",
  },
  {
    term: "Hilbert Space",
    aliases: ["hilbert", "eigenstate", "eigenstates", "eigenvalue", "eigenvalues", "hermitian", "unitary"],
    domain: "Quantum Mechanics & Functional Analysis",
    synopsis:
      "A complete, often infinite-dimensional inner-product vector space in which quantum physical states live as normalized vectors and observables act as self-adjoint (Hermitian) operators.",
    whyItMatters:
      "Unites pure functional analysis with quantum mechanics, spectral theory, signal processing, and kernel methods in statistical machine learning.",
  },
  {
    term: "Quantum Entanglement & Nonlocality",
    aliases: ["entanglement", "entangled", "nonlocality", "chsh", "decoherence"],
    domain: "Quantum Mechanics & Quantum Information",
    synopsis:
      "A non-classical correlation in which composite quantum systems share an inseparable joint state whose measurement statistics violate Bell's local hidden-variable inequalities.",
    whyItMatters:
      "Verified by loophole-free Bell tests (Aspect, Clauser, Zeilinger) and serves as the foundational resource for quantum computing, quantum cryptography, and AdS/CFT holographic spacetime emergence.",
  },
  {
    term: "Standard Model of Particle Physics",
    aliases: ["yang-mills", "electroweak", "higgs", "qcd", "chromodynamics", "qed", "quark", "quarks", "gluon", "gluons", "neutrino", "neutrinos"],
    domain: "Particle Physics & Quantum Field Theory",
    synopsis:
      "The relativistic quantum gauge field theory based on local SU(3)_C × SU(2)_L × U(1)_Y symmetry governing strong, weak, and electromagnetic interactions plus the Higgs boson.",
    whyItMatters:
      "Achieves 12-decimal-place precision in QED, yet remains incomplete due to non-zero neutrino masses, the Muon g-2 tension, the absence of gravity, and the 10^120 vacuum-energy cosmological constant problem.",
  },
  {
    term: "String Theory & AdS/CFT Holography",
    aliases: ["superstring", "m-theory", "calabi-yau", "ads/cft", "holographic", "swampland", "brane", "branes", "maldacena"],
    domain: "Quantum Gravity & Mathematical Physics",
    synopsis:
      "A framework replacing 0D point particles with 1D vibrating strings in 10 or 11 spacetime dimensions, naturally containing gravitons and linking bulk gravity to boundary quantum field theory via AdS/CFT duality.",
    whyItMatters:
      "Yielded profound mathematical breakthroughs in mirror symmetry and black hole entropy, but faces empirical falsifiability challenges due to the 10^500 Calabi–Yau vacua landscape and null LHC supersymmetry searches.",
  },
  {
    term: "Modified Newtonian Dynamics (MOND)",
    aliases: ["mond", "milgrom", "milgromian", "btfr", "tully-fisher", "teves", "aest", "sparc"],
    domain: "Gravitational Physics & Galactic Dynamics",
    synopsis:
      "Mordehai Milgrom's 1983 law proposing that below a universal acceleration threshold a₀ ≈ 1.2 × 10⁻¹⁰ m/s², effective gravitational acceleration transitions from g_N = GM/r² to g = √(g_N · a₀).",
    whyItMatters:
      "Predicts flat galactic rotation curves, the zero-scatter Baryonic Tully–Fisher Relation (v_f⁴ = G·M_b·a₀), and the Radial Acceleration Relation directly from visible baryonic matter with zero per-galaxy dark matter halo tuning.",
  },
  {
    term: "Quantised Inertia (MiHsC / Horizon Mechanics)",
    aliases: ["quantised inertia", "quantized inertia", "mihsc", "mcculloch", "unruh", "rindler"],
    domain: "Frontier Gravitational & Horizon Physics",
    synopsis:
      "Mike McCulloch's theory proposing that inertial mass arises from asymmetric Rindler event horizons damping Unruh quantum vacuum radiation relative to the cosmic Hubble horizon: m_i = m_g(1 - 2c²/(|a|Θ)).",
    whyItMatters:
      "Accounts for galaxy rotation flattening and wide-binary acceleration anomalies at low acceleration without adjustable dark-matter parameters, while motivating experimental tests of horizon-engineered thrust.",
  },
  {
    term: "Dark Matter (ΛCDM) & Ad-Hoc Halo Problem",
    aliases: ["dark matter", "lcdm", "wimp", "wimps", "nfw", "xenonnt", "lux-zeplin"],
    domain: "Cosmology & Epistemology of Physics",
    synopsis:
      "The standard cosmological postulate that ~85% of matter consists of non-baryonic collisionless particles forming invisible halos around galaxies to reconcile General Relativity with observed kinematics.",
    whyItMatters:
      "Successfully fits large-scale CMB acoustic peaks, but requires 2–3 ad-hoc free halo parameters per galaxy to fit rotation curves and has yielded 40+ years of null results in direct WIMP detectors (LZ, XENONnT) and collider searches.",
  },
  {
    term: "Wide Binary Star Acceleration Anomaly",
    aliases: ["wide binaries", "wide binary", "wide-binary", "chae", "gaia-dr3"],
    domain: "Astrophysics & Tests of Gravity",
    synopsis:
      "Binary stars separated by >2,000–30,000 AU experience internal orbital accelerations below a₀ ≈ 1.2 × 10⁻¹⁰ m/s² on scales far too small to host any dark matter halo.",
    whyItMatters:
      "Provides a direct test between General Relativity and low-acceleration modified gravity (MOND / Quantised Inertia); Gaia DR3 analyses by Chae (2023–2024) and Hernandez report a 30–40% gravitational boost below a₀, actively debated by Banik et al. (2024).",
  },
  {
    term: "Stochastic Calculus & Itô's Lemma",
    aliases: ["stochastic", "stochastic calculus", "ito", "ito's lemma", "ito lemma", "wiener", "brownian", "martingale", "martingales", "girsanov", "feynman-kac", "sde", "sdes"],
    domain: "Probability Theory & Quantitative Finance",
    synopsis:
      "The calculus of continuous-time random processes driven by Brownian motion (Wiener processes), where non-vanishing quadratic variation (dW_t)² = dt adds a second-order curvature drift term in Itô's Lemma.",
    whyItMatters:
      "Unites physical diffusion and Euclidean quantum path integrals (via the Feynman–Kac formula) with risk-neutral martingale asset pricing and the Black–Scholes–Merton PDE.",
  },
  {
    term: "Black–Scholes–Merton & Stochastic Volatility",
    aliases: ["black-scholes", "bachelier", "heston", "sabr", "greeks"],
    domain: "Quantitative Finance & Derivatives",
    synopsis:
      "The foundational no-arbitrage dynamic delta-hedging framework pricing derivatives under risk-neutral measure Q, extended by Heston, SABR, and Rough Volatility models to capture volatility smiles and jumps.",
    whyItMatters:
      "Demonstrates both the power of parabolic PDEs in finance and their breakdown limits when Gaussian continuity assumptions meet fat-tailed jumps and illiquidity.",
  },
  {
    term: "Market Microstructure & Limit Order Book (LOB)",
    aliases: ["microstructure", "lob", "glosten-milgrom", "vpin", "hft"],
    domain: "Financial Markets & Quantitative Trading",
    synopsis:
      "The study of how continuous double-auction limit order books, liquidity providers, and informed traders interact at tick-by-tick scales to form prices and bid-ask spreads.",
    whyItMatters:
      "Reveals Kyle's λ adverse selection price impact and the universal square-root market impact law (ΔP/P ≈ Y·σ·√(Q/V)), which governs institutional execution and high-frequency statistical arbitrage.",
  },
  {
    term: "Cointegration, GARCH & Statistical Arbitrage",
    aliases: ["cointegration", "garch", "arch", "arima", "ornstein-uhlenbeck", "stat-arb", "kalman", "marchenko-pastur"],
    domain: "Financial Econometrics & Alpha Research",
    synopsis:
      "Econometric methods modeling time-varying volatility clustering (GARCH), stationary mean-reverting asset spreads (Ornstein–Uhlenbeck / cointegration), and Random Matrix Theory covariance denoising.",
    whyItMatters:
      "Forms the quantitative backbone of market-neutral statistical arbitrage, factor portfolio construction, and Deflated Sharpe Ratio testing against backtest overfitting.",
  },
  {
    term: "Econophysics, Fat Tails & Extreme Value Theory",
    aliases: ["econophysics", "mandelbrot", "paretian", "multifractal", "lppl", "sornette", "evt", "var", "cvar"],
    domain: "Econophysics & Quantitative Risk",
    synopsis:
      "The application of statistical physics, scaling laws, and Extreme Value Theory to financial markets, establishing that asset returns obey inverse-cubic power laws (P(|r| > x) ~ x⁻³) rather than Gaussian bell curves.",
    whyItMatters:
      "Explains why standard Gaussian Value-at-Risk (VaR) systematically underestimates market crashes, motivating fractal cascades, Expected Shortfall (CVaR), and Log-Periodic Power Law bubble diagnostics.",
  },
];

const GLOSSARY_INDEX = new Map<string, GlossaryEntry>();
for (const item of CURATED_GLOSSARY) {
  const entry: GlossaryEntry = {
    term: item.term,
    domain: item.domain,
    synopsis: item.synopsis,
    whyItMatters: item.whyItMatters,
    etymology: item.etymology,
  };
  const keys = [
    item.term.toLowerCase(),
    item.term.toLowerCase().replace(/\s*\(.*?\)\s*/g, "").trim(),
    ...(item.aliases ?? []).map((a) => a.toLowerCase()),
  ];
  for (const k of keys) {
    if (k) {
      GLOSSARY_INDEX.set(k, entry);
      const asciiKey = k.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
      GLOSSARY_INDEX.set(asciiKey, entry);
    }
  }
}

interface LexiconDef {
  pos: string;
  def: string;
  etymology?: string;
}

const GENERAL_LEXICON: Record<string, LexiconDef> = {
  study: { pos: "noun / verb", def: "A systematic investigation, clinical trial, or analysis of a subject or scientific question." },
  record: { pos: "noun", def: "The accumulated body of published evidence, data, and documented facts on a subject." },
  fertility: { pos: "noun", def: "The biological ability to conceive and produce healthy offspring." },
  infertility: { pos: "noun", def: "Difficulty conceiving after regular unprotected intercourse, or impaired reproductive capacity." },
  clinical: { pos: "adjective", def: "Relating to the direct medical observation, testing, and treatment of human patients (as opposed to theoretical or laboratory-only work)." },
  trial: { pos: "noun", def: "A structured research study in which human participants receive one or more interventions to evaluate their effects on health outcomes." },
  research: { pos: "noun / verb", def: "Systematic investigation and study of materials and sources in order to establish facts and reach new conclusions." },
  autonomous: { pos: "adjective", def: "Operating independently and self-directed according to defined rules without requiring step-by-step manual intervention." },
  literature: { pos: "noun", def: "The body of published scientific papers, reviews, and scholarly works within a field." },
  registry: { pos: "noun", def: "An official database that records clinical trials or patient treatment outcomes across clinics or nations." },
  canonical: { pos: "adjective", def: "Recognized as the standard, authoritative, and well-established reference structure in a discipline." },
  taxonomy: { pos: "noun", def: "A structured classification system that organizes fields and concepts into a hierarchy of parent and child branches." },
  discipline: { pos: "noun", def: "A branch of scientific knowledge, research, or academic study." },
  grade: { pos: "noun / verb", def: "To evaluate and assign an evidence tier (T1–T6) based on the rigor and design of supporting studies." },
  finding: { pos: "noun", def: "A specific conclusion, empirical result, or graded claim extracted from scientific studies." },
  design: { pos: "noun", def: "The methodological structure of a scientific study (e.g., meta-analysis, randomized trial, cohort, or laboratory experiment)." },
  disputed: { pos: "adjective", def: "Subject to active scientific disagreement or conflicting empirical results." },
  chronicle: { pos: "noun", def: "A historical narrative or factual written account of important events in the order of their occurrence." },
  quest: { pos: "noun", def: "A long and arduous search for an enduring goal or scientific breakthrough." },
  constellation: { pos: "noun", def: "An interconnected cluster or three-dimensional network of related disciplines and ideas." },
  branch: { pos: "noun", def: "A specialized subdivision or sub-discipline growing from a parent topic in the Tree of Knowledge." },
  trunk: { pos: "noun", def: "A foundational root discipline from which more specific sub-disciplines branch out." },
  subtree: { pos: "noun", def: "A topic node together with all of its descendant child branches." },
  catalogue: { pos: "noun", def: "A complete, systematically arranged index of disciplines, sources, or records." },
  synthesis: { pos: "noun", def: "The combination of multiple separate studies and findings into a coherent, calibrated summary of the evidence." },
  opinion: { pos: "noun", def: "A view or judgment formed by an expert or commentator that is not yet backed by controlled empirical data (graded Tier T6)." },
  unverified: { pos: "adjective", def: "Not yet confirmed or substantiated by independent empirical evidence or peer-reviewed studies." },
  archive: { pos: "noun", def: "A repository of historical and scientific records, papers, and graded findings." },
  elixir: { pos: "noun", def: "A sought-after substance or preparation historically believed capable of prolonging life or restoring youth." },
  youth: { pos: "noun", def: "The early, biologically vigorous stage of life before age-related cellular decline." },
  synopsis: { pos: "noun", def: "A brief, plain-language summary or explanation of a word, concept, or work." },
  organise: { pos: "verb", def: "To arrange systematically into a structured, intelligible order." },
  organize: { pos: "verb", def: "To arrange systematically into a structured, intelligible order." },
  published: { pos: "adjective", def: "Issued in print or electronic form in a journal, registry, or public repository." },
  advice: { pos: "noun", def: "Guidance or recommendations offered regarding future action or clinical decisions." },
  plain: { pos: "adjective", def: "Clear, direct, and easy to understand without unnecessary jargon." },
  language: { pos: "noun", def: "The system of words and phrasing used to communicate meaning clearly." },
  definition: { pos: "noun", def: "A statement of the exact meaning and scope of a word or scientific concept." },
  evaluate: { pos: "verb", def: "To assess the strength, validity, and quantitative effect size of a claim or intervention." },
  probability: { pos: "noun", def: "The mathematical likelihood that a specific event or outcome (such as live birth) will occur, often expressed as a percentage." },
  baseline: { pos: "noun", def: "A starting point or reference measurement used for comparison before an intervention is applied." },
  benchmark: { pos: "noun", def: "A calibrated reference statistic from a large registry or landmark study against which individual options can be compared." },
  intervention: { pos: "noun", def: "A medical treatment, procedure, protocol, or biological modifier applied to improve an outcome." },
  lever: { pos: "noun", def: "An actionable clinical or biological factor that can be adjusted to shift the odds of success." },
  verdict: { pos: "noun", def: "The overall evidence-based judgment on whether an intervention is supported, targeted, experimental, or unsupported." },
  specialist: { pos: "noun", def: "A physician or scientist with advanced training in a specific branch of medicine or biology." },
  consultation: { pos: "noun", def: "A formal meeting with a medical specialist to review diagnostic findings and decide on a treatment plan." },
  timeline: { pos: "noun", def: "A chronological sequence of historical milestones and scientific discoveries." },
  controversy: { pos: "noun", def: "Prolonged scientific debate or disagreement over the interpretation or strength of evidence." },
  entity: { pos: "noun", def: "A distinct real-world organization, clinic, clinical trial, research lab, treatment, or regulation indexed in the library." },
  source: { pos: "noun", def: "A primary research paper, preprint, clinical trial registration, or regulatory document from which findings are extracted." },
  index: { pos: "noun / verb", def: "A structured catalog of records, or to record an item in a searchable database." },
  author: { pos: "noun", def: "A researcher or writer who conducted and published a scientific study." },
  venue: { pos: "noun", def: "The academic journal, conference, or registry where a study was published." },
  citation: { pos: "noun", def: "A formal reference to a published study that supports a specific claim or statistic." },
  abstract: { pos: "noun", def: "A concise summary of a research paper's background, methods, quantitative results, and conclusions." },
  preprint: { pos: "noun", def: "A complete scientific manuscript shared publicly on a server (such as bioRxiv or medRxiv) before formal peer review." },
  paper: { pos: "noun", def: "A scholarly article reporting original research or a systematic review in an academic journal." },
  guideline: { pos: "noun", def: "An official evidence-based clinical recommendation issued by a medical society (such as ESHRE, ASRM, or NICE)." },
  settled: { pos: "adjective", def: "Backed by consistent, replicated evidence with broad scientific consensus." },
  debated: { pos: "adjective", def: "Subject to legitimate scholarly discussion where reasonable specialists weigh the evidence differently." },
  contested: { pos: "adjective", def: "Marked by conflicting clinical trial results or unresolved methodological disputes." },
  fringe: { pos: "adjective", def: "Outside mainstream clinical practice, typically resting on early theoretical, animal, or small preliminary studies." },
  commercial: { pos: "adjective", def: "Relating to products or clinic add-ons marketed for profit." },
  hype: { pos: "noun", def: "Exaggerated promotional claims that outstrip the published peer-reviewed evidence." },
  support: { pos: "verb / noun", def: "To provide empirical evidence in favor of a hypothesis, or assistance that sustains a process." },
  refute: { pos: "verb", def: "To prove a statement, hypothesis, or claimed benefit to be false or ineffective through empirical data." },
  mixed: { pos: "adjective", def: "Showing both positive and null or negative results across different studies or subgroups." },
  unclear: { pos: "adjective", def: "Not yet decisively established by the available evidence." },
  confidence: { pos: "noun", def: "The degree of certainty that an extracted finding accurately reflects the underlying study data." },
  rationale: { pos: "noun", def: "The underlying scientific reasoning and methodological basis for a grade or conclusion." },
  milestone: { pos: "noun", def: "A landmark discovery, clinical trial, or historical breakthrough that advanced a scientific field." },
  clinic: { pos: "noun", def: "A specialized medical facility where patients receive diagnostic workups and treatments such as IVF." },
  treatment: { pos: "noun", def: "Medical care, medication, or a laboratory procedure given to manage a condition or achieve a health outcome." },
  laboratory: { pos: "noun", def: "A controlled scientific facility equipped for experimental research or embryology procedures." },
  company: { pos: "noun", def: "A biotechnology or commercial organization developing therapies, diagnostics, or medical devices." },
  regulation: { pos: "noun", def: "A law or official rule governing which medical procedures (such as spindle transfer or donor anonymity) are permitted in a jurisdiction." },
  summary: { pos: "noun", def: "A comprehensive overview distilling the main points and graded conclusions of a topic." },
  gap: { pos: "noun", def: "An unanswered question or missing piece of evidence in the current scientific record." },
  queue: { pos: "noun / verb", def: "An ordered line of research tasks waiting to be processed by autonomous workers." },
  worker: { pos: "noun", def: "A background software process that plans topics, harvests literature, reads abstracts, and synthesizes findings." },
  harvest: { pos: "verb / noun", def: "To gather relevant scientific papers and registered clinical trials from academic databases." },
  extract: { pos: "verb", def: "To pull structured claims, study designs, sample sizes, and milestones out of research texts." },
  scan: { pos: "verb / noun", def: "To search across web and trial sources for active studies, clinics, and regulatory updates." },
  review: { pos: "verb / noun", def: "A critical evaluation of all gathered evidence to merge duplicates, check grades, and write a synthesis." },
  scout: { pos: "noun", def: "The planning agent that maps sub-disciplines and crafts literature and clinical trial search queries." },
  reader: { pos: "noun", def: "The research agent that reads paper abstracts, classifies study designs, and extracts specific claims." },
  skeptic: { pos: "noun", def: "The auditing agent that reviews all claims, flags commercial hype or weak evidence, and builds the decision ledger." },
  search: { pos: "noun / verb", def: "To query the archive for specific articles, graded findings, clinical trials, or scientific ideas." },
  query: { pos: "noun / verb", def: "A specific question or set of keywords submitted to a search engine or database." },
  question: { pos: "noun", def: "A scientific or clinical inquiry seeking an evidence-based answer." },
  idea: { pos: "noun", def: "A concept, hypothesis, or proposed mechanism of action." },
  article: { pos: "noun", def: "A written composition or peer-reviewed paper published in a scientific journal." },
  include: { pos: "verb", def: "To contain or encompass as part of a whole set or research run." },
  progress: { pos: "noun / verb", def: "Forward movement toward completing a research workflow or biological stage." },
  active: { pos: "adjective", def: "Currently running, recruiting participants, or biologically functioning." },
  task: { pos: "noun", def: "A discrete unit of work (such as planning, harvesting, reading, or reviewing) in the research pipeline." },
  stage: { pos: "noun", def: "A distinct phase or step in a biological process or multi-step workflow." },
  cumulative: { pos: "adjective", def: "Increasing or measured across multiple successive cycles or attempts combined." },
  transfer: { pos: "noun / verb", def: "The clinical procedure of placing one or more embryos into the uterus, or moving cellular components between oocytes." },
  cycle: { pos: "noun", def: "A complete monthly physiological reproductive sequence or a single round of IVF stimulation and retrieval." },
  patient: { pos: "noun", def: "A person receiving or registered to receive medical care or participating in a clinical study." },
  couple: { pos: "noun", def: "Two partners working together toward shared family-building or medical decisions." },
  maternal: { pos: "adjective", def: "Relating to or inherited from the mother." },
  paternal: { pos: "adjective", def: "Relating to or inherited from the father." },
  ovarian: { pos: "adjective", def: "Relating to the ovaries, the female reproductive organs that house and mature eggs." },
  uterine: { pos: "adjective", def: "Relating to the uterus (womb), where an embryo implants and grows during pregnancy." },
  reserve: { pos: "noun", def: "The remaining supply of dormant and growing follicles inside the ovaries." },
  outcome: { pos: "noun", def: "The measured end result of a clinical trial or medical procedure (such as live birth rate or miscarriage rate)." },
  effect: { pos: "noun", def: "A measurable change produced by an intervention, quantified by metrics like relative risk or percentage difference." },
  sample: { pos: "noun", def: "The group of patients, cells, or cycles included and analyzed in a scientific study." },
  population: { pos: "noun", def: "The broader demographic or clinical group of people to whom a study's findings apply." },
  significant: { pos: "adjective", def: "Unlikely to have occurred by random chance alone according to statistical testing, or clinically meaningful in magnitude." },
  protocol: { pos: "noun", def: "A precise, standardized medical regimen specifying medication doses, timing, and procedural steps." },
  efficacy: { pos: "noun", def: "The ability of an intervention to produce the desired beneficial effect under controlled clinical conditions." },
  provenance: { pos: "noun", def: "The documented origin, source history, and chain of evidence behind an artwork, manuscript, or scientific claim." },
  characteristic: { pos: "noun / adjective", def: "A distinguishing feature, attribute, or typical quality of an organism, cell, or study population." },
  character: { pos: "noun", def: "A distinctive trait, symbol, or defining quality." },
  configure: { pos: "verb", def: "To arrange, set up, or shape the parameters of a system or structure." },
};

const GENERAL_LEXICON_INDEX = new Map<string, { word: string; def: LexiconDef }>();
for (const [k, v] of Object.entries(GENERAL_LEXICON)) {
  GENERAL_LEXICON_INDEX.set(k.toLowerCase(), { word: k, def: v });
}

const MORPH_PREFIXES: [string, string][] = [
  ["auto", "self / one's own (Greek autos)"],
  ["allo", "other / different donor (Greek allos)"],
  ["hetero", "different / mixed (Greek heteros)"],
  ["homo", "same / uniform (Greek homos)"],
  ["oo", "egg / ovum (Greek oion)"],
  ["cyto", "cell (Greek kytos)"],
  ["mito", "thread / mitochondria (Greek mitos)"],
  ["karya", "cell nucleus (Greek karyon)"],
  ["karyo", "cell nucleus (Greek karyon)"],
  ["eu", "good, normal, balanced (Greek eu)"],
  ["aneu", "uneven / abnormal count (Greek an-eu)"],
  ["dys", "impaired or difficult (Greek dys)"],
  ["hyper", "excessive / above normal (Greek hyper)"],
  ["hypo", "below normal / low (Greek hypo)"],
  ["endo", "inside / inner lining (Greek endon)"],
  ["ecto", "outer / external (Greek ektos)"],
  ["intra", "within / inside (Latin intra)"],
  ["inter", "between / among (Latin inter)"],
  ["trans", "across / through (Latin trans)"],
  ["peri", "around / surrounding (Greek peri)"],
  ["epi", "upon / above (Greek epi)"],
  ["cryo", "cold / freezing (Greek kryos)"],
  ["vitri", "glass-like (Latin vitrum)"],
  ["gero", "aging / longevity (Greek geron)"],
  ["sperm", "seed / male gamete (Greek sperma)"],
  ["andro", "male (Greek aner)"],
  ["gyne", "female (Greek gyne)"],
  ["follic", "small sac / follicle (Latin folliculus)"],
  ["lute", "yellow / corpus luteum phase (Latin luteus)"],
  ["gonado", "reproductive gland / ovary or testis"],
  ["tropho", "nourishment / placental support (Greek trophe)"],
  ["blast", "early embryonic bud or precursor cell (Greek blastos)"],
  ["angi", "blood vessel (Greek angeion)"],
  ["vaso", "blood vessel / duct (Latin vas)"],
  ["hemo", "blood (Greek haima)"],
  ["haemo", "blood (Greek haima)"],
  ["cardio", "heart (Greek kardia)"],
  ["neuro", "nerve / nervous system (Greek neuron)"],
  ["immuno", "immune system (Latin immunis)"],
  ["patho", "disease / suffering (Greek pathos)"],
  ["myo", "muscle (Greek mys)"],
  ["hist", "biological tissue (Greek histos)"],
  ["micro", "very small / microscopic (Greek mikros)"],
  ["macro", "large-scale (Greek makros)"],
  ["poly", "many / multiple (Greek polys)"],
  ["mono", "single / one (Greek monos)"],
  ["neo", "new (Greek neos)"],
  ["pre", "before / prior to (Latin prae)"],
  ["post", "after / following (Latin post)"],
  ["sub", "under / secondary (Latin sub)"],
  ["super", "above / beyond (Latin super)"],
  ["anti", "against / counteracting (Greek anti)"],
  ["pro", "forward / supporting (Greek/Latin pro)"],
  ["co", "together / jointly (Latin com-)"],
  ["re", "again / anew (Latin re-)"],
  ["un", "not / reversal of (Old English un-)"],
  ["non", "not / absence of (Latin non)"],
  ["dis", "apart / negation of (Latin dis-)"],
  ["mis", "wrongly / amiss"],
  ["over", "excessively / above"],
  ["under", "insufficiently / beneath"],
];

const MORPH_SUFFIXES: [string, string][] = [
  ["genesis", "creation, formation, or development"],
  ["cyte", "mature biological cell"],
  ["blast", "immature precursor / tissue-forming cell"],
  ["ploid", "chromosome set multiple"],
  ["ploidy", "state of chromosome set count"],
  ["phagy", "cellular eating or recycling (Greek phagein)"],
  ["lysis", "breaking down or dissolving"],
  ["lytic", "capable of breaking down or clearing"],
  ["tropin", "hormone that stimulates a target organ"],
  ["tropic", "stimulating or turning toward a target tissue"],
  ["itis", "inflammation"],
  ["osis", "condition, process, or degenerative state"],
  ["emia", "condition in the blood"],
  ["pathy", "disease or disorder"],
  ["plasia", "cell growth or formation"],
  ["ectomy", "surgical removal"],
  ["otomy", "surgical incision or cutting"],
  ["scopy", "visual examination with an instrument"],
  ["metry", "measurement"],
  ["gram", "recorded image or measurement"],
  ["ase", "biological enzyme"],
  ["ome", "complete biological set or system"],
  ["omics", "comprehensive molecular study of a biological system"],
];

function cleanToken(raw: string): string {
  return raw
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/^[^a-z0-9+]+|[^a-z0-9+]+$/g, "")
    .replace(/'s$/i, "")
    .trim();
}

function addBaseForms(word: string, out: Set<string>): void {
  if (!word || word.length < 2) return;
  out.add(word);
  if (word.endsWith("ies") && word.length > 4) {
    out.add(word.slice(0, -3) + "y");
  }
  if (word.endsWith("ied") && word.length > 4) {
    out.add(word.slice(0, -3) + "y");
  }
  if (word.endsWith("es") && word.length > 4) {
    out.add(word.slice(0, -2));
    out.add(word.slice(0, -1));
  }
  if (word.endsWith("s") && !word.endsWith("ss") && !word.endsWith("us") && !word.endsWith("is") && word.length > 3) {
    out.add(word.slice(0, -1));
  }
  if (word.endsWith("ae") && word.length > 4) {
    out.add(word.slice(0, -1));
  }
  if (word.endsWith("i") && word.length > 4) {
    out.add(word.slice(0, -1) + "us");
  }
  if (word.endsWith("ically") && word.length > 7) {
    out.add(word.slice(0, -6) + "ic");
    out.add(word.slice(0, -6));
  }
  if (word.endsWith("ally") && word.length > 6) {
    out.add(word.slice(0, -4));
    out.add(word.slice(0, -2));
  }
  if (word.endsWith("ly") && word.length > 4) {
    out.add(word.slice(0, -2));
    if (word.endsWith("ily") && word.length > 5) {
      out.add(word.slice(0, -3) + "y");
    }
  }
  if (word.endsWith("ing") && word.length > 5) {
    const stem = word.slice(0, -3);
    out.add(stem);
    out.add(stem + "e");
    if (stem.length >= 3 && stem[stem.length - 1] === stem[stem.length - 2]) {
      out.add(stem.slice(0, -1));
    }
  }
  if (word.endsWith("ed") && word.length > 4) {
    const stem = word.slice(0, -2);
    out.add(stem);
    out.add(word.slice(0, -1));
    if (stem.length >= 3 && stem[stem.length - 1] === stem[stem.length - 2]) {
      out.add(stem.slice(0, -1));
    }
  }
  if (word.endsWith("ation") && word.length > 7) {
    out.add(word.slice(0, -5) + "e");
    out.add(word.slice(0, -5));
  }
  if (word.endsWith("ition") && word.length > 7) {
    out.add(word.slice(0, -5) + "e");
    out.add(word.slice(0, -5));
  }
  if (word.endsWith("tion") && word.length > 6) {
    out.add(word.slice(0, -4));
    out.add(word.slice(0, -3) + "e");
  }
  if (word.endsWith("ment") && word.length > 6) {
    out.add(word.slice(0, -4));
  }
  if (word.endsWith("ness") && word.length > 6) {
    out.add(word.slice(0, -4));
  }
  if (word.endsWith("ity") && word.length > 6) {
    out.add(word.slice(0, -3));
    out.add(word.slice(0, -3) + "e");
  }
  if (word.endsWith("able") && word.length > 6) {
    out.add(word.slice(0, -4));
    out.add(word.slice(0, -4) + "e");
  }
  if (word.endsWith("istic") && word.length > 7) {
    out.add(word.slice(0, -5));
  }
  if (word.endsWith("ive") && word.length > 5) {
    out.add(word.slice(0, -3));
    out.add(word.slice(0, -3) + "e");
  }
  if (word.endsWith("ous") && word.length > 5) {
    out.add(word.slice(0, -3));
    out.add(word.slice(0, -3) + "e");
  }
  if (word.endsWith("al") && word.length > 5) {
    out.add(word.slice(0, -2));
    out.add(word.slice(0, -2) + "e");
  }
}

/**
 * Generates candidate base/lemma forms for a word (stripping plural, tense,
 * adverbial, nominal, and common prefixes) for both local and remote dictionary lookup.
 */
export function candidateLookupForms(rawInput: string): string[] {
  const cleaned = cleanToken(rawInput);
  if (!cleaned) return [];
  const forms = new Set<string>();
  addBaseForms(cleaned, forms);

  // Also strip common derivational prefixes (un-, re-, non-, pre-, post-, over-, under-, sub-, inter-, dis-, mis-, de-)
  const prefixes = ["un", "re", "non", "pre", "post", "over", "under", "sub", "inter", "dis", "mis", "de", "co", "anti"];
  for (const pre of prefixes) {
    if (cleaned.startsWith(pre) && cleaned.length >= pre.length + 4) {
      const rest = cleaned.slice(pre.length).replace(/^-+/, "");
      addBaseForms(rest, forms);
    }
  }

  return [...forms];
}

function formatDisplayWord(raw: string): string {
  const trimmed = raw.trim().replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
  if (!trimmed) return raw.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

/**
 * Pure lookup of ANY double-clicked word or short term:
 * 1. Curated scientific, clinical & research methodology glossary
 * 2. Built-in academic & general English lexicon (including lemmatized stems)
 * 3. Greek/Latin scientific root & English morphological synthesis so every word is explainable immediately.
 */
export function lookupGlossaryTerm(rawInput: string): GlossaryEntry | null {
  if (!rawInput) return null;
  const cleaned = cleanToken(rawInput);
  if (!cleaned || cleaned.length < 2) return null;

  const forms = candidateLookupForms(cleaned);

  // 1. Check curated scientific glossary
  for (const form of forms) {
    const match = GLOSSARY_INDEX.get(form);
    if (match) return match;
  }

  // 2. If hyphenated (e.g. "maternal-spindle", "pre-eclampsia", "peer-reviewed"), check joined & parts
  if (cleaned.includes("-")) {
    const joined = cleaned.replace(/-/g, "");
    for (const form of candidateLookupForms(joined)) {
      const match = GLOSSARY_INDEX.get(form);
      if (match) return match;
    }
    const parts = cleaned.split("-").filter((p) => p.length >= 2);
    for (const part of parts) {
      for (const form of candidateLookupForms(part)) {
        const match = GLOSSARY_INDEX.get(form);
        if (match) return match;
      }
    }
  }

  // 3. Check general & academic English lexicon (exact or lemmatized stem)
  for (const form of forms) {
    const lex = GENERAL_LEXICON_INDEX.get(form);
    if (lex) {
      const isDerived = form !== cleaned;
      return {
        term: formatDisplayWord(rawInput),
        domain: `Lexicon (${lex.def.pos})`,
        synopsis: isDerived ? `${lex.def.def} (Derived from "${lex.word}".)` : lex.def.def,
        etymology: lex.def.etymology,
      };
    }
  }

  if (cleaned.includes("-")) {
    const parts = cleaned.split("-").filter((p) => p.length >= 2);
    for (const part of parts) {
      for (const form of candidateLookupForms(part)) {
        const lex = GENERAL_LEXICON_INDEX.get(form);
        if (lex) {
          return {
            term: formatDisplayWord(rawInput),
            domain: `Lexicon (${lex.def.pos})`,
            synopsis: `${lex.def.def} (Compound term built on "${lex.word}".)`,
            etymology: lex.def.etymology,
          };
        }
      }
    }
  }

  // 4. Check morphological Greek/Latin/English prefixes & suffixes
  const matchedPre = cleaned.length >= 4 ? MORPH_PREFIXES.find(([pre]) => cleaned.startsWith(pre) && cleaned.length > pre.length + 2) : undefined;
  const matchedSuf = cleaned.length >= 5 ? MORPH_SUFFIXES.find(([suf]) => cleaned.endsWith(suf) && cleaned.length > suf.length + 2) : undefined;
  const displayTerm = formatDisplayWord(rawInput);

  if (matchedPre || matchedSuf) {
    const pieces: string[] = [];
    if (matchedPre) pieces.push(`prefix "${matchedPre[0]}-" (${matchedPre[1]})`);
    if (matchedSuf) pieces.push(`suffix "-${matchedSuf[0]}" (${matchedSuf[1]})`);
    return {
      term: displayTerm,
      domain: matchedSuf ? "Scientific Terminology" : "Lexicon",
      synopsis:
        matchedPre && matchedSuf
          ? `Term combining ${matchedPre[1]} with ${matchedSuf[1]}.`
          : matchedPre
            ? `Term formed with the prefix "${matchedPre[0]}-" (${matchedPre[1]}) modifying "${cleaned.slice(matchedPre[0].length)}".`
            : `Term ending in "-${matchedSuf![0]}", denoting ${matchedSuf![1]}.`,
      etymology: `Morphology: ${pieces.join(" + ")}.`,
    };
  }

  // 5. Universal grammatical / inflectional dictionary fallback so every word is immediately explainable
  const stem = forms.find((f) => f !== cleaned && f.length >= 3) ?? cleaned;
  let pos = "term";
  let explanation = `English term ("${cleaned}") used in this passage.`;

  if (cleaned.endsWith("ly") && cleaned.length > 4) {
    pos = "adverb";
    explanation = `In a manner characterized by or relating to "${stem}".`;
  } else if ((cleaned.endsWith("tion") || cleaned.endsWith("sion") || cleaned.endsWith("ment")) && cleaned.length > 5) {
    pos = "noun";
    explanation = `The action, process, or resulting state of "${stem}".`;
  } else if ((cleaned.endsWith("ness") || cleaned.endsWith("ity")) && cleaned.length > 5) {
    pos = "noun";
    explanation = `The quality, condition, or degree of being "${stem}".`;
  } else if ((cleaned.endsWith("able") || cleaned.endsWith("ible")) && cleaned.length > 5) {
    pos = "adjective";
    explanation = `Capable of or suitable for being "${stem}".`;
  } else if ((cleaned.endsWith("ous") || cleaned.endsWith("ive") || cleaned.endsWith("al") || cleaned.endsWith("ic")) && cleaned.length > 4) {
    pos = "adjective";
    explanation = `Relating to, characterized by, or tending toward "${stem}".`;
  } else if (cleaned.endsWith("ing") && cleaned.length > 4) {
    pos = "verb / participle";
    explanation = `Present participle or gerund form of "${stem}", denoting an ongoing action or process.`;
  } else if (cleaned.endsWith("ed") && cleaned.length > 4) {
    pos = "verb / adjective";
    explanation = `Past tense or participial form of "${stem}", indicating a completed action or resulting state.`;
  } else if (cleaned.endsWith("s") && !cleaned.endsWith("ss") && cleaned.length > 3) {
    pos = "noun / verb";
    explanation = `Plural or third-person singular inflection of "${stem}".`;
  }

  return {
    term: displayTerm,
    domain: `Lexicon (${pos})`,
    synopsis: explanation,
  };
}

