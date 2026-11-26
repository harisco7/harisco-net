'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/useInView';

const POINT_COUNT = 50;
const NEIGHBOUR_COUNT = 3;
const FRAME_MS = 1000 / 60;

type Point = {
  size: number;
  x: number;
  y: number;
  direction: number;
  velocity: number;
  randomization: number;
};

const random = (min: number, max: number) => Math.random() * (max - min) + min;

function createPoint(width: number, height: number): Point {
  return {
    size: random(0.5, 3),
    x: Math.round(Math.random() * width),
    y: Math.round(Math.random() * height),
    direction: Math.random() * 360,
    velocity: random(0.2, 4.1),
    randomization: Math.random() * 10,
  };
}

/** Moves the point one step along its wandering path, wrapping around the edges. */
function step(point: Point, width: number, height: number) {
  const speed = point.velocity * ((Math.random() * point.randomization + 1) / 10);
  const turn = Math.random() > 0.5 ? -1 : 1;

  point.direction += Math.random() * point.randomization * turn;
  const angle = (point.direction * Math.PI) / 180;

  point.x += speed * Math.cos(angle);
  point.y += speed * Math.sin(angle);

  if (point.x > width) point.x = 0;
  if (point.x < 0) point.x = width;
  if (point.y > height) point.y = 0;
  if (point.y < 0) point.y = height;
}

function drawPoint(context: CanvasRenderingContext2D, point: Point, points: Point[]) {
  const neighbours = points
    .filter((other) => other !== point)
    .map((other) => ({ other, distance: Math.hypot(point.x - other.x, point.y - other.y) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, NEIGHBOUR_COUNT);

  // Lines to the nearest neighbours. The further away they are, the thinner the lines.
  context.strokeStyle = '#888';
  context.lineWidth = 0.1 + 5 / Math.max(neighbours[neighbours.length - 1].distance, 1);
  context.beginPath();
  for (const { other } of neighbours) {
    context.moveTo(point.x, point.y);
    context.lineTo(other.x, other.y);
  }
  context.stroke();

  // The point itself: faster points are drawn larger.
  context.fillStyle = '#444';
  context.strokeStyle = '#444';
  context.lineWidth = 0.5;
  context.beginPath();
  context.arc(point.x, point.y, Math.max(point.size * point.velocity, point.size), 0, 2 * Math.PI);
  context.fill();
  context.stroke();
}

/** The animated network of drifting, connected points behind the page header. */
export default function NetworkBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastFrameTime = 0;
    let visible = true;
    const reducedMotion = prefersReducedMotion();

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();

    const points = Array.from({ length: POINT_COUNT }, () => createPoint(width, height));

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (const point of points) drawPoint(context, point, points);
    };

    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);
      // Keep the speed the same on high refresh rate screens.
      if (time - lastFrameTime < FRAME_MS - 1) return;
      lastFrameTime = time;
      for (const point of points) step(point, width, height);
      draw();
    };

    const start = () => {
      if (!frame && visible && !reducedMotion) frame = requestAnimationFrame(animate);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener('resize', onResize);

    // No point animating once the header has been scrolled out of view.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    observer.observe(canvas);

    draw();
    start();

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
