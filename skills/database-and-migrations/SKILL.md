---
name: database-and-migrations
description: Rules for the Alexander's Library Postgres schema and data access — numbered SQL migrations, the repo.ts boundary, camelCase mapping, transactions and dedup keys. Use when adding a table or column, writing a query, or changing how data is stored.
---

# Database and migrations

## Migrations

- Plain SQL files in `packages/db/migrations/`, named `NNNN_description.sql`, applied in name order by `migrate.ts`, each in its own transaction, recorded in `_migrations`.
- Never edit a migration that may have run anywhere. Add a new file.
- Additive changes (new table, new nullable column, new index) are routine. Altering or dropping existing columns needs approval and a data plan (`change-discipline`).
- The worker runs `migrate` at startup; `npm run db:migrate` runs it by hand.

## Data access

- All SQL lives in `packages/db/src/repo.ts`. Each function does one thing, takes `sql` first, and returns typed rows.
- The client uses `postgres.camel`: columns come back camelCase (`parent_id` → `parentId`). Write SQL in snake_case; type results in camelCase. JSON built inside SQL (`json_build_object`) is not transformed; name its keys in camelCase yourself.
- Use tagged templates only; never build SQL with string concatenation. `sql.unsafe` is reserved for running migration files.
- Multi-statement writes that must hold together go in `sql.begin` (see `insertClaim`, `mergeClaims`).

## Deduplication keys

| Table | Key |
| --- | --- |
| `sources` | `external_id` (origin-prefixed), and `doi` when present (partial unique index) |
| `topic_sources` | `(topic_id, source_id)` |
| `entities` | `(topic_id, kind, name)`; upserts merge attributes and source URLs |
| `milestones` | `(topic_id, year, title)` |

Claims are not deleted when merged; they are marked `superseded` and their sources move to the kept claim.

## Tests

The pipeline test drops and recreates the `public` schema of `TEST_DATABASE_URL`. Never point it at a database with data you want to keep.
