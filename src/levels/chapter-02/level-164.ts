// Car wash: a drive-through car wash among the city's ten hardest (hidden until released, levels/upcoming.ts).
// New in the city: a car wash tunnel with a round brush and foam, a car with a roof box, a convertible with a dog,
// an attendant, a vacuum station, an inflatable tube man, a kiosk and a direction sign. Motion differences: the
// brush turns and the foam bubbles only on picture A; the tube man waves his arms only on B.
import { car, person, skyline } from './shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cloud } from '../shapes.ts'

/** Round washing brush; (x, y) = hub. Bounds: radius 26. */
const brush = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  Array.from({ length: 12 }, (_, i) => `<rect x="-3" y="-26" width="6" height="18" rx="3" fill="${i % 2 ? '#3a86ff' : '#ffd23f'}" transform="rotate(${i * 30})"/>`).join('') +
  `<circle r="9" fill="#3d4a55"/></g>`

/** Foam bubbles. Bounds: x from −20 to +22, y from −16 to +14 around (x, y). */
const foam = (x: number, y: number) =>
  [[-12, 2, 8], [2, -8, 8], [14, 4, 7], [-2, 8, 6]].map(([dx, dy, r]) => `<circle cx="${x + dx}" cy="${y + dy}" r="${r}" fill="#ffffff" stroke="#9ad3f0" stroke-width="1.5"/>`).join('')

/** Inflatable tube man without his arms; (x, y) = base. Bounds: x ±14, y from −110 to 0. */
const tubeMan = (x: number, y: number) =>
  `<path d="M${x - 7} ${y}Q${x - 14} ${y - 50} ${x - 6} ${y - 100}H${x + 8}Q${x + 14} ${y - 50} ${x + 7} ${y}Z" fill="#ff006e"/>` +
  `<circle cx="${x + 1}" cy="${y - 100}" r="10" fill="#ff006e"/><circle cx="${x - 3}" cy="${y - 102}" r="2" fill="#ffffff"/><circle cx="${x + 5}" cy="${y - 102}" r="2" fill="#ffffff"/>` +
  `<path d="M${x - 4} ${y - 95}q5 4 10 0" stroke="#ffffff" stroke-width="2" fill="none"/><rect x="${x - 14}" y="${y - 6}" width="28" height="6" fill="#3d4a55"/>`
const tubeArms = (x: number, y: number) =>
  `<path d="M${x - 6} ${y - 80}Q${x - 24} ${y - 84} ${x - 28} ${y - 102}M${x + 7} ${y - 80}Q${x + 24} ${y - 76} ${x + 30} ${y - 94}" stroke="#ff006e" stroke-width="7" fill="none" stroke-linecap="round"/>`

/** Convertible facing right without the side stripe; (x, y) = ground under the middle. Bounds: x ±50, y from −46 to 0. */
const convertible = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-48 -8q0 -14 12 -16H40q10 0 10 12V-6H-48Z" fill="#ffb703"/>` +
  `<path d="M10 -24L18 -38" stroke="#3d4a55" stroke-width="3"/><path d="M12 -24L18 -36H24L20 -24Z" fill="#bde3f2"/>` +
  `<rect x="-20" y="-32" width="14" height="10" rx="3" fill="#8a4a24"/><rect x="0" y="-32" width="10" height="10" rx="3" fill="#8a4a24"/>` +
  `<circle cx="4" cy="-38" r="7" fill="#f2d29b"/><path d="M-3 -40q7 -8 14 0v-3q-7 -5 -14 0Z" fill="#5a3d2b"/><circle cx="7" cy="-39" r="1.1" fill="#222"/>` +
  `<circle cx="-28" cy="-4" r="10" fill="#2b2b2b"/><circle cx="-28" cy="-4" r="4" fill="#ccc"/><circle cx="30" cy="-4" r="10" fill="#2b2b2b"/><circle cx="30" cy="-4" r="4" fill="#ccc"/>` +
  `<rect x="44" y="-18" width="6" height="5" rx="1" fill="#fff3b0"/></g>`

/** Dog's head looking out of the back seat; (x, y) = center. Bounds: x ±12, y ±10. */
const dogHead = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="8" fill="#c48a5a"/><path d="M${x - 8} ${y - 4}l-4 10l6 -4Z" fill="#8a5a3b"/><ellipse cx="${x + 7}" cy="${y + 2}" rx="5" ry="4" fill="#c48a5a"/>` +
  `<circle cx="${x + 11}" cy="${y + 1}" r="1.8" fill="#222"/><circle cx="${x + 2}" cy="${y - 2}" r="1.4" fill="#222"/><path d="M${x + 6} ${y + 6}q2 4 4 0" fill="#e63946"/>`

/** Five-point star; (x, y) = center, radius r. */
const star = (x: number, y: number, r: number) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2
    const d = i % 2 ? r * 0.45 : r
    return `${(x + Math.cos(a) * d).toFixed(1)},${(y + Math.sin(a) * d).toFixed(1)}`
  })
  return `<polygon points="${pts.join(' ')}" fill="#ffd23f"/>`
}

/** Cap for a person at (x, y). Bounds: x from −10 to +16, y from −66 to −56. */
const cap = (x: number, y: number, color: string) => `<path d="M${x - 9} ${y - 58}a9 8 0 0 1 18 0Z" fill="${color}"/><rect x="${x + 6}" y="${y - 60}" width="10" height="3" rx="1.5" fill="${color}"/>`

export default svgLevel({
  id: 164,
  chapter: 'city',
  title: 'carWash',
  parTimeSec: 90,
  scene: ({ diff, anim, rand, extra }) => {
    return (
      `<rect width="800" height="500" fill="#d3ecf7"/>` + skyline(rand, 260) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 26 }, cloud(150, 60, 0.6)) +
      `<rect y="250" width="800" height="250" fill="#8d959e"/><path d="M0 344H800" stroke="#cfd5da" stroke-width="8"/>` +
      // Car wash: sign with its drop, tunnel, the car inside, brush and foam
      `<rect x="250" y="150" width="310" height="194" fill="#f4f1e8"/><rect x="246" y="140" width="318" height="12" fill="#3a86ff"/>` +
      `<rect x="356" y="166" width="100" height="36" rx="6" fill="#3a86ff"/><path d="M372 184h46" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>` +
      diff(436, 184, 22, `<path d="M436 172q8 10 8 15a8 8 0 0 1 -16 0q0 -5 8 -15Z" fill="#9ad3f0"/>`, `<path d="M436 172q8 10 8 15a8 8 0 0 1 -16 0q0 -5 8 -15Z" fill="#ff006e"/>`) +
      `<rect x="280" y="214" width="250" height="130" fill="#2b3a4a"/><path d="M280 214H530" stroke="#ffd23f" stroke-width="6" stroke-dasharray="14 10"/>` +
      car(410, 340, '#e63946') +
      diff(318, 286, 30, anim({ type: 'rotate', pivot: [318, 286], period: 1 }, brush(318, 286)), brush(318, 286)) +
      diff(452, 282, 28, anim({ type: 'bob', dx: 3, dy: -6, period: 1.4 }, foam(452, 284)), foam(452, 284)) +
      // Tube man, vacuum station, kiosk with its rating board, the direction sign
      tubeMan(584, 420) + diff(584, 330, 40, tubeArms(584, 420), anim({ type: 'sway', angle: 16, pivot: [584, 340], period: 0.9 }, tubeArms(584, 420))) +
      `<rect x="640" y="290" width="34" height="110" rx="4" fill="#ffd23f"/><rect x="646" y="300" width="22" height="16" fill="#3d4a55"/><path d="M670 330h8v30" stroke="#3d4a55" stroke-width="3" fill="none"/>` +
      diff(670, 362, 24, `<path d="M676 350q10 4 8 16q-2 12 -14 10" stroke="#2b2b2b" stroke-width="4" fill="none"/><rect x="660" y="370" width="8" height="10" rx="2" fill="#2b2b2b"/>`, '') +
      `<rect x="696" y="236" width="96" height="108" fill="#ffd6a5"/><rect x="706" y="260" width="76" height="40" fill="#bde3f2"/><rect x="730" y="300" width="28" height="44" fill="#8a5a33"/>` +
      `<rect x="700" y="196" width="88" height="34" rx="4" fill="#2b2b2b"/>` +
      star(718, 213, 9) + star(744, 213, 9) + diff(770, 213, 22, star(770, 213, 9), '') +
      `<path d="M760 482V420" stroke="#6c757d" stroke-width="4"/><circle cx="760" cy="410" r="15" fill="#3a86ff"/>` +
      diff(760, 410, 22, `<path d="M768 410H752M752 410l6 -6M752 410l6 6" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none"/>`, `<path d="M752 410H768M768 410l-6 -6M768 410l-6 6" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none"/>`) +
      // Queue: the car with a roof box, the convertible with its dog, the attendant
      car(130, 444, '#2a9d8f') + `<path d="M108 404v-4M152 404v-4" stroke="#3d4a55" stroke-width="3"/>` +
      diff(130, 392, 26, `<rect x="106" y="384" width="48" height="16" rx="7" fill="#3d4a55"/>`, `<rect x="106" y="384" width="48" height="16" rx="7" fill="#e63946"/>`) +
      convertible(370, 486) + diff(346, 450, 22, dogHead(346, 450), '') +
      diff(406, 472, 22, `<rect x="392" y="470" width="28" height="5" fill="#e63946"/>`, `<rect x="392" y="470" width="28" height="5" fill="#3a86ff"/>`) +
      person(232, 488, '#2a9d8f', false, '#c68b5e', '#2b2b2b') + `<rect x="244" y="446" width="14" height="10" rx="3" fill="#ffd23f"/>` +
      diff(234, 426, 22, cap(232, 488, '#e63946'), cap(232, 488, '#ffffff')) +
      `<ellipse cx="520" cy="470" rx="40" ry="8" fill="#6b9ac4" fill-opacity="0.6"/>` +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['cone', 520, 410],
        ['bin', 30, 330],
        ['coffeeCup', 610, 490],
        ['bollard', 470, 400],
        ['newspaperBox', 680, 480],
      ])
    )
  },
})
