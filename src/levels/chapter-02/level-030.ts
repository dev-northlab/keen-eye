// Motion differences: the middle fountain jet bobs faster on picture B; the flags wave only on B.
import { svgLevel } from '../helpers.ts'
import { balloon, bench, bollard, building, cloud, coffeeCup, newspaperBox, person, pigeon, sandwichBoard, shoppingBag, sun } from './shapes.ts'

/** Flower bed; (x, y) = center. Bounds: x ±30, y ±12. */
const bed = (x: number, y: number, color: string) =>
  `<ellipse cx="${x}" cy="${y}" rx="30" ry="12" fill="#5fae4b"/>` +
  [-18, -6, 6, 18].map((dx) => `<circle cx="${x + dx}" cy="${y - 2}" r="5" fill="${color}"/>`).join('')

/** Water jet; (x, y) = base. Bounds: x ±12, y from −60 to 0. */
const jet = (x: number, y: number, h = 60) =>
  `<path d="M${x} ${y}q-12 -${h * 0.4} -6 -${h * 0.8}q6 4 6 ${h * 0.3}q0 -${h * 0.26} 6 -${h * 0.3}q6 ${h * 0.4} -6 ${h * 0.8}Z" fill="#9fd8f0"/><circle cx="${x}" cy="${y - h + 4}" r="5" fill="#bde3f2"/>`

/** Statue on a pedestal; (x, y) = ground center. The hat is separate. Bounds: x ±24, y from −130 to 0. */
const statue = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-24 0v-50h48v50Z" fill="#8d99ae"/><rect x="-28" y="-54" width="56" height="6" fill="#5c677d"/>` +
  `<rect x="-8" y="-100" width="7" height="46" fill="#7f8c8d"/><rect x="1" y="-100" width="7" height="46" fill="#7f8c8d"/>` +
  `<path d="M-11 -124h22l3 26h-28Z" fill="#7f8c8d"/><path d="M11 -122l14 -16" stroke="#7f8c8d" stroke-width="5" stroke-linecap="round"/>` +
  `<circle cy="-130" r="8" fill="#7f8c8d"/></g>`
/** Statue hat; (x, y) = statue ground center. Bounds: x ±12, y from −146 to −134. */
const hat = (x: number, y: number) => `<path d="M${x - 12} ${y - 134}h24l-6 -4v-8h-12v8Z" fill="#7f8c8d"/>`

/** Flag on a pole; (x, y) = pole foot. The cloth is separate. */
const pole = (x: number, y: number) => `<rect x="${x - 2}" y="${y - 120}" width="4" height="120" fill="#3d4a55"/><circle cx="${x}" cy="${y - 122}" r="4" fill="#ffd166"/>`
/** Flag cloth hanging to the right of the pole top at (x, y) = pole foot. Bounds: x from 0 to +34, y from −118 to −96. */
const cloth = (x: number, y: number, color: string) => `<path d="M${x + 2} ${y - 118}h32l-6 11l6 11h-32Z" fill="${color}"/>`

export default svgLevel({
  id: 30,
  chapter: 'city',
  title: 'fountainSquare',
  parTimeSec: 110,
  scene: ({ diff, anim, rand }) => {
    let tiles = ''
    for (let i = 0; i < 30; i++) tiles += `<rect x="${rand() * 800}" y="${340 + rand() * 160}" width="24" height="10" fill="#d9d2c5"/>`
    const splashing = (period: number) => anim({ id: 'jet', type: 'bob', dx: 0, dy: 6, period }, jet(470, 410, 50))
    const flagA = cloth(120, 330, '#e63946')

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(680, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(200, 60, 0.8)) +
      building(0, 330, 240, 200, '#f2cc8f') +
      building(240, 330, 140, 260, '#e07a5f') +
      `<rect x="296" y="60" width="28" height="12" fill="#c96b4f"/><path d="M290 72h40l-20 -22Z" fill="#c96b4f"/>` +
      building(380, 330, 180, 190, '#81b29a') +
      building(560, 330, 240, 210, '#7aa6d6') +
      `<rect y="330" width="800" height="170" fill="#e9e2d3"/>` +
      tiles +
      pole(120, 330) +
      diff(136, 223, 26, flagA, anim({ type: 'sway', angle: 8, pivot: [122, 212], period: 1.4 }, flagA)) +
      pole(680, 330) +
      cloth(680, 330, '#3a86ff') +
      // Fountain
      `<ellipse cx="400" cy="440" rx="130" ry="36" fill="#8d99ae"/><ellipse cx="400" cy="434" rx="118" ry="28" fill="#63b8e3"/>` +
      jet(330, 410, 50) +
      diff(470, 383, 36, splashing(1.2), splashing(2.6), 'jet') +
      jet(400, 400) +
      `<rect x="380" y="400" width="40" height="30" fill="#8d99ae"/>` +
      statue(400, 400) +
      diff(400, 260, 18, hat(400, 400), '') +
      diff(80, 410, 32, bed(80, 410, '#ff6b8b'), bed(80, 410, '#ffd166')) +
      bed(720, 410, '#ff6b8b') +
      bench(200, 470) +
      bench(600, 470) +
      diff(260, 450, 20, person(260, 485, '#3a86ff'), person(260, 485, '#8ac926')) +
      person(540, 485, '#ffb703', true) +
      `<rect x="531" y="451" width="10" height="8" fill="#333"/>` +
      person(700, 470, '#8338ec') +
      diff(716, 408, 34, balloon(716, 396, '#e63946'), balloon(716, 396, '#ffb703')) +
      pigeon(330, 490) +
      diff(360, 482, 18, pigeon(360, 490, true), '') +
      pigeon(470, 486) +
      newspaperBox(120, 478) +
      sandwichBoard(650, 470) +
      coffeeCup(215, 442) +
      shoppingBag(570, 488) +
      bollard(775, 480)
    )
  },
})
