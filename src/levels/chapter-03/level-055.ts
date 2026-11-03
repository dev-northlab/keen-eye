// Motion differences: the dog runs faster on picture B; the kite flies faster on B; the frisbee spins the other way on B.
import { svgLevel } from '../helpers.ts'
import { anthill, backpack, bluebells, bush, cloud, feather, floor, oak, pine, sun, wildStrawberry } from './shapes.ts'
import { dog, person } from '../chapter-02/shapes.ts'
import { apple } from '../shapes.ts'

/** Kite with a tail; (x, y) = kite center. Bounds: x ±20, y from −24 to +44. */
const kite = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><path d="M0 -24L18 0L0 24L-18 0Z" fill="${color}"/><path d="M0 -24v48M-18 0h36" stroke="#fff" stroke-opacity="0.5" stroke-width="2"/>` +
  `<path d="M0 24q-8 10 0 20" stroke="#555" stroke-width="2" fill="none"/><path d="M-6 30l6 4l-6 4ZM-4 40l6 2l-6 4Z" fill="${color}"/></g>`

/** Frisbee pivoting on (x, y). Bounds: radius 14. */
const frisbee = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse rx="14" ry="6" fill="#ff006e"/><path d="M-10 -1h6M4 2h6" stroke="#fff" stroke-width="2"/></g>`

/** Bottle; (x, y) = bottom center. Bounds: x ±6, y from −24 to 0. */
const bottle = (x: number, y: number) =>
  `<rect x="${x - 6}" y="${y - 16}" width="12" height="16" rx="3" fill="#3a86ff"/><rect x="${x - 3}" y="${y - 24}" width="6" height="9" fill="#3a86ff"/><rect x="${x - 4}" y="${y - 26}" width="8" height="3" fill="#e63946"/>`

/** Ball; (x, y) = center. Bounds: radius 10. */
const ball = (x: number, y: number, color: string) => `<circle cx="${x}" cy="${y}" r="10" fill="${color}"/><path d="M${x - 10} ${y}a10 10 0 0 0 20 0" fill="#fff" fill-opacity="0.5"/>`

/** Watermelon slice; (x, y) = bottom center. Bounds: x ±14, y from −14 to 0. */
const melon = (x: number, y: number, flesh: string) =>
  `<path d="M${x - 14} ${y - 2}a14 14 0 0 1 28 0Z" fill="#4caf6a"/><path d="M${x - 10} ${y - 2}a10 10 0 0 1 20 0Z" fill="${flesh}"/><circle cx="${x - 3}" cy="${y - 6}" r="1.2" fill="#222"/><circle cx="${x + 4}" cy="${y - 5}" r="1.2" fill="#222"/>`

export default svgLevel({
  id: 55,
  chapter: 'forest',
  title: 'picnic',
  parTimeSec: 120,
  scene: ({ diff, anim, rand }) => {
    const running = (period: number) => anim({ id: 'dog', type: 'path', points: [[0, 0], [140, 0]], flipX: 540, period }, dog(540, 470, '#c48a5a'))
    const flying = (period: number) => anim({ id: 'kite', type: 'path', points: [[0, 0], [30, -16], [60, 0]], period }, kite(640, 110, '#3a86ff'))
    const spinning = (reverse: boolean) => anim({ type: 'rotate', pivot: [360, 180], period: 2, reverse }, frisbee(360, 180))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(120, 70) +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(400, 50, 0.8)) +
      diff(640, 120, 46, flying(8), flying(4), 'kite') +
      `<path d="M640 154L560 340" stroke="#777" stroke-width="1.5"/>` +
      `<path d="M0 270Q200 240 400 260T800 250V500H0Z" fill="#a9d3a0"/>` +
      pine(50, 280, 1.2, '#2f7d55') +
      oak(180, 270, 1.3) +
      pine(740, 270, 1.1, '#3b9467') +
      diff(360, 180, 18, spinning(false), spinning(true)) +
      `<rect y="320" width="800" height="180" fill="#8fca68"/>` +
      // Blanket
      `<path d="M200 470l40 -60h200l40 60Z" fill="#e63946"/><path d="M230 430h190M220 450h210M260 410v60M310 410v60M360 410v60M410 410v60" stroke="#fff" stroke-width="3" stroke-opacity="0.6"/>` +
      `<path d="M300 436h30l-4 12h-22Z" fill="#c68b4e"/>` +
      diff(290, 422, 20, apple(284, 424) + apple(298, 426), apple(284, 424)) +
      diff(350, 440, 18, melon(350, 446, '#ff6b8b'), melon(350, 446, '#ffd166')) +
      diff(400, 440, 20, bottle(400, 452), '') +
      bottle(414, 456) +
      diff(240, 456, 18, ball(240, 456, '#3a86ff'), ball(240, 456, '#8ac926')) +
      person(180, 480, '#ffb703') +
      diff(480, 445, 20, person(480, 480, '#8338ec', true), person(480, 480, '#2a9d8f', true)) +
      person(560, 340, '#e63946') +
      diff(540, 457, 30, running(8), running(4), 'dog') +
      bush(720, 440, 1.2) +
      bush(80, 460, 1, '#4caf6a') +
      floor(rand, 330, 400, 8) +
      wildStrawberry(130, 478) +
      backpack(512, 405) +
      bluebells(440, 354) +
      feather(230, 362) +
      anthill(770, 482)
    )
  },
})
