// Motion differences: the lighthouse beam turns faster on picture B; the flag waves only on B; the boat sails faster on B.
import { svgLevel } from '../helpers.ts'
import { cloud, gull, gullStanding, rock, sailboat, waves } from './shapes.ts'

/** Light beam pivoting on (x, y) = lamp center. Bounds: radius 40. */
const beam = (x: number, y: number) => `<path d="M${x} ${y}l40 -10v20Z" fill="#fff3a3" fill-opacity="0.8"/>`

/** Lighthouse stripe; (x, y) = center. Bounds: x ±22, y ±8. */
const stripe = (x: number, y: number, color: string) => `<rect x="${x - 22}" y="${y - 8}" width="44" height="16" fill="${color}"/>`

/** Flag cloth to the right of the pole top at (x, y). Bounds: x from 0 to +24, y from −2 to +16. */
const flag = (x: number, y: number) => `<path d="M${x + 2} ${y}h22l-5 7l5 7h-22Z" fill="#e63946"/>`

/** Seal lying, faces right; (x, y) = bottom center. Bounds: x ±20, y from −18 to 0. */
const seal = (x: number, y: number, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><path d="M-20 0q-2 -10 6 -10h20q10 0 14 -8q2 8 -4 14q-10 4 -16 4Z" fill="#8d99ae"/>` +
  `<path d="M-20 0l-4 -8l8 2Z" fill="#8d99ae"/><circle cx="16" cy="-12" r="1.5" fill="#222"/><circle cx="21" cy="-9" r="1.5" fill="#222"/></g>`

export default svgLevel({
  id: 64,
  chapter: 'sea',
  title: 'lighthouse',
  parTimeSec: 130,
  scene: ({ diff, anim }) => {
    const sweeping = (period: number) => anim({ type: 'rotate', pivot: [400, 110], period }, beam(400, 110))
    const cloth = flag(500, 170)
    const sailing = (period: number) => anim({ id: 'boat', type: 'path', points: [[0, 0], [-100, 0]], period }, sailboat(700, 440, '#3a86ff'))

    return (
      `<rect width="800" height="500" fill="#ffd6a5"/>` +
      `<rect width="800" height="160" fill="#ffb98a"/><circle cx="120" cy="120" r="40" fill="#ffe08a"/>` +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(600, 60, 0.7)) +
      gull(200, 200) +
      diff(260, 180, 18, gull(260, 180), '') +
      // Lighthouse
      diff(400, 110, 40, sweeping(6), sweeping(2.5)) +
      `<path d="M372 90h60l-6 -8h-48Z" fill="#3d4a55"/><rect x="380" y="90" width="44" height="40" fill="#bde3f2"/><rect x="380" y="90" width="44" height="40" fill="none" stroke="#3d4a55" stroke-width="4"/>` +
      `<circle cx="402" cy="110" r="8" fill="#ffd166"/>` +
      `<path d="M378 130h48l12 170h-72Z" fill="#f4f1de"/>` +
      stripe(402, 170, '#e63946') +
      stripe(402, 220, '#e63946') +
      diff(402, 270, 24, stripe(402, 270, '#e63946'), stripe(402, 270, '#3a86ff')) +
      diff(402, 200, 18, `<rect x="394" y="190" width="16" height="20" rx="8" fill="#ffd166"/>`, `<rect x="394" y="190" width="16" height="20" rx="8" fill="#2d3a55"/>`) +
      // Keeper's house
      `<rect x="498" y="170" width="4" height="30" fill="#3d4a55"/>` +
      diff(512, 177, 20, cloth, anim({ type: 'sway', angle: 10, pivot: [500, 170], period: 1.4 }, cloth)) +
      `<rect x="440" y="230" width="120" height="70" fill="#f2cc8f"/><path d="M432 234h136l-68 -36Z" fill="#8a3b2b"/>` +
      `<rect x="460" y="250" width="24" height="24" fill="#ffd166"/>` +
      diff(530, 280, 20, `<rect x="520" y="262" width="20" height="38" rx="2" fill="#2a9d8f"/>`, `<rect x="520" y="262" width="20" height="38" rx="2" fill="#e63946"/>`) +
      // Rocks
      `<path d="M300 300q100 -30 200 -10t140 10v60H300Z" fill="#5c677d"/><path d="M280 340q120 -40 300 -20t160 20v30H280Z" fill="#6f7f93"/>` +
      diff(360, 312, 18, gullStanding(360, 320), gullStanding(360, 320, true)) +
      seal(600, 352) +
      diff(540, 344, 24, seal(540, 352, true), '') +
      // Sea
      `<rect y="370" width="800" height="130" fill="#3ba7cc"/>` +
      anim({ type: 'bob', dx: 10, dy: 0, period: 4 }, waves(380, 10, 100, '#5cc0de')) +
      diff(700, 402, 58, sailing(16), sailing(8), 'boat') +
      diff(100, 444, 24, rock(100, 456, 1.2, '#5c677d'), '') +
      rock(760, 470, 1, '#5c677d') +
      anim({ type: 'bob', dx: 8, dy: 0, period: 3 }, waves(440, 10, 100, '#8fd8ec'))
    )
  },
})
