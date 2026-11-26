export const locales = ['en', 'de', 'es', 'bs'] as const;
export type Locale = (typeof locales)[number];

/** Served at `/`. Every other locale is served under `/<locale>/`. */
export const defaultLocale: Locale = 'en';

export const prefixedLocales = locales.filter((locale) => locale !== defaultLocale);

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  bs: 'Bosanski',
};

/** Open Graph locale codes. */
export const ogLocales: Record<Locale, string> = {
  en: 'en_IE',
  de: 'de_DE',
  es: 'es_ES',
  bs: 'bs_BA',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Path of a page in the given locale, e.g. `localePath('de')` is `/de/` and
 * `localePath('en', '/blog')` is `/blog/`.
 */
export function localePath(locale: Locale, path = '/'): string {
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  const rest = path === '/' ? '' : path.replace(/\/$/, '');
  return `${prefix}${rest}/`;
}
