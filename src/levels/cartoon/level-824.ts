// Cartoon "The short arms" (docs/cartoon-mode.md), made like 812: a 20 s story in a prehistoric valley told by a
// camera. A young T-rex wants the fruit hanging from a tree — it jumps, jumps higher, stretches on tiptoe with its
// tiny arms waving, wobbles and plops down on its bottom. A long-necked brachiosaur strolls up, kindly lowers its head
// to the fruit — and eats it itself. The T-rex sulks (it cannot even reach its eye to wipe a tear, a little rain
// cloud over its head) until the volcano rumbles, the ground shakes, and another fruit drops straight into its open
// mouth. Twelve differences: two hard (a spike on the T-rex's back, an ammonite in a rock), three events of B (a
// baby triceratops peeking from the ferns, an egg hatching in the nest, a pterosaur landing on the volcano's rock).
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { dragonfly, groundShadow, INK, keenOwl, NATURE_DEFS, O, Ow, puffCloud, swingKeys } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

/** The ground shakes after the volcano's rumble: the camera jolts. */
const shake: CameraKey[] = Array.from({ length: 10 }, (_, i) => ({ t: Math.round((16.2 + i * 0.08) * 100) / 100, x: 300 + (i % 2 ? 9 : -9), y: 400 + (i % 3) * 4, w: 600, ease: 'linear' as const }))

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // Along the valley: the tree fern with the owl, the steaming spring, the ferns, to the T-rex under its tree.
  { t: 1.6, x: 0, y: 400, w: 600, ease: 'inOut' },
  { t: 3.6, x: 200, y: 410, w: 620, ease: 'step' },
  // Jump, jump, JUMP — stretch on tiptoe — topple over.
  { t: 3.65, x: 200, y: 410, w: 620, ease: 'linear' },
  { t: 7.9, x: 205, y: 412, w: 615, ease: 'step' },
  // The brachiosaur strolls up.
  { t: 7.95, x: 360, y: 300, w: 760, ease: 'linear' },
  { t: 9.75, x: 340, y: 300, w: 760, ease: 'step' },
  // It lowers its head to the fruit... and eats it.
  { t: 9.8, x: 400, y: 360, w: 560, ease: 'linear' },
  { t: 12.35, x: 405, y: 362, w: 552, ease: 'step' },
  // The T-rex sulks.
  { t: 12.4, x: 280, y: 440, w: 580, ease: 'linear' },
  { t: 14.55, x: 284, y: 442, w: 574, ease: 'step' },
  // The volcano rumbles.
  { t: 14.6, x: 960, y: 250, w: 460, ease: 'linear' },
  { t: 16.15, x: 966, y: 254, w: 452, ease: 'step' },
  // The ground shakes...
  ...shake,
  { t: 17, x: 300, y: 400, w: 600, ease: 'step' },
  // ...and a fruit drops into its mouth: chomp.
  { t: 17.05, x: 340, y: 470, w: 420, ease: 'linear' },
  { t: 19.95, x: 350, y: 474, w: 410, ease: 'step' },
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

/** The T-rex's feet, under the fruit tree; it faces right. */
const REX: [number, number] = [480, 792]
const rexKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, rot: 0, sx: 1, sy: 1 },
  { t: 3.9, ease: 'out' },
  // Three jumps, each a little higher — never high enough.
  { t: 4.15, sy: 0.9, ease: 'out' },
  { t: 4.35, y: -44, sy: 1.05, ease: 'out' },
  { t: 4.6, y: 0, sy: 1, ease: 'in' },
  { t: 4.7, sy: 0.92, ease: 'out' },
  { t: 4.8, sy: 1, ease: 'inOut' },
  { t: 5.1, sy: 0.9, ease: 'out' },
  { t: 5.3, y: -52, sy: 1.05, ease: 'out' },
  { t: 5.55, y: 0, sy: 1, ease: 'in' },
  { t: 5.65, sy: 0.9, ease: 'out' },
  { t: 5.75, sy: 1, ease: 'inOut' },
  { t: 6, sy: 0.88, ease: 'out' },
  { t: 6.2, y: -62, sy: 1.06, ease: 'out' },
  { t: 6.45, y: 0, sy: 1, ease: 'in' },
  // On tiptoe, stretching — wobble, wobble — and down it plops on its bottom.
  { t: 6.55, sy: 1.08, ease: 'inOut' },
  { t: 6.7, rot: 6, ease: 'inOut' },
  { t: 6.85, rot: -6, ease: 'inOut' },
  { t: 7, rot: 4, sy: 1.08, ease: 'in' },
  { t: 7.25, rot: -18, y: 4, sy: 0.78, ease: 'out' },
  { t: 7.9, rot: -18, y: 4, sy: 0.78, ease: 'inOut' },
  { t: 8.4, rot: 0, y: 0, sy: 1 },
  // Sulking: it sits down.
  { t: 12.4, ease: 'inOut' },
  { t: 12.7, sy: 0.86, y: 6 },
  // The ground shakes: it stands up, wobbling, looking up, mouth open.
  { t: 16.2, sy: 0.86, y: 6, ease: 'out' },
  { t: 16.35, sy: 1, y: 0, rot: 0, ease: 'inOut' },
  { t: 16.5, rot: 4, ease: 'inOut' },
  { t: 16.65, rot: -4, ease: 'inOut' },
  { t: 16.8, rot: 3, ease: 'inOut' },
  { t: 16.95, rot: 0, ease: 'out' },
  // Chomp — happy hops.
  { t: 17.1, sy: 0.9, ease: 'out' },
  { t: 17.25, sy: 1, ease: 'inOut' },
  ...[17.6, 18.2, 18.8, 19.4].flatMap((t) => [{ t, y: -16, ease: 'in' as const }, { t: t + 0.3, y: 0, ease: 'out' as const }]),
  { t: 19.95, ease: 'step' },
]

/** The fruit tree: the fruit the brachiosaur eats, and the one that falls into the T-rex's mouth. */
const FRUIT1: [number, number] = [630, 488]
const FRUIT2: [number, number] = [552, 478]
/** Where the falling fruit lands: in the T-rex's open mouth. */
const MOUTH: [number, number] = [REX[0] + 70, REX[1] - 162]

/** The brachiosaur's feet: grazing at the right edge at first, it strolls in to reach the fruit, then goes back. */
const BRACHIO: [number, number] = [980, 792]
const BR_WALK: [number, number][] = [[7.45, 9.6], [12.8, 14.6]]
const brachioKeys: Keyframe[] = [
  { t: 0, x: 380, y: 0 },
  { t: 7.45, ease: 'out' },
  { t: 9.6, x: -42, ease: 'step' },
  { t: 12.8, ease: 'inOut' },
  { t: 14.6, x: 380, ease: 'step' },
]
/** Its neck turns about its root to bring the head down to FRUIT1. */
const NECK: [number, number] = [930, 640]
const neckKeys: Keyframe[] = [
  { t: 0, rot: -60 },
  // Grazing at the edge, it lifts its head as it sets off.
  { t: 7.2, ease: 'inOut' },
  { t: 8, rot: 0, ease: 'step' },
  { t: 9.8, ease: 'inOut' },
  { t: 10.6, rot: -38, ease: 'step' },
  { t: 10.8, ease: 'inOut' },
  { t: 11.6, rot: 0, ease: 'step' },
  // Back to the edge to graze (head low, out of the volcano's shot).
  { t: 13.4, ease: 'inOut' },
  { t: 14.2, rot: -60, ease: 'step' },
  { t: 19.95, ease: 'step' },
]

export default svgLevel({
  id: 824,
  chapter: 'cartoon',
  title: 'cartoonShortArms',
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
    const sway = (angle: number, period: number, pivot: [number, number], m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 11) / 11 }, m)
    const star = (x: number, y: number, r = 6, c = '#ffd23f') =>
      `<path d="M${x} ${y - r}l${r * 0.3} ${r * 0.6}l${r * 0.7} ${r * 0.1}l-${r * 0.5} ${r * 0.5}l${r * 0.15} ${r * 0.7}l-${r * 0.65}-${r * 0.35}l-${r * 0.65} ${r * 0.35}l${r * 0.15}-${r * 0.7}l-${r * 0.5}-${r * 0.5}l${r * 0.7}-${r * 0.1}z" fill="${c}" ${Ow(1)}/>`
    const fruit = (x: number, y: number, r = 11) =>
      `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#c24-fruit)" ${Ow(1.6)}/><path d="M${x} ${y - r}l3-6" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>` +
      `<path d="M${x + 2} ${y - r - 4}q8-4 10 2q-6 2-10-2z" fill="#6fbf4a" ${Ow(1)}/><circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.25}" fill="#fff" fill-opacity="0.6"/>`

    // --- Sky, the far mountains in haze, the volcano with its smoke, pterosaurs gliding. ---
    let smoke = ''
    for (let i = 0; i < 5; i++) {
      smoke += anim({ type: 'keys', period: 5, phase: i / 5, keys: [{ t: 0, x: 0, y: 0, sx: 0.5, sy: 0.5, o: 0.9 }, { t: 5, x: 50, y: -200, sx: 1.8, sy: 1.8, o: 0 }], pivot: [1180, 330] },
        `<circle cx="1180" cy="330" r="26" fill="#8d8792"/><circle cx="1164" cy="320" r="18" fill="#a39ca8"/>`)
    }
    const pterosaur = (x: number, y: number, s: number, flap: (m: string) => string) =>
      `<g transform="translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})">` +
      flap(`<path d="M${x} ${y}q-26-20-56-4q22 0 30 12zM${x} ${y}q26-20 56-4q-22 0-30 12z" fill="#c9845a" ${Ow(1.6)}/>`) +
      `<ellipse cx="${x}" cy="${y + 2}" rx="10" ry="6" fill="#d99a6a" ${Ow(1.4)}/><path d="M${x + 6} ${y - 2}l20 4l-18 4z" fill="#f2c38a" ${Ow(1.2)}/><path d="M${x + 4} ${y - 4}l-10-10l8 2z" fill="#c9845a" ${Ow(1.2)}/></g>`
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c24-sky)"/>` +
      `<circle cx="300" cy="160" r="190" fill="url(#c24-glow)"/><circle cx="300" cy="160" r="46" fill="#ffd56a" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="286" cy="152" rx="4.5" ry="7" fill="${INK}"/><ellipse cx="314" cy="152" rx="4.5" ry="7" fill="${INK}"/><path d="M282 174q18 14 36 0" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>` +
      anim({ type: 'path', points: [[0, 0], [140, 0]], period: 34 }, puffCloud(620, 130, 0.9)) +
      anim({ type: 'path', points: [[0, 0], [-100, 0]], period: 28 }, puffCloud(900, 90, 0.7)) +
      keys(undefined, [{ t: 0, x: 0, y: 0 }, { t: 10, y: 30, ease: 'inOut' }, { t: 19.9, x: -1500, y: 0 }], [1460, 220],
        [[1460, 220, 0.8], [1520, 250, 0.6]].map(([px, py, s], i) => pterosaur(px, py, s, beat([px, py], 0.8, i * 0.3))).join('')) +
      `<path d="M0 560l120-90l90 60l130-120l150 110l110-70l160 120V700H0z" fill="#a9b7b8" fill-opacity="0.8"/>` +
      // The volcano: dark slopes, a glowing crater, a lava trickle, smoke.
      `<path d="M960 660l190-330h60l220 330z" fill="url(#c24-volcano)" ${Ow(2)}/>` +
      `<path d="M1150 330q30 18 60 0l-6 14q-24 10-48 0z" fill="#ff7a2a" ${Ow(1.4)}/>` +
      anim({ type: 'blink', duty: 0.5, period: 1.6, phase: 0 }, `<path d="M1160 336q20 10 40 0" fill="none" stroke="#ffd23f" stroke-width="4" stroke-linecap="round"/>`) +
      `<path d="M1196 344q-6 40 14 80q10 30-4 60" fill="none" stroke="#ff7a2a" stroke-width="6" stroke-linecap="round"/><path d="M1196 344q-6 40 14 80q10 30-4 60" fill="none" stroke="#ffd23f" stroke-width="2" stroke-linecap="round"/>` +
      smoke +
      `<path d="M0 640q240-40 480-10t480-20t480 10V900H0z" fill="url(#c24-hill)"/>`

    // --- The ground: grass, ferns, horsetails, giant dragonflies; the steaming spring and the tree fern with the owl. ---
    let tufts = ''
    for (let i = 0; i < 30; i++) {
      const tx = Math.round(rand() * W)
      const ty = Math.round(700 + rand() * 190)
      tufts += sway(7, 2.4, [tx, ty], `<path d="M${tx - 6} ${ty}q2-12 0-18M${tx} ${ty}q1-16 4-22M${tx + 6} ${ty}q-1-10 4-14" fill="none" stroke="#5a8a2e" stroke-width="2.6" stroke-linecap="round"/>`)
    }
    const fern = (x: number, y: number, s: number) => {
      let m = ''
      for (const a of [-70, -40, -10, 20, 50]) {
        const r = (a * Math.PI) / 180
        const ex = Math.round(x + Math.sin(r) * 70 * s)
        const ey = Math.round(y - Math.cos(r) * 64 * s)
        m += `<path d="M${x} ${y}Q${Math.round((x + ex) / 2 + 6 * s)} ${Math.round((y + ey) / 2 - 10 * s)} ${ex} ${ey}" fill="none" stroke="#3f7d2e" stroke-width="${2.4 * s}"/>`
        for (let i = 1; i < 6; i++) {
          const fx = Math.round(x + ((ex - x) * i) / 6)
          const fy = Math.round(y + ((ey - y) * i) / 6)
          m += `<ellipse cx="${fx}" cy="${fy}" rx="${8 * s}" ry="${3.4 * s}" transform="rotate(${a - 60} ${fx} ${fy})" fill="#5fae4a" ${Ow(0.8)}/><ellipse cx="${fx}" cy="${fy}" rx="${8 * s}" ry="${3.4 * s}" transform="rotate(${a + 60} ${fx} ${fy})" fill="#4f9e3e" ${Ow(0.8)}/>`
        }
      }
      return sway(4, 3.2, [x, y], m)
    }
    const horsetail = (x: number, y: number, h: number) =>
      `<path d="M${x} ${y}v-${h}" stroke="#7a9a3a" stroke-width="5"/>` +
      Array.from({ length: Math.floor(h / 16) }, (_, i) => `<path d="M${x - 9} ${y - 12 - i * 16}l9 -6l9 6" fill="none" stroke="#5a7a2a" stroke-width="2"/>`).join('')
    const treeFern = (x: number, y: number) => {
      let fronds = ''
      for (const a of [-150, -120, -90, -60, -30, -170, -10]) {
        const r = (a * Math.PI) / 180
        const ex = Math.round(x + Math.cos(r) * 90)
        const ey = Math.round(y - 210 + Math.sin(r) * 40 + 40)
        fronds += `<path d="M${x} ${y - 210}Q${Math.round((x + ex) / 2)} ${y - 250} ${ex} ${ey}" fill="none" stroke="#3a8a3a" stroke-width="12" stroke-linecap="round"/><path d="M${x} ${y - 210}Q${Math.round((x + ex) / 2)} ${y - 250} ${ex} ${ey}" fill="none" stroke="#6fbf4a" stroke-width="6" stroke-dasharray="6 3" stroke-linecap="round"/>`
      }
      return (
        groundShadow(x, y, 40, 6) +
        `<path d="M${x - 10} ${y}q-4-110 4-210h12q8 100 4 210z" fill="url(#c24-trunk)" ${O}/>` +
        `<path d="M${x - 8} ${y - 40}h14M${x - 6} ${y - 90}h12M${x - 6} ${y - 140}h12M${x - 4} ${y - 180}h10" stroke="#5a3a1c" stroke-width="2"/>` +
        sway(2, 4.4, [x, y - 210], fronds)
      )
    }
    const spring =
      `<ellipse cx="150" cy="742" rx="70" ry="16" fill="#7fc9d6" ${Ow(1.8)}/><ellipse cx="150" cy="740" rx="50" ry="9" fill="#b5e6ec"/>` +
      [0, 0.33, 0.66].map((phase, i) => anim({ type: 'keys', period: 3, phase, keys: [{ t: 0, x: 0, y: 0, sx: 0.6, sy: 0.6, o: 0.8 }, { t: 3, x: 10 - i * 8, y: -120, sx: 1.6, sy: 1.6, o: 0 }], pivot: [130 + i * 20, 730] },
        `<circle cx="${130 + i * 20}" cy="730" r="12" fill="#fff" fill-opacity="0.7"/>`)).join('')
    const flies =
      anim({ type: 'path', points: [[0, 0], [120, -30], [220, 20], [100, 40]], period: 8 }, dragonfly(260, 600, (m) => anim({ type: 'keys', period: 0.1, keys: [{ t: 0, sy: 1 }, { t: 0.05, sy: 0.5 }], pivot: [260, 596] }, m))) +
      anim({ type: 'path', points: [[0, 0], [-100, 20], [-180, -30], [-60, -40]], period: 9, phase: 0.4 }, dragonfly(860, 560, (m) => anim({ type: 'keys', period: 0.1, keys: [{ t: 0, sy: 1 }, { t: 0.05, sy: 0.5 }], pivot: [860, 556] }, m)))
    const ground =
      `<rect y="700" width="${W}" height="${H - 700}" fill="url(#c24-ground)"/>` +
      `<path d="M0 800q300-30 600-10t420-6t420-14V900H0z" fill="#7a9a4a" fill-opacity="0.35"/>`

    // --- The fruit tree: a broad crown with fruits (one in A only), a beetle on its trunk (A only). ---
    const TX = 600
    const crown =
      `<ellipse cx="${TX + 10}" cy="400" rx="150" ry="72" fill="url(#c24-crown)" ${O}/>` +
      `<ellipse cx="${TX - 70}" cy="418" rx="76" ry="44" fill="url(#c24-crown)" ${O}/><ellipse cx="${TX + 96}" cy="420" rx="70" ry="42" fill="url(#c24-crown)" ${O}/>` +
      `<path d="M${TX - 80} 400q20-14 40 0M${TX + 20} 380q20-14 40 0M${TX + 90} 410q20-14 40 0M${TX - 20} 430q16-12 32 0" fill="none" stroke="#2f6a2a" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round"/>` +
      fruit(TX - 20, 420, 10) + fruit(TX + 100, 452, 10) + fruit(TX - 90, 440, 9) +
      diff(TX + 60, 430, 18, fruit(TX + 60, 432, 9), '')
    const shakeTree: Keyframe[] = [{ t: 0, rot: 0 }, ...Array.from({ length: 9 }, (_, i) => ({ t: Math.round((16.2 + i * 0.09) * 100) / 100, rot: i % 2 ? 3 : -3, ease: 'linear' as const })), { t: 17.05, rot: 0, ease: 'step' }]
    const tree =
      groundShadow(TX, 794, 110, 12) +
      `<path d="M${TX - 18} 794q8-150 4-320h30q-8 170 4 320z" fill="url(#c24-trunk)" ${O}/>` +
      `<path d="M${TX - 6} 760q4-80 0-160M${TX + 6} 700q-3-60 0-120" fill="none" stroke="#5a3a1c" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round"/>` +
      diff(TX + 6, 650, 18, `<ellipse cx="${TX + 6}" cy="650" rx="7" ry="9" fill="#2f5a8a" ${Ow(1.4)}/><path d="M${TX + 6} 641v18M${TX} 646l-5-3M${TX + 12} 646l5-3M${TX} 654l-5 3M${TX + 12} 654l5 3" stroke="${INK}" stroke-width="1.4"/>`, '') +
      once(shakeTree, [TX, 470], sway(1.4, 5, [TX, 470], crown) +
        // The fruit the brachiosaur eats (gone from 10.8), the one that falls (from 16.7).
        once(showIn([0, 10.8]), FRUIT1, `<path d="M${FRUIT1[0]} 466v10" stroke="#5a3a1c" stroke-width="2"/>` + fruit(FRUIT1[0], FRUIT1[1], 13)) +
        once(showIn([0, 16.7]), FRUIT2, `<path d="M${FRUIT2[0]} 460v6" stroke="#5a3a1c" stroke-width="2"/>` + fruit(FRUIT2[0], FRUIT2[1], 12)))
    const fallingFruit = once(
      [{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t: 16.7, o: 1, ease: 'in' }, { t: 17, x: MOUTH[0] - FRUIT2[0], y: MOUTH[1] - FRUIT2[1], o: 1, ease: 'step' }, { t: 17.05, o: 0, ease: 'step' }],
      FRUIT2,
      fruit(FRUIT2[0], FRUIT2[1], 12),
    )

    // --- Things on the ground by the T-rex: the horsetails (a cone on the tallest in A only), the rock with an
    // ammonite (A only: a hard one), a three-toed footprint (A only), the magnolia (pink in A, white in B), the nest. ---
    const horsetails = horsetail(318, 792, 70) + horsetail(335, 792, 100) + horsetail(352, 792, 80) +
      diff(335, 688, 20, `<ellipse cx="335" cy="684" rx="5" ry="10" fill="#c9a04a" ${Ow(1.3)}/><path d="M331 680h8M331 688h8" stroke="#8a6a2a" stroke-width="1.2"/>`, '')
    const rock =
      `<path d="M370 794q-6-26 20-30q28-2 32 30z" fill="url(#c24-rock)" ${Ow(1.8)}/>` +
      diff(395, 780, 20, `<path d="M395 780m-1 0a1.5 1.5 0 1 1 3 0a3.5 3.5 0 1 1-7 0a5.5 5.5 0 1 1 11 0a7.5 7.5 0 1 1-15 0" fill="none" stroke="#6a5a4a" stroke-width="1.6"/>`, '')
    const footprint = diff(300, 785, 22,
      `<ellipse cx="300" cy="790" rx="9" ry="5" fill="#5a6a2a" fill-opacity="0.6"/><path d="M292 786l-8-8M300 785v-12M308 786l8-8" stroke="#5a6a2a" stroke-opacity="0.6" stroke-width="5" stroke-linecap="round"/>`, '')
    const bloom = (c: string) =>
      [0, 72, 144, 216, 288].map((a) => `<ellipse transform="rotate(${a} 690 752)" cx="690" cy="742" rx="6" ry="11" fill="${c}" ${Ow(1.2)}/>`).join('') + `<circle cx="690" cy="752" r="4" fill="#ffd23f"/>`
    const magnolia =
      `<path d="M664 794q-10-40 26-46q36 6 26 46z" fill="#4f9e3e" ${Ow(1.6)}/><path d="M676 770q14-8 28 0" fill="none" stroke="#2f6a2a" stroke-width="2"/>` +
      diff(690, 752, 24, bloom('#ff9fc0'), bloom('#fff8f0'))
    const NEST: [number, number] = [764, 790]
    const [nx, ny] = NEST
    const egg = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="12" fill="#f4ecd8" ${Ow(1.4)}/><circle cx="${x - 3}" cy="${y - 3}" r="2" fill="#c9b48a"/><circle cx="${x + 3}" cy="${y + 4}" r="1.6" fill="#c9b48a"/>`
    const nest =
      `<ellipse cx="${nx}" cy="${ny}" rx="34" ry="10" fill="#a8874e" ${Ow(1.6)}/>` + egg(nx - 16, ny - 14) + egg(nx + 16, ny - 12) + egg(nx, ny - 18) +
      `<path d="M${nx - 34} ${ny - 2}q34 14 68 0" fill="#8a6a3e" ${Ow(1.6)}/><path d="M${nx - 26} ${ny}l10-6M${nx - 4} ${ny + 2}l8-8M${nx + 14} ${ny + 2}l10-6" stroke="#6a4a2a" stroke-width="1.6"/>`
    // In B the middle egg cracks and a baby dino peeps out while the T-rex sulks.
    const hatch = diff(nx, ny - 26, 26, '',
      once(showIn([12.4, 14.6]), NEST,
        `<path d="M${nx - 8} ${ny - 22}l4 4l3-5l4 4l4-4" fill="none" stroke="${INK}" stroke-width="1.4"/>` +
          anim({ type: 'keys', period: 0.8, keys: [{ t: 0, rot: -10 }, { t: 0.4, rot: 10, ease: 'inOut' }], pivot: [nx, ny - 22] },
            `<path d="M${nx - 9} ${ny - 22}q9-20 18 0z" fill="#f4ecd8" ${Ow(1.3)}/><circle cx="${nx}" cy="${ny - 34}" r="8" fill="#9fd06a" ${Ow(1.4)}/><circle cx="${nx + 3}" cy="${ny - 36}" r="2" fill="${INK}"/><path d="M${nx - 2} ${ny - 44}l3 4l3-4" fill="#f4ecd8" ${Ow(1)}/>`)),
      undefined, during(12.4, 14.6))
    // In B a baby triceratops peeks out of the ferns while the T-rex jumps.
    const TRI: [number, number] = [238, 752]
    const [ix, iy] = TRI
    const triceratops = diff(ix, iy - 14, 32, '',
      keys('tri', [{ t: 0, y: 34, o: 0, ease: 'step' }, { t: 4.2, o: 1, ease: 'out' }, { t: 4.6, y: 0, ease: 'step' }, { t: 6.8, ease: 'in' }, { t: 7.15, y: 34, o: 1, ease: 'step' }, { t: 7.2, o: 0, ease: 'step' }], TRI,
        `<circle cx="${ix - 4}" cy="${iy - 20}" r="18" fill="#e9a35a" ${Ow(1.6)}/><path d="M${ix - 18} ${iy - 30}l-4-6M${ix - 8} ${iy - 36}l0-6M${ix + 4} ${iy - 34}l4-5" stroke="${INK}" stroke-width="2"/>` +
          `<ellipse cx="${ix + 6}" cy="${iy - 10}" rx="14" ry="11" fill="#c9905a" ${Ow(1.6)}/><path d="M${ix + 6} ${iy - 20}l2-14l4 13z" fill="#f4ecd8" ${Ow(1.2)}/><path d="M${ix + 18} ${iy - 12}l8 2l-8 4z" fill="#a8743f" ${Ow(1.2)}/>` +
          `<circle cx="${ix + 8}" cy="${iy - 13}" r="3" fill="#fff"/><circle cx="${ix + 9}" cy="${iy - 13}" r="1.5" fill="${INK}"/>`),
      'tri', during(4.2, 7.2))
    const triFern = fern(TRI[0], 790, 0.9)

    // --- The T-rex. ---
    const [rx, ry] = REX
    const spike = (x: number, y: number, rot: number) => `<path transform="rotate(${rot} ${x} ${y})" d="M${x - 7} ${y + 4}q7-18 14 0z" fill="#e8a33b" ${Ow(1.4)}/>`
    const spikes =
      [[-74, -146, -60], [-58, -162, -50], [-14, -188, -30], [6, -200, -20], [22, -208, -10]].map(([dx, dy, r]) => spike(rx + dx, ry + dy, r)).join('') +
      diff(rx - 36, ry - 178, 18, spike(rx - 36, ry - 176, -40), '', 'rex')
    const legSwing = swingKeys([[3.65, 3.9]], 0.12, 10)
    const rexEye = (px: number, py: number) => `<circle cx="${rx + 46}" cy="${ry - 196}" r="11" fill="#fff" ${Ow(1.6)}/><circle cx="${rx + 46 + px}" cy="${ry - 196 + py}" r="5" fill="${INK}"/><circle cx="${rx + 48 + px}" cy="${ry - 198 + py}" r="1.6" fill="#fff"/>`
    const eyes =
      // Looking up at the fruit.
      once(showIn([0, 7.05], [8.4, 9.8]), REX, rexEye(3, -5)) +
      // Dazed, on its back.
      once(showIn([7.05, 8.4]), REX, `<circle cx="${rx + 46}" cy="${ry - 196}" r="11" fill="#fff" ${Ow(1.6)}/><path d="M${rx + 46} ${ry - 196}m-1 0a1.5 1.5 0 1 1 3 0a3.5 3.5 0 1 1-7 0a5.5 5.5 0 1 1 11 0" fill="none" stroke="${INK}" stroke-width="1.6"/>`) +
      // Hopeful: big shining eyes.
      once(showIn([9.8, 11]), REX, `<circle cx="${rx + 46}" cy="${ry - 196}" r="12" fill="#fff" ${Ow(1.6)}/><circle cx="${rx + 49}" cy="${ry - 199}" r="8" fill="${INK}"/><circle cx="${rx + 52}" cy="${ry - 203}" r="3" fill="#fff"/><circle cx="${rx + 46}" cy="${ry - 196}" r="1.5" fill="#fff"/>`) +
      // Shocked: tiny pupil.
      once(showIn([11, 12.4]), REX, rexEye(2, -2).replace('r="5"', 'r="2.2"')) +
      // Sulking: half-shut, a tear it cannot reach.
      once(showIn([12.4, 16.3]), REX, rexEye(0, 3) + `<path d="M${rx + 34} ${ry - 200}q12-6 24 0v-10h-24z" fill="#6fae4a"/><path d="M${rx + 34} ${ry - 200}q12-6 24 0" fill="none" stroke="${INK}" stroke-width="2"/>` +
        anim({ type: 'keys', period: 1.2, keys: [{ t: 0, y: 0, o: 1 }, { t: 1.2, y: 22, o: 0 }], pivot: [rx + 40, ry - 184] }, `<path d="M${rx + 40} ${ry - 188}q3 5 0 8q-3-3 0-8z" fill="#9fd0f0" ${Ow(0.8)}/>`)) +
      // Looking up, startled by the shaking.
      once(showIn([16.3, 17.05]), REX, rexEye(2, -6)) +
      // Chomping, bliss.
      once(showIn([17.05, LOOP]), REX, `<path d="M${rx + 37} ${ry - 195}q9-9 18 0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`)
    // The lower jaw: shut, dropped open in shock, open wide to the sky, chomping.
    const jawKeys: Keyframe[] = [
      { t: 0, rot: 0 }, { t: 10.95, ease: 'out' }, { t: 11.1, rot: 22, ease: 'step' }, { t: 12.4, rot: 0, ease: 'step' },
      { t: 16.3, ease: 'out' }, { t: 16.5, rot: 30, ease: 'step' }, { t: 17, rot: 0, ease: 'out' },
      ...Array.from({ length: 9 }, (_, i) => ({ t: Math.round((17.2 + i * 0.3) * 100) / 100, rot: i % 2 ? 0 : 10, ease: 'inOut' as const })),
      { t: 19.95, ease: 'step' },
    ]
    const jaw = keys(undefined, jawKeys, [rx + 14, ry - 168],
      `<path d="M${rx + 12} ${ry - 170}l76 6q4 12-8 18q-36 4-64-6z" fill="url(#c24-rex)" ${Ow(1.8)}/><path d="M${rx + 26} ${ry - 160}q30 6 56 2" fill="none" stroke="#e8f0b0" stroke-width="4" stroke-linecap="round"/>` +
        `<path d="M${rx + 30} ${ry - 167}l4 -6l4 6M${rx + 46} ${ry - 166}l4 -6l4 6M${rx + 62} ${ry - 165}l4 -6l4 6" fill="#fff" ${Ow(1)}/>`)
    // The tiny arms: waving as it jumps, reaching up, short of the tear, flailing on its back, waving for joy.
    const armKeys: Keyframe[] = [
      { t: 0, rot: 0 },
      { t: 3.9, ease: 'inOut' },
      ...Array.from({ length: 13 }, (_, i) => ({ t: Math.round((4 + i * 0.2) * 100) / 100, rot: i % 2 ? -70 : -20, ease: 'inOut' as const })),
      { t: 6.6, rot: -100, ease: 'inOut' },
      { t: 7.05, ease: 'inOut' },
      ...Array.from({ length: 6 }, (_, i) => ({ t: Math.round((7.15 + i * 0.12) * 100) / 100, rot: i % 2 ? -40 : 10, ease: 'inOut' as const })),
      { t: 8.4, rot: 0, ease: 'inOut' },
      // Trying to wipe the tear: it cannot reach.
      { t: 13, ease: 'inOut' },
      ...Array.from({ length: 6 }, (_, i) => ({ t: Math.round((13.2 + i * 0.2) * 100) / 100, rot: i % 2 ? -88 : -104, ease: 'inOut' as const })),
      { t: 14.6, rot: 0, ease: 'inOut' },
      { t: 17.1, ease: 'inOut' },
      ...Array.from({ length: 10 }, (_, i) => ({ t: Math.round((17.3 + i * 0.25) * 100) / 100, rot: i % 2 ? -80 : -30, ease: 'inOut' as const })),
      { t: 19.95, ease: 'step' },
    ]
    const arm = (dx: number, dark: boolean, k: Keyframe[]) =>
      keys(undefined, k, [rx + dx, ry - 128],
        `<path d="M${rx + dx} ${ry - 128}l14 12l8-4" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M${rx + dx} ${ry - 128}l14 12l8-4" fill="none" stroke="${dark ? '#5a9a3a' : '#8fd46a'}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>` +
          `<path d="M${rx + dx + 22} ${ry - 120}l5-3M${rx + dx + 22} ${ry - 120}l5 2" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`)
    const farArm = arm(20, true, armKeys.map((k) => ('rot' in k ? { ...k, rot: (k.rot as number) * 0.8 } : k)))
    const nearArm = arm(30, false, armKeys)
    const tooth = diff(rx + 72, ry - 158, 18, `<path d="M${rx + 68} ${ry - 167}l5 12l4-12z" fill="#fff" ${Ow(1.2)}/>`, '', 'rex')
    // A little rain cloud over its head while it sulks; stars when it falls; hearts at the end.
    const sulkCloud = once(showIn([12.6, 16.2]), [rx + 40, ry - 270],
      `<g fill="#9aa4b4"><circle cx="${rx + 26}" cy="${ry - 262}" r="12"/><circle cx="${rx + 42}" cy="${ry - 270}" r="16"/><circle cx="${rx + 60}" cy="${ry - 262}" r="12"/><rect x="${rx + 22}" y="${ry - 264}" width="44" height="12" rx="6"/></g>` +
        [0, 0.25, 0.5].map((phase, i) => anim({ type: 'keys', period: 0.6, phase, keys: [{ t: 0, y: 0, o: 1 }, { t: 0.6, y: 30, o: 0 }], pivot: [rx + 30 + i * 14, ry - 248] },
          `<path d="M${rx + 30 + i * 14} ${ry - 250}l-2 8" stroke="#6fa8d6" stroke-width="2.4" stroke-linecap="round"/>`)).join(''))
    const dizzy = once(showIn([7.25, 8.4]), [rx + 40, ry - 236],
      anim({ type: 'rotate', pivot: [rx + 40, ry - 236], period: 1 }, [0, 120, 240].map((a) => `<g transform="rotate(${a} ${rx + 40} ${ry - 236})">${star(rx + 40, ry - 258)}</g>`).join('')))
    const hearts = once(showIn([17.2, LOOP]), [rx + 60, ry - 230],
      [0, 0.5].map((phase, i) => anim({ type: 'keys', period: 1, phase, keys: [{ t: 0, x: 0, y: 0, o: 1, sx: 0.6, sy: 0.6 }, { t: 1, x: i ? 16 : -10, y: -44, o: 0, sx: 1.2, sy: 1.2 }], pivot: [rx + 60, ry - 230] },
        `<path d="M${rx + 60} ${ry - 222}c-12-8-12-20-4-20q4 0 4 6q0-6 4-6c8 0 8 12-4 20z" fill="#ff6b8b" ${Ow(1.2)}/>`)).join(''))
    // Dust when it lands from a jump, when it falls on its back.
    const dustAt = (t: number, x: number, y: number) =>
      once([{ t: 0, sx: 0.4, sy: 0.4, o: 0, ease: 'step' }, { t, o: 1, ease: 'out' }, { t: t + 0.5, sx: 1.4, sy: 1.4, o: 0, ease: 'step' }], [x, y],
        `<circle cx="${x - 30}" cy="${y - 6}" r="12" fill="#d9c08e" fill-opacity="0.8"/><circle cx="${x + 30}" cy="${y - 6}" r="12" fill="#d9c08e" fill-opacity="0.8"/><circle cx="${x}" cy="${y - 10}" r="14" fill="#d9c08e" fill-opacity="0.8"/>`)
    const dust = [4.6, 5.55, 6.45, 7.25].map((t) => dustAt(t, rx, ry)).join('') +
      // POW: the starburst as it hits the ground.
      once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t: 7.25, o: 1, ease: 'out' }, { t: 7.4, sx: 1.1, sy: 1.1, ease: 'inOut' }, { t: 7.55, sx: 1, sy: 1, o: 1, ease: 'step' }, { t: 7.6, o: 0, ease: 'step' }], [rx - 70, ry - 20],
        `<path d="M${rx - 70} ${ry - 62}l9 20l20-8l-9 20l22 7l-22 7l9 20l-20-8l-9 20l-9-20l-20 8l9-20l-22-7l22-7l-9-20l20 8z" fill="#ffe066" ${Ow(1.8)}/>`)
    const rex = keys('rex', rexKeys, REX,
      groundShadow(rx - 10, ry, 70, 8) +
        // The tail.
        `<path d="M${rx - 44} ${ry - 140}Q${rx - 120} ${ry - 128} ${rx - 196} ${ry - 64}Q${rx - 110} ${ry - 88} ${rx - 36} ${ry - 92}z" fill="url(#c24-rex)" ${Ow(2)}/>` +
        // The far leg, the far arm.
        keys(undefined, legSwing, [rx - 4, ry - 90], `<ellipse cx="${rx - 4}" cy="${ry - 68}" rx="20" ry="32" fill="#5a9a3a" ${Ow(1.8)}/><path d="M${rx + 2} ${ry - 40}l6 36h-22l2-30z" fill="#5a9a3a" ${Ow(1.6)}/>`) +
        farArm +
        `<ellipse cx="${rx - 14}" cy="${ry - 120}" rx="60" ry="50" transform="rotate(-24 ${rx - 14} ${ry - 120})" fill="url(#c24-rex)" ${Ow(2.2)}/>` +
        `<ellipse cx="${rx + 12}" cy="${ry - 108}" rx="28" ry="34" transform="rotate(-24 ${rx + 12} ${ry - 108})" fill="#e8f0b0"/>` +
        `<circle cx="${rx - 40}" cy="${ry - 138}" r="6" fill="#4f8a32" fill-opacity="0.6"/><circle cx="${rx - 22}" cy="${ry - 150}" r="5" fill="#4f8a32" fill-opacity="0.6"/><circle cx="${rx - 50}" cy="${ry - 118}" r="4" fill="#4f8a32" fill-opacity="0.6"/>` +
        spikes +
        // The near leg.
        `<ellipse cx="${rx - 22}" cy="${ry - 74}" rx="26" ry="38" fill="url(#c24-rex)" ${Ow(2)}/><path d="M${rx - 16} ${ry - 42}l10 38h-30l2-32z" fill="url(#c24-rex)" ${Ow(1.8)}/>` +
        `<path d="M${rx - 30} ${ry}l-8 2M${rx - 18} ${ry}l-4 4M${rx - 6} ${ry}l2 4" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>` +
        // The head: neck, skull, the jaw below it, eye, nostril, brow.
        `<path d="M${rx + 6} ${ry - 150}q10-30 30-40l20 20q-14 16-24 40z" fill="url(#c24-rex)" ${Ow(1.8)}/>` +
        jaw +
        `<path d="M${rx} ${ry - 182}q8-34 48-36q40 0 46 24q2 14-6 22l-78 6q-12-6-10-16z" fill="url(#c24-rex)" ${Ow(2.2)}/>` +
        `<path d="M${rx + 14} ${ry - 170}l76-6" stroke="${INK}" stroke-width="2"/><path d="M${rx + 28} ${ry - 170}l4 6l4-6M${rx + 44} ${ry - 171}l4 6l4-6M${rx + 60} ${ry - 172}l4 6l4-6M${rx + 76} ${ry - 173}l4 6l4-6" fill="#fff" ${Ow(1)}/>` +
        tooth +
        `<circle cx="${rx + 84}" cy="${ry - 194}" r="2.6" fill="${INK}"/><circle cx="${rx + 22}" cy="${ry - 178}" r="7" fill="#ffb3a0" fill-opacity="0.5"/>` +
        eyes +
        `<path d="M${rx + 32} ${ry - 212}q14-8 28 0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
        nearArm +
        sulkCloud + hearts + dizzy)

    // --- The brachiosaur: walks in, lowers its long neck to the fruit, eats it, wanders off; a dragonfly resting on
    // its back in A only. ---
    const [bx, by] = BRACHIO
    const brLeg = (x: number, flip: boolean) =>
      keys(undefined, swingKeys(BR_WALK, 0.3, 8, flip), [x, by - 90],
        `<rect x="${x - 15}" y="${by - 96}" width="30" height="96" rx="12" fill="url(#c24-brachio)" ${Ow(2)}/><path d="M${x - 10} ${by - 3}h6M${x - 2} ${by - 3}h6M${x + 6} ${by - 3}h6" stroke="#f4ecd8" stroke-width="3" stroke-linecap="round"/>`)
    const neck = keys(undefined, neckKeys, NECK,
      `<path d="M${NECK[0] - 28} ${NECK[1] + 12}C${NECK[0] - 52} ${NECK[1] - 80} ${NECK[0] - 84} ${NECK[1] - 190} ${NECK[0] - 118} ${NECK[1] - 270}l28-12C${NECK[0] - 56} ${NECK[1] - 196} ${NECK[0] - 10} ${NECK[1] - 100} ${NECK[0] + 32} ${NECK[1]}z" fill="url(#c24-brachio)" ${Ow(2.2)}/>` +
        `<path d="M${NECK[0] - 6} ${NECK[1] - 40}q-20-60-50-140" fill="none" stroke="#c4d4f4" stroke-width="8" stroke-linecap="round" stroke-opacity="0.6"/>` +
        // The head, chewing after the fruit.
        anim({ type: 'keys', period: 0.4, keys: [{ t: 0, rot: 0 }, { t: 0.2, rot: 5, ease: 'inOut' }], pivot: [NECK[0] - 104, NECK[1] - 282] },
          `<ellipse cx="${NECK[0] - 112}" cy="${NECK[1] - 290}" rx="36" ry="20" fill="url(#c24-brachio)" ${Ow(2)}/>` +
            `<circle cx="${NECK[0] - 102}" cy="${NECK[1] - 298}" r="7" fill="#fff" ${Ow(1.2)}/><circle cx="${NECK[0] - 104}" cy="${NECK[1] - 298}" r="3.4" fill="${INK}"/>` +
            blink(3.4, 0.2)(`<path d="M${NECK[0] - 109} ${NECK[1] - 298}h14" stroke="#8fa8e0" stroke-width="8"/><path d="M${NECK[0] - 109} ${NECK[1] - 297}h14" stroke="${INK}" stroke-width="1.6"/>`) +
            `<path d="M${NECK[0] - 144} ${NECK[1] - 284}q14 8 28 2" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/><circle cx="${NECK[0] - 140}" cy="${NECK[1] - 296}" r="2" fill="${INK}"/>` +
            once(showIn([10.8, 11.7]), NECK, fruit(NECK[0] - 150, NECK[1] - 286, 12))))
    const brachio = keys('brachio', brachioKeys, BRACHIO,
      groundShadow(bx + 20, by, 150, 12) +
        brLeg(bx + 70, false) + brLeg(bx - 50, true) +
        `<path d="M${bx + 110} ${by - 150}Q${bx + 220} ${by - 120} ${bx + 320} ${by - 60}Q${bx + 200} ${by - 96} ${bx + 100} ${by - 100}z" fill="url(#c24-brachio)" ${Ow(2)}/>` +
        `<ellipse cx="${bx + 20}" cy="${by - 122}" rx="124" ry="72" fill="url(#c24-brachio)" ${Ow(2.4)}/>` +
        `<circle cx="${bx + 40}" cy="${by - 160}" r="8" fill="#7a90c8" fill-opacity="0.6"/><circle cx="${bx + 70}" cy="${by - 140}" r="6" fill="#7a90c8" fill-opacity="0.6"/><circle cx="${bx}" cy="${by - 168}" r="6" fill="#7a90c8" fill-opacity="0.6"/>` +
        neck +
        brLeg(bx + 90, true) + brLeg(bx - 30, false) +
        diff(bx + 24, by - 202, 23,
          dragonfly(bx + 14, by - 196, (m) => anim({ type: 'keys', period: 0.6, keys: [{ t: 0, sy: 1 }, { t: 0.3, sy: 0.7, ease: 'inOut' }], pivot: [bx + 14, by - 200] }, m)), '', 'brachio'))

    // --- The volcano's rumble: a big puff of ash, lava bombs, rumble lines; in B a pterosaur lands on its rock. ---
    const rumble = once(showIn([14.8, 16.4]), [1180, 330],
      anim({ type: 'keys', period: 1.6, keys: [{ t: 0, sx: 0.4, sy: 0.4, o: 1 }, { t: 1.6, sx: 1.6, sy: 1.6, o: 0.4 }], pivot: [1180, 320] },
        `<circle cx="1180" cy="290" r="50" fill="#6a6470"/><circle cx="1140" cy="300" r="34" fill="#7a7480"/><circle cx="1222" cy="296" r="36" fill="#5a5460"/>`) +
        [[-60, -120], [10, -150], [70, -110]].map(([dx, dy], i) => anim({ type: 'keys', period: 1.6, phase: i * 0.1, keys: [{ t: 0, x: 0, y: 0, o: 1 }, { t: 0.7, x: dx * 0.6, y: dy, ease: 'out' }, { t: 1.4, x: dx, y: 40, o: 0, ease: 'in' }], pivot: [1180, 330] },
          `<circle cx="1180" cy="330" r="8" fill="#ff7a2a" ${Ow(1.4)}/><circle cx="1178" cy="328" r="3" fill="#ffd23f"/>`)).join('') +
        `<path d="M1090 380q-14 10 0 20M1270 380q14 10 0 20M1076 370q-22 20 0 40M1284 370q22 20 0 40" fill="none" stroke="#fff4c0" stroke-width="3" stroke-linecap="round"/>`)
    const volcanoRock = `<path d="M1012 556q2-26 28-28q30 2 30 28z" fill="url(#c24-rock)" ${Ow(1.8)}/>`
    const PTERO: [number, number] = [1040, 506]
    const pteroLand = diff(PTERO[0], PTERO[1], 40, '',
      keys('ptero', [{ t: 0, x: -140, y: -160, o: 0, ease: 'step' }, { t: 14.6, o: 1, ease: 'out' }, { t: 15.2, x: 0, y: 0, o: 1, ease: 'step' }, { t: 16.2, o: 0, ease: 'step' }], PTERO,
        once(showIn([0, 15.2]), PTERO, pterosaur(PTERO[0], PTERO[1], 0.6, beat([PTERO[0], PTERO[1]], 0.4))) +
          once(showIn([15.2, LOOP]), PTERO,
            `<path d="M${PTERO[0] - 4} ${PTERO[1] + 22}l-4 8M${PTERO[0] + 4} ${PTERO[1] + 22}l4 8" stroke="${INK}" stroke-width="2"/>` +
              `<path d="M${PTERO[0] - 16} ${PTERO[1] + 20}q0-24 16-26q16 2 16 26z" fill="#c9845a" ${Ow(1.6)}/><path d="M${PTERO[0] + 6} ${PTERO[1] - 8}l22 6l-20 4z" fill="#f2c38a" ${Ow(1.2)}/>` +
              `<circle cx="${PTERO[0] + 2}" cy="${PTERO[1] - 6}" r="9" fill="#d99a6a" ${Ow(1.4)}/><path d="M${PTERO[0] - 2} ${PTERO[1] - 12}l-14-12l12 4z" fill="#c9845a" ${Ow(1.2)}/><circle cx="${PTERO[0] + 5}" cy="${PTERO[1] - 8}" r="1.8" fill="${INK}"/>`)),
      'ptero', during(14.6, 16.2))

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c24-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb8e0"/><stop offset="0.6" stop-color="#f4d9a8"/><stop offset="1" stop-color="#f8c890"/></linearGradient>` +
      `<radialGradient id="c24-glow"><stop offset="0" stop-color="#fff4cc" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffe9a8" stop-opacity="0.4"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c24-volcano" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a6a6a"/><stop offset="1" stop-color="#4a3a3e"/></linearGradient>` +
      `<linearGradient id="c24-hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8c46a"/><stop offset="1" stop-color="#7fa848"/></linearGradient>` +
      `<linearGradient id="c24-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fb85a"/><stop offset="1" stop-color="#6a9440"/></linearGradient>` +
      `<linearGradient id="c24-trunk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6e4a26"/><stop offset="0.6" stop-color="#9a6a3a"/><stop offset="1" stop-color="#b8844a"/></linearGradient>` +
      `<radialGradient id="c24-crown" cx="0.64" cy="0.28" r="0.85"><stop offset="0" stop-color="#b6e06a"/><stop offset="0.5" stop-color="#5fae4a"/><stop offset="1" stop-color="#2f7a34"/></radialGradient>` +
      `<radialGradient id="c24-fruit" cx="0.62" cy="0.3" r="0.8"><stop offset="0" stop-color="#ffd08a"/><stop offset="0.5" stop-color="#ff7a3a"/><stop offset="1" stop-color="#c0391f"/></radialGradient>` +
      `<radialGradient id="c24-rex" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#b8ec8a"/><stop offset="0.55" stop-color="#7cc458"/><stop offset="1" stop-color="#4f8a32"/></radialGradient>` +
      `<radialGradient id="c24-brachio" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#c4d4f4"/><stop offset="0.55" stop-color="#8fa8e0"/><stop offset="1" stop-color="#5f74b0"/></radialGradient>` +
      `<radialGradient id="c24-rock" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#c8beb2"/><stop offset="1" stop-color="#8a8076"/></radialGradient>` +
      `<radialGradient id="c24-sunlight" cx="0.2" cy="0.15" r="1"><stop offset="0" stop-color="#fff2c4" stop-opacity="0.3"/><stop offset="0.5" stop-color="#fff2c4" stop-opacity="0.06"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></radialGradient></defs>` +
      sky +
      volcanoRock +
      pteroLand +
      rumble +
      ground +
      tufts +
      spring +
      treeFern(100, 790) +
      anim({ type: 'sway', angle: 6, pivot: [100, 578], period: 3.6 }, keenOwl(100, 578, 1, blink(3.1, 0.3))) +
      fern(470, 800, 0.8) + fern(900, 796, 1) + fern(1180, 800, 1.1) +
      tree +
      horsetails +
      footprint +
      rock +
      magnolia +
      nest +
      hatch +
      triceratops +
      triFern +
      brachio +
      dust +
      rex +
      fallingFruit +
      flies +
      `<rect width="${W}" height="${H}" fill="url(#c24-sunlight)"/>`
    )
  },
})
