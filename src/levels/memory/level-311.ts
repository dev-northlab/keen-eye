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
    winterSky(300) +
    `<path d="M0 290Q200 260 400 285T800 280V500H0Z" fill="#f4f8fb"/>` +
    birdhouse(100, 300, '#c0392b') +
    diff(...around(78, 112, 122, 140, 32), '', big(100, 140, 2, bird(0, 0, '#e63946'))) +
    pine(330, 300, 1.3) +
    pineSnow(330, 300, 1.3) +
    // House
    `<rect x="470" y="160" width="260" height="140" fill="#c0705a"/><path d="M450 166L600 80L750 166Z" fill="#6b3a2e"/>` +
    `<path d="M454 164L600 84L746 164" stroke="#ffffff" stroke-width="10" fill="none" stroke-linejoin="round"/>` +
    windowPane(500, 190, 50, 50) +
    windowPane(650, 190, 50, 50) +
    diff(...around(575, 220, 625, 300), `<rect x="575" y="220" width="50" height="80" rx="4" fill="#7a4e33"/>`, `<rect x="575" y="220" width="50" height="80" rx="4" fill="#3a86ff"/>`) +
    bigSnowman(250, 440) +
    diff(...around(210, 330, 290, 384), scarf(250, 440, '#e63946'), scarf(250, 440, '#3fa46f')) +
    diff(...around(358, 414, 482, 450), sled(420, 450, '#e63946'), '') +
    snowballs(620, 455, 2) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(250, 60, 0.6) +
    cloud(450, 40, 0.5) +
    birds(200, 170) +
    bird(560, 104) +
    bird(700, 138, '#3a86ff') +
    chimney(660, 118) +
    snowCap(650, 84, 20) +
    icicles(470, 730, 166) +
    pine(420, 300, 0.8) +
    pineSnow(420, 300, 0.8) +
    pine(780, 300, 0.9) +
    pineSnow(780, 300, 0.9) +
    bush(20, 300, 0.8) +
    snowCap(4, 281, 32) +
    lampPost(170, 330) +
    lampHead(170, 330, false) +
    rabbit(40, 380, false, '#f4f4f4') +
    small(120, 400, winterPerson(120, 400, '#8338ec')) +
    small(70, 470, snowman(70, 470)) +
    logPile(140, 480) +
    snowCap(125, 448, 30) +
    diff(...around(600, 415, 720, 455), snowballs(620, 455, 3), '') +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['pine', 76, 370],
      ['bird', 523, 389],
      ['stones', 720, 341],
      ['birds', 396, 162],
    ]),
})
