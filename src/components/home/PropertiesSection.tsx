"use client";

import { useTranslations } from "next-intl";
import type { Property } from "@/types/property";
import PropertyCard from "./PropertyCard";

type Props = {
  properties: Property[];
  locale: string;
};

export default function PropertiesSection({ properties, locale }: Props) {
  const t = useTranslations("Home");

  return (
    <section
      id="casas"
      className="py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-granite text-center mb-12">
          {t("propertiesHeading")}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {properties.map((property, i) => (
            <PropertyCard
              key={property.slug}
              property={property}
              locale={locale}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
