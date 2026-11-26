import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HomePage from '@/components/HomePage';
import { isLocale } from '@/i18n/config';
import { buildMetadata } from '@/lib/metadata';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? buildMetadata(locale) : {};
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <HomePage locale={locale} />;
}
