import type { Dictionary } from '@/i18n/dictionaries';
import styles from './About.module.css';
import Typewriter from './Typewriter';

type AboutProps = {
  id: string;
  t: Dictionary;
};

export default function About({ id, t }: AboutProps) {
  return (
    <section className={styles.root} id={id}>
      <div className={`${styles.container} col-12 col-lg-auto`}>
        <div className={styles.diagonal}>
          <h2>{t.AboutMe}</h2>
          <Typewriter className={styles.text} prompt={`> ${t.whoami}`} paragraphs={[t.AboutMeText1, t.AboutMeText2, t.AboutMeText3, t.AboutMeText4]} />
        </div>
      </div>
    </section>
  );
}
