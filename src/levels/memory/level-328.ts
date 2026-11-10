import { memoryLevel } from '../helpers.ts'
import { bucket } from '../shapes.ts'
import { around, big, books, bottle, cube, glassJar, hangingLamp, mug, shelf, wallClock } from './shapes.ts'
import { crate, logPile, poster, sack } from '../time/shapes.ts'

/** Paint can; (x, y) = bottom center. Bounds: x ±20, y from −52 to 0. */
const paintCan = (x: number, y: number, color: string) =>
  `<path d="M${x - 16} ${y - 46}q16 -12 32 0" stroke="#5c677d" stroke-width="2.5" fill="none"/>` +
  `<rect x="${x - 20}" y="${y - 46}" width="40" height="46" rx="3" fill="#c9d1cc"/><rect x="${x - 20}" y="${y - 34}" width="40" height="20" fill="${color}"/>` +
  `<path d="M${x - 8} ${y - 46}q0 10 4 14" stroke="${color}" stroke-width="5" fill="none"/>`

/** Toolbox; (x, y) = bottom center. Bounds: x ±50, y from −52 to 0. */
const toolbox = (x: number, y: number, color: string) =>
  `<path d="M${x - 20} ${y - 40}v-12h40v12" stroke="#3d4a55" stroke-width="5" fill="none"/>` +
  `<rect x="${x - 50}" y="${y - 40}" width="100" height="40" rx="4" fill="${color}"/><path d="M${x - 50} ${y - 26}h100" stroke="#000000" stroke-opacity="0.2" stroke-width="3"/>` +
  `<rect x="${x - 8}" y="${y - 30}" width="16" height="8" rx="2" fill="#c9d1cc"/>`

/** Pegboard with holes from (x0, y0) to (x1, y1). */
const pegboard = (x0: number, y0: number, x1: number, y1: number) => {
  let holes = ''
  for (let y = y0 + 12; y < y1; y += 20) for (let x = x0 + 12; x < x1; x += 20) holes += `<circle cx="${x}" cy="${y}" r="2" fill="#8a5a33"/>`
  return `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="4" fill="#c68b4e"/>${holes}`
}

export default memoryLevel({
  id: 328,
  title: 'memoryWorkshop',
  showSeconds: 4,
  scene: ({ diff }) =>
    `<rect width="500" height="560" fill="#d9b48a"/><path d="${Array.from({ length: 19 }, (_, i) => `M0 ${i * 30 + 15}H500`).join('')}" stroke="#c49a6c" stroke-width="2"/>` +
    `<rect y="560" width="500" height="190" fill="#7d6a5a"/>` +
    diff(250, 50, 50, hangingLamp(250, 50, '#e63946'), hangingLamp(250, 50, '#3a86ff')) +
    // Ladder
    `<path d="M30 730L70 370M80 730L120 370" stroke="#a0703f" stroke-width="8"/><path d="M38 670h50M45 610h50M52 550h50M58 490h50M65 430h50" stroke="#a0703f" stroke-width="6"/>` +
    // Pegboard with tools
    pegboard(150, 110, 390, 290) +
    `<rect x="190" y="150" width="10" height="110" rx="3" fill="#a0703f"/><rect x="172" y="136" width="46" height="18" rx="3" fill="#5c677d"/>` +
    diff(
      ...around(268, 130, 292, 248),
      `<rect x="275" y="150" width="10" height="80" rx="3" fill="#8d99ae"/><circle cx="280" cy="142" r="12" fill="none" stroke="#8d99ae" stroke-width="7"/><circle cx="280" cy="238" r="10" fill="none" stroke="#8d99ae" stroke-width="6"/>`,
      '',
    ) +
    `<rect x="347" y="140" width="16" height="40" rx="5" fill="#e63946"/><rect x="353" y="180" width="4" height="70" fill="#8d99ae"/>` +
    // Workbench
    `<rect x="110" y="490" width="16" height="160" fill="#6b4226"/><rect x="454" y="490" width="16" height="160" fill="#6b4226"/><rect x="104" y="600" width="372" height="10" fill="#8a5a33"/>` +
    `<rect x="100" y="470" width="380" height="20" rx="4" fill="#a0703f"/><rect x="112" y="448" width="30" height="22" fill="#5c677d"/><rect x="106" y="454" width="44" height="6" fill="#3d4a55"/>` +
    diff(...around(190, 418, 290, 470), toolbox(240, 470, '#e63946'), toolbox(240, 470, '#3a86ff')) +
    paintCan(340, 470, '#3fa46f') +
    paintCan(390, 470, '#ffd23f') +
    diff(...around(320, 418, 460, 470), paintCan(440, 470, '#8338ec'), '') +
    // Decor: small things that fill the room, the same in both pictures
    poster(420, 20, 36, 50, '#3a86ff') +
    shelf(400, 160, 90) +
    glassJar(415, 160, '#5c677d', '#8d99ae') +
    glassJar(445, 160, '#5c677d', '#c98b5a') +
    bottle(472, 160, '#e63946') +
    shelf(20, 160, 110) +
    big(50, 160, 0.5, books(0, 0, ['#3a86ff', '#ffb703'])) +
    mug(100, 160, '#3fa46f') +
    wallClock(450, 262, 24, '#e63946') +
    sack(380, 600) +
    crate(300, 600, 30) +
    cube(455, 745, 30, '#c68b4e') +
    logPile(260, 745) +
    crate(475, 712, 34, '#b07a42') +
    sack(100, 748) +
    bucket(485, 600, '#3fa46f') +
    diff(...around(302, 652, 418, 700), big(330, 700, 1.6, bucket(0, 0)), big(390, 700, 1.6, bucket(0, 0))) +
    diff(180, 690, 44, '', `<circle cx="180" cy="690" r="34" fill="none" stroke="#3d3d3d" stroke-width="16"/><circle cx="180" cy="690" r="26" fill="none" stroke="#5c5f66" stroke-width="2"/>`),
})
