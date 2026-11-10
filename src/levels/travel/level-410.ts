// New York: the Statue of Liberty on its island, the Manhattan skyline with the Empire State Building, a ferry.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { cloud, gull, sky, water } from './shapes.ts'

const STATUE = '#7fc8a9'

/** Skyscraper from x to x + w, roof at `top`, standing at y = 360; windows in a grid. */
function skyscraper(x: number, w: number, top: number, wall: string) {
  let s = `<rect x="${x}" y="${top}" width="${w}" height="${360 - top}" fill="${wall}"/>`
  for (let wy = top + 10; wy < 350; wy += 16)
    for (let wx = x + 6; wx + 6 <= x + w - 4; wx += 12) s += `<rect x="${wx}" y="${wy}" width="6" height="8" fill="#e8f1f8" fill-opacity="0.75"/>`
  return s
}

/** Empire State Building; (x, y) = foot in the middle. The needle is separate. Bounds: x ±28, y from −270 to 0. */
const empireState = (x: number, y: number) =>
  skyscraper(x - 28, 56, y - 160, '#8d99ae') +
  `<rect x="${x - 18}" y="${y - 196}" width="36" height="40" fill="#8d99ae"/><rect x="${x - 10}" y="${y - 222}" width="20" height="30" fill="#8d99ae"/>` +
  `<rect x="${x - 4}" y="${y - 240}" width="8" height="20" fill="#7a8599"/>` +
  [-12, 0, 12].map((dx) => `<rect x="${x + dx - 2}" y="${y - 190}" width="4" height="30" fill="#e8f1f8" fill-opacity="0.75"/>`).join('')
/** Needle on top of `empireState` at (x, y). Bounds: x ±2, y from −270 to −238. */
const needle = (x: number, y: number) => `<rect x="${x - 2}" y="${y - 270}" width="4" height="32" fill="#5c677d"/>`

/** Wooden water tank on a roof; (x, y) = roof under its middle. Bounds: x ±14, y from −38 to 0. */
const waterTank = (x: number, y: number) =>
  `<path d="M${x - 10} ${y}l3 -8M${x + 10} ${y}l-3 -8" stroke="#5c4a35" stroke-width="2"/>` +
  `<rect x="${x - 12}" y="${y - 28}" width="24" height="20" fill="#a0703f"/><path d="M${x - 12} ${y - 22}h24M${x - 12} ${y - 14}h24" stroke="#5c4a35" stroke-width="1.6"/>` +
  `<path d="M${x - 14} ${y - 28}L${x} ${y - 38}L${x + 14} ${y - 28}Z" fill="#5c4a35"/>`

/** Statue of Liberty on its pedestal; (x, y) = foot of the pedestal. The flame and the crown are separate. */
const liberty = (x: number, y: number) =>
  `<path d="M${x - 70} ${y}L${x - 50} ${y - 28}H${x + 50}L${x + 70} ${y}Z" fill="#a3aab3"/>` +
  `<path d="M${x - 30} ${y - 28}L${x - 26} ${y - 110}H${x + 26}L${x + 30} ${y - 28}Z" fill="#c9b48a"/><rect x="${x - 32}" y="${y - 116}" width="64" height="8" fill="#b8a379"/>` +
  `<path d="M${x - 22} ${y - 116}Q${x - 18} ${y - 170} ${x - 10} ${y - 194}H${x + 10}Q${x + 18} ${y - 170} ${x + 22} ${y - 116}Z" fill="${STATUE}"/>` +
  `<path d="M${x + 8} ${y - 190}L${x + 20} ${y - 252}" stroke="${STATUE}" stroke-width="8" stroke-linecap="round"/>` +
  `<rect x="${x + 17}" y="${y - 262}" width="6" height="12" fill="${STATUE}"/>` +
  `<rect x="${x - 22}" y="${y - 180}" width="12" height="18" rx="2" fill="#6bb393" transform="rotate(-12 ${x - 16} ${y - 171})"/>` +
  `<circle cx="${x}" cy="${y - 204}" r="10" fill="${STATUE}"/><path d="M${x - 10} ${y - 207}h20" stroke="#5fa486" stroke-width="3"/>`
/** Torch flame of `liberty` at (x, y). Bounds: x from +12 to +28, y from −282 to −262. */
const flame = (x: number, y: number) =>
  `<path d="M${x + 20} ${y - 282}Q${x + 30} ${y - 268} ${x + 20} ${y - 262}Q${x + 10} ${y - 268} ${x + 20} ${y - 282}Z" fill="#f2b33d"/>`
/** Pointed crown rays around the head of `liberty` at (x, y). Bounds: circle of radius 21 around (x, y − 204). */
const crown = (x: number, y: number, angles: number[]) =>
  angles
    .map((deg) => {
      const a = (deg * Math.PI) / 180
      const at = (r: number, side: number) =>
        `${(x + Math.cos(a) * r - Math.sin(a) * side).toFixed(1)} ${(y - 204 + Math.sin(a) * r + Math.cos(a) * side).toFixed(1)}`
      return `<path d="M${at(8, -3)}L${at(21, 0)}L${at(8, 3)}Z" fill="${STATUE}"/>`
    })
    .join('')

/** Ferry, bow to the right; (x, y) = waterline middle. The hull is separate. Bounds: x ±56, y from −46 to 0. */
const ferryTop = (x: number, y: number) =>
  `<rect x="${x - 50}" y="${y - 40}" width="100" height="18" fill="#ffffff"/><rect x="${x - 36}" y="${y - 52}" width="64" height="12" fill="#ffffff"/>` +
  [-40, -24, -8, 8, 24].map((dx) => `<rect x="${x + dx}" y="${y - 36}" width="10" height="9" rx="2" fill="#4b5d73"/>`).join('') +
  `<rect x="${x + 8}" y="${y - 66}" width="10" height="14" fill="#e8552d"/>`
/** Hull of the ferry at (x, y). Bounds: x ±70, y from −22 to +4. */
const hull = (x: number, y: number, color: string) => `<path d="M${x - 70} ${y - 22}H${x + 70}L${x + 56} ${y + 4}H${x - 60}Z" fill="${color}"/>`

export default travelLevel({
  id: 410,
  title: 'newYork',
  parTimeSec: 80,
  place: { region: 'americas', country: 'us', lat: 40.71, lon: -74.01 },
  scene: ({ diff, anim, rand, extra }) =>
    sky('#9fd3ee') +
    anim({ type: 'path', points: [[0, 0], [70, 0]], period: 44 }, cloud(420, 70, 0.6)) +
    anim({ type: 'path', points: [[0, 0], [-60, 0]], period: 50 }, cloud(730, 110, 0.5)) +
    gull(240, 90) +
    diff(320, 130, 22, gull(320, 130), '') +
    // Skyline
    skyscraper(250, 50, 250, '#a9b6c6') +
    skyscraper(300, 60, 200, '#7aa6d6') +
    skyscraper(360, 44, 270, '#c9d3dd') +
    skyscraper(404, 70, 180, '#5c7a99') +
    `<path d="M404 180L439 140L474 180Z" fill="#5c7a99"/>` +
    skyscraper(474, 50, 230, '#b8c4d2') +
    empireState(560, 360) +
    diff(560, 106, 22, needle(560, 360), '') +
    skyscraper(616, 56, 210, '#7f8fa6') +
    skyscraper(672, 70, 262, '#c3b49c') +
    diff(708, 243, 24, waterTank(708, 262), '') +
    skyscraper(742, 58, 220, '#8fa3bf') +
    // Harbor
    water(360, '#4f8fbf', rand, 16) +
    `<ellipse cx="130" cy="372" rx="110" ry="18" fill="#7cbf5a"/>` +
    liberty(130, 364) +
    diff(150, 92, 22, flame(130, 364), '') +
    diff(130, 152, 26, crown(130, 364, [-160, -135, -110, -90, -70, -45, -20]), crown(130, 364, [-160, -110, -90, -70, -20])) +
    ferryTop(430, 428) +
    diff(430, 417, 74, hull(430, 428, '#f28c28'), hull(430, 428, '#3a86ff')) +
    // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
    decor({ anim }, [
      ['buoy', 684, 432, '#e63946'],
      ['bottle', 164, 476],
      ['lifeRing', 304, 388],
      ['buoy', 540, 480, '#ffd23f'],
      ['birds', 224, 152],
      ['balloon', 660, 36, '#ffd23f'],
      ['birds', 352, 52],
    ]) +
    extras({ extra, anim }, [
      ['bottle', 64, 412],
      ['buoy', 596, 400, '#e63946'],
      ['bottle', 252, 472],
      ['cloud', 204, 300],
      ['birds', 632, 172],
    ]),
})
