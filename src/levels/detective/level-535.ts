// "The missing chickens", scene 5 — the meadow by the stream: the chickens are found pecking grain, an
// empty grain sack lies on the grass, the goat has grain on her muzzle, the daisies are eaten, the
// berry basket is tipped over and a plank of the footbridge is out of place.
import { basket, flower, hen } from '../shapes.ts'
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { bush, cloud, grass, sky, sun, tree } from './shapes.ts'
import { flutter, flyingBirds, goatBody, goatHead, grain, pecking, ripples, rooster, sunRays, swimmingDuck, villageGirl } from './village.ts'

const smallHen = (x: number, y: number, flip: boolean, color: string) => `<g transform="translate(${x} ${y}) scale(0.7)">${hen(0, 0, flip, color)}</g>`

/** Footbridge plank at x 632: in line (A) or slipped askew (B). Bounds: x 620–660, y 272–332. */
const plank = (moved: boolean) => `<rect x="632" y="278" width="12" height="44" rx="2" fill="#c98d55" stroke="#8a5a2b" stroke-width="1.5"${moved ? ' transform="rotate(16 638 300) translate(4 6)"' : ''}/>`

/** Berry basket: standing (A) or tipped over with the berries rolled out (B). Bounds: x 442–534, y 352–410. */
const berries = (tipped: boolean) =>
  tipped
    ? `<g transform="rotate(-70 480 390)">${basket(480, 390, '#d9384a')}</g><g fill="#d9384a"><circle cx="506" cy="392" r="5"/><circle cx="518" cy="386" r="5"/><circle cx="528" cy="392" r="5"/><circle cx="514" cy="376" r="5"/></g>`
    : basket(480, 390, '#d9384a')

/** Daisies: in bloom (A) or nibbled down to the stems (B). Bounds: x 698–766, y 426–474. */
const daisies = (eaten: boolean) =>
  [[708, 474], [726, 466], [744, 476], [756, 462], [718, 456]]
    .map(([x, y]) => (eaten ? `<path d="M${x} ${y}V${y - 10}" stroke="#3f8f3a" stroke-width="3"/>` : flower(x, y, '#ffffff')))
    .join('')

export default detectiveLevel({
  id: 535,
  case: 'chickens',
  title: 'chickensMeadow',
  parTimeSec: 78,
  scene: ({ clue, anim, extra }) =>
    sky('#bfe6ff') +
    anim({ type: 'rotate', pivot: [640, 70], period: 40 }, sunRays(640, 70)) +
    sun(640, 70) +
    anim({ type: 'path', points: [[0, 0], [60, 0]], period: 40 }, cloud(200, 70)) +
    anim({ type: 'path', points: [[0, 0], [-50, 0]], period: 34 }, cloud(440, 110, 0.8)) +
    flyingBirds(anim, 140, 40, 280, 28) +
    grass(260, '#8cd068') +
    anim({ type: 'sway', angle: 1.5, pivot: [380, 262], period: 5 }, tree(380, 262)) +
    anim({ type: 'sway', angle: 1.5, pivot: [740, 262], period: 5.6 }, tree(740, 262)) +
    bush(90, 300, '#3f8f4b') +
    `<g fill="#d9384a"><circle cx="60" cy="270" r="4"/><circle cx="96" cy="262" r="4"/><circle cx="122" cy="280" r="4"/><circle cx="80" cy="288" r="4"/></g>` +
    // The stream with ducks and the footbridge
    `<path d="M430 296Q600 270 800 284V316Q600 302 430 326Z" fill="#7cc6e8"/>` +
    ripples(anim, 540, 312, '#e8f6ff') +
    swimmingDuck(anim, 500, 304, 70, 14) +
    swimmingDuck(anim, 700, 294, 70, 12, 0.5) +
    `<g fill="#c98d55" stroke="#8a5a2b" stroke-width="1.5"><rect x="604" y="278" width="12" height="44" rx="2"/><rect x="618" y="278" width="12" height="44" rx="2"/><rect x="646" y="278" width="12" height="44" rx="2"/></g>` +
    clue('plankMoved', 638, 300, 30, plank(false), plank(true)) +
    // The girl waving, the rooster, the found chickens
    villageGirl(150, 460, 'sundress', anim, true) +
    pecking(anim, 230, 476, rooster(230, 450, true), 12, 2.2) +
    clue('chickensFound', 317, 418, 66, '', pecking(anim, 280, 442, smallHen(280, 424, false, '#ffffff'), 16, 1.4) + pecking(anim, 318, 430, smallHen(318, 412, true, '#c9884a'), 16, 1.7, 0.3) + pecking(anim, 354, 444, smallHen(354, 426, false, '#e8d7b8'), 16, 1.5, 0.6) + grain(318, 448, 50)) +
    clue('basketTipped', 490, 378, 56, berries(false), berries(true)) +
    clue('sackEmpty', 410, 460, 34, '', `<path d="M384 466Q386 450 404 452L434 448Q440 458 434 468Q410 476 384 466Z" fill="#c9a66b"/><path d="M434 448q6 10 0 20" stroke="#7a5233" stroke-width="2" fill="none"/>`) +
    // The goat grazing by the stream, her bell lost in the barn
    // The goat grazes: the grain on her beard moves with her head
    goatBody(600, 400, false) +
    anim({ id: 'goatHead', type: 'sway', angle: 20, pivot: [616, 394], period: 3.2 }, goatHead(600, 400) + clue('grainOnBeard', 642, 382, 22, '', grain(642, 382, 14), 'goatHead')) +
    flutter(anim, 250, 340, '#ffd23f') +
    flutter(anim, 740, 380, '#ff8fab', true, 10) +
    clue('daisiesEaten', 732, 450, 44, daisies(false), daisies(true)) +
    anim({ type: 'sway', angle: 7, pivot: [40, 480], period: 2.8 }, flower(40, 480, '#ff6b8b')) +
    anim({ type: 'sway', angle: 7, pivot: [560, 480], period: 3.2 }, flower(560, 480, '#b38cff')) +
    anim({ type: 'sway', angle: 7, pivot: [470, 486], period: 3 }, flower(470, 486, '#ff9f43')) +
    // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
    decor({ anim }, [
      ['wateringCan', 98, 482],
      ['haybale', 233, 350],
      ['molehill', 533, 484],
      ['gnome', 586, 363],
      ['bucket', 648, 486],
    ]) +
    extras({ extra, anim }, [
      ['swallow', 48, 31],
      ['flowerPot', 51, 392],
      ['beehive', 196, 413],
      ['crow', 203, 485],
      ['hotAirBalloon', 220, 138],
      ['sparrow', 396, 349],
      ['dragonfly', 430, 65],
      ['scooter', 592, 462],
      ['mouse', 712, 349, '#b9a58a'],
      ['paperPlane', 752, 51],
    ]),
})
