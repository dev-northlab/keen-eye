// Cartoon "The carrot tug" (docs/cartoon-mode.md), made like 812: a 20 s story in a meadow cut open — the garden above
// the ground, the burrows below — told by a camera. A rabbit hops up to a fat carrot and pulls at its leaves; down in
// its burrow a mole wakes, sees the root wiggle and pulls back: a tug of war, the rabbit's ears stretching, the mole's
// claws digging in — until the carrot snaps. The rabbit flies back into a bush with the top, the mole tumbles down its
// tunnel with the root, and both end up munching happily. Twelve differences: two hard (a knot hole in a fence post, a
// pebble above the tunnel), three events of B (a worm out of the tunnel's roof, an ant with a seed, a baby rabbit out
// of the burrow).
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { bee, butterflyAt, farBird, grassTuft, groundShadow, INK, keenOwl, mouse, NATURE_DEFS, O, Ow, puffCloud, snail } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900
/** The ground line: the garden above, the soil below. */
const GROUND = 470

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // The rabbit hops along the garden to the carrot.
  { t: 1.6, x: 880, y: 300, w: 560, ease: 'inOut' },
  { t: 4, x: 520, y: 300, w: 560, ease: 'step' },
  // Below: the mole wakes as the root wiggles above its bed, and grabs it.
  { t: 4.05, x: 460, y: 520, w: 500, ease: 'linear' },
  { t: 6, x: 470, y: 520, w: 500, ease: 'step' },
  // The tug of war: both ends at once.
  { t: 6.05, x: 420, y: 330, w: 640, ease: 'step' },
  // The rabbit's ears stretching...
  { t: 7.55, x: 640, y: 330, w: 340, ease: 'step' },
  // ...the mole's claws digging in.
  { t: 8.85, x: 560, y: 560, w: 340, ease: 'step' },
  // Both ends again — SNAP.
  { t: 10.05, x: 420, y: 330, w: 640, ease: 'step' },
  // The rabbit flies back into the bush.
  { t: 11.45, x: 720, y: 250, w: 600, ease: 'step' },
  // The mole at the bottom of its tunnel, dazed, the root in its paws.
  { t: 12.65, x: 160, y: 560, w: 480, ease: 'step' },
  // The rabbit out of the bush, leaves on its head.
  { t: 15.05, x: 860, y: 280, w: 480, ease: 'step' },
  // Both munching, above and below.
  { t: 17.05, x: 190, y: 260, w: 1000, ease: 'linear' },
  { t: 19.95, x: 196, y: 262, w: 1000, ease: 'step' },
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

/** The tug: the carrot's lift at each moment (up: the rabbit winning, down: the mole). */
const TUG: [number, number][] = [
  [4.4, -8], [4.9, 6], [5.4, -10], [5.9, 8], [6.4, -12], [6.9, 10], [7.4, -12], [7.9, 10],
  [8.4, -14], [8.9, 12], [9.4, -14], [9.9, 12], [10.4, -16], [10.8, 14], [11, -16],
]
const SNAP = 11

/** The carrot: its shoulders at the ground, its tip down in the mole's bed. */
const CARROT: [number, number] = [720, GROUND]
const carrotKeys: Keyframe[] = [
  { t: 0, y: 0 },
  { t: 4.1, ease: 'inOut' },
  ...TUG.map(([t, v]) => ({ t, y: v, ease: 'inOut' as const })),
  { t: SNAP + 0.01, ease: 'step' },
]

/** The rabbit's feet, by the carrot (it faces left). */
const RABBIT: [number, number] = [800, GROUND]
const BUSH: [number, number] = [1120, GROUND]
function rabbitKeys(): Keyframe[] {
  const k: Keyframe[] = [{ t: 0, x: 200, y: 0, rot: 0 }, { t: 1.6, ease: 'linear' }]
  // Hopping over from beside the cabbage.
  for (let i = 0; i < 4; i++) {
    const t = 1.6 + i * 0.6
    k.push({ t: t + 0.3, x: Math.round(200 - (200 * (i + 0.5)) / 4), y: -30, ease: 'in' }, { t: t + 0.6, x: Math.round(200 - (200 * (i + 1)) / 4), y: 0, ease: 'out' })
  }
  // Grabs the leaves and leans back.
  k.push({ t: 4.4, x: 0, rot: 12, ease: 'inOut' })
  for (const [t, v] of TUG.slice(1)) k.push({ t, x: Math.round(-v * 0.8), rot: 12, ease: 'inOut' })
  // SNAP: flung back over the garden into the bush.
  k.push(
    { t: SNAP + 0.02, ease: 'out' },
    { t: 11.4, x: 160, y: -150, rot: 200, ease: 'in' },
    { t: 11.8, x: BUSH[0] - RABBIT[0], y: 30, rot: 360, ease: 'step' },
    // Out of the top of the bush.
    { t: 15, ease: 'out' },
    { t: 15.3, y: -50 },
    { t: 17, ease: 'inOut' },
    // Down beside it, to munch.
    { t: 17.4, x: 220, y: 0 },
    { t: 19.95, ease: 'step' },
  )
  return k
}

/** The mole's feet, in its bed under the carrot. */
const MOLE: [number, number] = [716, 752]
/** Its tunnel's far chamber (offset of its feet). */
const DEEP: [number, number] = [-416, 78]
const moleKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, rot: 0 },
  { t: 4.6, ease: 'out' },
  { t: 4.8, y: -4, ease: 'inOut' },
  ...TUG.slice(1).map(([t, v]) => ({ t, y: Math.round(v * 0.8), ease: 'inOut' as const })),
  // SNAP: tumbling down its tunnel, root and all.
  { t: SNAP + 0.02, ease: 'in' },
  { t: 11.4, x: -80, y: 14, rot: -160, ease: 'linear' },
  { t: 11.9, x: -260, y: 50, rot: -460, ease: 'linear' },
  { t: 12.4, x: DEEP[0], y: DEEP[1], rot: -720, ease: 'step' },
  { t: 19.95, ease: 'step' },
]

export default svgLevel({
  id: 827,
  chapter: 'cartoon',
  title: 'cartoonCarrotTug',
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
    const chew = (x: number, y: number, rx: number, ry: number) =>
      anim({ type: 'keys', period: 0.3, keys: [{ t: 0, sy: 1 }, { t: 0.15, sy: 0.35, ease: 'inOut' }], pivot: [x, y] }, `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#7a2a2a"/>`)
    const stars = (x: number, y: number) =>
      anim({ type: 'rotate', pivot: [x, y], period: 1.1 },
        [0, 120, 240].map((a) => `<path transform="rotate(${a} ${x} ${y})" d="M${x} ${y - 16}l2 4l4 1l-3 3l1 4l-4-2l-4 2l1-4l-3-3l4-1z" fill="#ffd23f" ${Ow(1)}/>`).join(''))
    const spiral = (x: number, y: number) => `<path d="M${x} ${y}m-1 0a1 1 0 1 1 2 0a2.4 2.4 0 1 1-4.8 0a3.6 3.6 0 1 1 7.2 0" fill="none" stroke="${INK}" stroke-width="1.4"/>`
    const starburst = (x: number, y: number, s: number, fill: string) =>
      `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -40l9 20l21-9l-9 21l23 8l-23 8l9 21l-21-9l-9 20l-9-20l-21 9l9-21l-23-8l23-8l-9-21l21 9z" fill="${fill}" ${Ow(1.8 / s)}/>`

    // --- The sky and the far hills. ---
    const sky =
      `<rect width="${W}" height="${GROUND}" fill="url(#c27-sky)"/>` +
      `<circle cx="1240" cy="110" r="170" fill="url(#c27-glow)"/>` +
      `<circle cx="1240" cy="110" r="40" fill="#ffd56a" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="1228" cy="104" rx="4" ry="6" fill="${INK}"/><ellipse cx="1252" cy="104" rx="4" ry="6" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.3, phase: 0.2 }, `<rect x="1220" y="96" width="42" height="16" fill="#ffd56a"/><path d="M1222 104h11M1247 104h11" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`) +
      `<path d="M1226 122q14 12 28 0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
      anim({ type: 'path', points: [[0, 0], [140, 0]], period: 36 }, puffCloud(240, 110, 1)) +
      anim({ type: 'path', points: [[0, 0], [-110, 0]], period: 30 }, puffCloud(760, 160, 0.8)) +
      keys(undefined, [{ t: 0, x: 0, y: 0 }, { t: 19.9, x: -1600, y: 30 }], [1480, 220],
        ([[1480, 220], [1502, 210], [1504, 232]] as [number, number][]).map(([fx, fy], i) => farBird(fx, fy, beat([fx, fy - 2], 0.5, i * 0.2))).join('')) +
      `<path d="M0 400q180-60 380-24t420-16t400 10t240-30V${GROUND}H0z" fill="url(#c27-far)"/>` +
      `<path d="M0 440q260-36 520-12t520-6t400-10V${GROUND}H0z" fill="url(#c27-hill)"/>`

    // --- The soil, cut open: layers, roots, pebbles, the tunnels and burrows. ---
    const AIR = '#3a2416'
    const tunnel = `M650 690Q480 706 330 768L340 836Q500 776 662 742z`
    const soil =
      `<rect y="${GROUND}" width="${W}" height="${H - GROUND}" fill="url(#c27-soil)"/>` +
      `<path d="M0 560q360 14 720 0t720 6V600q-360-8-720 4t-720-4z" fill="#000" fill-opacity="0.06"/>` +
      `<path d="M0 760q360-16 720 0t720-4V${H}H0z" fill="url(#c27-clay)"/>` +
      `<path d="M0 566q180 8 360 0t360 4t360-2t360 4M0 764q240-12 480 0t480-6t480 4" fill="none" stroke="#2e1a0c" stroke-opacity="0.25" stroke-width="2"/>`
    let grit = ''
    for (let i = 0; i < 160; i++) {
      const gx = Math.round(rand() * W)
      const gy = Math.round(GROUND + 12 + rand() * (H - GROUND - 14))
      grit += `<circle cx="${gx}" cy="${gy}" r="${(1 + rand() * 1.6).toFixed(1)}" fill="#1e1008" fill-opacity="0.3"/>`
    }
    // Decor pebbles (kept clear of the zones).
    const pebble = (x: number, y: number, rx: number, c = '#9a948a') =>
      `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${Math.round(rx * 0.65)}" fill="${c}" ${Ow(1.4)}/><path d="M${x - rx * 0.4} ${y - rx * 0.25}q${rx * 0.3}-${rx * 0.2} ${rx * 0.6} 0" fill="none" stroke="#fff" stroke-opacity="0.4" stroke-width="1.6"/>`
    const pebbles =
      [[90, 530, 12], [210, 690, 9], [420, 600, 14], [470, 880, 11], [880, 700, 10], [930, 860, 13], [1120, 700, 9], [1400, 560, 12], [1380, 790, 15], [60, 860, 10], [820, 820, 8]]
        .map(([x, y, r], i) => pebble(x, y, r, i % 3 ? '#9a948a' : '#b8a48a'))
        .join('')
    // Roots: of the grass, of the bush.
    let roots = ''
    for (let i = 0; i < 18; i++) {
      const rx = Math.round(30 + i * 80 + rand() * 30)
      if (rx > 680 && rx < 760) continue
      const len = Math.round(20 + rand() * 30)
      roots += `<path d="M${rx} ${GROUND + 2}q${Math.round((rand() - 0.5) * 12)} ${len / 2} ${Math.round((rand() - 0.5) * 16)} ${len}" fill="none" stroke="#c9a46a" stroke-opacity="0.7" stroke-width="1.6"/>`
    }
    roots +=
      `<path d="M1090 472q-20 50-50 90M1110 472q4 60-16 120M1130 472q20 40 60 70M1150 472q30 20 40 60" fill="none" stroke="#7a5a32" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M1090 472q-20 50-50 90M1110 472q4 60-16 120M1130 472q20 40 60 70M1150 472q30 20 40 60" fill="none" stroke="#b08a52" stroke-width="2.4" stroke-linecap="round"/>`
    // The mole's tunnel: its bed under the carrot, the tunnel down to its chamber with a nest of straw.
    const burrows =
      `<ellipse cx="716" cy="712" rx="70" ry="48" fill="${AIR}"/><path d="${tunnel}" fill="${AIR}"/>` +
      `<ellipse cx="300" cy="810" rx="92" ry="54" fill="${AIR}"/>` +
      `<ellipse cx="716" cy="712" rx="70" ry="48" fill="none" stroke="#1e1008" stroke-width="3"/>` +
      `<path d="M300 860q40-6 80-22M220 852q40 8 80 0" fill="none" stroke="#d9b46a" stroke-width="3" stroke-linecap="round"/>` +
      `<ellipse cx="300" cy="852" rx="70" ry="10" fill="#c9a050" ${Ow(1.4)}/><path d="M246 850l12-6M270 852l10-8M320 852l12-6M350 850l8-8" stroke="#8a6a32" stroke-width="1.6"/>` +
      // A thin ant tunnel along the chamber's floor.
      `<path d="M380 850Q500 842 650 848" fill="none" stroke="${AIR}" stroke-width="10" stroke-linecap="round"/>` +
      // The rabbits' burrow: down from its hole on the right to the kits' den.
      `<ellipse cx="1290" cy="${GROUND + 2}" rx="26" ry="7" fill="${AIR}"/>` +
      `<path d="M1268 ${GROUND}q10 80 30 150l46-4q-20-80-28-146z" fill="${AIR}"/>` +
      `<ellipse cx="1330" cy="648" rx="78" ry="42" fill="${AIR}"/><ellipse cx="1330" cy="680" rx="66" ry="8" fill="#c9a050" ${Ow(1.2)}/>` +
      // The ants' nest: little chambers and their passages.
      `<path d="M988 ${GROUND}q10 30-4 52t16 56M1030 590q10 30 34 66M996 600q-14 40 10 90" fill="none" stroke="#4a2e1a" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M984 586q28-14 56 0q-28 12-56 0zM974 694q30-14 62 0q-30 12-62 0zM1042 664q24-12 48 0q-24 10-48 0z" fill="#4a2e1a" stroke="#2e1a0c" stroke-width="1.4"/>` +
      // The field mouse's round nest.
      `<ellipse cx="1170" cy="826" rx="54" ry="34" fill="${AIR}"/><ellipse cx="1170" cy="842" rx="44" ry="18" fill="#c9a050" ${Ow(1.2)}/>`
    // Life in the soil: kits asleep in their den, ants with eggs, the field mouse, worms crawling.
    const kit = (x: number, y: number) =>
      `<ellipse cx="${x}" cy="${y - 10}" rx="16" ry="11" fill="#c9b8a0" ${Ow(1.4)}/><circle cx="${x - 12}" cy="${y - 16}" r="8" fill="#c9b8a0" ${Ow(1.4)}/>` +
      `<path d="M${x - 14} ${y - 22}q-4-14 2-16q4 6 2 16zM${x - 8} ${y - 22}q2-14 8-14q0 8-6 14z" fill="#c9b8a0" ${Ow(1.2)}/><path d="M${x - 16} ${y - 16}q2-2 4 0" fill="none" stroke="${INK}" stroke-width="1.2"/>`
    const ant = (x: number, y: number) =>
      `<path d="M${x - 4} ${y}l-3 4M${x} ${y}v4M${x + 4} ${y}l3 4" stroke="${INK}" stroke-width="1.2"/><circle cx="${x - 6}" cy="${y - 2}" r="3" fill="#5a2a1a"/><circle cx="${x}" cy="${y - 2}" r="2.4" fill="#5a2a1a"/><circle cx="${x + 6}" cy="${y - 3}" r="2.6" fill="#5a2a1a"/>`
    const life =
      kit(1300, 678) + kit(1346, 680) + anim({ type: 'keys', period: 2.6, keys: [{ t: 0, sy: 1 }, { t: 1.3, sy: 1.06, ease: 'inOut' }], pivot: [1372, 680] }, kit(1380, 678)) +
      `<ellipse cx="994" cy="694" rx="5" ry="3.4" fill="#fff6e0" ${Ow(0.8)}/><ellipse cx="1004" cy="696" rx="5" ry="3.4" fill="#fff6e0" ${Ow(0.8)}/><ellipse cx="1014" cy="694" rx="5" ry="3.4" fill="#fff6e0" ${Ow(0.8)}/>` +
      [[1012, 590, 0], [1066, 668, 0.4], [1024, 698, 0.7]].map(([x, y, phase]) => anim({ type: 'path', points: [[0, 0], [14, 0], [-10, 0]], period: 3, phase }, ant(x, y))).join('') +
      mouse(1170, 838) + `<path d="M1150 820h6l-6 6h6" fill="none" stroke="#e2e0f8" stroke-width="1.6"/>` +
      [[200, 600, 9], [900, 540, 11], [1260, 860, 10]].map(([x, y, period]) =>
        anim({ type: 'path', points: [[0, 0], [30, 4], [0, 8]], period },
          `<path d="M${x} ${y}q8-6 16 0t16 0" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M${x} ${y}q8-6 16 0t16 0" fill="none" stroke="#e8909a" stroke-width="3.6" stroke-linecap="round"/>`)).join('')

    // --- Above: the meadow's edge, the fence (a knot hole in A only: a hard one) with the game's owl and a snail (A
    // only), the watering can (green in A, blue in B), carrot tops and a cabbage (a ladybird on it in A only), the bush.
    const turf =
      `<path d="M0 ${GROUND - 14}q360-6 720 0t720-2V${GROUND + 6}H0z" fill="url(#c27-grass)"/>` +
      `<path d="M0 ${GROUND + 4}h${W}" stroke="#4a7a2a" stroke-width="5"/>`
    let tufts = ''
    for (let i = 0; i < 30; i++) {
      const tx = Math.round(rand() * W)
      if (tx > 690 && tx < 760) continue
      tufts += anim({ type: 'sway', angle: 7, pivot: [tx, GROUND - 2], period: 2.3, phase: (tx % 13) / 13 }, grassTuft(tx, GROUND - 2))
    }
    const flower = (x: number, y: number, c: string) =>
      `<path d="M${x} ${y}v-18" stroke="#3f8f3a" stroke-width="2"/>` +
      [0, 72, 144, 216, 288].map((a) => `<ellipse transform="rotate(${a} ${x} ${y - 22})" cx="${x}" cy="${y - 27}" rx="3" ry="5" fill="${c}" ${Ow(0.8)}/>`).join('') +
      `<circle cx="${x}" cy="${y - 22}" r="2.6" fill="#ffd23f"/>`
    const flowers = [[60, '#ffffff'], [140, '#ffb3c7'], [260, '#ffd23f'], [330, '#b48ae6'], [410, '#ffffff'], [1000, '#ffb3c7'], [1230, '#ffd23f'], [1370, '#ffffff'], [1420, '#b48ae6']]
      .map(([x, c]) => anim({ type: 'sway', angle: 6, pivot: [x as number, GROUND - 4], period: 2.8, phase: ((x as number) % 7) / 7 }, flower(x as number, GROUND - 4, c as string)))
      .join('')
    let fence = groundShadow(720, GROUND - 2, 260, 5)
    for (let px = 480; px <= 960; px += 80) fence += `<path d="M${px - 7} ${GROUND}v-66l7-8l7 8v66z" fill="url(#c27-wood)" ${Ow(1.6)}/>`
    fence +=
      `<rect x="470" y="414" width="500" height="8" rx="2" fill="url(#c27-wood)" ${Ow(1.4)}/><rect x="470" y="442" width="500" height="8" rx="2" fill="url(#c27-wood)" ${Ow(1.4)}/>` +
      diff(560, 432, 18, `<ellipse cx="560" cy="432" rx="3.2" ry="4.6" fill="#3a2414"/><path d="M556 426q4-3 8 0" fill="none" stroke="#6e4a26" stroke-width="1.2"/>`, '') +
      anim({ type: 'sway', angle: 6, pivot: [960, 398], period: 3.6 }, keenOwl(960, 398, 0.85, blink(3.1, 0.3))) +
      diff(640, 388, 22, snail(640, 396), '')
    const can = (c: string) =>
      `<path d="M454 470l4-30h28l4 30z" fill="${c}" ${Ow(1.6)}/><path d="M486 448l22-16" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M486 448l22-16" stroke="${c}" stroke-width="3.4" stroke-linecap="round"/>` +
      `<path d="M504 430l8 6l-8 4z" fill="${c}" ${Ow(1.2)}/><path d="M462 440q10-16 20 0" fill="none" stroke="${INK}" stroke-width="2.6"/><path d="M460 452h26" stroke="#fff" stroke-opacity="0.4" stroke-width="3"/>`
    const wateringCan = groundShadow(472, GROUND, 24, 4) + diff(484, 450, 38, can('#3fa34a'), can('#3a76d0'))
    const carrotTop = (x: number, y: number, s = 1) =>
      [-30, -12, 6, 24].map((a, i) => `<path transform="rotate(${a} ${x} ${y})" d="M${x} ${y}q-6-${30 * s} 2-${(52 + (i % 2) * 10) * s}q8 22-2 ${(52 + (i % 2) * 10) * s}" fill="url(#c27-leaf)" ${Ow(1.3)}/>`).join('') +
      `<ellipse cx="${x}" cy="${y + 2}" rx="${10 * s}" ry="${4 * s}" fill="#f28a3a" ${Ow(1.2)}/>`
    const cabbage =
      groundShadow(920, GROUND, 30, 4) +
      `<circle cx="920" cy="${GROUND - 16}" r="18" fill="#9fd070" ${Ow(1.6)}/><path d="M904 ${GROUND - 4}q-14-20 4-34q4 18-4 34zM936 ${GROUND - 4}q14-20-4-34q-4 18 4 34z" fill="#7fbf5a" ${Ow(1.4)}/>` +
      `<path d="M920 ${GROUND - 30}v24M912 ${GROUND - 22}l8 6l8-6" fill="none" stroke="#5a9a3a" stroke-width="1.4"/>` +
      diff(928, 452, 18, `<ellipse cx="928" cy="452" rx="5" ry="4" fill="#e63946" ${Ow(1)}/><path d="M928 448v8" stroke="${INK}" stroke-width="1"/><circle cx="925" cy="451" r="1.1" fill="${INK}"/><circle cx="931" cy="454" r="1.1" fill="${INK}"/><circle cx="924" cy="448" r="2" fill="${INK}"/>`, '')
    const garden = carrotTop(600, GROUND - 2, 0.7) + carrotTop(655, GROUND - 2, 0.6) + cabbage
    const bushBall = (x: number, y: number, r: number) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#c27-bush)" ${O}/>`
    const bush =
      groundShadow(BUSH[0], GROUND, 90, 8) +
      bushBall(BUSH[0] - 52, GROUND - 30, 40) + bushBall(BUSH[0] + 54, GROUND - 30, 40) + bushBall(BUSH[0], GROUND - 52, 54) +
      [[-40, -60], [20, -88], [50, -40], [-20, -30], [6, -60]].map(([dx, dy]) => `<circle cx="${BUSH[0] + dx}" cy="${GROUND + dy}" r="4" fill="#e63946" ${Ow(1)}/>`).join('') +
      `<path d="M${BUSH[0] - 60} ${GROUND - 50}q12-10 24 0M${BUSH[0] + 30} ${GROUND - 70}q12-10 24 0M${BUSH[0] - 10} ${GROUND - 20}q12-10 24 0" fill="none" stroke="#2a7434" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round"/>`
    // Leaves shaken out of the bush as the rabbit lands in it.
    let bushBurst = ''
    for (let i = 0; i < 8; i++) {
      const dx = Math.round((i - 3.5) * 22)
      bushBurst += once([{ t: 0, x: 0, y: 0, rot: 0, o: 0, ease: 'step' }, { t: 11.8, o: 1, ease: 'out' }, { t: 12.2, x: dx, y: -70 - (i % 3) * 20, rot: 180, ease: 'in' }, { t: 12.9, x: dx * 1.3, y: 20, rot: 360, o: 1, ease: 'step' }, { t: 12.95, o: 0, ease: 'step' }],
        [BUSH[0], GROUND - 60], `<path d="M${BUSH[0] - 6} ${GROUND - 60}q6-8 12 0q-6 8-12 0z" fill="#5cb342" ${Ow(1)}/>`)
    }

    // --- The carrot: one piece until it snaps, then the top in the rabbit's paws and the root in the mole's. ---
    const [cx, cy] = CARROT
    const leaves = (x: number, y: number) =>
      [-34, -16, 0, 16, 34].map((a, i) => `<path transform="rotate(${a} ${x} ${y})" d="M${x} ${y}q-8-40 2-${74 + (i % 2) * 14}q10 30-2 ${74 + (i % 2) * 14}" fill="url(#c27-leaf)" ${Ow(1.4)}/>`).join('') +
      [-20, 20].map((a) => `<path transform="rotate(${a} ${x} ${y})" d="M${x} ${y - 30}l-10-8M${x} ${y - 46}l10-8" stroke="#3f8f3a" stroke-width="2"/>`).join('')
    const topPiece = (x: number, y: number) =>
      leaves(x, y - 6) + `<path d="M${x - 20} ${y - 6}q20-8 40 0l-6 54l-6-6l-6 8l-6-8l-6 8l-6-6z" fill="url(#c27-carrot)" ${Ow(1.8)}/>` +
      `<path d="M${x - 12} ${y + 10}h8M${x + 4} ${y + 24}h8" stroke="#c95a1a" stroke-width="2"/>`
    const rootPiece = (x: number, y: number, len: number) =>
      `<path d="M${x - 15} ${y}l6 6l6-8l6 8l6-8l6 8l0 0q-6 ${len * 0.6}-13 ${len}q-7-${len * 0.4}-17-${len - 6}z" fill="url(#c27-carrot)" ${Ow(1.8)}/>` +
      `<path d="M${x - 8} ${y + 20}h8M${x - 2} ${y + 46}h8M${x - 6} ${y + 76}h6" stroke="#c95a1a" stroke-width="2"/><path d="M${x + 2} ${y + len}l4 10" stroke="#c95a1a" stroke-width="1.6"/>`
    const wholeCarrot =
      leaves(cx, cy - 6) +
      `<path d="M${cx - 20} ${cy - 6}q20-8 40 0q-4 90-18 186q-4 2-6 0q-10-90-16-186z" fill="url(#c27-carrot)" ${Ow(1.8)}/>` +
      `<path d="M${cx - 12} ${cy + 10}h8M${cx + 4} ${cy + 24}h8M${cx - 8} ${cy + 60}h8M${cx + 2} ${cy + 96}h8M${cx - 4} ${cy + 140}h6" stroke="#c95a1a" stroke-width="2"/>` +
      `<path d="M${cx + 2} ${cy + 180}q4 8 2 14" fill="none" stroke="#c95a1a" stroke-width="1.6"/>`
    const carrot = keys('carrot', carrotKeys, CARROT, once(showIn([0, SNAP]), CARROT, wholeCarrot))
    // The hole it leaves in the ground.
    const hole = once(showIn([SNAP, LOOP]), CARROT, `<ellipse cx="${cx}" cy="${cy + 2}" rx="20" ry="6" fill="${AIR}"/>`)
    // SNAP: a starburst and soil flying where it broke.
    let snap = once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t: SNAP, o: 1, ease: 'out' }, { t: SNAP + 0.12, sx: 1.15, sy: 1.15, ease: 'inOut' }, { t: SNAP + 0.32, sx: 1, sy: 1, o: 1, ease: 'step' }, { t: SNAP + 0.36, o: 0, ease: 'step' }],
      [cx, cy + 30], starburst(cx, cy + 30, 1.3, '#ffe066'))
    for (let i = 0; i < 10; i++) {
      const dx = Math.round((i - 4.5) * 18)
      snap += once([{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t: SNAP, o: 1, ease: 'out' }, { t: SNAP + 0.3, x: dx, y: -50 - (i % 3) * 24, ease: 'in' }, { t: SNAP + 0.7, x: dx * 1.4, y: 10, o: 1, ease: 'step' }, { t: SNAP + 0.75, o: 0, ease: 'step' }],
        [cx, cy], `<circle cx="${cx}" cy="${cy}" r="${3 + (i % 3)}" fill="#6e4a26" ${Ow(1)}/>`)
    }

    // --- The rabbit. ---
    const [rx, ry] = RABBIT
    const rabbitEye = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="3.4" fill="${INK}"/><circle cx="${x - 1}" cy="${y - 1}" r="1.1" fill="#fff"/>`
    const ears = anim({ type: 'keys', period: LOOP, keys: [{ t: 0, sy: 1 }, { t: 7.5, ease: 'out' }, { t: 7.8, sy: 1.45, ease: 'inOut' }, { t: 8.5, sy: 1.45, ease: 'in' }, { t: 8.8, sy: 1 }, { t: 19.95, ease: 'step' }], pivot: [rx - 10, ry - 80] },
      `<ellipse cx="${rx - 18}" cy="${ry - 104}" rx="7" ry="24" fill="#b9a68a" ${Ow(1.6)}/><ellipse cx="${rx - 18}" cy="${ry - 104}" rx="3" ry="17" fill="#f2b8c0"/>` +
        `<ellipse cx="${rx - 2}" cy="${ry - 106}" rx="7" ry="24" fill="#b9a68a" ${Ow(1.6)}/><ellipse cx="${rx - 2}" cy="${ry - 106}" rx="3" ry="17" fill="#f2b8c0"/>`)
    const rabbitFace =
      once(showIn([0, 7.5], [8.8, SNAP]), RABBIT, rabbitEye(rx - 18, ry - 80)) +
      // Straining.
      once(showIn([7.5, 8.8]), RABBIT, `<path d="M${rx - 24} ${ry - 84}l7 4l-7 4" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>`) +
      // Flung: wide eyes.
      once(showIn([SNAP, 11.8]), RABBIT, `<circle cx="${rx - 18}" cy="${ry - 80}" r="6" fill="#fff" ${Ow(1.4)}/><circle cx="${rx - 18}" cy="${ry - 80}" r="2" fill="${INK}"/>`) +
      once(showIn([15, 17]), RABBIT, spiral(rx - 18, ry - 80)) +
      once(showIn([17, LOOP]), RABBIT, `<path d="M${rx - 23} ${ry - 79}q5-5 10 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`)
    const rabbitMouth =
      once(showIn([0, 4.4]), RABBIT, `<path d="M${rx - 34} ${ry - 64}q4 3 8 0" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`) +
      once(showIn([4.4, 15]), RABBIT, `<path d="M${rx - 36} ${ry - 64}h10" stroke="${INK}" stroke-width="2" stroke-linecap="round"/><rect x="${rx - 34}" y="${ry - 64}" width="6" height="5" fill="#fff" ${Ow(1)}/>`) +
      once(showIn([15, 17]), RABBIT, `<path d="M${rx - 36} ${ry - 64}q3 3 6 0q3 3 6 0" fill="none" stroke="${INK}" stroke-width="1.6"/>`) +
      once(showIn([17, LOOP]), RABBIT, chew(rx - 31, ry - 63, 4, 3))
    const sweat = once(showIn([6, SNAP]), RABBIT,
      anim({ type: 'keys', period: 0.7, keys: [{ t: 0, x: 0, y: 0, o: 1 }, { t: 0.7, x: 10, y: 14, o: 0 }], pivot: [rx - 4, ry - 92] }, `<path d="M${rx - 4} ${ry - 96}q4 6 0 8q-4-2 0-8z" fill="#9fd0f0" ${Ow(0.8)}/>`))
    const rabbitArms =
      // Hopping: paws in front.
      once(showIn([0, 4]), RABBIT, `<path d="M${rx - 14} ${ry - 44}l-8 14" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M${rx - 14} ${ry - 44}l-8 14" stroke="#b9a68a" stroke-width="5" stroke-linecap="round"/>`) +
      // Pulling: both paws on the leaves.
      once(showIn([4, SNAP]), RABBIT,
        `<path d="M${rx - 12} ${ry - 48}L${rx - 58} ${ry - 62}M${rx - 6} ${ry - 40}L${rx - 56} ${ry - 52}" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${rx - 12} ${ry - 48}L${rx - 58} ${ry - 62}M${rx - 6} ${ry - 40}L${rx - 56} ${ry - 52}" stroke="#b9a68a" stroke-width="6" stroke-linecap="round"/>`) +
      // Flying, then dazed: the snapped top held up.
      once(showIn([SNAP, 11.8], [15, 17]), RABBIT,
        `<path d="M${rx - 10} ${ry - 50}L${rx - 30} ${ry - 104}" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${rx - 10} ${ry - 50}L${rx - 30} ${ry - 104}" stroke="#b9a68a" stroke-width="6" stroke-linecap="round"/>` +
          `<g transform="translate(${rx - 32} ${ry - 104}) rotate(-20) scale(0.8) translate(${-cx} ${-(cy + 30)})">${topPiece(cx, cy)}</g>`) +
      // Munching: the top in both paws at its mouth.
      once(showIn([17, LOOP]), RABBIT,
        `<g transform="translate(${rx - 38} ${ry - 56}) rotate(-60) scale(0.7) translate(${-cx} ${-(cy + 30)})">${topPiece(cx, cy)}</g>` +
          `<path d="M${rx - 10} ${ry - 44}L${rx - 34} ${ry - 56}" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${rx - 10} ${ry - 44}L${rx - 34} ${ry - 56}" stroke="#b9a68a" stroke-width="6" stroke-linecap="round"/>`)
    const rabbit = keys('rabbit', rabbitKeys(), RABBIT,
      groundShadow(rx, ry, 30, 5) +
        `<circle cx="${rx + 22}" cy="${ry - 24}" r="9" fill="#fff" ${Ow(1.4)}/>` +
        `<ellipse cx="${rx + 6}" cy="${ry - 6}" rx="18" ry="7" fill="#b9a68a" ${Ow(1.6)}/>` +
        `<ellipse cx="${rx}" cy="${ry - 34}" rx="22" ry="28" fill="url(#c27-fur)" ${Ow(1.8)}/><ellipse cx="${rx - 8}" cy="${ry - 30}" rx="11" ry="17" fill="#efe4d0"/>` +
        ears +
        `<circle cx="${rx - 20}" cy="${ry - 72}" r="18" fill="url(#c27-fur)" ${Ow(1.8)}/>` +
        `<ellipse cx="${rx - 34}" cy="${ry - 68}" rx="5" ry="3.6" fill="#f2a0b0" ${Ow(1)}/><circle cx="${rx - 26}" cy="${ry - 66}" r="4" fill="#ffb3c0" fill-opacity="0.5"/>` +
        `<path d="M${rx - 36} ${ry - 66}l-10-2M${rx - 36} ${ry - 64}l-10 2" stroke="${INK}" stroke-width="1" stroke-opacity="0.6"/>` +
        // A daisy behind its ear: A only.
        diff(rx - 4, ry - 86, 18, `<path d="M${rx - 6} ${ry - 78}l4-10" stroke="#3f8f3a" stroke-width="1.6"/>` + [0, 72, 144, 216, 288].map((a) => `<ellipse transform="rotate(${a} ${rx - 2} ${ry - 90})" cx="${rx - 2}" cy="${ry - 95}" rx="2.6" ry="4.4" fill="#fff" ${Ow(0.8)}/>`).join('') + `<circle cx="${rx - 2}" cy="${ry - 90}" r="2.4" fill="#ffd23f"/>`, '', 'rabbit') +
        rabbitFace + rabbitMouth + sweat + rabbitArms +
        // Dazed in the bush: leaves on its head, stars.
        once(showIn([15, 17]), RABBIT, `<path d="M${rx - 30} ${ry - 90}q6-8 12 0q-6 8-12 0zM${rx - 14} ${ry - 94}q6-8 12 0q-6 8-12 0z" fill="#5cb342" ${Ow(1)}/>` + stars(rx - 18, ry - 120)))

    // --- The mole. ---
    const [mx, my] = MOLE
    const moleEyes =
      once(showIn([0, 4.2]), MOLE, `<path d="M${mx - 9} ${my - 50}q3 2 6 0M${mx + 3} ${my - 50}q3 2 6 0" fill="none" stroke="${INK}" stroke-width="1.6"/>` +
        anim({ type: 'keys', period: 2, keys: [{ t: 0, x: 0, y: 0, o: 0, sx: 0.6, sy: 0.6 }, { t: 0.3, o: 1 }, { t: 2, x: 18, y: -30, o: 0, sx: 1.3, sy: 1.3 }], pivot: [mx + 20, my - 66] },
          `<path d="M${mx + 16} ${my - 70}h8l-8 8h8" fill="none" stroke="#e2e0f8" stroke-width="2" stroke-linecap="round"/>`)) +
      once(showIn([4.2, 8.8], [10, SNAP], [14.5, LOOP]), MOLE, `<circle cx="${mx - 6}" cy="${my - 50}" r="2" fill="${INK}"/><circle cx="${mx + 6}" cy="${my - 50}" r="2" fill="${INK}"/>`) +
      once(showIn([4.2, 4.8]), MOLE, `<path d="M${mx + 24} ${my - 90}h6l-1 14h-4z" fill="#e63946" ${Ow(1.3)}/><circle cx="${mx + 27}" cy="${my - 70}" r="2.6" fill="#e63946" ${Ow(1.2)}/>`) +
      once(showIn([8.8, 10]), MOLE, `<path d="M${mx - 10} ${my - 52}l6 3l-6 3M${mx + 10} ${my - 52}l-6 3l6 3" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`) +
      once(showIn([SNAP, 14.5]), MOLE, spiral(mx - 6, my - 50) + spiral(mx + 6, my - 50))
    const pinkPaw = (x: number, y: number, rot: number) =>
      `<g transform="rotate(${rot} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="10" ry="8" fill="#f2a6b4" ${Ow(1.4)}/><path d="M${x - 8} ${y - 6}l-3-6M${x - 3} ${y - 8}l-1-7M${x + 3} ${y - 8}l1-7M${x + 8} ${y - 6}l3-6" stroke="#fff4e0" stroke-width="2.4" stroke-linecap="round"/></g>`
    const molePaws =
      once(showIn([0, 4.8]), MOLE, pinkPaw(mx - 18, my - 18, -30) + pinkPaw(mx + 18, my - 18, 30)) +
      once(showIn([4.8, SNAP]), MOLE, pinkPaw(mx - 8, my - 92, -10) + pinkPaw(mx + 8, my - 92, 10)) +
      // After the snap: hugging the root.
      once(showIn([SNAP, LOOP]), MOLE,
        `<g transform="translate(${mx} ${my - 54}) rotate(-24) scale(0.62) translate(${-cx} ${-(cy + 40)})">${rootPiece(cx, cy + 40, 140)}</g>` +
          pinkPaw(mx - 14, my - 30, -40) + pinkPaw(mx + 14, my - 34, 40))
    // Claws dug in: soil flying from its feet.
    const digging = once(showIn([8.8, 10]), MOLE,
      [-1, 1].map((d, i) => anim({ type: 'keys', period: 0.4, phase: i * 0.2, keys: [{ t: 0, x: 0, y: 0, o: 1 }, { t: 0.4, x: d * 26, y: -20, o: 0 }], pivot: [mx + d * 14, my - 2] },
        `<circle cx="${mx + d * 14}" cy="${my - 2}" r="4" fill="#6e4a26"/><circle cx="${mx + d * 20}" cy="${my - 6}" r="3" fill="#6e4a26"/>`)).join('') +
        anim({ type: 'keys', period: 0.7, keys: [{ t: 0, x: 0, y: 0, o: 1 }, { t: 0.7, x: -8, y: 14, o: 0 }], pivot: [mx - 14, my - 62] }, `<path d="M${mx - 14} ${my - 66}q4 6 0 8q-4-2 0-8z" fill="#9fd0f0" ${Ow(0.8)}/>`))
    const mole = keys('mole', moleKeys, MOLE,
      groundShadow(mx, my, 32, 5) +
        `<ellipse cx="${mx - 12}" cy="${my - 3}" rx="10" ry="5" fill="#f2a6b4" ${Ow(1.2)}/><ellipse cx="${mx + 12}" cy="${my - 3}" rx="10" ry="5" fill="#f2a6b4" ${Ow(1.2)}/>` +
        `<ellipse cx="${mx}" cy="${my - 26}" rx="30" ry="26" fill="url(#c27-mole)" ${Ow(1.8)}/>` +
        `<circle cx="${mx}" cy="${my - 52}" r="18" fill="url(#c27-mole)" ${Ow(1.8)}/>` +
        `<path d="M${mx - 6} ${my - 42}q6 14 12 0q-2 8-6 10q-4-2-6-10z" fill="#f2a6b4" ${Ow(1.3)}/><ellipse cx="${mx}" cy="${my - 32}" rx="5" ry="3.6" fill="#e27a90" ${Ow(1)}/>` +
        `<path d="M${mx - 8} ${my - 36}l-12-2M${mx - 8} ${my - 34}l-12 3M${mx + 8} ${my - 36}l12-2M${mx + 8} ${my - 34}l12 3" stroke="${INK}" stroke-width="1" stroke-opacity="0.5"/>` +
        moleEyes +
        // Its little round glasses: A only.
        diff(mx, my - 50, 18, `<circle cx="${mx - 6}" cy="${my - 50}" r="5.5" fill="#cfe8f5" fill-opacity="0.45" ${Ow(1.4)}/><circle cx="${mx + 6}" cy="${my - 50}" r="5.5" fill="#cfe8f5" fill-opacity="0.45" ${Ow(1.4)}/><path d="M${mx - 0.5} ${my - 50}h1M${mx - 11} ${my - 51}l-5-3M${mx + 11} ${my - 51}l5-3" stroke="${INK}" stroke-width="1.4"/>`, '', 'mole') +
        once(showIn([14.5, LOOP]), MOLE, chew(mx, my - 30, 3.4, 2.4)) +
        once(showIn([SNAP + 0.9, 14.5]), MOLE, stars(mx, my - 82)) +
        molePaws + digging)
    // The root's lower half in the soil, under the carrot, while it is whole (drawn with the carrot) — and the
    // soil kicked up in the mole's bed as it tumbles away.
    const tumbleDust = once(showIn([SNAP, 12.6]), [500, 760],
      anim({ type: 'keys', period: 0.5, keys: [{ t: 0, sx: 0.5, sy: 0.5, o: 0.8 }, { t: 0.5, sx: 1.4, sy: 1.4, o: 0 }], pivot: [520, 740] }, `<circle cx="520" cy="740" r="16" fill="#8a6a4a"/>`))

    // --- In the soil, the rest of the differences: a bone (A only), a beetle grub (A only), a pebble above the tunnel
    // (A only: a hard one). ---
    const bone = diff(610, 590, 26,
      `<g transform="rotate(-18 610 590)"><rect x="592" y="585" width="36" height="10" rx="4" fill="#f2ead8" ${Ow(1.4)}/><circle cx="590" cy="585" r="6" fill="#f2ead8" ${Ow(1.4)}/><circle cx="590" cy="595" r="6" fill="#f2ead8" ${Ow(1.4)}/><circle cx="630" cy="585" r="6" fill="#f2ead8" ${Ow(1.4)}/><circle cx="630" cy="595" r="6" fill="#f2ead8" ${Ow(1.4)}/><rect x="592" y="586" width="36" height="8" fill="#f2ead8"/></g>`, '')
    const grub = diff(800, 600, 22,
      `<path d="M786 600a14 14 0 1 0 28 0" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M786 600a14 14 0 1 0 28 0" fill="none" stroke="#f2e6c8" stroke-width="7" stroke-linecap="round"/>` +
        `<path d="M790 608l3-3M796 612l2-4M804 612l-1-4M810 608l-3-3" stroke="#c9b88a" stroke-width="1.4"/><circle cx="814" cy="598" r="5" fill="#a8743f" ${Ow(1.2)}/>`, '')
    const hardPebble = diff(600, 650, 18, pebble(600, 650, 9, '#8a8478'), '')

    // --- Events of B. ---
    // A worm pokes down out of the tunnel's roof while the mole wakes.
    const WORM: [number, number] = [560, 712]
    const worm = diff(WORM[0], WORM[1] + 12, 20, '',
      once([{ t: 0, sy: 0.05, o: 0, ease: 'step' }, { t: 4.2, o: 1, ease: 'out' }, { t: 4.6, sy: 1, ease: 'inOut' }, { t: 5.8, ease: 'in' }, { t: 6.15, sy: 0.05, o: 1, ease: 'step' }, { t: 6.2, o: 0, ease: 'step' }], WORM,
        anim({ type: 'keys', period: 0.8, keys: [{ t: 0, rot: -10 }, { t: 0.4, rot: 10, ease: 'inOut' }], pivot: WORM },
          `<path d="M${WORM[0]} ${WORM[1]}q-6 12 2 22" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M${WORM[0]} ${WORM[1]}q-6 12 2 22" fill="none" stroke="#e8909a" stroke-width="4.4" stroke-linecap="round"/><circle cx="${WORM[0] + 1}" cy="${WORM[1] + 18}" r="0.9" fill="${INK}"/>`)),
      undefined, during(4.2, 6.2))
    // An ant carries a seed along its passage past the dazed mole.
    const ANT: [number, number] = [520, 846]
    const antEvent = diff(ANT[0], ANT[1] - 4, 20, '',
      keys('ant', [{ t: 0, x: 60, o: 0, ease: 'step' }, { t: 12.6, o: 1, ease: 'linear' }, { t: 15, x: -60, o: 1, ease: 'step' }, { t: 15.05, o: 0, ease: 'step' }], ANT,
        ant(ANT[0], ANT[1]) + `<ellipse cx="${ANT[0] - 12}" cy="${ANT[1] - 7}" rx="5" ry="3.4" fill="#e8c06a" ${Ow(1)}/>`),
      'ant', during(12.6, 15.05))
    // A baby rabbit peeps out of the burrow while its parent sits dazed in the bush.
    const KIT: [number, number] = [1290, GROUND]
    const kitEvent = diff(KIT[0], KIT[1] - 18, 24, '',
      `<g clip-path="url(#c27-above)">` +
        keys('kit', [{ t: 0, y: 34, o: 0, ease: 'step' }, { t: 15, o: 1, ease: 'out' }, { t: 15.4, y: 0 }, { t: 16.6, ease: 'in' }, { t: 16.95, y: 34, o: 1, ease: 'step' }, { t: 17, o: 0, ease: 'step' }], KIT,
          `<circle cx="${KIT[0]}" cy="${KIT[1] - 10}" r="10" fill="#c9b8a0" ${Ow(1.4)}/><path d="M${KIT[0] - 6} ${KIT[1] - 18}q-4-16 2-20q4 6 2 20zM${KIT[0] + 4} ${KIT[1] - 18}q2-16 8-18q0 10-6 18z" fill="#c9b8a0" ${Ow(1.2)}/>` +
            `<circle cx="${KIT[0] - 4}" cy="${KIT[1] - 12}" r="1.8" fill="${INK}"/><circle cx="${KIT[0] + 4}" cy="${KIT[1] - 12}" r="1.8" fill="${INK}"/><ellipse cx="${KIT[0]}" cy="${KIT[1] - 7}" rx="2.4" ry="1.8" fill="#f2a0b0"/>`) +
        `</g>`,
      'kit', during(15, 17))

    // --- Life above: butterflies, a bee. ---
    const flap = (pivot: [number, number], phase: number) => (m: string) =>
      anim({ type: 'keys', period: 0.3, phase, keys: [{ t: 0, sx: 1 }, { t: 0.15, sx: 0.3, ease: 'inOut' }], pivot }, m)
    const life2 =
      anim({ type: 'path', points: [[0, 0], [70, -30], [130, 10], [60, 30]], period: 9 }, butterflyAt(300, 380, ['#ffd23f', '#f2a93b'], flap([300, 380], 0))) +
      anim({ type: 'path', points: [[0, 0], [-60, -20], [-120, 10], [-50, 20]], period: 8, phase: 0.4 }, butterflyAt(1360, 360, ['#a5d8ff', '#4d96e6'], flap([1360, 360], 0.1))) +
      anim({ type: 'path', points: [[0, 0], [40, -10], [80, 4], [30, 14]], period: 5 }, bee(1180, 360, (m) => anim({ type: 'keys', period: 0.12, keys: [{ t: 0, sy: 1 }, { t: 0.06, sy: 0.4 }], pivot: [1180, 357] }, m)))

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c27-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc0ea"/><stop offset="1" stop-color="#d6eef6"/></linearGradient>` +
      `<radialGradient id="c27-glow"><stop offset="0" stop-color="#fff4cc" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffe9a8" stop-opacity="0.4"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c27-far" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9d0a0"/><stop offset="1" stop-color="#c4e0b4"/></linearGradient>` +
      `<linearGradient id="c27-hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd06a"/><stop offset="1" stop-color="#7fb64e"/></linearGradient>` +
      `<linearGradient id="c27-grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fca5a"/><stop offset="1" stop-color="#5f9a36"/></linearGradient>` +
      `<linearGradient id="c27-soil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5232"/><stop offset="0.4" stop-color="#8f6640"/><stop offset="1" stop-color="#6e4a2c"/></linearGradient>` +
      `<linearGradient id="c27-clay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a5e3a"/><stop offset="1" stop-color="#7a4628"/></linearGradient>` +
      `<linearGradient id="c27-wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a0703e"/><stop offset="1" stop-color="#cc9a62"/></linearGradient>` +
      `<linearGradient id="c27-leaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fd06a"/><stop offset="1" stop-color="#3f8f3a"/></linearGradient>` +
      `<linearGradient id="c27-carrot" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e8661e"/><stop offset="0.6" stop-color="#ff9a3c"/><stop offset="1" stop-color="#ffb86a"/></linearGradient>` +
      `<radialGradient id="c27-bush" cx="0.64" cy="0.28" r="0.85"><stop offset="0" stop-color="#9fd870"/><stop offset="0.5" stop-color="#4f9a3e"/><stop offset="1" stop-color="#2a6a2e"/></radialGradient>` +
      `<radialGradient id="c27-fur" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#e2d2b8"/><stop offset="0.6" stop-color="#c4b090"/><stop offset="1" stop-color="#9a8466"/></radialGradient>` +
      `<radialGradient id="c27-mole" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#6a6070"/><stop offset="0.6" stop-color="#4a4250"/><stop offset="1" stop-color="#2e2834"/></radialGradient>` +
      `<radialGradient id="c27-sunlight" cx="0.86" cy="0.12" r="1"><stop offset="0" stop-color="#fff2c4" stop-opacity="0.28"/><stop offset="0.5" stop-color="#fff2c4" stop-opacity="0.06"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></radialGradient>` +
      `<clipPath id="c27-above"><rect width="${W}" height="${GROUND}"/></clipPath></defs>` +
      sky +
      soil +
      grit +
      roots +
      burrows +
      pebbles +
      life +
      bone +
      grub +
      hardPebble +
      worm +
      turf +
      tufts +
      flowers +
      fence +
      wateringCan +
      garden +
      carrot +
      hole +
      // The rabbit never goes below the ground line (it sinks into the bush).
      `<g clip-path="url(#c27-above)">${rabbit}</g>` +
      bush +
      bushBurst +
      kitEvent +
      mole +
      tumbleDust +
      antEvent +
      snap +
      life2 +
      `<rect width="${W}" height="${H}" fill="url(#c27-sunlight)"/>`
    )
  },
})
