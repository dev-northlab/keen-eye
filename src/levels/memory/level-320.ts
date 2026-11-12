import { car } from '../chapter-02/shapes.ts'
import { alien, robot, rocket } from '../chapter-05/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { ball } from '../time/shapes.ts'
import { around, big, books, cube, kite, painting, room, slipperPair, sticker, teddy, wallClock } from './shapes.ts'

/** Toy drum with sticks; (x, y) = bottom center. Bounds: x ±40, y from −78 to 0. */
const drum = (x: number, y: number) =>
  `<path d="M${x - 30} ${y - 78}l24 30M${x + 30} ${y - 78}l-24 30" stroke="#a0703f" stroke-width="5" stroke-linecap="round"/>` +
  `<rect x="${x - 40}" y="${y - 45}" width="80" height="45" rx="6" fill="#e63946"/>` +
  `<path d="M${x - 40} ${y - 40}l20 34l20 -34l20 34l20 -34" stroke="#ffd23f" stroke-width="3" fill="none"/>` +
  `<ellipse cx="${x}" cy="${y - 45}" rx="40" ry="9" fill="#f4efe6"/>`

/** Toy block with a symbol; (x, y) = bottom center, side 44. Bounds: x ±22, y from −44 to 0. */
const block = (x: number, y: number, color: string, symbol: 'dot' | 'star' | 'heart') =>
  `<rect x="${x - 22}" y="${y - 44}" width="44" height="44" rx="5" fill="${color}"/>` +
  (symbol === 'dot'
    ? `<circle cx="${x}" cy="${y - 22}" r="9" fill="#ffffff"/>`
    : symbol === 'star'
      ? `<path d="M${x} ${y - 34}l4 8h9l-7 6l3 9l-9 -5l-9 5l3 -9l-7 -6h9Z" fill="#ffffff"/>`
      : `<path d="M${x} ${y - 10}s-12 -8 -12 -16a6 6 0 0 1 12 -3a6 6 0 0 1 12 3c0 8 -12 16 -12 16Z" fill="#ffffff"/>`)

/** Dollhouse; (x, y) = bottom center. Bounds: x ±44, y from −96 to 0. */
const dollhouse = (x: number, y: number) =>
  `<rect x="${x - 38}" y="${y - 60}" width="76" height="60" fill="#ffd6a5"/><path d="M${x - 44} ${y - 58}L${x} ${y - 96}L${x + 44} ${y - 58}Z" fill="#c98bb9"/>` +
  `<rect x="${x - 26}" y="${y - 48}" width="20" height="18" fill="#bde3f2"/><rect x="${x + 6}" y="${y - 48}" width="20" height="18" fill="#bde3f2"/><rect x="${x - 8}" y="${y - 26}" width="16" height="26" fill="#a0703f"/>`

/** Toy train: engine and two cars from x, on y. Bounds: x … x + 290, y from −70 to 0. */
const toyTrain = (x: number, y: number) =>
  `<rect x="${x}" y="${y - 50}" width="80" height="40" rx="6" fill="#3a86ff"/><rect x="${x + 50}" y="${y - 70}" width="30" height="24" rx="4" fill="#3a86ff"/><rect x="${x + 10}" y="${y - 66}" width="14" height="18" fill="#3d4a55"/>` +
  `<rect x="${x + 100}" y="${y - 44}" width="80" height="34" rx="6" fill="#ffb703"/><rect x="${x + 200}" y="${y - 44}" width="80" height="34" rx="6" fill="#3fa46f"/>` +
  `<path d="M${x + 80} ${y - 26}h20M${x + 180} ${y - 26}h20" stroke="#3d4a55" stroke-width="4"/>` +
  [x + 20, x + 60, x + 120, x + 160, x + 220, x + 260].map((cx) => `<circle cx="${cx}" cy="${y - 8}" r="8" fill="#3d3d3d"/>`).join('')

export default memoryLevel({
  id: 320,
  title: 'memoryToyShelf',
  showSeconds: 5,
  scene: ({ diff }) =>
    room(720, '#e6dcff', '#c98f5a') +
    // Shelf unit
    `<rect x="20" y="150" width="460" height="570" rx="6" fill="#a0703f"/><rect x="40" y="160" width="420" height="550" fill="#f2d7b0"/>` +
    [300, 440, 580, 710].map((y) => `<rect x="30" y="${y}" width="440" height="10" fill="#8a5a33"/>`).join('') +
    // Top shelf
    diff(...around(107, 224, 153, 300), big(130, 300, 1.4, robot(0, 0, '#8d99ae')), big(130, 300, 1.4, robot(0, 0, '#e63946'))) +
    rocket(215, 300, '#f1f1f1', '#3a86ff', 0.9) +
    diff(...around(264, 208, 336, 300), teddy(300, 300), '') +
    alien(410, 300, '#8ac926') +
    // Second shelf
    block(80, 440, '#e63946', 'dot') +
    block(80, 396, '#3a86ff', 'star') +
    diff(...around(58, 308, 102, 440), block(80, 352, '#ffb703', 'heart'), '') +
    drum(220, 440) +
    dollhouse(380, 440) +
    // Third shelf
    big(130, 580, 1.3, car(0, 0, '#3fa46f')) +
    diff(...around(278, 536, 322, 580, 30), '', big(300, 580, 1.8, ball(0, 0, '#ff6b8b'))) +
    books(395, 580, ['#ff6b8b', '#4dabf7', '#ffd23f']) +
    // Bottom shelf
    toyTrain(50, 710) +
    // Decor: small things that fill the room, the same in both pictures
    cube(150, 150, 24, '#e63946') +
    cube(350, 150, 24, '#3fa46f') +
    cube(355, 710, 22, '#3a86ff') +
    cube(452, 580, 30, '#ff6b8b') +
    painting(20, 30, 50, 60, '#3a86ff') +
    sticker(110, 60, '#8ac926') +
    wallClock(180, 70, 26, '#ffb703') +
    kite(250, 45, '#ff6b8b') +
    sticker(320, 80, '#ff6b8b') +
    painting(375, 40, 60, 50, '#8ac926') +
    sticker(470, 30, '#ffd23f') +
    ball(40, 745, '#ffd23f') +
    slipperPair(300, 738, '#ff6b8b') +
    cube(420, 745, 20, '#3a86ff') +
    cube(465, 745, 24, '#ffd23f') +
    `<rect x="370" y="660" width="90" height="50" rx="4" fill="#8ac926"/><path d="M380 670h20v20h-20ZM410 670h20v20h-20ZM440 670h10v20h-10Z" fill="#ffffff" fill-opacity="0.5"/>`,
})
