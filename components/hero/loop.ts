import { prefersReducedMotion } from '@/lib/useInView';

const FRAME_MS = 1000 / 60;

export type Stage = {
  /** Called once before the first frame, then again whenever the canvas changes size. */
  resize(width: number, height: number): void;
  /** Moves everything on by one sixtieth of a second. */
  step(): void;
  draw(context: CanvasRenderingContext2D, width: number, height: number): void;
};

/**
 * Runs a canvas animation for as long as the canvas is on screen, at the same
 * speed whatever the display's refresh rate. With reduced motion nothing ever
 * steps: the stage is only drawn, once at the start and after every resize.
 */
export function runStage(canvas: HTMLCanvasElement, stage: Stage) {
  const context = canvas.getContext('2d');
  if (!context) return { stop() {} };

  const still = prefersReducedMotion();
  let width = 0;
  let height = 0;
  let frame = 0;
  let lastFrameTime = 0;
  let visible = true;

  const redraw = () => stage.draw(context, width, height);

  const resize = () => {
    if (canvas.offsetWidth === width && canvas.offsetHeight === height) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    stage.resize(width, height);
    redraw();
  };

  const animate = (time: number) => {
    frame = requestAnimationFrame(animate);
    if (time - lastFrameTime < FRAME_MS - 1) return;
    lastFrameTime = time;
    stage.step();
    redraw();
  };

  const start = () => {
    if (!frame && visible && !still) frame = requestAnimationFrame(animate);
  };
  const pause = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  resize();

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  // Nothing moves once the hero has been scrolled out of view.
  const viewObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else pause();
  });
  viewObserver.observe(canvas);

  start();

  return {
    stop() {
      pause();
      resizeObserver.disconnect();
      viewObserver.disconnect();
    },
  };
}

export const random = (min: number, max: number) => Math.random() * (max - min) + min;

/** A point of the classic network: it wanders, and wraps around the edges. */
export type Dot = {
  size: number;
  x: number;
  y: number;
  direction: number;
  velocity: number;
  randomization: number;
};

export function createDot(width: number, height: number): Dot {
  return {
    size: random(0.5, 3),
    x: Math.random() * width,
    y: Math.random() * height,
    direction: Math.random() * 360,
    velocity: random(0.2, 4.1),
    randomization: Math.random() * 10,
  };
}

export function stepDot(dot: Dot, width: number, height: number) {
  const speed = dot.velocity * ((Math.random() * dot.randomization + 1) / 10);
  const turn = Math.random() > 0.5 ? -1 : 1;

  dot.direction += Math.random() * dot.randomization * turn;
  const angle = (dot.direction * Math.PI) / 180;

  dot.x += speed * Math.cos(angle);
  dot.y += speed * Math.sin(angle);

  if (dot.x > width) dot.x = 0;
  if (dot.x < 0) dot.x = width;
  if (dot.y > height) dot.y = 0;
  if (dot.y < 0) dot.y = height;
}

type Position = { x: number; y: number };

/** The `count` others closest to `from`, nearest first, each with its distance. */
export function nearest<T extends Position>(from: Position, others: readonly T[], count: number) {
  return others
    .filter((other) => other !== from)
    .map((other) => ({ other, distance: Math.hypot(from.x - other.x, from.y - other.y) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count);
}
