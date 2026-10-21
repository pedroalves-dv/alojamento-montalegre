import type { FAQItem } from "@/types/faq";
import type { Property } from "@/types/property";
import type { Locale } from "@/i18n";
import { absoluteUrl } from "./links";

type Crumb = { name: string; path: string };

/** BreadcrumbList starting at the locale's home page. */
export function breadcrumbs(locale: Locale, trail: Crumb[] = []) {
  const items = [{ name: "Alojamento Montalegre", path: "" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(`/${locale}${item.path}`),
    })),
  };
}

export function faqPage(items: FAQItem[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question[locale],
      acceptedAnswer: { "@type": "Answer", text: item.answer[locale] },
    })),
  };
}

/** Schema.org check-in times must be plain times; "16:00–22:00" → "16:00". */
const firstTime = (range: string) => range.split(/[–-]/)[0]!.trim();
/** For check-out, the last time in a range is the deadline; "08:00–11:00" → "11:00". */
const lastTime = (range: string) => range.split(/[–-]/).at(-1)!.trim();

export function lodging(property: Property, locale: Locale, imageUrls: string[]) {
  const [street, , postalCode] = property.address.pt.split(",").map((s) => s.trim());
  return {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "VacationRental"],
    name: property.name[locale],
    description: property.description[locale].split("\n\n")[0],
    url: absoluteUrl(`/${locale}/${property.slug}`),
    image: imageUrls,
    telephone: property.phone,
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.coordinates.lat,
      longitude: property.coordinates.lng,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      postalCode,
      addressLocality: "Montalegre",
      addressRegion: "Trás-os-Montes",
      addressCountry: "PT",
    },
    checkinTime: firstTime(property.checkinTime),
    checkoutTime: lastTime(property.checkoutTime),
    numberOfRooms: property.rooms,
    occupancy: { "@type": "QuantitativeValue", maxValue: property.capacity },
    amenityFeature: property.amenities[locale].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
  };
}
