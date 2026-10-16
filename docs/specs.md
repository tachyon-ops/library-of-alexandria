# Specification

Describes v0.1 as built. Where the code and this document disagree, the code is the fact and this document is the bug; fix it in the same change. Planned work is in `roadmap.md`, reasons in `decisions.md`.

## 1. Purpose and scope

A person adds a topic. Research workers search the literature, trial registries and the web; extract findings; grade each finding by the design of its supporting studies; label controversy; and write a summary. The front presents the result as a tree.

In scope for v0.1: single deployment, local use, no sign-in, English output, abstracts only.

## 2. Domain model

| Entity      | Key fields                                                                                                                                                                                          | Notes                                                                                        |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Topic       | `slug` (unique), `title`, `brief`, `parentId`, `depth`, `status`, `summary`, `gaps[]`, `lastResearchedAt`                                                                                           | Tree node. Child slugs are prefixed with the parent slug.                                    |
| Source      | `externalId` (unique, origin-prefixed), `doi` (unique when present), `kind`, `title`, `url`, `venue`, `year`, `authors[]`, `abstract`, `citedBy`, `declaredDesign`, `design`, `sampleSize`, `extra` | Stored once, linked to many topics through `topic_sources(extracted)`.                       |
| Claim       | `statement`, `tier`, `controversy`, `direction`, `confidence`, `rationale`, `superseded`                                                                                                            | Linked to ≥ 1 source through `claim_sources`.                                                |
| Entity      | `kind`, `name`, `country`, `url`, `summary`, `attributes{}`, `sourceUrls[]`                                                                                                                         | Clinic, treatment, trial, lab, company, regulation, person. Unique per topic, kind and name. |
| Milestone   | `year`, `title`, `description`, `sourceId`                                                                                                                                                          | Unique per topic, year and title.                                                            |
| Controversy | `kind`, `note`, `claimIds[]`                                                                                                                                                                        | Replaced wholesale at each review.                                                           |
| Job         | `kind`, `topicId`, `payload`, `status`, `attempts`, `runAfter`, `error`                                                                                                                             | Queue row.                                                                                   |
| LLM usage   | `role`, `model`, `inputTokens`, `outputTokens`, `webSearches`, `jobId`                                                                                                                              | One row per model call.                                                                      |

Enumerations (`packages/core`):

- Topic status: `idle`, `queued`, `researching`, `ready`, `error`.
- Source kind: `paper`, `preprint`, `trial`, `web`, `regulation`, `news`.
- Study design: `guideline`, `systematic_review`, `meta_analysis`, `rct`, `registry`, `cohort`, `case_control`, `cross_sectional`, `case_series`, `case_report`, `animal`, `in_vitro`, `computational`, `expert_opinion`, `news_or_web`, `unknown`.
- Tier: `T1`–`T6`. Controversy: `settled`, `debated`, `contested`, `fringe`, `commercial_hype`.
- Direction: `supports`, `refutes`, `mixed`, `no_effect`, `unclear`.
- Job kind: `plan`, `harvest`, `extract`, `scan`, `review`.

## 3. Grading

Implemented in `packages/core/src/evidence.ts`.

- Design to tier: synthesis (guideline, systematic review, meta-analysis) T1; RCT T2; registry, cohort, case-control T3; cross-sectional, case series, case report T4; animal, in vitro, computational T5; opinion, news, unknown T6.
- A T2 or T3 source with a stated sample size below 100 drops one tier.
- A claim's tier is the best tier of its sources; a claim with fewer than two T2 sources cannot be T2 (capped at T3).
- A source's design is its declared design when the origin states one; otherwise the reader's classification.
- After a merge, the kept claim's tier is recomputed from all its sources.

## 4. Pipeline

Entry point: `requestResearch(topicId, autoDepth)` sets the topic to `queued` and enqueues `plan`.

| Job       | Reads                                                                                      | Calls                                                                          | Writes                                                                                                | Enqueues                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `plan`    | topic, ancestors, children                                                                 | scout                                                                          | topic status `researching`; new child topics (≤ 6, none with an existing title, only while depth < 6) | `harvest {literature, trials}`; `scan {task}` per web task (≤ 4); `plan` for new and idle children while `autoDepth > 0`     |
| `harvest` | payload queries                                                                            | each literature query × literature adapters; each trial query × trial adapters | sources, topic links                                                                                  | `extract`                                                                                                                    |
| `extract` | up to 10 unread sources, ordered by citations per year plus a boost for the last two years | reader                                                                         | source designs, claims, milestones; marks the batch extracted                                         | `extract {read}` while unread remain and fewer than `MAX_SOURCES_PER_TOPIC` were read this run; otherwise `review` after 5 s |
| `scan`    | payload task                                                                               | web research, then structured extraction                                       | entities whose source URLs were returned by the search                                                | none                                                                                                                         |
| `review`  | non-superseded claims, entities                                                            | skeptic                                                                        | merges, recomputed tiers, controversy labels, controversies, summary, gaps; topic status `ready`      | none                                                                                                                         |

Queue rules: claimed with `FOR UPDATE SKIP LOCKED`; on error retried after 30 s × 2^attempts, at most 3 attempts, then `failed` and topic `error`; jobs `running` for more than 15 minutes are requeued at worker start; the worker pauses 10 minutes when `MAX_LLM_CALLS_PER_DAY` calls were logged in the last 24 hours.

Invariants:

1. Every stored claim has at least one source.
2. Every stored entity has at least one source URL returned by the web search in the same job.
3. No model output index is used without a range check.
4. A harvest fails only when every adapter call fails.
5. Re-running a job does not duplicate sources, links, entities or milestones.

## 5. Source adapters

Interface (`packages/crawlers/src/types.ts`): `search(query, { limit }) → SourceRecord[]`; no database or model access.

| Adapter            | Endpoint                                                                      | Ordering         | Design from origin                           |
| ------------------ | ----------------------------------------------------------------------------- | ---------------- | -------------------------------------------- |
| `europepmc`        | `ebi.ac.uk/europepmc/webservices/rest/search`, `resultType=core`, `TITLE_ABS` | `CITED desc`     | publication type                             |
| `europepmc-recent` | same, restricted to the last two years                                        | `P_PDATE_D desc` | publication type                             |
| `openalex`         | `api.openalex.org/works?search=`, `filter=has_abstract:true`                  | relevance        | `review` → systematic review                 |
| `clinicaltrials`   | `clinicaltrials.gov/api/v2/studies`                                           | last update      | interventional → RCT, observational → cohort |

All requests go through `getJson`: 20 s timeout, two retries on 429, 5xx or timeout, User-Agent carrying `CONTACT_EMAIL`.

## 6. Agent roles

All roles use the `Llm` interface (`ClaudeLlm` for Anthropic, `GeminiLlm` for Gemini); JSON outputs use structured outputs with the zod schemas exported by each file.

| Role    | Input limit                                                                         | Output contract                                                                                                        |
| ------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| scout   | topic, path, existing children                                                      | ≤ 6 subtopics; ≤ 8 literature queries (including frontier angles); ≤ 3 trial queries; ≤ 4 web tasks                    |
| reader  | ≤ 10 sources, abstracts clipped to 2,400 characters                                 | per-source relevance, design and sample size; claims citing source indexes; milestones with years in 1001 to next year |
| web     | one task, ≤ `MAX_WEB_SEARCHES_PER_JOB` searches, notes clipped to 20,000 characters | entities with key/value attributes and cited URLs                                                                      |
| skeptic | all claims as `[index] (tier, label, source count, years) statement`, entity names  | summary, gaps, merges, relabels, controversies                                                                         |

Default models: Anthropic uses scout/web `claude-sonnet-5-5`, reader `claude-haiku-5-5`, skeptic `claude-opus-5-5`; Gemini uses `gemini-3.6-flash` (with automatic fallback across `gemini-3.5-flash`, `gemini-3-flash-preview`, `gemini-3.5-flash-lite` and `gemini-3.8-flash` on 503/404); each overridable by environment variable.

## 7. Front

| Route           | Shows                                                                                                                                                       | Actions                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `/`             | tree with status and finding counts; grading legend; support and author links; 30-day usage                                                                 | add a root branch, optionally starting research with `AUTO_EXPAND_DEPTH`  |
| `/topic/[slug]` | path, brief, research bar with job status, summary, findings grouped by tier, debates, entities by kind, milestones, open questions, branches, sources read | research (optionally with the next level of branches); add a child branch |

Every page shares a masthead and footer with links to the author (`nuuno.art`, `@tachyon-ops`) and donation options (PayPal Donate and GitHub Sponsors). The page refreshes every 5 s while the topic has open jobs or is `queued` or `researching`. Rendering is server-side; writes are server actions.

## 8. Configuration

| Variable                                                    | Default     | Effect                                                    |
| ----------------------------------------------------------- | ----------- | --------------------------------------------------------- |
| `DATABASE_URL`                                              | none        | Postgres connection                                       |
| `LLM_PROVIDER`                                              | auto-detect | `anthropic` or `gemini`                                   |
| `AI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`         | none        | API key for the chosen provider                           |
| `MODEL_SCOUT`, `MODEL_READER`, `MODEL_WEB`, `MODEL_SKEPTIC` | see §6      | model per role                                            |
| `CONTACT_EMAIL`                                             | none        | polite-pool contact for sources                           |
| `MAX_LLM_CALLS_PER_DAY`                                     | 400         | worker pauses (or exits in drain mode) when reached       |
| `MAX_WEB_SEARCHES_PER_JOB`                                  | 8           | per web task                                              |
| `SOURCES_PER_QUERY`                                         | 10          | results per adapter per query                             |
| `MAX_SOURCES_PER_TOPIC`                                     | 60          | abstracts read per research run                           |
| `AUTO_EXPAND_DEPTH`                                         | 1           | levels of branches researched automatically               |
| `WORKER_POLL_MS`                                            | 3000        | idle poll interval                                        |
| `WORKER_DRAIN`                                              | `false`     | when `1`/`true` (or `--drain`), drain queue and exit      |
| `GITHUB_REPO`, `GITHUB_REF`, `GITHUB_DISPATCH_TOKEN`        | none        | optional webhook dispatch from web actions to `worker.yml` |

## 9. Non-functional requirements

- **Cost:** at the defaults one topic uses at most 1 scout call, 6 reader calls, 8 web calls (4 tasks, each a search call and an extraction call) and 1 skeptic call, plus at most 32 web searches.
- **Privacy:** briefs and abstracts are sent to the Claude API and stored locally; logs carry counts and slugs, not content.
- **Security:** no authentication; local or private-network use only. All stored text is rendered as text. Source and web content enters prompts only inside `<source>` or `<web>` tags.
- **Reliability:** a crashed worker loses no work beyond the job in flight; several workers can run at once.
- **Portability:** Node 20+, Postgres 16; no other services.

## 10. Verification

- `npm run typecheck` and the web typecheck pass.
- `npm test` with `TEST_DATABASE_URL`: grading, three parsers, and the full pipeline (job order `plan, harvest, scan, extract, review`; DOI deduplication; merge; uncited entity dropped; controversy recorded; topic `ready`).
- `npm run build:web` succeeds.
- Live: `npm run probe` per source; one end-to-end topic run (roadmap M1).
