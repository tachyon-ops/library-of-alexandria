import { createLlm } from "@lib/agents";
import { LITERATURE_ADAPTERS, TRIAL_ADAPTERS } from "@lib/crawlers";
import * as repo from "@lib/db";
import { configFromEnv, runJob, type Deps } from "./handlers";

/**
 * The research worker: a loop over the Postgres job queue. Run one or several;
 * SKIP LOCKED keeps them from taking the same job.
 */
async function main() {
  const sql = repo.getSql();
  await repo.migrate(sql);
  const maxCallsPerDay = Number(process.env.MAX_LLM_CALLS_PER_DAY ?? 400);
  const pollMs = Number(process.env.WORKER_POLL_MS ?? 3000);
  let currentJob: string | null = null;

  const llm = createLlm((u) =>
    repo.logUsage(sql, { jobId: currentJob, role: u.role, model: u.model, inputTokens: u.inputTokens, outputTokens: u.outputTokens, webSearches: u.webSearches }),
  );
  const deps: Deps = {
    sql,
    llm,
    literature: LITERATURE_ADAPTERS,
    trials: TRIAL_ADAPTERS,
    config: configFromEnv(),
    log: (m) => console.log(`[${new Date().toISOString()}] ${m}`),
  };

  let stopping = false;
  process.on("SIGINT", () => (stopping = true));
  process.on("SIGTERM", () => (stopping = true));

  const requeued = await repo.requeueStaleJobs(sql);
  if (requeued) deps.log(`requeued ${requeued} stale jobs`);
  deps.log("worker ready");

  while (!stopping) {
    if ((await repo.llmCallsToday(sql)) >= maxCallsPerDay) {
      deps.log(`daily LLM budget (${maxCallsPerDay} calls) reached; pausing 10 minutes`);
      await sleep(600_000);
      continue;
    }
    const job = await repo.claimNextJob(sql);
    if (!job) {
      await sleep(pollMs);
      continue;
    }
    currentJob = job.id;
    try {
      await runJob(deps, job);
      await repo.completeJob(sql, job.id);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const dead = await repo.failJob(sql, job, message);
      deps.log(`job ${job.id} (${job.kind}) failed${dead ? " permanently" : ", will retry"}: ${message}`);
      if (dead && job.topicId) await repo.setTopicStatus(sql, job.topicId, "error");
    } finally {
      currentJob = null;
    }
  }
  await sql.end();
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
