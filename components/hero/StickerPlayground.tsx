'use client';

import { type CSSProperties, useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/useInView';
import Glyph from './Glyph';
import styles from './Hero.module.css';
import { type Interest, interests } from './interests';
import { createDot, type Dot, nearest, random, runStage, stepDot } from './loop';
import { scatter, scatterNarrow } from './scatter';

const DOT_COUNT = 24;
const DOT_LINKS = 3;
/** How many other stickers each sticker is tied to, and from how far away. */
const STICKER_LINKS = 2;
const STICKER_REACH = 380;
/** The speed a sticker settles back to after being thrown or bumped (pixels per frame). */
const CRUISE = 0.6;
const MAX_THROW = 22;
/** Stickers cast a hard shadow down and to the right: they stop this short of those two edges, so it is never cut off. */
const SHADOW = 6;
/** Stickers stop this short of each other, the panel and the bubbles. */
const CLEARANCE = 6;
/** How long a sticker has the word, and how long until the next one speaks up (in milliseconds). */
const SPEAK_MS = 3800;
const SPEAK_EVERY_MS = 2000;
/** Narrower than this is a phone: the stickers start out differently, and only one speaks at a time. */
const NARROW = 700;
/** Captions keep this far from the edges of the hero, and float this far off their sticker. */
const CAPTION_MARGIN = 8;
const CAPTION_GAP = 15;

type Sticker = {
  element: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  heading: number;
  radius: number;
  held: boolean;
  /** Under the pointer. */
  hovered: boolean;
  /** When its turn to speak is over, as a `performance.now()` time. */
  speaksUntil: number;
  speaking: boolean;
  /** Half the width of its caption, measured when it starts to speak. */
  captionReach: number;
};

type Box = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  /** Captions avoid covering every obstacle, but this one (the language picker) most of all. */
  keepClear: boolean;
};

/** Whether ink or paper reads better on the given sticker colour. */
function isDark(hex: string) {
  const value = parseInt(hex.slice(1), 16);
  const [red, green, blue] = [value >> 16, (value >> 8) & 255, value & 255].map((channel) => (channel / 255) ** 2.2);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue < 0.26;
}

/** Wide marks (F1, MotoGP, Marvel) get a larger sticker, or they would be far smaller than the rest. */
function isWide(interest: Interest) {
  return interest.viewBox[2] / interest.viewBox[3] > 2;
}

/** Pushes a sticker out of a box it has run into and bounces it off. */
function bounceOffBox(sticker: Sticker, box: Box) {
  const nearestX = Math.min(Math.max(sticker.x, box.left), box.right);
  const nearestY = Math.min(Math.max(sticker.y, box.top), box.bottom);
  let normalX = sticker.x - nearestX;
  let normalY = sticker.y - nearestY;
  let distance = Math.hypot(normalX, normalY);
  if (distance >= sticker.radius) return;

  let overlap = sticker.radius - distance;
  if (distance === 0) {
    // Its centre is inside (it started there, or was dropped there): leave by the nearest side, a little per frame.
    const sides = [
      { depth: sticker.x - box.left, x: -1, y: 0 },
      { depth: box.right - sticker.x, x: 1, y: 0 },
      { depth: sticker.y - box.top, x: 0, y: -1 },
      { depth: box.bottom - sticker.y, x: 0, y: 1 },
    ].sort((a, b) => a.depth - b.depth);
    normalX = sides[0].x;
    normalY = sides[0].y;
    overlap = Math.min(sides[0].depth + sticker.radius, 9);
    distance = 1;
  }
  normalX /= distance;
  normalY /= distance;

  sticker.x += normalX * overlap;
  sticker.y += normalY * overlap;
  const approach = sticker.vx * normalX + sticker.vy * normalY;
  if (approach < 0) {
    sticker.vx -= 1.85 * approach * normalX;
    sticker.vy -= 1.85 * approach * normalY;
  }
}

/**
 * The things Haris loves as a sheet of stickers come loose: they float about,
 * bump into each other and into the comic panel, and can be picked up and
 * thrown. They take turns saying what they are, and any of them says so when
 * pointed at or touched. Behind them a network of wandering dots, in ink, joins
 * them up. `captions` is what each has to say, by the ids in interests.ts.
 */
export default function StickerPlayground({ captions }: { captions: Record<string, string> }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const still = prefersReducedMotion();
    const hero = root.parentElement ?? root;
    const stickers: Sticker[] = Array.from(root.querySelectorAll<HTMLElement>('li'), (element) => ({
      element,
      x: 0,
      y: 0,
      vx: random(-CRUISE, CRUISE),
      vy: random(-CRUISE, CRUISE),
      heading: Math.random() * Math.PI * 2,
      radius: 30,
      held: false,
      hovered: false,
      speaksUntil: 0,
      speaking: false,
      captionReach: 0,
    }));
    const dots: Dot[] = [];
    let obstacles: Box[] = [];
    let width = 0;
    let height = 0;

    /** Keeps a speaking sticker's caption inside the hero, however close to the edge the sticker is. */
    const aimCaption = (sticker: Sticker) => {
      const reach = sticker.captionReach + CAPTION_MARGIN;
      const centre = width > reach * 2 ? Math.min(Math.max(sticker.x, reach), width - reach) : width / 2;
      sticker.element.style.setProperty('--shift', `${(centre - sticker.x).toFixed(1)}px`);
    };

    const place = (sticker: Sticker) => {
      sticker.element.style.transform = `translate3d(${sticker.x.toFixed(1)}px, ${sticker.y.toFixed(1)}px, 0)`;
      if (sticker.speaking) aimCaption(sticker);
    };

    /** Shows or hides a sticker's caption, depending on whether it has any reason to speak. */
    const voice = (sticker: Sticker) => {
      const speaking = sticker.held || sticker.hovered || performance.now() < sticker.speaksUntil;
      if (speaking === sticker.speaking) return;
      sticker.speaking = speaking;
      const { element } = sticker;
      if (!speaking) {
        delete element.dataset.speaking;
        return;
      }
      // Above the sticker or below it: whichever covers less of the portrait, the titles and the language picker.
      const caption = element.lastElementChild as HTMLElement;
      const reach = caption.offsetWidth / 2;
      const tall = caption.offsetHeight;
      sticker.captionReach = reach;
      aimCaption(sticker);
      const centre = Math.min(Math.max(sticker.x, reach + CAPTION_MARGIN), Math.max(width - reach - CAPTION_MARGIN, reach));
      const covered = (top: number) => {
        if (top < CAPTION_MARGIN || top + tall > height - CAPTION_MARGIN) return Infinity;
        let area = 0;
        for (const box of obstacles) {
          const overlapX = Math.min(centre + reach, box.right) - Math.max(centre - reach, box.left);
          const overlapY = Math.min(top + tall, box.bottom) - Math.max(top, box.top);
          if (overlapX > 0 && overlapY > 0) area += overlapX * overlapY * (box.keepClear ? 5 : 1);
        }
        return area;
      };
      if (covered(sticker.y + sticker.radius + CAPTION_GAP) < covered(sticker.y - sticker.radius - CAPTION_GAP - tall)) element.dataset.below = '';
      else delete element.dataset.below;
      element.dataset.speaking = '';
    };

    /** Gives a sticker the word for a while. */
    const speak = (sticker: Sticker, duration = SPEAK_MS) => {
      sticker.speaksUntil = performance.now() + duration;
      voice(sticker);
      window.setTimeout(() => voice(sticker), duration + 20);
    };

    const collide = () => {
      for (const sticker of stickers) {
        if (sticker.held) continue;
        for (const box of obstacles) bounceOffBox(sticker, box);

        // The edges of the hero.
        if (sticker.x < sticker.radius) {
          sticker.x = sticker.radius;
          sticker.vx = Math.abs(sticker.vx);
        } else if (sticker.x > width - sticker.radius - SHADOW) {
          sticker.x = width - sticker.radius - SHADOW;
          sticker.vx = -Math.abs(sticker.vx);
        }
        if (sticker.y < sticker.radius) {
          sticker.y = sticker.radius;
          sticker.vy = Math.abs(sticker.vy);
        } else if (sticker.y > height - sticker.radius - SHADOW) {
          sticker.y = height - sticker.radius - SHADOW;
          sticker.vy = -Math.abs(sticker.vy);
        }
      }

      // Each other: two stickers that meet swap their speed along the line between them.
      for (let i = 0; i < stickers.length; i++) {
        for (let j = i + 1; j < stickers.length; j++) {
          const a = stickers[i];
          const b = stickers[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distance = Math.hypot(dx, dy) || 1;
          const overlap = a.radius + b.radius + CLEARANCE - distance;
          if (overlap <= 0) continue;

          const normalX = dx / distance;
          const normalY = dy / distance;
          // A sticker in the visitor's hand does not give way.
          const shareA = a.held ? 0 : b.held ? 1 : 0.5;
          a.x -= normalX * overlap * shareA;
          a.y -= normalY * overlap * shareA;
          b.x += normalX * overlap * (1 - shareA);
          b.y += normalY * overlap * (1 - shareA);

          const approach = (a.vx - b.vx) * normalX + (a.vy - b.vy) * normalY;
          if (approach <= 0) continue;
          if (!a.held) {
            a.vx -= approach * normalX;
            a.vy -= approach * normalY;
          }
          if (!b.held) {
            b.vx += approach * normalX;
            b.vy += approach * normalY;
          }
        }
      }
    };

    /** Finds what the stickers bounce off: the panel, the speech bubble, the titles, the language picker. */
    const measure = () => {
      const bounds = canvas.getBoundingClientRect();
      for (const sticker of stickers) sticker.radius = sticker.element.offsetWidth / 2;
      const room = Math.max(...stickers.map((sticker) => sticker.radius)) * 2 + CLEARANCE * 2;
      obstacles = Array.from(hero.querySelectorAll('[data-obstacle]'), (element) => {
        const box = element.getBoundingClientRect();
        const obstacle = { left: box.left - bounds.left - CLEARANCE, top: box.top - bounds.top - CLEARANCE, right: box.right - bounds.left + CLEARANCE, bottom: box.bottom - bounds.top + CLEARANCE, keepClear: element.getAttribute('data-obstacle') === 'clear' };
        // A gap between an obstacle and the edge that no sticker fits through is closed, so none gets wedged in it.
        if (obstacle.left < room) obstacle.left = -Infinity;
        if (obstacle.top < room) obstacle.top = -Infinity;
        if (width - obstacle.right < room) obstacle.right = Infinity;
        return obstacle;
      });
    };
    let tick = 0;

    const stage = runStage(canvas, {
      resize(newWidth, newHeight) {
        if (!width) {
          const start = newWidth < NARROW ? scatterNarrow : scatter;
          stickers.forEach((sticker, index) => {
            sticker.x = (start[index][0] / 100) * newWidth;
            sticker.y = (start[index][1] / 100) * newHeight;
            // From here on the transform alone says where it is.
            sticker.element.style.left = '0';
            sticker.element.style.top = '0';
          });
          for (let i = 0; i < DOT_COUNT; i++) dots.push(createDot(newWidth, newHeight));
        } else {
          for (const body of [...stickers, ...dots]) {
            body.x *= newWidth / width;
            body.y *= newHeight / height;
          }
        }
        width = newWidth;
        height = newHeight;

        measure();

        // Nothing will ever move them, so sort out where they overlap right away.
        if (still) for (let i = 0; i < 120; i++) collide();
        stickers.forEach(place);
      },

      step() {
        // They pop in when the page loads and the lettering arrives late, so look again now and then.
        if (++tick % 30 === 0) measure();

        for (const sticker of stickers) {
          if (sticker.held) {
            // What is left of the hand's speed fades, so a sticker held still is dropped, not thrown.
            sticker.vx *= 0.8;
            sticker.vy *= 0.8;
            continue;
          }
          // A gentle wandering, and back down to cruising speed after a throw.
          sticker.heading += random(-0.2, 0.2);
          sticker.vx += Math.cos(sticker.heading) * 0.012;
          sticker.vy += Math.sin(sticker.heading) * 0.012;
          if (Math.hypot(sticker.vx, sticker.vy) > CRUISE) {
            sticker.vx *= 0.975;
            sticker.vy *= 0.975;
          }
          sticker.x += sticker.vx;
          sticker.y += sticker.vy;
        }
        collide();
        stickers.forEach(place);
        for (const dot of dots) stepDot(dot, width, height);
      },

      draw(context) {
        context.clearRect(0, 0, width, height);
        const bodies = [...dots, ...stickers];
        context.strokeStyle = '#200322';
        context.fillStyle = '#200322';

        // The plain network, in ink.
        context.globalAlpha = 0.45;
        for (const dot of dots) {
          const neighbours = nearest(dot, bodies, DOT_LINKS);
          context.lineWidth = 0.2 + 5 / Math.max(neighbours[neighbours.length - 1].distance, 1);
          context.beginPath();
          for (const { other } of neighbours) {
            context.moveTo(dot.x, dot.y);
            context.lineTo(other.x, other.y);
          }
          context.stroke();
        }

        // Join the dots: a dashed line from each sticker to the ones nearest to it.
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.setLineDash([1, 8]);
        for (const sticker of stickers) {
          for (const { other, distance } of nearest(sticker, stickers, STICKER_LINKS)) {
            if (distance > STICKER_REACH) continue;
            context.globalAlpha = Math.min(1, (1 - distance / STICKER_REACH) * 1.6) * 0.75;
            context.beginPath();
            context.moveTo(sticker.x, sticker.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
        context.setLineDash([]);

        context.globalAlpha = 0.6;
        context.beginPath();
        for (const dot of dots) {
          const radius = Math.max(dot.size * dot.velocity * 0.8, dot.size);
          context.moveTo(dot.x + radius, dot.y);
          context.arc(dot.x, dot.y, radius, 0, 2 * Math.PI);
        }
        context.fill();
        context.globalAlpha = 1;
      },
    });

    // The stickers take turns to speak, in an order of their own, for as long as the hero is on screen.
    const order = stickers.map((_, index) => index).sort(() => Math.random() - 0.5);
    let turn = 0;
    let onScreen = true;
    let nextTurn = 0;
    const takeTurns = () => {
      const narrow = width < NARROW;
      nextTurn = window.setTimeout(takeTurns, narrow ? SPEAK_MS + 500 : SPEAK_EVERY_MS);
      if (!onScreen || document.hidden) return;
      // Not while the visitor has one speaking: on a phone that would be two captions at once.
      if (narrow && stickers.some((sticker) => sticker.speaking)) return;
      const sticker = stickers[order[turn++ % order.length]];
      if (!sticker.speaking) speak(sticker);
    };
    // The first one speaks once they have all landed on the page.
    nextTurn = window.setTimeout(takeTurns, 2400);
    const viewObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    viewObserver.observe(canvas);

    // Pointing at a sticker makes it speak; so does touching it; and it can be picked up and thrown.
    const releases: (() => void)[] = [];
    for (const sticker of stickers) {
      const { element } = sticker;
      let grabX = 0;
      let grabY = 0;

      const onEnter = (event: PointerEvent) => {
        if (event.pointerType === 'touch') return;
        sticker.hovered = true;
        voice(sticker);
      };
      const onLeave = () => {
        sticker.hovered = false;
        voice(sticker);
      };
      const onDown = (event: PointerEvent) => {
        if (event.button !== 0) return;
        // Without motion nothing is thrown, but it still says what it is.
        if (still) {
          speak(sticker);
          return;
        }
        const bounds = canvas.getBoundingClientRect();
        grabX = event.clientX - bounds.left - sticker.x;
        grabY = event.clientY - bounds.top - sticker.y;
        sticker.held = true;
        sticker.vx = 0;
        sticker.vy = 0;
        element.setPointerCapture(event.pointerId);
        element.dataset.held = '';
        voice(sticker);
      };
      const onMove = (event: PointerEvent) => {
        if (!sticker.held) return;
        const bounds = canvas.getBoundingClientRect();
        const x = Math.min(Math.max(event.clientX - bounds.left - grabX, sticker.radius), width - sticker.radius - SHADOW);
        const y = Math.min(Math.max(event.clientY - bounds.top - grabY, sticker.radius), height - sticker.radius - SHADOW);
        sticker.vx = sticker.vx * 0.5 + (x - sticker.x) * 0.5;
        sticker.vy = sticker.vy * 0.5 + (y - sticker.y) * 0.5;
        sticker.x = x;
        sticker.y = y;
      };
      const onUp = () => {
        if (!sticker.held) return;
        sticker.held = false;
        delete element.dataset.held;
        const speed = Math.hypot(sticker.vx, sticker.vy);
        if (speed > MAX_THROW) {
          sticker.vx *= MAX_THROW / speed;
          sticker.vy *= MAX_THROW / speed;
        }
        sticker.heading = Math.atan2(sticker.vy, sticker.vx);
        // It finishes what it was saying.
        speak(sticker, 2200);
      };

      const listeners = { pointerenter: onEnter, pointerleave: onLeave, pointerdown: onDown, pointermove: onMove, pointerup: onUp, pointercancel: onUp } as const;
      for (const [type, listener] of Object.entries(listeners)) element.addEventListener(type, listener as EventListener);
      releases.push(() => {
        for (const [type, listener] of Object.entries(listeners)) element.removeEventListener(type, listener as EventListener);
      });
    }

    return () => {
      stage.stop();
      viewObserver.disconnect();
      window.clearTimeout(nextTurn);
      for (const release of releases) release();
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.playground}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <ul className={styles.stickers}>
        {interests.map((interest, index) => (
          <li key={interest.id} style={{ left: `${scatter[index][0]}%`, top: `${scatter[index][1]}%`, '--i': index, '--sticker': interest.color } as CSSProperties} data-wide={isWide(interest) ? '' : undefined}>
            <span className={styles.sticker} data-dark={isDark(interest.color) ? '' : undefined}>
              <Glyph interest={interest} />
            </span>
            <span className={styles.caption}>{captions[interest.id]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
