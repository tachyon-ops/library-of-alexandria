import { fileURLToPath } from "node:url";
import { getSql, type Sql } from "./client";
import { createTopic, getTopicBySlug } from "./repo";

/** First branch of the library. Research starts when you press "Research" on a topic. */
const SEED = {
  title: "Reproductive Medicine & Human Fertility",
  brief:
    "Physiology, epidemiology, pathology, and clinical interventions in human reproduction across the lifespan, including " +
    "gametogenesis, ovarian reserve, cryopreservation, endometrial receptivity, andrology, assisted reproductive technology, " +
    "maternal-fetal medicine, and translational reproductive biology.",
  children: [
    {
      title: "Ovarian Reserve & Oocyte Cryopreservation",
      brief: "Follicular dynamics, ovarian aging across the reproductive lifespan, oocyte vitrification, warming survival, and cumulative live birth outcomes.",
    },
    {
      title: "Endometrial Receptivity & Implantation Biology",
      brief: "Endometrial physiology, recurrent implantation failure, reproductive immunology, and the reproductive tract microbiome.",
    },
    {
      title: "Andrology & Male Factor Infertility",
      brief: "Spermatogenesis, sperm chromatin and DNA integrity, paternal age effects across the population, varicocele, and clinical interventions.",
    },
    {
      title: "Assisted Reproductive Technology & Gamete Donation",
      brief: "In vitro fertilisation, intracytoplasmic sperm injection, embryo selection, third-party reproduction, outcomes, and international regulatory frameworks.",
    },
    {
      title: "Translational & Geroprotective Reproductive Biology",
      brief: "In vitro gametogenesis, mitochondrial replacement therapy, ovarian tissue cryopreservation and transplantation, mTOR modulation, and intraovarian biologics.",
    },
    {
      title: "Maternal-Fetal Medicine & Obstetric Perinatology",
      brief: "Maternal cardiovascular and metabolic adaptation, hypertensive disorders of pregnancy, gestational diabetes, placental biology, and age-stratified perinatal outcomes.",
    },
  ],
};

export async function seed(sql: Sql): Promise<void> {
  const existing =
    (await getTopicBySlug(sql, "reproductive-medicine-human-fertility")) ??
    (await getTopicBySlug(sql, "human-fertility"));
  if (existing) return;
  const root = await createTopic(sql, { title: SEED.title, brief: SEED.brief });
  for (const c of SEED.children) await createTopic(sql, { ...c, parentId: root.id });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const sql = getSql();
  seed(sql)
    .then(() => {
      console.log("Seeded the fertility branch");
      return sql.end();
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
