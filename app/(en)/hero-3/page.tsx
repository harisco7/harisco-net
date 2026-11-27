import type { Metadata } from 'next';
import HeroStickers from '@/components/hero/HeroStickers';
import HomePage from '@/components/HomePage';
import { defaultLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

/** The new hero, "Sticker sheet", on the full homepage while it is still being worked on. Not linked from anywhere. */
export const metadata: Metadata = {
  title: 'Hero draft: Sticker sheet',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <HomePage locale={defaultLocale} hero={<HeroStickers id="Header" locale={defaultLocale} t={getDictionary(defaultLocale)} />} />;
}
