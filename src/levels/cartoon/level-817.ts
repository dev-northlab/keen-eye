// Cartoon "The joey's pouch" (docs/cartoon-mode.md), made like 812: a 20 s story in the Australian outback told by a
// camera. A kangaroo hops across the red plain while the joey in its pouch throws out what it has collected — a ball,
// a sock — and then a boomerang: round it flies, knocks the leaf out of a koala's paw and comes back. The cross koala
// drops a gumnut on the kangaroo's head — bonk — and the joey catches the nut and tucks it into the pouch, pleased.
// Twelve differences: two hard (a gumnut of a cluster, a cockatoo's crest), three events of the story.
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { farBird, groundShadow, INK, keenOwl, NATURE_DEFS, O, Ow, puffCloud } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // The kangaroo resting by the ghost gum, the cockatoos, the emu, the big red rock.
  { t: 1.6, x: 820, y: 420, w: 600, ease: 'inOut' },
  { t: 3.95, x: 740, y: 440, w: 600, ease: 'step' },
  // Off it hops; out fly a ball and a sock.
  { t: 4, x: 740, y: 440, w: 600, ease: 'inOut' },
  { t: 6, x: 460, y: 450, w: 600, ease: 'step' },
  // The joey and its boomerang.
  { t: 6.05, x: 620, y: 580, w: 320, ease: 'step' },
  // Round the koala's tree — the leaf!
  { t: 7.3, x: 160, y: 330, w: 520, ease: 'step' },
  // Back into the joey's paws.
  { t: 9.9, x: 560, y: 580, w: 400, ease: 'step' },
  // The cross koala takes a gumnut.
  { t: 10.6, x: 180, y: 360, w: 380, ease: 'step' },
  // The kangaroo hops under the branch — bonk.
  { t: 12.4, x: 140, y: 360, w: 760, ease: 'step' },
  // Stars for the kangaroo, a nut for the joey.
  { t: 16.4, x: 150, y: 350, w: 600 },
  { t: 19.95, x: 156, y: 352, w: 590, ease: 'step' },
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

/** Hops from x0 to x1 (offsets) between t0 and t1, `heights` high each, squashing on landing. */
function hops(t0: number, t1: number, x0: number, x1: number, heights: number[]): Keyframe[] {
  const n = heights.length
  const d = (t1 - t0) / n
  const k: Keyframe[] = []
  for (let i = 0; i < n; i++) {
    const from = x0 + ((x1 - x0) * i) / n
    const to = x0 + ((x1 - x0) * (i + 1)) / n
    k.push({ t: t0 + i * d + d / 2, x: (from + to) / 2, y: -heights[i], rot: -8, sy: 1.05, ease: 'in' })
    k.push({ t: t0 + (i + 1) * d, x: to, y: 0, rot: 0, sy: 0.9, ease: 'out' })
    if (i < n - 1) k.push({ t: t0 + (i + 1) * d + 0.06, sy: 1, ease: 'out' })
  }
  return k
}

/** The kangaroo's feet (it faces left): resting by the ghost gum at first. */
const KANGA: [number, number] = [1180, 800]
const AT_REST = -400
const UNDER_TREE = -790
const BONK = 14.3
function kangaKeys(): Keyframe[] {
  const k: Keyframe[] = [{ t: 0, x: 0, y: 0, rot: 0, sy: 1 }, { t: 4, ease: 'out' }]
  k.push(...hops(4, 6, 0, AT_REST, [70, 70, 70, 70]))
  k.push({ t: 6.1, sy: 1, ease: 'out' }, { t: 12.4, x: AT_REST, y: 0, rot: 0, sy: 1, ease: 'out' })
  k.push(...hops(12.4, 13.8, AT_REST, UNDER_TREE, [70, 100, 70]))
  // Bonk: squashed, then swaying, dazed.
  k.push({ t: 14.25, sy: 1, rot: 0, ease: 'in' }, { t: 14.35, sy: 0.86, rot: 5, ease: 'out' }, { t: 14.7, sy: 0.96, rot: -3, ease: 'inOut' })
  for (let i = 1; i <= 8; i++) k.push({ t: 14.7 + i * 0.6, rot: i % 2 ? 3 : -3, ease: 'inOut' })
  k.push({ t: 19.95, ease: 'step' })
  return k
}

/** Where things rest: the ball, the sock, the boomerang (where the joey drops it), the koala, the falling nut. */
const BALL: [number, number] = [900, 812]
const SOCK: [number, number] = [842, 790]
const BOOM: [number, number] = [735, 818]
const KOALA: [number, number] = [340, 446]
const NUT: [number, number] = [334, 452]
/** Boomerang offsets (from BOOM) along its flight, with its spin. */
const BOOM_PATH: [number, number, number, number][] = [
  [7, -20, -150, -120],
  [7.6, -145, -258, -540],
  [8, -265, -438, -820],
  [8.4, -365, -418, -1100],
  [8.6, -405, -398, -1240],
  [9.1, -295, -488, -1600],
  [9.5, -215, -418, -1890],
  [9.8, -135, -258, -2100],
  [10.1, -3, -130, -2310],
]

export default svgLevel({
  id: 817,
  chapter: 'cartoon',
  title: 'cartoonJoey',
  parTimeSec: 120,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const sway = (pivot: [number, number], period: number, angle = 2, id?: string) => (m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 11) / 11, ...(id && { id }) }, m)
    const blink = (period: number, phase = 0) => (m: string) => anim({ type: 'blink', duty: 0.07, period, phase }, m)
    const flap = (pivot: [number, number], every: number, phase = 0) => (m: string) =>
      anim({ type: 'keys', period: every, phase, keys: [{ t: 0, sy: 1 }, { t: every / 2, sy: 0.3, ease: 'inOut' }], pivot }, m)

    // --- Sky, the big red rock, the far plain, the windmill (its tail vane in A only). ---
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c17-sky)"/>` +
      `<circle cx="1160" cy="140" r="200" fill="url(#c17-glow)"/>` +
      `<circle cx="1160" cy="140" r="46" fill="#ffd56a" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="1146" cy="132" rx="4.5" ry="7" fill="${INK}"/><ellipse cx="1174" cy="132" rx="4.5" ry="7" fill="${INK}"/>` +
      blink(4.3, 0.2)(`<rect x="1136" y="124" width="48" height="18" fill="#ffd56a"/><path d="M1138 133h12M1168 133h12" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<path d="M1142 154q18 14 36 0" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>` +
      anim({ type: 'path', points: [[0, 0], [130, 0]], period: 36 }, puffCloud(300, 130, 0.9)) +
      anim({ type: 'path', points: [[0, 0], [-100, 0]], period: 30 }, puffCloud(760, 90, 0.7)) +
      keys(undefined, [{ t: 0, x: 0, y: 0 }, { t: 10, y: -20, ease: 'inOut' }, { t: 19.9, x: -1600, y: 0 }], [1480, 250],
        ([[1480, 250], [1504, 238], [1508, 262], [1530, 248]] as [number, number][]).map(([fx, fy], i) => farBird(fx, fy, flap([fx, fy - 2], 0.5, i * 0.15))).join(''))
    const rock =
      `<path d="M930 568q10-70 70-96q120-40 260-22q90 14 120 60q20 30 30 58z" fill="url(#c17-rock)" ${O}/>` +
      `<path d="M990 530q8-30 30-46M1060 556q4-50 30-82M1150 560q0-60 20-104M1240 560q-4-50 10-96M1320 562q-8-30-2-62" fill="none" stroke="#8a3a1c" stroke-opacity="0.45" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M1010 500q100-40 240-30" fill="none" stroke="#ffb07a" stroke-opacity="0.5" stroke-width="5" stroke-linecap="round"/>`
    const plain =
      `<path d="M0 560q300-16 720-6t720 4V${H}H0z" fill="url(#c17-plain)"/>` +
      `<path d="M0 640q360-18 720-8t720 10V${H}H0z" fill="url(#c17-ground)"/>` +
      // The red dirt track the kangaroo hops along.
      `<path d="M0 820q300-34 640-30t800-12v40q-420 0-800 12t-640 30z" fill="#c8693a" fill-opacity="0.55"/>`
    // Far gum trees and bushes, hazy.
    let far = ''
    for (let i = 0; i < 16; i++) {
      const fx = Math.round(40 + i * 90 + rand() * 30)
      const fy = Math.round(566 + rand() * 10)
      far += `<path d="M${fx} ${fy}v-${16 + Math.round(rand() * 10)}" stroke="#a98a6a" stroke-width="3"/><ellipse cx="${fx}" cy="${fy - 26}" rx="${16 + Math.round(rand() * 10)}" ry="10" fill="#9fb08a" fill-opacity="0.8"/>`
    }
    const windmill =
      `<path d="M584 600l12-150h8l12 150M590 560h20M592 520h16" fill="none" stroke="${INK}" stroke-width="3"/><path d="M584 600l12-150h8l12 150" fill="none" stroke="#9aa3ad" stroke-width="1.4"/>` +
      `<rect x="572" y="596" width="56" height="14" fill="#8a93a0" ${Ow(1.6)}/>` +
      anim({ type: 'rotate', pivot: [600, 446], period: 3 },
        Array.from({ length: 8 }, (_, i) => `<path transform="rotate(${i * 45} 600 446)" d="M600 446l-4-30h8z" fill="#d0d6de" ${Ow(1)}/>`).join('') + `<circle cx="600" cy="446" r="4" fill="${INK}"/>`) +
      diff(622, 444, 26, `<path d="M604 446h22" stroke="${INK}" stroke-width="3"/><path d="M622 434l18 6l-18 18z" fill="#e63946" ${Ow(1.4)}/>`, '')

    // --- Spinifex, desert peas (a clump in A only), stones. ---
    const spinifex = (x: number, y: number, s: number) => {
      let m = `<path d="M${x - 24 * s} ${y}q24-${30 * s} ${48 * s} 0z" fill="url(#c17-spinifex)" ${Ow(1.4)}/>`
      for (let i = 0; i < 9; i++) {
        const a = (-160 + i * 17.5) * (Math.PI / 180)
        m += `<path d="M${x} ${y - 4 * s}l${Math.round(Math.cos(a) * 30 * s)} ${Math.round(Math.sin(a) * 28 * s)}" stroke="#b7a14a" stroke-width="${1.6 * s}" stroke-linecap="round"/>`
      }
      return m
    }
    let scrub = ''
    for (let i = 0; i < 26; i++) {
      const sx = Math.round(rand() * W)
      const sy = Math.round(650 + rand() * 240)
      if (sx > 430 && sx < 740 && sy > 740 && sy < 860) continue
      scrub += anim({ type: 'sway', angle: 3, pivot: [sx, sy], period: 3, phase: (sx % 7) / 7 }, spinifex(sx, sy, 0.6 + rand() * 0.5))
    }
    let pebbles = ''
    for (let i = 0; i < 30; i++) pebbles += `<ellipse cx="${Math.round(rand() * W)}" cy="${Math.round(660 + rand() * 230)}" rx="${3 + Math.round(rand() * 4)}" ry="2.4" fill="#8a3a1c" fill-opacity="0.45"/>`
    const pea = (x: number, y: number) =>
      `<path d="M${x - 8} ${y}l-8-6l8 0l-2-8l8 6z" fill="#e63946" ${Ow(1.2)}/><circle cx="${x - 7}" cy="${y - 2}" r="2.6" fill="#1b1410"/>`
    const peas = (x: number, y: number) =>
      `<path d="M${x - 20} ${y + 10}q20-6 40 0" fill="none" stroke="#6f8a4a" stroke-width="3"/>` + pea(x - 4, y) + pea(x + 12, y - 4) + pea(x + 4, y + 8)
    const desertPea = peas(250, 780) + diff(455, 749, 26, peas(455, 748), '')

    // --- The creek (in B the platypus dives), a rock with a blue-tongue lizard (A only). ---
    const creek =
      `<path d="M452 800q60-44 140-36t130 14q20 38-20 60q-100 22-210 10q-50-10-40-48z" fill="url(#c17-water)" ${Ow(1.8)}/>` +
      anim({ type: 'keys', period: 3, keys: [{ t: 0, x: 0 }, { t: 1.5, x: 12, ease: 'inOut' }] }, `<path d="M500 796h50M600 812h60M520 828h40" stroke="#fff" stroke-opacity="0.6" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<ellipse cx="466" cy="818" rx="14" ry="7" fill="#9a8a7a" ${Ow(1.4)}/><ellipse cx="708" cy="808" rx="12" ry="6" fill="#9a8a7a" ${Ow(1.4)}/>`
    const PLATY: [number, number] = [580, 806]
    const [px, py] = PLATY
    const platypus = diff(
      px + 1,
      py,
      33,
      '',
      keys('platy', [{ t: 0, x: 0, y: 6, o: 0, ease: 'step' }, { t: 13, o: 1, ease: 'out' }, { t: 13.4, y: 0, ease: 'linear' }, { t: 15.3, x: 60, rot: 0, ease: 'in' }, { t: 15.7, x: 70, y: 8, rot: 30, o: 1, ease: 'step' }, { t: 15.75, o: 0, ease: 'step' }], PLATY,
        `<ellipse cx="${px}" cy="${py}" rx="18" ry="7" fill="#7a5a3a" ${Ow(1.6)}/><path d="M${px - 18} ${py}l-10-3l-2 6z" fill="#7a5a3a" ${Ow(1.2)}/>` +
          `<path d="M${px + 16} ${py - 3}q12-2 14 3q-2 5-14 3z" fill="#3a3a3a" ${Ow(1.3)}/><circle cx="${px + 10}" cy="${py - 3}" r="1.6" fill="#fff"/><circle cx="${px + 10.4}" cy="${py - 3}" r="0.8" fill="${INK}"/>` +
          `<path d="M${px - 14} ${py + 6}q14 4 28 0" fill="none" stroke="#bfe6f2" stroke-width="2.4"/>`),
      'platy',
      during(13, 15.75),
    )
    const blueTongue =
      `<ellipse cx="170" cy="766" rx="34" ry="12" fill="#a8988a" ${Ow(1.8)}/><path d="M146 760q24-8 48 0" fill="none" stroke="#fff" stroke-opacity="0.3" stroke-width="3"/>` +
      diff(168, 751, 40,
        `<path d="M144 756q-10 2-14 8q8 0 14-4" fill="#b59a72" ${Ow(1.2)}/><ellipse cx="166" cy="752" rx="24" ry="7" fill="#c7aa80" ${Ow(1.5)}/>` +
          `<path d="M150 750h4M160 749h4M170 749h4M180 750h4" stroke="#7a5a3a" stroke-width="2.4"/>` +
          `<ellipse cx="192" cy="751" rx="7" ry="5" fill="#c7aa80" ${Ow(1.3)}/><circle cx="194" cy="749" r="1.2" fill="${INK}"/>` +
          anim({ type: 'blink', duty: 0.25, period: 1.6, phase: 0.2 }, `<path d="M198 752q6-2 8 2q-4 2-8-2z" fill="#3a6ad0" ${Ow(0.8)}/>`),
        '')

    // --- The koala's eucalyptus: the owl in its hollow, a kookaburra (A only), the gumnut cluster (one nut fewer in
    // B: a hard one); in B a frill-necked lizard spreads its frill on the trunk. ---
    const leafClump = (x: number, y: number, r: number) =>
      `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${Math.round(r * 0.7)}" fill="url(#c17-gum)" ${O}/>` +
      `<path d="M${x - r * 0.6} ${y + r * 0.3}q4 ${r * 0.3} 2 ${r * 0.6}M${x - r * 0.1} ${y + r * 0.4}q3 ${r * 0.3} 0 ${r * 0.6}M${x + r * 0.4} ${y + r * 0.3}q4 ${r * 0.3} 2 ${r * 0.5}" fill="none" stroke="#4f7a5a" stroke-width="3" stroke-linecap="round"/>`
    const nut = (x: number, y: number) => `<path d="M${x - 5} ${y - 4}q5 14 10 0z" fill="#8a6a3a" ${Ow(1.3)}/><ellipse cx="${x}" cy="${y - 4}" rx="5" ry="2" fill="#5a4024" ${Ow(1)}/>`
    const kookaburra =
      `<path d="M206 424l12 8l-14-2z" fill="#6f5a42" ${Ow(1.2)}/>` +
      `<ellipse cx="194" cy="412" rx="12" ry="14" fill="#f2ecdc" ${Ow(1.6)}/><path d="M198 402q12 6 8 22q-8-4-10-18z" fill="#6f5a42" ${Ow(1.3)}/>` +
      `<circle cx="188" cy="396" r="9" fill="#f2ecdc" ${Ow(1.5)}/><path d="M184 394q8-2 12 2" stroke="#6f5a42" stroke-width="3"/>` +
      `<path d="M180 398l-14 3l14 3z" fill="#3a3a3a" ${Ow(1.2)}/><circle cx="186" cy="394" r="1.6" fill="${INK}"/>`
    const frill = diff(
      262,
      545,
      37,
      '',
      once(showIn([10.6, 12.4]), [262, 540],
        `<path d="M262 560q3 12 0 20" fill="none" stroke="#a06a3a" stroke-width="5" stroke-linecap="round"/>` +
          `<ellipse cx="262" cy="548" rx="7" ry="14" fill="#c08a52" ${Ow(1.4)}/>` +
          anim({ type: 'keys', period: 1.8, keys: [{ t: 0, sx: 0.3, sy: 0.3 }, { t: 0.4, sx: 1, sy: 1, ease: 'out' }, { t: 1.4, ease: 'in' }, { t: 1.8, sx: 0.3, sy: 0.3 }], pivot: [262, 528] },
            `<path d="M262 528m-22 0a22 18 0 1 1 44 0a22 18 0 1 1-44 0z" fill="#f2b33a" ${Ow(1.4)}/><path d="M246 520l10 6M278 520l-10 6M262 512v10" stroke="#e8662c" stroke-width="2"/>`) +
          `<ellipse cx="262" cy="528" rx="7" ry="8" fill="#c08a52" ${Ow(1.3)}/><circle cx="259" cy="526" r="1.4" fill="${INK}"/><circle cx="265" cy="526" r="1.4" fill="${INK}"/><path d="M258 533q4 3 8 0" fill="#e63946" ${Ow(1)}/>`),
      undefined,
      during(10.6, 12.4),
    )
    const koalaTree =
      groundShadow(250, 804, 120, 12) +
      `<path d="M226 806q14-150 8-330h34q-6 180 10 330z" fill="url(#c17-gumbark)" ${O}/>` +
      `<path d="M238 760q6-30 2-60M256 700q-4-40 4-90M244 620q4-30 0-60" fill="none" stroke="#c9b9a6" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M230 640q8 4 6 14q-8-2-6-14zM262 580q8 6 4 16q-8-4-4-16z" fill="#c9a07a" ${Ow(1)}/>` +
      `<ellipse cx="250" cy="652" rx="12" ry="16" fill="#3a2414" ${Ow(1.6)}/>` +
      anim({ type: 'sway', angle: 6, pivot: [250, 662], period: 3.6 }, keenOwl(250, 662, 0.62, blink(3.2, 0.4))) +
      // Branches: the koala's to the right, the kookaburra's to the left.
      `<path d="M262 474q100-12 210-30" fill="none" stroke="${INK}" stroke-width="15" stroke-linecap="round"/><path d="M262 474q100-12 210-30" fill="none" stroke="#d9cbb8" stroke-width="10" stroke-linecap="round"/>` +
      `<path d="M234 480q-50-30-100-54" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M234 480q-50-30-100-54" fill="none" stroke="#d9cbb8" stroke-width="7" stroke-linecap="round"/>` +
      sway([250, 470], 5.4, 1.2)(leafClump(160, 300, 70) + leafClump(340, 290, 80) + leafClump(250, 220, 90) + leafClump(430, 370, 56) + leafClump(110, 380, 50) + leafClump(250, 340, 64)) +
      // Gumnuts at the branch's end.
      `<path d="M462 448l-2 12M462 448l8 14M462 448l2 26" stroke="#6f5a42" stroke-width="1.6"/>` + nut(458, 466) + nut(472, 468) +
      diff(464, 478, 18, nut(464, 484), '') +
      diff(194, 412, 34, kookaburra, '') +
      frill

    // --- The ghost gum on the right with its cockatoos (one has no crest in B: a hard one), the emu; in B a wombat
    // looks out of its burrow. ---
    const cockatoo = (x: number, y: number, crest: boolean) =>
      `<path d="M${x + 6} ${y + 4}l6 14l-12-6z" fill="#f4f1e8" ${Ow(1.3)}/>` +
      `<ellipse cx="${x}" cy="${y}" rx="10" ry="13" fill="#f4f1e8" ${Ow(1.5)}/><circle cx="${x - 4}" cy="${y - 14}" r="8" fill="#f4f1e8" ${Ow(1.5)}/>` +
      (crest ? `<path d="M${x - 2} ${y - 20}q2-14 10-16q-4 8-2 16M${x - 4} ${y - 21}q-2-12 4-18" fill="#ffd23f" ${Ow(1.2)}/>` : '') +
      `<path d="M${x - 11} ${y - 14}q-6 2-4 8q4-2 6-4z" fill="#3a3a3a" ${Ow(1)}/><circle cx="${x - 6}" cy="${y - 16}" r="1.6" fill="${INK}"/>`
    const ghostGum =
      groundShadow(1290, 792, 90, 10) +
      `<path d="M1276 794q10-140 4-270h22q-4 140 12 270z" fill="url(#c17-ghost)" ${O}/>` +
      `<path d="M1290 560q-40-20-80-20M1296 540q40-30 90-30" fill="none" stroke="${INK}" stroke-width="11" stroke-linecap="round"/><path d="M1290 560q-40-20-80-20M1296 540q40-30 90-30" fill="none" stroke="#f4f1ea" stroke-width="7" stroke-linecap="round"/>` +
      sway([1290, 520], 5, 1.2)(leafClump(1290, 440, 70) + leafClump(1210, 480, 50) + leafClump(1370, 470, 52)) +
      cockatoo(1222, 528, true) + cockatoo(1350, 504, true) +
      `<g>${cockatoo(1262, 506, false)}</g>` + diff(1260, 486, 18, `<path d="M1258 486q2-14 10-16q-4 8-2 16M1256 485q-2-12 4-18" fill="#ffd23f" ${Ow(1.2)}/>`, '')
    const emu =
      groundShadow(1100, 772, 36, 5) +
      `<path d="M1094 770l-4-34M1110 770l4-34" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M1086 770h10M1110 770h10" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
      `<ellipse cx="1104" cy="720" rx="34" ry="24" fill="url(#c17-emu)" ${O}/><path d="M1080 712q24 20 50 0" fill="none" stroke="#5a4a3a" stroke-width="2"/>` +
      anim({ type: 'keys', period: 4, keys: [{ t: 0, rot: 0 }, { t: 1.6, ease: 'inOut' }, { t: 2, rot: -60 }, { t: 2.6, ease: 'inOut' }, { t: 3, rot: 0 }], pivot: [1080, 706] },
        `<path d="M1080 706q-10-20-4-50" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M1080 706q-10-20-4-50" fill="none" stroke="#5a6a8a" stroke-width="6" stroke-linecap="round"/>` +
          `<ellipse cx="1072" cy="654" rx="10" ry="8" fill="#6a5a4a" ${Ow(1.4)}/><path d="M1063 656l-10 2l10 3z" fill="#3a3a3a"/><circle cx="1070" cy="652" r="1.8" fill="#e8662c"/>`)
    const BURROW: [number, number] = [1000, 772]
    const wombat = diff(
      BURROW[0],
      BURROW[1] - 16,
      26,
      '',
      `<g clip-path="url(#c17-burrow)">` +
        keys('wombat', [{ t: 0, y: 30, o: 0, ease: 'step' }, { t: 1.8, o: 1, ease: 'out' }, { t: 2.2, y: 0 }, { t: 3.5, ease: 'in' }, { t: 3.85, y: 30, o: 1, ease: 'step' }, { t: 3.9, o: 0, ease: 'step' }], BURROW,
          `<ellipse cx="1000" cy="760" rx="20" ry="16" fill="#8a7a6a" ${Ow(1.6)}/><circle cx="986" cy="748" r="6" fill="#8a7a6a" ${Ow(1.3)}/><circle cx="1014" cy="748" r="6" fill="#8a7a6a" ${Ow(1.3)}/>` +
            `<ellipse cx="1000" cy="764" rx="9" ry="6" fill="#3a3030"/><circle cx="992" cy="754" r="2" fill="${INK}"/><circle cx="1008" cy="754" r="2" fill="${INK}"/>`) +
        `</g>`,
      'wombat',
      during(1.8, 3.9),
    )
    const burrow = `<path d="M972 776q28-24 56 0z" fill="#3a1c10" ${Ow(1.6)}/><path d="M962 778q38-6 76 0" fill="none" stroke="#a8542a" stroke-width="5" stroke-linecap="round"/>`

    // --- The echidna (A only) waddling along by the tree. ---
    const ECHIDNA: [number, number] = [280, 820]
    const [ex, ey] = ECHIDNA
    let quills = ''
    for (let i = 0; i < 9; i++) quills += `<path d="M${ex - 16 + i * 4} ${ey - 10}l${-2 + i * 0.5} -12" stroke="#2b2b2b" stroke-width="2" stroke-linecap="round"/><path d="M${ex - 15 + i * 4} ${ey - 11}l${-2 + i * 0.5} -8" stroke="#f4e6cc" stroke-width="1"/>`
    const echidna = diff(
      ex + 4,
      ey - 10,
      32,
      keys('echidna', [{ t: 0, x: -50 }, { t: 19.95, x: 50, ease: 'step' }], ECHIDNA,
        `<ellipse cx="${ex}" cy="${ey - 8}" rx="18" ry="10" fill="#5a4a3a" ${Ow(1.6)}/>` + quills +
          `<path d="M${ex + 16} ${ey - 8}l14 2l-14 4z" fill="#3a3030" ${Ow(1.2)}/><circle cx="${ex + 12}" cy="${ey - 10}" r="1.5" fill="${INK}"/>` +
          anim({ type: 'keys', period: 0.6, keys: [{ t: 0, rot: -15 }, { t: 0.3, rot: 15, ease: 'inOut' }], pivot: [ex - 8, ey - 2] }, `<path d="M${ex - 8} ${ey - 2}v4" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`) +
          anim({ type: 'keys', period: 0.6, keys: [{ t: 0, rot: 15 }, { t: 0.3, rot: -15, ease: 'inOut' }], pivot: [ex + 8, ey - 2] }, `<path d="M${ex + 8} ${ey - 2}v4" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`)),
      '',
      'echidna',
    )

    // --- The koala: munching its leaf; the boomerang takes it; cross; drops a nut; smug. ---
    const [qx, qy] = KOALA
    const koalaEyes =
      once(showIn([0, 8.6]), KOALA, `<circle cx="${qx - 8}" cy="${qy - 56}" r="2.6" fill="${INK}"/><circle cx="${qx + 8}" cy="${qy - 56}" r="2.6" fill="${INK}"/>` +
        blink(3.4, 0.5)(`<path d="M${qx - 11} ${qy - 56}h6M${qx + 5} ${qy - 56}h6" stroke="#8a8a92" stroke-width="5"/>`)) +
      once(showIn([8.6, 10.6]), KOALA, `<circle cx="${qx - 8}" cy="${qy - 57}" r="4.6" fill="#fff" ${Ow(1.2)}/><circle cx="${qx + 8}" cy="${qy - 57}" r="4.6" fill="#fff" ${Ow(1.2)}/><circle cx="${qx - 8}" cy="${qy - 57}" r="1.6" fill="${INK}"/><circle cx="${qx + 8}" cy="${qy - 57}" r="1.6" fill="${INK}"/>`) +
      once(showIn([10.6, BONK]), KOALA, `<circle cx="${qx - 8}" cy="${qy - 55}" r="2.6" fill="${INK}"/><circle cx="${qx + 8}" cy="${qy - 55}" r="2.6" fill="${INK}"/><path d="M${qx - 14} ${qy - 64}l10 4M${qx + 14} ${qy - 64}l-10 4" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>` +
        `<circle cx="${qx - 14}" cy="${qy - 44}" r="5" fill="#e88a8a" fill-opacity="0.6"/><circle cx="${qx + 14}" cy="${qy - 44}" r="5" fill="#e88a8a" fill-opacity="0.6"/>`) +
      once(showIn([BONK, LOOP]), KOALA, `<path d="M${qx - 12} ${qy - 56}q4-3 8 0M${qx + 4} ${qy - 56}q4-3 8 0" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>`)
    const koalaMouth =
      once(showIn([0, 8.6]), KOALA, anim({ type: 'keys', period: 0.5, keys: [{ t: 0, sy: 1 }, { t: 0.25, sy: 0.4, ease: 'inOut' }], pivot: [qx, qy - 40] }, `<ellipse cx="${qx}" cy="${qy - 40}" rx="4" ry="3" fill="#5a3030"/>`)) +
      once(showIn([8.6, 10.6]), KOALA, `<ellipse cx="${qx}" cy="${qy - 39}" rx="4" ry="5" fill="#5a3030" ${Ow(1)}/>`) +
      once(showIn([10.6, BONK]), KOALA, `<path d="M${qx - 5} ${qy - 37}q5-4 10 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`) +
      once(showIn([BONK, LOOP]), KOALA, `<path d="M${qx - 6} ${qy - 39}q6 5 12 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`)
    const sprig = `<path d="M${qx - 18} ${qy - 30}l-12-12" stroke="#6f5a42" stroke-width="2"/><path d="M${qx - 30} ${qy - 42}q-12-4-14-16q12 2 14 16zM${qx - 24} ${qy - 36}q-14 0-18-10q12-2 18 10z" fill="url(#c17-gum)" ${Ow(1.2)}/>`
    const koala =
      `<ellipse cx="${qx}" cy="${qy - 18}" rx="22" ry="22" fill="url(#c17-koala)" ${Ow(1.8)}/><ellipse cx="${qx}" cy="${qy - 14}" rx="12" ry="14" fill="#e6e2dc"/>` +
      `<circle cx="${qx - 20}" cy="${qy - 64}" r="12" fill="url(#c17-koala)" ${Ow(1.6)}/><circle cx="${qx + 20}" cy="${qy - 64}" r="12" fill="url(#c17-koala)" ${Ow(1.6)}/><circle cx="${qx - 20}" cy="${qy - 64}" r="6" fill="#f2eee8"/><circle cx="${qx + 20}" cy="${qy - 64}" r="6" fill="#f2eee8"/>` +
      `<circle cx="${qx}" cy="${qy - 50}" r="19" fill="url(#c17-koala)" ${Ow(1.8)}/>` +
      `<ellipse cx="${qx}" cy="${qy - 47}" rx="6" ry="8" fill="#2b2b33"/><circle cx="${qx - 2}" cy="${qy - 50}" r="1.6" fill="#fff" fill-opacity="0.6"/>` +
      koalaEyes + koalaMouth +
      // Arms round the branch; the paw holding the sprig, then the nut.
      `<path d="M${qx + 12} ${qy - 22}q10 12 4 24" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M${qx + 12} ${qy - 22}q10 12 4 24" fill="none" stroke="#9a9aa2" stroke-width="7" stroke-linecap="round"/>` +
      once(showIn([0, 8.6]), KOALA, sprig) +
      once(showIn([11.2, 13.8]), KOALA, nut(qx - 6, qy + 10)) +
      keys(undefined, [{ t: 0, rot: 0 }, { t: 8.5, ease: 'inOut' }, { t: 8.7, rot: 30 }, { t: 10.6, ease: 'inOut' }, { t: 11.1, rot: -40 }, { t: 11.3, rot: 0 }, { t: 13.7, ease: 'in' }, { t: 13.8, rot: 10 }, { t: 14.2, rot: 0, ease: 'step' }], [qx - 12, qy - 26],
        `<path d="M${qx - 12} ${qy - 26}q-8 10-6 22" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M${qx - 12} ${qy - 26}q-8 10-6 22" fill="none" stroke="#9a9aa2" stroke-width="7" stroke-linecap="round"/>`)
    // The sprig knocked out of its paw, drifting down to the ground.
    const SPRIG: [number, number] = [qx - 30, qy - 42]
    const fallingSprig = once(
      [{ t: 0, x: 0, y: 0, rot: 0, o: 0, ease: 'step' }, { t: 8.6, o: 1, ease: 'out' }, { t: 9.1, x: -40, y: 60, rot: 120, ease: 'inOut' }, { t: 9.7, x: 10, y: 180, rot: -40, ease: 'inOut' }, { t: 10.5, x: -20, y: 340, rot: 60, o: 1, ease: 'step' }],
      SPRIG,
      `<path d="M${SPRIG[0]} ${SPRIG[1]}q-12-4-14-16q12 2 14 16zM${SPRIG[0] + 6} ${SPRIG[1] + 6}q-14 0-18-10q12-2 18 10z" fill="url(#c17-gum)" ${Ow(1.2)}/>`,
    )

    // --- The kangaroo and the joey in its pouch. ---
    const [kx, ky] = KANGA
    const [jx, jy] = [kx - 36, ky - 104]
    const jarm: Keyframe[] = [
      { t: 0, rot: 0 },
      // The ball, the sock: tossed out.
      { t: 4.4, ease: 'inOut' }, { t: 4.5, rot: 40 }, { t: 4.6, rot: -60, ease: 'inOut' }, { t: 4.9, rot: 0, ease: 'inOut' },
      { t: 5.2, rot: 40 }, { t: 5.35, rot: -60, ease: 'inOut' }, { t: 5.7, rot: 0, ease: 'inOut' },
      // The boomerang: pulled out, wound up, thrown; caught; dropped.
      { t: 6.4, rot: -20, ease: 'inOut' }, { t: 6.85, rot: 40, ease: 'in' }, { t: 7, rot: -70, ease: 'out' }, { t: 7.4, rot: 0, ease: 'inOut' },
      { t: 9.9, rot: -40, ease: 'inOut' }, { t: 10.1, rot: -20, ease: 'inOut' }, { t: 10.35, rot: 30, ease: 'inOut' }, { t: 10.6, rot: 0 },
      // The nut: caught and tucked away.
      { t: 14.9, ease: 'inOut' }, { t: 15.1, rot: -50, ease: 'inOut' }, { t: 15.6, ease: 'inOut' }, { t: 15.8, rot: 30, ease: 'inOut' }, { t: 16.1, rot: 0, ease: 'step' },
    ]
    const joeyArm = keys(undefined, jarm, [jx - 8, jy + 10],
      `<path d="M${jx - 8} ${jy + 10}l-8-8" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M${jx - 8} ${jy + 10}l-8-8" stroke="#c98a5a" stroke-width="4.4" stroke-linecap="round"/>` +
        once(showIn([15.1, 15.75]), KANGA, nut(jx - 18, jy + 2)))
    const joey =
      `<ellipse cx="${jx}" cy="${jy}" rx="11" ry="10" fill="url(#c17-roo)" ${Ow(1.6)}/>` +
      `<path d="M${jx - 4} ${jy - 8}l-4-14l8 8zM${jx + 4} ${jy - 8}l4-14l-8 8z" fill="#c98a5a" ${Ow(1.3)}/>` +
      `<ellipse cx="${jx - 9}" cy="${jy + 3}" rx="6" ry="4" fill="#e8c8a0" ${Ow(1.1)}/><circle cx="${jx - 13}" cy="${jy + 2}" r="1.8" fill="${INK}"/>` +
      once(showIn([0, 15.8]), KANGA, `<circle cx="${jx - 4}" cy="${jy - 2}" r="2.2" fill="${INK}"/><circle cx="${jx - 3.4}" cy="${jy - 2.6}" r="0.8" fill="#fff"/>`) +
      once(showIn([15.8, LOOP]), KANGA, `<path d="M${jx - 7} ${jy - 2}q3-3 6 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/><path d="M${jx - 12} ${jy + 7}q4 3 7 0" fill="none" stroke="${INK}" stroke-width="1.4"/>`) +
      joeyArm
    const kEyes =
      once(showIn([0, BONK]), KANGA, `<ellipse cx="${kx - 48}" cy="${ky - 183}" rx="3.4" ry="4" fill="${INK}"/><circle cx="${kx - 47}" cy="${ky - 184.5}" r="1.2" fill="#fff"/>` +
        blink(3.8, 0.1)(`<path d="M${kx - 53} ${ky - 183}h10" stroke="#c98a5a" stroke-width="8"/><path d="M${kx - 53} ${ky - 181}q5 3 10 0" fill="none" stroke="${INK}" stroke-width="1.4"/>`)) +
      once(showIn([BONK, LOOP]), KANGA, `<path d="M${kx - 48} ${ky - 183}m-1 0a1 1 0 1 1 2 0a2.6 2.6 0 1 1-5.2 0a4 4 0 1 1 8 0" fill="none" stroke="${INK}" stroke-width="1.5"/>`)
    const dazed = once(showIn([BONK + 0.05, LOOP]), KANGA,
      anim({ type: 'rotate', pivot: [kx - 40, ky - 230], period: 1.2 },
        [0, 120, 240].map((a) => `<path transform="rotate(${a} ${kx - 40} ${ky - 230})" d="M${kx - 40} ${ky - 250}l2 4l4 1l-3 3l1 4l-4-2l-4 2l1-4l-3-3l4-1z" fill="#ffd23f" ${Ow(1)}/>`).join('')))
    const kangaroo = keys('kanga', kangaKeys(), KANGA,
      groundShadow(kx + 14, ky, 84, 8) +
        // The tail: thick at the hips, tapering along the ground.
        `<path d="M${kx + 16} ${ky - 56}q50 10 112 50q4 5-4 6q-62-8-112-22z" fill="url(#c17-roo)" ${Ow(2)}/>` +
        // The far foot, the thigh, the near foot: long and flat.
        `<path d="M${kx - 14} ${ky - 2}q-34 2-38-4q4-8 32-8h20z" fill="#9a5e34" ${Ow(1.6)}/>` +
        `<ellipse cx="${kx + 8}" cy="${ky - 42}" rx="32" ry="40" transform="rotate(-28 ${kx + 8} ${ky - 42})" fill="url(#c17-roo)" ${Ow(2)}/>` +
        `<path d="M${kx - 26} ${ky - 30}q16 10 26 2" fill="none" stroke="#9a5e34" stroke-width="2" stroke-linecap="round"/>` +
        `<path d="M${kx + 18} ${ky - 14}q-42-2-66 8q-4 6 4 6h66q8-6-4-14z" fill="url(#c17-roo)" ${Ow(1.8)}/><path d="M${kx - 44} ${ky - 2}h6M${kx - 40} ${ky - 6}h5" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>` +
        // The torso, leaning forward; its pale belly.
        `<path d="M${kx + 16} ${ky - 64}q2-66-30-100q-20-18-38-4q-14 32-12 72q2 40 18 56q36 6 62-24z" fill="url(#c17-roo)" ${Ow(2)}/>` +
        `<path d="M${kx - 46} ${ky - 140}q-12 32-6 72q10 16 28 14q-4-52-22-86z" fill="#ecd0a8"/>` +
        joey +
        // The pouch's rim over the joey.
        `<path d="M${kx - 54} ${ky - 98}q20 12 40 0q2 22-20 26q-20-4-20-26z" fill="#e0bc92" ${Ow(1.8)}/>` +
        // The near arm, its paw by the chest.
        `<path d="M${kx - 44} ${ky - 146}q-16 12-14 32" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${kx - 44} ${ky - 146}q-16 12-14 32" fill="none" stroke="#b07a4a" stroke-width="6" stroke-linecap="round"/>` +
        // The head on its neck: long ears, a long muzzle pointing left.
        `<path d="M${kx - 30} ${ky - 190}q-8-30 4-34q8 16-2 34zM${kx - 18} ${ky - 186}q2-30 14-32q2 18-10 32z" fill="url(#c17-roo)" ${Ow(1.6)}/>` +
        `<path d="M${kx - 28} ${ky - 194}q-3-16 2-24M${kx - 14} ${ky - 192}q2-14 8-20" fill="none" stroke="#e8a8a0" stroke-width="3.4" stroke-linecap="round"/>` +
        `<path d="M${kx - 18} ${ky - 172}q-4-24-30-24q-26 2-42 20q-4 8 4 10q22 6 44 4q24-2 24-10z" fill="url(#c17-roo)" ${Ow(1.8)}/>` +
        `<path d="M${kx - 84} ${ky - 168}q10 8 30 6" fill="none" stroke="#ecd0a8" stroke-width="5" stroke-linecap="round"/>` +
        `<ellipse cx="${kx - 87}" cy="${ky - 175}" rx="4.4" ry="3.6" fill="${INK}"/>` +
        `<path d="M${kx - 82} ${ky - 165}q5 3 10 0" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>` +
        kEyes + dazed)

    // --- The ball (red in A, blue in B), the sock, the boomerang (painted dots in A only), the nut that falls. ---
    const ballMarkup = (c: string) =>
      `<circle cx="${BALL[0]}" cy="${BALL[1]}" r="11" fill="${c}" ${Ow(1.6)}/><path d="M${BALL[0] - 11} ${BALL[1]}h22M${BALL[0]} ${BALL[1] - 11}q6 11 0 22" fill="none" stroke="#fff" stroke-width="2.4"/>`
    const ballKeys: Keyframe[] = [
      { t: 0, x: 122, y: -144, rot: 0, o: 0, ease: 'step' },
      { t: 4.55, o: 1, ease: 'out' },
      { t: 4.85, x: 70, y: -230, rot: -200, ease: 'in' },
      { t: 5.15, x: 30, y: 0, rot: -400, ease: 'out' },
      { t: 5.3, x: 18, y: -30, ease: 'in' },
      { t: 5.45, x: 6, y: 0, ease: 'out' },
      { t: 5.7, x: 0, rot: -560, o: 1, ease: 'step' },
    ]
    const ball = diff(BALL[0], BALL[1], 20, keys('ball', ballKeys, BALL, ballMarkup('#e63946')), keys('ball', ballKeys, BALL, ballMarkup('#3a76d0')), 'ball')
    const sock = once(
      [{ t: 0, x: 10, y: -152, rot: 0, o: 0, ease: 'step' }, { t: 5.35, o: 1, ease: 'out' }, { t: 5.6, x: 30, y: -210, rot: 140, ease: 'in' }, { t: 6.1, x: 0, y: 0, rot: 200, o: 1, ease: 'step' }],
      SOCK,
      `<path d="M${SOCK[0] - 6} ${SOCK[1] - 14}h12v14q0 6-6 6h-14q-4-6 2-8h6z" fill="#f4f1e8" ${Ow(1.4)}/><path d="M${SOCK[0] - 6} ${SOCK[1] - 10}h12M${SOCK[0] - 6} ${SOCK[1] - 6}h12" stroke="#4dabf7" stroke-width="2.4"/>`,
    )
    const [bx, by] = BOOM
    const boomKeys: Keyframe[] = [
      { t: 0, x: -3, y: -130, rot: -30, o: 0, ease: 'step' },
      { t: 6.4, o: 1, ease: 'out' },
      { t: 6.85, x: -3, y: -130, rot: -30, ease: 'in' },
      ...BOOM_PATH.map(([t, x, y, rot]) => ({ t, x, y, rot, ease: 'linear' as const })),
      { t: 10.3, ease: 'in' },
      { t: 10.6, x: 0, y: 0, rot: -2520, o: 1, ease: 'step' },
    ]
    const boomerang = keys('boomerang', boomKeys, BOOM,
      `<g transform="translate(${bx} ${by}) scale(1.5) translate(${-bx} ${-by})">` +
      `<path d="M${bx - 26} ${by + 6}q14-22 26-10q12-12 26 10q-8 4-12 0q-6-10-14-2q-8-8-14 2q-4 4-12 0z" fill="url(#c17-boom)" ${Ow(1.6)}/>` +
        diff(bx, by, 30, `<circle cx="${bx - 18}" cy="${by - 1}" r="1.8" fill="#fff4d0"/><circle cx="${bx - 12}" cy="${by - 6}" r="1.8" fill="#fff4d0"/><circle cx="${bx + 12}" cy="${by - 6}" r="1.8" fill="#fff4d0"/><circle cx="${bx + 18}" cy="${by - 1}" r="1.8" fill="#fff4d0"/><path d="M${bx - 6} ${by - 8}h12" stroke="#fff4d0" stroke-width="1.8" stroke-dasharray="2 2"/>`, '', 'boomerang') + `</g>`)
    const fallingNut = once(
      [{ t: 0, x: 0, y: 0, rot: 0, o: 0, ease: 'step' }, { t: 13.8, o: 1, ease: 'in' }, { t: BONK, x: 18, y: 146, ease: 'out' }, { t: 14.6, x: 50, y: 70, rot: 200, ease: 'in' }, { t: 15.1, x: 8, y: 240, rot: 360, o: 1, ease: 'step' }, { t: 15.12, o: 0, ease: 'step' }],
      NUT,
      nut(NUT[0], NUT[1] + 6),
    )
    const BANG: [number, number] = [352, 596]
    const bang = once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t: BONK, o: 1, ease: 'out' }, { t: BONK + 0.12, sx: 1.15, sy: 1.15, ease: 'inOut' }, { t: BONK + 0.3, sx: 1, sy: 1, o: 1, ease: 'step' }, { t: BONK + 0.34, o: 0, ease: 'step' }], BANG,
      `<path d="M${BANG[0]} ${BANG[1] - 30}l7 16l17-6l-9 15l16 8l-18 3l4 18l-14-11l-11 14l-2-18l-18 1l13-12l-12-13l18 2z" fill="#ffe066" ${Ow(1.8)}/>` +
        `<path d="M${BANG[0]} ${BANG[1] - 16}l4 9l10-3l-5 8l9 4l-10 2l2 10l-8-6l-6 8l-1-10l-10 1l7-7l-7-7l10 1z" fill="#fff" fill-opacity="0.8"/>`)
    // The leaf hit: a burst of torn leaves at the koala's paw.
    const leafBurst = [[-30, -20], [-10, -40], [20, -26], [-40, 10]]
      .map(([ox, oy], i) => once([{ t: 0, x: 0, y: 0, rot: 0, o: 0, ease: 'step' }, { t: 8.6, o: 1, ease: 'out' }, { t: 9.2, x: ox, y: oy + 30, rot: 200 + i * 40, o: 1, ease: 'step' }, { t: 9.25, o: 0, ease: 'step' }], [qx - 30, qy - 42],
        `<path d="M${qx - 30} ${qy - 42}q-6-2-7-8q6 1 7 8z" fill="url(#c17-gum)" ${Ow(1)}/>`))
      .join('')

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c17-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fa8e8"/><stop offset="0.6" stop-color="#a6d8f2"/><stop offset="1" stop-color="#f6e2c0"/></linearGradient>` +
      `<radialGradient id="c17-glow"><stop offset="0" stop-color="#fff2c0" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffe0a0" stop-opacity="0.4"/><stop offset="1" stop-color="#ffe0a0" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c17-rock" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8743a"/><stop offset="1" stop-color="#b0441e"/></linearGradient>` +
      `<linearGradient id="c17-plain" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0a070"/><stop offset="1" stop-color="#d4885a"/></linearGradient>` +
      `<linearGradient id="c17-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9794a"/><stop offset="1" stop-color="#b85a32"/></linearGradient>` +
      `<radialGradient id="c17-spinifex" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#e8d68a"/><stop offset="1" stop-color="#a89a4a"/></radialGradient>` +
      `<linearGradient id="c17-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fc8d8"/><stop offset="1" stop-color="#3f8fa8"/></linearGradient>` +
      `<radialGradient id="c17-gum" cx="0.64" cy="0.28" r="0.85"><stop offset="0" stop-color="#c2dcb8"/><stop offset="0.55" stop-color="#7fa88a"/><stop offset="1" stop-color="#4f7a5a"/></radialGradient>` +
      `<linearGradient id="c17-gumbark" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b9a68e"/><stop offset="0.6" stop-color="#e6dccb"/><stop offset="1" stop-color="#f4eee2"/></linearGradient>` +
      `<linearGradient id="c17-ghost" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d6d2ca"/><stop offset="0.6" stop-color="#f8f6f2"/><stop offset="1" stop-color="#ffffff"/></linearGradient>` +
      `<radialGradient id="c17-emu" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#8a7a6a"/><stop offset="1" stop-color="#4a3a2e"/></radialGradient>` +
      `<radialGradient id="c17-koala" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#c8c8d0"/><stop offset="1" stop-color="#8a8a96"/></radialGradient>` +
      `<radialGradient id="c17-roo" cx="0.62" cy="0.3" r="0.85"><stop offset="0" stop-color="#e8a870"/><stop offset="0.55" stop-color="#c98a5a"/><stop offset="1" stop-color="#9a5e34"/></radialGradient>` +
      `<linearGradient id="c17-boom" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c88a4a"/><stop offset="1" stop-color="#8a5a2a"/></linearGradient>` +
      `<radialGradient id="c17-sunlight" cx="0.8" cy="0.15" r="1"><stop offset="0" stop-color="#fff0c0" stop-opacity="0.3"/><stop offset="0.5" stop-color="#fff0c0" stop-opacity="0.06"/><stop offset="1" stop-color="#fff0c0" stop-opacity="0"/></radialGradient>` +
      `<clipPath id="c17-burrow"><rect x="960" y="700" width="80" height="74"/></clipPath></defs>` +
      sky +
      rock +
      plain +
      far +
      windmill +
      pebbles +
      scrub +
      creek +
      platypus +
      burrow +
      wombat +
      emu +
      ghostGum +
      sock +
      ball +
      desertPea +
      blueTongue +
      koalaTree +
      koala +
      fallingSprig +
      leafBurst +
      echidna +
      kangaroo +
      boomerang +
      fallingNut +
      bang +
      `<rect width="${W}" height="${H}" fill="url(#c17-sunlight)"/>`
    )
  },
})
