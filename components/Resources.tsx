import { collections, newsletters } from '@/content/resources';
import type { Dictionary } from '@/i18n/dictionaries';
import styles from './Resources.module.css';

type ResourcesProps = {
  id: string;
  t: Dictionary;
};

export default function Resources({ id, t }: ResourcesProps) {
  return (
    <section className={styles.root} id={id}>
      <div className={`container ${styles.container}`}>
        <h2>{t.Resources}</h2>
        <p className={styles.intro}>{t.ResourcesDesc}</p>
        <div className="row">
          <div className={`col-12 ${styles.group}`}>
            <h3>{t.EmailNewsletters}</h3>
            <div className="row justify-content-center">
              {newsletters.map((newsletter) => (
                <a key={newsletter.href} className={styles.tag} href={newsletter.href} target="_blank" rel="noopener noreferrer">
                  {newsletter.name}
                </a>
              ))}
            </div>
          </div>
          {collections.map((collection) => (
            <div key={collection.link.href} className={`col-12 col-md-4 ${styles.group}`}>
              <h3>{'key' in collection.title ? t[collection.title.key] : collection.title.text}</h3>
              <div className={styles.subtitle}>{t[collection.description]}</div>
              <a className={styles.tag} href={collection.link.href} target="_blank" rel="noopener noreferrer">
                {collection.link.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
