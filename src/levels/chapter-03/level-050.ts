// Motion differences: the wasp buzzes faster on picture B; the bird hops only on B; the berry branch sways only on B.
import { svgLevel } from '../helpers.ts'
import { bear, bird, bush, cloud, floor, oak, pine, sun } from './shapes.ts'
import { person } from '../chapter-02/shapes.ts'

/** Berry bush; (x, y) = bottom center. Bounds: x ±26, y from −28 to 0. */
const berryBush = (x: number, y: number, berry: string) =>
  bush(x, y, 1, '#3f9a5a') + [[-14, -12], [-4, -20], [8, -10], [16, -18], [2, -6]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="3.5" fill="${berry}"/>`).join('')

/** Basket with `n` berry heaps; (x, y) = bottom center. Bounds: x ±22, y from −30 to 0. */
const basket = (x: number, y: number, n: number) =>
  [[-10, -24], [2, -27], [12, -23]].slice(0, n).map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="6" fill="#c0392b"/>`).join('') +
  `<path d="M${x - 22} ${y - 20}h44l-6 20h-32Z" fill="#c68b4e"/><path d="M${x - 18} ${y - 12}h36M${x - 16} ${y - 5}h32" stroke="#9c6a37" stroke-width="2"/>`

/** Jar; (x, y) = bottom center. Bounds: x ±8, y from −20 to 0. */
const jar = (x: number, y: number) =>
  `<rect x="${x - 7}" y="${y - 16}" width="14" height="16" rx="3" fill="#c0392b"/><rect x="${x - 8}" y="${y - 20}" width="16" height="5" rx="2" fill="#8d99ae"/>`

/** Wasp; (x, y) = body center. Bounds: x ±10, y from −9 to +6. */
const wasp = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cx="-3" cy="-6" rx="5" ry="3" fill="#fff" fill-opacity="0.85"/><ellipse cx="3" cy="-6" rx="5" ry="3" fill="#fff" fill-opacity="0.85"/>` +
  `<ellipse rx="8" ry="5" fill="#ffd23f"/><path d="M-3 -5v10M2 -5v10" stroke="#222" stroke-width="2"/><circle cx="8" cy="0" r="2" fill="#222"/></g>`

/** Berry branch from the pivot (x, y) hanging down-right. Bounds: x from −2 to +30, y from 0 to +24. */
const branch = (x: number, y: number) =>
  `<path d="M${x} ${y}q16 4 26 20" stroke="#6b4f3a" stroke-width="3" fill="none"/><circle cx="${x + 14}" cy="${y + 10}" r="4" fill="#c0392b"/><circle cx="${x + 22}" cy="${y + 18}" r="4" fill="#c0392b"/><circle cx="${x + 8}" cy="${y + 2}" r="3.5" fill="#c0392b"/>`

export default svgLevel({
  id: 50,
  chapter: 'forest',
  title: 'berries',
  parTimeSec: 120,
  scene: ({ diff, anim, rand }) => {
    const buzzing = (period: number) => anim({ id: 'wasp', type: 'path', points: [[0, 0], [30, -16], [60, 0], [30, 14]], period }, wasp(420, 350))
    const perched = bird(640, 236, '#ffb703')
    const twig = branch(560, 262)

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(680, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(250, 60, 0.8)) +
      `<path d="M0 270Q200 240 400 260T800 250V500H0Z" fill="#a9d3a0"/>` +
      pine(40, 280, 1.2, '#2f7d55') +
      pine(760, 275, 1.1, '#2f7d55') +
      oak(620, 260, 1.4, '#3f9a5a') +
      diff(640, 229, 18, perched, anim({ id: 'bird', type: 'bob', dx: 0, dy: 4, period: 0.8 }, perched), 'bird') +
      diff(574, 274, 24, twig, anim({ type: 'sway', angle: 8, pivot: [560, 262], period: 1.6 }, twig)) +
      `<rect y="320" width="800" height="180" fill="#8fca68"/>` +
      // Berry bushes
      diff(120, 417, 28, berryBush(120, 430, '#c0392b'), berryBush(120, 430, '#3a86ff')) +
      berryBush(220, 450, '#c0392b') +
      berryBush(700, 440, '#3a86ff') +
      bush(300, 400, 0.8, '#5fae4b') +
      diff(420, 350, 18, buzzing(4), buzzing(2), 'wasp') +
      // Picker
      diff(360, 450, 20, person(360, 485, '#ff6b8b'), person(360, 485, '#8ac926')) +
      diff(410, 470, 26, basket(410, 486, 3), basket(410, 486, 2)) +
      diff(470, 476, 18, jar(470, 486), '') +
      jar(488, 488) +
      diff(600, 446, 44, bear(600, 480), bear(600, 480, true)) +
      floor(rand, 330, 480, 12)
    )
  },
})
