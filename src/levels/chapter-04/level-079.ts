// Motion differences: the hanging scale swings only on picture B; the gull hops faster on B; the shop sign sways faster on B.
import { svgLevel } from '../helpers.ts'
import { crab, fish, gullStanding, person, sun, waves } from './shapes.ts'
import { awning } from '../chapter-02/shapes.ts'

/** Market stall counter; (x, y) = ground center. Bounds: x ±60, y from −120 to 0. */
const stall = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-56" y="-120" width="6" height="120" fill="#8a5a3b"/><rect x="50" y="-120" width="6" height="120" fill="#8a5a3b"/><rect x="-60" y="-60" width="120" height="60" fill="#bde3f2"/><rect x="-60" y="-64" width="120" height="8" fill="#8d99ae"/></g>`

/** Ice tray with `n` fish; (x, y) = bottom center. Bounds: x ±28, y from −24 to 0. */
const tray = (x: number, y: number, n: number, color = '#8d99ae') =>
  `<rect x="${x - 28}" y="${y - 10}" width="56" height="10" rx="2" fill="#dbeaf7"/>` + [-16, 0, 16].slice(0, n).map((dx) => fish(x + dx, y - 16, color, 0.9)).join('')

/** Hanging scale from (x, y). Bounds: x ±16, y from 0 to +40. */
const scale = (x: number, y: number) =>
  `<path d="M${x} ${y}v8" stroke="#3d4a55" stroke-width="2"/><circle cx="${x}" cy="${y + 16}" r="8" fill="#fff" stroke="#3d4a55" stroke-width="2"/><path d="M${x} ${y + 16}v-5" stroke="#e63946" stroke-width="1.5"/>` +
  `<path d="M${x - 10} ${y + 24}l10 10l10 -10" stroke="#3d4a55" stroke-width="1.5" fill="none"/><path d="M${x - 14} ${y + 34}h28l-3 6h-22Z" fill="#8d99ae"/>`

/** Shop sign hanging from (x, y). Bounds: x ±20, y from 0 to +30. */
const sign = (x: number, y: number) =>
  `<path d="M${x} ${y}v6" stroke="#3d4a55" stroke-width="2"/><rect x="${x - 20}" y="${y + 6}" width="40" height="24" rx="4" fill="#1d3557"/>` + fish(x, y + 18, '#ffd166', 0.9)

/** Lobster; (x, y) = center. Bounds: x ±16, y ±8. */
const lobster = (x: number, y: number, color = '#e63946') =>
  `<g transform="translate(${x} ${y})"><ellipse rx="10" ry="5" fill="${color}"/><path d="M-10 0l-6 -4v8Z" fill="${color}"/><path d="M8 -3l6 -4l2 2M8 3l6 4l2 -2" stroke="${color}" stroke-width="3" fill="none"/><path d="M4 -4l2 -5M6 -4l4 -4" stroke="${color}" stroke-width="1.5"/></g>`

/** Price tag; (x, y) = top. Bounds: x ±8, y from 0 to +14. */
const tag = (x: number, y: number, color: string) => `<path d="M${x - 8} ${y}h16v12h-16Z" fill="${color}"/><path d="M${x - 4} ${y + 6}h8" stroke="#fff" stroke-width="2"/>`

export default svgLevel({
  id: 79,
  chapter: 'sea',
  title: 'seaMarket',
  parTimeSec: 130,
  scene: ({ diff, anim, rand }) => {
    let cobbles = ''
    for (let i = 0; i < 30; i++) cobbles += `<ellipse cx="${rand() * 800}" cy="${410 + rand() * 90}" rx="10" ry="4" fill="#a3aebf"/>`
    const balance = scale(400, 290)
    const hopping = (period: number) => anim({ id: 'gull', type: 'bob', dx: 0, dy: 5, period }, gullStanding(700, 300, true))
    const swinging = (period: number) => anim({ type: 'sway', angle: 8, pivot: [160, 200], period }, sign(160, 200))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(120, 70) +
      `<rect y="220" width="800" height="80" fill="#3ba7cc"/>` +
      anim({ type: 'bob', dx: 8, dy: 0, period: 4 }, waves(226, 10, 100, '#5cc0de', 300)) +
      `<rect x="600" y="180" width="100" height="120" fill="#e07a5f"/><path d="M592 184h116l-58 -40Z" fill="#8a3b2b"/><rect x="640" y="240" width="24" height="60" fill="#5a3d2b"/>` +
      `<rect x="100" y="150" width="120" height="150" fill="#7aa6d6"/><path d="M92 154h136l-68 -40Z" fill="#3d5a66"/>` +
      `<path d="M160 200h-30" stroke="#3d4a55" stroke-width="3"/>` +
      diff(160, 216, 24, swinging(2.4), swinging(1)) +
      // Quay
      `<rect y="300" width="800" height="200" fill="#8d99ae"/><rect y="296" width="800" height="6" fill="#5c677d"/>` +
      cobbles +
      diff(700, 290, 20, hopping(1.6), hopping(0.7), 'gull') +
      gullStanding(60, 300) +
      // Stalls
      stall(300, 400) +
      diff(300, 290, 40, awning(300, 276, 70, '#3a86ff'), awning(300, 276, 70, '#e63946')) +
      diff(400, 310, 22, balance, anim({ type: 'sway', angle: 10, pivot: [400, 290], period: 1.4 }, balance)) +
      diff(270, 360, 30, tray(270, 372, 3), tray(270, 372, 2)) +
      diff(340, 366, 18, lobster(340, 366), lobster(340, 366, '#3a86ff')) +
      stall(540, 400) +
      awning(540, 276, 90, '#8ac926') +
      tray(510, 372, 3, '#ff9f43') +
      tag(564, 350, '#ffd166') +
      diff(480, 470, 22, crab(480, 480), '') +
      diff(200, 365, 20, person(200, 400, '#ffb703', true), person(200, 400, '#ff006e', true)) +
      person(460, 400, '#2a9d8f') +
      diff(640, 369, 36, person(640, 400, '#8338ec', true), '') +
      diff(120, 470, 22, crab(120, 480, '#ff9f43'), crab(120, 480, '#8ac926')) +
      `<rect x="700" y="440" width="60" height="30" fill="#c68b4e"/><path d="M704 450h52M704 460h52" stroke="#9c6a37" stroke-width="2"/>`
    )
  },
})
