import pt from "./pt.json";
import en from "./en.json";

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];

export const htmlLang: Record<Locale, string> = { pt: "pt-PT", en: "en" };
export const ogLocale: Record<Locale, string> = { pt: "pt_PT", en: "en_GB" };

const messages = { pt, en } satisfies Record<Locale, typeof pt>;

type Messages = typeof pt;
export type Namespace = keyof Messages;

/** `getStaticPaths` helper for every `[locale]` route. */
export function localeParams() {
  return locales.map((locale) => ({ params: { locale } }));
}

/** Path of each fixed page in each locale. House pages use their slug in both. */
export const pagePaths = {
  regiao: { pt: "/regiao", en: "/region" },
  contacto: { pt: "/contacto", en: "/contact" },
  creditos: { pt: "/creditos", en: "/credits" },
} as const satisfies Record<string, Record<Locale, string>>;

export type Page = keyof typeof pagePaths;

/** Link to a fixed page, e.g. pageHref("en", "regiao") → "/en/region". */
export function pageHref(locale: Locale, page: Page) {
  return `/${locale}${pagePaths[page][locale]}`;
}

/**
 * `getStaticPaths` helper for a fixed page. Its file is named after the page key, e.g.
 * `[locale]/[regiao].astro`, so the same file builds /pt/regiao and /en/region.
 */
export function pageParams(page: Page) {
  return locales.map((locale) => ({ params: { locale, [page]: pagePaths[page][locale].slice(1) } }));
}

/**
 * Returns a translator bound to one namespace of the message files.
 * Placeholders use `{name}` syntax: t("propertyPersons", { count: 10 }).
 */
export function useTranslations<N extends Namespace>(locale: Locale, namespace: N) {
  const dict = messages[locale][namespace] as Record<keyof Messages[N], string>;
  return (key: keyof Messages[N], values?: Record<string, string | number>) => {
    const template = dict[key];
    if (!values) return template;
    return template.replace(/\{(\w+)\}/g, (_, name: string) => String(values[name] ?? `{${name}}`));
  };
}

/**
 * Normalises Astro.url.pathname, which at build time (build.format "file")
 * can carry an ".html" suffix: "/pt/regiao.html" → "/pt/regiao".
 */
export function cleanPath(pathname: string) {
  return pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
}

/**
 * Path for the same page in another locale, e.g. /pt/regiao → /en/region.
 * Pages outside the locale tree (e.g. /404) have no counterpart, so they get its home.
 */
export function switchLocalePath(pathname: string, target: Locale) {
  const match = cleanPath(pathname).match(/^\/(pt|en)(\/.*)?$/);
  if (!match) return `/${target}`;
  const [, from, rest = ""] = match as [string, Locale, string?];
  const page = Object.values(pagePaths).find((paths) => paths[from] === rest);
  return `/${target}${page ? page[target] : rest}`;
}
