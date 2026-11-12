import { bench } from '../chapter-02/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { level305Redesign } from './level-305-redesign.ts'
import { cloud, sun } from '../shapes.ts'
import { ball, bird, birds, bush, butterfly, dog, flowers, grass, slide, stones, swingFrame, swingSeat } from '../time/shapes.ts'
import { around, big, daySky, ground, kite, roundTree } from './shapes.ts'
import { beachBall, bucket } from '../chapter-04/shapes.ts'

export default memoryLevel({
  id: 305,
  title: 'memoryPlayground',
  showSeconds: 5,
  redesign: level305Redesign,
  scene: ({ diff }) =>
    daySky(370) +
    sun(420, 80) +
    big(200, 100, 1.1, cloud(0, 0)) +
    ground(360, '#8fd16a') +
    roundTree(100, 420) +
    `<rect x="290" y="520" width="160" height="50" rx="6" fill="#a0703f"/><rect x="300" y="528" width="140" height="34" rx="4" fill="#f4dca4"/>` +
    big(330, 480, 1.6, swingFrame(0, 0, '#3a86ff') + swingSeat(0, -90, '#e63946')) +
    diff(...around(50, 518, 198, 640), big(60, 640, 1.6, slide(0, 0, '#ffb703')), big(60, 640, 1.6, slide(0, 0, '#3fa46f'))) +
    diff(...around(346, 646, 454, 700), big(400, 700, 1.8, bench(0, 0)), '') +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(420, 190, 0.6) +
    cloud(60, 60, 0.5) +
    birds(320, 160) +
    kite(250, 230, '#e63946') +
    butterfly(220, 330) +
    butterfly(460, 400, '#ff6b8b') +
    bird(30, 450) +
    grass(200, 450) +
    flowers(230, 440, '#ffd23f') +
    bush(450, 470, 0.8) +
    bucket(325, 555, '#ff6b8b') +
    beachBall(410, 555) +
    dog(45, 735) +
    stones(470, 740) +
    grass(150, 740) +
    diff(...around(228, 677, 272, 720, 32), '', big(250, 720, 1.8, ball(0, 0, '#e63946'))),
})
