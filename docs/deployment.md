# Deployment and release guide

## Current status (POC)

Alexander's Library currently runs locally as a proof of concept. There is no hosted website yet. If the POC proves effective, a hosted deployment will be added once authentication is in place (see `D-009` in `docs/decisions.md` and milestone M5 in `docs/roadmap.md`).

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
4. `TEST_DATABASE_URL=postgres://library:library@localhost:5432/library_test npm test` (core grading, source parsers, and full end-to-end pipeline on Postgres)
5. `npm run build:web` (production Next.js build)

All five steps must pass before a pull request is merged.

## Running locally during the POC

Requirements: Node 20+, Docker (for Postgres 16) or a local Postgres 16 instance, and a Claude API key.

```bash
cp .env.example .env            # set ANTHROPIC_API_KEY and CONTACT_EMAIL
docker compose up -d db         # starts Postgres 16 on localhost:5432
npm ci
npm run db:migrate
npm run db:seed                 # seeds the initial fertility branch
npm run probe                   # live check of Europe PMC, OpenAlex, ClinicalTrials.gov
npm run dev:worker              # terminal 1: job queue worker
npm run dev:web                 # terminal 2: Next.js front on http://localhost:3000
```

## Future website deployment (post-POC)

When the POC is validated and ready to host:

1. Complete milestone M5 (`docs/roadmap.md`): add authentication before exposing any public URL (`D-009`).
2. Provision managed Postgres 16, a web host running `npm run build:web && npm -w @lib/web run start`, and a long-running worker process running `npm -w @lib/worker run start`.
3. Trigger production deployments from `master` after the release PR and `v*` tag pass CI.
