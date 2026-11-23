// Cartoon "The runaway egg" (docs/cartoon-mode.md), made like 812: a 20 s savanna story told by a camera. An ostrich
// guards its egg by the baobab; a rustle in the grass — and it hides its head in the sand, kicking the egg out of the
// nest. The egg rolls to the meerkats, who pass it along like a ball and head it away; it bounces off a hippo's back in
// the waterhole and lands in the mouth of a giraffe eating at the acacia. The giraffe strolls all the way back and sets
// it in the nest; it cracks, a chick peeps out — and only then does the ostrich pull its head out of the sand. Ten
// differences: two hard (a patch of the giraffe, a stripe of a zebra), three events of the story.
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { butterflyAt, dragonfly, farBird, groundShadow, INK, keenOwl, NATURE_DEFS, O, Ow, puffCloud, swingKeys } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // Along the savanna: the baobab with its owl and fruit, the ostrich on its nest, the termite mound, the meerkats.
  { t: 1.6, x: 0, y: 340, w: 640, ease: 'inOut' },
  { t: 4.1, x: 240, y: 420, w: 640, ease: 'step' },
  // A rustle in the grass — the head into the sand, the egg kicked out of the nest.
  { t: 4.15, x: 20, y: 515, w: 440, ease: 'step' },
  { t: 5.6, x: 20, y: 515, w: 440, ease: 'inOut' },
  // After the rolling egg.
  { t: 7.5, x: 360, y: 560, w: 400, ease: 'step' },
  // The meerkats pass it along.
  { t: 7.55, x: 420, y: 600, w: 330, ease: 'step' },
  // Headed away: over the waterhole, off the hippo's back...
  { t: 9.3, x: 560, y: 470, w: 640, ease: 'inOut' },
  { t: 10.95, x: 760, y: 470, w: 640, ease: 'inOut' },
  // ...into the giraffe's mouth at the acacia.
  { t: 12, x: 900, y: 380, w: 540, ease: 'step' },
  // The giraffe strolls all the way back with it.
  { t: 13, x: 800, y: 360, w: 640, ease: 'linear' },
  { t: 16.2, x: 120, y: 380, w: 640, ease: 'step' },
  // Into the nest; the chick; the ostrich at last.
  { t: 16.25, x: 120, y: 500, w: 500 },
  { t: 19.95, x: 126, y: 502, w: 490, ease: 'step' },
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

/** The ostrich's feet; it faces left, its nest behind it. Its head goes into the sand at HEAD_IN. */
const OST: [number, number] = [250, 782]
const NECK_BASE: [number, number] = [220, 667]
/** Below this line the ostrich is not drawn: its head in the sand. */
const SAND_LINE = 788
const HEAD_IN: [number, number] = [150, 790]
const DIVE: [number, number] = [5, 18.3]

/** The nest and the egg in it. */
const NEST: [number, number] = [330, 794]
const EGG: [number, number] = [330, 778]

/** The meerkats' feet. */
const MEERKATS: [number, number][] = [[535, 800], [590, 800], [645, 800]]

/** The hippo in the waterhole (facing left). */
const HIPPO: [number, number] = [1010, 806]

/** The giraffe's feet (facing left), the root of its neck, its mouth (rest coordinates). */
const GIRAFFE: [number, number] = [1330, 800]
const NECK: [number, number] = [GIRAFFE[0] - 35, GIRAFFE[1] - 175]
const MOUTH: [number, number] = [GIRAFFE[0] - 92, GIRAFFE[1] - 316]
const WALK: [number, number] = [13, 16.2]
/** Where it walks to (offset of its feet), and how it lowers its neck to the nest. */
const BACK: [number, number] = [-910, -20]
const LOWER: [number, number] = [16.2, 16.9]
const LOWER_TO = -150
const LOOK = -40
const giraffeKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0 },
  { t: WALK[0], ease: 'linear' },
  { t: WALK[1], x: BACK[0], y: BACK[1], ease: 'step' },
]
function neckKeys(): Keyframe[] {
  const k: Keyframe[] = [{ t: 0, rot: 0 }]
  // Chewing acacia leaves.
  for (let t = 0.5; t < 11.9; t += 0.8) k.push({ t, rot: 3, ease: 'inOut' }, { t: t + 0.4, rot: 0, ease: 'inOut' })
  // A little dip to catch the egg.
  k.push({ t: 12.1, rot: 0, ease: 'inOut' }, { t: 12.4, rot: -6, ease: 'inOut' }, { t: 12.7, rot: 0 })
  // Down to the nest, then up to watch.
  k.push({ t: LOWER[0], rot: 0, ease: 'linear' }, { t: LOWER[1], rot: LOWER_TO, ease: 'inOut' }, { t: 17.6, rot: LOOK, ease: 'step' })
  return k
}

/** Where the mouth is with the neck turned by `rot` degrees, the giraffe back at the nest (world). */
function mouthAt(rot: number): [number, number] {
  const r = (rot * Math.PI) / 180
  const [dx, dy] = [MOUTH[0] - NECK[0], MOUTH[1] - NECK[1]]
  const px = NECK[0] + BACK[0]
  const py = NECK[1] + BACK[1]
  return [Math.round(px + dx * Math.cos(r) - dy * Math.sin(r)), Math.round(py + dx * Math.sin(r) + dy * Math.cos(r))]
}

/** The egg's journey (offsets from EGG). */
function eggKeys(): Keyframe[] {
  const at = ([x, y]: [number, number]) => ({ x: x - EGG[0], y: y - EGG[1] })
  const [m1, m2, m3] = MEERKATS.map(([x]) => x)
  const k: Keyframe[] = [
    { t: 0, x: 0, y: 0, rot: 0, o: 1 },
    // Kicked out of the nest as the ostrich dives; rolls to the meerkats.
    { t: 5.25, ease: 'out' },
    { t: 7.5, ...at([510, 786]), rot: 720, ease: 'out' },
    // Up into the first meerkat's paws, along the row, up onto the last one's head.
    { t: 7.8, ...at([m1, 768]), rot: 760, ease: 'out' },
    { t: 8, ease: 'out' },
    { t: 8.15, ...at([(m1 + m2) / 2, 712]), ease: 'in' },
    { t: 8.3, ...at([m2, 768]), ease: 'out' },
    { t: 8.45, ...at([(m2 + m3) / 2, 712]), ease: 'in' },
    { t: 8.6, ...at([m3, 768]), ease: 'out' },
    { t: 8.9, ...at([m3, 700]), ease: 'in' },
    { t: 9.2, ...at([m3, 724]), rot: 760, ease: 'out' },
    // Headed away, over the waterhole, off the hippo's back...
    { t: 10.05, ...at([850, 520]), rot: 1000, ease: 'in' },
    { t: 10.9, ...at([1060, 776]), rot: 1180, ease: 'out' },
    { t: 11.65, ...at([1150, 446]), rot: 1360, ease: 'in' },
    // ...into the giraffe's mouth, and along with it as it strolls back.
    { t: 12.4, ...at(MOUTH), rot: 1440, ease: 'linear' },
    { t: WALK[0], ...at(MOUTH), ease: 'linear' },
    { t: WALK[1], ...at([MOUTH[0] + BACK[0], MOUTH[1] + BACK[1]]), ease: 'linear' },
  ]
  // Down with the mouth to the nest.
  for (let i = 1; i <= 6; i++) {
    const f = i / 6
    k.push({ t: LOWER[0] + (LOWER[1] - LOWER[0]) * f, ...at(mouthAt(LOWER_TO * f)), ease: 'linear' })
  }
  k.push({ t: 17.05, x: 0, y: 0, rot: 1440, ease: 'step' }, { t: 17.8, o: 0, ease: 'step' })
  return k
}

export default svgLevel({
  id: 806,
  chapter: 'cartoon',
  title: 'cartoonRunawayEgg',
  parTimeSec: 100,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const blink = (period: number, phase = 0) => (m: string) => anim({ type: 'blink', duty: 0.07, period, phase }, m)
    const flap = (pivot: [number, number], phase: number) => (m: string) =>
      anim({ type: 'keys', period: 0.3, phase, keys: [{ t: 0, sx: 1 }, { t: 0.15, sx: 0.3, ease: 'inOut' }], pivot }, m)
    const beat = (pivot: [number, number], every: number, phase = 0) => (m: string) =>
      anim({ type: 'keys', period: every, phase, keys: [{ t: 0, sy: 1 }, { t: every / 2, sy: 0.3, ease: 'inOut' }], pivot }, m)
    const sway = (pivot: [number, number], angle: number, period: number) => (m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 13) / 13 }, m)

    // --- Sky, sun, the far mountain, far acacias, vultures. ---
    let farAcacias = ''
    for (const [fx, fy, s] of [[120, 600, 0.6], [420, 590, 0.5], [760, 604, 0.55], [1380, 596, 0.6], [980, 612, 0.4]] as [number, number, number][]) {
      farAcacias += `<path d="M${fx} ${fy}v-${40 * s}" stroke="#8a7a5a" stroke-width="${4 * s}"/><ellipse cx="${fx}" cy="${fy - 44 * s}" rx="${60 * s}" ry="${10 * s}" fill="#8f9a5a" fill-opacity="0.8"/>`
    }
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c9-sky)"/>` +
      `<circle cx="1180" cy="150" r="200" fill="url(#c9-glow)"/>` +
      `<circle cx="1180" cy="150" r="48" fill="#ffd56a" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="1166" cy="142" rx="4.5" ry="7" fill="${INK}"/><ellipse cx="1194" cy="142" rx="4.5" ry="7" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.4, phase: 0.3 }, `<rect x="1156" y="134" width="48" height="18" fill="#ffd56a"/><path d="M1158 143h12M1188 143h12" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<path d="M1162 164q18 14 36 0" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>` +
      anim({ type: 'path', points: [[0, 0], [120, 0]], period: 40 }, puffCloud(300, 130, 0.9)) +
      anim({ type: 'path', points: [[0, 0], [-90, 0]], period: 32 }, puffCloud(820, 200, 0.6)) +
      // The flat-topped mountain in the haze.
      `<path d="M700 640l170-150q30-20 60-24h60q30 4 60 24l200 150z" fill="url(#c9-mountain)"/><path d="M880 482q20-14 50-16h60q30 2 50 16l-24 10q-30-8-56 2q-30-10-56 0z" fill="#fff" fill-opacity="0.85"/>` +
      `<rect y="560" width="${W}" height="90" fill="url(#c9-haze)"/>` +
      farAcacias +
      // Vultures circling.
      [[420, 230, 0], [470, 250, 0.4]].map(([vx, vy, ph]) => anim({ type: 'path', points: [[0, 0], [60, -20], [120, 0], [60, 20]], period: 7, phase: ph }, farBird(vx, vy, beat([vx, vy - 2], 1.2, ph)))).join('')

    // --- The ground: dry golden grass, red earth, stones. ---
    let ground =
      `<rect y="640" width="${W}" height="${H - 640}" fill="url(#c9-ground)"/>` +
      `<path d="M0 820q300-30 520-24t380 10t540-14V900H0z" fill="#c9a060" fill-opacity="0.45"/>` +
      `<path d="M380 860q160-24 300-14M760 880q120-16 260-8" fill="none" stroke="#a8743f" stroke-opacity="0.4" stroke-width="3" stroke-linecap="round"/>`
    for (let i = 0; i < 14; i++) {
      const sx = Math.round(rand() * W)
      const sy = Math.round(800 + rand() * 90)
      ground += `<ellipse cx="${sx}" cy="${sy}" rx="${Math.round(4 + rand() * 6)}" ry="3" fill="#b89a6a" ${Ow(1)}/>`
    }
    const dryTuft = (x: number, y: number, s = 1) =>
      `<path d="M${x - 8 * s} ${y}q-2-${22 * s} -8-${34 * s}M${x} ${y}q2-${26 * s} 0-${42 * s}M${x + 8 * s} ${y}q4-${20 * s} 10-${30 * s}M${x - 3 * s} ${y}q-6-${14 * s}-14-${18 * s}" fill="none" stroke="#c99a3a" stroke-width="${3 * s}" stroke-linecap="round"/>` +
      `<path d="M${x} ${y - 42 * s}l-2-${8 * s}M${x - 16 * s} ${y - 34 * s}l-3-${6 * s}" stroke="#e8c070" stroke-width="${3 * s}" stroke-linecap="round"/>`
    let tufts = ''
    for (let i = 0; i < 34; i++) {
      const tx = Math.round(rand() * W)
      const ty = Math.round(660 + rand() * 230)
      if (Math.abs(tx - HIPPO[0]) < 200 && Math.abs(ty - 812) < 60) continue
      if (tx > 480 && tx < 700 && ty > 770 && ty < 830) continue
      tufts += sway([tx, ty], 6, 2.6)(dryTuft(tx, ty, 0.7 + rand() * 0.5))
    }

    // --- The baobab: the game's owl in its hollow, fruit hanging from it (one fewer in B). ---
    const fruit = (fx: number, fy: number) =>
      `<path d="M${fx} ${fy - 30}v20" stroke="#6e5a3a" stroke-width="1.6"/><ellipse cx="${fx}" cy="${fy}" rx="7" ry="12" fill="#a8a88a" ${Ow(1.4)}/><path d="M${fx - 3} ${fy - 6}q2 6 0 12" stroke="#fff" stroke-opacity="0.4" stroke-width="2"/>`
    const leafTuft = (lx: number, ly: number) =>
      `<circle cx="${lx}" cy="${ly}" r="18" fill="url(#c9-leaf)" ${Ow(1.6)}/><circle cx="${lx + 16}" cy="${ly + 6}" r="12" fill="url(#c9-leaf)" ${Ow(1.4)}/><circle cx="${lx - 14}" cy="${ly + 6}" r="11" fill="url(#c9-leaf)" ${Ow(1.4)}/>`
    const baobab =
      groundShadow(130, 772, 130, 14) +
      `<path d="M55 770q-24-150 24-232q14-30 26-68h56q12 38 26 68q48 82 24 232z" fill="url(#c9-baobab)" ${O}/>` +
      `<path d="M90 740q-10-110 18-200M130 760q-4-120 4-260M170 740q10-110-14-200" fill="none" stroke="#7a6248" stroke-opacity="0.45" stroke-width="3" stroke-linecap="round"/>` +
      // Stubby branches.
      `<path d="M110 476q-30-30-80-60M118 472q-8-40-20-86M140 470q10-46 14-96M152 476q40-36 86-66" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>` +
      `<path d="M110 476q-30-30-80-60M118 472q-8-40-20-86M140 470q10-46 14-96M152 476q40-36 86-66" fill="none" stroke="#9a8264" stroke-width="11" stroke-linecap="round"/>` +
      sway([130, 470], 1.2, 5.4)(leafTuft(30, 410) + leafTuft(98, 380) + leafTuft(156, 368) + leafTuft(240, 404)) +
      sway([30, 420], 6, 2.8)(fruit(34, 450)) + sway([156, 378], 6, 3.1)(fruit(160, 410)) +
      diff(236, 434, 22, sway([236, 412], 6, 2.9)(fruit(236, 440)), '') +
      `<ellipse cx="130" cy="640" rx="19" ry="25" fill="#3a2414" ${Ow(1.8)}/>` +
      keenOwl(130, 660, 0.7, blink(3.2, 0.2))

    // --- The termite mound (a side spire in A only), the meerkats' burrow, an aloe (its flowers red in A, yellow in B). ---
    const termites =
      groundShadow(470, 712, 60, 8) +
      `<path d="M420 712q6-60 26-90q6-30 18-52q12 22 16 52q22 30 30 90z" fill="url(#c9-clay)" ${O}/>` +
      `<path d="M500 712q4-40 12-56q10 16 10 56z" fill="url(#c9-clay)" ${Ow(2)}/>` +
      `<path d="M446 690q6-40 18-60M474 700q2-30-4-60" fill="none" stroke="#8a4a2a" stroke-opacity="0.45" stroke-width="2.4"/><ellipse cx="468" cy="660" rx="4" ry="6" fill="#5a2a14"/>` +
      diff(440, 644, 22, `<path d="M432 664q2-24 8-36q8 12 8 36z" fill="url(#c9-clay)" ${Ow(1.8)}/>`, '')
    const aloeFlowers = (c: string) =>
      `<path d="M712 778q2-34-2-56" fill="none" stroke="#6a8a4a" stroke-width="3"/>` +
      [722, 730, 738, 746, 754].map((fy, i) => `<ellipse cx="${710 + (i % 2 ? 4 : -4)}" cy="${fy}" rx="3" ry="6" fill="${c}" ${Ow(1)}/>`).join('')
    const aloe =
      groundShadow(706, 804, 34, 5) +
      diff(712, 738, 24, aloeFlowers('#e63946'), aloeFlowers('#ffb703')) +
      [[-30, -10], [-18, -26], [0, -32], [18, -26], [30, -10]].map(([dx, dy]) => `<path d="M706 802q${dx / 2} ${dy / 2 - 10} ${dx} ${dy}q${-dx / 3} ${dy / 3 + 16} ${-dx + 4} ${-dy}z" fill="#7fae7a" ${Ow(1.4)}/>`).join('')
    const burrow = `<ellipse cx="590" cy="812" rx="76" ry="14" fill="#b07a44" ${Ow(1.6)}/><ellipse cx="560" cy="810" rx="12" ry="5" fill="#3a2414"/><ellipse cx="626" cy="812" rx="10" ry="4" fill="#3a2414"/>`

    // --- The acacia: a hornbill on top (its casque in A only), a weaver's nest hanging under it (A only). ---
    const hornbill =
      `<path d="M1120 450v-6M1126 450v-6" stroke="${INK}" stroke-width="2"/>` +
      `<ellipse cx="1124" cy="432" rx="12" ry="14" fill="#2b2b3a" ${Ow(1.6)}/><path d="M1130 436l10 14l-12-4z" fill="#fff" ${Ow(1.2)}/>` +
      `<circle cx="1112" cy="416" r="8" fill="#2b2b3a" ${Ow(1.6)}/><circle cx="1110" cy="414" r="1.6" fill="#fff"/>` +
      `<path d="M1106 414q-14-2-22 10q12-2 22-4z" fill="#ffb703" ${Ow(1.4)}/><path d="M1084 424l-3 3" stroke="#e63946" stroke-width="3"/>`
    const acacia =
      groundShadow(1170, 784, 120, 12) +
      `<path d="M1164 784q4-120-6-200l-40-60M1162 600l50-80M1160 640l-70-90" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>` +
      `<path d="M1164 784q4-120-6-200l-40-60M1162 600l50-80M1160 640l-70-90" fill="none" stroke="#7a5a3a" stroke-width="11" stroke-linecap="round"/>` +
      sway([1170, 500], 1, 5)(
        `<ellipse cx="1180" cy="486" rx="134" ry="26" fill="url(#c9-acacia)" ${O}/><ellipse cx="1150" cy="468" rx="100" ry="20" fill="url(#c9-acacia)" ${O}/>` +
          `<path d="M1070 482q20-6 40 0M1150 470q20-6 40 0M1230 488q20-6 40 0M1120 496q16-4 32 0" fill="none" stroke="#4f6a2a" stroke-opacity="0.6" stroke-width="3" stroke-linecap="round"/>`) +
      hornbill +
      diff(1101, 424, 18, `<path d="M1088 414q6-12 18-6l2 6z" fill="#e8a33b" ${Ow(1.2)}/>`, '') +
      diff(1062, 514, 24, sway([1062, 496], 6, 3)(`<path d="M1062 494v12" stroke="#7a5a3a" stroke-width="2"/><path d="M1050 516q12-16 24 0q2 14-12 18q-14-4-12-18z" fill="#c9a86a" ${Ow(1.4)}/><circle cx="1062" cy="530" r="3" fill="#3a2414"/>`), '')

    // --- The waterhole with papyrus, the hippo (in B an oxpecker on its head), zebras grazing beyond (a stripe fewer
    // on one in B: a hard one). ---
    const papyrus = (x: number, y: number, h: number) =>
      sway([x, y], 4, 2.6)(`<path d="M${x} ${y}v-${h}" stroke="#5f8f2e" stroke-width="3"/>` + [-40, -15, 15, 40].map((a) => `<path transform="rotate(${a} ${x} ${y - h})" d="M${x} ${y - h}v-16" stroke="#7fae3a" stroke-width="2"/>`).join('') + `<circle cx="${x}" cy="${y - h}" r="3" fill="#7fae3a"/>`)
    const zebra = (x: number, y: number, s: number, stripes: string, headId: number) => {
      const k = (n: number) => Math.round(n * s * 10) / 10
      return (
        groundShadow(x, y, k(36), k(5)) +
        `<path d="M${x - k(22)} ${y}v-${k(30)}M${x - k(12)} ${y}v-${k(30)}M${x + k(14)} ${y}v-${k(30)}M${x + k(24)} ${y}v-${k(30)}" stroke="${INK}" stroke-width="${k(6)}" stroke-linecap="round"/><path d="M${x - k(22)} ${y}v-${k(30)}M${x - k(12)} ${y}v-${k(30)}M${x + k(14)} ${y}v-${k(30)}M${x + k(24)} ${y}v-${k(30)}" stroke="#f4f1e8" stroke-width="${k(3.4)}" stroke-linecap="round"/>` +
        `<ellipse cx="${x}" cy="${y - k(40)}" rx="${k(34)}" ry="${k(16)}" fill="#f4f1e8" ${Ow(1.8)}/>` + stripes +
        `<path d="M${x + k(32)} ${y - k(46)}q${k(8)} ${k(10)} ${k(4)} ${k(24)}" fill="none" stroke="${INK}" stroke-width="${k(2)}"/>` +
        anim({ type: 'keys', period: 4 + headId, phase: headId * 0.3, keys: [{ t: 0, rot: 0 }, { t: 1, ease: 'inOut' }, { t: 1.6, rot: -50 }, { t: 3, ease: 'inOut' }, { t: 3.6, rot: 0 }], pivot: [x - k(28), y - k(46)] },
          `<path d="M${x - k(26)} ${y - k(50)}l-${k(20)} -${k(20)}l-${k(10)} ${k(8)}l${k(16)} ${k(24)}z" fill="#f4f1e8" ${Ow(1.6)}/>` +
            `<path d="M${x - k(36)} ${y - k(62)}l${k(8)} ${k(6)}M${x - k(42)} ${y - k(56)}l${k(8)} ${k(6)}" stroke="${INK}" stroke-width="${k(2.4)}"/>` +
            `<ellipse cx="${x - k(50)}" cy="${y - k(64)}" rx="${k(9)}" ry="${k(6)}" fill="#f4f1e8" ${Ow(1.6)}/><circle cx="${x - k(56)}" cy="${y - k(64)}" r="${k(2.4)}" fill="${INK}"/>` +
            `<path d="M${x - k(44)} ${y - k(72)}l${k(2)}-${k(8)}l${k(4)} ${k(6)}" fill="#f4f1e8" ${Ow(1.2)}/><path d="M${x - k(38)} ${y - k(74)}q${k(10)} ${k(4)} ${k(14)} ${k(16)}" fill="none" stroke="${INK}" stroke-width="${k(4)}" stroke-linecap="round"/>`)
      )
    }
    const bodyStripes = (x: number, y: number, s: number, skip = -1) =>
      [-22, -12, -2, 8, 18]
        .map((dx, i) => (i === skip ? '' : `<path d="M${x + dx * s} ${y - 54 * s}q${3 * s} ${12 * s} 0 ${26 * s}" fill="none" stroke="${INK}" stroke-width="${3.4 * s}" stroke-linecap="round"/>`))
        .join('')
    const zebras =
      zebra(1250, 712, 1, bodyStripes(1250, 712, 1, 2) + diff(1248, 670, 18, `<path d="M1248 658q3 12 0 26" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>`, ''), 0) +
      zebra(1340, 724, 0.85, bodyStripes(1340, 724, 0.85), 1)
    const pond =
      `<ellipse cx="1010" cy="816" rx="182" ry="52" fill="#a8743f" ${Ow(1.8)}/>` +
      `<ellipse cx="1010" cy="812" rx="174" ry="46" fill="url(#c9-water)" ${Ow(1.4)}/>` +
      anim({ type: 'keys', period: 3, keys: [{ t: 0, x: 0 }, { t: 1.5, x: 12, ease: 'inOut' }] }, `<path d="M880 800h50M1100 830h60M940 842h70" stroke="#fff" stroke-opacity="0.55" stroke-width="3" stroke-linecap="round"/>`)
    const [hx, hy] = HIPPO
    const hippoEyes =
      once(showIn([0, 10.9], [11.8, LOOP]), HIPPO, `<circle cx="${hx - 30}" cy="${hy - 34}" r="2.4" fill="${INK}"/><circle cx="${hx - 16}" cy="${hy - 35}" r="2.4" fill="${INK}"/>`) +
      once(showIn([10.9, 11.8]), HIPPO, `<circle cx="${hx - 30}" cy="${hy - 36}" r="5" fill="#fff" ${Ow(1.2)}/><circle cx="${hx - 16}" cy="${hy - 37}" r="5" fill="#fff" ${Ow(1.2)}/><circle cx="${hx - 30}" cy="${hy - 36}" r="1.6" fill="${INK}"/><circle cx="${hx - 16}" cy="${hy - 37}" r="1.6" fill="${INK}"/>`)
    const oxpecker = diff(
      hx - 22,
      hy - 58,
      27,
      '',
      once(showIn([9.6, 12.4]), HIPPO,
        once([{ t: 0, y: 0 }, { t: 10.9, ease: 'out' }, { t: 11.15, y: -16, ease: 'in' }, { t: 11.4, y: 0 }, { t: 19.95, ease: 'step' }], [hx - 22, hy - 44],
          `<path d="M${hx - 20} ${hy - 44}v-3M${hx - 24} ${hy - 44}v-3" stroke="${INK}" stroke-width="1.4"/>` +
            `<ellipse cx="${hx - 22}" cy="${hy - 52}" rx="8" ry="6" fill="#8a6a3e" ${Ow(1.3)}/><path d="M${hx - 14} ${hy - 52}l8 4l-8 2z" fill="#8a6a3e" ${Ow(1.1)}/>` +
            `<circle cx="${hx - 28}" cy="${hy - 58}" r="4.4" fill="#8a6a3e" ${Ow(1.2)}/><path d="M${hx - 32} ${hy - 59}l-6 1l6 2z" fill="#e63946" ${Ow(0.8)}/><circle cx="${hx - 29}" cy="${hy - 59}" r="1.4" fill="#ffd23f"/>`)),
      'hippo',
      during(9.6, 12.4),
    )
    const hippo = keys('hippo', [
      { t: 0, y: 0, sy: 1 }, { t: 10.85, ease: 'out' }, { t: 10.95, y: 3, sy: 0.82, ease: 'out' }, { t: 11.2, y: 0, sy: 1 }, { t: 19.95, ease: 'step' },
    ], HIPPO,
      `<path d="M${hx + 10} ${hy}q4-30 50-30q44 0 52 30z" fill="url(#c9-hippo)" ${Ow(2)}/>` +
        `<path d="M${hx - 60} ${hy}q-2-20 18-26q10-14 30-12q20-8 32 6q10 12 8 32z" fill="url(#c9-hippo)" ${Ow(2)}/>` +
        `<ellipse cx="${hx - 54}" cy="${hy - 18}" rx="4" ry="2.6" fill="#5a3a4a"/><ellipse cx="${hx - 44}" cy="${hy - 20}" rx="4" ry="2.6" fill="#5a3a4a"/>` +
        `<circle cx="${hx - 30}" cy="${hy - 34}" r="7" fill="url(#c9-hippo)" ${Ow(1.6)}/><circle cx="${hx - 16}" cy="${hy - 35}" r="7" fill="url(#c9-hippo)" ${Ow(1.6)}/>` +
        `<ellipse cx="${hx - 4}" cy="${hy - 38}" rx="4" ry="6" fill="#c98a9a" ${Ow(1.4)}/><ellipse cx="${hx + 6}" cy="${hy - 36}" rx="4" ry="6" fill="#c98a9a" ${Ow(1.4)}/>` +
        hippoEyes + oxpecker) +
      anim({ type: 'keys', period: 2.2, keys: [{ t: 0, sx: 0.8, sy: 0.8, o: 0.8 }, { t: 2.2, sx: 1.4, sy: 1.4, o: 0 }], pivot: [hx, hy] }, `<ellipse cx="${hx}" cy="${hy}" rx="80" ry="10" fill="none" stroke="#fff" stroke-width="2"/>`)

    // --- The giraffe (a patch of its coat fewer in B: a hard one). ---
    const [gx, gy] = GIRAFFE
    const patch = (px: number, py: number, s = 1) =>
      `<path d="M${px - 8 * s} ${py - 2 * s}l${5 * s}-${7 * s}l${8 * s} ${1 * s}l${4 * s} ${7 * s}l-${4 * s} ${7 * s}l-${9 * s} ${1 * s}z" fill="#c9742a"/>`
    const leg = (x: number, flip: boolean) =>
      keys(undefined, swingKeys([WALK], 0.32, 14, flip), [x, gy - 150],
        `<path d="M${x} ${gy - 150}v148" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M${x} ${gy - 150}v148" stroke="#f2c46a" stroke-width="8" stroke-linecap="round"/>` +
          `<circle cx="${x}" cy="${gy - 74}" r="5.5" fill="#e8b45a" ${Ow(1.4)}/><path d="M${x - 5} ${gy - 4}h10" stroke="#3a2414" stroke-width="6" stroke-linecap="round"/>`)
    const giraffeHead =
      `<path d="M${gx - 30} ${gy - 168}q-14-80-34-146l14-6q26 66 40 146z" fill="url(#c9-giraffe)" ${Ow(2)}/>` +
      `<path d="M${gx - 20} ${gy - 178}q-14-70-32-132" fill="none" stroke="#a8582a" stroke-width="5" stroke-linecap="round"/>` +
      patch(gx - 38, gy - 200, 0.9) + patch(gx - 46, gy - 238, 0.8) + patch(gx - 54, gy - 276, 0.7) + patch(gx - 34, gy - 256, 0.6) +
      `<path d="M${gx - 66} ${gy - 334}v-14M${gx - 56} ${gy - 336}v-14" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><circle cx="${gx - 66}" cy="${gy - 349}" r="3.4" fill="#5a3a24" ${Ow(1.2)}/><circle cx="${gx - 56}" cy="${gy - 351}" r="3.4" fill="#5a3a24" ${Ow(1.2)}/>` +
      `<ellipse cx="${gx - 76}" cy="${gy - 326}" rx="24" ry="12" transform="rotate(18 ${gx - 76} ${gy - 326})" fill="url(#c9-giraffe)" ${Ow(2)}/>` +
      `<ellipse cx="${gx - 94}" cy="${gy - 318}" rx="9" ry="8" fill="#e8b45a" ${Ow(1.6)}/><circle cx="${gx - 96}" cy="${gy - 320}" r="1.4" fill="${INK}"/>` +
      `<path d="M${gx - 48} ${gy - 336}l14-6l-4 10z" fill="#f2c46a" ${Ow(1.4)}/>` +
      `<circle cx="${gx - 70}" cy="${gy - 332}" r="3.4" fill="${INK}"/><circle cx="${gx - 69}" cy="${gy - 333}" r="1" fill="#fff"/><path d="M${gx - 76} ${gy - 337}l-3-3M${gx - 72} ${gy - 339}l-1-4" stroke="${INK}" stroke-width="1.4"/>` +
      `<path d="M${gx - 100} ${gy - 312}q6 4 12 2" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`
    const giraffe = keys('giraffe', giraffeKeys, GIRAFFE,
      groundShadow(gx + 10, gy, 80, 8) +
        leg(gx + 34, false) + leg(gx - 26, true) +
        anim({ type: 'sway', angle: 14, pivot: [gx + 66, gy - 172], period: 2.2 }, `<path d="M${gx + 66} ${gy - 172}q10 30 4 56" fill="none" stroke="${INK}" stroke-width="3"/><path d="M${gx + 70} ${gy - 120}l4 12l-8-2z" fill="#3a2414"/>`) +
        `<ellipse cx="${gx + 8}" cy="${gy - 165}" rx="62" ry="32" fill="url(#c9-giraffe)" ${Ow(2.2)}/>` +
        patch(gx - 30, gy - 170) + patch(gx - 10, gy - 182) + patch(gx + 14, gy - 168) + patch(gx + 36, gy - 180) + patch(gx + 50, gy - 160, 0.8) + patch(gx - 16, gy - 152, 0.8) +
        diff(gx + 16, gy - 186, 18, patch(gx + 16, gy - 186, 0.75), '', 'giraffe') +
        leg(gx + 54, true) + leg(gx - 6, false) +
        keys('neck', neckKeys(), NECK, giraffeHead))
    // In B the giraffe sticks its long tongue out at the chick (its head is still then: drawn where its mouth is).
    const [tx, ty] = mouthAt(LOOK)
    const tongue = diff(
      tx - 10,
      ty + 6,
      22,
      '',
      once(showIn([17.8, 19.6]), [tx, ty],
        anim({ type: 'keys', period: 0.6, id: 'tongue', keys: [{ t: 0, rot: -10 }, { t: 0.3, rot: 14, ease: 'inOut' }], pivot: [tx, ty] },
          `<path d="M${tx} ${ty}q-10 4-18 14q4 4 8 0q4-8 12-8z" fill="#6a4a9a" ${Ow(1.4)}/>`)),
      'tongue',
      during(17.8, 19.6),
    )

    // --- The ostrich: head in the sand for most of the story. ---
    const [ox, oy] = OST
    const [nx, ny] = NECK_BASE
    const ostLegs =
      `<path d="M${ox - 8} ${oy - 84}q-6 40 2 78l-12 6M${ox + 12} ${oy - 84}q8 42 0 78l-12 6" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="M${ox - 8} ${oy - 84}q-6 40 2 78l-12 6M${ox + 12} ${oy - 84}q8 42 0 78l-12 6" fill="none" stroke="#e8b0a0" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round"/>`
    const ostHead =
      `<path d="M${nx - 6} ${ny + 4}q-10-50-26-100l10-4q16 48 26 100z" fill="#e8b0a0" ${Ow(2)}/>` +
      `<circle cx="${nx - 32}" cy="${ny - 105}" r="11" fill="#e8c0b0" ${Ow(1.8)}/>` +
      `<path d="M${nx - 42} ${ny - 108}l-16 3l16 5z" fill="#e8a33b" ${Ow(1.4)}/>` +
      once(showIn([0, 4.3], [18.6, 18.9]), NECK_BASE, `<circle cx="${nx - 36}" cy="${ny - 108}" r="4.4" fill="#fff" ${Ow(1.2)}/><circle cx="${nx - 37}" cy="${ny - 108}" r="2" fill="${INK}"/><path d="M${nx - 40} ${ny - 113}l-3-3M${nx - 36} ${ny - 114}v-4M${nx - 32} ${ny - 113}l2-3" stroke="${INK}" stroke-width="1.4"/>`) +
      // Startled by the rustle.
      once(showIn([4.3, 5.2]), NECK_BASE, `<circle cx="${nx - 36}" cy="${ny - 108}" r="6.4" fill="#fff" ${Ow(1.4)}/><circle cx="${nx - 38}" cy="${ny - 108}" r="1.8" fill="${INK}"/>`) +
      // Head out at last, sand on it, delighted with its chick.
      once(showIn([18.9, LOOP]), NECK_BASE, `<path d="M${nx - 41} ${ny - 108}q5-5 10 0" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>`) +
      once(showIn([18.5, LOOP]), NECK_BASE, `<path d="M${nx - 44} ${ny - 114}q12-12 24 0z" fill="#e3c98f" ${Ow(1.2)}/>`)
    const ostrich = keys('ostrich', [
      { t: 0, rot: 0 }, { t: DIVE[0], ease: 'in' }, { t: DIVE[0] + 0.25, rot: -25, ease: 'step' }, { t: DIVE[1], ease: 'out' }, { t: DIVE[1] + 0.3, rot: 0 }, { t: 19.95, ease: 'step' },
    ], OST,
      groundShadow(ox + 6, oy, 46, 6) +
        ostLegs +
        anim({ type: 'sway', angle: 10, pivot: [ox + 40, oy - 112], period: 0.5 },
          `<path d="M${ox + 36} ${oy - 118}q30-20 42-6q-6 6 4 14q-16 8-40 4z" fill="#fff" ${Ow(1.8)}/>`) +
        `<ellipse cx="${ox + 12}" cy="${oy - 114}" rx="48" ry="30" fill="url(#c9-ostrich)" ${Ow(2.2)}/>` +
        `<path d="M${ox - 10} ${oy - 110}q20 12 50 6" fill="none" stroke="#fff" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round"/>` +
        keys(undefined, [
          { t: 0, rot: 0 }, { t: 4.2, ease: 'out' }, { t: 4.4, rot: 8 }, { t: DIVE[0], ease: 'in' }, { t: DIVE[0] + 0.25, rot: -125, ease: 'step' },
          { t: DIVE[1], ease: 'out' }, { t: DIVE[1] + 0.3, rot: 0, ease: 'inOut' }, { t: 18.9, rot: 0, ease: 'inOut' }, { t: 19.2, rot: 10, ease: 'step' },
        ], NECK_BASE, ostHead))
    const sandHeap = once(showIn([DIVE[0] + 0.2, DIVE[1] + 0.1]), HEAD_IN,
      `<path d="M${HEAD_IN[0] - 24} ${HEAD_IN[1] + 2}q24-18 48 0z" fill="#e3c98f" ${Ow(1.6)}/><circle cx="${HEAD_IN[0] - 10}" cy="${HEAD_IN[1] - 6}" r="1.6" fill="#b08a52"/><circle cx="${HEAD_IN[0] + 8}" cy="${HEAD_IN[1] - 4}" r="1.6" fill="#b08a52"/>`)
    const alarm = once(showIn([4.4, 5]), [nx - 6, ny - 122], `<path d="M${nx - 9} ${ny - 134}h7l-2 18h-3z" fill="#e63946" ${Ow(1.4)}/><circle cx="${nx - 6}" cy="${ny - 110}" r="3" fill="#e63946" ${Ow(1.2)}/>`)

    // --- The tall grass that rustles (in B a lion cub peeks out of it). ---
    const GRASS: [number, number] = [96, 798]
    const [cgx, cgy] = GRASS
    const rustle = (m: string) => anim({ type: 'keys', period: LOOP, keys: [{ t: 0, rot: 0 }, { t: 4.1, ease: 'inOut' }, ...[4.25, 4.4, 4.55, 4.7, 4.85, 5].map((t, i) => ({ t, rot: i % 2 ? -8 : 8, ease: 'inOut' as const })), { t: 5.15, rot: 0 }, { t: 19.95, ease: 'step' }], pivot: [cgx, cgy] }, m)
    const cub = diff(
      cgx,
      cgy - 55,
      28,
      '',
      keys('cub', [{ t: 0, y: 30, o: 0, ease: 'step' }, { t: 4.2, o: 1, ease: 'out' }, { t: 4.6, y: 0 }, { t: 5.8, ease: 'in' }, { t: 6.15, y: 30, o: 1, ease: 'step' }, { t: 6.2, o: 0, ease: 'step' }], GRASS,
        `<circle cx="${cgx}" cy="${cgy - 52}" r="17" fill="#d9a04a" ${Ow(1.6)}/>` +
          `<circle cx="${cgx - 12}" cy="${cgy - 66}" r="6" fill="#d9a04a" ${Ow(1.4)}/><circle cx="${cgx + 12}" cy="${cgy - 66}" r="6" fill="#d9a04a" ${Ow(1.4)}/>` +
          `<ellipse cx="${cgx}" cy="${cgy - 46}" rx="9" ry="7" fill="#f4dca8"/><path d="M${cgx - 3} ${cgy - 50}h6l-3 4z" fill="#5a3a24"/>` +
          `<circle cx="${cgx - 6}" cy="${cgy - 56}" r="2.2" fill="${INK}"/><circle cx="${cgx + 6}" cy="${cgy - 56}" r="2.2" fill="${INK}"/>`),
      'cub',
      during(4.2, 6.2),
    )
    const grassBack = rustle(dryTuft(cgx - 14, cgy, 1.4) + dryTuft(cgx + 16, cgy, 1.3))
    const grassFront = rustle(dryTuft(cgx, cgy + 4, 1.5) + dryTuft(cgx - 26, cgy + 2, 1.1) + dryTuft(cgx + 26, cgy + 3, 1.2))

    // --- The meerkats, passing the egg. ---
    const meerkat = (x: number, y: number, i: number) => {
      const catchT = [7.6, 8.15, 8.6][i]
      const k: Keyframe[] = [
        { t: 0, y: 0, sy: 1, rot: 0 },
        { t: catchT, ease: 'out' },
        { t: catchT + 0.15, sy: 1.1, ease: 'inOut' },
        { t: catchT + 0.35, sy: 1 },
      ]
      if (i === 2) k.push({ t: 8.95, ease: 'inOut' }, { t: 9.05, sy: 0.88, ease: 'out' }, { t: 9.2, y: -12, sy: 1.08, rot: 8, ease: 'in' }, { t: 9.4, y: 0, sy: 1, rot: 0 })
      // Watching the giraffe stroll past.
      k.push({ t: 14, ease: 'inOut' }, { t: 14.4, rot: i % 2 ? 8 : -8, ease: 'inOut' }, { t: 15.6, ease: 'inOut' }, { t: 16, rot: 0 }, { t: 19.95, ease: 'step' })
      return keys(undefined, k, [x, y],
        groundShadow(x, y, 16, 3) +
          `<path d="M${x + 6} ${y - 4}q16 0 18 8" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${x + 6} ${y - 4}q16 0 18 8" fill="none" stroke="#c9a06a" stroke-width="3" stroke-linecap="round"/>` +
          `<ellipse cx="${x}" cy="${y - 24}" rx="11" ry="24" fill="url(#c9-meerkat)" ${Ow(1.8)}/><ellipse cx="${x}" cy="${y - 20}" rx="6" ry="16" fill="#f0dcb4"/>` +
          `<circle cx="${x}" cy="${y - 52}" r="10" fill="url(#c9-meerkat)" ${Ow(1.8)}/>` +
          `<circle cx="${x - 9}" cy="${y - 58}" r="3" fill="#8a6a3e" ${Ow(1.2)}/><circle cx="${x + 9}" cy="${y - 58}" r="3" fill="#8a6a3e" ${Ow(1.2)}/>` +
          `<ellipse cx="${x - 4}" cy="${y - 53}" rx="3" ry="3.6" fill="#3a2414"/><ellipse cx="${x + 4}" cy="${y - 53}" rx="3" ry="3.6" fill="#3a2414"/>` +
          anim({ type: 'blink', duty: 0.08, period: 2.6 + i * 0.4, phase: i * 0.3 }, `<path d="M${x - 7} ${y - 53}h6M${x + 1} ${y - 53}h6" stroke="#c9a06a" stroke-width="5"/>`) +
          `<circle cx="${x - 3.6}" cy="${y - 54}" r="1" fill="#fff"/><circle cx="${x + 4.4}" cy="${y - 54}" r="1" fill="#fff"/><ellipse cx="${x}" cy="${y - 46}" rx="2.6" ry="2" fill="${INK}"/>` +
          `<path d="M${x - 9} ${y - 36}q4 6 6 0M${x + 3} ${y - 36}q4 6 6 0" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M${x - 9} ${y - 36}q4 6 6 0M${x + 3} ${y - 36}q4 6 6 0" fill="none" stroke="#c9a06a" stroke-width="2.4" stroke-linecap="round"/>`)
    }
    const meerkats = MEERKATS.map(([x, y], i) => meerkat(x, y, i)).join('')

    // --- The egg, the nest, the chick. ---
    const [ex, ey] = EGG
    const eggShape = `<ellipse cx="${ex}" cy="${ey}" rx="14" ry="18" fill="url(#c9-egg)" ${Ow(1.8)}/><path d="M${ex - 6} ${ey - 8}q2-4 6-5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`
    const egg = once(eggKeys(), EGG, eggShape)
    const [nx0, ny0] = NEST
    const nestBack = `<ellipse cx="${nx0}" cy="${ny0}" rx="44" ry="13" fill="#c9a060" ${Ow(1.8)}/><path d="M${nx0 - 36} ${ny0 - 4}l20 6M${nx0 - 10} ${ny0 - 10}l18 4M${nx0 + 14} ${ny0 - 8}l20 8" stroke="#8a6a3e" stroke-width="2"/>`
    const cracks = once(showIn([17.3, 17.8]), EGG, `<path d="M${ex - 12} ${ey - 4}l6 4l5-6l5 5l6-4" fill="none" stroke="${INK}" stroke-width="1.6"/>`)
    const chick =
      once(showIn([17.8, LOOP]), EGG,
        // The chick's fluffy head, peeping.
        `<circle cx="${ex}" cy="${ey - 14}" r="11" fill="#b8a88a" ${Ow(1.6)}/><path d="M${ex - 6} ${ey - 24}l2-6l3 5l3-6l2 6" fill="none" stroke="${INK}" stroke-width="1.4"/>` +
          `<circle cx="${ex - 4}" cy="${ey - 16}" r="2.2" fill="${INK}"/><circle cx="${ex + 4}" cy="${ey - 16}" r="2.2" fill="${INK}"/>` +
          anim({ type: 'keys', period: 0.5, keys: [{ t: 0, sy: 1 }, { t: 0.25, sy: 0.4, ease: 'inOut' }], pivot: [ex, ey - 10] }, `<path d="M${ex - 4} ${ey - 11}l4 5l4-5z" fill="#e8a33b" ${Ow(1)}/>`) +
          `<path d="M${ex - 14} ${ey - 2}l5-6l5 5l5-6l5 5l5-6l3 6q0 18-14 20q-14-2-14-18z" fill="url(#c9-egg)" ${Ow(1.8)}/>`) +
      // The top of the shell flies up and lands on its head like a hat.
      once([{ t: 0, x: 0, y: 0, rot: 0, o: 0, ease: 'step' }, { t: 17.8, o: 1, ease: 'out' }, { t: 18.1, x: 6, y: -34, rot: 30, ease: 'in' }, { t: 18.4, x: 0, y: -14, rot: 0, ease: 'step' }], [ex, ey - 12],
        `<path d="M${ex - 12} ${ey - 12}q2-16 12-16q10 0 12 16l-5-4l-5 5l-5-5z" fill="url(#c9-egg)" ${Ow(1.6)}/>`)

    // --- Life around: butterflies, dragonflies over the waterhole. ---
    const butterflies =
      anim({ type: 'path', points: [[0, 0], [60, -40], [120, 10], [40, 30]], period: 9 }, butterflyAt(420, 720, ['#ffb703', '#f77f00'], flap([420, 720], 0))) +
      anim({ type: 'path', points: [[0, 0], [-70, -30], [-120, 20], [-40, 40]], period: 10, phase: 0.4 }, butterflyAt(800, 700, ['#fff4d0', '#e8c070'], flap([800, 700], 0.1)))
    const buzz = (pivot: [number, number]) => (m: string) => anim({ type: 'keys', period: 0.1, keys: [{ t: 0, sy: 1 }, { t: 0.05, sy: 0.5 }], pivot }, m)
    const dragonflies = anim({ type: 'path', points: [[0, 0], [80, -20], [150, 10], [70, 20]], period: 7 }, dragonfly(900, 760, buzz([900, 756])))

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c9-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fb0e0"/><stop offset="0.6" stop-color="#cfe2e0"/><stop offset="1" stop-color="#f6e2b0"/></linearGradient>` +
      `<radialGradient id="c9-glow"><stop offset="0" stop-color="#fff0c0" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffd890" stop-opacity="0.4"/><stop offset="1" stop-color="#ffd890" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c9-mountain" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9aa8c0"/><stop offset="1" stop-color="#c8c4b8"/></linearGradient>` +
      `<linearGradient id="c9-haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e2b0" stop-opacity="0"/><stop offset="1" stop-color="#f6e2b0" stop-opacity="0.8"/></linearGradient>` +
      `<linearGradient id="c9-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3c070"/><stop offset="0.6" stop-color="#d9ac58"/><stop offset="1" stop-color="#c8944a"/></linearGradient>` +
      `<linearGradient id="c9-baobab" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a7258"/><stop offset="0.6" stop-color="#b89e80"/><stop offset="1" stop-color="#cdb89a"/></linearGradient>` +
      `<radialGradient id="c9-leaf" cx="0.64" cy="0.28" r="0.85"><stop offset="0" stop-color="#b6d870"/><stop offset="1" stop-color="#5f8a34"/></radialGradient>` +
      `<radialGradient id="c9-acacia" cx="0.64" cy="0.2" r="0.85"><stop offset="0" stop-color="#a8c860"/><stop offset="0.6" stop-color="#6f9a3a"/><stop offset="1" stop-color="#4a6a2a"/></radialGradient>` +
      `<linearGradient id="c9-clay" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8582a"/><stop offset="1" stop-color="#d98a4a"/></linearGradient>` +
      `<radialGradient id="c9-water" cx="0.55" cy="0.35" r="0.75"><stop offset="0" stop-color="#a8d8d0"/><stop offset="1" stop-color="#5f9aa0"/></radialGradient>` +
      `<radialGradient id="c9-hippo" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#c0a0b8"/><stop offset="1" stop-color="#7a5a78"/></radialGradient>` +
      `<radialGradient id="c9-giraffe" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#ffe0a0"/><stop offset="1" stop-color="#e8b45a"/></radialGradient>` +
      `<radialGradient id="c9-ostrich" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#5a5260"/><stop offset="1" stop-color="#2a2430"/></radialGradient>` +
      `<radialGradient id="c9-meerkat" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#e8c890"/><stop offset="1" stop-color="#b08a58"/></radialGradient>` +
      `<radialGradient id="c9-egg" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#e8dcc0"/></radialGradient>` +
      `<radialGradient id="c9-sunlight" cx="0.82" cy="0.15" r="1"><stop offset="0" stop-color="#fff0c0" stop-opacity="0.32"/><stop offset="0.5" stop-color="#fff0c0" stop-opacity="0.07"/><stop offset="1" stop-color="#fff0c0" stop-opacity="0"/></radialGradient>` +
      // The ostrich is not drawn below the sand line: its head in the sand.
      `<clipPath id="c9-sand"><rect width="${W}" height="${SAND_LINE}"/></clipPath></defs>` +
      sky +
      ground +
      zebras +
      termites +
      acacia +
      baobab +
      tufts +
      giraffe +
      pond +
      papyrus(860, 800, 60) + papyrus(876, 806, 74) + papyrus(1172, 798, 66) +
      hippo +
      burrow +
      aloe +
      grassBack +
      cub +
      grassFront +
      `<g clip-path="url(#c9-sand)">${ostrich}</g>` +
      sandHeap +
      alarm +
      nestBack +
      chick +
      cracks +
      meerkats +
      egg +
      tongue +
      butterflies +
      dragonflies +
      `<rect width="${W}" height="${H}" fill="url(#c9-sunlight)"/>`
    )
  },
})
