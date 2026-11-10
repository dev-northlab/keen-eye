import { bird, mushroom } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level001Redesign } from './level-001-redesign.ts'
import { apple, chick, cloud, flower, FLOWER_COLORS, grass, hen, milkCan, pick, pumpkin, sun, tree } from '../shapes.ts'

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
  redesign: level001Redesign,
  scene: ({ diff, anim, rand, extra }) => {
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
      diff(300, 440, 42, hen(300, 440), hen(300, 440, true)) +
      // Pecking
      anim({ type: 'sway', angle: 12, pivot: [400, 494], period: 2.2 }, hen(400, 468, true)) +
      chick(470, 474) +
      milkCan(472, 362) +
      pumpkin(705, 488) +
      mushroom(50, 482) +
      bird(331, 339) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['horseshoe', 227, 289],
        ['eggNest', 574, 389],
        ['butterfly', 397, 415],
        ['flower', 70, 431, '#ff9f43'],
        ['bee', 208, 446],
        ['flower', 503, 457, '#ffffff'],
        ['stones', 669, 466],
        ['cloud', 426, 252],
        ['birds', 575, 75],
        ['butterfly', 749, 166],
      ])
    )
  },
})
