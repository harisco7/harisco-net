'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { type Locale, localeGreetings, localeNames, localePath, locales, preferredLocale } from '@/i18n/config';
import styles from './LanguagePicker.module.css';

type LanguagePickerProps = {
  /** The language of the current page. */
  locale: Locale;
  /** Names the navigation for screen readers, in the page's language. */
  label: string;
  /**
   * `bubbles`: a speech bubble per language, each saying hello in it.
   * `plain`: just the names in a row.
   */
  variant: 'bubbles' | 'plain';
  /** "This site is also available in …", each in its own language. Only used by `bubbles`. */
  hints?: Record<Locale, string>;
};

/** Set once the visitor has picked a language themselves; after that nothing is suggested. */
const CHOICE_KEY = 'language';

function rememberChoice(locale: Locale) {
  try {
    localStorage.setItem(CHOICE_KEY, locale);
  } catch {
    // No storage (private window, blocked): the suggestion may come back, nothing worse.
  }
}

/** The site language the visitor's browser asks for, unless they have already chosen one. */
function browserSuggestion(): Locale | undefined {
  try {
    if (localStorage.getItem(CHOICE_KEY)) return undefined;
  } catch {
    // Carry on without the stored choice.
  }
  return preferredLocale(navigator.languages ?? [navigator.language]);
}

const subscribeToNothing = () => () => {};
const noSuggestion = () => undefined;

/**
 * Links to the page in every language. The site is static, so nobody is ever
 * redirected: if the browser prefers one of the other languages, that one
 * waves and a line in that language says it is there.
 */
export default function LanguagePicker({ locale, label, variant, hints }: LanguagePickerProps) {
  const preferred = useSyncExternalStore(subscribeToNothing, browserSuggestion, noSuggestion);
  const suggested = variant === 'bubbles' && preferred !== locale ? preferred : undefined;

  return (
    <nav className={`${styles.root} ${styles[variant]}`} aria-label={label}>
      <ul className={styles.list}>
        {locales.map((language) => (
          <li key={language} data-suggested={language === suggested ? '' : undefined}>
            <Link className={styles.link} href={localePath(language)} hrefLang={language} lang={language} aria-current={language === locale ? 'page' : undefined} onClick={() => rememberChoice(language)}>
              {variant === 'bubbles' && <span className={styles.bubble}>{localeGreetings[language]}</span>}
              <span className={styles.name}>{localeNames[language]}</span>
            </Link>
          </li>
        ))}
      </ul>
      {suggested && hints && (
        <p className={styles.hint} lang={suggested}>
          <Link href={localePath(suggested)} hrefLang={suggested} onClick={() => rememberChoice(suggested)}>
            {hints[suggested]}
          </Link>
        </p>
      )}
    </nav>
  );
}
