import { Cairo } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Locale } from '@/i18n/config';
import '@/styles/reboot.css';
import '@/styles/grid.css';
import '@/styles/globals.css';

const cairo = Cairo({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '700'],
  display: 'swap',
  variable: '--font-cairo',
});

/** Without JavaScript nothing would ever animate in, so show everything straight away. */
const noScriptStyles = `
  [data-reveal] > * { opacity: 1 !important; transform: none !important; }
  [data-untyped] { opacity: 1 !important; }
  [data-cursor] { display: none; }
  [data-scene] { opacity: 1 !important; transform: none !important; }
  [data-scene] * { animation-play-state: running !important; }
`;

/** The `<html>` and `<body>` shared by every root layout. */
export default function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={cairo.variable}>
      <body>
        <noscript>
          <style>{noScriptStyles}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
