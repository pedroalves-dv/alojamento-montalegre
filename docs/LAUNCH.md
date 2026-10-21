# LAUNCH.md — Alojamento Montalegre

Production launch plan. Work through phases in order. Each phase has a prompt you can paste directly into Claude Code.

**Hosting:** Cloudflare Workers, static assets (free plan; Vercel's free plan doesn't allow commercial sites)  
**Live:** https://alojamentomontalegre.com (indexing blocked until launch)  
**Target domain:** https://alojamentomontalegre.com  
**Repo:** https://github.com/pedroalves-dv/alojamento-montalegre

---

## What's already done

- All 5 pages built and rendering (Home, Casa do Moinho, Casa do Castelo, Região, Contacto)
- Real property photos in place — no Unsplash placeholders
- All written content complete (PT + EN): descriptions, FAQ, region guide, amenities
- OG image generators working (dynamic, per page and locale)
- FAQ structured data (FAQPage JSON-LD) added
- `src/pages/robots.txt.ts` blocks crawlers until the `ALLOW_INDEXING=true` env var is set at build time
- Favicon SVG with dark-mode switching + ICO fallback

---

## Phase 1 — Code polish ✅ (done in the Astro port, 2026-10-20)

The site was ported from Next.js to Astro (static output). Along the way: hardcoded strings
moved to messages, unused config removed, photos normalised (`npm run images`) and
optimised at build time (AVIF/WebP), and the review's bug list fixed.

---

## Phase 2 — RNET registration numbers

**What:** Portuguese law (Decreto-Lei n.º 128/2014) requires the Alojamento Local registration number to appear on the website. Format: `AL/XXXX/XXXXX`. Ask your uncle/aunt for the registration numbers — they should have received them when registering with the Câmara Municipal.

**You need first:**
- [ ] RNET number for Casa do Moinho (format: `AL/XXXX/XXXXX`)
- [ ] RNET number for Casa do Castelo (format: `AL/XXXX/XXXXX`)

If they don't have one, they need to register at: https://rnt.turismodeportugal.pt

**Prompt:**

```text
In /home/sang/projects/alojamento-montalegre, add RNET Alojamento Local registration
number support (legally required in Portugal):

1. Add `rnetNumber: string | null` to the Property type in src/types/property.ts

2. Add the values in src/data/properties.ts:
   - Casa do Moinho: rnetNumber: "[MOINHO_RNET_NUMBER]"
   - Casa do Castelo: rnetNumber: "[CASTELO_RNET_NUMBER]"

   (The field already exists as `licenseNumber`, and is already shown in the footer and
   in each property's "Check-in & Informações" section whenever it is non-null — only the
   Casa do Castelo value is still missing.)

Run `npm run build` after to confirm no TypeScript errors.
```

**Files touched:** `src/data/properties.ts`.

---

## Phase 3 — Real contact info + booking URLs

**What:** Replace all placeholder contact data with real values.

**You need first:**
- [ ] Real phone number (format: `+351 XXX XXX XXX`)
- [ ] WhatsApp number (digits only, e.g. `351912345678`) — usually same as phone
- [ ] Casa do Moinho Booking.com listing URL (or confirm `null` if not yet listed)
- [ ] Casa do Moinho Airbnb listing URL (or `null`)
- [ ] Casa do Castelo Booking.com listing URL (or `null`)
- [ ] Casa do Castelo Booking.com score + review count (or `null`)
- [ ] Casa do Castelo Airbnb listing URL (or `null`)

**Prompt:**
```
In /home/sang/projects/alojamento-montalegre, update contact info and booking URLs
with real values:

src/config.ts:
- whatsappNumber: "[DIGITS_ONLY]"  (e.g. 351912345678)
- phoneNumber: "[FORMATTED]"  (e.g. +351 912 345 678)

src/data/properties.ts — Casa do Moinho:
- booking.url: "[URL]" or null
- airbnbUrl: "[URL]" or null

src/data/properties.ts — Casa do Castelo:
- booking.url: "[URL]" or null
- booking.score: "[SCORE]" or null  (e.g. "9.2")
- booking.reviewCount: [COUNT] or null
- airbnbUrl: "[URL]" or null

After updating:
1. Verify all WhatsApp hrefs are correctly formed: `https://wa.me/[whatsappNumber]`
   (no +, no spaces, no dashes)
2. Verify the phone tel: link strips spaces correctly
3. Run `npm run build`
4. Test the floating WhatsApp button, the footer phone link, and the property
   booking CTA — confirm they all use the real number
```

**Files touched:** `src/config.ts`, `src/data/properties.ts`.

---

## Phase 4 — Pre-launch domain connection

**What:** Connect the real domain and flip the indexing switch.

Order matters for SEO: domain first, then a single address, then indexing — once, at launch.

**Done (2026-10-21):**
- ✅ Custom domain `alojamentomontalegre.com` on the Worker (Worker → Domains). DNS record and
  certificate were created automatically.
- ✅ `www`: Redirect Rule `http*://www.alojamentomontalegre.com/*` → `https://alojamentomontalegre.com/${2}`
  (301, query string preserved), plus a proxied `AAAA www 100::` record so the rule receives the traffic.
- ✅ `"workers_dev": false` in `wrangler.jsonc`: the workers.dev address no longer serves the site.
- Always Use HTTPS (SSL/TLS → Edge Certificates) so `http://` redirects to `https://`.

**At launch (when the site is final, new photos in):**
1. Worker → Settings → Build → Variables and secrets → Add `ALLOW_INDEXING` = `true`.
   It is a **build** variable — robots.txt is generated at build time.
2. Redeploy: Deployments → latest → Retry build, or
   `git commit --allow-empty -m "trigger redeploy" && git push`. Check that
   `alojamentomontalegre.com/robots.txt` now says `Allow: /` and links the sitemap, then do Phase 5.

**If you still own `alojamentodomoinho.pt`:**
- At your `.pt` registrar, set up URL forwarding (301) from `alojamentodomoinho.pt` → `https://alojamentomontalegre.com`
- This recaptures any remaining bookmarks or old backlinks

**Prompt (after domain is live):**
```
In /home/sang/projects/alojamento-montalegre, run a pre-launch domain audit:

1. Confirm src/config.ts siteUrl is exactly "https://alojamentomontalegre.com"
   (no trailing slash, correct protocol)

2. Audit every generateMetadata call across all page files — confirm all canonical,
   openGraph.url, and alternates.languages URLs use config.siteUrl as the base

3. Check the generated dist/sitemap-0.xml — all URLs should start with the site URL

4. Check src/pages/robots.txt.ts — confirm ALLOW_INDEXING check is in place and the sitemap URL
   is correct

5. Run `npm run build` and check for any warnings in the output related to metadata
   or missing image files

6. If everything is clean, update the LocalBusiness JSON-LD in
   src/layouts/BaseLayout.astro to include the real telephone number and a
   streetAddress if you have one (currently only addressLocality/addressRegion/Country)
```

**Files potentially touched:** `src/config.ts`, `astro.config.mjs` (`site`), `src/layouts/BaseLayout.astro`.

---

## Phase 5 — Google Search Console + structured data audit

**What:** Submit the site to Google and verify all rich snippet data is valid.

**Manual steps:**
1. Go to https://search.google.com/search-console
2. Add property → URL prefix → `https://alojamentomontalegre.com`
3. Verify via DNS TXT record (easiest since you control the registrar already)
4. Submit sitemap: Sitemaps → Add → `https://alojamentomontalegre.com/sitemap-index.xml`

Already done in the Astro port: `numberOfRooms`, `amenityFeature`, `occupancy`, per-property
`checkinTime`/`checkoutTime` (from properties.ts) and `priceRange` (`src/lib/schema.ts`).
No `aggregateRating`: the scores come from Booking.com, and Google doesn't allow ratings
sourced from other sites. What's left is validating the live
URLs at https://search.google.com/test/rich-results once the domain is connected.

---

## Phase 6 — Google Business Profile (manual, no Claude Code)

**What:** The single highest-impact SEO action. Creates the listing that shows in Google Maps and the local knowledge panel.

**Steps:**
1. Go to https://business.google.com → Add Business
2. Create **two separate listings** (one per property):

**Casa do Moinho:**
- Business name: `Casa do Moinho — Alojamento Montalegre`
- Category: Holiday Home (primary), Vacation Rental
- Address: exact address of the property
- Phone: real phone number
- Website: `https://alojamentomontalegre.com/pt/casa-do-moinho`
- Description: copy the Portuguese tagline + first sentence of description from properties.ts
- Photos: upload all 6 property photos from public/images/casa-do-moinho/

**Casa do Castelo:**
- Same process with Casa do Castelo data
- Website: `https://alojamentomontalegre.com/pt/casa-do-castelo`
- Photos: all 8 images from public/images/casa-do-castelo/

**After verification (usually 1-2 weeks by postcard or video call):**
- Ask first guests to leave a Google review — link them directly to the GBP "Write a review" URL
- Respond to every review (Google rewards engagement)

---

## Phase 7 — Booking platform listings (ongoing, manual)

**Booking.com (if not yet listed):**
1. Register at https://join.booking.com
2. Fill out property details — use the descriptions and amenities from properties.ts
3. In listing → website: link to the specific property page
4. Once live, get the listing URL → update `booking.url` in properties.ts (Phase 3)

**Airbnb (if not yet listed):**
1. Register at https://www.airbnb.com/host/homes
2. Same process — fill in details from properties.ts
3. Add website URL to listing
4. Once live, update `airbnbUrl` in properties.ts

**Regional directories (free backlinks, worth 30 min each):**
- CM Montalegre: https://www.cm-montalegre.pt — email to request tourism listing
- Terras de Barroso: search for their tourism portal, submit via contact form
- Visit Trás-os-Montes: similar submission

---

## Final launch checklist

Run through this before announcing the live domain publicly:

### Contact & links
- [ ] Phone number is real and click-to-call works on mobile
- [ ] WhatsApp button opens chat to real number (test on phone)
- [ ] Booking.com links open real listings (or buttons hidden if null)
- [ ] Floating WhatsApp button works

### Legal
- [ ] RNET number(s) visible in footer
- [ ] Cookie/privacy notice in footer is accurate

### Technical
- [ ] Domain connected, SSL green (`https://`)
- [ ] `ALLOW_INDEXING=true` set as a Worker build variable, after the domain is live
- [ ] `npm run build` passes with no errors
- [ ] No console errors on any page (open DevTools in Chrome)
- [ ] Site loads in under 3s on mobile — test at https://pagespeed.web.dev

### SEO
- [ ] `alojamentomontalegre.com/sitemap-index.xml` lists all pages correctly
- [ ] `alojamentomontalegre.com/robots.txt` allows crawling
- [ ] Sitemap submitted to Google Search Console
- [ ] Google Business Profile created for both properties

### Content
- [ ] All FAQ answers confirmed accurate with your aunt/uncle
- [ ] Property descriptions verified (capacities, amenities, details)
- [ ] Images loading and sharp (no broken images)

### Print
- [ ] Ctrl+P on a property page shows clean print layout (navbar/footer hidden, key info visible)

---

## Files reference

| Purpose | File |
|---|---|
| Site URL, phone, WhatsApp | `src/config.ts` |
| Property data | `src/data/properties.ts` |
| FAQ content | `src/data/faq.ts` |
| Region content | `src/data/regiao.ts` |
| Page titles / descriptions / OG text | `src/data/seo.ts` |
| All PT / EN UI strings | `src/i18n/pt.json`, `src/i18n/en.json` |
| Photos (masters) | `src/assets/images/` — add new ones with `npm run images -- <folder>` |
| Sitemap | `@astrojs/sitemap` in `astro.config.mjs` (generates `sitemap-index.xml`) |
| Robots | `src/pages/robots.txt.ts` |
| OG images | `src/pages/og/[locale]/[page].png.ts` |
| LocalBusiness schema | `src/layouts/BaseLayout.astro` |
| Property / FAQ / breadcrumb schema | `src/lib/schema.ts` |
| Redirect `/` → `/pt`, cache headers | `public/_redirects`, `public/_headers` |

---

*Last updated: 2026-10-20*
