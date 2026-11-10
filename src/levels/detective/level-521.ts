// "The night train mystery", scene 1 — the countess's compartment: the pearl necklace gone from its
// case, the window let down, small handprints on the glass, tea spilled, only the lowest drawer pulled
// out, a candy wrapper on the carpet, the suitcase unstrapped, the hatbox tipped and a pillow fallen.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { smallHand, windowBox } from './shapes.ts'

/** Bench with a high back; x from `x` to `x + w`, seat at y 316. */
const bench = (x: number, w: number) =>
  `<rect x="${x}" y="170" width="${w}" height="150" rx="12" fill="#b83236"/>` +
  `<path d="${[1, 2, 3].map((i) => `M${x + (w * i) / 4} 186V304`).join('')}" stroke="#8f2427" stroke-width="3"/>` +
  `<rect x="${x - 10}" y="316" width="${w + 20}" height="30" rx="10" fill="#d0453f"/><rect x="${x}" y="346" width="${w}" height="34" fill="#8f2427"/>`

/** Luggage rack at y 128 from x1 to x2. */
const rack = (x1: number, x2: number) =>
  `<path d="M${x1} 128H${x2}M${x1} 134H${x2}" stroke="#c9953f" stroke-width="3"/><path d="M${x1 + 10} 134l-10 20M${x2 - 10} 134l10 20" stroke="#c9953f" stroke-width="4"/>`

/** Suitcase on the left rack: strapped shut (A) or unstrapped, a sleeve sticking out (B). Bounds: x 56–154, y 74–132. */
const suitcase = (strapped: boolean) =>
  strapped
    ? `<path d="M82 78V124M128 78V124" stroke="#5e3b1a" stroke-width="6"/><rect x="99" y="96" width="12" height="9" rx="2" fill="#f2c14e"/>`
    : `<path d="M60 92H150" stroke="#5e3b1a" stroke-width="3"/><path d="M144 90q10 10 8 26l-8 -2q2 -12 -6 -22Z" fill="#f28fb1"/>` +
      `<path d="M82 92V124q-4 4 -8 6M128 92V124q4 4 8 6" stroke="#5e3b1a" stroke-width="6" fill="none"/><rect x="99" y="100" width="12" height="9" rx="2" fill="#f2c14e" transform="rotate(30 105 104)"/>`

const candy = (x: number, y: number) =>
  `<g transform="rotate(-20 ${x} ${y})"><path d="M${x - 16} ${y - 7}L${x - 6} ${y}L${x - 16} ${y + 7}ZM${x + 16} ${y - 7}L${x + 6} ${y}L${x + 16} ${y + 7}Z" fill="#e8457a"/>` +
  `<rect x="${x - 7}" y="${y - 5}" width="14" height="10" rx="4" fill="#f2c14e"/></g>`

/** Bottom drawer of the cabinet: shut (A) or pulled out, a sock hanging over its edge (B). Bounds: x 362–438, y 344–402. */
const drawer = (open: boolean) =>
  open
    ? `<rect x="366" y="344" width="68" height="10" fill="#3b2a1a"/><rect x="362" y="352" width="76" height="48" rx="3" fill="#a8743f"/><circle cx="400" cy="376" r="4" fill="#f2c14e"/>` +
      `<path d="M378 352v14h-8v-6" stroke="#5b8db8" stroke-width="6" fill="none" stroke-linejoin="round"/>`
    : `<rect x="366" y="346" width="68" height="44" rx="3" fill="#8a5a2b"/><circle cx="400" cy="368" r="4" fill="#f2c14e"/>`

/** Hatbox on the right rack: upright (A) or tipped on its side (B). Bounds: x 604–664, y 86–126. */
const hatbox = (upright: boolean) =>
  upright
    ? `<rect x="618" y="92" width="44" height="34" fill="#f28fb1"/><rect x="618" y="104" width="44" height="6" fill="#fff"/><ellipse cx="640" cy="92" rx="22" ry="6" fill="#f7b3c8"/>`
    : `<rect x="610" y="100" width="52" height="26" fill="#f28fb1"/><rect x="630" y="100" width="6" height="26" fill="#fff"/><ellipse cx="610" cy="113" rx="6" ry="13" fill="#f7b3c8"/>`

const pillow = (x: number, y: number, a: number) =>
  `<rect x="${x - 22}" y="${y - 11}" width="44" height="22" rx="10" fill="#f2c14e" transform="rotate(${a} ${x} ${y})"/>`

export default detectiveLevel({
  id: 521,
  case: 'train',
  title: 'trainCompartment',
  parTimeSec: 108,
  scene: ({ clue, anim, extra }) =>
    `<rect width="800" height="380" fill="#8a5a2b"/>` +
    [0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${i * 100 + 8}" y="12" width="84" height="140" rx="6" fill="#000" fill-opacity="0.08"/>`).join('') +
    `<rect y="380" width="800" height="120" fill="#5b3a4a"/><rect x="260" y="390" width="280" height="110" fill="#8e2f45"/><path d="M276 390V500M524 390V500" stroke="#f2c14e" stroke-width="3"/>` +
    // Night window
    windowBox(340, 70, 120, 150, '#1f2a4a') +
    `<circle cx="428" cy="104" r="12" fill="#fff3b0"/><path d="M348 212V176Q380 160 410 178T452 170V212Z" fill="#14203a"/>` +
    `<rect x="348" y="128" width="104" height="84" fill="#e8f6ff" fill-opacity="0.18"/><rect x="348" y="122" width="104" height="7" fill="#fff"/>` +
    clue('windowOpen', 400, 100, 57, `<rect x="348" y="78" width="104" height="44" fill="#e8f6ff" fill-opacity="0.35"/><path d="M360 112l20 -24M384 112l14 -18" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`, '') +
    clue('smallHandprints', 394, 190, 20, '', smallHand(386, 196) + smallHand(402, 188)) +
    // Cabinet under the window with the tea
    `<rect x="360" y="244" width="80" height="156" fill="#6b4a2b"/><rect x="350" y="236" width="100" height="10" rx="3" fill="#5e3b1a"/>` +
    [254, 300].map((y) => `<rect x="366" y="${y}" width="68" height="40" rx="3" fill="#8a5a2b"/><circle cx="400" cy="${y + 20}" r="4" fill="#f2c14e"/>`).join('') +
    clue('lowDrawer', 400, 374, 50, drawer(false), drawer(true)) +
    `<path d="M372 236v-16h12v16" fill="#f2c14e"/><path d="M366 220h24l-4 -12h-16Z" fill="#fff3b0"/>` +
    clue(
      'teaSpilled',
      446,
      227,
      26,
      `<ellipse cx="446" cy="235" rx="18" ry="3" fill="#fff"/><path d="M436 214H456V226Q456 234 446 234Q436 234 436 226Z" fill="#fff"/><rect x="439" y="216" width="14" height="4" fill="#a8743f"/>`,
      `<ellipse cx="452" cy="237" rx="16" ry="3" fill="#a8743f"/><path d="M430 222H446Q456 222 456 229Q456 236 446 236H430Z" fill="#fff"/>`,
    ) +
    // The benches and racks
    bench(20, 230) +
    rack(20, 260) +
    `<rect x="60" y="78" width="90" height="46" rx="6" fill="#a8743f"/><path d="M95 78v-8h20v8" fill="none" stroke="#5e3b1a" stroke-width="4"/>` +
    clue('suitcaseOpen', 105, 100, 55, suitcase(true), suitcase(false)) +
    `<rect x="176" y="96" width="50" height="28" rx="5" fill="#5b8db8"/>` +
    bench(550, 230) +
    rack(540, 780) +
    `<rect x="690" y="100" width="60" height="24" rx="4" fill="#3f9b6b"/>` +
    clue('hatboxTipped', 634, 106, 36, hatbox(true), hatbox(false)) +
    // The countess's jewel case on the seat
    `<path d="M594 298L600 270H640L646 298Z" fill="#2a5585"/><rect x="594" y="296" width="52" height="22" rx="3" fill="#3a6ea5"/><rect x="598" y="298" width="44" height="12" fill="#e8457a"/>` +
    clue('pearlsGone', 620, 304, 24, `<g fill="#fffaf0" stroke="#c9c2b6" stroke-width="0.8">${[602, 608, 614, 620, 626, 632, 638].map((x, i) => `<circle cx="${x}" cy="${303 + Math.sin(i / 2) * 3}" r="3.2"/>`).join('')}</g>`, '') +
    clue('pillowFallen', 730, 354, 60, pillow(729, 311, 0), pillow(731, 397, -12)) +
    `<rect x="40" y="290" width="40" height="26" rx="10" fill="#f2c14e"/>` +
    clue('candyWrapper', 300, 440, 22, '', candy(300, 440)) +
    // Wall lamp
    `<path d="M510 140h14v-30" stroke="#c9953f" stroke-width="4" fill="none"/><path d="M510 110L538 110L532 90H516Z" fill="#fff3b0"/>` +
    // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
    decor({ anim }, [
      ['newspapers', 43, 468],
      ['wallPhone', 194, 55],
      ['sconce', 502, 74],
      ['bucket', 553, 486],
      ['dartboard', 705, 65],
    ]) +
    extras({ extra, anim }, [
      ['pouf', 123, 464, '#e5484d'],
      ['butterflyFrame', 190, 148],
      ['hatBox', 207, 476, '#f7a1c4'],
      ['spider', 290, 122],
      ['treasureMap', 559, 150],
      ['cactus', 598, 473],
      ['mouse', 652, 459, '#b9a58a'],
      ['globe', 698, 487],
      ['fireExtinguisher', 752, 475],
      ['keyRack', 757, 149],
    ]),
})
