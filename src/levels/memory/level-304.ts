import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
import { around, backpack, bed, big, books, cube, curtains, drawers, flowerVase, painting, room, rug, shelf, slipperPair, sticker, tableLamp, teddy, wallClock, windowPane } from './shapes.ts'
import { ball } from '../time/shapes.ts'

export default memoryLevel({
  id: 304,
  title: 'memoryBedroom',
  showSeconds: 5,
  scene: ({ diff, extra, anim }) =>
    room(340, '#d9ecff', '#e9b872') +
    windowPane(520, 60, 170, 140) +
    curtains(520, 690, 54, 160, '#ffb703') +
    diff(...around(102, 72, 248, 178), painting(110, 80, 130, 90, '#3a86ff'), '') +
    rug(330, 470, 150, '#ff6b8b') +
    bed(290, 430, 300, diff(...around(210, 360, 430, 404), '#4dabf7', '#8ac926')) +
    drawers(740, 440) +
    tableLamp(740, 330, '#ff6b8b') +
    // Decor: small things that fill the room, the same in both pictures
    painting(330, 40, 60, 50, '#ff6b8b') +
    sticker(450, 60, '#ffd23f') +
    shelf(320, 160, 150) +
    big(350, 160, 0.5, books(0, 0, ['#3fa46f', '#ff6b8b', '#4dabf7'])) +
    cube(395, 160, 24, '#ffb703') +
    flowerVase(440, 160, '#8338ec') +
    painting(730, 60, 50, 60, '#8ac926') +
    wallClock(760, 170, 18, '#ff6b8b') +
    sticker(540, 260, '#4dabf7') +
    sticker(660, 250, '#ffd23f') +
    painting(10, 260, 36, 44, '#3fa46f') +
    big(60, 420, 0.5, backpack(0, 0, '#ff6b8b')) +
    ball(110, 470, '#ffd23f') +
    slipperPair(60, 480, '#3a86ff') +
    cube(760, 490, 28, '#3a86ff') +
    diff(...around(524, 363, 676, 455), teddy(560, 455), teddy(640, 455)) +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['ball', 116, 436, '#ffb703'],
      ['cube', 472, 383, '#e63946'],
      ['frame', 693, 320, '#3a86ff'],
    ]),
})
