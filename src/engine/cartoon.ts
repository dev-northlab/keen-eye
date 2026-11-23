// A cartoon with a camera (docs/cartoon-mode.md, the camera approach): both pictures show the same part of a world
// larger than the screen, chosen by the story's camera keys — pans, push-ins and cuts with a short dip to black.
// The board of a `Level.cartoon`; the game rules stay `GameScene`'s.
import { DOUBLE_TAP_MS, Gestures } from './gestures.ts'
import { ease, loopTime, sampleKeys } from './keyframes.ts'
import {
  addFoundMark,
  addHintMark,
  addMissMark,
  addRevealMark,
  animatePicture,
  createPicture,
  HINT_SCALE,
  removeHintMarks,
  takeSecret,
  tapZonesAt,
  toViewBox,
  zonesAt,
  type Picture,
} from './render.ts'
import { hitTest } from './rules.ts'
import type { Tap, BoardOptions } from './board.ts'
import type { CameraKey, CartoonFilm, Level } from './types.ts'
import { PoseRate } from './pace.ts'
import { MAX_SCALE, type Frame } from './zoom.ts'

const SVG_NS = 'http://www.w3.org/2000/svg'
/** Double tap zoom factor, as on other levels. */
const DOUBLE_TAP_SCALE = 2
/** How long a zoom eases in or back to the camera. */
const ZOOM_MS = 260

const CAMERA_FIELDS = ['x', 'y', 'w'] as const
/** A cut dips to black and back over this many seconds on each side of it. */
const CUT_DIP_S = 0.16

/** The part of the world shown at second s of the story. */
export function cameraAt(film: CartoonFilm, t: number) {
  const s = loopTime(t, film.period)
  const { x, y, w } = sampleKeys<(typeof CAMERA_FIELDS)[number]>(film.camera as CameraKey[], s, film.period, CAMERA_FIELDS, { x: 0, y: 0, w: film.frame.w })
  return { x, y, w, h: (w * film.frame.h) / film.frame.w }
}

/**
 * The camera's frame grown to the shape of the picture on screen (box width / height), around its center and kept
 * inside the world: a tall phone shows more of the world above and below, not an empty margin. Never larger than
 * the world; what is left over stays an empty margin.
 */
export function fitCamera(cam: { x: number; y: number; w: number; h: number }, box: number, world: { w: number; h: number }) {
  let { w, h } = cam
  if (box > 0 && Number.isFinite(box)) {
    if (box < w / h) h = w / box
    else w = h * box
  }
  w = Math.min(w, world.w)
  h = Math.min(h, world.h)
  const x = Math.min(Math.max(cam.x + cam.w / 2 - w / 2, 0), world.w - w)
  const y = Math.min(Math.max(cam.y + cam.h / 2 - h / 2, 0), world.h - h)
  return { x, y, w, h }
}

type Rect = { x: number; y: number; w: number; h: number }
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)
const lerp = (a: Rect, b: Rect, e: number): Rect => ({
  x: a.x + (b.x - a.x) * e,
  y: a.y + (b.y - a.y) * e,
  w: a.w + (b.w - a.w) * e,
  h: a.h + (b.h - a.h) * e,
})

/**
 * The player's zoom over a cartoon, driven by `Gestures` like a `Viewport` (pinch, pan, wheel, double tap). At
 * scale 1 the pictures follow the story's camera; zooming in holds the shot the camera had then and shows part of
 * it, up to `MAX_SCALE`, while the story plays on; back to scale 1 the view eases back to the camera.
 */
export class CameraZoom {
  private readonly onScale: (scale: number) => void
  private zoom = 1
  /** The camera's shot held while zoomed in; null while following the camera. */
  private base: Rect | null = null
  /** The part of the world shown now (world units). */
  private shown: Rect = { x: 0, y: 0, w: 1, h: 1 }
  private anim: { from: Rect; to: Rect | 'camera'; start: number } | null = null
  /** The fingers moved the view since the last `takeChange()`: it is drawn at once, not at the story's pace. */
  private changed = false

  constructor(onScale: (scale: number) => void) {
    this.onScale = onScale
  }

  get scale(): number {
    return this.zoom
  }

  /** The pictures show the camera's shot (no zoom, no easing back): cuts dip to black. */
  get following(): boolean {
    return !this.base && !this.anim
  }

  get animating(): boolean {
    return this.anim !== null
  }

  takeChange(): boolean {
    const c = this.changed
    this.changed = false
    return c
  }

  /** The part of the world to show at `now`, given the camera's shot. */
  step(now: number, camera: Rect): Rect {
    const a = this.anim
    if (a) {
      const t = clamp((now - a.start) / ZOOM_MS, 0, 1)
      const e = 1 - (1 - t) ** 3
      this.shown = lerp(a.from, a.to === 'camera' ? camera : a.to, e)
      if (t === 1) {
        this.anim = null
        if (a.to === 'camera') this.base = null
      }
    } else if (!this.base) this.shown = camera
    return this.shown
  }

  frame(svg: SVGSVGElement): Frame | null {
    const ctm = svg.getScreenCTM()
    if (!ctm) return null
    return { left: ctm.e + this.shown.x * ctm.a, top: ctm.f + this.shown.y * ctm.d, k: ctm.a / this.zoom, transform: 'none' }
  }

  toScene(f: Frame, cx: number, cy: number) {
    const k = f.k * this.zoom
    return { x: this.shown.x + (cx - f.left) / k, y: this.shown.y + (cy - f.top) / k }
  }

  /** Sets `scale` and moves the view so that world point (ax, ay) is under client point (cx, cy). */
  anchor(f: Frame, ax: number, ay: number, cx: number, cy: number, scale: number): void {
    const s = clamp(scale, 1, MAX_SCALE)
    // At scale 1 the view belongs to the camera: a pan holds nothing, a pinch back out returns to the camera.
    if (s === 1) {
      if (!this.following) this.back()
      return
    }
    const base = this.hold()
    this.anim = null
    this.changed = true
    this.shown = this.within(base, s, ax - (cx - f.left) / (f.k * s), ay - (cy - f.top) / (f.k * s))
    this.setZoom(s)
  }

  /** Animated zoom to `scale` keeping world point (ax, ay) in place. */
  zoomTo(scale: number, ax: number, ay: number): void {
    const base = this.hold()
    const s = clamp(scale, 1, MAX_SCALE)
    const r = this.zoom / s
    this.anim = { from: { ...this.shown }, to: this.within(base, s, ax - (ax - this.shown.x) * r, ay - (ay - this.shown.y) * r), start: performance.now() }
    this.setZoom(s)
  }

  /** Eases back to the camera's shot. */
  back(): void {
    if (this.following) return
    this.anim = { from: { ...this.shown }, to: 'camera', start: performance.now() }
    this.setZoom(1)
  }

  /** The held shot, held from now on if the view was following the camera. */
  private hold(): Rect {
    if (!this.base) this.base = { ...this.shown }
    return this.base
  }

  /** The view of `base` at scale s with its top-left near (x, y), kept inside the shot. */
  private within(base: Rect, s: number, x: number, y: number): Rect {
    const w = base.w / s
    const h = base.h / s
    return { x: clamp(x, base.x, base.x + base.w - w), y: clamp(y, base.y, base.y + base.h - h), w, h }
  }

  private setZoom(s: number): void {
    if (s === this.zoom) return
    this.zoom = s
    this.onScale(s)
  }
}

/** Darkness 0–1 of the dip around the cuts (the keys after a 'step' key) at time t. */
export function cutDip(film: CartoonFilm, t: number): number {
  const s = loopTime(t, film.period)
  const keys = film.camera
  let dip = 0
  keys.forEach((k, i) => {
    if (keys[(i - 1 + keys.length) % keys.length].ease !== 'step') return
    const d = Math.abs(s - k.t)
    const near = Math.min(d, film.period - d)
    dip = Math.max(dip, 1 - near / CUT_DIP_S)
  })
  return Math.max(0, Math.min(1, ease('inOut', dip)))
}

/**
 * Over each picture, in world units at the camera's place: a soft vignette and the dip of a cut, and the clip that
 * keeps the world to the camera's frame (a screen of another shape than the frame shows an empty margin, as on
 * other levels, not more of the world under no vignette).
 */
interface Overlay {
  group: SVGGElement
  vignette: SVGRectElement
  dip: SVGRectElement
  frame: SVGRectElement
}

function overlay(svg: SVGSVGElement, content: SVGGElement, id: string): Overlay {
  const make = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>) => {
    const node = document.createElementNS(SVG_NS, tag)
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v))
    return node
  }
  const group = make('g', { 'pointer-events': 'none' })
  const defs = make('defs', {})
  const gradient = make('radialGradient', { id, cx: 0.5, cy: 0.5, r: 0.75 })
  gradient.append(
    make('stop', { offset: 0.6, 'stop-color': '#1b1030', 'stop-opacity': 0 }),
    make('stop', { offset: 1, 'stop-color': '#1b1030', 'stop-opacity': 0.42 }),
  )
  const clip = make('clipPath', { id: `${id}-frame` })
  const frame = make('rect', {})
  clip.append(frame)
  defs.append(gradient, clip)
  content.setAttribute('clip-path', `url(#${id}-frame)`)
  const vignette = make('rect', { fill: `url(#${id})` })
  const dip = make('rect', { fill: '#0d0816', opacity: 0 })
  group.append(defs, vignette, dip)
  svg.append(group)
  return { group, vignette, dip, frame }
}

/**
 * Pictures A and B of a cartoon in `container`: posed by the story's clock, framed by its camera, taps turned into
 * hits (zone index) or misses (-1) for `onTap`. The player may zoom and pan as on other levels (`CameraZoom`).
 */
export class CartoonBoard {
  private readonly level: Level
  private readonly film: CartoonFilm
  private readonly onTap: (hit: number, tap: Tap) => void
  private readonly pictures: Picture[]
  private readonly overlays: Overlay[]
  private readonly gestures: Gestures
  private readonly zoom: CameraZoom
  private readonly onSecret?: (tap: Tap) => void
  /** A miss waits DOUBLE_TAP_MS: if it turns out to be the first tap of a double tap, it is dropped. */
  private pendingMiss: { timer: number; tap: Tap } | null = null
  private secretLeft: boolean
  private time = 0
  private hinted = -1
  /** World units per frame unit now: miss marks keep their size on screen. */
  private scale = 1
  private readonly rate = new PoseRate()
  /** When the story and camera were last posed (`performance.now()`). */
  private posedAt = -Infinity
  /** Width / height of a picture on screen (both are the same size). */
  private box = 0
  private readonly resize: ResizeObserver

  constructor(container: HTMLElement, level: Level, onTap: (hit: number, tap: Tap) => void, options: BoardOptions = {}) {
    this.level = level
    this.film = level.cartoon!
    this.onTap = onTap
    this.onSecret = options.onSecret
    this.pictures = ([0, 1] as const).map((v) => createPicture(level, v, 'none', options.extras))
    this.overlays = this.pictures.map((p, i) => overlay(p.svg, p.marks.parentElement as unknown as SVGGElement, `ke-cartoon-${level.id}-${i}`))
    this.secretLeft = !!level.secret && !options.secretTaken
    if (level.secret && !this.secretLeft) for (const p of this.pictures) takeSecret(p, level.secret, false)
    const svgs = this.pictures.map((p) => p.svg)
    this.zoom = new CameraZoom((s) => options.onZoom?.(s))
    this.gestures = new Gestures(container, svgs, this.zoom, {
      onTap: (svg, x, y) => this.tap(svgs.indexOf(svg) as 0 | 1, x, y),
      onDoubleTap: (svg, x, y) => this.doubleTap(svgs.indexOf(svg) as 0 | 1, x, y),
    })
    this.pose(0, performance.now())
    this.resize = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      this.box = height > 0 ? width / height : 0
    })
    this.resize.observe(svgs[0])
    container.dir = 'ltr'
    for (const svg of svgs) container.append(svg)
  }

  /** The story always moves. */
  get animated(): boolean {
    return true
  }

  get zooming(): boolean {
    return this.zoom.animating
  }

  /** How many times the story has been posed (the developer's frame meter). */
  get poses(): number {
    return this.pictures[0].poses
  }

  get hinting(): boolean {
    return this.hinted >= 0
  }

  /** Poses the story at time t and points the camera. */
  pose(t: number, now: number): void {
    this.time = t
    const cam = this.zoom.step(now, fitCamera(cameraAt(this.film, t), this.box, this.level.viewBox))
    // The story and its camera at their pace (each redraws the whole picture); a zoom under the fingers at once.
    const due = this.rate.due(now, this.posedAt)
    if (!due && !this.zoom.animating && !this.zoom.takeChange()) return
    if (due) this.posedAt = now
    // A zoomed-in view holds its shot: the camera's cuts do not dip it.
    const dip = this.zoom.following ? cutDip(this.film, t) : 0
    this.scale = this.film.frame.w / cam.w
    const box = `${cam.x} ${cam.y} ${cam.w} ${cam.h}`
    this.pictures.forEach((p, i) => {
      if (due) animatePicture(p, this.level.differences, t, 0)
      p.svg.setAttribute('viewBox', box)
      const o = this.overlays[i]
      for (const r of [o.vignette, o.dip, o.frame]) {
        r.setAttribute('x', String(cam.x))
        r.setAttribute('y', String(cam.y))
        r.setAttribute('width', String(cam.w))
        r.setAttribute('height', String(cam.h))
      }
      o.dip.setAttribute('opacity', String(dip))
    })
  }

  markFound(index: number, color?: string): boolean {
    for (const p of this.pictures) addFoundMark(p, index, this.zone(p, index), color)
    if (index !== this.hinted) return false
    this.clearHint()
    return true
  }

  markMiss({ picture, x, y }: Omit<Tap, 'time'>): void {
    addMissMark(this.pictures[picture], x, y, this.scale)
  }

  showHint(index: number): void {
    const r = this.level.differences[index].r
    const angle = Math.random() * 2 * Math.PI
    const shift = r * (HINT_SCALE - 1) * 0.7 * Math.random()
    this.clearHint()
    for (const p of this.pictures) addHintMark(p, index, this.zone(p, index), Math.cos(angle) * shift, Math.sin(angle) * shift)
    this.hinted = index
  }

  clearHint(): void {
    for (const p of this.pictures) removeHintMarks(p)
    this.hinted = -1
  }

  reveal(found: boolean[]): void {
    for (const p of this.pictures) found.forEach((f, i) => f || addRevealMark(p, i, this.zone(p, i)))
  }

  takeSecret(): void {
    if (!this.level.secret || !this.secretLeft) return
    this.secretLeft = false
    for (const p of this.pictures) takeSecret(p, this.level.secret, true)
  }

  /** Back from the player's zoom to the story's camera. */
  resetZoom(): void {
    this.zoom.back()
  }

  /** Cartoons are never mirrored or turned. */
  setTransformB(): void {}

  destroy(): void {
    if (this.pendingMiss) clearTimeout(this.pendingMiss.timer)
    this.resize.disconnect()
    this.gestures.destroy()
    for (const p of this.pictures) p.svg.remove()
  }

  private zone(p: Picture, index: number) {
    return zonesAt(p, this.level.differences, this.time)[index]
  }

  /** World point of a client point, or null outside the shown part. */
  private worldPoint(picture: 0 | 1, clientX: number, clientY: number) {
    const svg = this.pictures[picture].svg
    const pt = toViewBox(svg, clientX, clientY)
    const vb = svg.viewBox.baseVal
    if (!pt || pt.x < vb.x || pt.y < vb.y || pt.x > vb.x + vb.width || pt.y > vb.y + vb.height) return null
    return pt
  }

  private doubleTap(picture: 0 | 1, clientX: number, clientY: number): void {
    if (this.pendingMiss) {
      clearTimeout(this.pendingMiss.timer)
      this.pendingMiss = null
    }
    const pt = this.worldPoint(picture, clientX, clientY)
    if (this.zoom.scale > 1) this.zoom.back()
    else if (pt) this.zoom.zoomTo(DOUBLE_TAP_SCALE, pt.x, pt.y)
  }

  private commitMiss(): void {
    const miss = this.pendingMiss
    if (!miss) return
    clearTimeout(miss.timer)
    this.pendingMiss = null
    this.onTap(-1, miss.tap)
  }

  private tap(picture: 0 | 1, clientX: number, clientY: number): void {
    this.commitMiss()
    const pt = this.worldPoint(picture, clientX, clientY)
    if (!pt) return
    const tap: Tap = { picture, x: pt.x, y: pt.y, time: performance.now() }
    const hit = hitTest(tapZonesAt(this.pictures[picture], this.level.differences, this.time), tap.x, tap.y)
    const secret = this.level.secret
    if (hit < 0 && secret && this.secretLeft && hitTest([secret], tap.x, tap.y) === 0) {
      this.onSecret?.(tap)
      return
    }
    if (hit < 0) {
      this.pendingMiss = { timer: window.setTimeout(() => this.commitMiss(), DOUBLE_TAP_MS), tap }
      return
    }
    this.onTap(hit, tap)
  }
}
