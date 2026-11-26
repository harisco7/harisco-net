import styles from './Skills.module.css';

/*
 * The drawings in the "My Superpowers" panels. They are plain SVG; everything
 * that moves is animated from Skills.module.css. Each one is drawn in the pose
 * it should hold when nothing moves at all (reduced motion).
 */

/** The four printing inks of the page, plus the steel of the knife's tools. */
const INK = '#200322';
const PAPER = '#fffdf8';
const RED = 'crimson';
const YELLOW = '#ffd23f';
const BLUE = '#23a0fc';
const STEEL = '#e4e1ea';

/** The outline of a comic-book burst: a star with `spikes` points around an ellipse. */
export function burst(cx: number, cy: number, rx: number, ry: number, spikes: number, depth: number): string {
  return Array.from({ length: spikes * 2 }, (_, index) => {
    const angle = (Math.PI * index) / spikes - Math.PI / 2;
    // Every tip reaches a little less far than the one before, then it starts over.
    const reach = index % 2 === 0 ? 1 - ((index / 2) % 3) * 0.07 : depth;
    return `${(cx + rx * reach * Math.cos(angle)).toFixed(1)},${(cy + ry * reach * Math.sin(angle)).toFixed(1)}`;
  }).join(' ');
}

/** Time management: an alarm clock in a hurry, its hands racing. */
export function ClockArt() {
  return (
    <svg className={styles.drawing} viewBox="0 0 300 200" aria-hidden="true">
      <g stroke={INK} strokeWidth="6">
        <path className={styles.streak} d="M22 68 H84" />
        <path className={styles.streak} d="M4 108 H74" />
        <path className={styles.streak} d="M26 148 H88" />
      </g>
      <g className={styles.hurry}>
        <g className={styles.ring}>
          <path d="M131 158 L119 181 M199 158 L211 181" stroke={INK} strokeWidth="9" />
          <path d="M-25 0 A25 25 0 0 1 25 0 Z" transform="translate(120 61) rotate(-43)" fill={RED} stroke={INK} strokeWidth="5" />
          <path d="M-25 0 A25 25 0 0 1 25 0 Z" transform="translate(210 61) rotate(43)" fill={RED} stroke={INK} strokeWidth="5" />
          <path d="M165 52 V38" stroke={INK} strokeWidth="5" />
          <circle cx="165" cy="33" r="7" fill={INK} />
          <circle cx="165" cy="108" r="58" fill={PAPER} stroke={INK} strokeWidth="7" />
          <path d="M165 60 v9 M165 147 v9 M117 108 h9 M204 108 h9" stroke={INK} strokeWidth="4" />
          <path className={styles.hourHand} d="M165 108 L185 90" stroke={INK} strokeWidth="7" />
          <path className={styles.minuteHand} d="M165 108 V66" stroke={RED} strokeWidth="5" />
          <circle cx="165" cy="108" r="6" fill={INK} />
        </g>
      </g>
      <g className={styles.zing} stroke={INK} strokeWidth="4" fill="none">
        <path d="M92 30 q-12 8 -14 22" />
        <path d="M78 18 q-16 10 -19 30" />
        <path d="M238 30 q12 8 14 22" />
        <path d="M252 18 q16 10 19 30" />
      </g>
    </svg>
  );
}

const DOT_COLUMNS = [34, 60, 86, 112, 138, 164];
const DOT_ROWS = [36, 62, 88, 114, 140, 166];
/** Where the bug sits among the dots; the magnifying glass is drawn right on top of it. */
const BUG = { x: 112, y: 88 };
const MAGNIFICATION = 2.3;

/** Attention to details: among all those dots, one is a bug. The glass finds it. */
export function LensArt() {
  return (
    <svg className={styles.drawing} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <g id="superpower-specimens">
          {DOT_ROWS.flatMap((y) => DOT_COLUMNS.map((x) => (x === BUG.x && y === BUG.y ? null : <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill={INK} />)))}
          <g transform={`translate(${BUG.x} ${BUG.y})`}>
            <path d="M-4 -2.5 l-3.6 -2.2 M-5 0.5 h-4 M-4 3.5 l-3.6 2.2 M4 -2.5 l3.6 -2.2 M5 0.5 h4 M4 3.5 l3.6 2.2" stroke={INK} strokeWidth="1.1" />
            <path d="M-1.8 -5 q-0.8 -2.8 -3 -3.2 M1.8 -5 q0.8 -2.8 3 -3.2" stroke={INK} strokeWidth="0.9" fill="none" />
            <ellipse rx="5" ry="5.6" fill={INK} />
            <path d="M0 -2.4 V5.6" stroke={RED} strokeWidth="0.9" />
            <circle cx="-1.9" cy="-3.3" r="0.9" fill={PAPER} />
            <circle cx="1.9" cy="-3.3" r="0.9" fill={PAPER} />
          </g>
        </g>
        <clipPath id="superpower-lens">
          <circle cx={BUG.x} cy={BUG.y} r="31" />
        </clipPath>
      </defs>

      <use href="#superpower-specimens" />

      <g className={styles.lens}>
        <path d="M137 113 L173 149" stroke={INK} strokeWidth="14" />
        <path d="M142 118 L171 147" stroke={RED} strokeWidth="6" />
        <circle cx={BUG.x} cy={BUG.y} r="34" fill="#e9f6ff" />
        {/* The same dots again, enlarged, and moved against the glass so they stay put underneath it. */}
        <g clipPath="url(#superpower-lens)">
          <g transform={`translate(${BUG.x} ${BUG.y}) scale(${MAGNIFICATION}) translate(${-BUG.x} ${-BUG.y})`}>
            <g className={styles.lensView}>
              <use href="#superpower-specimens" />
            </g>
          </g>
        </g>
        <circle cx={BUG.x} cy={BUG.y} r="34" fill="none" stroke={INK} strokeWidth="7" />
        <path d="M90 76 a25 25 0 0 1 13 -12" stroke="#fff" strokeWidth="4" fill="none" />
        <g className={styles.eureka}>
          <polygon points={burst(156, 44, 21, 21, 9, 0.6)} fill={YELLOW} stroke={INK} strokeWidth="3" />
          <path d="M156 34 V46" stroke={INK} strokeWidth="5" />
          <circle cx="156" cy="54" r="2.8" fill={INK} />
        </g>
      </g>
    </svg>
  );
}

/** Resourcefulness: a pocket knife with a tool for everything, including a bright idea. */
export function KnifeArt() {
  return (
    <svg className={styles.drawing} viewBox="0 0 200 200" aria-hidden="true">
      <g transform="translate(100 104) rotate(-7) scale(1.42) translate(-100 -119)">
        <g className={`${styles.tool} ${styles.hingeLeft} ${styles.blade}`}>
          <path d="M72 130 H126 Q140 131 144 142 Q118 149 72 148 Z" fill={STEEL} stroke={INK} strokeWidth="4" />
          <path d="M98 136 h18" stroke={INK} strokeWidth="2" />
        </g>
        <g className={`${styles.tool} ${styles.hingeRight} ${styles.screwdriver}`}>
          <path d="M128 133 H80 L68 136 V142 L80 145 H128 Z" fill={STEEL} stroke={INK} strokeWidth="4" />
        </g>
        <g className={`${styles.tool} ${styles.hingeRight} ${styles.corkscrew}`}>
          <path d="M128 139 H114 q-3.5 -10 -7 0 t-7 0 t-7 0 t-7 0 t-7 0 t-7 0" fill="none" stroke={INK} strokeWidth="4.5" />
        </g>
        <g className={`${styles.tool} ${styles.hingeLeft} ${styles.bulb}`}>
          <path d="M72 139 H112" stroke={INK} strokeWidth="5" />
          <rect x="108" y="133" width="10" height="12" rx="2" fill={INK} />
          <circle cx="129" cy="139" r="11" fill={YELLOW} stroke={INK} strokeWidth="4" />
          <path className={styles.rays} d="M146 139 h8 M142 126 l6 -6 M142 152 l6 6 M129 121 v-7 M129 157 v7" stroke={INK} strokeWidth="3.5" />
        </g>

        <rect x="55" y="122" width="90" height="34" rx="17" fill={RED} stroke={INK} strokeWidth="6" />
        <path d="M71 130 H112" stroke="#fff" strokeOpacity="0.4" strokeWidth="4" />
        <circle cx="100" cy="140" r="9" fill={PAPER} stroke={INK} strokeWidth="2.5" />
        <path d="M102 133 l-6 8 h4.5 l-2.5 6 l7 -8.5 h-4.5 z" fill={INK} />
        <circle cx="72" cy="139" r="3.5" fill={PAPER} stroke={INK} strokeWidth="2" />
        <circle cx="128" cy="139" r="3.5" fill={PAPER} stroke={INK} strokeWidth="2" />
      </g>
    </svg>
  );
}

const CHECKLIST = [
  { y: 72, lineEnd: 158 },
  { y: 106, lineEnd: 148 },
  { y: 140, lineEnd: 162 },
];

/** Responsibility: every item gets ticked off, and then it gets the seal. */
export function ChecklistArt() {
  return (
    <svg className={styles.drawing} viewBox="0 0 300 200" aria-hidden="true">
      <g transform="rotate(-5 125 107)">
        <rect x="70" y="28" width="110" height="158" rx="9" fill={INK} />
        <rect x="79" y="42" width="92" height="135" fill={PAPER} />
        <rect x="102" y="17" width="46" height="27" rx="6" fill={YELLOW} stroke={INK} strokeWidth="4" />
        <circle cx="125" cy="29" r="4" fill={INK} />
        {CHECKLIST.map(({ y, lineEnd }, index) => (
          <g key={y} className={styles[`item${index + 1}`]}>
            <rect className={styles.checkbox} x="90" y={y - 9} width="18" height="18" rx="2" stroke={INK} strokeWidth="3.5" />
            <path d={`M119 ${y} H${lineEnd}`} stroke={INK} strokeWidth="5" />
            <path className={styles.check} d={`M92 ${y - 1} l6 7 l13 -16`} pathLength={1} fill="none" stroke={RED} strokeWidth="5.5" />
          </g>
        ))}
      </g>
      <g className={styles.seal}>
        <path d="M214 134 l-9 44 l15 -9 l8 14 l4 -40 z" fill={BLUE} stroke={INK} strokeWidth="4" />
        <path d="M250 134 l9 44 l-15 -9 l-8 14 l-4 -40 z" fill={BLUE} stroke={INK} strokeWidth="4" />
        <polygon points={burst(232, 106, 42, 42, 12, 0.8)} fill={YELLOW} stroke={INK} strokeWidth="4" />
        <circle cx="232" cy="106" r="24" fill={PAPER} stroke={INK} strokeWidth="3" />
        <path d="M219 106 l9 10 l17 -21" fill="none" stroke={RED} strokeWidth="7" />
      </g>
    </svg>
  );
}

const BUBBLE_OUTLINE = 'M38 8 H122 A30 30 0 0 1 152 38 V82 A30 30 0 0 1 122 112 H76 L36 143 L47 112 H38 A30 30 0 0 1 8 82 V38 A30 30 0 0 1 38 8 Z';
/** The speech bubble is filled between these two heights of its drawing. */
const BUBBLE_FLOOR = 112;
const BUBBLE_HEIGHT = 104;
/** Four swells of 80 units; sliding it by one of them loops seamlessly. */
const WAVE = 'M-80 0 q20 -9 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 V170 H-80 Z';

type BubbleArtProps = {
  /** Unique on the page; names the bubble's clip path. */
  id: string;
  /** What the bubble says. */
  hello: string;
  /** How full it is, 0 to 100. */
  level: number;
};

/** Languages: a speech bubble filled with as much of the language as there is. */
export function BubbleArt({ id, hello, level }: BubbleArtProps) {
  const clip = `superpower-bubble-${id}`;
  const surface = BUBBLE_FLOOR - (Math.min(level, 100) / 100) * BUBBLE_HEIGHT;

  return (
    <svg className={styles.bubble} viewBox="0 0 160 150" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <path d={BUBBLE_OUTLINE} />
        </clipPath>
      </defs>
      <path d={BUBBLE_OUTLINE} fill={PAPER} />
      <g clipPath={`url(#${clip})`}>
        <g transform={`translate(0 ${level > 0 ? surface.toFixed(2) : 150})`}>
          <path className={styles.swell} d={WAVE} fill="#8fd0ff" />
          <path className={styles.wave} d={WAVE} fill={BLUE} transform="translate(0 5)" />
        </g>
      </g>
      <path d={BUBBLE_OUTLINE} fill="none" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <text className={styles.hello} x="80" y="73" textAnchor="middle" fill={INK}>
        {hello}
      </text>
    </svg>
  );
}
