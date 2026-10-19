---
name: database-and-migrations
description: Rules for the Alexander's Library Postgres schema and data access — numbered SQL migrations, the repo.ts boundary, camelCase mapping, transactions and dedup keys. Use when adding a table or column, writing a query, or changing how data is stored.
---

# Database and migrations

## Migrations (Strictly Additive Expand-and-Contract)

- Plain SQL files in `packages/db/migrations/`, named `NNNN_description.sql`, applied in name order by `migrate.ts`, each in its own transaction, recorded in `_migrations`.
- Never edit or rename a migration that has been published (`origin/master`); SHA-256 checksums of published migrations are verified by `npm run db:verify-safe`.
- Every schema migration MUST be 100% non-destructive:
  - NEVER include `DROP TABLE`, `DROP COLUMN`, `TRUNCATE`, `DELETE FROM`, or `ADD/MODIFY COLUMN ... NOT NULL` without a `DEFAULT` value in any SQL migration.
  - NEVER invoke destructive ORM commands (`db push`, `migrate reset`, `--force-reset`, `--accept-data-loss`).
- Before running production migrations in CI/CD, always capture a compressed logical database dump (`npm run db:backup`).

## Additive-only runtime seeding

- Runtime seeders (`packages/db/src/seed.ts`, `ensureSeedTopic`, `seedTopicDossier`) MUST strictly follow `CREATE IF NOT EXISTS` (`INSERT ... ON CONFLICT DO NOTHING`) semantics.
- Never overwrite, `.update()`, or `.delete()` existing records in runtime seeding code.
- Dev/CI schema resets (`resetLocalTestSchema`, `assertLocalResetAllowed`) MUST verify that the database host is `localhost` or `127.0.0.1` AND require explicit `ALLOW_DESTRUCTIVE_SEED=true`.

## Data access

- All SQL lives in `packages/db/src/repo.ts`. Each function does one thing, takes `sql` first, and returns typed rows.
- The client uses `postgres.camel`: columns come back camelCase (`parent_id` → `parentId`). Write SQL in snake_case; type results in camelCase. JSON built inside SQL (`json_build_object`) is not transformed; name its keys in camelCase yourself.
- Use tagged templates only; never build SQL with string concatenation. `sql.unsafe` is reserved for running migration files and verified snapshot/backup introspection.
- Multi-statement writes that must hold together go in `sql.begin` (see `insertClaim`, `mergeClaims`).

## Deduplication keys

| Table | Key |
| --- | --- |
| `sources` | `external_id` (origin-prefixed), and `doi` when present (partial unique index) |
| `topic_sources` | `(topic_id, source_id)` |
| `entities` | `(topic_id, kind, name)`; runtime seed uses `ON CONFLICT DO NOTHING` |
| `milestones` | `(topic_id, year, title)` |
| `topic_links` | `(topic_id, linked_topic_id)` |

Claims are not deleted when merged; they are marked `superseded` and their sources move to the kept claim.

## 5-Gate verification (`db:verify-safe` & `test:non-destructive`)

Run before finishing any database, migration, or seeder change:

```bash
npm run db:verify-safe
TEST_DATABASE_URL=postgres://library:library@localhost:5432/library_test npm run test:non-destructive
```

