// Sydney: the Opera House with its white shells, the Harbour Bridge, a green and yellow ferry, yachts and a kookaburra.
// Motion difference: a yacht rocks quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { cloud, gull, sky, sun, water } from './shapes.ts'

/** Shell (sail) of the Opera House on the podium at y = 330, from x to x + w, h high. Bounds: w × h. */
const shell = (x: number, w: number, h: number) =>
  `<path d="M${x} 330L${x + w} 330Q${x + w * 0.85} ${330 - h * 0.7} ${x + w * 0.12} ${330 - h}Z" fill="#fbfbf7"/>` +
  `<path d="M${x + w * 0.4} 330Q${x + w * 0.4} ${330 - h * 0.5} ${x + w * 0.12} ${330 - h}M${x + w * 0.7} 330Q${x + w * 0.62} ${330 - h * 0.6} ${x + w * 0.12} ${330 - h}" fill="none" stroke="#d6dbe0" stroke-width="2"/>`

/** Harbour Bridge between the pylons at x = 420 and x = 800, deck at y = 266. */
function bridge() {
  let hangers = ''
  for (let x = 472; x < 760; x += 18) {
    const t = (x - 452) / 316
    hangers += `<path d="M${x} ${(266 - 2 * t * (1 - t) * 96).toFixed(1)}V266" stroke="#6b7d8f" stroke-width="2"/>`
  }
  return (
    `<path d="M452 266Q610 74 768 266" fill="none" stroke="#6b7d8f" stroke-width="10"/><path d="M452 266Q610 170 768 266" fill="none" stroke="#6b7d8f" stroke-width="6"/>` +
    hangers +
    `<rect x="420" y="262" width="380" height="10" fill="#566676"/>` +
    [420, 768].map((px) => `<rect x="${px}" y="206" width="32" height="94" fill="#c9b48a"/><rect x="${px + 8}" y="220" width="16" height="22" rx="3" fill="#a8956c"/>`).join('')
  )
}
/** Three tiny climbers on top of the bridge arch. Bounds: circle of radius 20 around (590, 160). */
const climbers = () =>
  [574, 590, 606]
    .map((x) => {
      const t = (x - 452) / 316
      const y = 266 - 2 * t * (1 - t) * 192 - 5
      return `<rect x="${x - 2}" y="${(y - 10).toFixed(1)}" width="4" height="9" fill="#2b59c3"/><circle cx="${x}" cy="${(y - 13).toFixed(1)}" r="2.6" fill="#f2d29b"/>`
    })
    .join('')

/** Ferry, bow to the right; (x, y) = waterline middle. The upper deck is separate. Bounds of the deck: x ±52, y from −44 to −20. */
const ferryHull = (x: number, y: number) =>
  `<path d="M${x - 70} ${y - 20}H${x + 70}L${x + 58} ${y + 4}H${x - 60}Z" fill="#2e7d4f"/><path d="M${x - 68} ${y - 14}H${x + 66}" stroke="#f2c94c" stroke-width="3"/>`
const ferryDeck = (x: number, y: number, color: string) =>
  `<rect x="${x - 52}" y="${y - 40}" width="104" height="20" fill="${color}"/>` +
  [-44, -28, -12, 4, 20, 36].map((dx) => `<rect x="${x + dx}" y="${y - 36}" width="10" height="9" rx="2" fill="#4b5d73"/>`).join('') +
  `<rect x="${x - 10}" y="${y - 44}" width="20" height="4" fill="${color}"/>`

/** Yacht; (x, y) = waterline middle. Bounds: x ±26, y from −64 to +4. The sail is passed in. */
const yacht = (x: number, y: number, sail: string) =>
  `<path d="M${x - 26} ${y - 8}H${x + 26}L${x + 18} ${y + 4}H${x - 18}Z" fill="#ffffff"/><path d="M${x} ${y - 8}V${y - 64}" stroke="#3d4a55" stroke-width="2"/>` +
  `<path d="M${x + 2} ${y - 62}L${x + 24} ${y - 12}H${x + 2}Z" fill="${sail}"/><path d="M${x - 2} ${y - 54}L${x - 18} ${y - 14}H${x - 2}Z" fill="#ffffff"/>`

/** Kookaburra on a post; (x, y) = top of the post. Bounds of the bird: x ±16, y from −30 to 0. */
const post = (x: number, y: number) => `<rect x="${x - 6}" y="${y}" width="12" height="${500 - y}" fill="#7a5233"/>`
const kookaburra = (x: number, y: number) =>
  `<ellipse cx="${x + 2}" cy="${y - 12}" rx="10" ry="12" fill="#a0703f"/><ellipse cx="${x}" cy="${y - 8}" rx="7" ry="8" fill="#f4ead2"/>` +
  `<circle cx="${x - 3}" cy="${y - 23}" r="7" fill="#f4ead2"/><path d="M${x - 8} ${y - 24}l-8 3l8 2Z" fill="#3d4a55"/><path d="M${x - 6} ${y - 24}h6" stroke="#5c4a35" stroke-width="2"/>` +
  `<path d="M${x + 10} ${y - 8}l6 6" stroke="#5f8fbf" stroke-width="4"/>`

/** Buoy; (x, y) = waterline. Bounds: x ±10, y from −20 to +4. */
const buoy = (x: number, y: number, color: string) =>
  `<path d="M${x - 10} ${y}Q${x - 8} ${y - 18} ${x} ${y - 20}Q${x + 8} ${y - 18} ${x + 10} ${y}Z" fill="${color}"/><rect x="${x - 10}" y="${y - 2}" width="20" height="6" rx="2" fill="#3d4a55"/>`

export default travelLevel({
  id: 414,
  title: 'sydney',
  parTimeSec: 90,
  place: { region: 'oceania', country: 'au', lat: -33.86, lon: 151.21 },
  scene: ({ diff, anim, rand, extra }) => {
    const rock = (period: number) => anim({ id: 'yacht', type: 'sway', angle: 6, pivot: [700, 440], period }, yacht(700, 440, '#ffd23f'))
    return (
      sky('#8fd3f4') +
      sun(90, 80) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 44 }, cloud(300, 70, 0.55)) +
      gull(330, 140) +
      // City behind the bridge
      `<path d="M300 300V240h30v-30h26v50h30v-70h34v40h40v-24h30v34h36v-56h30v46h40v-30h34v40h40v-20h50v80Z" fill="#b7cde0"/>` +
      water(296, '#2f8fc4', rand, 16) +
      bridge() +
      diff(590, 160, 22, climbers(), '') +
      // Opera House on its podium
      `<path d="M20 350L40 330H380L400 350Z" fill="#d8c8a8"/><rect x="20" y="350" width="380" height="14" fill="#c4b393"/>` +
      shell(60, 96, 110) +
      shell(140, 84, 96) +
      shell(212, 70, 80) +
      shell(276, 56, 62) +
      diff(347, 306, 34, shell(325, 44, 46), '') +
      ferryHull(290, 430) +
      diff(290, 400, 56, ferryDeck(290, 430, '#f2c94c'), ferryDeck(290, 430, '#ffffff')) +
      yacht(560, 390, '#ffffff') +
      diff(573, 352, 30, `<path d="M562 328L584 378H562Z" fill="#ffffff"/>`, `<path d="M562 328L584 378H562Z" fill="#e63946"/>`) +
      diff(488, 470, 20, buoy(488, 470, '#e63946'), buoy(488, 470, '#ffd23f')) +
      diff(700, 410, 46, rock(1.4), rock(3), 'yacht') +
      post(46, 440) +
      diff(46, 425, 24, kookaburra(46, 440), '') +
      // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
      decor({ anim }, [
        ['bottle', 120, 452],
        ['buoy', 452, 368, '#e63946'],
        ['bottle', 704, 320],
        ['lifeRing', 608, 464],
        ['birds', 200, 84],
        ['cloud', 696, 96],
        ['birds', 448, 80],
      ]) +
      extras({ extra, anim }, [
        ['buoy', 372, 476, '#ffd23f'],
        ['bottle', 216, 480],
        ['buoy', 184, 404, '#e63946'],
        ['balloon', 272, 200, '#ffd23f'],
        ['birds', 108, 196],
      ])
    )
  },
})
