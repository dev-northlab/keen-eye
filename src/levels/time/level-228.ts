import { svgLevel } from '../helpers.ts'
import { around, ball, bike, bin, bulbs, buoy, dog, DUSK, lampHead, lampPost, moon, palm, parasol, person, sailboat, sky, stars, sun, towel, waves } from './shapes.ts'

/** Café table; (x, y) = ground center. Bounds: x ±22, y from −36 to 0. */
const table = (x: number, y: number, color: string) =>
  `<ellipse cx="${x}" cy="${y - 32}" rx="22" ry="5" fill="${color}"/><path d="M${x} ${y - 30}V${y}M${x - 12} ${y}h24" stroke="#3d4a55" stroke-width="3"/>`

/** Ice-cream cart; (x, y) = ground center. Its umbrella is `cartUmbrella`. Bounds: x ±32, y from −50 to 0. */
const cart = (x: number, y: number) =>
  `<rect x="${x - 30}" y="${y - 40}" width="60" height="30" rx="4" fill="#f4efe6"/><path d="M${x - 30} ${y - 28}h60" stroke="#ff8fab" stroke-width="5"/>` +
  `<circle cx="${x - 18}" cy="${y - 6}" r="6" fill="#3d4a55"/><circle cx="${x + 18}" cy="${y - 6}" r="6" fill="#3d4a55"/><path d="M${x} ${y - 40}V${y - 60}" stroke="#3d4a55" stroke-width="3"/>`

/** Umbrella of `cart(x, y)`. Bounds: x ±40, y from −82 to −58. */
const cartUmbrella = (x: number, y: number, color: string) => `<path d="M${x - 40} ${y - 58}q40 -32 80 0Z" fill="${color}"/>`

export default svgLevel({
  id: 228,
  chapter: 'time',
  title: 'seaPromenade',
  pair: 'day-night',
  parTimeSec: 150,
  scene: ({ diff, time, trap }) =>
    sky(time(false, true), 230) +
    `<rect y="230" width="800" height="100" fill="#3ba7cc"/>` +
    waves(250, 8, 100, '#2f93ba', 330) +
    sailboat(200, 300, '#ffffff', '#ffffff') +
    diff(...around(202, 214, 220, 228), `<path d="M202 216h16l-4 6l4 6h-16Z" fill="#e63946"/>`, `<path d="M202 216h16l-4 6l4 6h-16Z" fill="#3a86ff"/>`) +
    sailboat(560, 290, '#e63946', '#ffd23f') +
    diff(...around(410, 278, 430, 308), buoy(420, 300), buoy(420, 300, '#ffd23f')) +
    // Beach
    `<rect y="330" width="800" height="70" fill="#f2d49b"/>` +
    palm(60, 400, 0.9) +
    diff(...around(270, 358, 330, 382), towel(300, 370, '#3a86ff'), towel(300, 370, '#8ac926')) +
    diff(...around(460, 321, 540, 395), parasol(500, 395, '#ff6b8b'), parasol(500, 395, '#ffb703')) +
    diff(...around(368, 371, 392, 395), ball(380, 395, '#e63946'), ball(380, 395, '#2a9d8f')) +
    towel(640, 376, '#ffb703') +
    // Promenade
    `<rect y="400" width="800" height="100" fill="#d9c2a3"/><rect y="398" width="800" height="5" fill="#a0703f"/>` +
    table(180, 476, '#ffffff') +
    diff(...around(258, 440, 302, 476), table(280, 476, '#ffffff'), table(280, 476, '#8338ec')) +
    cart(620, 480) +
    diff(...around(580, 398, 660, 422), cartUmbrella(620, 480, '#4dabf7'), cartUmbrella(620, 480, '#ff6b8b')) +
    diff(...around(720, 452, 740, 480), bin(730, 480, '#5c8d5a'), bin(730, 480, '#e63946')) +
    diff(...around(398, 459, 442, 485), dog(420, 485), dog(420, 485, '#3d3d3d')) +
    diff(...around(492, 448, 548, 482), bike(520, 482, '#ffb703'), bike(520, 482, '#e63946')) +
    person(340, 492, '#e76f51', true) +
    lampPost(40, 480) +
    lampPost(760, 480) +
    time('', DUSK) +
    trap(157, 417, 22, bulbs(120, 405, 340, 405, 9, false), bulbs(120, 405, 340, 405, 9, true), 'lights') +
    trap(40, 380, 34, lampHead(40, 480, false), lampHead(40, 480, true), 'lights') +
    trap(760, 380, 34, lampHead(760, 480, false), lampHead(760, 480, true), 'lights') +
    trap(680, 290, 30, '', `<path d="M650 270h60M660 286h40M666 302h28M674 316h12" stroke="#fff6c9" stroke-width="5" stroke-linecap="round" stroke-opacity="0.8"/>`, 'moon') +
    trap(400, 70, 40, '', stars(400, 70), 'stars') +
    trap(680, 70, 54, sun(680, 70), moon(680, 70), 'moon'),
})
