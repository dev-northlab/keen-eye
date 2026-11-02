// Motion differences: the mining drone's lamp blinks only on picture B; the top asteroid spins faster on B.
import { svgLevel } from '../helpers.ts'
import { asteroid, comet, flame, planet, rocket, sparkle, starField } from './shapes.ts'

/** Asteroid with `pits` craters drawn on it; (x, y) = center, scale s. */
const pitted = (x: number, y: number, s: number, pits: number) => {
  const at: [number, number][] = [[-6, -6], [7, 5], [5, -9], [-8, 7]]
  let p = ''
  for (let i = 0; i < pits; i++) p += `<circle cx="${at[i][0]}" cy="${at[i][1]}" r="${i === 0 ? 4.5 : 3.5}" fill="#000" fill-opacity="0.28"/>`
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-16 -6L-8 -16L6 -17L16 -8L17 6L8 16L-6 16L-16 8Z" fill="#9a8a7a"/>${p}</g>`
}

const crystal = (x: number, y: number, color: string, h = 22) => `<path d="M${x - 5} ${y}l2 ${-h}l3 -4l3 4l2 ${h}Z" fill="${color}"/><path d="M${x} ${y - h - 4}v${h}" stroke="#fff" stroke-opacity="0.4" stroke-width="1.5"/>`

/** Mining drone; (x, y) = center. Lamp separate. Bounds: x ±22, y ±14. */
const drone = (x: number, y: number) =>
  `<rect x="${x - 14}" y="${y - 10}" width="28" height="20" rx="6" fill="#8d99ae"/><path d="M${x - 14} ${y}h-8M${x + 14} ${y}h8" stroke="#5c677d" stroke-width="3"/>` +
  `<path d="M${x - 6} ${y + 10}l-4 8M${x + 6} ${y + 10}l4 8" stroke="#5c677d" stroke-width="2.5"/><circle cx="${x}" cy="${y}" r="5" fill="#3d4a55"/>`
const lamp = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="7" fill="#ffd23f" fill-opacity="0.35"/><circle cx="${x}" cy="${y}" r="3.5" fill="#ffd23f"/>`

const smallRock = (x: number, y: number) => `<path d="M${x - 8} ${y}l3 -7l8 -2l6 5l-2 6l-8 2Z" fill="#7a6a5a"/>`

export default svgLevel({
  id: 144,
  chapter: 'space',
  title: 'asteroidField',
  parTimeSec: 120,
  scene: ({ diff, anim, rand }) => {
    let field = ''
    for (const [x, y, s, p] of [[60, 60, 0.7, 9], [300, 300, 0.6, 11], [760, 180, 0.9, 13], [480, 470, 0.8, 10], [770, 440, 1.1, 15], [180, 250, 0.5, 8], [620, 220, 0.5, 9]] as const)
      field += anim({ type: 'rotate', pivot: [x, y], period: p }, asteroid(x, y, s, '#8d7b6a'))
    const spinning = (period: number) => anim({ type: 'rotate', pivot: [420, 90], period }, pitted(420, 90, 1.2, 3))

    return (
      `<rect width="800" height="500" fill="#090b1f"/>` + starField(rand, 0, 500, 90) + sparkle(260, 40, 6) + sparkle(700, 400, 5) +
      planet(720, 70, 34, '#c98bb9', '#e8b4d8') + comet(520, 40) +
      field +
      // Asteroids with differences
      diff(420, 90, 28, spinning(14), spinning(4)) +
      diff(220, 120, 30, asteroid(220, 120, 1.1, '#a08a7a'), asteroid(220, 120, 1.4, '#a08a7a')) +
      asteroid(612, 112, 0.5) + asteroid(668, 132, 0.45) + diff(640, 116, 22, asteroid(640, 116, 0.55), '') +
      diff(700, 300, 26, asteroid(700, 300, 1.2, '#8d7b6a'), `<g transform="rotate(35 700 300)">${asteroid(700, 300, 1.2, '#8d7b6a')}</g>`) +
      diff(560, 330, 26, pitted(560, 330, 1.2, 3), pitted(560, 330, 1.2, 2)) +
      // Crystal asteroid
      `<path d="M50 420q10 -60 80 -60q70 10 70 60q-10 40 -80 40q-70 0 -70 -40Z" fill="#7a6a5a"/><circle cx="90" cy="410" r="10" fill="#000" fill-opacity="0.2"/>` +
      crystal(100, 372, '#4df0ff') + crystal(150, 376, '#b38cff', 18) +
      diff(126, 358, 22, crystal(126, 370, '#ff6bd6', 26), crystal(126, 370, '#ff6b9e', 26)) +
      // Flag asteroid, small rocks
      `<path d="M250 440q10 -36 60 -36q50 6 50 36q-6 24 -56 24q-56 0 -54 -24Z" fill="#8d7b6a"/>` +
      diff(300, 396, 26, '', `<path d="M300 406V378" stroke="#d0d4de" stroke-width="2.5"/><path d="M301 378h18v11h-18Z" fill="#8ac926"/>`) +
      smallRock(480, 410) + diff(526, 414, 24, smallRock(520, 418), smallRock(532, 412)) +
      // Ship weaving through
      `<g transform="rotate(90 400 240)">${rocket(400, 270, '#f1f1f1', '#3a86ff', 0.8)}${flame(400, 270, 0.7)}</g>` +
      diff(395, 240, 22, `<rect x="390" y="230" width="10" height="20" fill="#3a86ff"/>`, `<rect x="390" y="230" width="10" height="20" fill="#3a6ad6"/>`) +
      drone(100, 200) + diff(100, 210, 22, lamp(100, 212), anim({ type: 'blink', duty: 0.5, period: 0.9 }, lamp(100, 212))) +
      `<path d="M100 220L76 270H124Z" fill="#ffd23f" fill-opacity="0.15"/>`
    )
  },
})
