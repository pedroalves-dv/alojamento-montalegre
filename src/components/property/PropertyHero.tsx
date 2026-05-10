"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Props = {
  images: string[];
  name: string;
  tagline: string;
  seasonal: string;
  onOpenLightbox: (index: number) => void;
};

export default function PropertyHero({
  images,
  name,
  tagline,
  seasonal,
  onOpenLightbox,
}: Props) {
  const t = useTranslations("PropertyDetail");
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  // Tracks whether the current transition was triggered by the user (fast) or auto-advance (slow)
  const isManualNav = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      isManualNav.current = false;
      setCurrentIndex((i) => (i + 1) % images.length);
    }, 15000);
    return () => clearTimeout(timer);
  }, [currentIndex, images.length]);

  const goTo = (n: number) =>
    setCurrentIndex(((n % images.length) + images.length) % images.length);
  const goPrev = () => { isManualNav.current = true; goTo(currentIndex - 1); };
  const goNext = () => { isManualNav.current = true; goTo(currentIndex + 1); };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    touchStartY.current = e.touches[0]?.clientY ?? null;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx =
      (e.changedTouches[0]?.clientX ?? touchStartX.current) -
      touchStartX.current;
    const dy =
      (e.changedTouches[0]?.clientY ?? touchStartY.current) -
      touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <>
      {/* ── MOBILE: half-screen gallery ── */}
      <section
        className="relative md:hidden h-[50svh] min-h-[260px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <ImageStack images={images} currentIndex={currentIndex} name={name} transitionDuration={isManualNav.current ? 200 : 500} />

        {/* View photos chip — top-right */}
        <button
          onClick={() => onOpenLightbox(currentIndex)}
          className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-black/40 text-white text-xs px-2.5 py-1.5 rounded-lg backdrop-blur-sm hover:bg-black/60 transition-colors"
          aria-label={t("galleryViewAll", { count: images.length })}
        >
          <GridIcon />
          {t("galleryViewAll", { count: images.length })}
        </button>

        {/* Dots + count — bottom-center */}
        <div className="absolute bottom-3 left-0 right-0 z-10 flex flex-col items-center gap-1.5 pointer-events-none">
          <GalleryIndicator current={currentIndex} total={images.length} />
        </div>
      </section>

      {/* ── DESKTOP: full-height hero with overlay ── */}
      <section className="relative hidden md:flex min-h-[calc(100svh-var(--navbar-height))] min-h-[500px] items-end overflow-hidden">
        <ImageStack images={images} currentIndex={currentIndex} name={name} transitionDuration={isManualNav.current ? 200 : 500} />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-granite/50 via-transparent to-transparent" />

        {/* Prev chevron */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/25 hover:bg-black/50 text-white transition-colors backdrop-blur-sm"
          aria-label={t("galleryPrev")}
        >
          <ChevronLeft />
        </button>

        {/* Next chevron */}
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/25 hover:bg-black/50 text-white transition-colors backdrop-blur-sm"
          aria-label={t("galleryNext")}
        >
          <ChevronRight />
        </button>

        {/* Bottom overlay: text (left) + view-photos chip (right) */}
        <div className="relative z-10 px-6 pb-16 max-w-6xl mx-auto w-full flex flex-row items-end justify-between gap-6">
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center bg-amber/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 tracking-wide"
            >
              {seasonal}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-serif text-5xl lg:text-7xl text-white leading-[0.9] mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            >
              {name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
              className="text-white text-2xl font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            >
              {tagline}
            </motion.p>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => onOpenLightbox(currentIndex)}
            className="shrink-0 flex items-center gap-2 bg-fog text-granite text-sm px-3 py-2 rounded-lg backdrop-blur-sm hover:bg-white transition-colors"
            aria-label={t("galleryViewAll", { count: images.length })}
          >
            <GridIcon />
            {t("galleryViewAll", { count: images.length })}
          </motion.button>
        </div>

        {/* Dots + count — bottom-center, above the text overlay */}
        <div className="absolute bottom-4 left-0 right-0 z-10 flex flex-col items-center gap-1.5 pointer-events-none">
          <GalleryIndicator current={currentIndex} total={images.length} />
        </div>
      </section>
    </>
  );
}

/* ── sub-components ── */

function ImageStack({
  images,
  currentIndex,
  name,
  transitionDuration,
}: {
  images: string[];
  currentIndex: number;
  name: string;
  transitionDuration: number;
}) {
  return (
    <>
      {images.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: i === currentIndex ? 1 : 0,
            zIndex: i === currentIndex ? 1 : 0,
            transition: `opacity ${transitionDuration}ms ease-in`,
          }}
        >
          <Image
            src={src}
            alt={i === 0 ? name : ""}
            fill
            className="object-cover"
            sizes="100vw"
            priority={i < 2}
            loading={i < 2 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </>
  );
}

function GalleryIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-white/80 text-xs tabular-nums font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
        {current + 1} / {total}
      </span>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-4 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function GridIcon() {
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
      aria-hidden
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
