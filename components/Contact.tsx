import type { Dictionary } from '@/i18n/dictionaries';
import { site } from '@/lib/site';
import styles from './Contact.module.css';

type ContactProps = {
  id: string;
  t: Dictionary;
};

export default function Contact({ id, t }: ContactProps) {
  const mailto = `mailto:${site.email}`;
  const [beforeEmail, afterEmail = ''] = t.ContactMessage.split('{{email}}');

  return (
    <section className={styles.root} id={id}>
      <div className="container">
        <p className={styles.title}>{t.ContactTitle}</p>
        <h2>{t.ContactSubTitle}</h2>
        <p className={styles.message}>
          {beforeEmail}
          <a href={mailto}>{site.email}</a>
          {afterEmail}
        </p>
        <a className={styles.button} href={mailto}>
          {t.emailTitle}
        </a>
      </div>
    </section>
  );
}
