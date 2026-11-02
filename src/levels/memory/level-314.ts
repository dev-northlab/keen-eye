import { memoryLevel } from '../helpers.ts'
import { cat } from '../time/shapes.ts'
import { around, big, cake, candle, cup, garland, gift, painting, partyBalloon, room, table } from './shapes.ts'

export default memoryLevel({
  id: 314,
  title: 'memoryParty',
  showSeconds: 3,
  scene: ({ diff }) =>
    room(380, '#ffe3ef', '#c98f5a') +
    garland(40, 760, 24, ['#e63946', '#ffb703', '#3fa46f', '#3a86ff', '#8338ec', '#ff6b8b', '#ffd23f', '#4dabf7']) +
    diff(...around(70, 112, 130, 260), partyBalloon(100, 150, '#e63946'), partyBalloon(100, 150, '#3a86ff')) +
    partyBalloon(215, 150, '#ffd23f') +
    diff(...around(592, 102, 748, 188), painting(600, 110, 100, 70, '#3a86ff'), painting(640, 110, 100, 70, '#3a86ff')) +
    table(170, 630, 380, 480, '#f4efe6') +
    cake(400, 374, '#ff8fb1') +
    candle(380, 278, '#3a86ff') +
    candle(400, 278, '#3a86ff') +
    diff(...around(372, 236, 428, 278), candle(420, 278, '#3a86ff'), '') +
    diff(...around(216, 330, 284, 374), cup(250, 374, '#3fa46f'), cup(250, 374, '#ff6b8b')) +
    diff(...around(530, 298, 590, 374), gift(560, 374, 60, '#3a86ff', '#ffd23f'), '') +
    gift(120, 480, 70, '#ff6b8b', '#ffffff') +
    diff(...around(664, 408, 736, 480), '', big(700, 480, 2, cat(0, 0, '#8d99ae', true))),
})
