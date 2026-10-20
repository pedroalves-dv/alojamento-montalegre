// Normalises source photos before they go into src/assets/images.
//
//   npm run images -- <input-dir> [output-dir]
//
// Every image (any format, any extension — even mislabelled ones) is
// auto-rotated from EXIF, capped at 2400px on the long edge and re-encoded as
// a progressive JPEG. Output keeps the folder structure and base filename but
// always uses a `.jpg` extension. Astro then generates the responsive
// AVIF/WebP variants at build time from these masters.

import { readdir, mkdir, stat } from "node:fs/promises";
import { join, relative, dirname, parse } from "node:path";
import sharp from "sharp";

const [input, output = "src/assets/images"] = process.argv.slice(2);
if (!input) {
  console.error("Usage: npm run images -- <input-dir> [output-dir]");
  process.exit(1);
}

const MAX_EDGE = 2400;
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|heic|tiff?)$/i;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (IMAGE_EXT.test(entry.name)) yield path;
  }
}

let before = 0;
let after = 0;

for await (const file of walk(input)) {
  const { dir, name } = parse(relative(input, file));
  const dest = join(output, dir, `${name}.jpg`);
  await mkdir(dirname(dest), { recursive: true });

  const info = await sharp(file)
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true, progressive: true })
    .toFile(dest);

  const size = (await stat(file)).size;
  before += size;
  after += info.size;
  console.log(
    `${relative(input, file).padEnd(48)} ${info.width}x${info.height}  ${kb(size)} → ${kb(info.size)}`,
  );
}

console.log(`\nTotal: ${kb(before)} → ${kb(after)}`);

function kb(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}
