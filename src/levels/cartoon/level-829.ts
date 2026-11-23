// Cartoon "The moon picnic" (docs/cartoon-mode.md), made like 812: a 20 s story on the Moon told by a camera. A little
// rocket lands, a cat astronaut climbs down and bounces in slow, huge low-gravity hops to its picnic blanket, sits down
// and pulls the tab of a can of fish — the fish floats up out of the can. Off the cat goes after it, bounce after
// bounce, until a little green alien pops out of a crater and catches it — and holds it out to the cat. They sit on
// the crater's rim and share it while the Earth rises behind them. Twelve differences: two hard (a pebble by the
// landing pad, the ball on the cat's helmet antenna), three events of B (a satellite passing, a second alien's
// antennae in a little crater, a shooting star).
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { fish, groundShadow, INK, keenOwl, NATURE_DEFS, Ow } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // The rocket comes down on its flame; the flag, the pebbles of the pad, the owl on its nose.
  { t: 1.6, x: 20, y: 250, w: 520, ease: 'inOut' },
  { t: 3.5, x: 20, y: 400, w: 520, ease: 'step' },
  // The cat climbs down and bounces off to its picnic.
  { t: 4.2, x: 40, y: 470, w: 480, ease: 'linear' },
  { t: 6.5, x: 430, y: 480, w: 480, ease: 'step' },
  // Close on the blanket: the basket, the sandwich, the thermos, the can — the fish floats out.
  { t: 6.55, x: 470, y: 560, w: 360, ease: 'step' },
  // The chase, in great slow bounces.
  { t: 9.05, x: 520, y: 400, w: 600, ease: 'linear' },
  { t: 12, x: 760, y: 420, w: 600, ease: 'step' },
  // The alien catches the fish and holds it out.
  { t: 12.05, x: 940, y: 560, w: 360, ease: 'step' },
  // Sharing it on the crater's rim, the Earth rising behind them.
  { t: 14, x: 880, y: 490, w: 480, ease: 'linear' },
  { t: 19.95, x: 886, y: 492, w: 470, ease: 'step' },
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

/** The rocket stands on (ROCKET) once landed; it comes down from high up. */
const ROCKET: [number, number] = [220, 700]
const LANDED = 3.5
const rocketKeys: Keyframe[] = [
  { t: 0, x: 0, y: -380, rot: 0 },
  { t: 1.6, ease: 'out' },
  { t: LANDED - 0.15, y: -6, ease: 'inOut' },
  { t: LANDED, y: 0, ease: 'step' },
  { t: 19.95, ease: 'step' },
]

/** The cat's feet when it sits on the blanket (its rest pose's place). */
const CAT: [number, number] = [610, 768]
/** Sitting: on the blanket, then on the crater's rim. */
const SIT: [number, number][] = [[6.5, 9.1], [14.15, LOOP]]
const RIM: [number, number] = [440, 4]
function hops(from: [number, number], to: [number, number], t0: number, t1: number, n: number, high: number): Keyframe[] {
  const k: Keyframe[] = []
  for (let i = 1; i <= n; i++) {
    const f0 = (i - 0.5) / n
    const f1 = i / n
    const x0 = from[0] + (to[0] - from[0]) * f0
    const y0 = from[1] + (to[1] - from[1]) * f0
    k.push({ t: t0 + (t1 - t0) * f0, x: Math.round(x0), y: Math.round(y0 - high), sy: 1, ease: 'in' })
    k.push({ t: t0 + (t1 - t0) * f1 - 0.08, x: Math.round(from[0] + (to[0] - from[0]) * f1), y: Math.round(from[1] + (to[1] - from[1]) * f1), sy: 0.9, ease: 'out' })
    k.push({ t: t0 + (t1 - t0) * f1, sy: 1, ease: 'out' })
  }
  return k
}
const HATCH: [number, number] = [-405, -118]
const LADDER_FOOT: [number, number] = [-360, -68]
const catKeys: Keyframe[] = [
  // Inside the rocket (out of the way, unseen) until it comes out of the hatch.
  { t: 0, x: HATCH[0], y: 100, sy: 1, rot: 0, o: 0, ease: 'step' },
  { t: 4.15, x: HATCH[0], y: HATCH[1], ease: 'step' },
  { t: 4.2, o: 1, ease: 'inOut' },
  // Down the ladder.
  { t: 4.9, x: LADDER_FOOT[0], y: LADDER_FOOT[1], ease: 'out' },
  // Slow moon hops to the blanket.
  ...hops(LADDER_FOOT, [0, 0], 4.9, 6.5, 2, 110),
  // Sitting; the fish floats out at 8.6; up and after it.
  { t: 9.1, x: 0, y: 0, ease: 'out' },
  ...hops([0, 0], [430, 2], 9.1, 12, 3, 150),
  // At the crater; it sits down on the rim beside the alien.
  { t: 13.9, x: 430, y: 2, ease: 'inOut' },
  { t: 14.15, x: RIM[0], y: RIM[1] },
  { t: 19.95, ease: 'step' },
]

/** The can on the blanket; the fish floats out of it and up to the crater. */
const CAN: [number, number] = [652, 772]
const POP = 8.45
const FISH: [number, number] = [CAN[0], CAN[1] - 22]
/** The alien's crater; it rises from it and catches the fish there. */
const ALIEN: [number, number] = [1120, 778]
const CATCH = 12.3
const fishKeys: Keyframe[] = [
  { t: 0, x: 0, y: 14, rot: 0, sx: 0.6, sy: 0.6, o: 0, ease: 'step' },
  { t: 8.6, o: 1, ease: 'out' },
  { t: 9.4, x: 50, y: -110, rot: 120, sx: 1, sy: 1, ease: 'inOut' },
  { t: 10.4, x: 220, y: -150, rot: 250, ease: 'inOut' },
  { t: 11.4, x: 390, y: -120, rot: 380, ease: 'inOut' },
  // Into the alien's paw (its arm raised to catch: the held fish's place then).
  { t: CATCH, x: 441, y: -32, rot: 350, o: 1, ease: 'step' },
  { t: CATCH + 0.02, o: 0, ease: 'step' },
]

export default svgLevel({
  id: 829,
  chapter: 'cartoon',
  title: 'cartoonMoonPicnic',
  parTimeSec: 120,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const blink = (period: number, phase = 0) => (m: string) => anim({ type: 'blink', duty: 0.07, period, phase }, m)
    /** A puff of grey moon dust at (x, y), rising slowly at `t` (low gravity: it hangs). */
    const dust = (x: number, y: number, t: number, s = 1) =>
      once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t, o: 0.9, ease: 'out' }, { t: t + 0.9, sx: 1.3 * s, sy: 1.1 * s, o: 0, ease: 'step' }], [x, y],
        `<ellipse cx="${x - 18}" cy="${y - 6}" rx="16" ry="9" fill="#d8d5e2"/><ellipse cx="${x + 16}" cy="${y - 5}" rx="14" ry="8" fill="#d8d5e2"/><ellipse cx="${x}" cy="${y - 12}" rx="18" ry="10" fill="#e6e3ee"/>`)
    const crater = (x: number, y: number, rx: number) =>
      `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${Math.round(rx * 0.28)}" fill="url(#c29-rim)" ${Ow(1.6)}/>` +
      `<ellipse cx="${x + Math.round(rx * 0.08)}" cy="${y + 2}" rx="${Math.round(rx * 0.78)}" ry="${Math.round(rx * 0.2)}" fill="url(#c29-pit)"/>` +
      `<path d="M${x - Math.round(rx * 0.8)} ${y - 2}q${Math.round(rx * 0.8)}-${Math.round(rx * 0.3)} ${Math.round(rx * 1.6)} 0" fill="none" stroke="#fff" stroke-opacity="0.45" stroke-width="2.4"/>`

    // --- The sky: stars, a ringed planet, a comet's faint tail; the Earth rising behind the far ridge at the end. ---
    let stars = ''
    for (let i = 0; i < 70; i++) {
      const sx = Math.round(rand() * W)
      const sy = Math.round(rand() * 560)
      const r = 0.8 + rand() * 1.8
      const star = `<circle cx="${sx}" cy="${sy}" r="${r.toFixed(1)}" fill="#fff" fill-opacity="${(0.55 + rand() * 0.45).toFixed(2)}"/>`
      stars += i % 4 ? star : anim({ type: 'blink', duty: 0.35, period: 1.4 + rand() * 2, phase: rand() }, star)
    }
    const planet =
      `<circle cx="430" cy="300" r="30" fill="url(#c29-planet)" ${Ow(1.6)}/>` +
      `<ellipse cx="430" cy="302" rx="52" ry="10" fill="none" stroke="#f2c98a" stroke-width="5" transform="rotate(-14 430 302)"/>` +
      `<path d="M400 296q30-8 60 0" fill="none" stroke="#c9845a" stroke-opacity="0.5" stroke-width="3"/>`
    const EARTH: [number, number] = [1000, 552]
    const earth = once([{ t: 0, y: 150 }, { t: 14, ease: 'out' }, { t: 17.2, y: 0, ease: 'step' }, { t: 19.95, ease: 'step' }], EARTH,
      `<circle cx="${EARTH[0]}" cy="${EARTH[1]}" r="72" fill="#5aa8ff" fill-opacity="0.18"/>` +
        `<circle cx="${EARTH[0]}" cy="${EARTH[1]}" r="56" fill="url(#c29-earth)" ${Ow(1.8)}/>` +
        `<path d="M${EARTH[0] - 40} ${EARTH[1] - 20}q14-18 34-10q10 14-4 22q-16 2-14 14q-14 0-16-26zM${EARTH[0] + 8} ${EARTH[1] + 6}q20-10 34 6q-6 22-24 26q-14-12-10-32z" fill="#5cbf5a" ${Ow(1.2)}/>` +
        `<path d="M${EARTH[0] - 30} ${EARTH[1] + 30}q20 8 44 2" fill="none" stroke="#fff" stroke-opacity="0.8" stroke-width="5" stroke-linecap="round"/>` +
        `<path d="M${EARTH[0] - 46} ${EARTH[1] - 6}a46 46 0 0 1 30-40" fill="none" stroke="#fff" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round"/>`)
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c29-sky)"/>` + stars + planet +
      // A far galaxy smudge and a comet.
      `<ellipse cx="1220" cy="150" rx="70" ry="16" fill="#b9a8ff" fill-opacity="0.22" transform="rotate(-20 1220 150)"/>` +
      `<path d="M120 120l120 40" stroke="#cfe0ff" stroke-opacity="0.35" stroke-width="6" stroke-linecap="round"/><circle cx="240" cy="160" r="5" fill="#fff"/>` +
      earth

    // --- The ground: far ridges in two greys, the plain with craters, rocks and old footprints. ---
    let craters = ''
    for (const [cx, cy, rx] of [[110, 820, 60], [480, 860, 80], [820, 840, 50], [1350, 860, 70], [760, 700, 34], [940, 690, 28], [60, 680, 40], [1260, 650, 30]] as [number, number, number][]) craters += crater(cx, cy, rx)
    let rocks = ''
    for (let i = 0; i < 18; i++) {
      const rx = Math.round(rand() * W)
      const ry = Math.round(640 + rand() * 250)
      const s = 0.6 + rand() * 0.9
      // Keep the zones' places clear.
      if ((rx > 270 && rx < 450 && ry > 600 && ry < 740) || (rx > 520 && rx < 800 && ry > 700 && ry < 820) || (rx > 960 && rx < 1380 && ry > 650 && ry < 820)) continue
      rocks += `<path d="M${rx - 12 * s} ${ry}q2-${12 * s} ${12 * s}-${14 * s}q${12 * s} 2 ${12 * s} ${14 * s}z" fill="url(#c29-rock)" ${Ow(1.3)}/>`
    }
    const ground =
      `<path d="M0 590q140-50 300-26t320-8t300 12t300-26t220 20V700H0z" fill="#6f6a86"/>` +
      `<path d="M0 610q200-30 420-6t420-10t380 10t220-6V720H0z" fill="#8a85a0"/>` +
      `<rect y="620" width="${W}" height="${H - 620}" fill="url(#c29-ground)"/>` +
      `<path d="M0 620q360 16 720 0t720 0" fill="none" stroke="#fff" stroke-opacity="0.3" stroke-width="3"/>` +
      craters + rocks +
      // Old boot prints from another visit.
      [[860, 760], [890, 770], [920, 758], [950, 768]].map(([fx, fy]) => `<ellipse cx="${fx}" cy="${fy}" rx="9" ry="4" fill="#77728c" fill-opacity="0.6"/>`).join('')

    // --- The landing pad: the flag (a star on it in A only), pebbles (one fewer in B: a hard one). ---
    const flag =
      groundShadow(392, 714, 14, 3) +
      `<path d="M390 714V614" stroke="${INK}" stroke-width="4"/><path d="M390 714V614" stroke="#d8d8e0" stroke-width="2"/>` +
      // A wire along the top keeps a flag spread out where there is no wind.
      `<path d="M390 618h52" stroke="${INK}" stroke-width="2.4"/>` +
      `<path d="M390 618h52v34h-52z" fill="#ff7b5a" ${Ow(1.6)}/><path d="M390 630h52M390 642h52" stroke="#fff" stroke-opacity="0.6" stroke-width="3"/>` +
      diff(416, 635, 18, `<path d="M416 626l3 6l7 1l-5 5l1 7l-6-3l-6 3l1-7l-5-5l7-1z" fill="#ffe066" ${Ow(1.1)}/>`, '')
    const pebble = (x: number, y: number, s: number) => `<ellipse cx="${x}" cy="${y}" rx="${7 * s}" ry="${4.5 * s}" fill="url(#c29-rock)" ${Ow(1.2)}/>`
    const pebbles = pebble(282, 716, 1) + pebble(318, 722, 1.1) + diff(300, 714, 18, pebble(300, 712, 0.9), '') + pebble(336, 708, 0.8)

    // --- The rocket, its flame while it comes down, its ladder once down; the game's owl on its nose in a space bubble
    // (a star sticker on its fin in A only). ---
    const [rx0, ry0] = ROCKET
    const owlInHelmet =
      keenOwl(rx0, ry0 - 268, 0.6, blink(3.2, 0.4)) +
      `<circle cx="${rx0}" cy="${ry0 - 282}" r="22" fill="#cfe8ff" fill-opacity="0.25" stroke="${INK}" stroke-width="1.8"/>` +
      `<path d="M${rx0 - 14} ${ry0 - 292}a16 16 0 0 1 12-10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`
    const flame = once(showIn([0, LANDED]), ROCKET,
      anim({ type: 'keys', period: 0.16, keys: [{ t: 0, sy: 1 }, { t: 0.08, sy: 1.35, ease: 'inOut' }], pivot: [rx0, ry0 - 4] },
        `<path d="M${rx0 - 14} ${ry0 - 4}q14 70 28 0z" fill="#ffb347" ${Ow(1.6)}/><path d="M${rx0 - 7} ${ry0 - 4}q7 40 14 0z" fill="#fff4c0"/>`))
    const ladder = once(showIn([LANDED, LOOP]), ROCKET,
      `<path d="M${rx0 + 28} ${ry0 - 52}l10 52M${rx0 + 42} ${ry0 - 54}l10 54" stroke="${INK}" stroke-width="4"/><path d="M${rx0 + 28} ${ry0 - 52}l10 52M${rx0 + 42} ${ry0 - 54}l10 54" stroke="#c9ccd8" stroke-width="2"/>` +
        [14, 28, 42].map((d) => `<path d="M${rx0 + 31 + d * 0.19} ${ry0 - 52 + d}h14" stroke="${INK}" stroke-width="2.6"/>`).join(''))
    const rocket = keys('rocket', rocketKeys, ROCKET,
      flame +
        `<path d="M${rx0 - 30} ${ry0 - 40}l-30 40M${rx0 + 30} ${ry0 - 40}l30 40" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M${rx0 - 30} ${ry0 - 40}l-30 40M${rx0 + 30} ${ry0 - 40}l30 40" stroke="#b9bccb" stroke-width="4" stroke-linecap="round"/>` +
        `<ellipse cx="${rx0 - 62}" cy="${ry0}" rx="12" ry="4" fill="#8a8ea0" ${Ow(1.4)}/><ellipse cx="${rx0 + 62}" cy="${ry0}" rx="12" ry="4" fill="#8a8ea0" ${Ow(1.4)}/>` +
        `<path d="M${rx0 - 30} ${ry0 - 70}l-26 40v14l26-14zM${rx0 + 30} ${ry0 - 70}l26 40v14l-26-14z" fill="#e8594a" ${Ow(1.8)}/>` +
        `<path d="M${rx0 - 14} ${ry0 - 20}h28l-4 16h-20z" fill="#6b6f80" ${Ow(1.6)}/>` +
        `<path d="M${rx0 - 30} ${ry0 - 20}V${ry0 - 180}Q${rx0 - 30} ${ry0 - 236} ${rx0} ${ry0 - 262}Q${rx0 + 30} ${ry0 - 236} ${rx0 + 30} ${ry0 - 180}V${ry0 - 20}z" fill="url(#c29-hull)" ${Ow(2.2)}/>` +
        `<path d="M${rx0 - 22} ${ry0 - 218}Q${rx0} ${ry0 - 232} ${rx0 + 22} ${ry0 - 218}Q${rx0 + 14} ${ry0 - 246} ${rx0} ${ry0 - 262}Q${rx0 - 14} ${ry0 - 246} ${rx0 - 22} ${ry0 - 218}z" fill="#e8594a" ${Ow(1.6)}/>` +
        `<path d="M${rx0 - 30} ${ry0 - 60}h60M${rx0 - 30} ${ry0 - 120}h60" stroke="#9aa0b4" stroke-width="2"/>` +
        `<circle cx="${rx0}" cy="${ry0 - 160}" r="15" fill="url(#c29-glass)" ${Ow(2)}/><path d="M${rx0 - 8} ${ry0 - 166}a9 9 0 0 1 8-6" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>` +
        `<rect x="${rx0 - 14}" y="${ry0 - 104}" width="30" height="46" rx="4" fill="#d4d7e2" ${Ow(1.8)}/><circle cx="${rx0 + 10}" cy="${ry0 - 80}" r="2" fill="${INK}"/>` +
        [[-24, -140], [24, -140], [-24, -90], [24, -40]].map(([bx, by]) => `<circle cx="${rx0 + bx}" cy="${ry0 + by}" r="1.8" fill="#9aa0b4"/>`).join('') +
        diff(rx0 - 46, ry0 - 50, 18, `<path d="M${rx0 - 46} ${ry0 - 60}l3 6l7 1l-5 5l1 7l-6-3l-6 3l1-7l-5-5l7-1z" fill="#ffd23f" ${Ow(1.1)}/>`, '', 'rocket') +
        ladder + owlInHelmet)

    // --- The picnic: the checked blanket, the sandwich (a slice of cheese sticking out in A only), the basket (a bow
    // on its handle in A only), the thermos (red in A, blue in B), the can of fish. ---
    const blanket =
      `<path d="M520 752l250-8l24 52l-290 10z" fill="url(#c29-check)" ${Ow(1.8)}/>` +
      `<path d="M520 752l250-8l24 52l-290 10z" fill="#000" fill-opacity="0.06"/>`
    const sandwich =
      `<ellipse cx="560" cy="778" rx="22" ry="6" fill="#f4f1e8" ${Ow(1.4)}/>` +
      `<path d="M544 774l14-10l18 6l-14 10z" fill="#e8c27a" ${Ow(1.3)}/><path d="M546 772l14-10l18 6" fill="none" stroke="#6fbf5a" stroke-width="3"/>` +
      diff(570, 762, 18, `<path d="M566 768l12-6l2 8z" fill="#ffd23f" ${Ow(1.2)}/>`, '') +
      `<path d="M544 768l14-10l18 6l-14 10z" fill="#e8c27a" ${Ow(1.3)}/>`
    const basket =
      groundShadow(700, 772, 26, 4) +
      `<path d="M680 744q20-34 40 0" fill="none" stroke="${INK}" stroke-width="5"/><path d="M680 744q20-34 40 0" fill="none" stroke="#b07a44" stroke-width="3"/>` +
      `<path d="M676 744h48l-6 28h-36z" fill="url(#c29-wicker)" ${Ow(1.8)}/><path d="M678 754h44M680 763h40" stroke="#8a5a32" stroke-width="1.6"/>` +
      `<path d="M676 744h48" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` +
      diff(700, 722, 18, `<path d="M700 724l-9-6v12zM700 724l9-6v12z" fill="#e63946" ${Ow(1.2)}/><circle cx="700" cy="724" r="2.6" fill="#e63946" ${Ow(1)}/>`, '')
    const thermos = (c: string) =>
      `<rect x="742" y="726" width="18" height="40" rx="5" fill="${c}" ${Ow(1.6)}/><rect x="740" y="720" width="22" height="9" rx="3" fill="#d4d7e2" ${Ow(1.4)}/>` +
      `<path d="M746 734v26" stroke="#fff" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round"/>`
    const picnic = blanket + sandwich + basket + groundShadow(751, 770, 14, 3) + diff(751, 743, 26, thermos('#e63946'), thermos('#3a76d0'))
    const [cx0, cy0] = CAN
    const can =
      `<rect x="${cx0 - 11}" y="${cy0 - 20}" width="22" height="20" rx="3" fill="#c9ccd8" ${Ow(1.6)}/><rect x="${cx0 - 11}" y="${cy0 - 15}" width="22" height="9" fill="#4dabf7"/>` +
      `<path d="M${cx0 - 6} ${cy0 - 10}q6-5 12 0q-6 5-12 0z" fill="#fff" fill-opacity="0.85"/>` +
      once(showIn([0, POP]), CAN, `<ellipse cx="${cx0}" cy="${cy0 - 20}" rx="11" ry="3.4" fill="#e3e6ee" ${Ow(1.4)}/><path d="M${cx0 + 2} ${cy0 - 22}l6-3" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`) +
      once(showIn([POP, LOOP]), CAN, `<ellipse cx="${cx0}" cy="${cy0 - 20}" rx="11" ry="3.4" fill="#5a5f70" ${Ow(1.4)}/>`)
    // The lid pops off and floats away, turning.
    const lid = once([{ t: 0, x: 0, y: 0, rot: 0, o: 0, ease: 'step' }, { t: POP, o: 1, ease: 'out' }, { t: POP + 2.2, x: -60, y: -150, rot: 540, o: 1, ease: 'step' }, { t: POP + 2.25, o: 0, ease: 'step' }], [cx0, cy0 - 22],
      `<ellipse cx="${cx0}" cy="${cy0 - 22}" rx="11" ry="3.4" fill="#e3e6ee" ${Ow(1.4)}/>`)
    const pop = once([{ t: 0, sx: 0.3, sy: 0.3, o: 0, ease: 'step' }, { t: POP, o: 1, ease: 'out' }, { t: POP + 0.14, sx: 1.1, sy: 1.1, ease: 'inOut' }, { t: POP + 0.32, sx: 1, sy: 1, o: 1, ease: 'step' }, { t: POP + 0.36, o: 0, ease: 'step' }], [cx0, cy0 - 26],
      `<path d="M${cx0} ${cy0 - 58}l7 16l17-6l-9 15l16 8l-18 3l4 18l-14-11l-11 14l-2-18l-18 1l13-12l-12-13l18 2z" fill="#fff4c0" ${Ow(1.6)}/>`)
    const floatingFish = once(fishKeys, FISH, fish(FISH[0], FISH[1], 0.8, '#7fb8e0'))

    // --- The cat astronaut. ---
    const [kx, ky] = CAT
    /** Its upper half (suit, arms, helmet with the cat's face), `dy` lower when it sits. */
    const armR = (dy: number, extra = '') =>
      keys(undefined, [
        { t: 0, rot: 0 }, { t: 7.6, ease: 'inOut' }, { t: 7.9, rot: -40 }, { t: POP, ease: 'out' }, { t: POP + 0.2, rot: -150 },
        { t: 9.1, rot: -165, ease: 'inOut' }, { t: 11.8, ease: 'inOut' }, { t: 12.1, rot: -40 }, { t: 14.1, ease: 'inOut' }, { t: 14.4, rot: -110 },
        ...[15.4, 16.4, 17.4, 18.4].map((t, i) => ({ t, rot: i % 2 ? -110 : -125, ease: 'inOut' as const })), { t: 19.95, ease: 'step' },
      ], [kx + 18, ky - 70 + dy],
        `<path d="M${kx + 18} ${ky - 70 + dy}v28" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><path d="M${kx + 18} ${ky - 70 + dy}v28" stroke="#f4f4f8" stroke-width="10" stroke-linecap="round"/>` +
          `<circle cx="${kx + 18}" cy="${ky - 40 + dy}" r="7" fill="#ff9f43" ${Ow(1.4)}/>` + extra)
    const armL = (dy: number) =>
      keys(undefined, [
        { t: 0, rot: 0 }, { t: 9.1, ease: 'inOut' }, { t: 9.3, rot: 160 }, { t: 11.8, ease: 'inOut' }, { t: 12.1, rot: 20 }, { t: 19.95, ease: 'step' },
      ], [kx - 18, ky - 70 + dy],
        `<path d="M${kx - 18} ${ky - 70 + dy}v28" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><path d="M${kx - 18} ${ky - 70 + dy}v28" stroke="#f4f4f8" stroke-width="10" stroke-linecap="round"/>` +
          `<circle cx="${kx - 18}" cy="${ky - 40 + dy}" r="7" fill="#ff9f43" ${Ow(1.4)}/>`)
    const catFace = (dy: number) => {
      const hy = ky - 100 + dy
      return (
        `<path d="M${kx - 16} ${hy - 6}l2-14l10 8zM${kx + 16} ${hy - 6}l-2-14l-10 8z" fill="#f4a13b" ${Ow(1.4)}/>` +
        `<circle cx="${kx}" cy="${hy}" r="16" fill="url(#ke-ginger)" ${Ow(1.6)}/>` +
        `<ellipse cx="${kx}" cy="${hy + 7}" rx="8" ry="5" fill="#fff4e0"/><path d="M${kx - 2} ${hy + 4}h4l-2 3z" fill="#e8798f"/>` +
        `<path d="M${kx - 6} ${hy + 10}q3 3 6 0q3 3 6 0" fill="none" stroke="${INK}" stroke-width="1.3" stroke-linecap="round"/>` +
        `<path d="M${kx - 10} ${hy + 6}h-10M${kx + 10} ${hy + 6}h10" stroke="${INK}" stroke-width="1" stroke-opacity="0.6"/>` +
        // Eyes: calm, wide at the floating fish, shut with joy while it eats.
        once(showIn([0, 8.55], [9.1, 12]), CAT, `<circle cx="${kx - 6}" cy="${hy - 3}" r="2.6" fill="${INK}"/><circle cx="${kx + 6}" cy="${hy - 3}" r="2.6" fill="${INK}"/><circle cx="${kx - 5}" cy="${hy - 4}" r="0.9" fill="#fff"/><circle cx="${kx + 7}" cy="${hy - 4}" r="0.9" fill="#fff"/>`) +
        once(showIn([8.55, 9.1], [12, 14.15]), CAT, `<circle cx="${kx - 6}" cy="${hy - 3}" r="4.4" fill="#fff" ${Ow(1)}/><circle cx="${kx + 6}" cy="${hy - 3}" r="4.4" fill="#fff" ${Ow(1)}/><circle cx="${kx - 6}" cy="${hy - 3}" r="1.6" fill="${INK}"/><circle cx="${kx + 6}" cy="${hy - 3}" r="1.6" fill="${INK}"/>`) +
        once(showIn([14.15, LOOP]), CAT, `<path d="M${kx - 9} ${hy - 2}q3-4 6 0M${kx + 3} ${hy - 2}q3-4 6 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`) +
        // The helmet bubble and its antenna.
        `<circle cx="${kx}" cy="${hy + 2}" r="25" fill="#cfe8ff" fill-opacity="0.22" stroke="${INK}" stroke-width="2"/>` +
        `<path d="M${kx - 17} ${hy - 8}a19 19 0 0 1 14-14" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/>` +
        `<path d="M${kx + 9} ${hy - 21}l6-16" stroke="${INK}" stroke-width="2"/>`
      )
    }
    const halfFish = `<g transform="rotate(-30 ${kx + 18} ${ky - 40 + 14})">${fish(kx + 24, ky - 34 + 14, 0.45, '#7fb8e0')}</g>`
    const suit = (dy: number) =>
      `<rect x="${kx - 34}" y="${ky - 82 + dy}" width="16" height="36" rx="4" fill="#9aa0b4" ${Ow(1.6)}/>` +
      `<ellipse cx="${kx}" cy="${ky - 56 + dy}" rx="22" ry="26" fill="url(#c29-suit)" ${Ow(2)}/>` +
      `<rect x="${kx - 9}" y="${ky - 66 + dy}" width="18" height="12" rx="2" fill="#5a5f70" ${Ow(1.2)}/><circle cx="${kx - 4}" cy="${ky - 60 + dy}" r="2" fill="#5cbf5a"/><circle cx="${kx + 3}" cy="${ky - 60 + dy}" r="2" fill="#e63946"/>`
    const standingLegs =
      `<path d="M${kx - 9} ${ky - 34}v26M${kx + 9} ${ky - 34}v26" stroke="${INK}" stroke-width="15" stroke-linecap="round"/><path d="M${kx - 9} ${ky - 34}v26M${kx + 9} ${ky - 34}v26" stroke="#f4f4f8" stroke-width="11" stroke-linecap="round"/>` +
      `<ellipse cx="${kx - 11}" cy="${ky - 4}" rx="10" ry="5" fill="#6b6f80" ${Ow(1.4)}/><ellipse cx="${kx + 11}" cy="${ky - 4}" rx="10" ry="5" fill="#6b6f80" ${Ow(1.4)}/>`
    const sittingLegs =
      `<path d="M${kx - 8} ${ky - 18}h30M${kx + 6} ${ky - 14}h26" stroke="${INK}" stroke-width="15" stroke-linecap="round"/><path d="M${kx - 8} ${ky - 18}h30M${kx + 6} ${ky - 14}h26" stroke="#f4f4f8" stroke-width="11" stroke-linecap="round"/>` +
      `<ellipse cx="${kx + 28}" cy="${ky - 14}" rx="6" ry="9" fill="#6b6f80" ${Ow(1.4)}/><ellipse cx="${kx + 36}" cy="${ky - 10}" rx="6" ry="9" fill="#6b6f80" ${Ow(1.4)}/>`
    const SITTING_DY = 14
    // In A only: the little ball on top of its helmet's antenna (a hard one).
    const antennaBall = (dy: number) => `<circle cx="${kx + 15}" cy="${ky - 100 + dy - 39}" r="4.6" fill="#ff5a5a" ${Ow(1.3)}/><circle cx="${kx + 14}" cy="${ky - 100 + dy - 41}" r="1.4" fill="#fff"/>`
    const catStanding = standingLegs + suit(0) + armL(0) + catFace(0) + armR(0)
    const catSitting = sittingLegs + suit(SITTING_DY) + armL(SITTING_DY) + catFace(SITTING_DY) + armR(SITTING_DY, once(showIn([14.15, LOOP]), CAT, halfFish))
    const cat = keys('cat', catKeys, CAT,
      once([{ t: 0, sx: 1, sy: 1, o: 1 }, { t: 4.9, ease: 'step' }], CAT, groundShadow(kx, ky, 26, 5)) +
        once(showIn([0, SIT[0][0]], [SIT[0][1], SIT[1][0]]), CAT, catStanding) +
        once(showIn(...SIT), CAT, catSitting) +
        diff(kx + 15, ky - 132, 18, once(showIn([0, SIT[0][0]], [SIT[0][1], SIT[1][0]]), CAT, antennaBall(0)) + once(showIn(...SIT), CAT, antennaBall(SITTING_DY)), '', 'cat'))
    // Dust where it lands after every hop.
    const hopDust = [[-300, -49, 5.7], [0, 0, 6.42], [143, 1, 10.07], [287, 1, 11.03], [430, 2, 11.92]].map(([dx, dy, t]) => dust(kx + dx, ky + dy, t, 0.9)).join('')

    // --- The crater: the alien rises and catches the fish (a glowing sprout on the rim in A only); in B a second
    // alien's antennae peek out of a little crater beside it. ---
    const [ax, ay] = ALIEN
    const alienArm = (side: number, k: Keyframe[], extra = '') =>
      keys(undefined, k, [ax + side * 18, ay - 34],
        `<path d="M${ax + side * 18} ${ay - 34}q${side * 14} 10 ${side * 26} 2" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M${ax + side * 18} ${ay - 34}q${side * 14} 10 ${side * 26} 2" fill="none" stroke="#7ad36a" stroke-width="5" stroke-linecap="round"/>` +
          `<circle cx="${ax + side * 44}" cy="${ay - 32}" r="5" fill="#7ad36a" ${Ow(1.3)}/>` + extra)
    const heldFish = (rot: number) => `<g transform="rotate(${rot} ${ax - 44} ${ay - 44})">${fish(ax - 44, ay - 44, 0.8, '#7fb8e0')}</g>`
    const alienBody =
      `<ellipse cx="${ax}" cy="${ay - 28}" rx="24" ry="28" fill="url(#c29-alien)" ${Ow(2)}/>` +
      `<path d="M${ax - 8} ${ay - 52}l-8-20M${ax + 8} ${ay - 52}l8-20" stroke="${INK}" stroke-width="3"/><circle cx="${ax - 16}" cy="${ay - 73}" r="5" fill="#ffe066" ${Ow(1.3)}/><circle cx="${ax + 16}" cy="${ay - 73}" r="5" fill="#ffe066" ${Ow(1.3)}/>` +
      `<circle cx="${ax}" cy="${ay - 34}" r="11" fill="#fff" ${Ow(1.6)}/><circle cx="${ax - 2}" cy="${ay - 33}" r="5" fill="#3a2a5a"/><circle cx="${ax - 4}" cy="${ay - 35}" r="1.6" fill="#fff"/>` +
      blink(2.8, 0.2)(`<circle cx="${ax}" cy="${ay - 34}" r="11.5" fill="#7ad36a"/><path d="M${ax - 10} ${ay - 34}h20" stroke="${INK}" stroke-width="1.6"/>`) +
      `<path d="M${ax - 8} ${ay - 16}q8 6 16 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>` +
      once(showIn([14.4, LOOP]), ALIEN, anim({ type: 'keys', period: 0.5, keys: [{ t: 0, sy: 1 }, { t: 0.25, sy: 0.4, ease: 'inOut' }], pivot: [ax, ay - 15] }, `<ellipse cx="${ax}" cy="${ay - 15}" rx="4" ry="3" fill="#3a2a5a"/>`))
    const alien = `<g clip-path="url(#c29-crater)">` + keys(undefined, [{ t: 0, y: 70, o: 0, ease: 'step' }, { t: 11.75, o: 1, ease: 'out' }, { t: 12.1, y: 0, ease: 'inOut' }, { t: 12.4, y: -4, ease: 'inOut' }, { t: 12.6, y: 0 }, { t: 19.95, ease: 'step' }], ALIEN,
      alienBody +
        // Left arm: up to catch, then holding the fish out to the cat, then half of it to its own mouth.
        alienArm(-1, [{ t: 0, rot: 0 }, { t: 11.9, ease: 'out' }, { t: CATCH - 0.1, rot: 50 }, { t: 12.8, ease: 'inOut' }, { t: 13.3, rot: 0 }, { t: 14.1, ease: 'inOut' }, { t: 14.4, rot: 70 }, { t: 19.95, ease: 'step' }],
          once(showIn([CATCH, 14.15]), ALIEN, heldFish(-10)) + once(showIn([14.15, LOOP]), ALIEN, `<g transform="rotate(20 ${ax - 44} ${ay - 44})">${fish(ax - 40, ay - 44, 0.45, '#7fb8e0')}</g>`)) +
        alienArm(1, [{ t: 0, rot: 0 }, { t: 12.4, ease: 'inOut' }, { t: 12.8, rot: -30 }, { t: 13.2, rot: 0, ease: 'inOut' }, { t: 19.95, ease: 'step' }])) + `</g>`
    const sprout = diff(1188, 765, 21,
      anim({ type: 'blink', duty: 0.5, period: 1.6, phase: 0.2 }, `<circle cx="1188" cy="756" r="9" fill="#b8ffda" fill-opacity="0.35"/>`) +
        `<path d="M1188 778q-2-12 0-22" stroke="#3ac07a" stroke-width="2.4"/><path d="M1188 766q-8-6-12 0q6 4 12 0zM1188 762q8-6 12 0q-6 4-12 0z" fill="#5ee0a0" ${Ow(1)}/><circle cx="1188" cy="756" r="3.4" fill="#e8fff0" ${Ow(1)}/>`,
      '')
    const SMALL: [number, number] = [990, 794]
    const smallCrater = crater(SMALL[0], SMALL[1], 26)
    const peeker = diff(SMALL[0], SMALL[1] - 16, 22, '',
      `<g clip-path="url(#c29-small)">` + once([{ t: 0, y: 30, o: 0, ease: 'step' }, { t: 12.2, o: 1, ease: 'out' }, { t: 12.6, y: 0 }, { t: 13.6, ease: 'in' }, { t: 13.95, y: 30, o: 1, ease: 'step' }, { t: 14, o: 0, ease: 'step' }], SMALL,
        `<path d="M${SMALL[0] - 5} ${SMALL[1]}l-4-22M${SMALL[0] + 5} ${SMALL[1]}l4-22" stroke="${INK}" stroke-width="2.6"/><circle cx="${SMALL[0] - 9}" cy="${SMALL[1] - 24}" r="4.4" fill="#ffe066" ${Ow(1.2)}/><circle cx="${SMALL[0] + 9}" cy="${SMALL[1] - 24}" r="4.4" fill="#ffe066" ${Ow(1.2)}/>`) + `</g>`,
      undefined, during(12.2, 14))

    // --- The moon-rover on the plain (a dish on its mast in A only); B's satellite and shooting star. ---
    const rover =
      groundShadow(1310, 752, 50, 6) +
      `<path d="M1268 726h84l-6 20h-72z" fill="#d4d7e2" ${Ow(1.8)}/><rect x="1280" y="712" width="40" height="14" rx="3" fill="#ffd23f" ${Ow(1.6)}/>` +
      [1282, 1310, 1338].map((wx) => `<circle cx="${wx}" cy="750" r="9" fill="#5a5f70" ${Ow(1.6)}/><circle cx="${wx}" cy="750" r="3" fill="#b9bccb"/>`).join('') +
      `<path d="M1332 726v-26" stroke="${INK}" stroke-width="3"/>` +
      anim({ type: 'blink', duty: 0.5, period: 1, phase: 0 }, `<circle cx="1272" cy="732" r="3" fill="#ff5a5a"/>`) +
      diff(1333, 694, 22, `<path d="M1320 692q12 16 26 0z" fill="#e3e6ee" ${Ow(1.6)}/><path d="M1333 692l4-10" stroke="${INK}" stroke-width="1.8"/><circle cx="1337" cy="681" r="2.4" fill="#ff5a5a"/>`, '')
    const SAT: [number, number] = [260, 424]
    const satellite = diff(SAT[0], SAT[1], 30, '',
      keys('sat', [{ t: 0, x: -230, y: 6, rot: -8, o: 0, ease: 'step' }, { t: 1.8, o: 1, ease: 'linear' }, { t: 4.2, x: 250, y: -6, rot: 8, o: 1, ease: 'step' }, { t: 4.25, o: 0, ease: 'step' }], SAT,
        `<rect x="${SAT[0] - 7}" y="${SAT[1] - 7}" width="14" height="14" rx="2" fill="#e3e6ee" ${Ow(1.4)}/>` +
          `<rect x="${SAT[0] - 27}" y="${SAT[1] - 5}" width="18" height="10" fill="#3a76d0" ${Ow(1.2)}/><rect x="${SAT[0] + 9}" y="${SAT[1] - 5}" width="18" height="10" fill="#3a76d0" ${Ow(1.2)}/>` +
          `<path d="M${SAT[0] - 18} ${SAT[1] - 5}v10M${SAT[0] + 18} ${SAT[1] - 5}v10" stroke="#9fd0ff" stroke-width="1"/><path d="M${SAT[0]} ${SAT[1] - 7}v-7" stroke="${INK}" stroke-width="1.6"/>` +
          anim({ type: 'blink', duty: 0.4, period: 0.8 }, `<circle cx="${SAT[0]}" cy="${SAT[1] - 15}" r="2.2" fill="#ff5a5a"/>`)),
      'sat', during(1.8, 4.25))
    const METEOR: [number, number] = [1150, 524]
    const meteor = diff(METEOR[0], METEOR[1], 28, '',
      keys('meteor', [{ t: 0, x: -150, y: -18, o: 0, ease: 'step' }, { t: 15.2, o: 1, ease: 'linear' }, { t: 18.8, x: 150, y: 18, o: 1, ease: 'step' }, { t: 18.85, o: 0, ease: 'step' }], METEOR,
        `<path d="M${METEOR[0] - 22} ${METEOR[1] - 6}L${METEOR[0] + 18} ${METEOR[1] + 4}" stroke="#fff4c0" stroke-opacity="0.6" stroke-width="5" stroke-linecap="round"/>` +
          `<path d="M${METEOR[0] - 8} ${METEOR[1] - 2}L${METEOR[0] + 18} ${METEOR[1] + 4}" stroke="#fff" stroke-width="3" stroke-linecap="round"/>` +
          `<path d="M${METEOR[0] + 18} ${METEOR[1] - 4}l2 5l5 1l-4 3l1 5l-4-3l-4 3l1-5l-4-3l5-1z" fill="#fff" ${Ow(0.8)}/>`),
      'meteor', during(15.2, 18.85))

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c29-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16133e"/><stop offset="0.6" stop-color="#2f2766"/><stop offset="1" stop-color="#5a4a8e"/></linearGradient>` +
      `<linearGradient id="c29-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9c6d6"/><stop offset="0.6" stop-color="#b3afc4"/><stop offset="1" stop-color="#9894ad"/></linearGradient>` +
      `<radialGradient id="c29-rim" cx="0.4" cy="0.3" r="0.8"><stop offset="0" stop-color="#e6e3ee"/><stop offset="1" stop-color="#a9a5bc"/></radialGradient>` +
      `<radialGradient id="c29-pit" cx="0.3" cy="0.4" r="0.8"><stop offset="0" stop-color="#6f6a86"/><stop offset="1" stop-color="#9894ad"/></radialGradient>` +
      `<radialGradient id="c29-rock" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#e3e0ea"/><stop offset="1" stop-color="#8e8aa2"/></radialGradient>` +
      `<radialGradient id="c29-earth" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#8fd0ff"/><stop offset="0.7" stop-color="#3a86d8"/><stop offset="1" stop-color="#1f5aa8"/></radialGradient>` +
      `<radialGradient id="c29-planet" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#ffd9a8"/><stop offset="1" stop-color="#d98a5a"/></radialGradient>` +
      `<linearGradient id="c29-hull" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset="0.6" stop-color="#e8eaf2"/><stop offset="1" stop-color="#b9bccb"/></linearGradient>` +
      `<radialGradient id="c29-glass" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#cfe8ff"/><stop offset="1" stop-color="#3a76d0"/></radialGradient>` +
      `<radialGradient id="c29-suit" cx="0.35" cy="0.3" r="0.85"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c9ccd8"/></radialGradient>` +
      `<radialGradient id="c29-alien" cx="0.35" cy="0.3" r="0.85"><stop offset="0" stop-color="#b8f5a0"/><stop offset="1" stop-color="#4fae46"/></radialGradient>` +
      `<linearGradient id="c29-wicker" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3b87a"/><stop offset="1" stop-color="#b07a44"/></linearGradient>` +
      `<pattern id="c29-check" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#fff4f0"/><rect width="10" height="10" fill="#e63946"/><rect x="10" y="10" width="10" height="10" fill="#e63946"/></pattern>` +
      `<radialGradient id="c29-sunlight" cx="0.1" cy="0.2" r="1"><stop offset="0" stop-color="#fff6e0" stop-opacity="0.22"/><stop offset="0.6" stop-color="#fff6e0" stop-opacity="0.04"/><stop offset="1" stop-color="#fff6e0" stop-opacity="0"/></radialGradient>` +
      `<clipPath id="c29-crater"><rect x="${ALIEN[0] - 90}" y="560" width="180" height="${ALIEN[1] - 556}"/></clipPath>` +
      `<clipPath id="c29-small"><rect x="${SMALL[0] - 40}" y="700" width="80" height="${SMALL[1] - 698}"/></clipPath></defs>` +
      sky +
      satellite +
      meteor +
      ground +
      flag +
      pebbles +
      rocket +
      dust(rx0, ry0, LANDED, 1.6) +
      picnic +
      can +
      lid +
      rover +
      crater(ALIEN[0], ALIEN[1], 74) +
      alien +
      sprout +
      smallCrater +
      peeker +
      cat +
      hopDust +
      floatingFish +
      pop +
      `<rect width="${W}" height="${H}" fill="url(#c29-sunlight)"/>`
    )
  },
})
