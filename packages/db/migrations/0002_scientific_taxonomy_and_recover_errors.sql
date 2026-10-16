-- 0002: Normalise legacy personal-case seed topics to canonical scientific taxonomy
-- across the general human population ("Advanced Maternal Age & Pregnancy After 40"),
-- seed top-level encyclopaedic trunks of human knowledge, reparent Reproductive Medicine
-- under Natural & Life Sciences -> Medicine, Health & Longevity, and recover 429 errors.

UPDATE topics
SET title = 'Reproductive Medicine & Human Fertility',
    slug = 'reproductive-medicine-human-fertility',
    brief = 'Physiology, epidemiology, pathology, and clinical interventions in human reproduction across the lifespan, including gametogenesis, ovarian reserve, cryopreservation, endometrial receptivity, andrology, assisted reproductive technology, maternal-fetal medicine, and translational reproductive biology.'
WHERE slug = 'human-fertility'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'reproductive-medicine-human-fertility');

UPDATE topics
SET title = 'Ovarian Reserve & Oocyte Cryopreservation',
    slug = 'ovarian-reserve-oocyte-cryopreservation',
    brief = 'Follicular dynamics, ovarian aging across the reproductive lifespan, oocyte vitrification, warming survival, and cumulative live birth outcomes.'
WHERE slug = 'human-fertility-using-eggs-vitrified-at-a-younger-age'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'ovarian-reserve-oocyte-cryopreservation');

UPDATE topics
SET title = 'Endometrial Receptivity & Implantation Biology',
    slug = 'endometrial-receptivity-implantation-biology',
    brief = 'Endometrial physiology, recurrent implantation failure, reproductive immunology, and the reproductive tract microbiome.'
WHERE slug = 'human-fertility-uterine-receptivity-and-implantation-failure'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'endometrial-receptivity-implantation-biology');

UPDATE topics
SET title = 'Andrology & Male Factor Infertility',
    slug = 'andrology-male-factor-infertility',
    brief = 'Spermatogenesis, sperm chromatin and DNA integrity, paternal age effects after 40 across the population, varicocele, and clinical interventions.'
WHERE slug = 'human-fertility-male-factor-after-40'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'andrology-male-factor-infertility');

UPDATE topics
SET title = 'Assisted Reproductive Technology & Gamete Donation',
    slug = 'assisted-reproductive-technology-gamete-donation',
    brief = 'In vitro fertilisation, intracytoplasmic sperm injection, embryo selection, third-party reproduction, outcomes, and international regulatory frameworks.'
WHERE slug = 'human-fertility-donor-eggs-in-europe'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'assisted-reproductive-technology-gamete-donation');

UPDATE topics
SET title = 'Translational & Geroprotective Reproductive Biology',
    slug = 'translational-geroprotective-reproductive-biology',
    brief = 'In vitro gametogenesis, mitochondrial replacement therapy, ovarian tissue cryopreservation and transplantation, mTOR modulation, and intraovarian biologics.'
WHERE slug = 'human-fertility-frontier-fertility-treatments'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'translational-geroprotective-reproductive-biology');

UPDATE topics
SET title = 'Advanced Maternal Age & Pregnancy After 40',
    slug = 'advanced-maternal-age-pregnancy-after-40',
    brief = 'Maternal cardiovascular and metabolic adaptation, hypertensive disorders of pregnancy, gestational diabetes, placental biology, and perinatal outcomes in pregnancy after age 40.'
WHERE slug IN ('human-fertility-pregnancy-after-44', 'maternal-fetal-medicine-obstetric-perinatology')
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'advanced-maternal-age-pregnancy-after-40');

UPDATE topics
SET title = 'Autologous versus Donor Oocyte Perinatal Outcomes',
    slug = 'autologous-versus-donor-oocyte-perinatal-outcomes',
    brief = 'Comparative maternal and neonatal outcomes, immunological adaptation, and placentation in autologous versus donor oocyte conceptions across maternal age strata.'
WHERE slug = 'human-fertility-pregnancy-after-44-comparative-obstetric-risks-in-autologous-ver'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'autologous-versus-donor-oocyte-perinatal-outcomes');

UPDATE topics
SET title = 'Placental Function & Antepartum Fetal Surveillance',
    slug = 'placental-function-antepartum-fetal-surveillance',
    brief = 'Pathophysiology of uteroplacental insufficiency, fetal growth restriction, Doppler velocimetry, and stillbirth prevention protocols.'
WHERE slug = 'human-fertility-pregnancy-after-44-fetal-surveillance-placental-dysfunction-and-'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'placental-function-antepartum-fetal-surveillance');

UPDATE topics
SET title = 'Gestational Diabetes Mellitus & Maternal Metabolism',
    slug = 'gestational-diabetes-mellitus-maternal-metabolism',
    brief = 'Insulin resistance in pregnancy, diagnostic screening criteria, glycemic control targets, and maternal-neonatal metabolic outcomes.'
WHERE slug = 'human-fertility-pregnancy-after-44-gestational-diabetes-screening-protocols-and-'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'gestational-diabetes-mellitus-maternal-metabolism');

UPDATE topics
SET title = 'Maternal Cardiovascular Adaptation & Hemodynamics',
    slug = 'maternal-cardiovascular-adaptation-hemodynamics',
    brief = 'Gestational cardiac remodeling, arterial stiffness, pre-conception cardiovascular risk stratification, and peripartum cardiomyopathy.'
WHERE slug = 'human-fertility-pregnancy-after-44-maternal-cardiovascular-adaptation-and-pre-pr'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'maternal-cardiovascular-adaptation-hemodynamics');

UPDATE topics
SET title = 'Pre-eclampsia Pathophysiology, Biomarkers & Prophylaxis',
    slug = 'pre-eclampsia-pathophysiology-biomarkers-prophylaxis',
    brief = 'Angiogenic factors (sFlt-1/PlGF), uterine artery Doppler screening, low-dose aspirin prophylaxis, and management of hypertensive disorders of pregnancy.'
WHERE slug = 'human-fertility-pregnancy-after-44-pre-eclampsia-prophylaxis-and-biomarker-based'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'pre-eclampsia-pathophysiology-biomarkers-prophylaxis');

UPDATE topics
SET title = 'Antiplatelet Prophylaxis Dosing & Gestational Timing',
    slug = 'antiplatelet-prophylaxis-dosing-gestational-timing',
    brief = 'Dose-response efficacy (75–162 mg), gestational initiation window, platelet responsiveness, and perinatal outcomes of aspirin prophylaxis.'
WHERE slug = 'human-fertility-pregnancy-after-44-pre-eclampsia-prophylaxis-and-biomarker-based-2'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'antiplatelet-prophylaxis-dosing-gestational-timing');

UPDATE topics
SET title = 'Angiogenic Biomarkers & sFlt-1/PlGF Diagnostic Ratios',
    slug = 'angiogenic-biomarkers-sflt-1-plgf-diagnostic-ratios',
    brief = 'Predictive value and clinical rule-out/rule-in performance of soluble fms-like tyrosine kinase-1 and placental growth factor across gestation.'
WHERE slug = 'human-fertility-pregnancy-after-44-pre-eclampsia-prophylaxis-and-biomarker-based-3'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'angiogenic-biomarkers-sflt-1-plgf-diagnostic-ratios');

UPDATE topics
SET title = 'Uterine Artery Doppler Velocimetry & Maternal Arterial Stiffness',
    slug = 'uterine-artery-doppler-velocimetry-maternal-arterial-stiffness',
    brief = 'First- and second-trimester pulsatility index, diastolic notching, pulse wave velocity, and central hemodynamic monitoring.'
WHERE slug = 'human-fertility-pregnancy-after-44-pre-eclampsia-prophylaxis-and-biomarker-based-4'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'uterine-artery-doppler-velocimetry-maternal-arterial-stiffness');

UPDATE topics
SET title = 'Biomarker-Guided Obstetric Triage & Delivery Timing',
    slug = 'biomarker-guided-obstetric-triage-delivery-timing',
    brief = 'Integration of angiogenic and hemodynamic markers into maternal surveillance intervals, antihypertensive therapy, and timed delivery.'
WHERE slug = 'human-fertility-pregnancy-after-44-pre-eclampsia-prophylaxis-and-biomarker-based-5'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'biomarker-guided-obstetric-triage-delivery-timing');

UPDATE topics
SET title = 'Hemorrhagic & Placental Safety of Antithrombotic Prophylaxis',
    slug = 'hemorrhagic-placental-safety-of-antithrombotic-prophylaxis',
    brief = 'Evaluation of antepartum and postpartum hemorrhage risk, placental abruption, and neonatal safety under antiplatelet and anticoagulant regimens.'
WHERE slug = 'human-fertility-pregnancy-after-44-pre-eclampsia-prophylaxis-and-biomarker-based-6'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'hemorrhagic-placental-safety-of-antithrombotic-prophylaxis');

UPDATE topics
SET title = 'Paternal Age Effects on Gamete, Embryo & Offspring Health',
    slug = 'paternal-age-effects-on-gamete-embryo-offspring-health',
    brief = 'Epidemiological and molecular effects of paternal age across the lifespan on blastocyst development, de novo germline mutations, and offspring health.'
WHERE slug = 'human-fertility-male-factor-after-40-paternal-age-effect-on-embryo-and-offspring'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'paternal-age-effects-on-gamete-embryo-offspring-health');

UPDATE topics
SET title = 'Sperm Chromatin Integrity & DNA Fragmentation Diagnostics',
    slug = 'sperm-chromatin-integrity-dna-fragmentation-diagnostics',
    brief = 'Oxidative and apoptotic mechanisms of sperm DNA damage and comparative diagnostic accuracy of TUNEL, SCSA, SCD, and Comet assays.'
WHERE slug = 'human-fertility-male-factor-after-40-sperm-dna-fragmentation-mechanisms-and-diag'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'sperm-chromatin-integrity-dna-fragmentation-diagnostics');

UPDATE topics
SET title = 'Endocrine Regulation of Spermatogenesis & Pharmacotherapy',
    slug = 'endocrine-regulation-of-spermatogenesis-pharmacotherapy',
    brief = 'Hypothalamic-pituitary-gonadal axis modulation, gonadotropins, selective estrogen receptor modulators, and aromatase inhibitors in male subfertility.'
WHERE slug = 'human-fertility-male-factor-after-40-hormonal-and-pharmacological-optimization'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'endocrine-regulation-of-spermatogenesis-pharmacotherapy');

UPDATE topics
SET title = 'Micronutrients, Antioxidants & Seminal Oxidative Stress',
    slug = 'micronutrients-antioxidants-seminal-oxidative-stress',
    brief = 'Randomised trial evidence on exogenous antioxidants, metabolic cofactors, and dietary patterns for seminal parameters and live birth rates.'
WHERE slug = 'human-fertility-male-factor-after-40-nutritional-and-antioxidant-interventions'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'micronutrients-antioxidants-seminal-oxidative-stress');

UPDATE topics
SET title = 'In Vitro Gametogenesis & Pluripotent Stem Cell Reprogramming',
    slug = 'in-vitro-gametogenesis-pluripotent-stem-cell-reprogramming',
    brief = 'Reconstitution of oogenesis and spermatogenesis from induced pluripotent stem cells, primordial germ cell specification, and meiotic checkpoints.'
WHERE slug = 'human-fertility-frontier-fertility-treatments-in-vitro-gametogenesis-ivg'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'in-vitro-gametogenesis-pluripotent-stem-cell-reprogramming');

UPDATE topics
SET title = 'Mitochondrial Replacement Therapy & Ooplasmic Transfer',
    slug = 'mitochondrial-replacement-therapy-ooplasmic-transfer',
    brief = 'Maternal spindle transfer, pronuclear transfer, polar body transfer, heteroplasmy drift, and bioethical-regulatory frameworks.'
WHERE slug = 'human-fertility-frontier-fertility-treatments-mitochondrial-replacement-transfer'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'mitochondrial-replacement-therapy-ooplasmic-transfer');

UPDATE topics
SET title = 'Intraovarian Platelet-Rich Plasma & Stem Cell Biologics',
    slug = 'intraovarian-platelet-rich-plasma-stem-cell-biologics',
    brief = 'Paracrine signaling, dormant primordial follicle activation, and clinical trial evaluation of intraovarian autologous biologics in diminished ovarian reserve.'
WHERE slug = 'human-fertility-frontier-fertility-treatments-ovarian-rejuvenation-intraovarian-'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'intraovarian-platelet-rich-plasma-stem-cell-biologics');

UPDATE topics
SET title = 'Ovarian Tissue Cryopreservation & Orthotopic Transplantation',
    slug = 'ovarian-tissue-cryopreservation-orthotopic-transplantation',
    brief = 'Cortical strip freezing, vitrification versus slow freezing, revascularisation kinetics, endocrine restoration, and fertility preservation.'
WHERE slug = 'human-fertility-frontier-fertility-treatments-ovarian-tissue-cryopreservation-tr'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'ovarian-tissue-cryopreservation-orthotopic-transplantation');

UPDATE topics
SET title = 'mTOR Pathway Modulation & Follicular Longevity',
    slug = 'mtor-pathway-modulation-follicular-longevity',
    brief = 'Mechanistic and translational studies of mTORC1 inhibition (rapamycin/sirolimus) on primordial follicle activation and reproductive aging.'
WHERE slug = 'human-fertility-frontier-fertility-treatments-rapamycin-mtor-inhibition-for-ovar'
  AND NOT EXISTS (SELECT 1 FROM topics WHERE slug = 'mtor-pathway-modulation-follicular-longevity');

-- Replace any remaining "after 44" / "44+" strings in topic titles or briefs with generic "after 40":
UPDATE topics
SET title = REPLACE(REPLACE(title, 'after 44', 'after 40'), 'After 44', 'After 40'),
    brief = REPLACE(REPLACE(brief, 'after 44', 'after 40'), '44+', '40+')
WHERE title ILIKE '%44%' OR brief ILIKE '%44%';

-- Create top-level encyclopaedic trunks of human knowledge if the library already has topics:
INSERT INTO topics (parent_id, slug, title, brief, depth)
SELECT NULL, v.slug, v.title, v.brief, 0
FROM (
  VALUES
    ('natural-and-life-sciences', 'Natural & Life Sciences', 'Physics, chemistry, earth and planetary sciences, molecular and cellular biology, organismal biology, ecology, and biomedical sciences.'),
    ('formal-sciences-mathematics-and-computing', 'Formal Sciences, Mathematics & Computing', 'Pure and applied mathematics, logic, statistics, theoretical computer science, artificial intelligence, and systems architecture.'),
    ('economics-and-political-economy', 'Economics & Political Economy', 'Microeconomics, macroeconomics, econometrics, economic history, public finance, industrial organisation, and global trade.'),
    ('law-and-jurisprudence', 'Law & Jurisprudence', 'Constitutional, civil, criminal, administrative, and international law, comparative legal theory, bioethics, and regulatory frameworks.'),
    ('politics-governance-and-international-relations', 'Politics, Governance & International Relations', 'Political theory, comparative institutions, public policy, diplomacy, security studies, and civic administration.'),
    ('history-and-archaeology', 'History & Archaeology', 'Ancient, medieval, early-modern, and contemporary world history, epigraphy, philology, historiography, and material archaeology.'),
    ('architecture-engineering-and-urbanism', 'Architecture, Engineering & Urbanism', 'Structural and civil engineering, architectural history and theory, sustainable materials, urban planning, and infrastructure systems.'),
    ('arts-literature-and-aesthetics', 'Arts, Literature & Aesthetics', 'Visual arts, musicology, comparative literature, poetics, performing arts, and aesthetic philosophy across cultures.'),
    ('philosophy-ethics-and-epistemology', 'Philosophy, Ethics & Epistemology', 'Metaphysics, epistemology, philosophy of science, moral philosophy, and history of human thought.')
) AS v(slug, title, brief)
WHERE EXISTS (SELECT 1 FROM topics)
  AND NOT EXISTS (SELECT 1 FROM topics t WHERE t.slug = v.slug);

-- Create "Medicine, Health & Longevity" under "Natural & Life Sciences" if topics exist:
INSERT INTO topics (parent_id, slug, title, brief, depth)
SELECT nls.id,
       'medicine-health-and-longevity',
       'Medicine, Health & Longevity',
       'Clinical medicine, pathophysiology, epidemiology, pharmacology, geroscience, preventive medicine, and translational therapeutics across the human lifespan.',
       1
FROM topics nls
WHERE nls.slug = 'natural-and-life-sciences'
  AND NOT EXISTS (SELECT 1 FROM topics t WHERE t.slug = 'medicine-health-and-longevity');

-- Reparent "Reproductive Medicine & Human Fertility" under "Medicine, Health & Longevity":
UPDATE topics rf
SET parent_id = mhl.id,
    updated_at = now()
FROM topics mhl
WHERE rf.slug IN ('reproductive-medicine-human-fertility', 'human-fertility')
  AND mhl.slug = 'medicine-health-and-longevity'
  AND (rf.parent_id IS NULL OR rf.parent_id <> mhl.id);

-- Recalculate depth across the entire topic forest so every reparented branch has exact depth:
WITH RECURSIVE tree AS (
  SELECT id, 0 AS calc_depth
  FROM topics
  WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, tree.calc_depth + 1
  FROM topics c
  JOIN tree ON c.parent_id = tree.id
)
UPDATE topics t
SET depth = tree.calc_depth
FROM tree
WHERE t.id = tree.id
  AND t.depth <> tree.calc_depth;

-- Recover topics that stopped on 429 quota errors:
UPDATE topics t
SET status = CASE
  WHEN EXISTS (SELECT 1 FROM claims c WHERE c.topic_id = t.id AND NOT c.superseded) THEN 'ready'
  ELSE 'idle'
END
WHERE t.status = 'error';

DELETE FROM jobs WHERE status = 'failed';

-- Enqueue review for any topic that has extracted claims but no summary yet:
INSERT INTO jobs (kind, topic_id, payload)
SELECT 'review', t.id, '{}'::jsonb
FROM topics t
WHERE t.status = 'ready'
  AND t.summary IS NULL
  AND EXISTS (SELECT 1 FROM claims c WHERE c.topic_id = t.id AND NOT c.superseded)
  AND NOT EXISTS (SELECT 1 FROM jobs j WHERE j.topic_id = t.id AND j.kind = 'review' AND j.status IN ('queued', 'running'));
