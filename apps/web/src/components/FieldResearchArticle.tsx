import type { FieldResearchMonograph } from "@lib/core";

export function FieldResearchArticle({
  monograph,
  sourcesCount,
  claimsCount,
}: {
  monograph: FieldResearchMonograph;
  sourcesCount: number;
  claimsCount: number;
}) {
  const { charts, featuredStudies } = monograph;
  const activeTiers = charts.tierDistribution.filter((t) => t.count > 0);
  const hasYearData = charts.yearHistogram.some((y) => y.count > 0);
  const totalConsensus =
    charts.settledCount + charts.debatedCount + charts.frontierCount;

  return (
    <section
      className="field-article"
      aria-label="State of the field research article"
    >
      <header className="field-article-header">
        <div className="field-article-meta">
          <span
            className={`field-article-badge${monograph.isLiveDispatch ? " is-live" : ""}`}
          >
            {monograph.isLiveDispatch && (
              <span className="pulse-indicator" aria-hidden="true" />
            )}
            {monograph.editionBadge}
          </span>
          <span className="muted small">
            {monograph.readingMinutes} min read · {sourcesCount}{" "}
            {sourcesCount === 1 ? "source" : "sources"} · {claimsCount}{" "}
            {claimsCount === 1 ? "graded finding" : "graded findings"}
          </span>
          {monograph.bestTier && (
            <span
              className="search-tier-pill"
              data-tier={monograph.bestTier}
            >
              Peak certainty: {monograph.bestTier}
            </span>
          )}
        </div>

        <h2 className="field-article-title">{monograph.title}</h2>
        <p className="field-article-subtitle">{monograph.subtitle}</p>
      </header>

      {/* Executive Synopsis */}
      <div className="field-article-synopsis" role="region" aria-label="Article synopsis">
        <span className="field-article-kicker">Synopsis · Executive Overview</span>
        <p className="field-article-lead">{monograph.synopsis}</p>
      </div>

      {/* Blog / Field Guide Section Jump Bar */}
      {monograph.sections.length > 1 && (
        <nav className="field-article-toc" aria-label="In this field guide">
          <span className="field-article-toc-label">In this field guide:</span>
          <ol className="field-article-toc-list">
            {monograph.sections.map((section, idx) => (
              <li key={idx}>
                <a href={`#article-section-${idx + 1}`}>{section.heading}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Editorial Narrative Sections */}
      <div className="field-article-body">
        {monograph.sections.map((section, idx) => (
          <section
            key={idx}
            id={`article-section-${idx + 1}`}
            className="field-article-section"
          >
            {section.kicker && (
              <span className="field-article-kicker">{section.kicker}</span>
            )}
            <h3>{section.heading}</h3>
            <div className="field-article-prose">
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="field-article-bullets">
                  {section.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
            {section.callout && (
              <aside className="field-article-callout">{section.callout}</aside>
            )}
          </section>
        ))}
      </div>

      {/* Figure 1: Evidence Architecture, Study Designs & Publication Velocity */}
      {(activeTiers.length > 0 || charts.designBreakdown.length > 0 || hasYearData) && (
        <figure className="field-article-figure">
          <div className="figure-grid">
            {/* Panel A: Evidence Tier Distribution */}
            <div className="figure-panel">
              <h3 className="figure-panel-title">
                Evidence Hierarchy ({charts.tierSourceBasis === "claims" ? "Graded Claims" : "Indexed Sources"})
              </h3>
              <ul className="tier-bar-chart" aria-label="Evidence tier distribution">
                {charts.tierDistribution.map((row) => (
                  <li key={row.tier} className="tier-bar-row" data-tier={row.tier}>
                    <div className="tier-bar-label">
                      <span className="tier-code">{row.tier}</span>
                      <span className="tier-name muted small">{row.label}</span>
                    </div>
                    <div className="tier-bar-track" aria-hidden="true">
                      <div
                        className="tier-bar-fill"
                        data-tier={row.tier}
                        style={{ width: `${row.count > 0 ? Math.max(6, row.percentage) : 0}%` }}
                      />
                    </div>
                    <span className="tier-bar-value small">
                      {row.count} <span className="muted">({row.percentage}%)</span>
                    </span>
                  </li>
                ))}
              </ul>

              {totalConsensus > 0 && (
                <div className="consensus-meter-block">
                  <div className="consensus-meter-labels small">
                    <span>
                      <strong>{charts.settledCount}</strong> settled
                    </span>
                    <span>
                      <strong>{charts.debatedCount}</strong> debated
                    </span>
                    <span>
                      <strong>{charts.frontierCount}</strong> contested / frontier
                    </span>
                  </div>
                  <div className="consensus-meter-track" aria-hidden="true">
                    {charts.settledCount > 0 && (
                      <span
                        className="consensus-seg is-settled"
                        style={{ width: `${(charts.settledCount / totalConsensus) * 100}%` }}
                      />
                    )}
                    {charts.debatedCount > 0 && (
                      <span
                        className="consensus-seg is-debated"
                        style={{ width: `${(charts.debatedCount / totalConsensus) * 100}%` }}
                      />
                    )}
                    {charts.frontierCount > 0 && (
                      <span
                        className="consensus-seg is-frontier"
                        style={{ width: `${(charts.frontierCount / totalConsensus) * 100}%` }}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Panel B: Study Design Breakdown & Publication Velocity Histogram */}
            <div className="figure-panel">
              {charts.designBreakdown.length > 0 && (
                <div className="design-breakdown-block">
                  <h3 className="figure-panel-title">Study Designs in Indexed Literature</h3>
                  <ul className="design-bar-list">
                    {charts.designBreakdown.map((d) => (
                      <li key={d.category} className="design-bar-item">
                        <div className="design-bar-top small">
                          <span>{d.category}</span>
                          <span className="muted">
                            {d.count} ({d.percentage}%)
                          </span>
                        </div>
                        <div className="tier-bar-track" aria-hidden="true">
                          <div
                            className="tier-bar-fill"
                            data-tier={d.tier}
                            style={{ width: `${Math.max(6, d.percentage)}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {hasYearData && (
                <div className="year-histogram-block">
                  <h3 className="figure-panel-title">Publication Timeline Velocity</h3>
                  <div className="year-histogram" role="img" aria-label="Publications by period">
                    {charts.yearHistogram.map((y) => (
                      <div key={y.bucket} className="year-col">
                        <span className="year-col-count small muted">{y.count}</span>
                        <div className="year-col-track" aria-hidden="true">
                          <div
                            className="year-col-bar"
                            style={{ height: `${y.count > 0 ? Math.max(10, y.percentage) : 2}%` }}
                          />
                        </div>
                        <span className="year-col-label small">{y.bucket}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <figcaption className="figure-caption muted small">
            <strong>Fig. 1 — Field Evidence Architecture &amp; Publication Trajectory.</strong>{" "}
            Distribution of methodological study designs ({sourcesCount} indexed publications) and{" "}
            {claimsCount > 0
              ? `${claimsCount} extracted claims graded from T1 (meta-analyses and guidelines) to T6.`
              : "preliminary study-design stratification across harvested literature."}
          </figcaption>
        </figure>
      )}

      {/* Figure 2: Quantitative Verdict Profile & Effect-Size Matrix when levers exist */}
      {charts.verdictProfile.length > 0 && (
        <figure className="field-article-figure">
          <h3 className="figure-panel-title">
            Epistemic Verdict Distribution Across Evaluated Levers &amp; Mechanisms ({monograph.levers.length})
          </h3>
          <div className="verdict-chart-grid">
            {charts.verdictProfile.map((v) => (
              <div key={v.verdict} className="verdict-chart-card">
                <div className="verdict-chart-top">
                  <span className="verdict-tag" data-verdict={v.verdict}>
                    {v.verdict}
                  </span>
                  <strong className="verdict-chart-count">
                    {v.count} {v.count === 1 ? "lever" : "levers"} ({v.percentage}%)
                  </strong>
                </div>
                <div className="tier-bar-track" aria-hidden="true">
                  <div
                    className="verdict-bar-fill"
                    data-verdict={v.verdict}
                    style={{ width: `${Math.max(8, v.percentage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <figcaption className="figure-caption muted small">
            <strong>Fig. 2 — Intervention &amp; Mechanism Epistemic Calibration.</strong>{" "}
            Proportion of evaluated clinical interventions or theoretical models supported by replicated trials versus subgroup-specific or experimental evidence.
          </figcaption>
        </figure>
      )}

      {/* Featured Landmark Studies & Primary Citations */}
      {featuredStudies.length > 0 && (
        <section className="field-article-studies" aria-label="Featured studies and citations">
          <span className="field-article-kicker">Primary Citations &amp; Landmark Studies</span>
          <h3>Key Studies Anchoring This Monograph</h3>
          <div className="featured-studies-grid">
            {featuredStudies.map((st) => (
              <article key={st.id} className="featured-study-card" data-tier={st.tier}>
                <div className="featured-study-meta small">
                  <span className="study-cite-num">[{st.citationNumber}]</span>
                  <span className="search-tier-pill" data-tier={st.tier}>
                    {st.tier} · {st.designLabel}
                  </span>
                  {st.citedBy != null && st.citedBy > 0 && (
                    <span className="muted">{st.citedBy} citations</span>
                  )}
                </div>
                <h4 className="featured-study-title">
                  {st.url ? (
                    <a href={st.url} target="_blank" rel="noopener noreferrer">
                      {st.title}
                    </a>
                  ) : (
                    st.title
                  )}
                </h4>
                <p className="featured-study-biblio muted small">
                  {st.authorsLabel}
                  {st.venue ? ` · ${st.venue}` : ""}
                  {st.year ? ` (${st.year})` : ""}
                  {st.doi && (
                    <>
                      {" · "}
                      <a
                        href={`https://doi.org/${st.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        DOI: {st.doi}
                      </a>
                    </>
                  )}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Conclusions & Key Takeaways */}
      <footer className="field-article-conclusions">
        <div className="conclusions-prose">
          <span className="field-article-kicker">Synthesis &amp; Conclusions</span>
          <h3>State of the Field Conclusions</h3>
          <p>{monograph.conclusions}</p>
        </div>

        {monograph.keyTakeaways.length > 0 && (
          <div className="takeaways-box">
            <h4>Key Quantitative Takeaways</h4>
            <ul className="takeaways-list">
              {monograph.keyTakeaways.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </footer>
    </section>
  );
}
