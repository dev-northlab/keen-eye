import { buoy, dolphin, gull, lifeRing, rock, sailboat, waves } from '../chapter-04/shapes.ts'
import { person } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
import { cloud, sun } from '../shapes.ts'
import { barrel, bollard, crate, lighthouse, ropeCoil, rowboat } from '../time/shapes.ts'
import { around, big, daySky, ground } from './shapes.ts'

export default memoryLevel({
  id: 313,
  title: 'memoryHarbor',
  showSeconds: 3,
  scene: ({ diff, extra, anim }) =>
    daySky(360) +
    sun(80, 70) +
    big(330, 80, 1, cloud(0, 0)) +
    diff(...around(198, 154, 262, 182, 32), '', big(230, 170, 2, gull(0, 0))) +
    ground(350, '#3ba7cc') +
    waves(420, 7, 80, '#2f93bb', 440) +
    // Lighthouse on its rock
    `<path d="M330 380Q350 340 410 342Q480 342 500 380Z" fill="#8d99ae"/>` +
    big(410, 370, 1.4, lighthouse(0, 0, diff(...around(382, 219, 438, 328), '#e63946', '#3a86ff'))) +
    diff(...around(306, 434, 414, 572), big(360, 560, 1.5, sailboat(0, 0, '#e63946')), '') +
    diff(...around(130, 596, 230, 676), big(150, 640, 2, buoy(0, 0)), big(210, 660, 2, buoy(0, 0))) +
    // Pier with crates and a sailor
    `<path d="M40 448V530M120 448V530M200 448V530M280 448V530" stroke="#6b4f3a" stroke-width="12"/>` +
    `<rect x="0" y="430" width="300" height="18" fill="#a0703f"/>` +
    crate(70, 430, 50) +
    crate(130, 430, 50) +
    diff(...around(45, 330, 155, 430), crate(100, 380, 50), '') +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(200, 40, 0.4) +
    cloud(450, 50, 0.5) +
    gull(130, 110) +
    gull(470, 200) +
    gull(300, 250) +
    barrel(285, 430) +
    ropeCoil(175, 438) +
    lifeRing(200, 480) +
    rock(460, 570, 0.7) +
    buoy(60, 560, '#ffb703') +
    rowboat(70, 720, '#e63946') +
    buoy(420, 720, '#ffb703') +
    bollard(15, 430) +
    buoy(470, 470, '#ffffff') +
    dolphin(300, 700) +
    big(230, 430, 1.6, person(0, 0, '#3a86ff')) +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['bottle', 300, 645],
      ['buoy', 450, 650],
      ['cloud', 110, 228],
      ['gull', 60, 170],
    ]),
})
