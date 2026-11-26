import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import RootShell from '@/components/RootShell';
import { isLocale, prefixedLocales } from '@/i18n/config';

export { viewport } from '@/lib/metadata';

// Only the listed languages exist: build `/de/`, `/es/` and `/bs/`, nothing else.
export const dynamicParams = false;

export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}

/** Root layout for every language served under its own path prefix. */
export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <RootShell locale={locale}>{children}</RootShell>;
}
