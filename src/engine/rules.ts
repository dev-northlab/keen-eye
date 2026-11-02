import type { Stars } from './types.ts'

/** Index of the zone containing the point, or -1. */
export function hitTest(zones: { x: number; y: number; r: number }[], x: number, y: number): number {
  return zones.findIndex((z) => (x - z.x) ** 2 + (y - z.y) ** 2 <= z.r ** 2)
}

export function computeStars(p: {
  timeSec: number
  parTimeSec: number
  mistakes: number
  hintsUsed: number
}): Stars {
  if (p.hintsUsed === 0 && p.mistakes <= 2 && p.timeSec <= p.parTimeSec) return 3
  if (p.hintsUsed <= 1 && p.mistakes <= 5) return 2
  return 1
}

/**
 * "Memory" mode (docs/memory-mode.md): 3 stars — all found without a peek and with at most one miss,
 * 2 — all found, 1 — more than half; 0 = failed (the level is not completed).
 */
export function memoryStars(p: { found: number; total: number; mistakes: number; peeks: number }): Stars | 0 {
  if (p.found === p.total) return p.peeks === 0 && p.mistakes <= 1 ? 3 : 2
  return p.found * 2 > p.total ? 1 : 0
}

/** Anti-spam: MISS_LIMIT misses in a row within MISS_WINDOW_MS lock the pictures for LOCK_MS. */
export const MISS_LIMIT = 3
export const MISS_WINDOW_MS = 3000
export const LOCK_MS = 3000

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
