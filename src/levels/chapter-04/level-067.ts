// Motion differences: the surfer rides faster on picture B; the kite bobs only on B; the gull flies faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { beachBall, cloud, coconut, flipFlops, gull, palm, parasol, person, rock, sun, sunglasses, sunHat, towel, waves } from './shapes.ts'

/** Surfer on a board, faces right; (x, y) = board center. Bounds: x ±30, y from −62 to +6. */
const surfer = (x: number, y: number, board: string, shirt = '#ff006e') =>
  `<g transform="translate(${x} ${y})"><path d="M-30 0q30 -8 60 0q-30 8 -60 0Z" fill="${board}"/>` +
  `<rect x="-10" y="-20" width="7" height="20" fill="#3d4a55" transform="rotate(-10)"/><rect x="4" y="-20" width="7" height="20" fill="#3d4a55" transform="rotate(10)"/>` +
  `<path d="M-10 -44h20l3 24h-26Z" fill="${shirt}"/><path d="M-10 -42l-12 -8M10 -42l12 8" stroke="${shirt}" stroke-width="5" stroke-linecap="round"/><circle cy="-50" r="8" fill="#f2d29b"/></g>`

/** Kite surfing kite; (x, y) = center. Bounds: x ±30, y ±12. */
const kite = (x: number, y: number) => `<path d="M${x - 30} ${y + 8}q30 -30 60 0q-30 -6 -60 0Z" fill="#8338ec"/><path d="M${x - 24} ${y + 6}q24 -16 48 0" stroke="#fff" stroke-width="2" fill="none"/>`

/** Surfboard standing in the sand; (x, y) = bottom center. Bounds: x ±10, y from −60 to 0. */
const board = (x: number, y: number, color: string) => `<path d="M${x - 10} ${y}q0 -60 10 -60q10 0 10 60Z" fill="${color}"/><path d="M${x} ${y - 50}v40" stroke="#fff" stroke-opacity="0.5" stroke-width="2"/>`

/** Lifeguard tower; (x, y) = ground center. The flag is separate. Bounds: x ±30, y from −90 to 0. */
const tower = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-20 0v-50M20 0v-50" stroke="#8a5a3b" stroke-width="5"/><rect x="-30" y="-86" width="60" height="36" fill="#e63946"/><rect x="-30" y="-90" width="60" height="6" fill="#8a3b2b"/>` +
  `<rect x="-24" y="-80" width="20" height="16" fill="#bde3f2"/><rect x="-30" y="-50" width="60" height="4" fill="#8a5a3b"/></g>`
/** Tower flag at (x, y) = tower ground center. Bounds: x from +20 to +44, y from −112 to −90. */
const towerFlag = (x: number, y: number, color: string) => `<path d="M${x + 22} ${y - 90}v-22" stroke="#3d4a55" stroke-width="2"/><path d="M${x + 24} ${y - 112}h20l-4 6l4 6h-20Z" fill="${color}"/>`

export default svgLevel({
  id: 67,
  chapter: 'sea',
  title: 'surfers',
  parTimeSec: 130,
  scene: ({ diff, anim, extra }) => {
    const riding = (period: number) => anim({ id: 'surfer', type: 'path', points: [[0, 0], [60, -16], [120, 0]], period }, surfer(200, 300, '#ffb703'))
    const sail = kite(620, 200)
    const soaring = (period: number) => anim({ id: 'gull', type: 'path', points: [[0, 0], [-200, 10]], period }, gull(700, 90))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(120, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(400, 60, 0.8)) +
      diff(700, 90, 20, soaring(10), soaring(5), 'gull') +
      // Sea with big waves
      `<rect y="200" width="800" height="200" fill="#1f8fbf"/>` +
      anim({ type: 'bob', dx: 14, dy: 0, period: 5 }, waves(210, 8, 120, '#3ba7cc', 400)) +
      diff(620, 204, 32, sail, anim({ id: 'kite', type: 'bob', dx: 4, dy: 8, period: 1.4 }, sail), 'kite') +
      `<path d="M620 212L560 330" stroke="#555" stroke-width="1.5"/>` +
      anim({ type: 'bob', dx: 10, dy: 0, period: 4 }, waves(270, 8, 120, '#5cc0de', 400)) +
      diff(200, 272, 46, riding(6), riding(3), 'surfer') +
      diff(560, 293, 32, surfer(560, 330, '#e63946', '#8ac926'), surfer(560, 330, '#e63946', '#3a86ff')) +
      surfer(400, 350, '#3a86ff', '#ffb703') +
      anim({ type: 'bob', dx: 8, dy: 0, period: 3 }, waves(340, 8, 120, '#8fd8ec', 400)) +
      // Beach
      `<path d="M0 380Q200 360 400 385T800 375V500H0Z" fill="#f2d79e"/>` +
      palm(60, 400, 1.1) +
      palm(740, 410, 1, true) +
      tower(400, 480) +
      diff(433, 379, 18, towerFlag(400, 480, '#e63946'), towerFlag(400, 480, '#ffd166')) +
      diff(140, 454, 32, board(140, 480, '#ff006e'), board(140, 480, '#8ac926')) +
      board(170, 486, '#ffb703') +
      diff(660, 446, 42, parasol(660, 500, '#3a86ff'), parasol(660, 500, '#ff006e')) +
      towel(600, 470, '#8338ec') +
      diff(260, 455, 20, person(260, 490, '#2a9d8f'), person(260, 490, '#e63946')) +
      diff(540, 472, 22, '', rock(540, 480, 1)) +
      rock(720, 494, 0.9) +
      beachBall(320, 480) +
      flipFlops(470, 465) +
      sunHat(760, 450) +
      coconut(85, 410) +
      sunglasses(205, 470) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['coconut', 138, 392],
        ['bottle', 455, 440],
        ['shell', 284, 397],
        ['starfish', 63, 464],
        ['fish', 644, 327, '#ff9f43'],
        ['lifeRing', 473, 278],
        ['fish', 75, 247, '#9ef01a'],
        ['bottle', 749, 242],
        ['gull', 386, 136],
        ['cloud', 199, 163],
      ])
    )
  },
})
