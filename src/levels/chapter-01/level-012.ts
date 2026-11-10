// Motion difference: a window light blinks only on picture B.
import { mushroom, stump } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level012Redesign } from './level-012-redesign.ts'
import { fence, grass, milkCan, stones, wheelbarrow } from '../shapes.ts'

const lit = (x: number, y: number) =>
  `<rect x="${x - 4}" y="${y - 4}" width="48" height="48" fill="#5a3d2b"/>` + `<rect x="${x}" y="${y}" width="40" height="40" fill="#ffd166"/>`

const windowLight = `<rect x="470" y="295" width="40" height="40" fill="#ffd166"/>`

/** Sitting cat silhouette; (x, y) = bottom center. Bounds: x from −14 to +20, y from −30 to 0. */
const cat = (x: number, y: number) =>
  `<path d="M${x + 8} ${y - 2}q14 -2 12 -16" stroke="#2b2b3a" stroke-width="4" fill="none" stroke-linecap="round"/>` +
  `<ellipse cx="${x}" cy="${y - 9}" rx="11" ry="10" fill="#2b2b3a"/>` +
  `<circle cx="${x - 2}" cy="${y - 22}" r="7" fill="#2b2b3a"/>` +
  `<path d="M${x - 8} ${y - 26}l1 -6l4 4ZM${x + 4} ${y - 26}l-1 -6l-4 4Z" fill="#2b2b3a"/>`

const smoke =
  `<circle cx="360" cy="150" r="8" fill="#c9b8c6"/><circle cx="368" cy="130" r="10" fill="#c9b8c6"/>` +
  `<circle cx="378" cy="110" r="12" fill="#c9b8c6"/>`

/** (x, y) = center. Bounds: x ±22, y from −22 to +16. */
const pumpkin = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y - 14}q2 -6 6 -8" stroke="#4c7a3a" stroke-width="3" fill="none"/>` +
  `<ellipse cx="${x - 10}" cy="${y}" rx="12" ry="15" fill="${color}"/><ellipse cx="${x + 10}" cy="${y}" rx="12" ry="15" fill="${color}"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="11" ry="16" fill="${color}" stroke="#000000" stroke-opacity="0.15"/>`

const firefly = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="3" fill="#fff3a3"/>`

export default svgLevel({
  id: 12,
  chapter: 'farm',
  title: 'evening',
  parTimeSec: 85,
  redesign: level012Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let tufts = ''
    for (let i = 0; i < 12; i++) tufts += grass(10 + rand() * 780, 380 + rand() * 115).replace('#5fae4b', '#4c8a3c')
    let flies = ''
    for (let i = 0; i < 5; i++) {
      const x = 560 + rand() * 200
      const y = 390 + rand() * 80
      const period = 1.5 + rand()
      flies += anim({ type: 'blink', period, phase: rand(), duty: 0.6 }, firefly(x, y))
    }

    return (
      // Sunset sky in bands
      `<rect width="800" height="500" fill="#ffb38a"/>` +
      `<rect width="800" height="90" fill="#7b6cb0"/><rect y="90" width="800" height="70" fill="#a77bb5"/>` +
      `<rect y="160" width="800" height="60" fill="#e48fa6"/>` +
      diff(650, 70, 28, `<circle cx="650" cy="70" r="22" fill="#fff3c4"/><circle cx="643" cy="64" r="4" fill="#efe0a8"/>`, '') +
      `<circle cx="140" cy="300" r="60" fill="#ff7b54"/>` +
      `<ellipse cx="200" cy="320" rx="320" ry="70" fill="#6aa354"/>` +
      `<ellipse cx="650" cy="330" rx="260" ry="60" fill="#5f9e4a"/>` +
      `<rect y="320" width="800" height="180" fill="#5a9446"/>` +
      anim({ type: 'path', points: [[0, 0], [-60, 0]], period: 26 }, `<ellipse cx="300" cy="120" rx="60" ry="10" fill="#c48bb9"/>`) +
      // Farmhouse
      `<rect x="350" y="165" width="18" height="40" fill="#6b4f3a"/>` +
      diff(369, 128, 38, smoke, '') +
      `<rect x="300" y="220" width="220" height="140" fill="#d9a87a"/>` +
      `<path d="M285 225L410 150L535 225Z" fill="#7a3f2c"/>` +
      diff(483, 178, 26, cat(480, 192), '') +
      lit(340, 240) +
      lit(440, 240) +
      lit(330, 295) +
      `<rect x="466" y="291" width="48" height="48" fill="#5a3d2b"/><rect x="470" y="295" width="40" height="40" fill="#3d3550"/>` +
      diff(490, 315, 30, windowLight, anim({ type: 'blink', period: 1.4, duty: 0.55 }, windowLight)) +
      `<rect x="395" y="290" width="40" height="70" fill="#5a3d2b"/>` +
      fence(560, 800, 360, '#b98f5f') +
      tufts +
      diff(250, 440, 28, pumpkin(250, 442, '#f77f00'), pumpkin(250, 442, '#8ac926')) +
      pumpkin(205, 452, '#f77f00') +
      flies +
      milkCan(540, 355) +
      stump(70, 430) +
      mushroom(360, 470) +
      wheelbarrow(770, 470) +
      stones(505, 475) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['flower', 496, 447, '#ff9f43'],
        ['bee', 169, 412],
        ['flower', 150, 290, '#4dabf7'],
        ['stones', 657, 445],
        ['snail', 352, 411],
        ['flower', 61, 389, '#b38cff'],
        ['ladybug', 276, 290],
        ['birds', 517, 50],
        ['birds', 251, 54],
        ['cloud', 58, 53],
      ])
    )
  },
})
