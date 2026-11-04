import { tent } from '../chapter-03/shapes.ts'
import { gull, palm, rock } from '../chapter-04/shapes.ts'
import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
import { cloud, grass, stones, sun } from '../shapes.ts'
import { around, big } from './shapes.ts'
import { birds, lilyPad } from '../time/shapes.ts'

/** Camel facing right; (x, y) = feet under the middle. The saddle is `saddle`. Bounds: x from −62 to +112, y from −158 to 0. */
const camel = (x: number, y: number) =>
  `<path d="M${x - 40} ${y}V${y - 64}M${x - 24} ${y}V${y - 64}M${x + 20} ${y}V${y - 64}M${x + 36} ${y}V${y - 64}" stroke="#c48a4a" stroke-width="10" stroke-linecap="round"/>` +
  `<path d="M${x - 58} ${y - 84}q-6 16 -2 30" stroke="#c48a4a" stroke-width="4" fill="none"/>` +
  `<ellipse cx="${x}" cy="${y - 80}" rx="60" ry="30" fill="#d9a05b"/><ellipse cx="${x - 5}" cy="${y - 104}" rx="30" ry="24" fill="#d9a05b"/>` +
  `<path d="M${x + 44} ${y - 92}Q${x + 70} ${y - 100} ${x + 78} ${y - 140}" stroke="#d9a05b" stroke-width="22" fill="none" stroke-linecap="round"/>` +
  `<ellipse cx="${x + 94}" cy="${y - 144}" rx="20" ry="12" fill="#d9a05b"/><circle cx="${x + 96}" cy="${y - 150}" r="2.5" fill="#3d2a20"/>`

/** Saddle blanket on `camel(x, y)`. Bounds: x from −30 to +20, y from −110 to −84. */
const saddle = (x: number, y: number, color: string) =>
  `<rect x="${x - 30}" y="${y - 110}" width="50" height="26" rx="5" fill="${color}"/><path d="M${x - 26} ${y - 88}h42" stroke="#ffffff" stroke-width="3" stroke-dasharray="4 4"/>`

/** Clay pot; (x, y) = bottom center. Bounds: x ±13, y from −46 to 0. */
const pot = (x: number, y: number) =>
  `<rect x="${x - 6}" y="${y - 44}" width="12" height="10" fill="#a8521f"/><rect x="${x - 9}" y="${y - 46}" width="18" height="4" rx="2" fill="#a8521f"/>` +
  `<ellipse cx="${x}" cy="${y - 18}" rx="13" ry="18" fill="#c1622f"/>`

/** Cactus; (x, y) = bottom center. Bounds: x ±31, y from −90 to 0. */
const cactus = (x: number, y: number) =>
  `<path d="M${x - 10} ${y - 46}h-16v-22M${x + 10} ${y - 36}h16v-26" stroke="#3f8f3a" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<rect x="${x - 10}" y="${y - 90}" width="20" height="90" rx="10" fill="#3f8f3a"/><path d="M${x} ${y - 80}v70" stroke="#2a6b2e" stroke-width="2"/>`

/** Pyramid with its shaded side; base from x0 to x1 on y, apex height h. */
const pyramid = (x0: number, x1: number, y: number, h: number) =>
  `<path d="M${x0} ${y}L${(x0 + x1) / 2} ${y - h}L${x1} ${y}Z" fill="#e8b85a"/><path d="M${(x0 + x1) / 2} ${y - h}L${x1} ${y}H${(x0 + x1) / 2 + (x1 - x0) / 8}Z" fill="#c9953f"/>`

export default memoryLevel({
  id: 329,
  title: 'memoryOasis',
  showSeconds: 4,
  scene: ({ diff, extra, anim }) =>
    `<rect width="800" height="320" fill="#ffe0a3"/><rect y="250" width="800" height="70" fill="#ffd08a"/>` +
    sun(680, 80, '#ffb703') +
    diff(...around(448, 104, 512, 132, 32), '', big(480, 120, 2, gull(0, 0))) +
    pyramid(100, 260, 300, 110) +
    diff(...around(250, 230, 350, 300), pyramid(250, 350, 300, 70), '') +
    `<path d="M0 300Q200 270 400 300T800 290V500H0Z" fill="#f2c879"/>` +
    // Oasis
    `<ellipse cx="560" cy="400" rx="120" ry="30" fill="#4dabf7"/><path d="M500 400q10 -6 20 0t20 0M580 410q10 -6 20 0t20 0" stroke="#ffffff" stroke-opacity="0.6" stroke-width="2.5" fill="none"/>` +
    `<path d="M448 400l-4 -24M456 402l2 -26M672 400l4 -22" stroke="#3f8f3a" stroke-width="3"/>` +
    palm(470, 385, 1.1) +
    palm(660, 385, 1.1, true) +
    `<path d="M0 430Q300 390 520 440T800 430V500H0Z" fill="#e8b85a"/>` +
    diff(...around(15, 362, 145, 440), big(80, 440, 1.3, tent(0, 0, '#e63946')), big(80, 440, 1.3, tent(0, 0, '#3a86ff'))) +
    camel(230, 450) +
    diff(...around(198, 338, 252, 368, 30), saddle(230, 450, '#8338ec'), saddle(230, 450, '#3fa46f')) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(60, 60, 0.5) +
    cloud(350, 50, 0.4) +
    birds(160, 140) +
    birds(250, 80) +
    birds(580, 160) +
    pyramid(740, 800, 300, 40) +
    big(40, 300, 0.4, cactus(0, 0)) +
    rock(90, 295, 0.6, '#c9953f') +
    rock(520, 365, 0.8, '#c9953f') +
    lilyPad(560, 405) +
    lilyPad(600, 395) +
    stones(320, 492) +
    grass(520, 490) +
    rock(570, 490, 0.9, '#c9953f') +
    big(600, 492, 0.5, cactus(0, 0)) +
    pot(400, 465) +
    pot(434, 465) +
    diff(...around(387, 419, 481, 465), pot(468, 465), '') +
    diff(...around(669, 380, 771, 470), cactus(700, 470), cactus(740, 470)) +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['bird', 200, 479],
      ['stones', 399, 329],
      ['rock', 601, 361],
      ['birds', 176, 72],
      ['birds', 719, 183],
    ]),
})
