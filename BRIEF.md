Alojamento Montalegre — Claude Code Brief
1. Project Overview
Alojamento Montalegre is a two-property rural tourism rental site in Montalegre, Terras de Barroso, northern Portugal. The goal is a clean, beautiful, conversion-focused brochure site. Visitors should find the houses, trust the quality, and contact the owner via WhatsApp, phone, or Booking.com.
Domain: alojamentomontalegre.com
Keep it simple: No CMS, no database, no custom booking engine. All content lives in static TypeScript data files. Deployed to Vercel.

2. Tech Stack
LayerChoiceFrameworkNext.js (App Router), TypeScriptStylingTailwind CSS + CSS custom propertiesAnimationFramer Motion (subtle only — hero entrance + scroll fades)i18nnext-intl — PT (default) + EN, path-based /pt/ /en/Imagesnext/image + Unsplash placeholdersDeploymentVercel
No CMS. No database. No booking engine. No Mapbox. Keep dependencies minimal.

3. Brand & Design System
Shares visual language with sister site Natur Barroso.
Colour Palette
css--color-forest:  #2D4A2F;   /* primary — deep forest green */
--color-moss:    #3D5C3A;   /* primary variant */
--color-amber:   #C8882A;   /* accent — golden hour */
--color-granite: #2A2A28;   /* neutral dark */
--color-fog:     #F5F2EC;   /* light background */
--color-river:   #4A6B7C;   /* secondary accent — slate blue */
Typography

Display/Headings: Instrument Serif — Google Fonts via next/font/google
Body/UI: Stack — local font via next/font/local from the project root. Do not load from any CDN.

tsimport localFont from 'next/font/local'

export const stack = localFont({
  src: './Stack-Regular.woff2', // check actual filename before hardcoding
  variable: '--font-stack',
  display: 'swap',
})
Check the actual filename in the project root before hardcoding. Apply --font-stack as the base body font via Tailwind's fontFamily config.
Logo
SVG wordmark: "Alojamento Montalegre" — clean humanist sans-serif with a subtle nature mark (mountain silhouette or granite texture). Must work on both dark and light backgrounds.
Tone of Voice
Warm and grounded. A knowledgeable local host, not a hotel chain. Portuguese-first, then English. Never generic tourism copy.

4. Site Architecture
/                    → Homepage
/casa-do-moinho      → River house detail
/casa-do-castelo     → Castle house detail
/regiao              → Region guide
/contacto            → Contact page
Five pages. That's it.

5. Content Data
/src/config.ts
Single source of truth for all contact info:
tsexport const config = {
  whatsappNumber: "351XXXXXXXXX",
  phoneNumber: "+351 XXX XXX XXX",
  email: null, // not used for now
}
All WhatsApp links and phone links across the entire site must pull from this file. Never hardcode a number in a component.
/src/data/properties.ts
tsexport const properties = [
  {
    slug: "casa-do-moinho",
    name: { pt: "Casa do Moinho", en: "Casa do Moinho" },
    tagline: {
      pt: "À beira do rio, longe do mundo",
      en: "Beside the river, far from the world"
    },
    description: { pt: "...", en: "..." },
    capacity: 12,
    rooms: 5,
    location: { pt: "Montalegre, Terras de Barroso", en: "Montalegre, Terras de Barroso" },
    coordinates: { lat: 41.8229, lng: -7.7936 },
    amenities: {
      pt: ["WiFi", "Estacionamento", "Cozinha equipada", "Lareira", "Jardim", "Churrasco"],
      en: ["WiFi", "Parking", "Fully equipped kitchen", "Fireplace", "Garden", "BBQ"]
    },
    booking: {
      url: "https://www.booking.com/PLACEHOLDER_MOINHO",
      score: null,           // fill in when reactivated e.g. "9.2"
      reviewCount: null,     // fill in when reactivated e.g. 38
    },
    airbnbUrl: null,         // add later if listed
    whatsappMessage: {
      pt: "Olá, gostaria de saber mais sobre a Casa do Moinho",
      en: "Hello, I'd like to know more about Casa do Moinho"
    },
    seasonal: {
      pt: "Popular no verão — reserve com antecedência",
      en: "Popular in summer — book early"
    },
    images: [
      // 1 hero + min 8 gallery images
      // Unsplash URLs appended with ?w=1200&q=80
    ]
  },
  {
    slug: "casa-do-castelo",
    name: { pt: "Casa do Castelo", en: "Casa do Castelo" },
    tagline: {
      pt: "Sombra do castelo, alma da aldeia",
      en: "In the shadow of the castle, heart of the village"
    },
    description: { pt: "...", en: "..." },
    capacity: 10,
    rooms: 5,
    location: { pt: "Montalegre, junto ao Castelo", en: "Montalegre, next to the Castle" },
    coordinates: { lat: 41.8241, lng: -7.7897 },
    amenities: {
      pt: ["WiFi", "Estacionamento", "Cozinha equipada", "Lareira", "Varanda", "Vista para o castelo"],
      en: ["WiFi", "Parking", "Fully equipped kitchen", "Fireplace", "Balcony", "Castle view"]
    },
    booking: {
      url: "https://www.booking.com/PLACEHOLDER_CASTELO",
      score: "9.4",          // active listing — fill in real value
      reviewCount: 47,       // fill in real value
    },
    airbnbUrl: null,
    whatsappMessage: {
      pt: "Olá, gostaria de saber mais sobre a Casa do Castelo",
      en: "Hello, I'd like to know more about Casa do Castelo"
    },
    seasonal: {
      pt: "Disponível todo o ano",
      en: "Available year-round"
    },
    images: []
  }
]
/src/data/faq.ts
ts// Each item: { question: { pt, en }, answer: { pt, en } }
// Seed with these questions:
// - Check-in and check-out times
// - Are pets allowed?
// - Is there parking?
// - What is the minimum stay?
// - What is the cancellation policy?
// - How do I make a direct booking?
/src/data/regiao.ts
Sections, each with { title: { pt, en }, body: { pt, en }, image: string }:

Montalegre village + castle
Parque Natural do Gerês
Barragem do Alto Rabagão
Feira do Fumeiro (January)
Vinho dos Mortos
Local gastronomy (Barrosã beef, alheira)


6. Booking.com Score Badge Component
Build a reusable <BookingScoreBadge /> component:

Props: score: string | null, reviewCount: number | null, url: string
When score is null — renders nothing (no empty badge, no placeholder)
When score is populated — renders a badge styled similarly to Booking.com's own score chip: blue background, white bold score, small "Booking.com" label, review count below
Clicking opens the Booking.com listing in a new tab
Used in: homepage house cards, house detail page hero, contact page


7. Page Specifications
7.1 Homepage /

Hero — full-screen parallax image, Framer Motion headline entrance, tagline, two CTAs: Ver Casas (primary, forest green) + Conhecer a Região (ghost). Headline: "Terras de Barroso. Fique em casa."
Two house cards — side by side desktop, stacked mobile. Cover photo, name, capacity, rooms, tagline, Booking.com score badge (if score exists), seasonal note, Ver mais CTA. Scroll-fade entrance.
Trust strip — 4 items: Montalegre, Portugal · Até 12 pessoas · 2 casas disponíveis · Reserva direta. Icon + label, full-width, minimal.
Region teaser — short evocative paragraph about Terras de Barroso + scenic image. CTA: Descobrir a região.
FAQ strip — 5–6 accordion items from faq.ts. Headed "Perguntas frequentes".
WhatsApp CTA section — warm copy, large WhatsApp button.
Sister site callout — tasteful card: "À procura de tours e experiências na região? Visite a Natur Barroso." Link to naturbarroso.com.

7.2 House Detail Pages
Identical layout for both, driven by properties.ts:

Hero — full-width photo, property name + tagline overlay, seasonal note pill
Key facts bar — capacity, rooms, location (icon + label strip)
Booking.com score badge — prominent, below key facts. Renders only if score !== null. Include "Ver avaliações no Booking.com" text link alongside it.
Description — 2–3 paragraphs
Photo gallery — cover grid: 1 large + 4 small images visible, "Ver todas as fotos" opens full lightbox. Min 8–12 images per property. Uses next/image.
Amenities — clean icon grid
Location — Google Maps static iframe. No Mapbox.
Booking CTA block — this is the climax of the page. Two large buttons: WhatsApp (pre-filled message from properties.ts, number from config.ts) + "Reservar no Booking.com" (opens listing in new tab). Phone number displayed below. Add a line: "Prefere reserva direta? Contacte-nos pelo WhatsApp ou telefone."
Sister site callout — smaller version

7.3 Region Page /regiao

Hero — scenic Montalegre/Gerês image
Intro paragraph about Terras de Barroso
Content sections from regiao.ts — alternating image/text layout
Seasonal guide — simple visual strip: best months to visit, what to expect each season
Getting here — from Porto (~2h), Braga (~1.5h), brief notes
Sister site callout — "Explore the region with a local guide" → Natur Barroso

7.4 Contact Page /contacto

Phone number — prominent, click-to-call
WhatsApp buttons — one per house, pre-filled messages, number from config.ts
Booking.com links — one per house, with score badge if available
Response time note: "Respondemos em menos de 24 horas"
FAQ accordion — same items as homepage, repeated here for discoverability
No contact form needed


8. Global UI Components
ComponentNotesNavbarLogo left, nav centre, PT/EN toggle right. Transparent on hero, solid on scroll.Mobile navHamburger → full-screen slide-in drawerFooterLogo + tagline / nav links / phone + WhatsApp / PT-EN toggle / copyrightFloating WhatsApp buttonBottom-right, all pages, all screen sizes. Number from config.ts.<BookingScoreBadge />Reusable — renders nothing when score is nullCookie noticeOne-line passive notice in footer (no consent modal needed — no tracking scripts)

9. i18n

next-intl, path-based: /pt/... and /en/...
Default locale: pt
All UI strings in /messages/pt.json and /messages/en.json — nothing hardcoded in components
All content strings (descriptions, amenities, FAQ, region) bilingual in data files
Language toggle in navbar and footer
SEO metadata per locale:

PT: "alojamento montalegre", "casa de férias montalegre", "turismo rural barroso"
EN: "accommodation montalegre", "holiday house montalegre portugal", "rural tourism gerês"




10. SEO

generateMetadata on every page, locale-aware
JSON-LD on house pages: both LodgingBusiness and VacationRental schemas
JSON-LD LocalBusiness site-wide
BreadcrumbList on all pages
Static sitemap.xml and robots.txt
Static OpenGraph image per page via next/og
When bookingReviewCount and bookingScore are populated, include AggregateRating in the JSON-LD for that property


11. Print Styles
Add a @media print CSS pass on house detail pages:

Hide: navbar, footer, floating WhatsApp button, sister site callout, CTAs
Show: property name, description, amenities, address, phone number, Booking.com URL as plain text
Clean single-column layout


12. Placeholder Images (Unsplash)
Append ?w=1200&q=80 to all URLs.
Hero:    https://images.unsplash.com/photo-1566438480900-0609be27a4be
River:   https://images.unsplash.com/photo-1508193638397-1c4234db14d8
Village: https://images.unsplash.com/photo-1528360983277-13d401cdc186
Forest:  https://images.unsplash.com/photo-1551632811-561732d1e306
Castle:  https://images.unsplash.com/photo-1599946347371-68eb71b16afc
Interior:https://images.unsplash.com/photo-1502672260266-1c1ef2d93688
Use at least 8 images per property across hero + gallery.

13. Build Order
Work through this in sequence:

Scaffold: Next.js + TypeScript + Tailwind + next-intl + design tokens
config.ts + properties.ts + faq.ts + regiao.ts with realistic bilingual content
Global components: Navbar, Footer, floating WhatsApp button, <BookingScoreBadge />
Homepage
House detail pages (shared layout, both properties)
Region page
Contact page
SEO: generateMetadata + JSON-LD + sitemap + OG images
Print styles
Framer Motion: hero entrance + scroll fades (last — don't let animations block content work)


14. Out of Scope

No CMS
No custom booking engine
No Mapbox
No blog
No contact form
No user accounts
No analytics or tracking scripts (add in v2)
No newsletter