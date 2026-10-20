import type { ImageMetadata } from "astro";

// AVIF takes seconds per image to encode and the dev server doesn't cache it,
// so dev uses WebP only. Production builds generate both (and cache them).
export const imageFormats: ("avif" | "webp")[] = import.meta.env.DEV ? ["webp"] : ["avif", "webp"];

// Data files reference photos as "/images/<path>.jpg"; the masters live in
// src/assets/images so Astro can optimise them at build time. The glob is lazy,
// so only photos that are actually rendered end up in the build.
const images = import.meta.glob<{ default: ImageMetadata }>("/src/assets/images/**/*.jpg");

export async function resolveImage(path: string): Promise<ImageMetadata> {
  const key = `/src/assets${path}`;
  const load = images[key];
  if (!load) throw new Error(`Image not found: ${path} (expected ${key})`);
  return (await load()).default;
}

export function resolveImages(paths: string[]) {
  return Promise.all(paths.map(resolveImage));
}
