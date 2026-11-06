// Rope park: a tree-top adventure park among the forest's ten hardest (hidden until released, levels/upcoming.ts).
// New in the forest: platforms round big trunks, a rope bridge with a child in a helmet, a zip line with its
// rider, a hanging tyre, a ladder, climbing holds on a trunk, a tree hut, a nest, an instructor, a safety sign and
// a backpack on a hook. Motion differences: the zip line rider slides only on picture A; the tyre swings and the
// woodpecker pecks only on B.
import { person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bird, fern, pine } from './shapes.ts'

/** Height of the zip line at x, from the top of the middle trunk (440, 150) down to (790, 300). */
const zipY = (x: number) => 150 + (150 / 350) * (x - 440)

/** Zip line rider hanging from the wire at x. Bounds: x ±14, y from −4 to +56 under the wire. */
const rider = (x: number) => {
  const y = zipY(x)
  return `<circle cx="${x}" cy="${y}" r="4" fill="#3d4a55"/><path d="M${x} ${y}V${y + 14}" stroke="#3d4a55" stroke-width="2"/>` +
    `<g transform="translate(${x} ${y + 56}) scale(0.7)">${person(0, 0, '#ff006e', false, '#f2d29b', '#5a3d2b')}<path d="M-9 -60a9 8 0 0 1 18 0Z" fill="#ffd23f"/></g>`
}

/** Tyre hanging on a short rope from (x, y). Bounds: x ±16, y from 0 to +62. */
const tyre = (x: number, y: number) => `<path d="M${x} ${y}V${y + 34}" stroke="#a0703f" stroke-width="3"/><circle cx="${x}" cy="${y + 46}" r="14" fill="none" stroke="#2b2b2b" stroke-width="8"/>`

/** Woodpecker on a trunk, faces left; (x, y) = feet. Bounds: x from −12 to +8, y from −22 to +4. */
const woodpecker = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M4 0l4 6" stroke="#2b2b2b" stroke-width="3"/><ellipse cy="-8" rx="6" ry="10" fill="#2b2b2b"/><ellipse cx="-1" cy="-6" rx="3" ry="6" fill="#f4f1e8"/>` +
  `<circle cx="-2" cy="-18" r="5" fill="#2b2b2b"/><path d="M-1 -23a4 4 0 0 1 5 2l-4 1Z" fill="#e63946"/><path d="M-6 -18l-6 1l6 2Z" fill="#8d99ae"/></g>`

/** Platform round a trunk; (x, y) = trunk center at deck height, deck w wide. */
const platform = (x: number, y: number, w: number) =>
  `<rect x="${x - w / 2}" y="${y}" width="${w}" height="10" fill="#a0703f"/><path d="M${x - w / 2} ${y}V${y - 24}H${x + w / 2}V${y}" stroke="#7a5230" stroke-width="3" fill="none"/>` +
  `<path d="M${x - w / 2 + 8} ${y + 10}L${x - 20} ${y + 40}M${x + w / 2 - 8} ${y + 10}L${x + 20} ${y + 40}" stroke="#7a5230" stroke-width="4"/>`

/** Rope bridge planks from x0 to x1, sagging between deck heights y0 and y1; the plank at `skip` left out. */
const bridge = (x0: number, y0: number, x1: number, y1: number, skip: number) => {
  let s = `<path d="M${x0} ${y0 - 30}Q${(x0 + x1) / 2} ${(y0 + y1) / 2 - 14} ${x1} ${y1 - 30}" stroke="#a0703f" stroke-width="2.5" fill="none"/>`
  for (let x = x0 + 10, i = 0; x < x1 - 4; x += 20, i++) {
    const t = (x - x0) / (x1 - x0)
    const y = y0 + (y1 - y0) * t + Math.sin(Math.PI * t) * 16
    if (i !== skip) s += `<rect x="${x - 7}" y="${y.toFixed(1)}" width="14" height="5" fill="#c68b4e"/>`
    s += `<path d="M${x} ${y.toFixed(1)}V${(y - 28 + Math.sin(Math.PI * t) * 2).toFixed(1)}" stroke="#a0703f" stroke-width="1"/>`
  }
  return s
}

export default svgLevel({
  id: 176,
  chapter: 'forest',
  title: 'ropePark',
  parTimeSec: 102,
  scene: ({ diff, anim, extra }) => {
    const sliding = anim({ id: 'zip', type: 'path', points: [[0, 0], [100, (150 / 350) * 100]], period: 4 }, rider(500))
    let forest = ''
    for (let x = -10; x < 820; x += 44) forest += pine(x, 352, 0.75, x % 3 ? '#4f8f60' : '#3f7d55')
    return (
      `<rect width="800" height="500" fill="#d6ecf5"/>` + forest +
      `<rect y="350" width="800" height="150" fill="#8a9a5b"/><path d="M180 500Q300 420 420 410T700 380" stroke="#c9b48e" stroke-width="30" fill="none"/>` +
      // Trunks, platforms, the tree hut with its roof, the nest
      `<rect x="96" y="40" width="48" height="320" fill="#6b4a2b"/><rect x="376" y="20" width="48" height="340" fill="#6b4a2b"/><rect x="656" y="40" width="48" height="320" fill="#6b4a2b"/>` +
      `<path d="M680 90L750 70" stroke="#6b4a2b" stroke-width="6"/>` +
      diff(742, 70, 22, `<path d="M728 70q14 12 28 0Z" fill="#8a6a4a"/><circle cx="736" cy="66" r="4" fill="#3d3d3d"/><circle cx="746" cy="65" r="4" fill="#3d3d3d"/>`, '') +
      platform(120, 200, 110) + platform(400, 220, 100) + platform(680, 180, 110) +
      `<rect x="646" y="140" width="68" height="40" fill="#c68b4e"/><rect x="668" y="150" width="20" height="30" fill="#5e3b1a"/>` +
      diff(680, 130, 38, `<path d="M646 142L680 116L714 142Z" fill="#3a86ff"/>`, `<path d="M646 142L680 116L714 142Z" fill="#e63946"/>`) +
      // Rope bridge with the child and the missing plank
      bridge(175, 200, 350, 220, 6) +
      diff(305, 228, 22, `<rect x="298" y="226.4" width="14" height="5" fill="#c68b4e"/>`, '') +
      `<g transform="translate(250 212) scale(0.8)">${person(0, 0, '#8ac926', false, '#c68b5e', '#2b2b2b')}</g>` +
      diff(250, 166, 22, `<path d="M243 170a7 7 0 0 1 14 0Z" fill="#ffd23f"/>`, `<path d="M243 170a7 7 0 0 1 14 0Z" fill="#e63946"/>`) +
      // Zip line and its rider, the woodpecker
      `<path d="M440 150L790 300" stroke="#3d4a55" stroke-width="2"/>` +
      diff(500, 202, 32, sliding, rider(500), 'zip') +
      diff(372, 108, 22, woodpecker(372, 116), anim({ type: 'bob', dx: -3, dy: 0, period: 0.4 }, woodpecker(372, 116))) +
      // Hanging tyre, climbing holds, ladder, backpack
      diff(80, 242, 38, tyre(80, 210), anim({ type: 'sway', angle: 14, pivot: [80, 210], period: 1.8 }, tyre(80, 210))) +
      [[104, 268, '#e63946'], [130, 290, '#ffd23f'], [108, 330, '#8ac926'], [134, 340, '#3a86ff']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="5" fill="${c}"/>`).join('') +
      diff(116, 306, 22, `<circle cx="116" cy="306" r="5" fill="#8338ec"/>`, `<circle cx="116" cy="306" r="5" fill="#fb8500"/>`) +
      `<path d="M444 230V350M462 230V350" stroke="#a0703f" stroke-width="4"/>` +
      [246, 262, 278, 310, 326, 342].map((y) => `<path d="M444 ${y}H462" stroke="#a0703f" stroke-width="3"/>`).join('') +
      diff(453, 294, 22, `<path d="M444 294H462" stroke="#a0703f" stroke-width="3"/>`, '') +
      `<path d="M144 362h10" stroke="#3d4a55" stroke-width="3"/>` +
      diff(158, 378, 22, `<rect x="148" y="364" width="18" height="24" rx="5" fill="#2a9d8f"/><path d="M152 364v-4h10v4" stroke="#1f6f66" stroke-width="2" fill="none"/>`, '') +
      // Safety sign, instructor, ferns
      `<path d="M300 440V414" stroke="#6b4a2b" stroke-width="4"/><rect x="282" y="388" width="36" height="30" rx="3" fill="#f4f1e8" stroke="#3d4a55" stroke-width="2"/>` +
      diff(300, 403, 22, `<path d="M300 394l8 14h-16Z" fill="#ffd23f" stroke="#2b2b2b" stroke-width="1.5"/>`, `<path d="M300 394l8 14h-16Z" fill="#8ac926" stroke="#2b2b2b" stroke-width="1.5"/>`) +
      person(560, 470, '#e63946', true, '#e0b48a', '#5a3d2b') +
      diff(560, 410, 22, `<path d="M551 414a9 8 0 0 1 18 0Z" fill="#2a9d8f"/><rect x="544" y="412" width="10" height="3" rx="1.5" fill="#2a9d8f"/>`, `<path d="M551 414a9 8 0 0 1 18 0Z" fill="#ffd23f"/><rect x="544" y="412" width="10" height="3" rx="1.5" fill="#ffd23f"/>`) +
      person(620, 474, '#3a86ff', false, '#f2d29b', '#c0392b') + bird(706, 176, '#e63946') +
      fern(40, 496) + fern(760, 494) + fern(220, 492) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['squirrel', 400, 214],
        ['pineCone', 370, 480],
        ['mushroom', 470, 486],
        ['acorn', 700, 460],
        ['leafPile', 90, 476],
      ])
    )
  },
})
