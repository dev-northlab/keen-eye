// Extra objects of normal mode (docs/extra-objects.md): small shapes of the chapters drawn the same in
// A and B, only in the pictures of normal mode (never calm, never "memory"), to make the search harder. A level lists them once:
//   extras({ extra, anim }, [['flower', 312, 434, '#b38cff'], ['stones', 520, 470], …])
// at the shapes' own anchor points (their x, y arguments); the circle each one needs is worked out here from
// the shape's box and its motion. Animals and things on the water move on the spot (the same in A and B, so
// never a difference); `check-levels` checks they stay in their circles and keep clear of the zones.
// `decor` draws the same shapes in every mode: plain scenery of a level, also the same in A and B.
import {
  balloon,
  ball,
  bin,
  bollard,
  coffeeCup,
  cone,
  flowerBox,
  hydrant,
  manhole,
  newspaperBox,
  pigeon,
  shoppingBag,
  skateboard,
} from './chapter-02/shapes.ts'
import {
  acorn,
  anthill,
  bird,
  bluebells,
  butterfly,
  feather,
  fern,
  frog,
  hedgehog,
  leafPile,
  mushroom,
  pine,
  pineCone,
  rabbit,
  squirrel,
  wildStrawberry,
} from './chapter-03/shapes.ts'
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
import {
  alienPlant,
  asteroid,
  beacon,
  crater,
  crystal,
  fuelCanister,
  helmet,
  moonPebbles,
  planet,
  probe,
  sparkle,
  star as spaceStar,
  toolbox,
  ufo,
  wrench,
} from './chapter-05/shapes.ts'
import type { SceneContext } from './helpers.ts'
import * as detective from './detective/props.ts'
import { suitcase } from './travel/shapes.ts'
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
  // City: the sidewalk, the walls, the sky.
  pigeon: { draw: (x, y) => pigeon(x, y), box: [-15, 14, -14, -1], move: { motion: (x, y) => ({ type: 'sway', angle: 10, pivot: [x, y] }), period: 1.8, reach: 3 } },
  cone: { draw: cone, box: [-10, 9, -24, -1] },
  bin: { draw: (x, y, c) => bin(x, y, c), box: [-10, 9, -28, -1] },
  hydrant: { draw: (x, y, c) => hydrant(x, y, c), box: [-9, 8, -33, -1] },
  ball: { draw: (x, y, c) => ball(x, y, c), box: [-8, 7, -17, 0] },
  bollard: { draw: bollard, box: [-5, 4, -22, -1] },
  shoppingBag: { draw: (x, y, c) => shoppingBag(x, y, c), box: [-9, 8, -26, -1] },
  coffeeCup: { draw: coffeeCup, box: [-5, 4, -13, -1] },
  skateboard: { draw: (x, y, c) => skateboard(x, y, c), box: [-16, 15, -7, -1] },
  newspaperBox: { draw: (x, y, c) => newspaperBox(x, y, c), box: [-10, 9, -30, -1] },
  manhole: { draw: manhole, box: [-14, 13, -5, 4] },
  flowerBox: { draw: (x, y, c) => flowerBox(x, y, c ?? '#ff006e'), box: [-18, 17, -19, -1], move: { motion: swing(3), period: 3.2, reach: 2 } },
  balloon: { draw: (x, y, c) => balloon(x, y, c ?? '#e63946'), box: [-13, 12, -17, 42], move: { motion: bob(3, 4), period: 4, reach: 5 } },
  // Forest: the forest floor (with the farm's mushroom, butterfly, bird, birds and cloud).
  fern: { draw: (x, y, c) => fern(x, y, c), box: [-15, 14, -30, -1], move: { motion: swing(5), period: 3.4, reach: 3 } },
  pineCone: { draw: pineCone, box: [-9, 8, -9, -1] },
  acorn: { draw: acorn, box: [-6, 5, -16, 0] },
  wildStrawberry: { draw: wildStrawberry, box: [-11, 10, -12, 1] },
  bluebells: { draw: (x, y, c) => bluebells(x, y, c), box: [-9, 9, -22, 0], move: { motion: swing(6), period: 2.8, reach: 3 } },
  leafPile: { draw: leafPile, box: [-14, 13, -10, 0] },
  feather: { draw: (x, y, c) => feather(x, y, c), box: [-11, 9, -4, 3] },
  anthill: { draw: anthill, box: [-18, 17, -17, -1] },
  hedgehog: { draw: (x, y) => hedgehog(x, y), box: [-20, 18, -24, -1], move: { motion: bob(3, 0), period: 4, reach: 3 } },
  squirrel: { draw: (x, y) => squirrel(x, y), box: [-18, 15, -30, -1], move: { motion: swing(6), period: 2.4, reach: 4 } },
  rabbit: { draw: (x, y) => rabbit(x, y), box: [-16, 15, -32, -1], move: { motion: bob(0, 3), period: 1.6, reach: 3 } },
  frog: { draw: frog, box: [-14, 13, -18, 0], move: { motion: bob(0, 3), period: 2, reach: 3 } },
  // Space: the sky between the stars, the ground of a moon or planet.
  spaceStar: { draw: (x, y, c) => spaceStar(x, y, 8, c), box: [-8, 8, -8, 7], move: { motion: () => ({ type: 'blink', duty: 0.8 }), period: 2.2, reach: 0 } },
  sparkle: { draw: (x, y) => sparkle(x, y, 9), box: [-9, 9, -9, 9], move: { motion: () => ({ type: 'blink', duty: 0.7 }), period: 1.8, reach: 0 } },
  planet: { draw: (x, y, c) => planet(x, y, 12, c ?? '#ff9f43'), box: [-12, 11, -12, 11], move: { motion: bob(0, 2), period: 9, reach: 2 } },
  ringPlanet: { draw: (x, y, c) => planet(x, y, 11, c ?? '#b38cff', '#ffd23f'), box: [-20, 19, -11, 10], move: { motion: bob(0, 2), period: 10, reach: 2 } },
  asteroid: { draw: (x, y) => asteroid(x, y, 0.6), box: [-10, 10, -11, 9], move: { motion: bob(4, 3), period: 7, reach: 5 } },
  probe: { draw: (x, y) => probe(x, y), box: [-13, 12, -8, 5], move: { motion: bob(3, 2), period: 5, reach: 4 } },
  ufo: { draw: (x, y) => ufo(x, y), box: [-34, 33, -20, 8], move: { motion: bob(0, 4), period: 3, reach: 4 } },
  moonPebbles: { draw: (x, y) => moonPebbles(x, y), box: [-14, 10, -8, 0] },
  crater: { draw: (x, y) => crater(x, y, 12), box: [-12, 11, -5, 4] },
  crystal: { draw: (x, y, c) => crystal(x, y, c), box: [-10, 9, -20, -1] },
  alienPlant: { draw: (x, y, c) => alienPlant(x, y, c), box: [-12, 11, -22, 1], move: { motion: swing(6), period: 3, reach: 3 } },
  wrench: { draw: wrench, box: [-11, 9, -7, 4] },
  fuelCanister: { draw: (x, y, c) => fuelCanister(x, y, c), box: [-8, 7, -22, -1] },
  helmet: { draw: (x, y) => helmet(x, y), box: [-11, 10, -20, -1] },
  toolbox: { draw: (x, y, c) => toolbox(x, y, c), box: [-11, 10, -16, -1] },
  beacon: { draw: (x, y) => beacon(x, y), box: [-9, 8, -27, 0] },
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
  // "Travel": a tourist's suitcase on the pavement (with the city's shapes).
  suitcase: { draw: (x, y, c) => suitcase(x, y, c), box: [-10, 10, -32, 0] },
  // "Detective": animals, tools, little houses and odd things of the scenes (`detective/props.ts`):
  // on the floor and the wall indoors, on the grass, the paving and the snow outside, in the sky.
  cat: { draw: (x, y, c) => detective.cat(x, y, c), box: [-11, 18, -37, 0], move: { motion: swing(4), period: 3.2, reach: 3 } },
  mouse: { draw: (x, y, c) => detective.mouse(x, y, c), box: [-16, 14, -13, 0], move: { motion: bob(3, 0), period: 2, reach: 3 } },
  puppy: { draw: (x, y, c) => detective.puppy(x, y, c), box: [-19, 21, -20, 0], move: { motion: bob(0, 1), period: 3, reach: 1 } },
  tortoise: { draw: detective.tortoise, box: [-15, 20, -12, 1], move: { motion: bob(3, 0), period: 8, reach: 3 } },
  fox: { draw: detective.fox, box: [-10, 15, -31, 0], move: { motion: swing(4), period: 3, reach: 3 } },
  sparrow: { draw: detective.sparrow, box: [-10, 10, -13, 0], move: { motion: bob(0, 3), period: 0.9, reach: 3 } },
  crow: { draw: detective.crow, box: [-12, 11, -19, 0], move: { motion: swing(8), period: 2.4, reach: 3 } },
  bullfinch: { draw: detective.bullfinch, box: [-10, 10, -15, 0], move: { motion: swing(8), period: 2, reach: 2 } },
  molehill: { draw: detective.molehill, box: [-15, 15, -16, 0] },
  bat: { draw: detective.bat, box: [-14, 14, -7, 6], move: { motion: bob(4, 4), period: 1.4, reach: 6 } },
  dragonfly: { draw: detective.dragonfly, box: [-13, 13, -8, 9], move: { motion: bob(3, 3), period: 1.3, reach: 4 } },
  firefly: { draw: detective.firefly, box: [-6, 6, -6, 6], move: { motion: () => ({ type: 'blink', duty: 0.6 }), period: 2, reach: 0 } },
  owl: { draw: detective.owl, box: [-10, 10, -25, 0], move: { motion: swing(4), period: 3.6, reach: 2 } },
  swallow: { draw: detective.swallow, box: [-14, 14, -7, 6], move: { motion: bob(5, 3), period: 2.2, reach: 6 } },
  broom: { draw: detective.broom, box: [-8, 8, -45, 0] },
  bucket: { draw: detective.bucket, box: [-10, 10, -23, 0] },
  fireExtinguisher: { draw: detective.fireExtinguisher, box: [-9, 8, -32, 0] },
  bench: { draw: detective.bench, box: [-21, 21, -24, 0] },
  scooter: { draw: detective.scooter, box: [-14, 16, -29, 0] },
  boots: { draw: (x, y, c) => detective.boots(x, y, c), box: [-13, 16, -24, 0] },
  umbrellaStand: { draw: detective.umbrellaStand, box: [-10, 10, -44, 0] },
  yarnBasket: { draw: detective.yarnBasket, box: [-15, 16, -28, 0] },
  pouf: { draw: (x, y, c) => detective.pouf(x, y, c), box: [-15, 15, -21, 0] },
  teddy: { draw: (x, y, c) => detective.teddy(x, y, c), box: [-12, 12, -32, 0] },
  toyDrum: { draw: detective.toyDrum, box: [-12, 14, -27, 0] },
  globe: { draw: detective.globe, box: [-10, 13, -29, 1] },
  cactus: { draw: detective.cactus, box: [-10, 10, -30, 0] },
  newspapers: { draw: detective.newspapers, box: [-15, 15, -15, 0] },
  dollhouse: { draw: detective.dollhouse, box: [-16, 16, -34, 0] },
  hatBox: { draw: (x, y, c) => detective.hatBox(x, y, c), box: [-14, 14, -23, 0] },
  wateringCan: { draw: (x, y, c) => detective.wateringCan(x, y, c), box: [-15, 18, -24, 0] },
  cuckooClock: { draw: detective.cuckooClock, box: [-14, 14, -20, 28] },
  calendar: { draw: detective.calendar, box: [-10, 10, -14, 13] },
  keyRack: { draw: detective.keyRack, box: [-14, 14, -6, 13] },
  roundMirror: { draw: detective.roundMirror, box: [-12, 12, -12, 12] },
  birdcage: { draw: detective.birdcage, box: [-11, 11, -24, 14], move: { motion: (x, y) => ({ type: 'sway', angle: 5, pivot: [x, y - 24] }), period: 3.4, reach: 4 } },
  sconce: { draw: detective.sconce, box: [-9, 9, -16, 8] },
  treasureMap: { draw: detective.treasureMap, box: [-16, 16, -12, 12] },
  dartboard: { draw: detective.dartboard, box: [-12, 15, -12, 12] },
  bunting: { draw: detective.bunting, box: [-22, 22, -3, 12], move: { motion: swing(3), period: 3.6, reach: 2 } },
  photoOval: { draw: detective.photoOval, box: [-10, 10, -13, 13] },
  garlic: { draw: detective.garlic, box: [-7, 7, -6, 27] },
  pan: { draw: detective.pan, box: [-9, 9, -6, 27] },
  butterflyFrame: { draw: detective.butterflyFrame, box: [-12, 12, -10, 10] },
  antlers: { draw: detective.antlers, box: [-19, 19, -14, 9] },
  spider: { draw: detective.spider, box: [-7, 7, -24, 6], move: { motion: (x, y) => ({ type: 'sway', angle: 8, pivot: [x, y - 24] }), period: 3, reach: 5 } },
  scarfHook: { draw: (x, y, c) => detective.scarfHook(x, y, c), box: [-8, 8, -6, 26] },
  wallPhone: { draw: detective.wallPhone, box: [-11, 10, -12, 12] },
  rake: { draw: detective.rake, box: [-26, 22, -9, 0] },
  shovel: { draw: detective.shovel, box: [-10, 10, -42, 1] },
  wheelbarrow: { draw: detective.wheelbarrow, box: [-26, 14, -18, 0] },
  birdhouse: { draw: detective.birdhouse, box: [-11, 11, -43, 0] },
  mailbox: { draw: detective.mailbox, box: [-10, 13, -35, 0] },
  gnome: { draw: detective.gnome, box: [-8, 8, -25, 0] },
  beehive: { draw: detective.beehive, box: [-13, 13, -25, 0] },
  haybale: { draw: detective.haybale, box: [-15, 15, -17, 0] },
  flowerPot: { draw: detective.flowerPot, box: [-11, 11, -27, 0], move: { motion: swing(3), period: 3.4, reach: 2 } },
  cottage: { draw: detective.cottage, box: [-18, 18, -31, 0] },
  windmill: { draw: detective.windmill, box: [-12, 13, -46, 0] },
  tent: { draw: detective.tent, box: [-19, 19, -25, 0] },
  sled: { draw: detective.sled, box: [-19, 20, -12, 0] },
  snowShovel: { draw: detective.snowShovel, box: [-10, 10, -40, 1] },
  iceSkates: { draw: detective.iceSkates, box: [-15, 16, -18, 0] },
  snowballs: { draw: detective.snowballs, box: [-13, 13, -17, 0] },
  mittens: { draw: detective.mittens, box: [-12, 16, -14, 0] },
  kite: { draw: (x, y, c) => detective.kite(x, y, c), box: [-11, 11, -14, 29], move: { motion: bob(4, 3), period: 4, reach: 5 } },
  hotAirBalloon: { draw: detective.hotAirBalloon, box: [-13, 13, -21, 17], move: { motion: bob(0, 4), period: 6, reach: 4 } },
  paperPlane: { draw: detective.paperPlane, box: [-13, 13, -7, 7], move: { motion: bob(5, 3), period: 4, reach: 6 } },
  airship: { draw: detective.airship, box: [-23, 22, -8, 11], move: { motion: bob(6, 0), period: 12, reach: 6 } },
  skyLantern: { draw: detective.skyLantern, box: [-10, 10, -13, 12], move: { motion: bob(2, 4), period: 5, reach: 4 } },
  plane: { draw: detective.plane, box: [-16, 16, -9, 6], move: { motion: bob(6, 1), period: 9, reach: 6 } },
} satisfies Record<string, Kind>

export type ExtraKind = keyof typeof KINDS

/** Anti-aliasing margin of the circles. */
const MARGIN = 2

type Item = [kind: ExtraKind, x: number, y: number, color?: string]

/** One shape at its anchor: the markup (the moving ones through `anim`, their period and phase taken from the
 * place so that they never move in step) and the circle around its box and motion. */
function place(anim: SceneContext['anim'], [kind, x, y, color]: Item) {
  const { draw, box, move } = KINDS[kind] as Kind
  const [x0, x1, y0, y1] = box
  const r = Math.ceil(Math.hypot(x1 - x0, y1 - y0) / 2) + (move?.reach ?? 0) + MARGIN
  const spot = (x * 7 + y * 13) % 100
  const markup = move
    ? anim({ ...move.motion(x, y), period: move.period * (0.85 + (spot % 30) / 100), phase: spot / 100 }, draw(x, y, color))
    : draw(x, y, color)
  return { markup, x: x + (x0 + x1) / 2, y: y + (y0 + y1) / 2, r }
}

/** Draws the listed extra objects through the scene's `extra`, each in its circle. */
export function extras({ extra, anim }: Pick<SceneContext, 'extra' | 'anim'>, items: Item[]): string {
  return items
    .map((item) => {
      const { markup, x, y, r } = place(anim, item)
      return extra(x, y, r, markup)
    })
    .join('')
}

/** Draws the listed shapes as plain decor of every mode, kept clear of the zones by the level itself. */
export const decor = ({ anim }: Pick<SceneContext, 'anim'>, items: Item[]): string =>
  items.map((item) => place(anim, item).markup).join('')
