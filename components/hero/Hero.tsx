import { Bangers } from 'next/font/google';
import { type Locale, locales } from '@/i18n/config';
import { type Dictionary, getDictionary } from '@/i18n/dictionaries';
import photo270 from '@/images/hero-270.webp';
import photo380 from '@/images/hero-380.webp';
import photo570 from '@/images/hero-570.webp';
import LanguagePicker from '../LanguagePicker';
import Photo from '../Photo';
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
          {/* `sizes` spells out the width of `.photo`, clamp(190px, 24vw, 270px), less its 4px border on either side. */}
          <Photo className={styles.photo} cuts={[photo270, photo380, photo570]} sizes="(min-width: 1125px) 262px, (min-width: 792px) calc(24vw - 8px), 182px" alt={t.headerImageAlt} priority />
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
