// "The broken vase", scene 4 — the courtyard: the fountain switched off, a selfie stick left against
// it, a ticket stub on the bench, more shards under it, the keeper's lunch box in the booth (he was on
// his break), the pigeons flown away and a balloon caught in the tree.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { cloud, shards, sky, tree } from './shapes.ts'

const facade = () =>
  `<rect y="110" width="800" height="200" fill="#efe6d8"/><rect y="96" width="800" height="18" fill="#d6cdbd"/>` +
  [60, 200, 340, 480, 620].map((x) => `<rect x="${x}" y="114" width="34" height="196" fill="#f8f3ea"/><rect x="${x + 70}" y="150" width="46" height="100" rx="20" fill="#9fb8cf"/>`).join('')

/** Jet of water from the fountain's top bowl at (400, 300). Bounds: x 364–436, y 238–302. */
const jet = () =>
  `<path d="M400 298V246M400 248Q378 250 368 298M400 248Q422 250 432 298" stroke="#7cc8f0" stroke-width="5" fill="none" stroke-linecap="round"/>` +
  `<circle cx="400" cy="244" r="5" fill="#bfe6ff"/>`

/** Selfie stick leaning against the fountain, a phone in its clamp. Bounds: x 486–520, y 312–388. */
const selfieStick = () =>
  `<path d="M490 386L512 330" stroke="#2b2b38" stroke-width="4" stroke-linecap="round"/><rect x="503" y="314" width="16" height="22" rx="3" fill="#5b8db8" transform="rotate(22 511 325)"/>`

const ticket = (x: number, y: number) =>
  `<g transform="rotate(10 ${x} ${y})"><rect x="${x - 14}" y="${y - 7}" width="28" height="14" rx="2" fill="#f2b632"/><path d="M${x + 4} ${y - 7}v14" stroke="#fff" stroke-width="2" stroke-dasharray="2 2"/></g>`

/** Open lunch box with a sandwich. Bounds: x ±24, y from −22 to 0. */
const lunchBox = (x: number, y: number) =>
  `<rect x="${x - 22}" y="${y - 14}" width="44" height="14" rx="3" fill="#e5484d"/><path d="M${x - 22} ${y - 14}L${x - 18} ${y - 22}H${x + 18}L${x + 22} ${y - 14}Z" fill="#c43b40"/>` +
  `<path d="M${x - 12} ${y - 12}L${x + 10} ${y - 20}L${x + 12} ${y - 12}Z" fill="#f5d48a"/><path d="M${x - 10} ${y - 13}L${x + 10} ${y - 18}" stroke="#7cc25a" stroke-width="2"/>`

/** Pigeon facing left; (x, y) = feet. Bounds: x ±16, y from −24 to 0. */
const pigeon = (x: number, y: number) =>
  `<path d="M${x + 6} ${y - 10}L${x + 16} ${y - 6}L${x + 8} ${y - 2}Z" fill="#6b6f80"/><ellipse cx="${x}" cy="${y - 9}" rx="11" ry="7" fill="#8a8f99"/>` +
  `<circle cx="${x - 9}" cy="${y - 18}" r="5" fill="#6b6f80"/><path d="M${x - 14} ${y - 18}l-3 1.5l3 1Z" fill="#e0b030"/><path d="M${x - 2} ${y - 2}V${y}M${x + 2} ${y - 2}V${y}" stroke="#e5484d" stroke-width="2"/>`

const balloon = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 4}" rx="12" ry="15" fill="#e5484d"/><path d="M${x - 2} ${y + 11}h4l-2 3Z" fill="#e5484d"/><path d="M${x} ${y + 13}q6 8 0 14t2 6" stroke="#555" stroke-width="1.4" fill="none"/>` +
  `<ellipse cx="${x - 4}" cy="${y - 9}" rx="3" ry="5" fill="#fff" fill-opacity="0.5"/>`

export default detectiveLevel({
  id: 514,
  case: 'vase',
  title: 'vaseCourtyard',
  parTimeSec: 86,
  scene: ({ clue, anim, extra }) =>
    sky('#bfe6ff') +
    anim({ type: 'path', points: [[0, 0], [80, 0]], period: 44 }, cloud(380, 50, 0.8)) +
    facade() +
    `<rect y="310" width="800" height="190" fill="#d6cdbd"/>` +
    [350, 400, 450].map((y) => `<path d="M0 ${y}H800" stroke="#c9c0ae" stroke-width="2"/>`).join('') +
    tree(70, 330) +
    clue('balloonInTree', 112, 183, 30, '', balloon(112, 176)) +
    // Bench with the ticket stub, shards under it
    `<rect x="70" y="372" width="170" height="12" rx="4" fill="#8a5a2b"/><rect x="82" y="384" width="10" height="40" fill="#5e3b1a"/><rect x="218" y="384" width="10" height="40" fill="#5e3b1a"/>` +
    `<rect x="70" y="340" width="170" height="10" rx="4" fill="#8a5a2b"/><path d="M90 350V372M220 350V372" stroke="#5e3b1a" stroke-width="6"/>` +
    clue('ticketStub', 130, 366, 22, '', ticket(130, 366)) +
    clue('shardsUnderBench', 160, 446, 34, '', shards(160, 446)) +
    // The fountain
    `<ellipse cx="400" cy="384" rx="120" ry="26" fill="#bdb7ad"/><ellipse cx="400" cy="378" rx="108" ry="18" fill="#7cc8f0"/>` +
    `<rect x="390" y="304" width="20" height="72" fill="#bdb7ad"/><path d="M362 300H438Q430 318 400 318Q370 318 362 300Z" fill="#bdb7ad"/>` +
    clue('fountainOff', 400, 270, 48, jet(), '') +
    clue('selfieStick', 505, 348, 44, '', selfieStick()) +
    // The ticket booth
    `<rect x="640" y="210" width="130" height="190" fill="#3f9b6b"/><path d="M630 214H780L770 194H640Z" fill="#2f7d55"/>` +
    `<rect x="660" y="240" width="90" height="70" fill="#2b3a33"/><rect x="654" y="306" width="102" height="10" fill="#f5ecd8"/>` +
    clue('lunchBox', 705, 290, 30, '', lunchBox(705, 306)) +
    clue('pigeonsGone', 591, 437, 38, pigeon(574, 452) + pigeon(608, 446), '') +
    anim({ type: 'path', points: [[0, 0], [50, -24], [100, 0], [50, 16]], period: 8 }, `<path d="M300 200l-9 -7v14Zm0 0l9 -7v14Z" fill="#ba68c8"/>`) +
    // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
    decor({ anim }, [
      ['mailbox', 43, 358],
      ['bucket', 68, 486],
      ['cactus', 248, 418],
      ['newspapers', 618, 338],
      ['scooter', 702, 482],
    ]) +
    extras({ extra, anim }, [
      ['dragonfly', 45, 30],
      ['broom', 66, 433],
      ['swallow', 223, 71],
      ['sparrow', 256, 339],
      ['puppy', 303, 474],
      ['mouse', 347, 354, '#b9a58a'],
      ['flowerPot', 406, 432],
      ['crow', 508, 455],
      ['kite', 604, 42, '#f2c14e'],
      ['wheelbarrow', 759, 421],
    ]),
})
