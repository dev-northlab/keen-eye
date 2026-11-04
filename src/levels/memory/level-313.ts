import { buoy, dolphin, gull, lifeRing, rock, sailboat, waves } from '../chapter-04/shapes.ts'
import { person } from '../chapter-02/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { cloud, sun } from '../shapes.ts'
import { barrel, bollard, crate, lighthouse, ropeCoil, rowboat } from '../time/shapes.ts'
import { around, big, daySky } from './shapes.ts'

export default memoryLevel({
  id: 313,
  title: 'memoryHarbor',
  showSeconds: 3,
  scene: ({ diff }) =>
    daySky(270) +
    sun(100, 70) +
    big(420, 80, 1, cloud(0, 0)) +
    diff(...around(218, 104, 282, 132, 32), '', big(250, 120, 2, gull(0, 0))) +
    `<rect y="260" width="800" height="240" fill="#3ba7cc"/>` +
    waves(330, 10, 80, '#2f93bb', 350) +
    // Lighthouse on its rock
    `<path d="M620 300Q640 260 700 262Q770 262 790 300Z" fill="#8d99ae"/>` +
    big(700, 290, 1.4, lighthouse(0, 0, diff(...around(672, 139, 728, 248), '#e63946', '#3a86ff'))) +
    diff(...around(396, 254, 504, 392), big(450, 380, 1.5, sailboat(0, 0, '#e63946')), '') +
    diff(...around(580, 376, 680, 456), big(600, 420, 2, buoy(0, 0)), big(660, 440, 2, buoy(0, 0))) +
    // Pier with crates and a sailor
    `<path d="M40 348V430M120 348V430M200 348V430M280 348V430" stroke="#6b4f3a" stroke-width="12"/>` +
    `<rect x="0" y="330" width="330" height="18" fill="#a0703f"/>` +
    crate(80, 330, 50) +
    crate(140, 330, 50) +
    diff(...around(55, 230, 165, 330), crate(110, 280, 50), '') +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(200, 30, 0.4) +
    cloud(580, 50, 0.5) +
    gull(340, 60) +
    gull(560, 120) +
    gull(500, 180) +
    barrel(316, 330) +
    ropeCoil(285, 338) +
    lifeRing(200, 380) +
    rock(770, 300, 0.7) +
    buoy(590, 300, '#ffb703') +
    rowboat(100, 480, '#e63946') +
    buoy(200, 470, '#ffb703') +
    bollard(370, 470) +
    buoy(760, 400, '#ffffff') +
    dolphin(760, 470) +
    big(240, 330, 1.6, person(0, 0, '#3a86ff')),
})
