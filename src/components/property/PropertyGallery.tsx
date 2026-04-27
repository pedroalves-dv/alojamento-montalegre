"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

type Props = {
  images: string[];
};

export default function PropertyGallery({ images }: Props) {
  const t = useTranslations("PropertyDetail");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, prev, next]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  if (images.length === 0) return null;

  const mainImage = images[0]!;
  const gridImages = images.slice(1, 5);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="font-serif text-4xl text-granite mb-6">
        {t("galleryHeading")}
      </h2>

      {/* Cover grid */}
      <div className="relative">
        <div className="grid grid-cols-3 gap-2 h-[420px] md:h-[480px] rounded-xl overflow-hidden">
          {/* Large image — left 2/3 */}
          <button
            className="col-span-2 relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            onClick={() => setLightboxIndex(0)}
            aria-label={t("galleryViewAll", { count: images.length })}
          >
            <Image
              src={mainImage}
              alt=""
              fill
              className="object-cover hover:brightness-95 transition-all"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </button>

          {/* 4 small images — right 1/3, 2×2 grid */}
          <div className="grid grid-rows-2 grid-cols-2 gap-2">
            {gridImages.map((img, i) => (
              <button
                key={i}
                className="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                onClick={() => setLightboxIndex(i + 1)}
                aria-label={`Photo ${i + 2}`}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover hover:brightness-95 transition-all"
                  sizes="25vw"
                />
              </button>
            ))}
          </div>
        </div>

        {/* View all button */}
        <button
          onClick={() => setLightboxIndex(0)}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-granite text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-white transition-colors flex items-center gap-2"
        >
          <GridIcon />
          {t("galleryViewAll", { count: images.length })}
        </button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-granite/96 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Image container */}
            <div
              className="relative w-full h-full max-w-5xl max-h-[80vh] mx-auto px-16 py-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex]!}
                alt=""
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              aria-label={t("galleryClose")}
              className="absolute top-4 right-4 text-white/60 hover:text-white p-2 transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label={t("galleryPrev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2 transition-colors"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label={t("galleryNext")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2 transition-colors"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Counter */}
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-sm tabular-nums">
              {lightboxIndex + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GridIcon() {
  return (
    <svg
      width="15"
      height="15"
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
