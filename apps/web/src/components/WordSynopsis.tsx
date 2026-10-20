"use client";

import { useEffect, useRef, useState } from "react";
import {
  candidateLookupForms,
  lookupGlossaryTerm,
  selectBestDictionaryDefinition,
  type GlossaryEntry,
  type RemoteDefinitionCandidate,
} from "@lib/core";

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

function extractSelectionContext(target: HTMLElement, sel: Selection | null): string {
  const pieces: string[] = [];
  const pageTitle = document.querySelector("h1")?.textContent?.trim();
  if (pageTitle) pieces.push(pageTitle);

  const section = target.closest("section, article");
  const sectionHeading = section?.querySelector("h2, h3, .monograph-section-kicker")?.textContent?.trim();
  if (sectionHeading && sectionHeading !== pageTitle) {
    pieces.push(sectionHeading);
  }

  const block = target.closest("p, li, blockquote, td, dd, figcaption, h1, h2, h3, h4");
  const blockText = block?.textContent?.trim() || sel?.anchorNode?.parentElement?.textContent?.trim();
  if (blockText) {
    pieces.push(blockText.slice(0, 600));
  }

  return pieces.join(" — ");
}

async function fetchDictionaryDefinition(
  raw: string,
  context: string,
  signal: AbortSignal,
): Promise<GlossaryEntry | null> {
  const forms = candidateLookupForms(raw);
  if (forms.length === 0) return null;

  const trimmedExact = raw.trim().replace(/^[^a-zA-Z0-9-]+|[^a-zA-Z0-9-]+$/g, "");
  const lookupQueue = trimmedExact && !forms.includes(trimmedExact) ? [trimmedExact, ...forms] : forms;

  const cacheKey = `${forms[0]!}:${context.slice(0, 120).toLowerCase()}`;
  const cached = REMOTE_CACHE.get(cacheKey);
  if (cached) return cached;

  const candidates: RemoteDefinitionCandidate[] = [];

  // 1. Try Free Dictionary API across candidate forms (exact word first, then base lemma)
  for (const form of lookupQueue.slice(0, 3)) {
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(form)}`, {
        signal,
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (Array.isArray(data)) {
        for (const item of data) {
          const resolvedWord = (item?.word as string | undefined) ?? form;
          const etymology = (item?.origin as string | undefined) || undefined;
          const meanings = Array.isArray(item?.meanings) ? item.meanings : [];
          for (const meaning of meanings) {
            const partOfSpeech = (meaning?.partOfSpeech as string | undefined) ?? "term";
            const defs = Array.isArray(meaning?.definitions) ? meaning.definitions : [];
            for (const d of defs.slice(0, 3)) {
              const defText = typeof d?.definition === "string" ? d.definition.trim() : "";
              if (defText) {
                candidates.push({ word: resolvedWord, partOfSpeech, definition: defText, etymology });
              }
            }
          }
        }
        const best = selectBestDictionaryDefinition(raw, candidates, context);
        if (best) {
          REMOTE_CACHE.set(cacheKey, best);
          return best;
        }
      }
    } catch {
      if (signal.aborted) return null;
    }
  }

  // 2. Fallback to English Wiktionary REST API
  for (const form of lookupQueue.slice(0, 3)) {
    try {
      const res = await fetch(`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(form)}`, {
        signal,
      });
      if (!res.ok) continue;
      const data = await res.json();
      const enList = data?.en;
      if (Array.isArray(enList)) {
        for (const block of enList) {
          const partOfSpeech = (block?.partOfSpeech as string | undefined)?.toLowerCase() ?? "term";
          const defs = Array.isArray(block?.definitions) ? block.definitions : [];
          for (const d of defs.slice(0, 3)) {
            const cleanDef = typeof d?.definition === "string" ? stripHtml(d.definition) : "";
            if (cleanDef.length > 5) {
              candidates.push({ word: form, partOfSpeech, definition: cleanDef });
            }
          }
        }
        const best = selectBestDictionaryDefinition(raw, candidates, context);
        if (best) {
          REMOTE_CACHE.set(cacheKey, best);
          return best;
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

      const context = extractSelectionContext(target, sel);
      const localMatch = lookupGlossaryTerm(raw, context);
      if (!localMatch) return;

      // Render local scientific or dictionary entry immediately (zero wait time), anchored to document coordinates
      setState({ word: raw, entry: localMatch, left, top, width: cardWidth, placeAbove });

      const isMorphologicalSynthesis = Boolean(localMatch.etymology?.startsWith("Morphology:"));
      const isCuratedScientific =
        !localMatch.domain.startsWith("Lexicon") &&
        localMatch.domain !== "Scientific Terminology" &&
        !isMorphologicalSynthesis;
      if (isCuratedScientific) {
        return;
      }

      // If it fell back to the generic grammatical/morphological analyzer, enrich from live dictionary APIs using passage context
      const isGenericFallback =
        isMorphologicalSynthesis ||
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

      void fetchDictionaryDefinition(raw, context, controller.signal).then((remoteEntry) => {
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
