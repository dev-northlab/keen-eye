// City marathon: the finish line among the city's ten hardest (hidden until released, levels/upcoming.ts). New
// in the city: a finish arch with balloons, runners with their bibs, a water station with a volunteer, a TV
// camera, fans behind a barrier, a camera drone and a bear mascot. Motion differences: the drone hovers only on
// picture A; the mascot waves and a fan waves a flag only on B.
import { building, FACADES, person } from './shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'

/** Runner mid-stride, faces right; (x, y) = ground under the front foot. Bounds: x from −20 to +18, y from −64 to 0. */
const runner = (x: number, y: number, shirt: string, skin: string) =>
  `<g transform="translate(${x} ${y})"><path d="M-2 -26L-14 -10L-18 -2M2 -26L10 -12L14 0" stroke="#3d4a55" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="M-9 -50h18l1 24h-20Z" fill="${shirt}"/><path d="M-8 -46l-10 10l4 8M8 -46l10 6l4 -10" stroke="${skin}" stroke-width="4.5" fill="none" stroke-linecap="round"/>` +
  `<circle cy="-56" r="8" fill="${skin}"/><path d="M-8 -58q8 -10 16 0v-3q-8 -6 -16 0Z" fill="#2b2b2b"/><circle cx="4" cy="-57" r="1.2" fill="#222"/></g>`

/** Running shoe at (x, y). Bounds: x from −6 to +8, y from −4 to +2. */
const shoe = (x: number, y: number, color: string) => `<path d="M${x - 6} ${y + 2}V${y - 3}h7l7 4v1Z" fill="${color}"/>`

/** Camera drone; (x, y) = body center. Bounds: x ±22, y from −8 to +8. */
const drone = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-18 -4H18" stroke="#3d4a55" stroke-width="3"/><ellipse cx="-18" cy="-6" rx="8" ry="2" fill="#8d99ae"/><ellipse cx="18" cy="-6" rx="8" ry="2" fill="#8d99ae"/>` +
  `<rect x="-8" y="-4" width="16" height="8" rx="3" fill="#2b2b2b"/><circle cy="6" r="2.5" fill="#3a86ff"/></g>`

/** Bear mascot without its waving arm; (x, y) = feet. Bounds: x ±28, y from −86 to 0. */
const mascot = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-18" y="-16" width="14" height="16" rx="6" fill="#8a5a33"/><rect x="4" y="-16" width="14" height="16" rx="6" fill="#8a5a33"/>` +
  `<ellipse cy="-36" rx="24" ry="24" fill="#a0703f"/><ellipse cy="-32" rx="14" ry="15" fill="#e6c79a"/><path d="M-22 -40l-8 16" stroke="#a0703f" stroke-width="10" stroke-linecap="round"/>` +
  `<circle cy="-66" r="18" fill="#a0703f"/><circle cx="-14" cy="-80" r="7" fill="#a0703f"/><circle cx="14" cy="-80" r="7" fill="#a0703f"/>` +
  `<ellipse cy="-60" rx="8" ry="6" fill="#e6c79a"/><circle cy="-62" r="2.5" fill="#2b2b2b"/><circle cx="-6" cy="-70" r="2" fill="#2b2b2b"/><circle cx="6" cy="-70" r="2" fill="#2b2b2b"/>` +
  `<rect x="-12" y="-46" width="24" height="12" rx="2" fill="#ffffff"/></g>`
const mascotArm = (x: number, y: number) => `<path d="M${x + 20} ${y - 44}L${x + 32} ${y - 70}" stroke="#a0703f" stroke-width="10" stroke-linecap="round"/>`

/** Fan's flag on a stick held up at (x, y). Bounds: x from 0 to +24, y from −36 to 0. */
const fanFlag = (x: number, y: number) =>
  `<path d="M${x} ${y}V${y - 36}" stroke="#6b4a2b" stroke-width="2"/><rect x="${x}" y="${y - 36}" width="22" height="14" fill="#e63946"/><rect x="${x}" y="${y - 31}" width="22" height="4" fill="#ffffff"/>`

/** Checkered flag icon; (x, y) = center. Bounds: ±10. */
const checkered = (x: number, y: number) => {
  let s = `<rect x="${x - 10}" y="${y - 7}" width="20" height="14" fill="#ffffff"/>`
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) if ((r + c) % 2 === 0) s += `<rect x="${x - 10 + c * 5}" y="${y - 7 + r * 4.7}" width="5" height="4.7" fill="#2b2b2b"/>`
  return s
}

/** Balloon bunch at (x, y); the top balloon separate. Bounds: x ±16, y ±14. */
const balloons = (x: number, y: number, a: string, b: string) =>
  `<circle cx="${x - 8}" cy="${y + 4}" r="9" fill="${a}"/><circle cx="${x + 8}" cy="${y + 4}" r="9" fill="${b}"/>`

/** Paper cup on the table at (x, y). Bounds: x ±5, y from −12 to 0. */
const cup = (x: number, y: number) => `<path d="M${x - 5} ${y - 12}h10l-2 12h-6Z" fill="#ffffff" stroke="#9ad3f0" stroke-width="1.5"/>`

export default svgLevel({
  id: 166,
  chapter: 'city',
  title: 'cityMarathon',
  parTimeSec: 96,
  scene: ({ diff, anim, rand, extra }) => {
    const hovering = anim({ id: 'drone', type: 'path', points: [[0, 0], [70, -16], [140, 0]], period: 7 }, drone(600, 100))
    let houses = ''
    let x = 0
    for (const [w, h] of [[110, 230], [130, 260], [100, 210], [140, 250], [120, 230], [120, 270], [110, 240]]) {
      houses += building(x, 330, w, h, FACADES[Math.floor(rand() * FACADES.length)])
      x += w + 4
    }
    return (
      `<rect width="800" height="500" fill="#cfe8f7"/>` + houses +
      diff(600, 100, 26, hovering, drone(600, 100), 'drone') +
      // Fans behind the barrier, the flag, the sunglasses
      `<rect y="330" width="800" height="20" fill="#cfd5da"/>` +
      person(586, 348, '#ff006e') + person(620, 348, '#8ac926', true, '#c68b5e', '#2b2b2b') + person(660, 348, '#3a86ff', false, '#e0b48a', '#c0392b') +
      person(700, 348, '#ffb703', true) + person(736, 348, '#8338ec', false, '#c68b5e', '#2b2b2b') + person(772, 348, '#2a9d8f', true) +
      diff(636, 282, 28, fanFlag(626, 300), anim({ type: 'sway', angle: 18, pivot: [626, 300], period: 1 }, fanFlag(626, 300))) +
      diff(700, 294, 22, `<rect x="692" y="292" width="7" height="4" rx="1.5" fill="#2b2b2b"/><rect x="701" y="292" width="7" height="4" rx="1.5" fill="#2b2b2b"/>`, '') +
      `<path d="M560 340H800" stroke="#e63946" stroke-width="10"/><path d="M570 340h20M610 340h20M650 340h20M690 340h20M730 340h20M770 340h20" stroke="#ffffff" stroke-width="10"/>` +
      // Road, finish arch with its balloons and checkered flag
      `<rect y="348" width="800" height="152" fill="#6c757d"/><path d="M300 480V350" stroke="#ffffff" stroke-width="6"/>` +
      `<rect x="292" y="186" width="16" height="164" rx="6" fill="#3a86ff"/><rect x="492" y="186" width="16" height="164" rx="6" fill="#3a86ff"/>` +
      `<rect x="290" y="168" width="220" height="36" rx="10" fill="#1d5fbf"/><path d="M316 186h60M424 186h60" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>` +
      diff(400, 186, 22, checkered(400, 186), '') +
      balloons(300, 156, '#ffd23f', '#e63946') + `<circle cx="300" cy="148" r="9" fill="#8ac926"/>` +
      balloons(500, 156, '#ffd23f', '#e63946') + diff(500, 150, 22, `<circle cx="500" cy="148" r="9" fill="#8ac926"/>`, `<circle cx="500" cy="148" r="9" fill="#ff006e"/>`) +
      // Runners
      runner(360, 462, '#ff006e', '#c68b5e') + diff(361, 418, 22, `<rect x="354" y="414" width="14" height="10" fill="#ffffff"/><path d="M357 419h8" stroke="#2b2b2b" stroke-width="1.5"/>`, `<rect x="354" y="414" width="14" height="10" fill="#ffd23f"/><path d="M357 419h8" stroke="#2b2b2b" stroke-width="1.5"/>`) +
      runner(468, 430, '#8338ec', '#f2d29b') + diff(468, 372, 22, `<path d="M460 372h16" stroke="#e63946" stroke-width="3"/>`, '') +
      runner(566, 474, '#2a9d8f', '#e0b48a') + shoe(550, 472, '#e63946') + diff(580, 474, 22, shoe(580, 474, '#e63946'), shoe(580, 474, '#ffffff')) +
      // Water station
      `<rect x="34" y="384" width="140" height="8" fill="#a0703f"/><path d="M44 392v40M164 392v40" stroke="#6b4a2b" stroke-width="4"/>` +
      person(92, 384, '#3a86ff', false, '#c68b5e', '#2b2b2b') +
      `<rect x="34" y="384" width="140" height="8" fill="#a0703f"/>` +
      cup(50, 384) + cup(70, 384) + cup(90, 384) + cup(110, 384) + diff(132, 374, 22, cup(132, 384), '') + cup(154, 384) +
      diff(94, 322, 22, `<path d="M85 328a9 8 0 0 1 18 0Z" fill="#ffd23f"/><rect x="100" y="326" width="10" height="3" rx="1.5" fill="#ffd23f"/>`, `<path d="M85 328a9 8 0 0 1 18 0Z" fill="#e63946"/><rect x="100" y="326" width="10" height="3" rx="1.5" fill="#e63946"/>`) +
      // TV camera on its tripod
      `<path d="M228 380L236 320L244 380M236 320V384" stroke="#3d4a55" stroke-width="3"/><rect x="216" y="302" width="34" height="20" rx="3" fill="#2b2b2b"/><path d="M250 306l10 -4v16l-10 -4Z" fill="#3d4a55"/>` +
      diff(234, 300, 22, `<circle cx="222" cy="298" r="3.5" fill="#e63946"/>`, '') +
      // Mascot
      mascot(740, 476) + diff(766, 418, 26, mascotArm(740, 476), anim({ type: 'sway', angle: 22, pivot: [760, 432], period: 0.9 }, mascotArm(740, 476))) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['cone', 200, 470],
        ['cone', 640, 410],
        ['balloon', 440, 262, '#ff006e'],
        ['coffeeCup', 30, 470],
        ['pigeon', 260, 470],
      ])
    )
  },
})
