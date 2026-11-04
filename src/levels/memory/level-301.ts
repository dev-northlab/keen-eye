import { memoryLevel } from '../helpers.ts'
import { ball, cat, pot, sack } from '../time/shapes.ts'
import { around, big, books, bowl, cup, curtains, flowerVase, fruit, glassJar, hangingLamp, mug, painting, pottedPlant, room, shelf, slipperPair, table, teapot, wallClock, windowPane } from './shapes.ts'

export default memoryLevel({
  id: 301,
  title: 'memoryKitchen',
  showSeconds: 5,
  scene: ({ diff }) =>
    room(330, '#ffe8c2', '#c98f5a') +
    windowPane(80, 60, 180, 150) +
    curtains(80, 260, 54, 170, '#e63946') +
    painting(420, 70, 120, 90) +
    diff(640, 120, 52, wallClock(640, 120, 46, '#3a86ff'), '') +
    pottedPlant(80, 470) +
    table(140, 660, 320, 470) +
    diff(...around(192, 226, 336, 314), teapot(260, 314, '#e63946'), teapot(260, 314, '#3a86ff')) +
    bowl(440, 314, '#ffd23f') +
    fruit(410, 262, 22, '#ff9f1c') +
    fruit(470, 262, 22, '#ff9f1c') +
    diff(...around(380, 200, 500, 300), fruit(440, 232, 22, '#ff9f1c'), '') +
    cup(590, 314, '#3fa46f') +
    // Decor: small things that fill the room, the same in both pictures
    hangingLamp(480, 15, '#3fa46f') +
    shelf(290, 110, 110) +
    big(320, 110, 0.5, books(0, 0, ['#e63946', '#3a86ff'])) +
    flowerVase(370, 110, '#3a86ff') +
    pot(130, 216) +
    painting(8, 250, 30, 40, '#c9953f', '#bde3f2') +
    painting(735, 210, 40, 50, '#3a86ff') +
    shelf(570, 240, 130) +
    glassJar(590, 240, '#e63946') +
    glassJar(625, 240, '#3a86ff', '#8ac926') +
    mug(670, 240, '#ffb703') +
    big(300, 470, 0.4, bowl(0, 0, '#3a86ff')) +
    ball(380, 480, '#8338ec') +
    sack(480, 470) +
    slipperPair(560, 480, '#ff6b8b') +
    big(710, 470, 2.2, cat(0, 0, '#f08c3a', true)),
})
