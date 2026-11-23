// Cartoon "The bamboo catapult" (docs/cartoon-mode.md), made like 812: a 20 s story in a garden with a pagoda, told by
// a camera. A panda jumps for the leafy top of a bamboo stalk, its weight bends the stalk down to the ground and it
// munches away — until it reaches for one leaf too many, lets its feet go, and the stalk springs up and flings it
// high over the garden — splash — into the koi pond. It sits there up to its chest, a lily pad on its head, dazed but
// still holding the leafy top up, when a red panda creeps along the bridge above, leans down, snatches the leaves and
// runs up the maple; the panda looks at the bare stick in its paw — and chews that, content. Twelve differences: two hard (a bell under the pagoda's eave, a baluster of the
// bridge), three events of B (a koi jumping, the crane on one leg, a dragonfly on the lantern).
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { bambooClump, dragonfly, farBird, frog, groundShadow, INK, JUNGLE_DEFS, keenOwl, lilyPad, NATURE_DEFS, O, Ow, puffCloud } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // The pagoda: the owl on its roof, bells, the teapot, the parasol.
  { t: 1.6, x: 920, y: 430, w: 520, ease: 'linear' },
  { t: 3.3, x: 900, y: 436, w: 520, ease: 'step' },
  // Along the koi pond, its bridge, lotus, the crane, to the bamboo.
  { t: 3.35, x: 760, y: 520, w: 560, ease: 'inOut' },
  { t: 4.6, x: 460, y: 520, w: 560, ease: 'step' },
  // The panda and its bamboo.
  { t: 4.65, x: 110, y: 500, w: 480, ease: 'linear' },
  { t: 7.45, x: 120, y: 500, w: 480, ease: 'step' },
  // Flung over the pond.
  { t: 7.5, x: 150, y: 230, w: 1000, ease: 'inOut' },
  { t: 9.75, x: 400, y: 240, w: 1000, ease: 'step' },
  // Splash: into the pond, a lily pad on its head; the red panda creeps along the bridge and snatches the leaves.
  { t: 9.8, x: 510, y: 600, w: 420, ease: 'linear' },
  { t: 13.5, x: 516, y: 600, w: 420, ease: 'step' },
  { t: 13.55, x: 580, y: 560, w: 520, ease: 'linear' },
  { t: 16.4, x: 576, y: 560, w: 520, ease: 'step' },
  // The leaves up the maple, the bare stick chewed happily in the pond; on to the pagoda.
  { t: 16.45, x: 580, y: 525, w: 600, ease: 'inOut' },
  { t: 19.95, x: 840, y: 525, w: 600, ease: 'step' },
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

/**
 * The bamboo stalk the panda bends: five segments from its foot, each turning on the one below, a growing share of
 * the stalk's whole turn (`STALK_TURN`) each, so it bends in a smooth arc.
 */
const STALK: [number, number] = [430, 792]
const SEG_LEN = 66
const SEG_SHARE = [0.12, 0.16, 0.2, 0.24, 0.28]
const STALK_T = [0, 5.25, 6.1, 6.6, 7, 7.45, 7.8, 8.2, 8.6, 9, 9.5]
const STALK_EASE: Keyframe['ease'][] = ['inOut', 'out', 'inOut', 'inOut', 'inOut', 'in', 'out', 'inOut', 'inOut', 'inOut', 'inOut']
/** Rest arch, bent to the ground under the panda, sprung over, wobbling back. */
const STALK_TURN = [-53, -53, -112, -109, -112, -112, 42, -74, -36, -57, -53]
const segKeys = (i: number): Keyframe[] => STALK_T.map((t, j) => ({ t, rot: Math.round(STALK_TURN[j] * SEG_SHARE[i] * 10) / 10, ease: STALK_EASE[j] }))
/** The panda hanging from the top keeps upright: the stalk's whole turn, undone. */
const uprightKeys: Keyframe[] = STALK_T.map((t, j) => ({ t, rot: -STALK_TURN[j], ease: STALK_EASE[j] }))
/** Where the stalk's top is at a whole turn. */
function topAt(turn: number): [number, number] {
  let [x, y] = STALK
  let a = 0
  for (const share of SEG_SHARE) {
    a += (turn * share * Math.PI) / 180
    x += Math.sin(a) * SEG_LEN
    y -= Math.cos(a) * SEG_LEN
  }
  return [Math.round(x), Math.round(y)]
}
const TOP: [number, number] = [STALK[0], STALK[1] - SEG_LEN * SEG_SHARE.length]
const REST_TOP = topAt(STALK_TURN[0])
const FLING_TOP = topAt(STALK_TURN[6])

/** The panda's feet, sitting in the bamboo at first. */
const PANDA: [number, number] = [250, 790]
/** Where it sits in the koi pond, up to its chest (offset of its feet): between the lotus and the frog. */
const POND_X = 470
const POND_Y = 56
const HANG: [number, number] = [7.8 - 2.55, 7.8]
const pandaKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0 },
  { t: 4.6, ease: 'inOut' },
  { t: 4.95, x: 24, y: 0, ease: 'out' },
  // Up to the top of the stalk (the hanging panda takes over there).
  { t: HANG[0], x: REST_TOP[0] - 250, y: REST_TOP[1] + 150 - 790, ease: 'step' },
  // Flung: from the stalk's top up over the garden and down — splash — into the koi pond.
  { t: HANG[1], x: FLING_TOP[0] - 250, y: FLING_TOP[1] + 150 - 790, ease: 'out' },
  { t: 8.75, x: 400, y: -400, ease: 'in' },
  { t: 9.75, x: POND_X, y: POND_Y + 24, ease: 'step' },
  { t: 9.8, x: POND_X, y: POND_Y + 24, ease: 'out' },
  { t: 10.1, y: POND_Y, ease: 'inOut' },
  { t: 10.9, y: POND_Y + 4, ease: 'inOut' },
  { t: 11.7, y: POND_Y, ease: 'inOut' },
  { t: 19.95, ease: 'step' },
]

/** The heap of maple leaves the panda lands in, by the maple. */
const PILE: [number, number] = [1010, 800]
/** The red panda's feet: by the maple, facing the heap. */
const RED: [number, number] = [1100, 795]
/** Feet positions up the bridge's arch (offsets from RED), from its foot to above the panda. */
const UP_BRIDGE: [number, number][] = [[-216, -23], [-240, -44], [-280, -74], [-315, -93]]
const redKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, sx: 1, sy: 1, rot: 0 },
  { t: 13.6, ease: 'inOut' },
  // Across to the bridge and up its arch, creeping.
  { t: 14.05, x: UP_BRIDGE[0][0], y: UP_BRIDGE[0][1], ease: 'linear' },
  ...UP_BRIDGE.slice(1).map(([x, y], i) => ({ t: 14.2 + i * 0.15, x, y, ease: 'linear' as const })),
  // Leans down over the rail: snatch.
  { t: 14.55, rot: 0, ease: 'in' },
  { t: 14.7, rot: -34, y: UP_BRIDGE[3][1] + 10, ease: 'out' },
  { t: 14.85, rot: 0, y: UP_BRIDGE[3][1], sx: 1, ease: 'step' },
  // Off down the bridge, to the maple and up its trunk.
  { t: 14.9, sx: -1, ease: 'linear' },
  ...UP_BRIDGE.slice(0, 3).reverse().map(([x, y], i) => ({ t: 15 + i * 0.12, x, y, ease: 'linear' as const })),
  { t: 15.55, x: 0, y: 0, ease: 'step' },
  { t: 15.6, sx: 1, ease: 'out' },
  { t: 16.2, x: -40, y: -103 },
  { t: 19.95, ease: 'step' },
]

export default svgLevel({
  id: 815,
  chapter: 'cartoon',
  title: 'cartoonBambooCatapult',
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
    const sway = (angle: number, period: number) => (pivot: [number, number], m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 7) / 7 }, m)

    /** A maple leaf (five points) on (x, y). */
    const mapleLeaf = (x: number, y: number, rot: number, c: string, s = 1) =>
      `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 -9l2 5l5-2l-2 5l5 2l-5 2l1 5l-4-3l-2 4l-2-4l-4 3l1-5l-5-2l5-2l-2-5l5 2z" fill="${c}" ${Ow(0.9)}/></g>`
    const LEAF_COLORS = ['#d9442e', '#e8662c', '#f28a3a', '#c0392b', '#f2b33a']
    /** A spray of bamboo leaves fanning out of (x, y). */
    const bambooLeaves = (x: number, y: number, s = 1) =>
      [-150, -115, -80, -45, -10, 25].map((a, i) => {
        const r = (a * Math.PI) / 180
        const len = (i % 2 ? 34 : 28) * s
        const ex = Math.round(x + Math.cos(r) * len)
        const ey = Math.round(y + Math.sin(r) * len)
        const mx = Math.round((x + ex) / 2 - Math.sin(r) * 6 * s)
        const my = Math.round((y + ey) / 2 + Math.cos(r) * 6 * s)
        return `<path d="M${x} ${y}Q${mx} ${my} ${ex} ${ey}Q${Math.round((x + ex) / 2 + Math.sin(r) * 6 * s)} ${Math.round((y + ey) / 2 - Math.cos(r) * 6 * s)} ${x} ${y}z" fill="url(#ke-banana-leaf)" ${Ow(1.2)}/>`
      }).join('')

    // --- Sky, sun, far mountains in mist, cranes flying. ---
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c15-sky)"/>` +
      `<circle cx="300" cy="150" r="190" fill="url(#c15-glow)"/>` +
      `<circle cx="300" cy="150" r="44" fill="#ffd56a" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="287" cy="142" rx="4.5" ry="7" fill="${INK}"/><ellipse cx="313" cy="142" rx="4.5" ry="7" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.3, phase: 0.2 }, `<rect x="277" y="134" width="46" height="18" fill="#ffd56a"/><path d="M279 143h12M309 143h12" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<path d="M282 164q18 14 36 0" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>` +
      anim({ type: 'path', points: [[0, 0], [140, 0]], period: 36 }, puffCloud(560, 110, 0.9)) +
      anim({ type: 'path', points: [[0, 0], [-110, 0]], period: 30 }, puffCloud(1120, 160, 0.75)) +
      // Cranes flying far off.
      keys(undefined, [{ t: 0, x: 0, y: 0 }, { t: 10, y: -30, ease: 'inOut' }, { t: 19.9, x: -1650, y: 0 }], [1480, 250],
        ([[1480, 250], [1506, 238], [1508, 264]] as [number, number][]).map(([fx, fy], i) => farBird(fx, fy, beat([fx, fy - 2], 0.7, i * 0.2))).join('')) +
      // A snowy peak, misty ridges.
      `<path d="M560 600l200-250l200 250z" fill="url(#c15-peak)"/><path d="M712 410l48-60l48 60l-16-8l-14 12l-18-12l-14 12l-16-10z" fill="#fff"/>` +
      `<path d="M0 560q160-90 320-40t300-30t320 20t300-40t200 20V680H0z" fill="#b6c9c4" fill-opacity="0.9"/>` +
      `<path d="M0 620q200-60 420-20t420-10t600-30V700H0z" fill="#93b39a"/>`

    // --- The garden: lawn, the gravel walk, stepping stones; falling maple leaves. ---
    let ground =
      `<rect y="640" width="${W}" height="${H - 640}" fill="url(#c15-ground)"/>` +
      `<path d="M1130 900q-60-80 40-120q120-30 270-10V900z" fill="url(#c15-gravel)" ${Ow(1.4)}/>`
    for (let i = 0; i < 40; i++) {
      const gx = Math.round(1150 + rand() * 290)
      const gy = Math.round(800 + rand() * 95)
      ground += `<path d="M${gx - 10} ${gy}h20" stroke="#cbbf9e" stroke-width="1.6" stroke-linecap="round"/>`
    }
    for (const [sx, sy, r] of [[470, 850, 22], [530, 878, 20], [960, 860, 22], [1030, 884, 18], [180, 860, 24]] as [number, number, number][]) {
      ground += `<ellipse cx="${sx}" cy="${sy}" rx="${r}" ry="${Math.round(r * 0.45)}" fill="#a9a39a" ${Ow(1.4)}/><path d="M${sx - r / 2} ${sy - 2}q${r / 2}-4 ${r} 0" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="2"/>`
    }
    let tufts = ''
    for (let i = 0; i < 26; i++) {
      const tx = Math.round(rand() * W)
      const ty = Math.round(660 + rand() * 230)
      if (Math.abs(tx - 720) < 230 && ty > 750) continue
      tufts += anim({ type: 'sway', angle: 7, pivot: [tx, ty], period: 2.4, phase: (tx % 13) / 13 },
        `<path d="M${tx - 6} ${ty}q2-12 0-18M${tx} ${ty}q1-16 4-22M${tx + 6} ${ty}q-1-10 4-14" fill="none" stroke="#3f8f3a" stroke-width="2.6" stroke-linecap="round"/>`)
    }
    let falling = ''
    for (let i = 0; i < 18; i++) {
      const fx = Math.round(860 + rand() * 360)
      const fy = Math.round(560 + rand() * 80)
      falling += anim(
        { type: 'path', points: [[0, 0], [-70 - rand() * 60, 240 + rand() * 50]], period: 6 + rand() * 4, phase: rand() },
        anim({ type: 'rotate', pivot: [fx, fy], period: 1.6 + rand(), reverse: i % 2 === 0 }, mapleLeaf(fx, fy, 0, LEAF_COLORS[i % LEAF_COLORS.length], 0.9)),
      )
    }

    // --- The pagoda: three roofs with upturned corners, bells under them (one fewer in B: a hard one), the round
    // window over its door (square in B), the game's owl on its top roof. ---
    const PX = 1330
    const roof = (cx: number, y: number, w: number) =>
      `<path d="M${cx - w / 2 - 6} ${y - 8}q14 10 34 8h${w - 56}q20 2 34-8l-${Math.round(w * 0.18)}-30h-${Math.round(w - w * 0.36 + 12)}z" fill="url(#c15-tiles)" ${O}/>` +
      `<path d="M${cx - w / 2 + 26} ${y}h${w - 52}" stroke="#a8382a" stroke-width="4"/>` +
      `<path d="M${cx - w / 2 + 30} ${y - 16}h${w - 60}M${cx - w / 2 + 40} ${y - 26}h${w - 80}" stroke="#1d3a36" stroke-opacity="0.45" stroke-width="2"/>`
    const bell = (x: number, y: number) =>
      `<path d="M${x} ${y}v7" stroke="${INK}" stroke-width="1.4"/>` +
      anim({ type: 'keys', period: 1.8, phase: (x % 5) / 5, keys: [{ t: 0, rot: -10 }, { t: 0.9, rot: 10, ease: 'inOut' }], pivot: [x, y] },
        `<path d="M${x - 5} ${y + 17}q0-10 5-10q5 0 5 10z" fill="#d9a441" ${Ow(1.3)}/><circle cx="${x}" cy="${y + 19}" r="1.8" fill="#8a6a2a"/>`)
    const wall = (cx: number, top: number, w: number, h: number) =>
      `<rect x="${cx - w / 2}" y="${top}" width="${w}" height="${h}" fill="#f3e6cc" ${Ow(1.8)}/>` +
      `<path d="M${cx - w / 2 + 6} ${top}v${h}M${cx + w / 2 - 6} ${top}v${h}M${cx - w / 6} ${top}v${h}M${cx + w / 6} ${top}v${h}" stroke="#b8362a" stroke-width="7"/>` +
      `<path d="M${cx - w / 2} ${top + 8}h${w}" stroke="#b8362a" stroke-width="4"/>`
    const pagoda =
      groundShadow(PX, 770, 130, 10) +
      `<rect x="${PX - 104}" y="752" width="208" height="18" fill="#a9a39a" ${Ow(1.6)}/>` +
      wall(PX, 640, 160, 112) +
      `<rect x="${PX - 18}" y="702" width="36" height="50" fill="#8a2a20" ${Ow(1.6)}/><path d="M${PX} 702v50" stroke="${INK}" stroke-width="1.4"/>` +
      diff(PX, 684, 20, `<circle cx="${PX}" cy="684" r="9" fill="#ffe8a8" ${Ow(1.6)}/><path d="M${PX} 675v18M${PX - 9} 684h18" stroke="#8a2a20" stroke-width="1.4"/>`,
        `<rect x="${PX - 9}" y="675" width="18" height="18" fill="#ffe8a8" ${Ow(1.6)}/><path d="M${PX} 675v18M${PX - 9} 684h18" stroke="#8a2a20" stroke-width="1.4"/>`) +
      roof(PX, 640, 220) +
      diff(PX - 110, 652, 18, bell(PX - 110, 640), '') + bell(PX + 110, 640) +
      wall(PX, 566, 120, 74) + roof(PX, 566, 180) + bell(PX - 90, 566) + bell(PX + 90, 566) +
      wall(PX, 492, 84, 74) + roof(PX, 492, 140) + bell(PX - 70, 492) + bell(PX + 70, 492) +
      `<path d="M${PX} 462v-70" stroke="${INK}" stroke-width="5"/><path d="M${PX} 462v-70" stroke="#d9a441" stroke-width="2.6"/>` +
      `<path d="M${PX - 7} 446h14M${PX - 6} 432h12M${PX - 5} 418h10M${PX - 4} 404h8" stroke="#d9a441" stroke-width="3" stroke-linecap="round"/><circle cx="${PX}" cy="390" r="5" fill="#d9a441" ${Ow(1.2)}/>` +
      anim({ type: 'sway', angle: 7, pivot: [PX - 28, 470], period: 3.6 }, keenOwl(PX - 28, 470, 0.85, blink(3.1, 0.3)))
    // The parasol leaning on the pagoda (A only), the low table with the teapot and its cups (one fewer in B).
    const parasol = diff(1249, 732, 38,
      `<path d="M1262 766l-16-62" stroke="${INK}" stroke-width="3"/><path d="M1244 700l-8 56l14-2l8-50z" fill="#d9442e" ${Ow(1.6)}/><path d="M1244 708l-4 42M1250 706l2 42" stroke="#ffd56a" stroke-width="1.6"/><circle cx="1245" cy="698" r="3" fill="#d9a441" ${Ow(1)}/>`,
      '')
    const cup = (x: number) => `<path d="M${x - 6} 750h12l-2 9h-8z" fill="#f4f1e8" ${Ow(1.3)}/><path d="M${x - 5} 753h10" stroke="#52b788" stroke-width="1.6"/>`
    const table =
      groundShadow(1160, 782, 40, 4) +
      `<rect x="1126" y="760" width="68" height="7" rx="2" fill="url(#c15-wood)" ${Ow(1.6)}/><path d="M1132 767v12M1188 767v12" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M1132 760q0-18 12-18q12 0 12 18z" fill="#52b788" ${Ow(1.6)}/><path d="M1156 750q8-2 8-8" fill="none" stroke="${INK}" stroke-width="2.4"/><path d="M1132 752q-8-2-8-8" fill="none" stroke="${INK}" stroke-width="2"/><circle cx="1144" cy="740" r="3" fill="#52b788" ${Ow(1)}/>` +
      anim({ type: 'keys', period: 2.2, keys: [{ t: 0, y: 0, o: 0.8, sx: 1 }, { t: 2.2, y: -26, o: 0, sx: 1.8 }], pivot: [1168, 738] }, `<circle cx="1168" cy="738" r="4" fill="#fff" fill-opacity="0.7"/>`) +
      cup(1168) + diff(1182, 754, 18, cup(1182), '')

    // --- The maple (with the red panda's branch), a broom by the heap of leaves (A only), the heap. ---
    const MX = 1100
    const maple =
      groundShadow(MX - 10, 792, 70, 8) +
      `<path d="M${MX - 10} 794q-6-60 6-110q4-20-10-40h16q14 24 6 44q-10 50 2 106z" fill="url(#ke-bark)" ${O}/>` +
      `<path d="M${MX + 2} 700q-30-4-62-12" fill="none" stroke="${INK}" stroke-width="11" stroke-linecap="round"/><path d="M${MX + 2} 700q-30-4-62-12" fill="none" stroke="#6e4224" stroke-width="7" stroke-linecap="round"/>` +
      anim({ type: 'sway', angle: 1.6, pivot: [MX, 650], period: 5 },
        `<ellipse cx="${MX - 40}" cy="640" rx="66" ry="34" fill="url(#c15-maple)" ${O}/><ellipse cx="${MX + 44}" cy="622" rx="60" ry="32" fill="url(#c15-maple)" ${O}/>` +
          `<ellipse cx="${MX}" cy="590" rx="74" ry="36" fill="url(#c15-maple)" ${O}/><ellipse cx="${MX - 20}" cy="566" rx="48" ry="24" fill="url(#c15-maple)" ${O}/>` +
          [[-70, 630], [-30, 650], [10, 600], [50, 615], [80, 630], [-40, 575], [0, 565], [30, 590], [-60, 600]].map(([ox, oy], i) => mapleLeaf(MX + ox, oy, i * 40, LEAF_COLORS[(i + 2) % LEAF_COLORS.length], 1.1)).join(''))
    const broom = diff(937, 753, 34,
      `<path d="M942 722l-6 52" stroke="${INK}" stroke-width="4.4" stroke-linecap="round"/><path d="M942 722l-6 52" stroke="#c49462" stroke-width="2.4" stroke-linecap="round"/>` +
        `<path d="M930 768l-4 16h22l-4-16z" fill="#e3c27a" ${Ow(1.4)}/><path d="M932 772l-2 10M937 772v10M942 772l2 10" stroke="#a8874e" stroke-width="1.4"/>`,
      '')
    const [kx, ky] = PILE
    let pileBack = `<ellipse cx="${kx}" cy="${ky}" rx="64" ry="22" fill="#c9562a" ${O}/>`
    for (let i = 0; i < 26; i++) {
      const a = rand() * Math.PI
      pileBack += mapleLeaf(Math.round(kx + Math.cos(a) * rand() * 56), Math.round(ky - Math.sin(a) * rand() * 20), Math.round(rand() * 360), LEAF_COLORS[i % LEAF_COLORS.length], 1)
    }
    let pileFront = `<path d="M${kx - 66} ${ky + 2}q66-38 132 0q-66 22-132 0z" fill="#d9442e" ${Ow(1.8)}/>`
    for (let i = 0; i < 12; i++) pileFront += mapleLeaf(kx - 52 + i * 9, ky - 6 - (i % 3) * 5 + Math.abs(i - 6) * 2, i * 37, LEAF_COLORS[(i + 1) % LEAF_COLORS.length], 1.05)
    // SPLASH: a fountain of drops and a starburst as the panda lands in the pond.
    const SPLASH: [number, number] = [720, 826]
    const [wx, wy] = SPLASH
    let burst = ''
    for (let i = 0; i < 16; i++) {
      const dxu = Math.round((i - 7.5) * 16 + (rand() - 0.5) * 10)
      const up = Math.round(70 + rand() * 90)
      burst += once([{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t: 9.75, o: 1, ease: 'out' }, { t: 10.15, x: dxu, y: -up, ease: 'in' }, { t: 10.75, x: dxu * 1.5, y: 8, o: 1, ease: 'step' }, { t: 10.8, o: 0, ease: 'step' }],
        SPLASH, `<path d="M${wx} ${wy - 8}q5 7 0 11q-5-4 0-11z" fill="#bfe8f5" ${Ow(1.2)}/>`)
    }
    burst += once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t: 9.75, o: 1, ease: 'out' }, { t: 9.9, sx: 1.15, sy: 1.15, ease: 'inOut' }, { t: 10.1, sx: 1, sy: 1, o: 1, ease: 'step' }, { t: 10.15, o: 0, ease: 'step' }], [wx, wy - 30],
      `<path d="M${wx} ${wy - 84}l10 22l22-10l-10 22l24 8l-24 8l10 22l-22-10l-10 22l-10-22l-22 10l10-22l-24-8l24-8l-10-22l22 10z" fill="#e8f7ff" ${Ow(1.8)}/>`)
    burst += once([{ t: 0, sx: 0.2, sy: 0.2, o: 0, ease: 'step' }, { t: 9.78, o: 1, ease: 'out' }, { t: 10.4, sx: 1, sy: 1, o: 0 }], SPLASH,
      `<path d="M${wx - 50} ${wy}q-6-50 14-70M${wx + 50} ${wy}q6-50-14-70M${wx - 24} ${wy - 4}q-2-60 8-84M${wx + 24} ${wy - 4}q2-60-8-84" fill="none" stroke="#bfe8f5" stroke-width="9" stroke-linecap="round"/>`)
    // The water closing over the panda's lower half, rings round it while it sits there.
    const waterline =
      once(showIn([9.8, LOOP]), SPLASH,
        `<ellipse cx="${wx}" cy="${wy + 18}" rx="46" ry="14" fill="url(#c15-water)"/>` +
          [0, 0.9].map((phase) => anim({ type: 'keys', period: 1.8, phase, keys: [{ t: 0, sx: 0.8, sy: 0.8, o: 0.9 }, { t: 1.8, sx: 1.4, sy: 1.4, o: 0 }], pivot: [wx, wy + 8] },
            `<ellipse cx="${wx}" cy="${wy + 8}" rx="48" ry="9" fill="none" stroke="#fff" stroke-width="2.4"/>`)).join(''))

    // --- The koi pond: the bridge (a baluster fewer in B: a hard one), lotus (one flower pink in A, white in B), a
    // frog on a pad (A only), koi, mandarin ducks, the crane (on one leg in B), stone lanterns (the left one's knob in
    // A only; a dragonfly on the right one in B). ---
    const pond =
      `<ellipse cx="720" cy="822" rx="206" ry="56" fill="#8a8a7a" ${Ow(2)}/>` +
      `<ellipse cx="720" cy="818" rx="198" ry="50" fill="url(#c15-water)" ${Ow(1.6)}/>` +
      anim({ type: 'keys', period: 3, keys: [{ t: 0, x: 0 }, { t: 1.5, x: 14, ease: 'inOut' }] }, `<path d="M600 800h40M760 840h60M680 852h40M820 806h30" stroke="#fff" stroke-opacity="0.55" stroke-width="2.6" stroke-linecap="round"/>`)
    const koi = (x: number, y: number, c: string, spot: string, flip: boolean) => {
      const d = flip ? -1 : 1
      return `<path d="M${x - d * 16} ${y}l${-d * 10} -6v12z" fill="${c}" ${Ow(1.2)}/><ellipse cx="${x}" cy="${y}" rx="16" ry="6" fill="${c}" ${Ow(1.4)}/><circle cx="${x + d * 2}" cy="${y - 1}" r="3" fill="${spot}"/><circle cx="${x + d * 10}" cy="${y - 2}" r="1.2" fill="${INK}"/>`
    }
    const koiSwim = [[640, 828, '#ff7b3a', '#fff', 7, [[0, 0], [60, -10], [120, 6], [60, 14]]], [800, 812, '#fff4e8', '#ff5a3a', 8, [[0, 0], [-70, 8], [-130, -4], [-60, -12]]], [720, 846, '#ffb703', '#2b2b3a', 9, [[0, 0], [50, -14], [-30, -10]]]] as [number, number, string, string, number, [number, number][]][]
    const fishes = koiSwim.map(([x, y, c, spot, period, points], i) => anim({ type: 'path', points, period, phase: i * 0.3 }, koi(x, y, c, spot, i === 1))).join('')
    const deckY = (x: number) => Math.round(770 - 80 * (1 - ((x - 720) / 160) ** 2))
    let balusters = ''
    for (let x = 580; x <= 860; x += 20) {
      const b = `<path d="M${x} ${deckY(x) - 24}v22" stroke="${INK}" stroke-width="4"/><path d="M${x} ${deckY(x) - 24}v22" stroke="#c0392b" stroke-width="2"/>`
      balusters += x === 680 ? diff(680, deckY(680) - 13, 18, b, '') : b
    }
    const bridge =
      `<path d="M556 772Q720 612 884 772" fill="none" stroke="${INK}" stroke-width="16"/><path d="M556 772Q720 612 884 772" fill="none" stroke="#c0392b" stroke-width="12"/>` +
      `<path d="M568 774v20M872 774v20" stroke="${INK}" stroke-width="7"/>` +
      balusters +
      `<path d="M566 748Q720 588 874 748" fill="none" stroke="${INK}" stroke-width="7"/><path d="M566 748Q720 588 874 748" fill="none" stroke="#e05a44" stroke-width="4"/>` +
      `<path d="M566 748v-6M874 748v-6" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
    const lotus = (x: number, y: number, c: string) =>
      `<path d="M${x - 14} ${y}q-2-14 8-16q4 8 6 16zM${x + 14} ${y}q2-14-8-16q-4 8-6 16z" fill="${c}" ${Ow(1.4)}/><path d="M${x - 7} ${y}q0-20 7-24q7 4 7 24z" fill="${c}" ${Ow(1.4)}/><circle cx="${x}" cy="${y - 5}" r="3" fill="#ffd23f"/>`
    const pondPlants =
      lilyPad(620, 838, 1.2) + diff(640, 826, 24, lotus(640, 828, '#ff9fc0'), lotus(640, 828, '#fff4f8')) +
      lilyPad(800, 848, 1.1) + diff(800, 838, 24, `<g transform="translate(800 846) scale(0.62) translate(-800 -846)">${frog(800, 846, blink(2.9, 0.3))}</g>`, '') +
      lilyPad(680, 860, 0.9) + lotus(690, 852, '#ff9fc0') + lilyPad(880, 820, 0.8)
    const duck = (x: number, y: number) =>
      `<path d="M${x + 14} ${y - 6}l8-6l-2 10z" fill="#3a4a5a" ${Ow(1.2)}/><ellipse cx="${x + 2}" cy="${y - 6}" rx="16" ry="8" fill="#b07a44" ${Ow(1.4)}/>` +
      `<path d="M${x + 2} ${y - 12}q6-10 10 0z" fill="#f28a3a" ${Ow(1.2)}/><ellipse cx="${x - 6}" cy="${y - 4}" rx="6" ry="5" fill="#7b4a8a"/>` +
      `<circle cx="${x - 12}" cy="${y - 16}" r="7" fill="#f28a3a" ${Ow(1.4)}/><path d="M${x - 16} ${y - 18}q6-4 10 2" fill="none" stroke="#fff" stroke-width="2.4"/><circle cx="${x - 14}" cy="${y - 17}" r="1.3" fill="${INK}"/>` +
      `<path d="M${x - 19} ${y - 16}l-6 1l6 2z" fill="#e63946" ${Ow(1)}/>`
    const ducks = anim({ type: 'path', points: [[0, 0], [-80, 6], [-40, 14]], period: 14 },
      anim({ type: 'keys', period: 1.6, keys: [{ t: 0, y: 0 }, { t: 0.8, y: 2, ease: 'inOut' }] }, duck(780, 800) + duck(812, 806)))
    // In B a koi jumps out of the water while the panda flies over.
    const KOI: [number, number] = [716, 776]
    const jumpingKoi = diff(KOI[0], KOI[1], 26, '',
      keys('koi', [{ t: 0, x: -24, y: 50, rot: -60, o: 0, ease: 'step' }, { t: 8.15, o: 1, ease: 'linear' }, { t: 8.8, x: 0, y: 0, rot: 0, ease: 'linear' }, { t: 9.45, x: 24, y: 50, rot: 60, o: 1, ease: 'step' }, { t: 9.5, o: 0, ease: 'step' }], KOI,
        koi(KOI[0], KOI[1], '#ff7b3a', '#fff', false)),
      'koi', during(8.15, 9.5))
    const splashes = [8.15, 9.45].map((t) => once([{ t: 0, sx: 0.4, sy: 0.4, o: 0, ease: 'step' }, { t, o: 1, ease: 'out' }, { t: t + 0.4, sx: 1.4, sy: 1.4, o: 1, ease: 'step' }, { t: t + 0.45, o: 0, ease: 'step' }], [t === 8.15 ? 692 : 740, 826],
      `<ellipse cx="${t === 8.15 ? 692 : 740}" cy="826" rx="16" ry="4" fill="none" stroke="#fff" stroke-width="2"/>`)).join('')
    // The red-crowned crane standing in the shallows; in B it lifts one leg.
    const CX = 852
    const craneLeg = `<path d="M${CX + 6} 812v-34" stroke="${INK}" stroke-width="2.6"/>`
    const crane =
      `<path d="M${CX - 4} 812v-34" stroke="${INK}" stroke-width="2.6"/>` +
      diff(CX + 6, 792, 22, craneLeg,
        once(showIn([0, 7.6], [9.8, LOOP]), [CX + 6, 812], craneLeg) +
          once(showIn([7.6, 9.8]), [CX + 6, 812], `<path d="M${CX + 6} 778l8 10l-6 6" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`),
        undefined, during(7.6, 9.8)) +
      `<ellipse cx="${CX + 2}" cy="768" rx="22" ry="12" fill="#fff" ${Ow(1.8)}/><path d="M${CX + 16} 764q14 4 16 14q-12-2-18-8z" fill="#2b2b3a" ${Ow(1.4)}/>` +
      anim({ type: 'keys', period: 4, keys: [{ t: 0, rot: 0 }, { t: 1.8, ease: 'inOut' }, { t: 2.2, rot: 30 }, { t: 3.2, ease: 'inOut' }, { t: 3.6, rot: 0 }], pivot: [CX - 10, 764] },
        `<path d="M${CX - 10} 764q-10-20-4-40" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M${CX - 10} 764q-10-20-4-40" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M${CX - 13} 740q-1-10 1-14" fill="none" stroke="#2b2b3a" stroke-width="4"/>` +
          `<circle cx="${CX - 13}" cy="722" r="6" fill="#fff" ${Ow(1.4)}/><circle cx="${CX - 12}" cy="718" r="3" fill="#e63946"/><circle cx="${CX - 15}" cy="722" r="1.2" fill="${INK}"/><path d="M${CX - 18} 722l-14 3l14 2z" fill="#9aa060" ${Ow(1)}/>`)
    const toro = (x: number, y: number, knob: boolean) =>
      groundShadow(x, y, 22, 4) +
      `<rect x="${x - 16}" y="${y - 8}" width="32" height="8" fill="#a9a39a" ${Ow(1.4)}/><rect x="${x - 6}" y="${y - 44}" width="12" height="36" fill="#b9b3a8" ${Ow(1.4)}/>` +
      `<rect x="${x - 14}" y="${y - 52}" width="28" height="8" fill="#a9a39a" ${Ow(1.4)}/><rect x="${x - 11}" y="${y - 76}" width="22" height="24" fill="#b9b3a8" ${Ow(1.4)}/>` +
      `<rect x="${x - 6}" y="${y - 72}" width="12" height="14" fill="#ffd56a" ${Ow(1)}/>` +
      anim({ type: 'blink', duty: 0.5, period: 1.4, phase: (x % 3) / 3 }, `<rect x="${x - 5}" y="${y - 71}" width="10" height="12" fill="#fff4c0" fill-opacity="0.6"/>`) +
      `<path d="M${x - 22} ${y - 76}l8-14h28l8 14z" fill="#8f8a80" ${Ow(1.6)}/>` +
      (knob ? diff(x, y - 96, 18, `<path d="M${x - 4} ${y - 90}q0-10 4-12q4 2 4 12z" fill="#8f8a80" ${Ow(1.3)}/>`, '') : '')
    const L1: [number, number] = [495, 792]
    const L2: [number, number] = [905, 790]
    const dfly = diff(L2[0] + 9, L2[1] - 99, 26, '',
      keys('dfly', [{ t: 0, x: 60, y: -40, o: 0, ease: 'step' }, { t: 10.4, o: 1, ease: 'out' }, { t: 10.9, x: 0, y: 0, ease: 'step' }, { t: 12.7, ease: 'in' }, { t: 13.2, x: -50, y: -40, o: 1, ease: 'step' }, { t: 13.25, o: 0, ease: 'step' }], [L2[0], L2[1] - 96],
        dragonfly(L2[0] - 4, L2[1] - 96, (m) => anim({ type: 'keys', period: 0.1, keys: [{ t: 0, sy: 1 }, { t: 0.05, sy: 0.5 }], pivot: [L2[0] - 4, L2[1] - 100] }, m))),
      'dfly', during(10.4, 13.25))

    // --- The bamboo grove, and the stalk the panda bends (three segments; its leafy top snaps off in the flight). ---
    const grove = bambooClump(130, 800, 1.2, 6, sway(1.4, 3.6)) + bambooClump(330, 770, 0.9, 4, sway(1.4, 4))
    const [sx0, sy0] = STALK
    const stalkSeg = (y0: number) =>
      `<rect x="${sx0 - 8}" y="${y0 - SEG_LEN - 3}" width="16" height="${SEG_LEN + 6}" rx="6" fill="url(#ke-bamboo)" ${Ow(1.8)}/>` +
      `<path d="M${sx0 - 9} ${y0}h18" stroke="#5c8a2a" stroke-width="3.4" stroke-linecap="round"/>`
    const leafyTop = (x: number, y: number) => bambooLeaves(x, y, 1.1) + bambooLeaves(x - 4, y + 8, 0.9)
    const stick = (x: number, y: number, rot: number) =>
      `<g transform="rotate(${rot} ${x} ${y})"><rect x="${x - 5}" y="${y - 40}" width="10" height="56" rx="4" fill="url(#ke-bamboo)" ${Ow(1.6)}/><path d="M${x - 5} ${y - 14}h10" stroke="#5c8a2a" stroke-width="2.4"/></g>`

    // --- The panda. ---
    const [px, py] = PANDA
    const pandaHead = (x: number, y: number, eyes: string, mouth: string) =>
      `<circle cx="${x - 24}" cy="${y - 24}" r="10" fill="#2b2b3a" ${Ow(1.6)}/><circle cx="${x + 24}" cy="${y - 24}" r="10" fill="#2b2b3a" ${Ow(1.6)}/>` +
      `<circle cx="${x}" cy="${y}" r="30" fill="url(#c15-fur)" ${Ow(2)}/>` +
      `<ellipse cx="${x - 12}" cy="${y - 2}" rx="8" ry="11" transform="rotate(30 ${x - 12} ${y - 2})" fill="#2b2b3a"/><ellipse cx="${x + 12}" cy="${y - 2}" rx="8" ry="11" transform="rotate(-30 ${x + 12} ${y - 2})" fill="#2b2b3a"/>` +
      eyes + `<ellipse cx="${x}" cy="${y + 10}" rx="5" ry="3.6" fill="#2b2b3a"/>` + mouth +
      `<circle cx="${x - 20}" cy="${y + 12}" r="5" fill="#ffb3c0" fill-opacity="0.5"/><circle cx="${x + 20}" cy="${y + 12}" r="5" fill="#ffb3c0" fill-opacity="0.5"/>`
    const openEyes = (x: number, y: number) => `<circle cx="${x - 11}" cy="${y - 2}" r="3" fill="#fff"/><circle cx="${x + 11}" cy="${y - 2}" r="3" fill="#fff"/><circle cx="${x - 10.4}" cy="${y - 2}" r="1.5" fill="${INK}"/><circle cx="${x + 11.6}" cy="${y - 2}" r="1.5" fill="${INK}"/>`
    const happyEyes = (x: number, y: number) => `<path d="M${x - 15} ${y - 1}q4-4 8 0M${x + 7} ${y - 1}q4-4 8 0" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>`
    const smile = (x: number, y: number) => `<path d="M${x - 5} ${y + 16}q5 4 10 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`
    const body = (x: number, y: number) =>
      `<ellipse cx="${x - 20}" cy="${y - 8}" rx="15" ry="10" fill="#2b2b3a" ${Ow(1.6)}/><ellipse cx="${x + 20}" cy="${y - 8}" rx="15" ry="10" fill="#2b2b3a" ${Ow(1.6)}/>` +
      `<ellipse cx="${x}" cy="${y - 46}" rx="38" ry="42" fill="url(#c15-fur)" ${Ow(2)}/><path d="M${x - 36} ${y - 62}q36-22 72 0q-4 12-10 16q-26-12-52 0q-6-4-10-16z" fill="#2b2b3a"/>`
    const limb = (x: number, y: number, ex: number, ey: number) =>
      `<path d="M${x} ${y}L${ex} ${ey}" stroke="${INK}" stroke-width="20" stroke-linecap="round"/><path d="M${x} ${y}L${ex} ${ey}" stroke="#2b2b3a" stroke-width="16" stroke-linecap="round"/>`
    // Sitting in the bamboo, chewing a shoot.
    const pandaSit =
      body(px, py) +
      anim({ type: 'keys', period: 0.6, keys: [{ t: 0, rot: 0 }, { t: 0.3, rot: -8, ease: 'inOut' }], pivot: [px - 20, py - 60] },
        stick(px - 4, py - 76, 60) + limb(px - 26, py - 60, px - 6, py - 74)) +
      limb(px + 26, py - 60, px + 10, py - 70) +
      pandaHead(px, py - 100, happyEyes(px, py - 100), anim({ type: 'keys', period: 0.3, keys: [{ t: 0, sy: 1 }, { t: 0.15, sy: 0.4, ease: 'inOut' }], pivot: [px, py - 84] }, `<ellipse cx="${px}" cy="${py - 84}" rx="5" ry="3" fill="#7a2a2a"/>`))
    // Standing and jumping, arms up.
    const armsUp = (x: number, y: number) => limb(x - 28, y - 64, x - 12, y - 140) + limb(x + 28, y - 64, x + 12, y - 140)
    const pandaJump = body(px, py) + armsUp(px, py) + pandaHead(px, py - 100, openEyes(px, py - 100), smile(px, py - 100))
    // Hanging from the stalk's top (drawn with its paws at TOP), munching the leaves.
    const [tx, ty] = TOP
    const hy = ty + 150
    const pandaHang =
      body(tx, hy) + armsUp(tx, hy) +
      pandaHead(tx, hy - 100, happyEyes(tx, hy - 100), anim({ type: 'keys', period: 0.3, keys: [{ t: 0, sy: 1 }, { t: 0.15, sy: 0.4, ease: 'inOut' }], pivot: [tx, hy - 84] }, `<ellipse cx="${tx}" cy="${hy - 84}" rx="6" ry="3.4" fill="#7a2a2a"/>`)) +
      // One last leaf, just out of reach: eyes wide as its feet leave the ground.
      once(showIn([7.35, 7.8]), [tx, hy - 100], `<circle cx="${tx - 11}" cy="${hy - 102}" r="5" fill="#fff" ${Ow(1)}/><circle cx="${tx + 11}" cy="${hy - 102}" r="5" fill="#fff" ${Ow(1)}/><circle cx="${tx - 11}" cy="${hy - 102}" r="1.6" fill="${INK}"/><circle cx="${tx + 11}" cy="${hy - 102}" r="1.6" fill="${INK}"/>`)
    // Curled up, tumbling through the air with the snapped top in its paw.
    const BALL: [number, number] = [px, py - 60]
    const pandaFly = anim({ type: 'rotate', pivot: BALL, period: 0.55 },
      stick(px + 30, py - 104, 30) + `<g transform="rotate(30 ${px + 30} ${py - 104})">${leafyTop(px + 30, py - 144)}</g>` +
        `<circle cx="${px}" cy="${py - 60}" r="40" fill="url(#c15-fur)" ${Ow(2)}/>` +
        limb(px - 30, py - 80, px - 44, py - 60) + limb(px + 24, py - 84, px + 32, py - 100) + limb(px - 20, py - 26, px - 30, py - 14) + limb(px + 20, py - 26, px + 34, py - 18) +
        pandaHead(px, py - 70, `<path d="M${px - 15} ${py - 72}l8 4M${px + 7} ${py - 68}l8-4" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`, `<ellipse cx="${px}" cy="${py - 56}" rx="5" ry="6" fill="#7a2a2a"/>`))
    // In the heap: head and shoulders out, an arm up with the top (then the bare stick); dazed, pleased, robbed,
    // chewing.
    const hx = px
    const hyy = py - 66
    const pandaPile =
      `<ellipse cx="${px}" cy="${py - 24}" rx="38" ry="34" fill="url(#c15-fur)" ${Ow(2)}/><path d="M${px - 36} ${py - 36}q36-22 72 0q-4 12-10 16q-26-12-52 0q-6-4-10-16z" fill="#2b2b3a"/>` +
      once(showIn([9.75, 16.2]), PANDA, limb(px + 28, py - 36, px + 40, py - 70) + stick(px + 40, py - 80, 10) +
        once(showIn([9.75, 14.7]), PANDA, leafyTop(px + 43, py - 118))) +
      once(showIn([16.2, LOOP]), PANDA,
        anim({ type: 'keys', period: 0.6, keys: [{ t: 0, rot: 0 }, { t: 0.3, rot: -6, ease: 'inOut' }], pivot: [px + 20, py - 40] },
          stick(px + 8, py - 70, 70) + limb(px + 28, py - 36, px + 10, py - 62))) +
      limb(px - 28, py - 36, px - 40, py - 20) +
      pandaHead(hx, hyy,
        once(showIn([9.75, 12.4]), PANDA, `<path d="M${hx - 11} ${hyy - 2}m-1 0a1 1 0 1 1 2 0a2.4 2.4 0 1 1-4.8 0a3.6 3.6 0 1 1 7.2 0M${hx + 11} ${hyy - 2}m-1 0a1 1 0 1 1 2 0a2.4 2.4 0 1 1-4.8 0a3.6 3.6 0 1 1 7.2 0" fill="none" stroke="#fff" stroke-width="1.6"/>`) +
          once(showIn([12.4, 14.6]), PANDA, openEyes(hx, hyy)) +
          once(showIn([14.6, 15.8]), PANDA, `<circle cx="${hx - 11}" cy="${hyy - 2}" r="5" fill="#fff" ${Ow(1)}/><circle cx="${hx + 11}" cy="${hyy - 2}" r="5" fill="#fff" ${Ow(1)}/><circle cx="${hx - 11}" cy="${hyy - 2}" r="1.6" fill="${INK}"/><circle cx="${hx + 11}" cy="${hyy - 2}" r="1.6" fill="${INK}"/>`) +
          once(showIn([15.8, LOOP]), PANDA, happyEyes(hx, hyy)),
        once(showIn([9.75, 14.6]), PANDA, `<path d="M${hx - 6} ${hyy + 16}q3 3 6 0q3 3 6 0" fill="none" stroke="${INK}" stroke-width="1.6"/>`) +
          once(showIn([14.6, 16.2]), PANDA, `<ellipse cx="${hx}" cy="${hyy + 18}" rx="4" ry="5" fill="#7a2a2a"/>`) +
          once(showIn([16.2, LOOP]), PANDA, anim({ type: 'keys', period: 0.3, keys: [{ t: 0, sy: 1 }, { t: 0.15, sy: 0.4, ease: 'inOut' }], pivot: [hx, hyy + 16] }, `<ellipse cx="${hx}" cy="${hyy + 16}" rx="5" ry="3" fill="#7a2a2a"/>`))) +
      // A lily pad landed on its head in the splash.
      `<path d="M${hx - 26} ${hyy - 26}q26-16 52 0q-26 10-52 0z" fill="#5aa845" ${Ow(1.8)}/><path d="M${hx} ${hyy - 28}l12 5" stroke="#468a35" stroke-width="1.4"/>` +
      // Stars circling the dazed head.
      once(showIn([9.9, 12.4]), PANDA, anim({ type: 'rotate', pivot: [hx, hyy - 40], period: 1.1 },
        [0, 120, 240].map((a) => `<path transform="rotate(${a} ${hx} ${hyy - 40})" d="M${hx} ${hyy - 58}l2 4l4 1l-3 3l1 4l-4-2l-4 2l1-4l-3-3l4-1z" fill="#ffd23f" ${Ow(1)}/>`).join('')))
    const panda = keys('panda', pandaKeys, PANDA,
      once(showIn([0, 4.6]), PANDA, groundShadow(px, py, 44, 6) + pandaSit) +
        once(showIn([4.6, HANG[0]]), PANDA, groundShadow(px, py, 44, 6) + pandaJump) +
        once(showIn([HANG[1], 9.75]), PANDA, pandaFly) +
        once(showIn([9.75, LOOP]), PANDA, pandaPile))
    // The stalk, segment in segment; the leafy top and the hanging panda (upright) in the last one.
    const [tx0, ty0] = TOP
    let stalk = once(showIn([0, HANG[1]]), TOP, leafyTop(tx0, ty0)) + once(showIn([HANG[0], HANG[1]]), TOP, keys(undefined, uprightKeys, TOP, pandaHang))
    for (let i = SEG_SHARE.length - 1; i >= 0; i--) {
      const y0 = sy0 - i * SEG_LEN
      stalk = keys(undefined, segKeys(i), [sx0, y0], stalkSeg(y0) + stalk)
    }
    const stalkShadow = groundShadow(sx0, sy0, 26, 5)

    // --- The red panda: watching by the maple, sneaking up, off with the leaves up the tree. ---
    const [rx, ry] = RED
    const redPanda = keys('red', redKeys, RED,
      anim({ type: 'sway', angle: 10, pivot: [rx + 18, ry - 16], period: 1.6 },
        `<path d="M${rx + 18} ${ry - 16}q30 0 30-30q0-14-10-14" fill="none" stroke="${INK}" stroke-width="15" stroke-linecap="round"/><path d="M${rx + 18} ${ry - 16}q30 0 30-30q0-14-10-14" fill="none" stroke="#c8552a" stroke-width="11" stroke-linecap="round"/>` +
          `<path d="M${rx + 36} ${ry - 18}l8 6M${rx + 46} ${ry - 32}l10 0M${rx + 44} ${ry - 50}l8-6" stroke="#f2c38a" stroke-width="4" stroke-linecap="round"/>`) +
        `<path d="M${rx - 10} ${ry}v-10M${rx + 10} ${ry}v-10" stroke="#3a2414" stroke-width="7" stroke-linecap="round"/>` +
        `<ellipse cx="${rx + 2}" cy="${ry - 18}" rx="22" ry="14" fill="url(#c15-red)" ${Ow(1.8)}/><ellipse cx="${rx - 2}" cy="${ry - 12}" rx="12" ry="7" fill="#3a2414"/>` +
        `<path d="M${rx - 28} ${ry - 44}l2-14l10 8zM${rx - 6} ${ry - 44}l-2-14l-10 8z" fill="#c8552a" ${Ow(1.4)}/><path d="M${rx - 25} ${ry - 50}l1-5M${rx - 9} ${ry - 50}l-1-5" stroke="#fff" stroke-width="2.4"/>` +
        `<circle cx="${rx - 17}" cy="${ry - 34}" r="13" fill="url(#c15-red)" ${Ow(1.8)}/>` +
        `<path d="M${rx - 28} ${ry - 32}q11 12 22 0q-4 8-11 8t-11-8z" fill="#fff4e8"/><path d="M${rx - 25} ${ry - 40}h5M${rx - 14} ${ry - 40}h5" stroke="#fff4e8" stroke-width="3" stroke-linecap="round"/>` +
        `<circle cx="${rx - 22}" cy="${ry - 35}" r="2" fill="${INK}"/><circle cx="${rx - 12}" cy="${ry - 35}" r="2" fill="${INK}"/><ellipse cx="${rx - 17}" cy="${ry - 29}" rx="3" ry="2.2" fill="${INK}"/>` +
        once(showIn([14.7, LOOP]), RED, `<g transform="rotate(-20 ${rx - 30} ${ry - 30})">${leafyTop(rx - 30, ry - 30)}</g>`) +
        once(showIn([16.3, LOOP]), RED, anim({ type: 'keys', period: 0.3, keys: [{ t: 0, sy: 1 }, { t: 0.15, sy: 0.4, ease: 'inOut' }], pivot: [rx - 17, ry - 26] }, `<ellipse cx="${rx - 17}" cy="${ry - 26}" rx="3" ry="2" fill="#7a2a2a"/>`)))

    return (
      `<defs>${NATURE_DEFS}${JUNGLE_DEFS}` +
      `<linearGradient id="c15-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ec5e8"/><stop offset="0.65" stop-color="#d4ebf2"/><stop offset="1" stop-color="#f6f0e0"/></linearGradient>` +
      `<radialGradient id="c15-glow"><stop offset="0" stop-color="#fff4cc" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffe9a8" stop-opacity="0.4"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c15-peak" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a6b6c8"/><stop offset="1" stop-color="#cbd6dc"/></linearGradient>` +
      `<linearGradient id="c15-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fc46a"/><stop offset="1" stop-color="#5f9a46"/></linearGradient>` +
      `<linearGradient id="c15-gravel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6dcc0"/><stop offset="1" stop-color="#d4c8a6"/></linearGradient>` +
      `<radialGradient id="c15-water" cx="0.55" cy="0.35" r="0.75"><stop offset="0" stop-color="#9fd8e8"/><stop offset="0.6" stop-color="#5fb0c8"/><stop offset="1" stop-color="#3a86a8"/></radialGradient>` +
      `<linearGradient id="c15-tiles" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f7a70"/><stop offset="1" stop-color="#2f5048"/></linearGradient>` +
      `<linearGradient id="c15-wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a5a32"/><stop offset="1" stop-color="#b07a44"/></linearGradient>` +
      `<radialGradient id="c15-maple" cx="0.62" cy="0.3" r="0.85"><stop offset="0" stop-color="#ff9a5a"/><stop offset="0.55" stop-color="#e0502e"/><stop offset="1" stop-color="#a8301c"/></radialGradient>` +
      `<radialGradient id="c15-fur" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#ffffff"/><stop offset="0.7" stop-color="#f1efe6"/><stop offset="1" stop-color="#d8d4c6"/></radialGradient>` +
      `<radialGradient id="c15-red" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#f08a4a"/><stop offset="1" stop-color="#b0451f"/></radialGradient>` +
      `<radialGradient id="c15-sunlight" cx="0.2" cy="0.15" r="1"><stop offset="0" stop-color="#fff2c4" stop-opacity="0.3"/><stop offset="0.5" stop-color="#fff2c4" stop-opacity="0.06"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></radialGradient></defs>` +
      sky +
      ground +
      tufts +
      grove +
      pagoda +
      parasol +
      maple +
      broom +
      table +
      pond +
      fishes +
      jumpingKoi +
      splashes +
      bridge +
      pondPlants +
      ducks +
      crane +
      toro(...L1, true) +
      toro(...L2, false) +
      dfly +
      `<g>${pileBack}</g>` +
      stalkShadow +
      stalk +
      redPanda +
      pileFront +
      panda +
      waterline +
      burst +
      falling +
      `<rect width="${W}" height="${H}" fill="url(#c15-sunlight)"/>`
    )
  },
})
