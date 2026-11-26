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

/** How each language says hello: what its speech bubble says. */
export const localeGreetings: Record<Locale, string> = {
  en: 'Hello!',
  de: 'Hallo!',
  es: '¡Hola!',
  bs: 'Zdravo!',
};

/**
 * Browser languages that are close enough to one of ours to suggest it:
 * someone reading Croatian or Serbian will be at home in the Bosnian version.
 */
const relatedLanguages: Record<string, Locale> = { hr: 'bs', sr: 'bs', sh: 'bs', cnr: 'bs' };

/** The first of the given browser languages (e.g. `navigator.languages`) that the site is available in. */
export function preferredLocale(languages: readonly string[]): Locale | undefined {
  for (const language of languages) {
    const code = language.toLowerCase().split('-')[0];
    const match = relatedLanguages[code] ?? code;
    if (isLocale(match)) return match;
  }
  return undefined;
}

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
