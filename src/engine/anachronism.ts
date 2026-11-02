import { HIT_MARGIN, hitItem, shapeCircle } from './hit-test.ts'
import type { AnachronismLevel, Animation, HitShape, LocalizedText } from './types.ts'

// "Find the odd one out" (docs/anachronism-mode.md), DOM-free: level data checks and the rules of one play.

/** The text in `locale`, or the English one. */
export const localized = (t: LocalizedText, locale: string): string => t[locale] ?? t.en

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null
const isText = (v: unknown) => typeof v === 'string' && v.length > 0
const isNumber = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v)
const isPositive = (v: unknown): v is number => isNumber(v) && v > 0
const isLocalized = (v: unknown) => isObject(v) && isText(v.en) && Object.values(v).every(isText)

/** Problem with a hitbox's numbers or bounds (inside the picture), or null. */
function shapeProblem(s: Record<string, unknown>, aspect: number): string | null {
  const { x, y } = s
  if (!isNumber(x) || !isNumber(y)) return 'x and y must be numbers'
  if (s.shape === 'circle') {
    if (!isPositive(s.r)) return 'r must be positive'
    // r is in percent of the width: on the height it spans r · aspect percent.
    const ry = s.r * aspect
    return x - s.r >= 0 && x + s.r <= 100 && y - ry >= 0 && y + ry <= 100 ? null : 'circle leaves the picture'
  }
  if (s.shape === 'rect') {
    if (!isPositive(s.w) || !isPositive(s.h)) return 'w and h must be positive'
    return x >= 0 && y >= 0 && x + s.w <= 100 && y + s.h <= 100 ? null : 'rect leaves the picture'
  }
  return 'shape must be "circle" or "rect"'
}

const isPoint = (v: unknown) => Array.isArray(v) && v.length === 2 && v.every(isNumber)
const isColor = (v: unknown) => typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v)

/** Problem with a background animation (AnimationMotion and its timing), or null. */
function animationProblem(a: Record<string, unknown>): string | null {
  if (!isPositive(a.period)) return 'period must be positive'
  if (a.phase !== undefined && !isNumber(a.phase)) return 'phase must be a number'
  if (a.reverse !== undefined && typeof a.reverse !== 'boolean') return 'reverse must be true or false'
  switch (a.type) {
    case 'path':
      return Array.isArray(a.points) && a.points.length >= 2 && a.points.every(isPoint) && (a.flipX === undefined || isNumber(a.flipX))
        ? null
        : 'path needs at least 2 points [x, y]'
    case 'bob':
      return isNumber(a.dx) && isNumber(a.dy) ? null : 'bob needs dx and dy'
    case 'sway':
      return isNumber(a.angle) && isPoint(a.pivot) ? null : 'sway needs angle and pivot [x, y]'
    case 'rotate':
      return isPoint(a.pivot) ? null : 'rotate needs pivot [x, y]'
    case 'blink':
      return a.duty === undefined || (isNumber(a.duty) && a.duty > 0 && a.duty < 1) ? null : 'duty must be between 0 and 1'
    case 'color':
      return Array.isArray(a.colors) && a.colors.length >= 2 && a.colors.every(isColor) ? null : 'color needs 2+ "#rrggbb" colors'
  }
  return 'unknown animation type'
}

/**
 * Checks level data (a JSON file of the mode) and returns it typed; throws naming the first
 * problem. Hitboxes must stay inside the picture and, grown by HIT_MARGIN, must not overlap
 * (checked on their enclosing circles, which is stricter than needed).
 */
export function parseAnachronismLevel(raw: unknown): AnachronismLevel {
  const fail = (problem: string): never => {
    throw new Error(`anachronism level ${isObject(raw) ? String(raw.id) : '?'}: ${problem}`)
  }
  if (!isObject(raw)) return fail('not an object')
  if (!isText(raw.id)) fail('id must be a string')
  if (raw.mode !== 'anachronism') fail('mode must be "anachronism"')
  if (!isText(raw.world) || !isText(raw.image)) fail('world and image must be strings')
  if (!isLocalized(raw.era)) fail('era must have texts with "en"')
  if (!isPositive(raw.width) || !isPositive(raw.height)) fail('width and height must be positive')
  if (!Number.isInteger(raw.difficulty) || (raw.difficulty as number) < 1) fail('difficulty must be an integer ≥ 1')
  if (!isPositive(raw.parTimeSec)) fail('parTimeSec must be positive')
  if (!Array.isArray(raw.items) || raw.items.length === 0) fail('items must be a non-empty array')

  const size = { w: raw.width as number, h: raw.height as number }
  const items = raw.items as unknown[]
  const ids = new Set<string>()
  for (const item of items) {
    if (!isObject(item) || !isText(item.id)) return fail('every item needs an id')
    const id = item.id as string
    if (ids.has(id)) fail(`duplicate item id "${id}"`)
    ids.add(id)
    if (!isLocalized(item.label) || !isLocalized(item.fact)) fail(`item "${id}": label and fact must have texts with "en"`)
    const problem = shapeProblem(item, size.w / size.h)
    if (problem) fail(`item "${id}": ${problem}`)
  }

  if (raw.animations !== undefined && !Array.isArray(raw.animations)) fail('animations must be an array')
  const keys = new Set<string>()
  for (const a of (raw.animations ?? []) as unknown[]) {
    if (!isObject(a) || !isText(a.key)) return fail('every animation needs a key')
    const key = a.key as string
    if (keys.has(key)) fail(`duplicate animation key "${key}"`)
    keys.add(key)
    const problem = animationProblem(a)
    if (problem) fail(`animation "${key}": ${problem}`)
  }

  const animations = ((raw.animations ?? []) as Omit<Animation, 'id'>[]).map((a) => ({ ...a, id: a.key }) as Animation)
  const level = { ...raw, animations } as unknown as AnachronismLevel
  const circles = level.items.map((s: HitShape) => shapeCircle(s, size, HIT_MARGIN))
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      const [a, b] = [circles[i], circles[j]]
      if (Math.hypot(a.x - b.x, a.y - b.y) < a.r + b.r) fail(`items "${level.items[i].id}" and "${level.items[j].id}" overlap`)
    }
  }
  return level
}

export type TapOutcome =
  | { kind: 'found'; index: number; complete: boolean }
  /** An item already found: nothing happens. */
  | { kind: 'repeat'; index: number }
  | { kind: 'miss' }

/** Rules of one play of a level: which items are found. Taps are image points in percent. */
export class AnachronismRound {
  readonly found: boolean[]
  private readonly level: AnachronismLevel
  private count = 0

  constructor(level: AnachronismLevel) {
    this.level = level
    this.found = level.items.map(() => false)
  }

  get foundCount(): number {
    return this.count
  }

  get complete(): boolean {
    return this.count === this.found.length
  }

  tap(x: number, y: number): TapOutcome {
    const index = hitItem(this.level.items, x, y, this.level.width / this.level.height)
    if (index < 0) return { kind: 'miss' }
    if (this.found[index]) return { kind: 'repeat', index }
    this.found[index] = true
    this.count++
    return { kind: 'found', index, complete: this.complete }
  }
}
