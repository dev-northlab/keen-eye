import { AnachronismRound } from './anachronism.ts'
import { randomUnfound } from './board.ts'
import { DOUBLE_TAP_MS, Gestures } from './gestures.ts'
import { clientToPercent, shapeCircle } from './hit-test.ts'
import { FrameLoop } from './loop.ts'
import {
  addFoundMark,
  addHintMark,
  addMissMark,
  addRevealMark,
  animatePicture,
  createSvgPicture,
  HINT_SCALE,
  removeHintMarks,
  type Picture,
} from './render.ts'
import { computeStars, LOCK_MS, MissGuard } from './rules.ts'
import type { AnachronismLevel, LevelResult } from './types.ts'
import { Viewport } from './zoom.ts'

/** Double tap zoom factor. */
const DOUBLE_TAP_SCALE = 2

export interface AnachronismHandlers {
  /** Item `index` was found; `found` of `total` are found now. */
  onFound?: (index: number, found: number, total: number) => void
  onMiss?: (mistakes: number) => void
  onLock?: (locked: boolean) => void
  /** Called when the whole number of elapsed seconds changes. */
  onTick?: (seconds: number) => void
  onZoom?: (scale: number) => void
  /** A hint is shown (true) or its item was found (false). */
  onHint?: (active: boolean) => void
  onComplete?: (result: LevelResult) => void
}

export interface AnachronismOptions {
  /** Animation time multiplier: 1 = normal, < 1 = softer motion (reduced motion, calm mode). */
  animationSpeed?: number
  /** Anti-spam lock after quick misses (off in calm mode). Default true. */
  missLock?: boolean
  /** "Reduce motion": found circles and miss crosses only fade in and out, without their bursts. */
  reduceMotion?: boolean
}

/**
 * "Find the odd one out" scene (docs/anachronism-mode.md): one picture from the SVG `source` in
 * `container` with the zoom and pan of the main mode, its living background, the timer and the
 * score. Plain TS without Vue reactivity; communicates via handlers.
 */
export class AnachronismScene {
  private readonly level: AnachronismLevel
  private readonly handlers: AnachronismHandlers
  private readonly animationSpeed: number
  private readonly missLock: boolean
  private readonly reduceMotion: boolean
  private readonly round: AnachronismRound
  private readonly picture: Picture
  /** Item circles in image pixels: found, hint and reveal marks. */
  private readonly zones: { x: number; y: number; r: number }[]
  private readonly viewport: Viewport
  private readonly gestures: Gestures
  private readonly loop: FrameLoop
  private readonly guard = new MissGuard()
  private mistakes = 0
  private hintsUsed = 0
  /** Item highlighted by a hint, or -1. */
  private hinted = -1
  private revealed = false
  private elapsedMs = 0
  /** Animation clock of the background, seconds. */
  private animTime = 0
  /** Background animation stopped by the player (calm mode); timer and input keep working. */
  private animationFrozen = false
  private lockTimer = 0
  /** A miss waits DOUBLE_TAP_MS: if it turns out to be the first tap of a double tap, it is dropped. */
  private pendingMiss: { timer: number; x: number; y: number } | null = null
  /** Level complete: no more input, timer stopped; the background keeps moving. */
  private done = false

  constructor(
    container: HTMLElement,
    level: AnachronismLevel,
    source: string,
    handlers: AnachronismHandlers = {},
    options: AnachronismOptions = {},
  ) {
    this.level = level
    this.handlers = handlers
    this.animationSpeed = options.animationSpeed ?? 1
    this.missLock = options.missLock ?? true
    this.reduceMotion = options.reduceMotion ?? false
    this.round = new AnachronismRound(level)
    const size = { w: level.width, h: level.height }
    this.zones = level.items.map((s) => shapeCircle(s, size))
    this.picture = createSvgPicture(source, size.w, size.h, level.animations)
    const svg = this.picture.svg
    this.viewport = new Viewport([svg], size.w, size.h, (s) => handlers.onZoom?.(s))
    this.gestures = new Gestures(container, [svg], this.viewport, {
      onTap: (_, x, y) => this.tap(x, y),
      onDoubleTap: (_, x, y) => this.doubleTap(x, y),
    })
    container.append(svg)
    this.loop = new FrameLoop(this.frame)
  }

  resetZoom(): void {
    this.viewport.reset()
  }

  /**
   * Circles the area of a random unfound item until it is found. Returns false when there is
   * nothing to hint or a hint is already shown (so a hint is never spent twice).
   */
  hint(): boolean {
    if (this.done || this.loop.paused || this.hinted >= 0) return false
    const index = randomUnfound(this.round.found)
    if (index < 0) return false
    // Larger than the item and shifted, so that the item is somewhere inside, not at the center.
    const zone = this.zones[index]
    const angle = Math.random() * 2 * Math.PI
    const shift = zone.r * (HINT_SCALE - 1) * 0.7 * Math.random()
    addHintMark(this.picture, index, zone, Math.cos(angle) * shift, Math.sin(angle) * shift)
    this.hinted = index
    this.hintsUsed++
    this.handlers.onHint?.(true)
    return true
  }

  /** Development tool: outlines every unfound item in red (once; found marks cover them). */
  revealAll(): void {
    if (this.done || this.revealed) return
    this.revealed = true
    this.round.found.forEach((f, i) => f || addRevealMark(this.picture, i, this.zones[i]))
  }

  /** Stops or restarts the background animation (calm mode button). */
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
    if (this.pendingMiss) clearTimeout(this.pendingMiss.timer)
    this.gestures.destroy()
    this.picture.svg.remove()
  }

  private frame = (dt: number, now: number) => {
    if (!this.done) {
      const prevSec = Math.floor(this.elapsedMs / 1000)
      this.elapsedMs += dt
      const sec = Math.floor(this.elapsedMs / 1000)
      if (sec !== prevSec) this.handlers.onTick?.(sec)
    }
    if (!this.animationFrozen) this.animTime += (dt / 1000) * this.animationSpeed
    // Item circles stand in for differences: none of them moves, so their marks stay put.
    animatePicture(this.picture, this.zones, this.animTime)
    this.viewport.step(now)
  }

  /** Image point in percent under a client point, or null outside the picture. */
  private toPercent(clientX: number, clientY: number) {
    const svg = this.picture.svg
    const vb = svg.viewBox.baseVal
    const view = { x: vb.x, y: vb.y, w: vb.width, h: vb.height }
    return clientToPercent(clientX, clientY, svg.getBoundingClientRect(), view, { w: this.level.width, h: this.level.height })
  }

  private tap(clientX: number, clientY: number): void {
    this.commitMiss()
    if (this.done || this.loop.paused || this.guard.isLocked(performance.now())) return
    const pt = this.toPercent(clientX, clientY)
    if (!pt) return
    const outcome = this.round.tap(pt.x, pt.y)
    if (outcome.kind === 'miss') {
      this.pendingMiss = { timer: window.setTimeout(() => this.commitMiss(), DOUBLE_TAP_MS), ...pt }
      return
    }
    if (outcome.kind === 'repeat') return
    const { index } = outcome
    this.guard.hit()
    addFoundMark(this.picture, index, this.zones[index], undefined, this.reduceMotion)
    if (index === this.hinted) {
      removeHintMarks(this.picture)
      this.hinted = -1
      this.handlers.onHint?.(false)
    }
    this.handlers.onFound?.(index, this.round.foundCount, this.round.found.length)
    if (outcome.complete) this.complete()
  }

  private doubleTap(clientX: number, clientY: number): void {
    if (this.pendingMiss) {
      clearTimeout(this.pendingMiss.timer)
      this.pendingMiss = null
    }
    const pt = this.toPercent(clientX, clientY)
    if (this.viewport.scale > 1) this.viewport.reset()
    else if (pt) this.viewport.zoomTo(DOUBLE_TAP_SCALE, (pt.x * this.level.width) / 100, (pt.y * this.level.height) / 100)
  }

  private commitMiss(): void {
    const miss = this.pendingMiss
    if (!miss) return
    clearTimeout(miss.timer)
    this.pendingMiss = null
    if (this.done || this.loop.paused) return
    this.mistakes++
    addMissMark(this.picture, (miss.x * this.level.width) / 100, (miss.y * this.level.height) / 100, this.viewport.scale, this.reduceMotion)
    this.handlers.onMiss?.(this.mistakes)
    if (this.missLock && this.guard.miss(performance.now())) {
      this.handlers.onLock?.(true)
      this.lockTimer = window.setTimeout(() => this.handlers.onLock?.(false), LOCK_MS)
    }
  }

  private complete(): void {
    this.done = true
    this.handlers.onComplete?.(this.result())
  }

  private result(): LevelResult {
    const timeSec = Math.floor(this.elapsedMs / 1000)
    const { mistakes, hintsUsed } = this
    return { timeSec, mistakes, hintsUsed, stars: computeStars({ timeSec, parTimeSec: this.level.parTimeSec, mistakes, hintsUsed }) }
  }
}
