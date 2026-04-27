import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { config } from "@/config";
import { properties } from "@/data/properties";
import AlojamentoLogo from "@/components/ui/AlojamentoLogo";

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("Footer");
  const otherLocale = locale === "pt" ? "en" : "pt";
  const year = new Date().getFullYear();

  const localeSwitchPath = `/${otherLocale}`;

  return (
    <footer className="bg-granite text-fog print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-4">
          <Link href={`/${locale}`}>
            <AlojamentoLogo variant="light" className="h-9 w-auto" />
          </Link>
          <p className="text-fog/60 text-sm leading-relaxed max-w-xs">
            {t("tagline")}
          </p>
          <Link
            href={localeSwitchPath}
            aria-label={t("localeAriaLabel")}
            className="text-xs font-semibold tracking-widest uppercase text-fog/50 hover:text-fog transition-colors w-fit"
          >
            {otherLocale === "pt" ? "Português" : "English"}
          </Link>
        </div>

        {/* Col 2 — Navigation */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-widest uppercase text-fog/40 mb-1">
            {t("navHeading")}
          </p>
          <Link
            href={`/${locale}`}
            className="text-sm text-fog/70 hover:text-fog transition-colors"
          >
            {t("casas")}
          </Link>
          {properties.map((p) => (
            <Link
              key={p.slug}
              href={`/${locale}/${p.slug}`}
              className="text-sm text-fog/70 hover:text-fog transition-colors pl-3 border-l border-white/10"
            >
              {p.name[locale as "pt" | "en"]}
            </Link>
          ))}
          <Link
            href={`/${locale}/regiao`}
            className="text-sm text-fog/70 hover:text-fog transition-colors"
          >
            {t("regiao")}
          </Link>
          <Link
            href={`/${locale}/contacto`}
            className="text-sm text-fog/70 hover:text-fog transition-colors"
          >
            {t("contacto")}
          </Link>
        </div>

        {/* Col 3 — Contact */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-widest uppercase text-fog/40 mb-1">
            {t("contactHeading")}
          </p>
          <a
            href={`tel:${config.phoneNumber.replace(/\s/g, "")}`}
            className="text-sm text-fog/70 hover:text-fog transition-colors flex items-center gap-2"
          >
            <PhoneIcon />
            {config.phoneNumber}
          </a>
          <a
            href={`https://wa.me/${config.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-fog/70 hover:text-fog transition-colors flex items-center gap-2"
          >
            <WhatsAppIcon />
            {t("whatsappLabel")}
          </a>
          <div className="mt-2 flex flex-col gap-2">
            {properties
              .filter((p) => p.booking.score !== null)
              .map((p) => (
                <a
                  key={p.slug}
                  href={p.booking.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-fog/70 hover:text-fog transition-colors flex items-center gap-2"
                >
                  <BookingDotIcon />
                  {p.name[locale as "pt" | "en"]} — {t("bookingLabel")}
                </a>
              ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-fog/40">
          <span>{t("copyright", { year })}</span>
          <span>{t("cookieNotice")}</span>
        </div>
      </div>
    </footer>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.06-.9a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="shrink-0"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function BookingDotIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="shrink-0 text-[#003580]"
    >
      <rect width="24" height="24" rx="4" fill="#003580" />
      <text x="12" y="17" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">b.</text>
    </svg>
  );
}
