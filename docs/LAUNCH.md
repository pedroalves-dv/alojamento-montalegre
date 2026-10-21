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

**What:** Portuguese law (Decreto-Lei n.º 128/2014) requires the Alojamento Local registration number to appear on the website. Ask your uncle/aunt — they received it when registering with the Câmara Municipal. Not registered yet? https://rnt.turismodeportugal.pt

- ✅ Casa do Moinho: `120536/AL`
- [ ] Casa do Castelo: **still missing** (format like `120536/AL`)

**To add it:** set `licenseNumber: "<number>"` on Casa do Castelo in `src/data/properties.ts` and run
`npm run build`. It then shows up in the footer and in the house's "Check-in & Informações"
section automatically.

---

## Phase 3 — Real contact info + booking URLs

- ✅ Site phone / WhatsApp: `+351 935 663 060` (`src/config.ts`)
- ✅ Casa do Moinho: Booking.com link + score, Google reviews link
- ✅ Casa do Castelo: Google reviews link
- [ ] Casa do Castelo phone: which number its page shows (now `+351 276 511 237`, also in its schema)
- [ ] Casa do Castelo Booking.com URL / score / review count, if listed (now `null`: button hidden)
- [ ] Airbnb URLs for either house, if listed (now `null`)

All in `src/data/properties.ts`. After changing a number, run `npm run build` and test the
WhatsApp button, the phone link and the booking button on a phone.

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
- ✅ Always Use HTTPS (SSL/TLS → Edge Certificates): `http://` 301s to `https://`.

**At launch (when the site is final, new photos in):**
1. Worker → Settings → Build → Variables and secrets → Add `ALLOW_INDEXING` = `true`.
   It is a **build** variable — robots.txt is generated at build time.
2. Redeploy: Deployments → latest → Retry build, or
   `git commit --allow-empty -m "trigger redeploy" && git push`. Check that
   `alojamentomontalegre.com/robots.txt` now says `Allow: /` and links the sitemap, then do Phase 5.

**If you still own `alojamentodomoinho.pt`:**
- At your `.pt` registrar, set up URL forwarding (301) from `alojamentodomoinho.pt` → `https://alojamentomontalegre.com`
- This recaptures any remaining bookmarks or old backlinks

**Pre-launch audit ✅ (2026-10-21, read-only; indexing still blocked):**
- `npm run build`: 0 errors, 0 warnings.
- Every indexable page has a canonical, `pt-PT` / `en` / `x-default` hreflang and `og:url` on
  `https://alojamentomontalegre.com`; `/creditos`, the 404 page and `/` are `noindex`.
- Sitemap: 10 URLs (5 pages × 2 locales), all on the domain, with hreflang pairs.
- Live: `http://` and `www` → 301 to the apex (query kept); `/` → 302 to `/pt`;
  `/pt/regiao/` → 307 to `/pt/regiao`; unknown URL → 404; OG images 200.
- `robots.txt` serves `Disallow: /`.
- JSON-LD: LocalBusiness telephone set; each house has its street address and phone.

Re-run before launch day only if the code changes a lot in the meantime.

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
- Photos: upload the photos from src/assets/images/casa-do-moinho/

**Casa do Castelo:**
- Same process with Casa do Castelo data
- Website: `https://alojamentomontalegre.com/pt/casa-do-castelo`
- Photos: the photos from src/assets/images/casa-do-castelo/

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

## Email

The site shows no email address on purpose: bookings go by phone / WhatsApp.

**Current setup (Cloudflare → Email Routing):**
- `info@alojamentomontalegre.com` → forwarded to `alojamentomontalegre@gmail.com` (created for the
  business, not in use yet). Catch-all is off: mail to any other address is dropped.
- Nothing sends mail *from* the domain.
- ✅ DMARC `p=reject` (2026-10-21): `_dmarc` TXT `v=DMARC1; p=reject;`. Mail claiming to be from
  @alojamentomontalegre.com is rejected, which blocks fake "confirm your booking" emails.
  Forwarding *to* Gmail is not affected.

**When the family wants a professional address** (e.g. `reservas@`), the free route is:
1. Email Routing rule `reservas@` → the Gmail they actually read (uncle: the Casa do Moinho Gmail).
2. In that Gmail: Settings → Accounts → "Send mail as" `reservas@alojamentomontalegre.com`.
3. **Before sending from it**, update DNS or Gmail's mail will be rejected by our own DMARC:
   - SPF: `v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all`
   - Optionally relax DMARC to `p=none` for a few weeks, check nothing legitimate fails, then back to `p=reject`.

Google Workspace (~€7/user/month) only if they want a separate inbox.

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

*Last updated: 2026-10-21*
