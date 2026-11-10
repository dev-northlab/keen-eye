// Vineyard: grape harvest among the farm's ten hardest (hidden until released, levels/upcoming.ts). New on the
// farm: a stone winery with a bell tower, barrels, a wine press, vine rows on wires, grape pickers with hods, a
// vineyard tractor's trailer of grapes, a pheasant, a lizard, a bird-scaring pinwheel and a hot-air balloon.
// Motion differences: the balloon drifts only on picture A; the bird on the wire pecks and the pinwheel spins
// only on B and A respectively.
import { bird } from '../chapter-03/shapes.ts'
import { person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { basket, cloud, tractor } from '../shapes.ts'

/** Hot-air balloon; (x, y) = envelope center. Bounds: x ±18, y from −22 to +28. */
const balloon = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-8 14L-4 22M8 14L4 22" stroke="#6b4a2b" stroke-width="1.2"/><rect x="-5" y="22" width="10" height="6" fill="#a0703f"/>` +
  `<ellipse cy="-2" rx="17" ry="20" fill="#e63946"/><path d="M-6 -21Q-12 -2 -6 17M6 -21Q12 -2 6 17" stroke="#ffd23f" stroke-width="4" fill="none"/>` +
  `<path d="M0 -22V18" stroke="#ffffff" stroke-width="3"/></g>`

/** Bell in its arch; (x, y) = center. Bounds: x ±6, y ±7. */
const bell = (x: number, y: number) =>
  `<path d="M${x - 6} ${y + 5}Q${x - 6} ${y - 7} ${x} ${y - 7}Q${x + 6} ${y - 7} ${x + 6} ${y + 5}Z" fill="#d9a400"/><circle cx="${x}" cy="${y + 6}" r="2" fill="#a07800"/>`

/** Stone winery with a bell tower (bell separate) and an arched door; (x, y) = bottom left, 220 wide. Bounds: y from −202 to 0. */
const winery = (x: number, y: number) => {
  let stones = ''
  for (let i = 0; i < 16; i++) stones += `<rect x="${x + 8 + ((i * 41) % 196)}" y="${y - 118 + ((i * 29) % 104)}" width="16" height="8" rx="2" fill="#cdb98f"/>`
  return (
    `<rect x="${x + 38}" y="${y - 190}" width="26" height="54" fill="#e3d3b0"/><path d="M${x + 36} ${y - 190}L${x + 51} ${y - 202}L${x + 66} ${y - 190}Z" fill="#c8623b"/>` +
    `<path d="M${x + 44} ${y - 158}v-16a7 7 0 0 1 14 0v16Z" fill="#5e4630"/>` +
    `<rect x="${x}" y="${y - 130}" width="220" height="130" fill="#e3d3b0"/>${stones}` +
    `<path d="M${x - 10} ${y - 126}L${x + 110} ${y - 170}L${x + 230} ${y - 126}Z" fill="#c8623b"/>` +
    `<path d="M${x + 120} ${y}V${y - 50}a20 20 0 0 1 40 0V${y}Z" fill="#7a4a24"/><path d="M${x + 140} ${y - 70}V${y}" stroke="#5e3b1a" stroke-width="2"/>` +
    `<rect x="${x + 30}" y="${y - 96}" width="22" height="26" fill="#5e4630"/><rect x="${x + 180}" y="${y - 96}" width="22" height="26" fill="#5e4630"/>` +
    `<path d="M${x + 26} ${y - 70}h30M${x + 176} ${y - 70}h30" stroke="#a0703f" stroke-width="4"/>`
  )
}

/** Barrel seen end-on; (x, y) = center. Bounds: radius 18. */
const barrel = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="17" fill="#a0703f"/><circle cx="${x}" cy="${y}" r="13" fill="none" stroke="#5e3b1a" stroke-width="2"/>` +
  `<circle cx="${x}" cy="${y}" r="5" fill="none" stroke="#7a5230" stroke-width="1.5"/>`

/** Wine press tub and screw, the bar on top separate (`pressBar`); (x, y) = bottom center. Bounds: x ±32, y from −76 to 0. */
const press = (x: number, y: number) =>
  `<rect x="${x - 3}" y="${y - 74}" width="6" height="40" fill="#6c757d"/><path d="M${x - 3} ${y - 66}l6 -4M${x - 3} ${y - 58}l6 -4M${x - 3} ${y - 50}l6 -4" stroke="#adb5bd" stroke-width="1.5"/>` +
  `<rect x="${x - 30}" y="${y - 40}" width="60" height="40" rx="3" fill="#a0703f"/>` +
  `<path d="M${x - 20} ${y - 40}V${y}M${x - 10} ${y - 40}V${y}M${x} ${y - 40}V${y}M${x + 10} ${y - 40}V${y}M${x + 20} ${y - 40}V${y}" stroke="#7a5230" stroke-width="2"/>` +
  `<rect x="${x - 32}" y="${y - 34}" width="64" height="4" fill="#3d4a55"/><rect x="${x - 32}" y="${y - 10}" width="64" height="4" fill="#3d4a55"/>` +
  `<rect x="${x - 26}" y="${y - 44}" width="52" height="6" fill="#7a5230"/>`

/** The press's turning bar, centered at (x, y), turned by `angle`. Bounds: radius 22. */
const pressBar = (x: number, y: number, angle: number) =>
  `<g transform="rotate(${angle} ${x} ${y})"><rect x="${x - 22}" y="${y - 2.5}" width="44" height="5" rx="2" fill="#5e3b1a"/><circle cx="${x}" cy="${y}" r="4" fill="#3d4a55"/></g>`

/** Grape bunch; (x, y) = top center (on the wire). Bounds: x ±8, y from 0 to +20. */
const grapes = (x: number, y: number, color: string) => {
  let s = ''
  for (const [dx, dy] of [[-5, 4], [0, 4], [5, 4], [-3, 9], [3, 9], [0, 14], [0, 19]]) s += `<circle cx="${x + dx}" cy="${y + dy}" r="3.4" fill="${color}"/>`
  return `<path d="M${x} ${y}v3" stroke="#6b4a2b" stroke-width="1.5"/>` + s
}

/** Row of vines on a wire at height y from x0 to x1, posts every 70; grape bunches at `bunches` (x), skipping `skip`. */
const vineRow = (x0: number, x1: number, y: number, bunches: number[], skip: number, color = '#5b2a6e') => {
  let s = `<path d="M${x0} ${y}H${x1}" stroke="#8d99ae" stroke-width="1.5"/>`
  for (let x = x0 + 10; x < x1; x += 70) s += `<rect x="${x - 3}" y="${y - 20}" width="6" height="44" fill="#8a5a33"/>`
  for (let x = x0 + 6; x < x1; x += 22) s += `<circle cx="${x}" cy="${y - 6}" r="12" fill="#5fa04b"/><circle cx="${x + 8}" cy="${y - 12}" r="8" fill="#76b85c"/>`
  for (const bx of bunches) if (bx !== skip) s += grapes(bx, y + 2, color)
  return s
}

/** Wicker hod on a picker's back with grapes on top; (x, y) = its center. Bounds: x ±10, y ±16. */
const hod = (x: number, y: number) =>
  `<path d="M${x - 9} ${y - 12}h18l-3 28h-12Z" fill="#c68b4e"/><path d="M${x - 8} ${y - 4}h16M${x - 7} ${y + 6}h14" stroke="#9c6a37" stroke-width="2"/>` +
  `<g fill="#5b2a6e"><circle cx="${x - 4}" cy="${y - 13}" r="4"/><circle cx="${x + 3}" cy="${y - 14}" r="4"/></g>`

/** Pinwheel blades; (x, y) = hub. Bounds: radius 15. */
const pinwheel = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  ['#e63946', '#ffd23f', '#3a86ff', '#8ac926'].map((c, i) => `<path d="M0 0L0 -15L10 -7Z" fill="${c}" transform="rotate(${i * 90})"/>`).join('') +
  `<circle r="2.5" fill="#3d4a55"/></g>`

/** Pheasant without its tail (`pheasantTail`), faces right; (x, y) = feet. Bounds: x from −14 to +22, y from −30 to 0. */
const pheasant = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-2 -8V0M6 -8V0" stroke="#7a5230" stroke-width="2"/>` +
  `<ellipse cx="2" cy="-14" rx="14" ry="9" fill="#c0632b"/><path d="M-6 -16q6 -4 12 0" stroke="#7a3a1a" stroke-width="2" fill="none"/>` +
  `<path d="M10 -18Q14 -26 16 -28" stroke="#1f6f4a" stroke-width="6" stroke-linecap="round"/><circle cx="17" cy="-28" r="4.5" fill="#1f6f4a"/>` +
  `<ellipse cx="18" cy="-28" rx="2.5" ry="3" fill="#e63946"/><path d="M21 -28l3 1l-3 1Z" fill="#e9c46a"/><path d="M10 -19h8" stroke="#ffffff" stroke-width="1.5"/></g>`

/** Pheasant tail, long or short, for a pheasant at (x, y). Bounds: x from −50 to −10, y from −28 to −10. */
const pheasantTail = (x: number, y: number, long: boolean) =>
  `<path d="M${x - 10} ${y - 16}L${x - (long ? 50 : 30)} ${y - (long ? 28 : 22)}L${x - 10} ${y - 11}Z" fill="#a0632b"/>` +
  `<path d="M${x - 12} ${y - 14}L${x - (long ? 46 : 28)} ${y - (long ? 25 : 20)}" stroke="#5e3b1a" stroke-width="1.5"/>`

/** Lizard on a wall, head up; (x, y) = center. Bounds: x ±10, y ±16. */
const lizard = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#5fae4b"><path d="M0 4Q-2 12 4 16" stroke="#5fae4b" stroke-width="3" fill="none" stroke-linecap="round"/>` +
  `<ellipse rx="4" ry="8"/><circle cy="-10" r="4"/><path d="M-3 -4l-6 -3M3 -4l6 -3M-3 4l-6 3M3 4l6 3" stroke="#5fae4b" stroke-width="2"/>` +
  `<circle cx="-1.5" cy="-11" r="0.9" fill="#222"/><circle cx="1.5" cy="-11" r="0.9" fill="#222"/></g>`

/** Cypress; (x, y) = foot. Bounds: x ±11, y from −90 to 0. */
const cypress = (x: number, y: number) => `<ellipse cx="${x}" cy="${y - 45}" rx="11" ry="45" fill="#2f6b45"/><rect x="${x - 2}" y="${y - 6}" width="4" height="6" fill="#6b4a2b"/>`

export default svgLevel({
  id: 154,
  chapter: 'farm',
  title: 'vineyard',
  parTimeSec: 82,
  scene: ({ diff, anim, extra }) => {
    const drifting = anim({ id: 'balloon', type: 'path', points: [[0, 0], [-40, -10], [-80, 0]], period: 14 }, balloon(620, 78))
    let farRows = ''
    for (let i = 0; i < 9; i++) farRows += `<path d="M${-40 + i * 100} 300Q${i * 100} 250 ${60 + i * 100} 230" stroke="#86b35f" stroke-width="6" fill="none"/>`
    return (
      `<rect width="800" height="500" fill="#d6ecf5"/>` +
      `<circle cx="150" cy="58" r="34" fill="#ffd23f"/><circle cx="150" cy="58" r="46" fill="#ffd23f" fill-opacity="0.25"/>` +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 26 }, cloud(420, 60, 0.6)) +
      diff(620, 78, 28, drifting, balloon(620, 78), 'balloon') +
      `<path d="M0 250Q200 196 420 226T800 210V340H0Z" fill="#a9c97a"/>` + farRows +
      cypress(320, 236) + cypress(342, 230) + cypress(560, 222) + cypress(780, 214) +
      `<rect y="326" width="800" height="24" fill="#d9c39a"/><rect y="350" width="800" height="150" fill="#9bc76a"/>` +
      // Winery with its bell, the lizard on the wall, barrels
      winery(30, 330) + diff(81, 166, 22, bell(81, 166), '') + diff(64, 280, 22, lizard(64, 280), '') +
      barrel(262, 314) + barrel(298, 314) + barrel(280, 284) +
      diff(298, 322, 22, `<rect x="294" y="318" width="8" height="6" fill="#adb5bd"/><path d="M298 324v6" stroke="#adb5bd" stroke-width="3"/>`, '') +
      // Wine press
      press(370, 340) + diff(370, 266, 24, pressBar(370, 266, 0), pressBar(370, 266, 50)) +
      // Tractor with its trailer of grapes
      `<rect x="540" y="296" width="86" height="34" rx="3" fill="#a0703f"/><circle cx="560" cy="334" r="9" fill="#2b2b2b"/><circle cx="604" cy="334" r="9" fill="#2b2b2b"/>` +
      `<g fill="#5b2a6e"><circle cx="552" cy="294" r="7"/><circle cx="566" cy="290" r="8"/><circle cx="582" cy="292" r="8"/><circle cx="598" cy="290" r="8"/><circle cx="614" cy="294" r="7"/></g>` +
      `<path d="M626 318H640" stroke="#3d4a55" stroke-width="4"/>` +
      tractor(690, 346, '#3a86ff') + diff(746, 308, 22, `<circle cx="746" cy="306" r="5" fill="#fff3b0" stroke="#3d4a55" stroke-width="1.5"/>`, '') +
      // Vine rows, the bird on the wire, the pickers
      vineRow(400, 800, 368, [430, 515, 600, 655, 725], 600) +
      diff(600, 380, 22, grapes(600, 370, '#5b2a6e'), grapes(600, 370, '#9bc54a')) +
      diff(540, 360, 22, bird(540, 366, '#5e4630'), anim({ type: 'bob', dx: 3, dy: 3, period: 0.6 }, bird(540, 366, '#5e4630'))) +
      person(476, 436, '#8ac926', false, '#e0b48a', '#2b2b2b') + diff(459, 394, 22, hod(459, 394), '') +
      `<path d="M360 470V398" stroke="#6b4a2b" stroke-width="3"/>` +
      diff(360, 390, 22, anim({ type: 'rotate', pivot: [360, 390], period: 1.5 }, pinwheel(360, 390)), pinwheel(360, 390)) +
      pheasant(100, 412) + diff(70, 394, 26, pheasantTail(100, 412, true), pheasantTail(100, 412, false)) +
      vineRow(0, 800, 452, [40, 130, 290, 380, 520, 610, 700, 780], -1) +
      person(240, 498, '#ff006e', true, '#c68b5e', '#5a3d2b') + basket(196, 496, '#5b2a6e') +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['snail', 300, 480],
        ['ladybug', 560, 486],
        ['bee', 700, 420],
        ['stones', 760, 484],
        ['butterfly', 190, 380, '#ff9f43'],
      ])
    )
  },
})
