// Library: a reading room among the ten hardest of "memory" (hidden until released, levels/upcoming.ts). A tall
// bookshelf, a window with curtains, a wall clock, a desk with a globe and a lamp, a cat on the rug and a stack of books.
import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
import { cat } from '../time/shapes.ts'
import { around, big, books, candle, cube, curtains, globe, mug, painting, pillow, pottedPlant, room, rug, slipperPair, sticker, table, tableLamp, wallClock, windowPane } from './shapes.ts'

/** Row of book spines standing on a shelf at `bottom`, from x = 30; [width, height, color] each, `skip` left out. */
const shelfRow = (bottom: number, spines: [number, number, string][], skip = -1) => {
  let x = 30
  let out = ''
  spines.forEach(([w, h, c], i) => {
    if (i !== skip) out += `<rect x="${x}" y="${bottom - h}" width="${w}" height="${h}" fill="${c}"/><rect x="${x + 3}" y="${bottom - h + 10}" width="${w - 6}" height="4" fill="#ffffff" fill-opacity="0.5"/>`
    x += w + 2
  })
  return out
}

const ROWS: [number, [number, number, string][]][] = [
  [170, [[18, 80, '#e63946'], [22, 70, '#3a86ff'], [16, 84, '#ffd23f'], [24, 76, '#3fa46f'], [18, 66, '#8338ec'], [20, 80, '#ff9f43'], [18, 72, '#2a9d8f'], [22, 84, '#e07a5f']]],
  [280, [[20, 76, '#3fa46f'], [18, 84, '#ffd23f'], [22, 70, '#e07a5f'], [16, 80, '#3a86ff'], [18, 78, '#3a86ff'], [24, 66, '#ff6b8b'], [18, 84, '#8338ec'], [20, 74, '#ffd23f']]],
  [390, [[22, 80, '#8338ec'], [18, 72, '#e63946'], [20, 80, '#2a9d8f'], [16, 84, '#ffd23f'], [24, 70, '#3a86ff'], [18, 80, '#e07a5f'], [22, 76, '#3fa46f'], [18, 66, '#ff9f43']]],
  [500, [[24, 70, '#ff9f43'], [18, 84, '#3a86ff'], [20, 76, '#e63946'], [22, 80, '#3fa46f'], [16, 72, '#ffd23f'], [20, 84, '#8338ec'], [18, 70, '#2a9d8f'], [22, 78, '#ff6b8b']]],
]

export default memoryLevel({
  id: 331,
  title: 'memoryLibrary',
  showSeconds: 5,
  scene: ({ diff, extra, anim }) =>
    room(540, '#efe2c8', '#a0703f') +
    // The bookshelf: a book's color, a missing book
    `<rect x="20" y="60" width="190" height="460" fill="#7a4e2d"/><rect x="28" y="68" width="174" height="444" fill="#5c3a22"/>` +
    `<rect x="20" y="170" width="190" height="10" fill="#7a4e2d"/><rect x="20" y="280" width="190" height="10" fill="#7a4e2d"/><rect x="20" y="390" width="190" height="10" fill="#7a4e2d"/><rect x="20" y="500" width="190" height="20" fill="#7a4e2d"/>` +
    shelfRow(...ROWS[0]) + shelfRow(ROWS[1][0], ROWS[1][1], 4) + shelfRow(ROWS[2][0], ROWS[2][1], 2) + shelfRow(...ROWS[3]) +
    diff(...around(114, 202, 132, 280, 30), `<rect x="114" y="202" width="18" height="78" fill="#3a86ff"/><rect x="117" y="212" width="12" height="4" fill="#ffffff" fill-opacity="0.5"/>`, `<rect x="114" y="202" width="18" height="78" fill="#e63946"/><rect x="117" y="212" width="12" height="4" fill="#ffffff" fill-opacity="0.5"/>`) +
    diff(...around(74, 310, 94, 390, 30), `<rect x="74" y="310" width="20" height="80" fill="#2a9d8f"/><rect x="77" y="320" width="14" height="4" fill="#ffffff" fill-opacity="0.5"/>`, '') +
    candle(60, 60, '#ffffff') +
    // The window, the wall clock's rim
    windowPane(280, 70, 160, 150) + curtains(280, 440, 62, 170, '#3fa46f') +
    diff(...around(326, 256, 394, 324, 30), wallClock(360, 290, 30, '#3a86ff'), wallClock(360, 290, 30, '#e63946')) +
    // The desk: the globe's sea, the lamp's shade
    table(250, 480, 420, 540, '#b5793f') +
    diff(...around(276, 353, 324, 420, 30), big(300, 420, 0.6, globe(0, 0, '#4dabf7')), big(300, 420, 0.6, globe(0, 0, '#8ac926'))) +
    diff(...around(415, 343, 465, 420, 30), big(440, 420, 0.7, tableLamp(0, 0, '#ffd23f')), big(440, 420, 0.7, tableLamp(0, 0, '#ff6b8b'))) +
    mug(372, 420, '#e63946') +
    // The rug and the cat, the stack of books
    rug(300, 650, 140, '#e63946') +
    diff(...around(215, 590, 265, 640, 30), big(240, 640, 1.4, cat(0, 0, '#f08c3a')), '') +
    big(420, 700, 1, books(0, 0, ['#3a86ff', '#ffd23f'])) +
    diff(...around(386, 646, 454, 664, 30), `<g transform="translate(420 664)">${books(0, 0, ['#3fa46f'])}</g>`, '') +
    // Decor: small things that fill the room, the same in both pictures
    painting(232, 250, 40, 50, '#c9953f') +
    sticker(250, 90, '#ffd23f') +
    sticker(470, 250, '#e63946') +
    big(470, 540, 0.6, pottedPlant(0, 0, '#e07a5f')) +
    slipperPair(80, 600, '#e63946') +
    pillow(60, 700, '#3a86ff') +
    big(140, 724, 1, books(0, 0, ['#e07a5f', '#8338ec'])) +
    cube(30, 724, 24, '#ffd23f') +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['cube', 470, 610, '#e63946'],
      ['slippers', 160, 560, '#3fa46f'],
      ['sticker', 470, 60, '#ffffff'],
      ['frame', 240, 200, '#e63946'],
    ]),
})
