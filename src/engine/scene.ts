import { DOUBLE_TAP_MS, Gestures } from './gestures.ts'
import {
  addFoundMark,
  addHintMark,
  addMissMark,
  addRevealMark,
  animatePicture,
  createPicture,
  HINT_SCALE,
  removeHintMarks,
  toViewBox,
  zonesAt,
  type Picture,
} from './render.ts'
import { computeStars, hitTest, LOCK_MS, MissGuard } from './rules.ts'
import type { Level, LevelResult } from './types.ts'
import { Viewport } from './zoom.ts'

export interface SceneHandlers {
  onFound?: (found: number, total: number) => void
  onMiss?: (mistakes: number) => void
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

/** Frame delta cap so that time in a hidden tab (rAF paused) is not counted. */
const MAX_FRAME_MS = 250
/** Double tap zoom factor. */
const DOUBLE_TAP_SCALE = 2

/**
 * Game scene: renders and animates pictures A and B in `container`, handles
 * taps and zoom, keeps score. Plain TS without Vue reactivity; communicates
 * via handlers.
 */
export class GameScene {
  private readonly level: Level
  private readonly handlers: SceneHandlers
  private readonly animationSpeed: number
  private readonly missLock: boolean
  private readonly pictures: Picture[]
  private readonly viewport: Viewport
  private readonly gestures: Gestures
  private readonly found: boolean[]
  private readonly guard = new MissGuard()
  private foundCount = 0
  private mistakes = 0
  private hintsUsed = 0
  /** Difference currently highlighted by a hint, or -1. */
  private hinted = -1
  private revealed = false
  /** Scene animation stopped by the player (calm mode); timer and input keep working. */
  private animationFrozen = false
  private elapsedMs = 0
  /** Shared animation clock of both pictures, seconds. */
  private animTime = 0
  private lastFrame = 0
  private rafId = 0
  private lockTimer = 0
  /** A miss waits DOUBLE_TAP_MS: if it turns out to be the first tap of a double tap, it is dropped. */
  private pendingMiss: { timer: number; picture: Picture; x: number; y: number } | null = null
  /** Level complete: no more input, timer stopped; the scene keeps animating. */
  private done = false
  private paused = false
  private destroyed = false

  constructor(container: HTMLElement, level: Level, handlers: SceneHandlers = {}, options: SceneOptions = {}) {
    this.level = level
    this.handlers = handlers
    this.animationSpeed = options.animationSpeed ?? 1
    this.missLock = options.missLock ?? true
    this.found = level.differences.map(() => false)
    this.pictures = [createPicture(level, 0), createPicture(level, 1)]
    const svgs = this.pictures.map((p) => p.svg)
    this.viewport = new Viewport(svgs, level.viewBox.w, level.viewBox.h, (s) => this.handlers.onZoom?.(s))
    this.gestures = new Gestures(container, svgs, this.viewport, {
      onTap: (svg, x, y) => this.tap(this.pictureOf(svg), x, y),
      onDoubleTap: (svg, x, y) => this.doubleTap(this.pictureOf(svg), x, y),
    })
    for (const p of this.pictures) animatePicture(p, level.differences, 0)
    for (const svg of svgs) container.append(svg)
    this.lastFrame = performance.now()
    this.rafId = requestAnimationFrame(this.frame)
  }

  resetZoom(): void {
    this.viewport.reset()
  }

  /**
   * Highlights an unfound difference with a dashed circle larger than the zone,
   * shown until it is found. Returns false when there is nothing to hint or a
   * hint is already shown (so a hint is never spent twice).
   */
  hint(): boolean {
    if (this.done || this.paused || this.hinted >= 0) return false
    const unfound = this.found.flatMap((f, i) => (f ? [] : [i]))
    if (unfound.length === 0) return false
    const index = unfound[Math.floor(Math.random() * unfound.length)]
    // Shift the circle so the zone is somewhere inside it, not exactly at its center.
    const r = this.level.differences[index].r
    const angle = Math.random() * 2 * Math.PI
    const shift = r * (HINT_SCALE - 1) * 0.7 * Math.random()
    const dx = Math.cos(angle) * shift
    const dy = Math.sin(angle) * shift
    for (const p of this.pictures) addHintMark(p, index, zonesAt(p, this.level.differences, this.animTime)[index], dx, dy)
    this.hinted = index
    this.hintsUsed++
    this.handlers.onHint?.(true)
    return true
  }

  /** Development tool: outlines every unfound difference in red (once; found marks cover them). */
  revealAll(): void {
    if (this.done || this.revealed) return
    this.revealed = true
    for (const p of this.pictures) {
      const zones = zonesAt(p, this.level.differences, this.animTime)
      this.found.forEach((f, i) => f || addRevealMark(p, i, zones[i]))
    }
  }

  /** Stops or restarts the scene animation (calm mode button). */
  setAnimationFrozen(frozen: boolean): void {
    this.animationFrozen = frozen
  }

  /** Freezes timer, animation and input. */
  pause(): void {
    if (this.paused || this.destroyed) return
    this.paused = true
    cancelAnimationFrame(this.rafId)
  }

  resume(): void {
    if (!this.paused || this.destroyed) return
    this.paused = false
    this.lastFrame = performance.now()
    this.rafId = requestAnimationFrame(this.frame)
  }

  destroy(): void {
    this.destroyed = true
    cancelAnimationFrame(this.rafId)
    clearTimeout(this.lockTimer)
    this.gestures.destroy()
    if (this.pendingMiss) clearTimeout(this.pendingMiss.timer)
    for (const p of this.pictures) p.svg.remove()
  }

  private pictureOf(svg: SVGSVGElement): Picture {
    return this.pictures.find((p) => p.svg === svg)!
  }

  // Keeps running after the level is complete: the scene stays alive under the result dialog.
  private frame = (now: number) => {
    const dt = Math.min(Math.max(now - this.lastFrame, 0), MAX_FRAME_MS)
    this.lastFrame = now
    if (!this.done) {
      const prevSec = Math.floor(this.elapsedMs / 1000)
      this.elapsedMs += dt
      const sec = Math.floor(this.elapsedMs / 1000)
      if (sec !== prevSec) this.handlers.onTick?.(sec)
    }
    if (!this.animationFrozen) this.animTime += (dt / 1000) * this.animationSpeed
    for (const p of this.pictures) animatePicture(p, this.level.differences, this.animTime)
    this.viewport.step(now)
    this.rafId = requestAnimationFrame(this.frame)
  }

  /** Scene point of a client point, or null outside the visible scene (letterbox). */
  private scenePoint(picture: Picture, clientX: number, clientY: number) {
    const pt = toViewBox(picture.svg, clientX, clientY)
    const vb = picture.svg.viewBox.baseVal
    if (!pt || pt.x < vb.x || pt.y < vb.y || pt.x > vb.x + vb.width || pt.y > vb.y + vb.height) return null
    return pt
  }

  private tap(picture: Picture, clientX: number, clientY: number): void {
    this.commitMiss()
    if (this.done || this.paused || this.guard.isLocked(performance.now())) return
    const pt = this.scenePoint(picture, clientX, clientY)
    if (!pt) return

    // Zones of the tapped picture: a moving object may be elsewhere on the other picture.
    const index = hitTest(zonesAt(picture, this.level.differences, this.animTime), pt.x, pt.y)
    if (index < 0) {
      const timer = window.setTimeout(() => this.commitMiss(), DOUBLE_TAP_MS)
      this.pendingMiss = { timer, picture, x: pt.x, y: pt.y }
      return
    }
    if (this.found[index]) return
    this.found[index] = true
    this.foundCount++
    this.guard.hit()
    if (index === this.hinted) {
      for (const p of this.pictures) removeHintMarks(p)
      this.hinted = -1
      this.handlers.onHint?.(false)
    }
    for (const p of this.pictures) addFoundMark(p, index, zonesAt(p, this.level.differences, this.animTime)[index])
    this.handlers.onFound?.(this.foundCount, this.found.length)
    if (this.foundCount === this.found.length) this.complete()
  }

  private doubleTap(picture: Picture, clientX: number, clientY: number): void {
    if (this.paused) return
    if (this.pendingMiss) {
      clearTimeout(this.pendingMiss.timer)
      this.pendingMiss = null
    }
    const pt = this.scenePoint(picture, clientX, clientY)
    if (this.viewport.scale > 1) this.viewport.reset()
    else if (pt) this.viewport.zoomTo(DOUBLE_TAP_SCALE, pt.x, pt.y)
  }

  private commitMiss(): void {
    const miss = this.pendingMiss
    if (!miss) return
    clearTimeout(miss.timer)
    this.pendingMiss = null
    if (this.done) return

    const now = performance.now()
    this.mistakes++
    addMissMark(miss.picture, miss.x, miss.y, this.viewport.scale)
    this.handlers.onMiss?.(this.mistakes)
    if (this.missLock && this.guard.miss(now)) {
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
