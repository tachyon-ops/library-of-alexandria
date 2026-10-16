import postgres from "postgres";

export type Sql = postgres.Sql;

const options = { onnotice: () => {}, transform: postgres.camel } as const;

let shared: Sql | undefined;

/**
 * One pooled connection per process. Column names come back in camelCase.
 * Pass a URL to get a dedicated client (tests, scripts).
 */
export function getSql(url = process.env.DATABASE_URL): Sql {
  if (!url) throw new Error("DATABASE_URL is not set");
  if (url !== process.env.DATABASE_URL) return postgres(url, { ...options, max: 4 });
  shared ??= postgres(url, { ...options, max: 8 });
  return shared;
}
