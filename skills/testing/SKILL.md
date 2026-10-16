---
name: testing
description: Test strategy for Alexander's Library — what to test at which layer, the fixture and ScriptedLlm patterns, and the database used by the pipeline test. Use when adding behaviour, fixing a bug, or before declaring any change done.
---

# Testing

## Layers

| Layer | File | Needs | Covers |
| --- | --- | --- | --- |
| Core | `tests/evidence.test.ts` | nothing | grading rules, helpers |
| Parsers | `tests/crawlers.test.ts` | fixtures in `tests/fixtures/responses.ts` | each source's response shape |
| Pipeline | `tests/pipeline.test.ts` | Postgres at `TEST_DATABASE_URL` | the full job chain with fixture adapters and `ScriptedLlm` |

Test at the lowest layer that can hold the behaviour. A grading rule belongs in the core test, not the pipeline test.

## Patterns

- **Fixtures** are trimmed real responses in the documented shape, with at least one malformed row.
- **ScriptedLlm** answers by schema identity (`schema === ReadingSchema`) and is deliberately imperfect: it returns out-of-range indexes, duplicates and unsupported entities, so the validation in agents and handlers is exercised.
- **Fixture adapters** wrap a parser around a fixture; `brokenAdapter` always throws, to prove one failing source does not stop a harvest.
- The pipeline test drives the queue itself: it sets `run_after = now()`, claims, runs and completes jobs, then asserts the job order and the database state.

## No network in tests

Tests never call the research APIs or the Claude API. Live behaviour is checked with `npm run probe` and a real worker run, and reported separately as "verified live" or "not verified live".

## Running

```bash
npm run typecheck
TEST_DATABASE_URL=postgres://library:library@localhost:5432/library_test npm test
```

Without `TEST_DATABASE_URL` the pipeline test is skipped; say so when reporting.
