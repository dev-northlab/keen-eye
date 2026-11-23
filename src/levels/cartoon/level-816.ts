// Cartoon "The flamingo's balance" (docs/cartoon-mode.md), made like 812: a 20 s story in a mangrove swamp told by a
// camera. Four flamingos stand in the shallows on one leg; the young one at the end wobbles, hops, lands askew and
// tips into its neighbour — down they all go like dominoes, splash. Their heads pop up out of the water, dazed — and an
// alligator's eyes rise beside them. It opens its huge jaws... and only yawns, and sinks back to sleep. Up the flamingos
// get, all on the other leg now; the young one wobbles once more, the others hold their breath — it stands. Twelve
// differences: two hard (a thin aerial root of the left mangrove, a snail on a reed), three events of B.
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { farBird, frog, groundShadow, INK, keenOwl, lilyPad, NATURE_DEFS, O, Ow, puffCloud } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // Along the swamp from the left: the big mangrove, the canoe, the old post, to the flamingos.
  { t: 1.6, x: 0, y: 400, w: 560, ease: 'inOut' },
  { t: 4.4, x: 380, y: 420, w: 560, ease: 'step' },
  // Four on one leg, and the young one wobbling.
  { t: 4.45, x: 500, y: 520, w: 480, ease: 'linear' },
  { t: 7, x: 510, y: 500, w: 560, ease: 'step' },
  // Splash: heads out of the water — and the alligator.
  { t: 9.55, x: 560, y: 550, w: 560, ease: 'step' },
  // Up again, on the other leg.
  { t: 13.3, x: 500, y: 500, w: 620, ease: 'step' },
  // The young one wobbles once more...
  { t: 16.4, x: 470, y: 560, w: 300, ease: 'step' },
  // ...and the swamp to the right: the owl, the old mangrove.
  { t: 18.2, x: 760, y: 420, w: 560, ease: 'linear' },
  { t: 19.95, x: 880, y: 420, w: 560, ease: 'step' },
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

/** The water's surface by the flamingos: their legs, the heads and the alligator are cut off below it. */
const SURFACE = 726
/** Feet of the flamingos: the young one first, then the four grown ones. */
const FEET_Y = 724
const FLAMINGOS: { x: number; s: number }[] = [
  { x: 548, s: 0.74 },
  { x: 620, s: 1 },
  { x: 692, s: 1 },
  { x: 764, s: 1 },
  { x: 836, s: 1 },
]
/** When each one tips over (the young one hops first), when it is down in the water, when it rises again. */
const TIP = [7.25, 7.5, 7.82, 8.14, 8.46]
const DOWN = [9.4, 9.35, 9.3, 9.22, 9.1]
const RISE = [14.7, 13.4, 13.65, 13.9, 14.15]
/** The domino lean: each one leans on its neighbour before the whole row goes down. */
const LEAN = 36

function flamingoKeys(i: number): Keyframe[] {
  const k: Keyframe[] = [{ t: 0, x: 0, y: 0, rot: 0, o: 1 }]
  if (i === 0) {
    // Wobbling more and more, a hop — landing askew.
    k.push(
      { t: 4.6, rot: 0, ease: 'inOut' },
      { t: 5, rot: -5, ease: 'inOut' },
      { t: 5.4, rot: 6, ease: 'inOut' },
      { t: 5.8, rot: -9, ease: 'inOut' },
      { t: 6.2, rot: 10, ease: 'inOut' },
      { t: 6.6, rot: -13, ease: 'inOut' },
      { t: 6.85, rot: 0, ease: 'out' },
      { t: 7.05, y: -26, ease: 'in' },
      { t: TIP[0], y: 0, rot: 14, ease: 'out' },
    )
  } else {
    k.push({ t: TIP[i] - 0.05, rot: 0, ease: 'in' }, { t: TIP[i], rot: 6, ease: 'out' })
  }
  k.push(
    // Leaning on the next one...
    { t: TIP[i] + 0.3, rot: LEAN, ease: 'step' },
    { t: DOWN[i] - 0.32, rot: LEAN, ease: 'in' },
    // ...and into the water.
    { t: DOWN[i], x: 30, y: 60, rot: 86, ease: 'step' },
    { t: DOWN[i] + 0.05, o: 0, ease: 'step' },
    // Rising out of the water, on the other leg.
    { t: RISE[i] - 0.05, x: 0, y: 170, rot: 0, o: 1, ease: 'out' },
    { t: RISE[i] + 0.5, y: 0, ease: 'inOut' },
  )
  if (i === 0) {
    // The last wobble — and it holds.
    k.push(
      { t: 16.6, rot: 0, ease: 'inOut' },
      { t: 16.9, rot: -10, ease: 'inOut' },
      { t: 17.2, rot: 9, ease: 'inOut' },
      { t: 17.5, rot: -5, ease: 'inOut' },
      { t: 17.75, rot: 0 },
    )
  }
  k.push({ t: 19.95, ease: 'step' })
  return k
}

/** The alligator's head (its snout points left at the flamingos). */
const GATOR: [number, number] = [1010, 744]
const gatorKeys: Keyframe[] = [
  { t: 0, y: 40, o: 0, ease: 'step' },
  { t: 10.55, o: 1, ease: 'out' },
  { t: 10.95, y: 0, ease: 'inOut' },
  { t: 11.35, ease: 'inOut' },
  { t: 11.6, y: -24, ease: 'inOut' },
  { t: 12.5, ease: 'inOut' },
  { t: 12.75, y: 0, ease: 'in' },
  { t: 13.15, y: 44, o: 1, ease: 'step' },
  { t: 13.2, o: 0, ease: 'step' },
]
const YAWN: [number, number] = [11.65, 12.45]

export default svgLevel({
  id: 816,
  chapter: 'cartoon',
  title: 'cartoonFlamingo',
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
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 13) / 13 }, m)

    // --- The sky and the far swamp: hazy cypress silhouettes, sun shafts through the mist. ---
    let farTrees = ''
    for (let i = 0; i < 26; i++) {
      const fx = Math.round(i * 58 + rand() * 30)
      const h = Math.round(110 + rand() * 90)
      const top = 640 - h
      farTrees +=
        `<path d="M${fx - 4} 650v-${h - 30}h8v${h - 30}z" fill="#7f9c8a"/>` +
        `<ellipse cx="${fx}" cy="${top + 20}" rx="${Math.round(26 + rand() * 16)}" ry="${Math.round(22 + rand() * 10)}" fill="#7f9c8a"/>` +
        `<path d="M${fx - 14} ${top + 30}v${Math.round(20 + rand() * 30)}M${fx + 10} ${top + 34}v${Math.round(16 + rand() * 30)}" stroke="#93ac98" stroke-width="3" stroke-linecap="round"/>`
    }
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c16-sky)"/>` +
      `<circle cx="1180" cy="150" r="200" fill="url(#c16-glow)"/>` +
      `<circle cx="1180" cy="150" r="44" fill="#ffd56a" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="1166" cy="142" rx="4.5" ry="7" fill="${INK}"/><ellipse cx="1194" cy="142" rx="4.5" ry="7" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.3, phase: 0.2 }, `<rect x="1156" y="134" width="48" height="18" fill="#ffd56a"/><path d="M1158 143h12M1188 143h12" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<path d="M1162 164q18 14 36 0" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>` +
      anim({ type: 'path', points: [[0, 0], [130, 0]], period: 36 }, puffCloud(300, 120, 0.9)) +
      anim({ type: 'path', points: [[0, 0], [-100, 0]], period: 30 }, puffCloud(820, 180, 0.7)) +
      keys(undefined, [{ t: 0, x: 0, y: 0 }, { t: 10, y: -20, ease: 'inOut' }, { t: 19.9, x: 1700, y: 0 }], [-120, 250],
        ([[-120, 250], [-146, 238], [-148, 264]] as [number, number][]).map(([fx, fy], i) => farBird(fx, fy, beat([fx, fy - 2], 0.55, i * 0.2))).join('')) +
      farTrees +
      `<rect y="520" width="${W}" height="140" fill="url(#c16-mist)"/>` +
      `<path d="M900 0h120l-320 700h-70zM1110 0h70l-240 700h-50z" fill="#fff8d0" fill-opacity="0.14"/>`

    // --- The water, its far bank, ripples, reflections. ---
    const water =
      `<path d="M0 652q360-14 720-4t720-6V${H}H0z" fill="url(#c16-water)"/>` +
      `<path d="M0 652q360-14 720-4t720-6" fill="none" stroke="#5e7a52" stroke-width="5"/>` +
      `<path d="M0 655q360-10 720-2t720-6" fill="none" stroke="#a8c88a" stroke-opacity="0.6" stroke-width="2"/>` +
      anim({ type: 'keys', period: 3.4, keys: [{ t: 0, x: 0 }, { t: 1.7, x: 18, ease: 'inOut' }] },
        `<path d="M40 700h70M220 790h80M460 840h70M560 700h50M980 860h90M1150 780h60M1300 850h80M700 880h60" stroke="#e8f4e0" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round"/>`)
    let pads = ''
    for (const [px, py, ps] of [[150, 830, 1.2], [520, 860, 1], [700, 760, 0.8], [960, 840, 1.1], [1200, 820, 1], [1380, 780, 0.9], [420, 700, 0.8], [1110, 770, 0.8]] as [number, number, number][]) {
      pads += anim({ type: 'keys', period: 4, phase: (px % 7) / 7, keys: [{ t: 0, y: 0, rot: -2 }, { t: 2, y: 2, rot: 2, ease: 'inOut' }], pivot: [px, py] }, lilyPad(px, py, ps))
    }
    const lilyFlower = (x: number, y: number, c1: string, c2: string) =>
      `<path d="M${x - 12} ${y}q-2-12 6-14q4 6 6 14zM${x + 12} ${y}q2-12-6-14q-4 6-6 14z" fill="${c1}" ${Ow(1.6)}/>` +
      `<path d="M${x - 6} ${y}q0-16 6-20q6 4 6 20z" fill="${c2}" ${Ow(1.6)}/><circle cx="${x}" cy="${y - 4}" r="3" fill="#ffd23f"/>`
    const flowers =
      lilyFlower(158, 826, '#ff9fc0', '#ffc2d7') + lilyFlower(1206, 816, '#ff9fc0', '#ffc2d7') +
      // A water lily by the alligator: pink in A, white in B (the only recolour).
      lilyPad(1040, 812, 1) +
      diff(1040, 802, 22, lilyFlower(1040, 808, '#ff9fc0', '#ffc2d7'), lilyFlower(1040, 808, '#f4f4f0', '#ffffff'))

    // --- Mangroves: a trunk standing on arching prop roots, a dark crown, Spanish moss hanging. ---
    const moss = (x: number, y: number, len: number) =>
      sway([x, y], 5, 3.4)(
        `<path d="M${x} ${y}q-6 ${len * 0.3} 2 ${len * 0.55}t-2 ${len * 0.45}" fill="none" stroke="#8fa07e" stroke-width="5" stroke-linecap="round"/>` +
          `<path d="M${x} ${y}q-6 ${len * 0.3} 2 ${len * 0.55}t-2 ${len * 0.45}" fill="none" stroke="#b9c8a4" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="4 3"/>`,
      )
    const root = (x0: number, y0: number, x1: number, y1: number, lift: number) =>
      `<path d="M${x0} ${y0}Q${Math.round((x0 + x1) / 2)} ${y0 - lift} ${x1} ${y1}" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>` +
      `<path d="M${x0} ${y0}Q${Math.round((x0 + x1) / 2)} ${y0 - lift} ${x1} ${y1}" fill="none" stroke="#7a6248" stroke-width="5.6" stroke-linecap="round"/>`
    const mangrove = (x: number, y: number, s: number, extra = '') => {
      const k = (n: number) => Math.round(n * s * 10) / 10
      let roots = ''
      for (const d of [-120, -80, -44, 36, 76, 116]) roots += root(x, y - k(60), x + k(d), y + 4, k(d < 0 ? 40 : 36))
      let crown = ''
      for (const [cx, cy, rx, ry] of [[-110, -230, 70, 46], [110, -236, 74, 48], [-50, -280, 80, 54], [56, -284, 82, 56], [0, -246, 96, 60]]) {
        crown += `<ellipse cx="${x + k(cx)}" cy="${y + k(cy)}" rx="${k(rx)}" ry="${k(ry)}" fill="url(#c16-crown)" ${O}/>`
      }
      crown += `<path d="M${x - k(80)} ${y - k(250)}q${k(14)}-${k(12)} ${k(28)} 0M${x + k(30)} ${y - k(290)}q${k(14)}-${k(12)} ${k(28)} 0M${x + k(100)} ${y - k(240)}q${k(14)}-${k(12)} ${k(28)} 0" fill="none" stroke="#1f4a2a" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round"/>`
      let mossM = ''
      for (const [mx, len] of [[-150, 70], [-118, 96], [-70, 60], [-20, 84], [40, 66], [90, 100], [140, 74]]) mossM += moss(x + k(mx), y + k(-206), k(len))
      return (
        groundShadow(x, y + 6, k(150), k(10)) +
        roots +
        `<path d="M${x - k(16)} ${y - k(58)}q${k(4)}-${k(90)}-${k(2)}-${k(170)}h${k(34)}q-${k(6)} ${k(80)} ${k(2)} ${k(170)}z" fill="url(#c16-bark)" ${O}/>` +
        `<path d="M${x - k(4)} ${y - k(80)}q${k(3)}-${k(50)} 0-${k(110)}" fill="none" stroke="#4a3a2a" stroke-opacity="0.45" stroke-width="${k(3)}"/>` +
        sway([x, y - k(200)], 1.2, 5.6)(crown) +
        mossM +
        extra
      )
    }
    // The left mangrove: a thin aerial root hanging from its branch (A only: a hard one), an orchid in its moss (A
    // only); in B a snake lies along one of its roots while the camera passes.
    const aerial = (x: number, y: number, len: number) =>
      sway([x, y], 3, 3)(`<path d="M${x} ${y}q4 ${len / 2} 0 ${len}" fill="none" stroke="#7a6248" stroke-width="3"/><circle cx="${x}" cy="${y + len}" r="2.4" fill="#a89070"/>`)
    const leftTree = mangrove(190, 700, 1.1,
      `<path d="M210 548q40-8 80 4" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M210 548q40-8 80 4" fill="none" stroke="#7a6248" stroke-width="6" stroke-linecap="round"/>` +
        aerial(232, 552, 46) + aerial(278, 554, 40) +
        diff(256, 578, 28, aerial(256, 552, 50), '') +
        diff(
          120,
          492,
          22,
          `<path d="M112 494q-10-6-8-14q8-2 10 8zM128 494q10-6 8-14q-8-2-10 8z" fill="#e06cc6" ${Ow(1.3)}/><path d="M120 498q-6-14 0-22q6 8 0 22z" fill="#f5a6e6" ${Ow(1.3)}/><circle cx="120" cy="490" r="2.6" fill="#ffd23f"/>`,
          '',
        ))
    const snake = diff(
      311,
      666,
      38,
      '',
      keys('snake', [{ t: 0, x: -14, o: 0, ease: 'step' }, { t: 1.6, o: 1, ease: 'out' }, { t: 2.1, x: 0 }, { t: 3.4, ease: 'in' }, { t: 3.8, x: -14, o: 1, ease: 'step' }, { t: 3.85, o: 0, ease: 'step' }], [300, 664],
        `<path d="M278 676q8-12 18-8t18-6t12-2" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M278 676q8-12 18-8t18-6t12-2" fill="none" stroke="#6aa84f" stroke-width="5.6" stroke-linecap="round" stroke-dasharray="6 4"/>` +
          `<ellipse cx="326" cy="660" rx="8" ry="5" fill="#6aa84f" ${Ow(1.4)}/><circle cx="328" cy="658" r="1.4" fill="${INK}"/>` +
          anim({ type: 'blink', duty: 0.4, period: 0.8 }, `<path d="M334 661l7 1l3-2M341 662l3 2" fill="none" stroke="#e63946" stroke-width="1.4"/>`)),
      'snake',
      during(1.6, 3.85),
    )
    // The right mangrove: the game's owl on its mossy branch; in B a crab peeks out from under its roots at the end.
    const rightTree = mangrove(1290, 704, 1,
      `<path d="M1282 520q-60-6-118-40" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M1282 520q-60-6-118-40" fill="none" stroke="#7a6248" stroke-width="7.6" stroke-linecap="round"/>` +
        moss(1210, 500, 60) + moss(1176, 486, 44) +
        sway([1196, 494], 6, 3.6)(keenOwl(1196, 494, 0.95, blink(3.2, 0.4))))
    const crab = diff(
      1292,
      730,
      31,
      '',
      keys('crab', [{ t: 0, y: 12, o: 0, ease: 'step' }, { t: 18.2, o: 1, ease: 'out' }, { t: 18.6, y: 0 }, { t: 19.5, ease: 'in' }, { t: 19.85, y: 12, o: 1, ease: 'step' }, { t: 19.9, o: 0, ease: 'step' }], [1292, 734],
        `<path d="M1278 738l-8 4M1306 738l8 4" stroke="${INK}" stroke-width="2"/><ellipse cx="1292" cy="734" rx="14" ry="8" fill="#d9483a" ${Ow(1.5)}/>` +
          `<path d="M1284 728l-2-8M1300 728l2-8" stroke="${INK}" stroke-width="2"/><circle cx="1282" cy="719" r="3" fill="#fff" ${Ow(1)}/><circle cx="1302" cy="719" r="3" fill="#fff" ${Ow(1)}/><circle cx="1282.5" cy="719" r="1.3" fill="${INK}"/><circle cx="1302.5" cy="719" r="1.3" fill="${INK}"/>` +
          `<path d="M1278 732q-12-6-10-14q6 2 8 6M1306 732q12-6 10-14q-6 2-8 6" fill="#d9483a" ${Ow(1.3)}/>`),
      'crab',
      during(18.2, 19.9),
    )

    // --- The left shallows: a canoe tied to a root (its paddle in A only), an old post with a straw hat on it (A only);
    // in B a manatee's nose comes up for air. ---
    const canoe =
      `<path d="M260 748q60 12 140 0q-4 12-20 16h-100q-16-4-20-16z" fill="url(#c16-wood)" ${Ow(1.8)}/><path d="M270 750q60 8 120 0" fill="none" stroke="#5e3b1a" stroke-width="2"/>` +
      `<path d="M262 748q-30-20-58-40" fill="none" stroke="#c9b48a" stroke-width="2"/>` +
      diff(343, 739, 32, `<path d="M320 752l36-18" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M320 752l36-18" stroke="#d9a066" stroke-width="3" stroke-linecap="round"/><path d="M352 731l11-7l4 7l-10 5z" fill="#d9a066" ${Ow(1.4)}/>`, '')
    const post =
      `<rect x="463" y="690" width="14" height="70" fill="url(#c16-wood)" ${Ow(1.8)}/><path d="M466 700h8M466 720h8" stroke="#5e3b1a" stroke-width="1.6"/>` +
      diff(470, 684, 24, `<ellipse cx="470" cy="690" rx="20" ry="5" fill="#e8c46a" ${Ow(1.6)}/><path d="M458 690q2-16 12-16q10 0 12 16z" fill="#e8c46a" ${Ow(1.6)}/><path d="M459 686h22" stroke="#d1495b" stroke-width="3"/>`, '')
    const manatee = diff(
      410,
      754,
      27,
      '',
      keys('manatee', [{ t: 0, y: 14, o: 0, ease: 'step' }, { t: 1.8, o: 1, ease: 'out' }, { t: 2.3, y: 0 }, { t: 4.1, ease: 'in' }, { t: 4.55, y: 14, o: 1, ease: 'step' }, { t: 4.6, o: 0, ease: 'step' }], [410, 752],
        `<path d="M392 762q2-20 18-20q16 0 18 20z" fill="#8e9aa6" ${Ow(1.6)}/><circle cx="404" cy="752" r="2" fill="${INK}"/><circle cx="416" cy="752" r="2" fill="${INK}"/>` +
          `<path d="M400 760q10 4 20 0" fill="none" stroke="${INK}" stroke-width="1.4"/>` +
          anim({ type: 'keys', period: 1.2, keys: [{ t: 0, sx: 0.6, sy: 0.6, o: 0.9 }, { t: 1.2, sx: 1.35, sy: 1.35, o: 0 }], pivot: [410, 764] }, `<ellipse cx="410" cy="764" rx="15" ry="4" fill="none" stroke="#fff" stroke-width="2"/>`)),
      'manatee',
      during(1.8, 4.6),
    )
    // Mosquitoes over the shallows.
    let mosquitoes = ''
    for (let i = 0; i < 7; i++) {
      const mx = Math.round(430 + rand() * 80)
      const my = Math.round(590 + rand() * 50)
      mosquitoes += anim({ type: 'path', points: [[0, 0], [6, -5], [12, 1], [4, 6]], period: 0.5 + rand() * 0.4, phase: rand() }, `<circle cx="${mx}" cy="${my}" r="1.8" fill="#3a3a44"/><path d="M${mx - 3} ${my - 2}l3 2l3-2" fill="none" stroke="#c9d0da" stroke-width="1"/>`)
    }

    // --- Reeds and cattails by the flamingos (a snail on one in A: a hard one); a floating log (a mushroom on it in A
    // only); a frog on a pad (A only); the spoonbill (its crest in A only). ---
    const reed = (x: number, y: number, h: number, extra = '') =>
      sway([x, y], 4, 2.8)(
        `<path d="M${x} ${y}v-${h}" stroke="#4f8a33" stroke-width="3"/><rect x="${x - 3}" y="${y - h - 16}" width="7" height="20" rx="3.5" fill="#7a4a22" ${Ow(1.2)}/>` +
          `<path d="M${x} ${y - 10}q-12-20-10-44" fill="none" stroke="#5f9a3a" stroke-width="3"/>` + extra,
      )
    const reeds =
      reed(904, 742, 66) + reed(918, 748, 84) + reed(892, 750, 50) +
      reed(30, 760, 70) + reed(46, 768, 90) + reed(1400, 760, 76) + reed(1416, 770, 60)
    const snail = diff(
      930,
      700,
      18,
      `<path d="M922 708h14q4 0 4-4l-2-4q-2 4-6 4h-10z" fill="#d9c59a" ${Ow(1.2)}/><circle cx="927" cy="701" r="6" fill="#d97b4b" ${Ow(1.3)}/><path d="M927 701m-3 0a3 3 0 1 1 3 3" fill="none" stroke="#9a4a26" stroke-width="1.2"/><path d="M937 702l1-5M939 702l3-4" stroke="${INK}" stroke-width="1.1"/>`,
      '',
    )
    const log =
      anim({ type: 'keys', period: 3.6, keys: [{ t: 0, y: 0, rot: -1.5 }, { t: 1.8, y: 2, rot: 1.5, ease: 'inOut' }], pivot: [770, 812], id: 'log' },
        `<rect x="712" y="804" width="112" height="16" rx="8" fill="url(#c16-log)" ${Ow(1.8)}/><ellipse cx="824" cy="812" rx="6" ry="8" fill="#d9a066" ${Ow(1.4)}/><path d="M730 810h40M760 815h40" stroke="#5e3b1a" stroke-opacity="0.4" stroke-width="1.6"/>` +
          diff(786, 794, 18, `<path d="M786 804v-8" stroke="#f4efe2" stroke-width="4"/><path d="M776 798q10-14 20 0z" fill="#e8742c" ${Ow(1.3)}/><circle cx="782" cy="795" r="1.6" fill="#fff"/><circle cx="790" cy="794" r="1.4" fill="#fff"/>`, '', 'log'))
    const padFrog =
      lilyPad(598, 812, 1) +
      diff(598, 792, 28, frog(598, 808, blink(3.4, 0.2), (m) => anim({ type: 'keys', period: 1.1, keys: [{ t: 0, sx: 1, sy: 1 }, { t: 0.55, sx: 1.4, sy: 1.4, ease: 'inOut' }], pivot: [598, 799] }, m)), '')
    const SPOON: [number, number] = [1074, 724]
    const [sx, sy] = SPOON
    const spoonbill =
      `<path d="M${sx - 4} ${sy}v-34M${sx + 6} ${sy}v-34" stroke="#c94a5a" stroke-width="3"/>` +
      `<ellipse cx="${sx}" cy="${sy - 44}" rx="22" ry="14" fill="#f5a3b4" ${Ow(1.8)}/><path d="M${sx - 18} ${sy - 46}q14-10 30 2q-14 8-30-2z" fill="#e0607a" ${Ow(1.4)}/>` +
      `<path d="M${sx - 16} ${sy - 50}q-10-24 2-40" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M${sx - 16} ${sy - 50}q-10-24 2-40" fill="none" stroke="#fbe6ea" stroke-width="5" stroke-linecap="round"/>` +
      `<circle cx="${sx - 13}" cy="${sy - 92}" r="8" fill="#fbe6ea" ${Ow(1.6)}/><circle cx="${sx - 16}" cy="${sy - 94}" r="1.6" fill="${INK}"/>` +
      `<path d="M${sx - 20} ${sy - 92}l-16 10q-6 6-2 10q6 2 8-4l12-12z" fill="#b0a38a" ${Ow(1.4)}/>` +
      diff(sx - 4, sy - 98, 18, `<path d="M${sx - 7} ${sy - 96}q10-8 18-4q-6 2-8 6q6 0 8 4q-10 2-18-6z" fill="#fbe6ea" ${Ow(1.2)}/>`, '')

    // --- The flamingos. ---
    const flamingo = (fx: number, fy: number, s: number, i: number) => {
      const k = (n: number) => Math.round(n * s * 10) / 10
      const leg = (other: boolean) => {
        const sx0 = fx + (other ? k(5) : -k(3))
        const hip = fy - k(72)
        const bendX = other ? -1 : 1
        return (
          `<path d="M${sx0} ${fy + 14}V${hip}" stroke="${INK}" stroke-width="${k(6)}" stroke-linecap="round"/><path d="M${sx0} ${fy + 14}V${hip}" stroke="#f08aa4" stroke-width="${k(3.6)}" stroke-linecap="round"/>` +
          `<circle cx="${sx0}" cy="${fy - k(36)}" r="${k(3.2)}" fill="#e0607a"/>` +
          `<path d="M${fx + bendX * k(2)} ${hip}l${bendX * k(18)} ${k(22)}l-${bendX * k(16)} ${k(4)}" fill="none" stroke="${INK}" stroke-width="${k(6)}" stroke-linecap="round" stroke-linejoin="round"/>` +
          `<path d="M${fx + bendX * k(2)} ${hip}l${bendX * k(18)} ${k(22)}l-${bendX * k(16)} ${k(4)}" fill="none" stroke="#f08aa4" stroke-width="${k(3.6)}" stroke-linecap="round" stroke-linejoin="round"/>`
        )
      }
      const eye = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="${k(2.6)}" fill="#fff" ${Ow(1)}/><circle cx="${x + k(0.6)}" cy="${y}" r="${k(1.4)}" fill="${INK}"/>`
      const hx = fx + k(14)
      const hy = fy - k(156)
      const headM =
        `<path d="M${fx + k(18)} ${fy - k(94)}q${k(22)}-${k(20)} 0-${k(36)}q-${k(18)}-${k(14)}-${k(4)}-${k(30)}" fill="none" stroke="${INK}" stroke-width="${k(10)}" stroke-linecap="round"/>` +
        `<path d="M${fx + k(18)} ${fy - k(94)}q${k(22)}-${k(20)} 0-${k(36)}q-${k(18)}-${k(14)}-${k(4)}-${k(30)}" fill="none" stroke="url(#c16-pink)" stroke-width="${k(7)}" stroke-linecap="round"/>` +
        `<circle cx="${hx}" cy="${hy}" r="${k(8)}" fill="#f7a6ba" ${Ow(1.6)}/>` +
        `<path d="M${hx + k(6)} ${hy - k(3)}q${k(12)} 0 ${k(12)} ${k(10)}l-${k(4)} ${k(10)}q-${k(2)}-${k(8)}-${k(10)}-${k(12)}z" fill="#fff4f0" ${Ow(1.4)}/>` +
        `<path d="M${hx + k(16)} ${hy + k(10)}l-${k(4)} ${k(10)}l${k(2)}-${k(10)}z" fill="${INK}"/>` +
        // Its eye: calm, wide (the alligator; the young one's last wobble), smug (the young one, at the end).
        once(showIn([0, 16.8], [17.7, LOOP]), FEET(i), i === 0 ? once(showIn([0, 17.7]), FEET(i), eye(hx + k(2), hy - k(2))) + once(showIn([17.7, LOOP]), FEET(i), `<path d="M${hx - k(1)} ${hy - k(2)}q${k(3)}-${k(3)} ${k(6)} 0" fill="none" stroke="${INK}" stroke-width="${k(1.6)}" stroke-linecap="round"/>`) : eye(hx + k(2), hy - k(2))) +
        once(showIn([16.8, 17.7]), FEET(i), `<circle cx="${hx + k(2)}" cy="${hy - k(2)}" r="${k(4)}" fill="#fff" ${Ow(1.2)}/><circle cx="${hx + k(2.6)}" cy="${hy - k(2)}" r="${k(1.6)}" fill="${INK}"/>`)
      return (
        once(showIn([0, 13.3]), FEET(i), leg(false)) +
        once(showIn([13.3, LOOP]), FEET(i), leg(true)) +
        `<path d="M${fx - k(22)} ${fy - k(90)}l-${k(18)} ${k(4)}l${k(14)} ${k(8)}z" fill="#c94a5a" ${Ow(1.4)}/><path d="M${fx - k(34)} ${fy - k(88)}l-${k(6)} ${k(4)}l${k(8)} ${k(2)}z" fill="${INK}"/>` +
        `<ellipse cx="${fx}" cy="${fy - k(86)}" rx="${k(26)}" ry="${k(16)}" fill="url(#c16-pink)" ${Ow(1.8)}/>` +
        `<path d="M${fx - k(18)} ${fy - k(90)}q${k(18)}-${k(12)} ${k(34)} ${k(2)}q-${k(16)} ${k(10)}-${k(34)}-${k(2)}z" fill="#e0607a" ${Ow(1.4)}/>` +
        `<path d="M${fx - k(14)} ${fy - k(86)}l-${k(8)} ${k(4)}" stroke="${INK}" stroke-width="${k(2)}" stroke-linecap="round"/>` +
        anim({ type: 'keys', period: 2.6, phase: i * 0.37, keys: [{ t: 0, rot: 0 }, { t: 1.3, rot: 5, ease: 'inOut' }], pivot: [fx + k(18), fy - k(94)] }, headM)
      )
    }
    const FEET = (i: number): [number, number] => [FLAMINGOS[i].x, FEET_Y]
    const flock = FLAMINGOS.map(({ x, s }, i) => keys(`fl${i}`, flamingoKeys(i), [x, FEET_Y], flamingo(x, FEET_Y, s, i))).join('')
    // The young one's dazed stars as it hits the water, splashes as each goes in, pink feathers on the water.
    const splash = (x: number, t: number, n: number) => {
      let m = ''
      for (let j = 0; j < n; j++) {
        const ox = Math.round((j - (n - 1) / 2) * 16)
        const up = Math.round(40 + (j % 3) * 24)
        m += once([{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t, o: 1, ease: 'out' }, { t: t + 0.3, x: ox, y: -up, ease: 'in' }, { t: t + 0.65, x: ox * 1.4, y: 6, o: 1, ease: 'step' }, { t: t + 0.7, o: 0, ease: 'step' }], [x, SURFACE],
          `<ellipse cx="${x}" cy="${SURFACE}" rx="3.6" ry="5.6" fill="#e2f3ea" ${Ow(1.1)}/>`)
      }
      return m + once(showIn([t, t + 1.4]), [x, SURFACE],
        anim({ type: 'keys', period: 0.7, keys: [{ t: 0, sx: 0.6, sy: 0.6, o: 1 }, { t: 0.7, sx: 1.6, sy: 1.6, o: 0 }], pivot: [x, SURFACE + 2] }, `<ellipse cx="${x}" cy="${SURFACE + 2}" rx="30" ry="6" fill="none" stroke="#fff" stroke-width="2.4"/>`))
    }
    // Bump: a starburst where the young one tips into its neighbour.
    const BUMP: [number, number] = [610, 630]
    const bump = once(
      [{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t: 7.45, o: 1, ease: 'out' }, { t: 7.57, sx: 1.1, sy: 1.1, ease: 'inOut' }, { t: 7.8, sx: 1, sy: 1, o: 1, ease: 'step' }, { t: 7.84, o: 0, ease: 'step' }],
      BUMP,
      `<path d="M${BUMP[0]} ${BUMP[1] - 20}l5 11l12-4l-6 10l11 6l-13 2l3 12l-10-8l-8 10l-1-12l-12 1l9-9l-8-9l12 1z" fill="#ffe066" ${Ow(1.6)}/>` +
        `<path d="M${BUMP[0]} ${BUMP[1] - 10}l3 6l7-2l-4 6l6 3l-7 1l2 7l-6-4l-4 5l-1-7l-7 1l5-5l-5-5l7 1z" fill="#fff" fill-opacity="0.8"/>`,
    )
    const splashes = FLAMINGOS.map(({ x }, i) => splash(x + 80, DOWN[i], 7)).join('')
    // Heads out of the water: dazed, then wide-eyed at the alligator, then down again before they stand up.
    const heads = FLAMINGOS.map(({ x, s }, i) => {
      const k = (n: number) => Math.round(n * s * 10) / 10
      const bx = x + 84
      const pop = DOWN[i] + 0.35
      const neck =
        `<path d="M${bx} ${SURFACE + 20}q${k(8)}-${k(26)}-${k(2)}-${k(48)}" fill="none" stroke="${INK}" stroke-width="${k(10)}" stroke-linecap="round"/><path d="M${bx} ${SURFACE + 20}q${k(8)}-${k(26)}-${k(2)}-${k(48)}" fill="none" stroke="#f08aa4" stroke-width="${k(7)}" stroke-linecap="round"/>` +
        `<circle cx="${bx - k(2)}" cy="${SURFACE - k(30)}" r="${k(8)}" fill="#f7a6ba" ${Ow(1.6)}/>` +
        `<path d="M${bx + k(4)} ${SURFACE - k(33)}q${k(12)} 0 ${k(12)} ${k(10)}l-${k(4)} ${k(10)}q-${k(2)}-${k(8)}-${k(10)}-${k(12)}z" fill="#fff4f0" ${Ow(1.4)}/><path d="M${bx + k(14)} ${SURFACE - k(20)}l-${k(4)} ${k(10)}l${k(2)}-${k(10)}z" fill="${INK}"/>` +
        // Dazed, then wide-eyed.
        once(showIn([0, 10.8]), [bx, SURFACE], `<path d="M${bx - k(4)} ${SURFACE - k(32)}m-${k(1)} 0a${k(1)} ${k(1)} 0 1 1 ${k(2)} 0a${k(2.2)} ${k(2.2)} 0 1 1-${k(4.4)} 0" fill="none" stroke="${INK}" stroke-width="1.3"/>`) +
        once(showIn([10.8, LOOP]), [bx, SURFACE], `<circle cx="${bx - k(1)}" cy="${SURFACE - k(32)}" r="${k(4)}" fill="#fff" ${Ow(1.2)}/><circle cx="${bx - k(2)}" cy="${SURFACE - k(32)}" r="${k(1.6)}" fill="${INK}"/>`) +
        // Water dripping off it.
        anim({ type: 'keys', period: 0.7, phase: i * 0.13, keys: [{ t: 0, y: 0, o: 1 }, { t: 0.7, y: 22, o: 0 }], pivot: [bx, SURFACE - k(20)] }, `<path d="M${bx - k(6)} ${SURFACE - k(22)}q3 4 0 6q-3-2 0-6z" fill="#cfe8f0" ${Ow(0.8)}/>`)
      return once(
        [{ t: 0, y: 60, rot: 0, o: 0, ease: 'step' }, { t: pop, o: 1, ease: 'out' }, { t: pop + 0.35, y: 0, ease: 'inOut' }, { t: pop + 0.6, rot: -8, ease: 'inOut' }, { t: pop + 0.85, rot: 8, ease: 'inOut' }, { t: pop + 1.1, rot: 0 }, { t: 12.9, ease: 'in' }, { t: 13.25, y: 60, o: 1, ease: 'step' }, { t: 13.3, o: 0, ease: 'step' }],
        [bx, SURFACE + 20],
        neck,
      )
    }).join('')
    const dazed = once(showIn([DOWN[0] + 0.7, 10.8]), [FLAMINGOS[0].x + 82, SURFACE - 52],
      anim({ type: 'rotate', pivot: [FLAMINGOS[0].x + 82, SURFACE - 52], period: 1.1 },
        [0, 120, 240].map((a) => `<path transform="rotate(${a} ${FLAMINGOS[0].x + 82} ${SURFACE - 52})" d="M${FLAMINGOS[0].x + 82} ${SURFACE - 66}l2 4l4 1l-3 3l1 4l-4-2l-4 2l1-4l-3-3l4-1z" fill="#ffd23f" ${Ow(1)}/>`).join('')))
    let feathers = ''
    for (let j = 0; j < 6; j++) {
      const fx0 = 650 + j * 42
      feathers += once(showIn([9.2, 13.3]), [fx0, SURFACE + 8],
        anim({ type: 'keys', period: 2.2, phase: j / 6, keys: [{ t: 0, x: 0, rot: -10 }, { t: 1.1, x: 8, rot: 10, ease: 'inOut' }], pivot: [fx0, SURFACE + 8] },
          `<path d="M${fx0 - 8} ${SURFACE + 8}q8-6 16 0q-8 4-16 0z" fill="#f7a6ba" ${Ow(1)}/>`))
    }
    // The young one drips water and shakes once it is up (in both pictures).
    const shake = once(showIn([RISE[0] + 0.5, RISE[0] + 1.4]), [FLAMINGOS[0].x, FEET_Y - 90],
      [[-30, 0], [26, 0.2], [-18, 0.4], [34, 0.1]].map(([ox, phase]) => anim({ type: 'keys', period: 0.6, phase, keys: [{ t: 0, x: 0, y: 0, o: 1 }, { t: 0.6, x: ox, y: 24, o: 0 }], pivot: [FLAMINGOS[0].x, FEET_Y - 90] },
        `<ellipse cx="${FLAMINGOS[0].x}" cy="${FEET_Y - 90}" rx="2.6" ry="4" fill="#cfe8f0" ${Ow(0.8)}/>`)).join(''))

    // --- The alligator: eyes up, a huge yawn — then it sinks back to sleep. ---
    const [gx, gy] = GATOR
    const upperJaw = keys(undefined, [{ t: 0, rot: 0 }, { t: YAWN[0], ease: 'out' }, { t: YAWN[0] + 0.35, rot: 34, ease: 'inOut' }, { t: YAWN[1] - 0.2, ease: 'in' }, { t: YAWN[1], rot: 0 }, { t: 19.95, ease: 'step' }], [gx + 20, gy - 4],
      `<path d="M${gx + 30} ${gy - 4}h-130q-14 0-14-8q0-10 20-12h110q20 0 24 10z" fill="url(#c16-gator)" ${Ow(1.8)}/>` +
        `<circle cx="${gx - 106}" cy="${gy - 16}" r="2" fill="${INK}"/><circle cx="${gx - 98}" cy="${gy - 17}" r="2" fill="${INK}"/>` +
        `<path d="M${gx - 90} ${gy - 4}l4 6l4-6M${gx - 70} ${gy - 4}l4 6l4-6M${gx - 50} ${gy - 4}l4 6l4-6M${gx - 30} ${gy - 4}l4 6l4-6M${gx - 10} ${gy - 4}l4 6l4-6" fill="#fff" ${Ow(0.8)}/>` +
        `<path d="M${gx - 70} ${gy - 18}h10M${gx - 40} ${gy - 20}h10M${gx - 10} ${gy - 18}h10" stroke="#2f5a2a" stroke-width="3" stroke-linecap="round"/>` +
        // Its eyes on the bumps: open, then sleepy.
        `<ellipse cx="${gx + 6}" cy="${gy - 24}" rx="11" ry="9" fill="url(#c16-gator)" ${Ow(1.6)}/><ellipse cx="${gx + 26}" cy="${gy - 22}" rx="11" ry="9" fill="url(#c16-gator)" ${Ow(1.6)}/>` +
        once(showIn([0, 12.3]), GATOR, `<ellipse cx="${gx + 6}" cy="${gy - 26}" rx="5" ry="4" fill="#ffd23f" ${Ow(1)}/><path d="M${gx + 6} ${gy - 29}v6" stroke="${INK}" stroke-width="1.8"/><ellipse cx="${gx + 26}" cy="${gy - 24}" rx="5" ry="4" fill="#ffd23f" ${Ow(1)}/><path d="M${gx + 26} ${gy - 27}v6" stroke="${INK}" stroke-width="1.8"/>`) +
        once(showIn([12.3, LOOP]), GATOR, `<path d="M${gx + 1} ${gy - 26}q5 3 10 0M${gx + 21} ${gy - 24}q5 3 10 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`))
    const lowerJaw = keys(undefined, [{ t: 0, rot: 0 }, { t: YAWN[0], ease: 'out' }, { t: YAWN[0] + 0.35, rot: -10, ease: 'inOut' }, { t: YAWN[1] - 0.2, ease: 'in' }, { t: YAWN[1], rot: 0 }, { t: 19.95, ease: 'step' }], [gx + 20, gy - 2],
      `<path d="M${gx + 30} ${gy - 2}h-126q-10 2-8 10h120q16 0 14-10z" fill="#e8d6a8" ${Ow(1.6)}/>` +
        `<path d="M${gx - 84} ${gy - 2}l4-6l4 6M${gx - 60} ${gy - 2}l4-6l4 6M${gx - 36} ${gy - 2}l4-6l4 6M${gx - 12} ${gy - 2}l4-6l4 6" fill="#fff" ${Ow(0.8)}/>` +
        `<path d="M${gx - 80} ${gy - 1}q40 6 90 0" fill="none" stroke="#d9707a" stroke-width="5" stroke-linecap="round"/>`)
    const zzz = once(showIn([12.5, 13.2]), [gx + 30, gy - 40],
      anim({ type: 'keys', period: 0.7, keys: [{ t: 0, x: 0, y: 0, o: 0.2, sx: 0.6, sy: 0.6 }, { t: 0.2, o: 1 }, { t: 0.7, x: 16, y: -26, o: 0, sx: 1.2, sy: 1.2 }], pivot: [gx + 30, gy - 40] },
        `<path d="M${gx + 26} ${gy - 44}h8l-8 8h8" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`))
    const gator = keys('gator', gatorKeys, GATOR,
      once(showIn([10.9, 13.1]), GATOR, anim({ type: 'keys', period: 1.6, keys: [{ t: 0, sx: 0.7, sy: 0.7, o: 0.9 }, { t: 1.6, sx: 1.6, sy: 1.6, o: 0 }], pivot: [gx - 30, SURFACE + 2] }, `<ellipse cx="${gx - 30}" cy="${SURFACE + 2}" rx="80" ry="10" fill="none" stroke="#fff" stroke-width="2.4"/>`)) +
        lowerJaw + upperJaw) + zzz

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c16-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fc6de"/><stop offset="0.6" stop-color="#d6ead8"/><stop offset="1" stop-color="#eef2d4"/></linearGradient>` +
      `<radialGradient id="c16-glow"><stop offset="0" stop-color="#fff4cc" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffe9a8" stop-opacity="0.4"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c16-mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef4e4" stop-opacity="0"/><stop offset="1" stop-color="#eef4e4" stop-opacity="0.75"/></linearGradient>` +
      `<linearGradient id="c16-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9cbf9a"/><stop offset="0.4" stop-color="#5f9e8e"/><stop offset="1" stop-color="#3f7a72"/></linearGradient>` +
      `<radialGradient id="c16-crown" cx="0.64" cy="0.28" r="0.85"><stop offset="0" stop-color="#7fb86a"/><stop offset="0.55" stop-color="#3f7d4a"/><stop offset="1" stop-color="#244f2e"/></radialGradient>` +
      `<linearGradient id="c16-bark" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5e4a36"/><stop offset="0.6" stop-color="#8a7258"/><stop offset="1" stop-color="#a88e70"/></linearGradient>` +
      `<linearGradient id="c16-wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a6236"/><stop offset="1" stop-color="#c49462"/></linearGradient>` +
      `<linearGradient id="c16-log" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a0683a"/><stop offset="1" stop-color="#6e4022"/></linearGradient>` +
      `<linearGradient id="c16-pink" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffc2cf"/><stop offset="0.55" stop-color="#f58aa4"/><stop offset="1" stop-color="#d9607e"/></linearGradient>` +
      `<radialGradient id="c16-gator" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#8fb86a"/><stop offset="0.6" stop-color="#5a8a3e"/><stop offset="1" stop-color="#3a5e2a"/></radialGradient>` +
      `<radialGradient id="c16-sunlight" cx="0.82" cy="0.17" r="1"><stop offset="0" stop-color="#fff2c4" stop-opacity="0.3"/><stop offset="0.5" stop-color="#fff2c4" stop-opacity="0.06"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></radialGradient>` +
      `<clipPath id="c16-above"><rect width="${W}" height="${SURFACE}"/></clipPath></defs>` +
      sky +
      water +
      pads +
      flowers +
      leftTree +
      snake +
      rightTree +
      crab +
      canoe +
      post +
      manatee +
      mosquitoes +
      log +
      padFrog +
      spoonbill +
      `<g clip-path="url(#c16-above)">${flock}${heads}${gator}</g>` +
      bump +
      dazed +
      feathers +
      splashes +
      shake +
      reeds +
      snail +
      `<rect width="${W}" height="${H}" fill="url(#c16-sunlight)"/>`
    )
  },
})
