// Open Graph images, rendered once at build time: Satori lays out the card
// (with the real brand serif) and sharp rasterises it to PNG.
import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import satori from "satori";
import sharp from "sharp";
import { properties } from "@/data/properties";
import { seo } from "@/data/seo";
import { locales, type Locale } from "@/i18n";

const WIDTH = 1200;
const HEIGHT = 630;
const AMBER = "#E59C2E";

type Card = { eyebrow: string; headline: string; subline: string; image: string };

function cardFor(page: string, locale: Locale): Card {
  const property = properties.find((p) => p.slug === page);
  if (property) {
    return {
      eyebrow: "ALOJAMENTO MONTALEGRE",
      headline: property.name[locale],
      subline: property.tagline[locale],
      image: property.images[0]!,
    };
  }
  const pages = {
    home: { data: seo.home, image: "/images/casa-do-moinho/1.jpg" },
    regiao: { data: seo.regiao, image: "/images/montalegre-2.jpg" },
    contacto: { data: seo.contacto, image: "/images/montalegre-castelo.jpg" },
  } as const;
  const { data, image } = pages[page as keyof typeof pages];
  return {
    eyebrow: data.og.eyebrow?.[locale] ?? "ALOJAMENTO MONTALEGRE",
    headline: data.og.headline[locale],
    subline: data.og.subline[locale],
    image,
  };
}

export const getStaticPaths = (() => {
  const pages = ["home", "regiao", "contacto", ...properties.map((p) => p.slug)];
  return locales.flatMap((locale) => pages.map((page) => ({ params: { locale, page } })));
}) satisfies GetStaticPaths;

// Plain-object VDOM so this file doesn't need a JSX runtime
type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (Node | string)[]): Node => ({
  type,
  props: { style: { display: "flex", ...style }, children },
});

let font: Buffer | undefined;

export const GET: APIRoute = async ({ params }) => {
  const card = cardFor(params.page!, params.locale as Locale);
  const root = process.cwd();

  font ??= await readFile(
    join(root, "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff"),
  );
  const photo = await sharp(join(root, "src/assets", card.image))
    .resize(WIDTH, HEIGHT, { fit: "cover" })
    .jpeg({ quality: 80 })
    .toBuffer();

  const svg = await satori(
    h(
      "div",
      { width: WIDTH, height: HEIGHT, position: "relative", fontFamily: "Instrument Serif", color: "white" },
      { type: "img", props: { src: `data:image/jpeg;base64,${photo.toString("base64")}`, width: WIDTH, height: HEIGHT, style: { position: "absolute", inset: 0 } } },
      h("div", {
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(180deg, rgba(20,30,20,0.15) 0%, rgba(20,30,20,0.55) 45%, rgba(20,30,20,0.92) 100%)",
      }),
      h(
        "div",
        { position: "absolute", left: 80, right: 80, bottom: 72, flexDirection: "column", gap: 14 },
        h("div", { color: AMBER, fontSize: 22, letterSpacing: "0.16em" }, card.eyebrow),
        h("div", { fontSize: 88, lineHeight: 1, whiteSpace: "pre-line" }, card.headline),
        h("div", { fontSize: 32, color: "rgba(245,242,236,0.85)" }, card.subline),
      ),
      h("div", { position: "absolute", left: 0, right: 0, bottom: 0, height: 8, backgroundColor: AMBER }),
    ),
    { width: WIDTH, height: HEIGHT, fonts: [{ name: "Instrument Serif", data: font, weight: 400, style: "normal" }] },
  );

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
