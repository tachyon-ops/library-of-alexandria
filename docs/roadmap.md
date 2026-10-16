# Roadmap

Status as of 2026-10-16. Milestones are ordered; each has exit criteria that must be met before the next starts. Dates are not committed; the fertility track sets the pace.

## M0: Skeleton (done, v0.1)

- Monorepo: core, db, crawlers, agents, worker, web.
- Five-stage pipeline (plan, harvest, extract, scan, review) on a Postgres job queue.
- Sources: Europe PMC (most cited, newest), OpenAlex, ClinicalTrials.gov; web research through Claude web search.
- Grading T1–T6 in code; controversy labels; debates; milestones; entities.
- Next.js front: tree, topic page, add branch, research button, live refresh.
- Cost guards and usage log. 14 tests including a full pipeline run on Postgres.
- Antigravity skills, decisions log, philosophy, roadmap, specs.

Not yet verified: live source APIs and live Claude calls.

## M1: First live run (next)

Goal: the fertility branch researched end to end on real data.

1. Run `npm run probe` on the development machine; fix any parser whose fields read `0/N` (`add-source-adapter` skill).
2. Research one topic with automatic branches off; read the worker log through a full cycle.
3. Research the seeded fertility branch (root plus six children).
4. Hand-check 30 findings against their abstracts: correct statement, correct sources, correct design.
5. Record cost per topic from `llm_usage`; adjust defaults if needed (`decisions-log`).

Exit criteria: probe green for all sources; seven fertility topics `ready`; at least 90% of the hand-checked findings correct; cost per topic known.

## M2: Reading quality

Goal: findings a careful clinician would accept as accurate summaries.

- Evaluation set: the M1 hand-checked findings become a regression set; a script scores reader output against it.
- Full text for open-access papers (Europe PMC), read in sections, so numbers come from results, not abstracts.
- Retraction and correction check before a source can support a claim (Crossref metadata).
- Better design classification: sample size from full text; distinguish pilot RCTs from definitive trials.
- Claim deduplication across sibling branches with embeddings (pgvector).

Exit criteria: reader accuracy measured and above the M1 baseline; no retracted source supports a live claim.

## M3: Freshness

Goal: the library notices when the record changes.

- Scheduled re-research per topic (weekly for active branches, monthly for others).
- "What changed" view per topic: new findings, regraded findings, new trials, new debates since the last visit.
- Alerts for watched topics: a new meta-analysis, a trial starting to recruit in a chosen region, an approval or law change.
- A tree-wide milestone timeline.

Exit criteria: a change in the record appears in the front within one scheduled cycle without manual action.

## M4: Any field

Goal: branches outside medicine are graded as well as medical ones.

- Grading profiles per domain: the T1–T6 ladder is built for clinical evidence; physics, computer science, economics and history weigh evidence differently. Each profile is a pure function in core with its own tests; a topic inherits its profile from its root.
- Sources: arXiv, bioRxiv and medRxiv directly; EU Clinical Trials Register; regulators (EMA, Swissmedic); patents where relevant.
- Search across the tree; tree navigation that stays usable at thousands of topics.

Exit criteria: two non-medical root branches researched with their own grading profile and reviewed by hand.

## M5: Sharing

Goal: the library can be shown to others safely.

- Sign-in; private and shared branches; read-only public links.
- Export a topic as a document with full citations.
- Comments on findings, so a reader can dispute a summary and send it back for review.

Exit criteria: authentication in place before any public URL exists (D-009).

## Fertility track (runs alongside M1–M3)

The first branch serves a decision, so it gets extra attention:

- A comparison of European clinics for the chosen path: law, age limits, published success rates, cost, waiting time.
- Recruiting trials in Europe that match the couple's situation.
- A question list per appointment, generated from the open questions of the relevant topics.

## Open questions

- Which reader model gives the best accuracy per franc once the evaluation set exists?
- How to present a grading profile change to a reader who saw the old grades?
- Where to host: the development machine, a small VPS, or the existing AWS account?
