"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE = "/images/casa-do-moinho/1.jpg";

export default function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations("Home");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Terras de Barroso"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* <div className="absolute inset-0 bg-granite/25" /> */}

      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /> */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.3)_40%,rgba(0,0,0,0.15)_65%,transparent_80%)]" />

      <div className="relative z-10 text-center text-white max-w-6xl px-10 md:pb-24 pb-16 ">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-5xl md:text-7xl leading-[0.9]"
        >
          {t("heroHeadline1")}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-stack text-white text-5xl md:text-7xl leading-[0.9] mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        >
          {t("heroHeadline2")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: "easeOut" }}
          className="text-lg md:text-xl opacity-85 mb-16 font-light tracking-wide"
        >
          {t("heroTagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link
            href={`/${locale}#casas`}
            className="bg-amber hover:bg-fog hover:text-granite border border-fog/10 hover:border-granite/50 text-white px-8 py-3.5 rounded-lg font-medium tracking-wide transition-colors duration-200"
          >
            {t("ctaVerCasas")}
          </Link>
          <Link
            href={`/${locale}/regiao`}
            className="bg-moss hover:bg-fog hover:text-granite border border-fog/10 hover:border-granite/50 text-white px-8 py-3.5 rounded-lg font-medium tracking-wide transition-colors duration-200"
          >
            {t("ctaConhecerRegiao")}
          </Link>
        </motion.div>
      </div>

      {/* Subtle scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        aria-hidden
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
