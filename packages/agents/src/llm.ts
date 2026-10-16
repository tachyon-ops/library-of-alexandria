import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";

export type Role = "scout" | "reader" | "web" | "skeptic";
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

export const DEFAULT_MODELS: Record<Role, string> = {
  scout: "claude-sonnet-5-5",
  reader: "claude-haiku-5-5",
  web: "claude-sonnet-5-5",
  skeptic: "claude-opus-5-5",
};

export const DEFAULT_GEMINI_MODELS: Record<Role, string> = {
  scout: "gemini-3.6-flash",
  reader: "gemini-3.6-flash",
  web: "gemini-3.6-flash",
  skeptic: "gemini-3.6-flash",
};

const GEMINI_FALLBACKS = ["gemini-3.6-flash", "gemini-3-flash-preview", "gemini-3.8-flash"];

export function providerFromEnv(env = process.env): LlmProvider {
  const explicit = env.LLM_PROVIDER?.trim().toLowerCase();
  if (explicit === "gemini") return "gemini";
  if (explicit === "anthropic") return "anthropic";
  if (env.GEMINI_API_KEY && !env.ANTHROPIC_API_KEY) return "gemini";
  return "anthropic";
}

export function modelsFromEnv(env = process.env, provider = providerFromEnv(env)): Record<Role, string> {
  const defaults = provider === "gemini" ? DEFAULT_GEMINI_MODELS : DEFAULT_MODELS;
  return {
    scout: env.MODEL_SCOUT || defaults.scout,
    reader: env.MODEL_READER || defaults.reader,
    web: env.MODEL_WEB || defaults.web,
    skeptic: env.MODEL_SKEPTIC || defaults.skeptic,
  };
}

export function createLlm(onUsage: (u: Usage) => Promise<void> | void = () => {}, env = process.env): Llm {
  const provider = providerFromEnv(env);
  const models = modelsFromEnv(env, provider);
  if (provider === "gemini") {
    const apiKey = env.GEMINI_API_KEY || env.AI_API_KEY || "";
    return new GeminiLlm(models, onUsage, apiKey);
  }
  const apiKey = env.ANTHROPIC_API_KEY || env.AI_API_KEY;
  return new ClaudeLlm(models, onUsage, apiKey ? new Anthropic({ apiKey }) : undefined);
}

/** Claude API implementation: structured outputs for JSON, the server-side web search tool for the web. */
export class ClaudeLlm implements Llm {
  private client: Anthropic;

  constructor(
    private models: Record<Role, string> = modelsFromEnv(process.env, "anthropic"),
    private onUsage: (u: Usage) => Promise<void> | void = () => {},
    client?: Anthropic,
  ) {
    this.client = client ?? new Anthropic();
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
  constructor(
    private models: Record<Role, string> = modelsFromEnv(process.env, "gemini"),
    private onUsage: (u: Usage) => Promise<void> | void = () => {},
    private apiKey: string = process.env.GEMINI_API_KEY || process.env.AI_API_KEY || "",
    private fetchImpl: typeof fetch = fetch,
  ) {}

  async structured<T>(args: { role: Role; system: string; prompt: string; schema: z.ZodType<T>; maxTokens?: number }): Promise<T> {
    const model = this.models[args.role];
    const jsonSchema = { ...(z.toJSONSchema(args.schema) as Record<string, unknown>) };
    delete jsonSchema.$schema;
    const { data, usedModel } = await this.callWithFallback(model, {
      systemInstruction: { parts: [{ text: args.system }] },
      contents: [{ role: "user", parts: [{ text: args.prompt }] }],
      generationConfig: {
        maxOutputTokens: args.maxTokens ?? 8000,
        responseMimeType: "application/json",
        responseJsonSchema: jsonSchema,
      },
    });
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
      const res = await this.callWithFallback(model, {
        systemInstruction: { parts: [{ text: args.system }] },
        contents: [{ role: "user", parts: [{ text: args.prompt }] }],
        tools: [{ google_search: {} }],
        generationConfig: { maxOutputTokens: 8000 },
      });
      data = res.data;
      usedModel = res.usedModel;
    } catch (err) {
      // Free-tier Gemini keys may not have Google Search grounding quota enabled (429); degrade gracefully.
      if (err instanceof Error && err.message.startsWith("Gemini 429:")) {
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

  private async callWithFallback(primary: string, body: Record<string, unknown>): Promise<{ data: GeminiResponse; usedModel: string }> {
    if (!this.apiKey) throw new Error("GEMINI_API_KEY (or AI_API_KEY) is not set");
    const candidates = [primary, ...GEMINI_FALLBACKS.filter((m) => m !== primary)];
    let lastError: unknown;
    for (const model of candidates) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
      const res = await this.fetchImpl(url, {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": this.apiKey },
        body: JSON.stringify(body),
      });
      if (res.ok) return { data: (await res.json()) as GeminiResponse, usedModel: model };
      const text = (await res.text()).slice(0, 400);
      lastError = new Error(`Gemini ${res.status}: ${text}`);
      if (res.status !== 503 && res.status !== 404) throw lastError;
    }
    throw lastError;
  }
}
