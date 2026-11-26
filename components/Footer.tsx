import type { Dictionary } from '@/i18n/dictionaries';
import { site } from '@/lib/site';
import styles from './Footer.module.css';

type FooterProps = {
  t: Dictionary;
};

export default function Footer({ t }: FooterProps) {
  return (
    <footer className={styles.root}>
      <div className={`container ${styles.container}`}>
        {t.BuiltWith}{' '}
        <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
          Next.js
        </a>
        <br />
        {t.HostedBy}{' '}
        <a href="https://render.com/" target="_blank" rel="noopener noreferrer">
          Render
        </a>
        <br />
        <br />
        {t.CopyrightBy} {site.author}. &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
}
