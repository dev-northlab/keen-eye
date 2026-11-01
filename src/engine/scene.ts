import { DOUBLE_TAP_MS, Gestures } from './gestures.ts'
import {
  addFoundMark,
  addMissMark,
  animatePicture,
  createPicture,
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
  onComplete?: (result: LevelResult) => void
}

export interface SceneOptions {
  /** Animation time multiplier: 1 = normal, < 1 = softer motion (reduced motion, calm mode). */
  animationSpeed?: number
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
  private readonly pictures: Picture[]
  private readonly viewport: Viewport
  private readonly gestures: Gestures
  private readonly found: boolean[]
  private readonly guard = new MissGuard()
  private foundCount = 0
  private mistakes = 0
  private elapsedMs = 0
  /** Shared animation clock of both pictures, seconds. */
  private animTime = 0
  private lastFrame = 0
  private rafId = 0
  private lockTimer = 0
  /** A miss waits DOUBLE_TAP_MS: if it turns out to be the first tap of a double tap, it is dropped. */
  private pendingMiss: { timer: number; picture: Picture; x: number; y: number } | null = null
  private done = false

  constructor(container: HTMLElement, level: Level, handlers: SceneHandlers = {}, options: SceneOptions = {}) {
    this.level = level
    this.handlers = handlers
    this.animationSpeed = options.animationSpeed ?? 1
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

  destroy(): void {
    cancelAnimationFrame(this.rafId)
    clearTimeout(this.lockTimer)
    this.gestures.destroy()
    if (this.pendingMiss) clearTimeout(this.pendingMiss.timer)
    for (const p of this.pictures) p.svg.remove()
    this.done = true
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
    this.animTime += (dt / 1000) * this.animationSpeed
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
    if (this.done || this.guard.isLocked(performance.now())) return
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
    for (const p of this.pictures) addFoundMark(p, index, zonesAt(p, this.level.differences, this.animTime)[index])
    this.handlers.onFound?.(this.foundCount, this.found.length)
    if (this.foundCount === this.found.length) this.complete()
  }

  private doubleTap(picture: Picture, clientX: number, clientY: number): void {
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
    if (this.guard.miss(now)) {
      this.handlers.onLock?.(true)
      this.lockTimer = window.setTimeout(() => this.handlers.onLock?.(false), LOCK_MS)
    }
  }

  private complete(): void {
    this.done = true
    const timeSec = Math.floor(this.elapsedMs / 1000)
    const hintsUsed = 0
    this.handlers.onComplete?.({
      timeSec,
      mistakes: this.mistakes,
      hintsUsed,
      stars: computeStars({ timeSec, parTimeSec: this.level.parTimeSec, mistakes: this.mistakes, hintsUsed }),
    })
  }
}
