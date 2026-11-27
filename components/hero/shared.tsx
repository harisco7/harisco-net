import { type Locale, locales } from '@/i18n/config';
import { type Dictionary, getDictionary } from '@/i18n/dictionaries';
import LanguagePicker from '../LanguagePicker';

export type HeroProps = {
  id: string;
  locale: Locale;
  t: Dictionary;
};

/** "This site is also available in …", said in each language itself. */
const languageHints = Object.fromEntries(locales.map((language) => [language, getDictionary(language).LanguageHint])) as Record<Locale, string>;

/** The speech-bubble language picker, as on the current hero. */
export function HeroLanguages({ locale, t }: Pick<HeroProps, 'locale' | 't'>) {
  return <LanguagePicker locale={locale} label={t.Languages} variant="bubbles" hints={languageHints} />;
}
