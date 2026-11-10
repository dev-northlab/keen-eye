// Car ferry: a ferry terminal among the sea's ten hardest (hidden until released, levels/upcoming.ts). New in the
// sea: a car ferry with its bridge, funnel, lifeboat and stern flag, a ticket booth with a barrier, cars queuing
// on the quay (one with a roof box, one with a dog), a dock worker with a signal paddle and a channel buoy.
// Motion differences: the funnel smokes and the worker waves the paddle only on picture B; the barrier arm
// nods only on A.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { anchor, buoy, cloud, gullStanding, person } from './shapes.ts'

/** Car facing left; (x, y) = ground under its center. Bounds: x ±48, y from −46 to 0. */
const car = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><path d="M-48 -8V-24Q-46 -30 -36 -30L-26 -46H24L36 -30Q48 -30 48 -22V-8Z" fill="${color}"/>` +
  `<path d="M-20 -42H-2V-30H-28ZM4 -42H20L28 -30H4Z" fill="#bde3f2"/><rect x="-48" y="-12" width="96" height="4" fill="#3d4a55"/>` +
  `<circle cx="-28" cy="-8" r="8" fill="#2b2b2b"/><circle cx="28" cy="-8" r="8" fill="#2b2b2b"/><circle cx="-46" cy="-24" r="2.5" fill="#fff3b0"/></g>`

/** Dog's head looking out of a car window; (x, y) = chin. Bounds: x ±9, y from −16 to 0. */
const dogHead = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><circle cy="-8" r="7" fill="#c98a52"/><path d="M-7 -12q-4 6 -1 10l3 -6Z" fill="#8a5a33"/><ellipse cx="-6" cy="-5" rx="3" ry="2.4" fill="#e0b97a"/>` +
  `<circle cx="-8" cy="-6" r="1.2" fill="#222"/><circle cx="-2" cy="-10" r="1.2" fill="#222"/></g>`

export default svgLevel({
  id: 183,
  chapter: 'sea',
  title: 'carFerry',
  parTimeSec: 102,
  scene: ({ diff, anim, extra }) => {
    const smoke = `<circle cx="514" cy="188" r="9" fill="#e9edf2" fill-opacity="0.9"/><circle cx="528" cy="174" r="11" fill="#e9edf2" fill-opacity="0.75"/>`
    const barrier = `<path d="M130 452H210" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/><path d="M146 452h12M174 452h12M200 452h8" stroke="#e63946" stroke-width="6"/>`
    const paddle = `<path d="M632 440V414" stroke="#3d4a55" stroke-width="3"/><circle cx="632" cy="408" r="9" fill="#e63946"/><path d="M626 408h12" stroke="#ffffff" stroke-width="3"/>`
    let portholes = ''
    for (let x = 300; x <= 600; x += 30) portholes += `<circle cx="${x}" cy="314" r="4" fill="#bde3f2" stroke="#1d3557" stroke-width="1.5"/>`
    return (
      `<rect width="800" height="500" fill="#d6ecf5"/>` +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(150, 80, 0.7)) +
      anim({ type: 'path', points: [[0, 0], [-40, 0]], period: 34 }, cloud(690, 70, 0.55)) +
      `<path d="M0 232Q120 200 260 220Q420 196 560 222Q700 204 800 222V236H0Z" fill="#9cc5a1"/>` +
      `<rect y="232" width="800" height="170" fill="#3b8fb0"/>` +
      anim({ type: 'path', points: [[0, 0], [24, 0]], period: 6 }, `<path d="M40 270h40M680 268h40M120 380h50M690 380h40" stroke="#ffffff" stroke-opacity="0.45" stroke-width="3" stroke-linecap="round"/>`) +
      // Channel buoy
      diff(100, 323, 22, buoy(100, 330, '#2a9d8f'), buoy(100, 330, '#e63946')) +
      // The ferry: hull with its anchor, decks, bridge windows, lifeboat, funnel smoke, stern flag
      `<path d="M196 300H640L626 352H214Z" fill="#f4f1e8"/><path d="M203 326H633L626 352H214Z" fill="#1d3557"/>` + portholes +
      diff(250, 314, 22, anchor(250, 314, '#5c677d'), '') +
      `<rect x="240" y="262" width="380" height="38" fill="#ffffff"/><rect x="250" y="272" width="360" height="16" fill="#bde3f2"/>` +
      `<path d="M290 272v16M330 272v16M370 272v16M410 272v16M450 272v16M490 272v16M530 272v16M570 272v16" stroke="#ffffff" stroke-width="3"/>` +
      `<rect x="260" y="222" width="100" height="40" fill="#ffffff"/><rect x="254" y="218" width="112" height="6" fill="#1d3557"/>` +
      `<rect x="268" y="228" width="12" height="12" fill="#1d3557"/><rect x="286" y="228" width="12" height="12" fill="#1d3557"/><rect x="304" y="228" width="12" height="12" fill="#1d3557"/>` +
      diff(330, 234, 22, `<rect x="322" y="228" width="12" height="12" fill="#1d3557"/>`, '') +
      `<path d="M400 262V244M440 262V244" stroke="#5c677d" stroke-width="2"/>` +
      diff(420, 252, 28, `<ellipse cx="420" cy="252" rx="26" ry="8" fill="#ff9f43"/><rect x="408" y="244" width="24" height="5" rx="2" fill="#ffffff"/>`, `<ellipse cx="420" cy="252" rx="26" ry="8" fill="#ffd23f"/><rect x="408" y="244" width="24" height="5" rx="2" fill="#ffffff"/>`) +
      `<rect x="500" y="200" width="40" height="62" fill="#ffffff"/><rect x="500" y="212" width="40" height="12" fill="#e63946"/><rect x="500" y="198" width="40" height="7" fill="#2b2b2b"/>` +
      diff(520, 180, 28, smoke, anim({ type: 'bob', dx: 2, dy: -4, period: 1.8 }, smoke)) +
      `<path d="M632 300V224" stroke="#5c677d" stroke-width="2"/>` +
      diff(642, 234, 22, `<path d="M633 226h20v14h-20Z" fill="#3a86ff"/><path d="M633 233h20" stroke="#ffd23f" stroke-width="3"/>`, `<path d="M633 226h20v14h-20Z" fill="#3a86ff"/><path d="M643 226v14" stroke="#ffd23f" stroke-width="3"/>`) +
      // The quay
      `<rect y="400" width="800" height="100" fill="#9aa5b1"/><rect y="398" width="800" height="10" fill="#5c677d"/><path d="M250 492l40 -60M560 492l40 -60" stroke="#ffd23f" stroke-width="3"/>` +
      // Ticket booth and its barrier
      `<rect x="30" y="406" width="80" height="70" fill="#f4f1e8"/><rect x="24" y="398" width="92" height="10" fill="#1d3557"/><rect x="44" y="418" width="52" height="26" fill="#bde3f2"/>` +
      `<circle cx="70" cy="438" r="7" fill="#e0b48a"/><rect x="120" y="440" width="18" height="40" fill="#e63946"/>` +
      diff(170, 450, 46, anim({ type: 'sway', angle: 10, pivot: [130, 452], period: 3 }, barrier), barrier) +
      // Cars waiting: the roof box, the dog
      car(330, 478, '#8ac926') + diff(330, 428, 22, `<rect x="310" y="424" width="40" height="9" rx="4" fill="#2b2b2b"/><path d="M314 433v-2M346 433v-2" stroke="#2b2b2b" stroke-width="2"/>`, '') +
      car(480, 478, '#ff6b8b') + diff(496, 442, 22, dogHead(496, 450), '') +
      // Dock worker with his paddle, gull on a bollard
      person(620, 476, '#ff9f43', true, '#e0b48a', '#2b2b2b') + `<path d="M612 440h20" stroke="#ffd23f" stroke-width="3"/>` +
      diff(632, 414, 28, paddle, anim({ type: 'sway', angle: 14, pivot: [632, 440], period: 1.2 }, paddle)) +
      `<rect x="732" y="392" width="16" height="14" rx="3" fill="#3d4a55"/>` +
      diff(740, 384, 22, gullStanding(740, 392, true), '') +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['gull', 300, 100],
        ['buoy', 690, 320, '#ffd23f'],
        ['fish', 380, 380],
        ['lifeRing', 70, 462],
        ['crab', 410, 470],
      ])
    )
  },
})
