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
  type TopicLinkView,
} from "@lib/db";
import {
  CONTROVERSY_LABELS,
  TIER_LABELS,
  TIERS,
  type Controversy,
  type JobKind,
  type Topic,
  type TopicSynthesis,
} from "@lib/core";
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
  plan: "Planning branches & searches",
  harvest: "Harvesting literature & trials",
  extract: "Extracting findings & study designs",
  scan: "Scanning web for trials & clinics",
  review: "Synthesizing evidence & decision ledger",
};

const PIPELINE_STAGES: { kind: JobKind; label: string; description: string }[] = [
  { kind: "plan", label: "Plan", description: "Taxonomy & search queries" },
  { kind: "harvest", label: "Harvest", description: "Registries & literature" },
  { kind: "extract", label: "Read & Grade", description: "Abstracts & study designs" },
  { kind: "scan", label: "Web Scan", description: "Trials, clinics & groups" },
  { kind: "review", label: "Synthesize", description: "Skeptic review & ledger" },
];

const STAGE_ORDER: Record<string, number> = {
  plan: 0,
  harvest: 1,
  extract: 2,
  scan: 3,
  review: 4,
};

function formatTopicDate(d: Date | string | null | undefined): string | null {
  if (!d) return null;
  try {
    const date = new Date(d);
    if (isNaN(date.getTime())) return null;
    return date.toISOString().slice(0, 10);
  } catch {
    return null;
  }
}

function formatJobTime(d: Date | string | number | null | undefined): string {
  if (!d) return "";
  try {
    const date = new Date(d);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().slice(11, 19) + " UTC";
  } catch {
    return "";
  }
}

export default async function TopicPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ spawned?: string }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
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
  const claimNumber = new Map((claims ?? []).map((c, i) => [c.id, i + 1]));
  const sources = mergeSources(dbSources, claims);

  const safeEntities = (entities ?? []).map((e) => ({
    ...e,
    attributes: e.attributes && typeof e.attributes === "object" ? e.attributes : {},
    sourceUrls: Array.isArray(e.sourceUrls) ? e.sourceUrls : [],
  }));
  const entityGroups = groupBy(safeEntities, (e) => e.kind);

  const safeJobs = Array.isArray(jobs) ? jobs : [];
  const running = safeJobs.find((j) => j.status === "running") ?? safeJobs.find((j) => j.status === "queued");
  const failed = safeJobs.find((j) => j.status === "failed");
  const displayTitle = normaliseTopicTitle(topic.title);
  const briefText =
    (topic.brief ? topic.brief.replace(/after 44/gi, "after 40") : null) ??
    (ancestors.length > 0
      ? `Scientific synthesis, primary literature, and graded evidence within ${normaliseTopicTitle(ancestors[ancestors.length - 1]!.title)}.`
      : `Scientific synthesis, primary literature, and graded evidence across ${displayTitle}.`);
  const descriptionText =
    topic.summary ?? describeTopicFallback({ ...topic, title: displayTitle }, ancestors, children, sources.length, (claims ?? []).length);

  let synthesis: TopicSynthesis | null = null;
  if (typeof topic.synthesis === "string") {
    try {
      synthesis = JSON.parse(topic.synthesis);
    } catch {
      synthesis = null;
    }
  } else if (topic.synthesis && typeof topic.synthesis === "object") {
    synthesis = topic.synthesis;
  }

  const benchmarks = Array.isArray(synthesis?.benchmarks) ? synthesis.benchmarks : [];
  const levers = Array.isArray(synthesis?.levers) ? synthesis.levers : [];
  const clinicalQuestions = Array.isArray(synthesis?.clinicalQuestions) ? synthesis.clinicalQuestions : [];
  const sweepQueue = Array.isArray(synthesis?.sweepQueue) ? synthesis.sweepQueue : [];
  const leverCategories = [...new Set(levers.map((l) => l?.category).filter(Boolean))];

  const lastResearchedStr = formatTopicDate(topic.lastResearchedAt);
  const currentStageIndex = running ? (STAGE_ORDER[running.kind] ?? -1) : -1;
  const completedKinds = new Set(safeJobs.filter((j) => j.status === "done").map((j) => j.kind));

  const validMilestones = (milestones ?? []).filter((m) => m && typeof m.year === "number");
  const validDebates = (debates ?? []).map((d) => ({
    ...d,
    claimIds: Array.isArray(d.claimIds) ? d.claimIds : [],
  }));

  const isClinicalTopic =
    topic.slug.includes("medicine") ||
    topic.slug.includes("fertility") ||
    topic.slug.includes("ovarian") ||
    topic.slug.includes("endometrial") ||
    topic.slug.includes("andrology") ||
    topic.slug.includes("maternal") ||
    topic.slug.includes("gamete") ||
    topic.slug.includes("reproductive") ||
    topic.slug.includes("geroscience") ||
    topic.slug.includes("neuroscience") ||
    ancestors.some((a) => a.slug.includes("medicine") || a.slug.includes("fertility"));

  const hasIntermediateSections =
    benchmarks.length > 0 ||
    levers.length > 0 ||
    clinicalQuestions.length > 0 ||
    sweepQueue.length > 0 ||
    validMilestones.length > 0 ||
    claims.length > 0 ||
    validDebates.length > 0 ||
    safeEntities.length > 0 ||
    ((topic.gaps ?? []).length > 0 && sweepQueue.length === 0);

  const spawnedSlugs = (resolvedSearchParams?.spawned ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const treeNodeBySlug = new Map<string, { slug: string; title: string; parentTitle: string | null }>();
  const indexTreeNodes = (nodes: typeof roots, parentTitle: string | null) => {
    for (const n of nodes) {
      treeNodeBySlug.set(n.slug, { slug: n.slug, title: normaliseTopicTitle(n.title), parentTitle });
      if (Array.isArray(n.children) && n.children.length > 0) {
        indexTreeNodes(n.children, normaliseTopicTitle(n.title));
      }
    }
  };
  indexTreeNodes(roots, null);

  const spawnedBranches = spawnedSlugs
    .map((s) => treeNodeBySlug.get(s))
    .filter((n): n is { slug: string; title: string; parentTitle: string | null } => Boolean(n));

  return (
    <main className="topic-layout">
      <AutoRefresh active={busy} />
      <nav className="side" aria-label="Library tree">
        <Tree roots={roots} activeSlug={topic.slug} />
      </nav>

      <article className="topic">
        {spawnedBranches.length > 1 && (
          <section className="spawned-branches-banner" role="status" aria-label="AI tree organisation summary">
            <div className="spawned-banner-header">
              <span className="new-topic-kicker">AI Tree Organiser</span>
              <strong>
                Organised &amp; cross-linked {spawnedBranches.length} canonical branches from your inquiry
              </strong>
            </div>
            <ul className="spawned-branches-list">
              {spawnedBranches.map((b, idx) => (
                <li key={b.slug} className={b.slug === topic.slug ? "is-current" : ""}>
                  <span className="spawned-index">{idx + 1}.</span>
                  <Link href={`/topic/${b.slug}?spawned=${encodeURIComponent(spawnedSlugs.join(","))}`}>
                    {b.title}
                  </Link>
                  {b.parentTitle && <span className="muted small"> · under {b.parentTitle}</span>}
                  {b.slug === topic.slug && <span className="spawned-current-tag">viewing</span>}
                </li>
              ))}
            </ul>
          </section>
        )}
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
            {busy ? "Research in progress" : lastResearchedStr ? "Research again" : "Research this topic"}
          </button>
          <label className="check">
            <input type="checkbox" name="withBranches" defaultChecked={!lastResearchedStr} /> include the next level of branches
          </label>
          <a href="#sources" className="sources-jump">
            {sources.length} {sources.length === 1 ? "source" : "sources"} ↓
          </a>
          <span className="status-line" role="status">
            {busy && running ? `${JOB_WORDS[running.kind] ?? running.kind}…` : null}
            {!busy && lastResearchedStr ? `Last researched ${lastResearchedStr}` : null}
            {topic.status === "error" && failed ? ` Stopped: ${failed.error?.split("\n")[0]}` : null}
          </span>
        </form>

        {busy && (
          <section className="research-progress-card" aria-label="Autonomous research progress" role="status">
            <div className="research-progress-header">
              <div className="progress-status-badge">
                <span className="pulse-indicator" aria-hidden="true" />
                <strong>
                  {running ? (JOB_WORDS[running.kind] ?? `Running ${running.kind}`) : "Autonomous research in progress"}
                </strong>
              </div>
              <span className="tasks-count muted small">
                {open} {open === 1 ? "task" : "tasks"} active in queue
              </span>
            </div>

            <ol className="pipeline-stepper" aria-label="Autonomous research pipeline stages">
              {PIPELINE_STAGES.map((stage, idx) => {
                const isCurrent = running?.kind === stage.kind;
                const isDone = completedKinds.has(stage.kind) || (currentStageIndex > (STAGE_ORDER[stage.kind] ?? 99));
                const isQueued = !isCurrent && !isDone && safeJobs.some((j) => j.kind === stage.kind && j.status === "queued");
                const stageStatus = isCurrent ? "running" : isDone ? "done" : isQueued ? "queued" : "pending";

                return (
                  <li key={stage.kind} className="stepper-step" data-status={stageStatus}>
                    <div className="step-marker" aria-hidden="true">
                      {isDone ? "✓" : idx + 1}
                    </div>
                    <div className="step-info">
                      <span className="step-label">{stage.label}</span>
                      <span className="step-desc muted small">{stage.description}</span>
                    </div>
                  </li>
                );
              })}
            </ol>

            {safeJobs.length > 0 && (
              <div className="recent-jobs-stream">
                <h4 className="stream-heading small muted">Recent pipeline activity</h4>
                <ul className="activity-list small">
                  {safeJobs.slice(0, 5).map((j) => (
                    <li key={j.id} className="activity-item">
                      <span className={`job-status-tag status-${j.status}`}>{j.status}</span>
                      <span className="job-name">{JOB_WORDS[j.kind] ?? j.kind}</span>
                      {j.error && <span className="job-error-msg muted">{j.error.split("\n")[0]}</span>}
                      {j.createdAt && (
                        <time className="job-time muted">
                          {formatJobTime(j.createdAt)}
                        </time>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="auto-refresh-note muted small" style={{ margin: 0 }}>
              This page automatically refreshes as the research worker completes each stage.
            </p>
          </section>
        )}

        {topic.status === "error" && failed && (
          <section className="research-error-card" role="alert">
            <div className="error-header">
              <strong>Research paused due to an error:</strong>
            </div>
            <p className="error-message" style={{ margin: 0 }}>{failed.error?.split("\n")[0] ?? "Unknown worker error"}</p>
            <p className="muted small" style={{ margin: 0 }}>
              Check API keys or network availability, then click &ldquo;Research again&rdquo; above to retry.
            </p>
          </section>
        )}

        <section className="summary">
          <p>{descriptionText}</p>
          <NodeTopologyMap
            displayTitle={displayTitle}
            ancestors={ancestors}
            childrenNodes={children}
            associatedNodes={connectedTopics}
            showNotes={!hasIntermediateSections}
          />
        </section>

        {benchmarks.length > 0 && (
          <section className="benchmarks-section" aria-label="Baseline probability benchmarks">
            <div className="benchmarks-grid">
              {benchmarks.map((b, i) => (
                <div key={i} className="benchmark-card">
                  <span className="benchmark-metric">{b.metric}</span>
                  <p className="benchmark-label">{b.label}</p>
                  <p className="benchmark-source muted small">
                    {b.sourceUrl ? (
                      <a href={b.sourceUrl} target="_blank" rel="noopener noreferrer">
                        {b.source}
                      </a>
                    ) : (
                      b.source
                    )}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {levers.length > 0 && (
          <section className="decision-ledger-section">
            <h2>{isClinicalTopic ? "Where each lever applies" : "Where each model, theorem & mechanism applies"}</h2>
            <p className="section-note">
              {isClinicalTopic
                ? "A graded decision ledger of interventions across clinical subgroups. Each row names its best landmark evidence, measured effect, clinical reading, and epistemic verdict."
                : "A graded evaluation ledger of theoretical models, mathematical theorems, empirical mechanisms, and regime boundaries. Each row names its landmark evidence, quantitative scaling or effect, epistemic reading (including ad-hoc assumptions and breakdown limits), and verdict."}
            </p>

            <div className="verdict-legend" role="note" aria-label="Verdict legend">
              {isClinicalTopic ? (
                <>
                  <span className="verdict-tag" data-verdict="Supported">Supported: RCT live-birth gain</span>
                  <span className="verdict-tag" data-verdict="Targeted">Targeted: specific subgroup</span>
                  <span className="verdict-tag" data-verdict="Guideline">Guideline: clinical consensus</span>
                  <span className="verdict-tag" data-verdict="Weak">Weak: inconsistent/unproven gain</span>
                  <span className="verdict-tag" data-verdict="Not supported">Not supported: RCTs show no gain</span>
                  <span className="verdict-tag" data-verdict="Trial only">Trial: human trial in progress</span>
                  <span className="verdict-tag" data-verdict="Lab only">Lab: preclinical / cell dish</span>
                </>
              ) : (
                <>
                  <span className="verdict-tag" data-verdict="Supported">Supported: replicated empirical / mathematical proof</span>
                  <span className="verdict-tag" data-verdict="Targeted">Targeted: valid in bounded regime / scale</span>
                  <span className="verdict-tag" data-verdict="Guideline">Guideline: canonical law / standard framework</span>
                  <span className="verdict-tag" data-verdict="Weak">Weak: ad-hoc parameters / low-SNR / contested</span>
                  <span className="verdict-tag" data-verdict="Not supported">Not supported: falsified / null replication</span>
                  <span className="verdict-tag" data-verdict="Trial only">Trial: active experiment / sky survey</span>
                  <span className="verdict-tag" data-verdict="Lab only">Lab: theoretical / numerical simulation</span>
                </>
              )}
            </div>

            {leverCategories.map((category) => {
              const items = levers.filter((l) => l.category === category);
              return (
                <div key={category} className="ledger-category">
                  <h3 className="category-heading">{category}</h3>
                  <div className="ledger-table-wrap">
                    <table className="ledger-table">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "24%" }}>
                            {isClinicalTopic ? "Lever & Mechanism" : "Model, Theorem & Mechanism"}
                          </th>
                          <th scope="col" style={{ width: "26%" }}>
                            {isClinicalTopic ? "Best Landmark Evidence" : "Landmark Evidence & Derivation"}
                          </th>
                          <th scope="col" style={{ width: "36%" }}>
                            {isClinicalTopic ? "Measured Effect & Clinical Reading" : "Quantitative Scaling & Regime Reading"}
                          </th>
                          <th scope="col" style={{ width: "14%" }}>Verdict</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((lever, idx) => (
                          <tr key={idx} className="ledger-row">
                            <td className="lever-cell-main">
                              <strong className="lever-name">{lever.name}</strong>
                              {lever.description && <p className="lever-desc muted">{lever.description}</p>}
                            </td>
                            <td className="lever-cell-evidence">
                              <p>{lever.bestEvidence}</p>
                              {lever.sourceUrl && (
                                <p className="small">
                                  <a href={lever.sourceUrl} target="_blank" rel="noopener noreferrer">
                                    Source document →
                                  </a>
                                </p>
                              )}
                            </td>
                            <td className="lever-cell-effect">
                              <p className="lever-effect">
                                <strong>Effect:</strong> {lever.effect}
                              </p>
                              {lever.reading && (
                                <p className="lever-reading muted small">
                                  <strong>{isClinicalTopic ? "Clinical reading:" : "Epistemic & regime reading:"}</strong>{" "}
                                  {lever.reading}
                                </p>
                              )}
                            </td>
                            <td className="lever-cell-verdict">
                              <span className="verdict-tag" data-verdict={lever.verdict}>
                                {lever.verdict}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {clinicalQuestions.length > 0 && (
          <section className="clinic-questions-section">
            <h2>
              {isClinicalTopic
                ? "Questions for specialist consultations"
                : "Key theoretical, empirical & quantitative questions"}
            </h2>
            <p className="section-note">
              {isClinicalTopic
                ? "High-yield clinical and laboratory inquiries directly derived from the evidence record."
                : "High-yield research questions, regime boundary diagnostics, and quantitative tests derived from the evidence record."}
            </p>
            <ol className="clinic-questions">
              {clinicalQuestions.map((q, idx) => (
                <li key={idx}>
                  <span className="question-text">{q}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {sweepQueue.length > 0 && (
          <section className="sweep-queue-section">
            <h2>Queued for next research sweep</h2>
            <p className="section-note">
              {isClinicalTopic
                ? "Frontier clinical trials, emerging biology, and targeted subgroup outcomes tracked by the autonomous research worker."
                : "Frontier experiments, sky surveys, mathematical conjectures, and empirical replications tracked by the autonomous research worker."}
            </p>
            <ul className="sweep-queue">
              {sweepQueue.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {validMilestones.length > 0 && (
          <details className="timeline-details">
            <summary className="timeline-summary">
              <span>
                Historical timeline ({validMilestones.length} {validMilestones.length === 1 ? "milestone" : "milestones"}
                {validMilestones[0]?.year && validMilestones[validMilestones.length - 1]?.year
                  ? `, ${validMilestones[0].year}–${validMilestones[validMilestones.length - 1].year}`
                  : ""})
              </span>
            </summary>
            <ol className="timeline">
              {validMilestones.map((m) => (
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
          <details className="collapsible-section" open={levers.length === 0}>
            <summary className="section-summary">
              <span>
                Evidence by study design ({claims.length} {claims.length === 1 ? "finding" : "findings"} across T1–T6)
              </span>
            </summary>
            <p className="section-note" style={{ marginTop: "0.85rem" }}>
              Strongest support first. The bar beside each finding shows its grade.
            </p>
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
          </details>
        )}

        {validDebates.length > 0 && (
          <details className="collapsible-section">
            <summary className="section-summary">
              <span>
                Where the record disagrees ({validDebates.length} {validDebates.length === 1 ? "controversy" : "controversies"})
              </span>
            </summary>
            <ul className="debates" style={{ marginTop: "0.85rem" }}>
              {validDebates.map((d) => (
                <li key={d.id}>
                  <p>{d.note}</p>
                  {(d.claimIds ?? []).length > 0 && (
                    <p className="muted small">
                      Findings {d.claimIds.map((id) => claimNumber.get(id)).filter(Boolean).map((n) => `#${n}`).join(", ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </details>
        )}

        {safeEntities.length > 0 && (
          <details className="collapsible-section">
            <summary className="section-summary">
              <span>
                In the world ({safeEntities.length}{" "}
                {isClinicalTopic ? "clinics, treatments, and groups" : "institutes, experiments, and groups"})
              </span>
            </summary>
            <p className="section-note" style={{ marginTop: "0.85rem" }}>
              Found on the web. Only entries a retrieved page supports are kept; verify before acting.
            </p>
            {[...entityGroups.entries()].map(([kind, rows]) => (
              <EntityTable key={kind} title={ENTITY_HEADINGS[kind] ?? kind} rows={rows} />
            ))}
          </details>
        )}

        {(topic.gaps ?? []).length > 0 && sweepQueue.length === 0 && (
          <section>
            <h2>Open questions</h2>
            <ul className="gaps">
              {topic.gaps.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </section>
        )}

        {hasIntermediateSections && (
          <section className="topology-before-branches">
            <h2>Node lineage &amp; crossover disciplines</h2>
            <p className="section-note">
              Parent lineage, active node, direct child sub-branches, and associated crossover disciplines across the Tree of Knowledge.
            </p>
            <NodeTopologyMap
              displayTitle={displayTitle}
              ancestors={ancestors}
              childrenNodes={children}
              associatedNodes={connectedTopics}
              showNotes
            />
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
            <p className="muted">
              No sub-branches yet. Autonomous research agents and the AI tree organiser spawn canonical sub-disciplines here when needed.
            </p>
          )}
          <NewTopicForm parentId={topic.id} parentTitle={displayTitle} />
        </section>

        <details id="sources" className="collapsible-section">
          <summary className="section-summary">
            <span>Primary indexed sources ({sources.length})</span>
          </summary>
          <p className="section-note" style={{ marginTop: "0.85rem" }}>
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
                  {(s.authors ?? []).length > 0 && (
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
        </details>
      </article>
    </main>
  );
}

function ClaimItem({ claim, n }: { claim: ClaimView; n: number }) {
  const flagged = claim.controversy !== "settled";
  const claimSources = Array.isArray(claim.sources) ? claim.sources : [];
  return (
    <li className="claim" data-tier={claim.tier} id={`claim-${n}`}>
      <p className="statement">
        <span className="claim-n">#{n}</span> {claim.statement}
      </p>
      <p className="claim-meta">
        {flagged && <span className="flag" data-kind={claim.controversy}>{CONTROVERSY_LABELS[claim.controversy as Controversy]}</span>}
        {claimSources.slice(0, 4).map((s, i) => (
          <span key={s.id}>
            {i > 0 && "; "}
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {shortTitle(s.title ?? "Source")}
              </a>
            ) : (
              shortTitle(s.title ?? "Source")
            )}
            {s.year ? ` (${s.year})` : ""}
          </span>
        ))}
        {claimSources.length > 4 && <span>; and {claimSources.length - 4} more</span>}
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
            {rows.map((e) => {
              const attrs = e.attributes && typeof e.attributes === "object" ? Object.entries(e.attributes) : [];
              const sourceUrls = Array.isArray(e.sourceUrls) ? e.sourceUrls : [];
              return (
                <tr key={e.id}>
                  <td>{e.url ? <a href={e.url} target="_blank" rel="noopener noreferrer">{e.name}</a> : e.name}</td>
                  <td>{e.country ?? ""}</td>
                  <td>
                    {e.summary}
                    {attrs.length > 0 && (
                      <dl className="attrs">
                        {attrs.map(([k, v]) => (
                          <div key={k}>
                            <dt>{k}</dt>
                            <dd>{String(v)}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    <span className="muted small">
                      {sourceUrls.map((u, i) => (
                        <a key={u} href={u} target="_blank" rel="noopener noreferrer">
                          {i === 0 ? "source" : ` ${i + 1}`}
                        </a>
                      ))}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function shortTitle(t: string): string {
  return t.length > 70 ? `${t.slice(0, 68)}…` : t;
}

function mergeSources(dbSources: SourceView[] = [], claims: ClaimView[] = []): SourceView[] {
  const seen = new Map<string, SourceView>();
  for (const s of dbSources ?? []) {
    if (s?.id) seen.set(s.id, s);
  }
  for (const c of claims ?? []) {
    if (!Array.isArray(c?.sources)) continue;
    for (const s of c.sources) {
      if (s?.id && !seen.has(s.id)) {
        seen.set(s.id, {
          id: s.id,
          kind: "paper",
          origin: "literature",
          title: s.title ?? "Untitled",
          url: s.url ?? null,
          doi: null,
          venue: s.venue ?? null,
          year: s.year ?? null,
          authors: [],
          citedBy: null,
          design: s.design ?? null,
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

function NodeTopologyMap({
  displayTitle,
  ancestors,
  childrenNodes,
  associatedNodes,
  showNotes = false,
}: {
  displayTitle: string;
  ancestors: Topic[];
  childrenNodes: Topic[];
  associatedNodes: TopicLinkView[];
  showNotes?: boolean;
}) {
  return (
    <div className="node-topology-map" role="region" aria-label="Node hierarchy and crossover map">
      <div className="node-map-row">
        <span className="node-map-label">Hierarchy:</span>
        <div className="node-map-flow">
          {ancestors.length > 0 ? (
            ancestors.map((a) => (
              <span key={a.id} className="node-map-step">
                <Link href={`/topic/${a.slug}`} className="node-map-pill node-map-parent" title="Parent discipline">
                  {normaliseTopicTitle(a.title)}
                </Link>
                <span className="node-map-arrow" aria-hidden="true">
                  →
                </span>
              </span>
            ))
          ) : (
            <span className="node-map-step">
              <Link href="/" className="node-map-pill node-map-parent" title="Root of the Tree of Knowledge">
                Tree of Knowledge (Root)
              </Link>
              <span className="node-map-arrow" aria-hidden="true">
                →
              </span>
            </span>
          )}
          <span className="node-map-pill node-map-self" aria-current="page">
            {displayTitle}
          </span>
          <span className="node-map-arrow" aria-hidden="true">
            →
          </span>
          {childrenNodes.length > 0 ? (
            <span className="node-map-children">
              {childrenNodes.map((c) => (
                <Link key={c.id} href={`/topic/${c.slug}`} className="node-map-pill node-map-child" title={c.brief ?? "Child sub-discipline"}>
                  {normaliseTopicTitle(c.title)}
                </Link>
              ))}
            </span>
          ) : (
            <span className="node-map-empty muted small">Leaf node (no child sub-branches yet)</span>
          )}
        </div>
      </div>

      <div className="node-map-row node-map-crossovers">
        <span className="node-map-label">+ Associated nodes:</span>
        {associatedNodes.length > 0 ? (
          <div className="node-map-assoc-wrap">
            <div className="node-map-flow">
              {associatedNodes.map((l) => (
                <Link
                  key={l.id}
                  href={`/topic/${l.slug}`}
                  className="node-map-pill node-map-assoc"
                  title={l.note ?? l.brief ?? l.relation}
                >
                  <span className="node-map-plus" aria-hidden="true">
                    +
                  </span>{" "}
                  {normaliseTopicTitle(l.title)}{" "}
                  <span className="node-map-rel">({l.relation})</span>
                </Link>
              ))}
            </div>
            {showNotes && (
              <ul className="cross-links node-map-notes">
                {associatedNodes.map((l) => (
                  <li key={l.id}>
                    <span className="relation-badge">+ {l.relation}</span>{" "}
                    <Link href={`/topic/${l.slug}`}>{normaliseTopicTitle(l.title)}</Link>
                    {(l.note ?? l.brief) && <span className="muted"> — {l.note ?? l.brief}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <span className="node-map-empty muted small">No cross-branch associations recorded yet</span>
        )}
      </div>
    </div>
  );
}
