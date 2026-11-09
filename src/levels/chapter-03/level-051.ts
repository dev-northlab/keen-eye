// Motion differences: the flock flies faster on picture B; the butterfly flutters faster on B; the reeds sway only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level051Redesign } from './level-051-redesign.ts'
import { anthill, bluebells, butterfly, cloud, deer, feather, floor, flower, oak, pine, pineCone, rock, trailSign } from './shapes.ts'

/** Fawn (small deer), faces right; (x, y) = feet. Bounds: x ±18, y from −44 to 0. */
const fawn = (x: number, y: number, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -0.6 : 0.6} 0.6)">` + deer(0, 0, false, '#d9a06c').replace('translate(0 0) scale(1 1)', '') + `</g>`

/** Flock of three birds; (x, y) = lead. Bounds: x ±28, y from −4 to +18. */
const flock = (x: number, y: number) =>
  [[0, 0], [-20, 10], [20, 12]].map(([dx, dy]) => `<path d="M${x + dx - 8} ${y + dy}q4 -6 8 0q4 -6 8 0" stroke="#3d4a55" stroke-width="2.5" fill="none"/>`).join('')

/** Reeds; (x, y) = base. Bounds: x ±12, y from −44 to 0. */
const reeds = (x: number, y: number) =>
  `<path d="M${x - 8} ${y}v-36M${x} ${y}v-44M${x + 8} ${y}v-34" stroke="#4c8a3c" stroke-width="3"/><rect x="${x - 10}" y="${y - 40}" width="5" height="12" rx="2.5" fill="#6b4f3a"/><rect x="${x + 6}" y="${y - 38}" width="5" height="12" rx="2.5" fill="#6b4f3a"/>`

/** Flower patch; (x, y) = center. Bounds: x ±20, y from −12 to +8. */
const patch = (x: number, y: number, color: string) =>
  [[-14, 2], [-4, -6], [6, 4], [15, -4]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="5" fill="${color}"/><circle cx="${x + dx}" cy="${y + dy}" r="2" fill="#ffe36e"/>`).join('')

export default svgLevel({
  id: 51,
  chapter: 'forest',
  title: 'deerMeadow',
  parTimeSec: 120,
  redesign: level051Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let blooms = ''
    for (let i = 0; i < 10; i++) blooms += flower(20 + rand() * 300, 420 + rand() * 70, '#ffffff')
    const migrating = (period: number) => anim({ id: 'flock', type: 'path', points: [[0, 0], [180, -14]], period }, flock(160, 90))
    const fluttering = (period: number) =>
      anim({ id: 'butterfly', type: 'path', points: [[0, 0], [30, -20], [60, 0], [30, 16]], period }, butterfly(560, 330, '#ffb703'))
    const stand = reeds(700, 470)

    return (
      `<rect width="800" height="500" fill="#ffd6a5"/>` +
      `<rect width="800" height="140" fill="#ffb98a"/><circle cx="640" cy="120" r="44" fill="#ffe08a"/>` +
      anim({ type: 'path', points: [[0, 0], [40, 0]], period: 30 }, cloud(300, 70, 0.7)) +
      diff(160, 97, 32, migrating(12), migrating(6), 'flock') +
      `<path d="M0 260Q200 230 400 250T800 240V500H0Z" fill="#a9d3a0"/>` +
      pine(50, 270, 1.2, '#6f9e5a') +
      pine(130, 262, 0.9, '#6f9e5a') +
      pine(760, 262, 1.1, '#6f9e5a') +
      diff(400, 193, 58, oak(400, 270, 1.2), oak(400, 270, 1.2, '#e9a23b')) +
      `<rect y="320" width="800" height="180" fill="#8fca68"/>` +
      diff(560, 330, 20, fluttering(5), fluttering(2.5), 'butterfly') +
      // Deer family
      diff(260, 384, 52, deer(260, 420), deer(260, 420, true)) +
      deer(540, 440, true, '#b07a4a') +
      diff(340, 438, 26, fawn(340, 460), '') +
      fawn(620, 476, true) +
      // Stream
      `<path d="M0 470q200 -30 400 0t400 -10v40H0Z" fill="#63b8e3"/>` +
      diff(700, 448, 26, stand, anim({ type: 'sway', angle: 6, pivot: [700, 470], period: 1.6 }, stand)) +
      diff(120, 400, 24, patch(120, 400, '#ff6b8b'), patch(120, 400, '#b38cff')) +
      patch(460, 380, '#ff6b8b') +
      diff(60, 454, 24, '', rock(60, 464, 1.1)) +
      rock(740, 430, 0.9) +
      blooms +
      floor(rand, 330, 440, 10) +
      bluebells(470, 440) +
      anthill(660, 400) +
      pineCone(80, 285) +
      trailSign(200, 310) +
      feather(420, 330) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['leafPile', 625, 427],
        ['butterfly', 420, 431],
        ['squirrel', 332, 307],
        ['feather', 56, 361],
        ['rabbit', 746, 387],
        ['frog', 487, 286],
        ['anthill', 161, 282],
        ['cloud', 743, 98],
        ['birds', 504, 94],
        ['cloud', 601, 206],
      ])
    )
  },
})
