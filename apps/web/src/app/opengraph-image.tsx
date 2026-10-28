import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@lib/core";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const tiers = [
    { code: "T1", label: "Meta-analyses, systematic reviews & clinical guidelines", width: "100%", color: "#1d4ed8" },
    { code: "T2", label: "Replicated randomised controlled trials (n >= 100)", width: "84%", color: "#2563eb" },
    { code: "T3", label: "Large cohort, registry & case-control studies", width: "68%", color: "#3b82f6" },
    { code: "T4", label: "Small clinical studies, case series & reports", width: "52%", color: "#60a5fa" },
    { code: "T5", label: "Preclinical animal, cellular & computational models", width: "36%", color: "#93c5fd" },
    { code: "T6", label: "Expert commentary, frontier hypotheses & news", width: "22%", color: "#bfdbfe" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f4ef",
          color: "#191918",
          padding: "56px 68px",
          borderLeft: "18px solid #1d4ed8",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "2px solid #dedad0",
              paddingBottom: "18px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                fontSize: 18,
                color: "#575653",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Ex Libris · Bibliotheca Alexandrina
            </span>
            <span
              style={{
                fontSize: 16,
                color: "#1d4ed8",
                fontWeight: 700,
                background: "#dbeafe",
                padding: "6px 14px",
                borderRadius: "999px",
              }}
            >
              Open Scientific Synthesis · T1–T6 Graded
            </span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#191918",
              marginBottom: "16px",
            }}
          >
            {SITE_NAME}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 26,
              lineHeight: 1.38,
              color: "#44433f",
              maxWidth: "980px",
            }}
          >
            The search for the elixir of youth — what humanity’s open scientific record says across biomedicine,
            physics, mathematics, and quantitative finance, and how strongly.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "9px",
            background: "#efece4",
            padding: "22px 28px",
            borderRadius: "10px",
            border: "1px solid #dedad0",
          }}
        >
          {tiers.map((t) => (
            <div
              key={t.code}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <span
                style={{
                  width: "40px",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#191918",
                }}
              >
                {t.code}
              </span>
              <div
                style={{
                  display: "flex",
                  width: "320px",
                  height: "12px",
                  background: "#e2ded4",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: t.width,
                    height: "100%",
                    background: t.color,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 16,
                  color: "#44433f",
                }}
              >
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
