import { bird, bush, pine, rabbit } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
import { birds, chimney, icicles, lampHead, lampPost, logPile, pineSnow, small, snowCap, snowman, winterPerson, winterSky } from '../time/shapes.ts'
import { around, big, bigSnowman, birdhouse, scarf, sled, snowballs, windowPane } from './shapes.ts'
import { cloud } from '../shapes.ts'

export default memoryLevel({
  id: 311,
  title: 'memoryWinter',
  showSeconds: 3,
  scene: ({ diff, extra, anim }) =>
    winterSky(380) +
    `<path d="M0 370Q125 340 250 365T500 360V750H0Z" fill="#f4f8fb"/>` +
    birdhouse(70, 370, '#c0392b') +
    diff(...around(48, 182, 92, 210, 32), '', big(70, 210, 2, bird(0, 0, '#e63946'))) +
    pine(480, 380, 1.2) +
    pineSnow(480, 380, 1.2) +
    // House
    `<rect x="180" y="230" width="260" height="140" fill="#c0705a"/><path d="M160 236L310 150L460 236Z" fill="#6b3a2e"/>` +
    `<path d="M164 234L310 154L456 234" stroke="#ffffff" stroke-width="10" fill="none" stroke-linejoin="round"/>` +
    windowPane(210, 260, 50, 50) +
    windowPane(360, 260, 50, 50) +
    diff(...around(285, 290, 335, 370), `<rect x="285" y="290" width="50" height="80" rx="4" fill="#7a4e33"/>`, `<rect x="285" y="290" width="50" height="80" rx="4" fill="#3a86ff"/>`) +
    bigSnowman(150, 620) +
    diff(...around(110, 510, 190, 564), scarf(150, 620, '#e63946'), scarf(150, 620, '#3fa46f')) +
    diff(...around(308, 664, 432, 700), sled(370, 700, '#e63946'), '') +
    snowballs(360, 520, 2) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(100, 70, 0.6) +
    cloud(420, 60, 0.5) +
    birds(240, 100) +
    bird(310, 150) +
    bird(420, 226, '#3a86ff') +
    chimney(370, 188) +
    snowCap(360, 154, 20) +
    icicles(180, 440, 236) +
    pine(140, 375, 0.8) +
    pineSnow(140, 375, 0.8) +
    pine(30, 620, 0.9) +
    pineSnow(30, 620, 0.9) +
    bush(20, 385, 0.8) +
    snowCap(4, 366, 32) +
    lampPost(255, 480) +
    lampHead(255, 480, false) +
    rabbit(40, 470, false, '#f4f4f4') +
    small(60, 720, winterPerson(60, 720, '#8338ec')) +
    small(250, 740, snowman(250, 740)) +
    logPile(468, 745) +
    snowCap(453, 713, 30) +
    diff(...around(340, 480, 460, 520), snowballs(360, 520, 3), '') +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['pine', 468, 622],
      ['bird', 200, 410],
      ['stones', 270, 650],
      ['birds', 330, 56],
    ]),
})
