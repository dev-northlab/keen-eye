import { bird, mushroom } from '../chapter-03/shapes.ts'
import { svgLevel } from '../helpers.ts'
import { bucket, cat, chick, cloud, fence, grass, pig, pumpkin, sun, sunflower } from '../shapes.ts'

/** Zone around sunflower(x, y, h): a circle containing its bounds. */
const sunflowerZone = (x: number, y: number, h: number): [number, number, number] => {
  const half = (h + 20) / 2
  return [x, y - half, Math.ceil(Math.hypot(20, half)) + 2]
}

const food =
  `<circle cx="532" cy="421" r="9" fill="#e63946"/><circle cx="556" cy="418" r="9" fill="#8ac926"/>` +
  `<circle cx="582" cy="421" r="9" fill="#f77f00"/>`

export default svgLevel({
  id: 5,
  chapter: 'farm',
  title: 'pigsty',
  parTimeSec: 70,
  scene: ({ diff, anim, rand }) => {
    let tufts = ''
    for (let i = 0; i < 14; i++) tufts += grass(10 + rand() * 780, 360 + rand() * 135)
    let sunflowers = ''
    for (let i = 0; i < 6; i++) {
      const x = 40 + i * 45
      const h = 70 + Math.round(rand() * 15)
      sunflowers += i === 3 ? diff(...sunflowerZone(x, 312, h), sunflower(x, 312, h), '') : sunflower(x, 312, h)
    }

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(720, 70) +
      anim({ type: 'path', points: [[0, 0], [-60, 0]], period: 20 }, cloud(470, 80, 0.8)) +
      anim({ type: 'path', points: [[0, 0], [40, 0]], period: 16 }, cloud(330, 50, 0.5)) +
      `<rect y="310" width="800" height="190" fill="#9ccc65"/>` +
      sunflowers +
      fence(0, 520, 300) +
      // Shed
      `<rect x="560" y="220" width="200" height="140" fill="#a0703f"/>` +
      `<path d="M560 250H760M560 285H760M560 320H760" stroke="#8a5a33" stroke-width="3"/>` +
      `<path d="M545 225L660 150L775 225Z" fill="#6b4f3a"/>` +
      `<rect x="640" y="290" width="50" height="70" fill="#5a3d1e"/>` +
      diff(610, 262, 24, `<circle cx="610" cy="262" r="14" fill="#bde3f2" stroke="#6b4f3a" stroke-width="4"/>`, '') +
      tufts +
      // Mud puddle
      `<ellipse cx="250" cy="425" rx="140" ry="42" fill="#8d6e4f"/>` +
      `<ellipse cx="240" cy="430" rx="110" ry="30" fill="#7a5c3f"/>` +
      diff(244, 405, 58, pig(240, 405), pig(240, 405, false, '#c98b6b')) +
      // Trough
      diff(557, 419, 40, food, '') +
      `<path d="M500 425H620L608 458H512Z" fill="#8a5a33"/><path d="M506 432H614" stroke="#6b4f3a" stroke-width="3"/>` +
      pig(445, 432) +
      // Sleeping pig by the shed (breathing)
      anim({ type: 'bob', dx: 0, dy: 1.5, period: 3 }, pig(710, 410, true)) +
      diff(110, 455, 26, bucket(110, 470), bucket(110, 470, '#e63946')) +
      anim({ type: 'path', points: [[0, 0], [-80, -20], [-140, 10], [-60, 30]], period: 7 }, `<circle cx="420" cy="250" r="3" fill="#333"/>`) +
      chick(320, 472) +
      bird(492, 289) +
      mushroom(30, 402) +
      pumpkin(640, 484) +
      cat(776, 482)
    )
  },
})
