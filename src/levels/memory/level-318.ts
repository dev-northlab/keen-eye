import { balloon, bench, bin, lampHead, lampPost, person, pigeon } from '../chapter-02/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { cloud } from '../shapes.ts'
import { around, big, daySky, hills, suitcase } from './shapes.ts'
import { bird, birds, pot } from '../time/shapes.ts'

/** Train wheels under a car from x0 to x1, on the rail at y. */
const wheels = (x0: number, x1: number, y: number) =>
  [x0 + 30, x1 - 30]
    .map((x) => `<circle cx="${x}" cy="${y - 4}" r="18" fill="#3d3d3d"/><circle cx="${x}" cy="${y - 4}" r="6" fill="#c9d1cc"/>`)
    .join('')

/** Passenger car from x0 to x1: body from y 240 to 330 with four windows. */
const wagon = (x0: number, x1: number, color: string) =>
  `<rect x="${x0 - 4}" y="232" width="${x1 - x0 + 8}" height="12" rx="5" fill="#3d4a55"/>` +
  `<rect x="${x0}" y="240" width="${x1 - x0}" height="90" rx="6" fill="${color}"/>` +
  [20, 75, 130, 185].map((dx) => `<rect x="${x0 + dx}" y="255" width="40" height="40" rx="5" fill="#bde3f2"/>`).join('') +
  `<rect x="${x0}" y="306" width="${x1 - x0}" height="8" fill="#ffffff" fill-opacity="0.5"/>` +
  wheels(x0, x1, 334)

/** Passenger's head in a window with its left edge at x. Bounds: x … x + 40, y from 255 to 295. */
const passenger = (x: number, hair: string) =>
  `<circle cx="${x + 20}" cy="${283}" r="12" fill="#f2d29b"/><path d="M${x + 8} 280q12 -18 24 0q-2 -10 -12 -10q-10 0 -12 10Z" fill="${hair}"/>` +
  `<rect x="${x + 8}" y="290" width="24" height="5" fill="${hair}" fill-opacity="0"/>`

export default memoryLevel({
  id: 318,
  title: 'memoryStation',
  showSeconds: 5,
  scene: ({ diff }) =>
    daySky(460) +
    big(380, 90, 1, cloud(0, 0)) +
    big(120, 60, 0.8, cloud(0, 0)) +
    hills(450, '#a5d67a') +
    // Track and train, drawn 120 lower than their helpers' rows (the zones are given in the picture's coordinates)
    `<g transform="translate(0 120)">` +
    `<rect y="330" width="500" height="30" fill="#9c8f80"/><path d="M0 338H500M0 350H500" stroke="#5c677d" stroke-width="4"/>` +
    // Locomotive
    `<circle cx="70" cy="180" r="14" fill="#ffffff" fill-opacity="0.8"/><circle cx="92" cy="160" r="18" fill="#ffffff" fill-opacity="0.7"/><circle cx="122" cy="138" r="22" fill="#ffffff" fill-opacity="0.6"/>` +
    `<rect x="58" y="200" width="24" height="44" fill="#3d4a55"/>` +
    `<rect x="30" y="240" width="145" height="90" rx="8" fill="#2f5d8a"/><circle cx="34" cy="285" r="22" fill="#3d4a55"/><circle cx="30" cy="285" r="8" fill="#ffd23f"/>` +
    diff(
      ...around(165, 314, 255, 450),
      `<rect x="165" y="194" width="90" height="12" rx="4" fill="#3d4a55"/><rect x="170" y="200" width="80" height="130" rx="6" fill="#e63946"/><rect x="185" y="215" width="50" height="36" rx="5" fill="#bde3f2"/>`,
      `<rect x="165" y="194" width="90" height="12" rx="4" fill="#3d4a55"/><rect x="170" y="200" width="80" height="130" rx="6" fill="#3fa46f"/><rect x="185" y="215" width="50" height="36" rx="5" fill="#bde3f2"/>`,
    ) +
    wheels(30, 250, 334) +
    `<path d="M250 300h20" stroke="#3d4a55" stroke-width="6"/>` +
    // The first passenger car, running on out of the picture
    wagon(270, 510, '#e07a5f') +
    passenger(290, '#5a3d2b') +
    diff(...around(345, 375, 385, 415, 30), '', passenger(345, '#e3a14f')) +
    passenger(455, '#ffd23f') +
    `</g>` +
    // Platform
    `<rect y="480" width="500" height="270" fill="#d3cbb9"/><rect y="480" width="500" height="8" fill="#ffd23f"/>` +
    `<path d="M0 640H500M170 488V750M340 488V750" stroke="#bdb39f" stroke-width="3"/>` +
    big(30, 735, 1.5, lampPost(0, 0) + lampHead(0, 0)) +
    diff(...around(106, 692, 154, 720, 30), '', big(130, 720, 2, pigeon(0, 0))) +
    big(265, 705, 1.6, person(0, 0, '#e63946')) +
    big(380, 725, 1.8, bench(0, 0)) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(250, 40, 0.5) +
    cloud(460, 190, 0.4) +
    birds(220, 150) +
    birds(320, 230) +
    balloon(60, 200, '#ff6b8b') +
    bird(440, 352, '#e63946') +
    pot(25, 560) +
    bin(470, 745) +
    suitcase(228, 600, '#ffb703') +
    pigeon(300, 560) +
    pigeon(305, 742, true) +
    pot(485, 700, '#3a86ff') +
    suitcase(110, 600, '#8338ec') +
    diff(...around(92, 542, 173, 600), suitcase(155, 600, '#3a86ff'), '') +
    diff(
      ...around(402, 532, 458, 640),
      `<rect x="426" y="580" width="8" height="60" fill="#3d4a55"/><circle cx="430" cy="560" r="28" fill="#3d4a55"/><circle cx="430" cy="560" r="22" fill="#ffffff"/>` +
        `<path d="M430 560V544M430 560h12" stroke="#23302b" stroke-width="4" stroke-linecap="round"/>`,
      '',
    ),
})
