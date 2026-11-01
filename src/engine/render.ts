import { pose, zoneCenter } from './animation.ts'
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

export function createPicture(level: Level, variant: 0 | 1): Picture {
  const { w, h } = level.viewBox
  const svg = el('svg', { viewBox: `0 0 ${w} ${h}`, class: 'ke-picture' })
  svg.style.userSelect = 'none'

  const scene = el('g', {})
  let animations: Animation[] = []
  if (level.kind === 'svg' && level.build) {
    const built = level.build(variant)
    scene.innerHTML = built.svg
    animations = built.animations
  } else {
    const href = variant === 0 ? level.imageA : level.imageB
    if (href) scene.append(el('image', { href, width: w, height: h }))
  }

  const byKey = new Map(animations.map((a) => [a.key, a]))
  const animated = [...scene.querySelectorAll<SVGGElement>('[data-anim]')].flatMap((g) => {
    const animation = byKey.get(g.dataset.anim!)
    return animation ? [{ el: g, animation }] : []
  })

  const marks = el('g', { 'pointer-events': 'none' })
  svg.append(scene, marks)
  return {
    svg,
    marks,
    animated,
    animations: new Map(animations.map((a) => [a.id, a])),
    zoneMarks: [],
  }
}

/** Zones of a picture at animation time t (animated zones follow their objects). */
export function zonesAt(p: Picture, differences: Difference[], t: number) {
  return differences.map((d) => ({ ...zoneCenter(d, p.animations, t), r: d.r }))
}

/** Applies animation poses and moves the marks of moving zones. */
export function animatePicture(p: Picture, differences: Difference[], t: number): void {
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

export function addFoundMark(p: Picture, index: number, zone: Zone): void {
  addZoneMark(p, index, zone, { r: zone.r, stroke: '#22c55e', 'stroke-width': 4 })
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
