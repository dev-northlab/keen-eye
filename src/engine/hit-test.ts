import type { HitShape } from './types.ts'

// Hit testing of the "find the odd one out" mode (useHitTest of docs/anachronism-mode.md): pure
// functions from a screen point to percent of the image, and from there to a hitbox.

/** Hitboxes are this much larger than the item: a near tap on a small item still counts. */
export const HIT_MARGIN = 0.2

/** Client-space rectangle of the picture element (getBoundingClientRect). */
export interface Box {
  left: number
  top: number
  width: number
  height: number
}

/** Visible part of the image in image pixels: the svg viewBox, which zoom and pan change. */
export interface ViewWindow {
  x: number
  y: number
  w: number
  h: number
}

/**
 * Image point in percent (0–100) under client point (cx, cy). The visible part `view` of an image
 * of `size` pixels is fitted into `box` keeping its proportions and centered (svg
 * preserveAspectRatio "xMidYMid meet"). null in the empty bands around the picture.
 */
export function clientToPercent(
  cx: number,
  cy: number,
  box: Box,
  view: ViewWindow,
  size: { w: number; h: number },
): { x: number; y: number } | null {
  const k = Math.min(box.width / view.w, box.height / view.h)
  if (!(k > 0)) return null
  const x = view.x + (cx - box.left - (box.width - view.w * k) / 2) / k
  const y = view.y + (cy - box.top - (box.height - view.h * k) / 2) / k
  if (x < view.x || y < view.y || x > view.x + view.w || y > view.y + view.h) return null
  return { x: (x / size.w) * 100, y: (y / size.h) * 100 }
}

/**
 * Whether image point (x, y) in percent is inside `s` grown by `margin` (a circle's radius, a
 * rectangle's width and height around its center). `aspect` = image width / height.
 */
export function hitsShape(s: HitShape, x: number, y: number, aspect: number, margin = HIT_MARGIN): boolean {
  const g = 1 + margin
  if (s.shape === 'circle') {
    // Percent of the height → percent of the width, where the radius is measured.
    const dy = (y - s.y) / aspect
    return (x - s.x) ** 2 + dy ** 2 <= (s.r * g) ** 2
  }
  return Math.abs(x - (s.x + s.w / 2)) <= (s.w * g) / 2 && Math.abs(y - (s.y + s.h / 2)) <= (s.h * g) / 2
}

/** Index of the first shape hit at image point (x, y) in percent, or -1. */
export function hitItem(shapes: HitShape[], x: number, y: number, aspect: number, margin = HIT_MARGIN): number {
  return shapes.findIndex((s) => hitsShape(s, x, y, aspect, margin))
}

/**
 * Circle around `s` in image pixels, grown by `margin`: where its marks are drawn, and a bound
 * of its hitbox (for the overlap check).
 */
export function shapeCircle(s: HitShape, size: { w: number; h: number }, margin = 0) {
  const g = 1 + margin
  if (s.shape === 'circle') return { x: (s.x * size.w) / 100, y: (s.y * size.h) / 100, r: (s.r * size.w * g) / 100 }
  const w = (s.w * size.w) / 100
  const h = (s.h * size.h) / 100
  return { x: (s.x * size.w) / 100 + w / 2, y: (s.y * size.h) / 100 + h / 2, r: (Math.hypot(w, h) / 2) * g }
}
