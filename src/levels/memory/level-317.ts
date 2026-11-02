import { memoryLevel } from '../helpers.ts'
import { around, cake, hangingLamp, room } from './shapes.ts'

/** Loaf of bread; (x, y) = bottom center. Bounds: x ±26, y from −36 to 0. */
const loaf = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 18}" rx="26" ry="18" fill="#d9a05b"/>` +
  `<path d="M${x - 12} ${y - 26}l6 10M${x} ${y - 30}l6 10M${x + 12} ${y - 26}l6 10" stroke="#f2d29b" stroke-width="3" stroke-linecap="round"/>`

/** Cookie jar; (x, y) = bottom center. Bounds: x ±24, y from −64 to 0. */
const jar = (x: number, y: number, lid: string) =>
  `<rect x="${x - 22}" y="${y - 56}" width="44" height="56" rx="10" fill="#e6f4fb"/>` +
  `<circle cx="${x - 8}" cy="${y - 16}" r="8" fill="#c98b5a"/><circle cx="${x + 9}" cy="${y - 22}" r="8" fill="#c98b5a"/><circle cx="${x}" cy="${y - 36}" r="8" fill="#c98b5a"/>` +
  `<rect x="${x - 24}" y="${y - 64}" width="48" height="12" rx="4" fill="${lid}"/>`

/** Croissant; (x, y) = bottom center. Bounds: x ±28, y from −22 to 0. */
const croissant = (x: number, y: number) =>
  `<path d="M${x - 28} ${y - 4}q6 -18 28 -18q22 0 28 18q-14 -6 -28 -6q-14 0 -28 6Z" fill="#e3a14f"/>` +
  `<path d="M${x - 10} ${y - 20}l4 12M${x + 10} ${y - 20}l-4 12" stroke="#b9772f" stroke-width="3"/>`

/** Donut; (x, y) = bottom center. Bounds: x ±24, y from −26 to 0. */
const donut = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 12}" rx="24" ry="13" fill="#d9a05b"/><ellipse cx="${x}" cy="${y - 15}" rx="21" ry="10" fill="#ff8fb1"/>` +
  `<ellipse cx="${x}" cy="${y - 15}" rx="7" ry="3.5" fill="#c98b5a"/>`

/** Cupcake with a cherry; (x, y) = bottom center. Bounds: x ±20, y from −51 to 0. */
const cupcake = (x: number, y: number) =>
  `<path d="M${x - 18} ${y - 22}h36l-5 22h-26Z" fill="#4dabf7"/>` +
  `<path d="M${x - 20} ${y - 22}q0 -20 20 -20q20 0 20 20Z" fill="#fff3e6"/><circle cx="${x}" cy="${y - 46}" r="5" fill="#e63946"/>`

/** Shop sign with a loaf on it; (x, y) = center. Bounds: x ±35, y ±25. */
const sign = (x: number, y: number, color: string) =>
  `<rect x="${x - 35}" y="${y - 25}" width="70" height="50" rx="8" fill="${color}"/>` + loaf(x, y + 14)

/** Black and white floor tiles below y. */
const tiles = (y: number) =>
  Array.from({ length: 20 }, (_, i) => `<rect x="${i * 40}" y="${y + (i % 2) * 25}" width="40" height="25" fill="#3d4a55" fill-opacity="0.35"/>`).join('')

export default memoryLevel({
  id: 317,
  title: 'memoryBakery',
  showSeconds: 5,
  scene: ({ diff }) =>
    room(450, '#fbe3c8', '#e9dcc7') +
    tiles(450) +
    `<rect y="220" width="800" height="10" fill="#e07a5f" fill-opacity="0.5"/>` +
    hangingLamp(150, 50, '#3fa46f') +
    hangingLamp(400, 50, '#3fa46f') +
    diff(650, 50, 50, hangingLamp(650, 50, '#3fa46f'), '') +
    // Bread shelf
    `<rect x="60" y="200" width="230" height="10" fill="#8a5a33"/><path d="M80 210l12 16M270 210l-12 16" stroke="#8a5a33" stroke-width="5"/>` +
    loaf(110, 200) +
    loaf(165, 200) +
    diff(...around(84, 164, 246, 200), loaf(220, 200), '') +
    sign(385, 150, '#3a86ff') +
    // Jar shelf
    `<rect x="470" y="200" width="270" height="10" fill="#8a5a33"/><path d="M490 210l12 16M720 210l-12 16" stroke="#8a5a33" stroke-width="5"/>` +
    jar(510, 200, '#e63946') +
    diff(...around(566, 136, 614, 200), jar(590, 200, '#ffb703'), jar(590, 200, '#8338ec')) +
    jar(670, 200, '#e63946') +
    // Counter with a glass display case
    `<rect x="60" y="300" width="460" height="150" rx="6" fill="#c98b5a"/><path d="M80 330h420M80 420h420" stroke="#a0703f" stroke-width="5"/>` +
    `<rect x="80" y="230" width="420" height="70" rx="6" fill="#e6f4fb" fill-opacity="0.7" stroke="#ffffff" stroke-width="5"/>` +
    croissant(140, 296) +
    croissant(220, 296) +
    donut(310, 296) +
    diff(...around(400, 245, 440, 296, 30), '', cupcake(420, 296)) +
    // Cake table
    `<rect x="576" y="330" width="12" height="120" fill="#6b4f3a"/><rect x="732" y="330" width="12" height="120" fill="#6b4f3a"/><rect x="560" y="324" width="200" height="14" rx="5" fill="#a0703f"/>` +
    cake(660, 324, diff(...around(604, 234, 716, 286), '#ffffff', '#ff8fb1')) +
    // Basket of baguettes
    `<path d="M690 440l20 -60M712 440l12 -64M734 440l4 -58" stroke="#d9a05b" stroke-width="12" stroke-linecap="round"/>` +
    `<path d="M680 440h70l-8 40h-54Z" fill="#a0703f"/>`,
})
