// Cartoon "The penguin slide" (docs/cartoon-mode.md), made like 812: a 20 s Arctic story told by a camera. Penguins
// belly-slide one by one down an ice slope into the sea; the smallest one, in a scarf, peeks over the top, trembles,
// backs off, takes a run — and stops dead on the very lip, wobbling. A seal pops up, the little one tips onto its
// nose, and the seal tosses it like a ball, far over the water, onto the belly of a sleeping polar bear. It bounces
// there like on a trampoline; the bear only smiles in its sleep. Ten differences: two hard (an icicle under the
// bear's floe, the walrus's tusk), three events of the story (an arctic fox, a fish leaping, the whale's spout).
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { farBird, INK, NATURE_DEFS, Ow } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // The slide: penguins whizz down one by one.
  { t: 1.6, x: 60, y: 380, w: 600, ease: 'step' },
  // The smallest one at the top: peeks over, trembles, backs off, takes a run.
  { t: 6.3, x: 120, y: 400, w: 300, ease: 'step' },
  { t: 8.5, x: 150, y: 400, w: 480, ease: 'inOut' },
  { t: 9.5, x: 380, y: 520, w: 320, ease: 'step' },
  // Stuck on the lip; the seal.
  { t: 9.55, x: 420, y: 540, w: 300, ease: 'step' },
  // Tossed over the water.
  { t: 12.2, x: 380, y: 300, w: 900, ease: 'inOut' },
  { t: 13.8, x: 520, y: 300, w: 900, ease: 'step' },
  // On the sleeping bear's belly.
  { t: 13.85, x: 960, y: 540, w: 380, ease: 'step' },
  // The floes, the walrus, the iceberg, the whale.
  { t: 17.2, x: 760, y: 440, w: 640 },
  { t: 19.95, x: 770, y: 444, w: 630, ease: 'step' },
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

/** The sea's surface at the shelf's lip. */
const WATER = 704
/** The slide's groove: a quadratic curve from the top of the hill to the lip of the shelf. */
const SLIDE: [number, number][] = [[262, 472], [420, 524], [556, 648]]
/** A point of the slide at share `t` and the angle of its slope there (degrees). */
function slideAt(t: number) {
  const [p0, p1, p2] = SLIDE
  const u = 1 - t
  const x = u * u * p0[0] + 2 * t * u * p1[0] + t * t * p2[0]
  const y = u * u * p0[1] + 2 * t * u * p1[1] + t * t * p2[1]
  const dx = 2 * u * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0])
  const dy = 2 * u * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1])
  return { x, y, a: (Math.atan2(dy, dx) * 180) / Math.PI }
}

/**
 * Keyframes of a penguin whose body center rests at `rest` (feet on the platform): waddles to the top of the slide,
 * flops onto its belly, whizzes down (`from`–`to`) lying on the slope `lift` above it, and dives into the sea.
 */
function slideKeys(rest: [number, number], start: number, lift: number, dive = true): Keyframe[] {
  const at = (t: number) => {
    const p = slideAt(t)
    const r = (p.a * Math.PI) / 180
    return { x: Math.round(p.x + Math.sin(r) * lift - rest[0]), y: Math.round(p.y - Math.cos(r) * lift - rest[1]), rot: Math.round(90 + p.a) }
  }
  const k: Keyframe[] = [
    { t: 0, x: 0, y: 0, rot: 0, o: 1 },
    { t: start, ease: 'inOut' },
    // A waddle to the top, a flop.
    { t: start + 0.25, x: at(0).x - 6, y: -4, rot: 0, ease: 'in' },
    { t: start + 0.45, ...at(0), ease: 'in' },
  ]
  for (let i = 1; i <= 4; i++) k.push({ t: start + 0.45 + i * 0.2, ...at(i / 4), ease: i === 4 ? 'out' : 'linear' })
  if (dive) {
    const end = start + 1.25
    k.push(
      { t: end + 0.15, x: 610 - rest[0], y: 676 - rest[1], rot: 150, ease: 'in' },
      { t: end + 0.3, x: 630 - rest[0], y: 712 - rest[1], rot: 170, o: 1, ease: 'step' },
      { t: end + 0.35, o: 0, ease: 'step' },
    )
  }
  return k
}

/** The smallest penguin, in a scarf: its feet rest here, at the back of the queue (drawn at CHICK_SCALE). */
const CHICK: [number, number] = [146, 470]
const CHICK_SCALE = 0.75
/** Its body center: the pivot of its turns. */
const CHICK_C: [number, number] = [CHICK[0], CHICK[1] - 22 * CHICK_SCALE]
/** The seal's nose, out of the water by the lip. */
const SEAL: [number, number] = [606, WATER]
/** The top of the sleeping bear's belly: the landing. */
const BELLY: [number, number] = [1150, 672]

function chickKeys(): Keyframe[] {
  const [cx, cy] = CHICK_C
  const feet = (x: number, y: number) => ({ x: x - CHICK[0], y: y - CHICK[1] })
  const slide = (t: number) => {
    const p = slideAt(t)
    const r = (p.a * Math.PI) / 180
    const lift = 14 * CHICK_SCALE
    return { x: Math.round(p.x + Math.sin(r) * lift - cx), y: Math.round(p.y - Math.cos(r) * lift - cy), rot: Math.round(90 + p.a) }
  }
  const k: Keyframe[] = [
    { t: 0, x: 0, y: 0, rot: 0, sy: 1 },
    // Up the queue to the top.
    { t: 6.2, ease: 'inOut' },
    { t: 6.6, ...feet(236, 470), ease: 'inOut' },
    // A peek over the edge — and a tremble.
    { t: 6.9, rot: 16, ease: 'inOut' },
    ...Array.from({ length: 7 }, (_, i) => ({ t: 7 + i * 0.09, x: 236 - CHICK[0] + (i % 2 ? 2 : -2), ease: 'linear' as const })),
    { t: 7.65, ...feet(236, 470), rot: 16, ease: 'inOut' },
    // Back off; take heart; run.
    { t: 7.9, ...feet(196, 470), rot: 0, ease: 'inOut' },
    { t: 8.05, sy: 0.88, ease: 'inOut' },
    { t: 8.2, sy: 1, ease: 'in' },
    { t: 8.5, ...feet(252, 470), ease: 'in' },
    { t: 8.65, ...slide(0), ease: 'linear' },
    { t: 8.85, ...slide(0.25), ease: 'linear' },
    { t: 9.05, ...slide(0.5), ease: 'linear' },
    { t: 9.25, ...slide(0.75), ease: 'out' },
    { t: 9.45, ...slide(0.97), ease: 'out' },
    // Up on its feet on the very lip: wobbling.
    { t: 9.6, ...feet(546, 646), rot: 0, ease: 'inOut' },
    ...Array.from({ length: 7 }, (_, i) => ({ t: 9.85 + i * 0.25, rot: i % 2 ? -14 : 14, ease: 'inOut' as const })),
    // Tips over onto the seal's nose and balances there.
    { t: 11.6, rot: 0, ease: 'in' },
    { t: 11.85, ...feet(SEAL[0], SEAL[1] - 45), rot: 20, ease: 'out' },
    { t: 12, rot: -10, ease: 'inOut' },
    { t: 12.15, rot: 6, ease: 'in' },
    // Tossed in a high arc onto the bear.
    { t: 13, ...feet(850, 360), rot: 360, ease: 'in' },
    { t: 13.8, ...feet(BELLY[0], BELLY[1]), rot: 720, ease: 'out' },
    // Boing — boing.
    { t: 14.1, ...feet(BELLY[0], BELLY[1] - 60), rot: 720, ease: 'in' },
    { t: 14.4, ...feet(BELLY[0], BELLY[1]), ease: 'out' },
    { t: 14.68, ...feet(BELLY[0], BELLY[1] - 28), ease: 'in' },
    { t: 14.95, ...feet(BELLY[0], BELLY[1]), ease: 'inOut' },
    { t: 19.95, ease: 'step' },
  ]
  return k
}

export default svgLevel({
  id: 810,
  chapter: 'cartoon',
  title: 'cartoonPenguinSlide',
  parTimeSec: 100,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const blink = (period: number, phase = 0) => (m: string) => anim({ type: 'blink', duty: 0.07, period, phase }, m)
    const beat = (pivot: [number, number], every: number, phase = 0) => (m: string) =>
      anim({ type: 'keys', period: every, phase, keys: [{ t: 0, sy: 1 }, { t: every / 2, sy: 0.3, ease: 'inOut' }], pivot }, m)
    const shadow = (x: number, y: number, rx: number, ry: number) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#c13-shadow)"/>`

    /** A penguin standing on (x, y), facing right, `s` times its size; `flap` wraps its flipper. */
    const penguin = (x: number, y: number, s: number, flap: (m: string) => string = (m) => m, extra = '') =>
      `<g transform="translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})">` +
      `<ellipse cx="${x - 5}" cy="${y - 1}" rx="6" ry="3" fill="#f59a2a" ${Ow(1.3)}/><ellipse cx="${x + 7}" cy="${y - 1}" rx="6" ry="3" fill="#f59a2a" ${Ow(1.3)}/>` +
      `<ellipse cx="${x}" cy="${y - 22}" rx="14" ry="21" fill="url(#c13-penguin)" ${Ow(1.8)}/>` +
      `<ellipse cx="${x + 5}" cy="${y - 19}" rx="8.5" ry="15" fill="#fbfbf6"/>` +
      `<circle cx="${x + 2}" cy="${y - 40}" r="11" fill="url(#c13-penguin)" ${Ow(1.8)}/>` +
      `<ellipse cx="${x + 6}" cy="${y - 40}" rx="5.5" ry="6" fill="#fbfbf6"/><circle cx="${x + 7}" cy="${y - 42}" r="2" fill="${INK}"/><circle cx="${x + 7.6}" cy="${y - 42.6}" r="0.7" fill="#fff"/>` +
      `<path d="M${x + 11} ${y - 42}l9 2.5l-9 3z" fill="#f59a2a" ${Ow(1.2)}/>` +
      `<path d="M${x + 4} ${y - 31}q4 1 6 4" fill="none" stroke="#f5c542" stroke-width="2" stroke-linecap="round"/>` +
      flap(`<path d="M${x - 6} ${y - 30}q-8 10-8 22q6-2 10-12z" fill="#1f2533" ${Ow(1.4)}/>`) +
      extra +
      `</g>`

    /**
     * The game's owl (the app icon's: ear tufts, face disks, amber eyes, orange beak, brows) as a snowy owl: white
     * plumage with dark specks, perched on (x, y).
     */
    const snowyOwl = (x: number, y: number, s: number) =>
      `<g transform="translate(${x} ${y}) scale(${Math.round(s * 62) / 100}) translate(-54 -86)">` +
      `<path d="M30 60q-8 14 2 26l8-6zM78 60q8 14-2 26l-8-6z" fill="#dfe5ee" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>` +
      `<path d="M31 42L33.5 27.5L45 36Q54 33.5 63 36L74.5 27.5L77 42Q83 53 80 66Q74 82 54 82Q34 82 28 66Q25 53 31 42Z" fill="#f6f8fb" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>` +
      `<path d="M38 70l2 2M46 74l2 2M60 74l2 2M68 70l2 2M34 60l2 2M74 60l2 2M50 78l2 1M58 78l2 1" stroke="#5b6472" stroke-width="2.2" stroke-linecap="round"/>` +
      [42.5, 65.5].map((ex) => `<circle cx="${ex}" cy="54" r="12.5" fill="#ffffff" stroke="#c8d0db" stroke-width="1.2"/><circle cx="${ex}" cy="54" r="9.6" fill="#fff"/><circle cx="${ex}" cy="54" r="6.6" fill="url(#ke-owl-iris)"/><circle cx="${ex}" cy="54" r="3.4" fill="#1b1410"/><circle cx="${ex + 2}" cy="51.8" r="1.7" fill="#fff"/>`).join('') +
      blink(3.3, 0.2)(`<circle cx="42.5" cy="54" r="10.4" fill="#f6f8fb"/><circle cx="65.5" cy="54" r="10.4" fill="#f6f8fb"/><path d="M33 55h19M56 55h19" stroke="#8a93a3" stroke-width="2"/>`) +
      `<path d="M50.5 63h7L54 70.5Z" fill="#ff9f1c" stroke="#d97706" stroke-width="1" stroke-linejoin="round"/>` +
      `<path d="M33 40.5q9-4 18 1.5M75 40.5q-9-4-18 1.5" fill="none" stroke="#8a93a3" stroke-width="2.6" stroke-linecap="round"/>` +
      `<path d="M45 82v4M49 82v4M59 82v4M63 82v4" stroke="#5b6472" stroke-width="2.6" stroke-linecap="round"/>` +
      `</g>`

    // --- Sky with faint northern lights and a low pink sun, far glaciers, the sea. ---
    const aurora = [
      ['#7dffc4', 90, 0],
      ['#9a8cff', 150, 0.3],
      ['#6ff0e6', 210, 0.6],
    ]
      .map(([c, y, phase]) =>
        anim({ type: 'keys', period: 9, phase: phase as number, keys: [{ t: 0, x: 0, sy: 1 }, { t: 4.5, x: 40, sy: 1.3, ease: 'inOut' }], pivot: [720, y as number] },
          `<path d="M-40 ${y}q180-60 360 0t360 0t360 0t360 0t360 0" fill="none" stroke="${c}" stroke-opacity="0.15" stroke-width="44" stroke-linecap="round"/>`))
      .join('')
    let far = ''
    for (let i = 0; i < 9; i++) {
      const fx = Math.round(i * 170 + rand() * 60)
      const h = Math.round(30 + rand() * 40)
      far += `<path d="M${fx - 90} 482l${60 + Math.round(rand() * 20)}-${h}l40 ${Math.round(h * 0.4)}l50-${Math.round(h * 0.5)}l40 ${h}z" fill="url(#c13-far)" ${Ow(1.2)}/>`
    }
    let sparkles = ''
    for (let i = 0; i < 18; i++) {
      const sx = Math.round(560 + rand() * 860)
      const sy = Math.round(500 + rand() * 380)
      if (Math.abs(sx - 900) < 60 && sy < 600) continue
      sparkles += anim({ type: 'blink', duty: 0.3, period: 1.6 + rand() * 1.8, phase: rand() }, `<path d="M${sx - 8} ${sy}h16" stroke="#fff" stroke-opacity="0.75" stroke-width="2.4" stroke-linecap="round"/>`)
    }
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c13-sky)"/>` +
      aurora +
      `<circle cx="1200" cy="452" r="150" fill="url(#c13-glow)"/>` +
      `<circle cx="1200" cy="452" r="38" fill="#ffc9a8" stroke="#f29a7a" stroke-width="3"/>` +
      `<ellipse cx="1188" cy="446" rx="3.6" ry="5.6" fill="${INK}"/><ellipse cx="1212" cy="446" rx="3.6" ry="5.6" fill="${INK}"/>` +
      `<path d="M1188 462q12 9 24 0" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>` +
      // Arctic terns crossing.
      keys(undefined, [{ t: 0, x: 0, y: 0 }, { t: 10, y: -30, ease: 'inOut' }, { t: 19.9, x: -1600, y: 0 }], [1480, 300],
        ([[1480, 300], [1504, 288], [1506, 314], [1528, 278]] as [number, number][]).map(([fx, fy], i) => farBird(fx, fy, beat([fx, fy - 2], 0.5, i * 0.2))).join('')) +
      far +
      `<rect y="480" width="${W}" height="${H - 480}" fill="url(#c13-sea)"/>` +
      `<path d="M0 482h${W}" stroke="#fff" stroke-opacity="0.5" stroke-width="2"/>` +
      sparkles

    // --- The iceberg (a puffin on its ledge in A only), the far whale (its spout in B), penguins porpoising. ---
    const iceberg =
      `<path d="M1150 612l40-142l50-40l50 50l50-30l50 162z" fill="url(#c13-berg)" ${Ow(2)}/>` +
      `<path d="M1240 430l-20 70l30 40M1340 450l-30 80" fill="none" stroke="#9cc9e6" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M1180 552h44l-6 8h-34z" fill="#dff1fb" ${Ow(1.6)}/>` +
      `<path d="M1150 612q120 12 240 0" fill="none" stroke="#fff" stroke-opacity="0.6" stroke-width="3"/>`
    const puffin =
      `<path d="M1204 552v-4M1210 552v-4" stroke="#f59a2a" stroke-width="2.4" stroke-linecap="round"/>` +
      `<ellipse cx="1207" cy="536" rx="8" ry="12" fill="#1f2533" ${Ow(1.5)}/><ellipse cx="1210" cy="538" rx="4.5" ry="9" fill="#fff"/>` +
      `<circle cx="1208" cy="522" r="7" fill="#1f2533" ${Ow(1.5)}/><circle cx="1210" cy="522" r="4.6" fill="#fff"/><circle cx="1211" cy="521" r="1.4" fill="${INK}"/>` +
      `<path d="M1214 519l9 4l-9 4z" fill="#f2683a" ${Ow(1.2)}/><path d="M1214 522h7" stroke="#ffd23f" stroke-width="1.4"/>`
    const WHALE: [number, number] = [900, 560]
    const whale =
      `<path d="M858 562q42-30 84 0z" fill="#3c5a78" ${Ow(1.8)}/><circle cx="876" cy="554" r="1.6" fill="${INK}"/>` +
      anim({ type: 'keys', period: 3, keys: [{ t: 0, rot: -6 }, { t: 1.5, rot: 10, ease: 'inOut' }], pivot: [946, 560] }, `<path d="M942 560q10-6 14-16q-2 10 10 12q-10 6-18 6z" fill="#3c5a78" ${Ow(1.6)}/>`) +
      `<path d="M852 564h96" stroke="#fff" stroke-opacity="0.6" stroke-width="2.4"/>`
    const spout = diff(
      WHALE[0] - 4,
      WHALE[1] - 40,
      34,
      '',
      once(showIn([17.2, 19.8]), WHALE,
        anim({ type: 'keys', period: 0.8, keys: [{ t: 0, sy: 0.8 }, { t: 0.4, sy: 1.1, ease: 'inOut' }], pivot: [896, 548] },
          `<path d="M896 548q-4-26-2-44q-14-6-22 4M896 548q4-26 2-44q14-6 22 4" fill="none" stroke="#e8f7fd" stroke-width="5" stroke-linecap="round"/>` +
            `<circle cx="874" cy="510" r="4" fill="#e8f7fd"/><circle cx="918" cy="510" r="4" fill="#e8f7fd"/><circle cx="896" cy="500" r="5" fill="#e8f7fd"/>`)),
      undefined,
      during(17.2, 19.8),
    )
    const porpoise = (x: number, y: number, phase: number) =>
      anim({ type: 'keys', period: 4.5, phase, keys: [{ t: 0, x: 0, y: 14, rot: -40, o: 0 }, { t: 0.3, o: 1 }, { t: 0.9, x: 40, y: -18, rot: 0, ease: 'inOut' }, { t: 1.5, x: 80, y: 14, rot: 40, o: 1 }, { t: 1.6, o: 0, ease: 'step' }], pivot: [x, y] },
        `<ellipse cx="${x}" cy="${y}" rx="12" ry="6" fill="#1f2533" ${Ow(1.3)}/><ellipse cx="${x + 2}" cy="${y + 2}" rx="8" ry="3" fill="#fbfbf6"/><path d="M${x + 11} ${y - 1}l6 2l-6 2z" fill="#f59a2a"/>`)
    const porpoising = porpoise(640, 612, 0) + porpoise(700, 624, 0.35) + porpoise(1000, 640, 0.6)

    // --- The ice shelf with the slide hill, a flag on top (A only), the queue of penguins, the snowy owl, an ice
    // hummock (an arctic fox peeks out behind it in B), an arctic hare (A only). ---
    let crust = ''
    for (let i = 0; i < 14; i++) {
      const sx = Math.round(20 + rand() * 500)
      const sy = Math.round(730 + rand() * 160)
      crust += `<path d="M${sx - 14} ${sy}q14-6 28 0" fill="none" stroke="#a9cde6" stroke-width="2"/>`
    }
    const shelf =
      `<path d="M0 636q300-14 556 12l16 56q-10 60-32 196H0z" fill="url(#c13-ice)" ${Ow(2.2)}/>` +
      `<path d="M556 648l16 56q-10 60-32 196h-30q18-140 30-250z" fill="#9fd0ea" fill-opacity="0.7"/>` +
      `<path d="M0 ${WATER + 30}h548" stroke="#bfe3f5" stroke-width="2" stroke-opacity="0.6"/>` +
      crust +
      // The hill with its slide.
      `<path d="M40 642q10-156 80-172h144q156 50 292 178z" fill="url(#c13-ice)" ${Ow(2.2)}/>` +
      `<path d="M60 600q30-90 80-110M140 520q40-20 90-24" fill="none" stroke="#bfe3f5" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M${SLIDE[0].join(' ')}Q${SLIDE[1].join(' ')} ${SLIDE[2].join(' ')}" fill="none" stroke="${INK}" stroke-width="18" stroke-linecap="round"/>` +
      `<path d="M${SLIDE[0].join(' ')}Q${SLIDE[1].join(' ')} ${SLIDE[2].join(' ')}" fill="none" stroke="#9fd6f2" stroke-width="13" stroke-linecap="round"/>` +
      `<path d="M${SLIDE[0][0]} ${SLIDE[0][1] - 3}Q${SLIDE[1][0]} ${SLIDE[1][1] - 3} ${SLIDE[2][0]} ${SLIDE[2][1] - 3}" fill="none" stroke="#fff" stroke-width="3" stroke-opacity="0.8"/>`
    // A flag stuck in the hill beside the slide (A only).
    const flag = diff(
      366,
      578,
      26,
      `<path d="M360 600v-42" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/><path d="M360 600v-42" stroke="#c49462" stroke-width="1.6"/>` +
        anim({ type: 'keys', period: 1.2, keys: [{ t: 0, sx: 1 }, { t: 0.6, sx: 0.8, ease: 'inOut' }], pivot: [360, 564] }, `<path d="M360 558l26 6l-26 8z" fill="#e63946" ${Ow(1.4)}/>`),
      '',
    )
    const hummock =
      shadow(330, 712, 50, 6) +
      `<path d="M296 712l6-34l24-10l18 14l20-6l8 36z" fill="url(#c13-ice)" ${Ow(2)}/><path d="M326 668l-4 40M344 682l6 26" stroke="#a9cde6" stroke-width="2"/>`
    const FOX: [number, number] = [366, 690]
    const [fx, fy] = FOX
    const fox = diff(
      fx + 2,
      fy - 8,
      30,
      '',
      keys('fox', [{ t: 0, x: -14, o: 0, ease: 'step' }, { t: 2, o: 1, ease: 'out' }, { t: 2.4, x: 0 }, { t: 3.6, rot: 0, ease: 'inOut' }, { t: 3.9, rot: 12, ease: 'inOut' }, { t: 4.6, rot: 0, ease: 'inOut' }, { t: 5.2, ease: 'in' }, { t: 5.55, x: -14, o: 1, ease: 'step' }, { t: 5.6, o: 0, ease: 'step' }], FOX,
        `<path d="M${fx - 12} ${fy - 10}l-2-14l9 8zM${fx + 4} ${fy - 12}l4-14l4 12z" fill="#f4f6fa" ${Ow(1.4)}/>` +
          `<path d="M${fx - 14} ${fy + 4}q-2-18 12-20q16 0 18 12l8 6q-8 6-20 6q-12 0-18-4z" fill="#f4f6fa" ${Ow(1.6)}/>` +
          `<circle cx="${fx - 2}" cy="${fy - 4}" r="2" fill="${INK}"/><circle cx="${fx + 9}" cy="${fy - 4}" r="2" fill="${INK}"/><circle cx="${fx + 23}" cy="${fy + 2}" r="2" fill="${INK}"/>`),
      'fox',
      during(2, 5.6),
    )
    const hare =
      shadow(452, 716, 22, 4) +
      `<ellipse cx="444" cy="712" rx="9" ry="4" fill="#f4f6fa" ${Ow(1.3)}/>` +
      `<ellipse cx="452" cy="700" rx="15" ry="13" fill="#f4f6fa" ${Ow(1.6)}/><circle cx="440" cy="702" r="5" fill="#fff" ${Ow(1.2)}/>` +
      `<circle cx="462" cy="688" r="9" fill="#f4f6fa" ${Ow(1.6)}/>` +
      anim({ type: 'keys', period: 2.2, keys: [{ t: 0, rot: 0 }, { t: 0.2, rot: -10, ease: 'inOut' }, { t: 0.4, rot: 0 }], pivot: [460, 682] },
        `<ellipse cx="458" cy="670" rx="3.6" ry="11" fill="#f4f6fa" ${Ow(1.3)}/><path d="M458 660v-3" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
          `<ellipse cx="465" cy="671" rx="3.6" ry="11" fill="#f4f6fa" ${Ow(1.3)}/><path d="M465 661v-3" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`) +
      `<circle cx="466" cy="687" r="1.8" fill="${INK}"/><circle cx="471" cy="690" r="1.4" fill="#e8798f"/>`
    const owl = snowyOwl(96, 476, 0.95)

    // --- The penguins of the queue and the little one; the seal; a fish leaping (B). ---
    const flipper = (pivot: [number, number], phase: number) => (m: string) =>
      anim({ type: 'keys', period: 0.5, phase, keys: [{ t: 0, rot: 0 }, { t: 0.25, rot: -18, ease: 'inOut' }], pivot }, m)
    const queue = ([[236, 0], [206, 1.4], [176, 2.8]] as [number, number][])
      .map(([qx, delay], i) => {
        const rest: [number, number] = [qx, 470 - 22]
        // Each steps up the queue as the one ahead goes.
        const k = slideKeys(rest, 1.8 + delay, 14)
        if (i > 0) k.splice(1, 0, { t: 1.8 + delay - 0.5, x: 0, ease: 'inOut' }, { t: 1.8 + delay - 0.1, x: 236 - qx })
        return keys(undefined, k, rest, shadow(qx, 470, 14, 3) + penguin(qx, 470, 1, flipper([qx - 6, 440], i * 0.15)))
      })
      .join('')
    const scarf = (c: string) =>
      `<path d="M${CHICK[0] - 9} ${CHICK[1] - 33}q11 5 22 0v5q-11 5-22 0z" fill="${c}" ${Ow(1.2)}/>` +
      `<path d="M${CHICK[0] - 6} ${CHICK[1] - 30}l-8 12l6 2l6-12z" fill="${c}" ${Ow(1.2)}/>` +
      `<path d="M${CHICK[0] - 4} ${CHICK[1] - 32}v5M${CHICK[0] + 4} ${CHICK[1] - 32}v5M${CHICK[0] - 10} ${CHICK[1] - 22}l5 2" stroke="#fff" stroke-width="2"/>`
    const sweat = once(showIn([6.9, 7.7]), CHICK_C,
      anim({ type: 'keys', period: 0.6, keys: [{ t: 0, y: 0, o: 1 }, { t: 0.6, y: 10, o: 0 }], pivot: [CHICK[0] - 6, CHICK[1] - 50] },
        `<path d="M${CHICK[0] - 6} ${CHICK[1] - 54}q4 6 0 8q-4-2 0-8z" fill="#9fd6f2" ${Ow(1)}/>`))
    const chickEyes =
      once(showIn([6.6, 7.9], [9.6, 12.2]), CHICK_C, `<circle cx="${CHICK[0] + 7}" cy="${CHICK[1] - 42}" r="4" fill="#fff" ${Ow(1.2)}/><circle cx="${CHICK[0] + 7.6}" cy="${CHICK[1] - 42}" r="1.6" fill="${INK}"/>`) +
      once(showIn([15, LOOP]), CHICK_C, `<path d="M${CHICK[0] + 4} ${CHICK[1] - 42}q3-3 6 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`)
    const chick = keys('chick', chickKeys(), CHICK_C,
      shadow(CHICK[0], CHICK[1], 11, 2.5) +
        penguin(CHICK[0], CHICK[1], CHICK_SCALE, flipper([CHICK[0] - 6, CHICK[1] - 30], 0),
          diff(CHICK[0] - 4, CHICK[1] - 22, 20, scarf('#e63946'), scarf('#2f9e5b'), 'chick') + chickEyes + sweat))
    // The seal: up out of the water by the lip, the little one on its nose, a toss, down again.
    const [sx0, sy0] = SEAL
    const seal = `<g clip-path="url(#c13-above)">` +
      once([{ t: 0, y: 70, rot: 0, ease: 'step' }, { t: 10.9, ease: 'out' }, { t: 11.35, y: 0 }, { t: 11.85, ease: 'out' }, { t: 11.95, y: 6, ease: 'inOut' }, { t: 12.15, y: 0, rot: 0, ease: 'in' }, { t: 12.25, y: -10, rot: -16, ease: 'out' }, { t: 12.6, y: 0, rot: 0 }, { t: 13.1, ease: 'in' }, { t: 13.5, y: 70, ease: 'step' }], SEAL,
        `<path d="M${sx0 - 22} ${sy0 + 4}q-2-40 14-52q16-8 26 6q8 20 6 46z" fill="url(#c13-seal)" ${Ow(2)}/>` +
          `<circle cx="${sx0 - 8}" cy="${sy0 - 36}" r="2.6" fill="${INK}"/><circle cx="${sx0 + 10}" cy="${sy0 - 36}" r="2.6" fill="${INK}"/>` +
          `<ellipse cx="${sx0 + 1}" cy="${sy0 - 44}" rx="5" ry="3.6" fill="${INK}"/>` +
          `<path d="M${sx0 - 14} ${sy0 - 30}l-12-2M${sx0 - 14} ${sy0 - 27}l-12 2M${sx0 + 16} ${sy0 - 30}l12-2M${sx0 + 16} ${sy0 - 27}l12 2" stroke="${INK}" stroke-width="1.2"/>` +
          `<circle cx="${sx0 - 10}" cy="${sy0 - 14}" r="2.4" fill="#5f6b7a"/><circle cx="${sx0 + 6}" cy="${sy0 - 6}" r="2" fill="#5f6b7a"/>`) +
      `</g>`
    const sealRings = once(showIn([11.1, 13.5]), SEAL,
      [0, 0.6].map((phase) => anim({ type: 'keys', period: 1.2, phase, keys: [{ t: 0, sx: 0.7, sy: 0.7, o: 0.9 }, { t: 1.2, sx: 1.4, sy: 1.4, o: 0 }], pivot: [sx0, sy0] },
        `<ellipse cx="${sx0}" cy="${sy0}" rx="34" ry="7" fill="none" stroke="#fff" stroke-width="2.4"/>`)).join(''))
    const splashAt = (x: number, t: number) =>
      [-2, -1, 0, 1, 2]
        .map((i) => once([{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t, o: 1, ease: 'out' }, { t: t + 0.25, x: i * 14, y: -40 - (2 - Math.abs(i)) * 14, ease: 'in' }, { t: t + 0.55, x: i * 20, y: 6, o: 1, ease: 'step' }, { t: t + 0.6, o: 0, ease: 'step' }], [x, WATER + 8],
          `<ellipse cx="${x}" cy="${WATER + 8}" rx="3.4" ry="5" fill="#e8f7fd" ${Ow(1.1)}/>`))
        .join('')
    const splashes = [1.8, 3.2, 4.6].map((start) => splashAt(630, start + 1.55)).join('')
    const FISH: [number, number] = [652, 712]
    const [hx, hy] = FISH
    const fish = diff(
      hx - 4,
      hy,
      22,
      '',
      keys('fish', [{ t: 0, x: 0, y: 0, rot: -50, o: 0, ease: 'step' }, { t: 9.75, o: 1, ease: 'out' }, { t: 10.2, x: 18, y: -56, rot: 0, ease: 'in' }, { t: 10.65, x: 36, y: 0, rot: 50, o: 1, ease: 'step' }, { t: 10.7, x: 0, rot: -50, ease: 'out' }, { t: 11.05, x: 18, y: -50, rot: 0, ease: 'in' }, { t: 11.45, x: 36, y: 0, rot: 50, o: 1, ease: 'step' }, { t: 11.5, o: 0, ease: 'step' }], FISH,
        `<path d="M${hx - 12} ${hy}q12-10 24 0q-12 10-24 0z" fill="#9fb6cc" ${Ow(1.4)}/><path d="M${hx - 12} ${hy}l-8-6v12z" fill="#9fb6cc" ${Ow(1.2)}/><circle cx="${hx + 6}" cy="${hy - 2}" r="1.4" fill="${INK}"/>`),
      'fish',
      during(9.75, 11.5),
    )

    // --- The floes: the walrus's (its left tusk shorter in B: a hard one) and the bear's (a fishbone beside it in A
    // only; a row of icicles under it, one fewer in B: a hard one). ---
    const walrus =
      `<ellipse cx="800" cy="792" rx="74" ry="14" fill="#9fd0ea" ${Ow(1.8)}/><ellipse cx="800" cy="786" rx="70" ry="11" fill="url(#c13-ice)"/>` +
      shadow(806, 786, 46, 5) +
      anim({ type: 'keys', period: 3.4, keys: [{ t: 0, sy: 1 }, { t: 1.7, sy: 1.05, ease: 'inOut' }], pivot: [810, 786] },
        `<path d="M770 786q0-40 40-42q36 2 40 30q6 10-4 12z" fill="url(#c13-walrus)" ${Ow(2)}/><path d="M836 776l14 8l-12 2z" fill="#8a5a3a" ${Ow(1.4)}/>`) +
      `<circle cx="772" cy="752" r="18" fill="url(#c13-walrus)" ${Ow(2)}/>` +
      `<circle cx="766" cy="745" r="2" fill="${INK}"/><circle cx="776" cy="744" r="2" fill="${INK}"/>` +
      blink(4.2, 0.5)(`<path d="M763 745h6M773 744h6" stroke="#8a5a3a" stroke-width="4"/>`) +
      `<path d="M772 784l-2-22" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M772 784l-2-22" stroke="#fffaf0" stroke-width="3" stroke-linecap="round"/>` +
      diff(758, 774, 18,
        `<path d="M760 786l2-24" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M760 786l2-24" stroke="#fffaf0" stroke-width="3" stroke-linecap="round"/>`,
        `<path d="M761 774l1-12" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M761 774l1-12" stroke="#fffaf0" stroke-width="3" stroke-linecap="round"/>`) +
      `<ellipse cx="761" cy="758" rx="7" ry="6" fill="#c9a07a" ${Ow(1.4)}/><ellipse cx="773" cy="758" rx="7" ry="6" fill="#c9a07a" ${Ow(1.4)}/>` +
      `<path d="M754 758h-8M754 761l-8 2M782 758h8M782 761l8 2" stroke="${INK}" stroke-width="1.1"/>`
    let icicles = ''
    for (let i = 0; i < 9; i++) {
      const ix = 1000 + i * 40
      const icicle = `<path d="M${ix - 5} 760l5 ${14 + (i % 3) * 4}l5-${14 + (i % 3) * 4}z" fill="#dff1fb" ${Ow(1.3)}/>`
      icicles += ix === 1240 ? diff(ix, 768, 18, icicle, '') : icicle
    }
    const floe =
      `<path d="M960 720q200-20 420-4l-8 42q-200 16-404 2z" fill="#9fd0ea" ${Ow(2)}/>` +
      `<path d="M960 720q200-20 420-4q-200 10-420 4z" fill="url(#c13-ice)" ${Ow(2)}/>` +
      icicles +
      diff(986, 714, 25,
        `<path d="M968 714h32" stroke="${INK}" stroke-width="3"/><path d="M968 714h32" stroke="#f4f1e8" stroke-width="1.6"/><path d="M974 708l4 6l-4 6M982 708l4 6l-4 6M990 708l4 6l-4 6" fill="none" stroke="#f4f1e8" stroke-width="1.6"/>` +
          `<path d="M1000 714l8-6v12z" fill="#f4f1e8" ${Ow(1.2)}/><circle cx="966" cy="714" r="4" fill="#f4f1e8" ${Ow(1.2)}/>`,
        '')

    // --- The polar bear asleep on its back: breathing, snoring Zs; squashed by each bounce; a smile when the little
    // one lands. ---
    const zs = [0, 0.9, 1.8]
      .map((phase) => anim({ type: 'keys', period: 2.7, phase, keys: [{ t: 0, x: 0, y: 0, sx: 0.6, sy: 0.6, o: 0 }, { t: 0.4, o: 1 }, { t: 2.7, x: -24, y: -60, sx: 1.2, sy: 1.2, o: 0 }], pivot: [1008, 664] },
        `<path d="M1002 658h10l-10 10h10" fill="none" stroke="#6f8fb0" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`))
      .join('')
    const bearBody =
      shadow(1150, 722, 120, 7) +
      `<ellipse cx="1150" cy="700" rx="96" ry="30" fill="url(#c13-bear)" ${Ow(2.2)}/>` +
      `<ellipse cx="1152" cy="690" rx="56" ry="14" fill="#fffef8"/>` +
      `<ellipse cx="1238" cy="676" rx="12" ry="16" fill="url(#c13-bear)" ${Ow(1.8)}/><ellipse cx="1240" cy="666" rx="7" ry="5" fill="#2b2b33"/>` +
      `<ellipse cx="1220" cy="670" rx="11" ry="15" fill="url(#c13-bear)" ${Ow(1.8)}/><ellipse cx="1222" cy="660" rx="6.5" ry="4.6" fill="#2b2b33"/>` +
      `<path d="M1096 690q14-24 34-16" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><path d="M1096 690q14-24 34-16" fill="none" stroke="#eef1f6" stroke-width="11" stroke-linecap="round"/>`
    const bearHead =
      `<circle cx="1040" cy="692" r="28" fill="url(#c13-bear)" ${Ow(2.2)}/>` +
      `<circle cx="1030" cy="666" r="8" fill="url(#c13-bear)" ${Ow(1.8)}/><circle cx="1056" cy="668" r="8" fill="url(#c13-bear)" ${Ow(1.8)}/>` +
      `<ellipse cx="1018" cy="694" rx="16" ry="11" fill="#fffef8" ${Ow(1.6)}/><ellipse cx="1006" cy="690" rx="5.6" ry="4.4" fill="#2b2b33"/>` +
      `<path d="M1030 684q5 4 10 0M1046 684q5 4 10 0" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>` +
      once(showIn([0, 13.9]), [1040, 692], `<path d="M1012 702h10" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`) +
      once(showIn([13.9, LOOP]), [1040, 692], `<path d="M1008 700q8 8 16 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/><circle cx="1034" cy="698" r="5" fill="#ffb4c0" fill-opacity="0.6"/>`)
    const bounce: Keyframe[] = [{ t: 0, sy: 1 }, { t: 13.8, ease: 'out' }, { t: 13.9, sy: 0.84, ease: 'out' }, { t: 14.05, sy: 1, ease: 'step' }, { t: 14.4, ease: 'out' }, { t: 14.5, sy: 0.9, ease: 'out' }, { t: 14.65, sy: 1, ease: 'step' }, { t: 14.95, ease: 'out' }, { t: 15.05, sy: 0.94, ease: 'out' }, { t: 15.2, sy: 1, ease: 'step' }]
    const bear =
      keys(undefined, bounce, [1150, 726], anim({ type: 'keys', period: 3, keys: [{ t: 0, sy: 1 }, { t: 1.5, sy: 1.04, ease: 'inOut' }], pivot: [1150, 726] }, bearBody)) +
      bearHead + zs

    // --- Small floes drifting on the sea. ---
    const drift = (x: number, y: number, rx: number, dx: number, period: number) =>
      anim({ type: 'keys', period, keys: [{ t: 0, x: 0 }, { t: period / 2, x: dx, ease: 'inOut' }] },
        `<ellipse cx="${x}" cy="${y + 4}" rx="${rx + 2}" ry="8" fill="#9fd0ea" ${Ow(1.6)}/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="6" fill="url(#c13-ice)" ${Ow(1.4)}/>`)
    const floes = drift(660, 850, 30, 20, 6) + drift(1360, 840, 40, -18, 7) + drift(1000, 860, 24, 16, 5.4) + drift(560, 600, 20, 14, 6.6)

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c13-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5f8fd0"/><stop offset="0.55" stop-color="#aecdee"/><stop offset="1" stop-color="#f7d9e2"/></linearGradient>` +
      `<radialGradient id="c13-glow"><stop offset="0" stop-color="#ffe0d0" stop-opacity="0.9"/><stop offset="0.45" stop-color="#ffd0c0" stop-opacity="0.35"/><stop offset="1" stop-color="#ffd0c0" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c13-far" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cfe3f2"/></linearGradient>` +
      `<linearGradient id="c13-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f5f93"/><stop offset="0.5" stop-color="#2c88b0"/><stop offset="1" stop-color="#46b8c8"/></linearGradient>` +
      `<linearGradient id="c13-ice" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="0.6" stop-color="#eef7fc"/><stop offset="1" stop-color="#cfe6f4"/></linearGradient>` +
      `<linearGradient id="c13-berg" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="0.6" stop-color="#dff1fb"/><stop offset="1" stop-color="#a9d4ec"/></linearGradient>` +
      `<radialGradient id="c13-penguin" cx="0.65" cy="0.3" r="0.8"><stop offset="0" stop-color="#4a5468"/><stop offset="1" stop-color="#151a26"/></radialGradient>` +
      `<radialGradient id="c13-seal" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#b9c4d2"/><stop offset="1" stop-color="#7d8a9c"/></radialGradient>` +
      `<radialGradient id="c13-walrus" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#d9a57a"/><stop offset="1" stop-color="#9a6644"/></radialGradient>` +
      `<radialGradient id="c13-bear" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#ffffff"/><stop offset="0.6" stop-color="#f1efe6"/><stop offset="1" stop-color="#d6d2c4"/></radialGradient>` +
      `<radialGradient id="c13-shadow"><stop offset="0" stop-color="#3f6f99" stop-opacity="0.3"/><stop offset="1" stop-color="#3f6f99" stop-opacity="0"/></radialGradient>` +
      `<radialGradient id="c13-sunlight" cx="0.83" cy="0.5" r="1"><stop offset="0" stop-color="#ffe6dc" stop-opacity="0.25"/><stop offset="0.5" stop-color="#ffe6dc" stop-opacity="0.05"/><stop offset="1" stop-color="#ffe6dc" stop-opacity="0"/></radialGradient>` +
      `<clipPath id="c13-above"><rect x="560" y="560" width="100" height="${WATER - 556}"/></clipPath></defs>` +
      sky +
      iceberg +
      diff(1206, 534, 22, puffin, '') +
      whale +
      spout +
      porpoising +
      floes +
      walrus +
      floe +
      bear +
      shelf +
      flag +
      owl +
      fox +
      hummock +
      diff(455, 689, 34, hare, '') +
      queue +
      splashes +
      seal +
      sealRings +
      fish +
      chick +
      `<rect width="${W}" height="${H}" fill="url(#c13-sunlight)"/>`
    )
  },
})
