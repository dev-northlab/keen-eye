// Flower shop: buckets and baskets of flowers, the hardest of "memory" (hidden until released, levels/upcoming.ts). The
// window sign, hanging baskets, a shelf of cacti, a tiered stand of tulips and sunflowers, a bouquet on the counter with
// the florist, and a watering can.
import { person } from '../chapter-02/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { bucket } from '../shapes.ts'
import { around, big, curtains, pottedPlant, room, rug, wallClock, wateringCan, windowPane } from './shapes.ts'

/** Cactus in a pot; (x, y) = bottom center. Bounds: x ±12, y from −44 to 0. */
const cactus = (x: number, y: number) =>
  `<path d="M${x - 10} ${y - 14}H${x + 10}L${x + 8} ${y}H${x - 8}Z" fill="#e07a5f"/><rect x="${x - 5}" y="${y - 44}" width="10" height="30" rx="5" fill="#3fa46f"/>` +
  `<path d="M${x - 5} ${y - 28}h-5v-8M${x + 5} ${y - 24}h5v-10" stroke="#3fa46f" stroke-width="5" stroke-linecap="round" fill="none"/>`

/** Flower head on a stem rising from (x, y) to (x + dx, y − h). */
const stem = (x: number, y: number, dx: number, h: number, color: string, r = 7) =>
  `<path d="M${x} ${y}L${x + dx} ${y - h}" stroke="#3fa46f" stroke-width="3"/><circle cx="${x + dx}" cy="${y - h}" r="${r}" fill="${color}"/>`

/** Sunflower head; (x, y) = center. Bounds: radius 11. */
const sunflower = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="11" fill="#ffd23f"/><circle cx="${x}" cy="${y}" r="5" fill="#7a4e2d"/>`

/** Hanging basket on a wall bracket at (x, 80), without its flowers. Bounds: x ±24, y from 80 to 132. */
const basket = (x: number) =>
  `<path d="M${x} 80V112" stroke="#5c677d" stroke-width="2"/><path d="M${x - 24} 112H${x + 24}Q${x + 20} 132 ${x} 132Q${x - 20} 132 ${x - 24} 112Z" fill="#a0703f"/>`
/** Flowers in the basket at x. Bounds: x ±19, y from 93 to 113. */
const blooms = (x: number, color: string) =>
  `<circle cx="${x - 12}" cy="106" r="7" fill="${color}"/><circle cx="${x}" cy="100" r="7" fill="${color}"/><circle cx="${x + 12}" cy="106" r="7" fill="${color}"/>`

export default memoryLevel({
  id: 340,
  title: 'memoryFlowerShop',
  showSeconds: 5,
  scene: ({ diff }) =>
    room(560, '#fff1e6', '#9c6644') +
    // The window and its sign
    windowPane(160, 60, 180, 140) + curtains(160, 340, 54, 150, '#ff6b8b') +
    diff(...around(220, 84, 280, 100, 30), `<rect x="220" y="84" width="60" height="16" rx="3" fill="#3fa46f"/>`, `<rect x="220" y="84" width="60" height="16" rx="3" fill="#8338ec"/>`) +
    // Hanging baskets on their brackets
    `<path d="M40 80H70M460 80H430" stroke="#5c677d" stroke-width="4"/>` +
    basket(70) + diff(...around(51, 93, 89, 113, 30), blooms(70, '#ff6b8b'), blooms(70, '#ffd23f')) +
    diff(...around(406, 80, 454, 132, 30), basket(430) + blooms(430, '#8338ec'), '') +
    // The shelf of cacti, one moved
    `<rect x="360" y="300" width="120" height="8" fill="#8a5a33"/>` + cactus(375, 300) + cactus(405, 300) +
    diff(...around(423, 256, 477, 300, 30), cactus(435, 300), cactus(465, 300)) +
    wallClock(140, 260, 22, '#3fa46f') +
    // The tiered stand: tulips' color, a sunflower more
    `<rect x="30" y="420" width="200" height="10" fill="#6b4226"/><rect x="20" y="520" width="220" height="10" fill="#6b4226"/><path d="M40 430V560M220 430V560" stroke="#6b4226" stroke-width="6"/>` +
    stem(72, 392, -8, 22, '#3fa46f', 1) + stem(80, 392, 0, 26, '#3fa46f', 1) + stem(88, 392, 8, 22, '#3fa46f', 1) +
    diff(...around(56, 362, 104, 378, 30), `<circle cx="64" cy="370" r="7" fill="#e63946"/><circle cx="80" cy="366" r="7" fill="#e63946"/><circle cx="96" cy="370" r="7" fill="#e63946"/>`, `<circle cx="64" cy="370" r="7" fill="#ff9f43"/><circle cx="80" cy="366" r="7" fill="#ff9f43"/><circle cx="96" cy="370" r="7" fill="#ff9f43"/>`) +
    bucket(80, 420, '#3a86ff') +
    stem(170, 392, -6, 30, '#3fa46f', 1) + stem(180, 392, 0, 40, '#3fa46f', 1) + sunflower(164, 362) + sunflower(180, 352) +
    diff(...around(185, 356, 207, 392, 30), `<path d="M188 392L196 368" stroke="#3fa46f" stroke-width="3"/>` + sunflower(196, 367), '') +
    bucket(180, 420, '#e9c46a') +
    stem(70, 492, -6, 22, '#ffffff') + stem(80, 492, 4, 28, '#ffffff') + bucket(76, 520, '#8ac926') +
    stem(160, 492, -6, 24, '#e63946') + stem(172, 492, 4, 30, '#ff6b8b') + bucket(166, 520, '#ff6b8b') +
    // The florist behind the counter, the bouquet's ribbon
    person(392, 500, '#3fa46f', true) +
    `<rect x="270" y="470" width="210" height="90" fill="#c9a26b"/><path d="M270 470H480" stroke="#8a5a33" stroke-width="6"/>` +
    `<path d="M316 472L344 472L360 410L300 410Z" fill="#f4f1e8"/>` + stem(330, 420, -10, 16, '#ff6b8b', 8) + stem(330, 420, 0, 22, '#ffd23f', 8) + stem(330, 420, 10, 16, '#e63946', 8) +
    diff(...around(316, 436, 344, 456, 30), `<path d="M330 446l-14 -10v20ZM330 446l14 -10v20Z" fill="#3a86ff"/>`, `<path d="M330 446l-14 -10v20ZM330 446l14 -10v20Z" fill="#e63946"/>`) +
    `<rect x="426" y="440" width="50" height="30" rx="4" fill="#5c677d"/>` +
    // The watering can on the floor
    diff(...around(88, 655, 163, 700, 30), big(120, 700, 0.7, wateringCan(0, 0, '#3a86ff')), big(120, 700, 0.7, wateringCan(0, 0, '#ffd23f'))) +
    // Decor: the same in both pictures
    rug(330, 680, 110, '#3fa46f') +
    big(450, 744, 0.6, pottedPlant(0, 0, '#e07a5f')) +
    `<circle cx="250" cy="600" r="5" fill="#ff6b8b"/><circle cx="270" cy="720" r="5" fill="#ffd23f"/><path d="M220 650q8 -6 16 0" stroke="#3fa46f" stroke-width="3" fill="none"/>`,
})
