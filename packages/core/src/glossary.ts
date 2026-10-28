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
    term: "Trophectoderm (TE)",
    aliases: ["te", "trophoblast", "trophectodermal"],
    domain: "Embryology",
    synopsis:
      "The outer layer of cells surrounding a blastocyst (scored A, B, or C as the second letter in Gardner grading, such as 4AA or 4BB) that implants into the uterine lining and forms the placenta.",
    whyItMatters:
      "Trophectoderm (TE) morphology is a stronger independent predictor of implantation and live birth than Inner Cell Mass (ICM) grade, and during PGT-A genetic testing, 5–8 cells are biopsied from the trophectoderm rather than the ICM.",
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
    aliases: [
      "gardner",
      "4aa",
      "5aa",
      "3aa",
      "4ab",
      "4ba",
      "4bb",
      "3bb",
      "5bb",
      "4bc",
      "3bc",
      "4cb",
      "4cc",
      "aa",
      "ab",
      "ba",
      "bb",
      "bc",
      "cb",
      "cc",
      "aa/bb",
      "bb/aa",
    ],
    domain: "Clinical Embryology",
    synopsis:
      "The standard three-part blastocyst scoring system (e.g., 4AA or 4BB): a number from 1 to 6 for cavity expansion and hatching, a first letter (A, B, or C) for the Inner Cell Mass (fetus-forming cells), and a second letter (A, B, or C) for the Trophectoderm (placenta-forming cells).",
    whyItMatters:
      "AA, AB, BA, and BB blastocysts all have high implantation potential; however, morphological grade only weakly predicts chromosomal euploidy in women over 40, where a 4BB euploid embryo outperforms a 4AA aneuploid embryo, and trophectoderm grade correlates slightly more strongly with implantation than ICM grade.",
  },
  {
    term: "Morphometry & Morphokinetics (Time-Lapse Embryo Assessment)",
    aliases: [
      "morphometry",
      "morphometric",
      "morphokinetics",
      "morphokinetic",
      "time-lapse",
      "tlm",
      "kidscore",
      "idascore",
    ],
    domain: "Clinical Embryology & AI Selection",
    synopsis:
      "Quantitative measurement of embryo size and cellular geometry (morphometry, such as blastocyst area ≥25,000 µm², diameter ≥170 µm, and trophectoderm cell counts) alongside continuous cell-division timing intervals (morphokinetics) captured in time-lapse incubators.",
    whyItMatters:
      "Supplements subjective visual grading with objective parameters (such as time to blastulation tB, synchronous cleavage s2, and quantitative TE cell counts) to rank embryos for transfer without disturbing culture conditions.",
    etymology: "Greek morphe ('form, shape') + metria ('measurement') / kinesis ('motion').",
  },
  {
    term: "Pronuclear Scoring (2PN, 1PN, 0PN & 3PN Fertilisation Check)",
    aliases: ["2pn", "1pn", "0pn", "3pn", "1pn2pb", "pronucleus", "pronuclei", "pronuclear", "1pn/2pn", "2pn/1pn"],
    domain: "Clinical Embryology",
    synopsis:
      "The fertilisation check performed 16–18 hours after ICSI or IVF to count pronuclei inside the zygote: 2PN (two pronuclei, one maternal and one paternal) is normal fertilisation; 1PN has a single visible pronucleus (1PN2PB has extruded both polar bodies); 0PN has none visible at check; and 3PN is triploid (three pronuclei).",
    whyItMatters:
      "While 3PN zygotes are chromosomally triploid and excluded from transfer, 30–50% of 1PN (especially 1PN2PB) and 0PN zygotes that reach the blastocyst stage are actually normal biparental diploids that can be rescued via SNP-based PGT-A and produce healthy live births.",
  },
  {
    term: "Oocyte Nuclear Maturity & Morphology (MII, MI, GV, GVT & PolScope Spindle Imaging)",
    aliases: ["gv", "gvt", "mi", "mii", "polscope", "polar body", "perivitelline", "ooplasm", "zona pellucida", "zp", "dysmorphisms"],
    domain: "Clinical Embryology",
    synopsis:
      "Assessment of retrieved oocytes before insemination: nuclear maturity classifies eggs as Metaphase II (MII, mature with extruded first polar body and birefringent meiotic spindle visible under PolScope polarized light microscopy), Metaphase I (MI, immature without polar body), or Germinal Vesicle (GV, arrested in Prophase I; used in Germinal Vesicle Transfer, GVT).",
    whyItMatters:
      "Only MII oocytes can be fertilized immediately, though immature GV/MI oocytes can sometimes be rescued via engineered Ovarian Support Cell IVM, and non-invasive PolScope spindle imaging guides Maternal Spindle Transfer without damaging chromosomes.",
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
      "After age 40, baseline FSH is often already high; gentle priming (estrogen, testosterone/DHEA, growth hormone) helps follicles respond to stimulation without receptor burnout.",
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
    aliases: ["fet", "nc-fet", "hrt-fet", "mnc-fet"],
    domain: "Clinical IVF & Embryo Transfer",
    synopsis:
      "Frozen Embryo Transfer (FET) can be timed either to the woman's own natural ovulation (Natural-Cycle FET, preserving the corpus luteum) or to synthetic estrogen/progesterone pills without ovulation (Programmed/Medicated FET).",
    whyItMatters:
      "Large RCTs (such as the COMPETE trial) and cohort studies show that Natural-Cycle FET in ovulatory women yields higher live birth rates and significantly lower pre-eclampsia risk because the natural corpus luteum secretes vasoactive hormones like relaxin.",
  },
  {
    term: "Immediate vs. Delayed FET (Inter-Transfer Interval & Endometrial Reset)",
    aliases: ["inter-transfer", "washout"],
    domain: "Clinical IVF & Embryo Transfer",
    synopsis:
      "After an unsuccessful embryo transfer (when menstruation arrives), an Immediate FET transfers the next frozen embryo in the very first menstrual cycle, whereas a Delayed ('Reset') FET pauses 1–3+ months before transferring.",
    whyItMatters:
      "Meta-analyses (n=20,155) and RCTs prove that immediate next-period FET has equal or higher live birth rates than arbitrary waiting; simultaneously, cryostorage studies (n=58,001 blastocysts) prove that waiting 1–6 months causes 0% embryo decay — making a 1–3 month reset completely safe when used to optimize ovulation, cavity/CD138 status, or hormone balance before transferring a last remaining embryo.",
  },
  {
    term: "Chronic Endometritis (CD138+ Plasma Cells)",
    aliases: ["cd138", "endometritis"],
    domain: "Endometrial Pathology & Implantation",
    synopsis:
      "A silent, typically symptomless low-grade bacterial inflammation of the uterine lining diagnosed by identifying CD138-positive plasma cells on an endometrial biopsy or characteristic micro-polyps on office hysteroscopy.",
    whyItMatters:
      "Present in 15–30% of patients after failed embryo transfers; clearing it with a 14-day course of oral doxycycline during a 1-month reset cycle more than doubles subsequent live birth rates.",
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
  {
    term: "CpG Dinucleotides & DNA Methylation (DNAm / 5mC / 5hmC)",
    aliases: [
      "dnam",
      "cpg",
      "cpgs",
      "dna methylation",
      "methylation",
      "methylated",
      "hypermethylation",
      "hypomethylation",
      "demethylation",
      "5mc",
      "5hmc",
      "5-methylcytosine",
      "5-hydroxymethylcytosine",
      "dinucleotide",
      "dinucleotides",
      "cytosine",
      "guanine",
    ],
    domain: "Epigenetics & Geroscience",
    synopsis:
      "DNA methylation (DNAm) is the chemical addition of a methyl group (forming 5-methylcytosine, 5mC) to cytosine bases located next to guanine bases along the DNA backbone (Cytosine-phosphate-Guanine, or CpG dinucleotides), controlling which genes are switched on or off without altering the underlying A/T/C/G sequence.",
    whyItMatters:
      "Predictable age-related hypermethylation at developmental gene promoters and hypomethylation across repetitive DNA regions allow epigenetic clocks (Horvath, PhenoAge, GrimAge2, DunedinPACE) to quantify biological age and measure rejuvenation when TET1–3 enzymes oxidize 5mC to 5hmC.",
    etymology: "Cytosine-phosphate-Guanine (CpG) + DNA methylation (DNAm).",
  },
  {
    term: "Horvath Pan-Tissue Clock & First-Generation Epigenetic Clocks",
    aliases: [
      "horvath",
      "hannum",
      "epigenetic clock",
      "epigenetic clocks",
      "clock",
      "clocks",
      "353-cpg",
      "pan-tissue",
      "methylationepic",
      "beadchip",
      "first-generation",
    ],
    domain: "Epigenetic Clocks & Biological Age",
    synopsis:
      "First-generation DNA methylation clocks (Horvath 2013 353-CpG pan-tissue clock; Hannum 2013 71-CpG blood clock) trained via elastic-net regression on Illumina BeadChip / MethylationEPIC arrays to predict chronological age across human tissues (r = 0.96, median error ~3.6 years).",
    whyItMatters:
      "Proved that DNA methylation tracks age universally across 51 human tissues and resets to zero upon iPSC reprogramming, paving the way for mortality-calibrated second- and third-generation clinical clocks.",
  },
  {
    term: "PhenoAge & GrimAge2 (Second-Generation Mortality Clocks)",
    aliases: [
      "phenoage",
      "grimage",
      "grimage2",
      "dnam grimage",
      "dnam phenoage",
      "levine",
      "timp-1",
      "adm",
      "nt-probnp",
      "hba1c",
    ],
    domain: "Epigenetic Clocks & Longevity Diagnostics",
    synopsis:
      "Second-generation epigenetic clocks trained on physiological morbidity and mortality rather than birth year: Levine's PhenoAge (513 CpGs) tracks 9 clinical blood chemistry markers, while Lu & Horvath's GrimAge/GrimAge2 (1,030 CpGs) embeds DNAm surrogates for plasma aging proteins (GDF-15, Cystatin C, TIMP-1, PAI-1, ADM, B2M, NT-proBNP, CRP, HbA1c) and smoking pack-years.",
    whyItMatters:
      "GrimAge2 is the strongest epigenetic predictor of all-cause mortality (HR = 2.45 per +1 SD), time-to-coronary heart disease, and time-to-cancer, and was reversed by −2.5 years in the human TRIIM thymic regeneration trial.",
  },
  {
    term: "DunedinPACE (Third-Generation Pace-of-Aging Speedometer)",
    aliases: ["dunedinpace", "belsky", "pace of aging", "dunedin", "third-generation"],
    domain: "Epigenetic Clocks & Clinical Trials",
    synopsis:
      "A third-generation blood DNA methylation clock (173 CpGs, Belsky, Caspi & Moffitt, eLife 2022) trained on 20-year within-person longitudinal decline across 19 organ-system biomarkers in the Dunedin Birth Cohort to measure the instantaneous velocity of biological aging per calendar year.",
    whyItMatters:
      "Unlike cumulative clocks that carry historical baseline exposure, DunedinPACE acts as a high-reliability (ICC > 0.90) real-time speedometer (1.0 = 1 biological year per calendar year; <0.85 optimal) proven responsive in the 2-year NIH CALERIE caloric restriction RCT.",
  },
  {
    term: "Principal Component Clocks (PC-Clocks) & Intraclass Correlation (ICC)",
    aliases: [
      "pc-clocks",
      "pc-clock",
      "pc-grimage",
      "pc-phenoage",
      "pc-horvath",
      "pc-denoising",
      "pc-denoised",
      "pc",
      "icc",
      "higgins-chen",
      "whi",
      "jhs",
      "inchianti",
    ],
    domain: "Epigenetic Clock Reliability & Biostatistics",
    synopsis:
      "PC-Clocks (Higgins-Chen & Levine, Nature Aging 2022) compute epigenetic age from shared covariance Principal Components across 78,464 CpGs rather than individual noisy Illumina microarray probes, raising test-retest Intraclass Correlation Coefficients (ICC) from ~0.75 to >0.95–0.99 across validation cohorts (WHI, JHS, InCHIANTI, Framingham).",
    whyItMatters:
      "Eliminates false ±3–9 year longitudinal swings between replicate blood draws, reducing clinical longevity trial sample size requirements by up to 10-fold.",
  },
  {
    term: "DamAge & AdaptAge (Causal vs. Protective Epigenetic Clocks & EWMR)",
    aliases: ["damage", "adaptage", "causage", "ewmr", "gladyshev"],
    domain: "Causal Epigenomics & Longevity",
    synopsis:
      "Epigenetic clocks constructed by Ying & Gladyshev (Nature Aging 2024) using Epigenome-Wide Mendelian Randomization (EWMR) across 423,410 individuals to separate CpG methylation changes that causally accelerate aging and mortality (DamAge) from protective homeostatic methylation adaptations (AdaptAge).",
    whyItMatters:
      "Resolves a major paradox of first-generation clocks by showing that age-correlated CpG changes mix damaging drift with protective cellular defense; genuine rejuvenation reduces DamAge while preserving or increasing AdaptAge.",
  },
  {
    term: "IEAA vs. EEAA (Intrinsic vs. Extrinsic Epigenetic Age Acceleration)",
    aliases: ["ieaa", "eeaa"],
    domain: "Epigenetic Diagnostics & Immunology",
    synopsis:
      "IEAA measures cell-intrinsic epigenetic aging after statistically adjusting out shifts in white blood cell sub-populations, whereas EEAA incorporates age-related immune cell shifts (such as naive T-cell exhaustion and senescent CD8+CD28− T-cell accumulation).",
    whyItMatters:
      "Essential for ensuring that transient viral infections, acute stress, or post-exercise leukocytosis do not falsely inflate blood-based biological age readings.",
  },
  {
    term: "Organ-Specific Plasma Proteomic Clocks (SomaScan, Olink & Organ Age Gap)",
    aliases: [
      "wyss-coray",
      "somascan",
      "olink",
      "pea",
      "organ age gap",
      "proteomic",
      "proteomics",
      "glycanage",
      "n-glycan",
      "n-glycosylation",
      "multi-omic",
      "klk6",
      "myl7",
      "umod",
      "gtex",
    ],
    domain: "Multi-Omic Aging Biomarkers",
    synopsis:
      "High-throughput plasma protein clocks (Oh, Rutledge & Wyss-Coray, Nature 2023) using SomaScan (4,900–11,000 aptamers) or Olink Proximity Extension Assay (PEA) to quantify biological aging separately across 11 individual organs via GTEx organ-enriched proteins (such as brain KLK6, cardiac MYL7, and renal UMOD) alongside IgG N-glycan (GlycanAge) profiling.",
    whyItMatters:
      "Nearly 20% of healthy adults exhibit accelerated aging restricted to a single organ; an elevated Heart or Brain Age Gap (+1 SD) predicts heart failure or Alzheimer's progression 15 years in advance.",
  },
  {
    term: "Yamanaka Factors (OSKM / OSK: Oct4, Sox2, Klf4, c-Myc) & Partial Reprogramming",
    aliases: [
      "oskm",
      "osk",
      "oskmln",
      "yamanaka",
      "oct4",
      "sox2",
      "klf4",
      "c-myc",
      "c-myc-free",
      "lin28",
      "nanog",
      "aav",
      "aav2",
      "aav9",
      "dual-aav",
      "aav9-osk",
      "aav-osk",
      "tet-on",
      "tet-off",
      "er-100",
      "naion",
      "non-integrating",
      "mptr",
      "rejuvenation",
      "rejuvenate",
      "rejuvenated",
      "pluripotency",
      "dedifferentiation",
    ],
    domain: "Cellular Reprogramming & Epigenetic Reset",
    synopsis:
      "Shinya Yamanaka's transcription factors (Oct4, Sox2, Klf4, c-Myc — OSKM; or 6-factor mRNA OSKMLN adding LIN28 and NANOG) rewind adult somatic cells to embryonic pluripotency (DNAm age = 0). Pulsing c-Myc-free OSK via doxycycline-inducible Dual-AAV2/AAV9 (Tet-On / Tet-Off, e.g. ER-100 for NAION optic neuropathy) resets epigenetic age during the maturation phase without erasing somatic cell identity.",
    whyItMatters:
      "In vivo AAV9-OSK restored youthful DNA methylation, regenerated crushed optic nerves, reversed glaucoma vision loss (Lu & Sinclair, Nature 2020), and extended remaining lifespan by +109% in aged 124-week-old mice (Macip et al., Nature Aging 2024).",
  },
  {
    term: "TET1 / TET2 DNA Demethylases & DNMT Methyltransferases",
    aliases: [
      "tet",
      "tet1",
      "tet2",
      "tet3",
      "tet1/tet2",
      "tet-dependent",
      "ten-eleven",
      "dnmt",
      "dnmt1",
      "dnmt3a",
      "dnmt3b",
      "demethylase",
      "demethylases",
    ],
    domain: "Epigenetic Enzymology",
    synopsis:
      "DNA methyltransferases (DNMT1, DNMT3A, DNMT3B) write and maintain methyl tags (5mC) on CpG sites, whereas Ten-Eleven Translocation dioxygenases (TET1, TET2, TET3) require Fe²⁺ and α-ketoglutarate (AKG) to oxidize 5mC into 5hmC and actively remove age-related hypermethylation.",
    whyItMatters:
      "Knocking out TET1 or TET2 completely blocks Yamanaka factor (OSK) rejuvenation and axon regeneration (Lu et al., Nature 2020), proving active DNA demethylation is required to turn back the biological clock.",
  },
  {
    term: "PRC2, Histone Marks (H3K9me3 / H3K27me3 / H3K4me1) & Epigenetic Information Theory",
    aliases: [
      "prc2",
      "h3k9me3",
      "h3k27me3",
      "h3k4me1",
      "h3k27ac",
      "ep300",
      "hp1",
      "hp1α",
      "hp1a",
      "lap2",
      "lap2α",
      "lap2a",
      "γh2ax",
      "gh2ax",
      "h2ax",
      "ice",
      "histone",
      "histones",
      "heterochromatin",
      "epigenetic",
      "epigenetics",
      "epigenome",
      "line-1",
      "retrotransposon",
      "retrotransposons",
      "rcm",
      "sinclair",
    ],
    domain: "Chromatin Biology & Information Theory of Aging",
    synopsis:
      "Epigenetics governs gene expression through DNA methylation and histone modifications: H3K9me3, H3K27me3 (deposited by Polycomb Repressive Complex 2, PRC2), HP1α, and nuclear lamina LAP2α compact silent heterochromatin and lock down LINE-1 retrotransposons, whereas γH2AX marks DNA double-strand breaks.",
    whyItMatters:
      "In the Information Theory of Aging (Yang & Sinclair, Cell 2023 ICE [Inducible Changes to the Epigenome] mouse), repeated recruitment of chromatin modifiers to repair DNA breaks erodes H3K9me3/H3K27me3 and derepresses inflammatory LINE-1 elements — an analog information loss reversible by OSK reprogramming.",
  },
  {
    term: "Chemical Cellular Reprogramming (VC6TF Small-Molecule Cocktails & NCC)",
    aliases: [
      "vc6tf",
      "chir99021",
      "gsk3",
      "gsk3β",
      "gsk3b",
      "repsox",
      "alk5",
      "sb431542",
      "tranylcypromine",
      "lsd1",
      "forskolin",
      "camp",
      "dot1l",
      "ezh2",
      "dznep",
      "ttnpb",
      "ncc",
      "small-molecule",
    ],
    domain: "Pharmacological Rejuvenation",
    synopsis:
      "Small-molecule drug combinations (such as VC6TF: Valproic acid [HDACi], CHIR99021 [GSK3β inhibitor], Repsox/SB431542 [TGF-β/ALK5 inhibitors], Tranylcypromine [LSD1 inhibitor], Forskolin [cAMP activator], DZNep [EZH2/DOT1L modulator], and TTNPB [RAR agonist]) that restore Nucleocytoplasmic Compartmentalization (NCC) and youthful DNAm age without viral vectors.",
    whyItMatters:
      "Demonstrates that epigenetic rejuvenation can be achieved with titratable oral or injectable small molecules (Yang, Sinclair et al., Aging 2023; Schoenfeldt et al., 2022) without genomic integration.",
  },
  {
    term: "Senescence Markers (p16INK4a, p21CIP1, SA-β-gal & TP53)",
    aliases: [
      "p16ink4a",
      "p16ink4a+",
      "p16",
      "p21",
      "p21cip1",
      "p21+",
      "cdkn2a",
      "cdkn1a",
      "sa-β-gal",
      "sa-β-gal+",
      "sa-b-gal",
      "tp53",
      "p53",
      "ink-attac",
      "g0",
      "g2",
      "pcna",
    ],
    domain: "Cellular Senescence & Oncology",
    synopsis:
      "Cyclin-dependent kinase inhibitors p16INK4a (CDKN2A) and p21CIP1 (CDKN1A, downstream of tumor suppressor TP53) enforce permanent G0/G1/G2 cell-cycle arrest (loss of PCNA proliferation) in damaged or aged cells, while lysosomal Senescence-Associated β-Galactosidase (SA-β-gal, active at pH 6.0) histologically marks senescent cells.",
    whyItMatters:
      "Clearing p16INK4a-positive senescent cells in transgenic INK-ATTAC mice (Baker & van Deursen, Nature 2011 & 2016) extended median lifespan by 24%–27% and delayed cataracts, sarcopenia, kidney glomerulosclerosis, and cardiac hypertrophy.",
  },
  {
    term: "Pharmacological Senolytics (Dasatinib + Quercetin, Fisetin, PCC1, FOXO4-DRI & SCAPs)",
    aliases: [
      "d+q",
      "dasatinib",
      "quercetin",
      "fisetin",
      "pcc1",
      "c1",
      "procyanidin",
      "foxo4-dri",
      "foxo4",
      "scap",
      "scaps",
      "bcl-2",
      "bcl2",
      "bcl-xl",
      "puma",
      "noxa",
      "pi3kδ",
      "pi3kd",
      "ic50",
      "navitoclax",
      "senomorphic",
      "senomorphics",
      "hit-and-run",
    ],
    domain: "Senolytic Pharmacology",
    synopsis:
      "Senescent cells resist pro-apoptotic PUMA/NOXA signaling by upregulating 6 Senescent Cell Anti-Apoptotic Pathways (SCAPs: BCL-2/BCL-xL, PI3Kδ/AKT, FOXO4–p53 nuclear tethering, Ephrins, HIF-1α, HSP90). Intermittent 'hit-and-run' senolytics (Dasatinib + Quercetin [D+Q], Fisetin, Procyanidin C1 [PCC1], FOXO4-DRI peptide) transiently block SCAPs so senescent cells self-destruct.",
    whyItMatters:
      "Because senescent cells take 4–6 weeks to re-accumulate, brief monthly hit-and-run pulses extend late-life mouse survival by 36%–64% (Xu & Kirkland, Nature Medicine 2018; Nature Metabolism 2021) and clear p16INK4a+ cells in human adipose tissue within 11 days.",
  },
  {
    term: "Immune-Mediated Senolysis (uPAR CAR-T, GPNMB Vaccines, PD-1/PD-L2 & NKG2D)",
    aliases: [
      "upar",
      "supar",
      "plaur",
      "car-t",
      "car",
      "gpnmb",
      "nkg2d",
      "mica",
      "micb",
      "hla-e",
      "pd-1",
      "pd-1+",
      "pd-l1",
      "pd-l2",
      "adcc",
      "nk",
      "fcγr",
      "fcgr",
    ],
    domain: "Immunotherapy & Senolysis",
    synopsis:
      "Next-generation senotherapies that harness the immune system to eliminate senescent cells: Chimeric Antigen Receptor T-cells (CAR-T) targeting surface Urokinase Plasminogen Activator Receptor (uPAR), peptide vaccines eliciting FcγR antibody-dependent cellular cytotoxicity (ADCC) against GPNMB, checkpoint blockade of senescent PD-L1/PD-L2 (which inhibit PD-1+ T/NK cells), and NKG2D surveillance.",
    whyItMatters:
      "A single infusion of uPAR-targeted CAR-T cells in mice cleared senescent cells lifelong, reversed liver fibrosis, and durably restored metabolic glucose tolerance and exercise capacity into old age (Amor & Lowe, Nature 2020 & Nature Aging 2024).",
  },
  {
    term: "Inflammaging, cGAS-STING, NLRP3 & SASP Cytokines (IL-6, IL-1β, TNF-α, NF-κB, GDF-15, PAI-1)",
    aliases: [
      "inflammaging",
      "cgas-sting",
      "cgas",
      "sting",
      "nlrp3",
      "il-6",
      "il-1",
      "il-1α",
      "il-1a",
      "il-1β",
      "il-1b",
      "tnf",
      "tnf-α",
      "tnf-a",
      "nf-κb",
      "nf-kb",
      "gdf-15",
      "pai-1",
      "tgf",
      "tgf-β",
      "tgf-β1",
      "tgf-b",
      "mek",
      "erk",
      "ap-1",
      "fos",
      "crp",
      "hs-crp",
    ],
    domain: "Immunogerontology & Inflammaging",
    synopsis:
      "Chronic, sterile, low-grade systemic inflammation ('inflammaging') driven by cytosolic DNA/mtDNA fragments triggering cGAS-STING, NLRP3 inflammasomes, MEK/ERK/AP-1 (FOS), and NF-κB to secrete IL-6, IL-1α/β, TNF-α, TGF-β1, mitochondrial stress factor GDF-15, and pro-fibrotic PAI-1.",
    whyItMatters:
      "Nullifying PAI-1 (SERPINE1 loss-of-function in Berne Amish kindreds, Khan & Vaughan, Sci Adv 2017) confers a +10-year longer human median lifespan (85 vs. 75 yr), lower fasting insulin, and longer leukocyte telomeres.",
  },
  {
    term: "Nutrient-Sensing Network (mTORC1 vs. mTORC2, AMPK, ULK1, TFEB, Becn1F121A & FOXO3A)",
    aliases: [
      "nutrient-sensing",
      "mtorc1",
      "mtorc2",
      "raptor",
      "rictor",
      "ampk",
      "ulk1",
      "tfeb",
      "becn1f121a",
      "foxo3a",
      "foxo3",
      "iis",
      "everolimus",
      "rad001",
    ],
    domain: "Longevity Pharmacology & Autophagy",
    synopsis:
      "The core cellular longevity switch: anabolic growth pathways (mTORC1 and Insulin/IGF-1 Signaling, IIS) promote protein synthesis and suppress cleanup, whereas energy-stress sensors (AMPK, ULK1, TFEB, Beclin-1 [Becn1F121A], and centenarian transcription factor FOXO3A) activate autophagy, mitophagy, and antioxidant DNA repair.",
    whyItMatters:
      "Pulsed weekly dosing of Rapamycin or Everolimus selectively inhibits mTORC1 (inducing autophagy and rejuvenating hematopoietic/immune stem cells) while allowing washout before mTORC2 inhibition causes insulin resistance (Mannick et al., Sci Transl Med 2014 & 2018).",
  },
  {
    term: "NIA Interventions Testing Program (ITP), Acarbose, Canagliflozin (SGLT2i), GLP-1 & 17α-Estradiol",
    aliases: [
      "itp",
      "nia",
      "nih",
      "um-het3",
      "c57bl",
      "6j",
      "acarbose",
      "canagliflozin",
      "sglt2",
      "sglt2i",
      "glp-1",
      "homa-ir",
      "c15",
      "17α-estradiol",
      "17a-estradiol",
      "metformin",
      "pearl",
    ],
    domain: "Mammalian Lifespan Pharmacology",
    synopsis:
      "The NIH National Institute on Aging (NIA) Interventions Testing Program (ITP) rigorously tests candidate longevity molecules across three independent laboratories in genetically heterogeneous UM-HET3 mice (complementing inbred C57BL/6J studies), alongside human metabolic modulators (SGLT2 inhibitors, GLP-1 agonists, Metformin, C15:0 pentadecanoic acid) that lower HOMA-IR insulin resistance.",
    whyItMatters:
      "Validated the most reproducible mammalian lifespan extensions in history: Rapamycin (+23%–26%, or +9%–14% started at age equivalent ~60 yr), Rapamycin + Acarbose (+29%–37%), Acarbose (+22% male), 17α-Estradiol (+19% male), Canagliflozin (+14% male), and Glycine (+4%–6%).",
  },
  {
    term: "CALERIE Trial, Fasting-Mimicking Diet (FMD), PLA2G7 & β-Hydroxybutyrate (β-OHB)",
    aliases: ["calerie", "fmd", "fasting-mimicking", "pla2g7", "β-ohb", "b-ohb", "ketone", "ketones", "cr", "longo"],
    domain: "Nutritional Geroscience & Clinical Trials",
    synopsis:
      "CALERIE is the landmark 2-year NIH randomized trial of caloric restriction in 220 healthy non-obese adults; Valter Longo's Fasting-Mimicking Diet (FMD) is a periodic 5-day low-calorie, low-protein, unsaturated-fat protocol that triggers ketogenesis (β-OHB) and autophagy while preserving lean mass.",
    whyItMatters:
      "CALERIE slowed the DunedinPACE epigenetic aging clock by 2%–3% and regenerated thymic T-cell output via macrophage PLA2G7 suppression (Science 2022; Nature Aging 2023), while 3 monthly FMD cycles reduced human biological age by 2.5 years (Nature Communications 2024).",
  },
  {
    term: "NAD+ Salvage (NAMPT), CD38 Ecto-NADase, PARP1 & PGC-1α Mitochondrial Biogenesis",
    aliases: [
      "nampt",
      "cd38",
      "parp1",
      "parp",
      "par",
      "adp-ribose",
      "mono-adp-ribosylation",
      "nadh",
      "tca",
      "β-oxidation",
      "b-oxidation",
      "pgc-1α",
      "pgc-1a",
      "pgc-1",
      "hif-1α",
      "hif-1a",
      "pseudohypoxia",
      "tfam",
      "apigenin",
      "78c",
    ],
    domain: "Cellular Bioenergetics & DNA Repair",
    synopsis:
      "NAMPT recycles nicotinamide into NMN and NAD+ (the oxidized cofactor paired with NADH in the TCA cycle and fatty-acid β-oxidation); PARP1/SIRT6 use NAD+ for poly/mono-ADP-ribosylation DNA repair; PGC-1α drives mitochondrial biogenesis; and inflammatory CD38 destroys ~100 molecules of NAD+ per catalytic cycle.",
    whyItMatters:
      "Age-related SASP inflammation upregulates CD38, draining intracellular NAD+ by ~50% and causing nuclear-mitochondrial pseudohypoxia; combining NAD+ precursors (NMN/NR) with CD38 inhibitors (apigenin, quercetin, 78c) restores SIRT1/SIRT3/PARP1 activity.",
  },
  {
    term: "PINK1/Parkin Mitophagy, Urolithin A, GlyNAC, Cardiolipin & SS-31 (Elamipretide)",
    aliases: [
      "pink1",
      "parkin",
      "urolithin",
      "urolithin a",
      "glynac",
      "glutathione",
      "gsh",
      "nac",
      "n-acetylcysteine",
      "gpx4",
      "8-ohdg",
      "f2-isoprostane",
      "enos",
      "inos",
      "cardiolipin",
      "ss-31",
      "elamipretide",
      "oxphos",
      "etc",
      "atp",
      "ros",
      "mmp",
      "δψm",
      "eif5a",
      "hypusination",
      "taurine",
      "ergothioneine",
      "astaxanthin",
      "akg",
      "ca-akg",
      "sulforaphane",
      "nrf2",
    ],
    domain: "Mitochondrial Quality Control & Redox Biology",
    synopsis:
      "PINK1 and Parkin tag depolarized mitochondria (low ΔΨm / MMP) for mitophagy so inner-membrane Cardiolipin and Electron Transport Chain (ETC / OXPHOS) complexes synthesize ATP without leaking reactive oxygen species (ROS) that form 8-OHdG DNA lesions, F2-isoprostanes, or GPX4-Sensitive ferroptosis.",
    whyItMatters:
      "Human RCTs show Urolithin A (500–1,000 mg/d) activates skeletal muscle mitophagy (+12% strength, Cell Rep Med 2022), GlyNAC (Glycine + N-Acetylcysteine) restores glutathione (+200%) and endothelial eNOS function in older adults (J Gerontol 2023), and SS-31 stabilizes inner-membrane cardiolipin.",
  },
  {
    term: "Telomeres (TTAGGG), Shelterin Complex & Telomerase (TERT / TERC)",
    aliases: [
      "telomere",
      "telomeres",
      "ttaggg",
      "telomerase",
      "tert",
      "terc",
      "shelterin",
      "trf1",
      "trf2",
      "pot1",
      "tin2",
      "tpp1",
      "rap1",
      "hayflick",
      "depinho",
    ],
    domain: "Chromosomal Biology & Replicative Senescence",
    synopsis:
      "Telomeres are repetitive TTAGGG DNA caps at chromosome ends folded into protective T-loops by the six-protein Shelterin complex (TRF1, TRF2, POT1, TIN2, TPP1, RAP1). Telomerase (catalytic subunit TERT + RNA template TERC) rebuilds shortened telomeres.",
    whyItMatters:
      "Senescence is triggered by the shortest-telomere threshold (~3 kb) rather than mean length; inducible TERT reactivation (Jaskelioff & DePinho, Nature 2011) and non-integrating AAV9-TERT (Blasco, EMBO Mol Med 2012) reversed multi-organ degeneration and extended mouse lifespan by 24% without increasing cancer.",
  },
  {
    term: "Heterochronic Parabiosis, Therapeutic Plasma Exchange (TPE / AMBAR) & Systemic Blood Factors (PF4, TIMP2, VCAM1, B2M)",
    aliases: ["parabiosis", "tpe", "nbe", "ambar", "plasmapheresis", "pf4", "cxcl4", "timp2", "vcam1", "ccl11", "b2m", "gdf11", "musc"],
    domain: "Systemic Milieu & Plasma Rejuvenation",
    synopsis:
      "Heterochronic parabiosis links the circulation of young and old animals; Therapeutic Plasma Exchange (TPE / Neutral Blood Exchange, NBE; human AMBAR Phase 2b/3 Alzheimer's trial) replaces aged plasma with saline + 5% purified albumin to dilute pro-aging factors (TGF-β1, B2M, CCL11, VCAM1) while elevating pro-youth factors (PF4, TIMP2, Oxytocin, α-Klotho) and rescuing muscle stem cells (MuSC).",
    whyItMatters:
      "Extended parabiosis detaches with a persistent 20%–30% liver/blood DNAm age reversal and +6%–9% lifespan extension (Zhang, Gladyshev et al., Nature Aging 2023), while the human AMBAR TPE trial slowed Alzheimer's decline by 52%–71% (Alzheimer's Dement 2020).",
  },
  {
    term: "Thymic Involution, TRIIM Trial (rhGH / DHEA / Metformin), FOXN1, sjTRECs & Clonal Hematopoiesis (CHIP)",
    aliases: [
      "triim",
      "triim-x",
      "rhgh",
      "ghr",
      "thymus",
      "thymic",
      "foxn1",
      "sjtrec",
      "sjtrecs",
      "chip",
      "hsc",
      "hscs",
      "cd150high",
      "cd4",
      "cd4+",
      "cd8",
      "cd8+",
      "cd8+cd28",
      "cd8+cd28-",
      "t-cell",
      "t-cells",
      "pbmc",
      "pbmcs",
      "wbc",
      "rbc",
      "igg",
    ],
    domain: "Immunosenescence & Thymic Regeneration",
    synopsis:
      "Thymic involution replaces FOXN1-governed thymic epithelial cortex with fat, collapsing naive CD4+/CD8+ T-cell output (sjTRECs) in peripheral blood mononuclear cells (PBMCs / WBCs) while exhausted CD8+CD28− T cells and myeloid-skewed CD150high bone marrow stem cells (HSCs / CHIP) accumulate.",
    whyItMatters:
      "In the human TRIIM trial (Fahy & Horvath, Aging Cell 2019), 12 months of recombinant human growth hormone (rhGH) + DHEA + Metformin regenerated functional thymic lymphoid tissue on MRI, restored naive T cells, and reversed GrimAge biological age by −2.5 years.",
  },
  {
    term: "Proteostasis, Chaperone-Mediated Autophagy (CMA), HSP70 & Ubiquitin-Proteasome",
    aliases: ["proteostasis", "cma", "hsc70", "lamp2a", "kferq", "macroautophagy", "autophagosome", "lysosome", "lysosomal", "chaperone", "chaperones", "hsp70", "hsp90", "hsf1", "rbm3", "ubiquitin", "proteasome", "ca77"],
    domain: "Protein Quality Control & Cellular Maintenance",
    synopsis:
      "Proteostasis maintains the proteome via molecular chaperones (HSF1-induced HSP70/HSP90 and cold-shock RBM3), the 26S Ubiquitin-Proteasome System, bulk Macroautophagy, and selective Chaperone-Mediated Autophagy (CMA, where HSC70 threads KFERQ-motif proteins through lysosomal LAMP2A receptors).",
    whyItMatters:
      "Preventing the age-related decline of lysosomal LAMP2A or activating CMA pharmacologically (CA77.1, Ana Maria Cuervo, Nature 2021) clears neurotoxic tau/α-synuclein aggregates and preserves aged hematopoietic stem cell function.",
  },
  {
    term: "Extracellular Matrix (ECM) Cross-Linking, Glucosepane (AGEs), LOX/LOXL2 & Piezo1 Mechanotransduction",
    aliases: [
      "ecm",
      "glucosepane",
      "age",
      "ages",
      "low-age",
      "lox",
      "loxl2",
      "mmp13",
      "lysyl oxidase",
      "collagen",
      "piezo1",
      "yap-taz",
      "stiffness",
      "cross-link",
      "cross-links",
      "cross-linking",
      "hyaluronan",
      "ha",
      "hmw-ha",
      "rhamm",
      "pirfenidone",
      "ipf",
      "cvd",
    ],
    domain: "Extracellular Matrix Biology & Mechanobiology",
    synopsis:
      "Aged tissues stiffen due to non-enzymatic Advanced Glycation End-product (AGE) cross-links (dominated >90% in humans by Glucosepane), enzymatic Lysyl Oxidase (LOX / LOXL2) collagen cross-linking, MMP13 remodeling, and loss of High-Molecular-Weight Hyaluronan (HMW-HA), driving Idiopathic Pulmonary Fibrosis (IPF), Cardiovascular Disease (CVD), and Piezo1/YAP-TAZ mechanotransduction.",
    whyItMatters:
      "Human ovaries stiffen 4-fold with age (~4.5 kPa to ~18.5 kPa), trapping follicles; softening the stiffened ECM or inhibiting fibrosis (Pirfenidone, LOXL2 blockade, low-AGE diet, or HMW-HA restoration) rescues both brain oligodendrocyte progenitor cells (Segel et al., Nature 2019) and ovarian follicle maturation.",
  },
  {
    term: "Comparative Longevity: Naked Mole-Rat (nmrHas2), Bowhead Whale (CIRBP / ERCC1), LAV-BPIFB4 & Peto's Paradox",
    aliases: [
      "mole-rat",
      "naked mole-rat",
      "nmrhas2",
      "has2",
      "cirbp",
      "ercc1",
      "lav-bpifb4",
      "peto",
      "gompertz",
      "bowhead",
      "sirt6",
      "sirt7",
      "centenarian",
      "centenarians",
      "progerin",
    ],
    domain: "Comparative Genomics & Evolutionary Longevity",
    synopsis:
      "Long-lived species and human centenarians (enriched for vascular-protective LAV-BPIFB4 and FOXO3A) defy Gompertz exponential mortality and Peto's Paradox via hyper-efficient DNA repair (SIRT6 in beavers/centenarians; CIRBP and ERCC1 in >200-yr Bowhead Whales) and anti-inflammatory High-Molecular-Weight Hyaluronan (nmrHas2 in Naked Mole-Rats).",
    whyItMatters:
      "Whole-genome crypt sequencing across 16 mammalian species (Cagan et al., Nature 2022) proved somatic mutation rates scale inversely with species lifespan, and transferring the naked mole-rat nmrHas2 gene into mice cut spontaneous cancer by 50%–70% and extended lifespan (Gorbunova, Nature 2023).",
  },
  {
    term: "VO2max, Zone 2 Mitochondrial Training, Norwegian 4×4 HIIT & Thermal Hormesis (Sauna / HBOT)",
    aliases: ["vo2max", "hiit", "hrmax", "hrv", "rmssd", "hormesis", "sauna", "hbot", "sarcopenia"],
    domain: "Exercise Physiology & Hormetic Medicine",
    synopsis:
      "VO2max (maximal oxygen uptake in mL O₂/kg/min) integrates cardiac stroke volume, capillary density, and skeletal muscle mitochondrial oxidative capacity; trained via steady Zone 2 aerobic base work plus high-intensity intervals (Norwegian 4×4 HIIT) and paired with thermal sauna hormesis (80–90°C).",
    whyItMatters:
      "Across 122,007 adults (Mandsager et al., JAMA Netw Open 2018), moving from low to elite VO2max reduces all-cause mortality by 80% (HR = 0.20); 2 years of structured training in 50-year-olds reversed 20 years of left-ventricular cardiac stiffening (Levine, Circulation 2018), and 4–7×/wk sauna cuts fatal CVD by 50%.",
  },
  {
    term: "Glymphatic System (AQP4), Meningeal Lymphatics, α-Klotho & CNS Microglial Rejuvenation",
    aliases: [
      "glymphatic",
      "cns",
      "aqp4",
      "aquaporin-4",
      "csf",
      "klotho",
      "α-klotho",
      "kl-vs",
      "microglia",
      "trem2",
      "ep2",
      "bdnf",
      "ltp",
      "glun2b",
      "amyloid",
      "amyloid-β",
      "tau",
      "apoe",
      "apoe4",
      "apoe2",
      "plasmalogen",
    ],
    domain: "Neurobiology & Brain Rejuvenation",
    synopsis:
      "During deep slow-wave NREM sleep in the central nervous system (CNS), cerebrospinal fluid (CSF) pulses through astrocyte Aquaporin-4 (AQP4) water channels (the Glymphatic system, Nedergaard 2012) and drains via dural meningeal lymphatics (Kipnis 2015) to clear amyloid-β and tau, while longevity hormone α-Klotho (via platelet PF4) and microglial EP2 blockade restore hippocampal Long-Term Potentiation (LTP) and BDNF.",
    whyItMatters:
      "Restoring meningeal lymphatic drainage (VEGF-C), inhibiting microglial Prostaglandin E2 receptor EP2 (Minhas & Andreasson, Nature 2021), or administering low-dose α-Klotho (Castner & Dubal, Nature Aging 2023) rescues aged primate and rodent working memory.",
  },
  {
    term: "In Vitro Fertilization (IVF), Assisted Reproductive Technology (ART), Protocols (GnRH / HRT) & Endometrial Receptivity (ERA, VEGF, HOXA10, CD44)",
    aliases: [
      "ivf",
      "ivf-derived",
      "art",
      "cos",
      "gnrh",
      "hrt",
      "era",
      "vegf",
      "hoxa10",
      "cd44",
      "versen-h",
      "zym",
      "zymot",
      "nipt",
      "tac",
      "first",
      "trophy",
      "antarctica",
      "compete",
      "tsh",
      "t3",
      "t4",
      "bmi",
      "ffm",
    ],
    domain: "Reproductive Medicine & Clinical IVF",
    synopsis:
      "In Vitro Fertilization (IVF) and Assisted Reproductive Technology (ART) combine Controlled Ovarian Stimulation (COS using GnRH antagonist/agonist protocols), sperm selection (e.g., ZyMot / ZyM microfluidics), embryo culture, and transfer into a synchronized uterus (natural/ovulatory vs. programmed Hormone Replacement Therapy [HRT] cycles) guided by vascular VEGF, HOXA10, and CD44 hyaluronan adhesion receptors.",
    whyItMatters:
      "Clinical trials (ANTARCTICA, TROPHY, FIRST, COMPETE) show that intact corpus luteum function in ovulatory FET cycles lowers pre-eclampsia risk by ~40%–50% compared to programmed HRT cycles, while optimizing thyroid status (TSH < 2.5 mIU/L), BMI, and hyaluronan-CD44 bridging maximizes live birth.",
  },
  {
    term: "EmbryoGlue (Hyaluronan-Enriched Embryo Transfer Medium)",
    aliases: ["embryoglue", "hyaluronic"],
    domain: "Clinical Embryology & Implantation",
    synopsis:
      "A specialized embryo transfer medium enriched with high-concentration recombinant hyaluronan (hyaluronic acid, 0.5 mg/mL) and recombinant human albumin that mimics natural uterine secretions during the window of implantation.",
    whyItMatters:
      "Cochrane systematic reviews (Heymann et al. 2020/2022, 26 RCTs, n=6,704) confirm that high-hyaluronan transfer medium significantly increases clinical live birth rate (RR = 1.21, 95% CI 1.11–1.31; NNT ~14) by bridging CD44 receptors between the blastocyst trophectoderm and receptive endometrium.",
  },
  {
    term: "Harvard Fertility Diet (NHS-II), EARTH Pro-Fertility Diet, LIFE & PRESTO Cohorts",
    aliases: [
      "nhs-ii",
      "earth",
      "life",
      "presto",
      "chavarro",
      "gaskins",
      "prbs",
      "high-pesticide",
      "low-pesticide",
      "whole-grain",
      "fertinuts",
      "mediterranean",
    ],
    domain: "Reproductive Epidemiology & Nutritional Endocrinology",
    synopsis:
      "Landmark prospective fertility cohorts: Harvard's Nurses' Health Study II (NHS-II, n=17,544 women), the MGH Environment and Reproductive Health (EARTH) IVF cohort, NIH LIFE, and Boston University PRESTO, alongside the USDA Pesticide Residue Burden Score (PRBS) and FERTINUTS sperm epigenetics RCT.",
    whyItMatters:
      "In NHS-II (Chavarro et al., Obstet Gynecol 2007), the low-glycemic Harvard Fertility Diet reduced ovulatory infertility by 66% (RR = 0.34; 84% with exercise), while in EARTH (Gaskins et al., AJOG 2019), the 6-component Pro-Fertility Diet raised IVF/FET live birth rates from 33% to 56%.",
  },
  {
    term: "Glycemic/Insulinemic Index (GI / GL / II), SHBG, HNF-4α, PPAR-γ, Myo-Inositol, Folate (5-MTHF / B12) & Omega-3 (EPA/DHA)",
    aliases: [
      "gi",
      "gl",
      "ii",
      "insulinemic",
      "low-glycemic",
      "shbg",
      "hnf-4α",
      "hnf-4a",
      "ppar-γ",
      "ppar-g",
      "mfgm",
      "cla",
      "myo-inositol",
      "inositol",
      "epa",
      "dha",
      "epa+dha",
      "omega-3",
      "bpa",
      "folate",
      "5-mthf",
      "b12",
      "b6",
      "d3",
      "mk-4",
      "q10",
      "coq10",
      "l-arginine",
      "betaine",
      "homocysteine",
      "l-carnitine",
    ],
    domain: "Reproductive Metabolism & Endocrinology",
    synopsis:
      "Glycemic Index/Load (GI/GL) and Insulinemic Index (II) measure postprandial glucose and insulin spikes; hepatic HNF-4α produces Sex Hormone-Binding Globulin (SHBG); PPAR-γ, Myo-Inositol, CoQ10 (Q10), L-Carnitine, L-Arginine, Vitamin D3/MK-4, and marine Omega-3s (EPA+DHA) support follicular bioenergetics; and 5-MTHF folate + Vitamin B12/B6/Betaine drive one-carbon homocysteine remethylation.",
    whyItMatters:
      "High dietary sugars/fructose suppress hepatic HNF-4α (dropping SHBG by 30%–50%), while 5-MTHF (>800 µg/d) + Vitamin B12 clears follicular homocysteine and neutralizes urinary BPA toxicity in IVF cohorts (EARTH, Gaskins et al.).",
  },
  {
    term: "Ovarian Bioenergetics (MAMs, TZPs, TNTs, PLCζ), Cycle Hormones (E2/P4) & RED-S",
    aliases: [
      "mam",
      "mams",
      "tzp",
      "tzps",
      "tnt",
      "tnts",
      "connexin",
      "plcζ",
      "plcz",
      "red-s",
      "poi",
      "dor",
      "e2",
      "e3g",
      "p4",
      "pdg",
      "dpo",
      "lpd",
      "luf",
      "nsaid",
      "nsaids",
      "h2oil",
      "hsg",
      "lhcgr",
      "star",
      "kisspeptin",
      "hpg",
      "bmal1",
      "clock",
      "melatonin",
      "circadian",
    ],
    domain: "Ovarian Physiology & Reproductive Bioenergetics",
    synopsis:
      "Cumulus cells nourish the maturing oocyte via Transzonal Projections (TZPs) and Tunneling Nanotubes (TNTs), while Mitochondria-Associated Membranes (MAMs) conduct sperm PLCζ-triggered Ca²⁺ oscillations at fertilization; systemic Hypothalamic-Pituitary-Gonadal (HPG) timing depends on Kisspeptin, circadian BMAL1/CLOCK, Estradiol (E2/E3G), and corpus luteum Progesterone (P4/PdG).",
    whyItMatters:
      "Relative Energy Deficiency in Sport (RED-S, <30 kcal/kg FFM/day) suppresses Kisspeptin/LH pulsatility; mid-cycle NSAIDs can block prostaglandin follicle rupture causing Luteinized Unruptured Follicle (LUF) syndrome; and Lipiodol tubal flushing (H2Oil NEJM 2017 RCT, n=1,119) boosts 6-month live birth from 28.1% to 38.8%.",
  },
  {
    term: "Reproductive Longevity Genomics (DDR, BRCA1/2, MCM8/9, CHEK2, TAp63α), TFR, ALB & HLA-G",
    aliases: [
      "ddr",
      "dsb",
      "ber",
      "brca1",
      "brca2",
      "mcm8",
      "mcm9",
      "helq",
      "rad51",
      "palb2",
      "atm",
      "atr",
      "ogg1",
      "apex1",
      "polg",
      "chek2",
      "tap63α",
      "tap63a",
      "tfr",
      "afb",
      "alb",
      "necs",
      "updb",
      "llfs",
      "gwas",
      "snp",
      "snps",
      "hla",
      "hla-g",
      "unk",
      "kir2dl4",
      "cac",
      "hutterite",
      "hutterites",
      "tsimane",
      "sardinia",
      "ogliastra",
      "aspre",
      "eset",
      "sets",
      "rif",
      "lif",
      "lbr",
      "clbr",
    ],
    domain: "Reproductive Genetics, Immunology & Biodemography",
    synopsis:
      "Large-scale Genome-Wide Association Studies (GWAS, Ruth et al., Nature 2021, n=201,323) prove 68% of human reproductive lifespan genes belong to DNA Damage Response (DDR) and Double-Strand Break Homologous Recombination (BRCA1/2, MCM8/9, HELQ, RAD51) versus the CHEK2/TAp63α oocyte apoptosis checkpoint, while embryonic HLA-G governs uterine NK-cell implantation tolerance.",
    whyItMatters:
      "In longevity cohorts (NECS, UPDB, LLFS) and high-fertility populations (Hutterites, TFR 9.8; Sardinian Blue Zone), late natural Age at Last Birth (ALB ≥40–45) predicts 2×–4× higher odds of living to 100 and lower brother mortality, linking germline DNA repair directly to systemic longevity.",
  },
  {
    term: "Clinical Biostatistics & Effect-Size Metrics (HR, aOR, FOR, NNT, SD, IQR & FDR)",
    aliases: ["hr", "aor", "for", "nnt", "sd", "se", "iqr", "auc", "fdr", "q1", "q4"],
    domain: "Biostatistics & Clinical Epidemiology",
    synopsis:
      "Standard quantitative metrics in clinical research: Hazard Ratio (HR, instantaneous event rate ratio over time), Adjusted Odds Ratio (aOR, odds ratio controlling for confounders), Fecundability Odds Ratio (FOR, monthly probability of conception), Number Needed to Treat (NNT), Standard Deviation (SD), Interquartile Range (IQR, Q1–Q4 quartiles), and False Discovery Rate (FDR).",
    whyItMatters:
      "Separates relative headlines from absolute clinical impact — for example, HR = 0.20 represents an 80% reduction in mortality hazard, while NNT quantifies how many patients must receive an intervention to achieve one additional live birth or prevented event.",
  },
  {
    term: "Bibliographic Identifiers, Clinical Units & Major Medical Journals (PMID, DOI, NCT, JAMA, NEJM, PNAS)",
    aliases: [
      "pmid",
      "doi",
      "nct",
      "et",
      "al",
      "vs",
      "versus",
      "yr",
      "mg",
      "ml",
      "ng",
      "µg",
      "μg",
      "iu",
      "miu",
      "kpa",
      "kb",
      "bp",
      "im",
      "iv",
      "bid",
      "mrna",
      "dna",
      "rna",
      "mri",
      "jama",
      "nejm",
      "pnas",
      "elife",
      "ajog",
      "ajcn",
      "jcem",
      "jbc",
      "plos",
      "jci",
      "embo",
      "rbmo",
      "jarg",
      "reprod",
      "hum",
      "fertil",
      "steril",
      "fertnstert",
      "med",
      "eshre",
      "asrm",
      "sart",
      "hfea",
      "fda",
      "ema",
      "mgh",
      "ebiomedicine",
    ],
    domain: "Scientific Nomenclature, Units & Primary Literature",
    synopsis:
      "Primary research identifiers (PMID = PubMed Identifier; DOI = Digital Object Identifier; NCT = ClinicalTrials.gov registry number; et al. = 'and others'), core molecular concepts (DNA = Deoxyribonucleic Acid; RNA / mRNA = Messenger Ribonucleic Acid; MRI = Magnetic Resonance Imaging), clinical units/routes (mg, mL, ng, µg, IU, kPa, kb, IV = intravenous, IM = intramuscular, BID = twice daily), and peer-reviewed journals (NEJM, JAMA, PNAS, eLife, AJOG, JCEM, JBC, Hum Reprod, Fertil Steril).",
    whyItMatters:
      "Every quantitative claim in Library of Alexandria is anchored to verifiable primary identifiers (DOI, PMID, or NCT) and standardized physiological units.",
  },
  {
    term: "Developmental Bioelectricity (Vmem), BioDome, Xenobots, Anthrobots & Blastema Morphogenesis",
    aliases: [
      "vmem",
      "bioelectric",
      "bioelectricity",
      "biodome",
      "xenobot",
      "xenobots",
      "anthrobot",
      "anthrobots",
      "blastema",
      "levin",
      "planaria",
      "planarian",
      "axolotl",
      "ionophore",
      "gap junction",
    ],
    domain: "Developmental Bioelectricity & Regenerative Morphogenesis",
    synopsis:
      "Non-neural resting membrane voltage gradients (Vmem) across gap-junction-coupled cell networks act as an instructive bioelectric pre-pattern guiding organ and limb morphogenesis (Michael Levin, Tufts University), alongside synthetic living biobots (frog Xenobots and human tracheal Anthrobots) and regenerative blastema formation.",
    whyItMatters:
      "A single 24-hour silk-hydrogel BioDome exposure delivering 5 pro-regenerative small molecules (1,4-DPCA, BDNF, GH, resolvin D5, retinoic acid) induced 18 months of functional hindlimb regrowth with bone, nerves, and sensorimotor recovery in adult Xenopus frogs (Murugan & Levin, Science Advances 2022).",
  },
  {
    term: "Dental & Whole-Tooth Regeneration (USAG-1 / TRG035, Tideglusib, SHED/DPSC & CPIC Enamel)",
    aliases: [
      "usag-1",
      "anti-usag-1",
      "trg035",
      "sostdc1",
      "bmp",
      "bmp2",
      "bmp7",
      "bmp9",
      "tideglusib",
      "shed",
      "dpsc",
      "dpscs",
      "cpic",
      "cpics",
      "p11-4",
      "curodont",
      "ameloblast",
      "amelogenin",
      "dentin",
      "enamel",
      "gpa",
    ],
    domain: "Craniofacial & Dental Regenerative Medicine",
    synopsis:
      "Whole-tooth and dental tissue regeneration: anti-USAG-1 neutralizing antibody (TRG035 / Toregem Biopharma, Katsu Takahashi) blocks USAG-1 (SOSTDC1) to disinhibit endogenous BMP/Wnt signaling and awaken dormant third-dentition tooth buds; GSK3β inhibitor Tideglusib stimulates Tertiary Reparative Dentin; deciduous SHED stem cells regenerate vascularized dental pulp; and Calcium Phosphate Ion Clusters (CPICs) or P11-4 peptides epitaxially regrow hydroxyapatite enamel.",
    whyItMatters:
      "Single-dose anti-USAG-1 generated complete functional third teeth in mice and ferrets (Sci Adv 2021) and entered first-in-human clinical trials in Kyoto (2024), while autologous SHED transplantation regenerated innervated, vascularized dental pulp with root elongation in human children (Xuan et al., Sci Transl Med 2018).",
  },
  {
    term: "Tissue & Organ Regeneration Pathways (15-PGDH / PGE2, Hippo YAP/MST1/LATS1, ERBB2, ELOVL2 & Cochlear LY411575/OTOF)",
    aliases: [
      "15-pgdh",
      "pge2",
      "sw033291",
      "mst1",
      "lats1",
      "xmu-mp-1",
      "taz",
      "fak",
      "erbb2",
      "elovl2",
      "ly411575",
      "dfnb9",
      "otof",
      "abr",
      "lgr5",
      "lgr5+",
      "atoh1",
      "β-catenin",
      "b-catenin",
      "sscs",
      "swift",
      "slate",
      "perv",
      "sionps",
    ],
    domain: "Organ, Sensory & Stem Cell Regeneration",
    synopsis:
      "Core mammalian regeneration switches: inhibiting 15-PGDH (SW033291) restores Prostaglandin E2 (PGE2) to rejuvenate aged muscle and hematopoietic stem cells (Blau, Science 2015/2021); Hippo kinase (MST1/LATS1) inhibitor XMU-MP-1 or transient ERBB2 unlocks liver and cardiomyocyte proliferation; ELOVL2 restores retinal long-chain PUFAs; and Notch/GSK3 cocktails (LY411575 + CHIR99021) or AAV-OTOF (DFNB9) regenerate cochlear hair-cell hearing.",
    whyItMatters:
      "Demonstrates that adult mammals retain latent regenerative programs across heart, liver, skeletal muscle, retina, and inner ear that are actively held back by developmental brakes (15-PGDH, Hippo MST1/LATS1, Notch) rather than permanently lost.",
  },
  {
    term: "Nuclear Lamina (LMNA / HGPS / SUN1 / NAT10), Werner Syndrome (WRN), 3TC Retrotransposon Suppression & Microbiome (isoalloLCA / FMT)",
    aliases: [
      "lmna",
      "hgps",
      "sun1",
      "nat10",
      "remodelin",
      "lads",
      "wrn",
      "suv39h1",
      "hdac",
      "hdac1",
      "kap1",
      "3tc",
      "l1",
      "ccfs",
      "cdna",
      "h2s",
      "cse",
      "bh4",
      "fsp1",
      "coq10h2",
      "slc22a4",
      "octn1",
      "isoallolca",
      "fmt",
      "bhb",
      "sfa-1",
      "srsf",
      "hnrnp",
      "rqc",
      "rps23",
    ],
    domain: "Genomic Stability, Nuclear Architecture & Systemic Longevity",
    synopsis:
      "Nuclear envelope integrity (LMNA / Lamin A, disrupted in Hutchinson-Gilford Progeria Syndrome [HGPS] and rescued by base editing or NAT10 inhibitor Remodelin), WRN helicase / SUV39H1 heterochromatin maintenance, reverse-transcriptase inhibitor 3TC (lamivudine) blocking LINE-1 (L1) cDNA inflammaging, FSP1-CoQ10H2 anti-ferroptosis, H2S gasotransmitter signaling, and centenarian microbiome secondary bile acids (isoalloLCA).",
    whyItMatters:
      "In vivo adenine base editing of the LMNA c.1824C>T mutation in progeria mice (Koblan & Liu, Nature 2021) restored vascular smooth muscle and extended lifespan by 2.4-fold, while 3TC silences L1 retrotransposon cDNA accumulation in senescent tissues (De Cecco & Sedivy, Nature 2019).",
  },
];

const GLOSSARY_CANDIDATES = new Map<string, GlossaryEntry[]>();
function addGlossaryCandidate(key: string, entry: GlossaryEntry): void {
  const existing = GLOSSARY_CANDIDATES.get(key);
  if (!existing) {
    GLOSSARY_CANDIDATES.set(key, [entry]);
  } else if (!existing.some((e) => e.term === entry.term)) {
    existing.push(entry);
  }
}

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
      addGlossaryCandidate(k, entry);
      const asciiKey = k.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
      addGlossaryCandidate(asciiKey, entry);
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
  plasma: { pos: "noun", def: "The liquid, cell-free component of blood that transports proteins, hormones, nutrients, and signaling factors throughout the body." },
  serum: { pos: "noun", def: "The clear fluid portion of blood remaining after clotting proteins (fibrinogen) have been removed, widely used for hormone and biomarker assays." },
  blood: { pos: "noun", def: "The circulating fluid tissue composed of plasma, red blood cells, white blood cells, and platelets that delivers oxygen and systemic signals across organs." },
  tissue: { pos: "noun", def: "An organized ensemble of specialized cells and extracellular matrix that performs a specific physiological function in an organ." },
  organ: { pos: "noun", def: "A differentiated anatomical structure (such as the heart, brain, liver, kidney, or ovary) composed of multiple tissues working together." },
  cell: { pos: "noun", def: "The fundamental membrane-bound structural and functional unit of all living organisms." },
  cellular: { pos: "adjective", def: "Relating to or occurring within biological cells." },
  molecular: { pos: "adjective", def: "Relating to molecules, particularly DNA, RNA, proteins, and signaling metabolites inside cells." },
  somatic: { pos: "adjective", def: "Relating to non-reproductive body cells (such as skin, blood, muscle, or liver cells), as distinct from germline eggs and sperm." },
  germline: { pos: "noun / adjective", def: "The lineage of reproductive germ cells (oocytes and sperm) that pass genetic information from one generation to the next." },
  embryonic: { pos: "adjective", def: "Relating to an embryo in its earliest developmental stages." },
  stem: { pos: "noun / verb", def: "An undifferentiated precursor cell capable of both self-renewal and differentiation into specialized tissue cells." },
  embryo: { pos: "noun", def: "An early-stage multicellular organism formed after fertilization of an oocyte by a sperm." },
  sperm: { pos: "noun", def: "The mature male reproductive cell (spermatozoon) carrying 23 paternal chromosomes." },
  egg: { pos: "noun", def: "The female reproductive germ cell (oocyte) carrying 23 maternal chromosomes and cytoplasmic mitochondria." },
  pregnancy: { pos: "noun", def: "The physiological state in which a fertilized embryo implants and develops within the uterus until birth." },
  gestation: { pos: "noun", def: "The period of fetal development inside the uterus from conception to birth." },
  miscarriage: { pos: "noun", def: "Spontaneous loss of a clinical pregnancy before 20 weeks of gestation, most commonly caused by embryonic chromosomal aneuploidy." },
  ovulation: { pos: "noun", def: "The mid-cycle release of a mature egg (oocyte) from a dominant ovarian follicle triggered by a surge in luteinizing hormone (LH)." },
  ovulatory: { pos: "adjective", def: "Relating to or characterized by regular ovulation (release of a mature egg from the ovary)." },
  conception: { pos: "noun", def: "The successful fertilization of an oocyte by a sperm and subsequent implantation to initiate pregnancy." },
  fecundability: { pos: "noun", def: "The probability of achieving pregnancy or live birth within a single menstrual cycle." },
  birth: { pos: "noun", def: "The delivery of a viable infant at the conclusion of pregnancy." },
  reproductive: { pos: "adjective", def: "Relating to biological reproduction, fertility, and the organs or hormones that support conception and gestation." },
  menopause: { pos: "noun", def: "The permanent cessation of menstrual cycles resulting from the depletion of active ovarian follicles, occurring at a median age of 51." },
  progesterone: { pos: "noun", def: "The primary steroid hormone secreted by the ovarian corpus luteum (and placenta) that prepares the uterine lining for embryo implantation and sustains pregnancy." },
  estrogen: { pos: "noun", def: "The group of steroid hormones (principally estradiol, E2) produced by growing ovarian follicles that proliferate the endometrium and regulate reproductive and vascular health." },
  estradiol: { pos: "noun", def: "The most potent endogenous estrogen (E2) secreted by granulosa cells of developing ovarian follicles." },
  testosterone: { pos: "noun", def: "The primary androgen steroid hormone required for spermatogenesis in men and early preantral follicle growth in women." },
  insulin: { pos: "noun", def: "A peptide hormone secreted by pancreatic beta cells that regulates cellular glucose uptake and activates anabolic IGF-1/mTOR signaling." },
  glucose: { pos: "noun", def: "The primary simple sugar circulating in the blood and oxidized by cells to generate ATP energy." },
  hormone: { pos: "noun", def: "A chemical messenger secreted into the bloodstream or local tissue to regulate distant organ physiology and gene expression." },
  endocrine: { pos: "adjective", def: "Relating to hormone-secreting glands (such as the pituitary, thyroid, adrenal glands, and ovaries/testes) that signal through the bloodstream." },
  protein: { pos: "noun", def: "A folded chain of amino acids encoded by genes that performs structural, enzymatic, transport, or signaling work in cells." },
  peptide: { pos: "noun", def: "A short chain of amino acids that acts as a hormone, neurotransmitter, or biological signaling molecule." },
  enzyme: { pos: "noun", def: "A biological protein catalyst that accelerates a specific chemical reaction inside or outside cells." },
  receptor: { pos: "noun", def: "A specialized protein on the cell surface or within the nucleus that binds a specific hormone, neurotransmitter, or drug to trigger a cellular response." },
  ligand: { pos: "noun", def: "A molecule (such as a hormone, cytokine, or growth factor) that binds specifically to a target receptor protein." },
  pathway: { pos: "noun", def: "A cascade of interacting enzymes, receptors, and transcription factors that transmits a biological signal or carries out a metabolic process." },
  transcription: { pos: "noun", def: "The cellular process of copying a DNA gene sequence into messenger RNA (mRNA) by RNA polymerase." },
  transcriptomic: { pos: "adjective", def: "Relating to the complete set of messenger RNA transcripts expressed by a cell or tissue at a given time." },
  translation: { pos: "noun", def: "The ribosomal process of decoding messenger RNA (mRNA) into a functional amino-acid protein chain." },
  gene: { pos: "noun", def: "A specific hereditary segment of DNA that encodes a functional protein or regulatory RNA molecule." },
  genetic: { pos: "adjective", def: "Relating to genes, heredity, or the underlying DNA sequence." },
  genomic: { pos: "adjective", def: "Relating to the complete DNA sequence (genome) of an organism or cell." },
  genome: { pos: "noun", def: "The complete set of nuclear and mitochondrial DNA instructions inside an organism's cells." },
  chromosome: { pos: "noun", def: "A thread-like structure of tightly packaged DNA and histone proteins in the cell nucleus (23 pairs, or 46 total, in normal human somatic cells)." },
  promoter: { pos: "noun", def: "A regulatory DNA region immediately upstream of a gene where transcription factors and RNA polymerase bind to switch the gene on or off." },
  enhancer: { pos: "noun", def: "A short regulatory DNA region that binds transcription factors to boost the expression of target genes and maintain cell-type identity." },
  allele: { pos: "noun", def: "One of two or more alternative versions of a gene or genetic locus inherited from each parent." },
  mutation: { pos: "noun", def: "A permanent alteration in the nucleotide sequence of nuclear or mitochondrial DNA." },
  variant: { pos: "noun", def: "A specific genetic sequence difference (polymorphism or mutation) between individuals or populations." },
  phenotype: { pos: "noun", def: "The observable physiological, clinical, and biochemical traits of an organism resulting from the interaction of its genotype and environment." },
  phenotypic: { pos: "adjective", def: "Relating to observable physiological or clinical traits rather than DNA sequence alone." },
  genotype: { pos: "noun", def: "The specific genetic makeup or combination of alleles carried by an individual." },
  metabolism: { pos: "noun", def: "The sum of all chemical reactions in cells that convert nutrients into ATP energy and cellular building blocks." },
  metabolic: { pos: "adjective", def: "Relating to cellular energy production, nutrient processing, and biochemical homeostasis." },
  vascular: { pos: "adjective", def: "Relating to blood vessels (arteries, capillaries, and veins) and microcirculatory perfusion." },
  arterial: { pos: "adjective", def: "Relating to arteries, the muscular blood vessels that carry oxygenated blood from the heart to organs." },
  cardiac: { pos: "adjective", def: "Relating to the heart and myocardial function." },
  coronary: { pos: "adjective", def: "Relating to the arteries that supply oxygenated blood directly to the heart muscle." },
  hepatic: { pos: "adjective", def: "Relating to the liver." },
  liver: { pos: "noun", def: "The central metabolic organ responsible for detoxification, protein synthesis, lipid regulation, and SHBG/IGF-1 production." },
  renal: { pos: "adjective", def: "Relating to the kidneys and glomerular filtration." },
  kidney: { pos: "noun", def: "The paired organ that filters metabolic waste from the blood, regulates blood pressure, and expresses the longevity protein α-Klotho." },
  pulmonary: { pos: "adjective", def: "Relating to the lungs and respiratory gas exchange." },
  neural: { pos: "adjective", def: "Relating to neurons and the central or peripheral nervous system." },
  brain: { pos: "noun", def: "The central organ of the nervous system governing cognition, memory, neuroendocrine signaling, and autonomic regulation." },
  cognitive: { pos: "adjective", def: "Relating to mental processes of memory, executive function, attention, and information processing." },
  synapse: { pos: "noun", def: "The specialized junction between two neurons across which electrical or chemical signals are transmitted." },
  synaptic: { pos: "adjective", def: "Relating to neural synapses and the strength of connections between brain cells." },
  axon: { pos: "noun", def: "The long nerve fiber projection of a neuron that conducts electrical impulses to target cells." },
  neuron: { pos: "noun", def: "An electrically excitable nerve cell that processes and transmits information in the brain and nervous system." },
  muscle: { pos: "noun", def: "Contractile tissue (skeletal, cardiac, or smooth) rich in mitochondria that generates force, locomotion, and systemic myokine signals." },
  skeletal: { pos: "adjective", def: "Relating to the bony skeleton or the voluntary striated muscles attached to bones." },
  adipose: { pos: "adjective / noun", def: "Body fat tissue that stores energy and acts as an endocrine organ secreting leptin, adiponectin, and inflammatory cytokines." },
  bone: { pos: "noun", def: "Mineralized connective tissue that forms the skeleton and houses hematopoietic bone marrow." },
  marrow: { pos: "noun", def: "The spongy tissue inside bones containing hematopoietic stem cells (HSCs) that produce red blood cells, platelets, and immune leukocytes." },
  immune: { pos: "adjective", def: "Relating to the body's defense system of T cells, B cells, NK cells, macrophages, and antibodies." },
  lymphoid: { pos: "adjective", def: "Relating to the adaptive immune lineage (T lymphocytes, B lymphocytes, and NK cells) and organs such as the thymus, spleen, and lymph nodes." },
  myeloid: { pos: "adjective", def: "Relating to the innate bone-marrow lineage (monocytes, macrophages, neutrophils, erythrocytes, and platelets)." },
  macrophage: { pos: "noun", def: "A phagocytic innate immune cell that engulfs cellular debris and pathogens, and in aged tissues can express inflammatory CD38 and cytokines." },
  monocyte: { pos: "noun", def: "A circulating white blood cell derived from bone marrow that differentiates into tissue macrophages and dendritic cells." },
  lymphocyte: { pos: "noun", def: "A white blood cell of the adaptive immune system, comprising T cells, B cells, and Natural Killer (NK) cells." },
  cytokine: { pos: "noun", def: "A small signaling protein (such as IL-6, IL-1β, TNF-α, or interferon) secreted by immune and senescent cells to regulate inflammation." },
  chemokine: { pos: "noun", def: "A signaling protein that directs the migration (chemotaxis) of immune cells to sites of inflammation or tissue repair." },
  antibody: { pos: "noun", def: "An immunoglobulin protein (such as IgG) produced by B cells that binds specifically to target antigens." },
  antigen: { pos: "noun", def: "Any molecular structure recognized by antibodies or T-cell receptors." },
  inflammation: { pos: "noun", def: "The immune and vascular response to injury, infection, or senescent cellular stress." },
  inflammatory: { pos: "adjective", def: "Promoting or characterized by immune activation and cytokine release." },
  infection: { pos: "noun", def: "Invasion and multiplication of pathogenic microorganisms (viruses, bacteria, or fungi) within body tissues." },
  viral: { pos: "adjective", def: "Relating to or caused by a virus." },
  bacterial: { pos: "adjective", def: "Relating to or caused by bacteria." },
  chronic: { pos: "adjective", def: "Persisting over a long period of months or years, as opposed to acute short-term states." },
  acute: { pos: "adjective", def: "Having a rapid onset and short duration, as opposed to chronic long-term states." },
  systemic: { pos: "adjective", def: "Affecting the entire body across multiple organs via the bloodstream, rather than confined to a single local tissue." },
  local: { pos: "adjective", def: "Restricted to a specific tissue, organ, or anatomical site." },
  endogenous: { pos: "adjective", def: "Produced naturally within the organism, tissue, or cell itself." },
  exogenous: { pos: "adjective", def: "Originating outside the organism (such as an administered medication, supplement, or environmental exposure)." },
  physiological: { pos: "adjective", def: "Relating to the normal, integrated biological functioning of a living organism and its organ systems." },
  chronological: { pos: "adjective", def: "Measured purely by calendar time elapsed since birth, as distinct from biological or physiological tissue age." },
  biological: { pos: "adjective", def: "Relating to living organisms, cellular processes, or functional physiological age." },
  lifespan: { pos: "noun", def: "The total duration of life of an organism or species, measured in studies as median (50% survival) or maximum (90th–100th percentile) survival." },
  healthspan: { pos: "noun", def: "The period of life spent in good physiological, cognitive, and physical health, free from chronic disabling disease." },
  longevity: { pos: "noun", def: "Long duration of life and sustained biological resilience across aging." },
  mortality: { pos: "noun", def: "The incidence or hazard rate of death within a population over time." },
  morbidity: { pos: "noun", def: "The presence or incidence of disease, physiological impairment, or clinical illness." },
  survival: { pos: "noun", def: "Continued life or persistence of an organism, cell, or graft over time." },
  youthful: { pos: "adjective", def: "Having the molecular, epigenetic, and functional characteristics of young biological tissue." },
  aged: { pos: "adjective", def: "Having undergone chronological and biological aging." },
  aging: { pos: "noun / adjective", def: "The progressive accumulation of molecular and cellular changes over time that reduces physiological reserve." },
  hallmark: { pos: "noun", def: "A defining, conserved biological feature or causal mechanism (such as the 12 Hallmarks of Aging)." },
  regeneration: { pos: "noun", def: "The biological renewal, regrowth, and functional restoration of damaged or involuted cells, axons, or organs." },
  regenerative: { pos: "adjective", def: "Capable of renewing, repairing, or regrowing functional biological tissue." },
  repair: { pos: "verb / noun", def: "To restore damaged DNA, proteins, or tissues to an intact, functional state." },
  clearance: { pos: "noun", def: "The removal and elimination of senescent cells, misfolded proteins, or metabolic waste from tissues." },
  depletion: { pos: "noun", def: "The progressive exhaustion or reduction in the supply of a molecule, cell pool, or ovarian reserve." },
  accumulation: { pos: "noun", def: "The gradual build-up of molecules, mutations, cross-links, or senescent cells over time." },
  decline: { pos: "noun / verb", def: "A gradual decrease in physiological function, hormone levels, or cellular reserve." },
  attenuation: { pos: "noun", def: "A reduction in the severity, amplitude, or rate of a biological process or pathological signal." },
  attenuate: { pos: "verb", def: "To reduce the force, magnitude, or deleterious effect of a biological signal or decline." },
  inhibition: { pos: "noun", def: "The pharmacological or biological suppression or slowing of an enzyme, receptor, or signaling pathway." },
  inhibit: { pos: "verb", def: "To restrain, block, or decrease the activity of an enzyme, receptor, or biological pathway." },
  inhibitor: { pos: "noun", def: "A molecule or drug that binds to an enzyme or receptor to decrease its biological activity." },
  activation: { pos: "noun", def: "The switching on of a gene, enzyme, receptor, or dormant cellular pathway." },
  activate: { pos: "verb", def: "To stimulate or switch on a receptor, enzyme, or cellular process." },
  activator: { pos: "noun", def: "A molecule or transcription factor that increases the activity of an enzyme or gene." },
  upregulation: { pos: "noun", def: "An increase in the cellular expression or activity of a gene, RNA transcript, or protein." },
  downregulation: { pos: "noun", def: "A decrease in the cellular expression or sensitivity of a gene, receptor, or protein." },
  expression: { pos: "noun", def: "The transcription and translation of a gene into functional RNA or protein within a cell." },
  suppression: { pos: "noun", def: "The active holding back or silencing of a pathway, gene, or inflammatory response." },
  restoration: { pos: "noun", def: "The return of a depleted molecule, cellular pathway, or organ function to its healthy baseline." },
  restore: { pos: "verb", def: "To bring back a youthful or normal physiological state, level, or function." },
  reversal: { pos: "noun", def: "Turning a biological metric (such as epigenetic clock age, thymic involution, or cardiac stiffness) back toward a younger state." },
  reverse: { pos: "verb", def: "To turn back or undo an age-related or pathological change." },
  reduction: { pos: "noun", def: "A quantitative decrease in risk, concentration, or incidence." },
  reduce: { pos: "verb", def: "To lower or diminish in magnitude, frequency, or risk." },
  increase: { pos: "verb / noun", def: "To become or make greater in size, amount, rate, or probability." },
  extension: { pos: "noun", def: "A lengthening of duration (such as median or maximum lifespan) or structural reach." },
  extend: { pos: "verb", def: "To lengthen or prolong in time or scope." },
  plasticity: { pos: "noun", def: "The capacity of a biological system, epigenome, or neural circuit to remodel and adapt in response to signals." },
  homeostasis: { pos: "noun", def: "The self-regulating maintenance of stable internal physiological and biochemical conditions." },
  homeostatic: { pos: "adjective", def: "Maintaining or restoring stable internal biological equilibrium." },
  adaptation: { pos: "noun", def: "A protective physiological or evolutionary adjustment to environmental or age-related stress." },
  adaptive: { pos: "adjective", def: "Serving to protect, adjust, or maintain organismal function under stress." },
  causal: { pos: "adjective", def: "Directly producing an effect or outcome (as established by randomized trials or Mendelian randomization), rather than merely correlating with it." },
  protective: { pos: "adjective", def: "Shielding cells, organs, or individuals from damage, disease, or mortality." },
  deleterious: { pos: "adjective", def: "Causing harm, functional impairment, or increased mortality risk." },
  benign: { pos: "adjective", def: "Harmless, non-malignant, or not causing clinical disease." },
  pathogenic: { pos: "adjective", def: "Capable of causing disease or cellular pathology." },
  synergistic: { pos: "adjective", def: "Interacting so that the combined effect of two interventions is greater than the sum of their separate effects." },
  antagonistic: { pos: "adjective", def: "Acting in opposition, or protective at low acute levels while harmful when chronically hyperactive." },
  integrative: { pos: "adjective", def: "Combining multiple molecular inputs into a system-wide physiological state." },
  longitudinal: { pos: "adjective", def: "Tracking the exact same individuals repeatedly over months, years, or decades to measure true within-person change." },
  multicenter: { pos: "adjective", def: "Conducted simultaneously across multiple independent clinical or research institutions to ensure reproducibility." },
  replicate: { pos: "verb / noun", def: "To repeat an experiment or measurement independently to verify its reliability and rule out chance." },
  randomization: { pos: "noun", def: "Assigning participants or genetic alleles by chance to eliminate confounding bias between comparison groups." },
  stratified: { pos: "adjective", def: "Divided into distinct subgroups (such as age brackets, genotypes, or biological sex) for precise analysis." },
  confounding: { pos: "noun / adjective", def: "Distortion of an apparent association by a third variable that influences both the exposure and the outcome." },
  surrogate: { pos: "noun / adjective", def: "A validated laboratory biomarker or intermediate measure that reliably substitutes for a long-term clinical endpoint." },
  endpoint: { pos: "noun", def: "A pre-specified primary or secondary outcome measured in a clinical trial." },
  quartile: { pos: "noun", def: "One of four equal 25% groups into which a ranked study population is divided." },
  quintile: { pos: "noun", def: "One of five equal 20% groups into which a ranked study population is divided." },
  median: { pos: "noun / adjective", def: "The middle value (50th percentile) of a distribution, resilient to extreme outliers." },
  mean: { pos: "noun / adjective", def: "The arithmetic average of a set of numerical measurements." },
  variance: { pos: "noun", def: "A statistical measure of how far data points spread out from their average value." },
  correlation: { pos: "noun", def: "A statistical measure (such as Pearson's r) of the degree to which two variables move together." },
  covariance: { pos: "noun", def: "A measure of the joint variability of two random variables." },
  regression: { pos: "noun", def: "A statistical method for modeling the quantitative relationship between a dependent outcome and one or more predictors." },
  hazard: { pos: "noun", def: "The instantaneous rate at which an event (such as mortality or disease onset) occurs per unit of time." },
  risk: { pos: "noun", def: "The probability that an adverse event or clinical outcome will occur within a defined period." },
  rate: { pos: "noun", def: "A measure, frequency, or proportion of events occurring per unit of time or per population." },
  ratio: { pos: "noun", def: "The quantitative relationship in magnitude between two numbers or rates." },
  proportion: { pos: "noun", def: "A part, share, or percentage considered in comparative relation to a whole." },
  incidence: { pos: "noun", def: "The rate of new cases of a condition occurring in a population over a specified time period." },
  prevalence: { pos: "noun", def: "The proportion of a population found to have a condition at a specific point in time." },
  dose: { pos: "noun / verb", def: "The measured quantity of a medication, hormone, or nutrient administered at one time or over a period." },
  intermittent: { pos: "adjective", def: "Occurring at pulsed intervals with rest or washout periods in between, rather than continuously." },
  continuous: { pos: "adjective", def: "Uninterrupted in time, sequence, or administration." },
  cyclic: { pos: "adjective", def: "Recurring in regular, repeated intervals or physiological phases." },
  transient: { pos: "adjective", def: "Lasting only for a brief, controlled duration before returning to baseline." },
  sustained: { pos: "adjective", def: "Maintained steadily over an extended duration." },
  oral: { pos: "adjective", def: "Taken by mouth and absorbed through the gastrointestinal tract." },
  mammalian: { pos: "adjective", def: "Relating to mammals (warm-blooded vertebrates including humans, primates, and rodents)." },
  human: { pos: "noun / adjective", def: "Relating to or characteristic of Homo sapiens." },
  mouse: { pos: "noun", def: "A small rodent (Mus musculus) widely used as a mammalian model organism in biomedical and genetic research." },
  mice: { pos: "noun", def: "Plural of mouse (Mus musculus), the primary mammalian preclinical model in genetics and longevity studies." },
  rodent: { pos: "noun", def: "A mammal of the order Rodentia (such as mice, rats, beavers, and naked mole-rats)." },
  primate: { pos: "noun", def: "A mammal of the order Primates (including humans, apes, and monkeys)." },
  species: { pos: "noun", def: "A distinct biological group of organisms capable of interbreeding and sharing a common evolutionary heritage." },
  diet: { pos: "noun", def: "The habitual pattern and composition of food and nutrients consumed by an individual or study cohort." },
  exercise: { pos: "noun / verb", def: "Structured physical activity performed to improve cardiorespiratory fitness (VO2max), muscular strength, and metabolic health." },
  training: { pos: "noun", def: "Systematic physiological conditioning (such as aerobic Zone 2 or high-intensity interval training) over weeks or years." },
  aerobic: { pos: "adjective", def: "Requiring oxygen to generate cellular ATP energy through mitochondrial oxidative phosphorylation." },
  sleep: { pos: "noun / verb", def: "The recurring circadian state of neural rest during which slow-wave glymphatic brain clearance and endocrine repair occur." },
  fasting: { pos: "noun / adjective", def: "Voluntary abstention from caloric intake for a defined period, lowering insulin/mTORC1 and activating AMPK and autophagy." },
  abstinence: { pos: "noun", def: "The time interval since the last ejaculation (in andrology, a short 12–24 hour abstinence window minimizes sperm oxidative DNA fragmentation)." },
  healthy: { pos: "adjective", def: "In a state of intact physiological function, free from acute or chronic disease." },
  normal: { pos: "adjective", def: "Conforming to the healthy physiological, chromosomal, or statistical reference range." },
  optimal: { pos: "adjective", def: "Most favorable for achieving peak physiological function, longevity, or clinical success." },
  threshold: { pos: "noun", def: "The critical magnitude or point at which a physiological state or transition is triggered." },
  window: { pos: "noun", def: "A bounded biological time interval during which a specific process (such as endometrial implantation or oocyte maturation) can occur." },
  phase: { pos: "noun", def: "A distinct stage in a clinical trial (Phase 1, 2, 3), menstrual cycle, or physical state." },
  section: { pos: "noun", def: "A distinct subdivision of a scientific monograph, organ, or histological tissue preparation." },
  monograph: { pos: "noun", def: "A comprehensive, evidence-graded scholarly treatise synthesizing the state of a scientific field." },
  dossier: { pos: "noun", def: "A structured collection of primary sources, graded claims, quantitative benchmarks, and clinical syntheses on a research topic." },
  demonstrate: { pos: "verb", def: "To establish or prove clearly through empirical experiments or clinical data." },
  prove: { pos: "verb", def: "To establish the validity of a hypothesis through rigorous empirical or mathematical evidence." },
  establish: { pos: "verb", def: "To show something to be true, reproducible, and well-founded in the scientific record." },
  indicate: { pos: "verb", def: "To point toward or serve as evidence for a physiological state or causal relationship." },
  confirm: { pos: "verb", def: "To verify the truth or accuracy of a prior finding through independent replication." },
  validate: { pos: "verb", def: "To prove that a biomarker, assay, or model accurately and reliably measures its intended target." },
  quantify: { pos: "verb", def: "To measure and express the exact numerical magnitude of a biological effect or biomarker." },
  predict: { pos: "verb", def: "To forecast a future clinical outcome or biological value from baseline measurements." },
  correlate: { pos: "verb", def: "To have a mutual statistical relationship in which two variables change together." },
  accelerate: { pos: "verb", def: "To cause a process (such as biological aging or reaction kinetics) to happen faster." },
  decelerate: { pos: "verb", def: "To slow down the rate or velocity of a process (such as epigenetic pace of aging)." },
  preserve: { pos: "verb", def: "To maintain a cell population, tissue structure, or genetic identity in its intact state." },
  maintain: { pos: "verb", def: "To keep a physiological state, biomarker, or structure at a steady level over time." },
  eliminate: { pos: "verb", def: "To completely remove or clear a confounder, pathogen, or senescent cell population." },
  prevent: { pos: "verb", def: "To stop a disease, chromosomal error, or complication from occurring." },
  induce: { pos: "verb", def: "To bring about or stimulate a biological process, gene expression program, or physiological state." },
  trigger: { pos: "verb / noun", def: "To initiate a rapid biological cascade (such as ovulation or apoptosis), or the signal that initiates it." },
  mediate: { pos: "verb", def: "To act as the causal biological intermediary through which a signal produces its downstream effect." },
  regulate: { pos: "verb", def: "To control the rate, timing, or amplitude of a biological or genetic process." },
  govern: { pos: "verb", def: "To control or determine the fundamental behavior of a biological or physical system." },
  modulate: { pos: "verb", def: "To adjust or fine-tune the activity of a receptor, immune response, or signaling pathway." },
  acid: { pos: "noun", def: "A chemical compound (such as hyaluronic acid, nucleic acid, fatty acid, or amino acid) serving structural, genetic, or metabolic roles." },
  live: { pos: "adjective / verb", def: "Alive, viable, or resulting in a living newborn (as in clinical live birth rate)." },
  age: { pos: "noun / verb", def: "The length of time an organism has lived (chronological age) or the physiological state of its tissues and epigenome (biological age)." },
  woman: { pos: "noun", def: "An adult human female." },
  women: { pos: "noun", def: "Plural of woman (adult human females)." },
  man: { pos: "noun", def: "An adult human male." },
  men: { pos: "noun", def: "Plural of man (adult human males)." },
  adult: { pos: "noun / adjective", def: "A fully grown, biologically mature organism or person." },
  year: { pos: "noun", def: "A calendar period of 365 days used as the standard unit for chronological age and longitudinal follow-up." },
  month: { pos: "noun", def: "A unit of time (~30 days) approximately corresponding to one human ovulatory menstrual cycle." },
  week: { pos: "noun", def: "A period of seven days used to track gestational age and clinical trial intervals." },
  day: { pos: "noun", def: "A 24-hour circadian period (used in embryology to stage zygote Day 1, cleavage Day 3, and blastocyst Day 5–6)." },
  hour: { pos: "noun", def: "A unit of time equal to 60 minutes (used in morphokinetics and hormone pulsatility)." },
  natural: { pos: "adjective", def: "Occurring physiologically without artificial hormonal suppression or synthetic intervention (e.g., natural ovulatory cycle)." },
  single: { pos: "adjective", def: "Consisting of one individual unit, cell, allele, or transferred embryo (as in eSET)." },
  loss: { pos: "noun", def: "The depletion, attrition, or disappearance of cells, epigenetic marks, or pregnancy." },
  young: { pos: "adjective", def: "In an early stage of life or possessing intact, unaged molecular and physiological function." },
  old: { pos: "adjective", def: "Of advanced chronological age or exhibiting late-life biological senescence." },
  zero: { pos: "numeral / noun", def: "The numerical value 0, indicating complete absence or full embryonic epigenetic reset." },
  fail: { pos: "verb", def: "To be unsuccessful in achieving a normal physiological process or clinical endpoint." },
  failure: { pos: "noun", def: "Cessation or insufficiency of normal organ, implantation, or physiological function." },
  prior: { pos: "adjective", def: "Existing or occurring before a specified clinical intervention, cycle, or time point." },
  immediate: { pos: "adjective", def: "Occurring at once without an intervening delay or washout period." },
  control: { pos: "noun / verb", def: "A baseline comparison group in an experiment or trial that does not receive the active intervention, or to regulate a variable." },
  controlled: { pos: "adjective", def: "Regulated precisely or compared against a baseline control group (as in a randomized controlled trial)." },
  resistance: { pos: "noun", def: "Reduced responsiveness of target cells to a hormone (such as insulin resistance) or ability to withstand stress." },
  high: { pos: "adjective", def: "Elevated in concentration, magnitude, quality, or statistical frequency." },
  low: { pos: "adjective", def: "Reduced or below average in concentration, magnitude, or risk." },
  functional: { pos: "adjective", def: "Capable of performing its normal physiological, enzymatic, or cellular role." },
  produce: { pos: "verb", def: "To synthesize, generate, or yield a molecule, cell type, or clinical outcome." },
  medium: { pos: "noun / adjective", def: "A nutrient solution buffered to support cells or embryos in culture (plural: media), or intermediate in level." },
  vivo: { pos: "adverb / adjective", def: "In vivo (Latin 'within the living'): occurring or tested inside a living whole organism." },
  vitro: { pos: "adverb / adjective", def: "In vitro (Latin 'in glass'): performed in a controlled laboratory dish or test tube outside a living organism." },
  level: { pos: "noun", def: "The measured concentration, abundance, or magnitude of a biomarker, hormone, or transcript." },
  female: { pos: "adjective / noun", def: "Of or denoting the sex that produces ova (eggs) and bears offspring (typically XX in mammals)." },
  male: { pos: "adjective / noun", def: "Of or denoting the sex that produces spermatozoa (typically XY in mammals)." },
  complex: { pos: "noun / adjective", def: "A multiprotein molecular assembly (such as mitochondrial Complexes I–V, mTORC1, or Shelterin), or consisting of interconnected parts." },
  daily: { pos: "adjective / adverb", def: "Occurring, administered, or measured once every day (circadian)." },
  dairy: { pos: "noun / adjective", def: "Milk and milk-derived foods, whose fat fraction carries fat-soluble hormones, MFGM, and conjugated linoleic acid." },
  signal: { pos: "noun / verb", def: "A molecular, electrical, or hormonal cue that transmits information into or between cells." },
  caloric: { pos: "adjective", def: "Relating to dietary energy content measured in kilocalories (kcal)." },
  compare: { pos: "verb", def: "To evaluate the quantitative difference or ratio between an intervention group and a reference control group." },
  factor: { pos: "noun", def: "A regulatory protein (such as a transcription or growth factor), gene, or variable that causally influences a biological process." },
  body: { pos: "noun", def: "The complete physical structure of an organism, or a specialized cellular structure (such as a polar body)." },
  menstrual: { pos: "adjective", def: "Relating to the ~28-day cyclic ovarian and uterine reproductive cycle in women." },
  alzheimer: { pos: "noun", def: "Alzheimer's disease: the most common neurodegenerative dementia, characterized by amyloid-β plaques, tau tangles, neuroinflammation, and glymphatic failure." },
  oxidative: { pos: "adjective", def: "Relating to chemical oxidation, mitochondrial aerobic respiration (OXPHOS), or reactive oxygen species (ROS) stress." },
  subcutaneous: { pos: "adjective", def: "Administered or located beneath the skin into the hypodermal tissue layer." },
  rescue: { pos: "verb / noun", def: "To restore a damaged, arrested, or aged cell, pathway, or phenotype back to functional viability." },
  mammal: { pos: "noun", def: "A warm-blooded vertebrate of the class Mammalia (including humans, primates, rodents, and whales)." },
  memory: { pos: "noun", def: "The cognitive retention of learned information in neural synapses, or the epigenetic/immunological retention of past cellular stimuli." },
  corpus: { pos: "noun", def: "A distinct anatomical structure or body (such as the ovarian corpus luteum that secretes progesterone after ovulation)." },
  restriction: { pos: "noun", def: "A controlled reduction in intake (such as caloric or dietary amino acid restriction) or enzymatic cutting." },
  dietary: { pos: "adjective", def: "Provided by or relating to the food and nutrients consumed in the diet." },
  stimulation: { pos: "noun", def: "Pharmacological or physiological activation (such as controlled ovarian stimulation with gonadotropins to mature multiple follicles)." },
  preterm: { pos: "adjective", def: "Occurring before 37 completed weeks of human pregnancy gestation." },
  improve: { pos: "verb", def: "To enhance or restore physiological function, biomarker levels, or clinical outcomes." },
  cut: { pos: "verb / noun", def: "To cleave (such as an enzymatic DNA cut) or quantitatively reduce a risk or rate." },
  double: { pos: "verb / adjective", def: "To increase two-fold (2×) in quantity, rate, or probability, or consisting of two paired strands/layers." },
  remain: { pos: "verb", def: "To continue to exist or stay in a specified physiological state over time." },
  direct: { pos: "adjective / verb", def: "Operating without intermediary steps, or to guide a cellular process toward a specific target." },
  during: { pos: "preposition", def: "Throughout the course or duration of a specified time interval or biological stage." },
  whereas: { pos: "conjunction", def: "In contrast or comparison with the fact that." },
  across: { pos: "preposition", def: "Spanning multiple tissues, cohorts, species, or time points." },
  between: { pos: "preposition", def: "Connecting, comparing, or separating two groups, values, or states." },
  within: { pos: "preposition", def: "Inside the boundaries of a cell, organ, cohort, or time window." },
  without: { pos: "preposition", def: "In the absence of a specified factor or side effect." },
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
  ["morpho", "form, shape, or cellular structure (Greek morphe)"],
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

const GREEK_TO_ASCII: Record<string, string> = {
  α: "a",
  β: "b",
  γ: "g",
  δ: "d",
  ε: "e",
  ζ: "z",
  η: "e",
  θ: "th",
  κ: "k",
  λ: "l",
  μ: "u",
  µ: "u",
  ν: "n",
  ξ: "x",
  π: "p",
  ρ: "r",
  σ: "s",
  τ: "t",
  φ: "ph",
  χ: "ch",
  ψ: "ps",
  ω: "o",
};

function cleanToken(raw: string): string {
  return raw
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/^[^a-z0-9\u0370-\u03ff+]+|[^a-z0-9\u0370-\u03ff+]+$/g, "")
    .replace(/'s$/i, "")
    .trim();
}

function addBaseForms(word: string, out: Set<string>): void {
  if (!word || word.length < 2) return;
  out.add(word);
  if (word.endsWith("+") && word.length > 2) {
    out.add(word.slice(0, -1));
  }
  if (word.endsWith("ies") && word.length > 4) {
    out.add(word.slice(0, -3) + "y");
  }
  if (word.endsWith("ied") && word.length > 4) {
    out.add(word.slice(0, -3) + "y");
  }
  if (word.endsWith("es") && word.length > 4) {
    out.add(word.slice(0, -1));
    out.add(word.slice(0, -2));
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
  if (word.endsWith("er") && word.length > 4) {
    out.add(word.slice(0, -2));
    out.add(word.slice(0, -1));
  }
  if (word.endsWith("est") && word.length > 5) {
    out.add(word.slice(0, -3));
    out.add(word.slice(0, -2));
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
    out.add(stem + "e");
    out.add(stem);
    if (stem.length >= 3 && stem[stem.length - 1] === stem[stem.length - 2]) {
      out.add(stem.slice(0, -1));
    }
  }
  if (word.endsWith("ed") && word.length > 4) {
    const stem = word.slice(0, -2);
    out.add(word.slice(0, -1));
    out.add(stem);
    if (stem.length >= 3 && stem[stem.length - 1] === stem[stem.length - 2]) {
      out.add(stem.slice(0, -1));
    }
  }
  if (word.endsWith("ation") && word.length > 7) {
    out.add(word.slice(0, -3) + "e");
    out.add(word.slice(0, -5) + "e");
    out.add(word.slice(0, -5));
  }
  if (word.endsWith("ition") && word.length > 7) {
    out.add(word.slice(0, -3));
    out.add(word.slice(0, -5) + "e");
    out.add(word.slice(0, -5));
  }
  if (word.endsWith("tion") && word.length > 6) {
    out.add(word.slice(0, -3) + "e");
    out.add(word.slice(0, -4));
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
    out.add(word.slice(0, -3) + "e");
    out.add(word.slice(0, -3));
  }
  if (word.endsWith("ous") && word.length > 5) {
    out.add(word.slice(0, -3));
    out.add(word.slice(0, -3) + "e");
  }
  if (word.endsWith("al") && word.length > 5) {
    out.add(word.slice(0, -2));
    out.add(word.slice(0, -2) + "e");
  }
  if (word.endsWith("ic") && word.length > 5) {
    out.add(word.slice(0, -2));
    out.add(word.slice(0, -2) + "e");
    out.add(word.slice(0, -2) + "y");
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

  // Add ASCII transliteration for Greek characters (e.g. pgc-1α -> pgc-1a, β-ohb -> b-ohb)
  const asciiGreek = cleaned.replace(/[\u0370-\u03ffµ]/g, (ch) => GREEK_TO_ASCII[ch] ?? "");
  if (asciiGreek && asciiGreek !== cleaned) {
    addBaseForms(asciiGreek, forms);
    const strippedLead = asciiGreek.replace(/^[abgdez]-/, "");
    if (strippedLead.length >= 2) addBaseForms(strippedLead, forms);
  }

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
  const trimmed = raw.trim().replace(/^[^a-zA-Z0-9\u0370-\u03ff]+|[^a-zA-Z0-9\u0370-\u03ff+]+$/g, "");
  if (!trimmed) return raw.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

const CONTEXT_STOPWORDS = new Set([
  "the", "and", "for", "that", "this", "with", "from", "are", "was", "were", "have", "has", "had",
  "not", "but", "what", "all", "can", "when", "there", "use", "used", "each", "which", "their",
  "how", "will", "other", "about", "out", "many", "then", "them", "these", "some", "into", "more",
  "than", "its", "over", "also", "after", "before", "most", "between", "such", "only", "both",
]);

function tokenizeContext(text: string): string[] {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(/[^a-z0-9+-]+/)
    .filter((t) => t.length >= 2 && !CONTEXT_STOPWORDS.has(t));
}

function inferContextDomain(context?: string): string {
  if (!context) return "Scientific Terminology";
  const lower = context.toLowerCase();
  if (/\b(blastocyst|trophectoderm|gardner|icm|zygote|pronucle|morula|cleavage|embryo|mii|gv|zona)\b/.test(lower)) {
    return "Clinical Embryology";
  }
  if (/\b(oocyte|follic|ovarian|amh|ivf|icsi|sperm|endometri|fertility|gestation|pregnancy|luteal)\b/.test(lower)) {
    return "Reproductive Biology & Medicine";
  }
  if (/\b(epigenetic|methylation|cpg|dnam|grimage|dunedinpace|senolytic|senescence|sasp|yamanaka|oskm|mtorc1|rapamycin|telomere|parabiosis|thymic|glymphatic|klotho|longevity|geroscience)\b/.test(lower)) {
    return "Geroscience & Longevity Biology";
  }
  if (/\b(hamiltonian|lagrangian|quantum|hilbert|milgrom|mond|unruh|relativity|spacetime|baryon|gauge)\b/.test(lower)) {
    return "Physics & Cosmology";
  }
  if (/\b(martingale|volatility|garch|arbitrage|black-scholes|ito|portfolio|cointegration|paretian)\b/.test(lower)) {
    return "Quantitative Finance & Econometrics";
  }
  return "Scientific Terminology";
}

function pickBestGlossaryCandidate(
  candidates: GlossaryEntry[],
  rawInput: string,
  context?: string,
): GlossaryEntry {
  if (candidates.length === 1 || !context || !context.trim()) {
    return candidates[0]!;
  }
  const ctxTokens = tokenizeContext(context);
  if (ctxTokens.length === 0) return candidates[0]!;

  const cleanedRaw = cleanToken(rawInput);
  let best = candidates[0]!;
  let bestScore = -1;

  for (let i = 0; i < candidates.length; i++) {
    const cand = candidates[i]!;
    const termLower = cand.term.toLowerCase();
    const bodyLower = `${cand.term} ${cand.domain} ${cand.synopsis} ${cand.whyItMatters ?? ""}`.toLowerCase();
    let score = 0;
    for (const tok of ctxTokens) {
      if (tok === cleanedRaw) continue;
      if (termLower.includes(tok)) {
        score += 4;
      } else if (bodyLower.includes(tok)) {
        score += 2;
      }
    }
    // Slight preference for earlier curated order on exact ties
    const weighted = score - i * 0.01;
    if (weighted > bestScore) {
      bestScore = weighted;
      best = cand;
    }
  }
  return best;
}

const ACRONYM_LEADING_STOPWORDS = new Set([
  "the", "a", "an", "of", "in", "on", "at", "to", "for", "with", "by", "as", "is", "are", "was", "were",
  "or", "and", "from", "into", "via", "per", "such", "called", "termed", "known", "intact", "standard",
  "human", "clinical", "objective", "quantitative", "qualitative", "single", "double", "total", "mean",
  "making", "express", "expressing", "massive", "levels", "aged", "young", "adult", "bone", "marrow",
  "fresh", "natural", "primary", "secondary", "direct", "indirect", "soluble", "circulating",
]);

function extractInlineAcronymExpansion(rawInput: string, context?: string): GlossaryEntry | null {
  if (!context) return null;
  const trimmed = rawInput.trim().replace(/^[^a-zA-Z0-9\u0370-\u03ff+-]+|[^a-zA-Z0-9\u0370-\u03ff+-]+$/g, "");
  if (trimmed.length < 2 || trimmed.length > 16) return null;

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const letters = trimmed.replace(/[^a-zA-Z\u0370-\u03ff]/g, "").toLowerCase();
  const alnum = trimmed.replace(/[^a-zA-Z0-9\u0370-\u03ff]/g, "").toLowerCase();
  if (alnum.length < 2 || letters.length < 1) return null;

  const tokenPresenceRe = new RegExp(`(?<![A-Za-z0-9\\u0370-\\u03ff])${escaped}(?![A-Za-z0-9\\u0370-\\u03ff])`, "i");
  if (!tokenPresenceRe.test(context)) return null;

  const cleanedTarget = cleanToken(trimmed);

  // Pattern 0: Inline glossary colon definition, e.g.
  // "CpG & DNAm (Cytosine-phosphate-Guanine Dinucleotide & DNA Methylation): Chemical methyl tags..."
  // or "PhenoAge, GrimAge2 & DunedinPACE: Second- and third-generation epigenetic clocks..."
  const sentences = context.split(/(?<=[.!?])\s+|\s+—\s+|\n+/);
  for (const sent of sentences) {
    if (!sent.includes(":") || !tokenPresenceRe.test(sent)) continue;
    const colonMatch = sent.trim().match(/^([^:]{2,140}):\s+(.{15,500})$/);
    if (colonMatch) {
      const header = colonMatch[1]!.trim();
      const explanation = colonMatch[2]!.trim();
      const parenMatch = header.match(/^([^(]+?)\s*\(([^)]+)\)\s*$/);
      if (parenMatch) {
        const shortSide = parenMatch[1]!.trim();
        const longSide = parenMatch[2]!.trim();
        const shortItems = shortSide.split(/\s*(?:&|\/|,|\bvs\.?|\band\b)\s*/i).map((s) => s.trim()).filter(Boolean);
        const longItems = longSide.split(/\s*(?:&|\/|\bvs\.?)\s*/i).map((s) => s.trim()).filter(Boolean);
        const matchIdx = shortItems.findIndex((s) => cleanToken(s) === cleanedTarget);
        if (matchIdx !== -1) {
          const pairedExpansion =
            longItems.length === shortItems.length
              ? longItems[matchIdx]!
              : longSide;
          return {
            term: `${pairedExpansion} (${shortItems[matchIdx]!})`,
            domain: inferContextDomain(context),
            synopsis: explanation,
          };
        }
      } else {
        const headerItems = header.split(/\s*(?:&|\/|,|\bvs\.?|\band\b)\s*/i).map((s) => s.trim()).filter(Boolean);
        const matchedItem = headerItems.find((s) => cleanToken(s) === cleanedTarget);
        if (matchedItem) {
          return {
            term: matchedItem,
            domain: inferContextDomain(context),
            synopsis: explanation,
          };
        }
      }
    }
  }

  // Pattern 0b: "ACRONYM = Full Term" (e.g. "DPO = Days Post-Ovulation; LPD = Luteal Phase Defect")
  const eqRegex = new RegExp(`(?<![A-Za-z0-9\\u0370-\\u03ff])${escaped}\\s*=\\s*([A-Za-z][A-Za-z0-9\\s/-]{4,70}?)(?=[;.,)]|$)`, "i");
  const eqMatch = context.match(eqRegex);
  if (eqMatch && eqMatch[1]) {
    const phrase = eqMatch[1].trim();
    return {
      term: `${phrase} (${trimmed})`,
      domain: inferContextDomain(context),
      synopsis: `Abbreviation for ${phrase}, as defined in this passage.`,
    };
  }

  // Pattern 1: "Full Term Phrase (ACRONYM)" — locate "(ACRONYM)" first to avoid backtracking on long texts
  const parenTokenRe = new RegExp(`\\(\\s*${escaped}\\s*\\)`, "i");
  const parenTokenMatch = parenTokenRe.exec(context);
  if (parenTokenMatch && parenTokenMatch.index > 0) {
    const prefixSlice = context.slice(Math.max(0, parenTokenMatch.index - 120), parenTokenMatch.index);
    const beforeMatch = prefixSlice.match(/([A-Za-z][A-Za-z0-9/-]*(?:\s+[A-Za-z&/-][A-Za-z0-9/-]*){1,7})\s*$/);
    if (beforeMatch && beforeMatch[1]) {
      const rawWords = beforeMatch[1].trim().split(/\s+/);
      while (rawWords.length > letters.length && ACRONYM_LEADING_STOPWORDS.has(rawWords[0]!.toLowerCase())) {
        rawWords.shift();
      }
      const coreLen = letters.endsWith("s") && letters.length > 2 ? letters.length - 1 : letters.length;
      const candidateWords = rawWords.slice(-Math.min(rawWords.length, coreLen + 1));
      while (candidateWords.length > coreLen && ACRONYM_LEADING_STOPWORDS.has(candidateWords[0]!.toLowerCase())) {
        candidateWords.shift();
      }
      while (
        candidateWords.length > coreLen &&
        candidateWords[0] &&
        candidateWords[0][0]?.toLowerCase() !== letters[0]
      ) {
        candidateWords.shift();
      }
      const phrase = candidateWords.join(" ").trim();
      const initials = candidateWords
        .flatMap((w) => w.split("-"))
        .map((w) => w.replace(/[^a-zA-Z]/g, "")[0]?.toLowerCase() ?? "")
        .join("");
      if (phrase.length >= 5 && (initials.includes(letters.slice(0, 2)) || initials[0] === letters[0])) {
        return {
          term: `${phrase} (${trimmed})`,
          domain: inferContextDomain(context),
          synopsis: `Abbreviation for ${phrase}, as used in this passage.`,
        };
      }
    }
  }

  // Pattern 2: "ACRONYM (Full Term Phrase)" or "A1 & A2 (Phrase 1 & Phrase 2)"
  const afterRegex = new RegExp(`(?<![A-Za-z0-9\\u0370-\\u03ff])${escaped}\\s*\\(\\s*([A-Za-z0-9][A-Za-z0-9\\s,&/-]{4,100})\\s*\\)`, "i");
  const afterMatch = context.match(afterRegex);
  if (afterMatch && afterMatch[1]) {
    let phrase = afterMatch[1].trim();
    if (phrase.includes("&") || phrase.includes("/")) {
      const parts = phrase.split(/\s*(?:&|\/)\s*/).map((p) => p.trim()).filter(Boolean);
      const matchingPart = parts.find((p) => p[0]?.toLowerCase() === letters[0]);
      if (matchingPart) phrase = matchingPart;
    }
    const words = phrase.split(/[\s-]+/).filter((w) => w.length > 0);
    const initials = words.map((w) => w[0]?.toLowerCase() ?? "").join("");
    const collapsedPhrase = phrase.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (
      words.length >= 2 &&
      (initials.includes(letters.slice(0, 2)) ||
        initials[0] === letters[0] ||
        collapsedPhrase.startsWith(letters.slice(0, 3)))
    ) {
      return {
        term: `${phrase} (${trimmed})`,
        domain: inferContextDomain(context),
        synopsis: `Abbreviation for ${phrase}, as used in this passage.`,
      };
    }
  }

  return null;
}

export interface RemoteDefinitionCandidate {
  word: string;
  partOfSpeech: string;
  definition: string;
  etymology?: string;
}

const NOISE_DEFINITION_RE =
  /\b(iso 639|language code|iata|icao|postal abbreviation|postcode|zip code|solf[eè]ge|letter of the .* alphabet|morse code|internet top-level domain|country code|international vehicle registration)\b/i;

/**
 * Selects the best dictionary definition from remote API candidates (Free Dictionary / Wiktionary / Wikipedia)
 * using the surrounding passage context and filtering out symbol / language-code noise.
 */
export function selectBestDictionaryDefinition(
  rawInput: string,
  candidates: RemoteDefinitionCandidate[],
  context?: string,
): GlossaryEntry | null {
  if (!candidates || candidates.length === 0) return null;

  const valid = candidates.filter((c) => {
    const def = c.definition?.trim() ?? "";
    if (def.length < 6) return false;
    const pos = (c.partOfSpeech ?? "").toLowerCase();
    if (pos === "symbol" || NOISE_DEFINITION_RE.test(def)) return false;
    return true;
  });

  if (valid.length === 0) return null;

  const ctxTokens = context ? tokenizeContext(context) : [];
  const ctxLower = (context ?? "").toLowerCase();
  const isBioContext = /\b(blastocyst|trophectoderm|gardner|icm|embryo|oocyte|follic|cell|clinical|pregnancy|ivf|fertility|uterine|placenta|chromosome|euploid|aneuploid|sperm|ovarian|morphometry|grading|biopsy|epigenetic|methylation|cpg|dnam|longevity|senescence|autophagy|mitochondri)\b/.test(ctxLower);
  const isQuantContext = /\b(hamiltonian|lagrangian|quantum|hilbert|milgrom|mond|martingale|volatility|garch|arbitrage|black-scholes|ito|portfolio|cointegration|theorem|manifold)\b/.test(ctxLower);

  let best = valid[0]!;
  let bestScore = -1000;

  for (let i = 0; i < valid.length; i++) {
    const cand = valid[i]!;
    const defLower = cand.definition.toLowerCase();
    let score = 0;

    for (const tok of ctxTokens) {
      if (tok.length >= 3 && defLower.includes(tok)) {
        score += 3;
      }
    }

    if (isBioContext && /\b(cell|tissue|layer|embryo|blastocyst|organ|body|membrane|placenta|uterus|biology|medicine|clinical|genetic|epigenetic|protein|enzyme|hormone|form|shape|measure|size|count|score|grade|outer|inner|surface|epithelium|anatom)\b/.test(defLower)) {
      score += 5;
    }
    if (isQuantContext && /\b(math|physics|function|equation|probability|random|process|vector|matrix|space|energy|market|variance|distribution|measure)\b/.test(defLower)) {
      score += 5;
    }

    if (/^(initialism|abbreviation|acronym|alternative form) of\b/i.test(cand.definition.trim()) && cand.definition.length < 45) {
      score -= 3;
    } else if (cand.definition.length >= 25) {
      score += 1;
    }

    const weighted = score - i * 0.05;
    if (weighted > bestScore) {
      bestScore = weighted;
      best = cand;
    }
  }

  const trimmedRaw = rawInput.trim().replace(/^[^a-zA-Z0-9\u0370-\u03ff]+|[^a-zA-Z0-9\u0370-\u03ff+]+$/g, "");
  const cleanedRaw = cleanToken(rawInput);
  const resolvedWord = best.word || trimmedRaw;
  const isLemmaNote = cleanedRaw && best.word && cleanToken(best.word) !== cleanedRaw;

  return {
    term: trimmedRaw || resolvedWord,
    domain: `Dictionary (${best.partOfSpeech || "term"})`,
    synopsis: isLemmaNote ? `${best.definition} (Base form: "${resolvedWord}".)` : best.definition,
    etymology: best.etymology,
  };
}

/**
 * Pure lookup of ANY double-clicked word or short term, optionally disambiguated
 * by the surrounding sentence, section, or topic context:
 * 1. Curated scientific, clinical & research methodology glossary (scored against context when polysemous)
 * 2. ClinicalTrials.gov NCT registration numbers & inline passage/glossary acronym expansions
 * 3. Built-in academic & general English lexicon (including verified lemmatized stems)
 * 4. Verified Greek/Latin scientific root & compound morphology
 * 5. Contextual passage sentence extraction (never emitting circular or broken pseudo-stems).
 */
export function lookupGlossaryTerm(rawInput: string, context?: string): GlossaryEntry | null {
  if (!rawInput) return null;
  const cleaned = cleanToken(rawInput);
  if (!cleaned || cleaned.length < 2) return null;

  // Ignore bare numbers, percentages, or numeric ranges (e.g. "+9", "-25", "40+", "2024")
  if (/^[+-]?\d+(?:[.,-]\d+)?[+%]*$/i.test(cleaned)) {
    return null;
  }

  const trimmedRaw = rawInput.trim().replace(/^[^a-zA-Z0-9\u0370-\u03ff+-]+|[^a-zA-Z0-9\u0370-\u03ff+-]+$/g, "");

  // Recognise ClinicalTrials.gov NCT registry identifiers (e.g. NCT00427193, NCT05836025)
  if (/^nct\d{6,10}$/i.test(trimmedRaw)) {
    return {
      term: `${trimmedRaw.toUpperCase()} (ClinicalTrials.gov Identifier)`,
      domain: "Clinical Trial Registry",
      synopsis:
        "Official U.S. National Library of Medicine (ClinicalTrials.gov) registration identifier for a human clinical trial referenced in this monograph.",
      whyItMatters:
        "Prospective clinical trial registration specifies sample size, eligibility criteria, and primary endpoints ahead of time to prevent selective outcome reporting.",
    };
  }

  // Guard lowercase common English conjunction "or" unless uppercase "OR" or in statistical context
  const isLowercaseOr =
    cleaned === "or" &&
    trimmedRaw === "or" &&
    (!context || !/\b(95%|ci|confidence|odds|ratio|relative risk|rr|p\s*[=<]|p-value)\b/i.test(context));

  const forms = candidateLookupForms(cleaned);

  // 1. Check curated scientific glossary (disambiguating multiple candidates with context)
  if (!isLowercaseOr) {
    for (const form of forms) {
      const candidates = GLOSSARY_CANDIDATES.get(form);
      if (candidates && candidates.length > 0) {
        return pickBestGlossaryCandidate(candidates, rawInput, context);
      }
    }
  }

  // 2. If hyphenated (e.g. "maternal-spindle", "pre-eclampsia", "peer-reviewed"), check joined & parts
  if (cleaned.includes("-")) {
    const joined = cleaned.replace(/-/g, "");
    for (const form of candidateLookupForms(joined)) {
      const candidates = GLOSSARY_CANDIDATES.get(form);
      if (candidates && candidates.length > 0) {
        return pickBestGlossaryCandidate(candidates, rawInput, context);
      }
    }
    const parts = cleaned.split("-").filter((p) => p.length >= 2);
    for (const part of parts) {
      for (const form of candidateLookupForms(part)) {
        const candidates = GLOSSARY_CANDIDATES.get(form);
        if (candidates && candidates.length > 0) {
          return pickBestGlossaryCandidate(candidates, rawInput, context);
        }
      }
    }
  }

  // 3. Check if the surrounding passage defines an inline acronym or glossary entry
  const inlineExpansion = extractInlineAcronymExpansion(rawInput, context);
  if (inlineExpansion) {
    return inlineExpansion;
  }

  // 4. Check general & academic English lexicon (exact or lemmatized stem)
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

  // 5. Check morphological Greek/Latin/English prefixes & suffixes (requiring either a scientific suffix or a verified root after the prefix)
  const isAllCapsAcronym = /^[A-Z0-9+-]{2,}$/.test(trimmedRaw);
  const matchedSuf =
    !isAllCapsAcronym && cleaned.length >= 6
      ? MORPH_SUFFIXES.find(([suf]) => cleaned.endsWith(suf) && cleaned.length > suf.length + 2)
      : undefined;
  const matchedPre =
    !isAllCapsAcronym && cleaned.length >= 5
      ? MORPH_PREFIXES.find(([pre]) => {
          if (!cleaned.startsWith(pre) || cleaned.length <= pre.length + 3) return false;
          if (matchedSuf) return true;
          const remainder = cleaned.slice(pre.length).replace(/^-+/, "");
          if (remainder.length < 4) return false;
          const remForms = candidateLookupForms(remainder);
          return remForms.some((f) => GLOSSARY_CANDIDATES.has(f) || GENERAL_LEXICON_INDEX.has(f));
        })
      : undefined;
  const displayTerm = formatDisplayWord(rawInput);

  if (matchedPre || matchedSuf) {
    const pieces: string[] = [];
    if (matchedPre) pieces.push(`prefix "${matchedPre[0]}-" (${matchedPre[1]})`);
    if (matchedSuf) pieces.push(`suffix "-${matchedSuf[0]}" (${matchedSuf[1]})`);
    return {
      term: displayTerm,
      domain: matchedSuf ? inferContextDomain(context) : "Lexicon",
      synopsis:
        matchedPre && matchedSuf
          ? `Term combining ${matchedPre[1]} with ${matchedSuf[1]}.`
          : matchedPre
            ? `Term formed with the prefix "${matchedPre[0]}-" (${matchedPre[1]}) modifying "${cleaned.slice(matchedPre[0].length)}".`
            : `Term ending in "-${matchedSuf![0]}", denoting ${matchedSuf![1]}.`,
      etymology: `Morphology: ${pieces.join(" + ")}.`,
    };
  }

  // 6. Contextual passage fallback (extracts the surrounding sentence when available so remote dictionary/encyclopedia lookup can enrich it)
  if (context && context.trim().length > 0) {
    const escaped = trimmedRaw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const wordRe = new RegExp(`(?<![A-Za-z0-9\\u0370-\\u03ff])${escaped}(?![A-Za-z0-9\\u0370-\\u03ff])`, "i");
    const sentences = context
      .split(/(?<=[.!?])\s+|\s+—\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length >= 15);
    const matchingSentence = sentences.find((s) => wordRe.test(s));
    if (matchingSentence) {
      const snippet = matchingSentence.length > 260 ? `${matchingSentence.slice(0, 257).trim()}...` : matchingSentence;
      return {
        term: trimmedRaw || displayTerm,
        domain: inferContextDomain(context),
        synopsis: `Contextual usage in this monograph: "${snippet}"`,
      };
    }
  }

  return {
    term: trimmedRaw || displayTerm,
    domain: inferContextDomain(context),
    synopsis: `Scientific or academic term referenced in this monograph (${inferContextDomain(context)}).`,
  };
}


