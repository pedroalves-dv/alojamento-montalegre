import type { PropertyReviewsConfig, ReviewPlatform } from "@/types/property";

const platformColors: Record<ReviewPlatform, string> = {
  Google: "bg-[#4285F4] text-white",
  "Booking.com": "bg-[#003580] text-white",
  TripAdvisor: "bg-[#34E0A1] text-[#00aa6c]",
  Airbnb: "bg-[#FF5A5F] text-white",
};

type Props = {
  config: PropertyReviewsConfig;
  locale: "pt" | "en";
  heading: string;
  allReviewsLabel: string;
};

export default function PropertyReviews({
  config,
  locale,
  heading,
  allReviewsLabel,
}: Props) {
  const { items, allReviewsUrl } = config;
  if (items.length === 0) return null;

  return (
    <section className="py-14 border-t border-gray-100">
      <h2 className="font-serif text-4xl text-granite mb-8">{heading}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((review, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, s) => (
                <StarIcon key={s} filled={s < review.rating} />
              ))}
            </div>

            <p className="text-granite/70 leading-relaxed text-sm italic flex-1">
              &ldquo;{review.text[locale]}&rdquo;
            </p>

            <div className="flex items-center justify-between gap-3 mt-auto">
              <span className="text-sm text-granite/60">
                — {review.author}
                {review.country && `, ${review.country[locale]}`}
              </span>
              <span
                className={`text-[0.65rem] font-semibold px-2 py-0.5 rounded-full tracking-wide ${platformColors[review.platform]}`}
              >
                {review.platform}
              </span>
            </div>
          </div>
        ))}
      </div>

      {allReviewsUrl && (
        <div className="mt-6">
          <a
            href={allReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-river hover:underline"
          >
            {allReviewsLabel} →
          </a>
        </div>
      )}
    </section>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      className={filled ? "text-amber" : "text-granite/20"}
      aria-hidden
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
