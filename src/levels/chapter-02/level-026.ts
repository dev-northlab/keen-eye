// Motion differences: the hanging lamp swings only on picture B; the balloon bunch bobs faster on B.
import { svgLevel } from '../helpers.ts'
import { awning, balloon, building, cloud, manhole, newspaperBox, parkingMeter, person, pigeon, scooter, shoppingBag, street, sun } from './shapes.ts'

/** Market stall counter; (x, y) = ground center. The canopy is drawn with `awning`. Bounds: x ±60, y from −120 to 0. */
const stall = (x: number, y: number, cloth: string) =>
  `<g transform="translate(${x} ${y})"><rect x="-56" y="-120" width="6" height="120" fill="#8a5a33"/><rect x="50" y="-120" width="6" height="120" fill="#8a5a33"/>` +
  `<rect x="-60" y="-60" width="120" height="60" fill="${cloth}"/><rect x="-60" y="-64" width="120" height="8" fill="#a0703f"/></g>`

/** Fruit crate; (x, y) = bottom center. Bounds: x ±20, y from −24 to 0. */
const crate = (x: number, y: number, fruit: string) =>
  `<g transform="translate(${x} ${y})"><circle cx="-10" cy="-16" r="6" fill="${fruit}"/><circle cx="2" cy="-18" r="6" fill="${fruit}"/>` +
  `<circle cx="12" cy="-15" r="6" fill="${fruit}"/><circle cx="-4" cy="-12" r="6" fill="${fruit}"/>` +
  `<path d="M-20 -12h40l-2 12h-36Z" fill="#c68b4e"/><path d="M-18 -6h36" stroke="#9c6a37" stroke-width="2"/></g>`

/** Balance scale; (x, y) = bottom center. Bounds: x ±20, y from −36 to 0. */
const scale = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-10" y="-4" width="20" height="4" fill="#3d4a55"/><rect x="-2" y="-30" width="4" height="28" fill="#3d4a55"/>` +
  `<path d="M-18 -30h36" stroke="#3d4a55" stroke-width="3"/><path d="M-18 -30v8M18 -30v8" stroke="#3d4a55" stroke-width="2"/>` +
  `<path d="M-26 -22h16l-2 4h-12ZM10 -22h16l-2 4h-12Z" fill="#ffb703"/><circle cx="-10" cy="-25" r="3" fill="#e63946"/></g>`

/** Sitting cat; (x, y) = bottom center. Bounds: x from −14 to +20, y from −30 to 0. */
const cat = (x: number, y: number, color = '#c48a5a') =>
  `<g transform="translate(${x} ${y})"><path d="M8 -2q14 -2 12 -16" stroke="${color}" stroke-width="4" fill="none" stroke-linecap="round"/>` +
  `<ellipse cy="-9" rx="11" ry="10" fill="${color}"/><circle cx="-2" cy="-22" r="7" fill="${color}"/>` +
  `<path d="M-8 -26l1 -6l4 4ZM4 -26l-1 -6l-4 4Z" fill="${color}"/><circle cx="-4" cy="-23" r="1.2" fill="#222"/><circle cx="0" cy="-23" r="1.2" fill="#222"/></g>`

/** Hanging lamp from the hook at (x, y). Bounds: x ±12, y from 0 to +30. */
const lamp = (x: number, y: number) =>
  `<path d="M${x} ${y}v10" stroke="#3d4a55" stroke-width="2"/><path d="M${x - 12} ${y + 24}l6 -14h12l6 14Z" fill="#3d4a55"/>` +
  `<circle cx="${x}" cy="${y + 26}" r="4" fill="#ffd166"/>`

export default svgLevel({
  id: 26,
  chapter: 'city',
  title: 'market',
  parTimeSec: 110,
  scene: ({ diff, anim, rand }) => {
    const hanging = lamp(400, 180)
    const bunch = (period: number) =>
      anim({ id: 'balloons', type: 'bob', dx: 3, dy: 5, period }, balloon(690, 250, '#e63946') + balloon(712, 236, '#ffb703') + balloon(700, 272, '#3a86ff'))
    let cobbles = ''
    for (let i = 0; i < 40; i++) cobbles += `<ellipse cx="${rand() * 800}" cy="${420 + rand() * 80}" rx="10" ry="4" fill="#bfc6cc"/>`

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(720, 70) +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(200, 60, 0.7)) +
      building(0, 340, 260, 200, '#ffd6a5') +
      building(260, 340, 280, 230, '#bdb2ff') +
      building(540, 340, 260, 210, '#f4d6a0') +
      `<path d="M400 160h-100M400 160h100" stroke="#3d4a55" stroke-width="3"/><path d="M400 160v20" stroke="#3d4a55" stroke-width="3"/>` +
      diff(400, 196, 24, hanging, anim({ type: 'sway', angle: 14, pivot: [400, 180], period: 1.6 }, hanging)) +
      street(400, 100, 60) +
      cobbles +
      // Stalls
      stall(160, 400, '#f4f1de') +
      diff(160, 290, 50, awning(160, 276, 90, '#e63946'), awning(160, 276, 90, '#3a86ff')) +
      crate(120, 340, '#e63946') +
      crate(160, 340, '#ff9f43') +
      crate(200, 340, '#ffd166') +
      stall(360, 400, '#f4f1de') +
      awning(360, 276, 90, '#8ac926') +
      crate(320, 340, '#8ac926') +
      diff(360, 329, 24, crate(360, 340, '#e63946'), crate(360, 340, '#8338ec')) +
      diff(410, 322, 26, scale(410, 340), '') +
      stall(560, 400, '#f4f1de') +
      awning(560, 276, 90, '#ffb703') +
      crate(520, 340, '#ff6b8b') +
      crate(560, 340, '#8ac926') +
      crate(600, 340, '#ff9f43') +
      diff(583, 385, 24, '', cat(580, 400)) +
      // Vendors and shoppers
      diff(250, 365, 20, person(250, 400, '#e63946'), person(250, 400, '#2a9d8f')) +
      person(460, 400, '#3a86ff', true) +
      person(640, 400, '#8338ec', true) +
      person(690, 320, '#ffb703') +
      diff(701, 266, 58, bunch(2.8), bunch(1.2), 'balloons') +
      pigeon(300, 470) +
      pigeon(330, 476, true) +
      person(60, 470, '#2a9d8f') +
      shoppingBag(280, 398) +
      newspaperBox(55, 398) +
      parkingMeter(700, 398) +
      scooter(770, 398) +
      manhole(600, 478)
    )
  },
})
