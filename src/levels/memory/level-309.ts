import { clam, coral, fish, jellyfish, octopus, seaUrchin, seaweed, shell, starfish, turtle } from '../chapter-04/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { around, big, bubble } from './shapes.ts'

/** Treasure chest; (x, y) = bottom center. Bounds: x ±50, y from −76 to 0. */
const chest = (x: number, y: number) =>
  `<path d="M${x - 50} ${y - 46}q0 -30 50 -30q50 0 50 30Z" fill="#8a5a33"/>` +
  `<rect x="${x - 50}" y="${y - 50}" width="100" height="50" rx="4" fill="#a0703f"/>` +
  `<path d="M${x - 50} ${y - 46}h100M${x - 30} ${y - 76}v76M${x + 30} ${y - 76}v76" stroke="#f2c14e" stroke-width="6"/>` +
  `<rect x="${x - 8}" y="${y - 52}" width="16" height="18" rx="3" fill="#f2c14e"/>`

/** Bubbles rising from (x, y). Bounds: x ±10, y from −80 to 0. */
const bubbles = (x: number, y: number) =>
  `<g fill="none" stroke="#ffffff" stroke-opacity="0.7" stroke-width="2.5"><circle cx="${x}" cy="${y - 8}" r="6"/>` +
  `<circle cx="${x + 4}" cy="${y - 34}" r="8"/><circle cx="${x - 2}" cy="${y - 66}" r="10"/></g>`

export default memoryLevel({
  id: 309,
  title: 'memoryReef',
  showSeconds: 4,
  scene: ({ diff }) =>
    `<rect width="800" height="500" fill="#1f8fbf"/><rect width="800" height="140" fill="#3ba7cc"/>` +
    `<path d="M0 420Q200 390 400 410T800 400V500H0Z" fill="#f4dca4"/>` +
    big(150, 150, 2, jellyfish(0, 0)) +
    diff(...around(285, 122, 435, 228), fish(400, 170, '#ffb703', 2.2), '') +
    fish(320, 140, '#ffb703', 2.2) +
    fish(330, 210, '#ffb703', 2.2) +
    diff(...around(567, 112, 673, 160), '', big(620, 160, 2.2, turtle(0, 0, '#4caf6a', true))) +
    bubbles(500, 330) +
    big(60, 470, 2, seaweed(0, 0)) +
    big(130, 440, 2, coral(0, 0, '#ff6b8b')) +
    big(230, 460, 2.2, starfish(0, -14, '#ff9f43')) +
    diff(...around(330, 384, 430, 460), chest(380, 460), '') +
    big(500, 470, 2, seaweed(0, 0, 1, '#3fa46f')) +
    diff(...around(602, 378, 698, 450), big(650, 450, 2, octopus(0, 0, '#8338ec')), big(650, 450, 2, octopus(0, 0, '#e63946'))) +
    // Decor: small things that fill the scene, the same in both pictures
    fish(80, 60, '#ff6b8b', 1.4) +
    fish(520, 60, '#ff9f43') +
    fish(760, 80, '#ffd23f', 1.2, true) +
    fish(200, 280, '#4dabf7', 1.5, true) +
    fish(740, 260, '#8ac926', 1.4) +
    fish(130, 330, '#ff9f43', 1.3) +
    bubble(220, 100, 6) +
    bubble(230, 70, 4) +
    bubbles(30, 330) +
    bubbles(760, 360) +
    jellyfish(540, 300, '#ff6b8b') +
    coral(20, 440, '#ffb703') +
    seaUrchin(190, 490) +
    clam(545, 490) +
    shell(785, 490) +
    big(750, 470, 2, seaweed(0, 0)),
})
