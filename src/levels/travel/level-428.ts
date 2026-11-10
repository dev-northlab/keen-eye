// Mexico City: papel picado over the street, the Palace of Fine Arts with its orange dome, the golden
// Angel of Independence, a colorful trajinera boat on a canal, a cactus and two mariachis.
// Motion difference: one papel picado flag flutters quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { sky, sun, water } from './shapes.ts'

const PICADO = ['#e63946', '#ffd23f', '#3a86ff', '#8ac926', '#ff6b8b', '#8338ec', '#f28c28']
const stringY = (x: number) => 30 + 120 * (x / 800) * (1 - x / 800)

/** Papel picado flag hanging from the string at x. Bounds: x ±18, y from 0 to +32 under the string. */
const picado = (x: number, color: string) => {
  const y = stringY(x)
  return (
    `<path d="M${x - 18} ${y}H${x + 18}V${y + 26}L${x + 12} ${y + 32}L${x + 6} ${y + 26}L${x} ${y + 32}L${x - 6} ${y + 26}L${x - 12} ${y + 32}L${x - 18} ${y + 26}Z" fill="${color}"/>` +
    `<path d="M${x} ${y + 6}l6 7l-6 7l-6 -7Z" fill="#ffffff" fill-opacity="0.7"/>` +
    [-12, 12].map((dx) => `<circle cx="${x + dx}" cy="${y + 13}" r="2.4" fill="#ffffff" fill-opacity="0.7"/>`).join('')
  )
}

/** Palace of Fine Arts from x0 to x1, ground at 330; the main dome is separate. */
const palace = (x0: number, x1: number) =>
  `<rect x="${x0}" y="190" width="${x1 - x0}" height="140" fill="#f4f1ea"/><rect x="${x0 - 6}" y="184" width="${x1 - x0 + 12}" height="10" fill="#e3ddd0"/>` +
  [...Array(7).keys()].map((i) => `<rect x="${x0 + 16 + i * 36}" y="210" width="12" height="100" fill="#e3ddd0"/>`).join('') +
  `<path d="M${(x0 + x1) / 2 - 30} 330V280a30 30 0 0 1 60 0V330Z" fill="#7a8a99"/>` +
  `<rect x="${(x0 + x1) / 2 - 32}" y="160" width="64" height="26" fill="#f4f1ea"/>` +
  [x0 + 20, x1 - 20].map((x) => `<path d="M${x - 16} 186A16 18 0 0 1 ${x + 16} 186Z" fill="#e8762e"/>`).join('')
/** Main dome over the palace middle x. Bounds: x ±40, y from 106 to 162. */
const dome = (x: number, color: string) =>
  `<path d="M${x - 40} 162Q${x - 36} 112 ${x} 108Q${x + 36} 112 ${x + 40} 162Z" fill="${color}"/>` +
  `<path d="M${x - 20} 160Q${x - 16} 122 ${x} 110M${x + 20} 160Q${x + 16} 122 ${x} 110" fill="none" stroke="#ffffff" stroke-opacity="0.5" stroke-width="2"/>`

/** Angel of Independence on its column; (x, y) = foot. Ring at −130 is separate. */
const angel = (x: number, y: number) =>
  `<rect x="${x - 30}" y="${y - 30}" width="60" height="30" fill="#c9c2b4"/><rect x="${x - 9}" y="${y - 220}" width="18" height="190" fill="#e3ddd0"/>` +
  [-60, -190].map((dy) => ring(x, y + dy, '#c9a227')).join('') +
  `<rect x="${x - 14}" y="${y - 228}" width="28" height="10" fill="#c9a227"/>` +
  `<path d="M${x - 4} ${y - 228}L${x - 6} ${y - 252}H${x + 6}L${x + 4} ${y - 228}Z" fill="#d8b23a"/><circle cx="${x}" cy="${y - 257}" r="5" fill="#d8b23a"/>` +
  `<path d="M${x - 4} ${y - 248}Q${x - 26} ${y - 262} ${x - 20} ${y - 236}ZM${x + 4} ${y - 248}Q${x + 26} ${y - 262} ${x + 20} ${y - 236}Z" fill="#d8b23a"/>` +
  `<path d="M${x + 4} ${y - 250}L${x + 10} ${y - 268}" stroke="#d8b23a" stroke-width="3"/>`
/** Ring around the column at (x, y). Bounds: x ±12, y ±4. */
const ring = (x: number, y: number, color: string) => `<rect x="${x - 12}" y="${y - 4}" width="24" height="8" rx="2" fill="${color}"/>`

/** Trajinera, bow to the left; (x, y) = waterline middle. The name board and the bow flowers are separate. */
const trajinera = (x: number, y: number) =>
  `<path d="M${x - 90} ${y - 14}H${x + 90}L${x + 80} ${y + 4}H${x - 80}Z" fill="#3fa46f"/><path d="M${x - 90} ${y - 10}H${x + 90}" stroke="#ffd23f" stroke-width="3"/>` +
  `<path d="M${x - 60} ${y - 14}V${y - 40}M${x + 60} ${y - 14}V${y - 40}" stroke="#e63946" stroke-width="5"/><path d="M${x - 66} ${y - 40}Q${x} ${y - 66} ${x + 66} ${y - 40}Z" fill="#e63946"/>`
/** Name board on the arch. Bounds: x ±36, y from −56 to −40. */
const nameBoard = (x: number, y: number, color: string) => `<rect x="${x - 36}" y="${y - 56}" width="72" height="16" rx="4" fill="${color}"/>`
/** Flowers on the bow. Bounds: circle of radius 14 around (x, y − 22). */
const bowFlowers = (x: number, y: number) =>
  [[-8, -20], [0, -28], [8, -20], [0, -16]].map(([dx, dy], i) => `<circle cx="${x + dx}" cy="${y + dy}" r="6" fill="${['#ff6b8b', '#ffd23f', '#f28c28', '#ffffff'][i]}"/>`).join('')

/** Saguaro-like cactus; (x, y) = foot. Bounds: x ±30, y from −96 to 0. */
const cactus = (x: number, y: number) =>
  `<rect x="${x - 10}" y="${y - 90}" width="20" height="90" rx="10" fill="#4f9a4a"/><path d="M${x - 10} ${y - 44}H${x - 24}V${y - 70}M${x + 10} ${y - 54}H${x + 22}V${y - 78}" fill="none" stroke="#4f9a4a" stroke-width="12" stroke-linecap="round"/>`
const cactusFlower = (x: number, y: number) =>
  [0, 72, 144, 216, 288].map((d) => `<ellipse cx="${(x + 5 * Math.cos((d * Math.PI) / 180)).toFixed(1)}" cy="${(y + 5 * Math.sin((d * Math.PI) / 180)).toFixed(1)}" rx="4" ry="4" fill="#ff6b8b"/>`).join('') +
  `<circle cx="${x}" cy="${y}" r="3" fill="#ffd23f"/>`

/** Mariachi facing right; (x, y) = feet. Sombrero and guitar are separate. */
const mariachi = (x: number, y: number) =>
  `<rect x="${x - 9}" y="${y - 26}" width="7" height="26" fill="#1d1d1d"/><rect x="${x + 2}" y="${y - 26}" width="7" height="26" fill="#1d1d1d"/>` +
  `<path d="M${x - 12} ${y - 52}h24l2 28h-28Z" fill="#1d1d1d"/>` +
  [-46, -40, -34].map((dy) => `<circle cx="${x - 9}" cy="${y + dy}" r="1.6" fill="#c9a227"/><circle cx="${x + 9}" cy="${y + dy}" r="1.6" fill="#c9a227"/>`).join('') +
  `<circle cy="${y - 58}" cx="${x}" r="8" fill="#c68b59"/><path d="M${x - 5} ${y - 53}h10" stroke="#3d2a1c" stroke-width="2"/>`
/** Sombrero on a mariachi standing at (x, y). Bounds: x ±26, y from −80 to −62. */
const sombrero = (x: number, y: number, color: string) =>
  `<ellipse cx="${x}" cy="${y - 64}" rx="26" ry="5" fill="${color}"/><path d="M${x - 10} ${y - 64}Q${x - 8} ${y - 80} ${x} ${y - 80}Q${x + 8} ${y - 80} ${x + 10} ${y - 64}Z" fill="${color}"/>` +
  `<path d="M${x - 24} ${y - 64}h48" stroke="#c9a227" stroke-width="1.6"/>`
/** Guitar held by a mariachi at (x, y). Bounds: x from −4 to +30, y from −52 to −22. */
const guitar = (x: number, y: number, color: string) =>
  `<path d="M${x + 4} ${y - 30}L${x + 28} ${y - 50}" stroke="#5c3d24" stroke-width="4"/>` +
  `<circle cx="${x + 6}" cy="${y - 30}" r="9" fill="${color}"/><circle cx="${x + 14}" cy="${y - 36}" r="7" fill="${color}"/><circle cx="${x + 8}" cy="${y - 31}" r="2.6" fill="#3d2a1c"/>`

export default travelLevel({
  id: 428,
  title: 'mexicoCity',
  parTimeSec: 130,
  place: { region: 'americas', country: 'mx', lat: 19.43, lon: -99.13 },
  scene: ({ diff, anim, rand, extra }) => {
    const flutter = (period: number) => anim({ id: 'picado', type: 'sway', angle: 12, pivot: [630, stringY(630)], period }, picado(630, PICADO[3]))
    return (
      sky('#9fd6f2') +
      sun(720, 120, '#ffc94a') +
      // Palace and the Angel
      palace(40, 300) +
      diff(170, 136, 50, dome(170, '#e8762e'), dome(170, '#3a86ff')) +
      `<path d="M300 330V250h70v-30h50v40h40v70Z" fill="#e3ddd0"/>` +
      angel(560, 330) +
      diff(560, 200, 18, ring(560, 200, '#c9a227'), ring(560, 200, '#f4f1ea')) +
      // Canal with the trajinera
      water(330, '#4f9a8f', rand, 12) +
      trajinera(330, 390) +
      diff(330, 342, 38, nameBoard(330, 390, '#ffd23f'), nameBoard(330, 390, '#3a86ff')) +
      diff(250, 368, 20, bowFlowers(250, 390), '') +
      // Street
      `<rect y="420" width="800" height="80" fill="#e3c99b"/>` +
      cactus(70, 492) +
      diff(70, 400, 18, cactusFlower(70, 400), '') +
      mariachi(560, 494) +
      diff(560, 424, 28, sombrero(560, 494, '#1d1d1d'), sombrero(560, 494, '#c9302c')) +
      mariachi(690, 494) +
      sombrero(690, 494, '#1d1d1d') +
      diff(703, 458, 24, guitar(690, 494, '#d9a35b'), guitar(690, 494, '#e63946')) +
      // Papel picado
      `<path d="M0 30Q400 90 800 30" fill="none" stroke="#3d4a55" stroke-width="2"/>` +
      [30, 90, 210, 270, 330, 450, 510, 570, 690, 750].map((x, i) => picado(x, PICADO[i % PICADO.length])).join('') +
      diff(150, stringY(150) + 16, 22, picado(150, PICADO[1]), picado(150, PICADO[6])) +
      diff(390, stringY(390) + 16, 22, picado(390, PICADO[2]), '') +
      diff(630, stringY(630) + 16, 24, flutter(1), flutter(2.4), 'picado') +
      // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
      decor({ anim }, [
        ['newspaperBox', 500, 488, '#e63946'],
        ['pigeon', 280, 476],
        ['suitcase', 112, 488, '#3a86ff'],
        ['bottle', 732, 392],
        ['bottle', 588, 360],
        ['birds', 380, 180],
        ['balloon', 636, 148, '#ffd23f'],
      ]) +
      extras({ extra, anim }, [
        ['bin', 624, 488, '#2a9d8f'],
        ['coffeeCup', 392, 452],
        ['lifeRing', 164, 356],
        ['birds', 504, 268],
        ['cloud', 708, 280],
      ])
    )
  },
})
