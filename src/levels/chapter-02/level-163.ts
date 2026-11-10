// Container port: a harbour quay among the city's ten hardest (hidden until released, levels/upcoming.ts). New
// in the city: a gantry crane, a container ship with its bridge, funnel and lifeboat, a tugboat, a lighthouse on
// the breakwater, container stacks, a forklift, a pelican on a bollard, a dock worker and a container truck.
// Motion differences: the crane lowers its container only on picture A; the tug rocks and a gull glides only on B.
import { gull } from '../chapter-04/shapes.ts'
import { person } from './shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cloud } from '../shapes.ts'

/** Shipping container seen from the side; (x, y) = top left, w × 24. */
const box = (x: number, y: number, w: number, color: string) =>
  `<rect x="${x}" y="${y}" width="${w}" height="24" fill="${color}"/>` +
  Array.from({ length: Math.floor(w / 8) - 1 }, (_, i) => `<path d="M${x + 8 + i * 8} ${y + 3}v18" stroke="#000" stroke-opacity="0.15" stroke-width="2"/>`).join('')

/** Tugboat facing left, drawn at 3/4 size; (x, y) = waterline center. Bounds: x ±27, y from −30 to +6. */
const tugboat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y}) scale(0.75)"><path d="M-36 -10H36L28 8H-30Z" fill="#c0392b"/><rect x="-36" y="-12" width="72" height="4" fill="#2b2b2b"/>` +
  `<rect x="-8" y="-30" width="30" height="18" fill="#f4f1e8"/><rect x="-4" y="-26" width="8" height="6" fill="#bde3f2"/><rect x="8" y="-26" width="8" height="6" fill="#bde3f2"/>` +
  `<rect x="10" y="-40" width="8" height="10" fill="#2b2b2b"/><circle cx="-26" cy="-4" r="4" fill="#2b2b2b"/><circle cx="-14" cy="-4" r="4" fill="#2b2b2b"/></g>`

/** Pelican sitting, faces left; (x, y) = feet. Bounds: x from −22 to +14, y from −30 to 0. */
const pelican = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cx="2" cy="-10" rx="12" ry="9" fill="#f4f1e8"/><path d="M8 -12l6 4l-6 2Z" fill="#8d99ae"/>` +
  `<path d="M-2 -16Q-4 -26 -6 -26" stroke="#f4f1e8" stroke-width="5" fill="none"/><circle cx="-6" cy="-26" r="4.5" fill="#f4f1e8"/>` +
  `<path d="M-9 -27L-22 -20L-10 -22Z" fill="#ffb703"/><path d="M-10 -22Q-16 -14 -20 -19" fill="#f4a261"/><circle cx="-6" cy="-27" r="1" fill="#222"/></g>`

/** Forklift facing left without its forks; (x, y) = ground under its middle. Bounds: x from −30 to +32, y from −70 to 0. */
const forklift = (x: number, y: number) =>
  `<rect x="${x - 26}" y="${y - 70}" width="6" height="70" fill="#3d4a55"/>` +
  `<path d="M${x - 18} ${y - 30}V${y - 60}H${x + 10}L${x + 18} ${y - 30}" stroke="#3d4a55" stroke-width="3" fill="none"/>` +
  `<rect x="${x - 20}" y="${y - 32}" width="52" height="22" rx="4" fill="#ffb703"/><rect x="${x + 18}" y="${y - 40}" width="14" height="10" fill="#3d4a55"/>` +
  `<circle cx="${x - 6}" cy="${y - 7}" r="8" fill="#2b2b2b"/><circle cx="${x + 22}" cy="${y - 7}" r="7" fill="#2b2b2b"/><circle cx="${x}" cy="${y - 44}" r="5" fill="#f2d29b"/>`
const forks = (x: number, y: number) => `<rect x="${x - 46}" y="${y}" width="26" height="4" fill="#3d4a55"/>`

/** Hard hat for a person at (x, y). Bounds: x ±11, y from −68 to −56. */
const hardHat = (x: number, y: number, color: string) => `<path d="M${x - 10} ${y - 58}a10 9 0 0 1 20 0Z" fill="${color}"/><rect x="${x - 11}" y="${y - 59}" width="22" height="3" rx="1.5" fill="${color}"/>`

export default svgLevel({
  id: 163,
  chapter: 'city',
  title: 'containerPort',
  parTimeSec: 90,
  scene: ({ diff, anim, extra }) => {
    const lowering = anim({ id: 'load', type: 'path', points: [[0, 0], [0, 30]], period: 7 }, box(230, 170, 40, '#e63946'))
    const gliding = anim({ id: 'gull', type: 'path', points: [[0, 0], [100, 20]], period: 6 }, gull(430, 70))
    const rocking = anim({ type: 'bob', dx: 0, dy: 4, period: 2.2 }, tugboat(690, 318))
    return (
      `<rect width="800" height="500" fill="#cfe8f7"/>` +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 28 }, cloud(360, 120, 0.6)) +
      diff(430, 70, 24, gull(430, 70), gliding, 'gull') +
      `<rect y="250" width="800" height="140" fill="#3f88c5"/><path d="M0 280q20 -6 40 0t40 0M440 340q20 -6 40 0t40 0M600 290q20 -6 40 0t40 0" stroke="#7fb8e4" stroke-width="2" fill="none"/>` +
      // Breakwater and lighthouse
      `<path d="M680 336Q700 316 740 318T800 322V340H680Z" fill="#8d99ae"/>` +
      `<path d="M728 330L732 160H748L752 330Z" fill="#ffffff"/><path d="M729 290h22M730 250h20M731 210h18" stroke="#e63946" stroke-width="14"/>` +
      `<rect x="730" y="146" width="20" height="14" fill="#ffd166" stroke="#3d4a55" stroke-width="2"/>` +
      diff(740, 140, 22, `<path d="M726 146L740 132L754 146Z" fill="#e63946"/>`, `<path d="M726 146L740 132L754 146Z" fill="#2a9d8f"/>`) +
      // Container ship: deck boxes, bridge with funnel and lifeboat
      `<path d="M220 260H640L620 322H240Z" fill="#1d3557"/><rect x="236" y="308" width="390" height="12" fill="#c0392b"/>` +
      box(240, 236, 60, '#2a9d8f') + box(302, 236, 60, '#ffb703') + box(364, 236, 60, '#8338ec') + box(426, 236, 60, '#e63946') + box(488, 236, 60, '#3a86ff') +
      box(302, 212, 60, '#fb8500') + box(364, 212, 60, '#8ac926') + box(426, 212, 60, '#2a9d8f') +
      `<rect x="556" y="180" width="70" height="80" fill="#f4f1e8"/><rect x="562" y="188" width="58" height="10" fill="#3d4a55"/><rect x="562" y="208" width="58" height="6" fill="#bde3f2"/>` +
      `<rect x="588" y="146" width="24" height="34" fill="#2b2b2b"/>` +
      diff(600, 166, 22, `<rect x="588" y="160" width="24" height="9" fill="#e63946"/>`, `<rect x="588" y="160" width="24" height="9" fill="#ffd23f"/>`) +
      `<path d="M552 212v-8h-8M552 232v8h-8" stroke="#3d4a55" stroke-width="2" fill="none"/>` +
      diff(544, 222, 22, `<path d="M532 218h24l-4 10h-16Z" fill="#fb8500"/><path d="M536 218a8 4 0 0 1 16 0" fill="#fb8500"/>`, '') +
      diff(690, 306, 36, tugboat(690, 318), rocking) +
      // Quay with the gantry crane lowering a container
      `<rect y="330" width="300" height="170" fill="#b8b2a6"/><rect y="384" width="800" height="116" fill="#b8b2a6"/><path d="M300 330V384H800" stroke="#6c757d" stroke-width="4" fill="none"/>` +
      `<path d="M70 330V90M170 330V90M70 200H170M70 200L170 140" stroke="#ffb703" stroke-width="8"/>` +
      `<rect x="40" y="84" width="300" height="12" fill="#ffb703"/><rect x="56" y="58" width="74" height="26" fill="#f4d35e"/><rect x="64" y="64" width="20" height="10" fill="#bde3f2"/>` +
      `<rect x="238" y="96" width="24" height="10" fill="#3d4a55"/><path d="M250 106V200" stroke="#3d4a55" stroke-width="2"/>` +
      diff(250, 182, 30, lowering, box(230, 170, 40, '#e63946'), 'load') +
      // Container stacks
      box(20, 436, 50, '#2a9d8f') + box(72, 436, 50, '#e63946') + box(124, 436, 50, '#ffb703') + box(176, 436, 50, '#3a86ff') +
      box(20, 412, 50, '#8338ec') + box(124, 412, 50, '#2a9d8f') + box(176, 412, 50, '#fb8500') +
      diff(97, 424, 28, box(72, 412, 50, '#8ac926'), box(72, 412, 50, '#ff006e')) +
      box(20, 388, 50, '#ffb703') + box(124, 388, 50, '#e63946') +
      diff(201, 400, 28, box(176, 388, 50, '#3a86ff'), '') +
      // Forklift, the pelican on its bollard, the dock worker, the container truck
      forklift(360, 476) + diff(332, 452, 22, forks(360, 462), forks(360, 440)) +
      `<path d="M460 384h20v-10h-20Z" fill="#3d4a55"/><ellipse cx="470" cy="374" rx="12" ry="4" fill="#3d4a55"/>` +
      diff(470, 356, 26, pelican(474, 372), '') +
      person(560, 488, '#fb8500', false, '#c68b5e', '#2b2b2b') + diff(560, 424, 22, hardHat(560, 488, '#ffd23f'), hardHat(560, 488, '#ffffff')) +
      `<rect x="604" y="434" width="130" height="34" fill="#2a9d8f"/>` + Array.from({ length: 15 }, (_, i) => `<path d="M${612 + i * 8} 437v28" stroke="#000" stroke-opacity="0.15" stroke-width="2"/>`).join('') +
      `<rect x="600" y="468" width="190" height="6" fill="#3d4a55"/><path d="M740 468V430H772L790 450V468Z" fill="#3a86ff"/><path d="M746 434H770L782 450H746Z" fill="#bde3f2"/>` +
      `<circle cx="630" cy="478" r="9" fill="#2b2b2b"/><circle cx="700" cy="478" r="9" fill="#2b2b2b"/><circle cx="768" cy="478" r="9" fill="#2b2b2b"/>` +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['lifeRing', 496, 476],
        ['buoy', 30, 306],
        ['crab', 410, 478],
        ['cone', 268, 486],
        ['gull', 660, 60],
      ])
    )
  },
})
