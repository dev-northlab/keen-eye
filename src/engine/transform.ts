// How a picture is shown (docs/mirror-rotate-feature.md): picture B of late levels is mirrored or
// turned by 180° at display time; the level's coordinates (zones, key, traps) stay in the scene's own
// system, and taps are turned back. DOM-free, so it is unit-tested in Node.

/**
 * Display transform of a picture. Only those that keep the picture's proportions: the levels are
 * 800×500, so the 90° turns of the spec (square pictures only) are left out.
 */
export type PictureTransform = 'none' | 'mirror-x' | 'mirror-y' | 'rotate-180'

export const PICTURE_TRANSFORMS: PictureTransform[] = ['none', 'mirror-x', 'mirror-y', 'rotate-180']

/** Each transform as flips of the axes: rotate-180 flips both. */
const FLIPS: Record<PictureTransform, { x: boolean; y: boolean }> = {
  none: { x: false, y: false },
  'mirror-x': { x: true, y: false },
  'mirror-y': { x: false, y: true },
  'rotate-180': { x: true, y: true },
}

const byFlips = (x: boolean, y: boolean): PictureTransform =>
  PICTURE_TRANSFORMS.find((t) => FLIPS[t].x === x && FLIPS[t].y === y)!

export interface Size {
  w: number
  h: number
}

export interface Point {
  x: number
  y: number
}

export interface Rect extends Point {
  w: number
  h: number
}

/** Where scene point p of a w × h picture is shown. */
export function transformPoint(t: PictureTransform, p: Point, size: Size): Point {
  const f = FLIPS[t]
  return { x: f.x ? size.w - p.x : p.x, y: f.y ? size.h - p.y : p.y }
}

/** Scene point shown at p (a tap): the inverse of `transformPoint`. Every flip is its own inverse. */
export function inverseTransformPoint(t: PictureTransform, p: Point, size: Size): Point {
  return transformPoint(t, p, size)
}

/** Where a scene rectangle is shown (the zoomed view); flips keep it axis-aligned. Its own inverse too. */
export function transformRect(t: PictureTransform, r: Rect, size: Size): Rect {
  const f = FLIPS[t]
  return { x: f.x ? size.w - r.x - r.w : r.x, y: f.y ? size.h - r.y - r.h : r.y, w: r.w, h: r.h }
}

/** `a` and then `b` (the far player's turned copy of a mirrored picture B). */
export function combineTransforms(a: PictureTransform, b: PictureTransform): PictureTransform {
  return byFlips(FLIPS[a].x !== FLIPS[b].x, FLIPS[a].y !== FLIPS[b].y)
}

/** SVG `transform` attribute that shows a w × h scene this way, or null for 'none'. */
export function svgTransform(t: PictureTransform, size: Size): string | null {
  const f = FLIPS[t]
  if (!f.x && !f.y) return null
  return `matrix(${f.x ? -1 : 1} 0 0 ${f.y ? -1 : 1} ${f.x ? size.w : 0} ${f.y ? size.h : 0})`
}
