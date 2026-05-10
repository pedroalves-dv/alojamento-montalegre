// src/components/property/PropertyDetailLayout.tsx
import { getTranslations } from "next-intl/server";
import type { Property } from "@/types/property";
import { config } from "@/config";
import BookingScoreBadge from "@/components/ui/BookingScoreBadge";
import PropertyHeroSection from "./PropertyHeroSection";
import PropertyBookingCTA from "./PropertyBookingCTA";
import PropertyBottomBar from "./PropertyBottomBar";
import PropertyPolicies from "./PropertyPolicies";
import RestaurantCallout from "./RestaurantCallout";

type Props = {
  property: Property;
  locale: string;
};

export default async function PropertyDetailLayout({
  property,
  locale,
}: Props) {
  const t = await getTranslations("PropertyDetail");
  const l = locale as "pt" | "en";

  const name = property.name[l];
  const tagline = property.tagline[l];
  const description = property.description[l];
  const seasonal = property.seasonal[l];
  const amenities = property.amenities[l];
  const address = property.address[l];

  const waMessage = encodeURIComponent(property.whatsappMessage[l]);
  const waHref = `https://wa.me/${config.whatsappNumber}?text=${waMessage}`;

  return (
    <>
      <PropertyHeroSection
        images={property.images}
        name={name}
        tagline={tagline}
        seasonal={seasonal}
      />

      {/* Mobile: property header flows below the half-screen gallery */}
      <div className="md:hidden px-5 pt-6 pb-5 bg-fog border-b border-gray-100">
        <span className="inline-flex items-center bg-amber/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3 tracking-wide">
          {seasonal}
        </span>
        <h1 className="font-serif text-4xl text-granite leading-tight mb-1">
          {name}
        </h1>
        <p className="text-granite/70 text-xl font-light">{tagline}</p>
      </div>

      {/* Key facts bar — full width */}
      <div className="bg-fog text-granite/90 border-b border-t border-granite/20">
        <ul className="flex flex-wrap md:justify-center gap-x-6 md:gap-x-20 gap-y-2 max-w-6xl mx-auto py-5 px-4">
          <li className="flex items-center border border-granite/20 rounded-full px-4 py-3 md:px-6 md:py-4 gap-3 text-xs md:text-sm font-medium tracking-wide">
            <span className="opacity-70">
              <UsersIcon />
            </span>
            <span>{t("capacity", { count: property.capacity })}</span>
          </li>
          <li className="flex items-center border border-granite/20 rounded-full px-4 py-3 md:px-6 md:py-4 gap-3 text-xs md:text-sm font-medium tracking-wide">
            <span className="opacity-70">
              <BedIcon />
            </span>
            <span>{t("rooms", { count: property.rooms })}</span>
          </li>
          <li className="flex items-center border border-granite/20 rounded-full px-4 py-3 md:px-6 md:py-4 gap-3 text-xs md:text-sm font-medium tracking-wide">
            <span className="opacity-70">
              <BathIcon />
            </span>
            <span>{t("bathrooms", { count: property.bathrooms })}</span>
          </li>
          {property.sqm !== null && (
            <li className="flex items-center border border-granite/20 rounded-full px-4 py-3 md:px-6 md:py-4 gap-3 text-xs md:text-sm font-medium tracking-wide">
              <span className="opacity-70">
                <SqmIcon />
              </span>
              <span>{t("sqm", { count: property.sqm })}</span>
            </li>
          )}
          <li className="flex items-center border border-granite/20 rounded-full px-4 py-3 md:px-6 md:py-4 gap-3 text-xs md:text-sm font-medium tracking-wide">
            <span className="opacity-70">
              <MapPinIcon />
            </span>
            <span>{address}</span>
          </li>
          {property.priceFrom !== null && (
            <li className="flex items-center border border-granite/20 rounded-full px-4 py-3 md:px-6 md:py-4 gap-3 text-xs md:text-sm font-medium tracking-wide">
              <span className="opacity-70">
                <PriceIcon />
              </span>
              <span>{t("priceFrom", { price: property.priceFrom })}</span>
            </li>
          )}
        </ul>
      </div>

      {/* Main two-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-10 max-w-6xl mx-auto px-4 sm:px-6 py-14">
        {/* LEFT COLUMN — main content */}
        <div>
          {/* Description */}
          <section className="mb-14">
            <h2 className="font-serif text-4xl text-granite mb-6">
              {t("descriptionHeading")}
            </h2>
            <div className="space-y-4">
              {description.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-granite/70 leading-relaxed text-base max-w-3xl"
                >
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* Amenities */}
          <section className="py-14 border-t border-gray-100">
            <h2 className="font-serif text-4xl text-granite mb-8">
              {t("amenitiesHeading")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
              {amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2.5">
                  <CheckIcon />
                  <span className="text-sm text-granite/80">{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Restaurant callout — Casa do Castelo only */}
          {property.restaurantInfo && (
            <section className="py-14 border-t border-gray-100">
              <RestaurantCallout
                name={property.restaurantInfo.name[l]}
                description={property.restaurantInfo.description[l]}
                inHouseLabel={t("inHouseLabel")}
              />
            </section>
          )}

          {/* Policies & check-in */}
          <PropertyPolicies
            checkinTime={property.checkinTime}
            checkoutTime={property.checkoutTime}
            minStay={property.minStay}
            minStayPeakSeason={property.minStayPeakSeason}
            noPartiesNote={property.noPartiesNote?.[l] ?? null}
            licenseNumber={property.licenseNumber}
            languagesSpoken={property.languagesSpoken}
            heading={t("policiesHeading")}
            checkinLabel={t("checkinLabel")}
            checkoutLabel={t("checkoutLabel")}
            minStayLabel={t("minStayLabel", { count: property.minStay })}
            minStayPeakLabel={
              property.minStayPeakSeason !== null
                ? t("minStayPeak", { count: property.minStayPeakSeason })
                : null
            }
            noPartiesLabel={t("noPartiesLabel")}
            notPermitted={t("notPermitted")}
            licenseLabel={t("licenseLabel")}
            languagesLabel={t("languagesLabel")}
          />

          {/* Featured guest review TODO: fetch real reviews (google, trip advisor)*/}
          {/* {property.featuredReview && (
            <section className="py-14 border-t border-gray-100">
              <h2 className="font-serif text-4xl text-granite mb-8">
                {t("reviewHeading")}
              </h2>
              <blockquote className="relative pl-6 border-l-2 border-amber">
                <p className="text-granite/70 leading-relaxed text-base italic mb-4">
                  &ldquo;{property.featuredReview.text[l]}&rdquo;
                </p>
                <footer className="text-sm text-granite/50">
                  — {property.featuredReview.author},{" "}
                  {property.featuredReview.country[l]}
                  <span className="ml-2 text-granite/30">{t("reviewVia")}</span>
                </footer>
              </blockquote>
            </section>
          )} */}

          {/* Nearby distances */}
          <section className="py-14 border-t border-gray-100">
            <h2 className="font-serif text-4xl text-granite mb-8">
              {t("nearbyHeading")}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {property.nearby.map((item) => (
                <li key={item.label[l]} className="flex items-center gap-2.5">
                  <MapPinIcon />
                  <span className="text-sm text-granite/80">
                    {item.label[l]}
                  </span>
                  <span className="text-sm text-granite/50">
                    {item.distance[l]}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Location */}
          <section className="py-14 border-t border-gray-100">
            <h2 className="font-serif text-4xl text-granite mb-6">
              {t("locationHeading")}
            </h2>
            {property.gettingHereNote && (
              <p className="my-4 text-sm text-granite/60 leading-relaxed">
                {property.gettingHereNote[l]}
              </p>
            )}
            <div className="rounded-xl overflow-hidden border border-gray-200 h-[380px]">
              <iframe
                title={`${name} — ${t("locationHeading")}`}
                src={`https://maps.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=14&output=embed`}
                width="100%"
                height="100%"
                loading="lazy"
                className="border-0"
              />
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN — sticky sidebar, desktop only */}
        <div className="hidden md:block">
          <div className="sticky top-[80px] h-fit bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
            <p className="text-sm font-medium text-granite/50">{name}</p>

            {property.booking.score !== null && (
              <>
                <BookingScoreBadge
                  score={property.booking.score}
                  reviewCount={property.booking.reviewCount}
                  url={property.booking.url}
                  reviewsLabel={t("reviewsLabel")}
                />
                {property.booking.url && (
                  <a
                    href={property.booking.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-river text-xs hover:underline -mt-2"
                  >
                    {t("bookingReviews")} →
                  </a>
                )}
              </>
            )}

            <p className="text-sm text-granite/70">{seasonal}</p>

            <hr className="border-gray-100" />

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#25D366" }}
            >
              <WhatsAppIcon />
              {t("bookingWhatsapp")}
            </a>

            <a
              href={`tel:${config.phoneNumber.replace(/\s/g, "")}`}
              className="text-center text-sm text-granite hover:text-forest transition-colors"
            >
              {config.phoneNumber}
            </a>

            <hr className="border-gray-100" />

            <p className="text-xs text-granite/50 leading-relaxed">
              {t("bookingDirectNote")}
            </p>
          </div>
        </div>
      </div>

      <PropertyBookingCTA property={property} locale={locale} />

      <PropertyBottomBar
        property={property}
        locale={locale}
        phoneLabel={t("phoneLabel")}
        whatsappLabel={t("bookingWhatsapp")}
      />
    </>
  );
}

function UsersIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-granite/40 shrink-0"
      aria-hidden
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-granite/40 shrink-0"
      aria-hidden
    >
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-granite/40 shrink-0"
      aria-hidden
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-forest shrink-0"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-granite/40 shrink-0"
      aria-hidden
    >
      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
      <line x1="10" y1="5" x2="8" y2="7" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="7" y1="19" x2="7" y2="21" />
      <line x1="17" y1="19" x2="17" y2="21" />
    </svg>
  );
}

function SqmIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-granite/40 shrink-0"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-granite/40 shrink-0"
      aria-hidden
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}
