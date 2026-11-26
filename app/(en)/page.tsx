import HomePage from '@/components/HomePage';
import { defaultLocale } from '@/i18n/config';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata(defaultLocale);

export default function Page() {
  return <HomePage locale={defaultLocale} />;
}
