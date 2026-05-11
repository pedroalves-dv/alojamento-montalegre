"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Section = {
  title: { pt: string; en: string };
  body: { pt: string; en: string };
  image: string;
  distance: { pt: string; en: string } | null;
};

type Props = {
  section: Section;
  index: number;
  locale: "pt" | "en";
};

export default function RegionSection({ section, index, locale }: Props) {
  const isEven = index % 2 === 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="py-12 px-6"
    >
      <div
        className={`max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center ${
          isEven ? "" : "md:flex-row-reverse"
        }`}
      >
        <div className="w-full md:w-1/2 shrink-0">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={section.image}
              alt={section.title[locale]}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h3 className="font-serif text-3xl md:text-4xl text-granite mb-4">
            {section.title[locale]}
            {section.distance?.[locale] && (
              <span className="text-xs font-stack text-granite/50 border border-gray-200 px-2 py-0.5 rounded-full ml-3 align-middle inline-block">
                {section.distance[locale]}
              </span>
            )}
          </h3>
          <p className="text-granite/70 leading-relaxed">
            {section.body[locale]}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
