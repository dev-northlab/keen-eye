import { fireLogs, flame, mushroom, pine, tent } from '../chapter-03/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { sun } from '../shapes.ts'
import { around, backpack, big, daySky } from './shapes.ts'

/** Canoe on the water; (x, y) = waterline center. Bounds: x ±70, y from −16 to +12. */
const canoe = (x: number, y: number) =>
  `<path d="M${x - 70} ${y - 16}q70 40 140 0q-10 28 -70 28q-60 0 -70 -28Z" fill="#e63946"/>` +
  `<path d="M${x - 20} ${y - 14}l40 -2" stroke="#8a5a33" stroke-width="5" stroke-linecap="round"/>`

export default memoryLevel({
  id: 310,
  title: 'memoryCamp',
  showSeconds: 4,
  scene: ({ diff }) =>
    daySky(240) +
    sun(120, 70) +
    pine(330, 250, 1.4) +
    pine(420, 240, 1.7) +
    pine(510, 250, 1.3) +
    `<rect y="240" width="800" height="260" fill="#8fc46a"/>` +
    `<ellipse cx="640" cy="275" rx="170" ry="46" fill="#4dabf7"/>` +
    diff(...around(570, 252, 710, 280), canoe(640, 268), '') +
    diff(...around(170, 292, 350, 400), big(260, 400, 1.8, tent(0, 0, '#ff8c1a')), big(260, 400, 1.8, tent(0, 0, '#3a86ff'))) +
    big(470, 430, 1.8, fireLogs(0, 0) + flame(0, 0)) +
    diff(...around(352, 420, 408, 480), '', big(380, 480, 2, mushroom(0, 0))) +
    pine(80, 480, 1.5) +
    diff(...around(570, 384, 700, 460), backpack(600, 460, '#8338ec'), backpack(670, 460, '#8338ec')),
})
