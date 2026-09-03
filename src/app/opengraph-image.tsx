import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Shiv Kant Dhakre — Full Stack Engineer | AI • Backend • Mobile";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#07080c",
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          color: "#f3f4f6",
          fontFamily: "system-ui, -apple-system, sans-serif",
          border: "2px solid rgba(245, 158, 11, 0.3)",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* Top telemetry bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#f59e0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "24px",
                color: "#000000",
                fontFamily: "monospace",
              }}
            >
              SK
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "3px",
                  color: "#ffffff",
                  fontFamily: "monospace",
                }}
              >
                SHIV KANT DHAKRE
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  fontFamily: "monospace",
                }}
              >
                SYSTEM ARCHITECTURE &amp; PRODUCTION AI
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "999px",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              color: "#34d399",
              fontSize: "12px",
              fontFamily: "monospace",
              fontWeight: 700,
            }}
          >
            AVAILABLE FOR HIGH-IMPACT ROLES
          </div>
        </div>

        {/* Center Main Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 900,
              letterSpacing: "-2px",
              lineHeight: 1.05,
              textTransform: "uppercase",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>SHIV KANT</span>
            <span
              style={{
                background: "linear-gradient(90deg, #f59e0b, #fbbf24, #06b6d4)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              DHAKRE
            </span>
          </div>

          <p
            style={{
              fontSize: "22px",
              fontWeight: 400,
              color: "#9ca3af",
              maxWidth: "850px",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            Full-Stack Engineer building resilient production systems, multi-tenant ERPs, concurrency engines &amp; machine learning pipelines.
          </p>
        </div>

        {/* Bottom Verified Technical Tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[
              "Next.js",
              "NestJS",
              "Redis",
              "BullMQ",
              "PostgreSQL",
              "React Native",
              "Hugging Face",
              "Gemini AI",
            ].map((tech) => (
              <div
                key={tech}
                style={{
                  fontSize: "13px",
                  fontFamily: "monospace",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#d1d5db",
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <span
            style={{
              fontSize: "12px",
              fontFamily: "monospace",
              color: "#f59e0b",
            }}
          >
            github.com/shivkantdhakre
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
