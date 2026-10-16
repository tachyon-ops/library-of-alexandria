---
name: add-source-adapter
description: Step-by-step procedure to add or fix a research source (arXiv, bioRxiv, EU CTR, PubMed, a regulator) in packages/crawlers, including the fixture test and the live probe. Use when adding a source or when the probe or a job log shows a source failing or returning empty fields.
---

# Add or fix a source adapter

An adapter is two parts: a pure `parseX(json): SourceRecord[]` and a thin `SourceAdapter` that fetches and calls it. Keeping the parser pure is what makes it testable without the network.

## Procedure

1. **Read the API's documentation** and note: endpoint, query parameter, page size parameter, sort options, rate limits, whether it asks for a contact e-mail.
2. **Add a fixture** to `tests/fixtures/responses.ts`: a trimmed real response in the documented shape, including one malformed row (missing title or id) that must be skipped.
3. **Write the parser test** in `tests/crawlers.test.ts` before the parser. Assert `kind`, `externalId`, `url`, `doi`, `year`, `declaredDesign`, `sampleSize`, and that the malformed row is dropped.
4. **Write `packages/crawlers/src/<source>.ts`:**
   - `externalId` is `"<origin>:<native id>"`, unique and stable across runs. It is the deduplication key.
   - Normalise DOIs with `normaliseDoi` so the same paper from two sources is stored once.
   - Set `declaredDesign` only when the source states it (publication type, trial type); otherwise `null`. The reader classifies the rest.
   - Set `kind` from `SOURCE_KINDS`; preprints are `"preprint"`, registrations are `"trial"`.
   - Strip markup from titles and abstracts.
   - Fetch through `getJson` (timeout, retry on 429/5xx, polite User-Agent with `CONTACT_EMAIL`).
5. **Register** it in `packages/crawlers/src/index.ts`: add to `LITERATURE_ADAPTERS` or `TRIAL_ADAPTERS`, and export the parser.
6. **Add it to `apps/worker/src/probe.ts`** and run `npm run probe -- "<a query>"` on a machine with internet access. Every field the source provides should read close to N/N.
7. Run the full checks (`change-discipline`).

## Fixing a failing source

- The probe prints `FAILED` with the HTTP status, or a field at `0/N`.
- In production, failures appear in the worker log as `harvest <slug>: N source errors` and, if every source failed, in `jobs.error`.
- A field at `0/N` means the response shape changed: capture a real response, update the fixture to match it, then the parser, keeping the test green.

## Rules

- Respect the source's terms and rate limits. Never scrape HTML where an API exists, and never bypass robots.txt or access controls.
- One failing adapter must not fail a harvest; `runJob` already isolates adapter errors. Do not add try/catch inside the adapter that hides errors.
