// Canoe river: a forest river among the forest's ten hardest (hidden until released, levels/upcoming.ts). New in
// the forest: a canoe with two paddlers in life jackets, a kayak, an otter floating on its back, a heron with a
// fish, a dragonfly, a wooden dock with a lantern and a picnic basket, and an angler with his float. Motion
// differences: the front paddle strokes only on picture A; the otter bobs and the dragonfly hovers only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { cloud, oak, pine } from './shapes.ts'

/** Paddler sitting in a canoe, faces right, without the life jacket; (x, y) = seat. Bounds: x ±10, y from −34 to 0. */
const paddler = (x: number, y: number, shirt: string, skin: string, hair: string) =>
  `<path d="M${x - 8} ${y}V${y - 22}h16V${y}Z" fill="${shirt}"/><circle cx="${x}" cy="${y - 28}" r="7" fill="${skin}"/>` +
  `<path d="M${x - 7} ${y - 30}q7 -8 14 0v-2q-7 -6 -14 0Z" fill="${hair}"/><circle cx="${x + 3}" cy="${y - 29}" r="1.1" fill="#222"/>`
const lifeJacket = (x: number, y: number, color: string) => `<rect x="${x - 9}" y="${y - 21}" width="18" height="14" rx="3" fill="${color}"/><path d="M${x} ${y - 21}v14" stroke="#2b2b2b" stroke-width="1"/>`

/** Paddle held at (x, y) and dipping down to the right. Bounds: x from −2 to +22, y from −14 to +30. */
const paddle = (x: number, y: number) =>
  `<path d="M${x} ${y - 14}L${x + 16} ${y + 22}" stroke="#a0703f" stroke-width="3"/><path d="M${x + 14} ${y + 18}l8 2l-2 10l-8 -2Z" fill="#a0703f"/>`

/** Otter floating on its back, head to the right; (x, y) = belly center. Bounds: x ±22, y from −12 to +6. */
const otter = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse rx="20" ry="7" fill="#7a4a24"/><ellipse cx="2" cy="-3" rx="12" ry="4" fill="#c9a27a"/><circle cx="18" cy="-4" r="6" fill="#7a4a24"/>` +
  `<ellipse cx="21" cy="-3" rx="3" ry="2" fill="#c9a27a"/><circle cx="17" cy="-7" r="1.2" fill="#222"/><path d="M4 -6l4 -6M10 -6l2 -6" stroke="#7a4a24" stroke-width="3" stroke-linecap="round"/>` +
  `<path d="M2 -12a4 3 0 0 1 8 0Z" fill="#f4d6a0"/></g>`

/** Heron standing in the shallows, faces right; (x, y) = feet. Bounds: x from −20 to +30, y from −78 to 0. */
const heron = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-2 0V-30M4 0V-30" stroke="#8a7a52" stroke-width="2.5"/><ellipse cx="0" cy="-38" rx="16" ry="10" fill="#9aa5b1"/>` +
  `<path d="M-16 -36l-4 6l8 -2Z" fill="#6c757d"/><path d="M8 -44Q16 -54 8 -62Q2 -70 10 -72" stroke="#9aa5b1" stroke-width="5" fill="none" stroke-linecap="round"/>` +
  `<circle cx="12" cy="-72" r="5" fill="#c9d1d9"/><path d="M15 -73l15 2l-15 2Z" fill="#e9c46a"/><path d="M8 -76l-8 -2" stroke="#2b2b2b" stroke-width="1.5"/><circle cx="13" cy="-73" r="1.1" fill="#222"/></g>`

/** Dragonfly; (x, y) = body center. Bounds: x ±14, y ±7. */
const dragonfly = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cx="-4" cy="-4" rx="9" ry="3" fill="#bde3f2" fill-opacity="0.8"/><ellipse cx="4" cy="-4" rx="9" ry="3" fill="#bde3f2" fill-opacity="0.8"/>` +
  `<path d="M-12 1H10" stroke="#2a9d8f" stroke-width="2.5"/><circle cx="11" cy="1" r="3" fill="#2a9d8f"/></g>`

/** Kayak with its paddler, faces left, without the paddle's left blade; (x, y) = waterline center. Bounds: x ±50, y from −40 to +6. */
const kayak = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-48 -4Q0 8 48 -4Q0 -10 -48 -4Z" fill="#fb8500"/><ellipse cy="-6" rx="8" ry="3" fill="#2b2b2b"/>` +
  `<path d="M-7 -6V-24h14V-6Z" fill="#3a86ff"/><circle cy="-30" r="6.5" fill="#e0b48a"/><path d="M-7 -32a7 6 0 0 1 14 0Z" fill="#ffd23f"/>` +
  `<path d="M-38 -28L38 -18" stroke="#3d4a55" stroke-width="2.5"/><path d="M34 -24l10 2l-2 8l-10 -2Z" fill="#3d4a55"/></g>`

export default svgLevel({
  id: 173,
  chapter: 'forest',
  title: 'canoeRiver',
  parTimeSec: 98,
  scene: ({ diff, anim, rand, extra }) => {
    let forest = ''
    for (let x = -10; x < 820; x += 38) forest += pine(x, 256, 0.6 + ((x / 38) % 3) * 0.08, x % 3 ? '#2f7d55' : '#24684a')
    let ripples = ''
    for (let i = 0; i < 18; i++) {
      const x = rand() * 760 + 20
      const y = 262 + rand() * 150
      ripples += `<path d="M${x.toFixed(1)} ${y.toFixed(1)}q10 -4 20 0" stroke="#9ad3f0" stroke-width="2" fill="none"/>`
    }
    return (
      `<rect width="800" height="500" fill="#d3ecf7"/>` +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(560, 60, 0.6)) +
      `<path d="M0 230Q200 200 400 220T800 210V260H0Z" fill="#8fbf6a"/>` + forest +
      `<rect y="252" width="800" height="176" fill="#4f9fd0"/>` + ripples +
      // Far bank: the heron with its fish, the dragonfly
      `<path d="M640 262Q700 248 800 254V268H640Z" fill="#7aa95a"/>` +
      heron(700, 300) + diff(722, 230, 22, `<path d="M724 229q6 -2 10 2q-4 4 -10 2Z" fill="#c9d1d9"/><path d="M734 231l4 -3v6Z" fill="#c9d1d9"/>`, '') +
      diff(440, 230, 22, dragonfly(440, 230), anim({ type: 'bob', dx: 5, dy: 4, period: 0.9 }, dragonfly(440, 230))) +
      // Canoe: paddlers, the back paddler's life jacket, the stripe, the front paddle
      `<path d="M180 324Q290 352 400 324Q290 330 180 324Z" fill="#c0392b"/><path d="M186 326Q290 346 394 326" stroke="#8e2c27" stroke-width="2" fill="none"/>` +
      paddler(230, 326, '#f4f1e8', '#e0b48a', '#5a3d2b') + diff(230, 312, 22, lifeJacket(230, 326, '#ffb703'), lifeJacket(230, 326, '#e63946')) +
      paddler(330, 326, '#f4f1e8', '#c68b5e', '#2b2b2b') + lifeJacket(330, 326, '#ffb703') +
      diff(290, 336, 22, `<path d="M276 336h28" stroke="#ffffff" stroke-width="4"/>`, `<path d="M276 336h28" stroke="#ffd23f" stroke-width="4"/>`) +
      diff(348, 316, 32, anim({ type: 'sway', angle: 22, pivot: [338, 304], period: 1.2 }, paddle(338, 304)), paddle(338, 304)) +
      // Otter, kayak
      diff(520, 298, 28, otter(520, 300), anim({ type: 'bob', dx: 3, dy: 4, period: 1.5 }, otter(520, 300))) +
      kayak(640, 378) + diff(590, 354, 22, `<path d="M594 352l-10 -2l2 8l10 2Z" fill="#3d4a55"/>`, `<path d="M594 352l-10 -2l2 8l10 2Z" fill="#e63946"/>`) +
      // Near bank: tree, dock with its lantern and basket, the angler and his float
      `<path d="M0 420Q200 404 420 418T800 412V500H0Z" fill="#6f9a45"/>` +
      oak(36, 430, 1.2, '#4c9a3f') + oak(760, 430, 1, '#5fa04b') +
      `<rect x="30" y="404" width="190" height="12" fill="#a0703f"/><path d="M70 404v-6h40v6M110 404v-6h40v6" stroke="#8a5a33" stroke-width="2"/><path d="M40 416V440M120 416V440M200 416V440" stroke="#6b4a2b" stroke-width="6"/>` +
      `<path d="M214 404V386" stroke="#6b4a2b" stroke-width="4"/>` +
      diff(214, 374, 22, `<rect x="207" y="368" width="14" height="18" rx="3" fill="#ffd166" stroke="#3d4a55" stroke-width="2"/><path d="M208 368l6 -6l6 6" stroke="#3d4a55" stroke-width="2" fill="none"/>`, '') +
      diff(84, 394, 22, `<path d="M72 404h24l-3 -14h-18Z" fill="#c68b4e"/><path d="M76 390a8 6 0 0 1 16 0" stroke="#8a5a33" stroke-width="2" fill="none"/><rect x="74" y="394" width="20" height="4" fill="#e63946"/>`, '') +
      `<g transform="translate(140 404)"><path d="M-8 0V-24h16V0Z" fill="#3f6f4a"/><path d="M4 0l8 18M-4 0l4 18" stroke="#3d4a55" stroke-width="5"/>` +
      `<circle cy="-30" r="7" fill="#e0b48a"/><path d="M6 -16L60 -46" stroke="#6b4a2b" stroke-width="2"/></g>` +
      diff(140, 366, 22, `<path d="M128 374h24l-3 -4v-6h-18v6Z" fill="#a0703f"/>`, `<path d="M128 374h24l-3 -4v-6h-18v6Z" fill="#3a86ff"/>`) +
      `<path d="M200 358Q250 376 290 402" stroke="#8d99ae" stroke-width="0.8" fill="none"/>` +
      diff(290, 404, 22, `<circle cx="290" cy="404" r="5" fill="#e63946"/><path d="M285 404h10" stroke="#ffffff" stroke-width="2"/>`, `<circle cx="290" cy="404" r="5" fill="#ffd23f"/><path d="M285 404h10" stroke="#ffffff" stroke-width="2"/>`) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['frog', 340, 470],
        ['dragonfly', 560, 450],
        ['fern', 400, 484],
        ['mushroom', 640, 488],
        ['duck', 440, 400],
      ])
    )
  },
})
