/** Small fetch wrapper: timeout, a polite User-Agent, and retry on 429/5xx. */
export async function getJson<T>(
  url: string,
  opts: { timeoutMs?: number; retries?: number; headers?: Record<string, string> } = {},
): Promise<T> {
  const { timeoutMs = 20_000, retries = 2, headers: extraHeaders } = opts;
  const contact = process.env.CONTACT_EMAIL;
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          accept: "application/json",
          "user-agent": `AlexandersLibrary/0.1${contact ? ` (mailto:${contact})` : ""}`,
          ...extraHeaders,
        },
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (res.status === 429 || res.status >= 500) throw new RetryableError(`${res.status} from ${new URL(url).host}`);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText} from ${new URL(url).host}`);
      return (await res.json()) as T;
    } catch (err) {
      lastError = err;
      if (!(err instanceof RetryableError) && !(err instanceof Error && err.name === "TimeoutError")) throw err;
      await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
    }
  }
  throw lastError;
}

class RetryableError extends Error {}
