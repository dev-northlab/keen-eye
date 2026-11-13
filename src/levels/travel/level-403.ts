// Amsterdam: narrow canal houses with stepped, bell and neck gables, bikes on the quay, a houseboat.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { bike, cloud, cityTree, gull, pigeon, sky, water } from './shapes.ts'

type Gable = 'step' | 'bell' | 'neck'

/** Gable outline over a house from x to x + w, peak at `top`, wall from top + 40. */
function gable(kind: Gable, x: number, w: number, top: number) {
  const b = top + 40
  if (kind === 'step') {
    const s = w * 0.12
    return `M${x} ${b}V${top + 30}H${x + s}V${top + 20}H${x + 2 * s}V${top + 10}H${x + 3 * s}V${top}H${x + w - 3 * s}V${top + 10}H${x + w - 2 * s}V${top + 20}H${x + w - s}V${top + 30}H${x + w}V${b}Z`
  }
  if (kind === 'bell')
    return `M${x} ${b}Q${x + w * 0.22} ${b} ${x + w * 0.26} ${top + 20}Q${x + w * 0.3} ${top} ${x + w / 2} ${top}Q${x + w * 0.7} ${top} ${x + w * 0.74} ${top + 20}Q${x + w * 0.78} ${b} ${x + w} ${b}Z`
  return `M${x} ${b}H${x + w * 0.18}V${top + 12}H${x + w * 0.32}V${top}H${x + w * 0.68}V${top + 12}H${x + w * 0.82}V${b}Z`
}

/** Hoist beam with its hook under the peak of a gable over x .. x + w. Bounds: x ±5, y from +2 to +24. */
const hoist = (x: number, w: number, top: number) =>
  `<path d="M${x + w / 2 - 5} ${top + 2}h10l-5 8Z" fill="#3d2a1c"/><path d="M${x + w / 2} ${top + 10}v10q0 4 -4 3" fill="none" stroke="#3d2a1c" stroke-width="2"/>`

/** Canal house from x to x + w, gable peak at `top`, ground at 340. The door is separate. */
function house(x: number, w: number, top: number, wall: string, kind: Gable, withHoist = true) {
  const cols = w >= 110 ? 3 : 2
  const gap = (w - cols * 20) / (cols + 1)
  let s = `<path d="${gable(kind, x, w, top)}" fill="${wall}"/><rect x="${x}" y="${top + 39}" width="${w}" height="${301 - top}" fill="${wall}"/>`
  s += `<rect x="${x + w / 2 - 8}" y="${top + 16}" width="16" height="18" rx="2" fill="#ffffff"/><rect x="${x + w / 2 - 5}" y="${top + 19}" width="10" height="12" fill="#4b5d73"/>`
  for (let wy = top + 52; wy + 30 < 290; wy += 50)
    for (let i = 0; i < cols; i++) {
      const wx = x + gap + i * (20 + gap)
      s += `<rect x="${wx - 3}" y="${wy - 3}" width="26" height="36" fill="#ffffff"/><rect x="${wx}" y="${wy}" width="20" height="30" fill="#4b5d73"/><path d="M${wx} ${wy + 14}h20" stroke="#ffffff" stroke-width="2"/>`
    }
  return s + (withHoist ? hoist(x, w, top) : '') + `<rect x="${x + w / 2 - 16}" y="336" width="32" height="4" fill="#cfd4d8"/>`
}

/** Door at the bottom of a house from x to x + w. Bounds: x ±12, y from 300 to 336. */
const door = (x: number, w: number, color: string) =>
  `<path d="M${x + w / 2 - 12} 336V310a12 12 0 0 1 24 0V336Z" fill="${color}"/><circle cx="${x + w / 2 + 6}" cy="322" r="1.8" fill="#ffd166"/>`

/** Tulips in a pot; (x, y) = bottom of the pot. The flowers are separate. Bounds of the flowers: x ±13, y from −48 to −34. */
const pot = (x: number, y: number) =>
  `<path d="M${x - 8} ${y - 34}q-4 -6 0 -6M${x} ${y - 34}v-6M${x + 8} ${y - 34}q4 -6 0 -6M${x - 8} ${y - 18}V${y - 36}M${x} ${y - 18}V${y - 38}M${x + 8} ${y - 18}V${y - 36}" fill="none" stroke="#3f8f3a" stroke-width="3"/>` +
  `<path d="M${x - 13} ${y - 18}h26l-3 18h-20Z" fill="#c96b4f"/>`
const tulips = (x: number, y: number, color: string) =>
  [-8, 0, 8].map((dx) => `<path d="M${x + dx - 5} ${y - 44}v6a5 5 0 0 0 10 0v-6l-2.5 3l-2.5 -4l-2.5 4Z" fill="${color}"/>`).join('')

/** Houseboat; (x, y) = waterline middle. The lifebuoy is separate. Bounds: x ±120, y from −62 to +8. */
const houseboat = (x: number, y: number) =>
  `<path d="M${x - 120} ${y - 26}H${x + 120}L${x + 110} ${y + 8}H${x - 110}Z" fill="#3f7d5a"/>` +
  `<rect x="${x - 80}" y="${y - 58}" width="160" height="32" fill="#f0e2c0"/><rect x="${x - 86}" y="${y - 62}" width="172" height="6" rx="2" fill="#7a5233"/>` +
  [-20, 20, 56].map((dx) => `<rect x="${x + dx - 10}" y="${y - 52}" width="20" height="16" rx="3" fill="#4b5d73"/>`).join('') +
  `<path d="M${x + 60} ${y - 62}v-10M${x + 66} ${y - 62}v-14" stroke="#3f8f3a" stroke-width="3"/><path d="M${x + 54} ${y - 62}l4 -10h14l4 10Z" fill="#c96b4f"/>`
/** Lifebuoy on the houseboat's cabin at (x, y). Bounds: circle of radius 13. */
const lifebuoy = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="10" fill="none" stroke="#e63946" stroke-width="6"/>` +
  `<path d="M${x - 13} ${y}h6M${x + 7} ${y}h6M${x} ${y - 13}v6M${x} ${y + 7}v6" stroke="#ffffff" stroke-width="6"/>`

/** Window box of red geraniums under a window at (x, y) (its bottom left). Bounds: x from 0 to +26, y from −14 to +6. */
const windowBox = (x: number, y: number) =>
  [5, 13, 21].map((fx) => `<circle cx="${x + fx}" cy="${y - 4}" r="5" fill="#3f8f4f"/><circle cx="${x + fx}" cy="${y - 7}" r="3.5" fill="#e63946"/>`).join('') +
  `<rect x="${x}" y="${y}" width="26" height="6" rx="1" fill="#7a5233"/>`

/** Small potted shrub on the houseboat's roof at (x, y) (pot bottom). Bounds: x ±12, y from −24 to 0. */
const potShrub = (x: number, y: number) =>
  `<circle cx="${x - 5}" cy="${y - 14}" r="7" fill="#3f8f4f"/><circle cx="${x + 5}" cy="${y - 15}" r="7" fill="#4caf6a"/><circle cx="${x}" cy="${y - 20}" r="6" fill="#4caf6a"/>` +
  `<path d="M${x - 7} ${y - 8}h14l-2 8h-10Z" fill="#c96b4f"/>`

export default travelLevel({
  id: 403,
  title: 'amsterdam',
  parTimeSec: 86,
  place: { region: 'europe', country: 'nl', lat: 52.37, lon: 4.9 },
  scene: ({ diff, anim, rand, extra }) =>
    sky('#a8d8ee') +
    anim({ type: 'path', points: [[0, 0], [80, 0]], period: 42 }, cloud(120, 70, 0.6)) +
    anim({ type: 'path', points: [[0, 0], [-60, 0]], period: 50 }, cloud(620, 60, 0.7)) +
    gull(430, 70) +
    house(20, 120, 130, '#8b4a2b', 'step') +
    diff(80, 318, 26, door(20, 120, '#2f5d50'), door(20, 120, '#e63946')) +
    house(140, 110, 110, '#2f5d50', 'bell') +
    diff(163, 244, 24, windowBox(150, 245), '') +
    door(140, 110, '#1d1d1d') +
    house(250, 120, 140, '#f0e2c0', 'neck', false) +
    diff(310, 154, 24, hoist(250, 120, 140), '') +
    door(250, 120, '#2e4a6b') +
    house(370, 110, 120, '#a0442e', 'step') +
    door(370, 110, '#2f5d50') +
    house(480, 120, 150, '#2e4a6b', 'bell') +
    door(480, 120, '#f0e2c0') +
    house(600, 130, 130, '#d9a441', 'neck') +
    door(600, 130, '#7a5233') +
    house(730, 90, 160, '#7f9a8a', 'step') +
    door(730, 90, '#1d1d1d') +
    // Quay with a railing, then the canal
    `<rect y="340" width="800" height="24" fill="#9aa3ab"/>` +
    water(364, '#4f8fa6', rand) +
    `<path d="M0 352H800" stroke="#3d4a55" stroke-width="2"/>` +
    bike(170, 364, '#2b59c3') +
    diff(250, 346, 34, bike(250, 364, '#e63946'), bike(250, 364, '#ffb703')) +
    bike(330, 364, '#1d1d1d', true) +
    pot(470, 364) +
    diff(470, 323, 24, tulips(470, 364, '#e63946'), tulips(470, 364, '#ffd23f')) +
    cityTree(770, 364, 1.3) +
    diff(772, 272, 24, pigeon(772, 281, true, '#8a5a3b'), '') +
    houseboat(620, 440) +
    diff(615, 366, 24, potShrub(615, 378), '') +
    diff(560, 402, 24, lifebuoy(560, 402), '') +
    // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
    decor({ anim }, [
      ['duck', 376, 456],
      ['bottle', 624, 480],
      ['duck', 100, 420],
      ['bottle', 724, 388],
      ['cloud', 704, 92],
      ['birds', 300, 56],
      ['balloon', 500, 100, '#ffd23f'],
    ]) +
    extras({ extra, anim }, [
      ['lifeRing', 240, 428],
      ['bottle', 512, 476],
      ['bottle', 716, 476],
      ['balloon', 592, 104, '#ffd23f'],
      ['balloon', 380, 80, '#ffd23f'],
    ]),
})
