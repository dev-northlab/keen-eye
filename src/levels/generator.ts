// Generated levels (16+): a chapter theme places pieces on a scene; the generator picks which of
// them become differences (deterministically, from the level seed) so that the zones fit the
// picture and never overlap, and draws both pictures through svgLevel's diff()/anim().
import type { Level } from '../engine/types.ts'
import { svgLevel, type AnimSpec, type SceneContext } from './helpers.ts'

export interface Piece {
  /** Markup with the anchor at (x, y), uniform scale s and main color `color`. */
  draw: (x: number, y: number, s: number, color: string) => string
  /** Bounding circle at scale 1 relative to the anchor: [dx, dy, r]. */
  bounds: [number, number, number]
  /** Main color choices: the scene uses one, a color difference another. */
  colors: string[]
  /** Looks different when mirrored or rotated (allows flip and rotate differences). */
  asymmetric?: boolean
  /**
   * Ambient motion at a placement. Rotations pivot on the bounds center, sways on a point at the
   * bottom of the bounds; paths and bobs move the whole piece (its zone follows it).
   */
  motion?: (x: number, y: number, s: number) => AnimSpec
}

/** Every theme's pieces, by "chapter/name", so the validator can check their declared bounds. */
export const allPieces = new Map<string, Piece>()

/** Registers a theme's pieces for validation and returns them unchanged. */
export function definePieces<T extends Record<string, Piece>>(chapter: string, pieces: T): T {
  for (const [name, piece] of Object.entries(pieces)) allPieces.set(`${chapter}/${name}`, piece)
  return pieces
}

interface AddOptions {
  s?: number
  color?: string
  /** Never a difference (large scenery such as buildings). */
  fixed?: boolean
  /** Placed without its ambient motion. */
  still?: boolean
}

export interface SceneBuilder {
  rand: () => number
  pick: <T>(items: T[]) => T
  /** Static scenery under all pieces (sky, ground). Must come before the first piece. */
  backdrop: (markup: string) => void
  add: (piece: Piece, x: number, y: number, options?: AddOptions) => void
}

export interface GeneratedLevelDef {
  id: number
  chapter: string
  title: string
  parTimeSec: number
  /** Total number of differences, including the motion ones. */
  differences: number
  motion: number
  /** Smaller differences of later levels: subtle kinds (color, shift, rotate, size) come first. */
  subtle?: boolean
  compose: (scene: SceneBuilder) => void
}

const W = 800
const H = 500
/** Extra radius around a piece's bounds in its zone. */
const PAD = 4
/** Minimum zone radius: smaller zones are too hard to tap even zoomed in. */
const MIN_ZONE = 18
/** Free space between two difference zones. */
const GAP = 6

type StaticKind = 'missing' | 'extra' | 'color' | 'flip' | 'rotate' | 'size' | 'shift'
type MotionKind = 'reverse' | 'speed' | 'phase' | 'only'

interface Placed {
  piece: Piece
  x: number
  y: number
  s: number
  color: string
  fixed: boolean
  spec?: AnimSpec
  /** Bounds circle in scene coordinates. */
  cx: number
  cy: number
  r: number
}

interface Choice {
  index: number
  kind: StaticKind | MotionKind
  /** Rest zone and whether it follows the piece's animation. */
  zone: { x: number; y: number; r: number }
  follow: boolean
  /** Kind parameters drawn from the seed. */
  param: number
}

const isMover = (p: Placed) => p.spec?.type === 'path'

/** Zone centers a zone can take over time (offsets of its motion), for overlap and bounds checks. */
function sweep(spec: AnimSpec | undefined, follow: boolean): [number, number][] {
  if (!follow || !spec) return [[0, 0]]
  if (spec.type === 'path') {
    const pts: [number, number][] = []
    spec.points.forEach((p, i) => {
      const q = spec.points[(i + 1) % spec.points.length]
      for (let k = 0; k < 8; k++) pts.push([p[0] + ((q[0] - p[0]) * k) / 8, p[1] + ((q[1] - p[1]) * k) / 8])
    })
    return pts
  }
  if (spec.type === 'bob') return [[0, 0], [spec.dx, spec.dy], [-spec.dx, -spec.dy]]
  return [[0, 0]]
}

function shuffle<T>(items: T[], rand: () => number): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function motionKinds(spec: AnimSpec): MotionKind[] {
  switch (spec.type) {
    case 'path':
    case 'rotate':
      return ['reverse', 'speed', 'only']
    case 'blink':
      return ['phase', 'only']
    default:
      return ['phase', 'speed', 'only']
  }
}

function staticKinds(p: Placed, subtle: boolean): StaticKind[] {
  if (p.spec) return p.piece.colors.length > 1 ? ['color', 'missing', 'extra'] : ['missing', 'extra']
  const kinds: StaticKind[] = ['missing', 'extra', 'size', 'shift']
  if (p.piece.colors.length > 1) kinds.push('color')
  if (p.piece.asymmetric) kinds.push('flip', 'rotate')
  return subtle ? kinds.filter((k) => k !== 'missing' && k !== 'extra') : kinds
}

/** Zone of a difference of kind `kind` on piece p; `param` is a seeded number in [0, 1). */
function zoneOf(p: Placed, kind: StaticKind | MotionKind, param: number) {
  const base = Math.max(MIN_ZONE, p.r + PAD)
  const follow = !!p.spec && (p.spec.type === 'path' || p.spec.type === 'bob')
  if (kind === 'size') return { zone: { x: p.cx, y: p.cy, r: Math.max(MIN_ZONE, p.r * 1.3 + PAD) }, follow }
  if (kind === 'shift') {
    const [dx, dy] = shiftOf(p, param)
    return { zone: { x: p.cx + dx / 2, y: p.cy + dy / 2, r: Math.max(MIN_ZONE, p.r + Math.hypot(dx, dy) / 2 + PAD) }, follow }
  }
  // A swaying piece: a point of its bounds turned by up to ±angle around the pivot moves at most
  // 2·(|center − pivot| + r)·sin(angle / 2).
  if (p.spec?.type === 'sway') {
    const reach = Math.hypot(p.cx - p.spec.pivot[0], p.cy - p.spec.pivot[1]) + p.r
    const lean = 2 * reach * Math.sin((p.spec.angle * Math.PI) / 360)
    return { zone: { x: p.cx, y: p.cy, r: Math.max(MIN_ZONE, p.r + lean + PAD) }, follow }
  }
  return { zone: { x: p.cx, y: p.cy, r: base }, follow }
}

function shiftOf(p: Placed, param: number): [number, number] {
  const d = Math.max(9, p.r * 0.45)
  const a = Math.floor(param * 8) * (Math.PI / 4)
  return [Math.round(Math.cos(a) * d), Math.round(Math.sin(a) * d)]
}

function fits(zone: Choice['zone'], centers: [number, number][]): boolean {
  return centers.every(
    ([dx, dy]) =>
      zone.x + dx - zone.r >= 2 && zone.y + dy - zone.r >= 2 && zone.x + dx + zone.r <= W - 2 && zone.y + dy + zone.r <= H - 2,
  )
}

function apart(a: Choice, sa: [number, number][], b: Choice, sb: [number, number][]): boolean {
  for (const [ax, ay] of sa)
    for (const [bx, by] of sb)
      if (Math.hypot(a.zone.x + ax - b.zone.x - bx, a.zone.y + ay - b.zone.y - by) < a.zone.r + b.zone.r + GAP) return false
  return true
}

/** Picks the differences: motion ones first (from animated pieces), then static ones. */
function choose(def: GeneratedLevelDef, placed: Placed[], rand: () => number): Choice[] {
  // A piece covered by a later static piece could hide its difference.
  const covered = placed.map((p, i) =>
    placed.slice(i + 1).some((q) => !isMover(q) && Math.hypot(p.cx - q.cx, p.cy - q.cy) < p.r + q.r - 2),
  )
  const candidates = shuffle(
    placed.map((_, i) => i).filter((i) => !placed[i].fixed && !covered[i]),
    rand,
  )
  const chosen: { choice: Choice; centers: [number, number][] }[] = []
  const tryAdd = (index: number, kind: StaticKind | MotionKind) => {
    const p = placed[index]
    const param = rand()
    const { zone, follow } = zoneOf(p, kind, param)
    const choice: Choice = { index, kind, zone, follow, param }
    const centers = sweep(p.spec, follow)
    if (!fits(zone, centers) || !chosen.every((c) => apart(choice, centers, c.choice, c.centers))) return false
    chosen.push({ choice, centers })
    return true
  }

  let motion = def.motion
  for (const i of candidates) {
    if (motion === 0) break
    const spec = placed[i].spec
    if (spec && tryAdd(i, shuffle(motionKinds(spec), rand)[0])) motion--
  }
  let rest = def.differences - def.motion
  for (const i of candidates) {
    if (rest === 0) break
    if (chosen.some((c) => c.choice.index === i) || isMover(placed[i])) continue
    for (const kind of shuffle(staticKinds(placed[i], !!def.subtle), rand)) {
      if (tryAdd(i, kind)) {
        rest--
        break
      }
    }
  }
  if (motion > 0 || rest > 0)
    throw new Error(`Level ${def.id}: only ${def.differences - motion - rest} of ${def.differences} differences fit`)
  return chosen.map((c) => c.choice)
}

/** Both pictures of one difference. */
function variants(p: Placed, c: Choice, ctx: SceneContext): [string, string] {
  const { anim } = ctx
  const draw = (color = p.color) => p.piece.draw(p.x, p.y, p.s, color)
  const full = (color = p.color) => (p.spec ? anim(p.spec, draw(color)) : draw(color))
  const wrap = (transform: string) => `<g transform="${transform}">${full()}</g>`
  const spec = p.spec!
  switch (c.kind) {
    case 'missing':
      return [full(), '']
    case 'extra':
      return ['', full()]
    case 'color': {
      const others = p.piece.colors.filter((k) => k !== p.color)
      return [full(), full(others[Math.floor(c.param * others.length)])]
    }
    case 'flip':
      return [full(), wrap(`matrix(-1 0 0 1 ${2 * p.cx} 0)`)]
    case 'rotate':
      return [full(), wrap(`rotate(${(c.param < 0.5 ? -1 : 1) * (18 + Math.round(c.param * 24))} ${p.cx} ${p.cy})`)]
    case 'size':
      return [full(), wrap(`matrix(1.3 0 0 1.3 ${-0.3 * p.cx} ${-0.3 * p.cy})`)]
    case 'shift': {
      const [dx, dy] = shiftOf(p, c.param)
      return [full(), wrap(`translate(${dx} ${dy})`)]
    }
    case 'reverse':
      return [full(), anim({ ...spec, reverse: !spec.reverse }, draw())]
    case 'speed':
      return [full(), anim({ ...spec, period: spec.period * 0.55 }, draw())]
    case 'phase':
      return [full(), anim({ ...spec, phase: (spec.phase ?? 0) + 0.3 + c.param * 0.15 }, draw())]
    case 'only':
      return [draw(), full()]
  }
}

export function generatedLevel(def: GeneratedLevelDef): Level {
  return svgLevel({
    id: def.id,
    chapter: def.chapter,
    title: def.title,
    parTimeSec: def.parTimeSec,
    scene: (ctx) => {
      const { rand } = ctx
      const backdrop: string[] = []
      const placed: Placed[] = []
      def.compose({
        rand,
        pick: (items) => items[Math.floor(rand() * items.length)],
        backdrop: (markup) => {
          if (placed.length > 0) throw new Error(`Level ${def.id}: backdrop after pieces`)
          backdrop.push(markup)
        },
        add: (piece, x, y, o = {}) => {
          const s = o.s ?? 1
          const [dx, dy, r] = piece.bounds
          const spec = piece.motion && !o.still ? { ...piece.motion(x, y, s), id: `g${placed.length}` } : undefined
          const color = o.color ?? piece.colors[Math.floor(rand() * piece.colors.length)]
          placed.push({ piece, x, y, s, color, fixed: !!o.fixed, spec, cx: x + dx * s, cy: y + dy * s, r: r * s })
        },
      })
      const choices = new Map(choose(def, placed, rand).map((c) => [c.index, c]))
      return (
        backdrop.join('') +
        placed
          .map((p, i) => {
            const c = choices.get(i)
            if (!c) return p.spec ? ctx.anim(p.spec, p.piece.draw(p.x, p.y, p.s, p.color)) : p.piece.draw(p.x, p.y, p.s, p.color)
            const [a, b] = variants(p, c, ctx)
            return ctx.diff(c.zone.x, c.zone.y, Math.ceil(c.zone.r), a, b, c.follow ? p.spec!.id : undefined)
          })
          .join('')
      )
    },
  })
}
