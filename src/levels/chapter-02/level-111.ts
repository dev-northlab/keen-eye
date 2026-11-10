// Motion differences: the walk signal blinks only on picture B; the rooftop flag flaps faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { awning, bike, bin, bollard, building, bus, car, cityTree, cloud, cone, hydrant, lampHead, lampPost, mailbox, newspaperBox, person, pigeon, shoppingBag, skateboard, skyline, trafficLight } from './shapes.ts'
import { level111Redesign } from './level-111-redesign.ts'

/** Wall clock; (x, y) = center, radius r. */
const clock = (x: number, y: number, r: number) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#fffaf0" stroke="#3d4a55" stroke-width="3"/>` +
  `<path d="M${x} ${y}V${y - r * 0.7}M${x} ${y}l${r * 0.45} ${r * 0.3}" stroke="#3d4a55" stroke-width="2" stroke-linecap="round"/>`

/** One-way sign on a pole pointing right (dir 1) or left (−1); (x, y) = sign center. Bounds: x ±16, y ±7. */
const oneWay = (x: number, y: number, dir: 1 | -1) =>
  `<g transform="translate(${x} ${y}) scale(${dir} 1)"><rect x="-16" y="-7" width="32" height="14" rx="2" fill="#2b2b2b"/>` +
  `<path d="M-11 0h16M2 -4l6 4l-6 4" stroke="#fff" stroke-width="2.5" fill="none"/></g>`

/** Flag on a rooftop pole, attached at (x, y). Bounds: x from 0 to +30, y from 0 to +18. */
const flag = (x: number, y: number) =>
  `<path d="M${x} ${y}h30l-6 9l6 9h-30Z" fill="#e63946"/><path d="M${x} ${y + 6}h28M${x} ${y + 12}h28" stroke="#fff" stroke-width="2"/>`

/** Walk signal box; (x, y) = box center; `lit` draws the green walker. Bounds: x ±8, y ±12. */
const walkBox = (x: number, y: number) =>
  `<rect x="${x - 8}" y="${y - 12}" width="16" height="24" rx="3" fill="#2b2b2b"/>`
const walker = (x: number, y: number) =>
  `<g transform="translate(${x} ${y + 4})" fill="#8ac926"><circle cy="-10" r="2"/><path d="M-1 -8h2l2 5l3 2l-1 1l-3 -2l1 4l2 5h-2l-2 -5l-2 5h-2l2 -6v-5l-2 2h-2Z"/></g>`

export default svgLevel({
  id: 111,
  chapter: 'city',
  title: 'rushHour',
  parTimeSec: 110,
  redesign: level111Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let zebra = ''
    for (let x = 344; x < 456; x += 16) zebra += `<rect x="${x}" y="336" width="9" height="120" fill="#f4f4f4"/>`
    let marks = ''
    for (let i = 0; i < 6; i++) marks += `<rect x="${30 + i * 50}" y="396" width="26" height="3" fill="#f4f4f4" fill-opacity="0.8"/><rect x="${480 + i * 52}" y="396" width="26" height="3" fill="#f4f4f4" fill-opacity="0.8"/>`
    let ac = ''
    for (const [x, y] of [[40, 150], [250, 180], [470, 140], [650, 210]]) ac += `<rect x="${x}" y="${y}" width="18" height="12" fill="#d9d2c5"/><path d="M${x + 3} ${y + 4}h12M${x + 3} ${y + 8}h12" stroke="#a8a091"/>`
    const flapping = (period: number) => anim({ type: 'sway', angle: 10, pivot: [712, 50], period }, flag(712, 50))

    return (
      `<rect width="800" height="500" fill="#cfe6f5"/>` +
      anim({ type: 'path', points: [[0, 0], [70, 0]], period: 34 }, cloud(250, 40, 0.5)) +
      skyline(rand, 110) +
      anim({ type: 'path', points: [[0, 0], [300, -10]], period: 16 }, `<path d="M120 60q5 -6 10 0q5 -6 10 0" stroke="#3d4a55" stroke-width="2" fill="none"/>`) +
      // Buildings
      building(0, 300, 150, 220, '#e07a5f') + building(150, 300, 150, 190, '#f2cc8f') + building(300, 300, 130, 240, '#7aa6d6') +
      building(430, 300, 170, 200, '#81b29a') + building(600, 300, 200, 236, '#c98bb9') + ac +
      `<rect x="352" y="46" width="26" height="14" fill="#5b7fa8"/>` + diff(365, 34, 24, clock(365, 34, 13), clock(365, 34, 16)) +
      `<path d="M712 64V40" stroke="#3d4a55" stroke-width="3"/>` + `<rect x="708" y="50" width="4" height="16" fill="#3d4a55"/>` +
      diff(726, 60, 26, flapping(2.2), flapping(0.9)) +
      awning(75, 262, 120, '#3a86ff') + awning(515, 262, 140, '#ffb703') + awning(700, 262, 150, '#2a9d8f') +
      `<rect x="20" y="290" width="110" height="10" fill="#3d4a55" fill-opacity="0.3"/>` +
      // Sidewalks and the road
      `<rect y="300" width="800" height="36" fill="#cfd5da"/><rect y="336" width="800" height="124" fill="#4a5058"/>` +
      `<rect y="460" width="800" height="40" fill="#cfd5da"/>` + marks + zebra +
      `<path d="M0 336H800M0 460H800" stroke="#9aa3ab" stroke-width="3"/>` +
      // Street furniture on the far sidewalk
      cityTree(40, 330, 0.8) + cityTree(600, 330, 0.8, '#5fae4b') +
      `<path d="M210 336V294" stroke="#3d4a55" stroke-width="3"/>` + diff(210, 292, 22, oneWay(210, 292, 1), oneWay(210, 292, -1)) +
      trafficLight(326, 334, 0) + hydrant(280, 334) + bin(640, 334) +
      person(90, 332, '#ffb703') + person(150, 330, '#3a86ff', true) + person(250, 332, '#8338ec') +
      diff(560, 300, 22, person(560, 332, '#2a9d8f'), person(560, 332, '#3fae8d')) +
      person(680, 330, '#e63946', true, '#c68b5e', '#2b2b2b') + person(740, 334, '#ff006e') +
      lampPost(460, 334) + lampHead(460, 334) +
      // Traffic: stopped at the crossing
      car(110, 392, '#e63946') + car(240, 394, '#3a86ff') + bus(560, 398, '#ffb703') + car(720, 394, '#8ac926') +
      car(70, 452, '#ffd166', true) + `<rect x="62" y="408" width="16" height="6" rx="2" fill="#2b2b2b"/>` +
      car(230, 454, '#e07a5f', true) + car(600, 452, '#bdb2ff', true) + car(730, 454, '#f4f4f4', true) +
      person(372, 444, '#fb8500') + person(404, 420, '#3a86ff', true) + person(436, 448, '#8ac926', false, '#a86b4c', '#2b2b2b') +
      // Near sidewalk
      `<path d="M480 498V398" stroke="#3d4a55" stroke-width="4"/>` + walkBox(480, 392) +
      diff(480, 392, 22, walker(480, 392), anim({ type: 'blink', duty: 0.5, period: 0.8 }, walker(480, 392))) +
      trafficLight(300, 498, 2) +
      diff(120, 477, 22, pigeon(120, 490), '') + pigeon(150, 496, true) + pigeon(176, 494, false, '#a3aab3') +
      bike(240, 496, '#ff006e') + bike(560, 498, '#3a86ff', true) +
      diff(646, 476, 24, cone(640, 494), cone(652, 494)) + cone(700, 498) +
      lampPost(780, 498) + lampHead(780, 498) +
      mailbox(385, 332) +
      newspaperBox(505, 332) +
      shoppingBag(710, 334) +
      skateboard(400, 494) +
      bollard(600, 494) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['flowerBox', 401, 279, '#e63946'],
        ['pigeon', 310, 374],
        ['cone', 543, 432],
        ['pigeon', 163, 434],
        ['cone', 683, 369],
      ])
    )
  },
})
