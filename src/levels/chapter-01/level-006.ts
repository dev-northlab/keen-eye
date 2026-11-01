import { svgLevel } from '../helpers.ts'
import { cloud, fence, flower, FLOWER_COLORS, grass, hen, pick, sun } from '../shapes.ts'

/** Faces right; (x, y) = body center. Bounds: x from −40 to +33, y from −35 to +26 (either direction: ±40). */
const rooster = (x: number, y: number, flip: boolean) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<path d="M-18 -6Q-40 -30 -30 -2Q-44 -14 -36 8Q-30 6 -18 6Z" fill="#2a9d8f"/>` +
  `<path d="M-18 -4Q-34 -24 -24 0" stroke="#e76f51" stroke-width="5" fill="none"/>` +
  `<path d="M-6 16V26M6 16V26" stroke="#ff9f1c" stroke-width="3"/>` +
  `<ellipse rx="22" ry="16" fill="#c1440e"/>` +
  `<path d="M10 -26l3 -8l3 6l3 -7l3 7l3 -5l1 9Z" fill="#e63946"/>` +
  `<circle cx="16" cy="-16" r="10" fill="#c1440e"/>` +
  `<path d="M25 -18L33 -15L25 -12Z" fill="#ff9f1c"/>` +
  `<path d="M22 -10q3 6 0 10" stroke="#e63946" stroke-width="4" fill="none"/>` +
  `<circle cx="19" cy="-18" r="1.8" fill="#222"/></g>`

const egg = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="9" fill="#fff8e7" stroke="#e9dcc0"/>`

/** (x, y) = bottom center. Bounds: x ±25, y from −65 to 0. */
const sack = (x: number, y: number, color: string) =>
  `<path d="M${x - 18} ${y}Q${x - 25} ${y - 40} ${x - 10} ${y - 56}H${x + 10}Q${x + 25} ${y - 40} ${x + 18} ${y}Z" fill="${color}"/>` +
  `<path d="M${x - 12} ${y - 58}L${x - 4} ${y - 65}M${x + 12} ${y - 58}L${x + 4} ${y - 65}" stroke="#8a5a33" stroke-width="3"/>` +
  `<path d="M${x - 11} ${y - 52}H${x + 11}" stroke="#8a5a33" stroke-width="3"/>`

const chick = (x: number, y: number) =>
  `<path d="M${x - 2} ${y + 6}v5M${x + 3} ${y + 6}v5" stroke="#ff9f1c" stroke-width="1.5"/>` +
  `<circle cx="${x}" cy="${y}" r="8" fill="#ffd43b"/><circle cx="${x + 6}" cy="${y - 7}" r="5" fill="#ffd43b"/>` +
  `<path d="M${x + 10} ${y - 8}l4 1l-4 2Z" fill="#ff9f1c"/><circle cx="${x + 7}" cy="${y - 8}" r="1" fill="#222"/>`

export default svgLevel({
  id: 6,
  chapter: 'farm',
  title: 'henhouse',
  parTimeSec: 70,
  scene: ({ diff, anim, rand }) => {
    let tufts = ''
    for (let i = 0; i < 14; i++) tufts += grass(10 + rand() * 780, 360 + rand() * 135)
    let flowers = ''
    for (let i = 0; i < 7; i++) flowers += flower(330 + rand() * 120, 350 + rand() * 20, pick(rand, FLOWER_COLORS))

    return (
      `<rect width="800" height="500" fill="#c3e7f7"/>` +
      sun(460, 70) +
      anim({ type: 'path', points: [[0, 0], [70, 0]], period: 24 }, cloud(150, 70, 0.7)) +
      anim({ type: 'path', points: [[0, 0], [-40, 0]], period: 18 }, cloud(640, 90, 0.8)) +
      `<ellipse cx="560" cy="345" rx="300" ry="60" fill="#a6d985"/>` +
      `<rect y="340" width="800" height="160" fill="#8fca68"/>` +
      tufts +
      flowers +
      fence(440, 800, 330) +
      // Coop on stilts with a ramp
      `<rect x="95" y="295" width="12" height="60" fill="#6b4f3a"/><rect x="235" y="295" width="12" height="60" fill="#6b4f3a"/>` +
      `<rect x="80" y="200" width="180" height="100" fill="#c8423b"/>` +
      `<path d="M80 230H260M80 265H260" stroke="#a5332d" stroke-width="3"/>` +
      `<path d="M65 205L170 140L275 205Z" fill="#7a2a25"/>` +
      diff(170, 277, 32, `<rect x="150" y="255" width="40" height="45" fill="#3b2a20"/>`, `<rect x="150" y="255" width="40" height="45" fill="#f4e9d8"/>`) +
      `<path d="M178 300L262 362" stroke="#a0703f" stroke-width="14" stroke-linecap="round"/>` +
      `<path d="M190 304l-6 8M206 316l-6 8M222 328l-6 8M238 340l-6 8" stroke="#6b4f3a" stroke-width="3"/>` +
      diff(300, 438, 42, sack(300, 470, '#e9d8a6'), sack(300, 470, '#7fb3d5')) +
      diff(420, 418, 46, hen(420, 420), hen(420, 420, false, '#c47a3d')) +
      // Pecking hen and chicks
      anim({ type: 'sway', angle: 14, pivot: [520, 466], period: 2 }, hen(520, 440, true)) +
      anim({ type: 'bob', dx: 0, dy: -3, period: 0.8 }, chick(580, 470)) +
      anim({ type: 'bob', dx: 0, dy: -3, period: 0.9, phase: 0.5 }, chick(470, 480)) +
      // Nest with eggs
      `<ellipse cx="640" cy="450" rx="52" ry="16" fill="#d9a43a"/>` +
      egg(612, 440) +
      egg(632, 437) +
      diff(654, 439, 24, egg(654, 439), '') +
      `<path d="M590 452q50 14 100 0" stroke="#b8862b" stroke-width="5" fill="none"/>` +
      diff(700, 300, 52, rooster(700, 304, false), rooster(700, 304, true))
    )
  },
})
