// Motion differences: the beacon on the main module blinks only on picture B; the floating wrench spins faster on B.
import { svgLevel } from '../helpers.ts'
import { asteroid, astronaut, fuelCanister, helmet, probe, sparkle, starField, toolbox } from './shapes.ts'

/** Solar panel, 40 × 30, with `cols` columns of cells; (x, y) = center. */
const panel = (x: number, y: number, cols: number) => {
  let s = `<rect x="${x - 20}" y="${y - 15}" width="40" height="30" fill="#2b4c9e" stroke="#c9d1da" stroke-width="2"/><path d="M${x - 20} ${y}h40" stroke="#8fa8d8" stroke-width="1.2"/>`
  for (let i = 1; i < cols; i++) s += `<path d="M${x - 20 + (40 * i) / cols} ${y - 15}v30" stroke="#8fa8d8" stroke-width="1.2"/>`
  return s
}

/** Truss lattice from x0 to x1 centered on y. */
const truss = (x0: number, x1: number, y: number) => {
  let d = `M${x0} ${y - 6}H${x1}M${x0} ${y + 6}H${x1}`
  for (let x = x0; x < x1; x += 12) d += `M${x} ${y - 6}L${x + 6} ${y + 6}L${x + 12} ${y - 6}`
  return `<path d="${d}" stroke="#bfc7d5" stroke-width="2" fill="none"/>`
}

const window = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="6" fill="#ffd98a" stroke="#8d99ae" stroke-width="2"/>`

/** Robotic arm wrist and gripper hanging from the elbow (x, y). Bounds: x ±10, y from 0 to +40. */
const wrist = (x: number, y: number) =>
  `<path d="M${x} ${y}v30" stroke="#e6e6f0" stroke-width="7" stroke-linecap="round"/><path d="M${x - 8} ${y + 40}l8 -10l8 10" stroke="#8d99ae" stroke-width="3" fill="none"/>`

/** Wrench; (x, y) = center. Bounds: radius 16. */
const wrench = (x: number, y: number) =>
  `<g transform="translate(${x} ${y}) rotate(35)"><rect x="-2.5" y="-10" width="5" height="22" rx="2" fill="#bfc7d5"/><path d="M-7 -16a7 7 0 1 1 14 0l-3 4h-8Z" fill="#bfc7d5"/><path d="M-2 -20h4v6h-4Z" fill="#0b1026"/></g>`

const bolt = (x: number, y: number) => `<g transform="translate(${x} ${y}) rotate(-20)"><rect x="-2" y="-8" width="4" height="14" fill="#9aa5b1"/><rect x="-5" y="-11" width="10" height="5" rx="1" fill="#bfc7d5"/></g>`

const beacon = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="8" fill="#ff4d4d" fill-opacity="0.3"/><circle cx="${x}" cy="${y}" r="4" fill="#ff4d4d"/>`

export default svgLevel({
  id: 141,
  chapter: 'space',
  title: 'orbitalStation',
  parTimeSec: 135,
  scene: ({ diff, anim, rand }) => {
    let clouds = ''
    for (let i = 0; i < 9; i++) clouds += `<ellipse cx="${(160 + rand() * 480).toFixed(1)}" cy="${(436 + rand() * 54).toFixed(1)}" rx="${(30 + rand() * 40).toFixed(1)}" ry="8" fill="#ffffff" fill-opacity="0.75"/>`
    const panels = (x: number, skip = -1) => [0, 1].map((r) => [0, 1].map((c) => (r * 2 + c === skip ? '' : panel(x + c * 44, r === 0 ? 150 : 250, 3))).join('')).join('')
    const spin = (period: number) => anim({ type: 'rotate', pivot: [250, 300], period }, wrench(250, 300))

    return (
      `<rect width="800" height="500" fill="#0b1026"/>` + starField(rand, 0, 380, 60) + sparkle(120, 60, 6) + sparkle(560, 40, 5) +
      `<circle cx="700" cy="80" r="24" fill="#d9d4c7"/><circle cx="692" cy="74" r="5" fill="#bfb9aa"/><circle cx="708" cy="90" r="4" fill="#bfb9aa"/>` +
      // Earth below
      `<circle cx="400" cy="1110" r="720" fill="#7cc4ff" fill-opacity="0.25"/><circle cx="400" cy="1110" r="704" fill="#2f6fbf"/>` +
      `<path d="M120 440q60 -30 140 -10q40 20 20 50H90ZM470 420q80 -20 160 10q20 30 -30 50H480Z" fill="#4caf6a"/>` + clouds +
      // Station: truss, modules and panels
      truss(120, 690, 200) +
      `<rect x="128" y="160" width="4" height="80" fill="#bfc7d5"/><rect x="216" y="160" width="4" height="80" fill="#bfc7d5"/>` +
      panels(130) + panels(560, 1) +
      diff(604, 150, 26, panel(604, 150, 3), panel(604, 150, 4)) +
      `<rect x="320" y="168" width="160" height="64" rx="30" fill="#e6e6f0"/><path d="M340 168v64M460 168v64" stroke="#bfc7d5" stroke-width="3"/>` +
      `<rect x="380" y="232" width="40" height="40" fill="#d0d4de"/><rect x="384" y="128" width="32" height="40" fill="#d0d4de"/>` +
      window(356, 200) + window(384, 200) + diff(412, 200, 22, window(412, 200), '') + window(440, 200) +
      `<path d="M470 168v-8" stroke="#bfc7d5" stroke-width="2"/>` +
      diff(470, 154, 22, beacon(470, 154), anim({ type: 'blink', duty: 0.5, period: 1 }, beacon(470, 154))) +
      diff(360, 150, 22, '', `<path d="M360 168V138M352 146h16M354 140h12" stroke="#bfc7d5" stroke-width="2"/>`) +
      // Docked capsule
      `<rect x="88" y="188" width="34" height="24" rx="4" fill="#d0d4de"/>` +
      diff(80, 200, 22, `<path d="M88 188l-18 12l18 12Z" fill="#e63946"/>`, `<path d="M88 188l-18 12l18 12Z" fill="#d9603a"/>`) +
      `<circle cx="690" cy="200" r="7" fill="#d0d4de"/>` +
      diff(700, 200, 22, `<circle cx="700" cy="200" r="4" fill="#7dff6a"/>`, `<circle cx="700" cy="200" r="6" fill="#7dff6a"/>`) +
      // Robotic arm
      `<path d="M440 232L500 270" stroke="#e6e6f0" stroke-width="8" stroke-linecap="round"/><circle cx="500" cy="270" r="6" fill="#8d99ae"/>` +
      diff(504, 292, 30, wrist(500, 270), `<g transform="rotate(-30 500 270)">${wrist(500, 270)}</g>`) +
      // Spacewalk
      `<path d="M480 232q60 40 110 70" stroke="#f4f4f4" stroke-width="1.5" fill="none" stroke-dasharray="4 3"/>` +
      astronaut(600, 340, '#f1f1f1', '#ffb703') + diff(603, 298, 22, `<ellipse cx="603" cy="298" rx="6" ry="5" fill="#ffb703"/>`, `<ellipse cx="603" cy="298" rx="6" ry="5" fill="#f2903a"/>`) +
      diff(250, 300, 24, spin(6), spin(2)) +
      diff(182, 380, 22, bolt(176, 380), bolt(188, 376)) +
      probe(340, 330) +
      fuelCanister(690, 320) +
      helmet(80, 310) +
      asteroid(260, 90, 0.5) +
      toolbox(410, 335)
    )
  },
})
