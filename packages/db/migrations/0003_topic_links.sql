-- 0003: Cross-branch and cross-trunk connections between topics (e.g., Physical Chemistry <-> Quantum Physics,
-- Biosemiotics <-> Semiotics, Mathematical Physics <-> Geometry).

CREATE TABLE IF NOT EXISTS topic_links (
  topic_id        uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  linked_topic_id uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  relation        text NOT NULL DEFAULT 'intersects',
  note            text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (topic_id, linked_topic_id),
  CHECK (topic_id <> linked_topic_id)
);

CREATE INDEX IF NOT EXISTS idx_topic_links_linked ON topic_links(linked_topic_id);
