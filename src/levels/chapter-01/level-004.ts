// Demo of motion differences (spec, section 4). By the spec they start around level 11;
// the level order is settled in stage 7.
import type { AnimSpec } from '../helpers.ts'
import { svgLevel } from '../helpers.ts'
import { cloud, duck, flower, FLOWER_COLORS, grass, pick, sun, tree } from '../shapes.ts'

const blades = () => {
  let s = ''
  for (const angle of [0, 90, 180, 270])
    s += `<rect x="-9" y="-82" width="18" height="72" rx="3" fill="#fffaf0" stroke="#c9b79c" stroke-width="2" transform="rotate(${angle})"/>`
  return `<g transform="translate(600 185)">${s}<circle r="9" fill="#6b4f3a"/></g>`
}

const flag = `<path d="M125 127L168 138L125 149Z" fill="#e63946"/>`

const windowLight = `<rect x="90" y="265" width="36" height="36" fill="#ffe066"/>`

const swing =
  `<path d="M424 268V323M440 268V323" stroke="#6b4f3a" stroke-width="2.5"/>` +
  `<rect x="418" y="321" width="28" height="6" rx="2" fill="#8a5a33"/>`

const swim = (period: number): AnimSpec => ({
  id: 'duck',
  type: 'path',
  points: [
    [0, 0],
    [220, 0],
  ],
  flipX: 154,
  period,
})

export default svgLevel({
  id: 4,
  chapter: 'farm',
  title: 'windmill',
  parTimeSec: 90,
  scene: ({ diff, anim, rand }) => {
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
      // House: the window light blinks only on picture B; the flag waves only on B.
      `<path d="M125 185V125" stroke="#6b4f3a" stroke-width="3"/>` +
      diff(145, 138, 32, flag, anim({ id: 'flag', type: 'sway', angle: 14, pivot: [125, 138], period: 1.4 }, flag), 'flag') +
      `<path d="M38 250L125 185L212 250Z" fill="#8e5b3a"/>` +
      `<rect x="50" y="245" width="150" height="85" fill="#f2d29b"/>` +
      `<rect x="150" y="280" width="32" height="50" fill="#8a5a33"/>` +
      `<rect x="86" y="261" width="44" height="44" fill="#ffffff"/>` +
      `<rect x="90" y="265" width="36" height="36" fill="#3d4a5c"/>` +
      diff(108, 283, 28, windowLight, anim({ type: 'blink', period: 1.6 }, windowLight)) +
      // Tree with a swing that is out of sync between the pictures
      tree(380, 330) +
      diff(
        432,
        305,
        45,
        anim({ id: 'swing', type: 'sway', angle: 20, pivot: [432, 268], period: 2.4 }, swing),
        anim({ id: 'swing', type: 'sway', angle: 20, pivot: [432, 268], period: 2.4, phase: 0.25 }, swing),
        'swing',
      ) +
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
      // Pond: the duck swims faster on B
      `<ellipse cx="265" cy="420" rx="215" ry="55" fill="#4fa9d8"/>` +
      `<ellipse cx="265" cy="424" rx="190" ry="42" fill="#63b8e3"/>` +
      diff(154, 412, 40, anim(swim(12), duck(150, 418)), anim(swim(7), duck(150, 418)), 'duck')
    )
  },
})
