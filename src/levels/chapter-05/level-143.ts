// Motion differences: the warning light blinks only on picture B; the hanging mascot swings faster on B.
import { svgLevel } from '../helpers.ts'
import { comet, planet, sparkle, starField } from './shapes.ts'

/** Bar graph screen, 52 × 40, with `bars` bars; (x, y) = center. */
const graph = (x: number, y: number, bars: number) => {
  let s = `<rect x="${x - 26}" y="${y - 20}" width="52" height="40" rx="3" fill="#0f2a2a" stroke="#5c677d" stroke-width="3"/>`
  for (let i = 0; i < bars; i++) {
    const h = 8 + ((i * 7) % 5) * 5
    s += `<rect x="${x - 22 + (44 * i) / bars + 2}" y="${y + 16 - h}" width="${44 / bars - 4}" height="${h}" fill="#4df0a0"/>`
  }
  return s
}

/** Gauge with the needle at `a` degrees; (x, y) = center. Bounds: radius 20. */
const gauge = (x: number, y: number, a: number) =>
  `<circle cx="${x}" cy="${y}" r="20" fill="#f4f4f4" stroke="#5c677d" stroke-width="4"/><path d="M${x - 14} ${y + 8}A16 16 0 0 1 ${x + 14} ${y + 8}" stroke="#e63946" stroke-width="2" fill="none" stroke-dasharray="3 3"/>` +
  `<path d="M${x} ${y}v-15" stroke="#2b2b2b" stroke-width="2.5" stroke-linecap="round" transform="rotate(${a} ${x} ${y})"/><circle cx="${x}" cy="${y}" r="3" fill="#2b2b2b"/>`

/** Toggle switch; (x, y) = base center. Bounds: x ±7, y from −14 to +6. */
const toggle = (x: number, y: number) => `<rect x="${x - 7}" y="${y - 4}" width="14" height="10" rx="2" fill="#2b2b2b"/><path d="M${x} ${y}l4 -12" stroke="#d0d4de" stroke-width="3" stroke-linecap="round"/>`

/** Mug; (x, y) = bottom center. Bounds: x from −10 to +16, y from −22 to 0. */
const mug = (x: number, y: number) =>
  `<rect x="${x - 10}" y="${y - 20}" width="20" height="20" rx="3" fill="#ff6b8b"/><path d="M${x + 10} ${y - 15}q8 1 0 10" stroke="#ff6b8b" stroke-width="3" fill="none"/><ellipse cx="${x}" cy="${y - 20}" rx="10" ry="2.5" fill="#6b4226"/>`

/** Mascot (little alien plush) hanging from (x, y). Bounds: x ±12, y from 0 to +46. */
const mascot = (x: number, y: number) =>
  `<path d="M${x} ${y}v20" stroke="#d0d4de" stroke-width="1.5"/><circle cx="${x}" cy="${y + 30}" r="10" fill="#8ac926"/><ellipse cx="${x}" cy="${y + 43}" rx="7" ry="4" fill="#8ac926"/>` +
  `<circle cx="${x}" cy="${y + 29}" r="4" fill="#fff"/><circle cx="${x}" cy="${y + 29}" r="2" fill="#222"/><path d="M${x - 4} ${y + 21}l-4 -5M${x + 4} ${y + 21}l4 -5" stroke="#8ac926" stroke-width="2"/>`

const warning = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="12" fill="#ff4d4d" fill-opacity="0.3"/><path d="M${x - 8} ${y + 6}a8 8 0 0 1 16 0Z" fill="#ff4d4d"/>`

export default svgLevel({
  id: 143,
  chapter: 'space',
  title: 'cockpit',
  parTimeSec: 135,
  scene: ({ diff, anim, rand }) => {
    const btnColors = ['#e63946', '#ffb703', '#3a86ff', '#8ac926', '#ff6b8b', '#b38cff']
    let buttons = ''
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 6; c++) {
        const x = 312 + c * 28
        const y = 370 + r * 22
        if (!(r === 0 && c === 5)) buttons += `<rect x="${x - 9}" y="${y - 7}" width="18" height="14" rx="3" fill="${btnColors[(r * 2 + c) % 6]}"/>`
      }
    let toggles = ''
    for (let x = 100; x <= 220; x += 24) if (x !== 172) toggles += toggle(x, 452)
    const sweep = anim({ type: 'rotate', pivot: [150, 320], period: 3 }, `<path d="M150 320L150 284A36 36 0 0 1 180 300Z" fill="#4df0a0" fill-opacity="0.45"/>`)
    const swinging = (period: number) => anim({ type: 'sway', angle: 14, pivot: [250, 40], period }, mascot(250, 40))

    return (
      `<rect width="800" height="500" fill="#2b3640"/>` +
      // Windshield with space outside
      `<path d="M40 30H760L700 240H100Z" fill="#0a0e24"/>` +
      starField(rand, 30, 240, 50) +
      `<ellipse cx="260" cy="150" rx="120" ry="50" fill="#b38cff" fill-opacity="0.2"/><ellipse cx="320" cy="130" rx="70" ry="30" fill="#ff6b8b" fill-opacity="0.18"/>` +
      planet(560, 140, 50, '#e07a5f') + planet(660, 80, 14, '#7aa6d6') + comet(140, 90) + sparkle(470, 70, 6) +
      `<path d="M0 0H40L100 240H0ZM800 0H760L700 240H800Z" fill="#2b3640"/>` +
      `<path d="M40 30H760L700 240H100Z" fill="none" stroke="#1d252d" stroke-width="14"/><path d="M400 30V240" stroke="#1d252d" stroke-width="10"/>` +
      `<rect y="0" width="800" height="26" fill="#1d252d"/>` +
      diff(400, 34, 22, warning(400, 32), anim({ type: 'blink', duty: 0.5, period: 0.8 }, warning(400, 32))) +
      diff(250, 70, 32, swinging(2.6), swinging(1.1)) +
      // Console
      `<path d="M0 240H800L780 500H20Z" fill="#3d4a55"/><path d="M60 250H740" stroke="#5c677d" stroke-width="4"/>` +
      `<circle cx="150" cy="320" r="40" fill="#0f2a2a" stroke="#5c677d" stroke-width="4"/><circle cx="150" cy="320" r="24" fill="none" stroke="#4df0a0" stroke-opacity="0.4"/>` +
      `<path d="M110 320h80M150 280v80" stroke="#4df0a0" stroke-opacity="0.4"/>` + sweep + `<circle cx="168" cy="306" r="3" fill="#ffd23f"/>` +
      diff(400, 302, 30, graph(400, 302, 4), graph(400, 302, 5)) +
      diff(620, 300, 26, gauge(620, 300, -40), gauge(620, 300, 30)) + gauge(690, 300, 10) +
      buttons + diff(452, 370, 22, `<rect x="443" y="363" width="18" height="14" rx="3" fill="#3a86ff"/>`, `<rect x="443" y="363" width="18" height="14" rx="3" fill="#4a66e6"/>`) +
      toggles + diff(172, 446, 22, toggle(172, 452), '') +
      `<circle cx="240" cy="392" r="7" fill="#8d99ae"/>` +
      diff(240, 392, 22, `<circle cx="240" cy="392" r="10" fill="#c9d1da" stroke="#5c677d" stroke-width="2"/><path d="M240 392v-8" stroke="#2b2b2b" stroke-width="2"/>`, `<circle cx="240" cy="392" r="13" fill="#c9d1da" stroke="#5c677d" stroke-width="2"/><path d="M240 392v-10" stroke="#2b2b2b" stroke-width="2"/>`) +
      // Small screen with a line graph
      `<rect x="656" y="396" width="70" height="48" rx="3" fill="#0f2a2a" stroke="#5c677d" stroke-width="3"/>` +
      diff(690, 424, 26, `<path d="M668 432l9 -12l9 7l9 -16l9 9l8 -5" stroke="#ffd23f" stroke-width="2.5" fill="none"/>`, `<path d="M668 432l9 -12l9 7l9 -16l9 9l8 -5" stroke="#f2a03a" stroke-width="2.5" fill="none"/>`) +
      // Joystick, mug, sticker
      `<rect x="380" y="456" width="40" height="14" rx="4" fill="#2b2b2b"/><path d="M400 456l-4 -34" stroke="#2b2b2b" stroke-width="7" stroke-linecap="round"/><circle cx="396" cy="420" r="9" fill="#e63946"/>` +
      diff(560, 462, 26, mug(554, 474), mug(566, 474)) +
      diff(300, 470, 22, '', `<path d="M290 462h20v16h-20Z" fill="#ffd166" transform="rotate(-8 300 470)"/><path d="M294 468h12M294 473h8" stroke="#c98a3a" stroke-width="1.5"/>`) +
      `<rect x="40" y="470" width="40" height="30" fill="#2b2b2b"/><rect x="720" y="470" width="40" height="30" fill="#2b2b2b"/>`
    )
  },
})
