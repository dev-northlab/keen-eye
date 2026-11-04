import { extras } from '../extras.ts'
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
  scene: ({ diff, extra, anim }) =>
    `<rect width="800" height="360" fill="#d9b48a"/><path d="${Array.from({ length: 12 }, (_, i) => `M0 ${i * 30 + 15}H800`).join('')}" stroke="#c49a6c" stroke-width="2"/>` +
    `<rect y="360" width="800" height="140" fill="#7d6a5a"/>` +
    diff(400, 50, 50, hangingLamp(400, 50, '#e63946'), hangingLamp(400, 50, '#3a86ff')) +
    // Ladder
    `<path d="M30 460L70 100M80 460L120 100" stroke="#a0703f" stroke-width="8"/><path d="M38 400h50M45 340h50M52 280h50M58 220h50M65 160h50" stroke="#a0703f" stroke-width="6"/>` +
    // Pegboard with tools
    pegboard(100, 80, 340, 260) +
    `<rect x="140" y="120" width="10" height="110" rx="3" fill="#a0703f"/><rect x="122" y="106" width="46" height="18" rx="3" fill="#5c677d"/>` +
    diff(
      ...around(218, 100, 242, 218),
      `<rect x="225" y="120" width="10" height="80" rx="3" fill="#8d99ae"/><circle cx="230" cy="112" r="12" fill="none" stroke="#8d99ae" stroke-width="7"/><circle cx="230" cy="208" r="10" fill="none" stroke="#8d99ae" stroke-width="6"/>`,
      '',
    ) +
    `<rect x="297" y="110" width="16" height="40" rx="5" fill="#e63946"/><rect x="303" y="150" width="4" height="70" fill="#8d99ae"/>` +
    // Workbench
    `<rect x="390" y="300" width="16" height="160" fill="#6b4226"/><rect x="734" y="300" width="16" height="160" fill="#6b4226"/><rect x="384" y="410" width="372" height="10" fill="#8a5a33"/>` +
    `<rect x="380" y="280" width="380" height="20" rx="4" fill="#a0703f"/><rect x="392" y="258" width="30" height="22" fill="#5c677d"/><rect x="386" y="264" width="44" height="6" fill="#3d4a55"/>` +
    diff(...around(470, 228, 570, 280), toolbox(520, 280, '#e63946'), toolbox(520, 280, '#3a86ff')) +
    paintCan(620, 280, '#3fa46f') +
    paintCan(670, 280, '#ffd23f') +
    diff(...around(600, 228, 740, 280), paintCan(720, 280, '#8338ec'), '') +
    // Decor: small things that fill the room, the same in both pictures
    poster(500, 20, 36, 50, '#3a86ff') +
    shelf(480, 120, 280) +
    glassJar(510, 120, '#5c677d', '#8d99ae') +
    glassJar(545, 120, '#5c677d', '#c98b5a') +
    bottle(580, 120, '#e63946') +
    big(640, 120, 0.5, books(0, 0, ['#3a86ff', '#ffb703'])) +
    mug(700, 120, '#3fa46f') +
    wallClock(390, 190, 24, '#e63946') +
    sack(440, 410) +
    crate(700, 410, 30) +
    cube(290, 490, 30, '#c68b4e') +
    logPile(340, 490) +
    crate(420, 490, 34, '#b07a42') +
    sack(700, 490) +
    bucket(770, 490, '#3fa46f') +
    diff(...around(502, 412, 618, 460), big(530, 460, 1.6, bucket(0, 0)), big(590, 460, 1.6, bucket(0, 0))) +
    diff(200, 455, 44, '', `<circle cx="200" cy="455" r="34" fill="none" stroke="#3d3d3d" stroke-width="16"/><circle cx="200" cy="455" r="26" fill="none" stroke="#5c5f66" stroke-width="2"/>`) +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['wrench', 279, 409],
      ['toolbox', 53, 470],
      ['fuelCanister', 664, 485],
      ['frame', 639, 62, '#3a86ff'],
      ['wrench', 123, 35],
    ]),
})
