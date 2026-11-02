// Motion differences: the left astronaut drifts faster on picture B; the status light on the satellite blinks only on B.
import { svgLevel } from '../helpers.ts'
import { astronaut, sparkle, starField } from './shapes.ts'

/** Solar wing panel, 46 × 50, with `cols` columns; (x, y) = center. */
const wingPanel = (x: number, y: number, cols: number) => {
  let s = `<rect x="${x - 23}" y="${y - 25}" width="46" height="50" fill="#2b4c9e" stroke="#c9d1da" stroke-width="2"/><path d="M${x - 23} ${y - 8}h46M${x - 23} ${y + 8}h46" stroke="#8fa8d8" stroke-width="1.2"/>`
  for (let i = 1; i < cols; i++) s += `<path d="M${x - 23 + (46 * i) / cols} ${y - 25}v50" stroke="#8fa8d8" stroke-width="1.2"/>`
  return s
}

/** Dish on its mast, opening up-right; (x, y) = mast foot. Bounds: x from −20 to +24, y from −40 to 0. */
const dish = (x: number, y: number) =>
  `<path d="M${x} ${y}v-14" stroke="#bfc7d5" stroke-width="3"/><g transform="translate(${x} ${y - 22}) rotate(-30)"><path d="M-22 -6q22 26 44 0Z" fill="#e6e6f0"/><path d="M0 4v-18" stroke="#5c677d" stroke-width="2"/><circle cy="-15" r="2.5" fill="#e63946"/></g>`

const bolt = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="4" fill="#8d99ae"/><path d="M${x - 2} ${y}h4" stroke="#5c677d" stroke-width="1.5"/>`

/** Toolbox; (x, y) = center. Bounds: x ±20, y from −16 to +12. */
const toolbox = (x: number, y: number) =>
  `<rect x="${x - 20}" y="${y - 8}" width="40" height="20" rx="3" fill="#e63946"/><path d="M${x - 8} ${y - 8}v-6h16v6" stroke="#5c677d" stroke-width="3" fill="none"/><path d="M${x - 20} ${y}h40" stroke="#b5303a" stroke-width="2"/>`

const screwdriver = (x: number, y: number) => `<g transform="rotate(30 ${x} ${y})"><rect x="${x - 3}" y="${y - 14}" width="6" height="12" rx="2" fill="#ffb703"/><path d="M${x} ${y - 2}v14" stroke="#bfc7d5" stroke-width="2"/></g>`

const light = (x: number, y: number, r: number) => `<circle cx="${x}" cy="${y}" r="${r * 2}" fill="#ff4d4d" fill-opacity="0.25"/><circle cx="${x}" cy="${y}" r="${r}" fill="#ff4d4d"/>`
const status = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="8" fill="#7dff6a" fill-opacity="0.3"/><circle cx="${x}" cy="${y}" r="4" fill="#7dff6a"/>`

export default svgLevel({
  id: 147,
  chapter: 'space',
  title: 'satelliteRepair',
  parTimeSec: 105,
  hintLimit: 2,
  scene: ({ diff, anim, rand }) => {
    let foil = ''
    for (let i = 0; i < 14; i++) foil += `<path d="M${(364 + rand() * 110).toFixed(1)} ${(190 + rand() * 80).toFixed(1)}l${(6 + rand() * 10).toFixed(1)} ${(-4 + rand() * 8).toFixed(1)}" stroke="#b8862b" stroke-width="1.5"/>`
    const drifting = (period: number) => anim({ type: 'bob', dx: 3, dy: -4, period }, astronaut(300, 382, '#f1f1f1', '#ffb703'))

    return (
      `<rect width="800" height="500" fill="#090b1f"/>` + starField(rand, 0, 500, 80) + sparkle(600, 40, 6) + sparkle(120, 120, 5) +
      `<circle cx="0" cy="560" r="260" fill="#2f6fbf"/><path d="M0 330q80 10 120 80q30 60 -10 120H0Z" fill="#4caf6a"/><circle cx="0" cy="560" r="270" fill="none" stroke="#7cc4ff" stroke-opacity="0.35" stroke-width="10"/>` +
      // Shuttle
      `<path d="M640 100h70l24 -10l-24 -10h-70Z" fill="#e6e6f0"/><path d="M650 80l-14 -14h20ZM650 100l-14 14h20Z" fill="#5c677d"/><rect x="690" y="86" width="16" height="6" fill="#3a86ff"/>` +
      // Satellite wings
      `<path d="M150 230H360M480 230H690" stroke="#bfc7d5" stroke-width="4"/>` +
      wingPanel(174, 230, 3) + wingPanel(224, 230, 3) + wingPanel(274, 230, 3) + wingPanel(324, 230, 3) +
      wingPanel(516, 230, 3) + wingPanel(566, 230, 3) + wingPanel(616, 230, 3) + diff(666, 230, 28, wingPanel(666, 230, 3), wingPanel(666, 230, 4)) +
      `<rect x="146" y="226" width="6" height="8" fill="#8d99ae"/>` +
      diff(140, 230, 22, light(140, 230, 4), light(140, 230, 5.5)) +
      // Body
      `<rect x="360" y="185" width="120" height="90" rx="4" fill="#e0a83a"/>` + foil +
      diff(402, 244, 22, `<rect x="390" y="232" width="24" height="24" fill="#c9cfd8"/>`, `<rect x="390" y="232" width="24" height="24" fill="#d8d0c0"/>`) +
      bolt(470, 196) + bolt(370, 266) + diff(470, 266, 22, bolt(470, 266), '') +
      diff(458, 200, 22, status(458, 202), anim({ type: 'blink', duty: 0.5, period: 1.1 }, status(458, 202))) +
      diff(378, 160, 30, dish(380, 185), `<g transform="rotate(-24 380 185)">${dish(380, 185)}</g>`) +
      `<path d="M360 210l-20 -30M480 260l20 30" stroke="#bfc7d5" stroke-width="2"/>` +
      // Astronauts and tools
      `<path d="M360 270q-40 40 -54 70" stroke="#f4f4f4" stroke-width="1.5" stroke-dasharray="4 3" fill="none"/>` +
      diff(300, 356, 38, drifting(3), drifting(1.2)) +
      astronaut(560, 372, '#f1f1f1', '#3a86ff', true) +
      diff(560, 345, 22, `<rect x="556" y="342" width="8" height="6" rx="1" fill="#e63946"/>`, `<rect x="556" y="342" width="8" height="6" rx="1" fill="#d97a3a"/>`) +
      `<path d="M544 340l-10 -6" stroke="#ffb703" stroke-width="5" stroke-linecap="round"/>` +
      diff(202, 408, 30, toolbox(196, 412), toolbox(208, 406)) +
      diff(620, 440, 22, '', screwdriver(620, 440)) +
      `<g transform="rotate(-20 470 420)"><rect x="462" y="416" width="16" height="8" rx="2" fill="#bfc7d5"/></g>`
    )
  },
})
