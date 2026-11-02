// Istanbul: a mosque with domes and minarets, the Galata Tower across the Bosphorus, a ferry with
// gulls, a simit cart, a street cat and tulips.
// Motion difference: the flag on the ferry waves quickly on picture A and slowly on picture B.
import { travelLevel } from '../helpers.ts'
import { cloud, gull, person, sky, sun, water } from './shapes.ts'

const DOME = '#a9b4c2'

/** Minaret; (x, y) = foot. Balconies at −140 and −90, the upper one at −190 is separate. Bounds: x ±9, y from −232 to 0. */
const minaret = (x: number, y: number) =>
  `<rect x="${x - 5}" y="${y - 200}" width="10" height="200" fill="#e6e1d6"/><path d="M${x - 5} ${y - 200}L${x} ${y - 232}L${x + 5} ${y - 200}Z" fill="${DOME}"/>` +
  [-140, -90].map((dy) => balcony(x, y + dy)).join('')
const balcony = (x: number, y: number) => `<rect x="${x - 9}" y="${y - 3}" width="18" height="6" rx="2" fill="#cfc8ba"/>`

/** Mosque with its main dome over (x, y) (middle of the base top). Bounds: x ±150, y from −120 to +60. */
const mosque = (x: number, y: number) =>
  `<rect x="${x - 150}" y="${y}" width="300" height="60" fill="#e6e1d6"/>` +
  [-110, 110].map((dx) => `<path d="M${x + dx - 34} ${y}A34 30 0 0 1 ${x + dx + 34} ${y}Z" fill="${DOME}"/>`).join('') +
  [-60, 60].map((dx) => `<path d="M${x + dx - 44} ${y}A44 44 0 0 1 ${x + dx + 44} ${y}Z" fill="${DOME}"/>`).join('') +
  `<rect x="${x - 70}" y="${y - 34}" width="140" height="34" fill="#e6e1d6"/><path d="M${x - 72} ${y - 30}A72 70 0 0 1 ${x + 72} ${y - 30}Z" fill="${DOME}"/>` +
  `<path d="M${x} ${y - 100}V${y - 118}" stroke="#c9a227" stroke-width="3"/>` +
  [...Array(9).keys()].map((i) => `<rect x="${x - 64 + i * 16}" y="${y - 26}" width="6" height="12" rx="3" fill="#7a8a99"/>`).join('') +
  [...Array(10).keys()].map((i) => `<rect x="${x - 136 + i * 30}" y="${y + 18}" width="10" height="20" rx="5" fill="#7a8a99"/>`).join('')

/** Galata Tower; (x, y) = foot. The roof is separate. Bounds: x ±16, y from −150 to 0. */
const galata = (x: number, y: number) =>
  `<rect x="${x - 15}" y="${y - 104}" width="30" height="104" fill="#c9b48a"/><rect x="${x - 17}" y="${y - 108}" width="34" height="8" fill="#b8a379"/>` +
  [-96, -64, -40].map((dy) => `<rect x="${x - 3}" y="${y + dy}" width="6" height="12" rx="3" fill="#5c4a35"/>`).join('')
const roof = (x: number, y: number, color: string) => `<path d="M${x - 18} ${y - 108}L${x} ${y - 152}L${x + 18} ${y - 108}Z" fill="${color}"/>`

/** Ferry, bow to the right; (x, y) = waterline middle. Funnel top, flag and gull are separate. */
const ferry = (x: number, y: number) =>
  `<path d="M${x - 92} ${y - 30}H${x + 92}L${x + 80} ${y + 2}H${x - 84}Z" fill="#fbfbf7"/><rect x="${x - 84}" y="${y - 8}" width="166" height="10" fill="#2b2b2b"/>` +
  `<rect x="${x - 72}" y="${y - 54}" width="136" height="24" fill="#fbfbf7"/>` +
  [...Array(8).keys()].map((i) => `<rect x="${x - 66 + i * 16}" y="${y - 48}" width="10" height="10" rx="2" fill="#4b5d73"/>`).join('') +
  `<rect x="${x - 4}" y="${y - 74}" width="16" height="20" fill="#fbfbf7"/><path d="M${x - 86} ${y - 30}V${y - 72}" stroke="#3d4a55" stroke-width="2"/>`
/** Top of the ferry funnel. Bounds: x from −4 to +12, y from −80 to −68. */
const funnel = (x: number, y: number, color: string) => `<rect x="${x - 4}" y="${y - 80}" width="16" height="12" fill="${color}"/>`
/** Red flag with a white crescent and star on the stern pole top at (x, y). Bounds: x from 0 to +24, y from 0 to +16. */
const flag = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect width="24" height="16" fill="#e30a17"/><circle cx="9" cy="8" r="4.6" fill="#ffffff"/><circle cx="10.2" cy="8" r="3.7" fill="#e30a17"/>` +
  `<circle cx="15" cy="8" r="1.6" fill="#ffffff"/></g>`
/** Gull standing; (x, y) = feet. Bounds: x ±12, y from −16 to 0. */
const standingGull = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 8}" rx="10" ry="6" fill="#ffffff"/><circle cx="${x - 8}" cy="${y - 12}" r="4" fill="#ffffff"/>` +
  `<path d="M${x - 12} ${y - 12}l-3 1l3 1Z" fill="#f2b33d"/><path d="M${x + 2} ${y - 10}l10 -2l-4 5Z" fill="#8d99ae"/>`

/** Simit cart; (x, y) = ground in the middle. The top simit is separate. Bounds: x ±52, y from −88 to 0. */
const simitCart = (x: number, y: number) =>
  `<rect x="${x - 50}" y="${y - 48}" width="100" height="36" rx="4" fill="#d62828"/><circle cx="${x - 30}" cy="${y - 8}" r="8" fill="#2b2b2b"/><circle cx="${x + 30}" cy="${y - 8}" r="8" fill="#2b2b2b"/>` +
  `<rect x="${x - 44}" y="${y - 80}" width="88" height="32" fill="#bde3f2" fill-opacity="0.7" stroke="#c9a227" stroke-width="3"/>` +
  [-28, -10, 8, 26].map((dx) => simit(x + dx, y - 56)).join('') +
  [-19, -1, 17].map((dx) => simit(x + dx, y - 68)).join('')
const simit = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="5" fill="none" stroke="#b5743a" stroke-width="4"/>`

/** Sitting cat facing left; (x, y) = paws. Bounds: x from −12 to +20, y from −26 to 0. */
const cat = (x: number, y: number, fur: string) =>
  `<ellipse cx="${x + 4}" cy="${y - 9}" rx="11" ry="9" fill="${fur}"/><circle cx="${x - 4}" cy="${y - 18}" r="7" fill="${fur}"/>` +
  `<path d="M${x - 10} ${y - 22}l2 -6l4 4ZM${x + 2} ${y - 22}l-2 -6l-4 4Z" fill="${fur}"/><path d="M${x + 14} ${y - 4}q8 -2 4 -12" fill="none" stroke="${fur}" stroke-width="3" stroke-linecap="round"/>` +
  `<circle cx="${x - 7}" cy="${y - 19}" r="1.2" fill="#222"/>`

/** Tulips; (x, y) = ground in the middle. The flower heads are separate. */
const stems = (x: number, y: number) => [-12, 0, 12].map((dx) => `<path d="M${x + dx} ${y}V${y - 26}" stroke="#3f8f3a" stroke-width="3"/>`).join('')
const heads = (x: number, y: number, color: string) =>
  [-12, 0, 12].map((dx) => `<path d="M${x + dx - 5} ${y - 34}v6a5 5 0 0 0 10 0v-6l-2.5 3l-2.5 -4l-2.5 4Z" fill="${color}"/>`).join('')

export default travelLevel({
  id: 420,
  title: 'istanbul',
  parTimeSec: 108,
  place: { region: 'europe', country: 'tr', lat: 41.01, lon: 28.98 },
  scene: ({ diff, anim, rand }) => {
    const wave = (period: number) => anim({ id: 'flag', type: 'sway', angle: 8, pivot: [364, 308], period }, flag(364, 308))
    return (
      sky('#a6d3ee') +
      sun(560, 80, '#ffc94a') +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 44 }, cloud(420, 130, 0.5)) +
      gull(500, 60) +
      gull(530, 84, '#5c677d') +
      // Galata on the far bank
      `<path d="M470 310Q600 226 800 236V320H470Z" fill="#a3b88a"/>` +
      [...Array(9).keys()].map((i) => `<rect x="${520 + i * 30}" y="${262 + (i % 3) * 6}" width="26" height="${40 - (i % 3) * 6}" fill="${['#f2d7a6', '#e9b7a0', '#f4e2b8'][i % 3]}"/>`).join('') +
      galata(690, 262) +
      diff(690, 132, 30, roof(690, 262, '#7a8a99'), roof(690, 262, '#c4502f')) +
      // The mosque with four minarets
      `<path d="M0 320Q120 250 420 262V320Z" fill="#a3b88a"/>` +
      minaret(64, 300) +
      balcony(64, 110) +
      minaret(108, 296) +
      balcony(108, 106) +
      minaret(352, 296) +
      diff(352, 106, 18, balcony(352, 106), '') +
      minaret(396, 300) +
      balcony(396, 110) +
      mosque(230, 240) +
      // The Bosphorus with the ferry
      water(312, '#3f86b5', rand, 14) +
      ferry(450, 380) +
      diff(454, 306, 18, funnel(450, 380, '#1d1d1d'), funnel(450, 380, '#d62828')) +
      diff(376, 316, 20, wave(1), wave(2.4), 'flag') +
      diff(538, 342, 18, standingGull(538, 350), '') +
      // Promenade
      `<rect y="404" width="800" height="96" fill="#d9cdb8"/><rect y="404" width="800" height="6" fill="#bfb3a0"/>` +
      simitCart(170, 490) +
      diff(171, 412, 18, simit(171, 412), '') +
      person(250, 492, '#2a9d8f', true, '#e0b48a', '#1d1d1d') +
      diff(330, 471, 26, cat(326, 484, '#f4a261'), cat(326, 484, '#8d99ae')) +
      stems(600, 490) +
      diff(600, 461, 22, heads(600, 490, '#e63946'), heads(600, 490, '#ffd23f')) +
      person(720, 492, '#8338ec')
    )
  },
})
