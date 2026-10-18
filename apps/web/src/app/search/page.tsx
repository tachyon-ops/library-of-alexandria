import {
  CONTROVERSY_LABELS,
  TIER_LABELS,
  synthesizeSearchBriefing,
  type Controversy,
  type LibrarySearchResults,
  type SearchTreeNode,
} from "@lib/core";
import { listTree, searchLibrary } from "@lib/db";
import Link from "next/link";
import { startTopic } from "@/app/actions";
import { LibrarySearchForm } from "@/components/LibrarySearchForm";
import { normaliseTopicTitle, sql } from "@/lib/data";

export const dynamic = "force-dynamic";

function parseJsonArray<T>(val: unknown): T[] {
  if (Array.isArray(val)) return val as T[];
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch {
      return [];
    }
  }
  return [];
}

function buildOrderedTreeOptions(nodes: SearchTreeNode[]): { id: string; label: string; depth: number }[] {
  const byParent = new Map<string | null, SearchTreeNode[]>();
  for (const n of nodes) {
    const list = byParent.get(n.parentId) ?? [];
    list.push(n);
    byParent.set(n.parentId, list);
  }
  const out: { id: string; label: string; depth: number }[] = [];
  function walk(parentId: string | null, depth: number) {
    if (depth >= 5) return;
    const children = byParent.get(parentId) ?? [];
    for (const child of children) {
      const prefix = depth > 0 ? `${"— ".repeat(depth)}` : "";
      out.push({ id: child.id, label: `${prefix}${child.title}`, depth });
      walk(child.id, depth + 1);
    }
  }
  walk(null, 0);
  return out;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const db = sql();

  const [rawTree, rawResults] = await Promise.all([
    listTree(db),
    query ? searchLibrary(db, query, 24) : Promise.resolve(null),
  ]);

  const treeNodes: SearchTreeNode[] = rawTree.map((r) => ({
    id: r.id,
    parentId: r.parentId,
    slug: r.slug,
    title: normaliseTopicTitle(r.title),
    brief: r.brief ? r.brief.replace(/after 44/gi, "after 40") : null,
    depth: r.depth,
  }));

  const treeOptions = buildOrderedTreeOptions(treeNodes);

  const results: LibrarySearchResults | null = rawResults
    ? {
        ...rawResults,
        topics: rawResults.topics.map((t) => ({
          ...t,
          title: normaliseTopicTitle(t.title),
          brief: t.brief ? t.brief.replace(/after 44/gi, "after 40") : null,
        })),
        claims: rawResults.claims.map((c) => ({
          ...c,
          topicTitle: normaliseTopicTitle(c.topicTitle),
          sources: parseJsonArray(c.sources),
        })),
        sources: rawResults.sources.map((s) => ({
          ...s,
          topics: parseJsonArray<{ slug: string; title: string }>(s.topics).map((t) => ({
            ...t,
            title: normaliseTopicTitle(t.title),
          })),
        })),
        entities: rawResults.entities.map((e) => ({
          ...e,
          topicTitle: normaliseTopicTitle(e.topicTitle),
        })),
      }
    : null;

  const synthesis = results && query ? synthesizeSearchBriefing(query, results, treeNodes) : null;

  return (
    <main className="search-page">
      <p className="trail">
        <Link href="/">Library</Link>
        <span> / Search &amp; Research Inquiry</span>
      </p>

      <header className="search-header">
        <h1>Search the Scientific Record</h1>
        <p className="brief">
          Query graded findings, peer-reviewed papers, clinical trials, and decision ledgers across the archive — or
          spawn a new autonomous research branch for any unexplored question.
        </p>
      </header>

      <LibrarySearchForm variant="hero" defaultQuery={query} />

      {synthesis && results && (
        <div className="search-results-grid">
          <div className="search-main-col">
            <section
              className="search-briefing"
              data-tier={synthesis.bestTier ?? undefined}
              aria-label="Synthesised library briefing"
            >
              <div className="search-briefing-meta" role="status">
                {synthesis.bestTier && (
                  <span className="tier-tag">
                    {synthesis.bestTier} · {TIER_LABELS[synthesis.bestTier]}
                  </span>
                )}
                <span className="search-headline muted small">{synthesis.headline}</span>
              </div>

              <h2>Grounded synthesis for &ldquo;{query}&rdquo;</h2>

              <div className="search-briefing-prose">
                {synthesis.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {synthesis.matchedLevers.length > 0 && (
                <div className="search-levers-block">
                  <h3>Matched interventions in the Evaluated Decision Ledger</h3>
                  <div className="table-scroll">
                    <table className="ledger-table">
                      <thead>
                        <tr>
                          <th scope="col">Intervention / Lever</th>
                          <th scope="col">Verdict</th>
                          <th scope="col">Best evidence &amp; measured effect</th>
                          <th scope="col">Discipline</th>
                        </tr>
                      </thead>
                      <tbody>
                        {synthesis.matchedLevers.map((lever, idx) => (
                          <tr key={`${lever.name}-${idx}`}>
                            <td>
                              <strong>{lever.name}</strong>
                              <span className="lever-desc muted small">{lever.description}</span>
                            </td>
                            <td>
                              <span className="verdict-badge" data-verdict={lever.verdict}>
                                {lever.verdict}
                              </span>
                            </td>
                            <td className="small">
                              <strong>{lever.effect}</strong>
                              <span className="lever-desc muted">{lever.bestEvidence}</span>
                            </td>
                            <td className="small">
                              <Link href={`/topic/${lever.topicSlug}`}>{lever.topicTitle}</Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {synthesis.citations.length > 0 && (
                <footer className="search-citations">
                  <h3 className="small muted">Cited records in this briefing</h3>
                  <ol className="search-citation-list small">
                    {synthesis.citations.map((cit) => (
                      <li key={cit.index} value={cit.index}>
                        {cit.isInternal ? (
                          <Link href={cit.url}>{cit.label}</Link>
                        ) : (
                          <a href={cit.url} target="_blank" rel="noopener noreferrer">
                            {cit.label}
                          </a>
                        )}
                        {cit.meta && <span className="muted"> — {cit.meta}</span>}
                      </li>
                    ))}
                  </ol>
                </footer>
              )}
            </section>

            {results.claims.length > 0 && (
              <section className="search-section" aria-label="Matched graded findings">
                <h2>Graded findings ({results.claims.length})</h2>
                <ul className="claims">
                  {results.claims.map((c) => (
                    <li key={c.id} className="claim" data-tier={c.tier}>
                      <div className="claim-head">
                        <span className="tier-tag">
                          {c.tier} · {TIER_LABELS[c.tier]}
                        </span>
                        {c.controversy !== "settled" && (
                          <span className="flag" data-kind={c.controversy}>
                            {CONTROVERSY_LABELS[c.controversy as Controversy] ?? c.controversy}
                          </span>
                        )}
                        <Link href={`/topic/${c.topicSlug}`} className="search-claim-topic small">
                          {c.topicTitle} →
                        </Link>
                      </div>
                      <p className="claim-statement">{c.statement}</p>
                      {c.rationale && <p className="claim-rationale muted small">{c.rationale}</p>}
                      {c.sources.length > 0 && (
                        <ul className="claim-sources small muted">
                          {c.sources.map((s) => (
                            <li key={s.id}>
                              {s.url ? (
                                <a href={s.url} target="_blank" rel="noopener noreferrer">
                                  {s.title}
                                </a>
                              ) : (
                                s.title
                              )}
                              {s.venue || s.year || s.design
                                ? ` (${[s.venue, s.year, s.design?.replace(/_/g, " ")].filter(Boolean).join(", ")})`
                                : ""}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {results.sources.length > 0 && (
              <section className="search-section" aria-label="Matched papers and clinical trials">
                <h2>Papers, preprints &amp; clinical trials ({results.sources.length})</h2>
                <ol className="sources search-sources-list">
                  {results.sources.map((s) => (
                    <li key={s.id} className="search-source-item">
                      <div className="search-source-main">
                        {s.url ? (
                          <a href={s.url} target="_blank" rel="noopener noreferrer" className="search-source-title">
                            {s.title}
                          </a>
                        ) : (
                          <span className="search-source-title">{s.title}</span>
                        )}
                        <span className="muted small">
                          {" — "}
                          {[
                            s.authors?.slice(0, 3).join(", "),
                            s.venue,
                            s.year,
                            s.design ? String(s.design).replace(/_/g, " ") : null,
                            s.citedBy ? `${s.citedBy} citations` : null,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </span>
                      </div>
                      {s.abstract && (
                        <p className="search-source-abstract muted small">
                          {s.abstract.length > 280 ? `${s.abstract.slice(0, 280)}…` : s.abstract}
                        </p>
                      )}
                      {s.topics.length > 0 && (
                        <div className="search-source-topics small">
                          <span className="muted">Indexed in: </span>
                          {s.topics.map((t, idx) => (
                            <span key={t.slug}>
                              {idx > 0 && " · "}
                              <Link href={`/topic/${t.slug}`}>{t.title}</Link>
                            </span>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {(results.topics.length > 0 || results.entities.length > 0) && (
              <section className="search-section" aria-label="Matched disciplines and entities">
                <h2>Disciplines &amp; indexed entities</h2>
                {results.topics.length > 0 && (
                  <ul className="search-topics-list">
                    {results.topics.map((t) => (
                      <li key={t.id} className="search-topic-card">
                        <div className="search-topic-row">
                          <Link href={`/topic/${t.slug}`} className="search-topic-link">
                            {t.title}
                          </Link>
                          <span className="muted small">{t.claimCount} findings</span>
                        </div>
                        {t.brief && <p className="muted small">{t.brief}</p>}
                      </li>
                    ))}
                  </ul>
                )}
                {results.entities.length > 0 && (
                  <ul className="entity-list search-entities-list">
                    {results.entities.map((e) => (
                      <li key={e.id}>
                        <strong>{e.url ? <a href={e.url} target="_blank" rel="noopener noreferrer">{e.name}</a> : e.name}</strong>
                        {e.country && <span className="muted"> · {e.country}</span>}
                        <span className="muted small"> ({e.kind})</span>
                        {e.summary && <p className="small">{e.summary}</p>}
                        <p className="small muted">
                          Branch: <Link href={`/topic/${e.topicSlug}`}>{e.topicTitle}</Link>
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}
          </div>

          <aside className="search-side-col">
            <section className="search-branch-card" aria-label="Spawn a new research branch">
              <h2>
                {synthesis.coverageStatus === "unexplored"
                  ? "Spawn this research branch"
                  : "Go deeper: spawn a sub-branch"}
              </h2>
              <p className="muted small">
                {synthesis.coverageStatus === "unexplored"
                  ? "This topic is not in the archive yet. Create a branch to dispatch the autonomous scout, literature harvesters, reader, and skeptic workers."
                  : "Want dedicated literature harvesting and clinical trial scanning specifically on this angle? Queue a new sub-branch in the Tree of Knowledge."}
              </p>

              <form action={startTopic} className="new-topic search-spawn-form">
                <label htmlFor="spawn-title">
                  <span>Proposed branch title</span>
                  <input
                    id="spawn-title"
                    name="title"
                    required
                    defaultValue={synthesis.suggestedBranch.title}
                  />
                </label>

                <label htmlFor="spawn-parent">
                  <span>Place under discipline</span>
                  <select
                    id="spawn-parent"
                    name="parentId"
                    defaultValue={synthesis.suggestedBranch.parentId ?? ""}
                  >
                    <option value="">Root of the Tree of Knowledge (new top-level trunk)</option>
                    {treeOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
                <p className="muted small spawn-reason">{synthesis.suggestedBranch.reason}</p>

                <label htmlFor="spawn-brief">
                  <span>Research brief for autonomous workers</span>
                  <textarea
                    id="spawn-brief"
                    name="brief"
                    rows={3}
                    defaultValue={synthesis.suggestedBranch.brief}
                  />
                </label>

                <div className="form-row">
                  <label className="check">
                    <input type="checkbox" name="research" defaultChecked /> Start research now
                  </label>
                  <button type="submit">Create &amp; research branch</button>
                </div>
              </form>
            </section>
          </aside>
        </div>
      )}
    </main>
  );
}
