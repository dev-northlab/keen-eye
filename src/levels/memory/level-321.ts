import { dog } from '../chapter-02/shapes.ts'
import { butterfly } from '../chapter-03/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { basket, cloud, flower, sheep, sun } from '../shapes.ts'
import { around, big, books, cup, daySky, fruit, ground, hills, kite, mug, roundTree } from './shapes.ts'
import { beachBall, flipFlops, sunHat } from '../chapter-04/shapes.ts'
import { bird, birds, bush, flowers, grass, rabbit } from '../time/shapes.ts'

/** Red and white checked blanket from (x0, y0) to (x1, y1). */
const blanket = (x0: number, y0: number, x1: number, y1: number) => {
  let checks = ''
  for (let y = y0; y < y1; y += 25)
    for (let x = x0 + (((y - y0) / 25) % 2) * 25; x < x1; x += 50) checks += `<rect x="${x}" y="${y}" width="25" height="25" fill="#e63946" fill-opacity="0.75"/>`
  return `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="#ffffff"/>${checks}`
}

/** Sandwich triangle; (x, y) = bottom center. Bounds: x ±16, y from −26 to 0. */
const sandwich = (x: number, y: number) =>
  `<path d="M${x - 16} ${y}L${x} ${y - 26}L${x + 16} ${y}Z" fill="#f2d29b"/><path d="M${x - 12} ${y - 4}L${x} ${y - 22}" stroke="#8ac926" stroke-width="3"/>`

/** Juice bottle; (x, y) = bottom center. Bounds: x ±13, y from −84 to 0. */
const bottle = (x: number, y: number, juice: string) =>
  `<rect x="${x - 8}" y="${y - 84}" width="16" height="10" rx="2" fill="#3d4a55"/><rect x="${x - 7}" y="${y - 76}" width="14" height="18" fill="#e6f4fb"/>` +
  `<rect x="${x - 13}" y="${y - 60}" width="26" height="60" rx="7" fill="${juice}"/><rect x="${x - 13}" y="${y - 40}" width="26" height="16" fill="#ffffff" fill-opacity="0.7"/>`

/** Watermelon slice; (x, y) = bottom center. Bounds: x ±26, y from −26 to 0. */
const melonSlice = (x: number, y: number) =>
  `<path d="M${x - 26} ${y - 26}h52a26 26 0 0 1 -52 0Z" fill="#3f8f3a" transform="rotate(180 ${x} ${y - 13})"/>` +
  `<path d="M${x - 22} ${y - 4}h44a22 22 0 0 0 -44 0Z" fill="#ff6b6b"/>`

export default memoryLevel({
  id: 321,
  title: 'memoryPicnic',
  showSeconds: 4,
  scene: ({ diff }) =>
    daySky(400) +
    sun(70, 80) +
    big(180, 60, 0.8, cloud(0, 0)) +
    diff(...around(276, 56, 404, 194), kite(300, 90, '#ffb703'), kite(380, 110, '#ffb703')) +
    hills(390, '#a5d67a') +
    ground(390, '#9ccc65') +
    roundTree(80, 440) +
    flower(30, 465, '#ff6b8b') +
    flower(240, 665, '#ffffff') +
    flower(480, 722, '#b38cff') +
    flower(370, 440, '#ffd23f') +
    big(200, 260, 2, butterfly(0, 0, '#4dabf7')) +
    diff(...around(270, 277, 330, 323), '', big(300, 300, 2.5, butterfly(0, 0, '#ff6b8b'))) +
    blanket(25, 470, 475, 620) +
    big(110, 540, 1.8, basket(0, 0, '#e63946')) +
    `<ellipse cx="250" cy="528" rx="62" ry="14" fill="#f4efe6"/>` +
    sandwich(220, 524) +
    sandwich(250, 524) +
    diff(...around(204, 496, 296, 526), sandwich(280, 524), '') +
    diff(...around(355, 454, 385, 540), bottle(370, 540, '#ff9f1c'), bottle(370, 540, '#8338ec')) +
    fruit(320, 560, 12, '#e63946') +
    fruit(344, 566, 12, '#e63946') +
    melonSlice(415, 572) +
    cup(170, 592, '#3a86ff') +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(460, 40, 0.5) +
    birds(100, 170) +
    cloud(465, 200, 0.5) +
    big(440, 410, 0.6, sheep(0, 0)) +
    bird(80, 222, '#e63946') +
    flowers(250, 425, '#ff6b8b') +
    rabbit(30, 690) +
    bush(195, 445, 0.7) +
    beachBall(70, 735) +
    flipFlops(200, 690) +
    grass(320, 425) +
    grass(480, 645) +
    big(270, 735, 0.5, books(0, 0, ['#3a86ff', '#ffd23f'])) +
    mug(320, 735, '#e63946') +
    sunHat(130, 735) +
    diff(...around(356, 648, 444, 700), big(400, 700, 2, dog(0, 0, '#c48a5a', true)), ''),
})
