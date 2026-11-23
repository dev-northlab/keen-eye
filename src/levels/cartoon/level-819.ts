// Cartoon "The snail race" (docs/cartoon-mode.md), made like 812: a 20 s story in a meadow seen up close, where the
// grass blades are trees and a dewdrop is as big as a beetle. On two fallen blades a snail and a beetle line up, the
// ladybird drops her flag — the beetle zooms off and smacks into a dewdrop, stuck inside it, legs kicking; the snail
// plods on, reaches the slope and slides on its own slime past everyone, through the finish ribbon. The drop pops,
// the beetle sits there wet, and the cheering caterpillar wraps itself up and comes out a butterfly. The game's owl
// is a moth with the icon's face on its wings. Twelve differences: two hard (a seed of the dandelion clock, the fourth
// leaf of the lucky clover), three events of the story.
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { bee, fly, groundShadow, INK, NATURE_DEFS, Ow } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // Down among the stalks: the spider's web, the mushrooms, the dandelion clock, the owl moth.
  { t: 1.6, x: 0, y: 430, w: 600, ease: 'inOut' },
  { t: 4.15, x: 280, y: 430, w: 600, ease: 'step' },
  // On your marks: the snail, the beetle, the ladybird with her flag.
  { t: 4.2, x: 380, y: 520, w: 420, ease: 'step' },
  // Off goes the beetle.
  { t: 6, x: 380, y: 500, w: 520, ease: 'inOut' },
  { t: 8.55, x: 600, y: 500, w: 520, ease: 'step' },
  // Splat: stuck in the dewdrop.
  { t: 8.6, x: 760, y: 560, w: 300, ease: 'step' },
  // The snail plods on, leaving its shiny trail.
  { t: 10.2, x: 380, y: 520, w: 460, ease: 'linear' },
  { t: 13, x: 560, y: 520, w: 460, ease: 'step' },
  // Wheee — down the slope on its slime, through the ribbon.
  { t: 13.05, x: 560, y: 480, w: 620, ease: 'inOut' },
  { t: 15, x: 820, y: 480, w: 600, ease: 'step' },
  // The winner; the caterpillar becomes a butterfly.
  { t: 17.3, x: 960, y: 560, w: 400, ease: 'linear' },
  { t: 19.95, x: 966, y: 563, w: 394, ease: 'step' },
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

/** The snail's lane: a fallen blade, flat, then sloping down to the finish. */
const LANE_S = 730
const laneS = (x: number) => (x <= 900 ? LANE_S : x >= 1160 ? 772 : LANE_S + (42 * (x - 900)) / 260)
/** The beetle's lane, behind: a blade on pebbles ending at the dewdrop. */
const LANE_B = 690
const FINISH = 1190

/** The snail's foot (front of its shell); it faces right. */
const SNAIL: [number, number] = [440, LANE_S]
const CRAWL: [number, number] = [6, 13]
const snailKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, rot: 0 },
  { t: CRAWL[0], ease: 'linear' },
  { t: CRAWL[1], x: 380, y: 0, ease: 'in' },
  // Onto the slope, sliding on its own slime.
  { t: 13.4, x: 460, y: 0, rot: 6, ease: 'linear' },
  { t: 14.2, x: 690, y: 34, rot: 8, ease: 'out' },
  { t: 14.9, x: 790, y: 42, rot: 0, ease: 'inOut' },
  // Proud bounces at the finish.
  { t: 15.4, y: 38, ease: 'inOut' },
  { t: 15.8, y: 42, ease: 'inOut' },
  { t: 19.95, ease: 'step' },
]
/** The snail's x (its foot) at time t, for its slime trail. */
const snailXAt = (t: number) =>
  t < CRAWL[0] ? SNAIL[0] : t < CRAWL[1] ? SNAIL[0] + (380 * (t - CRAWL[0])) / (CRAWL[1] - CRAWL[0]) : t < 14.9 ? SNAIL[0] + 380 + (410 * (t - CRAWL[1])) / 1.9 : SNAIL[0] + 790

/** The beetle's feet on its lane. */
const BEETLE: [number, number] = [450, LANE_B]
const RUN: [number, number] = [6, 8.4]
/** The dewdrop on the beetle's lane, and when the beetle smacks into it, and when it pops. */
const DROP: [number, number] = [880, 650]
const SPLAT = 8.45
const POP = 16.4
function beetleKeys(): Keyframe[] {
  const k: Keyframe[] = [
    { t: 0, x: 0, y: 0, rot: 0 },
    { t: 5.6, ease: 'in' },
    // A crouch, then off.
    { t: 5.85, x: -8, ease: 'out' },
    { t: RUN[0], x: 0, ease: 'linear' },
  ]
  for (let i = 1; i <= 12; i++) k.push({ t: RUN[0] + ((RUN[1] - RUN[0]) * i) / 12, x: Math.round((404 * i) / 12), y: i % 2 ? -5 : 0, ease: 'linear' })
  k.push({ t: SPLAT, x: 420, y: -30, rot: -8, ease: 'out' }, { t: 8.7, rot: 0, ease: 'inOut' })
  // Stuck inside the drop, wriggling.
  for (let t = 9, i = 0; t < POP - 0.1; t += 0.35, i++) k.push({ t: Math.round(t * 100) / 100, rot: i % 2 ? 7 : -7, ease: 'inOut' })
  k.push({ t: POP - 0.05, x: 420, y: -30, rot: 0, ease: 'in' }, { t: 16.7, x: 434, y: 0, rot: 18, ease: 'out' }, { t: 17, rot: 12 }, { t: 19.95, ease: 'step' })
  return k
}

/** The ladybird starter on her pebble. */
const LADY: [number, number] = [500, 772]
/** The caterpillar on its clover leaf by the finish. */
const CATER: [number, number] = [1286, 706]
const CHEER: [number, number] = [14.7, 17.3]
const COCOON: [number, number] = [17.3, 18.4]

export default svgLevel({
  id: 819,
  chapter: 'cartoon',
  title: 'cartoonSnailRace',
  parTimeSec: 120,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const sway = (pivot: [number, number], angle: number, period: number) => (m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 13) / 13 }, m)
    const buzz = (pivot: [number, number]) => (m: string) => anim({ type: 'keys', period: 0.1, keys: [{ t: 0, sy: 1 }, { t: 0.05, sy: 0.4 }], pivot }, m)
    const twinkle = (x: number, y: number, period: number, phase: number) =>
      anim({ type: 'keys', period, phase, keys: [{ t: 0, sx: 0.4, sy: 0.4, o: 0 }, { t: period * 0.15, sx: 1, sy: 1, o: 1, ease: 'out' }, { t: period * 0.35, sx: 0.4, sy: 0.4, o: 0 }], pivot: [x, y] },
        `<path d="M${x} ${y - 6}l1.4 4.6l4.6 1.4l-4.6 1.4l-1.4 4.6l-1.4-4.6l-4.6-1.4l4.6-1.4z" fill="#fff"/>`)

    // --- Plants of the tiny world. ---
    /** A tall grass blade growing from (x, y), `h` high, bending by `lean`. */
    const blade = (x: number, y: number, h: number, lean: number, w = 16, fill = 'url(#c19-blade)') =>
      sway([x, y], 2, 3.2 + (x % 5) * 0.3)(
        `<path d="M${x - w / 2} ${y}Q${x - w / 2 + lean * 0.3} ${y - h * 0.6} ${x + lean} ${y - h}Q${x + w / 2 + lean * 0.3} ${y - h * 0.6} ${x + w / 2} ${y}z" fill="${fill}" ${Ow(1.6)}/>` +
          `<path d="M${x} ${y - 4}Q${x + lean * 0.3} ${y - h * 0.6} ${x + lean} ${y - h + 6}" fill="none" stroke="#3f8f3a" stroke-opacity="0.5" stroke-width="1.6"/>`,
      )
    /** A giant daisy: its stem from (x, ground), the flower head centred on (x, y), petals `r` long. */
    const daisy = (x: number, y: number, ground: number, r: number, extra = '') => {
      let petals = ''
      for (let i = 0; i < 16; i++) {
        const a = (i * 360) / 16
        petals += `<ellipse transform="rotate(${a} ${x} ${y})" cx="${x}" cy="${y - r * 0.55}" rx="${r * 0.16}" ry="${r * 0.5}" fill="url(#c19-petal)" ${Ow(1.4)}/>`
      }
      return (
        `<path d="M${x - 4} ${ground}q-8-${(ground - y) / 2} 0-${ground - y}h8q-6 ${(ground - y) / 2} 4 ${ground - y}z" fill="#5fae4a" ${Ow(1.6)}/>` +
        `<path d="M${x} ${ground - (ground - y) * 0.4}q-30-10-44 6q24 8 44-6z" fill="url(#c19-blade)" ${Ow(1.4)}/>` +
        sway([x, ground], 1.5, 4.4)(petals + `<circle cx="${x}" cy="${y}" r="${r * 0.34}" fill="url(#c19-disc)" ${Ow(1.6)}/><circle cx="${x - r * 0.1}" cy="${y - r * 0.1}" r="${r * 0.1}" fill="#fff6b0" fill-opacity="0.7"/>` + extra)
      )
    }
    /** A clover leaf of `n` heart-shaped leaflets on a stalk from (x, ground), centred on (x, y). */
    const leaflet = (x: number, y: number, a: number, s: number) =>
      `<path transform="rotate(${a} ${x} ${y})" d="M${x} ${y}q-${14 * s}-${6 * s}-${12 * s}-${18 * s}q${6 * s}-${6 * s} ${12 * s} 0q${6 * s}-${6 * s} ${12 * s} 0q${2 * s} ${12 * s}-${12 * s} ${18 * s}z" fill="url(#c19-clover)" ${Ow(1.4)}/>` +
      `<path transform="rotate(${a} ${x} ${y})" d="M${x - 7 * s} ${y - 12 * s}q${7 * s} ${4 * s} ${14 * s} 0" fill="none" stroke="#e8f6c8" stroke-width="${1.6 * s}"/>`
    const cloverStalk = (x: number, y: number, ground: number) => `<path d="M${x} ${ground}q6-${(ground - y) / 2} 0-${ground - y}" fill="none" stroke="#4f9a3a" stroke-width="4"/>`
    /** A red toadstool from (x, y) (foot), cap `r` wide. */
    const toadstool = (x: number, y: number, r: number) =>
      groundShadow(x, y, r * 1.1, r * 0.2) +
      `<path d="M${x - r * 0.3} ${y}q-${r * 0.1}-${r * 0.8} ${r * 0.1}-${r}h${r * 0.4}q${r * 0.2} ${r * 0.2} ${r * 0.1} ${r}z" fill="#f6efe2" ${Ow(1.6)}/>` +
      `<path d="M${x - r} ${y - r * 0.9}q${r}-${r * 1.3} ${r * 2} 0q-${r}-${r * 0.25}-${r * 2} 0z" fill="url(#c19-cap)" ${Ow(1.8)}/>` +
      [[-0.5, -1.1, 0.14], [0, -1.35, 0.12], [0.45, -1.1, 0.15], [-0.15, -1.05, 0.08]].map(([dx, dy, rr]) => `<circle cx="${x + dx * r}" cy="${y + dy * r}" r="${rr * r}" fill="#fff"/>`).join('')
    const pebble = (x: number, y: number, rx: number, ry: number) =>
      `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#c19-pebble)" ${Ow(1.6)}/><path d="M${x - rx * 0.5} ${y - ry * 0.4}q${rx * 0.3}-${ry * 0.4} ${rx * 0.6}-${ry * 0.2}" fill="none" stroke="#fff" stroke-opacity="0.45" stroke-width="2.4" stroke-linecap="round"/>`

    // --- Background: soft sky, out-of-focus meadow (bokeh), far giant stalks. ---
    let bokeh = ''
    for (let i = 0; i < 26; i++) {
      const bx = Math.round(rand() * W)
      const by = Math.round(80 + rand() * 460)
      const r = Math.round(16 + rand() * 40)
      const c = ['#fff6c8', '#d8f0b0', '#ffe0ec', '#fff'][i % 4]
      bokeh += `<circle cx="${bx}" cy="${by}" r="${r}" fill="${c}" fill-opacity="${(0.25 + rand() * 0.3).toFixed(2)}"/>`
    }
    let farStalks = ''
    for (let i = 0; i < 18; i++) {
      const fx = Math.round(i * 84 + rand() * 40)
      farStalks += `<path d="M${fx} 900q${Math.round(rand() * 40 - 20)}-300 ${Math.round(rand() * 60 - 30)}-${Math.round(520 + rand() * 260)}" fill="none" stroke="#9fcf7a" stroke-opacity="0.55" stroke-width="${Math.round(10 + rand() * 12)}" stroke-linecap="round"/>`
    }
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c19-sky)"/>` +
      `<circle cx="1180" cy="120" r="260" fill="url(#c19-glow)"/>` +
      bokeh + farStalks +
      // Light beams through the leaves.
      `<path d="M1040 0h120l-420 900h-90zM1260 0h70l-330 900h-60z" fill="#fff8d0" fill-opacity="0.16"/>`
    // The ground: earth with moss, pebbles, crumbs of soil.
    let crumbs = ''
    for (let i = 0; i < 40; i++) {
      const cx = Math.round(rand() * W)
      const cy = Math.round(790 + rand() * 100)
      crumbs += `<ellipse cx="${cx}" cy="${cy}" rx="${Math.round(3 + rand() * 5)}" ry="${Math.round(2 + rand() * 3)}" fill="#6e4a2a" fill-opacity="0.5"/>`
    }
    const ground =
      `<path d="M0 760q240-20 480-6t480 0t480-10V900H0z" fill="url(#c19-soil)"/>` +
      `<path d="M0 762q240-20 480-6t480 0t480-10v14q-240 14-480 8t-480 4t-480-2z" fill="#7fbf4a" ${Ow(1.4)}/>` +
      crumbs +
      pebble(60, 840, 40, 20) + pebble(690, 860, 30, 16) + pebble(1380, 850, 44, 22) + pebble(860, 820, 18, 10)

    // --- Back plants and the far owl-moth corner: tall blades, the spider's web (a fly in it in A), mushrooms (a
    // baby one in A), the dandelion clock (a seed fewer in B: a hard one). ---
    const backBlades =
      blade(30, 770, 520, 30, 22) + blade(110, 770, 420, -40, 18) + blade(300, 770, 560, 20, 24) + blade(560, 770, 470, -30, 18) +
      blade(760, 770, 520, 40, 22) + blade(980, 770, 440, -20, 18) + blade(1340, 770, 560, -40, 24) + blade(1420, 770, 380, 30, 18)
    // The spider's web between two stalks, with dewdrops.
    const WEB: [number, number] = [190, 470]
    let web = ''
    for (let i = 0; i < 10; i++) {
      const a = (i * Math.PI * 2) / 10
      web += `<path d="M${WEB[0]} ${WEB[1]}L${Math.round(WEB[0] + Math.cos(a) * 86)} ${Math.round(WEB[1] + Math.sin(a) * 70)}" stroke="#fff" stroke-opacity="0.75" stroke-width="1.2"/>`
    }
    for (const r of [16, 32, 48, 64]) {
      let d = ''
      for (let i = 0; i <= 10; i++) {
        const a = (i * Math.PI * 2) / 10
        d += `${i ? 'L' : 'M'}${Math.round(WEB[0] + Math.cos(a) * r * 1.2)} ${Math.round(WEB[1] + Math.sin(a) * r)}`
      }
      web += `<path d="${d}" fill="none" stroke="#fff" stroke-opacity="0.7" stroke-width="1.1"/>`
    }
    const dew = (x: number, y: number, r: number) =>
      `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#c19-dew)" stroke="#fff" stroke-opacity="0.8" stroke-width="1"/><circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.3}" fill="#fff"/>`
    web +=
      dew(WEB[0] + 40, WEB[1] - 30, 4) + dew(WEB[0] - 56, WEB[1] + 20, 5) + dew(WEB[0] + 10, WEB[1] + 48, 4) + dew(WEB[0] - 20, WEB[1] - 50, 3.5) +
      twinkle(WEB[0] + 40, WEB[1] - 30, 2.6, 0.2) + twinkle(WEB[0] - 56, WEB[1] + 20, 3.1, 0.6) +
      // A fly caught in the web (A only).
      diff(207, 452, 18, `<path d="M200 446l14 14M214 446l-14 14" stroke="#fff" stroke-opacity="0.8" stroke-width="1.4"/>` + fly(207, 454, buzz([207, 450])), '')
    const mushrooms =
      toadstool(150, 780, 44) +
      toadstool(92, 784, 26) +
      // A baby toadstool (A only).
      diff(236, 772, 22, toadstool(236, 786, 14), '')
    const DANDY: [number, number] = [462, 470]
    const seed = (a: number) => {
      const r = (a * Math.PI) / 180
      const [cx, cy] = DANDY
      const x1 = Math.round((cx + Math.cos(r) * 12) * 10) / 10
      const y1 = Math.round((cy + Math.sin(r) * 12) * 10) / 10
      const x2 = Math.round((cx + Math.cos(r) * 38) * 10) / 10
      const y2 = Math.round((cy + Math.sin(r) * 38) * 10) / 10
      let tuft = ''
      for (const d of [-40, -20, 0, 20, 40]) {
        const rr = ((a + d) * Math.PI) / 180
        tuft += `M${x2} ${y2}l${Math.round(Math.cos(rr) * 8 * 10) / 10} ${Math.round(Math.sin(rr) * 8 * 10) / 10}`
      }
      return `<path d="M${x1} ${y1}L${x2} ${y2}${tuft}" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/><circle cx="${x1}" cy="${y1}" r="1.8" fill="#a88a5a"/>`
    }
    const HARD_SEED = -60
    const dandelion =
      `<path d="M${DANDY[0]} 770q-10-150 0-${770 - DANDY[1]}" fill="none" stroke="${INK}" stroke-width="7"/><path d="M${DANDY[0]} 770q-10-150 0-${770 - DANDY[1]}" fill="none" stroke="#8fc46a" stroke-width="4"/>` +
      sway([DANDY[0], 770], 1.2, 4.6)(
        `<circle cx="${DANDY[0]}" cy="${DANDY[1]}" r="46" fill="#fff" fill-opacity="0.18"/>` +
          Array.from({ length: 20 }, (_, i) => i * 18 - 180).filter((a) => a !== HARD_SEED).map(seed).join('') +
          `<circle cx="${DANDY[0]}" cy="${DANDY[1]}" r="9" fill="#c9b07a" ${Ow(1.4)}/>`,
      ) +
      // A hard one: a seed of the clock (B: gone). Drawn without the sway, which is tiny.
      diff(474, 448, 22, seed(HARD_SEED), '')
    // The owl moth: the game's owl (its face disks, eyes, tufts, beak, brows) on the wings of a moth, on a leaf.
    const MOTH: [number, number] = [340, 592]
    const [mx, my] = MOTH
    const mothEye = (x: number) =>
      `<circle cx="${x}" cy="${my - 14}" r="11" fill="#f3dcb4"/><circle cx="${x}" cy="${my - 14}" r="8" fill="#fff"/><circle cx="${x}" cy="${my - 14}" r="5.6" fill="url(#ke-owl-iris)"/><circle cx="${x}" cy="${my - 14}" r="2.8" fill="#1b1410"/><circle cx="${x + 1.6}" cy="${my - 15.8}" r="1.4" fill="#fff"/>`
    const owlMoth =
      `<path d="M${mx - 70} ${my + 14}q20-30 70-34q50 4 70 34q-10 14-40 8l-30-12l-30 12q-30 6-40-8z" fill="url(#c19-leaf)" ${Ow(1.6)}/><path d="M${mx - 60} ${my + 12}q60-26 120 0" fill="none" stroke="#3f8f3a" stroke-width="1.6"/>` +
      anim({ type: 'keys', period: 3.6, keys: [{ t: 0, sx: 1 }, { t: 2.8, ease: 'inOut' }, { t: 3.1, sx: 0.5, ease: 'inOut' }, { t: 3.4, sx: 1 }], pivot: [mx, my] },
        // Wings: hind, then fore with the owl's face; tufts at their tips.
        `<path d="M${mx} ${my - 4}q-30 6-38 22q22 6 38-10zM${mx} ${my - 4}q30 6 38 22q-22 6-38-10z" fill="#a8743f" ${Ow(1.6)}/>` +
          `<path d="M${mx} ${my - 30}l-24-12l-6 8q-14 14-8 32q20 6 38-10zM${mx} ${my - 30}l24-12l6 8q14 14 8 32q-20 6-38-10z" fill="#8b5a2b" ${Ow(1.8)}/>` +
          mothEye(mx - 15) + mothEye(mx + 15) +
          `<path d="M${mx - 28} ${my - 28}q8-5 16 0M${mx + 28} ${my - 28}q-8-5-16 0" fill="none" stroke="#5e3a17" stroke-width="2.4" stroke-linecap="round"/>`) +
      `<ellipse cx="${mx}" cy="${my - 12}" rx="4.5" ry="16" fill="#6e4520" ${Ow(1.4)}/><path d="M${mx - 3} ${my - 4}h6l-3 6z" fill="#ff9f1c" stroke="#d97706" stroke-width="1"/>` +
      `<path d="M${mx - 2} ${my - 28}q-6-10-12-12M${mx + 2} ${my - 28}q6-10 12-12" fill="none" stroke="${INK}" stroke-width="1.4"/>`

    // --- The race course: two fallen blades on pebbles, the start line, the dewdrop, the finish ribbon. ---
    const lanes =
      pebble(420, 712, 22, 12) + pebble(700, 714, 20, 11) + pebble(900, 716, 18, 10) +
      `<path d="M370 ${LANE_B}h560q12 4 0 10h-560q-10-5 0-10z" fill="url(#c19-blade-flat)" ${Ow(1.6)}/><path d="M380 ${LANE_B + 4}h540" stroke="#3f8f3a" stroke-opacity="0.45" stroke-width="1.4"/>` +
      `<path d="M360 ${LANE_S}H900L1160 772H1320q10 6 0 12H1160L900 ${LANE_S + 12}H360q-10-6 0-12z" fill="url(#c19-blade-flat)" ${Ow(1.6)}/>` +
      `<path d="M370 ${LANE_S + 5}H900L1160 777H1310" fill="none" stroke="#3f8f3a" stroke-opacity="0.45" stroke-width="1.4"/>` +
      // The start line: two petals laid across.
      `<path d="M484 ${LANE_B - 2}l6 12M484 ${LANE_S - 2}l6 14" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`
    const finish =
      `<path d="M${FINISH - 16} 790q-4-60 0-110M${FINISH + 26} 792q4-60 0-104" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M${FINISH - 16} 790q-4-60 0-110M${FINISH + 26} 792q4-60 0-104" fill="none" stroke="#8fc46a" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M${FINISH - 16} 690l6-8l6 8zM${FINISH + 26} 696l6-8l6 8z" fill="#ffd23f" ${Ow(1.2)}/>` +
      // The ribbon: whole until the snail breaks it, then two loose ends.
      once(showIn([0, 14.6]), [FINISH, 740], `<path d="M${FINISH - 14} 734q20 8 38 0" fill="none" stroke="#e63946" stroke-width="4"/>`) +
      once(showIn([14.6, LOOP]), [FINISH, 740], `<path d="M${FINISH - 14} 734q4 16-2 26M${FINISH + 24} 734q4 16 2 26" fill="none" stroke="#e63946" stroke-width="4"/>`)
    // The dewdrop: wobbles with the beetle stuck inside, then pops.
    const dropKeys: Keyframe[] = [{ t: 0, sx: 1, sy: 1, o: 1 }, { t: SPLAT, ease: 'out' }, { t: 8.6, sx: 1.18, sy: 0.84, ease: 'inOut' }, { t: 8.85, sx: 0.94, sy: 1.06, ease: 'inOut' }, { t: 9.1, sx: 1, sy: 1 }]
    for (let t = 9.35, i = 0; t < POP - 0.2; t += 0.35, i++) dropKeys.push({ t: Math.round(t * 100) / 100, sx: i % 2 ? 1.05 : 0.97, sy: i % 2 ? 0.96 : 1.03, ease: 'inOut' })
    dropKeys.push({ t: POP - 0.1, sx: 1.2, sy: 0.8, o: 1, ease: 'step' }, { t: POP, o: 0, ease: 'step' })
    const dewdrop = once(dropKeys, [DROP[0], LANE_B],
      `<circle cx="${DROP[0]}" cy="${DROP[1]}" r="40" fill="url(#c19-bigdew)" stroke="#fff" stroke-opacity="0.9" stroke-width="2"/>` +
        `<ellipse cx="${DROP[0] - 14}" cy="${DROP[1] - 16}" rx="10" ry="6" transform="rotate(-30 ${DROP[0] - 14} ${DROP[1] - 16})" fill="#fff" fill-opacity="0.85"/><circle cx="${DROP[0] + 16}" cy="${DROP[1] + 18}" r="4" fill="#fff" fill-opacity="0.6"/>`) +
      twinkle(DROP[0] - 20, DROP[1] - 22, 2.2, 0.1)
    let popSplash = ''
    for (let i = 0; i < 10; i++) {
      const a = (i * Math.PI * 2) / 10
      popSplash += once([{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t: POP, o: 1, ease: 'out' }, { t: POP + 0.45, x: Math.round(Math.cos(a) * 60), y: Math.round(Math.sin(a) * 50 + 20), o: 1, ease: 'step' }, { t: POP + 0.5, o: 0, ease: 'step' }], DROP, dew(DROP[0], DROP[1], 5))
    }

    // --- The beetle. ---
    const [bx, by] = BEETLE
    const beetleLeg = (x: number, flip: boolean) =>
      keys(undefined, swingFor([[RUN[0], RUN[1], 0.08], [9, POP, 0.18]], 30, flip), [x, by - 12],
        `<path d="M${x} ${by - 12}l${flip ? 6 : -6} 12" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`)
    const beetleFace =
      once(showIn([0, SPLAT], [17.4, LOOP]), BEETLE, `<circle cx="${bx + 28}" cy="${by - 24}" r="3.6" fill="#fff" ${Ow(1)}/><circle cx="${bx + 29.5}" cy="${by - 24}" r="1.8" fill="${INK}"/><path d="M${bx + 23} ${by - 30}l10 3" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`) +
      // Inside the drop: eyes wide, cheeks puffed.
      once(showIn([SPLAT, 17.4]), BEETLE, `<circle cx="${bx + 28}" cy="${by - 24}" r="5.4" fill="#fff" ${Ow(1.2)}/><circle cx="${bx + 28}" cy="${by - 24}" r="1.6" fill="${INK}"/><circle cx="${bx + 34}" cy="${by - 15}" r="3.4" fill="#5a7a9a"/>`)
    const beetle = keys('beetle', beetleKeys(), BEETLE,
      groundShadow(bx, by, 30, 3) +
        // Speed lines while it runs.
        once(showIn([RUN[0], RUN[1]]), BEETLE, `<path d="M${bx - 40} ${by - 24}h-30M${bx - 34} ${by - 14}h-40M${bx - 44} ${by - 6}h-24" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-opacity="0.8"/>`) +
        beetleLeg(bx - 12, false) + beetleLeg(bx + 2, true) + beetleLeg(bx + 14, false) +
        `<path d="M${bx + 30} ${by - 30}q8-14 18-14M${bx + 32} ${by - 28}q12-6 20 0" fill="none" stroke="${INK}" stroke-width="1.6"/>` +
        `<ellipse cx="${bx}" cy="${by - 20}" rx="26" ry="16" fill="url(#c19-shell)" ${Ow(1.8)}/><path d="M${bx - 24} ${by - 20}h46" stroke="${INK}" stroke-width="1.4"/><path d="M${bx - 12} ${by - 30}q10-6 22-2" fill="none" stroke="#fff" stroke-opacity="0.6" stroke-width="3" stroke-linecap="round"/>` +
        `<circle cx="${bx + 26}" cy="${by - 20}" r="11" fill="#2b3a5a" ${Ow(1.6)}/>` +
        // Its pincers: big in A, small stubs in B.
        diff(
          bx + 42,
          by - 20,
          20,
          `<path d="M${bx + 34} ${by - 26}q14-6 20 4q-8-2-14 2zM${bx + 34} ${by - 14}q14 6 20-4q-8 2-14-2z" fill="#3a4a6a" ${Ow(1.4)}/>`,
          `<path d="M${bx + 34} ${by - 24}q6-2 8 2q-4 0-6 2zM${bx + 34} ${by - 16}q6 2 8-2q-4 0-6-2z" fill="#3a4a6a" ${Ow(1.4)}/>`,
          'beetle',
        ) +
        beetleFace +
        // Wet and dazed after the pop: drips, a little cloud of stars.
        once(showIn([16.6, LOOP]), BEETLE,
          [[-10, 0], [8, 0.3]].map(([ox, phase]) => anim({ type: 'keys', period: 0.8, phase, keys: [{ t: 0, y: 0, o: 1 }, { t: 0.8, y: 16, o: 0 }], pivot: [bx + ox, by - 6] },
            `<path d="M${bx + ox} ${by - 8}q3 4 0 6q-3-2 0-6z" fill="#9fd0f0" ${Ow(0.8)}/>`)).join('') +
            anim({ type: 'rotate', pivot: [bx + 4, by - 50], period: 1.4 }, [0, 120, 240].map((a) => `<path transform="rotate(${a} ${bx + 4} ${by - 50})" d="M${bx + 4} ${by - 62}l1.6 3.4l3.6 0.6l-2.6 2.4l0.8 3.6l-3.4-1.8l-3.4 1.8l0.8-3.6l-2.6-2.4l3.6-0.6z" fill="#ffd23f" ${Ow(0.8)}/>`).join(''))))

    // --- The snail, and its slime trail. ---
    const [sx, sy] = SNAIL
    let trail = ''
    for (let x = sx - 30; x < sx + 780; x += 20) {
      // When the snail's tail (about 34 behind its foot) passes this piece.
      let t = CRAWL[0]
      while (t < 14.9 && snailXAt(t) - 34 < x) t += 0.05
      if (t >= 14.9) t = 14.9
      const y1 = laneS(x) - 1
      const y2 = laneS(x + 20) - 1
      trail += once(showIn([Math.round(t * 100) / 100, LOOP]), [x, y1], `<path d="M${x} ${y1}L${x + 20} ${y2}" stroke="#d9f0ff" stroke-opacity="0.85" stroke-width="4" stroke-linecap="round"/>`)
    }
    const snailEyes =
      once(showIn([0, 13.2], [15.6, LOOP]), SNAIL, `<circle cx="${sx + 30}" cy="${sy - 52}" r="5.4" fill="#fff" ${Ow(1.4)}/><circle cx="${sx + 44}" cy="${sy - 54}" r="5.4" fill="#fff" ${Ow(1.4)}/><circle cx="${sx + 31.5}" cy="${sy - 52}" r="2.4" fill="${INK}"/><circle cx="${sx + 45.5}" cy="${sy - 54}" r="2.4" fill="${INK}"/>`) +
      // Wheee: eyes shut with joy.
      once(showIn([13.2, 15.6]), SNAIL, `<circle cx="${sx + 30}" cy="${sy - 52}" r="5.4" fill="#fff" ${Ow(1.4)}/><circle cx="${sx + 44}" cy="${sy - 54}" r="5.4" fill="#fff" ${Ow(1.4)}/><path d="M${sx + 27} ${sy - 52}q3-3 6 0M${sx + 41} ${sy - 54}q3-3 6 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`)
    const snailMouth =
      once(showIn([0, 13.2]), SNAIL, `<path d="M${sx + 34} ${sy - 18}q5 3 9 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`) +
      once(showIn([13.2, LOOP]), SNAIL, `<path d="M${sx + 32} ${sy - 20}q6 8 12 0z" fill="#7a2a2a" ${Ow(1.2)}/>`)
    const stalks = (wave: boolean) =>
      anim({ type: 'keys', period: wave ? 0.5 : 2.4, keys: [{ t: 0, rot: wave ? -14 : -4 }, { t: wave ? 0.25 : 1.2, rot: wave ? 14 : 4, ease: 'inOut' }], pivot: [sx + 34, sy - 24] },
        `<path d="M${sx + 32} ${sy - 26}q-4-14 -2-26M${sx + 38} ${sy - 26}q4-14 6-28" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${sx + 32} ${sy - 26}q-4-14 -2-26M${sx + 38} ${sy - 26}q4-14 6-28" fill="none" stroke="#e8c79a" stroke-width="3" stroke-linecap="round"/>` +
          snailEyes)
    const snail = keys('snail', snailKeys, SNAIL,
      groundShadow(sx - 10, sy, 50, 4) +
        // Its foot ripples as it crawls.
        `<path d="M${sx - 58} ${sy}q4-14 30-16h40q18 0 22 16z" fill="url(#c19-snailbody)" ${Ow(1.8)}/>` +
        once(showIn([CRAWL[0], CRAWL[1]]), SNAIL, anim({ type: 'keys', period: 0.6, keys: [{ t: 0, x: 0 }, { t: 0.6, x: 30 }], pivot: [sx - 40, sy - 4] }, `<path d="M${sx - 50} ${sy - 4}h10M${sx - 30} ${sy - 4}h10" stroke="#c99a6a" stroke-width="2"/>`)) +
        `<path d="M${sx + 22} ${sy - 16}q2-14 14-14q14 0 14 16q-6 8-20 4z" fill="url(#c19-snailbody)" ${Ow(1.8)}/>` +
        once(showIn([0, 13]), SNAIL, stalks(false)) + once(showIn([13, LOOP]), SNAIL, stalks(true)) +
        snailMouth +
        `<circle cx="${sx - 16}" cy="${sy - 34}" r="30" fill="url(#c19-snailshell)" ${Ow(2)}/>` +
        `<path d="M${sx - 16} ${sy - 34}m-4 0a4 4 0 1 1 8 0a9 9 0 1 1-18 0a15 15 0 1 1 30 0a21 21 0 1 1-42 0" fill="none" stroke="#8a4a1a" stroke-width="2.6"/>` +
        `<path d="M${sx - 34} ${sy - 54}q10-10 26-8" fill="none" stroke="#fff" stroke-opacity="0.55" stroke-width="4" stroke-linecap="round"/>` +
        // Sparkles of slime as it slides.
        once(showIn([13.4, 15]), SNAIL, twinkle(sx - 60, sy - 6, 0.5, 0) + twinkle(sx - 80, sy - 2, 0.5, 0.5)))

    // --- The ladybird starter (an acorn-cap helmet in A only). ---
    const [lx, ly] = LADY
    const flagKeys: Keyframe[] = [{ t: 0, rot: 0 }, { t: 4.9, ease: 'inOut' }, { t: 5.1, rot: -40 }]
    for (let t = 5.25, i = 0; t < 5.95; t += 0.15, i++) flagKeys.push({ t: Math.round(t * 100) / 100, rot: i % 2 ? -40 : -60, ease: 'inOut' })
    flagKeys.push({ t: 5.95, rot: -50, ease: 'in' }, { t: 6.1, rot: 70, ease: 'out' }, { t: 7.5, ease: 'inOut' }, { t: 8, rot: 0 }, { t: 19.95, ease: 'step' })
    const ladybird =
      pebble(lx, ly + 16, 28, 14) +
      `<path d="M${lx - 6} ${ly}v-6M${lx + 6} ${ly}v-6" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>` +
      `<ellipse cx="${lx}" cy="${ly - 18}" rx="14" ry="16" fill="url(#c19-lady)" ${Ow(1.8)}/><path d="M${lx} ${ly - 33}v30" stroke="${INK}" stroke-width="1.6"/>` +
      `<circle cx="${lx - 6}" cy="${ly - 22}" r="3" fill="${INK}"/><circle cx="${lx + 6}" cy="${ly - 22}" r="3" fill="${INK}"/><circle cx="${lx - 6}" cy="${ly - 10}" r="2.6" fill="${INK}"/><circle cx="${lx + 6}" cy="${ly - 10}" r="2.6" fill="${INK}"/>` +
      `<circle cx="${lx}" cy="${ly - 40}" r="9" fill="#2b2b3a" ${Ow(1.6)}/><circle cx="${lx - 3}" cy="${ly - 41}" r="2.4" fill="#fff"/><circle cx="${lx + 4}" cy="${ly - 41}" r="2.4" fill="#fff"/><circle cx="${lx - 2.6}" cy="${ly - 41}" r="1.1" fill="${INK}"/><circle cx="${lx + 4.4}" cy="${ly - 41}" r="1.1" fill="${INK}"/>` +
      `<path d="M${lx - 3} ${ly - 49}q-4-8-8-8M${lx + 3} ${ly - 49}q4-8 8-8" fill="none" stroke="${INK}" stroke-width="1.4"/>` +
      // An acorn cap for a helmet (A only).
      diff(lx, ly - 50, 18, `<path d="M${lx - 10} ${ly - 46}q10-16 20 0z" fill="#9a6a3a" ${Ow(1.4)}/><path d="M${lx - 6} ${ly - 50}h12M${lx - 4} ${ly - 54}h8" stroke="#6e4a26" stroke-width="1.2"/><path d="M${lx} ${ly - 54}v-4" stroke="${INK}" stroke-width="2"/>`, '') +
      keys(undefined, flagKeys, [lx + 12, ly - 26],
        `<path d="M${lx + 12} ${ly - 26}l8-8" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/><path d="M${lx + 20} ${ly - 34}l8-30" stroke="#8a6236" stroke-width="2.4"/>` +
          `<path d="M${lx + 27} ${ly - 62}q16-4 22 6q-12 4-24 8z" fill="#fff" ${Ow(1.4)}/>`)

    // --- The caterpillar on its clover leaf: cheers the winner, wraps itself up, comes out a butterfly. ---
    const [cx0, cy0] = CATER
    const caterBody = (wave: boolean) =>
      [0, 1, 2, 3, 4]
        .map((i) => `<circle cx="${cx0 - 24 + i * 11}" cy="${cy0 - 8 - (wave && i === 4 ? 6 : 0)}" r="${i === 4 ? 10 : 8}" fill="${i % 2 ? '#8fd14a' : '#a8e05a'}" ${Ow(1.6)}/>`)
        .join('') +
      `<circle cx="${cx0 + 22}" cy="${cy0 - 16}" r="2.6" fill="${INK}"/><path d="M${cx0 + 18} ${cy0 - 22}l-2-8M${cx0 + 24} ${cy0 - 22}l4-8" stroke="${INK}" stroke-width="1.6"/><path d="M${cx0 + 20} ${cy0 - 10}q3 3 6 0" fill="none" stroke="${INK}" stroke-width="1.4"/>`
    const caterpillar =
      cloverStalk(cx0, cy0 + 4, 790) + leaflet(cx0 - 10, cy0 + 4, -50, 2) + leaflet(cx0 + 10, cy0 + 4, 50, 2) + leaflet(cx0, cy0 + 4, 0, 2) +
      once(showIn([0, CHEER[0]]), CATER, anim({ type: 'keys', period: 1.2, keys: [{ t: 0, sx: 1 }, { t: 0.6, sx: 0.92, ease: 'inOut' }], pivot: [cx0, cy0] }, caterBody(false))) +
      // Cheering: up on its back legs, bouncing.
      once(showIn([CHEER[0], CHEER[1]]), CATER, anim({ type: 'keys', period: 0.4, keys: [{ t: 0, y: 0, rot: -10 }, { t: 0.2, y: -8, rot: 10, ease: 'inOut' }], pivot: [cx0 - 20, cy0] }, caterBody(true))) +
      // The chrysalis: wraps up, wobbles.
      once(showIn([COCOON[0], COCOON[1]]), CATER,
        anim({ type: 'keys', period: 0.3, keys: [{ t: 0, rot: -6 }, { t: 0.15, rot: 6, ease: 'inOut' }], pivot: [cx0, cy0] },
          `<path d="M${cx0 - 22} ${cy0 - 8}q22-22 44 0q-22 16-44 0z" fill="#c8b06a" ${Ow(1.8)}/><path d="M${cx0 - 12} ${cy0 - 14}l4 12M${cx0} ${cy0 - 18}l2 16M${cx0 + 12} ${cy0 - 14}l-2 12" stroke="#9a7a3a" stroke-width="1.4"/>`)) +
      // Open, empty chrysalis afterwards.
      once(showIn([COCOON[1], LOOP]), CATER, `<path d="M${cx0 - 22} ${cy0 - 8}q8-12 18-10l6 8l6-8q8 2 14 10q-22 14-44 0z" fill="#c8b06a" ${Ow(1.6)}/>`)
    const butterfly = once(
      [{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t: COCOON[1], o: 1, ease: 'out' }, { t: 18.9, x: -20, y: -50, ease: 'inOut' }, { t: 19.4, x: -70, y: -20, ease: 'inOut' }, { t: 19.9, x: -40, y: -60, o: 1, ease: 'step' }],
      [cx0, cy0 - 14],
      `<g transform="translate(${cx0} ${cy0 - 14}) scale(1.7) translate(${-cx0} ${-(cy0 - 14)})">` +
      anim({ type: 'keys', period: 0.25, keys: [{ t: 0, sx: 1 }, { t: 0.125, sx: 0.25, ease: 'inOut' }], pivot: [cx0, cy0 - 14] },
        `<path d="M${cx0} ${cy0 - 14}q-24-26-30-4q2 12 30 4zM${cx0} ${cy0 - 14}q24-26 30-4q-2 12-30 4z" fill="url(#c19-wing)" ${Ow(1.6)}/>` +
          `<path d="M${cx0} ${cy0 - 12}q-18 8-14 18q8 0 14-18zM${cx0} ${cy0 - 12}q18 8 14 18q-8 0-14-18z" fill="#ffb35c" ${Ow(1.4)}/><circle cx="${cx0 - 16}" cy="${cy0 - 24}" r="3" fill="#fff"/><circle cx="${cx0 + 16}" cy="${cy0 - 24}" r="3" fill="#fff"/>`) +
        `<path d="M${cx0} ${cy0 - 22}v16" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><path d="M${cx0} ${cy0 - 22}l-4-8M${cx0} ${cy0 - 22}l4-8" stroke="${INK}" stroke-width="1.4"/></g>`,
    )
    // Pollen confetti as the ribbon breaks.
    let confetti = ''
    for (let i = 0; i < 14; i++) {
      const a = -Math.PI / 2 + (i - 6.5) * 0.22
      const c = ['#ffd23f', '#ff8fab', '#fff', '#7fd36a'][i % 4]
      confetti += once([{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t: 14.6, o: 1, ease: 'out' }, { t: 15.1, x: Math.round(Math.cos(a) * 90), y: Math.round(Math.sin(a) * 90), ease: 'in' }, { t: 16.2, x: Math.round(Math.cos(a) * 120), y: 30, o: 1, ease: 'step' }, { t: 16.25, o: 0, ease: 'step' }], [FINISH + 4, 730],
        `<circle cx="${FINISH + 4}" cy="730" r="3.4" fill="${c}" ${Ow(0.8)}/>`)
    }

    // --- More of the meadow: the giant daisies (a bee on one in A), clovers (one flower pink in A, white in B; the
    // lucky clover by the finish has four leaves in A, three in B: a hard one), a dewdrop on a leaf (A only). ---
    const daisies =
      daisy(640, 520, 770, 70) +
      daisy(1130, 600, 790, 58) +
      diff(1132, 578, 20, bee(1132, 580, buzz([1132, 576])), '') +
      daisy(1360, 470, 770, 64)
    const cloverHead = (x: number, y: number, c: string) => {
      let m = ''
      for (let i = 0; i < 12; i++) {
        const a = (i * 360) / 12
        m += `<ellipse transform="rotate(${a} ${x} ${y})" cx="${x}" cy="${y - 7}" rx="3" ry="7" fill="${c}" ${Ow(1)}/>`
      }
      return m + `<circle cx="${x}" cy="${y}" r="5" fill="${c}" ${Ow(1)}/>`
    }
    const clovers =
      cloverStalk(642, 768, 800) + leaflet(626, 790, -60, 1.3) + leaflet(658, 790, 60, 1.3) +
      diff(642, 768, 20, cloverHead(642, 768, '#ff8fb8'), cloverHead(642, 768, '#f8f4f6')) +
      cloverStalk(1000, 792, 830) +
      leaflet(1000, 792, 0, 1.4) + leaflet(1000, 792, 90, 1.4) + leaflet(1000, 792, 180, 1.4) +
      diff(986, 792, 20, leaflet(1000, 792, -90, 1.4), '') +
      `<circle cx="1000" cy="792" r="3" fill="#4f9a3a"/>`
    const leafDrop =
      `<path d="M680 770q20-120 70-170q-10 70-50 170z" fill="url(#c19-blade)" ${Ow(1.6)}/>` +
      diff(724, 612, 18, dew(724, 614, 8) + twinkle(722, 610, 2.4, 0.4), '')

    // --- Events of B: a grasshopper leaps across the corner, an ant carries a crumb along the beetle's lane, a spider
    // lets itself down over the finish. ---
    const HOPPER: [number, number] = [110, 760]
    const [gx, gy] = HOPPER
    const hopper = diff(
      gx + 8,
      gy - 20,
      42,
      '',
      keys('hopper', [{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t: 1.8, o: 1, ease: 'out' }, { t: 2.2, ease: 'out' }, { t: 2.55, x: 35, y: -70, ease: 'in' }, { t: 2.9, x: 70, y: -14, ease: 'out' }, { t: 3.2, ease: 'out' }, { t: 3.55, x: 130, y: -110, ease: 'in' }, { t: 3.9, x: 190, y: -8, o: 1, ease: 'step' }, { t: 3.95, o: 0, ease: 'step' }], HOPPER,
        `<path d="M${gx - 6} ${gy - 12}l-16-14l-4 26M${gx + 2} ${gy - 12}l-6 12" fill="none" stroke="#3f8f3a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` +
          `<path d="M${gx - 20} ${gy - 12}q16-14 40-6q-6 10-40 6z" fill="#7fc24a" ${Ow(1.6)}/><circle cx="${gx + 18}" cy="${gy - 18}" r="7" fill="#7fc24a" ${Ow(1.4)}/><circle cx="${gx + 20}" cy="${gy - 20}" r="2" fill="${INK}"/>` +
          `<path d="M${gx + 20} ${gy - 24}q8-16 22-18" fill="none" stroke="${INK}" stroke-width="1.2"/>`),
      'hopper',
      during(1.8, 3.95),
    )
    const ANT: [number, number] = [560, LANE_B]
    const [ax, ay] = ANT
    const ant = diff(
      ax,
      ay - 12,
      22,
      '',
      keys('ant', [{ t: 0, x: 0, o: 0, ease: 'step' }, { t: 10.4, o: 1, ease: 'linear' }, { t: 12.8, x: 240, o: 1, ease: 'step' }, { t: 12.85, o: 0, ease: 'step' }], ANT,
        anim({ type: 'keys', period: 0.24, keys: [{ t: 0, y: 0 }, { t: 0.12, y: -1.5, ease: 'inOut' }], pivot: ANT },
          `<path d="M${ax - 8} ${ay - 6}l-4 6M${ax} ${ay - 6}l0 6M${ax + 6} ${ay - 6}l4 6" stroke="${INK}" stroke-width="1.6"/>` +
            `<ellipse cx="${ax - 10}" cy="${ay - 8}" rx="6" ry="5" fill="#3a2a2a" ${Ow(1.2)}/><circle cx="${ax}" cy="${ay - 8}" r="3.6" fill="#3a2a2a" ${Ow(1.2)}/><circle cx="${ax + 8}" cy="${ay - 10}" r="4.4" fill="#3a2a2a" ${Ow(1.2)}/>` +
            `<path d="M${ax + 10} ${ay - 14}q4-6 8-6" fill="none" stroke="${INK}" stroke-width="1.2"/>` +
            // The crumb held over its head.
            `<path d="M${ax - 2} ${ay - 26}l10-4l8 6l-4 8l-12 0z" fill="#e8c27a" ${Ow(1.3)}/>`)),
      'ant',
      during(10.4, 12.85),
    )
    const SPIDER: [number, number] = [1060, 566]
    const [px, py] = SPIDER
    const thread = `<path d="M${px} 380V${py - 26}" stroke="#fff" stroke-opacity="0.8" stroke-width="1.2"/>` + dew(px, py - 26, 2.6)
    const spider = diff(
      px,
      py - 6,
      28,
      '',
      keys('spider', [{ t: 0, y: -80, o: 0, ease: 'step' }, { t: 15.2, o: 1, ease: 'out' }, { t: 15.8, y: 0, ease: 'inOut' }, { t: 16.8, ease: 'in' }, { t: 17.2, y: -80, o: 1, ease: 'step' }, { t: 17.25, o: 0, ease: 'step' }], SPIDER,
        `<path d="M${px} ${py - 24}V${py - 10}" stroke="#fff" stroke-width="1.2"/>` +
          [-1, 1].map((d) => `<path d="M${px} ${py}l${d * 12}-8l${d * 6}-6M${px} ${py}l${d * 14}-2l${d * 6} 6M${px} ${py}l${d * 12} 6l${d * 4} 8" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`).join('') +
          `<circle cx="${px}" cy="${py}" r="9" fill="#4a3a5a" ${Ow(1.4)}/><circle cx="${px - 3}" cy="${py + 1}" r="2.4" fill="#fff"/><circle cx="${px + 3}" cy="${py + 1}" r="2.4" fill="#fff"/><circle cx="${px - 3}" cy="${py + 1.4}" r="1.1" fill="${INK}"/><circle cx="${px + 3}" cy="${py + 1.4}" r="1.1" fill="${INK}"/>`),
      'spider',
      during(15.2, 17.25),
    )

    // Dew sparkles about the meadow.
    let sparkles = ''
    for (let i = 0; i < 16; i++) sparkles += twinkle(Math.round(rand() * W), Math.round(380 + rand() * 420), 2 + rand() * 2, rand())
    // Front grass blades at the very bottom.
    const front = blade(260, 910, 160, 30, 20) + blade(820, 910, 130, -20, 18) + blade(1240, 910, 170, 26, 22) + blade(20, 910, 120, 20, 18)

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c19-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6f0"/><stop offset="0.6" stop-color="#e2f4d0"/><stop offset="1" stop-color="#cfe8a8"/></linearGradient>` +
      `<radialGradient id="c19-glow"><stop offset="0" stop-color="#fff8d0" stop-opacity="0.95"/><stop offset="0.4" stop-color="#fff0b0" stop-opacity="0.35"/><stop offset="1" stop-color="#fff0b0" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c19-soil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6236"/><stop offset="1" stop-color="#5e3f22"/></linearGradient>` +
      `<linearGradient id="c19-blade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4f9a3a"/><stop offset="0.6" stop-color="#7fc24a"/><stop offset="1" stop-color="#a8dc6a"/></linearGradient>` +
      `<linearGradient id="c19-blade-flat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b6e27a"/><stop offset="1" stop-color="#5f9e3a"/></linearGradient>` +
      `<radialGradient id="c19-leaf" cx="0.6" cy="0.3" r="0.9"><stop offset="0" stop-color="#b6e27a"/><stop offset="1" stop-color="#4f9a3a"/></radialGradient>` +
      `<radialGradient id="c19-petal" cx="0.5" cy="0.2" r="0.9"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e8e4f0"/></radialGradient>` +
      `<radialGradient id="c19-disc" cx="0.6" cy="0.3" r="0.8"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#e8a020"/></radialGradient>` +
      `<radialGradient id="c19-clover" cx="0.6" cy="0.3" r="0.9"><stop offset="0" stop-color="#9fdc6a"/><stop offset="1" stop-color="#3f8f3a"/></radialGradient>` +
      `<radialGradient id="c19-cap" cx="0.6" cy="0.3" r="0.8"><stop offset="0" stop-color="#ff6a5a"/><stop offset="1" stop-color="#b8231a"/></radialGradient>` +
      `<radialGradient id="c19-pebble" cx="0.4" cy="0.3" r="0.9"><stop offset="0" stop-color="#d6d2c8"/><stop offset="1" stop-color="#8a867c"/></radialGradient>` +
      `<radialGradient id="c19-dew" cx="0.4" cy="0.35" r="0.7"><stop offset="0" stop-color="#ffffff" stop-opacity="0.9"/><stop offset="1" stop-color="#8fd3f0" stop-opacity="0.55"/></radialGradient>` +
      `<radialGradient id="c19-bigdew" cx="0.4" cy="0.35" r="0.75"><stop offset="0" stop-color="#ffffff" stop-opacity="0.35"/><stop offset="0.7" stop-color="#a8e0f5" stop-opacity="0.4"/><stop offset="1" stop-color="#5fb0d8" stop-opacity="0.65"/></radialGradient>` +
      `<radialGradient id="c19-shell" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#5fa8d8"/><stop offset="0.5" stop-color="#2f5fa0"/><stop offset="1" stop-color="#1f2f5a"/></radialGradient>` +
      `<radialGradient id="c19-snailshell" cx="0.62" cy="0.3" r="0.85"><stop offset="0" stop-color="#ffc27a"/><stop offset="0.55" stop-color="#d9823a"/><stop offset="1" stop-color="#9a4a1a"/></radialGradient>` +
      `<linearGradient id="c19-snailbody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0d6a8"/><stop offset="1" stop-color="#c99a6a"/></linearGradient>` +
      `<radialGradient id="c19-lady" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#ff7a6a"/><stop offset="1" stop-color="#c0231a"/></radialGradient>` +
      `<radialGradient id="c19-wing" cx="0.5" cy="0.5" r="0.7"><stop offset="0" stop-color="#ffd23f"/><stop offset="1" stop-color="#ff7a3a"/></radialGradient>` +
      `<radialGradient id="c19-sunlight" cx="0.82" cy="0.13" r="1"><stop offset="0" stop-color="#fff6cc" stop-opacity="0.3"/><stop offset="0.5" stop-color="#fff6cc" stop-opacity="0.06"/><stop offset="1" stop-color="#fff6cc" stop-opacity="0"/></radialGradient></defs>` +
      sky +
      backBlades +
      ground +
      web +
      dandelion +
      mushrooms +
      owlMoth +
      daisies +
      leafDrop +
      lanes +
      trail +
      finish +
      thread +
      spider +
      beetle +
      dewdrop +
      popSplash +
      snail +
      ladybird +
      caterpillar +
      butterfly +
      confetti +
      clovers +
      ant +
      hopper +
      sparkles +
      front +
      `<rect width="${W}" height="${H}" fill="url(#c19-sunlight)"/>`
    )
  },
})

/** Legs swinging back and forth in the given spans, each with its own step (a local copy of shapes' swingKeys). */
function swingFor(spans: [number, number, number][], angle: number, flip = false): Keyframe[] {
  const k: Keyframe[] = [{ t: 0, rot: 0 }]
  for (const [from, to, step] of spans) {
    k.push({ t: from, rot: 0, ease: 'inOut' })
    let i = 0
    for (let t = from + step; t < to; t += step, i++) k.push({ t: Math.round(t * 100) / 100, rot: (i % 2 ? -angle : angle) * (flip ? -1 : 1), ease: 'inOut' })
    k.push({ t: to, rot: 0 })
  }
  return k
}
