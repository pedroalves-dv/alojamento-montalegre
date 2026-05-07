import type { MetadataRoute } from "next";
import { config } from "@/config";

// Set ALLOW_INDEXING=true in Vercel env vars only after the real domain is connected.
const isLive = process.env.ALLOW_INDEXING === "true";

export default function robots(): MetadataRoute.Robots {
  if (!isLive) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${config.siteUrl}/sitemap.xml`,
  };
}
