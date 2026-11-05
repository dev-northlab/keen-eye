// "The cheese shop mystery", scene 5 — the rooftop: a nest of shiny things on the chimney, cheese rind
// on the tiles, the antenna bent, the weather vane turned, a brick fallen out and a coin in the gutter.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { cloud, sky, sun } from './shapes.ts'

function roof() {
  let s = `<rect y="240" width="800" height="210" fill="#c0603a"/>`
  for (let y = 270; y < 450; y += 30)
    s += `<path d="M0 ${y}${Array.from({ length: 20 }, () => 'q20 14 40 0').join('')}" fill="none" stroke="#a24d2e" stroke-width="3"/>`
  return s + `<rect y="232" width="800" height="14" rx="4" fill="#8a3b2a"/>`
}

/** TV antenna's top bar: straight (A) or bent down (B). Bounds: x 160–240, y 92–132. */
const antennaTop = (bent: boolean) =>
  bent
    ? `<path d="M200 100L228 112L236 130M200 100L170 96L162 106" fill="none" stroke="#5b6b7a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`
    : `<path d="M162 100H238" stroke="#5b6b7a" stroke-width="4" stroke-linecap="round"/>`

/** Weather vane arrow on its pole at (700, 100), pointing left (A) or right (B). Bounds: ±40, ±16. */
const vane = (dir: 1 | -1) =>
  `<g transform="translate(700 100) scale(${dir} 1)"><path d="M-36 0H30" stroke="#2b2b38" stroke-width="4"/><path d="M-40 0L-26 -10V10Z" fill="#2b2b38"/>` +
  `<path d="M26 0L38 -14H28L18 0L28 14H38Z" fill="#2b2b38"/></g>`

/** Shiny things in the nest: a coin, a key and a spoon. Bounds: x 538–584, y 84–104. */
const shinies = () =>
  `<circle cx="548" cy="96" r="8" fill="#f2c14e" stroke="#c9953f" stroke-width="2"/>` +
  `<path d="M560 100L576 86" stroke="#c7ccd6" stroke-width="4" stroke-linecap="round"/><ellipse cx="578" cy="86" rx="5" ry="3" fill="#dfe3ea" transform="rotate(-40 578 86)"/>` +
  `<circle cx="566" cy="94" r="4" fill="none" stroke="#e0b030" stroke-width="2.5"/>`

/** Piece of cheese rind on the tiles. Bounds: ±20. */
const rind = (x: number, y: number) =>
  `<path d="M${x - 18} ${y + 6}Q${x} ${y - 16} ${x + 18} ${y + 2}L${x + 12} ${y + 8}Q${x} ${y - 6} ${x - 12} ${y + 10}Z" fill="#e6a22a"/>` +
  `<path d="M${x - 14} ${y + 6}Q${x} ${y - 10} ${x + 14} ${y + 2}" stroke="#ffd45e" stroke-width="3" fill="none"/>`

export default detectiveLevel({
  id: 510,
  case: 'cheese',
  title: 'cheeseRoof',
  parTimeSec: 78,
  scene: ({ clue, anim, extra }) =>
    sky('#9fd8ff') +
    sun(80, 70) +
    anim({ type: 'path', points: [[0, 0], [-100, 0]], period: 52 }, cloud(420, 60)) +
    // Rooftops of the town behind
    `<path d="M0 240V190L60 160L120 190V170H200V140L260 110L320 140V240Z" fill="#8fb3cf"/><path d="M620 240V180H760V150L800 130V240Z" fill="#8fb3cf"/>` +
    roof() +
    // Dormer window
    `<path d="M392 300L440 266L488 300V380H392Z" fill="#f5d48a"/><path d="M384 304L440 262L496 304" fill="none" stroke="#8a3b2a" stroke-width="10" stroke-linejoin="round"/>` +
    `<rect x="414" y="304" width="52" height="60" rx="4" fill="#5b8db8"/><path d="M440 304V364M414 334H466" stroke="#f5ecd8" stroke-width="5"/>` +
    // Antenna
    `<path d="M200 240V96" stroke="#5b6b7a" stroke-width="5"/><path d="M174 150H226M168 125H232" stroke="#5b6b7a" stroke-width="4" stroke-linecap="round"/>` +
    clue('antennaBent', 200, 110, 46, antennaTop(false), antennaTop(true)) +
    // Weather vane
    `<path d="M700 240V100" stroke="#2b2b38" stroke-width="4"/><path d="M688 130H712" stroke="#2b2b38" stroke-width="3"/>` +
    clue('weatherVane', 700, 100, 42, vane(1), vane(-1)) +
    // Chimney with the nest
    `<rect x="520" y="116" width="80" height="134" fill="#b84b4b"/>` +
    [140, 162, 184, 206, 228].map((y, i) => `<path d="M520 ${y}H600M${i % 2 ? 560 : 540} ${y - 22}v22M${i % 2 ? 590 : 570} ${y - 22}v22" stroke="#8f3434" stroke-width="3"/>`).join('') +
    clue('brickFallen', 556, 195, 22, '', `<rect x="543" y="187" width="26" height="17" fill="#2b2b38"/>`) +
    `<rect x="512" y="108" width="96" height="14" fill="#8f3434"/>` +
    `<ellipse cx="560" cy="102" rx="32" ry="11" fill="#7a5233"/>` +
    clue('shinyNest', 561, 94, 30, '', shinies()) +
    `<path d="M528 104q32 12 64 0" stroke="#a8743f" stroke-width="5" fill="none"/><path d="M532 100l10 6M552 108l6 -4M574 104l10 4" stroke="#5e3b1a" stroke-width="2"/>` +
    clue('cheeseRind', 330, 330, 26, '', rind(330, 330)) +
    // Gutter and the wall below
    `<rect y="450" width="800" height="50" fill="#f5d48a"/><path d="M0 446H800V462Q400 474 0 462Z" fill="#9aa3ad"/>` +
    clue('coinInGutter', 620, 452, 22, '', `<ellipse cx="620" cy="453" rx="10" ry="5" fill="#f2c14e" stroke="#c9953f" stroke-width="2"/>`) +
    // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
    decor({ anim }, [
      ['bucket', 73, 286],
      ['kite', 404, 197, '#4a90d9'],
      ['broom', 431, 488],
      ['cat', 692, 453, '#9aa0a8'],
      ['dragonfly', 755, 195],
    ]) +
    extras({ extra, anim }, [
      ['bullfinch', 40, 485],
      ['airship', 57, 142],
      ['paperPlane', 137, 31],
      ['owl', 215, 275],
      ['flowerPot', 226, 422],
      ['hotAirBalloon', 310, 138],
      ['plane', 475, 118],
      ['sparrow', 511, 274],
      ['swallow', 613, 36],
      ['birdhouse', 644, 306],
    ]),
})
