import type { NextConfig } from "next";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
try {
  process.loadEnvFile?.(join(root, ".env"));
} catch {}

const config: NextConfig = {
  // Workspace packages ship TypeScript source; Next compiles them.
  transpilePackages: ["@lib/core", "@lib/db"],
  serverExternalPackages: ["postgres"],
  outputFileTracingRoot: root,
  turbopack: { root },
  agentRules: false,
};

export default config;
