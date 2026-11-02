// Cusco: the cathedral with two bell towers on the main square, mountains with a snowy peak, houses
// with red roofs and a carved wooden balcony, an Inca stone wall, a llama with tassels, a woman in a
// traditional hat with a basket of corn and the rainbow flag of the city.
// Motion difference: the rainbow flag waves quickly on picture A and slowly on picture B.
import { travelLevel } from '../helpers.ts'
import { cloud, sky, sun } from './shapes.ts'

const STONE = '#b8a48a'

/** Bell tower; (x, y) = foot. The bell in its opening and the cupola are separate. Bounds: x ±30, y from −200 to 0. */
const belltower = (x: number, y: number) =>
  `<rect x="${x - 30}" y="${y - 170}" width="60" height="170" fill="${STONE}"/><rect x="${x - 32}" y="${y - 174}" width="64" height="8" fill="#a8937a"/>` +
  `<path d="M${x - 12} ${y - 112}V${y - 140}a12 12 0 0 1 24 0V${y - 112}Z" fill="#4a3a2c"/><rect x="${x - 32}" y="${y - 110}" width="64" height="6" fill="#a8937a"/>`
/** Bell in the opening of a tower at (x, y). Bounds: x ±8, y from −142 to −116. */
const bell = (x: number, y: number) => `<path d="M${x - 8} ${y - 118}Q${x - 8} ${y - 136} ${x} ${y - 138}Q${x + 8} ${y - 136} ${x + 8} ${y - 118}Z" fill="#c9a227"/><circle cx="${x}" cy="${y - 116}" r="2.5" fill="#c9a227"/>`
/** Cupola on a tower at (x, y). Bounds: x ±26, y from −204 to −174. */
const cupola = (x: number, y: number, color: string) => `<path d="M${x - 26} ${y - 174}Q${x - 24} ${y - 202} ${x} ${y - 204}Q${x + 24} ${y - 202} ${x + 26} ${y - 174}Z" fill="${color}"/>`

/** Cathedral front between its towers, x0 .. x1, ground at 330. The door is separate. */
const cathedral = (x0: number, x1: number) =>
  `<rect x="${x0}" y="200" width="${x1 - x0}" height="130" fill="#c4b196"/><path d="M${x0} 200L${(x0 + x1) / 2} 166L${x1} 200Z" fill="#c4b196"/>` +
  `<circle cx="${(x0 + x1) / 2}" cy="214" r="12" fill="#4a3a2c"/>` +
  [x0 + 30, x1 - 30].map((x) => `<rect x="${x - 6}" y="240" width="12" height="60" fill="#a8937a"/>`).join('')
const door = (x: number, color: string) => `<path d="M${x - 24} 330V282a24 24 0 0 1 48 0V330Z" fill="${color}"/>`

/** House with a red roof; (x, y) = bottom left. */
const house = (x: number, y: number, w: number, h: number) =>
  `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#f4f1ea"/><path d="M${x - 6} ${y - h}L${x + 8} ${y - h - 16}H${x + w - 8}L${x + w + 6} ${y - h}Z" fill="#c4502f"/>` +
  `<rect x="${x + w / 2 - 10}" y="${y - 40}" width="20" height="40" fill="#5c3d24"/>`
/** Carved wooden balcony; (x, y) = top left, 70 × 34. */
const balcony = (x: number, y: number, wood: string) =>
  `<rect x="${x}" y="${y}" width="70" height="34" fill="${wood}"/><rect x="${x - 4}" y="${y - 6}" width="78" height="8" fill="${wood}"/>` +
  [0, 1, 2].map((i) => `<rect x="${x + 6 + i * 22}" y="${y + 6}" width="14" height="22" fill="#4b5d73"/>`).join('')

/** Rainbow flag on the pole top at (x, y). Bounds: x from 0 to +36, y from 0 to +21. */
const flag = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">${['#e63946', '#f28c28', '#ffd23f', '#3fa46f', '#4dabf7', '#2b59c3', '#8338ec'].map((c, i) => `<rect y="${i * 3}" width="36" height="3" fill="${c}"/>`).join('')}</g>`

/** Inca wall from x = 0 to 300, top at y: big fitted stones. One stone (index 1) is separate. */
const STONES: string[] = [
  'M0 410L70 404L76 446L0 452Z', 'M70 404L150 408L144 450L76 446Z', 'M150 408L222 404L230 444L144 450Z', 'M222 404L300 408V448L230 444Z',
  'M0 452L76 446L82 500H0Z', 'M76 446L144 450L150 500H82Z', 'M144 450L230 444L224 500H150Z', 'M230 444L300 448V500H224Z',
]
const stone = (d: string, color: string) => `<path d="${d}" fill="${color}" stroke="#6b6152" stroke-width="3" stroke-linejoin="round"/>`

/** Llama facing left; (x, y) = ground under the body. The ear tassels are separate. Bounds: x from −44 to +34, y from −110 to 0. */
const llama = (x: number, y: number) =>
  [-20, -10, 14, 24].map((dx) => `<rect x="${x + dx - 3}" y="${y - 40}" width="6" height="40" fill="#f4ead2"/>`).join('') +
  `<ellipse cx="${x + 2}" cy="${y - 46}" rx="32" ry="16" fill="#fbf6e9"/><path d="M${x + 30} ${y - 50}q8 -2 6 8" fill="none" stroke="#fbf6e9" stroke-width="6" stroke-linecap="round"/>` +
  `<rect x="${x - 30}" y="${y - 96}" width="14" height="50" rx="7" fill="#fbf6e9"/><ellipse cx="${x - 30}" cy="${y - 96}" rx="13" ry="9" fill="#fbf6e9"/>` +
  `<path d="M${x - 26} ${y - 104}l2 -10l4 9ZM${x - 18} ${y - 102}l3 -10l3 10Z" fill="#fbf6e9"/><circle cx="${x - 34}" cy="${y - 98}" r="1.6" fill="#1d1d1d"/>` +
  `<rect x="${x - 14}" y="${y - 60}" width="30" height="14" fill="#e63946"/><path d="M${x - 14} ${y - 53}h30" stroke="#ffd23f" stroke-width="3"/>`
const tassels = (x: number, y: number, color: string) =>
  [[-24, -112], [-15, -111]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="4" fill="${color}"/>`).join('')

/** Woman in a wide skirt facing right; (x, y) = feet. The hat is separate. */
const woman = (x: number, y: number) =>
  `<path d="M${x - 12} ${y - 50}H${x + 12}Q${x + 26} ${y - 16} ${x + 22} ${y}H${x - 22}Q${x - 26} ${y - 16} ${x - 12} ${y - 50}Z" fill="#c9302c"/>` +
  [-36, -22, -10].map((dy) => `<path d="M${x - 20} ${y + dy}H${x + 20}" stroke="#ffd23f" stroke-width="2"/>`).join('') +
  `<path d="M${x - 10} ${y - 66}h20l2 18h-24Z" fill="#2b59c3"/><circle cx="${x}" cy="${y - 72}" r="8" fill="#c68b59"/>` +
  `<path d="M${x - 7} ${y - 72}q-4 12 -2 22M${x + 7} ${y - 72}q4 12 2 22" fill="none" stroke="#1d1d1d" stroke-width="3"/>`
/** Flat hat of the woman at (x, y). Bounds: x ±18, y from −88 to −76. */
const hat = (x: number, y: number, color: string) => `<rect x="${x - 18}" y="${y - 82}" width="36" height="5" rx="2" fill="${color}"/><rect x="${x - 9}" y="${y - 88}" width="18" height="7" rx="2" fill="${color}"/>`

/** Basket of corn cobs; (x, y) = bottom middle. The cobs are separate. */
const basket = (x: number, y: number) => `<path d="M${x - 20} ${y - 20}H${x + 20}L${x + 16} ${y}H${x - 16}Z" fill="#a0703f"/><path d="M${x - 18} ${y - 12}H${x + 18}" stroke="#7a5233" stroke-width="2"/>`
const cobs = (x: number, y: number, color: string) =>
  [-10, 0, 10].map((dx) => `<ellipse cx="${x + dx}" cy="${y - 28}" rx="5" ry="10" fill="${color}"/>`).join('')

export default travelLevel({
  id: 429,
  title: 'cusco',
  parTimeSec: 132,
  place: { region: 'americas', country: 'pe', lat: -13.53, lon: -71.97 },
  scene: ({ diff, anim }) => {
    const wave = (period: number) => anim({ id: 'flag', type: 'sway', angle: 8, pivot: [690, 196], period }, flag(690, 196))
    return (
      sky('#9fd3ee') +
      sun(90, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 46 }, cloud(420, 60, 0.5)) +
      // Mountains with a snowy peak
      `<path d="M0 250L120 140L230 210L350 120L470 200L600 90L720 170L800 130V330H0Z" fill="#8a9a6a"/>` +
      diff(601, 106, 30, `<path d="M600 90L624 112L610 108L600 122L590 108L578 116Z" fill="#ffffff"/>`, '') +
      `<path d="M350 120L370 140L358 136L350 146L342 134L332 138Z" fill="#ffffff"/>` +
      // Houses, balcony and flag
      house(20, 330, 110, 110) +
      house(140, 330, 100, 90) +
      diff(75, 266, 46, balcony(40, 252, '#3f8f5a'), balcony(40, 252, '#3a86ff')) +
      house(560, 330, 110, 100) +
      house(680, 330, 110, 120) +
      `<path d="M690 230V194" stroke="#5c3d24" stroke-width="3"/>` +
      diff(706, 206, 24, wave(1), wave(2.4), 'flag') +
      // The cathedral
      cathedral(300, 500) +
      belltower(290, 330) +
      diff(290, 202, 18, bell(290, 330), '') +
      cupola(290, 330, STONE) +
      belltower(510, 330) +
      bell(510, 330) +
      diff(510, 141, 32, cupola(510, 330, STONE), cupola(510, 330, '#4dabf7')) +
      diff(400, 294, 44, door(400, '#5c3d24'), door(400, '#2f5d8a')) +
      // Square, the Inca wall, the llama and the woman
      `<rect y="330" width="800" height="170" fill="#cfc4b0"/><path d="M0 336H800" stroke="#b8a48a" stroke-width="4"/>` +
      STONES.filter((_, i) => i !== 1).map((d) => stone(d, '#9a8c74')).join('') +
      diff(110, 427, 48, stone(STONES[1], '#9a8c74'), stone(STONES[1], '#7d725f')) +
      woman(420, 490) +
      diff(420, 408, 22, hat(420, 490, '#1d1d1d'), hat(420, 490, '#e63946')) +
      basket(484, 494) +
      diff(484, 466, 22, cobs(484, 494, '#ffd23f'), cobs(484, 494, '#6b2d6b')) +
      llama(650, 486) +
      diff(630, 374, 18, tassels(650, 486, '#ff6b8b'), tassels(650, 486, '#4dabf7'))
    )
  },
})
