export * from "./article";
export * from "./evidence";
export * from "./glossary";
export * from "./search";
export * from "./types";

export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "topic";
}

/**
 * Builds a URL slug for a topic under an optional parent slug while guaranteeing
 * that the child's own title tokens are never truncated out when `parentSlug`
 * is already near the 80-character limit.
 */
export function buildChildSlug(title: string, parentSlug?: string | null): string {
  const childSlug = slugify(title);
  if (!parentSlug) return childSlug;

  // If the child title already forms a long, self-descriptive canonical slug, use it directly
  if (childSlug.length >= 48) {
    return childSlug;
  }

  const combined = `${parentSlug}-${childSlug}`;
  if (combined.length <= 80) {
    return combined;
  }

  // Reserve room for `-${childSlug}` at the end and trim `parentSlug` at a clean hyphen boundary
  const maxParentLen = Math.max(16, 80 - 1 - childSlug.length);
  let parentPrefix = parentSlug.slice(0, maxParentLen).replace(/-+$/g, "");
  const lastHyphen = parentPrefix.lastIndexOf("-");
  if (lastHyphen >= 16) {
    parentPrefix = parentPrefix.slice(0, lastHyphen);
  }
  return `${parentPrefix}-${childSlug}`.slice(0, 80).replace(/-+$/g, "");
}

/** Rebuild plain text from OpenAlex's inverted abstract index. */
export function invertedIndexToText(index: Record<string, number[]> | null | undefined): string | null {
  if (!index) return null;
  const words: string[] = [];
  for (const [word, positions] of Object.entries(index)) {
    for (const p of positions) words[p] = word;
  }
  const text = words.filter((w) => w !== undefined).join(" ").trim();
  return text.length ? text : null;
}

export function normaliseDoi(doi: string | null | undefined): string | null {
  if (!doi) return null;
  const d = doi.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, "").toLowerCase();
  return d.length ? d : null;
}
