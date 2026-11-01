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
  /** Found marks by difference index. */
  foundMarks: Map<number, SVGCircleElement>
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
    foundMarks: new Map(),
  }
}

/** Zones of a picture at animation time t (animated zones follow their objects). */
export function zonesAt(p: Picture, differences: Difference[], t: number) {
  return differences.map((d) => ({ ...zoneCenter(d, p.animations, t), r: d.r }))
}

/** Applies animation poses and moves found marks of moving zones. */
export function animatePicture(p: Picture, differences: Difference[], t: number): void {
  for (const { el, animation } of p.animated) {
    const { matrix, opacity, fill } = pose(animation, t)
    if (matrix) el.setAttribute('transform', `matrix(${matrix.join(' ')})`)
    if (opacity !== undefined) el.setAttribute('opacity', String(opacity))
    if (fill) el.setAttribute('fill', fill)
  }
  for (const [i, mark] of p.foundMarks) {
    if (differences[i].animatedId === undefined) continue
    const c = zoneCenter(differences[i], p.animations, t)
    mark.setAttribute('cx', String(c.x))
    mark.setAttribute('cy', String(c.y))
  }
}

/** Converts client (screen) coordinates to the picture's viewBox coordinates. */
export function toViewBox(svg: SVGSVGElement, clientX: number, clientY: number) {
  const ctm = svg.getScreenCTM()
  if (!ctm) return null
  return new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse())
}

export function addFoundMark(p: Picture, index: number, zone: { x: number; y: number; r: number }): void {
  const mark = el('circle', {
    cx: zone.x,
    cy: zone.y,
    r: zone.r,
    fill: 'none',
    stroke: '#22c55e',
    'stroke-width': 4,
    'vector-effect': 'non-scaling-stroke',
  })
  p.foundMarks.set(index, mark)
  p.marks.append(mark)
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
