import { fileURLToPath } from "node:url";
import { getSql, type Sql } from "./client";
import { createTopic, getTopicBySlug, moveTopic } from "./repo";

interface SeedNode {
  slug: string;
  title: string;
  brief: string;
  children?: SeedNode[];
}

/**
 * Canonical encyclopaedic trunks of human knowledge (Pinakes / Arbre Encyclopédique),
 * with the initial Medicine -> Reproductive Medicine & Human Fertility hierarchy seeded.
 */
const ENCYCLOPAEDIC_TRUNKS: SeedNode[] = [
  {
    slug: "natural-and-life-sciences",
    title: "Natural & Life Sciences",
    brief:
      "Physics, chemistry, earth and planetary sciences, molecular and cellular biology, organismal biology, ecology, and biomedical sciences.",
    children: [
      {
        slug: "medicine-health-and-longevity",
        title: "Medicine, Health & Longevity",
        brief:
          "Clinical medicine, pathophysiology, epidemiology, pharmacology, geroscience, preventive medicine, and translational therapeutics across the human lifespan.",
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
        ],
      },
    ],
  },
  {
    slug: "formal-sciences-mathematics-and-computing",
    title: "Formal Sciences, Mathematics & Computing",
    brief:
      "Pure and applied mathematics, logic, statistics, theoretical computer science, artificial intelligence, and systems architecture.",
  },
  {
    slug: "economics-and-political-economy",
    title: "Economics & Political Economy",
    brief:
      "Microeconomics, macroeconomics, econometrics, economic history, public finance, industrial organisation, and global trade.",
  },
  {
    slug: "law-and-jurisprudence",
    title: "Law & Jurisprudence",
    brief:
      "Constitutional, civil, criminal, administrative, and international law, comparative legal theory, bioethics, and regulatory frameworks.",
  },
  {
    slug: "politics-governance-and-international-relations",
    title: "Politics, Governance & International Relations",
    brief:
      "Political theory, comparative institutions, public policy, diplomacy, security studies, and civic administration.",
  },
  {
    slug: "history-and-archaeology",
    title: "History & Archaeology",
    brief:
      "Ancient, medieval, early-modern, and contemporary world history, epigraphy, philology, historiography, and material archaeology.",
  },
  {
    slug: "architecture-engineering-and-urbanism",
    title: "Architecture, Engineering & Urbanism",
    brief:
      "Structural and civil engineering, architectural history and theory, sustainable materials, urban planning, and infrastructure systems.",
  },
  {
    slug: "arts-literature-and-aesthetics",
    title: "Arts, Literature & Aesthetics",
    brief:
      "Visual arts, musicology, comparative literature, poetics, performing arts, and aesthetic philosophy across cultures.",
  },
  {
    slug: "philosophy-ethics-and-epistemology",
    title: "Philosophy, Ethics & Epistemology",
    brief:
      "Metaphysics, epistemology, philosophy of science, moral philosophy, and history of human thought.",
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
  for (const child of node.children ?? []) {
    await ensureNode(sql, child, existing.id);
  }
}

export async function seed(sql: Sql): Promise<void> {
  for (const trunk of ENCYCLOPAEDIC_TRUNKS) {
    await ensureNode(sql, trunk, null);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const sql = getSql();
  seed(sql)
    .then(() => {
      console.log("Seeded the encyclopaedic Tree of Knowledge");
      return sql.end();
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
