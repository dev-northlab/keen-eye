// Cartoon "The windmill ride" (docs/cartoon-mode.md), made like 812: a 20 s story among Dutch tulip fields told by a
// camera. A tabby cat chases a butterfly through the tulip rows and leaps after it onto the lowest sail of a windmill —
// the sail carries it up and round and round, faster and faster; dizzy, upside down at the top, it lets go and flies
// over the canal into the storks' nest on a stepped gable. The stork glares and clacks its beak; the cat bumps down the
// gable's steps into a cart of tulips and pops out with a tulip on its head. Twelve differences: two hard (a bar of a
// sail's lattice, a spoke of the cart's wheel), three events of B (a sparrow riding the sails, a stork chick peeping out
// of the nest, a fish snapping at a fly in the canal).
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { butterflyAt, farBird, groundShadow, INK, keenOwl, NATURE_DEFS, O, Ow, puffCloud, swingKeys } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // The cat chases a butterfly through the tulip rows to the windmill.
  { t: 1.6, x: 40, y: 560, w: 480, ease: 'inOut' },
  { t: 4.4, x: 250, y: 540, w: 480, ease: 'step' },
  // The leap — and the ride, round and round.
  { t: 4.45, x: 160, y: 215, w: 720, ease: 'linear' },
  { t: 9, x: 170, y: 220, w: 700, ease: 'step' },
  // Let go at the top: over the canal.
  { t: 9.05, x: 400, y: 160, w: 720, ease: 'inOut' },
  { t: 10.1, x: 700, y: 220, w: 720, ease: 'step' },
  // In the storks' nest.
  { t: 10.15, x: 840, y: 340, w: 380, ease: 'linear' },
  { t: 12, x: 846, y: 342, w: 374, ease: 'step' },
  // Down the gable's steps into the cart.
  { t: 12.05, x: 740, y: 440, w: 520, ease: 'step' },
  // A tulip on its head, by the canal.
  { t: 13.3, x: 640, y: 560, w: 440, ease: 'linear' },
  { t: 19.95, x: 650, y: 565, w: 425, ease: 'step' },
]

/** Shown in these intervals, hidden the rest of the loop (cuts between drawings). */
function showIn(...spans: [number, number][]): Keyframe[] {
  const keys: Keyframe[] = [{ t: 0, o: spans[0][0] === 0 ? 1 : 0, ease: 'step' }]
  for (const [from, to] of spans) {
    if (from > 0) keys.push({ t: from, o: 1, ease: 'step' })
    if (to < LOOP) keys.push({ t: to, o: 0, ease: 'step' })
  }
  return keys
}

/** The windmill's hub; its sails turn about it. Sail 0 points down at rest; the cat boards it at 5 s (pointing down
 * again) and lets go at 9 s, when it points straight up. */
const HUB: [number, number] = [480, 445]
const BOARD = 5
const RELEASE = 9
const sailKeys: Keyframe[] = [
  { t: 0, rot: 0, ease: 'linear' },
  { t: BOARD, rot: 360, ease: 'inOut' },
  { t: RELEASE, rot: 900, ease: 'linear' },
  { t: 19.95, rot: 1080, ease: 'step' },
]

/** The canal's banks: x of its left and right edge at height y (narrow far off, wide in front). */
const canalLeft = (y: number) => Math.round(700 - ((y - 470) * 90) / 430)
const canalRight = (y: number) => Math.round(740 + ((y - 470) * 130) / 430)

/** The cat's feet at the start, in the tulip rows. */
const CAT0: [number, number] = [150, 784]
const RUN: [number, number] = [1.6, 4.45]
/** Where it clings to sail 0 (rest frame), the centre of its body. */
const CLING: [number, number] = [480, 630]
/** The flying cat's centre when it lets go (sail 0 straight up) and where it lands in the nest. */
const FLY0: [number, number] = [480, 255]
/** The storks' nest on top of the stepped gable; the cat sits in it. */
const NEST: [number, number] = [1010, 486]
const NEST_CAT: [number, number] = [986, 484]
/** The tulip cart on the canal's right bank. */
const CART: [number, number] = [895, 738]

export default svgLevel({
  id: 821,
  chapter: 'cartoon',
  title: 'cartoonWindmill',
  parTimeSec: 120,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const beat = (pivot: [number, number], every: number, phase = 0) => (m: string) =>
      anim({ type: 'keys', period: every, phase, keys: [{ t: 0, sy: 1 }, { t: every / 2, sy: 0.3, ease: 'inOut' }], pivot }, m)
    const blink = (period: number, phase = 0) => (m: string) => anim({ type: 'blink', duty: 0.07, period, phase }, m)
    const flap = (pivot: [number, number], phase: number) => (m: string) =>
      anim({ type: 'keys', period: 0.3, phase, keys: [{ t: 0, sx: 1 }, { t: 0.15, sx: 0.3, ease: 'inOut' }], pivot }, m)
    const star = (x: number, y: number, r = 7) => {
      let d = ''
      for (let i = 0; i < 10; i++) {
        const a = (i * Math.PI) / 5 - Math.PI / 2
        const rr = i % 2 ? r * 0.45 : r
        d += `${i ? 'L' : 'M'}${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`
      }
      return `<path d="${d}z" fill="#ffd23f" ${Ow(1)}/>`
    }
    /** Three stars circling above (x, y). */
    const dizzy = (x: number, y: number) =>
      anim({ type: 'rotate', pivot: [x, y], period: 1.1 }, [0, 120, 240].map((a) => `<g transform="rotate(${a} ${x} ${y})">${star(x, y - 16)}</g>`).join(''))
    const spiral = (x: number, y: number) =>
      `<path d="M${x} ${y}m-1 0a1 1 0 1 1 2 0a2.4 2.4 0 1 1-4.8 0a3.6 3.6 0 1 1 7.2 0" fill="none" stroke="${INK}" stroke-width="1.5"/>`
    /** A comic starburst centred on (x, y). */
    const burstStar = (x: number, y: number, r: number, fill: string) => {
      let d = ''
      for (let i = 0; i < 16; i++) {
        const a = (i * Math.PI) / 8
        const rr = i % 2 ? r * 0.5 : r
        d += `${i ? 'L' : 'M'}${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`
      }
      return `<path d="${d}z" fill="${fill}" ${Ow(1.8)}/>`
    }
    /** A tulip standing on (x, y): stem, two leaves, a cup of three petals. */
    const tulipHead = (x: number, y: number, c: string) =>
      `<path d="M${x - 7} ${y - 30}q-1-12 4-14q3 8 3 14zM${x + 7} ${y - 30}q1-12-4-14q-3 8-3 14z" fill="${c}" ${Ow(1.2)}/>` +
      `<path d="M${x - 4} ${y - 30}q0-14 4-17q4 3 4 17z" fill="${c}" ${Ow(1.2)}/><path d="M${x - 6} ${y - 30}q6 4 12 0" fill="none" stroke="#000" stroke-opacity="0.15" stroke-width="2"/>`
    const tulipStem = (x: number, y: number) =>
      `<path d="M${x} ${y}v-30" stroke="#3f8f3a" stroke-width="2.6"/><path d="M${x} ${y - 4}q-9-6-8-18q6 4 8 12M${x} ${y - 6}q8-6 8-16q-6 4-8 10" fill="#4caf50" ${Ow(0.9)}/>`
    const tulip = (x: number, y: number, c: string) => tulipStem(x, y) + tulipHead(x, y, c)
    const ROW_COLORS = ['#e63946', '#ffd23f', '#ff7eb6', '#f77f00', '#9b5de5', '#e63946', '#ff9f1c']
    /** A row of tulips at y from x0 to x1, swaying a little in the wind. */
    const row = (y: number, x0: number, x1: number, c: string, skip?: (x: number) => boolean) => {
      let m = `<path d="M${x0 - 6} ${y + 2}H${x1 + 6}" stroke="#6b4a2a" stroke-opacity="0.35" stroke-width="6" stroke-linecap="round"/>`
      for (let x = x0; x <= x1; x += 24) if (!skip?.(x)) m += tulip(x + ((y * 7) % 11) - 5, y, c)
      return anim({ type: 'sway', angle: 2.5, pivot: [(x0 + x1) / 2, y], period: 3.4, phase: (y % 7) / 7 }, m)
    }

    // --- Sky, sun, clouds, far windmills and poplars, the striped far fields, the meadow with cows. ---
    let poplars = ''
    for (let i = 0; i < 24; i++) {
      const px = Math.round(i * 62 + rand() * 20)
      if (px > 660 && px < 790) continue
      const h = Math.round(40 + rand() * 18)
      poplars += `<ellipse cx="${px}" cy="${470 - h / 2}" rx="${Math.round(h / 6)}" ry="${Math.round(h / 2)}" fill="#5f8f5a" fill-opacity="0.85"/>`
    }
    const farMill = (x: number, s: number, phase: number) =>
      `<path d="M${x - 8 * s} 472l${3 * s}-${34 * s}h${10 * s}l${3 * s} ${34 * s}z" fill="#8a7a6a"/>` +
      anim({ type: 'rotate', pivot: [x, 436], period: 9, phase },
        `<path d="M${x} ${436 - 26 * s}v${52 * s}M${x - 26 * s} 436h${52 * s}" stroke="#6b5a4a" stroke-width="${3 * s}"/>`)
    let stripes = ''
    const bands = [472, 480, 490, 502, 516, 532, 550, 570, 592]
    for (let i = 0; i < bands.length - 1; i++) {
      const [y0, y1] = [bands[i], bands[i + 1]]
      const c = ['#e63946', '#8fca5a', '#ffd23f', '#8fca5a', '#ff7eb6', '#8fca5a', '#9b5de5', '#8fca5a'][i]
      stripes += `<path d="M0 ${y0}H${canalLeft(y0)}L${canalLeft(y1)} ${y1}H0z" fill="${c}"/>`
    }
    const cow = (x: number, y: number, phase: number) =>
      `<ellipse cx="${x}" cy="${y - 12}" rx="18" ry="10" fill="#fff" ${Ow(1.4)}/><path d="M${x - 8} ${y - 18}q6-4 10 2q-2 6-8 4zM${x + 6} ${y - 10}q6-2 8 4q-6 2-8-4z" fill="#2b2b3a"/>` +
      `<path d="M${x - 12} ${y - 4}v6M${x - 4} ${y - 4}v6M${x + 6} ${y - 4}v6M${x + 12} ${y - 4}v6" stroke="${INK}" stroke-width="2.4"/>` +
      anim({ type: 'keys', period: 4, phase, keys: [{ t: 0, rot: 0 }, { t: 1.6, ease: 'inOut' }, { t: 2, rot: 30 }, { t: 3.4, ease: 'inOut' }, { t: 3.8, rot: 0 }], pivot: [x - 16, y - 14] },
        `<ellipse cx="${x - 22}" cy="${y - 12}" rx="7" ry="6" fill="#fff" ${Ow(1.3)}/><ellipse cx="${x - 26}" cy="${y - 10}" rx="4" ry="3" fill="#ffc2c2"/>`)
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c21-sky)"/>` +
      `<circle cx="1250" cy="140" r="190" fill="url(#c21-glow)"/>` +
      `<circle cx="1250" cy="140" r="44" fill="#ffd56a" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="1236" cy="132" rx="4.5" ry="7" fill="${INK}"/><ellipse cx="1264" cy="132" rx="4.5" ry="7" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.4, phase: 0.3 }, `<rect x="1226" y="124" width="48" height="18" fill="#ffd56a"/><path d="M1228 133h12M1258 133h12" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<path d="M1232 154q18 14 36 0" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>` +
      anim({ type: 'path', points: [[0, 0], [160, 0]], period: 34 }, puffCloud(200, 110, 1)) +
      anim({ type: 'path', points: [[0, 0], [-120, 0]], period: 28 }, puffCloud(820, 150, 0.85)) +
      anim({ type: 'path', points: [[0, 0], [90, 0]], period: 24 }, puffCloud(1060, 260, 0.6)) +
      keys(undefined, [{ t: 0, x: 0, y: 0 }, { t: 19.9, x: -1600, y: 30 }], [1480, 300],
        ([[1480, 300], [1504, 288], [1506, 312]] as [number, number][]).map(([fx, fy], i) => farBird(fx, fy, beat([fx, fy - 2], 0.5, i * 0.2))).join('')) +
      `<rect y="466" width="${W}" height="${H - 466}" fill="url(#c21-ground)"/>` +
      poplars + farMill(150, 1, 0) + farMill(1360, 0.9, 0.4) + farMill(300, 0.7, 0.7) +
      stripes +
      `<path d="M${canalRight(472)} 472H${W}V600H${canalRight(600)}z" fill="#9fd06a"/>` +
      cow(1220, 560, 0) + cow(1310, 575, 0.5) + cow(1150, 585, 1.2)

    // --- The canal: water, stone banks, a white drawbridge, a barge, ducks; in B a fish snaps at a fly. ---
    const canal =
      `<path d="M${canalLeft(470)} 470H${canalRight(470)}L${canalRight(900)} 900H${canalLeft(900)}z" fill="url(#c21-water)"/>` +
      `<path d="M${canalLeft(470)} 470L${canalLeft(900)} 900M${canalRight(470)} 470L${canalRight(900)} 900" stroke="#8a8478" stroke-width="7"/><path d="M${canalLeft(470)} 470L${canalLeft(900)} 900M${canalRight(470)} 470L${canalRight(900)} 900" stroke="#bdb6a6" stroke-width="3"/>` +
      anim({ type: 'keys', period: 3, keys: [{ t: 0, x: 0 }, { t: 1.5, x: 8, ease: 'inOut' }] },
        `<path d="M706 520h20M690 600h40M680 690h50M664 790h70M650 870h80" stroke="#fff" stroke-opacity="0.55" stroke-width="2.6" stroke-linecap="round"/>`)
    const BY = 622
    const bridge =
      `<rect x="${canalLeft(BY) - 8}" y="${BY - 6}" width="${canalRight(BY) - canalLeft(BY) + 16}" height="10" fill="#f4f1e8" ${Ow(1.8)}/>` +
      `<path d="M${canalLeft(BY) + 6} ${BY - 6}l14-46l14 46M${canalRight(BY) - 34} ${BY - 6}l14-46l14 46M${canalLeft(BY) + 20} ${BY - 52}H${canalRight(BY) - 20}" fill="none" stroke="${INK}" stroke-width="6"/>` +
      `<path d="M${canalLeft(BY) + 6} ${BY - 6}l14-46l14 46M${canalRight(BY) - 34} ${BY - 6}l14-46l14 46M${canalLeft(BY) + 20} ${BY - 52}H${canalRight(BY) - 20}" fill="none" stroke="#f4f1e8" stroke-width="3"/>` +
      `<path d="M${canalLeft(BY) + 20} ${BY - 52}l-10 46M${canalRight(BY) - 20} ${BY - 52}l10 46" stroke="${INK}" stroke-width="1.4"/>`
    const barge = anim({ type: 'keys', period: 2.6, keys: [{ t: 0, y: 0, rot: 0 }, { t: 1.3, y: 2, rot: 1.5, ease: 'inOut' }], pivot: [730, 724] },
      groundShadow(730, 730, 70, 5) +
        `<path d="M664 708h134q-6 22-24 22h-88q-18 0-22-22z" fill="#2f6f8f" ${Ow(1.8)}/><path d="M666 714h130" stroke="#f4f1e8" stroke-width="3"/>` +
        `<rect x="700" y="688" width="54" height="20" fill="#c0392b" ${Ow(1.6)}/><rect x="708" y="693" width="10" height="9" fill="#bfe3f2" ${Ow(1)}/><rect x="736" y="693" width="10" height="9" fill="#bfe3f2" ${Ow(1)}/>` +
        `<path d="M698 688h58" stroke="${INK}" stroke-width="3"/>` + tulip(770, 708, '#ff7eb6') + tulip(780, 708, '#ffd23f'))
    const duck = (x: number, y: number, s: number) =>
      `<path d="M${x + 10 * s} ${y - 6 * s}l${6 * s}-${4 * s}v${8 * s}z" fill="#8a6a4a" ${Ow(1)}/><ellipse cx="${x}" cy="${y - 5 * s}" rx="${12 * s}" ry="${6 * s}" fill="#a88a6a" ${Ow(1.2)}/>` +
      `<circle cx="${x - 9 * s}" cy="${y - 13 * s}" r="${5 * s}" fill="#2f7a4a" ${Ow(1.2)}/><path d="M${x - 14 * s} ${y - 13 * s}l-${5 * s} 1l${5 * s} 2z" fill="#f2b33a" ${Ow(0.8)}/>`
    const ducks = anim({ type: 'path', points: [[0, 0], [-30, 40], [10, 70]], period: 16 }, duck(720, 560, 0.8) + duck(744, 572, 0.6))
    // A fly hovering over the water (both pictures); in B a fish leaps out and snaps at it.
    const FLY: [number, number] = [762, 770]
    const hoverFly = anim({ type: 'path', points: [[0, 0], [8, -6], [16, 2], [6, 6]], period: 1.6 },
      `<circle cx="${FLY[0]}" cy="${FLY[1]}" r="3" fill="#33384a"/>` + anim({ type: 'keys', period: 0.1, keys: [{ t: 0, sy: 1 }, { t: 0.05, sy: 0.4 }], pivot: [FLY[0], FLY[1] - 3] },
        `<ellipse cx="${FLY[0] - 2}" cy="${FLY[1] - 5}" rx="2.4" ry="4" fill="#fff" fill-opacity="0.85" ${Ow(0.7)}/><ellipse cx="${FLY[0] + 2}" cy="${FLY[1] - 5}" rx="2.4" ry="4" fill="#fff" fill-opacity="0.85" ${Ow(0.7)}/>`))
    const FISH: [number, number] = [756, 792]
    const [fx, fy] = FISH
    const fishMarkup =
      `<path d="M${fx - 18} ${fy}l-10-7v14z" fill="#f2a93b" ${Ow(1.2)}/><ellipse cx="${fx}" cy="${fy}" rx="18" ry="8" fill="#f2a93b" ${Ow(1.5)}/>` +
      `<path d="M${fx - 6} ${fy - 7}l6-6l4 6" fill="#e07a2a" ${Ow(1)}/><circle cx="${fx + 10}" cy="${fy - 2}" r="2" fill="${INK}"/>` +
      `<path d="M${fx + 18} ${fy - 2}l6-4M${fx + 18} ${fy + 2}l6 4" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`
    const fishJump = diff(fx - 2, fy - 4, 34, '',
      keys('fish', [{ t: 0, x: -20, y: 30, rot: -50, o: 0, ease: 'step' }, { t: 14, o: 1, ease: 'out' }, { t: 14.5, x: 0, y: -6, rot: -20, ease: 'inOut' }, { t: 15.6, x: 4, y: -8, rot: 0, ease: 'in' }, { t: 16.4, x: 20, y: 30, rot: 50, o: 1, ease: 'step' }, { t: 16.45, o: 0, ease: 'step' }], FISH, fishMarkup),
      'fish', during(14, 16.45))
    const fishRings = once(showIn([14, 14.6], [16.3, 16.9]), [fx, fy + 4],
      anim({ type: 'keys', period: 0.6, keys: [{ t: 0, sx: 0.4, sy: 0.4, o: 1 }, { t: 0.6, sx: 1.5, sy: 1.5, o: 0 }], pivot: [fx, fy + 4] }, `<ellipse cx="${fx}" cy="${fy + 4}" rx="20" ry="5" fill="none" stroke="#fff" stroke-width="2"/>`))

    // --- The tulip fields: rows behind the cat's furrow, the windmill and the house; rows in front of them. In the near
    // field a watering can (A only), a wooden clog (a flower painted on it in A), a tulip red in A, yellow in B. ---
    const left = (y: number) => canalLeft(y) - 14
    const right = (y: number) => canalRight(y) + 14
    const yard = (x: number) => x < 1110
    const backRows =
      row(626, 10, left(626), ROW_COLORS[0]) + row(626, right(626), 1430, ROW_COLORS[1], yard) +
      row(664, 10, left(664), ROW_COLORS[1]) + row(664, right(664), 1430, ROW_COLORS[2], yard) +
      row(702, 10, left(702), ROW_COLORS[2]) + row(702, right(702), 1430, ROW_COLORS[3], yard) +
      row(742, 10, left(742), ROW_COLORS[3]) + row(742, right(742), 1430, ROW_COLORS[4], yard)
    const FRONT_Y = 858
    const RED_TULIP: [number, number] = [334, FRONT_Y]
    const frontRows =
      row(812, 10, left(812), ROW_COLORS[4]) + row(812, right(812), 1430, ROW_COLORS[5], yard) +
      anim({ type: 'sway', angle: 2.5, pivot: [300, FRONT_Y], period: 3.4, phase: 0.2 },
        [10, 34, 58, 82, 106, 130, 154, 178, 202, 226, 250, 274, 298, 322, 346, 370, 394, 418, 442, 466, 490, 514, 538, 562, 586]
          .filter((x) => x <= left(FRONT_Y))
          .map((x) => (x === 322 ? tulipStem(RED_TULIP[0], FRONT_Y) + diff(RED_TULIP[0], FRONT_Y - 38, 18, tulipHead(RED_TULIP[0], FRONT_Y, '#e63946'), tulipHead(RED_TULIP[0], FRONT_Y, '#ffd23f')) : tulip(x + 4, FRONT_Y, '#e63946')))
          .join('')) +
      row(FRONT_Y, right(FRONT_Y), 1430, ROW_COLORS[6]) +
      row(900, 10, left(900), ROW_COLORS[2]) + row(900, right(900), 1430, ROW_COLORS[3])
    const can =
      `<path d="M400 806l4-26h22l4 26z" fill="#4f9a8a" ${Ow(1.6)}/><path d="M426 790l20-14l4 4l-20 14" fill="#4f9a8a" ${Ow(1.4)}/><ellipse cx="450" cy="777" rx="5" ry="3" fill="#3a7a6a" ${Ow(1.2)}/>` +
      `<path d="M404 784q11-14 22 0" fill="none" stroke="${INK}" stroke-width="2"/>`
    const clog = (flower: boolean) =>
      `<path d="M282 718q-2-12 10-14h22q12 2 10 14q-4 4-42 0z" fill="#e8c36a" ${Ow(1.6)}/><ellipse cx="294" cy="710" rx="8" ry="4" fill="#8a6a3a"/>` +
      (flower ? `<circle cx="314" cy="712" r="3.2" fill="#e63946"/><path d="M308 712h12M314 706v12" stroke="#e63946" stroke-width="2.4" stroke-linecap="round"/><circle cx="314" cy="712" r="1.6" fill="#ffd23f"/>` : '')
    const fieldThings =
      groundShadow(414, 806, 24, 4) + diff(426, 790, 34, can, '') +
      groundShadow(302, 720, 26, 4) + diff(314, 712, 18, clog(true), clog(false))

    // --- The windmill: thatched body, the stage round it with a flower box (A only), the cap with the game's owl in its
    // window and a finial (a star in A, a ball in B). ---
    const [hx, hy] = HUB
    const windmill =
      groundShadow(480, 724, 80, 9) +
      `<path d="M425 722L455 452H505L535 722z" fill="url(#c21-thatch)" ${O}/>` +
      Array.from({ length: 9 }, (_, i) => `<path d="M${440 + i * 10} 722L${458 + i * 5.5} 460" stroke="#6b4a24" stroke-opacity="0.35" stroke-width="2"/>`).join('') +
      `<rect x="471" y="514" width="16" height="18" fill="#bfe3f2" ${Ow(1.4)}/><rect x="481" y="636" width="16" height="18" fill="#bfe3f2" ${Ow(1.4)}/>` +
      `<path d="M466 722v-30q14-16 28 0v30z" fill="#2f6f4a" ${Ow(1.8)}/><circle cx="489" cy="708" r="2" fill="#ffd23f"/>` +
      // The stage.
      `<path d="M404 600h152" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M404 600h152" stroke="#a0683a" stroke-width="6" stroke-linecap="round"/>` +
      `<path d="M412 600l24 30M548 600l-24 30" stroke="${INK}" stroke-width="4"/>` +
      `<path d="M408 584h144M412 584v16M432 584v16M528 584v16M548 584v16" stroke="${INK}" stroke-width="2.4"/>` +
      diff(548, 584, 20,
        `<rect x="535" y="584" width="26" height="8" fill="#a0683a" ${Ow(1.4)}/><circle cx="540" cy="580" r="4" fill="#e63946" ${Ow(1)}/><circle cx="548" cy="578" r="4" fill="#ff7eb6" ${Ow(1)}/><circle cx="556" cy="580" r="4" fill="#e63946" ${Ow(1)}/>`, '') +
      // The cap.
      `<path d="M446 456Q446 404 480 398Q514 404 514 456z" fill="url(#c21-cap)" ${O}/>` +
      `<rect x="467" y="418" width="26" height="22" fill="#2b2b3a" ${Ow(1.6)}/>` +
      anim({ type: 'sway', angle: 6, pivot: [480, 440], period: 3.6 }, keenOwl(480, 440, 0.45, blink(3.1, 0.3))) +
      `<path d="M465 440h30" stroke="${INK}" stroke-width="3"/>` +
      `<path d="M480 398v-6" stroke="${INK}" stroke-width="2.4"/>` +
      diff(480, 386, 18, star(480, 386, 8), `<circle cx="480" cy="387" r="5" fill="#ffd23f" ${Ow(1)}/>`)

    // --- The sails (sail 0 drawn pointing down; the others turned by 90°). A bar of sail 1's lattice is missing in B (a
    // hard one); in B a sparrow rides on sail 2 for a while. The cat clings to sail 0 from boarding to letting go. ---
    const LAT_X0 = hx + 4
    const LAT_X1 = hx + 42
    const barY = (j: number) => hy + 55 + j * 17.5
    const sail = (k: number) => {
      let bars = ''
      for (let j = 0; j <= 10; j++) {
        const bar = `<path d="M${LAT_X0} ${barY(j)}H${LAT_X1}" stroke="${INK}" stroke-width="2.4"/>`
        bars += k === 1 && j === 3 ? diff(372, 468, 22, bar, '', 'sails') : bar
      }
      return (
        `<g transform="rotate(${k * 90} ${hx} ${hy})">` +
        `<rect x="${LAT_X0}" y="${barY(0)}" width="${LAT_X1 - LAT_X0}" height="${barY(10) - barY(0)}" fill="#f4f1e8" fill-opacity="${k % 2 ? 0.55 : 0.25}"/>` +
        bars +
        `<path d="M${LAT_X1} ${barY(0)}V${barY(10)}" stroke="${INK}" stroke-width="3"/>` +
        `<path d="M${hx} ${hy + 14}V${hy + 232}" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${hx} ${hy + 14}V${hy + 232}" stroke="#8a5a32" stroke-width="5.4" stroke-linecap="round"/>` +
        '</g>'
      )
    }
    // In B a sparrow perches on sail 2's tip and rides along (sail-0 frame coordinates, turned with sail 2).
    const sparrow = (x: number, y: number) =>
      `<path d="M${x + 8} ${y - 8}l10-2l-6 6z" fill="#8a6a4a" ${Ow(1.2)}/><ellipse cx="${x}" cy="${y - 8}" rx="9" ry="7" fill="#b08a62" ${Ow(1.5)}/><ellipse cx="${x - 2}" cy="${y - 5}" rx="5" ry="3.4" fill="#efe2c6"/>` +
      `<circle cx="${x - 6}" cy="${y - 15}" r="5.5" fill="#8a6a4a" ${Ow(1.4)}/><path d="M${x - 11} ${y - 15}l-5 1.5l5 1.5z" fill="#f2b33a" ${Ow(0.8)}/><circle cx="${x - 7}" cy="${y - 16}" r="1.2" fill="${INK}"/>` +
      `<path d="M${x - 2} ${y - 1}v3M${x + 2} ${y - 1}v3" stroke="${INK}" stroke-width="1.4"/>`
    const rider = diff(462, 218, 26, '',
      once(showIn([6, 8.6]), HUB, `<g transform="rotate(180 ${hx} ${hy})">${sparrow(hx + 18, barY(10) + 2)}</g>`), 'sails', during(6, 8.6))
    // The cat clinging to sail 0's spar, wide-eyed, its tail flailing.
    const [cx, cy] = CLING
    const tabby = '#9aa0a8'
    const stripe = '#5f656e'
    const clingCat =
      anim({ type: 'keys', period: 0.4, keys: [{ t: 0, rot: -25 }, { t: 0.2, rot: 25, ease: 'inOut' }], pivot: [cx, cy + 18] },
        `<path d="M${cx} ${cy + 18}q16 10 8 30q-4 8-10 4" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M${cx} ${cy + 18}q16 10 8 30q-4 8-10 4" fill="none" stroke="${tabby}" stroke-width="4.6" stroke-linecap="round"/>`) +
      `<ellipse cx="${cx}" cy="${cy}" rx="14" ry="21" fill="${tabby}" ${Ow(1.8)}/><path d="M${cx - 12} ${cy - 6}q6 2 8 0M${cx - 13} ${cy + 4}q6 2 8 0M${cx + 12} ${cy - 2}q-6 2-8 0" fill="none" stroke="${stripe}" stroke-width="2.4" stroke-linecap="round"/>` +
      `<ellipse cx="${cx}" cy="${cy + 4}" rx="7" ry="11" fill="#e8e6e0"/>` +
      // Paws hugging the spar.
      `<path d="M${cx - 12} ${cy - 12}q8-4 12 2M${cx + 12} ${cy - 12}q-8-4-12 2M${cx - 12} ${cy + 16}q8-4 12 2M${cx + 12} ${cy + 16}q-8-4-12 2" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>` +
      `<path d="M${cx - 12} ${cy - 12}q8-4 12 2M${cx + 12} ${cy - 12}q-8-4-12 2M${cx - 12} ${cy + 16}q8-4 12 2M${cx + 12} ${cy + 16}q-8-4-12 2" fill="none" stroke="${tabby}" stroke-width="4.4" stroke-linecap="round"/>` +
      `<path d="M${cx - 14} ${cy - 30}l-2-14l10 8zM${cx + 14} ${cy - 30}l2-14l-10 8z" fill="${tabby}" ${Ow(1.4)}/>` +
      `<circle cx="${cx}" cy="${cy - 27}" r="14" fill="${tabby}" ${Ow(1.8)}/><path d="M${cx - 5} ${cy - 39}l2 6M${cx} ${cy - 40}v6M${cx + 5} ${cy - 39}l-2 6" stroke="${stripe}" stroke-width="2"/>` +
      `<circle cx="${cx - 6}" cy="${cy - 28}" r="5" fill="#fff" ${Ow(1.2)}/><circle cx="${cx + 6}" cy="${cy - 28}" r="5" fill="#fff" ${Ow(1.2)}/><circle cx="${cx - 6}" cy="${cy - 28}" r="1.6" fill="${INK}"/><circle cx="${cx + 6}" cy="${cy - 28}" r="1.6" fill="${INK}"/>` +
      `<ellipse cx="${cx}" cy="${cy - 18}" rx="4" ry="5" fill="#7a2a2a" ${Ow(1)}/><path d="M${cx - 2} ${cy - 22}l2 2l2-2z" fill="#e8798f"/>` +
      // Sweat drops flying off.
      anim({ type: 'keys', period: 0.5, keys: [{ t: 0, x: 0, y: 0, o: 1 }, { t: 0.5, x: 14, y: -10, o: 0 }], pivot: [cx + 16, cy - 34] },
        `<path d="M${cx + 16} ${cy - 36}q3 4 0 6q-3-2 0-6z" fill="#9fd8f0" ${Ow(0.8)}/>`)
    const sails = keys('sails', sailKeys, HUB,
      sail(0) + sail(1) + sail(2) + sail(3) + rider + once(showIn([BOARD, RELEASE]), HUB, clingCat) +
        `<circle cx="${hx}" cy="${hy}" r="10" fill="#5a3a1a" ${Ow(1.8)}/><circle cx="${hx}" cy="${hy}" r="3" fill="${INK}"/>`)

    // --- The house with the stepped gable: the storks' nest on top (the stork glares at the cat; in B its chick peeps
    // out), the hoist beam with its hook (A only), a bicycle by the wall; the tulip cart (a spoke fewer in B: a hard
    // one); a clog planted with flowers by the door (A only). ---
    const gable = 'M930 722V565H948V540H966V515H984V490H1036V515H1054V540H1072V565H1090V722z'
    const house =
      groundShadow(1010, 724, 100, 8) +
      `<path d="${gable}" fill="url(#c21-brick)" ${O}/>` +
      Array.from({ length: 9 }, (_, i) => `<path d="M932 ${580 + i * 16}H1088" stroke="#8a3a2a" stroke-opacity="0.3" stroke-width="1.4"/>`).join('') +
      `<path d="M984 490H1036M966 515H1054M948 540H1072M930 565H1090" stroke="#f4f1e8" stroke-width="4"/>` +
      `<rect x="992" y="528" width="36" height="30" fill="#bfe3f2" ${Ow(1.6)}/><path d="M1010 528v30M992 543h36" stroke="#f4f1e8" stroke-width="3"/>` +
      `<rect x="946" y="590" width="30" height="34" fill="#bfe3f2" ${Ow(1.6)}/><rect x="1044" y="590" width="30" height="34" fill="#bfe3f2" ${Ow(1.6)}/><path d="M961 590v34M946 607h30M1059 590v34M1044 607h30" stroke="#f4f1e8" stroke-width="3"/>` +
      `<path d="M994 722v-46q16-18 32 0v46z" fill="#2f6f4a" ${Ow(1.8)}/><circle cx="1019" cy="700" r="2.2" fill="#ffd23f"/>` +
      // The hoist beam under the top, its hook in A only.
      `<path d="M1010 502v8M1004 504h12" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M1010 502v8M1004 504h12" stroke="#a0683a" stroke-width="2.6" stroke-linecap="round"/>` +
      diff(1010, 518, 18, `<path d="M1010 510v8q0 6 5 6q4 0 4-4" fill="none" stroke="${INK}" stroke-width="2.2"/>`, '') +
      // A bicycle by the wall.
      `<circle cx="1102" cy="710" r="12" fill="none" stroke="${INK}" stroke-width="2.4"/><circle cx="1136" cy="710" r="12" fill="none" stroke="${INK}" stroke-width="2.4"/>` +
      `<path d="M1102 710l12-20h18l4 20M1114 690l-4-6M1128 690l2-8h6" fill="none" stroke="#3a76d0" stroke-width="3" stroke-linejoin="round"/>`
    const [nx, ny] = NEST
    const nestBack = `<ellipse cx="${nx}" cy="${ny - 2}" rx="46" ry="12" fill="#8a6a3a" ${Ow(1.8)}/>`
    let nestFront = `<path d="M${nx - 48} ${ny - 2}q48 18 96 0q-6 10-48 12q-42-2-48-12z" fill="#a8844e" ${Ow(1.8)}/>`
    for (let i = 0; i < 9; i++) nestFront += `<path d="M${nx - 44 + i * 11} ${ny + 2}l${8 + (i % 3) * 3} -${6 + (i % 2) * 4}" stroke="#6b4a24" stroke-width="2" stroke-linecap="round"/>`
    // The stork: glaring at the cat from 10 s, clacking its beak at it.
    const SX = 1032
    const SY = ny - 2
    const storkBody =
      `<path d="M${SX - 4} ${SY}v-26M${SX + 6} ${SY}v-26" stroke="#e8594a" stroke-width="3.4" stroke-linecap="round"/>` +
      `<ellipse cx="${SX + 2}" cy="${SY - 38}" rx="24" ry="15" fill="#fff" ${Ow(1.8)}/><path d="M${SX + 8} ${SY - 46}q22 2 26 14q-16 0-26-6z" fill="#2b2b3a" ${Ow(1.4)}/>` +
      `<path d="M${SX - 14} ${SY - 44}q-12-22-2-48" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${SX - 14} ${SY - 44}q-12-22-2-48" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>` +
      `<circle cx="${SX - 16}" cy="${SY - 94}" r="8" fill="#fff" ${Ow(1.6)}/><circle cx="${SX - 19}" cy="${SY - 96}" r="1.6" fill="${INK}"/>` +
      once(showIn([10, 12.3]), [SX - 16, SY - 94], `<path d="M${SX - 24} ${SY - 101}l10 3" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`)
    const beakUpper = `<path d="M${SX - 22} ${SY - 96}l-30 4l30 2z" fill="#e8594a" ${Ow(1.2)}/>`
    const beakLower = `<path d="M${SX - 22} ${SY - 92}l-30 1l30 2z" fill="#d9442e" ${Ow(1.2)}/>`
    const stork = anim({ type: 'keys', period: 3, keys: [{ t: 0, rot: 0 }, { t: 1.5, rot: 2, ease: 'inOut' }], pivot: [SX, SY] },
      storkBody + beakUpper +
        once([{ t: 0, rot: 0 }, { t: 11.4, ease: 'inOut' }, ...[0, 1, 2, 3].map((i) => ({ t: 11.5 + i * 0.12, rot: i % 2 ? 0 : 18, ease: 'inOut' as const })), { t: 12, rot: 0 }, { t: 19.95, ease: 'step' }], [SX - 22, SY - 92], beakLower) +
        once(showIn([11.5, 12]), [SX - 60, SY - 100], `<path d="M${SX - 58} ${SY - 108}l-8-6M${SX - 60} ${SY - 96}l-10 0M${SX - 58} ${SY - 86}l-8 6" stroke="#fff4c0" stroke-width="2.6" stroke-linecap="round"/>`))
    const CHICK: [number, number] = [1052, 478]
    const chick = diff(CHICK[0], CHICK[1] - 6, 18, '',
      keys('chick', [{ t: 0, y: 14, o: 0, ease: 'step' }, { t: 10.4, o: 1, ease: 'out' }, { t: 10.8, y: 0 }, { t: 12.4, ease: 'in' }, { t: 12.75, y: 14, o: 1, ease: 'step' }, { t: 12.8, o: 0, ease: 'step' }], CHICK,
        `<circle cx="${CHICK[0]}" cy="${CHICK[1] - 8}" r="8" fill="#e8e6e0" ${Ow(1.4)}/><path d="M${CHICK[0] - 4} ${CHICK[1] - 16}l1-4M${CHICK[0]} ${CHICK[1] - 16}v-5M${CHICK[0] + 4} ${CHICK[1] - 16}l-1-4" stroke="#b9b6ae" stroke-width="1.6"/>` +
          `<circle cx="${CHICK[0] - 3}" cy="${CHICK[1] - 9}" r="1.4" fill="${INK}"/><path d="M${CHICK[0] - 7} ${CHICK[1] - 7}l-6 1l6 2z" fill="#2b2b3a"/>`),
      'chick', during(10.4, 12.8))
    const [kx, ky] = CART
    const wheel = (x: number, y: number, skip: boolean) => {
      let m = `<circle cx="${x}" cy="${y}" r="18" fill="none" stroke="${INK}" stroke-width="5"/><circle cx="${x}" cy="${y}" r="18" fill="none" stroke="#a0683a" stroke-width="2.6"/>`
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3 - Math.PI / 3
        const spoke = `<path d="M${x} ${y}L${(x + Math.cos(a) * 16).toFixed(1)} ${(y + Math.sin(a) * 16).toFixed(1)}" stroke="${INK}" stroke-width="3.6"/>`
        m += skip && i === 0 ? diff(x + 4, y - 7, 18, spoke, '') : spoke
      }
      return m + `<circle cx="${x}" cy="${y}" r="3.4" fill="#5a3a1a"/>`
    }
    let cartTulips = ''
    for (let i = 0; i < 8; i++) cartTulips += tulipHead(kx - 38 + i * 11, ky - 26 + (i % 2) * 3, ROW_COLORS[i % ROW_COLORS.length])
    const cart =
      groundShadow(kx, ky + 26, 60, 5) +
      `<path d="M${kx - 44} ${ky - 6}l-34 18" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${kx - 44} ${ky - 6}l-34 18" stroke="#a0683a" stroke-width="2.6" stroke-linecap="round"/>` +
      cartTulips +
      `<path d="M${kx - 46} ${ky - 30}h92l-4 36h-84z" fill="url(#c21-wood)" ${Ow(1.8)}/><path d="M${kx - 44} ${ky - 18}h88M${kx - 43} ${ky - 6}h86" stroke="#6b4a24" stroke-opacity="0.45" stroke-width="1.6"/>`
    const cartWheels = wheel(kx - 26, ky + 12, false) + wheel(kx + 26, ky + 12, true)
    const clogPlanter = diff(992, 731, 26,
      `<path d="M972 744q-2-12 10-14h18q12 2 12 14q-6 4-40 0z" fill="#ffd23f" ${Ow(1.6)}/><path d="M984 732v-10M990 732v-14M996 732v-9" stroke="#3f8f3a" stroke-width="2"/>` +
        `<circle cx="984" cy="720" r="3.4" fill="#ff7eb6" ${Ow(0.8)}/><circle cx="990" cy="716" r="3.4" fill="#e63946" ${Ow(0.8)}/><circle cx="996" cy="721" r="3.4" fill="#9b5de5" ${Ow(0.8)}/>`, '')

    // --- The cat: chasing the butterfly through the rows, leaping for the sail (then it rides on it), flying from the
    // top of the sail over the canal, sitting dizzy in the nest, bumping down the gable, popping out of the cart. ---
    const [c0x, c0y] = CAT0
    const legSwing = (x: number, flip: boolean) =>
      keys(undefined, swingKeys([RUN], 0.18, 26, flip), [x, c0y - 14],
        `<rect x="${x - 4}" y="${c0y - 16}" width="8" height="16" rx="4" fill="${tabby}" ${Ow(1.4)}/>`)
    const catHead = (x: number, y: number, face: string) =>
      `<path d="M${x - 10} ${y - 8}l-2-14l10 8zM${x + 8} ${y - 10}l6-12l2 14z" fill="${tabby}" ${Ow(1.4)}/>` +
      `<circle cx="${x}" cy="${y}" r="13" fill="${tabby}" ${Ow(1.8)}/><path d="M${x - 4} ${y - 12}l1 5M${x + 1} ${y - 13}v5M${x + 6} ${y - 12}l-1 5" stroke="${stripe}" stroke-width="2"/>` +
      face + `<path d="M${x + 11} ${y + 2}l12-3M${x + 11} ${y + 5}l12 1" stroke="${INK}" stroke-width="1" stroke-linecap="round"/>`
    const keenFace = (x: number, y: number) =>
      `<circle cx="${x - 2}" cy="${y - 2}" r="3.4" fill="#fff" ${Ow(1)}/><circle cx="${x + 7}" cy="${y - 2}" r="3.4" fill="#fff" ${Ow(1)}/><circle cx="${x - 1}" cy="${y - 2}" r="1.7" fill="#5aa845"/><circle cx="${x + 8}" cy="${y - 2}" r="1.7" fill="#5aa845"/>` +
      `<path d="M${x + 10} ${y + 4}l3-1l-1 3z" fill="#e8798f"/><path d="M${x + 5} ${y + 7}q3 2 6 0" fill="none" stroke="${INK}" stroke-width="1.4"/>`
    const runner =
      anim({ type: 'keys', period: 0.5, keys: [{ t: 0, rot: -10 }, { t: 0.25, rot: 14, ease: 'inOut' }], pivot: [c0x - 22, c0y - 26] },
        `<path d="M${c0x - 22} ${c0y - 26}q-20-6-16-30q2-8 8-6" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M${c0x - 22} ${c0y - 26}q-20-6-16-30q2-8 8-6" fill="none" stroke="${tabby}" stroke-width="4.6" stroke-linecap="round"/>`) +
      legSwing(c0x - 16, false) + legSwing(c0x + 14, true) +
      `<ellipse cx="${c0x}" cy="${c0y - 22}" rx="24" ry="12" fill="${tabby}" ${Ow(1.8)}/><path d="M${c0x - 12} ${c0y - 33}q3 6 0 10M${c0x - 2} ${c0y - 34}q3 6 0 10M${c0x + 8} ${c0y - 33}q3 6 0 10" fill="none" stroke="${stripe}" stroke-width="2.4" stroke-linecap="round"/>` +
      `<ellipse cx="${c0x + 4}" cy="${c0y - 15}" rx="14" ry="5" fill="#e8e6e0"/>` +
      legSwing(c0x - 8, true) + legSwing(c0x + 20, false) +
      catHead(c0x + 26, c0y - 36, keenFace(c0x + 26, c0y - 36))
    const runCat = once(
      [
        { t: 0, x: 0, y: 0, rot: 0, o: 1 },
        { t: RUN[0], ease: 'inOut' },
        { t: RUN[1], x: 300, y: 0, ease: 'out' },
        // The leap for the sail's tip.
        { t: 4.6, x: 306, y: 6, rot: 0, ease: 'in' },
        { t: BOARD, x: 330, y: -150, rot: -70, o: 1, ease: 'step' },
        { t: BOARD + 0.02, o: 0, ease: 'step' },
      ],
      CAT0,
      groundShadow(c0x, c0y, 26, 4) + runner,
    )
    // The butterfly it chases: ahead of it through the rows, up past the sail, away.
    const BFLY: [number, number] = [220, 740]
    const butterfly = once(
      [{ t: 0, x: 0, y: 0 }, { t: RUN[0], ease: 'inOut' }, { t: 3, x: 120, y: -30, ease: 'inOut' }, { t: RUN[1], x: 250, y: -80, ease: 'inOut' }, { t: 6, x: 420, y: -300, ease: 'inOut' }, { t: 9, x: 700, y: -380 }, { t: 19.95, ease: 'step' }],
      BFLY,
      butterflyAt(BFLY[0], BFLY[1], ['#ffd23f', '#f77f00'], flap(BFLY, 0)),
    )
    // Flying: spread out, spinning, from the top of the sail into the nest.
    const [f0x, f0y] = FLY0
    const flyer =
      `<ellipse cx="${f0x}" cy="${f0y}" rx="22" ry="12" fill="${tabby}" ${Ow(1.8)}/><ellipse cx="${f0x + 2}" cy="${f0y + 4}" rx="12" ry="5" fill="#e8e6e0"/>` +
      [[-16, -12, -28, -22], [-16, 10, -30, 18], [14, -12, 26, -24], [14, 10, 28, 20]]
        .map(([ax, ay, bx2, by2]) => `<path d="M${f0x + ax} ${f0y + ay}L${f0x + bx2} ${f0y + by2}" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M${f0x + ax} ${f0y + ay}L${f0x + bx2} ${f0y + by2}" stroke="${tabby}" stroke-width="5" stroke-linecap="round"/>`)
        .join('') +
      `<path d="M${f0x - 20} ${f0y}q-22 4-26-12" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M${f0x - 20} ${f0y}q-22 4-26-12" fill="none" stroke="${tabby}" stroke-width="4" stroke-linecap="round"/>` +
      catHead(f0x + 24, f0y - 6, `<circle cx="${f0x + 22}" cy="${f0y - 8}" r="4.4" fill="#fff" ${Ow(1)}/><circle cx="${f0x + 31}" cy="${f0y - 8}" r="4.4" fill="#fff" ${Ow(1)}/><circle cx="${f0x + 22}" cy="${f0y - 8}" r="1.5" fill="${INK}"/><circle cx="${f0x + 31}" cy="${f0y - 8}" r="1.5" fill="${INK}"/><ellipse cx="${f0x + 28}" cy="${f0y + 2}" rx="4" ry="5" fill="#7a2a2a"/>`)
    const landing: [number, number] = [NEST_CAT[0] - f0x, NEST_CAT[1] - 20 - f0y]
    const flyCat = once(
      [
        { t: 0, x: 0, y: 0, rot: 180, o: 0, ease: 'step' },
        { t: RELEASE, o: 1, ease: 'out' },
        { t: 9.5, x: 260, y: -70, rot: 450, ease: 'in' },
        { t: 10, x: landing[0], y: landing[1], rot: 720, o: 1, ease: 'step' },
        { t: 10.02, o: 0, ease: 'step' },
      ],
      FLY0,
      flyer,
    )
    // Sitting in the nest, dizzy; then bumping down the steps of the gable and dropping into the cart.
    const [sx0, sy0] = NEST_CAT
    const sitter = (eyes: string) =>
      `<path d="M${sx0 + 10} ${sy0 - 4}q16 0 14-16" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M${sx0 + 10} ${sy0 - 4}q16 0 14-16" fill="none" stroke="${tabby}" stroke-width="4" stroke-linecap="round"/>` +
      `<ellipse cx="${sx0}" cy="${sy0 - 18}" rx="14" ry="17" fill="${tabby}" ${Ow(1.8)}/><ellipse cx="${sx0}" cy="${sy0 - 14}" rx="7" ry="10" fill="#e8e6e0"/>` +
      catHead(sx0, sy0 - 42, eyes)
    const dazedEyes = spiral(sx0 - 5, sy0 - 44) + spiral(sx0 + 5, sy0 - 44) + `<path d="M${sx0 - 4} ${sy0 - 34}q2 2 4 0q2 2 4 0" fill="none" stroke="${INK}" stroke-width="1.4"/>`
    const wideEyes =
      `<circle cx="${sx0 - 5}" cy="${sy0 - 44}" r="4.6" fill="#fff" ${Ow(1)}/><circle cx="${sx0 + 5}" cy="${sy0 - 44}" r="4.6" fill="#fff" ${Ow(1)}/><circle cx="${sx0 - 5}" cy="${sy0 - 44}" r="1.6" fill="${INK}"/><circle cx="${sx0 + 5}" cy="${sy0 - 44}" r="1.6" fill="${INK}"/>` +
      `<ellipse cx="${sx0}" cy="${sy0 - 33}" rx="3" ry="3.6" fill="#7a2a2a"/>`
    // The steps of the gable, from the top down to the eave, then the cart.
    const STEPS: [number, number][] = [[-2, 6], [-20, 31], [-38, 56], [-56, 81]]
    const nestCat = once(
      [
        { t: 0, x: 0, y: 0, rot: 0, o: 0, ease: 'step' },
        { t: 10, o: 1, ease: 'step' },
        { t: 12, x: 0, y: 0, rot: 0, ease: 'in' },
        ...STEPS.map(([x, y], i) => ({ t: 12.15 + i * 0.15, x, y, rot: -20 - i * 25, ease: (i % 2 ? 'in' : 'out') as Keyframe['ease'] })),
        { t: 13, x: kx - sx0, y: ky - 12 - sy0, rot: -200, o: 1, ease: 'step' },
        { t: 13.02, o: 0, ease: 'step' },
      ],
      NEST_CAT,
      once(showIn([10, 12]), NEST_CAT, sitter(dazedEyes) + dizzy(sx0, sy0 - 66)) + once(showIn([12, 13.02]), NEST_CAT, sitter(wideEyes)),
    )
    // In the cart: head and paws out of the tulips, a tulip on its head; dazed, then pleased.
    const [px, py] = [kx - 4, ky - 46]
    const cartCat =
      `<ellipse cx="${px}" cy="${py + 16}" rx="14" ry="10" fill="${tabby}" ${Ow(1.6)}/><path d="M${px - 16} ${py + 22}q4-7 9 0M${px + 7} ${py + 22}q4-7 9 0" fill="${tabby}" ${Ow(1.4)}/>` +
      catHead(px, py - 6,
        once(showIn([13, 15.2]), [px, py], spiral(px - 5, py - 8) + spiral(px + 5, py - 8)) +
          once(showIn([15.2, LOOP]), [px, py], `<path d="M${px - 9} ${py - 8}q4-4 8 0M${px + 1} ${py - 8}q4-4 8 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/><path d="M${px - 3} ${py + 2}q3 4 6 0" fill="none" stroke="${INK}" stroke-width="1.6"/>`)) +
      `<g transform="translate(${px} ${py - 14}) scale(1.5) translate(${-px} ${-(py - 14)})"><path d="M${px} ${py - 14}v-12" stroke="#3f8f3a" stroke-width="2.4"/>${tulipHead(px, py + 2, '#e63946')}</g>` +
      once(showIn([13, 15.2]), [px, py - 40], dizzy(px, py - 46))
    const cartCatShown = once(
      [{ t: 0, y: 30, o: 0, ease: 'step' }, { t: 13, o: 1, ease: 'out' }, { t: 13.3, y: 0, ease: 'inOut' }, { t: 16, y: 0, ease: 'inOut' }, { t: 16.3, y: -4, ease: 'inOut' }, { t: 16.6, y: 0 }, { t: 19.95, ease: 'step' }],
      [px, py],
      `<g transform="translate(0 -4)">${cartCat}</g>`,
    )
    // Petals bursting out of the cart as it lands, a starburst.
    let petals = ''
    for (let i = 0; i < 12; i++) {
      const dxp = Math.round((i - 5.5) * 13)
      const up = 50 + (i % 4) * 20
      petals += once([{ t: 0, x: 0, y: 0, rot: 0, o: 0, ease: 'step' }, { t: 13, o: 1, ease: 'out' }, { t: 13.35, x: dxp, y: -up, rot: 200, ease: 'in' }, { t: 14.1, x: dxp * 1.4, y: 20, rot: 420, o: 1, ease: 'step' }, { t: 14.15, o: 0, ease: 'step' }],
        [kx, ky - 34], `<path d="M${kx - 4} ${ky - 34}q4-6 8 0q-4 6-8 0z" fill="${ROW_COLORS[i % ROW_COLORS.length]}" ${Ow(1)}/>`)
    }
    petals += once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t: 13, o: 1, ease: 'out' }, { t: 13.15, sx: 1.1, sy: 1.1, ease: 'inOut' }, { t: 13.35, sx: 1, sy: 1, o: 1, ease: 'step' }, { t: 13.4, o: 0, ease: 'step' }], [kx, ky - 40],
      burstStar(kx, ky - 40, 40, '#fff4c0'))

    // Butterflies and bees over the fields.
    const bees = ([[180, 690, 0], [560, 830, 0.4], [1200, 700, 0.7]] as [number, number, number][])
      .map(([x, y, phase]) => anim({ type: 'path', points: [[0, 0], [30, -16], [60, 4], [24, 14]], period: 3.2, phase },
        `<ellipse cx="${x}" cy="${y}" rx="6" ry="4.4" fill="#ffd23f" ${Ow(1.2)}/><path d="M${x - 1} ${y - 4}v8M${x + 2} ${y - 4}v8" stroke="${INK}" stroke-width="1.6"/>` +
          anim({ type: 'keys', period: 0.1, keys: [{ t: 0, sy: 1 }, { t: 0.05, sy: 0.4 }], pivot: [x, y - 4] }, `<ellipse cx="${x + 1}" cy="${y - 7}" rx="3" ry="4.6" fill="#fff" fill-opacity="0.85" ${Ow(0.8)}/>`)))
      .join('')
    const morePapillons =
      anim({ type: 'path', points: [[0, 0], [60, -30], [120, 10], [50, 30]], period: 8, phase: 0.3 }, butterflyAt(1220, 780, ['#ff7eb6', '#e63946'], flap([1220, 780], 0.1))) +
      anim({ type: 'path', points: [[0, 0], [-50, -20], [-100, 20], [-30, 30]], period: 9, phase: 0.6 }, butterflyAt(140, 640, ['#a5d8ff', '#4d96e6'], flap([140, 640], 0.2)))

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c21-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fb8ea"/><stop offset="0.7" stop-color="#bfe2f5"/><stop offset="1" stop-color="#eef7ea"/></linearGradient>` +
      `<radialGradient id="c21-glow"><stop offset="0" stop-color="#fff4cc" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffe9a8" stop-opacity="0.4"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c21-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd06a"/><stop offset="1" stop-color="#6fa846"/></linearGradient>` +
      `<linearGradient id="c21-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fc8e0"/><stop offset="1" stop-color="#3f8fb8"/></linearGradient>` +
      `<linearGradient id="c21-thatch" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a5a32"/><stop offset="0.6" stop-color="#a8844e"/><stop offset="1" stop-color="#c49a62"/></linearGradient>` +
      `<radialGradient id="c21-cap" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#5a8a6a"/><stop offset="1" stop-color="#2f5a42"/></radialGradient>` +
      `<linearGradient id="c21-brick" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8402e"/><stop offset="1" stop-color="#d0644a"/></linearGradient>` +
      `<linearGradient id="c21-wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a5a32"/><stop offset="1" stop-color="#c48a52"/></linearGradient>` +
      `<radialGradient id="c21-sunlight" cx="0.86" cy="0.15" r="1"><stop offset="0" stop-color="#fff2c4" stop-opacity="0.3"/><stop offset="0.5" stop-color="#fff2c4" stop-opacity="0.06"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></radialGradient></defs>` +
      sky +
      canal +
      ducks +
      bridge +
      barge +
      hoverFly +
      fishJump +
      fishRings +
      backRows +
      fieldThings +
      windmill +
      house +
      nestBack +
      stork +
      chick +
      nestCat +
      nestFront +
      cart +
      cartCatShown +
      cartWheels +
      clogPlanter +
      runCat +
      sails +
      flyCat +
      petals +
      frontRows +
      butterfly +
      bees +
      morePapillons +
      `<rect width="${W}" height="${H}" fill="url(#c21-sunlight)"/>`
    )
  },
})
