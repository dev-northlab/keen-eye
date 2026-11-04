import { memoryLevel } from '../helpers.ts'
import { cloud, hen, sun, sunflower } from '../shapes.ts'
import { around, birdhouse, cabbage, carrotPlant, daySky, hills, scarecrow, strawHat, wateringCan, wheelbarrow } from './shapes.ts'
import { bird, birds, bucket, butterfly, flowers, grass, rabbit, stones } from '../time/shapes.ts'

export default memoryLevel({
  id: 306,
  title: 'memoryGarden',
  showSeconds: 4,
  scene: ({ diff }) =>
    daySky(300) +
    sun(380, 70) +
    hills(240, '#a5d67a') +
    `<rect y="250" width="800" height="250" fill="#b9de8a"/>` +
    diff(...around(118, 100, 182, 260), birdhouse(150, 260, '#3a86ff'), '') +
    // Cabbage bed behind the scarecrow
    `<rect x="400" y="320" width="360" height="40" rx="12" fill="#8a5a33"/>` +
    cabbage(460, 350) +
    cabbage(560, 350) +
    cabbage(700, 350) +
    scarecrow(620, 310, diff(...around(580, 194, 660, 260), '#3a86ff', '#e63946')) +
    strawHat(620, 310) +
    // Carrot bed
    `<rect x="60" y="390" width="280" height="44" rx="12" fill="#8a5a33"/>` +
    carrotPlant(120, 410) +
    carrotPlant(190, 410) +
    diff(...around(104, 370, 276, 424), carrotPlant(260, 410), '') +
    wheelbarrow(420, 490, '#8d99ae') +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(500, 60, 0.6) +
    cloud(740, 60, 0.5) +
    birds(300, 150) +
    butterfly(480, 200) +
    grass(280, 310) +
    flowers(320, 300, '#ff6b8b') +
    flowers(380, 290, '#ffd23f') +
    bucket(440, 300) +
    sunflower(740, 320, 40) +
    sunflower(780, 330, 50) +
    bird(760, 250, '#e63946') +
    hen(750, 450) +
    grass(30, 340) +
    stones(40, 380) +
    rabbit(30, 470) +
    diff(...around(494, 376, 662, 440), wateringCan(540, 440, '#ffb703'), wateringCan(600, 440, '#ffb703')),
})
