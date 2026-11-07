import { bird, butterfly, mushroom, stump } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level009Redesign } from './level-009-redesign.ts'
import { cloud, grass, sheep, stones, sun, tree } from '../shapes.ts'

const stone = (x: number, y: number, shade: string) =>
  `<ellipse cx="${x}" cy="${y}" rx="17" ry="11" fill="${shade}" stroke="#7d848a" stroke-width="2"/>`

/** (x, y) = center. Bounds: x ±44, y ±34. */
const bush = (x: number, y: number) =>
  `<circle cx="${x - 22}" cy="${y + 6}" r="24" fill="#3f8f3a"/><circle cx="${x + 22}" cy="${y + 6}" r="24" fill="#3f8f3a"/>` +
  `<circle cx="${x}" cy="${y - 8}" r="26" fill="#4c9a3f"/>`

const berries = (x: number, y: number) =>
  [
    [-24, 2],
    [-8, -14],
    [10, -4],
    [24, 10],
    [-14, 16],
    [4, 14],
  ]
    .map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="4.5" fill="#d62839"/>`)
    .join('')

export default svgLevel({
  id: 9,
  chapter: 'farm',
  title: 'meadow',
  parTimeSec: 75,
  redesign: level009Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let tufts = ''
    for (let i = 0; i < 14; i++) tufts += grass(10 + rand() * 780, 360 + rand() * 135)
    // Dry stone wall: two rows, one stone is a difference.
    let wall = ''
    for (let row = 0; row < 2; row++) {
      for (let i = 0; i < 25; i++) {
        const x = 10 + i * 33 + row * 16
        const y = 322 - row * 18
        const s = stone(x, y, rand() < 0.5 ? '#b8bec4' : '#a9b0b6')
        wall += row === 1 && i === 14 ? diff(x, y, 24, s, '') : s
      }
    }

    return (
      `<rect width="800" height="500" fill="#b3e0f5"/>` +
      sun(710, 75) +
      anim({ type: 'path', points: [[0, 0], [80, 0]], period: 26 }, cloud(220, 80, 0.9)) +
      anim({ type: 'path', points: [[0, 0], [-50, 0]], period: 18 }, cloud(470, 55, 0.6)) +
      `<ellipse cx="180" cy="300" rx="320" ry="90" fill="#9fd47c"/>` +
      `<ellipse cx="640" cy="290" rx="300" ry="100" fill="#a6d985"/>` +
      // Shepherd's hut on the hill
      `<circle cx="625" cy="272" r="9" fill="#333"/><circle cx="705" cy="272" r="9" fill="#333"/>` +
      `<rect x="610" y="205" width="110" height="62" fill="#4c7a5a"/>` +
      `<path d="M604 208Q665 170 726 208Z" fill="#6b4f3a"/>` +
      `<rect x="625" y="222" width="18" height="16" fill="#bde3f2"/>` +
      diff(663, 245, 28, `<rect x="652" y="224" width="24" height="43" fill="#c8423b"/>`, `<rect x="652" y="224" width="24" height="43" fill="#f2c14e"/>`) +
      tree(90, 320) +
      `<rect y="320" width="800" height="180" fill="#93cf6e"/>` +
      wall +
      tufts +
      // Grazing sheep
      anim({ type: 'bob', dx: 0, dy: 2, period: 2.6 }, sheep(560, 400)) +
      diff(334, 403, 50, sheep(330, 400), sheep(330, 400, false, '#4a4a4a')) +
      diff(180, 443, 54, sheep(180, 440), sheep(180, 440, true)) +
      anim({ type: 'bob', dx: 0, dy: 2, period: 3.1, phase: 0.4 }, sheep(700, 455, true)) +
      bush(520, 452) +
      diff(520, 452, 40, berries(520, 452), '') +
      stump(50, 400) +
      mushroom(275, 478) +
      bird(400, 293) +
      butterfly(430, 445) +
      stones(610, 480) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['flower', 627, 439, '#4dabf7'],
        ['stones', 457, 381],
        ['snail', 557, 264],
        ['flower', 67, 467, '#ff9f43'],
        ['ladybug', 337, 256],
        ['mushroom', 224, 366],
        ['chick', 747, 219],
        ['butterfly', 599, 44],
        ['cloud', 140, 125],
        ['birds', 377, 50],
      ])
    )
  },
})
