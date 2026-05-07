# LAUNCH.md — Alojamento Montalegre

Production launch plan. Work through phases in order. Each phase has a prompt you can paste directly into Claude Code.

**Live preview:** https://alojamento-montalegre.vercel.app  
**Target domain:** https://alojamentomontalegre.com  
**Repo:** https://github.com/pedroalves-dv/alojamento-montalegre

---

## What's already done

- All 5 pages built and rendering (Home, Casa do Moinho, Casa do Castelo, Região, Contacto)
- Real property photos in place — no Unsplash placeholders
- All written content complete (PT + EN): descriptions, FAQ, region guide, amenities
- OG image generators working (dynamic, per page and locale)
- FAQ structured data (FAQPage JSON-LD) added
- Robots.ts blocks crawlers until `ALLOW_INDEXING=true` env var is set
- Favicon SVG with dark-mode switching + ICO fallback

---

## Phase 1 — Code polish (no client info needed)

**What:** Fix 2 hardcoded i18n strings, remove unused config from next.config.ts, image optimization.

**Prompt:**
```
In /home/sang/projects/alojamento-montalegre, fix the following:

1. BookingScoreBadge (src/components/ui/BookingScoreBadge.tsx) — the word "avaliações"
   is hardcoded in Portuguese. Add a "reviewsLabel" key to messages/pt.json ("avaliações")
   and messages/en.json ("reviews"), then update the component to use getTranslations or
   pass a translated label via props — check how other components in the project handle
   translation (most use getTranslations from next-intl/server).

2. RestaurantCallout (src/components/property/RestaurantCallout.tsx) — "No edifício · In-house"
   is hardcoded. Add a "restaurantLocation" key to both messages files
   (pt: "No edifício", en: "In-house"). Update the component to use it.

3. next.config.ts — remove the Unsplash hostname from images.remotePatterns. All images
   are local; this pattern is unused and shouldn't be in production config.

4. Image sizes in next/image — audit all uses of next/image across components and ensure:
   - The first/hero image on each page has the `priority` prop
   - Gallery and card images have appropriate `sizes` prop (not just default)
   - Largest images (casa-do-moinho originals are 2–4 MB) — check if Next.js image
     optimization is handling them correctly. If originals are > 1 MB, compress them
     with sharp (already installed as a Next.js dep): write a small script
     at scripts/compress-images.ts to batch-compress public/images/**/*.jpg to max 85
     quality and max 2400px wide, then run it.

Run `npm run build` after all changes to confirm no errors.
```

**Files touched:** `BookingScoreBadge.tsx`, `RestaurantCallout.tsx`, `messages/pt.json`, `messages/en.json`, `next.config.ts`, possibly `PropertyGallery.tsx`, `PropertyHero.tsx`, `HeroSection.tsx`, image files.

---

## Phase 2 — RNET registration numbers

**What:** Portuguese law (Decreto-Lei n.º 128/2014) requires the Alojamento Local registration number to appear on the website. Format: `AL/XXXX/XXXXX`. Ask your uncle/aunt for the registration numbers — they should have received them when registering with the Câmara Municipal.

**You need first:**
- [ ] RNET number for Casa do Moinho (format: `AL/XXXX/XXXXX`)
- [ ] RNET number for Casa do Castelo (format: `AL/XXXX/XXXXX`)

If they don't have one, they need to register at: https://rnt.turismodeportugal.pt

**Prompt:**
```
In /home/sang/projects/alojamento-montalegre, add RNET Alojamento Local registration
number support (legally required in Portugal):

1. Add `rnetNumber: string | null` to the Property type in src/types/property.ts

2. Add the values in src/data/properties.ts:
   - Casa do Moinho: rnetNumber: "[MOINHO_RNET_NUMBER]"
   - Casa do Castelo: rnetNumber: "[CASTELO_RNET_NUMBER]"

3. Show the number in the site footer bottom bar (src/components/layout/Footer.tsx),
   alongside the existing copyright text. Each property's number on its own line or
   separated by " · ". Style: text-xs text-fog/30. Only render numbers that are non-null.
   Example output: "AL/XXXX/XXXXX · AL/XXXX/XXXXX"

4. Also show it on each property detail page (src/components/property/PropertyDetailLayout.tsx
   or PropertyHero.tsx), in very small text near the location or at the bottom of the
   booking CTA section. Style: text-xs text-white/30.

Run `npm run build` after to confirm no TypeScript errors.
```

**Files touched:** `src/types/property.ts`, `src/data/properties.ts`, `src/components/layout/Footer.tsx`, one property component.

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

**Manual steps in Vercel dashboard (not Claude Code):**
1. Project → Settings → Domains → Add `alojamentomontalegre.com`
2. Set DNS: Vercel will give you either A records or nameservers to set at your domain registrar
3. Wait for SSL certificate (usually under 5 minutes once DNS propagates)
4. Settings → Environment Variables → Add:
   - Name: `ALLOW_INDEXING`
   - Value: `true`
   - Environment: **Production only** (not Preview, not Development)
5. Redeploy: Deployments → click the latest → Redeploy, or `git commit --allow-empty -m "trigger redeploy" && git push`

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

3. Check sitemap.ts — all URLs should start with config.siteUrl

4. Check robots.ts — confirm ALLOW_INDEXING check is in place and the sitemap URL
   is correct

5. Run `npm run build` and check for any warnings in the output related to metadata
   or missing image files

6. If everything is clean, update the LocalBusiness JSON-LD in
   src/app/[locale]/layout.tsx to include the real telephone number and a
   streetAddress if you have one (currently only addressLocality/addressRegion/Country)
```

**Files potentially touched:** `src/config.ts`, `src/app/[locale]/layout.tsx`.

---

## Phase 5 — Google Search Console + structured data audit

**What:** Submit the site to Google and verify all rich snippet data is valid.

**Manual steps:**
1. Go to https://search.google.com/search-console
2. Add property → URL prefix → `https://alojamentomontalegre.com`
3. Verify via DNS TXT record (easiest since you control the registrar already)
4. Submit sitemap: Sitemaps → Add → `https://alojamentomontalegre.com/sitemap.xml`

**Prompt:**
```
In /home/sang/projects/alojamento-montalegre, audit and improve the structured data:

1. Review the LodgingBusiness JSON-LD in src/app/[locale]/[slug]/page.tsx:
   - Confirm aggregateRating only renders when score AND reviewCount are both non-null
   - Add `numberOfRooms` field (use property.rooms)
   - Add `amenityFeature` array from property.amenities (use LocationFeatureSpecification type)
   - Add `checkinTime` and `checkoutTime` matching the FAQ answers ("15:00", "11:00")

2. Review the LocalBusiness JSON-LD in src/app/[locale]/layout.tsx:
   - Add `priceRange: "€€"` (mid-range rural accommodation signal)
   - Add `image` array with the first image of each property

3. Verify FAQPage schema in src/app/[locale]/page.tsx renders correctly:
   - All 6 questions and answers should appear in the JSON-LD output
   - Test at https://search.google.com/test/rich-results with the live URL

4. Run `npm run build` to confirm no errors.
```

**Files touched:** `src/app/[locale]/[slug]/page.tsx`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`.

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
- [ ] `ALLOW_INDEXING=true` set in Vercel (production only)
- [ ] `npm run build` passes with no errors
- [ ] No console errors on any page (open DevTools in Chrome)
- [ ] Site loads in under 3s on mobile — test at https://pagespeed.web.dev

### SEO
- [ ] `alojamentomontalegre.com/sitemap.xml` lists all pages correctly
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
| All PT strings | `messages/pt.json` |
| All EN strings | `messages/en.json` |
| Sitemap | `src/app/sitemap.ts` |
| Robots | `src/app/robots.ts` |
| LocalBusiness schema | `src/app/[locale]/layout.tsx` |
| Property schema | `src/app/[locale]/[slug]/page.tsx` |
| FAQ schema | `src/app/[locale]/page.tsx` |

---

*Last updated: 2026-05-07*
