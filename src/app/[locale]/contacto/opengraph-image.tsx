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

  const eyebrow = seo.contacto.og.eyebrow![l];
  const headline = seo.contacto.og.headline[l];
  const subline = seo.contacto.og.subline[l];

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #2D4A2F 0%, #3D5C3A 60%, #2A3D2B 100%)",
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
              "radial-gradient(ellipse at 90% 10%, rgba(200,136,42,0.15) 0%, transparent 50%)",
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
              fontSize: 76,
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
            background: "#C8882A",
          }}
        />
      </div>
    ),
    size
  );
}
