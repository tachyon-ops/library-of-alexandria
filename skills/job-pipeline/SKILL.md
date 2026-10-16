---
name: job-pipeline
description: How research runs in Alexander's Library — the Postgres job queue, the five job kinds and their order, retries, cost guards, and how to add a new job kind. Use when changing apps/worker, debugging a stuck topic, or adding a pipeline stage.
---

# Job pipeline

## Flow

```
Research button / scout ──> plan
plan    ──> harvest (literature + trial queries)
        ──> scan    (one per web task)
        ──> plan    (each new sub-branch, while autoDepth > 0)
harvest ──> extract
extract ──> extract (next batch of 10, until MAX_SOURCES_PER_TOPIC or no unread left)
        ──> review  (5 s later)
review  ──> topic status "ready"
```

`repo.requestResearch(sql, topicId, autoDepth)` is the only entry point: it sets the topic to `queued` and enqueues `plan`. The web front and the scout both use it.

## Queue mechanics (packages/db/src/repo.ts)

- `claimNextJob` uses `FOR UPDATE SKIP LOCKED`, so several workers can run side by side.
- `failJob` retries with backoff (30 s × 2^attempts), up to 3 attempts, then marks the job `failed` and the worker sets the topic to `error`.
- `requeueStaleJobs` returns jobs left `running` for 15 minutes (a crashed worker) to the queue at startup.
- Every model call is logged in `llm_usage`; the worker pauses for 10 minutes when `MAX_LLM_CALLS_PER_DAY` is reached.

## Handler rules (apps/worker/src/handlers.ts)

- A handler loads what it needs from the database, calls agents and adapters, writes through `repo`, and enqueues the next job. It holds no state between jobs.
- A handler must be safe to run twice: a retry after a partial failure must not duplicate rows. Use `ON CONFLICT` in repo functions and mark progress (`markExtracted`) before enqueueing the next step.
- One failing source must not fail a harvest; the job fails only when every source fails.
- Log one line per job with counts: `extract <slug>: 10 sources -> 7 claims, 1 milestones`.

## Adding a job kind

1. Add the name to `JOB_KINDS` in `packages/core/src/types.ts`.
2. Add a `case` in `runJob`, following the rules above.
3. Decide who enqueues it and add that call.
4. Add a human label to `JOB_WORDS` in the topic page so the status line can name it.
5. Extend the pipeline test: the asserted job order (`kinds`) and the database effect.

## Debugging a stuck topic

```sql
SELECT id, kind, status, attempts, run_after, left(error, 200) FROM jobs
WHERE topic_id = (SELECT id FROM topics WHERE slug = '<slug>') ORDER BY id DESC;
```

`queued` with a future `run_after` is waiting out a backoff. `failed` holds the error. No rows means nothing was requested.
