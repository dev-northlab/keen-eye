import { inverseTransformPoint, transformPoint, transformRect, type PictureTransform, type Size } from './transform.ts'

export const MAX_SCALE = 4
const ANIM_MS = 200

/** Visible part of the scene: top-left corner in viewBox units and zoom factor. */
interface View {
  scale: number
  x: number
  y: number
}

/** What the viewport needs of a picture's svg: its screen placement, and its viewBox to set. */
export interface ViewSvg {
  getScreenCTM(): { a: number; d: number; e: number; f: number } | null
  setAttribute(name: string, value: string): void
}

/** Client-space placement of the whole scene (scale 1) inside one picture. */
export interface Frame {
  left: number
  top: number
  /** Client px per viewBox unit at scale 1. */
  k: number
  /** How the picture shows the scene: its viewBox is in shown coordinates. */
  transform: PictureTransform
}

/**
 * Shared zoom/pan state of both pictures, in scene coordinates: a mirrored or turned picture
 * (`transforms`) shows the same part of the scene, turned. Applied as the svg viewBox, so
 * hit testing through getScreenCTM() stays correct at any zoom.
 */
export class Viewport {
  private readonly svgs: ViewSvg[]
  private readonly transforms: PictureTransform[]
  private readonly w: number
  private readonly h: number
  private readonly size: Size
  private readonly onScale: (scale: number) => void
  private view: View = { scale: 1, x: 0, y: 0 }
  private anim: { from: View; to: View; start: number } | null = null

  /** `transforms`: of each svg, default 'none'. */
  constructor(svgs: ViewSvg[], w: number, h: number, onScale: (scale: number) => void, transforms: PictureTransform[] = []) {
    this.svgs = svgs
    this.transforms = svgs.map((_, i) => transforms[i] ?? 'none')
    this.w = w
    this.h = h
    this.size = { w, h }
    this.onScale = onScale
  }

  get scale(): number {
    return this.view.scale
  }

  /** svg i now shows the scene another way: the same part of the scene stays in view. */
  setTransform(i: number, transform: PictureTransform): void {
    this.transforms[i] = transform
    this.apply(this.view)
  }

  frame(svg: ViewSvg): Frame | null {
    const ctm = svg.getScreenCTM()
    if (!ctm) return null
    const transform = this.transforms[this.svgs.indexOf(svg)] ?? 'none'
    const shown = this.shownView(transform)
    return { left: ctm.e + shown.x * ctm.a, top: ctm.f + shown.y * ctm.d, k: ctm.a / this.view.scale, transform }
  }

  /** Scene point under client point (cx, cy). */
  toScene(f: Frame, cx: number, cy: number) {
    const shown = this.shownView(f.transform)
    const k = f.k * this.view.scale
    return inverseTransformPoint(f.transform, { x: shown.x + (cx - f.left) / k, y: shown.y + (cy - f.top) / k }, this.size)
  }

  /** Sets `scale` and moves the view so that scene point (ax, ay) is under client point (cx, cy). */
  anchor(f: Frame, ax: number, ay: number, cx: number, cy: number, scale: number): void {
    this.anim = null
    const s = clamp(scale, 1, MAX_SCALE)
    const a = transformPoint(f.transform, { x: ax, y: ay }, this.size)
    const shown = { x: a.x - (cx - f.left) / (f.k * s), y: a.y - (cy - f.top) / (f.k * s), w: this.w / s, h: this.h / s }
    const { x, y } = transformRect(f.transform, shown, this.size)
    this.apply({ scale: s, x, y })
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
    this.svgs.forEach((svg, i) => {
      const { x, y, w, h } = this.shownView(this.transforms[i])
      svg.setAttribute('viewBox', `${x} ${y} ${w} ${h}`)
    })
    if (this.view.scale !== prevScale) this.onScale(this.view.scale)
  }

  /** The view as a picture shown with `transform` sees it (its viewBox). */
  private shownView(transform: PictureTransform) {
    const { scale, x, y } = this.view
    return transformRect(transform, { x, y, w: this.w / scale, h: this.h / scale }, this.size)
  }
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)
