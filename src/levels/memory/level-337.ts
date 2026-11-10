// Candy shop: shelves of sweets among the ten hardest of "memory" (hidden until released, levels/upcoming.ts). Bunting,
// jars of candy, cupcakes, a cup of lollipops, a gumball machine and a cash register on the counter, a candy cane.
import { memoryLevel } from '../helpers.ts'
import { around, big, cube, gift, glassJar, room, rug, sticker, wallClock } from './shapes.ts'

/** Cupcake; (x, y) = bottom center, the cherry left out unless asked. Bounds: x ±20, y from −42 to 0. */
const cupcake = (x: number, y: number, frosting: string, cherry = true) =>
  `<path d="M${x - 16} ${y - 20}H${x + 16}L${x + 12} ${y}H${x - 12}Z" fill="#e9c46a"/><path d="M${x - 18} ${y - 18}Q${x - 18} ${y - 38} ${x} ${y - 36}Q${x + 18} ${y - 38} ${x + 18} ${y - 18}Z" fill="${frosting}"/>` +
  (cherry ? `<circle cx="${x}" cy="${y - 38}" r="5" fill="#e63946"/>` : '')

/** Lollipop on a stick; (x, y) = top of the candy's disc center. Bounds: x ±10, y from −10 to +40. */
const lollipop = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y}V${y + 40}" stroke="#f4f1e8" stroke-width="3"/><circle cx="${x}" cy="${y}" r="10" fill="${color}"/><path d="M${x - 6} ${y}a6 6 0 0 1 12 0" stroke="#ffffff" stroke-width="2" fill="none"/>`

/** Candy cane leaning, hook up; (x, y) = its foot. Bounds: x from −4 to +34, y from −74 to 0. */
const candyCane = (x: number, y: number) =>
  `<path d="M${x} ${y}L${x + 10} ${y - 56}Q${x + 14} ${y - 74} ${x + 28} ${y - 66}Q${x + 34} ${y - 58} ${x + 26} ${y - 50}" stroke="#ffffff" stroke-width="8" fill="none" stroke-linecap="round"/>` +
  `<path d="M${x} ${y}L${x + 10} ${y - 56}Q${x + 14} ${y - 74} ${x + 28} ${y - 66}" stroke="#e63946" stroke-width="8" stroke-dasharray="6 6" fill="none"/>`

const FLAGS = ['#ff6b8b', '#ffd23f', '#3a86ff', '#8ac926', '#ff9f43', '#8338ec', '#ff6b8b', '#ffd23f']

export default memoryLevel({
  id: 337,
  title: 'memoryCandyShop',
  showSeconds: 5,
  scene: ({ diff }) =>
    room(560, '#ffe3ec', '#b5838d') +
    // Bunting: one flag's color
    `<path d="M0 22Q250 46 500 22" stroke="#8a5a33" stroke-width="2" fill="none"/>` +
    FLAGS.map((c, i) => (i === 3 ? '' : `<path d="M${30 + i * 60} 26h28l-14 28Z" fill="${c}"/>`)).join('') +
    diff(...around(210, 26, 238, 54, 30), `<path d="M210 26h28l-14 28Z" fill="#8ac926"/>`, `<path d="M210 26h28l-14 28Z" fill="#e63946"/>`) +
    `<rect x="186" y="66" width="128" height="34" rx="6" fill="#ffffff" stroke="#ff6b8b" stroke-width="3"/><path d="M200 83h100" stroke="#ff6b8b" stroke-width="6" stroke-dasharray="10 6"/>` +
    // Top shelf: a jar's candy, a missing jar
    `<rect x="30" y="200" width="440" height="10" fill="#a0703f"/><rect x="30" y="320" width="440" height="10" fill="#a0703f"/>` +
    big(160, 200, 2, glassJar(0, 0, '#e63946', '#8ac926')) + big(320, 200, 2, glassJar(0, 0, '#3a86ff', '#ff9f43')) + big(400, 200, 2, glassJar(0, 0, '#ffd23f', '#ff6b8b')) +
    diff(...around(58, 144, 102, 200, 30), big(80, 200, 2, glassJar(0, 0, '#8338ec', '#ffd23f')), big(80, 200, 2, glassJar(0, 0, '#8338ec', '#3a86ff'))) +
    diff(...around(218, 144, 262, 200, 30), big(240, 200, 2, glassJar(0, 0, '#3fa46f', '#e63946')), '') +
    // Lower shelf: the cupcakes' cherry, the cup of lollipops
    cupcake(100, 320, '#ff9fcf') + cupcake(150, 320, '#bde0fe', false) +
    diff(...around(145, 277, 155, 287, 30), `<circle cx="150" cy="282" r="5" fill="#e63946"/>`, '') +
    big(240, 320, 1.6, glassJar(0, 0, '#ff9f43', '#ffffff')) + big(320, 320, 1.6, glassJar(0, 0, '#3fa46f', '#ffd23f')) +
    lollipop(406, 262, '#ff6b8b') + lollipop(419, 256, '#ffd23f') +
    diff(...around(422, 252, 442, 300, 30), '', lollipop(432, 262, '#3a86ff')) +
    `<rect x="398" y="290" width="44" height="30" rx="4" fill="#3fa46f"/>` +
    // The counter: the gumball machine's balls, the register's display
    `<rect x="20" y="470" width="460" height="90" fill="#ff9fcf"/><path d="M20 470H480" stroke="#ffffff" stroke-width="8"/><path d="M80 478V560M160 478V560M240 478V560M320 478V560M400 478V560" stroke="#ffffff" stroke-width="10"/>` +
    `<rect x="84" y="440" width="32" height="30" fill="#e63946"/><circle cx="100" cy="410" r="36" fill="#e9f7fb" fill-opacity="0.85" stroke="#ced4da" stroke-width="3"/>` +
    diff(...around(68, 382, 132, 438, 30),
      `<circle cx="86" cy="420" r="7" fill="#ffd23f"/><circle cx="104" cy="426" r="7" fill="#3a86ff"/><circle cx="118" cy="414" r="7" fill="#e63946"/><circle cx="96" cy="402" r="7" fill="#8ac926"/><circle cx="112" cy="396" r="7" fill="#ff9f43"/>`,
      `<circle cx="86" cy="420" r="7" fill="#8338ec"/><circle cx="104" cy="426" r="7" fill="#8338ec"/><circle cx="118" cy="414" r="7" fill="#ff6b8b"/><circle cx="96" cy="402" r="7" fill="#ff6b8b"/><circle cx="112" cy="396" r="7" fill="#8338ec"/>`) +
    `<rect x="340" y="420" width="100" height="50" rx="6" fill="#5c677d"/><path d="M350 452h80" stroke="#adb5bd" stroke-width="6" stroke-dasharray="8 4"/>` +
    diff(...around(360, 422, 420, 436, 30), `<rect x="360" y="424" width="60" height="12" rx="2" fill="#8ac926"/>`, `<rect x="360" y="424" width="60" height="12" rx="2" fill="#ff9f43"/>`) +
    // The candy cane, moved
    diff(...around(146, 526, 234, 600, 30), candyCane(150, 600), candyCane(200, 600)) +
    // Decor: small things that fill the shop, the same in both pictures
    wallClock(440, 110, 22, '#ff6b8b') +
    sticker(40, 110, '#ffd23f') +
    rug(260, 680, 140, '#ffffff') +
    gift(80, 720, 44, '#3a86ff', '#ffd23f') + gift(400, 720, 40, '#ffd23f', '#e63946') +
    `<circle cx="300" cy="640" r="6" fill="#8338ec"/><circle cx="330" cy="700" r="6" fill="#ffd23f"/><circle cx="240" cy="716" r="6" fill="#3a86ff"/>` +
    cube(300, 744, 22, '#e63946'),
})
