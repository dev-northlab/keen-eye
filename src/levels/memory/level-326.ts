import { memoryLevel } from '../helpers.ts'
import { level326Redesign } from './level-326-redesign.ts'
import { bucket, duck } from '../shapes.ts'
import { around, bottle, glassJar, painting, shelf, slipperPair } from './shapes.ts'
import { pot } from '../time/shapes.ts'

/** Shampoo bottle; (x, y) = bottom center. Bounds: x ±13, y from −54 to 0. */
const shampoo = (x: number, y: number, color: string) =>
  `<rect x="${x - 6}" y="${y - 54}" width="12" height="12" rx="2" fill="#3d4a55"/><rect x="${x - 13}" y="${y - 44}" width="26" height="44" rx="6" fill="${color}"/>` +
  `<rect x="${x - 8}" y="${y - 32}" width="16" height="14" rx="2" fill="#ffffff" fill-opacity="0.7"/>`

/** Towel hanging from the rack bar; (x, y) = top-left corner. Bounds: x … x + 100, y … y + 112. */
const towel = (x: number, y: number, color: string) =>
  `<rect x="${x}" y="${y}" width="100" height="112" rx="6" fill="${color}"/><path d="M${x} ${y + 86}h100M${x} ${y + 96}h100" stroke="#ffffff" stroke-width="4"/>`

/** Cup with toothbrushes; (x, y) = bottom center. Bounds: x ±14, y from −52 to 0. */
const brushCup = (x: number, y: number) =>
  `<path d="M${x - 4} ${y - 26}l-6 -22M${x + 4} ${y - 26}l6 -22" stroke="#4dabf7" stroke-width="4" stroke-linecap="round"/>` +
  `<rect x="${x - 14}" y="${y - 52}" width="8" height="8" rx="2" fill="#ffffff"/><rect x="${x + 6}" y="${y - 52}" width="8" height="8" rx="2" fill="#ffffff"/>` +
  `<rect x="${x - 12}" y="${y - 30}" width="24" height="30" rx="4" fill="#ff6b8b"/>`

/** Pair of slippers; (x, y) = center. Bounds: x ±34, y ±9. */
const slippers = (x: number, y: number) =>
  `<ellipse cx="${x - 18}" cy="${y}" rx="16" ry="9" fill="#8338ec"/><ellipse cx="${x + 18}" cy="${y}" rx="16" ry="9" fill="#8338ec"/>` +
  `<ellipse cx="${x - 22}" cy="${y}" rx="8" ry="6" fill="#ffffff" fill-opacity="0.5"/><ellipse cx="${x + 14}" cy="${y}" rx="8" ry="6" fill="#ffffff" fill-opacity="0.5"/>`

/** Bath mat; (x, y) = top-left corner. Bounds: x … x + 100, y … y + 36. */
const mat = (x: number, y: number, color: string) =>
  `<rect x="${x}" y="${y}" width="100" height="36" rx="10" fill="${color}"/><rect x="${x + 10}" y="${y + 8}" width="80" height="20" rx="6" fill="none" stroke="#ffffff" stroke-width="3"/>`

/** Wall tiles above y and a checked floor below it. */
const tiles = (y: number) =>
  `<path d="${Array.from({ length: Math.ceil(y / 40) }, (_, i) => `M0 ${i * 40}H500`).join('')}${Array.from({ length: 13 }, (_, i) => `M${i * 40} 0V${y}`).join('')}" stroke="#ffffff" stroke-width="2"/>` +
  Array.from({ length: 13 * 4 }, (_, i) => `<rect x="${(i % 13) * 40}" y="${y + Math.floor(i / 13) * 80 + ((i % 2) * 40)}" width="40" height="40" fill="#ffffff" fill-opacity="0.4"/>`).join('')

export default memoryLevel({
  id: 326,
  title: 'memoryBathroom',
  showSeconds: 4,
  redesign: level326Redesign,
  scene: ({ diff }) =>
    `<rect width="500" height="470" fill="#d6eef8"/><rect y="470" width="500" height="280" fill="#c9d6df"/>` +
    tiles(470) +
    // Shower and tub
    `<path d="M90 350V410" stroke="#8d99ae" stroke-width="6"/><path d="M70 422h40l-6 -12h-28Z" fill="#8d99ae"/>` +
    `<circle cx="80" cy="714" r="10" fill="#8d99ae"/><circle cx="320" cy="714" r="10" fill="#8d99ae"/>` +
    `<rect x="40" y="590" width="320" height="120" rx="30" fill="#ffffff"/><rect x="30" y="580" width="340" height="20" rx="10" fill="#f4efe6"/>` +
    [80, 110, 140, 230, 320, 345].map((x, i) => `<circle cx="${x}" cy="${576 - (i % 2) * 6}" r="${14 + (i % 3) * 3}" fill="#ffffff" stroke="#bde3f2" stroke-width="2"/>`).join('') +
    duck(170, 572) +
    diff(...around(240, 543, 308, 584), '', duck(270, 570)) +
    // Shelf with bottles
    `<rect x="150" y="300" width="160" height="8" fill="#8d99ae"/>` +
    shampoo(180, 300, '#ff6b8b') +
    shampoo(220, 300, '#2a9d8f') +
    diff(...around(167, 246, 273, 300), shampoo(260, 300, '#ffd23f'), '') +
    // Towel rack
    `<rect x="40" y="56" width="120" height="6" rx="3" fill="#8d99ae"/>` +
    diff(...around(50, 60, 150, 172), towel(50, 60, '#3fa46f'), towel(50, 60, '#ffb703')) +
    // Sink and mirror
    `<ellipse cx="380" cy="140" rx="56" ry="71" fill="#8d99ae"/><ellipse cx="380" cy="140" rx="50" ry="65" fill="#e6f4fb"/><path d="M350 105l20 -20M360 125l30 -30" stroke="#ffffff" stroke-width="5"/>` +
    `<rect x="360" y="420" width="40" height="50" fill="#ffffff"/><path d="M320 380h120q0 40 -60 40q-60 0 -60 -40Z" fill="#ffffff"/>` +
    `<path d="M380 382v-14h14" stroke="#8d99ae" stroke-width="6" fill="none"/>` +
    diff(...around(324, 328, 436, 380), brushCup(338, 380), brushCup(422, 380)) +
    // Floor
    mat(380, 660, '#4dabf7') +
    diff(...around(394, 549, 466, 571), slippers(430, 560), '') +
    `<path d="M20 480h80l-6 60h-68Z" fill="#d9b48a"/><path d="M28 500h64M30 520h60" stroke="#a0703f" stroke-width="3"/>` +
    // Decor: small things that fill the room, the same in both pictures
    painting(190, 40, 36, 44, '#4dabf7') +
    shelf(180, 170, 120) +
    bottle(200, 170, '#ff6b8b') +
    glassJar(230, 170, '#4dabf7', '#ffffff') +
    painting(270, 40, 30, 40, '#3fa46f') +
    bottle(40, 580, '#ffd23f') +
    painting(455, 30, 36, 46, '#ff6b8b') +
    shelf(440, 250, 55) +
    bottle(458, 250, '#8338ec') +
    glassJar(482, 250, '#ff6b8b', '#ffffff') +
    slipperPair(200, 738, '#ff6b8b') +
    bucket(140, 530, '#4dabf7') +
    pot(330, 540) +
    bucket(478, 492, '#3fa46f') +
    slipperPair(220, 495, '#3fa46f') +
    pot(470, 470),
})
