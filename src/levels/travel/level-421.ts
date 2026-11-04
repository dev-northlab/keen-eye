// Dubai: the Burj Khalifa over the skyline, the sail-shaped hotel on its island, a dhow, the fountain,
// a hot-air balloon, a camel and a date palm on the sand.
// Motion difference: the middle fountain jet bounces quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { palm, sky, sun, water } from './shapes.ts'

const GLASS = '#6f93b8'

/** Burj Khalifa: stepped tiers around x from the ground at 360 up to y = 60, then the lower needle. The upper needle is separate. */
const burj = (x: number) =>
  [[360, 300, 36], [300, 240, 28], [240, 180, 21], [180, 130, 15], [130, 90, 10], [90, 60, 6]]
    .map(([y0, y1, w]) => `<rect x="${x - w}" y="${y1}" width="${w * 2}" height="${y0 - y1}" fill="${GLASS}"/><path d="M${x} ${y1}V${y0}" stroke="#ffffff" stroke-opacity="0.5" stroke-width="2"/>`)
    .join('') +
  `<rect x="${x - 1.5}" y="44" width="3" height="18" fill="#c9d6e3"/>`
/** Upper needle of `burj` at x. Bounds: x ±2, y from 22 to 44. */
const needle = (x: number) => `<rect x="${x - 1.5}" y="22" width="3" height="22" fill="#c9d6e3"/>`
/** Light band across the tier at x, y = 151. Bounds: x ±15, y from 148 to 154. */
const band = (x: number, color: string) => `<rect x="${x - 15}" y="148" width="30" height="6" fill="${color}"/>`

/** Glass skyscraper from x to x + w, roof at `top`, ground at 360. */
function tower(x: number, w: number, top: number, color: string) {
  let s = `<rect x="${x}" y="${top}" width="${w}" height="${360 - top}" fill="${color}"/>`
  for (let y = top + 8; y < 352; y += 14) s += `<path d="M${x + 4} ${y}H${x + w - 4}" stroke="#ffffff" stroke-opacity="0.35" stroke-width="2"/>`
  return s
}
/** Red warning light on an antenna top at (x, y). Bounds: circle of radius 5. */
const warning = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="4.5" fill="#e63946"/>`

/** Sail-shaped hotel on its island; (x, y) = foot of the sail. The helipad is separate. */
const sailHotel = (x: number, y: number) =>
  `<ellipse cx="${x + 30}" cy="${y + 6}" rx="70" ry="10" fill="#d8c8a8"/>` +
  `<path d="M${x - 40} ${y}L${x - 28} ${y - 200}Q${x + 50} ${y - 160} ${x + 50} ${y}Z" fill="#fbfbf7"/>` +
  `<path d="M${x - 28} ${y - 200}Q${x + 70} ${y - 140} ${x + 64} ${y}" fill="none" stroke="#c9d6e3" stroke-width="5"/>` +
  [-150, -110, -70, -30].map((dy) => `<path d="M${x - 34} ${y + dy}Q${x + 6} ${y + dy - 6} ${x + 48} ${y + dy}" fill="none" stroke="#d6dde3" stroke-width="2"/>`).join('')
/** Round helipad sticking out of the sail at (x, y) (its middle). Bounds: x ±16, y from −5 to +12. */
const helipad = (x: number, y: number) =>
  `<path d="M${x - 14} ${y}L${x - 2} ${y + 12}" stroke="#d6dde3" stroke-width="3"/><ellipse cx="${x}" cy="${y}" rx="16" ry="5" fill="#ffffff" stroke="#9aa3ab" stroke-width="1.6"/>`

/** Dhow, bow to the left; (x, y) = waterline middle. The sail is separate. Bounds of the sail: x from −30 to +26, y from −68 to −12. */
const dhow = (x: number, y: number) =>
  `<path d="M${x - 50} ${y - 16}Q${x - 30} ${y + 6} ${x} ${y + 4}H${x + 40}L${x + 48} ${y - 14}Z" fill="#8a5a33"/><path d="M${x} ${y - 12}V${y - 64}" stroke="#5c3d24" stroke-width="3"/>`
const sail = (x: number, y: number, color: string) => `<path d="M${x - 30} ${y - 66}L${x + 24} ${y - 14}H${x - 4}Z" fill="${color}"/>`

/** Fountain jet; (x, y) = base. Bounds: x ±12, y from −h to 0. */
const jet = (x: number, y: number, h = 50) =>
  `<path d="M${x} ${y}q-12 -${h * 0.4} -6 -${h * 0.8}q6 4 6 ${h * 0.3}q0 -${h * 0.26} 6 -${h * 0.3}q6 ${h * 0.4} -6 ${h * 0.8}Z" fill="#e8f6fc"/><circle cx="${x}" cy="${y - h + 4}" r="5" fill="#ffffff"/>`

/** Hot-air balloon; (x, y) = middle of the envelope. The stripe is separate. Bounds: x ±26, y from −30 to +44. */
const balloon = (x: number, y: number) =>
  `<path d="M${x - 26} ${y}A26 30 0 1 1 ${x + 26} ${y}Q${x + 22} ${y + 18} ${x + 8} ${y + 28}H${x - 8}Q${x - 22} ${y + 18} ${x - 26} ${y}Z" fill="#ffd23f"/>` +
  `<path d="M${x - 8} ${y + 28}L${x - 6} ${y + 36}M${x + 8} ${y + 28}L${x + 6} ${y + 36}" stroke="#5c3d24" stroke-width="1.4"/><rect x="${x - 7}" y="${y + 36}" width="14" height="8" fill="#8a5a33"/>`
/** Middle stripe of `balloon` at (x, y). Bounds: x ±16, y from −28 to +28. */
const stripe = (x: number, y: number, color: string) =>
  `<path d="M${x - 10} ${y - 28}Q${x - 16} ${y} ${x - 6} ${y + 28}H${x + 6}Q${x + 16} ${y} ${x + 10} ${y - 28}Z" fill="${color}"/>`

/** Camel facing left; (x, y) = ground under the body. The saddle is separate. Bounds: x from −70 to +44, y from −104 to 0. */
const camel = (x: number, y: number) =>
  [-28, -16, 18, 30].map((dx) => `<rect x="${x + dx - 3}" y="${y - 56}" width="6" height="56" rx="3" fill="#c48a4a"/>`).join('') +
  `<ellipse cx="${x}" cy="${y - 60}" rx="40" ry="18" fill="#d39a58"/><path d="M${x - 22} ${y - 70}Q${x} ${y - 100} ${x + 22} ${y - 70}Z" fill="#d39a58"/>` +
  `<path d="M${x - 30} ${y - 62}Q${x - 44} ${y - 70} ${x - 52} ${y - 96}" fill="none" stroke="#d39a58" stroke-width="12" stroke-linecap="round"/>` +
  `<ellipse cx="${x - 60}" cy="${y - 98}" rx="11" ry="6" fill="#d39a58"/><circle cx="${x - 60}" cy="${y - 100}" r="1.4" fill="#2b2b2b"/>`
/** Saddle on the hump of `camel` at (x, y). Bounds: x ±16, y from −92 to −64. */
const saddle = (x: number, y: number, color: string) =>
  `<path d="M${x - 16} ${y - 64}Q${x - 14} ${y - 92} ${x} ${y - 92}Q${x + 14} ${y - 92} ${x + 16} ${y - 64}Z" fill="${color}"/><path d="M${x - 16} ${y - 66}h32" stroke="#ffd23f" stroke-width="3"/>`

/** Cluster of dates under a palm crown. Bounds: circle of radius 14 around (x, y). */
const dates = (x: number, y: number) =>
  [[-6, -4], [4, -6], [-2, 4], [8, 3], [-9, 6]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="4.5" fill="#b5541c"/>`).join('')

export default travelLevel({
  id: 421,
  title: 'dubai',
  parTimeSec: 112,
  place: { region: 'asia', country: 'ae', lat: 25.2, lon: 55.27 },
  scene: ({ diff, anim, rand, extra }) => {
    const bounce = (period: number) => anim({ id: 'jet', type: 'bob', dx: 0, dy: 6, period }, jet(430, 392, 46))
    return (
      sky('#9fd3ee') +
      sun(760, 70, '#ffc94a') +
      balloon(520, 102) +
      diff(520, 102, 30, stripe(520, 102, '#e63946'), stripe(520, 102, '#3a86ff')) +
      // Skyline and the Burj Khalifa
      tower(60, 50, 260, '#8fb0cc') +
      tower(120, 40, 230, '#b7cde0') +
      tower(205, 50, 200, '#7f9ab5') +
      `<path d="M230 200V186" stroke="#5c677d" stroke-width="2"/>` +
      diff(230, 184, 18, warning(230, 184), '') +
      tower(370, 46, 250, '#9db7cf') +
      tower(424, 40, 280, '#c3d3e2') +
      tower(470, 50, 240, '#8fb0cc') +
      burj(330) +
      diff(330, 33, 18, needle(330), '') +
      diff(330, 151, 18, band(330, '#ffd23f'), band(330, '#c9d6e3')) +
      // The sea with the hotel, the dhow and the fountain
      water(352, '#2f9ac4', rand, 12) +
      sailHotel(650, 350) +
      diff(692, 225, 20, helipad(692, 222), '') +
      dhow(190, 392) +
      diff(187, 352, 38, sail(190, 392, '#fbfbf7'), sail(190, 392, '#e63946')) +
      jet(390, 392, 36) +
      jet(470, 392, 36) +
      diff(430, 369, 34, bounce(1.1), bounce(2.6), 'jet') +
      // Sand with the palm and the camel
      `<path d="M0 410Q200 396 400 412T800 404V500H0Z" fill="#e8c27a"/>` +
      palm(90, 486, 1.1, 8) +
      diff(96, 384, 20, dates(96, 384), '') +
      camel(600, 486) +
      diff(600, 408, 24, saddle(600, 486, '#e63946'), saddle(600, 486, '#2a9d8f')) +
      // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
      decor({ anim }, [
        ['starfish', 256, 440, '#f28c28'],
        ['flipFlops', 476, 448, '#3a86ff'],
        ['crab', 704, 460, '#e63946'],
        ['bottle', 352, 384],
        ['lifeRing', 292, 380],
        ['cloud', 136, 136],
        ['birds', 576, 220],
      ]) +
      extras({ extra, anim }, [
        ['sunglasses', 64, 464],
        ['coconut', 368, 488],
        ['bottle', 512, 380],
        ['balloon', 412, 36, '#ffd23f'],
        ['birds', 668, 56],
      ])
    )
  },
})
