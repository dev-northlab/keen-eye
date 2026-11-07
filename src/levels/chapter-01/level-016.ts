// Motion differences: the crow flies the other way round on picture B; the tractor's exhaust puff bobs only on B.
import { mushroom } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { apple, basket, cat, cloud, eggNest, grass, hayBale, milkCan, stones, sun, tractor, tree } from '../shapes.ts'
import { level016Redesign } from './level-016-redesign.ts'

/** Crow, faces right; (x, y) = body center. Bounds: x from −18 to +19, y from −12 to +10. */
const crow = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-6 -2L-18 -12L-2 -6Z" fill="#2b2b3a"/><path d="M4 -2L16 -12L8 -4Z" fill="#2b2b3a"/>` +
  `<ellipse rx="10" ry="6" fill="#2b2b3a"/><circle cx="9" cy="-5" r="5" fill="#2b2b3a"/>` +
  `<path d="M13 -5L19 -3L13 -2Z" fill="#f4a261"/><circle cx="10" cy="-6" r="1.2" fill="#fff"/>` +
  `<path d="M-3 6V10M3 6V10" stroke="#f4a261" stroke-width="2"/></g>`

/** Scarecrow on a post at x, ground at y; the hat is separate (a difference). */
const scarecrow = (x: number, y: number) =>
  `<rect x="${x - 3}" y="${y - 100}" width="6" height="100" fill="#8a5a33"/>` +
  `<rect x="${x - 50}" y="${y - 82}" width="100" height="6" fill="#8a5a33"/>` +
  `<path d="M${x - 30} ${y - 88}h60l6 50h-72Z" fill="#3a86ff"/>` +
  `<path d="M${x - 18} ${y - 70}h12M${x + 8} ${y - 60}h12" stroke="#1d3557" stroke-width="3"/>` +
  `<circle cx="${x}" cy="${y - 110}" r="20" fill="#f2d29b"/>` +
  `<circle cx="${x - 7}" cy="${y - 114}" r="2.5" fill="#333"/><circle cx="${x + 7}" cy="${y - 114}" r="2.5" fill="#333"/>` +
  `<path d="M${x - 8} ${y - 102}q8 6 16 0" stroke="#333" stroke-width="2" fill="none"/>`

/** Bounds: x ±22, y from −12 to +12 around (x, y). */
const hat = (x: number, y: number) =>
  `<rect x="${x - 22}" y="${y + 6}" width="44" height="6" fill="#6b4f3a"/><rect x="${x - 14}" y="${y - 12}" width="28" height="20" fill="#6b4f3a"/>`

/** Grain sack; (x, y) = bottom center. Bounds: x ±16, y from −36 to 0. */
const sack = (x: number, y: number) =>
  `<path d="M${x - 14} ${y - 26}q14 -8 28 0v26h-28Z" fill="#d4a373"/>` +
  `<path d="M${x - 10} ${y - 28}q10 -10 20 0" stroke="#a0703f" stroke-width="4" fill="none"/>` +
  `<path d="M${x - 6} ${y - 34}l6 6l6 -6" stroke="#a0703f" stroke-width="3" fill="none"/>`

/** Exhaust puff over the tractor's pipe. Bounds: x from −10 to +11, y from −14 to +14 around (x, y). */
const puff = (x: number, y: number) =>
  `<circle cx="${x - 3}" cy="${y + 7}" r="7" fill="#c9c9c9"/><circle cx="${x + 2}" cy="${y - 5}" r="9" fill="#d6d6d6"/>`

export default svgLevel({
  id: 16,
  chapter: 'farm',
  title: 'harvest',
  parTimeSec: 100,
  redesign: level016Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let stalks = ''
    for (let i = 0; i < 90; i++) {
      const x = 10 + rand() * 780
      const y = 318 + rand() * 70
      stalks += `<path d="M${x} ${y}v-18M${x} ${y - 14}l-4 -6M${x} ${y - 10}l4 -6" stroke="#c9a227" stroke-width="2" fill="none"/>`
    }
    let tufts = ''
    for (let i = 0; i < 10; i++) tufts += grass(10 + rand() * 780, 420 + rand() * 75)
    const flight = (reverse: boolean) =>
      anim({ id: 'crow', type: 'path', points: [[0, 0], [220, 0]], flipX: 260, period: 9, reverse }, crow(260, 120))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(680, 80) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 26 }, cloud(200, 90, 0.8)) +
      anim({ type: 'path', points: [[0, 0], [-40, 0]], period: 32 }, cloud(520, 60, 0.55)) +
      diff(260, 120, 24, flight(false), flight(true), 'crow') +
      `<ellipse cx="400" cy="300" rx="520" ry="70" fill="#a6d985"/>` +
      // Wheat field with a harvested strip
      `<rect y="300" width="800" height="100" fill="#e9c46a"/>` +
      `<rect y="360" width="800" height="40" fill="#f0d48a"/>` +
      stalks +
      `<rect y="400" width="800" height="100" fill="#8fca68"/>` +
      tree(90, 400) +
      apple(60, 300) +
      apple(118, 318) +
      apple(92, 262) +
      scarecrow(430, 400) +
      diff(430, 288, 26, hat(430, 288), '') +
      diff(474, 311, 22, crow(474, 312), '') +
      tractor(330, 470, '#d62828') +
      diff(375, 385, 24, puff(375, 385), anim({ id: 'puff', type: 'bob', dx: 0, dy: 6, period: 2.2 }, puff(375, 385)), 'puff') +
      sack(520, 470) +
      sack(556, 474) +
      hayBale(600, 440) +
      diff(700, 450, 44, hayBale(700, 450), '') +
      basket(150, 478) +
      diff(210, 460, 36, basket(210, 480), basket(210, 480, '#8ac926')) +
      tufts +
      mushroom(30, 425) +
      milkCan(460, 470) +
      cat(775, 480) +
      eggNest(268, 490) +
      stones(420, 488) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['stones', 339, 264],
        ['snail', 483, 436],
        ['flower', 529, 275, '#b38cff'],
        ['ladybug', 51, 473],
        ['mushroom', 186, 286],
        ['chick', 731, 275],
        ['grass', 629, 268],
        ['cloud', 51, 118],
        ['birds', 588, 105],
        ['butterfly', 281, 40],
      ])
    )
  },
})
