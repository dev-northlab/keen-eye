// The Great Wall: the wall winds over green ridges between two watchtowers; a child flies a kite.
// Motion difference: the kite wobbles quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { cloud, lantern, person, sky, sun } from './shapes.ts'

/** Ridge under the wall, left to right. */
const RIDGE: [number, number][] = [[0, 340], [120, 300], [250, 250], [360, 290], [470, 300], [600, 215], [700, 240], [800, 230]]

/** Height of the ridge at x. */
function ridgeY(x: number) {
  for (let i = 1; i < RIDGE.length; i++) {
    const [x0, y0] = RIDGE[i - 1]
    const [x1, y1] = RIDGE[i]
    if (x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0)
  }
  return RIDGE[RIDGE.length - 1][1]
}

/** Battlement tooth on the wall top at x. Bounds: x ±4, y from −32 to −23 under the ridge. */
const tooth = (x: number) => `<rect x="${x - 4}" y="${(ridgeY(x) - 32).toFixed(1)}" width="8" height="9" fill="#c9b48a"/>`

/** The wall along the ridge, its teeth every 14 units except at `skip`. */
function wall(skip: number) {
  const top = RIDGE.map(([x, y]) => `${x} ${y - 24}`).join('L')
  const bottom = [...RIDGE].reverse().map(([x, y]) => `${x} ${y + 8}`).join('L')
  let teeth = ''
  for (let x = 7; x < 800; x += 14) if (x !== skip) teeth += tooth(x)
  return `<path d="M${top}L${bottom}Z" fill="#c9b48a"/><path d="M${RIDGE.map(([x, y]) => `${x} ${y - 4}`).join('L')}" fill="none" stroke="#a8956c" stroke-width="3"/>${teeth}`
}

/** Watchtower standing on the ridge at x; windows at the given offsets. Bounds: x ±32, y from −78 to +8 of the ridge. */
function tower(x: number, windows: number[]) {
  const y = ridgeY(x)
  let s = `<rect x="${x - 30}" y="${y - 70}" width="60" height="78" fill="#d8c59c"/><rect x="${x - 32}" y="${y - 72}" width="64" height="6" fill="#b8a379"/>`
  for (let tx = x - 30; tx < x + 30; tx += 12) s += `<rect x="${tx}" y="${y - 78}" width="7" height="7" fill="#d8c59c"/>`
  for (const dx of windows) s += towerWindow(x + dx, y)
  return s + `<path d="M${x - 9} ${y + 8}V${y - 8}a9 9 0 0 1 18 0V${y + 8}Z" fill="#5c4a35"/>`
}
const towerWindow = (x: number, y: number) => `<path d="M${x - 5} ${y - 34}V${y - 46}a5 5 0 0 1 10 0V${y - 34}Z" fill="#5c4a35"/>`

/** Pine tree; (x, y) = foot. Bounds: x ±18, y from −62 to 0. */
const pine = (x: number, y: number) =>
  `<rect x="${x - 3}" y="${y - 12}" width="6" height="12" fill="#6b4a3a"/>` +
  `<path d="M${x - 18} ${y - 10}L${x} ${y - 40}L${x + 18} ${y - 10}ZM${x - 14} ${y - 28}L${x} ${y - 62}L${x + 14} ${y - 28}Z" fill="#2f6b45"/>`

/** Kite with its tail; (x, y) = the bridle point it wobbles around. Bounds: x ±24, y from −32 to +46. */
const kite = (x: number, y: number) =>
  `<path d="M${x} ${y - 32}L${x + 22} ${y - 4}L${x} ${y + 24}L${x - 22} ${y - 4}Z" fill="#e63946"/>` +
  `<path d="M${x} ${y - 32}V${y + 24}M${x - 22} ${y - 4}H${x + 22}" stroke="#ffd23f" stroke-width="2.4"/>` +
  `<path d="M${x} ${y + 24}q8 6 0 12t0 10" fill="none" stroke="#3d4a55" stroke-width="1.6"/>` +
  [[-4, 32], [4, 40]].map(([dx, dy]) => `<path d="M${x + dx - 5} ${y + dy - 3}l10 6v-6l-10 6Z" fill="#ffd23f"/>`).join('')

/** Sun hat on a `person` standing at (x, y). Bounds: x ±14, y from −70 to −58. */
const hat = (x: number, y: number, color: string) =>
  `<ellipse cx="${x}" cy="${y - 60}" rx="14" ry="3" fill="${color}"/><path d="M${x - 8} ${y - 60}q0 -10 8 -10t8 10Z" fill="${color}"/>`

/** Magpie sitting on a battlement tooth at x, faces left. Bounds: x from −12 to +24, y from −16 to 0 of the tooth top. */
const magpie = (x: number) => {
  const y = ridgeY(x) - 32
  return (
    `<path d="M${x + 6} ${y - 6}l18 4l-2 4l-16 -2Z" fill="#1d2a3a"/><ellipse cx="${x}" cy="${y - 6}" rx="9" ry="6" fill="#1d2a3a"/>` +
    `<ellipse cx="${x + 2}" cy="${y - 5}" rx="5" ry="3" fill="#ffffff"/><circle cx="${x - 7}" cy="${y - 11}" r="5" fill="#1d2a3a"/>` +
    `<path d="M${x - 11} ${y - 11}l-4 1l4 2Z" fill="#3d4a55"/><circle cx="${x - 8}" cy="${y - 12}" r="1" fill="#ffffff"/>`
  )
}

/** Peach tree in the meadow; (x, y) = foot. Its blossoms are `peachBlossoms`. Bounds: x ±32, y from −70 to 0. */
const peachTree = (x: number, y: number) =>
  `<path d="M${x} ${y}V${y - 30}M${x} ${y - 24}l-14 -14M${x} ${y - 30}l12 -12" stroke="#6b4a3a" stroke-width="6" stroke-linecap="round"/>` +
  `<circle cx="${x - 16}" cy="${y - 40}" r="16" fill="#5aa84a"/><circle cx="${x + 16}" cy="${y - 42}" r="16" fill="#5aa84a"/><circle cx="${x}" cy="${y - 52}" r="18" fill="#66b956"/>`
/** Pink blossoms on a `peachTree` at (x, y). Bounds: circle of radius 22 around (x, y − 46). */
const peachBlossoms = (x: number, y: number) =>
  [[-16, -46], [-4, -62], [10, -54], [18, -40], [0, -40], [-12, -32]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="4" fill="#ff9ec4"/><circle cx="${x + dx}" cy="${y + dy}" r="1.4" fill="#fff3b0"/>`).join('')

export default travelLevel({
  id: 406,
  title: 'greatWall',
  parTimeSec: 89,
  place: { region: 'asia', country: 'cn', lat: 40.43, lon: 116.57 },
  scene: ({ diff, anim, extra }) => {
    const wobble = (period: number) => anim({ id: 'kite', type: 'sway', angle: 12, pivot: [730, 100], period }, kite(730, 100))
    return (
      sky('#a9d6ef') +
      sun(90, 80) +
      anim({ type: 'path', points: [[0, 0], [70, 0]], period: 46 }, cloud(420, 80, 0.6)) +
      `<path d="M0 260L80 200L160 240L260 170L360 230L460 180L560 220L660 160L760 210L800 190V500H0Z" fill="#b7d3c4"/>` +
      `<path d="M${RIDGE.map(([x, y]) => `${x} ${y + 4}`).join('L')}V500H0Z" fill="#7fb36a"/>` +
      wall(161) +
      diff(161, 256, 22, tooth(161), '') +
      diff(335, 238, 22, magpie(329), '') +
      tower(250, [-16, 16]) +
      diff(250, 211, 22, '', towerWindow(250, ridgeY(250))) +
      tower(600, [-16, 16]) +
      `<path d="M630 150h8" stroke="#5c4a35" stroke-width="3"/>` +
      diff(636, 166, 22, lantern(636, 150), lantern(636, 150, '#ffd23f')) +
      person(430, 285, '#2a9d8f') +
      diff(430, 222, 22, hat(430, 285, '#ffd23f'), hat(430, 285, '#e63946')) +
      person(470, 288, '#f28fb1', true, '#f2d29b', '#1d1d1d') +
      peachTree(140, 470) +
      diff(140, 424, 24, peachBlossoms(140, 470), '') +
      // Near hill with pines and the child flying the kite
      `<path d="M380 500Q600 360 800 390V500Z" fill="#4f8f4a"/>` +
      pine(480, 470) +
      diff(560, 403, 38, pine(560, 434), '') +
      pine(640, 420) +
      pine(780, 408) +
      `<path d="M730 100L724 404" stroke="#3d4a55" stroke-width="1.2"/>` +
      person(716, 440, '#ffb703', true) +
      diff(730, 110, 52, wobble(1.6), wobble(3.4), 'kite') +
      // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
      decor({ anim }, [
        ['flower', 220, 420, '#ffd23f'],
        ['flower', 596, 328, '#ff6b8b'],
        ['butterfly', 424, 460, '#ffd23f'],
        ['stones', 732, 476],
        ['grass', 72, 488],
        ['birds', 372, 148],
        ['cloud', 600, 56],
      ]) +
      extras({ extra, anim }, [
        ['ladybug', 364, 320],
        ['flower', 88, 364, '#b38cff'],
        ['snail', 252, 288],
        ['birds', 184, 60],
        ['cloud', 524, 164],
      ])
    )
  },
})
