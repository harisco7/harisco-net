/**
 * Cuts the photos on the site to the sizes they are shown at: `npm run images`.
 *
 * Every photo is written at several widths, so that each screen fetches no more
 * pixels than it can show, as WebP: every browser reads it, and at these sizes
 * AVIF would save a kilobyte or two at most. The picture that link previews show
 * is drawn here too. The results are committed: run this again only when a photo
 * or a size changes.
 */
import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const out = new URL('images/', root);

const photos = [
  {
    // The portrait in the hero, drawn 190 to 270 CSS pixels wide (see `.photo` in Hero.module.css).
    name: 'hero',
    source: 'images/originals/hero.jpg',
    // The panel is square. The original is a little wider than tall, with the spare room on the right.
    crop: { left: 0, top: 0, width: 3499, height: 3499 },
    // 1x on a desktop, 2x on a phone or tablet, 3x on a phone; 570 also serves a 2x desktop.
    widths: [270, 380, 570],
  },
  {
    // The portrait on the postcard's stamp, always 94 CSS pixels wide.
    name: 'stamp',
    source: 'images/originals/profile.jpg',
    widths: [94, 188, 282],
  },
];

await mkdir(out, { recursive: true });

for (const { name, source, crop, widths } of photos) {
  for (const width of widths) {
    // Camera data (EXIF) is left behind, and colours end up in sRGB.
    let image = sharp(fileURLToPath(new URL(source, root)));
    if (crop) image = image.extract(crop);
    image = image.resize({ width });

    const file = `${name}-${width}.webp`;
    const { size } = await image.webp({ quality: 80, effort: 6, smartSubsample: true }).toFile(fileURLToPath(new URL(file, out)));

    console.log(file.padEnd(16), `${(size / 1024).toFixed(1)} kB`);
  }
}

/*
 * The picture a shared link is previewed with: the portrait as the hero frames
 * it, a comic panel on the pale sky. Previews want 1200 by 630; the panel stays
 * inside the middle square, which is all that some apps keep.
 */
const portrait = await readFile(new URL('images/originals/profile.jpg', root));
const card = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="14" cy="14" r="4.4" fill="#23a0fc" fill-opacity="0.4" />
    </pattern>
    <linearGradient id="corners" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff" />
      <stop offset="0.38" stop-color="#000" />
      <stop offset="0.62" stop-color="#000" />
      <stop offset="1" stop-color="#fff" />
    </linearGradient>
    <mask id="fade">
      <rect width="1200" height="630" fill="url(#corners)" />
    </mask>
  </defs>
  <rect width="1200" height="630" fill="#d3edff" />
  <rect width="1200" height="630" fill="url(#dots)" mask="url(#fade)" />
  <g transform="rotate(-2.5 600 315)">
    <rect x="394" y="109" width="442" height="442" fill="#dc143c" />
    <rect x="379" y="94" width="442" height="442" fill="#200322" />
    <rect x="384" y="99" width="432" height="432" fill="#fffdf8" />
    <rect x="394" y="109" width="412" height="412" fill="#200322" />
    <image x="400" y="115" width="400" height="400" xlink:href="data:image/jpeg;base64,${portrait.toString('base64')}" />
  </g>
</svg>`;

const og = await sharp(Buffer.from(card))
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(fileURLToPath(new URL('public/og.jpg', root)));

console.log('og.jpg'.padEnd(16), `${(og.size / 1024).toFixed(1)} kB`);
