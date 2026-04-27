import { getTranslations } from "next-intl/server";

export default async function SisterSiteCallout() {
  const t = await getTranslations("Home");

  return (
    <section className="py-16 px-4 bg-fog">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl px-8 py-8 text-center shadow-sm">
          <p className="text-xs font-semibold tracking-widest uppercase text-granite/40 mb-3">
            {t("sisterHeading")}
          </p>
          <p className="text-granite/70 text-sm leading-relaxed mb-5">
            {t("sisterBody")}
          </p>
          <a
            href="https://naturbarroso.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-river text-sm font-medium hover:underline transition-colors"
          >
            {t("sisterCta")}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
