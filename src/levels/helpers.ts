import type { Animation, AnimationMotion, Difference, Level, MemoryRules, TimePair, Trap } from '../engine/types.ts'

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

/** "Time" levels: returns `a` in the moment of picture A (morning, summer) and `b` in that of B (evening, winter). */
export type Time = <T>(a: T, b: T) => T

/**
 * "Time" levels: a natural change that looks like a difference. Returns `a` in moment A and `b` in
 * moment B and registers the trap zone (x, y, r); a tap there shows `timeMode.traps.<hint>`.
 */
export type TrapAt = (x: number, y: number, r: number, a: string, b: string, hint: string) => string

export interface SceneContext {
  diff: Diff
  anim: Anim
  /** Deterministic random numbers in [0, 1), the same sequence for both pictures. */
  rand: () => number
  time: Time
  trap: TrapAt
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

/** Levels with this many differences last long enough for two players. */
const MULTIPLAYER_MIN_DIFFERENCES = 7

interface SvgLevelDef {
  id: number
  chapter: string
  title: string
  parTimeSec: number
  hintLimit?: number
  viewBox?: { w: number; h: number }
  /** Level.multiplayerReady; default: at least MULTIPLAYER_MIN_DIFFERENCES differences. */
  multiplayerReady?: boolean
  /** Makes it a "time" level: A and B show the scene at these two moments (`time`, `trap`). */
  pair?: TimePair
  /** Makes it a "memory" level (see `memoryLevel`). */
  memory?: MemoryRules
  /** Draws the scene; called once per picture with a fresh context. */
  scene: (ctx: SceneContext) => string
}

export function svgLevel(def: SvgLevelDef): Level {
  // `diff` picks by the variant, `time` and `trap` by the moment (only the validator makes them differ).
  const render = (variant: 0 | 1, moment: 0 | 1, zones?: Difference[], traps?: Trap[]) => {
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
    const time: Time = (a, b) => (moment === 0 ? a : b)
    const trap: TrapAt = (x, y, r, a, b, hint) => {
      traps?.push({ x, y, r, hint })
      return time(a, b)
    }
    const svg = def.scene({ diff, anim, rand: rng(def.id), time, trap })
    return { svg, animations: registered.filter((a) => svg.includes(`data-anim="${a.key}"`)) }
  }

  const differences: Difference[] = []
  const traps: Trap[] = []
  render(0, 0, differences, traps)

  return {
    id: def.id,
    chapter: def.chapter,
    title: def.title,
    kind: 'svg',
    build: (variant, moment = variant) => render(variant, moment),
    viewBox: def.viewBox ?? { w: 800, h: 500 },
    differences,
    parTimeSec: def.parTimeSec,
    ...(def.hintLimit !== undefined && { hintLimit: def.hintLimit }),
    multiplayerReady: def.multiplayerReady ?? differences.length >= MULTIPLAYER_MIN_DIFFERENCES,
    ...(def.pair !== undefined && { pair: def.pair, traps }),
    ...(def.memory !== undefined && { memory: def.memory }),
  }
}

/**
 * "Memory" level (docs/memory-mode.md), chapter 'memory': A is shown for `showSeconds`, then B alone;
 * `peeks` extra looks at A (default 1). The stars count finds, misses and looks, not time.
 */
export const memoryLevel = (def: { id: number; title: string; showSeconds: number; peeks?: number; scene: SvgLevelDef['scene'] }) =>
  svgLevel({
    id: def.id,
    chapter: 'memory',
    title: def.title,
    parTimeSec: 0,
    multiplayerReady: false,
    memory: { showSeconds: def.showSeconds, peeks: def.peeks ?? 1 },
    scene: def.scene,
  })
