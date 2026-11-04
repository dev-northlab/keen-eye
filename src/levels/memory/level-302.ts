import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
import { beehive, cloud, cow, fence, hayBale, hen, pig, sheep, sun, sunflower } from '../shapes.ts'
import { around, barn, barnDoor, big, daySky, ground, hills, roundTree } from './shapes.ts'
import { bird, birds, bucket, butterfly, cat, flowers, grass } from '../time/shapes.ts'

export default memoryLevel({
  id: 302,
  title: 'memoryFarmyard',
  showSeconds: 5,
  scene: ({ diff, extra, anim }) =>
    daySky(380) +
    sun(410, 80) +
    diff(...around(245, 102, 355, 174), '', big(300, 150, 1.1, cloud(0, 0))) +
    hills(370, '#8fd16a') +
    ground(380, '#9ccc65') +
    barn(140, 480) +
    diff(...around(100, 390, 180, 480), barnDoor(140, 480, '#ffffff'), barnDoor(140, 480, '#ffd23f')) +
    roundTree(390, 470) +
    fence(20, 480, 560) +
    big(250, 612, 1.2, cow(0, 0)) +
    hayBale(70, 630) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(100, 80, 0.7) +
    cloud(440, 200, 0.5) +
    birds(150, 210) +
    butterfly(250, 300) +
    sheep(455, 515) +
    flowers(25, 520, '#ff6b8b') +
    sunflower(272, 475, 40) +
    bird(255, 530) +
    bird(430, 556, '#e63946') +
    big(24, 470, 0.6, beehive(0, 0)) +
    cat(180, 728, '#3d3d3d') +
    bucket(228, 725) +
    grass(268, 735) +
    hen(40, 712) +
    pig(115, 725) +
    diff(...around(354, 637, 445, 716), big(400, 680, 1.4, hen(0, 0, true)), '') +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['butterfly', 335, 505],
      ['flower', 215, 545, '#4dabf7'],
      ['cloud', 60, 190],
    ]),
})
