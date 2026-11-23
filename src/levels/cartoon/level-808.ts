// Cartoon "The runaway cheese" (docs/cartoon-mode.md), made like 812: a 20 s story on an alpine meadow told by a
// camera. A goat by the chalet eyes the cheese wheel on the bench, backs up and butts it — off it rolls down the
// slope, bouncing, past the startled cow, who runs after it with her bell clanging and has to stop at the brook while
// the wheel leaps across. An eagle swoops, grabs it, finds it far too heavy and drops it — plop, into the marmots'
// burrow, where the marmots have a feast. Ten differences: two hard (the stamp on a cheese by the door, an edelweiss
// at the marmots' rock), three events of the story.
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { butterflyAt, farBird, grassTuft, groundShadow, INK, keenOwl, NATURE_DEFS, Ow, puffCloud } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

/** The meadow: a flat terrace by the chalet, then the slope down to the right. */
const groundY = (x: number) => (x < 480 ? 600 : Math.round((600 + (x - 480) * 0.219) * 10) / 10)

const WIDE = { x: 70, y: 86, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // A look along the chalet: its windows, the chopping block, the cheeses, the owl under the roof.
  { t: 1.6, x: 20, y: 340, w: 480, ease: 'inOut' },
  { t: 4.2, x: 150, y: 360, w: 480, ease: 'step' },
  // The goat and the cheese wheel on the bench.
  { t: 4.25, x: 290, y: 430, w: 320, ease: 'step' },
  // Down the slope after the rolling wheel, past the cow.
  { t: 6, x: 380, y: 400, w: 520, ease: 'linear' },
  { t: 9.4, x: 820, y: 480, w: 520, ease: 'step' },
  // Over the brook.
  { t: 9.45, x: 860, y: 520, w: 520, ease: 'step' },
  // The eagle.
  { t: 11.3, x: 860, y: 390, w: 560, ease: 'step' },
  // Plop: into the burrow.
  { t: 13.9, x: 1000, y: 600, w: 440, ease: 'step' },
  // The marmots' feast.
  { t: 15.6, x: 1100, y: 650, w: 320, ease: 'linear' },
  { t: 19.95, x: 1110, y: 656, w: 304, ease: 'step' },
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

/** The goat's feet, by the bench; it faces right, to the cheese. */
const GOAT: [number, number] = [370, 600]
const goatKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, rot: 0 },
  // Backs up, lowers its head — and charges.
  { t: 4.6, ease: 'inOut' },
  { t: 5, x: -16, rot: 10, ease: 'inOut' },
  { t: 5.3, ease: 'in' },
  { t: 5.6, x: 42, rot: 10, ease: 'out' },
  { t: 5.75, x: 30, rot: 0, ease: 'inOut' },
  { t: 19.95, ease: 'step' },
]

/** The eagle's talons, soaring high; offsets below drive the cheese while it is carried. */
const EAGLE: [number, number] = [900, 230]
const CARRY: Keyframe[] = [
  { t: 11.7, x: 280, y: 479, ease: 'out' },
  { t: 12.2, x: 290, y: 430, ease: 'inOut' },
  { t: 12.6, x: 300, y: 452, ease: 'inOut' },
  { t: 13, x: 315, y: 360, ease: 'inOut' },
  { t: 13.4, x: 325, y: 384, ease: 'inOut' },
  { t: 13.8, x: 340, y: 270, ease: 'in' },
]
const eagleKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, sx: 1, o: 1, ease: 'inOut' },
  { t: 5.4, x: 260, y: 24, sx: 1, ease: 'inOut' },
  { t: 5.8, sx: -1, ease: 'inOut' },
  { t: 10.9, x: 40, y: 0, sx: -1, ease: 'inOut' },
  { t: 11.1, sx: 1, ease: 'in' },
  ...CARRY,
  // Lets go, and away it flies.
  { t: 14, x: 360, y: 240, ease: 'in' },
  { t: 15.1, x: 700, y: -300, o: 1, ease: 'step' },
  { t: 15.15, o: 0, ease: 'step' },
]

/** The cheese wheel standing on the bench (its center). */
const CHEESE: [number, number] = [470, 562]
const R = 22
/** Offset of the wheel rolling on the meadow at x. */
const onGround = (x: number) => ({ x: x - CHEESE[0], y: Math.round(groundY(x) - R - CHEESE[1]) })
/** Turns as it rolls (degrees per unit). */
const SPIN = 180 / Math.PI / R
function cheeseKeys(): Keyframe[] {
  const k: Keyframe[] = [{ t: 0, x: 0, y: 0, rot: 0, sy: 1 }, { t: 5.6, ease: 'in' }]
  // Off the bench and down the slope, hopping over two bumps.
  for (let i = 0; i <= 12; i++) {
    const x = 520 + 40 * i
    const p = onGround(x)
    k.push({ t: Math.round((5.9 + i * 0.3) * 100) / 100, x: p.x, y: p.y - (i === 4 || i === 8 ? 24 : 0), rot: Math.round((x - CHEESE[0]) * SPIN), ease: 'linear' })
  }
  // The leap over the brook, and a slowing roll on the far bank.
  const land = onGround(1120)
  const stop = onGround(1180)
  k.push(
    { t: 9.5, ease: 'out' },
    { t: 10.05, x: 590, y: 610 - CHEESE[1], rot: Math.round(560 * SPIN) + 180, ease: 'in' },
    { t: 10.6, x: land.x, y: land.y, rot: Math.round(650 * SPIN) + 360, ease: 'out' },
    { t: 11.6, x: stop.x, y: stop.y, rot: Math.round(710 * SPIN) + 360, ease: 'linear' },
  )
  // Carried by the eagle: the wheel hangs under its talons.
  for (const c of CARRY) k.push({ t: c.t, x: 430 + (c.x as number), y: (c.y as number) - 310, ease: c.ease })
  // Dropped into the burrow: a squash, and it stays there.
  k.push({ t: 13.9, ease: 'in' }, { t: 14.4, x: 800, y: 236, sy: 1, ease: 'out' }, { t: 14.5, sy: 0.82, ease: 'inOut' }, { t: 14.65, sy: 1, ease: 'step' })
  return k
}

/** The cow's feet, grazing on the slope; she faces left. */
const COW: [number, number] = [800, 670]
const COW_RUN: [number, number] = [8.6, 10.4]
const cowKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, sx: 1, rot: 0 },
  // The wheel rolls past: a jump, a turn, a run after it — to the brook.
  { t: 7.9, ease: 'out' },
  { t: 8.1, y: -14, ease: 'in' },
  { t: 8.25, y: 0, ease: 'inOut' },
  { t: 8.4, sx: 1, ease: 'inOut' },
  { t: 8.6, sx: -1, ease: 'linear' },
  ...Array.from({ length: 9 }, (_, i) => ({ t: Math.round((8.8 + i * 0.2) * 100) / 100, x: Math.round((190 * (i + 1)) / 9), y: Math.round((42 * (i + 1)) / 9) - (i % 2 ? 0 : 8), ease: 'linear' as const })),
  { t: 10.4, x: 190, y: 42, rot: 0, ease: 'out' },
  { t: 10.6, x: 196, rot: -8, ease: 'inOut' },
  { t: 10.85, rot: 0 },
  { t: 19.95, ease: 'step' },
]

/** The marmots' rock and burrows. */
const ROCK: [number, number] = [1140, 812]
const HOLE_A: [number, number] = [1206, 800]
const HOLE_B: [number, number] = [1270, 812]
const HOLE_C: [number, number] = [1350, 826]

export default svgLevel({
  id: 808,
  chapter: 'cartoon',
  title: 'cartoonRunawayCheese',
  parTimeSec: 100,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const beat = (pivot: [number, number], every: number, phase = 0) => (m: string) =>
      anim({ type: 'keys', period: every, phase, keys: [{ t: 0, sy: 1 }, { t: every / 2, sy: 0.3, ease: 'inOut' }], pivot }, m)
    const sway = (period: number, angle = 1.5) => (pivot: [number, number], m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 11) / 11 }, m)
    const blink = (period: number, phase = 0) => (m: string) => anim({ type: 'blink', duty: 0.07, period, phase }, m)

    // --- Alpine trees and flowers. ---
    /** A larch on (x, y): a slim trunk, soft drooping tiers of light green needles, little pink cones. */
    const larch = (x: number, y: number, s: number) => {
      const k = (n: number) => Math.round(n * s * 10) / 10
      let tiers = ''
      for (let i = 0; i < 7; i++) {
        const ty = y - k(50 + i * 26)
        const w = k(62 - i * 8)
        tiers +=
          `<path d="M${x - w} ${ty + k(10)}q${w * 0.4}-${k(22)} ${w} -${k(22)}q${w * 0.6} 0 ${w} ${k(22)}q-${w * 0.5} ${k(6)}-${w} ${k(2)}q-${w * 0.5} ${k(4)}-${w} -${k(2)}z" fill="url(#c11-larch)" ${Ow(1.6)}/>` +
          `<path d="M${x - w * 0.7} ${ty + k(6)}l${k(4)} ${k(6)}M${x - w * 0.2} ${ty + k(8)}l${k(2)} ${k(6)}M${x + w * 0.4} ${ty + k(7)}l-${k(2)} ${k(6)}" stroke="#6a9a2e" stroke-width="${k(1.6)}" stroke-linecap="round"/>`
      }
      const cones = [[-k(20), -k(90)], [k(16), -k(130)], [-k(8), -k(170)]].map(([dx, dy]) => `<ellipse cx="${x + dx}" cy="${y + dy}" rx="${k(3)}" ry="${k(4.5)}" fill="#c9767a" ${Ow(1)}/>`).join('')
      return (
        groundShadow(x - k(20), y, k(64), k(9)) +
        `<path d="M${x - k(5)} ${y}l${k(3)}-${k(230)}h${k(4)}l${k(3)} ${k(230)}z" fill="url(#ke-bark)" ${Ow(1.6)}/>` +
        sway(4.8, 1.4)([x, y], tiers + cones)
      )
    }
    /** A tall dark spruce on (x, y) with brown cones hanging from its tiers. */
    const spruce = (x: number, y: number, s: number) => {
      const k = (n: number) => Math.round(n * s * 10) / 10
      let tiers = ''
      for (let i = 0; i < 6; i++) {
        const ty = y - k(30 + i * 40)
        const w = k(56 - i * 8)
        tiers += `<path d="M${x} ${ty - k(54)}l${w} ${k(54)}q-${w * 0.5} ${k(8)}-${w} ${k(2)}q-${w * 0.5} ${k(6)}-${w} -${k(2)}z" fill="url(#c11-spruce)" ${Ow(1.8)}/>`
      }
      const cones = [[k(26), -k(64)], [-k(30), -k(100)], [k(18), -k(150)]].map(([dx, dy]) => `<ellipse cx="${x + dx}" cy="${y + dy}" rx="${k(3.5)}" ry="${k(7)}" fill="#8a5a2e" ${Ow(1.1)}/>`).join('')
      return (
        groundShadow(x - k(20), y, k(60), k(9)) +
        `<rect x="${x - k(6)}" y="${y - k(30)}" width="${k(12)}" height="${k(30)}" fill="url(#ke-bark)" ${Ow(1.6)}/>` +
        sway(5.2, 1)([x, y - k(30)], tiers + cones)
      )
    }
    /** An edelweiss on (x, y): woolly white star, yellow middle. */
    const edelweiss = (x: number, y: number) =>
      `<path d="M${x} ${y}v-10" stroke="#7fa64a" stroke-width="2"/>` +
      [0, 60, 120, 180, 240, 300].map((a) => `<ellipse transform="rotate(${a} ${x} ${y - 12})" cx="${x}" cy="${y - 18}" rx="2.6" ry="5.5" fill="#f4f4ee" ${Ow(0.9)}/>`).join('') +
      `<circle cx="${x}" cy="${y - 12}" r="2.8" fill="#e8d25a" ${Ow(0.8)}/>`
    const gentian = (x: number, y: number) =>
      `<path d="M${x} ${y}v-8" stroke="#4f8a33" stroke-width="2"/><path d="M${x - 5} ${y - 20}q5 4 10 0l-2 12h-6z" fill="#2d5fd6" ${Ow(1.1)}/>`
    const alpineRose = (x: number, y: number) =>
      `<path d="M${x - 8} ${y}q8-10 16 0z" fill="#3f7d34" ${Ow(1)}/>` + [[-4, -4], [3, -6], [0, -1]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="3" fill="#ff6fa0" ${Ow(0.8)}/>`).join('')

    // --- Sky, sun, the peaks with snow and haze, a far spruce forest, the hills. ---
    let farForest = ''
    for (let i = 0; i < 40; i++) {
      const fx = Math.round(i * 37 + rand() * 20)
      const fy = Math.round(500 + Math.sin(i * 0.4) * 14 + rand() * 10)
      const h = Math.round(26 + rand() * 18)
      farForest += `<path d="M${fx} ${fy - h}l${Math.round(h * 0.32)} ${h}h-${Math.round(h * 0.64)}z" fill="#3f6f55" fill-opacity="0.8"/>`
    }
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c11-sky)"/>` +
      `<circle cx="1250" cy="120" r="180" fill="url(#c11-glow)"/>` +
      `<circle cx="1250" cy="120" r="42" fill="#ffd56a" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="1237" cy="113" rx="4.2" ry="6.5" fill="${INK}"/><ellipse cx="1263" cy="113" rx="4.2" ry="6.5" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.3, phase: 0.6 }, `<rect x="1228" y="105" width="44" height="16" fill="#ffd56a"/><path d="M1230 114h11M1259 114h11" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<path d="M1234 134q16 12 32 0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
      anim({ type: 'path', points: [[0, 0], [140, 0]], period: 36 }, puffCloud(260, 110, 0.9)) +
      anim({ type: 'path', points: [[0, 0], [-110, 0]], period: 30 }, puffCloud(820, 80, 0.7)) +
      // The peaks: rock, snow caps, a glacier.
      `<path d="M-20 470l140-200l70 80l110-190l120 160l60-60l150 210l120-170l140 150l90-90l160 190l110-120l150 160V560H-20z" fill="url(#c11-peak)" ${Ow(1.6)}/>` +
      `<path d="M120 270l-34 48l20-6l14 14l14-18l22 8zM300 160l-40 56l22-8l18 16l16-20l26 10zM590 300l-36 50l20-8l18 12l14-18l22 6zM860 300l-36 52l22-8l14 14l16-18l20 8zM1140 280l-34 48l20-8l14 12l14-16l22 8z" fill="#f6f8fb" ${Ow(1.4)}/>` +
      `<path d="M300 216q10 60-4 130q20-40 40-70z" fill="#dff0fa" fill-opacity="0.8"/>` +
      `<rect y="380" width="${W}" height="200" fill="url(#c11-haze)"/>` +
      // A chamois on a ledge.
      `<path d="M694 392h40" stroke="#8a7a66" stroke-width="5" stroke-linecap="round"/><path d="M704 390v-10M722 390v-10" stroke="${INK}" stroke-width="2"/><ellipse cx="713" cy="376" rx="12" ry="6" fill="#8a5a32"/><circle cx="726" cy="368" r="4.5" fill="#8a5a32"/><path d="M726 364q2-6-1-8M729 364q2-6-1-8" fill="none" stroke="${INK}" stroke-width="1.4"/>` +
      `<path d="M0 560q240-70 480-40t480-20t480-10V${H}H0z" fill="url(#c11-hill)"/>` +
      farForest +
      keys(undefined, [{ t: 0, x: 0, y: 0 }, { t: 10, y: -20, ease: 'inOut' }, { t: 19.9, x: -1600, y: 0 }], [1500, 300],
        ([[1500, 300], [1522, 290], [1526, 312]] as [number, number][]).map(([fx, fy], i) => farBird(fx, fy, beat([fx, fy - 2], 0.5, i * 0.2))).join(''))

    // --- The meadow, the brook, flowers and grass. ---
    const ground =
      `<path d="M0 600H480L${W} ${groundY(W)}V${H}H0z" fill="url(#c11-meadow)" ${Ow(1.4)}/>` +
      `<path d="M0 640H500L${W} 850" fill="none" stroke="#6f9a3a" stroke-opacity="0.35" stroke-width="3"/>`
    const brook =
      `<path d="M1016 ${groundY(1016) - 4}q30 40 20 110t40 ${H - groundY(1016) - 110}h50q-40-80-28-150t-22-80z" fill="url(#c11-water)" ${Ow(1.6)}/>` +
      anim({ type: 'keys', period: 1.2, keys: [{ t: 0, y: 0, o: 1 }, { t: 1.2, y: 60, o: 0.2 }] }, `<path d="M1040 724q4 14-2 26M1062 760q4 14-2 26M1050 800q4 14-2 26" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<ellipse cx="1042" cy="736" rx="10" ry="6" fill="#9aa0a8" ${Ow(1.4)}/><ellipse cx="1074" cy="846" rx="12" ry="7" fill="#9aa0a8" ${Ow(1.4)}/>`
    let meadow = ''
    const ZONES: [number, number][] = [[190, 512], [234, 586], [306, 594], [661, 622], [760, 690], [1104, 804], [1350, 812], [1270, 772]]
    for (let i = 0; i < 60; i++) {
      const fx = Math.round(rand() * W)
      const fy = Math.round(groundY(fx) + 14 + rand() * (H - groundY(fx) - 20))
      if (ZONES.some(([zx, zy]) => Math.hypot(fx - zx, fy - zy) < 46)) continue
      if (fx > 1000 && fx < 1110) continue
      const kind = i % 4
      meadow += kind === 0
        ? anim({ type: 'sway', angle: 7, pivot: [fx, fy], period: 2.4, phase: (fx % 13) / 13 }, grassTuft(fx, fy))
        : anim({ type: 'sway', angle: 5, pivot: [fx, fy], period: 2.8, phase: (fx % 7) / 7 }, kind === 1 ? gentian(fx, fy) : kind === 2 ? alpineRose(fx, fy) : edelweiss(fx, fy))
    }

    // --- The chalet: log walls, two windows with flower boxes (the left one's shutters green in A, red in B), the door,
    // the chimney's smoke, the game's owl under the roof; the chopping block (its axe in A only), the woodpile, two
    // cheeses on a board by the door (a stamp on the lower one in A only: a hard one). ---
    const shutters = (x: number, c: string) =>
      `<rect x="${x - 29}" y="495" width="14" height="34" fill="${c}" ${Ow(1.4)}/><rect x="${x + 15}" y="495" width="14" height="34" fill="${c}" ${Ow(1.4)}/>` +
      `<path d="M${x - 26} 502h8M${x - 26} 512h8M${x - 26} 522h8M${x + 18} 502h8M${x + 18} 512h8M${x + 18} 522h8" stroke="#000" stroke-opacity="0.2" stroke-width="1.6"/>`
    const window_ = (x: number) =>
      `<rect x="${x - 15}" y="497" width="30" height="30" fill="#bfe3f2" ${Ow(1.6)}/><path d="M${x} 497v30M${x - 15} 512h30" stroke="${INK}" stroke-width="1.6"/>` +
      `<rect x="${x - 20}" y="528" width="40" height="9" fill="#8f5d2e" ${Ow(1.4)}/>` +
      [-14, -6, 2, 10].map((dx) => `<circle cx="${x + dx + 2}" cy="526" r="4" fill="#e63946" ${Ow(0.9)}/>`).join('') +
      `<path d="M${x - 16} 528q4-6 8 0M${x + 6} 528q4-6 8 0" fill="#3f8f3a"/>`
    let logs = ''
    for (let y = 478; y < 596; y += 12) logs += `<path d="M140 ${y}h220" stroke="#7a4a22" stroke-opacity="0.45" stroke-width="1.6"/>`
    const chalet =
      groundShadow(250, 602, 130, 10) +
      `<rect x="134" y="588" width="232" height="14" fill="#9aa0a8" ${Ow(1.6)}/>` +
      `<rect x="140" y="470" width="220" height="120" fill="url(#c11-logs)" ${Ow(2)}/>` + logs +
      window_(190) + window_(310) +
      diff(190, 512, 35, shutters(190, '#3f8f3a'), shutters(190, '#d9442e')) + shutters(310, '#3f8f3a') +
      `<rect x="232" y="538" width="36" height="52" fill="#8f5d2e" ${Ow(1.8)}/><path d="M250 548l-5-5a3 3 0 0 1 5-3a3 3 0 0 1 5 3z" fill="#3a2414"/><circle cx="261" cy="566" r="2" fill="#ffd23f"/>` +
      // The roof with its gable.
      `<path d="M140 470l110-60l110 60z" fill="url(#c11-logs)" ${Ow(1.8)}/>` +
      anim({ type: 'sway', angle: 7, pivot: [250, 468], period: 3.6 }, keenOwl(250, 468, 0.85, blink(3.1, 0.3))) +
      `<path d="M318 426v-30h18v40" fill="#9aa0a8" ${Ow(1.6)}/>` +
      [0, 0.8, 1.6].map((phase) => anim({ type: 'keys', period: 2.4, phase, keys: [{ t: 0, x: 0, y: 0, o: 0.9, sx: 1, sy: 1 }, { t: 2.4, x: 18, y: -60, o: 0, sx: 2, sy: 2 }], pivot: [327, 392] }, `<circle cx="327" cy="392" r="6" fill="#f4f4f4" fill-opacity="0.85"/>`)).join('') +
      `<path d="M100 474l150-82l150 82l-12 6l-138-74l-138 74z" fill="url(#c11-roof)" ${Ow(2)}/>` +
      `<path d="M130 466l120-64M160 470l90-48M370 466l-120-64M340 470l-90-48" stroke="#5e3a1c" stroke-opacity="0.35" stroke-width="2"/>`
    const woodpile =
      [[112, 596], [128, 596], [144, 596], [120, 582], [136, 582], [128, 568]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="#c48f55" ${Ow(1.4)}/><circle cx="${x}" cy="${y}" r="3" fill="none" stroke="#8f5d2e" stroke-width="1.2"/>`).join('')
    const block =
      groundShadow(218, 616, 22, 4) +
      `<path d="M202 600v14q16 6 32 0v-14z" fill="url(#ke-bark)" ${Ow(1.6)}/><ellipse cx="218" cy="600" rx="16" ry="5" fill="#d9b27a" ${Ow(1.4)}/>` +
      diff(234, 586, 20, `<path d="M228 598l18-26" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M228 598l18-26" stroke="#c48f55" stroke-width="3" stroke-linecap="round"/><path d="M220 590l10 10l6-8l-10-8z" fill="#9aa6b6" ${Ow(1.4)}/>`, '')
    const wheel = (x: number, y: number) =>
      `<path d="M${x - 22} ${y}v12q22 9 44 0v-12z" fill="url(#c11-rind)" ${Ow(1.6)}/><ellipse cx="${x}" cy="${y}" rx="22" ry="6" fill="#ffe08a" ${Ow(1.6)}/>`
    const cheeses =
      `<rect x="274" y="600" width="52" height="5" fill="#8f5d2e" ${Ow(1.2)}/>` + wheel(300, 588) + wheel(300, 574) +
      diff(306, 594, 18, `<circle cx="306" cy="594" r="3.6" fill="none" stroke="#c0392b" stroke-width="1.6"/>`, '')

    // --- The bench and the runaway wheel; the signpost on the slope (its lower arrow in A only). ---
    const bench =
      groundShadow(450, 604, 56, 5) +
      `<path d="M408 588v14M492 588v16" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M408 588v14M492 588v16" stroke="#8f5d2e" stroke-width="2.6" stroke-linecap="round"/>` +
      `<rect x="400" y="582" width="100" height="8" rx="2" fill="url(#c11-logs)" ${Ow(1.6)}/>`
    const [chx, chy] = CHEESE
    const cheese = keys('cheese', cheeseKeys(), CHEESE,
      `<circle cx="${chx}" cy="${chy}" r="${R}" fill="url(#c11-cheese)" ${Ow(2)}/><circle cx="${chx}" cy="${chy}" r="${R - 4}" fill="none" stroke="#d99a2a" stroke-width="2"/>` +
        `<circle cx="${chx - 7}" cy="${chy - 6}" r="3.4" fill="#e8b84a"/><circle cx="${chx + 8}" cy="${chy + 2}" r="2.6" fill="#e8b84a"/><circle cx="${chx - 2}" cy="${chy + 9}" r="2" fill="#e8b84a"/>` +
        `<path d="M${chx - 3} ${chy - R + 2}h6" stroke="#c0392b" stroke-width="3"/>`)
    const sign =
      groundShadow(680, 646, 14, 3) +
      `<rect x="677" y="590" width="7" height="56" fill="#8f5d2e" ${Ow(1.4)}/>` +
      `<path d="M684 596h34l8 6l-8 6h-34z" fill="#ffd23f" ${Ow(1.4)}/><path d="M690 602h12" stroke="#e63946" stroke-width="3"/><path d="M702 602h10" stroke="#fff" stroke-width="3"/>` +
      diff(661, 622, 22, `<path d="M677 616h-30l-8 6l8 6h30z" fill="#ffd23f" ${Ow(1.4)}/><path d="M671 622h-12" stroke="#e63946" stroke-width="3"/><path d="M659 622h-10" stroke="#fff" stroke-width="3"/>`, '')

    // --- The goat (its beard in A only). ---
    const [gx, gy] = GOAT
    const goatLeg = (x: number) => `<path d="M${x} ${gy - 22}v20" stroke="${INK}" stroke-width="6.4" stroke-linecap="round"/><path d="M${x} ${gy - 22}v19" stroke="#e9e6dd" stroke-width="3.6" stroke-linecap="round"/><path d="M${x - 2} ${gy - 2}h4" stroke="#3a3a3a" stroke-width="3"/>`
    const goat = keys('goat', goatKeys, GOAT,
      groundShadow(gx, gy, 34, 5) +
        goatLeg(gx - 22) + goatLeg(gx - 12) + goatLeg(gx + 8) + goatLeg(gx + 18) +
        `<path d="M${gx - 30} ${gy - 36}l-6-8l8 2z" fill="#f4f1e8" ${Ow(1.4)}/>` +
        `<ellipse cx="${gx - 3}" cy="${gy - 30}" rx="28" ry="14" fill="url(#c11-goat)" ${Ow(1.8)}/>` +
        `<path d="M${gx + 14} ${gy - 36}q8-6 12-16l8 4q-4 12-12 18z" fill="url(#c11-goat)" ${Ow(1.6)}/>` +
        anim({ type: 'keys', period: 0.7, keys: [{ t: 0, rot: 0 }, { t: 0.35, rot: 4, ease: 'inOut' }], pivot: [gx + 22, gy - 46] },
          `<path d="M${gx + 22} ${gy - 60}q-6-10-18-10q-6 0-6 6q10-2 16 8z" fill="#b8a88a" ${Ow(1.4)}/>` +
            `<ellipse cx="${gx + 28}" cy="${gy - 50}" rx="9" ry="13" transform="rotate(-35 ${gx + 28} ${gy - 50})" fill="url(#c11-goat)" ${Ow(1.6)}/>` +
            `<path d="M${gx + 18} ${gy - 56}l-10 2l8 4z" fill="#e9e6dd" ${Ow(1.2)}/><circle cx="${gx + 27}" cy="${gy - 54}" r="1.8" fill="${INK}"/><circle cx="${gx + 36}" cy="${gy - 43}" r="1.4" fill="${INK}"/>` +
            diff(gx + 32, gy - 34, 18, `<path d="M${gx + 29} ${gy - 41}q2 10 6 14q2-8-1-15z" fill="#e9e6dd" ${Ow(1.3)}/>`, '', 'goat')))

    // --- The cow with her bell (big in A, small in B). ---
    const [cx, cy] = COW
    const cowLeg = (x: number, k: Keyframe[]) =>
      keys(undefined, k, [x, cy - 24], `<path d="M${x} ${cy - 26}v24" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${x} ${cy - 26}v23" stroke="#f4f1e8" stroke-width="6" stroke-linecap="round"/><path d="M${x - 3} ${cy - 2}h6" stroke="#3a3a3a" stroke-width="4"/>`)
    const runLeg = (flip: boolean): Keyframe[] => [{ t: 0, rot: 0 }, { t: COW_RUN[0], ease: 'inOut' }, ...Array.from({ length: 9 }, (_, i) => ({ t: Math.round((COW_RUN[0] + 0.1 + i * 0.2) * 100) / 100, rot: (i % 2 ? 22 : -22) * (flip ? -1 : 1), ease: 'inOut' as const })), { t: 10.4, rot: 0, ease: 'step' }]
    const bell = (w: number, h: number) =>
      anim({ type: 'keys', period: 0.6, keys: [{ t: 0, rot: -12 }, { t: 0.3, rot: 12, ease: 'inOut' }], pivot: [cx - 28, cy - 40] },
        `<path d="M${cx - 28} ${cy - 40}v4" stroke="${INK}" stroke-width="2"/><path d="M${cx - 28 - w / 2} ${cy - 36 + h}q0-${h} ${w / 2}-${h}q${w / 2} 0 ${w / 2} ${h}z" fill="#f2c94c" ${Ow(1.4)}/><circle cx="${cx - 28}" cy="${cy - 35 + h}" r="${Math.max(1.6, w / 7)}" fill="#8a5a2e"/>`)
    const cow = keys('cow', cowKeys, COW,
      groundShadow(cx + 10, cy, 56, 7) +
        cowLeg(cx + 40, runLeg(false)) + cowLeg(cx - 14, runLeg(true)) +
        anim({ type: 'keys', period: 2.2, keys: [{ t: 0, rot: -8 }, { t: 1.1, rot: 10, ease: 'inOut' }], pivot: [cx + 58, cy - 54] },
          `<path d="M${cx + 58} ${cy - 54}q12 10 8 30" fill="none" stroke="${INK}" stroke-width="2.4"/><path d="M${cx + 66} ${cy - 26}l-4 10l8-4z" fill="#5e3a1c"/>`) +
        `<ellipse cx="${cx + 14}" cy="${cy - 44}" rx="46" ry="24" fill="#f4f1e8" ${Ow(2)}/>` +
        `<path d="M${cx + 4} ${cy - 64}q20-4 26 10q-6 14-24 8q-8-10-2-18zM${cx + 40} ${cy - 50}q14 0 16 12q-6 10-16 4z" fill="#8a5a32"/>` +
        `<ellipse cx="${cx + 24}" cy="${cy - 22}" rx="9" ry="5" fill="#f5a3b8" ${Ow(1.2)}/>` +
        cowLeg(cx + 28, runLeg(true)) + cowLeg(cx - 2, runLeg(false)) +
        `<path d="M${cx - 30} ${cy - 46}q4 10 10 10" fill="none" stroke="#8a5a2e" stroke-width="3"/>` +
        diff(cx - 28, cy - 30, 20, bell(16, 16), bell(8, 9), 'cow') +
        `<path d="M${cx - 48} ${cy - 74}l-6-8M${cx - 30} ${cy - 76}l4-8" stroke="#e9dcc0" stroke-width="4" stroke-linecap="round"/>` +
        `<ellipse cx="${cx - 38}" cy="${cy - 58}" rx="15" ry="18" fill="#8a5a32" ${Ow(1.8)}/><path d="M${cx - 54} ${cy - 66}l-10-2l8 8zM${cx - 24} ${cy - 68}l10-4l-6 10z" fill="#8a5a32" ${Ow(1.3)}/>` +
        `<ellipse cx="${cx - 42}" cy="${cy - 44}" rx="12" ry="8" fill="#f5b6c4" ${Ow(1.4)}/><circle cx="${cx - 46}" cy="${cy - 44}" r="1.6" fill="${INK}"/><circle cx="${cx - 38}" cy="${cy - 44}" r="1.6" fill="${INK}"/>` +
        `<circle cx="${cx - 44}" cy="${cy - 62}" r="2.6" fill="${INK}"/><circle cx="${cx - 32}" cy="${cy - 62}" r="2.6" fill="${INK}"/><circle cx="${cx - 43}" cy="${cy - 63}" r="0.8" fill="#fff"/><circle cx="${cx - 31}" cy="${cy - 63}" r="0.8" fill="#fff"/>` +
        // The clang of the bell as she runs.
        once(showIn([8.6, 10.6]), COW, anim({ type: 'blink', duty: 0.5, period: 0.4 }, `<path d="M${cx - 46} ${cy - 24}l-8 4M${cx - 46} ${cy - 30}l-10-2M${cx - 10} ${cy - 24}l8 4" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`)))

    // --- In B a stoat pops up from the grass to watch the wheel go by. ---
    const STOAT: [number, number] = [760, 712]
    const [sx, sy] = STOAT
    const stoat = diff(
      sx,
      sy - 22,
      26,
      '',
      keys('stoat', [{ t: 0, y: 34, o: 0, sx: 1, ease: 'step' }, { t: 6.6, o: 1, ease: 'out' }, { t: 6.9, y: 0, ease: 'step' }, { t: 7.3, sx: 1, ease: 'inOut' }, { t: 7.45, sx: -1, ease: 'step' }, { t: 7.8, sx: -1, ease: 'inOut' }, { t: 7.9, sx: 1, ease: 'in' }, { t: 8.15, y: 34, o: 1, ease: 'step' }, { t: 8.2, o: 0, ease: 'step' }], STOAT,
        `<path d="M${sx - 6} ${sy}q-14-4-12-14" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${sx - 6} ${sy}q-14-4-12-14" fill="none" stroke="#a0683a" stroke-width="3" stroke-linecap="round"/><circle cx="${sx - 18}" cy="${sy - 15}" r="3" fill="${INK}"/>` +
          `<path d="M${sx - 7} ${sy}q-2-26 6-34q8 8 6 34z" fill="#a0683a" ${Ow(1.6)}/><path d="M${sx - 1} ${sy - 4}q-2-18 2-26q4 8 2 26z" fill="#f4e9d0"/>` +
          `<circle cx="${sx}" cy="${sy - 38}" r="7" fill="#a0683a" ${Ow(1.5)}/><circle cx="${sx - 4}" cy="${sy - 44}" r="2.6" fill="#a0683a" ${Ow(1)}/><circle cx="${sx + 4}" cy="${sy - 44}" r="2.6" fill="#a0683a" ${Ow(1)}/>` +
          `<circle cx="${sx + 3}" cy="${sy - 39}" r="1.4" fill="${INK}"/><circle cx="${sx + 7}" cy="${sy - 36}" r="1.2" fill="${INK}"/><path d="M${sx + 1} ${sy - 33}q4 2 7 0" fill="#f4e9d0"/>`),
      'stoat',
      during(6.6, 8.2),
    )
    const stoatGrass = `<path d="M${sx - 18} ${sy + 4}q2-16 0-22M${sx - 10} ${sy + 4}q2-20 6-26M${sx - 2} ${sy + 4}q-2-16 4-22M${sx + 6} ${sy + 4}q2-18 8-22M${sx + 14} ${sy + 4}q0-14 4-18" fill="none" stroke="#3f8f3a" stroke-width="3" stroke-linecap="round"/>`

    // --- The marmots' rock (an edelweiss at its foot in A only: a hard one), their burrows, the sentinel; in B a
    // second marmot whistles at its burrow as the wheel comes; the marmots' feast. ---
    const marmot = (x: number, y: number) =>
      `<ellipse cx="${x}" cy="${y - 18}" rx="12" ry="18" fill="url(#c11-marmot)" ${Ow(1.6)}/><ellipse cx="${x}" cy="${y - 14}" rx="7" ry="11" fill="#d9c09a"/>` +
      `<circle cx="${x}" cy="${y - 38}" r="9" fill="url(#c11-marmot)" ${Ow(1.5)}/><circle cx="${x - 7}" cy="${y - 45}" r="2.6" fill="#8a6a4a" ${Ow(1)}/><circle cx="${x + 7}" cy="${y - 45}" r="2.6" fill="#8a6a4a" ${Ow(1)}/>` +
      `<circle cx="${x - 3.5}" cy="${y - 40}" r="1.6" fill="${INK}"/><circle cx="${x + 3.5}" cy="${y - 40}" r="1.6" fill="${INK}"/><ellipse cx="${x}" cy="${y - 34}" rx="4" ry="3" fill="#d9c09a"/><circle cx="${x}" cy="${y - 35}" r="1.2" fill="${INK}"/>` +
      `<path d="M${x - 1.2} ${y - 32}v3M${x + 1.2} ${y - 32}v3" stroke="#fff" stroke-width="1.6"/>` +
      `<path d="M${x - 8} ${y - 22}q4 4 6 0M${x + 2} ${y - 22}q4 4 6 0" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`
    const hole = ([x, y]: [number, number]) => `<ellipse cx="${x}" cy="${y + 2}" rx="26" ry="9" fill="#a08a5e" ${Ow(1.6)}/><ellipse cx="${x}" cy="${y}" rx="17" ry="5.5" fill="#2e1a0c"/>`
    const holeLip = ([x, y]: [number, number]) => `<path d="M${x - 26} ${y + 2}q26 14 52 0q-26 8-52 0z" fill="#a08a5e" ${Ow(1.4)}/>`
    const [rx, ry] = ROCK
    const whistle = (x: number, y: number) => anim({ type: 'blink', duty: 0.5, period: 0.5 }, `<path d="M${x + 8} ${y - 38}q8-4 10 2M${x + 10} ${y - 44}q10-6 14 2" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`)
    const rock =
      groundShadow(rx, ry, 40, 6) +
      `<path d="M${rx - 32} ${ry}q-4-26 18-32q24-6 40 8q10 14 4 24z" fill="url(#c11-rock)" ${Ow(1.8)}/><path d="M${rx - 18} ${ry - 26}q10-4 20 0" fill="none" stroke="#6a9a2e" stroke-width="4" stroke-linecap="round"/>` +
      diff(rx - 36, ry - 8, 18, edelweiss(rx - 36, ry - 2), '')
    // The sentinel on the rock, looking about; whistles as the wheel lands and as it drops.
    const sentinel =
      anim({ type: 'keys', period: 4, keys: [{ t: 0, sx: 1 }, { t: 1.8, sx: 1, ease: 'inOut' }, { t: 2, sx: -1 }, { t: 3.8, sx: -1, ease: 'inOut' }], pivot: [rx, ry - 30] }, marmot(rx, ry - 30)) +
      once(showIn([10.6, 11.4], [14.2, 15]), [rx, ry - 30], whistle(rx, ry - 30))
    const [hcx, hcy] = HOLE_C
    const whistler = diff(
      hcx + 4,
      hcy - 28,
      32,
      '',
      keys('whistler', [{ t: 0, y: 46, o: 0, ease: 'step' }, { t: 9.6, o: 1, ease: 'out' }, { t: 9.9, y: 0, ease: 'step' }, { t: 11.2, ease: 'in' }, { t: 11.55, y: 46, o: 1, ease: 'step' }, { t: 11.6, o: 0, ease: 'step' }], HOLE_C,
        `<g clip-path="url(#c11-hole-c)">${marmot(hcx, hcy)}${whistle(hcx, hcy)}</g>`),
      'whistler',
      during(9.6, 11.6),
    )
    const feaster = (from: [number, number], to: [number, number], flip: boolean) => {
      const [fx, fy] = from
      return once(
        [{ t: 0, x: 0, y: 20, sx: flip ? -1 : 1, o: 0, ease: 'step' }, { t: 15.6, o: 1, ease: 'out' }, { t: 15.9, y: 0, ease: 'inOut' }, { t: 16.4, x: to[0] - fx, y: to[1] - fy, ease: 'step' }, { t: 19.95, ease: 'step' }],
        from,
        anim({ type: 'keys', period: 0.4, keys: [{ t: 0, rot: 0 }, { t: 0.2, rot: flip ? -10 : 10, ease: 'inOut' }], pivot: [fx, fy - 20] }, marmot(fx, fy)),
      )
    }
    const feast = feaster(HOLE_A, [1244, 814], false) + feaster(HOLE_C, [1298, 822], true)
    // Bites out of the wheel in the hole.
    const bites = once(showIn([16.8, LOOP]), HOLE_B, `<circle cx="1256" cy="778" r="6" fill="#8fbf5a"/><circle cx="1284" cy="780" r="5" fill="#8fbf5a"/>`)
    // In B a butterfly settles on the wheel while the marmots eat.
    const BUTTERFLY: [number, number] = [1270, 772]
    const butterfly = diff(
      BUTTERFLY[0],
      BUTTERFLY[1],
      22,
      '',
      once(showIn([16.2, 19.6]), BUTTERFLY,
        butterflyAt(BUTTERFLY[0], BUTTERFLY[1], ['#fbfbf6', '#e63946'], (m) => anim({ type: 'keys', period: 1.1, keys: [{ t: 0, sx: 1 }, { t: 0.55, sx: 0.35, ease: 'inOut' }], pivot: BUTTERFLY }, m))),
      undefined,
      during(16.2, 19.6),
    )

    // --- The eagle. ---
    const [ex, ey] = EAGLE
    const wing = (period: number) =>
      anim({ type: 'keys', period, keys: [{ t: 0, sy: 1 }, { t: period / 2, sy: -0.5, ease: 'inOut' }], pivot: [ex - 2, ey - 28] },
        `<path d="M${ex - 8} ${ey - 28}q-10-30-44-46q8 10 4 14q-10-2-14 2q10 6 8 12q-8 0-10 6q20 16 56 14z" fill="url(#c11-eagle)" ${Ow(1.6)}/>`)
    const eagle = keys('eagle', eagleKeys, EAGLE,
      `<path d="M${ex - 26} ${ey - 24}l-18-6l2 10l-4 8l20-4z" fill="#6e4224" ${Ow(1.4)}/>` +
        `<ellipse cx="${ex - 4}" cy="${ey - 22}" rx="26" ry="11" fill="url(#c11-eagle)" ${Ow(1.8)}/>` +
        once(showIn([0, 11.6], [14, LOOP]), EAGLE, wing(1.2)) + once(showIn([11.6, 14]), EAGLE, wing(0.3)) +
        `<circle cx="${ex + 20}" cy="${ey - 28}" r="8.5" fill="#d9a052" ${Ow(1.6)}/><circle cx="${ex + 22}" cy="${ey - 30}" r="1.8" fill="${INK}"/><path d="M${ex + 16} ${ey - 34}l8 2" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>` +
        `<path d="M${ex + 27} ${ey - 31}q8 0 6 8q-2-3-6-3z" fill="#ffd23f" ${Ow(1.3)}/>` +
        `<path d="M${ex - 6} ${ey - 12}v8l-3 3M${ex + 2} ${ey - 12}v8l3 3" fill="none" stroke="#e8a33b" stroke-width="3" stroke-linecap="round"/>` +
        // Straining under the load.
        once(showIn([12, 13.9]), EAGLE, anim({ type: 'blink', duty: 0.5, period: 0.5 }, `<path d="M${ex + 30} ${ey - 44}q4-6 8-2M${ex + 34} ${ey - 50}q4-6 8-2" fill="none" stroke="#7fd3e6" stroke-width="2" stroke-linecap="round"/>`)))

    // --- Life: butterflies over the flowers. ---
    const flap = (pivot: [number, number], phase: number) => (m: string) =>
      anim({ type: 'keys', period: 0.3, phase, keys: [{ t: 0, sx: 1 }, { t: 0.15, sx: 0.3, ease: 'inOut' }], pivot }, m)
    const butterflies = ([[560, 690, '#fbfbf6', '#e63946', 9], [880, 760, '#ffd23f', '#f2a93b', 11], [1180, 860, '#a5d8ff', '#4d96e6', 8]] as [number, number, string, string, number][])
      .map(([x, y, c1, c2, period], i) => anim({ type: 'path', points: [[0, 0], [50, -40], [110, 10], [50, 30]], period, phase: i * 0.3 }, butterflyAt(x, y, [c1, c2], flap([x, y], i * 0.1))))
      .join('')

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c11-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fa3e6"/><stop offset="0.7" stop-color="#a9d6f2"/><stop offset="1" stop-color="#e3f2f8"/></linearGradient>` +
      `<radialGradient id="c11-glow"><stop offset="0" stop-color="#fff4cc" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffe9a8" stop-opacity="0.35"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c11-peak" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8b96a8"/><stop offset="1" stop-color="#b8c2cf"/></linearGradient>` +
      `<linearGradient id="c11-haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3f2f8" stop-opacity="0"/><stop offset="1" stop-color="#e3f2f8" stop-opacity="0.7"/></linearGradient>` +
      `<linearGradient id="c11-hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb86a"/><stop offset="1" stop-color="#6aa95a"/></linearGradient>` +
      `<linearGradient id="c11-meadow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a6d06a"/><stop offset="0.6" stop-color="#8fbf5a"/><stop offset="1" stop-color="#74a646"/></linearGradient>` +
      `<linearGradient id="c11-water" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7fd3e6"/><stop offset="1" stop-color="#4fa3c6"/></linearGradient>` +
      `<linearGradient id="c11-larch" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d4ef8a"/><stop offset="0.6" stop-color="#9ccf52"/><stop offset="1" stop-color="#6a9e35"/></linearGradient>` +
      `<linearGradient id="c11-spruce" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f8a5a"/><stop offset="0.6" stop-color="#2f6b3f"/><stop offset="1" stop-color="#1e4a2c"/></linearGradient>` +
      `<linearGradient id="c11-logs" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a0683a"/><stop offset="1" stop-color="#c98f55"/></linearGradient>` +
      `<linearGradient id="c11-roof" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a5a32"/><stop offset="1" stop-color="#5e3a1c"/></linearGradient>` +
      `<linearGradient id="c11-rind" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2c94c"/><stop offset="1" stop-color="#d99a2a"/></linearGradient>` +
      `<radialGradient id="c11-cheese" cx="0.62" cy="0.3" r="0.85"><stop offset="0" stop-color="#fff0a8"/><stop offset="0.55" stop-color="#f7d25a"/><stop offset="1" stop-color="#e0a53a"/></radialGradient>` +
      `<radialGradient id="c11-goat" cx="0.62" cy="0.3" r="0.85"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d9d4c8"/></radialGradient>` +
      `<radialGradient id="c11-marmot" cx="0.62" cy="0.3" r="0.85"><stop offset="0" stop-color="#b59a76"/><stop offset="1" stop-color="#7a5e40"/></radialGradient>` +
      `<radialGradient id="c11-rock" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#c3c7cc"/><stop offset="1" stop-color="#8a9098"/></radialGradient>` +
      `<radialGradient id="c11-eagle" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#a0683a"/><stop offset="1" stop-color="#5e3a1c"/></radialGradient>` +
      `<radialGradient id="c11-sunlight" cx="0.87" cy="0.1" r="1"><stop offset="0" stop-color="#fff2c4" stop-opacity="0.3"/><stop offset="0.5" stop-color="#fff2c4" stop-opacity="0.06"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></radialGradient>` +
      `<clipPath id="c11-hole-c"><rect x="${hcx - 40}" y="${hcy - 80}" width="80" height="80"/></clipPath></defs>` +
      sky +
      ground +
      brook +
      spruce(60, 604, 1.15) +
      larch(560, groundY(560), 1) +
      spruce(900, groundY(900), 1) +
      larch(1300, groundY(1300), 0.95) +
      spruce(1410, groundY(1410) + 6, 0.9) +
      meadow +
      woodpile +
      chalet +
      block +
      cheeses +
      bench +
      sign +
      cow +
      stoat +
      stoatGrass +
      rock +
      hole(HOLE_A) + hole(HOLE_B) + hole(HOLE_C) +
      sentinel +
      whistler +
      cheese +
      holeLip(HOLE_B) +
      bites +
      feast +
      holeLip(HOLE_A) + holeLip(HOLE_C) +
      butterfly +
      goat +
      eagle +
      butterflies +
      `<rect width="${W}" height="${H}" fill="url(#c11-sunlight)"/>`
    )
  },
})
