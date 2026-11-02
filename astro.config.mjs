// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://alojamentomontalegre.pt",
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
      // No hreflang here: each page's <head> carries the full set (with x-default), and the
      // plugin can only pair pages with the same path, which /pt/regiao and /en/region aren't.
      // The bare "/" is only a redirect to /pt; the credits page is noindex, so it stays out of the sitemap too
      filter: (page) => page !== "https://alojamentomontalegre.pt/" && !/\/(creditos|credits)$/.test(page),
    }),
  ],

  vite: { plugins: [tailwindcss()] },
});
