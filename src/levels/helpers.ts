import type { Animation, AnimationMotion, Difference, Level } from '../engine/types.ts'

/**
 * Returns `a` for picture A and `b` for picture B and registers the zone
 * (x, y, r) in viewBox coordinates. Everything a/b draw must fit inside it.
 * `follow` is the id of an animation (see `anim`) the zone moves with.
 */
export type Diff = (x: number, y: number, r: number, a: string, b: string, follow?: string) => string

export type AnimSpec = AnimationMotion & {
  /** Needed only to reference the animation from `diff(..., follow)`. */
  id?: string
  period: number
  phase?: number
  reverse?: boolean
}

/** Wraps `markup` (drawn at its rest position) into an animated group. */
export type Anim = (spec: AnimSpec, markup: string) => string

export interface SceneContext {
  diff: Diff
  anim: Anim
  /** Deterministic random numbers in [0, 1), the same sequence for both pictures. */
  rand: () => number
}

/** Deterministic PRNG (mulberry32), returns numbers in [0, 1). */
export function rng(seed: number): () => number {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface SvgLevelDef {
  id: number
  chapter: string
  title: string
  parTimeSec: number
  viewBox?: { w: number; h: number }
  /** Draws the scene; called once per picture with a fresh context. */
  scene: (ctx: SceneContext) => string
}

export function svgLevel(def: SvgLevelDef): Level {
  const render = (variant: 0 | 1, zones?: Difference[]) => {
    // Both arguments of diff() are evaluated, so anim() registers the animations of
    // both variants; only those whose group ends up in the markup are kept.
    const registered: Animation[] = []
    const groups: { wrapped: string; markup: string; motion: string }[] = []
    const anim: Anim = ({ id, ...spec }, markup) => {
      const key = `a${registered.length}`
      registered.push({ ...spec, key, id: id ?? key } as Animation)
      const wrapped = `<g data-anim="${key}">${markup}</g>`
      groups.push({ wrapped, markup, motion: JSON.stringify(spec) })
      return wrapped
    }
    // Markup with every animated group unwrapped (`still`) or replaced by its motion spec
    // (`moving`). Outer groups are registered after inner ones, so unwrap them first.
    const unwrap = (s: string, as: 'still' | 'moving') => {
      for (let i = groups.length - 1; i >= 0; i--) {
        const g = groups[i]
        s = s.split(g.wrapped).join(as === 'still' ? g.markup : `<motion ${g.motion}>${g.markup}</motion>`)
      }
      return s
    }
    const diff: Diff = (x, y, r, a, b, follow) => {
      if (zones) {
        const zone: Difference = { x, y, r }
        if (follow !== undefined) zone.animatedId = follow
        if (unwrap(a, 'still') === unwrap(b, 'still') && unwrap(a, 'moving') !== unwrap(b, 'moving')) zone.motion = true
        zones.push(zone)
      }
      return variant === 0 ? a : b
    }
    const svg = def.scene({ diff, anim, rand: rng(def.id) })
    return { svg, animations: registered.filter((a) => svg.includes(`data-anim="${a.key}"`)) }
  }

  const differences: Difference[] = []
  render(0, differences)

  return {
    id: def.id,
    chapter: def.chapter,
    title: def.title,
    kind: 'svg',
    build: (variant) => render(variant),
    viewBox: def.viewBox ?? { w: 800, h: 500 },
    differences,
    parTimeSec: def.parTimeSec,
  }
}
