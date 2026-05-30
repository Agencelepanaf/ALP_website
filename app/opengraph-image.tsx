import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#111110",
          padding: "64px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Bande accent en haut */}
        <div
          style={{
            width: "80px",
            height: "6px",
            backgroundColor: "#C8553D",
            borderRadius: "3px",
          }}
        />

        {/* Contenu central */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Nom de l'agence */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: "800",
              color: "#FFFFFF",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            Le Panaf
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: "400",
              color: "#C8553D",
              letterSpacing: "-0.5px",
            }}
          >
            Agence de présence digitale à Casablanca
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "22px",
              fontWeight: "300",
              color: "#9A9A96",
              lineHeight: 1.5,
              maxWidth: "700px",
            }}
          >
            Sites web performants pour les PME et startups ambitieuses
            en Afrique et en Europe.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              color: "#5C5C5A",
              letterSpacing: "0.5px",
            }}
          >
            agencelepanaf.com
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "#2D4A3E",
              backgroundColor: "#1C1C1A",
              padding: "8px 20px",
              borderRadius: "999px",
              border: "1px solid #2A2A28",
            }}
          >
            Maroc · Afrique · Europe
          </div>
        </div>
      </div>
    ),
    size
  );
}
