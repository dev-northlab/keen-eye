// Motion differences: the laundry sways only on picture B; the chimney smoke rises faster on B.
import { bird } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { flowerPot, wateringCan } from '../shapes.ts'
import { ball, cloud, coffeeCup, pigeon, skyline, sun } from './shapes.ts'

/** Chimney; (x, y) = bottom center on the roof. Bounds: x ±10, y from −34 to 0. */
const chimney = (x: number, y: number, color = '#c0392b') =>
  `<rect x="${x - 8}" y="${y - 30}" width="16" height="30" fill="${color}"/><rect x="${x - 10}" y="${y - 34}" width="20" height="6" fill="#8a3b2b"/>`

/** Smoke over the chimney top at (x, y). Bounds: x from −12 to +14, y from −44 to +4. */
const smoke = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y - 6}" r="7" fill="#d9d9e3"/><circle cx="${x + 5}" cy="${y - 20}" r="9" fill="#e3e3ec"/><circle cx="${x - 1}" cy="${y - 34}" r="10" fill="#ededf3"/>`

/** TV antenna; (x, y) = foot. Bounds: x ±16, y from −40 to 0. */
const antenna = (x: number, y: number, arms: number) => {
  let bars = ''
  for (let i = 0; i < arms; i++) bars += `M${x - 14 + i * 2} ${y - 36 + i * 9}h${28 - i * 4}`
  return `<path d="M${x} ${y}v-40${bars}" stroke="#3d4a55" stroke-width="3" fill="none"/>`
}

/** Water tank on legs; (x, y) = bottom center. Bounds: x ±22, y from −56 to 0. */
const tank = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><path d="M-16 -20l-4 20M16 -20l4 20M-6 -20l-2 20M6 -20l2 20" stroke="#3d4a55" stroke-width="3"/>` +
  `<rect x="-20" y="-52" width="40" height="34" rx="4" fill="${color}"/><path d="M-22 -54h44l-22 -8Z" fill="#5c677d"/><path d="M-20 -40h40M-20 -30h40" stroke="#2b2b2b" stroke-opacity="0.25" stroke-width="2"/></g>`

/** Skylight on a roof; (x, y) = center. Bounds: x ±18, y ±12. */
const skylight = (x: number, y: number) =>
  `<rect x="${x - 18}" y="${y - 12}" width="36" height="24" rx="3" fill="#5c677d"/><rect x="${x - 14}" y="${y - 8}" width="28" height="16" fill="#bde3f2"/>`

/** Sitting cat; (x, y) = bottom center. Bounds: x from −14 to +20, y from −30 to 0. */
const cat = (x: number, y: number, color = '#ff9f43') =>
  `<g transform="translate(${x} ${y})"><path d="M8 -2q14 -2 12 -16" stroke="${color}" stroke-width="4" fill="none" stroke-linecap="round"/>` +
  `<ellipse cy="-9" rx="11" ry="10" fill="${color}"/><circle cx="-2" cy="-22" r="7" fill="${color}"/>` +
  `<path d="M-8 -26l1 -6l4 4ZM4 -26l-1 -6l-4 4Z" fill="${color}"/><circle cx="-4" cy="-23" r="1.2" fill="#222"/><circle cx="0" cy="-23" r="1.2" fill="#222"/></g>`

/** Laundry on a line from the pivot (x, y): a shirt and a towel. Bounds: x from −4 to +60, y from 0 to +40. */
const laundry = (x: number, y: number) =>
  `<path d="M${x + 4} ${y + 2}h12l4 6l-2 28h-18l-2 -28Z" fill="#3a86ff"/><rect x="${x + 30}" y="${y + 2}" width="26" height="32" fill="#ff6b8b"/>` +
  `<path d="M${x + 36} ${y + 10}h14M${x + 36} ${y + 18}h14" stroke="#fff" stroke-width="2"/>`

export default svgLevel({
  id: 33,
  chapter: 'city',
  title: 'rooftops',
  parTimeSec: 110,
  scene: ({ diff, anim, rand, extra }) => {
    const wash = laundry(500, 230)
    const puffing = (period: number) => anim({ id: 'smoke', type: 'path', points: [[0, 0], [0, -20]], period }, smoke(160, 226))

    return (
      `<rect width="800" height="500" fill="#ffe6cc"/>` +
      sun(680, 70, '#ff9e5e') +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(250, 60, 0.8)) +
      skyline(rand, 240, '#d9c3dc') +
      // Far roof row
      `<path d="M0 300l100 -40l100 40Z" fill="#e07a5f"/><rect y="300" width="200" height="200" fill="#f2cc8f"/>` +
      chimney(160, 260) +
      diff(160, 198, 38, puffing(4), puffing(1.8), 'smoke') +
      `<rect x="200" y="280" width="220" height="220" fill="#c98bb9"/><rect x="196" y="272" width="228" height="10" fill="#a96f9b"/>` +
      diff(260, 232, 34, tank(260, 272, '#8d99ae'), tank(260, 272, '#ffb703')) +
      diff(360, 252, 24, antenna(360, 272, 3), antenna(360, 272, 2)) +
      `<path d="M420 300l120 -50l120 50Z" fill="#7a3f2c"/><rect x="420" y="300" width="240" height="200" fill="#81b29a"/>` +
      `<rect x="470" y="200" width="4" height="100" fill="#3d4a55"/><rect x="600" y="200" width="4" height="100" fill="#3d4a55"/>` +
      `<path d="M472 230h130" stroke="#555" stroke-width="2"/>` +
      diff(530, 250, 36, wash, anim({ type: 'sway', angle: 6, pivot: [500, 230], period: 1.8 }, wash)) +
      `<rect x="660" y="260" width="140" height="240" fill="#7aa6d6"/><rect x="656" y="252" width="148" height="10" fill="#5d86b8"/>` +
      chimney(720, 252, '#8d99ae') +
      diff(740, 300, 24, cat(740, 314), '') +
      // Near big roof
      `<rect y="400" width="800" height="100" fill="#e07a5f"/><rect y="396" width="800" height="8" fill="#c96b4f"/>` +
      diff(120, 450, 22, skylight(120, 450), '') +
      skylight(300, 450) +
      skylight(640, 450) +
      chimney(480, 440) +
      pigeon(500, 470) +
      diff(220, 472, 18, pigeon(220, 480), pigeon(220, 480, true)) +
      pigeon(540, 476, true) +
      pigeon(700, 396) +
      bird(480, 406) +
      ball(380, 482) +
      flowerPot(590, 448) +
      wateringCan(720, 478) +
      coffeeCup(265, 462) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['flowerBox', 91, 369, '#e63946'],
        ['flowerBox', 325, 366, '#ff006e'],
        ['flowerBox', 632, 367, '#8338ec'],
        ['birds', 581, 76],
        ['cloud', 178, 63],
        ['balloon', 383, 52, '#3a86ff'],
        ['hydrant', 460, 476],
        ['shoppingBag', 743, 442],
        ['pigeon', 589, 480],
        ['bollard', 236, 431],
      ])
    )
  },
})
