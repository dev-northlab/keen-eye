import { fern, fireLogs, flame, hedgehog, mushroom, pine, rabbit, squirrel, stump, tent } from '../chapter-03/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { cloud, sun } from '../shapes.ts'
import { around, backpack, big, daySky, ground } from './shapes.ts'
import { birds, bucket, lilyPad, logPile, stones } from '../time/shapes.ts'

/** Canoe on the water; (x, y) = waterline center. Bounds: x ±70, y from −16 to +12. */
const canoe = (x: number, y: number) =>
  `<path d="M${x - 70} ${y - 16}q70 40 140 0q-10 28 -70 28q-60 0 -70 -28Z" fill="#e63946"/>` +
  `<path d="M${x - 20} ${y - 14}l40 -2" stroke="#8a5a33" stroke-width="5" stroke-linecap="round"/>`

export default memoryLevel({
  id: 310,
  title: 'memoryCamp',
  showSeconds: 4,
  scene: ({ diff }) =>
    daySky(300) +
    sun(80, 70) +
    pine(200, 310, 1.4) +
    pine(290, 300, 1.7) +
    pine(380, 310, 1.3) +
    ground(300, '#8fc46a') +
    `<ellipse cx="300" cy="380" rx="170" ry="46" fill="#4dabf7"/>` +
    diff(...around(230, 357, 370, 385), canoe(300, 373), '') +
    diff(...around(50, 442, 230, 550), big(140, 550, 1.8, tent(0, 0, '#ff8c1a')), big(140, 550, 1.8, tent(0, 0, '#3a86ff'))) +
    big(370, 560, 1.8, fireLogs(0, 0) + flame(0, 0)) +
    diff(...around(242, 580, 298, 640), '', big(270, 640, 2, mushroom(0, 0))) +
    pine(60, 740, 1.5) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(230, 60, 0.6) +
    cloud(420, 110, 0.6) +
    birds(430, 200) +
    rabbit(40, 345) +
    fern(90, 345) +
    mushroom(20, 405, '#ff9f43') +
    stones(140, 745) +
    hedgehog(470, 470) +
    logPile(460, 580) +
    bucket(300, 475) +
    lilyPad(180, 400) +
    lilyPad(430, 390, '#ffffff') +
    squirrel(240, 470, true) +
    logPile(205, 740) +
    stump(330, 740) +
    diff(...around(350, 634, 480, 710), backpack(380, 710, '#8338ec'), backpack(450, 710, '#8338ec')),
})
