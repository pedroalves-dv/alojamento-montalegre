"use client";

import { useState, useRef } from "react";
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
  const [mobileIndex, setMobileIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    setMobileIndex(
      Math.round(
        carouselRef.current.scrollLeft / carouselRef.current.clientWidth,
      ),
    );
  };

  return (
    <section className="relative min-h-[calc(100svh-var(--navbar-height))] min-h-[500px] flex items-end overflow-hidden">
      {/* MOBILE: scroll-snap carousel */}
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="md:hidden absolute inset-0 flex overflow-x-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((src, i) => (
          <div key={i} className="shrink-0 w-full h-full snap-start relative">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* DESKTOP: single static image */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src={images[0] ?? ""}
          alt={name}
          fill
          priority
          loading="eager"
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Gradient — fades out on mobile after slide 0 */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-granite/25 via-transparent to-transparent transition-opacity duration-300 md:opacity-100 ${
          mobileIndex === 0 ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Bottom overlay — text + desktop chip */}
      <div className="relative z-10 px-6 pb-12 max-w-6xl mb-auto md:mb-0 mx-auto w-full flex flex-col items-center justify-center text-center md:flex-row md:items-end md:justify-between md:text-left gap-6">
        {/* Text — fades out on mobile after slide 0 */}
        <div
          className={`flex flex-col items-center md:items-start transition-opacity duration-300 md:opacity-100 md:pointer-events-auto ${
            mobileIndex === 0
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
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
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[0.9] mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            {name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
            className="text-white text-lg md:text-2xl font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            {tagline}
          </motion.p>
        </div>

        {/* Photo count chip — desktop only */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onClick={() => onOpenLightbox(0)}
          className="hidden md:flex shrink-0 items-center gap-2 bg-fog text-granite text-sm px-3 py-2 rounded-lg backdrop-blur-sm hover:bg-white transition-colors"
          aria-label={t("galleryViewAll", { count: images.length })}
        >
          <GridIcon />
          {t("galleryViewAll", { count: images.length })}
        </motion.button>
      </div>

      {/* Mobile: counter + growing dots */}
      <div className="md:hidden absolute bottom-4 left-0 right-0 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-white/70 text-xs tabular-nums font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          {mobileIndex + 1} / {images.length}
        </span>
        <div className="flex items-center gap-1.5">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === mobileIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GridIcon() {
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
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
