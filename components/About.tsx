import type { Dictionary } from '@/i18n/dictionaries';
import styles from './About.module.css';
import Terminal, { type TerminalEntry } from './Terminal';

type AboutProps = {
  id: string;
  t: Dictionary;
};

export default function About({ id, t }: AboutProps) {
  const session: TerminalEntry[] = [
    { command: t.whoami, output: [t.AboutMeText1, t.AboutMeText2, t.AboutMeText3], layout: 'prose' },
    { command: t.AboutInterestsCommand, output: t.AboutInterests, layout: 'list' },
  ];

  return (
    <section className={styles.root} id={id}>
      <div className={styles.shadow}>
        <div className={styles.card}>
          <h2>{t.AboutMe}</h2>
          <Terminal className={styles.text} entries={session} />
        </div>
      </div>
    </section>
  );
}
