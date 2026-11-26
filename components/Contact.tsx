import { Kalam } from 'next/font/google';
import type { Dictionary } from '@/i18n/dictionaries';
import { site } from '@/lib/site';
import styles from './Contact.module.css';
import ContactForm from './ContactForm';

/** The pen everything on the postcard is written with. */
const handwriting = Kalam({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  display: 'swap',
  variable: '--font-handwriting',
});

type ContactProps = {
  id: string;
  t: Dictionary;
};

export default function Contact({ id, t }: ContactProps) {
  return (
    <section className={`${styles.root} ${handwriting.variable}`} id={id}>
      <div className="container">
        <p className={styles.title}>{t.ContactTitle}</p>
        <h2>{t.ContactSubTitle}</h2>
        <p className={styles.intro}>{t.ContactIntro}</p>
        <ContactForm
          email={site.email}
          recipient={site.author}
          labels={{
            greeting: t.ContactGreeting,
            name: t.ContactName,
            message: t.ContactYourMessage,
            placeholder: t.ContactPlaceholder,
            send: t.ContactSend,
            subject: t.ContactSubject,
            sent: t.ContactSent,
          }}
        />
      </div>
    </section>
  );
}
