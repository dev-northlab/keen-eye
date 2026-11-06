// Art studio: a painter's corner among the ten hardest of "memory" (hidden until released, levels/upcoming.ts). An easel
// with a landscape, a palette, a jar of brushes, paint tubes, a plaster bust in a beret and a paint bucket on the floor.
import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
import { bucket } from '../shapes.ts'
import { around, big, books, cube, painting, pottedPlant, room, rug, slipperPair, sticker, table, wallClock, windowPane } from './shapes.ts'

/** Brush standing in a jar, leaning by `dx`; (x, y) = its foot. Bounds: x from 0 to dx ± 4, y from −40 to 0. */
const brush = (x: number, y: number, dx: number, tip: string) =>
  `<path d="M${x} ${y}L${x + dx} ${y - 32}" stroke="#a0703f" stroke-width="3"/><path d="M${x + dx - 3} ${y - 32}l3 -8l3 8Z" fill="${tip}"/>`

export default memoryLevel({
  id: 333,
  title: 'memoryArtStudio',
  showSeconds: 5,
  scene: ({ diff, extra, anim }) =>
    room(530, '#fdf0d5', '#b08968') +
    windowPane(30, 60, 150, 170) +
    // The easel: the sun's color, the tree on the canvas
    rug(260, 560, 120, '#e9ecef') + `<circle cx="210" cy="556" r="6" fill="#e63946"/><circle cx="300" cy="572" r="5" fill="#3a86ff"/><circle cx="330" cy="548" r="4" fill="#ffd23f"/>` +
    `<path d="M220 560L290 120M360 560L290 120M290 120V560" stroke="#8a5a33" stroke-width="6"/><rect x="190" y="330" width="200" height="10" fill="#8a5a33"/>` +
    `<rect x="200" y="150" width="180" height="180" fill="#bde3f2" stroke="#f4f1e8" stroke-width="6"/><path d="M203 300Q260 250 320 280T377 270V327H203Z" fill="#3fa46f"/>` +
    diff(...around(312, 172, 348, 208, 30), `<circle cx="330" cy="190" r="18" fill="#ffd23f"/>`, `<circle cx="330" cy="190" r="18" fill="#ff7b00"/>`) +
    diff(...around(222, 250, 258, 300, 30), `<rect x="237" y="276" width="6" height="22" fill="#6b4226"/><circle cx="240" cy="268" r="18" fill="#2f7d55"/>`, '') +
    // The side table and its palette
    table(40, 170, 440, 530, '#b5793f') +
    `<ellipse cx="105" cy="428" rx="42" ry="14" fill="#e9b872"/><circle cx="80" cy="426" r="6" fill="#e63946"/><circle cx="100" cy="422" r="6" fill="#3a86ff"/><circle cx="116" cy="432" r="5" fill="#f4f1e8"/>` +
    diff(...around(123, 417, 137, 431, 30), `<circle cx="130" cy="424" r="7" fill="#ffd23f"/>`, `<circle cx="130" cy="424" r="7" fill="#3fa46f"/>`) +
    `<rect x="150" y="414" width="16" height="26" rx="3" fill="#8ecae6"/><path d="M154 414l-4 -16M160 414l2 -18" stroke="#ff9f43" stroke-width="3"/>` +
    // The work table: the jar of brushes, a paint tube
    table(380, 490, 420, 530, '#b5793f') +
    `<rect x="388" y="384" width="24" height="36" rx="4" fill="#8ecae6" fill-opacity="0.8"/>` + brush(394, 400, -6, '#e63946') + brush(400, 400, 0, '#3a86ff') +
    diff(...around(404, 344, 418, 402, 30), brush(406, 400, 8, '#ffd23f'), '') +
    `<rect x="444" y="398" width="40" height="8" rx="3" fill="#e63946"/>` +
    diff(...around(446, 408, 482, 420, 30), `<rect x="446" y="410" width="30" height="10" rx="3" fill="#3a86ff"/><rect x="476" y="412" width="6" height="6" fill="#adb5bd"/>`, `<rect x="446" y="410" width="30" height="10" rx="3" fill="#8338ec"/><rect x="476" y="412" width="6" height="6" fill="#adb5bd"/>`) +
    // The shelf and the bust's beret
    `<rect x="400" y="300" width="90" height="8" fill="#8a5a33"/><rect x="425" y="276" width="40" height="24" fill="#e9ecef"/><path d="M432 276q13 -18 26 0Z" fill="#e9ecef"/><circle cx="445" cy="250" r="20" fill="#e9ecef"/>` +
    diff(...around(426, 222, 466, 244, 30), `<path d="M426 240Q430 222 450 222Q466 224 464 238Z" fill="#e63946"/><circle cx="448" cy="221" r="3" fill="#e63946"/>`, '') +
    // The paint bucket, moved
    diff(...around(263, 670, 377, 700, 30), big(280, 700, 1, bucket(0, 0, '#3a86ff')), big(360, 700, 1, bucket(0, 0, '#3a86ff'))) +
    // Decor: small things that fill the studio, the same in both pictures
    painting(200, 40, 60, 50, '#e63946') +
    painting(400, 40, 50, 60, '#3fa46f') +
    wallClock(470, 170, 20, '#3a86ff') +
    `<ellipse cx="200" cy="626" rx="26" ry="8" fill="#8a5a33"/><path d="M182 628L176 680M218 628L224 680M200 634V680" stroke="#6b4226" stroke-width="5"/>` +
    big(40, 530, 0.5, pottedPlant(0, 0, '#e07a5f')) +
    big(450, 724, 1, books(0, 0, ['#3a86ff', '#ffd23f'])) +
    cube(40, 724, 24, '#e63946') +
    slipperPair(120, 700, '#3a86ff') +
    sticker(460, 360, '#ff6b8b') +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['cube', 210, 740, '#ffd23f'],
      ['books', 470, 600, '#8338ec'],
      ['sticker', 270, 110, '#3a86ff'],
      ['frame', 110, 300, '#c9953f'],
    ]),
})
