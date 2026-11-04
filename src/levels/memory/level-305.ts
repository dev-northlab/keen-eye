import { bench } from '../chapter-02/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { cloud, sun } from '../shapes.ts'
import { ball, bird, birds, bush, butterfly, dog, flowers, grass, slide, stones, swingFrame, swingSeat } from '../time/shapes.ts'
import { around, big, daySky, kite, roundTree } from './shapes.ts'
import { beachBall, bucket } from '../chapter-04/shapes.ts'

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
    // Decor: small things that fill the scene, the same in both pictures
    cloud(560, 60, 0.6) +
    cloud(200, 50, 0.5) +
    birds(500, 150) +
    kite(460, 80, '#e63946') +
    butterfly(220, 300) +
    butterfly(760, 280, '#ff6b8b') +
    bird(60, 360) +
    grass(20, 360) +
    flowers(200, 400, '#ffd23f') +
    bush(770, 350, 0.8) +
    bucket(150, 465, '#ff6b8b') +
    beachBall(230, 470) +
    dog(40, 470) +
    stones(470, 495) +
    grass(560, 495) +
    diff(...around(358, 437, 402, 480, 32), '', big(380, 480, 1.8, ball(0, 0, '#e63946'))),
})
