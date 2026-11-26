import type { ReactNode } from 'react';
import RootShell from '@/components/RootShell';
import { defaultLocale } from '@/i18n/config';

export { viewport } from '@/lib/metadata';

/** Root layout for the default language, served without a path prefix. */
export default function DefaultLocaleLayout({ children }: { children: ReactNode }) {
  return <RootShell locale={defaultLocale}>{children}</RootShell>;
}
