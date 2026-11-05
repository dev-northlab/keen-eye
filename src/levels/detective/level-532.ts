// "The missing chickens", scene 2 — the yard, the girl in jeans: the dog slept on its chain all night, the goose pen got a
// padlock, a shirt on the line is chewed, the wicket gate stands open, the well bucket was let down
// and grain lies along the path.
import { flower } from '../shapes.ts'
import { detectiveLevel } from '../helpers.ts'
import { cloud, fence, grass, sky } from './shapes.ts'
import { goose, grain, kennel, logHouse, rabbit, rooster, shaggyDog, villageGirl, wicket } from './village.ts'

/** Shirt pegged on the line at (x, y); `bitten` chews its hem. Bounds: x ±30, y from 0 to +50. */
const shirt = (x: number, y: number, bitten: boolean) =>
  `<path d="M${x - 22} ${y}H${x + 22}L${x + 30} ${y + 14}L${x + 22} ${y + 20}` +
  (bitten
    ? `V${y + 36}Q${x + 16} ${y + 46} ${x + 10} ${y + 38}Q${x + 4} ${y + 48} ${x - 4} ${y + 40}Q${x - 10} ${y + 50} ${x - 16} ${y + 41}Q${x - 20} ${y + 46} ${x - 22} ${y + 40}`
    : `V${y + 50}H${x - 22}`) +
  `V${y + 20}L${x - 30} ${y + 14}Z" fill="#e86a5a"/><path d="M${x - 6} ${y}L${x} ${y + 8}L${x + 6} ${y}" stroke="#fff" stroke-width="2" fill="none"/>` +
  `<rect x="${x - 14}" y="${y - 4}" width="4" height="9" fill="#c98d55"/><rect x="${x + 10}" y="${y - 4}" width="4" height="9" fill="#c98d55"/>`

/** Dog on its chain from the kennel: sitting up (A) or asleep (B). Bounds: x 362–458, y 370–466. */
const dogOnChain = (asleep: boolean) =>
  `<path d="M366 420Q396 ${asleep ? 432 : 440} ${asleep ? 432 : 430} ${asleep ? 426 : 416}" stroke="#8a8f99" stroke-width="3" stroke-dasharray="5 3" fill="none"/>` +
  shaggyDog(410, 444, asleep) +
  (asleep ? `<path d="M420 398h8l-8 8h8M434 386h6l-6 6h6" stroke="#3a6ea5" stroke-width="2.4" stroke-linejoin="round" fill="none"/>` : '')

/** The well bucket hanging under the roof (A), or the rope let down into the well (B). Bounds: x 576–604, y 324–370. */
const bucket = (down: boolean) =>
  down
    ? `<path d="M590 326V370" stroke="#7a5233" stroke-width="2.4"/>`
    : `<path d="M578 328H602L598 352H582Z" fill="#8d99ae"/><path d="M578 330Q590 320 602 330" stroke="#5c677d" stroke-width="2" fill="none"/>`

/** Bolt of the goose pen: slid open (A) or shut with a padlock (B). Bounds: x 632–668, y 400–434. */
const penBolt = (locked: boolean) =>
  locked
    ? `<rect x="636" y="406" width="30" height="7" rx="2" fill="#5e656b"/><path d="M644 418a6 6 0 0 1 12 0" stroke="#5e656b" stroke-width="3" fill="none"/><rect x="641" y="417" width="18" height="15" rx="3" fill="#e0a82a"/><circle cx="650" cy="425" r="2.4" fill="#5e3b1a"/>`
    : `<rect x="634" y="406" width="16" height="7" rx="2" fill="#5e656b"/>`

export default detectiveLevel({
  id: 532,
  case: 'chickens',
  title: 'chickensYard',
  parTimeSec: 72,
  scene: ({ clue }) =>
    sky('#c7e8ff') +
    cloud(560, 70) +
    cloud(740, 120, 0.8) +
    grass(320, '#86c95f') +
    // Log house with its door
    logHouse(40, 150, 240, 176) +
    `<rect x="218" y="236" width="44" height="90" rx="3" fill="#7a4a2a"/><circle cx="254" cy="284" r="3" fill="#f2c14e"/><rect x="210" y="322" width="60" height="8" fill="#8a8f99"/>` +
    // Back fence with the wicket gate
    fence(290, 470, 320) +
    fence(530, 800, 320) +
    clue('gateOpen', 500, 285, 47, wicket(470, 320, 60, false), wicket(470, 320, 60, true)) +
    rooster(740, 214, true) +
    // Washing line
    `<path d="M280 160L460 150" stroke="#5e656b" stroke-width="2"/><rect x="456" y="146" width="8" height="176" fill="#a06a38"/>` +
    `<rect x="296" y="158" width="30" height="40" fill="#ffd54a"/><path d="M296 190H326" stroke="#e0a82a" stroke-width="3"/>` +
    clue('laundryChewed', 380, 195, 40, shirt(380, 155, false), shirt(380, 155, true)) +
    `<path d="M418 154H446L450 196H414Z" fill="#7ab8e8"/>` +
    // Kennel and the dog
    kennel(320, 440) +
    clue('dogAsleep', 410, 418, 48, dogOnChain(false), dogOnChain(true)) +
    // The well
    `<rect x="546" y="280" width="8" height="100" fill="#8a5a2b"/><rect x="626" y="280" width="8" height="100" fill="#8a5a2b"/>` +
    `<path d="M536 284L590 250L644 284Z" fill="#7d858c"/><path d="M552 306H628" stroke="#6b4a2b" stroke-width="7"/><path d="M628 306h10v16" stroke="#5e656b" stroke-width="3" fill="none"/>` +
    `<path d="M590 306V326" stroke="#7a5233" stroke-width="2.4"/>` +
    clue('wellBucketDown', 590, 346, 28, bucket(false), bucket(true)) +
    `<ellipse cx="590" cy="376" rx="46" ry="10" fill="#2b2b38"/><path d="M544 376V440H636V376" fill="#a3a9b0"/><path d="M544 376Q590 392 636 376" stroke="#8a8f99" stroke-width="6" fill="none"/>` +
    `<path d="M556 400h24M592 412h30M552 426h28" stroke="#8a8f99" stroke-width="3"/>` +
    // Goose pen
    `<path d="M650 384V462M790 384V462M650 396H790M650 446H790" stroke="#c98d55" stroke-width="7"/>` +
    goose(722, 426) +
    clue('goosePenShut', 650, 418, 24, penBolt(false), penBolt(true)) +
    villageGirl(110, 470, 'jeans') +
    clue('grainTrail', 222, 451, 46, '', grain(200, 456, 36) + grain(246, 446, 30)) +
    rabbit(304, 486) +
    flower(30, 470, '#ff6b8b') +
    flower(500, 476, '#b38cff') +
    flower(540, 488, '#ffffff'),
})
