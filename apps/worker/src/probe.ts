import { clinicalTrials, europePmc, europePmcRecent, openAlex, type SourceAdapter } from "@lib/crawlers";
import type { SourceRecord } from "@lib/core";

/**
 * Live check of every source adapter. Run it once on a machine with internet
 * access: it shows what each source returns and which fields came back empty,
 * which is where a changed API shows up first.
 *
 *   npm run probe -- "oocyte vitrification live birth"
 */
const query = process.argv.slice(2).join(" ") || "oocyte vitrification live birth";
const adapters: SourceAdapter[] = [europePmc, europePmcRecent, openAlex, clinicalTrials];
const FIELDS: (keyof SourceRecord)[] = ["title", "url", "doi", "venue", "year", "authors", "abstract", "citedBy", "declaredDesign", "sampleSize"];

for (const a of adapters) {
  const t0 = Date.now();
  try {
    const rows = await a.search(query, { limit: 10 });
    const filled = FIELDS.map((f) => {
      const n = rows.filter((r) => {
        const v = r[f];
        return Array.isArray(v) ? v.length > 0 : v != null && v !== "";
      }).length;
      return `${f} ${n}/${rows.length}`;
    });
    console.log(`\n${a.name}: ${rows.length} results in ${Date.now() - t0} ms`);
    console.log(`  fields filled: ${filled.join(", ")}`);
    const first = rows[0];
    if (first) console.log(`  first: ${first.year ?? "?"} | ${first.title.slice(0, 90)} | ${first.url}`);
  } catch (err) {
    console.log(`\n${a.name}: FAILED after ${Date.now() - t0} ms: ${(err as Error).message}`);
  }
}
