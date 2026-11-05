// "The broken vase", scene 1 — the museum hall: the vase is gone from its stand, shards on the floor,
// the rope unhooked, sneaker prints, a painting knocked crooked, a museum map dropped on the bench and
// the spotlight switched off.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { hills, picture, shards, sneaker, spotlight, tiles, vase } from './shapes.ts'

const column = (x: number) =>
  `<rect x="${x}" y="40" width="50" height="330" fill="#f8f3ea"/><path d="M${x + 12} 50V360M${x + 25} 50V360M${x + 38} 50V360" stroke="#e1d8c8" stroke-width="3"/>` +
  `<rect x="${x - 8}" y="28" width="66" height="16" fill="#e1d8c8"/><rect x="${x - 8}" y="360" width="66" height="14" fill="#e1d8c8"/>`

/** Brass rope post standing on y. */
const post = (x: number, y: number) =>
  `<rect x="${x - 3}" y="${y - 72}" width="6" height="72" fill="#c9953f"/><ellipse cx="${x}" cy="${y}" rx="14" ry="4" fill="#c9953f"/><circle cx="${x}" cy="${y - 74}" r="6" fill="#e0b030"/>`
/** Red velvet rope between posts at 250 and 320 (A) or unhooked, hanging from the left one (B). Bounds: x 248–318, y 326–398. */
const rope = (hooked: boolean) =>
  `<path d="${hooked ? 'M254 328Q285 360 316 328' : 'M254 328Q250 372 266 396'}" stroke="#b83236" stroke-width="5" fill="none" stroke-linecap="round"/>`

/** Folded museum map. Bounds: ±20. */
const museumMap = (x: number, y: number) =>
  `<g transform="rotate(-8 ${x} ${y})"><path d="M${x - 18} ${y - 10}L${x - 6} ${y - 7}L${x + 6} ${y - 10}L${x + 18} ${y - 7}V${y + 9}L${x + 6} ${y + 6}L${x - 6} ${y + 9}L${x - 18} ${y + 6}Z" fill="#fff"/>` +
  `<path d="M${x - 6} ${y - 7}V${y + 9}M${x + 6} ${y - 10}V${y + 6}" stroke="#c9c2b6" stroke-width="1.5"/><rect x="${x - 14}" y="${y - 3}" width="7" height="5" fill="#7cc25a"/><rect x="${x + 8}" y="${y - 4}" width="6" height="7" fill="#e5484d"/></g>`

const bench = () =>
  `<rect x="90" y="358" width="140" height="12" rx="4" fill="#8a5a2b"/><rect x="100" y="370" width="10" height="34" fill="#5e3b1a"/><rect x="210" y="370" width="10" height="34" fill="#5e3b1a"/>`

export default detectiveLevel({
  id: 511,
  case: 'vase',
  title: 'vaseHall',
  parTimeSec: 80,
  scene: ({ clue, anim, extra }) =>
    `<rect width="800" height="500" fill="#efe6d8"/><rect y="370" width="800" height="130" fill="#e4dccd"/>` +
    tiles(370, '#d6cdbd', '#cfc6b6') +
    `<rect y="360" width="800" height="10" fill="#d6cdbd"/>` +
    column(20) +
    column(730) +
    anim({ type: 'blink', duty: 0.3, period: 1.4 }, `<circle cx="116" cy="40" r="5" fill="#e5484d"/>`) +
    `<rect x="100" y="30" width="22" height="16" rx="3" fill="#5b6b7a"/>` +
    picture(180, 160, 90, 70, hills(90, 70)) +
    clue('spotlightOff', 650, 64, 24, spotlight(650, 64, true), spotlight(650, 64, false)) +
    clue(
      'paintingCrooked',
      650,
      165,
      56,
      picture(650, 165, 70, 56, `<circle cy="4" r="16" fill="#e8457a"/><path d="M-8 -2a6 6 0 0 1 16 0" fill="#3f9b4b"/>`),
      `<g transform="rotate(9 650 165)">${picture(650, 165, 70, 56, `<circle cy="4" r="16" fill="#e8457a"/><path d="M-8 -2a6 6 0 0 1 16 0" fill="#3f9b4b"/>`)}</g>`,
    ) +
    // The pedestal
    `<rect x="364" y="252" width="72" height="118" fill="#f8f3ea"/><rect x="352" y="244" width="96" height="12" rx="3" fill="#e1d8c8"/><rect x="352" y="364" width="96" height="10" fill="#e1d8c8"/>` +
    clue('vaseGone', 400, 198, 52, vase(400, 244), '') +
    post(250, 400) +
    post(320, 400) +
    clue('ropeDown', 285, 360, 48, rope(true), rope(false)) +
    post(490, 400) +
    post(560, 400) +
    `<path d="M494 328Q525 360 556 328" stroke="#b83236" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    bench() +
    clue('mapDropped', 150, 348, 26, '', museumMap(150, 348)) +
    clue('shards', 470, 436, 34, '', shards(470, 436)) +
    clue('sneakerPrints', 640, 438, 36, '', sneaker(630, 446) + sneaker(650, 432)) +
    // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
    decor({ anim }, [
      ['newspapers', 43, 478],
      ['roundMirror', 295, 240],
      ['bucket', 363, 461],
      ['scarfHook', 716, 79, '#7b5ea7'],
      ['fireExtinguisher', 757, 490],
    ]) +
    extras({ extra, anim }, [
      ['butterflyFrame', 90, 248],
      ['bunting', 122, 53],
      ['wateringCan', 153, 437],
      ['mouse', 257, 479],
      ['sconce', 332, 59],
      ['wallPhone', 494, 265],
      ['photoOval', 533, 61],
      ['pouf', 563, 484, '#e5484d'],
      ['treasureMap', 709, 310],
      ['boots', 711, 412, '#e5484d'],
    ]),
})
