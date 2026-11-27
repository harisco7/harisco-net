import type { CSSProperties } from 'react';
import type { Interest } from './interests';

/**
 * One passion as an inline drawing, in the current text colour. Wide marks
 * (F1, Marvel) would look tiny at the height of a square one, so each glyph
 * reports `--k`: how much wider than a square glyph it should be set for all
 * of them to carry the same visual weight. The styles around it decide the
 * actual size, e.g. `width: calc(40px * var(--k))`.
 */
export default function Glyph({ interest, className }: { interest: Interest; className?: string }) {
  const [, , width, height] = interest.viewBox;
  const k = Math.min(Math.max(Math.sqrt(width / height), 0.6), 1.7);

  return (
    <svg className={className} viewBox={interest.viewBox.join(' ')} style={{ '--k': k.toFixed(2) } as CSSProperties} aria-hidden="true" focusable="false">
      <path d={interest.d} fill="currentColor" fillRule={interest.evenOdd ? 'evenodd' : undefined} />
    </svg>
  );
}
