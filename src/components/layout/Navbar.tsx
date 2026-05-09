"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import AlojamentoLogo from "@/components/ui/AlojamentoLogo";
import LocaleToggle from "@/components/ui/LocaleToggle";
import { properties } from "@/data/properties";

const OTHER_NAV_LINKS = [
  { key: "regiao" as const, href: "/regiao" },
  { key: "contacto" as const, href: "/contacto" },
] as const;

export default function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const l = locale as "pt" | "en";
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCasasExpanded, setIsCasasExpanded] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCasasExpanded(false);
  }, [pathname]);

  const navBg = "bg-fog/95 backdrop-blur-sm border-b border-gray-300";
  const navText = "text-granite";

  const isCasasActive =
    pathname === `/${locale}` ||
    pathname === `/${locale}/` ||
    properties.some((p) => pathname.startsWith(`/${locale}/${p.slug}`));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 print:hidden ${navBg}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[var(--navbar-height)] flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} aria-label="Alojamento Montalegre — início">
            <AlojamentoLogo variant="dark" className="h-8 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {/* Casas dropdown */}
            <div className="relative group">
              <Link
                href={`/${locale}#casas`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("casas")
                    ?.scrollIntoView({ behavior: "smooth" });
                  window.history.pushState(null, "", `/${locale}#casas`);
                }}
                className={`flex items-center gap-1 text-md font-medium tracking-wide transition-colors ${navText} ${
                  isCasasActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
              >
                {t("casas")}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:rotate-180"
                  aria-hidden
                >
                  <polyline points="2 4 6 8 10 4" />
                </svg>
              </Link>

              {/* Flyout — pt-4 is the visual gap AND the hover bridge (mouse stays in group) */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 hidden group-hover:block">
                <div className="bg-fog border border-gray-300 shadow-lg rounded-xl overflow-hidden w-max min-w-[200px]">
                  {properties.map((property) => (
                    <Link
                      key={property.slug}
                      href={`/${locale}/${property.slug}`}
                      className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-200 transition-colors border-b border-gray-300 last:border-0"
                    >
                      <Image
                        src="/icons/house.png"
                        alt=""
                        width={26}
                        height={26}
                        className="shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-granite text-sm">
                          {property.name[l]}
                        </span>
                        <span className="text-granite/50 text-xs mt-0.5">
                          {property.tagline[l]}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Other links */}
            {OTHER_NAV_LINKS.map(({ key, href }) => {
              const fullHref = `/${locale}${href}`;
              const isActive = pathname.startsWith(`/${locale}${href}`);
              return (
                <Link
                  key={key}
                  href={fullHref}
                  className={`text-md font-medium tracking-wide transition-colors ${navText} ${
                    isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {t(key)}
                </Link>
              );
            })}
          </nav>

          {/* Right: locale toggle + mobile hamburger */}
          <div className="flex items-center gap-3">
            <LocaleToggle className={`hidden md:flex ${navText}`} />

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label={t("menu")}
              className={`md:hidden p-1 ${navText}`}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="2" y1="5" x2="20" y2="5" />
                <line x1="2" y1="11" x2="20" y2="11" />
                <line x1="2" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-granite flex flex-col">
          <div className="flex items-center justify-between px-4 h-[var(--navbar-height)]">
            <AlojamentoLogo variant="light" className="h-8 w-auto" />
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label={t("close")}
              className="text-fog p-1"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="3" y1="3" x2="19" y2="19" />
                <line x1="19" y1="3" x2="3" y2="19" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-6 pt-8 flex-1">
            {/* Casas expandable */}
            <div className="border-b border-white/10">
              <button
                onClick={() => setIsCasasExpanded((v) => !v)}
                className="w-full flex items-center justify-between font-serif text-fog text-4xl py-3 hover:text-amber transition-colors"
              >
                {t("casas")}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${isCasasExpanded ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  <polyline points="4 7 10 13 16 7" />
                </svg>
              </button>

              {isCasasExpanded && (
                <div className="flex flex-col pb-3 pl-2 gap-1">
                  {properties.map((property) => (
                    <Link
                      key={property.slug}
                      href={`/${locale}/${property.slug}`}
                      className="flex flex-col py-2.5 border-l-2 border-amber pl-4"
                    >
                      <span className="font-medium text-fog text-lg">
                        {property.name[l]}
                      </span>
                      <span className="text-fog/50 text-sm">
                        {property.tagline[l]}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Other links */}
            {OTHER_NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={`/${locale}${href}`}
                className="font-serif text-fog text-4xl py-3 border-b border-white/10 hover:text-amber transition-colors"
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className="px-22 pb-8 scale-150">
            <LocaleToggle className="text-fog" />
          </div>
        </div>
      )}
    </>
  );
}
