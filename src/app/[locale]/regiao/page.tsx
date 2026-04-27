import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { regiao } from "@/data/regiao";
import { config } from "@/config";
import SisterSiteCallout from "@/components/home/SisterSiteCallout";
import RegionSection from "@/components/region/RegionSection";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isPt = locale === "pt";

  const title = isPt
    ? "Terras de Barroso — Descobrir a Região"
    : "Terras de Barroso — Discover the Region";

  const description = isPt
    ? "Montalegre, Parque Natural do Gerês, Barragem do Alto Rabagão — descubra o norte selvagem de Portugal nas Terras de Barroso."
    : "Montalegre, Peneda-Gerês National Park, Alto Rabagão — explore the wild north of Portugal in Terras de Barroso.";

  return {
    title,
    description,
    keywords: isPt
      ? ["terras de barroso", "montalegre turismo", "parque natural gerês", "turismo rural barroso"]
      : ["terras de barroso", "montalegre tourism", "peneda gerês national park", "rural tourism portugal"],
    openGraph: {
      title,
      description,
      url: `${config.siteUrl}/${locale}/regiao`,
      images: [{ url: "/og/regiao.png", width: 1200, height: 630, alt: title }],
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
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=1200&q=80"
          alt="Castelo de Montalegre"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/30 to-transparent" />
        <div className="relative z-10 px-6 pb-14 max-w-4xl mx-auto w-full">
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-3">
            {t("heroHeadline")}
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-lg">
            {t("heroTagline")}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-granite mb-6">
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
          <h2 className="font-serif text-3xl md:text-4xl text-granite text-center mb-12">
            {t("seasonalHeading")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-xl overflow-hidden border border-gray-200">
            {seasons.map((season) => (
              <div key={season.label} className="bg-white px-6 py-7">
                <p className="font-semibold text-forest text-base mb-1">
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
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-granite mb-10">
            {t("gettingHereHeading")}
          </h2>
          <div className="space-y-6 mb-8">
            {[
              {
                label: t("fromPortoLabel"),
                detail: t("fromPortoDetail"),
              },
              {
                label: t("fromBragaLabel"),
                detail: t("fromBragaDetail"),
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-baseline gap-4 border-b border-gray-100 pb-5"
              >
                {/* Car icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-amber mt-0.5"
                  aria-hidden
                >
                  <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14l4 4v4a2 2 0 0 1-2 2h-2" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
                <div>
                  <span className="font-semibold text-granite">{row.label}</span>
                  <span className="text-granite/55 ml-3 text-sm">{row.detail}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-granite/60 text-sm leading-relaxed">
            {t("gettingHereNote")}
          </p>
        </div>
      </section>

      <SisterSiteCallout />
    </main>
  );
}
