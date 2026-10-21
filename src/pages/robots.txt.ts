import type { APIRoute } from "astro";

// Crawling stays blocked until ALLOW_INDEXING=true is set for the production
// build (Worker → Settings → Build → Variables and secrets).
const isLive = process.env.ALLOW_INDEXING === "true";

export const GET: APIRoute = ({ site }) => {
  const body = isLive
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site)}\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
