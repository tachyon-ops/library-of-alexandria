---
name: architecture-boundaries
description: Hard architectural rules for Alexander's Library — package isolation, the functional core, the single LLM door, and where side effects may live. Use before adding a file, an import, or a new responsibility to any package.
---

# Architecture boundaries

The design rests on four separations. Each one exists so a part can be replaced or tested alone.

## 1. Functional core

`packages/core` is pure: no `fetch`, no database, no `process.env`, no clock-dependent logic beyond what a caller passes in. Grading, normalisation and types live here because they must be identical in the worker, the web front and the tests.

## 2. One place per side effect

| Side effect | Only allowed in |
| --- | --- |
| SQL | `packages/db/src/repo.ts` (and migrations) |
| HTTP to research sources | `packages/crawlers` adapters, through `getJson` in `http.ts` |
| Model calls | `packages/agents/src/llm.ts` (`ClaudeLlm`) |
| Reading environment variables | `apps/worker` (`configFromEnv`, `modelsFromEnv` called from there), `apps/web` server code, `packages/db/src/client.ts` |
| Orchestration (who calls what, in which order) | `apps/worker/src/handlers.ts` |

If a change needs a side effect elsewhere, add a function in the owning package and call it.

## 3. The `Llm` interface is the only door to a model

Agents receive an `Llm` (`structured`, `webResearch`) and never import the Anthropic SDK. This keeps prompts testable with `ScriptedLlm` (see `tests/pipeline.test.ts`) and lets the provider change without touching agent code.

## 4. Adapters and agents are leaf modules

- An adapter takes a query and returns `SourceRecord[]`. It knows nothing about topics or claims.
- An agent takes plain inputs and returns validated, index-checked outputs. It never sees database ids; it works with list indexes, and the handler maps indexes back to ids.

## Stable APIs

The public surface of each package is its `src/index.ts`. Import from `@lib/<pkg>`, never from a deep path such as `@lib/db/src/repo`. Changing an exported signature is a breaking change: update every caller in the same change and say so in the commit message.

## Checks before finishing

- No new import breaks the dependency arrows in `codebase-map`.
- `npm run typecheck` and the web typecheck pass.
- New behaviour has a test at the lowest layer that can hold it (core > parser > pipeline).
