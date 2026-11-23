// Cartoon "The balloon goat" (docs/cartoon-mode.md), made like 812: a 20 s story over patchwork fields told by a
// camera. A goat has stowed away in a hot-air balloon's basket. It nibbles through the rope of a sandbag — the bag
// drops, the balloon jumps up — then a second; geese fly past honking and it bleats back; the last bag falls, the
// camera follows it down onto a haystack (poof) where the sheep graze; lightened, the balloon shoots up into a big
// cloud and comes out the other side with the goat chewing a tuft of it like candyfloss. Twelve differences: two hard
// (a buckle on the basket's strap, a fence post), three events of B (a swallow on a rope, a sheep looking up, a kite
// caught on the basket).
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { farBird, grassTuft, groundShadow, INK, keenOwl, NATURE_DEFS, O, Ow } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

/** The balloon: its envelope's centre; the basket hangs below it (rim at BASKET_Y). */
const CX = 720
const CY = 420
const BASKET_Y = 590

/** The balloon's offsets: three jumps as the bags drop, up into the cloud, out of its right side. */
const BAG_DROPS = [3.8, 6.2, 10.2]
const balloonKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, ease: 'inOut' },
  { t: 1.9, y: 4, ease: 'inOut' },
  { t: BAG_DROPS[0], y: 0, ease: 'out' },
  { t: 4.2, y: -50, ease: 'inOut' },
  { t: 5.2, y: -46, ease: 'inOut' },
  { t: BAG_DROPS[1], y: -50, ease: 'out' },
  { t: 6.6, y: -100, ease: 'inOut' },
  { t: 8.4, y: -96, ease: 'inOut' },
  { t: BAG_DROPS[2], y: -100, ease: 'out' },
  { t: 10.6, y: -170, ease: 'inOut' },
  { t: 13.8, y: -170, ease: 'in' },
  // Up into the cloud — and out of its side.
  { t: 15.2, x: 0, y: -300, ease: 'inOut' },
  { t: 16.2, x: 260, y: -280, ease: 'inOut' },
  { t: 18, y: -286, ease: 'inOut' },
  { t: 19.95, y: -280, ease: 'step' },
]

const WIDE = { x: 70, y: 88, w: 1300 }
/** A close shot of the basket for a balloon offset y. */
const basket = (dy: number) => ({ x: 540, y: 470 + dy, w: 360 })
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // The basket: a goat peeking out, nibbling the first rope.
  { t: 1.6, ...basket(0), ease: 'linear' },
  { t: BAG_DROPS[0], ...basket(0), ease: 'out' },
  { t: 4.2, ...basket(-50), ease: 'linear' },
  { t: BAG_DROPS[1], ...basket(-50), ease: 'out' },
  // Higher: the geese fly past honking, a kestrel hovers.
  { t: 6.6, ...basket(-100), ease: 'linear' },
  { t: BAG_DROPS[2] + 0.05, ...basket(-100), ease: 'inOut' },
  // Down with the last bag, onto the haystack among the sheep.
  { t: 11, x: 470, y: 600, w: 480, ease: 'linear' },
  { t: 13.8, x: 474, y: 600, w: 480, ease: 'step' },
  // Lightened, the balloon shoots up into the cloud...
  { t: 13.85, x: 420, y: 20, w: 600, ease: 'linear' },
  { t: 16.2, x: 440, y: 20, w: 600, ease: 'step' },
  // ...and comes out with the goat chewing a tuft of it.
  { t: 16.25, x: 780, y: 185, w: 400, ease: 'linear' },
  { t: 19.95, x: 784, y: 185, w: 400, ease: 'step' },
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

/** The haystack the last bag lands on; where the bag ends up on it. */
const HAY: [number, number] = [676, 838]
const BAG_ON_HAY: [number, number] = [676, 790]

export default svgLevel({
  id: 826,
  chapter: 'cartoon',
  title: 'cartoonBalloonGoat',
  parTimeSec: 120,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const blink = (period: number, phase = 0) => (m: string) => anim({ type: 'blink', duty: 0.07, period, phase }, m)
    const flap = (pivot: [number, number], period: number, phase = 0) => (m: string) =>
      anim({ type: 'keys', period, phase, keys: [{ t: 0, sy: 1 }, { t: period / 2, sy: -0.5, ease: 'inOut' }], pivot }, m)

    // --- Sky: the sun, drifting clouds, a far flock. ---
    const cloud = (x: number, y: number, s: number) =>
      `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff"><ellipse cx="0" cy="8" rx="56" ry="18"/><circle cx="-26" cy="0" r="20"/><circle cx="2" cy="-12" r="26"/><circle cx="28" cy="0" r="18"/>` +
      `<ellipse cx="0" cy="18" rx="48" ry="6" fill="#dbe9f6"/></g>`
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c26-sky)"/>` +
      `<circle cx="200" cy="130" r="190" fill="url(#c26-glow)"/>` +
      `<circle cx="200" cy="130" r="44" fill="#ffd56a" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="186" cy="122" rx="4.5" ry="7" fill="${INK}"/><ellipse cx="214" cy="122" rx="4.5" ry="7" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.3, phase: 0.2 }, `<rect x="176" y="114" width="48" height="18" fill="#ffd56a"/><path d="M178 123h12M208 123h12" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<path d="M182 144q18 14 36 0" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>` +
      anim({ type: 'path', points: [[0, 0], [120, 0]], period: 34 }, cloud(400, 300, 0.9)) +
      anim({ type: 'path', points: [[0, 0], [-140, 0]], period: 30 }, cloud(1180, 220, 1.1)) +
      anim({ type: 'path', points: [[0, 0], [90, 0]], period: 26 }, cloud(980, 400, 0.6)) +
      keys(undefined, [{ t: 0, x: 0, y: 0 }, { t: 19.9, x: -1600, y: 30 }], [1500, 360],
        ([[1500, 360], [1520, 350], [1522, 372]] as [number, number][]).map(([fx, fy], i) => farBird(fx, fy, flap([fx, fy - 2], 0.5, i * 0.2))).join(''))

    // --- The land far below: patchwork fields with hedgerows, a river with a stone bridge, a village with a church
    // spire, copses, sheep and cows like dots. ---
    const FIELD_COLORS = ['#a9cf5e', '#8fbf4a', '#d9c15a', '#c9a64a', '#7fb04a', '#b9d870', '#a07a4a', '#e2cf7a']
    let fields = ''
    let hedges = ''
    const rows = [470, 505, 548, 600, 664, 760]
    for (let r = 0; r < rows.length - 1; r++) {
      const y0 = rows[r]
      const y1 = rows[r + 1]
      let x = -40
      let i = 0
      while (x < W + 40) {
        const w = Math.round(110 + rand() * 170 + r * 40)
        const skew = Math.round((rand() - 0.5) * 40)
        const c = FIELD_COLORS[(r * 3 + i) % FIELD_COLORS.length]
        fields += `<path d="M${x} ${y0}h${w}l${skew} ${y1 - y0}h-${w}z" fill="${c}"/>`
        // Plough furrows on the brown ones, crop rows on the yellow ones.
        if (c === '#a07a4a' || c === '#d9c15a') {
          for (let f = 1; f < 5; f++) fields += `<path d="M${x + (w * f) / 5} ${y0}l${skew} ${y1 - y0}" stroke="#000" stroke-opacity="0.12" stroke-width="2"/>`
        }
        // A hedge along its left side.
        for (let h = 0; h < 4; h++) {
          const t = (h + 0.5) / 4
          hedges += `<circle cx="${Math.round(x + skew * t)}" cy="${Math.round(y0 + (y1 - y0) * t)}" r="${4 + r}" fill="#3f7d34"/>`
        }
        x += w
        i++
      }
      for (let hx = 0; hx < W; hx += 18 + r * 4) hedges += `<circle cx="${hx}" cy="${y1}" r="${3 + r}" fill="#4a8a3a"/>`
    }
    let copses = ''
    for (let i = 0; i < 16; i++) {
      const tx = Math.round(rand() * W)
      const ty = Math.round(490 + rand() * 230)
      const s = 0.4 + (ty - 470) / 380
      copses += `<circle cx="${tx}" cy="${ty}" r="${Math.round(9 * s)}" fill="#2f6a34"/><circle cx="${tx + Math.round(8 * s)}" cy="${ty - Math.round(4 * s)}" r="${Math.round(8 * s)}" fill="#3f8a3a"/>`
    }
    let dots = ''
    for (let i = 0; i < 18; i++) {
      const dx = Math.round(rand() * W)
      const dy = Math.round(520 + rand() * 180)
      dots += i % 3 ? `<ellipse cx="${dx}" cy="${dy}" rx="3.2" ry="2.2" fill="#fff"/>` : `<ellipse cx="${dx}" cy="${dy}" rx="3.6" ry="2.4" fill="#fff"/><circle cx="${dx + 1}" cy="${dy}" r="1.2" fill="${INK}"/>`
    }
    const river =
      `<path d="M-10 640q200-30 380-10t420-40t360 0t300-40" fill="none" stroke="#3a86b8" stroke-width="22"/><path d="M-10 640q200-30 380-10t420-40t360 0t300-40" fill="none" stroke="#8fd0ee" stroke-width="14"/>` +
      `<path d="M1030 572q16-20 32 0" fill="none" stroke="#9a8f7a" stroke-width="12"/><path d="M1026 572h40" stroke="#b9ae96" stroke-width="5"/>`
    const village =
      [[1140, 520, '#e8d7b0', '#b84a3a'], [1180, 516, '#f0e4c4', '#9a3a2a'], [1250, 524, '#e8d7b0', '#b84a3a'], [1290, 518, '#f2e8cc', '#c05a3a']]
        .map(([x, y, wall, roof]) => `<rect x="${x}" y="${y}" width="22" height="14" fill="${wall}"/><path d="M${(x as number) - 2} ${y}l13-10l13 10z" fill="${roof}"/>`)
        .join('') +
      `<rect x="1210" y="496" width="16" height="38" fill="#e8dcc0"/><path d="M1206 496l12-36l12 36z" fill="#7a8696"/><path d="M1218 460v-8M1214 454h8" stroke="${INK}" stroke-width="1.4"/>`
    const land = `<rect y="470" width="${W}" height="${H - 470}" fill="#9ccf5a"/>` + fields + river + hedges + copses + village + dots + `<rect y="462" width="${W}" height="40" fill="url(#c26-haze)"/>`

    // --- The near field the last bag falls into: the fence (a post fewer in B: a hard one), the haystack, sheep (a
    // lamb in A only; in B one looks up at the balloon), a rabbit (A only), the tractor (its headlight in A only), the
    // trough (a bucket by it in A only). ---
    const near = `<path d="M0 762q360-20 720-6t720-6V${H}H0z" fill="url(#c26-meadow)"/>`
    let tufts = ''
    for (let i = 0; i < 26; i++) {
      const tx = Math.round(rand() * W)
      const ty = Math.round(780 + rand() * 115)
      tufts += anim({ type: 'sway', angle: 7, pivot: [tx, ty], period: 2.4, phase: (tx % 13) / 13 }, grassTuft(tx, ty))
    }
    let flowers = ''
    for (let i = 0; i < 22; i++) {
      const fx = Math.round(rand() * W)
      const fy = Math.round(790 + rand() * 105)
      if (fx > 470 && fx < 950) continue
      flowers += `<circle cx="${fx}" cy="${fy}" r="3.4" fill="${['#fff', '#ffd23f', '#ff8fb0'][i % 3]}"/><circle cx="${fx}" cy="${fy}" r="1.3" fill="#f2a93b"/>`
    }
    let fence = `<path d="M470 768h480M470 786h480" stroke="${INK}" stroke-width="6"/><path d="M470 768h480M470 786h480" stroke="#b08a5a" stroke-width="3"/>`
    for (let x = 480; x <= 944; x += 32) {
      const post = `<rect x="${x - 4}" y="756" width="8" height="44" rx="2" fill="#9a6e44" ${Ow(1.4)}/>`
      fence += x === 608 ? diff(608, 778, 25, post, '') : post
    }
    const [hx, hy] = HAY
    let straw = ''
    for (let i = 0; i < 14; i++) {
      const sx = Math.round(hx - 46 + rand() * 92)
      const sy = Math.round(hy - 40 + rand() * 50)
      straw += `<path d="M${sx} ${sy}l${Math.round(rand() * 10 - 5)} 8" stroke="#a8823a" stroke-width="1.6"/>`
    }
    const haystack =
      groundShadow(hx, hy + 40, 70, 8) +
      `<path d="M${hx - 56} ${hy + 40}q-4-70 56-86q60 16 56 86z" fill="url(#c26-hay)" ${O}/>` + straw +
      `<path d="M${hx - 52} ${hy + 20}q52 14 104 0" fill="none" stroke="#a8823a" stroke-width="2"/>`
    const sheepBody = (x: number, y: number) =>
      groundShadow(x, y + 2, 24, 4) +
      `<path d="M${x - 12} ${y}v-10M${x + 10} ${y}v-10M${x - 4} ${y + 1}v-10M${x + 16} ${y}v-9" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>` +
      [[-10, -18], [0, -22], [10, -18], [-4, -12], [8, -12], [16, -14]].map(([ox, oy]) => `<circle cx="${x + ox}" cy="${y + oy}" r="9" fill="#fbf8f0" ${Ow(1.4)}/>`).join('') +
      `<circle cx="${x + 2}" cy="${y - 16}" r="12" fill="#fbf8f0"/>`
    const headDown = (x: number, y: number) =>
      `<ellipse cx="${x - 22}" cy="${y - 8}" rx="8" ry="6" transform="rotate(30 ${x - 22} ${y - 8})" fill="#3a3a44" ${Ow(1.2)}/><circle cx="${x - 24}" cy="${y - 9}" r="1.2" fill="#fff"/><path d="M${x - 18} ${y - 14}l4-4" stroke="#3a3a44" stroke-width="3" stroke-linecap="round"/>`
    const headUp = (x: number, y: number) =>
      `<ellipse cx="${x - 20}" cy="${y - 30}" rx="7" ry="9" transform="rotate(-20 ${x - 20} ${y - 30})" fill="#3a3a44" ${Ow(1.2)}/><circle cx="${x - 19}" cy="${y - 35}" r="2.2" fill="#fff"/><circle cx="${x - 18.6}" cy="${y - 35.6}" r="1" fill="${INK}"/>` +
      `<path d="M${x - 14} ${y - 36}l7-3M${x - 26} ${y - 36}l-6-4" stroke="#3a3a44" stroke-width="3" stroke-linecap="round"/>`
    const grazing = (x: number, y: number) => sheepBody(x, y) + anim({ type: 'keys', period: 1.6, keys: [{ t: 0, rot: 0 }, { t: 0.8, rot: 6, ease: 'inOut' }], pivot: [x - 14, y - 12] }, headDown(x, y))
    const S2: [number, number] = [792, 870]
    const sheep =
      grazing(540, 862) + grazing(890, 864) +
      sheepBody(...S2) +
      // In B this one looks up at the balloon as the bag lands.
      diff(S2[0] - 20, S2[1] - 20, 26, headDown(...S2),
        once(showIn([0, 11.4], [13.6, LOOP]), S2, headDown(...S2)) + once(showIn([11.4, 13.6]), S2, headUp(...S2)),
        undefined, during(11.4, 13.6)) +
      diff(578, 878, 20,
        groundShadow(578, 886, 14, 3) + `<path d="M572 886v-7M584 886v-7" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>` +
          [[-6, -10], [2, -12], [8, -9]].map(([ox, oy]) => `<circle cx="${578 + ox}" cy="${878 + oy}" r="6" fill="#fbf8f0" ${Ow(1.2)}/>`).join('') +
          `<ellipse cx="566" cy="870" rx="5" ry="4.2" fill="#3a3a44"/><circle cx="565" cy="869" r="1" fill="#fff"/>`,
        '')
    const rabbit = diff(762, 786, 20,
      `<ellipse cx="764" cy="796" rx="10" ry="8" fill="#b8a48a" ${Ow(1.3)}/><circle cx="755" cy="786" r="6.5" fill="#b8a48a" ${Ow(1.3)}/>` +
        `<path d="M753 781q-3-12 0-14q3 2 3 14M757 781q1-12 4-13q2 3-1 13" fill="#b8a48a" ${Ow(1.1)}/><circle cx="752" cy="785" r="1.2" fill="${INK}"/><circle cx="774" cy="794" r="3" fill="#fff"/>`,
      '')
    const tractor =
      groundShadow(902, 808, 40, 5) +
      `<rect x="878" y="778" width="38" height="18" rx="3" fill="#d84a3a" ${Ow(1.6)}/><rect x="902" y="760" width="22" height="20" fill="#d84a3a" ${Ow(1.6)}/><rect x="906" y="764" width="14" height="10" fill="#bfe3f2"/>` +
      `<path d="M886 778v-14" stroke="${INK}" stroke-width="3"/><circle cx="886" cy="762" r="2.4" fill="#555"/>` +
      `<circle cx="914" cy="800" r="13" fill="#3a3a44" ${Ow(1.6)}/><circle cx="914" cy="800" r="5" fill="#ffd23f"/><circle cx="884" cy="802" r="8" fill="#3a3a44" ${Ow(1.4)}/><circle cx="884" cy="802" r="3" fill="#ffd23f"/>` +
      diff(876, 786, 18, `<circle cx="876" cy="786" r="5" fill="#fff4b0" ${Ow(1.3)}/>`, '')
    const trough =
      `<path d="M836 864h40l-4 14h-32z" fill="#8a9aaa" ${Ow(1.6)}/><path d="M838 866h36" stroke="#8fd0ee" stroke-width="3"/>` +
      diff(904, 878, 20, `<path d="M896 872h16l-2 14h-12z" fill="#7a8a9a" ${Ow(1.4)}/><path d="M896 872q8-10 16 0" fill="none" stroke="${INK}" stroke-width="1.4"/>`, '')
    // The last bag, landed on the haystack; straw flying, a starburst.
    const bagShape = (x: number, y: number) =>
      `<ellipse cx="${x}" cy="${y}" rx="11" ry="13" fill="url(#c26-sack)" ${Ow(1.6)}/><path d="M${x - 5} ${y - 12}q5 4 10 0" fill="none" stroke="${INK}" stroke-width="1.4"/><path d="M${x - 6} ${y - 2}h12M${x - 5} ${y + 5}h10" stroke="#8a6a3e" stroke-width="1.2"/>`
    const landedBag = once(showIn([11.2, LOOP]), BAG_ON_HAY, `<g transform="rotate(-24 ${BAG_ON_HAY[0]} ${BAG_ON_HAY[1]})">${bagShape(...BAG_ON_HAY)}</g>`)
    let poof = ''
    for (let i = 0; i < 14; i++) {
      const dxu = Math.round((i - 6.5) * 14)
      const up = Math.round(40 + (i % 4) * 22)
      poof += once([{ t: 0, x: 0, y: 0, rot: 0, o: 0, ease: 'step' }, { t: 11.2, o: 1, ease: 'out' }, { t: 11.55, x: dxu, y: -up, rot: 180, ease: 'in' }, { t: 12.2, x: dxu * 1.3, y: 20, rot: 360, o: 1, ease: 'step' }, { t: 12.25, o: 0, ease: 'step' }],
        BAG_ON_HAY, `<path d="M${BAG_ON_HAY[0] - 5} ${BAG_ON_HAY[1]}h10" stroke="#d9b24a" stroke-width="2.6" stroke-linecap="round"/>`)
    }
    poof += once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t: 11.2, o: 1, ease: 'out' }, { t: 11.35, sx: 1.15, sy: 1.15, ease: 'inOut' }, { t: 11.55, sx: 1, sy: 1, o: 1, ease: 'step' }, { t: 11.6, o: 0, ease: 'step' }], BAG_ON_HAY,
      `<path d="M676 744l9 20l21-9l-9 20l22 8l-22 8l9 20l-21-9l-9 20l-9-20l-21 9l9-20l-22-8l22-8l-9-20l21 9z" fill="#ffe066" ${Ow(1.8)}/>`)

    // --- The balloon (everything on it moves with it: id 'balloon'). ---
    const env = `M${CX} ${CY - 112}c70 0 116 44 116 104c0 56-44 96-78 128h-76c-34-32-78-72-78-128c0-60 46-104 116-104z`
    let gores = ''
    const GORE = ['#e8452c', '#ffd23f', '#e8452c', '#3a9ad9', '#ffd23f', '#e8452c', '#3a9ad9', '#ffd23f']
    for (let i = 0; i < 8; i++) gores += `<rect x="${CX - 120 + i * 30}" y="${CY - 120}" width="30" height="260" fill="${GORE[i]}"/>`
    const patch = (c: string) =>
      `<path d="M${CX + 44} ${CY + 80}l-11-11a6.5 6.5 0 0 1 11-7a6.5 6.5 0 0 1 11 7z" fill="${c}" ${Ow(1.4)}/><path d="M${CX + 35} ${CY + 66}l3 2M${CX + 51} ${CY + 66}l-3 2" stroke="#fff" stroke-width="1.2" stroke-dasharray="2 2"/>`
    const envelope =
      `<clipPath id="c26-env"><path d="${env}"/></clipPath>` +
      `<g clip-path="url(#c26-env)">${gores}<rect x="${CX - 120}" y="${CY - 120}" width="240" height="260" fill="url(#c26-shine)"/></g>` +
      `<path d="${env}" fill="none" ${Ow(2.6)}/>` +
      [-90, -60, -30, 0, 30, 60, 90].map((dx) => `<path d="M${CX + dx * 0.4} ${CY - 112}q${dx} 60 ${dx * 0.45} 216" fill="none" stroke="${INK}" stroke-opacity="0.35" stroke-width="1.4"/>`).join('') +
      // A patch sewn on (red in A, blue in B: the only recolour).
      diff(CX + 44, CY + 72, 20, patch('#e2508a'), patch('#3a76d0'), 'balloon') +
      `<path d="M${CX - 38} ${CY + 128}h76v8h-76z" fill="#b07a44" ${Ow(1.6)}/>`
    const lines = `<path d="M${CX - 38} ${CY + 134}L${CX - 45} ${BASKET_Y}M${CX + 38} ${CY + 134}L${CX + 45} ${BASKET_Y}M${CX - 14} ${CY + 136}L${CX - 18} ${BASKET_Y}M${CX + 14} ${CY + 136}L${CX + 18} ${BASKET_Y}" stroke="${INK}" stroke-width="1.6"/>`
    const burner =
      `<rect x="${CX - 10}" y="${BASKET_Y - 22}" width="20" height="10" rx="2" fill="#8a93a0" ${Ow(1.4)}/>` +
      anim({ type: 'keys', period: 0.4, keys: [{ t: 0, sy: 1, sx: 1 }, { t: 0.2, sy: 1.25, sx: 0.85, ease: 'inOut' }], pivot: [CX, BASKET_Y - 22] },
        `<path d="M${CX} ${BASKET_Y - 46}q10 12 6 22h-12q-4-10 6-22z" fill="#ffb347" ${Ow(1.2)}/><path d="M${CX} ${BASKET_Y - 38}q5 7 2 14h-4q-3-7 2-14z" fill="#fff4b0"/>`)
    const BX0 = CX - 45
    const BW = 90
    let weave = ''
    for (let y = BASKET_Y + 10; y < BASKET_Y + 50; y += 8) weave += `<path d="M${BX0 + 2} ${y}h${BW - 4}" stroke="#8a5a2a" stroke-opacity="0.45" stroke-width="1.4"/>`
    for (let x = BX0 + 8; x < BX0 + BW; x += 10) weave += `<path d="M${x} ${BASKET_Y + 6}v42" stroke="#8a5a2a" stroke-opacity="0.3" stroke-width="1.2"/>`
    const basketFront =
      `<path d="M${BX0} ${BASKET_Y}h${BW}l-4 50h-${BW - 8}z" fill="url(#c26-wicker)" ${O}/>` + weave +
      `<rect x="${BX0 - 3}" y="${BASKET_Y - 4}" width="${BW + 6}" height="8" rx="3" fill="#b07a44" ${Ow(1.8)}/>` +
      // A leather strap round the basket, its buckle (A only: a hard one).
      `<path d="M${BX0 + 2} ${BASKET_Y + 16}h${BW - 4}" stroke="${INK}" stroke-width="5"/><path d="M${BX0 + 2} ${BASKET_Y + 16}h${BW - 4}" stroke="#7a4a22" stroke-width="3"/>` +
      diff(CX + 14, BASKET_Y + 16, 18, `<rect x="${CX + 9}" y="${BASKET_Y + 11}" width="10" height="10" rx="1.5" fill="none" stroke="#e8c04a" stroke-width="2.4"/>`, '', 'balloon') +
      // A spyglass hung on the basket (A only).
      diff(CX - 24, BASKET_Y + 32, 20,
        `<path d="M${CX - 34} ${BASKET_Y + 26}l20 10" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M${CX - 34} ${BASKET_Y + 26}l20 10" stroke="#c49a4a" stroke-width="4.4" stroke-linecap="round"/><circle cx="${CX - 34}" cy="${BASKET_Y + 26}" r="3.4" fill="#8fd0ee" ${Ow(1)}/>`,
        '', 'balloon') +
      // A pennant on the basket's side (A only).
      diff(CX + 58, BASKET_Y + 20, 20, `<path d="M${CX + 46} ${BASKET_Y + 4}v30" stroke="${INK}" stroke-width="2"/><path d="M${CX + 47} ${BASKET_Y + 6}l20 7l-20 7z" fill="#52b788" ${Ow(1.2)}/>`, '', 'balloon')
    // The sandbags: each on its rope over the rim; the goat nibbles through them one by one and down they drop.
    const sandbag = (x: number, len: number, drop: number, fallX: number, fallY: number, landAt: number) =>
      once(
        [{ t: 0, x: 0, y: 0, rot: 0, o: 1 }, { t: drop, ease: 'in' }, { t: landAt, x: fallX, y: fallY, rot: 30, o: 1, ease: 'step' }, { t: landAt + 0.02, o: 0, ease: 'step' }],
        [x, BASKET_Y + len],
        `<path d="M${x} ${BASKET_Y - 2}v${len - 10}" stroke="${INK}" stroke-width="2.6"/><path d="M${x} ${BASKET_Y - 2}v${len - 10}" stroke="#d9c08a" stroke-width="1.4"/>` + bagShape(x, BASKET_Y + len),
      )
    const bags =
      sandbag(CX - 30, 78, BAG_DROPS[0], -40, 260, 4.9) +
      sandbag(CX + 30, 78, BAG_DROPS[1], 40, 320, 7.3) +
      sandbag(CX, 88, BAG_DROPS[2], BAG_ON_HAY[0] - CX, BAG_ON_HAY[1] - (BASKET_Y + 88) + 170, 11.2)

    // The goat: head and hooves over the rim; it leans to each rope and chews; bleats at the geese; chews cloud.
    const GX = CX - 4
    const GY = BASKET_Y - 4
    const goatKeys: Keyframe[] = [
      { t: 0, x: 0, y: 0, rot: 0 },
      { t: 2.4, ease: 'inOut' },
      { t: 2.8, x: -24, y: 22, rot: -18, ease: 'inOut' },
      { t: BAG_DROPS[0], ease: 'inOut' },
      { t: 4.1, x: 0, y: 0, rot: 0, ease: 'inOut' },
      { t: 5.1, ease: 'inOut' },
      { t: 5.5, x: 32, y: 22, rot: 18, ease: 'inOut' },
      { t: BAG_DROPS[1], ease: 'inOut' },
      { t: 6.5, x: 0, y: 0, rot: 0, ease: 'inOut' },
      // Bleating back at the honking geese.
      { t: 7.5, ease: 'inOut' },
      { t: 7.7, y: -6, rot: -12, ease: 'inOut' },
      { t: 8.3, y: 0, rot: 0, ease: 'inOut' },
      { t: 9.1, ease: 'inOut' },
      { t: 9.4, x: 2, y: 28, rot: 0, ease: 'inOut' },
      { t: BAG_DROPS[2], ease: 'inOut' },
      { t: 10.5, x: 0, y: 0, ease: 'inOut' },
      { t: 19.95, ease: 'step' },
    ]
    const chewing = (from: number, to: number) => [from, to] as [number, number]
    const goatHead =
      `<path d="M${GX - 12} ${GY - 34}q-14-10-12-24q6 10 16 16M${GX + 12} ${GY - 34}q14-10 12-24q-6 10-16 16" fill="#c9b48a" ${Ow(1.6)}/>` +
      `<ellipse cx="${GX - 20}" cy="${GY - 26}" rx="10" ry="5" transform="rotate(-20 ${GX - 20} ${GY - 26})" fill="#f2ede0" ${Ow(1.4)}/><ellipse cx="${GX + 20}" cy="${GY - 26}" rx="10" ry="5" transform="rotate(20 ${GX + 20} ${GY - 26})" fill="#f2ede0" ${Ow(1.4)}/>` +
      `<ellipse cx="${GX}" cy="${GY - 20}" rx="16" ry="20" fill="url(#c26-goat)" ${Ow(1.8)}/>` +
      `<ellipse cx="${GX}" cy="${GY - 6}" rx="10" ry="8" fill="#e6ddd0" ${Ow(1.4)}/><ellipse cx="${GX - 3}" cy="${GY - 9}" rx="1.6" ry="1.2" fill="${INK}"/><ellipse cx="${GX + 3}" cy="${GY - 9}" rx="1.6" ry="1.2" fill="${INK}"/>` +
      `<path d="M${GX - 4} ${GY + 2}q4 12 8 0" fill="#d8d0c0" ${Ow(1.2)}/>` +
      // Eyes: sly, wide at the geese, blissful with the cloud.
      once(showIn([0, 7.5], [8.3, 16.2]), [GX, GY], `<circle cx="${GX - 7}" cy="${GY - 24}" r="3" fill="#fff" ${Ow(1)}/><circle cx="${GX + 7}" cy="${GY - 24}" r="3" fill="#fff" ${Ow(1)}/><path d="M${GX - 9} ${GY - 24}h4M${GX + 5} ${GY - 24}h4" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`) +
      once(showIn([7.5, 8.3]), [GX, GY], `<circle cx="${GX - 7}" cy="${GY - 25}" r="4" fill="#fff" ${Ow(1)}/><circle cx="${GX + 7}" cy="${GY - 25}" r="4" fill="#fff" ${Ow(1)}/><circle cx="${GX - 7}" cy="${GY - 25}" r="1.6" fill="${INK}"/><circle cx="${GX + 7}" cy="${GY - 25}" r="1.6" fill="${INK}"/>`) +
      once(showIn([16.2, LOOP]), [GX, GY], `<path d="M${GX - 10} ${GY - 24}q3-3 6 0M${GX + 4} ${GY - 24}q3-3 6 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`) +
      // Mouth: chewing the ropes (and the cloud), open for a bleat.
      once(showIn(chewing(2.8, BAG_DROPS[0]), chewing(5.5, BAG_DROPS[1]), chewing(9.4, BAG_DROPS[2]), [16.2, LOOP]), [GX, GY],
        anim({ type: 'keys', period: 0.24, keys: [{ t: 0, sy: 1 }, { t: 0.12, sy: 0.4, ease: 'inOut' }], pivot: [GX, GY - 1] }, `<ellipse cx="${GX}" cy="${GY - 1}" rx="5" ry="2.6" fill="#7a2a2a"/>`)) +
      once(showIn([7.7, 8.3]), [GX, GY], `<ellipse cx="${GX}" cy="${GY}" rx="5" ry="5" fill="#7a2a2a" ${Ow(1.2)}/>`) +
      // A tuft of cloud in its mouth, like candyfloss.
      once(showIn([16.2, LOOP]), [GX, GY], `<g fill="#fff" ${Ow(1.2)}><circle cx="${GX - 8}" cy="${GY + 2}" r="7"/><circle cx="${GX + 2}" cy="${GY + 4}" r="8"/><circle cx="${GX + 11}" cy="${GY}" r="6"/></g>`)
    const goatBody = `<ellipse cx="${GX}" cy="${GY + 10}" rx="20" ry="14" fill="url(#c26-goat)" ${Ow(1.6)}/>`
    // The head leans out over the rim to the ropes, so it is drawn over the basket's front.
    const goat =
      keys(undefined, goatKeys, [GX, GY + 8], goatHead) +
      `<path d="M${GX - 16} ${BASKET_Y + 2}v-8M${GX + 14} ${BASKET_Y + 2}v-8" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M${GX - 16} ${BASKET_Y + 2}v-8M${GX + 14} ${BASKET_Y + 2}v-8" stroke="#e6ddd0" stroke-width="4.4" stroke-linecap="round"/>`
    // "Baa!" rings while it bleats.
    const bleat = once(showIn([7.7, 8.3]), [GX - 26, GY - 20],
      anim({ type: 'keys', period: 0.3, keys: [{ t: 0, sx: 0.6, sy: 0.6, o: 1 }, { t: 0.3, sx: 1.4, sy: 1.4, o: 0 }], pivot: [GX - 26, GY - 20] },
        `<path d="M${GX - 30} ${GY - 30}q-8 10 0 20M${GX - 38} ${GY - 36}q-12 16 0 32" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`))
    // In B a swallow perches on the left line while the balloon climbs.
    const swallow = diff(CX - 66, BASKET_Y - 22, 20, '',
      once([{ t: 0, y: -8, sx: 0.5, sy: 0.5, o: 0, ease: 'step' }, { t: 4.6, o: 1, ease: 'out' }, { t: 4.85, y: 0, sx: 1, sy: 1, ease: 'step' }, { t: 6.3, ease: 'in' }, { t: 6.55, y: -8, sx: 0.5, sy: 0.5, o: 1, ease: 'step' }, { t: 6.6, o: 0, ease: 'step' }], [CX - 66, BASKET_Y - 22],
        `<path d="M${CX - 58} ${BASKET_Y - 24}l12 2l-8 4z" fill="#2b3a5a" ${Ow(1)}/><ellipse cx="${CX - 66}" cy="${BASKET_Y - 24}" rx="9" ry="5.5" fill="#2b3a5a" ${Ow(1.2)}/><ellipse cx="${CX - 68}" cy="${BASKET_Y - 21}" rx="5" ry="3" fill="#f4efe6"/>` +
          `<circle cx="${CX - 74}" cy="${BASKET_Y - 28}" r="4.6" fill="#2b3a5a" ${Ow(1.1)}/><circle cx="${CX - 76}" cy="${BASKET_Y - 26}" r="1.8" fill="#d9442e"/><path d="M${CX - 78} ${BASKET_Y - 29}l-4 1" stroke="${INK}" stroke-width="1.4"/>`),
      'balloon', during(4.6, 6.6))
    // In B a kite caught on the basket comes up out of the cloud with it.
    const KITE: [number, number] = [CX + 66, BASKET_Y + 70]
    const kite = diff(KITE[0] - 6, KITE[1] + 6, 35, '',
      once(showIn([15.6, 19.6]), KITE,
        `<path d="M${BX0 + BW - 4} ${BASKET_Y + 48}q20 4 ${KITE[0] - (BX0 + BW - 4)} ${KITE[1] - 18 - (BASKET_Y + 48)}" fill="none" stroke="${INK}" stroke-width="1.2"/>` +
          anim({ type: 'keys', period: 1.4, keys: [{ t: 0, rot: -10 }, { t: 0.7, rot: 10, ease: 'inOut' }], pivot: [KITE[0], KITE[1] - 18] },
            `<path d="M${KITE[0]} ${KITE[1] - 18}l12 14l-12 18l-12-18z" fill="#ff7b3a" ${Ow(1.4)}/><path d="M${KITE[0]} ${KITE[1] - 18}v32M${KITE[0] - 12} ${KITE[1] - 4}h24" stroke="#fff" stroke-width="1.2"/>` +
              `<path d="M${KITE[0]} ${KITE[1] + 14}q-6 6 0 10q6 4 0 8" fill="none" stroke="${INK}" stroke-width="1.2"/><path d="M${KITE[0] - 4} ${KITE[1] + 20}l8 4M${KITE[0] - 4} ${KITE[1] + 24}l8-4" stroke="#3a76d0" stroke-width="2.4"/>`)),
      'balloon', during(15.6, 19.6))
    const balloon = keys('balloon', balloonKeys, [CX, BASKET_Y],
      envelope + lines + burner + goatBody + bags + basketFront + goat +
        // The game's owl rides on the basket's rim.
        anim({ type: 'sway', angle: 6, pivot: [CX + 40, BASKET_Y - 3], period: 3.4 }, keenOwl(CX + 40, BASKET_Y - 3, 0.62, blink(3.1, 0.3))) +
        bleat + swallow + kite)

    // --- The geese flying past in a V, honking; a kestrel hovering. ---
    const goose = (x: number, y: number, honk: boolean) =>
      flap([x + 4, y - 2], 0.42, (x % 7) / 7)(`<path d="M${x + 4} ${y - 2}q8-20 26-22q-6 16-22 26z" fill="#8a8478" ${Ow(1.3)}/>`) +
      `<ellipse cx="${x + 8}" cy="${y}" rx="16" ry="6" fill="#a8a294" ${Ow(1.4)}/><path d="M${x + 22} ${y - 1}l8-3v6z" fill="#5a5a5a" ${Ow(1)}/>` +
      `<path d="M${x - 6} ${y - 2}q-12-4-18-2" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${x - 6} ${y - 2}q-12-4-18-2" fill="none" stroke="#2b2b2b" stroke-width="3" stroke-linecap="round"/>` +
      `<circle cx="${x - 26}" cy="${y - 3}" r="4.6" fill="#2b2b2b" ${Ow(1.2)}/><path d="M${x - 24} ${y}q3-1 4 1" fill="none" stroke="#fff" stroke-width="1.6"/>` +
      (honk
        ? `<path d="M${x - 30} ${y - 4}l-7-3l2 4zM${x - 30} ${y - 2}l-7 3l2-4z" fill="#f2a93b" ${Ow(0.8)}/>`
        : `<path d="M${x - 30} ${y - 3}l-7 1l7 2z" fill="#f2a93b" ${Ow(0.8)}/>`)
    const V: [number, number, boolean][] = [[0, 0, true], [34, -16, false], [34, 16, true], [68, -32, false], [68, 32, false]]
    const geese = once(
      [{ t: 0, x: 560, y: 0, o: 0, ease: 'step' }, { t: 6.5, o: 1, ease: 'linear' }, { t: 9.6, x: -520, y: 0, o: 1, ease: 'step' }, { t: 9.65, o: 0, ease: 'step' }],
      [720, 405],
      V.map(([dx, dy, honk]) => goose(720 + dx, 405 + dy, honk)).join('') +
        once(showIn([7.2, 8]), [690, 399], `<path d="M684 393q-8-4-14 0M684 401q-10 2-16 8" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>`),
    )
    const kestrel = anim({ type: 'keys', period: 1.6, keys: [{ t: 0, y: 0 }, { t: 0.8, y: -6, ease: 'inOut' }], pivot: [866, 500] },
      flap([866, 498], 0.18)(`<path d="M856 498q-12-14-30-12q12 10 24 18zM876 498q12-14 30-12q-12 10-24 18z" fill="#b8743a" ${Ow(1.2)}/>`) +
        `<ellipse cx="866" cy="502" rx="8" ry="12" fill="#c8844a" ${Ow(1.3)}/><path d="M860 512l6 12l6-12z" fill="#9a6a3a" ${Ow(1)}/>` +
        `<circle cx="866" cy="490" r="6" fill="#c8844a" ${Ow(1.2)}/><circle cx="864" cy="489" r="1.4" fill="${INK}"/><path d="M866 493l-2 4l3-1z" fill="#f2c94a"/>`)

    // --- The big cloud the balloon shoots up into; a bite out of it once the goat comes out the other side. ---
    const bigCloud = (bitten: boolean) =>
      `<g fill="#fff" stroke="#dbe9f6" stroke-width="3">` +
      `<ellipse cx="720" cy="170" rx="190" ry="42"/><circle cx="600" cy="150" r="60"/><circle cx="690" cy="110" r="78"/><circle cx="790" cy="120" r="70"/>` +
      (bitten ? `<circle cx="860" cy="168" r="30"/>` : `<circle cx="868" cy="150" r="56"/>`) +
      `</g><ellipse cx="720" cy="196" rx="170" ry="12" fill="#dbe9f6"/>`
    const cloudGag = once(showIn([0, 16.2]), [720, 150], bigCloud(false)) + once(showIn([16.2, LOOP]), [720, 150], bigCloud(true))

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c26-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fb0ea"/><stop offset="0.75" stop-color="#bfe2f5"/><stop offset="1" stop-color="#e8f4ee"/></linearGradient>` +
      `<radialGradient id="c26-glow"><stop offset="0" stop-color="#fff4cc" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffe9a8" stop-opacity="0.4"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c26-haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8f4ee" stop-opacity="0.9"/><stop offset="1" stop-color="#e8f4ee" stop-opacity="0"/></linearGradient>` +
      `<linearGradient id="c26-meadow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fca5a"/><stop offset="1" stop-color="#6aa83f"/></linearGradient>` +
      `<radialGradient id="c26-hay" cx="0.62" cy="0.25" r="0.85"><stop offset="0" stop-color="#f6dc84"/><stop offset="0.6" stop-color="#ddb251"/><stop offset="1" stop-color="#b88a30"/></radialGradient>` +
      `<radialGradient id="c26-sack" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#e8d3a8"/><stop offset="1" stop-color="#b89a62"/></radialGradient>` +
      `<linearGradient id="c26-wicker" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b07a44"/><stop offset="0.6" stop-color="#d9a866"/><stop offset="1" stop-color="#c08a52"/></linearGradient>` +
      `<radialGradient id="c26-goat" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d8d0c0"/></radialGradient>` +
      `<radialGradient id="c26-shine" cx="0.66" cy="0.3" r="0.7"><stop offset="0" stop-color="#fff" stop-opacity="0.45"/><stop offset="0.5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.22"/></radialGradient>` +
      `<radialGradient id="c26-sunlight" cx="0.14" cy="0.14" r="1"><stop offset="0" stop-color="#fff2c4" stop-opacity="0.3"/><stop offset="0.5" stop-color="#fff2c4" stop-opacity="0.06"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></radialGradient></defs>` +
      sky +
      land +
      near +
      tufts +
      flowers +
      fence +
      rabbit +
      tractor +
      haystack +
      landedBag +
      sheep +
      trough +
      poof +
      kestrel +
      balloon +
      geese +
      cloudGag +
      `<rect width="${W}" height="${H}" fill="url(#c26-sunlight)"/>`
    )
  },
})
