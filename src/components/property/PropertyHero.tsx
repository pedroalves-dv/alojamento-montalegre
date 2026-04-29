"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  image: string;
  name: string;
  tagline: string;
  seasonal: string;
};

export default function PropertyHero({
  image,
  name,
  tagline,
  seasonal,
}: Props) {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
      <Image
        src={image}
        alt={name}
        fill
        priority
        loading="eager"
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-granite/25 via-transparent to-transparent" />

      <div className="relative z-10 px-6 pb-12 max-w-6xl mx-auto w-full">
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
          className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[0.9] mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        >
          {name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
          className="text-white/80 text-xl md:text-2xl font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        >
          {tagline}
        </motion.p>
      </div>
    </section>
  );
}
