// Cartoon spike, approach A (docs/cartoon-spike.md): a 16 s story played by the usual board — a still camera, zoom
// as on any level. A cat sneaks to the pond, leaps for a jumping fish, lands in the water, shakes itself dry and
// walks home. Five differences stay all the story long (one rides on the cat), three are events of the story.
import type { Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { bee, bird, butterflyAt, cat, catBow, dragonfly, farBird, fish, fly, frog, INK, lilyPad, mouse, O, Ow, puffCloud, snail, swingKeys, waterLily } from './cartoon-shapes.ts'

/** Seconds of one loop of the story. */
const LOOP = 16
const during = (from: number, to: number) => ({ from, to, period: LOOP })

/** The cat's rest place: by the house door; drawn 1.45 times its helper's size, a star of the story. */
const CAT: [number, number] = [175, 345]
const CAT_SCALE = 1.45
const catKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, sx: 1, sy: 1, rot: 0 },
  { t: 2.8, ease: 'inOut' },
  { t: 3.2, sy: 0.88, ease: 'inOut' },
  // Sneaks to the pond.
  { t: 5.6, x: 100, y: 40, ease: 'out' },
  { t: 6.1, sy: 0.72, ease: 'out' },
  // The leap: too short.
  { t: 6.35, x: 120, y: 25, sy: 1.12, rot: -18, ease: 'out' },
  { t: 6.85, x: 175, y: -40, sy: 1.05, rot: -8, ease: 'in' },
  { t: 7.3, x: 245, y: 100, sy: 1, rot: 12, ease: 'out' },
  { t: 7.5, sy: 0.9, rot: 0, ease: 'out' },
  // In the water up to its neck, bobbing.
  { t: 7.8, sy: 1, ease: 'inOut' },
  { t: 8.6, y: 94, ease: 'inOut' },
  { t: 9.4, y: 100, ease: 'inOut' },
  { t: 10, y: 96, ease: 'inOut' },
  // Scrambles out and shakes itself dry.
  { t: 10.5, x: 100, y: 40, ease: 'linear' },
  { t: 10.7, rot: 14, ease: 'inOut' },
  { t: 10.85, rot: -14, ease: 'inOut' },
  { t: 11, rot: 14, ease: 'inOut' },
  { t: 11.15, rot: -14, ease: 'inOut' },
  { t: 11.3, rot: 0 },
  { t: 11.5, ease: 'inOut' },
  // Turns round and walks home.
  { t: 11.75, sx: -1, sy: 1 },
  { t: 14.6, x: 0, y: 0, ease: 'inOut' },
  { t: 15, ease: 'inOut' },
  { t: 15.3, sx: 1 },
]
const WALKS: [number, number][] = [[3.2, 5.6], [10.05, 10.5], [11.75, 14.6]]

const FISH: [number, number] = [530, 320]
const fishKeys: Keyframe[] = [
  { t: 0, x: -50, y: 80, rot: -55, o: 0 },
  { t: 5.95 },
  { t: 6, o: 1, ease: 'out' },
  { t: 6.75, x: 0, y: 0, rot: 0, ease: 'in' },
  { t: 7.5, x: 50, y: 80, rot: 55 },
  { t: 7.55, o: 0 },
]

const FROG: [number, number] = [360, 432]
const frogJump: Keyframe[] = [
  { t: 0, y: 0, sy: 1 },
  { t: 7.45, ease: 'out' },
  { t: 7.85, y: -64, sy: 1.12, ease: 'in' },
  { t: 8.25, y: 0, sy: 0.78, ease: 'out' },
  { t: 8.5, sy: 1 },
]

/** The bird's perch on the fence post. */
const BIRD: [number, number] = [260, 262]
const birdKeys: Keyframe[] = [
  { t: 0, x: 560, y: -200, o: 0 },
  { t: 10.4, o: 1, ease: 'out' },
  { t: 11.4, x: 0, y: 0 },
  { t: 12.4, ease: 'out' },
  { t: 12.55, y: -8, ease: 'in' },
  { t: 12.7, y: 0 },
  { t: 13.6, ease: 'in' },
  { t: 14.5, x: -420, y: -230 },
  { t: 14.55, o: 0 },
]

/** Splash where the cat lands. */
const SPLASH: [number, number] = [420, 410]
const splashKeys: Keyframe[] = [
  { t: 0, sx: 0.4, sy: 0.3, o: 0 },
  { t: 7.28 },
  { t: 7.32, o: 1, ease: 'out' },
  { t: 7.7, sx: 1.15, sy: 1.2, ease: 'in' },
  { t: 8.1, sx: 1.35, sy: 1.3, o: 0 },
]

/** A mouse lives in a hole in the house wall: it comes out while the cat is in the pond and flees when it turns. */
const MOUSE: [number, number] = [62, 334]
const mouseKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, sx: 1, sy: 1, o: 0 },
  { t: 7.7, ease: 'step' },
  { t: 7.75, o: 1, ease: 'out' },
  { t: 8.2, x: 6 },
  { t: 8.6, ease: 'inOut' },
  { t: 9.4, x: 62, y: 8 },
  { t: 10.2, ease: 'inOut' },
  { t: 10.35, sy: 0.8, ease: 'inOut' },
  { t: 10.5, sy: 1, ease: 'inOut' },
  { t: 10.65, sy: 0.8, ease: 'inOut' },
  { t: 10.8, sy: 1 },
  // The cat is out of the water: run!
  { t: 11.3, ease: 'step' },
  { t: 11.35, sx: -1, ease: 'in' },
  { t: 11.9, x: 0, y: 0, ease: 'step' },
  { t: 11.95, o: 0, sx: 1 },
]

/** The cat sees the fish: a "!" pops up over its head. */
const SURPRISE: [number, number] = [318, 300]
const surpriseKeys: Keyframe[] = [
  { t: 0, sx: 0.01, sy: 0.01, o: 0 },
  { t: 5.6, ease: 'back' },
  { t: 5.8, sx: 1, sy: 1, o: 1 },
  { t: 6.2, ease: 'in' },
  { t: 6.35, sx: 0.01, sy: 0.01, o: 0 },
]

/** Drops the cat shakes off, from where it climbs out. */
const DRY: [number, number] = [282, 352]
const dropKeys = ([dx, dy]: [number, number]): Keyframe[] => [
  { t: 0, x: 0, y: 0, o: 0 },
  { t: 10.6, ease: 'out' },
  { t: 10.62, o: 1, ease: 'out' },
  { t: 10.95, x: dx, y: dy - 26, ease: 'in' },
  { t: 11.35, x: dx * 1.4, y: dy + 24, o: 0 },
]

/** Rings on the water where the cat came down. */
const ringKeys = (delay: number): Keyframe[] => [
  { t: 0, sx: 0.3, sy: 0.3, o: 0 },
  { t: 7.45 + delay, ease: 'out' },
  { t: 7.5 + delay, o: 0.9, ease: 'out' },
  { t: 9.2 + delay, sx: 2.4, sy: 2.4, o: 0 },
]

/** The fish's shadow under the water before it jumps. */
const SHADOW: [number, number] = [500, 400]
const shadowKeys: Keyframe[] = [
  { t: 0, x: -70, y: 30, sx: 1, o: 0 },
  { t: 0.5, o: 0.3, ease: 'inOut' },
  { t: 2, x: 20, y: 20, ease: 'inOut' },
  { t: 2.3, sx: -1, ease: 'inOut' },
  { t: 3.8, x: -60, y: 10, ease: 'inOut' },
  { t: 4.1, sx: 1, ease: 'inOut' },
  { t: 5.8, x: -20, y: 0, ease: 'in' },
  { t: 5.95, o: 0 },
]

/** A fly buzzes about until the frog catches it; its tongue reaches where the fly hangs. */
const FLY: [number, number] = [392, 372]
const flyKeys: Keyframe[] = [
  { t: 0, x: -130, y: -40, o: 0 },
  { t: 0.6, o: 1, ease: 'inOut' },
  { t: 2.2, x: -40, y: -60, ease: 'inOut' },
  { t: 3.6, x: 34, y: -14, ease: 'inOut' },
  { t: 4.5, x: 0, y: 0, ease: 'in' },
  { t: 4.62, x: -32, y: 42 },
  { t: 4.66, o: 0 },
]
const tongueKeys: Keyframe[] = [
  { t: 0, sx: 0.01, sy: 0.01, o: 0 },
  { t: 4.45, ease: 'out' },
  { t: 4.5, sx: 1, sy: 1, o: 1, ease: 'in' },
  { t: 4.64, sx: 0.01, sy: 0.01 },
  { t: 4.68, o: 0 },
]

/** An apple falls from the tree, bounces and rolls away, and a new one grows. */
const APPLE: [number, number] = [668, 226]
const appleKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, rot: 0, o: 0 },
  { t: 0.8, o: 1 },
  { t: 11.8, ease: 'in' },
  { t: 12.3, y: 108, ease: 'out' },
  { t: 12.45, y: 94, ease: 'in' },
  { t: 12.6, y: 108, ease: 'out' },
  { t: 13.6, x: -40, rot: -260 },
  { t: 15.2, ease: 'inOut' },
  { t: 15.7, o: 0 },
]

const fencePost = (x: number) =>
  `<path d="M${x - 9} 318V276l9-8l9 8V318z" fill="#f3e2bd" ${Ow(2)}/>`

export default svgLevel({
  id: 1001,
  chapter: 'test',
  title: 'cartoonCatPond',
  parTimeSec: 90,
  scene: ({ diff, anim }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const flap = (intervals: [number, number][]) => (m: string) =>
      keys(undefined, swingKeys(intervals, 0.14, 40), [BIRD[0] + 2, BIRD[1] - 12], m)

    /** Wings beating `every` seconds: squashed to a third and back. */
    const beat = (pivot: [number, number], every: number, phase = 0) => (m: string) =>
      anim({ type: 'keys', period: every, phase, keys: [{ t: 0, sy: 1 }, { t: every / 2, sy: 0.3, ease: 'inOut' }], pivot }, m)
    const beatX = (pivot: [number, number], every: number, phase = 0) => (m: string) =>
      anim({ type: 'keys', period: every, phase, keys: [{ t: 0, sx: 1 }, { t: every / 2, sx: 0.25, ease: 'inOut' }], pivot }, m)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)

    // A flock crossing the sky once a loop.
    let flock = ''
    for (const [i, [fx, fy]] of ([[880, 70], [904, 56], [906, 84]] as [number, number][]).entries())
      flock += farBird(fx, fy, beat([fx, fy - 2], 0.5, i * 0.3))
    flock = keys(undefined, [{ t: 0, x: 0 }, { t: 15.9, x: -1010 }], [880, 70], flock)

    // Flowers at the foot of the fence, with bees.
    let flowers = ''
    for (const [i, [fx, c]] of ([[330, '#ff6b8b'], [362, '#ffd23f'], [398, '#b38cff'], [432, '#ff9f43'], [466, '#ff6b8b'], [500, '#4dabf7']] as [number, string][]).entries())
      flowers += anim(
        { type: 'sway', angle: 7, pivot: [fx, 330], period: 2.2, phase: i / 6 },
        `<path d="M${fx} 330v-18" stroke="#3f8f3a" stroke-width="3"/><path d="M${fx} 322q-8-2-9-8q7 0 9 6" fill="#5cbf55" ${Ow(1.2)}/>` +
          `<circle cx="${fx - 5}" cy="312" r="4.6" fill="${c}" ${Ow(1.3)}/><circle cx="${fx + 5}" cy="312" r="4.6" fill="${c}" ${Ow(1.3)}/>` +
          `<circle cx="${fx}" cy="307" r="4.6" fill="${c}" ${Ow(1.3)}/><circle cx="${fx}" cy="317" r="4.6" fill="${c}" ${Ow(1.3)}/><circle cx="${fx}" cy="312" r="3.4" fill="#fff3b0"/>`,
      )
    const bees =
      anim({ type: 'path', points: [[0, 0], [30, -16], [64, -4], [40, 14], [8, 10]], period: 4.2 }, bee(352, 300, beat([353, 295], 0.12))) +
      anim({ type: 'path', points: [[0, 0], [-26, -12], [-52, 6], [-20, 18]], period: 3.4, reverse: true }, bee(484, 296, beat([485, 291], 0.12, 0.5)))

    let fence = ''
    for (let x = 230; x <= 640; x += 22) fence += x === 604 ? diff(604, 292, 27, fencePost(x), '') : fencePost(x)

    let grass = ''
    for (const [gx, gy] of [[40, 380], [120, 470], [230, 440], [300, 480], [660, 450], [720, 380], [760, 470], [600, 482], [190, 395]])
      grass += anim(
        { type: 'sway', angle: 6, pivot: [gx, gy], period: 2.4, phase: (gx % 7) / 7 },
        `<path d="M${gx - 6} ${gy}q2-12 0-18M${gx} ${gy}q1-16 4-22M${gx + 6} ${gy}q-1-10 4-14" fill="none" stroke="#3f8f3a" stroke-width="2.6" stroke-linecap="round"/>`,
      )

    const frogMarkup = () =>
      frog(
        ...FROG,
        (m) => anim({ type: 'blink', duty: 0.06, period: 3.1, phase: 0.7 }, m),
        (m) => anim({ type: 'keys', period: 1.6, keys: [{ t: 0, sx: 1, sy: 1 }, { t: 0.8, sx: 1.25, sy: 1.35, ease: 'inOut' }], pivot: [FROG[0], FROG[1] - 9] }, m),
      )

    // The bow tie rides with the cat: in A only, its zone follows the cat.
    const catMarkup = () =>
      keys(
        'cat',
        catKeys,
        [CAT[0], CAT[1] - 25 * CAT_SCALE],
        `<g transform="translate(${CAT[0]} ${CAT[1]}) scale(${CAT_SCALE})">` +
          cat(
            0,
            0,
            { back: swingKeys(WALKS, 0.22, 24), front: swingKeys(WALKS, 0.22, 24, true) },
            (k, pivot, m) => keys(undefined, k, pivot, m),
            diff(CAT[0] + 14 * CAT_SCALE, CAT[1] - 30 * CAT_SCALE, 26, catBow(0, 0), '', 'cat'),
            (m) => anim({ type: 'blink', duty: 0.05, period: 3.4, phase: 0.2 }, m),
            (m) => anim({ type: 'sway', angle: 10, pivot: [-26, -25], period: 1.8 }, m),
          ) +
          `</g>`,
      )

    return (
      `<defs><linearGradient id="c1-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc6f2"/><stop offset="1" stop-color="#d8f1ff"/></linearGradient>` +
      `<linearGradient id="c1-grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd16a"/><stop offset="1" stop-color="#5fae4a"/></linearGradient>` +
      `<radialGradient id="c1-water" cx="0.5" cy="0.4" r="0.7"><stop offset="0" stop-color="#7fd3f0"/><stop offset="1" stop-color="#3b9fd1"/></radialGradient></defs>` +
      `<rect width="800" height="500" fill="url(#c1-sky)"/>` +
      // Sun with turning rays
      anim(
        { type: 'rotate', pivot: [690, 80], period: 30 },
        `<path d="M690 22v-14M690 152v-14M632 80h-14M762 80h-14M649 39l-10-10M741 131l-10-10M649 121l-10 10M741 29l-10 10" stroke="#ffd23f" stroke-width="6" stroke-linecap="round"/>`,
      ) +
      `<circle cx="690" cy="80" r="40" fill="#ffd23f" stroke="#f2a93b" stroke-width="3"/>` +
      // The sun smiles and blinks.
      `<ellipse cx="676" cy="74" rx="4" ry="6" fill="${INK}"/><ellipse cx="704" cy="74" rx="4" ry="6" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.4, phase: 0.5 }, `<rect x="670" y="66" width="40" height="16" fill="#ffd23f"/><path d="M671 75h11M698 75h11" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`) +
      `<path d="M674 92q16 14 32 0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
      `<circle cx="665" cy="90" r="5" fill="#ff9f43" fill-opacity="0.6"/><circle cx="715" cy="90" r="5" fill="#ff9f43" fill-opacity="0.6"/>` +
      anim({ type: 'path', points: [[0, 0], [90, 0]], period: 28 }, puffCloud(140, 70, 0.9)) +
      anim({ type: 'path', points: [[0, 0], [-70, 0]], period: 22 }, puffCloud(470, 48, 0.7)) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 18 }, puffCloud(330, 120, 0.45)) +
      flock +
      // Hills
      `<path d="M0 250q120-70 260-20t280-10t260 0V320H0z" fill="#a9dc8a"/>` +
      `<rect y="300" width="800" height="200" fill="url(#c1-grass)"/>` +
      // House
      [0, 1 / 3, 2 / 3]
        .map((phase) =>
          anim(
            { type: 'keys', period: 4, phase, keys: [{ t: 0, x: 0, y: 0, sx: 0.5, sy: 0.5, o: 0.85 }, { t: 3.6, x: 18, y: -70, sx: 1.5, sy: 1.5, o: 0, ease: 'out' }], pivot: [185, 118] },
            `<circle cx="185" cy="118" r="9" fill="#e8eef3"/><circle cx="192" cy="111" r="7" fill="#e8eef3"/>`,
          ),
        )
        .join('') +
      `<rect x="174" y="118" width="20" height="40" fill="#b5523b" ${O}/>` +
      `<path d="M18 200L120 118L222 200z" fill="#d1495b" ${O}/>` +
      `<rect x="34" y="198" width="172" height="132" fill="#ffe8b6" ${O}/>` +
      `<path d="M34 230h172M34 262h172M34 294h172" stroke="#f0d08f" stroke-width="2"/>` +
      `<rect x="70" y="220" width="60" height="50" fill="#bfe8ff" ${O}/>` +
      `<path d="M100 220v50M70 245h60" stroke="${INK}" stroke-width="2.5"/>` +
      diff(
        100,
        245,
        44,
        `<path d="M70 220h16q-4 26 2 50h-18zM130 220h-16q4 26-2 50h18z" fill="#e63946" ${Ow(2)}/>` +
          `<path d="M70 219h60" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`,
        '',
      ) +
      `<rect x="66" y="268" width="68" height="7" rx="2" fill="#a0703f" ${Ow(2)}/>` +
      `<rect x="150" y="258" width="40" height="72" rx="4" fill="#8a5a2b" ${O}/><circle cx="182" cy="296" r="3" fill="#ffd23f"/>` +
      `<path d="M50 330v-6q12-14 24 0v6z" fill="#3a2418" ${Ow(2)}/>` +
      once(mouseKeys, [MOUSE[0], MOUSE[1] - 7], mouse(...MOUSE, (m) => anim({ type: 'sway', angle: 14, pivot: [MOUSE[0] - 10, MOUSE[1] - 5], period: 0.8 }, m))) +
      // Tree
      `<path d="M712 340q6-60-4-130h22q-8 70 4 130z" fill="#8a5a2b" ${O}/>` +
      anim(
        { type: 'sway', angle: 2, pivot: [720, 300], period: 5 },
        `<circle cx="690" cy="190" r="48" fill="#4caf50" ${O}/><circle cx="752" cy="180" r="44" fill="#5cbf55" ${O}/><circle cx="720" cy="140" r="52" fill="#66c25a" ${O}/>` +
          `<circle cx="680" cy="160" r="7" fill="#e63946" ${Ow(1.5)}/><circle cx="728" cy="118" r="7" fill="#e63946" ${Ow(1.5)}/><circle cx="700" cy="205" r="7" fill="#e63946" ${Ow(1.5)}/>`,
      ) +
      diff(
        757,
        196,
        22,
        `<path d="M740 198q17 12 34 0q-3 9-17 9t-17-9z" fill="#a0703f" ${Ow(1.8)}/>` +
          `<ellipse cx="751" cy="196" rx="5" ry="4" fill="#e9f4ff" ${Ow(1.2)}/><ellipse cx="762" cy="196" rx="5" ry="4" fill="#e9f4ff" ${Ow(1.2)}/>`,
        '',
      ) +
      once(appleKeys, APPLE, `<circle cx="${APPLE[0]}" cy="${APPLE[1]}" r="7" fill="#e63946" ${Ow(1.5)}/><path d="M${APPLE[0]} ${APPLE[1] - 7}l2-5" stroke="${INK}" stroke-width="1.6"/>`) +
      // Fence
      `<path d="M220 284H650M220 306H650" stroke="${INK}" stroke-width="9"/><path d="M220 284H650M220 306H650" stroke="#e7cf9f" stroke-width="5"/>` +
      fence +
      flowers +
      bees +
      // Pond
      `<ellipse cx="470" cy="410" rx="176" ry="56" fill="#5f9f48"/>` +
      `<ellipse cx="470" cy="410" rx="170" ry="52" fill="url(#c1-water)" ${O}/>` +
      `<path d="M330 400q20-6 40 0M560 392q20-6 40 0M450 380q16-5 32 0" fill="none" stroke="#fff" stroke-opacity="0.7" stroke-width="2.5" stroke-linecap="round"/>` +
      // The fish jumps (in B with its little one)
      diff(
        522,
        324,
        32,
        keys('fish', fishKeys, FISH, fish(...FISH)),
        keys('fish', fishKeys, FISH, fish(...FISH) + fish(FISH[0] - 22, FISH[1] + 14, 0.55, '#ff9f43')),
        'fish',
        during(5.95, 7.6),
      ) +
      grass +
      anim({ type: 'path', points: [[0, 0], [70, 0]], period: 40, flipX: 250 }, snail(250, 478)) +
      // "!" — the cat has seen the fish.
      once(surpriseKeys, SURPRISE, `<path d="M${SURPRISE[0] - 5} 262h10l-3 24h-4z" fill="#e63946" ${Ow(2)}/><circle cx="${SURPRISE[0]}" cy="295" r="4" fill="#e63946" ${Ow(1.6)}/>`) +
      catMarkup() +
      // The water in front of the cat: in the pond only its head shows.
      `<path d="M300 410a170 52 0 0 0 340 0z" fill="url(#c1-water)"/>` +
      `<path d="M300 410a170 52 0 0 0 340 0" fill="none" stroke="${INK}" stroke-width="2.5"/>` +
      `<path d="M390 424q30 6 60 0M500 440q30 6 60 0" fill="none" stroke="#fff" stroke-opacity="0.6" stroke-width="2.5" stroke-linecap="round"/>` +
      keys(
        undefined,
        splashKeys,
        SPLASH,
        `<path d="M${SPLASH[0] - 40} ${SPLASH[1]}q10-30 20-4q8-40 20-2q12-38 20 2q10-26 20 4z" fill="#bfeaff" ${Ow(2)}/>` +
          `<circle cx="${SPLASH[0] - 34}" cy="${SPLASH[1] - 40}" r="4" fill="#bfeaff" ${Ow(1.5)}/><circle cx="${SPLASH[0] + 30}" cy="${SPLASH[1] - 46}" r="5" fill="#bfeaff" ${Ow(1.5)}/>`,
      ) +
      [0, 0.45]
        .map((d) => once(ringKeys(d), [SPLASH[0], SPLASH[1] + 4], `<ellipse cx="${SPLASH[0]}" cy="${SPLASH[1] + 4}" rx="22" ry="6" fill="none" stroke="#fff" stroke-width="2.4"/>`))
        .join('') +
      ([[-44, -6], [-24, -30], [2, -40], [28, -28], [46, -4]] as [number, number][])
        .map((d) => once(dropKeys(d), DRY, `<path d="M${DRY[0]} ${DRY[1] - 5}q4 6 0 9q-4-3 0-9z" fill="#8fd8ff" ${Ow(1.2)}/>`))
        .join('') +
      once(shadowKeys, SHADOW, `<path d="M${SHADOW[0] - 14} ${SHADOW[1]}l-12-9v18zM${SHADOW[0] + 18} ${SHADOW[1]}a18 9 0 1 1-36 0a18 9 0 1 1 36 0z" fill="#1f5f8a" fill-opacity="0.7"/>`) +
      ([[440, 430, 0], [492, 418, 0.4], [560, 430, 0.75]] as [number, number, number][])
        .map(([bx, by, phase]) =>
          anim({ type: 'keys', period: 2.6, phase, keys: [{ t: 0, y: 0, o: 0 }, { t: 0.3, o: 0.9 }, { t: 2.2, y: -16, o: 0.9 }, { t: 2.4, o: 0 }], pivot: [bx, by] },
            `<circle cx="${bx}" cy="${by}" r="3" fill="#fff" fill-opacity="0.3" stroke="#fff" stroke-width="1.4"/>`),
        )
        .join('') +
      ([[585, 428, 3.2, 0], [410, 442, 4.1, 0.5]] as [number, number, number, number][])
        .map(([rx, ry, period, phase]) =>
          anim({ type: 'keys', period, phase, keys: [{ t: 0, sx: 0.3, sy: 0.3, o: 0.8 }, { t: period * 0.9, sx: 1.6, sy: 1.6, o: 0, ease: 'out' }], pivot: [rx, ry] },
            `<ellipse cx="${rx}" cy="${ry}" rx="16" ry="4.5" fill="none" stroke="#fff" stroke-width="2"/>`),
        )
        .join('') +
      once(tongueKeys, [FROG[0], FROG[1] - 15], `<path d="M${FROG[0]} ${FROG[1] - 15}L${FLY[0]} ${FLY[1]}" stroke="#e8798f" stroke-width="4" stroke-linecap="round"/><circle cx="${FLY[0]}" cy="${FLY[1]}" r="4" fill="#e8798f"/>`) +
      once(flyKeys, FLY, anim({ type: 'path', points: [[0, 0], [6, -5], [12, 2], [4, 6]], period: 0.7 }, fly(...FLY, beat([FLY[0], FLY[1] - 3], 0.08)))) +
      anim(
        { type: 'keys', period: 6, keys: [{ t: 0, x: 0, y: 0 }, { t: 1.2, ease: 'inOut' }, { t: 1.5, x: -70, y: -6 }, { t: 2.8, ease: 'inOut' }, { t: 3.1, x: -30, y: -38 }, { t: 4.6, ease: 'inOut' }, { t: 4.9, x: 0, y: 0 }], pivot: [660, 360] },
        anim({ type: 'bob', dx: 0, dy: 3, period: 0.9 }, dragonfly(660, 360, beat([660, 354], 0.1))),
      ) +
      lilyPad(FROG[0], FROG[1] + 4, 1.2) +
      lilyPad(590, 408) +
      diff(520, 447, 20, lilyPad(520, 452, 0.8) + waterLily(520, 448), lilyPad(520, 452, 0.8)) +
      // The frog: in B it leaps when the cat splashes down.
      diff(FROG[0], FROG[1] - 14, 26, frogMarkup(), keys('frog', frogJump, FROG, frogMarkup()), 'frog', during(7.45, 8.5)) +
      // A bird comes to the fence (B only)
      diff(
        BIRD[0],
        BIRD[1] - 10,
        22,
        '',
        keys('bird', birdKeys, BIRD, bird(...BIRD, flap([[10.4, 11.4], [13.6, 14.5]]))),
        'bird',
        during(10.45, 14.3),
      ) +
      // Butterflies over the meadow
      anim({ type: 'path', points: [[0, 0], [70, -40], [150, -10], [120, 40], [40, 30]], period: 11 },
        anim({ type: 'bob', dx: 0, dy: 5, period: 0.7 }, butterflyAt(60, 420, ['#ff6fb5', '#ffd23f'], beatX([60, 420], 0.3)))) +
      anim({ type: 'path', points: [[0, 0], [-60, -30], [-100, 20], [-30, 40]], period: 9, reverse: true },
        anim({ type: 'bob', dx: 0, dy: 4, period: 0.6 }, butterflyAt(700, 440, ['#b38cff', '#4dabf7'], beatX([700, 440], 0.26, 0.4))))
    )
  },
})
