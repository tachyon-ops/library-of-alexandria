import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#191918",
          borderLeft: "20px solid #1d4ed8",
          color: "#f6f4ef",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          A
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 6,
            fontSize: 13,
            letterSpacing: "0.18em",
            color: "#93c5fd",
            textTransform: "uppercase",
          }}
        >
          T1 · T6
        </div>
      </div>
    ),
    { ...size },
  );
}
