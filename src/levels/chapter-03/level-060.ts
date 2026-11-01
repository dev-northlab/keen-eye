// Motion differences: the flame flickers faster on picture B; the lantern swings only on B; the bear drums faster on B.
import { svgLevel } from '../helpers.ts'
import { bear, fireLogs, flame, floor, fox, hedgehog, pine, rabbit } from './shapes.ts'
import { balloon } from '../chapter-02/shapes.ts'

/** Paper lantern hanging from (x, y). Bounds: x ±10, y from 0 to +30. */
const lantern = (x: number, y: number, color = '#e63946') =>
  `<path d="M${x} ${y}v6" stroke="#555" stroke-width="2"/><ellipse cx="${x}" cy="${y + 18}" rx="10" ry="12" fill="${color}"/><rect x="${x - 3}" y="${y + 29}" width="6" height="3" fill="#ffd166"/>`

/** Drumstick in the bear's paw; (x, y) = paw. Bounds: x ±14, y from −18 to +4. */
const drumstick = (x: number, y: number) => `<path d="M${x - 12} ${y}l22 -14" stroke="#c9a06c" stroke-width="3" stroke-linecap="round"/><circle cx="${x + 11}" cy="${y - 15}" r="3.5" fill="#fff3d6"/>`

/** Small flag on a stick; (x, y) = stick bottom. Bounds: x from −2 to +18, y from −40 to 0. */
const flag = (x: number, y: number, color: string) => `<path d="M${x} ${y}v-40" stroke="#8a5a3b" stroke-width="2"/><path d="M${x + 1} ${y - 40}h16l-4 7l4 7h-16Z" fill="${color}"/>`

/** Cake with `n` candles; (x, y) = bottom center. Bounds: x ±18, y from −30 to 0. */
const cake = (x: number, y: number, n: number) =>
  [-10, 0, 10].slice(0, n).map((dx) => `<rect x="${x + dx - 1.5}" y="${y - 28}" width="3" height="10" fill="#3a86ff"/><circle cx="${x + dx}" cy="${y - 30}" r="2.5" fill="#ffd166"/>`).join('') +
  `<rect x="${x - 18}" y="${y - 18}" width="36" height="18" rx="3" fill="#ff6b8b"/><path d="M${x - 18} ${y - 14}q9 6 18 0t18 0" stroke="#fff" stroke-width="3" fill="none"/>`

/** Pennant on the banner string; (x, y) = top center. Bounds: x ±8, y from 0 to +16. */
const pennant = (x: number, y: number, color: string) => `<path d="M${x - 8} ${y}h16l-8 16Z" fill="${color}"/>`

export default svgLevel({
  id: 60,
  chapter: 'forest',
  title: 'forestFestival',
  parTimeSec: 130,
  scene: ({ diff, anim, rand }) => {
    let lights = ''
    for (let i = 0; i < 14; i++) lights += anim({ type: 'blink', period: 1.4 + rand(), phase: rand(), duty: 0.7 }, `<circle cx="${60 + i * 52}" cy="${150 + Math.sin((i / 13) * Math.PI) * 30}" r="4" fill="#ffe08a"/>`)
    let pennants = ''
    for (let i = 0; i < 9; i++) pennants += pennant(140 + i * 60, 246 + Math.sin((i / 8) * Math.PI) * 10, ['#e63946', '#3a86ff', '#8ac926'][i % 3])
    const flicker = (period: number) => anim({ type: 'sway', angle: 6, pivot: [400, 470], period }, flame(400, 470))
    const hanging = lantern(620, 170, '#ffb703')
    const drumming = (period: number) => anim({ id: 'stick', type: 'bob', dx: 0, dy: 6, period }, drumstick(566, 436))

    return (
      `<rect width="800" height="500" fill="#2d3a55"/>` +
      `<rect width="800" height="120" fill="#1d2a4a"/><circle cx="700" cy="60" r="26" fill="#f4f1de"/>` +
      `<path d="M0 300Q200 270 400 290T800 280V500H0Z" fill="#1f3d2a"/>` +
      pine(50, 320, 1.4, '#163020') +
      pine(760, 310, 1.3, '#163020') +
      pine(680, 330, 0.9, '#163020') +
      `<path d="M60 150Q400 210 736 150" stroke="#555" stroke-width="2" fill="none"/>` +
      lights +
      `<path d="M140 246Q400 270 620 246" stroke="#555" stroke-width="2" fill="none"/>` +
      pennants.replace(pennant(380, 256, '#e63946'), '') +
      diff(380, 264, 18, pennant(380, 256, '#e63946'), pennant(380, 256, '#ffb703')) +
      `<path d="M620 170h-40" stroke="#555" stroke-width="2"/>` +
      diff(620, 186, 20, hanging, anim({ type: 'sway', angle: 14, pivot: [620, 170], period: 1.5 }, hanging)) +
      lantern(200, 180) +
      `<rect y="340" width="800" height="160" fill="#244d35"/>` +
      // Campfire gathering
      fireLogs(400, 476) +
      diff(400, 450, 26, flicker(1.2), flicker(0.5)) +
      bear(560, 480, true) +
      `<ellipse cx="610" cy="478" rx="18" ry="6" fill="#e63946"/><rect x="592" y="462" width="36" height="16" fill="#e63946"/><ellipse cx="610" cy="462" rx="18" ry="6" fill="#fff3d6"/>` +
      diff(566, 430, 22, drumming(0.8), drumming(0.35), 'stick') +
      fox(260, 480) +
      rabbit(180, 470, true) +
      diff(205, 448, 24, flag(196, 468, '#e63946'), flag(196, 468, '#8ac926')) +
      diff(300, 410, 20, hedgehog(300, 420), hedgehog(300, 420, true)) +
      diff(700, 408, 34, balloon(700, 396, '#ff006e'), '') +
      `<rect x="80" y="400" width="80" height="12" fill="#8a5a3b"/><rect x="90" y="412" width="6" height="30" fill="#8a5a3b"/><rect x="144" y="412" width="6" height="30" fill="#8a5a3b"/>` +
      diff(120, 384, 22, cake(120, 400, 3), cake(120, 400, 2)) +
      floor(rand, 350, 490, 8)
    )
  },
})
