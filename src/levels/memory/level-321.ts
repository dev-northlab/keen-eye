import { dog } from '../chapter-02/shapes.ts'
import { butterfly } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
import { basket, cloud, flower, sheep, sun } from '../shapes.ts'
import { around, big, books, cup, daySky, fruit, hills, kite, mug, roundTree } from './shapes.ts'
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
  scene: ({ diff, extra, anim }) =>
    daySky(340) +
    sun(300, 70) +
    big(160, 60, 0.8, cloud(0, 0)) +
    diff(...around(536, 56, 664, 194), kite(560, 90, '#ffb703'), kite(640, 110, '#ffb703')) +
    hills(330, '#a5d67a') +
    `<rect y="330" width="800" height="170" fill="#9ccc65"/>` +
    roundTree(90, 360) +
    flower(60, 480, '#ff6b8b') +
    flower(170, 474, '#ffffff') +
    flower(760, 470, '#b38cff') +
    flower(600, 340, '#ffd23f') +
    big(170, 300, 2, butterfly(0, 0, '#4dabf7')) +
    diff(...around(350, 227, 410, 273), '', big(380, 250, 2.5, butterfly(0, 0, '#ff6b8b'))) +
    blanket(200, 360, 600, 460) +
    big(260, 420, 1.8, basket(0, 0, '#e63946')) +
    `<ellipse cx="400" cy="408" rx="62" ry="14" fill="#f4efe6"/>` +
    sandwich(370, 404) +
    sandwich(400, 404) +
    diff(...around(354, 376, 446, 406), sandwich(430, 404), '') +
    diff(...around(505, 334, 535, 420), bottle(520, 420, '#ff9f1c'), bottle(520, 420, '#8338ec')) +
    fruit(470, 440, 12, '#e63946') +
    fruit(494, 446, 12, '#e63946') +
    melonSlice(565, 452) +
    diff(...around(286, 428, 354, 472), cup(320, 472, '#3a86ff'), cup(320, 472, '#3fa46f')) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(420, 40, 0.5) +
    birds(420, 150) +
    cloud(760, 200, 0.5) +
    big(760, 320, 0.6, sheep(0, 0)) +
    bird(90, 141, '#e63946') +
    flowers(250, 340, '#ff6b8b') +
    rabbit(30, 420) +
    bush(150, 380, 0.7) +
    beachBall(110, 470) +
    flipFlops(200, 480) +
    grass(650, 360) +
    grass(785, 420) +
    big(450, 492, 0.5, books(0, 0, ['#3a86ff', '#ffd23f'])) +
    mug(520, 490, '#e63946') +
    sunHat(580, 490) +
    diff(...around(636, 418, 724, 470), big(680, 470, 2, dog(0, 0, '#c48a5a', true)), '') +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['stones', 177, 402],
      ['snail', 731, 361],
      ['ladybug', 478, 475],
      ['mushroom', 54, 364],
      ['birds', 299, 167],
    ]),
})
