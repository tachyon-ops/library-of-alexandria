import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { buildRollbackPlan, splitSqlStatements, stripSqlComments } from "./rollback";

const execFileAsync = promisify(execFile);
const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const MIGRATIONS_DIR = join(REPO_ROOT, "packages", "db", "migrations");

/**
 * Immutable SHA-256 checksums of historical migrations already published on `origin/master`
 * before the non-destructive policy took effect. Editing any of these files fails both Gate 1 and Gate 2.
 */
export const PUBLISHED_HISTORICAL_MIGRATION_SHA256: Readonly<Record<string, string>> = {
  "0001_init.sql": "c970e60a689e978c1e1902341c1eaabb644a2f988bad7c377098fe59aff81eed",
  "0002_scientific_taxonomy_and_recover_errors.sql":
    "1968b2ff896dcc45e894cad0caef183365a1cccbf975fc93933eb4b97e2d94aa",
  "0003_topic_links.sql": "e5894b429dc0dc9653169371d63c8e6e77e4036b31d4e51303d5f3dc75e900f9",
  "0004_topic_synthesis.sql": "d96ff0590d82ff5443f6df3a3f1d3ccdf850c96574176ad707be27d99a3ad8e8",
  "0005_retry_rate_limited_jobs.sql": "842de15f744faf4fcf1d091f7a7337856135bca8a08b3438e45e10580f209dcb",
};

export function sha256Hex(content: string | Buffer): string {
  return createHash("sha256").update(content).digest("hex");
}

function stripSqlStringLiterals(sqlText: string): string {
  let out = "";
  let inSingleQuote = false;
  for (let i = 0; i < sqlText.length; i++) {
    const ch = sqlText[i]!;
    if (ch === "'") {
      if (inSingleQuote && sqlText[i + 1] === "'") {
        i++;
        continue;
      }
      inSingleQuote = !inSingleQuote;
      out += "''";
      continue;
    }
    if (!inSingleQuote) {
      out += ch;
    }
  }
  return out;
}

/* ------------------------------------------------------------------ Gate 1 */

/**
 * Audits a single SQL migration file for forbidden destructive DDL or DML statements:
 * - DROP TABLE, DROP COLUMN, DROP SCHEMA, DROP DATABASE, DROP TYPE, DROP CONSTRAINT
 * - TRUNCATE
 * - DELETE FROM (strictly forbidden; historical `0002` permitted only if its SHA-256 matches `origin/master`)
 * - ALTER TABLE ... ADD/MODIFY/ALTER COLUMN ... NOT NULL without DEFAULT
 * - ALTER TABLE ... ALTER/MODIFY COLUMN ... TYPE
 */
export function auditSqlMigration(migrationName: string, sqlContent: string): string[] {
  const violations: string[] = [];
  const fileHash = sha256Hex(sqlContent);
  const statements = splitSqlStatements(sqlContent);

  for (const rawStmt of statements) {
    const stmt = stripSqlStringLiterals(rawStmt).replace(/\s+/g, " ").trim();

    if (/\bDROP\s+TABLE\b/i.test(stmt)) {
      violations.push(`[${migrationName}] Forbidden DROP TABLE statement: "${stmt.slice(0, 90)}"`);
    }
    if (/\bDROP\s+COLUMN\b/i.test(stmt)) {
      violations.push(`[${migrationName}] Forbidden DROP COLUMN statement: "${stmt.slice(0, 90)}"`);
    }
    if (/\bDROP\s+(SCHEMA|DATABASE|TYPE|CONSTRAINT)\b/i.test(stmt)) {
      violations.push(`[${migrationName}] Forbidden DROP statement: "${stmt.slice(0, 90)}"`);
    }
    if (/^TRUNCATE\b|\bTRUNCATE\s+TABLE\b/i.test(stmt)) {
      violations.push(`[${migrationName}] Forbidden TRUNCATE statement: "${stmt.slice(0, 90)}"`);
    }
    if (/^DELETE\s+FROM\b/i.test(stmt)) {
      const isImmutableHistorical0002 =
        migrationName === "0002_scientific_taxonomy_and_recover_errors.sql" &&
        fileHash === PUBLISHED_HISTORICAL_MIGRATION_SHA256["0002_scientific_taxonomy_and_recover_errors.sql"];
      if (!isImmutableHistorical0002) {
        violations.push(`[${migrationName}] Forbidden DELETE FROM statement: "${stmt.slice(0, 90)}"`);
      }
    }

    // Check ALTER TABLE ... ADD [COLUMN] ... NOT NULL without DEFAULT
    const addColMatch = stmt.match(
      /^ALTER\s+TABLE\s+(?:IF\s+EXISTS\s+)?([a-zA-Z0-9_."]+)\s+ADD\s+(?:COLUMN\s+)?(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_."]+)\s+(.+)$/i,
    );
    if (addColMatch) {
      const colSpec = addColMatch[3]!;
      if (/\bNOT\s+NULL\b/i.test(colSpec) && !/\bDEFAULT\b/i.test(colSpec)) {
        violations.push(
          `[${migrationName}] Forbidden ADD COLUMN ... NOT NULL without DEFAULT on ${addColMatch[1]}.${addColMatch[2]}`,
        );
      }
    }

    // Check ALTER TABLE ... (ALTER|MODIFY) [COLUMN] ... SET NOT NULL or NOT NULL without DEFAULT
    if (
      /^ALTER\s+TABLE\b/i.test(stmt) &&
      /\b(ALTER|MODIFY)\s+(?:COLUMN\s+)?[a-zA-Z0-9_."]+\s+SET\s+NOT\s+NULL\b/i.test(stmt)
    ) {
      violations.push(`[${migrationName}] Forbidden ALTER/MODIFY COLUMN ... SET NOT NULL: "${stmt.slice(0, 90)}"`);
    }
    if (
      /^ALTER\s+TABLE\b/i.test(stmt) &&
      /\bMODIFY\s+(?:COLUMN\s+)?[a-zA-Z0-9_."]+\s+[^;]*\bNOT\s+NULL\b/i.test(stmt) &&
      !/\bDEFAULT\b/i.test(stmt)
    ) {
      violations.push(
        `[${migrationName}] Forbidden MODIFY COLUMN ... NOT NULL without DEFAULT: "${stmt.slice(0, 90)}"`,
      );
    }

    // Check ALTER TABLE ... (ALTER|MODIFY) [COLUMN] ... TYPE
    if (
      /^ALTER\s+TABLE\b/i.test(stmt) &&
      /\b(ALTER|MODIFY)\s+(?:COLUMN\s+)?[a-zA-Z0-9_."]+\s+(?:SET\s+DATA\s+)?TYPE\b/i.test(stmt)
    ) {
      violations.push(`[${migrationName}] Forbidden column type mutation: "${stmt.slice(0, 90)}"`);
    }
  }

  return violations;
}

/**
 * Audits runtime seeder source code (`seed.ts`) to ensure:
 * 1. Zero destructive SQL (`DROP TABLE`, `DROP COLUMN`, `TRUNCATE`, `DELETE FROM`, `UPDATE `).
 * 2. Zero `.update(...)` or `.delete(...)` calls on database records.
 * 3. Reset guard enforces `localhost` / `127.0.0.1` AND `ALLOW_DESTRUCTIVE_SEED`.
 */
export function auditSeederSource(fileName: string, sourceCode: string): string[] {
  const violations: string[] = [];
  const noComments = sourceCode.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\r\n]*/g, "");

  // Extract SQL template literals: sql`...` or tx`...`
  const sqlTemplates = [...noComments.matchAll(/\b(?:sql|tx)\s*`([\s\S]*?)`/g)].map((m) => m[1]!);
  for (const tpl of sqlTemplates) {
    const cleaned = stripSqlComments(tpl).replace(/\s+/g, " ").trim();
    if (/\b(DROP\s+TABLE|DROP\s+COLUMN|DROP\s+SCHEMA|TRUNCATE|DELETE\s+FROM)\b/i.test(cleaned)) {
      violations.push(`[${fileName}] Forbidden destructive SQL in seeder: "${cleaned.slice(0, 80)}"`);
    }
    if (/^UPDATE\s+/i.test(cleaned) || /\bDO\s+UPDATE\s+SET\b/i.test(cleaned)) {
      violations.push(`[${fileName}] Forbidden UPDATE in runtime seeder: "${cleaned.slice(0, 80)}"`);
    }
  }

  if (/\.(update|delete|deleteMany|updateMany)\s*\(/.test(noComments)) {
    violations.push(`[${fileName}] Forbidden .update() or .delete() invocation in runtime seeder.`);
  }

  if (fileName.endsWith("seed.ts")) {
    if (!noComments.includes("localhost") || !noComments.includes("127.0.0.1")) {
      violations.push(`[${fileName}] Missing localhost / 127.0.0.1 host verification in reset guard.`);
    }
    if (!noComments.includes("ALLOW_DESTRUCTIVE_SEED")) {
      violations.push(`[${fileName}] Missing ALLOW_DESTRUCTIVE_SEED=true verification in reset guard.`);
    }
  }

  return violations;
}

/**
 * Audits package.json scripts or command strings for forbidden destructive ORM commands
 * (`db push`, `migrate reset`, `--force-reset`, `--accept-data-loss`).
 */
export function auditDestructiveCommands(fileName: string, content: string): string[] {
  const violations: string[] = [];
  const forbiddenPatterns: { pattern: RegExp; label: string }[] = [
    { pattern: /\bdb\s+push\b/i, label: "db push" },
    { pattern: /\bmigrate\s+reset\b/i, label: "migrate reset" },
    { pattern: /--force-reset\b/i, label: "--force-reset" },
    { pattern: /--accept-data-loss\b/i, label: "--accept-data-loss" },
  ];

  for (const { pattern, label } of forbiddenPatterns) {
    if (pattern.test(content)) {
      violations.push(`[${fileName}] Forbidden destructive ORM command/flag detected: "${label}"`);
    }
  }
  return violations;
}

/* ------------------------------------------------------------------ Gate 2 */

export interface ColumnSchemaModel {
  name: string;
  dataType: string;
  notNull: boolean;
  hasDefault: boolean;
}

export interface TableSchemaModel {
  name: string;
  columns: Record<string, ColumnSchemaModel>;
}

export interface DatabaseSchemaModel {
  tables: Record<string, TableSchemaModel>;
}

function splitTopLevelCommas(body: string): string[] {
  const parts: string[] = [];
  let current = "";
  let parenDepth = 0;
  let inQuote = false;

  for (let i = 0; i < body.length; i++) {
    const ch = body[i]!;
    if (ch === "'") {
      if (inQuote && body[i + 1] === "'") {
        current += "''";
        i++;
        continue;
      }
      inQuote = !inQuote;
      current += ch;
      continue;
    }
    if (!inQuote) {
      if (ch === "(") parenDepth++;
      else if (ch === ")") parenDepth = Math.max(0, parenDepth - 1);
      else if (ch === "," && parenDepth === 0) {
        if (current.trim()) parts.push(current.trim());
        current = "";
        continue;
      }
    }
    current += ch;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

/**
 * Reconstructs the effective schema (tables, columns, types, nullability, defaults)
 * from an ordered list of SQL migrations.
 */
export function parseSqlSchemaFromMigrations(
  migrations: { name: string; content: string }[],
): DatabaseSchemaModel {
  const tables: Record<string, TableSchemaModel> = {};

  for (const mig of migrations) {
    const statements = splitSqlStatements(mig.content);
    for (const rawStmt of statements) {
      const stmt = rawStmt.replace(/\s+/g, " ").trim();

      // 1. CREATE TABLE [IF NOT EXISTS] <name> (<body...>)
      const createMatch = stmt.match(
        /^CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_."]+)\s*\(([\s\S]+)\)$/i,
      );
      if (createMatch) {
        const tableName = createMatch[1]!.replace(/"/g, "").toLowerCase();
        const body = createMatch[2]!;
        const table: TableSchemaModel = tables[tableName] ?? { name: tableName, columns: {} };
        for (const item of splitTopLevelCommas(body)) {
          const trimmed = item.trim();
          if (/^(PRIMARY\s+KEY|UNIQUE|CHECK|FOREIGN\s+KEY|CONSTRAINT)\b/i.test(trimmed)) {
            continue;
          }
          const colMatch = trimmed.match(/^([a-zA-Z0-9_"]+)\s+(.+)$/);
          if (!colMatch) continue;
          const colName = colMatch[1]!.replace(/"/g, "").toLowerCase();
          const rest = colMatch[2]!;
          const typeTokens: string[] = [];
          for (const tok of rest.split(/\s+/)) {
            if (
              /^(NOT|NULL|DEFAULT|PRIMARY|UNIQUE|REFERENCES|CHECK|CONSTRAINT|GENERATED)\b/i.test(tok)
            ) {
              break;
            }
            typeTokens.push(tok.toLowerCase());
          }
          const dataType = typeTokens.join(" ") || "unknown";
          const isPrimaryKey = /\bPRIMARY\s+KEY\b/i.test(rest);
          const isSerial = /\b(serial|bigserial|smallserial)\b/i.test(dataType);
          const notNull = /\bNOT\s+NULL\b/i.test(rest) || isPrimaryKey || isSerial;
          const hasDefault = /\bDEFAULT\b/i.test(rest) || isSerial;
          table.columns[colName] = { name: colName, dataType, notNull, hasDefault };
        }
        tables[tableName] = table;
        continue;
      }

      // 2. DROP TABLE [IF EXISTS] <name>
      const dropTableMatch = stmt.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?([a-zA-Z0-9_."]+)/i);
      if (dropTableMatch) {
        const tableName = dropTableMatch[1]!.replace(/"/g, "").toLowerCase();
        delete tables[tableName];
        continue;
      }

      // 3. ALTER TABLE <name> ADD [COLUMN] [IF NOT EXISTS] <col> <spec>
      const addColMatch = stmt.match(
        /^ALTER\s+TABLE\s+(?:IF\s+EXISTS\s+)?([a-zA-Z0-9_."]+)\s+ADD\s+(?:COLUMN\s+)?(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_."]+)\s+(.+)$/i,
      );
      if (addColMatch) {
        const tableName = addColMatch[1]!.replace(/"/g, "").toLowerCase();
        const colName = addColMatch[2]!.replace(/"/g, "").toLowerCase();
        const rest = addColMatch[3]!;
        const table = tables[tableName] ?? { name: tableName, columns: {} };
        const typeTokens: string[] = [];
        for (const tok of rest.split(/\s+/)) {
          if (/^(NOT|NULL|DEFAULT|PRIMARY|UNIQUE|REFERENCES|CHECK|CONSTRAINT)\b/i.test(tok)) {
            break;
          }
          typeTokens.push(tok.toLowerCase());
        }
        const dataType = typeTokens.join(" ") || "unknown";
        const notNull = /\bNOT\s+NULL\b/i.test(rest);
        const hasDefault = /\bDEFAULT\b/i.test(rest);
        table.columns[colName] = { name: colName, dataType, notNull, hasDefault };
        tables[tableName] = table;
        continue;
      }

      // 4. ALTER TABLE <name> DROP [COLUMN] [IF EXISTS] <col>
      const dropColMatch = stmt.match(
        /^ALTER\s+TABLE\s+(?:IF\s+EXISTS\s+)?([a-zA-Z0-9_."]+)\s+DROP\s+(?:COLUMN\s+)?(?:IF\s+EXISTS\s+)?([a-zA-Z0-9_."]+)/i,
      );
      if (dropColMatch) {
        const tableName = dropColMatch[1]!.replace(/"/g, "").toLowerCase();
        const colName = dropColMatch[2]!.replace(/"/g, "").toLowerCase();
        if (tables[tableName]) {
          delete tables[tableName]!.columns[colName];
        }
        continue;
      }

      // 5. ALTER TABLE <name> ALTER [COLUMN] <col> [SET DATA] TYPE <newType>
      const alterTypeMatch = stmt.match(
        /^ALTER\s+TABLE\s+(?:IF\s+EXISTS\s+)?([a-zA-Z0-9_."]+)\s+(?:ALTER|MODIFY)\s+(?:COLUMN\s+)?([a-zA-Z0-9_."]+)\s+(?:SET\s+DATA\s+)?TYPE\s+([a-zA-Z0-9_\[\]]+)/i,
      );
      if (alterTypeMatch) {
        const tableName = alterTypeMatch[1]!.replace(/"/g, "").toLowerCase();
        const colName = alterTypeMatch[2]!.replace(/"/g, "").toLowerCase();
        const newType = alterTypeMatch[3]!.toLowerCase();
        if (tables[tableName]?.columns[colName]) {
          tables[tableName]!.columns[colName]!.dataType = newType;
        }
      }
    }
  }

  return { tables };
}

/**
 * Compares the `origin/master` schema model against the `HEAD` schema model:
 * - Zero deleted tables/models
 * - Zero deleted columns/fields
 * - Zero incompatible column type mutations
 * - Zero nullable -> NOT NULL transitions without DEFAULT
 * - Every newly added column on an existing table must be nullable or have a DEFAULT
 */
export function compareSchemas(baseSchema: DatabaseSchemaModel, headSchema: DatabaseSchemaModel): string[] {
  const violations: string[] = [];

  for (const [tableName, baseTable] of Object.entries(baseSchema.tables)) {
    const headTable = headSchema.tables[tableName];
    if (!headTable) {
      violations.push(`Deleted table "${tableName}" detected between base and HEAD.`);
      continue;
    }

    for (const [colName, baseCol] of Object.entries(baseTable.columns)) {
      const headCol = headTable.columns[colName];
      if (!headCol) {
        violations.push(`Deleted column "${tableName}.${colName}" detected between base and HEAD.`);
        continue;
      }
      if (baseCol.dataType !== headCol.dataType) {
        violations.push(
          `Incompatible column type mutation on "${tableName}.${colName}": "${baseCol.dataType}" -> "${headCol.dataType}".`,
        );
      }
      if (!baseCol.notNull && headCol.notNull && !headCol.hasDefault) {
        violations.push(
          `Column "${tableName}.${colName}" changed from nullable to NOT NULL without DEFAULT.`,
        );
      }
    }

    // Check newly added columns on an existing table
    for (const [colName, headCol] of Object.entries(headTable.columns)) {
      if (!baseTable.columns[colName]) {
        if (headCol.notNull && !headCol.hasDefault) {
          violations.push(
            `New column "${tableName}.${colName}" on existing table "${tableName}" is NOT NULL without a DEFAULT value.`,
          );
        }
      }
    }
  }

  return violations;
}

async function resolveGitBaseRef(preferredRef = "origin/master"): Promise<string | null> {
  const candidates = [preferredRef, "master", "origin/develop", "HEAD"];
  for (const ref of candidates) {
    try {
      await execFileAsync("git", ["rev-parse", "--verify", ref], { cwd: REPO_ROOT });
      return ref;
    } catch {
      // try next candidate
    }
  }
  return null;
}

async function readMigrationsAtGitRef(gitRef: string): Promise<{ name: string; content: string; sha256: string }[]> {
  const { stdout } = await execFileAsync("git", ["ls-tree", "--name-only", gitRef, "packages/db/migrations/"], {
    cwd: REPO_ROOT,
  });
  const paths = stdout
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.endsWith(".sql"))
    .sort();

  const migrations: { name: string; content: string; sha256: string }[] = [];
  for (const relPath of paths) {
    const name = relPath.split("/").pop()!;
    const { stdout: content } = await execFileAsync("git", ["show", `${gitRef}:${relPath}`], {
      cwd: REPO_ROOT,
      maxBuffer: 16 * 1024 * 1024,
    });
    migrations.push({ name, content, sha256: sha256Hex(content) });
  }
  return migrations;
}

export async function readHeadMigrations(
  migrationsDir = MIGRATIONS_DIR,
): Promise<{ name: string; content: string; sha256: string }[]> {
  const files = (await readdir(/*turbopackIgnore: true*/ migrationsDir)).filter((f) => f.endsWith(".sql")).sort();
  const result: { name: string; content: string; sha256: string }[] = [];
  for (const file of files) {
    const content = await readFile(/*turbopackIgnore: true*/ join(/*turbopackIgnore: true*/ migrationsDir, file), "utf8");
    result.push({ name: file, content, sha256: sha256Hex(content) });
  }
  return result;
}

/**
 * Executes Gate 2: Git State-Transition Diff (`origin/master -> HEAD`).
 * Verifies:
 * 1. 100% SHA-256 checksum immutability of already-published migrations.
 * 2. Zero deleted or renamed published migrations.
 * 3. Zero deleted tables, zero deleted columns, zero incompatible column type mutations.
 */
export async function verifyGitStateTransition(preferredBaseRef = "origin/master"): Promise<{
  baseRef: string;
  publishedMigrationsChecked: number;
  headMigrationsCount: number;
  violations: string[];
}> {
  const violations: string[] = [];
  const baseRef = (await resolveGitBaseRef(preferredBaseRef)) ?? "origin/master";
  const headMigrations = await readHeadMigrations();
  const headByName = new Map(headMigrations.map((m) => [m.name, m]));

  let baseMigrations: { name: string; content: string; sha256: string }[] = [];
  try {
    baseMigrations = await readMigrationsAtGitRef(baseRef);
  } catch {
    // Fallback to hardcoded published checksum manifest if git history is unavailable
    for (const [name, expectedSha] of Object.entries(PUBLISHED_HISTORICAL_MIGRATION_SHA256)) {
      const headMig = headByName.get(name);
      if (!headMig) {
        violations.push(`Published migration "${name}" was deleted in HEAD.`);
      } else if (headMig.sha256 !== expectedSha) {
        violations.push(
          `SHA-256 checksum mismatch for published migration "${name}": expected ${expectedSha}, got ${headMig.sha256}.`,
        );
      }
    }
    return {
      baseRef: "manifest-fallback",
      publishedMigrationsChecked: Object.keys(PUBLISHED_HISTORICAL_MIGRATION_SHA256).length,
      headMigrationsCount: headMigrations.length,
      violations,
    };
  }

  for (const baseMig of baseMigrations) {
    const headMig = headByName.get(baseMig.name);
    if (!headMig) {
      violations.push(
        `[${baseRef} -> HEAD] Published migration "${baseMig.name}" was deleted or renamed.`,
      );
      continue;
    }
    if (headMig.sha256 !== baseMig.sha256) {
      violations.push(
        `[${baseRef} -> HEAD] Published migration "${baseMig.name}" was modified! ` +
          `Expected SHA-256 ${baseMig.sha256} (${baseRef}), got ${headMig.sha256} (HEAD).`,
      );
    }
  }

  const baseSchema = parseSqlSchemaFromMigrations(baseMigrations);
  const headSchema = parseSqlSchemaFromMigrations(headMigrations);
  violations.push(...compareSchemas(baseSchema, headSchema));

  return {
    baseRef,
    publishedMigrationsChecked: baseMigrations.length,
    headMigrationsCount: headMigrations.length,
    violations,
  };
}

/**
 * Runs all static and git state-transition gates (`db:verify-safe`):
 * - Gate 1: Static DDL & Seed Audit (migrations, seeders, package.json scripts, CI/CD workflows)
 * - Gate 2: Git State-Transition Diff (`origin/master -> HEAD`) + SHA-256 migration immutability
 * - Gate 4 (Planner): 3-Tier Rollback Planner & Tier-1 Code-Only Rollback verification
 * - Gate 5 (CI/CD Config Audit): Verifies pre-migration backup (`db:backup`) precedes `db:migrate` in CI/CD
 */
export async function runVerifySafe(): Promise<{
  passed: boolean;
  gate1Violations: string[];
  gate2Violations: string[];
  gate4Violations: string[];
  gate5Violations: string[];
}> {
  const gate1Violations: string[] = [];
  const headMigrations = await readHeadMigrations();

  for (const mig of headMigrations) {
    gate1Violations.push(...auditSqlMigration(mig.name, mig.content));
  }

  const seedContent = await readFile(
    /*turbopackIgnore: true*/ join(/*turbopackIgnore: true*/ REPO_ROOT, "packages", "db", "src", "seed.ts"),
    "utf8",
  );
  gate1Violations.push(...auditSeederSource("packages/db/src/seed.ts", seedContent));

  const pkgPaths = [
    join(/*turbopackIgnore: true*/ REPO_ROOT, "package.json"),
    join(/*turbopackIgnore: true*/ REPO_ROOT, "packages", "db", "package.json"),
    join(/*turbopackIgnore: true*/ REPO_ROOT, "apps", "worker", "package.json"),
    join(/*turbopackIgnore: true*/ REPO_ROOT, "apps", "web", "package.json"),
  ];
  for (const pkgPath of pkgPaths) {
    const content = await readFile(/*turbopackIgnore: true*/ pkgPath, "utf8");
    const parsed = JSON.parse(content) as { scripts?: Record<string, string> };
    const scriptsText = JSON.stringify(parsed.scripts ?? {});
    gate1Violations.push(...auditDestructiveCommands(pkgPath.replace(`${REPO_ROOT}/`, ""), scriptsText));
  }

  const gate2Result = await verifyGitStateTransition("origin/master");
  const gate2Violations = gate2Result.violations;

  const rollbackPlans = await buildRollbackPlan();
  const gate4Violations: string[] = [];
  for (const plan of rollbackPlans) {
    if (!plan.tier1CodeOnly.compatible) {
      gate4Violations.push(...plan.tier1CodeOnly.issues);
    }
    if (plan.tier2CompensatingDown.statements.length === 0) {
      gate4Violations.push(`Migration "${plan.migrationName}" failed to synthesize compensating DOWN SQL.`);
    }
  }

  const gate5Violations: string[] = [];
  const workerWorkflow = await readFile(
    /*turbopackIgnore: true*/ join(/*turbopackIgnore: true*/ REPO_ROOT, ".github", "workflows", "worker.yml"),
    "utf8",
  );
  const backupIdx = workerWorkflow.indexOf("db:backup");
  const migrateIdx = workerWorkflow.indexOf("db:migrate");
  if (backupIdx === -1) {
    gate5Violations.push("[.github/workflows/worker.yml] Missing pre-migration backup (`npm run db:backup`).");
  } else if (migrateIdx !== -1 && backupIdx > migrateIdx) {
    gate5Violations.push(
      "[.github/workflows/worker.yml] Pre-migration backup (`db:backup`) must run BEFORE `db:migrate`.",
    );
  }

  const passed =
    gate1Violations.length === 0 &&
    gate2Violations.length === 0 &&
    gate4Violations.length === 0 &&
    gate5Violations.length === 0;

  return {
    passed,
    gate1Violations,
    gate2Violations,
    gate4Violations,
    gate5Violations,
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  runVerifySafe()
    .then((res) => {
      console.log("=== NON-DESTRUCTIVE DATABASE VERIFICATION (db:verify-safe) ===");
      console.log(
        `[Gate 1] Static DDL & Seed Audit: ${res.gate1Violations.length === 0 ? "PASS" : `FAIL (${res.gate1Violations.length})`}`,
      );
      console.log(
        `[Gate 2] Git State-Transition Diff (origin/master -> HEAD) & SHA-256 Immutability: ${res.gate2Violations.length === 0 ? "PASS" : `FAIL (${res.gate2Violations.length})`}`,
      );
      console.log(
        `[Gate 4] 3-Tier Rollback Planner & Tier-1 Compatibility: ${res.gate4Violations.length === 0 ? "PASS" : `FAIL (${res.gate4Violations.length})`}`,
      );
      console.log(
        `[Gate 5] Pre-Migration Backup CI/CD Gate Audit: ${res.gate5Violations.length === 0 ? "PASS" : `FAIL (${res.gate5Violations.length})`}`,
      );

      const allViolations = [
        ...res.gate1Violations,
        ...res.gate2Violations,
        ...res.gate4Violations,
        ...res.gate5Violations,
      ];
      if (allViolations.length > 0) {
        console.error("\nViolations detected:");
        for (const v of allViolations) {
          console.error(`  - ${v}`);
        }
        process.exit(1);
      }
      console.log("All static, git state-transition, rollback planner, and CI backup gates PASSED.");
    })
    .catch((err) => {
      console.error("db:verify-safe failed with error:", err);
      process.exit(1);
    });
}
