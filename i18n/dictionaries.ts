import type { Locale } from './config';
import bs from './messages/bs.json';
import de from './messages/de.json';
import en from './messages/en.json';
import es from './messages/es.json';

/** English is the source of truth: every other locale must have the same keys. */
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, de, es, bs };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
