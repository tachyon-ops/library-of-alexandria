# Decisions

Format and rules: `skills/decisions-log/SKILL.md`.

## D-001: Monorepo of TypeScript source packages, no build step

Date: 2026-10-16 · Status: accepted

**Context.** One developer, several separable concerns (grading, storage, sources, models, orchestration, UI) that must stay isolated and testable.
**Decision.** npm workspaces with `packages/{core,db,crawlers,agents}` and `apps/{worker,web}`. Packages export TypeScript source; `tsx` runs the worker and Next.js compiles the packages (`transpilePackages`).
**Consequences.** No build artefacts to keep in sync. Packages cannot be published as-is; revisit if one must be consumed outside the repo.

## D-002: Postgres is the job queue

Date: 2026-10-16 · Status: accepted

**Context.** Research jobs are few (tens per topic) and slow (seconds to minutes each).
**Decision.** A `jobs` table claimed with `FOR UPDATE SKIP LOCKED`, retries with exponential backoff, stale-job requeue at startup. No Redis or queue service.
**Consequences.** One less service to run; job state sits next to the data it produces. Revisit above a few thousand jobs per hour.

## D-003: Hand-written SQL with postgres.js, no ORM

Date: 2026-10-16 · Status: accepted

**Context.** The schema is small and queries use Postgres features (recursive CTEs, `json_agg`, partial indexes, `SKIP LOCKED`).
**Decision.** All SQL in `packages/db/src/repo.ts` as tagged templates; numbered plain-SQL migrations; camelCase mapping by the client.
**Consequences.** Full control and readable queries; result types are declared by hand and must be kept in step with the schema.

## D-004: Evidence grades are computed in code from study design

Date: 2026-10-16 · Status: accepted

**Context.** A model asked to judge strength drifts with phrasing and cannot be audited.
**Decision.** The reader classifies each source's design and size; `tierForClaim` in `packages/core` derives T1–T6, with a small-study downgrade and a single-trial cap at T3. Controversy is a separate label.
**Consequences.** Grades are reproducible and testable. A wrong grade traces back to a design classification, which is visible per source.

## D-005: One `Llm` interface; JSON through Claude structured outputs

Date: 2026-10-16 · Status: accepted

**Context.** Agents need reliable JSON and must be testable without the API.
**Decision.** Agents depend on `Llm` (`structured`, `webResearch`). `ClaudeLlm` uses `messages.parse` with zod schemas; tests use `ScriptedLlm`. Models refer to inputs by index; code maps indexes to ids and validates them.
**Consequences.** Schemas must stay within structured-output limits (no numeric constraints, few optional fields). Switching provider means one new class.

## D-006: Web research in two calls, citations required

Date: 2026-10-16 · Status: accepted

**Context.** Search citations cannot be combined with strict JSON output in one call, and an unsupported clinic or treatment is worse than a missing one.
**Decision.** First a web-search call that returns notes with citations, then a structured extraction. Entities whose source URLs are not among the returned citations are dropped.
**Consequences.** Two calls per web task; no invented entities reach the database.

## D-007: Official APIs only for sources

Date: 2026-10-16 · Status: accepted

**Context.** Coverage of medicine and of every other field, plus registered trials, without scraping.
**Decision.** Europe PMC (most cited and newest views), OpenAlex, ClinicalTrials.gov v2. Deduplication by origin id and normalised DOI.
**Consequences.** Abstracts only, no full text, in v0. Parsers are written to documented formats and await their first live probe.

## D-008: Cost caps on by default

Date: 2026-10-16 · Status: accepted

**Context.** A recursive research tree can grow cost without bound.
**Decision.** Defaults: 400 model calls per day, 8 web searches per web task, 60 sources read per topic per run, 10 results per query, one level of automatic sub-branches. Every call logged in `llm_usage`.
**Consequences.** Deep topics need "Research again" to read further. Raising a default needs approval.

## D-009: No authentication in v0

Date: 2026-10-16 · Status: accepted

**Context.** Two users, local use, and briefs that may hold personal health context.
**Decision.** Run locally or behind a private network; no sign-in yet.
**Consequences.** Sign-in is a prerequisite for any public deployment.

## D-010: Two-branch Git flow (`develop` → `master`) gated by GitHub CI

Date: 2026-10-16 · Status: accepted

**Context.** Every change must pass typechecking, tests (including the Postgres pipeline test) and the web build before integration or release, and `develop` must remain the persistent base for new work.
**Decision.** All work branches from `develop`, opens a PR to `develop`, and merges after `.github/workflows/ci.yml` passes. Releases open a PR from `develop` to `master`, tag `vX.Y.Z`, wait for CI to pass, and merge to `master` without deleting `develop`. No direct commits to `develop` or `master`.
**Consequences.** Every commit on `develop` and `master` is verified against a real Postgres 16 container in GitHub Actions.

## D-011: Dual LLM provider adapters (Anthropic and Gemini) behind `Llm`

Date: 2026-10-16 · Status: accepted

**Context.** The worker must be able to run with either an Anthropic or a Gemini API key without changing agent logic or schemas.
**Decision.** Add `GeminiLlm` (`responseJsonSchema` via `z.toJSONSchema` for `structured`, `google_search` grounding for `webResearch`) alongside `ClaudeLlm`, selected by `createLlm` from `LLM_PROVIDER`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, or `AI_API_KEY`.
**Consequences.** Either provider can be used by setting one key in `.env`; no new runtime dependencies required.

## D-012: Zero-cost managed hosting via Neon, Vercel, and GitHub Actions drain worker

Date: 2026-10-16 · Status: accepted

**Context.** As an open-source public-good project, Alexander's Library needs a zero-cost hosting stack without maintaining a paid 24/7 worker VM.
**Decision.** Host Postgres 16 on Neon's free tier, the Next.js front (`@lib/web`) on Vercel's free tier, and run the research worker via `.github/workflows/worker.yml` (`npm run drain:worker`, which drains the Postgres `jobs` queue and exits). Web server actions optionally dispatch `worker.yml` immediately when `GITHUB_DISPATCH_TOKEN` and `GITHUB_REPO` are set.
**Consequences.** Zero monthly infrastructure cost on public repositories; worker runs on demand (`workflow_dispatch`) and every 15 minutes (`schedule`).

## D-013: Topic synthesis as an evaluated decision ledger alongside evidence grading

Date: 2026-10-16 · Status: accepted

**Context.** Scientific inquiry requires actionable calibration across clinical or demographic subgroups rather than isolated methodological tiers (T1–T6 claims list). Readers need prior odds at a glance, structured interventions evaluated by measured effect sizes and landmark trials, consultations questions, and an uncluttered interface where everything starts collapsed.
**Decision.** Extend `Topic` with a `synthesis jsonb` column holding `benchmarks` (baseline probabilities), `levers` (interventions with effect sizes, landmark trials, and verdicts), `clinicalQuestions` (specialist checklist), and `sweepQueue` (frontier trial tracking). The `skeptic` agent extracts this schema during review. The Next.js front renders the decision ledger prominently while deep academic evidence tiers (T1–T6) and sources are collapsed into clean accordions. Tree navigation defaults to focused mode (`containsSlug(node, activeSlug)`), keeping all inactive branches collapsed.
**Consequences.** Results are immediately actionable and quantitative for any reader in a clinical subgroup without sacrificing objective study-design grading or literature provenance.

