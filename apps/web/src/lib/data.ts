import "server-only";
import type { TopicSynthesis } from "@lib/core";
import { getSql, listTree, type TreeNode } from "@lib/db";

export const PAYPAL_DONATE_URL =
  "https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=D3J2WXTXLAWK8&source=url&ssrt=1792150968588";
export const GITHUB_SPONSORS_URL = "https://github.com/sponsors/tachyon-ops";
export const GITHUB_PROFILE_URL = "https://github.com/tachyon-ops";
export const AUTHOR_SITE_URL = "https://nuuno.art";

export const sql = () => getSql();

export interface TreeBranch extends TreeNode {
  children: TreeBranch[];
}

const LEGACY_TITLE_MAP: Record<string, string> = {
  "Human fertility": "Reproductive Medicine & Human Fertility",
  "Using eggs vitrified at a younger age": "Ovarian Reserve & Oocyte Cryopreservation",
  "Uterine receptivity and implantation failure": "Endometrial Receptivity & Implantation Biology",
  "Male factor after 40": "Andrology & Male Factor Infertility",
  "Donor eggs in Europe": "Assisted Reproductive Technology & Gamete Donation",
  "Frontier fertility treatments": "Translational & Geroprotective Reproductive Biology",
  "Frontier Studies on 40+ Fertility and New Clinical Trials": "Translational & Geroprotective Reproductive Biology",
  "Pregnancy after 44": "Advanced Maternal Age & Pregnancy After 40",
  "Maternal-Fetal Medicine & Obstetric Perinatology": "Advanced Maternal Age & Pregnancy After 40",
  "Improve Fertility (organically Conceiving) by Improving Lifestyle":
    "Lifestyle, Metabolic Health & Natural Conception Optimization",
  "Nutrition": "Reproductive Nutrition, Dietary Patterns & Ovulatory Function",
  "Supplements": "Micronutrient, Antioxidant & Mitochondrial Fertility Supplementation",
  "Rejuvenating Both Sperm as Well as Ovarian":
    "Male & Ovarian Gamete Rejuvenation, Spermatogenesis & Follicular Activation",
  "BB/AA, 1PN/2PN -What Grading Methods Are The":
    "Blastocyst Morphological Grading (Gardner AA/BB) & Zygote Pronuclear Scoring (2PN/1PN)",
  "BB/AA, 1PN/2PN - What Grading Methods Are There for Oocytes End Embryos":
    "Blastocyst Morphological Grading (Gardner AA/BB) & Zygote Pronuclear Scoring (2PN/1PN)",
  "Consecutive or Spaced Out +40s yo female IVF Cycles":
    "Inter-Transfer Interval: Immediate vs. Delayed Frozen Embryo Transfer (FET) & Endometrial Reset",
  "Embryo Glue":
    "Hyaluronan-Enriched Embryo Transfer Media (EmbryoGlue) & Implantation Adherence",
  "Embryo glue":
    "Hyaluronan-Enriched Embryo Transfer Media (EmbryoGlue) & Implantation Adherence",
  "EmbryoGlue":
    "Hyaluronan-Enriched Embryo Transfer Media (EmbryoGlue) & Implantation Adherence",
};

/**
 * Normalises editorial age phrasing so generic/synthesised copy uses 40 / 45 / 50
 * (e.g. 40+, 40–45) rather than 42 or 44.
 */
export function normaliseAgePhrasing(text: string): string {
  return text
    .replace(
      /Improve Fertility \(organically Conceiving\) by Improving Lifestyle/gi,
      "Lifestyle, Metabolic Health & Natural Conception Optimization",
    )
    .replace(/\b40\s*[–-]\s*44\+?/g, "40–45")
    .replace(/\b44\s*[–-]\s*4[56]\+?/g, "40–45")
    .replace(/\b42\s*[–-]\s*4[3456]\+?/g, "40–45")
    .replace(/\b40\s*[–-]\s*42\b/g, "40–45")
    .replace(/\b(?:44|42)\+/g, "40+")
    .replace(/\(\s*specifically around age (?:44|42)\s*\)/gi, "(after age 40)")
    .replace(/\(\s*(?:age\s*)?(?:44|42)\s*\)/gi, "(40+)")
    .replace(/\b(ages?|aged)\s+(?:44|42)\b/gi, "$1 40+")
    .replace(/\b(after|over|above|around|by)\s+age\s+(?:44|42)\b/gi, "$1 age 40")
    .replace(/\b(after|over|above)\s+(?:44|42)\b/gi, "$1 40");
}

export function normaliseTopicTitle(title: string): string {
  const mapped = LEGACY_TITLE_MAP[title];
  if (mapped) return mapped;
  return normaliseAgePhrasing(title);
}

export function normaliseTopicSynthesis(synthesis: TopicSynthesis | null): TopicSynthesis | null {
  if (!synthesis) return null;
  return {
    ...synthesis,
    benchmarks: Array.isArray(synthesis.benchmarks)
      ? synthesis.benchmarks.map((b) => ({
          ...b,
          label: normaliseAgePhrasing(b.label),
        }))
      : [],
    levers: Array.isArray(synthesis.levers)
      ? synthesis.levers.map((l) => ({
          ...l,
          name: normaliseAgePhrasing(l.name),
          category: normaliseAgePhrasing(l.category),
          description: normaliseAgePhrasing(l.description),
          effect: normaliseAgePhrasing(l.effect),
          reading: normaliseAgePhrasing(l.reading),
        }))
      : [],
    clinicalQuestions: Array.isArray(synthesis.clinicalQuestions)
      ? synthesis.clinicalQuestions.map(normaliseAgePhrasing)
      : [],
    sweepQueue: Array.isArray(synthesis.sweepQueue)
      ? synthesis.sweepQueue.map(normaliseAgePhrasing)
      : [],
    article: synthesis.article
      ? {
          ...synthesis.article,
          title: normaliseAgePhrasing(synthesis.article.title),
          subtitle: normaliseAgePhrasing(synthesis.article.subtitle),
          synopsis: normaliseAgePhrasing(synthesis.article.synopsis),
          conclusions: normaliseAgePhrasing(synthesis.article.conclusions),
          keyTakeaways: Array.isArray(synthesis.article.keyTakeaways)
            ? synthesis.article.keyTakeaways.map(normaliseAgePhrasing)
            : [],
          sections: Array.isArray(synthesis.article.sections)
            ? synthesis.article.sections.map((s) => ({
                ...s,
                kicker: s.kicker ? normaliseAgePhrasing(s.kicker) : s.kicker,
                heading: normaliseAgePhrasing(s.heading),
                paragraphs: Array.isArray(s.paragraphs) ? s.paragraphs.map(normaliseAgePhrasing) : [],
                bullets: Array.isArray(s.bullets) ? s.bullets.map(normaliseAgePhrasing) : undefined,
                callout: s.callout ? normaliseAgePhrasing(s.callout) : s.callout,
              }))
            : [],
        }
      : undefined,
  };
}

export function anyBusy(nodes: TreeBranch[]): boolean {
  return nodes.some((n) => n.status === "queued" || n.status === "researching" || anyBusy(n.children));
}

/** Builds the nested tree from the flat topic list. */
export async function loadTree(): Promise<TreeBranch[]> {
  const rows = await listTree(sql());
  const byId = new Map<string, TreeBranch>(
    rows.map((r) => [
      r.id,
      {
        ...r,
        title: normaliseTopicTitle(r.title),
        brief: r.brief ? normaliseAgePhrasing(r.brief) : null,
        children: [],
      },
    ]),
  );
  const roots: TreeBranch[] = [];
  for (const node of byId.values()) {
    const parent = node.parentId ? byId.get(node.parentId) : undefined;
    (parent ? parent.children : roots).push(node);
  }
  return roots;
}
