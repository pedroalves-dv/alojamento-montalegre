import { setRequestLocale } from "next-intl/server";
import { properties } from "@/data/properties";
import { faq } from "@/data/faq";
import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import PropertiesSection from "@/components/home/PropertiesSection";
import RegionTeaser from "@/components/home/RegionTeaser";
import FAQAccordion from "@/components/home/FAQAccordion";
import WhatsAppCTASection from "@/components/home/WhatsAppCTASection";
import SisterSiteCallout from "@/components/home/SisterSiteCallout";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <HeroSection locale={locale} />
      <TrustStrip />
      <PropertiesSection properties={properties} locale={locale} />
      <RegionTeaser locale={locale} />
      <FAQAccordion items={faq} locale={locale} />
      <WhatsAppCTASection />
      <SisterSiteCallout />
    </main>
  );
}
