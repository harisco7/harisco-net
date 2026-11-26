import { knowledge } from '@/content/knowledge';
import type { Dictionary } from '@/i18n/dictionaries';
import styles from './Knowledge.module.css';
import Reveal from './Reveal';

type KnowledgeProps = {
  id: string;
  t: Dictionary;
};

export default function Knowledge({ id, t }: KnowledgeProps) {
  return (
    <section className={styles.root} id={id}>
      <div className={`container ${styles.container}`}>
        <h2>{t.Knowledge}</h2>
        <Reveal effect="zoom" cascade>
          {knowledge.map((label) => (
            <span key={label} className={styles.tag}>
              {label}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
