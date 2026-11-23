// Cartoon "Gone fishing" (docs/cartoon-mode.md), the first and free one, made like 804: a 20 s story by a lake told by
// a camera. Grandpa dozes on the jetty with his rod; a bite — he pulls with all his might while a heron tiptoes
// along the boards and steals the fish from his bucket; he lands an old boot (a frog hops out of it), turns to the
// empty bucket, sees the heron flying off with his fish and shakes the rod, boot and all. Ten differences: two hard
// (a missing board of the jetty, a missing stone on the shore), three events of the story.
import { sampleKeys } from '../../engine/keyframes.ts'
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { birchTree, butterflyAt, dragonfly, farBird, fish, frog, grassTuft, groundShadow, INK, lilyPad, NATURE_DEFS, O, Ow, pineTree, puffCloud, roundTree, swingKeys, waterLily } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900
/** The lake's surface where the jetty stands: what is under it (the line's end, the boot) is not seen. */
const WATER = 652

const WIDE = { x: 60, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // Grandpa dozing.
  { t: 3, x: 690, y: 430, w: 360 },
  { t: 5.75, x: 705, y: 445, w: 330, ease: 'step' },
  // The float: a bite!
  { t: 5.8, x: 900, y: 560, w: 240, ease: 'step' },
  // He pulls…
  { t: 7.6, x: 620, y: 360, w: 500 },
  { t: 10, x: 630, y: 370, w: 480, ease: 'step' },
  // …while the heron reaches the bucket.
  { t: 10.05, x: 540, y: 450, w: 300 },
  { t: 12.3, x: 556, y: 456, w: 280, ease: 'step' },
  // The catch: a boot.
  { t: 12.35, x: 820, y: 430, w: 340 },
  { t: 14.3, x: 830, y: 436, w: 320, ease: 'step' },
  // The empty bucket.
  { t: 14.35, x: 680, y: 430, w: 340, ease: 'step' },
  // Over the lake, the heron flies off with the fish.
  { t: 15.6, x: 520, y: 150, w: 880, ease: 'inOut' },
  { t: 17.1, x: 560, y: 110, w: 860, ease: 'step' },
  // Grandpa shakes his rod at it, boot and all.
  { t: 17.15, x: 690, y: 380, w: 420 },
  { t: 19.95, x: 700, y: 390, w: 400, ease: 'step' },
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
/** Quick back and forth of `key` between a and b every `step` s from `from` to `to`. */
function shake(from: number, to: number, step: number, field: 'rot', a: number, b: number): Keyframe[] {
  const keys: Keyframe[] = []
  let i = 0
  for (let t = from; t < to - 1e-9; t += step, i++) keys.push({ t: Math.round(t * 100) / 100, [field]: i % 2 ? b : a, ease: 'inOut' })
  return keys
}

/** Grandpa sits on the end of the jetty, facing the lake. */
const HIP: [number, number] = [812, 598]
const NECK: [number, number] = [812, 532]
const grandpaKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, rot: 0, sy: 1 },
  { t: 3, ease: 'inOut' },
  { t: 3.6, rot: 5 },
  { t: 6.5, ease: 'out' },
  // A bite: he jumps.
  { t: 6.65, rot: -2, y: -8, sy: 1.06, ease: 'in' },
  { t: 6.85, rot: -4, y: 0, sy: 1 },
  // Pulls with all his might.
  { t: 7.6, rot: -6, ease: 'inOut' },
  { t: 8.4, rot: -12, ease: 'inOut' },
  { t: 9.2, rot: -8, ease: 'inOut' },
  { t: 10, rot: -13, ease: 'inOut' },
  { t: 10.8, rot: -9, ease: 'inOut' },
  { t: 11.6, rot: -14, ease: 'inOut' },
  { t: 12.4, rot: -10, ease: 'out' },
  { t: 13, rot: -16, ease: 'inOut' },
  // A boot?!
  { t: 13.4, rot: -4, y: -6, sy: 1.06, ease: 'inOut' },
  { t: 13.7, rot: 0, y: 0, sy: 1 },
  { t: 16, ease: 'inOut' },
  // Shaking with anger.
  ...shake(16.2, 19.4, 0.2, 'rot', 3, -3),
  { t: 19.6, rot: 0 },
]
const headKeys: Keyframe[] = [
  { t: 0, rot: 0, sx: 1 },
  { t: 3.4, ease: 'inOut' },
  // Nodding off.
  { t: 3.9, rot: 12, ease: 'inOut' },
  { t: 4.5, rot: 6, ease: 'inOut' },
  { t: 5.1, rot: 13, ease: 'inOut' },
  { t: 5.7, rot: 7, ease: 'inOut' },
  { t: 6.3, rot: 13, ease: 'out' },
  { t: 6.6, rot: 0 },
  // A look back at the bucket.
  { t: 14.4, ease: 'inOut' },
  { t: 14.6, sx: -1 },
  { t: 15.6, ease: 'inOut' },
  { t: 15.8, sx: 1 },
]

/** The rod turns round the hands; its tip holds the line. */
const HANDS: [number, number] = [848, 560]
const TIP: [number, number] = [1010, 455]
const rodKeys: Keyframe[] = [
  { t: 0, rot: 0 },
  { t: 6.55, ease: 'out' },
  { t: 6.7, rot: 4, ease: 'inOut' },
  { t: 7, rot: 1, ease: 'inOut' },
  { t: 7.3, rot: 4, ease: 'inOut' },
  { t: 7.6, rot: -4, ease: 'inOut' },
  // The struggle.
  ...shake(8, 12.4, 0.4, 'rot', -12, -6),
  { t: 12.4, rot: -12, ease: 'inOut' },
  // Out it comes.
  { t: 13, rot: -32, ease: 'inOut' },
  { t: 13.3, rot: -28 },
  { t: 16, ease: 'inOut' },
  ...shake(16.2, 19.4, 0.2, 'rot', -36, -24),
  { t: 19.6, rot: -30 },
  { t: 19.95, ease: 'step' },
]
/** The float dips under at the bite. */
const DIP: Record<string, number> = { '6.7': 12, '7': 5, '7.3': 12 }
/**
 * The line hangs straight down from the rod's tip: a group of its own (clipped at the water) that follows the tip.
 * Its keys are the rod's, turned into the tip's moves.
 */
const lineKeys: Keyframe[] = (() => {
  let rot = 0
  return rodKeys.map((k) => {
    rot = k.rot ?? rot
    const a = (rot * Math.PI) / 180
    const rx = TIP[0] - HANDS[0]
    const ry = TIP[1] - HANDS[1]
    const x = HANDS[0] + rx * Math.cos(a) - ry * Math.sin(a) - TIP[0]
    const y = HANDS[1] + rx * Math.sin(a) + ry * Math.cos(a) - TIP[1] + (DIP[String(k.t)] ?? 0)
    return { t: k.t, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, ...(k.ease && { ease: k.ease }) }
  })
})()
/** The line's end hangs this far under the tip: below the surface, until he reels it in. */
const LINE = 200
/** Reeling in lifts the float (and the boot) this much, the line shortened to REELED of its length. */
const REEL = 110
const REELED = 0.45
/** The float, the hook and what hangs on it: the tip's moves, plus the reeling in. */
const hookKeys: Keyframe[] = lineKeys.map((k) => ({ ...k, y: (k.y ?? 0) + (k.t >= 13 ? -REEL : 0) }))
const reelKeys: Keyframe[] = [{ t: 0, sy: 1 }, { t: 12.4, ease: 'inOut' }, { t: 13, sy: REELED }, { t: 19.95, ease: 'step' }]

/** The heron stands in the reeds, walks onto the jetty, steals the fish and flies off over the lake. */
const HERON: [number, number] = [330, 700]
const heronKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, sy: 1 },
  { t: 5.2, ease: 'inOut' },
  { t: 7.6, x: 100, y: -94 },
  { t: 10.6, x: 360, y: -94, ease: 'out' },
  { t: 11.6, ease: 'out' },
  { t: 11.8, sy: 0.86, ease: 'out' },
  { t: 12.05, x: 400, y: -160, sy: 1.08, ease: 'inOut' },
  { t: 13.6, x: 600, y: -300, sy: 1, ease: 'inOut' },
  { t: 15.6, x: 850, y: -400 },
  { t: 17.6, x: 1200, y: -540 },
  { t: 19.95, ease: 'step' },
]
const HERON_WALKS: [number, number][] = [[5.2, 7.6], [7.6, 10.6]]

/** The boot comes out of the water with a frog in it (in B a fish): it hops out into the lake. */
const CRITTER_AT = 13.35
const lineAt = (t: number) => sampleKeys(hookKeys, t, LOOP, ['x', 'y'] as const, { x: 0, y: 0 })
const BOOT_TOP: [number, number] = (() => {
  const p = lineAt(CRITTER_AT)
  return [Math.round(TIP[0] + p.x), Math.round(TIP[1] + LINE + p.y - 4)]
})()
const critterKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, rot: 0, o: 0, ease: 'step' },
  { t: CRITTER_AT, o: 1, ease: 'out' },
  { t: CRITTER_AT + 0.45, x: 36, y: -34, rot: 20, ease: 'in' },
  { t: CRITTER_AT + 0.95, x: 70, y: WATER - BOOT_TOP[1] + 2, rot: 60 },
  { t: CRITTER_AT + 1, o: 0 },
]

/** In B a little fish leaps beside the float as it dips. */
const LEAP: [number, number] = [1052, 612]
const leapKeys: Keyframe[] = [
  { t: 0, x: -18, y: 36, rot: -50, o: 0, ease: 'step' },
  { t: 6.45, o: 1, ease: 'out' },
  { t: 6.85, x: 0, y: 0, rot: 0, ease: 'in' },
  { t: 7.25, x: 18, y: 36, rot: 50 },
  { t: 7.3, o: 0 },
]

const BUCKET: [number, number] = [735, 606]

export default svgLevel({
  id: 801,
  chapter: 'cartoon',
  title: 'cartoonFishing',
  parTimeSec: 100,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const beat = (pivot: [number, number], every: number, phase = 0, axis: 'sx' | 'sy' = 'sy') => (m: string) =>
      anim({ type: 'keys', period: every, phase, keys: [{ t: 0, [axis]: 1 }, { t: every / 2, [axis]: axis === 'sy' ? 0.3 : 0.25, ease: 'inOut' }], pivot }, m)
    const crown = (period: number, angle = 2) => (pivot: [number, number], m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 11) / 11 }, m)

    // Far shore: mountains in haze, a dark band of firs, their reflection.
    let firs = ''
    for (let x = -10; x < W + 20; x += 18 + Math.round(rand() * 10)) {
      const h = 34 + Math.round(rand() * 26)
      firs += `<path d="M${x} 560l9-${h}l9 ${h}z" fill="${rand() < 0.5 ? '#3f7a5a' : '#4a8a64'}"/>`
    }

    // Sparkles on the lake.
    let sparkles = ''
    for (let i = 0; i < 16; i++) {
      const sx = Math.round(560 + rand() * 860)
      const sy = Math.round(600 + rand() * 280)
      sparkles += anim(
        { type: 'blink', duty: 0.35, period: 1.6 + rand() * 1.4, phase: rand() },
        `<path d="M${sx - 8} ${sy}h16" stroke="#fff" stroke-opacity="0.75" stroke-width="2.4" stroke-linecap="round"/>`,
      )
    }

    // The near shore: grass, flowers, tufts; a row of stones at the water (in B one is missing: a hard one).
    const STONES: [number, number, number][] = [[296, 652, 9], [330, 662, 8], [364, 672, 10], [398, 684, 8], [428, 694, 9], [456, 708, 8], [478, 726, 10], [494, 748, 8], [504, 772, 9]]
    const stones = STONES.map(([x, y, r]) => {
      const stone = `<ellipse cx="${x}" cy="${y}" rx="${r * 1.35}" ry="${r}" fill="#b7b2a7" ${Ow(1.5)}/><path d="M${x - r * 0.6} ${y - r * 0.3}q${r * 0.5}-${r * 0.5} ${r} 0" fill="none" stroke="#fff" stroke-opacity="0.5" stroke-width="1.5"/>`
      return x === 456 ? diff(456, 708, 18, stone, '') : stone
    }).join('')
    let flowers = ''
    for (const [fx, fy, c] of [[60, 720, '#ff6b8b'], [150, 690, '#ffd23f'], [230, 760, '#b38cff'], [110, 820, '#ff9f43'], [320, 850, '#ff6b8b'], [40, 870, '#4dabf7'], [260, 700, '#ffd23f']] as [number, number, string][])
      flowers += anim(
        { type: 'sway', angle: 5, pivot: [fx, fy], period: 2.6, phase: (fx % 9) / 9 },
        `<path d="M${fx} ${fy}v-20" stroke="#3f8f3a" stroke-width="3"/>` +
          `<circle cx="${fx - 5}" cy="${fy - 22}" r="5" fill="${c}" ${Ow(1.4)}/><circle cx="${fx + 5}" cy="${fy - 22}" r="5" fill="${c}" ${Ow(1.4)}/>` +
          `<circle cx="${fx}" cy="${fy - 27}" r="5" fill="${c}" ${Ow(1.4)}/><circle cx="${fx}" cy="${fy - 17}" r="5" fill="${c}" ${Ow(1.4)}/><circle cx="${fx}" cy="${fy - 22}" r="3.6" fill="#fff3b0"/>`,
      )
    let tufts = ''
    for (let i = 0; i < 22; i++) {
      const tx = Math.round(10 + rand() * 470)
      const ty = Math.round(690 + rand() * 200)
      if (tx > 360 + (ty - 650) * 0.4) continue
      tufts += anim({ type: 'sway', angle: 7, pivot: [tx, ty], period: 2.3, phase: (tx % 13) / 13 }, grassTuft(tx, ty))
    }

    // Reeds and cattails at the shore, where the heron waits.
    let reeds = ''
    for (const [i, [rx, ry]] of ([[268, 690], [282, 700], [300, 712], [356, 724], [372, 716], [388, 730], [250, 676]] as [number, number][]).entries())
      reeds += anim(
        { type: 'sway', angle: 5, pivot: [rx, ry], period: 2.8, phase: i / 7 },
        `<path d="M${rx} ${ry}q-2-30 2-58" fill="none" stroke="#4f7a2a" stroke-width="2.6" stroke-linecap="round"/>` +
          (i % 2 ? `<rect x="${rx - 3}" y="${ry - 64}" width="7" height="18" rx="3.5" fill="#7a4a22" ${Ow(1.2)}/>` : '') +
          `<path d="M${rx} ${ry}q9-16 16-24M${rx} ${ry}q-8-14-13-20" fill="none" stroke="#5c9e45" stroke-width="2.2" stroke-linecap="round"/>`,
      )

    // The jetty: boards on posts (in B one board is missing: a hard one).
    let boards = ''
    for (let x = 410; x < 880; x += 24) {
      const board = `<rect x="${x}" y="594" width="23" height="26" fill="url(#c3-plank)" ${Ow(1.6)}/>`
      boards += x === 506 ? diff(518, 607, 18, board, '') : board
    }
    let posts = ''
    for (const px of [432, 548, 664, 780, 868]) {
      posts += `<rect x="${px - 7}" y="616" width="14" height="44" fill="url(#ke-bark)" ${Ow(1.8)}/>`
      posts += anim({ type: 'keys', period: 2.6, phase: (px % 7) / 7, keys: [{ t: 0, sx: 0.5, sy: 0.5, o: 0.9 }, { t: 2.3, sx: 1.4, sy: 1.4, o: 0, ease: 'out' }], pivot: [px, 660] },
        `<ellipse cx="${px}" cy="660" rx="16" ry="4" fill="none" stroke="#fff" stroke-width="1.6"/>`)
    }

    // Grandpa.
    const [hx, hy] = HIP
    const [nx, ny] = NECK
    const leg = (dx: number, color: string) =>
      `<path d="M${hx - 6 + dx} ${hy - 2}L${hx + 30 + dx} ${hy + 6}L${hx + 34 + dx} ${hy + 46}" fill="none" stroke="${INK}" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="M${hx - 6 + dx} ${hy - 2}L${hx + 30 + dx} ${hy + 6}L${hx + 34 + dx} ${hy + 46}" fill="none" stroke="${color}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="M${hx + 26 + dx} ${hy + 46}h18q8 0 8 8h-28z" fill="#5a3a22" ${Ow(1.8)}/>`
    const head = keys(
      undefined,
      headKeys,
      NECK,
      `<rect x="${nx - 6}" y="${ny - 8}" width="12" height="14" fill="#f2c09a" ${Ow(1.6)}/>` +
        `<circle cx="${nx}" cy="${ny - 24}" r="22" fill="url(#c3-skin)" ${O}/>` +
        `<ellipse cx="${nx - 19}" cy="${ny - 22}" rx="5" ry="7" fill="#f2b38e" ${Ow(1.6)}/>` +
        // Beard and moustache.
        `<path d="M${nx - 16} ${ny - 18}q2 26 18 26q16 0 20-24q-6 6-20 6t-18-8z" fill="#f4f4f6" ${Ow(1.8)}/>` +
        `<path d="M${nx + 6} ${ny - 14}q8-6 16 0q-8 4-16 0z" fill="#e6e6ea" ${Ow(1.4)}/>` +
        `<ellipse cx="${nx + 22}" cy="${ny - 20}" rx="7" ry="6" fill="#e9a07a" ${Ow(1.6)}/>` +
        // Eyes: open, or shut while he dozes.
        once(hiddenKeys(3.4, 6.6), NECK, `<circle cx="${nx + 11}" cy="${ny - 29}" r="2.6" fill="${INK}"/><circle cx="${nx + 12}" cy="${ny - 30}" r="0.8" fill="#fff"/>`) +
        once(shownKeys(3.4, 6.6), NECK, `<path d="M${nx + 7} ${ny - 29}q4 3 8 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`) +
        // Brows: angry at the end.
        once(hiddenKeys(15.8, 19.8), NECK, `<path d="M${nx + 5} ${ny - 36}q6-3 12 0" fill="none" stroke="#d8d8dc" stroke-width="3" stroke-linecap="round"/>`) +
        once(shownKeys(15.8, 19.8), NECK, `<path d="M${nx + 4} ${ny - 39}l13 5" stroke="#d8d8dc" stroke-width="3.4" stroke-linecap="round"/>`) +
        // Mouth: a smile; open at the bite and at the boot; a scowl at the end.
        once(hiddenKeys(6.6, 7.4), NECK, once(hiddenKeys(13.3, 14.1), NECK, once(hiddenKeys(15.8, 19.8), NECK, `<path d="M${nx + 9} ${ny - 9}q5 3 9-1" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`))) +
        once(shownKeys(6.6, 7.4), NECK, `<ellipse cx="${nx + 14}" cy="${ny - 9}" rx="3.4" ry="4.2" fill="#7a2b2b" ${Ow(1.2)}/>`) +
        once(shownKeys(13.3, 14.1), NECK, `<ellipse cx="${nx + 14}" cy="${ny - 9}" rx="3.4" ry="4.2" fill="#7a2b2b" ${Ow(1.2)}/>`) +
        once(shownKeys(15.8, 19.8), NECK, `<path d="M${nx + 9} ${ny - 7}q5-4 10 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`) +
        // Straw hat, a fly lure on its band (A only).
        `<ellipse cx="${nx}" cy="${ny - 44}" rx="36" ry="7" fill="#e8c46a" ${Ow(1.8)}/>` +
        `<path d="M${nx - 18} ${ny - 44}q-2-20 18-22q20 2 18 22z" fill="#efcf7a" ${Ow(1.8)}/>` +
        `<path d="M${nx - 18} ${ny - 50}q18 4 36 0v6q-18 4-36 0z" fill="#b8402e"/>` +
        `<path d="M${nx - 10} ${ny - 60}q8-4 16-2M${nx - 14} ${ny - 54}q12-4 26-2" fill="none" stroke="#c79a3c" stroke-width="1.2"/>` +
        // A fly lure stuck on top of the hat (A only), in its middle: it stays put as he turns his head.
        diff(
          nx,
          ny - 70,
          25,
          `<path d="M${nx - 4} ${ny - 66}l3-14l4 13z" fill="#36a3d9" ${Ow(1)}/><path d="M${nx} ${ny - 67}l7-10l1 10z" fill="#ffd23f" ${Ow(1)}/><circle cx="${nx}" cy="${ny - 65}" r="2.6" fill="#e63946" ${Ow(0.8)}/>`,
          '',
          'grandpa',
        ),
    )
    const grandpa = keys(
      'grandpa',
      grandpaKeys,
      HIP,
      leg(-6, '#3d4a66') +
        leg(0, '#4a5a7a') +
        `<path d="M${hx - 22} ${hy + 2}q-4-40 10-60h28q16 24 12 60z" fill="url(#c3-vest)" ${O}/>` +
        `<path d="M${hx - 2} ${hy - 58}l10 16l10-16" fill="#e8d8b0" ${Ow(1.6)}/>` +
        `<circle cx="${hx + 8}" cy="${hy - 30}" r="2" fill="#2f3b1a"/><circle cx="${hx + 8}" cy="${hy - 18}" r="2" fill="#2f3b1a"/>` +
        `<path d="M${hx + 14} ${hy - 50}q20 2 22 12" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>` +
        `<path d="M${hx + 14} ${hy - 50}q20 2 22 12" fill="none" stroke="#e8d8b0" stroke-width="8" stroke-linecap="round"/>` +
        head +
        // Z-z-z while he dozes.
        once(shownKeys(3.6, 6.5), [nx, ny], anim({ type: 'keys', period: 1.4, keys: [{ t: 0, x: 0, y: 0, o: 0 }, { t: 0.3, o: 1 }, { t: 1.2, x: 14, y: -30, o: 0 }], pivot: [nx + 30, ny - 60] },
          `<path d="M${nx + 28} ${ny - 64}h8l-8 8h8" fill="none" stroke="#5a6b8a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`)) +
        // "!" at the empty bucket.
        once([{ t: 0, sx: 0.01, sy: 0.01, o: 0 }, { t: 14.6, ease: 'back' }, { t: 14.8, sx: 1, sy: 1, o: 1 }, { t: 15.5, ease: 'in' }, { t: 15.7, sx: 0.01, sy: 0.01, o: 0 }], [nx - 6, ny - 80],
          `<path d="M${nx - 10} ${ny - 108}h9l-2 22h-5z" fill="#e63946" ${Ow(1.8)}/><circle cx="${nx - 6}" cy="${ny - 79}" r="3.6" fill="#e63946" ${Ow(1.4)}/>`),
    )

    // The rod, the hands on it; the line (clipped at the water) with its float — and later the boot.
    const rod = keys(
      'rod',
      rodKeys,
      HANDS,
      `<path d="M832 574L${TIP[0]} ${TIP[1]}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>` +
        `<path d="M832 574L${TIP[0]} ${TIP[1]}" stroke="#a8743f" stroke-width="3" stroke-linecap="round"/>` +
        `<circle cx="842" cy="568" r="6" fill="#9aa3ad" ${Ow(1.6)}/>` +
        `<circle cx="${HANDS[0]}" cy="${HANDS[1]}" r="7" fill="#f2c09a" ${Ow(1.6)}/><circle cx="${HANDS[0] - 12}" cy="${HANDS[1] + 8}" r="7" fill="#f2c09a" ${Ow(1.6)}/>`,
    )
    const [tx, ty] = TIP
    const boot =
      `<path d="M${tx - 9} ${ty + LINE}h18v30q0 6 6 7l16 3q8 2 8 10h-48v-12z" fill="#6b4a2f" ${Ow(2)}/>` +
      `<path d="M${tx - 9} ${ty + LINE + 2}h18" stroke="#4a3220" stroke-width="3"/><path d="M${tx - 10} ${ty + LINE + 48}h48" stroke="#3a2618" stroke-width="3"/>` +
      anim({ type: 'keys', period: 0.9, keys: [{ t: 0, y: 0, o: 0 }, { t: 0.2, o: 1 }, { t: 0.8, y: 26, o: 0 }], pivot: [tx + 30, ty + LINE + 44] },
        `<path d="M${tx + 30} ${ty + LINE + 44}q3 5 0 8q-3-3 0-8z" fill="#8fd8ff" ${Ow(1)}/>`)
    const line =
      once(lineKeys, TIP, once(reelKeys, TIP, `<path d="M${tx} ${ty}V${ty + LINE}" stroke="#f4f4f4" stroke-width="1.4"/>`)) +
      keys(
        'line',
        hookKeys,
        TIP,
        `<path d="M${tx - 6} ${ty + LINE - 9}a6 6 0 0 1 12 0z" fill="#e63946" ${Ow(1.4)}/><path d="M${tx - 6} ${ty + LINE - 9}a6 6 0 0 0 12 0z" fill="#fff" ${Ow(1.4)}/>` +
          once(shownKeys(12.3, 19.95), [tx, ty + LINE], boot) +
          // In B water squirts from the boot as he shakes it.
          diff(
            tx + 50,
            ty + LINE + 56,
            26,
            '',
            once(shownKeys(17.4, 19.5), [tx + 40, ty + LINE + 48], anim({ type: 'blink', duty: 0.7, period: 0.2 },
              `<path d="M${tx + 38} ${ty + LINE + 46}q14 2 20 22" fill="none" stroke="#8fd8ff" stroke-width="4" stroke-linecap="round"/><circle cx="${tx + 60}" cy="${ty + LINE + 70}" r="3" fill="#8fd8ff"/>`)),
            'line',
            during(17.4, 19.5),
          ),
      )

    // The heron: standing and walking (legs swing), then flying with the fish.
    const [ex, ey] = HERON
    const heronLeg = (dx: number, k: Keyframe[]) =>
      keys(undefined, k, [ex + dx, ey - 60], `<path d="M${ex + dx} ${ey - 60}L${ex + dx - 4} ${ey - 30}L${ex + dx} ${ey}" fill="none" stroke="#4d5866" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M${ex + dx - 6} ${ey}h14" stroke="#4d5866" stroke-width="2.4" stroke-linecap="round"/>`)
    const heronFish = (x: number, y: number) => fish(x, y, 0.5, '#ff9f43')
    const standing =
      heronLeg(-6, swingKeys(HERON_WALKS, 0.3, 18)) +
      heronLeg(6, swingKeys(HERON_WALKS, 0.3, 18, true)) +
      `<path d="M${ex - 28} ${ey - 70}l-14 10l16 2z" fill="#8f9cab" ${Ow(1.6)}/>` +
      `<ellipse cx="${ex}" cy="${ey - 70}" rx="28" ry="15" fill="url(#c3-heron)" ${O}/>` +
      `<path d="M${ex - 18} ${ey - 76}q18-8 34 2q-16 10-34-2z" fill="#8f9cab" ${Ow(1.4)}/>` +
      keys(undefined, [{ t: 0, rot: 0 }, { t: 10.9, ease: 'inOut' }, { t: 11.3, rot: 105, ease: 'inOut' }, { t: 11.6, rot: 0 }], [ex + 18, ey - 78],
        `<path d="M${ex + 18} ${ey - 78}q16-10 2-26q-10-14 8-24" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>` +
          `<path d="M${ex + 18} ${ey - 78}q16-10 2-26q-10-14 8-24" fill="none" stroke="#eef2f6" stroke-width="6" stroke-linecap="round"/>` +
          `<circle cx="${ex + 30}" cy="${ey - 130}" r="9" fill="#eef2f6" ${Ow(1.8)}/>` +
          `<path d="M${ex + 24} ${ey - 137}q-14-4-20 4" fill="none" stroke="#2b2f36" stroke-width="3" stroke-linecap="round"/>` +
          `<path d="M${ex + 37} ${ey - 132}l30 4l-30 3z" fill="#f2a93b" ${Ow(1.2)}/>` +
          `<circle cx="${ex + 32}" cy="${ey - 132}" r="1.8" fill="${INK}"/>` +
          once(shownKeys(11.4, 12.05), [ex + 66, ey - 128], heronFish(ex + 62, ey - 126)))
    const flying =
      `<path d="M${ex - 30} ${ey - 72}l-30 6M${ex - 30} ${ey - 68}l-30 10" stroke="#4d5866" stroke-width="3" stroke-linecap="round"/>` +
      beat([ex, ey - 74], 0.5)(`<path d="M${ex - 10} ${ey - 76}q-6-46 26-56q-2 34-4 56z" fill="#a9b6c4" ${Ow(1.6)}/>`) +
      `<ellipse cx="${ex}" cy="${ey - 72}" rx="30" ry="12" fill="url(#c3-heron)" ${O}/>` +
      `<path d="M${ex + 24} ${ey - 76}q16-8 22 2" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${ex + 24} ${ey - 76}q16-8 22 2" fill="none" stroke="#eef2f6" stroke-width="5" stroke-linecap="round"/>` +
      `<circle cx="${ex + 50}" cy="${ey - 72}" r="8" fill="#eef2f6" ${Ow(1.6)}/><path d="M${ex + 56} ${ey - 73}l26 3l-26 3z" fill="#f2a93b" ${Ow(1.2)}/>` +
      `<circle cx="${ex + 52}" cy="${ey - 74}" r="1.6" fill="${INK}"/>` +
      heronFish(ex + 78, ey - 68)
    const heron = keys('heron', heronKeys, [ex, ey - 50], once(hiddenKeys(12.05, 19.99), HERON, standing) + once(shownKeys(12.05, 19.99), HERON, flying))

    // Ducks crossing the lake: the mother and her ducklings (in B one fewer).
    const duck = (x: number, y: number) =>
      `<path d="M${x - 18} ${y}q-2-14 14-14h10q10 0 12 8l-4 6z" fill="#8a6a4a" ${Ow(1.6)}/>` +
      `<circle cx="${x + 10}" cy="${y - 20}" r="8" fill="#2f7a4a" ${Ow(1.6)}/><path d="M${x + 17} ${y - 20}l8 2l-8 3z" fill="#f2a93b" ${Ow(1)}/><circle cx="${x + 12}" cy="${y - 22}" r="1.4" fill="${INK}"/>`
    const duckling = (x: number, y: number) =>
      `<ellipse cx="${x}" cy="${y - 5}" rx="8" ry="5" fill="#ffd84a" ${Ow(1.3)}/><circle cx="${x + 6}" cy="${y - 11}" r="4" fill="#ffd84a" ${Ow(1.3)}/><path d="M${x + 9} ${y - 11}l4 1l-4 2z" fill="#f2a93b"/>`
    const swim = (phase: number, m: string, id?: string) =>
      anim({ type: 'path', points: [[0, 0], [-300, 10]], period: LOOP, phase, flipX: 1180, ...(id && { id }) }, anim({ type: 'bob', dx: 0, dy: 1.5, period: 1.6, phase }, m))
    const ducks =
      swim(0, duck(1180, 772)) +
      swim(-0.025, duckling(1180, 772)) +
      swim(-0.05, duckling(1180, 772)) +
      diff(1180, 762, 18, swim(-0.075, duckling(1180, 772), 'duckling3'), '', 'duckling3')

    // A rowboat tied to the jetty, rocking (an oar in it in A only).
    const boat = anim(
      { type: 'keys', period: 3.2, keys: [{ t: 0, y: 0, rot: 0 }, { t: 1.6, y: 2.5, rot: 1.5, ease: 'inOut' }], pivot: [560, 690], id: 'boat' },
      `<path d="M494 676q66 20 140 0l-10 22q-60 14-120 0z" fill="url(#c3-boat)" ${O}/>` +
        `<path d="M498 680q62 16 132 0" fill="none" stroke="#f4e3c0" stroke-width="3"/>` +
        diff(574, 670, 33, `<path d="M548 682l42-14" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M548 682l42-14" stroke="#c99358" stroke-width="3" stroke-linecap="round"/><path d="M586 666l14-6l3 8z" fill="#c99358" ${Ow(1.4)}/>`, '', 'boat') +
        `<path d="M548 682v-8h24v8" fill="none" stroke="#8a5a2b" stroke-width="4"/>`,
    )

    // On the boards: the tackle box (its lid red in A, blue in B), a flask, the bucket with the fish's tail.
    const tackle =
      groundShadow(640, 606, 22, 3) +
      `<rect x="623" y="588" width="34" height="18" rx="2" fill="#5f8f80" ${Ow(1.8)}/>` +
      diff(640, 588, 18, `<rect x="621" y="582" width="38" height="8" rx="2" fill="#d1453b" ${Ow(1.6)}/>`, `<rect x="621" y="582" width="38" height="8" rx="2" fill="#3a86ff" ${Ow(1.6)}/>`) +
      `<rect x="634" y="584" width="12" height="4" rx="1" fill="#f2c94c"/>` +
      groundShadow(674, 606, 10, 2.5) +
      `<rect x="668" y="580" width="12" height="26" rx="4" fill="#3a86ff" ${Ow(1.6)}/><rect x="667" y="576" width="14" height="6" rx="2" fill="#c8ced6" ${Ow(1.2)}/>`
    const [bx, by] = BUCKET
    const bucket =
      groundShadow(bx, by, 20, 3) +
      once(hiddenKeys(11.4, 19.99), BUCKET, `<path d="M${bx + 2} ${by - 28}l8-14l2 8l6-4l-4 12z" fill="#ff9f43" ${Ow(1.4)}/>`) +
      `<path d="M${bx - 14} ${by - 28}h28l-3 28h-22z" fill="url(#c3-metal)" ${Ow(1.8)}/>` +
      `<path d="M${bx - 14} ${by - 20}h28" stroke="#8a96a3" stroke-width="2"/>` +
      diff(bx, by - 36, 22, `<path d="M${bx - 14} ${by - 28}q14-24 28 0" fill="none" stroke="${INK}" stroke-width="2.4"/>`, '')

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c3-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fa8e8"/><stop offset="0.6" stop-color="#a4d9f7"/><stop offset="1" stop-color="#e9f7ff"/></linearGradient>` +
      `<radialGradient id="c3-glow"><stop offset="0" stop-color="#fff6c9" stop-opacity="0.95"/><stop offset="0.35" stop-color="#fff2b0" stop-opacity="0.45"/><stop offset="1" stop-color="#fff2b0" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c3-mount" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fb0c8"/><stop offset="1" stop-color="#b9d4dc"/></linearGradient>` +
      `<linearGradient id="c3-haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef8ff" stop-opacity="0"/><stop offset="1" stop-color="#eef8ff" stop-opacity="0.5"/></linearGradient>` +
      `<linearGradient id="c3-lake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd0ee"/><stop offset="0.45" stop-color="#4fa6d4"/><stop offset="1" stop-color="#2a74a6"/></linearGradient>` +
      `<linearGradient id="c3-grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ad874"/><stop offset="0.5" stop-color="#76c055"/><stop offset="1" stop-color="#4f9a3c"/></linearGradient>` +
      `<pattern id="c3-blades" width="46" height="26" patternUnits="userSpaceOnUse"><path d="M6 20l2-7M10 21l-1-6M28 9l2-6M33 10l-1-5M40 24l1-6" stroke="#3f8a33" stroke-opacity="0.35" stroke-width="1.6" stroke-linecap="round"/></pattern>` +
      `<linearGradient id="c3-plank" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3b77d"/><stop offset="0.4" stop-color="#c48f55"/><stop offset="1" stop-color="#8f5d2e"/></linearGradient>` +
      `<linearGradient id="c3-boat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e05a43"/><stop offset="1" stop-color="#9e2f24"/></linearGradient>` +
      `<linearGradient id="c3-metal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8f9aa6"/><stop offset="0.6" stop-color="#c8d0d8"/><stop offset="1" stop-color="#e6ebf0"/></linearGradient>` +
      `<linearGradient id="c3-vest" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4c6b26"/><stop offset="0.6" stop-color="#6b8f3a"/><stop offset="1" stop-color="#86a84f"/></linearGradient>` +
      `<radialGradient id="c3-skin" cx="0.62" cy="0.3" r="0.8"><stop offset="0" stop-color="#ffe0c6"/><stop offset="1" stop-color="#e9a982"/></radialGradient>` +
      `<radialGradient id="c3-heron" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#e9eef3"/><stop offset="0.6" stop-color="#b7c4d2"/><stop offset="1" stop-color="#7d8b9a"/></radialGradient>` +
      `<radialGradient id="c3-sunlight" cx="0.87" cy="0.13" r="1"><stop offset="0" stop-color="#fff3c4" stop-opacity="0.35"/><stop offset="0.5" stop-color="#fff3c4" stop-opacity="0.08"/><stop offset="1" stop-color="#fff3c4" stop-opacity="0"/></radialGradient>` +
      `<clipPath id="c3-above"><rect x="0" y="0" width="${W}" height="${WATER}"/></clipPath></defs>` +
      `<rect width="${W}" height="${H}" fill="url(#c3-sky)"/>` +
      // Sun, clouds, a flock.
      `<circle cx="1250" cy="120" r="190" fill="url(#c3-glow)"/>` +
      anim({ type: 'rotate', pivot: [1250, 120], period: 40 },
        `<path d="M1250 50v-16M1250 190v-16M1180 120h-16M1336 120h-16M1200 70l-11-11M1311 181l-11-11M1200 170l-11 11M1311 59l-11 11" stroke="#ffd23f" stroke-width="7" stroke-linecap="round"/>`) +
      `<circle cx="1250" cy="120" r="48" fill="#ffd23f" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="1234" cy="112" rx="4.5" ry="7" fill="${INK}"/><ellipse cx="1266" cy="112" rx="4.5" ry="7" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.6, phase: 0.3 }, `<rect x="1226" y="103" width="48" height="18" fill="#ffd23f"/><path d="M1228 113h12M1260 113h12" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<path d="M1230 134q20 16 40 0" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>` +
      `<circle cx="1220" cy="130" r="6" fill="#ff9f43" fill-opacity="0.6"/><circle cx="1280" cy="130" r="6" fill="#ff9f43" fill-opacity="0.6"/>` +
      anim({ type: 'path', points: [[0, 0], [160, 0]], period: 34 }, puffCloud(220, 90, 1.1)) +
      anim({ type: 'path', points: [[0, 0], [-140, 0]], period: 30 }, puffCloud(760, 160, 0.9)) +
      anim({ type: 'path', points: [[0, 0], [120, 0]], period: 26 }, puffCloud(1020, 70, 0.7)) +
      keys(undefined, [{ t: 0, x: 0 }, { t: 19.9, x: -1700 }], [1500, 230],
        ([[1500, 230], [1526, 214], [1528, 246]] as [number, number][]).map(([fx, fy], i) => farBird(fx, fy, beat([fx, fy - 2], 0.5, i * 0.25))).join('')) +
      // Mountains in haze, the far shore's firs, the lake.
      `<path d="M0 520l120-120l80 60l140-150l120 110l90-70l160 150l120-100l140 120l110-90l150 120l110-60V560H0z" fill="url(#c3-mount)"/>` +
      `<path d="M330 312l30 38l-24-6zM580 360l26 32l-22-6zM980 350l24 30l-20-4z" fill="#fff" fill-opacity="0.85"/>` +
      `<rect y="420" width="${W}" height="140" fill="url(#c3-haze)"/>` +
      firs +
      `<rect y="556" width="${W}" height="${H - 556}" fill="url(#c3-lake)"/>` +
      `<rect y="556" width="${W}" height="26" fill="#2f6a4c" fill-opacity="0.28"/>` +
      `<path d="M0 590h1440M0 620h1440" stroke="#fff" stroke-opacity="0.12" stroke-width="2"/>` +
      sparkles +
      // Lily pads on the lake.
      lilyPad(1240, 700, 1.1) + lilyPad(1300, 724, 0.9) + waterLily(1300, 720) + lilyPad(980, 820, 1) +
      // The near shore.
      `<path d="M0 596q200 14 360 54q110 32 150 110q24 70 10 140H0z" fill="url(#c3-grass)" ${O}/>` +
      `<path d="M0 596q200 14 360 54q110 32 150 110q24 70 10 140H0z" fill="url(#c3-blades)"/>` +
      stones +
      pineTree(70, 650, 1.0, crown(4.4, 1.5)) +
      birchTree(170, 640, 0.9, crown(3.6, 3)) +
      flowers +
      tufts +
      reeds +
      // The jetty, the boat by it, the things on its boards.
      posts +
      groundShadow(640, 622, 240, 10) +
      boards +
      `<path d="M410 594h470" stroke="#f3d6a6" stroke-width="2"/>` +
      boat +
      `<path d="M548 664q-30-10-90-50" fill="none" stroke="#c8b48a" stroke-width="2"/>` +
      tackle +
      bucket +
      heron +
      grandpa +
      rod +
      `<g clip-path="url(#c3-above)">${line}</g>` +
      // The boot's critter (A: a frog, B: a fish) and the fish leaping beside the float (B only).
      diff(
        BOOT_TOP[0],
        BOOT_TOP[1] - 12,
        28,
        keys('critter', critterKeys, BOOT_TOP, frog(BOOT_TOP[0], BOOT_TOP[1])),
        keys('critter', critterKeys, BOOT_TOP, fish(BOOT_TOP[0], BOOT_TOP[1] - 8, 0.7)),
        'critter',
        during(CRITTER_AT, CRITTER_AT + 1),
      ) +
      diff(LEAP[0], LEAP[1], 22, '', keys('leap', leapKeys, LEAP, fish(LEAP[0], LEAP[1], 0.6)), 'leap', during(6.45, 7.3)) +
      // Rings where the float sits, and where the boot breaks the surface.
      anim({ type: 'keys', period: 2.4, keys: [{ t: 0, sx: 0.4, sy: 0.4, o: 0.8 }, { t: 2.2, sx: 1.6, sy: 1.6, o: 0, ease: 'out' }], pivot: [TIP[0], WATER - 2] },
        `<ellipse cx="${TIP[0]}" cy="${WATER - 2}" rx="18" ry="4.5" fill="none" stroke="#fff" stroke-width="1.8"/>`) +
      ducks +
      anim({ type: 'keys', period: 6, keys: [{ t: 0, x: 0, y: 0 }, { t: 1.2, ease: 'inOut' }, { t: 1.5, x: -60, y: -8 }, { t: 2.8, ease: 'inOut' }, { t: 3.1, x: -24, y: -36 }, { t: 4.6, ease: 'inOut' }, { t: 4.9, x: 0, y: 0 }], pivot: [1160, 600] },
        anim({ type: 'bob', dx: 0, dy: 3, period: 0.9 }, dragonfly(1160, 600, beat([1160, 594], 0.1)))) +
      roundTree(1400, 900, 0.8, 'url(#ke-leaf)', crown(4.2)) +
      anim({ type: 'path', points: [[0, 0], [90, -50], [190, -10], [140, 50], [40, 40]], period: 13 },
        anim({ type: 'bob', dx: 0, dy: 6, period: 0.7 }, butterflyAt(140, 760, ['#ff6fb5', '#ffd23f'], beat([140, 760], 0.3, 0, 'sx')))) +
      `<rect width="${W}" height="${H}" fill="url(#c3-sunlight)"/>`
    )
  },
})
