import { bird, butterfly, mushroom, stump } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level004Redesign } from './level-004-redesign.ts'
import { apple, basket, cloud, flower, FLOWER_COLORS, grass, pick, sun, tree, wateringCan } from '../shapes.ts'

/** (x, y) = ground under the middle. Bounds: x ±50, y from −38 to 0 (either direction). */
const wheelbarrow = (x: number, y: number, flip: boolean) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<path d="M-14 -14L-48 -30" stroke="#8a5a33" stroke-width="5" stroke-linecap="round"/>` +
  `<path d="M-30 -20L-34 0" stroke="#8a5a33" stroke-width="4"/>` +
  `<path d="M-32 -36L38 -36L26 -12L-18 -12Z" fill="#4dabf7"/>` +
  `<circle cx="26" cy="-10" r="10" fill="#333"/><circle cx="26" cy="-10" r="3" fill="#ccc"/></g>`

/** (x, y) = center. Bounds: x ±16, y ±21. */
const birdhouse = (x: number, y: number) =>
  `<path d="M${x - 16} ${y - 6}L${x} ${y - 21}L${x + 16} ${y - 6}Z" fill="#b5523b"/>` +
  `<rect x="${x - 12}" y="${y - 7}" width="24" height="24" fill="#f2d29b"/>` +
  `<circle cx="${x}" cy="${y + 3}" r="5" fill="#5a3d1e"/>` +
  `<rect x="${x - 2}" y="${y + 17}" width="4" height="4" fill="#8a5a33"/>`

/** Ladder leaning from (x0, y0) on the ground to (x1, y1). */
const ladder = (x0: number, y0: number, x1: number, y1: number) => {
  let rungs = ''
  for (let i = 1; i < 7; i++) {
    const f = i / 7
    const x = x0 + (x1 - x0) * f
    const y = y0 + (y1 - y0) * f
    rungs += `M${x - 12} ${y}H${x + 12}`
  }
  return (
    `<path d="M${x0 - 12} ${y0}L${x1 - 12} ${y1}M${x0 + 12} ${y0}L${x1 + 12} ${y1}" stroke="#a0703f" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="${rungs}" stroke="#a0703f" stroke-width="4"/>`
  )
}

export default svgLevel({
  id: 4,
  chapter: 'farm',
  title: 'orchard',
  parTimeSec: 70,
  redesign: level004Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let tufts = ''
    for (let i = 0; i < 12; i++) tufts += grass(10 + rand() * 780, 345 + rand() * 150)
    let flowers = ''
    for (let i = 0; i < 9; i++) {
      const x = 20 + rand() * 760
      const y = 470 + rand() * 25
      const period = 2.5 + rand()
      flowers += anim({ type: 'sway', angle: 6, pivot: [x, y], period, phase: rand() }, flower(x, y, pick(rand, FLOWER_COLORS)))
    }

    return (
      `<rect width="800" height="500" fill="#b9e2f5"/>` +
      sun(70, 70) +
      anim({ type: 'path', points: [[0, 0], [70, 0]], period: 22 }, cloud(300, 80, 0.8)) +
      anim({ type: 'path', points: [[0, 0], [-50, 0]], period: 18 }, cloud(560, 55, 0.6)) +
      `<ellipse cx="200" cy="330" rx="320" ry="70" fill="#a6d985"/>` +
      `<ellipse cx="660" cy="335" rx="260" ry="60" fill="#9fd47c"/>` +
      `<rect y="320" width="800" height="180" fill="#94cf6b"/>` +
      tufts +
      // Trees with apples
      tree(150, 335) +
      apple(110, 225) +
      apple(185, 200) +
      diff(120, 180, 26, apple(120, 180), '') +
      apple(175, 255) +
      tree(400, 330) +
      apple(360, 210) +
      apple(430, 180) +
      apple(385, 255) +
      tree(660, 335) +
      apple(625, 205) +
      apple(700, 230) +
      apple(690, 180) +
      diff(660, 270, 28, birdhouse(660, 270), '') +
      diff(458, 263, 76, ladder(440, 330, 475, 196), '') +
      diff(561, 393, 28, basket(560, 420), basket(560, 420, '#8ac926')) +
      diff(250, 421, 56, wheelbarrow(250, 440, false), wheelbarrow(250, 440, true)) +
      flowers +
      bird(190, 171) +
      mushroom(110, 342) +
      stump(320, 478) +
      butterfly(560, 330) +
      wateringCan(705, 346) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['stones', 58, 414],
        ['snail', 677, 449],
        ['flower', 388, 384, '#4dabf7'],
        ['ladybug', 563, 302],
        ['mushroom', 76, 303],
        ['chick', 749, 303],
        ['grass', 223, 304],
        ['butterfly', 405, 123],
        ['cloud', 690, 63],
        ['birds', 253, 50],
      ])
    )
  },
})
