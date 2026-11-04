import { memoryLevel } from '../helpers.ts'
import { bucket, duck } from '../shapes.ts'
import { around, bottle, glassJar, painting, pottedPlant, shelf, slipperPair } from './shapes.ts'
import { pot } from '../time/shapes.ts'

/** Shampoo bottle; (x, y) = bottom center. Bounds: x ±13, y from −54 to 0. */
const shampoo = (x: number, y: number, color: string) =>
  `<rect x="${x - 6}" y="${y - 54}" width="12" height="12" rx="2" fill="#3d4a55"/><rect x="${x - 13}" y="${y - 44}" width="26" height="44" rx="6" fill="${color}"/>` +
  `<rect x="${x - 8}" y="${y - 32}" width="16" height="14" rx="2" fill="#ffffff" fill-opacity="0.7"/>`

/** Towel hanging from the rack bar; bounds: x 410…510, y 150…262. */
const towel = (color: string) =>
  `<rect x="410" y="150" width="100" height="112" rx="6" fill="${color}"/><path d="M410 236h100M410 246h100" stroke="#ffffff" stroke-width="4"/>`

/** Cup with toothbrushes; (x, y) = bottom center. Bounds: x ±14, y from −52 to 0. */
const brushCup = (x: number, y: number) =>
  `<path d="M${x - 4} ${y - 26}l-6 -22M${x + 4} ${y - 26}l6 -22" stroke="#4dabf7" stroke-width="4" stroke-linecap="round"/>` +
  `<rect x="${x - 14}" y="${y - 52}" width="8" height="8" rx="2" fill="#ffffff"/><rect x="${x + 6}" y="${y - 52}" width="8" height="8" rx="2" fill="#ffffff"/>` +
  `<rect x="${x - 12}" y="${y - 30}" width="24" height="30" rx="4" fill="#ff6b8b"/>`

/** Pair of slippers; (x, y) = center. Bounds: x ±34, y ±9. */
const slippers = (x: number, y: number) =>
  `<ellipse cx="${x - 18}" cy="${y}" rx="16" ry="9" fill="#8338ec"/><ellipse cx="${x + 18}" cy="${y}" rx="16" ry="9" fill="#8338ec"/>` +
  `<ellipse cx="${x - 22}" cy="${y}" rx="8" ry="6" fill="#ffffff" fill-opacity="0.5"/><ellipse cx="${x + 14}" cy="${y}" rx="8" ry="6" fill="#ffffff" fill-opacity="0.5"/>`

/** Bath mat; bounds: x 150…250, y 424…460. */
const mat = (color: string) =>
  `<rect x="150" y="424" width="100" height="36" rx="10" fill="${color}"/><rect x="160" y="432" width="80" height="20" rx="6" fill="none" stroke="#ffffff" stroke-width="3"/>`

/** Wall tiles above y and a checked floor below it. */
const tiles = (y: number) =>
  `<path d="${Array.from({ length: Math.ceil(y / 40) }, (_, i) => `M0 ${i * 40}H800`).join('')}${Array.from({ length: 20 }, (_, i) => `M${i * 40} 0V${y}`).join('')}" stroke="#ffffff" stroke-width="2"/>` +
  Array.from({ length: 40 }, (_, i) => `<rect x="${(i % 20) * 40}" y="${y + Math.floor(i / 20) * 80 + ((i % 2) * 40)}" width="40" height="40" fill="#ffffff" fill-opacity="0.4"/>`).join('')

export default memoryLevel({
  id: 326,
  title: 'memoryBathroom',
  showSeconds: 4,
  scene: ({ diff }) =>
    `<rect width="800" height="340" fill="#d6eef8"/><rect y="340" width="800" height="160" fill="#c9d6df"/>` +
    tiles(340) +
    // Shower and tub
    `<path d="M90 40V100" stroke="#8d99ae" stroke-width="6"/><path d="M70 112h40l-6 -12h-28Z" fill="#8d99ae"/>` +
    `<circle cx="80" cy="404" r="10" fill="#8d99ae"/><circle cx="320" cy="404" r="10" fill="#8d99ae"/>` +
    `<rect x="40" y="280" width="320" height="120" rx="30" fill="#ffffff"/><rect x="30" y="270" width="340" height="20" rx="10" fill="#f4efe6"/>` +
    [80, 110, 140, 230, 320, 345].map((x, i) => `<circle cx="${x}" cy="${266 - (i % 2) * 6}" r="${14 + (i % 3) * 3}" fill="#ffffff" stroke="#bde3f2" stroke-width="2"/>`).join('') +
    duck(170, 262) +
    diff(...around(240, 233, 308, 274), '', duck(270, 260)) +
    // Shelf with bottles
    `<rect x="180" y="140" width="160" height="8" fill="#8d99ae"/>` +
    shampoo(210, 140, '#ff6b8b') +
    shampoo(250, 140, '#2a9d8f') +
    diff(...around(197, 86, 303, 140), shampoo(290, 140, '#ffd23f'), '') +
    // Towel rack
    `<rect x="400" y="146" width="120" height="6" rx="3" fill="#8d99ae"/>` +
    diff(...around(410, 150, 510, 262), towel('#3fa46f'), towel('#ffb703')) +
    // Sink and mirror
    `<ellipse cx="650" cy="135" rx="56" ry="71" fill="#8d99ae"/><ellipse cx="650" cy="135" rx="50" ry="65" fill="#e6f4fb"/><path d="M620 100l20 -20M630 120l30 -30" stroke="#ffffff" stroke-width="5"/>` +
    `<rect x="630" y="290" width="40" height="50" fill="#ffffff"/><path d="M590 250h120q0 40 -60 40q-60 0 -60 -40Z" fill="#ffffff"/>` +
    `<path d="M650 252v-14h14" stroke="#8d99ae" stroke-width="6" fill="none"/>` +
    diff(...around(594, 198, 706, 250), brushCup(608, 250), brushCup(692, 250)) +
    // Floor
    diff(...around(150, 424, 250, 460), mat('#4dabf7'), mat('#ff6b8b')) +
    diff(...around(414, 444, 486, 466), slippers(450, 455), '') +
    `<path d="M520 420h80l-6 60h-68Z" fill="#d9b48a"/><path d="M528 440h64M530 460h60" stroke="#a0703f" stroke-width="3"/>` +
    // Decor: small things that fill the room, the same in both pictures
    painting(20, 30, 36, 44, '#4dabf7') +
    shelf(10, 170, 140) +
    bottle(30, 170, '#ff6b8b') +
    glassJar(60, 170, '#4dabf7', '#ffffff') +
    painting(334, 30, 30, 40, '#3fa46f') +
    bottle(40, 270, '#ffd23f') +
    painting(745, 40, 40, 50, '#ff6b8b') +
    shelf(740, 170, 55) +
    bottle(758, 170, '#8338ec') +
    glassJar(782, 170, '#ff6b8b', '#ffffff') +
    slipperPair(60, 470, '#ff6b8b') +
    bucket(100, 490, '#4dabf7') +
    pot(330, 490) +
    bucket(540, 395, '#3fa46f') +
    slipperPair(640, 380, '#3fa46f') +
    pottedPlant(750, 480),
})
