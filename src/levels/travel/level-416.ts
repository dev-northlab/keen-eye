// London: Big Ben's clock tower, the Houses of Parliament, the London Eye over the Thames, a red
// double-decker bus, a black cab and a red telephone box.
// Motion difference: the flag on Parliament waves quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { level416Redesign } from './level-416-redesign.ts'
import { car, cloud, gull, lampHead, lampPost, person, pigeon, sky, water } from './shapes.ts'

const STONE = '#c9a86a'

/** Clock tower (Elizabeth Tower) with Big Ben; (x, y) = foot in the middle. Finial and hands are separate. Bounds: x ±32, y from −320 to 0. */
const clockTower = (x: number, y: number) =>
  `<rect x="${x - 30}" y="${y - 220}" width="60" height="220" fill="${STONE}"/>` +
  [-180, -140, -100, -60].map((dy) => `<rect x="${x - 22}" y="${y + dy}" width="8" height="22" fill="#8a6f45"/><rect x="${x + 14}" y="${y + dy}" width="8" height="22" fill="#8a6f45"/>`).join('') +
  `<rect x="${x - 32}" y="${y - 284}" width="64" height="66" fill="#d8b97a"/><circle cx="${x}" cy="${y - 250}" r="24" fill="#f4ead2" stroke="#3d4a55" stroke-width="3"/>` +
  `<rect x="${x - 26}" y="${y - 302}" width="52" height="18" fill="${STONE}"/>` +
  `<path d="M${x - 30} ${y - 302}L${x} ${y - 360}L${x + 30} ${y - 302}Z" fill="#5c6b73"/>`
/** Gold finial on the spire of `clockTower` at (x, y). Bounds: x ±4, y from −372 to −358. */
const finial = (x: number, y: number) => `<path d="M${x} ${y - 358}V${y - 370}" stroke="#c9a227" stroke-width="3"/><circle cx="${x}" cy="${y - 372}" r="3" fill="#c9a227"/>`
/** Clock hands on the face of `clockTower` at (x, y) showing h:m. Bounds: circle of radius 18 around (x, y − 250). */
function hands(x: number, y: number, h: number, m: number) {
  const hand = (deg: number, len: number, width: number) => {
    const a = ((deg - 90) * Math.PI) / 180
    return `<path d="M${x} ${y - 250}l${(Math.cos(a) * len).toFixed(1)} ${(Math.sin(a) * len).toFixed(1)}" stroke="#1d1d1d" stroke-width="${width}" stroke-linecap="round"/>`
  }
  return hand(h * 30 + m / 2, 11, 3) + hand(m * 6, 17, 2)
}

/** Houses of Parliament from x0 to x1, roof at y = 230, ground at 340: pinnacles and tall windows. */
function parliament(x0: number, x1: number) {
  let s = `<rect x="${x0}" y="230" width="${x1 - x0}" height="110" fill="${STONE}"/>`
  for (let x = x0 + 6; x < x1; x += 20) s += `<path d="M${x - 3} 230L${x} 212L${x + 3} 230Z" fill="${STONE}"/>`
  for (let x = x0 + 12; x + 8 < x1; x += 20) s += `<rect x="${x}" y="250" width="7" height="28" rx="3" fill="#8a6f45"/><rect x="${x}" y="296" width="7" height="28" rx="3" fill="#8a6f45"/>`
  return s
}
/** Union flag on the Parliament tower's pole top at (x, y). Bounds: x from 0 to +26, y from 0 to +16. */
const flag = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect width="26" height="16" fill="#012169"/><path d="M0 0L26 16M26 0L0 16" stroke="#ffffff" stroke-width="3"/><path d="M0 0L26 16M26 0L0 16" stroke="#c8102e" stroke-width="1.2"/>` +
  `<path d="M13 0V16M0 8H26" stroke="#ffffff" stroke-width="5"/><path d="M13 0V16M0 8H26" stroke="#c8102e" stroke-width="3"/></g>`

/** London Eye centered at (cx, cy), radius r; `skip` = index of the missing capsule (−1 = none). */
function eye(cx: number, cy: number, r: number) {
  let s = `<path d="M${cx} ${cy}L${cx - 70} 340M${cx} ${cy}L${cx + 70} 340" stroke="#d6dde3" stroke-width="7"/>`
  for (let i = 0; i < 16; i++) {
    const a = (i * Math.PI) / 8
    s += `<path d="M${cx} ${cy}L${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}" stroke="#d6dde3" stroke-width="1.4"/>`
  }
  return s + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#eef2f5" stroke-width="6"/><circle cx="${cx}" cy="${cy}" r="10" fill="#d6dde3"/>`
}
/** Capsule number i (of 16) on the rim of `eye`. Bounds: circle of radius 10 around its rim point. */
const capsule = (cx: number, cy: number, r: number, i: number) => {
  const a = (i * Math.PI) / 8
  return `<ellipse cx="${(cx + Math.cos(a) * r).toFixed(1)}" cy="${(cy + Math.sin(a) * r).toFixed(1)}" rx="9" ry="7" fill="#bde3f2" stroke="#7aa6d6" stroke-width="2"/>`
}

/** Red double-decker bus facing right; (x, y) = ground in the middle. Bounds: x ±72, y from −86 to 0. */
function doubleDecker(x: number, y: number) {
  let windows = ''
  for (let i = 0; i < 5; i++) windows += `<rect x="${x - 62 + i * 24}" y="${y - 76}" width="18" height="18" rx="3" fill="#bde3f2"/><rect x="${x - 62 + i * 24}" y="${y - 44}" width="18" height="18" rx="3" fill="#bde3f2"/>`
  return (
    `<rect x="${x - 72}" y="${y - 86}" width="144" height="76" rx="8" fill="#d62828"/>${windows}` +
    `<rect x="${x + 58}" y="${y - 44}" width="12" height="28" fill="#bde3f2"/><rect x="${x - 72}" y="${y - 52}" width="144" height="4" fill="#ffd23f"/>` +
    [-44, 44].map((dx) => `<circle cx="${x + dx}" cy="${y - 8}" r="11" fill="#2b2b2b"/><circle cx="${x + dx}" cy="${y - 8}" r="4" fill="#ccc"/>`).join('')
  )
}
/** Passenger in an upper window of the bus at (x, y); window number 0..4. Bounds: x ±6, y from −76 to −62. */
const passenger = (x: number, y: number, i: number) =>
  `<circle cx="${x - 53 + i * 24}" cy="${y - 66}" r="5" fill="#f2d29b"/><path d="M${x - 58 + i * 24} ${y - 68}q5 -8 10 0" fill="#5a3d2b"/>`

/** Red telephone box; (x, y) = ground in the middle. The sign strip is separate. Bounds: x ±14, y from −76 to 0. */
const phoneBox = (x: number, y: number) =>
  `<rect x="${x - 13}" y="${y - 66}" width="26" height="66" fill="#d62828"/><path d="M${x - 14} ${y - 66}Q${x} ${y - 78} ${x + 14} ${y - 66}Z" fill="#d62828"/>` +
  [0, 1, 2].map((i) => `<rect x="${x - 9}" y="${y - 50 + i * 14}" width="18" height="11" fill="#bde3f2"/>`).join('')
/** Sign strip of `phoneBox` at (x, y). Bounds: x ±11, y from −63 to −55. */
const phoneSign = (x: number, y: number, color: string) => `<rect x="${x - 11}" y="${y - 63}" width="22" height="7" fill="${color}"/>`

/** Taxi sign on the roof of the cab (a `car`) at (x, y). Bounds: x from −7 to +7, y from −44 to −36. */
const taxiSign = (x: number, y: number, color: string) => `<rect x="${x - 5}" y="${y - 44}" width="14" height="8" rx="2" fill="${color}"/>`

/** Umbrella over a `person` standing at (x, y). Bounds: x ±26, y from −88 to −64. */
const umbrella = (x: number, y: number, color: string) => `<path d="M${x - 26} ${y - 64}Q${x} ${y - 112} ${x + 26} ${y - 64}Z" fill="${color}"/>`

export default travelLevel({
  id: 416,
  redesign: level416Redesign,
  title: 'london',
  parTimeSec: 100,
  place: { region: 'europe', country: 'gb', lat: 51.5, lon: -0.12 },
  scene: ({ diff, anim, rand, extra }) => {
    const wave = (period: number) => anim({ id: 'flag', type: 'sway', angle: 8, pivot: [420, 100], period }, flag(420, 100))
    return (
      sky('#b8d4e8') +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 40 }, cloud(250, 70, 0.6)) +
      anim({ type: 'path', points: [[0, 0], [-50, 0]], period: 50 }, cloud(520, 50, 0.5)) +
      gull(310, 130) +
      eye(630, 190, 140) +
      [...Array(16).keys()].filter((i) => i !== 14).map((i) => capsule(630, 190, 140, i)).join('') +
      diff(729, 91, 20, capsule(630, 190, 140, 14), '') +
      // Parliament with its tower, the clock tower
      parliament(150, 450) +
      `<rect x="396" y="140" width="48" height="92" fill="${STONE}"/><path d="M396 140h48l-6 -10h-36Z" fill="#8a6f45"/><path d="M420 130V98" stroke="#3d4a55" stroke-width="2"/>` +
      diff(432, 108, 22, wave(1), wave(2.4), 'flag') +
      clockTower(100, 400) +
      diff(100, 34, 20, finial(100, 400), '') +
      diff(100, 150, 22, hands(100, 400, 3, 0), hands(100, 400, 9, 30)) +
      // The Thames and the embankment
      water(340, '#6b8fa3', rand, 12) +
      `<rect y="404" width="800" height="96" fill="#9aa3ab"/><rect y="404" width="800" height="8" fill="#7f8a94"/>` +
      lampPost(40, 490) +
      lampHead(40, 490) +
      doubleDecker(280, 488) +
      diff(227, 420, 20, '', passenger(280, 488, 0)) +
      passenger(280, 488, 3) +
      car(470, 488, '#1d1d1d') +
      diff(474, 448, 20, taxiSign(470, 488, '#ffd23f'), taxiSign(470, 488, '#6b6b6b')) +
      phoneBox(590, 488) +
      diff(590, 429, 20, phoneSign(590, 488, '#ffffff'), phoneSign(590, 488, '#ffd23f')) +
      person(700, 490, '#3a86ff', true) +
      `<path d="M700 470V412" stroke="#3d4a55" stroke-width="2"/>` +
      diff(700, 414, 30, umbrella(700, 490, '#1d1d1d'), umbrella(700, 490, '#e63946')) +
      pigeon(380, 496) +
      pigeon(640, 494, true) +
      // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
      decor({ anim }, [
        ['pigeon', 384, 468],
        ['cone', 176, 476],
        ['pigeon', 540, 480],
        ['bottle', 644, 368],
        ['lifeRing', 84, 368],
        ['birds', 200, 176],
        ['balloon', 372, 32, '#ffd23f'],
      ]) +
      extras({ extra, anim }, [
        ['cone', 736, 488],
        ['bottle', 276, 364],
        ['bottle', 464, 364],
        ['birds', 344, 176],
        ['birds', 176, 84],
      ])
    )
  },
})
