// Cartoon "The rainy day" (docs/cartoon-mode.md), made like 812: a 20 s story in a forest in the rain, told by a
// camera. Drops start falling and the animals run for the one big toadstool: a frog holding a leaf, a mole popping
// up from under it, a fox cub shaking itself, a badger squeezing in — until a plump wild-boar piglet barges in last
// and pops them all out into the puddles. The rain stops, a rainbow comes out, and they all laugh (the owl watches it
// all from its hollow, dry and smug). Twelve differences: two hard (a spot of the big toadstool's cap, a bilberry),
// three events of B (a worm out of the wet ground, a beetle under a dock leaf, a robin shaking itself dry).
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { frog, grassTuft, groundShadow, INK, keenOwl, NATURE_DEFS, O, Ow, SPRING_DEFS } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // Rain on the forest: the owl in its hollow, dry; along to the big toadstool.
  { t: 1.6, x: 140, y: 420, w: 480, ease: 'inOut' },
  { t: 3.35, x: 380, y: 520, w: 560, ease: 'step' },
  // Under the toadstool, one after another: the frog, the mole...
  { t: 3.4, x: 430, y: 565, w: 480, ease: 'linear' },
  { t: 6.4, x: 436, y: 565, w: 480, ease: 'step' },
  // ...the fox cub, the badger...
  { t: 6.45, x: 480, y: 565, w: 480, ease: 'linear' },
  { t: 10, x: 486, y: 565, w: 480, ease: 'step' },
  // ...and the piglet barging in.
  { t: 10.05, x: 560, y: 565, w: 480, ease: 'linear' },
  { t: 12, x: 554, y: 565, w: 480, ease: 'step' },
  // Pop! Into the puddles.
  { t: 12.05, x: 400, y: 500, w: 640, ease: 'linear' },
  { t: 14.5, x: 404, y: 500, w: 640, ease: 'inOut' },
  // The rain stops: the rainbow.
  { t: 15.6, x: 300, y: 160, w: 900, ease: 'linear' },
  { t: 16, x: 300, y: 160, w: 900, ease: 'step' },
  // All laughing.
  { t: 16.05, x: 420, y: 512, w: 620, ease: 'linear' },
  { t: 19.95, x: 430, y: 520, w: 608, ease: 'step' },
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

/** When the piglet barges in and everybody pops out; when they land in the puddles. */
const POP = 12
const SPLASH = 12.7
/** The rain stops; the laughing starts. */
const DRY = 14.5
const LAUGH = 16

/** Bobbing with laughter from LAUGH on, around a resting offset. */
const laughKeys = (x: number, y: number, rot = 0): Keyframe[] =>
  Array.from({ length: 14 }, (_, i) => ({ t: Math.round((LAUGH + i * 0.28) * 100) / 100, x, y: y + (i % 2 ? -6 : 0), rot, ease: 'inOut' as const }))
/** Popped out of the shelter at POP, a flip through the air, down into a puddle at SPLASH; then sitting there. */
const popKeys = (peak: [number, number], land: [number, number], spin: number): Keyframe[] => [
  { t: POP, x: 0, y: 0, rot: 0, ease: 'out' },
  { t: POP + 0.35, x: peak[0], y: peak[1], rot: spin / 2, ease: 'in' },
  { t: SPLASH, x: land[0], y: land[1], rot: spin, ease: 'out' },
  { t: SPLASH + 0.15, y: land[1] - 6, ease: 'inOut' },
  { t: SPLASH + 0.3, y: land[1], ease: 'inOut' },
  ...laughKeys(land[0], land[1], spin),
  { t: 19.95, x: land[0], y: land[1], rot: spin, ease: 'step' },
]

/** The animals' places under the toadstool (their feet); the keys move them from off stage. */
const FROG: [number, number] = [612, 800]
const frogKeys: Keyframe[] = [
  { t: 0, x: -420, y: 0, rot: 0 },
  { t: 3.4, ease: 'linear' },
  ...Array.from({ length: 8 }, (_, i) => ({ t: Math.round((3.6 + i * 0.2) * 100) / 100, x: Math.round(-420 + (420 * (i + 1)) / 8), y: i % 2 ? 0 : -26, ease: 'inOut' as const })),
  { t: 5.2, x: 0, y: 0, ease: 'step' },
  ...popKeys([-90, -110], [-142, 52], -360),
]
const MOLE: [number, number] = [735, 800]
const FOX: [number, number] = [810, 800]
const foxKeys: Keyframe[] = [
  { t: 0, x: 720, y: 0, rot: 0 },
  { t: 6.4, ease: 'linear' },
  ...Array.from({ length: 5 }, (_, i) => ({ t: Math.round((6.6 + i * 0.2) * 100) / 100, x: Math.round(720 - (720 * (i + 1)) / 5), y: i % 2 ? 0 : -14, ease: 'inOut' as const })),
  // Shaking the rain off.
  ...Array.from({ length: 6 }, (_, i) => ({ t: Math.round((7.6 + i * 0.1) * 100) / 100, x: 0, y: 0, rot: i % 2 ? -12 : 12, ease: 'inOut' as const })),
  { t: 8.3, rot: 0, ease: 'step' },
  ...popKeys([60, -130], [20, 60], 360),
]
const BADGER: [number, number] = [665, 800]
const badgerKeys: Keyframe[] = [
  { t: 0, x: -700, y: 0, rot: 0 },
  { t: 8.2, ease: 'linear' },
  ...Array.from({ length: 7 }, (_, i) => ({ t: Math.round((8.4 + i * 0.2) * 100) / 100, x: Math.round(-700 + (700 * (i + 1)) / 7), y: i % 2 ? 0 : -6, ease: 'inOut' as const })),
  { t: 9.8, x: 0, y: 0, ease: 'step' },
  ...popKeys([-60, -100], [-125, 56], -360),
]
const PIG: [number, number] = [720, 800]
const pigKeys: Keyframe[] = [
  { t: 0, x: 800, y: 0, sx: 1, sy: 1 },
  { t: 10, ease: 'linear' },
  ...Array.from({ length: 5 }, (_, i) => ({ t: Math.round((10.2 + i * 0.2) * 100) / 100, x: Math.round(800 - (670 * (i + 1)) / 5), y: i % 2 ? 0 : -10, ease: 'inOut' as const })),
  // A look at the crowd; back up — and charge.
  { t: 11.35, x: 130, y: 0, ease: 'inOut' },
  { t: 11.65, x: 190, ease: 'in' },
  { t: POP - 0.02, x: 0, sx: 1, sy: 1, ease: 'out' },
  { t: POP + 0.12, sx: 1.18, sy: 0.84, ease: 'inOut' },
  { t: POP + 0.3, sx: 1, sy: 1, ease: 'inOut' },
  ...laughKeys(0, 0),
  { t: 19.95, x: 0, y: 0, ease: 'step' },
]

/** The big toadstool. */
const MUSH: [number, number] = [720, 800]
/** The puddles they land in (left, right) and the little one in front. */
const PUDDLE_L: [number, number] = [500, 852]
const PUDDLE_R: [number, number] = [860, 862]
const PUDDLE_F: [number, number] = [660, 878]
/** The stump at the right, a dormouse asleep in its hole. */
const STUMP: [number, number] = [980, 800]

export default svgLevel({
  id: 822,
  chapter: 'cartoon',
  title: 'cartoonRainyDay',
  parTimeSec: 120,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const blink = (period: number, phase = 0) => (m: string) => anim({ type: 'blink', duty: 0.07, period, phase }, m)
    const stars = (x: number, y: number) =>
      anim({ type: 'rotate', pivot: [x, y], period: 1.1 },
        [0, 120, 240].map((a) => `<path transform="rotate(${a} ${x} ${y})" d="M${x} ${y - 16}l2 4l4 1l-3 3l1 4l-4-2l-4 2l1-4l-3-3l4-1z" fill="#ffd23f" ${Ow(1)}/>`).join(''))
    const spiral = (x: number, y: number) =>
      `<path d="M${x} ${y}m-1 0a1 1 0 1 1 2 0a2.4 2.4 0 1 1-4.8 0a3.6 3.6 0 1 1 7.2 0" fill="none" stroke="${INK}" stroke-width="1.4"/>`
    const shut = (x: number, y: number) => `<path d="M${x - 4} ${y + 1}q4-5 8 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`
    const dot = (x: number, y: number, r = 2.6) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/><circle cx="${x + 0.8}" cy="${y - 0.8}" r="0.8" fill="#fff"/>`
    /** A pair of eyes at (x ± d, y): open until POP and from DRY, dazed in between, laughing from LAUGH. */
    const eyes = (pivot: [number, number], x: number, y: number, d: number, cover: string) =>
      once(showIn([0, POP], [DRY, LAUGH]), pivot, dot(x - d, y) + dot(x + d, y)) +
      once(showIn([POP, DRY]), pivot, cover + spiral(x - d, y) + spiral(x + d, y)) +
      once(showIn([LAUGH, LOOP]), pivot, cover + shut(x - d, y) + shut(x + d, y))
    /** A laughing mouth from LAUGH on, a little smile before. */
    const mouth = (pivot: [number, number], x: number, y: number, w = 6) =>
      once(showIn([0, LAUGH]), pivot, `<path d="M${x - w / 2} ${y}q${w / 2} 3 ${w} 0" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`) +
      once(showIn([LAUGH, LOOP]), pivot,
        anim({ type: 'keys', period: 0.28, keys: [{ t: 0, sy: 1 }, { t: 0.14, sy: 0.6, ease: 'inOut' }], pivot: [x, y] },
          `<path d="M${x - w} ${y - 1}q${w} ${w * 1.6} ${w * 2} 0z" fill="#7a2a2a" ${Ow(1.2)}/>`))
    const dazed = (pivot: [number, number], x: number, y: number) => once(showIn([SPLASH, DRY]), pivot, stars(x, y))
    const drops = (x: number, y: number, n: number, spread: number) => {
      let m = ''
      for (let i = 0; i < n; i++) {
        const dx = Math.round((i - (n - 1) / 2) * (spread / n) * 2)
        const up = Math.round(40 + (i % 3) * 26)
        m += once([{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t: SPLASH, o: 1, ease: 'out' }, { t: SPLASH + 0.3, x: dx, y: -up, ease: 'in' }, { t: SPLASH + 0.65, x: dx * 1.4, y: 6, o: 1, ease: 'step' }, { t: SPLASH + 0.7, o: 0, ease: 'step' }], [x, y],
          `<path d="M${x} ${y - 6}q4 6 0 9q-4-3 0-9z" fill="#cfe8f2" ${Ow(1)}/>`)
      }
      return m
    }
    const starburst = (x: number, y: number, t: number, s = 1) =>
      once([{ t: 0, sx: 0.3 * s, sy: 0.3 * s, o: 0, ease: 'step' }, { t, o: 1, ease: 'out' }, { t: t + 0.12, sx: 1.15 * s, sy: 1.15 * s, ease: 'inOut' }, { t: t + 0.3, sx: s, sy: s, o: 1, ease: 'step' }, { t: t + 0.34, o: 0, ease: 'step' }], [x, y],
        `<path d="M${x} ${y - 30}l7 16l17-6l-9 15l16 8l-18 3l4 18l-14-11l-11 14l-2-18l-18 1l13-12l-12-13l18 2z" fill="#ffe066" ${Ow(1.8)}/>`)

    // --- The sky (overcast, then clearing), the rainbow, misty far trees. ---
    let far = ''
    for (let i = 0; i < 18; i++) {
      const fx = Math.round(i * 86 + rand() * 30)
      const fh = Math.round(260 + rand() * 120)
      far += `<rect x="${fx - 10}" y="${700 - fh}" width="20" height="${fh}" fill="#8fa89a"/><ellipse cx="${fx}" cy="${700 - fh}" rx="${Math.round(60 + rand() * 30)}" ry="${Math.round(70 + rand() * 30)}" fill="#9fb8a6"/>`
    }
    const clearing = once([{ t: 0, o: 0, ease: 'step' }, { t: DRY, o: 0, ease: 'out' }, { t: DRY + 1, o: 1, ease: 'step' }], [W / 2, 300],
      `<rect width="${W}" height="${H}" fill="url(#c22-clear)"/>` +
        `<circle cx="1180" cy="130" r="150" fill="url(#c22-glow)"/><circle cx="1180" cy="130" r="42" fill="#ffd56a" stroke="#f2a93b" stroke-width="3"/>` +
        `<ellipse cx="1166" cy="122" rx="4" ry="6.5" fill="${INK}"/><ellipse cx="1194" cy="122" rx="4" ry="6.5" fill="${INK}"/><path d="M1162 142q18 14 36 0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`)
    const rainbow = once([{ t: 0, o: 0, ease: 'step' }, { t: DRY + 0.6, o: 0, ease: 'out' }, { t: DRY + 1.5, o: 0.75, ease: 'step' }], [720, 560],
      `<g fill="none" stroke-width="16">` +
        ['#e63946', '#f77f00', '#ffd23f', '#52b788', '#4d96e6', '#7b5cd6'].map((c, i) => `<path d="M${260 + i * 15} 640a${460 - i * 15} ${400 - i * 15} 0 0 1 ${920 - i * 30} 0" stroke="${c}"/>`).join('') +
        `</g>`)
    const clouds = once([{ t: 0, o: 1, x: 0, ease: 'step' }, { t: DRY, o: 1, x: 0, ease: 'in' }, { t: DRY + 1.2, o: 0, x: 260, ease: 'step' }], [720, 120],
      [[200, 110, 1.4], [560, 80, 1.2], [900, 120, 1.5], [1260, 90, 1.3]].map(([cx, cy, s]) =>
        `<g transform="translate(${cx} ${cy}) scale(${s})"><ellipse cx="0" cy="10" rx="80" ry="26" fill="#a9b6b9"/><circle cx="-34" cy="0" r="30" fill="#b6c2c4"/><circle cx="8" cy="-14" r="38" fill="#bcc8ca"/><circle cx="44" cy="2" r="26" fill="#b0bcbe"/></g>`).join(''))
    const sky = `<rect width="${W}" height="${H}" fill="url(#c22-sky)"/>` + clearing + clouds + far + rainbow

    // --- The forest floor: wet ground, moss, tufts, slugs, puddles (rings while it rains). ---
    let tufts = ''
    for (let i = 0; i < 26; i++) {
      const tx = Math.round(rand() * W)
      const ty = Math.round(712 + rand() * 180)
      tufts += anim({ type: 'sway', angle: 6, pivot: [tx, ty], period: 2.6, phase: (tx % 13) / 13 }, grassTuft(tx, ty))
    }
    const puddle = ([x, y]: [number, number], rx: number, ry: number) =>
      `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#c22-puddle)" ${Ow(1.6)}/><path d="M${x - rx * 0.5} ${y - ry * 0.3}h${rx * 0.4}" stroke="#fff" stroke-opacity="0.6" stroke-width="2.4" stroke-linecap="round"/>` +
      once(showIn([0, DRY + 0.5]), [x, y],
        [0, 0.4, 0.8].map((phase, i) => anim({ type: 'keys', period: 1.2, phase, keys: [{ t: 0, sx: 0.2, sy: 0.2, o: 0.9 }, { t: 1.2, sx: 1, sy: 1, o: 0 }], pivot: [x + (i - 1) * rx * 0.4, y] },
          `<ellipse cx="${x + (i - 1) * rx * 0.4}" cy="${y}" rx="${rx * 0.3}" ry="${ry * 0.4}" fill="none" stroke="#fff" stroke-width="1.6"/>`)).join(''))
    const slug = (x: number, y: number, period: number, dx: number) =>
      anim({ type: 'path', points: [[0, 0], [dx, 0]], period },
        `<path d="M${x - 16} ${y}q2-10 14-10q12 0 16 8l6-8M${x + 16} ${y - 2}l4-10" fill="none" stroke="${INK}" stroke-width="1.4"/>` +
          `<path d="M${x - 18} ${y}q4-12 18-12q14 0 16 12z" fill="#c9a04a" ${Ow(1.4)}/><circle cx="${x + 20}" cy="${y - 11}" r="1.6" fill="${INK}"/><circle cx="${x + 23}" cy="${y - 10}" r="1.6" fill="${INK}"/>`)
    const ground =
      `<rect y="700" width="${W}" height="${H - 700}" fill="url(#c22-ground)"/>` +
      `<path d="M0 712q240-14 480 0t480-4t480 4" fill="none" stroke="#4f7a3e" stroke-width="3" stroke-opacity="0.5"/>` +
      `<path d="M300 900q60-60 180-50t240-20t300 30t300 40z" fill="#6e5a3a" fill-opacity="0.18"/>` +
      tufts +
      slug(1180, 846, 18, -60) + slug(260, 872, 22, 50)

    // --- The oak with the owl's hollow (the owl dry and smug), a beech with a woodpecker. ---
    const oak =
      groundShadow(300, 804, 110, 12) +
      `<path d="M240 806q34-8 30-60q-6-220-4-470h68q2 250-4 470q-4 52 30 60z" fill="url(#ke-bark)" ${O}/>` +
      `<path d="M286 760q4-180 0-420M318 720q-4-140 2-360" fill="none" stroke="#4a2c14" stroke-opacity="0.45" stroke-width="3" stroke-linecap="round"/>` +
      `<ellipse cx="300" cy="566" rx="22" ry="28" fill="#2e1a0c" ${Ow(1.8)}/>` +
      anim({ type: 'sway', angle: 6, pivot: [300, 588], period: 3.4 }, keenOwl(300, 588, 0.95, blink(3, 0.4))) +
      // A drip off the hollow's lip, missing the owl.
      once(showIn([0, DRY]), [300, 534], anim({ type: 'keys', period: 1.4, keys: [{ t: 0, y: 0, o: 1 }, { t: 1.4, y: 90, o: 0 }], pivot: [300, 536] },
        `<path d="M276 536q4 6 0 9q-4-3 0-9z" fill="#cfe8f2" ${Ow(1)}/>`)) +
      anim({ type: 'sway', angle: 1, pivot: [300, 300], period: 6 },
        `<ellipse cx="220" cy="230" rx="120" ry="80" fill="url(#c22-leaf)" ${O}/><ellipse cx="380" cy="220" rx="110" ry="76" fill="url(#c22-leaf)" ${O}/><ellipse cx="300" cy="150" rx="120" ry="80" fill="url(#c22-leaf)" ${O}/>` +
          `<ellipse cx="300" cy="280" rx="130" ry="56" fill="url(#c22-leaf)" ${O}/>`)
    const beech =
      groundShadow(1210, 806, 60, 8) +
      `<path d="M1186 806q8-260 4-560h40q-4 300 4 560z" fill="url(#c22-beech)" ${O}/>` +
      `<path d="M1200 700h12M1196 600h10M1206 480h10" stroke="#5f6a6a" stroke-width="2" stroke-linecap="round"/>` +
      `<ellipse cx="1214" cy="520" rx="7" ry="10" fill="#2e1a0c"/>` +
      anim({ type: 'keys', period: 0.9, keys: [{ t: 0, rot: 0 }, { t: 0.1, rot: -14 }, { t: 0.2, rot: 0 }, { t: 0.3, rot: -14 }, { t: 0.4, rot: 0 }], pivot: [1244, 560] },
        `<path d="M1244 560l10 26l-8 2z" fill="#2b2b3a" ${Ow(1.2)}/><ellipse cx="1246" cy="550" rx="8" ry="16" fill="#2b2b3a" ${Ow(1.4)}/><circle cx="1240" cy="532" r="7" fill="#fff" ${Ow(1.3)}/><path d="M1238 526q4-6 8 0z" fill="#e63946"/><path d="M1234 532l-10 1l10 3z" fill="#5f5f5f" ${Ow(1)}/><circle cx="1241" cy="531" r="1.2" fill="${INK}"/>`) +
      anim({ type: 'sway', angle: 1, pivot: [1210, 260], period: 5.4 },
        `<ellipse cx="1150" cy="230" rx="110" ry="70" fill="url(#c22-leaf)" ${O}/><ellipse cx="1280" cy="250" rx="110" ry="70" fill="url(#c22-leaf)" ${O}/><ellipse cx="1210" cy="160" rx="110" ry="70" fill="url(#c22-leaf)" ${O}/>`)

    // --- The bilberry sprig (a berry fewer in B: a hard one), a fern with a fiddlehead (A only), the dock leaf. ---
    const berry = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="4.4" fill="#3d4a8a" ${Ow(1.1)}/><circle cx="${x - 1.4}" cy="${y - 1.4}" r="1.2" fill="#9fb0e8"/>`
    const bilberry =
      `<path d="M470 800q2-20 -6-40M470 800q4-22 16-36M470 800q-8-12-20-18" fill="none" stroke="#4f7a3e" stroke-width="2.4"/>` +
      [[462, 764, -30], [478, 770, 20], [452, 786, -60], [488, 782, 40]].map(([x, y, r]) => `<ellipse transform="rotate(${r} ${x} ${y})" cx="${x}" cy="${y}" rx="7" ry="4" fill="#5cb342" ${Ow(1)}/>`).join('') +
      berry(468, 776) + berry(458, 792) + diff(482, 760, 18, berry(484, 760), '')
    const frond = (x: number, y: number, len: number, dir: number, s = 1) => {
      let m = `<path d="M${x} ${y}q${dir * len * 0.3}-${len * 0.7} ${dir * len * 0.7}-${len}" fill="none" stroke="#3f7d2e" stroke-width="${2.4 * s}"/>`
      for (let i = 1; i < 7; i++) {
        const f = i / 7
        const px = Math.round(x + dir * len * (0.3 * 2 * f * (1 - f) + 0.7 * f * f))
        const py = Math.round(y - len * (0.7 * 2 * f * (1 - f) + f * f))
        const l = Math.round(16 * s * (1 - f * 0.6))
        m += `<path d="M${px} ${py}q${-dir * l * 0.4} ${-l * 0.3} ${-dir * l} ${l * 0.1}q${dir * l * 0.6} ${l * 0.3} ${dir * l} ${-l * 0.1}zM${px} ${py}q${dir * l * 0.4} ${l * 0.2} ${dir * l} ${l * 0.6}q${-dir * l * 0.6} 0 ${-dir * l} ${-l * 0.6}z" fill="#5cb35a" ${Ow(0.9)}/>`
      }
      return anim({ type: 'sway', angle: 3, pivot: [x, y], period: 3.2, phase: (x % 7) / 7 }, m)
    }
    const fern =
      frond(548, 800, 90, -1) + frond(552, 800, 80, 1) + frond(540, 800, 60, -1, 0.8) +
      `<path d="M552 792q4-40 4-70" fill="none" stroke="#3f7d2e" stroke-width="3" stroke-linecap="round"/>` +
      diff(561, 714, 18, `<path d="M556 722q0-14 8-12q8 2 4 10q-4 6-8 2" fill="none" stroke="#3f7d2e" stroke-width="3" stroke-linecap="round"/><circle cx="562" cy="714" r="6" fill="#7fbf5a" ${Ow(1.2)}/>`, '')
    // The far-left and far-right ferns, the moss.
    const moreFerns = frond(60, 820, 110, 1, 1.2) + frond(70, 820, 90, -1, 1.1) + frond(1380, 830, 110, -1, 1.2) + frond(1370, 830, 90, 1, 1.1) + frond(1100, 800, 80, 1) + frond(160, 810, 70, -1)
    // In B a beetle shelters under a dock leaf while the badger trundles past.
    const BEETLE: [number, number] = [522, 806]
    const dock =
      `<path d="M500 812q-6-30 24-34q30 4 22 34q-24 6-46 0z" fill="#5f9a46" ${Ow(1.6)}/><path d="M502 810q20-10 42-2" fill="none" stroke="#3f7d2e" stroke-width="1.6"/>`
    const beetle = diff(BEETLE[0], BEETLE[1] - 2, 22, '',
      once([{ t: 0, x: 12, o: 0, ease: 'step' }, { t: 8.4, o: 1, ease: 'out' }, { t: 8.8, x: 0 }, { t: 10.2, ease: 'in' }, { t: 10.55, x: 12, o: 1, ease: 'step' }, { t: 10.6, o: 0, ease: 'step' }], BEETLE,
        `<path d="M${BEETLE[0] - 6} ${BEETLE[1] + 4}l-4 4M${BEETLE[0]} ${BEETLE[1] + 5}v5M${BEETLE[0] + 6} ${BEETLE[1] + 4}l4 4" stroke="${INK}" stroke-width="1.4"/>` +
          `<ellipse cx="${BEETLE[0]}" cy="${BEETLE[1]}" rx="9" ry="6" fill="#2f6a4a" ${Ow(1.3)}/><path d="M${BEETLE[0]} ${BEETLE[1] - 6}v12" stroke="#7fd3a0" stroke-width="1"/><circle cx="${BEETLE[0] - 9}" cy="${BEETLE[1] - 1}" r="3.4" fill="#2b2b3a" ${Ow(1)}/><circle cx="${BEETLE[0] - 10}" cy="${BEETLE[1] - 2}" r="1" fill="#fff"/>`),
      undefined, during(8.4, 10.6))
    // In B a worm comes up out of the wet ground while the frog hops along.
    const WORM: [number, number] = [600, 846]
    const worm = diff(WORM[0], WORM[1] - 10, 22, '',
      `<g clip-path="url(#c22-worm)">` +
        once([{ t: 0, y: 24, o: 0, ease: 'step' }, { t: 3.4, o: 1, ease: 'out' }, { t: 3.9, y: 0 }, { t: 5.7, ease: 'in' }, { t: 6.15, y: 24, o: 1, ease: 'step' }, { t: 6.2, o: 0, ease: 'step' }], WORM,
          anim({ type: 'keys', period: 0.8, keys: [{ t: 0, rot: -12 }, { t: 0.4, rot: 12, ease: 'inOut' }], pivot: WORM },
            `<path d="M${WORM[0]} ${WORM[1]}q-4-12 2-20" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M${WORM[0]} ${WORM[1]}q-4-12 2-20" fill="none" stroke="#f5a3b8" stroke-width="5" stroke-linecap="round"/><circle cx="${WORM[0] + 3}" cy="${WORM[1] - 20}" r="1.2" fill="${INK}"/>`)) +
        `</g>`,
      undefined, during(3.4, 6.2))

    // --- The stump: a dormouse asleep in its hole (its tail hanging out in A only), a tiny toadstool on its side (A
    // only); in B a robin lands on it and shakes itself dry after the rain. ---
    const [sx, sy] = STUMP
    const stump =
      groundShadow(sx, sy + 2, 56, 7) +
      `<path d="M${sx - 40} ${sy}l4-48h72l4 48z" fill="url(#ke-bark)" ${O}/><ellipse cx="${sx}" cy="${sy - 48}" rx="36" ry="10" fill="#d9b27a" ${Ow(1.8)}/>` +
      `<ellipse cx="${sx}" cy="${sy - 48}" rx="22" ry="5" fill="none" stroke="#a8874e" stroke-width="1.4"/><ellipse cx="${sx}" cy="${sy - 48}" rx="10" ry="2.4" fill="none" stroke="#a8874e" stroke-width="1.4"/>` +
      `<path d="M${sx - 40} ${sy}q-10 4-14 0M${sx + 40} ${sy}q10 4 14 0" fill="none" stroke="${INK}" stroke-width="2"/>` +
      `<path d="M${sx - 36} ${sy - 20}q20-8 30 0" fill="none" stroke="#5f9a46" stroke-width="6" stroke-linecap="round"/>` +
      `<ellipse cx="${sx - 15}" cy="${sy - 18}" rx="12" ry="9" fill="#2e1a0c" ${Ow(1.4)}/>` +
      // The sleeping dormouse: its round back in the hole.
      `<path d="M${sx - 25} ${sy - 16}q10-12 20 0z" fill="#d9a066" ${Ow(1.2)}/><path d="M${sx - 20} ${sy - 18}q2-3 5 0" fill="none" stroke="${INK}" stroke-width="1.2"/>` +
      once(showIn([0, DRY]), [sx - 15, sy - 30], anim({ type: 'keys', period: 2, keys: [{ t: 0, x: 0, y: 0, o: 0 }, { t: 0.3, o: 1 }, { t: 2, x: 10, y: -24, o: 0 }], pivot: [sx - 12, sy - 30] },
        `<path d="M${sx - 14} ${sy - 32}h6l-6 6h6" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`)) +
      diff(sx - 18, sy + 3, 20, `<path d="M${sx - 15} ${sy - 10}q-4 14-2 20q2 8 8 4" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${sx - 15} ${sy - 10}q-4 14-2 20q2 8 8 4" fill="none" stroke="#d9a066" stroke-width="3" stroke-linecap="round"/>`, '') +
      diff(sx + 38, sy - 18, 18, `<path d="M${sx + 38} ${sy - 12}v-8" stroke="${INK}" stroke-width="4"/><path d="M${sx + 38} ${sy - 12}v-8" stroke="#f4ead6" stroke-width="2"/><path d="M${sx + 30} ${sy - 20}q8-12 16 0z" fill="#d9442e" ${Ow(1.3)}/><circle cx="${sx + 36}" cy="${sy - 23}" r="1.5" fill="#fff"/>`, '')
    const ROBIN: [number, number] = [sx - 5, sy - 52]
    const [rbx, rby] = ROBIN
    const robin = diff(rbx, rby - 12, 32, '',
      keys('robin', [{ t: 0, x: 120, y: -140, o: 0, ease: 'step' }, { t: LAUGH, o: 1, ease: 'out' }, { t: LAUGH + 0.5, x: 0, y: 0, ease: 'step' },
        ...Array.from({ length: 6 }, (_, i) => ({ t: Math.round((LAUGH + 1 + i * 0.1) * 100) / 100, rot: i % 2 ? 14 : -14, ease: 'inOut' as const })),
        { t: LAUGH + 1.6, rot: 0, ease: 'step' }, { t: 19.1, ease: 'in' }, { t: 19.55, x: 140, y: -120, o: 1, ease: 'step' }, { t: 19.6, o: 0, ease: 'step' }], ROBIN,
        `<path d="M${rbx - 2} ${rby}v-6M${rbx + 3} ${rby}v-6" stroke="${INK}" stroke-width="1.6"/>` +
          `<path d="M${rbx + 10} ${rby - 14}l10-2l-6 8z" fill="#8a5a32" ${Ow(1.2)}/><ellipse cx="${rbx}" cy="${rby - 12}" rx="12" ry="9" fill="#8a5a32" ${Ow(1.6)}/>` +
          `<ellipse cx="${rbx - 4}" cy="${rby - 10}" rx="7" ry="6" fill="#f07a3a"/><circle cx="${rbx - 8}" cy="${rby - 20}" r="7" fill="#8a5a32" ${Ow(1.5)}/><circle cx="${rbx - 10}" cy="${rby - 18}" r="4" fill="#f07a3a"/>` +
          `<path d="M${rbx - 14} ${rby - 21}l-6 1l6 2z" fill="${INK}"/><circle cx="${rbx - 9}" cy="${rby - 22}" r="1.3" fill="${INK}"/>` +
          // Shaking off the drops.
          once(showIn([LAUGH + 1, LAUGH + 1.7]), ROBIN, [[-20, -24], [16, -26], [24, -6], [-24, -4]].map(([dx, dy]) => `<path d="M${rbx + dx} ${rby + dy}q3 4 0 6q-3-2 0-6z" fill="#cfe8f2" ${Ow(0.8)}/>`).join(''))),
      'robin', during(LAUGH, 19.6))

    // --- Little toadstools by the big one (one cap red in A, brown in B). ---
    const toad = (x: number, y: number, s: number, cap: string) =>
      `<path d="M${x - 4 * s} ${y}q-2-${14 * s} ${4 * s}-${16 * s}q${6 * s} 2 ${4 * s} ${16 * s}z" fill="#f6efe2" ${Ow(1.3)}/>` +
      `<path d="M${x - 14 * s} ${y - 14 * s}q${14 * s}-${18 * s} ${28 * s} 0q-${14 * s} ${5 * s}-${28 * s} 0z" fill="${cap}" ${Ow(1.4)}/><circle cx="${x - 4 * s}" cy="${y - 19 * s}" r="${2 * s}" fill="#fff"/><circle cx="${x + 5 * s}" cy="${y - 18 * s}" r="${1.6 * s}" fill="#fff"/>`
    const toadstools =
      groundShadow(906, 804, 30, 4) +
      toad(918, 806, 0.8, '#d9442e') + toad(892, 808, 0.7, '#e06040') +
      diff(902, 786, 22, toad(904, 800, 1, '#d9442e'), toad(904, 800, 1, '#8a5a32'))

    // --- The big toadstool: its ring (A only), a spot fewer on its cap in B (a hard one), a raindrop hanging from its
    // rim (A only). ---
    const [mx, my] = MUSH
    const spot = (x: number, y: number, rx: number, ry: number) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff8ec" ${Ow(1.2)}/>`
    const mushStem =
      groundShadow(mx, my + 2, 70, 8) +
      `<path d="M${mx - 34} ${my}q8-60 8-150h52q0 90 8 150z" fill="url(#c22-stem)" ${O}/>` +
      `<path d="M${mx - 14} ${my - 20}q2-50 0-120M${mx + 12} ${my - 30}q-2-40 0-100" fill="none" stroke="#c9b48a" stroke-width="2"/>` +
      diff(mx, my - 104, 44, `<path d="M${mx - 34} ${my - 114}q34 16 68 0l8 14q-42 18-84 0z" fill="#f6efe2" ${Ow(1.6)}/><path d="M${mx - 26} ${my - 104}q26 10 52 0" fill="none" stroke="#c9b48a" stroke-width="1.6"/>`, '')
    const mushCap =
      `<ellipse cx="${mx}" cy="${my - 145}" rx="160" ry="16" fill="#f4e6c8" ${Ow(2)}/>` +
      Array.from({ length: 15 }, (_, i) => `<path d="M${mx} ${my - 140}L${mx - 150 + i * 21.4} ${my - 150}" stroke="#d9c49a" stroke-width="1.4"/>`).join('') +
      `<path d="M${mx - 160} ${my - 145}q160-170 320 0q-40 14-160 14t-160-14z" fill="url(#c22-cap)" ${O}/>` +
      `<path d="M${mx - 110} ${my - 180}q50-60 120-62" fill="none" stroke="#fff" stroke-opacity="0.3" stroke-width="10" stroke-linecap="round"/>` +
      spot(mx - 90, my - 170, 12, 8) + spot(mx - 45, my - 200, 10, 7) + spot(mx + 5, my - 208, 13, 8) + spot(mx + 110, my - 168, 10, 7) +
      spot(mx - 20, my - 168, 9, 6) + spot(mx + 40, my - 170, 11, 7) + spot(mx - 130, my - 152, 7, 5) +
      diff(mx + 60, my - 195, 18, spot(mx + 60, my - 195, 9, 6), '') +
      // Rain running off the cap's rim while it rains.
      once(showIn([0, DRY]), [mx, my - 140],
        [[-150, 0], [-80, 0.4], [90, 0.2], [140, 0.6]].map(([dx, phase]) => anim({ type: 'keys', period: 0.8, phase, keys: [{ t: 0, y: 0, o: 1 }, { t: 0.8, y: 130, o: 0 }], pivot: [mx + dx, my - 138] },
          `<path d="M${mx + dx} ${my - 140}q3 5 0 8q-3-3 0-8z" fill="#cfe8f2" ${Ow(0.9)}/>`)).join('')) +
      diff(mx + 154, my - 132, 18, `<path d="M${mx + 154} ${my - 142}q7 10 0 15q-7-5 0-15z" fill="#cfe8f2" ${Ow(1.2)}/><circle cx="${mx + 152}" cy="${my - 133}" r="1.4" fill="#fff"/>`, '')

    // --- The animals. ---
    // The frog, holding a big leaf over its head.
    const [fgx, fgy] = FROG
    const frogEyesCover = `<circle cx="${fgx - 8}" cy="${fgy - 24}" r="6.4" fill="#66c25a"/><circle cx="${fgx + 8}" cy="${fgy - 24}" r="6.4" fill="#66c25a"/>`
    const frogM = keys(undefined, frogKeys, FROG,
      groundShadow(fgx, fgy, 22, 4) +
        `<path d="M${fgx + 12} ${fgy - 12}q4-26 2-48" fill="none" stroke="#3f7d2e" stroke-width="3"/>` +
        `<path d="M${fgx - 20} ${fgy - 56}q34-26 66 4q-14-6-34-2t-32-2z" fill="#7fbf5a" ${Ow(1.6)}/><path d="M${fgx - 16} ${fgy - 56}q30-14 58 4" fill="none" stroke="#3f7d2e" stroke-width="1.4"/>` +
        frog(fgx, fgy) +
        eyes(FROG, fgx, fgy - 24, 8, frogEyesCover) +
        mouth(FROG, fgx, fgy - 14, 8) +
        dazed(FROG, fgx, fgy - 50))
    // The mole: popping up from under the toadstool; then flung out with the others.
    const [mlx, mly] = MOLE
    const moleBody = (pivot: [number, number]) =>
      `<ellipse cx="${mlx}" cy="${mly - 22}" rx="22" ry="26" fill="url(#c22-mole)" ${Ow(1.8)}/>` +
      `<ellipse cx="${mlx - 24}" cy="${mly - 22}" rx="9" ry="6" fill="#f2a0aa" ${Ow(1.3)}/><ellipse cx="${mlx + 24}" cy="${mly - 22}" rx="9" ry="6" fill="#f2a0aa" ${Ow(1.3)}/>` +
      `<path d="M${mlx - 30} ${mly - 22}h-4M${mlx - 30} ${mly - 19}l-4 2M${mlx + 30} ${mly - 22}h4M${mlx + 30} ${mly - 19}l4 2" stroke="${INK}" stroke-width="1.2"/>` +
      `<ellipse cx="${mlx}" cy="${mly - 30}" rx="7" ry="5" fill="#f2a0aa" ${Ow(1.3)}/>` +
      eyes(pivot, mlx, mly - 40, 8, `<rect x="${mlx - 14}" y="${mly - 46}" width="28" height="11" rx="5" fill="#4a4a5a"/>`) +
      mouth(pivot, mlx, mly - 22, 6)
    const moleInHole = once(showIn([0, POP]), MOLE,
      `<g clip-path="url(#c22-hole)">` + keys(undefined, [{ t: 0, y: 64 }, { t: 5, ease: 'out' }, { t: 5.4, y: 0 }, { t: 5.55, y: 4, ease: 'inOut' }, { t: 5.7, y: 0 }, { t: 19.95, ease: 'step' }], MOLE, moleBody(MOLE)) + `</g>`)
    const moleFree = once(showIn([POP, LOOP]), MOLE, keys(undefined, [{ t: 0, x: 0, y: 0, rot: 0 }, ...popKeys([110, -130], [160, 62], 360)], MOLE, groundShadow(mlx, mly, 22, 4) + moleBody(MOLE) + dazed(MOLE, mlx, mly - 66)))
    const moleHill = `<path d="M${mlx - 34} ${mly + 2}q34-20 68 0z" fill="#7a5a3a" ${Ow(1.6)}/><path d="M${mlx - 16} ${mly - 4}l4-2M${mlx + 8} ${mly - 6}l4 1" stroke="#5e4428" stroke-width="2"/>`
    // The fox cub: sitting, its tail round its feet.
    const [fxx, fxy] = FOX
    const foxM = keys(undefined, foxKeys, FOX,
      groundShadow(fxx, fxy, 28, 5) +
        `<path d="M${fxx - 14} ${fxy - 6}q-34 4-30-26q2-10 10-8" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><path d="M${fxx - 14} ${fxy - 6}q-34 4-30-26q2-10 10-8" fill="none" stroke="#e8762c" stroke-width="12" stroke-linecap="round"/>` +
        `<circle cx="${fxx - 34}" cy="${fxy - 40}" r="7" fill="#fff4e8" ${Ow(1.3)}/>` +
        `<ellipse cx="${fxx}" cy="${fxy - 24}" rx="22" ry="26" fill="url(#c22-fox)" ${Ow(1.8)}/><ellipse cx="${fxx}" cy="${fxy - 20}" rx="11" ry="16" fill="#fff4e8"/>` +
        `<path d="M${fxx - 10} ${fxy}v-8M${fxx + 10} ${fxy}v-8" stroke="#3a2414" stroke-width="7" stroke-linecap="round"/>` +
        `<path d="M${fxx - 18} ${fxy - 66}l-2-22l16 12zM${fxx + 18} ${fxy - 66}l2-22l-16 12z" fill="#e8762c" ${Ow(1.4)}/><path d="M${fxx - 19} ${fxy - 82}l-1-6l5 4zM${fxx + 19} ${fxy - 82}l1-6l-5 4z" fill="#2b2b3a"/>` +
        `<circle cx="${fxx}" cy="${fxy - 58}" r="18" fill="url(#c22-fox)" ${Ow(1.8)}/><path d="M${fxx - 18} ${fxy - 56}q18 16 36 0q-6 12-18 12t-18-12z" fill="#fff4e8"/>` +
        `<ellipse cx="${fxx}" cy="${fxy - 50}" rx="3.6" ry="2.8" fill="${INK}"/>` +
        eyes(FOX, fxx, fxy - 62, 7, `<rect x="${fxx - 13}" y="${fxy - 68}" width="26" height="11" rx="5" fill="#e8762c"/>`) +
        mouth(FOX, fxx, fxy - 45, 6) +
        // Drops flying off as it shakes.
        once(showIn([7.6, 8.3]), FOX, [[-34, -50], [32, -54], [-30, -20], [34, -24], [0, -86]].map(([dx, dy]) => `<path d="M${fxx + dx} ${fxy + dy}q4 5 0 8q-4-3 0-8z" fill="#cfe8f2" ${Ow(0.9)}/>`).join('')) +
        dazed(FOX, fxx, fxy - 92))
    // The badger: a striped head on a broad grey body.
    const [bgx, bgy] = BADGER
    const badgerM = keys(undefined, badgerKeys, BADGER,
      groundShadow(bgx, bgy, 46, 6) +
        `<ellipse cx="${bgx}" cy="${bgy - 24}" rx="44" ry="26" fill="url(#c22-badger)" ${Ow(1.8)}/>` +
        `<path d="M${bgx - 28} ${bgy}v-10M${bgx - 12} ${bgy}v-8M${bgx + 12} ${bgy}v-8M${bgx + 28} ${bgy}v-10" stroke="#2b2b3a" stroke-width="9" stroke-linecap="round"/>` +
        `<circle cx="${bgx - 15}" cy="${bgy - 70}" r="6" fill="#2b2b3a" ${Ow(1.2)}/><circle cx="${bgx + 15}" cy="${bgy - 70}" r="6" fill="#2b2b3a" ${Ow(1.2)}/>` +
        `<ellipse cx="${bgx}" cy="${bgy - 52}" rx="22" ry="21" fill="#f4f1e8" ${Ow(1.8)}/>` +
        `<path d="M${bgx - 12} ${bgy - 72}q-2 14 4 30q3 4 6 0q-2-16-4-30zM${bgx + 12} ${bgy - 72}q2 14-4 30q-3 4-6 0q2-16 4-30z" fill="#2b2b3a"/>` +
        `<ellipse cx="${bgx}" cy="${bgy - 36}" rx="5" ry="3.6" fill="${INK}"/>` +
        eyes(BADGER, bgx, bgy - 52, 8, `<path d="M${bgx - 14} ${bgy - 58}h10v11h-10zM${bgx + 4} ${bgy - 58}h10v11h-10z" fill="#2b2b3a"/>`) +
        mouth(BADGER, bgx, bgy - 32, 6) +
        dazed(BADGER, bgx, bgy - 92))
    // The plump wild-boar piglet: brown with pale stripes.
    const [pgx, pgy] = PIG
    const pigM = keys(undefined, pigKeys, PIG,
      groundShadow(pgx, pgy, 46, 6) +
        anim({ type: 'keys', period: 0.6, keys: [{ t: 0, rot: -20 }, { t: 0.3, rot: 20, ease: 'inOut' }], pivot: [pgx + 38, pgy - 34] },
          `<path d="M${pgx + 38} ${pgy - 34}q12-4 8-14q-6-4-8 4" fill="none" stroke="${INK}" stroke-width="3"/>`) +
        `<ellipse cx="${pgx}" cy="${pgy - 30}" rx="42" ry="30" fill="url(#c22-pig)" ${Ow(1.8)}/>` +
        `<path d="M${pgx - 30} ${pgy - 44}q30-12 60 0M${pgx - 36} ${pgy - 30}q36-12 72 0M${pgx - 30} ${pgy - 16}q30-10 60 0" fill="none" stroke="#e8cf9a" stroke-width="4" stroke-linecap="round"/>` +
        `<path d="M${pgx - 24} ${pgy}v-10M${pgx - 8} ${pgy}v-8M${pgx + 8} ${pgy}v-8M${pgx + 24} ${pgy}v-10" stroke="#5e3a1c" stroke-width="8" stroke-linecap="round"/>` +
        `<path d="M${pgx - 22} ${pgy - 76}l-4-16l14 8zM${pgx + 22} ${pgy - 76}l4-16l-14 8z" fill="#8a5a32" ${Ow(1.4)}/>` +
        `<circle cx="${pgx}" cy="${pgy - 62}" r="24" fill="url(#c22-pig)" ${Ow(1.8)}/>` +
        `<ellipse cx="${pgx}" cy="${pgy - 50}" rx="12" ry="8" fill="#e8a888" ${Ow(1.5)}/><circle cx="${pgx - 4}" cy="${pgy - 50}" r="2" fill="${INK}"/><circle cx="${pgx + 4}" cy="${pgy - 50}" r="2" fill="${INK}"/>` +
        // Its eyes: open; half shut and smug once alone in the dry; laughing.
        once(showIn([0, POP]), PIG, dot(pgx - 9, pgy - 68) + dot(pgx + 9, pgy - 68)) +
        once(showIn([POP, LAUGH]), PIG, dot(pgx - 9, pgy - 67) + dot(pgx + 9, pgy - 67) + `<path d="M${pgx - 14} ${pgy - 70}h10M${pgx + 4} ${pgy - 70}h10" stroke="#8a5a32" stroke-width="4"/>`) +
        once(showIn([LAUGH, LOOP]), PIG, `<rect x="${pgx - 15}" y="${pgy - 73}" width="30" height="11" rx="5" fill="#a0703e"/>` + shut(pgx - 9, pgy - 68) + shut(pgx + 9, pgy - 68)) +
        mouth(PIG, pgx, pgy - 40, 8))

    // POP: starbursts where they fly out, splashes where they land.
    const pop =
      starburst(640, 720, POP) + starburst(790, 726, POP, 0.8) + starburst(720, 690, POP + 0.05, 0.7) +
      drops(PUDDLE_L[0], PUDDLE_L[1], 8, 90) + drops(PUDDLE_R[0], PUDDLE_R[1], 8, 90)

    // --- The rain: streaks over everything until it stops (the same in both pictures). ---
    let streaks = ''
    for (let i = 0; i < 80; i++) {
      const rx = Math.round(rand() * (W + 200))
      const ry = Math.round(-900 + rand() * 900)
      streaks += anim({ type: 'path', points: [[0, 0], [-160, 1000]], period: 1 + rand() * 0.6, phase: rand() },
        `<path d="M${rx} ${ry}l-3 18" stroke="#eef5f8" stroke-opacity="0.8" stroke-width="1.6" stroke-linecap="round"/>`)
    }
    const rain = once([{ t: 0, o: 1, ease: 'step' }, { t: DRY, o: 1, ease: 'out' }, { t: DRY + 0.6, o: 0, ease: 'step' }], [W / 2, H / 2], streaks)

    return (
      `<defs>${NATURE_DEFS}${SPRING_DEFS}` +
      `<linearGradient id="c22-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9c7c6"/><stop offset="0.7" stop-color="#d4ddd4"/><stop offset="1" stop-color="#dfe6d6"/></linearGradient>` +
      `<linearGradient id="c22-clear" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ecbee"/><stop offset="0.7" stop-color="#cfe9f2"/><stop offset="1" stop-color="#eef4e0"/></linearGradient>` +
      `<radialGradient id="c22-glow"><stop offset="0" stop-color="#fff4cc" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffe9a8" stop-opacity="0.4"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c22-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6f9a52"/><stop offset="0.5" stop-color="#5f8a46"/><stop offset="1" stop-color="#4f7a3a"/></linearGradient>` +
      `<radialGradient id="c22-leaf" cx="0.62" cy="0.3" r="0.85"><stop offset="0" stop-color="#8fcf6a"/><stop offset="0.6" stop-color="#4f9a46"/><stop offset="1" stop-color="#2f6a34"/></radialGradient>` +
      `<linearGradient id="c22-beech" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a9696"/><stop offset="0.6" stop-color="#b9c4c2"/><stop offset="1" stop-color="#d4dcda"/></linearGradient>` +
      `<radialGradient id="c22-puddle" cx="0.5" cy="0.4" r="0.7"><stop offset="0" stop-color="#cfe6ee"/><stop offset="1" stop-color="#7fa8b8"/></radialGradient>` +
      `<linearGradient id="c22-stem" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e3d4b0"/><stop offset="0.6" stop-color="#f6efe0"/><stop offset="1" stop-color="#fffaf0"/></linearGradient>` +
      `<radialGradient id="c22-cap" cx="0.62" cy="0.25" r="0.85"><stop offset="0" stop-color="#ff7a5a"/><stop offset="0.55" stop-color="#e0402e"/><stop offset="1" stop-color="#a8231a"/></radialGradient>` +
      `<radialGradient id="c22-mole" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#7a7a8a"/><stop offset="1" stop-color="#3a3a48"/></radialGradient>` +
      `<radialGradient id="c22-fox" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#ffa45a"/><stop offset="1" stop-color="#d4601e"/></radialGradient>` +
      `<radialGradient id="c22-badger" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#b9bcc2"/><stop offset="1" stop-color="#7a7e86"/></radialGradient>` +
      `<radialGradient id="c22-pig" cx="0.6" cy="0.3" r="0.85"><stop offset="0" stop-color="#c49462"/><stop offset="1" stop-color="#8a5a32"/></radialGradient>` +
      `<clipPath id="c22-hole"><rect x="${MOLE[0] - 50}" y="${MOLE[1] - 120}" width="100" height="120"/></clipPath>` +
      `<clipPath id="c22-worm"><rect x="${WORM[0] - 30}" y="${WORM[1] - 40}" width="60" height="40"/></clipPath></defs>` +
      sky +
      ground +
      beech +
      oak +
      moreFerns +
      puddle(PUDDLE_L, 84, 16) +
      puddle(PUDDLE_R, 74, 15) +
      puddle(PUDDLE_F, 46, 10) +
      diff(668, 876, 20, `<path d="M656 878q8-12 24-4q-10 8-24 4z" fill="#d9a03a" ${Ow(1.2)}/><path d="M658 877l20-3" stroke="#a8743f" stroke-width="1"/>`, '') +
      worm +
      bilberry +
      fern +
      stump +
      toadstools +
      mushStem +
      moleInHole +
      moleHill +
      mushCap +
      badgerM +
      frogM +
      foxM +
      moleFree +
      pigM +
      dock +
      beetle +
      robin +
      pop +
      rain
    )
  },
})
