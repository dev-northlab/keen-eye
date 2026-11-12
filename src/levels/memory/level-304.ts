import { memoryLevel } from '../helpers.ts'
import { level304Redesign } from './level-304-redesign.ts'
import { around, backpack, bed, big, books, cube, curtains, drawers, flowerVase, painting, room, rug, shelf, slipperPair, sticker, tableLamp, teddy, wallClock, windowPane } from './shapes.ts'
import { ball } from '../time/shapes.ts'

export default memoryLevel({
  id: 304,
  title: 'memoryBedroom',
  showSeconds: 5,
  redesign: level304Redesign,
  scene: ({ diff }) =>
    room(360, '#d9ecff', '#e9b872') +
    windowPane(320, 70, 150, 140) +
    curtains(320, 470, 64, 160, '#ffb703') +
    diff(...around(32, 82, 178, 188), painting(40, 90, 130, 90, '#3a86ff'), '') +
    rug(385, 690, 100, '#ff6b8b') +
    bed(200, 520, 240, diff(...around(150, 450, 310, 494), '#4dabf7', '#8ac926')) +
    drawers(430, 470) +
    tableLamp(430, 360, '#ff6b8b') +
    // Decor: small things that fill the room, the same in both pictures
    painting(225, 110, 50, 60, '#ff6b8b') +
    sticker(250, 70, '#ffd23f') +
    shelf(60, 290, 140) +
    big(90, 290, 0.5, books(0, 0, ['#3fa46f', '#ff6b8b', '#4dabf7'])) +
    cube(135, 290, 24, '#ffb703') +
    flowerVase(180, 290, '#8338ec') +
    painting(215, 250, 60, 50, '#8ac926') +
    wallClock(355, 255, 18, '#ff6b8b') +
    sticker(300, 235, '#4dabf7') +
    sticker(482, 250, '#ffd23f') +
    painting(10, 300, 30, 44, '#3fa46f') +
    big(40, 570, 0.5, backpack(0, 0, '#ff6b8b')) +
    ball(30, 625, '#ffd23f') +
    slipperPair(300, 585, '#3a86ff') +
    cube(470, 560, 28, '#3a86ff') +
    diff(...around(84, 608, 236, 700), teddy(120, 700), teddy(200, 700)),
})
