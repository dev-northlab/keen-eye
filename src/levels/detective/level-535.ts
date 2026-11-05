// "The missing chickens", scene 5 — the meadow by the stream: the chickens are found pecking grain, an
// empty grain sack lies on the grass, the goat has grain on her muzzle, the daisies are eaten, the
// berry basket is tipped over and a plank of the footbridge is out of place.
import { basket, flower, hen } from '../shapes.ts'
import { detectiveLevel } from '../helpers.ts'
import { bush, cloud, grass, sky, sun, tree } from './shapes.ts'
import { goat, grain, rooster, villageGirl, whiteDuck } from './village.ts'

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
  scene: ({ clue }) =>
    sky('#bfe6ff') +
    sun(640, 70) +
    cloud(200, 70) +
    cloud(440, 110, 0.8) +
    grass(260, '#8cd068') +
    tree(380, 262) +
    tree(740, 262) +
    bush(90, 300, '#3f8f4b') +
    `<g fill="#d9384a"><circle cx="60" cy="270" r="4"/><circle cx="96" cy="262" r="4"/><circle cx="122" cy="280" r="4"/><circle cx="80" cy="288" r="4"/></g>` +
    // The stream with ducks and the footbridge
    `<path d="M430 296Q600 270 800 284V316Q600 302 430 326Z" fill="#7cc6e8"/>` +
    whiteDuck(520, 302) +
    whiteDuck(752, 294, true) +
    `<g fill="#c98d55" stroke="#8a5a2b" stroke-width="1.5"><rect x="604" y="278" width="12" height="44" rx="2"/><rect x="618" y="278" width="12" height="44" rx="2"/><rect x="646" y="278" width="12" height="44" rx="2"/></g>` +
    clue('plankMoved', 638, 300, 30, plank(false), plank(true)) +
    // The girl waving, the rooster, the found chickens
    villageGirl(150, 460, 'sundress', true) +
    rooster(230, 450, true) +
    clue('chickensFound', 317, 418, 66, '', smallHen(280, 424, false, '#ffffff') + smallHen(318, 412, true, '#c9884a') + smallHen(354, 426, false, '#e8d7b8') + grain(318, 448, 50)) +
    clue('basketTipped', 490, 378, 56, berries(false), berries(true)) +
    clue('sackEmpty', 410, 460, 34, '', `<path d="M384 466Q386 450 404 452L434 448Q440 458 434 468Q410 476 384 466Z" fill="#c9a66b"/><path d="M434 448q6 10 0 20" stroke="#7a5233" stroke-width="2" fill="none"/>`) +
    // The goat grazing by the stream, her bell lost in the barn
    goat(600, 400, false, false) +
    clue('grainOnBeard', 642, 382, 22, '', grain(642, 382, 14)) +
    clue('daisiesEaten', 732, 450, 44, daisies(false), daisies(true)) +
    flower(40, 480, '#ff6b8b') +
    flower(560, 480, '#b38cff') +
    flower(470, 486, '#ff9f43'),
})
