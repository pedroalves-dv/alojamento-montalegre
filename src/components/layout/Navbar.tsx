"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import AlojamentoLogo from "@/components/ui/AlojamentoLogo";
import LocaleToggle from "@/components/ui/LocaleToggle";

const NAV_LINKS = [
  { key: "casas" as const, href: "/" },
  { key: "regiao" as const, href: "/regiao" },
  { key: "contacto" as const, href: "/contacto" },
] as const;

export default function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navBg = "bg-fog/95 backdrop-blur-sm border-b border-gray-300";
  const navText = "text-granite";
  const logoVariant = "dark";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 print:hidden ${navBg}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[var(--navbar-height)] flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} aria-label="Alojamento Montalegre — início">
            <AlojamentoLogo variant={logoVariant} className="h-8 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ key, href }) => {
              const fullHref = `/${locale}${href}`;
              const isActive =
                href === "/"
                  ? pathname === `/${locale}` || pathname === `/${locale}/`
                  : pathname.startsWith(`/${locale}${href}`);
              return (
                <Link
                  key={key}
                  href={fullHref}
                  className={`text-md font-medium tracking-wide transition-colors  ${navText} ${
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
            {NAV_LINKS.map(({ key, href }) => (
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
