export * from "./evidence";
export * from "./glossary";
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
