// Cartoon "The hedgehog's apple" (docs/cartoon-mode.md), the third one, made like 812: a 20 s autumn story told by a
// camera. A hedgehog trundles up to a fallen apple, curls up and rolls over it — and gets up with the apple stuck on its
// spines. Proudly carrying it under a branch, it is bonked by the squirrel's acorn: it curls up in fright, the apple
// pops off, and it rolls downhill into a heap of leaves. Out it comes all covered in leaves — while the squirrel
// crunches its apple. Ten differences: two hard (a missing bench slat, a spot fewer on the toadstool), three events.
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { apple, appleTree, farBird, grassTuft, groundShadow, INK, keenOwl, NATURE_DEFS, O, Ow, pineTree, puffCloud, roundTree, squirrel, swingKeys } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 60, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // The hedgehog trundles to the apple.
  { t: 3, x: 120, y: 560, w: 420, ease: 'linear' },
  { t: 3.2, x: 120, y: 560, w: 420, ease: 'inOut' },
  { t: 6.3, x: 270, y: 575, w: 400, ease: 'step' },
  // It rolls over the apple.
  { t: 6.35, x: 380, y: 640, w: 240, ease: 'step' },
  // Proud, with the apple on its back.
  { t: 8, x: 400, y: 560, w: 400 },
  { t: 11, x: 560, y: 560, w: 400, ease: 'step' },
  // The squirrel on its branch, an acorn in its paws.
  { t: 11.05, x: 600, y: 380, w: 300, ease: 'step' },
  // Bonk, roll, into the leaves.
  { t: 12.5, x: 590, y: 500, w: 460, ease: 'step' },
  // Out of the heap, covered in leaves.
  { t: 13.95, x: 760, y: 610, w: 300, ease: 'step' },
  // The squirrel has the apple.
  { t: 16.4, x: 430, y: 470, w: 620 },
  { t: 19.95, x: 440, y: 476, w: 600, ease: 'step' },
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

/** The hedgehog starts at the left, by the bench. */
const HOG: [number, number] = [180, 780]
const HOG_WALKS: [number, number][] = [[3.2, 6.3], [8, 11.8]]
const hogKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, rot: 0, sx: 1, sy: 1 },
  { t: 3.2, ease: 'inOut' },
  { t: 6.3, x: 260, y: -10, ease: 'out' },
  // Sniffs, curls up, rolls over the apple.
  { t: 6.6, sy: 0.9, ease: 'inOut' },
  { t: 6.7, sy: 1, ease: 'inOut' },
  { t: 7.35, x: 308, y: -12, rot: 360, ease: 'out' },
  // Proudly on, under the squirrel's branch.
  { t: 8, ease: 'inOut' },
  { t: 11.8, x: 550, y: -20, ease: 'out' },
  // Bonk: squashed, curled up in fright, rolling down into the leaves.
  { t: 12.88, ease: 'out' },
  { t: 12.95, sy: 0.78, ease: 'out' },
  { t: 13.05, sy: 1, ease: 'in' },
  { t: 13.42, x: 680, y: -32, rot: 720 },
  // Out of the heap.
  { t: 14.2, ease: 'out' },
  { t: 14.5, x: 768, y: -28, rot: 720 },
  // A look round, then a shake.
  { t: 15.2, sx: 1, ease: 'inOut' },
  { t: 15.4, sx: -1, ease: 'inOut' },
  { t: 16.2, sx: -1, ease: 'inOut' },
  { t: 16.4, sx: 1, ease: 'inOut' },
  ...[16.8, 16.95, 17.1, 17.25, 17.4].map((t, i) => ({ t, rot: 720 + (i % 2 ? -8 : 8), ease: 'inOut' as const })),
  { t: 17.55, rot: 720 },
  { t: 19.95, ease: 'step' },
]

/** The squirrel sits on the apple tree's long branch, then jumps down to the apple. */
const SQUIRREL: [number, number] = [730, 465]
const squirrelKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, sy: 1 },
  { t: 12.3, ease: 'out' },
  // Drops the acorn (a little lean).
  { t: 12.5, y: 4, sy: 0.9, ease: 'inOut' },
  { t: 12.7, y: 0, sy: 1 },
  { t: 14.6, ease: 'out' },
  { t: 14.8, sy: 0.85, ease: 'out' },
  { t: 15.1, x: -60, y: -40, sy: 1.08, ease: 'in' },
  { t: 15.5, x: -128, y: 287, sy: 0.9, ease: 'out' },
  { t: 15.7, sy: 1 },
  { t: 19.95, ease: 'step' },
]

/** The acorn falls on the hedgehog's head, bounces off. */
const BONK: [number, number] = [756, 742]
const acornKeys: Keyframe[] = [
  { t: 0, x: -18, y: -272, rot: 0, o: 0, ease: 'step' },
  { t: 12.6, o: 1, ease: 'in' },
  { t: 12.9, x: 0, y: 0, ease: 'out' },
  { t: 13.1, x: 30, y: -40, rot: 200, ease: 'in' },
  { t: 13.35, x: 50, y: 14, rot: 300 },
  { t: 13.4, o: 0 },
]

/** The apple pops off the hedgehog's back and rolls back to the apple tree, where the squirrel gets it. */
const APPLE_STOP: [number, number] = [572, 760]
const appleKeys: Keyframe[] = [
  { t: 0, x: 152, y: -42, rot: 0, o: 0, ease: 'step' },
  { t: 12.95, o: 1, ease: 'out' },
  { t: 13.2, x: 124, y: -96, rot: -120, ease: 'in' },
  { t: 13.45, x: 96, y: -6, rot: -240, ease: 'out' },
  { t: 14.2, x: 0, y: 0, rot: -560 },
  { t: 16.05, ease: 'step' },
  { t: 16.1, o: 0 },
]

/** The heap of leaves the hedgehog rolls into. */
const HEAP: [number, number] = [860, 742]

export default svgLevel({
  id: 803,
  chapter: 'cartoon',
  title: 'cartoonHedgehog',
  parTimeSec: 100,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const beat = (pivot: [number, number], every: number, phase = 0) => (m: string) =>
      anim({ type: 'keys', period: every, phase, keys: [{ t: 0, sy: 1 }, { t: every / 2, sy: 0.3, ease: 'inOut' }], pivot }, m)
    const crown = (period: number, angle = 2, id?: string, extra = '') => (pivot: [number, number], m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 11) / 11, ...(id && { id }) }, m + extra)
    const LEAF_COLORS = ['#e8742c', '#d9442e', '#f2b33a', '#c9562a', '#e6c03a', '#a8431f']
    /** An autumn leaf at (x, y), turned by `rot`. */
    const leaf = (x: number, y: number, rot: number, c: string, s = 1) =>
      `<path transform="rotate(${rot} ${x} ${y})" d="M${x - 8 * s} ${y}q${8 * s}-${9 * s} ${16 * s} 0q-${8 * s} ${9 * s}-${16 * s} 0z" fill="${c}" ${Ow(1)}/>`

    // Leaves drifting down from the trees all the time, the same in both pictures.
    let falling = ''
    for (let i = 0; i < 26; i++) {
      const fx = Math.round(380 + rand() * 1000)
      const fy = Math.round(380 + rand() * 120)
      const c = LEAF_COLORS[i % LEAF_COLORS.length]
      falling += anim(
        { type: 'path', points: [[0, 0], [60 + rand() * 60, 360 + rand() * 60]], period: 7 + rand() * 5, phase: rand() },
        anim({ type: 'rotate', pivot: [fx, fy], period: 1.6 + rand() * 1.4, reverse: i % 2 === 0 }, leaf(fx, fy, 0, c, 0.8)),
      )
    }
    // Fallen leaves on the grass.
    let fallen = ''
    for (let i = 0; i < 60; i++) {
      const lx = Math.round(rand() * W)
      const ly = Math.round(700 + rand() * 190)
      fallen += leaf(lx, ly, Math.round(rand() * 360), LEAF_COLORS[i % LEAF_COLORS.length], 0.8)
    }
    let tufts = ''
    for (let i = 0; i < 26; i++) {
      const tx = Math.round(rand() * W)
      const ty = Math.round(710 + rand() * 180)
      tufts += anim({ type: 'sway', angle: 7, pivot: [tx, ty], period: 2.3, phase: (tx % 13) / 13 }, grassTuft(tx, ty))
    }

    // The bench (one slat of its back missing in B: a hard one), the lamp (a flower basket on it in A),
    // the litter bin (green in A, blue in B).
    let slats = ''
    for (let i = 0; i < 6; i++) {
      const x = 212 + i * 26
      const slat = `<rect x="${x}" y="638" width="12" height="38" rx="2" fill="url(#c5-wood)" ${Ow(1.6)}/>`
      slats += i === 3 ? diff(x + 6, 657, 22, slat, '') : slat
    }
    const bench =
      groundShadow(285, 716, 100, 9) +
      `<path d="M206 676h158M206 640h158" stroke="${INK}" stroke-width="5"/><path d="M206 676h158M206 640h158" stroke="#5e3b1a" stroke-width="2.4"/>` +
      slats +
      `<rect x="200" y="680" width="170" height="12" rx="3" fill="url(#c5-wood)" ${Ow(1.8)}/>` +
      `<path d="M214 692v24M356 692v24" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M214 692v24M356 692v24" stroke="#3b3f46" stroke-width="3" stroke-linecap="round"/>`
    const lamp =
      groundShadow(120, 716, 26, 5) +
      `<path d="M120 716V520" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M120 716V520" stroke="#3b3f46" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M104 520h32l-6-26h-20z" fill="#f6e3a8" ${Ow(2)}/><path d="M100 494h40l-20-14z" fill="#3b3f46" ${Ow(1.8)}/>` +
      diff(
        132,
        568,
        24,
        `<path d="M120 560h26" stroke="#3b3f46" stroke-width="3"/><path d="M128 562q8 18 16 0z" fill="#a8743f" ${Ow(1.4)}/>` +
          `<circle cx="131" cy="560" r="5" fill="#ff6b8b" ${Ow(1)}/><circle cx="140" cy="558" r="5" fill="#ffd23f" ${Ow(1)}/><circle cx="136" cy="553" r="4" fill="#b38cff" ${Ow(1)}/>` +
          `<path d="M128 566q-4 8 0 12M146 566q4 8 0 12" fill="none" stroke="#3f8f3a" stroke-width="2"/>`,
        '',
      )
    const bin = (color: string) =>
      `<path d="M394 670h32l-4 46h-24z" fill="${color}" ${Ow(1.8)}/><path d="M390 668h40" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M402 680v28M410 680v28M418 680v28" stroke="#000" stroke-opacity="0.18" stroke-width="2"/>`
    const binMarkup = groundShadow(410, 717, 22, 4) + diff(410, 692, 32, bin('#3f8f4a'), bin('#3a76d0'))

    // Trees: a fir at the left, the apple tree with its long branch (the squirrel's), a maple with a kite in it
    // (A only) and the hedgehog's den under its roots, a yellow tree, a fir at the right.
    const kite = diff(
      1046,
      496,
      34,
      `<path d="M1046 468l14 18l-14 22l-14-22z" fill="#36a3d9" ${Ow(1.6)}/><path d="M1046 468v40M1032 486h28" stroke="#fff" stroke-width="1.4"/>` +
        `<path d="M1046 508q-6 8 2 12q8 4 2 10" fill="none" stroke="#e63946" stroke-width="2"/>`,
      '',
      'maple',
    )
    const trees =
      pineTree(50, 720, 1.1, crown(4.4, 1.5)) +
      appleTree(540, 742, 1, crown(5.2)) +
      `<path d="M560 600q80-40 196-122" fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="round"/><path d="M560 600q80-40 196-122" fill="none" stroke="#8f5d2e" stroke-width="8" stroke-linecap="round"/>` +
      roundTree(1000, 724, 1.3, 'url(#c5-maple)', crown(4.8, 2, 'maple', kite)) +
      `<path d="M972 724q28-30 56 0z" fill="#2e1a0c" ${O}/>` +
      roundTree(1240, 726, 1.1, 'url(#c5-yellow)', crown(4.2)) +
      pineTree(1400, 740, 1, crown(4, 1.5))

    // The puddle (a paper boat on it in A), the toadstools (three in A, two in B; one has a spot fewer in B).
    const puddle =
      `<ellipse cx="700" cy="790" rx="60" ry="14" fill="url(#c5-puddle)" ${Ow(1.6)}/><path d="M664 788q20-4 40 0" fill="none" stroke="#fff" stroke-opacity="0.6" stroke-width="2"/>` +
      diff(700, 780, 22, anim({ type: 'keys', period: 3, keys: [{ t: 0, y: 0, rot: 0 }, { t: 1.5, y: 1.5, rot: 4, ease: 'inOut' }], pivot: [700, 786], id: 'boat' },
        `<path d="M686 784h28l-6 6h-16z" fill="#f4f4f6" ${Ow(1.4)}/><path d="M700 784v-16l10 16z" fill="#fff" ${Ow(1.2)}/>`), '', 'boat')
    const toadstool = (x: number, y: number, s: number, spots: [number, number][]) =>
      `<path d="M${x - 5 * s} ${y}q-2-${16 * s} ${5 * s}-${18 * s}q${7 * s} 2 ${5 * s} ${18 * s}z" fill="#f6efe2" ${Ow(1.4)}/>` +
      `<path d="M${x - 18 * s} ${y - 16 * s}q${18 * s}-${24 * s} ${36 * s} 0z" fill="url(#c5-cap)" ${Ow(1.6)}/>` +
      spots.map(([dx, dy]) => `<circle cx="${x + dx * s}" cy="${y - 16 * s + dy * s}" r="${2.4 * s}" fill="#fff"/>`).join('')
    const toadstools =
      groundShadow(1196, 778, 22, 4) +
      toadstool(1196, 778, 1.1, [[-10, -4], [-2, -10], [9, -5]]) +
      // A hard one: its biggest spot is missing in B.
      diff(1199, 758, 18, `<circle cx="1199" cy="758" r="4.4" fill="#fff"/>`, '') +
      toadstool(1218, 784, 0.8, [[-5, -4], [5, -5]]) +
      diff(1242, 774, 20, toadstool(1242, 788, 0.9, [[-6, -4], [4, -6]]), '')

    // The heap of leaves.
    let heap = `<ellipse cx="${HEAP[0]}" cy="${HEAP[1]}" rx="70" ry="22" fill="#c9562a" ${O}/>`
    for (let i = 0; i < 34; i++) {
      const a = rand() * Math.PI
      const lx = Math.round(HEAP[0] + Math.cos(a) * (rand() * 62))
      const ly = Math.round(HEAP[1] - Math.sin(a) * (rand() * 22))
      heap += leaf(lx, ly, Math.round(rand() * 360), LEAF_COLORS[i % LEAF_COLORS.length], 0.9)
    }
    // Leaves bursting out of the heap as the hedgehog rolls in.
    let burst = ''
    for (let i = 0; i < 14; i++) {
      const dxu = Math.round((rand() - 0.5) * 140)
      const up = Math.round(60 + rand() * 80)
      burst += once(
        [{ t: 0, x: 0, y: 0, rot: 0, o: 0, ease: 'step' }, { t: 13.42, o: 1, ease: 'out' }, { t: 13.9, x: dxu, y: -up, rot: 180, ease: 'in' }, { t: 15, x: dxu * 1.4, y: 18, rot: 400 }, { t: 15.3, o: 0 }],
        [HEAP[0], HEAP[1] - 10],
        leaf(HEAP[0], HEAP[1] - 10, 0, LEAF_COLORS[i % LEAF_COLORS.length], 1),
      )
    }

    // The hedgehog: walking (legs swing), curled up in a ball, with the apple on its back, covered in leaves.
    const [hx, hy] = HOG
    const spines = (cx: number, cy: number, r0: number, r1: number, from: number, to: number, n: number) => {
      let d = ''
      for (let i = 0; i <= n; i++) {
        const a = ((from + ((to - from) * i) / n) * Math.PI) / 180
        const r = i % 2 ? r1 : r0
        d += `${i ? 'L' : 'M'}${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`
      }
      return d
    }
    const hogLeg = (x: number, k: Keyframe[]) => keys(undefined, k, [x, hy - 8], `<rect x="${x - 3}" y="${hy - 9}" width="7" height="10" rx="3" fill="#6b4a2f" ${Ow(1.4)}/>`)
    const walkPose =
      hogLeg(hx - 12, swingKeys(HOG_WALKS, 0.18, 28)) +
      hogLeg(hx + 10, swingKeys(HOG_WALKS, 0.18, 28, true)) +
      `<path d="${spines(hx - 6, hy - 14, 24, 34, 180, 360, 22)}z" fill="url(#c5-spines)" ${Ow(1.6)}/>` +
      `<ellipse cx="${hx - 2}" cy="${hy - 12}" rx="28" ry="12" fill="#a8774c" ${Ow(1.6)}/>` +
      `<path d="M${hx + 14} ${hy - 22}q18 0 24 10q-10 8-24 4z" fill="#e9c9a0" ${Ow(1.6)}/>` +
      `<circle cx="${hx + 38}" cy="${hy - 12}" r="3.6" fill="${INK}"/><circle cx="${hx + 24}" cy="${hy - 18}" r="2.4" fill="${INK}"/><circle cx="${hx + 25}" cy="${hy - 19}" r="0.8" fill="#fff"/>` +
      `<path d="M${hx + 16} ${hy - 24}q2-6 7-3" fill="#e9c9a0" ${Ow(1.2)}/>`
    const ballPose =
      `<path d="${spines(hx, hy - 20, 20, 30, 0, 360, 30)}z" fill="url(#c5-spines)" ${Ow(1.6)}/>` +
      `<circle cx="${hx}" cy="${hy - 20}" r="16" fill="#8a5a3a"/><path d="M${hx + 6} ${hy - 30}l6 6" stroke="#5e3b22" stroke-width="2"/>`
    const onBack =
      apple(hx - 6, hy - 42, 10) +
      // In B a worm peeks out of the apple.
      diff(
        hx + 2,
        hy - 52,
        20,
        '',
        once(showIn([7.6, 9.6]), HOG, anim({ type: 'keys', period: 0.8, keys: [{ t: 0, rot: -12 }, { t: 0.4, rot: 12, ease: 'inOut' }], pivot: [hx, hy - 46] },
          `<path d="M${hx} ${hy - 46}q4-12 10-8" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M${hx} ${hy - 46}q4-12 10-8" fill="none" stroke="#f5a3b8" stroke-width="3.6" stroke-linecap="round"/><circle cx="${hx + 9}" cy="${hy - 55}" r="1.2" fill="${INK}"/>`)),
        'hog',
        during(7.6, 9.6),
      )
    const leafy = [[-22, -30], [-10, -38], [2, -40], [12, -34], [-18, -20], [6, -26], [-4, -30]]
      .map(([dx, dy], i) => leaf(hx + dx, hy + dy, i * 50, LEAF_COLORS[i % LEAF_COLORS.length], 1.1))
      .join('')
    const hog =
      once(
        [{ t: 0, x: 0, y: 0, o: 1 }, { t: 3.2, ease: 'inOut' }, { t: 6.3, x: 260, y: -10 }, { t: 6.7, ease: 'out' }, { t: 7.35, x: 308, y: -12 }, { t: 8, ease: 'inOut' }, { t: 11.8, x: 550, y: -20 }, { t: 13.05, ease: 'in' }, { t: 13.42, x: 680, y: -32, o: 0 }, { t: 14.2, ease: 'out' }, { t: 14.5, x: 768, y: -28, o: 1 }, { t: 19.95, ease: 'step' }],
        HOG,
        groundShadow(hx, hy + 1, 34, 6),
      ) +
      keys(
        'hog',
        hogKeys,
        [hx, hy - 18],
        once([{ t: 0, o: 1, ease: 'step' }, { t: 13.42, o: 0, ease: 'step' }, { t: 14.2, o: 1 }], HOG,
          once(showIn([0, 6.62], [7.6, 12.95], [14.2, LOOP]), HOG, walkPose) +
            once(showIn([6.62, 7.6], [12.95, 14.2]), HOG, ballPose) +
            once(showIn([7.6, 12.95]), HOG, onBack) +
            once(showIn([14.2, LOOP]), HOG, leafy)),
      )

    // The squirrel with its acorn; the acorn falling; the apple on the ground, then rolling away to the squirrel.
    const [qx, qy] = SQUIRREL
    const acorn = (x: number, y: number) =>
      `<ellipse cx="${x}" cy="${y + 3}" rx="5" ry="6.5" fill="#c8893f" ${Ow(1.3)}/><path d="M${x - 6} ${y}q6-7 12 0z" fill="#7a4a22" ${Ow(1.2)}/><path d="M${x} ${y - 4}v-3" stroke="${INK}" stroke-width="1.6"/>`
    const squirrelMarkup = keys(
      'squirrel',
      squirrelKeys,
      [qx, qy + 13],
      squirrel(qx, qy, (m) => anim({ type: 'sway', angle: 10, pivot: [qx - 2, qy + 10], period: 1.1 }, m)) +
        once(showIn([0, 12.6]), SQUIRREL, acorn(qx + 12, qy + 2)) +
        once(showIn([16.1, LOOP]), SQUIRREL, apple(qx + 12, qy + 2, 9)) +
        // Crunch.
        once(showIn([16.3, 19.9]), SQUIRREL, anim({ type: 'keys', period: 0.8, keys: [{ t: 0, x: 0, y: 0, o: 0 }, { t: 0.1, o: 1 }, { t: 0.7, x: 6, y: 22, o: 0 }], pivot: [qx + 16, qy + 6] },
          `<circle cx="${qx + 16}" cy="${qy + 6}" r="2" fill="#f4e4c0"/><circle cx="${qx + 20}" cy="${qy + 9}" r="1.6" fill="#e2303c"/>`)),
    )
    const fallingAcorn = once(acornKeys, BONK, acorn(...BONK))
    const groundApple = once(showIn([0, 7.05]), [490, 762], groundShadow(490, 770, 12, 3) + apple(490, 762, 10))
    const rollingApple = once(appleKeys, APPLE_STOP, apple(APPLE_STOP[0], APPLE_STOP[1] - 10, 10))

    // In B a mouse jumps out of the heap as the hedgehog rolls in, scurries off, sits sniffing, looks back at the
    // leafy hedgehog and dives into its den under the tree.
    const mouseKeys: Keyframe[] = [
      { t: 0, x: 0, y: 20, o: 0, ease: 'step' },
      { t: 13.45, o: 1, ease: 'out' },
      { t: 13.75, x: 30, y: -40, ease: 'in' },
      { t: 14.05, x: 60, y: 10, ease: 'out' },
      { t: 14.6, x: 150, y: 14, ease: 'inOut' },
      { t: 14.9, y: 8, ease: 'inOut' },
      { t: 15.05, y: 14, ease: 'inOut' },
      { t: 15.2, y: 8, ease: 'inOut' },
      { t: 15.35, y: 14, ease: 'inOut' },
      { t: 15.5, sx: 1, ease: 'inOut' },
      { t: 15.65, sx: -1, ease: 'inOut' },
      { t: 16.05, x: 150, y: 14, sy: 1, ease: 'in' },
      { t: 16.5, x: 122, y: -6, sy: 0.6, o: 1 },
      { t: 16.55, o: 0 },
    ]
    const MOUSE: [number, number] = [878, 730]
    const pileMouse = diff(
      MOUSE[0] - 6,
      MOUSE[1] - 10,
      32,
      '',
      keys('pilemouse', mouseKeys, MOUSE,
        `<path d="M${MOUSE[0] - 10} ${MOUSE[1] - 5}q-14 2-16-8" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>` +
          `<ellipse cx="${MOUSE[0]}" cy="${MOUSE[1] - 7}" rx="11" ry="7" fill="#a7a9b4" ${Ow(1.6)}/><circle cx="${MOUSE[0] + 4}" cy="${MOUSE[1] - 15}" r="5" fill="#a7a9b4" ${Ow(1.4)}/>` +
          `<path d="M${MOUSE[0] + 8} ${MOUSE[1] - 11}l9 2l-8 4z" fill="#a7a9b4" ${Ow(1.4)}/><circle cx="${MOUSE[0] + 10}" cy="${MOUSE[1] - 11}" r="1.4" fill="${INK}"/>`),
      'pilemouse',
      during(13.45, 16.6),
    )
    // In B a ladybird crawls up the apple tree's trunk while the squirrel eats.
    const LADY: [number, number] = [542, 690]
    const ladybird = diff(
      LADY[0],
      LADY[1],
      20,
      '',
      keys('ladybird', [{ t: 0, x: 2, y: 34, o: 0, ease: 'step' }, { t: 15.5, o: 1, ease: 'linear' }, { t: 19.5, x: -2, y: -40 }, { t: 19.55, o: 0 }], LADY,
        `<ellipse cx="${LADY[0]}" cy="${LADY[1]}" rx="6" ry="7.5" fill="#e63946" ${Ow(1.2)}/><path d="M${LADY[0]} ${LADY[1] - 7}v14" stroke="${INK}" stroke-width="1.2"/>` +
          `<circle cx="${LADY[0] - 3}" cy="${LADY[1] - 1}" r="1.5" fill="${INK}"/><circle cx="${LADY[0] + 3}" cy="${LADY[1] + 3}" r="1.5" fill="${INK}"/><circle cx="${LADY[0]}" cy="${LADY[1] - 9}" r="3" fill="${INK}"/>`),
      'ladybird',
      during(15.5, 19.5),
    )

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c5-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb7e0"/><stop offset="0.6" stop-color="#c6e0f0"/><stop offset="1" stop-color="#f5eedc"/></linearGradient>` +
      `<radialGradient id="c5-glow"><stop offset="0" stop-color="#fff0c8" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffe3a8" stop-opacity="0.4"/><stop offset="1" stop-color="#ffe3a8" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c5-far" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9b48a"/><stop offset="1" stop-color="#d9c9a2"/></linearGradient>` +
      `<linearGradient id="c5-hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8c06a"/><stop offset="1" stop-color="#a9a24f"/></linearGradient>` +
      `<linearGradient id="c5-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9c45a"/><stop offset="0.6" stop-color="#8fae46"/><stop offset="1" stop-color="#6f8f36"/></linearGradient>` +
      `<linearGradient id="c5-path" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9c08e"/><stop offset="1" stop-color="#efe0b8"/></linearGradient>` +
      `<radialGradient id="c5-maple" cx="0.64" cy="0.28" r="0.85"><stop offset="0" stop-color="#ffb35c"/><stop offset="0.5" stop-color="#e8662c"/><stop offset="1" stop-color="#a8381c"/></radialGradient>` +
      `<radialGradient id="c5-yellow" cx="0.64" cy="0.28" r="0.85"><stop offset="0" stop-color="#ffe27a"/><stop offset="0.55" stop-color="#e8b830"/><stop offset="1" stop-color="#b07f16"/></radialGradient>` +
      `<linearGradient id="c5-wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8f5d2e"/><stop offset="1" stop-color="#c48f55"/></linearGradient>` +
      `<radialGradient id="c5-puddle" cx="0.5" cy="0.4" r="0.7"><stop offset="0" stop-color="#cfe9f7"/><stop offset="1" stop-color="#7fb2d4"/></radialGradient>` +
      `<radialGradient id="c5-cap" cx="0.6" cy="0.3" r="0.8"><stop offset="0" stop-color="#ff6a5a"/><stop offset="1" stop-color="#b8231a"/></radialGradient>` +
      `<radialGradient id="c5-spines" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#9a6a42"/><stop offset="0.6" stop-color="#6b4528"/><stop offset="1" stop-color="#3e2614"/></radialGradient>` +
      `<radialGradient id="c5-sunlight" cx="0.87" cy="0.13" r="1"><stop offset="0" stop-color="#ffe9b8" stop-opacity="0.35"/><stop offset="0.5" stop-color="#ffe9b8" stop-opacity="0.08"/><stop offset="1" stop-color="#ffe9b8" stop-opacity="0"/></radialGradient></defs>` +
      `<rect width="${W}" height="${H}" fill="url(#c5-sky)"/>` +
      `<circle cx="1240" cy="150" r="190" fill="url(#c5-glow)"/>` +
      `<circle cx="1240" cy="150" r="46" fill="#ffd56a" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="1225" cy="142" rx="4.5" ry="7" fill="${INK}"/><ellipse cx="1255" cy="142" rx="4.5" ry="7" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.4, phase: 0.4 }, `<rect x="1216" y="134" width="48" height="18" fill="#ffd56a"/><path d="M1218 143h12M1250 143h12" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<path d="M1222 164q18 14 36 0" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>` +
      anim({ type: 'path', points: [[0, 0], [160, 0]], period: 34 }, puffCloud(260, 110, 1)) +
      anim({ type: 'path', points: [[0, 0], [-120, 0]], period: 28 }, puffCloud(820, 170, 0.8)) +
      // Birds flying south.
      keys(undefined, [{ t: 0, x: 0 }, { t: 19.9, x: -1700 }], [1500, 250],
        ([[1500, 250], [1524, 236], [1526, 264], [1548, 222], [1550, 278]] as [number, number][]).map(([fx, fy], i) => farBird(fx, fy, beat([fx, fy - 2], 0.5, i * 0.2))).join('')) +
      // Hills in autumn, the meadow, the path.
      `<path d="M0 540q180-80 360-30t380-20t380 10t320-30V700H0z" fill="url(#c5-far)"/>` +
      `<path d="M0 600q220-60 460-20t460-10t520-10V740H0z" fill="url(#c5-hill)"/>` +
      `<rect y="700" width="${W}" height="${H - 700}" fill="url(#c5-ground)"/>` +
      `<path d="M0 820q300-60 620-50t480-40t340-20V800q-160 10-340 26t-480 44t-620 70z" fill="url(#c5-path)" ${Ow(1.6)}/>` +
      fallen +
      tufts +
      trees +
      lamp +
      // The game's owl on top of the park lamp.
      anim({ type: 'sway', angle: 7, pivot: [120, 481], period: 3.6 }, keenOwl(120, 481, 0.85, (m) => anim({ type: 'blink', duty: 0.07, period: 3.1, phase: 0.3 }, m))) +
      bench +
      binMarkup +
      puddle +
      toadstools +
      `<g>${heap}</g>` +
      groundApple +
      rollingApple +
      hog +
      // The heap's front leaves cover the hedgehog while it is inside.
      `<path d="M${HEAP[0] - 70} ${HEAP[1]}q70-30 140 0z" fill="#c9562a" ${Ow(1.6)}/>` +
      leaf(HEAP[0] - 30, HEAP[1] - 6, 30, '#e8742c', 1) + leaf(HEAP[0] + 10, HEAP[1] - 10, 120, '#f2b33a', 1) + leaf(HEAP[0] + 40, HEAP[1] - 4, 70, '#d9442e', 1) +
      burst +
      pileMouse +
      fallingAcorn +
      squirrelMarkup +
      ladybird +
      falling +
      `<rect width="${W}" height="${H}" fill="url(#c5-sunlight)"/>`
    )
  },
})
