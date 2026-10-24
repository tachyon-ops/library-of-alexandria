---
name: codebase-map
description: Map of the Alexander's Library monorepo — what each package owns, where to find things, and which way dependencies point. Read first in any session before opening files.
---

# Codebase map

Alexander's Library is a knowledge tree filled by AI research workers. A person adds a topic in the Next.js front; a worker plans it, harvests sources, reads them, scans the web and reviews the result; the front shows graded findings.

## Packages

| Path | Owns | Must not |
| --- | --- | --- |
| `packages/core` | Domain types, evidence grading (`evidence.ts`), pure helpers (`slugify`, DOI, OpenAlex abstract rebuild) | Do I/O of any kind, import another workspace package |
| `packages/db` | SQL migrations, the `postgres` client, every SQL statement (`repo.ts`), seed | Call an LLM or an external API |
| `packages/crawlers` | Source adapters: Europe PMC (cited and recent views), OpenAlex, ClinicalTrials.gov; pure `parseX(json)` functions | Touch the database or an LLM |
| `packages/agents` | The `Llm` interface (`ClaudeLlm`, `GeminiLlm`, `OpenAiCompatibleLlm`, `FallbackLlm`) and the five roles: taxonomist, scout, reader, web, skeptic | Touch the database or import crawlers |
| `apps/worker` | Job loop (`index.ts`), job handlers (`handlers.ts`), live source probe (`probe.ts`) | Contain SQL or prompt text |
| `apps/web` | Next.js App Router front: tree, topic page, search, server actions (calls `taxonomist` in `@lib/agents` with deterministic fallback) | Call crawlers; write SQL inline |
| `tests` | Grading, parsers (fixtures), full pipeline on real Postgres with `ScriptedLlm` | — |

## Dependency direction

```
core  <-  db      <-  web
core  <-  agents  <-  web
core  <-  crawlers  <-  worker
core  <-  agents    <-  worker
          db        <-  worker
```

Arrows point from dependency to dependent. Anything against these arrows is a design error; stop and raise it.

## Where to look

- A finding's grade: `packages/core/src/evidence.ts` (`tierForSource`, `tierForClaim`).
- Job flow and what each job does: `apps/worker/src/handlers.ts` (`runJob`).
- Prompts and output schemas: `packages/agents/src/{taxonomist,scout,reader,web,skeptic}.ts`, shared stance in `prompts.ts`.
- Schema: `packages/db/migrations/*.sql`. Queries: `packages/db/src/repo.ts`.
- Topic page: `apps/web/src/app/topic/[...slug]/page.tsx`. Styles and tokens: `apps/web/src/app/globals.css`.
- Configuration: `.env.example` (every variable is documented there).
- Docs: `docs/philosophy.md` (principles and stance), `docs/specs.md` (as-built v0.1 specification), `docs/roadmap.md` (milestones M0–M5 and exit criteria), `docs/decisions.md` (architecture decisions D-001+).

## Commands

```bash
npm run typecheck                         # backend + tests
(cd apps/web && npx tsc --noEmit)         # front
npm run db:verify-safe                    # static DDL, seed, Git diff & rollback planner gates
TEST_DATABASE_URL=postgres://…/library_test npm run test:non-destructive
TEST_DATABASE_URL=postgres://…/library_test npm test   # wipes local test database
npm run db:backup                         # compressed pre-migration logical dump (.sql.gz)
npm run probe -- "query words"            # live check of every source
npm run dev:worker / npm run dev:web
```

Related skills: `architecture-boundaries`, `change-discipline`, `job-pipeline`.
