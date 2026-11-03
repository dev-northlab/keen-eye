// Motion differences: the rover drives faster on picture B; the drone hovers faster on B; the dust devil sways only on B.
import { svgLevel } from '../helpers.ts'
import { astronaut, beacon, crater, crystal, fuelCanister, rock, rover, solarPanel, starField, toolbox } from './shapes.ts'

/** Drone; (x, y) = body center. Bounds: x ±22, y from −12 to +14. */
const drone = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-10 6l-4 8M10 6l4 8M-13 -6v-4M13 -6v-4" stroke="#5c677d" stroke-width="2"/><path d="M-22 -10h18M4 -10h18" stroke="#3d4a55" stroke-width="3"/>` +
  `<rect x="-14" y="-6" width="28" height="12" rx="4" fill="#d0d4de"/><circle cx="6" r="3" fill="#3d4a55"/></g>`

/** Dust devil; (x, y) = bottom. Bounds: x ±16, y from −60 to 0. */
const dustDevil = (x: number, y: number) =>
  `<path d="M${x - 16} ${y - 60}h32l-12 60h-8Z" fill="#f2c4a0" fill-opacity="0.6"/><path d="M${x - 12} ${y - 48}h22M${x - 8} ${y - 30}h16M${x - 4} ${y - 14}h8" stroke="#fff" stroke-opacity="0.5" stroke-width="2"/>`

export default svgLevel({
  id: 85,
  chapter: 'space',
  title: 'marsRover',
  parTimeSec: 140,
  scene: ({ diff, anim, rand }) => {
    const driving = (period: number) => anim({ id: 'rover', type: 'path', points: [[0, 0], [150, 0]], flipX: 400, period }, rover(400, 420, '#e6e6f0'))
    const hovering = (period: number) => anim({ id: 'drone', type: 'bob', dx: 0, dy: 10, period }, drone(250, 180))
    const devil = dustDevil(700, 360)

    return (
      `<rect width="800" height="500" fill="#f2b88a"/><rect width="800" height="150" fill="#c96b4e"/><rect y="150" width="800" height="70" fill="#dc8f69"/>` +
      starField(rand, 0, 110, 14) +
      `<circle cx="120" cy="70" r="14" fill="#e8d5c4"/>` +
      diff(200, 50, 18, `<circle cx="200" cy="50" r="8" fill="#e8d5c4"/>`, '') +
      `<circle cx="680" cy="80" r="26" fill="#fff8e1" fill-opacity="0.35"/>` +
      diff(680, 80, 18, `<circle cx="680" cy="80" r="16" fill="#fff8e1"/>`, `<circle cx="680" cy="80" r="16" fill="#bde3f2"/>`) +
      diff(250, 181, 26, hovering(4), hovering(1.8), 'drone') +
      // Mesas
      `<path d="M0 280V230h40l10 -20h90l14 30h40l10 40Z" fill="#b85c38"/><path d="M420 280l20 -50h90l20 50Z" fill="#b85c38"/>` +
      `<path d="M600 280V234h12v46ZM630 280V234h12v46Z" fill="#a24f30"/>` +
      diff(621, 231, 22, `<path d="M600 240q21 -24 42 0v-6q-21 -18 -42 0Z" fill="#a24f30"/>`, '') +
      `<rect y="280" width="800" height="220" fill="#d9774b"/><path d="M0 420q300 -30 560 10t240 -10V500H0Z" fill="#c4673f"/>` +
      crater(260, 320, 30, '#c4673f') +
      diff(600, 466, 31, crater(600, 466, 30, '#b85c38'), '') +
      rock(70, 340, 0.9, '#a5502c') +
      rock(520, 330, 0.7, '#a5502c') +
      diff(160, 456, 39, rock(160, 470, 1.4, '#a5502c'), rock(160, 470, 1.8, '#a5502c')) +
      rock(740, 480, 1.1, '#a5502c') +
      // Lander
      `<path d="M90 310l-20 20M130 310l20 20" stroke="#8d99ae" stroke-width="4"/><path d="M80 284h60l-8 -16h-44Z" fill="#d0d4de"/>` +
      `<rect x="80" y="284" width="60" height="28" fill="#ffd166"/><path d="M80 298h60" stroke="#e9b44c" stroke-width="2"/>` +
      diff(110, 252, 18, `<path d="M110 268v-26" stroke="#8d99ae" stroke-width="3"/><circle cx="110" cy="240" r="4" fill="#e63946"/>`, '') +
      diff(700, 330, 42, devil, anim({ type: 'sway', angle: 6, pivot: [700, 360], period: 2 }, devil)) +
      diff(300, 374, 31, astronaut(300, 400, '#f1f1f1', '#ffb703'), astronaut(300, 400, '#ffb703', '#ffb703')) +
      diff(400, 399, 37, driving(16), driving(8), 'rover') +
      crystal(460, 320) +
      toolbox(380, 330) +
      fuelCanister(175, 335) +
      beacon(590, 336) +
      solarPanel(760, 402)
    )
  },
})
