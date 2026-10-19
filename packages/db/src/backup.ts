import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { gunzipSync, gzipSync } from "node:zlib";
import { getSql, type Sql } from "./client";

const execFileAsync = promisify(execFile);
const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const DEFAULT_BACKUP_DIR = join(REPO_ROOT, "backups");

export interface LogicalBackupResult {
  path: string;
  bytes: number;
  uncompressedBytes: number;
  tables: number;
  rows: number;
  sha256: string;
  engine: "pg_dump" | "logical_sql";
}

function formatSqlLiteral(val: unknown): string {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "boolean") return val ? "TRUE" : "FALSE";
  if (typeof val === "number") return Number.isFinite(val) ? String(val) : "NULL";
  if (val instanceof Date) return `'${val.toISOString().replace(/'/g, "''")}'`;
  if (Array.isArray(val) || typeof val === "object") {
    const json = JSON.stringify(val).replace(/'/g, "''");
    return `'${json}'`;
  }
  return `'${String(val).replace(/'/g, "''")}'`;
}

/**
 * Generates a complete logical SQL dump of all base tables and rows in `public`
 * using the active `postgres` connection.
 */
export async function exportLogicalSqlDump(sql: Sql): Promise<{ dumpSql: string; tables: number; rows: number }> {
  const tableRows = await sql<{ tableName: string }[]>`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    ORDER BY table_name`;

  const lines: string[] = [
    "-- Alexander's Library Pre-Migration Logical Database Dump",
    `-- Generated at: ${new Date().toISOString()}`,
    "BEGIN;",
    "",
  ];

  let totalRows = 0;

  for (const { tableName } of tableRows) {
    if (!/^[a-zA-Z0-9_]+$/.test(tableName)) continue;
    const colRows = await sql<{ columnName: string; dataType: string; isNullable: string; columnDefault: string | null }[]>`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = ${tableName}
      ORDER BY ordinal_position`;

    const columns = colRows.map((c) => c.columnName);
    lines.push(`-- Table: ${tableName} (${columns.join(", ")})`);

    const rawRows = await sql.unsafe<{ rowData?: string; row_data?: string }[]>(
      `SELECT to_jsonb(t)::text AS row_data FROM "${tableName}" t`,
    );

    for (const r of rawRows) {
      const raw = r.rowData ?? r.row_data ?? "{}";
      const data = JSON.parse(raw) as Record<string, unknown>;
      const colList = columns.map((c) => `"${c}"`).join(", ");
      const valList = columns.map((c) => formatSqlLiteral(data[c])).join(", ");
      lines.push(`INSERT INTO "${tableName}" (${colList}) VALUES (${valList}) ON CONFLICT DO NOTHING;`);
      totalRows++;
    }
    lines.push("");
  }

  lines.push("COMMIT;");
  return {
    dumpSql: lines.join("\n"),
    tables: tableRows.length,
    rows: totalRows,
  };
}

/**
 * Captures a compressed (`.sql.gz`) logical database dump immediately before running
 * migrations (Gate 5: Pre-Migration Backup in CI/CD).
 */
export async function createLogicalBackup(
  options: {
    url?: string;
    sql?: Sql;
    outDir?: string;
    filename?: string;
  } = {},
): Promise<LogicalBackupResult> {
  const connectionUrl = options.url ?? process.env.DATABASE_URL ?? process.env.TEST_DATABASE_URL;
  if (!connectionUrl && !options.sql) {
    throw new Error("Cannot capture pre-migration backup: DATABASE_URL is not set.");
  }

  const outDir = options.outDir ?? process.env.BACKUP_DIR ?? DEFAULT_BACKUP_DIR;
  await mkdir(/*turbopackIgnore: true*/ outDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = options.filename ?? `pre-migration-${timestamp}.sql.gz`;
  const targetPath = join(/*turbopackIgnore: true*/ outDir, filename);

  const ownSql = !options.sql;
  const sql = options.sql ?? getSql(connectionUrl);

  try {
    const exported = await exportLogicalSqlDump(sql);
    let dumpText = exported.dumpSql;
    let engine: "pg_dump" | "logical_sql" = "logical_sql";

    if (connectionUrl && process.env.PREFER_PG_DUMP === "true") {
      try {
        const { stdout } = await execFileAsync("pg_dump", ["--no-owner", "--no-acl", connectionUrl], {
          maxBuffer: 64 * 1024 * 1024,
        });
        if (stdout && stdout.trim().length > 0) {
          dumpText = stdout;
          engine = "pg_dump";
        }
      } catch {
        // Fall back cleanly to logical_sql dump when pg_dump binary is absent or version-mismatched
      }
    }

    const uncompressedBuffer = Buffer.from(dumpText, "utf8");
    const compressedBuffer = gzipSync(uncompressedBuffer, { level: 9 });

    // Verify gzip magic header (0x1f 0x8b) and round-trip decompression before writing
    if (compressedBuffer.length < 2 || compressedBuffer[0] !== 0x1f || compressedBuffer[1] !== 0x8b) {
      throw new Error("Compressed backup failed gzip header verification.");
    }
    const roundTrip = gunzipSync(compressedBuffer).toString("utf8");
    if (roundTrip.length !== dumpText.length) {
      throw new Error("Compressed backup failed gunzip round-trip integrity check.");
    }

    await writeFile(/*turbopackIgnore: true*/ targetPath, compressedBuffer);
    const fileStats = await stat(/*turbopackIgnore: true*/ targetPath);
    if (fileStats.size === 0) {
      throw new Error("Pre-migration backup file is empty.");
    }

    const sha256 = createHash("sha256").update(compressedBuffer).digest("hex");

    return {
      path: targetPath,
      bytes: fileStats.size,
      uncompressedBytes: uncompressedBuffer.length,
      tables: exported.tables,
      rows: exported.rows,
      sha256,
      engine,
    };
  } finally {
    if (ownSql) {
      await sql.end();
    }
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  createLogicalBackup()
    .then((res) => {
      console.log(
        `[Gate 5: Pre-Migration Backup] Saved compressed logical dump to ${res.path} ` +
          `(${res.bytes} bytes gzipped, ${res.tables} tables, ${res.rows} rows, sha256=${res.sha256.slice(0, 16)}...)`,
      );
    })
    .catch((err) => {
      console.error("[Gate 5: Pre-Migration Backup] Failed:", err);
      process.exit(1);
    });
}
