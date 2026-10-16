import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { z } from "zod";
import {
  EntitiesSchema,
  GeminiLlm,
  modelsFromEnv,
  PlanSchema,
  providerFromEnv,
  ReadingSchema,
  ReviewSchema,
  reviewTopic,
  type Llm,
  type Usage,
} from "@lib/agents";
import { parseClinicalTrials, parseEuropePmc, parseOpenAlex, type SourceAdapter } from "@lib/crawlers";
import * as repo from "@lib/db";
import { runJob, type Deps } from "../apps/worker/src/handlers";
import { clinicalTrialsResponse, europePmcResponse, openAlexResponse } from "./fixtures/responses";

/**
 * End-to-end run of the research pipeline on a real Postgres, with fixture
 * sources and a scripted model in place of the Claude API.
 * Needs TEST_DATABASE_URL (skipped otherwise); the database is wiped.
 */
const url = process.env.TEST_DATABASE_URL;

class ScriptedLlm implements Llm {
  calls: string[] = [];
  async structured<T>(args: { role: string; prompt: string; schema: z.ZodType<T> }): Promise<T> {
    this.calls.push(args.role);
    const out = this.answer(args.schema as unknown, args.prompt);
    return (args.schema as z.ZodType<T>).parse(out);
  }
  private answer(schema: unknown, prompt: string): unknown {
    if (schema === PlanSchema) {
      return {
        subtopics: [{ title: "Thaw survival", brief: "Survival of vitrified eggs after warming" }],
        literatureQueries: ["oocyte vitrification live birth"],
        trialQueries: ["rapamycin IVF"],
        webQueries: ["Find European clinics using vitrified own eggs after 44"],
        frontierAngles: [],
      };
    }
    if (schema === ReadingSchema) {
      const n = (prompt.match(/<source index=/g) ?? []).length;
      return {
        sources: Array.from({ length: n }, (_, i) => ({ index: i, relevant: true, design: i === 0 ? "cohort" : "rct", sampleSize: 0 })),
        claims: [
          { statement: "Age at freezing predicts live birth from vitrified eggs.", sourceIndexes: [0, 99], direction: "supports", confidence: 0.9, controversy: "settled", rationale: "Core predictor." },
          { statement: "Age at egg freezing predicts live birth.", sourceIndexes: [0], direction: "supports", confidence: 0.8, controversy: "settled", rationale: "Duplicate." },
          { statement: "Rapamycin before retrieval improves blastocyst yield.", sourceIndexes: [n - 1], direction: "supports", confidence: 0.5, controversy: "fringe", rationale: "Early trial." },
          { statement: "Unsupported claim", sourceIndexes: [], direction: "unclear", confidence: 0.1, controversy: "fringe", rationale: "x" },
        ],
        milestones: [{ year: 2024, title: "Meta-analysis of planned egg freezing", description: "Pooled data", sourceIndex: 0 }],
      };
    }
    if (schema === EntitiesSchema) {
      return {
        entities: [
          { kind: "clinic", name: "Clinic Real", country: "Spain", url: "https://clinic.example/es", summary: "Accepts patients to 50.", attributes: [{ key: "age limit", value: "50" }], sourceUrls: ["https://clinic.example/es"] },
          { kind: "clinic", name: "Clinic Invented", country: "", url: "", summary: "", attributes: [], sourceUrls: ["https://not-returned.example"] },
        ],
      };
    }
    if (schema === ReviewSchema) {
      return {
        summary: "Age at freezing and egg count drive success.",
        gaps: ["Outcomes above 45 at transfer"],
        merges: [{ keep: 0, drop: [1, 0, 42] }, { keep: 1, drop: [2] }, { keep: 2, drop: [0] }],
        labels: [{ index: 2, controversy: "contested" }],
        controversies: [{ kind: "weak_evidence", claimIndexes: [2, 7], note: "Single trial, not replicated." }],
      };
    }
    throw new Error("unexpected schema");
  }
  async webResearch() {
    this.calls.push("web-search");
    return {
      text: "Clinic Real in Spain accepts recipients to 50.",
      citations: [{ url: "https://clinic.example/es", title: "Clinic Real", citedText: null }],
    };
  }
}

describe("agent validation", () => {
  it("drops out-of-range and overlapping keep/drop indexes in reviewTopic", async () => {
    const review = await reviewTopic(new ScriptedLlm(), {
      topic: { title: "Test", brief: null },
      path: [],
      claims: [
        { statement: "A", tier: "T1", controversy: "settled", sourceCount: 1, years: [2024] },
        { statement: "B", tier: "T1", controversy: "settled", sourceCount: 1, years: [2024] },
        { statement: "C", tier: "T3", controversy: "fringe", sourceCount: 1, years: [2025] },
      ],
      entityNames: [],
    });
    expect(review.merges).toEqual([{ keep: 0, drop: [1] }]);
    expect(review.controversies[0]!.claimIndexes).toEqual([2]);
  });

  it("auto-selects provider and models from environment and runs GeminiLlm", async () => {
    expect(providerFromEnv({ GEMINI_API_KEY: "g-key" } as never)).toBe("gemini");
    expect(providerFromEnv({ ANTHROPIC_API_KEY: "a-key" } as never)).toBe("anthropic");
    expect(modelsFromEnv({ GEMINI_API_KEY: "g-key" } as never).reader).toBe("gemini-3.6-flash");

    const usage: Usage[] = [];
    let structuredCalls = 0;
    const fakeFetch: typeof fetch = async (reqUrl, init) => {
      const body = JSON.parse(String(init?.body));
      if (body.tools) {
        return new Response(
          JSON.stringify({
            candidates: [
              {
                finishReason: "STOP",
                content: { parts: [{ text: "Found Clinic Madrid." }] },
                groundingMetadata: {
                  webSearchQueries: ["fertility clinic madrid"],
                  groundingChunks: [{ web: { uri: "https://madrid.example", title: "Clinic Madrid" } }],
                },
              },
            ],
            usageMetadata: { promptTokenCount: 12, candidatesTokenCount: 8 },
          }),
        );
      }
      structuredCalls++;
      if (structuredCalls === 1 && String(reqUrl).includes("gemini-3.6-flash")) {
        return new Response(JSON.stringify({ error: { code: 429, message: "Quota exceeded" } }), { status: 429 });
      }
      return new Response(
        JSON.stringify({
          candidates: [
            {
              finishReason: "STOP",
              content: {
                parts: [
                  {
                    text: JSON.stringify({
                      subtopics: [],
                      literatureQueries: ["oocyte vitrification"],
                      trialQueries: [],
                      webQueries: [],
                      frontierAngles: [],
                    }),
                  },
                ],
              },
            },
          ],
          usageMetadata: { promptTokenCount: 20, candidatesTokenCount: 15 },
        }),
      );
    };
    const gemini = new GeminiLlm(modelsFromEnv({ LLM_PROVIDER: "gemini" } as never), (u) => {
      usage.push(u);
    }, "test-key", fakeFetch);
    const plan = await gemini.structured({ role: "scout", system: "s", prompt: "p", schema: PlanSchema });
    expect(plan.literatureQueries).toEqual(["oocyte vitrification"]);
    expect(usage[0]!.model).toBe("gemini-3.7-flash");
    const web = await gemini.webResearch({ role: "web", system: "s", prompt: "p", maxSearches: 4 });
    expect(web.citations).toEqual([{ url: "https://madrid.example", title: "Clinic Madrid", citedText: null }]);
    expect(usage).toHaveLength(2);
    expect(usage[1]!.webSearches).toBe(1);
  });
});

const fixtureAdapter = (name: string, rows: () => ReturnType<typeof parseEuropePmc>): SourceAdapter => ({
  name,
  kinds: ["paper"],
  search: async () => rows(),
});
const brokenAdapter: SourceAdapter = { name: "broken", kinds: ["paper"], search: async () => Promise.reject(new Error("503")) };

describe.skipIf(!url)("research pipeline", () => {
  let sql: repo.Sql;
  const llm = new ScriptedLlm();
  const logs: string[] = [];

  beforeAll(async () => {
    sql = repo.getSql(url);
    await sql.unsafe("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
    await repo.migrate(sql);
  });
  afterAll(async () => {
    await sql?.end();
  });

  it("plans, harvests, reads, scans and reviews a topic", async () => {
    const root = await repo.createTopic(sql, { title: "Using eggs vitrified at 35", brief: "Couple, transfer at 44" });
    await repo.requestResearch(sql, root.id, 0);

    const deps: Deps = {
      sql,
      llm,
      literature: [fixtureAdapter("epmc", () => parseEuropePmc(europePmcResponse)), fixtureAdapter("oa", () => parseOpenAlex(openAlexResponse)), brokenAdapter],
      trials: [fixtureAdapter("ct", () => parseClinicalTrials(clinicalTrialsResponse))],
      config: { sourcesPerQuery: 10, readerBatch: 10, maxSourcesPerTopic: 60, maxWebSearchesPerJob: 2, autoExpandDepth: 0, maxTreeDepth: 6 },
      log: (m) => logs.push(m),
    };

    const kinds: string[] = [];
    for (let i = 0; i < 20; i++) {
      await sql`UPDATE jobs SET run_after = now() WHERE status = 'queued'`;
      const job = await repo.claimNextJob(sql);
      if (!job) break;
      kinds.push(job.kind);
      await runJob(deps, job);
      await repo.completeJob(sql, job.id);
    }
    expect(kinds).toEqual(["plan", "harvest", "scan", "extract", "review"]);

    // Tree: the scout's branch exists and was not researched (autoDepth 0).
    const children = await repo.getChildren(sql, root.id);
    expect(children.map((c) => c.title)).toEqual(["Thaw survival"]);
    expect(children[0]!.status).toBe("idle");

    // Europe PMC and OpenAlex returned the same paper under one DOI: stored once.
    const [row] = await sql<{ n: number }[]>`SELECT count(*)::int AS n FROM sources`;
    const n = row!.n;
    expect(n).toBe(4); // meta-analysis, preprint, OpenAlex-only article, trial
    expect(logs.some((l) => l.includes("broken"))).toBe(true);

    // Claims: the unsupported one is dropped, the duplicate merged, tiers derived from designs.
    const claims = await repo.topicClaims(sql, root.id);
    expect(claims).toHaveLength(2);
    const freezing = claims.find((c) => c.statement.startsWith("Age at freezing"))!;
    expect(freezing.tier).toBe("T1"); // declared meta-analysis overrides the reader's "cohort"
    const rapa = claims.find((c) => c.statement.startsWith("Rapamycin"))!;
    expect(rapa.tier).toBe("T3"); // a single randomised source is capped at T3 until replicated
    expect(rapa.controversy).toBe("contested");

    // Web: the entity no search result supports is discarded.
    const entities = await repo.topicEntities(sql, root.id);
    expect(entities.map((e) => e.name)).toEqual(["Clinic Real"]);
    expect(entities[0]!.attributes).toEqual({ "age limit": "50" });

    const milestones = await repo.topicMilestones(sql, root.id);
    expect(milestones).toHaveLength(1);

    const sources = await repo.topicSources(sql, root.id);
    expect(sources).toHaveLength(4);
    expect(sources.every((s) => Boolean(s.url))).toBe(true);

    // A parent discipline can be reparented under a new umbrella trunk via moveTopic,
    // recalculating depth across its descendants and inheriting subtree sources/milestones.
    const superRoot = await repo.createTopic(sql, { title: "Natural & Life Sciences", brief: "Umbrella trunk" });
    const movedRoot = await repo.moveTopic(sql, root.id, superRoot.id);
    expect(movedRoot.parentId).toBe(superRoot.id);
    expect(movedRoot.depth).toBe(1);
    const movedChildren = await repo.getChildren(sql, root.id);
    expect(movedChildren[0]!.depth).toBe(2);
    await expect(repo.moveTopic(sql, superRoot.id, movedChildren[0]!.id)).rejects.toThrow(/descendants/);
    expect(await repo.topicSources(sql, superRoot.id)).toHaveLength(4);
    expect(await repo.topicMilestones(sql, superRoot.id)).toHaveLength(1);
    const restoredRoot = await repo.moveTopic(sql, root.id, null);
    expect(restoredRoot.depth).toBe(0);

    // Cross-branch / cross-trunk links connect nodes across separate branches.
    await repo.linkTopics(sql, root.id, superRoot.id, "bridges", "Shared mechanistic foundations");
    const rootLinks = await repo.topicLinks(sql, root.id);
    expect(rootLinks).toHaveLength(1);
    expect(rootLinks[0]!.id).toBe(superRoot.id);
    expect(rootLinks[0]!.relation).toBe("bridges");
    expect((await repo.listTopicLinks(sql)).length).toBeGreaterThanOrEqual(1);

    const controversies = await repo.topicControversies(sql, root.id);
    expect(controversies).toHaveLength(1);
    expect(controversies[0]!.claimIds).toHaveLength(1);

    const done = await repo.getTopic(sql, root.id);
    expect(done).toMatchObject({ status: "ready", summary: "Age at freezing and egg count drive success.", gaps: ["Outcomes above 45 at transfer"] });
    expect(llm.calls).toEqual(["scout", "web-search", "web", "reader", "skeptic"]);

    // Drain helper returns null when queue is empty and positive ms when a delayed job is queued.
    expect(await repo.nextQueuedDelayMs(sql)).toBeNull();
    const delayedId = await repo.enqueueJob(sql, "review", root.id, {}, 10);
    const delayMs = await repo.nextQueuedDelayMs(sql);
    expect(delayMs).not.toBeNull();
    expect(delayMs!).toBeGreaterThan(1000);
    await repo.completeJob(sql, delayedId);
    expect(await repo.nextQueuedDelayMs(sql)).toBeNull();
  });

  it("parses review output with benchmarks, levers, questions, and sweepQueue", () => {
    const parsed = ReviewSchema.parse({
      summary: "Summary text",
      gaps: ["Gap 1"],
      merges: [],
      labels: [],
      controversies: [],
      synthesis: {
        benchmarks: [{ metric: "31.1%", label: "Live births per BB transfer", source: "PMC8244281" }],
        levers: [
          {
            name: "Natural-cycle FET",
            category: "Transfer & Preparation",
            description: "Transfer in ovulatory cycle",
            bestEvidence: "COMPETE RCT, 902 ovulatory women",
            effect: "Live birth 54% vs 43%, RR 1.26",
            reading: "Strongest lever if ovulating regularly",
            verdict: "Supported",
          },
        ],
        clinicalQuestions: ["Does she still ovulate regularly?"],
        sweepQueue: ["Spindle transfer outcomes over 40"],
      },
    });
    expect(parsed.synthesis?.benchmarks[0]!.metric).toBe("31.1%");
    expect(parsed.synthesis?.levers[0]!.verdict).toBe("Supported");
    expect(parsed.synthesis?.clinicalQuestions).toHaveLength(1);
    expect(parsed.synthesis?.sweepQueue).toHaveLength(1);
  });

  it("remains backwards compatible when synthesis is omitted", () => {
    const parsed = ReviewSchema.parse({
      summary: "Legacy summary",
      gaps: [],
      merges: [],
      labels: [],
      controversies: [],
    });
    expect(parsed.synthesis).toBeUndefined();
  });
});
