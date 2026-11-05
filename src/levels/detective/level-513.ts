// "The broken vase", scene 3 — the museum storeroom: a cobweb over the cleaner's bucket (unused all
// day), the glue tube taken, a box opened, a torn backpack strap on a nail, tape unrolled, the light
// bulb off and sneaker prints in the dust.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { box, cobweb, sneaker } from './shapes.ts'

const glue = (x: number, y: number) =>
  `<path d="M${x - 14} ${y - 6}H${x + 8}L${x + 13} ${y - 3}V${y + 3}L${x + 8} ${y + 6}H${x - 14}Z" fill="#fff"/>` +
  `<rect x="${x + 13}" y="${y - 3}" width="5" height="6" fill="#e5484d"/><rect x="${x - 10}" y="${y - 3}" width="12" height="6" fill="#f2b632"/>`

/** Strip of tape pulled off the roll at (600, 280), over the bench's edge. Bounds: x 602–648, y 286–336. */
const tapeStrip = () =>
  `<path d="M606 290Q620 294 640 292L646 296Q648 316 644 332" fill="none" stroke="#e8d9a8" stroke-width="7" stroke-linejoin="round"/>`

/** Piece of a blue backpack strap with its buckle, caught on the nail at (424, 250). Bounds: x 418–442, y 246–282. */
const strap = () =>
  `<path d="M424 250L428 278L438 276L434 250Z" fill="#3a6ea5"/><path d="M428 278l2 4l6 -1l2 -5" fill="none" stroke="#3a6ea5" stroke-width="2"/>` +
  `<rect x="426" y="256" width="12" height="8" rx="2" fill="none" stroke="#2b2b38" stroke-width="2"/>`

const bulb = (on: boolean) =>
  (on ? `<circle cx="560" cy="126" r="22" fill="#ffd54a" fill-opacity="0.35"/>` : '') +
  `<circle cx="560" cy="126" r="10" fill="${on ? '#fff3b0' : '#b8bcc4'}"/><rect x="555" y="110" width="10" height="8" fill="#8a8f99"/>`

export default detectiveLevel({
  id: 513,
  case: 'vase',
  title: 'vaseStoreroom',
  parTimeSec: 84,
  scene: ({ clue, anim, extra }) =>
    `<rect width="800" height="380" fill="#d9d2c3"/><rect y="380" width="800" height="120" fill="#a9a39a"/><path d="M0 380H800" stroke="#8f8a80" stroke-width="5"/>` +
    // The cleaner's closet, door open: bucket and mop inside
    `<rect x="30" y="180" width="140" height="200" fill="#5e5a54"/><rect x="24" y="174" width="152" height="8" fill="#8a8f99"/>` +
    `<path d="M170 180L210 196V368L170 380Z" fill="#9aa3ad"/>` +
    `<path d="M76 340L130 206" stroke="#a8743f" stroke-width="6" stroke-linecap="round"/>` +
    `<path d="M74 336H126L120 380H80Z" fill="#5b8db8"/><ellipse cx="100" cy="336" rx="26" ry="6" fill="#3f6f99"/>` +
    clue('bucketCobweb', 100, 320, 34, '', `<g transform="translate(100 320) scale(0.7) translate(-100 -320)">${cobweb(100, 320)}</g>`) +
    // Metal shelving with boxes
    `<path d="M224 110V380M416 110V380" stroke="#8a8f99" stroke-width="8"/>` +
    [160, 250, 340].map((y) => `<rect x="220" y="${y}" width="200" height="8" fill="#8a8f99"/>`).join('') +
    box(236, 160, 54, 44) +
    clue('boxOpen', 335, 132, 54, box(310, 160, 50, 40), box(310, 160, 50, 40, true)) +
    box(240, 250, 80, 50) +
    box(330, 250, 70, 40) +
    box(250, 340, 140, 60) +
    `<circle cx="424" cy="250" r="3" fill="#5b6b7a"/>` +
    clue('strapOnNail', 430, 264, 24, '', strap()) +
    // Workbench
    `<rect x="480" y="300" width="12" height="80" fill="#8a5a2b"/><rect x="688" y="300" width="12" height="80" fill="#8a5a2b"/><rect x="470" y="290" width="240" height="14" rx="3" fill="#a8743f"/>` +
    clue('glueGone', 520, 283, 22, glue(520, 283), '') +
    `<circle cx="600" cy="278" r="12" fill="#e8d9a8"/><circle cx="600" cy="278" r="5" fill="#a8743f"/>` +
    clue('tapeUnrolled', 626, 311, 34, '', tapeStrip()) +
    `<rect x="650" y="262" width="34" height="28" rx="3" fill="#5b6b7a"/><path d="M656 262v-8h22v8" fill="none" stroke="#5b6b7a" stroke-width="4"/>` +
    // The light
    `<path d="M560 0V110" stroke="#444" stroke-width="2"/>` +
    clue('bulbOff', 560, 124, 26, bulb(true), bulb(false)) +
    // Ladder against the wall
    `<path d="M730 380L746 130M776 380L792 130" stroke="#c69563" stroke-width="8"/>` +
    [170, 220, 270, 320, 360].map((y) => `<path d="M${730 + ((380 - y) * 16) / 250} ${y}h46" stroke="#c69563" stroke-width="6"/>`).join('') +
    clue('sneakerPrints', 450, 438, 38, '', sneaker(438, 448) + sneaker(462, 430)) +
    // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
    decor({ anim }, [
      ['bucket', 38, 486],
      ['wallPhone', 39, 55],
      ['roundMirror', 465, 325],
      ['calendar', 743, 87],
      ['boots', 746, 442],
    ]) +
    extras({ extra, anim }, [
      ['puppy', 138, 434, '#8a5a2b'],
      ['photoOval', 163, 141],
      ['fireExtinguisher', 252, 490],
      ['cactus', 338, 418],
      ['sconce', 427, 89],
      ['mouse', 532, 469, '#b9a58a'],
      ['keyRack', 582, 54],
      ['cuckooClock', 587, 223],
      ['hatBox', 632, 416],
      ['butterflyFrame', 760, 253],
    ]),
})
