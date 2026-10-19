import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getSql, type Sql } from "./client";
import { assertLocalResetAllowed } from "./seed";

const DEFAULT_MIGRATIONS_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "migrations");

export interface MigrationRollbackPlan {
  migrationName: string;
  tier1CodeOnly: {
    compatible: boolean;
    issues: string[];
    strategy: string;
  };
  tier2CompensatingDown: {
    statements: string[];
    sql: string;
  };
  tier3BackupRestore: {
    strategy: string;
  };
}

/** Strips SQL line comments (-- ...) and block comments (/* ... *\/) while preserving line structure. */
export function stripSqlComments(sqlText: string): string {
  return sqlText
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/--[^\r\n]*/g, "");
}

/**
 * Splits SQL text into top-level semicolon-delimited statements while respecting
 * single-quoted string literals.
 */
export function splitSqlStatements(sqlText: string): string[] {
  const cleaned = stripSqlComments(sqlText);
  const statements: string[] = [];
  let current = "";
  let inSingleQuote = false;

  for (let i = 0; i < cleaned.length; i++) {
    const ch = cleaned[i]!;
    if (ch === "'") {
      if (inSingleQuote && cleaned[i + 1] === "'") {
        current += "''";
        i++;
        continue;
      }
      inSingleQuote = !inSingleQuote;
      current += ch;
      continue;
    }
    if (ch === ";" && !inSingleQuote) {
      const trimmed = current.trim();
      if (trimmed.length > 0) {
        statements.push(trimmed);
      }
      current = "";
      continue;
    }
    current += ch;
  }
  const trailing = current.trim();
  if (trailing.length > 0) {
    statements.push(trailing);
  }
  return statements;
}

/**
 * Synthesizes compensating DOWN SQL statements and evaluates Tier-1 Code-Only Rollback
 * compatibility for a single SQL migration.
 */
export function synthesizeDownSql(migrationName: string, upSql: string): MigrationRollbackPlan {
  const statements = splitSqlStatements(upSql);
  const downStatements: string[] = [];
  const tier1Issues: string[] = [];

  for (const stmt of statements) {
    const normalized = stmt.replace(/\s+/g, " ").trim();

    // Check for destructive DDL that breaks Tier-1 Code-Only Rollback
    if (/^DROP\s+(TABLE|COLUMN|SCHEMA|DATABASE|TYPE|CONSTRAINT)\b/i.test(normalized)) {
      tier1Issues.push(`Destructive DROP statement breaks Tier-1 rollback: "${normalized.slice(0, 80)}"`);
    }
    if (/^TRUNCATE\b/i.test(normalized)) {
      tier1Issues.push(`Destructive TRUNCATE statement breaks Tier-1 rollback: "${normalized.slice(0, 80)}"`);
    }
    if (/^ALTER\s+TABLE\b[\s\S]*\bDROP\s+COLUMN\b/i.test(normalized)) {
      tier1Issues.push(`ALTER TABLE DROP COLUMN breaks Tier-1 rollback: "${normalized.slice(0, 80)}"`);
    }
    if (/^ALTER\s+TABLE\b[\s\S]*\b(ALTER|MODIFY)\s+(COLUMN\s+)?\w+\s+(SET\s+DATA\s+)?TYPE\b/i.test(normalized)) {
      tier1Issues.push(`Column type mutation breaks Tier-1 rollback: "${normalized.slice(0, 80)}"`);
    }

    // 1. CREATE TABLE [IF NOT EXISTS] <table_name> (...)
    const createTableMatch = normalized.match(/^CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_."]+)\s*\(/i);
    if (createTableMatch) {
      const tableName = createTableMatch[1]!;
      downStatements.unshift(`DROP TABLE IF EXISTS ${tableName} CASCADE;`);
      continue;
    }

    // 2. CREATE [UNIQUE] INDEX [CONCURRENTLY] [IF NOT EXISTS] <index_name> ON <table_name> ...
    const createIndexMatch = normalized.match(
      /^CREATE\s+(?:UNIQUE\s+)?INDEX\s+(?:CONCURRENTLY\s+)?(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_."]+)\s+ON\s+/i,
    );
    if (createIndexMatch) {
      const indexName = createIndexMatch[1]!;
      downStatements.unshift(`DROP INDEX IF EXISTS ${indexName};`);
      continue;
    }

    // 3. ALTER TABLE [IF EXISTS] <table_name> ADD [COLUMN] [IF NOT EXISTS] <col_name> <col_def>
    const addColumnMatch = normalized.match(
      /^ALTER\s+TABLE\s+(?:IF\s+EXISTS\s+)?([a-zA-Z0-9_."]+)\s+ADD\s+(?:COLUMN\s+)?(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_."]+)\s+(.+)$/i,
    );
    if (addColumnMatch) {
      const tableName = addColumnMatch[1]!;
      const colName = addColumnMatch[2]!;
      const colSpec = addColumnMatch[3]!;
      if (/\bNOT\s+NULL\b/i.test(colSpec) && !/\bDEFAULT\b/i.test(colSpec)) {
        tier1Issues.push(
          `ALTER TABLE ${tableName} ADD COLUMN ${colName} is NOT NULL without DEFAULT, breaking Tier-1 code-only rollback`,
        );
      }
      downStatements.unshift(`ALTER TABLE ${tableName} DROP COLUMN IF EXISTS ${colName};`);
      continue;
    }
  }

  if (downStatements.length === 0) {
    downStatements.push(`SELECT 1; -- Compensating no-op for data-only migration ${migrationName}`);
  }

  return {
    migrationName,
    tier1CodeOnly: {
      compatible: tier1Issues.length === 0,
      issues: tier1Issues,
      strategy:
        tier1Issues.length === 0
          ? "Redeploy previous application commit (origin/master) without modifying database schema; all schema changes are strictly additive."
          : "Incompatible with Tier-1 code-only rollback.",
    },
    tier2CompensatingDown: {
      statements: downStatements,
      sql: downStatements.join("\n"),
    },
    tier3BackupRestore: {
      strategy: "gunzip -c backups/pre-migration-<timestamp>.sql.gz | psql \"$DATABASE_URL\"",
    },
  };
}

/** Builds the 3-tier rollback plan for every migration in `packages/db/migrations/`. */
export async function buildRollbackPlan(migrationsDir = DEFAULT_MIGRATIONS_DIR): Promise<MigrationRollbackPlan[]> {
  const files = (await readdir(/*turbopackIgnore: true*/ migrationsDir)).filter((f) => f.endsWith(".sql")).sort();
  const plans: MigrationRollbackPlan[] = [];
  for (const file of files) {
    const upSql = await readFile(/*turbopackIgnore: true*/ join(/*turbopackIgnore: true*/ migrationsDir, file), "utf8");
    plans.push(synthesizeDownSql(file, upSql));
  }
  return plans;
}

/**
 * Rolls back the most recently applied migration using its synthesized compensating DOWN SQL
 * inside a transaction and deletes its entry from `_migrations`.
 */
export async function rollbackLastMigration(sql: Sql, migrationsDir = DEFAULT_MIGRATIONS_DIR): Promise<string | null> {
  await sql`CREATE TABLE IF NOT EXISTS _migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`;
  const applied = await sql<{ name: string }[]>`SELECT name FROM _migrations ORDER BY name DESC LIMIT 1`;
  if (applied.length === 0) return null;
  const target = applied[0]!.name;
  const upSql = await readFile(/*turbopackIgnore: true*/ join(/*turbopackIgnore: true*/ migrationsDir, target), "utf8");
  const plan = synthesizeDownSql(target, upSql);

  await sql.begin(async (tx) => {
    for (const stmt of plan.tier2CompensatingDown.statements) {
      await tx.unsafe(stmt);
    }
    await tx`DELETE FROM _migrations WHERE name = ${target}`;
  });
  return target;
}

/**
 * Rolls back all applied migrations in reverse order (`N -> N-1 -> ... -> 1`)
 * using synthesized compensating DOWN SQL.
 */
export async function rollbackAllMigrations(sql: Sql, migrationsDir = DEFAULT_MIGRATIONS_DIR): Promise<string[]> {
  const rolledBack: string[] = [];
  while (true) {
    const name = await rollbackLastMigration(sql, migrationsDir);
    if (!name) break;
    rolledBack.push(name);
  }
  return rolledBack;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const executeLive = process.argv.includes("--execute");
  if (!executeLive) {
    buildRollbackPlan()
      .then((plans) => {
        for (const p of plans) {
          console.log(`[Rollback Plan] ${p.migrationName} (Tier-1 compatible: ${p.tier1CodeOnly.compatible})`);
          for (const stmt of p.tier2CompensatingDown.statements) {
            console.log(`  DOWN: ${stmt}`);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  } else {
    assertLocalResetAllowed(process.env.DATABASE_URL, process.env);
    const sql = getSql();
    rollbackLastMigration(sql)
      .then((rolledBack) => {
        console.log(rolledBack ? `Rolled back: ${rolledBack}` : "No migrations to roll back");
        return sql.end();
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  }
}
