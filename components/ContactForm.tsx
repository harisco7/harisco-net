'use client';

import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/useInView';
import styles from './Contact.module.css';

type ContactFormProps = {
  email: string;
  /** The other way to get in touch: the address of a LinkedIn profile. */
  linkedin: string;
  /** Printed on the address side of the card. */
  recipient: string;
  /** The picture printed on the stamp. */
  portrait: ReactNode;
  labels: {
    /** Already written on the card, and the first line of the drafted e-mail. */
    greeting: string;
    name: string;
    message: string;
    placeholder: string;
    send: string;
    /** Subject of the drafted e-mail; `{{name}}` is replaced with the visitor's name. */
    subject: string;
    /** Shown once the card is postmarked; `{{email}}` is replaced with a link. */
    sent: string;
    /** "via LinkedIn", printed on the card's routing label. */
    linkedin: string;
  };
};

/** How long the postmark gets to land before the mail app takes over the screen. */
const POSTMARK_MS = 550;

/**
 * The contact form, dressed as a postcard. The site is static, so nothing is
 * sent from here: posting the card postmarks it and opens the visitor's own
 * mail app with a draft that already holds what they wrote.
 */
export default function ContactForm({ email, linkedin, recipient, portrait, labels }: ContactFormProps) {
  // `count` restarts the postmark animation when the card is posted again.
  const [postmark, setPostmark] = useState<{ count: number; day: string; year: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const post = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const subject = labels.subject.replace('{{name}}', name);
    // Mail apps expect CRLF line breaks in a mailto body (RFC 6068).
    const body = `${labels.greeting}\n\n${message}\n\n${name}`.replace(/\r?\n/g, '\r\n');
    const draft = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const today = new Date();
    const language = document.documentElement.lang || undefined;
    setPostmark((previous) => ({
      count: (previous?.count ?? 0) + 1,
      day: today.toLocaleDateString(language, { day: '2-digit', month: 'short' }),
      year: String(today.getFullYear()),
    }));

    clearTimeout(timer.current);
    timer.current = setTimeout(
      () => {
        window.location.href = draft;
      },
      prefersReducedMotion() ? 0 : POSTMARK_MS,
    );
  };

  const domain = email.slice(email.indexOf('@') + 1);
  const [beforeEmail, afterEmail = ''] = labels.sent.split('{{email}}');

  return (
    <form className={styles.form} onSubmit={post}>
      <div className={styles.card}>
        <div className={styles.letter}>
          <p className={`${styles.handwriting} ${styles.ruled}`}>{labels.greeting}</p>
          <textarea className={`${styles.handwriting} ${styles.ruled} ${styles.message}`} name="message" rows={5} aria-label={labels.message} placeholder={labels.placeholder} required />
          <div className={styles.signature}>
            <span className={styles.handwriting} aria-hidden="true">
              —
            </span>
            <input className={styles.handwriting} type="text" name="name" aria-label={labels.name} placeholder={labels.name} autoComplete="name" required />
          </div>
        </div>

        <div className={styles.address}>
          <div className={styles.postage}>
            <div className={styles.stampShadow}>
              <div className={styles.stamp}>
                <span className={styles.portrait}>{portrait}</span>
                <span className={styles.stampName}>{domain}</span>
              </div>
            </div>
            {postmark && <Postmark key={postmark.count} place={domain} day={postmark.day} year={postmark.year} />}
          </div>
          <div className={styles.to}>
            {/* Where an airmail card says "par avion", this one names the other route to its recipient. */}
            <a className={styles.via} href={linkedin} target="_blank" rel="noopener noreferrer">
              <span>{labels.linkedin}</span>
              <span>{linkedin.replace(/^https?:\/\/(www\.)?|\/$/g, '')}</span>
            </a>
            <p className={styles.addressLines}>
              <span>{recipient}</span>
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          </div>
        </div>
      </div>

      <button className={styles.button} type="submit">
        {labels.send}
      </button>
      <p className={styles.status} role="status">
        {postmark && (
          <>
            {beforeEmail}
            <a href={`mailto:${email}`}>{email}</a>
            {afterEmail}
          </>
        )}
      </p>
    </form>
  );
}

/** The ink cancellation that lands on the stamp: a dated ring and its wavy lines. */
function Postmark({ place, day, year }: { place: string; day: string; year: string }) {
  return (
    <svg className={styles.postmark} viewBox="0 0 200 100" aria-hidden="true">
      <defs>
        <path id="postmark-top" d="M 16 50 a 34 34 0 0 1 68 0" />
        <path id="postmark-bottom" d="M 9 50 a 41 41 0 0 0 82 0" />
      </defs>
      <g fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="46" strokeWidth="2" />
        <circle cx="50" cy="50" r="30" strokeWidth="1.2" />
        {[26, 38, 50, 62, 74].map((y) => (
          <path key={y} d={`M 102 ${y} q 8 -7 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0`} strokeWidth="1.8" strokeLinecap="round" />
        ))}
      </g>
      <g fill="currentColor" textAnchor="middle">
        <text fontSize="8" letterSpacing="1.4">
          <textPath href="#postmark-top" startOffset="50%">
            {place}
          </textPath>
        </text>
        <text fontSize="7" letterSpacing="5">
          <textPath href="#postmark-bottom" startOffset="50%">
            ★★★
          </textPath>
        </text>
        <text x="50" y="49" fontSize="10.5">
          {day}
        </text>
        <text x="50" y="61" fontSize="10.5">
          {year}
        </text>
      </g>
    </svg>
  );
}
