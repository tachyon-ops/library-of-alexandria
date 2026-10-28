import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#191918",
          borderRadius: "6px",
          borderLeft: "5px solid #1d4ed8",
          color: "#f6f4ef",
          fontSize: 20,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          letterSpacing: "-0.03em",
        }}
      >
        A
      </div>
    ),
    { ...size },
  );
}
