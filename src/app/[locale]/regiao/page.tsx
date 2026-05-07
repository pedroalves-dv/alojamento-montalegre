import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { regiao } from "@/data/regiao";
import { config } from "@/config";
import { seo } from "@/data/seo";

import RegionSection from "@/components/region/RegionSection";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as "pt" | "en";

  return {
    title: seo.regiao.title[l],
    description: seo.regiao.description[l],
    keywords: seo.regiao.keywords![l],
    openGraph: {
      title: seo.regiao.title[l],
      description: seo.regiao.description[l],
      url: `${config.siteUrl}/${locale}/regiao`,
      images: [{ url: "/og/regiao.png", width: 1200, height: 630, alt: seo.regiao.title[l] }],
    },
    alternates: {
      canonical: `${config.siteUrl}/${locale}/regiao`,
      languages: {
        pt: `${config.siteUrl}/pt/regiao`,
        en: `${config.siteUrl}/en/regiao`,
      },
    },
  };
}

export default async function RegiaoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Regiao");
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
      {
        "@type": "ListItem",
        position: 2,
        name: l === "pt" ? "Região" : "Region",
        item: `${config.siteUrl}/${locale}/regiao`,
      },
    ],
  };

  const seasons = [
    {
      label: t("springLabel"),
      months: t("springMonths"),
      note: t("springNote"),
    },
    {
      label: t("summerLabel"),
      months: t("summerMonths"),
      note: t("summerNote"),
    },
    {
      label: t("autumnLabel"),
      months: t("autumnMonths"),
      note: t("autumnNote"),
    },
    {
      label: t("winterLabel"),
      months: t("winterMonths"),
      note: t("winterNote"),
    },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end md:text-center">
        <Image
          src="/images/montalegre-2.png"
          alt="Monte do Larrouco, Terras de Barroso"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/30 to-transparent" /> */}
        <div className="relative z-10 pb-14 max-w-4xl mx-auto w-full px-6">
          <h1 className="font-serif text-5xl md:text-7xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {t("heroHeadline1")}
          </h1>
          <h1 className="font-stack text-4xl md:text-6xl text-white mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {t("heroHeadline2")}
          </h1>
          <p className="text-white/80 text-lg md:text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {t("heroTagline")}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto md:text-center">
          <h2 className="font-serif text-4xl md:text-6xl text-granite mb-6 ">
            {t("introHeading")}
          </h2>
          <p className="text-granite/70 text-lg leading-relaxed">
            {t("introBody")}
          </p>
        </div>
      </section>

      {/* Alternating content sections */}
      <div className="py-4">
        {regiao.map((section, i) => (
          <RegionSection key={i} section={section} index={i} locale={l} />
        ))}
      </div>

      {/* Seasonal guide */}
      <section className="py-20 px-6 bg-fog">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl md:text-6xl text-granite md:text-center mb-12">
            {t("seasonalHeading")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-xl overflow-hidden border border-gray-200">
            {seasons.map((season) => (
              <div key={season.label} className="bg-white px-6 py-7">
                <p className="font-semibold text-forest tracking-wider text-base mb-1">
                  {season.label}
                </p>
                <p className="text-xs text-granite/50 uppercase tracking-wider mb-3">
                  {season.months}
                </p>
                <p className="text-granite/70 text-sm leading-relaxed">
                  {season.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting here */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-6xl text-granite mb-10 md:text-center">
            {t("gettingHereHeading")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                label: t("fromPortoLabel"),
                detail: t("fromPortoDetail"),
                directionsUrl:
                  "https://www.google.com/maps/dir/Porto,Portugal/41.8235,-7.7916",
              },
              {
                label: t("fromBragaLabel"),
                detail: t("fromBragaDetail"),
                directionsUrl:
                  "https://www.google.com/maps/dir/Braga,Portugal/41.8235,-7.7916",
              },
            ].map((row) => (
              <div
                key={row.label}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber mb-4"
                  aria-hidden
                >
                  <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14l4 4v4a2 2 0 0 1-2 2h-2" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
                <p className="font-serif text-2xl text-granite mb-1">
                  {row.label}
                </p>
                <p className="text-granite/55 text-sm leading-relaxed mb-4">
                  {row.detail}
                </p>
                <a
                  href={row.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-sm text-amber font-medium hover:underline"
                >
                  {t("directionsLink")} →
                </a>
              </div>
            ))}
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm h-[320px] mb-8">
            <iframe
              title={t("mapTitle")}
              src="https://maps.google.com/maps?q=41.8235,-7.7916&z=13&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              className="border-0"
            />
          </div>
          <p className="text-granite/60 text-sm leading-relaxed md:text-center">
            {t("gettingHereNote")}
          </p>
        </div>
      </section>
    </main>
  );
}
