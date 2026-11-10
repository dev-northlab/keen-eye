// Pet shop: aquarium, bird cage and shelves of pet food among the ten hardest of "memory" (hidden until released,
// levels/upcoming.ts). Fish in the tank, a parrot in its cage, bags of food, a puppy in its basket, a ball and bowls.
import { dog } from '../chapter-02/shapes.ts'
import { fish } from '../chapter-04/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { ball } from '../time/shapes.ts'
import { around, big, cube, painting, pillow, pottedPlant, room, rug, sticker, wallClock } from './shapes.ts'

/** Parrot sitting on a perch, faces left; (x, y) = feet. Bounds: x ±20, y from −50 to 0. */
const parrot = (x: number, y: number, body: string) =>
  `<g transform="translate(${x} ${y})"><path d="M4 -6l6 26l-12 -22Z" fill="${body}"/><ellipse cy="-20" rx="14" ry="20" fill="${body}"/>` +
  `<circle cx="-4" cy="-40" r="10" fill="${body}"/><path d="M-12 -42q-8 2 -6 10l6 -4Z" fill="#ffd23f"/><circle cx="-6" cy="-42" r="2" fill="#222"/>` +
  `<path d="M8 -26q6 10 0 20" stroke="#ffffff" stroke-opacity="0.5" stroke-width="3" fill="none"/></g>`

/** Bag of pet food; (x, y) = bottom left, 40 × 50, its label in `color`. */
const bag = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y}V${y - 44}l4 -6h32l4 6V${y}Z" fill="#f4f1e8"/><rect x="${x + 6}" y="${y - 36}" width="28" height="24" rx="4" fill="${color}"/>`

/** Pet bowl; (x, y) = bottom center. Bounds: x ±22, y from −12 to 0. */
const bowl = (x: number, y: number, color: string) =>
  `<path d="M${x - 22} ${y - 10}H${x + 22}L${x + 16} ${y}H${x - 16}Z" fill="${color}"/><ellipse cx="${x}" cy="${y - 10}" rx="22" ry="4" fill="#c97b3a"/>`

export default memoryLevel({
  id: 332,
  title: 'memoryPetShop',
  showSeconds: 5,
  scene: ({ diff }) =>
    room(520, '#d8f3dc', '#c9a26b') +
    // The aquarium: a fish's color, one more fish
    `<rect x="30" y="250" width="200" height="110" fill="#6b4f3a"/><rect x="44" y="270" width="78" height="76" fill="#5c3a22"/><rect x="138" y="270" width="78" height="76" fill="#5c3a22"/>` +
    `<rect x="30" y="110" width="200" height="140" fill="#8ecae6" stroke="#5c677d" stroke-width="5"/><path d="M33 236H227V247H33Z" fill="#c9a26b"/>` +
    `<path d="M60 236q-8 -30 4 -60M64 236q10 -24 0 -46M200 236q-10 -36 4 -70" stroke="#3fa46f" stroke-width="5" fill="none"/>` +
    big(80, 160, 1.5, fish(0, 0, '#ff9f43')) +
    diff(...around(146, 188, 194, 212, 30), big(170, 200, 1.5, fish(0, 0, '#ffd23f')), big(170, 200, 1.5, fish(0, 0, '#e63946'))) +
    diff(...around(81, 215, 119, 235, 30), '', big(100, 225, 1.2, fish(0, 0, '#3a86ff'))) +
    // The bird cage and its parrot
    `<path d="M380 20V80" stroke="#5c677d" stroke-width="2"/><path d="M330 240V130Q380 70 430 130V240" fill="none" stroke="#c9953f" stroke-width="3"/>` +
    `<path d="M345 240V112M362 240V96M380 240V90M398 240V96M415 240V112" stroke="#c9953f" stroke-width="2"/><rect x="324" y="236" width="112" height="8" rx="3" fill="#c9953f"/><path d="M350 212H410" stroke="#8a5a33" stroke-width="4"/>` +
    diff(...around(360, 160, 400, 230, 30), parrot(380, 212, '#3fa46f'), parrot(380, 212, '#e63946')) +
    // Shelves: a bag's label; a hamster cage and tins
    `<rect x="290" y="300" width="200" height="8" fill="#8a5a33"/><rect x="290" y="390" width="200" height="8" fill="#8a5a33"/>` +
    bag(300, 300, '#ffd23f') + bag(350, 300, '#3a86ff') + bag(450, 300, '#8338ec') +
    diff(...around(400, 250, 440, 300, 30), bag(400, 300, '#e63946'), bag(400, 300, '#3fa46f')) +
    `<rect x="300" y="340" width="70" height="50" fill="none" stroke="#adb5bd" stroke-width="3"/><path d="M314 340V390M328 340V390M342 340V390M356 340V390" stroke="#adb5bd" stroke-width="1.5"/>` +
    `<ellipse cx="335" cy="380" rx="12" ry="8" fill="#e9b872"/><circle cx="345" cy="376" r="5" fill="#e9b872"/>` +
    `<rect x="400" y="360" width="20" height="30" fill="#e07a5f"/><rect x="430" y="360" width="20" height="30" fill="#3a86ff"/><rect x="460" y="360" width="20" height="30" fill="#ffd23f"/>` +
    // Leashes on their hooks
    `<path d="M260 330q-10 40 4 70q14 10 6 -20M290 330q-8 50 6 80q14 6 4 -22M230 330q-6 30 6 56q12 8 4 -18" stroke="#e63946" stroke-width="4" fill="none"/>` +
    `<circle cx="230" cy="330" r="4" fill="#5c677d"/><circle cx="260" cy="330" r="4" fill="#5c677d"/><circle cx="290" cy="330" r="4" fill="#5c677d"/>` +
    // The puppy in its basket, the ball, the bowls
    rug(120, 640, 80, '#ffd23f') + `<path d="M60 630Q120 676 180 630Z" fill="#a0703f"/>` +
    diff(...around(85, 578, 155, 620, 30), big(120, 620, 1.6, dog(0, 0, '#ffffff')), '') +
    `<path d="M60 630H180" stroke="#8a5a33" stroke-width="5"/>` +
    diff(...around(244, 669, 356, 700, 30), big(260, 700, 1.3, ball(0, 0, '#3a86ff')), big(340, 700, 1.3, ball(0, 0, '#3a86ff'))) +
    bowl(360, 610, '#3a86ff') + bowl(410, 610, '#e63946') +
    diff(...around(438, 596, 482, 612, 30), bowl(460, 610, '#ffd23f'), '') +
    // Decor: small things that fill the shop, the same in both pictures
    wallClock(260, 90, 26, '#e63946') +
    painting(250, 160, 60, 50, '#3a86ff') +
    sticker(40, 60, '#ffd23f') +
    sticker(200, 60, '#ff6b8b') +
    big(470, 520, 0.5, pottedPlant(0, 0, '#3a86ff')) +
    cube(40, 724, 24, '#ffd23f') +
    pillow(200, 720, '#8338ec') +
    `<path d="M210 600h24M206 596a4 4 0 1 0 0 8M238 596a4 4 0 1 1 0 8" stroke="#f4f1e8" stroke-width="5" stroke-linecap="round" fill="none"/>`,
})
