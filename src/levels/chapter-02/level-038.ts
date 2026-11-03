// Motion differences: the marquee bulbs blink only on picture B; the balloon bobs faster on B.
import { svgLevel } from '../helpers.ts'
import { balloon, bollard, building, car, coffeeCup, mailbox, manhole, person, pigeon, sandwichBoard, skyline, street } from './shapes.ts'

/** Film poster; (x, y) = center. Bounds: x ±20, y ±28. */
const poster = (x: number, y: number, color: string) =>
  `<rect x="${x - 20}" y="${y - 28}" width="40" height="56" fill="${color}"/><circle cx="${x}" cy="${y - 8}" r="10" fill="#fff" fill-opacity="0.8"/>` +
  `<rect x="${x - 14}" y="${y + 8}" width="28" height="4" fill="#fff" fill-opacity="0.8"/><rect x="${x - 10}" y="${y + 16}" width="20" height="4" fill="#fff" fill-opacity="0.6"/>`

/** Row of marquee bulbs centered on (x, y). Bounds: x ±28, y ±5. */
const bulbs = (x: number, y: number) => [-24, -12, 0, 12, 24].map((dx) => `<circle cx="${x + dx}" cy="${y}" r="4" fill="#ffd166"/>`).join('')

/** Popcorn bucket; (x, y) = bottom center. Bounds: x ±10, y from −24 to 0. */
const popcorn = (x: number, y: number) =>
  `<path d="M${x - 8} ${y - 16}h16l-2 16h-12Z" fill="#e63946"/><path d="M${x - 5} ${y - 16}v16M${x + 5} ${y - 16}v16" stroke="#fff" stroke-width="2"/>` +
  `<circle cx="${x - 5}" cy="${y - 19}" r="4" fill="#ffd166"/><circle cx="${x + 4}" cy="${y - 20}" r="4" fill="#ffd166"/><circle cx="${x}" cy="${y - 16}" r="4" fill="#fff3c4"/>`

export default svgLevel({
  id: 38,
  chapter: 'city',
  title: 'cinema',
  parTimeSec: 110,
  scene: ({ diff, anim, rand }) => {
    const row = bulbs(400, 182)
    const bobbing = (period: number) => anim({ id: 'balloon', type: 'bob', dx: 0, dy: 4, period }, balloon(596, 268, '#ffb703'))

    return (
      `<rect width="800" height="500" fill="#2d3a55"/>` +
      `<rect y="60" width="800" height="200" fill="#3b4a75"/>` +
      skyline(rand, 200, '#4a5a8a') +
      building(0, 340, 160, 200, '#4a3b75', '#ffd166') +
      building(640, 340, 160, 230, '#4a3b75', '#ffd166') +
      // Cinema
      `<rect x="160" y="140" width="480" height="200" fill="#8a3b2b"/><rect x="150" y="130" width="500" height="14" fill="#e63946"/>` +
      `<rect x="200" y="160" width="400" height="44" rx="6" fill="#ffd166"/><rect x="220" y="170" width="360" height="24" rx="4" fill="#fff"/>` +
      `<rect x="260" y="176" width="280" height="12" rx="6" fill="#e63946"/>` +
      diff(400, 182, 30, row, anim({ type: 'blink', period: 0.8, duty: 0.6 }, row)) +
      `<rect x="340" y="240" width="120" height="100" fill="#2b2b2b"/><path d="M400 240v100" stroke="#8a3b2b" stroke-width="4"/>` +
      `<rect x="350" y="250" width="40" height="60" fill="#ffd166" fill-opacity="0.9"/><rect x="410" y="250" width="40" height="60" fill="#ffd166" fill-opacity="0.9"/>` +
      diff(220, 268, 36, poster(220, 268, '#3a86ff'), poster(220, 268, '#8ac926')) +
      poster(290, 268, '#ff006e') +
      poster(510, 268, '#8338ec') +
      poster(580, 268, '#fb8500') +
      // Ticket booth
      `<rect x="40" y="260" width="80" height="80" fill="#e63946"/><path d="M30 260h100l-10 -16h-80Z" fill="#8a3b2b"/>` +
      diff(80, 290, 28, `<rect x="60" y="272" width="40" height="36" fill="#ffd166"/>`, `<rect x="60" y="272" width="40" height="36" fill="#3d4a55"/>`) +
      street(360, 140) +
      // Queue
      person(200, 360, '#8ac926') +
      diff(240, 325, 20, person(240, 360, '#ffb703'), person(240, 360, '#ff006e')) +
      person(280, 360, '#3a86ff') +
      diff(302, 346, 18, popcorn(304, 360), '') +
      person(480, 360, '#e63946', true) +
      person(580, 360, '#8338ec') +
      diff(596, 280, 34, bobbing(2.6), bobbing(1.2), 'balloon') +
      pigeon(660, 360) +
      diff(700, 353, 18, pigeon(700, 360, true), '') +
      car(140, 470, '#ffb703') +
      car(640, 480, '#3a86ff', true) +
      bollard(140, 358) +
      sandwichBoard(420, 358) +
      coffeeCup(525, 358) +
      mailbox(620, 358) +
      manhole(400, 472)
    )
  },
})
