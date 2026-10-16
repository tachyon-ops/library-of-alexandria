# Agent instructions

Workspace skills live in `skills/`. Read `codebase-map` and `change-discipline` at the start of every session, then the skill that matches the task.

| Skill | Use when |
| --- | --- |
| `codebase-map` | Orienting: packages, ownership, dependency direction, commands |
| `architecture-boundaries` | Adding a file, an import or a responsibility |
| `change-discipline` | Any code change: scope, verification, approvals, commit format |
| `add-source-adapter` | Adding a research source, or a source fails or returns empty fields |
| `agent-roles-and-prompts` | Editing a prompt or output schema, or adding a Claude role |
| `evidence-grading` | Touching tiers, controversy labels, or a grade looks wrong |
| `job-pipeline` | Changing the worker, adding a job kind, debugging a stuck topic |
| `database-and-migrations` | Adding a table or column, writing a query |
| `web-front` | Anything in `apps/web` |
| `testing` | Adding behaviour or fixing a bug; before declaring done |
| `live-crawl-operations` | Running against live services, errors, costs |
| `research-integrity-and-security` | Prompts, crawlers, stored data, deployment |
| `decisions-log` | Before reversing a design choice; after making one (`docs/decisions.md`) |

Project documents live in `docs/`:

| Document | Use when |
| --- | --- |
| `docs/philosophy.md` | Checking mission, epistemic stance, scope or engineering principles |
| `docs/specs.md` | Checking the as-built v0.1 contract; update in the same change when behaviour or schemas move |
| `docs/roadmap.md` | Checking milestones (M0–M5), exit criteria, the fertility track or open questions |
| `docs/decisions.md` | Before reversing a design choice; after making one (`decisions-log`) |
| `docs/deployment.md` | Branching (`develop` → `master`), PRs, GitHub CI gate, releases and hosting status |

A human reviews every change line by line. Keep changes bounded, verified and reported honestly, including what was not verified.
