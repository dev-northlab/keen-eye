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
    daySky(340) +
    big(470, 90, 1, cloud(0, 0)) +
    big(700, 60, 0.8, cloud(0, 0)) +
    hills(330, '#a5d67a') +
    // Track
    `<rect y="330" width="800" height="30" fill="#9c8f80"/><path d="M0 338H800M0 350H800" stroke="#5c677d" stroke-width="4"/>` +
    // Locomotive
    `<circle cx="70" cy="180" r="14" fill="#ffffff" fill-opacity="0.8"/><circle cx="92" cy="160" r="18" fill="#ffffff" fill-opacity="0.7"/><circle cx="122" cy="138" r="22" fill="#ffffff" fill-opacity="0.6"/>` +
    `<rect x="58" y="200" width="24" height="44" fill="#3d4a55"/>` +
    `<rect x="30" y="240" width="145" height="90" rx="8" fill="#2f5d8a"/><circle cx="34" cy="285" r="22" fill="#3d4a55"/><circle cx="30" cy="285" r="8" fill="#ffd23f"/>` +
    diff(
      ...around(165, 194, 255, 330),
      `<rect x="165" y="194" width="90" height="12" rx="4" fill="#3d4a55"/><rect x="170" y="200" width="80" height="130" rx="6" fill="#e63946"/><rect x="185" y="215" width="50" height="36" rx="5" fill="#bde3f2"/>`,
      `<rect x="165" y="194" width="90" height="12" rx="4" fill="#3d4a55"/><rect x="170" y="200" width="80" height="130" rx="6" fill="#3fa46f"/><rect x="185" y="215" width="50" height="36" rx="5" fill="#bde3f2"/>`,
    ) +
    wheels(30, 250, 334) +
    `<path d="M250 300h20M510 300h20" stroke="#3d4a55" stroke-width="6"/>` +
    wagon(270, 510, '#e07a5f') +
    wagon(530, 770, '#e07a5f') +
    passenger(290, '#5a3d2b') +
    diff(...around(345, 255, 385, 295, 30), '', passenger(345, '#e3a14f')) +
    passenger(660, '#3d3d3d') +
    // Platform
    `<rect y="360" width="800" height="140" fill="#d3cbb9"/><rect y="360" width="800" height="8" fill="#ffd23f"/>` +
    `<path d="M0 420H800M200 368V500M400 368V500M600 368V500" stroke="#bdb39f" stroke-width="3"/>` +
    big(60, 470, 1.5, lampPost(0, 0) + lampHead(0, 0)) +
    diff(...around(136, 442, 184, 470, 30), '', big(160, 470, 2, pigeon(0, 0))) +
    big(300, 480, 1.6, person(0, 0, '#e63946')) +
    big(420, 470, 1.8, bench(0, 0)) +
    // Decor: small things that fill the scene, the same in both pictures
    cloud(300, 40, 0.5) +
    cloud(600, 30, 0.4) +
    birds(230, 90) +
    birds(560, 150) +
    balloon(640, 120, '#ff6b8b') +
    bird(500, 232, '#e63946') +
    passenger(455, '#ffd23f') +
    passenger(550, '#e63946') +
    passenger(715, '#8338ec') +
    pot(25, 420) +
    bin(25, 480) +
    suitcase(240, 480, '#ffb703') +
    pigeon(350, 410) +
    pigeon(440, 490, true) +
    pot(788, 492, '#3a86ff') +
    suitcase(520, 476, '#8338ec') +
    diff(...around(502, 418, 583, 476), suitcase(565, 476, '#3a86ff'), '') +
    diff(
      ...around(672, 362, 728, 470),
      `<rect x="696" y="410" width="8" height="60" fill="#3d4a55"/><circle cx="700" cy="390" r="28" fill="#3d4a55"/><circle cx="700" cy="390" r="22" fill="#ffffff"/>` +
        `<path d="M700 390V374M700 390h12" stroke="#23302b" stroke-width="4" stroke-linecap="round"/>`,
      '',
    ),
})
