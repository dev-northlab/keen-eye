import { svgLevel } from '../helpers.ts'
import { cloud, flower, FLOWER_COLORS, grass, pick, sun } from '../shapes.ts'

/** (x, y) is the top of the root. Bounds: x ±10, y from −26 to +12. */
const carrot = (x: number, y: number) =>
  `<path d="M${x} ${y}Q${x - 10} ${y - 16} ${x - 8} ${y - 24}M${x} ${y}V${y - 26}M${x} ${y}Q${x + 10} ${y - 16} ${x + 8} ${y - 24}" ` +
  `stroke="#3f8f3a" stroke-width="4" fill="none" stroke-linecap="round"/>` +
  `<path d="M${x - 8} ${y}L${x + 8} ${y}L${x} ${y + 12}Z" fill="#f77f00"/>`

/** Bounds: about 60 around (x, y). */
const wateringCan = (x: number, y: number, flip: boolean) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<path d="M18 -4L45 -30" stroke="#4dabf7" stroke-width="7" stroke-linecap="round"/>` +
  `<circle cx="46" cy="-31" r="6" fill="#339af0"/>` +
  `<path d="M-25 -12Q-45 0 -25 12" stroke="#339af0" stroke-width="5" fill="none"/>` +
  `<rect x="-25" y="-20" width="45" height="40" rx="6" fill="#4dabf7"/>` +
  `<rect x="-20" y="-25" width="35" height="7" rx="3" fill="#339af0"/></g>`

const hat = (color: string) =>
  `<rect x="543" y="170" width="34" height="30" rx="4" fill="${color}"/>` +
  `<rect x="530" y="196" width="60" height="8" rx="3" fill="${color}"/>`

const smoke =
  `<circle cx="180" cy="108" r="10" fill="#d9d9d9"/><circle cx="190" cy="88" r="12" fill="#d9d9d9"/>` +
  `<circle cx="204" cy="68" r="14" fill="#d9d9d9"/>`

const butterfly = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cx="-8" cy="-4" rx="9" ry="12" fill="#ff8fab" transform="rotate(-25 -8 -4)"/>` +
  `<ellipse cx="8" cy="-4" rx="9" ry="12" fill="#ff8fab" transform="rotate(25 8 -4)"/>` +
  `<rect x="-1.5" y="-12" width="3" height="20" rx="1.5" fill="#333"/></g>`

export default svgLevel({
  id: 2,
  chapter: 'farm',
  title: 'garden',
  parTimeSec: 70,
  scene: ({ diff, anim, rand }) => {
    let tufts = ''
    for (let i = 0; i < 12; i++) tufts += grass(10 + rand() * 780, 315 + rand() * 55)
    let flowers = ''
    for (let i = 0; i < 8; i++) flowers += flower(20 + rand() * 230, 365 + rand() * 130, pick(rand, FLOWER_COLORS))
    let carrots = ''
    for (let x = 300; x <= 750; x += 50) {
      carrots += carrot(x, 390)
      carrots += x === 500 ? diff(500, 443, 28, carrot(500, 450), '') : carrot(x, 450)
    }

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(700, 80) +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 20 }, cloud(330, 90)) +
      anim({ type: 'path', points: [[0, 0], [-40, 0]], period: 16 }, cloud(520, 60, 0.7)) +
      `<rect y="300" width="800" height="200" fill="#9ccc65"/>` +
      tufts +
      // House
      `<rect x="165" y="125" width="24" height="60" fill="#8d6e63"/>` +
      diff(192, 88, 42, smoke, '') +
      `<path d="M25 210L130 125L235 210Z" fill="#b5523b"/>` +
      `<rect x="40" y="205" width="180" height="140" fill="#f2d29b"/>` +
      `<rect x="140" y="265" width="45" height="80" rx="4" fill="#8a5a33"/>` +
      `<circle cx="175" cy="308" r="3" fill="#f2d29b"/>` +
      `<rect x="66" y="236" width="48" height="48" fill="#ffffff"/>` +
      diff(90, 260, 32, `<rect x="70" y="240" width="40" height="40" fill="#7cc6f0"/>`, `<rect x="70" y="240" width="40" height="40" fill="#ffe066"/>`) +
      // Scarecrow
      `<rect x="556" y="230" width="8" height="130" fill="#8a5a33"/>` +
      `<rect x="505" y="255" width="110" height="8" fill="#8a5a33"/>` +
      `<path d="M530 245L590 245L598 310L522 310Z" fill="#e07a5f"/>` +
      `<circle cx="560" cy="225" r="22" fill="#f4d58d"/>` +
      `<circle cx="552" cy="222" r="2.5" fill="#333"/><circle cx="568" cy="222" r="2.5" fill="#333"/>` +
      `<path d="M551 233q9 6 18 0" stroke="#333" stroke-width="2" fill="none"/>` +
      diff(560, 188, 38, hat('#3d5a80'), hat('#c0392b')) +
      anim({ type: 'path', points: [[0, 0], [-60, -30], [-110, 0], [-60, 30]], period: 6 }, butterfly(420, 200)) +
      // Beds
      `<rect x="270" y="380" width="500" height="34" rx="10" fill="#8d5b3a"/>` +
      `<rect x="270" y="440" width="500" height="34" rx="10" fill="#8d5b3a"/>` +
      carrots +
      flowers +
      diff(160, 430, 64, wateringCan(160, 430, false), wateringCan(160, 430, true))
    )
  },
})
