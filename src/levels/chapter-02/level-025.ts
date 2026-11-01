// Motion differences: the crane's hook swings only on picture B; the mixer drum turns faster on B.
import { svgLevel } from '../helpers.ts'
import { cloud, cone, person, pigeon, skyline, sun } from './shapes.ts'

/** Worker with a hard hat; (x, y) = feet. The hat is separate. Bounds: x ±13, y from −62 to 0. */
const worker = (x: number, y: number, vest = '#fb8500', flip = false) => person(x, y, vest, flip)
/** Hard hat on the worker at (x, y) = feet. Bounds: x ±10, y from −66 to −54. */
const helmet = (x: number, y: number, color: string) =>
  `<path d="M${x - 10} ${y - 56}q10 -14 20 0Z" fill="${color}"/><rect x="${x - 11}" y="${y - 57}" width="22" height="3" fill="${color}"/>`

/** Cement mixer; (x, y) = ground center. The drum is separate. Bounds: x ±30, y from −36 to 0. */
const mixerBase = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-26 -8h52v8h-52Z" fill="#3d4a55"/><circle cx="-18" cy="-2" r="8" fill="#2b2b2b"/><circle cx="18" cy="-2" r="8" fill="#2b2b2b"/>` +
  `<path d="M-10 -8l6 -28M10 -8l-6 -28" stroke="#3d4a55" stroke-width="4"/></g>`
/** Mixer drum pivoting on (x, y). Bounds: radius 22. */
const drum = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><circle r="20" fill="#ffb703"/><path d="M-20 0h40M0 -20v40" stroke="#e08a00" stroke-width="4"/><circle r="6" fill="#e08a00"/></g>`

/** Barrel; (x, y) = bottom center. Bounds: x ±12, y from −30 to 0. */
const barrel = (x: number, y: number, color: string) =>
  `<rect x="${x - 12}" y="${y - 30}" width="24" height="30" rx="4" fill="${color}"/><path d="M${x - 12} ${y - 21}h24M${x - 12} ${y - 9}h24" stroke="#2b2b2b" stroke-opacity="0.3" stroke-width="3"/>`

/** Pile of bricks, `rows` high; (x, y) = bottom center. Bounds: x ±34, y from −10·rows to 0. */
const bricks = (x: number, y: number, rows: number) => {
  let out = ''
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < 4 - r; c++) out += `<rect x="${x - 32 + r * 8 + c * 16}" y="${y - 10 * (r + 1)}" width="15" height="9" fill="#c0392b"/>`
  return out
}

/** Dump truck, faces left; (x, y) = ground center. The cab is separate. Bounds: x ±50, y from −40 to 0. */
const truck = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-44" y="-30" width="18" height="12" fill="#bde3f2"/>` +
  `<path d="M-16 -40h64l-6 30h-58Z" fill="#8d99ae"/><rect x="-50" y="-12" width="100" height="8" fill="#3d4a55"/>` +
  `<circle cx="-30" cy="-2" r="9" fill="#2b2b2b"/><circle cx="26" cy="-2" r="9" fill="#2b2b2b"/></g>`
/** Truck cab, drawn under the windscreen. Bounds: x from −48 to −18, y from −34 to −10 around (x, y). */
const cab = (x: number, y: number, color: string) => `<path d="M${x - 48} ${y - 34}h30v24h-30Z" fill="${color}"/>`

/** Crane hook on its cable from (x, y) = jib point. Bounds: x ±10, y from 0 to +60. */
const hook = (x: number, y: number) =>
  `<path d="M${x} ${y}v44" stroke="#3d4a55" stroke-width="2"/><rect x="${x - 6}" y="${y + 42}" width="12" height="8" fill="#3d4a55"/>` +
  `<path d="M${x} ${y + 50}q-8 4 -4 10q6 4 8 -2" stroke="#3d4a55" stroke-width="4" fill="none" stroke-linecap="round"/>`

export default svgLevel({
  id: 25,
  chapter: 'city',
  title: 'construction',
  parTimeSec: 110,
  scene: ({ diff, anim, rand }) => {
    const hanging = hook(620, 130)
    const turning = (period: number) => anim({ type: 'rotate', pivot: [470, 414], period }, drum(470, 414))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(100, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(330, 60, 0.7)) +
      skyline(rand, 230, '#c5cfdd') +
      // Crane
      `<rect x="686" y="110" width="12" height="330" fill="#ffb703"/>` +
      `<path d="M686 130l12 20l-12 20l12 20l-12 20l12 20l-12 20l12 20l-12 20l12 20l-12 20l12 20l-12 20l12 20" stroke="#e08a00" stroke-width="3" fill="none"/>` +
      `<rect x="560" y="110" width="220" height="12" fill="#ffb703"/><path d="M560 122l12 -12l12 12l12 -12l12 12l12 -12l12 12l12 -12l12 12l12 -12l12 12l12 -12l12 12l12 -12l12 12l12 -12l12 12l12 -12" stroke="#e08a00" stroke-width="3" fill="none"/>` +
      `<rect x="680" y="96" width="30" height="16" rx="3" fill="#3d4a55"/><rect x="740" y="118" width="40" height="22" fill="#8d99ae"/>` +
      diff(620, 160, 34, hanging, anim({ type: 'sway', angle: 10, pivot: [620, 130], period: 2.2 }, hanging)) +
      pigeon(600, 110) +
      // Unfinished building
      `<rect x="120" y="200" width="320" height="240" fill="#d9d2c5"/>` +
      `<path d="M120 260h320M120 320h320M120 380h320M200 200v240M280 200v240M360 200v240" stroke="#b8ad9c" stroke-width="6"/>` +
      `<rect x="130" y="270" width="60" height="44" fill="#bde3f2"/><rect x="210" y="270" width="60" height="44" fill="#bde3f2"/>` +
      diff(320, 292, 38, `<rect x="290" y="270" width="60" height="44" fill="#bde3f2"/>`, '') +
      `<rect x="100" y="196" width="360" height="8" fill="#fb8500"/>` +
      // Fence and ground
      `<rect y="440" width="800" height="60" fill="#c9b79c"/>` +
      `<rect y="436" width="800" height="6" fill="#a89985"/>` +
      diff(40, 424, 38, bricks(40, 440, 3), bricks(40, 440, 2)) +
      barrel(560, 440, '#e63946') +
      barrel(590, 440, '#3a86ff') +
      mixerBase(470, 440) +
      diff(470, 414, 24, turning(6), turning(2.5)) +
      worker(200, 480, '#fb8500') +
      diff(200, 420, 18, helmet(200, 480, '#ffb703'), helmet(200, 480, '#e63946')) +
      worker(320, 480, '#ffb703', true) +
      helmet(320, 480, '#ffb703') +
      diff(587, 470, 21, cab(620, 492, '#e63946'), cab(620, 492, '#8ac926')) +
      truck(620, 492) +
      cone(400, 492) +
      diff(430, 478, 18, cone(430, 490), '') +
      cone(760, 486)
    )
  },
})
