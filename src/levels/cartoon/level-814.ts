// Cartoon "The mirage" (docs/cartoon-mode.md), made like 812: a 20 s desert story told by a camera. A camel plods
// through the heat past a saguaro and its owl, spots the oasis — is it a mirage? — gallops over and drinks the pond
// dry in one long slurp (a fish flapping on the mud, a frog staring); it lies down, humps swollen, blissful — until a
// vulture's feather tickles its nose: one huge sneeze sprays all the water back, fish and all. Twelve differences:
// two hard (a fruit of the prickly pear, a tassel of the camel's blanket), three events of B (the lizard licking its
// eye, a fennec's ears over the dune, a vulture landing on the palm).
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { BEACH_DEFS, dragonfly, farBird, fish, frog, groundShadow, INK, keenOwl, lilyPad, NATURE_DEFS, O, Ow, palmTree, puffCloud } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // The camel plods through the heat: the saguaro and its owl, the prickly pear, the scorpion, the lizard's rock.
  { t: 1.6, x: 0, y: 470, w: 600, ease: 'inOut' },
  { t: 4.55, x: 340, y: 470, w: 600, ease: 'step' },
  // It sees the oasis — and gallops.
  { t: 4.6, x: 380, y: 540, w: 400, ease: 'step' },
  { t: 5.2, x: 380, y: 540, w: 400, ease: 'inOut' },
  { t: 6.2, x: 640, y: 560, w: 420, ease: 'step' },
  // Lying down, swollen and happy.
  { t: 9.2, x: 560, y: 520, w: 520, ease: 'step' },
  // The feather on its nose: ah... ah...
  { t: 11, x: 660, y: 520, w: 300, ease: 'step' },
  // ATCHOO — the pond comes back.
  { t: 13, x: 640, y: 470, w: 640, ease: 'step' },
  // Round the oasis: the palms, the jar, the dune.
  { t: 14.2, x: 680, y: 430, w: 600, ease: 'inOut' },
  { t: 17.2, x: 840, y: 430, w: 600, ease: 'step' },
  // Back to the soaked, grumpy camel.
  { t: 17.25, x: 600, y: 500, w: 560 },
  { t: 19.95, x: 610, y: 505, w: 540, ease: 'step' },
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

/** Leg swing: alternating `angle` every `step` seconds within each span. */
function swing(spans: [number, number, number][], angle: number, flip = false): Keyframe[] {
  const k: Keyframe[] = [{ t: 0, rot: 0 }]
  for (const [from, to, step] of spans) {
    k.push({ t: from, rot: 0, ease: 'inOut' })
    let i = 0
    for (let t = from + step; t < to; t += step, i++) k.push({ t: Math.round(t * 100) / 100, rot: (i % 2 ? -angle : angle) * (flip ? -1 : 1), ease: 'inOut' })
    k.push({ t: to, rot: 0 })
  }
  return k
}

/** The camel's feet, far left; it plods to x + 370, gallops to x + 620 by the pond. */
const CAMEL: [number, number] = [80, 800]
const PLOD: [number, number] = [0.2, 4.6]
const GALLOP: [number, number] = [5.2, 6.2]
/** Lying down: lowered this far. */
const LIE = 80
function camelKeys(): Keyframe[] {
  const k: Keyframe[] = [{ t: 0, x: 0, y: 0, rot: 0 }]
  for (let i = 1; i <= 11; i++) k.push({ t: Math.round(i * 0.4 * 100) / 100, x: Math.round((370 * i) / 11.5), y: i % 2 ? -3 : 0, ease: 'inOut' })
  k.push({ t: 4.6, x: 370, y: 0, ease: 'step' }, { t: GALLOP[0], ease: 'inOut' })
  for (let i = 1; i <= 5; i++) k.push({ t: GALLOP[0] + i * 0.2, x: 370 + i * 50, y: i % 2 ? -12 : 0, ease: 'inOut' })
  k.push(
    { t: 6.3, x: 626, y: 0, ease: 'out' },
    { t: 6.5, x: 620, ease: 'step' },
    // Lies down.
    { t: 9.2, ease: 'inOut' },
    { t: 9.7, y: LIE, ease: 'step' },
    // The sneeze blows it back a little.
    { t: 13, ease: 'out' },
    { t: 13.15, x: 608, ease: 'inOut' },
    { t: 13.6, x: 620, ease: 'step' },
    { t: 19.95, ease: 'step' },
  )
  return k
}

/** Its neck turns about its root (rest coordinates). */
const NECK: [number, number] = [CAMEL[0] + 50, CAMEL[1] - 125]
const neckKeys: Keyframe[] = [
  { t: 0, rot: 0 },
  ...Array.from({ length: 11 }, (_, i) => ({ t: Math.round((0.4 + i * 0.4) * 100) / 100, rot: i % 2 ? -4 : 4, ease: 'inOut' as const })),
  // Up it jerks: water!
  { t: 4.6, rot: -10, ease: 'inOut' },
  { t: 5.2, rot: 0, ease: 'inOut' },
  { t: 6.4, ease: 'inOut' },
  // Down to the pond for the long slurp.
  { t: 6.75, rot: 100, ease: 'step' },
  { t: 9.0, ease: 'inOut' },
  { t: 9.5, rot: 0, ease: 'step' },
  // Ah... ah...
  { t: 11.9, ease: 'inOut' },
  { t: 12.3, rot: -14, ease: 'inOut' },
  { t: 12.5, rot: -10, ease: 'inOut' },
  { t: 12.95, rot: -26, ease: 'in' },
  // ...CHOO.
  { t: 13.05, rot: 35, ease: 'inOut' },
  { t: 13.7, rot: 0, ease: 'step' },
  { t: 19.95, ease: 'step' },
]

/** The pond of the oasis. */
const POND: [number, number] = [980, 765]
const DRAINED = 8.6
const REFILL = 13.05

export default svgLevel({
  id: 814,
  chapter: 'cartoon',
  title: 'cartoonMirage',
  parTimeSec: 120,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const crown = (period: number, angle = 2, id?: string) => (pivot: [number, number], m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 11) / 11, ...(id && { id }) }, m)
    const blink = (period: number, phase = 0) => (m: string) => anim({ type: 'blink', duty: 0.07, period, phase }, m)
    const beat = (pivot: [number, number], every: number, phase = 0) => (m: string) =>
      anim({ type: 'keys', period: every, phase, keys: [{ t: 0, sy: 1 }, { t: every / 2, sy: 0.3, ease: 'inOut' }], pivot }, m)

    // --- Sky, a sweating sun, far dunes, a mirage shimmering on the horizon. ---
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c14-sky)"/>` +
      `<circle cx="1180" cy="150" r="220" fill="url(#c14-glow)"/>` +
      `<circle cx="1180" cy="150" r="52" fill="#ffd23f" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="1164" cy="142" rx="4.5" ry="7" fill="${INK}"/><ellipse cx="1196" cy="142" rx="4.5" ry="7" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.4, phase: 0.3 }, `<rect x="1154" y="134" width="52" height="18" fill="#ffd23f"/><path d="M1156 143h14M1190 143h14" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<path d="M1164 168q16 10 32 0" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>` +
      // A drop of sweat running down the sun's cheek.
      anim({ type: 'keys', period: 2.4, keys: [{ t: 0, y: 0, o: 1 }, { t: 2.4, y: 26, o: 0 }], pivot: [1214, 132] }, `<path d="M1214 126q5 7 0 10q-5-3 0-10z" fill="#8fd3f0" ${Ow(1.2)}/>`) +
      anim({ type: 'path', points: [[0, 0], [120, 0]], period: 40 }, puffCloud(300, 130, 0.8)) +
      `<path d="M0 560q160-60 340-30t360-30t380 20t360-30V700H0z" fill="url(#c14-far)"/>` +
      `<path d="M0 600q200-50 420-14t460-16t560-6V720H0z" fill="url(#c14-dune)"/>` +
      // The mirage: a pool of water shimmering far off, fading in and out.
      anim({ type: 'keys', period: 3, keys: [{ t: 0, o: 0.15 }, { t: 1.5, o: 0.7, ease: 'inOut' }] },
        `<ellipse cx="560" cy="580" rx="90" ry="7" fill="#9fdcf0"/><path d="M490 580h40M560 577h50" stroke="#fff" stroke-width="2"/>`)
    // Heat shimmer over the sand.
    let shimmer = ''
    for (let i = 0; i < 8; i++) {
      const sx = Math.round(80 + i * 170 + rand() * 40)
      const sy = Math.round(610 + rand() * 40)
      shimmer += anim({ type: 'keys', period: 1.8, phase: rand(), keys: [{ t: 0, y: 0, o: 0 }, { t: 0.9, y: -12, o: 0.7, ease: 'inOut' }, { t: 1.8, y: -24, o: 0 }], pivot: [sx, sy] },
        `<path d="M${sx} ${sy}q8-6 16 0t16 0t16 0" fill="none" stroke="#fff6dc" stroke-width="2"/>`)
    }
    const ground =
      `<rect y="700" width="${W}" height="${H - 700}" fill="url(#c14-sand)"/>` +
      `<path d="M0 760q300-30 620-10t500 4t320-10" fill="none" stroke="#d9a861" stroke-width="3" stroke-opacity="0.6"/>` +
      `<path d="M0 840q260-24 560-6t560 2t320-8" fill="none" stroke="#d9a861" stroke-width="3" stroke-opacity="0.5"/>`
    let ripples = ''
    for (let i = 0; i < 26; i++) {
      const rx = Math.round(rand() * W)
      const ry = Math.round(720 + rand() * 170)
      if (Math.abs(rx - POND[0]) < 200 && Math.abs(ry - POND[1]) < 70) continue
      ripples += `<path d="M${rx - 14} ${ry}q7-4 14 0t14 0" fill="none" stroke="#c9944e" stroke-opacity="0.55" stroke-width="2" stroke-linecap="round"/>`
    }

    // Vultures circling high up, hoping.
    const vulture = (x: number, y: number, flap: boolean) =>
      (flap
        ? anim({ type: 'keys', period: 1.2, keys: [{ t: 0, sy: 1 }, { t: 0.6, sy: 0.6, ease: 'inOut' }], pivot: [x, y] },
            `<path d="M${x} ${y}q-20-10-44 2q20-2 26 8zM${x} ${y}q20-10 44 2q-20-2-26 8z" fill="#3e3442" ${Ow(1.4)}/>`)
        : `<path d="M${x} ${y}q-20-10-44 2q20-2 26 8zM${x} ${y}q20-10 44 2q-20-2-26 8z" fill="#3e3442" ${Ow(1.4)}/>`) +
      `<circle cx="${x + 2}" cy="${y - 4}" r="5" fill="#f2c9a8" ${Ow(1.2)}/>`
    const circling = [0, 0.5]
      .map((phase) => anim({ type: 'path', period: 9, phase, points: [[0, 0], [120, 40], [0, 80], [-120, 40]] }, vulture(700, 330, true)))
      .join('')

    // --- The saguaro with the game's owl in its hole and a flower on top (A only); the prickly pear (a fruit fewer in
    // B: a hard one); the scorpion (tail curled up in A, down in B); the tortoise (its head in in B); the lizard's rock.
    const arm = (d: string) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="26" stroke-linecap="round"/><path d="${d}" fill="none" stroke="url(#c14-cactus)" stroke-width="21" stroke-linecap="round"/>`
    const saguaro =
      groundShadow(150, 800, 60, 8) +
      arm('M138 660q-50 6-50-50v-40') + arm('M162 610q48 4 48-46v-44') +
      `<path d="M128 800v-300q0-22 22-22t22 22v300z" fill="url(#c14-cactus)" ${O}/>` +
      `<path d="M140 790v-290M150 790v-300M160 790v-290" stroke="#2f7d3a" stroke-opacity="0.5" stroke-width="2"/>` +
      Array.from({ length: 14 }, (_, i) => `<path d="M${i % 2 ? 128 : 172} ${510 + i * 20}l${i % 2 ? -5 : 5}-3" stroke="#f4ead0" stroke-width="1.4"/>`).join('') +
      `<ellipse cx="150" cy="690" rx="13" ry="16" fill="#2e1a0c" ${Ow(1.6)}/>` +
      anim({ type: 'sway', angle: 6, pivot: [150, 702], period: 3.6 }, keenOwl(150, 702, 0.55, blink(3.1, 0.2))) +
      diff(150, 474, 20,
        [0, 72, 144, 216, 288].map((a) => `<ellipse transform="rotate(${a} 150 474)" cx="150" cy="466" rx="4" ry="7" fill="#fffaf0" ${Ow(1)}/>`).join('') + `<circle cx="150" cy="474" r="3.4" fill="#ffd23f"/>`, '')
    const pad = (x: number, y: number, rx: number, ry: number, rot: number) =>
      `<ellipse transform="rotate(${rot} ${x} ${y})" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#c14-pear)" ${Ow(1.6)}/>` +
      `<path d="M${x - 6} ${y - 4}l-2-2M${x + 4} ${y + 4}l2 2M${x} ${y - 10}l-1-3M${x + 6} ${y - 4}l3-1" stroke="#f4ead0" stroke-width="1.2"/>`
    const pearFruit = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="6.5" fill="#d9304f" ${Ow(1.2)}/>`
    const pricklyPear =
      groundShadow(300, 732, 44, 6) +
      pad(300, 712, 20, 24, 0) + pad(274, 690, 16, 20, -30) + pad(326, 688, 16, 20, 30) + pad(300, 668, 13, 17, 0) +
      pearFruit(286, 655) + pearFruit(340, 672) +
      diff(318, 662, 18, pearFruit(318, 664), '')
    const scorpion = (curl: boolean) => {
      const [x, y] = [250, 816]
      const tail = curl
        ? `<path d="M${x + 10} ${y - 4}q14-4 14-16q0-10-8-10" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${x + 10} ${y - 4}q14-4 14-16q0-10-8-10" fill="none" stroke="#a8743f" stroke-width="3" stroke-linecap="round"/><path d="M${x + 16} ${y - 30}l-4 4l5 1z" fill="${INK}"/>`
        : `<path d="M${x + 10} ${y - 3}q14 0 24 2" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${x + 10} ${y - 3}q14 0 24 2" fill="none" stroke="#a8743f" stroke-width="3" stroke-linecap="round"/><path d="M${x + 34} ${y - 3}l4 3l-5 1z" fill="${INK}"/>`
      return tail
    }
    const scorpionBody = (() => {
      const [x, y] = [250, 816]
      return `<path d="M${x - 10} ${y}l-6 4M${x - 4} ${y}l-3 5M${x + 4} ${y}l3 5M${x + 8} ${y}l6 4" stroke="${INK}" stroke-width="1.6"/>` +
        `<ellipse cx="${x}" cy="${y - 4}" rx="12" ry="5" fill="#a8743f" ${Ow(1.4)}/>` +
        `<path d="M${x - 10} ${y - 6}l-8-4l-4 2M${x - 10} ${y - 3}l-8 0l-3 3" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/><circle cx="${x - 21}" cy="${y - 9}" r="3" fill="#a8743f" ${Ow(1.2)}/><circle cx="${x - 21}" cy="${y - 1}" r="3" fill="#a8743f" ${Ow(1.2)}/>`
    })()
    const scorpionAll = scorpionBody + diff(266, 806, 26, scorpion(true), scorpion(false))
    const TORT: [number, number] = [384, 822]
    const [tx, ty] = TORT
    const tortoise = keys('tortoise', [{ t: 0, x: 0 }, { t: 19.9, x: 50, ease: 'step' }], TORT,
      `<path d="M${tx - 14} ${ty}v4M${tx - 4} ${ty}v4M${tx + 6} ${ty}v4M${tx + 14} ${ty}v4" stroke="#7a6a3a" stroke-width="5" stroke-linecap="round"/>` +
        `<path d="M${tx - 20} ${ty}q2-22 20-22q18 0 20 22z" fill="url(#c14-shell)" ${Ow(1.6)}/><path d="M${tx - 10} ${ty - 2}l4-14h12l4 14M${tx - 8} ${ty - 10}h16" fill="none" stroke="#5e4a22" stroke-width="1.4"/>` +
        diff(tx + 24, ty - 6, 18,
          anim({ type: 'keys', period: 2, keys: [{ t: 0, x: 0 }, { t: 1, x: 2, ease: 'inOut' }], pivot: [tx + 22, ty - 6] },
            `<path d="M${tx + 18} ${ty - 4}q6-8 12-6q4 4 0 8z" fill="#9a8a4a" ${Ow(1.4)}/><circle cx="${tx + 27}" cy="${ty - 7}" r="1.2" fill="${INK}"/>`),
          `<path d="M${tx + 18} ${ty - 3}q3-3 4 0z" fill="#9a8a4a" ${Ow(1.2)}/>`, 'tortoise'))
    // The lizard on its rock — in B it licks its eye while the camel plods by.
    const LIZ: [number, number] = [556, 834]
    const [lx, ly] = LIZ
    const lizardRock =
      `<path d="M500 860q4-28 40-30q44 0 52 30z" fill="url(#c14-rock)" ${Ow(1.8)}/><path d="M520 846q14-6 30-4" fill="none" stroke="#a8743f" stroke-width="2"/>` +
      `<path d="M${lx - 34} ${ly + 2}q10-6 22-4q14 0 20 2q-10 6-26 6q-8 0-16-4z" fill="#7fb04a" ${Ow(1.4)}/>` +
      `<path d="M${lx - 34} ${ly + 2}q-14 2-20 10" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M${lx - 34} ${ly + 2}q-14 2-20 10" fill="none" stroke="#7fb04a" stroke-width="2.2" stroke-linecap="round"/>` +
      `<path d="M${lx - 24} ${ly + 6}l-3 6M${lx - 4} ${ly + 6}l3 6" stroke="${INK}" stroke-width="2"/>` +
      `<ellipse cx="${lx + 2}" cy="${ly}" rx="10" ry="6" fill="#7fb04a" ${Ow(1.4)}/><circle cx="${lx + 2}" cy="${ly - 3}" r="3.2" fill="#ffd23f" ${Ow(1)}/><circle cx="${lx + 2.6}" cy="${ly - 3}" r="1.3" fill="${INK}"/>` +
      diff(lx + 4, ly - 6, 20, '',
        once(showIn([2.2, 4.8]), LIZ,
          anim({ type: 'keys', period: 0.8, keys: [{ t: 0, rot: 30, sx: 0.2 }, { t: 0.4, rot: -40, sx: 1, ease: 'inOut' }], pivot: [lx + 10, ly + 2] },
            `<path d="M${lx + 10} ${ly + 2}q8 0 6-8q-3-2-4 2" fill="none" stroke="#e8466b" stroke-width="2.4" stroke-linecap="round"/>`)),
        undefined, during(2.2, 4.8))

    // --- The oasis: palms (the dates of the near one orange in A, deep red in B), the pond, its lily pad (a flower in
    // A only) with the frog, the fish; the clay jar (its handle in A only), a scarab (A only), the dune with the
    // fennec (B), the vulture landing on the tall palm (B). ---
    const dates = (x: number, y: number, c: string) =>
      `<path d="M${x} ${y - 10}v8" stroke="#8a6236" stroke-width="2"/>` +
      [[-6, 0], [0, 2], [6, 0], [-3, 7], [3, 7], [0, 12]].map(([dx, dy]) => `<ellipse cx="${x + dx}" cy="${y + dy}" rx="3.4" ry="4.4" fill="${c}" ${Ow(1)}/>`).join('')
    const palms =
      palmTree(860, 742, 1, crown(5.2, 2, 'palmL'), -1, diff(828, 548, 24, dates(828, 544, '#f2a93b'), dates(828, 544, '#9a2a1e'), 'palmL') + dates(810, 544, '#f2a93b')) +
      palmTree(1300, 760, 0.95, crown(4.8, 2), -1, dates(1262, 560, '#f2a93b')) +
      palmTree(1120, 762, 1.15, crown(5.6, 2), 1, dates(1160, 534, '#f2a93b') + dates(1176, 538, '#f2a93b'))
    const [px, py] = POND
    const mud =
      `<ellipse cx="${px}" cy="${py + 4}" rx="178" ry="54" fill="#8a6a3e" ${Ow(2)}/>` +
      `<ellipse cx="${px}" cy="${py + 2}" rx="170" ry="48" fill="url(#c14-mud)"/>` +
      `<path d="M890 760l20 8l-8 14M960 750l10 14l18-4M1040 770l-14 10l6 12M1100 756l-12 8" fill="none" stroke="#5e4428" stroke-width="2"/>`
    const water = once(
      [{ t: 0, sx: 1, sy: 1, o: 1 }, { t: 6.8, ease: 'in' }, { t: DRAINED, sx: 0.08, sy: 0.08, o: 1, ease: 'step' }, { t: DRAINED + 0.05, o: 0, ease: 'step' }, { t: REFILL, sx: 0.3, sy: 0.3, o: 1, ease: 'out' }, { t: 13.6, sx: 1, sy: 1, ease: 'step' }],
      POND,
      `<ellipse cx="${px}" cy="${py}" rx="170" ry="46" fill="url(#c14-water)" ${Ow(1.6)}/>` +
        anim({ type: 'keys', period: 3, keys: [{ t: 0, x: 0 }, { t: 1.5, x: 12, ease: 'inOut' }] }, `<path d="M870 752h50M990 744h40M940 784h70M1060 770h40" stroke="#fff" stroke-opacity="0.6" stroke-width="3" stroke-linecap="round"/>`),
    )
    const swimmer = once(showIn([0, 8], [13.6, LOOP]), POND,
      anim({ type: 'path', period: 6, points: [[0, 0], [60, 8], [0, 14], [-60, 6]] }, `<g opacity="0.75">${fish(px - 30, py + 6, 0.7, '#f7a440')}</g>`))
    const FLOP: [number, number] = [958, 770]
    const flop = once(showIn([DRAINED - 0.2, REFILL + 0.1]), FLOP,
      anim({ type: 'keys', period: 0.6, keys: [{ t: 0, y: 0, rot: -25 }, { t: 0.3, y: -12, rot: 25, ease: 'inOut' }], pivot: FLOP }, fish(FLOP[0], FLOP[1] - 4, 0.8, '#f7a440')))
    // The sneeze throws the fish back in: a leap and a splash.
    const fishBack = once([{ t: 0, x: 0, y: 0, rot: 0, o: 0, ease: 'step' }, { t: REFILL + 0.1, o: 1, ease: 'out' }, { t: 13.4, x: 30, y: -70, rot: 120, ease: 'in' }, { t: 13.7, x: 50, y: 0, rot: 200, o: 1, ease: 'step' }, { t: 13.75, o: 0, ease: 'step' }], FLOP,
      fish(FLOP[0], FLOP[1] - 4, 0.8, '#f7a440'))
    const LILY: [number, number] = [1052, 760]
    const frogEyesWide = once(showIn([DRAINED, REFILL + 0.5]), LILY,
      `<circle cx="${LILY[0] - 8}" cy="${LILY[1] - 26}" r="4.2" fill="#fff" ${Ow(1)}/><circle cx="${LILY[0] + 8}" cy="${LILY[1] - 26}" r="4.2" fill="#fff" ${Ow(1)}/><circle cx="${LILY[0] - 8}" cy="${LILY[1] - 26}" r="1.4" fill="${INK}"/><circle cx="${LILY[0] + 8}" cy="${LILY[1] - 26}" r="1.4" fill="${INK}"/>`)
    const lily =
      lilyPad(LILY[0], LILY[1] + 4, 1.2) +
      frog(LILY[0], LILY[1] - 2, blink(2.9, 0.4), (m) => anim({ type: 'keys', period: 0.9, keys: [{ t: 0, sx: 1, sy: 1 }, { t: 0.45, sx: 1.35, sy: 1.35, ease: 'inOut' }], pivot: [LILY[0], LILY[1] - 11] }, m)) +
      frogEyesWide +
      diff(1078, 756, 18,
        `<path d="M1070 760q-2-10 6-12q4 6 4 12zM1086 760q2-10-6-12q-4 6-4 12z" fill="#ff9fc0" ${Ow(1.2)}/><path d="M1074 760q0-12 4-16q4 4 4 16z" fill="#ffc2d7" ${Ow(1.2)}/>`, '')
    const reeds = [[818, 742], [832, 748], [1140, 748], [1152, 742]]
      .map(([x, y]) => anim({ type: 'sway', angle: 5, pivot: [x, y], period: 2.6, phase: (x % 9) / 9 },
        `<path d="M${x} ${y}v-56" stroke="#5f8f3a" stroke-width="3"/><rect x="${x - 3}" y="${y - 70}" width="7" height="18" rx="3.5" fill="#7a4a22" ${Ow(1.2)}/><path d="M${x} ${y - 8}q-10-16-8-36" fill="none" stroke="#7fae3a" stroke-width="3"/>`))
      .join('')
    const jar =
      groundShadow(1180, 806, 24, 4) +
      `<path d="M1166 772q-14 14-8 28q6 8 22 8q16 0 22-8q6-14-8-28z" fill="url(#c14-clay)" ${Ow(1.8)}/><rect x="1170" y="764" width="20" height="9" rx="3" fill="#c46a3a" ${Ow(1.6)}/>` +
      `<path d="M1162 786h36" stroke="#f4e0c0" stroke-width="3" stroke-dasharray="4 4"/>` +
      diff(1200, 778, 18, `<path d="M1192 772q14 0 12 14q-2 6-8 4" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M1192 772q14 0 12 14q-2 6-8 4" fill="none" stroke="#c46a3a" stroke-width="3" stroke-linecap="round"/>`, '')
    const scarab = diff(660, 832, 20,
      `<path d="M652 838l-4 4M656 840l-1 5M664 840l1 5M668 838l4 4" stroke="${INK}" stroke-width="1.6"/><ellipse cx="660" cy="832" rx="10" ry="8" fill="#2f6f8a" ${Ow(1.4)}/><path d="M660 824v16" stroke="#8fd0e0" stroke-width="1.4"/><circle cx="660" cy="822" r="4" fill="#2f6f8a" ${Ow(1.2)}/>`, '')
    const dune = `<path d="M1150 760q60-70 150-60q90 10 140 40v30z" fill="url(#c14-dune)" ${Ow(1.8)}/><path d="M1200 730q40-20 80-18" fill="none" stroke="#c9944e" stroke-width="2"/>`
    const FEN: [number, number] = [1236, 712]
    const [fx, fy] = FEN
    const fennec = diff(fx, fy - 12, 34, '',
      keys('fennec', [{ t: 0, y: 30, o: 0, ease: 'step' }, { t: 14.8, o: 1, ease: 'out' }, { t: 15.2, y: 0, ease: 'step' }, { t: 16.8, ease: 'in' }, { t: 17.15, y: 30, o: 1, ease: 'step' }, { t: 17.2, o: 0, ease: 'step' }], FEN,
        `<g clip-path="url(#c14-dune-top)">` +
          `<path d="M${fx - 12} ${fy}l-8-30l18 18zM${fx + 12} ${fy}l8-30l-18 18z" fill="#f2c98a" ${Ow(1.6)}/><path d="M${fx - 13} ${fy - 6}l-4-16l9 10zM${fx + 13} ${fy - 6}l4-16l-9 10z" fill="#f7a6b4"/>` +
          `<ellipse cx="${fx}" cy="${fy + 6}" rx="14" ry="11" fill="#f2c98a" ${Ow(1.6)}/><circle cx="${fx - 5}" cy="${fy + 3}" r="2.4" fill="${INK}"/><circle cx="${fx + 5}" cy="${fy + 3}" r="2.4" fill="${INK}"/><circle cx="${fx}" cy="${fy + 10}" r="2" fill="${INK}"/></g>`),
      'fennec', during(14.8, 17.2))
    const VUL: [number, number] = [1166, 500]
    const perched = diff(VUL[0] + 2, VUL[1] - 18, 37, '',
      keys('vulture', [{ t: 0, x: -260, y: -260, o: 0, ease: 'step' }, { t: 15, o: 1, ease: 'out' }, { t: 15.8, x: 0, y: 0, ease: 'step' }, { t: 19.5, ease: 'in' }, { t: 19.55, o: 1, ease: 'step' }, { t: 19.6, o: 0, ease: 'step' }], VUL,
        `<path d="M${VUL[0] - 6} ${VUL[1]}v6M${VUL[0] + 4} ${VUL[1]}v6" stroke="#c9a06a" stroke-width="3"/>` +
          // Hunched, wings like a cloak, a white ruff, a bald pink head on a short neck, a hooked beak.
          `<path d="M${VUL[0] - 22} ${VUL[1] + 2}q-6-30 16-34q24-2 26 20q2 12-6 16z" fill="#3e3442" ${Ow(1.6)}/><path d="M${VUL[0] - 16} ${VUL[1] - 6}q8-14 22-14M${VUL[0] - 12} ${VUL[1]}q10-10 24-8" fill="none" stroke="#5e5462" stroke-width="2"/>` +
          `<ellipse cx="${VUL[0] + 8}" cy="${VUL[1] - 30}" rx="13" ry="7" fill="#f4ead0" ${Ow(1.4)}/>` +
          `<circle cx="${VUL[0] + 14}" cy="${VUL[1] - 40}" r="8" fill="#e8a088" ${Ow(1.4)}/><path d="M${VUL[0] + 20} ${VUL[1] - 44}q10 0 8 10q-4-4-8-4z" fill="#e8c06a" ${Ow(1.2)}/>` +
          `<circle cx="${VUL[0] + 16}" cy="${VUL[1] - 43}" r="1.6" fill="${INK}"/><path d="M${VUL[0] + 11} ${VUL[1] - 47}l8 2" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`),
      'vulture', during(15, 19.6))

    // --- The camel. ---
    const [ex, ey] = CAMEL
    const leg = (x: number, k: Keyframe[], far: boolean) =>
      keys(undefined, k, [x, ey - 100],
        `<path d="M${x - 8} ${ey - 102}l2 46l-3 4l2 46h11l-1-46l3-4l-3-46z" fill="${far ? '#b08048' : 'url(#c14-camel)'}" ${Ow(1.8)}/><ellipse cx="${x + 2}" cy="${ey - 2}" rx="9" ry="4" fill="#6e4a26" ${Ow(1.4)}/>`)
    const WALKS: [number, number, number][] = [[PLOD[0], PLOD[1], 0.4], [GALLOP[0], GALLOP[1], 0.2]]
    const standing =
      leg(ex - 34, swing(WALKS, 18, true), true) + leg(ex + 52, swing(WALKS, 18), true) +
      `<ellipse cx="${ex}" cy="${ey - 120}" rx="72" ry="36" fill="url(#c14-camel)" ${Ow(2.2)}/>` +
      leg(ex - 46, swing(WALKS, 18), false) + leg(ex + 40, swing(WALKS, 18, true), false)
    const folded =
      `<ellipse cx="${ex - 40}" cy="${ey - 82}" rx="28" ry="10" fill="#b08048" ${Ow(1.8)}/><ellipse cx="${ex + 46}" cy="${ey - 82}" rx="28" ry="10" fill="#b08048" ${Ow(1.8)}/>` +
      `<ellipse cx="${ex}" cy="${ey - 120}" rx="72" ry="36" fill="url(#c14-camel)" ${Ow(2.2)}/>` +
      `<ellipse cx="${ex - 56}" cy="${ey - 84}" rx="14" ry="6" fill="#6e4a26" ${Ow(1.4)}/><ellipse cx="${ex + 70}" cy="${ey - 84}" rx="14" ry="6" fill="#6e4a26" ${Ow(1.4)}/>`
    const swell: Keyframe[] = [{ t: 0, sx: 1, sy: 1 }, { t: 6.8, ease: 'inOut' }, { t: 9, sx: 1.32, sy: 1.95, ease: 'step' }, { t: REFILL, ease: 'out' }, { t: 13.5, sx: 1, sy: 1, ease: 'step' }]
    const humps = once(swell, [ex - 5, ey - 140],
      `<path d="M${ex - 62} ${ey - 136}q8-60 40-58q22 4 26 36q12-40 40-36q28 6 22 58z" fill="url(#c14-camel)" ${Ow(2.2)}/>` +
        `<path d="M${ex - 40} ${ey - 176}q10-8 20-4M${ex + 18} ${ey - 172}q10-8 20-2" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="4" stroke-linecap="round"/>`)
    const belly = once([{ t: 0, sx: 1, sy: 1 }, { t: 6.8, ease: 'inOut' }, { t: 9, sx: 1.16, sy: 1.4, ease: 'step' }, { t: REFILL, ease: 'out' }, { t: 13.5, sx: 1, sy: 1, ease: 'step' }], [ex, ey - 104],
      `<ellipse cx="${ex + 2}" cy="${ey - 104}" rx="52" ry="20" fill="#e9c48a"/>`)
    const tassel = (x: number) => `<path d="M${x} ${ey - 102}v8" stroke="#d1495b" stroke-width="2"/><circle cx="${x}" cy="${ey - 91}" r="3.4" fill="#ffd23f" ${Ow(1)}/>`
    const blanket =
      `<path d="M${ex - 42} ${ey - 142}h74l-2 40h-70z" fill="#d1495b" ${Ow(1.8)}/>` +
      `<path d="M${ex - 42} ${ey - 128}l8 6l8-6l8 6l8-6l8 6l8-6l8 6l8-6l8 6" fill="none" stroke="#ffd23f" stroke-width="3"/><path d="M${ex - 41} ${ey - 110}h70" stroke="#2f6f8a" stroke-width="4"/>` +
      tassel(ex - 34) + tassel(ex - 20) + tassel(ex - 6) + tassel(ex + 22) +
      diff(ex + 8, ey - 94, 18, tassel(ex + 8), '', 'camel')
    const tail = anim({ type: 'sway', angle: 14, pivot: [ex - 70, ey - 128], period: 1.6 },
      `<path d="M${ex - 70} ${ey - 128}q-12 10-10 36" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${ex - 70} ${ey - 128}q-12 10-10 36" fill="none" stroke="#c9944e" stroke-width="3" stroke-linecap="round"/><path d="M${ex - 82} ${ey - 94}l2 10l6-8z" fill="#6e4a26" ${Ow(1.2)}/>`)
    // The head: tired, startled, slurping, blissful, sneezing, dazed, grumpy.
    const [hx, hy] = [ex + 108, ey - 214]
    const halfLid = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="5" fill="#fff" ${Ow(1.2)}/><circle cx="${x + 1}" cy="${y + 1}" r="2.2" fill="${INK}"/><path d="M${x - 6} ${y - 1}q6-6 12 0z" fill="#c9944e" ${Ow(1.2)}/>`
    const eyes =
      once(showIn([0, 4.6], [14.8, LOOP]), CAMEL, halfLid(hx, hy - 6)) +
      once(showIn([4.6, 5.4], [13.1, 14.8]), CAMEL, `<circle cx="${hx}" cy="${hy - 7}" r="7.5" fill="#fff" ${Ow(1.4)}/><circle cx="${hx + 1}" cy="${hy - 7}" r="2.4" fill="${INK}"/>`) +
      once(showIn([5.4, 6.75], [9.5, 9.8]), CAMEL, `<circle cx="${hx}" cy="${hy - 6}" r="5" fill="#fff" ${Ow(1.2)}/><circle cx="${hx + 1.5}" cy="${hy - 6}" r="2.4" fill="${INK}"/>`) +
      once(showIn([6.75, 9.5], [9.8, 11.9]), CAMEL, `<path d="M${hx - 6} ${hy - 6}q6 5 12 0" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`) +
      once(showIn([11.9, 13.1]), CAMEL, `<path d="M${hx - 6} ${hy - 9}l11 3l-11 3" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`)
    const mouth =
      // Panting, tongue out.
      once(showIn([0, 4.6]), CAMEL,
        anim({ type: 'keys', period: 0.5, keys: [{ t: 0, sy: 1 }, { t: 0.25, sy: 1.3, ease: 'inOut' }], pivot: [ex + 126, ey - 196] },
          `<path d="M${ex + 122} ${ey - 196}q2 12 8 12q4-6 0-12z" fill="#f58aa0" ${Ow(1.2)}/>`)) +
      // Pursed for the slurp.
      once(showIn([6.75, 9.0]), CAMEL, `<ellipse cx="${ex + 133}" cy="${ey - 198}" rx="5" ry="4" fill="#7a2a2a" ${Ow(1.2)}/>`) +
      // A blissful smile.
      once(showIn([9.0, 11.9]), CAMEL, `<path d="M${ex + 118} ${ey - 198}q8 6 16 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`) +
      // Ah... ah...: nostrils flaring.
      once(showIn([11.9, 13.1]), CAMEL, anim({ type: 'keys', period: 0.35, keys: [{ t: 0, sx: 1, sy: 1 }, { t: 0.17, sx: 1.6, sy: 1.6, ease: 'inOut' }], pivot: [ex + 138, ey - 212] }, `<ellipse cx="${ex + 138}" cy="${ey - 212}" rx="3" ry="2.4" fill="${INK}"/>`)) +
      once(showIn([13.1, LOOP]), CAMEL, `<path d="M${ex + 120} ${ey - 196}q6-4 14 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`)
    const sweat = once(showIn([0, 4.6]), CAMEL,
      [[0, 0], [10, 0.5]].map(([dx, phase]) => anim({ type: 'keys', period: 1, phase, keys: [{ t: 0, y: 0, o: 1 }, { t: 1, y: 16, o: 0 }], pivot: [hx - 10 + dx, hy - 20] },
        `<path d="M${hx - 10 + dx} ${hy - 22}q4 6 0 8q-4-2 0-8z" fill="#8fd3f0" ${Ow(1)}/>`)).join(''))
    const surprise = once(showIn([4.6, 5.3]), CAMEL,
      `<path d="M${hx + 46} ${hy - 30}h8l-2 20h-4z" fill="#e63946" ${Ow(1.6)}/><circle cx="${hx + 50}" cy="${hy - 3}" r="3.5" fill="#e63946" ${Ow(1.4)}/>`)
    const head =
      `<path d="M${ex + 42} ${ey - 146}q34-22 44-72q4-14 18-10l10 8q-10 34-32 86z" fill="url(#c14-camel)" ${Ow(2)}/>` +
      `<path d="M${ex + 92} ${ey - 220}l-6-12l12 6z" fill="#b08048" ${Ow(1.4)}/>` +
      `<ellipse cx="${hx}" cy="${hy}" rx="26" ry="15" fill="url(#c14-camel)" ${Ow(2)}/>` +
      `<ellipse cx="${ex + 128}" cy="${ey - 205}" rx="15" ry="11" fill="#e9c48a" ${Ow(1.8)}/>` +
      `<path d="M${ex + 136} ${ey - 214}q4-2 5 2" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>` +
      `<path d="M${ex + 118} ${ey - 196}q10 8 22 0" fill="#d9a870" ${Ow(1.4)}/>` +
      eyes + mouth + sweat + surprise
    const neck = keys(undefined, neckKeys, NECK, head)
    const camel = keys('camel', camelKeys(), CAMEL,
      groundShadow(ex + 6, ey, 90, 9) +
        tail +
        once(showIn([0, 9.5]), CAMEL, standing) +
        once(showIn([9.5, LOOP]), CAMEL, folded) +
        humps + belly + blanket + neck +
        // Dripping after the sneeze.
        once(showIn([13.2, 16]), CAMEL,
          [[-30, 0], [10, 0.3], [50, 0.6]].map(([dx, phase]) => anim({ type: 'keys', period: 0.9, phase, keys: [{ t: 0, y: 0, o: 1 }, { t: 0.9, y: 18, o: 0 }], pivot: [ex + dx, ey - 90] },
            `<path d="M${ex + dx} ${ey - 92}q3 4 0 6q-3-2 0-6z" fill="#8fd3f0" ${Ow(0.8)}/>`)).join('')))

    // The slurp: a stream of water from the pond into its mouth.
    const stream = once(showIn([6.8, DRAINED - 0.1]), [860, 766],
      `<path d="M812 764q30 -6 60 2t60 0" fill="none" stroke="#4fa8d8" stroke-width="10" stroke-linecap="round"/>` +
        anim({ type: 'keys', period: 0.4, keys: [{ t: 0, x: 0 }, { t: 0.4, x: -20 }] }, `<path d="M830 762h8M856 765h8M882 767h8M908 766h8" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`))
    // The feather from the vultures, drifting onto its nose.
    const NOSE: [number, number] = [ex + 138 + 620, ey - 212 + LIE]
    const feather = once(
      [{ t: 0, x: -60, y: -150, rot: -30, o: 0, ease: 'step' }, { t: 11, o: 1, ease: 'inOut' }, { t: 11.4, x: -20, y: -100, rot: 20, ease: 'inOut' }, { t: 11.8, x: -40, y: -50, rot: -20, ease: 'inOut' }, { t: 12.2, x: 0, y: -6, rot: 10, ease: 'step' }, { t: 13.05, ease: 'out' }, { t: 13.6, x: 160, y: -200, rot: 300, o: 0, ease: 'step' }],
      NOSE,
      `<path d="M${NOSE[0] - 14} ${NOSE[1] - 4}q14-12 28 0q-14 8-28 0z" fill="#5e5462" ${Ow(1.2)}/><path d="M${NOSE[0] - 16} ${NOSE[1] - 3}h30" stroke="#f4ead0" stroke-width="1.2"/>`)
    // ATCHOO: a spray of water from its nose back into the pond.
    const SNEEZE: [number, number] = [860, 734]
    const spray =
      once([{ t: 0, sx: 0.1, sy: 0.1, o: 0, ease: 'step' }, { t: 13.05, o: 1, ease: 'out' }, { t: 13.3, sx: 1, sy: 1, ease: 'step' }, { t: 13.6, o: 0, ease: 'step' }], SNEEZE,
        `<path d="M${SNEEZE[0]} ${SNEEZE[1]}q60-70 140-20" fill="none" stroke="#4fa8d8" stroke-width="22" stroke-linecap="round"/><path d="M${SNEEZE[0]} ${SNEEZE[1]}q60-70 140-20" fill="none" stroke="#bfe6f8" stroke-width="12" stroke-linecap="round"/>` +
          `<path d="M${SNEEZE[0]} ${SNEEZE[1]}q70-20 170 18" fill="none" stroke="#4fa8d8" stroke-width="14" stroke-linecap="round"/>`) +
      // The ATCHOO burst.
      once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t: 13.05, o: 1, ease: 'out' }, { t: 13.2, sx: 1.1, sy: 1.1, ease: 'inOut' }, { t: 13.45, sx: 1, sy: 1, o: 1, ease: 'step' }, { t: 13.5, o: 0, ease: 'step' }], [SNEEZE[0] + 10, SNEEZE[1] - 10],
        `<path d="M${SNEEZE[0] + 10} ${SNEEZE[1] - 40}l6 16l16-6l-8 14l15 8l-17 3l3 17l-13-10l-10 13l-2-17l-17 1l12-11l-11-12l17 2z" fill="#ffe066" fill-opacity="0.9" ${Ow(1.6)}/>`) +
      [[40, -90], [90, -110], [140, -70], [180, -30], [120, -40], [70, -60], [200, 10]]
        .map(([dx, dy], i) => once([{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t: 13.05, o: 1, ease: 'out' }, { t: 13.3 + i * 0.02, x: dx, y: dy, ease: 'in' }, { t: 13.65, x: dx * 1.1, y: dy + 70, o: 1, ease: 'step' }, { t: 13.7, o: 0, ease: 'step' }], SNEEZE,
          `<ellipse cx="${SNEEZE[0]}" cy="${SNEEZE[1]}" rx="4" ry="6" fill="#bfe6f8" ${Ow(1)}/>`))
        .join('')
    const refillRings = once(showIn([REFILL, 15]), POND,
      [0, 0.6].map((phase) => anim({ type: 'keys', period: 1.2, phase, keys: [{ t: 0, sx: 0.4, sy: 0.4, o: 0.9 }, { t: 1.2, sx: 1, sy: 1, o: 0 }], pivot: POND },
        `<ellipse cx="${px}" cy="${py}" rx="150" ry="40" fill="none" stroke="#fff" stroke-width="2.6"/>`)).join(''))
    // A burp bubble while it lies there swollen.
    const burp = once(showIn([10.1, 10.9]), [ex + 140 + 620, ey - 196 + LIE],
      anim({ type: 'keys', period: 0.8, keys: [{ t: 0, x: 0, y: 0, sx: 0.4, sy: 0.4, o: 1 }, { t: 0.8, x: 14, y: -40, sx: 1.2, sy: 1.2, o: 0 }], pivot: [ex + 140 + 620, ey - 196 + LIE] },
        `<circle cx="${ex + 140 + 620}" cy="${ey - 196 + LIE}" r="8" fill="#e8f6ff" fill-opacity="0.6" ${Ow(1.2)}/>`))

    // Tumbleweed rolling across, a dragonfly over the pond.
    const tumble = anim({ type: 'path', period: 11, phase: 0.3, points: [[-200, 0], [1700, 0]] },
      anim({ type: 'keys', period: 0.6, keys: [{ t: 0, y: 0 }, { t: 0.3, y: -14, ease: 'out' }, { t: 0.6, y: 0, ease: 'in' }], pivot: [0, 850] },
        anim({ type: 'rotate', pivot: [0, 850], period: 1.2 }, `<circle cx="0" cy="850" r="16" fill="none" stroke="#a8743f" stroke-width="2"/><path d="M-12 842q12 4 24-4M-14 854q14-6 26 6M-4 836q2 14 10 28" fill="none" stroke="#a8743f" stroke-width="2"/>`)))
    const fly = anim({ type: 'path', period: 7, points: [[0, 0], [80, -20], [160, 10], [70, 20]] },
      dragonfly(900, 700, (m) => anim({ type: 'keys', period: 0.1, keys: [{ t: 0, sy: 1 }, { t: 0.05, sy: 0.5 }], pivot: [900, 696] }, m)))
    const birds = keys(undefined, [{ t: 0, x: 0 }, { t: 19.9, x: -1500 }], [1460, 240],
      ([[1460, 240], [1482, 230], [1486, 252]] as [number, number][]).map(([bx, by], i) => farBird(bx, by, beat([bx, by - 2], 0.5, i * 0.2))).join(''))

    return (
      `<defs>${NATURE_DEFS}${BEACH_DEFS}` +
      `<linearGradient id="c14-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fb0e6"/><stop offset="0.6" stop-color="#bfe2f2"/><stop offset="1" stop-color="#fbe9c4"/></linearGradient>` +
      `<radialGradient id="c14-glow"><stop offset="0" stop-color="#fff4c4" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffe08a" stop-opacity="0.45"/><stop offset="1" stop-color="#ffe08a" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c14-far" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2cf94"/><stop offset="1" stop-color="#e8b878"/></linearGradient>` +
      `<linearGradient id="c14-dune" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7d79a"/><stop offset="1" stop-color="#d9a861"/></linearGradient>` +
      `<linearGradient id="c14-sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2cf8a"/><stop offset="1" stop-color="#e8b870"/></linearGradient>` +
      `<linearGradient id="c14-cactus" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3f8f4a"/><stop offset="0.6" stop-color="#6fc062"/><stop offset="1" stop-color="#8fd47a"/></linearGradient>` +
      `<radialGradient id="c14-pear" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#9fd47a"/><stop offset="1" stop-color="#4f9a46"/></radialGradient>` +
      `<radialGradient id="c14-shell" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#c9a85a"/><stop offset="1" stop-color="#7a6a3a"/></radialGradient>` +
      `<linearGradient id="c14-rock" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d98a5a"/><stop offset="1" stop-color="#a85a3a"/></linearGradient>` +
      `<radialGradient id="c14-mud" cx="0.5" cy="0.4" r="0.7"><stop offset="0" stop-color="#a8844e"/><stop offset="1" stop-color="#7a5a32"/></radialGradient>` +
      `<radialGradient id="c14-water" cx="0.55" cy="0.35" r="0.75"><stop offset="0" stop-color="#bfeaf7"/><stop offset="0.6" stop-color="#6fc3e0"/><stop offset="1" stop-color="#3f9cc4"/></radialGradient>` +
      `<radialGradient id="c14-clay" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#e8946a"/><stop offset="1" stop-color="#a8502e"/></radialGradient>` +
      `<radialGradient id="c14-camel" cx="0.62" cy="0.3" r="0.85"><stop offset="0" stop-color="#e8c08a"/><stop offset="0.55" stop-color="#d0a066"/><stop offset="1" stop-color="#a8743f"/></radialGradient>` +
      `<radialGradient id="c14-sunlight" cx="0.82" cy="0.17" r="1"><stop offset="0" stop-color="#fff2c4" stop-opacity="0.32"/><stop offset="0.5" stop-color="#fff2c4" stop-opacity="0.08"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></radialGradient>` +
      `<clipPath id="c14-dune-top"><rect x="${FEN[0] - 40}" y="${FEN[1] - 50}" width="80" height="62"/></clipPath></defs>` +
      sky +
      circling +
      birds +
      ground +
      shimmer +
      ripples +
      palms +
      mud +
      water +
      swimmer +
      reeds +
      lily +
      flop +
      fishBack +
      refillRings +
      fennec +
      dune +
      jar +
      perched +
      saguaro +
      pricklyPear +
      lizardRock +
      tortoise +
      scarab +
      camel +
      scorpionAll +
      stream +
      spray +
      burp +
      feather +
      fly +
      tumble +
      `<rect width="${W}" height="${H}" fill="url(#c14-sunlight)"/>`
    )
  },
})
