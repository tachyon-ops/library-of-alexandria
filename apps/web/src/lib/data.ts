import "server-only";
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
  "Consecutive or Spaced Out +40s yo female IVF Cycles":
    "Inter-Transfer Interval (Immediate vs. Delayed FET & Endometrial Reset) & Consecutive IVF Cycles After 40",
};

export function normaliseTopicTitle(title: string): string {
  const mapped = LEGACY_TITLE_MAP[title];
  if (mapped) return mapped;
  return title.replace(/after 44/gi, "after 40");
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
        brief: r.brief ? r.brief.replace(/after 44/gi, "after 40") : null,
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
