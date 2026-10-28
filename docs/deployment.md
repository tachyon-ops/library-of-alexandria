# Deployment and release guide

## Overview

Alexander's Library can run either locally (with Docker Postgres and a continuous worker) or on the zero-cost managed open-source stack (**Neon Postgres 16** + **Vercel** for `@lib/web` + **GitHub Actions** for `@lib/worker`, see `D-012` in `docs/decisions.md`).

## Branching and release workflow

The repository uses two protected long-lived branches:

- `develop` — the integration branch where all new development, features and fixes start from.
- `master` — the release branch holding tagged, verified releases.

**Rule: never commit or push directly to `develop` or `master`.** Every change enters through a pull request and must pass GitHub CI (`.github/workflows/ci.yml`) before merging.

```mermaid
flowchart LR
  feat["feature / fix branch"] -- "PR + CI pass" --> dev["develop"]
  dev -- "PR + tag release + CI pass" --> master["master (keep develop)"]
```

### 1. Daily development (`feature` → `develop`)

1. Start from an up-to-date `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b <area>/<short-name>
   ```
2. Make the bounded change following `skills/change-discipline/SKILL.md` and run local verification:
   ```bash
   npm run typecheck
   (cd apps/web && npx tsc --noEmit)
   TEST_DATABASE_URL=postgres://library:library@localhost:5432/library_test npm test
   npm run build:web
   ```
3. Push the branch and open a pull request targeting `develop`:
   ```bash
   git push -u origin <area>/<short-name>
   gh pr create --base develop
   ```
4. Wait for the `CI` workflow in GitHub Actions to pass.
5. Merge the pull request into `develop` (the short-lived feature branch may then be deleted).

### 2. Releasing (`develop` → `master`)

1. Open a pull request from `develop` to `master`:
   ```bash
   gh pr create --base master --head develop --title "release: vX.Y.Z"
   ```
2. Tag the release candidate / version on the release commit and push the tag so CI verifies it:
   ```bash
   git tag -a vX.Y.Z -m "vX.Y.Z"
   git push origin vX.Y.Z
   ```
3. Wait for the GitHub Actions `CI` workflow to pass on both the pull request and the tag.
4. Merge the pull request into `master` **without deleting `develop`**:
   ```bash
   gh pr merge --merge
   ```
   Never pass `--delete-branch` when merging `develop` into `master`.

## GitHub CI gate (`.github/workflows/ci.yml`)

Every pull request and push to `develop` or `master`, as well as every `v*` tag, runs the `verify` job on Ubuntu with Node 22 and a `postgres:16` service container:

1. `npm ci`
2. `npm run typecheck` (packages, worker, tests)
3. `(cd apps/web && npx tsc --noEmit)` (Next.js front)
4. `npm run db:verify-safe` (Gate 1 static DDL & seed audit, Gate 2 `origin/master -> HEAD` Git state-transition diff & SHA-256 checksum immutability, Gate 4 3-tier rollback planner check, Gate 5 CI backup gate check)
5. `TEST_DATABASE_URL=postgres://library:library@localhost:5432/library_test npm run test:non-destructive` (Gate 3 live full-DB snapshot preservation across `migrate()` and `seed()`, Gate 4 live `Migrate UP -> Rollback DOWN -> Re-Migrate UP` round-trip test, and Gate 5 `.sql.gz` logical dump verification)
6. `TEST_DATABASE_URL=postgres://library:library@localhost:5432/library_test npm run db:backup` (pre-migration compressed logical dump)
7. `TEST_DATABASE_URL=postgres://library:library@localhost:5432/library_test npm test` (core grading, source parsers, 5-gate non-destructive suite, and full end-to-end pipeline on Postgres)
8. `npm run build:web` (production Next.js build)

All steps must pass before a pull request is merged. In `.github/workflows/worker.yml`, `npm run db:verify-safe` and `npm run db:backup` (with artifact upload) always execute immediately before `npm run db:migrate`.

## Running locally

Requirements: Node 20+, Docker (for Postgres 16) or a local Postgres 16 instance, and a Gemini or Anthropic API key.

```bash
cp env.template .env            # set GEMINI_API_KEY (or ANTHROPIC_API_KEY) and CONTACT_EMAIL
docker compose up -d db         # starts Postgres 16 on localhost:5432
npm ci
npm run db:migrate
npm run db:seed                 # seeds the initial fertility branch
npm run probe                   # live check of Europe PMC, OpenAlex, ClinicalTrials.gov
npm run dev:worker              # terminal 1: continuous job queue worker (or `npm run drain:worker` for one-shot)
npm run dev:web                 # terminal 2: Next.js front on http://localhost:3000
```

## Zero-cost managed deployment (Neon + Vercel + GitHub Actions)

For open-source / public-good hosting (`D-012`), the entire stack runs on free tiers with zero servers to maintain:

```mermaid
flowchart LR
  user["Reader / Browser"] --> vercel["Vercel (@lib/web)"]
  vercel -- "SQL read + enqueue job" --> neon[("Neon Postgres 16")]
  vercel -. "optional workflow_dispatch" .-> gha["GitHub Actions (worker.yml)"]
  gha -- "npm run drain:worker (every 15m or on dispatch)" --> neon
```

### Step 1: Database — Neon (Free Tier)

1. Create a free project at [neon.tech](https://neon.tech) (PostgreSQL 16).
2. Copy the connection string (`postgresql://<user>:<pass>@<host>/<db>?sslmode=require`).
3. Initialize the schema and initial seed once from your machine (or let the first GitHub Actions worker run do it automatically):
   ```bash
   DATABASE_URL="postgresql://...?sslmode=require" npm run db:migrate
   DATABASE_URL="postgresql://...?sslmode=require" npm run db:seed
   ```

### Step 2: Background Worker — GitHub Actions (`.github/workflows/worker.yml`)

The workflow in `.github/workflows/worker.yml` runs on `workflow_dispatch` (on-demand) and every 15 minutes (`schedule`), executing `npm run drain:worker` until the `jobs` queue is empty and then exiting cleanly.

In your GitHub repository, open **Settings → Secrets and variables → Actions → New repository secret** and add:

| Secret | Value |
| --- | --- |
| `DATABASE_URL` | Your Neon Postgres connection string |
| `LLM_PROVIDER` | `gemini` (or `anthropic`) |
| `GEMINI_API_KEY` | Your Gemini API key (or `ANTHROPIC_API_KEY` if using Anthropic) |
| `CONTACT_EMAIL` | Your polite-pool contact email (e.g. `nmpribeiro@gmail.com`) |

You can also trigger a worker run manually anytime from the **Actions → Research Worker → Run workflow** button on GitHub.

### Step 3: Web Front — Vercel (Free Hobby / Open Source Tier)

1. Import `tachyon-ops/library-of-alexandria` into [vercel.com](https://vercel.com).
2. Set **Root Directory** to `apps/web` and **Production Branch** to `master` (with preview deployments on `develop` / PRs).
3. Add the following Environment Variables in Vercel:
   - `DATABASE_URL` — the same Neon Postgres connection string.
   - `NEXT_PUBLIC_SITE_URL` — your custom domain once connected (e.g. `https://yourdomain.org`; when left blank, Vercel's `VERCEL_PROJECT_PRODUCTION_URL` is used automatically).
   - `AUTO_EXPAND_DEPTH` — `1` (optional default).
   - *(Optional, for instant worker wakeup when clicking "Research this topic")*:
     - `GITHUB_REPO` — `tachyon-ops/library-of-alexandria`
     - `GITHUB_REF` — `master`
     - `GITHUB_DISPATCH_TOKEN` — a fine-grained GitHub Personal Access Token scoped to `tachyon-ops/library-of-alexandria` with **Actions: Read and write** permission.
4. Deploy. Production updates deploy automatically whenever a release PR is merged from `develop` into `master`.
