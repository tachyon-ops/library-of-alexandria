# Alexander's Library

A tree of knowledge filled by AI research workers. You add a branch ("Human fertility", "Ocean acidification", anything). The workers then search the open literature, trial registries and the web. They extract findings, grade each one by the design of the studies behind it, and flag what is contested, fringe or marketed ahead of evidence. The Next.js front shows the tree, the findings with their grade, the clinics and treatments found on the web, and a timeline of milestones.

Frontier and controversial ideas are kept and labelled, not filtered out. The grade tells you how much weight a claim can bear.

## How it works

```mermaid
flowchart LR
  web[Next.js front] -- "Research" --> q[(Postgres job queue)]
  q --> plan[Scout: branches + queries]
  plan --> harvest[Harvest: Europe PMC, OpenAlex, ClinicalTrials.gov]
  plan --> scan[Web crawler: clinics, treatments, law]
  harvest --> extract[Reader: claims, designs, milestones]
  extract --> review[Skeptic: merges, debates, summary]
  scan --> graph[(Knowledge graph)]
  review --> graph
  graph --> web
```

| Job | What it does | Model (default) |
| --- | --- | --- |
| `plan` | Splits the topic into up to 6 sub-branches, writes literature, trial and web queries, adds frontier angles | `claude-sonnet-5-5` |
| `harvest` | Runs the queries against each source and stores results once (deduplicated by DOI) | none |
| `extract` | Reads abstracts in batches of 10: claims with cited sources, study design and size, milestones | `claude-haiku-5-5` |
| `scan` | Web research with the Claude web search tool, then structured extraction; entities no retrieved page supports are dropped | `claude-sonnet-5-5` |
| `review` | Merges duplicate claims, relabels controversy, records disagreements, writes the summary and open questions | `claude-opus-5-5` |

### Evidence grades

A claim's grade is computed in code from its sources' study designs (`packages/core/src/evidence.ts`), not chosen by the model:

| Grade | Meaning |
| --- | --- |
| T1 | Meta-analysis, systematic review or guideline |
| T2 | At least two randomised trials |
| T3 | Large observational study, or a single trial |
| T4 | Small studies (under 100), case series, case reports |
| T5 | Animal, cell or computational work |
| T6 | Opinion, news, unverified |

Controversy labels are separate: settled, debated, contested, fringe, marketed ahead of evidence.

## Layout

```
packages/core       domain types, evidence grading (no I/O)
packages/db         Postgres schema, migrations, repository functions
packages/crawlers   source adapters: Europe PMC (two views), OpenAlex, ClinicalTrials.gov
packages/agents     Claude roles: scout, reader, web crawler, skeptic; one Llm interface
apps/worker         job loop, handlers, live probe of the sources
apps/web            Next.js front
tests               grading, parsers, and a full pipeline run on real Postgres with a scripted model
```

Adapters do only I/O and agents only talk to the `Llm` interface, so each part can be replaced or tested alone.

## Run it

Requirements: Node 20+, Postgres 16 (or Docker), a Claude API key.

```bash
cp .env.example .env            # add ANTHROPIC_API_KEY and CONTACT_EMAIL
docker compose up -d db         # or point DATABASE_URL at your own Postgres
npm install
npm run db:migrate
npm run db:seed                 # optional: the fertility branch
npm run probe                   # checks every source live (see below)
npm run dev:worker              # terminal 1
npm run dev:web                 # terminal 2, then open http://localhost:3000
```

Press "Research this topic" on a branch. The page refreshes itself while the workers run.

### First live run: `npm run probe`

The parsers are written against the documented API formats and tested with fixtures, but they have not yet been run against the live services. The probe queries each source and prints how many results came back and which fields were empty:

```
europepmc: 10 results in 812 ms
  fields filled: title 10/10, url 10/10, doi 9/10, venue 10/10, year 10/10, authors 10/10, abstract 9/10, ...
```

A source that fails, or a field at 0/10, shows exactly which parser to adjust. During research, a failing source is logged and skipped; a topic stops only if every source fails.

## Cost control

- `MAX_LLM_CALLS_PER_DAY` pauses the worker when reached (default 400).
- `MAX_WEB_SEARCHES_PER_JOB` caps searches per web task (web search is billed per search).
- `AUTO_EXPAND_DEPTH` sets how many levels of sub-branches research automatically (default 1). Deeper levels wait for you.
- Every model call is logged in `llm_usage`; the home page shows the 30-day count.

- `MAX_SOURCES_PER_TOPIC` caps abstracts read per research run (default 60, i.e. 6 reader calls). The most cited per year and the newest are read first; the rest wait for "Research again".

At the defaults a topic costs at most 1 scout call, 6 reader calls, 8 web calls (4 tasks, each a search call and an extraction call) and 1 skeptic call.

## Tests

```bash
npm run typecheck
TEST_DATABASE_URL=postgres://library:library@localhost:5432/library_test npm test
```

The pipeline test wipes the database it is given; use a separate one.

## Next steps

- Embeddings (pgvector) to merge near-duplicate claims across sibling branches.
- Full text from Europe PMC open-access papers, not only abstracts.
- Scheduled re-research of branches so the library tracks new results.
- More sources: arXiv and bioRxiv directly, EU Clinical Trials Register, regulators (EMA, Swissmedic).
- Sign-in before exposing the front publicly; the app has no authentication yet.

This software organises published research. It is not medical advice.
