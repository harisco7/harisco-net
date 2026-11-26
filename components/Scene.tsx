'use client';

import { createContext, type ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { useInView } from '@/lib/useInView';

const SceneSeen = createContext(false);

/** Whether the surrounding scene has scrolled into view yet. */
export const useSceneSeen = () => useContext(SceneSeen);

type SceneProps = {
  className?: string;
  children: ReactNode;
};

/**
 * A part of the page that puts on a show. It gets `data-seen` the first time
 * it scrolls into view (the cue for an entrance) and carries `data-playing`
 * for as long as any of it is on screen, so looping animations can rest while
 * nobody is watching. The styles decide what either of those looks like.
 */
export default function Scene({ className, children }: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      setPlaying(entries.some((entry) => entry.isIntersecting));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} data-scene="" data-seen={seen ? '' : undefined} data-playing={playing ? '' : undefined}>
      <SceneSeen value={seen}>{children}</SceneSeen>
    </div>
  );
}
