// Cartoon "The chimney sweep" (docs/cartoon-mode.md), made like 812: a 20 s story on the rooftops of an old town told
// by a camera. A white cat stalks a pigeon along the ridge, wiggles, pounces — the pigeon flies off and the cat dives
// head first down a chimney. The chimneys rumble, soot puffs out, and the cat pops out of the next one black as coal,
// sneezes a cloud of soot, and glares at the pigeons laughing on the TV aerial; at last it licks one paw clean.
// Twelve differences: two hard (a missing roof tile, the hour hand of the tower clock), three events of the story.
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { farBird, groundShadow, INK, keenOwl, NATURE_DEFS, O, Ow, puffCloud, swingKeys } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // The tower clock with the owl below it, then down over the dormers and the laundry to the cat.
  { t: 1.6, x: 0, y: 150, w: 480, ease: 'linear' },
  { t: 2.5, x: 0, y: 150, w: 480, ease: 'inOut' },
  { t: 4.4, x: 200, y: 440, w: 520, ease: 'step' },
  // The cat stalks along the ridge.
  { t: 4.45, x: 380, y: 380, w: 480, ease: 'linear' },
  { t: 7.2, x: 560, y: 380, w: 480, ease: 'step' },
  // The wiggle before the pounce.
  { t: 7.25, x: 600, y: 360, w: 260, ease: 'step' },
  // Pounce — and down the chimney.
  { t: 8.2, x: 560, y: 300, w: 400, ease: 'step' },
  // The chimneys rumble, soot puffs out.
  { t: 9.3, x: 680, y: 320, w: 480, ease: 'step' },
  // Out it comes, black as coal; the sneeze.
  { t: 11.15, x: 940, y: 280, w: 280, ease: 'step' },
  // The pigeons laugh on the aerial.
  { t: 13.6, x: 1000, y: 260, w: 440, ease: 'step' },
  // The whole street...
  { t: 16.5, x: 360, y: 320, w: 800, ease: 'linear' },
  { t: 18.2, x: 366, y: 322, w: 790, ease: 'step' },
  // ...and the sooty cat licking one paw clean.
  { t: 18.25, x: 950, y: 290, w: 240 },
  { t: 19.95, x: 954, y: 292, w: 232, ease: 'step' },
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

/** The roof's ridge, the line the cat walks on; the eave with its gutter. */
const RIDGE = 470
const EAVE = 640
/** The chimneys: the cat dives into A and comes out of B; C wears a cowl. */
const CHIMNEY_A = 760
const CHIMNEY_B = 1060
const CHIMNEY_C = 400
const TOP_A = 400
const TOP_B = 392

/** The cat's feet on the ridge; it turns about its middle (CAT_PIVOT). */
const CAT: [number, number] = [470, RIDGE]
const CAT_PIVOT: [number, number] = [CAT[0], CAT[1] - 24]
const STALK: [number, number] = [4.5, 7.2]
const POUNCE = 8.2
const DIVE = 8.85
const POP = 11.2
const SNEEZE = 12.4
function catKeys(): Keyframe[] {
  const k: Keyframe[] = [{ t: 0, x: 0, y: 0, rot: 0, o: 1 }, { t: STALK[0], ease: 'linear' }]
  // Creeping, a step at a time.
  for (let i = 1; i <= 12; i++) k.push({ t: Math.round((STALK[0] + (i * (STALK[1] - STALK[0])) / 12) * 100) / 100, x: Math.round((200 * i) / 12), y: i % 2 ? -2 : 0, ease: 'inOut' })
  // The wiggle.
  for (let i = 1; i <= 7; i++) k.push({ t: Math.round((STALK[1] + i * 0.13) * 100) / 100, rot: i % 2 ? 4 : -4, ease: 'inOut' })
  k.push(
    { t: POUNCE, x: 200, y: 0, rot: 0, ease: 'out' },
    // Up over the chimney...
    { t: 8.5, x: 282, y: -100, rot: -15, ease: 'in' },
    // ...and head first down it.
    { t: DIVE, x: 290, y: -2, rot: 80, o: 1, ease: 'step' },
    { t: DIVE + 0.05, o: 0, ease: 'step' },
    // Up out of the other chimney, sooty.
    { t: POP, x: CHIMNEY_B - CAT[0], y: 40, rot: 0, o: 1, ease: 'out' },
    { t: 11.55, y: -(RIDGE - TOP_B), ease: 'inOut' },
    { t: 12.25, ease: 'in' },
    // The sneeze throws it back.
    { t: SNEEZE, rot: -14, ease: 'out' },
    { t: 12.8, rot: 0 },
    { t: 19.95, ease: 'step' },
  )
  return k
}

/** The pigeon on chimney A's rim; it flies to the aerial. */
const PIGEON: [number, number] = [CHIMNEY_A + 10, TOP_A - 8]
/** The TV aerial on the ridge's right end. */
const AERIAL = 1180
const pigeonKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, sx: 1 },
  { t: 8.25, ease: 'out' },
  { t: 8.7, x: 150, y: -120, ease: 'inOut' },
  { t: 9.3, x: AERIAL + 32 - PIGEON[0], y: 320 - PIGEON[1], sx: 1, ease: 'step' },
  { t: 19.95, ease: 'step' },
]

export default svgLevel({
  id: 818,
  chapter: 'cartoon',
  title: 'cartoonChimneySweep',
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
    const sway = (pivot: [number, number], angle: number, period: number, m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 13) / 13 }, m)

    // --- Sky, sun, clouds, swallows, the far town in the haze. ---
    let far = ''
    for (let i = 0; i < 26; i++) {
      const fx = Math.round(i * 58 + rand() * 20)
      const h = Math.round(50 + rand() * 70)
      const w = Math.round(40 + rand() * 30)
      const base = 520
      far += `<path d="M${fx} ${base}v-${h}l${Math.round(w / 2)}-${Math.round(18 + rand() * 14)}l${Math.round(w / 2)} ${Math.round(18 + rand() * 14)}v${h}z" fill="#b9a7b8" fill-opacity="0.75"/>`
      if (i % 3 === 0) far += `<rect x="${fx + 8}" y="${base - h - 30}" width="8" height="18" fill="#a8939f" fill-opacity="0.75"/>`
    }
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c18-sky)"/>` +
      `<circle cx="1250" cy="130" r="190" fill="url(#c18-glow)"/>` +
      `<circle cx="1250" cy="130" r="44" fill="#ffd56a" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="1236" cy="122" rx="4.5" ry="7" fill="${INK}"/><ellipse cx="1264" cy="122" rx="4.5" ry="7" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.3, phase: 0.2 }, `<rect x="1226" y="114" width="48" height="18" fill="#ffd56a"/><path d="M1228 123h12M1258 123h12" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<path d="M1232 144q18 14 36 0" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>` +
      anim({ type: 'path', points: [[0, 0], [160, 0]], period: 36 }, puffCloud(420, 110, 0.9)) +
      anim({ type: 'path', points: [[0, 0], [-120, 0]], period: 30 }, puffCloud(900, 70, 0.7)) +
      keys(undefined, [{ t: 0, x: 0, y: 0 }, { t: 10, y: -30, ease: 'inOut' }, { t: 19.9, x: 1700, y: 0 }], [-120, 230],
        ([[-120, 230], [-146, 216], [-150, 244], [-176, 228]] as [number, number][]).map(([fx, fy], i) => farBird(fx, fy, beat([fx, fy - 2], 0.4, i * 0.2))).join('')) +
      far +
      // A church dome over the far roofs.
      `<path d="M640 470v-60q60-70 120 0v60z" fill="#a8939f" fill-opacity="0.85"/><path d="M700 340v-30M694 322h12" stroke="#a8939f" stroke-width="4"/>` +
      // Smoke from a far chimney.
      anim({ type: 'keys', period: 3, keys: [{ t: 0, x: 0, y: 0, o: 0.7, sx: 0.6, sy: 0.6 }, { t: 3, x: 20, y: -70, o: 0, sx: 1.6, sy: 1.6 }], pivot: [1140, 400] },
        `<circle cx="1140" cy="400" r="12" fill="#fff" fill-opacity="0.7"/>`)

    // --- The clock tower at the left: the game's owl on the ledge under the clock (its hour hand on 3 in A, on 4 in B:
    // a hard one), a flag on the spire. ---
    const hand = (angle: number, len: number, w: number) => {
      const r = (angle * Math.PI) / 180
      return `<path d="M130 268l${Math.round(Math.sin(r) * len * 10) / 10} ${Math.round(-Math.cos(r) * len * 10) / 10}" stroke="${INK}" stroke-width="${w}" stroke-linecap="round"/>`
    }
    let ticks = ''
    for (let i = 0; i < 12; i++) {
      const r = (i * 30 * Math.PI) / 180
      ticks += `<path d="M${Math.round((130 + Math.sin(r) * 32) * 10) / 10} ${Math.round((268 - Math.cos(r) * 32) * 10) / 10}L${Math.round((130 + Math.sin(r) * 36) * 10) / 10} ${Math.round((268 - Math.cos(r) * 36) * 10) / 10}" stroke="${INK}" stroke-width="${i % 3 ? 1.6 : 3}"/>`
    }
    const tower =
      `<rect x="56" y="196" width="148" height="704" fill="url(#c18-stone)" ${O}/>` +
      `<rect x="56" y="196" width="148" height="704" fill="url(#c18-bricks)"/>` +
      `<path d="M44 200l86-110l86 110z" fill="url(#c18-roofdark)" ${O}/><path d="M60 196h140" stroke="${INK}" stroke-width="4"/>` +
      `<path d="M130 90v-34" stroke="${INK}" stroke-width="3"/>` +
      anim({ type: 'keys', period: 0.8, keys: [{ t: 0, sx: 1 }, { t: 0.4, sx: 0.85, ease: 'inOut' }], pivot: [130, 62] }, `<path d="M131 56l26 7l-26 8z" fill="#e63946" ${Ow(1.4)}/>`) +
      `<circle cx="130" cy="268" r="42" fill="#f6efdc" ${Ow(3)}/><circle cx="130" cy="268" r="42" fill="none" stroke="#c9a24a" stroke-width="4" stroke-opacity="0.8"/>` +
      ticks +
      hand(0, 30, 3) +
      diff(140, 276, 18, hand(90, 22, 4.4), hand(120, 22, 4.4)) +
      `<circle cx="130" cy="268" r="4" fill="${INK}"/>` +
      `<rect x="62" y="330" width="136" height="8" fill="#c9b79a" ${Ow(1.6)}/>` +
      sway([130, 330], 6, 3.6, keenOwl(130, 330, 1, blink(3.1, 0.3))) +
      `<rect x="100" y="420" width="60" height="80" rx="30" fill="#5a4a6a" ${Ow(1.8)}/><path d="M130 420v80M100 460h60" stroke="${INK}" stroke-width="2"/>` +
      `<rect x="100" y="600" width="60" height="80" rx="30" fill="#ffe7a8" ${Ow(1.8)}/><path d="M130 600v80M100 640h60" stroke="${INK}" stroke-width="2"/>`

    // --- The houses under the roof: three facades, windows with shutters and boxes (the middle box's flowers red in
    // A, yellow in B: the one recolour), the laundry line (a sock in A only), the door lantern (A only). ---
    const facade = (x0: number, x1: number, wall: string) =>
      `<rect x="${x0}" y="${EAVE}" width="${x1 - x0}" height="${H - EAVE}" fill="${wall}" ${O}/>` +
      `<rect x="${x0}" y="${EAVE}" width="${x1 - x0}" height="14" fill="#000" fill-opacity="0.12"/>`
    const flowersRow = (x: number, y: number, c: string) =>
      [0, 12, 24, 36].map((d, i) => sway([x + d, y + 4], 6, 2.6 + i * 0.2, `<path d="M${x + d} ${y + 6}v-8" stroke="#3f8f3a" stroke-width="2"/><circle cx="${x + d}" cy="${y - 4}" r="5" fill="${c}" ${Ow(1)}/><circle cx="${x + d}" cy="${y - 4}" r="1.6" fill="#ffd23f"/>`)).join('')
    const window = (x: number, y: number, box: string) =>
      `<rect x="${x - 16}" y="${y - 6}" width="14" height="70" fill="#4f7d5a" ${Ow(1.6)}/><rect x="${x + 62}" y="${y - 6}" width="14" height="70" fill="#4f7d5a" ${Ow(1.6)}/>` +
      `<path d="M${x - 14} ${y + 6}h10M${x - 14} ${y + 20}h10M${x - 14} ${y + 34}h10M${x - 14} ${y + 48}h10M${x + 64} ${y + 6}h10M${x + 64} ${y + 20}h10M${x + 64} ${y + 34}h10M${x + 64} ${y + 48}h10" stroke="#2f5a3a" stroke-width="1.6"/>` +
      `<rect x="${x}" y="${y - 6}" width="60" height="70" fill="url(#c18-glass)" ${Ow(2)}/><path d="M${x + 30} ${y - 6}v70M${x} ${y + 28}h60" stroke="${INK}" stroke-width="2"/>` +
      `<path d="M${x + 6} ${y + 2}l12 14" stroke="#fff" stroke-opacity="0.6" stroke-width="3" stroke-linecap="round"/>` +
      box +
      `<rect x="${x - 4}" y="${y + 66}" width="68" height="12" fill="#a0683a" ${Ow(1.6)}/>`
    const houses =
      facade(220, 560, 'url(#c18-wall1)') + facade(560, 900, 'url(#c18-wall2)') + facade(900, 1220, 'url(#c18-wall3)') +
      window(270, 672, flowersRow(272, 742, '#ff6b8b')) + window(440, 672, flowersRow(442, 742, '#b38cff')) +
      window(610, 672, diff(630, 740, 28, flowersRow(612, 742, '#e63946'), flowersRow(612, 742, '#ffd23f'))) +
      window(780, 672, flowersRow(782, 742, '#ff9f1c')) +
      window(950, 672, flowersRow(952, 742, '#4dabf7')) + window(1120, 672, '') +
      // Doors at the foot of the walls.
      `<path d="M700 900v-60q30-30 60 0v60z" fill="#6e3f2a" ${Ow(2)}/><circle cx="748" cy="874" r="3" fill="#ffd23f"/>` +
      `<path d="M1010 900v-62q28-26 56 0v62z" fill="#3a5a8a" ${Ow(2)}/><circle cx="1056" cy="874" r="3" fill="#ffd23f"/>` +
      diff(
        1086,
        790,
        24,
        `<path d="M1080 770h12v8" fill="none" stroke="${INK}" stroke-width="2"/><path d="M1078 778h16l-2 22h-12z" fill="#ffe08a" ${Ow(1.6)}/><path d="M1076 778h20l-10-8z" fill="#3b3f46" ${Ow(1.4)}/><circle cx="1086" cy="790" r="12" fill="#fff4c0" fill-opacity="0.35"/>`,
        '',
      )
    const laundryItem = (x: number, m: string) => sway([x, 772], 7, 2.2, m)
    const laundry =
      `<path d="M236 770q150 14 300 0" fill="none" stroke="${INK}" stroke-width="1.8"/>` +
      laundryItem(300, `<path d="M284 774h32l6 12l-6 3v26h-32v-26l-6-3z" fill="#4dabf7" ${Ow(1.6)}/>`) +
      diff(418, 793, 26, laundryItem(416, `<path d="M410 776h12v22l8 6q2 6-6 6h-10q-4 0-4-6z" fill="#ff6b8b" ${Ow(1.4)}/><path d="M410 784h12" stroke="#fff" stroke-width="3"/>`), '') +
      laundryItem(476, `<rect x="460" y="774" width="34" height="40" rx="2" fill="#ffd23f" ${Ow(1.6)}/><path d="M460 804h34" stroke="#e63946" stroke-width="4"/>`)

    // --- The roof: tiles (one missing in B: a hard one), dormers (a flowerpot on the left one's sill in A only), the
    // ridge, the gutter. ---
    const dormer = (x: number) =>
      `<path d="M${x - 38} ${542}l38-30l38 30z" fill="url(#c18-roofdark)" ${Ow(2)}/>` +
      `<rect x="${x - 30}" y="540" width="60" height="52" fill="#efe2c6" ${Ow(2)}/>` +
      `<rect x="${x - 20}" y="548" width="40" height="34" fill="url(#c18-glass)" ${Ow(1.8)}/><path d="M${x} 548v34" stroke="${INK}" stroke-width="1.6"/>` +
      `<rect x="${x - 24}" y="582" width="48" height="6" fill="#a0683a" ${Ow(1.4)}/>`
    const roof =
      `<path d="M260 ${RIDGE}H1180L1220 ${EAVE}H220z" fill="url(#c18-roof)" ${O}/>` +
      `<path d="M260 ${RIDGE}H1180L1220 ${EAVE}H220z" fill="url(#c18-tiles)"/>` +
      diff(560, 509, 18, '', `<path d="M548 514q12-14 24 0v8h-24z" fill="#4a2a20" ${Ow(1.2)}/><path d="M550 518h20" stroke="#8a5a32" stroke-width="2"/>`) +
      dormer(420) + dormer(900) +
      diff(436, 574, 18, `<path d="M430 582h12l-2 8h-8z" fill="#c9562a" ${Ow(1.2)}/><path d="M436 582v-10" stroke="#3f8f3a" stroke-width="2"/><circle cx="436" cy="568" r="5" fill="#e63946" ${Ow(1)}/>`, '') +
      `<path d="M256 ${RIDGE}H1184" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M256 ${RIDGE}H1184" stroke="#b5503a" stroke-width="8" stroke-linecap="round"/>` +
      `<path d="M270 ${RIDGE - 2}h900" stroke="#fff" stroke-opacity="0.3" stroke-width="2" stroke-dasharray="14 10"/>`
    const gutterFront = `<rect x="214" y="${EAVE - 6}" width="1012" height="12" rx="6" fill="url(#c18-metal)" ${Ow(1.8)}/>`

    // --- The right-hand house with its gable and the weathervane (a cockerel on it in A, only the arrow in B). ---
    const vaneCock =
      `<path d="M1314 354q2-16 14-18l4-8l4 8q10 2 10 12l8-10l2 16q-8 12-26 12q-12-2-16-12z" fill="#3b3f46" ${Ow(1.4)}/><circle cx="1330" cy="340" r="1.6" fill="#ffd23f"/>`
    const gableHouse =
      `<rect x="1220" y="548" width="230" height="${H - 548}" fill="url(#c18-wall4)" ${O}/>` +
      `<path d="M1206 552l124-130l124 130z" fill="url(#c18-roof)" ${O}/><path d="M1206 552l124-130l124 130z" fill="url(#c18-tiles)"/>` +
      `<rect x="1300" y="600" width="60" height="70" fill="url(#c18-glass)" ${Ow(2)}/><path d="M1330 600v70M1300 635h60" stroke="${INK}" stroke-width="2"/>` +
      `<path d="M1330 422v-80" stroke="${INK}" stroke-width="3"/><path d="M1310 378h40M1346 374l8 4l-8 4" fill="none" stroke="#3b3f46" stroke-width="3"/>` +
      anim({ type: 'sway', angle: 6, pivot: [1330, 380], period: 4.4 },
        diff(1336, 346, 30, vaneCock, ''))

    // --- Chimneys (C wears a cowl in A only), the TV aerial (its lowest rod shorter in B). ---
    const chimney = (x: number, top: number, extra = '') =>
      `<rect x="${x - 24}" y="${top + 8}" width="48" height="${RIDGE + 22 - top}" fill="url(#c18-brick)" ${O}/>` +
      `<rect x="${x - 24}" y="${top + 8}" width="48" height="${RIDGE + 22 - top}" fill="url(#c18-bricks)"/>` +
      `<rect x="${x - 30}" y="${top - 4}" width="60" height="14" rx="2" fill="#8a3a2a" ${Ow(2)}/>` + extra
    const cowl = `<path d="M376 410q0-24 24-24q24 0 24 24z" fill="url(#c18-metal)" ${Ow(1.8)}/><path d="M392 410v-8M408 410v-8" stroke="${INK}" stroke-width="2"/><circle cx="400" cy="384" r="3" fill="#8a93a0" ${Ow(1)}/>`
    const chimneyC = chimney(CHIMNEY_C, 412) + diff(CHIMNEY_C, 398, 28, cowl, '')
    // A and B rumble while the cat tumbles through.
    const shake = (from: number, to: number, pivot: [number, number], m: string) =>
      once(
        [{ t: 0, rot: 0 }, { t: from, rot: 0, ease: 'inOut' }, ...Array.from({ length: Math.round((to - from) / 0.08) - 1 }, (_, i) => ({ t: Math.round((from + (i + 1) * 0.08) * 100) / 100, rot: i % 2 ? 3 : -3, ease: 'inOut' as const })), { t: to, rot: 0, ease: 'step' }],
        pivot,
        m,
      )
    const chimneyA = shake(9.0, 10.0, [CHIMNEY_A, RIDGE + 20], chimney(CHIMNEY_A, TOP_A))
    const chimneyB = shake(10.3, POP, [CHIMNEY_B, RIDGE + 20], chimney(CHIMNEY_B, TOP_B))
    const rods = (y: number, from: number, to: number) =>
      `<path d="M${from} ${y}H${to}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${from} ${y}H${to}" stroke="#c9ced6" stroke-width="2.6" stroke-linecap="round"/>`
    const aerial =
      `<path d="M${AERIAL} ${RIDGE}V290" stroke="${INK}" stroke-width="6"/><path d="M${AERIAL} ${RIDGE}V290" stroke="#c9ced6" stroke-width="3"/>` +
      rods(320, 1130, 1230) + rods(350, 1140, 1220) + rods(380, 1150, 1185) +
      diff(1200, 380, 18, rods(380, 1185, 1210), '')

    // --- The cat: white, sitting, creeping, leaping — then black with soot. ---
    const [cx, cy] = CAT
    const catSit = (fur: string, sooty: boolean) =>
      sway([cx - 14, cy - 4], 8, 2.4,
        `<path d="M${cx - 14} ${cy - 4}q-30 4-30-20q0-8 6-6" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${cx - 14} ${cy - 4}q-30 4-30-20q0-8 6-6" fill="none" stroke="${sooty ? '#3a3a44' : '#f4f1ea'}" stroke-width="5" stroke-linecap="round"/>`) +
      `<ellipse cx="${cx - 6}" cy="${cy - 15}" rx="19" ry="15" fill="${fur}" ${O}/>` +
      `<path d="M${cx - 8} ${cy - 6}q-6-30 12-42q16 6 12 42z" fill="${fur}" ${O}/>` +
      `<rect x="${cx + 1}" y="${cy - 24}" width="8" height="24" rx="4" fill="${fur}" ${Ow(1.8)}/>` +
      `<path d="M${cx - 4} ${cy - 68}l2-17l12 11z" fill="${fur}" ${O}/><path d="M${cx + 16} ${cy - 72}l10-12l2 16z" fill="${fur}" ${O}/>` +
      `<path d="M${cx - 1} ${cy - 72}l1-7l5 4zM${cx + 20} ${cy - 74}l4-5l1 6z" fill="#f7a6b4"/>` +
      `<circle cx="${cx + 10}" cy="${cy - 58}" r="16" fill="${fur}" ${O}/>` +
      `<path d="M${cx + 22} ${cy - 52}l4-1.5l-1.5 3.5z" fill="#f58aa0" ${Ow(1.1)}/>` +
      `<path d="M${cx + 24} ${cy - 50}q-2 4-5 2M${cx + 24} ${cy - 50}q1 4 4 2" fill="none" stroke="${INK}" stroke-width="1.4" stroke-linecap="round"/>` +
      `<path d="M${cx + 22} ${cy - 52}l13-3M${cx + 22} ${cy - 50}l13 1M${cx + 4} ${cy - 52}l-10-2" stroke="${sooty ? '#c9ced6' : INK}" stroke-width="1" stroke-linecap="round"/>`
    const eyesOpen = (iris: string) =>
      `<ellipse cx="${cx + 8}" cy="${cy - 61}" rx="4" ry="5" fill="#fff" ${Ow(1.4)}/><ellipse cx="${cx + 18}" cy="${cy - 61}" rx="4" ry="5" fill="#fff" ${Ow(1.4)}/>` +
      `<ellipse cx="${cx + 9}" cy="${cy - 60}" rx="2.6" ry="3.6" fill="${iris}"/><ellipse cx="${cx + 19}" cy="${cy - 60}" rx="2.6" ry="3.6" fill="${iris}"/>` +
      `<ellipse cx="${cx + 9.4}" cy="${cy - 60}" rx="0.9" ry="3" fill="${INK}"/><ellipse cx="${cx + 19.4}" cy="${cy - 60}" rx="0.9" ry="3" fill="${INK}"/>`
    // Front paw (licking at the end): its own arm, raised to the mouth again and again.
    const lickKeys: Keyframe[] = [{ t: 0, rot: 0 }, { t: 17, ease: 'inOut' }, ...Array.from({ length: 10 }, (_, i) => ({ t: Math.round((17.3 + i * 0.25) * 100) / 100, rot: i % 2 ? -140 : -158, ease: 'inOut' as const })), { t: 19.8, rot: 0 }]
    const sootPaw = keys(undefined, lickKeys, [cx + 14, cy - 30],
      `<rect x="${cx + 10}" y="${cy - 30}" width="8" height="30" rx="4" fill="url(#c18-soot)" ${Ow(1.8)}/>` +
        once(showIn([17.6, LOOP]), [cx + 14, cy - 4], `<ellipse cx="${cx + 14}" cy="${cy - 5}" rx="4.6" ry="6" fill="#f4f1ea"/>`))
    const catSitting =
      catSit('url(#c18-fur)', false) +
      `<rect x="${cx + 10}" y="${cy - 24}" width="8" height="24" rx="4" fill="url(#c18-fur)" ${Ow(1.8)}/>` +
      eyesOpen('#7ccf5a') +
      blink(3.6, 0.2)(`<path d="M${cx + 4} ${cy - 61}h8M${cx + 14} ${cy - 61}h8" stroke="${INK}" stroke-width="2" stroke-linecap="round"/><ellipse cx="${cx + 8}" cy="${cy - 61}" rx="4.6" ry="5.6" fill="#f4f1ea"/><ellipse cx="${cx + 18}" cy="${cy - 61}" rx="4.6" ry="5.6" fill="#f4f1ea"/><path d="M${cx + 4} ${cy - 60}h8M${cx + 14} ${cy - 60}h8" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`)
    const crouchLeg = (x: number, flip: boolean) =>
      keys(undefined, swingKeys([STALK], 0.23, 20, flip), [x, cy - 12],
        `<rect x="${x - 4}" y="${cy - 14}" width="8.5" height="14" rx="4" fill="url(#c18-fur)" ${Ow(1.6)}/>`)
    const catCrouch =
      anim({ type: 'keys', period: 0.9, keys: [{ t: 0, rot: -8 }, { t: 0.45, rot: 8, ease: 'inOut' }], pivot: [cx - 30, cy - 16] },
        `<path d="M${cx - 30} ${cy - 16}q-18-8-14-36q2-8 8-4" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${cx - 30} ${cy - 16}q-18-8-14-36q2-8 8-4" fill="none" stroke="#f4f1ea" stroke-width="5" stroke-linecap="round"/>`) +
      crouchLeg(cx - 22, false) + crouchLeg(cx + 18, true) +
      `<ellipse cx="${cx}" cy="${cy - 17}" rx="32" ry="11" fill="url(#c18-fur)" ${O}/>` +
      crouchLeg(cx - 14, true) + crouchLeg(cx + 26, false) +
      `<path d="M${cx + 22} ${cy - 30}l-12-8l2 13zM${cx + 40} ${cy - 32}l12-6l-4 12z" fill="#f4f1ea" ${O}/>` +
      `<circle cx="${cx + 32}" cy="${cy - 22}" r="14" fill="url(#c18-fur)" ${O}/>` +
      `<ellipse cx="${cx + 30}" cy="${cy - 25}" rx="3.6" ry="4.4" fill="#fff" ${Ow(1.3)}/><ellipse cx="${cx + 40}" cy="${cy - 25}" rx="3.6" ry="4.4" fill="#fff" ${Ow(1.3)}/>` +
      `<circle cx="${cx + 31}" cy="${cy - 24.5}" r="2.6" fill="${INK}"/><circle cx="${cx + 41}" cy="${cy - 24.5}" r="2.6" fill="${INK}"/>` +
      `<path d="M${cx + 44} ${cy - 18}l4-1.5l-1.5 3.5z" fill="#f58aa0" ${Ow(1.1)}/><path d="M${cx + 44} ${cy - 18}l13-2M${cx + 44} ${cy - 16}l13 2" stroke="${INK}" stroke-width="1"/>`
    const catLeap =
      `<path d="M${cx - 34} ${cy - 20}q-26 0-40 10" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${cx - 34} ${cy - 20}q-26 0-40 10" fill="none" stroke="#f4f1ea" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M${cx - 26} ${cy - 18}l-22 12M${cx - 20} ${cy - 16}l-20 16" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${cx - 26} ${cy - 18}l-22 12M${cx - 20} ${cy - 16}l-20 16" stroke="#f4f1ea" stroke-width="5.4" stroke-linecap="round"/>` +
      `<ellipse cx="${cx}" cy="${cy - 24}" rx="38" ry="11" fill="url(#c18-fur)" ${O}/>` +
      `<path d="M${cx + 28} ${cy - 28}l26-14M${cx + 30} ${cy - 22}l28-6" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${cx + 28} ${cy - 28}l26-14M${cx + 30} ${cy - 22}l28-6" stroke="#f4f1ea" stroke-width="5.4" stroke-linecap="round"/>` +
      `<path d="M${cx + 28} ${cy - 44}l0-16l11 9zM${cx + 44} ${cy - 46}l10-10l1 15z" fill="#f4f1ea" ${O}/>` +
      `<circle cx="${cx + 38}" cy="${cy - 34}" r="14" fill="url(#c18-fur)" ${O}/>` +
      `<ellipse cx="${cx + 36}" cy="${cy - 37}" rx="4.6" ry="5.6" fill="#fff" ${Ow(1.3)}/><ellipse cx="${cx + 46}" cy="${cy - 37}" rx="4.6" ry="5.6" fill="#fff" ${Ow(1.3)}/>` +
      `<circle cx="${cx + 37}" cy="${cy - 37}" r="1.8" fill="${INK}"/><circle cx="${cx + 47}" cy="${cy - 37}" r="1.8" fill="${INK}"/>` +
      `<ellipse cx="${cx + 44}" cy="${cy - 27}" rx="4" ry="4.6" fill="#7a2a2a" ${Ow(1.2)}/>`
    const catSooty =
      catSit('url(#c18-soot)', true) +
      sootPaw +
      // Big white eyes in the black face: dazed stars after the fall, a glare at the pigeons.
      once(showIn([POP, 13.4], [16.5, LOOP]), CAT,
        `<ellipse cx="${cx + 8}" cy="${cy - 61}" rx="5" ry="6" fill="#fff" ${Ow(1.2)}/><ellipse cx="${cx + 19}" cy="${cy - 61}" rx="5" ry="6" fill="#fff" ${Ow(1.2)}/><circle cx="${cx + 9}" cy="${cy - 60}" r="1.8" fill="${INK}"/><circle cx="${cx + 20}" cy="${cy - 60}" r="1.8" fill="${INK}"/>`) +
      once(showIn([13.4, 16.5]), CAT,
        `<path d="M${cx + 3} ${cy - 61}h10M${cx + 14} ${cy - 61}h10" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="${cx + 9}" cy="${cy - 61}" r="1.4" fill="${INK}"/><circle cx="${cx + 20}" cy="${cy - 61}" r="1.4" fill="${INK}"/><path d="M${cx + 2} ${cy - 67}l10 3M${cx + 25} ${cy - 67}l-10 3" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`) +
      // Soot specks falling off.
      [[-12, 0], [4, 0.4], [16, 0.8]].map(([ox, phase]) => anim({ type: 'keys', period: 1.2, phase, keys: [{ t: 0, y: 0, o: 1 }, { t: 1.2, y: 30, o: 0 }], pivot: [cx + ox, cy - 20] }, `<circle cx="${cx + ox}" cy="${cy - 20}" r="2.4" fill="#2b2b33"/>`)).join('') +
      once(showIn([11.5, SNEEZE]), CAT,
        anim({ type: 'rotate', pivot: [cx + 10, cy - 88], period: 1 },
          [0, 120, 240].map((a) => `<path transform="rotate(${a} ${cx + 10} ${cy - 88})" d="M${cx + 10} ${cy - 104}l2 4l4 1l-3 3l1 4l-4-2l-4 2l1-4l-3-3l4-1z" fill="#ffd23f" ${Ow(1)}/>`).join('')))
    const catMarkup =
      groundShadow(cx, cy, 36, 4) +
      once(showIn([0, STALK[0]]), CAT, catSitting) +
      once(showIn([STALK[0], POUNCE]), CAT, catCrouch) +
      once(showIn([POUNCE, POP]), CAT, catLeap) +
      once(showIn([POP, LOOP]), CAT, catSooty)
    const cat = keys('cat', catKeys(), CAT_PIVOT, catMarkup)

    // --- Soot: out of A after the dive, out of B before the cat; the sneeze. ---
    const sootPuff = (x: number, y: number, t: number) =>
      [[-18, -40, 0], [10, -60, 0.15], [-4, -90, 0.3], [20, -100, 0.45]]
        .map(([ox, oy, d]) => once([{ t: 0, x: 0, y: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t: t + d, o: 0.95, ease: 'out' }, { t: t + d + 0.9, x: ox, y: oy, sx: 1.6, sy: 1.6, o: 0, ease: 'step' }], [x, y],
          `<circle cx="${x}" cy="${y}" r="18" fill="#2b2b33"/><circle cx="${x + 12}" cy="${y - 6}" r="12" fill="#3a3a44"/>`))
        .join('')
    const thumps = (x: number, from: number, to: number) =>
      once(showIn([from, to]), [x, TOP_A - 20],
        anim({ type: 'keys', period: 0.32, keys: [{ t: 0, sx: 0.6, sy: 0.6, o: 1 }, { t: 0.32, sx: 1.4, sy: 1.4, o: 0 }], pivot: [x, RIDGE - 40] },
          `<path d="M${x - 40} ${RIDGE - 60}l-10-8M${x + 40} ${RIDGE - 60}l10-8M${x - 44} ${RIDGE - 34}h-12M${x + 44} ${RIDGE - 34}h12" stroke="#fff4c0" stroke-width="3" stroke-linecap="round"/>`))
    const SNOUT: [number, number] = [CHIMNEY_B + 30, TOP_B - 52]
    const sneeze =
      once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t: SNEEZE, o: 1, ease: 'out' }, { t: SNEEZE + 0.15, sx: 1.2, sy: 1.2, ease: 'inOut' }, { t: SNEEZE + 0.3, sx: 1, sy: 1, o: 1, ease: 'step' }, { t: SNEEZE + 0.34, o: 0, ease: 'step' }], SNOUT,
        `<path d="M${SNOUT[0] + 16} ${SNOUT[1] - 24}l6 14l15-5l-8 13l14 7l-16 3l3 16l-12-10l-10 12l-1-16l-16 1l11-10l-10-12l16 2z" fill="#ffe066" ${Ow(1.8)}/>`) +
      [[40, -30], [60, 0], [44, 30], [80, -50], [90, 24]]
        .map(([ox, oy], i) => once([{ t: 0, x: 0, y: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t: SNEEZE + i * 0.04, o: 1, ease: 'out' }, { t: SNEEZE + 1.4, x: ox, y: oy, sx: 1.8, sy: 1.8, o: 0, ease: 'step' }], SNOUT,
          `<circle cx="${SNOUT[0]}" cy="${SNOUT[1]}" r="14" fill="#2b2b33" fill-opacity="0.9"/><circle cx="${SNOUT[0] + 10}" cy="${SNOUT[1] - 6}" r="9" fill="#3a3a44" fill-opacity="0.9"/>`))
        .join('')

    // --- Pigeons: the one on chimney A flies to the aerial; three laugh there at the sooty cat. ---
    const pigeonBody = (x: number, y: number, wing: string) =>
      `<path d="M${x + 12} ${y - 12}l12 4l-10 6z" fill="#5f6878" ${Ow(1.4)}/>` +
      `<path d="M${x - 2} ${y}v-5M${x + 4} ${y}v-5" stroke="#f08a8a" stroke-width="2.4" stroke-linecap="round"/>` +
      `<ellipse cx="${x + 2}" cy="${y - 12}" rx="14" ry="9" fill="url(#c18-pigeon)" ${Ow(1.6)}/>` +
      `<path d="M${x - 8} ${y - 18}q2 8 8 10" fill="none" stroke="#6fbf8a" stroke-width="4" stroke-linecap="round"/><path d="M${x - 6} ${y - 14}q4 4 8 4" fill="none" stroke="#a46fc0" stroke-width="2.4" stroke-linecap="round"/>` +
      wing +
      `<circle cx="${x - 9}" cy="${y - 23}" r="6.5" fill="#8a93a5" ${Ow(1.5)}/>`
    const pigeonFace = (x: number, y: number, laugh: boolean) =>
      laugh
        ? `<path d="M${x - 12} ${y - 25}q2-3 4 0" fill="none" stroke="${INK}" stroke-width="1.6"/><path d="M${x - 15} ${y - 23}l-6-3l1 4zM${x - 15} ${y - 21}l-6 3l1-4z" fill="#e8c79a" ${Ow(1)}/>`
        : `<circle cx="${x - 11}" cy="${y - 24}" r="2" fill="#ff9f1c"/><circle cx="${x - 11}" cy="${y - 24}" r="1" fill="${INK}"/><path d="M${x - 15} ${y - 22}l-6 1l6 2z" fill="#e8c79a" ${Ow(1)}/>`
    const wingRest = (x: number, y: number) => `<path d="M${x - 4} ${y - 16}q12-4 18 4q-8 6-18-4z" fill="#7a8396" ${Ow(1.2)}/><path d="M${x + 4} ${y - 12}l4 2M${x + 8} ${y - 14}l4 2" stroke="${INK}" stroke-width="1.4"/>`
    const wingFly = (x: number, y: number) =>
      anim({ type: 'keys', period: 0.24, keys: [{ t: 0, sy: 1 }, { t: 0.12, sy: -0.7, ease: 'inOut' }], pivot: [x + 2, y - 16] }, `<path d="M${x - 4} ${y - 16}q6-26 24-28q-2 16-10 28z" fill="#9aa3b5" ${Ow(1.4)}/>`)
    const laughing = (x: number, y: number, phase: number) =>
      anim({ type: 'keys', period: 0.36, phase, keys: [{ t: 0, y: 0 }, { t: 0.18, y: -4, ease: 'inOut' }], pivot: [x, y] }, pigeonBody(x, y, wingRest(x, y)) + pigeonFace(x, y, true))
    // A laughs in its own pose only while the others laugh; the rest of the time it looks round.
    const restingPigeon = (x: number, y: number, flip: boolean, phase: number) => {
      const m =
        once(showIn([0, 13.6], [16.5, LOOP]), [x, y], pigeonBody(x, y, wingRest(x, y)) + anim({ type: 'keys', period: 2.4, phase, keys: [{ t: 0, rot: 0 }, { t: 1.2, rot: 12, ease: 'inOut' }], pivot: [x - 8, y - 18] }, pigeonFace(x, y, false))) +
        once(showIn([13.6, 16.5]), [x, y], laughing(x, y, phase))
      return flip ? `<g transform="translate(${2 * x} 0) scale(-1 1)">${m}</g>` : m
    }
    const [px, py] = PIGEON
    const flyingPigeon = keys('pigeon', pigeonKeys, PIGEON,
      once(showIn([0, 8.25], [9.3, 13.6], [16.5, LOOP]), PIGEON, pigeonBody(px, py, wingRest(px, py)) + anim({ type: 'keys', period: 1.8, keys: [{ t: 0, rot: 0 }, { t: 0.9, rot: -14, ease: 'inOut' }], pivot: [px - 8, py - 18] }, pigeonFace(px, py, false))) +
        once(showIn([8.25, 9.3]), PIGEON, pigeonBody(px, py, wingFly(px, py)) + pigeonFace(px, py, false)) +
        once(showIn([13.6, 16.5]), PIGEON, laughing(px, py, 0.1)))
    const pigeons = restingPigeon(1148, 320, true, 0) + restingPigeon(1202, 350, false, 0.2) + flyingPigeon

    // --- Events of B: a mouse peeks out of the gutter while the cat creeps by, a ginger cat watches from the dormer
    // window while the chimneys rumble, a sparrow lands on the aerial while the pigeons laugh. ---
    const MOUSE: [number, number] = [610, EAVE - 2]
    const [mx, my] = MOUSE
    const gutterMouse = diff(
      mx,
      my - 10,
      22,
      '',
      once([{ t: 0, y: 14, o: 0, ease: 'step' }, { t: 5, o: 1, ease: 'out' }, { t: 5.3, y: 0 }, { t: 7.2, ease: 'in' }, { t: 7.55, y: 14, o: 1, ease: 'step' }, { t: 7.6, o: 0, ease: 'step' }], MOUSE,
        `<circle cx="${mx - 7}" cy="${my - 20}" r="5" fill="#a7a9b4" ${Ow(1.3)}/><circle cx="${mx + 7}" cy="${my - 20}" r="5" fill="#a7a9b4" ${Ow(1.3)}/><circle cx="${mx - 7}" cy="${my - 20}" r="2.4" fill="#f7a6b4"/><circle cx="${mx + 7}" cy="${my - 20}" r="2.4" fill="#f7a6b4"/>` +
          `<ellipse cx="${mx}" cy="${my - 10}" rx="9" ry="8" fill="#a7a9b4" ${Ow(1.4)}/><circle cx="${mx - 3}" cy="${my - 12}" r="1.4" fill="${INK}"/><circle cx="${mx + 3}" cy="${my - 12}" r="1.4" fill="${INK}"/><circle cx="${mx}" cy="${my - 7}" r="1.8" fill="#e8798f"/>` +
          `<path d="M${mx - 2} ${my - 7}l-10-1M${mx + 2} ${my - 7}l10-1" stroke="${INK}" stroke-width="0.8"/>`),
      undefined,
      during(5, 7.6),
    )
    const DORMER_CAT: [number, number] = [900, 584]
    const [dx, dy] = DORMER_CAT
    const dormerCat = diff(
      dx,
      dy - 16,
      20,
      '',
      `<g clip-path="url(#c18-dormer)">` +
        once([{ t: 0, y: 22, o: 0, ease: 'step' }, { t: 9.3, o: 1, ease: 'out' }, { t: 9.6, y: 0 }, { t: 10.9, ease: 'in' }, { t: 11.15, y: 22, o: 1, ease: 'step' }, { t: 11.2, o: 0, ease: 'step' }], DORMER_CAT,
          `<path d="M${dx - 12} ${dy - 20}l1-12l8 7zM${dx + 12} ${dy - 20}l-1-12l-8 7z" fill="#f4a13b" ${Ow(1.2)}/>` +
            `<circle cx="${dx}" cy="${dy - 14}" r="12" fill="url(#ke-ginger)" ${Ow(1.4)}/>` +
            `<circle cx="${dx - 4}" cy="${dy - 16}" r="2.6" fill="#fff"/><circle cx="${dx + 4}" cy="${dy - 16}" r="2.6" fill="#fff"/><circle cx="${dx - 3.4}" cy="${dy - 15.6}" r="1.4" fill="${INK}"/><circle cx="${dx + 4.6}" cy="${dy - 15.6}" r="1.4" fill="${INK}"/>` +
            `<path d="M${dx - 1.6} ${dy - 11}h3.2l-1.6 2z" fill="#e8798f"/>`) +
        `</g>`,
      undefined,
      during(9.3, 11.2),
    )
    const SPARROW: [number, number] = [AERIAL, 290]
    const [sx, sy] = SPARROW
    const sparrow = diff(
      sx,
      sy - 10,
      18,
      '',
      keys('sparrow', [{ t: 0, x: 60, y: -60, o: 0, ease: 'step' }, { t: 13.6, o: 1, ease: 'out' }, { t: 14, x: 0, y: 0 }, { t: 16.3, ease: 'in' }, { t: 16.45, x: 0, y: -4, o: 1, ease: 'step' }, { t: 16.5, o: 0, ease: 'step' }], SPARROW,
        `<path d="M${sx - 2} ${sy}v-4M${sx + 2} ${sy}v-4" stroke="${INK}" stroke-width="1.4"/><path d="M${sx + 6} ${sy - 9}l8 2l-6 4z" fill="#7a5a3a" ${Ow(1.1)}/>` +
          `<ellipse cx="${sx}" cy="${sy - 9}" rx="8" ry="6" fill="#b08a5a" ${Ow(1.3)}/><ellipse cx="${sx - 1}" cy="${sy - 7}" rx="4" ry="2.6" fill="#f4e6cc"/>` +
          `<circle cx="${sx - 6}" cy="${sy - 14}" r="4.6" fill="#8a6a42" ${Ow(1.2)}/><circle cx="${sx - 7.6}" cy="${sy - 15}" r="1.1" fill="${INK}"/><path d="M${sx - 10} ${sy - 14}l-4 1l4 1z" fill="#e8c79a"/>`),
      'sparrow',
      during(13.6, 16.5),
    )

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c18-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc0ec"/><stop offset="0.65" stop-color="#cfe6f5"/><stop offset="1" stop-color="#fbeedd"/></linearGradient>` +
      `<radialGradient id="c18-glow"><stop offset="0" stop-color="#fff0c8" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffe3a8" stop-opacity="0.4"/><stop offset="1" stop-color="#ffe3a8" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c18-roof" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8664a"/><stop offset="1" stop-color="#a84432"/></linearGradient>` +
      `<linearGradient id="c18-roofdark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7a5a8a"/><stop offset="1" stop-color="#4a3a5a"/></linearGradient>` +
      `<pattern id="c18-tiles" width="24" height="16" patternUnits="userSpaceOnUse"><path d="M0 16q6-12 12 0q6-12 12 0" fill="none" stroke="#7d2a1e" stroke-opacity="0.5" stroke-width="1.6"/></pattern>` +
      `<pattern id="c18-bricks" width="20" height="12" patternUnits="userSpaceOnUse"><path d="M0 0.5h20M0 6.5h20M5 0v6M15 6v6" stroke="#5e2a1e" stroke-opacity="0.45" stroke-width="1.2"/></pattern>` +
      `<linearGradient id="c18-brick" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9a4a32"/><stop offset="0.6" stop-color="#c2643e"/><stop offset="1" stop-color="#d9805a"/></linearGradient>` +
      `<linearGradient id="c18-stone" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b8a07c"/><stop offset="1" stop-color="#e0cca6"/></linearGradient>` +
      `<linearGradient id="c18-metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0e4ea"/><stop offset="1" stop-color="#8a93a0"/></linearGradient>` +
      `<linearGradient id="c18-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfe9f7"/><stop offset="1" stop-color="#7fb2d4"/></linearGradient>` +
      `<linearGradient id="c18-wall1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e8d49a"/><stop offset="1" stop-color="#f6e6b8"/></linearGradient>` +
      `<linearGradient id="c18-wall2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e8b4b0"/><stop offset="1" stop-color="#f6d0c8"/></linearGradient>` +
      `<linearGradient id="c18-wall3" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8c8e0"/><stop offset="1" stop-color="#c8e0f0"/></linearGradient>` +
      `<linearGradient id="c18-wall4" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b8d8a8"/><stop offset="1" stop-color="#d4ecc4"/></linearGradient>` +
      `<radialGradient id="c18-fur" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#ffffff"/><stop offset="0.6" stop-color="#f1ede4"/><stop offset="1" stop-color="#cfc9bb"/></radialGradient>` +
      `<radialGradient id="c18-soot" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#5a5a66"/><stop offset="0.6" stop-color="#34343e"/><stop offset="1" stop-color="#1e1e26"/></radialGradient>` +
      `<radialGradient id="c18-pigeon" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#c3c9d6"/><stop offset="1" stop-color="#8a93a5"/></radialGradient>` +
      `<radialGradient id="c18-sunlight" cx="0.87" cy="0.13" r="1"><stop offset="0" stop-color="#ffe9b8" stop-opacity="0.3"/><stop offset="0.5" stop-color="#ffe9b8" stop-opacity="0.07"/><stop offset="1" stop-color="#ffe9b8" stop-opacity="0"/></radialGradient>` +
      `<clipPath id="c18-dormer"><rect x="880" y="548" width="40" height="34"/></clipPath></defs>` +
      sky +
      tower +
      houses +
      laundry +
      roof +
      gableHouse +
      dormerCat +
      chimneyC +
      aerial +
      cat +
      chimneyA +
      chimneyB +
      sootPuff(CHIMNEY_A, TOP_A - 6, 8.95) +
      sootPuff(CHIMNEY_B, TOP_B - 6, 10.6) +
      thumps(CHIMNEY_A, 9.0, 10.0) +
      thumps(CHIMNEY_B, 10.3, POP) +
      gutterMouse +
      gutterFront +
      pigeons +
      sparrow +
      sneeze +
      `<rect width="${W}" height="${H}" fill="url(#c18-sunlight)"/>`
    )
  },
})
