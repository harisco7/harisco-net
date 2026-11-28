import { Kalam } from 'next/font/google';
import type { Dictionary } from '@/i18n/dictionaries';
import stamp94 from '@/images/stamp-94.webp';
import stamp188 from '@/images/stamp-188.webp';
import stamp282 from '@/images/stamp-282.webp';
import { site } from '@/lib/site';
import styles from './Contact.module.css';
import ContactForm from './ContactForm';
import Photo from './Photo';

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
          linkedin={site.linkedin}
          recipient={site.author}
          portrait={<Photo cuts={[stamp94, stamp188, stamp282]} sizes="94px" alt="" />}
          labels={{
            greeting: t.ContactGreeting,
            name: t.ContactName,
            message: t.ContactYourMessage,
            placeholder: t.ContactPlaceholder,
            send: t.ContactSend,
            subject: t.ContactSubject,
            sent: t.ContactSent,
            linkedin: t.ContactLinkedIn,
          }}
        />
      </div>
    </section>
  );
}
