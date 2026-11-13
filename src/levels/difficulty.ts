// Difficulty curve by level id (spec, section 7). `check-levels` enforces the counts and the
// zone sizes; the kinds are guidance for whoever draws the level.
import type { PictureTransform } from '../engine/transform.ts'

export type DifferenceKind = 'missing' | 'extra' | 'color' | 'size' | 'shape' | 'shift' | 'rotate' | 'motion' | 'count'

export interface Difficulty {
  /** Level ids, inclusive. */
  from: number
  to: number
  /** Differences per level (motion ones included), inclusive range. */
  differences: [min: number, max: number]
  /** Motion differences among them (spec, section 4). */
  motion: [min: number, max: number]
  /** Smallest zone radius in viewBox units: big objects early, small details later. */
  minRadius: number
  /** Smallest distance between zone centers (dense scenes keep differences apart). */
  minGap?: number
  /** "Time" levels: natural changes marked as traps, inclusive range. */
  traps?: [min: number, max: number]
  /** "Memory" levels: seconds picture A is shown. */
  showSeconds?: number
  /** Kinds of static/motion differences to use. */
  kinds: DifferenceKind[]
}

const EASY: DifferenceKind[] = ['missing', 'extra', 'color', 'size', 'shape']
const MEDIUM: DifferenceKind[] = [...EASY, 'motion', 'shift']
const HARD: DifferenceKind[] = [...MEDIUM, 'rotate']
const MEMORY: DifferenceKind[] = ['missing', 'extra', 'color', 'shift', 'count']

export const DIFFICULTY: Difficulty[] = [
  { from: 1, to: 10, differences: [5, 5], motion: [0, 0], minRadius: 24, kinds: EASY },
  { from: 11, to: 15, differences: [5, 5], motion: [1, 1], minRadius: 24, kinds: [...EASY, 'motion'] },
  { from: 16, to: 20, differences: [6, 6], motion: [1, 2], minRadius: 18, kinds: MEDIUM },
  { from: 21, to: 40, differences: [7, 7], motion: [1, 2], minRadius: 18, kinds: MEDIUM },
  { from: 41, to: 60, differences: [8, 8], motion: [2, 3], minRadius: 18, kinds: HARD },
  { from: 61, to: 100, differences: [9, 10], motion: [2, 3], minRadius: 18, kinds: HARD },
  ...harder(101, 6),
  ...harder(111, 7),
  ...harder(121, 8),
  ...harder(131, 10),
  ...harder(141, 10),
  ...hardest(151),
  ...hardest(161),
  ...hardest(171),
  ...hardest(181),
  ...hardest(191),
  // "Time" category (docs/time-differences-mode.md): 201–205 morning/evening, 206–210 summer/winter,
  // 211–215 both kinds, harder. Static differences only: the moments already change a lot.
  { from: 201, to: 205, differences: [5, 5], motion: [0, 0], minRadius: 24, traps: [3, 4], kinds: EASY },
  { from: 206, to: 210, differences: [6, 6], motion: [0, 0], minRadius: 22, traps: [3, 5], kinds: EASY },
  { from: 211, to: 215, differences: [7, 8], motion: [0, 0], minRadius: 20, minGap: 56, traps: [4, 6], kinds: [...EASY, 'shift', 'rotate'] },
  // 216–230: busier scenes, both kinds of pairs, 8 → 9 → 10 differences and more traps.
  { from: 216, to: 220, differences: [8, 8], motion: [0, 0], minRadius: 20, minGap: 56, traps: [5, 7], kinds: [...EASY, 'shift', 'rotate'] },
  { from: 221, to: 225, differences: [9, 9], motion: [0, 0], minRadius: 20, minGap: 56, traps: [5, 7], kinds: [...EASY, 'shift', 'rotate'] },
  { from: 226, to: 230, differences: [10, 10], motion: [0, 0], minRadius: 20, minGap: 56, traps: [5, 7], kinds: [...EASY, 'shift', 'rotate'] },
  // 231–240: the ten hardest (hidden until released, levels/upcoming.ts), 11 then 12 differences among more traps; still
  // static and never turned, like the rest of the category.
  { from: 231, to: 235, differences: [11, 11], motion: [0, 0], minRadius: 20, minGap: 56, traps: [6, 8], kinds: [...EASY, 'shift', 'rotate'] },
  { from: 236, to: 240, differences: [12, 12], motion: [0, 0], minRadius: 20, minGap: 56, traps: [6, 8], kinds: [...EASY, 'shift', 'rotate'] },
  // "Memory" category (docs/memory-mode.md): 6–10 big objects among 15 small decor ones, changes seen at a glance (an object
  // gone or new, recolored, moved, fewer of them); the zone of a move covers both places, that of a
  // count the whole group. Less time to look as the changes grow.
  { from: 301, to: 305, differences: [3, 3], motion: [0, 0], minRadius: 30, showSeconds: 5, kinds: MEMORY },
  { from: 306, to: 310, differences: [3, 3], motion: [0, 0], minRadius: 30, showSeconds: 4, kinds: MEMORY },
  { from: 311, to: 315, differences: [4, 4], motion: [0, 0], minRadius: 30, showSeconds: 3, kinds: MEMORY },
  // 316–330: busier, more detailed scenes (12–18 objects plus the decor), so a little more time to look.
  { from: 316, to: 320, differences: [4, 4], motion: [0, 0], minRadius: 30, showSeconds: 5, kinds: MEMORY },
  { from: 321, to: 330, differences: [5, 5], motion: [0, 0], minRadius: 30, showSeconds: 4, kinds: MEMORY },
  // 331–340: the ten hardest (hidden until released, levels/upcoming.ts), the busiest scenes with 7 then 8 changes, shown
  // a little longer for so many to keep in mind.
  { from: 331, to: 335, differences: [7, 7], motion: [0, 0], minRadius: 30, showSeconds: 5, kinds: MEMORY },
  { from: 336, to: 340, differences: [8, 8], motion: [0, 0], minRadius: 30, showSeconds: 5, kinds: MEMORY },
  // "Travel" category (docs/world-travel-mode.md): 8 differences tied to the place (the gondola's
  // color, the flag on the tower) from the start, smaller ones and one in motion later.
  { from: 401, to: 405, differences: [8, 8], motion: [0, 0], minRadius: 24, minGap: 56, kinds: EASY },
  { from: 406, to: 410, differences: [8, 8], motion: [0, 1], minRadius: 22, minGap: 56, kinds: MEDIUM },
  { from: 411, to: 415, differences: [8, 8], motion: [1, 1], minRadius: 20, minGap: 56, kinds: HARD },
  // 416–430: busier cities, 8 → 9 → 10 differences, smaller ones and up to two in motion.
  { from: 416, to: 420, differences: [8, 8], motion: [1, 2], minRadius: 18, minGap: 56, kinds: HARD },
  { from: 421, to: 425, differences: [9, 9], motion: [1, 2], minRadius: 18, minGap: 56, kinds: HARD },
  { from: 426, to: 432, differences: [10, 10], motion: [1, 2], minRadius: 18, minGap: 56, kinds: HARD },
  // "Detective" category (docs/detective-mode.md): a case of 5 scenes each, 5 → 6 → 7 clues per scene.
  // Clues are evidence left behind (prints, an open window, a missing thing), so none of them move.
  { from: 501, to: 505, differences: [5, 5], motion: [0, 0], minRadius: 24, kinds: EASY },
  { from: 506, to: 510, differences: [6, 6], motion: [0, 0], minRadius: 22, minGap: 56, kinds: [...EASY, 'shift'] },
  { from: 511, to: 515, differences: [7, 7], motion: [0, 0], minRadius: 20, minGap: 56, kinds: [...EASY, 'shift', 'rotate'] },
  // 516–530: three harder cases, busier scenes with 8 → 9 → 10 smaller clues.
  { from: 516, to: 520, differences: [8, 8], motion: [0, 0], minRadius: 20, minGap: 56, kinds: [...EASY, 'shift', 'rotate'] },
  { from: 521, to: 525, differences: [9, 9], motion: [0, 0], minRadius: 18, minGap: 56, kinds: [...EASY, 'shift', 'rotate'] },
  { from: 526, to: 530, differences: [10, 10], motion: [0, 0], minRadius: 18, minGap: 56, kinds: [...EASY, 'shift', 'rotate'] },
  // 531–535: "The missing chickens", a free case open from the start for newcomers, 6 clues per scene.
  { from: 531, to: 535, differences: [6, 6], motion: [0, 0], minRadius: 22, minGap: 56, kinds: [...EASY, 'shift'] },
  // "Treasury" (docs/hidden-item-feature.md): the bonus level for all the keys, 8–10 differences, some moving.
  { from: 900, to: 900, differences: [8, 10], motion: [2, 3], minRadius: 20, minGap: 56, kinds: HARD },
  // "Tiny boy" (Gemini pictures of a little boy, their pixels as the viewBox): 5–7 differences asked of Gemini, up to 7
  // more small, hard ones painted by hand; zones a finger wide on a phone (r ≥ 60 pixels).
  { from: 701, to: 730, differences: [5, 15], motion: [0, 0], minRadius: 60, kinds: EASY },
  // "Test" (developer mode only): picture pairs tried out, any number of differences.
  { from: 1001, to: 1100, differences: [1, 20], motion: [0, 0], minRadius: 18, kinds: EASY },
]

/**
 * The ten harder levels at the end of a chapter, ids from `first`: 7, 8, 9 differences in steps of
 * three levels and 10 on the last, never fewer than the chapter's first 20 levels have (`floor`).
 * Details are smaller, but zones stay at least 44 units wide (a finger) and 8% of the width apart.
 */
function harder(first: number, floor: number): Difficulty[] {
  const steps: [from: number, to: number, differences: number][] = [[0, 2, 7], [3, 5, 8], [6, 8, 9], [9, 9, 10]]
  return steps.map(([from, to, n]) => ({
    from: first + from,
    to: first + to,
    differences: [Math.max(n, floor), Math.max(n, floor)],
    motion: [2, 3],
    minRadius: 22,
    minGap: 64,
    kinds: HARD,
  }))
}

/**
 * The ten hardest levels of a world after its harder ten, ids from `first` (151 farm, 161 city, 171 forest, 181 sea, 191 space; hidden until
 * released, levels/upcoming.ts): busy scenes of new animals, tools, houses and vehicles with 11 differences,
 * then 12 on the last five, 3 of them moving; picture B always turned (`transformBOf`).
 */
function hardest(first: number): Difficulty[] {
  return [11, 12].map((n, i) => ({
    from: first + i * 5,
    to: first + i * 5 + 4,
    differences: [n, n],
    motion: [3, 3],
    minRadius: 22,
    minGap: 60,
    kinds: HARD,
  }))
}

/**
 * Picture B shown mirrored or turned (docs/mirror-rotate-feature.md): the last five levels of every world's
 * harder ten and every world level after them, the last five of "travel", and the hardest "detective" case (526–530), alternating mirror-x and rotate-180. Not "time" and "memory" (hard
 * enough already), nor the bonus "treasury".
 */
const TRANSFORMED_B: [from: number, to: number][] = [
  [106, 110],
  [116, 120],
  [126, 130],
  [136, 140],
  [146, 150],
  [428, 432],
  [526, 530],
]

export function transformBOf(levelId: number): PictureTransform {
  // A world's ten hardest (151–200, ten per world) go on from the mirror-x of its harder ten's last level.
  if (levelId >= 151 && levelId <= 200) return (levelId - 151) % 2 === 0 ? 'rotate-180' : 'mirror-x'
  const range = TRANSFORMED_B.find(([from, to]) => levelId >= from && levelId <= to)
  if (!range) return 'none'
  return (levelId - range[0]) % 2 === 0 ? 'mirror-x' : 'rotate-180'
}

export function difficultyOf(levelId: number): Difficulty {
  const d = DIFFICULTY.find((d) => levelId >= d.from && levelId <= d.to)
  if (!d) throw new Error(`no difficulty defined for level ${levelId}`)
  return d
}
