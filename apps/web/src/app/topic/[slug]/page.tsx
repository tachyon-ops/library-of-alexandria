import {
  getAncestors,
  getChildren,
  getTopicBySlug,
  openJobCount,
  recentJobs,
  topicClaims,
  topicControversies,
  topicEntities,
  topicMilestones,
  type ClaimView,
  type EntityView,
} from "@lib/db";
import { CONTROVERSY_LABELS, TIER_LABELS, TIERS, type Controversy } from "@lib/core";
import Link from "next/link";
import { notFound } from "next/navigation";
import { researchTopic } from "@/app/actions";
import { AutoRefresh } from "@/components/AutoRefresh";
import { NewTopicForm } from "@/components/NewTopicForm";
import { Tree } from "@/components/Tree";
import { loadTree, sql } from "@/lib/data";

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

  const [roots, ancestors, children, claims, entities, milestones, debates, open, jobs] = await Promise.all([
    loadTree(),
    getAncestors(db, topic.id),
    getChildren(db, topic.id),
    topicClaims(db, topic.id),
    topicEntities(db, topic.id),
    topicMilestones(db, topic.id),
    topicControversies(db, topic.id),
    openJobCount(db, topic.id),
    recentJobs(db, topic.id, 8),
  ]);
  const busy = open > 0 || topic.status === "queued" || topic.status === "researching";
  const claimNumber = new Map(claims.map((c, i) => [c.id, i + 1]));
  const sources = uniqueSources(claims);
  const entityGroups = groupBy(entities, (e) => e.kind);
  const running = jobs.find((j) => j.status === "running") ?? jobs.find((j) => j.status === "queued");
  const failed = jobs.find((j) => j.status === "failed");

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
              <Link href={`/topic/${a.slug}`}>{a.title}</Link>
            </span>
          ))}
        </p>
        <h1>{topic.title}</h1>
        {topic.brief && <p className="brief">{topic.brief}</p>}

        <form action={researchTopic} className="research-bar">
          <input type="hidden" name="topicId" value={topic.id} />
          <button type="submit" disabled={busy}>
            {busy ? "Research in progress" : topic.lastResearchedAt ? "Research again" : "Research this topic"}
          </button>
          <label className="check">
            <input type="checkbox" name="withBranches" defaultChecked={!topic.lastResearchedAt} /> include the next level of branches
          </label>
          <span className="status-line" role="status">
            {busy && running ? `${JOB_WORDS[running.kind] ?? running.kind}…` : null}
            {!busy && topic.lastResearchedAt ? `Last researched ${topic.lastResearchedAt.toISOString().slice(0, 10)}` : null}
            {topic.status === "error" && failed ? ` Stopped: ${failed.error?.split("\n")[0]}` : null}
          </span>
        </form>

        {topic.summary ? (
          <section className="summary">
            <p>{topic.summary}</p>
          </section>
        ) : (
          !busy && <p className="empty">Nothing has been read on this topic yet. Start research to fill it.</p>
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

        {milestones.length > 0 && (
          <section>
            <h2>Milestones</h2>
            <ol className="timeline">
              {milestones.map((m) => (
                <li key={m.id}>
                  <span className="year">{m.year}</span>
                  <div>
                    <p className="milestone-title">
                      {m.sourceUrl ? <a href={m.sourceUrl}>{m.title}</a> : m.title}
                    </p>
                    {m.description && <p className="muted">{m.description}</p>}
                  </div>
                </li>
              ))}
            </ol>
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

        {sources.length > 0 && (
          <section>
            <h2>Sources read ({sources.length})</h2>
            <ol className="sources">
              {sources.map((s) => (
                <li key={s.id}>
                  {s.url ? <a href={s.url}>{s.title}</a> : s.title}
                  <span className="muted">
                    {" "}
                    {[s.venue, s.year, s.design?.replace(/_/g, " ")].filter(Boolean).join(", ")}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}
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
            {s.url ? <a href={s.url}>{shortTitle(s.title)}</a> : shortTitle(s.title)}
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
                <td>{e.url ? <a href={e.url}>{e.name}</a> : e.name}</td>
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
                      <a key={u} href={u}>
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

function uniqueSources(claims: ClaimView[]) {
  const seen = new Map<string, ClaimView["sources"][number]>();
  for (const c of claims) for (const s of c.sources) if (!seen.has(s.id)) seen.set(s.id, s);
  return [...seen.values()].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}

function groupBy<T, K>(xs: T[], key: (x: T) => K): Map<K, T[]> {
  const m = new Map<K, T[]>();
  for (const x of xs) m.set(key(x), [...(m.get(key(x)) ?? []), x]);
  return m;
}
