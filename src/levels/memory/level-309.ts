import { clam, coral, fish, jellyfish, octopus, seaUrchin, seaweed, shell, starfish, turtle } from '../chapter-04/shapes.ts'
import { extras } from '../extras.ts'
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
  scene: ({ diff, extra, anim }) =>
    `<rect width="500" height="750" fill="#1f8fbf"/><rect width="500" height="140" fill="#3ba7cc"/>` +
    `<path d="M0 640Q125 610 250 630T500 620V750H0Z" fill="#f4dca4"/>` +
    big(80, 200, 2, jellyfish(0, 0)) +
    diff(...around(155, 252, 305, 358), fish(270, 300, '#ffb703', 2.2), '') +
    fish(190, 270, '#ffb703', 2.2) +
    fish(200, 340, '#ffb703', 2.2) +
    diff(...around(327, 112, 433, 160), '', big(380, 160, 2.2, turtle(0, 0, '#4caf6a', true))) +
    bubbles(440, 480) +
    big(25, 650, 2, seaweed(0, 0)) +
    big(250, 640, 2, coral(0, 0, '#ff6b8b')) +
    big(250, 715, 2.2, starfish(0, -14, '#ff9f43')) +
    diff(...around(80, 644, 180, 720), chest(130, 720), '') +
    big(475, 650, 2, seaweed(0, 0, 1, '#3fa46f')) +
    diff(...around(332, 628, 428, 700), big(380, 700, 2, octopus(0, 0, '#8338ec')), big(380, 700, 2, octopus(0, 0, '#e63946'))) +
    // Decor: small things that fill the scene, the same in both pictures
    fish(60, 60, '#ff6b8b', 1.4) +
    fish(290, 50, '#ff9f43') +
    fish(465, 55, '#ffd23f', 1.2, true) +
    fish(60, 410, '#4dabf7', 1.5, true) +
    fish(420, 330, '#8ac926', 1.4) +
    fish(160, 480, '#ff9f43', 1.3) +
    bubble(205, 140, 6) +
    bubble(215, 110, 4) +
    bubbles(25, 330) +
    bubbles(470, 230) +
    jellyfish(330, 450, '#ff6b8b') +
    coral(85, 600, '#ffb703') +
    seaUrchin(300, 745) +
    clam(470, 745) +
    shell(20, 745) +
    big(150, 600, 2, seaweed(0, 0)) +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['jellyfish', 250, 520],
      ['seahorse', 140, 110],
      ['starfish', 350, 560],
    ]),
})
