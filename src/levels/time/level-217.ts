import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level217Redesign } from './level-217-redesign.ts'
import { around, bench, bird, birdHouse, bucket, bush, butterfly, chimney, cloud, dog, door, flowerBox, flowers, grass, house, icicles, logPile, mailbox, mountains, pane, person, pine, pineSnow, rock, roofSnow, signpost, sky, small, smoke, snowCap, snowfall, snowman, stump, vane, winterPerson, winterSky } from './shapes.ts'

/** Window with shutters; (x, y) = top-left of the 40 × 40 glass. Bounds: x from −11 to +51, y from −3 to +43. */
const shuttered = (x: number, y: number, shutters: string) =>
  `<rect x="${x - 11}" y="${y - 3}" width="10" height="46" fill="${shutters}"/><rect x="${x + 41}" y="${y - 3}" width="10" height="46" fill="${shutters}"/>` + pane(x, y, 40, 40)

export default svgLevel({
  id: 217,
  chapter: 'time',
  title: 'mountainVillage',
  pair: 'summer-winter',
  parTimeSec: 120,
  redesign: level217Redesign,
  scene: ({ diff, time, trap, extra, anim }) =>
    time(sky(false, 260), winterSky(260)) +
    mountains(260, time(false, true)) +
    `<rect y="260" width="800" height="240" fill="${time('#8fc25a', '#f4f8fb')}"/>` +
    `<path d="M0 300Q200 270 420 300T800 290V320H0Z" fill="${time('#7cb35a', '#e4edf4')}"/>` +
    pine(60, 390, 1.3) +
    pine(620, 330, 1.2) +
    time('', pineSnow(60, 390, 1.3) + pineSnow(620, 330, 1.2)) +
    // Chalet
    chimney(360, 205, '#7a5236') +
    house(300, 380, 240, 140, 80, '#c68b4e', '#6b3a2e') +
    time('', roofSnow(300, 160, 132, 82) + snowCap(350, 167, 20)) +
    `<path d="M180 330h240" stroke="#8a5a33" stroke-width="3"/>` +
    diff(...around(194, 267, 256, 313), shuttered(205, 270, '#2f7d55'), shuttered(205, 270, '#e63946')) +
    shuttered(335, 270, '#2f7d55') +
    diff(...around(283, 192, 317, 226), pane(286, 195, 28, 28), '') +
    diff(...around(280, 114, 320, 160), vane(300, 160, 1), vane(300, 160, -1)) +
    diff(...around(284, 334, 316, 380), door(300, 380, '#5a3d2b'), door(300, 380, '#2f6e8c')) +
    trap(400, 250, 22, '', icicles(168, 432, 242), 'icicles') +
    trap(380, 147, 30, '', smoke(365, 175), 'smoke') +
    trap(355, 321, 22, flowerBox(355, 330, '#ff6b8b'), '', 'flowers') +
    diff(...around(126, 350, 154, 400), mailbox(140, 400, '#e63946'), mailbox(140, 400, '#ffb703')) +
    diff(...around(464, 322, 496, 400), birdHouse(480, 400, '#3a86ff'), birdHouse(480, 400, '#8ac926')) +
    diff(...around(530, 440, 590, 470), bench(560, 470), bench(560, 470, '#2f6e8c')) +
    time('', snowCap(527, 436, 66)) +
    diff(...around(729, 408, 781, 470), signpost(755, 470, 1), signpost(755, 470, -1)) +
    trap(240, 442, 31, small(240, 470, person(240, 470, '#ffb703')), small(240, 470, winterPerson(240, 470, '#e63946')), 'clothes') +
    trap(640, 430, 44, '', snowman(640, 474), 'snowman') +
    trap(620, 120, 40, '', `<path d="M590 140L620 90L652 140L630 132L620 146L608 132Z" fill="#ffffff"/>`, 'snow') +
    // Decor: the same in both seasons, snowed on in winter (grass and butterflies only in summer)
    cloud(150, 60, 0.6) +
    cloud(480, 50, 0.45) +
    cloud(700, 170, 0.4) +
    pine(720, 330, 0.8) +
    time('', pineSnow(720, 330, 0.8)) +
    stump(780, 350) +
    time('', snowCap(766, 330, 28)) +
    rock(680, 360, 0.8) +
    time('', snowCap(668, 348, 24)) +
    bird(565, 292, '#e63946') +
    logPile(40, 470) +
    time('', snowCap(25, 438, 30)) +
    bush(100, 480, 0.7) +
    time('', snowCap(86, 463, 28)) +
    bucket(350, 480) +
    time('', snowCap(334, 454, 32)) +
    dog(390, 480) +
    time(flowers(520, 296, '#ffd23f') + butterfly(450, 280) + grass(470, 490) + grass(160, 490), '') +
    // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
    extras({ extra, anim }, [
      ['birds', 221, 65],
      ['birds', 726, 76],
      ['birds', 472, 106],
    ]) +
    time('', snowfall(217, 280, 40)),
})
