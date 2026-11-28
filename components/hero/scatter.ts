/**
 * Where each passion starts out, in percent of the hero's width and height:
 * down both sides and along the top and bottom, clear of the portrait in the
 * middle. It is also where they stay without JavaScript or with reduced motion.
 */
export const scatter: readonly (readonly [number, number])[] = [
  [16, 8],
  [8, 22],
  [21, 34],
  [7, 48],
  [22, 60],
  [10, 74],
  [24, 86],
  [84, 9],
  [93, 24],
  [79, 33],
  [92, 50],
  [78, 62],
  [90, 76],
  [75, 88],
  [31, 13],
  [69, 14],
  [35, 92],
  [45, 87],
  [55, 93],
  [65, 88],
];

/**
 * The same for a phone, where the hero is tall and narrow: a row under the
 * language picker, two on either side of the portrait, one beside the titles,
 * and the rest (the wide marks among them) below, where there is the most room.
 */
export const scatterNarrow: readonly (readonly [number, number])[] = [
  [20, 86],
  [50, 86],
  [12, 15],
  [9, 32],
  [9, 46],
  [14, 77],
  [38, 77],
  [91, 32],
  [37, 15],
  [63, 15],
  [91, 46],
  [62, 77],
  [86, 77],
  [12, 95],
  [80, 86],
  [88, 15],
  [37, 95],
  [63, 95],
  [88, 95],
  [91, 60],
];
