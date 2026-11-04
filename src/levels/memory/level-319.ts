import { balloon, lampHead, lampPost, person } from '../chapter-02/shapes.ts'
import { bush, fox, hedgehog, mushroom, rock, squirrel, stump } from '../chapter-03/shapes.ts'
import { bench } from '../chapter-02/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { cloud, duck, sun } from '../shapes.ts'
import { around, big, daySky, kite, pumpkin, roundTree } from './shapes.ts'
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
    sun(160, 70) +
    `<rect y="300" width="800" height="200" fill="#c9cf6a"/>` +
    `<path d="M0 500Q200 420 330 400T480 360" stroke="#e9d3a7" stroke-width="40" fill="none"/>` +
    roundTree(110, 330, '#f28c28') +
    big(250, 300, 0.7, roundTree(0, 0, '#f2c14e')) +
    roundTree(680, 330, diff(...around(600, 110, 760, 246), '#d64545', '#f2c14e')) +
    diff(...around(356, 56, 404, 174), kite(380, 90, '#3a86ff'), kite(380, 90, '#e63946')) +
    `<path d="M380 124Q520 300 612 412" stroke="#6b766f" stroke-width="1.5" fill="none"/>` +
    leaf(520, 150, '#f28c28', 20) +
    leaf(260, 100, '#d64545', -30) +
    // Pond with ducks
    `<ellipse cx="480" cy="400" rx="140" ry="45" fill="#5aa9d6"/><path d="M400 420q10 -6 20 0t20 0M520 380q10 -6 20 0t20 0" stroke="#ffffff" stroke-opacity="0.6" stroke-width="2.5" fill="none"/>` +
    duck(420, 395) +
    duck(480, 410) +
    diff(...around(390, 368, 578, 424), duck(540, 395), '') +
    big(320, 470, 1.5, lampPost(0, 0) + lampHead(0, 0)) +
    big(200, 450, 1.8, bench(0, 0)) +
    diff(...around(192, 378, 238, 422, 30), '', big(215, 421, 1.4, squirrel(0, 0))) +
    big(600, 470, 1.6, person(0, 0, '#3fa46f', true)) +
    diff(...around(645, 412, 755, 460), leafPile(700, 445), '') +
    leaf(60, 470, '#d64545', 10) +
    leaf(120, 420, '#f2c14e', -40) +
    leaf(280, 480, '#f28c28', 60) +
    leaf(540, 480, '#d64545', -10) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(260, 30, 0.4) +
    cloud(510, 40, 0.5) +
    birds(510, 120) +
    bird(66, 175, '#3a86ff') +
    balloon(510, 220, '#e63946') +
    bush(290, 330, 0.8, '#c98f2a') +
    fox(740, 350) +
    hedgehog(120, 380) +
    mushroom(30, 400) +
    big(60, 480, 0.5, pumpkin(0, 0)) +
    big(110, 470, 0.35, pumpkin(0, 0)) +
    mushroom(140, 480, '#ff9f43', 0.8) +
    rock(20, 470, 0.6) +
    stump(200, 490) +
    grass(250, 490) +
    leaf(770, 400, '#f2c14e', 30),
})
