import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#101010",
          color: "#f3f3f3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#f2f5f8",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 32, color: "#9c9c9c" }}>megaumka.dev</div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          Строим современные сайты, которые еще и выдержат аудит.
        </div>
        <div style={{ fontSize: 28, color: "#9c9c9c", marginTop: 32 }}>
          Команда фуллстек-разработчиков и пентестеров (OSCP) - Астана
        </div>
      </div>
    ),
    { ...size }
  );
}
