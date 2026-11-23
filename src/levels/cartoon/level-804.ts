// Cartoon "The sandcastle" (docs/cartoon-mode.md), made like 812: a 20 s story on a beach told by a camera. A crab pats
// the last tower of its sandcastle into shape and plants a flag on top — and stands there smug while a seagull lands
// on the castle and snatches the flag. Off scuttles the crab, sideways, after the strutting gull, pinches its foot, gets
// the flag back and climbs the castle to plant it again — just as a wave rolls in and flattens everything. It ends up
// sitting on a heap of wet sand with a starfish on its head. Ten differences: two hard (a window of the far
// lighthouse, an arm of the starfish on the sand), three events of the story.
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { BEACH_DEFS, farBird, fish, groundShadow, INK, keenOwl, NATURE_DEFS, O, Ow, palmTree, puffCloud, swingKeys } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // A slow look along the beach: the palms, the lifeguard tower, the umbrella...
  { t: 1.6, x: 30, y: 470, w: 480, ease: 'inOut' },
  { t: 4.1, x: 330, y: 540, w: 480, ease: 'step' },
  // ...to the crab patting its castle into shape and planting the flag.
  { t: 4.15, x: 590, y: 600, w: 300, ease: 'step' },
  // The seagull leaves its post on the pier, the lighthouse behind.
  { t: 6.4, x: 960, y: 340, w: 480, ease: 'step' },
  // ...and lands on the castle behind the smug crab.
  { t: 7.3, x: 600, y: 580, w: 360, ease: 'step' },
  // The chase along the shore.
  { t: 9.2, x: 600, y: 520, w: 520, ease: 'inOut' },
  { t: 12.8, x: 740, y: 520, w: 520, ease: 'step' },
  // The pinch.
  { t: 12.85, x: 880, y: 640, w: 240, ease: 'step' },
  // The gull flies off, the crab carries its flag back.
  { t: 13.7, x: 820, y: 520, w: 520, ease: 'inOut' },
  { t: 15.9, x: 600, y: 540, w: 400, ease: 'step' },
  // Up the castle — and the wave.
  { t: 16.1, x: 600, y: 560, w: 340, ease: 'step' },
  // Sitting on the wet heap.
  { t: 17.5, x: 650, y: 650, w: 220 },
  { t: 19.95, x: 656, y: 654, w: 212, ease: 'step' },
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

/** The shore line: sea above, sand below. */
const SHORE = 662
/** The sandcastle stands on (CASTLE), its middle tower's top at CASTLE_TOP. */
const CASTLE: [number, number] = [740, 760]
const CASTLE_TOP = 676

/** The crab's feet, at the castle's left. */
const CRAB: [number, number] = [672, 762]
const SCUTTLES: [number, number][] = [[9.2, 12.8], [13.6, 14.1], [14.4, 15.9]]
const crabKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, rot: 0 },
  { t: 5.9, ease: 'out' },
  // Hops for joy.
  { t: 6.1, y: -12, ease: 'in' },
  { t: 6.3, y: 0, ease: 'out' },
  { t: 6.5, y: -12, ease: 'in' },
  { t: 6.7, y: 0 },
  // The chase: round the front of the castle, after the gull.
  { t: 9.2, ease: 'inOut' },
  { t: 9.6, x: 18, y: 30, ease: 'linear' },
  { t: 12.8, x: 272, y: 30, ease: 'out' },
  // A pinch.
  { t: 12.9, x: 280, ease: 'in' },
  { t: 13, x: 272 },
  // To the flag on the sand, and back with it.
  { t: 13.6, ease: 'inOut' },
  { t: 14.1, x: 330, y: 30 },
  { t: 14.4, ease: 'linear' },
  { t: 15.9, x: 40, y: 30, ease: 'out' },
  // Up onto the left tower.
  { t: 16.2, x: 32, y: -62, ease: 'out' },
  // The wave: tumbling down onto the heap.
  { t: 16.75, ease: 'in' },
  { t: 17.35, x: 40, y: -12, rot: 360, ease: 'out' },
  { t: 17.5, y: -14, rot: 360 },
  { t: 19.95, ease: 'step' },
]

/** The seagull's feet, on a post of the pier; it faces left (sx −1: right). */
const GULL: [number, number] = [1170, 576]
const GULL_WALK: [number, number] = [9, 12.8]
const gullKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, sx: 1, rot: 0, o: 1 },
  { t: 6.4, ease: 'inOut' },
  // Flies over and lands on the castle's right tower.
  { t: 6.95, x: -200, y: -40, ease: 'inOut' },
  { t: 7.6, x: -393, y: 124, ease: 'out' },
  // Leans to the flag and snatches it.
  { t: 8.2, rot: 0, ease: 'inOut' },
  { t: 8.35, rot: -22, ease: 'inOut' },
  { t: 8.5, rot: 0, sx: 1, ease: 'step' },
  // Turns, hops down and struts away.
  { t: 8.55, sx: -1, ease: 'inOut' },
  { t: 8.8, x: -372, y: 150, ease: 'in' },
  { t: 9, x: -350, y: 196, ease: 'linear' },
  ...Array.from({ length: 13 }, (_, i) => ({ t: 9 + (i + 1) * 0.3 - (i === 12 ? 0.1 : 0), x: -350 + ((i + 1) * 180) / 13, y: 196 + (i % 2 ? 0 : -4), ease: 'linear' as const })),
  // Pinched: up it jumps, squawking, and flies off.
  { t: 12.95, x: -170, y: 200, ease: 'out' },
  { t: 13.2, y: 150, ease: 'inOut' },
  { t: 14.6, x: 200, y: -280, o: 1, ease: 'step' },
  { t: 14.65, o: 0, ease: 'step' },
]

/** The flag: on the middle tower's top. */
const FLAG: [number, number] = [CASTLE[0], CASTLE_TOP]
const flag = (x: number, y: number) =>
  `<path d="M${x} ${y}v-26" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/><path d="M${x} ${y}v-26" stroke="#e9dcc0" stroke-width="1.6" stroke-linecap="round"/>` +
  `<path d="M${x} ${y - 26}l18 5l-18 6z" fill="#e63946" ${Ow(1.4)}/>`

export default svgLevel({
  id: 804,
  chapter: 'cartoon',
  title: 'cartoonSandcastle',
  parTimeSec: 100,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const beat = (pivot: [number, number], every: number, phase = 0) => (m: string) =>
      anim({ type: 'keys', period: every, phase, keys: [{ t: 0, sy: 1 }, { t: every / 2, sy: 0.3, ease: 'inOut' }], pivot }, m)
    const crown = (period: number, angle = 2, id?: string) => (pivot: [number, number], m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 11) / 11, ...(id && { id }) }, m)
    const blink = (period: number, phase = 0) => (m: string) => anim({ type: 'blink', duty: 0.07, period, phase }, m)

    // --- Sky, sea, the far shore: an island, the lighthouse on its cliff (a window fewer in B: a hard one), a sail. ---
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c7-sky)"/>` +
      `<circle cx="1120" cy="150" r="200" fill="url(#c7-glow)"/>` +
      `<circle cx="1120" cy="150" r="46" fill="#ffd56a" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="1106" cy="142" rx="4.5" ry="7" fill="${INK}"/><ellipse cx="1134" cy="142" rx="4.5" ry="7" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.6, phase: 0.1 }, `<rect x="1096" y="134" width="48" height="18" fill="#ffd56a"/><path d="M1098 143h12M1128 143h12" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`) +
      // Sunglasses on the sun: it is the beach.
      `<path d="M1094 136h52" stroke="${INK}" stroke-width="2.4"/>` +
      `<path d="M1096 136h20l-2 12q-8 4-16 0zM1124 136h20l-2 12q-8 4-16 0z" fill="#2b2b3a" fill-opacity="0.85" ${Ow(1.6)}/>` +
      `<path d="M1102 164q18 14 36 0" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>` +
      anim({ type: 'path', points: [[0, 0], [140, 0]], period: 38 }, puffCloud(260, 140, 1)) +
      anim({ type: 'path', points: [[0, 0], [-110, 0]], period: 30 }, puffCloud(700, 90, 0.75)) +
      keys(undefined, [{ t: 0, x: 0, y: 0 }, { t: 10, y: 20, ease: 'inOut' }, { t: 19.9, x: -1500, y: 0 }], [1460, 280],
        ([[1460, 280], [1484, 268], [1488, 292]] as [number, number][]).map(([fx, fy], i) => farBird(fx, fy, beat([fx, fy - 2], 0.55, i * 0.2))).join(''))
    const lighthouse =
      `<path d="M1210 472q30-34 70-38h160v38z" fill="#b9a27a" ${Ow(1.6)}/><path d="M1260 450q40-6 80-4" fill="none" stroke="#8f7a55" stroke-width="2"/>` +
      `<path d="M1307 436l4-76h18l4 76z" fill="#f4f1e8" ${Ow(1.6)}/><path d="M1309 410h22l1 14h-24zM1310 378h20l1 12h-22z" fill="#e63946"/>` +
      `<rect x="1306" y="346" width="28" height="14" fill="#ffe08a" ${Ow(1.4)}/><path d="M1304 346q16-16 32 0z" fill="#e63946" ${Ow(1.4)}/>` +
      anim({ type: 'blink', duty: 0.5, period: 2, phase: 0 }, `<path d="M1334 352l40-10v20zM1306 352l-40-10v20z" fill="#fff4b0" fill-opacity="0.6"/>`) +
      `<rect x="1317" y="396" width="6" height="8" rx="2" fill="${INK}"/>` +
      diff(1320, 418, 18, `<rect x="1317" y="414" width="6" height="8" rx="2" fill="${INK}"/>`, '')
    const island =
      `<path d="M880 472q50-22 100 0z" fill="#e3c98f" ${Ow(1.4)}/>` +
      `<path d="M930 466q-2-16 6-26" fill="none" stroke="#8a6236" stroke-width="3"/><path d="M936 440q-14-2-20 6M936 440q12-4 20 4M936 440q-4-10-14-12M936 440q8-8 18-6" fill="none" stroke="#3fa34a" stroke-width="3" stroke-linecap="round"/>`
    const sail = anim(
      { type: 'path', points: [[0, 0], [70, 0]], period: 24 },
      anim({ type: 'keys', period: 3, keys: [{ t: 0, rot: -2 }, { t: 1.5, rot: 2, ease: 'inOut' }], pivot: [560, 470] },
        `<path d="M536 466h48l-8 8h-32z" fill="#7a4a22" ${Ow(1.4)}/><path d="M560 466v-40" stroke="${INK}" stroke-width="2"/><path d="M562 430l18 32h-18z" fill="#fff" ${Ow(1.2)}/><path d="M558 434l-14 28h14z" fill="#4dabf7" ${Ow(1.2)}/>`),
    )
    let sparkles = ''
    for (let i = 0; i < 16; i++) {
      const sx = Math.round(rand() * W)
      const sy = Math.round(490 + rand() * 150)
      sparkles += anim({ type: 'blink', duty: 0.3, period: 1.6 + rand() * 1.6, phase: rand() }, `<path d="M${sx - 8} ${sy}h16" stroke="#fff" stroke-opacity="0.8" stroke-width="2.4" stroke-linecap="round"/>`)
    }
    const sea =
      `<rect y="470" width="${W}" height="${SHORE - 470 + 8}" fill="url(#c7-sea)"/>` +
      island + lighthouse + sail + sparkles

    // --- In B a dolphin leaps out of the sea during the chase. ---
    const DOLPHIN: [number, number] = [980, 586]
    const [dx, dy] = DOLPHIN
    const dolphin = diff(
      dx - 4,
      dy,
      34,
      '',
      keys('dolphin', [{ t: 0, x: -60, y: 50, rot: -60, o: 0, ease: 'step' }, { t: 10, o: 1, ease: 'out' }, { t: 10.7, x: -30, y: 4, rot: -30, ease: 'linear' }, { t: 11.2, x: 0, y: 0, rot: 0, ease: 'linear' }, { t: 11.7, x: 30, y: 4, rot: 30, ease: 'in' }, { t: 12.4, x: 60, y: 50, rot: 60, o: 1 }, { t: 12.45, o: 0, ease: 'step' }], DOLPHIN,
        `<path d="M${dx - 24} ${dy + 2}q20-18 46-4l-4 6q-20-6-42-2z" fill="#6f9fc0" ${Ow(1.6)}/><path d="M${dx - 2} ${dy - 8}l6-10l4 12z" fill="#6f9fc0" ${Ow(1.4)}/>` +
          `<path d="M${dx - 24} ${dy + 2}l-8-6l2 10l-6 6z" fill="#6f9fc0" ${Ow(1.4)}/><path d="M${dx - 16} ${dy + 4}q18-2 36-2" fill="none" stroke="#d6ecf7" stroke-width="3"/>` +
          `<circle cx="${dx + 14}" cy="${dy - 4}" r="1.6" fill="${INK}"/><path d="M${dx + 22} ${dy - 2}l6 2" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`),
      'dolphin',
      during(10, 12.45),
    )

    // --- The pier with its tall posts: the seagull's and the pelican's. ---
    let pier = ''
    for (let i = 0; i < 8; i++) {
      const px = 1120 + i * 50
      pier += `<rect x="${px - 6}" y="596" width="12" height="${SHORE - 596}" fill="url(#c7-wood)" ${Ow(1.6)}/>`
    }
    pier +=
      `<rect x="1100" y="586" width="340" height="12" fill="url(#c7-wood)" ${Ow(1.6)}/><path d="M1100 592h340" stroke="#6e4a26" stroke-opacity="0.4" stroke-width="1.4"/>` +
      `<rect x="1162" y="576" width="16" height="14" fill="url(#c7-wood)" ${Ow(1.6)}/><rect x="1322" y="576" width="16" height="14" fill="url(#c7-wood)" ${Ow(1.6)}/>` +
      anim({ type: 'keys', period: 3, keys: [{ t: 0, x: 0 }, { t: 1.5, x: 8, ease: 'inOut' }] }, `<path d="M1110 ${SHORE - 4}h320" stroke="#fff" stroke-opacity="0.6" stroke-width="3" stroke-dasharray="20 14"/>`)
    const pelican =
      `<path d="M1324 576v-8M1336 576v-8" stroke="#e8a33b" stroke-width="3" stroke-linecap="round"/>` +
      `<ellipse cx="1332" cy="554" rx="16" ry="15" fill="#f4f1e8" ${Ow(1.8)}/><path d="M1336 548q10 10 4 20q-10-2-12-14z" fill="#c9c3b4" ${Ow(1.4)}/>` +
      `<path d="M1322 548q-6-16 0-28" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M1322 548q-6-16 0-28" fill="none" stroke="#f4f1e8" stroke-width="6" stroke-linecap="round"/>` +
      `<circle cx="1324" cy="516" r="8" fill="#f4f1e8" ${Ow(1.6)}/>` +
      `<path d="M1318 516l-34 6q14 12 34 0z" fill="#f2b33a" ${Ow(1.4)}/><path d="M1318 520l-34 2" stroke="#d9822b" stroke-width="1.4"/>` +
      `<circle cx="1322" cy="513" r="1.6" fill="${INK}"/>` +
      blink(3.7, 0.4)(`<path d="M1319 513h6" stroke="#f4f1e8" stroke-width="4"/><path d="M1319 514h6" stroke="${INK}" stroke-width="1.2"/>`)

    // --- The sand: wet band, foam lapping, footprints, shells, a starfish (an arm fewer in B: a hard one). ---
    const sand =
      `<rect y="${SHORE}" width="${W}" height="${H - SHORE}" fill="url(#c7-sand)"/>` +
      `<path d="M0 ${SHORE}h${W}v34q-360 14-720 0t-720 4z" fill="#c9a86a" fill-opacity="0.55"/>` +
      anim({ type: 'keys', period: 4, keys: [{ t: 0, y: 0 }, { t: 2, y: 10, ease: 'inOut' }] },
        `<path d="M0 ${SHORE}q60 10 120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0t120 0v-8H0z" fill="#e8f7fb" ${Ow(1.4)}/>`)
    let decor = ''
    for (let i = 0; i < 12; i++) {
      const fx = 300 + i * 28
      const fy = 860 - i * 12 + (i % 2) * 8
      decor += `<ellipse cx="${fx}" cy="${fy}" rx="5" ry="3" fill="#c9a86a"/>`
    }
    const shell = (x: number, y: number, c: string) =>
      `<path d="M${x - 9} ${y}q9-16 18 0z" fill="${c}" ${Ow(1.3)}/><path d="M${x} ${y}l-4-10M${x} ${y}v-11M${x} ${y}l4-10" stroke="${INK}" stroke-opacity="0.5" stroke-width="1.2"/>`
    for (const [sx, sy, c] of [[180, 820, '#ffd1dc'], [560, 860, '#fff2d6'], [960, 850, '#ffe0b8'], [1240, 800, '#ffd1dc'], [1380, 870, '#fff2d6'], [90, 880, '#ffe0b8']] as [number, number, string][]) decor += shell(sx, sy, c)
    // Beach grass on a dune.
    decor += `<path d="M0 900v-70q80-30 170 10t60 60z" fill="#e8cf96" ${Ow(1.4)}/>`
    for (let i = 0; i < 8; i++) {
      const gx = 20 + i * 24
      decor += anim({ type: 'sway', angle: 8, pivot: [gx, 846], period: 2.2, phase: i / 8 }, `<path d="M${gx} 846q-4-20 2-38M${gx + 4} 846q4-18 12-28" fill="none" stroke="#7fa64a" stroke-width="3" stroke-linecap="round"/>`)
    }
    const STAR: [number, number] = [1080, 830]
    const arm = (a: number) => {
      const r = (a * Math.PI) / 180
      const ax = (d: number, w: number) => Math.round((STAR[0] + Math.cos(r) * d - Math.sin(r) * w) * 10) / 10
      const ay = (d: number, w: number) => Math.round((STAR[1] + Math.sin(r) * d + Math.cos(r) * w) * 10) / 10
      return `<path d="M${ax(4, -6)} ${ay(4, -6)}L${ax(20, 0)} ${ay(20, 0)}L${ax(4, 6)} ${ay(4, 6)}z" fill="#ff8a3a" ${Ow(1.4)}/>`
    }
    const starfish =
      [-18, 54, 126, 198].map(arm).join('') +
      diff(STAR[0] + 6, STAR[1] - 13, 18, arm(-90), '') +
      `<circle cx="${STAR[0]}" cy="${STAR[1]}" r="7" fill="#ff8a3a"/><circle cx="${STAR[0] - 2}" cy="${STAR[1] - 2}" r="1.4" fill="#fff"/><circle cx="${STAR[0] + 3}" cy="${STAR[1] + 2}" r="1.4" fill="#fff"/>`

    // --- Palms (a coconut fewer in B), the lifeguard tower with its lifebuoy (A only) and the game's owl on its roof. ---
    const coconut = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="7" fill="#7a4a22" ${Ow(1.4)}/><circle cx="${x - 2}" cy="${y - 2}" r="1.6" fill="#b07a44"/>`
    const palms =
      palmTree(90, 730, 1.05, crown(4.8, 2), 1, coconut(126, 518) + coconut(138, 522)) +
      palmTree(360, 712, 0.85, crown(5.2, 2, 'palm2'), 1, coconut(386, 540) + coconut(397, 544) + diff(404, 548, 18, coconut(406, 550), '', 'palm2'))
    const tower =
      groundShadow(232, 704, 50, 6) +
      `<path d="M206 702l10-102M256 702l-10-102M212 650h38M214 620h34" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M206 702l10-102M256 702l-10-102M212 650h38M214 620h34" stroke="#d9a066" stroke-width="3" stroke-linecap="round"/>` +
      `<rect x="194" y="592" width="74" height="9" fill="url(#c7-wood)" ${Ow(1.6)}/>` +
      `<rect x="204" y="554" width="54" height="38" fill="#f4f1e8" ${Ow(1.8)}/><rect x="212" y="562" width="18" height="16" fill="#9fd8f0" ${Ow(1.2)}/><path d="M236 556v34" stroke="#e63946" stroke-width="5"/>` +
      `<path d="M196 556l35-28l35 28z" fill="#e63946" ${O}/>` +
      anim({ type: 'sway', angle: 7, pivot: [231, 530], period: 3.6 }, keenOwl(231, 530, 0.9, blink(3.1, 0.3))) +
      diff(
        250,
        642,
        22,
        `<circle cx="250" cy="642" r="13" fill="none" stroke="${INK}" stroke-width="10"/><circle cx="250" cy="642" r="13" fill="none" stroke="#fff" stroke-width="7"/>` +
          `<path d="M240 633l5 5M260 633l-5 5M240 651l5-5M260 651l-5-5" stroke="#e63946" stroke-width="5"/>`,
        '',
      )

    // --- The umbrella (one panel red in A, green in B), the towel with a beach ball (A only), the bucket with a
    // spade (A only). ---
    const panel = (d: string, c: string) => `<path d="${d}" fill="${c}" ${Ow(1.8)}/>`
    const umbrella =
      groundShadow(480, 808, 70, 8) +
      `<path d="M410 824l120-26l12 36l-120 26z" fill="#4dabf7" ${Ow(1.6)}/><path d="M422 856l120-26M418 842l120-26" stroke="#fff" stroke-width="5"/>` +
      diff(522, 816, 22, `<circle cx="522" cy="816" r="12" fill="#fff" ${Ow(1.6)}/><path d="M512 810q10 6 20 0M514 822q8-6 16 2" fill="none" stroke="#e63946" stroke-width="3"/><path d="M522 804q-4 12 0 24" fill="none" stroke="#4dabf7" stroke-width="3"/>`, '') +
      `<path d="M480 812V656" stroke="${INK}" stroke-width="6"/><path d="M480 812V656" stroke="#f4f1e8" stroke-width="3"/>` +
      panel('M400 672q20-36 56-44q-12 22-16 50q-20-10-40-6z', '#e63946') +
      panel('M456 628q24-6 48 0q6 20 4 48q-26-10-52-2q-4-26 0-46z', '#fff') +
      diff(532, 653, 40, panel('M504 628q36 8 56 44q-20-4-40 6q-4-28-16-50z', '#e63946'), panel('M504 628q36 8 56 44q-20-4-40 6q-4-28-16-50z', '#52b788')) +
      `<circle cx="480" cy="624" r="4" fill="#e63946" ${Ow(1.2)}/>` +
      // Flip-flops and a sun cream.
      `<ellipse cx="370" cy="840" rx="7" ry="14" fill="#ffb703" ${Ow(1.4)}/><ellipse cx="388" cy="846" rx="7" ry="14" fill="#ffb703" ${Ow(1.4)}/>` +
      `<rect x="582" y="808" width="12" height="24" rx="4" fill="#ff6b9a" ${Ow(1.4)}/><rect x="584" y="802" width="8" height="7" fill="#fff" ${Ow(1.2)}/>`
    const bucket =
      groundShadow(614, 798, 18, 4) +
      diff(630, 751, 27, `<path d="M624 776l10-40" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M624 776l10-40" stroke="#ffd23f" stroke-width="2.6" stroke-linecap="round"/><path d="M630 738l10 2l-2-12z" fill="#ffd23f" ${Ow(1.2)}/>`, '') +
      `<path d="M600 772h28l-4 26h-20z" fill="#3a76d0" ${Ow(1.6)}/><path d="M602 772q12-20 24 0" fill="none" stroke="${INK}" stroke-width="1.6"/><path d="M604 782h20" stroke="#fff" stroke-opacity="0.4" stroke-width="3"/>`

    // --- The sandcastle: flattened by the wave. ---
    const [cx0, cy0] = CASTLE
    const crenels = (x0: number, x1: number, y: number) => {
      let m = ''
      for (let x = x0; x < x1 - 2; x += 8) m += `<rect x="${x}" y="${y - 6}" width="5" height="7" fill="url(#c7-castle)" ${Ow(1.2)}/>`
      return m
    }
    const castleBody =
      `<ellipse cx="${cx0}" cy="${cy0 - 2}" rx="74" ry="14" fill="url(#c7-castle)" ${Ow(1.8)}/>` +
      `<rect x="${cx0 - 50}" y="${cy0 - 36}" width="100" height="30" fill="url(#c7-castle)" ${Ow(1.8)}/>` + crenels(cx0 - 50, cx0 + 50, cy0 - 36) +
      `<rect x="${cx0 - 50}" y="${cy0 - 60}" width="26" height="54" fill="url(#c7-castle)" ${Ow(1.8)}/>` + crenels(cx0 - 50, cx0 - 24, cy0 - 60) +
      `<rect x="${cx0 + 24}" y="${cy0 - 60}" width="26" height="54" fill="url(#c7-castle)" ${Ow(1.8)}/>` + crenels(cx0 + 24, cx0 + 50, cy0 - 60) +
      `<rect x="${cx0 - 16}" y="${CASTLE_TOP}" width="32" height="78" fill="url(#c7-castle)" ${Ow(1.8)}/>` + crenels(cx0 - 16, cx0 + 16, CASTLE_TOP) +
      `<path d="M${cx0 - 8} ${cy0 - 6}v-12q8-10 16 0v12z" fill="#8a6a3e" ${Ow(1.4)}/>` +
      `<rect x="${cx0 - 4}" y="${CASTLE_TOP + 16}" width="8" height="10" rx="4" fill="#8a6a3e"/><rect x="${cx0 - 41}" y="${cy0 - 48}" width="7" height="9" rx="3.5" fill="#8a6a3e"/><rect x="${cx0 + 33}" y="${cy0 - 48}" width="7" height="9" rx="3.5" fill="#8a6a3e"/>` +
      `<path d="M${cx0 - 46} ${cy0 - 20}h12M${cx0 + 30} ${cy0 - 24}h14M${cx0 - 10} ${CASTLE_TOP + 40}h8" stroke="#b08a52" stroke-width="1.6"/>` +
      // Shells pressed into its walls.
      shell(cx0 - 30, cy0 - 14, '#ffd1dc') + shell(cx0 + 22, cy0 - 12, '#fff2d6')
    const heap =
      `<path d="M${cx0 - 84} ${cy0}q20-26 84-30q64 4 84 30z" fill="url(#c7-wet)" ${Ow(1.8)}/>` +
      `<path d="M${cx0 - 50} ${cy0 - 14}q10-6 20-2M${cx0 + 20} ${cy0 - 18}q14-2 24 6" fill="none" stroke="#a8874e" stroke-width="2"/>` + shell(cx0 + 30, cy0 - 8, '#fff2d6')
    const castle =
      once([{ t: 0, sx: 1, sy: 1, o: 1 }, { t: 16.9, ease: 'in' }, { t: 17.2, sx: 1.12, sy: 0.3, o: 1, ease: 'step' }, { t: 17.25, o: 0, ease: 'step' }], CASTLE, castleBody) +
      once(showIn([17.25, LOOP]), CASTLE, heap)
    const castleFlag = once(
      [{ t: 0, o: 0, sy: 1, ease: 'step' }, { t: 5.9, o: 1, sy: 0.3, ease: 'back' }, { t: 6.15, sy: 1, ease: 'step' }, { t: 8.45, o: 0, ease: 'step' }, { t: 16.3, o: 1, ease: 'step' }, { t: 16.95, o: 0 }],
      FLAG,
      flag(...FLAG),
    )
    // The flag dropped by the gull, lying on the sand until the crab picks it up; then stuck in the wet heap.
    const SAND_FLAG: [number, number] = [1006, 794]
    const droppedFlag = once(
      [{ t: 0, x: 22, y: -66, rot: 0, o: 0, ease: 'step' }, { t: 13.05, o: 1, ease: 'in' }, { t: 13.55, x: 0, y: 0, rot: 80, ease: 'step' }, { t: 14.2, o: 0, ease: 'step' }],
      SAND_FLAG,
      flag(...SAND_FLAG),
    )
    const heapFlag = once(showIn([17.25, LOOP]), [cx0 + 30, cy0 - 18], `<g transform="rotate(16 ${cx0 + 30} ${cy0 - 18})">${flag(cx0 + 30, cy0 - 18)}</g>`)

    // --- In B a hermit crab peeks out of its shell beside the castle while the crab builds. ---
    const HERMIT: [number, number] = [826, 778]
    const [hx, hy] = HERMIT
    const hermitShell = `<path d="M${hx - 14} ${hy}q0-24 22-22q10 4 6 22z" fill="#f2c38a" ${Ow(1.6)}/><path d="M${hx - 6} ${hy - 4}q2-12 12-12M${hx} ${hy - 2}q2-8 8-8" fill="none" stroke="#b07a44" stroke-width="1.6"/>`
    const hermit = diff(
      hx - 8,
      hy - 8,
      22,
      '',
      once([{ t: 0, x: 6, o: 0, ease: 'step' }, { t: 4.2, o: 1, ease: 'out' }, { t: 4.6, x: 0 }, { t: 5.9, ease: 'in' }, { t: 6.3, x: 6, o: 1 }, { t: 6.35, o: 0, ease: 'step' }], HERMIT,
        `<path d="M${hx - 14} ${hy - 2}l-6 3M${hx - 14} ${hy - 6}l-7-1" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>` +
          `<path d="M${hx - 13} ${hy - 8}l-4-8M${hx - 9} ${hy - 9}l-1-9" stroke="${INK}" stroke-width="1.6"/><circle cx="${hx - 17}" cy="${hy - 17}" r="2.6" fill="#fff" ${Ow(1)}/><circle cx="${hx - 10}" cy="${hy - 18}" r="2.6" fill="#fff" ${Ow(1)}/>` +
          `<circle cx="${hx - 17}" cy="${hy - 17}" r="1.1" fill="${INK}"/><circle cx="${hx - 10}" cy="${hy - 18}" r="1.1" fill="${INK}"/>` +
          `<ellipse cx="${hx - 18}" cy="${hy - 6}" rx="5" ry="3.5" fill="#e8594a" ${Ow(1.2)}/>`),
      undefined,
      during(4.2, 6.35),
    ) + hermitShell

    // --- The crab. ---
    const [kx, ky] = CRAB
    const legKeys = swingKeys(SCUTTLES, 0.09, 18)
    const legs = (flip: boolean) =>
      [0, 1, 2]
        .map((i) => {
          const s = flip ? 1 : -1
          const x0 = kx + s * (10 + i * 3)
          return keys(undefined, i % 2 ? swingKeys(SCUTTLES, 0.09, 18, true) : legKeys, [x0, ky - 10],
            `<path d="M${x0} ${ky - 10}q${s * 10} -4 ${s * 14} 10" fill="none" stroke="${INK}" stroke-width="4.4" stroke-linecap="round"/><path d="M${x0} ${ky - 10}q${s * 10} -4 ${s * 14} 10" fill="none" stroke="#e8594a" stroke-width="2.4" stroke-linecap="round"/>`)
        })
        .join('')
    const pincer = (px: number, py: number, s: number, snap: boolean) =>
      `<path d="M${px} ${py}q${s * 14} -4 ${s * 16} -16q-${s * 10} 0 -${s * 16} 8z" fill="url(#c7-crab)" ${Ow(1.6)}/>` +
      (snap
        ? anim({ type: 'keys', period: 0.5, keys: [{ t: 0, rot: 0 }, { t: 0.25, rot: s * -22, ease: 'inOut' }], pivot: [px, py] },
            `<path d="M${px} ${py}q${s * 4} -14 ${s * 14} -20q${s * 2} 8 -${s * 4} 16z" fill="url(#c7-crab)" ${Ow(1.4)}/>`)
        : `<path d="M${px} ${py}q${s * 4} -14 ${s * 14} -20q${s * 2} 8 -${s * 4} 16z" fill="url(#c7-crab)" ${Ow(1.4)}/>`)
    const PAT: Keyframe[] = []
    for (let t = 2.5; t < 5.7; t += 0.4) PAT.push({ t, rot: 0, ease: 'inOut' }, { t: t + 0.2, rot: 38, ease: 'inOut' })
    const WAVE_CLAWS = (up: number, down: number): Keyframe[] => Array.from({ length: 18 }, (_, i) => ({ t: 9.2 + i * 0.2, rot: i % 2 ? up : down, ease: 'inOut' as const }))
    const rightClawKeys: Keyframe[] = [
      { t: 0, rot: 0 }, ...PAT, { t: 5.75, rot: 0, ease: 'inOut' }, { t: 5.95, rot: -40 }, { t: 6.9, ease: 'inOut' }, { t: 7.1, rot: 0 }, { t: 9.1, ease: 'inOut' },
      ...WAVE_CLAWS(-40, -10),
      // The pinch.
      { t: 12.8, rot: -10, ease: 'in' }, { t: 12.9, rot: 46, ease: 'out' }, { t: 13.1, rot: 0, ease: 'inOut' },
      // Holding the flag up, planting it.
      { t: 14.2, rot: -20, ease: 'inOut' }, { t: 16.2, ease: 'inOut' }, { t: 16.3, rot: 30, ease: 'inOut' }, { t: 16.5, rot: -40 },
      // Drooping on the heap.
      { t: 17.4, ease: 'inOut' }, { t: 17.7, rot: 50 }, { t: 19.95, ease: 'step' },
    ]
    const leftClawKeys: Keyframe[] = [
      { t: 0, rot: 0 }, { t: 5.75, ease: 'inOut' }, { t: 5.95, rot: 40 }, { t: 6.9, ease: 'inOut' }, { t: 7.1, rot: 0 }, { t: 9.1, ease: 'inOut' },
      ...WAVE_CLAWS(10, 40),
      { t: 12.8, rot: 10, ease: 'inOut' }, { t: 13.1, rot: 0 }, { t: 16.3, ease: 'inOut' }, { t: 16.5, rot: 40 },
      { t: 17.4, ease: 'inOut' }, { t: 17.7, rot: -50 }, { t: 19.95, ease: 'step' },
    ]
    // The flag in its right claw, from picking it up until it is planted.
    const clawFlag = once(showIn([14.2, 16.3]), CRAB, flag(kx + 34, ky - 38))
    const claw = (s: number, k: Keyframe[], extra = '') =>
      keys(undefined, k, [kx + s * 16, ky - 16],
        `<path d="M${kx + s * 16} ${ky - 16}q${s * 10} -4 ${s * 16} -14" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M${kx + s * 16} ${ky - 16}q${s * 10} -4 ${s * 16} -14" fill="none" stroke="#e8594a" stroke-width="3.4" stroke-linecap="round"/>` +
          pincer(kx + s * 32, ky - 30, s, true) + extra)
    const ceye = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="4.4" fill="#fff" ${Ow(1.4)}/><circle cx="${x + 0.6}" cy="${y + 0.4}" r="2" fill="${INK}"/>`
    const crabEyes =
      `<path d="M${kx - 6} ${ky - 22}l-2-10M${kx + 6} ${ky - 22}l2-10" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/><path d="M${kx - 6} ${ky - 22}l-2-10M${kx + 6} ${ky - 22}l2-10" stroke="#e8594a" stroke-width="1.8" stroke-linecap="round"/>` +
      once(showIn([0, 7], [9.6, 17.5]), CRAB, ceye(kx - 8, ky - 34) + ceye(kx + 8, ky - 34)) +
      // Smug, eyes shut, while the gull steals the flag.
      once(showIn([7, 9]), CRAB, `<circle cx="${kx - 8}" cy="${ky - 34}" r="4.4" fill="#fff" ${Ow(1.4)}/><circle cx="${kx + 8}" cy="${ky - 34}" r="4.4" fill="#fff" ${Ow(1.4)}/><path d="M${kx - 11} ${ky - 33}q3-3 6 0M${kx + 5} ${ky - 33}q3-3 6 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`) +
      // Wide: the flag is gone!
      once(showIn([9, 9.6]), CRAB, `<circle cx="${kx - 8}" cy="${ky - 35}" r="6" fill="#fff" ${Ow(1.4)}/><circle cx="${kx + 8}" cy="${ky - 35}" r="6" fill="#fff" ${Ow(1.4)}/><circle cx="${kx - 8}" cy="${ky - 35}" r="1.6" fill="${INK}"/><circle cx="${kx + 8}" cy="${ky - 35}" r="1.6" fill="${INK}"/>` +
        `<path d="M${kx + 18} ${ky - 62}h6l-1 14h-4z" fill="#e63946" ${Ow(1.3)}/><circle cx="${kx + 21}" cy="${ky - 42}" r="2.6" fill="#e63946" ${Ow(1.2)}/>`) +
      // Grumpy, soaked.
      once(showIn([17.5, LOOP]), CRAB, ceye(kx - 8, ky - 34) + ceye(kx + 8, ky - 34) + `<path d="M${kx - 13} ${ky - 36}h10M${kx + 3} ${ky - 36}h10" stroke="#e8594a" stroke-width="4"/>`)
    const mouthC =
      once(showIn([0, 9], [13.1, 17.5]), CRAB, `<path d="M${kx - 5} ${ky - 14}q5 4 10 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`) +
      once(showIn([9, 13.1], [17.5, LOOP]), CRAB, `<path d="M${kx - 5} ${ky - 12}q5-4 10 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`)
    // Soaked: drips; a starfish washed onto its head.
    const drips = once(showIn([17.4, 19.9]), CRAB,
      [[-14, 0], [12, 0.4], [0, 0.8]].map(([ddx, phase]) => anim({ type: 'keys', period: 1.2, phase, keys: [{ t: 0, y: 0, o: 1 }, { t: 1.2, y: 16, o: 0 }], pivot: [kx + ddx, ky - 8] },
        `<path d="M${kx + ddx} ${ky - 12}q3 4 0 6q-3-2 0-6z" fill="#9fd8f0" ${Ow(0.8)}/>`)).join(''))
    const starHat = once(showIn([17.35, LOOP]), CRAB,
      `<g transform="rotate(-14 ${kx - 6} ${ky - 40})">${[0, 72, 144, 216, 288].map((a) => `<path transform="rotate(${a} ${kx - 6} ${ky - 40})" d="M${kx - 10} ${ky - 40}L${kx - 6} ${ky - 54}L${kx - 2} ${ky - 40}z" fill="#ffb84a" ${Ow(1.2)}/>`).join('')}` +
        `<circle cx="${kx - 6}" cy="${ky - 40}" r="5" fill="#ffb84a"/></g>`)
    const crab = keys('crab', crabKeys, CRAB,
      groundShadow(kx, ky, 26, 4) +
        legs(false) + legs(true) +
        claw(-1, leftClawKeys) +
        `<ellipse cx="${kx}" cy="${ky - 14}" rx="21" ry="13" fill="url(#c7-crab)" ${Ow(1.8)}/><path d="M${kx - 12} ${ky - 20}q12-6 24 0" fill="none" stroke="#fff" stroke-opacity="0.4" stroke-width="2.4" stroke-linecap="round"/>` +
        crabEyes + mouthC +
        claw(1, rightClawKeys, clawFlag) +
        drips + starHat)

    // --- The seagull. ---
    const [gx, gy] = GULL
    const gullHead = (open: boolean) =>
      `<circle cx="${gx - 16}" cy="${gy - 38}" r="10" fill="#fff" ${Ow(1.8)}/><circle cx="${gx - 19}" cy="${gy - 40}" r="1.8" fill="${INK}"/><path d="M${gx - 22} ${gy - 44}l6 2" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>` +
      (open
        ? `<path d="M${gx - 25} ${gy - 39}l-14-6l2 6zM${gx - 25} ${gy - 36}l-13 6l2-7z" fill="#ffd23f" ${Ow(1.4)}/>`
        : `<path d="M${gx - 25} ${gy - 39}l-14 2l14 4z" fill="#ffd23f" ${Ow(1.4)}/><circle cx="${gx - 34}" cy="${gy - 36}" r="1.6" fill="#e63946"/>`)
    const gullBody =
      `<path d="M${gx + 18} ${gy - 26}l16-4l-6 10z" fill="#9aa3ad" ${Ow(1.4)}/>` +
      `<ellipse cx="${gx + 2}" cy="${gy - 24}" rx="22" ry="12" fill="#fff" ${Ow(1.8)}/>`
    const legSwing = swingKeys([GULL_WALK], 0.15, 22)
    const gullStand =
      keys(undefined, legSwing, [gx - 2, gy - 14], `<path d="M${gx - 2} ${gy - 14}v14l-5 1" fill="none" stroke="#f08a3a" stroke-width="3" stroke-linecap="round"/>`) +
      keys(undefined, swingKeys([GULL_WALK], 0.15, 22, true), [gx + 6, gy - 14], `<path d="M${gx + 6} ${gy - 14}v14l-5 1" fill="none" stroke="#f08a3a" stroke-width="3" stroke-linecap="round"/>`) +
      gullBody +
      `<path d="M${gx - 6} ${gy - 28}q14-6 28 2q-12 8-28-2z" fill="#9aa3ad" ${Ow(1.4)}/>`
    const wing = (up: boolean) =>
      anim({ type: 'keys', period: 0.32, keys: [{ t: 0, sy: 1 }, { t: 0.16, sy: -0.6, ease: 'inOut' }], pivot: [gx + 2, gy - 28] },
        `<path d="M${gx - 6} ${gy - 28}q${up ? 6 : 10}-30 ${up ? 36 : 30}-34q-4 20-14 34z" fill="#c9ced6" ${Ow(1.6)}/>`)
    const gullFly = gullBody + wing(true) + `<path d="M${gx} ${gy - 14}l6 4M${gx + 6} ${gy - 14}l6 4" stroke="#f08a3a" stroke-width="3" stroke-linecap="round"/>`
    const beakFlag = once(showIn([8.45, 13.05]), GULL, `<g transform="rotate(-70 ${gx - 34} ${gy - 36})">${flag(gx - 34, gy - 32)}</g>`)
    const feathers = once(showIn([12.95, 13.9]), [gx, gy - 24],
      [[-20, -30], [16, -40], [30, -14], [-30, -6]].map(([fx, fy], i) => anim({ type: 'keys', period: 0.95, phase: 0, keys: [{ t: 0, x: 0, y: 0, rot: 0, o: 1 }, { t: 0.95, x: fx, y: fy + 30, rot: 160 + i * 30, o: 0 }], pivot: [gx, gy - 24] },
        `<path d="M${gx - 6} ${gy - 24}q6-6 12 0q-6 4-12 0z" fill="#fff" ${Ow(1)}/>`)).join(''))
    const gull = keys('gull', gullKeys, GULL,
      once(showIn([0, 6.4], [7.6, 12.95]), GULL, gullStand) +
        once(showIn([6.4, 7.6], [12.95, LOOP]), GULL, gullFly) +
        once(showIn([0, 12.95], [13.9, LOOP]), GULL, gullHead(false)) +
        once(showIn([12.95, 13.9]), GULL, gullHead(true)) +
        beakFlag) + feathers

    // --- The wave rolling in over the castle. ---
    const WAVE: [number, number] = [740, SHORE]
    const wave = once(
      [{ t: 0, sy: 0.05, o: 0, ease: 'step' }, { t: 16.6, o: 1, ease: 'out' }, { t: 17, sy: 1 }, { t: 17.2, ease: 'in' }, { t: 17.7, sy: 0.05, o: 0.6 }, { t: 17.75, o: 0, ease: 'step' }],
      WAVE,
      `<path d="M560 ${SHORE}h360q10 70-30 130q-30 14-60 0q-30 14-60 0q-30 14-60 0q-30 14-60 0q-30 14-60 0q-40-60-30-130z" fill="#7fd3e6" fill-opacity="0.85" ${Ow(1.8)}/>` +
        `<path d="M596 ${SHORE + 126}q30 14 60 0t60 0t60 0t60 0t60 0" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`,
    )

    // --- In B a fish flops on the wet sand after the wave. ---
    const FLOP: [number, number] = [806, 782]
    const flop = diff(
      FLOP[0],
      FLOP[1] - 8,
      24,
      '',
      once(showIn([17.6, 19.8]), FLOP,
        anim({ type: 'keys', period: 0.7, id: 'flop', keys: [{ t: 0, y: 0, rot: -20 }, { t: 0.35, y: -10, rot: 20, ease: 'inOut' }], pivot: FLOP }, fish(FLOP[0], FLOP[1] - 6, 0.8, '#f7a440'))),
      'flop',
      during(17.6, 19.8),
    )

    // --- Sandpipers running along the foam. ---
    const sandpiper = (x: number, y: number) =>
      `<path d="M${x - 2} ${y}v-6M${x + 2} ${y}v-6" stroke="${INK}" stroke-width="1.4"/><ellipse cx="${x}" cy="${y - 9}" rx="7" ry="4.5" fill="#b59a7a" ${Ow(1.3)}/><circle cx="${x - 6}" cy="${y - 13}" r="3.4" fill="#b59a7a" ${Ow(1.2)}/><path d="M${x - 9} ${y - 13}l-6 1" stroke="${INK}" stroke-width="1.4"/>`
    const sandpipers = [300, 330, 352]
      .map((x, i) => anim({ type: 'keys', period: 5, phase: i * 0.08, keys: [{ t: 0, x: 0 }, { t: 2.3, x: -90, ease: 'inOut' }, { t: 2.5, sx: 1 }, { t: 4.8, x: 0, ease: 'inOut' }], pivot: [x, SHORE + 18] }, sandpiper(x, SHORE + 18)))
      .join('')

    return (
      `<defs>${NATURE_DEFS}${BEACH_DEFS}` +
      `<linearGradient id="c7-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#58b4ee"/><stop offset="0.7" stop-color="#a8dcf5"/><stop offset="1" stop-color="#e6f6fb"/></linearGradient>` +
      `<radialGradient id="c7-glow"><stop offset="0" stop-color="#fff4cc" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffe9a8" stop-opacity="0.4"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c7-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f7fb8"/><stop offset="0.6" stop-color="#2fb3c9"/><stop offset="1" stop-color="#7fd9d6"/></linearGradient>` +
      `<linearGradient id="c7-sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3c98f"/><stop offset="1" stop-color="#f3e2b4"/></linearGradient>` +
      `<linearGradient id="c7-castle" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3dca6"/><stop offset="1" stop-color="#d6b273"/></linearGradient>` +
      `<linearGradient id="c7-wet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfae70"/><stop offset="1" stop-color="#b08a52"/></linearGradient>` +
      `<linearGradient id="c7-wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a6236"/><stop offset="1" stop-color="#c49462"/></linearGradient>` +
      `<radialGradient id="c7-crab" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#ff9a7a"/><stop offset="0.55" stop-color="#e8594a"/><stop offset="1" stop-color="#b03328"/></radialGradient>` +
      `<radialGradient id="c7-sunlight" cx="0.78" cy="0.15" r="1"><stop offset="0" stop-color="#fff2c4" stop-opacity="0.3"/><stop offset="0.5" stop-color="#fff2c4" stop-opacity="0.06"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></radialGradient></defs>` +
      sky +
      sea +
      dolphin +
      pier +
      pelican +
      sand +
      sandpipers +
      decor +
      starfish +
      palms +
      tower +
      umbrella +
      bucket +
      castle +
      castleFlag +
      heapFlag +
      hermit +
      droppedFlag +
      crab +
      gull +
      wave +
      flop +
      `<rect width="${W}" height="${H}" fill="url(#c7-sunlight)"/>`
    )
  },
})
