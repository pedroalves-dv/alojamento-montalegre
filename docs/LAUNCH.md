# LAUNCH.md — Alojamento Montalegre

Production launch plan. Work through phases in order. Each phase has a prompt you can paste directly into Claude Code.

**Hosting:** Cloudflare Workers, static assets (free plan; Vercel's free plan doesn't allow commercial sites)  
**Live:** https://alojamentomontalegre.pt (indexing blocked until launch)  
**Main domain:** https://alojamentomontalegre.pt — `alojamentomontalegre.com` 301s to it  
**Repo:** https://github.com/pedroalves-dv/alojamento-montalegre

---

## What's already done

- All 5 pages built and rendering (Home, Casa do Moinho, Casa do Castelo, Região, Contacto)
- Real property photos in place — no Unsplash placeholders
- All written content complete (PT + EN): descriptions, FAQ, region guide, amenities
- OG images generated per page and locale, as ~100 KB JPEGs (small enough for WhatsApp previews)
- FAQ structured data (FAQPage JSON-LD) added
- `src/pages/robots.txt.ts` blocks crawlers until the `ALLOW_INDEXING=true` env var is set at build time
- Favicon SVG with dark-mode switching + ICO fallback, and `apple-touch-icon.png` (180 px) for iPhones
- Security headers in `public/_headers` (nosniff, referrer policy, no framing, HSTS for one year)

**Pre-launch review ✅ (2026-11-02):** W3C validator 0 errors on every page type; Lighthouse
mobile 100 in accessibility, best practices and SEO (SEO checked with indexing on); all internal
and external links working; keyboard navigation checked; a house page prints on 2 pages with
all amenities, address and phone. Mobile LCP ~2.9 s on Lighthouse-style slow 4G at 3× DPR,
CLS 0. Re-run Lighthouse and the validator after the new photos go in.

---

## Phase 1 — Code polish ✅ (done in the Astro port, 2026-10-20)

The site was ported from Next.js to Astro (static output). Along the way: hardcoded strings
moved to messages, unused config removed, photos normalised (`npm run images`) and
optimised at build time (AVIF/WebP), and the review's bug list fixed.

---

## Phase 2 — RNET registration numbers

**What:** Portuguese law requires each house's registration number on the website. The two
houses are registered differently:

- **Casa do Moinho** is *Alojamento Local* (DL 128/2014): number ends in `/AL`.
- **Casa do Castelo** is an *Empreendimento Turístico* — Turismo no Espaço Rural, "Casa de Campo"
  (DL 39/2008), per its Alvará de Autorização de Utilização n.º 15/10 (Câmara de Montalegre,
  2010). Its number is an **RNET** number from Turismo de Portugal, not the alvará number and not
  an `/AL` number. Look it up on the public register https://rnt.turismodeportugal.pt (RNET →
  search concelho Montalegre), or ask the operating company's accountant. Shown on the site as
  `RNET n.º <number>`.

- ✅ Casa do Moinho: `120536/AL`
- ✅ Casa do Castelo: `RNET n.º 5723` (see [legal/README.md](legal/README.md))

**To add it:** set `licenseNumber: "<number>"` on Casa do Castelo in `src/data/properties.ts` and run
`npm run build`. It then shows up in the footer and in the house's "Check-in & Informações"
section automatically.

---

## Phase 3 — Real contact info + booking URLs

- ✅ Site phone / WhatsApp: `+351 935 663 060` (`src/config.ts`)
- ✅ Casa do Moinho: Booking.com link + score, Google reviews link
- ✅ Casa do Castelo: Google reviews link
- ✅ Casa do Castelo: bookings on the landline `+351 276 511 237` only, no WhatsApp (owner's
  choice: `whatsappMessage: null`). Its page, its contact card and its schema use the landline;
  the site-wide footer keeps the main mobile / WhatsApp.
- [ ] Casa do Castelo Booking.com URL / score / review count, if listed (now `null`: button hidden)
- [ ] Airbnb URLs for either house, if listed (now `null`)

All in `src/data/properties.ts`. After changing a number, run `npm run build` and test the
WhatsApp button, the phone link and the booking button on a phone.

---

## Phase 4 — Pre-launch domain connection

**What:** Connect the real domain and flip the indexing switch.

Order matters for SEO: domain first, then a single address, then indexing — once, at launch.

**Done (2026-11-02): `alojamentomontalegre.pt` is the main address.** Registered at OVH,
nameservers on Cloudflare (`elaine` / `jim`), DNSSEC off.
- ✅ Custom domain `alojamentomontalegre.pt` on the Worker (`routes` in `wrangler.jsonc`). DNS
  record and certificate were created automatically.
- ✅ `www.alojamentomontalegre.pt`: proxied `AAAA www 100::` + Redirect Rule → apex (301, path and
  query kept).
- ✅ `.pt` mail: null MX, `v=spf1 -all`, `_dmarc` `p=reject` (the .pt sends and receives no mail).
- ✅ `alojamentomontalegre.com` (apex + `www`): proxied `AAAA 100::` records + Redirect Rule →
  `https://alojamentomontalegre.pt${path}` (301, query kept). Its email routing is unchanged.
- ✅ `"workers_dev": false`; Always Use HTTPS on both zones.
- ✅ Min TLS 1.2 on both zones.
- ✅ DNSSEC on the `.pt`: signed by Cloudflare, DS record at OVH (DS records tab: key tag 2371,
  flag 257, algorithm 13). **If the `.pt` ever leaves Cloudflare, delete that DS record at OVH
  first**, or the domain stops resolving.
- ✅ WHOIS: the .pt registry already hides a private holder's details (owner fields are blank),
  so OVH's "Data protection" panel is empty for `.pt` — nothing to do.
- [ ] At OVH, optional: cancel the MX Plan / Zimbra and the OVH DNS zone on the `.pt` (unused now).

**Careful:** a deploy detaches every custom domain that is not in `wrangler.jsonc` `routes`, and
deletes its DNS record. That briefly took `.com` offline during the switch (2026-11-02, ~5 min).
Never add the `.com` back to `routes`: it only needs its `AAAA 100::` record for the redirect.

**At launch (when the site is final, new photos in):**
1. Worker → Settings → Build → Variables and secrets → Add `ALLOW_INDEXING` = `true`.
   It is a **build** variable — robots.txt is generated at build time.
2. Redeploy: Deployments → latest → Retry build, or
   `git commit --allow-empty -m "trigger redeploy" && git push`. Check that
   `alojamentomontalegre.pt/robots.txt` now says `Allow: /` and links the sitemap, then do Phase 5.

**If you still own `alojamentodomoinho.pt`:**
- At your `.pt` registrar, set up URL forwarding (301) from `alojamentodomoinho.pt` → `https://alojamentomontalegre.pt`
- This recaptures any remaining bookmarks or old backlinks

**Pre-launch audit ✅ (2026-10-21, on the .com before the .pt switch — re-run on the .pt before launch):**
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
2. Add property → URL prefix → `https://alojamentomontalegre.pt`
3. Verify via DNS TXT record (easiest since you control the registrar already)
4. Submit sitemap: Sitemaps → Add → `https://alojamentomontalegre.pt/sitemap-index.xml`

Done (`src/lib/schema.ts`): each house is a `LodgingBusiness` with `numberOfRooms`,
`amenityFeature`, `checkinTime`/`checkoutTime` and `priceRange` (from properties.ts), linked by
`@id` to the site-wide `LocalBusiness`. Not `VacationRental`: Google only uses it for its
partner programme, and it needs listing ids we don't have. Each house's search title and
description are `seo` in properties.ts. FAQPage markup is on the home page only.
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
- Website: `https://alojamentomontalegre.pt/pt/casa-do-moinho`
- Description: copy the Portuguese tagline + first sentence of description from properties.ts
- Photos: upload the photos from src/assets/images/casa-do-moinho/

**Casa do Castelo:**
- Same process with Casa do Castelo data
- Website: `https://alojamentomontalegre.pt/pt/casa-do-castelo`
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

## Before launch — on-site visit

To check in person, then add to `src/data/properties.ts` (and the photos with `npm run images`).
Indexing stays off until all of this is done.

**Casa do Castelo** (4 rooms, 70 €/room/night, no pets: already on the site)
- [ ] Each room: beds (2 singles, or a double?), view, anything special. Then add a room list to the page.
- [ ] Photos of each room, the bathrooms, the terrace and the restaurant.
- [ ] Find the source of `casa-do-castelo/0.jpg` (castle photo, no EXIF): credit it or replace it.

**Casa do Moinho** (5 rooms, 10 guests)
- [ ] Bed layout per room (believed to be a double in each). Then add a "where you sleep" list.
- [ ] New photos (exterior, every bedroom, bathrooms, kitchen, living room with the fireplace).

**Policies**
- [ ] Booking.com: check the Casa do Moinho listing's cancellation policy. The site's FAQ gives the
  direct-booking policy (free up to 14 days, then the first night) and says Booking.com bookings
  follow the conditions on the booking. Ideally make both the same.

---

## Final launch checklist

Run through this before announcing the live domain publicly:

### Contact & links
- [ ] Phone number is real and click-to-call works on mobile
- [ ] WhatsApp button opens chat to real number (test on phone)
- [ ] Booking.com links open real listings (or buttons hidden if null)
- [ ] Availability form on Casa do Moinho opens WhatsApp with dates and guests filled in (test on phone)

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
- [ ] `alojamentomontalegre.pt/sitemap-index.xml` lists all pages correctly
- [ ] `alojamentomontalegre.pt/robots.txt` allows crawling
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
| Page titles / descriptions / OG text | `src/data/seo.ts` (house pages: `seo` in `src/data/properties.ts`) |
| All PT / EN UI strings | `src/i18n/pt.json`, `src/i18n/en.json` |
| Photos (masters) | `src/assets/images/` — add new ones with `npm run images -- <folder>` |
| Sitemap | `@astrojs/sitemap` in `astro.config.mjs` (generates `sitemap-index.xml`) |
| Robots | `src/pages/robots.txt.ts` |
| OG images | `src/pages/og/[locale]/[page].jpg.ts` |
| LocalBusiness schema | `src/layouts/BaseLayout.astro` |
| Property / FAQ / breadcrumb schema | `src/lib/schema.ts` |
| Redirect `/` → `/pt`, cache headers | `public/_redirects`, `public/_headers` |

---

*Last updated: 2026-11-02*
