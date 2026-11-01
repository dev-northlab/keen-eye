export const MAX_SCALE = 4
const ANIM_MS = 200

/** Visible part of the scene: top-left corner in viewBox units and zoom factor. */
interface View {
  scale: number
  x: number
  y: number
}

/** Client-space placement of the whole scene (scale 1) inside one picture. */
export interface Frame {
  left: number
  top: number
  /** Client px per viewBox unit at scale 1. */
  k: number
}

/**
 * Shared zoom/pan state of both pictures. Applied as the svg viewBox, so
 * hit testing through getScreenCTM() stays correct at any zoom.
 */
export class Viewport {
  private readonly svgs: SVGSVGElement[]
  private readonly w: number
  private readonly h: number
  private readonly onScale: (scale: number) => void
  private view: View = { scale: 1, x: 0, y: 0 }
  private anim: { from: View; to: View; start: number } | null = null

  constructor(svgs: SVGSVGElement[], w: number, h: number, onScale: (scale: number) => void) {
    this.svgs = svgs
    this.w = w
    this.h = h
    this.onScale = onScale
  }

  get scale(): number {
    return this.view.scale
  }

  frame(svg: SVGSVGElement): Frame | null {
    const ctm = svg.getScreenCTM()
    if (!ctm) return null
    return { left: ctm.e + this.view.x * ctm.a, top: ctm.f + this.view.y * ctm.d, k: ctm.a / this.view.scale }
  }

  /** Scene point under client point (cx, cy). */
  toScene(f: Frame, cx: number, cy: number) {
    const k = f.k * this.view.scale
    return { x: this.view.x + (cx - f.left) / k, y: this.view.y + (cy - f.top) / k }
  }

  /** Sets `scale` and moves the view so that scene point (ax, ay) is under client point (cx, cy). */
  anchor(f: Frame, ax: number, ay: number, cx: number, cy: number, scale: number): void {
    this.anim = null
    const s = clamp(scale, 1, MAX_SCALE)
    this.apply({ scale: s, x: ax - (cx - f.left) / (f.k * s), y: ay - (cy - f.top) / (f.k * s) })
  }

  /** Animated zoom to `scale` keeping scene point (ax, ay) in place on screen. */
  zoomTo(scale: number, ax: number, ay: number): void {
    const s = clamp(scale, 1, MAX_SCALE)
    const r = this.view.scale / s
    this.animate({ scale: s, x: ax - (ax - this.view.x) * r, y: ay - (ay - this.view.y) * r })
  }

  reset(): void {
    this.animate({ scale: 1, x: 0, y: 0 })
  }

  /** Advances the zoom animation; called every frame. */
  step(now: number): void {
    if (!this.anim) return
    const { from, to, start } = this.anim
    const t = Math.min(Math.max((now - start) / ANIM_MS, 0), 1)
    const e = 1 - (1 - t) ** 3
    this.apply({
      scale: from.scale + (to.scale - from.scale) * e,
      x: from.x + (to.x - from.x) * e,
      y: from.y + (to.y - from.y) * e,
    })
    if (t === 1) this.anim = null
  }

  private animate(to: View): void {
    this.anim = { from: { ...this.view }, to: this.clamped(to), start: performance.now() }
  }

  private clamped(v: View): View {
    const scale = clamp(v.scale, 1, MAX_SCALE)
    return {
      scale,
      x: clamp(v.x, 0, this.w - this.w / scale),
      y: clamp(v.y, 0, this.h - this.h / scale),
    }
  }

  private apply(v: View): void {
    const prevScale = this.view.scale
    this.view = this.clamped(v)
    const { scale, x, y } = this.view
    const viewBox = `${x} ${y} ${this.w / scale} ${this.h / scale}`
    for (const svg of this.svgs) svg.setAttribute('viewBox', viewBox)
    if (scale !== prevScale) this.onScale(scale)
  }
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)
