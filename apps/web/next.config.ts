import type { NextConfig } from "next";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
try {
  process.loadEnvFile?.(join(root, ".env"));
} catch {}

const config: NextConfig = {
  // Workspace packages ship TypeScript source; Next compiles them.
  transpilePackages: ["@lib/agents", "@lib/core", "@lib/db"],
  serverExternalPackages: ["postgres"],
  outputFileTracingRoot: root,
  turbopack: { root },
  agentRules: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), camera=(), microphone=(), accelerometer=()" },
        ],
      },
    ];
  },
};

export default config;
