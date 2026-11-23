// Keyframe timelines of cartoons (docs/cartoon-mode.md): values eased from key to key over a looping story.
// No DOM, so the level validator can use it in Node.
import type { Ease, EventWindow } from './types.ts'

const BACK = 1.70158

/** Eased progress 0–1 of the way from one key to the next. */
export function ease(kind: Ease | undefined, u: number): number {
  switch (kind) {
    case 'in':
      return u * u
    case 'out':
      return 1 - (1 - u) * (1 - u)
    case 'inOut':
      return u * u * (3 - 2 * u)
    case 'back': {
      // Overshoots a little and settles: a cartoon landing.
      const v = u - 1
      return 1 + (BACK + 1) * v * v * v + BACK * v * v
    }
    case 'step':
      return 0
    default:
      return u
  }
}

type Keyed<F extends string> = { t: number; ease?: Ease } & Partial<Record<F, number>>

/** Second `t` within a loop of `period`, 0 ≤ s < period. */
export const loopTime = (t: number, period: number) => t - Math.floor(t / period) * period

/**
 * Values of `fields` at second `s` of a loop of `period`: eased from the last key at or before s to the next one;
 * after the last key the values ease back to the first key, reached one period later. A field a key leaves out
 * keeps the value of the key before (the first key's missing fields take `defaults`). Keys are sorted by `t`.
 */
export function sampleKeys<F extends string>(keys: Keyed<F>[], s: number, period: number, fields: readonly F[], defaults: Record<F, number>): Record<F, number> {
  const filled = fill(keys, fields, defaults)
  const n = filled.length
  let i = n - 1
  for (let k = 0; k < n; k++) if (keys[k].t <= s) i = k
  const j = (i + 1) % n
  let t0 = keys[i].t
  let t1 = keys[j].t
  let at = s
  if (j <= i) t1 += period
  if (at < t0) at += period
  const u = t1 > t0 ? Math.min(Math.max((at - t0) / (t1 - t0), 0), 1) : 0
  const e = ease(keys[i].ease, u)
  const out = {} as Record<F, number>
  for (const f of fields) out[f] = filled[i][f] + (filled[j][f] - filled[i][f]) * e
  return out
}

/**
 * Keys with every field set, kept per keys array and set of fields (a story's keys are posed ~60 times a second):
 * the same keys may be read with other fields, e.g. only x and y by a level working out where something will be.
 */
const filledCache = new WeakMap<object, Map<string, unknown>>()

function fill<F extends string>(keys: Keyed<F>[], fields: readonly F[], defaults: Record<F, number>): Record<F, number>[] {
  let byFields = filledCache.get(keys)
  if (!byFields) filledCache.set(keys, (byFields = new Map()))
  const id = fields.join() + '|' + fields.map((f) => defaults[f]).join()
  const cached = byFields.get(id) as Record<F, number>[] | undefined
  if (cached) return cached
  let last = { ...defaults }
  const filled = keys.map((k) => {
    last = { ...last }
    for (const f of fields) if (k[f] !== undefined) last[f] = k[f]!
    return last
  })
  byFields.set(id, filled)
  return filled
}

/** The story is inside the window of an event at animation time t. */
export const inWindow = (w: EventWindow, t: number) => {
  const s = loopTime(t, w.period)
  return s >= w.from && s <= w.to
}
