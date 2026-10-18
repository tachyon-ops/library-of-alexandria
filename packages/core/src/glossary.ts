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
    if (k) GLOSSARY_INDEX.set(k, entry);
  }
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
  ["inter", "between (Latin inter)"],
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

function candidateForms(cleaned: string): string[] {
  const forms = new Set<string>([cleaned]);
  if (cleaned.endsWith("ies") && cleaned.length > 4) {
    forms.add(cleaned.slice(0, -3) + "y");
  }
  if (cleaned.endsWith("es") && cleaned.length > 4) {
    forms.add(cleaned.slice(0, -2));
    forms.add(cleaned.slice(0, -1));
  }
  if (cleaned.endsWith("s") && !cleaned.endsWith("ss") && cleaned.length > 3) {
    forms.add(cleaned.slice(0, -1));
  }
  if (cleaned.endsWith("ae") && cleaned.length > 4) {
    forms.add(cleaned.slice(0, -1));
  }
  if (cleaned.endsWith("i") && cleaned.length > 4) {
    forms.add(cleaned.slice(0, -1) + "us");
  }
  if (cleaned.endsWith("ally") && cleaned.length > 6) {
    forms.add(cleaned.slice(0, -4));
    forms.add(cleaned.slice(0, -2));
  }
  if (cleaned.endsWith("ly") && cleaned.length > 5) {
    forms.add(cleaned.slice(0, -2));
  }
  if (cleaned.endsWith("ing") && cleaned.length > 5) {
    forms.add(cleaned.slice(0, -3));
    forms.add(cleaned.slice(0, -3) + "e");
  }
  if (cleaned.endsWith("ed") && cleaned.length > 4) {
    forms.add(cleaned.slice(0, -2));
    forms.add(cleaned.slice(0, -1));
  }
  return [...forms];
}

/**
 * Pure lookup of a double-clicked word or short term against the curated
 * scientific glossary, with morphological Greek/Latin root synthesis fallback.
 */
export function lookupGlossaryTerm(rawInput: string): GlossaryEntry | null {
  if (!rawInput) return null;
  const cleaned = cleanToken(rawInput);
  if (!cleaned || cleaned.length < 2) return null;

  for (const form of candidateForms(cleaned)) {
    const match = GLOSSARY_INDEX.get(form);
    if (match) return match;
  }

  // If hyphenated (e.g. "maternal-spindle", "pre-eclampsia", "non-disjunction"), check parts
  if (cleaned.includes("-")) {
    const joined = cleaned.replace(/-/g, "");
    for (const form of candidateForms(joined)) {
      const match = GLOSSARY_INDEX.get(form);
      if (match) return match;
    }
    const parts = cleaned.split("-").filter((p) => p.length >= 2);
    for (const part of parts) {
      for (const form of candidateForms(part)) {
        const match = GLOSSARY_INDEX.get(form);
        if (match) return match;
      }
    }
  }

  // Check morphological Greek/Latin scientific roots for compound medical/scientific words
  if (cleaned.length >= 6) {
    const matchedPre = MORPH_PREFIXES.find(([pre]) => cleaned.startsWith(pre));
    const matchedSuf = MORPH_SUFFIXES.find(([suf]) => cleaned.endsWith(suf));
    if (matchedPre || matchedSuf) {
      const displayTerm = rawInput.trim().replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
      const pieces: string[] = [];
      if (matchedPre) pieces.push(`prefix "${matchedPre[0]}-" meaning ${matchedPre[1]}`);
      if (matchedSuf) pieces.push(`suffix "-${matchedSuf[0]}" meaning ${matchedSuf[1]}`);
      return {
        term: displayTerm.charAt(0).toUpperCase() + displayTerm.slice(1),
        domain: "Scientific Terminology",
        synopsis:
          matchedPre && matchedSuf
            ? `A scientific term combining ${matchedPre[1]} with ${matchedSuf[1]}.`
            : matchedPre
              ? `A scientific term built on the root "${matchedPre[0]}-", referring to ${matchedPre[1]}.`
              : `A scientific term ending in "-${matchedSuf![0]}", denoting ${matchedSuf![1]}.`,
        etymology: `Built from ${pieces.join(" + ")}.`,
      };
    }
  }

  return null;
}
