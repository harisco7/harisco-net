import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { site } from '@/lib/site';
import styles from './Footer.module.css';
import LanguagePicker from './LanguagePicker';

type FooterProps = {
  locale: Locale;
  t: Dictionary;
};

export default function Footer({ locale, t }: FooterProps) {
  return (
    <footer className={styles.root}>
      <div className={`container ${styles.container}`}>
        <div className={styles.languages}>
          <LanguagePicker locale={locale} label={t.Languages} variant="plain" />
        </div>
        {t.BuiltWith}{' '}
        <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
          Next.js
        </a>
        <br />
        {t.HostedBy}{' '}
        <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">
          Vercel
        </a>
        <br />
        <br />
        {t.CopyrightBy} {site.author}. &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
}
