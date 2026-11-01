// Animation math: poses of animated objects at time t. No DOM, so the level validator can use it in Node.
import type { Animation, Difference } from './types.ts'

/** SVG matrix(a b c d e f): x' = a·x + c·y + e, y' = b·x + d·y + f. */
export type Matrix = [number, number, number, number, number, number]

export interface Pose {
  matrix?: Matrix
  opacity?: number
  fill?: string
}

/** Position within the current cycle, 0–1. Same t in both pictures keeps them in sync. */
function cycle(a: Animation, t: number): number {
  const tau = (a.reverse ? -t : t) / a.period + (a.phase ?? 0)
  return tau - Math.floor(tau)
}

function rotation(deg: number, [px, py]: [number, number]): Matrix {
  const rad = (deg * Math.PI) / 180
  const c = Math.cos(rad)
  const s = Math.sin(rad)
  return [c, s, -s, c, px - c * px + s * py, py - s * px - c * py]
}

/** Point at fraction u of a closed polyline, and the x direction of its segment. */
function alongPath(points: [number, number][], u: number) {
  const n = points.length
  const seg = points.map((p, i) => Math.hypot(points[(i + 1) % n][0] - p[0], points[(i + 1) % n][1] - p[1]))
  const total = seg.reduce((s, l) => s + l, 0)
  if (total === 0) return { x: points[0][0], y: points[0][1], dx: 0 }
  let d = u * total
  for (let i = 0; i < n; i++) {
    if (d <= seg[i] || i === n - 1) {
      const [x0, y0] = points[i]
      const [x1, y1] = points[(i + 1) % n]
      const f = seg[i] === 0 ? 0 : Math.min(d / seg[i], 1)
      return { x: x0 + (x1 - x0) * f, y: y0 + (y1 - y0) * f, dx: x1 - x0 }
    }
    d -= seg[i]
  }
  return { x: 0, y: 0, dx: 0 }
}

const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))

function mixColors(colors: string[], u: number): string {
  const k = u * colors.length
  const i = Math.floor(k) % colors.length
  const f = k - Math.floor(k)
  const a = hex(colors[i])
  const b = hex(colors[(i + 1) % colors.length])
  return `rgb(${a.map((v, j) => Math.round(v + (b[j] - v) * f)).join(' ')})`
}

export function pose(a: Animation, t: number): Pose {
  const u = cycle(a, t)
  const wave = Math.sin(2 * Math.PI * u)
  switch (a.type) {
    case 'path': {
      const p = alongPath(a.points, u)
      if (a.flipX !== undefined && p.dx < 0) return { matrix: [-1, 0, 0, 1, 2 * a.flipX + p.x, p.y] }
      return { matrix: [1, 0, 0, 1, p.x, p.y] }
    }
    case 'bob':
      return { matrix: [1, 0, 0, 1, a.dx * wave, a.dy * wave] }
    case 'sway':
      return { matrix: rotation(a.angle * wave, a.pivot) }
    case 'rotate':
      return { matrix: rotation(360 * u, a.pivot) }
    case 'blink':
      return { opacity: u < (a.duty ?? 0.5) ? 1 : 0 }
    case 'color':
      return { fill: mixColors(a.colors, u) }
  }
}

export function transformPoint([a, b, c, d, e, f]: Matrix, x: number, y: number) {
  return { x: a * x + c * y + e, y: b * x + d * y + f }
}

/** Zone center at time t in a picture with the given animations (by id). */
export function zoneCenter(d: Difference, animations: Map<string, Animation>, t: number) {
  const a = d.animatedId === undefined ? undefined : animations.get(d.animatedId)
  const m = a && pose(a, t).matrix
  return m ? transformPoint(m, d.x, d.y) : { x: d.x, y: d.y }
}
