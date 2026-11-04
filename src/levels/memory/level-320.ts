import { car } from '../chapter-02/shapes.ts'
import { alien, robot, rocket } from '../chapter-05/shapes.ts'
import { extras } from '../extras.ts'
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
  scene: ({ diff, extra, anim }) =>
    room(470, '#e6dcff', '#c98f5a') +
    sticker(50, 80, '#ffd23f') +
    sticker(60, 300, '#ff6b8b') +
    sticker(750, 120, '#4dabf7') +
    sticker(740, 360, '#ffd23f') +
    // Shelf unit
    `<rect x="100" y="30" width="600" height="440" rx="6" fill="#a0703f"/><rect x="120" y="40" width="560" height="420" fill="#f2d7b0"/>` +
    [170, 320, 460].map((y) => `<rect x="110" y="${y}" width="580" height="10" fill="#8a5a33"/>`).join('') +
    // Top shelf
    diff(...around(167, 94, 213, 170), big(190, 170, 1.4, robot(0, 0, '#8d99ae')), big(190, 170, 1.4, robot(0, 0, '#e63946'))) +
    rocket(300, 170, '#f1f1f1', '#3a86ff', 0.9) +
    diff(...around(384, 78, 456, 170), teddy(420, 170), '') +
    drum(560, 170) +
    // Middle shelf
    block(200, 320, '#e63946', 'dot') +
    block(200, 276, '#3a86ff', 'star') +
    diff(...around(178, 188, 222, 320), block(200, 232, '#ffb703', 'heart'), '') +
    diff(...around(325, 271, 435, 320), big(380, 320, 1.3, car(0, 0, '#3fa46f')), big(380, 320, 1.3, car(0, 0, '#8338ec'))) +
    diff(...around(508, 276, 552, 320, 30), '', big(530, 320, 1.8, ball(0, 0, '#ff6b8b'))) +
    dollhouse(630, 320) +
    // Bottom shelf
    toyTrain(150, 460) +
    books(500, 460, ['#ff6b8b', '#4dabf7', '#ffd23f']) +
    // Decor: small things that fill the room, the same in both pictures
    cube(250, 30, 24, '#e63946') +
    cube(560, 30, 24, '#3fa46f') +
    alien(645, 170, '#8ac926') +
    cube(455, 460, 22, '#3a86ff') +
    cube(555, 460, 30, '#ff6b8b') +
    painting(20, 150, 50, 60, '#3a86ff') +
    sticker(30, 250, '#8ac926') +
    wallClock(50, 400, 26, '#ffb703') +
    kite(760, 200, '#ff6b8b') +
    sticker(780, 300, '#ff6b8b') +
    painting(715, 390, 60, 50, '#8ac926') +
    ball(40, 495, '#ffd23f') +
    slipperPair(300, 485, '#ff6b8b') +
    cube(620, 495, 20, '#3a86ff') +
    cube(760, 495, 24, '#ffd23f') +
    `<rect x="580" y="410" width="90" height="50" rx="4" fill="#8ac926"/><path d="M590 420h20v20h-20ZM620 420h20v20h-20ZM650 420h10v20h-10Z" fill="#ffffff" fill-opacity="0.5"/>` +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['frame', 71, 68, '#e63946'],
      ['sticker', 728, 100, '#ff6b8b'],
      ['frame', 70, 281, '#e63946'],
      ['sticker', 723, 299, '#ff6b8b'],
    ]),
})
