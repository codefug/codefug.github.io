import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Codefug Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#6C47FF",
      }}
    >
      <svg
        width="280"
        height="280"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Codefug"
      >
        <title>Codefug</title>
        <polyline
          points="20,30 52,50 20,70"
          stroke="white"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line
          x1="58"
          y1="70"
          x2="82"
          y2="70"
          stroke="white"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>
    </div>,
    { ...size },
  );
}
