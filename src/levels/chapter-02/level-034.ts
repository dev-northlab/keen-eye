// Motion differences: the bell swings only on picture B; the beacon flashes only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bollard, cloud, dog, door, hydrant, mailbox, manhole, newspaperBox, person, sandwichBoard, skyline, street, sun, window } from './shapes.ts'

/** Fire engine, faces left; (x, y) = ground center. The beacon is separate. Bounds: x ±70, y from −60 to 0. */
const engine = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-70" y="-50" width="40" height="40" rx="4" fill="#e63946"/><rect x="-64" y="-44" width="24" height="16" fill="#bde3f2"/>` +
  `<rect x="-30" y="-56" width="100" height="46" rx="3" fill="#e63946"/><rect x="-30" y="-36" width="100" height="6" fill="#fff"/>` +
  `<path d="M-20 -60h80l-6 -8h-68Z" fill="#8d99ae"/><path d="M-14 -64h68M-10 -66v4M4 -66v4M18 -66v4M32 -66v4M46 -66v4" stroke="#5c677d" stroke-width="3"/>` +
  `<circle cx="-48" cy="-4" r="11" fill="#2b2b2b"/><circle cx="-48" cy="-4" r="4" fill="#ccc"/><circle cx="40" cy="-4" r="11" fill="#2b2b2b"/><circle cx="40" cy="-4" r="4" fill="#ccc"/></g>`
/** Beacon on the engine's cab at (x, y) = ground center. Bounds: x from −60 to −40, y from −58 to −50. */
const beacon = (x: number, y: number) => `<rect x="${x - 60}" y="${y - 58}" width="20" height="8" rx="3" fill="#3a86ff"/>`

/** Bell hanging from (x, y). Bounds: x ±12, y from 0 to +26. */
const bell = (x: number, y: number) =>
  `<path d="M${x} ${y}v4" stroke="#3d4a55" stroke-width="3"/><path d="M${x - 10} ${y + 22}q0 -18 10 -18q10 0 10 18Z" fill="#ffb703"/>` +
  `<rect x="${x - 12}" y="${y + 20}" width="24" height="4" fill="#e08a00"/><circle cx="${x}" cy="${y + 25}" r="2.5" fill="#3d4a55"/>`

/** Coiled hose; (x, y) = center. Bounds: radius 14. */
const hose = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="12" fill="none" stroke="#e63946" stroke-width="5"/><circle cx="${x}" cy="${y}" r="4" fill="#ffd166"/>`

/** Helmet on the person at (x, y) = feet. Bounds: x ±10, y from −66 to −54. */
const helmet = (x: number, y: number, color: string) =>
  `<path d="M${x - 10} ${y - 56}q10 -14 20 0Z" fill="${color}"/><rect x="${x - 11}" y="${y - 57}" width="22" height="3" fill="${color}"/>`

export default svgLevel({
  id: 34,
  chapter: 'city',
  title: 'fireStation',
  parTimeSec: 110,
  scene: ({ diff, anim, rand, extra }) => {
    const hanging = bell(400, 150)
    const light = beacon(480, 470)
    const spots = Array.from({ length: 5 }, () => `<circle cx="${580 + rand() * 16 - 8}" cy="${452 + rand() * 8 - 4}" r="2" fill="#333"/>`).join('')

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(100, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(550, 60, 0.8)) +
      skyline(rand, 200) +
      // Station
      `<rect x="120" y="120" width="560" height="240" fill="#c0392b"/><rect x="112" y="112" width="576" height="12" fill="#8a3b2b"/>` +
      `<rect x="360" y="60" width="80" height="60" fill="#c0392b"/><path d="M352 60h96l-48 -24Z" fill="#8a3b2b"/>` +
      `<rect x="372" y="80" width="56" height="40" fill="#1d2a4a"/>` +
      diff(400, 162, 20, hanging, anim({ type: 'sway', angle: 16, pivot: [400, 150], period: 1.2 }, hanging)) +
      window(180, 170) +
      window(260, 170) +
      window(540, 170) +
      window(620, 170) +
      // Garage doors
      `<rect x="150" y="230" width="140" height="130" fill="#8d99ae"/><path d="M150 262h140M150 294h140M150 326h140" stroke="#5c677d" stroke-width="4"/>` +
      `<rect x="330" y="230" width="140" height="130" fill="#2b2b2b"/>` +
      `<rect x="510" y="230" width="140" height="130" fill="#8d99ae"/><path d="M510 262h140M510 294h140M510 326h140" stroke="#5c677d" stroke-width="4"/>` +
      diff(580, 294, 18, `<circle cx="580" cy="294" r="14" fill="#e63946"/><path d="M580 286v16M572 294h16" stroke="#fff" stroke-width="3"/>`, '') +
      door(700, 360, '#6b4f3a') +
      `<rect x="680" y="120" width="120" height="240" fill="#e07a5f"/>` +
      street(380, 120) +
      diff(60, 340, 20, hydrant(60, 360, '#e63946'), hydrant(60, 360, '#ffb703')) +
      diff(100, 340, 18, hose(100, 340), '') +
      engine(480, 470) +
      diff(430, 416, 18, light, anim({ type: 'blink', period: 0.6, duty: 0.5 }, light)) +
      person(300, 470, '#e63946') +
      diff(300, 410, 18, helmet(300, 470, '#ffb703'), helmet(300, 470, '#e63946')) +
      person(730, 470, '#e63946', true) +
      helmet(730, 470, '#ffb703') +
      dog(640, 470, '#ffffff') +
      `<circle cx="652" cy="451" r="2" fill="#333"/><circle cx="636" cy="455" r="2" fill="#333"/><circle cx="628" cy="449" r="2" fill="#333"/>` +
      diff(580, 457, 26, dog(580, 470, '#ffffff') + spots, '') +
      bollard(135, 378) +
      newspaperBox(310, 378) +
      mailbox(700, 378) +
      manhole(180, 472) +
      sandwichBoard(490, 378) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['flowerBox', 712, 175, '#ffb703'],
        ['flowerBox', 296, 156, '#ffb703'],
        ['flowerBox', 145, 208, '#e63946'],
        ['balloon', 58, 238, '#ffb703'],
        ['pigeon', 228, 475],
        ['pigeon', 680, 478],
        ['cone', 72, 479],
        ['pigeon', 117, 413],
      ])
    )
  },
})
