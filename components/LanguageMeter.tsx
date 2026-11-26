'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, useInView } from '@/lib/useInView';
import styles from './LanguageMeter.module.css';

type LanguageMeterProps = {
  name: string;
  flag: string;
  percent: number;
};

/** Wait for the surrounding entrance animation before starting to count. */
const START_DELAY_MS = 1500;
const COUNT_DURATION_MS = 4000;

const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CIRCLE_PATH = `M 50,50 m 0,-${RADIUS} a ${RADIUS},${RADIUS} 0 1 1 0,${2 * RADIUS} a ${RADIUS},${RADIUS} 0 1 1 0,-${2 * RADIUS}`;

const easeOutExpo = (progress: number) => (progress === 1 ? 1 : 1 - 2 ** (-10 * progress));

/** A flag inside a ring that fills up to the given percentage, with the number counting up below. */
export default function LanguageMeter({ name, flag, percent }: LanguageMeterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    const timer = setTimeout(
      () => {
        setStarted(true);
        if (prefersReducedMotion()) {
          setCount(percent);
          return;
        }
        const startTime = performance.now();
        const tick = (time: number) => {
          const progress = Math.min((time - startTime) / COUNT_DURATION_MS, 1);
          setCount(Math.round(percent * easeOutExpo(progress)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      prefersReducedMotion() ? 0 : START_DELAY_MS,
    );

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [inView, percent]);

  return (
    <div ref={ref} className={styles.root} role="img" aria-label={`${name}: ${percent} %`}>
      <Image src={flag} alt="" width={135} height={135} className={styles.flag} />
      <svg className={styles.ring} viewBox="0 0 100 100" aria-hidden="true">
        <path className={styles.trail} d={CIRCLE_PATH} />
        <path className={styles.path} d={CIRCLE_PATH} strokeDasharray={CIRCUMFERENCE} strokeDashoffset={started ? CIRCUMFERENCE * (1 - percent / 100) : CIRCUMFERENCE} />
      </svg>
      <div className={styles.label} aria-hidden="true">
        {started ? `${count} %` : null}
      </div>
    </div>
  );
}
