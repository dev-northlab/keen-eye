// Cartoon "The circus seal" (docs/cartoon-mode.md), made like 812: a 20 s story under a big top, told by a camera. A
// seal on its tub balances a ball on its nose to a drumroll; a poodle wobbles in on a unicycle and bumps the tub — the
// ball flies off: bonk on the sleeping lion's head, ding on the trapeze, BOOM on the drum, and plop into the popcorn
// bucket up on the platform, which tips over and rains popcorn on the seal; it catches what it can in its mouth. Then
// the ball drops out of the bucket — right back onto its nose — and the seal takes a bow. Twelve differences: two hard
// (a star on the ring's curb, a stud on the drum's rim), three events of B (the lion opening one eye, a mouse peeking
// from behind the drum, a parrot on the trapeze), seven others where the story happens.
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { groundShadow, INK, keenOwl, NATURE_DEFS, O, Ow } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // The stands with their mice, the ringmaster's hat (the owl on it), the poodle, the sleeping lion, to the seal.
  { t: 1.6, x: 40, y: 500, w: 480, ease: 'linear' },
  { t: 2.8, x: 60, y: 500, w: 480, ease: 'inOut' },
  { t: 4.2, x: 420, y: 480, w: 480, ease: 'step' },
  // The seal balancing the ball; the poodle wobbles in.
  { t: 4.25, x: 520, y: 500, w: 400, ease: 'linear' },
  { t: 6, x: 500, y: 500, w: 400, ease: 'step' },
  // Bonk on the lion's head.
  { t: 6.05, x: 300, y: 520, w: 400, ease: 'linear' },
  { t: 7.2, x: 310, y: 520, w: 400, ease: 'step' },
  // Ding on the trapeze.
  { t: 7.25, x: 470, y: 320, w: 500, ease: 'linear' },
  { t: 8.3, x: 480, y: 320, w: 500, ease: 'step' },
  // BOOM on the drum, plop into the popcorn bucket.
  { t: 8.35, x: 700, y: 365, w: 620, ease: 'linear' },
  { t: 10.35, x: 720, y: 365, w: 620, ease: 'step' },
  // Popcorn rain over the seal.
  { t: 10.4, x: 450, y: 420, w: 540, ease: 'linear' },
  { t: 12.5, x: 460, y: 420, w: 540, ease: 'step' },
  // Crunching popcorn.
  { t: 12.55, x: 540, y: 490, w: 400, ease: 'linear' },
  { t: 15, x: 545, y: 490, w: 400, ease: 'step' },
  // The ball drops out of the bucket — back onto its nose.
  { t: 15.05, x: 640, y: 380, w: 760, ease: 'inOut' },
  { t: 17.5, x: 600, y: 380, w: 760, ease: 'step' },
  // The bow.
  { t: 17.55, x: 470, y: 440, w: 560, ease: 'linear' },
  { t: 19.95, x: 480, y: 445, w: 540, ease: 'step' },
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

/** The seal's tub: its top at (TUB[0], TUB[1]). */
const TUB: [number, number] = [720, 700]
/** The ball on the seal's nose. */
const BALL: [number, number] = [777, 578]
/** Where the ball hits: the lion's head, the trapeze bar, the drum, the bucket (offsets from BALL), with the tops of
 * the arcs between. */
const at = (x: number, y: number) => ({ x: x - BALL[0], y: y - BALL[1] })
const ballKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, rot: 0, o: 1 },
  { t: 6, ease: 'out' },
  { t: 6.45, ...at(640, 410), ease: 'in' },
  { t: 7, ...at(520, 650), ease: 'out' },
  { t: 7.55, ...at(600, 350), ease: 'in' },
  { t: 8.2, ...at(722, 450), ease: 'out' },
  { t: 8.65, ...at(870, 360), ease: 'in' },
  { t: 9.2, ...at(958, 676), ease: 'out' },
  { t: 9.7, ...at(1000, 300), ease: 'in' },
  { t: 10.2, ...at(1012, 420), o: 1, ease: 'step' },
  { t: 10.25, o: 0, ease: 'step' },
  // Out of the tipped bucket and back onto the nose.
  { t: 15.5, ...at(990, 430), o: 1, ease: 'out' },
  { t: 16, ...at(880, 300), ease: 'in' },
  { t: 16.5, x: 0, y: 0, ease: 'step' },
  // Kept on the nose through the bow.
  { t: 17.6, ease: 'inOut' },
  { t: 18.1, x: 45, y: 37, ease: 'inOut' },
  { t: 18.6, x: 0, y: 0 },
  { t: 19.95, ease: 'step' },
]
const sealKeys: Keyframe[] = [
  { t: 0, rot: 0 },
  { t: 5.95, ease: 'inOut' },
  { t: 6.1, rot: -8, ease: 'inOut' },
  { t: 6.3, rot: 7, ease: 'inOut' },
  { t: 6.5, rot: -4, ease: 'inOut' },
  { t: 6.7, rot: 0 },
  { t: 17.6, ease: 'inOut' },
  { t: 18.1, rot: 25, ease: 'inOut' },
  { t: 18.6, rot: 0 },
  { t: 19.95, ease: 'step' },
]

/** The poodle's unicycle wheel touches the floor here at first. */
const POODLE: [number, number] = [300, 782]
const RIDE: Keyframe[] = Array.from({ length: 16 }, (_, i) => {
  const t = Math.round(i * 4) / 10
  return { t, x: t < 4.6 ? 0 : Math.round((350 * (t - 4.6)) / 1.4), y: 0, rot: i % 2 ? -5 : 5, ease: 'inOut' as const }
})
const poodleKeys: Keyframe[] = [
  ...RIDE,
  // Bump into the tub: off the seat, onto the floor, dazed.
  { t: 6.05, x: 344, y: -6, rot: -24, ease: 'out' },
  { t: 6.4, x: 300, y: 38, rot: -10, ease: 'out' },
  ...Array.from({ length: 22 }, (_, i) => ({ t: Math.round((6.9 + i * 0.6) * 100) / 100, rot: i % 2 ? -10 : -4, ease: 'inOut' as const })),
  { t: 19.95, ease: 'step' },
]
const cycleKeys: Keyframe[] = [
  ...RIDE,
  // It rolls on back across the ring and falls over.
  { t: 6.05, x: 352, rot: 6, ease: 'out' },
  { t: 7.4, x: -40, rot: 0, ease: 'in' },
  { t: 7.7, x: -70, rot: -90, ease: 'step' },
]

export default svgLevel({
  id: 825,
  chapter: 'cartoon',
  title: 'cartoonCircusSeal',
  parTimeSec: 120,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const blink = (period: number, phase = 0) => (m: string) => anim({ type: 'blink', duty: 0.07, period, phase }, m)
    /** A spiky starburst of `n` points around (cx, cy). */
    const star = (cx: number, cy: number, r0: number, r1: number, n: number, fill: string) => {
      let d = ''
      for (let i = 0; i < n * 2; i++) {
        const a = (i * Math.PI) / n - Math.PI / 2
        const r = i % 2 ? r0 : r1
        d += `${i ? 'L' : 'M'}${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`
      }
      return `<path d="${d}z" fill="${fill}" ${Ow(1.8)}/>`
    }
    /** An impact: a starburst popping at (cx, cy) at time t. */
    const impact = (cx: number, cy: number, t: number, s = 1, fill = '#ffe066') =>
      once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t, o: 1, ease: 'out' }, { t: t + 0.12, sx: 1.15, sy: 1.15, ease: 'inOut' }, { t: t + 0.3, sx: 1, sy: 1, o: 1, ease: 'step' }, { t: t + 0.34, o: 0, ease: 'step' }], [cx, cy],
        star(cx, cy, 14 * s, 34 * s, 10, fill) + star(cx, cy, 7 * s, 18 * s, 10, '#fff'))
    /** Ringing lines round (cx, cy) from time t. */
    const rings = (cx: number, cy: number, t: number, r: number) =>
      once(showIn([t, t + 0.6]), [cx, cy],
        anim({ type: 'keys', period: 0.6, keys: [{ t: 0, sx: 0.5, sy: 0.5, o: 1 }, { t: 0.6, sx: 1.5, sy: 1.5, o: 0 }], pivot: [cx, cy] },
          `<path d="M${cx - r} ${cy - 10}q-8 10 0 20M${cx + r} ${cy - 10}q8 10 0 20M${cx - r - 10} ${cy - 16}q-10 16 0 32M${cx + r + 10} ${cy - 16}q10 16 0 32" fill="none" stroke="#fff4c0" stroke-width="3" stroke-linecap="round"/>`))

    // --- The big top: striped canvas, the back wall with its trim, poles, bunting and bulbs, the curtain. ---
    let stripes = ''
    for (let i = 0, x = -240; x < W + 240; x += 120, i++) {
      stripes += `<path d="M720 -260L${x} 560h120z" fill="${i % 2 ? 'url(#c25-cream)' : 'url(#c25-red)'}"/>`
    }
    let scallops = ''
    for (let x = 0; x < W; x += 40) scallops += `<path d="M${x} 520q20 22 40 0" fill="#f2b33a" ${Ow(1.4)}/>`
    const pole = (x: number) =>
      `<rect x="${x - 9}" y="0" width="18" height="800" fill="url(#c25-pole)" ${Ow(1.8)}/>` +
      [80, 200, 320, 440, 560, 680].map((y) => `<path d="M${x - 9} ${y}l18 -14M${x - 9} ${y + 20}l18 -14" stroke="#f2b33a" stroke-width="4"/>`).join('')
    let bunting = ''
    const BUNT = ['#e63946', '#ffd23f', '#3a76d0', '#52b788']
    for (const [x0, x1, sag] of [[250, 720, 70], [720, 1190, 70], [0, 250, 50], [1190, W, 50]] as [number, number, number][]) {
      bunting += `<path d="M${x0} 210Q${(x0 + x1) / 2} ${210 + sag * 2} ${x1} 210" fill="none" stroke="${INK}" stroke-width="2"/>`
      for (let i = 1; i < 10; i++) {
        const f = i / 10
        const bx = Math.round(x0 + (x1 - x0) * f)
        const by = Math.round(210 + sag * 4 * f * (1 - f))
        bunting += i % 2
          ? `<path d="M${bx - 10} ${by}h20l-10 20z" fill="${BUNT[i % 4]}" ${Ow(1.2)}/>`
          : anim({ type: 'blink', duty: 0.5, period: 1.2, phase: (bx % 7) / 7 }, `<circle cx="${bx}" cy="${by + 6}" r="6" fill="#fff6c0" ${Ow(1)}/>`) + `<circle cx="${bx}" cy="${by + 6}" r="6" fill="none" ${Ow(1)}/>`
      }
    }
    const curtain =
      `<path d="M600 520h240v190h-240z" fill="#4a1420"/>` +
      `<path d="M600 520q30 100 0 190h60q-10-100 50-190zM840 520q-30 100 0 190h-60q10-100-50-190z" fill="url(#c25-velvet)" ${Ow(1.8)}/>` +
      `<path d="M596 520h248" stroke="#f2b33a" stroke-width="10" stroke-linecap="round"/><path d="M640 610q20 12 40 0M800 610q-20 12-40 0" fill="none" stroke="#f2b33a" stroke-width="4"/>`
    const tent =
      `<rect width="${W}" height="${H}" fill="#3a1420"/>` + stripes +
      `<rect y="500" width="${W}" height="60" fill="url(#c25-wall)"/>` + scallops +
      curtain + pole(250) + pole(1190) + bunting

    // --- The stands with mice cheering (one waving a flag in A only). ---
    const mouse = (x: number, y: number, c: string) =>
      `<ellipse cx="${x}" cy="${y - 8}" rx="9" ry="8" fill="${c}" ${Ow(1.2)}/>` +
      `<circle cx="${x - 6}" cy="${y - 24}" r="4.5" fill="${c}" ${Ow(1)}/><circle cx="${x + 6}" cy="${y - 24}" r="4.5" fill="${c}" ${Ow(1)}/><circle cx="${x - 6}" cy="${y - 24}" r="2.2" fill="#f7a6b4"/><circle cx="${x + 6}" cy="${y - 24}" r="2.2" fill="#f7a6b4"/>` +
      `<circle cx="${x}" cy="${y - 18}" r="7" fill="${c}" ${Ow(1.2)}/><circle cx="${x - 2.5}" cy="${y - 19}" r="1.2" fill="${INK}"/><circle cx="${x + 2.5}" cy="${y - 19}" r="1.2" fill="${INK}"/><circle cx="${x}" cy="${y - 15}" r="1.4" fill="#e8798f"/>`
    const MICE = ['#a7a9b4', '#c9b8a4', '#8f949e', '#d4c4b0']
    const cheer = (x: number, y: number, i: number, m: string) =>
      anim({ type: 'keys', period: 0.7 + (i % 3) * 0.15, phase: (i % 5) / 5, keys: [{ t: 0, y: 0 }, { t: 0.3, y: -4, ease: 'inOut' }], pivot: [x, y] }, m)
    const stands = (x0: number, x1: number, rows: number) => {
      let m = ''
      for (let r = 0; r < rows; r++) {
        const y = 600 + r * 44
        m += `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="44" fill="url(#c25-bench)" ${Ow(1.4)}/><path d="M${x0} ${y + 4}h${x1 - x0}" stroke="#f2b33a" stroke-width="3"/>`
        for (let x = x0 + 22 + (r % 2) * 18, i = 0; x < x1 - 14; x += 38, i++) {
          if (x0 === 0 && r === 0 && i === 1) continue
          m += cheer(x, y, i + r, mouse(x, y, MICE[(i + r) % 4]))
        }
      }
      return m
    }
    // The flag-waving mouse on the left's top row: its flag only in A.
    const FLAG_MOUSE: [number, number] = [78, 600]
    const [fmx, fmy] = FLAG_MOUSE
    const flagMouse = cheer(fmx, fmy, 1,
      mouse(fmx, fmy, MICE[1]) +
        diff(93, 572, 24, `<path d="M${fmx + 7} ${fmy - 10}l5-32" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/><path d="M${fmx + 12} ${fmy - 42}l16 6l-15 7z" fill="#e63946" ${Ow(1.2)}/>`, ''))
    const standsMarkup = stands(0, 270, 4) + flagMouse + stands(1270, W, 4)

    // --- The floor and the ring (one star of its curb missing in B: a hard one). ---
    const RING = { cx: 720, cy: 792, rx: 330, ry: 80 }
    const ringStar = (a: number) => {
      const r = (a * Math.PI) / 180
      return star(Math.round(RING.cx + RING.rx * Math.cos(r)), Math.round(RING.cy - RING.ry * Math.sin(r)), 3, 7, 5, '#ffd23f')
    }
    const floor =
      `<rect y="560" width="${W}" height="${H - 560}" fill="url(#c25-floor)"/>` +
      `<ellipse cx="${RING.cx}" cy="${RING.cy}" rx="${RING.rx}" ry="${RING.ry}" fill="url(#c25-ring)"/>` +
      `<ellipse cx="${RING.cx}" cy="${RING.cy}" rx="${RING.rx}" ry="${RING.ry}" fill="none" stroke="${INK}" stroke-width="20"/>` +
      `<ellipse cx="${RING.cx}" cy="${RING.cy}" rx="${RING.rx}" ry="${RING.ry}" fill="none" stroke="#c0392b" stroke-width="15"/>` +
      `<ellipse cx="${RING.cx}" cy="${RING.cy - 4}" rx="${RING.rx}" ry="${RING.ry}" fill="none" stroke="#f2b33a" stroke-width="2.4"/>` +
      [20, 45, 104, 135, 160, 200, 230, 260, 290, 320, 345].map(ringStar).join('') +
      diff(800, 714, 18, ringStar(76), '')

    // --- The spotlights. ---
    const spot = (x: number, y: number, w: number, period: number, phase: number) =>
      anim({ type: 'sway', angle: 4, pivot: [x, 0], period, phase },
        `<path d="M${x - 14} 0L${x - w} ${y}h${w * 2}L${x + 14} 0z" fill="#fff3b0" fill-opacity="0.13"/>`)
    const spots = spot(300, 800, 120, 5, 0) + spot(1140, 800, 120, 5.6, 0.4) +
      `<path d="M700 0L580 760h280L740 0z" fill="#fff3b0" fill-opacity="0.12"/><ellipse cx="720" cy="764" rx="150" ry="30" fill="#fff3b0" fill-opacity="0.2"/>`

    // --- The ringmaster's top hat on its stand (its red band in A only), the game's owl on top. ---
    const HAT: [number, number] = [150, 670]
    const [hx, hy] = HAT
    const hatStand =
      groundShadow(hx, 792, 34, 5) +
      `<path d="M${hx} 790v-112M${hx - 18} 790h36" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M${hx} 790v-112" stroke="#b07a44" stroke-width="3"/>` +
      `<ellipse cx="${hx}" cy="${hy + 6}" rx="30" ry="6" fill="#8a5a32" ${Ow(1.6)}/>` +
      `<ellipse cx="${hx}" cy="${hy}" rx="34" ry="7" fill="#24222e" ${Ow(1.8)}/><rect x="${hx - 24}" y="${hy - 44}" width="48" height="44" fill="url(#c25-hat)" ${Ow(1.8)}/>` +
      `<ellipse cx="${hx}" cy="${hy - 44}" rx="24" ry="5" fill="#33303e" ${Ow(1.6)}/>` +
      diff(hx, hy - 9, 27, `<rect x="${hx - 24}" y="${hy - 14}" width="48" height="10" fill="#c0392b" ${Ow(1.4)}/><path d="M${hx + 8} ${hy - 14}v10" stroke="#f2b33a" stroke-width="3"/>`, '') +
      anim({ type: 'sway', angle: 6, pivot: [hx, hy - 46], period: 3.6 }, keenOwl(hx, hy - 46, 0.9, blink(3.1, 0.3)))

    // --- The sleeping lion on its pedestal (the tuft of its tail in A only; in B it opens one eye at the start). ---
    const LION: [number, number] = [480, 770]
    const [lx, ly] = LION
    const lionHead =
      star(lx + 50, ly - 82, 22, 34, 14, 'url(#c25-mane)') +
      `<circle cx="${lx + 50}" cy="${ly - 78}" r="19" fill="url(#c25-lion)" ${Ow(1.8)}/>` +
      `<circle cx="${lx + 36}" cy="${ly - 96}" r="6" fill="url(#c25-lion)" ${Ow(1.4)}/><circle cx="${lx + 64}" cy="${ly - 96}" r="6" fill="url(#c25-lion)" ${Ow(1.4)}/>` +
      `<path d="M${lx + 39} ${ly - 82}q5 4 10 0M${lx + 53} ${ly - 82}q5 4 10 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>` +
      `<ellipse cx="${lx + 51}" cy="${ly - 72}" rx="9" ry="6" fill="#f6e2b0"/><path d="M${lx + 48} ${ly - 74}h6l-3 4z" fill="#8a4a2a"/><path d="M${lx + 47} ${ly - 67}q4 3 8 0" fill="none" stroke="${INK}" stroke-width="1.4"/>`
    const lion =
      groundShadow(lx, ly + 2, 70, 8) +
      `<path d="M${lx - 60} ${ly - 44}v42q60 18 120 0v-42z" fill="url(#c25-tub)" ${O}/><ellipse cx="${lx}" cy="${ly - 44}" rx="60" ry="12" fill="#6fa8dc" ${Ow(1.8)}/>` +
      star(lx - 24, ly - 20, 3, 7, 5, '#ffd23f') + star(lx + 24, ly - 20, 3, 7, 5, '#ffd23f') + star(lx, ly - 14, 3, 7, 5, '#ffd23f') +
      // The tail, hanging over the edge, its tuft in A only.
      `<path d="M${lx - 52} ${ly - 60}q-24 6-30 22q-4 10-6 18" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M${lx - 52} ${ly - 60}q-24 6-30 22q-4 10-6 18" fill="none" stroke="#d9a24a" stroke-width="3.4" stroke-linecap="round"/>` +
      diff(lx - 88, ly - 30, 20, `<path d="M${lx - 88} ${ly - 20}q-8-6-4-14q4 4 8 2q-2-8 4-10q2 8 2 14q0 8-10 8z" fill="#8a4a2a" ${Ow(1.3)}/>`, '') +
      `<ellipse cx="${lx - 6}" cy="${ly - 64}" rx="54" ry="22" fill="url(#c25-lion)" ${Ow(1.8)}/>` +
      `<ellipse cx="${lx + 30}" cy="${ly - 48}" rx="14" ry="6" fill="url(#c25-lion)" ${Ow(1.4)}/><ellipse cx="${lx - 30}" cy="${ly - 48}" rx="14" ry="6" fill="url(#c25-lion)" ${Ow(1.4)}/>` +
      // Bonk: its head squashed for a moment, but it sleeps on; Zzz.
      once([{ t: 0, sy: 1 }, { t: 6.98, ease: 'out' }, { t: 7.06, sy: 0.82, ease: 'inOut' }, { t: 7.3, sy: 1 }, { t: 19.95, ease: 'step' }], [lx + 50, ly - 56], lionHead) +
      anim({ type: 'keys', period: 2.2, keys: [{ t: 0, x: 0, y: 0, o: 0, sx: 0.6, sy: 0.6 }, { t: 0.3, o: 1 }, { t: 2.2, x: 20, y: -40, o: 0, sx: 1.3, sy: 1.3 }], pivot: [lx + 72, ly - 104] },
        `<path d="M${lx + 68} ${ly - 108}h9l-9 9h9" fill="none" stroke="#fff4e0" stroke-width="2.4" stroke-linecap="round"/>`) +
      // In B it opens one eye to watch the seal, then dozes off again.
      diff(lx + 58, ly - 82, 18, '',
        once(showIn([2.4, 4.2]), LION, `<circle cx="${lx + 58}" cy="${ly - 82}" r="4.6" fill="#fff" ${Ow(1.3)}/><circle cx="${lx + 59}" cy="${ly - 82}" r="2.2" fill="${INK}"/>`),
        undefined, during(2.4, 4.2))

    // --- The drum (a stud of its rim missing in B: a hard one), a mouse peeking from behind it in B. ---
    const DRUM: [number, number] = [960, 772]
    const [dx, dy] = DRUM
    const stud = (a: number) => {
      const r = (a * Math.PI) / 180
      return `<circle cx="${(dx + 44 * Math.cos(r)).toFixed(1)}" cy="${(dy - 66 + 12 * Math.sin(r)).toFixed(1)}" r="3.4" fill="#f2b33a" ${Ow(1)}/>`
    }
    const dmouse = diff(dx + 50, dy - 24, 24, '',
      keys('dmouse', [{ t: 0, x: -14, o: 0, ease: 'step' }, { t: 8.4, o: 1, ease: 'out' }, { t: 8.7, x: 0 }, { t: 9.2, ease: 'out' }, { t: 9.3, y: -8, ease: 'in' }, { t: 9.45, y: 0 }, { t: 10, ease: 'in' }, { t: 10.25, x: -14, o: 1, ease: 'step' }, { t: 10.3, o: 0, ease: 'step' }], [dx + 46, dy - 22],
        `<circle cx="${dx + 52}" cy="${dy - 40}" r="5" fill="#a7a9b4" ${Ow(1.2)}/><circle cx="${dx + 52}" cy="${dy - 40}" r="2.4" fill="#f7a6b4"/>` +
          `<ellipse cx="${dx + 50}" cy="${dy - 28}" rx="9" ry="8" fill="#a7a9b4" ${Ow(1.3)}/><circle cx="${dx + 53}" cy="${dy - 30}" r="1.4" fill="${INK}"/><circle cx="${dx + 58}" cy="${dy - 26}" r="1.6" fill="#e8798f"/>` +
          `<path d="M${dx + 56} ${dy - 24}l8-2M${dx + 56} ${dy - 22}l8 2" stroke="${INK}" stroke-width="0.8"/>`),
      'dmouse', during(8.4, 10.3))
    let zigzag = `M${dx - 44} ${dy - 58}`
    for (let i = 1; i <= 8; i++) zigzag += `L${dx - 44 + i * 11} ${dy - (i % 2 ? 14 : 58)}`
    const drum =
      groundShadow(dx, dy + 2, 54, 7) +
      dmouse +
      once([{ t: 0, sy: 1 }, { t: 9.18, ease: 'out' }, { t: 9.26, sy: 0.9, ease: 'inOut' }, { t: 9.5, sy: 1 }, { t: 19.95, ease: 'step' }], [dx, dy],
        `<path d="M${dx - 44} ${dy - 66}v56q44 16 88 0v-56z" fill="url(#c25-drum)" ${O}/>` +
          `<path d="${zigzag}" fill="none" stroke="#f2b33a" stroke-width="2.4"/>` +
          `<path d="M${dx - 44} ${dy - 14}q44 16 88 0" fill="none" stroke="#f2b33a" stroke-width="5"/>` +
          `<ellipse cx="${dx}" cy="${dy - 66}" rx="44" ry="12" fill="#f6ecd8" ${Ow(1.8)}/>` +
          [10, 50, 90, 130].map(stud).join('') +
          diff(917, 708, 18, stud(170), ''))
    // The drumroll at the start: sound lines beside it.
    const drumroll = once(showIn([0, 6]), DRUM,
      anim({ type: 'keys', period: 0.25, keys: [{ t: 0, x: 0 }, { t: 0.12, x: 3 }], pivot: [dx, dy - 90] },
        `<path d="M${dx - 60} ${dy - 96}q-6 8 0 16M${dx + 60} ${dy - 96}q6 8 0 16M${dx - 70} ${dy - 100}q-8 12 0 24M${dx + 70} ${dy - 100}q8 12 0 24" fill="none" stroke="#fff4c0" stroke-width="2.6" stroke-linecap="round"/>`))

    // --- The platform up the right pole (its pennant in A only) with the popcorn bucket. ---
    const BUCKET: [number, number] = [994, 450]
    const [bx, by] = BUCKET
    const platform =
      `<rect x="1074" y="392" width="12" height="408" fill="url(#c25-pole)" ${Ow(1.6)}/><circle cx="1080" cy="390" r="7" fill="#f2b33a" ${Ow(1.4)}/>` +
      diff(1092, 400, 20, `<path d="M1084 392l24 8l-24 8z" fill="#3a76d0" ${Ow(1.3)}/>`, '') +
      `<rect x="984" y="450" width="130" height="10" fill="url(#c25-bench)" ${Ow(1.6)}/><path d="M1000 460l74 40" stroke="${INK}" stroke-width="4"/>`
    const popcornBlob = (x: number, y: number, s = 1) =>
      `<circle cx="${x - 3 * s}" cy="${y}" r="${5 * s}" fill="#fff6d8" ${Ow(1)}/><circle cx="${x + 3 * s}" cy="${y - 1.5 * s}" r="${4.4 * s}" fill="#fff1c4" ${Ow(1)}/><circle cx="${x}" cy="${y - 4.5 * s}" r="${3.8 * s}" fill="#fffbe8" ${Ow(1)}/><circle cx="${x + 1}" cy="${y - 1}" r="${1.4 * s}" fill="#f2b33a"/>`
    const bucket = once([{ t: 0, rot: 0 }, { t: 10.25, ease: 'out' }, { t: 10.45, rot: -110, ease: 'step' }], BUCKET,
      once(showIn([0, 10.45]), BUCKET, [[-6, -44], [0, -46], [6, -44], [12, -46], [18, -44], [24, -45], [30, -44], [36, -45], [-2, -50], [10, -51], [22, -50], [32, -50]].map(([ox, oy]) => popcornBlob(bx + 6 + ox, by + oy, 0.7)).join('')) +
        `<path d="M${bx} ${by}h36l4-40h-44z" fill="#fff" ${Ow(1.8)}/><path d="M${bx + 4} ${by}l-3-40M${bx + 14} ${by}l-1-40M${bx + 23} ${by}l1-40M${bx + 32} ${by}l3-40" stroke="#e63946" stroke-width="5"/>` +
        `<path d="M${bx} ${by}h36l4-40h-44z" fill="none" ${Ow(1.8)}/>`)
    // The popcorn raining down on the seal (some of it into its mouth).
    const MOUTH: [number, number] = [762, 612]
    const SPILL: [number, number] = [950, 447]
    let rain = ''
    for (let i = 0; i < 22; i++) {
      const ts = Math.round((10.42 + i * 0.07) * 100) / 100
      const intoMouth = i % 4 === 0
      const [tx, ty] = intoMouth ? MOUTH : [610 + ((i * 37) % 280), 776 + ((i * 13) % 26)]
      const k: Keyframe[] = [
        { t: 0, x: 0, y: 0, rot: 0, o: 0, ease: 'step' },
        { t: ts, o: 1, ease: 'out' },
        { t: ts + 0.3, x: Math.round((tx - SPILL[0]) * 0.35), y: -50, rot: 90, ease: 'in' },
        { t: ts + 0.85, x: tx - SPILL[0], y: ty - SPILL[1], rot: 200, o: 1, ease: 'step' },
      ]
      if (intoMouth) k.push({ t: ts + 0.88, o: 0, ease: 'step' })
      rain += once(k, SPILL, popcornBlob(SPILL[0], SPILL[1]))
    }

    // --- The trapeze (a parrot swinging on it in B while the popcorn rains). ---
    const parrot = diff(713, 460, 26, '',
      once(showIn([10.4, 12.5]), [712, 470],
        `<path d="M708 470v-4M716 470v-4" stroke="#f2a93b" stroke-width="2"/>` +
          `<path d="M716 460l6 22l-8-4z" fill="#3a76d0" ${Ow(1.2)}/><ellipse cx="712" cy="456" rx="8" ry="12" fill="#e63946" ${Ow(1.4)}/>` +
          anim({ type: 'keys', period: 0.5, keys: [{ t: 0, rot: 0 }, { t: 0.25, rot: -30, ease: 'inOut' }], pivot: [716, 452] }, `<path d="M716 452q10 2 10 14q-8-2-10-14z" fill="#ffd23f" ${Ow(1.2)}/>`) +
          `<circle cx="708" cy="442" r="6.5" fill="#e63946" ${Ow(1.4)}/><path d="M702 442q-6 0-6 6q4-1 6-2z" fill="#f4f1e8" ${Ow(1.1)}/><circle cx="707" cy="440" r="1.3" fill="${INK}"/>`),
      'trapeze', during(10.4, 12.5))
    const trapeze = anim({ type: 'sway', angle: 2, pivot: [720, 0], period: 4.4, id: 'trapeze' },
      once([{ t: 0, rot: 0 }, { t: 8.15, ease: 'out' }, { t: 8.35, rot: 7, ease: 'inOut' }, { t: 8.8, rot: -5, ease: 'inOut' }, { t: 9.3, rot: 3, ease: 'inOut' }, { t: 9.8, rot: 0 }, { t: 19.95, ease: 'step' }], [720, 0],
        `<path d="M664 0V470M776 0V470" stroke="${INK}" stroke-width="4"/><path d="M664 0V470M776 0V470" stroke="#e9d8b0" stroke-width="2"/>` +
          `<rect x="656" y="466" width="128" height="9" rx="4" fill="url(#c25-pole)" ${Ow(1.6)}/>`) + parrot)

    // --- The seal on its tub (a star painted on the tub in A, a ring in B). ---
    const [ux, uy] = TUB
    const tub =
      groundShadow(ux, uy + 72, 64, 8) +
      `<path d="M${ux - 50} ${uy}v66q50 16 100 0v-66z" fill="url(#c25-tub)" ${O}/>` +
      `<path d="M${ux - 30} ${uy + 10}v62M${ux + 30} ${uy + 10}v62" stroke="#fff" stroke-opacity="0.5" stroke-width="6"/>` +
      `<ellipse cx="${ux}" cy="${uy}" rx="50" ry="12" fill="#6fa8dc" ${Ow(1.8)}/>` +
      diff(ux, uy + 40, 20, star(ux, uy + 40, 5, 12, 5, '#ffd23f'), `<circle cx="${ux}" cy="${uy + 40}" r="10" fill="none" stroke="${INK}" stroke-width="6"/><circle cx="${ux}" cy="${uy + 40}" r="10" fill="none" stroke="#ffd23f" stroke-width="3.6"/>`)
    const sealEye = `<circle cx="740" cy="592" r="3.8" fill="${INK}"/><circle cx="741.2" cy="590.8" r="1.2" fill="#fff"/>`
    const seal = keys(undefined, sealKeys, TUB,
      `<ellipse cx="700" cy="${uy + 2}" rx="18" ry="6" fill="url(#c25-seal)" ${Ow(1.6)}/>` +
        `<ellipse cx="716" cy="656" rx="28" ry="48" transform="rotate(-10 716 656)" fill="url(#c25-seal)" ${Ow(2)}/><ellipse cx="724" cy="666" rx="15" ry="30" transform="rotate(-10 724 666)" fill="#b8c2cc"/>` +
        anim({ type: 'keys', period: 1.2, keys: [{ t: 0, rot: 0 }, { t: 0.6, rot: -14, ease: 'inOut' }], pivot: [728, 642] },
          `<path d="M728 642q24 6 26 30q-16-2-26-30z" fill="url(#c25-seal)" ${Ow(1.6)}/>`) +
        `<circle cx="744" cy="598" r="21" fill="url(#c25-seal)" ${Ow(2)}/><ellipse cx="762" cy="606" rx="13" ry="9" fill="#c9d2da" ${Ow(1.4)}/>` +
        `<ellipse cx="775" cy="600" rx="4.6" ry="3.6" fill="${INK}"/>` +
        `<path d="M762 608l16 2M762 611l15 6M760 605l15-4" stroke="${INK}" stroke-width="0.9"/>` +
        once(showIn([0, 6], [6.7, 10.7], [12.5, LOOP]), TUB, sealEye + `<path d="M756 613q6 4 12 0" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`) +
        // Bumped: eyes wide as the ball flies off.
        once(showIn([6, 6.7]), TUB, `<circle cx="740" cy="592" r="5.4" fill="#fff" ${Ow(1.2)}/><circle cx="741" cy="592" r="2" fill="${INK}"/><ellipse cx="764" cy="614" rx="3.4" ry="4" fill="#7a2a2a"/>`) +
        // Catching popcorn: chomp, chomp.
        once(showIn([10.7, 12.5]), TUB,
          `<path d="M735 593q5-4 10 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>` +
            anim({ type: 'keys', period: 0.3, keys: [{ t: 0, sy: 1 }, { t: 0.15, sy: 0.3, ease: 'inOut' }], pivot: [764, 612] }, `<ellipse cx="764" cy="614" rx="6" ry="6" fill="#7a2a2a" ${Ow(1.2)}/>`)))
    const ball = keys('ball', ballKeys, BALL,
      anim({ type: 'rotate', pivot: BALL, period: 0.8 },
          `<circle cx="${BALL[0]}" cy="${BALL[1]}" r="18" fill="#fff" ${Ow(1.8)}/>` +
            `<path d="M${BALL[0] - 18} ${BALL[1]}a18 18 0 0 0 36 0z" fill="#3a76d0"/>` +
            // Its cap: yellow in A, green in B.
            diff(BALL[0], BALL[1], 22, `<path d="M${BALL[0] - 10} ${BALL[1] - 15}a18 18 0 0 1 20 0q-10 6-20 0z" fill="#ffd23f"/>`, `<path d="M${BALL[0] - 10} ${BALL[1] - 15}a18 18 0 0 1 20 0q-10 6-20 0z" fill="#52b788"/>`, 'ball') +
            `<circle cx="${BALL[0]}" cy="${BALL[1]}" r="18" fill="none" ${Ow(1.8)}/><circle cx="${BALL[0] - 6}" cy="${BALL[1] - 6}" r="4" fill="#fff" fill-opacity="0.7"/>`))

    // --- The poodle on its unicycle (its party hat in A only). ---
    const [px, py] = POODLE
    const cycle = keys(undefined, cycleKeys, POODLE,
      `<path d="M${px} ${py - 22}V${py - 72}" stroke="${INK}" stroke-width="5"/><path d="M${px} ${py - 22}V${py - 72}" stroke="#c0c6ce" stroke-width="2.6"/>` +
        `<ellipse cx="${px}" cy="${py - 74}" rx="13" ry="4.5" fill="#e63946" ${Ow(1.4)}/>` +
        anim({ type: 'rotate', pivot: [px, py - 22], period: 0.6 },
          `<circle cx="${px}" cy="${py - 22}" r="22" fill="none" stroke="${INK}" stroke-width="6"/><circle cx="${px}" cy="${py - 22}" r="22" fill="none" stroke="#2b2b3a" stroke-width="3"/>` +
            `<path d="M${px - 20} ${py - 22}h40M${px} ${py - 42}v40M${px - 14} ${py - 36}l28 28M${px + 14} ${py - 36}l-28 28" stroke="#c0c6ce" stroke-width="1.6"/>`))
    const curl = (x: number, y: number, r: number) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#c25-poodle)" ${Ow(1.4)}/>`
    const poodle = keys('poodle', poodleKeys, POODLE,
      `<path d="M${px - 4} ${py - 82}l-6 52M${px + 6} ${py - 82}l4 52" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M${px - 4} ${py - 82}l-6 52M${px + 6} ${py - 82}l4 52" stroke="#f6f2ec" stroke-width="5" stroke-linecap="round"/>` +
        curl(px - 18, py - 98, 7) +
        curl(px - 8, py - 92, 13) + curl(px + 8, py - 96, 13) + curl(px, py - 106, 12) +
        curl(px + 18, py - 122, 12) + curl(px + 14, py - 136, 9) +
        `<ellipse cx="${px + 32}" cy="${py - 118}" rx="10" ry="6.5" fill="#f6f2ec" ${Ow(1.4)}/><circle cx="${px + 41}" cy="${py - 119}" r="3.2" fill="${INK}"/>` +
        curl(px + 8, py - 116, 8) +
        once(showIn([0, 6.05]), POODLE, `<circle cx="${px + 22}" cy="${py - 126}" r="2.6" fill="${INK}"/><path d="M${px + 28} ${py - 112}q4 3 8 0" fill="none" stroke="${INK}" stroke-width="1.4"/>`) +
        once(showIn([6.05, LOOP]), POODLE,
          `<path d="M${px + 22} ${py - 126}m-1 0a1 1 0 1 1 2 0a2.4 2.4 0 1 1-4.8 0a3.6 3.6 0 1 1 7.2 0" fill="none" stroke="${INK}" stroke-width="1.3"/>` +
            anim({ type: 'rotate', pivot: [px + 14, py - 160], period: 1.1 },
              [0, 120, 240].map((a) => `<g transform="rotate(${a} ${px + 14} ${py - 160})">${star(px + 14, py - 176, 3, 7, 5, '#ffd23f')}</g>`).join(''))) +
        // Its party hat, in A only.
        diff(px + 15, py - 154, 20, `<path d="M${px + 6} ${py - 142}l10-28l10 26z" fill="#ff6b9a" ${Ow(1.4)}/><path d="M${px + 9} ${py - 150}l14-3M${px + 12} ${py - 159}l8-2" stroke="#fff" stroke-width="2"/><circle cx="${px + 16}" cy="${py - 171}" r="3.4" fill="#ffd23f" ${Ow(1)}/>`, '', 'poodle'))

    // --- The horse with its plume, the popcorn cart. ---
    const horse =
      groundShadow(1185, 806, 70, 8) +
      anim({ type: 'keys', period: 1.4, keys: [{ t: 0, rot: 0 }, { t: 0.35, rot: -30, ease: 'inOut' }, { t: 0.7, rot: 0, ease: 'inOut' }], pivot: [1150, 760] },
        `<path d="M1150 760l-4 42" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M1150 760l-4 42" stroke="#f4f1e8" stroke-width="7" stroke-linecap="round"/>`) +
      `<path d="M1168 762l0 42M1210 762l2 42M1226 760l4 42" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M1168 762l0 42M1210 762l2 42M1226 760l4 42" stroke="#f4f1e8" stroke-width="7" stroke-linecap="round"/>` +
      `<ellipse cx="1190" cy="744" rx="50" ry="26" fill="url(#c25-horse)" ${Ow(2)}/>` +
      `<path d="M1238 730q20 6 14 40" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M1238 730q20 6 14 40" fill="none" stroke="#c9c3b4" stroke-width="6" stroke-linecap="round"/>` +
      `<path d="M1150 738q-6-40 10-60l22 10q-10 20-6 50z" fill="url(#c25-horse)" ${Ow(1.8)}/>` +
      `<path d="M1160 676q-26-4-30 16q14 10 30 0z" fill="url(#c25-horse)" ${Ow(1.8)}/><circle cx="1150" cy="680" r="2.4" fill="${INK}"/><circle cx="1136" cy="690" r="1.6" fill="${INK}"/>` +
      `<path d="M1164 680q8 20 4 52" fill="none" stroke="#c9c3b4" stroke-width="6"/><path d="M1160 676l4-12l4 12" fill="#f4f1e8" ${Ow(1.2)}/>` +
      anim({ type: 'sway', angle: 8, pivot: [1162, 668], period: 1.4 },
        `<path d="M1162 668q-10-26 2-44q4 22-2 44zM1162 668q6-28 22-34q-8 20-22 34zM1162 668q-16-20-12-40q8 20 12 40z" fill="#e63946" ${Ow(1.2)}/>`) +
      `<path d="M1150 704h34" stroke="#ffd23f" stroke-width="5"/>`
    const cart =
      groundShadow(1350, 860, 46, 6) +
      `<rect x="1312" y="790" width="76" height="56" fill="#e63946" ${Ow(1.8)}/><path d="M1312 812h76" stroke="#fff" stroke-width="5"/>` +
      `<rect x="1318" y="748" width="64" height="42" fill="#fff6d8" fill-opacity="0.8" ${Ow(1.6)}/>` +
      [[1330, 780], [1342, 776], [1354, 780], [1366, 776], [1336, 768], [1350, 766], [1362, 768]].map(([x, y]) => popcornBlob(x, y, 0.7)).join('') +
      `<path d="M1312 748h76l-8-14h-60z" fill="#ffd23f" ${Ow(1.6)}/><circle cx="1324" cy="852" r="9" fill="#2b2b3a" ${Ow(1.4)}/><circle cx="1376" cy="852" r="9" fill="#2b2b3a" ${Ow(1.4)}/>`

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c25-red" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a2030"/><stop offset="1" stop-color="#d63a3a"/></linearGradient>` +
      `<linearGradient id="c25-cream" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9b48a"/><stop offset="1" stop-color="#f6e7c8"/></linearGradient>` +
      `<linearGradient id="c25-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a1828"/><stop offset="1" stop-color="#4a1018"/></linearGradient>` +
      `<linearGradient id="c25-velvet" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a1a2a"/><stop offset="0.5" stop-color="#d63a4a"/><stop offset="1" stop-color="#8a1a2a"/></linearGradient>` +
      `<linearGradient id="c25-pole" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2f4f8f"/><stop offset="0.5" stop-color="#5f86d0"/><stop offset="1" stop-color="#2f4f8f"/></linearGradient>` +
      `<linearGradient id="c25-bench" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a32"/><stop offset="1" stop-color="#5a3418"/></linearGradient>` +
      `<linearGradient id="c25-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b08a52"/><stop offset="1" stop-color="#e3c48a"/></linearGradient>` +
      `<radialGradient id="c25-ring" cx="0.5" cy="0.4" r="0.7"><stop offset="0" stop-color="#f6e2b0"/><stop offset="1" stop-color="#d9b878"/></radialGradient>` +
      `<linearGradient id="c25-tub" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2f6fb0"/><stop offset="0.6" stop-color="#4d96e6"/><stop offset="1" stop-color="#2f5f98"/></linearGradient>` +
      `<linearGradient id="c25-drum" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8202a"/><stop offset="0.6" stop-color="#e63946"/><stop offset="1" stop-color="#a8202a"/></linearGradient>` +
      `<linearGradient id="c25-hat" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1c1a24"/><stop offset="0.6" stop-color="#3a3648"/><stop offset="1" stop-color="#1c1a24"/></linearGradient>` +
      `<radialGradient id="c25-lion" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#ffd98a"/><stop offset="1" stop-color="#d9a24a"/></radialGradient>` +
      `<radialGradient id="c25-mane" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#e08a3a"/><stop offset="1" stop-color="#a0501f"/></radialGradient>` +
      `<radialGradient id="c25-seal" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#a9b4c0"/><stop offset="0.6" stop-color="#7a8696"/><stop offset="1" stop-color="#55606e"/></radialGradient>` +
      `<radialGradient id="c25-poodle" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e6dfd4"/></radialGradient>` +
      `<radialGradient id="c25-horse" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d8d2c4"/></radialGradient>` +
      `<radialGradient id="c25-glow" cx="0.5" cy="0.75" r="0.8"><stop offset="0" stop-color="#ffe9a8" stop-opacity="0.22"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient></defs>` +
      tent +
      floor +
      standsMarkup +
      spots +
      platform +
      bucket +
      trapeze +
      lion +
      drum +
      drumroll +
      tub +
      seal +
      hatStand +
      cycle +
      poodle +
      horse +
      cart +
      ball +
      rain +
      impact(525, 640, 7) +
      impact(722, 470, 8.2, 0.8, '#fff4c0') +
      rings(722, 470, 8.2, 40) +
      impact(958, 690, 9.2, 1.3) +
      rings(960, 700, 9.2, 60) +
      impact(1012, 410, 10.2, 0.8, '#fff4c0') +
      `<rect width="${W}" height="${H}" fill="url(#c25-glow)"/>`
    )
  },
})
