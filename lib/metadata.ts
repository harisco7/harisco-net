import type { Metadata, Viewport } from 'next';
import { defaultLocale, type Locale, localePath, locales, ogLocales } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { site } from './site';

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

/**
 * Metadata for a page that exists in every language. `path` is the page's
 * path without the locale prefix, e.g. `/` or `/blog`.
 */
export function buildMetadata(locale: Locale, path = '/'): Metadata {
  const t = getDictionary(locale);
  const title = `${site.author} | ${t.h2}`;
  const url = localePath(locale, path);

  return {
    metadataBase: new URL(site.url),
    title,
    description: t.description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((language) => [language, localePath(language, path)])),
        'x-default': localePath(defaultLocale, path),
      },
    },
    openGraph: {
      type: 'website',
      url,
      siteName: site.name,
      title: `${site.author} - harisco.net`,
      description: t.description,
      locale: ogLocales[locale],
      images: [{ url: '/profile.png', alt: t.headerImageAlt }],
    },
    icons: {
      icon: [{ url: '/logo.png', type: 'image/png' }],
      apple: '/logo.png',
    },
    verification: {
      google: site.googleSiteVerification,
    },
  };
}
