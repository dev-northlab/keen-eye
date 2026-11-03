import { bird, butterfly, mushroom } from '../chapter-03/shapes.ts'
import { svgLevel } from '../helpers.ts'
import { cat, cloud, cow, fence, flower, FLOWER_COLORS, grass, pick, sun, wheelbarrow } from '../shapes.ts'

/** (x, y) = bottom center. Bounds: x ±14, y from −40 to 0. */
const milkCan = (x: number, y: number) =>
  `<path d="M${x - 14} ${y}V${y - 26}L${x - 8} ${y - 34}H${x + 8}L${x + 14} ${y - 26}V${y}Z" fill="#c9d1d9"/>` +
  `<rect x="${x - 9}" y="${y - 40}" width="18" height="7" rx="2" fill="#9aa5b1"/>` +
  `<path d="M${x - 14} ${y - 12}H${x + 14}" stroke="#9aa5b1" stroke-width="3"/>`

/** Weather vane on a pole standing at (x, y). Bounds: x ±24, y from −38 to 0. */
const vane = (x: number, y: number) =>
  `<path d="M${x} ${y}V${y - 30}" stroke="#333" stroke-width="3"/>` +
  `<path d="M${x - 22} ${y - 30}H${x + 18}M${x + 12} ${y - 36}L${x + 22} ${y - 30}L${x + 12} ${y - 24}" stroke="#333" stroke-width="3" fill="none"/>` +
  `<path d="M${x - 22} ${y - 30}l-2 -7h8Z" fill="#333"/>`

const doorX = `<path d="M594 274L666 356M666 274L594 356" stroke="#c8423b" stroke-width="7"/>`

export default svgLevel({
  id: 10,
  chapter: 'farm',
  title: 'pasture',
  parTimeSec: 80,
  scene: ({ diff, anim, rand }) => {
    let tufts = ''
    for (let i = 0; i < 14; i++) tufts += grass(10 + rand() * 780, 370 + rand() * 125)
    let flowers = ''
    for (let i = 0; i < 8; i++) {
      const x = 240 + rand() * 260
      const y = 470 + rand() * 25
      const period = 2.5 + rand()
      flowers += anim({ type: 'sway', angle: 6, pivot: [x, y], period, phase: rand() }, flower(x, y, pick(rand, FLOWER_COLORS)))
    }

    return (
      `<rect width="800" height="500" fill="#b6e1f4"/>` +
      sun(90, 75) +
      anim({ type: 'path', points: [[0, 0], [70, 0]], period: 24 }, cloud(270, 80, 0.8)) +
      anim({ type: 'path', points: [[0, 0], [-40, 0]], period: 17 }, cloud(440, 55, 0.55)) +
      `<ellipse cx="300" cy="350" rx="400" ry="70" fill="#a6d985"/>` +
      `<rect y="345" width="800" height="155" fill="#8fca68"/>` +
      // Barn
      diff(630, 100, 34, vane(630, 122), '') +
      `<rect x="520" y="200" width="220" height="160" fill="#c8423b"/>` +
      `<path d="M505 205L630 120L755 205Z" fill="#8e2c27"/>` +
      `<rect x="608" y="215" width="44" height="32" fill="#f4e9d8"/>` +
      `<rect x="590" y="270" width="80" height="90" fill="#f4e9d8"/>` +
      diff(630, 315, 62, doorX, '') +
      fence(0, 500, 335) +
      tufts +
      milkCan(130, 470) +
      diff(90, 450, 26, milkCan(90, 470), '') +
      milkCan(170, 470) +
      diff(196, 400, 48, cow(200, 400), cow(200, 400, false, '#8a5a33')) +
      diff(420, 415, 80, cow(420, 415), cow(420, 415, true)) +
      // Grazing cow by the barn
      anim({ type: 'sway', angle: 3, pivot: [700, 450], period: 3.2 }, cow(700, 412, true)) +
      flowers +
      anim({ type: 'path', points: [[0, 0], [-60, -30], [-110, 0], [-60, 30]], period: 6 }, `<g transform="translate(300 300)"><ellipse cx="-6" cy="-3" rx="7" ry="9" fill="#ffd166" transform="rotate(-25 -6 -3)"/><ellipse cx="6" cy="-3" rx="7" ry="9" fill="#ffd166" transform="rotate(25 6 -3)"/><rect x="-1.5" y="-10" width="3" height="16" rx="1.5" fill="#333"/></g>`) +
      cat(595, 480) +
      bird(331, 323) +
      wheelbarrow(555, 402) +
      mushroom(25, 420) +
      butterfly(775, 320)
    )
  },
})
