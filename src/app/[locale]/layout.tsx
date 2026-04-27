import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { config } from "@/config";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPt = locale === "pt";

  return {
    title: {
      default: isPt
        ? "Alojamento Montalegre — Casas de Turismo Rural"
        : "Alojamento Montalegre — Rural Holiday Houses",
      template: "%s | Alojamento Montalegre",
    },
    description: isPt
      ? "Casas de turismo rural em Montalegre, Terras de Barroso. Reserva direta disponível."
      : "Rural holiday houses in Montalegre, Terras de Barroso. Direct booking available.",
    openGraph: {
      siteName: "Alojamento Montalegre",
      type: "website",
      locale: isPt ? "pt_PT" : "en_GB",
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      languages: {
        pt: `${config.siteUrl}/pt`,
        en: `${config.siteUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  const isPt = locale === "pt";

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Alojamento Montalegre",
    description: isPt
      ? "Duas casas de turismo rural em Montalegre, Terras de Barroso. Reserva direta disponível."
      : "Two rural holiday houses in Montalegre, Terras de Barroso. Direct booking available.",
    url: config.siteUrl,
    telephone: config.phoneNumber,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montalegre",
      addressRegion: "Trás-os-Montes",
      addressCountry: "PT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.8229,
      longitude: -7.7936,
    },
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      {/* Set html[lang] synchronously — root layout can't access locale without opting out of SSG */}
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang='${locale}'` }} />
      <LayoutWrapper>{children}</LayoutWrapper>
    </NextIntlClientProvider>
  );
}
