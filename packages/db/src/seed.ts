import { fileURLToPath } from "node:url";
import { getSql, type Sql } from "./client";
import { createTopic, getTopicBySlug } from "./repo";

/** First branch of the library. Research starts when you press "Research" on a topic. */
const SEED = {
  title: "Human fertility",
  brief:
    "Maximise the chance of a live birth for a couple in their early-to-mid forties, including use of eggs vitrified at a younger age, " +
    "donor eggs, uterine and male factors, lifestyle, clinics in Europe, and frontier or controversial treatments.",
  children: [
    { title: "Using eggs vitrified at a younger age", brief: "Thaw survival, live birth per egg and per transfer, how many eggs are needed." },
    { title: "Uterine receptivity and implantation failure", brief: "Endometrial work-up, immune and microbiome hypotheses, what has evidence." },
    { title: "Male factor after 40", brief: "Sperm DNA fragmentation, paternal age effects, interventions." },
    { title: "Donor eggs in Europe", brief: "Law, clinics, success rates, donor anonymity, costs." },
    { title: "Frontier fertility treatments", brief: "Rapamycin, ovarian rejuvenation, mitochondrial transfer, in vitro gametogenesis, AI embryo selection." },
    { title: "Pregnancy after 44", brief: "Pre-eclampsia, gestational diabetes, prevention and monitoring." },
  ],
};

export async function seed(sql: Sql): Promise<void> {
  const existing = await getTopicBySlug(sql, "human-fertility");
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
