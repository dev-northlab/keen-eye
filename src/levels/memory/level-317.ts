import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
import { around, cake, flowerVase, glassJar, hangingLamp, mug, painting, room, shelf } from './shapes.ts'
import { crate, poster, sack } from '../time/shapes.ts'

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
  scene: ({ diff, extra, anim }) =>
    room(580, '#fbe3c8', '#e9dcc7') +
    tiles(580) +
    `<rect y="345" width="500" height="10" fill="#e07a5f" fill-opacity="0.5"/>` +
    hangingLamp(100, 50, '#3fa46f') +
    hangingLamp(250, 50, '#3fa46f') +
    diff(400, 50, 50, hangingLamp(400, 50, '#3fa46f'), '') +
    // Bread shelf
    `<rect x="30" y="210" width="230" height="10" fill="#8a5a33"/><path d="M50 220l12 16M240 220l-12 16" stroke="#8a5a33" stroke-width="5"/>` +
    loaf(80, 210) +
    loaf(135, 210) +
    diff(...around(54, 174, 216, 210), loaf(190, 210), '') +
    sign(380, 170, '#3a86ff') +
    // Jar shelf
    `<rect x="200" y="330" width="270" height="10" fill="#8a5a33"/><path d="M220 340l12 16M450 340l-12 16" stroke="#8a5a33" stroke-width="5"/>` +
    jar(240, 330, '#e63946') +
    diff(...around(296, 266, 344, 330), jar(320, 330, '#ffb703'), jar(320, 330, '#8338ec')) +
    jar(400, 330, '#e63946') +
    // Counter with a glass display case
    `<rect x="30" y="430" width="440" height="150" rx="6" fill="#c98b5a"/><path d="M50 460h400M50 550h400" stroke="#a0703f" stroke-width="5"/>` +
    `<rect x="50" y="360" width="400" height="70" rx="6" fill="#e6f4fb" fill-opacity="0.7" stroke="#ffffff" stroke-width="5"/>` +
    croissant(110, 426) +
    croissant(185, 426) +
    donut(270, 426) +
    diff(...around(340, 375, 380, 426, 30), '', cupcake(360, 426)) +
    // Cake table
    `<rect x="296" y="706" width="12" height="44" fill="#6b4f3a"/><rect x="452" y="706" width="12" height="44" fill="#6b4f3a"/><rect x="280" y="700" width="200" height="14" rx="5" fill="#a0703f"/>` +
    cake(380, 700, diff(...around(324, 610, 436, 662), '#ffffff', '#ff8fb1')) +
    // Basket of baguettes
    `<path d="M130 690l20 -60M152 690l12 -64M174 690l4 -58" stroke="#d9a05b" stroke-width="12" stroke-linecap="round"/>` +
    // Decor: small things that fill the room, the same in both pictures
    painting(10, 110, 36, 44, '#3a86ff') +
    painting(160, 60, 46, 40, '#ffb703') +
    shelf(430, 236, 60) +
    mug(445, 236, '#3a86ff') +
    mug(475, 236, '#e63946') +
    painting(280, 160, 50, 60, '#3fa46f') +
    painting(466, 110, 26, 36, '#e63946') +
    flowerVase(430, 360, '#3a86ff', '#ffd23f') +
    poster(90, 470, 36, 50, '#ffd23f') +
    poster(380, 468, 36, 50, '#ff6b8b') +
    glassJar(300, 700, '#ff6b8b', '#ff9f43') +
    mug(462, 700, '#3a86ff') +
    sack(30, 740, '#f4efe6') +
    sack(62, 742) +
    crate(240, 745, 30) +
    `<path d="M120 690h70l-8 40h-54Z" fill="#a0703f"/>` +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['cube', 220, 650, '#3fa46f'],
      ['slippers', 60, 620, '#3a86ff'],
      ['frame', 40, 300, '#3fa46f'],
      ['frame', 470, 300, '#c9953f'],
    ]),
})
