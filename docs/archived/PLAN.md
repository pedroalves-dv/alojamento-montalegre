## What to implement

### 1. Indicative pricing on property pages

This is the biggest conversion gap. People won't enquire without a price signal.

- Add `priceFrom: number | null` (€/night) and `currency: string` to the Property type in `src/types/property.ts`
- Add values to both properties in `src/data/properties.ts` — use `null` for now if unknown, but add the field
- In `src/components/property/PropertyDetailLayout.tsx`, show a price pill in the key facts bar (alongside capacity, rooms, location): "A partir de €X / noite" (PT) / "From €X / night" (EN). Only render when non-null.
- Add i18n keys `priceFrom` to both message files: PT "A partir de €{price} / noite", EN "From €{price} / night"
- Also show it on the `PropertyCard` component on the homepage, below the tagline

### 2. Minimum stay + peak season visibility on property pages

This info exists in the FAQ but not on the property page where decisions are made.

- Add `minStay: number` and `minStayPeakSeason: number | null` to the Property type
- Add values to both properties (2 nights standard, 3 in peak season per the FAQ)
- Display a small info strip just above the booking CTA section in `PropertyDetailLayout` — something like: "Estadia mínima: 2 noites · Época alta (jul–ago): 3 noites" — style it as a subtle `text-sm text-granite/60` line, not a warning box
- Add i18n keys: `minStayLabel`, `minStayPeakLabel`, `minStayNote` (compose the full sentence in the component from the data, don't hardcode the sentence)

### 3. "Nearby" distances section on property pages

A short, scannable list of distances that grounds the location for someone unfamiliar with the area. Highly relevant for SEO (location + landmark co-occurrence).

- Add `nearby: { label: { pt: string; en: string }; distance: { pt: string; en: string } }[]` to the Property type
- Populate for both properties in `properties.ts`. Suggested entries for Casa do Moinho: Parque Nacional Peneda-Gerês (~45 min), Barragem do Alto Rabagão (~20 min), Braga (~1h30), Porto (~2h), Montalegre centro (~5 min). For Casa do Castelo: Castelo de Montalegre (2 min a pé / 2 min walk), Parque Nacional Peneda-Gerês (~45 min), Barragem do Alto Rabagão (~20 min), Braga (~1h30), Porto (~2h).
- Add a "Nearby" / "Nas proximidades" section in `PropertyDetailLayout`, placed between Amenities and Location. Clean icon-list layout — location pin icon, label, distance. No map, no links, just the strip.
- Add i18n key `nearbyHeading`: PT "Nas proximidades", EN "Nearby"

### 4. Distances on region page sections

Each section in `src/data/regiao.ts` should show how far it is from the houses, grounding the content for the visitor.

- Add `distance: { pt: string; en: string } | null` to the `RegiaoSection` type in `src/types/regiao.ts`
- Populate for each section in `regiao.ts` (approximate drive times from Montalegre): Montalegre castle: null (it's in town), Gerês: ~45 min, Alto Rabagão: ~20 min, Trilhos/Serra do Larouco: ~10–30 min depending on trailhead, Feira do Fumeiro: null (in town), Festival das Bruxas: null (in town), Gastronomia: null (general)
- In `src/components/region/RegionSection.tsx`, render the distance as a small pill/badge next to the section title when non-null: "~45 min de Montalegre" / "~45 min from Montalegre". Style: `text-xs text-granite/50 border border-gray-200 px-2 py-0.5 rounded-full`

### 5. "Practical info" strip on the region page

A compact, honest "what to know before you go" block — the kind of local knowledge that builds trust and reduces post-booking surprises. Place it between the alternating content sections and the seasonal guide.

- Add a new static section in `src/app/[locale]/regiao/page.tsx` (no new data file needed — hardcode via i18n keys)
- Content items (add to both message files under the `Regiao` namespace):
  - `practicalHeading`: PT "Antes de partir", EN "Before You Go"
  - `practicalCar`: PT "Carro indispensável — os transportes públicos não cobrem a região", EN "A car is essential — public transport does not reach this area"
  - `practicalSignal`: PT "Sinal móvel limitado fora das localidades — descarregue mapas offline", EN "Mobile signal is limited outside villages — download offline maps"
  - `practicalWater`: PT "Rios e ribeiros de água fria mesmo no verão — ideal para mergulho e pesca", EN "Rivers and streams run cold even in summer — ideal for swimming and fishing"
  - `practicalWeather`: PT "Invernos rigorosos com neve ocasional nas serras; verões amenos com noites frescas", EN "Harsh winters with occasional snow at altitude; mild summers with cool nights"
  - `practicalLanguage`: PT "O inglês é pouco falado fora das atrações principais — umas palavras em português fazem maravilha", EN "English is rarely spoken outside main attractions — a few words of Portuguese go a long way"
- Render as a clean 2-column grid of cards (icon + text), consistent with the existing site aesthetic (bg-white border border-gray-200 rounded-xl)
- Icons: car, signal/wifi-off, water-drop/waves, cloud, chat-bubble — use inline SVGs consistent with the rest of the codebase (no icon library)

### 6. Property address visibility

Google's local SEO rewards visible address on LodgingBusiness pages. Currently the address only exists in JSON-LD, not on the page.

- Add `address: { pt: string; en: string }` to the Property type
- Add realistic values: Casa do Moinho something like "Montalegre, Trás-os-Montes, Portugal" (use the real address if available, otherwise the town-level one)
- Display it in the key facts bar in `PropertyDetailLayout`, alongside location — or replace the existing `location` display with the more specific address. Keep it minimal: just the text with a map-pin icon, no link needed (the iframe map below already handles that)
- Also include it in the JSON-LD `address.streetAddress` field in `src/app/[locale]/[slug]/page.tsx`

### 7. SEO: keywords metadata on property pages

The homepage and region pages have `keywords` in `generateMetadata`; the property detail pages don't.

- In `src/app/[locale]/[slug]/page.tsx`, add a `keywords` array to the returned Metadata object
- Generate it dynamically from property data: property name, slug, location, "montalegre", "alojamento", "turismo rural", "casa de férias", "northern portugal", "trás-os-montes" — compose sensibly, don't stuff
- Add a `keywords: { pt: string[]; en: string[] }` field to the Property type and populate it in `properties.ts` for both properties

### 8. SEO: checkinTime + checkoutTime in JSON-LD

The LAUNCH.md already flags this. The check-in/check-out times are in the FAQ but missing from the LodgingBusiness schema.

- In `src/app/[locale]/[slug]/page.tsx`, add `checkinTime: "15:00"` and `checkoutTime: "11:00"` to the LodgingBusiness JSON-LD object
- Also add `numberOfRooms: property.rooms` to the same object

### 9. SEO: amenityFeature in JSON-LD

- In the same JSON-LD object, add an `amenityFeature` array built from `property.amenities[l]`, using the `LocationFeatureSpecification` schema type:
```json
  { "@type": "LocationFeatureSpecification", "name": "WiFi", "value": true }
```
- Map each amenity string to this shape

---

## Constraints

- All UI strings go in messages/pt.json and messages/en.json — nothing hardcoded in components
- All new data fields go in the relevant TypeScript data files and types
- No new npm packages
- Maintain the existing visual language: font-serif for headings, text-granite/70 for body, bg-fog for light sections, border-gray-200 for dividers
- Run `npm run build` after all changes to confirm no TypeScript errors
- Do not touch: animations (Framer Motion), the Navbar, the Footer, the FloatingWhatsAppButton, the BookingScoreBadge component, or the OG image generators