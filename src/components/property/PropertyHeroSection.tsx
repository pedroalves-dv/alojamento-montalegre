"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import PropertyHero from "./PropertyHero";

type Props = {
  images: string[];
  name: string;
  tagline: string;
  seasonal: string;
};

export default function PropertyHeroSection({
  images,
  name,
  tagline,
  seasonal,
}: Props) {
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

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <>
      <PropertyHero
        images={images}
        name={name}
        tagline={tagline}
        seasonal={seasonal}
        onOpenLightbox={setLightboxIndex}
      />

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
    </>
  );
}
