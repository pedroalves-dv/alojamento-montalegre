import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { properties } from "@/data/properties";
import { config } from "@/config";
import PropertyDetailLayout from "@/components/property/PropertyDetailLayout";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) return {};

  const l = locale as "pt" | "en";
  return {
    title: property.name[l],
    description: property.tagline[l],
    openGraph: {
      title: property.name[l],
      description: property.tagline[l],
      url: `${config.siteUrl}/${locale}/${slug}`,
    },
    keywords: property.keywords[l],
    alternates: {
      canonical: `${config.siteUrl}/${locale}/${slug}`,
      languages: {
        pt: `${config.siteUrl}/pt/${slug}`,
        en: `${config.siteUrl}/en/${slug}`,
      },
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const property = properties.find((p) => p.slug === slug);
  if (!property) notFound();

  const l = locale as "pt" | "en";
  const baseUrl = config.siteUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LodgingBusiness", "VacationRental"],
        name: property.name[l],
        description: property.description[l].split("\n\n")[0],
        url: `${baseUrl}/${locale}/${slug}`,
        image: property.images,
        geo: {
          "@type": "GeoCoordinates",
          latitude: property.coordinates.lat,
          longitude: property.coordinates.lng,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: slug === "casa-do-moinho" ? "Cambezes do Rio" : "Terreiro Açougue nº1",
          postalCode: slug === "casa-do-moinho" ? "5470-041" : "5470-250",
          addressLocality: "Montalegre",
          addressRegion: "Trás-os-Montes",
          addressCountry: "PT",
        },
        checkinTime: "15:00",
        checkoutTime: "11:00",
        numberOfRooms: property.rooms,
        amenityFeature: property.amenities[l].map((name) => ({
          "@type": "LocationFeatureSpecification",
          name,
          value: true,
        })),
        ...(property.booking.score !== null && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: property.booking.score,
            reviewCount: property.booking.reviewCount,
            bestRating: "10",
          },
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Alojamento Montalegre",
            item: `${baseUrl}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: property.name[l],
            item: `${baseUrl}/${locale}/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyDetailLayout property={property} locale={locale} />
    </>
  );
}
