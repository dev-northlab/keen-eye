// Motion differences: the parrot bobs only on picture B; the coconut swings faster on B; the raft drifts faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level073Redesign } from './level-073-redesign.ts'
import { clam, cloud, crab, fish, gull, palm, rock, sandBits, shell, starfish, sun, sunglasses, sunHat, waves } from './shapes.ts'

/** Parrot sitting, faces left; (x, y) = feet. Bounds: x ±10, y from −22 to 0. */
const parrot = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-9" rx="7" ry="9" fill="${color}"/><circle cx="-3" cy="-18" r="5" fill="${color}"/><path d="M-7 -18l-5 2l5 2Z" fill="#ffd166"/>` +
  `<path d="M6 -8l4 8" stroke="${color}" stroke-width="3"/><circle cx="-4" cy="-19" r="1.2" fill="#222"/></g>`

/** Coconut hanging from (x, y). Bounds: x ±7, y from 0 to +20. */
const coconut = (x: number, y: number) => `<path d="M${x} ${y}v8" stroke="#6b4f3a" stroke-width="2"/><circle cx="${x}" cy="${y + 14}" r="6" fill="#8a5a3b"/>`

/** Raft, faces right; (x, y) = waterline center. Bounds: x ±36, y from −60 to +8. */
const raft = (x: number, y: number, sail: string) =>
  `<g transform="translate(${x} ${y})"><rect x="-36" y="-8" width="72" height="12" rx="4" fill="#c9a06c"/><path d="M-30 -8v12M-18 -8v12M-6 -8v12M6 -8v12M18 -8v12M30 -8v12" stroke="#a0703f" stroke-width="2"/>` +
  `<rect x="-2" y="-60" width="4" height="52" fill="#8a5a3b"/><path d="M2 -56L30 -16H2Z" fill="${sail}"/></g>`

/** Message bottle; (x, y) = center. Bounds: x ±12, y ±6. */
const bottle = (x: number, y: number) => `<g transform="translate(${x} ${y}) rotate(-20)"><rect x="-10" y="-5" width="16" height="10" rx="4" fill="#bde3f2" stroke="#8d99ae" stroke-width="1.5"/><rect x="6" y="-3" width="6" height="6" fill="#8a5a3b"/></g>`

/** Campfire ring with a flame; (x, y) = ground center. Bounds: x ±14, y from −26 to +4. */
const fire = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="14" ry="4" fill="#8d99ae"/><path d="M${x} ${y - 2}q-10 -8 -6 -20q4 4 6 8q0 -10 6 -14q4 12 -2 20q4 -2 4 -8q4 12 -8 14Z" fill="#fb8500"/>`

export default svgLevel({
  id: 73,
  chapter: 'sea',
  title: 'island',
  parTimeSec: 130,
  redesign: level073Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    const bird = parrot(416, 232, '#8ac926')
    const swinging = (period: number) => anim({ type: 'sway', angle: 12, pivot: [370, 250], period }, coconut(370, 250))
    const drifting = (period: number) => anim({ id: 'raft', type: 'path', points: [[0, 0], [-120, 0]], period }, raft(700, 440, '#f4f1de'))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(120, 70) +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(500, 60, 0.8)) +
      gull(620, 140) +
      diff(680, 110, 18, gull(680, 110), '') +
      `<rect y="300" width="800" height="200" fill="#3ba7cc"/>` +
      anim({ type: 'bob', dx: 8, dy: 0, period: 4 }, waves(306, 10, 100, '#5cc0de')) +
      // Island
      `<path d="M160 340q240 -60 480 0q-60 20 -240 20t-240 -20Z" fill="#f2d79e"/>` +
      sandBits(rand, 326, 350, 6) +
      palm(380, 330, 1.2) +
      diff(416, 221, 18, bird, anim({ id: 'parrot', type: 'bob', dx: 0, dy: 4, period: 0.8 }, bird), 'parrot') +
      diff(370, 262, 18, swinging(2.4), swinging(1)) +
      palm(250, 336, 0.8, true) +
      diff(470, 320, 24, crab(470, 330), crab(470, 330, '#ffb703')) +
      diff(580, 330, 18, starfish(580, 330), starfish(580, 330, '#b38cff')) +
      fire(440, 345) +
      diff(520, 346, 18, shell(520, 350), shell(520, 350, '#b38cff')) +
      diff(140, 330, 36, rock(140, 346, 1.2), rock(140, 346, 1.5)) +
      // Water
      diff(700, 414, 50, drifting(14), drifting(7), 'raft') +
      diff(120, 420, 18, bottle(120, 420), '') +
      rock(560, 470, 1, '#5c677d') +
      anim({ type: 'bob', dx: 8, dy: 0, period: 3 }, waves(440, 10, 100, '#8fd8ec')) +
      shell(270, 346) +
      sunHat(325, 346) +
      sunglasses(405, 346) +
      clam(205, 348) +
      fish(320, 440, '#ff6b8b') +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['fish', 420, 402, '#4dabf7'],
        ['lifeRing', 248, 397],
        ['fish', 51, 371, '#ff6b8b'],
        ['bottle', 94, 479],
        ['buoy', 747, 337],
        ['fish', 310, 475, '#ff6b8b'],
        ['gull', 154, 237],
        ['cloud', 480, 144],
        ['gull', 209, 56],
        ['gull', 739, 155],
      ])
    )
  },
})
