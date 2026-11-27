'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, useInView } from '@/lib/useInView';
import styles from './Terminal.module.css';

export type TerminalEntry = {
  /** Typed after the prompt, key by key. */
  command: string;
  /** What the command prints: paragraphs of prose, or the items of a listing. */
  output: string[];
  layout: 'prose' | 'list';
};

type TerminalProps = {
  entries: TerminalEntry[];
  className?: string;
};

/** A moment of thought before a command is typed, and the beat after pressing enter. */
const THINK_MS = 700;
const ENTER_MS = 350;
const KEY_MS = 42;
/** Output is quicker than a person types, but slow enough to follow as it appears. */
const PRINT_MS = 8;
const LIST_ITEM_MS = 85;

/** Like a person typing: every keystroke takes a slightly different time. */
const keystroke = () => KEY_MS + Math.round(Math.random() * KEY_MS * 0.8);
/** The same unevenness for printed characters, around `PRINT_MS` each. */
const printPace = () => Math.round(PRINT_MS * (0.65 + Math.random() * 0.7));

/** How many steps it takes to print an entry's output: characters of prose, or items of a list. */
const outputLength = (entry: TerminalEntry) => (entry.layout === 'list' ? entry.output.length : entry.output.join('').length);

/**
 * A terminal session that plays once it scrolls into view: each command is
 * typed the way a person would, then its output is printed a good deal faster.
 * Afterwards the cursor waits on a fresh prompt.
 *
 * All the text is in the page from the start, so it takes up its final space
 * and search engines and screen readers get all of it; whatever has not been
 * typed yet is merely transparent.
 */
export default function Terminal({ entries, className }: TerminalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  // Every entry is two stages, typing its command and printing its output;
  // `typed` is how far the current stage has come.
  const [at, setAt] = useState({ stage: 0, typed: 0 });
  const done = at.stage === entries.length * 2;

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

    const play = (stage: number) => {
      const entry = entries[stage >> 1];
      if (!entry) {
        setAt({ stage, typed: 0 });
        return;
      }

      const typing = stage % 2 === 0;
      const length = typing ? entry.command.length : outputLength(entry);
      const pace = typing ? keystroke : entry.layout === 'list' ? () => LIST_ITEM_MS : printPace;

      const advance = (typed: number) => {
        setAt({ stage, typed });
        if (typed < length) later(() => advance(typed + 1), pace());
        else later(() => play(stage + 1), typing ? ENTER_MS : 0);
      };

      setAt({ stage, typed: 0 });
      later(() => advance(1), typing ? THINK_MS : 0);
    };

    later(() => play(prefersReducedMotion() ? entries.length * 2 : 0), 0);

    return () => timers.forEach(clearTimeout);
  }, [inView, entries]);

  return (
    <div ref={ref} className={`${styles.root} ${className ?? ''}`}>
      {entries.map((entry, index) => {
        const typingStage = index * 2;
        const commandTyped = at.stage > typingStage ? entry.command.length : at.stage === typingStage ? at.typed : 0;
        const printed = at.stage > typingStage + 1 ? outputLength(entry) : at.stage === typingStage + 1 ? at.typed : 0;

        return (
          <Fragment key={entry.command}>
            <p className={styles.line}>
              <Prompt shown={at.stage >= typingStage} /> {entry.command.slice(0, commandTyped)}
              {at.stage === typingStage && <Cursor />}
              <Untyped text={entry.command.slice(commandTyped)} />
            </p>

            {entry.layout === 'list' ? (
              <ul className={styles.list}>
                {entry.output.map((item, itemIndex) => (
                  <li key={item} data-untyped={itemIndex < printed ? undefined : ''}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              entry.output.map((paragraph, paragraphIndex) => {
                // Characters printed before this paragraph starts.
                const before = entry.output.slice(0, paragraphIndex).join('').length;
                const shown = Math.max(0, Math.min(paragraph.length, printed - before));
                return (
                  <p key={paragraph} className={styles.prose}>
                    {paragraph.slice(0, shown)}
                    <Untyped text={paragraph.slice(shown)} />
                  </p>
                );
              })
            )}
          </Fragment>
        );
      })}

      <p className={styles.line} aria-hidden="true">
        <Prompt shown={done} /> {done && <Cursor />}
      </p>
    </div>
  );
}

function Prompt({ shown }: { shown: boolean }) {
  return (
    <span className={styles.prompt} aria-hidden="true" data-untyped={shown ? undefined : ''}>
      &gt;
    </span>
  );
}

function Cursor() {
  return <span className={styles.cursor} aria-hidden="true" data-cursor="" />;
}

function Untyped({ text }: { text: string }) {
  return text ? <span data-untyped="">{text}</span> : null;
}
