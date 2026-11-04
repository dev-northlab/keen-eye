import { bird } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { birdhouse, cat, cloud, fence, hayBale, pumpkin, sun, tractor, wheelbarrow } from '../shapes.ts'

/** Faces right; (x, y) = feet. Bounds: x ±16, y from −20 to +2. */
const crow = (x: number, y: number) =>
  `<path d="M${x - 3} ${y - 4}v6M${x + 3} ${y - 4}v6" stroke="#f2a541" stroke-width="2"/>` +
  `<path d="M${x - 16} ${y - 12}L${x - 4} ${y - 10}L${x - 6} ${y - 4}Z" fill="#1f1f1f"/>` +
  `<ellipse cx="${x}" cy="${y - 9}" rx="10" ry="7" fill="#2b2b2b"/>` +
  `<circle cx="${x + 8}" cy="${y - 15}" r="5" fill="#2b2b2b"/>` +
  `<path d="M${x + 12} ${y - 16}l4 2l-4 1Z" fill="#f2a541"/>`

const flyingCrow = (x: number, y: number) =>
  `<path d="M${x - 16} ${y}Q${x - 8} ${y - 9} ${x} ${y}Q${x + 8} ${y - 9} ${x + 16} ${y}" stroke="#2b2b2b" stroke-width="3" fill="none" stroke-linecap="round"/>`

/** Wheat field rows from y0 down to the bottom. */
const field = (y0: number) => {
  let rows = ''
  for (let y = y0, i = 0; y < 500; y += 22, i++) rows += `<rect y="${y}" width="800" height="12" fill="${i % 2 ? '#e9c46a' : '#f4d58d'}"/>`
  return `<rect y="${y0}" width="800" height="${500 - y0}" fill="#e2b857"/>` + rows
}

export default svgLevel({
  id: 8,
  chapter: 'farm',
  title: 'wheat',
  parTimeSec: 75,
  scene: ({ diff, anim, extra }) =>
    `<rect width="800" height="500" fill="#a9daf2"/>` +
    sun(560, 70) +
    anim({ type: 'path', points: [[0, 0], [60, 0]], period: 22 }, cloud(320, 70, 0.8)) +
    anim({ type: 'path', points: [[0, 0], [-120, 15]], period: 12 }, flyingCrow(500, 150) + flyingCrow(530, 135)) +
    `<ellipse cx="300" cy="300" rx="420" ry="50" fill="#9fd47c"/>` +
    // Farmhouse far away (the chimney is behind the roof)
    diff(152, 232, 24, `<rect x="145" y="220" width="15" height="28" fill="#8d6e63"/>`, '') +
    `<rect x="80" y="250" width="90" height="50" fill="#f2d29b"/>` +
    `<path d="M70 255L125 215L180 255Z" fill="#b5523b"/>` +
    `<rect x="95" y="265" width="18" height="18" fill="#7cc6f0"/><rect x="135" y="270" width="18" height="30" fill="#8a5a33"/>` +
    // Silo
    `<rect x="690" y="180" width="60" height="130" fill="#d9d9d9"/>` +
    `<path d="M690 215H750M690 250H750M690 285H750" stroke="#bdbdbd" stroke-width="3"/>` +
    diff(720, 166, 38, `<path d="M688 182A32 32 0 0 1 752 182Z" fill="#b5523b"/>`, `<path d="M688 182A32 32 0 0 1 752 182Z" fill="#4dabf7"/>`) +
    field(300) +
    fence(0, 300, 300, '#d8c08f') +
    diff(211, 277, 24, crow(211, 286), '') +
    diff(359, 396, 76, tractor(360, 440), tractor(360, 440, '#2a9d8f')) +
    hayBale(560, 420) +
    diff(660, 450, 44, hayBale(660, 450), '') +
    hayBale(750, 405) +
    bird(251, 288) +
    birdhouse(318, 300) +
    wheelbarrow(110, 400) +
    pumpkin(470, 488) +
    cat(770, 492) +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['bee', 196, 412],
      ['stones', 720, 329],
      ['bird', 569, 364],
      ['butterfly', 59, 400],
      ['bee', 491, 435],
      ['horseshoe', 437, 272],
      ['butterfly', 350, 274],
      ['butterfly', 237, 164],
      ['cloud', 595, 191],
      ['birds', 456, 50],
    ]),
})
