// Cartoon "The snowman's nose" (docs/cartoon-mode.md), the second one, made like 812: a 20 s winter story told by a
// camera. A hare hops up to the snowman, leaps and snatches its carrot nose; the dog on the porch wakes and gives
// chase, runs smack into the snowman — it rocks, its head and hat fly off ahead and plop into the snow — and is
// thrown back, dazed under circling stars, while the hare settles on the headless snowman crunching the carrot.
// Ten differences: two hard (a missing icicle, the wreath's bow), three events of the story.
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { birchTree, groundShadow, INK, keenOwl, NATURE_DEFS, O, Ow, pineTree, swingKeys } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900
/** The yard's snow: things stand on it here (a little lower further forward). */
const GROUND = 722

const WIDE = { x: 60, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // The snowman; the hare hops up, sniffs, snatches the nose.
  { t: 3, x: 520, y: 400, w: 520 },
  { t: 7.4, x: 545, y: 410, w: 480, ease: 'step' },
  // The porch: the dog wakes.
  { t: 7.45, x: 240, y: 500, w: 340, ease: 'step' },
  // The chase; drawing back for the crash, so the head is seen flying off.
  { t: 9.6, x: 440, y: 430, w: 520 },
  { t: 12.2, x: 450, y: 400, w: 560, ease: 'inOut' },
  { t: 13, x: 440, y: 330, w: 640 },
  { t: 13.8, x: 445, y: 335, w: 630, ease: 'step' },
  // The hat lands.
  { t: 13.85, x: 790, y: 560, w: 280, ease: 'step' },
  // The hare on the headless snowman, the dog dazed.
  { t: 15.4, x: 400, y: 350, w: 640 },
  { t: 19.95, x: 420, y: 360, w: 610, ease: 'step' },
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

/**
 * Hops from where the keys before left off to (x, y) between `from` and `to`: n arcs `height` high. `flip`: the
 * scale x while hopping (−1 for one drawn facing left that hops right).
 */
function hops(start: [number, number], end: [number, number], from: number, to: number, n: number, height: number, sx?: number): Keyframe[] {
  const keys: Keyframe[] = []
  for (let i = 1; i <= n; i++) {
    const t0 = from + ((to - from) * (i - 1)) / n
    const t1 = from + ((to - from) * i) / n
    const f = i / n
    const x = start[0] + (end[0] - start[0]) * f
    const y = start[1] + (end[1] - start[1]) * f
    const xm = start[0] + (end[0] - start[0]) * (f - 0.5 / n)
    const ym = start[1] + (end[1] - start[1]) * (f - 0.5 / n)
    keys.push({ t: round(t0 + (t1 - t0) / 2), x: round(xm), y: round(ym - height), sy: 1.08, ...(sx !== undefined && { sx }), ease: 'in' })
    keys.push({ t: round(t1), x: round(x), y: round(y), sy: 0.9, ease: 'out' })
  }
  return keys
}
const round = (n: number) => Math.round(n * 100) / 100

/** The hare sits by the bushes; its moves (offsets from there) through the story. */
const HARE: [number, number] = [1120, 720]
const hareKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, sx: 1, sy: 1 },
  { t: 3.4, ease: 'out' },
  ...hops([0, 0], [-270, 2], 3.4, 5.8, 4, 26),
  { t: 6, sy: 1, ease: 'inOut' },
  // Sniffs, then the leap for the carrot.
  { t: 6.5, sy: 0.85, ease: 'out' },
  { t: 6.82, x: -318, y: -244, sy: 1.12, ease: 'in' },
  { t: 7.4, x: -420, y: 2, sy: 0.9, ease: 'out' },
  { t: 7.6, sy: 1, ease: 'inOut' },
  // Off to the front of the snowman, then zig-zagging away from the dog.
  ...hops([-420, 2], [-560, 40], 7.6, 9.6, 3, 18),
  { t: 9.7, sx: -1, ease: 'inOut' },
  ...hops([-560, 40], [-220, 50], 9.8, 12.6, 5, 28, -1),
  ...hops([-220, 50], [-60, 70], 12.6, 14.6, 2, 20, -1),
  { t: 14.8, sx: 1, ease: 'inOut' },
  // Up onto the headless snowman.
  { t: 15.4, sx: 1, sy: 0.85, ease: 'out' },
  { t: 15.75, x: -250, y: -330, sy: 1.12, ease: 'in' },
  { t: 16.1, x: -360, y: -223, sy: 0.9, ease: 'out' },
  { t: 16.3, sy: 1 },
  { t: 19.95, ease: 'step' },
]

/** The dog sleeps on the porch mat. */
const DOG: [number, number] = [380, 652]
const dogKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, sx: 1, sy: 1, rot: 0 },
  { t: 7.7, ease: 'out' },
  { t: 7.9, sy: 0.88, ease: 'out' },
  { t: 8.1, sy: 1.06, ease: 'inOut' },
  { t: 8.25, sy: 1 },
  { t: 8.6, sx: -1, ease: 'inOut' },
  // Off the porch and after the hare.
  { t: 9.1, x: 90, y: 70, ease: 'inOut' },
  { t: 12.4, x: 250, y: 70, ease: 'in' },
  // Smack into the snowman: squashed against it…
  { t: 12.5, x: 256, sx: -0.82, sy: 0.86, ease: 'out' },
  // …thrown back through the air…
  { t: 12.62, sx: -1, sy: 1, ease: 'out' },
  { t: 12.85, x: 200, y: 22, rot: 34, ease: 'in' },
  // …and down in the snow, dazed.
  { t: 13.1, x: 170, y: 70, rot: 0, sy: 0.84, ease: 'out' },
  { t: 13.3, sy: 1 },
  { t: 19.95, ease: 'step' },
]
const DOG_RUNS: [number, number][] = [[9.1, 12.4]]
/** The dog lies dazed from here on. */
const DAZED = 13.1
/** The snowman rocks when the dog hits it, round the foot of its bottom ball. */
const snowmanWobble: Keyframe[] = [
  { t: 0, rot: 0 },
  { t: 12.45, ease: 'out' },
  { t: 12.6, rot: 7, ease: 'inOut' },
  { t: 12.85, rot: -5, ease: 'inOut' },
  { t: 13.1, rot: 2.5, ease: 'inOut' },
  { t: 13.35, rot: 0 },
]

/** The snowman's head and hat: knocked off by the dog. */
const HEAD: [number, number] = [760, 462]
const headKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, rot: 0, sy: 1 },
  // Rocked with the snowman, then flung off ahead.
  { t: 12.45, ease: 'out' },
  { t: 12.6, x: 8, y: 2, rot: 8, ease: 'out' },
  { t: 12.9, x: 70, y: -100, rot: 150, ease: 'in' },
  { t: 13.3, x: 120, y: 228, rot: 330, sy: 0.82, ease: 'out' },
  // A bounce in the snow.
  { t: 13.48, y: 208, sy: 1, ease: 'in' },
  { t: 13.66, y: 228, rot: 360, sy: 0.9, ease: 'out' },
  { t: 13.8, sy: 1 },
  { t: 19.95, ease: 'step' },
]
const HAT: [number, number] = [760, 418]
/** Where the hat comes down, crown first. */
const HAT_DOWN: [number, number] = [1000, 700]
const hatKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, rot: 0 },
  { t: 12.45, ease: 'out' },
  { t: 12.6, x: 10, y: 4, rot: 8, ease: 'out' },
  { t: 13.1, x: 150, y: -170, rot: 200, ease: 'in' },
  { t: 13.8, x: HAT_DOWN[0] - HAT[0], y: HAT_DOWN[1] - HAT[1], rot: 180, ease: 'out' },
  { t: 13.95, y: HAT_DOWN[1] - HAT[1] - 8, ease: 'in' },
  { t: 14.1, y: HAT_DOWN[1] - HAT[1] },
  { t: 19.95, ease: 'step' },
]
/** In B a crow lands on the snowman's stick arm after the crash and stays (an easy one to catch). */
const CROW: [number, number] = [644, 506]
const crowKeys: Keyframe[] = [
  { t: 0, x: -220, y: -200, rot: 0, o: 0, ease: 'step' },
  { t: 15.3, o: 1, ease: 'out' },
  { t: 15.95, x: 0, y: 0, ease: 'out' },
  { t: 17.2, ease: 'inOut' },
  { t: 17.4, rot: 14, ease: 'inOut' },
  { t: 17.6, rot: 0 },
  { t: 18.6, ease: 'inOut' },
  { t: 18.8, rot: 14, ease: 'inOut' },
  { t: 19, rot: 0 },
  { t: 19.9, ease: 'step' },
  { t: 19.95, o: 0 },
]

export default svgLevel({
  id: 802,
  chapter: 'cartoon',
  title: 'cartoonSnowman',
  parTimeSec: 100,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const beat = (pivot: [number, number], every: number, phase = 0) => (m: string) =>
      anim({ type: 'keys', period: every, phase, keys: [{ t: 0, sy: 1 }, { t: every / 2, sy: 0.3, ease: 'inOut' }], pivot }, m)
    const crown = (period: number, angle = 1.5) => (pivot: [number, number], m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 11) / 11 }, m)
    /** A fir with snow on its tiers. */
    const snowyFir = (x: number, y: number, s: number) =>
      pineTree(x, y, s, crown(4.6)) +
      `<path d="M${x - 22 * s} ${y - 112 * s}q22 -10 44 0q-22 6-44 0zM${x - 30 * s} ${y - 72 * s}q30-12 60 0q-30 7-60 0zM${x - 40 * s} ${y - 32 * s}q40-14 80 0q-40 8-80 0z" fill="#f6fbff" ${Ow(1.4)}/>`

    // Snowfall: flakes drifting down all over the world, the same in both pictures.
    let snow = ''
    for (let i = 0; i < 46; i++) {
      const sx = Math.round(rand() * W)
      const sy = Math.round(-20 - rand() * 60)
      const r = 2 + Math.round(rand() * 2.5)
      snow += anim(
        { type: 'path', points: [[0, 0], [30 + rand() * 40, H + 80]], period: 9 + rand() * 7, phase: rand() },
        anim({ type: 'bob', dx: 8, dy: 0, period: 2.4 + rand() * 1.5, phase: rand() }, `<circle cx="${sx}" cy="${sy}" r="${r}" fill="#fff" fill-opacity="0.92"/>`),
      )
    }

    // The cabin: logs, a roof deep in snow with a row of icicles (in B one is missing: a hard one).
    let icicles = ''
    for (let x = 116; x <= 500; x += 24) {
      const h = 18 + Math.round(rand() * 14)
      const icicle = `<path d="M${x - 5} 432l5 ${h}l5-${h}z" fill="#dff3ff" ${Ow(1.2)}/>`
      icicles += x === 332 ? diff(332, 448, 20, icicle, '') : icicle
    }
    let logs = ''
    for (let y = 452; y < 652; y += 22) logs += `<path d="M96 ${y}h428" stroke="#6b4321" stroke-opacity="0.6" stroke-width="2"/><circle cx="96" cy="${y + 11}" r="9" fill="#d9a66a" ${Ow(1.4)}/><circle cx="524" cy="${y + 11}" r="9" fill="#d9a66a" ${Ow(1.4)}/>`
    const smoke = [0, 1 / 3, 2 / 3]
      .map((phase) =>
        anim({ type: 'keys', period: 3.8, phase, keys: [{ t: 0, x: 0, y: 0, sx: 0.5, sy: 0.5, o: 0.85 }, { t: 3.5, x: 30, y: -100, sx: 1.8, sy: 1.8, o: 0, ease: 'out' }], pivot: [420, 300] },
          `<circle cx="420" cy="300" r="13" fill="#eef2f5"/><circle cx="430" cy="290" r="10" fill="#eef2f5"/>`),
      )
      .join('')
    const cabin =
      groundShadow(320, 662, 250, 18) +
      smoke +
      `<rect x="404" y="300" width="32" height="80" fill="#8f3d2d" ${O}/><path d="M398 300h44v-10q-22-10-44 0z" fill="#f6fbff" ${Ow(1.8)}/>` +
      `<rect x="96" y="440" width="428" height="214" fill="url(#c4-logs)" ${O}/>` +
      logs +
      `<path d="M70 450L310 300L550 450z" fill="#7a4a32" ${O}/>` +
      `<path d="M62 452q8-18 30-20L310 296l218 136q22 2 30 20q-20 8-40-2q-10 10-30 2q-12 10-30 0q-14 8-28 0L310 330L130 452q-16 8-32 0q-18 8-36 0z" fill="url(#c4-snowcap)" ${O}/>` +
      icicles +
      // Window, warm inside.
      `<rect x="330" y="486" width="110" height="80" fill="url(#c4-lit)" ${O}/><path d="M385 486v80M330 526h110" stroke="${INK}" stroke-width="3"/>` +
      `<path d="M324 566h122v10H324z" fill="#f6fbff" ${Ow(1.6)}/>` +
      anim({ type: 'keys', period: 2.6, keys: [{ t: 0, o: 0.25 }, { t: 1.3, o: 0.45, ease: 'inOut' }], pivot: [385, 526] }, `<ellipse cx="385" cy="590" rx="80" ry="20" fill="#ffd27a"/>`) +
      // Door with a wreath (its bow in A only: a hard one).
      `<rect x="156" y="520" width="80" height="134" rx="4" fill="url(#c4-door)" ${O}/><circle cx="224" cy="590" r="4" fill="#ffd23f" ${Ow(1)}/>` +
      `<circle cx="196" cy="548" r="16" fill="none" stroke="#2f7a3a" stroke-width="9"/><circle cx="196" cy="548" r="16" fill="none" stroke="${INK}" stroke-width="1.6" stroke-dasharray="3 4"/>` +
      `<circle cx="186" cy="536" r="2.6" fill="#e63946"/><circle cx="208" cy="542" r="2.6" fill="#e63946"/><circle cx="200" cy="532" r="2.2" fill="#e63946"/>` +
      diff(196, 566, 18, `<path d="M196 564l-11-7v14zM196 564l11-7v14z" fill="#d1453b" ${Ow(1.4)}/><circle cx="196" cy="564" r="3" fill="#a1302a" ${Ow(1)}/>`, '') +
      // Lantern, glowing.
      `<path d="M262 540v-12" stroke="${INK}" stroke-width="2.4"/><rect x="254" y="540" width="16" height="22" rx="3" fill="#ffd27a" ${Ow(1.6)}/>` +
      anim({ type: 'keys', period: 1.8, keys: [{ t: 0, sx: 1, sy: 1, o: 0.35 }, { t: 0.9, sx: 1.15, sy: 1.15, o: 0.55, ease: 'inOut' }], pivot: [262, 551] }, `<circle cx="262" cy="551" r="22" fill="#ffd27a"/>`) +
      // Porch: boards, steps, a mat.
      `<rect x="250" y="640" width="240" height="14" fill="url(#c4-wood)" ${Ow(1.8)}/><rect x="300" y="654" width="140" height="10" fill="url(#c4-wood)" ${Ow(1.6)}/>` +
      `<rect x="330" y="664" width="80" height="10" fill="url(#c4-wood)" ${Ow(1.4)}/><path d="M254 640q60-8 120 0q60-6 112 0" fill="none" stroke="#f6fbff" stroke-width="5" stroke-linecap="round"/>` +
      `<ellipse cx="380" cy="648" rx="54" ry="6" fill="#b8402e" ${Ow(1.4)}/>`

    // The dog: asleep on the mat, then up and running (legs swing), then dazed under circling stars.
    const [dx, dy] = DOG
    const fur = 'url(#c4-fur)'
    const lying =
      anim({ type: 'bob', dx: 0, dy: -1.4, period: 2.6 },
        `<path d="M${dx + 50} ${dy - 14}q22 2 18-16" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${dx + 50} ${dy - 14}q22 2 18-16" fill="none" stroke="#c98f52" stroke-width="5" stroke-linecap="round"/>` +
          `<ellipse cx="${dx + 8}" cy="${dy - 16}" rx="46" ry="16" fill="${fur}" ${O}/><ellipse cx="${dx - 50}" cy="${dy - 3}" rx="11" ry="5" fill="${fur}" ${Ow(2)}/><ellipse cx="${dx - 30}" cy="${dy - 3}" rx="11" ry="5" fill="${fur}" ${Ow(2)}/>` +
          `<circle cx="${dx - 42}" cy="${dy - 20}" r="17" fill="${fur}" ${O}/><ellipse cx="${dx - 58}" cy="${dy - 13}" rx="11" ry="7.5" fill="#f3d3a8" ${Ow(2)}/><circle cx="${dx - 66}" cy="${dy - 16}" r="3.6" fill="${INK}"/>` +
          `<path d="M${dx - 34} ${dy - 34}q14 0 10 26q-10-6-10-26z" fill="#7a4a24" ${Ow(2)}/>` +
          // Shut eyes while asleep; dizzy crosses when dazed.
          once(hiddenKeys(DAZED, 19.95), DOG, `<path d="M${dx - 48} ${dy - 24}q4 3 8 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`) +
          once(shownKeys(DAZED, 19.95), DOG, `<path d="M${dx - 50} ${dy - 28}l8 8M${dx - 42} ${dy - 28}l-8 8" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>`)) +
      once(hiddenKeys(7.7, 19.95), DOG, anim({ type: 'keys', period: 2.4, keys: [{ t: 0, x: 0, y: 0, o: 0 }, { t: 0.4, o: 1 }, { t: 2, x: 14, y: -34, o: 0 }], pivot: [dx - 40, dy - 46] },
        `<path d="M${dx - 44} ${dy - 50}h8l-8 8h8" fill="none" stroke="#5a6b8a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`)) +
      // Stars circling the dazed dog's head.
      once(shownKeys(DAZED, 19.95), DOG, anim({ type: 'rotate', pivot: [dx - 42, dy - 46], period: 1.6 },
        [0, 120, 240].map((a) => {
          const r = (a * Math.PI) / 180
          const sx = dx - 42 + Math.cos(r) * 24
          const sy = dy - 46 + Math.sin(r) * 8
          return `<path d="M${sx} ${sy - 7}l2 5l5 2l-5 2l-2 5l-2-5l-5-2l5-2z" fill="#ffd23f" ${Ow(1)}/>`
        }).join('')))
    const leg = (x: number, color: string, k: Keyframe[]) =>
      keys(undefined, k, [x, dy - 22], `<rect x="${x - 5}" y="${dy - 24}" width="10" height="24" rx="5" fill="${color}" ${Ow(2.2)}/>`)
    const flipRot = (k: Keyframe[]) => k.map((f) => ({ ...f, rot: f.rot === undefined ? undefined : -f.rot }))
    const legsA = swingKeys(DOG_RUNS, 0.16, 30)
    const legsB = swingKeys(DOG_RUNS, 0.16, 30, true)
    const standing =
      anim({ type: 'sway', angle: 22, pivot: [dx + 36, dy - 42], period: 0.5 },
        `<path d="M${dx + 36} ${dy - 42}q18-6 20-26" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${dx + 36} ${dy - 42}q18-6 20-26" fill="none" stroke="#c98f52" stroke-width="5" stroke-linecap="round"/>`) +
      leg(dx - 22, '#a8743f', legsB) +
      leg(dx + 26, '#a8743f', flipRot(legsB)) +
      `<ellipse cx="${dx}" cy="${dy - 36}" rx="40" ry="17" fill="${fur}" ${O}/>` +
      leg(dx - 30, '#c98f52', legsA) +
      leg(dx + 32, '#c98f52', flipRot(legsA)) +
      `<path d="M${dx - 34} ${dy - 44}q6 10 14 12" fill="none" stroke="#3a86ff" stroke-width="5" stroke-linecap="round"/>` +
      `<circle cx="${dx - 40}" cy="${dy - 60}" r="18" fill="${fur}" ${O}/><ellipse cx="${dx - 58}" cy="${dy - 53}" rx="12" ry="8" fill="#f3d3a8" ${Ow(2)}/>` +
      `<circle cx="${dx - 67}" cy="${dy - 56}" r="3.8" fill="${INK}"/><circle cx="${dx - 45}" cy="${dy - 65}" r="3.2" fill="${INK}"/><circle cx="${dx - 44}" cy="${dy - 66}" r="1" fill="#fff"/>` +
      `<path d="M${dx - 60} ${dy - 47}q6 4 12 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>` +
      `<path d="M${dx - 32} ${dy - 74}q16 0 12 30q-12-8-12-30z" fill="#7a4a24" ${Ow(2)}/>` +
      // "!" as it wakes and sees the hare.
      once([{ t: 0, sx: 0.01, sy: 0.01, o: 0 }, { t: 8, ease: 'back' }, { t: 8.2, sx: 1, sy: 1, o: 1 }, { t: 8.7, ease: 'in' }, { t: 8.85, sx: 0.01, sy: 0.01, o: 0 }], [dx - 40, dy - 100],
        `<path d="M${dx - 44} ${dy - 122}h9l-2 20h-5z" fill="#e63946" ${Ow(1.8)}/><circle cx="${dx - 40}" cy="${dy - 95}" r="3.4" fill="#e63946" ${Ow(1.4)}/>`)
    const dog =
      // Its shadow stays on the snow, fainter while it is thrown.
      once([{ t: 0, x: 0, y: 0, o: 1 }, { t: 8.6, ease: 'inOut' }, { t: 9.1, x: 90, y: 70 }, { t: 12.4, x: 250, y: 70, ease: 'in' }, { t: 12.62, ease: 'out' }, { t: 12.85, x: 200, o: 0.5, ease: 'in' }, { t: 13.1, x: 170, o: 1 }, { t: 19.95, ease: 'step' }], DOG, groundShadow(dx - 4, dy + 1, 54, 8)) +
      keys('dog', dogKeys, [dx, dy - 20], once(hiddenKeys(7.75, DAZED), DOG, lying) + once(shownKeys(7.75, DAZED), DOG, standing))

    // The hare: sitting, hopping; the carrot in its mouth once snatched.
    const [ax, ay] = HARE
    const hareBody = (x: number, y: number, ears: (m: string) => string) =>
      `<circle cx="${x + 22}" cy="${y - 14}" r="7" fill="#fff" ${Ow(1.6)}/>` +
      `<ellipse cx="${x + 6}" cy="${y - 18}" rx="22" ry="18" fill="url(#c4-hare)" ${O}/>` +
      `<ellipse cx="${x - 6}" cy="${y - 3}" rx="10" ry="5" fill="#eef2f5" ${Ow(1.6)}/>` +
      ears(`<path d="M${x - 14} ${y - 40}q-8-32 2-40q8 10 4 40z" fill="#e3e8ee" ${Ow(1.6)}/><path d="M${x - 6} ${y - 40}q2-34 14-38q4 12-6 40z" fill="#e3e8ee" ${Ow(1.6)}/><path d="M${x - 10} ${y - 46}q-3-18 1-26" fill="none" stroke="#f5b8c4" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<circle cx="${x - 12}" cy="${y - 34}" r="13" fill="url(#c4-hare)" ${O}/>` +
      `<circle cx="${x - 18}" cy="${y - 37}" r="2.4" fill="${INK}"/><circle cx="${x - 24}" cy="${y - 31}" r="2" fill="#f28da0"/>` +
      `<path d="M${x - 24} ${y - 29}q2 3 5 2" fill="none" stroke="${INK}" stroke-width="1.2" stroke-linecap="round"/>`
    const carrot = (x: number, y: number, rot: number) =>
      `<g transform="rotate(${rot} ${x} ${y})"><path d="M${x} ${y - 4}l26 4l-26 4z" fill="#ff8c2a" ${Ow(1.4)}/><path d="M${x + 6} ${y - 2}v4M${x + 13} ${y - 1}v2" stroke="#c4621a" stroke-width="1.2"/></g>`
    const hare = keys(
      'hare',
      hareKeys,
      [ax, ay - 20],
      groundShadow(ax + 2, ay + 1, 26, 5) +
        hareBody(ax, ay, (m) => anim({ type: 'keys', period: 2.2, keys: [{ t: 0, rot: 0 }, { t: 1.6, ease: 'inOut' }, { t: 1.75, rot: -8, ease: 'inOut' }, { t: 1.9, rot: 0 }], pivot: [ax - 10, ay - 40] }, m)) +
        once(shownKeys(6.82, 19.95), HARE, carrot(ax - 23, ay - 29, 180)) +
        // Crunch: crumbs as it eats the carrot at the end.
        once(shownKeys(16.3, 19.9), HARE, anim({ type: 'keys', period: 0.9, keys: [{ t: 0, x: 0, y: 0, o: 0 }, { t: 0.1, o: 1 }, { t: 0.8, x: -8, y: 26, o: 0 }], pivot: [ax - 30, ay - 26] },
          `<circle cx="${ax - 30}" cy="${ay - 26}" r="2.4" fill="#ff8c2a"/><circle cx="${ax - 24}" cy="${ay - 22}" r="1.8" fill="#ff8c2a"/>`)),
    )
    // In B a second little hare peeks out of a snowdrift by the snowman.
    const peeker = diff(
      644,
      698,
      45,
      '',
      once([{ t: 0, y: 72 }, { t: 3.6, ease: 'out' }, { t: 4, y: 0 }, { t: 6, ease: 'in' }, { t: 6.4, y: 72 }], [640, 730],
        hareBody(646, 742, (m) => anim({ type: 'keys', period: 0.7, keys: [{ t: 0, rot: 0 }, { t: 0.35, rot: -10, ease: 'inOut' }], pivot: [636, 702] }, m))),
      undefined,
      during(3.6, 6.4),
    )

    // The snowman: three snowballs, a scarf (its stripes red in A, green in B), buttons (three in A, two in B),
    // stick arms; its head (carrot nose, eyes that pop) and hat get knocked off.
    const [hx, hy] = HEAD
    const head = keys(
      'snowhead',
      headKeys,
      HEAD,
      `<circle cx="${hx}" cy="${hy}" r="36" fill="url(#c4-snow)" ${O}/>` +
        once(hiddenKeys(6.82, 19.95), HEAD, carrot(hx + 10, hy + 4, 0)) +
        once([{ t: 0, sx: 1, sy: 1 }, { t: 6.7, ease: 'back' }, { t: 6.85, sx: 1.6, sy: 1.6 }, { t: 7.4, ease: 'inOut' }, { t: 7.7, sx: 1, sy: 1 }], [hx, hy - 8],
          `<circle cx="${hx - 12}" cy="${hy - 8}" r="4" fill="${INK}"/><circle cx="${hx + 12}" cy="${hy - 8}" r="4" fill="${INK}"/>`) +
        once(hiddenKeys(6.82, 7.6), HEAD, `<path d="M${hx - 14} ${hy + 14}q14 10 28 0" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round"/>`) +
        once(shownKeys(6.82, 7.6), HEAD, `<circle cx="${hx}" cy="${hy + 16}" r="5" fill="none" stroke="${INK}" stroke-width="3"/>`),
    )
    const hat = keys(
      'hat',
      hatKeys,
      HAT,
      `<rect x="${HAT[0] - 26}" y="${HAT[1] + 2}" width="52" height="8" rx="3" fill="#2b2f36" ${Ow(1.6)}/>` +
        `<rect x="${HAT[0] - 17}" y="${HAT[1] - 30}" width="34" height="34" rx="3" fill="#2b2f36" ${Ow(1.6)}/>` +
        `<rect x="${HAT[0] - 17}" y="${HAT[1] - 6}" width="34" height="7" fill="#b8402e"/>`,
    )
    // In B a little bird flies out of the fallen hat.
    const hatBird = diff(
      HAT_DOWN[0],
      HAT_DOWN[1] - 8,
      22,
      '',
      keys('hatbird', [{ t: 0, x: 0, y: 24, o: 0, ease: 'step' }, { t: 14, o: 1, ease: 'out' }, { t: 14.4, y: 0 }, { t: 14.7, ease: 'in' }, { t: 15.4, x: 20, y: -220 }, { t: 15.45, o: 0 }], [HAT_DOWN[0], HAT_DOWN[1] - 8],
        `<ellipse cx="${HAT_DOWN[0]}" cy="${HAT_DOWN[1] - 8}" rx="9" ry="7" fill="#e65a4a" ${Ow(1.4)}/><circle cx="${HAT_DOWN[0] - 7}" cy="${HAT_DOWN[1] - 15}" r="5.5" fill="#3b3f4a" ${Ow(1.2)}/>` +
          `<path d="M${HAT_DOWN[0] - 12} ${HAT_DOWN[1] - 15}l-5 1.5l5 1.5z" fill="#2b2f36"/>` +
          beat([HAT_DOWN[0] + 2, HAT_DOWN[1] - 10], 0.2)(`<path d="M${HAT_DOWN[0]} ${HAT_DOWN[1] - 10}q10-10 14 0z" fill="#3b3f4a" ${Ow(1)}/>`)),
      'hatbird',
      during(14, 15.4),
    )
    const scarf =
      `<path d="M726 494q34 14 68 0v12q-34 14-68 0z" fill="#3a86ff" ${Ow(1.8)}/><path d="M778 500l8 46h-16l-4-42z" fill="#3a86ff" ${Ow(1.8)}/>`
    const stripes = (color: string) => `<path d="M740 500v12M754 503v12M768 503v12M772 520h12M774 532h12" stroke="${color}" stroke-width="4"/>`
    const button = (y: number) => `<circle cx="760" cy="${y}" r="5" fill="${INK}"/>`
    const snowman =
      groundShadow(760, GROUND + 4, 110, 14) +
      keys(
        'snowbody',
        snowmanWobble,
        [760, GROUND],
        `<path d="M700 540l-60-30M650 515l-12-14M650 515l-16-2" fill="none" stroke="#6b4321" stroke-width="5" stroke-linecap="round"/>` +
          `<path d="M820 540l64-34M872 513l12-14M872 513l16 0" fill="none" stroke="#6b4321" stroke-width="5" stroke-linecap="round"/>` +
          `<circle cx="760" cy="655" r="70" fill="url(#c4-snow)" ${O}/>` +
          `<circle cx="760" cy="545" r="50" fill="url(#c4-snow)" ${O}/>` +
          button(530) +
          button(551) +
          diff(760, 572, 18, button(572), '', 'snowbody') +
          scarf +
          diff(762, 517, 32, stripes('#e63946'), stripes('#3fa45a'), 'snowbody'),
      ) +
      // Snow puffs off the snowman where the dog hits it.
      once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t: 12.45, o: 1, ease: 'out' }, { t: 12.9, sx: 1.4, sy: 1.4, o: 0 }], [692, 690],
        `<circle cx="682" cy="684" r="9" fill="#fff"/><circle cx="694" cy="676" r="7" fill="#fff"/><circle cx="690" cy="696" r="8" fill="#fff"/><circle cx="676" cy="700" r="5" fill="#fff"/>`) +
      head +
      hat

    // A sled by the cabin's corner, out of the dog's way (its pull rope in A only), a fence with a mitten drying on it (A only).
    const sled =
      `<g transform="translate(-440 10)">` +
      groundShadow(570, GROUND + 2, 50, 6) +
      `<path d="M520 712h100q16 0 18-14" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M520 712h100q16 0 18-14" fill="none" stroke="#9aa3ad" stroke-width="3" stroke-linecap="round"/>` +
      `<rect x="528" y="690" width="96" height="12" rx="3" fill="#d1453b" ${Ow(1.8)}/><path d="M540 702v10M610 702v10" stroke="${INK}" stroke-width="3"/>` +
      `</g>` +
      diff(82, 714, 20, `<path d="M90 706q-14-4-16 8q-2 12 14 12" fill="none" stroke="#c8b48a" stroke-width="2.6"/>`, '')
    let fence = ''
    for (let x = 990; x <= 1400; x += 26) fence += `<path d="M${x - 8} 662v-46l8-8l8 8v46z" fill="url(#c4-picket)" ${Ow(1.6)}/><path d="M${x - 8} 614q8-10 16 0z" fill="#f6fbff" ${Ow(1)}/>`
    fence =
      `<path d="M980 624H1410M980 646H1410" stroke="${INK}" stroke-width="7"/><path d="M980 624H1410M980 646H1410" stroke="#c9b48a" stroke-width="3.5"/>` +
      fence +
      diff(1068, 626, 20, `<path d="M1062 612h14v18q2 8-6 8h-6q-6 0-6-8l-4-2q-2-6 4-6v-10z" fill="#e63946" ${Ow(1.6)}/><path d="M1062 614h14" stroke="#fff" stroke-width="3"/>`, '')

    // A bare tree with bullfinches on a branch (three in A, two in B).
    const finch = (x: number, y: number) =>
      `<ellipse cx="${x}" cy="${y}" rx="9" ry="8" fill="#e65a4a" ${Ow(1.4)}/><circle cx="${x - 6}" cy="${y - 7}" r="5.5" fill="#3b3f4a" ${Ow(1.2)}/>` +
      `<path d="M${x - 11} ${y - 7}l-4 1.5l4 1.5z" fill="#2b2f36"/><path d="M${x + 2} ${y - 3}q8-4 12 4q-6 2-12-4z" fill="#3b3f4a"/><path d="M${x + 8} ${y + 3}l6 4" stroke="#3b3f4a" stroke-width="2.4"/>`
    const bareTree =
      groundShadow(1240, GROUND - 4, 60, 9) +
      `<path d="M1234 716q4-100-4-200l14 2q-6 100 4 198z" fill="url(#ke-bark)" ${O}/>` +
      `<path d="M1238 560q-40-16-70-60M1242 520q40-20 60-70M1236 600q30-10 56-4M1240 470q-10-30 4-60" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>` +
      `<path d="M1238 560q-40-16-70-60M1242 520q40-20 60-70M1236 600q30-10 56-4M1240 470q-10-30 4-60" fill="none" stroke="#8f5d2e" stroke-width="4.4" stroke-linecap="round"/>` +
      `<path d="M1170 502q-6-8 4-10q10 0 8 8zM1294 456q-6-8 4-10q10 0 8 8z" fill="#f6fbff"/>` +
      anim({ type: 'sway', angle: 2, pivot: [1190, 530], period: 3 }, finch(1196, 528)) +
      anim({ type: 'sway', angle: 2, pivot: [1210, 545], period: 3.4, phase: 0.3 }, finch(1214, 543)) +
      diff(1272, 588, 18, anim({ type: 'sway', angle: 2, pivot: [1272, 596], period: 3.1, phase: 0.6 }, finch(1272, 592)), '')

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c4-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fbfe6"/><stop offset="0.6" stop-color="#c9e2f4"/><stop offset="1" stop-color="#f1f8fd"/></linearGradient>` +
      `<radialGradient id="c4-glow"><stop offset="0" stop-color="#fff3d6" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffe8b8" stop-opacity="0.4"/><stop offset="1" stop-color="#ffe8b8" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c4-hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d5e6f3"/></linearGradient>` +
      `<linearGradient id="c4-far" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c6d9ea"/><stop offset="1" stop-color="#dde9f3"/></linearGradient>` +
      `<linearGradient id="c4-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6fbff"/><stop offset="0.6" stop-color="#e6f0f8"/><stop offset="1" stop-color="#cfdeec"/></linearGradient>` +
      `<pattern id="c4-glint" width="60" height="40" patternUnits="userSpaceOnUse"><circle cx="8" cy="10" r="1.2" fill="#fff"/><circle cx="38" cy="28" r="1" fill="#fff"/><circle cx="50" cy="6" r="0.8" fill="#bcd6ea"/></pattern>` +
      `<radialGradient id="c4-snow" cx="0.62" cy="0.3" r="0.85"><stop offset="0" stop-color="#ffffff"/><stop offset="0.6" stop-color="#eef5fb"/><stop offset="1" stop-color="#bcd3e6"/></radialGradient>` +
      `<linearGradient id="c4-snowcap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dbe9f4"/></linearGradient>` +
      `<linearGradient id="c4-logs" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a4a22"/><stop offset="0.6" stop-color="#9c6431"/><stop offset="1" stop-color="#b98048"/></linearGradient>` +
      `<linearGradient id="c4-door" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5e3a1c"/><stop offset="1" stop-color="#8f5d2e"/></linearGradient>` +
      `<linearGradient id="c4-wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8f5d2e"/><stop offset="1" stop-color="#c48f55"/></linearGradient>` +
      `<radialGradient id="c4-lit" cx="0.5" cy="0.6" r="0.8"><stop offset="0" stop-color="#ffe4a0"/><stop offset="1" stop-color="#e99a3c"/></radialGradient>` +
      `<linearGradient id="c4-picket" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b9a27a"/><stop offset="1" stop-color="#e6d7b8"/></linearGradient>` +
      `<radialGradient id="c4-fur" cx="0.6" cy="0.25" r="0.85"><stop offset="0" stop-color="#e8b67a"/><stop offset="0.55" stop-color="#c98f52"/><stop offset="1" stop-color="#8f5d2e"/></radialGradient>` +
      `<clipPath id="c4-drift"><rect x="0" y="0" width="${W}" height="740"/></clipPath>` +
      `<radialGradient id="c4-hare" cx="0.6" cy="0.25" r="0.85"><stop offset="0" stop-color="#ffffff"/><stop offset="0.6" stop-color="#e8edf2"/><stop offset="1" stop-color="#b9c4cf"/></radialGradient></defs>` +
      `<rect width="${W}" height="${H}" fill="url(#c4-sky)"/>` +
      // A low winter sun.
      `<circle cx="1230" cy="170" r="200" fill="url(#c4-glow)"/>` +
      `<circle cx="1230" cy="170" r="44" fill="#fff1c8" stroke="#f2c46a" stroke-width="3"/>` +
      `<ellipse cx="1216" cy="162" rx="4" ry="6" fill="${INK}"/><ellipse cx="1244" cy="162" rx="4" ry="6" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.8, phase: 0.2 }, `<rect x="1208" y="154" width="44" height="16" fill="#fff1c8"/><path d="M1210 163h12M1238 163h12" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`) +
      `<path d="M1214 182q16 12 32 0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
      // Far snowy hills with a wood, the near hills, the yard's snow.
      `<path d="M0 520q160-90 340-40t360-30t380 30t360-40V640H0z" fill="url(#c4-far)"/>` +
      [80, 140, 210, 600, 660, 980, 1050, 1110, 1360].map((x, i) => `<path d="M${x} 540l12-${40 + (i % 3) * 10}l12 ${40 + (i % 3) * 10}z" fill="#7f9fb6"/><path d="M${x + 6} ${520 - (i % 3) * 10}l6-${18}l6 18z" fill="#eef5fb"/>`).join('') +
      `<path d="M0 580q200-60 420-20t420-10t600-10V700H0z" fill="url(#c4-hill)"/>` +
      `<rect y="640" width="${W}" height="${H - 640}" fill="url(#c4-ground)"/>` +
      `<rect y="640" width="${W}" height="${H - 640}" fill="url(#c4-glint)"/>` +
      snowyFir(40, 640, 1.1) +
      snowyFir(620, 600, 0.75) +
      birchTree(900, 640, 0.8, crown(3.6, 1)) +
      // The game's owl on a branch of the birch, watching the chase.
      `<path d="M904 574l30 -8" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M904 574l30 -8" stroke="#8f5d2e" stroke-width="4" stroke-linecap="round"/>` +
      anim({ type: 'sway', angle: 7, pivot: [928, 568], period: 3.6 }, keenOwl(928, 568, 0.95, (m) => anim({ type: 'blink', duty: 0.07, period: 3.1, phase: 0.3 }, m))) +
      snowyFir(1390, 650, 1.05) +
      fence +
      bareTree +
      cabin +
      sled +
      // Footprints in the snow, a snowdrift by the snowman (the peeking hare hides behind it).
      [[880, 760], [910, 770], [940, 762], [970, 772], [1000, 764]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="3" fill="#bcd3e6"/>`).join('') +
      snowman +
      // The peeking hare shows only above the drift's foot.
      `<g clip-path="url(#c4-drift)">${peeker}</g>` +
      `<path d="M600 742q40-36 84 0z" fill="url(#c4-ground)" ${O}/>` +
      hatBird +
      dog +
      hare +
      // The hat lies where it falls, the head too (both drawn with the snowman; this is the snow they sink into).
      snowyFir(1300, 900, 0.9) +
      snowyFir(120, 900, 0.95) +
      // In B a crow lands on the snowman's stick arm and stays.
      diff(
        CROW[0],
        CROW[1] - 6,
        22,
        '',
        keys('crow', crowKeys, CROW,
          `<path d="M${CROW[0] + 8} ${CROW[1] - 6}l14 4l-12 4z" fill="#2b2f36" ${Ow(1.2)}/>` +
            `<ellipse cx="${CROW[0]}" cy="${CROW[1] - 8}" rx="11" ry="8" fill="#3b3f4a" ${Ow(1.4)}/>` +
            `<circle cx="${CROW[0] - 8}" cy="${CROW[1] - 16}" r="6" fill="#3b3f4a" ${Ow(1.4)}/><path d="M${CROW[0] - 14} ${CROW[1] - 17}l-7 2l7 2z" fill="#8a8f99" ${Ow(1)}/>` +
            `<circle cx="${CROW[0] - 9}" cy="${CROW[1] - 18}" r="1.4" fill="#fff"/>` +
            `<path d="M${CROW[0] - 2} ${CROW[1]}v4M${CROW[0] + 3} ${CROW[1]}v4" stroke="${INK}" stroke-width="1.6"/>` +
            anim({ type: 'keys', period: LOOP, keys: [{ t: 0, sy: 1 }, ...[15.3, 15.45, 15.6, 15.75].flatMap((t) => [{ t, sy: 0.3, ease: 'inOut' as const }, { t: t + 0.075, sy: 1, ease: 'inOut' as const }]), { t: 15.95, sy: 1 }], pivot: [CROW[0], CROW[1] - 10] },
              `<path d="M${CROW[0] - 4} ${CROW[1] - 10}q8-14 18-6q-6 8-18 6z" fill="#2b2f36" ${Ow(1.2)}/>`)),
        'crow',
        during(15.3, 19.9),
      ) +
      snow
    )
  },
})
