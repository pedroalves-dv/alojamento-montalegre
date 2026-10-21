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

Hosted on Cloudflare Workers as static assets (free plan, commercial use allowed), built from GitHub on every push to `main`
(Workers Builds: build command `npm run build`, deploy command `npx wrangler deploy`; Node from `.node-version`).
`wrangler.jsonc` serves `dist/` with no Worker code and no Astro adapter — keep it, or `wrangler deploy` auto-configures one.
`public/_redirects` adds the `/` → `/pt` redirect and `public/_headers` long-lived caching for hashed assets plus `noindex`
on the workers.dev address (switched off in `wrangler.jsonc`; the custom domain is the only address); clean URLs (`/pt/regiao` from `regiao.html`) are the Workers default.
Search engines are blocked until the `ALLOW_INDEXING=true` **build** variable is set (Worker → Settings → Build).
`npm run build && npx wrangler dev` serves the build with the same routing as production. See `docs/LAUNCH.md` for the full launch checklist.
