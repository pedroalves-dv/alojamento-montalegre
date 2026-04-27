import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { regiao } from "@/data/regiao";
import SisterSiteCallout from "@/components/home/SisterSiteCallout";

type Props = { params: Promise<{ locale: string }> };

export default async function RegiaoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Regiao");
  const l = locale as "pt" | "en";

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
        {regiao.map((section, i) => {
          const isEven = i % 2 === 0;
          return (
            <section key={i} className="py-12 px-6">
              <div
                className={`max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2 shrink-0">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src={section.image}
                      alt={section.title[l]}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2">
                  <h3 className="font-serif text-2xl md:text-3xl text-granite mb-4">
                    {section.title[l]}
                  </h3>
                  <p className="text-granite/70 leading-relaxed">
                    {section.body[l]}
                  </p>
                </div>
              </div>
            </section>
          );
        })}
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
