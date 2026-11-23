// Cartoon "The beaver's dam" (docs/cartoon-mode.md), made like 812: a 20 s story on a northern river told by a camera.
// A beaver swims its last log across the pond and sets it on top of its dam, proudly slapping its tail. A moose comes
// along the bank to drink, puts a hoof on the dam — crack! It bursts, sticks fly into the moose's antlers, and the
// beaver rides its log down the rapids like a surfer, a salmon leaping over it — until the log hits a rock and flings
// it through the air, right onto the moose's antlers, where it calmly starts building again. Twelve differences: two
// hard (a mark on the paper birch, a cone of the fir by the falls), three events of B (an otter cracking a shell, a
// loon diving, a salmon leaping up the falls).
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { butterflyAt, dragonfly, farBird, frog, grassTuft, groundShadow, INK, keenOwl, NATURE_DEFS, O, Ow, puffCloud, swingKeys } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // The pond: the lodge, the birches, the owl on its snag; the beaver swims its last log to the dam.
  { t: 1.6, x: 0, y: 440, w: 640, ease: 'inOut' },
  { t: 4.6, x: 160, y: 440, w: 640, ease: 'step' },
  // On top of the dam: the log goes on, the tail slaps.
  { t: 4.65, x: 500, y: 500, w: 300, ease: 'step' },
  // A moose comes along the bank, past the canoe.
  { t: 6.6, x: 720, y: 410, w: 720, ease: 'inOut' },
  { t: 9.6, x: 520, y: 410, w: 720, ease: 'step' },
  // A hoof on the dam — crack!
  { t: 9.65, x: 480, y: 390, w: 440, ease: 'step' },
  // Surfing down the rapids, a salmon over its head.
  { t: 11.6, x: 600, y: 490, w: 560, ease: 'inOut' },
  { t: 14.3, x: 880, y: 490, w: 560, ease: 'step' },
  // Flung through the air...
  { t: 14.35, x: 560, y: 330, w: 640, ease: 'step' },
  // ...onto the antlers: building again.
  { t: 15.6, x: 560, y: 360, w: 320 },
  { t: 19.95, x: 566, y: 362, w: 310, ease: 'step' },
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

/** The water: the pond above the dam, the river below it, the falls at the right. */
const POND_TOP = 640
const RIVER_TOP = 656
const FALLS_X = 1180
/** The dam across the river; its top. */
const DAM: [number, number] = [650, 630]
/** When the moose's hoof breaks it. */
const CRACK = 9.9
/** When the log hits the rock and flings the beaver; when the beaver lands on the antlers. */
const ROCK_HIT = 14.25
const LANDED = 15.5

/** The beaver's feet when it stands on the dam's top. */
const BEAVER: [number, number] = [632, 634]
/** The moose's feet where it stops by the dam (it walks in from the right). */
const MOOSE: [number, number] = [790, 644]
const MOOSE_WALK: [number, number] = [6.6, 9]
/** Where the beaver sits on the antlers (offset from BEAVER). */
const ON_ANTLERS: [number, number] = [56, -196]

function beaverKeys(): Keyframe[] {
  const k: Keyframe[] = [{ t: 0, x: -430, y: 56, rot: 0 }]
  // Swimming across the pond, bobbing.
  for (let i = 1; i <= 10; i++) k.push({ t: 0.3 + i * 0.33, x: Math.round(-430 + (i * 380) / 10), y: 56 + (i % 2 ? 3 : 0), ease: 'inOut' })
  k.push(
    // Up onto the dam.
    { t: 3.9, x: -40, y: 20, ease: 'out' },
    { t: 4.3, x: 0, y: 0, ease: 'inOut' },
    { t: CRACK, ease: 'in' },
    // The dam bursts: down onto the log in the rush.
    { t: 10.15, x: 18, y: 52, rot: 0, ease: 'inOut' },
  )
  // Surfing down the rapids, balancing.
  for (let i = 1; i <= 10; i++) k.push({ t: Math.round((10.15 + i * 0.41) * 100) / 100, x: Math.round(18 + (i * 440) / 10), y: 52 + (i % 2 ? -6 : 0), rot: i % 2 ? 10 : -10, ease: 'inOut' })
  k.push(
    { t: ROCK_HIT, x: 458, y: 52, rot: 0, ease: 'out' },
    // Flung, spinning, onto the antlers.
    { t: 14.9, x: 260, y: -280, rot: 400, ease: 'in' },
    { t: LANDED, x: ON_ANTLERS[0], y: ON_ANTLERS[1], rot: 720, ease: 'out' },
    { t: 15.7, y: ON_ANTLERS[1] + 4, ease: 'inOut' },
    { t: 15.9, y: ON_ANTLERS[1], ease: 'step' },
    { t: 19.95, ease: 'step' },
  )
  return k
}

/** The last log: pushed across the pond, set on the dam, carried off by the rush, stopped by the rock. */
const LOG: [number, number] = [DAM[0] + 4, DAM[1] - 4]
function logKeys(): Keyframe[] {
  const k: Keyframe[] = [{ t: 0, x: -390, y: 64, rot: 0 }]
  for (let i = 1; i <= 10; i++) k.push({ t: 0.3 + i * 0.33, x: Math.round(-390 + (i * 380) / 10), y: 64 + (i % 2 ? 3 : 0), ease: 'inOut' })
  k.push(
    // Lifted onto the dam's top.
    { t: 3.95, x: -10, y: 40, ease: 'inOut' },
    { t: 4.6, x: 0, y: 0, ease: 'out' },
    { t: CRACK, ease: 'in' },
    { t: 10.15, x: 18, y: 68, ease: 'inOut' },
  )
  for (let i = 1; i <= 10; i++) k.push({ t: Math.round((10.15 + i * 0.41) * 100) / 100, x: Math.round(18 + (i * 440) / 10), y: 68 + (i % 2 ? -4 : 2), rot: i % 2 ? 4 : -4, ease: 'inOut' })
  k.push({ t: ROCK_HIT, x: 458, y: 70, rot: 0, ease: 'out' }, { t: 14.45, rot: -24, ease: 'inOut' }, { t: 14.8, rot: -8, ease: 'step' }, { t: 19.95, ease: 'step' })
  return k
}

export default svgLevel({
  id: 820,
  chapter: 'cartoon',
  title: 'cartoonBeaverDam',
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
    const sway = (pivot: [number, number], angle: number, period: number) => (m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 11) / 11 }, m)
    /** A comic starburst centred on (x, y), r across. */
    const burst = (x: number, y: number, r: number, fill = '#ffe066') => {
      let d = ''
      for (let i = 0; i < 16; i++) {
        const a = (i * Math.PI) / 8
        const rr = i % 2 ? r * 0.5 : r
        d += `${i ? 'L' : 'M'}${Math.round(x + Math.cos(a) * rr)} ${Math.round(y + Math.sin(a) * rr)}`
      }
      return `<path d="${d}z" fill="${fill}" ${Ow(1.8)}/>`
    }
    /** A pop of `markup` at time t: grows, holds a moment, gone. */
    const pop = (t: number, at: [number, number], markup: string, hold = 0.3) =>
      once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t, o: 1, ease: 'out' }, { t: t + 0.12, sx: 1.15, sy: 1.15, ease: 'inOut' }, { t: t + hold, sx: 1, sy: 1, o: 1, ease: 'step' }, { t: t + hold + 0.05, o: 0, ease: 'step' }], at, markup)
    /** Water drops flying from `at` at time t. */
    const splash = (at: [number, number], t: number, n: number, spread = 18) => {
      let m = ''
      for (let i = 0; i < n; i++) {
        const dx = Math.round((i - (n - 1) / 2) * spread)
        const up = Math.round(40 + (i % 3) * 26)
        m += once([{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t, o: 1, ease: 'out' }, { t: t + 0.3, x: dx, y: -up, ease: 'in' }, { t: t + 0.65, x: dx * 1.4, y: 10, o: 1, ease: 'step' }, { t: t + 0.7, o: 0, ease: 'step' }], at,
          `<path d="M${at[0]} ${at[1] - 7}q5 7 0 11q-5-4 0-11z" fill="#d8f0fb" ${Ow(1.2)}/>`)
      }
      return m
    }

    // --- Sky, far mountains with snow, the dark fir forest along the far shore. ---
    let firLine = ''
    for (let i = 0; i < 40; i++) {
      const fx = Math.round(i * 37 + rand() * 18)
      const fy = Math.round(560 + rand() * 18)
      const h = Math.round(50 + rand() * 40)
      firLine += `<path d="M${fx} ${fy - h}l${Math.round(h * 0.28)} ${h}h-${Math.round(h * 0.56)}z" fill="#3f6f5a"/>`
    }
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c20-sky)"/>` +
      `<circle cx="1180" cy="140" r="190" fill="url(#c20-glow)"/>` +
      `<circle cx="1180" cy="140" r="42" fill="#ffd56a" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="1167" cy="133" rx="4.5" ry="7" fill="${INK}"/><ellipse cx="1193" cy="133" rx="4.5" ry="7" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.5, phase: 0.3 }, `<rect x="1158" y="125" width="44" height="18" fill="#ffd56a"/><path d="M1160 134h12M1188 134h12" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<path d="M1164 154q16 12 32 0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
      anim({ type: 'path', points: [[0, 0], [140, 0]], period: 36 }, puffCloud(260, 130, 1)) +
      anim({ type: 'path', points: [[0, 0], [-120, 0]], period: 30 }, puffCloud(780, 90, 0.8)) +
      keys(undefined, [{ t: 0, x: 0, y: 0 }, { t: 19.9, x: -1700, y: 40 }], [1480, 230],
        ([[1480, 230], [1502, 220], [1506, 244], [1528, 212]] as [number, number][]).map(([fx, fy], i) => farBird(fx, fy, beat([fx, fy - 2], 0.5, i * 0.2))).join('')) +
      // Mountains with snow, hazy.
      `<path d="M0 520l140-150l90 80l150-190l130 150l110-90l170 160l150-170l170 180l120-110l210 170V600H0z" fill="url(#c20-mount)"/>` +
      `<path d="M380 260l-46 52l18-4l20 16l22-20l20 6zM810 290l-40 46l14 0l26 14l18-16l22 2zM1170 300l-36 40l14 0l20 10l18-14l18 0z" fill="#f4f8fb"/>` +
      `<rect y="430" width="${W}" height="180" fill="url(#c20-haze)"/>` +
      firLine +
      `<path d="M0 600q260-30 520-14t520-6t400-14V680H0z" fill="url(#c20-bank)"/>`

    // --- The far bank's trees: paper birches (a mark fewer on one in B: a hard one), the dead snag with the owl, a red
    // squirrel (a cone in its paws in A only), the fir by the falls (a cone fewer in B: a hard one). ---
    const paperBirch = (x: number, y: number, s: number, marks: [number, number][], period: number) => {
      const k = (n: number) => Math.round(n * s * 10) / 10
      let peel = ''
      for (const [dy, w] of marks) peel += `<path d="M${x - k(6)} ${y - k(dy)}h${k(w)}" stroke="${INK}" stroke-width="${k(3)}" stroke-linecap="round"/>`
      return (
        groundShadow(x - k(20), y, k(56), k(9)) +
        `<path d="M${x - k(8)} ${y}q${k(4)}-${k(120)}-${k(2)}-${k(220)}h${k(12)}q-${k(2)} ${k(110)} ${k(6)} ${k(220)}z" fill="url(#c20-birch)" ${O}/>` +
        `<path d="M${x + k(4)} ${y - k(60)}l${k(5)} ${k(3)}l-${k(3)} ${k(5)}M${x - k(3)} ${y - k(150)}l-${k(5)} ${k(3)}l${k(3)} ${k(5)}" fill="none" stroke="#c9b89a" stroke-width="${k(1.6)}"/>` +
        peel +
        sway([x, y - k(210)], 2, period)(
          `<path d="M${x} ${y - k(200)}q-${k(30)}-${k(20)}-${k(50)}-${k(10)}M${x + k(2)} ${y - k(190)}q${k(30)}-${k(24)} ${k(52)}-${k(14)}" fill="none" stroke="#e9e2d2" stroke-width="${k(5)}" stroke-linecap="round"/>` +
            [[-46, -230, 34], [42, -236, 36], [0, -268, 40], [-20, -200, 28], [28, -204, 26]]
              .map(([dx, dy, r]) => `<circle cx="${x + k(dx)}" cy="${y + k(dy)}" r="${k(r)}" fill="url(#c20-birch-leaf)" ${O}/>`)
              .join('') +
            `<path d="M${x - k(54)} ${y - k(226)}q${k(10)}-${k(8)} ${k(20)} 0M${x + k(30)} ${y - k(240)}q${k(10)}-${k(8)} ${k(20)} 0M${x - k(8)} ${y - k(276)}q${k(10)}-${k(8)} ${k(20)} 0" fill="none" stroke="#5a8a2a" stroke-opacity="0.5" stroke-width="${k(3)}" stroke-linecap="round"/>`,
        )
      )
    }
    const birch1 =
      paperBirch(62, 646, 1.05, [[30, 10], [80, 12], [150, 9], [190, 11]], 4.6) +
      diff(62, 560, 18, `<path d="M${62 - 6.3} ${646 - 89.3}h12" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>`, '')
    const SQ: [number, number] = [560, 520]
    const [qx, qy] = SQ
    const squirrelBody =
      anim({ type: 'sway', angle: 10, pivot: [qx - 8, qy - 6], period: 1.3 },
        `<path d="M${qx - 8} ${qy - 6}q-26-6-20-34q14-6 20 10q4 14 0 24z" fill="#c0521f" ${Ow(1.6)}/>`) +
      `<ellipse cx="${qx}" cy="${qy - 10}" rx="9" ry="11" fill="#d9692c" ${Ow(1.6)}/><ellipse cx="${qx + 2}" cy="${qy - 8}" rx="5" ry="7" fill="#f4d9b0"/>` +
      `<circle cx="${qx + 4}" cy="${qy - 24}" r="7" fill="#d9692c" ${Ow(1.6)}/><path d="M${qx} ${qy - 30}l1-8l4 6zM${qx + 7} ${qy - 30}l2-8l3 7z" fill="#d9692c" ${Ow(1.2)}/>` +
      `<circle cx="${qx + 7}" cy="${qy - 25}" r="1.5" fill="${INK}"/><circle cx="${qx + 11}" cy="${qy - 22}" r="1.2" fill="${INK}"/>` +
      `<path d="M${qx + 4} ${qy - 14}q6 0 8 4" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`
    const birch2 =
      paperBirch(520, 646, 0.95, [[40, 10], [110, 9], [170, 10]], 5.2) +
      `<path d="M522 528q30-6 54-4" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M522 528q30-6 54-4" fill="none" stroke="#e9e2d2" stroke-width="4" stroke-linecap="round"/>` +
      squirrelBody +
      diff(qx + 12, qy - 13, 18, `<ellipse cx="${qx + 12}" cy="${qy - 12}" rx="5" ry="7" fill="#8a5a32" ${Ow(1.3)}/><path d="M${qx + 8} ${qy - 14}h8M${qx + 8} ${qy - 10}h8" stroke="#5e3a1c" stroke-width="1.2"/>`, '')
    const snag =
      groundShadow(330, 646, 40, 7) +
      `<path d="M318 646q6-120-2-240l8-10l6 10q4 120 10 240z" fill="#8a8078" ${O}/>` +
      `<path d="M322 520q-30-10-40-34M330 470q24-8 40-6M326 430q-12-14-14-30" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M322 520q-30-10-40-34M330 470q24-8 40-6M326 430q-12-14-14-30" fill="none" stroke="#9a9088" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M324 600q2-30 0-60M330 580q2-20 0-40" fill="none" stroke="#6a625c" stroke-width="2"/>` +
      anim({ type: 'sway', angle: 6, pivot: [358, 466], period: 3.6 }, keenOwl(358, 466, 0.95, blink(3.1, 0.3)))
    const FIR: [number, number] = [1330, 652]
    const [fx0, fy0] = FIR
    const cone = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="8" fill="#8a5a32" ${Ow(1.3)}/><path d="M${x - 3} ${y - 2}h6M${x - 3} ${y + 2}h6" stroke="#5e3a1c" stroke-width="1"/>`
    const fir =
      groundShadow(fx0 - 20, fy0, 70, 10) +
      `<rect x="${fx0 - 7}" y="${fy0 - 30}" width="14" height="30" fill="url(#ke-bark)" ${O}/>` +
      `<path d="M${fx0} ${fy0 - 230}l26 50h-12l30 50h-14l36 60h-14l34 50h-172l34-50h-14l36-60h-14l30-50h-12z" fill="url(#c20-fir)" ${O}/>` +
      `<path d="M${fx0} ${fy0 - 200}l-14 26M${fx0 - 6} ${fy0 - 140}l-22 30M${fx0 - 8} ${fy0 - 80}l-28 34" stroke="#5fa06a" stroke-width="4" stroke-linecap="round"/>` +
      cone(fx0 + 26, fy0 - 150) + cone(fx0 - 30, fy0 - 92) + cone(fx0 + 40, fy0 - 40) +
      diff(fx0 + 34, fy0 - 92, 18, cone(fx0 + 34, fy0 - 92), '')

    // --- The water: the pond (its lodge, a leafy twig stuck in its top in A only; a frog on a lily pad in A only), the dam,
    // the river with its rapids and rocks, the falls (a rainbow in their spray in A only). ---
    const pond =
      `<path d="M0 ${POND_TOP}q300-10 612 6V830H0z" fill="url(#c20-water)"/>` +
      anim({ type: 'keys', period: 3.4, keys: [{ t: 0, x: 0 }, { t: 1.7, x: 14, ease: 'inOut' }] },
        `<path d="M40 700h60M220 760h80M420 690h50M120 800h70M480 740h60" stroke="#fff" stroke-opacity="0.55" stroke-width="3" stroke-linecap="round"/>`) +
      `<path d="M0 830q300-14 612-6l90 0q260 10 478-4V900H0z" fill="url(#c20-near)"/>`
    const lodge =
      `<ellipse cx="180" cy="690" rx="96" ry="52" fill="url(#c20-lodge)" ${O}/>` +
      `<path d="M100 690l40-30M120 712l60-40M150 720l70-46M200 714l40-28M110 670l50 10M170 650l60 18M210 680l40 6" stroke="#5e3a1c" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M84 700q96 26 192 0" fill="none" stroke="#bfe0f0" stroke-opacity="0.8" stroke-width="3"/>` +
      diff(185, 626, 24, `<path d="M176 644l10-34" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M176 644l10-34" stroke="#a0683a" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="193" cy="614" rx="8" ry="4.5" transform="rotate(-30 193 614)" fill="#e8b030" ${Ow(1.2)}/><ellipse cx="176" cy="620" rx="7" ry="4" transform="rotate(30 176 620)" fill="#e07a2a" ${Ow(1.2)}/>`, '')
    const lily = (x: number, y: number, s = 1) =>
      `<path d="M${x} ${y}l${Math.round(18 * s)} -4a${Math.round(22 * s)} 9 0 1 1 -4 -4z" fill="#5aa845" ${Ow(1.6)}/>`
    const pads =
      lily(400, 780) + lily(540, 812, 1.1) + lily(300, 820, 0.9) +
      diff(536, 796, 26, `<g transform="translate(536 808) scale(0.7) translate(-536 -808)">${frog(536, 808, blink(2.6, 0.2))}</g>`, '')
    const cattails = (x: number, y: number) =>
      sway([x, y], 4, 2.6)(
        `<path d="M${x} ${y}v-56M${x + 10} ${y}v-70" stroke="#4f8a33" stroke-width="3"/><rect x="${x - 3}" y="${y - 68}" width="7" height="18" rx="3.5" fill="#7a4a22" ${Ow(1.2)}/><rect x="${x + 7}" y="${y - 84}" width="7" height="20" rx="3.5" fill="#7a4a22" ${Ow(1.2)}/>` +
          `<path d="M${x - 4} ${y}q-14-24-10-50M${x + 14} ${y}q16-20 14-44" fill="none" stroke="#5f9a3a" stroke-width="3"/>`,
      )
    const reeds = cattails(20, 660) + cattails(574, 648) + cattails(1120, 668)
    // The dam: a mound of sticks across the river, whole until the crack, then broken with the water rushing through.
    let damSticks = ''
    for (let i = 0; i < 18; i++) {
      const sx = Math.round(604 + rand() * 92)
      const sy = Math.round(660 + rand() * 150)
      const a = Math.round(-40 + rand() * 80)
      damSticks += `<path transform="rotate(${a} ${sx} ${sy})" d="M${sx - 18} ${sy}h36" stroke="#5e3a1c" stroke-width="5" stroke-linecap="round"/><circle cx="${sx + 18}" cy="${sy}" r="3" fill="#c49462" transform="rotate(${a} ${sx} ${sy})"/>`
    }
    const damWhole =
      `<path d="M576 832l18-170q56-52 112-2l20 172z" fill="url(#c20-dam)" ${O}/>` + damSticks +
      `<path d="M600 660q50-40 100-4" fill="none" stroke="#8a5a32" stroke-width="6" stroke-linecap="round"/>`
    const damBroken =
      `<path d="M576 832l14-130q22-18 42-4l6 134zM666 832l4-136q22-18 40 2l16 134z" fill="url(#c20-dam)" ${O}/>` +
      `<path d="M610 730l20 10M608 770l26-6M676 740l24 8M680 790l22-12" stroke="#5e3a1c" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M640 704h32v126h-32z" fill="#8fd3e8"/>` +
      anim({ type: 'keys', period: 0.5, keys: [{ t: 0, y: 0 }, { t: 0.5, y: 30 }] },
        `<path d="M646 700v40M656 690v50M666 702v36M646 760v40M656 750v50M666 762v36" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-opacity="0.85"/>`)
    const dam = once(showIn([0, CRACK]), DAM, damWhole) + once(showIn([CRACK, LOOP]), DAM, damBroken)
    const river =
      `<path d="M700 ${RIVER_TOP}q240-8 480 2V830H700z" fill="url(#c20-river)"/>` +
      // Rapids: foam moving downstream.
      anim({ type: 'keys', period: 1.2, keys: [{ t: 0, x: 0 }, { t: 1.2, x: 60 }] },
        `<path d="M720 690q20-8 40 0M820 720q20-8 40 0M760 770q20-8 40 0M920 690q20-8 40 0M980 760q20-8 40 0M1060 720q20-8 40 0M860 800q20-8 40 0" fill="none" stroke="#fff" stroke-opacity="0.75" stroke-width="3" stroke-linecap="round"/>`) +
      `<ellipse cx="860" cy="672" rx="26" ry="12" fill="url(#c20-rock)" ${Ow(1.6)}/><ellipse cx="980" cy="806" rx="30" ry="12" fill="url(#c20-rock)" ${Ow(1.6)}/>` +
      `<ellipse cx="1116" cy="716" rx="22" ry="16" fill="url(#c20-rock)" ${Ow(1.6)}/>` +
      `<path d="M700 830q240-6 480 0" fill="none" stroke="#e9f6fb" stroke-opacity="0.7" stroke-width="3"/>`
    const falls =
      `<path d="M${FALLS_X} 650q120-20 260-10V900H${FALLS_X}z" fill="url(#c20-cliff)" ${O}/>` +
      `<path d="M${FALLS_X} 660h70q6 120-10 240h-60z" fill="url(#c20-falls)" ${Ow(1.6)}/>` +
      anim({ type: 'keys', period: 0.8, keys: [{ t: 0, y: 0 }, { t: 0.8, y: 50 }] },
        `<path d="M${FALLS_X + 12} 660v50M${FALLS_X + 30} 650v60M${FALLS_X + 50} 664v40M${FALLS_X + 12} 760v50M${FALLS_X + 30} 750v60M${FALLS_X + 50} 764v40" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-opacity="0.85"/>`) +
      `<path d="M${FALLS_X + 60} 840q90-20 200 0V900H${FALLS_X + 30}z" fill="url(#c20-river)"/>` +
      anim({ type: 'keys', period: 1.4, keys: [{ t: 0, sx: 0.8, sy: 0.8, o: 1 }, { t: 1.4, sx: 1.3, sy: 1.3, o: 0 }], pivot: [FALLS_X + 40, 860] }, `<ellipse cx="${FALLS_X + 40}" cy="860" rx="50" ry="14" fill="#fff" fill-opacity="0.8"/>`) +
      diff(FALLS_X + 130, 822, 42,
        `<g fill="none" stroke-width="5" stroke-opacity="0.55">${['#e63946', '#ffb703', '#52b788', '#4d96e6', '#7b5cd6'].map((c, i) => `<path d="M${FALLS_X + 96 + i * 5} 836a${34 - i * 5} ${34 - i * 5} 0 0 1 ${68 - i * 10} 0" stroke="${c}"/>`).join('')}</g>`,
        '')

    // --- The near bank: the canoe (its paddle's blade red in A, blue in B; a tin cup on its hull in A only), a fallen
    // log with mushrooms (one fewer in B). ---
    const paddle = (c: string) =>
      `<path d="M1072 860l-26-58" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M1072 860l-26-58" stroke="#c49462" stroke-width="3.4" stroke-linecap="round"/>` +
      `<path d="M1040 790q-4-24 10-28q12 2 8 26l-6 16z" fill="${c}" ${Ow(1.6)}/>`
    const canoe =
      groundShadow(950, 872, 110, 8) +
      `<path d="M850 868q100-40 210 0q-100 16-210 0z" fill="url(#c20-canoe)" ${O}/><path d="M860 864q95-30 190 0" fill="none" stroke="#f4e6cc" stroke-width="3"/>` +
      diff(1048, 784, 26, paddle('#e63946'), paddle('#3a76d0')) +
      diff(950, 836, 18, `<path d="M942 846l2-14h14l2 14z" fill="#b0b8c4" ${Ow(1.4)}/><path d="M960 836q8 0 6 6" fill="none" stroke="${INK}" stroke-width="1.6"/>`, '')
    const mushroom = (x: number, y: number, s: number) =>
      `<path d="M${x - 3 * s} ${y}v-${10 * s}h${6 * s}v${10 * s}z" fill="#f4e6cc" ${Ow(1.2)}/><path d="M${x - 10 * s} ${y - 9 * s}q${10 * s}-${14 * s} ${20 * s} 0z" fill="#c0521f" ${Ow(1.4)}/><circle cx="${x - 3 * s}" cy="${y - 13 * s}" r="${1.6 * s}" fill="#fff"/>`
    const fallen =
      groundShadow(820, 852, 70, 6) +
      `<rect x="760" y="830" width="130" height="22" rx="11" fill="url(#ke-bark)" ${O}/><ellipse cx="888" cy="841" rx="7" ry="11" fill="#d9a066" ${Ow(1.4)}/><circle cx="888" cy="841" r="4" fill="none" stroke="#a0683a" stroke-width="1.4"/>` +
      mushroom(790, 832, 1) + mushroom(812, 832, 1.2) +
      diff(840, 818, 18, mushroom(840, 832, 1.1), '')
    let tufts = ''
    for (let i = 0; i < 26; i++) {
      const tx = Math.round(rand() * W)
      const ty = Math.round(i % 2 ? 610 + rand() * 30 : 846 + rand() * 50)
      tufts += anim({ type: 'sway', angle: 7, pivot: [tx, ty], period: 2.3, phase: (tx % 13) / 13 }, grassTuft(tx, ty))
    }
    let flowers = ''
    for (let i = 0; i < 18; i++) {
      const fx = Math.round(rand() * W)
      const fy = Math.round(i % 2 ? 612 + rand() * 24 : 852 + rand() * 40)
      if (fx > 740 && fx < 1100 && fy > 820) continue
      const c = ['#b48ae6', '#ffd23f', '#fff', '#ff8fb0'][i % 4]
      flowers += `<path d="M${fx} ${fy}v-12" stroke="#4f8a33" stroke-width="2"/><circle cx="${fx}" cy="${fy - 14}" r="4" fill="${c}" ${Ow(1)}/>`
    }

    // --- The moose. ---
    const [mx, my] = MOOSE
    const mooseLeg = (x: number, k: Keyframe[], back: boolean) =>
      keys(undefined, k, [x, my - 90],
        `<path d="M${x - 7} ${my - 92}l2 44l-3 40h12l1-40l2-44z" fill="${back ? '#4a3020' : 'url(#c20-moose)'}" ${Ow(1.8)}/><rect x="${x - 7}" y="${my - 10}" width="14" height="10" rx="3" fill="#2b1a10"/>`)
    const frontLegStep: Keyframe[] = [...swingKeys([MOOSE_WALK], 0.32, 14), { t: 9.6, rot: 0, ease: 'inOut' }, { t: 9.82, rot: 30, ease: 'out' }, { t: 10.4, rot: 0, ease: 'step' }, { t: 19.95, ease: 'step' }]
    const antlerSticks = (shown: Keyframe[]) =>
      once(shown, MOOSE,
        `<path d="M${mx - 140} ${my - 214}l40 20M${mx - 116} ${my - 230}l22 32M${mx - 70} ${my - 224}l-30 26M${mx - 52} ${my - 210}l-40 6" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>` +
          `<path d="M${mx - 140} ${my - 214}l40 20M${mx - 116} ${my - 230}l22 32M${mx - 70} ${my - 224}l-30 26M${mx - 52} ${my - 210}l-40 6" stroke="#8a5a32" stroke-width="3.4" stroke-linecap="round"/>` +
          `<path d="M${mx - 128} ${my - 208}q8-10 18-2q-8 10-18 2z" fill="#5aa845" ${Ow(1.2)}/>`)
    const mooseEyes =
      once(showIn([0, 10.5], [12.3, LOOP]), MOOSE, `<circle cx="${mx - 94}" cy="${my - 158}" r="5" fill="#fff" ${Ow(1.2)}/><circle cx="${mx - 96}" cy="${my - 158}" r="2.4" fill="${INK}"/>` + blink(3.7, 0.5)(`<circle cx="${mx - 94}" cy="${my - 158}" r="5.4" fill="#6e4a2c"/><path d="M${mx - 99} ${my - 158}h10" stroke="${INK}" stroke-width="1.6"/>`)) +
      // Dazed after the crack: spiral eye.
      once(showIn([10.5, 12.3]), MOOSE, `<circle cx="${mx - 94}" cy="${my - 158}" r="5" fill="#fff" ${Ow(1.2)}/><path d="M${mx - 94} ${my - 158}m-1 0a1 1 0 1 1 2 0a2.4 2.4 0 1 1-4.8 0a3.6 3.6 0 1 1 7.2 0" fill="none" stroke="${INK}" stroke-width="1.2"/>`) +
      // Rolling its eye up at the beaver on its antlers.
      once(showIn([LANDED, LOOP]), MOOSE, `<circle cx="${mx - 94}" cy="${my - 158}" r="5.4" fill="#fff" ${Ow(1.2)}/><circle cx="${mx - 93}" cy="${my - 161}" r="2.4" fill="${INK}"/><path d="M${mx - 101} ${my - 157}h12" stroke="#6e4a2c" stroke-width="3"/>`)
    const mooseHead = keys('mhead', [
      { t: 0, rot: 0 }, { t: 9, ease: 'inOut' }, { t: 9.5, rot: -38 }, { t: CRACK, ease: 'out' }, { t: 10.25, rot: 8, ease: 'inOut' }, { t: 10.6, rot: 0 },
      // Shaking its head, dazed.
      { t: 10.8, rot: -5, ease: 'inOut' }, { t: 11, rot: 5, ease: 'inOut' }, { t: 11.2, rot: -4, ease: 'inOut' }, { t: 11.4, rot: 0, ease: 'step' },
      // A little nod as the beaver lands, then a tail slap on its forehead.
      { t: LANDED, ease: 'out' }, { t: LANDED + 0.12, rot: -6, ease: 'inOut' }, { t: LANDED + 0.4, rot: 0, ease: 'step' }, { t: 19.95, ease: 'step' },
    ], [mx - 46, my - 128],
        `<path d="M${mx - 80} ${my - 170}q-34 0-52 30q-8 18 6 30q16 10 30 0q14-12 30-14q14-18-14-46z" fill="url(#c20-moose)" ${Ow(2)}/>` +
        `<ellipse cx="${mx - 128}" cy="${my - 126}" rx="16" ry="14" fill="#7a5236" ${Ow(1.8)}/><ellipse cx="${mx - 136}" cy="${my - 128}" rx="3" ry="2.4" fill="${INK}"/>` +
        `<path d="M${mx - 120} ${my - 116}q6 4 12 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>` +
        `<path d="M${mx - 96} ${my - 112}q-2 18 6 22q6-8 0-22z" fill="#5a3a22" ${Ow(1.4)}/>` +
        `<path d="M${mx - 70} ${my - 168}l14-14l2 18z" fill="#5a3a22" ${Ow(1.4)}/>` +
        // Antlers: two flat palms with tines.
        `<path d="M${mx - 86} ${my - 172}q-20-10-34-34l-8 4l-6-14l-6 6l-4-16l-6 10q-6 24 20 44q18 10 44 10z" fill="url(#c20-antler)" ${Ow(1.8)}/>` +
        `<path d="M${mx - 74} ${my - 172}q14-14 18-40l8 2l2-14l8 6l6-14l4 12q2 30-24 48q-10 6-22 6z" fill="url(#c20-antler)" ${Ow(1.8)}/>` +
        antlerSticks([{ t: 0, o: 0, ease: 'step' }, { t: 10.55, o: 1, ease: 'step' }]) +
        mooseEyes +
        // More sticks: the beaver building.
        once(showIn([16.7, LOOP]), MOOSE, `<path d="M${mx - 132} ${my - 226}l50 -6" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M${mx - 132} ${my - 226}l50 -6" stroke="#a0683a" stroke-width="3.4" stroke-linecap="round"/>`) +
        once(showIn([17.9, LOOP]), MOOSE, `<path d="M${mx - 60} ${my - 236}l-30 22" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M${mx - 60} ${my - 236}l-30 22" stroke="#a0683a" stroke-width="3.4" stroke-linecap="round"/>`) +
        // Dazed stars over the antlers.
        once(showIn([10.55, 12.3]), MOOSE,
          anim({ type: 'rotate', pivot: [mx - 96, my - 236], period: 1 },
            [0, 120, 240].map((a) => `<path transform="rotate(${a} ${mx - 96} ${my - 236})" d="M${mx - 96} ${my - 256}l2 4l4 1l-3 3l1 4l-4-2l-4 2l1-4l-3-3l4-1z" fill="#ffd23f" ${Ow(1)}/>`).join(''))),
    )
    const moose = keys('moose', [{ t: 0, x: 420, y: -4 }, { t: MOOSE_WALK[0], ease: 'linear' }, { t: MOOSE_WALK[1], x: 0, y: 0, ease: 'step' }, { t: 19.95, ease: 'step' }], MOOSE,
      groundShadow(mx, my + 2, 90, 9) +
        mooseLeg(mx + 56, swingKeys([MOOSE_WALK], 0.32, 14, true), true) + mooseLeg(mx - 26, swingKeys([MOOSE_WALK], 0.32, 14), true) +
        `<path d="M${mx + 70} ${my - 130}q14 2 12 14" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>` +
        `<path d="M${mx - 18} ${my - 150}Q${mx - 44} ${my - 156} ${mx - 62} ${my - 144}" fill="none" stroke="${INK}" stroke-width="40" stroke-linecap="round"/><path d="M${mx - 18} ${my - 150}Q${mx - 44} ${my - 156} ${mx - 62} ${my - 144}" fill="none" stroke="#6e4a2c" stroke-width="35" stroke-linecap="round"/>` +
        `<path d="M${mx - 60} ${my - 140}q10-40 50-36q40-6 80 10q22 10 18 44q-6 34-50 36q-60 6-90-12q-14-14-8-42z" fill="url(#c20-moose)" ${Ow(2.2)}/>` +
        `<path d="M${mx - 34} ${my - 170}q24-14 46-4" fill="none" stroke="#4a3020" stroke-width="8" stroke-linecap="round"/>` +
        `<path d="M${mx - 20} ${my - 160}q30-8 60 2" fill="none" stroke="#3a2416" stroke-opacity="0.4" stroke-width="4" stroke-linecap="round"/>` +
        mooseLeg(mx + 40, swingKeys([MOOSE_WALK], 0.32, 14), false) + mooseLeg(mx - 42, frontLegStep, false) +
        mooseHead)

    // --- The beaver and its log. ---
    const [bx, by] = BEAVER
    const tail = (k: Keyframe[]) =>
      keys(undefined, k, [bx - 12, by - 8],
        `<path d="M${bx - 12} ${by - 8}q-20 0-30 6q-8 8 0 14q14 4 30-8z" fill="#4a3424" ${Ow(1.8)}/><path d="M${bx - 36} ${by - 2}l14 -6M${bx - 34} ${by + 4}l16-8M${bx - 28} ${by + 8}l10-6" stroke="#2e2016" stroke-width="1.4"/>`)
    const slaps: Keyframe[] = [{ t: 0, rot: 0 }, { t: 4.9, ease: 'in' }, { t: 5.15, rot: -60, ease: 'out' }, { t: 5.35, rot: 0, ease: 'in' }, { t: 5.7, rot: -60, ease: 'out' }, { t: 5.9, rot: 0 },
      // On the moose's forehead.
      { t: 18.6, ease: 'in' }, { t: 18.85, rot: -60, ease: 'out' }, { t: 19.05, rot: 0 }, { t: 19.95, ease: 'step' }]
    const beaverArm = (k: Keyframe[], extra = '') =>
      keys(undefined, k, [bx + 6, by - 30],
        `<path d="M${bx + 6} ${by - 30}l10 12" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M${bx + 6} ${by - 30}l10 12" stroke="#8a5a32" stroke-width="4.4" stroke-linecap="round"/>` + extra)
    const armKeys: Keyframe[] = [
      { t: 0, rot: 0 }, { t: 3.9, ease: 'inOut' }, { t: 4.2, rot: -100, ease: 'inOut' }, { t: 4.6, rot: -40, ease: 'inOut' }, { t: 4.9, rot: 0 },
      // Arms out, surfing.
      { t: 10.1, ease: 'inOut' }, { t: 10.3, rot: -80, ease: 'step' }, { t: ROCK_HIT, ease: 'inOut' }, { t: ROCK_HIT + 0.2, rot: -150, ease: 'step' },
      { t: LANDED, rot: 0, ease: 'inOut' },
      // Placing a stick, chomping it in, placing another.
      { t: 16.3, rot: -70, ease: 'inOut' }, { t: 16.7, rot: -20, ease: 'inOut' }, { t: 17.5, rot: -70, ease: 'inOut' }, { t: 17.9, rot: -20, ease: 'inOut' }, { t: 18.3, rot: 0, ease: 'step' }, { t: 19.95, ease: 'step' },
    ]
    const stickInPaw = (from: number, to: number) => once(showIn([from, to]), BEAVER, `<path d="M${bx + 6} ${by - 20}l30-6" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M${bx + 6} ${by - 20}l30-6" stroke="#a0683a" stroke-width="3.4" stroke-linecap="round"/>`)
    const beaverFace =
      once(showIn([0, ROCK_HIT], [LANDED + 0.2, LOOP]), BEAVER, `<circle cx="${bx + 12}" cy="${by - 56}" r="2.6" fill="${INK}"/><circle cx="${bx + 12.8}" cy="${by - 57}" r="0.9" fill="#fff"/>`) +
      // Proud: eyes shut while it slaps its tail.
      once(showIn([4.9, 6.2]), BEAVER, `<circle cx="${bx + 12}" cy="${by - 56}" r="3.2" fill="#8a5a32"/><path d="M${bx + 9} ${by - 56}q3-3 6 0" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`) +
      // Wide-eyed through the air.
      once(showIn([ROCK_HIT, LANDED + 0.2]), BEAVER, `<circle cx="${bx + 12}" cy="${by - 56}" r="4.4" fill="#fff" ${Ow(1.2)}/><circle cx="${bx + 13}" cy="${by - 56}" r="1.6" fill="${INK}"/><ellipse cx="${bx + 22}" cy="${by - 43}" rx="3" ry="4" fill="#7a2a2a"/>`)
    const beaverStand =
      tail(slaps) +
      `<path d="M${bx - 8} ${by}h10M${bx + 4} ${by}h10" stroke="#2e2016" stroke-width="5" stroke-linecap="round"/>` +
      `<ellipse cx="${bx}" cy="${by - 22}" rx="17" ry="22" fill="url(#c20-beaver)" ${Ow(1.8)}/><ellipse cx="${bx + 4}" cy="${by - 18}" rx="9" ry="13" fill="#c49462"/>` +
      `<circle cx="${bx + 8}" cy="${by - 50}" r="13" fill="url(#c20-beaver)" ${Ow(1.8)}/><circle cx="${bx + 1}" cy="${by - 62}" r="4" fill="#6e4224" ${Ow(1.2)}/>` +
      `<ellipse cx="${bx + 18}" cy="${by - 46}" rx="8" ry="6" fill="#c49462" ${Ow(1.4)}/><ellipse cx="${bx + 24}" cy="${by - 49}" rx="3" ry="2.4" fill="${INK}"/>` +
      // The big teeth, chomping while it builds.
      anim({ type: 'keys', period: 0.3, keys: [{ t: 0, sy: 1 }, { t: 0.15, sy: 0.6, ease: 'inOut' }], pivot: [bx + 19, by - 42] },
        `<rect x="${bx + 15}" y="${by - 42}" width="8" height="8" rx="1.5" fill="#fff4d8" ${Ow(1.2)}/><path d="M${bx + 19} ${by - 42}v8" stroke="${INK}" stroke-width="1"/>`) +
      beaverFace +
      beaverArm(armKeys) +
      stickInPaw(16, 16.7) + stickInPaw(17.2, 17.9)
    const beaverSwim =
      `<path d="M${bx - 30} ${by - 2}q-22 0-30 4q22 6 30 0z" fill="#4a3424" ${Ow(1.6)}/>` +
      `<path d="M${bx - 28} ${by}q12-20 34-18q16 2 18 18z" fill="url(#c20-beaver)" ${Ow(1.8)}/>` +
      `<circle cx="${bx + 14}" cy="${by - 14}" r="11" fill="url(#c20-beaver)" ${Ow(1.8)}/><circle cx="${bx + 8}" cy="${by - 24}" r="3.4" fill="#6e4224" ${Ow(1)}/>` +
      `<ellipse cx="${bx + 24}" cy="${by - 10}" rx="7" ry="5" fill="#c49462" ${Ow(1.2)}/><ellipse cx="${bx + 29}" cy="${by - 12}" rx="2.6" ry="2" fill="${INK}"/><circle cx="${bx + 17}" cy="${by - 18}" r="2" fill="${INK}"/>` +
      `<path d="M${bx - 40} ${by}q40 6 76 0" fill="none" stroke="#e9f6fb" stroke-width="3" stroke-linecap="round"/>` +
      anim({ type: 'keys', period: 1, keys: [{ t: 0, x: 0, o: 0.9 }, { t: 1, x: -40, o: 0 }], pivot: [bx - 30, by] }, `<path d="M${bx - 30} ${by + 4}q-20 4-40 0" fill="none" stroke="#fff" stroke-width="2.4"/>`)
    const beaver = keys('beaver', beaverKeys(), BEAVER,
      once(showIn([0, 3.75]), BEAVER, beaverSwim) + once(showIn([3.75, LOOP]), BEAVER, groundShadow(bx, by, 22, 4) + beaverStand))
    const [lx, ly] = LOG
    const log = keys('log', logKeys(), LOG,
      `<rect x="${lx - 44}" y="${ly - 9}" width="88" height="18" rx="9" fill="url(#ke-bark)" ${O}/><ellipse cx="${lx + 44}" cy="${ly}" rx="6" ry="9" fill="#d9a066" ${Ow(1.4)}/>` +
        `<circle cx="${lx + 44}" cy="${ly}" r="4" fill="none" stroke="#a0683a" stroke-width="1.2"/><path d="M${lx - 34} ${ly - 3}h22M${lx} ${ly + 3}h26" stroke="#4a2c14" stroke-opacity="0.45" stroke-width="2"/>` +
        // A wake while it rides the rapids.
        once(showIn([10.2, ROCK_HIT]), LOG, `<path d="M${lx - 50} ${ly + 8}q-20 4-40-2M${lx - 46} ${ly + 12}q-16 6-34 4" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`))

    // --- The crack, the flying sticks, the splash; the rock hit; the salmon over the surfer. ---
    let flyingSticks = ''
    for (const [i, [tx, ty]] of ([[-40, -120], [10, -150], [60, -130], [90, -60], [-80, -40], [30, -20]] as [number, number][]).entries()) {
      flyingSticks += once(
        [{ t: 0, x: 0, y: 0, rot: 0, o: 0, ease: 'step' }, { t: CRACK, o: 1, ease: 'out' }, { t: CRACK + 0.3, x: tx * 0.6, y: ty, rot: 200 + i * 40, ease: 'in' }, { t: 10.55, x: tx, y: ty * 0.6 + 40, rot: 360 + i * 60, o: 1, ease: 'step' }, { t: 10.6, o: 0, ease: 'step' }],
        [DAM[0], DAM[1] + 10],
        `<path d="M${DAM[0] - 16} ${DAM[1] + 10}h32" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M${DAM[0] - 16} ${DAM[1] + 10}h32" stroke="#8a5a32" stroke-width="3.4" stroke-linecap="round"/>`,
      )
    }
    const crack =
      pop(CRACK, [DAM[0] + 10, DAM[1] + 6], burst(DAM[0] + 10, DAM[1] + 6, 40) + burst(DAM[0] + 10, DAM[1] + 6, 20, '#fff')) +
      splash([DAM[0] + 4, DAM[1] + 20], CRACK, 10, 16) + flyingSticks
    const rockHit = pop(ROCK_HIT, [1110, 702], burst(1110, 702, 30) + burst(1110, 702, 15, '#fff')) + splash([1100, 712], ROCK_HIT, 6)
    const landing = once(showIn([LANDED, LANDED + 0.5]), [bx + ON_ANTLERS[0], by + ON_ANTLERS[1] - 30],
      anim({ type: 'keys', period: 0.5, keys: [{ t: 0, sx: 0.5, sy: 0.5, o: 1 }, { t: 0.5, sx: 1.5, sy: 1.5, o: 0 }], pivot: [bx + ON_ANTLERS[0], by + ON_ANTLERS[1] - 30] },
        `<path d="M${bx + ON_ANTLERS[0] - 34} ${by + ON_ANTLERS[1] - 40}q-8 10 0 20M${bx + ON_ANTLERS[0] + 34} ${by + ON_ANTLERS[1] - 40}q8 10 0 20" fill="none" stroke="#fff4c0" stroke-width="3" stroke-linecap="round"/>`))
    const salmon = (x: number, y: number, c = '#e8735a') =>
      `<path d="M${x - 22} ${y}q12-12 30-8q10 2 14 8q-4 6-14 8q-18 4-30-8z" fill="${c}" ${Ow(1.6)}/><path d="M${x - 22} ${y}l-10-8v16z" fill="${c}" ${Ow(1.4)}/>` +
      `<circle cx="${x + 12}" cy="${y - 2}" r="1.8" fill="${INK}"/><path d="M${x - 10} ${y + 1}q10 4 20 0" fill="none" stroke="#fff" stroke-opacity="0.6" stroke-width="2"/>`
    const JUMP: [number, number] = [930, 700]
    const salmonJump = once(
      [{ t: 0, x: -50, y: 30, rot: -50, o: 0, ease: 'step' }, { t: 12.2, o: 1, ease: 'out' }, { t: 12.55, x: -10, y: -130, rot: -10, ease: 'linear' }, { t: 12.9, x: 50, y: -40, rot: 50, ease: 'in' }, { t: 13.1, x: 70, y: 30, rot: 70, o: 1, ease: 'step' }, { t: 13.15, o: 0, ease: 'step' }],
      JUMP,
      salmon(...JUMP),
    ) + splash([880, 712], 12.2, 4, 12) + splash([1000, 712], 13.1, 4, 12)

    // --- Events of B: an otter on its back cracking a shell, a loon diving, a salmon leaping up the falls. ---
    const OTTER: [number, number] = [430, 770]
    const [ox, oy] = OTTER
    const otter = diff(
      ox - 5,
      oy - 6,
      42,
      '',
      keys('otter', [{ t: 0, x: -30, o: 0, ease: 'step' }, { t: 1.8, o: 1, ease: 'out' }, { t: 4.6, x: 20, o: 1, ease: 'step' }, { t: 4.65, o: 0, ease: 'step' }], OTTER,
        `<ellipse cx="${ox}" cy="${oy}" rx="26" ry="9" fill="#7a5236" ${Ow(1.6)}/><ellipse cx="${ox + 2}" cy="${oy - 3}" rx="16" ry="5" fill="#c9a37a"/>` +
          `<circle cx="${ox + 24}" cy="${oy - 6}" r="9" fill="#7a5236" ${Ow(1.6)}/><ellipse cx="${ox + 28}" cy="${oy - 4}" rx="5" ry="4" fill="#e8d3b0"/><circle cx="${ox + 31}" cy="${oy - 6}" r="1.6" fill="${INK}"/><circle cx="${ox + 24}" cy="${oy - 10}" r="1.4" fill="${INK}"/>` +
          `<path d="M${ox - 26} ${oy}q-14 0-18-6" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${ox - 26} ${oy}q-14 0-18-6" fill="none" stroke="#7a5236" stroke-width="3" stroke-linecap="round"/>` +
          `<ellipse cx="${ox + 4}" cy="${oy - 10}" rx="6" ry="4" fill="#9aa3ad" ${Ow(1.2)}/>` +
          anim({ type: 'keys', period: 0.5, keys: [{ t: 0, y: 0 }, { t: 0.25, y: -8, ease: 'inOut' }], pivot: [ox + 6, oy - 18] },
            `<path d="M${ox + 2} ${oy - 18}q4-6 8 0q-4 4-8 0z" fill="#f4d9b0" ${Ow(1.2)}/><path d="M${ox} ${oy - 8}l4-8M${ox + 12} ${oy - 8}l-4-8" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`)),
      'otter',
      during(1.8, 4.65),
    )
    const LOON: [number, number] = [1000, 724]
    const [nx, ny] = LOON
    const loon = diff(
      nx + 6,
      ny - 12,
      40,
      '',
      keys('loon', [{ t: 0, x: 0, y: 10, o: 0, ease: 'step' }, { t: 7, o: 1, ease: 'out' }, { t: 7.3, y: 0 }, { t: 8.4, ease: 'in' }, { t: 8.8, y: 12, rot: -20, o: 0.2, ease: 'inOut' }, { t: 9.05, y: 0, rot: 0, o: 1, ease: 'out' }, { t: 9.35, o: 1, ease: 'step' }, { t: 9.4, o: 0, ease: 'step' }], LOON,
        `<path d="M${nx - 22} ${ny}q4-14 24-14q16 0 18 14z" fill="#2b2b3a" ${Ow(1.6)}/><path d="M${nx - 14} ${ny - 6}h4M${nx - 6} ${ny - 8}h4M${nx + 2} ${ny - 8}h4M${nx - 10} ${ny - 2}h4M${nx - 2} ${ny - 3}h4" stroke="#fff" stroke-width="2" stroke-linecap="round"/>` +
          `<path d="M${nx + 14} ${ny - 6}q4-16 10-16" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M${nx + 14} ${ny - 6}q4-16 10-16" fill="none" stroke="#2b2b3a" stroke-width="4.4" stroke-linecap="round"/>` +
          `<circle cx="${nx + 24}" cy="${ny - 22}" r="7" fill="#2b2b3a" ${Ow(1.6)}/><circle cx="${nx + 26}" cy="${ny - 24}" r="1.8" fill="#e63946"/><path d="M${nx + 30} ${ny - 22}l10 2l-10 2z" fill="${INK}"/>` +
          `<path d="M${nx - 26} ${ny + 2}q26 6 52 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`),
      'loon',
      during(7, 9.4),
    )
    const UP: [number, number] = [FALLS_X + 36, 760]
    const fallsSalmon = diff(
      UP[0] - 4,
      UP[1],
      38,
      '',
      keys('upstream', [
        { t: 0, x: 0, y: 40, rot: -70, o: 0, ease: 'step' }, { t: 12, o: 1, ease: 'out' }, { t: 12.4, y: -20, rot: -60, ease: 'in' }, { t: 12.8, y: 30, rot: -100, ease: 'step' },
        { t: 13.3, y: 40, rot: -70, ease: 'out' }, { t: 13.7, y: -30, rot: -60, ease: 'in' }, { t: 14.1, y: 30, rot: -100, o: 1, ease: 'step' }, { t: 14.15, o: 0, ease: 'step' },
      ], UP, salmon(UP[0], UP[1], '#d9614a')),
      'upstream',
      during(12, 14.15),
    )

    // --- Life around: dragonflies over the pond, a butterfly. ---
    const buzz = (pivot: [number, number]) => (m: string) => anim({ type: 'keys', period: 0.1, keys: [{ t: 0, sy: 1 }, { t: 0.05, sy: 0.5 }], pivot }, m)
    const life =
      anim({ type: 'path', points: [[0, 0], [90, -20], [150, 10], [60, 24]], period: 7 }, dragonfly(260, 610, buzz([260, 606]))) +
      anim({ type: 'path', points: [[0, 0], [-60, -10], [-120, 20], [-40, 30]], period: 8, phase: 0.4 }, dragonfly(900, 620, buzz([900, 616]))) +
      anim({ type: 'path', points: [[0, 0], [60, -40], [120, 10], [40, 30]], period: 9 }, butterflyAt(420, 600, ['#ffd23f', '#f2a93b'], (m) => anim({ type: 'keys', period: 0.3, keys: [{ t: 0, sx: 1 }, { t: 0.15, sx: 0.3, ease: 'inOut' }], pivot: [420, 600] }, m)))

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c20-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fb2e4"/><stop offset="0.6" stop-color="#bfe0f2"/><stop offset="1" stop-color="#e8f3ec"/></linearGradient>` +
      `<radialGradient id="c20-glow"><stop offset="0" stop-color="#fff4cc" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffe9a8" stop-opacity="0.4"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c20-mount" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8c9fb8"/><stop offset="1" stop-color="#b4c4d4"/></linearGradient>` +
      `<linearGradient id="c20-haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8f3ec" stop-opacity="0"/><stop offset="1" stop-color="#e8f3ec" stop-opacity="0.6"/></linearGradient>` +
      `<linearGradient id="c20-bank" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fbf5a"/><stop offset="1" stop-color="#6f9f42"/></linearGradient>` +
      `<linearGradient id="c20-near" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fae4a"/><stop offset="1" stop-color="#5a8a36"/></linearGradient>` +
      `<linearGradient id="c20-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fa8c8"/><stop offset="1" stop-color="#3f7fa6"/></linearGradient>` +
      `<linearGradient id="c20-river" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fc0d8"/><stop offset="1" stop-color="#3f8fb0"/></linearGradient>` +
      `<linearGradient id="c20-falls" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#bfe8f5"/><stop offset="1" stop-color="#e9f8fd"/></linearGradient>` +
      `<linearGradient id="c20-cliff" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9a9a8e"/><stop offset="1" stop-color="#6e6e64"/></linearGradient>` +
      `<radialGradient id="c20-rock" cx="0.6" cy="0.3" r="0.8"><stop offset="0" stop-color="#b9b9ae"/><stop offset="1" stop-color="#7a7a70"/></radialGradient>` +
      `<linearGradient id="c20-birch" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9d2c4"/><stop offset="0.6" stop-color="#fbf8f2"/><stop offset="1" stop-color="#ffffff"/></linearGradient>` +
      `<radialGradient id="c20-birch-leaf" cx="0.64" cy="0.28" r="0.85"><stop offset="0" stop-color="#dff2a0"/><stop offset="0.55" stop-color="#a6d06a"/><stop offset="1" stop-color="#6a9a3a"/></radialGradient>` +
      `<linearGradient id="c20-fir" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f9a6a"/><stop offset="0.6" stop-color="#2c6f4a"/><stop offset="1" stop-color="#1d4f36"/></linearGradient>` +
      `<radialGradient id="c20-lodge" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#b08a5a"/><stop offset="1" stop-color="#6e4a2c"/></radialGradient>` +
      `<linearGradient id="c20-dam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a87a4a"/><stop offset="1" stop-color="#6e4a2c"/></linearGradient>` +
      `<linearGradient id="c20-canoe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2694a"/><stop offset="1" stop-color="#a8382a"/></linearGradient>` +
      `<radialGradient id="c20-moose" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#9a6a46"/><stop offset="0.6" stop-color="#6e4a2c"/><stop offset="1" stop-color="#4a3020"/></radialGradient>` +
      `<linearGradient id="c20-antler" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4e6c4"/><stop offset="1" stop-color="#c9ad7a"/></linearGradient>` +
      `<radialGradient id="c20-beaver" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#b07a44"/><stop offset="1" stop-color="#6e4224"/></radialGradient>` +
      `<radialGradient id="c20-sunlight" cx="0.82" cy="0.15" r="1"><stop offset="0" stop-color="#fff2c4" stop-opacity="0.3"/><stop offset="0.5" stop-color="#fff2c4" stop-opacity="0.06"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></radialGradient></defs>` +
      sky +
      tufts +
      flowers +
      birch1 +
      snag +
      birch2 +
      fir +
      pond +
      lodge +
      reeds +
      pads +
      otter +
      river +
      falls +
      loon +
      fallsSalmon +
      moose +
      dam +
      log +
      beaver +
      crack +
      salmonJump +
      rockHit +
      landing +
      canoe +
      fallen +
      life +
      `<rect width="${W}" height="${H}" fill="url(#c20-sunlight)"/>`
    )
  },
})
