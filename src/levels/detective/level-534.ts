// "The missing chickens", scene 4 — the barn, the girl in a checked shirt and boots: the hay is scattered, a little golden bell lies in the hay
// pile, a ladder rung is broken, the lantern went out, the milk bucket is spilt and the horse's oats
// are eaten from the trough.
import { bucket, cat, horseshoe } from '../shapes.ts'
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { lantern } from './shapes.ts'
import { flyingBirds, horseHead, pecking, planks, villageGirl } from './village.ts'

/** Ladder up to the loft; the rung at y 270 is drawn by the clue. */
const ladder = () =>
  `<path d="M470 128V380M500 128V380" stroke="#a06a38" stroke-width="7"/>` +
  `<path d="${[150, 180, 210, 240, 300, 330, 360].map((y) => `M470 ${y}H500`).join('')}" stroke="#a06a38" stroke-width="5"/>`
/** The rung at y 270: whole (A) or snapped with one half hanging (B). Bounds: x 466–504, y 264–292. */
const rung = (broken: boolean) =>
  broken ? `<path d="M470 270H480M500 270L492 288" stroke="#a06a38" stroke-width="5" stroke-linecap="round"/>` : `<path d="M470 270H500" stroke="#a06a38" stroke-width="5"/>`

/** Milk bucket standing (A) or tipped over in a puddle of milk (B). Bounds: x 348–428, y 418–470. */
const milkBucket = (tipped: boolean) =>
  tipped ? `<ellipse cx="402" cy="462" rx="24" ry="6" fill="#fffaf0"/><g transform="rotate(-90 380 450)">${bucket(380, 450)}</g>` : bucket(380, 450) + `<ellipse cx="380" cy="427" rx="13" ry="3" fill="#fffaf0"/>`

/** Loose hay tufts on the floor. Bounds: x 560–644, y 410–440. */
const tufts = () =>
  `<path d="M562 432q10 -14 22 -2M576 436q8 -12 18 0M600 424q12 -12 22 0M614 438q10 -10 20 0M588 416q8 -6 16 2M626 418q8 -8 16 2" stroke="#e0b040" stroke-width="3" fill="none" stroke-linecap="round"/>`

/** Goat's golden bell on a red ribbon. Bounds: ±16. */
const bell = (x: number, y: number) =>
  `<path d="M${x - 14} ${y - 8}Q${x} ${y - 2} ${x + 14} ${y - 10}" stroke="#d32f3a" stroke-width="3" fill="none"/>` +
  `<path d="M${x - 8} ${y + 8}Q${x - 8} ${y - 8} ${x} ${y - 8}Q${x + 8} ${y - 8} ${x + 8} ${y + 8}Z" fill="#f2b632" stroke="#c98a10" stroke-width="1.4"/><circle cx="${x}" cy="${y + 10}" r="2.6" fill="#c98a10"/>`

export default detectiveLevel({
  id: 534,
  case: 'chickens',
  title: 'chickensBarn',
  parTimeSec: 76,
  scene: ({ clue, anim, extra }) =>
    planks(0, 0, 800, 380) +
    `<rect y="380" width="800" height="120" fill="#d9b56a"/><path d="M40 410h30M150 460h24M260 420h20M520 470h26M700 450h30M740 400h20" stroke="#c09440" stroke-width="3" stroke-linecap="round"/>` +
    // Beam, loft and its hay
    `<rect y="104" width="800" height="16" fill="#6b4a2b"/><rect x="520" y="120" width="280" height="18" fill="#8a5a2b"/><rect x="520" y="138" width="12" height="242" fill="#6b4a2b"/>` +
    `<path d="M560 104Q600 60 660 64Q740 60 780 104Z" fill="#f2c14e"/>` +
    anim({ type: 'sway', angle: 6, pivot: [600, 104], period: 3.4 }, cat(600, 104, '#8a8f99')) +
    // Window with daylight
    `<rect x="600" y="160" width="90" height="70" fill="#bfe6ff" stroke="#6b4a2b" stroke-width="6"/><path d="M645 160V230M600 195H690" stroke="#6b4a2b" stroke-width="4"/>` +
    clue('lanternOut', 360, 142, 26, lantern(360, 120, true), lantern(360, 120, false)) +
    `<path d="M360 112V128" stroke="#2b2b38" stroke-width="2"/>` +
    horseshoe(280, 180) +
    // Horse stall and its trough
    `<rect x="30" y="200" width="180" height="180" fill="#5e3b1a"/>` +
    pecking(anim, 140, 304, horseHead(140, 304), 7, 3) +
    `<rect x="30" y="300" width="180" height="80" fill="#a06a38" stroke="#6b4a2b" stroke-width="3"/><path d="M34 304L206 376" stroke="#c98d55" stroke-width="7"/>` +
    `<path d="M222 350H308L300 378H230Z" fill="#8a5a2b"/>` +
    villageGirl(170, 470, 'flannel', anim) +
    // Swallows under the roof
    flyingBirds(anim, 120, 70, 300, 20) +
    clue('troughEmpty', 265, 346, 36, `<path d="M228 352Q265 332 302 352Z" fill="#e8c27a"/><path d="M244 346h4M262 342h4M280 346h4" stroke="#c09440" stroke-width="2"/>`, '') +
    // The ladder up to the loft
    ladder() +
    clue('ladderRungBroken', 485, 274, 24, rung(false), rung(true)) +
    // Hay pile
    `<path d="M560 382Q580 286 662 276Q752 284 782 382Z" fill="#f2c14e"/><path d="M600 340q16 -10 30 0M660 310q16 -10 30 0M690 360q16 -10 30 0M620 368q14 -8 26 0" stroke="#d9a43a" stroke-width="3" fill="none"/>` +
    clue('bellInHay', 704, 334, 22, '', bell(704, 334)) +
    clue('hayScattered', 602, 425, 46, '', tufts()) +
    clue('milkSpilled', 388, 444, 48, milkBucket(false), milkBucket(true)) +
    // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
    decor({ anim }, [
      ['bucket', 68, 456],
      ['garlic', 320, 189],
      ['wallPhone', 409, 330],
      ['keyRack', 462, 54],
      ['boots', 491, 477, '#4fa3c7'],
    ]) +
    extras({ extra, anim }, [
      ['spider', 135, 117],
      ['shovel', 138, 455],
      ['wateringCan', 208, 437, '#4c9a52'],
      ['mouse', 277, 454, '#b9a58a'],
      ['sconce', 282, 59],
      ['rake', 509, 397],
      ['birdcage', 558, 246],
      ['crow', 703, 480],
      ['sparrow', 721, 404],
      ['owl', 745, 135],
    ]),
})
