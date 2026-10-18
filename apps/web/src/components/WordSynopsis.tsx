"use client";

import { useEffect, useRef, useState } from "react";
import { candidateLookupForms, lookupGlossaryTerm, type GlossaryEntry } from "@lib/core";

interface PopoverState {
  word: string;
  entry: GlossaryEntry;
  left: number;
  top: number;
  width: number;
  placeAbove: boolean;
}

const REMOTE_CACHE = new Map<string, GlossaryEntry>();

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchDictionaryDefinition(raw: string, signal: AbortSignal): Promise<GlossaryEntry | null> {
  const forms = candidateLookupForms(raw);
  if (forms.length === 0) return null;

  const cacheKey = forms[0]!;
  const cached = REMOTE_CACHE.get(cacheKey);
  if (cached) return cached;

  // 1. Try Free Dictionary API across candidate forms (exact word first, then base lemma)
  for (const form of forms.slice(0, 3)) {
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(form)}`, {
        signal,
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (Array.isArray(data) && data[0]?.meanings?.[0]?.definitions?.[0]?.definition) {
        const firstMeaning = data[0].meanings[0];
        const def = String(firstMeaning.definitions[0].definition).trim();
        const partOfSpeech = (firstMeaning.partOfSpeech as string | undefined) ?? "term";
        const resolvedWord = (data[0].word as string | undefined) ?? form;
        const entry: GlossaryEntry = {
          term: raw.trim().replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "") || resolvedWord,
          domain: `Dictionary (${partOfSpeech})`,
          synopsis: form !== forms[0] ? `${def} (Base form: "${resolvedWord}".)` : def,
          etymology: (data[0].origin as string | undefined) || undefined,
        };
        REMOTE_CACHE.set(cacheKey, entry);
        return entry;
      }
    } catch {
      if (signal.aborted) return null;
    }
  }

  // 2. Fallback to English Wiktionary REST API
  for (const form of forms.slice(0, 2)) {
    try {
      const res = await fetch(`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(form)}`, {
        signal,
      });
      if (!res.ok) continue;
      const data = await res.json();
      const enList = data?.en;
      if (Array.isArray(enList) && enList[0]?.definitions?.[0]?.definition) {
        const firstBlock = enList[0];
        const rawDef = String(firstBlock.definitions[0].definition);
        const cleanDef = stripHtml(rawDef);
        if (cleanDef.length > 5) {
          const partOfSpeech = (firstBlock.partOfSpeech as string | undefined)?.toLowerCase() ?? "term";
          const entry: GlossaryEntry = {
            term: raw.trim().replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "") || form,
            domain: `Dictionary (${partOfSpeech})`,
            synopsis: cleanDef,
          };
          REMOTE_CACHE.set(cacheKey, entry);
          return entry;
        }
      }
    } catch {
      if (signal.aborted) return null;
    }
  }

  return null;
}

export function WordSynopsis() {
  const [state, setState] = useState<PopoverState | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

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

      const scrollX = window.scrollX || document.documentElement.scrollLeft || 0;
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const vw = document.documentElement.clientWidth || window.innerWidth || 1024;
      const vh = window.innerHeight || 768;
      const cardWidth = Math.min(360, vw - 24);

      let clientCenterX = e.clientX;
      let clientTop = e.clientY - 10;
      let clientBottom = e.clientY + 14;

      if (sel && sel.rangeCount > 0) {
        const rect = sel.getRangeAt(0).getBoundingClientRect();
        if (rect.width > 0 || rect.height > 0) {
          clientCenterX = rect.left + rect.width / 2;
          clientTop = rect.top;
          clientBottom = rect.bottom;
        }
      }

      const placeAbove = clientBottom + 220 > vh && clientTop > 180;
      const left = scrollX + Math.max(12, Math.min(clientCenterX - cardWidth / 2, vw - cardWidth - 12));
      const top = placeAbove ? scrollY + clientTop - 8 : scrollY + clientBottom + 8;

      abortRef.current?.abort();

      const localMatch = lookupGlossaryTerm(raw);
      if (!localMatch) return;

      // Render local scientific or dictionary entry immediately (zero wait time), anchored to document coordinates
      setState({ word: raw, entry: localMatch, left, top, width: cardWidth, placeAbove });

      const isCuratedScientific =
        !localMatch.domain.startsWith("Lexicon") && localMatch.domain !== "Scientific Terminology";
      if (isCuratedScientific) {
        return;
      }

      // If it fell back to the generic grammatical/morphological analyzer, enrich from live dictionary APIs
      const isGenericFallback =
        localMatch.synopsis.startsWith("English term (") ||
        localMatch.synopsis.startsWith("In a manner characterized by") ||
        localMatch.synopsis.startsWith("The action, process, or resulting state") ||
        localMatch.synopsis.startsWith("The quality, condition, or degree") ||
        localMatch.synopsis.startsWith("Capable of or suitable for") ||
        localMatch.synopsis.startsWith("Relating to, characterized by") ||
        localMatch.synopsis.startsWith("Present participle or gerund") ||
        localMatch.synopsis.startsWith("Past tense or participial") ||
        localMatch.synopsis.startsWith("Plural or third-person singular") ||
        localMatch.domain === "Scientific Terminology";

      if (!isGenericFallback) {
        return;
      }

      const controller = new AbortController();
      abortRef.current = controller;

      void fetchDictionaryDefinition(raw, controller.signal).then((remoteEntry) => {
        if (!remoteEntry || controller.signal.aborted) return;
        setState((prev) =>
          prev && prev.word === raw
            ? {
                ...prev,
                entry: {
                  term: localMatch.term,
                  domain: remoteEntry.domain,
                  synopsis: remoteEntry.synopsis,
                  whyItMatters: localMatch.whyItMatters,
                  etymology: localMatch.etymology ?? remoteEntry.etymology,
                },
              }
            : prev,
        );
      });
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        abortRef.current?.abort();
        setState(null);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && !target.closest(".word-synopsis-popover")) {
        abortRef.current?.abort();
        setState(null);
      }
    };

    document.addEventListener("dblclick", onDblClick);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      abortRef.current?.abort();
      document.removeEventListener("dblclick", onDblClick);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  if (!state) return null;

  return (
    <div
      ref={cardRef}
      className="word-synopsis-popover"
      role="dialog"
      aria-label={`Synopsis for ${state.entry.term}`}
      aria-live="polite"
      style={{
        left: `${state.left}px`,
        top: `${state.top}px`,
        width: `${state.width}px`,
        transform: state.placeAbove ? "translateY(-100%)" : undefined,
      }}
    >
      <div className="synopsis-header">
        <div>
          <strong className="synopsis-term">{state.entry.term}</strong>
          {state.entry.domain && <span className="synopsis-domain">{state.entry.domain}</span>}
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
    </div>
  );
}
