import { memoryLevel } from '../helpers.ts'
import { around, bed, curtains, drawers, painting, room, rug, tableLamp, teddy, windowPane } from './shapes.ts'

export default memoryLevel({
  id: 304,
  title: 'memoryBedroom',
  showSeconds: 5,
  scene: ({ diff }) =>
    room(340, '#d9ecff', '#e9b872') +
    windowPane(520, 60, 170, 140) +
    curtains(520, 690, 54, 160, '#ffb703') +
    diff(...around(102, 72, 248, 178), painting(110, 80, 130, 90, '#3a86ff'), '') +
    rug(330, 470, 150, '#ff6b8b') +
    bed(290, 430, 300, diff(...around(210, 360, 430, 404), '#4dabf7', '#8ac926')) +
    drawers(740, 440) +
    tableLamp(740, 330, '#ff6b8b') +
    diff(...around(524, 363, 676, 455), teddy(560, 455), teddy(640, 455)),
})
