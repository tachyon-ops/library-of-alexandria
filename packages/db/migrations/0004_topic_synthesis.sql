-- 0004: Decision ledger and structured synthesis for topics (benchmarks, levers, clinical questions, sweep queue)

ALTER TABLE topics ADD COLUMN IF NOT EXISTS synthesis jsonb NOT NULL DEFAULT '{}';
