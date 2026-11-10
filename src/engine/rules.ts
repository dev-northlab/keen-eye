import type { Stars } from './types.ts'

/** Index of the zone containing the point, or -1. */
export function hitTest(zones: { x: number; y: number; r: number }[], x: number, y: number): number {
  return zones.findIndex((z) => (x - z.x) ** 2 + (y - z.y) ** 2 <= z.r ** 2)
}

export interface StarInput {
  timeSec: number
  parTimeSec: number
  mistakes: number
  hintsUsed: number
}

export function computeStars(p: StarInput): Stars {
  if (p.hintsUsed === 0 && p.mistakes <= 2 && p.timeSec <= p.parTimeSec) return 3
  if (p.hintsUsed <= 1 && p.mistakes <= 5) return 2
  return 1
}

export interface MemoryStarInput {
  found: number
  total: number
  mistakes: number
  peeks: number
}

/**
 * "Memory" mode (docs/memory-mode.md): 3 stars — all found without a peek and with at most one miss,
 * 2 — all found, 1 — more than half; 0 = failed (the level is not completed).
 */
export function memoryStars(p: MemoryStarInput): Stars | 0 {
  if (p.found === p.total) return p.peeks === 0 && p.mistakes <= 1 ? 3 : 2
  return p.found * 2 > p.total ? 1 : 0
}

/** Anti-spam: MISS_LIMIT misses in a row within MISS_WINDOW_MS lock the pictures for LOCK_MS. */
export const MISS_LIMIT = 3
export const MISS_WINDOW_MS = 3000
export const LOCK_MS = 3000

/** Difficulty chosen in the settings (docs/difficulty-modes.md): rules over the same levels. */
export type GameMode = 'calm' | 'normal'

export interface ModeRules {
  /** Hints of a level attempt (0 = none); every retry gets them again. */
  hints: number
  /** Anti-spam lock after quick misses (`MissGuard`). */
  missLock: boolean
  /** Animation time multiplier (calm mode slows the scene down). */
  animationSpeed: number
  /** "Memory": looks at A while searching, from the level's. */
  memoryPeeks: (levelPeeks: number) => number
  /** "Memory": misses that end the round. */
  memoryMaxMisses: number
  /** Extra objects in the pictures (docs/extra-objects.md; levels that have them). */
  extras: boolean
  /** Picture B mirrored or turned on the levels that have it (`Level.transformB`); calm mode shows it as drawn. */
  transformB: boolean
}

export const MODE_RULES: Record<GameMode, ModeRules> = {
  calm: {
    hints: 3,
    missLock: false,
    animationSpeed: 0.6,
    memoryPeeks: () => 3,
    memoryMaxMisses: Infinity,
    extras: false,
    transformB: false,
  },
  normal: {
    hints: 1,
    missLock: true,
    animationSpeed: 1,
    memoryPeeks: (p) => p,
    memoryMaxMisses: 3,
    extras: true,
    transformB: true,
  },
}

export class MissGuard {
  private misses: number[] = []
  private lockedUntil = 0

  isLocked(now: number): boolean {
    return now < this.lockedUntil
  }

  /** Registers a miss; returns true if it triggered a lock. */
  miss(now: number): boolean {
    this.misses = this.misses.filter((t) => now - t < MISS_WINDOW_MS)
    this.misses.push(now)
    if (this.misses.length < MISS_LIMIT) return false
    this.misses = []
    this.lockedUntil = now + LOCK_MS
    return true
  }

  /** A successful find breaks the miss streak. */
  hit(): void {
    this.misses = []
  }
}
