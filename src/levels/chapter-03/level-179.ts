// Bat cave: a cave in a cliff among the forest's ten hardest (hidden until released, levels/upcoming.ts). New in
// the forest: a cave mouth with stalactites and glowing crystals, a sleeping bear, bats, two cavers (a headlamp, a
// rope), a rope ladder, a mine cart of ore on its rails, a lantern, glowing mushrooms, a sign post and a pickaxe.
// Motion differences: a bat flies out and a drop falls only on picture A; the crystals glow only on B.
import { person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bear } from './shapes.ts'

/** Bat flying; (x, y) = body center. Bounds: x ±20, y from −10 to +8. */
const bat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#5b4f73"><path d="M-4 0q-8 -12 -16 -4q6 2 6 8q6 -4 10 -2ZM4 0q8 -12 16 -4q-6 2 -6 8q-6 -4 -10 -2Z"/>` +
  `<ellipse rx="5" ry="6"/><path d="M-3 -5l-1 -4l3 2ZM3 -5l1 -4l-3 2Z"/></g>`

/** Stalactite hanging from y; (x, y) = its root. Bounds: x ±8, y from 0 to +h. */
const stalactite = (x: number, y: number, h: number) => `<path d="M${x - 8} ${y}L${x} ${y + h}L${x + 8} ${y}Z" fill="#7d7468"/>`

/** Crystal cluster; (x, y) = base center. Bounds: x ±20, y from −32 to 0. */
const crystals = (x: number, y: number, color: string) =>
  `<g fill="${color}"><path d="M${x - 14} ${y}l-4 -18l6 -6l4 24Z"/><path d="M${x - 4} ${y}l-2 -28l6 -4l4 32Z"/><path d="M${x + 8} ${y}l2 -20l6 -2l2 22Z"/></g>`

/** Caver standing, faces right, the helmet lamp's beam separate; (x, y) = feet. Bounds: x ±13, y from −66 to 0. */
const caver = (x: number, y: number, suit: string) =>
  person(x, y, suit, false, '#e0b48a', '#5a3d2b') + `<path d="M${x - 9} ${y - 58}a9 8 0 0 1 18 0Z" fill="#ffd23f"/><circle cx="${x + 8}" cy="${y - 60}" r="2.5" fill="#fffbe6"/>`

/** Mine cart on its rails; (x, y) = rail under the middle; the ore separate. Bounds: x ±34, y from −36 to 0. */
const mineCart = (x: number, y: number) =>
  `<path d="M${x - 30} ${y - 34}H${x + 30}L${x + 24} ${y - 10}H${x - 24}Z" fill="#6c757d"/><path d="M${x - 28} ${y - 26}H${x + 28}" stroke="#495057" stroke-width="2"/>` +
  `<circle cx="${x - 16}" cy="${y - 6}" r="6" fill="#2b2b2b"/><circle cx="${x + 16}" cy="${y - 6}" r="6" fill="#2b2b2b"/>`
const ore = (x: number, y: number, color: string) =>
  `<g fill="${color}"><circle cx="${x - 14}" cy="${y - 36}" r="7"/><circle cx="${x}" cy="${y - 40}" r="8"/><circle cx="${x + 14}" cy="${y - 36}" r="7"/></g>`

/** Glowing mushrooms; (x, y) = ground center. Bounds: x ±16, y from −20 to 0. */
const glowShrooms = (x: number, y: number, color: string) =>
  `<g fill="${color}"><path d="M${x - 12} ${y}v-8M${x} ${y}v-12M${x + 10} ${y}v-6" stroke="#e9dcc4" stroke-width="2.5"/>` +
  `<ellipse cx="${x - 12}" cy="${y - 10}" rx="6" ry="4"/><ellipse cx="${x}" cy="${y - 15}" rx="8" ry="5"/><ellipse cx="${x + 10}" cy="${y - 8}" rx="5" ry="3.5"/></g>`

export default svgLevel({
  id: 179,
  chapter: 'forest',
  title: 'batCave',
  parTimeSec: 104,
  scene: ({ diff, anim, extra }) => {
    const flying = anim({ id: 'bat', type: 'path', points: [[0, 0], [80, -60], [160, -20]], period: 5 }, bat(520, 170))
    const drop = `<ellipse cx="366" cy="214" rx="3" ry="5" fill="#9ad3f0"/>`
    let rocks = ''
    for (const [x, y, r] of [[60, 100, 30], [180, 60, 26], [640, 70, 34], [760, 140, 28], [70, 250, 24], [240, 300, 20], [720, 380, 26]]) rocks += `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.6}" fill="#9a9184"/>`
    return (
      `<rect width="800" height="500" fill="#8a8174"/><path d="M0 0H260Q200 40 140 30T0 60Z" fill="#cde4ee"/>` + rocks +
      `<path d="M0 30Q60 50 120 34T260 0" stroke="#6f9a45" stroke-width="10" fill="none"/>` +
      // Cave mouth: stalactites and the drip, crystals, the sleeping bear
      `<path d="M300 400V200Q300 110 450 110Q600 110 600 200V400Z" fill="#2b2620"/>` +
      stalactite(340, 150, 30) + stalactite(366, 126, 70) + stalactite(450, 112, 36) + stalactite(490, 116, 48) + stalactite(530, 126, 30) + stalactite(566, 146, 40) +
      diff(410, 136, 24, stalactite(410, 114, 40), '') +
      diff(366, 214, 22, anim({ type: 'blink', duty: 0.35, period: 1.4 }, drop), drop) +
      bear(460, 392, true, '#5e4630') +
      crystals(546, 346, '#5aa9d6') +
      diff(546, 332, 26, crystals(546, 346, '#c9f3ff'), anim({ type: 'blink', duty: 0.5, period: 1.2 }, crystals(546, 346, '#c9f3ff'))) +
      diff(520, 170, 24, flying, bat(520, 170), 'bat') + bat(420, 190) + bat(470, 210) +
      // Ground, rails and the mine cart with its ore
      `<path d="M0 400Q200 380 400 400T800 392V500H0Z" fill="#6b5a48"/><path d="M300 476H800M300 468H800" stroke="#3d4a55" stroke-width="3"/>` +
      Array.from({ length: 12 }, (_, i) => `<path d="M${310 + i * 42} 464v16" stroke="#5e3b1a" stroke-width="5"/>`).join('') +
      mineCart(380, 470) + diff(380, 436, 24, ore(380, 470, '#ffd23f'), ore(380, 470, '#e63946')) +
      // Rope ladder with its missing rung, the second caver and the coil of rope
      `<path d="M690 90V410M718 90V410" stroke="#a0703f" stroke-width="3"/>` +
      [110, 140, 170, 200, 260, 290, 320, 350, 380].map((y) => `<path d="M690 ${y}H718" stroke="#a0703f" stroke-width="3"/>`).join('') +
      diff(704, 230, 22, `<path d="M690 230H718" stroke="#a0703f" stroke-width="3"/>`, '') +
      caver(672, 410, '#fb8500') +
      diff(676, 372, 22, `<circle cx="676" cy="372" r="9" fill="none" stroke="#3a86ff" stroke-width="4"/>`, `<circle cx="676" cy="372" r="9" fill="none" stroke="#8ac926" stroke-width="4"/>`) +
      // First caver with the headlamp's beam, the pickaxe, the lantern, the sign, the mushrooms
      caver(180, 470, '#e63946') +
      diff(214, 411, 30, `<path d="M190 410L238 396V426Z" fill="#fffbe6" fill-opacity="0.55"/>`, '') +
      diff(300, 420, 26, `<path d="M290 440L312 400" stroke="#a0703f" stroke-width="4"/><path d="M300 396q12 -2 22 8q-10 -4 -18 0Z" fill="#8d99ae"/>`, '') +
      `<ellipse cx="110" cy="392" rx="26" ry="12" fill="#9a9184"/>` +
      diff(110, 372, 22, `<rect x="103" y="364" width="14" height="18" rx="3" fill="#ffd166" stroke="#3d4a55" stroke-width="2"/><circle cx="110" cy="372" r="14" fill="#ffd166" fill-opacity="0.2"/>`, `<rect x="103" y="364" width="14" height="18" rx="3" fill="#3d4a55" stroke="#3d4a55" stroke-width="2"/>`) +
      `<path d="M120 490V448" stroke="#6b4a2b" stroke-width="4"/>` +
      diff(120, 448, 24, `<path d="M100 440h34l8 8l-8 8h-34Z" fill="#ffd23f"/>`, `<path d="M100 440h34l8 8l-8 8h-34Z" fill="#8ac926"/>`) +
      diff(606, 444, 22, glowShrooms(606, 456, '#8ff0c4'), glowShrooms(606, 456, '#ff8fab')) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['bat', 240, 140],
        ['mushroom', 520, 450],
        ['spider', 330, 300],
        ['pineCone', 40, 470],
        ['leafPile', 760, 480],
      ])
    )
  },
})
