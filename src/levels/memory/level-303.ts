import { ball } from '../time/shapes.ts'
import { crab, palm, parasol, sailboat, sandcastle, towel, waves } from '../chapter-04/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { sun } from '../shapes.ts'
import { around, big, daySky } from './shapes.ts'

export default memoryLevel({
  id: 303,
  title: 'memoryBeach',
  showSeconds: 5,
  scene: ({ diff }) =>
    daySky(260) +
    sun(110, 80) +
    `<rect y="230" width="800" height="110" fill="#3ba7cc"/>` +
    waves(300, 10, 80, '#2f93bb', 340) +
    diff(...around(510, 132, 610, 261), big(560, 250, 1.4, sailboat(0, 0, '#e63946')), '') +
    `<rect y="330" width="800" height="170" fill="#f4dca4"/>` +
    big(80, 420, 1.5, palm(0, 0)) +
    diff(...around(280, 329, 400, 440), big(340, 440, 1.5, parasol(0, 0, '#ff6b8b')), big(340, 440, 1.5, parasol(0, 0, '#ffd23f'))) +
    big(520, 440, 1.6, towel(0, 0, '#3a86ff')) +
    big(650, 400, 1.3, sandcastle(0, 0)) +
    big(220, 480, 2, ball(0, 0, '#ffb703')) +
    diff(...around(658, 441, 722, 470), '', big(690, 470, 1.6, crab(0, 0))),
})
