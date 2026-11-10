import { pose, zoneCenter } from './animation.ts'
import { svgTransform, type PictureTransform, type Size } from './transform.ts'
import type { Animation, Difference, Level } from './types.ts'

const SVG_NS = 'http://www.w3.org/2000/svg'

export interface Picture {
  svg: SVGSVGElement
  marks: SVGGElement
  /** Animated groups of this picture and their animations. */
  animated: { el: SVGGElement; animation: Animation }[]
  /** Animations by id, for zones that follow animated objects. */
  animations: Map<string, Animation>
  /** Marks (found circles, hint) that stay on a difference zone; moved along with moving zones. */
  zoneMarks: ZoneMark[]
  /** Animation time of the poses drawn now (NaN before the first) and when they were drawn (`performance.now()`). */
  posedT: number
  posedAt: number
}

interface ZoneMark {
  el: SVGCircleElement
  index: number
  /** Offset of the mark center from the zone center. */
  dx: number
  dy: number
}

function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>) {
  const node = document.createElementNS(SVG_NS, tag)
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v))
  return node
}

/**
 * `transform` mirrors or turns the content inside the svg (picture B of late levels, the far player's copy
 * in a face-to-face duel); marks are drawn in scene coordinates inside it, so they turn along. The viewBox
 * (zoom) is in shown coordinates, so the board turns tap points back itself. `extras`: with the extra
 * objects of normal mode (`Level.extras`).
 */
export function createPicture(level: Level, variant: 0 | 1, transform: PictureTransform = 'none', extras = false): Picture {
  const { w, h } = level.viewBox
  const svg = el('svg', { viewBox: `0 0 ${w} ${h}`, class: 'ke-picture' })
  svg.style.userSelect = 'none'
  // Scene and marks in one group that carries the turn, so it can change while the level is played.
  const content = el('g', {})

  const scene = el('g', {})
  let animations: Animation[] = []
  /** A pixel picture still downloading: a spinner in its place, over everything, until it has loaded. */
  let loader: SVGGElement | undefined
  if (level.kind === 'svg' && level.build) {
    const built = level.build(variant, variant, extras)
    scene.innerHTML = built.svg
    animations = built.animations
  } else {
    const href = variant === 0 ? level.imageA : level.imageB
    if (href) {
      const image = el('image', { href: import.meta.env.BASE_URL + href, width: w, height: h })
      scene.append(image)
      loader = loadingSpinner(w, h)
      const done = () => loader?.remove()
      image.addEventListener('load', done, { once: true })
      image.addEventListener('error', done, { once: true })
    }
    // The key as its own layer (the pictures are drawn without it), taken off like a drawn scene's key.
    const key = level.secret?.image
    if (key && (level.secret?.on === 'both' || variant === 1)) {
      const group = el('g', { 'data-secret': '' })
      group.append(el('image', { href: import.meta.env.BASE_URL + key.href, x: key.x, y: key.y, width: key.w, height: key.h }))
      scene.append(group)
    }
  }

  const marks = el('g', { 'pointer-events': 'none' })
  content.append(scene, marks)
  svg.append(content)
  if (loader) svg.append(loader)
  const picture: Picture = {
    svg,
    marks,
    animated: animatedGroups(scene, animations),
    animations: new Map(animations.map((a) => [a.id, a])),
    zoneMarks: [],
    posedT: NaN,
    posedAt: -Infinity,
  }
  turnPicture(picture, transform, level.viewBox)
  return picture
}

/**
 * The place of a pixel picture while it downloads (the 3D pictures are large): a soft panel with a turning ring in
 * the middle, in the UI's colour tokens, drawn in the picture's own w × h units. SMIL turns it, no script needed.
 */
function loadingSpinner(w: number, h: number): SVGGElement {
  const r = Math.min(w, h) * 0.06
  const g = el('g', { 'pointer-events': 'none' })
  const panel = el('rect', { width: w, height: h })
  panel.style.fill = 'var(--soft)'
  const track = el('circle', { cx: w / 2, cy: h / 2, r, fill: 'none', 'stroke-width': r * 0.24, 'stroke-opacity': 0.25 })
  track.style.stroke = 'var(--muted)'
  const arc = el('circle', {
    cx: w / 2,
    cy: h / 2,
    r,
    fill: 'none',
    'stroke-width': r * 0.24,
    'stroke-linecap': 'round',
    'stroke-dasharray': `${r * 1.6} ${r * 5}`,
  })
  arc.style.stroke = 'var(--accent)'
  arc.append(el('animateTransform', { attributeName: 'transform', type: 'rotate', from: `0 ${w / 2} ${h / 2}`, to: `360 ${w / 2} ${h / 2}`, dur: '0.9s', repeatCount: 'indefinite' }))
  g.append(panel, track, arc)
  return g
}

/** Shows a picture of `createPicture` another way: its scene and marks turn together (the viewBox is the zoom's). */
export function turnPicture(p: Picture, transform: PictureTransform, size: Size): void {
  const content = p.marks.parentElement!
  const turn = svgTransform(transform, size)
  if (turn) content.setAttribute('transform', turn)
  else content.removeAttribute('transform')
}

/**
 * A single picture from the source of an SVG file (the "find the odd one out" mode), viewBox = its
 * w × h pixels; its `data-anim` groups move with `animations`. The files are the app's own assets.
 */
export function createSvgPicture(source: string, w: number, h: number, animations: Animation[]): Picture {
  const svg = el('svg', { viewBox: `0 0 ${w} ${h}`, class: 'ke-picture' })
  svg.style.userSelect = 'none'
  const scene = el('g', {})
  const file = new DOMParser().parseFromString(source, 'image/svg+xml').documentElement
  scene.append(...[...file.childNodes].map((n) => document.importNode(n, true)))
  const marks = el('g', { 'pointer-events': 'none' })
  svg.append(scene, marks)
  return {
    svg,
    marks,
    animated: animatedGroups(scene, animations),
    animations: new Map(animations.map((a) => [a.id, a])),
    zoneMarks: [],
    posedT: NaN,
    posedAt: -Infinity,
  }
}

/** The `data-anim` groups of a scene that have an animation (matched by key). */
function animatedGroups(scene: SVGGElement, animations: Animation[]) {
  const byKey = new Map(animations.map((a) => [a.key, a]))
  return [...scene.querySelectorAll<SVGGElement>('[data-anim]')].flatMap((g) => {
    const animation = byKey.get(g.dataset.anim!)
    return animation ? [{ el: g, animation }] : []
  })
}

/** Zones of a picture at animation time t (animated zones follow their objects). */
export function zonesAt(p: Picture, differences: Difference[], t: number) {
  return differences.map((d) => ({ ...zoneCenter(d, p.animations, t), r: d.r }))
}

/**
 * Phones with little memory (Android Go, ≤ 2 GB; `navigator.deviceMemory`, Chromium only) cannot redraw
 * animated pictures 60 times a second: there the poses change on every other frame of a 60 Hz screen (~30 fps).
 * The threshold sits between one and two frames, so frame jitter does not drop it to every third.
 */
const MIN_POSE_INTERVAL_MS = lowMemoryDevice() ? 25 : 0

function lowMemoryDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  return memory !== undefined && memory <= 2
}

/**
 * Applies animation poses and moves the marks of moving zones. Does nothing when time stands still
 * (paused, "stop motion") or, on a low-memory phone, when the last poses are too recent.
 */
export function animatePicture(p: Picture, differences: Difference[], t: number): void {
  const now = performance.now()
  if (t === p.posedT || now - p.posedAt < MIN_POSE_INTERVAL_MS) return
  p.posedT = t
  p.posedAt = now
  for (const { el, animation } of p.animated) {
    const { matrix, opacity, fill } = pose(animation, t)
    if (matrix) el.setAttribute('transform', `matrix(${matrix.join(' ')})`)
    if (opacity !== undefined) el.setAttribute('opacity', String(opacity))
    if (fill) el.setAttribute('fill', fill)
  }
  for (const m of p.zoneMarks) {
    if (differences[m.index].animatedId === undefined) continue
    const c = zoneCenter(differences[m.index], p.animations, t)
    m.el.setAttribute('cx', String(c.x + m.dx))
    m.el.setAttribute('cy', String(c.y + m.dy))
  }
}

/** Converts client (screen) coordinates to the picture's viewBox coordinates. */
export function toViewBox(svg: SVGSVGElement, clientX: number, clientY: number) {
  const ctm = svg.getScreenCTM()
  if (!ctm) return null
  return new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse())
}

type Zone = { x: number; y: number; r: number }

function addZoneMark(p: Picture, index: number, zone: Zone, attrs: Record<string, string | number>, dx = 0, dy = 0) {
  const mark = el('circle', {
    cx: zone.x + dx,
    cy: zone.y + dy,
    fill: 'none',
    'vector-effect': 'non-scaling-stroke',
    ...attrs,
  })
  p.zoneMarks.push({ el: mark, index, dx, dy })
  p.marks.append(mark)
  return mark
}

/** Scales and turns around its own center when animated (CSS px of a transform are user units here). */
function centered<T extends SVGElement>(node: T): T {
  node.style.transformBox = 'fill-box'
  node.style.transformOrigin = 'center'
  return node
}

/** Plays a short-lived decoration of a mark and removes it when done. */
function flash(p: Picture, node: SVGElement, keyframes: Keyframe[], options: KeyframeAnimationOptions): void {
  p.marks.append(centered(node))
  const remove = () => node.remove()
  node.animate(keyframes, { fill: 'backwards', ...options }).finished.then(remove, remove)
}

const SPARKS = 10
const SPARK_GOLD = '#facc15'

/**
 * Green by default; in a match, the color of the player who found it. The circle springs open from the
 * center with a thick stroke that thins down, a glow and a wave spread out of it and sparks fly off.
 * `still` ("reduce motion"): the circle only fades in.
 */
export function addFoundMark(p: Picture, index: number, zone: Zone, color = '#22c55e', still = false): void {
  const mark = centered(addZoneMark(p, index, zone, { r: zone.r, stroke: color, 'stroke-width': 4 }))
  if (still) {
    mark.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250 })
    return
  }
  mark.animate(
    [
      { transform: 'scale(0.2)', strokeWidth: 12, opacity: 0 },
      { transform: 'scale(1.18)', strokeWidth: 8, opacity: 1, offset: 0.45 },
      { transform: 'scale(0.94)', strokeWidth: 5, offset: 0.7 },
      { transform: 'scale(1)', strokeWidth: 4 },
    ],
    { duration: 600, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  )
  const { x, y, r } = zone
  // Soft glow filling the circle.
  flash(
    p,
    el('circle', { cx: x, cy: y, r, fill: color, 'fill-opacity': 0.35 }),
    [
      { transform: 'scale(0.3)', opacity: 1 },
      { transform: 'scale(1.05)', opacity: 0 },
    ],
    { duration: 550, easing: 'ease-out' },
  )
  // A wave running out of the circle.
  flash(
    p,
    el('circle', { cx: x, cy: y, r, fill: 'none', stroke: color, 'vector-effect': 'non-scaling-stroke' }),
    [
      { transform: 'scale(1)', strokeWidth: 6, opacity: 0.9 },
      { transform: 'scale(1.75)', strokeWidth: 1, opacity: 0 },
    ],
    { duration: 700, delay: 120, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  )
  // Sparks flying off the rim, every other one golden.
  const turn = Math.random() * 2 * Math.PI
  const size = Math.max(4, r * 0.13)
  for (let i = 0; i < SPARKS; i++) {
    const a = turn + (i / SPARKS) * 2 * Math.PI
    const far = r * (i % 2 ? 1.55 : 1.85)
    const [cos, sin] = [Math.cos(a), Math.sin(a)]
    flash(
      p,
      el('circle', { cx: x, cy: y, r: size, fill: i % 2 ? SPARK_GOLD : color }),
      [
        { transform: `translate(${cos * r * 0.7}px, ${sin * r * 0.7}px) scale(0.4)`, opacity: 0 },
        { transform: `translate(${cos * r * 1.05}px, ${sin * r * 1.05}px) scale(1.3)`, opacity: 1, offset: 0.3 },
        { transform: `translate(${cos * far}px, ${sin * far}px) scale(0)`, opacity: 0.6 },
      ],
      { duration: 650, delay: 60 + (i % 3) * 25, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)' },
    )
  }
}

/** Development tool: red circle exactly on the zone (drawn under a later found mark). */
export function addRevealMark(p: Picture, index: number, zone: Zone): void {
  addZoneMark(p, index, zone, { r: zone.r, stroke: '#ef4444', 'stroke-width': 3 })
}

/** Dashed circle of radius r·HINT_SCALE around the zone; (dx, dy) shifts it so the zone is not at its center. */
export const HINT_SCALE = 2.2

export function addHintMark(p: Picture, index: number, zone: Zone, dx: number, dy: number): void {
  const mark = addZoneMark(
    p,
    index,
    zone,
    { r: zone.r * HINT_SCALE, stroke: '#ff7a00', 'stroke-width': 3, 'stroke-dasharray': '10 7', class: 'ke-hint' },
    dx,
    dy,
  )
  mark.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 })
}

export function removeHintMarks(p: Picture): void {
  p.zoneMarks = p.zoneMarks.filter((m) => {
    if (!m.el.classList.contains('ke-hint')) return true
    m.el.remove()
    return false
  })
}

/** `scale` is the current zoom: the cross keeps the same size on screen. */
export function addMissMark(p: Picture, x: number, y: number, scale: number): void {
  const s = 14 / scale
  const cross = el('path', {
    d: `M${x - s} ${y - s}L${x + s} ${y + s}M${x + s} ${y - s}L${x - s} ${y + s}`,
    stroke: '#ef4444',
    'stroke-width': 4,
    'stroke-linecap': 'round',
    'vector-effect': 'non-scaling-stroke',
  })
  p.marks.append(cross)
  cross
    .animate([{ opacity: 1 }, { opacity: 1, offset: 0.5 }, { opacity: 0 }], { duration: 700 })
    .finished.then(() => cross.remove(), () => cross.remove())
}

/**
 * Takes the hidden key off the picture. `animate`: it grows with a golden shine, rises and fades out
 * (the key just found); otherwise it is gone at once (collected on an earlier visit).
 */
export function takeSecret(p: Picture, secret: Zone, animate: boolean): void {
  const key = p.svg.querySelector<SVGGElement>('[data-secret]')
  if (!key) return
  if (!animate) {
    key.remove()
    return
  }
  const shine = el('circle', { cx: secret.x, cy: secret.y, r: secret.r, fill: '#ffe27a', 'fill-opacity': 0.75 })
  p.marks.append(shine)
  shine.style.transformBox = 'fill-box'
  shine.style.transformOrigin = 'center'
  shine
    .animate([{ transform: 'scale(0.3)', opacity: 1 }, { transform: 'scale(2.2)', opacity: 0 }], { duration: 700, easing: 'ease-out' })
    .finished.then(() => shine.remove(), () => shine.remove())
  // The key's own transform places it; the animation scales and lifts the wrapping group.
  const wrap = el('g', {})
  key.replaceWith(wrap)
  wrap.append(key)
  wrap.style.transformBox = 'fill-box'
  wrap.style.transformOrigin = 'center'
  wrap
    .animate(
      [
        { transform: 'translateY(0) scale(1)', opacity: 1 },
        { transform: 'translateY(-6px) scale(1.8)', opacity: 1, offset: 0.35 },
        { transform: `translateY(-${secret.r * 4}px) scale(1.2)`, opacity: 0 },
      ],
      { duration: 900, easing: 'ease-in' },
    )
    .finished.then(() => wrap.remove(), () => wrap.remove())
}
