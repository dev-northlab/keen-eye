import { Board, randomUnfound, type Tap } from './board.ts'
import { FrameLoop } from './loop.ts'
import { computeStars, hitTest, LOCK_MS, MissGuard } from './rules.ts'
import type { Level, LevelResult } from './types.ts'

export interface SceneHandlers {
  onFound?: (found: number, total: number) => void
  onMiss?: (mistakes: number) => void
  /** "Time" levels: a miss landed on natural change `Level.traps[index]` (reported once per trap). */
  onTrap?: (index: number) => void
  onLock?: (locked: boolean) => void
  /** Called when the whole number of elapsed seconds changes. */
  onTick?: (seconds: number) => void
  onZoom?: (scale: number) => void
  /** A hint is shown (true) or its difference was found (false). */
  onHint?: (active: boolean) => void
  onComplete?: (result: LevelResult) => void
}

export interface SceneOptions {
  /** Animation time multiplier: 1 = normal, < 1 = softer motion (reduced motion, calm mode). */
  animationSpeed?: number
  /** Anti-spam lock after quick misses (off in calm mode). Default true. */
  missLock?: boolean
}

/**
 * Single player game scene: one board of pictures A and B in `container`, the
 * timer and the score. Plain TS without Vue reactivity; communicates via handlers.
 */
export class GameScene {
  private readonly level: Level
  private readonly handlers: SceneHandlers
  private readonly animationSpeed: number
  private readonly missLock: boolean
  private readonly board: Board
  private readonly loop: FrameLoop
  private readonly found: boolean[]
  /** Traps whose hint was shown in this round. */
  private readonly trapsShown = new Set<number>()
  private readonly guard = new MissGuard()
  private foundCount = 0
  private mistakes = 0
  private hintsUsed = 0
  private revealed = false
  /** Scene animation stopped by the player (calm mode); timer and input keep working. */
  private animationFrozen = false
  private elapsedMs = 0
  /** Shared animation clock of both pictures, seconds. */
  private animTime = 0
  private lockTimer = 0
  /** Level complete: no more input, timer stopped; the scene keeps animating. */
  private done = false

  constructor(container: HTMLElement, level: Level, handlers: SceneHandlers = {}, options: SceneOptions = {}) {
    this.level = level
    this.handlers = handlers
    this.animationSpeed = options.animationSpeed ?? 1
    this.missLock = options.missLock ?? true
    this.found = level.differences.map(() => false)
    this.board = new Board(container, level, (hit, tap) => this.tap(hit, tap), { onZoom: (s) => handlers.onZoom?.(s) })
    this.loop = new FrameLoop(this.frame)
  }

  resetZoom(): void {
    this.board.resetZoom()
  }

  /**
   * Highlights a random unfound difference until it is found. Returns false when
   * there is nothing to hint or a hint is already shown (so a hint is never spent twice).
   */
  hint(): boolean {
    if (this.done || this.loop.paused || this.board.hinting) return false
    const index = randomUnfound(this.found)
    if (index < 0) return false
    this.board.showHint(index)
    this.hintsUsed++
    this.handlers.onHint?.(true)
    return true
  }

  /** Development tool: outlines every unfound difference in red (once; found marks cover them). */
  revealAll(): void {
    if (this.done || this.revealed) return
    this.revealed = true
    this.board.reveal(this.found)
  }

  /** Stops or restarts the scene animation (calm mode button). */
  setAnimationFrozen(frozen: boolean): void {
    this.animationFrozen = frozen
  }

  /** Freezes timer, animation and input. */
  pause(): void {
    this.loop.pause()
  }

  resume(): void {
    this.loop.resume()
  }

  destroy(): void {
    this.loop.stop()
    clearTimeout(this.lockTimer)
    this.board.destroy()
  }

  // Keeps running after the level is complete: the scene stays alive under the result dialog.
  private frame = (dt: number, now: number) => {
    if (!this.done) {
      const prevSec = Math.floor(this.elapsedMs / 1000)
      this.elapsedMs += dt
      const sec = Math.floor(this.elapsedMs / 1000)
      if (sec !== prevSec) this.handlers.onTick?.(sec)
    }
    if (!this.animationFrozen) this.animTime += (dt / 1000) * this.animationSpeed
    this.board.pose(this.animTime, now)
  }

  private tap(hit: number, tap: Tap): void {
    if (this.done || this.loop.paused || this.guard.isLocked(performance.now())) return
    if (hit < 0) {
      this.miss(tap)
      return
    }
    if (this.found[hit]) return
    this.found[hit] = true
    this.foundCount++
    this.guard.hit()
    if (this.board.markFound(hit)) this.handlers.onHint?.(false)
    this.handlers.onFound?.(this.foundCount, this.found.length)
    if (this.foundCount === this.found.length) this.complete()
  }

  private miss(tap: Tap): void {
    this.mistakes++
    this.board.markMiss(tap)
    this.handlers.onMiss?.(this.mistakes)
    const trap = hitTest(this.level.traps ?? [], tap.x, tap.y)
    if (trap >= 0 && !this.trapsShown.has(trap)) {
      this.trapsShown.add(trap)
      this.handlers.onTrap?.(trap)
    }
    if (this.missLock && this.guard.miss(performance.now())) {
      this.handlers.onLock?.(true)
      this.lockTimer = window.setTimeout(() => this.handlers.onLock?.(false), LOCK_MS)
    }
  }

  private complete(): void {
    this.done = true
    const timeSec = Math.floor(this.elapsedMs / 1000)
    const hintsUsed = this.hintsUsed
    this.handlers.onComplete?.({
      timeSec,
      mistakes: this.mistakes,
      hintsUsed,
      stars: computeStars({ timeSec, parTimeSec: this.level.parTimeSec, mistakes: this.mistakes, hintsUsed }),
    })
  }
}
