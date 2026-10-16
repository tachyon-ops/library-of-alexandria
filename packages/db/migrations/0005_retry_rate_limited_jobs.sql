-- Unblock topics and jobs that were paused or marked failed due to transient LLM rate limits (e.g. Gemini 429)
UPDATE topics
SET status = 'queued'
WHERE status = 'error'
  AND id IN (
    SELECT topic_id FROM jobs
    WHERE topic_id IS NOT NULL
      AND (
        error ILIKE '%429%'
        OR error ILIKE '%quota%'
        OR error ILIKE '%resourceexhausted%'
        OR error ILIKE '%rate_limit%'
      )
  );

UPDATE jobs
SET status = 'queued',
    attempts = 0,
    run_after = now(),
    error = NULL
WHERE status = 'failed'
  AND (
    error ILIKE '%429%'
    OR error ILIKE '%quota%'
    OR error ILIKE '%resourceexhausted%'
    OR error ILIKE '%rate_limit%'
  );
