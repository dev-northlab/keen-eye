import { svgLevel } from '../helpers.ts'
import { bush, cat, cloud, door, DUSK, fence, flowers, glow, house, mailbox, moon, oak, pane, picket, shadow, sky, stars, sun, vane } from './shapes.ts'

export default svgLevel({
  id: 201,
  chapter: 'time',
  title: 'duskFarm',
  pair: 'day-night',
  parTimeSec: 75,
  scene: ({ diff, time, trap }) =>
    sky(time(false, true), 300) +
    cloud(430, 90, 0.7) +
    `<rect y="300" width="800" height="200" fill="#9ccc65"/>` +
    `<path d="M234 330L200 500H330L266 330Z" fill="#d8c08f"/>` +
    bush(60, 330) +
    bush(455, 330, 0.8) +
    // Farmhouse
    house(250, 330, 200, 120, 70, '#f4d6a0', '#c0392b') +
    pane(170, 230, 40, 40) +
    pane(290, 230, 40, 40) +
    door(250, 330, '#7a4e33') +
    flowers(178, 330) +
    flowers(318, 330, '#ffd23f') +
    diff(250, 182, 24, pane(238, 170, 24, 24), '') +
    diff(250, 117, 32, vane(250, 140, 1), vane(250, 140, -1)) +
    // Oak with its morning shadow
    trap(470, 342, 42, shadow(520, 342, 110), '', 'shadow') +
    oak(520, 342, 1.3) +
    fence(560, 10, 400, '#e9d3a7', 22, [4]) +
    diff(653, 378, 24, picket(648, 400), '') +
    diff(380, 335, 30, mailbox(380, 360, '#3a86ff'), mailbox(380, 360, '#e63946')) +
    diff(130, 402, 27, cat(130, 420), cat(130, 420, '#3d3d3d')) +
    time('', DUSK) +
    trap(190, 250, 30, '', glow(170, 230, 40, 40), 'lights') +
    trap(120, 70, 42, '', stars(120, 70), 'stars') +
    trap(690, 80, 54, sun(690, 80), moon(690, 80), 'moon'),
})
