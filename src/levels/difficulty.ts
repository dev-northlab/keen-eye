// Difficulty curve by level id (spec, section 7). `check-levels` enforces the counts and the
// zone sizes; the kinds are guidance for whoever draws the level.

export type DifferenceKind = 'missing' | 'extra' | 'color' | 'size' | 'shape' | 'shift' | 'rotate' | 'motion'

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
  /** Kinds of static/motion differences to use. */
  kinds: DifferenceKind[]
}

const EASY: DifferenceKind[] = ['missing', 'extra', 'color', 'size', 'shape']
const MEDIUM: DifferenceKind[] = [...EASY, 'motion', 'shift']
const HARD: DifferenceKind[] = [...MEDIUM, 'rotate']

export const DIFFICULTY: Difficulty[] = [
  { from: 1, to: 10, differences: [5, 5], motion: [0, 0], minRadius: 24, kinds: EASY },
  { from: 11, to: 15, differences: [5, 5], motion: [1, 1], minRadius: 24, kinds: [...EASY, 'motion'] },
  { from: 16, to: 20, differences: [6, 6], motion: [1, 2], minRadius: 18, kinds: MEDIUM },
  { from: 21, to: 40, differences: [7, 7], motion: [1, 2], minRadius: 18, kinds: MEDIUM },
  { from: 41, to: 60, differences: [8, 8], motion: [2, 3], minRadius: 18, kinds: HARD },
  { from: 61, to: 100, differences: [9, 10], motion: [2, 3], minRadius: 18, kinds: HARD },
]

export function difficultyOf(levelId: number): Difficulty {
  const d = DIFFICULTY.find((d) => levelId >= d.from && levelId <= d.to)
  if (!d) throw new Error(`no difficulty defined for level ${levelId}`)
  return d
}
