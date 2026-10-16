import type { SourceKind, SourceRecord } from "@lib/core";

export interface SearchOptions {
  limit: number;
}

/** One origin of knowledge. Adapters are pure I/O: no database, no LLM. */
export interface SourceAdapter {
  name: string;
  kinds: SourceKind[];
  search(query: string, opts: SearchOptions): Promise<SourceRecord[]>;
}
