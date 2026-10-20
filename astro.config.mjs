// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://alojamentomontalegre.com",
  trailingSlash: "never",
  build: { format: "file" },
  // Fetch pages when a link is hovered or tapped, so navigation feels instant
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },

  i18n: {
    locales: ["pt", "en"],
    defaultLocale: "pt",
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Instrument Serif",
      cssVariable: "--font-instrument-serif",
      fallbacks: ["Georgia", "serif"],
      options: {
        variants: [
          {
            src: ["@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2"],
            weight: "400",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Stack",
      cssVariable: "--font-stack-local",
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
      options: {
        variants: [{ src: ["./src/assets/fonts/stack_regular.woff2"], weight: "400", style: "normal" }],
      },
    },
  ],

  integrations: [
    sitemap({
      i18n: { defaultLocale: "pt", locales: { pt: "pt-PT", en: "en" } },
      // The bare "/" is only a redirect to /pt; /creditos is noindex, so it stays out of the sitemap too
      filter: (page) => page !== "https://alojamentomontalegre.com/" && !page.includes("/creditos"),
    }),
  ],

  vite: { plugins: [tailwindcss()] },
});
