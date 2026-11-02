import { memoryLevel } from '../helpers.ts'
import { cat } from '../time/shapes.ts'
import { around, big, bowl, cup, curtains, fruit, painting, pottedPlant, room, table, teapot, wallClock, windowPane } from './shapes.ts'

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
    big(710, 470, 2.2, cat(0, 0, '#f08c3a', true)),
})
