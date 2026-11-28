import type { StaticImageData } from 'next/image';

type PhotoProps = {
  /** The same photo at several widths, smallest first, as cut by `npm run images`. */
  cuts: StaticImageData[];
  /** How wide the photo is drawn, which decides the width a screen fetches. It has to agree with the CSS. */
  sizes: string;
  alt: string;
  className?: string;
  /** For a photo that is on screen from the start: fetched at once, ahead of everything else. */
  priority?: boolean;
};

/**
 * A photo that every screen fetches at its own size. The site is static, so
 * there is no server to resize pictures on request, which is what `next/image`
 * would lean on: the files are made ahead of time and the browser chooses
 * among them.
 */
export default function Photo({ cuts, sizes, alt, className, priority = false }: PhotoProps) {
  const [smallest] = cuts;
  const srcSet = cuts.map((cut) => `${cut.src} ${cut.width}w`).join(', ');

  // eslint-disable-next-line @next/next/no-img-element -- see above: these are the optimized files already
  return <img className={className} src={smallest.src} srcSet={srcSet} sizes={sizes} width={smallest.width} height={smallest.height} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />;
}
