// Motion difference: the duck swims faster on picture B.
import { extras } from '../extras.ts'
import type { AnimSpec } from '../helpers.ts'
import { bird, frog, stump } from '../chapter-03/shapes.ts'
import { svgLevel } from '../helpers.ts'
import { level013Redesign } from './level-013-redesign.ts'
import { cloud, duck, flower, FLOWER_COLORS, grass, pick, snail, stones, sun, tree } from '../shapes.ts'

const swim = (period: number): AnimSpec => ({
  id: 'duck',
  type: 'path',
  points: [
    [0, 0],
    [230, 0],
  ],
  flipX: 254,
  period,
})

/** (x, y) = bottom center. Bounds: x ±50, y from −34 to 0 (sail up to −80). */
const boat = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y - 30}V${y - 80}" stroke="#6b4f3a" stroke-width="3"/>` +
  `<path d="M${x + 3} ${y - 78}L${x + 36} ${y - 34}H${x + 3}Z" fill="#fffaf0"/>` +
  `<path d="M${x - 50} ${y - 30}H${x + 50}L${x + 36} ${y}H${x - 36}Z" fill="${color}"/>`

/** Fish leaping over the water; (x, y) = center. Bounds: x ±20, y ±14. */
const fish = (x: number, y: number) =>
  `<g transform="rotate(-30 ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="14" ry="7" fill="#ff9f43"/>` +
  `<path d="M${x - 12} ${y}L${x - 22} ${y - 7}L${x - 22} ${y + 7}Z" fill="#ff9f43"/>` +
  `<circle cx="${x + 8}" cy="${y - 2}" r="1.6" fill="#222"/></g>`

const lamp = `<path d="M150 262V232" stroke="#333" stroke-width="3"/><circle cx="150" cy="226" r="8" fill="#ffd166" stroke="#333" stroke-width="2"/>`

/** (x, y) = bottom of the stem. Bounds: x ±16, y from −26 to 0. */
const mushroom = (x: number, y: number, cap: string) =>
  `<rect x="${x - 5}" y="${y - 14}" width="10" height="14" rx="3" fill="#fff3d6"/>` +
  `<path d="M${x - 16} ${y - 12}Q${x} ${y - 36} ${x + 16} ${y - 12}Z" fill="${cap}"/>` +
  `<circle cx="${x - 5}" cy="${y - 20}" r="2.5" fill="#fff"/><circle cx="${x + 6}" cy="${y - 17}" r="2" fill="#fff"/>`

export default svgLevel({
  id: 13,
  chapter: 'farm',
  title: 'river',
  parTimeSec: 85,
  redesign: level013Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let tufts = ''
    for (let i = 0; i < 10; i++) tufts += grass(10 + rand() * 780, 440 + rand() * 55)
    let flowers = ''
    for (let i = 0; i < 7; i++) {
      const x = 420 + rand() * 360
      const y = 470 + rand() * 25
      const period = 2.5 + rand()
      flowers += anim({ type: 'sway', angle: 6, pivot: [x, y], period, phase: rand() }, flower(x, y, pick(rand, FLOWER_COLORS)))
    }
    let ripples = ''
    for (let i = 0; i < 8; i++) ripples += `<path d="M${40 + i * 95 + rand() * 30} ${320 + (i % 3) * 30}h${30 + rand() * 20}" stroke="#a5dcf3" stroke-width="3" stroke-linecap="round"/>`

    return (
      `<rect width="800" height="500" fill="#b9e2f5"/>` +
      sun(560, 70) +
      anim({ type: 'path', points: [[0, 0], [70, 0]], period: 24 }, cloud(300, 75, 0.8)) +
      `<ellipse cx="450" cy="285" rx="420" ry="45" fill="#a6d985"/>` +
      `<rect y="270" width="800" height="30" fill="#97cf6e"/>` +
      tree(690, 290) +
      // River
      `<rect y="295" width="800" height="135" fill="#4fa9d8"/>` +
      `<rect y="305" width="800" height="115" fill="#63b8e3"/>` +
      anim({ type: 'bob', dx: 12, dy: 0, period: 4 }, ripples) +
      // Bridge
      `<path d="M30 300Q130 230 230 300V318Q130 258 30 318Z" fill="#a0703f"/>` +
      `<path d="M30 296Q130 226 230 296" stroke="#6b4f3a" stroke-width="4" fill="none"/>` +
      diff(150, 240, 28, lamp, '') +
      diff(730, 312, 28, fish(730, 312), '') +
      diff(600, 380, 54, boat(600, 395, '#e63946'), boat(600, 395, '#3a86ff')) +
      `<rect y="430" width="800" height="70" fill="#8fca68"/>` +
      diff(254, 364, 40, anim(swim(12), duck(250, 370)), anim(swim(7), duck(250, 370)), 'duck') +
      tufts +
      diff(320, 455, 28, mushroom(320, 468, '#e63946'), mushroom(320, 468, '#a0703f')) +
      flowers +
      frog(390, 467) +
      stump(590, 294) +
      bird(690, 118) +
      snail(160, 472) +
      stones(240, 480) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['stones', 689, 476],
        ['snail', 203, 475],
        ['ladybug', 405, 479],
        ['grass', 109, 459],
        ['fish', 161, 330, '#4dabf7'],
        ['fish', 56, 351, '#ff9f43'],
        ['fish', 733, 402, '#ffb703'],
        ['cloud', 400, 140],
        ['birds', 721, 71],
        ['butterfly', 581, 141],
      ])
    )
  },
})
