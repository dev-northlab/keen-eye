// Cartoon "The night watch" (docs/cartoon-mode.md), made like 812: a 20 s story on a farm under a big moon, the game's
// owl its hero. A fox slips out of the cornfield and creeps past the scarecrow and the haystack to the henhouse. The
// owl on the henhouse roof spots it and hoots; the dog wakes, charges — and runs head first into a bucket. The fox is
// already at the door, licking its lips — when out steps the rooster in his nightcap and crows it out of its fur. The
// fox flees into the corn; the owl winks. Ten differences: two hard (a rung of the hens' ramp, a patch on the
// scarecrow), three events of the story.
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { grassTuft, groundShadow, INK, keenOwl, NATURE_DEFS, O, Ow } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // All asleep: the farmhouse, the dog on the porch, the henhouse with the owl on watch.
  { t: 1.6, x: 0, y: 520, w: 560, ease: 'inOut' },
  { t: 3.6, x: 380, y: 480, w: 560, ease: 'step' },
  // Eyes in the corn: the fox creeps out, past the scarecrow, the haystack, the stable.
  { t: 3.65, x: 880, y: 500, w: 560, ease: 'inOut' },
  { t: 6.4, x: 640, y: 500, w: 560, ease: 'step' },
  // The owl sees it — HOO!
  { t: 6.45, x: 500, y: 470, w: 280, ease: 'step' },
  // The dog wakes, charges — the bucket.
  { t: 7.6, x: 140, y: 610, w: 320, ease: 'step' },
  // The fox at the henhouse door; out steps the rooster.
  { t: 11, x: 480, y: 640, w: 300, ease: 'step' },
  // The fox flees into the corn.
  { t: 15, x: 560, y: 450, w: 720, ease: 'inOut' },
  { t: 17.4, x: 720, y: 450, w: 720, ease: 'step' },
  // The owl winks.
  { t: 17.5, x: 540, y: 500, w: 200 },
  { t: 19.95, x: 545, y: 503, w: 190, ease: 'step' },
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

/** Legs swinging ±angle in each span, a beat of `step` seconds (turn the other way with `flip`). */
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

/** The fox's feet: hidden in the corn at first. */
const FOX: [number, number] = [1380, 794]
const CREEP: [number, number] = [3.7, 10.8]
/** At the henhouse door (offset of x). */
const AT_DOOR = -690
const RUN: [number, number] = [14.5, 17]
function foxKeys(): Keyframe[] {
  const k: Keyframe[] = [{ t: 0, x: 0, y: 0, sx: 1, sy: 1, o: 0, ease: 'step' }, { t: CREEP[0], o: 1, sy: 0.92, ease: 'linear' }]
  // Creeping, low, on tiptoe.
  const n = 20
  for (let i = 1; i <= n; i++) k.push({ t: Math.round((CREEP[0] + ((CREEP[1] - CREEP[0]) * i) / n) * 100) / 100, x: Math.round((AT_DOOR * i) / n), y: i % 2 ? -4 : 0, ease: 'inOut' })
  k.push(
    { t: 11, sy: 1, ease: 'inOut' },
    // Up on its hind legs at the latch.
    { t: 11.3, sy: 1.08, ease: 'inOut' },
    { t: 12.5, sy: 1, ease: 'out' },
    // Crowed out of its fur: a jump, a turn, away.
    { t: 14.05, y: 0, sy: 1, ease: 'out' },
    { t: 14.3, y: -44, sy: 1.15, sx: 1, ease: 'in' },
    { t: 14.32, sx: -1, ease: 'in' },
    { t: 14.5, y: 0, sy: 1, ease: 'linear' },
  )
  for (let i = 1; i <= 12; i++) k.push({ t: Math.round((RUN[0] + ((RUN[1] - RUN[0]) * i) / 12) * 100) / 100, x: Math.round(AT_DOOR - (AT_DOOR * i) / 12), y: i % 2 ? -8 : 0, ease: 'linear' })
  k.push({ t: 17.05, o: 0, ease: 'step' })
  return k
}

/** The dog sleeps on the porch mat; the bucket stands by the steps. */
const DOG: [number, number] = [240, 772]
/** Drawn 1.3 times its old size, about its feet. */
const DOG_SCALE = 1.3
/** When its head hits the bucket; when the bucket lands upside down on its head. */
const BONK = 8.72
const HAT_ON = 9.25
function dogKeys(): Keyframe[] {
  const k: Keyframe[] = [
    { t: 0, x: 0, y: 0, rot: 0 },
    { t: 8.2, ease: 'in' },
    // The charge, a little hop with every stride.
    { t: 8.38, x: 14, y: -6, ease: 'out' },
    { t: 8.55, x: 28, y: 0, ease: 'in' },
    { t: BONK, x: 42, y: -4, ease: 'out' },
    // Bonk: knocked back, sitting dazed.
    { t: 8.85, x: 26, y: 0, rot: -14, ease: 'inOut' },
    { t: HAT_ON, x: 28, rot: -6, ease: 'inOut' },
    { t: 9.45, rot: 0, ease: 'inOut' },
  ]
  // Staggering about blind with the bucket on its head.
  for (let i = 1; i <= 20; i++) k.push({ t: Math.round((9.45 + i * 0.5) * 100) / 100, x: [10, 58, 22, 48][i % 4], rot: i % 2 ? 9 : -9, ease: 'inOut' })
  k.push({ t: 19.95, ease: 'step' })
  return k
}

/** The henhouse: its door's hinge; the rooster inside. */
const COOP_DOOR: [number, number] = [622, 790]
const ROOSTER: [number, number] = [640, 790]
const roosterKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, sy: 1, o: 0, ease: 'step' },
  { t: 12.7, o: 1, ease: 'inOut' },
  { t: 13.2, x: -30, y: 4, ease: 'inOut' },
  // Crowing, chest out.
  { t: 13.9, sy: 1, ease: 'out' },
  { t: 14.1, sy: 1.1, ease: 'inOut' },
  { t: 14.8, sy: 1 },
  { t: 19.95, ease: 'step' },
]

/** The owl on the henhouse roof's ridge (its feet), drawn at OWL_S of its size. */
const OWL: [number, number] = [620, 601]
const OWL_S = 1.3
const OWL_K = Math.round(OWL_S * 62) / 100
/** A point of the owl's own drawing (scripts/make-icons.ts coordinates) in the world. */
const owlAt = (lx: number, ly: number): [number, number] => [Math.round((OWL[0] + (lx - 54) * OWL_K) * 10) / 10, Math.round((OWL[1] + (ly - 86) * OWL_K) * 10) / 10]

export default svgLevel({
  id: 807,
  chapter: 'cartoon',
  title: 'cartoonNightWatch',
  parTimeSec: 100,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const blink = (period: number, phase = 0) => (m: string) => anim({ type: 'blink', duty: 0.08, period, phase }, m)
    const sway = (pivot: [number, number], angle: number, period: number) => (m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 13) / 13 }, m)
    /** Warm light around (x, y). */
    const glow = (x: number, y: number, r: number) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#c10-warm)"/>`

    // --- The night sky: a big friendly moon, twinkling stars, moonlit clouds, bats across the moon. ---
    let stars = ''
    for (let i = 0; i < 46; i++) {
      const sx = Math.round(rand() * W)
      const sy = Math.round(20 + rand() * 400)
      if (Math.hypot(sx - 1180, sy - 150) < 110) continue
      const r = (1 + rand() * 1.6).toFixed(1)
      stars += anim({ type: 'blink', duty: 0.25, period: 1.6 + rand() * 2.4, phase: rand() }, `<circle cx="${sx}" cy="${sy}" r="${r}" fill="#fffbe0"/>`) +
        (i % 7 === 0 ? `<path d="M${sx - 5} ${sy}h10M${sx} ${sy - 5}v10" stroke="#fffbe0" stroke-width="1.2" stroke-linecap="round"/>` : '')
    }
    const cloud = (x: number, y: number, s: number) =>
      `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="6" rx="60" ry="16" fill="#c9c8ea"/><circle cx="-24" cy="0" r="18" fill="#d8d6f2"/><circle cx="6" cy="-8" r="25" fill="#e2e0f8"/><circle cx="30" cy="2" r="16" fill="#d8d6f2"/></g>`
    const bat = (x: number, y: number, s: number) =>
      anim({ type: 'keys', period: 0.36, keys: [{ t: 0, sy: 1 }, { t: 0.18, sy: -0.4, ease: 'inOut' }], pivot: [x, y] },
        `<path d="M${x} ${y}q${-10 * s} ${-10 * s} ${-22 * s} ${-2 * s}q${6 * s} ${2 * s} ${8 * s} ${8 * s}q${4 * s} ${-6 * s} ${14 * s} ${-6 * s}zM${x} ${y}q${10 * s} ${-10 * s} ${22 * s} ${-2 * s}q${-6 * s} ${2 * s} ${-8 * s} ${8 * s}q${-4 * s} ${-6 * s} ${-14 * s} ${-6 * s}z" fill="#2b2a44"/>`) +
      `<ellipse cx="${x}" cy="${y + 1}" rx="${3 * s}" ry="${4 * s}" fill="#2b2a44"/>`
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c10-sky)"/>` +
      stars +
      `<circle cx="1180" cy="150" r="300" fill="url(#c10-moonglow)"/>` +
      `<circle cx="1180" cy="150" r="66" fill="url(#c10-moon)" stroke="#e8d9a0" stroke-width="3"/>` +
      `<circle cx="1158" cy="132" r="10" fill="#efe2b0"/><circle cx="1206" cy="180" r="8" fill="#efe2b0"/><circle cx="1200" cy="120" r="5" fill="#efe2b0"/>` +
      // The man in the moon dozes too.
      `<path d="M1160 152q8 6 16 0M1188 152q8 6 16 0" fill="none" stroke="#b8a46a" stroke-width="3" stroke-linecap="round"/><path d="M1170 178q12 8 24 0" fill="none" stroke="#b8a46a" stroke-width="3" stroke-linecap="round"/>` +
      anim({ type: 'path', points: [[0, 0], [160, 0]], period: 34 }, cloud(300, 130, 1)) +
      anim({ type: 'path', points: [[0, 0], [-140, 0]], period: 28, phase: 0.3 }, cloud(900, 220, 0.8)) +
      keys(undefined, [{ t: 0, x: 0, y: 0 }, { t: 10, y: -40, ease: 'inOut' }, { t: 19.9, x: -1700, y: 0 }], [1520, 240],
        bat(1520, 240, 1) + bat(1556, 222, 0.8) + bat(1580, 256, 0.9))

    // --- Hills with a far village, the yard, the path. ---
    let village = ''
    for (const [vx, vy] of [[420, 578], [446, 584], [470, 576], [980, 570], [1004, 576], [1290, 584]] as [number, number][]) {
      village += `<rect x="${vx - 6}" y="${vy - 8}" width="12" height="10" fill="#5a5f8a"/><path d="M${vx - 8} ${vy - 8}l8-7l8 7z" fill="#4a4e78"/>` +
        anim({ type: 'blink', duty: 0.85, period: 7 + (vx % 5), phase: (vx % 11) / 11 }, `<rect x="${vx - 2}" y="${vy - 5}" width="4" height="4" fill="#ffd98a"/>`)
    }
    const land =
      `<path d="M0 600q240-70 480-30t480-20t480-30V700H0z" fill="url(#c10-far)"/>` +
      village +
      `<path d="M0 650q300-40 620-14t520-6t300-10V720H0z" fill="url(#c10-hill)"/>` +
      `<rect y="680" width="${W}" height="${H - 680}" fill="url(#c10-ground)"/>` +
      `<path d="M150 742q200 20 340 40t300 10t420 0v26q-260 6-430 0t-310-16t-330-34z" fill="url(#c10-path)" ${Ow(1.4)}/>`
    let tufts = ''
    for (let i = 0; i < 34; i++) {
      const tx = Math.round(rand() * W)
      const ty = Math.round(700 + rand() * 190)
      tufts += anim({ type: 'sway', angle: 6, pivot: [tx, ty], period: 2.6, phase: (tx % 13) / 13 }, grassTuft(tx, ty))
    }
    // A rail fence behind the yard.
    let fence = ''
    for (let x = 300; x <= 1000; x += 70) fence += `<rect x="${x - 4}" y="662" width="8" height="44" fill="url(#c10-wood)" ${Ow(1.4)}/>`
    fence += `<path d="M300 676h700M300 694h700" stroke="${INK}" stroke-width="6"/><path d="M300 676h700M300 694h700" stroke="#8a6a52" stroke-width="3"/>`

    // --- The farmhouse: lit windows (a flower pot on the left sill in A only), the porch lantern, smoke. ---
    const farmhouse =
      groundShadow(165, 736, 150, 10) +
      `<rect x="30" y="612" width="270" height="124" fill="url(#c10-wall)" ${O}/>` +
      `<path d="M34 640h262M34 668h262M34 696h262M34 724h262" stroke="#6e5a52" stroke-opacity="0.45" stroke-width="1.6"/>` +
      `<path d="M14 616l151-96l151 96z" fill="url(#c10-roof)" ${O}/><path d="M60 600l105-66M100 606l65-40" stroke="#fff" stroke-opacity="0.18" stroke-width="4" stroke-linecap="round"/>` +
      `<rect x="228" y="534" width="26" height="44" fill="#7a5a5a" ${Ow(1.8)}/>` +
      anim({ type: 'keys', period: 3, keys: [{ t: 0, x: 0, y: 0, sx: 0.6, sy: 0.6, o: 0.8 }, { t: 3, x: 26, y: -70, sx: 1.6, sy: 1.6, o: 0 }], pivot: [241, 526] },
        `<circle cx="241" cy="526" r="9" fill="#d8d6f2"/>`) +
      anim({ type: 'keys', period: 3, phase: 0.5, keys: [{ t: 0, x: 0, y: 0, sx: 0.6, sy: 0.6, o: 0.8 }, { t: 3, x: 26, y: -70, sx: 1.6, sy: 1.6, o: 0 }], pivot: [241, 526] },
        `<circle cx="241" cy="526" r="9" fill="#d8d6f2"/>`) +
      glow(95, 662, 70) + glow(225, 662, 60) +
      `<rect x="60" y="636" width="70" height="54" fill="url(#c10-window)" ${Ow(2)}/><path d="M95 636v54M60 663h70" stroke="${INK}" stroke-width="2"/>` +
      `<path d="M60 636q14 20 4 54h-4zM130 636q-14 20-4 54h4z" fill="#c94a5a" ${Ow(1.2)}/>` +
      `<rect x="54" y="690" width="82" height="6" fill="url(#c10-wood)" ${Ow(1.4)}/>` +
      diff(100, 678, 20,
        `<path d="M92 690l2-12h12l2 12z" fill="#c9743a" ${Ow(1.4)}/><path d="M100 678q-6-10 0-16q6 6 0 16M100 678q8-6 12 0" fill="#4fae56" ${Ow(1)}/><circle cx="100" cy="662" r="4" fill="#ff6b8b" ${Ow(1)}/>`,
        '') +
      `<rect x="190" y="636" width="70" height="54" fill="url(#c10-window)" ${Ow(2)}/><path d="M225 636v54M190 663h70" stroke="${INK}" stroke-width="2"/>` +
      // Grandma's cat asleep on the right sill.
      `<path d="M206 690q4-14 18-14q14 0 16 14z" fill="#5a5a6a" ${Ow(1.4)}/><path d="M232 680l3-7l3 7" fill="#5a5a6a" ${Ow(1.2)}/>` +
      `<rect x="150" y="676" width="34" height="60" fill="#7a4a32" ${Ow(1.8)}/><circle cx="177" cy="708" r="2.4" fill="#ffd23f"/>` +
      `<rect x="140" y="736" width="56" height="8" fill="url(#c10-wood)" ${Ow(1.4)}/>` +
      // Porch lantern; moths around it.
      glow(300, 690, 70) +
      `<path d="M300 660v14" stroke="${INK}" stroke-width="2"/><rect x="292" y="674" width="16" height="22" rx="3" fill="#ffe08a" ${Ow(1.6)}/><path d="M290 674h20l-4-6h-12z" fill="#3b3f46" ${Ow(1.2)}/>` +
      anim({ type: 'blink', duty: 0.1, period: 0.9, phase: 0.2 }, `<rect x="294" y="676" width="12" height="18" fill="#fff4c0"/>`) +
      [[0, 1.6], [0.5, 1.9]].map(([phase, period]) =>
        anim({ type: 'path', points: [[0, 0], [16, -10], [4, -22], [-14, -8]], period, phase },
          `<path d="M318 676l-5-4v8zM318 676l5-4v8z" fill="#efe8d8" ${Ow(0.8)}/>`)).join('')

    // --- The stable: the horse looks out, the cow chews (a bell under its chin in A); in B a bat hangs under the
    // eave while the fox creeps by. ---
    const cowBell = `<path d="M916 706h12l3 12h-18z" fill="#e8b84a" ${Ow(1.4)}/><circle cx="922" cy="720" r="2" fill="${INK}"/><path d="M914 704q8 4 16 0" stroke="#7a3a2a" stroke-width="2.4" fill="none"/>`
    const stable =
      groundShadow(870, 772, 130, 10) +
      `<rect x="760" y="652" width="220" height="118" fill="url(#c10-barn)" ${O}/>` +
      [780, 810, 840, 870, 900, 930, 960].map((x) => `<path d="M${x} 656v112" stroke="#5a2a2a" stroke-opacity="0.35" stroke-width="1.6"/>`).join('') +
      `<path d="M744 656l126-56l126 56z" fill="url(#c10-roof)" ${O}/>` +
      `<rect x="790" y="670" width="44" height="40" fill="#2e2438" ${Ow(1.8)}/><rect x="900" y="670" width="44" height="40" fill="#2e2438" ${Ow(1.8)}/>` +
      `<rect x="788" y="708" width="48" height="60" fill="url(#c10-wood)" ${Ow(1.8)}/><path d="M788 708l48 60M836 708l-48 60" stroke="#6e4a32" stroke-width="3"/>` +
      `<rect x="898" y="708" width="48" height="60" fill="url(#c10-wood)" ${Ow(1.8)}/><path d="M898 708l48 60M946 708l-48 60" stroke="#6e4a32" stroke-width="3"/>` +
      // The horse, nodding.
      anim({ type: 'keys', period: 3.2, keys: [{ t: 0, rot: 0 }, { t: 1.6, rot: 8, ease: 'inOut' }], pivot: [816, 704] },
        `<path d="M804 706q-4-30 10-36q14-2 18 10l6 26q-2 8-12 6z" fill="#a8683a" ${Ow(1.8)}/><path d="M814 670q-6 6-2 14M820 668q-2 8 2 14" fill="none" stroke="#3a2418" stroke-width="3"/>` +
          `<ellipse cx="830" cy="704" rx="9" ry="7" fill="#c9895a" ${Ow(1.4)}/><circle cx="826" cy="704" r="1.4" fill="${INK}"/><circle cx="818" cy="684" r="2" fill="${INK}"/><path d="M810 672l-2-8l6 5" fill="#a8683a" ${Ow(1.2)}/>`) +
      // The cow, chewing.
      anim({ type: 'keys', period: 1.4, id: 'cow', keys: [{ t: 0, rot: 0 }, { t: 0.7, rot: -5, ease: 'inOut' }], pivot: [922, 700] },
        `<path d="M904 682l-12-6l10 10zM940 682l12-6l-10 10z" fill="#f4f1e8" ${Ow(1.4)}/>` +
          `<ellipse cx="922" cy="690" rx="18" ry="20" fill="#f4f1e8" ${Ow(1.8)}/><path d="M912 676q8-6 14 2q-6 8-14-2z" fill="#3a3a44"/>` +
          `<ellipse cx="922" cy="702" rx="13" ry="8" fill="#f2b8c0" ${Ow(1.4)}/><circle cx="918" cy="702" r="1.6" fill="${INK}"/><circle cx="926" cy="702" r="1.6" fill="${INK}"/>` +
          `<circle cx="914" cy="686" r="2" fill="${INK}"/><circle cx="930" cy="686" r="2" fill="${INK}"/><path d="M908 672l-4-8M936 672l4-8" stroke="#e8d9b0" stroke-width="3" stroke-linecap="round"/>` +
          diff(922, 714, 18, cowBell, '', 'cow')) +
      diff(
        870,
        668,
        22,
        '',
        once([{ t: 0, o: 0, ease: 'step' }, { t: 4.6, o: 1, ease: 'step' }, { t: 6.4, o: 0, ease: 'step' }], [870, 656],
          anim({ type: 'keys', period: 2, keys: [{ t: 0, rot: -6 }, { t: 1, rot: 6, ease: 'inOut' }], pivot: [870, 656] },
            `<path d="M870 656v4" stroke="${INK}" stroke-width="2"/><ellipse cx="870" cy="670" rx="8" ry="11" fill="#3b3550" ${Ow(1.4)}/>` +
              `<path d="M862 664q-8 6-4 16l8-6zM878 664q8 6 4 16l-8-6z" fill="#4a4466" ${Ow(1.2)}/>` +
              `<path d="M866 680l-3 5M874 680l3 5" stroke="#3b3550" stroke-width="3" stroke-linecap="round"/>` +
              `<circle cx="867" cy="674" r="1.8" fill="#ffd23f"/><circle cx="873" cy="674" r="1.8" fill="#ffd23f"/>`)),
        undefined,
        during(4.6, 6.4),
      )

    // --- Sunflowers asleep behind the haystack (four heads in A, three in B), the haystack (a pitchfork in it in A only),
    // in B a mouse peeks out of it as the fox flees. ---
    const sunflowerHead = (x: number, y: number) =>
      `<g transform="rotate(18 ${x} ${y})">` +
      Array.from({ length: 12 }, (_, i) => `<ellipse transform="rotate(${i * 30} ${x} ${y})" cx="${x}" cy="${y - 15}" rx="4.5" ry="8" fill="#f2c03a" ${Ow(1)}/>`).join('') +
      `<circle cx="${x}" cy="${y}" r="10" fill="#6e4524" ${Ow(1.4)}/><path d="M${x - 5} ${y - 2}q5 4 10 0" fill="none" stroke="#3a2414" stroke-width="1.6"/></g>`
    const stalk = (x: number, top: number) =>
      `<path d="M${x} 770q-4-${(770 - top) / 2} 0-${770 - top}" fill="none" stroke="${INK}" stroke-width="7"/><path d="M${x} 770q-4-${(770 - top) / 2} 0-${770 - top}" fill="none" stroke="#4f8a3a" stroke-width="4"/>` +
      `<path d="M${x} ${top + 60}q-20-6-26 6q14 6 26-6zM${x} ${top + 100}q20-6 26 6q-14 6-26-6z" fill="#4f8a3a" ${Ow(1.2)}/>`
    const sunflowers =
      [[992, 586], [1036, 566], [1090, 576], [1134, 596]].map(([x, top], i) =>
        sway([x, 770], 2, 3.4 + i * 0.3)(stalk(x, top) + (i === 2 ? diff(x + 1, top - 1, 36, sunflowerHead(x, top), '') : sunflowerHead(x, top)))).join('')
    const pitchfork =
      `<path d="M1094 724l16-58" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M1094 724l16-58" stroke="#c49462" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M1102 670l16 4M1104 666l-2-14M1110 668l2-14M1116 672l5-12" fill="none" stroke="#9aa3ad" stroke-width="2.6" stroke-linecap="round"/>`
    let straw = ''
    for (let i = 0; i < 26; i++) {
      const a = rand() * Math.PI
      const r = rand() * 70
      const sx = Math.round(1060 + Math.cos(a) * r)
      const sy = Math.round(778 - Math.sin(a) * r * 0.8)
      straw += `<path d="M${sx} ${sy}l${Math.round(6 + rand() * 6)} ${Math.round(-4 + rand() * 8)}" stroke="#a8843a" stroke-width="1.6" stroke-linecap="round"/>`
    }
    const haystack =
      groundShadow(1060, 784, 96, 9) +
      `<path d="M978 782q2-90 82-96q80 6 82 96z" fill="url(#c10-hay)" ${O}/>` + straw +
      diff(1106, 690, 40, pitchfork, '')
    const MOUSE: [number, number] = [998, 780]
    const mouse = diff(
      MOUSE[0] - 4,
      MOUSE[1] - 10,
      22,
      '',
      once([{ t: 0, x: 8, o: 0, ease: 'step' }, { t: 15.2, o: 1, ease: 'out' }, { t: 15.5, x: 0 }, { t: 17, ease: 'in' }, { t: 17.35, x: 8, o: 1, ease: 'step' }, { t: 17.4, o: 0, ease: 'step' }], MOUSE,
        `<ellipse cx="${MOUSE[0]}" cy="${MOUSE[1] - 7}" rx="10" ry="7" fill="#a7a9b4" ${Ow(1.4)}/><circle cx="${MOUSE[0] - 2}" cy="${MOUSE[1] - 15}" r="4.6" fill="#a7a9b4" ${Ow(1.2)}/>` +
          `<path d="M${MOUSE[0] - 8} ${MOUSE[1] - 12}l-8 2l8 3z" fill="#a7a9b4" ${Ow(1.2)}/><circle cx="${MOUSE[0] - 16}" cy="${MOUSE[1] - 10}" r="1.6" fill="#e8798f"/><circle cx="${MOUSE[0] - 8}" cy="${MOUSE[1] - 13}" r="1.2" fill="${INK}"/>` +
          anim({ type: 'keys', period: 0.5, keys: [{ t: 0, rot: -8 }, { t: 0.25, rot: 8, ease: 'inOut' }], pivot: [MOUSE[0] - 15, MOUSE[1] - 10] },
            `<path d="M${MOUSE[0] - 15} ${MOUSE[1] - 10}l-8-3M${MOUSE[0] - 15} ${MOUSE[1] - 10}l-8 3" stroke="${INK}" stroke-width="0.8"/>`)),
      undefined,
      during(15.2, 17.4),
    )

    // --- The scarecrow at the edge of the corn (a patch on its coat in A only: a hard one); the cornfield. ---
    const scarecrow =
      groundShadow(1200, 790, 30, 5) +
      `<path d="M1200 790V640M1144 668h112" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M1200 790V640M1144 668h112" stroke="#8a6a52" stroke-width="4.6" stroke-linecap="round"/>` +
      sway([1200, 668], 2, 4)(
        `<path d="M1170 664h60l-8 56h-44z" fill="url(#c10-plaid)" ${Ow(1.8)}/><path d="M1146 662h28v12h-28zM1226 662h28v12h-28z" fill="url(#c10-plaid)" ${Ow(1.6)}/>` +
          `<path d="M1144 670l-8 4l8 2M1256 670l8 4l-8 2" fill="none" stroke="#e8c870" stroke-width="2.4"/>` +
          `<path d="M1182 720l-4 14M1196 720v16M1212 720l4 14" stroke="#e8c870" stroke-width="2.4"/>` +
          diff(1214, 694, 18, `<rect x="1206" y="686" width="15" height="15" fill="#e8b84a" ${Ow(1.2)}/><path d="M1206 690h-2M1206 698h-2M1221 690h2M1221 698h2" stroke="${INK}" stroke-width="1.2"/>`, '') +
          `<circle cx="1200" cy="640" r="20" fill="#e8d4a0" ${Ow(1.8)}/><path d="M1190 638l4 4l4-4M1202 638l4 4l4-4M1190 650q10 6 20 0" fill="none" stroke="${INK}" stroke-width="1.8"/>` +
          `<path d="M1172 626h56l-10-4q-4-16-18-16t-18 16z" fill="#c9a24a" ${Ow(1.8)}/><path d="M1184 618h32" stroke="#a8432a" stroke-width="3"/>`)
    const corn = (x: number, y: number, h: number) =>
      sway([x, y], 3, 2.8)(
        `<path d="M${x} ${y}v-${h}" stroke="${INK}" stroke-width="6"/><path d="M${x} ${y}v-${h}" stroke="#7fae4a" stroke-width="3.4"/>` +
          `<path d="M${x} ${y - h * 0.3}q-20-14-30-2q14 0 30 2zM${x} ${y - h * 0.5}q22-14 32-2q-14 0-32 2zM${x} ${y - h * 0.72}q-18-12-26 0q12-2 26 0z" fill="#6fa040" ${Ow(1.2)}/>` +
          `<ellipse cx="${x + 6}" cy="${y - h * 0.58}" rx="5" ry="12" fill="#f2c94a" ${Ow(1.2)}/><path d="M${x + 2} ${y - h * 0.5}q0-14 4-20q4 6 4 20" fill="#8fbf5a" ${Ow(1)}/>` +
          `<path d="M${x} ${y - h}l-6-12M${x} ${y - h}l2-14M${x} ${y - h}l8-10" stroke="#d9b45a" stroke-width="2" stroke-linecap="round"/>`)
    let cornBack = ''
    for (let x = 1226; x < 1450; x += 30) cornBack += corn(x, 760, 150 + ((x * 7) % 30))
    let cornFront = ''
    for (let x = 1240; x < 1450; x += 34) cornFront += corn(x, 826, 170 + ((x * 3) % 30))
    // Eyes in the corn before the fox comes out.
    const cornEyes = once(showIn([2.8, 3.7]), [1350, 772],
      anim({ type: 'blink', duty: 0.15, period: 0.6 }, `<path d="M1340 774q6-4 10 0M1356 774q6-4 10 0" stroke="#2b2a44" stroke-width="4"/>`) +
        `<ellipse cx="1345" cy="772" rx="4" ry="2.4" fill="#fff4a0"/><ellipse cx="1361" cy="772" rx="4" ry="2.4" fill="#fff4a0"/>`)

    // --- The henhouse: hens asleep in its window, the hens' ramp (a rung fewer in B: a hard one), the door, a lantern;
    // the owl on its ridge. ---
    const rungs = [0.15, 0.35, 0.55, 0.75, 0.9]
      .map((f, i) => {
        const rx = Math.round(530 - 62 * f)
        const ry = Math.round(764 + 28 * f)
        const rung = `<path d="M${rx - 2} ${ry - 5}l4 10" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M${rx - 2} ${ry - 5}l4 10" stroke="#c49462" stroke-width="2" stroke-linecap="round"/>`
        return i === 2 ? diff(rx, ry, 18, rung, '') : rung
      })
      .join('')
    const coop =
      groundShadow(620, 792, 120, 9) +
      glow(740, 700, 60) +
      `<path d="M740 790v-82" stroke="${INK}" stroke-width="5"/><path d="M740 790v-82" stroke="#8a6a52" stroke-width="2.6"/><rect x="733" y="694" width="14" height="18" rx="3" fill="#ffe08a" ${Ow(1.4)}/><path d="M731 694h18l-4-6h-10z" fill="#3b3f46" ${Ow(1.2)}/>` +
      `<rect x="520" y="650" width="200" height="140" fill="url(#c10-coop)" ${O}/>` +
      [544, 568, 592, 616, 640, 664, 688].map((x) => `<path d="M${x} 654v134" stroke="#6e5a3a" stroke-opacity="0.35" stroke-width="1.6"/>`).join('') +
      `<path d="M504 654l116-54l116 54z" fill="url(#c10-roof)" ${O}/><path d="M540 640l80-38" stroke="#fff" stroke-opacity="0.2" stroke-width="4" stroke-linecap="round"/>` +
      glow(580, 680, 40) +
      `<rect x="558" y="666" width="46" height="26" fill="url(#c10-window)" ${Ow(1.8)}/>` +
      `<circle cx="572" cy="684" r="7" fill="#f4f1e8" ${Ow(1.2)}/><circle cx="590" cy="684" r="7" fill="#c9743a" ${Ow(1.2)}/><path d="M568 683h4M586 683h4" stroke="${INK}" stroke-width="1.4"/>` +
      anim({ type: 'keys', period: 2.4, keys: [{ t: 0, x: 0, y: 0, o: 0 }, { t: 0.3, o: 1 }, { t: 2.4, x: 10, y: -24, o: 0 }], pivot: [600, 664] }, `<path d="M598 664h6l-6 6h6" fill="none" stroke="#e2e0f8" stroke-width="1.6"/>`) +
      // The hens' hatch and ramp.
      `<rect x="522" y="740" width="18" height="22" fill="#2e2438" ${Ow(1.4)}/>` +
      `<path d="M532 762l-64 30" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M532 762l-64 30" stroke="#a8784a" stroke-width="6" stroke-linecap="round"/>` +
      rungs +
      // The doorway (dark) and the door, swinging open on its left hinge.
      `<rect x="622" y="730" width="36" height="60" fill="#2e2438" ${Ow(1.8)}/>` +
      once([{ t: 0, sx: 1 }, { t: 12.55, ease: 'out' }, { t: 12.75, sx: 0.12 }, { t: 19.95, ease: 'step' }], COOP_DOOR,
        `<rect x="622" y="730" width="36" height="60" fill="url(#c10-wood)" ${Ow(1.8)}/><path d="M626 742h28M626 778h28" stroke="#6e4a32" stroke-width="3"/><path d="M652 760h8" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`)
    const [ox0, oy0] = OWL
    const [bx0, by0] = owlAt(54, 70)
    const owl = anim({ type: 'keys', period: LOOP, id: 'owl', pivot: OWL, keys: [
      { t: 0, rot: 0 }, { t: 3, rot: 8, ease: 'inOut' }, { t: 5.5, rot: -6, ease: 'inOut' },
      // It turns to the fox.
      { t: 6.45, rot: 0, ease: 'out' }, { t: 6.7, rot: 14, ease: 'inOut' },
      { t: 7.6, rot: 4, ease: 'inOut' }, { t: 17.5, rot: 0, ease: 'inOut' }, { t: 19.95, ease: 'step' },
    ] },
      keenOwl(ox0, oy0, OWL_S, blink(3.1, 0.3)) +
        // Hoot: the beak open.
        once(showIn([6.8, 7.6]), OWL, `<path d="M${bx0 - 3} ${by0 + 14}h6l-3 7z" fill="#7a2a2a"/><path d="M${bx0 - 3.5} ${by0 + 18}h7l-3.5 6z" fill="#ff9f1c" stroke="#d97706" stroke-width="0.8"/>`) +
        // A wink at the end.
        once(showIn([18, 19.3]), OWL, (() => {
          const [ex, ey] = owlAt(65.5, 54)
          return `<circle cx="${ex}" cy="${ey}" r="10.2" fill="#f3dcb4"/><path d="M${ex - 7} ${ey}q7 6 14 0" fill="none" stroke="#5e3a17" stroke-width="2.4" stroke-linecap="round"/>`
        })()))
    // HOO — rings of sound from the owl's beak.
    const hoot = once(showIn([6.8, 7.7]), [bx0, by0],
      [0, 0.3].map((phase) => anim({ type: 'keys', period: 0.6, phase, keys: [{ t: 0, sx: 0.3, sy: 0.3, o: 1 }, { t: 0.6, sx: 2, sy: 2, o: 0 }], pivot: [bx0 - 20, by0 + 10] },
        `<path d="M${bx0 - 30} ${by0}q-10 10 0 20M${bx0 - 36} ${by0 - 6}q-16 16 0 32" fill="none" stroke="#fff4c0" stroke-width="3" stroke-linecap="round"/>`)).join(''))

    // --- The rooster (its nightcap red in A, blue in B). ---
    const [rx, ry] = ROOSTER
    const nightcap = (c: string) =>
      `<path d="M${rx + 1} ${ry - 58}q4-14 14-8l4 6q-8-2-18 2z" fill="${c}" ${Ow(1.4)}/><path d="M${rx + 2} ${ry - 58}q-2-16-12-24q4 14 2 26z" fill="${c}" ${Ow(1.4)}/>` +
      `<circle cx="${rx - 11}" cy="${ry - 80}" r="4.5" fill="#fff" ${Ow(1.2)}/><path d="M${rx} ${ry - 60}h18" stroke="#fff" stroke-width="3"/>`
    const rooster = keys('rooster', roosterKeys, ROOSTER,
      groundShadow(rx, ry, 22, 4) +
        `<path d="M${rx - 2} ${ry}v-14M${rx + 6} ${ry}v-14" stroke="#e8a33b" stroke-width="3" stroke-linecap="round"/>` +
        `<path d="M${rx - 18} ${ry - 32}q-14-20-4-30q4 10 10 14q-2-16 8-20q0 14 4 22z" fill="#2f5a44" ${Ow(1.6)}/>` +
        `<ellipse cx="${rx - 2}" cy="${ry - 28}" rx="18" ry="14" fill="#f4f1e8" ${Ow(1.8)}/><path d="M${rx - 10} ${ry - 30}q8 6 16 0" fill="none" stroke="#d8d2c4" stroke-width="2"/>` +
        `<path d="M${rx + 4} ${ry - 38}q2-10 6-12" stroke="#f4f1e8" stroke-width="12" stroke-linecap="round"/>` +
        `<circle cx="${rx + 10}" cy="${ry - 50}" r="9" fill="#f4f1e8" ${Ow(1.8)}/>` +
        `<path d="M${rx + 14} ${ry - 44}q4 8-2 10q-4-4-2-10z" fill="#e63946" ${Ow(1.2)}/>` +
        `<circle cx="${rx + 12}" cy="${ry - 52}" r="1.8" fill="${INK}"/><path d="M${rx + 8} ${ry - 56}l7 1" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>` +
        once(showIn([0, 13.95], [14.85, LOOP]), ROOSTER, `<path d="M${rx + 18} ${ry - 52}l8 3l-8 2z" fill="#f2a93b" ${Ow(1.2)}/>`) +
        // Crowing.
        once(showIn([13.95, 14.85]), ROOSTER, `<path d="M${rx + 18} ${ry - 53}l9-5l-1 5zM${rx + 18} ${ry - 50}l9 5l-9-1z" fill="#f2a93b" ${Ow(1.2)}/>` +
          [0, 0.25].map((phase) => anim({ type: 'keys', period: 0.5, phase, keys: [{ t: 0, sx: 0.4, sy: 0.4, o: 1 }, { t: 0.5, sx: 2.2, sy: 2.2, o: 0 }], pivot: [rx + 30, ry - 51] },
            `<path d="M${rx + 34} ${ry - 60}q10 9 0 18M${rx + 40} ${ry - 66}q16 15 0 30" fill="none" stroke="#fff4c0" stroke-width="3" stroke-linecap="round"/>`)).join('')) +
        diff(rx + 3, ry - 66, 22, nightcap('#e63946'), nightcap('#3a76d0'), 'rooster'))

    // --- The dog: asleep on its mat, awake, charging — bonk — the bucket flips up and lands on its head; it staggers
    // about blind under it. Drawn at DOG_SCALE about its feet. ---
    const [dx, dy] = DOG
    const tin = (x: number, y: number) =>
      // An upright tin bucket standing on (x, y), full of water.
      `<path d="M${x - 14} ${y - 28}h28l-4 28h-20z" fill="url(#c10-tin)" ${Ow(1.8)}/>` +
      `<path d="M${x - 13} ${y - 19}h26M${x - 11} ${y - 8}h22" stroke="#7a8492" stroke-width="1.6"/>` +
      `<ellipse cx="${x}" cy="${y - 28}" rx="14" ry="4" fill="#5a8fc0" ${Ow(1.6)}/><path d="M${x - 6} ${y - 29}h8" stroke="#bfe0f5" stroke-width="1.6" stroke-linecap="round"/>` +
      `<path d="M${x - 14} ${y - 28}q14-22 28 0" fill="none" stroke="${INK}" stroke-width="1.8"/><path d="M${x - 9} ${y - 22}v12" stroke="#fff" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round"/>`
    const hatBucket = (x: number, y: number) =>
      // The same bucket upside down over a head centred on (x, y).
      `<path d="M${x - 16} ${y + 12}h32l-4-28h-24z" fill="url(#c10-tin)" ${Ow(1.8)}/>` +
      `<path d="M${x - 15} ${y + 3}h30M${x - 13} ${y - 8}h26" stroke="#7a8492" stroke-width="1.6"/><path d="M${x - 9} ${y + 8}v-18" stroke="#fff" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M${x - 16} ${y + 12}q-6 12 4 16" fill="none" stroke="${INK}" stroke-width="1.8"/>`
    const scaled = (m: string) => `<g transform="translate(${dx} ${dy}) scale(${DOG_SCALE}) translate(${-dx} ${-dy})">${m}</g>`
    const RUN: [number, number] = [8.2, BONK]
    const dogLeg = (x: number, flip: boolean) =>
      keys(undefined, swing([[RUN[0], RUN[1], 0.09], [9.45, 19.9, 0.25]], 26, flip), [x, dy - 20],
        `<rect x="${x - 5}" y="${dy - 22}" width="10" height="22" rx="4" fill="#c98a4a" ${Ow(1.5)}/><ellipse cx="${x + 2}" cy="${dy - 1}" rx="7" ry="3.5" fill="#f4e6cc" ${Ow(1.2)}/>`)
    const ear = (period: number) =>
      anim({ type: 'keys', period, keys: [{ t: 0, rot: -6 }, { t: period / 2, rot: 22, ease: 'inOut' }], pivot: [dx + 23, dy - 56] },
        `<path d="M${dx + 23} ${dy - 56}q-14 6-10 24q10-2 12-18z" fill="#8a5a32" ${Ow(1.4)}/>`)
    const dogLying =
      `<path d="M${dx - 46} ${dy - 10}q-14-6-16-18" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M${dx - 46} ${dy - 10}q-14-6-16-18" fill="none" stroke="#c98a4a" stroke-width="3.6" stroke-linecap="round"/>` +
      `<ellipse cx="${dx - 6}" cy="${dy - 12}" rx="40" ry="13" fill="url(#c10-dog)" ${Ow(1.8)}/><ellipse cx="${dx - 14}" cy="${dy - 16}" rx="12" ry="7" fill="#f4e6cc"/><ellipse cx="${dx - 24}" cy="${dy - 18}" rx="9" ry="5" fill="#a86a32"/>` +
      `<ellipse cx="${dx + 28}" cy="${dy - 6}" rx="16" ry="5" fill="#c98a4a" ${Ow(1.4)}/>` +
      `<path d="M${dx + 18} ${dy - 22}q6 10 14 9" fill="none" stroke="#d1495b" stroke-width="4" stroke-linecap="round"/>` +
      `<circle cx="${dx + 32}" cy="${dy - 16}" r="12" fill="url(#c10-dog)" ${Ow(1.8)}/><ellipse cx="${dx + 42}" cy="${dy - 12}" rx="8" ry="5" fill="#f4e6cc" ${Ow(1.2)}/><circle cx="${dx + 49}" cy="${dy - 13}" r="2.6" fill="${INK}"/>` +
      once(showIn([0, 7.9]), DOG,
        `<path d="M${dx + 22} ${dy - 22}q-10 8-6 20q8-4 10-16z" fill="#8a5a32" ${Ow(1.4)}/><path d="M${dx + 32} ${dy - 18}q4 3 8 0" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>` +
          anim({ type: 'keys', period: 2, keys: [{ t: 0, x: 0, y: 0, o: 0, sx: 0.6, sy: 0.6 }, { t: 0.3, o: 1 }, { t: 2, x: 18, y: -34, o: 0, sx: 1.3, sy: 1.3 }], pivot: [dx + 40, dy - 34] },
            `<path d="M${dx + 36} ${dy - 38}h8l-8 8h8" fill="none" stroke="#e2e0f8" stroke-width="2" stroke-linecap="round"/>`)) +
      // Woken: ears up, eyes wide.
      once(showIn([7.9, 8.2]), DOG,
        `<path d="M${dx + 24} ${dy - 24}l-4-16l12 10z" fill="#8a5a32" ${Ow(1.4)}/><circle cx="${dx + 36}" cy="${dy - 19}" r="3.8" fill="#fff" ${Ow(1)}/><circle cx="${dx + 37}" cy="${dy - 19}" r="1.8" fill="${INK}"/>` +
          `<path d="M${dx + 34} ${dy - 44}h5l-1 10h-3zM${dx + 36.5} ${dy - 30}v0.1" stroke="#fff4c0" stroke-width="2" fill="#fff4c0" stroke-linecap="round"/>`)
    const spiral = (x: number, y: number) => `<path d="M${x} ${y}m-1 0a1 1 0 1 1 2 0a2.4 2.4 0 1 1-4.8 0a3.6 3.6 0 1 1 7.2 0" fill="none" stroke="${INK}" stroke-width="1.4"/>`
    const dogStanding =
      dogLeg(dx - 26, false) + dogLeg(dx + 18, true) +
      anim({ type: 'keys', period: 0.3, keys: [{ t: 0, rot: -18 }, { t: 0.15, rot: 18, ease: 'inOut' }], pivot: [dx - 32, dy - 32] },
        `<path d="M${dx - 32} ${dy - 32}q-12-6-14-20" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M${dx - 32} ${dy - 32}q-12-6-14-20" fill="none" stroke="#c98a4a" stroke-width="3.6" stroke-linecap="round"/>`) +
      `<path d="M${dx - 36} ${dy - 30}q2-16 30-15q26 0 34 12q2 14-10 18q-28 6-46 0q-10-4-8-15z" fill="url(#c10-dog)" ${Ow(1.8)}/>` +
      `<ellipse cx="${dx + 6}" cy="${dy - 24}" rx="13" ry="6" fill="#f4e6cc"/><ellipse cx="${dx - 14}" cy="${dy - 38}" rx="10" ry="5" fill="#a86a32"/>` +
      dogLeg(dx - 18, true) + dogLeg(dx + 24, false) +
      `<circle cx="${dx + 30}" cy="${dy - 46}" r="13" fill="url(#c10-dog)" ${Ow(1.8)}/><ellipse cx="${dx + 41}" cy="${dy - 41}" rx="9" ry="6" fill="#f4e6cc" ${Ow(1.2)}/><ellipse cx="${dx + 49}" cy="${dy - 43}" rx="3.4" ry="2.8" fill="${INK}"/>` +
      // The collar and its tag.
      `<path d="M${dx + 18} ${dy - 44}q4 11 15 10" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M${dx + 18} ${dy - 44}q4 11 15 10" fill="none" stroke="#d1495b" stroke-width="3.6" stroke-linecap="round"/>` +
      anim({ type: 'keys', period: 0.4, keys: [{ t: 0, rot: -15 }, { t: 0.2, rot: 15, ease: 'inOut' }], pivot: [dx + 26, dy - 35] }, `<circle cx="${dx + 26}" cy="${dy - 31}" r="3" fill="#ffd23f" ${Ow(1)}/>`) +
      // Charging: ears flapping, tongue out, a determined eye.
      once(showIn([8.2, BONK]), DOG,
        ear(0.18) +
          `<circle cx="${dx + 34}" cy="${dy - 50}" r="3.4" fill="#fff" ${Ow(1)}/><circle cx="${dx + 35.4}" cy="${dy - 50}" r="1.7" fill="${INK}"/><path d="M${dx + 29} ${dy - 56}l10 3" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>` +
          anim({ type: 'keys', period: 0.18, keys: [{ t: 0, rot: -10 }, { t: 0.09, rot: 10, ease: 'inOut' }], pivot: [dx + 40, dy - 37] },
            `<path d="M${dx + 38} ${dy - 37}q-2 12 6 12q4-6 0-12z" fill="#f58aa0" ${Ow(1.2)}/>`)) +
      // Knocked silly before the bucket comes down.
      once(showIn([BONK, HAT_ON]), DOG, ear(0.5) + spiral(dx + 34, dy - 50) + `<path d="M${dx + 36} ${dy - 37}q3 3 6 0q3 3 6 0" fill="none" stroke="${INK}" stroke-width="1.6"/>`) +
      // Under the bucket: only its muzzle shows, a wobbly mouth, water dripping off the rim; stars circling.
      once(showIn([HAT_ON, LOOP]), DOG,
        `<path d="M${dx + 23} ${dy - 56}q-12 8-8 24q8-4 10-18z" fill="#8a5a32" ${Ow(1.4)}/>` +
          hatBucket(dx + 32, dy - 56) +
          `<path d="M${dx + 37} ${dy - 36}q3 3 6 0q3 3 6 0" fill="none" stroke="${INK}" stroke-width="1.6"/>`) +
      once(showIn([HAT_ON, 10.6]), DOG,
        [[-14, 0], [6, 0.3], [18, 0.15]].map(([ox, phase]) => anim({ type: 'keys', period: 0.6, phase, keys: [{ t: 0, y: 0, o: 1 }, { t: 0.6, y: 26, o: 0 }], pivot: [dx + 32 + ox, dy - 42] },
          `<path d="M${dx + 32 + ox} ${dy - 44}q3 4 0 6q-3-2 0-6z" fill="#9fd0f0" ${Ow(0.8)}/>`)).join('')) +
      once(showIn([HAT_ON + 0.1, LOOP]), DOG,
        anim({ type: 'rotate', pivot: [dx + 32, dy - 82], period: 1.2 },
          [0, 120, 240].map((a) => `<path transform="rotate(${a} ${dx + 32} ${dy - 82})" d="M${dx + 32} ${dy - 98}l2 4l4 1l-3 3l1 4l-4-2l-4 2l1-4l-3-3l4-1z" fill="#ffd23f" ${Ow(1)}/>`).join('')))
    // Dust behind it as it charges.
    const dust = once(showIn([8.2, BONK + 0.1]), DOG,
      anim({ type: 'keys', period: 0.3, keys: [{ t: 0, x: 0, y: 0, sx: 0.6, sy: 0.6, o: 0.8 }, { t: 0.3, x: -26, y: -8, sx: 1.4, sy: 1.4, o: 0 }], pivot: [dx - 34, dy - 4] },
        `<circle cx="${dx - 34}" cy="${dy - 4}" r="8" fill="#b9b2c8"/><circle cx="${dx - 44}" cy="${dy - 8}" r="5" fill="#b9b2c8"/>`))
    const dog = keys('dog', dogKeys(), DOG,
      groundShadow(dx, dy, 56, 7) + scaled(dust + once(showIn([0, 8.2]), DOG, dogLying) + once(showIn([8.2, LOOP]), DOG, dogStanding)))
    // The bucket: standing full by the steps; bonk — it flips up, spilling its water, and comes down on the dog's head.
    const BUCKET: [number, number] = [334, 782]
    const [bx, by] = BUCKET
    const bucketCentre: [number, number] = [bx, by - 14]
    // Where the upside-down bucket sits on the dog's head when it lands (the dog's offset then: x 28).
    const landing: [number, number] = [dx + 28 + DOG_SCALE * 32, dy - DOG_SCALE * 58]
    const bucket =
      once([{ t: 0, x: 0, y: 0, rot: 0, o: 1 }, { t: BONK, ease: 'out' }, { t: 8.98, x: -18, y: -120, rot: 250, ease: 'in' }, { t: HAT_ON, x: landing[0] - bucketCentre[0], y: landing[1] - bucketCentre[1], rot: 180, o: 1, ease: 'step' }, { t: HAT_ON + 0.02, o: 0, ease: 'step' }],
        bucketCentre,
        `<g transform="translate(${bx} ${by}) scale(${DOG_SCALE}) translate(${-bx} ${-by})">${tin(bx, by)}</g>`) +
      once(showIn([0, BONK]), BUCKET, groundShadow(bx, by + 1, 22, 4)) +
      // The spilt water: a puddle; drops flying from the bonk.
      once([{ t: 0, sx: 0.2, sy: 0.2, o: 0, ease: 'step' }, { t: 8.95, o: 1, ease: 'out' }, { t: 9.4, sx: 1, sy: 1, ease: 'step' }], [bx + 4, by + 2],
        `<ellipse cx="${bx + 4}" cy="${by + 2}" rx="34" ry="6" fill="#6f9fd0" fill-opacity="0.75" ${Ow(1.4)}/><path d="M${bx - 12} ${by + 1}h14" stroke="#cfe8fb" stroke-width="2" stroke-linecap="round"/>`) +
      [[-40, -60], [-18, -86], [10, -96], [34, -70], [52, -40], [-56, -30]]
        .map(([ox, oy]) => once([{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t: BONK, o: 1, ease: 'out' }, { t: BONK + 0.25, x: ox, y: oy, ease: 'in' }, { t: BONK + 0.55, x: ox * 1.3, y: oy + 90, o: 1, ease: 'step' }, { t: BONK + 0.6, o: 0, ease: 'step' }], [bx, by - 36],
          `<path d="M${bx} ${by - 42}q4 6 0 9q-4-3 0-9z" fill="#9fd0f0" ${Ow(1)}/>`))
        .join('') +
      // BONK: a starburst and ringing lines at the impact.
      once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t: BONK, o: 1, ease: 'out' }, { t: BONK + 0.12, sx: 1.15, sy: 1.15, ease: 'inOut' }, { t: BONK + 0.3, sx: 1, sy: 1, o: 1, ease: 'step' }, { t: BONK + 0.34, o: 0, ease: 'step' }], [bx - 10, by - 40],
        `<path d="M${bx - 10} ${by - 70}l7 16l17-6l-9 15l16 8l-18 3l4 18l-14-11l-11 14l-2-18l-18 1l13-12l-12-13l18 2z" fill="#ffe066" ${Ow(1.8)}/><path d="M${bx - 10} ${by - 56}l4 9l10-3l-5 8l9 4l-10 2l2 10l-8-6l-6 8l-1-10l-10 1l7-7l-7-7l10 1z" fill="#fff" fill-opacity="0.8"/>`) +
      once(showIn([HAT_ON, HAT_ON + 0.6]), landing,
        anim({ type: 'keys', period: 0.6, keys: [{ t: 0, sx: 0.5, sy: 0.5, o: 1 }, { t: 0.6, sx: 1.5, sy: 1.5, o: 0 }], pivot: landing },
          `<path d="M${landing[0] - 30} ${landing[1] - 10}q-8 10 0 20M${landing[0] + 30} ${landing[1] - 10}q8 10 0 20M${landing[0] - 40} ${landing[1] - 16}q-10 16 0 32M${landing[0] + 40} ${landing[1] - 16}q10 16 0 32" fill="none" stroke="#fff4c0" stroke-width="3" stroke-linecap="round"/>`))

    // --- The fox (in B a firefly settles on its back at the henhouse door). ---
    const [fx, fy] = FOX
    const foxLeg = (x: number, flip: boolean) =>
      keys(undefined, swing([[CREEP[0], CREEP[1], 0.35], [RUN[0], RUN[1], 0.12]], 22, flip), [x, fy - 18],
        `<path d="M${x} ${fy - 18}v16" stroke="${INK}" stroke-width="6.4" stroke-linecap="round"/><path d="M${x} ${fy - 18}v16" stroke="#2b2238" stroke-width="3.6" stroke-linecap="round"/>`)
    const firefly = diff(
      fx + 8,
      fy - 42,
      22,
      '',
      once([{ t: 0, x: 6, y: -8, o: 0, ease: 'step' }, { t: 11.1, o: 1, ease: 'out' }, { t: 11.6, x: 0, y: 0, ease: 'step' }, { t: 13.2, o: 0, ease: 'step' }], [fx + 8, fy - 42],
        anim({ type: 'blink', duty: 0.5, period: 0.8 }, `<circle cx="${fx + 8}" cy="${fy - 42}" r="9" fill="url(#c10-firefly)"/>`) +
          `<ellipse cx="${fx + 8}" cy="${fy - 42}" rx="3.4" ry="2.4" fill="#2b2238"/><circle cx="${fx + 11}" cy="${fy - 42}" r="2" fill="#f4ff8a"/>`),
      'fox',
      during(11.1, 13.2),
    )
    const fox = keys('fox', foxKeys(), FOX,
      groundShadow(fx + 6, fy, 40, 5) +
        foxLeg(fx + 26, true) + foxLeg(fx - 10, false) +
        // The tail, swishing.
        anim({ type: 'keys', period: 1, keys: [{ t: 0, rot: -6 }, { t: 0.5, rot: 8, ease: 'inOut' }], pivot: [fx + 34, fy - 28] },
          `<path d="M${fx + 34} ${fy - 30}q28-16 44 4q-4 14-24 12q-14-2-20-12z" fill="url(#c10-fox)" ${Ow(1.8)}/><path d="M${fx + 66} ${fy - 30}q12 0 12 6q-4 10-16 8z" fill="#fff" ${Ow(1.4)}/>`) +
        `<ellipse cx="${fx + 8}" cy="${fy - 26}" rx="30" ry="13" fill="url(#c10-fox)" ${Ow(1.8)}/>` +
        `<path d="M${fx - 18} ${fy - 30}q8 14 18 12q-6-10-4-18z" fill="#fff4e6"/>` +
        foxLeg(fx + 34, false) + foxLeg(fx - 18, true) +
        // The head; ears flat while it freezes.
        once(showIn([0, 12.7], [14.6, LOOP]), FOX, `<path d="M${fx - 30} ${fy - 48}l-2-18l12 12zM${fx - 18} ${fy - 50}l4-16l6 16z" fill="url(#c10-fox)" ${Ow(1.4)}/>`) +
        once(showIn([12.7, 14.6]), FOX, `<path d="M${fx - 24} ${fy - 46}l18-8l-10 12zM${fx - 18} ${fy - 44}l20-2l-14 10z" fill="url(#c10-fox)" ${Ow(1.4)}/>`) +
        `<path d="M${fx - 14} ${fy - 50}q-18-4-26 8l-12 8q10 6 22 4q16-2 20-12z" fill="url(#c10-fox)" ${Ow(1.8)}/>` +
        `<path d="M${fx - 40} ${fy - 38}q10 6 22 2q-6 8-18 6z" fill="#fff4e6"/>` +
        `<circle cx="${fx - 52}" cy="${fy - 38}" r="3.2" fill="#2b2238"/>` +
        // Sly eyes; wide with fright.
        once(showIn([0, 12.7], [14.6, LOOP]), FOX, `<path d="M${fx - 32} ${fy - 48}q4-3 8 0" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/><path d="M${fx - 31} ${fy - 47}l6 0" stroke="#ffd23f" stroke-width="1.6"/>`) +
        once(showIn([12.7, 14.6]), FOX, `<circle cx="${fx - 28}" cy="${fy - 48}" r="4.6" fill="#fff" ${Ow(1.2)}/><circle cx="${fx - 29}" cy="${fy - 48}" r="1.6" fill="${INK}"/>`) +
        // Licking its lips at the door.
        once(showIn([11.3, 12.6]), FOX, anim({ type: 'keys', period: 0.6, keys: [{ t: 0, x: 0 }, { t: 0.3, x: 4, ease: 'inOut' }], pivot: [fx - 44, fy - 32] },
          `<path d="M${fx - 46} ${fy - 33}q-2 6 4 6" fill="#f58aa0" ${Ow(1)}/>`)) +
        // A drop of sweat; bristling fur when it jumps.
        once(showIn([12.9, 14.05]), FOX, `<path d="M${fx - 12} ${fy - 58}q4 6 0 9q-4-3 0-9z" fill="#bfe8f5" ${Ow(1)}/>`) +
        once(showIn([14.05, 14.55]), FOX, `<path d="M${fx - 20} ${fy - 38}l-4-8l6 2l2-8l4 6l4-8l2 8l6-6l0 8l6-4l-2 8" fill="none" stroke="#c9541f" stroke-width="2.4" stroke-linejoin="round"/>`) +
        firefly)

    // --- Fireflies over the yard. ---
    let fireflies = ''
    for (let i = 0; i < 12; i++) {
      const ffx = Math.round(80 + rand() * 1280)
      const ffy = Math.round(620 + rand() * 220)
      fireflies += anim({ type: 'path', points: [[0, 0], [30 + rand() * 30, -20], [10, -40 - rand() * 20], [-20, -16]], period: 6 + rand() * 4, phase: rand() },
        anim({ type: 'blink', duty: 0.5, period: 1 + rand(), phase: rand() }, `<circle cx="${ffx}" cy="${ffy}" r="7" fill="url(#c10-firefly)"/><circle cx="${ffx}" cy="${ffy}" r="1.8" fill="#f4ff8a"/>`))
    }

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c10-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34407e"/><stop offset="0.55" stop-color="#6470b0"/><stop offset="1" stop-color="#a9a6d8"/></linearGradient>` +
      `<radialGradient id="c10-moonglow"><stop offset="0" stop-color="#fff6d0" stop-opacity="0.55"/><stop offset="0.35" stop-color="#e8e0ff" stop-opacity="0.18"/><stop offset="1" stop-color="#e8e0ff" stop-opacity="0"/></radialGradient>` +
      `<radialGradient id="c10-moon" cx="0.4" cy="0.35" r="0.75"><stop offset="0" stop-color="#fffbe6"/><stop offset="1" stop-color="#f4e3a8"/></radialGradient>` +
      `<radialGradient id="c10-warm"><stop offset="0" stop-color="#ffd98a" stop-opacity="0.55"/><stop offset="0.5" stop-color="#ffc870" stop-opacity="0.16"/><stop offset="1" stop-color="#ffc870" stop-opacity="0"/></radialGradient>` +
      `<radialGradient id="c10-firefly"><stop offset="0" stop-color="#f4ff8a" stop-opacity="0.95"/><stop offset="1" stop-color="#f4ff8a" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c10-far" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a73a8"/><stop offset="1" stop-color="#7d86b6"/></linearGradient>` +
      `<linearGradient id="c10-hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5f8a8a"/><stop offset="1" stop-color="#557f7c"/></linearGradient>` +
      `<linearGradient id="c10-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a9a7a"/><stop offset="0.6" stop-color="#58876a"/><stop offset="1" stop-color="#46735a"/></linearGradient>` +
      `<linearGradient id="c10-path" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b8aa96"/><stop offset="1" stop-color="#cfc2ac"/></linearGradient>` +
      `<linearGradient id="c10-wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a6a52"/><stop offset="1" stop-color="#b08a6a"/></linearGradient>` +
      `<linearGradient id="c10-wall" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d8b48a"/><stop offset="1" stop-color="#a8846a"/></linearGradient>` +
      `<linearGradient id="c10-coop" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e0c890"/><stop offset="1" stop-color="#b09a70"/></linearGradient>` +
      `<linearGradient id="c10-barn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c46060"/><stop offset="1" stop-color="#8a4048"/></linearGradient>` +
      `<linearGradient id="c10-roof" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a5a6a"/><stop offset="1" stop-color="#5a3a52"/></linearGradient>` +
      `<radialGradient id="c10-window" cx="0.5" cy="0.5" r="0.7"><stop offset="0" stop-color="#fff2b0"/><stop offset="1" stop-color="#f2b450"/></radialGradient>` +
      `<radialGradient id="c10-hay" cx="0.62" cy="0.25" r="0.85"><stop offset="0" stop-color="#f2d47a"/><stop offset="0.6" stop-color="#d9ac4a"/><stop offset="1" stop-color="#a8843a"/></radialGradient>` +
      `<linearGradient id="c10-tin" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a93a0"/><stop offset="0.6" stop-color="#d0d6de"/><stop offset="1" stop-color="#9aa3ad"/></linearGradient>` +
      `<radialGradient id="c10-fox" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#ff9a4a"/><stop offset="0.6" stop-color="#e8662c"/><stop offset="1" stop-color="#b0441c"/></radialGradient>` +
      `<radialGradient id="c10-dog" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#e8aa6a"/><stop offset="1" stop-color="#b07a44"/></radialGradient>` +
      `<pattern id="c10-plaid" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#c94a4a"/><path d="M0 3h10M3 0v10" stroke="#7a2a32" stroke-width="2"/></pattern>` +
      `<radialGradient id="c10-moonlight" cx="0.82" cy="0.17" r="1"><stop offset="0" stop-color="#fff6d0" stop-opacity="0.16"/><stop offset="0.6" stop-color="#e8e0ff" stop-opacity="0.04"/><stop offset="1" stop-color="#e8e0ff" stop-opacity="0"/></radialGradient></defs>` +
      sky +
      land +
      tufts +
      fence +
      farmhouse +
      stable +
      sunflowers +
      haystack +
      scarecrow +
      cornBack +
      coop +
      owl +
      hoot +
      rooster +
      bucket +
      dog +
      fox +
      mouse +
      cornEyes +
      cornFront +
      fireflies +
      `<rect width="${W}" height="${H}" fill="url(#c10-moonlight)"/>`
    )
  },
})
