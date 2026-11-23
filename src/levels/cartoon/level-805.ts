// Cartoon "The banana peel" (docs/cartoon-mode.md), made like 812: a 20 s jungle story told by a camera. A monkey swings
// on a liana to a branch by the banana plant, eats a banana and tosses the peel over its shoulder — right where an
// elephant is walking to the river. The elephant slips and slides into the water; the monkey laughs so hard it nearly
// falls off — and gets a trunkful of water for it. Down it goes into the river (a crocodile's eyes!), up onto the
// elephant's head, and makes peace with its last banana: the elephant puts up a fountain for both. Ten differences:
// two hard (a leaf of the bamboo, the banana plant's young rolled leaf), four events of the story (the toucan gapes
// as the monkey falls).
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { bambooClump, bananaPlant, butterflyAt, farBird, grassTuft, groundShadow, INK, JUNGLE_DEFS, keenOwl, NATURE_DEFS, O, Ow, swingKeys } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // Up in the big tree: the parrot; the monkey grabs the liana and swings across.
  { t: 1.6, x: 20, y: 240, w: 520, ease: 'inOut' },
  { t: 4.2, x: 330, y: 260, w: 520, ease: 'step' },
  // On the branch by the banana plant: a banana, the peel over the shoulder.
  { t: 4.25, x: 450, y: 360, w: 320, ease: 'step' },
  // The elephant walks to the river.
  { t: 7.2, x: 820, y: 450, w: 620, ease: 'step' },
  // Slip — and slide into the water.
  { t: 9.4, x: 820, y: 450, w: 620, ease: 'inOut' },
  { t: 10.7, x: 560, y: 450, w: 620, ease: 'step' },
  // The monkey laughs, the trunkful of water, the fall, the crocodile.
  { t: 11.2, x: 440, y: 380, w: 720, ease: 'step' },
  // Friends again: the banana, the fountain.
  { t: 16, x: 570, y: 596, w: 340 },
  { t: 19.95, x: 576, y: 594, w: 330, ease: 'step' },
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

/** Below this line, in the river, the monkey and the elephant are under water (not drawn). */
const WATERLINE = 800

/** The monkey sits on the big tree's branch (its bottom here), holding the liana. */
const MONKEY: [number, number] = [297, 455]
/** The liana hangs from ANCHOR; the monkey's raised hand is at its end. */
const ANCHOR: [number, number] = [455, 140]
const HAND: [number, number] = [12, -66]
const SWING: [number, number] = [1.7, 3.6]
/** The branch by the banana plant (offset of the monkey). */
const PERCH: [number, number] = [291, 11]
/** On the elephant's head in the river (offset of the monkey). */
const ON_HEAD: [number, number] = [433, 257]

/** Monkey offsets along the liana's arc, and the liana's turn, at a share `f` of the swing. */
function swingAt(f: number) {
  const [sx, sy] = [MONKEY[0] + HAND[0] - ANCHOR[0], MONKEY[1] + HAND[1] - ANCHOR[1]]
  const [ex, ey] = [MONKEY[0] + PERCH[0] + HAND[0] - ANCHOR[0], MONKEY[1] + PERCH[1] + HAND[1] - ANCHOR[1]]
  const a0 = Math.atan2(sx, sy)
  const a1 = Math.atan2(ex, ey)
  const r = Math.hypot(sx, sy) + (Math.hypot(ex, ey) - Math.hypot(sx, sy)) * f
  const a = a0 + (a1 - a0) * f
  const hx = ANCHOR[0] + Math.sin(a) * r
  const hy = ANCHOR[1] + Math.cos(a) * r
  return { x: Math.round(hx - HAND[0] - MONKEY[0]), y: Math.round(hy - HAND[1] - MONKEY[1]), rot: Math.round((-a * 180) / Math.PI), len: r }
}
const LIANA_LEN = Math.round(swingAt(0).len)

function monkeyKeys(): Keyframe[] {
  const k: Keyframe[] = [{ t: 0, x: 0, y: 0, rot: 0 }, { t: SWING[0], ease: 'linear' }]
  for (let i = 1; i <= 8; i++) {
    const f = (1 - Math.cos((i / 8) * Math.PI)) / 2
    const p = swingAt(f)
    k.push({ t: SWING[0] + ((SWING[1] - SWING[0]) * i) / 8, x: p.x, y: p.y, ease: 'linear' })
  }
  k.push(
    { t: 3.6, x: PERCH[0], y: PERCH[1], ease: 'out' },
    { t: 3.75, y: PERCH[1] + 4, ease: 'inOut' },
    { t: 3.9, y: PERCH[1] },
    // Laughing: shaking with it.
    ...Array.from({ length: 12 }, (_, i) => ({ t: 9.9 + i * 0.27, y: PERCH[1] + (i % 2 ? -4 : 0), ease: 'inOut' as const })),
    // Hit by the water: off the branch, into the river.
    { t: 13.25, x: PERCH[0], y: PERCH[1], rot: 0, ease: 'out' },
    { t: 13.5, x: 310, y: -10, rot: -40, ease: 'in' },
    { t: 13.9, x: 343, y: 440, rot: -90, ease: 'out' },
    // Up it comes — eyes on the crocodile — and leaps onto the elephant's head.
    { t: 14.4, y: 392, rot: 0, ease: 'inOut' },
    { t: 15, y: 396, ease: 'out' },
    { t: 15.3, x: 390, y: 170, ease: 'in' },
    { t: 15.6, x: ON_HEAD[0], y: ON_HEAD[1], ease: 'inOut' },
    { t: 16.6, y: ON_HEAD[1] + 2, ease: 'inOut' },
    // Bobbing along in the fountain.
    { t: 18.2, y: ON_HEAD[1], ease: 'inOut' },
    { t: 18.6, y: ON_HEAD[1] - 6, ease: 'inOut' },
    { t: 19, y: ON_HEAD[1], ease: 'inOut' },
    { t: 19.4, y: ON_HEAD[1] - 6, ease: 'inOut' },
    { t: 19.95, y: ON_HEAD[1], ease: 'step' },
  )
  return k
}

/** The liana: turned to the monkey's hand while it swings, then swinging back to rest. */
function lianaKeys(): Keyframe[] {
  const k: Keyframe[] = [{ t: 0, rot: swingAt(0).rot }, { t: SWING[0], ease: 'linear' }]
  for (let i = 1; i <= 8; i++) k.push({ t: SWING[0] + ((SWING[1] - SWING[0]) * i) / 8, rot: swingAt((1 - Math.cos((i / 8) * Math.PI)) / 2).rot, ease: 'linear' })
  const end = swingAt(1).rot
  k.push({ t: 3.75, rot: end, ease: 'inOut' }, { t: 4.6, rot: 18, ease: 'inOut' }, { t: 5.4, rot: -9, ease: 'inOut' }, { t: 6.1, rot: 4, ease: 'inOut' }, { t: 6.8, rot: 0 }, { t: 19.95, ease: 'step' })
  return k
}

/** The elephant's feet: it stands by the waterfall, walks to the river along the path. */
const ELE: [number, number] = [1300, 772]
const ELE_WALK: [number, number] = [7.2, 9.4]
const eleKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, rot: 0 },
  { t: ELE_WALK[0], ease: 'linear' },
  { t: ELE_WALK[1], x: -288, y: 0, ease: 'out' },
  // On the peel: front up, sliding.
  { t: 9.6, x: -310, y: -14, rot: 16, ease: 'in' },
  { t: 10.4, x: -480, y: 60, rot: 10, ease: 'out' },
  { t: 10.6, x: -500, y: 90, rot: 0, ease: 'inOut' },
  { t: 11.4, y: 94, ease: 'inOut' },
  { t: 12.2, y: 90, ease: 'inOut' },
  { t: 19.95, ease: 'step' },
]
/** The trunk turns about its root (rest coordinates). */
const TRUNK: [number, number] = [ELE[0] - 102, ELE[1] - 96]
const trunkKeys: Keyframe[] = [
  { t: 0, rot: 0 },
  { t: 7.2, ease: 'inOut' },
  ...Array.from({ length: 7 }, (_, i) => ({ t: 7.5 + i * 0.3, rot: i % 2 ? -10 : 10, ease: 'inOut' as const })),
  // Flailing as it slips.
  { t: 9.45, rot: 0, ease: 'out' },
  { t: 9.7, rot: 70, ease: 'inOut' },
  { t: 10.6, rot: 0, ease: 'inOut' },
  // Sucking up water, aiming, spraying.
  { t: 11.5, rot: -8, ease: 'inOut' },
  { t: 12.3, ease: 'inOut' },
  { t: 12.8, rot: 150, ease: 'inOut' },
  { t: 13.6, ease: 'inOut' },
  { t: 14, rot: 20, ease: 'inOut' },
  { t: 14.6, rot: 0, ease: 'inOut' },
  // Takes the banana, eats it.
  { t: 16.5, ease: 'inOut' },
  { t: 17.1, rot: 165, ease: 'inOut' },
  { t: 17.25, ease: 'inOut' },
  { t: 17.7, rot: 40, ease: 'inOut' },
  { t: 18, rot: 0, ease: 'inOut' },
  // The fountain.
  { t: 18.3, rot: 175, ease: 'inOut' },
  { t: 19.95, ease: 'step' },
]

export default svgLevel({
  id: 805,
  chapter: 'cartoon',
  title: 'cartoonBananaPeel',
  parTimeSec: 100,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const crown = (period: number, angle = 2, id?: string) => (pivot: [number, number], m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 11) / 11, ...(id && { id }) }, m)
    const blink = (period: number, phase = 0) => (m: string) => anim({ type: 'blink', duty: 0.07, period, phase }, m)
    const flap = (pivot: [number, number], phase: number) => (m: string) =>
      anim({ type: 'keys', period: 0.3, phase, keys: [{ t: 0, sx: 1 }, { t: 0.15, sx: 0.3, ease: 'inOut' }], pivot }, m)

    // --- The far jungle: hazy layers of trees, the waterfall, sunbeams. ---
    let far = ''
    for (let i = 0; i < 22; i++) {
      const fx = Math.round(i * 70 + rand() * 30)
      const fy = Math.round(430 + rand() * 50)
      far += `<circle cx="${fx}" cy="${fy}" r="${Math.round(50 + rand() * 30)}" fill="#7fbf8a" fill-opacity="0.9"/>`
    }
    let mid = ''
    for (let i = 0; i < 18; i++) {
      const fx = Math.round(i * 85 + rand() * 30)
      const fy = Math.round(560 + rand() * 40)
      mid += `<circle cx="${fx}" cy="${fy}" r="${Math.round(60 + rand() * 30)}" fill="#4f9a5e"/>`
    }
    const waterfall =
      `<path d="M1270 430q30-20 100-10q20 120 10 250h-120q-10-130 10-240z" fill="#7d8a7a" ${Ow(1.8)}/>` +
      `<rect x="1300" y="424" width="50" height="230" fill="#bfe8f5" ${Ow(1.4)}/>` +
      anim({ type: 'keys', period: 1, keys: [{ t: 0, y: 0 }, { t: 1, y: 40 }] }, `<path d="M1310 420v40M1325 400v50M1340 410v36M1310 500v40M1325 480v50M1340 490v36M1310 580v40M1325 560v50M1340 570v36" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-opacity="0.8"/>`) +
      `<ellipse cx="1325" cy="664" rx="70" ry="16" fill="#8fd3e8" ${Ow(1.6)}/>` +
      anim({ type: 'keys', period: 1.2, keys: [{ t: 0, sx: 0.8, sy: 0.8, o: 1 }, { t: 1.2, sx: 1.3, sy: 1.3, o: 0 }], pivot: [1325, 656] }, `<ellipse cx="1325" cy="656" rx="30" ry="10" fill="#fff" fill-opacity="0.8"/>`)
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c8-sky)"/>` +
      anim({ type: 'path', points: [[0, 0], [-60, 0]], period: 30 }, `<g fill="#fff" fill-opacity="0.85"><ellipse cx="900" cy="150" rx="70" ry="20"/><circle cx="880" cy="138" r="22"/><circle cx="912" cy="132" r="26"/></g>`) +
      keys(undefined, [{ t: 0, x: 0, y: 0 }, { t: 19.9, x: -1500, y: 40 }], [1460, 230],
        ([[1460, 230], [1482, 220], [1486, 244]] as [number, number][]).map(([fx, fy], i) => farBird(fx, fy, flap([fx, fy - 2], i * 0.1))).join('')) +
      far + waterfall + mid +
      `<path d="M820 0l140 0l-240 700h-60zM1040 0h80l-180 700h-40z" fill="#fff8d0" fill-opacity="0.16"/>`

    // --- The ground, the path to the river, the river. ---
    const ground =
      `<rect y="640" width="${W}" height="${H - 640}" fill="url(#c8-ground)"/>` +
      `<path d="M1000 760q200-24 440-30v40q-240 8-430 32z" fill="url(#c8-path)" ${Ow(1.4)}/>` +
      `<path d="M420 900l20-110q160-18 320-4t250 6l30 108z" fill="url(#c8-river)" ${Ow(1.8)}/>` +
      anim({ type: 'keys', period: 3, keys: [{ t: 0, x: 0 }, { t: 1.5, x: 16, ease: 'inOut' }] },
        `<path d="M500 820h60M640 846h80M820 830h60M540 876h70M900 870h50" stroke="#fff" stroke-opacity="0.6" stroke-width="3" stroke-linecap="round"/>`)
    let tufts = ''
    for (let i = 0; i < 28; i++) {
      const tx = Math.round(rand() * W)
      const ty = Math.round(660 + rand() * 230)
      if (tx > 420 && tx < 1040 && ty > 780) continue
      tufts += anim({ type: 'sway', angle: 7, pivot: [tx, ty], period: 2.2, phase: (tx % 13) / 13 }, grassTuft(tx, ty))
    }

    // --- The big tree: the parrot (red in A, blue in B), the liana, a sloth; the toucan (in B its beak drops open as the monkey falls) sits on the middle tree. ---
    const parrot = (c: string) =>
      `<path d="M226 455l-4 26l8-2l6-22z" fill="${c}" ${Ow(1.4)}/>` +
      `<ellipse cx="226" cy="440" rx="11" ry="15" fill="${c}" ${Ow(1.6)}/><path d="M232 436q6 10 0 20q-8-4-6-18z" fill="#ffd23f" ${Ow(1.2)}/>` +
      `<circle cx="222" cy="424" r="9" fill="${c}" ${Ow(1.6)}/><circle cx="219" cy="421" r="3.4" fill="#fff"/><circle cx="218.5" cy="421" r="1.6" fill="${INK}"/>` +
      `<path d="M214 424q-8 0-8 8q4-2 8-2z" fill="#3a3a3a" ${Ow(1.2)}/>`
    const shutBeak = `<path d="M52 364q-22 0-26 10q12 2 26-2z" fill="#ff9f1c" ${Ow(1.4)}/><path d="M28 372l-4 2" stroke="#e63946" stroke-width="3"/>`
    const toucan =
      `<path d="M58 401v-4M64 401v-4" stroke="${INK}" stroke-width="2"/>` +
      `<ellipse cx="60" cy="384" rx="11" ry="15" fill="#2b2b3a" ${Ow(1.6)}/><ellipse cx="57" cy="380" rx="6" ry="7" fill="#fff4d0"/>` +
      `<circle cx="58" cy="368" r="8" fill="#2b2b3a" ${Ow(1.6)}/><circle cx="55" cy="366" r="2.6" fill="#7fd3e6"/><circle cx="55" cy="366" r="1.2" fill="${INK}"/>` +
      // Its beak (drawn 612, 71 further, on the middle tree): in B it drops open as the monkey falls into the river.
      diff(
        648,
        441,
        20,
        shutBeak,
        once(showIn([0, 13.25], [15.6, LOOP]), [0, 0], shutBeak) +
          once(showIn([13.25, 15.6]), [0, 0],
            `<path d="M52 368q-18 4-22 12q10-2 22-8z" fill="#ff9f1c" ${Ow(1.4)}/><path d="M52 363q-22-5-27 3q12 1 27 2z" fill="#ff9f1c" ${Ow(1.4)}/><path d="M27 366l-4 0" stroke="#e63946" stroke-width="3"/>`),
        undefined,
        during(13.25, 15.6),
      )
    const bigTree =
      groundShadow(150, 778, 140, 14) +
      `<path d="M70 780q40-6 50-60q-6-220-10-480h80q-4 260-10 480q10 54 50 60z" fill="url(#ke-bark)" ${O}/>` +
      `<path d="M134 740q4-200 0-440M160 700q-4-160 2-360" fill="none" stroke="#4a2c14" stroke-opacity="0.45" stroke-width="3" stroke-linecap="round"/>` +
      // Branches: the monkey's, the sloth's, the one the liana hangs from.
      `<path d="M180 472q80-6 160-14" fill="none" stroke="${INK}" stroke-width="17" stroke-linecap="round"/><path d="M180 472q80-6 160-14" fill="none" stroke="#8f5d2e" stroke-width="12" stroke-linecap="round"/>` +
      `<path d="M185 306q70-6 145-12" fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="round"/><path d="M185 306q70-6 145-12" fill="none" stroke="#8f5d2e" stroke-width="8" stroke-linecap="round"/>` +
      `<path d="M280 150q100-16 240-20" fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="round"/><path d="M280 150q100-16 240-20" fill="none" stroke="#8f5d2e" stroke-width="8" stroke-linecap="round"/>`
    const canopy = (period: number) =>
      anim({ type: 'sway', angle: 1.2, pivot: [150, 300], period },
        `<circle cx="60" cy="230" r="82" fill="url(#c8-canopy)" ${O}/><circle cx="262" cy="222" r="92" fill="url(#c8-canopy)" ${O}/><circle cx="150" cy="110" r="96" fill="url(#c8-canopy)" ${O}/>` +
          `<circle cx="150" cy="200" r="110" fill="url(#c8-canopy)" ${O}/><circle cx="360" cy="150" r="60" fill="url(#c8-canopy)" ${O}/>` +
          `<path d="M90 230q20-16 40 0M200 170q20-16 40 0M250 250q20-16 40 0M120 100q20-16 40 0M330 150q16-12 32 0" fill="none" stroke="#1d5c33" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round"/>`)
    // Vines hanging from the canopies.
    let vines = ''
    for (const [vx, vy, len] of [[40, 290, 140], [210, 300, 90], [350, 200, 120], [640, 320, 130], [840, 330, 110]] as [number, number, number][]) {
      vines += anim({ type: 'sway', angle: 3, pivot: [vx, vy], period: 3.4, phase: (vx % 7) / 7 },
        `<path d="M${vx} ${vy}q8 ${len / 2} -2 ${len}" fill="none" stroke="#3f7d2e" stroke-width="3"/><path d="M${vx + 2} ${vy + len * 0.3}l8 4l-6 4zM${vx + 1} ${vy + len * 0.7}l-8 4l6 4z" fill="#5cb342" ${Ow(1)}/>`)
    }
    // In B a sloth slowly lets itself down from the canopy and hangs there while the monkey swings by.
    const SLOTH: [number, number] = [251, 300]
    const [lx, ly] = SLOTH
    const sloth = diff(
      lx,
      ly + 34,
      39,
      '',
      keys('sloth', [{ t: 0, y: -50, o: 0, ease: 'step' }, { t: 1.6, o: 1, ease: 'out' }, { t: 2.3, y: 0, ease: 'step' }, { t: 3.8, ease: 'in' }, { t: 4.4, y: -50, o: 1, ease: 'step' }, { t: 4.45, o: 0, ease: 'step' }], SLOTH,
        `<path d="M${lx - 8} ${ly + 4}l-2 18M${lx + 8} ${ly + 4}l2 18" stroke="#8a7458" stroke-width="7" stroke-linecap="round"/>` +
          `<ellipse cx="${lx}" cy="${ly + 38}" rx="15" ry="20" fill="#a68d6a" ${Ow(1.6)}/>` +
          `<circle cx="${lx}" cy="${ly + 58}" r="12" fill="#a68d6a" ${Ow(1.6)}/><ellipse cx="${lx}" cy="${ly + 60}" rx="9" ry="7" fill="#efe2c6"/>` +
          `<path d="M${lx - 8} ${ly + 58}q3-3 6 0M${lx + 2} ${ly + 58}q3-3 6 0" fill="none" stroke="#5a4630" stroke-width="3" stroke-linecap="round"/>` +
          `<circle cx="${lx}" cy="${ly + 63}" r="1.6" fill="${INK}"/><path d="M${lx - 3} ${ly + 66}q3 2 6 0" fill="none" stroke="${INK}" stroke-width="1.2"/>` +
          `<path d="M${lx - 12} ${ly + 8}q-4-10 2-12M${lx + 12} ${ly + 8}q4-10-2-12" fill="none" stroke="#5a4630" stroke-width="2"/>`),
      'sloth',
      during(1.6, 4.45),
    )
    const liana = keys(undefined, lianaKeys(), ANCHOR,
      `<path d="M${ANCHOR[0]} ${ANCHOR[1]}q6 ${LIANA_LEN / 2} 0 ${LIANA_LEN}" fill="none" stroke="${INK}" stroke-width="6"/><path d="M${ANCHOR[0]} ${ANCHOR[1]}q6 ${LIANA_LEN / 2} 0 ${LIANA_LEN}" fill="none" stroke="#5f8f2e" stroke-width="3.4"/>` +
        `<path d="M${ANCHOR[0] + 3} ${ANCHOR[1] + 60}l10 2l-8 6zM${ANCHOR[0] + 2} ${ANCHOR[1] + 150}l-10 2l8 6z" fill="#5cb342" ${Ow(1)}/>`)
    const bigTreeFront =
      diff(222, 448, 35, parrot('#e63946'), parrot('#3a76d0'))

    // --- The middle tree with the monkey's branch and the game's owl; the banana plant (its young rolled leaf in A
    // only: a hard one) with its bunch. ---
    const midTree =
      groundShadow(712, 776, 90, 10) +
      `<path d="M690 778q8-200 4-470h40q-6 270 6 470z" fill="url(#ke-bark)" ${O}/>` +
      `<path d="M705 480q-90-4-185-10" fill="none" stroke="${INK}" stroke-width="17" stroke-linecap="round"/><path d="M705 480q-90-4-185-10" fill="none" stroke="#8f5d2e" stroke-width="12" stroke-linecap="round"/>` +
      `<path d="M730 386q20-6 44-8" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M730 386q20-6 44-8" fill="none" stroke="#8f5d2e" stroke-width="6" stroke-linecap="round"/>` +
      anim({ type: 'sway', angle: 1.2, pivot: [712, 320], period: 5.4 },
        `<circle cx="620" cy="260" r="70" fill="url(#c8-canopy)" ${O}/><circle cx="820" cy="262" r="80" fill="url(#c8-canopy)" ${O}/><circle cx="700" cy="150" r="80" fill="url(#c8-canopy)" ${O}/><circle cx="720" cy="232" r="100" fill="url(#c8-canopy)" ${O}/>` +
          `<path d="M680 220q20-16 40 0M780 260q20-16 40 0M600 270q16-12 32 0" fill="none" stroke="#1d5c33" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round"/>`) +
      anim({ type: 'sway', angle: 6, pivot: [762, 378], period: 3.6 }, keenOwl(762, 378, 0.9, blink(3.1, 0.3))) +
      // The toucan on the monkey's branch, by the trunk.
      `<g transform="translate(612 71)">${toucan}</g>`
    const banana = (x: number, y: number, rot: number) =>
      `<path transform="rotate(${rot} ${x} ${y})" d="M${x - 4} ${y - 12}q-6 14 4 24q10 2 12-4q-12-4-10-20z" fill="#ffd23f" ${Ow(1.4)}/>`
    const bunch = `<path d="M546 470v-10" stroke="#5c8a2a" stroke-width="4"/>` + [[540, 476, -20], [552, 478, 0], [546, 488, -10], [558, 488, 15], [538, 492, -30]].map(([x, y, r]) => banana(x, y, r)).join('')
    const shoot = diff(522, 441, 23, `<path d="M518 462q-2-24 4-42q8 14 4 42z" fill="#c8ec8a" ${Ow(1.6)}/><path d="M521 456q0-16 2-28" stroke="#7fae3a" stroke-width="1.6"/>`, '', 'banana')
    const bananaTree = bananaPlant(520, 640, 1.2, crown(4.4, 2, 'banana'), shoot + bunch)

    // --- The bamboo by the path (a leaf fewer in B: a hard one; a chameleon on it in A), the hibiscus bush (a flower in
    // A only). ---
    const BAMBOO: [number, number] = [1140, 700]
    const [bx, by] = BAMBOO
    const chameleon =
      `<path d="M${bx + 8} ${by - 92}q10 6 6 16q-6 2-6-6" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${bx + 8} ${by - 92}q10 6 6 16q-6 2-6-6" fill="none" stroke="#5cc36a" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M${bx - 4} ${by - 124}q16-4 16 32q-12 4-18-10z" fill="#5cc36a" ${Ow(1.6)}/><path d="M${bx + 2} ${by - 118}l4 8M${bx + 6} ${by - 110}l2 8" stroke="#3a9a4a" stroke-width="2"/>` +
      `<path d="M${bx - 4} ${by - 124}q4-10 12-8q4 6-2 12z" fill="#5cc36a" ${Ow(1.4)}/><circle cx="${bx + 2}" cy="${by - 126}" r="3.4" fill="#ffd23f" ${Ow(1)}/><circle cx="${bx + 2.6}" cy="${by - 126}" r="1.4" fill="${INK}"/>`
    const bambooStalk = anim({ type: 'sway', angle: 1.5, pivot: [bx, by], period: 3.6, id: 'bamboo' },
      `<rect x="${bx - 7}" y="${by - 250}" width="14" height="250" rx="5" fill="url(#ke-bamboo)" ${Ow(1.8)}/>` +
        [1, 2, 3, 4, 5, 6].map((j) => `<path d="M${bx - 7} ${by - j * 40}h14" stroke="#5c8a2a" stroke-width="3"/>`).join('') +
        `<path d="M${bx - 6} ${by - 200}q-20-4-34 6q18 4 34-6z" fill="url(#ke-banana-leaf)" ${Ow(1.4)}/>` +
        diff(bx + 24, by - 182, 20, `<path d="M${bx + 6} ${by - 182}q20-4 34 6q-18 4-34-6z" fill="url(#ke-banana-leaf)" ${Ow(1.4)}/>`, '', 'bamboo') +
        diff(bx + 6, by - 103, 30, chameleon, '', 'bamboo'))
    const bamboo = bambooClump(1060, 704, 1, 4, (pivot, m) => anim({ type: 'sway', angle: 1.5, pivot, period: 3.6, phase: (pivot[0] % 7) / 7 }, m)) + bambooStalk
    const hibiscusFlower = (x: number, y: number) =>
      [0, 72, 144, 216, 288].map((a) => `<ellipse transform="rotate(${a} ${x} ${y})" cx="${x}" cy="${y - 8}" rx="6" ry="9" fill="#ff4d6d" ${Ow(1.2)}/>`).join('') +
      `<circle cx="${x}" cy="${y}" r="3" fill="#ffd23f"/><path d="M${x} ${y}l8-8" stroke="#ffd23f" stroke-width="2"/>`
    const hibiscus =
      `<path d="M1200 840q-10-50 40-60q50-10 70 30q10 30-10 30z" fill="url(#ke-oak)" ${O}/>` +
      hibiscusFlower(1222, 812) + hibiscusFlower(1296, 818) +
      diff(1260, 798, 22, hibiscusFlower(1260, 798), '')

    // --- Big foreground leaves and ferns. ---
    const fern = (x: number, y: number, s: number, d: number) => {
      let m = `<path d="M${x} ${y}q${d * 40 * s}-${60 * s} ${d * 110 * s}-${70 * s}" fill="none" stroke="#2f7d34" stroke-width="${3 * s}"/>`
      for (let i = 1; i < 8; i++) {
        const fx = Math.round(x + d * i * 13 * s)
        const fy = Math.round(y - i * 9 * s + (i * i * s) / 2)
        m += `<path d="M${fx} ${fy}q${d * 6 * s}-${16 * s} ${d * 14 * s}-${20 * s}q-${d * 2 * s} ${12 * s}-${d * 14 * s} ${20 * s}zM${fx} ${fy}q${d * 10 * s} ${4 * s} ${d * 18 * s} ${14 * s}q-${d * 10 * s} 0-${d * 18 * s}-${14 * s}z" fill="#4fae56" ${Ow(1.2)}/>`
      }
      return anim({ type: 'sway', angle: 4, pivot: [x, y], period: 3.2, phase: (x % 5) / 5 }, m)
    }
    const monstera = (x: number, y: number, s: number, rot: number) =>
      anim({ type: 'sway', angle: 3, pivot: [x, y], period: 3.8, phase: (x % 9) / 9 },
        `<g transform="rotate(${rot} ${x} ${y})"><path d="M${x} ${y}v-${50 * s}" stroke="#2f7d34" stroke-width="${5 * s}"/>` +
          `<path d="M${x} ${y - 50 * s}q-${60 * s}-${10 * s}-${50 * s}-${80 * s}q${40 * s}-${40 * s} ${100 * s}-${10 * s}q${20 * s} ${70 * s}-${50 * s} ${90 * s}z" fill="url(#ke-banana-leaf)" ${Ow(2)}/>` +
          `<path d="M${x - 30 * s} ${y - 80 * s}l${14 * s} ${6 * s}M${x + 20 * s} ${y - 110 * s}l${-6 * s} ${14 * s}M${x + 30 * s} ${y - 70 * s}l${-14 * s} ${2 * s}" stroke="#7fbf6a" stroke-width="${5 * s}" stroke-linecap="round"/></g>`)
    const foreground =
      fern(20, 900, 1.2, 1) + fern(380, 900, 1, -1) + fern(1060, 900, 1, 1) + fern(1440, 900, 1.2, -1) +
      monstera(-10, 930, 1.3, 20) + monstera(1450, 930, 1.3, -20) + monstera(330, 930, 0.8, 10)
    const morpho = (x: number, y: number, phase: number, points: [number, number][]) =>
      anim({ type: 'path', points, period: 9, phase }, butterflyAt(x, y, ['#3aa0ff', '#1f5fd1'], flap([x, y], phase)))
    const butterflies = morpho(420, 600, 0, [[0, 0], [60, -40], [120, 10], [40, 30]]) + morpho(980, 640, 0.4, [[0, 0], [-70, -30], [-120, 20], [-40, 40]])

    // --- The monkey. ---
    const [mx, my] = MONKEY
    const armKeysR: Keyframe[] = [
      { t: 0, rot: 180 }, { t: 3.6, ease: 'inOut' }, { t: 3.85, rot: 0 },
      { t: 9.8, ease: 'inOut' }, { t: 10, rot: 30 }, { t: 13.2, ease: 'out' }, { t: 13.4, rot: -160 },
      { t: 14.4, rot: 150, ease: 'inOut' }, { t: 15, ease: 'inOut' }, { t: 15.3, rot: 180, ease: 'inOut' }, { t: 15.7, rot: 0 },
      { t: 18.1, ease: 'inOut' }, { t: 18.3, rot: -150 }, { t: 19.95, ease: 'step' },
    ]
    const armKeysL: Keyframe[] = [
      { t: 0, rot: -20 }, { t: 3.6, ease: 'inOut' }, { t: 3.85, rot: 0 },
      // Reaches for a banana, eats it, tosses the peel over its shoulder.
      { t: 4.2, ease: 'inOut' }, { t: 4.45, rot: 40, ease: 'inOut' }, { t: 4.7, rot: 165, ease: 'inOut' },
      ...Array.from({ length: 6 }, (_, i) => ({ t: 5 + i * 0.27, rot: i % 2 ? 165 : 172, ease: 'inOut' as const })),
      { t: 6.65, rot: 165, ease: 'in' }, { t: 6.85, rot: 205, ease: 'out' }, { t: 7.2, rot: 0 },
      { t: 9.8, ease: 'inOut' }, { t: 10, rot: -30 }, { t: 13.2, ease: 'out' }, { t: 13.4, rot: 160 },
      { t: 15, ease: 'inOut' }, { t: 15.3, rot: 180, ease: 'inOut' }, { t: 15.7, rot: 0 },
      // Hands the elephant its last banana.
      { t: 16.3, ease: 'inOut' }, { t: 16.8, rot: 50 }, { t: 17.2, ease: 'inOut' }, { t: 17.5, rot: 0 },
      { t: 18.1, ease: 'inOut' }, { t: 18.3, rot: 150 }, { t: 19.95, ease: 'step' },
    ]
    const peeled = (x: number, y: number) =>
      `<path d="M${x - 3} ${y - 4}q-2-12 3-18q5 6 3 18z" fill="#fff6d8" ${Ow(1.3)}/><path d="M${x - 4} ${y - 4}q-8-2-10 6M${x + 4} ${y - 4}q8-2 10 6M${x} ${y - 4}v10" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${x - 4} ${y - 4}q-8-2-10 6M${x + 4} ${y - 4}q8-2 10 6M${x} ${y - 4}v10" fill="none" stroke="#ffd23f" stroke-width="3" stroke-linecap="round"/>`
    const peel = (x: number, y: number) =>
      `<path d="M${x - 1} ${y}q-10-2-12 8M${x + 1} ${y}q10-2 12 8M${x} ${y}v12" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${x - 1} ${y}q-10-2-12 8M${x + 1} ${y}q10-2 12 8M${x} ${y}v12" fill="none" stroke="#ffd23f" stroke-width="3" stroke-linecap="round"/>`
    // What the left hand holds (hand at the arm's end, hanging down: (mx − 12, my − 6)).
    const [hx, hy] = [mx - 12, my - 6]
    const inHand =
      once(showIn([4.6, 5]), MONKEY, banana(hx, hy + 6, 180)) +
      once(showIn([5, 6.6]), MONKEY, `<g transform="rotate(180 ${hx} ${hy + 4})">${peeled(hx, hy + 4)}</g>`) +
      once(showIn([6.6, 6.85]), MONKEY, `<g transform="rotate(180 ${hx} ${hy + 4})">${peel(hx, hy + 4)}</g>`) +
      once(showIn([15.9, 17.15]), MONKEY, banana(hx, hy + 6, 160))
    const arm = (sx: number, k: Keyframe[], extra = '') =>
      keys(undefined, k, [sx, my - 36],
        `<path d="M${sx} ${my - 36}v26" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M${sx} ${my - 36}v26" stroke="#8a5a32" stroke-width="7" stroke-linecap="round"/>` +
          `<circle cx="${sx}" cy="${my - 7}" r="5" fill="#e8c79a" ${Ow(1.4)}/>` + extra)
    const meye = (x: number) => `<circle cx="${x}" cy="${my - 58}" r="2.6" fill="${INK}"/><circle cx="${x + 0.8}" cy="${my - 59}" r="0.9" fill="#fff"/>`
    const monkeyFace =
      once(showIn([0, 9.8], [15.4, 18.2]), MONKEY, meye(mx - 5) + meye(mx + 5) + `<path d="M${mx - 5} ${my - 48}q5 4 10 0" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`) +
      // Laughing.
      once(showIn([9.8, 13.25], [18.2, LOOP]), MONKEY,
        `<path d="M${mx - 8} ${my - 58}q3-3 6 0M${mx + 2} ${my - 58}q3-3 6 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/><path d="M${mx - 6} ${my - 50}q6 9 12 0z" fill="#7a2a2a" ${Ow(1.2)}/>`) +
      // Wide-eyed: the water, the crocodile.
      once(showIn([13.25, 15.4]), MONKEY,
        `<circle cx="${mx - 5}" cy="${my - 58}" r="4" fill="#fff" ${Ow(1.2)}/><circle cx="${mx + 5}" cy="${my - 58}" r="4" fill="#fff" ${Ow(1.2)}/><circle cx="${mx - 5}" cy="${my - 58}" r="1.5" fill="${INK}"/><circle cx="${mx + 5}" cy="${my - 58}" r="1.5" fill="${INK}"/><ellipse cx="${mx}" cy="${my - 48}" rx="3" ry="3.5" fill="#7a2a2a"/>`) +
      // Chewing.
      once(showIn([5.3, 6.6]), MONKEY, anim({ type: 'keys', period: 0.3, keys: [{ t: 0, sx: 1, sy: 1 }, { t: 0.15, sx: 1.3, sy: 1.3, ease: 'inOut' }], pivot: [mx + 9, my - 50] }, `<circle cx="${mx + 9}" cy="${my - 50}" r="4" fill="#e8c79a"/>`))
    const monkey = keys('monkey', monkeyKeys(), MONKEY,
      anim({ type: 'sway', angle: 10, pivot: [mx + 10, my - 6], period: 2 },
        `<path d="M${mx + 10} ${my - 6}q26 4 26-20q0-14-10-12q-8 2-4 10" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M${mx + 10} ${my - 6}q26 4 26-20q0-14-10-12q-8 2-4 10" fill="none" stroke="#8a5a32" stroke-width="3.6" stroke-linecap="round"/>`) +
        arm(mx + 12, armKeysR) +
        `<ellipse cx="${mx - 8}" cy="${my - 4}" rx="9" ry="6" fill="#8a5a32" ${Ow(1.6)}/><ellipse cx="${mx + 8}" cy="${my - 4}" rx="9" ry="6" fill="#8a5a32" ${Ow(1.6)}/>` +
        `<ellipse cx="${mx}" cy="${my - 24}" rx="15" ry="20" fill="url(#c8-fur)" ${Ow(1.8)}/><ellipse cx="${mx}" cy="${my - 20}" rx="9" ry="13" fill="#e8c79a"/>` +
        `<circle cx="${mx - 17}" cy="${my - 56}" r="6" fill="#8a5a32" ${Ow(1.4)}/><circle cx="${mx + 17}" cy="${my - 56}" r="6" fill="#8a5a32" ${Ow(1.4)}/><circle cx="${mx - 17}" cy="${my - 56}" r="3" fill="#e8c79a"/><circle cx="${mx + 17}" cy="${my - 56}" r="3" fill="#e8c79a"/>` +
        `<circle cx="${mx}" cy="${my - 56}" r="16" fill="url(#c8-fur)" ${Ow(1.8)}/>` +
        `<path d="M${mx} ${my - 64}q-12-4-12 6q0 16 12 16q12 0 12-16q0-10-12-6z" fill="#e8c79a" ${Ow(1.2)}/>` +
        monkeyFace +
        arm(mx - 12, armKeysL, inHand))

    // The peel: from the monkey's hand over its shoulder onto the path; kicked away by the elephant's foot.
    const PEEL: [number, number] = [982, 772]
    const flyingPeel = once(
      [
        { t: 0, x: -372, y: -360, rot: 0, o: 0, ease: 'step' },
        { t: 6.85, o: 1, ease: 'out' },
        { t: 7.2, x: -180, y: -440, rot: 300, ease: 'in' },
        { t: 7.55, x: 0, y: 0, rot: 540, ease: 'step' },
        { t: 9.45, ease: 'out' },
        { t: 9.8, x: -60, y: -140, rot: 900, ease: 'in' },
        { t: 10.1, x: -100, y: 40, rot: 1080, o: 1, ease: 'step' },
        { t: 10.15, o: 0, ease: 'step' },
      ],
      PEEL,
      peel(PEEL[0], PEEL[1] - 8),
    )

    // --- The elephant. ---
    const [ex, ey] = ELE
    const legSwing = (x: number, flip: boolean) =>
      keys(undefined, swingKeys([ELE_WALK], 0.3, 12, flip), [x, ey - 44],
        `<rect x="${x - 13}" y="${ey - 48}" width="26" height="48" rx="10" fill="url(#c8-ele)" ${Ow(2)}/><path d="M${x - 8} ${ey - 2}h4M${x - 2} ${ey - 2}h4M${x + 4} ${ey - 2}h4" stroke="#e9e3d6" stroke-width="3" stroke-linecap="round"/>`)
    const eleEyes =
      once(showIn([0, 9.4], [10.7, 11], [13.6, 17.7]), ELE, `<circle cx="${ex - 86}" cy="${ey - 118}" r="4" fill="${INK}"/><circle cx="${ex - 87}" cy="${ey - 120}" r="1.2" fill="#fff"/>`) +
      once(showIn([9.4, 10.7]), ELE, `<circle cx="${ex - 86}" cy="${ey - 118}" r="7" fill="#fff" ${Ow(1.4)}/><circle cx="${ex - 87}" cy="${ey - 118}" r="2.2" fill="${INK}"/>`) +
      // Cross.
      once(showIn([11, 13.6]), ELE, `<circle cx="${ex - 86}" cy="${ey - 116}" r="4" fill="${INK}"/><path d="M${ex - 98} ${ey - 130}l18 6" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>`) +
      // Content.
      once(showIn([17.7, LOOP]), ELE, `<path d="M${ex - 92} ${ey - 118}q6-6 12 0" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`)
    const [tx, ty] = TRUNK
    // The banana in the trunk's tip (rest coordinates), from the monkey to the mouth.
    const trunkBanana = once(showIn([17.1, 17.7]), TRUNK, banana(ex - 118, ey - 18, 90))
    const trunk = keys(undefined, trunkKeys, TRUNK,
      `<path d="M${tx - 8} ${ty}q-14 40-6 74h12q-4-34 18-70z" fill="url(#c8-ele)" ${Ow(2)}/>` +
        `<path d="M${tx - 14} ${ty + 24}h10M${tx - 15} ${ty + 38}h10M${tx - 14} ${ty + 52}h10M${tx - 12} ${ty + 64}h9" stroke="#5f6878" stroke-width="1.6"/>` +
        trunkBanana)
    const elephant = keys('ele', eleKeys, ELE,
      groundShadow(ex, ey, 110, 10) +
        legSwing(ex + 64, false) + legSwing(ex - 30, true) +
        `<path d="M${ex + 90} ${ey - 96}q14 16 8 36" fill="none" stroke="${INK}" stroke-width="3"/><path d="M${ex + 96} ${ey - 64}l4 10l-8-2z" fill="${INK}"/>` +
        `<ellipse cx="${ex + 12}" cy="${ey - 82}" rx="84" ry="54" fill="url(#c8-ele)" ${Ow(2.2)}/>` +
        legSwing(ex + 44, true) + legSwing(ex - 50, false) +
        `<path d="M${ex - 12} ${ey - 120}q30 30 0 60" fill="none" stroke="#5f6878" stroke-opacity="0.5" stroke-width="3"/>` +
        `<circle cx="${ex - 72}" cy="${ey - 108}" r="44" fill="url(#c8-ele)" ${Ow(2.2)}/>` +
        trunk +
        `<path d="M${ex - 96} ${ey - 84}q-8 16-24 18q10-10 14-22z" fill="#fffaf0" ${Ow(1.6)}/>` +
        anim({ type: 'keys', period: 1.8, keys: [{ t: 0, rot: 0 }, { t: 0.9, rot: -10, ease: 'inOut' }], pivot: [ex - 44, ey - 132] },
          `<path d="M${ex - 44} ${ey - 140}q44-20 54 30q4 40-36 50q-24-10-18-40z" fill="url(#c8-ele)" ${Ow(2)}/><path d="M${ex - 34} ${ey - 126}q30-10 34 20q0 24-22 32" fill="none" stroke="#d99aa8" stroke-opacity="0.7" stroke-width="6"/>`) +
        eleEyes +
        `<path d="M${ex - 92} ${ey - 92}q8 6 16 2" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`)

    // The water: the jet, the fountain, splashes.
    const JET: [number, number] = [673, 695]
    const jet = once(
      [{ t: 0, sx: 0.1, sy: 0.1, o: 0, ease: 'step' }, { t: 13.15, o: 1, ease: 'out' }, { t: 13.35, sx: 1, sy: 1, ease: 'step' }, { t: 13.55, o: 0, ease: 'step' }],
      JET,
      `<path d="M${JET[0]} ${JET[1]}Q640 520 592 418" fill="none" stroke="#2f8fd0" stroke-width="16" stroke-linecap="round"/><path d="M${JET[0]} ${JET[1]}Q640 520 592 418" fill="none" stroke="#bfe8f5" stroke-width="10" stroke-linecap="round"/>` +
        `<circle cx="592" cy="418" r="18" fill="#bfe8f5" fill-opacity="0.85" ${Ow(1.6)}/>`,
    )
    const FOUNT: [number, number] = [705, 690]
    const fountain = once(showIn([18.4, 19.95]), FOUNT,
      [[-60, 0], [-30, 0.15], [0, 0.3], [30, 0.45], [60, 0.6], [-45, 0.75], [45, 0.9]]
        .map(([dx, phase]) => anim({ type: 'keys', period: 1, phase, keys: [{ t: 0, x: 0, y: 0, o: 1 }, { t: 0.45, x: dx * 0.5, y: -90, ease: 'out' }, { t: 1, x: dx, y: 10, o: 0.4, ease: 'in' }], pivot: FOUNT },
          `<ellipse cx="${FOUNT[0]}" cy="${FOUNT[1]}" rx="4" ry="6" fill="#bfe8f5" ${Ow(1.2)}/>`))
        .join(''))
    const splash = (at: [number, number], t: number, n: number) => {
      let m = ''
      for (let i = 0; i < n; i++) {
        const dx = Math.round((i - (n - 1) / 2) * 18)
        const up = Math.round(50 + (i % 3) * 26)
        m += once([{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t, o: 1, ease: 'out' }, { t: t + 0.3, x: dx, y: -up, ease: 'in' }, { t: t + 0.65, x: dx * 1.4, y: 10, o: 1, ease: 'step' }, { t: t + 0.7, o: 0, ease: 'step' }], at,
          `<ellipse cx="${at[0]}" cy="${at[1]}" rx="4" ry="6" fill="#d8f0fb" ${Ow(1.2)}/>`)
      }
      return m
    }
    const ripples = once(showIn([10.6, LOOP]), [800, 802],
      [0, 0.9].map((phase) => anim({ type: 'keys', period: 1.8, phase, keys: [{ t: 0, sx: 0.8, sy: 0.8, o: 0.9 }, { t: 1.8, sx: 1.5, sy: 1.5, o: 0 }], pivot: [790, 802] },
        `<ellipse cx="790" cy="802" rx="110" ry="14" fill="none" stroke="#fff" stroke-width="2.6"/>`)).join(''))

    // --- Events of B: a dung beetle rolls its ball across the path, a crocodile's eyes rise by the monkey. ---
    const BEETLE: [number, number] = [1150, 792]
    const [qx, qy] = BEETLE
    const beetle = diff(
      qx,
      qy - 10,
      24,
      '',
      keys('beetle', [{ t: 0, x: 40, o: 0, ease: 'step' }, { t: 7.4, o: 1, ease: 'linear' }, { t: 9.6, x: -40, o: 1, ease: 'step' }, { t: 9.65, o: 0, ease: 'step' }], BEETLE,
        anim({ type: 'rotate', pivot: [qx - 8, qy - 10], period: 1.2, reverse: true }, `<circle cx="${qx - 8}" cy="${qy - 10}" r="10" fill="#8a6a3e" ${Ow(1.6)}/><path d="M${qx - 14} ${qy - 14}l6 4M${qx - 6} ${qy - 4}l4-6" stroke="#5e4428" stroke-width="1.6"/>`) +
          `<path d="M${qx + 4} ${qy - 4}l-3 4M${qx + 10} ${qy - 4}l2 4M${qx + 14} ${qy - 4}l4 4" stroke="${INK}" stroke-width="1.6"/>` +
          `<ellipse cx="${qx + 10}" cy="${qy - 9}" rx="9" ry="6" fill="#2b3a4a" ${Ow(1.4)}/><path d="M${qx + 10} ${qy - 15}v12" stroke="#5f7d9a" stroke-width="1.2"/><circle cx="${qx + 2}" cy="${qy - 10}" r="3.4" fill="#2b3a4a" ${Ow(1.2)}/>`),
      'beetle',
      during(7.4, 9.65),
    )
    const CROC: [number, number] = [566, 826]
    const [cx, cy] = CROC
    const croc = diff(
      cx + 3,
      cy - 5,
      29,
      '',
      keys('croc', [{ t: 0, y: 14, o: 0, ease: 'step' }, { t: 13.8, o: 1, ease: 'out' }, { t: 14.2, y: 0 }, { t: 15.4, ease: 'in' }, { t: 15.75, y: 14, o: 1, ease: 'step' }, { t: 15.8, o: 0, ease: 'step' }], CROC,
        `<path d="M${cx - 22} ${cy}q4-10 14-10t14 4q10-6 18 2q4 4 0 4z" fill="#5f8f3e" ${Ow(1.6)}/>` +
          `<circle cx="${cx - 12}" cy="${cy - 10}" r="5.5" fill="#5f8f3e" ${Ow(1.4)}/><circle cx="${cx + 2}" cy="${cy - 10}" r="5.5" fill="#5f8f3e" ${Ow(1.4)}/>` +
          `<circle cx="${cx - 12}" cy="${cy - 11}" r="3" fill="#ffd23f"/><circle cx="${cx + 2}" cy="${cy - 11}" r="3" fill="#ffd23f"/><path d="M${cx - 12} ${cy - 13}v4M${cx + 2} ${cy - 13}v4" stroke="${INK}" stroke-width="1.6"/>` +
          `<circle cx="${cx + 20}" cy="${cy - 4}" r="1.4" fill="${INK}"/>`),
      'croc',
      during(13.8, 15.8),
    )
    const lily = diff(948, 818, 26,
      `<path d="M950 826l16-3a20 8 0 1 1-4-4z" fill="#5aa845" ${Ow(1.6)}/><path d="M940 822q-2-12 6-14q4 6 6 14zM960 822q2-12-6-14q-4 6-6 14z" fill="#ff9fc0" ${Ow(1.4)}/><path d="M946 822q0-14 4-18q4 4 4 18z" fill="#ffc2d7" ${Ow(1.4)}/>`, '')

    return (
      `<defs>${NATURE_DEFS}${JUNGLE_DEFS}` +
      `<linearGradient id="c8-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd0e8"/><stop offset="0.6" stop-color="#cdebd9"/><stop offset="1" stop-color="#e8f4d8"/></linearGradient>` +
      `<linearGradient id="c8-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fb04a"/><stop offset="1" stop-color="#4a8a36"/></linearGradient>` +
      `<linearGradient id="c8-path" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b08a52"/><stop offset="1" stop-color="#d4b27a"/></linearGradient>` +
      `<linearGradient id="c8-river" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fc3d6"/><stop offset="1" stop-color="#3a8fb0"/></linearGradient>` +
      `<radialGradient id="c8-canopy" cx="0.64" cy="0.28" r="0.85"><stop offset="0" stop-color="#7fcf5e"/><stop offset="0.5" stop-color="#2f8a3e"/><stop offset="1" stop-color="#1a5a2a"/></radialGradient>` +
      `<radialGradient id="c8-fur" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#b07a44"/><stop offset="1" stop-color="#6e4224"/></radialGradient>` +
      `<radialGradient id="c8-ele" cx="0.62" cy="0.3" r="0.85"><stop offset="0" stop-color="#c3cad6"/><stop offset="0.55" stop-color="#97a2b4"/><stop offset="1" stop-color="#6b7688"/></radialGradient>` +
      `<radialGradient id="c8-sunlight" cx="0.65" cy="0" r="1"><stop offset="0" stop-color="#fff6cc" stop-opacity="0.3"/><stop offset="0.5" stop-color="#fff6cc" stop-opacity="0.06"/><stop offset="1" stop-color="#fff6cc" stop-opacity="0"/></radialGradient>` +
      `<clipPath id="c8-dry"><path clip-rule="evenodd" d="M0 0H${W}V${H}H0zM440 ${WATERLINE}H1010V${H}H440z"/></clipPath></defs>` +
      sky +
      ground +
      tufts +
      bamboo +
      sloth +
      bigTree +
      canopy(5.6) +
      vines +
      liana +
      bigTreeFront +
      midTree +
      bananaTree +
      lily +
      `<g clip-path="url(#c8-dry)">${elephant}${monkey}</g>` +
      ripples +
      splash([790, 800], 10.6, 10) +
      splash([640, 800], 13.9, 6) +
      croc +
      flyingPeel +
      beetle +
      hibiscus +
      jet +
      fountain +
      butterflies +
      foreground +
      `<rect width="${W}" height="${H}" fill="url(#c8-sunlight)"/>`
    )
  },
})
