# Specification

Describes v0.1 as built. Where the code and this document disagree, the code is the fact and this document is the bug; fix it in the same change. Planned work is in `roadmap.md`, reasons in `decisions.md`.

## 1. Purpose and scope

A person adds a topic. Research workers search the literature, trial registries and the web; extract findings; grade each finding by the design of its supporting studies; label controversy; and write a summary. The front presents the result as a tree.

In scope for v0.1: single deployment, local use, no sign-in, English output, abstracts only.

## 2. Domain model

| Entity      | Key fields                                                                                                                                                                                          | Notes                                                                                        |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Topic       | `slug` (unique), `title`, `brief`, `parentId`, `depth`, `status`, `summary`, `gaps[]`, `synthesis` (jsonb), `lastResearchedAt`                                      | Tree node. Child slugs are prefixed with the parent slug. Holds evaluated decision ledger.  |
| Source      | `externalId` (unique, origin-prefixed), `doi` (unique when present), `kind`, `title`, `url`, `venue`, `year`, `authors[]`, `abstract`, `citedBy`, `declaredDesign`, `design`, `sampleSize`, `extra` | Stored once, linked to many topics through `topic_sources(extracted)`.                       |
| Claim       | `statement`, `tier`, `controversy`, `direction`, `confidence`, `rationale`, `superseded`                                                                                                            | Linked to ≥ 1 source through `claim_sources`.                                                |
| Entity      | `kind`, `name`, `country`, `url`, `summary`, `attributes{}`, `sourceUrls[]`                                                                                                                         | Clinic, treatment, trial, lab, company, regulation, person. Unique per topic, kind and name. |
| Milestone   | `year`, `title`, `description`, `sourceId`                                                                                                                                                          | Unique per topic, year and title.                                                            |
| Controversy | `kind`, `note`, `claimIds[]`                                                                                                                                                                        | Replaced wholesale at each review.                                                           |
| Topic link  | `topicId`, `linkedTopicId`, `relation`, `note`                                                                                                                                                      | Symmetric cross-branch / cross-trunk intersection between two topics (`topic_links`).        |
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
| `extract` | up to `READER_BATCH` (default 20) unread sources, ordered by citations per year plus a boost for the last two years | reader                                                                         | source designs, claims, milestones; marks the batch extracted                                         | `extract {read}` while unread remain and fewer than `MAX_SOURCES_PER_TOPIC` were read this run; otherwise `review`           |
| `scan`    | payload task                                                                               | web research, then structured extraction                                       | entities whose source URLs were returned by the search                                                | none                                                                                                                         |
| `review`  | non-superseded claims, entities                                                            | skeptic                                                                        | merges, recomputed tiers, controversy labels, controversies, summary, gaps; topic status `ready`      | none                                                                                                                         |

Queue rules: claimed with `FOR UPDATE OF j SKIP LOCKED` prioritizing user-requested topics ahead of `autoSpawned` child branches, shallower topic `depth` first, stage priority (`harvest` → `scan` → `review` → `extract` → `plan`), and descending `extract` batch progress (`payload.read` DESC so a started topic finishes all batches and synthesis before the next topic starts); on error retried after 30 s × 2^attempts, at most 3 attempts, then `failed` and topic `error`; jobs `running` for more than 15 minutes are requeued at worker start; the worker pauses 10 minutes when `MAX_LLM_CALLS_PER_DAY` calls were logged in the last 24 hours.

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

All requests go through `getJson`: 20 s timeout, two retries on 429, 5xx or timeout, User-Agent carrying `CONTACT_EMAIL`; OpenAlex attaches `OPENALEX_API_KEY` (via query param and `api-key` header) when configured.

## 6. Agent roles

All roles use the `Llm` interface (`ClaudeLlm` for Anthropic, `GeminiLlm` for Gemini, and `OpenAiCompatibleLlm` for Groq, Cerebras, Mistral, OpenRouter, OpenAI, and GitHub Models chained via `FallbackLlm`); JSON outputs use structured outputs with the zod schemas exported by each file.

| Role    | Input limit                                                                         | Output contract                                                                                                        |
| ------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| scout   | topic, path, existing children                                                      | ≤ 6 subtopics; ≤ 8 literature queries (including frontier angles); ≤ 3 trial queries; ≤ 4 web tasks                    |
| reader  | ≤ `READER_BATCH` (default 20) sources, abstracts clipped to 2,400 characters        | per-source relevance, design and sample size; claims citing source indexes; milestones with years in 1001 to next year |
| web     | one task, ≤ `MAX_WEB_SEARCHES_PER_JOB` searches, notes clipped to 20,000 characters | entities with key/value attributes and cited URLs                                                                      |
| skeptic | all claims as `[index] (tier, label, source count, years) statement`, entity names  | summary, gaps, merges, relabels, controversies                                                                         |

Default models: Anthropic uses scout/web `claude-sonnet-5-5`, reader `claude-haiku-5-5`, skeptic `claude-opus-5-5`; Gemini uses `gemini-3.6-flash` (with automatic in-memory dead/quota-exhausted model caching and fallback across `gemini-3.7-flash`, `gemini-2.5-flash`, `gemini-2.5-flash-lite`, `gemini-3-flash-preview`, `gemini-3.1-flash-lite-preview`, `gemini-flash-latest`, `gemini-flash-lite-latest`, `gemini-2.5-pro`, `gemini-2.0-flash`, and `gemini-2.0-flash-lite`, followed by any configured `OpenAiCompatibleLlm` providers on 429/503); each overridable by environment variable.

## 7. Front

|Route|Shows|Actions|
|---|---|---|
|`/`|hero AI search & research inquiry bar with example query pills; interactive 3D knowledge constellation map with per-branch expand/collapse (`[+N]` clusters for 3 & 4+ hop sub-branches), dashed 3D cross-branch bridge arcs, breadcrumb path bar, and subtree focus; collapsible discipline tree (focused mode by default where all branches start collapsed, with `Active branch only`, `Expand all`, and `Collapse all`); AI Tree Organiser inquiry box; grading legend; support & author links; 30-day usage|ask a question or search across findings/papers/ideas, filter/orbit 3D map, expand/collapse or focus subtrees, step into sub-branches or connected cross-branch disciplines, submit a natural-language inquiry for AI to decompose and organise into the tree|
|`/search`|grounded synthesis briefing (`synthesizeSearchBriefing` in `@lib/core`) with terminology/notation expansion cards (`extractQueryGlossaryTerms`), best evidence tier bar, matched Evaluated Decision Ledger interventions (`synthesis.levers`), numbered citations, matched graded findings (`T1`–`T6`), matched peer-reviewed papers/preprints/clinical trials, matched disciplines and entities, and a read-only AI Tree Organisation plan card (`inferBranchProposals`) listing 1..N canonical scientific sub-branches and their parent disciplines|search across the archive (`searchLibrary` in `@lib/db`), or one-click let AI spawn, cross-link, and queue autonomous research for 1, 2, 3, or more canonical sub-branches (`organizeInquiry`)|
|`/about`|archival chronicle from the Sumerian *Epic of Gilgamesh* and the Library of Alexandria to the Scientific and Information Revolutions, with `(AI)` provenance badges on generated art, museum/manuscript archival plates (`K.3375`, Von Corven 1886, `BnF MS Arabe 5847`), and numbered academic footnotes (`[1]`–`[12]`)|navigate to the Tree of Knowledge or support the library|
|`/topic/[slug]`|co-spawned multi-branch banner when arriving from a multi-branch inquiry, path, brief, research bar with job status and source jump link, Node Topology & Cross-Discipline Map (`parent nodes → the node → child nodes` and `+ Associated nodes (crossover)`), dynamic blog-style **State of the Field Research Article** (`FieldResearchArticle` powered by `buildDynamicFieldArticle` in `@lib/core` and `synthesis.article` from the `skeptic` review handover, featuring Executive Synopsis, clickable section Table of Contents, multi-section editorial narrative with structured bullet lists and callout boxes, Fig. 1 Evidence Hierarchy/Study Design/Consensus/Timeline charts, Fig. 2 Verdict Distribution chart, Featured Landmark Studies & Citations `[1]`–`[6]`, Conclusions, and Key Quantitative Takeaways), baseline benchmark cards (`synthesis.benchmarks`), domain-aware Evaluated Decision & Theoretical Framework Ledger (`synthesis.levers` grouped by stage/category with effect sizes, landmark studies/theorems, regime limits, and verdicts), specialist/research inquiry checklist, queued sweep frontiers, sub-branches, AI Tree Organiser inquiry box, and collapsible deep accordions for historical timeline, full academic evidence by tier (T1–T6), controversies, entities, and indexed sources|research (optionally with the next level of branches); ask a follow-up question for AI to organise into canonical sub-branches|

Every page shares a masthead (`The search for the elixir of youth — what the record says, and how strongly.`) with a compact search bar (`LibrarySearchForm`), an interactive double-click word synopsis popover (`WordSynopsis` powered by `lookupGlossaryTerm` and `selectBestDictionaryDefinition` in `@lib/core`, using surrounding passage and heading context to disambiguate acronyms, extract inline parenthetical expansions, explain biomedical, physics, mathematical, statistical, and quantitative finance terms in plain English with morphological root analysis, and filter out irrelevant symbol/language-code senses from remote dictionary fallbacks), and a footer with links to `/about`, the author (`nuuno.art`, `@tachyon-ops`), and donation options (PayPal Donate and GitHub Sponsors). `@lib/db` provides `searchLibrary(sql, query, limit)` to search across topics, synthesis ledgers, graded claims, sources, and entities; `moveTopic(sql, id, newParentId)` to reparent any node (including a former root) under a new parent while rejecting cycles and recursively recalculating subtree `depth`; `linkTopics(sql, topicId, linkedTopicId, relation, note)` and `topicLinks(sql, topicId)` (with automatic subtree/ancestor cross-branch fallback so every node in the tree exposes associated crossover nodes); and `seedTopicDossier(sql, topicId, dossier)` (`ALL_SEED_DOSSIERS`) to idempotently populate foundational peer-reviewed sources, graded claims, syntheses, milestones, and entities across Reproductive Medicine & Longevity (including Oocyte Nuclear Maturity & Morphological Grading, Zygote Pronuclear Scoring 2PN/1PN/3PN, Blastocyst Morphological Grading Gardner AA/AB/BA/BB/BC & Morphokinetics, Inter-Transfer Interval: Immediate vs. Delayed FET & Endometrial Reset, and Lifestyle, Metabolic Health & Natural Conception Optimization), Physics & Cosmology (Classical Mechanics, Quantum Mechanics, Standard Model, String Theory, MOND, Quantised Inertia, and Dark Matter/GR regime breakdown limits), Formal Sciences (Mathematics, Differential Geometry, Lie Groups, Functional Analysis, Probability, Stochastic Calculus & Statistics), and Economics, Financial Markets & Quantitative Finance. The page refreshes every 5 s while the topic has open jobs or is `queued` or `researching`. Rendering is server-side; writes are server actions.

## 8. Configuration

| Variable                                                    | Default     | Effect                                                    |
| ----------------------------------------------------------- | ----------- | --------------------------------------------------------- |
| `DATABASE_URL`                                              | none        | Postgres connection                                       |
| `LLM_PROVIDER`                                              | auto-detect | `anthropic` or `gemini`                                   |
| `AI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`         | none        | API key for the chosen provider                           |
| `GROQ_API_KEY`, `CEREBRAS_API_KEY`, `MISTRAL_API_KEY`, `OPENROUTER_API_KEY`, `OPENAI_API_KEY`, `GITHUB_MODELS_TOKEN` | none | optional OpenAI-compatible fallback keys chained on 429   |
| `MODEL_SCOUT`, `MODEL_READER`, `MODEL_WEB`, `MODEL_SKEPTIC` | see §6      | model per role                                            |
| `CONTACT_EMAIL`                                             | none        | polite-pool contact for sources                           |
| `MAX_LLM_CALLS_PER_DAY`                                     | 400         | worker pauses (or exits in drain mode) when reached       |
| `MAX_WEB_SEARCHES_PER_JOB`                                  | 8           | per web task                                              |
| `SOURCES_PER_QUERY`                                         | 10          | results per adapter per query                             |
| `READER_BATCH`                                              | 20          | abstracts read per `extract` batch                        |
| `MAX_SOURCES_PER_TOPIC`                                     | 60          | abstracts read per research run                           |
| `AUTO_EXPAND_DEPTH`                                         | 1           | levels of branches researched automatically               |
| `WORKER_POLL_MS`                                            | 3000        | idle poll interval                                        |
| `WORKER_DRAIN`                                              | `false`     | when `1`/`true` (or `--drain`), drain queue and exit      |
| `GITHUB_REPO`, `GITHUB_REF`, `GITHUB_DISPATCH_TOKEN`        | none        | optional webhook dispatch from web actions to `worker.yml` |

## 9. Non-functional requirements

- **Cost:** at the defaults one topic uses at most 1 scout call, 3 reader calls (20 sources per batch up to 60), 8 web calls (4 tasks, each a search call and an extraction call) and 1 skeptic call, plus at most 32 web searches.
- **Privacy:** briefs and abstracts are sent to the Claude API and stored locally; logs carry counts and slugs, not content.
- **Security:** no authentication; local or private-network use only. All stored text is rendered as text. Source and web content enters prompts only inside `<source>` or `<web>` tags.
- **Reliability:** a crashed worker loses no work beyond the job in flight; several workers can run at once.
- **Portability:** Node 20+, Postgres 16; no other services.

## 10. Verification

- `npm run typecheck` and the web typecheck pass.
- `npm run db:verify-safe`: static DDL and seed audit, `origin/master -> HEAD` Git state-transition diff & SHA-256 migration checksum immutability, 3-tier rollback planner check, and CI/CD pre-migration backup gate check.
- `npm run test:non-destructive` with `TEST_DATABASE_URL`: live full-DB snapshot preservation across `migrate()` and `seed()`, live `Migrate UP -> Rollback DOWN -> Re-Migrate UP` round-trip test, and compressed `.sql.gz` pre-migration logical backup verification (`npm run db:backup`).
- `npm test` with `TEST_DATABASE_URL`: grading, three parsers, non-destructive 5-gate suite, and the full pipeline (job order `plan, harvest, scan, extract, review`; DOI deduplication; merge; uncited entity dropped; controversy recorded; topic `ready`).
- `npm run build:web` succeeds.
- Live: `npm run probe` per source; one end-to-end topic run (roadmap M1).

