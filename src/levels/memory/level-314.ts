import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
import { ball, cat } from '../time/shapes.ts'
import { around, big, cake, candle, cube, cup, flowerVase, garland, gift, glassJar, painting, partyBalloon, plate, room, shelf, sticker, table, teddy } from './shapes.ts'

export default memoryLevel({
  id: 314,
  title: 'memoryParty',
  showSeconds: 3,
  scene: ({ diff, extra, anim }) =>
    room(470, '#ffe3ef', '#c98f5a') +
    garland(20, 480, 24, ['#e63946', '#ffb703', '#3fa46f', '#3a86ff', '#8338ec', '#ff6b8b', '#ffd23f', '#4dabf7']) +
    diff(...around(60, 142, 120, 290), partyBalloon(90, 180, '#e63946'), partyBalloon(90, 180, '#3a86ff')) +
    partyBalloon(215, 150, '#ffd23f') +
    diff(...around(312, 112, 468, 198), painting(320, 120, 100, 70, '#3a86ff'), painting(360, 120, 100, 70, '#3a86ff')) +
    table(30, 470, 560, 690, '#f4efe6') +
    cake(250, 554, '#ff8fb1') +
    candle(230, 458, '#3a86ff') +
    candle(250, 458, '#3a86ff') +
    diff(...around(222, 416, 278, 458), candle(270, 458, '#3a86ff'), '') +
    diff(...around(66, 510, 134, 554), cup(100, 554, '#3fa46f'), cup(100, 554, '#ff6b8b')) +
    diff(...around(370, 478, 430, 554), gift(400, 554, 60, '#3a86ff', '#ffd23f'), '') +
    gift(430, 738, 70, '#ff6b8b', '#ffffff') +
    // Decor: small things that fill the room, the same in both pictures
    partyBalloon(445, 292, '#8338ec') +
    partyBalloon(30, 380, '#3fa46f') +
    partyBalloon(150, 362, '#4dabf7') +
    shelf(240, 300, 120) +
    flowerVase(270, 300, '#ff6b8b', '#ffd23f') +
    cube(310, 300, 22, '#3a86ff') +
    glassJar(345, 300, '#e63946', '#ff9f43') +
    sticker(262, 240, '#ff6b8b') +
    sticker(305, 400, '#ffd23f') +
    plate(345, 556) +
    gift(150, 740, 40, '#8338ec', '#ff6b8b') +
    gift(210, 738, 44, '#ffd23f', '#e63946') +
    ball(262, 740, '#ff6b8b') +
    big(312, 740, 0.5, teddy(0, 0, '#ff9f43')) +
    gift(362, 740, 36, '#3fa46f', '#ffffff') +
    diff(...around(24, 648, 96, 720), '', big(60, 720, 2, cat(0, 0, '#8d99ae', true))) +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['slippers', 250, 640, '#8ac926'],
      ['books', 480, 625, '#e63946'],
      ['frame', 215, 345, '#c9953f'],
      ['sticker', 395, 420, '#3a86ff'],
    ]),
})
