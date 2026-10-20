# Alojamento Montalegre

Brochure site for two rural holiday houses in Montalegre, Portugal — <https://alojamentomontalegre.com>.

Static site built with [Astro](https://astro.build) + Tailwind CSS 4, in Portuguese (`/pt`, default) and English (`/en`).
No CMS, no database, no client framework: content lives in typed data files and the output is plain HTML.

## Commands

| Command | |
|---|---|
| `npm run dev` | Dev server at http://localhost:4321 |
| `npm run build` | Type-check (`astro check`) and build to `dist/` |
| `npm run preview` | Serve the built site |
| `npm run images -- <folder>` | Normalise new photos into `src/assets/images` (auto-rotate, max 2400px, JPEG) |

Requires Node 22.12+.

## Where things live

- **Content** — `src/data/` (properties, FAQ, region, SEO text) and `src/config.ts` (phone, WhatsApp)
- **UI strings** — `src/i18n/pt.json`, `src/i18n/en.json` (keep the keys identical)
- **Pages** — `src/pages/[locale]/` (home, `[slug]` for each house, `regiao`, `contacto`)
- **Photos** — `src/assets/images/`, referenced from the data files as `/images/...`; Astro generates AVIF/WebP at build time
- **OG images** — generated at build time by `src/pages/og/[locale]/[page].png.ts`

## Deploying

Vercel detects Astro automatically; `vercel.json` adds the `/` → `/pt` redirect, clean URLs and long-lived caching for hashed assets.
Search engines are blocked until `ALLOW_INDEXING=true` is set for the **production** build. See `docs/LAUNCH.md` for the full launch checklist.
