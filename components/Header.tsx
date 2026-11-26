import Image from 'next/image';
import Link from 'next/link';
import { type Locale, localeNames, localePath, locales } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { site } from '@/lib/site';
import styles from './Header.module.css';
import NetworkBackground from './NetworkBackground';

const socialLinks = [
  { name: 'LinkedIn', href: site.social.linkedin, icon: '/linkedin.svg' },
  { name: 'DEV.to', href: site.social.devto, icon: '/devto.svg' },
  { name: 'GitHub', href: site.social.github, icon: '/github.svg' },
];

type HeaderProps = {
  id: string;
  locale: Locale;
  t: Dictionary;
};

export default function Header({ id, locale, t }: HeaderProps) {
  return (
    <header className={styles.root} id={id}>
      <div className={styles.content}>
        <nav className={styles.languages}>
          {locales.map((language) => (
            <Link key={language} href={localePath(language)} hrefLang={language} lang={language} className={language === locale ? styles.selected : undefined} aria-current={language === locale ? 'page' : undefined}>
              <Image src={`/${language}.svg`} width={25} height={15} alt="" />
              <span className={styles.languageLabel}>{localeNames[language]}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.center}>
          <h1>{site.author}</h1>
          <div className={styles.profile}>
            <Image width={150} height={150} className={styles.photo} src="/profile.webp" alt={t.headerImageAlt} priority />
            <div className={styles.social}>
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
                  <Image src={link.icon} width={24} height={24} alt={link.name} />
                </a>
              ))}
            </div>
          </div>
          <h2>{t.h2}</h2>
        </div>
      </div>
      <NetworkBackground className={styles.background} />
    </header>
  );
}
