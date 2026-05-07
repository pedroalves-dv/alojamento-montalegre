import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { properties } from "@/data/properties";
import { faq } from "@/data/faq";
import { config } from "@/config";
import { seo } from "@/data/seo";
import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import PropertiesSection from "@/components/home/PropertiesSection";
import RegionTeaser from "@/components/home/RegionTeaser";
import FAQAccordion from "@/components/home/FAQAccordion";
import WhatsAppCTASection from "@/components/home/WhatsAppCTASection";
import AnimatedSection from "@/components/ui/AnimatedSection";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as "pt" | "en";

  return {
    title: seo.home.title[l],
    description: seo.home.description[l],
    keywords: seo.home.keywords![l],
    openGraph: {
      title: seo.home.title[l],
      description: seo.home.description[l],
      url: `${config.siteUrl}/${locale}`,
    },
    alternates: {
      canonical: `${config.siteUrl}/${locale}`,
      languages: {
        pt: `${config.siteUrl}/pt`,
        en: `${config.siteUrl}/en`,
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const l = locale as "pt" | "en";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Alojamento Montalegre",
        item: `${config.siteUrl}/${locale}`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question[l],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer[l],
      },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection locale={locale} />

      <TrustStrip />

      <PropertiesSection properties={properties} locale={locale} />
      <AnimatedSection>
        <RegionTeaser locale={locale} />
      </AnimatedSection>
      <AnimatedSection>
        <FAQAccordion items={faq} locale={locale} />
      </AnimatedSection>
      <AnimatedSection>
        <WhatsAppCTASection />
      </AnimatedSection>
    </main>
  );
}
