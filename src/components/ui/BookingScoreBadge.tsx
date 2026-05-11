type Props = {
  score: string | null;
  reviewCount: number | null;
  reviewsLabel: string;
  compact?: boolean;
};

export default function BookingScoreBadge({
  score,
  reviewCount,
  reviewsLabel,
  compact,
}: Props) {
  if (score === null) return null;

  return (
    <div className="inline-flex items-stretch rounded-lg overflow-hidden border border-granite w-fit">
      <div
        className={`bg-[#003580] text-white font-bold flex items-center leading-none ${
          compact ? "text-base px-2.5 py-1.5" : "text-xl px-3 py-2"
        }`}
      >
        {score}
      </div>
      <div
        className={`bg-white flex flex-col justify-center ${compact ? "px-2.5 py-1" : "px-3 py-1.5"}`}
      >
        <span className="text-[#003580] font-bold text-xs leading-tight tracking-tight">
          Booking.com
        </span>
        {reviewCount !== null && (
          <span className="text-gray-500 text-xs leading-tight">
            {reviewCount} {reviewsLabel}
          </span>
        )}
      </div>
    </div>
  );
}
