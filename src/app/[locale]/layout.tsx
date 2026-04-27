import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: {
      default: "Alojamento Montalegre",
      template: "%s | Alojamento Montalegre",
    },
    description:
      locale === "pt"
        ? "Casas de turismo rural em Montalegre, Terras de Barroso. Reserva direta disponível."
        : "Rural holiday houses in Montalegre, Terras de Barroso. Direct booking available.",
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {/* Set html[lang] synchronously — root layout can't access locale without opting out of SSG */}
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang='${locale}'` }} />
      <LayoutWrapper>{children}</LayoutWrapper>
    </NextIntlClientProvider>
  );
}
