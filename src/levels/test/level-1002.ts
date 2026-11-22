// Cartoon spike, approach B (docs/cartoon-spike.md): a 20 s story in a world larger than the screen, shown by a camera
// (engine/cartoon.ts) that cuts between shots and pans after the dog. Grandma sets a pie on the windowsill to cool,
// the dog wakes up, runs over, steals it and carries it home while grandma shakes her fist at the window.
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { ease } from '../../engine/keyframes.ts'
import { apple, appleTree, bee, bird, birchTree, butterflyAt, cartoonChick, cartoonHen, farBird, fly, grassTuft, INK, O, Ow, pineTree, puffCloud, roundTree, squirrel, swingKeys } from './cartoon-shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

/** The whole yard, without the empty grass at the bottom of the world. */
const WIDE = { x: 90, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // Grandma at the window with the pie.
  { t: 3, x: 220, y: 330, w: 380 },
  { t: 6.9, x: 245, y: 350, w: 330, ease: 'step' },
  // The dog by its house.
  { t: 7, x: 960, y: 520, w: 420 },
  { t: 9.8, x: 975, y: 535, w: 390, ease: 'inOut' },
  // Following it to the window.
  { t: 13, x: 220, y: 380, w: 460 },
  { t: 14.4, x: 235, y: 390, w: 440, ease: 'step' },
  { t: 14.5, ...WIDE, ease: 'linear' },
  { t: 15.5, ...WIDE, ease: 'step' },
  // Grandma, cross.
  { t: 15.6, x: 230, y: 360, w: 320 },
  { t: 17.4, x: 220, y: 352, w: 340, ease: 'step' },
  { t: 17.5, ...WIDE },
]

/** The dog lies here, in front of its house, facing the house of grandma (left). */
const DOG: [number, number] = [1150, 690]
const RUNS: [number, number][] = [[10, 13], [14.85, 18.6]]
const dogKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, sx: 1, sy: 1, rot: 0 },
  { t: 8.2, ease: 'out' },
  { t: 8.35, sy: 0.88, ease: 'out' },
  { t: 8.55, sy: 1.06, ease: 'inOut' },
  { t: 8.7, sy: 1 },
  { t: 10, ease: 'inOut' },
  { t: 13, x: -680, ease: 'out' },
  { t: 13.2, sy: 0.85, ease: 'out' },
  // Up on its hind legs at the sill.
  { t: 13.55, x: -700, y: -112, sy: 1.05, rot: 15 },
  { t: 14.2, ease: 'in' },
  { t: 14.45, x: -690, y: 0, sy: 0.9, rot: 0, ease: 'out' },
  { t: 14.6, sy: 1 },
  { t: 14.7, ease: 'inOut' },
  { t: 14.85, sx: -1, ease: 'inOut' },
  { t: 18.6, x: 0 },
  { t: 18.8, ease: 'inOut' },
  { t: 19, sx: 1 },
]
/** Shown from `from` to `to`, hidden the rest of the loop (cuts between drawings). */
const shownKeys = (from: number, to: number): Keyframe[] => [
  { t: 0, o: 0, ease: 'step' },
  { t: from, o: 1, ease: 'step' },
  { t: to, o: 0 },
]
const hiddenKeys = (from: number, to: number): Keyframe[] => [
  { t: 0, o: 1, ease: 'step' },
  { t: from, o: 0, ease: 'step' },
  { t: to, o: 1 },
]

/** Grandma stands behind the window; she rises into it twice. */
const GRANDMA: [number, number] = [350, 470]
const grandmaKeys: Keyframe[] = [
  { t: 0, y: 140 },
  { t: 3.1, ease: 'out' },
  { t: 3.5, y: 0 },
  { t: 5.6, ease: 'in' },
  { t: 6.2, y: 140 },
  { t: 15.2, ease: 'back' },
  { t: 15.6, y: 0 },
  { t: 18.6, ease: 'in' },
  { t: 19.2, y: 140 },
]
const PIE: [number, number] = [400, 540]
const pieKeys: Keyframe[] = [
  { t: 0, x: -50, o: 0, ease: 'step' },
  { t: 3.6, o: 1, ease: 'out' },
  { t: 4.4, x: 0 },
  { t: 14.2, ease: 'step' },
  { t: 14.25, o: 0 },
]
const steamKeys: Keyframe[] = [
  { t: 0, o: 0, ease: 'step' },
  { t: 4.6, ease: 'inOut' },
  { t: 5, o: 0.9 },
  { t: 13.6, ease: 'inOut' },
  { t: 14, o: 0 },
]

/** Where the butterfly sits: on the sleeping dog's nose. */
const NOSE: [number, number] = [1084, 668]
const butterflyKeys: Keyframe[] = [
  { t: 0, x: 210, y: -190, o: 0, ease: 'step' },
  { t: 7, o: 1, ease: 'inOut' },
  { t: 7.3, x: 120, y: -110, ease: 'inOut' },
  { t: 7.6, x: 0, y: 0, ease: 'out' },
  { t: 8.15, ease: 'in' },
  { t: 9.4, x: 220, y: -260 },
  { t: 9.45, o: 0 },
]

/** Where the dog's hind feet are at second t of a run (the dog's own keys), for the dust they kick up. */
const hindFeet = (t: number) =>
  t < 14
    ? DOG[0] + 30 - 680 * ease('inOut', Math.min(Math.max((t - 10) / 3, 0), 1))
    : DOG[0] - 30 - 690 + 690 * ease('inOut', Math.min(Math.max((t - 14.85) / 3.75, 0), 1))
const DUST_TIMES = [10.4, 10.9, 11.4, 11.9, 12.4, 12.85, 13.25, 14.45, 15.3, 15.9, 16.5, 17.1, 17.7, 18.2]
const dustKeys = (t: number): Keyframe[] => [
  { t: 0, sx: 0.4, sy: 0.4, o: 0 },
  { t, ease: 'out' },
  { t: t + 0.05, o: 0.85, ease: 'out' },
  { t: t + 0.7, x: t < 14 ? 14 : -14, y: -10, sx: 1.5, sy: 1.5, o: 0 },
]

/** Crumbs falling from the pie as the dog snatches it. */
const crumbKeys = ([cx, cy]: [number, number]): Keyframe[] => [
  { t: 0, x: 0, y: 0, o: 0 },
  { t: 14.2, ease: 'step' },
  { t: 14.25, o: 1, ease: 'in' },
  { t: 14.9, x: cx, y: cy },
  { t: 16, ease: 'inOut' },
  { t: 16.4, o: 0 },
]

/** A squirrel runs up the tree as the story starts and back down near its end. */
const SQUIRREL: [number, number] = [1336, 540]
const squirrelKeys: Keyframe[] = [
  { t: 0, y: 108 },
  { t: 0.8, ease: 'inOut' },
  { t: 2.4, y: 0 },
  { t: 16, ease: 'inOut' },
  { t: 17.6, y: 108 },
]

/** An apple drops from the big tree while the camera is on the dog, bounces, rolls, and a new one grows. */
const APPLE: [number, number] = [1300, 404]
const appleKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, rot: 0, o: 0 },
  { t: 0.8, o: 1 },
  { t: 8.3, ease: 'in' },
  { t: 8.85, y: 250, ease: 'out' },
  { t: 9.05, y: 232, ease: 'in' },
  { t: 9.25, y: 250, ease: 'out' },
  { t: 10.2, x: -30, rot: -220 },
  { t: 18.6, ease: 'inOut' },
  { t: 19.2, o: 0 },
]

/** The dog, content, once the pie is eaten: a little heart. */
const heartKeys: Keyframe[] = [
  { t: 0, y: 0, sx: 0.01, sy: 0.01, o: 0 },
  { t: 19.1, ease: 'back' },
  { t: 19.4, sx: 1, sy: 1, o: 1, ease: 'in' },
  { t: 19.95, y: -26, o: 0 },
]

const pie = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<path d="M-26 0h52l-5 10h-42z" fill="#c9cfd6" ${Ow(2)}/>` +
  `<path d="M-24 0q0-18 24-18t24 18z" fill="#e7a95b" ${Ow(2)}/>` +
  `<path d="M-12-8l6-4M0-10l6-4M10-7l6-3" stroke="#a86a2b" stroke-width="2" stroke-linecap="round"/>` +
  `</g>`

const butterfly = (x: number, y: number, flap: (m: string) => string) =>
  `<path d="M${x} ${y - 2}v-8" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>` +
  flap(`<path d="M${x} ${y - 6}q-14-14-16-2q2 8 16 2zM${x} ${y - 6}q14-14 16-2q-2 8-16 2z" fill="#ff6fb5" ${Ow(1.5)}/>` +
    `<circle cx="${x - 9}" cy="${y - 10}" r="2.2" fill="#ffd23f"/><circle cx="${x + 9}" cy="${y - 10}" r="2.2" fill="#ffd23f"/>`)

export default svgLevel({
  id: 1002,
  chapter: 'test',
  title: 'cartoonDogPie',
  parTimeSec: 100,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const [dx, dy] = DOG
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    /** Wings beating `every` seconds: squashed and back. */
    const beat = (pivot: [number, number], every: number, phase = 0, axis: 'sx' | 'sy' = 'sy') => (m: string) =>
      anim({ type: 'keys', period: every, phase, keys: [{ t: 0, [axis]: 1 }, { t: every / 2, [axis]: axis === 'sy' ? 0.3 : 0.25, ease: 'inOut' }], pivot }, m)

    // The dog: a sleeping drawing and a standing one, cut from one to the other.
    const spot = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="6.5" fill="#7a4a24"/>`
    const lying =
      anim({ type: 'bob', dx: 0, dy: -1.6, period: 2.6 },
        `<path d="M${dx + 50} ${dy - 14}q22 2 18-16" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>` +
        `<path d="M${dx + 50} ${dy - 14}q22 2 18-16" fill="none" stroke="#d9a066" stroke-width="5" stroke-linecap="round"/>` +
        `<ellipse cx="${dx + 8}" cy="${dy - 16}" rx="46" ry="16" fill="#e8b678" ${O}/>` +
        `<ellipse cx="${dx - 50}" cy="${dy - 3}" rx="11" ry="5" fill="#e8b678" ${Ow(2)}/>` +
        `<ellipse cx="${dx - 30}" cy="${dy - 3}" rx="11" ry="5" fill="#e8b678" ${Ow(2)}/>` +
        `<circle cx="${dx - 42}" cy="${dy - 20}" r="17" fill="#e8b678" ${O}/>` +
        `<ellipse cx="${dx - 58}" cy="${dy - 13}" rx="11" ry="7.5" fill="#f3d3a8" ${Ow(2)}/>` +
        `<circle cx="${dx - 66}" cy="${dy - 16}" r="3.6" fill="${INK}"/>` +
        `<path d="M${dx - 48} ${dy - 24}q4 3 8 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>` +
        keys(undefined, [{ t: 0, rot: 0 }, { t: 7.3 }, { t: 7.4, rot: -16 }, { t: 7.5, rot: 6 }, { t: 7.62, rot: -12 }, { t: 7.8, rot: 0 }], [dx - 32, dy - 34],
          `<path d="M${dx - 34} ${dy - 34}q14 0 10 26q-10-6-10-26z" fill="#a86f3c" ${Ow(2)}/>`)) +
      anim({ type: 'keys', period: 2.4, keys: [{ t: 0, x: 0, y: 0, o: 0 }, { t: 0.4, o: 1 }, { t: 2, x: 14, y: -34, o: 0 }], pivot: [dx - 40, dy - 46] },
        `<path d="M${dx - 44} ${dy - 50}h8l-8 8h8" fill="none" stroke="#5a6b8a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`)
    const leg = (x: number, color: string, k: Keyframe[]) =>
      keys(undefined, k, [x, dy - 22], `<rect x="${x - 5}" y="${dy - 24}" width="10" height="24" rx="5" fill="${color}" ${Ow(2.2)}/>`)
    const flipRot = (k: Keyframe[]) => k.map((f) => ({ ...f, rot: f.rot === undefined ? undefined : -f.rot }))
    const legsA = swingKeys(RUNS, 0.16, 30)
    const legsB = swingKeys(RUNS, 0.16, 30, true)
    const standing =
      anim({ type: 'sway', angle: 22, pivot: [dx + 36, dy - 42], period: 0.5 },
        `<path d="M${dx + 36} ${dy - 42}q18-6 20-26" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>` +
        `<path d="M${dx + 36} ${dy - 42}q18-6 20-26" fill="none" stroke="#d9a066" stroke-width="5" stroke-linecap="round"/>`) +
      leg(dx - 22, '#c99358', legsB) +
      leg(dx + 26, '#c99358', flipRot(legsB)) +
      `<ellipse cx="${dx}" cy="${dy - 36}" rx="40" ry="17" fill="#e8b678" ${O}/>` +
      leg(dx - 30, '#e8b678', legsA) +
      leg(dx + 32, '#e8b678', flipRot(legsA)) +
      `<path d="M${dx - 34} ${dy - 44}q6 10 14 12" fill="none" stroke="#d1453b" stroke-width="5" stroke-linecap="round"/>` +
      `<circle cx="${dx - 40}" cy="${dy - 60}" r="18" fill="#e8b678" ${O}/>` +
      `<ellipse cx="${dx - 58}" cy="${dy - 53}" rx="12" ry="8" fill="#f3d3a8" ${Ow(2)}/>` +
      `<circle cx="${dx - 67}" cy="${dy - 56}" r="3.8" fill="${INK}"/>` +
      `<circle cx="${dx - 45}" cy="${dy - 65}" r="3.2" fill="${INK}"/><circle cx="${dx - 44}" cy="${dy - 66}" r="1" fill="#fff"/>` +
      `<path d="M${dx - 60} ${dy - 47}q6 4 12 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>` +
      `<path d="M${dx - 32} ${dy - 74}q16 0 12 30q-12-8-12-30z" fill="#a86f3c" ${Ow(2)}/>` +
      keys(undefined, shownKeys(14.2, 19), [dx, dy], pie(dx - 66, dy - 44, 0.6))

    const dog = keys(
      'dog',
      dogKeys,
      [dx, dy - 20],
      keys(undefined, hiddenKeys(8.25, 19.05), [dx, dy], lying) +
        keys(undefined, shownKeys(8.25, 19.05), [dx, dy], standing) +
        // The spot on its back (A only), one zone for both drawings: it jumps up with the dog.
        diff(
          dx + 10,
          dy - 37,
          22,
          keys(undefined, [{ t: 0, y: 0, ease: 'step' }, { t: 8.25, y: -22, ease: 'step' }, { t: 19.05, y: 0 }], [dx, dy], spot(dx + 10, dy - 26)),
          '',
          'dog',
        ),
    )

    // Grandma at the kitchen window.
    const [gx, gy] = GRANDMA
    const fist = `<circle cx="${gx + 36}" cy="${gy - 34}" r="9" fill="#f6c7a1" ${Ow(2)}/>`
    const rollingPin =
      `<rect x="${gx + 19}" y="${gy - 46}" width="34" height="12" rx="5" fill="#d9a066" ${Ow(2)}/>` +
      `<path d="M${gx + 19} ${gy - 40}h-6M${gx + 53} ${gy - 40}h6" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`
    const grandma = keys(
      'grandma',
      grandmaKeys,
      GRANDMA,
      `<path d="M${gx - 34} ${gy + 80}q0-50 34-56q34 6 34 56z" fill="#7b5ea7" ${O}/>` +
        `<path d="M${gx - 12} ${gy + 26}q12 10 24 0" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>` +
        // Serving arm: pushes the pie out.
        keys(undefined, hiddenKeys(14, 20), GRANDMA,
          keys(undefined, [{ t: 0, rot: -40 }, { t: 3.6, ease: 'out' }, { t: 4.4, rot: 0 }, { t: 5.2, ease: 'inOut' }, { t: 5.8, rot: -40 }], [gx + 20, gy + 34],
            `<path d="M${gx + 20} ${gy + 34}q22 8 30 30" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>` +
            `<path d="M${gx + 20} ${gy + 34}q22 8 30 30" fill="none" stroke="#7b5ea7" stroke-width="7" stroke-linecap="round"/>` +
            `<circle cx="${gx + 50}" cy="${gy + 66}" r="7" fill="#f6c7a1" ${Ow(2)}/>`)) +
        // Head
        `<circle cx="${gx}" cy="${gy - 12}" r="10" fill="#d8d8e0" ${Ow(2)}/>` +
        `<circle cx="${gx}" cy="${gy + 10}" r="21" fill="#f6c7a1" ${O}/>` +
        `<path d="M${gx - 21} ${gy + 6}q2-18 21-18t21 18q-6-8-21-10q-15 2-21 10z" fill="#d8d8e0" ${Ow(2)}/>` +
        `<circle cx="${gx - 8}" cy="${gy + 9}" r="6" fill="#fff" fill-opacity="0.5" ${Ow(1.8)}/><circle cx="${gx + 8}" cy="${gy + 9}" r="6" fill="#fff" fill-opacity="0.5" ${Ow(1.8)}/>` +
        `<path d="M${gx - 2} ${gy + 9}h4" stroke="${INK}" stroke-width="1.8"/>` +
        `<circle cx="${gx - 8}" cy="${gy + 9}" r="1.8" fill="${INK}"/><circle cx="${gx + 8}" cy="${gy + 9}" r="1.8" fill="${INK}"/>` +
        `<circle cx="${gx - 13}" cy="${gy + 18}" r="3.5" fill="#f19a9a" fill-opacity="0.7"/><circle cx="${gx + 13}" cy="${gy + 18}" r="3.5" fill="#f19a9a" fill-opacity="0.7"/>` +
        keys(undefined, hiddenKeys(14, 20), GRANDMA, `<path d="M${gx - 6} ${gy + 20}q6 5 12 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`) +
        // Angry: frown, brows and a raised fist (in B with a rolling pin) shaking at the dog.
        keys(
          undefined,
          shownKeys(14, 20),
          GRANDMA,
          `<path d="M${gx - 6} ${gy + 23}q6-5 12 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>` +
            `<path d="M${gx - 14} ${gy}l9 3M${gx + 14} ${gy}l-9 3" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>` +
            // Steam of anger from her ears.
            ([[-17, 0], [17, 0.45]] as [number, number][])
              .map(([ox, phase]) =>
                anim({ type: 'keys', period: 0.9, phase, keys: [{ t: 0, x: 0, y: 0, sx: 0.5, sy: 0.5, o: 1 }, { t: 0.5, x: ox / 3, y: -16, sx: 1.2, sy: 1.2, o: 0.9, ease: 'out' }, { t: 0.85, x: ox / 2, y: -28, sx: 1.4, sy: 1.4, o: 0 }], pivot: [gx + ox, gy - 2] },
                  `<path d="M${gx + ox - 8} ${gy}a6 6 0 0 1 6-9a7 7 0 0 1 12 2a5 5 0 0 1 0 9z" fill="#fff" ${Ow(1.6)}/>`),
              )
              .join('') +
            anim(
              { type: 'sway', angle: 9, pivot: [gx + 20, gy + 34], period: 0.36 },
              `<path d="M${gx + 20} ${gy + 34}q20-20 16-60" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>` +
                `<path d="M${gx + 20} ${gy + 34}q20-20 16-60" fill="none" stroke="#7b5ea7" stroke-width="7" stroke-linecap="round"/>` +
                diff(gx + 36, gy - 38, 40, fist, fist + rollingPin, 'grandma', during(15.2, 19.2)),
            ),
        ),
    )

    let flowers = ''
    for (const [fx, fy, c] of [[140, 668, '#ff6b8b'], [270, 670, '#ffd23f'], [470, 668, '#b38cff'], [560, 670, '#ff6b8b'], [120, 820, '#ffd23f'], [380, 850, '#ff9f43'], [640, 800, '#ff6b8b'], [980, 840, '#b38cff'], [1210, 820, '#ffd23f'], [1380, 760, '#ff6b8b'], [1040, 700, '#4dabf7'], [1300, 735, '#ff9f43'], [880, 720, '#ffd23f']] as [number, number, string][])
      flowers += anim(
        { type: 'sway', angle: 5, pivot: [fx, fy], period: 2.6, phase: (fx % 9) / 9 },
        `<path d="M${fx} ${fy}v-22" stroke="#3f8f3a" stroke-width="3"/>` +
          `<circle cx="${fx - 6}" cy="${fy - 24}" r="5.5" fill="${c}" ${Ow(1.5)}/><circle cx="${fx + 6}" cy="${fy - 24}" r="5.5" fill="${c}" ${Ow(1.5)}/>` +
          `<circle cx="${fx}" cy="${fy - 30}" r="5.5" fill="${c}" ${Ow(1.5)}/><circle cx="${fx}" cy="${fy - 18}" r="5.5" fill="${c}" ${Ow(1.5)}/>` +
          `<circle cx="${fx}" cy="${fy - 24}" r="4" fill="#fff3b0"/>`,
      )

    // Laundry on the line, each piece swinging on its peg.
    const laundry = (x: number, markup: string, id?: string) =>
      anim({ type: 'sway', angle: 6, pivot: [x, 432], period: 2.2, phase: (x % 5) / 5, ...(id && { id }) }, markup)
    const sock = `<path d="M843 432h14v22q0 8 8 10t-2 10q-12 0-20-10z" fill="#ff9f43" ${Ow(2)}/><path d="M843 444h14" stroke="#fff" stroke-width="3"/>`

    /** A tree's crown swaying in the wind, each tree at its own pace. */
    const crown = (period: number, angle = 2) => (pivot: [number, number], m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 11) / 11 }, m)

    // A distant wood along the hills, then trees of every kind around the yard.
    let wood = ''
    for (const [wx, wy, r, c] of [[690, 600, 26, '#8cc770'], [728, 592, 32, '#7fbf66'], [770, 602, 24, '#93cc78'], [1100, 598, 28, '#86c46d'], [1140, 590, 34, '#7aba61'], [30, 600, 30, '#86c46d']] as [number, number, number, string][])
      wood += `<circle cx="${wx}" cy="${wy}" r="${r}" fill="${c}"/>`
    const backTrees =
      pineTree(55, 652, 1.05, crown(4.4, 1.5)) +
      pineTree(658, 646, 0.9, crown(4.8, 1.5)) +
      birchTree(1022, 640, 0.85, crown(3.6, 3)) +
      roundTree(1292, 628, 0.7, '#4caf50', crown(4.2))
    const frontTrees =
      appleTree(420, 892, 0.72, crown(5.2)) +
      apple(392, 886, 6) + apple(452, 890, 6) +
      appleTree(868, 896, 0.76, crown(4.6)) +
      apple(840, 890, 6) + apple(905, 893, 6) + apple(930, 884, 6) +
      pineTree(1170, 904, 0.85, crown(4, 1.5)) +
      birchTree(40, 900, 0.9, crown(3.4, 3))

    // Tufts of grass all over the yard, kept off the places of the differences on the ground.
    const clear: [number, number][] = [[1268, 680], [1084, 660], [1150, 670]]
    let tufts = ''
    for (let i = 0; i < 44; i++) {
      const tx = Math.round(rand() * 1420 + 10)
      const ty = Math.round(686 + rand() * 200)
      if (clear.some(([cx, cy]) => Math.hypot(tx - cx, ty - cy) < 60)) continue
      tufts += anim({ type: 'sway', angle: 7, pivot: [tx, ty], period: 2.3, phase: (tx % 13) / 13 }, grassTuft(tx, ty))
    }

    // A flock crossing the sky.
    let flock = ''
    for (const [i, [fx, fy]] of ([[1500, 230], [1526, 214], [1528, 246], [1552, 200]] as [number, number][]).entries())
      flock += farBird(fx, fy, beat([fx, fy - 2], 0.5, i * 0.25))
    flock = keys(undefined, [{ t: 0, x: 0 }, { t: 19.9, x: -1700 }], [1500, 230], flock)

    // A hen and her chicks pecking about the yard.
    const peck = (pivot: [number, number], phase: number) => (m: string) =>
      anim({ type: 'keys', period: 1.7, phase, keys: [{ t: 0, rot: 0 }, { t: 1.05, ease: 'inOut' }, { t: 1.2, rot: 26, ease: 'inOut' }, { t: 1.35, rot: 0 }], pivot }, m)
    const walker = (x: number, phase: number, m: string) =>
      anim({ type: 'path', points: [[0, 0], [150, 10]], period: 16, phase, flipX: x }, m)
    const hens =
      walker(600, 0, peck([600, 770], 0)(cartoonHen(600, 770))) +
      walker(566, 0.97, peck([566, 778], 0.4)(cartoonChick(566, 778))) +
      walker(548, 0.95, peck([548, 766], 0.7)(cartoonChick(548, 766)))

    // Dust kicked up by the running dog, and crumbs of the pie.
    const dust = DUST_TIMES.map((t) => {
      const x = hindFeet(t)
      return once(dustKeys(t), [x, dy - 4], `<circle cx="${x}" cy="${dy - 4}" r="9" fill="#efe3c6"/><circle cx="${x + 8}" cy="${dy - 9}" r="6" fill="#efe3c6"/>`)
    }).join('')
    const crumbs = ([[-14, 116], [6, 122], [22, 112], [-4, 108]] as [number, number][])
      .map((c) => once(crumbKeys(c), [PIE[0], PIE[1] - 4], `<circle cx="${PIE[0] + c[0] / 4}" cy="${PIE[1] - 4}" r="3" fill="#e7a95b" ${Ow(1)}/>`))
      .join('')

    return (
      `<defs><linearGradient id="c2-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ccff5"/><stop offset="1" stop-color="#e3f5ff"/></linearGradient>` +
      `<linearGradient id="c2-grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#93d36c"/><stop offset="1" stop-color="#5aa847"/></linearGradient>` +
      `<clipPath id="c2-win"><rect x="292" y="422" width="156" height="118"/></clipPath></defs>` +
      `<rect width="${W}" height="${H}" fill="url(#c2-sky)"/>` +
      anim({ type: 'rotate', pivot: [1250, 120], period: 40 },
        `<path d="M1250 50v-16M1250 190v-16M1180 120h-16M1336 120h-16M1200 70l-11-11M1311 181l-11-11M1200 170l-11 11M1311 59l-11 11" stroke="#ffd23f" stroke-width="7" stroke-linecap="round"/>`) +
      `<circle cx="1250" cy="120" r="48" fill="#ffd23f" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="1234" cy="112" rx="4.5" ry="7" fill="${INK}"/><ellipse cx="1266" cy="112" rx="4.5" ry="7" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.6, phase: 0.3 }, `<rect x="1226" y="103" width="48" height="18" fill="#ffd23f"/><path d="M1228 113h12M1260 113h12" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<path d="M1230 134q20 16 40 0" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>` +
      `<circle cx="1220" cy="130" r="6" fill="#ff9f43" fill-opacity="0.6"/><circle cx="1280" cy="130" r="6" fill="#ff9f43" fill-opacity="0.6"/>` +
      anim({ type: 'path', points: [[0, 0], [160, 0]], period: 34 }, puffCloud(220, 90, 1.1)) +
      anim({ type: 'path', points: [[0, 0], [-140, 0]], period: 30 }, puffCloud(820, 150, 0.9)) +
      anim({ type: 'path', points: [[0, 0], [120, 0]], period: 26 }, puffCloud(1050, 70, 0.7)) +
      anim({ type: 'path', points: [[0, 0], [-90, 0]], period: 22 }, puffCloud(560, 260, 0.6)) +
      flock +
      `<path d="M0 560q180-90 360-30t380-20t360-10t340 20V640H0z" fill="#b5e09a"/>` +
      wood +
      `<rect y="620" width="${W}" height="${H - 620}" fill="url(#c2-grass)"/>` +
      backTrees +
      `<path d="M200 660q40 120 -20 240h90q40-120 30-240z" fill="#e9d7a8"/>` +
      // Grandma's house
      [0, 1 / 3, 2 / 3]
        .map((phase) =>
          anim({ type: 'keys', period: 3.6, phase, keys: [{ t: 0, x: 0, y: 0, sx: 0.5, sy: 0.5, o: 0.85 }, { t: 3.3, x: 24, y: -90, sx: 1.7, sy: 1.7, o: 0, ease: 'out' }], pivot: [500, 188] },
            `<circle cx="500" cy="188" r="12" fill="#eef2f5"/><circle cx="509" cy="179" r="9" fill="#eef2f5"/>`),
        )
        .join('') +
      `<rect x="484" y="190" width="30" height="70" fill="#b5523b" ${O}/>` +
      `<path d="M100 340L370 180L640 340z" fill="#d1495b" ${O}/>` +
      `<path d="M150 310L370 196L590 310" fill="none" stroke="#a9374a" stroke-width="3"/>` +
      anim({ type: 'sway', angle: 8, pivot: [370, 180], period: 4.2, id: 'vane' },
        `<path d="M370 180v-48" stroke="${INK}" stroke-width="3"/>` +
          diff(372, 124, 28,
            `<path d="M356 132q-2-14 8-16q2-10 10-6q8 2 6 10l6 2l-6 3q2 8-6 10z" fill="#ffd23f" ${Ow(1.8)}/><path d="M357 126l-8-6l2 10" fill="#e63946" ${Ow(1.5)}/>`,
            `<path d="M352 124h40l-6-5M392 124l-6 5" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`,
            'vane')) +
      `<rect x="120" y="338" width="500" height="322" fill="#fff1cf" ${O}/>` +
      `<path d="M120 400h500M120 470h500M120 540h500M120 610h500" stroke="#f0d9a7" stroke-width="2"/>` +
      `<rect x="160" y="520" width="80" height="140" rx="6" fill="#8a5a2b" ${O}/><circle cx="226" cy="596" r="4" fill="#ffd23f"/>` +
      `<rect x="176" y="540" width="48" height="36" rx="4" fill="#bfe8ff" ${Ow(2)}/>` +
      // Kitchen window: the room behind, grandma in it.
      `<rect x="292" y="422" width="156" height="118" fill="#7a4a32"/>` +
      `<path d="M300 470h60" stroke="#5c3522" stroke-width="5"/><rect x="306" y="452" width="12" height="18" fill="#4dabf7"/><rect x="324" y="456" width="16" height="14" fill="#ffd23f"/>` +
      `<circle cx="385" cy="436" r="10" fill="#f3e2bd" ${Ow(2)}/><path d="M385 436v-6M385 436l4 2" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>` +
      anim({ type: 'sway', angle: 18, pivot: [385, 446], period: 1.2 }, `<path d="M385 446v14" stroke="#c9a227" stroke-width="2"/><circle cx="385" cy="462" r="3.5" fill="#c9a227"/>`) +
      anim({ type: 'sway', angle: 5, pivot: [420, 422], period: 3.2 },
        `<path d="M420 422v28" stroke="#3a2418" stroke-width="2"/><path d="M408 462q12-16 24 0z" fill="#ffd23f"/>` +
          anim({ type: 'blink', duty: 0.5, period: 1.6 }, `<ellipse cx="420" cy="466" rx="16" ry="5" fill="#ffd23f" fill-opacity="0.35"/>`)) +
      `<g clip-path="url(#c2-win)">${grandma}</g>` +
      anim({ type: 'sway', angle: 2.5, pivot: [297, 422], period: 3.4 }, `<path d="M292 422h30q-8 50 0 118h-30z" fill="#4dabf7" fill-opacity="0.9" ${Ow(2)}/>`) +
      anim({ type: 'sway', angle: 2.5, pivot: [443, 422], period: 3.4, phase: 0.5 }, `<path d="M448 422h-30q8 50 0 118h30z" fill="#4dabf7" fill-opacity="0.9" ${Ow(2)}/>`) +
      `<rect x="292" y="422" width="156" height="118" fill="none" ${Ow(5)}/>` +
      `<rect x="276" y="538" width="188" height="14" rx="3" fill="#a0703f" ${Ow(2.4)}/>` +
      // Flowerpot on the sill (in B a cactus)
      `<path d="M288 538l4-20h24l4 20z" fill="#d9774b" ${Ow(2)}/>` +
      diff(304, 504, 22,
        `<path d="M304 518v-20" stroke="#3f8f3a" stroke-width="3"/><path d="M296 500q8-16 16 0q-8 6-16 0z" fill="#e63946" ${Ow(1.6)}/><path d="M296 510q-8-4-6-10q6 2 10 8" fill="#5cbf55" ${Ow(1.4)}/>`,
        `<path d="M298 518v-24q6-8 12 0v24z" fill="#5cbf55" ${Ow(1.8)}/><path d="M302 500l-3-2M309 506l3-2M303 512l-3-1" stroke="${INK}" stroke-width="1.2"/>`) +
      // The pie cools on the sill; its steam (in B a heart).
      keys('pie', pieKeys, PIE, pie(...PIE)) +
      diff(PIE[0], PIE[1] - 42, 24,
        keys(undefined, steamKeys, PIE, anim({ type: 'bob', dx: 0, dy: -4, period: 1.4 },
          `<path d="M${PIE[0] - 9} ${PIE[1] - 26}q-6-8 0-14t0-14M${PIE[0]} ${PIE[1] - 26}q-6-8 0-14t0-14M${PIE[0] + 9} ${PIE[1] - 26}q-6-8 0-14t0-14" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>`)),
        keys(undefined, steamKeys, PIE, anim({ type: 'bob', dx: 0, dy: -4, period: 1.4 },
          `<path d="M${PIE[0]} ${PIE[1] - 26}q-18-12-16-24q4-10 16-2q12-8 16 2q2 12-16 24z" fill="none" stroke="#fff" stroke-width="3.5" stroke-linejoin="round"/>`)),
        undefined,
        during(4.6, 14)) +
      flowers +
      tufts +
      // Clothesline
      `<path d="M700 420v240M1000 420v240" stroke="#8a5a2b" stroke-width="8"/>` +
      `<path d="M700 428q150 14 300 0" fill="none" stroke="${INK}" stroke-width="2"/>` +
      laundry(760, `<path d="M740 432h40l8 14l-8 4v30h-40v-30l-8-4z" fill="#4dabf7" ${Ow(2)}/>`) +
      diff(852, 455, 26, laundry(850, sock, 'sock'), '', 'sock') +
      laundry(935, `<rect x="915" y="433" width="40" height="52" rx="3" fill="#ff6b8b" ${Ow(2)}/><path d="M915 470h40" stroke="#fff" stroke-width="4"/>`) +
      anim(
        { type: 'keys', period: 5, keys: [{ t: 0, y: 0, sx: 1 }, { t: 1.2, ease: 'out' }, { t: 1.35, y: -8, ease: 'in' }, { t: 1.5, y: 0 }, { t: 2.5, ease: 'step' }, { t: 2.6, sx: -1 }, { t: 3.7, ease: 'out' }, { t: 3.85, y: -8, ease: 'in' }, { t: 4, y: 0 }, { t: 4.9, ease: 'step' }], pivot: [1000, 414] },
        bird(1000, 416),
      ) +
      // Tree with a birdhouse (A only)
      `<path d="M1348 660q8-120-2-260h30q-10 140-2 260z" fill="#8a5a2b" ${O}/>` +
      diff(1362, 470, 24,
        `<path d="M1346 470l16-14l16 14z" fill="#d1495b" ${Ow(2)}/><rect x="1350" y="470" width="24" height="22" fill="#ffd23f" ${Ow(2)}/><circle cx="1362" cy="481" r="4" fill="${INK}"/>`,
        '') +
      anim({ type: 'sway', angle: 2, pivot: [1360, 420], period: 5 },
        `<circle cx="1320" cy="360" r="62" fill="#4caf50" ${O}/><circle cx="1400" cy="340" r="58" fill="#5cbf55" ${O}/><circle cx="1360" cy="290" r="64" fill="#66c25a" ${O}/>` +
          apple(1290, 340) + apple(1340, 300) + apple(1384, 250) + apple(1410, 352) + apple(1336, 232) + apple(1262, 380)) +
      once(appleKeys, APPLE, apple(...APPLE)) +
      once(squirrelKeys, SQUIRREL, squirrel(...SQUIRREL, (m) => anim({ type: 'sway', angle: 10, pivot: [SQUIRREL[0] - 2, SQUIRREL[1] + 10], period: 1.1 }, m))) +
      // Doghouse and bowl
      `<path d="M1050 548l100-70l100 70z" fill="#d1495b" ${O}/>` +
      `<rect x="1066" y="546" width="168" height="116" fill="#c98b4b" ${O}/>` +
      `<path d="M1066 576h168M1066 606h168M1066 636h168" stroke="#a86f3c" stroke-width="2"/>` +
      `<path d="M1120 662v-40q30-34 60 0v40z" fill="#4a2c17" ${O}/>` +
      `<ellipse cx="1266" cy="690" rx="24" ry="9" fill="#3a86ff" ${Ow(2)}/><ellipse cx="1266" cy="686" rx="18" ry="4" fill="#1f5fd1"/>` +
      diff(1268, 680, 20, `<path d="M1254 682l26-8" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="1253" cy="679" r="3.5" fill="#fff"/><circle cx="1255" cy="685" r="3.5" fill="#fff"/><circle cx="1279" cy="671" r="3.5" fill="#fff"/><circle cx="1281" cy="677" r="3.5" fill="#fff"/>`, '') +
      anim({ type: 'path', points: [[0, 0], [10, -8], [22, 0], [12, 7]], period: 0.8 },
        anim({ type: 'path', points: [[0, 0], [30, -14], [-10, -24]], period: 5 }, fly(1250, 652, beat([1250, 648], 0.08)))) +
      anim({ type: 'path', points: [[0, 0], [34, -18], [60, 4], [26, 16]], period: 3.8 }, bee(1290, 690, beat([1291, 685], 0.12))) +
      dust +
      dog +
      crumbs +
      once(heartKeys, [dx - 40, dy - 52], `<path d="M${dx - 40} ${dy - 46}q-12-8-10-16q4-6 10 0q6-6 10 0q2 8-10 16z" fill="#ff6b8b" ${Ow(1.6)}/>`) +
      hens +
      // A butterfly lands on the sleeping dog's nose (B only)
      diff(NOSE[0], NOSE[1] - 8, 20, '',
        keys('butterfly', butterflyKeys, NOSE,
          butterfly(...NOSE, (m) => anim({ type: 'keys', period: 0.24, keys: [{ t: 0, sy: 1 }, { t: 0.12, sy: 0.25, ease: 'inOut' }], pivot: [NOSE[0], NOSE[1] - 6] }, m))),
        'butterfly',
        during(7, 9.45)) +
      frontTrees +
      // Bushes in front
      `<path d="M0 900q30-60 90-40q40-50 90 0q50-20 60 40z" fill="#4c9a3f" ${O}/>` +
      `<path d="M1180 900q30-60 90-40q40-50 90 0q50-20 80 40z" fill="#4c9a3f" ${O}/>` +
      // Butterflies over the yard
      anim({ type: 'path', points: [[0, 0], [90, -50], [190, -10], [140, 50], [40, 40]], period: 13 },
        anim({ type: 'bob', dx: 0, dy: 6, period: 0.7 }, butterflyAt(600, 700, ['#ff6fb5', '#ffd23f'], beat([600, 700], 0.3, 0, 'sx')))) +
      anim({ type: 'path', points: [[0, 0], [-80, -40], [-150, 20], [-50, 50]], period: 11, reverse: true },
        anim({ type: 'bob', dx: 0, dy: 5, period: 0.6 }, butterflyAt(1000, 780, ['#b38cff', '#4dabf7'], beat([1000, 780], 0.26, 0.4, 'sx'))))
    )
  },
})
