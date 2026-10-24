import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";

export type Role = "taxonomist" | "scout" | "reader" | "web" | "skeptic";
export type LlmProvider = "anthropic" | "gemini";

export interface Usage {
  role: Role;
  model: string;
  inputTokens: number;
  outputTokens: number;
  webSearches: number;
}

export interface Citation {
  url: string;
  title: string | null;
  citedText: string | null;
}

/**
 * The only door to a language model. Agents depend on this interface, not on
 * an SDK, so the pipeline can run on Anthropic, Gemini, or a scripted test double.
 */
export interface Llm {
  structured<T>(args: { role: Role; system: string; prompt: string; schema: z.ZodType<T>; maxTokens?: number }): Promise<T>;
  webResearch(args: { role: Role; system: string; prompt: string; maxSearches: number }): Promise<{ text: string; citations: Citation[] }>;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const DEFAULT_MODELS: Record<Role, string> = {
  taxonomist: "claude-3-5-haiku-latest",
  scout: "claude-3-5-sonnet-latest",
  reader: "claude-3-5-haiku-latest",
  web: "claude-3-5-sonnet-latest",
  skeptic: "claude-3-5-sonnet-latest",
};

export const DEFAULT_GEMINI_MODELS: Record<Role, string> = {
  taxonomist: "gemini-2.5-flash-lite",
  scout: "gemini-3.6-flash",
  reader: "gemini-3.6-flash",
  web: "gemini-3.6-flash",
  skeptic: "gemini-3.6-flash",
};

const GEMINI_FALLBACKS = [
  "gemini-3.6-flash",
  "gemini-3.7-flash",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-3-flash-preview",
  "gemini-3.1-flash-lite-preview",
  "gemini-flash-latest",
  "gemini-flash-lite-latest",
  "gemini-2.5-pro",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
];

export function hasLlmConfigured(env = process.env): boolean {
  return Boolean(
    env.GEMINI_API_KEY?.trim() ||
      env.ANTHROPIC_API_KEY?.trim() ||
      env.AI_API_KEY?.trim() ||
      env.GROQ_API_KEY?.trim() ||
      env.CEREBRAS_API_KEY?.trim() ||
      env.MISTRAL_API_KEY?.trim() ||
      env.OPENROUTER_API_KEY?.trim() ||
      env.OPENAI_API_KEY?.trim() ||
      env.GITHUB_MODELS_TOKEN?.trim(),
  );
}

export function providerFromEnv(env = process.env): LlmProvider {
  const explicit = env.LLM_PROVIDER?.trim().toLowerCase();
  if (explicit === "anthropic") return "anthropic";
  if (explicit === "gemini") return "gemini";
  if (env.ANTHROPIC_API_KEY && !env.GEMINI_API_KEY) return "anthropic";
  if (env.GEMINI_API_KEY && !env.ANTHROPIC_API_KEY) return "gemini";
  if (env.ANTHROPIC_API_KEY) return "anthropic";
  if (env.GEMINI_API_KEY) return "gemini";
  return "anthropic";
}

export function modelsFromEnv(env = process.env, provider = providerFromEnv(env)): Record<Role, string> {
  const defaults = provider === "gemini" ? DEFAULT_GEMINI_MODELS : DEFAULT_MODELS;
  return {
    taxonomist: env.MODEL_TAXONOMIST || defaults.taxonomist,
    scout: env.MODEL_SCOUT || defaults.scout,
    reader: env.MODEL_READER || defaults.reader,
    web: env.MODEL_WEB || defaults.web,
    skeptic: env.MODEL_SKEPTIC || defaults.skeptic,
  };
}

export function createLlm(onUsage: (u: Usage) => Promise<void> | void = () => {}, env = process.env): Llm {
  const provider = providerFromEnv(env);
  const geminiKey = env.GEMINI_API_KEY || (env.AI_API_KEY && !env.AI_API_KEY.startsWith("sk-ant-") ? env.AI_API_KEY : "");
  const anthropicKey = env.ANTHROPIC_API_KEY || (env.AI_API_KEY?.startsWith("sk-ant-") ? env.AI_API_KEY : "");

  const geminiLlm = geminiKey ? new GeminiLlm(modelsFromEnv(env, "gemini"), onUsage, geminiKey) : null;
  const claudeLlm = anthropicKey
    ? new ClaudeLlm(modelsFromEnv(env, "anthropic"), onUsage, new Anthropic({ apiKey: anthropicKey, maxRetries: 3 }))
    : null;

  const extraProviders: Llm[] = [];
  if (env.GROQ_API_KEY?.trim()) {
    extraProviders.push(
      new OpenAiCompatibleLlm(
        {
          name: "Groq",
          endpoint: "https://api.groq.com/openai/v1/chat/completions",
          apiKey: env.GROQ_API_KEY.trim(),
          models: ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.8-27b"],
        },
        onUsage,
      ),
    );
  }
  if (env.CEREBRAS_API_KEY?.trim()) {
    extraProviders.push(
      new OpenAiCompatibleLlm(
        {
          name: "Cerebras",
          endpoint: "https://api.cerebras.ai/v1/chat/completions",
          apiKey: env.CEREBRAS_API_KEY.trim(),
          models: ["llama-3.3-70b", "llama3.1-8b"],
        },
        onUsage,
      ),
    );
  }
  if (env.MISTRAL_API_KEY?.trim()) {
    extraProviders.push(
      new OpenAiCompatibleLlm(
        {
          name: "Mistral",
          endpoint: "https://api.mistral.ai/v1/chat/completions",
          apiKey: env.MISTRAL_API_KEY.trim(),
          models: ["mistral-small-latest", "mistral-large-latest"],
        },
        onUsage,
      ),
    );
  }
  if (env.OPENROUTER_API_KEY?.trim()) {
    extraProviders.push(
      new OpenAiCompatibleLlm(
        {
          name: "OpenRouter",
          endpoint: "https://openrouter.ai/api/v1/chat/completions",
          apiKey: env.OPENROUTER_API_KEY.trim(),
          models: ["meta-llama/llama-3.3-70b-instruct:free", "google/gemma-3-27b-it:free"],
        },
        onUsage,
      ),
    );
  }
  if (env.OPENAI_API_KEY?.trim()) {
    extraProviders.push(
      new OpenAiCompatibleLlm(
        {
          name: "OpenAI",
          endpoint: "https://api.openai.com/v1/chat/completions",
          apiKey: env.OPENAI_API_KEY.trim(),
          models: ["gpt-4o-mini", "gpt-4o"],
        },
        onUsage,
      ),
    );
  }
  if (env.GITHUB_MODELS_TOKEN?.trim()) {
    extraProviders.push(
      new OpenAiCompatibleLlm(
        {
          name: "GitHubModels",
          endpoint: "https://models.github.ai/inference/chat/completions",
          apiKey: env.GITHUB_MODELS_TOKEN.trim(),
          models: ["openai/gpt-4o-mini", "meta/Llama-3.3-70B-Instruct"],
        },
        onUsage,
      ),
    );
  }

  const ordered: Llm[] = [];
  if (provider === "anthropic") {
    if (claudeLlm) ordered.push(claudeLlm);
    if (geminiLlm) ordered.push(geminiLlm);
  } else {
    if (geminiLlm) ordered.push(geminiLlm);
    if (claudeLlm) ordered.push(claudeLlm);
  }
  ordered.push(...extraProviders);

  if (ordered.length === 0) {
    return new GeminiLlm(modelsFromEnv(env, "gemini"), onUsage, geminiKey);
  }
  return ordered.reduce((acc, next) => new FallbackLlm(acc, next));
}

/** Fallback wrapper that switches from primary to secondary provider upon transient rate limit or quota errors. */
export class FallbackLlm implements Llm {
  constructor(
    private primary: Llm,
    private secondary: Llm,
  ) {}

  async structured<T>(args: { role: Role; system: string; prompt: string; schema: z.ZodType<T>; maxTokens?: number }): Promise<T> {
    try {
      return await this.primary.structured(args);
    } catch (primaryErr) {
      if (this.isRateLimitOrTransient(primaryErr)) {
        console.warn(
          `[FallbackLlm] Primary provider hit transient/quota error (${primaryErr instanceof Error ? primaryErr.message : String(primaryErr)}). Falling back to secondary provider.`,
        );
        try {
          return await this.secondary.structured(args);
        } catch (secErr) {
          console.warn(
            `[FallbackLlm] Secondary provider also failed (${secErr instanceof Error ? secErr.message : String(secErr)}).`,
          );
          throw this.isRateLimitOrTransient(secErr) ? secErr : primaryErr;
        }
      }
      throw primaryErr;
    }
  }

  async webResearch(args: { role: Role; system: string; prompt: string; maxSearches: number }): Promise<{ text: string; citations: Citation[] }> {
    try {
      return await this.primary.webResearch(args);
    } catch (err) {
      console.warn(
        `[FallbackLlm] Primary web research encountered error (${err instanceof Error ? err.message : String(err)}). Falling back to secondary provider.`,
      );
      try {
        return await this.secondary.webResearch(args);
      } catch (secErr) {
        console.warn(`[FallbackLlm] Secondary web research also encountered error. Returning empty search citations.`);
        return { text: "", citations: [] };
      }
    }
  }

  private isRateLimitOrTransient(err: unknown): boolean {
    if (!err) return false;
    const msg = err instanceof Error ? err.message : String(err);
    const status = (err as { status?: number }).status;
    return (
      status === 429 ||
      status === 503 ||
      status === 529 ||
      /429|503|529|rate_limit|resourceexhausted|quota|overloaded/i.test(msg)
    );
  }
}

/** Claude API implementation: structured outputs for JSON, the server-side web search tool for the web. */
export class ClaudeLlm implements Llm {
  private client: Anthropic;

  constructor(
    private models: Record<Role, string> = modelsFromEnv(process.env, "anthropic"),
    private onUsage: (u: Usage) => Promise<void> | void = () => {},
    client?: Anthropic,
  ) {
    this.client = client ?? new Anthropic({ maxRetries: 3 });
  }

  async structured<T>(args: { role: Role; system: string; prompt: string; schema: z.ZodType<T>; maxTokens?: number }): Promise<T> {
    const model = this.models[args.role];
    const res = await this.client.messages.parse({
      model,
      max_tokens: args.maxTokens ?? 8000,
      system: args.system,
      messages: [{ role: "user", content: args.prompt }],
      output_config: { format: zodOutputFormat(args.schema as never) },
    });
    await this.onUsage({ role: args.role, model, inputTokens: res.usage.input_tokens, outputTokens: res.usage.output_tokens, webSearches: 0 });
    if (res.stop_reason === "refusal") throw new Error(`${args.role}: model declined the request`);
    if (res.stop_reason === "max_tokens") throw new Error(`${args.role}: output cut off at max_tokens`);
    if (res.parsed_output == null) throw new Error(`${args.role}: no structured output returned`);
    return res.parsed_output as T;
  }

  async webResearch(args: { role: Role; system: string; prompt: string; maxSearches: number }) {
    const model = this.models[args.role];
    const messages: Anthropic.MessageParam[] = [{ role: "user", content: args.prompt }];
    const texts: string[] = [];
    const citations = new Map<string, Citation>();
    // The API may pause a long search turn; send the paused turn back to let it finish.
    for (let round = 0; round < 4; round++) {
      const res = await this.client.messages.create({
        model,
        max_tokens: 8000,
        system: args.system,
        messages,
        tools: [{ type: "web_search_20250305", name: "web_search", max_uses: args.maxSearches }],
      });
      await this.onUsage({
        role: args.role,
        model,
        inputTokens: res.usage.input_tokens,
        outputTokens: res.usage.output_tokens,
        webSearches: res.usage.server_tool_use?.web_search_requests ?? 0,
      });
      for (const block of res.content) {
        if (block.type !== "text") continue;
        texts.push(block.text);
        for (const c of block.citations ?? []) {
          if (c.type === "web_search_result_location" && !citations.has(c.url)) {
            citations.set(c.url, { url: c.url, title: c.title ?? null, citedText: c.cited_text ?? null });
          }
        }
      }
      if (res.stop_reason !== "pause_turn") break;
      messages.push({ role: "assistant", content: res.content });
    }
    return { text: texts.join(""), citations: [...citations.values()] };
  }
}

interface GeminiResponse {
  candidates?: {
    finishReason?: string;
    content?: { parts?: { text?: string }[] };
    groundingMetadata?: {
      webSearchQueries?: string[];
      groundingChunks?: { web?: { uri?: string; title?: string } }[];
    };
  }[];
  usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number };
}

/** Gemini API implementation: JSON Schema structured output and Google Search grounding. */
export class GeminiLlm implements Llm {
  private static lastCallTime = 0;
  private unavailableModels = new Set<string>();

  constructor(
    private models: Record<Role, string> = modelsFromEnv(process.env, "gemini"),
    private onUsage: (u: Usage) => Promise<void> | void = () => {},
    private apiKey: string = process.env.GEMINI_API_KEY || process.env.AI_API_KEY || "",
    private fetchImpl: typeof fetch = fetch,
  ) {}

  private async pace(role?: Role): Promise<void> {
    if (role === "taxonomist" || process.env.NODE_ENV === "test" || process.env.VITEST) return;
    const minIntervalMs = 1500;
    const now = Date.now();
    const elapsed = now - GeminiLlm.lastCallTime;
    if (elapsed < minIntervalMs) {
      await sleep(minIntervalMs - elapsed);
    }
    GeminiLlm.lastCallTime = Date.now();
  }

  async structured<T>(args: { role: Role; system: string; prompt: string; schema: z.ZodType<T>; maxTokens?: number }): Promise<T> {
    const model = this.models[args.role];
    const jsonSchema = { ...(z.toJSONSchema(args.schema) as Record<string, unknown>) };
    delete jsonSchema.$schema;
    const { data, usedModel } = await this.callWithFallback(
      model,
      {
        systemInstruction: { parts: [{ text: args.system }] },
        contents: [{ role: "user", parts: [{ text: args.prompt }] }],
        generationConfig: {
          maxOutputTokens: args.maxTokens ?? 8000,
          responseMimeType: "application/json",
          responseJsonSchema: jsonSchema,
        },
      },
      args.role,
    );
    const cand = data.candidates?.[0];
    await this.onUsage({
      role: args.role,
      model: usedModel,
      inputTokens: data.usageMetadata?.promptTokenCount ?? 0,
      outputTokens: data.usageMetadata?.candidatesTokenCount ?? 0,
      webSearches: 0,
    });
    if (cand?.finishReason === "SAFETY" || cand?.finishReason === "PROHIBITED_CONTENT" || cand?.finishReason === "BLOCKLIST") {
      throw new Error(`${args.role}: model declined the request`);
    }
    if (cand?.finishReason === "MAX_TOKENS") throw new Error(`${args.role}: output cut off at max_tokens`);
    const raw = (cand?.content?.parts ?? []).map((p) => p.text ?? "").join("").trim();
    if (!raw) throw new Error(`${args.role}: no structured output returned`);
    return args.schema.parse(JSON.parse(raw));
  }

  async webResearch(args: { role: Role; system: string; prompt: string; maxSearches: number }) {
    const model = this.models[args.role];
    let data: GeminiResponse;
    let usedModel = model;
    try {
      const res = await this.callWithFallback(
        model,
        {
          systemInstruction: { parts: [{ text: args.system }] },
          contents: [{ role: "user", parts: [{ text: args.prompt }] }],
          tools: [{ google_search: {} }],
          generationConfig: { maxOutputTokens: 8000 },
        },
        args.role,
      );
      data = res.data;
      usedModel = res.usedModel;
    } catch (err) {
      // Free-tier Gemini keys may not have Google Search grounding quota enabled (429); degrade gracefully.
      if (err instanceof Error && (err.message.startsWith("Gemini 429:") || err.message.includes("429"))) {
        return { text: "", citations: [] };
      }
      throw err;
    }
    const cand = data.candidates?.[0];
    const gm = cand?.groundingMetadata;
    await this.onUsage({
      role: args.role,
      model: usedModel,
      inputTokens: data.usageMetadata?.promptTokenCount ?? 0,
      outputTokens: data.usageMetadata?.candidatesTokenCount ?? 0,
      webSearches: Math.min(args.maxSearches, gm?.webSearchQueries?.length ?? 0),
    });
    const text = (cand?.content?.parts ?? []).map((p) => p.text ?? "").join("");
    const citations = new Map<string, Citation>();
    for (const chunk of gm?.groundingChunks ?? []) {
      const url = chunk.web?.uri;
      if (url && !citations.has(url)) {
        citations.set(url, { url, title: chunk.web?.title ?? null, citedText: null });
      }
    }
    return { text, citations: [...citations.values()] };
  }

  private async callWithFallback(
    primary: string,
    body: Record<string, unknown>,
    role?: Role,
  ): Promise<{ data: GeminiResponse; usedModel: string }> {
    if (!this.apiKey) throw new Error("GEMINI_API_KEY (or AI_API_KEY) is not set");
    const allCandidates = [primary, ...GEMINI_FALLBACKS.filter((m) => m !== primary)];
    let candidates = allCandidates.filter((m) => !this.unavailableModels.has(m));
    if (candidates.length === 0) {
      this.unavailableModels.clear();
      candidates = allCandidates;
    }
    let lastError: unknown;
    let lastRateLimitError: unknown;
    for (let i = 0; i < candidates.length; i++) {
      const model = candidates[i]!;
      await this.pace(role);
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
      const res = await this.fetchImpl(url, {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": this.apiKey },
        body: JSON.stringify(body),
      });
      if (res.ok) return { data: (await res.json()) as GeminiResponse, usedModel: model };
      const text = (await res.text()).slice(0, 400);
      const err = new Error(`Gemini ${res.status}: ${text}`);
      lastError = err;
      if (res.status === 404) {
        this.unavailableModels.add(model);
        GeminiLlm.lastCallTime = 0;
        continue;
      }
      if (res.status === 429) {
        lastRateLimitError = err;
        if (/quota|free_tier_requests|per_day|perday/i.test(text)) {
          this.unavailableModels.add(model);
          GeminiLlm.lastCallTime = 0;
        }
      } else if (res.status !== 503) {
        throw err;
      }
    }
    throw lastRateLimitError ?? lastError;
  }
}

interface OpenAiChatResponse {
  choices?: {
    finish_reason?: string;
    message?: { content?: string | null };
  }[];
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
  };
}

/** OpenAI-compatible Chat Completions implementation (Groq, Cerebras, Mistral, OpenRouter, OpenAI, GitHub Models). */
export class OpenAiCompatibleLlm implements Llm {
  private unavailableModels = new Set<string>();

  constructor(
    private config: { name: string; endpoint: string; apiKey: string; models: string[] },
    private onUsage: (u: Usage) => Promise<void> | void = () => {},
    private fetchImpl: typeof fetch = fetch,
  ) {}

  async structured<T>(args: { role: Role; system: string; prompt: string; schema: z.ZodType<T>; maxTokens?: number }): Promise<T> {
    if (!this.config.apiKey) throw new Error(`${this.config.name} API key is not set`);
    const jsonSchema = { ...(z.toJSONSchema(args.schema) as Record<string, unknown>) };
    delete jsonSchema.$schema;

    let candidates = this.config.models.filter((m) => !this.unavailableModels.has(m));
    if (candidates.length === 0) {
      this.unavailableModels.clear();
      candidates = [...this.config.models];
    }

    let lastError: unknown;
    let lastRateLimitError: unknown;

    for (const model of candidates) {
      const res = await this.fetchImpl(this.config.endpoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model,
          max_tokens: Math.min(args.maxTokens ?? 8000, 8000),
          response_format: {
            type: "json_schema",
            json_schema: { name: "response", strict: false, schema: jsonSchema },
          },
          messages: [
            {
              role: "system",
              content: `${args.system}\n\nRespond ONLY with a single valid JSON object conforming to this JSON Schema:\n${JSON.stringify(jsonSchema)}`,
            },
            { role: "user", content: args.prompt },
          ],
        }),
      });

      if (res.ok) {
        const data = (await res.json()) as OpenAiChatResponse;
        const choice = data.choices?.[0];
        await this.onUsage({
          role: args.role,
          model: `${this.config.name.toLowerCase()}/${model}`,
          inputTokens: data.usage?.prompt_tokens ?? 0,
          outputTokens: data.usage?.completion_tokens ?? 0,
          webSearches: 0,
        });
        if (choice?.finish_reason === "length") {
          lastError = new Error(`${args.role}: output cut off at max_tokens`);
          continue;
        }
        const raw = (choice?.message?.content ?? "")
          .replace(/^```(?:json)?\s*/i, "")
          .replace(/\s*```$/i, "")
          .trim();
        if (!raw) {
          lastError = new Error(`${args.role}: no structured output returned`);
          continue;
        }
        try {
          return args.schema.parse(JSON.parse(raw));
        } catch (parseErr) {
          lastError = parseErr;
          continue;
        }
      }

      const text = (await res.text()).slice(0, 400);
      const err = new Error(`${this.config.name} ${res.status}: ${text}`);
      lastError = err;
      if (res.status === 401 || res.status === 403) {
        for (const m of this.config.models) this.unavailableModels.add(m);
        throw err;
      }
      if (res.status === 404) {
        this.unavailableModels.add(model);
        continue;
      }
      if (res.status === 429) {
        lastRateLimitError = err;
        this.unavailableModels.add(model);
        continue;
      }
      if (res.status !== 503 && res.status !== 529) {
        throw err;
      }
    }

    throw lastRateLimitError ?? lastError;
  }

  async webResearch(): Promise<{ text: string; citations: Citation[] }> {
    return { text: "", citations: [] };
  }
}
