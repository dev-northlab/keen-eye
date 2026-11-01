// Motion differences: the bus arrives faster on picture B; the kiosk's flag waves only on B.
import { svgLevel } from '../helpers.ts'
import { bin, building, bus, cityTree, cloud, dog, lampHead, lampPost, person, pigeon, skyline, street, sun } from './shapes.ts'

/** Bus shelter; (x, y) = ground center. The timetable is separate. Bounds: x ±76, y from −110 to 0. */
const shelter = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-70" y="-100" width="6" height="100" fill="#3d4a55"/><rect x="64" y="-100" width="6" height="100" fill="#3d4a55"/>` +
  `<rect x="-76" y="-110" width="152" height="12" rx="4" fill="#e63946"/><rect x="-64" y="-98" width="128" height="70" fill="#bde3f2" fill-opacity="0.6"/>` +
  `<rect x="-50" y="-30" width="100" height="6" fill="#a0703f"/><rect x="-46" y="-24" width="4" height="24" fill="#3d4a55"/><rect x="42" y="-24" width="4" height="24" fill="#3d4a55"/></g>`
/** Timetable board; (x, y) = center. Bounds: x ±14, y ±18. */
const timetable = (x: number, y: number, color: string) =>
  `<rect x="${x - 14}" y="${y - 18}" width="28" height="36" rx="3" fill="${color}"/><path d="M${x - 8} ${y - 8}h16M${x - 8} ${y}h16M${x - 8} ${y + 8}h16" stroke="#fff" stroke-width="2"/>`

/** Newspaper kiosk; (x, y) = ground center. The flag is separate. Bounds: x ±36, y from −90 to 0. */
const kiosk = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-32" y="-74" width="64" height="74" fill="#2a9d8f"/><rect x="-36" y="-80" width="72" height="10" fill="#1d7268"/>` +
  `<rect x="-22" y="-60" width="44" height="30" fill="#f4f1de"/><path d="M-16 -52h32M-16 -44h32M-16 -36h20" stroke="#8d99ae" stroke-width="2"/>` +
  `<rect x="-2" y="-110" width="4" height="30" fill="#3d4a55"/></g>`
/** Kiosk flag at the pole top of the kiosk at (x, y). Bounds: x from 0 to +26, y from −110 to −94. */
const flag = (x: number, y: number) => `<path d="M${x + 2} ${y - 110}h24l-5 8l5 8h-24Z" fill="#ffb703"/>`

export default svgLevel({
  id: 31,
  chapter: 'city',
  title: 'busStop',
  parTimeSec: 110,
  scene: ({ diff, anim, rand }) => {
    const arriving = (period: number) =>
      anim({ id: 'bus', type: 'path', points: [[0, 0], [220, 0]], period }, bus(150, 458, '#ffb703'))
    const kioskFlag = flag(680, 340)

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(120, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(450, 60, 0.8)) +
      skyline(rand, 190) +
      building(0, 340, 240, 210, '#c98bb9') +
      building(240, 340, 200, 250, '#f2cc8f') +
      building(440, 340, 180, 190, '#81b29a') +
      building(620, 340, 180, 230, '#ffd6a5') +
      street(360, 140) +
      `<rect x="40" y="356" width="200" height="4" fill="#ffd166"/>` +
      shelter(360, 340) +
      diff(426, 282, 24, timetable(426, 282, '#3a86ff'), timetable(426, 282, '#e63946')) +
      person(320, 340, '#8338ec') +
      diff(380, 305, 20, person(380, 340, '#e63946', true), person(380, 340, '#8ac926', true)) +
      person(470, 340, '#ffb703') +
      diff(510, 327, 26, dog(510, 340, '#2b2b3a'), '') +
      lampPost(560, 340) +
      lampHead(560, 340) +
      diff(600, 326, 18, bin(600, 340, '#5c8d5a'), bin(600, 340, '#3a86ff')) +
      kiosk(680, 340) +
      diff(694, 238, 20, kioskFlag, anim({ type: 'sway', angle: 10, pivot: [680, 238], period: 1.3 }, kioskFlag)) +
      person(740, 340, '#2a9d8f', true) +
      cityTree(40, 340, 1.1) +
      pigeon(140, 340) +
      diff(180, 333, 18, pigeon(180, 340, true), '') +
      diff(150, 430, 68, arriving(12), arriving(6), 'bus')
    )
  },
})
