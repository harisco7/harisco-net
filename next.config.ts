import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to `out/`.
  output: 'export',
  // Emit `de/index.html` rather than `de.html`, so any static host can serve it.
  trailingSlash: true,
  // The image optimizer needs a server; images are served as-is.
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
