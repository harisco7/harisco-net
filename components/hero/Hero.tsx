import { Bangers } from 'next/font/google';
import Image from 'next/image';
import { type Locale, locales } from '@/i18n/config';
import { type Dictionary, getDictionary } from '@/i18n/dictionaries';
import LanguagePicker from '../LanguagePicker';
import styles from './Hero.module.css';
import StickerPlayground from './StickerPlayground';

/** The comic-book lettering of "My Superpowers", for the speech bubble and the titles. */
const comic = Bangers({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  display: 'swap',
  variable: '--font-comic',
});

/** "This site is also available in …", said in each language itself. */
const languageHints = Object.fromEntries(locales.map((language) => [language, getDictionary(language).LanguageHint])) as Record<Locale, string>;

type HeroProps = {
  id: string;
  locale: Locale;
  t: Dictionary;
};

/**
 * The top of the homepage, and the opening panel of its comic: the portrait
 * says hello, three caption boxes say what Haris is, and around them float
 * the things he loves, as stickers (see StickerPlayground).
 */
export default function Hero({ id, locale, t }: HeroProps) {
  return (
    <header className={`${styles.root} ${comic.variable}`} id={id}>
      <StickerPlayground captions={t.HeroCaptions} />
      <div className={styles.languages} data-obstacle="clear">
        <LanguagePicker locale={locale} label={t.Languages} variant="bubbles" hints={languageHints} />
      </div>
      <div className={styles.center}>
        <div className={styles.panel} data-obstacle="">
          <Image className={styles.photo} src="/profile.webp" width={270} height={270} alt={t.headerImageAlt} loading="eager" fetchPriority="high" />
        </div>
        <div className={styles.says}>
          <h1 className={styles.bubble} data-obstacle="">
            {/* The bubble and its tail, stretched to fit whatever is said in it. */}
            <svg viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path d="M11.2 64.6 4 98l35.7-17.3A98 44 0 1 0 11.2 64.6Z" />
            </svg>
            <span>{t.HeroGreeting}</span>
          </h1>
          {/* What Haris is, the day job first. */}
          <ul className={styles.titles}>
            {t.HeroTitles.map((title) => (
              <li key={title} data-obstacle="">
                {title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
