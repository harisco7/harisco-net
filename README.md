# harisco-net

My personal website, [harisco.net](https://www.harisco.net): a fully static site built with [Next.js](https://nextjs.org/) 16, React 19 and TypeScript, available in English, German, Spanish and Bosnian.

## Getting started

Requires Node.js 24 (see `.nvmrc`).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — build the static site into `out/`
- `npm run preview` — serve `out/` locally, exactly as a static host would
- `npm run lint` — run ESLint
- `npm run typecheck` — run the TypeScript compiler without emitting
- `npm run format` — format everything with Prettier

## Deployment

`npm run build` writes plain HTML, CSS and JS to `out/`. There is no server: any static host can serve that folder.

The site is hosted on [Vercel](https://vercel.com/), which needs no configuration file: it detects Next.js, runs `npm run build` and serves the static export. Pushes to `main` go to production and every other branch or pull request gets a preview. Vercel takes the Node.js version from `engines` in `package.json`.

## Project structure

- `app/` — routes. `(en)/` is English, served at `/`; `[locale]/` is every other language, served at `/de/`, `/es/` and `/bs/`
- `components/` — the page sections (`hero/`, `About`, `Skills`, …), each with its own `.module.css`
- `i18n/` — the languages (`config.ts`) and their texts (`messages/<lang>.json`)
- `lib/` — site-wide constants, metadata and shared hooks
- `styles/` — global CSS
- `public/` — images and icons, copied to the site as-is

## Translations

`i18n/messages/en.json` is the source of truth. The other languages must have exactly the same keys, and the build fails if one is missing.

To add a language, add it to `locales` in `i18n/config.ts`, fill in the other maps in that file, add its `messages/<lang>.json` and register it in `i18n/dictionaries.ts`.

## Adding a page

Each page lives in a component, and both route folders render it. For `/blog/`:

1. Write `components/BlogPage.tsx`, taking a `locale` prop.
2. Add `app/(en)/blog/page.tsx` and `app/[locale]/blog/page.tsx`, copying the two existing `page.tsx` files and swapping in `BlogPage` and `buildMetadata(locale, '/blog')`.
