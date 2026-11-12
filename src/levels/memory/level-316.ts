import { memoryLevel } from '../helpers.ts'
import { ball, cat, pot } from '../time/shapes.ts'
import { around, big, books, cup, curtains, flowerVase, glassJar, mug, painting, pillow, pottedPlant, room, rug, shelf, slipperPair, tableLamp, wallClock, windowPane } from './shapes.ts'

/** Sofa; (x, y) = floor under the middle, w wide. Bounds: x ±(w/2 + 20), y from −130 to 0. */
const sofa = (x: number, y: number, w: number, color: string) =>
  `<rect x="${x - w / 2}" y="${y - 14}" width="12" height="14" fill="#6b4f3a"/><rect x="${x + w / 2 - 12}" y="${y - 14}" width="12" height="14" fill="#6b4f3a"/>` +
  `<rect x="${x - w / 2}" y="${y - 130}" width="${w}" height="84" rx="22" fill="${color}"/>` +
  `<rect x="${x - w / 2 - 10}" y="${y - 62}" width="${w + 20}" height="50" rx="14" fill="${color}"/>` +
  `<path d="M${x - w / 2 + 10} ${y - 60}h${w - 20}" stroke="#000000" stroke-opacity="0.12" stroke-width="4"/>` +
  `<rect x="${x - w / 2 - 20}" y="${y - 92}" width="42" height="80" rx="16" fill="${color}"/><rect x="${x + w / 2 - 22}" y="${y - 92}" width="42" height="80" rx="16" fill="${color}"/>`

/** Square cushion with a button; (x, y) = center. Bounds: x ±30, y ±25. */
const cushion = (x: number, y: number, color: string) =>
  `<rect x="${x - 30}" y="${y - 25}" width="60" height="50" rx="12" fill="${color}"/><circle cx="${x}" cy="${y}" r="4" fill="#ffffff" fill-opacity="0.6"/>`

/** Bookcase from x0 to x1, top at y0, standing on y1, with shelves at `shelves` and rows of books on them. */
const bookcase = (x0: number, x1: number, y0: number, y1: number, shelves: number[]) => {
  const colors = ['#e63946', '#3a86ff', '#ffb703', '#3fa46f', '#8338ec', '#ff6b8b', '#4dabf7']
  const rows = shelves.slice(1).map((y, r) => {
    let x = x0 + 14
    let out = ''
    for (let i = 0; x < x1 - 30; i++) {
      const w = 14 + ((i + r) % 3) * 4
      const h = 46 + ((i * 7 + r) % 3) * 6
      out += `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="2" fill="${colors[(i + r * 2) % colors.length]}"/>`
      x += w + 3
    }
    return out
  })
  return (
    `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="4" fill="#8a5a33"/>` +
    `<rect x="${x0 + 10}" y="${y0 + 10}" width="${x1 - x0 - 20}" height="${y1 - y0 - 20}" fill="#6b4226"/>` +
    rows.join('') +
    shelves.map((y) => `<rect x="${x0 + 6}" y="${y}" width="${x1 - x0 - 12}" height="10" fill="#a0703f"/>`).join('')
  )
}

/** Vase with three flowers; (x, y) = bottom center. Bounds: x ±20, y from −71 to 0. */
const vase = (x: number, y: number) =>
  `<path d="M${x - 10} ${y - 30}l-8 -26M${x} ${y - 30}v-34M${x + 10} ${y - 30}l8 -26" stroke="#3f8f3a" stroke-width="3"/>` +
  `<circle cx="${x - 18}" cy="${y - 58}" r="7" fill="#ff6b8b"/><circle cx="${x}" cy="${y - 64}" r="7" fill="#ffd23f"/><circle cx="${x + 18}" cy="${y - 58}" r="7" fill="#b38cff"/>` +
  `<path d="M${x - 8} ${y - 34}h16l-2 6q12 8 10 18q-2 10 -16 10q-14 0 -16 -10q-2 -10 10 -18Z" fill="#4dabf7"/>`

/** Floor lamp; (x, y) = foot. Bounds: x ±40, y from −240 to 0. */
const floorLamp = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 4}" rx="26" ry="6" fill="#3d4a55"/><rect x="${x - 3}" y="${y - 200}" width="6" height="196" fill="#3d4a55"/>` +
  `<path d="M${x - 24} ${y - 240}h48l16 50h-80Z" fill="#ffe08a"/>`

/** Wallpaper stripes over the wall above y. */
const stripes = (y: number) =>
  Array.from({ length: 20 }, (_, i) => `<rect x="${i * 40 + 14}" width="12" height="${y}" fill="#ffffff" fill-opacity="0.35"/>`).join('')

export default memoryLevel({
  id: 316,
  title: 'memoryLivingRoom',
  showSeconds: 5,
  scene: ({ diff }) =>
    room(470, '#cfe3c8', '#b98b5e') +
    stripes(462) +
    windowPane(30, 50, 100, 110) +
    curtains(30, 130, 44, 140, '#5c8fbf') +
    diff(...around(192, 52, 318, 148), painting(200, 60, 110, 80, '#e07a5f'), '') +
    diff(420, 90, 38, wallClock(420, 90, 32, '#e07a5f'), wallClock(420, 90, 32, '#3a86ff')) +
    `<rect x="300" y="318" width="14" height="22" rx="3" fill="#ffffff"/>` +
    bookcase(340, 490, 180, 470, [260, 330, 400, 470]) +
    diff(...around(370, 189, 410, 260), vase(390, 260), '') +
    `<circle cx="460" cy="244" r="16" fill="#ffb703"/><rect x="440" y="256" width="40" height="4" fill="#8a5a33"/>` +
    floorLamp(60, 620) +
    sofa(250, 620, 220, '#e07a5f') +
    cushion(180, 530, '#ffd23f') +
    cushion(250, 530, '#3fa46f') +
    cushion(320, 530, '#ffd23f') +
    rug(230, 700, 170, '#c98bb9') +
    // Coffee table with a cup and books
    `<rect x="130" y="672" width="10" height="34" fill="#6b4f3a"/><rect x="280" y="672" width="10" height="34" fill="#6b4f3a"/><rect x="120" y="660" width="180" height="14" rx="5" fill="#a0703f"/>` +
    books(170, 660, ['#3a86ff', '#e63946']) +
    cup(255, 660, '#ffb703') +
    pottedPlant(40, 745) +
    // Decor: small things that fill the room, the same in both pictures
    pot(80, 166, '#3a86ff') +
    painting(165, 205, 40, 50, '#3a86ff') +
    painting(30, 230, 50, 40, '#3fa46f') +
    shelf(20, 330, 120) +
    mug(50, 330, '#e63946') +
    flowerVase(100, 330, '#3a86ff') +
    glassJar(125, 330, '#3fa46f', '#ff9f43') +
    painting(270, 210, 40, 50, '#ffb703') +
    big(460, 180, 0.35, tableLamp(0, 0, '#ff6b8b')) +
    pot(310, 470) +
    pillow(440, 515, '#3fa46f') +
    ball(110, 692, '#ff6b8b') +
    slipperPair(110, 740, '#8338ec') +
    big(300, 740, 0.6, books(0, 0, ['#3fa46f', '#ffb703'])) +
    pot(20, 470) +
    diff(...around(337, 635, 483, 700), big(370, 700, 1.8, cat(0, 0, '#8d99ae', true)), big(450, 700, 1.8, cat(0, 0, '#8d99ae', true))),
})
