// Motion differences: the mill wheel turns faster on picture B; the lantern swings only on B; the dragonfly flies the other way round on B.
import { svgLevel } from '../helpers.ts'
import { acorn, anthill, backpack, bluebells, cloud, floor, frog, oak, pine, pineCone, sun } from './shapes.ts'
import { person } from '../chapter-02/shapes.ts'
import { duck } from '../shapes.ts'

/** Mill wheel pivoting on (x, y). Bounds: radius 38. */
const wheel = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><circle r="36" fill="none" stroke="#8a5a3b" stroke-width="6"/><circle r="22" fill="none" stroke="#8a5a3b" stroke-width="4"/>` +
  `<path d="M-36 0h72M0 -36v72M-25 -25l50 50M-25 25l50 -50" stroke="#8a5a3b" stroke-width="4"/><circle r="5" fill="#5a3d2b"/></g>`

/** Lantern hanging from (x, y). Bounds: x ±8, y from 0 to +28. */
const lantern = (x: number, y: number) =>
  `<path d="M${x} ${y}v6" stroke="#333" stroke-width="2"/><rect x="${x - 7}" y="${y + 6}" width="14" height="18" rx="3" fill="#ffd166" stroke="#333" stroke-width="2"/><rect x="${x - 4}" y="${y + 24}" width="8" height="4" fill="#333"/>`

/** Dragonfly, faces right; (x, y) = body center. Bounds: x ±12, y ±6. */
const dragonfly = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cx="-4" cy="-3" rx="8" ry="3" fill="#bde3f2" fill-opacity="0.8"/><ellipse cx="4" cy="-3" rx="8" ry="3" fill="#bde3f2" fill-opacity="0.8"/>` +
  `<rect x="-2" y="-2" width="14" height="3" rx="1.5" fill="#3a86ff"/><circle cx="-4" cy="-1" r="3" fill="#3a86ff"/></g>`

/** Stepping stone; (x, y) = center. Bounds: x ±14, y ±7. */
const stone = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="14" ry="7" fill="#8d99ae"/><ellipse cx="${x - 3}" cy="${y - 2}" rx="7" ry="3" fill="#a3aebf"/>`

/** Post cap; (x, y) = post top center. Bounds: x ±8, y from −10 to 0. */
const cap = (x: number, y: number, color: string) => `<path d="M${x - 8} ${y}l8 -10l8 10Z" fill="${color}"/>`

export default svgLevel({
  id: 54,
  chapter: 'forest',
  title: 'creekBridge',
  parTimeSec: 120,
  scene: ({ diff, anim, rand }) => {
    let ripples = ''
    for (let i = 0; i < 10; i++) ripples += `<path d="M${rand() * 760} ${400 + rand() * 80}h${20 + rand() * 30}" stroke="#a5dcf3" stroke-width="3" stroke-linecap="round"/>`
    const turning = (period: number) => anim({ type: 'rotate', pivot: [660, 330], period }, wheel(660, 330))
    const hanging = lantern(300, 262)
    const flying = (reverse: boolean) =>
      anim({ id: 'dragonfly', type: 'path', points: [[0, 0], [90, -10]], flipX: 120, period: 6, reverse }, dragonfly(120, 300))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(120, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(450, 60, 0.8)) +
      `<path d="M0 270Q200 240 400 260T800 250V500H0Z" fill="#a9d3a0"/>` +
      pine(60, 280, 1.2, '#2f7d55') +
      pine(140, 270, 0.9, '#3b9467') +
      oak(500, 270, 1.1) +
      // Mill
      `<rect x="700" y="220" width="100" height="160" fill="#a0703f"/><path d="M690 224h120l-60 -44Z" fill="#5a3d2b"/><rect x="740" y="330" width="30" height="50" fill="#5a3d2b"/>` +
      diff(660, 330, 40, turning(8), turning(3.5)) +
      diff(120, 300, 20, flying(false), flying(true), 'dragonfly') +
      `<rect y="340" width="800" height="160" fill="#8fca68"/>` +
      // Creek
      `<path d="M0 380q200 -20 400 10t400 -20v130H0Z" fill="#63b8e3"/>` +
      anim({ type: 'bob', dx: 10, dy: 0, period: 4 }, ripples) +
      stone(60, 430) +
      stone(100, 450) +
      diff(140, 466, 18, stone(140, 466), '') +
      // Bridge
      `<rect x="220" y="360" width="200" height="14" rx="4" fill="#a0703f"/><path d="M220 374q100 40 200 0v10q-100 40 -200 0Z" fill="#8a5a3b"/>` +
      `<rect x="226" y="300" width="8" height="60" fill="#8a5a3b"/><rect x="406" y="300" width="8" height="60" fill="#8a5a3b"/>` +
      diff(324, 344, 28, `<rect x="226" y="326" width="188" height="5" fill="#8a5a3b"/>`, `<rect x="226" y="326" width="80" height="5" fill="#8a5a3b"/><rect x="340" y="326" width="74" height="5" fill="#8a5a3b"/>`) +
      diff(410, 295, 18, cap(410, 300, '#e63946'), cap(410, 300, '#3a86ff')) +
      cap(230, 300, '#e63946') +
      `<path d="M300 262h-66" stroke="#3d4a55" stroke-width="3"/>` +
      diff(300, 276, 20, hanging, anim({ type: 'sway', angle: 14, pivot: [300, 262], period: 1.4 }, hanging)) +
      diff(380, 325, 20, person(380, 360, '#ffb703'), person(380, 360, '#8338ec')) +
      duck(540, 470) +
      diff(620, 480, 18, frog(620, 490), '') +
      floor(rand, 346, 380, 8) +
      backpack(250, 360) +
      pineCone(45, 370) +
      bluebells(470, 364) +
      anthill(570, 366) +
      acorn(525, 274)
    )
  },
})
