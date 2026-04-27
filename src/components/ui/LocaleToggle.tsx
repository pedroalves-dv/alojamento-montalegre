"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

type Props = { className?: string };

export default function LocaleToggle({ className = "" }: Props) {
  const locale = useLocale();
  const pathname = usePathname();

  function hrefFor(target: string) {
    return `/${target}${pathname.substring(`/${locale}`.length)}` || `/${target}`;
  }

  return (
    <div className={`flex items-center gap-1.5 text-xs font-semibold tracking-widest ${className}`}>
      {locale === "pt" ? (
        <span>PT</span>
      ) : (
        <Link href={hrefFor("pt")} className="opacity-40 hover:opacity-80 transition-opacity">
          PT
        </Link>
      )}
      <span className="opacity-20 select-none">|</span>
      {locale === "en" ? (
        <span>EN</span>
      ) : (
        <Link href={hrefFor("en")} className="opacity-40 hover:opacity-80 transition-opacity">
          EN
        </Link>
      )}
    </div>
  );
}
