// Motion differences: the bats fly faster on picture B; the drip falls only on B; the glowing crystals pulse faster on B.
import { svgLevel } from '../helpers.ts'
import { bottleMessage, clam, crab, fish, jellyfish, rock, seahorse, seaUrchin, seaweed, snorkelMask, starfish } from './shapes.ts'

/** Bat, faces right; (x, y) = body center. Bounds: x ±20, y from −10 to +8. */
const bat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-4 0q-8 -12 -20 -4q6 2 6 8q6 -4 14 0Z" fill="#2b2b3a"/><path d="M4 0q8 -12 20 -4q-6 2 -6 8q-6 -4 -14 0Z" fill="#2b2b3a"/><ellipse rx="5" ry="7" fill="#2b2b3a"/></g>`

/** Stalactite; (x, y) = root on the ceiling. Bounds: x ±10·s, y from 0 to +50·s. */
const stalactite = (x: number, y: number, s = 1, color = '#8d99ae') => `<path d="M${x - 10 * s} ${y}h${20 * s}l${-10 * s} ${50 * s}Z" fill="${color}"/>`

/** Water drip; (x, y) = top. Bounds: x ±4, y from 0 to +12. */
const drip = (x: number, y: number) => `<path d="M${x} ${y}q-4 6 -4 8a4 4 0 0 0 8 0q0 -2 -4 -8Z" fill="#bde3f2"/>`

/** Crystal cluster without its own fill (recolored by the animation); (x, y) = base. Bounds: x ±16, y from −30 to 0. */
const crystals = (x: number, y: number) => `<path d="M${x - 14} ${y}l6 -22l6 22ZM${x - 4} ${y}l6 -30l6 30ZM${x + 4} ${y}l6 -18l6 18Z"/>`

/** Treasure chest, open; (x, y) = bottom center. Bounds: x ±20, y from −34 to 0. */
const chest = (x: number, y: number, coins: boolean) =>
  `<g transform="translate(${x} ${y})"><rect x="-20" y="-20" width="40" height="20" fill="#8a5a3b"/><path d="M-20 -22q0 -14 20 -14q20 0 20 14l-4 -12q-16 -8 -32 0Z" fill="#a0703f"/>` +
  (coins ? `<circle cx="-8" cy="-24" r="4" fill="#ffd166"/><circle cx="4" cy="-26" r="4" fill="#ffd166"/><circle cx="12" cy="-22" r="4" fill="#ffd166"/>` : '') + `</g>`

/** Rowboat in the cave; (x, y) = waterline center. Bounds: x ±30, y from −12 to +8. The lantern is separate. */
const boat = (x: number, y: number) => `<path d="M${x - 30} ${y - 8}h60l-8 16h-44Z" fill="#8a5a3b"/><path d="M${x - 26} ${y - 8}h52" stroke="#5a3d2b" stroke-width="3"/>`
const lantern = (x: number, y: number, color: string) => `<rect x="${x - 6}" y="${y - 26}" width="12" height="14" rx="3" fill="${color}" stroke="#333" stroke-width="2"/>`

export default svgLevel({
  id: 80,
  chapter: 'sea',
  title: 'seaCave',
  parTimeSec: 140,
  scene: ({ diff, anim, rand }) => {
    let glints = ''
    for (let i = 0; i < 10; i++) glints += `<path d="M${rand() * 700 + 50} ${380 + rand() * 60}h${10 + rand() * 20}" stroke="#9fd8f0" stroke-width="3" stroke-linecap="round"/>`
    const flapping = (period: number) => anim({ id: 'bats', type: 'path', points: [[0, 0], [80, -20], [160, 0]], period }, bat(300, 110) + bat(330, 126))
    const drop = drip(560, 150)
    const pulsing = (period: number) => anim({ type: 'color', colors: ['#8ac926', '#d9ff7a', '#8ac926'], period }, crystals(120, 380))

    return (
      `<rect width="800" height="500" fill="#2b2b3a"/>` +
      // Cave mouth with sea light
      `<path d="M300 500q-40 -300 100 -340q140 40 100 340Z" fill="#5cc0de"/><path d="M340 500q-30 -240 60 -280q90 40 60 280Z" fill="#8fd8ec"/>` +
      `<rect y="380" width="800" height="120" fill="#1f5f8a"/>` +
      anim({ type: 'bob', dx: 10, dy: 0, period: 4 }, glints) +
      // Cave walls
      `<path d="M0 0h800v70q-100 40 -200 10t-200 20t-200 -20t-200 10Z" fill="#3d4a55"/>` +
      stalactite(80, 80, 1) +
      diff(160, 106, 34, stalactite(160, 76, 1.2), stalactite(160, 76, 0.8)) +
      diff(240, 110, 24, stalactite(240, 90, 0.8), '') +
      diff(315, 117, 40, flapping(8), flapping(4), 'bats') +
      stalactite(560, 100, 1) +
      diff(560, 157, 18, drop, anim({ id: 'drip', type: 'path', points: [[0, 0], [0, 40]], period: 1.2 }, drop), 'drip') +
      stalactite(650, 80, 1.3, '#6f7f93') +
      stalactite(360, 70, 0.7) +
      stalactite(470, 72, 0.6) +
      `<path d="M0 0v500h120q-40 -200 0 -400Z" fill="#3d4a55"/><path d="M800 0v500h-120q40 -200 0 -400Z" fill="#3d4a55"/>` +
      // Floor
      `<path d="M0 420q100 -20 200 0v80H0Z" fill="#5c677d"/><path d="M600 420q100 -20 200 0v80h-200Z" fill="#5c677d"/>` +
      diff(120, 368, 26, pulsing(3), pulsing(1)) +
      `<circle cx="120" cy="380" r="34" fill="#d9ff7a" fill-opacity="0.12"/>` +
      diff(680, 470, 22, chest(680, 486, true), chest(680, 486, false)) +
      diff(60, 470, 22, crab(60, 480, '#ff9f43'), crab(60, 480, '#ff6b8b')) +
      starfish(740, 420, '#ff6b8b') +
      rock(180, 490, 1.1, '#4a5560') +
      // Boat and water
      boat(400, 440) +
      diff(400, 420, 18, lantern(400, 440, '#ffd166'), lantern(400, 440, '#8ac926')) +
      diff(300, 470, 20, fish(300, 470, '#8fd8ec', 1.1), fish(300, 470, '#8fd8ec', 1.1, true)) +
      jellyfish(520, 470, '#b38cff') +
      fish(560, 420, '#ffb703', 0.9) +
      seaweed(240, 500, 1, '#2a9d8f') +
      seaUrchin(125, 442) +
      clam(625, 442) +
      bottleMessage(300, 412) +
      seahorse(575, 460) +
      snorkelMask(770, 462)
    )
  },
})
