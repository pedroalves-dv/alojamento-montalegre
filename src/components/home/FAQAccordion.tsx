"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { FAQItem } from "@/types/faq";

type Props = {
  items: FAQItem[];
  locale: string;
};

export default function FAQAccordion({ items, locale }: Props) {
  const t = useTranslations("Home");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const l = locale as "pt" | "en";

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-granite text-center mb-12">
          {t("faqHeading")}
        </h2>
        <div className="divide-y divide-gray-200">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between py-5 text-left gap-4 group"
                >
                  <span className="font-medium text-granite text-base group-hover:text-forest transition-colors">
                    {item.question[l]}
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`shrink-0 text-granite/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-granite/65 leading-relaxed text-sm">
                    {item.answer[l]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
