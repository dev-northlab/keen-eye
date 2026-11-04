import { Board, type Tap } from './board.ts'
import { FrameLoop } from './loop.ts'
import { memoryStars, type MemoryStarInput } from './rules.ts'
import type { Level, Stars } from './types.ts'

/**
 * Stages of a "memory" round (docs/memory-mode.md): A is shown, a curtain hides the switch, B is
 * searched from memory (a peek brings A back for a moment), and at the end A and B are revealed
 * side by side with every change outlined.
 */
export type MemoryPhase = 'show' | 'curtain' | 'search' | 'peek' | 'reveal'

/** Pictures on screen in each phase (0 = A, 1 = B). */
const VISIBLE: Record<MemoryPhase, (0 | 1)[]> = { show: [0], curtain: [], search: [1], peek: [0], reveal: [0, 1] }

export const CURTAIN_MS = 500
/** "Look again": how long A comes back. */
export const PEEK_MS = 2000
/** Default of `MemoryOptions.maxMisses`: the round ends at this many misses. */
export const MAX_MISSES = 3
/** The last find or miss stays on screen this long before the answer is revealed. */
const END_DELAY_MS = 700

export interface MemoryResult {
  found: number
  total: number
  mistakes: number
  peeks: number
  /** Seconds spent searching B. */
  timeSec: number
  /** 0 = failed: the level is not completed. */
  stars: Stars | 0
}

export interface MemoryHandlers {
  /** A phase starts; `ms` is its length (Infinity: until the player acts). */
  onPhase?: (phase: MemoryPhase, ms: number) => void
  onFound?: (found: number, total: number) => void
  onMiss?: (mistakes: number) => void
  /** The answer is revealed. */
  onComplete?: (result: MemoryResult) => void
  /** The hidden key on B was tapped and taken (docs/hidden-item-feature.md): neither a find nor a miss. */
  onSecret?: () => void
}

export interface MemoryOptions {
  /** Animation time multiplier (reduced motion, calm mode). */
  animationSpeed?: number
  /** Misses that end the round (default MAX_MISSES; ModeRules.memoryMaxMisses). */
  maxMisses?: number
  /** Seconds picture A is shown (default: the level's; hard mode: less). */
  showSeconds?: number
  /** Star rule of the mode (ModeRules.memoryStars). Default memoryStars. */
  stars?: (p: MemoryStarInput) => Stars | 0
  /** Looks at A while searching (default: the level's; ModeRules.memoryPeeks). */
  peeks?: number
  /** The hidden key was collected before: not shown. */
  secretTaken?: boolean
}

type Step = [phase: MemoryPhase, ms: number]

/**
 * "Memory" round: one board of pictures A and B in `container`, of which the phase shows one or
 * both; taps count on B only. Plain TS without Vue reactivity; communicates via handlers.
 */
export class MemoryScene {
  private readonly handlers: MemoryHandlers
  private readonly animationSpeed: number
  private readonly maxMisses: number
  private readonly board: Board
  private readonly loop: FrameLoop
  private readonly found: boolean[]
  private readonly peeks: number
  private readonly stars: (p: MemoryStarInput) => Stars | 0
  private phase: MemoryPhase | null = null
  /** Phases still to come; the current one ends after `left` ms. */
  private steps: Step[] = []
  private left = 0
  private foundCount = 0
  private mistakes = 0
  private peeksUsed = 0
  private searchMs = 0
  private animTime = 0
  /** The round is over: no more input. */
  private done = false

  constructor(container: HTMLElement, level: Level, handlers: MemoryHandlers = {}, options: MemoryOptions = {}) {
    if (!level.memory) throw new Error(`level ${level.id} is not a "memory" level`)
    this.handlers = handlers
    this.animationSpeed = options.animationSpeed ?? 1
    this.maxMisses = options.maxMisses ?? MAX_MISSES
    this.peeks = options.peeks ?? level.memory.peeks
    this.stars = options.stars ?? memoryStars
    this.found = level.differences.map(() => false)
    // No zoom: a picture is seen whole, and every tap counts at once.
    this.board = new Board(container, level, (hit, tap) => this.tap(hit, tap), {
      zoom: false,
      onSecret: (tap) => this.secret(tap),
      secretTaken: options.secretTaken,
    })
    this.run([['show', (options.showSeconds ?? level.memory.showSeconds) * 1000], ['curtain', CURTAIN_MS], ['search', Infinity]])
    this.loop = new FrameLoop(this.frame)
  }

  get peeksLeft(): number {
    return this.peeks - this.peeksUsed
  }

  /** Shows A again for PEEK_MS while searching. Returns false when no look is left or it is not the time. */
  peek(): boolean {
    if (this.phase !== 'search' || this.done || this.loop.paused || this.peeksLeft <= 0) return false
    this.peeksUsed++
    this.run([['curtain', CURTAIN_MS], ['peek', PEEK_MS], ['curtain', CURTAIN_MS], ['search', Infinity]])
    return true
  }

  /** Ends the search and reveals the answer ("show answer"). */
  finish(): void {
    if (this.phase !== 'search' || this.done || this.loop.paused) return
    this.done = true
    this.run([['curtain', CURTAIN_MS], ['reveal', Infinity]])
  }

  /** Freezes the phase clock, animation and input. */
  pause(): void {
    this.loop.pause()
  }

  resume(): void {
    this.loop.resume()
  }

  destroy(): void {
    this.loop.stop()
    this.board.destroy()
  }

  private run(steps: Step[]): void {
    this.steps = steps
    this.next()
  }

  private next(): void {
    const [phase, ms] = this.steps.shift()!
    this.left = ms
    if (phase === this.phase) return
    this.phase = phase
    this.board.show(VISIBLE[phase])
    if (phase === 'reveal') this.board.reveal(this.found)
    this.handlers.onPhase?.(phase, ms)
    if (phase === 'reveal') this.complete()
  }

  private frame = (dt: number, now: number) => {
    if (this.phase === 'search' && !this.done) this.searchMs += dt
    this.left -= dt
    if (this.left <= 0 && this.steps.length > 0) this.next()
    this.animTime += (dt / 1000) * this.animationSpeed
    this.board.pose(this.animTime, now)
  }

  private tap(hit: number, tap: Tap): void {
    if (this.phase !== 'search' || this.done || this.loop.paused || tap.picture !== 1) return
    if (hit < 0) {
      this.mistakes++
      this.board.markMiss(tap)
      this.handlers.onMiss?.(this.mistakes)
      if (this.mistakes >= this.maxMisses) this.end()
      return
    }
    if (this.found[hit]) return
    this.found[hit] = true
    this.foundCount++
    this.board.markFound(hit)
    this.handlers.onFound?.(this.foundCount, this.found.length)
    if (this.foundCount === this.found.length) this.end()
  }

  /** The key is drawn on B only, so it can be taken while searching. */
  private secret(tap: Tap): void {
    if (this.phase !== 'search' || this.done || this.loop.paused || tap.picture !== 1) return
    this.board.takeSecret()
    this.handlers.onSecret?.()
  }

  /** All found or out of misses: the last mark stays a moment, then the answer. */
  private end(): void {
    this.done = true
    this.run([['search', END_DELAY_MS], ['curtain', CURTAIN_MS], ['reveal', Infinity]])
  }

  private complete(): void {
    const result = { found: this.foundCount, total: this.found.length, mistakes: this.mistakes, peeks: this.peeksUsed }
    this.handlers.onComplete?.({ ...result, timeSec: Math.floor(this.searchMs / 1000), stars: this.stars(result) })
  }
}
