import { ball } from '../time/shapes.ts'
import { bottleMessage, bucket, buoy, castleFlag, crab, dolphin, flipFlops, gull, palm, parasol, sailboat, sandcastle, shell, starfish, sunHat, towel, waves } from '../chapter-04/shapes.ts'
import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
import { cloud, sun } from '../shapes.ts'
import { around, big, daySky, ground } from './shapes.ts'

export default memoryLevel({
  id: 303,
  title: 'memoryBeach',
  showSeconds: 5,
  scene: ({ diff, extra, anim }) =>
    daySky(330) +
    sun(100, 90) +
    ground(300, '#3ba7cc') +
    waves(380, 7, 80, '#2f93bb', 460) +
    diff(...around(280, 252, 380, 381), big(330, 370, 1.4, sailboat(0, 0, '#e63946')), '') +
    ground(450, '#f4dca4') +
    big(80, 600, 1.5, palm(0, 0)) +
    diff(...around(280, 489, 400, 600), big(340, 600, 1.5, parasol(0, 0, '#ff6b8b')), big(340, 600, 1.5, parasol(0, 0, '#ffd23f'))) +
    big(345, 682, 1.6, towel(0, 0, '#3a86ff')) +
    big(140, 715, 1.3, sandcastle(0, 0)) +
    big(240, 712, 2, ball(0, 0, '#ffb703')) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(250, 60, 0.6) +
    cloud(430, 190, 0.5) +
    gull(400, 110) +
    gull(210, 170) +
    buoy(60, 400) +
    buoy(460, 420, '#ffb703') +
    dolphin(170, 395) +
    castleFlag(140, 715, '#e63946') +
    bucket(225, 560, '#e63946') +
    flipFlops(470, 600) +
    bottleMessage(320, 738) +
    shell(275, 742) +
    sunHat(470, 660) +
    shell(30, 725, '#ffc8a8') +
    starfish(40, 660) +
    diff(...around(408, 691, 472, 720), '', big(440, 720, 1.6, crab(0, 0))) +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['flipFlops', 40, 490],
      ['lifeRing', 465, 350],
      ['cloud', 420, 60],
    ]),
})
