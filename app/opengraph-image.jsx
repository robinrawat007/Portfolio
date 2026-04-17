import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Robin Singh Rawat — AI Generalist & Full Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tags = ["React", "Next.js", "Claude API", "RAG", "n8n", "TypeScript"];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#020617",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Purple blob */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 700,
            height: 700,
            background: "rgba(123,79,224,0.28)",
            borderRadius: "50%",
            filter: "blur(140px)",
          }}
        />
        {/* Teal blob */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 550,
            height: 550,
            background: "rgba(45,207,207,0.18)",
            borderRadius: "50%",
            filter: "blur(140px)",
          }}
        />

        {/* Avatar */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #7B4FE0 0%, #2DCFCF 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: 800,
            color: "white",
            marginBottom: 28,
            flexShrink: 0,
          }}
        >
          RR
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 62,
            fontWeight: 800,
            color: "white",
            letterSpacing: "-2px",
            textAlign: "center",
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          Robin Singh Rawat
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 26,
            color: "#94a3b8",
            textAlign: "center",
            marginBottom: 36,
          }}
        >
          AI Generalist & Full Stack Engineer
        </div>

        {/* Tech tags */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 20px",
                background: "rgba(123,79,224,0.18)",
                border: "1px solid rgba(123,79,224,0.45)",
                borderRadius: 999,
                color: "#c4b5fd",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
