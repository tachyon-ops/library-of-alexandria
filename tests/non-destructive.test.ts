import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { gunzipSync } from "node:zlib";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as repo from "@lib/db";

const url = process.env.TEST_DATABASE_URL;

describe("Gate 1: Static DDL, Seed & Destructive Command Audit", () => {
  it("passes runVerifySafe on all repository migrations, seeders, scripts, and CI workflows", async () => {
    const res = await repo.runVerifySafe();
    expect(res.gate1Violations).toEqual([]);
    expect(res.gate2Violations).toEqual([]);
    expect(res.gate4Violations).toEqual([]);
    expect(res.gate5Violations).toEqual([]);
    expect(res.passed).toBe(true);
  });

  it("rejects DROP TABLE, DROP COLUMN, TRUNCATE, DELETE FROM, and NOT NULL without DEFAULT in SQL migrations", () => {
    expect(repo.auditSqlMigration("0006_bad.sql", "DROP TABLE topics;")).toEqual(
      expect.arrayContaining([expect.stringMatching(/Forbidden DROP TABLE/)]),
    );
    expect(repo.auditSqlMigration("0006_bad.sql", "ALTER TABLE topics DROP COLUMN brief;")).toEqual(
      expect.arrayContaining([expect.stringMatching(/Forbidden DROP COLUMN/)]),
    );
    expect(repo.auditSqlMigration("0006_bad.sql", "TRUNCATE TABLE claims;")).toEqual(
      expect.arrayContaining([expect.stringMatching(/Forbidden TRUNCATE/)]),
    );
    expect(repo.auditSqlMigration("0006_bad.sql", "DELETE FROM claims WHERE superseded = true;")).toEqual(
      expect.arrayContaining([expect.stringMatching(/Forbidden DELETE FROM/)]),
    );
    expect(repo.auditSqlMigration("0006_bad.sql", "ALTER TABLE topics ADD COLUMN owner_id uuid NOT NULL;")).toEqual(
      expect.arrayContaining([expect.stringMatching(/Forbidden ADD COLUMN .* NOT NULL without DEFAULT/)]),
    );
    expect(repo.auditSqlMigration("0006_bad.sql", "ALTER TABLE topics ALTER COLUMN brief SET NOT NULL;")).toEqual(
      expect.arrayContaining([expect.stringMatching(/Forbidden ALTER\/MODIFY COLUMN .* SET NOT NULL/)]),
    );
    expect(repo.auditSqlMigration("0006_bad.sql", "ALTER TABLE topics ALTER COLUMN depth TYPE bigint;")).toEqual(
      expect.arrayContaining([expect.stringMatching(/Forbidden column type mutation/)]),
    );
  });

  it("allows additive CREATE TABLE IF NOT EXISTS and ADD COLUMN ... NOT NULL DEFAULT in SQL migrations", () => {
    const validAdditiveSql = `
      CREATE TABLE IF NOT EXISTS topic_tags (
        topic_id uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
        tag text NOT NULL,
        PRIMARY KEY (topic_id, tag)
      );
      ALTER TABLE topics ADD COLUMN IF NOT EXISTS priority int NOT NULL DEFAULT 0;
      ALTER TABLE topics ADD COLUMN IF NOT EXISTS notes text;
      CREATE INDEX IF NOT EXISTS idx_topic_tags_tag ON topic_tags(tag);
    `;
    expect(repo.auditSqlMigration("0006_good_additive.sql", validAdditiveSql)).toEqual([]);
  });

  it("rejects destructive SQL, UPDATEs, .update(), and .delete() in runtime seeders", () => {
    expect(
      repo.auditSeederSource(
        "bad-seed.ts",
        "await sql`DELETE FROM topics WHERE slug = 'old'`;",
      ),
    ).toEqual(expect.arrayContaining([expect.stringMatching(/Forbidden destructive SQL/)]));

    expect(
      repo.auditSeederSource(
        "bad-seed.ts",
        "await sql`UPDATE topics SET title = 'overwritten' WHERE slug = 'x'`;",
      ),
    ).toEqual(expect.arrayContaining([expect.stringMatching(/Forbidden UPDATE in runtime seeder/)]));

    expect(
      repo.auditSeederSource(
        "bad-seed.ts",
        "await db.topics.delete({ where: { id: 1 } });",
      ),
    ).toEqual(expect.arrayContaining([expect.stringMatching(/Forbidden \.update\(\) or \.delete\(\)/)]));
  });

  it("rejects forbidden destructive ORM CLI commands", () => {
    expect(repo.auditDestructiveCommands("package.json", '{"db:push": "prisma db push --accept-data-loss"}')).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/db push/),
        expect.stringMatching(/--accept-data-loss/),
      ]),
    );
    expect(repo.auditDestructiveCommands("package.json", '{"db:reset": "prisma migrate reset --force-reset"}')).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/migrate reset/),
        expect.stringMatching(/--force-reset/),
      ]),
    );
  });

  it("enforces localhost/127.0.0.1 and ALLOW_DESTRUCTIVE_SEED=true in assertLocalResetAllowed", () => {
    expect(() =>
      repo.assertLocalResetAllowed("postgres://user:pass@ep-cool-cloud.eu-central-1.aws.neon.tech/neondb", {
        ALLOW_DESTRUCTIVE_SEED: "true",
      } as never),
    ).toThrow(/non-local host/);

    expect(() =>
      repo.assertLocalResetAllowed("postgres://user:pass@mondar.ch:5432/prod", {
        ALLOW_DESTRUCTIVE_SEED: "true",
      } as never),
    ).toThrow(/non-local host/);

    expect(() =>
      repo.assertLocalResetAllowed("postgres://library:library@localhost:5432/library_test", {
        ALLOW_DESTRUCTIVE_SEED: "false",
      } as never),
    ).toThrow(/ALLOW_DESTRUCTIVE_SEED=true is required/);

    expect(() =>
      repo.assertLocalResetAllowed("postgres://library:library@localhost:5432/library_test", {} as never),
    ).toThrow(/ALLOW_DESTRUCTIVE_SEED=true is required/);

    expect(() =>
      repo.assertLocalResetAllowed("postgres://library:library@localhost:5432/library_test", {
        ALLOW_DESTRUCTIVE_SEED: "true",
      } as never),
    ).not.toThrow();

    expect(() =>
      repo.assertLocalResetAllowed("postgres://library:library@127.0.0.1:5432/library_test", {
        ALLOW_DESTRUCTIVE_SEED: "true",
      } as never),
    ).not.toThrow();
  });
});

describe("Gate 2: Git State-Transition Diff (origin/master -> HEAD)", () => {
  it("verifies zero deleted tables/columns, zero type mutations, and 100% SHA-256 immutability of published migrations", async () => {
    const result = await repo.verifyGitStateTransition("origin/master");
    expect(result.publishedMigrationsChecked).toBeGreaterThanOrEqual(5);
    expect(result.violations).toEqual([]);
  });

  it("detects deleted tables, deleted columns, incompatible column type mutations, and NOT NULL without DEFAULT", () => {
    const base = repo.parseSqlSchemaFromMigrations([
      {
        name: "0001_init.sql",
        content: `
          CREATE TABLE topics (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            slug text NOT NULL UNIQUE,
            brief text
          );
          CREATE TABLE sources (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            year int
          );
        `,
      },
    ]);

    const headWithViolations = repo.parseSqlSchemaFromMigrations([
      {
        name: "0001_init.sql",
        content: `
          CREATE TABLE topics (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            slug text NOT NULL UNIQUE
          );
        `,
      },
      {
        name: "0002_bad.sql",
        content: `
          ALTER TABLE topics ALTER COLUMN slug TYPE varchar(32);
          ALTER TABLE topics ADD COLUMN mandatory_col text NOT NULL;
        `,
      },
    ]);

    const violations = repo.compareSchemas(base, headWithViolations);
    expect(violations).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/Deleted table "sources"/),
        expect.stringMatching(/Deleted column "topics\.brief"/),
        expect.stringMatching(/Incompatible column type mutation on "topics\.slug"/),
        expect.stringMatching(/New column "topics\.mandatory_col".*is NOT NULL without a DEFAULT/),
      ]),
    );
  });
});

describe("Gate 4 (Static): 3-Tier Rollback Planner", () => {
  it("synthesizes compensating DOWN SQL and verifies Tier-1 Code-Only Rollback compatibility for every migration", async () => {
    const plans = await repo.buildRollbackPlan();
    expect(plans.length).toBeGreaterThanOrEqual(5);
    for (const plan of plans) {
      expect(plan.tier1CodeOnly.compatible).toBe(true);
      expect(plan.tier1CodeOnly.issues).toEqual([]);
      expect(plan.tier2CompensatingDown.statements.length).toBeGreaterThan(0);
    }

    const plan0003 = plans.find((p) => p.migrationName === "0003_topic_links.sql")!;
    expect(plan0003.tier2CompensatingDown.sql).toContain("DROP INDEX IF EXISTS idx_topic_links_linked;");
    expect(plan0003.tier2CompensatingDown.sql).toContain("DROP TABLE IF EXISTS topic_links CASCADE;");

    const plan0004 = plans.find((p) => p.migrationName === "0004_topic_synthesis.sql")!;
    expect(plan0004.tier2CompensatingDown.sql).toContain("ALTER TABLE topics DROP COLUMN IF EXISTS synthesis;");
  });
});

describe.skipIf(!url)("Gates 3, 4 & 5 (Live Postgres): Snapshot Preservation, UP->DOWN->RE-UP & Backup", () => {
  let sql: repo.Sql;

  beforeAll(async () => {
    sql = repo.getSql(url);
  });

  afterAll(async () => {
    await sql?.end();
  });

  it("Gate 3: preserves 100% of pre-existing rows and field values across all tables during migrate() and seed()", async () => {
    await repo.resetLocalTestSchema(sql, url);
    await repo.migrate(sql);

    // 1. Insert custom pre-existing records across all tables (including a customized seed-slug topic)
    const [customRoot] = await sql<{ id: string }[]>`
      INSERT INTO topics (slug, title, brief, depth, status, summary, gaps, synthesis, last_researched_at, created_at)
      VALUES (
        'custom-epistemic-root',
        'Custom Epistemic Root',
        'Pre-existing user brief',
        0,
        'ready',
        'Pre-existing user summary that must never be overwritten.',
        ARRAY['Custom gap 1'],
        '{"benchmarks":[{"metric":"99.9%","label":"Custom benchmark","source":"Custom 2025"}]}'::jsonb,
        '2026-01-15T10:00:00.000Z',
        '2026-01-10T08:00:00.000Z'
      )
      RETURNING id`;

    const [customSeedTopic] = await sql<{ id: string }[]>`
      INSERT INTO topics (parent_id, slug, title, brief, depth, status, summary, gaps, synthesis, last_researched_at, created_at)
      VALUES (
        ${customRoot!.id},
        'reproductive-medicine-human-fertility',
        'Customized Fertility Title',
        'Customized fertility brief',
        1,
        'researching',
        'Customized user summary on a seed slug that must remain untouched.',
        ARRAY['User-preserved gap'],
        '{"benchmarks":[{"metric":"42%","label":"User benchmark","source":"User 2024"}]}'::jsonb,
        '2026-02-01T12:00:00.000Z',
        '2026-01-20T09:00:00.000Z'
      )
      RETURNING id`;

    const [customSource] = await sql<{ id: string }[]>`
      INSERT INTO sources (
        kind, external_id, origin, title, url, doi, venue, year,
        authors, abstract, cited_by, declared_design, design, sample_size, extra, fetched_at
      )
      VALUES (
        'paper',
        'doi:10.1093/humrep/dead001',
        'curated-seed',
        'Custom Pre-Existing Source Title',
        'https://example.org/custom-source',
        '10.1093/humrep/dead001',
        'Custom Journal',
        2023,
        ARRAY['Author One'],
        'Custom abstract',
        777,
        'rct',
        'rct',
        500,
        '{"custom":true}'::jsonb,
        '2026-01-12T00:00:00.000Z'
      )
      RETURNING id`;

    await sql`
      INSERT INTO topic_sources (topic_id, source_id, query, extracted)
      VALUES (${customSeedTopic!.id}, ${customSource!.id}, 'user-custom-query', false)`;

    const [customClaim] = await sql<{ id: string }[]>`
      INSERT INTO claims (topic_id, statement, tier, controversy, direction, confidence, rationale, superseded, created_at)
      VALUES (
        ${customSeedTopic!.id},
        'Pre-existing custom claim statement.',
        'T1',
        'settled',
        'supports',
        0.95,
        'Custom rationale',
        false,
        '2026-01-14T00:00:00.000Z'
      )
      RETURNING id`;

    await sql`
      INSERT INTO claim_sources (claim_id, source_id)
      VALUES (${customClaim!.id}, ${customSource!.id})`;

    await sql`
      INSERT INTO entities (topic_id, kind, name, country, url, summary, attributes, source_urls, updated_at)
      VALUES (
        ${customSeedTopic!.id},
        'clinic',
        'Pre-Existing Custom Clinic',
        'Switzerland',
        'https://custom-clinic.example',
        'Custom clinic summary',
        '{"verified":"yes"}'::jsonb,
        ARRAY['https://custom-clinic.example'],
        '2026-01-18T00:00:00.000Z'
      )`;

    await sql`
      INSERT INTO milestones (topic_id, year, title, description, source_id)
      VALUES (${customSeedTopic!.id}, 1978, 'Custom Milestone', 'Custom milestone description', ${customSource!.id})`;

    await sql`
      INSERT INTO controversies (topic_id, kind, note, claim_ids, created_at)
      VALUES (${customSeedTopic!.id}, 'methodological', 'Pre-existing custom debate note', ARRAY[${customClaim!.id}]::uuid[], '2026-01-19T00:00:00.000Z')`;

    const [aId, bId] =
      customRoot!.id < customSeedTopic!.id
        ? [customRoot!.id, customSeedTopic!.id]
        : [customSeedTopic!.id, customRoot!.id];
    await sql`
      INSERT INTO topic_links (topic_id, linked_topic_id, relation, note, created_at)
      VALUES (${aId}, ${bId}, 'custom-relation', 'Pre-existing link note', '2026-01-21T00:00:00.000Z')`;

    const [customJob] = await sql<{ id: string }[]>`
      INSERT INTO jobs (kind, topic_id, payload, status, attempts, run_after, created_at)
      VALUES ('plan', ${customRoot!.id}, '{"autoDepth":0}'::jsonb, 'done', 1, '2026-01-10T08:00:00.000Z', '2026-01-10T08:00:00.000Z')
      RETURNING id`;

    await sql`
      INSERT INTO llm_usage (job_id, role, model, input_tokens, output_tokens, web_searches, created_at)
      VALUES (${customJob!.id}, 'scout', 'gemini-3.6-flash', 120, 80, 0, '2026-01-10T08:01:00.000Z')`;

    // 2. Capture full-DB snapshot BEFORE running migrate() and seed()
    const snapshotBefore = await repo.captureDatabaseSnapshot(sql);

    // 3. Execute migrate() and seed()
    await repo.migrate(sql);
    await repo.seed(sql);

    // 4. Capture full-DB snapshot AFTER running migrate() and seed() and assert 100% preservation
    const snapshotAfterFirstSeed = await repo.captureDatabaseSnapshot(sql);
    const preservation1 = repo.assertSnapshotPreserved(snapshotBefore, snapshotAfterFirstSeed);
    expect(preservation1.preservedTables).toBeGreaterThanOrEqual(11);
    expect(preservation1.preservedRows).toBeGreaterThanOrEqual(15);

    // Verify new additive seed topics and dossiers were added without touching pre-existing rows
    expect(Object.keys(snapshotAfterFirstSeed.tables.topics!.rowsByKey).length).toBeGreaterThan(
      Object.keys(snapshotBefore.tables.topics!.rowsByKey).length + 40,
    );

    // 5. Re-run migrate() and seed() a second time and assert 100% of all seeded + custom rows are preserved
    await repo.migrate(sql);
    await repo.seed(sql);
    const snapshotAfterSecondSeed = await repo.captureDatabaseSnapshot(sql);
    const preservation2 = repo.assertSnapshotPreserved(snapshotAfterFirstSeed, snapshotAfterSecondSeed);
    expect(preservation2.preservedRows).toBeGreaterThan(200);

    // 6. Verify tamper detection catches mutated field values or deleted rows
    const mutatedClone: repo.DatabaseSnapshot = JSON.parse(JSON.stringify(snapshotAfterSecondSeed));
    const firstTopicKey = Object.keys(mutatedClone.tables.topics!.rowsByKey)[0]!;
    mutatedClone.tables.topics!.rowsByKey[firstTopicKey]!.title = '"Tampered Title"';
    expect(() => repo.assertSnapshotPreserved(snapshotAfterFirstSeed, mutatedClone)).toThrow(
      /Field "topics\.title" .* mutated/,
    );
  });

  it("Gate 4: executes live Migrate UP -> Rollback DOWN -> Re-Migrate UP cycle and verifies Tier-1 compatibility", async () => {
    await repo.resetLocalTestSchema(sql, url);

    // 1. Migrate UP
    const appliedUp = await repo.migrate(sql);
    expect(appliedUp.length).toBeGreaterThanOrEqual(5);

    // 2. Verify Tier-1 Code-Only Rollback compatibility:
    // Old 0001_init.sql code that inserts into `topics` without knowing about `synthesis` (added in 0004) succeeds
    const [tier1Topic] = await sql<{ id: string; synthesis: Record<string, unknown> }[]>`
      INSERT INTO topics (slug, title, brief, depth)
      VALUES ('tier1-compat-test', 'Tier 1 Compatibility Topic', 'Inserted using 0001 columns only', 0)
      RETURNING id, synthesis`;
    expect(tier1Topic!.id).toBeTruthy();
    expect(tier1Topic!.synthesis).toEqual({});

    // 3. Rollback DOWN step-by-step and verify compensating schema changes
    const rolledBack5 = await repo.rollbackLastMigration(sql);
    expect(rolledBack5).toBe("0005_retry_rate_limited_jobs.sql");

    const rolledBack4 = await repo.rollbackLastMigration(sql);
    expect(rolledBack4).toBe("0004_topic_synthesis.sql");
    const colsAfter0004Down = await sql<{ columnName: string }[]>`
      SELECT column_name FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'topics' AND column_name = 'synthesis'`;
    expect(colsAfter0004Down).toHaveLength(0);

    const rolledBack3 = await repo.rollbackLastMigration(sql);
    expect(rolledBack3).toBe("0003_topic_links.sql");
    const tablesAfter0003Down = await sql<{ tableName: string }[]>`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'topic_links'`;
    expect(tablesAfter0003Down).toHaveLength(0);

    // Rollback remaining migrations all the way to empty schema
    const remainingRolledBack = await repo.rollbackAllMigrations(sql);
    expect(remainingRolledBack).toEqual([
      "0002_scientific_taxonomy_and_recover_errors.sql",
      "0001_init.sql",
    ]);

    const appliedAfterFullDown = await sql<{ name: string }[]>`SELECT name FROM _migrations`;
    expect(appliedAfterFullDown).toHaveLength(0);

    // 4. Re-Migrate UP (`RE-UP`) and verify full schema + seeding work cleanly
    const reAppliedUp = await repo.migrate(sql);
    expect(reAppliedUp).toEqual(appliedUp);

    await repo.seed(sql);
    const tree = await repo.listTree(sql);
    expect(tree.length).toBeGreaterThanOrEqual(45);
    const links = await repo.listTopicLinks(sql);
    expect(links.length).toBeGreaterThanOrEqual(35);
  });

  it("Gate 5: captures a compressed pre-migration logical database dump (.sql.gz) and verifies integrity", async () => {
    const tempDir = await mkdtemp(join(tmpdir(), "alexandria-backup-test-"));
    try {
      const backup = await repo.createLogicalBackup({
        sql,
        outDir: tempDir,
        filename: "pre-migration-test.sql.gz",
      });

      expect(backup.bytes).toBeGreaterThan(100);
      expect(backup.uncompressedBytes).toBeGreaterThan(backup.bytes);
      expect(backup.tables).toBeGreaterThanOrEqual(11);
      expect(backup.rows).toBeGreaterThan(100);
      expect(backup.sha256).toMatch(/^[a-f0-9]{64}$/);

      const gzBytes = await readFile(backup.path);
      expect(gzBytes[0]).toBe(0x1f);
      expect(gzBytes[1]).toBe(0x8b);

      const sqlText = gunzipSync(gzBytes).toString("utf8");
      expect(sqlText).toContain("-- Alexander's Library Pre-Migration Logical Database Dump");
      expect(sqlText).toContain('INSERT INTO "topics"');
      expect(sqlText).toContain('INSERT INTO "claims"');
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });
});
