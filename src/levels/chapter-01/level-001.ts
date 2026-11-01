import { svgLevel } from '../helpers.ts'
import { cloud, flower, FLOWER_COLORS, grass, pick, sun, tree } from '../shapes.ts'

const apple = (x: number, y: number) =>
  `<path d="M${x} ${y - 9}q2 -6 7 -7" stroke="#6b3f1d" stroke-width="2" fill="none"/>` +
  `<circle cx="${x}" cy="${y}" r="10" fill="#e63946"/>`

/** Bounds: about 36 around (x, y). */
const chicken = (x: number, y: number, flip: boolean) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<path d="M-6 16V26M6 16V26" stroke="#ff9f1c" stroke-width="3"/>` +
  `<path d="M-20 -4L-32 -16L-16 -12Z" fill="#f1f1f1"/>` +
  `<ellipse rx="22" ry="16" fill="#ffffff"/>` +
  `<circle cx="14" cy="-27" r="4" fill="#e63946"/><circle cx="19" cy="-26" r="4" fill="#e63946"/>` +
  `<circle cx="16" cy="-16" r="10" fill="#ffffff"/>` +
  `<path d="M25 -18L33 -15L25 -12Z" fill="#ff9f1c"/>` +
  `<circle cx="19" cy="-18" r="1.8" fill="#222"/></g>`

const hay =
  `<ellipse cx="738" cy="378" rx="42" ry="34" fill="#f2c14e"/>` +
  `<path d="M712 365q10 -8 20 0M740 360q10 -8 20 0M722 390q10 -8 20 0M750 385q10 -8 18 0" stroke="#d9a43a" stroke-width="3" fill="none"/>`

const fence = () => {
  let posts = ''
  for (let x = 4; x < 450; x += 40) posts += `<rect x="${x}" y="340" width="14" height="60" rx="3" fill="#e9d3a7"/>`
  return (
    `<rect y="355" width="460" height="8" fill="#d8bd8a"/><rect y="378" width="460" height="8" fill="#d8bd8a"/>` + posts
  )
}

export default svgLevel({
  id: 1,
  chapter: 'farm',
  title: 'barnyard',
  parTimeSec: 60,
  scene: ({ diff, anim, rand }) => {
    let flowers = ''
    for (let i = 0; i < 12; i++) {
      const x = 20 + rand() * 760
      const y = 425 + rand() * 70
      const period = 2.5 + rand()
      flowers += anim({ type: 'sway', angle: 6, pivot: [x, y], period, phase: rand() }, flower(x, y, pick(rand, FLOWER_COLORS)))
    }
    let tufts = ''
    for (let i = 0; i < 10; i++) tufts += grass(10 + rand() * 780, 410 + rand() * 90)

    return (
      `<rect width="800" height="500" fill="#a8dcf5"/>` +
      `<ellipse cx="220" cy="345" rx="300" ry="80" fill="#9fd47c"/>` +
      `<ellipse cx="650" cy="350" rx="260" ry="60" fill="#a6d985"/>` +
      `<rect y="330" width="800" height="170" fill="#8bc96a"/>` +
      diff(700, 85, 46, sun(700, 85), sun(700, 85, '#ff8c42')) +
      diff(400, 70, 62, cloud(400, 80), '') +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 24 }, cloud(160, 110, 0.8)) +
      tree(130, 345) +
      apple(100, 215) +
      apple(150, 190) +
      apple(160, 240) +
      fence() +
      // Barn
      `<rect x="480" y="215" width="200" height="150" fill="#c8423b"/>` +
      `<path d="M465 220L580 140L695 220Z" fill="#8e2c27"/>` +
      `<circle cx="580" cy="190" r="14" fill="#f4e9d8"/>` +
      `<rect x="545" y="285" width="70" height="80" fill="#f4e9d8"/>` +
      `<path d="M549 289L611 361M611 289L549 361" stroke="#c8423b" stroke-width="6"/>` +
      `<rect x="500" y="240" width="30" height="30" fill="#f4e9d8"/>` +
      diff(645, 255, 28, `<rect x="630" y="240" width="30" height="30" fill="#f4e9d8"/>`, '') +
      tufts +
      flowers +
      diff(738, 378, 50, hay, '') +
      diff(300, 440, 42, chicken(300, 440, false), chicken(300, 440, true)) +
      // Pecking
      anim({ type: 'sway', angle: 12, pivot: [400, 494], period: 2.2 }, chicken(400, 468, true))
    )
  },
})
