import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { properties } from "@/data/properties";
import { faq } from "@/data/faq";
import { config } from "@/config";
import BookingScoreBadge from "@/components/ui/BookingScoreBadge";
import FAQAccordion from "@/components/home/FAQAccordion";
import AnimatedSection from "@/components/ui/AnimatedSection";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isPt = locale === "pt";

  const title = isPt ? "Contacto — Reserva Direta" : "Contact — Direct Booking";

  const description = isPt
    ? "Reserve diretamente via WhatsApp, telefone ou Booking.com. Respondemos em menos de 24 horas."
    : "Book directly via WhatsApp, phone or Booking.com. We respond within 24 hours.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${config.siteUrl}/${locale}/contacto`,
      images: [
        { url: "/og/contacto.png", width: 1200, height: 630, alt: title },
      ],
    },
    alternates: {
      canonical: `${config.siteUrl}/${locale}/contacto`,
      languages: {
        pt: `${config.siteUrl}/pt/contacto`,
        en: `${config.siteUrl}/en/contacto`,
      },
    },
  };
}

const WhatsAppIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contacto");
  const l = locale as "pt" | "en";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Alojamento Montalegre",
        item: `${config.siteUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: l === "pt" ? "Contacto" : "Contact",
        item: `${config.siteUrl}/${locale}/contacto`,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <section className="pt-32 px-6 bg-fog border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-6xl text-granite mb-4">
            {t("heading")}
          </h1>
          <p className="text-granite/60 text-lg mb-3">{t("subheading")}</p>
          <span className="inline-flex items-center gap-2 bg-forest/10 text-forest text-sm font-medium px-4 py-2 rounded-full">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {t("responseNote")}
          </span>
        </div>
      </section>

      {/* Property contact cards */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {properties.map((p, i) => {
            const waHref = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(p.whatsappMessage[l])}`;
            return (
              <AnimatedSection
                key={p.slug}
                delay={i * 0.12}
                className="border border-gray-200 rounded-2xl p-8 bg-white shadow-sm flex flex-col gap-6"
              >
                <div>
                  <h2 className="font-serif text-2xl text-granite mb-1">
                    {p.name[l]}
                  </h2>
                  <p className="text-granite/55 text-sm">{p.location[l]}</p>
                </div>

                {/* WhatsApp button */}
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-forest text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-moss transition-colors duration-200 text-sm"
                >
                  <WhatsAppIcon />
                  {t("whatsappButton")}
                </a>

                {/* Booking.com — only shown when the property has an external listing */}
                {p.booking.url && (
                  <div className="flex flex-col gap-3">
                    <BookingScoreBadge
                      score={p.booking.score}
                      reviewCount={p.booking.reviewCount}
                      url={p.booking.url}
                    />
                    <a
                      href={p.booking.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-river text-sm font-medium hover:underline transition-colors w-fit"
                    >
                      {t("bookingCta")} →
                    </a>
                  </div>
                )}
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* Phone */}
      <section className="py-16 px-6 bg-fog border-y border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-6xl text-granite mb-2">
            {t("phoneHeading")}
          </h2>
          <p className="text-granite/55 text-sm mb-6">{t("phoneNote")}</p>
          <a
            href={`tel:${config.phoneNumber.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-3 font-semibold text-3xl text-granite hover:text-forest transition-colors duration-200"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-forest"
              aria-hidden
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.87a16 16 0 0 0 6.22 6.22l1.77-1.77a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
            </svg>
            {config.phoneNumber}
          </a>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion items={faq} locale={locale} />
    </main>
  );
}
