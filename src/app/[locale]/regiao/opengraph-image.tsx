import { ImageResponse } from "next/og";
import { seo } from "@/data/seo";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = locale as "pt" | "en";

  const eyebrow = seo.regiao.og.eyebrow![l];
  const headline = seo.regiao.og.headline[l];
  const subline = seo.regiao.og.subline[l];

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(160deg, #2D4A2F 0%, #1E3420 50%, #2A3820 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 20% 80%, rgba(74,107,124,0.18) 0%, transparent 55%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            position: "relative",
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
            {eyebrow}
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 700,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              color: "rgba(245,242,236,0.65)",
              fontSize: 22,
              maxWidth: 700,
            }}
          >
            {subline}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#4A6B7C",
          }}
        />
      </div>
    ),
    size
  );
}
