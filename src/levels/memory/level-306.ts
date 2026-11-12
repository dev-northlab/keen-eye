import { memoryLevel } from '../helpers.ts'
import { cloud, hen, sun, sunflower } from '../shapes.ts'
import { around, birdhouse, cabbage, carrotPlant, daySky, ground, hills, scarecrow, strawHat, wateringCan, wheelbarrow } from './shapes.ts'
import { bird, birds, bucket, butterfly, flowers, grass, rabbit, stones } from '../time/shapes.ts'

export default memoryLevel({
  id: 306,
  title: 'memoryGarden',
  showSeconds: 4,
  scene: ({ diff }) =>
    daySky(340) +
    sun(400, 90) +
    hills(340, '#a5d67a') +
    ground(340, '#b9de8a') +
    diff(...around(68, 240, 132, 400), birdhouse(100, 400, '#3a86ff'), '') +
    // Cabbage bed behind the scarecrow
    `<rect x="190" y="430" width="300" height="40" rx="12" fill="#8a5a33"/>` +
    cabbage(235, 460) +
    cabbage(400, 460) +
    cabbage(460, 460) +
    scarecrow(320, 420, diff(...around(280, 304, 360, 370), '#3a86ff', '#e63946')) +
    strawHat(320, 420) +
    // Carrot bed
    `<rect x="30" y="560" width="260" height="44" rx="12" fill="#8a5a33"/>` +
    carrotPlant(90, 580) +
    carrotPlant(160, 580) +
    diff(...around(74, 540, 246, 594), carrotPlant(230, 580), '') +
    wheelbarrow(200, 728, '#8d99ae') +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(110, 80, 0.6) +
    cloud(270, 150, 0.5) +
    birds(210, 230) +
    butterfly(250, 300) +
    grass(200, 380) +
    flowers(250, 400, '#ff6b8b') +
    flowers(40, 470, '#ffd23f') +
    bucket(450, 400) +
    sunflower(455, 700, 40) +
    sunflower(485, 712, 50) +
    bird(430, 280, '#e63946') +
    hen(260, 700) +
    grass(30, 520) +
    stones(380, 728) +
    rabbit(40, 690) +
    wateringCan(330, 620, '#ffb703'),
})
