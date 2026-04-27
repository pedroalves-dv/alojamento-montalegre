type Props = {
  score: string | null;
  reviewCount: number | null;
  url: string | null;
};

export default function BookingScoreBadge({ score, reviewCount, url }: Props) {
  if (score === null) return null;

  return (
    <a
      href={url ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Booking.com: ${score}${reviewCount ? ` · ${reviewCount} avaliações` : ""}`}
      className="inline-flex items-stretch rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow w-fit"
    >
      {/* Score chip */}
      <div className="bg-[#003580] text-white font-bold text-xl px-3 py-2 flex items-center leading-none">
        {score}
      </div>

      {/* Label panel */}
      <div className="px-3 py-1.5 bg-white flex flex-col justify-center">
        <span className="text-[#003580] font-bold text-xs leading-tight tracking-tight">
          Booking.com
        </span>
        {reviewCount !== null && (
          <span className="text-gray-500 text-xs leading-tight">
            {reviewCount} avaliações
          </span>
        )}
      </div>
    </a>
  );
}
