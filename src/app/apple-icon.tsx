import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const size = {
  width: 180,
  height: 180,
};

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
          backgroundColor: "#07080c",
          borderRadius: "36px",
          border: "4px solid #f59e0b",
        }}
      >
        <div
          style={{
            fontSize: "84px",
            fontWeight: 900,
            color: "#f59e0b",
            fontFamily: "monospace",
          }}
        >
          SK
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
