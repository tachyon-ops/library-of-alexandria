# Library of Alexandria (*Alexander's Library*)

> *The search for the elixir of youth — what the record actually says, and how strongly.*

![Ex Libris Bibliotheca Alexandrina (AI-generated allegorical frontispiece)](apps/web/public/archival-library.jpg)
*Fig. 1 (AI) — Ex Libris Bibliotheca Alexandrina (AI-generated allegorical frontispiece, 2026).*

**Library of Alexandria** (*Alexander's Library*) is an open-source **Tree of Knowledge** for all of humanity, filled by autonomous AI research workers.

From the oldest surviving literary poem in human history—the Sumerian *Epic of Gilgamesh*, where the king of Uruk dives into the abyss to recover the thorny plant of youth and vows to test it empirically—through the scrolls of the Royal Library of Alexandria, the House of Wisdom, the Enlightenment, and the Scientific Revolution, humanity has sought a single verifiable archive of what is known. Now, in the Information and Autonomous Intelligence Revolution, we ask in plain English and autonomous workers gather, verify, and grade the answer from humanity's scientific record.

You add a scientific discipline—*"Reproductive Medicine & Human Fertility"*, *"Cellular Senescence & Longevity Biology"*, *"Ocean Acidification"*, or any field of inquiry. Research workers search the open scientific literature, clinical trial registries, and the live web; aggregate sub-fields using **canonical scientific taxonomy (MeSH / discipline nomenclature)** across the general population; compute a deterministic evidence grade (`T1`–`T6`) in code from the study design behind each claim; and render the growing knowledge graph in an **interactive 3D Node Map**.

Frontier and minority ideas are kept and labelled, never silently filtered out. The grade tells you how much weight a claim can bear.

---

## Support the project

Building and running an open research library takes ongoing development and paid model and web-search compute for every branch explored. If this project is useful to you, please consider supporting its development and public research runs:

- **[Donate via PayPal](https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=D3J2WXTXLAWK8&source=url&ssrt=1792150968588)** — one-time or recurring contribution
- **[Sponsor on GitHub](https://github.com/sponsors/tachyon-ops)** — monthly or one-time sponsorship via GitHub Sponsors

Created and maintained by **Nuno Ribeiro** ([nuuno.art](https://nuuno.art) · [@tachyon-ops](https://github.com/tachyon-ops)).

---

## Philosophy

1. **Calibration over persuasion.** A finding is worth only as much as the evidence behind it. Study grades come from study design, computed deterministically in code (`packages/core/src/evidence.ts`), never from a model's tone or a source's confidence.
2. **Provenance is not optional.** Every claim links to the published sources that support it; every clinic, treatment, or regulation links to the retrieved web pages that describe it. What cannot be traced is dropped.
3. **The frontier belongs in the library.** Much of what is now settled was once fringe. Frontier, minority, and controversial ideas are collected, kept visible, and labelled so a reader can take an idea seriously without mistaking it for established fact.
4. **Disagreement is information.** Where sources contradict each other, the library records both sides and what evidence would settle the dispute.
5. **Marketing is not evidence.** Treatments sold ahead of their trials are flagged as `commercial_hype`.

Read the full stance in [`docs/philosophy.md`](docs/philosophy.md).

---

## How it works

```mermaid
flowchart LR
  web["Next.js front (@lib/web)"] -- "Research" --> q[("Postgres job queue")]
  q --> plan["Scout: sub-branches + queries"]
  plan --> harvest["Harvest: Europe PMC, OpenAlex, ClinicalTrials.gov"]
  plan --> scan["Web crawler: clinics, treatments, law"]
  harvest --> extract["Reader: claims, study designs, milestones"]
  extract --> review["Skeptic: merges, debates, summary"]
  scan --> graph[("Knowledge graph")]
  review --> graph
  graph --> web
```

| Job | What it does | Gemini default | Anthropic default |
| --- | --- | --- | --- |
| `plan` | Splits the topic into up to 6 sub-branches, writes literature, trial and web queries, and includes frontier angles | `gemini-3.6-flash` | `claude-sonnet-5-5` |
| `harvest` | Queries Europe PMC (most cited and recent views), OpenAlex, and ClinicalTrials.gov; deduplicates by origin ID and DOI | *none (pure HTTP)* | *none (pure HTTP)* |
| `extract` | Reads abstracts in batches of 10: extracts claims with cited source indexes, study design, sample size, and milestones | `gemini-3.6-flash` | `claude-haiku-5-5` |
| `scan` | Runs grounded web search followed by structured extraction; drops any entity whose cited URL was not returned by search | `gemini-3.6-flash` | `claude-sonnet-5-5` |
| `review` | Merges duplicate claims, recomputes tiers, relabels controversy, records debates, and writes the synthesis and open questions | `gemini-3.6-flash` | `claude-opus-5-5` |

### Evidence grades (`T1`–`T6`)

A claim's grade is computed in pure TypeScript (`packages/core/src/evidence.ts`) from its supporting sources' study designs and sample sizes:

| Grade | Study design | Rules |
| --- | --- | --- |
| **T1** | Meta-analysis, systematic review, or clinical guideline | Highest synthesis tier |
| **T2** | Randomised controlled trials (RCTs) | Requires **≥ 2 RCTs**; a single RCT or an RCT with $n < 100$ is capped at T3 |
| **T3** | Large observational study (cohort, registry, case-control) or a single RCT | Drops to T4 if stated sample size is under 100 |
| **T4** | Small studies ($n < 100$), cross-sectional studies, case series, case reports | Early clinical or descriptive evidence |
| **T5** | Animal, in vitro, cell, or computational work | Preclinical and mechanistic evidence |
| **T6** | Expert opinion, news, web pages, or unverified claims | Lowest evidentiary weight |

**Controversy labels** are tracked independently of tier: `settled`, `debated`, `contested`, `fringe`, and `commercial_hype` (marketed ahead of evidence).

---

## Architecture & monorepo layout

```text
packages/core       Pure domain types, deterministic evidence grading, DOI & slug helpers (zero I/O)
packages/db         Postgres 16 schema, SQL migrations, postgres.js repository functions, seed
packages/crawlers   Official API adapters: Europe PMC (cited + recent), OpenAlex, ClinicalTrials.gov v2
packages/agents     Llm interface (GeminiLlm + ClaudeLlm) and four roles: scout, reader, web, skeptic
apps/worker         Postgres job queue worker (continuous loop or one-shot --drain mode) and live source probe
apps/web            Next.js App Router front: knowledge tree, evidence-bar topic view, server actions
tests               Unit tests for grading and parsers + full end-to-end pipeline test on real Postgres
```

Dependency direction is strictly one-way (`core <- {db, crawlers, agents} <- worker` and `core <- db <- web`).

### Project documentation

- [`docs/philosophy.md`](docs/philosophy.md) — Mission, epistemic stance, and engineering principles
- [`docs/specs.md`](docs/specs.md) — As-built v0.1 specification and system invariants
- [`docs/roadmap.md`](docs/roadmap.md) — Milestones (`M0`–`M5`), exit criteria, and the fertility track
- [`docs/decisions.md`](docs/decisions.md) — Architecture decision records (`D-001`–`D-012`)
- [`docs/deployment.md`](docs/deployment.md) — Git workflow, CI gate, local setup, and zero-cost cloud hosting

---

## Quick start (local)

**Requirements:** Node 20+, Postgres 16 (or Docker), and a **Gemini** or **Anthropic** API key.

```bash
cp env.template .env            # set GEMINI_API_KEY (or ANTHROPIC_API_KEY) and CONTACT_EMAIL
docker compose up -d db         # starts Postgres 16 on localhost:5432
npm install
npm run db:migrate
npm run db:seed                 # optional: seeds the initial Human Fertility branch
npm run probe                   # live check of Europe PMC, OpenAlex, and ClinicalTrials.gov
npm run dev:worker              # terminal 1: continuous job queue worker (or npm run drain:worker)
npm run dev:web                 # terminal 2: Next.js front on http://localhost:3000
```

Open `http://localhost:3000` and press **"Research this topic"** on any branch. The page refreshes automatically while the workers run.

### Zero-cost cloud deployment

Library of Alexandria can also run entirely on free tiers with zero servers to maintain (**Neon Postgres 16** + **Vercel** for `apps/web` + **GitHub Actions** running `npm run drain:worker` on schedule and on demand). See [`docs/deployment.md`](docs/deployment.md) for the step-by-step setup guide.

---

## Cost control

- `MAX_LLM_CALLS_PER_DAY` pauses the worker when reached (default `400`).
- `MAX_WEB_SEARCHES_PER_JOB` caps web searches per web task (default `8`).
- `MAX_SOURCES_PER_TOPIC` caps abstracts read per research run (default `60`, i.e. 6 reader batches of 10). The most cited per year and the newest papers are read first; the rest wait for *"Research again"*.
- `AUTO_EXPAND_DEPTH` controls how many levels of sub-branches are researched automatically (default `1`). Deeper levels wait for a human click.
- Every model call is recorded in `llm_usage`; the home page displays the rolling 30-day call and search count.

---

## Verification & tests

```bash
npm run typecheck
(cd apps/web && npx tsc --noEmit)
TEST_DATABASE_URL=postgres://library:library@localhost:5432/library_test npm test
npm run build:web
```

> **Note:** The pipeline test wipes the database passed via `TEST_DATABASE_URL`; always point it at a dedicated test database (`library_test`).

---

## Author & support

Built by **Nuno Ribeiro** — [nuuno.art](https://nuuno.art) · [GitHub (@tachyon-ops)](https://github.com/tachyon-ops)

- [Donate via PayPal](https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=D3J2WXTXLAWK8&source=url&ssrt=1792150968588)
- [GitHub Sponsors](https://github.com/sponsors/tachyon-ops)

*This software organises published scientific research. It is not medical, legal, or financial advice.*

