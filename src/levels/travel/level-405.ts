// Agra: the Taj Mahal on its white platform, four minarets, the long pool with cypresses, a peacock.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { cloud, gull, sky, sun } from './shapes.ts'

const MARBLE = '#f7f3ec'
const SHADE = '#ddd5c6'

/** Pointed arch recess; (x, y) = bottom middle, w wide, h high. */
const iwan = (x: number, y: number, w: number, h: number) =>
  `<path d="M${x - w / 2} ${y}V${y - h + w * 0.6}Q${x - w / 2} ${y - h + w * 0.2} ${x} ${y - h}Q${x + w / 2} ${y - h + w * 0.2} ${x + w / 2} ${y - h + w * 0.6}V${y}Z" fill="${SHADE}"/>`

/** Main hall with the onion dome; (x, y) = ground of the hall in the middle. The finial and the right kiosk are separate. */
const hall = (x: number, y: number) =>
  `<rect x="${x - 110}" y="${y - 100}" width="220" height="100" fill="${MARBLE}"/>` +
  iwan(x, y, 60, 96) +
  [-85, -55, 55, 85].flatMap((dx) => [iwan(x + dx, y - 52, 22, 40), iwan(x + dx, y, 22, 42)]).join('') +
  `<rect x="${x - 55}" y="${y - 112}" width="110" height="14" fill="${MARBLE}"/>` +
  `<path d="M${x - 60} ${y - 110}Q${x - 74} ${y - 160} ${x - 30} ${y - 190}Q${x} ${y - 206} ${x} ${y - 222}Q${x} ${y - 206} ${x + 30} ${y - 190}Q${x + 74} ${y - 160} ${x + 60} ${y - 110}Z" fill="${MARBLE}"/>` +
  `<path d="M${x + 20} ${y - 196}Q${x + 64} ${y - 160} ${x + 52} ${y - 112}" fill="none" stroke="${SHADE}" stroke-width="5"/>`
/** Small domed kiosk on the hall roof; (x, y) = its foot. Bounds: x ±16, y from −40 to 0. */
const kiosk = (x: number, y: number) =>
  `<rect x="${x - 12}" y="${y - 18}" width="4" height="18" fill="${MARBLE}"/><rect x="${x + 8}" y="${y - 18}" width="4" height="18" fill="${MARBLE}"/>` +
  `<rect x="${x - 15}" y="${y - 22}" width="30" height="5" fill="${MARBLE}"/><path d="M${x - 14} ${y - 22}Q${x} ${y - 46} ${x + 14} ${y - 22}Z" fill="${MARBLE}"/>`
/** Golden finial on top of the dome of `hall` at (x, y). Bounds: x ±4, y from −246 to −220. */
const finial = (x: number, y: number) =>
  `<path d="M${x} ${y - 220}V${y - 246}" stroke="#c9a227" stroke-width="3"/><circle cx="${x}" cy="${y - 230}" r="4" fill="#c9a227"/>`

/** Minaret; (x, y) = foot. Balcony rings at −50 and −150; the middle one at −100 is separate. Bounds: x ±13, y from −196 to 0. */
const minaret = (x: number, y: number) =>
  `<path d="M${x - 10} ${y}L${x - 6} ${y - 170}H${x + 6}L${x + 10} ${y}Z" fill="${MARBLE}"/>` +
  [-50, -150].map((dy) => ring(x, y + dy)).join('') +
  `<path d="M${x - 10} ${y - 170}Q${x} ${y - 196} ${x + 10} ${y - 170}Z" fill="${MARBLE}"/><path d="M${x - 9} ${y - 170}h18" stroke="${SHADE}" stroke-width="3"/>`
const ring = (x: number, y: number) => `<rect x="${x - 13}" y="${y - 3}" width="26" height="7" rx="2" fill="${SHADE}"/>`

/** Cypress; (x, y) = foot. */
const cypress = (x: number, y: number, s: number) => `<ellipse cx="${x}" cy="${y - 34 * s}" rx="${9 * s}" ry="${36 * s}" fill="#2f6b45"/>`

/** Lotus flower on the water. Bounds: x ±14, y from −14 to +4. */
const lotus = (x: number, y: number, color: string) =>
  `<ellipse cx="${x}" cy="${y + 1}" rx="14" ry="3.5" fill="#3f8f3a"/>` +
  `<path d="M${x - 10} ${y}Q${x - 10} ${y - 10} ${x} ${y - 14}Q${x + 10} ${y - 10} ${x + 10} ${y}Z" fill="${color}"/><path d="M${x} ${y}Q${x - 4} ${y - 8} ${x} ${y - 14}Q${x + 4} ${y - 8} ${x} ${y}" fill="#ffffff" fill-opacity="0.5"/>`

/** Peacock, facing left; (x, y) = feet. The tail is separate. Bounds of the body: x from −22 to +16, y from −58 to 0. */
const peacock = (x: number, y: number) =>
  `<path d="M${x - 4} ${y}v-14M${x + 4} ${y}v-14" stroke="#7a5233" stroke-width="2.4"/>` +
  `<ellipse cx="${x}" cy="${y - 22}" rx="16" ry="11" fill="#1f5fa8"/><path d="M${x - 8} ${y - 26}Q${x - 14} ${y - 44} ${x - 12} ${y - 50}" stroke="#1f5fa8" stroke-width="7" stroke-linecap="round" fill="none"/>` +
  `<circle cx="${x - 13}" cy="${y - 52}" r="5" fill="#1f5fa8"/><path d="M${x - 17} ${y - 52}l-5 2l5 1Z" fill="#c9a227"/><path d="M${x - 12} ${y - 57}l-2 -6M${x - 10} ${y - 57}l1 -6" stroke="#1f5fa8" stroke-width="1.6"/>`
/** Peacock tail: spread into a fan (A) or folded behind (B). Bounds: x from −15 to +60, y from −74 to 0. */
const fan = (x: number, y: number) => {
  const [cx, cy] = [x + 10, y - 24]
  const at = (deg: number, r: number) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)].map((v) => v.toFixed(1))
  const eyes = [250, 268, 286, 304, 322, 340].map((deg) => {
    const [ex, ey] = at(deg, 40)
    return `<circle cx="${ex}" cy="${ey}" r="5" fill="#1f5fa8" stroke="#c9a227" stroke-width="2"/>`
  })
  const [sx, sy] = at(240, 50)
  return `<path d="M${cx} ${cy}L${sx} ${sy}A50 50 0 0 1 ${cx + 50} ${cy}Z" fill="#3f9b6b"/>${eyes.join('')}`
}
const folded = (x: number, y: number) => `<path d="M${x + 12} ${y - 26}L${x + 58} ${y - 6}L${x + 54} ${y}L${x + 10} ${y - 16}Z" fill="#3f9b6b"/>`

export default travelLevel({
  id: 405,
  title: 'agra',
  parTimeSec: 68,
  place: { region: 'asia', country: 'in', lat: 27.18, lon: 78.04 },
  scene: ({ diff, anim, extra }) =>
    sky('#a9d6ef') +
    sun(700, 90, '#ffc94a') +
    anim({ type: 'path', points: [[0, 0], [60, 0]], period: 44 }, cloud(130, 90, 0.6)) +
    gull(560, 70) +
    gull(590, 92) +
    // Gardens and the platform
    `<rect y="330" width="800" height="170" fill="#7cbf5a"/><rect x="150" y="300" width="500" height="32" fill="#efe9df"/>` +
    minaret(190, 300) +
    ring(190, 200) +
    minaret(250, 300) +
    ring(250, 200) +
    minaret(550, 300) +
    ring(550, 200) +
    minaret(610, 300) +
    diff(610, 201, 24, ring(610, 200), '') +
    hall(400, 300) +
    kiosk(320, 200) +
    diff(480, 180, 26, kiosk(480, 200), '') +
    diff(400, 66, 24, finial(400, 300), '') +
    // The pool with cypresses on both sides
    `<path d="M384 332H416L470 500H330Z" fill="#7cc3e0"/><path d="M380 332H420" stroke="#efe9df" stroke-width="4"/>` +
    [[0, 0.7], [1, 0.9], [2, 1.15]].flatMap(([i, s]) => [cypress(360 - i * 40, 360 + i * 50, s), cypress(440 + i * 40, 360 + i * 50, s)]).join('') +
    diff(408, 440, 24, lotus(408, 440, '#f28fb1'), lotus(408, 440, '#ffffff')) +
    lotus(380, 476, '#f28fb1') +
    diff(662, 433, 54, fan(640, 470), folded(640, 470)) +
    peacock(640, 470) +
    // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
    decor({ anim }, [
      ['bird', 84, 396, '#8a5a33'],
      ['flower', 560, 384, '#ffd23f'],
      ['flower', 320, 464, '#ff6b8b'],
      ['butterfly', 736, 352, '#ffd23f'],
      ['stones', 208, 360],
      ['balloon', 264, 32, '#ffd23f'],
      ['birds', 500, 92],
    ]) +
    extras({ extra, anim }, [
      ['grass', 180, 488],
      ['ladybug', 480, 472],
      ['flower', 100, 484, '#b38cff'],
      ['cloud', 92, 196],
      ['birds', 700, 192],
    ]),
})
