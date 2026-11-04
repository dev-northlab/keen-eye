// Extra objects of hard mode (docs/hard-mode-extra-objects.md): small shapes of the chapters drawn the same in
// A and B, only in the hard pictures, to make the search harder. A level lists them once:
//   extras({ extra, anim }, [['flower', 312, 434, '#b38cff'], ['stones', 520, 470], …])
// at the shapes' own anchor points (their x, y arguments); the circle each one needs is worked out here from
// the shape's box and its motion. Animals and things on the water move on the spot (the same in A and B, so
// never a difference); `check-levels` checks they stay in their circles and keep clear of the zones.
import { bird, butterfly, mushroom, pine } from './chapter-03/shapes.ts'
import {
  bottleMessage,
  buoy,
  clam,
  coconut,
  crab,
  fish,
  flipFlops,
  gull,
  jellyfish,
  lifeRing,
  rock,
  seahorse,
  seaUrchin,
  seaweed,
  shell,
  starfish,
  sunglasses,
} from './chapter-04/shapes.ts'
import type { AnimationMotion } from '../engine/types.ts'
import type { SceneContext } from './helpers.ts'
import { bee, chick, cloud, duck, eggNest, flower, grass, horseshoe, ladybug, snail, stones } from './shapes.ts'
import { birds, pineSnow, star } from './time/shapes.ts'

interface Kind {
  /** Draws the shape at its anchor; `color` where the shape has one. */
  draw: (x: number, y: number, color?: string) => string
  /** The drawing's box around the anchor: x0, x1, y0, y1. */
  box: [number, number, number, number]
  /** Motion on the spot around the anchor, `reach` = how far any point of the drawing moves. */
  move?: { motion: (x: number, y: number) => AnimationMotion; period: number; reach: number }
}

/** Swinging around the anchor (the shape's base) by ±angle. */
const swing = (angle: number) => (x: number, y: number): AnimationMotion => ({ type: 'sway', angle, pivot: [x, y] })
/** Bobbing by (dx, dy). */
const bob = (dx: number, dy: number) => (): AnimationMotion => ({ type: 'bob', dx, dy })

const KINDS = {
  // Farm: grass, sky, pond, the walls and floor of a barn.
  flower: { draw: (x, y, c) => flower(x, y, c ?? '#ff6b8b'), box: [-11, 10, -31, -1], move: { motion: swing(6), period: 3, reach: 4 } },
  grass: { draw: grass, box: [-9, 8, -14, -1] },
  stones: { draw: stones, box: [-17, 15, -12, 0] },
  snail: { draw: snail, box: [-14, 13, -14, 1], move: { motion: bob(3, 0), period: 6, reach: 3 } },
  ladybug: { draw: ladybug, box: [-6, 8, -5, 4], move: { motion: bob(2, 1), period: 1.8, reach: 3 } },
  mushroom: { draw: (x, y, c) => mushroom(x, y, c), box: [-14, 13, -24, -1] },
  chick: { draw: (x, y) => chick(x, y), box: [-9, 12, -13, 8], move: { motion: (x, y) => ({ type: 'sway', angle: 12, pivot: [x, y + 8] }), period: 2.2, reach: 5 } },
  horseshoe: { draw: horseshoe, box: [-8, 7, -8, 9] },
  eggNest: { draw: eggNest, box: [-15, 14, -14, 0] },
  butterfly: { draw: (x, y, c) => butterfly(x, y, c), box: [-12, 11, -8, 7], move: { motion: bob(0, 4), period: 1.6, reach: 4 } },
  bee: { draw: bee, box: [-8, 9, -10, 5], move: { motion: bob(3, 3), period: 1.2, reach: 5 } },
  /** A bird sitting: on the ground, never in the sky (use `birds`). */
  bird: { draw: (x, y, c) => bird(x, y, c), box: [-12, 12, -14, -2] },
  birds: { draw: birds, box: [-31, 29, -16, 7], move: { motion: bob(6, 3), period: 5, reach: 7 } },
  cloud: { draw: (x, y) => cloud(x, y, 0.6), box: [-30, 29, -27, 13], move: { motion: bob(6, 0), period: 14, reach: 6 } },
  duck: { draw: duck, box: [-30, 37, -27, 13], move: { motion: bob(5, 0), period: 5, reach: 5 } },
  // Farm in winter and at night.
  pine: { draw: (x, y) => pine(x, y, 0.5) + pineSnow(x, y, 0.5), box: [-15, 14, -51, -1] },
  star: { draw: (x, y) => star(x, y), box: [-7, 6, -7, 6], move: { motion: () => ({ type: 'blink', duty: 0.75 }), period: 2.6, reach: 0 } },
  // Sea: sand, water surface, under water, sky.
  shell: { draw: (x, y, c) => shell(x, y, c), box: [-10, 9, -13, -1] },
  starfish: { draw: (x, y, c) => starfish(x, y, c), box: [-14, 13, -14, 12] },
  crab: { draw: (x, y, c) => crab(x, y, c), box: [-22, 21, -18, 0], move: { motion: bob(4, 0), period: 2, reach: 4 } },
  clam: { draw: (x, y, c) => clam(x, y, c), box: [-11, 10, -13, 0] },
  flipFlops: { draw: (x, y, c) => flipFlops(x, y, c), box: [-11, 10, -9, 9] },
  sunglasses: { draw: sunglasses, box: [-12, 11, -4, 3] },
  rock: { draw: (x, y, c) => rock(x, y, 0.6, c), box: [-12, 11, -10, -1] },
  coconut: { draw: coconut, box: [-8, 7, -15, 0] },
  bottle: { draw: bottleMessage, box: [-12, 14, -10, -1], move: { motion: bob(1, 2), period: 3.4, reach: 3 } },
  buoy: { draw: (x, y, c) => buoy(x, y, c), box: [-8, 7, -24, 7], move: { motion: swing(6), period: 3, reach: 4 } },
  lifeRing: { draw: (x, y, c) => lifeRing(x, y, c), box: [-14, 13, -14, 13], move: { motion: bob(0, 2), period: 3, reach: 2 } },
  gull: { draw: gull, box: [-17, 16, -8, 3], move: { motion: bob(4, 4), period: 4, reach: 6 } },
  fish: { draw: (x, y, c) => fish(x, y, c ?? '#ffb703', 0.7), box: [-12, 6, -6, 4], move: { motion: bob(6, 2), period: 3, reach: 7 } },
  jellyfish: { draw: (x, y, c) => jellyfish(x, y, c), box: [-14, 13, -12, 26], move: { motion: bob(0, 6), period: 3.5, reach: 6 } },
  seahorse: { draw: (x, y, c) => seahorse(x, y, c), box: [-6, 7, -14, 16], move: { motion: bob(0, 4), period: 3, reach: 4 } },
  seaUrchin: { draw: (x, y, c) => seaUrchin(x, y, c), box: [-12, 11, -17, -1] },
  seaweed: { draw: (x, y, c) => seaweed(x, y, 0.6, c), box: [-5, 8, -26, 1], move: { motion: swing(8), period: 3, reach: 4 } },
} satisfies Record<string, Kind>

export type ExtraKind = keyof typeof KINDS

/** Anti-aliasing margin of the circles. */
const MARGIN = 2

/**
 * Draws the listed extra objects through the scene's `extra` (each in the circle around its box and motion);
 * the moving ones through `anim`, their period and phase taken from the place so that they never move in step.
 */
export function extras(
  { extra, anim }: Pick<SceneContext, 'extra' | 'anim'>,
  items: [kind: ExtraKind, x: number, y: number, color?: string][],
): string {
  return items
    .map(([kind, x, y, color]) => {
      const { draw, box, move } = KINDS[kind] as Kind
      const [x0, x1, y0, y1] = box
      const r = Math.ceil(Math.hypot(x1 - x0, y1 - y0) / 2) + (move?.reach ?? 0) + MARGIN
      const spot = (x * 7 + y * 13) % 100
      const markup = move
        ? anim({ ...move.motion(x, y), period: move.period * (0.85 + (spot % 30) / 100), phase: spot / 100 }, draw(x, y, color))
        : draw(x, y, color)
      return extra(x + (x0 + x1) / 2, y + (y0 + y1) / 2, r, markup)
    })
    .join('')
}
