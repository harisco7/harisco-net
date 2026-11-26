'use client';

import { useEffect, useState } from 'react';
import styles from './ScrollSpy.module.css';

type ScrollSpyProps = {
  items: { id: string; label: string }[];
};

/** The section list in the corner of the page, with the section on screen highlighted. */
export default function ScrollSpy({ items }: ScrollSpyProps) {
  const [current, setCurrent] = useState(items[0]?.id);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      // The current section is the last one that has reached the middle of the screen.
      const middle = window.innerHeight / 2;
      let active = items[0]?.id;
      for (const { id } of items) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= middle) active = id;
      }
      setCurrent(active);
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

  return (
    <nav className={styles.root}>
      <ul>
        {items.map(({ id, label }) => (
          <li key={id}>
            <a href={`#${id}`} className={id === current ? styles.current : undefined} aria-current={id === current ? 'location' : undefined}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
