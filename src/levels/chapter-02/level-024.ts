// Motion differences: the station clock runs backwards on picture B; the engine's smoke rises faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { bench, bollard, cloud, mailbox, newspaperBox, person, pigeon, shoppingBag, skateboard, skyline, window } from './shapes.ts'
import { level024Redesign } from './level-024-redesign.ts'

/** Clock face; (x, y) = center. The hands are separate. Bounds: radius 24. */
const clockFace = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="22" fill="#ffffff" stroke="#3d4a55" stroke-width="4"/>` +
  `<path d="M${x} ${y - 17}v4M${x} ${y + 13}v4M${x - 17} ${y}h4M${x + 13} ${y}h4" stroke="#3d4a55" stroke-width="2"/>`
/** Clock hands pivoting on (x, y). Bounds: radius 16. */
const hands = (x: number, y: number) =>
  `<path d="M${x} ${y}v-15M${x} ${y}h10" stroke="#3d4a55" stroke-width="3" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="2.5" fill="#3d4a55"/>`

/** Locomotive, faces right; (x, y) = rail level under the middle. Bounds: x ±70, y from −80 to 0. */
const engine = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><rect x="-70" y="-30" width="140" height="22" fill="#3d4a55"/>` +
  `<rect x="-64" y="-68" width="60" height="40" fill="${color}"/><rect x="-6" y="-80" width="56" height="52" rx="4" fill="${color}"/>` +
  `<rect x="6" y="-70" width="30" height="22" fill="#bde3f2"/><rect x="-50" y="-80" width="14" height="14" fill="#2b2b2b"/>` +
  `<circle cx="-40" cy="-4" r="12" fill="#2b2b2b"/><circle cx="-40" cy="-4" r="4" fill="#ccc"/><circle cx="0" cy="-4" r="12" fill="#2b2b2b"/>` +
  `<circle cx="0" cy="-4" r="4" fill="#ccc"/><circle cx="40" cy="-4" r="12" fill="#2b2b2b"/><circle cx="40" cy="-4" r="4" fill="#ccc"/>` +
  `<path d="M-70 -14l-10 14h20Z" fill="#e63946"/></g>`

/** Passenger car; (x, y) = rail level under the middle. Bounds: x ±66, y from −74 to 0. */
const coach = (x: number, y: number, color: string) => {
  let windows = ''
  for (let i = 0; i < 5; i++) windows += `<rect x="${-56 + i * 24}" y="-64" width="16" height="18" rx="2" fill="#bde3f2"/>`
  return (
    `<g transform="translate(${x} ${y})"><rect x="-66" y="-74" width="132" height="50" rx="6" fill="${color}"/>${windows}` +
    `<rect x="-66" y="-30" width="132" height="8" fill="#3d4a55"/><circle cx="-40" cy="-6" r="10" fill="#2b2b2b"/><circle cx="40" cy="-6" r="10" fill="#2b2b2b"/></g>`
  )
}

/** Roof stripe of the coach at (x, y). Bounds: x ±66, y from −74 to −64. */
const coachRoof = (x: number, y: number, color: string) => `<rect x="${x - 66}" y="${y - 74}" width="132" height="10" rx="5" fill="${color}"/>`

/** Smoke puffs over the chimney at (x, y). Bounds: x from −12 to +14, y from −44 to +4. */
const smoke = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y - 6}" r="7" fill="#d9d9e3"/><circle cx="${x + 5}" cy="${y - 20}" r="9" fill="#e3e3ec"/><circle cx="${x - 1}" cy="${y - 34}" r="10" fill="#ededf3"/>`

/** Suitcase; (x, y) = bottom center. Bounds: x ±14, y from −26 to 0. */
const suitcase = (x: number, y: number, color: string) =>
  `<rect x="${x - 14}" y="${y - 22}" width="28" height="22" rx="3" fill="${color}"/><path d="M${x - 5} ${y - 22}v-4h10v4" stroke="#3d4a55" stroke-width="3" fill="none"/>`

/** Signal post; (x, y) = foot. Bounds: x ±10, y from −70 to 0. */
const signal = (x: number, y: number, light: string) =>
  `<rect x="${x - 3}" y="${y - 50}" width="6" height="50" fill="#3d4a55"/><rect x="${x - 10}" y="${y - 70}" width="20" height="24" rx="4" fill="#2b2b2b"/>` +
  `<circle cx="${x}" cy="${y - 58}" r="7" fill="${light}"/>`

export default svgLevel({
  id: 24,
  chapter: 'city',
  title: 'station',
  parTimeSec: 110,
  redesign: level024Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    const ticking = (reverse: boolean) => anim({ type: 'rotate', pivot: [400, 150], period: 12, reverse }, hands(400, 150))
    const puffing = (period: number) => anim({ id: 'smoke', type: 'path', points: [[0, 0], [0, -22]], period }, smoke(557, 390))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(150, 60, 0.7)) +
      skyline(rand, 200, '#c5cfdd') +
      // Station building
      `<rect x="200" y="200" width="400" height="140" fill="#f2cc8f"/>` +
      `<path d="M180 206L400 110L620 206Z" fill="#e07a5f"/>` +
      `<rect x="180" y="200" width="440" height="10" fill="#c96b4f"/>` +
      clockFace(400, 150) +
      diff(400, 150, 20, ticking(false), ticking(true)) +
      window(260, 250) +
      window(330, 250) +
      window(470, 250) +
      window(540, 250) +
      `<rect x="370" y="280" width="60" height="60" fill="#5a3d2b"/><rect x="376" y="286" width="48" height="54" fill="#bde3f2"/>` +
      `<rect x="330" y="300" width="140" height="8" fill="#e63946"/>` +
      // Platform
      `<rect y="340" width="800" height="30" fill="#cfd5da"/><path d="M0 366H800" stroke="#ffd166" stroke-width="4"/>` +
      diff(160, 350, 32, bench(160, 370, '#a0703f'), bench(160, 370, '#3a86ff')) +
      person(250, 370, '#ffb703') +
      diff(282, 356, 18, suitcase(282, 370, '#e63946'), '') +
      person(560, 370, '#8338ec', true) +
      suitcase(528, 370, '#2a9d8f') +
      diff(640, 335, 20, person(640, 370, '#3a86ff'), person(640, 370, '#8ac926')) +
      pigeon(420, 370) +
      diff(720, 310, 36, signal(720, 370, '#e63946'), signal(720, 370, '#8ac926')) +
      // Tracks and the train
      `<rect y="370" width="800" height="130" fill="#8d99ae"/>` +
      `<path d="M0 420H800M0 470H800" stroke="#5c677d" stroke-width="6"/>` +
      `<path d="M20 400v90M100 400v90M180 400v90M260 400v90M340 400v90M420 400v90M500 400v90M580 400v90M660 400v90M740 400v90" stroke="#6b4f3a" stroke-width="12"/>` +
      diff(557, 359, 38, puffing(4), puffing(1.6), 'smoke') +
      engine(600, 470, '#e63946') +
      coach(440, 470, '#3a86ff') +
      diff(440, 401, 67, coachRoof(440, 470, '#e63946'), coachRoof(440, 470, '#ffb703')) +
      coach(280, 470, '#3a86ff') +
      coach(120, 470, '#3a86ff') +
      newspaperBox(60, 368) +
      shoppingBag(215, 368) +
      bollard(330, 368) +
      mailbox(770, 368) +
      skateboard(685, 368) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['flowerBox', 415, 250, '#ff006e'],
        ['flowerBox', 577, 242, '#e63946'],
        ['birds', 410, 50],
        ['cloud', 59, 247],
        ['balloon', 85, 49, '#8ac926'],
        ['balloon', 580, 34, '#ffb703'],
        ['cone', 706, 463],
        ['bollard', 201, 458],
        ['coffeeCup', 78, 391],
        ['skateboard', 677, 392],
      ])
    )
  },
})
