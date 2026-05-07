// src/components/property/PropertyDetailLayout.tsx
import { getTranslations } from "next-intl/server";
import type { Property } from "@/types/property";
import BookingScoreBadge from "@/components/ui/BookingScoreBadge";
import PropertyHero from "./PropertyHero";
import PropertyGallery from "./PropertyGallery";
import PropertyBookingCTA from "./PropertyBookingCTA";
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
  const location = property.location[l];
  const amenities = property.amenities[l];

  return (
    <>
      <PropertyHero
        image={property.images[0] ?? ""}
        name={name}
        tagline={tagline}
        seasonal={seasonal}
      />

      {/* Key facts bar */}
      <div className="bg-fog border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-wrap gap-6 md:gap-10">
          <div className="flex items-center gap-2 text-granite">
            <UsersIcon />
            <span className="text-sm">
              {t("capacity", { count: property.capacity })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-granite">
            <BedIcon />
            <span className="text-sm">
              {t("rooms", { count: property.rooms })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-granite">
            <MapPinIcon />
            <span className="text-sm">{location}</span>
          </div>
        </div>
      </div>

      {/* Description + Booking score */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
          <div>
            <h2 className="font-serif text-4xl text-granite mb-6">
              {t("descriptionHeading")}
            </h2>
            <div className="space-y-4">
              {description.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-granite/70 leading-relaxed text-base"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {property.booking.score !== null && (
            <div className="flex flex-col gap-3 md:items-end md:pt-14">
              <BookingScoreBadge
                score={property.booking.score}
                reviewCount={property.booking.reviewCount}
                url={property.booking.url}
                reviewsLabel={t("reviewsLabel")}
              />
              <a
                href={property.booking.url ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="text-river text-sm hover:underline"
              >
                {t("bookingReviews")} →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Photo gallery */}
      <div className="bg-fog/50 border-y border-gray-100">
        <PropertyGallery images={property.images} />
      </div>

      {/* Amenities */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
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
        <section className="max-w-6xl mx-auto px-4 sm:px-6 border-t border-gray-100 py-14">
          <RestaurantCallout
            name={property.restaurantInfo.name[l]}
            description={property.restaurantInfo.description[l]}
            inHouseLabel={t("inHouseLabel")}
          />
        </section>
      )}

      {/* Location */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 border-t border-gray-100 pt-14">
        <h2 className="font-serif text-4xl text-granite mb-6">
          {t("locationHeading")}
        </h2>
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

      <PropertyBookingCTA property={property} locale={locale} />
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
