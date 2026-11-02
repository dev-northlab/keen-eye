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
import { hitTest } from './rules.ts'
import type { Level } from './types.ts'
import { Viewport } from './zoom.ts'

/** Double tap zoom factor. */
const DOUBLE_TAP_SCALE = 2

/** A tap on picture 0 (A) or 1 (B) at scene point (x, y). */
export interface Tap {
  picture: 0 | 1
  x: number
  y: number
  /** performance.now() of the tap: a miss is reported later (it may be the start of a double tap). */
  time: number
}

export interface BoardOptions {
  /** Pinch, pan, wheel and double tap zoom (default true). Without it every finger taps on its own. */
  zoom?: boolean
  /** Content turned by 180°: the far player's copy in a face-to-face duel. */
  flipped?: boolean
  onZoom?: (scale: number) => void
}

/** Index of a random unfound difference, or -1 when all are found. */
export function randomUnfound(found: boolean[]): number {
  const unfound = found.flatMap((f, i) => (f ? [] : [i]))
  return unfound.length ? unfound[Math.floor(Math.random() * unfound.length)] : -1
}

/**
 * One pair of pictures A and B in `container`: renders and poses them, zooms and
 * pans them together and turns taps into hits (zone index) or misses (-1) for
 * `onTap`. No game rules: the scene decides what a tap means and which marks to draw.
 */
export class Board {
  private readonly level: Level
  private readonly onTap: (hit: number, tap: Tap) => void
  private readonly zoom: boolean
  private readonly flipped: boolean
  private readonly pictures: Picture[]
  private readonly viewport: Viewport
  private readonly gestures: Gestures
  /** Animation time of the current pose (zones of moving objects follow it). */
  private time = 0
  /** Difference highlighted by a hint, or -1. */
  private hinted = -1
  /** A miss waits DOUBLE_TAP_MS: if it turns out to be the first tap of a double tap, it is dropped. */
  private pendingMiss: { timer: number; tap: Tap } | null = null

  constructor(container: HTMLElement, level: Level, onTap: (hit: number, tap: Tap) => void, options: BoardOptions = {}) {
    this.level = level
    this.onTap = onTap
    this.zoom = options.zoom ?? true
    this.flipped = options.flipped ?? false
    this.pictures = [createPicture(level, 0, this.flipped), createPicture(level, 1, this.flipped)]
    const svgs = this.pictures.map((p) => p.svg)
    this.viewport = new Viewport(svgs, level.viewBox.w, level.viewBox.h, (s) => options.onZoom?.(s))
    this.gestures = new Gestures(
      container,
      svgs,
      this.viewport,
      {
        onTap: (svg, x, y) => this.tap(svgs.indexOf(svg) as 0 | 1, x, y),
        onDoubleTap: (svg, x, y) => this.doubleTap(svgs.indexOf(svg) as 0 | 1, x, y),
      },
      this.zoom,
    )
    this.pose(0, performance.now())
    for (const svg of svgs) container.append(svg)
  }

  /** A hint is shown and its difference not found yet. */
  get hinting(): boolean {
    return this.hinted >= 0
  }

  /** Poses the pictures at animation time t and advances the zoom animation; called every frame. */
  pose(t: number, now: number): void {
    this.time = t
    for (const p of this.pictures) animatePicture(p, this.level.differences, t)
    this.viewport.step(now)
  }

  /** Circles a found difference on both pictures; also ends its hint. Returns true if it did. */
  markFound(index: number, color?: string): boolean {
    for (const p of this.pictures) addFoundMark(p, index, this.zone(p, index), color)
    if (index !== this.hinted) return false
    this.clearHint()
    return true
  }

  markMiss({ picture, x, y }: Omit<Tap, 'time'>): void {
    addMissMark(this.pictures[picture], x, y, this.viewport.scale)
  }

  /** Dashed circle larger than the zone, shifted so that the zone is somewhere inside it; shown until found. */
  showHint(index: number): void {
    const r = this.level.differences[index].r
    const angle = Math.random() * 2 * Math.PI
    const shift = r * (HINT_SCALE - 1) * 0.7 * Math.random()
    const dx = Math.cos(angle) * shift
    const dy = Math.sin(angle) * shift
    this.clearHint()
    for (const p of this.pictures) addHintMark(p, index, this.zone(p, index), dx, dy)
    this.hinted = index
  }

  clearHint(): void {
    for (const p of this.pictures) removeHintMarks(p)
    this.hinted = -1
  }

  /** Development tool: outlines the unfound differences in red (found marks drawn later cover them). */
  reveal(found: boolean[]): void {
    for (const p of this.pictures) found.forEach((f, i) => f || addRevealMark(p, i, this.zone(p, i)))
  }

  resetZoom(): void {
    this.viewport.reset()
  }

  destroy(): void {
    this.gestures.destroy()
    if (this.pendingMiss) clearTimeout(this.pendingMiss.timer)
    for (const p of this.pictures) p.svg.remove()
  }

  /** Zone of a picture at the current pose: a moving object may be elsewhere on the other picture. */
  private zone(p: Picture, index: number) {
    return zonesAt(p, this.level.differences, this.time)[index]
  }

  /** Visible (viewBox) point of a client point, or null outside the visible scene (letterbox). */
  private viewPoint(picture: 0 | 1, clientX: number, clientY: number) {
    const svg = this.pictures[picture].svg
    const pt = toViewBox(svg, clientX, clientY)
    const vb = svg.viewBox.baseVal
    if (!pt || pt.x < vb.x || pt.y < vb.y || pt.x > vb.x + vb.width || pt.y > vb.y + vb.height) return null
    return pt
  }

  private tap(picture: 0 | 1, clientX: number, clientY: number): void {
    this.commitMiss()
    const pt = this.viewPoint(picture, clientX, clientY)
    if (!pt) return
    const { w, h } = this.level.viewBox
    const time = performance.now()
    const tap: Tap = this.flipped ? { picture, x: w - pt.x, y: h - pt.y, time } : { picture, x: pt.x, y: pt.y, time }
    const hit = hitTest(zonesAt(this.pictures[picture], this.level.differences, this.time), tap.x, tap.y)
    if (hit < 0 && this.zoom) {
      this.pendingMiss = { timer: window.setTimeout(() => this.commitMiss(), DOUBLE_TAP_MS), tap }
      return
    }
    this.onTap(hit, tap)
  }

  private doubleTap(picture: 0 | 1, clientX: number, clientY: number): void {
    if (this.pendingMiss) {
      clearTimeout(this.pendingMiss.timer)
      this.pendingMiss = null
    }
    // The viewport works in visible (unturned) coordinates.
    const pt = this.viewPoint(picture, clientX, clientY)
    if (this.viewport.scale > 1) this.viewport.reset()
    else if (pt) this.viewport.zoomTo(DOUBLE_TAP_SCALE, pt.x, pt.y)
  }

  private commitMiss(): void {
    const miss = this.pendingMiss
    if (!miss) return
    clearTimeout(miss.timer)
    this.pendingMiss = null
    this.onTap(-1, miss.tap)
  }
}
