// "The missing cake", scene 5 — the yard: cream on the doghouse roof, a cake candle in the grass, the
// dog's bowl filled and left untouched, a gap in the fence and the neighbour's clean boots at his door.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { cloud, door, fence, grass, picket, sky, sun, tree } from './shapes.ts'

const doghouse = (x: number, y: number) =>
  `<rect x="${x - 80}" y="${y - 100}" width="160" height="100" fill="#d9774a"/>` +
  `<path d="M${x - 95} ${y - 90}L${x} ${y - 160}L${x + 95} ${y - 90}Z" fill="#8a3b2a"/>` +
  `<path d="M${x - 30} ${y}V${y - 36}A30 30 0 0 1 ${x + 30} ${y - 36}V${y}Z" fill="#3b2a1a"/>` +
  // A bone on the plate over the door
  `<rect x="${x - 26}" y="${y - 88}" width="52" height="16" rx="4" fill="#f5ecd8"/><path d="M${x - 12} ${y - 80}h24" stroke="#c9b48f" stroke-width="5" stroke-linecap="round"/>`

/** Dog bowl; (x, y) = bottom middle; rim at y − 14. */
const bowl = (x: number, y: number) =>
  `<path d="M${x - 26} ${y - 14}H${x + 26}L${x + 19} ${y}H${x - 19}Z" fill="#5b8db8"/><ellipse cx="${x}" cy="${y - 14}" rx="26" ry="5" fill="#3f6f99"/>`
/** Heap of dog food in `bowl`. Bounds: x ±20, y from −24 to −10. */
const kibble = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 16}" rx="20" ry="7" fill="#a0612f"/>` +
  `<g fill="#7a4520">${[[-10, -18], [-2, -21], [7, -18], [13, -14], [-14, -13], [2, -15]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="2.6"/>`).join('')}</g>`

/** Striped cake candle lying in the grass, a dab of cream on its end. Bounds: ±22. */
const candle = (x: number, y: number) =>
  `<g transform="rotate(-20 ${x} ${y})"><rect x="${x - 18}" y="${y - 4}" width="34" height="8" rx="2" fill="#fff"/>` +
  `<path d="M${x - 12} ${y - 4}l-4 8M${x - 2} ${y - 4}l-4 8M${x + 8} ${y - 4}l-4 8" stroke="#e8457a" stroke-width="3"/>` +
  `<path d="M${x + 16} ${y}h5" stroke="#3b2a1a" stroke-width="2"/><circle cx="${x - 18}" cy="${y}" r="4" fill="#fffaf0"/></g>`

/** Rubber boot; (x, y) = heel on the ground. Bounds: x from −9 to +23, y from −34 to 0. */
const boot = (x: number, y: number) =>
  `<path d="M${x - 9} ${y - 34}H${x + 9}V${y - 10}H${x + 18}Q${x + 23} ${y} ${x + 16} ${y}H${x - 9}Z" fill="#2f9e6e"/><rect x="${x - 9}" y="${y - 34}" width="18" height="5" fill="#1f7a55"/>`

const cream = (x: number, y: number) =>
  `<path d="M${x - 14} ${y + 4}q-2 -12 10 -10q8 -10 16 0q6 8 -4 12q-2 8 -6 0q-8 4 -16 -2Z" fill="#fffaf0"/><circle cx="${x + 4}" cy="${y - 4}" r="3" fill="#e5484d"/>`

export default detectiveLevel({
  id: 505,
  case: 'cake',
  title: 'cakeYard',
  parTimeSec: 68,
  scene: ({ clue, anim, extra }) =>
    sky('#bfe6ff') +
    sun(90, 70) +
    anim({ type: 'path', points: [[0, 0], [-80, 0]], period: 46 }, cloud(470, 70, 0.8)) +
    grass(300) +
    tree(60, 330) +
    // The neighbour's house and porch
    `<rect x="590" y="140" width="210" height="190" fill="#e8c99b"/><path d="M570 150L695 70L820 150Z" fill="#5b6b7a"/>` +
    door(640, 220, 70, 110, '#3f9b6b') +
    `<rect x="620" y="328" width="180" height="12" fill="#c9b48f"/>` +
    clue('neighbourBoots', 760, 310, 36, '', boot(742, 328) + boot(764, 328)) +
    fence(360, 590, 320, '#f5ecd8', [494]) +
    clue('fenceGap', 502, 280, 44, picket(494, 320), '') +
    doghouse(260, 340) +
    clue('creamOnDoghouse', 305, 214, 26, '', cream(305, 214)) +
    `<path d="M160 360q30 6 50 -4" stroke="#5b8a3a" stroke-width="3" fill="none"/>` +
    bowl(432, 346) +
    clue('bowlFull', 432, 330, 26, '', kibble(432, 346)) +
    clue('candleByDoghouse', 360, 396, 26, '', candle(360, 396)) +
    anim({ type: 'bob', dx: 0, dy: -8, period: 1.6 }, `<circle cx="120" cy="430" r="18" fill="#e5484d"/><path d="M104 424q16 10 32 0" stroke="#fff" stroke-width="4" fill="none"/>`) +
    // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
    decor({ anim }, [
      ['gnome', 46, 488],
      ['haybale', 268, 475],
      ['molehill', 303, 359],
      ['bucket', 598, 486],
      ['bench', 699, 392],
    ]) +
    extras({ extra, anim }, [
      ['crow', 123, 330],
      ['beehive', 156, 448],
      ['swallow', 158, 71],
      ['flowerPot', 376, 487],
      ['paperPlane', 392, 141],
      ['sparrow', 476, 469],
      ['dragonfly', 545, 30],
      ['owl', 555, 365],
      ['plane', 735, 68],
      ['wheelbarrow', 759, 481],
    ]),
})
