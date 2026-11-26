'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, useInView } from '@/lib/useInView';
import styles from './Typewriter.module.css';

type TypewriterProps = {
  /** Typed first, followed by a blinking cursor. */
  prompt: string;
  /** Typed after the prompt, one after another. */
  paragraphs: string[];
  className?: string;
};

const PROMPT_DELAY_MS = 1000;
const PROMPT_SPEED_MS = 40;
const BODY_DELAY_MS = 2000;
const BODY_SPEED_MS = 30;

/** Like a person typing: every keystroke takes a slightly different time. */
const keystroke = (speed: number) => speed + Math.round((Math.random() * speed) / 2);

/**
 * Types its text out once it scrolls into view. The full text is always in the
 * page, so it takes up its final space from the start and search engines and
 * screen readers get all of it; the part not typed yet is just transparent.
 */
export default function Typewriter({ prompt, paragraphs, className }: TypewriterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [promptTyped, setPromptTyped] = useState(0);
  const [bodyTyped, setBodyTyped] = useState(0);

  const bodyLength = paragraphs.reduce((total, paragraph) => total + paragraph.length, 0);

  useEffect(() => {
    if (!inView) return;

    const timers = new Set<ReturnType<typeof setTimeout>>();
    const later = (callback: () => void, delay: number) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        callback();
      }, delay);
      timers.add(timer);
    };

    const type = (length: number, speed: number, setTyped: (typed: number) => void, typed = 1) => {
      setTyped(typed);
      if (typed < length) later(() => type(length, speed, setTyped, typed + 1), keystroke(speed));
    };

    if (prefersReducedMotion()) {
      later(() => {
        setPromptTyped(prompt.length);
        setBodyTyped(bodyLength);
      }, 0);
    } else {
      later(() => type(prompt.length, PROMPT_SPEED_MS, setPromptTyped), PROMPT_DELAY_MS);
      later(() => type(bodyLength, BODY_SPEED_MS, setBodyTyped), BODY_DELAY_MS);
    }

    return () => timers.forEach(clearTimeout);
  }, [inView, prompt.length, bodyLength]);

  // Where each paragraph starts, counted in characters from the start of the first one.
  const offsets = paragraphs.map((_, index) => paragraphs.slice(0, index).reduce((total, paragraph) => total + paragraph.length, 0));

  return (
    <div ref={ref} className={className}>
      <span className={styles.prompt}>
        <Typed text={prompt} typed={promptTyped} cursor />
      </span>
      {paragraphs.map((paragraph, index) => {
        const typed = Math.max(0, Math.min(paragraph.length, bodyTyped - offsets[index]));
        return (
          <Fragment key={index}>
            <br />
            <br />
            <Typed text={paragraph} typed={typed} />
          </Fragment>
        );
      })}
    </div>
  );
}

function Typed({ text, typed, cursor = false }: { text: string; typed: number; cursor?: boolean }) {
  return (
    <>
      {text.slice(0, typed)}
      {cursor && (
        <span className={styles.cursor} aria-hidden="true" data-cursor="">
          _
        </span>
      )}
      {typed < text.length && <span data-untyped="">{text.slice(typed)}</span>}
    </>
  );
}
