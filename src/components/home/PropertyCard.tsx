"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import BookingScoreBadge from "@/components/ui/BookingScoreBadge";
import type { Property } from "@/types/property";

type Props = {
  property: Property;
  locale: string;
  index: number;
};

export default function PropertyCard({ property, locale, index }: Props) {
  const t = useTranslations("Home");
  const tProperty = useTranslations("PropertyDetail");
  const l = locale as "pt" | "en";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="relative bg-white overflow-hidden border border-gray-300 flex flex-col group"
    >
      {/* Cover image */}
      <div className="relative aspect-[5/3]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={property.images[0]!}
            alt={property.name[l]}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-102"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        {property.booking.score !== null && (
          <div className="absolute bottom-3 right-3 z-10">
            <BookingScoreBadge
              score={property.booking.score}
              reviewCount={property.booking.reviewCount}
              url={property.booking.url}
              reviewsLabel={tProperty("reviewsLabel")}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-serif text-3xl md:text-4xl text-granite mb-1">
            {property.name[l]}
          </h3>
          <p className="text-granite/70 text-sm md:text-md leading-relaxed mb-2">
            {property.tagline[l]}
          </p>
          {property.priceFrom !== null && (
            <p className="text-lg font-medium text-forest">
              {tProperty("priceFrom", { price: property.priceFrom })}
            </p>
          )}
        </div>

        {/* Key facts */}
        <div className="flex items-center gap-5 text-sm text-granite/60">
          <span className="flex items-center gap-1.5">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {t("propertyPersons", { count: property.capacity })}
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {t("propertyRooms", { count: property.rooms })}
          </span>
        </div>

        {/* Seasonal note */}
        <p className="text-amber text-xs font-medium tracking-wide">
          {property.seasonal[l]}
        </p>

        {/* CTA */}
        <div className="mt-auto pt-2">
          <Link
            href={`/${locale}/${property.slug}`}
            className="inline-block bg-forest hover:bg-moss text-white text-md font-medium px-6 py-3 rounded-lg transition-colors duration-200 after:absolute after:inset-0 after:content-['']"
          >
            {t("propertyCardCta")}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
