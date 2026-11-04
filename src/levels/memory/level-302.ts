import { memoryLevel } from '../helpers.ts'
import { beehive, cloud, cow, fence, hayBale, hen, pig, sheep, sun, sunflower } from '../shapes.ts'
import { around, barn, barnDoor, big, daySky, hills, roundTree } from './shapes.ts'
import { bird, birds, bucket, butterfly, cat, flowers, grass } from '../time/shapes.ts'

export default memoryLevel({
  id: 302,
  title: 'memoryFarmyard',
  showSeconds: 5,
  scene: ({ diff }) =>
    daySky(340) +
    sun(700, 80) +
    diff(...around(375, 42, 485, 114), '', big(430, 90, 1.1, cloud(0, 0))) +
    hills(330, '#8fd16a') +
    `<rect y="340" width="800" height="160" fill="#9ccc65"/>` +
    barn(190, 400) +
    diff(...around(150, 310, 230, 400), barnDoor(190, 400, '#ffffff'), barnDoor(190, 400, '#ffd23f')) +
    roundTree(650, 400) +
    fence(300, 560, 360) +
    big(420, 430, 1.2, cow(0, 0)) +
    hayBale(90, 455) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(150, 80, 0.7) +
    cloud(560, 40, 0.5) +
    birds(250, 150) +
    butterfly(330, 250) +
    sheep(50, 330) +
    flowers(30, 400, '#ff6b8b') +
    sunflower(300, 330, 40) +
    bird(330, 318) +
    bird(520, 318, '#e63946') +
    big(760, 330, 0.6, beehive(0, 0)) +
    cat(150, 485, '#3d3d3d') +
    bucket(230, 480) +
    grass(270, 480) +
    hen(320, 470) +
    pig(760, 470) +
    diff(...around(574, 397, 665, 476), big(620, 440, 1.4, hen(0, 0, true)), ''),
})
