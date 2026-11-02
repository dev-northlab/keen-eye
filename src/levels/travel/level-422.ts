// Bangkok: the prangs of Wat Arun by the Chao Phraya, a temple with tiered roofs and golden horns, a
// long-tail boat, a floating market boat and a tuk-tuk.
// Motion difference: a lantern under the temple eave swings quickly on picture A and slowly on picture B.
import { travelLevel } from '../helpers.ts'
import { cloud, lantern, person, sky, sun, water } from './shapes.ts'

const PRANG = '#e6dccb'

/** Prang (temple tower) around x from the foot at y; tiers shrink to the tip. Scale s. Tip at y − 256·s. */
function prang(x: number, y: number, s: number) {
  const tiers: [number, number, number][] = [[0, 50, 40], [50, 100, 32], [100, 140, 25], [140, 175, 18], [175, 205, 12], [205, 230, 7]]
  return (
    tiers
      .map(([a, b, w]) => `<rect x="${x - w * s}" y="${y - b * s}" width="${w * 2 * s}" height="${(b - a) * s}" fill="${PRANG}"/><rect x="${x - w * s}" y="${y - b * s}" width="${w * 2 * s}" height="${4 * s}" fill="#c9a227"/>`)
      .join('') + `<rect x="${x - 3 * s}" y="${y - 244 * s}" width="${6 * s}" height="${14 * s}" fill="#c9a227"/>`
  )
}
/** Golden tip of the big prang at (x, y). Bounds: x ±4, y from −262 to −242. */
const tip = (x: number, y: number) => `<path d="M${x - 4} ${y - 242}L${x} ${y - 262}L${x + 4} ${y - 242}Z" fill="#c9a227"/>`
/** Colored band on the third tier of the big prang. Bounds: x ±25, y from −122 to −116. */
const band = (x: number, y: number, color: string) => `<rect x="${x - 25}" y="${y - 122}" width="50" height="6" fill="${color}"/>`

/** Temple from x0 to x1 with tiered roofs; walls to y = 300. Horns, door and lantern separate. */
const temple = (x0: number, x1: number) => {
  const w = x1 - x0
  return (
    `<rect x="${x0 + 20}" y="230" width="${w - 40}" height="70" fill="#fbf4e6"/>` +
    `<path d="M${x0} 232L${x0 + 60} 170H${x1 - 60}L${x1} 232Z" fill="#d9542b" stroke="#2f8f5a" stroke-width="5" stroke-linejoin="round"/>` +
    `<path d="M${x0 + 40} 182L${x0 + 90} 128H${x1 - 90}L${x1 - 40} 182Z" fill="#e8762e" stroke="#2f8f5a" stroke-width="5" stroke-linejoin="round"/>` +
    horn(x0 + 40, 182, -1) +
    horn(x1 - 40, 182, 1) +
    horn(x0, 232, -1) +
    [x0 + 50, x1 - 50].map((x) => `<rect x="${x - 8}" y="246" width="16" height="30" rx="8" fill="#c9a227"/>`).join('')
  )
}
/** Golden horn (chofa) at a roof end (x, y), curling outwards (`dir` ±1). Bounds: x from 0 to 12·dir, y from −20 to 0. */
const horn = (x: number, y: number, dir: number) => `<path d="M${x} ${y}Q${x + 10 * dir} ${y - 4} ${x + 8 * dir} ${y - 18}" fill="none" stroke="#c9a227" stroke-width="4" stroke-linecap="round"/>`
const door = (x: number, color: string) => `<path d="M${x - 12} 300V274a12 12 0 0 1 24 0V300Z" fill="${color}"/>`

/** Long-tail boat, bow to the left; (x, y) = waterline middle. The canopy is separate. Bounds: x ±90, y from −26 to +6. */
const longTail = (x: number, y: number) =>
  `<path d="M${x - 90} ${y - 16}Q${x - 70} ${y + 6} ${x - 30} ${y + 4}H${x + 80}L${x + 86} ${y - 8}Z" fill="#8a5a33"/><path d="M${x - 90} ${y - 16}l-4 -8" stroke="#e63946" stroke-width="3"/>` +
  `<path d="M${x + 80} ${y - 4}L${x + 110} ${y + 10}" stroke="#3d4a55" stroke-width="3"/><rect x="${x + 70}" y="${y - 16}" width="14" height="10" fill="#3d4a55"/>`
/** Striped canopy over the boat at (x, y). Bounds: x ±40, y from −40 to −28. */
const canopy = (x: number, y: number, color: string) =>
  `<path d="M${x - 36} ${y - 6}V${y - 28}M${x + 36} ${y - 6}V${y - 28}" stroke="#5c3d24" stroke-width="2"/>` +
  [...Array(8).keys()].map((i) => `<rect x="${x - 40 + i * 10}" y="${y - 40}" width="10" height="12" fill="${i % 2 ? '#ffffff' : color}"/>`).join('')

/** Market boat; (x, y) = waterline middle. Bounds: x ±60, y from −14 to +4. */
const marketBoat = (x: number, y: number) => `<path d="M${x - 60} ${y - 14}H${x + 60}L${x + 50} ${y + 4}H${x - 50}Z" fill="#6b4a3a"/>`
/** Pile of fruit on the market boat at (x, y). Bounds: x ±16, y from −12 to +4. */
const fruit = (x: number, y: number, color: string) =>
  [[-10, 0], [0, 0], [10, 0], [-5, -7], [5, -7]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="5.5" fill="${color}"/>`).join('')
/** Conical hat on a `person` standing at (x, y). Bounds: x ±18, y from −72 to −58. */
const hat = (x: number, y: number) => `<path d="M${x - 18} ${y - 58}L${x} ${y - 72}L${x + 18} ${y - 58}Z" fill="#e9c46a"/>`

/** Tuk-tuk facing right; (x, y) = ground in the middle. The roof is separate. Bounds: x ±44, y from −58 to 0. */
const tukTuk = (x: number, y: number) =>
  `<path d="M${x - 40} ${y - 12}V${y - 36}H${x + 10}L${x + 34} ${y - 26}V${y - 12}Z" fill="#3a86ff"/><path d="M${x - 34} ${y - 50}V${y - 36}M${x + 6} ${y - 50}V${y - 36}M${x + 28} ${y - 46}L${x + 32} ${y - 28}" stroke="#3d4a55" stroke-width="2"/>` +
  `<circle cx="${x - 26}" cy="${y - 10}" r="9" fill="#2b2b2b"/><circle cx="${x + 24}" cy="${y - 10}" r="9" fill="#2b2b2b"/><circle cx="${x + 36}" cy="${y - 22}" r="3" fill="#ffd166"/>`
const tukRoof = (x: number, y: number, color: string) => `<path d="M${x - 44} ${y - 50}H${x + 14}L${x + 30} ${y - 46}V${y - 42}H${x - 44}Z" fill="${color}"/>`

export default travelLevel({
  id: 422,
  title: 'bangkok',
  parTimeSec: 114,
  place: { region: 'asia', country: 'th', lat: 13.75, lon: 100.49 },
  scene: ({ diff, anim, rand }) => {
    const swing = (period: number) => anim({ id: 'lantern', type: 'sway', angle: 14, pivot: [104, 232], period }, lantern(104, 232))
    return (
      sky('#9fd6ef') +
      sun(380, 80, '#ffc94a') +
      anim({ type: 'path', points: [[0, 0], [-60, 0]], period: 46 }, cloud(760, 60, 0.5)) +
      // Wat Arun across the river
      `<rect x="420" y="290" width="380" height="24" fill="#cfc4b0"/>` +
      prang(470, 300, 0.55) +
      prang(660, 300, 0.55) +
      prang(565, 300, 1) +
      diff(565, 48, 18, tip(565, 300), '') +
      diff(565, 181, 26, band(565, 300, '#2b59c3'), band(565, 300, '#e63946')) +
      // Temple with tiered roofs
      temple(40, 300) +
      diff(305, 223, 18, horn(300, 232, 1), '') +
      diff(170, 281, 24, door(170, '#c9302c'), door(170, '#2b59c3')) +
      diff(104, 249, 22, swing(1), swing(2.6), 'lantern') +
      // The river with the boats
      water(310, '#a08a5c', rand, 12) +
      longTail(380, 372) +
      diff(380, 338, 42, canopy(380, 372, '#e63946'), canopy(380, 372, '#2a9d8f')) +
      marketBoat(640, 392) +
      person(612, 386, '#8338ec', false, '#c68b59', '#1d1d1d') +
      diff(612, 321, 20, hat(612, 386), '') +
      diff(676, 382, 20, fruit(676, 382, '#ffd23f'), fruit(676, 382, '#e8762e')) +
      // Road with the tuk-tuk
      `<rect y="414" width="800" height="86" fill="#8d8a86"/><path d="M0 456H800" stroke="#f4f4f4" stroke-width="3" stroke-dasharray="26 18"/>` +
      tukTuk(200, 488) +
      diff(193, 442, 38, tukRoof(200, 488, '#ffd23f'), tukRoof(200, 488, '#3fa46f')) +
      person(500, 494, '#f28c28', true, '#c68b59', '#1d1d1d')
    )
  },
})
