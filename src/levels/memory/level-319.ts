import { balloon, lampHead, lampPost, person } from '../chapter-02/shapes.ts'
import { bush, fox, hedgehog, mushroom, rock, squirrel, stump } from '../chapter-03/shapes.ts'
import { bench } from '../chapter-02/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { cloud, duck, sun } from '../shapes.ts'
import { around, big, daySky, ground, kite, pumpkin, roundTree } from './shapes.ts'
import { bird, birds, grass } from '../time/shapes.ts'

/** Fallen leaf; (x, y) = center. Bounds: radius 9. */
const leaf = (x: number, y: number, color: string, turn = 0) =>
  `<path d="M${x - 9} ${y}q9 -9 18 0q-9 9 -18 0Z" fill="${color}" transform="rotate(${turn} ${x} ${y})"/>`

/** Heap of leaves; (x, y) = bottom center. Bounds: x ±55, y from −34 to 0. */
const leafPile = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 12}" rx="55" ry="12" fill="#d9771c"/>` +
  `<circle cx="${x - 28}" cy="${y - 16}" r="18" fill="#f28c28"/><circle cx="${x}" cy="${y - 16}" r="18" fill="#d64545"/><circle cx="${x + 28}" cy="${y - 16}" r="18" fill="#f2c14e"/>` +
  leaf(x - 14, y - 24, '#d64545', 30) + leaf(x + 16, y - 26, '#f28c28', -20)

export default memoryLevel({
  id: 319,
  title: 'memoryAutumnPark',
  showSeconds: 5,
  scene: ({ diff }) =>
    daySky(330, '#ffe9c7') +
    sun(70, 60) +
    ground(300, '#c9cf6a') +
    `<path d="M0 700Q120 640 250 660T500 640" stroke="#e9d3a7" stroke-width="40" fill="none"/>` +
    roundTree(90, 330, '#f28c28') +
    big(215, 330, 0.7, roundTree(0, 0, '#f2c14e')) +
    roundTree(390, 340, diff(...around(310, 120, 470, 256), '#d64545', '#f2c14e')) +
    kite(230, 70, '#3a86ff') +
    `<path d="M230 104Q300 330 392 552" stroke="#6b766f" stroke-width="1.5" fill="none"/>` +
    leaf(330, 60, '#f28c28', 20) +
    leaf(130, 70, '#d64545', -30) +
    // Pond with ducks
    `<ellipse cx="250" cy="470" rx="140" ry="45" fill="#5aa9d6"/><path d="M170 490q10 -6 20 0t20 0M290 450q10 -6 20 0t20 0" stroke="#ffffff" stroke-opacity="0.6" stroke-width="2.5" fill="none"/>` +
    duck(190, 465) +
    duck(250, 480) +
    diff(...around(160, 438, 348, 494), duck(310, 465), '') +
    big(40, 690, 1.5, lampPost(0, 0) + lampHead(0, 0)) +
    big(130, 650, 1.8, bench(0, 0)) +
    diff(...around(122, 578, 168, 622, 30), '', big(145, 621, 1.4, squirrel(0, 0))) +
    big(380, 610, 1.6, person(0, 0, '#3fa46f', true)) +
    diff(...around(335, 657, 445, 705), leafPile(390, 690), '') +
    leaf(40, 740, '#d64545', 10) +
    leaf(60, 560, '#f2c14e', -40) +
    leaf(250, 740, '#f28c28', 60) +
    leaf(470, 620, '#d64545', -10) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(300, 25, 0.4) +
    cloud(460, 40, 0.5) +
    birds(370, 40) +
    bird(60, 160, '#3a86ff') +
    balloon(440, 400, '#e63946') +
    bush(300, 365, 0.8, '#c98f2a') +
    fox(470, 360) +
    hedgehog(40, 400) +
    mushroom(85, 420) +
    big(100, 740, 0.5, pumpkin(0, 0)) +
    big(150, 735, 0.35, pumpkin(0, 0)) +
    mushroom(200, 740, '#ff9f43', 0.8) +
    rock(15, 745, 0.6) +
    stump(250, 690) +
    grass(300, 740) +
    leaf(470, 460, '#f2c14e', 30),
})
