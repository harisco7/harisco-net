# harisco-net

My personal website, built with [Next.js](https://nextjs.org/) 11 and available in English, Spanish, Bosnian and German (via `next-i18next`).

## Getting started

Requires Node.js 16 (see `.nvmrc`). Next.js 11 does not build on Node 17+.

```bash
nvm use
npm install
cp .env.example .env.local   # then add your SendGrid API key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Name               | Used by                | Purpose                         |
| ------------------ | ---------------------- | ------------------------------- |
| `SENDGRID_API_KEY` | `pages/api/contact.js` | Sends contact form submissions  |

## Project structure

- `pages/` — the home page and API routes (`api/contact.js` handles the contact form)
- `components/` — page sections (About, Skills, Projects, Contact, …)
- `public/` — images, icons and translation files (`public/locales/<lang>/common.json`)
- `css/`, `styles/` — global styles and Bootstrap grid

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — run ESLint
