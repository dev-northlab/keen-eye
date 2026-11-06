// Shearing day: a sheep station among the farm's ten hardest (hidden until released, levels/upcoming.ts). New on
// the farm: a shearing shed with a shearer, a fleece and a wool bale, a hanging scale, a water tank, a gum tree
// with a koala, a kangaroo, an emu and a quad bike with its trailer. Motion differences: the kangaroo hops only
// on picture A; the shed's fan turns only on B; the quad's flag flutters only on A.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { sheep } from '../shapes.ts'

/** Koala hugging a branch; (x, y) = bottom center. Bounds: x ±14, y from −28 to 0. */
const koala = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-10" rx="11" ry="10" fill="#9aa1a8"/><circle cy="-19" r="8" fill="#9aa1a8"/>` +
  `<circle cx="-8" cy="-23" r="5" fill="#9aa1a8"/><circle cx="8" cy="-23" r="5" fill="#9aa1a8"/><circle cx="-8" cy="-23" r="2.5" fill="#e6e1d8"/><circle cx="8" cy="-23" r="2.5" fill="#e6e1d8"/>` +
  `<ellipse cy="-17" rx="2.5" ry="3.5" fill="#3d3d3d"/><circle cx="-3.5" cy="-21" r="1.1" fill="#222"/><circle cx="3.5" cy="-21" r="1.1" fill="#222"/></g>`

/** Kangaroo, faces right; (x, y) = feet. Bounds: x from −30 to +18, y from −48 to 0. */
const kangaroo = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#c8794a"><path d="M-6 -12Q-20 -6 -30 0" stroke="#c8794a" stroke-width="5" fill="none" stroke-linecap="round"/>` +
  `<ellipse cx="-2" cy="-20" rx="11" ry="15" transform="rotate(20 -2 -20)"/><path d="M-4 -4h14v4h-14Z"/>` +
  `<ellipse cx="8" cy="-38" rx="7" ry="6"/><path d="M4 -42l-2 -6l4 3ZM8 -43l1 -6l3 5Z"/><path d="M6 -26l6 4" stroke="#c8794a" stroke-width="3"/>` +
  `<circle cx="11" cy="-39" r="1.2" fill="#222"/></g>`

/** Emu body and neck, its head separate (`emuHead`); (x, y) = feet. Bounds: x from −26 to +24, y from −96 to 0. */
const emuBody = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-6 0V-34M8 0V-34" stroke="#6b5a48" stroke-width="3.5"/><path d="M-10 0h6M4 0h7" stroke="#6b5a48" stroke-width="3"/>` +
  `<ellipse cx="-2" cy="-46" rx="24" ry="18" fill="#5e4a3a"/><path d="M-20 -52q8 -6 18 -2q-8 2 -18 2" fill="#7a6552"/>` +
  `<path d="M12 -56Q18 -76 18 -92" stroke="#5e4a3a" stroke-width="7" fill="none" stroke-linecap="round"/></g>`

/** Emu head at the top of its neck (x, y), facing right or left. Bounds: x ±11, y ±7. */
const emuHead = (x: number, y: number, right: boolean) =>
  `<g transform="translate(${x} ${y}) scale(${right ? 1 : -1} 1)"><ellipse rx="7" ry="6" fill="#4a3a2e"/><path d="M5 -1l6 2l-6 2Z" fill="#3d3d3d"/>` +
  `<circle cx="2" cy="-2" r="1.6" fill="#ffb703"/><circle cx="2" cy="-2" r="0.8" fill="#222"/></g>`

/** Shearer in a singlet, faces right, his hat separate (`hat`); (x, y) = feet. Bounds: x from −13 to +30, y from −62 to 0. */
const shearer = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-9" y="-24" width="7" height="24" fill="#3d4a55"/><rect x="2" y="-24" width="7" height="24" fill="#3d4a55"/>` +
  `<path d="M-11 -48h22l3 26h-28Z" fill="#3a86ff"/><path d="M10 -44l12 14" stroke="#e0b48a" stroke-width="5" stroke-linecap="round"/>` +
  `<rect x="20" y="-34" width="10" height="5" rx="2" fill="#8d99ae"/><path d="M14 -46Q2 -70 -20 -84" stroke="#3d4a55" stroke-width="1.5" fill="none"/>` +
  `<circle cy="-54" r="8" fill="#e0b48a"/><circle cx="3" cy="-55" r="1.2" fill="#222"/></g>`

/** Wide-brimmed hat on a head at (x, y − 54). Bounds: x ±14, y from −68 to −58. */
const hat = (x: number, y: number, color: string) =>
  `<path d="M${x - 14} ${y - 58}h28l-3 -2h-5v-8h-12v8h-5Z" fill="${color}"/>`

/** Sheep sitting up while being shorn, half its wool gone; (x, y) = bottom center. Bounds: x ±22, y from −46 to 0. */
const shornSheep = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-20" rx="16" ry="20" fill="#f0e6d8"/>` +
  `<g fill="#fbfbf7"><circle cx="8" cy="-28" r="10"/><circle cx="12" cy="-14" r="10"/><circle cx="4" cy="-6" r="8"/></g>` +
  `<ellipse cx="-12" cy="-40" rx="8" ry="10" fill="#3d3d3d"/><ellipse cx="-20" cy="-42" rx="6" ry="2.5" fill="#3d3d3d" transform="rotate(-20 -20 -42)"/>` +
  `<path d="M-8 -4l-12 4M8 -4l12 4" stroke="#3d3d3d" stroke-width="4"/></g>`

/** A fleece lying on the board; (x, y) = bottom center. Bounds: x ±20, y from −14 to 0. */
const fleece = (x: number, y: number) =>
  `<g fill="#fbfbf7"><ellipse cx="${x}" cy="${y - 5}" rx="20" ry="6"/><circle cx="${x - 9}" cy="${y - 8}" r="6"/><circle cx="${x + 3}" cy="${y - 10}" r="6"/><circle cx="${x + 12}" cy="${y - 7}" r="5"/></g>`

/** Fan blades; (x, y) = hub. Bounds: radius 18. */
const fanBlades = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#c9d1d9">` +
  [0, 120, 240].map((a) => `<ellipse cx="0" cy="-10" rx="5" ry="9" transform="rotate(${a})"/>`).join('') +
  `<circle r="4" fill="#5c677d"/></g>`

/** Hanging scale's needle on a dial centered at (x, y), turned by `angle`. Bounds: radius 8. */
const needle = (x: number, y: number, angle: number) =>
  `<path d="M${x} ${y}V${y - 8}" stroke="#e63946" stroke-width="2" stroke-linecap="round" transform="rotate(${angle} ${x} ${y})"/>`

/** Quad bike, faces right, with its flag pole (flag separate: `flag`); (x, y) = ground under the middle. Bounds: x ±44, y from −80 to 0. */
const quad = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M28 -32V-80" stroke="#3d4a55" stroke-width="2"/>` +
  `<circle cx="-26" cy="-14" r="14" fill="#2b2b2b"/><circle cx="-26" cy="-14" r="5" fill="#8d99ae"/><circle cx="26" cy="-14" r="14" fill="#2b2b2b"/><circle cx="26" cy="-14" r="5" fill="#8d99ae"/>` +
  `<path d="M-42 -26Q-36 -40 -20 -38H22Q38 -40 44 -26Z" fill="#e63946"/><rect x="-14" y="-46" width="22" height="8" rx="3" fill="#2b2b2b"/>` +
  `<path d="M14 -40l8 -14h8" stroke="#3d4a55" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="-40" y="-40" width="18" height="4" fill="#3d4a55"/>` +
  `<circle cx="42" cy="-32" r="3" fill="#fff3b0"/></g>`

/** Orange safety flag on top of a pole at (x, y). Bounds: x from 0 to +20, y ±6. */
const flag = (x: number, y: number) => `<path d="M${x} ${y - 6}l20 6l-20 6Z" fill="#fb8500"/>`

/** Border collie sitting, faces left; (x, y) = bottom center. Bounds: x ±14, y from −30 to 0. */
const collie = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M8 -4q10 0 8 -10" stroke="#2b2b2b" stroke-width="4" fill="none" stroke-linecap="round"/>` +
  `<ellipse cy="-10" rx="10" ry="11" fill="#2b2b2b"/><ellipse cx="-4" cy="-8" rx="5" ry="7" fill="#f4f1e8"/><circle cx="-3" cy="-23" r="7" fill="#2b2b2b"/>` +
  `<ellipse cx="-8" cy="-21" rx="4" ry="3" fill="#f4f1e8"/><path d="M0 -29l3 -5l1 6Z" fill="#2b2b2b"/><circle cx="-5" cy="-25" r="1.2" fill="#fff"/></g>`

export default svgLevel({
  id: 153,
  chapter: 'farm',
  title: 'shearingDay',
  parTimeSec: 80,
  scene: ({ diff, anim, rand, extra }) => {
    const hopping = anim({ id: 'roo', type: 'path', points: [[0, 0], [30, -16], [60, 0]], period: 2.4 }, kangaroo(650, 236))
    let tufts = ''
    for (let i = 0; i < 34; i++) {
      const x = rand() * 790 + 5
      const y = 350 + rand() * 145
      tufts += `<path d="M${x.toFixed(1)} ${y.toFixed(1)}l3 -9l3 9l3 -11l3 11" fill="#b9a25e"/>`
    }
    return (
      `<rect width="800" height="500" fill="#f6e3bd"/><rect width="800" height="160" fill="#cde4ee"/><rect y="150" width="800" height="40" fill="#e6e6cf"/>` +
      `<circle cx="720" cy="70" r="40" fill="#ffd23f"/><circle cx="720" cy="70" r="52" fill="#ffd23f" fill-opacity="0.25"/>` +
      `<path d="M0 230Q160 170 330 210T620 196T800 210V260H0Z" fill="#d98c5f"/><path d="M0 262Q260 228 520 250T800 240V500H0Z" fill="#e0c98a"/>` +
      tufts +
      diff(644, 214, 34, hopping, kangaroo(650, 236), 'roo') +
      // Gum tree with the koala
      `<path d="M70 370Q76 260 92 190M88 240Q110 200 130 182M84 280Q50 240 40 210" stroke="#e9e4da" stroke-width="12" fill="none" stroke-linecap="round"/>` +
      `<g fill="#8aa37a"><circle cx="60" cy="150" r="40"/><circle cx="120" cy="130" r="44"/><circle cx="160" cy="168" r="30"/><circle cx="30" cy="196" r="28"/></g>` +
      `<path d="M96 186Q118 182 150 176" stroke="#e9e4da" stroke-width="8" fill="none" stroke-linecap="round"/>` +
      diff(124, 168, 22, koala(124, 184), '') +
      // Water tank on its stand, the tap on B missing
      `<path d="M156 360V300M204 360V300M156 330H204" stroke="#8a5a33" stroke-width="5"/>` +
      `<rect x="150" y="236" width="60" height="64" fill="#c9d1d9"/><path d="M150 236L180 222L210 236Z" fill="#adb5bd"/>` +
      `<path d="M158 238V300M168 238V300M178 238V300M188 238V300M198 238V300" stroke="#adb5bd" stroke-width="2"/>` +
      diff(216, 294, 22, `<path d="M210 292h10v8" stroke="#6c757d" stroke-width="4" fill="none"/><rect x="214" y="285" width="12" height="4" rx="2" fill="#e63946"/>`, '') +
      // Shearing shed
      `<rect x="270" y="200" width="290" height="140" fill="#a0703f"/><rect x="290" y="220" width="250" height="120" fill="#5e4630"/>` +
      `<path d="M256 204L415 146L574 204Z" fill="#b8c2cc"/><path d="M276 196L415 146M300 205L415 158M360 205L415 168M470 205L415 168M530 205L415 158M554 196L415 146" stroke="#9aa5b1" stroke-width="2"/>` +
      `<rect x="290" y="320" width="250" height="20" fill="#c9a26b"/><path d="M290 220H540" stroke="#3d2a1a" stroke-width="6"/>` +
      `<circle cx="480" cy="250" r="21" fill="#3d2a1a" stroke="#8d99ae" stroke-width="3"/>` +
      diff(480, 250, 24, fanBlades(480, 250), anim({ type: 'rotate', pivot: [480, 250], period: 1.2 }, fanBlades(480, 250))) +
      `<path d="M300 220V230" stroke="#8d99ae" stroke-width="2"/><circle cx="300" cy="240" r="10" fill="#f4f1e8" stroke="#3d4a55" stroke-width="2"/>` +
      diff(300, 240, 22, needle(300, 240, -40), needle(300, 240, 50)) +
      shearer(360, 338) + diff(360, 278, 22, hat(360, 338, '#c9a26b'), hat(360, 338, '#3d4a55')) +
      shornSheep(406, 338) + diff(452, 330, 22, fleece(452, 338), '') +
      `<rect x="496" y="290" width="44" height="48" rx="3" fill="#e9dcc4"/><path d="M496 302H540M496 326H540" stroke="#a0703f" stroke-width="2"/>` +
      diff(518, 314, 22, `<path d="M518 306l8 8l-8 8l-8 -8Z" fill="#3a86ff"/>`, `<path d="M518 306l8 8l-8 8l-8 -8Z" fill="#e63946"/>`) +
      // Pen with its gate
      `<rect x="10" y="384" width="290" height="8" fill="#a0703f"/><rect x="10" y="407" width="290" height="8" fill="#a0703f"/>` +
      [14, 54, 94, 134, 174, 214, 254].map((x) => `<rect x="${x}" y="369" width="14" height="60" rx="3" fill="#8a5a33"/>`).join('') +
      `<rect x="300" y="380" width="40" height="8" fill="#c68b4e"/><rect x="300" y="403" width="40" height="8" fill="#c68b4e"/><path d="M300 380L340 411" stroke="#c68b4e" stroke-width="6"/>` +
      `<rect x="340" y="370" width="10" height="60" rx="3" fill="#8a5a33"/>` +
      diff(334, 396, 22, `<path d="M330 392h14" stroke="#3d4a55" stroke-width="4" stroke-linecap="round"/>`, `<path d="M336 386v16" stroke="#3d4a55" stroke-width="4" stroke-linecap="round"/>`) +
      sheep(70, 450) + sheep(176, 466, true, '#ece6da') + sheep(250, 446) +
      // The emu, the quad bike and its trailer with the dog
      emuBody(616, 396) + diff(634, 304, 22, emuHead(634, 304, true), emuHead(634, 304, false)) +
      `<rect x="560" y="442" width="70" height="26" rx="3" fill="#8d99ae"/><path d="M630 456H652" stroke="#3d4a55" stroke-width="3"/><circle cx="594" cy="472" r="9" fill="#2b2b2b"/>` +
      collie(590, 442) +
      quad(700, 486) + diff(734, 406, 22, anim({ type: 'sway', angle: 22, pivot: [728, 406], period: 0.9 }, flag(728, 406)), flag(728, 406)) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['feather', 420, 470],
        ['stones', 500, 478],
        ['horseshoe', 30, 380],
        ['grass', 230, 360],
        ['birds', 420, 70],
      ])
    )
  },
})
