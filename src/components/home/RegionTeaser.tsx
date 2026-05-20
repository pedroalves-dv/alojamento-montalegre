import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

const REGION_IMAGE = "/images/montalegre-4.jpg";

export default async function RegionTeaser({ locale }: { locale: string }) {
  const t = await getTranslations("Home");

  return (
    <section className="py-10 md:py-20 px-4 bg-fog">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="order-2 text-left">
          <h2 className="font-serif text-4xl md:text-6xl text-granite mb-5">
            {t("regionHeading")}
          </h2>
          <p className="text-granite/70 leading-relaxed text-base mb-8">
            {t("regionBody")}
          </p>
          <Link
            href={`/${locale}/regiao`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-forest text-forest font-medium bg-transparent hover:bg-forest hover:text-fog transition-colors duration-200 group"
          >
            {t("regionCta")}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
              aria-hidden
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Image */}
        <div className="order-1 relative aspect-[4/3] overflow-hidden">
          <Image
            src={REGION_IMAGE}
            alt="Montalegre, Terras de Barroso"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
