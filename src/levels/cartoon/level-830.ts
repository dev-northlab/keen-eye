// Cartoon "The cake heist" (docs/cartoon-mode.md), made like 812: a 20 s story in a kitchen at night, seen at mouse
// height, told by a camera. Three mice come out of their hole, stack a matchbox, an upturned cup and two spoons tied
// end to end against the table where a cake waits, and climb up into a wobbly pyramid — the top one grabs the cherry,
// the spoons sway, topple, and all three land on the back of the cat asleep on the chair. It only purrs. Down they
// hop, roll the cherry across the floor and into their hole; the last one waves. The owl watches from outside on the
// window sill. Twelve differences: two hard (a stripe on the matchbox, a cream rosette on the cake), three events of
// B (a spider coming down its thread, the cat's whiskers twitching, a mouse peeking out of the cookie tin).
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
  // Out of the hole by the window (the owl outside), along the floor to the table.
  { t: 1.6, x: 120, y: 470, w: 520, ease: 'inOut' },
  { t: 4, x: 640, y: 470, w: 520, ease: 'step' },
  // Building the ladder by the chair where the cat sleeps; climbing it.
  { t: 4.05, x: 900, y: 470, w: 520, ease: 'linear' },
  { t: 7.45, x: 905, y: 470, w: 520, ease: 'step' },
  // Up at the cake: the wobbly pyramid, the cherry.
  { t: 7.5, x: 880, y: 340, w: 320, ease: 'linear' },
  { t: 9.95, x: 884, y: 342, w: 316, ease: 'step' },
  // The topple.
  { t: 10, x: 860, y: 360, w: 520, ease: 'step' },
  // On the cat's back: it only purrs.
  { t: 11.5, x: 1060, y: 430, w: 320, ease: 'linear' },
  { t: 13.95, x: 1062, y: 432, w: 316, ease: 'step' },
  // Rolling the cherry home across the floor.
  { t: 14, x: 960, y: 560, w: 480, ease: 'linear' },
  { t: 17.95, x: 250, y: 560, w: 480, ease: 'step' },
  // Into the hole; one waves.
  { t: 18, x: 140, y: 480, w: 480, ease: 'linear' },
  { t: 19.95, x: 144, y: 482, w: 476, ease: 'step' },
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

const FLOOR = 762
/** The mouse hole in the baseboard; every mouse is drawn standing in it and moved from there. */
const HOLE: [number, number] = [330, FLOOR]
/** The table top, the cake on it, the cherry on the cake. */
const TABLE_Y = 470
const CAKE: [number, number] = [1000, TABLE_Y]
const CHERRY: [number, number] = [1032, 382]
/** The ladder: the matchbox on the floor, the upturned cup on it, two spoons tied end to end standing on the cup. */
const POLE: [number, number] = [1080, 694]
/** The cat curled up asleep on its cushion on the chair. */
const CAT: [number, number] = [1190, 586]

/** The spoons' sway and their fall onto the cat (degrees, about the cup's top). */
const POLE_TURN: [number, number][] = [[0, 0], [6.6, 0], [7.6, -4], [8.1, 4], [8.6, -5], [9.1, 5], [9.6, -3], [9.9, 8], [10.2, 22], [10.6, 50]]
const poleAt = (deg: number, h: number): [number, number] => {
  const r = (deg * Math.PI) / 180
  return [POLE[0] + Math.sin(r) * h, POLE[1] - Math.cos(r) * h]
}

/** A mouse's keys: walk out, climb to `h` above the cup on the pole, ride it, fly onto the cat, then home. */
function mouseKeys(o: { out: number; wait: number; climb: [number, number]; h: number; letGo: number; land: [number, number]; floor: number; home: number; stay?: boolean }): Keyframe[] {
  const at = ([x, y]: [number, number]) => ({ x: Math.round(x - HOLE[0]), y: Math.round(y - HOLE[1]) })
  const k: Keyframe[] = [{ t: 0, x: 0, y: 0, rot: 0, sx: 1, o: 0, ease: 'step' }, { t: o.out, o: 1, ease: 'linear' }]
  // Out along the floor to the ladder, a little hop with every step.
  const steps = 10
  for (let i = 1; i <= steps; i++) {
    const t = o.out + ((4 - o.out) * i) / steps
    k.push({ t: Math.round(t * 100) / 100, x: Math.round(((o.wait - HOLE[0]) * i) / steps), y: i % 2 ? -5 : 0, ease: 'linear' })
  }
  // Helping: hops as the cup and the spoons go up.
  k.push({ t: 5.1, x: o.wait - HOLE[0], y: 0, ease: 'out' }, { t: 5.25, y: -10, ease: 'in' }, { t: 5.4, y: 0, ease: 'out' }, { t: 5.75, y: -10, ease: 'in' }, { t: 5.9, y: 0, sx: 1, ease: 'step' })
  // Up the pole, facing the cake.
  k.push({ t: o.climb[0], ...at([POLE[0] - 10, FLOOR]), sx: -1, ease: 'inOut' }, { t: o.climb[1], ...at(poleAt(0, o.h)), rot: 0, ease: 'linear' })
  for (const [t, deg] of POLE_TURN) if (t > o.climb[1] && t <= o.letGo) k.push({ t, ...at(poleAt(deg, o.h)), rot: deg, ease: 'inOut' })
  // Off it, through the air, onto the cat's back.
  const [lx, ly] = o.land
  k.push({ t: o.letGo + 0.45, x: Math.round((poleAt(30, o.h)[0] + lx) / 2 - HOLE[0]), y: Math.round(Math.min(ly, poleAt(30, o.h)[1]) - 70 - HOLE[1]), rot: 200, ease: 'in' })
  k.push({ t: 11.3, ...at(o.land), rot: 360, ease: 'step' }, { t: 11.32, rot: 0, ease: 'step' })
  // Down off the chair and home along the floor, the cherry between them.
  k.push({ t: 14, ease: 'out' }, { t: 14.35, ...at([(lx + o.floor) / 2, FLOOR - 70]), ease: 'in' }, { t: 14.6, ...at([o.floor, FLOOR]), ease: 'linear' })
  for (let i = 1; i <= 12; i++) {
    const t = 14.6 + (3.3 * i) / 12
    k.push({ t: Math.round(t * 100) / 100, x: Math.round(o.floor + ((390 - 1050) * i) / 12 - HOLE[0]), y: i % 2 ? -4 : 0, ease: 'linear' })
  }
  if (o.stay) {
    // The last one stops at the hole, turns and waves.
    k.push({ t: 18.3, x: 40, y: 0, sx: -1, ease: 'step' }, { t: 18.35, sx: 1, ease: 'step' }, { t: 19.95, ease: 'step' })
  } else {
    k.push({ t: o.home, x: 0, y: 0, ease: 'step' }, { t: o.home + 0.05, o: 0, ease: 'step' })
  }
  return k
}
const M1 = mouseKeys({ out: 1.7, wait: 1060, climb: [6.2, 7], h: 224, letGo: 10.2, land: [1172, 520], floor: 1102, home: 19.95, stay: true })
const M2 = mouseKeys({ out: 1.9, wait: 1035, climb: [6.4, 7.2], h: 248, letGo: 10.2, land: [1206, 515], floor: 1078, home: 18.5 })
const M3 = mouseKeys({ out: 2.1, wait: 1010, climb: [6.6, 7.4], h: 272, letGo: 9.9, land: [1240, 522], floor: 1020, home: 18.2 })

export default svgLevel({
  id: 830,
  chapter: 'cartoon',
  title: 'cartoonCakeHeist',
  parTimeSec: 120,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const blink = (period: number, phase = 0) => (m: string) => anim({ type: 'blink', duty: 0.07, period, phase }, m)
    const star = (x: number, y: number, r: number, fill = '#ffe066') => {
      let d = ''
      for (let i = 0; i < 16; i++) {
        const a = (i * Math.PI) / 8
        const rr = i % 2 ? r * 0.45 : r
        d += `${i ? 'L' : 'M'}${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`
      }
      return `<path d="${d}z" fill="${fill}" ${Ow(1.8)}/>`
    }
    const pop = (t: number, at: [number, number], r: number) =>
      once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t, o: 1, ease: 'out' }, { t: t + 0.12, sx: 1.15, sy: 1.15, ease: 'inOut' }, { t: t + 0.32, sx: 1, sy: 1, o: 1, ease: 'step' }, { t: t + 0.36, o: 0, ease: 'step' }], at, star(at[0], at[1], r))
    const circling = (x: number, y: number) =>
      anim({ type: 'rotate', pivot: [x, y], period: 1.1 },
        [0, 120, 240].map((a) => `<path transform="rotate(${a} ${x} ${y})" d="M${x} ${y - 14}l2 4l4 1l-3 3l1 4l-4-2l-4 2l1-4l-3-3l4-1z" fill="#ffd23f" ${Ow(0.9)}/>`).join(''))

    // --- The room: wallpaper, a tiled wainscot, the baseboard with the mouse hole (a doormat in front in A only),
    // the plank floor; moonlight through the window, a warm lamp over the table. ---
    let wallpaper = ''
    for (let x = 0; x < W; x += 60) wallpaper += `<path d="M${x + 30} 0v560" stroke="#e9d4b8" stroke-width="18"/>`
    for (let x = 0; x < W; x += 60) for (let y = 40; y < 560; y += 80) wallpaper += `<circle cx="${x + 30 + ((y / 80) % 2) * 30}" cy="${y}" r="5" fill="#d9b48a" fill-opacity="0.6"/>`
    let tiles = ''
    for (let x = 0; x < W; x += 40) for (let y = 560; y < 730; y += 40) tiles += `<rect x="${x + 2}" y="${y + 2}" width="36" height="36" rx="3" fill="${(x / 40 + y / 40) % 2 ? '#e3eef4' : '#f2f7f9'}"/>`
    let planks = ''
    for (let y = FLOOR; y < H; y += 28) {
      planks += `<path d="M0 ${y}h${W}" stroke="#7a4a22" stroke-opacity="0.5" stroke-width="2"/>`
      for (let x = (y / 28) % 2 ? 0 : 140; x < W; x += 280) planks += `<path d="M${x} ${y}v28" stroke="#7a4a22" stroke-opacity="0.45" stroke-width="2"/>`
    }
    for (let i = 0; i < 24; i++) {
      const gx = Math.round(rand() * W)
      const gy = Math.round(FLOOR + 6 + rand() * 120)
      planks += `<path d="M${gx} ${gy}q30-4 60 0" fill="none" stroke="#8a5a32" stroke-opacity="0.35" stroke-width="1.6"/>`
    }
    const [hx, hy] = HOLE
    const room =
      `<rect width="${W}" height="${H}" fill="url(#c30-wall)"/>` + wallpaper +
      `<rect y="560" width="${W}" height="170" fill="#cfdde6"/>` + tiles +
      `<rect y="726" width="${W}" height="${FLOOR - 726}" fill="#f4ecdf" ${Ow(1.6)}/>` +
      `<rect y="${FLOOR}" width="${W}" height="${H - FLOOR}" fill="url(#c30-floor)"/>` + planks +
      `<path d="M${hx - 24} ${FLOOR}v-22a24 24 0 0 1 48 0v22z" fill="#2a1a10" ${Ow(2)}/><path d="M${hx - 16} ${FLOOR}v-18a16 16 0 0 1 32 0" fill="none" stroke="#4a3020" stroke-width="3"/>` +
      diff(hx, FLOOR + 9, 24, `<path d="M${hx - 20} ${FLOOR + 3}h40l-3 12h-34z" fill="#c0392b" ${Ow(1.4)}/><path d="M${hx - 15} ${FLOOR + 9}h30" stroke="#ffd23f" stroke-width="2" stroke-dasharray="4 3"/>`, '')

    // --- The window: night sky, the moon, the owl outside on the sill. ---
    let stars = ''
    for (let i = 0; i < 10; i++) {
      const sx = Math.round(170 + rand() * 200)
      const sy = Math.round(320 + rand() * 160)
      stars += anim({ type: 'blink', duty: 0.4, period: 1.5 + rand() * 1.5, phase: rand() }, `<circle cx="${sx}" cy="${sy}" r="1.8" fill="#fff6c8"/>`)
    }
    const windowM =
      `<rect x="140" y="290" width="260" height="262" rx="6" fill="#f4ecdf" ${O}/>` +
      `<rect x="154" y="304" width="232" height="236" fill="url(#c30-night)"/>` + stars +
      `<circle cx="330" cy="352" r="28" fill="#fff4c0" ${Ow(1.6)}/><circle cx="320" cy="346" r="5" fill="#efe0a0"/><circle cx="338" cy="362" r="3.6" fill="#efe0a0"/>` +
      `<path d="M154 500q60-30 120-6t112-10V540H154z" fill="#3e5a72"/>` +
      anim({ type: 'sway', angle: 6, pivot: [272, 534], period: 3.8 }, keenOwl(272, 534, 1.05, blink(3.1, 0.3))) +
      `<path d="M270 304v236M154 420h232" stroke="#f4ecdf" stroke-width="10"/><path d="M270 304v236M154 420h232" stroke="${INK}" stroke-width="2" stroke-opacity="0.4"/>` +
      `<rect x="130" y="540" width="280" height="14" rx="3" fill="#e9dcc6" ${Ow(1.8)}/>` +
      `<path d="M140 290q-30 120 8 262h-26q-24-140 2-262z" fill="url(#c30-curtain)" ${Ow(1.8)}/><path d="M400 290q30 120-8 262h26q24-140-2-262z" fill="url(#c30-curtain)" ${Ow(1.8)}/>` +
      // The moonbeam on the floor.
      `<path d="M154 540L386 540L640 900L60 900z" fill="#cfe4ff" fill-opacity="0.14"/>`

    // --- The shelf with jars and the teapot, the clock, the lamp over the table with a moth. ---
    const jar = (x: number, h: number, c: string, lid: string) =>
      `<rect x="${x - 16}" y="${276 - h}" width="32" height="${h}" rx="6" fill="${c}" fill-opacity="0.85" ${Ow(1.6)}/><rect x="${x - 17}" y="${270 - h}" width="34" height="9" rx="2" fill="${lid}" ${Ow(1.4)}/>` +
      `<path d="M${x - 9} ${282 - h}v${h - 14}" stroke="#fff" stroke-opacity="0.45" stroke-width="3"/>`
    const shelf =
      `<rect x="540" y="276" width="260" height="12" fill="url(#c30-wood)" ${Ow(1.6)}/><path d="M560 288l20 24M780 288l-20 24" stroke="${INK}" stroke-width="4"/>` +
      jar(575, 50, '#f2c38a', '#c0392b') + jar(620, 64, '#ffe3a0', '#3a76d0') + jar(665, 42, '#e8b4c8', '#52b788') +
      `<path d="M722 276q-4-34 32-34q36 0 32 34z" fill="#5fa8d3" ${Ow(1.8)}/><path d="M786 258q18-4 14 16" fill="none" stroke="${INK}" stroke-width="4"/><path d="M722 262l-16-10" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><circle cx="754" cy="240" r="5" fill="#5fa8d3" ${Ow(1.4)}/>`
    const clock =
      `<circle cx="720" cy="150" r="46" fill="#fff8ea" stroke="#8a5a32" stroke-width="7"/><circle cx="720" cy="150" r="46" fill="none" ${Ow(1.6)}/>` +
      [0, 90, 180, 270].map((a) => `<path transform="rotate(${a} 720 150)" d="M720 112v8" stroke="${INK}" stroke-width="3"/>`).join('') +
      `<path d="M720 150v-28M720 150l18 10" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>` +
      anim({ type: 'rotate', pivot: [720, 150], period: 6 }, `<path d="M720 150v34" stroke="#c0392b" stroke-width="1.6"/>`)
    const lampGlow = `<circle cx="1000" cy="210" r="420" fill="url(#c30-lamp-glow)"/>`
    const lamp =
      `<path d="M1000 0v150" stroke="${INK}" stroke-width="3"/>` +
      `<path d="M956 190q4-40 44-40t44 40z" fill="#e9a23b" ${Ow(2)}/><ellipse cx="1000" cy="192" rx="20" ry="6" fill="#fff4c0"/>` +
      anim({ type: 'path', points: [[0, 0], [40, -20], [70, 10], [30, 30], [-20, 10]], period: 3.2 },
        anim({ type: 'keys', period: 0.15, keys: [{ t: 0, sy: 1 }, { t: 0.07, sy: 0.4 }], pivot: [1040, 220] },
          `<path d="M1040 220q-12-10-12 4q6 4 12-4zM1040 220q12-10 12 4q-6 4-12-4z" fill="#d9cba8" ${Ow(1)}/>`) + `<ellipse cx="1040" cy="222" rx="2.2" ry="5" fill="#8a7a5a"/>`)

    // --- The table: legs, the top, a checked cloth; the cake (a cream rosette fewer in B: hard; a sugar flower in A
    // only), the cherry, a teaspoon by the plate (A only). ---
    const table =
      groundShadow(770, FLOOR + 2, 300, 10) +
      `<rect x="500" y="${TABLE_Y + 14}" width="22" height="${FLOOR - TABLE_Y - 14}" fill="url(#c30-wood)" ${Ow(1.8)}/><rect x="1012" y="${TABLE_Y + 14}" width="22" height="${FLOOR - TABLE_Y - 14}" fill="url(#c30-wood)" ${Ow(1.8)}/>` +
      `<rect x="480" y="${TABLE_Y}" width="572" height="16" fill="url(#c30-wood)" ${Ow(2)}/>` +
      `<path d="M476 ${TABLE_Y - 2}h120v58q-20 12-40 0q-20 12-40 0q-20 12-40 0z" fill="url(#c30-check)" ${Ow(1.8)}/>`
    const [ckx, cky] = CAKE
    const rosette = (x: number) => `<circle cx="${x}" cy="391" r="7" fill="#fff8f2" ${Ow(1.3)}/><path d="M${x - 4} 389q4-4 8 0" fill="none" stroke="#e8b4c8" stroke-width="1.6"/>`
    const cake =
      `<ellipse cx="${ckx}" cy="${cky - 2}" rx="70" ry="10" fill="#f4f1ea" ${Ow(1.8)}/>` +
      `<path d="M${ckx - 54} ${cky - 6}v-44h108v44z" fill="url(#c30-sponge)" ${Ow(2)}/>` +
      `<path d="M${ckx - 54} ${cky - 30}h108" stroke="#fff0f4" stroke-width="7"/><path d="M${ckx - 54} ${cky - 30}h108" stroke="#e05a7a" stroke-width="3"/>` +
      `<path d="M${ckx - 50} ${cky - 50}v-26h100v26z" fill="url(#c30-sponge)" ${Ow(2)}/>` +
      `<path d="M${ckx - 54} ${cky - 76}q0-8 8-8h92q8 0 8 8v6q-6 10-12 0q-6 12-14 0q-8 12-14 0q-8 12-16 0q-8 12-14 0q-8 12-14 0q-6 10-12 0q-6 8-12 0z" fill="#fff8f2" ${Ow(1.8)}/>` +
      rosette(ckx - 8) + rosette(ckx + 12) + diff(ckx - 32, 391, 18, rosette(ckx - 32), '') +
      diff(ckx, cky - 26, 20, [0, 72, 144, 216, 288].map((a) => `<ellipse transform="rotate(${a} ${ckx} ${cky - 26})" cx="${ckx}" cy="${cky - 32}" rx="3.4" ry="6" fill="#b48ae6" ${Ow(1)}/>`).join('') + `<circle cx="${ckx}" cy="${cky - 26}" r="3" fill="#ffd23f"/>`, '') +
      `<path d="M${ckx - 30} ${cky - 40}h8M${ckx + 24} ${cky - 16}h10M${ckx - 40} ${cky - 14}h6" stroke="#fff" stroke-opacity="0.6" stroke-width="3" stroke-linecap="round"/>`
    const cherry = (x: number, y: number) =>
      `<path d="M${x} ${y - 8}q2-12 10-14" fill="none" stroke="#3f8f3a" stroke-width="2.4" stroke-linecap="round"/>` +
      `<circle cx="${x}" cy="${y}" r="9" fill="url(#c30-cherry)" ${Ow(1.6)}/><circle cx="${x - 3}" cy="${y - 3}" r="2.4" fill="#fff" fill-opacity="0.7"/>`
    const cakeCherry = once(showIn([0, 9.6]), CHERRY, cherry(...CHERRY))
    const teaspoon = diff(905, 463, 22,
      `<path d="M886 466l26-4" stroke="${INK}" stroke-width="4.6" stroke-linecap="round"/><path d="M886 466l26-4" stroke="#c9ced6" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="918" cy="461" rx="8" ry="4.6" fill="#c9ced6" ${Ow(1.4)}/>`, '')

    // --- The chair (a heart cut in its back and a ribbon on its leg in A only), the cushion, the cat asleep on it (its
    // collar red in A, blue in B; its whiskers twitch in B while the mice sit on it). ---
    const [cx, cy] = CAT
    const chair =
      groundShadow(1205, FLOOR + 2, 110, 8) +
      `<rect x="1120" y="600" width="14" height="${FLOOR - 600}" fill="url(#c30-wood)" ${Ow(1.8)}/><rect x="1280" y="600" width="14" height="${FLOOR - 600}" fill="url(#c30-wood)" ${Ow(1.8)}/>` +
      `<path d="M1126 690h160" stroke="${INK}" stroke-width="7"/><path d="M1126 690h160" stroke="#a0683a" stroke-width="4"/>` +
      `<path d="M1262 590v-196q22-10 46 0v196z" fill="url(#c30-wood)" ${Ow(2)}/><path d="M1270 420v150M1300 420v150" stroke="#6e4224" stroke-opacity="0.4" stroke-width="2"/>` +
      diff(1285, 468, 18, `<path d="M1285 480l-9-9a5.4 5.4 0 0 1 9-6a5.4 5.4 0 0 1 9 6z" fill="#3a2414"/>`, '') +
      `<rect x="1108" y="588" width="200" height="14" rx="3" fill="url(#c30-wood)" ${Ow(2)}/>` +
      // A ribbon tied round the front leg (A only).
      diff(1127, 640, 18, `<path d="M1118 636h18v8h-18z" fill="#52b788" ${Ow(1.2)}/><path d="M1127 640l-8-8v16zM1127 640l8-8v16z" fill="#52b788" ${Ow(1.2)}/><circle cx="1127" cy="640" r="2.6" fill="#2f7d4a"/>`, '')
    const cushion =
      `<ellipse cx="${cx}" cy="${cy}" rx="84" ry="14" fill="url(#c30-check)" ${Ow(1.8)}/>`
    const whiskers = `<path d="M1118 560l-18-3M1118 563l-18 3M1118 566l-16 7" stroke="${INK}" stroke-width="1.2" stroke-linecap="round"/>`
    const collar = (c: string) =>
      `<path d="M1152 548q8 16 22 20" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M1152 548q8 16 22 20" fill="none" stroke="${c}" stroke-width="4.4" stroke-linecap="round"/>` +
      `<circle cx="1164" cy="570" r="4.6" fill="#ffd23f" ${Ow(1.2)}/>`
    const catM =
      // The body breathing slowly, the tail round the front.
      anim({ type: 'keys', period: 2.6, keys: [{ t: 0, sy: 1 }, { t: 1.3, sy: 1.05, ease: 'inOut' }], pivot: [cx + 10, cy - 6] },
        `<ellipse cx="${cx + 14}" cy="${cy - 32}" rx="66" ry="30" fill="url(#c30-tabby)" ${O}/>` +
          `<path d="M${cx - 10} ${cy - 58}q4 12 0 22M${cx + 12} ${cy - 61}q4 14 0 26M${cx + 34} ${cy - 59}q4 12 0 24M${cx + 56} ${cy - 52}q2 10 0 18" fill="none" stroke="#8a5a32" stroke-opacity="0.6" stroke-width="4" stroke-linecap="round"/>`) +
      `<path d="M${cx + 76} ${cy - 22}q14 20-10 24q-40 6-90 0" fill="none" stroke="${INK}" stroke-width="15" stroke-linecap="round"/><path d="M${cx + 76} ${cy - 22}q14 20-10 24q-40 6-90 0" fill="none" stroke="#e8a35a" stroke-width="10" stroke-linecap="round"/>` +
      // The head on its paws, asleep, smiling.
      `<ellipse cx="${cx - 40}" cy="${cy - 8}" rx="20" ry="7" fill="#f4c88a" ${Ow(1.6)}/>` +
      `<path d="M${cx - 66} ${cy - 44}l2-16l12 10zM${cx - 40} ${cy - 46}l6-15l6 15z" fill="#e8a35a" ${O}/>` +
      `<circle cx="${cx - 54}" cy="${cy - 30}" r="21" fill="url(#c30-tabby)" ${O}/>` +
      `<path d="M${cx - 66} ${cy - 32}q5 4 10 0M${cx - 50} ${cy - 33}q5 4 10 0" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>` +
      `<path d="M${cx - 70} ${cy - 24}l4 2l-4 2z" fill="#e8798f"/><path d="M${cx - 68} ${cy - 20}q4 4 8 0" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>` +
      `<circle cx="${cx - 46}" cy="${cy - 22}" r="4" fill="#ff9a8a" fill-opacity="0.5"/>` +
      diff(1116, 563, 20, whiskers,
        once(showIn([0, 11.6], [13.9, LOOP]), [1118, 563], whiskers) +
          once(showIn([11.6, 13.9]), [1118, 563], anim({ type: 'keys', period: 0.3, keys: [{ t: 0, rot: -14 }, { t: 0.15, rot: 12, ease: 'inOut' }], pivot: [1118, 563] }, whiskers)),
        undefined, during(11.6, 13.9)) +
      diff(1163, 559, 20, collar('#e63946'), collar('#3a76d0')) +
      // Z's while asleep; purring when the mice land.
      anim({ type: 'keys', period: 2.2, keys: [{ t: 0, x: 0, y: 0, o: 0, sx: 0.6, sy: 0.6 }, { t: 0.4, o: 1 }, { t: 2.2, x: -26, y: -46, o: 0, sx: 1.3, sy: 1.3 }], pivot: [cx - 60, cy - 66] },
        `<path d="M${cx - 64} ${cy - 70}h9l-9 9h9" fill="none" stroke="#7a6a9a" stroke-width="2.4" stroke-linecap="round"/>`) +
      once(showIn([11.3, 14.5]), CAT, anim({ type: 'keys', period: 0.5, keys: [{ t: 0, o: 1, x: 0 }, { t: 0.5, o: 0, x: 8 }], pivot: [cx + 86, cy - 40] },
        `<path d="M${cx + 84} ${cy - 46}q4-4 8 0t8 0M${cx + 86} ${cy - 36}q4-4 8 0t8 0" fill="none" stroke="#7a6a9a" stroke-width="2" stroke-linecap="round"/>`))

    // --- The ladder: the matchbox (a stripe of its label fewer in B: hard), the cup, the two spoons. ---
    const matchbox =
      `<rect x="1046" y="728" width="68" height="34" rx="3" fill="#f2c38a" ${Ow(1.8)}/><rect x="1054" y="734" width="52" height="22" fill="#c0392b" ${Ow(1.2)}/>` +
      `<path d="M1062 738v14M1072 738v14" stroke="#ffd23f" stroke-width="3"/>` +
      diff(1092, 745, 18, `<path d="M1082 738v14" stroke="#ffd23f" stroke-width="3"/>`, '') +
      `<path d="M1046 758h68" stroke="#6e4224" stroke-width="3"/>`
    const cupM = `<path d="M1062 728l4-34h28l4 34z" fill="#f4f1ea" ${Ow(1.8)}/><path d="M1064 718h32" stroke="#3a76d0" stroke-width="3"/><path d="M1098 702q14 2 10 16q-2 4-8 4" fill="none" stroke="${INK}" stroke-width="2.4"/>`
    const cup = once([{ t: 0, x: 90, y: 40, rot: 90, ease: 'step' }, { t: 4.4, ease: 'inOut' }, { t: 4.75, x: 30, y: -50, rot: 30, ease: 'in' }, { t: 5, x: 0, y: 0, rot: 0, ease: 'step' }], [1080, 711], cupM)
    const spoon = (bottom: number) =>
      `<path d="M${POLE[0]} ${bottom}v-84" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M${POLE[0]} ${bottom}v-84" stroke="#d4d9e0" stroke-width="5" stroke-linecap="round"/><path d="M${POLE[0] - 1} ${bottom - 6}v-72" stroke="#fff" stroke-opacity="0.6" stroke-width="1.4"/>` +
      `<ellipse cx="${POLE[0]}" cy="${bottom - 98}" rx="10" ry="15" fill="url(#c30-spoon)" ${Ow(1.8)}/><ellipse cx="${POLE[0] - 3}" cy="${bottom - 102}" rx="3" ry="6" fill="#fff" fill-opacity="0.6"/>`
    const spoon1 = once([{ t: 0, x: -150, y: 56, rot: -90, ease: 'step' }, { t: 5.2, ease: 'inOut' }, { t: 5.5, x: -40, y: -40, rot: -30, ease: 'in' }, { t: 5.7, x: 0, y: 0, rot: 0, ease: 'step' }], POLE, spoon(POLE[1]))
    const spoon2 = once([{ t: 0, x: -150, y: 164, rot: -90, ease: 'step' }, { t: 5.75, ease: 'inOut' }, { t: 6.05, x: -40, y: 40, rot: -30, ease: 'in' }, { t: 6.25, x: 0, y: 0, rot: 0, ease: 'step' }], [POLE[0], POLE[1] - 112], spoon(POLE[1] - 112))
    const tie = once(showIn([6.25, LOOP]), POLE, `<path d="M${POLE[0] - 6} ${POLE[1] - 116}l12 4M${POLE[0] - 6} ${POLE[1] - 110}l12 4" stroke="#e63946" stroke-width="2.6" stroke-linecap="round"/>`)
    const poleKeys: Keyframe[] = POLE_TURN.map(([t, rot], i) => ({ t, rot, ease: i === POLE_TURN.length - 1 ? 'step' : 'inOut' }))
    const ladder = cup + keys(undefined, poleKeys, POLE, spoon1 + spoon2 + tie)

    // --- The mice. ---
    const mouseBody = (eyes: string, arm: string, extra = '') =>
      `<path d="M${hx - 6} ${hy - 4}q-18 4-22-10q-2-8 6-8" fill="none" stroke="#c9a0a8" stroke-width="2.6" stroke-linecap="round"/>` +
      `<ellipse cx="${hx - 4}" cy="${hy - 2}" rx="6" ry="3" fill="#8f939f" ${Ow(1.2)}/><ellipse cx="${hx + 6}" cy="${hy - 2}" rx="6" ry="3" fill="#8f939f" ${Ow(1.2)}/>` +
      `<ellipse cx="${hx}" cy="${hy - 15}" rx="10" ry="13" fill="url(#c30-mouse)" ${Ow(1.6)}/><ellipse cx="${hx + 2}" cy="${hy - 13}" rx="5.4" ry="8" fill="#e9e6ee"/>` +
      `<circle cx="${hx - 5}" cy="${hy - 39}" r="6" fill="#a7a9b4" ${Ow(1.4)}/><circle cx="${hx - 5}" cy="${hy - 39}" r="3.2" fill="#f7a6b4"/>` +
      `<circle cx="${hx + 8}" cy="${hy - 41}" r="6" fill="#a7a9b4" ${Ow(1.4)}/><circle cx="${hx + 8}" cy="${hy - 41}" r="3.2" fill="#f7a6b4"/>` +
      `<circle cx="${hx + 2}" cy="${hy - 31}" r="9" fill="url(#c30-mouse)" ${Ow(1.5)}/><path d="M${hx + 8} ${hy - 34}l9 4l-8 4z" fill="#a7a9b4" ${Ow(1.3)}/><circle cx="${hx + 17}" cy="${hy - 30}" r="1.8" fill="#e8798f"/>` +
      `<path d="M${hx + 14} ${hy - 31}l7-2M${hx + 14} ${hy - 29}l7 1" stroke="${INK}" stroke-width="0.8"/>` +
      eyes + arm + extra
    const openEye = `<circle cx="${hx + 6}" cy="${hy - 34}" r="1.7" fill="${INK}"/>`
    const dazedEye = `<path d="M${hx + 6} ${hy - 34}m-0.8 0a0.8 0.8 0 1 1 1.6 0a1.8 1.8 0 1 1-3.6 0a2.8 2.8 0 1 1 5.6 0" fill="none" stroke="${INK}" stroke-width="1"/>`
    const arm = (ex: number, ey: number) => `<path d="M${hx + 3} ${hy - 22}L${hx + ex} ${hy + ey}" stroke="${INK}" stroke-width="4.4" stroke-linecap="round"/><path d="M${hx + 3} ${hy - 22}L${hx + ex} ${hy + ey}" stroke="#a7a9b4" stroke-width="2.6" stroke-linecap="round"/>`
    const restArm = arm(9, -16)
    const upArm = arm(6, -46)
    const mouseOf = (id: string, k: Keyframe[], extra: string, wave = false) => {
      const climbing: [number, number] = [k.find((q) => q.sx === -1)!.t, 11.3]
      return keys(id, k, HOLE,
        once(showIn([0, climbing[0]], [11.3, wave ? 18.35 : LOOP]), HOLE, mouseBody(once(showIn([0, 11.3], [13.8, LOOP]), HOLE, openEye) + once(showIn([11.3, 13.8]), HOLE, dazedEye), restArm)) +
          // Climbing and riding the pole: arms up.
          once(showIn(climbing), HOLE, mouseBody(openEye, upArm)) +
          (wave ? once(showIn([18.35, LOOP]), HOLE, mouseBody(openEye, anim({ type: 'keys', period: 0.5, keys: [{ t: 0, rot: -20 }, { t: 0.25, rot: 20, ease: 'inOut' }], pivot: [hx + 3, hy - 22] }, upArm))) : '') +
          once(showIn([11.35, 13.8]), HOLE, circling(hx + 2, hy - 56)) +
          extra)
    }
    // The top mouse reaches for the cherry, holds it through the fall and on the cat.
    const reach = once(showIn([9, 9.6]), HOLE, arm(48, -38))
    const held = once(showIn([9.6, 14.6]), HOLE, cherry(hx + 12, hy - 20))
    const mice = mouseOf('m1', M1, '', true) + mouseOf('m2', M2, '') + mouseOf('m3', M3, reach + held)
    // The cherry on the floor, rolled home; into the hole.
    const FLOOR_CHERRY: [number, number] = [1050, FLOOR - 9]
    const rolled = once(
      [{ t: 0, x: 0, rot: 0, o: 0, ease: 'step' }, { t: 14.6, o: 1, ease: 'linear' }, { t: 17.9, x: 390 - 1050, rot: -760, ease: 'in' }, { t: 18.25, x: HOLE[0] - 1050, rot: -840, o: 1, ease: 'step' }, { t: 18.3, o: 0, ease: 'step' }],
      FLOOR_CHERRY,
      cherry(...FLOOR_CHERRY),
    )
    // Starbursts: the grab, the landing on the cat.
    const bursts = pop(9.6, [CHERRY[0] + 6, CHERRY[1] - 4], 14) + pop(11.3, [1205, 500], 22) + pop(11.32, [1172, 506], 16) + pop(11.34, [1240, 508], 16)
    // Dust as the cup and the spoons are stood up.
    const dust = [5, 5.7, 6.25].map((t) => once([{ t: 0, sx: 0.5, sy: 0.5, o: 0, ease: 'step' }, { t, o: 0.9, ease: 'out' }, { t: t + 0.5, sx: 1.6, sy: 1.6, o: 0, ease: 'step' }], [1080, 730],
      `<circle cx="1064" cy="730" r="8" fill="#e9dcc0"/><circle cx="1096" cy="730" r="7" fill="#e9dcc0"/>`)).join('')

    // --- The cookie tin by the hole (in B a mouse peeks out from under its lid at the end), a button on the floor
    // under the table (A only). ---
    const tinLid = `<path d="M440 724h60v-8h-60z" fill="#3a76d0" ${Ow(1.6)}/><path d="M446 720h48" stroke="#ffd23f" stroke-width="2"/>`
    const tin =
      groundShadow(470, FLOOR + 2, 34, 4) +
      `<rect x="442" y="724" width="56" height="38" rx="4" fill="#3a76d0" ${Ow(1.8)}/><path d="M446 736h48M446 752h48" stroke="#ffd23f" stroke-width="2"/><circle cx="470" cy="744" r="7" fill="#f2c38a" ${Ow(1.2)}/>` +
      diff(468, 708, 36, tinLid,
        once(showIn([0, 18.05], [19.9, LOOP]), [440, 724], tinLid) +
          once(showIn([18.05, 19.9]), [440, 724],
            `<circle cx="458" cy="716" r="5" fill="#a7a9b4" ${Ow(1.2)}/><circle cx="472" cy="714" r="5" fill="#a7a9b4" ${Ow(1.2)}/><circle cx="465" cy="722" r="7" fill="#a7a9b4" ${Ow(1.3)}/>` +
              `<circle cx="462" cy="721" r="1.4" fill="${INK}"/><circle cx="469" cy="721" r="1.4" fill="${INK}"/>` +
              `<g transform="rotate(-28 440 724)">${tinLid}</g>`),
        undefined, during(18.05, 19.9))
    const button = diff(800, 800, 18, `<circle cx="800" cy="800" r="9" fill="#e9a23b" ${Ow(1.6)}/><circle cx="797" cy="797" r="1.6" fill="${INK}"/><circle cx="803" cy="797" r="1.6" fill="${INK}"/><circle cx="797" cy="803" r="1.6" fill="${INK}"/><circle cx="803" cy="803" r="1.6" fill="${INK}"/>`, '')

    // In B a spider comes down its thread by the ladder while the mice wobble at the top.
    const SPIDER: [number, number] = [1140, 430]
    const [spx, spy] = SPIDER
    const thread = `<path d="M${spx} 290v${spy - 290 - 6}" stroke="#d9d4cc" stroke-width="1.2"/>`
    const spider = diff(spx, spy + 2, 24, '',
      keys('spider', [{ t: 0, y: -70, o: 0, ease: 'step' }, { t: 7.6, o: 1, ease: 'out' }, { t: 8.3, y: 0, ease: 'inOut' }, { t: 9.2, ease: 'in' }, { t: 9.85, y: -70, o: 1, ease: 'step' }, { t: 9.9, o: 0, ease: 'step' }], SPIDER,
        `<path d="M${spx - 12} ${spy - 4}l-6-6M${spx - 12} ${spy + 2}l-8 2M${spx - 10} ${spy + 6}l-6 8M${spx + 12} ${spy - 4}l6-6M${spx + 12} ${spy + 2}l8 2M${spx + 10} ${spy + 6}l6 8" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>` +
          `<ellipse cx="${spx}" cy="${spy}" rx="10" ry="9" fill="#3a2a4a" ${Ow(1.4)}/><circle cx="${spx - 3}" cy="${spy - 2}" r="2.4" fill="#fff"/><circle cx="${spx + 3}" cy="${spy - 2}" r="2.4" fill="#fff"/><circle cx="${spx - 3}" cy="${spy - 1.6}" r="1" fill="${INK}"/><circle cx="${spx + 3}" cy="${spy - 1.6}" r="1" fill="${INK}"/>`),
      'spider', during(7.6, 9.9))

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c30-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3dfc4"/><stop offset="1" stop-color="#e6cba8"/></linearGradient>` +
      `<linearGradient id="c30-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9824a"/><stop offset="1" stop-color="#94602f"/></linearGradient>` +
      `<linearGradient id="c30-night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4f86"/><stop offset="1" stop-color="#6a7fb8"/></linearGradient>` +
      `<linearGradient id="c30-curtain" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9584a"/><stop offset="1" stop-color="#f08a6a"/></linearGradient>` +
      `<linearGradient id="c30-wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a5a32"/><stop offset="0.6" stop-color="#b07a44"/><stop offset="1" stop-color="#c8935a"/></linearGradient>` +
      `<radialGradient id="c30-lamp-glow"><stop offset="0" stop-color="#fff2c0" stop-opacity="0.55"/><stop offset="0.5" stop-color="#ffe3a0" stop-opacity="0.18"/><stop offset="1" stop-color="#ffe3a0" stop-opacity="0"/></radialGradient>` +
      `<pattern id="c30-check" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#fff4ee"/><rect width="8" height="8" fill="#e0574a" fill-opacity="0.75"/><rect x="8" y="8" width="8" height="8" fill="#e0574a" fill-opacity="0.75"/></pattern>` +
      `<linearGradient id="c30-sponge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e88aa6"/><stop offset="0.6" stop-color="#f6b3c6"/><stop offset="1" stop-color="#fbd0dc"/></linearGradient>` +
      `<radialGradient id="c30-cherry" cx="0.6" cy="0.3" r="0.8"><stop offset="0" stop-color="#ff6a6a"/><stop offset="1" stop-color="#a8101c"/></radialGradient>` +
      `<radialGradient id="c30-tabby" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#ffcf8a"/><stop offset="0.55" stop-color="#e8a35a"/><stop offset="1" stop-color="#b8743a"/></radialGradient>` +
      `<radialGradient id="c30-mouse" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#c3c6d0"/><stop offset="1" stop-color="#8a8e9c"/></radialGradient>` +
      `<linearGradient id="c30-spoon" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9aa3ad"/><stop offset="0.6" stop-color="#dfe4ea"/><stop offset="1" stop-color="#f4f6f8"/></linearGradient></defs>` +
      room +
      windowM +
      shelf +
      clock +
      thread +
      table +
      cake +
      cakeCherry +
      teaspoon +
      chair +
      cushion +
      catM +
      matchbox +
      ladder +
      dust +
      tin +
      button +
      rolled +
      mice +
      spider +
      bursts +
      lamp +
      lampGlow
    )
  },
})
