// Cartoon "The pearl" (docs/cartoon-mode.md), made like 812: a 20 s story on a coral reef told by a camera. An
// octopus finds a pearl in an oyster and hides it in a giant clam; two clownfish tease it; a shark swims up — a cloud
// of ink, and when it clears the shark wears two shells for glasses, turns blindly and bonks into the rock arch.
// Meanwhile a crab pries the clam open and walks off with the pearl; the octopus comes back to an empty clam, and the
// crab waves the pearl from its rock. Ten differences: two hard (a porthole of the sunken ship, a spine of the sea
// urchin), three events of the story.
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { fish, INK, keenOwl, NATURE_DEFS, O, Ow, swingKeys } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 87, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // Down past the sunken ship: its flag, the owl in its diving mask, the portholes, the anchor, the kelp.
  { t: 1.6, x: 0, y: 220, w: 760, ease: 'linear' },
  { t: 2.8, x: 0, y: 220, w: 760, ease: 'inOut' },
  { t: 3.5, x: 80, y: 430, w: 680, ease: 'step' },
  // The octopus finds a pearl and hides it in the clam.
  { t: 4.6, x: 520, y: 620, w: 400, ease: 'step' },
  // The clownfish tease it.
  { t: 7, x: 600, y: 520, w: 520, ease: 'step' },
  // The shark.
  { t: 9.5, x: 700, y: 440, w: 700, ease: 'inOut' },
  { t: 11, x: 760, y: 470, w: 560, ease: 'step' },
  // In shell glasses, blindly into the rock arch.
  { t: 12.6, x: 860, y: 440, w: 580, ease: 'step' },
  // Meanwhile the crab.
  { t: 14.6, x: 620, y: 640, w: 380, ease: 'step' },
  // The empty clam, the crab with the pearl.
  { t: 16.9, x: 600, y: 560, w: 480 },
  { t: 19.95, x: 606, y: 563, w: 470, ease: 'step' },
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

/** The sand floor starts here. */
const FLOOR = 760
/** The giant clam's hinge side and middle. */
const CLAM: [number, number] = [770, 800]
/** The oyster with the pearl. */
const OYSTER: [number, number] = [580, 806]

/** The octopus: the point where its arms meet (it starts by the kelp). */
const OCTO: [number, number] = [480, 800]
const octoKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, rot: 0, sy: 1 },
  { t: 4.4, ease: 'inOut' },
  // To the oyster, the pearl in its arm, over to the clam.
  { t: 5, x: 50, y: 0, ease: 'inOut' },
  { t: 5.2, ease: 'inOut' },
  { t: 6, x: 230, y: -30, ease: 'inOut' },
  { t: 6.7, ease: 'inOut' },
  // Smug on top of the clam while the clownfish tease it.
  { t: 7, x: 290, y: -54, ease: 'inOut' },
  ...Array.from({ length: 8 }, (_, i) => ({ t: 7.3 + i * 0.28, rot: i % 2 ? -8 : 8, ease: 'inOut' as const })),
  { t: 9.5, rot: 0, sy: 1, ease: 'out' },
  // The shark! Shrinking, then the ink and away.
  { t: 9.8, sy: 0.84, ease: 'inOut' },
  { t: 10.7, ease: 'out' },
  { t: 10.9, x: 300, y: -80, sy: 1.1, ease: 'in' },
  { t: 11.6, x: -120, y: -170, sy: 1, ease: 'step' },
  // Back to the clam.
  { t: 16.4, x: -40, y: -20, ease: 'out' },
  { t: 17, x: 250, y: -16, ease: 'inOut' },
  { t: 17.6, y: -24, sy: 1.08, ease: 'inOut' },
  { t: 17.9, y: -16, sy: 1, ease: 'inOut' },
  { t: 19.95, ease: 'step' },
]
/** Its grabbing arm turns about its root. */
const armKeys: Keyframe[] = [
  { t: 0, rot: 0 },
  { t: 4.8, ease: 'inOut' },
  { t: 4.95, rot: 14, ease: 'inOut' },
  { t: 5.1, rot: -30, ease: 'inOut' },
  { t: 6, ease: 'inOut' },
  { t: 6.3, rot: 22, ease: 'inOut' },
  { t: 6.6, rot: 0, ease: 'inOut' },
  { t: 17, ease: 'inOut' },
  { t: 17.25, rot: 12, ease: 'inOut' },
  { t: 17.5, rot: -40, ease: 'inOut' },
  // A tentacle to the forehead.
  { t: 18.8, ease: 'inOut' },
  { t: 19.1, rot: -125, ease: 'inOut' },
  { t: 19.95, ease: 'step' },
]
/** The clam's lid, hinged at its back (right) end. */
const lidKeys: Keyframe[] = [
  { t: 0, rot: 0 },
  { t: 6, ease: 'out' },
  { t: 6.2, rot: 40, ease: 'inOut' },
  { t: 6.65, ease: 'in' },
  { t: 6.85, rot: 0, ease: 'step' },
  // The crab pries it open.
  { t: 15, ease: 'out' },
  { t: 15.25, rot: 30, ease: 'inOut' },
  { t: 15.65, ease: 'in' },
  { t: 15.8, rot: 0, ease: 'step' },
  // The octopus lifts it: empty.
  { t: 17.25, ease: 'out' },
  { t: 17.5, rot: 44, ease: 'inOut' },
  { t: 19.95, ease: 'step' },
]

/** The shark: the middle of its body; it comes in from the right. */
const SHARK: [number, number] = [1100, 600]
const sharkKeys: Keyframe[] = [
  { t: 0, x: 520, y: -20, sx: 1, sy: 1 },
  { t: 9.5, ease: 'out' },
  { t: 10.6, x: 0, y: 0, ease: 'inOut' },
  { t: 10.9, x: -10, ease: 'inOut' },
  { t: 12.4, x: 0, sx: 1, ease: 'inOut' },
  // Turns round blindly and swims into the arch: bonk.
  { t: 12.65, sx: -1, ease: 'in' },
  { t: 13.5, x: 150, ease: 'out' },
  { t: 13.6, x: 140, sy: 0.86, ease: 'out' },
  { t: 13.8, sy: 1, ease: 'inOut' },
  { t: 14.6, ease: 'in' },
  { t: 16, x: 600, y: -30, ease: 'step' },
]

/** The crab: under its rock, then to the clam, back up the rock with the pearl. */
const CRAB: [number, number] = [892, 828]
const CRAB_WALKS: [number, number][] = [[14.6, 15], [15.5, 16.6]]
const crabKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, rot: 0 },
  { t: 14.6, ease: 'linear' },
  { t: 15, x: -146, y: -2, ease: 'step' },
  { t: 15.5, ease: 'linear' },
  { t: 16.2, x: 20, y: -30, ease: 'out' },
  { t: 16.6, x: 52, y: -74, ease: 'step' },
  { t: 19.95, ease: 'step' },
]

export default svgLevel({
  id: 809,
  chapter: 'cartoon',
  title: 'cartoonPearl',
  parTimeSec: 100,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    /** Swaying with the current. */
    const current = (pivot: [number, number], angle: number, period: number, m: string, id?: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 13) / 13, ...(id && { id }) }, m)
    const blink = (period: number, phase = 0) => (m: string) => anim({ type: 'blink', duty: 0.07, period, phase }, m)

    // --- The water: the bright surface, light rays, caustics on the sand, far reef shapes, floating specks. ---
    let rays = ''
    for (let i = 0; i < 7; i++) {
      const rx = 80 + i * 210
      rays += anim({ type: 'keys', period: 6 + i, phase: i / 7, keys: [{ t: 0, x: 0, o: 0.8 }, { t: (6 + i) / 2, x: 40, o: 1, ease: 'inOut' }] },
        `<path d="M${rx} 0h70l${120 - i * 6} ${FLOOR}h-150z" fill="#eafcff" fill-opacity="0.12"/>`)
    }
    const surface =
      `<rect width="${W}" height="${H}" fill="url(#c12-water)"/>` +
      anim({ type: 'keys', period: 4, keys: [{ t: 0, x: 0 }, { t: 2, x: 30, ease: 'inOut' }] },
        `<path d="M-40 26q30-12 60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0V0H-40z" fill="#d6f6ff" fill-opacity="0.8"/>`)
    let farReef = ''
    for (let i = 0; i < 16; i++) {
      const fx = Math.round(i * 96 + rand() * 40)
      const fy = Math.round(640 + rand() * 50)
      farReef += `<ellipse cx="${fx}" cy="${fy}" rx="${Math.round(60 + rand() * 40)}" ry="${Math.round(40 + rand() * 30)}" fill="#2f7fa6" fill-opacity="0.55"/>`
    }
    // A shoal far off, crossing the whole reef.
    let shoal = ''
    for (let i = 0; i < 9; i++) shoal += fish(Math.round(-160 + (i % 3) * 30 + rand() * 10), Math.round(300 + Math.floor(i / 3) * 22 + rand() * 8), 0.45, '#8fc7e8')
    const shoalMarkup = anim({ type: 'path', points: [[0, 0], [1800, -60]], period: 20 }, shoal)
    let specks = ''
    for (let i = 0; i < 26; i++) {
      const sx = Math.round(rand() * W)
      const sy = Math.round(80 + rand() * 640)
      specks += anim({ type: 'path', points: [[0, 0], [20, -60], [-10, -120]], period: 6 + rand() * 6, phase: rand() }, `<circle cx="${sx}" cy="${sy}" r="${(1 + rand() * 1.6).toFixed(1)}" fill="#fff" fill-opacity="0.5"/>`)
    }
    const sand =
      `<path d="M0 ${FLOOR}q180-24 360-6t360 8t360-14t360 6V${H}H0z" fill="url(#c12-sand)" ${Ow(1.6)}/>` +
      anim({ type: 'keys', period: 5, keys: [{ t: 0, x: 0, o: 0.7 }, { t: 2.5, x: 24, o: 1, ease: 'inOut' }] },
        `<path d="M40 800q30-10 60 0t60 0M260 830q30-10 60 0t60 0M520 790q30-10 60 0M900 812q30-10 60 0t60 0M1160 840q30-10 60 0t60 0M1300 796q30-10 60 0M120 870q30-10 60 0t60 0M700 872q30-10 60 0t60 0" fill="none" stroke="#fffbe0" stroke-opacity="0.55" stroke-width="3" stroke-linecap="round"/>`)
    // Bubbles rising here and there.
    const bubbles = (x: number, y: number, n: number, period: number) =>
      Array.from({ length: n }, (_, i) =>
        anim({ type: 'keys', period, phase: i / n, keys: [{ t: 0, x: 0, y: 0, o: 0.9 }, { t: period, x: (i % 2 ? 8 : -8), y: -260, o: 0 }], pivot: [x, y] },
          `<circle cx="${x}" cy="${y}" r="${3 + (i % 3)}" fill="#fff" fill-opacity="0.35" stroke="#fff" stroke-width="1.2"/>`),
      ).join('')

    // --- Kelp, swaying. ---
    const kelp = (x: number, h: number, id?: string, extra = '') =>
      current([x, FLOOR + 40], 5, 4.4, `<path d="M${x} ${FLOOR + 40}q-14-${h / 3} 4-${(2 * h) / 3}t-6-${h / 3}" fill="none" stroke="${INK}" stroke-width="13" stroke-linecap="round"/>` +
        `<path d="M${x} ${FLOOR + 40}q-14-${h / 3} 4-${(2 * h) / 3}t-6-${h / 3}" fill="none" stroke="url(#c12-kelp)" stroke-width="9" stroke-linecap="round"/>` +
        [0.3, 0.55, 0.8].map((f, i) => `<path d="M${x + (i % 2 ? 4 : -4)} ${Math.round(FLOOR + 40 - h * f)}q${i % 2 ? 20 : -20}-6 ${i % 2 ? 26 : -26}-22q${i % 2 ? -14 : 14} 6-${i % 2 ? 26 : -26} 22z" fill="#5fa84a" ${Ow(1.4)}/>`).join('') + extra, id)
    // In B a seahorse peeks out from behind the kelp while the camera goes down past the ship.
    const SEAHORSE: [number, number] = [470, 600]
    const [hx, hy] = SEAHORSE
    const seahorse = diff(
      hx + 2,
      hy + 6,
      34,
      '',
      keys('seahorse', [{ t: 0, x: -16, o: 0, ease: 'step' }, { t: 1.6, o: 1, ease: 'out' }, { t: 2.1, x: 0 }, { t: 3.6, ease: 'inOut' }, { t: 3.9, y: -6, ease: 'inOut' }, { t: 4.4, y: 0, o: 1, ease: 'step' }, { t: 4.45, o: 0, ease: 'step' }], SEAHORSE,
        `<path d="M${hx - 2} ${hy + 10}q-8 14 2 20q8 2 6-6q-2-4-6-2" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M${hx - 2} ${hy + 10}q-8 14 2 20q8 2 6-6q-2-4-6-2" fill="none" stroke="#ffb84a" stroke-width="3.4" stroke-linecap="round"/>` +
          `<path d="M${hx - 8} ${hy - 10}q8-8 14 4q4 10-6 18q-10-6-8-22z" fill="#ffb84a" ${Ow(1.6)}/>` +
          `<path d="M${hx - 6} ${hy - 12}q4-8 10-6l10-4l-2 8q-4 4-10 4z" fill="#ffb84a" ${Ow(1.4)}/><circle cx="${hx + 2}" cy="${hy - 12}" r="1.8" fill="${INK}"/>` +
          `<path d="M${hx - 8} ${hy - 4}l-5-2M${hx - 9} ${hy + 2}l-5-1" stroke="#e8902a" stroke-width="2" stroke-linecap="round"/>`),
      'seahorse',
      during(1.6, 4.45),
    )
    const kelpLeft = kelp(18, 520) + kelp(46, 430) + kelp(428, 300) + kelp(452, 380)
    const kelpFront = kelp(486, 330) + kelp(1416, 460) + kelp(1388, 360)

    // --- The sunken ship: a flag on its mast (A only), the game's owl in a diving mask in the crow's nest, its
    // portholes (one fewer in B: a hard one), the anchor by its bow (A only). ---
    const portholes = [[100, 690], [160, 683], [220, 677], [280, 670], [340, 664]]
      .map(([px, py], i) => {
        const p = `<circle cx="${px}" cy="${py}" r="10" fill="#c9a34a" ${Ow(1.6)}/><circle cx="${px}" cy="${py}" r="6.5" fill="#1f4f6a"/><circle cx="${px - 2}" cy="${py - 2}" r="1.8" fill="#bfe8f5"/>`
        return i === 2 ? diff(px, py, 18, p, '') : p
      })
      .join('')
    const owlMasked =
      keenOwl(240, 346, 0.95, blink(3.3, 0.2)) +
      // Mask, strap, snorkel.
      `<rect x="225" y="318" width="31" height="18" rx="8" fill="#bfe8f5" fill-opacity="0.45" stroke="#2b3a4a" stroke-width="2.6"/>` +
      `<path d="M240 318v18" stroke="#2b3a4a" stroke-width="2"/><path d="M225 324h-4M256 324h4" stroke="#2b3a4a" stroke-width="3"/>` +
      `<path d="M258 330q8 0 8-10v-22" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M258 330q8 0 8-10v-22" fill="none" stroke="#ffd23f" stroke-width="3.4" stroke-linecap="round"/>`
    const ship =
      // Hull, deck, planks.
      `<path d="M30 800l24-150q190-20 356-48l-12 104q-160 64-368 94z" fill="url(#c12-wreck)" ${O}/>` +
      `<path d="M44 720q170-24 360-74M40 760q170-26 356-72" fill="none" stroke="#2e3a3a" stroke-opacity="0.5" stroke-width="2.4"/>` +
      `<path d="M54 650q190-20 356-48l4 14q-170 30-362 50z" fill="#5b4a36" ${Ow(1.8)}/>` +
      // A broken rail, weed hanging from it.
      `<path d="M70 646v-20M120 640v-20M170 634v-22M330 614v-18M380 606v-18M66 626q140-18 120-14M326 596q40-6 56-8" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` +
      current([150, 650], 6, 3.6, `<path d="M150 650q-6 20 4 40M210 642q6 16-2 34" fill="none" stroke="#5fa84a" stroke-width="4" stroke-linecap="round"/>`) +
      portholes +
      // Barnacles.
      `<circle cx="70" cy="760" r="4" fill="#e8e1d6" ${Ow(1)}/><circle cx="82" cy="768" r="3" fill="#e8e1d6" ${Ow(1)}/><circle cx="300" cy="720" r="4" fill="#e8e1d6" ${Ow(1)}/>` +
      // The mast and its crow's nest.
      `<path d="M228 628l8-330" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M228 628l8-330" stroke="#7a5a3a" stroke-width="7" stroke-linecap="round"/>` +
      `<path d="M150 450l170-10" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M150 450l170-10" stroke="#7a5a3a" stroke-width="4" stroke-linecap="round"/>` +
      current([236, 300], 3, 3.8, diff(268, 293, 30, `<path d="M240 282q16-6 28 2t24-2l-6 12l6 10q-12 6-24-2t-28 2z" fill="#2b2b3a" ${Ow(1.6)}/><circle cx="262" cy="292" r="4" fill="#fff"/><path d="M258 298l8 0" stroke="#fff" stroke-width="2"/>`, '')) +
      current([240, 346], 6, 3.6, owlMasked) +
      `<path d="M216 342h46l-4 18h-38z" fill="url(#c12-planks)" ${Ow(1.8)}/><path d="M222 350h34" stroke="#5b4a36" stroke-width="1.6"/>` +
      diff(412, 746, 42,
        `<path d="M412 718v60M398 726h28" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M412 718v60M398 726h28" stroke="#6f7c86" stroke-width="4" stroke-linecap="round"/>` +
          `<circle cx="412" cy="714" r="6" fill="none" stroke="${INK}" stroke-width="5"/><path d="M388 766q24 22 48 0" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M388 766q24 22 48 0" fill="none" stroke="#6f7c86" stroke-width="4" stroke-linecap="round"/>` +
          `<path d="M384 760l4 8l6-6M440 760l-4 8l-6-6" fill="#6f7c86" ${Ow(1.4)}/>`, '') +
      bubbles(266, 296, 3, 2.4)

    // --- The coral garden: the oyster with the pearl, the half-buried chest (in B a fish peeks out at the end), a
    // bottle in the sand (A only), the giant clam. ---
    const coral = (x: number, y: number, c: string, s = 1) =>
      current([x, y], 3, 4.8, `<path d="M${x} ${y}v-${30 * s}M${x} ${y - 14 * s}l-${16 * s}-${18 * s}v-${12 * s}M${x} ${y - 20 * s}l${18 * s}-${16 * s}v-${14 * s}M${x - 16 * s} ${y - 32 * s}l-${8 * s}-${8 * s}M${x + 18 * s} ${y - 36 * s}l${6 * s}-${10 * s}M${x} ${y - 30 * s}l-${4 * s}-${14 * s}" fill="none" stroke="${INK}" stroke-width="${9 * s}" stroke-linecap="round"/>` +
        `<path d="M${x} ${y}v-${30 * s}M${x} ${y - 14 * s}l-${16 * s}-${18 * s}v-${12 * s}M${x} ${y - 20 * s}l${18 * s}-${16 * s}v-${14 * s}M${x - 16 * s} ${y - 32 * s}l-${8 * s}-${8 * s}M${x + 18 * s} ${y - 36 * s}l${6 * s}-${10 * s}M${x} ${y - 30 * s}l-${4 * s}-${14 * s}" fill="none" stroke="${c}" stroke-width="${5.4 * s}" stroke-linecap="round"/>`)
    const brain = (x: number, y: number, r: number) =>
      `<path d="M${x - r} ${y}a${r} ${r * 0.8} 0 0 1 ${2 * r} 0z" fill="url(#c12-brain)" ${O}/>` +
      `<path d="M${x - r * 0.7} ${y - 4}q${r * 0.2}-${r * 0.4} ${r * 0.4}-${r * 0.2}t${r * 0.4}-${r * 0.3}t${r * 0.4} ${r * 0.1}M${x - r * 0.5} ${y - r * 0.4}q${r * 0.3}-${r * 0.3} ${r * 0.6}-${r * 0.1}t${r * 0.5} 0" fill="none" stroke="#b5704a" stroke-width="2.4" stroke-linecap="round"/>`
    const tube = (x: number, y: number) =>
      [0, 1, 2].map((i) => `<rect x="${x + i * 10 - 14}" y="${y - 30 - (i % 2) * 14}" width="9" height="${30 + (i % 2) * 14}" rx="4" fill="#b98cff" ${Ow(1.4)}/><ellipse cx="${x + i * 10 - 9.5}" cy="${y - 30 - (i % 2) * 14}" rx="4.5" ry="2" fill="#5a3a8a"/>`).join('')
    const [ox0, oy0] = OYSTER
    const oyster =
      `<path d="M${ox0 - 22} ${oy0}q22 16 44 0q-22-6-44 0z" fill="#9aa3ad" ${Ow(1.8)}/>` +
      `<path d="M${ox0 - 22} ${oy0}q4-24 44-14q-20 4-44 14z" fill="#c9ced6" ${Ow(1.8)}/><path d="M${ox0 - 14} ${oy0 - 6}q10-10 24-10" fill="none" stroke="#e8ecf2" stroke-width="2"/>`
    const pearl = (x: number, y: number) =>
      `<circle cx="${x}" cy="${y}" r="7" fill="url(#c12-pearl)" ${Ow(1.4)}/><circle cx="${x - 2}" cy="${y - 2.4}" r="2" fill="#fff"/>` +
      anim({ type: 'keys', period: 1.4, keys: [{ t: 0, sx: 0.6, sy: 0.6, o: 0 }, { t: 0.7, sx: 1, sy: 1, o: 0.9, ease: 'inOut' }], pivot: [x + 4, y - 5] },
        `<path d="M${x + 4} ${y - 11}v12M${x - 2} ${y - 5}h12" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`)
    const oysterPearl = once(showIn([0, 5.05]), OYSTER, pearl(ox0, oy0 - 4))
    const CHEST: [number, number] = [660, 842]
    const [cx0, cy0] = CHEST
    const chestLid = `<path d="M${cx0 - 30} ${cy0 - 20}q30-20 60 0z" fill="url(#c12-planks)" ${Ow(1.8)}/><path d="M${cx0 - 30} ${cy0 - 20}h60" stroke="#c9a34a" stroke-width="3"/>`
    const chest =
      `<rect x="${cx0 - 30}" y="${cy0 - 20}" width="60" height="30" fill="url(#c12-planks)" ${Ow(1.8)}/><path d="M${cx0 - 30} ${cy0 - 8}h60M${cx0 - 14} ${cy0 - 20}v30M${cx0 + 14} ${cy0 - 20}v30" stroke="#c9a34a" stroke-width="3"/>` +
      `<rect x="${cx0 - 4}" y="${cy0 - 16}" width="8" height="9" rx="2" fill="#ffd23f" ${Ow(1.2)}/>` +
      diff(
        cx0,
        cy0 - 18,
        34,
        chestLid,
        once(showIn([0, 17.2], [19.8, LOOP]), CHEST, chestLid) +
          once(showIn([17.2, 19.8]), CHEST,
            `<rect x="${cx0 - 26}" y="${cy0 - 26}" width="52" height="8" fill="#1f2a3a"/><circle cx="${cx0 - 18}" cy="${cy0 - 21}" r="2.4" fill="#ffd23f"/>` +
              `<g transform="translate(${cx0 + 4} ${cy0 - 24})">${fish(0, 0, 0.55, '#ff6b9a')}</g>` +
              `<g transform="rotate(-24 ${cx0 + 30} ${cy0 - 20})">${chestLid}</g>`),
        undefined,
        during(17.2, 19.8),
      ) +
      // Sand heaped in front of it.
      `<path d="M${cx0 - 44} ${cy0 + 14}q44-18 88 0z" fill="url(#c12-sand)" ${Ow(1.4)}/>`
    const bottle = diff(544, 858, 34,
      `<g transform="rotate(-18 540 858)"><rect x="516" y="848" width="40" height="20" rx="9" fill="#7fc9a8" fill-opacity="0.85" ${Ow(1.6)}/><rect x="556" y="853" width="10" height="10" rx="2" fill="#7fc9a8" ${Ow(1.4)}/><rect x="566" y="854" width="5" height="8" fill="#b07a44" ${Ow(1)}/><path d="M524 856h22" stroke="#fff6d8" stroke-width="6" stroke-linecap="round"/></g>` +
        `<path d="M508 870q34-12 66 2z" fill="url(#c12-sand)"/>`, '')
    const [kx0, ky0] = CLAM
    const scallop = (d: number) => {
      let p = ''
      for (let i = 0; i < 6; i++) p += `q7 ${d * 9} 15 0`
      return p
    }
    const clamBottom = `<path d="M${kx0 - 46} ${ky0}${scallop(1)}q2 0 2 2q-46 30-92 0z" fill="url(#c12-clam)" ${O}/>`
    const clamLid = keys(undefined, lidKeys, [kx0 + 46, ky0],
      `<path d="M${kx0 - 46} ${ky0}q46-56 92 0z" fill="url(#c12-clam)" ${O}/>` +
        `<path d="M${kx0 - 30} ${ky0 - 6}q10-30 30-36M${kx0} ${ky0 - 4}v-36M${kx0 + 30} ${ky0 - 6}q-10-30-30-36" fill="none" stroke="#7d5aa8" stroke-opacity="0.5" stroke-width="2.4"/>`)
    const clamPearl = once(showIn([6.55, 15.45]), CLAM, pearl(kx0 - 4, ky0 - 4))
    const clam = `<ellipse cx="${kx0}" cy="${ky0 + 10}" rx="60" ry="10" fill="#1f4f6a" fill-opacity="0.3"/>` + `<path d="M${kx0 - 44} ${ky0}q44 10 88 0" fill="#2a1a3a"/>` + clamPearl + clamBottom + clamLid

    // --- The right side: the anemone with the clownfish, the sea urchin (a spine fewer in B: a hard one), the crab's
    // rock, the sea fan (purple in A, orange in B), the ray on the sand (A only), the rock arch. ---
    let anemone = ''
    for (let i = 0; i < 11; i++) {
      const ax = 970 + i * 6
      anemone += current([ax, 770], 14, 2.2, `<path d="M${ax} 770q${(i - 5) * 3}-20 ${(i - 5) * 5}-40" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M${ax} 770q${(i - 5) * 3}-20 ${(i - 5) * 5}-40" fill="none" stroke="#ff8fb8" stroke-width="5" stroke-linecap="round"/>`)
    }
    anemone = `<ellipse cx="1000" cy="774" rx="40" ry="12" fill="#c45a8a" ${Ow(1.8)}/>` + anemone
    const URCHIN: [number, number] = [1010, 832]
    const [ux, uy] = URCHIN
    let spines = ''
    for (let i = 0; i < 14; i++) {
      const a = Math.PI + (i * Math.PI) / 13
      if (i === 10) continue
      spines += `<path d="M${ux} ${uy}l${Math.round(Math.cos(a) * 26)} ${Math.round(Math.sin(a) * 26)}" stroke="#2b1f3a" stroke-width="2.6" stroke-linecap="round"/>`
    }
    const spineA = Math.PI + (10 * Math.PI) / 13
    const urchin =
      spines +
      diff(ux + Math.round(Math.cos(spineA) * 16), uy + Math.round(Math.sin(spineA) * 16), 18, `<path d="M${ux} ${uy}l${Math.round(Math.cos(spineA) * 26)} ${Math.round(Math.sin(spineA) * 26)}" stroke="#2b1f3a" stroke-width="2.6" stroke-linecap="round"/>`, '') +
      `<ellipse cx="${ux}" cy="${uy}" rx="14" ry="11" fill="#5a3a7a" ${Ow(1.6)}/><circle cx="${ux - 4}" cy="${uy - 4}" r="2.4" fill="#8a6aaa"/>`
    const rock =
      `<path d="M900 830q-6-60 40-80q50-10 60 30q10 40-10 50z" fill="url(#c12-rock)" ${O}/><path d="M920 790q14-20 40-22" fill="none" stroke="#8fa3a8" stroke-width="3" stroke-linecap="round"/>`
    const fan = (c: string, c2: string) =>
      `<path d="M1200 800v-30M1200 780l-30-40M1200 780l30-40M1200 770l-10-50M1200 770l12-52M1184 760l-22-10M1216 760l22-12" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>` +
      `<path d="M1200 800v-30M1200 780l-30-40M1200 780l30-40M1200 770l-10-50M1200 770l12-52M1184 760l-22-10M1216 760l22-12" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M1170 740q30-40 60 0M1178 758q22-30 44 0" fill="none" stroke="${c2}" stroke-width="2"/>`
    const seaFan = current([1200, 800], 4, 3.4, diff(1200, 760, 46, fan('#b05ad9', '#e0b0ff'), fan('#ff8a3a', '#ffd0a0')), 'fan')
    const ray = diff(1104, 852, 46,
      `<g transform="translate(0 -10)"><path d="M1062 866q38-30 76 0q-38 14-76 0z" fill="#b8a07a" ${Ow(1.8)}/><path d="M1138 866q6 2 10 6" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
        `<circle cx="1094" cy="858" r="3" fill="#fff" ${Ow(1)}/><circle cx="1106" cy="858" r="3" fill="#fff" ${Ow(1)}/><circle cx="1094" cy="858" r="1.4" fill="${INK}"/><circle cx="1106" cy="858" r="1.4" fill="${INK}"/>` +
        `<path d="M1080 864h4M1088 868h4M1112 868h4" stroke="#8a7458" stroke-width="2" stroke-linecap="round"/></g>`, '')
    const arch =
      `<path d="M1300 ${FLOOR + 10}q-10-160 50-220q70-30 100 20V${FLOOR + 10}h-40q0-110-40-110q-40 0-40 110z" fill="url(#c12-rock)" ${O}/>` +
      `<path d="M1340 560q30-12 50 4M1316 640q-4-30 10-50" fill="none" stroke="#8fa3a8" stroke-width="3" stroke-linecap="round"/>` +
      coral(1400, 552, '#ff8a6a', 0.8) + tube(1336, 580)
    const garden =
      coral(560, 772, '#ff7a5a') + coral(860, 770, '#ffb03a', 0.9) + coral(1270, 790, '#ff7a5a', 0.8) +
      brain(700, 780, 34) + brain(1130, 800, 30) + tube(620, 780) + tube(1060, 800) +
      `<path d="M820 776q10-24 30-14q10 14-6 22z" fill="url(#c12-rock)" ${Ow(1.6)}/>`

    // --- The clownfish: at home in the anemone, then out teasing the octopus. ---
    const clown = (x: number, y: number, flip: boolean) =>
      `<g transform="translate(${x} ${y}) scale(${flip ? -0.8 : 0.8} 0.8)">` +
      `<path d="M-14 0l-12-10v20z" fill="#ff8a1f" ${O}/><ellipse cx="0" cy="0" rx="17" ry="11" fill="#ff8a1f" ${O}/>` +
      `<path d="M-6-10v20M6-11v22" stroke="#fff" stroke-width="5"/>` +
      `<circle cx="11" cy="-3" r="3" fill="#fff" ${Ow(1.2)}/><circle cx="12" cy="-3" r="1.4" fill="${INK}"/><path d="M14 3q-2 3-5 1" fill="none" stroke="${INK}" stroke-width="1.4"/></g>`
    const CLOWN1: [number, number] = [992, 738]
    const CLOWN2: [number, number] = [1014, 752]
    const tease = (dx: number, dy: number, phase: number): Keyframe[] => {
      const k: Keyframe[] = [{ t: 0, x: 0, y: 0, sx: 1 }, { t: 7, ease: 'inOut' }]
      for (let i = 0; i <= 8; i++) {
        const a = phase + (i / 8) * Math.PI * 2
        k.push({ t: 7.4 + i * 0.25, x: Math.round(dx + Math.cos(a) * 40), y: Math.round(dy + Math.sin(a) * 26), sx: Math.sin(a) > 0 ? 1 : -1, ease: 'linear' })
      }
      k.push({ t: 9.5, ease: 'inOut' }, { t: 9.9, x: 0, y: 0, sx: 1, ease: 'step' })
      return k
    }
    const clownfish =
      keys(undefined, tease(-222, -60, 0), CLOWN1, anim({ type: 'path', points: [[0, 0], [8, -6], [0, -10], [-8, -4]], period: 2.4 }, clown(...CLOWN1, false))) +
      keys(undefined, tease(-244, -74, Math.PI), CLOWN2, anim({ type: 'path', points: [[0, 0], [-6, -8], [4, -12]], period: 2.8, phase: 0.4 }, clown(...CLOWN2, true)))

    // --- The octopus. ---
    const [ox, oy] = OCTO
    const tentacle = (i: number) => {
      const d = i < 4 ? -1 : 1
      const sx = ox + (i - 3.5) * 6
      const ex = ox + (i - 3.5) * 14 + d * 10
      return anim({ type: 'keys', period: 1.6, phase: i / 8, keys: [{ t: 0, rot: -8 }, { t: 0.8, rot: 8, ease: 'inOut' }], pivot: [sx, oy - 14] },
        `<path d="M${sx} ${oy - 14}q${d * 4} 14 ${ex - sx} 18q${d * 8} 2 ${d * 6}-8" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>` +
          `<path d="M${sx} ${oy - 14}q${d * 4} 14 ${ex - sx} 18q${d * 8} 2 ${d * 6}-8" fill="none" stroke="url(#c12-octo)" stroke-width="7" stroke-linecap="round"/>`)
    }
    const armPearl = once(showIn([5.05, 6.55]), OCTO, pearl(ox + 52, oy - 8))
    const arm = keys(undefined, armKeys, [ox + 16, oy - 14],
      `<path d="M${ox + 16} ${oy - 14}q20 2 36 10" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M${ox + 16} ${oy - 14}q20 2 36 10" fill="none" stroke="url(#c12-octo)" stroke-width="7" stroke-linecap="round"/>` +
        `<circle cx="${ox + 30}" cy="${oy - 9}" r="1.6" fill="#ffd0e0"/><circle cx="${ox + 42}" cy="${oy - 6}" r="1.4" fill="#ffd0e0"/>` + armPearl)
    const oeye = (x: number, y: number, r: number, p: number) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" ${Ow(1.4)}/><circle cx="${x + 1}" cy="${y + 1}" r="${p}" fill="${INK}"/>`
    const octoFace =
      once(showIn([0, 8.6], [11.6, 17.6]), OCTO, oeye(ox - 9, oy - 36, 6, 2.6) + oeye(ox + 9, oy - 36, 6, 2.6) + `<path d="M${ox - 5} ${oy - 22}q5 4 10 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`) +
      // Cross at the teasing.
      once(showIn([8.6, 9.6]), OCTO, oeye(ox - 9, oy - 36, 6, 2.6) + oeye(ox + 9, oy - 36, 6, 2.6) + `<path d="M${ox - 16} ${oy - 46}l12 5M${ox + 16} ${oy - 46}l-12 5" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><path d="M${ox - 5} ${oy - 21}q5-4 10 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`) +
      // Scared of the shark; staring at the empty clam.
      once(showIn([9.6, 11.6], [17.6, LOOP]), OCTO, oeye(ox - 10, oy - 37, 9, 2) + oeye(ox + 10, oy - 37, 9, 2) + `<ellipse cx="${ox}" cy="${oy - 20}" rx="3" ry="4" fill="#7a2a4a"/>`)
    const octopus = keys('octo', octoKeys, OCTO,
      `<ellipse cx="${ox}" cy="${oy + 14}" rx="34" ry="5" fill="#1f4f6a" fill-opacity="0.25"/>` +
        [0, 1, 2, 3, 4, 5, 6].map(tentacle).join('') +
        `<ellipse cx="${ox}" cy="${oy - 36}" rx="27" ry="30" fill="url(#c12-octo)" ${Ow(2)}/><circle cx="${ox + 10}" cy="${oy - 52}" r="3" fill="#ffd0e0" fill-opacity="0.7"/><circle cx="${ox - 12}" cy="${oy - 50}" r="2" fill="#ffd0e0" fill-opacity="0.7"/>` +
        octoFace + arm)
    // The ink cloud between the octopus and the shark.
    const INK_AT: [number, number] = [930, 612]
    const inkCloud = once(
      [{ t: 0, sx: 0.1, sy: 0.1, o: 0, ease: 'step' }, { t: 10.85, o: 1, ease: 'out' }, { t: 11.4, sx: 1.4, sy: 1.4 }, { t: 12.2, ease: 'in' }, { t: 12.8, sx: 1.6, sy: 1.6, o: 0, ease: 'step' }],
      INK_AT,
      [[0, 0, 70], [-50, 10, 46], [50, 0, 54], [10, -40, 46], [20, 36, 44], [-30, -30, 34]].map(([dx, dy, r]) => `<circle cx="${INK_AT[0] + dx}" cy="${INK_AT[1] + dy}" r="${r}" fill="#2a1a3a" fill-opacity="0.88"/>`).join(''),
    )

    // --- The shark: in shell glasses after the ink; dazed after the bonk. ---
    const [sx0, sy0] = SHARK
    const sharkBody =
      `<path d="M${sx0 + 80} ${sy0 - 6}l50-34q-6 34 0 70l-50-30z" fill="#8a9aaa" ${O}/>` +
      `<path d="M${sx0 - 10} ${sy0 - 26}l20-36q8 20 24 34z" fill="#8a9aaa" ${O}/>` +
      `<path d="M${sx0 - 92} ${sy0}q20-36 100-34q70 2 80 30q-10 30-80 30q-80 2-100-26z" fill="url(#c12-shark)" ${O}/>` +
      `<path d="M${sx0 - 88} ${sy0 + 4}q40 26 120 18q40-4 56-18" fill="#e8ecf2"/>` +
      `<path d="M${sx0 - 20} ${sy0 + 10}l-16 24l30-16z" fill="#8a9aaa" ${Ow(1.8)}/>` +
      `<path d="M${sx0 - 34} ${sy0 - 6}q-3 8 0 16M${sx0 - 26} ${sy0 - 6}q-3 8 0 16M${sx0 - 18} ${sy0 - 6}q-3 8 0 16" fill="none" stroke="${INK}" stroke-width="1.8"/>` +
      `<path d="M${sx0 - 86} ${sy0 + 8}q22 10 44 2" fill="#fff" ${Ow(1.8)}/><path d="M${sx0 - 80} ${sy0 + 10}l3 5l3-4l3 5l3-5l3 5l3-5l3 4l3-4l3 4" fill="none" stroke="${INK}" stroke-width="1.2"/>` +
      `<circle cx="${sx0 - 64}" cy="${sy0 - 10}" r="5" fill="#fff" ${Ow(1.4)}/><circle cx="${sx0 - 65}" cy="${sy0 - 10}" r="2.4" fill="${INK}"/>` +
      `<path d="M${sx0 - 74} ${sy0 - 18}l14 3" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`
    const shell = (x: number, y: number) => `<path d="M${x - 9} ${y + 6}q9-22 18 0z" fill="#ffc2d7" ${Ow(1.6)}/><path d="M${x} ${y + 6}l-4-10M${x} ${y + 6}v-11M${x} ${y + 6}l4-10" stroke="${INK}" stroke-opacity="0.5" stroke-width="1.2"/>`
    const glasses = once(showIn([12.4, LOOP]), SHARK,
      `<path d="M${sx0 - 74} ${sy0 - 12}h18" stroke="${INK}" stroke-width="2"/>` + shell(sx0 - 64, sy0 - 14) + shell(sx0 - 80, sy0 - 18))
    const stars = once(showIn([13.6, 14.9]), [sx0 - 50, sy0 - 40],
      anim({ type: 'rotate', pivot: [sx0 - 50, sy0 - 40], period: 1 },
        [0, 120, 240].map((a) => `<path transform="rotate(${a} ${sx0 - 50} ${sy0 - 40})" d="M${sx0 - 50} ${sy0 - 64}l3 6l7 1l-5 5l1 7l-6-3l-6 3l1-7l-5-5l7-1z" fill="#ffd23f" ${Ow(1.2)}/>`).join('')))
    const shark = keys('shark', sharkKeys, SHARK,
      anim({ type: 'keys', period: 0.9, keys: [{ t: 0, rot: -3 }, { t: 0.45, rot: 3, ease: 'inOut' }], pivot: [sx0 + 10, sy0] }, sharkBody + glasses) + stars)

    // --- The crab: sneaks to the clam, takes the pearl, waves it from its rock. ---
    const [cxr, cyr] = CRAB
    const crabLegs = (s: number) =>
      [0, 1, 2].map((i) => keys(undefined, swingKeys(CRAB_WALKS, 0.09, 18, i % 2 === 1), [cxr + s * (8 + i * 3), cyr - 8],
        `<path d="M${cxr + s * (8 + i * 3)} ${cyr - 8}q${s * 8}-4 ${s * 12} 8" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M${cxr + s * (8 + i * 3)} ${cyr - 8}q${s * 8}-4 ${s * 12} 8" fill="none" stroke="#e8594a" stroke-width="2.2" stroke-linecap="round"/>`)).join('')
    const crabClaw = (s: number, k: Keyframe[], extra = '') =>
      keys(undefined, k, [cxr + s * 13, cyr - 12],
        `<path d="M${cxr + s * 13} ${cyr - 12}q${s * 8}-4 ${s * 12}-12" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${cxr + s * 13} ${cyr - 12}q${s * 8}-4 ${s * 12}-12" fill="none" stroke="#e8594a" stroke-width="2.8" stroke-linecap="round"/>` +
          `<path d="M${cxr + s * 25} ${cyr - 24}q${s * 10}-2 ${s * 12}-12q-${s * 8} 0-${s * 12} 6z" fill="#e8594a" ${Ow(1.4)}/>` + extra)
    const leftClaw: Keyframe[] = [{ t: 0, rot: 0 }, { t: 15, ease: 'inOut' }, { t: 15.2, rot: 30, ease: 'inOut' }, { t: 15.45, rot: 0 }, { t: 19.95, ease: 'step' }]
    const rightClaw: Keyframe[] = [
      { t: 0, rot: 0 }, { t: 15, ease: 'inOut' }, { t: 15.2, rot: -50, ease: 'inOut' }, { t: 15.45, rot: 0, ease: 'inOut' },
      { t: 16.6, ease: 'inOut' }, { t: 16.9, rot: -40 },
      ...Array.from({ length: 6 }, (_, i) => ({ t: 18.3 + i * 0.25, rot: i % 2 ? -40 : -70, ease: 'inOut' as const })),
      { t: 19.95, ease: 'step' },
    ]
    const crabPearl = once(showIn([15.45, LOOP]), CRAB, pearl(cxr + 37, cyr - 34))
    const crab = keys('crab', crabKeys, CRAB,
      `<ellipse cx="${cxr}" cy="${cyr + 2}" rx="20" ry="3" fill="#1f4f6a" fill-opacity="0.3"/>` +
        crabLegs(-1) + crabLegs(1) + crabClaw(-1, leftClaw) +
        `<ellipse cx="${cxr}" cy="${cyr - 11}" rx="16" ry="10" fill="#e8594a" ${Ow(1.6)}/>` +
        `<path d="M${cxr - 5} ${cyr - 18}l-2-8M${cxr + 5} ${cyr - 18}l2-8" stroke="${INK}" stroke-width="2"/><circle cx="${cxr - 7}" cy="${cyr - 28}" r="3.4" fill="#fff" ${Ow(1.2)}/><circle cx="${cxr + 7}" cy="${cyr - 28}" r="3.4" fill="#fff" ${Ow(1.2)}/>` +
        `<circle cx="${cxr - 6.4}" cy="${cyr - 28}" r="1.5" fill="${INK}"/><circle cx="${cxr + 7.6}" cy="${cyr - 28}" r="1.5" fill="${INK}"/>` +
        `<path d="M${cxr - 4} ${cyr - 9}q4 3 8 0" fill="none" stroke="${INK}" stroke-width="1.4" stroke-linecap="round"/>` +
        crabClaw(1, rightClaw, crabPearl))

    // --- Events of B: a jellyfish drifts up past the shark. ---
    const JELLY: [number, number] = [1160, 500]
    const [jx, jy] = JELLY
    const jelly = diff(
      jx,
      jy + 8,
      32,
      '',
      keys('jelly', [{ t: 0, y: 40, o: 0, ease: 'step' }, { t: 9.5, o: 1, ease: 'linear' }, { t: 12.75, y: -40, o: 1, ease: 'step' }, { t: 12.8, o: 0, ease: 'step' }], JELLY,
        anim({ type: 'keys', period: 1.2, keys: [{ t: 0, sx: 1, sy: 1 }, { t: 0.6, sx: 0.86, sy: 1.12, ease: 'inOut' }], pivot: [jx, jy] },
          `<path d="M${jx - 22} ${jy}q22-36 44 0q-6 6-11 0q-5 6-11 0q-6 6-11 0q-5 6-11 0z" fill="#e8c0ff" fill-opacity="0.85" ${Ow(1.6)}/>` +
            `<circle cx="${jx - 7}" cy="${jy - 10}" r="2" fill="${INK}"/><circle cx="${jx + 7}" cy="${jy - 10}" r="2" fill="${INK}"/>` +
            `<path d="M${jx - 14} ${jy + 2}q-4 10 2 20M${jx - 4} ${jy + 4}q4 10-2 22M${jx + 6} ${jy + 4}q-4 10 2 20M${jx + 15} ${jy + 2}q4 8-2 16" fill="none" stroke="#c48ae6" stroke-width="2.4" stroke-linecap="round"/>`)),
      'jelly',
      during(9.5, 12.8),
    )

    // Small fish living around the corals, the same in both pictures.
    const reefFish =
      anim({ type: 'path', points: [[0, 0], [60, -20], [120, 0], [60, 16]], period: 6 }, fish(560, 690, 0.5, '#ffd23f')) +
      anim({ type: 'path', points: [[0, 0], [-50, -10], [-100, 6], [-50, 14]], period: 7, phase: 0.3 }, `<g transform="translate(1180 700) scale(-1 1) translate(-1180 -700)">${fish(1180, 700, 0.5, '#4dabf7')}</g>`) +
      anim({ type: 'path', points: [[0, 0], [40, 20], [90, 0], [40, -14]], period: 5, phase: 0.6 }, fish(300, 560, 0.45, '#ff6b9a'))

    return (
      `<defs>${NATURE_DEFS}` +
      `<linearGradient id="c12-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fdcef"/><stop offset="0.45" stop-color="#2fa8cf"/><stop offset="1" stop-color="#17608f"/></linearGradient>` +
      `<linearGradient id="c12-sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8d8a8"/><stop offset="1" stop-color="#c9b07a"/></linearGradient>` +
      `<linearGradient id="c12-kelp" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#3f7d2e"/><stop offset="1" stop-color="#8fcf5e"/></linearGradient>` +
      `<linearGradient id="c12-wreck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a6a52"/><stop offset="1" stop-color="#4a3e30"/></linearGradient>` +
      `<linearGradient id="c12-planks" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a6236"/><stop offset="1" stop-color="#b98b52"/></linearGradient>` +
      `<radialGradient id="c12-pearl" cx="0.35" cy="0.35" r="0.8"><stop offset="0" stop-color="#ffffff"/><stop offset="0.6" stop-color="#f4eef8"/><stop offset="1" stop-color="#cfc4dc"/></radialGradient>` +
      `<radialGradient id="c12-clam" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#d9c6f2"/><stop offset="0.6" stop-color="#a98ad6"/><stop offset="1" stop-color="#7d5aa8"/></radialGradient>` +
      `<radialGradient id="c12-brain" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#ffd0a8"/><stop offset="1" stop-color="#d98a5a"/></radialGradient>` +
      `<radialGradient id="c12-rock" cx="0.6" cy="0.3" r="0.9"><stop offset="0" stop-color="#9fb4b8"/><stop offset="1" stop-color="#5a6e74"/></radialGradient>` +
      `<radialGradient id="c12-octo" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#ffa8c8"/><stop offset="0.55" stop-color="#e86a9a"/><stop offset="1" stop-color="#b03a6a"/></radialGradient>` +
      `<linearGradient id="c12-shark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fb0c0"/><stop offset="1" stop-color="#6f8090"/></linearGradient>` +
      `<radialGradient id="c12-glow" cx="0.5" cy="0" r="1"><stop offset="0" stop-color="#eafcff" stop-opacity="0.35"/><stop offset="1" stop-color="#eafcff" stop-opacity="0"/></radialGradient></defs>` +
      surface +
      rays +
      farReef +
      shoalMarkup +
      sand +
      kelpLeft +
      ship +
      seahorse +
      kelpFront +
      garden +
      anemone +
      clownfish +
      rock +
      urchin +
      seaFan +
      ray +
      arch +
      oyster +
      oysterPearl +
      bottle +
      clam +
      chest +
      octopus +
      crab +
      jelly +
      shark +
      inkCloud +
      reefFish +
      bubbles(700, 760, 3, 3) + bubbles(1040, 790, 2, 3.4) + bubbles(120, 780, 3, 4) +
      specks +
      `<rect width="${W}" height="${H}" fill="url(#c12-glow)"/>`
    )
  },
})
