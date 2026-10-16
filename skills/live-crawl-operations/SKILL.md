---
name: live-crawl-operations
description: Operating the research workers against live services — first-run probe, reading worker logs and job errors, cost and usage queries, and common failures with their fixes. Use when running the library for real, when a topic stops with an error, or when costs need checking.
---

# Live crawl operations

## First run on a new machine

1. `.env` filled from `.env.example` (`ANTHROPIC_API_KEY`, `CONTACT_EMAIL`, `DATABASE_URL`).
2. `npm run db:migrate && npm run db:seed`.
3. `npm run probe -- "oocyte vitrification live birth"`. Expect every source to return results with most fields filled. Anything else: `add-source-adapter`, section "Fixing a failing source".
4. Start one topic with `include the next level of branches` unchecked, watch the worker log through one full cycle, then widen.

## Where things show up

| Symptom | Look at |
| --- | --- |
| Topic shows "stopped on an error" | `jobs.error` for that topic (query in `job-pipeline`) |
| Few or no sources | worker log line `harvest <slug>: N source errors` |
| No findings although sources exist | `extract` log lines; `topic_sources.extracted`; reader refusals in `jobs.error` |
| No clinics or treatments | `scan` log lines; entities without a returned citation are dropped by design |
| Worker idle with queued jobs | daily budget reached (log says so) or `run_after` in the future (backoff) |

## Usage and cost

```sql
SELECT role, model, count(*) calls, sum(input_tokens) input, sum(output_tokens) output, sum(web_searches) searches
FROM llm_usage WHERE created_at > now() - interval '1 day' GROUP BY role, model;
```

Guards in `.env`: `MAX_LLM_CALLS_PER_DAY`, `MAX_WEB_SEARCHES_PER_JOB`, `MAX_SOURCES_PER_TOPIC`, `SOURCES_PER_QUERY`, `AUTO_EXPAND_DEPTH`. Lower them before raising them. For current per-token and per-search prices, check https://platform.claude.com/docs/en/about-claude/pricing rather than quoting from memory.

## Common failures

| Error | Cause | Fix |
| --- | --- | --- |
| `401 authentication_error` | missing or wrong API key | fix `.env`; retries will not help |
| `429` from a source | rate limit | lower `SOURCES_PER_QUERY`; set `CONTACT_EMAIL`; `getJson` already backs off |
| `output cut off at max_tokens` | batch too large for the reader | lower `readerBatch` in `configFromEnv` |
| `model declined the request` | refusal on the content | read the job's topic brief; rephrase the brief |
| field `0/N` in probe | API response shape changed | update fixture, then parser |

## Restarting work

"Research again" on a topic re-plans it and harvests again; a source returned twice is stored once, and sources left unread by the previous run's cap compete for reading with the new ones. A dead job does not block a new request.
