-- Alexander's Library: knowledge graph and job queue

CREATE TABLE topics (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id          uuid REFERENCES topics(id) ON DELETE CASCADE,
  slug               text NOT NULL UNIQUE,
  title              text NOT NULL,
  brief              text,
  depth              int  NOT NULL DEFAULT 0,
  status             text NOT NULL DEFAULT 'idle',
  summary            text,
  gaps               text[] NOT NULL DEFAULT '{}',
  last_researched_at timestamptz,
  created_at         timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX topics_parent_idx ON topics(parent_id);

CREATE TABLE sources (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind            text NOT NULL,
  external_id     text NOT NULL UNIQUE,
  origin          text NOT NULL,
  title           text NOT NULL,
  url             text,
  doi             text,
  venue           text,
  year            int,
  authors         text[] NOT NULL DEFAULT '{}',
  abstract        text,
  cited_by        int,
  declared_design text,
  design          text,
  sample_size     int,
  extra           jsonb NOT NULL DEFAULT '{}',
  fetched_at      timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX sources_doi_idx ON sources(doi) WHERE doi IS NOT NULL;

CREATE TABLE topic_sources (
  topic_id   uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  source_id  uuid NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  query      text,
  extracted  boolean NOT NULL DEFAULT false,
  PRIMARY KEY (topic_id, source_id)
);

CREATE TABLE claims (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id    uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  statement   text NOT NULL,
  tier        text NOT NULL,
  controversy text NOT NULL DEFAULT 'settled',
  direction   text NOT NULL DEFAULT 'unclear',
  confidence  real NOT NULL DEFAULT 0.5,
  rationale   text,
  superseded  boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX claims_topic_idx ON claims(topic_id) WHERE NOT superseded;

CREATE TABLE claim_sources (
  claim_id  uuid NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  source_id uuid NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  PRIMARY KEY (claim_id, source_id)
);

-- Clinics, treatments, trials, labs, companies, regulations found by the web crawler
CREATE TABLE entities (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id   uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  kind       text NOT NULL,
  name       text NOT NULL,
  country    text,
  url        text,
  summary    text,
  attributes jsonb NOT NULL DEFAULT '{}',
  source_urls text[] NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (topic_id, kind, name)
);

CREATE TABLE milestones (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id    uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  year        int NOT NULL,
  title       text NOT NULL,
  description text,
  source_id   uuid REFERENCES sources(id) ON DELETE SET NULL,
  UNIQUE (topic_id, year, title)
);

CREATE TABLE controversies (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id   uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  kind       text NOT NULL,
  note       text NOT NULL,
  claim_ids  uuid[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE jobs (
  id          bigserial PRIMARY KEY,
  kind        text NOT NULL,
  topic_id    uuid REFERENCES topics(id) ON DELETE CASCADE,
  payload     jsonb NOT NULL DEFAULT '{}',
  status      text NOT NULL DEFAULT 'queued',
  attempts    int  NOT NULL DEFAULT 0,
  run_after   timestamptz NOT NULL DEFAULT now(),
  locked_at   timestamptz,
  error       text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz
);
CREATE INDEX jobs_ready_idx ON jobs(run_after) WHERE status = 'queued';

CREATE TABLE llm_usage (
  id            bigserial PRIMARY KEY,
  job_id        bigint REFERENCES jobs(id) ON DELETE SET NULL,
  role          text NOT NULL,
  model         text NOT NULL,
  input_tokens  int NOT NULL DEFAULT 0,
  output_tokens int NOT NULL DEFAULT 0,
  web_searches  int NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);
