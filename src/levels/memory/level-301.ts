import { memoryLevel } from '../helpers.ts'
import { level301Redesign } from './level-301-redesign.ts'
import { ball, cat, pot, sack } from '../time/shapes.ts'
import { around, big, books, bowl, cup, curtains, flowerVase, fruit, glassJar, hangingLamp, mug, painting, pottedPlant, room, shelf, slipperPair, table, teapot, wallClock, windowPane } from './shapes.ts'

export default memoryLevel({
  id: 301,
  title: 'memoryKitchen',
  showSeconds: 5,
  redesign: level301Redesign,
  scene: ({ diff }) =>
    room(500, '#ffe8c2', '#c98f5a') +
    windowPane(50, 70, 180, 150) +
    curtains(50, 230, 64, 170, '#e63946') +
    painting(320, 90, 120, 90) +
    diff(380, 260, 52, wallClock(380, 260, 46, '#3a86ff'), '') +
    pottedPlant(458, 738) +
    table(20, 420, 560, 690) +
    diff(...around(42, 466, 186, 554), teapot(110, 554, '#e63946'), teapot(110, 554, '#3a86ff')) +
    bowl(290, 554, '#ffd23f') +
    fruit(260, 502, 22, '#ff9f1c') +
    fruit(320, 502, 22, '#ff9f1c') +
    diff(...around(230, 440, 350, 540), fruit(290, 472, 22, '#ff9f1c'), '') +
    cup(388, 554, '#3fa46f') +
    // Decor: small things that fill the room, the same in both pictures
    hangingLamp(275, 40, '#3fa46f') +
    shelf(40, 300, 110) +
    big(70, 300, 0.5, books(0, 0, ['#e63946', '#3a86ff'])) +
    flowerVase(120, 300, '#3a86ff') +
    pot(140, 226) +
    painting(462, 250, 28, 40, '#c9953f', '#bde3f2') +
    painting(200, 300, 40, 50, '#3a86ff') +
    shelf(320, 390, 130) +
    glassJar(340, 390, '#e63946') +
    glassJar(375, 390, '#3a86ff', '#8ac926') +
    mug(420, 390, '#ffb703') +
    big(230, 730, 0.4, bowl(0, 0, '#3a86ff')) +
    ball(150, 735, '#8338ec') +
    sack(310, 730) +
    slipperPair(370, 735, '#ff6b8b') +
    big(60, 730, 2.2, cat(0, 0, '#f08c3a', true)),
})
