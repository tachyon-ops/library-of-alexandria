# Agent instructions

Workspace skills live in `skills/`. Read `codebase-map` and `change-discipline` at the start of every session, then the skill that matches the task.

| Skill | Use when |
| --- | --- |
| `codebase-map` | Orienting: packages, ownership, dependency direction, commands |
| `architecture-boundaries` | Adding a file, an import or a responsibility |
| `change-discipline` | Any code change: scope, verification, approvals, commit format |
| `add-source-adapter` | Adding a research source, or a source fails or returns empty fields |
| `agent-roles-and-prompts` | Editing a prompt or output schema, or adding a Claude role |
| `evidence-grading` | Touching tiers, controversy labels, or a grade looks wrong |
| `job-pipeline` | Changing the worker, adding a job kind, debugging a stuck topic |
| `database-and-migrations` | Adding a table or column, writing a query |
| `web-front` | Anything in `apps/web` |
| `testing` | Adding behaviour or fixing a bug; before declaring done |
| `live-crawl-operations` | Running against live services, errors, costs |
| `research-integrity-and-security` | Prompts, crawlers, stored data, deployment |
| `decisions-log` | Before reversing a design choice; after making one (`docs/decisions.md`) |

Project documents live in `docs/`:

| Document | Use when |
| --- | --- |
| `docs/philosophy.md` | Checking mission, epistemic stance, scope or engineering principles |
| `docs/specs.md` | Checking the as-built v0.1 contract; update in the same change when behaviour or schemas move |
| `docs/roadmap.md` | Checking milestones (M0–M5), exit criteria, the fertility track or open questions |
| `docs/decisions.md` | Before reversing a design choice; after making one (`decisions-log`) |
| `docs/deployment.md` | Branching (`develop` → `master`), PRs, GitHub CI gate, releases and hosting status |

A human reviews every change line by line. Keep changes bounded, verified and reported honestly, including what was not verified.

## NON-DESTRUCTIVE DATABASE, MIGRATION & ROLLBACK POLICY (NON-NEGOTIABLE)

1. **Strictly Additive Schema Evolution (Expand-and-Contract)**:
   - Every schema migration, runtime seed, and production update MUST be 100% non-destructive.
   - NEVER include `DROP TABLE`, `DROP COLUMN`, `TRUNCATE`, `DELETE FROM`, or `ADD/MODIFY COLUMN ... NOT NULL` without a `DEFAULT` value in any SQL migration.
   - NEVER invoke destructive ORM commands (`db push`, `migrate reset`, `--force-reset`, `--accept-data-loss`) outside isolated local ephemeral test databases.

2. **Additive-Only Runtime Seeding**:
   - Runtime seeders/bootstrappers MUST strictly follow `CREATE IF NOT EXISTS` (`INSERT ... ON CONFLICT DO NOTHING`) semantics.
   - NEVER overwrite, `.update()`, or `.delete()` existing records in runtime code.
   - Dev/CI reset seeders MUST verify the DB host is `localhost`/`127.0.0.1` AND require explicit `ALLOW_DESTRUCTIVE_SEED=true` (`assertLocalResetAllowed` / `resetLocalTestSchema`).

3. **5-Gate Automated Verification (`db:verify-safe` & `test:non-destructive`)**:
   - **Static DDL & Seed Audit**: Scan all migration files, ORM schemas, and seeders for destructive statements.
   - **Git State-Transition Diff (`origin/master -> HEAD`)**: Verify zero deleted models/tables, zero deleted fields/columns, zero incompatible column type mutations, and 100% SHA-256 checksum immutability of already-published migrations.
   - **Live Full-DB Snapshot Preservation Test**: Snapshot every row and column across all tables before migration/seeding, execute the transition, and assert 100% of pre-existing rows and field values remain identical.
   - **3-Tier Rollback Planner & `UP -> DOWN -> RE-UP` Round-Trip Test**: Synthesize compensating DOWN SQL for every migration, verify Tier-1 Code-Only Rollback compatibility, and test the live `Migrate UP -> Rollback DOWN -> Re-Migrate UP` cycle against a real test database in CI.
   - **Pre-Migration Backup in CI/CD**: Always capture a compressed logical database dump (`npm run db:backup`) immediately before running production migrations.

