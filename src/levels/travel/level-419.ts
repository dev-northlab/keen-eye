// Prague: the Old Town Hall tower with the astronomical clock, Charles Bridge with its statues over
// the Vltava, red roofs and the castle with St. Vitus Cathedral on the hill, a tram on the embankment.
// Motion difference: a swan on the river bobs quickly on picture A and slowly on picture B.
import { travelLevel } from '../helpers.ts'
import { cloud, person, pigeon, sky, water } from './shapes.ts'

/** Statue on the bridge parapet; (x, y) = foot. Bounds: x ±6, y from −26 to 0. */
const statue = (x: number, y: number) =>
  `<rect x="${x - 5}" y="${y - 6}" width="10" height="6" fill="#4a463f"/><path d="M${x - 4} ${y - 6}L${x - 3} ${y - 20}H${x + 3}L${x + 4} ${y - 6}Z" fill="#3a3630"/><circle cx="${x}" cy="${y - 23}" r="3.5" fill="#3a3630"/>`

/** Red-roofed house; (x, y) = bottom left. The chimney is separate. */
const roofHouse = (x: number, y: number, w: number, h: number, wall: string) =>
  `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${wall}"/><path d="M${x - 4} ${y - h}L${x + w / 2} ${y - h - 26}L${x + w + 4} ${y - h}Z" fill="#c4502f"/>` +
  `<rect x="${x + w / 2 - 5}" y="${y - h + 8}" width="10" height="12" fill="#4b5d73"/>`
/** Chimney on a roof at (x, y) (its foot). Bounds: x ±5, y from −16 to 0. */
const chimney = (x: number, y: number) => `<rect x="${x - 4}" y="${y - 14}" width="8" height="14" fill="#8a3a28"/><rect x="${x - 5}" y="${y - 16}" width="10" height="3" fill="#6b2d1f"/>`

/** Copper spire of the cathedral's main tower at (x, y) (its foot). Bounds: x ±17, y from −52 to 0. */
const copperSpire = (x: number, y: number, color: string) =>
  `<path d="M${x - 17} ${y}Q${x - 14} ${y - 20} ${x - 6} ${y - 28}L${x} ${y - 52}L${x + 6} ${y - 28}Q${x + 14} ${y - 20} ${x + 17} ${y}Z" fill="${color}"/>`

/** The Old Town Hall tower from x0 to x1 standing on the ground at y = 500; its roof top at 62. */
const hallTower = (x0: number, x1: number) => {
  const cx = (x0 + x1) / 2
  return (
    `<rect x="${x0}" y="120" width="${x1 - x0}" height="380" fill="#b9ab92"/><path d="M${x0 - 8} 124L${cx} 62L${x1 + 8} 124Z" fill="#3d3a36"/>` +
    [x0 - 4, x1 + 4].map((x) => `<path d="M${x - 6} 132L${x} 104L${x + 6} 132Z" fill="#3d3a36"/>`).join('') +
    `<rect x="${cx - 10}" y="150" width="20" height="30" rx="10" fill="#4b5d73"/><rect x="${cx - 10}" y="210" width="20" height="30" rx="10" fill="#4b5d73"/>` +
    `<circle cx="${cx}" cy="300" r="36" fill="#c9a227"/><circle cx="${cx}" cy="300" r="31" fill="#2f5d8a"/><path d="M${cx - 31} 300a31 31 0 0 0 62 0Z" fill="#7a5233"/>` +
    `<circle cx="${cx}" cy="300" r="20" fill="none" stroke="#c9a227" stroke-width="2"/>` +
    `<circle cx="${cx}" cy="400" r="28" fill="#c9a227"/><circle cx="${cx}" cy="400" r="22" fill="#f4ead2"/>` +
    [...Array(12).keys()].map((i) => `<path d="M${cx} 400L${(cx + 22 * Math.cos((i * Math.PI) / 6)).toFixed(1)} ${(400 + 22 * Math.sin((i * Math.PI) / 6)).toFixed(1)}" stroke="#c9a227" stroke-width="1"/>`).join('')
  )
}
/** The sun hand of the astronomical dial centered at (x, 300), pointing at `deg`. Bounds: circle of radius 20. */
const sunHand = (x: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180
  const [ex, ey] = [x + Math.cos(a) * 16, 300 + Math.sin(a) * 16]
  return `<path d="M${x} 300L${ex.toFixed(1)} ${ey.toFixed(1)}" stroke="#ffd23f" stroke-width="3"/><circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="4" fill="#ffd23f"/>`
}
/** Golden ball on the tower roof top at (x, 62). Bounds: x ±5, y from 46 to 62. */
const ball = (x: number) => `<path d="M${x} 62V54" stroke="#c9a227" stroke-width="2"/><circle cx="${x}" cy="51" r="5" fill="#c9a227"/>`

/** Swan facing left; (x, y) = waterline middle. Bounds: x ±18, y from −30 to +2. */
const swan = (x: number, y: number) =>
  `<path d="M${x - 14} ${y}Q${x} ${y - 16} ${x + 18} ${y - 6}Q${x + 10} ${y + 2} ${x - 14} ${y}Z" fill="#ffffff"/>` +
  `<path d="M${x - 8} ${y - 4}Q${x - 14} ${y - 18} ${x - 8} ${y - 26}" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/><path d="M${x - 10} ${y - 27}l-6 2l6 1Z" fill="#f28c28"/>`

/** Rowing boat; (x, y) = waterline middle. Bounds: x ±32, y from −10 to +4. */
const boat = (x: number, y: number, color: string) =>
  `<path d="M${x - 32} ${y - 10}H${x + 32}L${x + 22} ${y + 4}H${x - 24}Z" fill="${color}"/><path d="M${x - 30} ${y - 10}H${x + 30}" stroke="#ffffff" stroke-width="2"/>`

/** Tram facing right; (x, y) = rails under the middle. The destination board is separate. Bounds: x ±110, y from −74 to 0. */
function tram(x: number, y: number) {
  let windows = ''
  for (let i = 0; i < 7; i++) windows += `<rect x="${x - 100 + i * 28}" y="${y - 58}" width="22" height="22" rx="3" fill="#bde3f2"/>`
  return (
    `<path d="M${x} ${y - 66}V${y - 82}M${x - 10} ${y - 82}h20" stroke="#3d4a55" stroke-width="2"/>` +
    `<rect x="${x - 110}" y="${y - 66}" width="220" height="58" rx="10" fill="#f4ead2"/><rect x="${x - 110}" y="${y - 30}" width="220" height="22" fill="#d62828"/>${windows}` +
    [-70, 70].map((dx) => `<circle cx="${x + dx}" cy="${y - 6}" r="7" fill="#2b2b2b"/>`).join('')
  )
}
const board = (x: number, y: number, color: string) => `<rect x="${x + 84}" y="${y - 64}" width="22" height="7" rx="2" fill="${color}"/>`

export default travelLevel({
  id: 419,
  title: 'prague',
  parTimeSec: 106,
  place: { region: 'europe', country: 'cz', lat: 50.09, lon: 14.42 },
  scene: ({ diff, anim, rand }) => {
    const bob = (period: number) => anim({ id: 'swan', type: 'bob', dx: 0, dy: 3, period }, swan(330, 352))
    return (
      sky('#a8d4ec') +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 46 }, cloud(300, 70, 0.55)) +
      // Castle hill with the cathedral
      `<path d="M300 250Q500 160 800 168V280H300Z" fill="#6f9a5a"/>` +
      `<rect x="420" y="176" width="360" height="56" fill="#efe3c8"/>` +
      [...Array(14).keys()].map((i) => `<rect x="${430 + i * 25}" y="188" width="9" height="12" fill="#4b5d73"/><rect x="${430 + i * 25}" y="210" width="9" height="12" fill="#4b5d73"/>`).join('') +
      `<rect x="586" y="92" width="38" height="96" fill="#8a8578"/><rect x="640" y="120" width="54" height="70" fill="#8a8578"/>` +
      [646, 688].map((x) => `<path d="M${x - 8} 122L${x} 84L${x + 8} 122Z" fill="#5c5a54"/>`).join('') +
      diff(605, 68, 32, copperSpire(605, 94, '#4f9a7a'), copperSpire(605, 94, '#7a8a99')) +
      // Red roofs of the Lesser Town and Old Town
      roofHouse(150, 280, 60, 40, '#f2d7a6') +
      roofHouse(214, 280, 52, 56, '#e9c4a0') +
      diff(252, 202, 18, chimney(252, 210), '') +
      roofHouse(270, 280, 64, 36, '#f4e2b8') +
      roofHouse(338, 280, 56, 48, '#efcfa8') +
      // The river and Charles Bridge
      water(280, '#5f8faa', rand, 12) +
      `<rect x="140" y="266" width="660" height="16" fill="#8a7f6e"/>` +
      [...Array(6).keys()].map((i) => `<path d="M${160 + i * 110} 282V306h70V282Z" fill="#8a7f6e"/>`).join('') +
      [190, 260, 330, 400, 540, 610, 680, 750].map((x) => statue(x, 266)).join('') +
      diff(470, 252, 18, statue(470, 266), '') +
      diff(330, 338, 26, bob(1), bob(2.6), 'swan') +
      diff(600, 348, 34, boat(600, 352, '#3a86ff'), boat(600, 352, '#3fa46f')) +
      // Embankment with the tram, the clock tower
      `<rect y="380" width="800" height="120" fill="#a7a29b"/><path d="M140 476H800M140 482H800" stroke="#6b6b6b" stroke-width="2"/>` +
      tram(470, 476) +
      diff(565, 416, 20, board(470, 476, '#ffd23f'), board(470, 476, '#ffffff')) +
      person(230, 484, '#5b7fd6') +
      person(720, 488, '#e63946', true) +
      pigeon(300, 492) +
      hallTower(30, 130) +
      diff(80, 54, 18, ball(80), '') +
      diff(80, 300, 22, sunHand(80, 60), sunHand(80, 150))
    )
  },
})
