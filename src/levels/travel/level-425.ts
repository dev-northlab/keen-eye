// Marrakesh: the Koutoubia minaret over the red city walls with a stork, a market stall with spice
// cones and a metal lantern, a hanging rug, tagines and an orange tree.
// Motion difference: the lantern under the awning swings quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { palm, person, sky, sun } from './shapes.ts'

const RED_WALL = '#c4643c'

/** Koutoubia minaret; (x, y) = foot. The top ball and the upper window are separate. Bounds: x ±32, y from −296 to 0. */
const minaret = (x: number, y: number) =>
  `<rect x="${x - 30}" y="${y - 240}" width="60" height="240" fill="#c48a5a"/><rect x="${x - 32}" y="${y - 244}" width="64" height="8" fill="#a86f45"/>` +
  [-200, -130].map((dy) => `<rect x="${x - 20}" y="${y + dy}" width="40" height="40" fill="none" stroke="#a86f45" stroke-width="3"/>`).join('') +
  arch(x, y - 70) +
  `<rect x="${x - 14}" y="${y - 274}" width="28" height="30" fill="#c48a5a"/><path d="M${x - 14} ${y - 274}Q${x} ${y - 290} ${x + 14} ${y - 274}Z" fill="#3f9b6b"/>` +
  `<path d="M${x} ${y - 284}V${y - 326}" stroke="#c9a227" stroke-width="2"/>` +
  [-296, -306].map((dy) => `<circle cx="${x}" cy="${y + dy}" r="5" fill="#c9a227"/>`).join('')
/** Arched window of the minaret centered at (x, y). Bounds: x ±8, y ±14. */
const arch = (x: number, y: number) => `<path d="M${x - 8} ${y + 14}V${y - 6}a8 8 0 0 1 16 0V${y + 14}Z" fill="#6b3f26"/>`
/** Top copper ball on the spire. Bounds: circle of radius 5 around (x, y − 316). */
const topBall = (x: number, y: number) => `<circle cx="${x}" cy="${y - 316}" r="4.5" fill="#c9a227"/>`

/** City wall from x = 0 to 800, top at y; teeth every 26 except at `skip`. */
function wall(y: number, skip: number) {
  let teeth = ''
  for (let x = 6; x < 800; x += 26) if (x !== skip) teeth += tooth(x, y)
  return `<rect y="${y}" width="800" height="${340 - y}" fill="${RED_WALL}"/>${teeth}<path d="M0 ${y + 24}H800" stroke="#a8502e" stroke-width="2"/>`
}
const tooth = (x: number, y: number) => `<rect x="${x}" y="${y - 14}" width="14" height="14" fill="${RED_WALL}"/>`

/** White stork standing; (x, y) = feet. Bounds: x from −16 to +14, y from −42 to 0. */
const stork = (x: number, y: number) =>
  `<path d="M${x - 2} ${y}V${y - 14}M${x + 3} ${y}V${y - 14}" stroke="#e8762e" stroke-width="2"/>` +
  `<ellipse cx="${x}" cy="${y - 20}" rx="12" ry="8" fill="#ffffff"/><path d="M${x + 2} ${y - 18}h12l-4 6Z" fill="#1d1d1d"/>` +
  `<path d="M${x - 8} ${y - 24}Q${x - 12} ${y - 34} ${x - 6} ${y - 38}" fill="none" stroke="#ffffff" stroke-width="4"/><path d="M${x - 6} ${y - 39}l-10 4l10 -1Z" fill="#e8762e"/>`

/** Market stall: posts and a striped awning over x0 .. x1 at y. */
function stall(x0: number, x1: number, y: number) {
  let s = `<path d="M${x0 + 6} ${y}V460M${x1 - 6} ${y}V460" stroke="#6b4a3a" stroke-width="5"/>`
  for (let x = x0, i = 0; x < x1; x += 24, i++) s += `<path d="M${x} ${y}h24v20q-12 8 -24 0Z" fill="${i % 2 ? '#f4ead2' : '#2a9d8f'}"/>`
  return s + `<rect x="${x0 + 10}" y="430" width="${x1 - x0 - 20}" height="30" fill="#8a5a33"/>`
}
/** Spice cone on the stall table; (x, y) = its base middle. Bounds: x ±16, y from −30 to 0. */
const cone = (x: number, y: number, color: string) => `<path d="M${x - 16} ${y}Q${x - 6} ${y - 12} ${x} ${y - 30}Q${x + 6} ${y - 12} ${x + 16} ${y}Z" fill="${color}"/>`
/** Metal lantern hanging from (x, y). Bounds: x ±10, y from 0 to +36. */
const metalLantern = (x: number, y: number) =>
  `<path d="M${x} ${y}V${y + 8}" stroke="#3d4a55" stroke-width="1.5"/><path d="M${x - 8} ${y + 14}L${x} ${y + 8}L${x + 8} ${y + 14}V${y + 28}L${x} ${y + 36}L${x - 8} ${y + 28}Z" fill="#c9a227"/>` +
  `<path d="M${x - 4} ${y + 16}V${y + 26}M${x + 4} ${y + 16}V${y + 26}" stroke="#7a5233" stroke-width="2"/>`

/** Rug hanging from a bar; (x, y) = top left, 70 × 100. The middle stripe is separate. */
const rug = (x: number, y: number) =>
  `<path d="M${x - 6} ${y}H${x + 76}" stroke="#6b4a3a" stroke-width="4"/><rect x="${x}" y="${y}" width="70" height="100" fill="#b23a48"/>` +
  [14, 78].map((dy) => `<rect x="${x + 6}" y="${y + dy}" width="58" height="8" fill="#f2c94c"/>`).join('') +
  `<path d="M${x + 35} ${y + 30}L${x + 55} ${y + 50}L${x + 35} ${y + 70}L${x + 15} ${y + 50}Z" fill="#1d3557"/>`
const rugStripe = (x: number, y: number, color: string) => `<rect x="${x + 6}" y="${y + 90}" width="58" height="6" fill="${color}"/>`

/** Tagine pot; (x, y) = base middle. The lid is separate. Bounds of the lid: x ±18, y from −40 to −12. */
const tagine = (x: number, y: number) => `<ellipse cx="${x}" cy="${y - 8}" rx="24" ry="8" fill="#a8502e"/>`
const lid = (x: number, y: number, color: string) =>
  `<path d="M${x - 18} ${y - 12}Q${x - 6} ${y - 18} ${x - 2} ${y - 34}H${x + 2}Q${x + 6} ${y - 18} ${x + 18} ${y - 12}Z" fill="${color}"/><circle cx="${x}" cy="${y - 36}" r="4" fill="${color}"/>`

/** Orange tree; (x, y) = foot. Oranges placed at the given points. */
const orangeTree = (x: number, y: number) =>
  `<rect x="${x - 6}" y="${y - 70}" width="12" height="70" fill="#7a5233"/><circle cx="${x}" cy="${y - 100}" r="46" fill="#3f8f3a"/><circle cx="${x - 26}" cy="${y - 84}" r="26" fill="#4c9a3f"/>`
const orange = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="6" fill="#f28c28"/>`

export default travelLevel({
  id: 425,
  title: 'marrakesh',
  parTimeSec: 120,
  place: { region: 'africa', country: 'ma', lat: 31.63, lon: -7.99 },
  scene: ({ diff, anim, extra }) => {
    const swing = (period: number) => anim({ id: 'lantern', type: 'sway', angle: 14, pivot: [550, 380], period }, metalLantern(550, 380))
    return (
      sky('#a9d6ee') +
      sun(700, 80, '#ffc94a') +
      `<path d="M0 230L120 170L240 220L380 160L520 220L660 170L800 210V260H0Z" fill="#c9cfdc"/>` +
      palm(330, 270, 1, 6) +
      palm(470, 260, 0.9, -8) +
      // Koutoubia and the walls
      minaret(200, 340) +
      diff(200, 24, 18, topBall(200, 340), '') +
      diff(200, 210, 22, arch(200, 210), '') +
      wall(260, 422) +
      diff(429, 252, 18, tooth(422, 260), '') +
      diff(627, 239, 28, stork(628, 260), '') +
      // Market
      `<rect y="340" width="800" height="160" fill="#e3c99b"/>` +
      stall(370, 610, 360) +
      cone(400, 430, '#c9302c') +
      cone(436, 430, '#2f8f5a') +
      diff(472, 415, 24, cone(472, 430, '#ffd23f'), cone(472, 430, '#c9302c')) +
      cone(508, 430, '#a8502e') +
      cone(544, 430, '#f28c28') +
      cone(580, 430, '#6b4a3a') +
      diff(550, 398, 26, swing(1), swing(2.4), 'lantern') +
      rug(660, 340) +
      diff(695, 433, 30, rugStripe(660, 340, '#f2c94c'), rugStripe(660, 340, '#2a9d8f')) +
      tagine(260, 490) +
      tagine(310, 492) +
      lid(310, 492, '#c96b3c') +
      diff(260, 465, 24, lid(260, 490, '#c96b3c'), lid(260, 490, '#2a9d8f')) +
      orangeTree(90, 490) +
      [[70, 380], [110, 370], [60, 410], [124, 404]].map(([x, y]) => orange(x, y)).join('') +
      diff(92, 398, 18, orange(92, 398), '') +
      person(170, 494, '#c9a227', true, '#c68b59', '#1d1d1d') +
      // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
      decor({ anim }, [
        ['bollard', 320, 448],
        ['skateboard', 628, 472, '#e63946'],
        ['suitcase', 120, 472, '#ffd23f'],
        ['newspaperBox', 212, 376, '#e63946'],
        ['cloud', 340, 96],
        ['birds', 88, 108],
        ['cloud', 612, 140],
      ]) +
      extras({ extra, anim }, [
        ['pigeon', 632, 372],
        ['suitcase', 296, 384, '#3a86ff'],
        ['bin', 156, 412, '#2a9d8f'],
        ['birds', 488, 60],
        ['balloon', 580, 32, '#ffd23f'],
      ])
    )
  },
})
