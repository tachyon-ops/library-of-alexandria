import type { Sql } from "./client";
import { assertLocalResetAllowed } from "./seed";

export interface TableSnapshot {
  tableName: string;
  columns: string[];
  primaryKey: string[];
  rowsByKey: Record<string, Record<string, string>>;
}

export interface DatabaseSnapshot {
  capturedAt: string;
  tables: Record<string, TableSnapshot>;
}

function canonicalizeValue(val: unknown): string {
  if (val === null || val === undefined) return "null";
  if (val instanceof Date) return JSON.stringify(val.toISOString());
  if (Array.isArray(val)) {
    return `[${val.map((item) => canonicalizeValue(item)).join(",")}]`;
  }
  if (typeof val === "object") {
    const record = val as Record<string, unknown>;
    const keys = Object.keys(record).sort();
    return `{${keys.map((k) => `${JSON.stringify(k)}:${canonicalizeValue(record[k])}`).join(",")}}`;
  }
  return JSON.stringify(val);
}

/**
 * Captures a complete snapshot of every row and every column across all base tables
 * in the `public` schema.
 */
export async function captureDatabaseSnapshot(sql: Sql): Promise<DatabaseSnapshot> {
  const tableRows = await sql<{ tableName: string }[]>`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    ORDER BY table_name`;

  const tables: Record<string, TableSnapshot> = {};

  for (const { tableName } of tableRows) {
    if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
      throw new Error(`Invalid table identifier: ${tableName}`);
    }

    const colRows = await sql<{ columnName: string }[]>`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = ${tableName}
      ORDER BY ordinal_position`;
    const columns = colRows.map((c) => c.columnName);

    const pkRows = await sql<{ columnName: string }[]>`
      SELECT kcu.column_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
       AND tc.table_schema = kcu.table_schema
      WHERE tc.table_schema = 'public'
        AND tc.table_name = ${tableName}
        AND tc.constraint_type = 'PRIMARY KEY'
      ORDER BY kcu.ordinal_position`;
    const primaryKey = pkRows.length > 0 ? pkRows.map((p) => p.columnName) : columns;

    // Cast to_jsonb(t)::text so postgres.camel does not transform snake_case column keys inside the row JSON
    const rawRows = await sql.unsafe<{ rowData?: string; row_data?: string }[]>(
      `SELECT to_jsonb(t)::text AS row_data FROM "${tableName}" t`,
    );

    const rowsByKey: Record<string, Record<string, string>> = {};
    for (const r of rawRows) {
      const raw = r.rowData ?? r.row_data ?? "{}";
      const data = JSON.parse(raw) as Record<string, unknown>;
      const serializedRow: Record<string, string> = {};
      for (const col of columns) {
        serializedRow[col] = canonicalizeValue(data[col]);
      }
      const pkString = primaryKey.map((pk) => `${pk}=${serializedRow[pk] ?? "null"}`).join("|");
      rowsByKey[pkString] = serializedRow;
    }

    tables[tableName] = {
      tableName,
      columns,
      primaryKey,
      rowsByKey,
    };
  }

  return {
    capturedAt: new Date().toISOString(),
    tables,
  };
}

/**
 * Asserts that 100% of tables, columns, rows, and field values present in `before`
 * remain identical in `after`. Additive new tables, new columns, and new rows are permitted.
 */
export function assertSnapshotPreserved(
  before: DatabaseSnapshot,
  after: DatabaseSnapshot,
): { preservedTables: number; preservedRows: number; preservedFields: number } {
  const violations: string[] = [];
  let preservedTables = 0;
  let preservedRows = 0;
  let preservedFields = 0;

  for (const [tableName, beforeTable] of Object.entries(before.tables)) {
    const afterTable = after.tables[tableName];
    if (!afterTable) {
      violations.push(`Table "${tableName}" existed before transition but was deleted.`);
      continue;
    }
    preservedTables++;

    const afterColSet = new Set(afterTable.columns);
    for (const col of beforeTable.columns) {
      if (!afterColSet.has(col)) {
        violations.push(`Column "${tableName}.${col}" existed before transition but was deleted.`);
      }
    }

    for (const [rowKey, beforeRow] of Object.entries(beforeTable.rowsByKey)) {
      const afterRow = afterTable.rowsByKey[rowKey];
      if (!afterRow) {
        violations.push(`Row [${rowKey}] in table "${tableName}" existed before transition but was deleted.`);
        continue;
      }
      preservedRows++;

      for (const col of beforeTable.columns) {
        if (!afterColSet.has(col)) continue;
        const beforeVal = beforeRow[col];
        const afterVal = afterRow[col];
        if (beforeVal !== afterVal) {
          violations.push(
            `Field "${tableName}.${col}" on row [${rowKey}] mutated from ${beforeVal} to ${afterVal}.`,
          );
        } else {
          preservedFields++;
        }
      }
    }
  }

  if (violations.length > 0) {
    throw new Error(
      `Live Full-DB Snapshot Preservation failed with ${violations.length} violation(s):\n` +
        violations.map((v) => `  - ${v}`).join("\n"),
    );
  }

  return { preservedTables, preservedRows, preservedFields };
}

/**
 * Resets the `public` schema ONLY when connected to an isolated local test database
 * (`localhost` / `127.0.0.1`) AND `ALLOW_DESTRUCTIVE_SEED=true` is explicitly set.
 */
export async function resetLocalTestSchema(
  sql: Sql,
  connectionUrl: string | undefined,
  env: NodeJS.ProcessEnv = process.env,
): Promise<void> {
  assertLocalResetAllowed(connectionUrl, env);
  await sql.unsafe("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}
