type Props = {
  score: string;
  reviewCount: number | null;
  reviewsLabel: string;
  compact?: boolean;
};

export default function GoogleReviewsBadge({ score, reviewCount, reviewsLabel, compact }: Props) {
  return (
    <div className="inline-flex items-stretch rounded-lg overflow-hidden border border-gray-200 w-fit">
      <div
        className={`bg-[#4285F4] text-white font-bold flex items-center gap-1 leading-none ${
          compact ? "text-base px-2.5 py-1.5" : "text-xl px-3 py-2"
        }`}
      >
        <span className={`opacity-80 ${compact ? "text-xs" : "text-sm"}`}>★</span>
        {score}
      </div>
      <div className={`bg-white flex flex-col justify-center ${compact ? "px-2.5 py-1" : "px-3 py-1.5"}`}>
        <span className="text-[#4285F4] font-bold text-xs leading-tight tracking-tight">
          Google
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
