// Tbilisi: the old fortress on its hill, a cable car over old town houses with wooden balconies,
// the brick domes of the sulfur baths and a churchkhela stall by the river.
// Motion difference: the cable car cabin rides quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { cloud, person, sky, water } from './shapes.ts'

/** Cable from the upper station to the lower one. */
const CABLE: [number, number, number, number] = [300, 190, 780, 320]
const cableY = (x: number) => CABLE[1] + ((x - CABLE[0]) * (CABLE[3] - CABLE[1])) / (CABLE[2] - CABLE[0])

/** Cable car cabin hanging from the cable at x. Bounds: x ±17, y from 0 to +36 under the cable. */
const cabin = (x: number) => {
  const y = cableY(x)
  return (
    `<path d="M${x} ${y}v12" stroke="#3d4a55" stroke-width="2"/><circle cx="${x}" cy="${y}" r="3" fill="#3d4a55"/>` +
    `<rect x="${x - 17}" y="${y + 12}" width="34" height="24" rx="5" fill="#e63946"/><rect x="${x - 12}" y="${y + 16}" width="24" height="10" rx="2" fill="#bde3f2"/>`
  )
}

/** Fortress tower; (x, y) = foot, 28 wide. The upper arrow slit is separate. Bounds: x ±16, y from −62 to 0. */
const fortTower = (x: number, y: number) => {
  let s = `<rect x="${x - 14}" y="${y - 54}" width="28" height="54" fill="#b3a48c"/>`
  for (let tx = x - 16; tx < x + 14; tx += 9) s += `<rect x="${tx}" y="${y - 62}" width="6" height="9" fill="#b3a48c"/>`
  return s + slitAt(x, y - 22)
}
const slitAt = (x: number, y: number) => `<rect x="${x - 2}" y="${y - 7}" width="4" height="14" rx="2" fill="#5c4a35"/>`

/** Brick dome of the baths; (x, y) = middle of its foot. The vent is separate. Bounds: x ±32, y from −32 to 0. */
const dome = (x: number, y: number) =>
  `<path d="M${x - 32} ${y}A32 32 0 0 1 ${x + 32} ${y}Z" fill="#c9895b"/><path d="M${x - 22} ${y - 10}q22 -16 44 0M${x - 28} ${y - 2}h56" fill="none" stroke="#a86a42" stroke-width="2"/>`
/** Little vent turret on top of `dome` at (x, y). Bounds: x ±7, y from −46 to −30. */
const vent = (x: number, y: number) =>
  `<rect x="${x - 5}" y="${y - 42}" width="10" height="12" fill="#c9895b"/><path d="M${x - 7} ${y - 41}L${x} ${y - 46}L${x + 7} ${y - 41}Z" fill="#a86a42"/>`

/** Old town house with a wooden balcony; (x, y) = bottom left. Bounds: w × h. */
function house(x: number, y: number, w: number, h: number, wall: string, wood: string) {
  return (
    `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${wall}"/><path d="M${x - 4} ${y - h}L${x + w / 2} ${y - h - 14}L${x + w + 4} ${y - h}Z" fill="#a8553c"/>` +
    balcony(x + 6, y - h + 14, w - 12, wood)
  )
}
/** Wooden balcony across w; (x, y) = top left. Bounds: w × 28. */
function balcony(x: number, y: number, w: number, wood: string) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="28" fill="#4b5d73"/>`
  for (let bx = x + 2; bx < x + w - 2; bx += 9) s += `<rect x="${bx}" y="${y}" width="3" height="28" fill="${wood}"/>`
  return s + `<rect x="${x}" y="${y}" width="${w}" height="4" fill="${wood}"/><rect x="${x}" y="${y + 18}" width="${w}" height="10" fill="${wood}"/>`
}

/** Churchkhela: walnut sweets on strings; (x, y) = top of the string. Bounds: x ±4, y from 0 to +38. */
const sweet = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y}v4" stroke="#3d4a55" stroke-width="1.4"/><path d="M${x} ${y + 6}v28" stroke="${color}" stroke-width="7" stroke-linecap="round"/>` +
  [12, 20, 28].map((dy) => `<circle cx="${x}" cy="${y + dy}" r="4" fill="${color}"/>`).join('')

/** Rowing boat, bow to the right; (x, y) = waterline middle. Bounds: x ±36, y from −12 to +6. */
const boat = (x: number, y: number, color: string) =>
  `<path d="M${x - 36} ${y - 12}H${x + 36}L${x + 26} ${y + 6}H${x - 28}Z" fill="${color}"/><path d="M${x - 34} ${y - 12}H${x + 34}" stroke="#ffffff" stroke-width="3"/>`

export default travelLevel({
  id: 409,
  title: 'tbilisi',
  parTimeSec: 78,
  place: { region: 'caucasus', country: 'ge', lat: 41.72, lon: 44.79 },
  scene: ({ diff, anim, rand, secret, extra }) => {
    const ride = (period: number) => anim({ id: 'cabin', type: 'path', points: [[0, 0], [240, cableY(660) - cableY(420)]], period }, cabin(420))
    return (
      sky('#a9d6ef') +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 44 }, cloud(560, 80, 0.6)) +
      // Hill with the fortress
      `<path d="M0 270Q120 140 260 150Q380 170 470 340H0Z" fill="#8aa86b"/>` +
      `<path d="M80 205L130 182H250L300 196V222H80Z" fill="#b3a48c"/>` +
      fortTower(108, 210) +
      fortTower(262, 200) +
      diff(262, 156, 22, slitAt(262, 156), '') +
      // Old town on the slope
      `<path d="M440 330Q600 270 800 280V420H440Z" fill="#9fb27a"/>` +
      house(470, 400, 70, 80, '#f0e2c0', '#7a5233') +
      house(546, 400, 64, 96, '#d9a441', '#7a5233') +
      house(616, 400, 70, 70, '#e9b7a0', '#3f8fbf') +
      house(692, 404, 80, 74, '#f3e3c3', '#7a5233') +
      diff(732, 358, 38, balcony(698, 344, 68, '#3f8fbf'), balcony(698, 344, 68, '#3f9b6b')) +
      // Cable car
      `<path d="M${CABLE[0]} ${CABLE[1]}L${CABLE[2]} ${CABLE[3]}" stroke="#3d4a55" stroke-width="2"/>` +
      `<rect x="288" y="182" width="24" height="16" fill="#7a8a99"/><rect x="770" y="312" width="24" height="18" fill="#7a8a99"/>` +
      diff(420, 248, 30, ride(9), ride(15), 'cabin') +
      // Baths and the river bank
      `<rect y="400" width="800" height="16" fill="#d8c8a8"/><rect y="340" width="440" height="60" fill="#d8c8a8"/>` +
      dome(80, 400) +
      vent(80, 400) +
      dome(150, 400) +
      diff(150, 362, 22, vent(150, 400), '') +
      // The category's hidden key behind the last dome
      secret(255, 393) +
      dome(220, 400) +
      vent(220, 400) +
      // Churchkhela stall
      `<path d="M308 400V340M352 400V340M304 342H356" stroke="#7a5233" stroke-width="4"/>` +
      sweet(318, 344, '#6d2e46') +
      sweet(342, 344, '#6d2e46') +
      diff(330, 362, 24, sweet(330, 344, '#6d2e46'), sweet(330, 344, '#c8762e')) +
      person(386, 404, '#e63946', true, '#f2d29b', '#1d1d1d') +
      water(416, '#5f9a96', rand, 12) +
      diff(560, 453, 40, boat(560, 456, '#ffd23f'), boat(560, 456, '#e63946')) +
      // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
      decor({ anim }, [
        ['bin', 420, 408, '#2a9d8f'],
        ['bottle', 172, 476],
        ['bottle', 716, 444],
        ['stones', 168, 264],
        ['grass', 352, 232],
        ['cloud', 704, 112],
        ['birds', 236, 52],
      ]) +
      extras({ extra, anim }, [
        ['coffeeCup', 56, 372],
        ['lifeRing', 308, 464],
        ['bottle', 64, 464],
        ['ladybug', 272, 312],
        ['balloon', 472, 36, '#ffd23f'],
      ])
    )
  },
})
