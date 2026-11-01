import type { Frame, Viewport } from './zoom.ts'

/** A tap is a single pointer that moved less than this many screen pixels. */
const TAP_SLOP_PX = 10
/** Max delay and distance between the two taps of a double tap. */
export const DOUBLE_TAP_MS = 300
const DOUBLE_TAP_SLOP_PX = 30
/** Wheel zoom sensitivity (desktop development). */
const WHEEL_ZOOM = 0.002

export interface GestureHandlers {
  onTap: (svg: SVGSVGElement, clientX: number, clientY: number) => void
  /** Second tap of a double tap; it is not reported to onTap. */
  onDoubleTap: (svg: SVGSVGElement, clientX: number, clientY: number) => void
}

interface Pointer {
  /** Picture under the finger at pointerdown; null for the gap around pictures. */
  svg: SVGSVGElement | null
  x: number
  y: number
  startX: number
  startY: number
}

/**
 * Pointer input for both pictures: taps, double taps, one-finger pan,
 * two-finger pinch and wheel zoom. Listens on the whole container, so a pinch
 * with a finger in the gap between pictures still works. Pan/pinch keep the
 * scene point under the fingers' centroid fixed; both pictures follow because
 * they share a Viewport.
 */
export class Gestures {
  private readonly svgs: SVGSVGElement[]
  private readonly viewport: Viewport
  private readonly handlers: GestureHandlers
  private readonly pointers = new Map<number, Pointer>()
  private readonly listeners = new AbortController()
  /** The current gesture is a pan/pinch, not a tap. */
  private dragging = false
  private transform: { frame: Frame; ax: number; ay: number; dist: number; scale: number } | null = null
  private lastTap = { time: -Infinity, x: 0, y: 0 }

  constructor(container: HTMLElement, svgs: SVGSVGElement[], viewport: Viewport, handlers: GestureHandlers) {
    this.svgs = svgs
    this.viewport = viewport
    this.handlers = handlers
    container.style.touchAction = 'none'
    const { signal } = this.listeners
    container.addEventListener('pointerdown', this.onDown, { signal })
    container.addEventListener('pointermove', this.onMove, { signal })
    container.addEventListener('pointerup', this.onUp, { signal })
    container.addEventListener('pointercancel', this.onUp, { signal })
    container.addEventListener('wheel', this.onWheel, { passive: false, signal })
    // The browser follows a touch with a synthetic click on whatever is under the finger after the
    // tap was handled, e.g. a button of the result dialog that the last find just opened.
    container.addEventListener('touchend', (e) => e.cancelable && e.preventDefault(), { passive: false, signal })
  }

  /** The container outlives the scene (e.g. level restart), so listeners must be removed. */
  destroy(): void {
    this.listeners.abort()
  }

  /** Picture containing the event target, if any. */
  private svgAt(target: EventTarget | null): SVGSVGElement | null {
    return this.svgs.find((s) => target instanceof Node && s.contains(target)) ?? null
  }

  private onDown = (e: PointerEvent) => {
    const svg = this.svgAt(e.target)
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
    this.pointers.set(e.pointerId, { svg, x: e.clientX, y: e.clientY, startX: e.clientX, startY: e.clientY })
    if (this.pointers.size > 1) this.dragging = true
    this.beginTransform()
  }

  private onMove = (e: PointerEvent) => {
    const p = this.pointers.get(e.pointerId)
    if (!p) return
    p.x = e.clientX
    p.y = e.clientY
    if (!this.dragging && Math.hypot(p.x - p.startX, p.y - p.startY) >= TAP_SLOP_PX) this.dragging = true
    if (this.dragging) this.updateTransform()
  }

  private onUp = (e: PointerEvent) => {
    const p = this.pointers.get(e.pointerId)
    if (!p) return
    this.pointers.delete(e.pointerId)
    if (this.pointers.size > 0) {
      // Continue the pan/pinch with the remaining fingers.
      this.beginTransform()
      return
    }
    this.transform = null
    const wasDrag = this.dragging
    this.dragging = false
    if (!wasDrag && e.type === 'pointerup') this.tap(p)
  }

  private onWheel = (e: WheelEvent) => {
    e.preventDefault()
    const frame = this.viewport.frame(this.svgAt(e.target) ?? this.svgs[0])
    if (!frame) return
    const a = this.viewport.toScene(frame, e.clientX, e.clientY)
    this.viewport.anchor(frame, a.x, a.y, e.clientX, e.clientY, this.viewport.scale * Math.exp(-e.deltaY * WHEEL_ZOOM))
  }

  private tap(p: Pointer): void {
    if (!p.svg) return
    const now = performance.now()
    const last = this.lastTap
    if (now - last.time < DOUBLE_TAP_MS && Math.hypot(p.startX - last.x, p.startY - last.y) < DOUBLE_TAP_SLOP_PX) {
      this.lastTap = { time: -Infinity, x: 0, y: 0 }
      this.handlers.onDoubleTap(p.svg, p.startX, p.startY)
      return
    }
    this.lastTap = { time: now, x: p.startX, y: p.startY }
    this.handlers.onTap(p.svg, p.startX, p.startY)
  }

  private centroid() {
    let x = 0
    let y = 0
    for (const p of this.pointers.values()) {
      x += p.x
      y += p.y
    }
    const n = this.pointers.size
    x /= n
    y /= n
    let dist = 0
    for (const p of this.pointers.values()) dist += Math.hypot(p.x - x, p.y - y)
    return { x, y, dist: dist / n }
  }

  /** Remembers the scene point under the fingers to keep it there while they move. */
  private beginTransform(): void {
    // Map the fingers through the first picture touched (or A when only the gap was).
    const svg = [...this.pointers.values()].find((p) => p.svg)?.svg ?? this.svgs[0]
    const frame = this.viewport.frame(svg)
    if (!frame) return
    const c = this.centroid()
    const a = this.viewport.toScene(frame, c.x, c.y)
    this.transform = { frame, ax: a.x, ay: a.y, dist: c.dist, scale: this.viewport.scale }
  }

  private updateTransform(): void {
    const t = this.transform
    if (!t) return
    const c = this.centroid()
    const scale = this.pointers.size > 1 && t.dist > 0 ? (t.scale * c.dist) / t.dist : t.scale
    this.viewport.anchor(t.frame, t.ax, t.ay, c.x, c.y, scale)
    // Re-anchor after every move: when the view hits the zoom or edge limits,
    // moving the fingers back responds immediately instead of after a dead zone.
    this.beginTransform()
  }
}
