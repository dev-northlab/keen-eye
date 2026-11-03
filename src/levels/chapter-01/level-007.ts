import { svgLevel } from '../helpers.ts'
import { bee, beehive, cloud, flower, FLOWER_COLORS, grass, pick, sun, tree } from '../shapes.ts'

/** (x, y) = bottom center. Bounds: x ±12, y from −34 to 0. */
const jar = (x: number, y: number) =>
  `<rect x="${x - 12}" y="${y - 28}" width="24" height="28" rx="5" fill="#f2a541"/>` +
  `<rect x="${x - 10}" y="${y - 34}" width="20" height="7" rx="2" fill="#7a4f2a"/>` +
  `<rect x="${x - 8}" y="${y - 20}" width="16" height="10" fill="#fff3d6"/>`

/** Beekeeper hat with a veil; (x, y) = brim center. Bounds: x ±30, y from −24 to +8. */
const hat = (x: number, y: number, color: string) =>
  `<path d="M${x - 18} ${y}Q${x - 18} ${y - 24} ${x} ${y - 24}Q${x + 18} ${y - 24} ${x + 18} ${y}Z" fill="${color}"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="30" ry="7" fill="${color}" stroke="#c9c9c9" stroke-width="2"/>`

export default svgLevel({
  id: 7,
  chapter: 'farm',
  title: 'apiary',
  parTimeSec: 75,
  scene: ({ diff, anim, rand, secret }) => {
    let tufts = ''
    for (let i = 0; i < 12; i++) tufts += grass(10 + rand() * 780, 350 + rand() * 145)
    let flowers = ''
    for (let i = 0; i < 16; i++) {
      const x = 20 + rand() * 760
      const y = 410 + rand() * 85
      const period = 2.5 + rand()
      const color = pick(rand, FLOWER_COLORS)
      // Keep the patch around the bee-on-a-flower difference clear.
      if (Math.hypot(x - 330, y - 440) < 45) continue
      flowers += anim({ type: 'sway', angle: 6, pivot: [x, y], period, phase: rand() }, flower(x, y, color))
    }
    // Bees circling over the hives
    let bees = ''
    for (let i = 0; i < 4; i++) {
      const cx = 430 + i * 60
      const loop: [number, number][] = [
        [0, 0],
        [30, -25],
        [60, 0],
        [30, 20],
      ]
      bees += anim({ type: 'path', points: loop, period: 3 + i * 0.7, phase: i * 0.3 }, bee(cx, 230 + (i % 2) * 20))
    }

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(90, 80) +
      diff(250, 83, 38, cloud(250, 90, 0.6), '') +
      anim({ type: 'path', points: [[0, 0], [-60, 0]], period: 20 }, cloud(560, 70, 0.8)) +
      `<ellipse cx="400" cy="335" rx="460" ry="60" fill="#a6d985"/>` +
      `<rect y="330" width="800" height="170" fill="#97cf6e"/>` +
      tree(760, 340) +
      tufts +
      // The chapter's hidden key on the table, behind the first honey jar
      secret(92, 353, -8) +
      // Honey table
      `<rect x="90" y="370" width="10" height="50" fill="#8a5a33"/><rect x="230" y="370" width="10" height="50" fill="#8a5a33"/>` +
      `<rect x="80" y="360" width="170" height="12" rx="3" fill="#a0703f"/>` +
      jar(105, 360) +
      jar(140, 360) +
      diff(175, 343, 26, jar(175, 360), '') +
      jar(210, 360) +
      // Hives
      beehive(420, 362) +
      diff(520, 323, 52, beehive(520, 362), beehive(520, 362, '#7fb3d5')) +
      beehive(620, 362) +
      // Post with the beekeeper's hat
      `<rect x="715" y="300" width="10" height="100" fill="#8a5a33"/>` +
      diff(720, 290, 36, hat(720, 300, '#ffffff'), hat(720, 300, '#ffe066')) +
      flowers +
      flower(330, 450, '#b38cff') +
      diff(330, 416, 24, '', bee(330, 418)) +
      bees
    )
  },
})
