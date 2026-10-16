"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Alexander's Library server-side exception:", error);
  }, [error]);

  return (
    <main className="error-boundary-view" style={{ padding: "4rem clamp(16px, 4vw, 40px)", maxWidth: "720px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>Unable to load topic record</h1>
      <p style={{ color: "var(--muted)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
        The scientific record could not be formatted for display. This can occur when autonomous background research is actively reshaping the database branch or if an indexed item is malformed.
      </p>
      {error.digest && (
        <p className="muted small" style={{ marginBottom: "1.5rem" }}>
          Reference digest: <code>{error.digest}</code>
        </p>
      )}
      <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap" }}>
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
        <Link href="/" className="muted small">
          ← Return to Alexander&rsquo;s Library
        </Link>
      </div>
    </main>
  );
}
