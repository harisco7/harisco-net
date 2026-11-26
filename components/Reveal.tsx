'use client';

import { type ReactNode, useEffect, useRef } from 'react';
import { useInView } from '@/lib/useInView';

type RevealProps = {
  effect: 'fade' | 'slide-left' | 'zoom';
  /** Animate the children one after another instead of all at once. */
  cascade?: boolean;
  className?: string;
  children: ReactNode;
};

/** Longest gap between two cascading children, and the cap for the whole cascade. */
const MAX_STAGGER_MS = 80;
const MAX_CASCADE_MS = 1000;

/**
 * Animates its direct children into place the first time it scrolls into view.
 * The styles live in styles/globals.css, keyed on the `data-reveal` attributes.
 */
export default function Reveal({ effect, cascade = false, className, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useInView(ref);

  useEffect(() => {
    const element = ref.current;
    if (!cascade || !element) return;

    const items = Array.from(element.children) as HTMLElement[];
    const stagger = Math.min(MAX_STAGGER_MS, MAX_CASCADE_MS / Math.max(items.length, 1));
    element.style.setProperty('--reveal-stagger', `${stagger}ms`);
    items.forEach((item, index) => item.style.setProperty('--reveal-index', String(index)));
  }, [cascade]);

  return (
    <div ref={ref} className={className} data-reveal={effect} data-revealed={revealed ? '' : undefined}>
      {children}
    </div>
  );
}
