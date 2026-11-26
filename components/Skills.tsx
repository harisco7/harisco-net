import { Bangers } from 'next/font/google';
import type { Dictionary } from '@/i18n/dictionaries';
import LanguageLevels from './LanguageLevels';
import Scene from './Scene';
import styles from './Skills.module.css';
import { burst, ChecklistArt, ClockArt, KnifeArt, LensArt } from './SuperpowerArt';

/** Comic-book lettering for the headline, the panel titles and the speech bubbles. */
const comic = Bangers({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  display: 'swap',
  variable: '--font-comic',
});

type SkillsProps = {
  id: string;
  t: Dictionary;
};

/** "My Superpowers": a comic-book page with one panel per skill. */
export default function Skills({ id, t }: SkillsProps) {
  const powers = [
    { title: t.TimeManagement, caption: t.TimeManagementPower, Art: ClockArt, look: `${styles.wide} ${styles.clockPanel}` },
    { title: t.AttentionToDetails, caption: t.AttentionToDetailsPower, Art: LensArt, look: `${styles.narrow} ${styles.lensPanel}` },
    { title: t.Resourcefulness, caption: t.ResourcefulnessPower, Art: KnifeArt, look: `${styles.narrow} ${styles.knifePanel}` },
    { title: t.Responsibility, caption: t.ResponsibilityPower, Art: ChecklistArt, look: `${styles.wide} ${styles.checklistPanel}` },
  ];

  const languages = [
    { id: 'en', name: t.english, hello: 'Hello!', percent: 97 },
    { id: 'de', name: t.german, hello: 'Hallo!', percent: 90 },
    { id: 'es', name: t.spanish, hello: '¡Hola!', percent: 33 },
  ];

  return (
    <section className={`${styles.root} ${comic.variable}`} id={id}>
      <div className={`container ${styles.container}`}>
        <Scene className={styles.headline}>
          <h2 className={styles.heading}>
            <svg className={styles.burst} viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true">
              <polygon points={burst(200, 80, 200, 80, 17, 0.8)} />
            </svg>
            <span>{t.Superpowers}</span>
          </h2>
        </Scene>

        <div className={styles.page}>
          {powers.map(({ title, caption, Art, look }) => (
            <Scene key={title} className={`${styles.panel} ${look}`}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.art}>
                <Art />
              </div>
              <p className={styles.caption}>{caption}</p>
            </Scene>
          ))}

          <Scene className={`${styles.panel} ${styles.languagesPanel}`}>
            <h3 className={styles.title}>{t.Languages}</h3>
            <div className={styles.art}>
              <LanguageLevels languages={languages} />
            </div>
            <p className={styles.caption}>{t.LanguagesPower}</p>
          </Scene>
        </div>
      </div>
    </section>
  );
}
