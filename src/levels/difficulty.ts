// Difficulty curve by level id (spec, section 7). `check-levels` enforces the counts and the
// zone sizes; the kinds are guidance for whoever draws the level.

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
  // "Time" category (docs/time-differences-mode.md): 201–205 morning/evening, 206–210 summer/winter,
  // 211–215 both kinds, harder. Static differences only: the moments already change a lot.
  { from: 201, to: 205, differences: [5, 5], motion: [0, 0], minRadius: 24, traps: [3, 4], kinds: EASY },
  { from: 206, to: 210, differences: [6, 6], motion: [0, 0], minRadius: 22, traps: [3, 5], kinds: EASY },
  { from: 211, to: 215, differences: [7, 8], motion: [0, 0], minRadius: 20, minGap: 56, traps: [4, 6], kinds: [...EASY, 'shift', 'rotate'] },
  // 216–230: busier scenes, both kinds of pairs, 8 → 9 → 10 differences and more traps.
  { from: 216, to: 220, differences: [8, 8], motion: [0, 0], minRadius: 20, minGap: 56, traps: [5, 7], kinds: [...EASY, 'shift', 'rotate'] },
  { from: 221, to: 225, differences: [9, 9], motion: [0, 0], minRadius: 20, minGap: 56, traps: [5, 7], kinds: [...EASY, 'shift', 'rotate'] },
  { from: 226, to: 230, differences: [10, 10], motion: [0, 0], minRadius: 20, minGap: 56, traps: [5, 7], kinds: [...EASY, 'shift', 'rotate'] },
  // "Memory" category (docs/memory-mode.md): 6–10 big objects, changes seen at a glance (an object
  // gone or new, recolored, moved, fewer of them); the zone of a move covers both places, that of a
  // count the whole group. Less time to look as the changes grow.
  { from: 301, to: 305, differences: [3, 3], motion: [0, 0], minRadius: 30, showSeconds: 5, kinds: MEMORY },
  { from: 306, to: 310, differences: [4, 4], motion: [0, 0], minRadius: 30, showSeconds: 4, kinds: MEMORY },
  { from: 311, to: 315, differences: [5, 6], motion: [0, 0], minRadius: 30, showSeconds: 3, kinds: MEMORY },
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

export function difficultyOf(levelId: number): Difficulty {
  const d = DIFFICULTY.find((d) => levelId >= d.from && levelId <= d.to)
  if (!d) throw new Error(`no difficulty defined for level ${levelId}`)
  return d
}
