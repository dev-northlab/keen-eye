// Motion differences: the rover drives faster on picture B; the dish scans only on B.
import { svgLevel } from '../helpers.ts'
import { astronaut, beacon, crater, crystal, dome, flag, planet, rover, satellite, solarPanel, sparkle, starField, toolbox, wrench } from './shapes.ts'

/** Plant in a pot; (x, y) = bottom center. Bounds: x ±12, y from −40 to 0. */
const plant = (x: number, y: number) =>
  `<rect x="${x - 6}" y="${y - 10}" width="12" height="10" fill="#c9a06c"/><rect x="${x - 1.5}" y="${y - 28}" width="3" height="18" fill="#5a3d2b"/><circle cx="${x}" cy="${y - 28}" r="12" fill="#4caf6a"/>`

/** Dish bowl of `dish(80, 330)` without its stand. Bounds: radius 25 around (80, 294). */
const bowl = `<path d="M58 282q22 36 44 0Z" fill="#e6e6f0"/><path d="M80 294v-20" stroke="#5c677d" stroke-width="2"/><circle cx="80" cy="274" r="3" fill="#e63946"/>`

export default svgLevel({
  id: 82,
  chapter: 'space',
  title: 'moonBase',
  parTimeSec: 140,
  scene: ({ diff, anim, rand }) => {
    const driving = (period: number) => anim({ id: 'rover', type: 'path', points: [[0, 0], [140, 0]], flipX: 560, period }, rover(560, 380))

    return (
      `<rect width="800" height="500" fill="#14112e"/>` +
      starField(rand, 0, 270, 60) +
      diff(500, 60, 18, sparkle(500, 60, 10), '') +
      sparkle(220, 50, 8) +
      // Earth
      planet(640, 100, 44, '#3a86ff') +
      `<path d="M615 80q14 -12 26 -2q6 12 -8 16q-14 2 -18 -14Z" fill="#4caf6a"/><path d="M650 110q12 -6 18 6q-4 12 -18 6Z" fill="#4caf6a"/>` +
      diff(628, 118, 18, '', `<ellipse cx="628" cy="118" rx="10" ry="6" fill="#4caf6a"/>`) +
      diff(300, 120, 41, satellite(300, 120, '#3a86ff'), satellite(300, 120, '#e63946')) +
      // Ground
      `<path d="M0 280q200 -30 400 -6t400 -10V500H0Z" fill="#b9b4cc"/><path d="M0 400q260 -20 520 4t280 -6V500H0Z" fill="#a49fbb"/>` +
      crater(120, 440, 40) +
      crater(700, 470, 30) +
      crater(560, 300, 22) +
      diff(470, 460, 27, crater(470, 460, 26), '') +
      // Base
      `<path d="M70 330L80 300L90 330" stroke="#8d99ae" stroke-width="4" fill="none"/>` +
      diff(80, 290, 30, bowl, anim({ type: 'sway', angle: 20, pivot: [80, 294], period: 4 }, bowl)) +
      `<rect x="256" y="312" width="28" height="14" fill="#d0d4de"/>` +
      dome(200, 330, 60) +
      plant(228, 324) +
      diff(172, 304, 21, plant(172, 324), '') +
      diff(320, 310, 45, dome(320, 330, 40), dome(320, 330, 40, '#ffd6e0')) +
      diff(432, 287, 18, flag(420, 330, '#e63946'), flag(420, 330, '#3a86ff')) +
      astronaut(380, 360, '#f1f1f1', '#ffb703', true) +
      diff(473, 378, 18, astronaut(470, 420, '#f1f1f1', '#ffb703'), astronaut(470, 420, '#f1f1f1', '#3ae0ff')) +
      diff(560, 359, 37, driving(14), driving(7), 'rover') +
      solarPanel(120, 352) +
      crystal(650, 302) +
      wrench(320, 422) +
      toolbox(540, 432) +
      beacon(770, 320)
    )
  },
})
