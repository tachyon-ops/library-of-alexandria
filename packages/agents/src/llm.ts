import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import type { z } from "zod";

export type Role = "scout" | "reader" | "web" | "skeptic";

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
 * the SDK, so the pipeline can be tested with a scripted stand-in.
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

export function modelsFromEnv(env = process.env): Record<Role, string> {
  return {
    scout: env.MODEL_SCOUT || DEFAULT_MODELS.scout,
    reader: env.MODEL_READER || DEFAULT_MODELS.reader,
    web: env.MODEL_WEB || DEFAULT_MODELS.web,
    skeptic: env.MODEL_SKEPTIC || DEFAULT_MODELS.skeptic,
  };
}

/** Claude API implementation: structured outputs for JSON, the server-side web search tool for the web. */
export class ClaudeLlm implements Llm {
  private client: Anthropic;

  constructor(
    private models: Record<Role, string> = modelsFromEnv(),
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
