// Zoo gate: the city zoo's entrance, the city's hardest scene (hidden until released, levels/upcoming.ts). New in
// the city: a zoo gate with a lion sign and a parrot, a giraffe and an elephant behind the fence, a ticket booth,
// a zoo map, flamingos in a pond, a little zoo train, a balloon seller, a child with an ice cream and a keeper.
// Motion differences: the giraffe nods and the balloons sway only on picture A; the elephant swings its trunk
// only on B.
import { oak } from '../chapter-03/shapes.ts'
import { person } from './shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cloud } from '../shapes.ts'

/** Giraffe behind the fence without its head (`giraffeHead`); (x, y) = feet. Bounds: x from −50 to +40, y from −190 to 0. */
const giraffe = (x: number, y: number) => {
  let spots = ''
  for (const [dx, dy] of [[-30, -86], [-12, -92], [6, -84], [-20, -76], [14, -100], [22, -130], [26, -160]]) spots += `<ellipse cx="${x + dx}" cy="${y + dy}" rx="6" ry="5" fill="#c0632b"/>`
  return `<path d="M${x - 36} ${y}V${y - 70}M${x - 20} ${y}V${y - 70}M${x + 6} ${y}V${y - 70}M${x + 20} ${y}V${y - 70}" stroke="#f2c14e" stroke-width="8"/>` +
    `<ellipse cx="${x - 8}" cy="${y - 86}" rx="42" ry="22" fill="#f2c14e"/><path d="M${x + 10} ${y - 96}L${x + 22} ${y - 182}H${x + 36}L${x + 34} ${y - 90}Z" fill="#f2c14e"/>${spots}`
}
/** Giraffe head at the top of its neck (x, y). Bounds: x from −10 to +26, y from −22 to +10. */
const giraffeHead = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M0 -14v-8M8 -14v-8" stroke="#a0632b" stroke-width="3"/><circle cy="-22" r="2.5" fill="#5e3b1a"/><circle cx="8" cy="-22" r="2.5" fill="#5e3b1a"/>` +
  `<ellipse cx="8" cy="-4" rx="16" ry="9" fill="#f2c14e"/><ellipse cx="20" cy="0" rx="6" ry="5" fill="#e0a84a"/><circle cx="6" cy="-8" r="1.8" fill="#222"/><path d="M-6 -10l-4 -4l6 1Z" fill="#f2c14e"/></g>`

/** Elephant behind the fence without its trunk (`trunk`), faces left; (x, y) = feet. Bounds: x from −46 to +56, y from −110 to 0. */
const elephant = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-30" y="-40" width="16" height="40" fill="#8d99ae"/><rect x="24" y="-40" width="16" height="40" fill="#8d99ae"/>` +
  `<ellipse cx="10" cy="-58" rx="46" ry="34" fill="#9aa5b1"/><circle cx="-26" cy="-78" r="24" fill="#9aa5b1"/><ellipse cx="-10" cy="-78" rx="16" ry="22" fill="#8d99ae"/>` +
  `<circle cx="-34" cy="-82" r="2.5" fill="#222"/><path d="M-40 -66q-6 6 -2 10" stroke="#f4f1e8" stroke-width="4" fill="none"/></g>`
const trunk = (x: number, y: number) => `<path d="M${x - 40} ${y - 70}Q${x - 52} ${y - 46} ${x - 44} ${y - 26}" stroke="#6c7783" stroke-width="11" fill="none" stroke-linecap="round"/>`

/** Flamingo on one leg, faces left; (x, y) = foot. Bounds: x from −16 to +14, y from −64 to 0. */
const flamingo = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M0 0V-26M0 -18l8 -6" stroke="#f08ca0" stroke-width="2.5"/><ellipse cx="2" cy="-32" rx="12" ry="8" fill="#ff8fab"/>` +
  `<path d="M-6 -34Q-14 -46 -6 -54Q2 -60 -4 -64" stroke="#ff8fab" stroke-width="3.5" fill="none"/><circle cx="-4" cy="-62" r="3.5" fill="#ff8fab"/><path d="M-7 -62l-6 4l4 -6Z" fill="#2b2b2b"/></g>`

/** Parrot perched, faces right; (x, y) = feet. Bounds: x ±10, y from −24 to 0. */
const parrot = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-2 -6l-4 10l4 -2l2 4Z" fill="#3a86ff"/><ellipse cy="-11" rx="6" ry="9" fill="#e63946"/><path d="M-4 -12q-2 8 4 10" fill="#ffd23f"/>` +
  `<circle cx="2" cy="-20" r="5" fill="#e63946"/><path d="M6 -21q4 0 3 4l-3 -1Z" fill="#2b2b2b"/><circle cx="3" cy="-21" r="1.2" fill="#ffffff"/></g>`

/** Lion head icon; (x, y) = center. Bounds: radius 14. */
const lionIcon = (x: number, y: number, mane: string) =>
  `<circle cx="${x}" cy="${y}" r="14" fill="${mane}"/><circle cx="${x}" cy="${y}" r="8" fill="#f2c14e"/><circle cx="${x - 3}" cy="${y - 2}" r="1.3" fill="#222"/><circle cx="${x + 3}" cy="${y - 2}" r="1.3" fill="#222"/><path d="M${x - 2} ${y + 3}h4l-2 2Z" fill="#5e3b1a"/>`

/** Bunch of balloons on strings tied at (x, y). Bounds: x ±32, y from −84 to 0. */
const balloonBunch = (x: number, y: number) =>
  [[-22, -64, '#e63946'], [0, -74, '#ffd23f'], [22, -64, '#3a86ff'], [-10, -50, '#8ac926'], [12, -50, '#ff006e']]
    .map(([dx, dy, c]) => `<path d="M${x} ${y}L${x + Number(dx)} ${y + Number(dy) + 10}" stroke="#8d99ae" stroke-width="1"/><ellipse cx="${x + Number(dx)}" cy="${y + Number(dy)}" rx="9" ry="11" fill="${c}"/>`)
    .join('')

/** Ice cream cone held up at (x, y). Bounds: x ±7, y from −14 to +12. */
const iceCream = (x: number, y: number, scoop: string) => `<path d="M${x - 5} ${y}L${x} ${y + 12}L${x + 5} ${y}Z" fill="#e0a84a"/><circle cx="${x}" cy="${y - 4}" r="6.5" fill="${scoop}"/>`

/** Keeper's hat for a person at (x, y). Bounds: x ±14, y from −70 to −58. */
const keeperHat = (x: number, y: number) => `<path d="M${x - 14} ${y - 58}h28l-4 -3v-8h-20v8Z" fill="#6b8e23"/>`

export default svgLevel({
  id: 170,
  chapter: 'city',
  title: 'zooGate',
  parTimeSec: 100,
  scene: ({ diff, anim, extra }) => {
    let bars = ''
    for (let x = 6; x < 800; x += 14) if (x < 330 || x > 470) bars += `<rect x="${x}" y="236" width="4" height="96" fill="#3d4a55"/>`
    return (
      `<rect width="800" height="500" fill="#cfe8f7"/>` +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(560, 60, 0.6)) +
      oak(60, 240, 1.1, '#5fa04b') + oak(300, 236, 0.9, '#4c9a3f') + oak(520, 238, 1, '#5fa04b') + oak(760, 236, 1.1, '#4c9a3f') +
      `<rect y="230" width="800" height="102" fill="#a9cf7a"/>` +
      // Giraffe and elephant behind the fence
      giraffe(150, 330) + diff(182, 150, 28, anim({ type: 'sway', angle: 10, pivot: [176, 156], period: 1.6 }, giraffeHead(176, 156)), giraffeHead(176, 156)) +
      elephant(650, 330) + diff(604, 286, 32, trunk(650, 330), anim({ type: 'sway', angle: 14, pivot: [610, 260], period: 2.2 }, trunk(650, 330))) +
      bars + `<rect y="228" width="330" height="8" fill="#3d4a55"/><rect x="470" y="228" width="330" height="8" fill="#3d4a55"/>` +
      // Gate: lion sign, parrot; ticket booth with its flag; zoo map
      `<rect x="326" y="160" width="22" height="172" fill="#8a5a33"/><rect x="452" y="160" width="22" height="172" fill="#8a5a33"/>` +
      `<path d="M316 168Q400 120 484 168V190Q400 144 316 190Z" fill="#a0703f"/><circle cx="400" cy="160" r="20" fill="#ffd23f"/>` +
      diff(400, 160, 22, lionIcon(400, 160, '#c96a1f'), lionIcon(400, 160, '#7a3a1a')) +
      diff(342, 136, 22, parrot(342, 150), '') +
      `<rect x="214" y="250" width="72" height="82" fill="#f4d6a0"/><rect x="226" y="266" width="48" height="30" fill="#bde3f2"/><path d="M208 252L250 230L292 252Z" fill="#2a9d8f"/><path d="M250 230V208" stroke="#3d4a55" stroke-width="2"/>` +
      diff(260, 214, 22, `<path d="M250 208h20l-6 6l6 6h-20Z" fill="#e63946"/>`, '') +
      `<path d="M540 332V306" stroke="#6b4a2b" stroke-width="4"/><rect x="510" y="256" width="60" height="52" rx="3" fill="#f4f1e8" stroke="#6b4a2b" stroke-width="3"/>` +
      `<g fill="#a9cf7a"><circle cx="522" cy="268" r="5"/><circle cx="556" cy="296" r="6"/></g><circle cx="560" cy="268" r="5" fill="#6cc3e8"/>` +
      diff(540, 282, 30, `<path d="M516 296Q530 270 544 284T564 266" stroke="#e63946" stroke-width="3" fill="none" stroke-dasharray="4 3"/>`, `<path d="M516 296Q530 270 544 284T564 266" stroke="#3a86ff" stroke-width="3" fill="none" stroke-dasharray="4 3"/>`) +
      // Plaza, the flamingo pond
      `<rect y="332" width="800" height="168" fill="#e9dcc4"/><ellipse cx="712" cy="428" rx="84" ry="28" fill="#6cc3e8"/>` +
      flamingo(670, 430) + flamingo(704, 426) + diff(745, 400, 34, flamingo(746, 432), '') +
      // People: keeper, balloon seller, child with ice cream
      person(480, 420, '#6b8e23', false, '#c68b5e', '#2b2b2b') + diff(480, 356, 22, keeperHat(480, 420), '') +
      person(110, 492, '#ffb703', false, '#e0b48a', '#5a3d2b') + `<path d="M120 452L124 424" stroke="#ffb703" stroke-width="4" stroke-linecap="round"/>` +
      diff(124, 380, 48, anim({ type: 'sway', angle: 8, pivot: [124, 424], period: 2 }, balloonBunch(124, 424)), balloonBunch(124, 424)) +
      person(300, 492, '#8ac926', false, '#f2d29b', '#c0392b') + `<path d="M310 452l6 -10" stroke="#f2d29b" stroke-width="4" stroke-linecap="round"/>` +
      diff(316, 438, 22, iceCream(316, 440, '#ff8fab'), iceCream(316, 440, '#8b5a2b')) +
      // Zoo train
      `<path d="M0 494H800" stroke="#8d99ae" stroke-width="4"/>` +
      `<rect x="380" y="456" width="70" height="30" rx="6" fill="#e63946"/><rect x="420" y="436" width="30" height="24" fill="#e63946"/><rect x="424" y="440" width="22" height="12" fill="#bde3f2"/>` +
      `<circle cx="398" cy="488" r="8" fill="#2b2b2b"/><circle cx="436" cy="488" r="8" fill="#2b2b2b"/>` +
      diff(394, 448, 22, `<rect x="388" y="440" width="12" height="16" fill="#3d4a55"/><rect x="385" y="436" width="18" height="5" fill="#3d4a55"/>`, `<rect x="388" y="440" width="12" height="16" fill="#ffd23f"/><rect x="385" y="436" width="18" height="5" fill="#ffd23f"/>`) +
      [[456, '#3a86ff'], [542, '#8ac926']].map(([x, c]) => `<rect x="${x}" y="462" width="80" height="24" rx="4" fill="${c}"/><rect x="${Number(x) - 2}" y="446" width="84" height="6" fill="#f4f1e8"/><path d="M${Number(x) + 4} 452v10M${Number(x) + 76} 452v10" stroke="#f4f1e8" stroke-width="3"/><circle cx="${Number(x) + 18}" cy="488" r="7" fill="#2b2b2b"/><circle cx="${Number(x) + 62}" cy="488" r="7" fill="#2b2b2b"/>`).join('') +
      `<path d="M496 446V430" stroke="#3d4a55" stroke-width="2"/>` +
      diff(504, 434, 22, `<path d="M496 430h16l-5 5l5 5h-16Z" fill="#ffd23f"/>`, `<path d="M496 430h16l-5 5l5 5h-16Z" fill="#8338ec"/>`) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['pigeon', 200, 470],
        ['bin', 640, 494],
        ['coffeeCup', 250, 340],
        ['butterfly', 774, 300, '#ff9f43'],
        ['balloon', 600, 380, '#8338ec'],
      ])
    )
  },
})
