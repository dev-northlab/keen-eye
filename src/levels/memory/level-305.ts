import { bench } from '../chapter-02/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { cloud, sun } from '../shapes.ts'
import { ball, slide, swingFrame, swingSeat } from '../time/shapes.ts'
import { around, big, daySky, roundTree } from './shapes.ts'

export default memoryLevel({
  id: 305,
  title: 'memoryPlayground',
  showSeconds: 5,
  scene: ({ diff }) =>
    daySky(330) +
    sun(700, 80) +
    big(340, 90, 1.1, cloud(0, 0)) +
    `<rect y="330" width="800" height="170" fill="#8fd16a"/>` +
    roundTree(110, 360) +
    `<rect x="110" y="430" width="160" height="50" rx="6" fill="#a0703f"/><rect x="120" y="438" width="140" height="34" rx="4" fill="#f4dca4"/>` +
    big(300, 420, 1.6, swingFrame(0, 0, '#3a86ff') + swingSeat(0, -90, '#e63946')) +
    diff(...around(460, 298, 608, 420), big(470, 420, 1.6, slide(0, 0, '#ffb703')), big(470, 420, 1.6, slide(0, 0, '#3fa46f'))) +
    diff(...around(636, 396, 744, 450), big(690, 450, 1.8, bench(0, 0)), '') +
    diff(...around(358, 437, 402, 480, 32), '', big(380, 480, 1.8, ball(0, 0, '#e63946'))),
})
