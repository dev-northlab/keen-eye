// Toronto: the CN Tower over the skyline and the domed stadium, Lake Ontario with a yacht and a canoe,
// a red maple, a Canada goose, the flag on the shore and a red streetcar.
// Motion difference: the flag on the shore waves quickly on picture A and slowly on picture B.
import { decor, extras } from '../extras.ts'
import { travelLevel } from '../helpers.ts'
import { level427Redesign } from './level-427-redesign.ts'
import { cloud, gull, sky, sun, water } from './shapes.ts'

/** CN Tower; (x, y) = foot. The window band of the main pod and the antenna tip are separate. Bounds: x ±26, y from −300 to 0. */
const cnTower = (x: number, y: number) =>
  `<path d="M${x - 14} ${y}L${x - 5} ${y - 150}H${x + 5}L${x + 14} ${y}Z" fill="#c9ced6"/><path d="M${x} ${y}V${y - 150}" stroke="#a9b0b8" stroke-width="2"/>` +
  `<path d="M${x - 26} ${y - 152}Q${x} ${y - 140} ${x + 26} ${y - 152}V${y - 176}Q${x} ${y - 184} ${x - 26} ${y - 176}Z" fill="#b8bfc8"/>` +
  `<rect x="${x - 4}" y="${y - 214}" width="8" height="40" fill="#c9ced6"/><rect x="${x - 9}" y="${y - 224}" width="18" height="12" rx="4" fill="#b8bfc8"/>` +
  `<rect x="${x - 2}" y="${y - 262}" width="4" height="40" fill="#d6dde3"/>`
/** Window band of the main pod. Bounds: x ±24, y from −170 to −160. */
const podBand = (x: number, y: number, color: string) => `<path d="M${x - 24} ${y - 162}Q${x} ${y - 156} ${x + 24} ${y - 162}V${y - 168}Q${x} ${y - 174} ${x - 24} ${y - 168}Z" fill="${color}"/>`
/** Antenna tip. Bounds: x ±2, y from −300 to −262. */
const antennaTip = (x: number, y: number) => `<rect x="${x - 1.5}" y="${y - 300}" width="3" height="38" fill="#d6dde3"/><circle cx="${x}" cy="${y - 300}" r="2.5" fill="#e63946"/>`

/** Glass skyscraper from x to x + w, roof at `top`, ground at 330. */
function tower(x: number, w: number, top: number, color: string) {
  let s = `<rect x="${x}" y="${top}" width="${w}" height="${330 - top}" fill="${color}"/>`
  for (let y = top + 10; y < 324; y += 14) s += `<path d="M${x + 4} ${y}H${x + w - 4}" stroke="#ffffff" stroke-opacity="0.35" stroke-width="2"/>`
  return s
}

/** Domed stadium; (x, y) = middle of its base. Panel 2 of the roof is separate. */
const stadium = (x: number, y: number) =>
  `<rect x="${x - 60}" y="${y - 20}" width="120" height="20" fill="#d6dde3"/>` +
  [0, 1, 3].map((i) => panel(x, y, i, '#f4f6f8')).join('') +
  `<path d="M${x - 60} ${y - 20}A60 40 0 0 1 ${x + 60} ${y - 20}" fill="none" stroke="#a9b0b8" stroke-width="2"/>`
/** Roof panel i (0..3, left to right) of the stadium dome. Bounds: a quarter of the dome. */
const panel = (x: number, y: number, i: number, color: string) => {
  const at = (k: number) => {
    const a = Math.PI + (k * Math.PI) / 4
    return `${(x + 60 * Math.cos(a)).toFixed(1)} ${(y - 20 + 40 * Math.sin(a)).toFixed(1)}`
  }
  return `<path d="M${x} ${y - 20}L${at(i)}A60 40 0 0 1 ${at(i + 1)}Z" fill="${color}" stroke="#c9ced6" stroke-width="1.4"/>`
}

/** Yacht; (x, y) = waterline middle. The sail is separate. */
const yacht = (x: number, y: number) =>
  `<path d="M${x - 28} ${y - 8}H${x + 30}L${x + 22} ${y + 4}H${x - 20}Z" fill="#ffffff"/><path d="M${x} ${y - 8}V${y - 62}" stroke="#3d4a55" stroke-width="2"/>`
const sail = (x: number, y: number, color: string) => `<path d="M${x + 2} ${y - 60}L${x + 26} ${y - 12}H${x + 2}Z" fill="${color}"/>`

/** Canoe with a paddler; (x, y) = waterline middle. Bounds: x ±34, y from −30 to +4. */
const canoe = (x: number, y: number, color: string) =>
  `<path d="M${x - 34} ${y - 10}Q${x} ${y + 8} ${x + 34} ${y - 10}Q${x} ${y - 2} ${x - 34} ${y - 10}Z" fill="${color}"/>` +
  `<rect x="${x - 4}" y="${y - 22}" width="8" height="12" rx="3" fill="#2a9d8f"/><circle cx="${x}" cy="${y - 26}" r="4" fill="#f2d29b"/><path d="M${x - 14} ${y + 2}L${x + 12} ${y - 22}" stroke="#7a5233" stroke-width="2"/>`

/** Canadian flag on the pole top at (x, y). Bounds: x from 0 to +32, y from 0 to +16. */
const flag = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect width="32" height="16" fill="#ffffff"/><rect width="8" height="16" fill="#d52b1e"/><rect x="24" width="8" height="16" fill="#d52b1e"/>` +
  `<path d="M16 3L17.5 6L20 5L19 9L21 9L16 13L11 9L13 9L12 5L14.5 6Z" fill="#d52b1e"/></g>`

/** Maple tree; (x, y) = foot. One cluster of leaves is separate. */
const maple = (x: number, y: number) =>
  `<rect x="${x - 7}" y="${y - 70}" width="14" height="70" fill="#6b4a3a"/>` +
  [[-30, -90, 34], [24, -96, 34], [0, -124, 40]].map(([dx, dy, r]) => `<circle cx="${x + dx}" cy="${y + dy}" r="${r}" fill="#d9442b"/>`).join('')
const leaves = (x: number, y: number, color: string) => `<circle cx="${x}" cy="${y}" r="14" fill="${color}"/><circle cx="${x + 10}" cy="${y + 6}" r="9" fill="${color}"/>`

/** Canada goose facing left; (x, y) = feet. Bounds: x from −22 to +18, y from −36 to 0. */
const goose = (x: number, y: number) =>
  `<path d="M${x - 2} ${y}V${y - 8}M${x + 4} ${y}V${y - 8}" stroke="#2b2b2b" stroke-width="2"/><ellipse cx="${x + 4}" cy="${y - 14}" rx="14" ry="8" fill="#8a7a66"/><ellipse cx="${x + 4}" cy="${y - 11}" rx="9" ry="4" fill="#e8e0d0"/>` +
  `<path d="M${x - 6} ${y - 16}Q${x - 12} ${y - 28} ${x - 12} ${y - 32}" fill="none" stroke="#1d1d1d" stroke-width="4"/><circle cx="${x - 13}" cy="${y - 33}" r="4" fill="#1d1d1d"/>` +
  `<path d="M${x - 15} ${y - 31}h4" stroke="#ffffff" stroke-width="2"/><path d="M${x - 17} ${y - 34}l-5 2l5 1Z" fill="#1d1d1d"/>`

/** Red streetcar facing left; (x, y) = rails under the middle. The destination sign is separate. Bounds: x ±100, y from −80 to 0. */
function streetcar(x: number, y: number) {
  let windows = ''
  for (let i = 0; i < 7; i++) windows += `<rect x="${x - 88 + i * 26}" y="${y - 52}" width="20" height="20" rx="3" fill="#bde3f2"/>`
  return (
    `<path d="M${x} ${y - 62}L${x + 20} ${y - 82}" stroke="#3d4a55" stroke-width="2"/>` +
    `<rect x="${x - 100}" y="${y - 62}" width="200" height="54" rx="10" fill="#d52b1e"/><rect x="${x - 100}" y="${y - 24}" width="200" height="6" fill="#ffffff"/>${windows}` +
    [-60, 60].map((dx) => `<circle cx="${x + dx}" cy="${y - 6}" r="7" fill="#2b2b2b"/>`).join('')
  )
}
const sign = (x: number, y: number, color: string) => `<rect x="${x - 96}" y="${y - 60}" width="26" height="7" rx="2" fill="${color}"/>`

export default travelLevel({
  id: 427,
  redesign: level427Redesign,
  title: 'toronto',
  parTimeSec: 128,
  place: { region: 'americas', country: 'ca', lat: 43.65, lon: -79.38 },
  scene: ({ diff, anim, rand, extra }) => {
    const wave = (period: number) => anim({ id: 'flag', type: 'sway', angle: 8, pivot: [470, 392], period }, flag(470, 392))
    return (
      sky('#9fd3ee') +
      sun(90, 70) +
      anim({ type: 'path', points: [[0, 0], [-60, 0]], period: 46 }, cloud(700, 70, 0.55)) +
      gull(560, 120) +
      // Skyline with the CN Tower and the stadium
      tower(120, 50, 220, '#8fa3bf') +
      tower(176, 44, 250, '#b7cde0') +
      tower(226, 48, 206, '#6f8aa8') +
      `<path d="M250 206V192" stroke="#5c677d" stroke-width="2"/>` +
      diff(250, 190, 18, `<circle cx="250" cy="190" r="4.5" fill="#e63946"/>`, '') +
      tower(280, 60, 236, '#a9b6c6') +
      tower(600, 54, 230, '#7f9ab5') +
      tower(660, 44, 260, '#c3d3e2') +
      tower(710, 60, 214, '#8fa3bf') +
      cnTower(400, 330) +
      diff(400, 49, 22, antennaTip(400, 330), '') +
      diff(400, 165, 26, podBand(400, 330, '#3d4a55'), podBand(400, 330, '#ffd23f')) +
      stadium(520, 330) +
      diff(541, 290, 32, panel(520, 330, 2, '#f4f6f8'), panel(520, 330, 2, '#7ad3f2')) +
      // Lake Ontario
      water(330, '#3a8fbf', rand, 12) +
      yacht(240, 410) +
      diff(254, 374, 30, sail(240, 410, '#ffffff'), sail(240, 410, '#e63946')) +
      diff(650, 391, 40, canoe(650, 404, '#d52b1e'), canoe(650, 404, '#ffd23f')) +
      // Shore with the maple, the goose, the flag and the streetcar
      `<path d="M0 440Q300 426 800 436V500H0Z" fill="#7cbf5a"/>` +
      maple(90, 470) +
      diff(66, 368, 24, leaves(64, 368, '#d9442b'), leaves(64, 368, '#5fae4b')) +
      diff(298, 466, 28, goose(300, 484), '') +
      `<path d="M470 470V388" stroke="#3d4a55" stroke-width="3"/>` +
      diff(486, 400, 22, wave(1), wave(2.4), 'flag') +
      streetcar(680, 496) +
      diff(597, 440, 20, sign(680, 496, '#ffd23f'), sign(680, 496, '#ffffff')) +
      // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
      decor({ anim }, [
        ['bird', 180, 464, '#8a5a33'],
        ['flower', 420, 484, '#ffd23f'],
        ['flower', 532, 484, '#ff6b8b'],
        ['lifeRing', 732, 356],
        ['buoy', 332, 372, '#ffd23f'],
        ['cloud', 540, 68],
        ['birds', 160, 156],
      ]) +
      extras({ extra, anim }, [
        ['butterfly', 124, 476, '#ffd23f'],
        ['bottle', 180, 356],
        ['buoy', 428, 368, '#e63946'],
        ['balloon', 712, 160, '#ffd23f'],
        ['birds', 308, 52],
      ])
    )
  },
})
