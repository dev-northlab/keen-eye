import { fireLogs, flame } from '../chapter-03/shapes.ts'
import { star } from '../chapter-05/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { level330Redesign } from './level-330-redesign.ts'
import { ball, cat } from '../time/shapes.ts'
import { around, big, candle, cube, gift, painting, room, rug, slipperPair, sticker, teddy, wallClock } from './shapes.ts'

/** Christmas stocking hanging from the mantel at x. Bounds: x from −16 to +40, y from 212 to 292. */
const stocking = (x: number, color: string) =>
  `<path d="M${x - 12} 216h24v44q0 8 8 8h10q10 0 10 12q0 12 -12 12h-24q-16 0 -16 -16Z" fill="${color}"/>` +
  `<rect x="${x - 16}" y="212" width="32" height="14" rx="4" fill="#ffffff"/>`

/** Ornament ball; (x, y) = center. Bounds: radius 10 (+4 for the cap). */
const ornament = (x: number, y: number, color: string) =>
  `<rect x="${x - 3}" y="${y - 14}" width="6" height="5" fill="#c9953f"/><circle cx="${x}" cy="${y}" r="10" fill="${color}"/><circle cx="${x - 3}" cy="${y - 3}" r="3" fill="#ffffff" fill-opacity="0.6"/>`

/** Snowy night window from (x, y), w × h. */
const nightWindow = (x: number, y: number, w: number, h: number) =>
  `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="4" fill="#ffffff"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#2b3a78"/>` +
  [[20, 20], [60, 40], [110, 25], [40, 80], [90, 95], [130, 70], [25, 125], [75, 135], [120, 120]]
    .map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="3" fill="#ffffff"/>`)
    .join('') +
  `<path d="M${x} ${y + h - 14}q${w / 2} -16 ${w} 0V${y + h}H${x}Z" fill="#ffffff"/>` +
  `<path d="M${x + w / 2} ${y}V${y + h}M${x} ${y + h / 2}H${x + w}" stroke="#ffffff" stroke-width="6"/>`

/** Armchair; bounds: x 30…210, y 300…450. */
const armchair = () =>
  `<rect x="44" y="436" width="12" height="14" fill="#6b4226"/><rect x="184" y="436" width="12" height="14" fill="#6b4226"/>` +
  `<rect x="50" y="300" width="140" height="110" rx="24" fill="#3a86ff"/><rect x="40" y="380" width="160" height="56" rx="14" fill="#3a86ff"/>` +
  `<rect x="30" y="350" width="34" height="86" rx="14" fill="#2f6fd6"/><rect x="176" y="350" width="34" height="86" rx="14" fill="#2f6fd6"/>`

/** Garland of bulbs across the top. */
const lights = () =>
  `<path d="M0 30Q100 50 200 30T400 30T600 30T800 30" stroke="#3f8f3a" stroke-width="3" fill="none"/>` +
  Array.from({ length: 16 }, (_, i) => {
    const x = 25 + i * 50
    return `<circle cx="${x}" cy="${40 - Math.abs(Math.cos((x / 200) * Math.PI)) * 8}" r="6" fill="${['#e63946', '#ffd23f', '#3a86ff', '#3fa46f'][i % 4]}"/>`
  }).join('')

/** Markup moved by (dx, dy): parts of the room drawn at their helpers' places. Zones inside are given moved. */
const at = (dx: number, dy: number, markup: string) => `<g transform="translate(${dx} ${dy})">${markup}</g>`

export default memoryLevel({
  id: 330,
  title: 'memoryHoliday',
  showSeconds: 4,
  redesign: level330Redesign,
  scene: ({ diff }) =>
    room(520, '#f3e3c3', '#a0703f') +
    Array.from({ length: 42 }, (_, i) => `<circle cx="${(i % 7) * 70 + 20 + (Math.floor(i / 7) % 2) * 35}" cy="${Math.floor(i / 7) * 90 + 70}" r="4" fill="#e07a5f" fill-opacity="0.35"/>`).join('') +
    lights() +
    nightWindow(30, 70, 150, 150) +
    // Fireplace
    at(
      -270,
      140,
      `<rect x="300" y="215" width="220" height="165" fill="#b5523b"/>` +
        `<path d="M300 250H520M300 290H520M300 330H520M340 215V250M420 215V250M500 215V250M320 250V290M380 250V290M460 250V290" stroke="#8f3d2b" stroke-width="3"/>` +
        `<path d="M350 380V310Q350 280 380 280H440Q470 280 470 310V380Z" fill="#3d2a20"/>` +
        big(410, 380, 1.5, fireLogs(0, 0) + flame(0, 0)) +
        `<rect x="290" y="200" width="240" height="16" rx="4" fill="#8a5a33"/>` +
        candle(320, 200, '#ffffff') +
        diff(...around(244, 298, 260, 340, 30), candle(522, 200, '#ffffff'), '') +
        stocking(355, '#e63946') +
        stocking(405, '#3fa46f') +
        diff(...around(69, 352, 225, 432), stocking(455, '#e63946'), ''),
    ) +
    // Tree
    at(
      -270,
      80,
      `<rect x="660" y="400" width="20" height="40" fill="#6b4226"/>` +
        `<path d="M580 400L670 280L760 400ZM600 300L670 190L740 300ZM620 200L670 110L720 200Z" fill="#2f7d55"/>` +
        `<path d="M600 380Q670 350 740 370M615 285Q670 260 725 275M635 190Q670 175 705 185" stroke="#ffd23f" stroke-width="3" fill="none"/>` +
        diff(...around(378, 154, 422, 198), star(670, 96, 22, '#ffd23f'), star(670, 96, 22, '#e63946')) +
        ornament(630, 330, '#e63946') +
        ornament(705, 352, '#ffd23f') +
        ornament(670, 250, '#3a86ff') +
        ornament(720, 265, '#e63946') +
        ornament(645, 165, '#ff6b8b') +
        ornament(695, 160, '#ffd23f') +
        ornament(655, 225, '#ffd23f') +
        ornament(700, 330, '#ff6b8b') +
        ornament(740, 385, '#3a86ff'),
    ) +
    rug(330, 700, 110, '#e63946') +
    gift(345, 548, 50, '#3fa46f', '#e63946') +
    gift(450, 552, 60, '#ffd23f', '#3a86ff') +
    at(0, 230, armchair()) +
    diff(...around(91, 552, 149, 610), '', big(120, 610, 1.6, cat(0, 0, '#3d3d3d', true))) +
    // Decor: small things that fill the room, the same in both pictures
    painting(220, 80, 50, 60, '#e63946') +
    wallClock(250, 205, 22, '#3fa46f') +
    sticker(300, 110, '#ffd23f') +
    sticker(470, 110, '#ffffff') +
    sticker(482, 250, '#e63946') +
    sticker(12, 262, '#3fa46f') +
    slipperPair(255, 548, '#e63946') +
    big(470, 722, 0.5, teddy(0, 0)) +
    gift(240, 738, 30, '#e63946', '#ffffff') +
    gift(482, 615, 30, '#8338ec', '#ffd23f') +
    ball(40, 722, '#e63946') +
    cube(120, 728, 24, '#3a86ff') +
    diff(...around(270, 646, 385, 712), gift(360, 712, 50, '#8338ec', '#ffd23f'), gift(295, 712, 50, '#8338ec', '#ffd23f')),
})
