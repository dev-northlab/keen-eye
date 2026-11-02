import { memoryLevel } from '../helpers.ts'
import { cloud, cow, fence, hayBale, hen, sun } from '../shapes.ts'
import { around, barn, barnDoor, big, daySky, hills, roundTree } from './shapes.ts'

export default memoryLevel({
  id: 302,
  title: 'memoryFarmyard',
  showSeconds: 5,
  scene: ({ diff }) =>
    daySky(340) +
    sun(700, 80) +
    diff(...around(375, 42, 485, 114), '', big(430, 90, 1.1, cloud(0, 0))) +
    hills(330, '#8fd16a') +
    `<rect y="340" width="800" height="160" fill="#9ccc65"/>` +
    barn(190, 400) +
    diff(...around(150, 310, 230, 400), barnDoor(190, 400, '#ffffff'), barnDoor(190, 400, '#ffd23f')) +
    roundTree(650, 400) +
    fence(300, 560, 360) +
    big(420, 430, 1.2, cow(0, 0)) +
    hayBale(90, 455) +
    diff(...around(574, 397, 665, 476), big(620, 440, 1.4, hen(0, 0, true)), ''),
})
