// Motion differences: the dragonfly darts faster on picture B; the floating log drifts faster on B; the reeds sway only on B.
import { svgLevel } from '../helpers.ts'
import { acorn, anthill, bluebells, bush, cloud, floor, log, oak, pine, pineCone, rock, sun } from './shapes.ts'
import { duck, snail } from '../shapes.ts'

/** Beaver, faces right; (x, y) = feet. Bounds: x ±26, y from −26 to 0. */
const beaver = (x: number, y: number, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><path d="M-26 -4q-4 -10 6 -10l4 8Z" fill="#4a3426"/>` +
  `<ellipse cx="-2" cy="-12" rx="16" ry="12" fill="#6b4f3a"/><circle cx="12" cy="-18" r="8" fill="#6b4f3a"/>` +
  `<circle cx="8" cy="-26" r="3" fill="#6b4f3a"/><circle cx="16" cy="-26" r="3" fill="#6b4f3a"/>` +
  `<circle cx="16" cy="-19" r="1.5" fill="#222"/><rect x="16" y="-14" width="5" height="5" fill="#fff"/><path d="M-10 -2v2M2 -2v2" stroke="#4a3426" stroke-width="4"/></g>`

/** Dragonfly; (x, y) = body center. Bounds: x ±12, y ±6. */
const dragonfly = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cx="-4" cy="-3" rx="8" ry="3" fill="#bde3f2" fill-opacity="0.8"/><ellipse cx="4" cy="-3" rx="8" ry="3" fill="#bde3f2" fill-opacity="0.8"/>` +
  `<rect x="-2" y="-2" width="14" height="3" rx="1.5" fill="#3a86ff"/><circle cx="-4" cy="-1" r="3" fill="#3a86ff"/></g>`

/** Water lily; (x, y) = center. Bounds: x ±14, y from −10 to +6. */
const lily = (x: number, y: number, color: string) =>
  `<ellipse cx="${x}" cy="${y}" rx="14" ry="6" fill="#4caf6a"/><path d="M${x} ${y - 2}l-6 -6l3 -2l3 4l3 -4l3 2Z" fill="${color}"/><path d="M${x - 2} ${y - 8}h4l-2 6Z" fill="${color}"/>`

/** Heron standing, faces right; (x, y) = feet. Bounds: x ±16, y from −60 to 0. */
const heron = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-2 0v-24M4 0v-24" stroke="#555" stroke-width="2"/><ellipse cy="-30" rx="14" ry="8" fill="#8d99ae"/>` +
  `<path d="M6 -34q10 -6 8 -22" stroke="#8d99ae" stroke-width="5" fill="none"/><circle cx="14" cy="-56" r="5" fill="#8d99ae"/><path d="M18 -56l12 2l-12 2Z" fill="#f4a261"/></g>`

/** Reeds; (x, y) = base. Bounds: x ±12, y from −44 to 0. */
const reeds = (x: number, y: number) =>
  `<path d="M${x - 8} ${y}v-36M${x} ${y}v-44M${x + 8} ${y}v-34" stroke="#4c8a3c" stroke-width="3"/><rect x="${x - 10}" y="${y - 40}" width="5" height="12" rx="2.5" fill="#6b4f3a"/><rect x="${x + 6}" y="${y - 38}" width="5" height="12" rx="2.5" fill="#6b4f3a"/>`

/** Leaping fish; (x, y) = center. Bounds: x ±14, y ±10. */
const fish = (x: number, y: number) =>
  `<g transform="translate(${x} ${y}) rotate(-30)"><ellipse rx="10" ry="5" fill="#ff9f43"/><path d="M-8 0l-7 -5v10Z" fill="#ff9f43"/><circle cx="6" cy="-1" r="1.2" fill="#222"/></g>`

/** Dam of logs across the river at x; `extra` adds a top log. Bounds of the top log: x ±18, y from −60 to −48. */
const topLog = (x: number, y: number) => `<rect x="${x - 18}" y="${y - 60}" width="36" height="10" rx="5" fill="#8a5a3b"/>`

export default svgLevel({
  id: 43,
  chapter: 'forest',
  title: 'beavers',
  parTimeSec: 120,
  scene: ({ diff, anim, rand }) => {
    let ripples = ''
    for (let i = 0; i < 10; i++) ripples += `<path d="M${rand() * 760} ${350 + rand() * 120}h${20 + rand() * 30}" stroke="#a5dcf3" stroke-width="3" stroke-linecap="round"/>`
    const darting = (period: number) => anim({ id: 'dragonfly', type: 'path', points: [[0, 0], [50, -14], [90, 6]], period }, dragonfly(300, 300))
    const drifting = (period: number) => anim({ id: 'log', type: 'path', points: [[0, 0], [-160, 0]], period }, log(600, 440))
    const stand = reeds(720, 410)

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(680, 70) +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(200, 60, 0.8)) +
      `<path d="M0 250Q200 220 400 240T800 230V340H0Z" fill="#a9d3a0"/>` +
      pine(80, 250, 1, '#7fb88a') +
      pine(720, 240, 1.1, '#7fb88a') +
      oak(400, 250, 1.1) +
      `<rect y="320" width="800" height="40" fill="#8fca68"/>` +
      bush(640, 322, 1.1) +
      diff(300, 300, 20, darting(5), darting(2.5), 'dragonfly') +
      diff(146, 290, 40, heron(140, 320), '') +
      // River
      `<rect y="340" width="800" height="160" fill="#4fa9d8"/><rect y="350" width="800" height="150" fill="#63b8e3"/>` +
      anim({ type: 'bob', dx: 10, dy: 0, period: 4 }, ripples) +
      // Dam
      `<path d="M330 330l40 -8l40 8l40 -8l40 8v50h-160Z" fill="#8a5a3b"/><path d="M340 340h140M336 356h148M340 372h140" stroke="#5a3d2b" stroke-width="4"/>` +
      `<rect x="360" y="312" width="40" height="10" rx="5" fill="#8a5a3b"/>` +
      diff(440, 316, 20, topLog(440, 370), '') +
      diff(250, 357, 28, beaver(250, 370), beaver(250, 370, true)) +
      beaver(560, 384, true) +
      diff(600, 433, 34, drifting(14), drifting(7), 'log') +
      diff(120, 448, 18, lily(120, 450, '#ff6b8b'), lily(120, 450, '#ffd166')) +
      lily(200, 470, '#ff6b8b') +
      duck(660, 470) +
      diff(330, 440, 18, '', fish(330, 440)) +
      diff(720, 388, 26, stand, anim({ type: 'sway', angle: 6, pivot: [720, 410], period: 1.8 }, stand)) +
      rock(60, 480, 1.2) +
      floor(rand, 300, 336, 8) +
      acorn(262, 338) +
      pineCone(505, 338) +
      bluebells(45, 338) +
      anthill(735, 340) +
      snail(590, 340)
    )
  },
})
