import { Bangers } from 'next/font/google';
import Image from 'next/image';
import styles from './HeroStickers.module.css';
import { HeroLanguages, type HeroProps } from './shared';
import StickerPlayground from './StickerPlayground';

/** The comic-book lettering of "My Superpowers", for the speech bubble. */
const comic = Bangers({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  display: 'swap',
  variable: '--font-comic',
});

/** What Haris is, on caption boxes under the speech bubble: the day job first. */
const titles = ['Web engineer', 'All-terrain athlete', 'Part-time superhero'];

/** The new hero, "Sticker sheet". Still a draft: its words are only in English. */
export default function HeroStickers({ id, locale, t }: HeroProps) {
  return (
    <header className={`${styles.root} ${comic.variable}`} id={id}>
      <StickerPlayground />
      <div className={styles.languages} data-obstacle="clear">
        <HeroLanguages locale={locale} t={t} />
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
            <span>Hey, I’m Haris!</span>
          </h1>
          <ul className={styles.titles}>
            {titles.map((title) => (
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
