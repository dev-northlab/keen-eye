import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level210Redesign } from './level-210-redesign.ts'
import { ball, bareTree, bench, bin, bird, birdHouse, bush, butterfly, cat, cloud, dog, flowerBox, flowers, grass, house, mailbox, oak, pane, person, pot, roofSnow, sky, slide, snowCap, snowfall, snowman, stones, swingFrame, swingSeat, winterPerson, winterSky } from './shapes.ts'

export default svgLevel({
  id: 210,
  chapter: 'time',
  title: 'snowYard',
  pair: 'summer-winter',
  parTimeSec: 85,
  redesign: level210Redesign,
  scene: ({ diff, time, trap, extra, anim }) =>
    time(sky(false, 290), winterSky(290)) +
    cloud(400, 70, 0.6) +
    // Two family houses behind the yard
    house(170, 290, 220, 150, 80, '#f2cc8f', '#3d6e8c') +
    time('', roofSnow(170, 60, 122, 82)) +
    pane(90, 180, 34, 40) +
    pane(216, 180, 34, 40) +
    diff(170, 112, 24, pane(158, 100, 24, 24), '') +
    `<rect x="150" y="240" width="40" height="50" fill="#6b4f3a"/>` +
    house(560, 290, 240, 170, 70, '#c98bb9', '#5a3d2b') +
    time('', roofSnow(560, 50, 132, 72)) +
    pane(470, 160, 34, 40) +
    pane(620, 160, 34, 40) +
    diff(560, 182, 26, pane(545, 164, 30, 36), '') +
    `<rect x="470" y="236" width="40" height="54" fill="#6b4f3a"/>` +
    `<rect y="290" width="800" height="210" fill="${time('#a5cf7a', '#f4f8fb')}"/>` +
    swingFrame(110, 470, '#e63946') +
    swingSeat(95, 380, '#ffb703') +
    diff(125, 413, 37, swingSeat(125, 380, '#ffb703'), '') +
    slide(560, 470, '#2a9d8f') +
    time('', snowCap(556, 390, 26)) +
    diff(430, 340, 30, mailbox(430, 365, '#e63946'), mailbox(430, 365, '#3a86ff')) +
    bench(330, 470) +
    diff(310, 430, 26, cat(310, 440), cat(310, 440, '#3d3d3d')) +
    diff(420, 460, 24, ball(420, 474, '#3a86ff'), ball(420, 474, '#e63946')) +
    trap(730, 330, 60, oak(730, 390, 1.1), bareTree(730, 390, 1.1), 'leaves') +
    trap(240, 400, 40, person(240, 432, '#ff9f43'), winterPerson(240, 432, '#3a86ff'), 'clothes') +
    trap(500, 420, 44, '', snowman(500, 462), 'snowman') +
    trap(60, 470, 28, flowers(60, 488), '', 'flowers') +
    // Decor: the same in both seasons, snowed on in winter (grass and butterflies only in summer)
    cloud(330, 140, 0.5) +
    cloud(730, 60, 0.5) +
    flowerBox(107, 240, '#ff6b8b') +
    flowerBox(233, 240, '#ffd23f') +
    flowerBox(637, 218, '#ff6b8b') +
    time('', snowCap(89, 222, 36) + snowCap(215, 222, 36) + snowCap(619, 200, 36)) +
    bush(40, 290, 0.9) +
    time('', snowCap(22, 268, 36)) +
    bush(310, 290, 0.8) +
    time('', snowCap(294, 270, 32)) +
    bin(400, 290) +
    time('', snowCap(390, 262, 20)) +
    pot(530, 290) +
    bird(610, 300, '#e63946') +
    time(butterfly(380, 300), '') +
    time(grass(200, 480) + stones(240, 490), '') +
    birdHouse(700, 470) +
    dog(770, 470) +
    // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
    extras({ extra, anim }, [
      ['birds', 269, 77],
      ['birds', 729, 154],
    ]) +
    time('', snowfall(210, 290, 34)),
})
