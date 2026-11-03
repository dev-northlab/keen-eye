// Motion differences: the telescope scans only on picture B; the meteor flashes only on B; the fireflies blink faster on B.
import { svgLevel } from '../helpers.ts'
import { beacon, comet, moonPebbles, person, solarPanel, starField, toolbox, wrench } from './shapes.ts'

/** Pine silhouette; (x, y) = base. Bounds: x ±22·s, y from −90·s to 0. */
const pine = (x: number, y: number, s = 1) =>
  `<path d="M${x} ${y - 90 * s}l${22 * s} ${70 * s}h${-14 * s}v${20 * s}h${-16 * s}v${-20 * s}h${-14 * s}Z" fill="#14281e"/>`

/** Tent; (x, y) = bottom center. Bounds: x ±40, y from −50 to 0. */
const tent = (x: number, y: number, color: string) =>
  `<path d="M${x - 40} ${y}L${x} ${y - 50}L${x + 40} ${y}Z" fill="${color}"/><path d="M${x - 10} ${y}L${x} ${y - 30}L${x + 10} ${y}Z" fill="#1d2433"/>`

/** Fireflies around (x, y). Bounds: radius 16. */
const fireflies = (x: number, y: number) =>
  `<g fill="#f4ff8a"><circle cx="${x - 10}" cy="${y - 6}" r="2.5"/><circle cx="${x + 8}" cy="${y - 10}" r="2.5"/><circle cx="${x + 2}" cy="${y + 8}" r="2.5"/><circle cx="${x - 12}" cy="${y + 10}" r="2"/></g>`

const telescope = `<g transform="rotate(-30 560 240)"><rect x="553" y="176" width="14" height="64" rx="3" fill="#5c677d"/><rect x="551" y="176" width="18" height="8" rx="2" fill="#3d4a55"/></g>`
const meteor = `<path d="M270 202L322 232" stroke="#fff" stroke-opacity="0.7" stroke-width="3" stroke-linecap="round"/><circle cx="324" cy="233" r="4" fill="#fff"/>`

export default svgLevel({
  id: 88,
  chapter: 'space',
  title: 'observatory',
  parTimeSec: 140,
  scene: ({ diff, anim, rand }) => {
    const blinking = (period: number) => anim({ type: 'blink', duty: 0.6, period }, fireflies(120, 440))

    return (
      `<rect width="800" height="500" fill="#10183a"/><rect y="220" width="800" height="100" fill="#1c2a5c"/>` +
      `<ellipse cx="400" cy="130" rx="380" ry="40" fill="#bde3f2" fill-opacity="0.08" transform="rotate(-12 400 130)"/>` +
      starField(rand, 0, 300, 70) +
      // Constellation
      `<path d="M120 120L160 96L210 110L250 100L300 70" stroke="#bde3f2" stroke-opacity="0.4" stroke-width="1.5" fill="none"/>` +
      `<g fill="#fff"><circle cx="120" cy="120" r="3.5"/><circle cx="160" cy="96" r="3.5"/><circle cx="210" cy="110" r="3.5"/><circle cx="250" cy="100" r="3.5"/></g>` +
      diff(300, 70, 18, `<circle cx="300" cy="70" r="4" fill="#fff"/>`, '') +
      `<circle cx="680" cy="80" r="34" fill="#f4f1de"/>` +
      diff(680, 80, 50, `<circle cx="696" cy="70" r="30" fill="#10183a"/>`, '') +
      diff(451, 139, 44, comet(420, 150), comet(420, 150, '#ffd6a5')) +
      diff(296, 218, 36, meteor, anim({ type: 'blink', duty: 0.3, period: 2.5 }, meteor)) +
      // Hill
      `<path d="M0 360Q200 260 420 300T800 330V500H0Z" fill="#1f3b2d"/><path d="M0 440q300 -40 600 -10t200 0V500H0Z" fill="#2a4d3a"/>` +
      pine(40, 380) +
      pine(80, 390, 0.8) +
      pine(760, 360, 1.1) +
      // Observatory
      `<rect x="500" y="250" width="120" height="80" fill="#d0d4de"/><path d="M500 250a60 60 0 0 1 120 0Z" fill="#e6e6f0"/><rect x="552" y="190" width="16" height="60" fill="#1d2433"/>` +
      diff(543, 210, 50, telescope, anim({ type: 'sway', angle: 10, pivot: [560, 240], period: 5 }, telescope)) +
      diff(527, 291, 18, `<rect x="520" y="282" width="14" height="18" fill="#ffd166"/>`, `<rect x="520" y="282" width="14" height="18" fill="#3d4a55"/>`) +
      diff(591, 315, 18, `<rect x="582" y="300" width="18" height="30" fill="#5a3d2b"/>`, `<rect x="582" y="300" width="18" height="30" fill="#3a86ff"/>`) +
      // Campers
      diff(380, 385, 48, tent(380, 410, '#e76f51'), tent(380, 410, '#8ac926')) +
      `<path d="M250 400l10 -30M270 400l-10 -30M260 400v-30" stroke="#8d99ae" stroke-width="2"/><rect x="246" y="358" width="30" height="10" rx="3" fill="#bfc7d5" transform="rotate(-25 260 364)"/>` +
      diff(220, 365, 20, person(220, 400, '#e63946'), person(220, 400, '#ffb703')) +
      diff(120, 440, 20, blinking(1.6), blinking(0.7)) +
      toolbox(300, 402) +
      solarPanel(470, 334) +
      moonPebbles(560, 442) +
      beacon(690, 332) +
      wrench(170, 440)
    )
  },
})
