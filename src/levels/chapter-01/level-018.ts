// Motion differences: the weathervane turns the other way on picture B; the lantern swings only on B.
import { mushroom } from '../chapter-03/shapes.ts'
import { svgLevel } from '../helpers.ts'
import { birdhouse, duck, grass, hen, milkCan, snail, stones } from '../shapes.ts'

/** Figure in a raincoat holding an umbrella handle; (x, y) = ground center. The canopy is separate. */
const walker = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="-10" y="-20" width="8" height="20" fill="#333"/><rect x="2" y="-20" width="8" height="20" fill="#333"/>` +
  `<path d="M-16 -62h32l4 44h-40Z" fill="#ffd166"/><circle cy="-70" r="12" fill="#f2d29b"/>` +
  `<path d="M12 -60v-32" stroke="#333" stroke-width="3"/></g>`

/** Umbrella canopy over the walker at (x, y). Bounds: x from −22 to +46, y from −92 to −80. */
const canopy = (x: number, y: number, color: string) =>
  `<path d="M${x - 22} ${y - 80}q34 -24 68 0q-8 -4 -17 0q-8 -4 -17 0q-8 -4 -17 0q-8 -4 -17 0Z" fill="${color}"/>`

/** Rubber boot; (x, y) = heel on the ground, toe to the right. Bounds: x from −6 to +20, y from −26 to 0. */
const boot = (x: number, y: number) =>
  `<path d="M${x - 6} ${y - 26}h12v16h14v10h-26Z" fill="#8ac926"/><rect x="${x - 6}" y="${y - 26}" width="12" height="4" fill="#6aa01a"/>`

/** Frog; (x, y) = bottom center. Bounds: x ±14, y from −16 to 0. */
const frog = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-6" rx="14" ry="7" fill="#5fae4b"/>` +
  `<circle cx="-6" cy="-14" r="4" fill="#5fae4b"/><circle cx="6" cy="-14" r="4" fill="#5fae4b"/>` +
  `<circle cx="-6" cy="-14" r="1.6" fill="#222"/><circle cx="6" cy="-14" r="1.6" fill="#222"/></g>`

/** Short rainbow arcs between the clouds. Bounds: x ±40, y from −30 to +4 around (x, y). */
const rainbow = (x: number, y: number) =>
  ['#e63946', '#ffb703', '#8ac926', '#3a86ff'].map((c, i) => `<path d="M${x - 40 + i * 6} ${y}a${40 - i * 6} ${30 - i * 5} 0 0 1 ${80 - i * 12} 0" fill="none" stroke="${c}" stroke-width="5"/>`).join('')

/** Weathervane arrow with a rooster; (x, y) = pivot. Bounds: x ±22, y from −22 to +14. */
const vane = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-22 0h44M-22 0l6 -4v8Z" stroke="#333" stroke-width="3" fill="#333"/>` +
  `<path d="M10 -2q-4 -14 8 -18q8 -2 6 8l-6 12Z" fill="#333"/><circle cx="18" cy="-20" r="3" fill="#e63946"/></g>`

/** Hanging lantern; (x, y) = hook. Bounds: x ±8, y from 0 to +30. */
const lantern = (x: number, y: number) =>
  `<path d="M${x} ${y}v6" stroke="#333" stroke-width="2"/><rect x="${x - 7}" y="${y + 6}" width="14" height="20" rx="3" fill="#ffd166" stroke="#333" stroke-width="2"/>` +
  `<rect x="${x - 4}" y="${y + 26}" width="8" height="4" fill="#333"/>`

export default svgLevel({
  id: 18,
  chapter: 'farm',
  title: 'rainyDay',
  parTimeSec: 100,
  scene: ({ diff, anim, rand }) => {
    let rain = ''
    for (let i = 0; i < 70; i++) {
      const x = rand() * 800
      const y = rand() * 500
      rain += `<path d="M${x} ${y}l-3 12" stroke="#9fc5e8" stroke-width="2" stroke-linecap="round"/>`
    }
    let tufts = ''
    for (let i = 0; i < 10; i++) tufts += grass(10 + rand() * 780, 410 + rand() * 85).replace('#5fae4b', '#4c8a3c')
    const turning = (reverse: boolean) => anim({ type: 'rotate', pivot: [520, 158], period: 6, reverse }, vane(520, 158))
    const hook = lantern(620, 236)

    return (
      `<rect width="800" height="500" fill="#9db4c9"/>` +
      `<ellipse cx="400" cy="330" rx="520" ry="60" fill="#6f9e5a"/>` +
      `<rect y="340" width="800" height="160" fill="#5f8f4e"/>` +
      // Clouds with a rainbow (missing on B)
      `<g fill="#6d7f93"><ellipse cx="140" cy="80" rx="90" ry="30"/><circle cx="110" cy="60" r="34"/><circle cx="170" cy="55" r="40"/></g>` +
      `<g fill="#7f90a3"><ellipse cx="650" cy="70" rx="100" ry="30"/><circle cx="620" cy="48" r="36"/><circle cx="690" cy="52" r="34"/></g>` +
      diff(400, 95, 48, rainbow(400, 110), '') +
      // Farmhouse with the vane on the roof
      `<rect x="400" y="230" width="240" height="130" fill="#d9a87a"/>` +
      `<path d="M385 236L520 165L655 236Z" fill="#7a3f2c"/>` +
      `<path d="M520 165v-6" stroke="#333" stroke-width="3"/>` +
      diff(520, 158, 36, turning(false), turning(true)) +
      `<rect x="430" y="260" width="40" height="40" fill="#5a3d2b"/><rect x="434" y="264" width="32" height="32" fill="#ffd166"/>` +
      `<rect x="570" y="260" width="40" height="40" fill="#5a3d2b"/><rect x="574" y="264" width="32" height="32" fill="#ffd166"/>` +
      `<rect x="500" y="290" width="44" height="70" fill="#5a3d2b"/>` +
      // Porch roof with the lantern
      `<path d="M470 290h100l-6 -20h-88Z" fill="#6b4f3a"/>` +
      diff(620, 252, 22, hook, anim({ type: 'sway', angle: 16, pivot: [620, 236], period: 1.4 }, hook)) +
      diff(564, 347, 26, boot(548, 360) + boot(566, 360), boot(548, 360)) +
      // Shed with a hen keeping dry
      `<rect x="80" y="280" width="140" height="70" fill="#8a5a33"/><path d="M70 284h160l-16 -30H86Z" fill="#5a3d2b"/>` +
      hen(150, 326, false, '#c9823a') +
      // Puddles
      `<ellipse cx="200" cy="420" rx="90" ry="16" fill="#8fb8d9"/>` +
      `<ellipse cx="620" cy="440" rx="70" ry="14" fill="#8fb8d9"/>` +
      duck(170, 416) +
      diff(640, 430, 20, '', frog(640, 440)) +
      walker(380, 470) +
      diff(392, 384, 36, canopy(380, 470, '#e63946'), canopy(380, 470, '#3a86ff')) +
      tufts +
      stones(250, 470) +
      snail(300, 478) +
      mushroom(720, 385) +
      milkCan(50, 380) +
      birdhouse(690, 345) +
      anim({ type: 'path', points: [[0, 0], [-12, 48]], period: 0.8 }, rain)
    )
  },
})
