// Cartoon "The dragon's sneeze" (docs/cartoon-mode.md), made like 812: a 20 s story at a little castle with a moat, at
// dusk on a feast day, told by a camera. A baby dragon comes out of the tower to light the lanterns along the wall —
// but all it can blow is a smoke ring, then a fizz of sparks. A dandelion's fluff drifts up and tickles its nose:
// ah… ah… ACHOO! — a jet of fire shoots up and bursts into fireworks over the castle, and their sparks rain down and
// light every lantern at once. The crowd by the moat cheers; the dragon bows. Twelve differences: two hard (an iron
// ring in the wall, a flag of the bunting), three events of B (a heart-shaped firework, a raven at the stall, a frog
// on the moat's lily pad).
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { cartoonHen, farBird, frog, groundShadow, INK, keenOwl, lilyPad, NATURE_DEFS, O, Ow } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // The left tower: its banner, the owl on top; out of its door comes the dragon.
  { t: 1.6, x: 180, y: 300, w: 480, ease: 'linear' },
  { t: 3.55, x: 290, y: 330, w: 460, ease: 'step' },
  // The first lantern: a smoke ring.
  { t: 3.6, x: 290, y: 330, w: 400, ease: 'step' },
  // On along the wall to the second: a fizz of sparks.
  { t: 6, x: 290, y: 330, w: 400, ease: 'inOut' },
  { t: 6.9, x: 400, y: 335, w: 400, ease: 'step' },
  // The dandelion fluff, ah… ah… ACHOO!
  { t: 8.4, x: 440, y: 340, w: 400, ease: 'linear' },
  { t: 10.75, x: 440, y: 340, w: 400, ease: 'step' },
  // Fireworks over the castle; the lanterns light up.
  { t: 10.8, x: 200, y: 60, w: 1040, ease: 'linear' },
  { t: 14.15, x: 200, y: 70, w: 1040, ease: 'step' },
  // The crowd by the moat cheers.
  { t: 14.2, x: 100, y: 650, w: 400, ease: 'linear' },
  { t: 16.95, x: 104, y: 650, w: 400, ease: 'step' },
  // The dragon bows among the lit lanterns.
  { t: 17, x: 260, y: 300, w: 480, ease: 'linear' },
  { t: 19.95, x: 266, y: 304, w: 470, ease: 'step' },
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

/** The wall walk: its stones' top; the lanterns stand on it, behind the parapet. */
const WALK = 505
/** The lanterns along the walls; the first two are the dragon's tries. */
const LANTERNS = [450, 590, 880, 1010]
/** The moment the falling sparks light every lantern. */
const LIT = 12.9

/** The dragon's feet, in the left tower's door at first; it faces right. */
const DRAGON: [number, number] = [360, WALK]
const AT_FIRST = 30
const AT_SECOND = 175
function dragonKeys(): Keyframe[] {
  const k: Keyframe[] = [{ t: 0, x: -30, y: 0, rot: 0, sy: 1, o: 0, ease: 'step' }, { t: 1.85, o: 0, ease: 'step' }, { t: 1.9, o: 1, ease: 'linear' }]
  // Out of the door and along to the first lantern, bobbing.
  for (let i = 1; i <= 6; i++) k.push({ t: 1.9 + i * 0.18, x: -30 + ((AT_FIRST + 30) * i) / 6, y: i % 2 ? -4 : 0, ease: 'inOut' })
  k.push(
    // A big stretch.
    { t: 3.1, sy: 1, ease: 'inOut' },
    { t: 3.3, sy: 1.06, ease: 'inOut' },
    { t: 3.5, sy: 1, ease: 'inOut' },
    // Breathe in — blow: a smoke ring. A cough or two.
    { t: 3.8, sy: 1, ease: 'inOut' },
    { t: 4.4, sy: 1.09, ease: 'in' },
    { t: 4.5, sy: 0.93, ease: 'out' },
    { t: 4.9, sy: 1, ease: 'inOut' },
    { t: 5.35, y: 0, ease: 'inOut' },
    { t: 5.5, y: -4, ease: 'inOut' },
    { t: 5.65, y: 0, ease: 'inOut' },
    { t: 5.8, y: -4, ease: 'inOut' },
    { t: 5.95, y: 0, ease: 'inOut' },
  )
  // On to the second lantern.
  for (let i = 1; i <= 5; i++) k.push({ t: 5.95 + i * 0.18, x: AT_FIRST + ((AT_SECOND - AT_FIRST) * i) / 5, y: i % 2 ? -4 : 0, ease: 'inOut' })
  k.push(
    // Breathe in harder — blow: a fizz of sparks. A cross stomp.
    { t: 7, sy: 1, ease: 'inOut' },
    { t: 7.4, sy: 1.11, ease: 'in' },
    { t: 7.5, sy: 0.92, ease: 'out' },
    { t: 8, sy: 1, ease: 'out' },
    { t: 8.15, y: -10, ease: 'in' },
    { t: 8.3, y: 0, ease: 'inOut' },
    // The fluff at its nose: ah… ah…
    { t: 9.4, rot: 0, ease: 'inOut' },
    { t: 9.8, rot: -10, ease: 'inOut' },
    { t: 10, rot: -6, ease: 'inOut' },
    { t: 10.3, rot: -20, ease: 'in' },
    // ACHOO! — straight up; knocked down onto its bottom.
    { t: 10.4, rot: -30, sy: 1.04, ease: 'out' },
    { t: 10.6, rot: -10, sy: 0.86, ease: 'inOut' },
    { t: 10.9, rot: 0, sy: 0.9, ease: 'inOut' },
    { t: 16.4, sy: 0.9, ease: 'inOut' },
    { t: 16.7, sy: 1, ease: 'inOut' },
    // Bows, twice.
    { t: 17.5, rot: 0, ease: 'inOut' },
    { t: 17.9, rot: 24, ease: 'inOut' },
    { t: 18.4, rot: 0, ease: 'inOut' },
    { t: 18.9, rot: 24, ease: 'inOut' },
    { t: 19.4, rot: 0, ease: 'inOut' },
    { t: 19.95, ease: 'step' },
  )
  return k
}

/** Where the fire jet ends in the sky; the bursts the fireworks fly to, and when. */
const JET_TOP: [number, number] = [590, 150]
const BURSTS: { at: [number, number]; t: number; c: [string, string] }[] = [
  { at: [460, 190], t: 11, c: ['#ffd23f', '#ff7b3a'] },
  { at: [800, 150], t: 11.4, c: ['#7fd3ff', '#ffffff'] },
  { at: [640, 100], t: 11.8, c: ['#ff6b9a', '#ffd23f'] },
  { at: [1000, 230], t: 12.2, c: ['#9cf06a', '#ffffff'] },
]

export default svgLevel({
  id: 823,
  chapter: 'cartoon',
  title: 'cartoonDragonSneeze',
  parTimeSec: 120,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const blink = (period: number, phase = 0) => (m: string) => anim({ type: 'blink', duty: 0.07, period, phase }, m)
    const beat = (pivot: [number, number], every: number, phase = 0) => (m: string) =>
      anim({ type: 'keys', period: every, phase, keys: [{ t: 0, sy: 1 }, { t: every / 2, sy: 0.3, ease: 'inOut' }], pivot }, m)
    /** A spiky starburst centred on (x, y), radius r. */
    const starburst = (x: number, y: number, r: number, fill: string) => {
      let d = ''
      for (let i = 0; i < 16; i++) {
        const a = (i * Math.PI) / 8
        const rr = i % 2 ? r * 0.45 : r
        d += `${i ? 'L' : 'M'}${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`
      }
      return `<path d="${d}z" fill="${fill}" ${Ow(1.8)}/>`
    }

    // --- The dusk sky: violet to rose to orange, the low sun, the rising moon, the first stars, birds going home. ---
    let stars = ''
    for (let i = 0; i < 26; i++) {
      const sx = Math.round(rand() * W)
      const sy = Math.round(20 + rand() * 230)
      stars += anim({ type: 'blink', duty: 0.5, period: 1.4 + rand() * 2, phase: rand() }, `<circle cx="${sx}" cy="${sy}" r="${(1.2 + rand() * 1.4).toFixed(1)}" fill="#fff6d0"/>`)
    }
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c23-sky)"/>` +
      stars +
      `<circle cx="140" cy="575" r="230" fill="url(#c23-glow)"/><circle cx="140" cy="575" r="56" fill="#ffc46a" stroke="#f29a3b" stroke-width="3"/>` +
      `<circle cx="1260" cy="130" r="34" fill="#fff4d0"/><circle cx="1276" cy="120" r="30" fill="url(#c23-skymid)"/>` +
      `<path d="M0 120q140-30 300-6q120 16 230-4" fill="none" stroke="#ffb3c7" stroke-opacity="0.5" stroke-width="16" stroke-linecap="round"/>` +
      `<path d="M820 260q160-26 330-4q90 12 200-8" fill="none" stroke="#ffc7a8" stroke-opacity="0.45" stroke-width="14" stroke-linecap="round"/>` +
      keys(undefined, [{ t: 0, x: 0, y: 0 }, { t: 19.9, x: -1500, y: -40 }], [1460, 300],
        ([[1460, 300], [1482, 290], [1486, 314], [1506, 282]] as [number, number][]).map(([fx, fy], i) => farBird(fx, fy, beat([fx, fy - 2], 0.5, i * 0.2))).join(''))

    // --- Far hills with a village, its windows lit, chimney smoke; poplars. ---
    let village = ''
    for (const [hx, hy, s] of [[60, 610, 1], [130, 600, 0.8], [1260, 600, 1], [1330, 612, 0.9], [1400, 604, 0.8], [1210, 616, 0.7]] as [number, number, number][]) {
      const w = Math.round(30 * s)
      const h = Math.round(24 * s)
      village +=
        `<rect x="${hx - w / 2}" y="${hy - h}" width="${w}" height="${h}" fill="#8a6a8a"/><path d="M${hx - w / 2 - 3} ${hy - h}l${w / 2 + 3} ${-h * 0.7}l${w / 2 + 3} ${h * 0.7}z" fill="#6a4a6a"/>` +
        `<rect x="${hx - 4}" y="${hy - h + 6}" width="7" height="7" fill="#ffd56a"/>` +
        anim({ type: 'keys', period: 3, phase: (hx % 7) / 7, keys: [{ t: 0, y: 0, o: 0.7, sx: 1 }, { t: 3, y: -30, o: 0, sx: 1.8 }], pivot: [hx + w / 4, hy - h - 8] },
          `<circle cx="${hx + w / 4}" cy="${hy - h - 8}" r="4" fill="#e8d8e8"/>`)
    }
    let poplars = ''
    for (const [px, py, h] of [[180, 640, 90], [205, 646, 70], [1230, 640, 96], [1300, 648, 80], [40, 650, 74]] as [number, number, number][]) {
      poplars += anim({ type: 'sway', angle: 1.6, pivot: [px, py], period: 4.6, phase: (px % 5) / 5 },
        `<path d="M${px - 2} ${py}v-12h4v12z" fill="#5a3a4a"/><ellipse cx="${px}" cy="${py - 12 - h / 2}" rx="${h / 6}" ry="${h / 2}" fill="#5a7a5a" ${Ow(1.4)}/>`)
    }
    const land =
      `<path d="M0 640q240-70 500-40t500-20t440 10V740H0z" fill="url(#c23-hills)"/>` + village + poplars

    // --- The castle: stone walls (a pattern of blocks), the towers, the gatehouse, banners, the drawbridge. ---
    /** A parapet from x0 to x1 whose stones' top is at `top`: a solid band and merlons above it. */
    const parapet = (x0: number, x1: number, top: number) => {
      let m = `<rect x="${x0}" y="${top - 17}" width="${x1 - x0}" height="17" fill="url(#c23-stone)" ${Ow(1.8)}/>`
      for (let x = x0 + 6; x + 18 <= x1; x += 30) m += `<rect x="${x}" y="${top - 35}" width="18" height="18" fill="url(#c23-stone)" ${Ow(1.8)}/>`
      return m
    }
    const leftTower =
      `<rect x="220" y="380" width="110" height="350" fill="url(#c23-stone)" ${O}/><rect x="220" y="380" width="110" height="350" fill="url(#c23-blocks)"/>` +
      `<rect x="300" y="380" width="30" height="350" fill="#3a2a4a" fill-opacity="0.18"/>` +
      `<rect x="214" y="374" width="122" height="12" fill="url(#c23-stone)" ${Ow(1.8)}/>` +
      [216, 246, 276, 306].map((x) => `<rect x="${x}" y="356" width="18" height="18" fill="url(#c23-stone)" ${Ow(1.8)}/>`).join('') +
      `<path d="M262 560v-24q8-10 16 0v24z" fill="#ffd56a" ${Ow(1.6)}/><path d="M262 650v-24q8-10 16 0v24z" fill="#2a1e3a" ${Ow(1.6)}/>` +
      // Its door onto the wall walk.
      `<path d="M298 ${WALK}v-38q14-18 28 0v38z" fill="#2a1e3a" ${Ow(1.8)}/>`
    // The banner on the tower: blue in A, green in B.
    const banner = (c: string) =>
      `<path d="M266 396h32v70l-16-12l-16 12z" fill="${c}" ${Ow(1.8)}/><circle cx="282" cy="420" r="8" fill="#ffd23f" ${Ow(1.2)}/><path d="M278 420l3 3l6-6" fill="none" stroke="${INK}" stroke-width="1.6"/>`
    const towerBanner =
      `<path d="M262 394h40" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` +
      anim({ type: 'keys', period: 3.2, id: 'banner', keys: [{ t: 0, rot: -2 }, { t: 1.6, rot: 2, ease: 'inOut' }], pivot: [282, 394] },
        diff(282, 434, 42, banner('#3a6fd0'), banner('#3a9a5a'), 'banner'))
    // The owl on top of the tower, beside a little lantern (lit with the others).
    const owlLantern =
      `<path d="M322 356v-12" stroke="${INK}" stroke-width="2.4"/><rect x="315" y="330" width="14" height="16" rx="2" fill="#4a3a4a" ${Ow(1.4)}/><path d="M313 330l9-8l9 8z" fill="#5a4a5a" ${Ow(1.2)}/>` +
      once(showIn([LIT, LOOP]), [322, 338], `<circle cx="322" cy="338" r="26" fill="url(#c23-lamp)"/><rect x="317" y="332" width="10" height="12" fill="#ffe08a"/>`)
    const owl = anim({ type: 'sway', angle: 6, pivot: [292, 358], period: 3.6 }, keenOwl(292, 358, 0.8, blink(3.1, 0.2)))

    const leftWall =
      `<rect x="330" y="${WALK}" width="310" height="${730 - WALK}" fill="url(#c23-stone)" ${O}/><rect x="330" y="${WALK}" width="310" height="${730 - WALK}" fill="url(#c23-blocks)"/>` +
      `<path d="M400 600v-20q8-10 16 0v20zM560 610v-20q8-10 16 0v20z" fill="#2a1e3a" ${Ow(1.4)}/>` +
      // A hard one: an iron tie ring in the wall below the first lantern (A only).
      diff(520, 562, 18, `<rect x="516" y="548" width="8" height="7" fill="#4a4a5a" ${Ow(1.2)}/><circle cx="520" cy="566" r="7" fill="none" stroke="${INK}" stroke-width="4"/><circle cx="520" cy="566" r="7" fill="none" stroke="#7a7a8a" stroke-width="2"/>`, '')
    const gatehouse =
      `<rect x="640" y="430" width="160" height="300" fill="url(#c23-stone)" ${O}/><rect x="640" y="430" width="160" height="300" fill="url(#c23-blocks)"/>` +
      `<rect x="770" y="430" width="30" height="300" fill="#3a2a4a" fill-opacity="0.16"/>` +
      parapet(636, 804, 430) +
      `<path d="M664 486v-22q8-10 16 0v22zM760 486v-22q8-10 16 0v22z" fill="#ffd56a" ${Ow(1.6)}/>` +
      `<path d="M690 730v-62q30-34 60 0v62z" fill="#2a1e3a" ${Ow(2)}/><path d="M698 676v54M710 664v66M722 660v70M734 664v66M746 676v54M694 690h52M692 708h56" stroke="#6a5a4a" stroke-width="2.4"/>` +
      // The shield over the gate: a band across it in A, plain in B.
      `<path d="M704 514h32v18q0 16-16 22q-16-6-16-22z" fill="#c0392b" ${Ow(1.8)}/>` +
      diff(720, 531, 22, `<path d="M709 521l22 20" stroke="#ffd23f" stroke-width="6"/>`, '') +
      `<path d="M704 514h32v18q0 16-16 22q-16-6-16-22z" fill="none" ${Ow(1.8)}/>` +
      // Pennants either side.
      [660, 780].map((x) => anim({ type: 'keys', period: 2.4, phase: x / 1000, keys: [{ t: 0, rot: -4 }, { t: 1.2, rot: 4, ease: 'inOut' }], pivot: [x, 444] },
        `<path d="M${x - 8} 444h16v40l-8-8l-8 8z" fill="#e8a33b" ${Ow(1.4)}/>`)).join('')
    const rightWall =
      `<rect x="800" y="${WALK}" width="280" height="${730 - WALK}" fill="url(#c23-stone)" ${O}/><rect x="800" y="${WALK}" width="280" height="${730 - WALK}" fill="url(#c23-blocks)"/>` +
      `<path d="M900 600v-20q8-10 16 0v20zM1010 610v-20q8-10 16 0v20z" fill="#2a1e3a" ${Ow(1.4)}/>`
    const rightTower =
      `<rect x="1080" y="360" width="110" height="370" fill="url(#c23-stone)" ${O}/><rect x="1080" y="360" width="110" height="370" fill="url(#c23-blocks)"/>` +
      `<rect x="1160" y="360" width="30" height="370" fill="#3a2a4a" fill-opacity="0.18"/>` +
      `<path d="M1070 362l65-92l65 92z" fill="url(#c23-roof)" ${O}/><path d="M1135 272v-34" stroke="${INK}" stroke-width="3"/>` +
      anim({ type: 'keys', period: 1.6, keys: [{ t: 0, sy: 1 }, { t: 0.8, sy: 0.8, ease: 'inOut' }], pivot: [1136, 246] }, `<path d="M1136 240h30l-8 7l8 7h-30z" fill="#e63946" ${Ow(1.4)}/>`) +
      `<path d="M1122 470v-24q8-10 16 0v24zM1122 580v-24q8-10 16 0v24z" fill="#ffd56a" ${Ow(1.6)}/>`

    // A raven on the right wall's first merlon (A only), bobbing its head.
    const raven = (x: number, y: number, head: (m: string) => string = (m) => m) =>
      `<path d="M${x - 2} ${y}v-6M${x + 3} ${y}v-6" stroke="${INK}" stroke-width="2"/>` +
      `<path d="M${x - 10} ${y - 12}l-12 4l12 3z" fill="#2b2b3a" ${Ow(1.2)}/>` +
      `<ellipse cx="${x}" cy="${y - 14}" rx="12" ry="8" fill="#2b2b3a" ${Ow(1.6)}/><path d="M${x - 6} ${y - 16}q8-4 14 2" fill="none" stroke="#5a5a7a" stroke-width="1.6"/>` +
      head(`<circle cx="${x + 11}" cy="${y - 22}" r="7" fill="#2b2b3a" ${Ow(1.6)}/><path d="M${x + 16} ${y - 24}l10 3l-10 3z" fill="#4a4a5a" ${Ow(1.2)}/><circle cx="${x + 13}" cy="${y - 24}" r="1.6" fill="#ffd23f"/>`)
    const wallRaven = diff(817, 455, 30,
      raven(815, 470, (m) => anim({ type: 'keys', period: 1.8, keys: [{ t: 0, rot: 0 }, { t: 0.3, rot: 14, ease: 'inOut' }, { t: 0.6, rot: 0, ease: 'inOut' }], pivot: [823, 460] }, m)), '')

    // --- The lanterns: dark until the sparks light them; the first has a little finial on its roof (A only). ---
    const lantern = (x: number) =>
      `<path d="M${x} ${WALK}v-61" stroke="${INK}" stroke-width="5"/><path d="M${x} ${WALK}v-61" stroke="#5a4a3a" stroke-width="2.6"/>` +
      `<rect x="${x - 10}" y="420" width="20" height="24" rx="3" fill="#4a3a4a" ${Ow(1.6)}/><path d="M${x - 6} 424v16M${x + 6} 424v16" stroke="#2a1e2a" stroke-width="1.4"/>` +
      `<path d="M${x - 13} 420l13-9l13 9z" fill="#5a4a5a" ${Ow(1.4)}/>`
    const lit = (x: number) =>
      once(showIn([LIT, LOOP]), [x, 432],
        `<circle cx="${x}" cy="432" r="40" fill="url(#c23-lamp)"/><rect x="${x - 7}" y="423" width="14" height="18" rx="2" fill="#ffe08a"/>` +
          anim({ type: 'keys', period: 0.5, phase: (x % 5) / 5, keys: [{ t: 0, sy: 1 }, { t: 0.25, sy: 0.8, ease: 'inOut' }], pivot: [x, 440] },
            `<path d="M${x} 440q-5-6 0-14q5 8 0 14z" fill="#ff9a3a"/>`))
    const lanterns =
      LANTERNS.map(lantern).join('') +
      diff(450, 407, 18, `<path d="M447 412q0-8 3-10q3 2 3 10z" fill="#ffd23f" ${Ow(1.2)}/><circle cx="450" cy="402" r="2.6" fill="#ffd23f" ${Ow(1)}/>`, '')
    const lanternGlow = LANTERNS.map(lit).join('')

    // --- Bunting from the left tower to the gatehouse (a hard one: one flag fewer in B) and on to the right tower. ---
    const bunting = (p0: [number, number], c: [number, number], p2: [number, number], n: number, missing = -1) => {
      let m = `<path d="M${p0[0]} ${p0[1]}Q${c[0]} ${c[1]} ${p2[0]} ${p2[1]}" fill="none" stroke="${INK}" stroke-width="1.8"/>`
      const COLORS = ['#e63946', '#ffd23f', '#3a9ad0', '#52b788', '#ff7b3a']
      for (let i = 0; i < n; i++) {
        const t = (i + 0.5) / n
        const x = Math.round((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * c[0] + t ** 2 * p2[0])
        const y = Math.round((1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * c[1] + t ** 2 * p2[1])
        const flag = `<path d="M${x - 8} ${y}h16l-8 16z" fill="${COLORS[i % COLORS.length]}" ${Ow(1.2)}/>`
        m += i === missing ? diff(x, y + 7, 18, flag, '') : flag
      }
      return m
    }
    const buntings = bunting([332, 366], [487, 410], [642, 404], 12, 6) + bunting([798, 404], [940, 446], [1078, 372], 11)

    // --- On the wall top: a bucket of water on a merlon by the second lantern (A only), a dandelion in a crack. ---
    const bucket = diff(615, 459, 20,
      `<path d="M605 450h20l-3 20h-14z" fill="#8a8f99" ${Ow(1.6)}/><ellipse cx="615" cy="450" rx="10" ry="3" fill="#5a8fc0" ${Ow(1.2)}/><path d="M605 450q10-14 20 0" fill="none" stroke="${INK}" stroke-width="1.4"/>`, '')
    const dandelion =
      `<path d="M495 470q2-8 0-18" fill="none" stroke="#5a9a3a" stroke-width="2.2"/><path d="M495 466q-6-2-8 2q4 2 8-2zM495 462q6-3 8 1q-4 2-8-1z" fill="#5a9a3a"/>` +
      `<circle cx="495" cy="448" r="8" fill="#fffaf0" fill-opacity="0.85" ${Ow(1)}/><path d="M495 448l-6-4M495 448l6-4M495 448v-7M495 448l-7 2M495 448l7 2" stroke="#d8d2c4" stroke-width="1"/>`
    // The fluff drifting up to the dragon's nose, tickling, blown away by the sneeze.
    const NOSE: [number, number] = [DRAGON[0] + AT_SECOND + 50, WALK - 74]
    const fluff = once(
      [
        { t: 0, x: 0, y: 0, o: 0, ease: 'step' },
        { t: 8.5, o: 1, ease: 'inOut' },
        { t: 8.9, x: 24, y: -22, ease: 'inOut' },
        { t: 9.3, x: 60, y: -10, ease: 'inOut' },
        { t: 9.6, x: NOSE[0] - 495, y: NOSE[1] - 444, ease: 'inOut' },
        { t: 9.9, x: NOSE[0] - 492, y: NOSE[1] - 448, ease: 'inOut' },
        { t: 10.2, x: NOSE[0] - 496, y: NOSE[1] - 443, ease: 'in' },
        { t: 10.6, x: NOSE[0] - 440, y: NOSE[1] - 640, o: 1, ease: 'step' },
        { t: 10.65, o: 0, ease: 'step' },
      ],
      [495, 444],
      `<path d="M495 444v12" stroke="#d8d2c4" stroke-width="1.4"/><path d="M495 444l-8-8M495 444l8-8M495 444v-11M495 444l-10 2M495 444l10 2" stroke="#fffaf0" stroke-width="2.4" stroke-linecap="round"/><circle cx="495" cy="444" r="2.4" fill="#d8d2c4"/>`,
    )

    // --- The dragon. ---
    const [dx, dy] = DRAGON
    const deye = (open: boolean) =>
      open
        ? `<circle cx="${dx + 20}" cy="${dy - 88}" r="7.5" fill="#fff" ${Ow(1.4)}/><circle cx="${dx + 22}" cy="${dy - 87}" r="3.8" fill="${INK}"/><circle cx="${dx + 23.4}" cy="${dy - 89}" r="1.4" fill="#fff"/>`
        : `<path d="M${dx + 13} ${dy - 87}q7-6 14 0" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`
    const dragonEyes =
      once(showIn([0, 4.4], [4.95, 7.45], [8, 9.6], [10.9, 17.5]), DRAGON, deye(true)) +
      // Shut tight to blow; scrunched for the sneeze; happy for the bows.
      once(showIn([4.4, 4.95], [7.45, 8], [9.6, 10.9], [17.5, LOOP]), DRAGON, deye(false))
    const dragonMouth =
      once(showIn([0, 3.8], [4.95, 6.95], [8.3, 9.6], [10.9, LOOP]), DRAGON, `<path d="M${dx + 30} ${dy - 66}q8 6 16 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`) +
      // Cheeks puffed full of breath.
      once(showIn([3.8, 4.45], [6.95, 7.45]), DRAGON, `<circle cx="${dx + 30}" cy="${dy - 70}" r="11" fill="#8ee0a0" ${Ow(1.6)}/>`) +
      // Pursed, blowing.
      once(showIn([4.45, 4.95], [7.45, 8.3]), DRAGON, `<circle cx="${dx + 50}" cy="${dy - 70}" r="4" fill="#7a2a2a" ${Ow(1.4)}/>`) +
      // ACHOO.
      once(showIn([9.6, 10.9]), DRAGON, `<ellipse cx="${dx + 44}" cy="${dy - 66}" rx="6" ry="7" fill="#7a2a2a" ${Ow(1.4)}/>`)
    // Its nose wriggles while the fluff tickles it.
    const nose = anim({ type: 'keys', period: 0.24, keys: [{ t: 0, rot: -6 }, { t: 0.12, rot: 6, ease: 'inOut' }], pivot: [dx + 44, dy - 76] },
      once(showIn([9.6, 10.4]), DRAGON, `<path d="M${dx + 46} ${dy - 82}q8 4 6 10" fill="none" stroke="${INK}" stroke-width="1.6"/>`))
    const wing = (front: boolean) =>
      anim({ type: 'keys', period: 0.9, phase: front ? 0 : 0.2, keys: [{ t: 0, rot: 0 }, { t: 0.45, rot: front ? -18 : -12, ease: 'inOut' }], pivot: [dx - 4, dy - 58] },
        `<path d="M${dx - 4} ${dy - 58}q-30-30-40-6q10-2 12 6q8-6 12 4q8-6 16-4z" fill="${front ? '#7fd8f0' : '#5ab8d8'}" ${Ow(1.6)}/>`)
    const spikes = [[-22, -60], [-26, -46], [-27, -32], [-24, -18]].map(([ox, oy]) => `<path d="M${dx + ox} ${dy + oy - 4}l-10 4l10 6z" fill="#ff9a3a" ${Ow(1.2)}/>`).join('')
    const dragon = keys('dragon', dragonKeys(), DRAGON,
      groundShadow(dx, dy, 34, 5) +
        anim({ type: 'sway', angle: 10, pivot: [dx - 22, dy - 20], period: 1.8 },
          `<path d="M${dx - 22} ${dy - 20}q-30 6-34-18q-2-14 8-20" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M${dx - 22} ${dy - 20}q-30 6-34-18q-2-14 8-20" fill="none" stroke="#4ab86a" stroke-width="8" stroke-linecap="round"/>` +
            `<path d="M${dx - 48} ${dy - 58}l-6-12l14 4z" fill="#ff9a3a" ${Ow(1.3)}/>`) +
        wing(false) +
        `<ellipse cx="${dx}" cy="${dy - 36}" rx="26" ry="30" fill="url(#c23-dragon)" ${Ow(2)}/>` +
        `<ellipse cx="${dx + 9}" cy="${dy - 32}" rx="14" ry="22" fill="#f6e7a8" ${Ow(1.2)}/><path d="M${dx} ${dy - 44}h18M${dx - 1} ${dy - 32}h20M${dx} ${dy - 20}h18" stroke="#d9c27a" stroke-width="1.6"/>` +
        spikes +
        `<path d="M${dx + 14} ${dy - 46}q10 4 12 12" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M${dx + 14} ${dy - 46}q10 4 12 12" fill="none" stroke="#5ac87a" stroke-width="4" stroke-linecap="round"/>` +
        // Head: horns, the round snout, a big eye.
        `<path d="M${dx + 4} ${dy - 98}l-2-14l9 10zM${dx + 20} ${dy - 102}l4-13l5 12z" fill="#fff4d0" ${Ow(1.3)}/>` +
        `<circle cx="${dx + 16}" cy="${dy - 82}" r="22" fill="url(#c23-dragon)" ${Ow(2)}/>` +
        `<ellipse cx="${dx + 36}" cy="${dy - 74}" rx="16" ry="12" fill="#7ad890" ${Ow(1.8)}/><circle cx="${dx + 44}" cy="${dy - 78}" r="1.8" fill="${INK}"/><circle cx="${dx + 48}" cy="${dy - 75}" r="1.8" fill="${INK}"/>` +
        `<circle cx="${dx + 6}" cy="${dy - 72}" r="5" fill="#ff9a8a" fill-opacity="0.5"/>` +
        dragonEyes + dragonMouth + nose +
        wing(true))
    // Its breath: a smoke ring at the first lantern, a fizz of sparks at the second; coughs.
    const [m1x, m1y] = [dx + AT_FIRST + 50, dy - 72]
    const smoke = once(
      [{ t: 0, x: 0, y: 0, sx: 0.4, sy: 0.4, o: 0, ease: 'step' }, { t: 4.5, o: 1, ease: 'out' }, { t: 5.3, x: 26, y: -30, sx: 1.6, sy: 1.6, o: 0 }, { t: 5.35, ease: 'step' }],
      [m1x, m1y],
      `<ellipse cx="${m1x + 6}" cy="${m1y}" rx="12" ry="9" fill="none" stroke="#9a94a8" stroke-width="6"/><ellipse cx="${m1x + 6}" cy="${m1y}" rx="12" ry="9" fill="none" stroke="#d8d2e0" stroke-width="3"/>`,
    )
    const coughs = once(showIn([5.4, 5.95]), [m1x, m1y],
      anim({ type: 'keys', period: 0.28, keys: [{ t: 0, x: 0, y: 0, o: 1, sx: 0.6, sy: 0.6 }, { t: 0.28, x: 12, y: -10, o: 0, sx: 1.3, sy: 1.3 }], pivot: [m1x, m1y] },
        `<circle cx="${m1x}" cy="${m1y}" r="5" fill="#b8b2c4"/><circle cx="${m1x + 6}" cy="${m1y - 4}" r="3.5" fill="#d0cad8"/>`))
    const [m2x, m2y] = [dx + AT_SECOND + 50, dy - 72]
    let fizz = ''
    for (let i = 0; i < 10; i++) {
      const a = -1.2 + (i / 9) * 2.4
      const r = 26 + (i % 3) * 8
      fizz += once([{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t: 7.5 + (i % 4) * 0.08, o: 1, ease: 'out' }, { t: 7.85 + (i % 4) * 0.08, x: Math.round(Math.cos(a) * r), y: Math.round(Math.sin(a) * r), o: 1, ease: 'step' }, { t: 7.9 + (i % 4) * 0.08, o: 0, ease: 'step' }],
        [m2x, m2y], `<path d="M${m2x} ${m2y - 5}l1.4 3.6l3.6 1.4l-3.6 1.4l-1.4 3.6l-1.4-3.6l-3.6-1.4l3.6-1.4z" fill="#ffd23f"/>`)
    }
    fizz += once(showIn([8.05, 8.4]), [dx + AT_SECOND, dy - 40],
      `<path d="M${dx + AT_SECOND - 30} ${dy - 118}l4-12M${dx + AT_SECOND - 18} ${dy - 122}l2-12M${dx + AT_SECOND - 6} ${dy - 118}l0-12" stroke="#e63946" stroke-width="2.6" stroke-linecap="round"/>`)
    // ACHOO: a starburst at its mouth and a jet of fire straight up.
    const SNEEZE: [number, number] = [542, 418]
    const sneeze =
      once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t: 10.4, o: 1, ease: 'out' }, { t: 10.5, sx: 1.15, sy: 1.15, ease: 'inOut' }, { t: 10.7, sx: 1, sy: 1, o: 1, ease: 'step' }, { t: 10.75, o: 0, ease: 'step' }], SNEEZE,
        starburst(SNEEZE[0], SNEEZE[1], 34, '#ffe066')) +
      once([{ t: 0, sx: 0.2, sy: 0.05, o: 0, ease: 'step' }, { t: 10.4, o: 1, ease: 'out' }, { t: 10.6, sx: 1, sy: 1, ease: 'inOut' }, { t: 10.9, o: 1, ease: 'in' }, { t: 11.1, o: 0, ease: 'step' }], SNEEZE,
        `<path d="M${SNEEZE[0] - 14} ${SNEEZE[1]}Q${SNEEZE[0] - 10} 300 ${JET_TOP[0]} ${JET_TOP[1]}Q${SNEEZE[0] + 30} 300 ${SNEEZE[0] + 14} ${SNEEZE[1]}z" fill="#ff7b3a" ${Ow(1.8)}/>` +
          `<path d="M${SNEEZE[0] - 5} ${SNEEZE[1] - 10}Q${SNEEZE[0] + 2} 320 ${JET_TOP[0] - 4} ${JET_TOP[1] + 30}Q${SNEEZE[0] + 18} 320 ${SNEEZE[0] + 6} ${SNEEZE[1] - 10}z" fill="#ffe066"/>`)

    // --- Fireworks: fireballs fly from the jet's top to their bursts; the sparks rain down onto the lanterns. ---
    const burst = (at: [number, number], t: number, c: [string, string], heart = false) => {
      const [bx, by] = at
      let rays = ''
      if (heart) {
        for (let i = 0; i < 22; i++) {
          const a = (i / 22) * Math.PI * 2
          const hx = 16 * Math.sin(a) ** 3
          const hy = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a))
          rays += `<circle cx="${(bx + hx * 2.6).toFixed(1)}" cy="${(by + hy * 2.6).toFixed(1)}" r="3.4" fill="${i % 2 ? c[0] : c[1]}"/>`
        }
      } else {
        for (let i = 0; i < 16; i++) {
          const a = (i * Math.PI) / 8
          const [x1, y1, x2, y2] = [bx + Math.cos(a) * 14, by + Math.sin(a) * 14, bx + Math.cos(a) * 46, by + Math.sin(a) * 46].map((v) => v.toFixed(1))
          rays += `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c[0]}" stroke-width="3" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="3.2" fill="${c[1]}"/>`
          rays += `<circle cx="${(bx + Math.cos(a + 0.2) * 28).toFixed(1)}" cy="${(by + Math.sin(a + 0.2) * 28).toFixed(1)}" r="2" fill="${c[1]}"/>`
        }
      }
      return once([{ t: 0, sx: 0.2, sy: 0.2, o: 0, ease: 'step' }, { t, o: 1, ease: 'out' }, { t: t + 0.55, sx: 1, sy: 1, ease: 'linear' }, { t: t + 1.3, sx: 1.12, sy: 1.12, o: 0 }, { t: t + 1.35, ease: 'step' }], at, rays)
    }
    const rocket = (to: [number, number], t: number) =>
      once([{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t: 10.6, o: 1, ease: 'out' }, { t, x: to[0] - JET_TOP[0], y: to[1] - JET_TOP[1], o: 1, ease: 'step' }, { t: t + 0.05, o: 0, ease: 'step' }], JET_TOP,
        `<circle cx="${JET_TOP[0]}" cy="${JET_TOP[1]}" r="6" fill="#fff4b0" ${Ow(1.2)}/><circle cx="${JET_TOP[0]}" cy="${JET_TOP[1] + 10}" r="3" fill="#ffb84a"/>`)
    const fireworks = BURSTS.map((b) => rocket(b.at, b.t) + burst(b.at, b.t, b.c)).join('')
    // Sparks falling from the bursts onto the lanterns (and the owl's), which light up with a little pop.
    const targets: [[number, number], [number, number]][] = [
      [BURSTS[0].at, [450, 432]], [BURSTS[2].at, [590, 432]], [BURSTS[1].at, [880, 432]], [BURSTS[3].at, [1010, 432]], [BURSTS[0].at, [322, 338]],
    ]
    const sparkRain = targets
      .map(([from, to]) =>
        once([{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t: 12.3, o: 1, ease: 'in' }, { t: 12.85, x: to[0] - from[0], y: to[1] - from[1], o: 1, ease: 'step' }, { t: 12.9, o: 0, ease: 'step' }], from,
          `<path d="M${from[0]} ${from[1] - 6}l2 4l4 2l-4 2l-2 4l-2-4l-4-2l4-2z" fill="#fff4b0"/>`) +
        once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t: LIT, o: 1, ease: 'out' }, { t: LIT + 0.25, sx: 1, sy: 1, o: 0 }, { t: LIT + 0.3, ease: 'step' }], to, starburst(to[0], to[1], 18, '#fff4b0')))
      .join('')
    // In B one firework bursts into a heart.
    const HEART: [number, number] = [330, 180]
    const heart = diff(HEART[0], HEART[1], 56, '', burst(HEART, 11.7, ['#ff6b9a', '#ffd1e0'], true), undefined, during(11.7, 13.05))

    // --- The moat: water in the sunset colours, swans, the drawbridge, a lily pad (a frog jumps onto it in B). ---
    const swan = (x: number, y: number) =>
      `<ellipse cx="${x}" cy="${y - 8}" rx="20" ry="9" fill="#fbfaf6" ${Ow(1.8)}/><path d="M${x + 8} ${y - 12}q4-12-4-24q-4-6 2-10" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>` +
      `<path d="M${x + 8} ${y - 12}q4-12-4-24q-4-6 2-10" fill="none" stroke="#fbfaf6" stroke-width="4" stroke-linecap="round"/><path d="M${x + 6} ${y - 46}l9 2l-9 3z" fill="#ff9a3a" ${Ow(1)}/><circle cx="${x + 5}" cy="${y - 47}" r="1.3" fill="${INK}"/>` +
      `<path d="M${x - 14} ${y - 10}q10-8 22 0" fill="none" stroke="#d8d2c4" stroke-width="2"/>`
    const moat =
      `<rect y="730" width="${W}" height="72" fill="url(#c23-moat)"/>` +
      anim({ type: 'keys', period: 3, keys: [{ t: 0, x: 0 }, { t: 1.5, x: 14, ease: 'inOut' }] },
        `<path d="M40 760h60M260 774h80M860 756h70M1060 776h90M1300 762h60" stroke="#ffe0c0" stroke-opacity="0.6" stroke-width="3" stroke-linecap="round"/>`) +
      anim({ type: 'path', points: [[0, 0], [-30, 2], [10, 4]], period: 9 }, swan(600, 776) + swan(652, 782)) +
      anim({ type: 'path', points: [[0, 0], [40, 2], [-10, 4]], period: 11, phase: 0.4 }, swan(1000, 772)) +
      // The drawbridge, down over the moat.
      `<path d="M694 730h52l10 74h-72z" fill="url(#c23-planks)" ${Ow(1.8)}/><path d="M690 752h60M688 776h64" stroke="#6e4a26" stroke-width="2"/><path d="M694 668l-6 70M746 668l6 70" stroke="#4a4a5a" stroke-width="2.4" stroke-dasharray="4 3"/>` +
      lilyPad(470, 792, 1.1)
    const FROG: [number, number] = [470, 788]
    const frogHop = diff(FROG[0], FROG[1] - 10, 24, '',
      keys('frog', [{ t: 0, x: 0, y: 20, o: 0, ease: 'step' }, { t: 14.4, o: 1, ease: 'out' }, { t: 14.7, y: -8, ease: 'in' }, { t: 14.85, y: 0, ease: 'step' }, { t: 16.5, ease: 'in' }, { t: 16.75, y: 20, o: 1, ease: 'step' }, { t: 16.8, o: 0, ease: 'step' }], FROG,
        `<g transform="translate(${FROG[0]} ${FROG[1]}) scale(0.6) translate(${-FROG[0]} ${-FROG[1]})">${frog(FROG[0], FROG[1], blink(2.3), (m) => anim({ type: 'keys', period: 0.7, keys: [{ t: 0, sx: 1, sy: 1 }, { t: 0.35, sx: 1.4, sy: 1.4, ease: 'inOut' }], pivot: [FROG[0], FROG[1] - 9] }, m))}</g>`),
      'frog', during(14.4, 16.8))

    // --- The near bank: grass, the market stall, torches; the crowd — hens, the castle cat (a bow on its tail in A),
    // a goat (a bell on its collar in A). ---
    const bank =
      `<rect y="800" width="${W}" height="${H - 800}" fill="url(#c23-grass)"/>` +
      `<path d="M690 806h60l40 94h-140z" fill="url(#c23-path)" ${Ow(1.4)}/>`
    let tufts = ''
    for (let i = 0; i < 26; i++) {
      const tx = Math.round(rand() * W)
      const ty = Math.round(812 + rand() * 84)
      if (tx > 100 && tx < 320 && ty < 870) continue
      tufts += anim({ type: 'sway', angle: 7, pivot: [tx, ty], period: 2.4, phase: (tx % 13) / 13 },
        `<path d="M${tx - 5} ${ty}q1-10 0-15M${tx} ${ty}q1-13 3-18M${tx + 5} ${ty}q-1-9 3-12" fill="none" stroke="#3f7a3a" stroke-width="2.4" stroke-linecap="round"/>`)
    }
    const torch = (x: number, y: number) =>
      groundShadow(x, y, 12, 3) +
      `<path d="M${x} ${y}v-70" stroke="${INK}" stroke-width="6"/><path d="M${x} ${y}v-70" stroke="#7a4a22" stroke-width="3"/><path d="M${x - 7} ${y - 70}h14l-3 8h-8z" fill="#5a4a4a" ${Ow(1.2)}/>` +
      `<circle cx="${x}" cy="${y - 80}" r="34" fill="url(#c23-lamp)"/>` +
      anim({ type: 'keys', period: 0.36, phase: (x % 3) / 3, keys: [{ t: 0, sx: 1, sy: 1 }, { t: 0.18, sx: 0.86, sy: 1.14, ease: 'inOut' }], pivot: [x, y - 72] },
        `<path d="M${x} ${y - 72}q-10-8-2-26q4 10 8 6q6 10-6 20z" fill="#ff9a3a" ${Ow(1.2)}/><path d="M${x} ${y - 74}q-4-6 0-14q4 8 0 14z" fill="#ffe066"/>`)
    const bun = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="6" fill="#e3a75a" ${Ow(1.4)}/><path d="M${x - 5} ${y - 2}q5-3 10 0" fill="none" stroke="#fff4d0" stroke-width="1.6"/>`
    const stall =
      groundShadow(205, 870, 100, 8) +
      `<path d="M120 870v-104M290 870v-104" stroke="${INK}" stroke-width="7"/><path d="M120 870v-104M290 870v-104" stroke="#8a5a32" stroke-width="4"/>` +
      `<rect x="112" y="806" width="186" height="64" fill="url(#c23-planks)" ${Ow(1.8)}/><path d="M112 822h186M112 840h186" stroke="#6e4a26" stroke-width="1.6"/>` +
      `<path d="M104 762h202l-10 30q-8 6-16 0q-8 6-16 0q-8 6-16 0q-8 6-16 0q-8 6-16 0q-8 6-16 0q-8 6-16 0q-8 6-16 0q-8 6-16 0q-8 6-16 0q-8 6-16 0q-8 6-16 0z" fill="url(#c23-awning)" ${Ow(1.8)}/>` +
      `<path d="M104 762l14-22h174l14 22z" fill="#e63946" ${Ow(1.8)}/>` +
      bun(180, 800) + bun(204, 798) + bun(230, 800) + bun(192, 792) + bun(218, 790) +
      `<path d="M256 806v-20h20v20z" fill="#c9a86a" ${Ow(1.4)}/><circle cx="262" cy="784" r="6" fill="#e63946" ${Ow(1.2)}/><circle cx="272" cy="786" r="6" fill="#52b788" ${Ow(1.2)}/>` +
      anim({ type: 'keys', period: 2, keys: [{ t: 0, rot: -6 }, { t: 1, rot: 6, ease: 'inOut' }], pivot: [150, 790] }, `<path d="M150 790v10" stroke="${INK}" stroke-width="1.4"/><path d="M142 800h16l-2 10h-12z" fill="#ffd23f" ${Ow(1.2)}/>`)
    // The cheering: the hens flap, the goat jumps for joy, the cat stands up.
    const CHEER: [number, number] = [14.4, 16.9]
    const hen = (x: number, y: number) =>
      keys(undefined, [{ t: 0, y: 0 }, ...Array.from({ length: 8 }, (_, i) => ({ t: CHEER[0] + i * 0.3, y: i % 2 ? -10 : 0, ease: 'inOut' as const })), { t: CHEER[1], y: 0 }, { t: 19.95, ease: 'step' }], [x, y], cartoonHen(x, y))
    const GOAT: [number, number] = [400, 868]
    const [gx, gy] = GOAT
    const goat = keys('goat', [{ t: 0, y: 0 }, ...Array.from({ length: 8 }, (_, i) => ({ t: CHEER[0] + i * 0.3, y: i % 2 ? -24 : 0, ease: (i % 2 ? 'in' : 'out') as Keyframe['ease'] })), { t: CHEER[1], y: 0 }, { t: 19.95, ease: 'step' }], GOAT,
      groundShadow(gx, gy, 30, 5) +
        `<path d="M${gx - 18} ${gy}v-20M${gx - 8} ${gy}v-20M${gx + 10} ${gy}v-20M${gx + 20} ${gy}v-20" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${gx - 18} ${gy}v-20M${gx - 8} ${gy}v-20M${gx + 10} ${gy}v-20M${gx + 20} ${gy}v-20" stroke="#e8e1d6" stroke-width="2.6" stroke-linecap="round"/>` +
        `<path d="M${gx - 26} ${gy - 34}l-8-6l4 8z" fill="#e8e1d6" ${Ow(1.2)}/>` +
        `<ellipse cx="${gx}" cy="${gy - 30}" rx="28" ry="14" fill="#f4f1ea" ${Ow(1.8)}/>` +
        `<path d="M${gx + 20} ${gy - 36}q4-18 14-20l6 12q-8 4-10 14z" fill="#f4f1ea" ${Ow(1.6)}/>` +
        `<ellipse cx="${gx + 40}" cy="${gy - 54}" rx="11" ry="8" transform="rotate(25 ${gx + 40} ${gy - 54})" fill="#f4f1ea" ${Ow(1.6)}/>` +
        `<path d="M${gx + 36} ${gy - 62}q-4-12 4-16M${gx + 42} ${gy - 62}q0-12 8-14" fill="none" stroke="#a8874e" stroke-width="3.4" stroke-linecap="round"/>` +
        `<circle cx="${gx + 42}" cy="${gy - 56}" r="1.8" fill="${INK}"/><path d="M${gx + 44} ${gy - 44}q-2 8 2 10" fill="none" stroke="#d8d2c4" stroke-width="3"/>` +
        `<path d="M${gx + 26} ${gy - 44}q6 4 12 0" fill="none" stroke="#c0392b" stroke-width="3"/>` +
        diff(gx + 32, gy - 36, 18, `<path d="M${gx + 32} ${gy - 42}v4" stroke="${INK}" stroke-width="1.4"/><path d="M${gx + 27} ${gy - 30}q5-12 10 0z" fill="#ffd23f" ${Ow(1.2)}/><circle cx="${gx + 32}" cy="${gy - 29}" r="1.6" fill="${INK}"/>`, '', 'goat'))
    const CAT: [number, number] = [330, 874]
    const [cx, cy] = CAT
    const cat =
      groundShadow(cx, cy, 18, 3) +
      anim({ type: 'sway', angle: 12, pivot: [cx + 12, cy - 6], period: 1.6, id: 'cattail' },
        `<path d="M${cx + 12} ${cy - 6}q20 0 22-20q1-8-4-10" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M${cx + 12} ${cy - 6}q20 0 22-20q1-8-4-10" fill="none" stroke="#6a6a7a" stroke-width="4" stroke-linecap="round"/>` +
          diff(cx + 33, cy - 30, 18, `<path d="M${cx + 33} ${cy - 30}l-8-5v10zM${cx + 33} ${cy - 30}l8-5v10z" fill="#e63946" ${Ow(1.2)}/><circle cx="${cx + 33}" cy="${cy - 30}" r="2.4" fill="#e63946" ${Ow(1)}/>`, '', 'cattail')) +
      `<ellipse cx="${cx}" cy="${cy - 14}" rx="13" ry="15" fill="#6a6a7a" ${Ow(1.6)}/><circle cx="${cx - 2}" cy="${cy - 34}" r="11" fill="#6a6a7a" ${Ow(1.6)}/>` +
      `<path d="M${cx - 11} ${cy - 40}l-2-12l9 6zM${cx + 6} ${cy - 41}l4-11l2 11z" fill="#6a6a7a" ${Ow(1.3)}/>` +
      `<circle cx="${cx - 6}" cy="${cy - 35}" r="2.4" fill="#ffd23f"/><circle cx="${cx + 3}" cy="${cy - 35}" r="2.4" fill="#ffd23f"/><circle cx="${cx - 6}" cy="${cy - 35}" r="1" fill="${INK}"/><circle cx="${cx + 3}" cy="${cy - 35}" r="1" fill="${INK}"/>` +
      `<path d="M${cx - 3} ${cy - 30}l1.6 1.6l1.6-1.6" fill="none" stroke="${INK}" stroke-width="1.2"/>`
    // In B a raven swoops down onto the stall, pecks up a crumb and flies off with it.
    const THIEF: [number, number] = [214, 800]
    const thief = diff(THIEF[0] + 2, THIEF[1] - 18, 30, '',
      keys('thief', [
        { t: 0, x: 380, y: -150, o: 0, ease: 'step' },
        { t: 14.3, o: 1, ease: 'in' },
        { t: 15, x: 0, y: 0, ease: 'step' },
        { t: 15.2, rot: 0, ease: 'inOut' },
        { t: 15.35, rot: 22, ease: 'inOut' },
        { t: 15.5, rot: 0, ease: 'inOut' },
        { t: 15.65, rot: 22, ease: 'inOut' },
        { t: 15.8, rot: 0, ease: 'out' },
        { t: 16.85, x: -190, y: -150, o: 1, ease: 'step' },
        { t: 16.9, o: 0, ease: 'step' },
      ], THIEF,
        raven(THIEF[0], THIEF[1]) +
          anim({ type: 'keys', period: 0.3, keys: [{ t: 0, sy: 1 }, { t: 0.15, sy: -0.5, ease: 'inOut' }], pivot: [THIEF[0], THIEF[1] - 16] },
            once(showIn([14.3, 15], [15.8, 16.9]), THIEF, `<path d="M${THIEF[0] - 4} ${THIEF[1] - 16}q-6-20 14-22q-2 12-10 22z" fill="#3a3a4a" ${Ow(1.4)}/>`)) +
          once(showIn([15.7, 16.9]), THIEF, `<circle cx="${THIEF[0] + 26}" cy="${THIEF[1] - 21}" r="2.6" fill="#e3a75a" ${Ow(0.8)}/>`)),
      'thief', during(14.3, 16.9))

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c23-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a5aa8"/><stop offset="0.45" stop-color="#c87aa8"/><stop offset="0.8" stop-color="#ffb07a"/><stop offset="1" stop-color="#ffd09a"/></linearGradient>` +
      `<linearGradient id="c23-skymid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a5aa8"/><stop offset="1" stop-color="#7a62ac"/></linearGradient>` +
      `<radialGradient id="c23-glow"><stop offset="0" stop-color="#fff0c0" stop-opacity="0.9"/><stop offset="0.45" stop-color="#ffc48a" stop-opacity="0.35"/><stop offset="1" stop-color="#ffc48a" stop-opacity="0"/></radialGradient>` +
      `<radialGradient id="c23-lamp"><stop offset="0" stop-color="#fff0a0" stop-opacity="0.85"/><stop offset="0.5" stop-color="#ffc46a" stop-opacity="0.3"/><stop offset="1" stop-color="#ffc46a" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c23-hills" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a07aa0"/><stop offset="1" stop-color="#7a6a8a"/></linearGradient>` +
      `<linearGradient id="c23-stone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8d2b4"/><stop offset="0.6" stop-color="#c9ae94"/><stop offset="1" stop-color="#a88e84"/></linearGradient>` +
      `<pattern id="c23-blocks" width="40" height="24" patternUnits="userSpaceOnUse"><path d="M0 0.5h40M0 12.5h40M20 0v12M0 12v12M40 12v12" fill="none" stroke="#8a6a6a" stroke-opacity="0.45" stroke-width="1.4"/></pattern>` +
      `<linearGradient id="c23-roof" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a6ab8"/><stop offset="1" stop-color="#3a4688"/></linearGradient>` +
      `<linearGradient id="c23-moat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a7ab8"/><stop offset="0.6" stop-color="#d88aa0"/><stop offset="1" stop-color="#6a7ab0"/></linearGradient>` +
      `<linearGradient id="c23-grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7aa85a"/><stop offset="1" stop-color="#5a8a4a"/></linearGradient>` +
      `<linearGradient id="c23-path" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c9a86a"/><stop offset="1" stop-color="#e3c98f"/></linearGradient>` +
      `<linearGradient id="c23-planks" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a5a32"/><stop offset="1" stop-color="#c49462"/></linearGradient>` +
      `<pattern id="c23-awning" width="32" height="40" patternUnits="userSpaceOnUse"><rect width="16" height="40" fill="#e63946"/><rect x="16" width="16" height="40" fill="#fff4e8"/></pattern>` +
      `<radialGradient id="c23-dragon" cx="0.62" cy="0.3" r="0.85"><stop offset="0" stop-color="#9af0a8"/><stop offset="0.55" stop-color="#4ab86a"/><stop offset="1" stop-color="#2a8a4a"/></radialGradient>` +
      `<radialGradient id="c23-dusk" cx="0.1" cy="0.65" r="1"><stop offset="0" stop-color="#ffd8a0" stop-opacity="0.28"/><stop offset="0.5" stop-color="#ffd8a0" stop-opacity="0.06"/><stop offset="1" stop-color="#ffd8a0" stop-opacity="0"/></radialGradient></defs>` +
      sky +
      land +
      rightTower +
      rightWall +
      leftWall +
      gatehouse +
      leftTower +
      towerBanner +
      owlLantern +
      owl +
      buntings +
      lanterns +
      dragon +
      parapet(330, 640, WALK) +
      parapet(800, 1080, WALK) +
      wallRaven +
      bucket +
      dandelion +
      fluff +
      smoke +
      coughs +
      fizz +
      lanternGlow +
      sneeze +
      fireworks +
      heart +
      sparkRain +
      moat +
      frogHop +
      bank +
      tufts +
      torch(70, 868) +
      torch(520, 868) +
      torch(900, 860) +
      stall +
      hen(160, 880) +
      hen(252, 888) +
      cat +
      goat +
      thief +
      `<rect width="${W}" height="${H}" fill="url(#c23-dusk)"/>`
    )
  },
})
