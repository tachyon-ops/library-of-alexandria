"use client";

import { useEffect, useRef, useState } from "react";
import { lookupGlossaryTerm, type GlossaryEntry } from "@lib/core";

interface PopoverState {
  word: string;
  entry: GlossaryEntry | null;
  loading: boolean;
  x: number;
  y: number;
}

export function WordSynopsis() {
  const [state, setState] = useState<PopoverState | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDblClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("input, textarea, button, select, canvas, .word-synopsis-popover")) {
        return;
      }

      const sel = window.getSelection();
      const raw = sel ? sel.toString().trim() : "";
      if (!raw || raw.length < 2 || raw.length > 48) return;

      let x = e.clientX;
      let y = e.clientY + 14;
      if (sel && sel.rangeCount > 0) {
        const rect = sel.getRangeAt(0).getBoundingClientRect();
        if (rect.width > 0 || rect.height > 0) {
          x = rect.left + rect.width / 2;
          y = rect.bottom + 10;
        }
      }

      const localMatch = lookupGlossaryTerm(raw);
      if (localMatch && localMatch.domain !== "Scientific Terminology") {
        setState({ word: raw, entry: localMatch, loading: false, x, y });
        return;
      }

      // Show morphological fallback immediately if present, and check public dictionary for general words
      setState({ word: raw, entry: localMatch, loading: !localMatch, x, y });

      const clean = raw
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/^[^a-z0-9-]+|[^a-z0-9-]+$/g, "");

      if (!clean || clean.length < 2) return;

      let cancelled = false;
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(clean)}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (cancelled) return;
          if (Array.isArray(data) && data[0]?.meanings?.[0]?.definitions?.[0]?.definition) {
            const firstMeaning = data[0].meanings[0];
            const def = firstMeaning.definitions[0].definition as string;
            const partOfSpeech = (firstMeaning.partOfSpeech as string | undefined) ?? "Term";
            setState((prev) =>
              prev && prev.word === raw
                ? {
                    ...prev,
                    loading: false,
                    entry: {
                      term: (data[0].word as string) || raw,
                      domain: localMatch ? localMatch.domain : `Lexicon (${partOfSpeech})`,
                      synopsis: def,
                      whyItMatters: localMatch?.whyItMatters,
                      etymology: localMatch?.etymology ?? (data[0].origin as string | undefined),
                    },
                  }
                : prev,
            );
          } else {
            setState((prev) => (prev && prev.word === raw ? { ...prev, loading: false } : prev));
          }
        })
        .catch(() => {
          if (!cancelled) {
            setState((prev) => (prev && prev.word === raw ? { ...prev, loading: false } : prev));
          }
        });

      return () => {
        cancelled = true;
      };
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setState(null);
    };

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && !target.closest(".word-synopsis-popover")) {
        setState(null);
      }
    };

    document.addEventListener("dblclick", onDblClick);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("dblclick", onDblClick);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  if (!state) return null;

  const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
  const vh = typeof window !== "undefined" ? window.innerHeight : 768;
  const cardWidth = Math.min(360, vw - 24);
  const left = Math.max(12, Math.min(state.x - cardWidth / 2, vw - cardWidth - 12));
  const top = state.y + 220 > vh ? Math.max(12, state.y - 210) : Math.max(12, state.y);

  return (
    <div
      ref={cardRef}
      className="word-synopsis-popover"
      role="dialog"
      aria-label={`Synopsis for ${state.entry?.term ?? state.word}`}
      aria-live="polite"
      style={{ left: `${left}px`, top: `${top}px`, width: `${cardWidth}px` }}
    >
      <div className="synopsis-header">
        <div>
          <strong className="synopsis-term">{state.entry?.term ?? state.word}</strong>
          {state.entry?.domain && <span className="synopsis-domain">{state.entry.domain}</span>}
        </div>
        <button
          type="button"
          className="synopsis-close"
          onClick={() => setState(null)}
          aria-label="Close synopsis"
        >
          ×
        </button>
      </div>

      {state.loading ? (
        <p className="synopsis-body muted small" role="status">
          Looking up plain-language synopsis…
        </p>
      ) : state.entry ? (
        <div className="synopsis-content">
          <p className="synopsis-body">{state.entry.synopsis}</p>
          {state.entry.whyItMatters && (
            <p className="synopsis-context">
              <strong>Why it matters:</strong> {state.entry.whyItMatters}
            </p>
          )}
          {state.entry.etymology && (
            <p className="synopsis-etymology muted small">
              <strong>Roots:</strong> {state.entry.etymology}
            </p>
          )}
        </div>
      ) : (
        <p className="synopsis-body muted small">
          No specialised glossary entry found for &ldquo;{state.word}&rdquo;. Try double-clicking a scientific or clinical term (e.g., <em>autologous</em>, <em>oocyte</em>, <em>euploid</em>, <em>spermidine</em>, <em>spindle</em>).
        </p>
      )}
    </div>
  );
}
