import { ImageResponse } from "next/og";
import { properties } from "@/data/properties";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  const l = locale as "pt" | "en";

  const name = property?.name[l] ?? "Alojamento Montalegre";
  const tagline = property?.tagline[l] ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #2D4A2F 0%, #3D5C3A 50%, #2A3D2B 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            color: "#C8882A",
            fontSize: 16,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          ALOJAMENTO MONTALEGRE
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 80,
              lineHeight: 1.0,
              fontWeight: 700,
            }}
          >
            {name}
          </div>
          {tagline ? (
            <div
              style={{
                color: "rgba(245,242,236,0.70)",
                fontSize: 26,
                fontStyle: "italic",
              }}
            >
              {tagline}
            </div>
          ) : null}
          <div
            style={{
              color: "rgba(245,242,236,0.50)",
              fontSize: 18,
              marginTop: 4,
            }}
          >
            Montalegre · Terras de Barroso · Portugal
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#C8882A",
          }}
        />
      </div>
    ),
    size
  );
}
