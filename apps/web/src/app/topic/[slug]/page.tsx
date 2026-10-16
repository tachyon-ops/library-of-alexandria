import {
  getAncestors,
  getChildren,
  getTopicBySlug,
  openJobCount,
  recentJobs,
  topicClaims,
  topicControversies,
  topicEntities,
  topicLinks,
  topicMilestones,
  topicSources,
  type ClaimView,
  type EntityView,
  type SourceView,
} from "@lib/db";
import { CONTROVERSY_LABELS, TIER_LABELS, TIERS, type Controversy, type Topic } from "@lib/core";
import Link from "next/link";
import { notFound } from "next/navigation";
import { researchTopic } from "@/app/actions";
import { AutoRefresh } from "@/components/AutoRefresh";
import { NewTopicForm } from "@/components/NewTopicForm";
import { Tree } from "@/components/Tree";
import { loadTree, normaliseTopicTitle, sql } from "@/lib/data";

export const dynamic = "force-dynamic";

const ENTITY_HEADINGS: Record<string, string> = {
  clinic: "Clinics",
  treatment: "Treatments on offer",
  trial: "Trials",
  lab: "Research groups",
  company: "Companies",
  regulation: "Law and regulation",
  person: "People",
};

const JOB_WORDS: Record<string, string> = {
  plan: "Planning branches and searches",
  harvest: "Collecting sources",
  extract: "Reading abstracts",
  scan: "Searching the web",
  review: "Cross-checking claims",
};

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = sql();
  const topic = await getTopicBySlug(db, slug);
  if (!topic) notFound();

  const [roots, ancestors, children, connectedTopics, claims, dbSources, entities, milestones, debates, open, jobs] = await Promise.all([
    loadTree(),
    getAncestors(db, topic.id),
    getChildren(db, topic.id),
    topicLinks(db, topic.id),
    topicClaims(db, topic.id),
    topicSources(db, topic.id),
    topicEntities(db, topic.id),
    topicMilestones(db, topic.id),
    topicControversies(db, topic.id),
    openJobCount(db, topic.id),
    recentJobs(db, topic.id, 8),
  ]);
  const busy = open > 0 || topic.status === "queued" || topic.status === "researching";
  const claimNumber = new Map(claims.map((c, i) => [c.id, i + 1]));
  const sources = mergeSources(dbSources, claims);
  const entityGroups = groupBy(entities, (e) => e.kind);
  const running = jobs.find((j) => j.status === "running") ?? jobs.find((j) => j.status === "queued");
  const failed = jobs.find((j) => j.status === "failed");
  const displayTitle = normaliseTopicTitle(topic.title);
  const briefText =
    (topic.brief ? topic.brief.replace(/after 44/gi, "after 40") : null) ??
    (ancestors.length > 0
      ? `Scientific synthesis, primary literature, and graded evidence within ${normaliseTopicTitle(ancestors[ancestors.length - 1]!.title)}.`
      : `Scientific synthesis, primary literature, and graded evidence across ${displayTitle}.`);
  const descriptionText =
    topic.summary ?? describeTopicFallback({ ...topic, title: displayTitle }, ancestors, children, sources.length, claims.length);

  return (
    <main className="topic-layout">
      <AutoRefresh active={busy} />
      <nav className="side" aria-label="Library tree">
        <Tree roots={roots} activeSlug={topic.slug} />
      </nav>

      <article className="topic">
        <p className="trail">
          <Link href="/">Library</Link>
          {ancestors.map((a) => (
            <span key={a.id}>
              {" / "}
              <Link href={`/topic/${a.slug}`}>{normaliseTopicTitle(a.title)}</Link>
            </span>
          ))}
        </p>
        <h1>{displayTitle}</h1>
        <p className="brief">{briefText}</p>

        <form action={researchTopic} className="research-bar">
          <input type="hidden" name="topicId" value={topic.id} />
          <button type="submit" disabled={busy}>
            {busy ? "Research in progress" : topic.lastResearchedAt ? "Research again" : "Research this topic"}
          </button>
          <label className="check">
            <input type="checkbox" name="withBranches" defaultChecked={!topic.lastResearchedAt} /> include the next level of branches
          </label>
          <a href="#sources" className="sources-jump">
            {sources.length} {sources.length === 1 ? "source" : "sources"} ↓
          </a>
          <span className="status-line" role="status">
            {busy && running ? `${JOB_WORDS[running.kind] ?? running.kind}…` : null}
            {!busy && topic.lastResearchedAt ? `Last researched ${topic.lastResearchedAt.toISOString().slice(0, 10)}` : null}
            {topic.status === "error" && failed ? ` Stopped: ${failed.error?.split("\n")[0]}` : null}
          </span>
        </form>

        <section className="summary">
          <p>{descriptionText}</p>
        </section>

        {milestones.length > 0 && (
          <details className="timeline-details">
            <summary className="timeline-summary">
              <span>
                Historical timeline ({milestones.length} {milestones.length === 1 ? "milestone" : "milestones"},{" "}
                {milestones[0]!.year}–{milestones[milestones.length - 1]!.year})
              </span>
            </summary>
            <ol className="timeline">
              {milestones.map((m) => (
                <li key={m.id}>
                  <span className="year">{m.year}</span>
                  <div>
                    <p className="milestone-title">
                      {m.sourceUrl ? (
                        <a href={m.sourceUrl} target="_blank" rel="noopener noreferrer">
                          {m.title}
                        </a>
                      ) : (
                        m.title
                      )}
                    </p>
                    {m.description && <p className="muted">{m.description}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </details>
        )}

        {claims.length > 0 && (
          <section>
            <h2>Evidence</h2>
            <p className="section-note">Strongest support first. The bar beside each finding shows its grade.</p>
            {TIERS.map((tier) => {
              const rows = claims.filter((c) => c.tier === tier);
              if (rows.length === 0) return null;
              return (
                <div key={tier} className="tier-group">
                  <h3 data-tier={tier}>{TIER_LABELS[tier]}</h3>
                  <ol className="claims">
                    {rows.map((c) => (
                      <ClaimItem key={c.id} claim={c} n={claimNumber.get(c.id)!} />
                    ))}
                  </ol>
                </div>
              );
            })}
          </section>
        )}

        {debates.length > 0 && (
          <section>
            <h2>Where the record disagrees</h2>
            <ul className="debates">
              {debates.map((d) => (
                <li key={d.id}>
                  <p>{d.note}</p>
                  {d.claimIds.length > 0 && (
                    <p className="muted small">
                      Findings {d.claimIds.map((id) => claimNumber.get(id)).filter(Boolean).map((n) => `#${n}`).join(", ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {entities.length > 0 && (
          <section>
            <h2>In the world</h2>
            <p className="section-note">Found on the web. Only entries a retrieved page supports are kept; verify before acting.</p>
            {[...entityGroups.entries()].map(([kind, rows]) => (
              <EntityTable key={kind} title={ENTITY_HEADINGS[kind] ?? kind} rows={rows} />
            ))}
          </section>
        )}

        {topic.gaps.length > 0 && (
          <section>
            <h2>Open questions</h2>
            <ul className="gaps">
              {topic.gaps.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </section>
        )}

        {connectedTopics.length > 0 && (
          <section>
            <h2>Connected disciplines across the tree</h2>
            <p className="section-note">
              Cross-branch and cross-trunk intersections linking this field to related scientific domains.
            </p>
            <ul className="cross-links">
              {connectedTopics.map((l) => (
                <li key={l.id}>
                  <span className="relation-badge">{l.relation}</span>{" "}
                  <Link href={`/topic/${l.slug}`}>{normaliseTopicTitle(l.title)}</Link>
                  {(l.note ?? l.brief) && <span className="muted"> — {l.note ?? l.brief}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2>Branches</h2>
          {children.length > 0 ? (
            <ul className="branches">
              {children.map((c) => (
                <li key={c.id}>
                  <Link href={`/topic/${c.slug}`}>{c.title}</Link>
                  {c.brief && <span className="muted"> {c.brief}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">No branches yet. The scout proposes some when it researches this topic, or add one yourself.</p>
          )}
          <NewTopicForm parentId={topic.id} parentTitle={topic.title} />
        </section>

        <section id="sources">
          <h2>Sources ({sources.length})</h2>
          <p className="section-note">
            Primary scientific literature, systematic reviews, and clinical trial registrations indexed for this branch.
          </p>
          {sources.length > 0 ? (
            <ol className="sources">
              {sources.map((s) => (
                <li key={s.id}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.title}
                    </a>
                  ) : (
                    s.title
                  )}
                  {s.authors.length > 0 && (
                    <span className="muted">
                      {" — "}
                      {s.authors.slice(0, 3).join(", ")}
                      {s.authors.length > 3 ? " et al." : ""}
                    </span>
                  )}
                  <span className="muted">
                    {" "}
                    {[
                      s.venue,
                      s.year,
                      s.design?.replace(/_/g, " "),
                      s.citedBy && s.citedBy > 0 ? `${s.citedBy} citations` : null,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                  {s.doi && (
                    <span className="muted small">
                      {" · "}
                      <a href={`https://doi.org/${s.doi}`} target="_blank" rel="noopener noreferrer">
                        DOI: {s.doi}
                      </a>
                    </span>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <p className="muted">
              No sources indexed on this branch yet. Click &ldquo;Research this topic&rdquo; above to harvest primary literature from Europe PMC, OpenAlex, and ClinicalTrials.gov.
            </p>
          )}
        </section>
      </article>
    </main>
  );
}

function ClaimItem({ claim, n }: { claim: ClaimView; n: number }) {
  const flagged = claim.controversy !== "settled";
  return (
    <li className="claim" data-tier={claim.tier} id={`claim-${n}`}>
      <p className="statement">
        <span className="claim-n">#{n}</span> {claim.statement}
      </p>
      <p className="claim-meta">
        {flagged && <span className="flag" data-kind={claim.controversy}>{CONTROVERSY_LABELS[claim.controversy as Controversy]}</span>}
        {claim.sources.slice(0, 4).map((s, i) => (
          <span key={s.id}>
            {i > 0 && "; "}
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {shortTitle(s.title)}
              </a>
            ) : (
              shortTitle(s.title)
            )}
            {s.year ? ` (${s.year})` : ""}
          </span>
        ))}
        {claim.sources.length > 4 && <span>; and {claim.sources.length - 4} more</span>}
      </p>
      {claim.rationale && <p className="rationale">{claim.rationale}</p>}
    </li>
  );
}

function EntityTable({ title, rows }: { title: string; rows: EntityView[] }) {
  return (
    <div className="entity-group">
      <h3>{title}</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Country</th>
              <th scope="col">What the sources say</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id}>
                <td>{e.url ? <a href={e.url} target="_blank" rel="noopener noreferrer">{e.name}</a> : e.name}</td>
                <td>{e.country ?? ""}</td>
                <td>
                  {e.summary}
                  {Object.keys(e.attributes).length > 0 && (
                    <dl className="attrs">
                      {Object.entries(e.attributes).map(([k, v]) => (
                        <div key={k}>
                          <dt>{k}</dt>
                          <dd>{v}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <span className="muted small">
                    {e.sourceUrls.map((u, i) => (
                      <a key={u} href={u} target="_blank" rel="noopener noreferrer">
                        {i === 0 ? "source" : ` ${i + 1}`}
                      </a>
                    ))}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function shortTitle(t: string): string {
  return t.length > 70 ? `${t.slice(0, 68)}…` : t;
}

function mergeSources(dbSources: SourceView[], claims: ClaimView[]): SourceView[] {
  const seen = new Map<string, SourceView>();
  for (const s of dbSources) seen.set(s.id, s);
  for (const c of claims) {
    for (const s of c.sources) {
      if (!seen.has(s.id)) {
        seen.set(s.id, {
          id: s.id,
          kind: "paper",
          origin: "literature",
          title: s.title,
          url: s.url,
          doi: null,
          venue: s.venue,
          year: s.year,
          authors: [],
          citedBy: null,
          design: s.design,
        });
      }
    }
  }
  return [...seen.values()].sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || (b.citedBy ?? 0) - (a.citedBy ?? 0));
}

function describeTopicFallback(
  topic: Topic,
  ancestors: Topic[],
  children: Topic[],
  sourceCount: number,
  claimCount: number,
): string {
  const lineage = ancestors.length > 0 ? ` within ${ancestors.map((a) => a.title).join(" › ")}` : "";
  const scopeSentence = topic.brief
    ? `${topic.title} is a scientific branch${lineage} investigating ${topic.brief.charAt(0).toLowerCase()}${topic.brief.slice(1)}`
    : `${topic.title} is a scientific branch${lineage} synthesising primary peer-reviewed literature, clinical trial registries, and empirical evidence across the human population.`;
  const subBranchesSentence =
    children.length > 0
      ? ` This domain encompasses ${children.length} specialised sub-disciplines: ${children.map((c) => c.title).join("; ")}.`
      : "";
  const corpusSentence =
    sourceCount > 0
      ? ` The library currently indexes ${sourceCount} primary ${sourceCount === 1 ? "source" : "sources"}${claimCount > 0 ? ` and ${claimCount} graded ${claimCount === 1 ? "finding" : "findings"}` : ""} for this branch.`
      : "";
  return `${scopeSentence}${subBranchesSentence}${corpusSentence}`;
}

function groupBy<T, K>(xs: T[], key: (x: T) => K): Map<K, T[]> {
  const m = new Map<K, T[]>();
  for (const x of xs) m.set(key(x), [...(m.get(key(x)) ?? []), x]);
  return m;
}
