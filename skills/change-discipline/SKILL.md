---
name: change-discipline
description: How to make a change in Alexander's Library that a human can review line by line — scope, order of work, verification and commit format. Use for every code change, however small.
---

# Change discipline

Every change is reviewed line by line by a human. Optimise for that reader.

## Scope

- One concern per change. A parser fix does not also restyle the topic page.
- Touch only the files the concern needs. No drive-by reformatting, renaming or dependency bumps.
- Do not delete or rewrite code you were not asked to change. If something nearby looks wrong, report it instead.
- Prefer extending a function over adding a near-duplicate (DRY), but do not abstract two cases that merely look alike.

## Order of work

1. State in one sentence what will change and which package owns it (`codebase-map`).
2. Write or update the test first when the behaviour is testable without the network.
3. Make the change in the owning package; update callers and `docs/specs.md` if the as-built specification moved.
4. Verify:
   ```bash
   npm run typecheck
   (cd apps/web && npx tsc --noEmit)
   TEST_DATABASE_URL=postgres://library:library@localhost:5432/library_test npm test
   ```
   For front changes also run `npm run build:web`.
5. Report what changed, what was verified, and what was not (for example, live APIs).

## Things that need explicit approval first

- Schema changes to existing columns or tables (adding is fine; altering or dropping is not).
- Changing grading rules in `evidence.ts`.
- Raising cost defaults (`MAX_LLM_CALLS_PER_DAY`, `MAX_WEB_SEARCHES_PER_JOB`, `MAX_SOURCES_PER_TOPIC`, model choices).
- Adding a dependency.
- Anything that deletes data.

## Commit messages and branches

```
<area>: <what changed, imperative, under 72 characters>

<why, and anything the reviewer should check>
```

Areas: `core`, `db`, `crawlers`, `agents`, `worker`, `web`, `tests`, `docs`, `ci`. Record design decisions in `docs/decisions.md` (`decisions-log` skill), keep `docs/specs.md` in step with code, and check `docs/philosophy.md` and `docs/roadmap.md` when scoping work.

Never commit directly to `develop` or `master`. Branch from `develop`, open a PR to `develop`, and merge after GitHub CI (`.github/workflows/ci.yml`) passes. Releases open a PR from `develop` to `master`, tag `vX.Y.Z`, wait for CI to pass, and merge to `master` without deleting `develop` (`docs/deployment.md`).
