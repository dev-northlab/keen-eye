// Motion differences: the chimney smoke rises faster on picture B; the bird hops only on B; the lantern swings faster on B.
import { svgLevel } from '../helpers.ts'
import { bird, cabin, deer, rabbit } from './shapes.ts'

/** Snowy pine; (x, y) = bottom of the trunk. The snow cap is separate. Bounds: x ±30·s, y from −100·s to 0. */
const pine = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-5" y="-16" width="10" height="16" fill="#6b4f3a"/>` +
  `<path d="M0 -100L-30 -40h60Z" fill="#2f7d55"/><path d="M0 -100L-22 -60h44Z" fill="#3b9467"/><path d="M0 -70L-30 -16h60Z" fill="#2f7d55"/>` +
  `<path d="M-30 -16q10 -8 20 0t20 0t20 0" stroke="#fff" stroke-width="6" fill="none"/></g>`
/** Snow cap on the pine at (x, y) = trunk bottom, scale s. Bounds: x ±14·s, y from −100·s to −74·s. */
const cap = (x: number, y: number, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -100L-14 -76q7 4 14 0q7 4 14 0Z" fill="#fff"/></g>`

/** Smoke over the chimney top at (x, y). Bounds: x from −12 to +14, y from −44 to +4. */
const smoke = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y - 6}" r="7" fill="#e3e3ec"/><circle cx="${x + 5}" cy="${y - 20}" r="9" fill="#ededf3"/><circle cx="${x - 1}" cy="${y - 34}" r="10" fill="#f4f4f8"/>`

/** Icicles under the roof edge from x0, `n` of them 14 apart. Bounds: x from x0 − 4 to x0 + 14·n, y from 0 to +18. */
const icicles = (x0: number, y: number, n: number) =>
  Array.from({ length: n }, (_, i) => `<path d="M${x0 + i * 14 - 4} ${y}h8l-4 ${12 + (i % 2) * 6}Z" fill="#dbeaf7"/>`).join('')

/** Lantern hanging from (x, y). Bounds: x ±8, y from 0 to +28. */
const lantern = (x: number, y: number) =>
  `<path d="M${x} ${y}v6" stroke="#333" stroke-width="2"/><rect x="${x - 7}" y="${y + 6}" width="14" height="18" rx="3" fill="#ffd166" stroke="#333" stroke-width="2"/><rect x="${x - 4}" y="${y + 24}" width="8" height="4" fill="#333"/>`

/** Berry bush under snow; (x, y) = bottom center. Bounds: x ±22, y from −24 to 0. */
const berryBush = (x: number, y: number, berry: string) =>
  `<g transform="translate(${x} ${y})"><circle cx="-10" cy="-10" r="10" fill="#8a5a3b"/><circle cx="10" cy="-10" r="10" fill="#8a5a3b"/><circle cy="-14" r="10" fill="#8a5a3b"/>` +
  `<path d="M-22 -14q11 -6 22 0t22 0" stroke="#fff" stroke-width="5" fill="none"/>` +
  [[-12, -6], [-2, -10], [8, -4], [14, -12]].map(([dx, dy]) => `<circle cx="${dx}" cy="${dy}" r="3" fill="${berry}"/>`).join('') + `</g>`

export default svgLevel({
  id: 57,
  chapter: 'forest',
  title: 'winterForest',
  parTimeSec: 120,
  scene: ({ diff, anim, rand }) => {
    let flakes = ''
    for (let i = 0; i < 40; i++) flakes += `<circle cx="${rand() * 800}" cy="${rand() * 500}" r="${2 + rand() * 2}" fill="#fff" fill-opacity="0.9"/>`
    let tracks = ''
    for (let i = 0; i < 8; i++) tracks += `<ellipse cx="${300 + i * 30}" cy="${470 + (i % 2) * 8}" rx="4" ry="2.5" fill="#dbeaf7"/>`
    const puffing = (period: number) => anim({ id: 'smoke', type: 'path', points: [[0, 0], [0, -22]], period }, smoke(560, 210))
    const perched = bird(176, 266, '#e63946')
    const swinging = (period: number) => anim({ type: 'sway', angle: 12, pivot: [580, 300], period }, lantern(580, 300))

    return (
      `<rect width="800" height="500" fill="#c7d9ea"/>` +
      `<path d="M0 300Q200 260 400 290T800 270V500H0Z" fill="#eef4fb"/>` +
      pine(60, 320, 1.3) +
      cap(60, 320, 1.3) +
      diff(140, 227, 22, cap(140, 320, 1.1), '') +
      pine(140, 320, 1.1) +
      `<path d="M160 280l40 -14" stroke="#6b4f3a" stroke-width="5" stroke-linecap="round"/>` +
      diff(176, 258, 18, perched, anim({ id: 'bird', type: 'bob', dx: 0, dy: 4, period: 0.8 }, perched), 'bird') +
      pine(720, 320, 1.4) +
      cap(720, 320, 1.4) +
      pine(660, 330, 0.9) +
      cap(660, 330, 0.9) +
      // Cabin
      `<rect x="550" y="210" width="20" height="40" fill="#8d99ae"/>` +
      diff(561, 188, 38, puffing(5), puffing(2), 'smoke') +
      cabin(500, 400, 180, 110) +
      `<path d="M400 294h200v10q-25 10 -50 0t-50 0t-50 0t-50 0Z" fill="#fff"/>` +
      diff(440, 310, 24, icicles(412, 304, 4), icicles(412, 304, 3)) +
      `<rect x="520" y="330" width="36" height="36" fill="#5a3d2b"/><rect x="524" y="334" width="28" height="28" fill="#ffd166"/>` +
      `<rect x="470" y="340" width="36" height="60" fill="#5a3d2b"/><path d="M580 300h-26" stroke="#3d4a55" stroke-width="3"/>` +
      diff(580, 314, 20, swinging(2.4), swinging(1)) +
      `<rect y="400" width="800" height="100" fill="#fff"/>` +
      diff(260, 404, 52, deer(260, 440, true, '#8d6e53'), '') +
      diff(80, 464, 22, rabbit(80, 480, false, '#c9bfae'), rabbit(80, 480, true, '#c9bfae')) +
      tracks +
      diff(680, 468, 26, berryBush(680, 480, '#e63946'), berryBush(680, 480, '#3a86ff')) +
      anim({ type: 'path', points: [[0, 0], [-10, 40]], period: 3.5 }, flakes)
    )
  },
})
