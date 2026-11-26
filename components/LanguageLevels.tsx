'use client';

import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/lib/useInView';
import { useSceneSeen } from './Scene';
import styles from './Skills.module.css';
import { BubbleArt } from './SuperpowerArt';

type LanguageLevelsProps = {
  languages: {
    /** Unique on the page. */
    id: string;
    name: string;
    /** A greeting in that language, shown inside its speech bubble. */
    hello: string;
    percent: number;
  }[];
};

/** Let the panel land before anything is poured. */
const POUR_DELAY_MS = 450;
const POUR_MS = 2600;

/** Runs a little past 1 and settles back, like liquid sloshing into a glass. */
const slosh = (progress: number) => 1 + 2.4 * (progress - 1) ** 3 + 1.4 * (progress - 1) ** 2;

/**
 * One speech bubble per language. Once the surrounding scene has been seen,
 * they fill up to the level of that language while the number below counts up.
 */
export default function LanguageLevels({ languages }: LanguageLevelsProps) {
  const seen = useSceneSeen();
  // How much has been poured so far: 0 is empty, 1 is every bubble at its level.
  // Before the show (and for anyone without JavaScript) they are simply full.
  const [poured, setPoured] = useState(1);

  useEffect(() => {
    if (!seen || prefersReducedMotion()) return;

    let frame = 0;
    let start: number | undefined;
    const tick = (time: number) => {
      start ??= time;
      const progress = Math.min(Math.max((time - start - POUR_DELAY_MS) / POUR_MS, 0), 1);
      setPoured(slosh(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen]);

  return (
    <ul className={styles.levels}>
      {languages.map(({ id, name, hello, percent }) => (
        <li key={id} role="img" aria-label={`${name}: ${percent} %`}>
          <div className={styles.afloat}>
            <BubbleArt id={id} hello={hello} level={percent * poured} />
          </div>
          <p className={styles.percent} aria-hidden="true">
            {Math.round(percent * Math.min(poured, 1))}
            <span>%</span>
          </p>
          <p className={styles.language} aria-hidden="true">
            {name}
          </p>
        </li>
      ))}
    </ul>
  );
}
