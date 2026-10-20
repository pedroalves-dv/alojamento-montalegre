import pt from "./pt.json";
import en from "./en.json";

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const htmlLang: Record<Locale, string> = { pt: "pt-PT", en: "en" };
export const ogLocale: Record<Locale, string> = { pt: "pt_PT", en: "en_GB" };

const messages = { pt, en } satisfies Record<Locale, typeof pt>;

type Messages = typeof pt;
export type Namespace = keyof Messages;

/** `getStaticPaths` helper for every `[locale]` route. */
export function localeParams() {
  return locales.map((locale) => ({ params: { locale } }));
}

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
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

/** Path for the same page in another locale, e.g. /pt/regiao → /en/regiao. */
export function switchLocalePath(pathname: string, target: Locale) {
  const rest = cleanPath(pathname).replace(/^\/(pt|en)(?=\/|$)/, "");
  return `/${target}${rest}`;
}
