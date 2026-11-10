// Motion difference: the windmill blades turn the other way on picture B.
import { frog, mushroom } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level011Redesign } from './level-011-redesign.ts'
import { birdhouse, cat, cloud, duck, flower, FLOWER_COLORS, grass, pick, sun, tree, wateringCan } from '../shapes.ts'

const blades = () => {
  let s = ''
  for (const angle of [0, 90, 180, 270])
    s += `<rect x="-9" y="-82" width="18" height="72" rx="3" fill="#fffaf0" stroke="#c9b79c" stroke-width="2" transform="rotate(${angle})"/>`
  return `<g transform="translate(600 185)">${s}<circle r="9" fill="#6b4f3a"/></g>`
}

const flag = (color: string) => `<path d="M125 127L168 138L125 149Z" fill="${color}"/>`

const swing =
  `<path d="M424 268V323M440 268V323" stroke="#6b4f3a" stroke-width="2.5"/>` +
  `<rect x="418" y="321" width="28" height="6" rx="2" fill="#8a5a33"/>`

export default svgLevel({
  id: 11,
  chapter: 'farm',
  title: 'windmill',
  parTimeSec: 85,
  redesign: level011Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let tufts = ''
    for (let i = 0; i < 12; i++) tufts += grass(10 + rand() * 780, 340 + rand() * 150)
    let flowers = ''
    for (let i = 0; i < 8; i++) {
      const x = 500 + rand() * 290
      const y = 360 + rand() * 135
      const period = 2.5 + rand()
      flowers += anim({ type: 'sway', angle: 6, pivot: [x, y], period, phase: rand() }, flower(x, y, pick(rand, FLOWER_COLORS)))
    }

    return (
      `<rect width="800" height="500" fill="#bde3f2"/>` +
      sun(300, 70) +
      anim({ type: 'path', points: [[0, 0], [-60, 0]], period: 20 }, cloud(430, 90, 0.8)) +
      `<ellipse cx="620" cy="340" rx="280" ry="70" fill="#a6d985"/>` +
      `<rect y="330" width="800" height="170" fill="#96cc6c"/>` +
      tufts +
      // House
      `<path d="M125 185V125" stroke="#6b4f3a" stroke-width="3"/>` +
      diff(145, 138, 30, flag('#e63946'), flag('#3a86ff')) +
      `<path d="M38 250L125 185L212 250Z" fill="#8e5b3a"/>` +
      `<rect x="50" y="245" width="150" height="85" fill="#f2d29b"/>` +
      diff(166, 305, 30, `<rect x="150" y="280" width="32" height="50" fill="#8a5a33"/>`, `<rect x="150" y="280" width="32" height="50" fill="#2a9d8f"/>`) +
      `<rect x="78" y="261" width="44" height="44" fill="#ffffff"/>` +
      diff(100, 283, 28, `<rect x="82" y="265" width="36" height="36" fill="#ffe066"/>`, `<rect x="82" y="265" width="36" height="36" fill="#3d4a5c"/>`) +
      // Tree with a swing (only on A)
      tree(380, 330) +
      diff(432, 305, 45, anim({ id: 'swing', type: 'sway', angle: 18, pivot: [432, 268], period: 2.4 }, swing), '', 'swing') +
      // Windmill: blades turn the other way on B
      `<path d="M565 330L635 330L622 200L578 200Z" fill="#e8d9c0"/>` +
      `<rect x="588" y="295" width="24" height="35" rx="12" fill="#8a5a33"/>` +
      `<path d="M570 205L600 165L630 205Z" fill="#b5523b"/>` +
      diff(
        600,
        185,
        90,
        anim({ type: 'rotate', pivot: [600, 185], period: 6 }, blades()),
        anim({ type: 'rotate', pivot: [600, 185], period: 6, reverse: true }, blades()),
      ) +
      flowers +
      // Pond with a swimming duck (the same on both pictures)
      `<ellipse cx="265" cy="420" rx="215" ry="55" fill="#4fa9d8"/>` +
      `<ellipse cx="265" cy="424" rx="190" ry="42" fill="#63b8e3"/>` +
      anim({ type: 'path', points: [[0, 0], [220, 0]], flipX: 154, period: 12 }, duck(150, 418)) +
      frog(510, 467) +
      mushroom(300, 352) +
      cat(225, 332) +
      birdhouse(520, 345) +
      wateringCan(745, 470) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['bee', 556, 434],
        ['flower', 726, 415, '#b38cff'],
        ['stones', 79, 375],
        ['snail', 682, 299],
        ['ladybug', 332, 344],
        ['mushroom', 57, 473],
        ['birds', 56, 104],
        ['butterfly', 207, 86],
        ['cloud', 713, 63],
        ['fish', 404, 433, '#9ef01a'],
      ])
    )
  },
})
