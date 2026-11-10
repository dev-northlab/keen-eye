// Athens: the Parthenon on the Acropolis with an owl and the flag, white houses of the old town with
// blue doors and bougainvillea, an olive tree, a cat on the wall and an amphora.
// Motion difference: the flag on the Acropolis waves quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { cloud, gull, sky, sun } from './shapes.ts'

const MARBLE = '#efe6d2'

/** Column of the Parthenon at x, from the stylobate at y = 168 up to 100. Bounds: x from 0 to +12, y from 100 to 168. */
const column = (x: number) =>
  `<rect x="${x}" y="100" width="12" height="68" fill="${MARBLE}"/><path d="M${x + 4} 104V164M${x + 8} 104V164" stroke="#d8ccb2" stroke-width="1.4"/>`

/** Little owl perched; (x, y) = feet. Bounds: x ±9, y from −20 to 0. */
const owl = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 9}" rx="8" ry="10" fill="#9a7b5a"/><path d="M${x - 7} ${y - 16}l2 -5l3 4h4l3 -4l2 5Z" fill="#9a7b5a"/>` +
  `<circle cx="${x - 3}" cy="${y - 13}" r="2.6" fill="#ffd23f"/><circle cx="${x + 3}" cy="${y - 13}" r="2.6" fill="#ffd23f"/><circle cx="${x - 3}" cy="${y - 13}" r="1" fill="#1d1d1d"/><circle cx="${x + 3}" cy="${y - 13}" r="1" fill="#1d1d1d"/>`

/** Greek flag on the pole top at (x, y). Bounds: x from 0 to +30, y from 0 to +20. */
const flag = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">${[0, 1, 2, 3, 4].map((i) => `<rect y="${i * 4}" width="30" height="2.2" fill="#0d5eaf"/>`).join('')}` +
  `<rect width="12" height="11" fill="#0d5eaf"/><path d="M6 0V11M0 5.5H12" stroke="#ffffff" stroke-width="2"/></g>`

/** White cubic house from x to x + w, roof at `top`, ground at 420. Door and flowers separate. */
const house = (x: number, w: number, top: number) =>
  `<rect x="${x}" y="${top}" width="${w}" height="${420 - top}" fill="#fbfbf7"/><rect x="${x - 3}" y="${top - 5}" width="${w + 6}" height="6" fill="#e3ddd0"/>` +
  `<rect x="${x + 10}" y="${top + 14}" width="16" height="18" fill="#2b6cb0"/><rect x="${x + w - 26}" y="${top + 14}" width="16" height="18" fill="#2b6cb0"/>`
/** Door of a house at x (its middle) on the ground at 420. Bounds: x ±10, y from 386 to 420. */
const door = (x: number, color: string) => `<path d="M${x - 10} 420V394a10 8 0 0 1 20 0V420Z" fill="${color}"/>`
/** Bougainvillea over a wall around (x, y). Bounds: circle of radius 22. */
const bougainvillea = (x: number, y: number) =>
  [[-14, -4], [-6, -12], [4, -8], [12, 0], [-2, 4], [8, 10], [-12, 8]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="7" fill="#d6338a"/>`).join('') +
  `<path d="M${x - 18} ${y + 14}q10 -6 18 2" fill="none" stroke="#3f8f3a" stroke-width="3"/>`

/** Olive tree; (x, y) = foot. The olives are separate. Bounds: x ±64, y from −120 to 0. */
const olive = (x: number, y: number) =>
  `<path d="M${x - 6} ${y}Q${x - 14} ${y - 40} ${x} ${y - 60}M${x - 4} ${y - 30}Q${x + 20} ${y - 50} ${x + 26} ${y - 70}" fill="none" stroke="#7a5a3a" stroke-width="10" stroke-linecap="round"/>` +
  `<ellipse cx="${x - 20}" cy="${y - 80}" rx="44" ry="30" fill="#8fa37a"/><ellipse cx="${x + 24}" cy="${y - 92}" rx="40" ry="28" fill="#9db389"/>`
const olives = (x: number, y: number, color: string) =>
  [[-8, -4], [0, 4], [8, -2], [-4, 10], [10, 8]].map(([dx, dy]) => `<ellipse cx="${x + dx}" cy="${y + dy}" rx="3.5" ry="4.5" fill="${color}"/>`).join('')

/** Cat lying on the wall; (x, y) = belly on the wall top. Bounds: x from −20 to +24, y from −20 to 0. */
const cat = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 7}" rx="16" ry="7" fill="#f4f4f4"/><circle cx="${x + 15}" cy="${y - 12}" r="7" fill="#f4f4f4"/>` +
  `<path d="M${x + 10} ${y - 17}l1 -5l4 3ZM${x + 17} ${y - 18}l3 -4l1 5Z" fill="#f4f4f4"/><path d="M${x - 16} ${y - 4}q-6 -2 -4 -10" fill="none" stroke="#f4f4f4" stroke-width="3"/>` +
  `<circle cx="${x + 13}" cy="${y - 12}" r="1" fill="#1d1d1d"/><circle cx="${x + 18}" cy="${y - 12}" r="1" fill="#1d1d1d"/>`

/** Amphora; (x, y) = foot. The band is separate. Bounds: x ±20, y from −62 to 0. */
const amphora = (x: number, y: number) =>
  `<path d="M${x - 6} ${y}L${x - 16} ${y - 30}Q${x - 16} ${y - 44} ${x - 6} ${y - 50}V${y - 58}H${x + 6}V${y - 50}Q${x + 16} ${y - 44} ${x + 16} ${y - 30}L${x + 6} ${y}Z" fill="#c96b3c"/>` +
  `<path d="M${x - 6} ${y - 52}q-14 0 -10 12M${x + 6} ${y - 52}q14 0 10 12" fill="none" stroke="#c96b3c" stroke-width="3"/>`
const band = (x: number, y: number, color: string) => `<path d="M${x - 15} ${y - 34}H${x + 15}M${x - 13} ${y - 24}H${x + 13}" stroke="${color}" stroke-width="4"/>`

export default travelLevel({
  id: 418,
  title: 'athens',
  parTimeSec: 104,
  place: { region: 'europe', country: 'gr', lat: 37.97, lon: 23.73 },
  scene: ({ diff, anim, extra }) => {
    const wave = (period: number) => anim({ id: 'flag', type: 'sway', angle: 8, pivot: [640, 112], period }, flag(640, 112))
    return (
      sky('#9fd6f2') +
      sun(90, 80) +
      anim({ type: 'path', points: [[0, 0], [70, 0]], period: 46 }, cloud(150, 150, 0.5)) +
      gull(720, 60) +
      // The Acropolis
      `<path d="M60 300Q120 200 250 184H580Q690 196 760 300Z" fill="#c9b48a"/><path d="M220 186H600V196H220Z" fill="#b8a379"/>` +
      `<rect x="282" y="168" width="256" height="14" fill="${MARBLE}"/>` +
      [0, 1, 2, 3, 4, 6, 7].map((i) => column(296 + i * 32)).join('') +
      diff(458, 134, 36, column(296 + 5 * 32), '') +
      `<rect x="282" y="88" width="256" height="14" fill="${MARBLE}"/><path d="M280 88L410 56L540 88Z" fill="${MARBLE}"/><path d="M300 84L410 62L520 84" fill="none" stroke="#d8ccb2" stroke-width="2"/>` +
      diff(330, 64, 18, owl(330, 78), '') +
      `<path d="M640 186V110" stroke="#5c4a35" stroke-width="3"/>` +
      diff(654, 122, 22, wave(1), wave(2.4), 'flag') +
      // Old town
      house(130, 110, 320) +
      house(250, 90, 300) +
      house(350, 120, 330) +
      house(480, 100, 310) +
      house(590, 120, 326) +
      [185, 410, 530, 650].map((x) => door(x, '#2b6cb0')).join('') +
      diff(295, 403, 20, door(295, '#2b6cb0'), door(295, '#3fa46f')) +
      diff(470, 322, 24, bougainvillea(470, 322), '') +
      // Wall, olive tree, cat and amphora
      `<rect y="420" width="800" height="80" fill="#e8dcc0"/><rect y="440" width="800" height="22" fill="#d6c6a2"/><path d="M0 440H800" stroke="#bfae88" stroke-width="2"/>` +
      olive(90, 480) +
      diff(84, 404, 22, olives(84, 404, '#4b5a2a'), olives(84, 404, '#1d1d1d')) +
      diff(380, 428, 26, cat(380, 440), '') +
      amphora(680, 492) +
      diff(680, 463, 20, band(680, 492, '#1d1d1d'), band(680, 492, '#f4ead2')) +
      // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
      decor({ anim }, [
        ['pigeon', 524, 476],
        ['suitcase', 144, 480, '#3a86ff'],
        ['bin', 324, 488, '#2a9d8f'],
        ['stones', 584, 280],
        ['birds', 212, 84],
        ['cloud', 592, 56],
        ['birds', 88, 204],
      ]) +
      extras({ extra, anim }, [
        ['coffeeCup', 744, 472],
        ['shoppingBag', 616, 476, '#ff6b8b'],
        ['pigeon', 232, 476],
        ['rock', 368, 284, '#a8743f'],
        ['balloon', 716, 176, '#ffd23f'],
      ])
    )
  },
})
