// Motion differences: the robot head rides the belt faster on picture B; the ceiling arm swings faster on B; the warning light flashes faster on B.
import { svgLevel } from '../helpers.ts'
import { robot } from './shapes.ts'

/** Gear; (x, y) = center. Bounds: radius r + 6. */
const gear = (x: number, y: number, r: number, color: string) => {
  let teeth = ''
  for (let a = 0; a < 360; a += 45) teeth += `<rect x="${x - 4}" y="${y - r - 6}" width="8" height="10" fill="${color}" transform="rotate(${a} ${x} ${y})"/>`
  return teeth + `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/><circle cx="${x}" cy="${y}" r="${r * 0.35}" fill="#c9d6df"/>`
}

/** Robot head on the belt; (x, y) = bottom center. Bounds: x ±14, y from −28 to 0. */
const head = (x: number, y: number) =>
  `<path d="M${x} ${y - 22}v-4" stroke="#5c677d" stroke-width="2"/><circle cx="${x}" cy="${y - 26}" r="2" fill="#e63946"/>` +
  `<rect x="${x - 14}" y="${y - 22}" width="28" height="22" rx="4" fill="#bfc7d5"/><circle cx="${x - 6}" cy="${y - 12}" r="3" fill="#3ae0ff"/><circle cx="${x + 6}" cy="${y - 12}" r="3" fill="#3ae0ff"/>`

/** Crate; (x, y) = bottom center. Bounds: x ±12, y from −24 to 0. */
const crate = (x: number, y: number) =>
  `<rect x="${x - 12}" y="${y - 24}" width="24" height="24" fill="#c9a06c"/><path d="M${x - 12} ${y - 24}l24 24M${x + 12} ${y - 24}l-24 24" stroke="#a0703f" stroke-width="2"/>`

/** Ceiling arm hanging from (620, 56). */
const arm =
  `<rect x="615" y="56" width="10" height="104" fill="#ff9f43"/><circle cx="620" cy="110" r="8" fill="#5c677d"/>` +
  `<path d="M608 160h24M610 160v18l6 6M630 160v18l-6 6" stroke="#5c677d" stroke-width="5" fill="none" stroke-linecap="round"/>`

export default svgLevel({
  id: 99,
  chapter: 'space',
  title: 'robotFactory',
  parTimeSec: 140,
  scene: ({ diff, anim }) => {
    const riding = (period: number) => anim({ id: 'head', type: 'path', points: [[0, 0], [200, 0]], period }, head(300, 360))
    const swinging = (period: number) => anim({ type: 'sway', angle: 10, pivot: [620, 56], period }, arm)
    const flashing = (period: number) =>
      anim({ type: 'blink', duty: 0.5, period }, `<circle cx="720" cy="100" r="12" fill="#ff9f43" fill-opacity="0.4"/><circle cx="720" cy="100" r="7" fill="#ff6b00"/>`)
    const spinning = (color: string) => anim({ type: 'rotate', pivot: [300, 140], period: 8 }, gear(300, 140, 22, color))

    return (
      `<rect width="800" height="500" fill="#c9d6df"/><rect width="800" height="40" fill="#a9b8c4"/><rect y="44" width="800" height="12" fill="#5c677d"/>` +
      `<rect y="400" width="800" height="100" fill="#8d99ae"/><path d="M0 400h800" stroke="#5c677d" stroke-width="4"/>` +
      `<path d="M0 480l40 -20M80 480l40 -20M160 480l40 -20M240 480l40 -20M320 480l40 -20" stroke="#ffd166" stroke-width="6"/>` +
      // Wall
      `<rect x="110" y="110" width="110" height="84" rx="4" fill="#3d4a55"/><rect x="118" y="118" width="94" height="68" fill="#14112e"/>` +
      `<g fill="#8ac926"><rect x="135" y="160" width="12" height="25"/><rect x="155" y="145" width="12" height="40"/><rect x="175" y="165" width="12" height="20"/></g>` +
      diff(201, 160, 26, `<rect x="195" y="135" width="12" height="50" fill="#8ac926"/>`, `<rect x="195" y="155" width="12" height="30" fill="#8ac926"/>`) +
      diff(300, 140, 30, spinning('#ffb703'), spinning('#3a86ff')) +
      anim({ type: 'rotate', pivot: [346, 178], period: 5, reverse: true }, gear(346, 178, 14, '#8d99ae')) +
      `<rect x="430" y="100" width="120" height="110" rx="4" fill="#d9c4a0"/><g fill="#a0703f">${[0, 1, 2, 3, 4].map((i) => `<circle cx="${445 + i * 22}" cy="112" r="2"/>`).join('')}</g>` +
      `<path d="M450 130v40M446 130h8" stroke="#5c677d" stroke-width="4"/><path d="M525 125l10 10l-20 40" stroke="#e63946" stroke-width="5" stroke-linecap="round" fill="none"/>` +
      diff(490, 150, 20, `<path d="M490 168v-30" stroke="#a0703f" stroke-width="4"/><rect x="480" y="132" width="20" height="10" rx="2" fill="#5c677d"/>`, '') +
      diff(720, 100, 18, flashing(1.6), flashing(0.6)) +
      diff(620, 118, 72, swinging(3), swinging(1.2)) +
      // Conveyor
      `<rect x="40" y="360" width="720" height="20" rx="10" fill="#3d4a55"/><g fill="#8d99ae">${[60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720].map((x) => `<circle cx="${x}" cy="370" r="6"/>`).join('')}</g>` +
      `<path d="M80 380v20M720 380v20M400 380v20" stroke="#5c677d" stroke-width="8"/>` +
      anim({ type: 'path', points: [[0, 0], [160, 0]], period: 6 }, crate(80, 360)) +
      anim({ type: 'path', points: [[0, 0], [140, 0]], period: 7 }, `<rect x="580" y="338" width="30" height="22" rx="3" fill="#ffd166"/>`) +
      diff(300, 346, 20, riding(8), riding(4), 'head') +
      // Floor
      `<path d="M88 446h24l-3 24h-18Z" fill="#5c677d"/>` +
      diff(100, 452, 18, `<ellipse cx="100" cy="446" rx="12" ry="4" fill="#e63946"/>`, `<ellipse cx="100" cy="446" rx="12" ry="4" fill="#8ac926"/>`) +
      crate(188, 470) +
      crate(212, 470) +
      diff(200, 434, 18, crate(200, 446), '') +
      robot(560, 470) +
      diff(620, 427, 18, robot(620, 470, '#ffb703'), robot(620, 470, '#ffb703', '#ff3b3b')) +
      diff(680, 439, 23, robot(680, 470, '#3a86ff'), robot(680, 470, '#e76f51')) +
      robot(740, 470, '#8ac926')
    )
  },
})
