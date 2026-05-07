import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { config } from "@/config";
import { seo } from "@/data/seo";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import HtmlLang from "@/components/layout/HtmlLang";

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
  const l = locale as "pt" | "en";

  return {
    title: {
      default: seo.site.titleDefault[l],
      template: seo.site.titleTemplate,
    },
    description: seo.site.description[l],
    openGraph: {
      siteName: "Alojamento Montalegre",
      type: "website",
      locale: l === "pt" ? "pt_PT" : "en_GB",
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

  const l = locale as "pt" | "en";

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Alojamento Montalegre",
    description: seo.site.localBusinessDescription[l],
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
      <HtmlLang locale={locale} />
      <LayoutWrapper>{children}</LayoutWrapper>
    </NextIntlClientProvider>
  );
}
