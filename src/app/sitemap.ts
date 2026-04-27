import type { MetadataRoute } from "next";
import { properties } from "@/data/properties";
import { config } from "@/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["pt", "en"] as const;
  const staticPaths = ["", "/regiao", "/contacto"];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${config.siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: path === "" ? 1.0 : 0.8,
    }))
  );

  const propertyEntries: MetadataRoute.Sitemap = properties.flatMap((p) =>
    locales.map((locale) => ({
      url: `${config.siteUrl}/${locale}/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    }))
  );

  return [...staticEntries, ...propertyEntries];
}
