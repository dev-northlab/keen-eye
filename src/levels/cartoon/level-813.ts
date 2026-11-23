// Cartoon "The bear and the honey" (docs/cartoon-mode.md), made like 812: a 20 s spring story told by a camera. A bear
// peeks out of a lilac bush, tiptoes past the beekeeper's hut to the hives, lifts a lid and licks honey off his paw,
// blissful — until the bees pour out. Chased by the swarm, he leaps into the pond, ducks under as the bees swoop low,
// and comes up once they give up: a lily pad on his head, a frog on top. Twelve differences: two hard (a stake of the
// wattle fence shorter, the birdhouse's perch), three events of the story.
import type { CameraKey, Keyframe } from '../../engine/types.ts'
import { svgLevel } from '../helpers.ts'
import { bee, blossomTree, butterflyAt, dragonfly, farBird, frog, grassTuft, groundShadow, INK, keenOwl, lilacBush, lilyPad, NATURE_DEFS, O, oakTree, Ow, pineTree, puffCloud, SPRING_DEFS, swingKeys, waterLily, willowTree } from './shapes.ts'

const LOOP = 20
const during = (from: number, to: number) => ({ from, to, period: LOOP })
const W = 1440
const H = 900

const WIDE = { x: 70, y: 88, w: 1300 }
const camera: CameraKey[] = [
  { t: 0, ...WIDE, ease: 'step' },
  // Something stirs in the lilac bush: the bear peeks out, sniffing.
  { t: 1.8, x: 30, y: 600, w: 400, ease: 'step' },
  { t: 3.5, x: 30, y: 600, w: 400, ease: 'inOut' },
  // He tiptoes past the hut to the hives.
  { t: 7, x: 440, y: 600, w: 400, ease: 'step' },
  // Close up: the lid, the paw, the honey.
  { t: 7.05, x: 520, y: 640, w: 260, ease: 'step' },
  // The bees pour out.
  { t: 9.45, x: 470, y: 560, w: 420, ease: 'step' },
  { t: 10.6, x: 470, y: 470, w: 600, ease: 'inOut' },
  // The chase, to the pond.
  { t: 13.6, x: 700, y: 470, w: 600, ease: 'inOut' },
  { t: 14.2, x: 880, y: 560, w: 460, ease: 'step' },
  // He comes up with a lily pad and a frog on his head.
  { t: 16.9, x: 1000, y: 660, w: 240 },
  { t: 19.95, x: 1008, y: 664, w: 228, ease: 'step' },
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

/** The bear's feet, behind the lilac bush. */
const BEAR: [number, number] = [150, 800]
/** Tiptoeing to the hives, then running to the pond (offsets of x). */
const TIPTOE: [number, number] = [3.5, 7]
const RUN: [number, number] = [10.5, 13.6]
const AT_HIVE = 450
const AT_BANK = 740
const IN_POND = 970

function bearKeys(): Keyframe[] {
  const k: Keyframe[] = [
    // Crouched behind the bush.
    { t: 0, x: 0, y: 8, rot: 0, sy: 0.5 },
    { t: 1.9, ease: 'out' },
    // Up he comes, sniffing the air.
    { t: 2.35, y: 0, sy: 1, ease: 'inOut' },
    { t: 2.65, y: -5, ease: 'inOut' },
    { t: 2.95, y: 0, ease: 'inOut' },
    { t: 3.25, y: -5, ease: 'inOut' },
  ]
  // On tiptoe: up and down with every step.
  for (let j = 0; j <= 20; j++) k.push({ t: TIPTOE[0] + (j * (TIPTOE[1] - TIPTOE[0])) / 20, x: (AT_HIVE * j) / 20, y: j % 2 ? -9 : 0, rot: 0, ease: 'inOut' })
  // At the hive; a jump of fright as the bees come out.
  k.push({ t: 9.5, x: AT_HIVE, y: 0, ease: 'out' }, { t: 9.7, y: -26, ease: 'in' }, { t: 9.95, y: 0 }, { t: RUN[0] - 0.1, rot: 0, ease: 'inOut' })
  // Running, leaning forward.
  for (let j = 0; j <= 12; j++) k.push({ t: RUN[0] + (j * (RUN[1] - RUN[0])) / 12, x: AT_HIVE + ((AT_BANK - AT_HIVE) * j) / 12, y: j % 2 ? -12 : 0, rot: 9, ease: 'inOut' })
  // The leap into the pond.
  k.push(
    { t: 13.62, ease: 'out' },
    { t: 13.9, x: 850, y: -120, rot: 22, ease: 'in' },
    { t: 14.2, x: IN_POND, y: 70, rot: 0, ease: 'inOut' },
    { t: 14.8, y: 74, ease: 'inOut' },
    { t: 15.5, y: 70, ease: 'in' },
    // Under, as the bees swoop low.
    { t: 15.75, y: 190 },
    { t: 16.6, y: 190, ease: 'out' },
    { t: 16.9, y: 70, ease: 'inOut' },
    { t: 17.8, y: 74, ease: 'inOut' },
    { t: 18.7, y: 70, ease: 'inOut' },
    { t: 19.95, y: 72, ease: 'step' },
  )
  return k
}

/** The middle hive (the bear's): its lid opens on the right-hand hinge. */
const HIVE = 660
const HIVE_Y = 790
/** The swarm comes out of the middle hive's top. */
const SWARM: [number, number] = [HIVE, HIVE_Y - 78]
const swarmKeys: Keyframe[] = [
  { t: 0, x: 0, y: 0, sx: 0.2, sy: 0.2, o: 0, ease: 'step' },
  { t: 9.45, o: 1, ease: 'out' },
  { t: 9.9, x: 0, y: -50, sx: 1, sy: 1, ease: 'inOut' },
  { t: 10.5, x: -30, y: -64, ease: 'in' },
  { t: 13.6, x: 180, y: -66, ease: 'inOut' },
  { t: 14.2, x: 400, y: -50, ease: 'inOut' },
  { t: 14.8, x: 480, y: -40, ease: 'inOut' },
  { t: 15.3, x: 440, y: -30, ease: 'inOut' },
  // Swooping low where the bear was.
  { t: 15.8, x: 460, y: 28, ease: 'inOut' },
  { t: 16.5, x: 476, y: 18, ease: 'in' },
  // They give up and fly home.
  { t: 17, x: 380, y: -60 },
  { t: 18.6, x: 0, y: -10, sx: 1, sy: 1, ease: 'in' },
  { t: 18.8, sx: 0.2, sy: 0.2, o: 0 },
]

/** The pond: the bear's body below this line is under water. */
const POND: [number, number] = [1120, 790]
const WATERLINE = 782

export default svgLevel({
  id: 813,
  chapter: 'cartoon',
  title: 'cartoonBearHoney',
  parTimeSec: 120,
  viewBox: { w: W, h: H },
  cartoon: { period: LOOP, frame: { w: 800, h: 500 }, camera },
  scene: ({ diff, anim, rand }) => {
    const keys = (id: string | undefined, k: Keyframe[], pivot: [number, number], markup: string) =>
      anim({ type: 'keys', keys: k, pivot, period: LOOP, ...(id && { id }) }, markup)
    const once = (k: Keyframe[], pivot: [number, number], m: string) => keys(undefined, k, pivot, m)
    const beat = (pivot: [number, number], every: number, phase = 0) => (m: string) =>
      anim({ type: 'keys', period: every, phase, keys: [{ t: 0, sy: 1 }, { t: every / 2, sy: 0.3, ease: 'inOut' }], pivot }, m)
    const crown = (period: number, angle = 2, id?: string, extra = '') => (pivot: [number, number], m: string) =>
      anim({ type: 'sway', angle, pivot, period, phase: (pivot[0] % 11) / 11, ...(id && { id }) }, m + extra)
    /** A bee buzzing on the spot around (x, y). */
    const buzzing = (x: number, y: number, period: number, phase: number) =>
      anim(
        { type: 'path', points: [[0, 0], [5, -4], [9, 1], [3, 5]], period, phase },
        bee(x, y, (m) => anim({ type: 'keys', period: 0.12, keys: [{ t: 0, sy: 1 }, { t: 0.06, sy: 0.4 }], pivot: [x, y - 3] }, m)),
      )

    // --- The far background: sky, sun, clouds, hills with a forest line. ---
    let forest = ''
    for (let i = 0; i < 30; i++) {
      const fx = Math.round(i * 50 + rand() * 20)
      const fy = Math.round(610 - Math.sin(i * 0.5) * 18 + rand() * 10)
      const h = Math.round(34 + rand() * 22)
      forest += `<path d="M${fx} ${fy - h}l${Math.round(h * 0.4)} ${h}h-${Math.round(h * 0.8)}z" fill="#5f9a6a" fill-opacity="0.85"/>`
    }
    const sky =
      `<rect width="${W}" height="${H}" fill="url(#c6-sky)"/>` +
      `<circle cx="1250" cy="140" r="190" fill="url(#c6-glow)"/>` +
      `<circle cx="1250" cy="140" r="44" fill="#ffd56a" stroke="#f2a93b" stroke-width="3"/>` +
      `<ellipse cx="1236" cy="132" rx="4.5" ry="7" fill="${INK}"/><ellipse cx="1264" cy="132" rx="4.5" ry="7" fill="${INK}"/>` +
      anim({ type: 'blink', duty: 0.06, period: 4.1, phase: 0.2 }, `<rect x="1226" y="124" width="48" height="18" fill="#ffd56a"/><path d="M1228 133h12M1258 133h12" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`) +
      `<path d="M1232 154q18 14 36 0" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>` +
      anim({ type: 'path', points: [[0, 0], [150, 0]], period: 36 }, puffCloud(220, 120, 1)) +
      anim({ type: 'path', points: [[0, 0], [-130, 0]], period: 30 }, puffCloud(760, 180, 0.85)) +
      anim({ type: 'path', points: [[0, 0], [90, 0]], period: 26 }, puffCloud(1000, 90, 0.6)) +
      // Swallows back for the spring.
      keys(undefined, [{ t: 0, x: 0, y: 0 }, { t: 10, y: -30, ease: 'inOut' }, { t: 19.9, x: 1700, y: 0 }], [-120, 260],
        ([[-120, 260], [-144, 246], [-146, 274], [-168, 236]] as [number, number][]).map(([fx, fy], i) => farBird(fx, fy, beat([fx, fy - 2], 0.45, i * 0.2))).join('')) +
      // A spring rainbow after the morning rain.
      `<g fill="none" stroke-width="11" stroke-opacity="0.32">` +
      ['#e63946', '#f77f00', '#ffd23f', '#52b788', '#4d96e6', '#7b5cd6']
        .map((c, i) => `<path d="M${200 + i * 11} 600a${380 - i * 11} ${330 - i * 11} 0 0 1 ${760 - i * 22} 0" stroke="${c}"/>`)
        .join('') +
      `</g>` +
      `<path d="M0 560q200-70 420-30t400-20t360 10t260-40V700H0z" fill="url(#c6-far)"/>` +
      // A windmill on the far hill, its sails turning.
      `<path d="M1046 566l6-62h16l6 62z" fill="#e9dcc0" ${Ow(1.6)}/><path d="M1048 506l12-12l12 12z" fill="#a8382a" ${Ow(1.4)}/><rect x="1055" y="546" width="10" height="20" fill="#7a4a22"/>` +
      anim({ type: 'rotate', pivot: [1060, 504], period: 6 },
        [0, 90, 180, 270].map((a) => `<path transform="rotate(${a} 1060 504)" d="M1060 504l4-40h-8z" fill="#f4f1e8" ${Ow(1.2)}/>`).join('') + `<circle cx="1060" cy="504" r="3" fill="${INK}"/>`) +
      forest +
      `<path d="M0 640q240-50 480-16t480-10t480-20V760H0z" fill="url(#c6-hill)"/>` +
      `<rect y="712" width="${W}" height="${H - 712}" fill="url(#c6-ground)"/>` +
      // The path from the forest to the hives.
      `<path d="M0 850q200-40 420-46t260-6h40q-120 14-280 30t-440 50z" fill="url(#c6-path)" ${Ow(1.4)}/>`

    // --- Grass, spring flowers, petals. ---
    let meadow = ''
    for (let i = 0; i < 30; i++) {
      const tx = Math.round(rand() * W)
      const ty = Math.round(726 + rand() * 170)
      meadow += anim({ type: 'sway', angle: 7, pivot: [tx, ty], period: 2.4, phase: (tx % 13) / 13 }, grassTuft(tx, ty))
    }
    const tulip = (x: number, y: number, c: string) =>
      `<path d="M${x} ${y}v-22" stroke="#3f8f3a" stroke-width="2.6"/><path d="M${x} ${y - 6}q-8-4-8-14q6 2 8 10" fill="#4caf50" ${Ow(1)}/>` +
      `<path d="M${x - 7} ${y - 30}l3 10h8l3-10l-4 4l-3-6l-3 6z" fill="${c}" ${Ow(1.3)}/>`
    const dandelion = (x: number, y: number) =>
      `<path d="M${x} ${y}v-14" stroke="#3f8f3a" stroke-width="2.2"/><circle cx="${x}" cy="${y - 16}" r="5" fill="#ffd23f" ${Ow(1.2)}/><circle cx="${x}" cy="${y - 16}" r="2" fill="#f2a93b"/>`
    const TULIPS = ['#e63946', '#ffb703', '#ff6b9a', '#f77f00']
    let flowers = ''
    for (let i = 0; i < 34; i++) {
      const fx = Math.round(rand() * W)
      const fy = Math.round(740 + rand() * 150)
      // Keep the pond and the hive row clear.
      if (Math.abs(fx - POND[0]) < 230 && Math.abs(fy - POND[1]) < 90) continue
      if (fx > 480 && fx < 830 && fy < 812) continue
      flowers += anim({ type: 'sway', angle: 5, pivot: [fx, fy], period: 2.8, phase: (fx % 7) / 7 }, i % 3 ? dandelion(fx, fy) : tulip(fx, fy, TULIPS[i % TULIPS.length]))
    }
    const petal = (x: number, y: number) => `<path d="M${x - 4} ${y}q4-5 8 0q-4 5-8 0z" fill="#ffd1e0" ${Ow(0.8)}/>`
    let petals = ''
    for (let i = 0; i < 22; i++) {
      const px = Math.round(500 + rand() * 520)
      const py = Math.round(540 + rand() * 90)
      petals += anim(
        { type: 'path', points: [[0, 0], [-80 - rand() * 60, 260 + rand() * 60]], period: 6 + rand() * 4, phase: rand() },
        anim({ type: 'rotate', pivot: [px, py], period: 1.4 + rand(), reverse: i % 2 === 0 }, petal(px, py)),
      )
    }

    // --- The forest edge: firs, the oak with the owl's hollow (an owl in A) and a birdhouse (its perch in A only:
    // a hard one), the lilac bush the bear hides in. ---
    // The game's owl (the app icon's) peeking out of the hollow.
    const owl = keenOwl(266, 694, 0.6, (m) => anim({ type: 'blink', duty: 0.08, period: 3.3, phase: 0.6 }, m))
    const birdhouse =
      `<path d="M196 572v22" stroke="${INK}" stroke-width="1.6"/>` +
      `<rect x="184" y="596" width="24" height="28" fill="#d9a066" ${Ow(1.6)}/><path d="M180 598l16-12l16 12z" fill="#c0392b" ${Ow(1.6)}/>` +
      `<circle cx="196" cy="606" r="4.5" fill="#3a2414"/>` +
      diff(199, 614, 18, `<path d="M196 614h10" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M196 614h10" stroke="#8f5d2e" stroke-width="2" stroke-linecap="round"/>`, '')
    const forestEdge =
      pineTree(40, 760, 1.25, crown(4.6, 1.5)) +
      pineTree(120, 720, 0.85, crown(4.2, 1.5)) +
      oakTree(270, 742, 0.9, crown(5.4, 1.6)) +
      `<ellipse cx="266" cy="682" rx="12" ry="16" fill="#2e1a0c" ${Ow(1.6)}/>` +
      diff(266, 682, 22, owl, '') +
      birdhouse

    // --- The beekeeper's hut (a heart cut in its door in A, a round window in B) and its bench (a honey jar in A). ---
    const hut =
      groundShadow(395, 732, 80, 8) +
      `<rect x="334" y="648" width="122" height="84" fill="url(#c6-planks)" ${O}/>` +
      `<path d="M346 652v76M362 652v76M378 652v76M412 652v76M428 652v76M444 652v76" stroke="#7a4a22" stroke-opacity="0.45" stroke-width="1.6"/>` +
      `<path d="M322 652l73-54l73 54z" fill="url(#c6-roof)" ${O}/><path d="M340 640l55-40M360 646l35-26" stroke="#7d2a1e" stroke-opacity="0.4" stroke-width="2"/>` +
      `<rect x="380" y="672" width="30" height="60" fill="#8f5d2e" ${Ow(1.8)}/><circle cx="404" cy="704" r="2.2" fill="#ffd23f"/>` +
      diff(
        395,
        688,
        18,
        `<path d="M395 694l-6-6a3.5 3.5 0 0 1 6-4a3.5 3.5 0 0 1 6 4z" fill="#3a2414"/>`,
        `<circle cx="395" cy="688" r="5" fill="#3a2414"/>`,
      ) +
      `<rect x="420" y="664" width="26" height="22" fill="#bfe3f2" ${Ow(1.6)}/><path d="M433 664v22M420 675h26" stroke="${INK}" stroke-width="1.4"/>` +
      // The smoker on the hut's step, a wisp of smoke.
      `<rect x="352" y="716" width="14" height="16" rx="2" fill="#b0b4bc" ${Ow(1.4)}/><path d="M354 716l5-8l5 8" fill="#8a8f99" ${Ow(1.2)}/>` +
      anim({ type: 'keys', period: 2.4, keys: [{ t: 0, y: 0, o: 0.9, sx: 1 }, { t: 2.4, y: -40, o: 0, sx: 1.8 }], pivot: [359, 704] },
        `<circle cx="359" cy="704" r="5" fill="#fff" fill-opacity="0.7"/>`)
    const jar = `<rect x="432" y="716" width="16" height="22" rx="4" fill="#f2b33a" ${Ow(1.5)}/><rect x="430" y="711" width="20" height="6" rx="2" fill="#e8e3d6" ${Ow(1.3)}/><path d="M436 724h8" stroke="#fff" stroke-opacity="0.6" stroke-width="2"/>`
    const bench =
      groundShadow(440, 754, 34, 4) +
      `<rect x="412" y="738" width="58" height="8" rx="2" fill="url(#c6-planks)" ${Ow(1.6)}/><path d="M418 746v8M464 746v8" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` +
      diff(440, 727, 20, jar, '')

    // --- The wattle fence behind the hives (one stake shorter in B: a hard one), two blossoming cherries. ---
    let stakes = ''
    let tops = ''
    for (let i = 0; i <= 20; i++) {
      const x = 486 + i * 18
      stakes += `<rect x="${x - 3}" y="664" width="7" height="64" fill="#8f5d2e" ${Ow(1.4)}/>`
      const top = `<path d="M${x - 3} 666v-24l3.5-5l3.5 5v24z" fill="#8f5d2e" ${Ow(1.4)}/>`
      tops += i === 13 ? diff(x, 652, 18, top, '') : top
    }
    const weave = (y: number) =>
      `<path d="M480 ${y}q9-6 18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>` +
      `<path d="M480 ${y}q9-6 18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0" fill="none" stroke="#b07a44" stroke-width="7" stroke-linecap="round"/>`
    const fence = groundShadow(670, 730, 200, 6) + stakes + tops + weave(678) + weave(706)
    const cherries = blossomTree(590, 706, 0.95, crown(5, 1.5)) + blossomTree(890, 722, 1.05, crown(5.6, 1.5))

    // --- The hives: blue, yellow (the bear's, its lid opens) and green (its roof red in A, blue in B). ---
    const hiveBody = (x: number, color: string) =>
      groundShadow(x, HIVE_Y + 2, 40, 5) +
      `<path d="M${x - 26} ${HIVE_Y}v-16M${x + 26} ${HIVE_Y}v-16" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M${x - 26} ${HIVE_Y}v-16M${x + 26} ${HIVE_Y}v-16" stroke="#7a4a22" stroke-width="3" stroke-linecap="round"/>` +
      `<rect x="${x - 34}" y="${HIVE_Y - 22}" width="68" height="7" rx="2" fill="url(#c6-planks)" ${Ow(1.6)}/>` +
      `<rect x="${x - 30}" y="${HIVE_Y - 76}" width="60" height="54" fill="${color}" ${O}/>` +
      `<path d="M${x - 30} ${HIVE_Y - 58}h60M${x - 30} ${HIVE_Y - 40}h60" stroke="${INK}" stroke-width="1.8"/>` +
      `<path d="M${x - 30} ${HIVE_Y - 76}h60v54h-14v-54" fill="#000" fill-opacity="0.1"/>` +
      `<rect x="${x - 10}" y="${HIVE_Y - 31}" width="20" height="5" rx="2" fill="#2e1a0c"/>`
    const roof = (x: number, color: string) => `<path d="M${x - 36} ${HIVE_Y - 75}l36-22l36 22z" fill="${color}" ${O}/><path d="M${x - 20} ${HIVE_Y - 82}l20-12" stroke="#fff" stroke-opacity="0.35" stroke-width="3" stroke-linecap="round"/>`
    const lid = keys(
      undefined,
      [{ t: 0, rot: 0 }, { t: 7.1, ease: 'out' }, { t: 7.4, rot: 42 }, { t: 9.5, ease: 'in' }, { t: 9.65, rot: 0 }, { t: 19.95, ease: 'step' }],
      [HIVE + 36, HIVE_Y - 75],
      roof(HIVE, '#e9a23b'),
    )
    const hives =
      hiveBody(540, '#6fa8dc') + roof(540, '#3d6fa8') +
      hiveBody(HIVE, '#ffd23f') +
      // Honeycomb under the lid.
      `<rect x="${HIVE - 28}" y="${HIVE_Y - 84}" width="56" height="9" fill="#f2b33a" ${Ow(1.2)}/><path d="M${HIVE - 22} ${HIVE_Y - 80}h4M${HIVE - 8} ${HIVE_Y - 80}h4M${HIVE + 6} ${HIVE_Y - 80}h4M${HIVE + 18} ${HIVE_Y - 80}h4" stroke="#c9741f" stroke-width="2"/>` +
      lid +
      hiveBody(780, '#8fcf7a') + diff(780, 703, 40, roof(780, '#d94c3a'), roof(780, '#3a76d0'))
    // Bees going in and out of the hives all along.
    let hiveBees = ''
    for (const [i, hx] of [540, HIVE, 780].entries()) {
      hiveBees += buzzing(hx - 18, HIVE_Y - 40, 1.3 + i * 0.2, 0.1 + i * 0.3) + buzzing(hx + 22, HIVE_Y - 56, 1.7 - i * 0.1, 0.5 + i * 0.2)
    }

    // --- The pond with its far bank: a deer (antlers in A), the willow with a kingfisher (A only), a turtle on a
    // log (A only), lily pads, reeds. ---
    const [px, py] = POND
    const deerHead =
      `<path d="M1196 672q4-20 16-28l8 8q-10 8-12 24z" fill="#b5713a" ${Ow(1.6)}/>` +
      `<ellipse cx="1222" cy="646" rx="14" ry="9" transform="rotate(20 1222 646)" fill="#b5713a" ${Ow(1.6)}/>` +
      `<path d="M1208 640l-10-8l12 2z" fill="#b5713a" ${Ow(1.4)}/><circle cx="1220" cy="642" r="2" fill="${INK}"/><circle cx="1234" cy="652" r="2.4" fill="${INK}"/>` +
      diff(
        1218,
        624,
        22,
        `<path d="M1212 638q-4-14-12-20M1206 626l-8 2M1218 638q2-16 12-22M1225 622l8-4" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>` +
          `<path d="M1212 638q-4-14-12-20M1206 626l-8 2M1218 638q2-16 12-22M1225 622l8-4" fill="none" stroke="#e8d3a8" stroke-width="2.6" stroke-linecap="round"/>`,
        '',
        'deer',
      )
    const deer =
      groundShadow(1172, 720, 40, 4) +
      `<path d="M1150 690v28M1160 692v26M1184 692v26M1194 690v28" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M1150 690v28M1160 692v26M1184 692v26M1194 690v28" stroke="#9c5f2e" stroke-width="3" stroke-linecap="round"/>` +
      `<ellipse cx="1172" cy="682" rx="34" ry="17" fill="#b5713a" ${Ow(1.8)}/><circle cx="1160" cy="676" r="2.2" fill="#fff"/><circle cx="1174" cy="672" r="2" fill="#fff"/><circle cx="1166" cy="686" r="1.8" fill="#fff"/>` +
      `<path d="M1140 676q-8-4-6 6" fill="#f4e4c0" ${Ow(1.4)}/>` +
      anim(
        { type: 'keys', period: 7, id: 'deer', pivot: [1198, 676], keys: [{ t: 0, rot: 0 }, { t: 2.4, ease: 'inOut' }, { t: 3.1, rot: 80 }, { t: 5.2, ease: 'inOut' }, { t: 5.9, rot: 0 }] },
        deerHead,
      )
    const kingfisher =
      `<path d="M1312 676l10 4l-10 3z" fill="#1d6fa3" ${Ow(1.2)}/>` +
      `<ellipse cx="1300" cy="676" rx="10" ry="8" fill="#2f8fd0" ${Ow(1.5)}/><ellipse cx="1298" cy="680" rx="6" ry="4" fill="#f08a3a"/>` +
      `<circle cx="1292" cy="667" r="6.5" fill="#2f8fd0" ${Ow(1.5)}/><path d="M1286 666l-12 3l12 2z" fill="${INK}"/><circle cx="1291" cy="665" r="1.4" fill="#fff"/><circle cx="1291" cy="665" r="0.8" fill="${INK}"/>`
    const willow =
      willowTree(1392, 768, 0.92, crown(6, 1.2)) +
      `<path d="M1388 640q-40 2-92 12" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M1388 640q-40 2-92 12" fill="none" stroke="#8f5d2e" stroke-width="4" stroke-linecap="round"/>` +
      diff(1327, 641, 27, `<g transform="translate(30 -32)">${kingfisher}</g>`, '')
    const turtle =
      `<ellipse cx="1014" cy="790" rx="5.5" ry="4.5" fill="#7fb069" ${Ow(1.4)}/>` +
      `<path d="M984 800q0-20 16-20q16 0 16 20z" fill="url(#c6-shell)" ${Ow(1.6)}/><path d="M992 798l4-12M1000 798v-16M1008 798l-4-12" stroke="#3f6b2a" stroke-width="1.6"/>` +
      `<circle cx="1015" cy="789" r="1.2" fill="${INK}"/>`
    const pond =
      `<ellipse cx="${px}" cy="${py + 4}" rx="206" ry="70" fill="#7e9a52" ${Ow(2)}/>` +
      `<ellipse cx="${px}" cy="${py}" rx="200" ry="66" fill="url(#c6-water)" ${Ow(1.6)}/>` +
      anim({ type: 'keys', period: 3, keys: [{ t: 0, x: 0 }, { t: 1.5, x: 14, ease: 'inOut' }] }, `<path d="M1010 760h50M1150 744h40M1060 824h70" stroke="#fff" stroke-opacity="0.55" stroke-width="3" stroke-linecap="round"/>`) +
      lilyPad(1050, 832, 1.1) + lilyPad(1252, 750, 0.9) + waterLily(1262, 748) +
      `<rect x="956" y="798" width="80" height="14" rx="7" fill="url(#c6-log)" ${Ow(1.6)}/><ellipse cx="1036" cy="805" rx="5" ry="7" fill="#d9a066" ${Ow(1.4)}/>` +
      diff(997, 792, 26, anim({ type: 'keys', period: 3.6, keys: [{ t: 0, x: 0 }, { t: 1.8, x: -3, ease: 'inOut' }] }, turtle), '')
    const reed = (x: number, y: number, h: number) =>
      anim({ type: 'sway', angle: 4, pivot: [x, y], period: 2.6, phase: (x % 9) / 9 },
        `<path d="M${x} ${y}v-${h}" stroke="#4f8a33" stroke-width="3"/><rect x="${x - 3}" y="${y - h - 14}" width="7" height="20" rx="3.5" fill="#7a4a22" ${Ow(1.2)}/>` +
          `<path d="M${x} ${y - 10}q-12-20-10-44" fill="none" stroke="#5f9a3a" stroke-width="3"/>`)
    const reeds = reed(930, 800, 60) + reed(944, 806, 76) + reed(1302, 798, 64) + reed(1316, 806, 80) + reed(1290, 808, 52)

    // --- The bear. ---
    const [bx, by] = BEAR
    const legKeys = swingKeys([TIPTOE, RUN], 0.17, 24)
    const leg = (x: number, k: Keyframe[], back: boolean) =>
      keys(undefined, k, [x, by - 34],
        `<rect x="${x - 10}" y="${by - 38}" width="20" height="36" rx="9" fill="${back ? '#7a4a28' : 'url(#c6-fur)'}" ${Ow(1.8)}/><ellipse cx="${x + 3}" cy="${by - 3}" rx="12" ry="5" fill="${back ? '#6a3e20' : '#8a5530'}" ${Ow(1.6)}/>`)
    const ARM_RUN: Keyframe[] = []
    for (let j = 0; j <= 15; j++) ARM_RUN.push({ t: RUN[0] + j * 0.2, rot: j % 2 ? -50 : 20, ease: 'inOut' })
    const frontArmKeys: Keyframe[] = [
      { t: 0, rot: 0 }, { t: 3.3, ease: 'inOut' }, { t: 3.6, rot: -48 }, { t: 7, ease: 'inOut' },
      // Into the hive, to the mouth, licking.
      { t: 7.4, rot: -72, ease: 'inOut' }, { t: 7.75, ease: 'inOut' }, { t: 8.1, rot: -114, ease: 'inOut' },
      { t: 8.4, rot: -104, ease: 'inOut' }, { t: 8.7, rot: -114, ease: 'inOut' }, { t: 9, rot: -104, ease: 'inOut' }, { t: 9.3, rot: -114, ease: 'out' },
      // Hands up in fright.
      { t: 9.45, ease: 'out' }, { t: 9.65, rot: -165 }, { t: 10.35, ease: 'inOut' },
      ...ARM_RUN.map((k) => ({ ...k })),
      { t: 13.65, rot: -165, ease: 'step' }, { t: 14.2, rot: 0, ease: 'step' },
    ]
    const backArmKeys: Keyframe[] = [
      { t: 0, rot: 0 }, { t: 3.3, ease: 'inOut' }, { t: 3.6, rot: -36 }, { t: 7, ease: 'inOut' }, { t: 7.4, rot: -10 },
      { t: 9.45, ease: 'out' }, { t: 9.65, rot: -150 }, { t: 10.35, ease: 'inOut' },
      ...ARM_RUN.map((k) => ({ ...k, rot: k.rot === 20 ? -50 : 20 })),
      { t: 13.65, rot: -150, ease: 'step' }, { t: 14.2, rot: 0, ease: 'step' },
    ]
    /**
     * An arm hanging from the shoulder (sx, by − 84), turned by `k`: a slightly bent, tapering limb of solid fur, a
     * round paw with three claws; its top is covered by a patch of fur, so it grows out of the body without a seam.
     */
    const arm = (sx: number, k: Keyframe[], back: boolean, paw = '') => {
      const sy = by - 84
      const fur = back ? '#6e4224' : '#8f5a30'
      return keys(undefined, k, [sx, sy],
        `<path d="M${sx - 10} ${sy}c-3 14-1 26 2 36h15c2-10 4-22 3-36z" fill="${fur}" ${Ow(1.8)}/>` +
          `<path d="M${sx + 7} ${sy + 8}c1 10 0 18-2 26" fill="none" stroke="#000" stroke-opacity="0.18" stroke-width="3" stroke-linecap="round"/>` +
          `<circle cx="${sx}" cy="${sy + 40}" r="10" fill="${fur}" ${Ow(1.8)}/>` +
          `<path d="M${sx - 5} ${sy + 47}l-1.5 3.5M${sx} ${sy + 49}v4M${sx + 5} ${sy + 47}l1.5 3.5" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>` +
          `<circle cx="${sx}" cy="${sy + 3}" r="9" fill="${fur}"/>` +
          paw)
    }
    // Honey on his paw while he licks.
    const honey = once(showIn([7.6, 9.45]), BEAR,
      `<path d="M${bx + 7} ${by - 42}q7-7 14 0q0 8-4 12q-2 6-3 0q-6-2-7-12z" fill="#f2b33a" ${Ow(1.3)}/><circle cx="${bx + 12}" cy="${by - 41}" r="1.6" fill="#fff" fill-opacity="0.7"/>`)
    const eye = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="3.6" fill="${INK}"/><circle cx="${x + 1}" cy="${y - 1}" r="1.1" fill="#fff"/>`
    const [ex, ey] = [bx + 18, by - 128]
    const eyes =
      once(showIn([0, 8.1], [10.5, 13.6], [14.2, 16.9]), BEAR, eye(ex, ey) + eye(ex + 14, ey - 1)) +
      // Blissful while licking.
      once(showIn([8.1, 9.45]), BEAR, `<path d="M${ex - 4} ${ey + 1}q4-5 8 0M${ex + 10} ${ey}q4-5 8 0" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`) +
      // Wide with fright.
      once(showIn([9.45, 10.5], [13.6, 14.2]), BEAR,
        `<circle cx="${ex}" cy="${ey}" r="6.5" fill="#fff" ${Ow(1.6)}/><circle cx="${ex + 14}" cy="${ey - 1}" r="6.5" fill="#fff" ${Ow(1.6)}/><circle cx="${ex + 1}" cy="${ey}" r="2" fill="${INK}"/><circle cx="${ex + 15}" cy="${ey - 1}" r="2" fill="${INK}"/>`) +
      // Grumpy, half shut, with the frog on his head.
      once(showIn([16.9, LOOP]), BEAR,
        eye(ex, ey + 1) + eye(ex + 14, ey) + `<path d="M${ex - 5} ${ey - 1}h10M${ex + 9} ${ey - 2}h10" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`)
    const mouth =
      once(showIn([0, 8.1], [10.5, 13.6], [14.2, LOOP]), BEAR, `<path d="M${bx + 30} ${by - 102}q6 5 12 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`) +
      once(showIn([8.1, 9.45]), BEAR, `<path d="M${bx + 30} ${by - 103}q7 7 13 0" fill="#7a2a2a" ${Ow(1.6)}/>` +
        anim({ type: 'keys', period: 0.6, keys: [{ t: 0, y: 0 }, { t: 0.3, y: -3, ease: 'inOut' }], pivot: [bx + 38, by - 100] }, `<ellipse cx="${bx + 38}" cy="${by - 99}" rx="5" ry="4" fill="#f58aa0" ${Ow(1.2)}/>`)) +
      once(showIn([9.45, 10.5], [13.6, 14.2]), BEAR, `<ellipse cx="${bx + 36}" cy="${by - 101}" rx="5" ry="6" fill="#7a2a2a" ${Ow(1.6)}/>`)
    const head =
      `<circle cx="${bx - 6}" cy="${by - 146}" r="11" fill="url(#c6-fur)" ${Ow(1.8)}/><circle cx="${bx - 6}" cy="${by - 146}" r="5.5" fill="#d9a86a"/>` +
      `<circle cx="${bx + 26}" cy="${by - 150}" r="11" fill="url(#c6-fur)" ${Ow(1.8)}/><circle cx="${bx + 26}" cy="${by - 150}" r="5.5" fill="#d9a86a"/>` +
      `<circle cx="${bx + 10}" cy="${by - 120}" r="31" fill="url(#c6-fur)" ${Ow(2)}/>` +
      `<ellipse cx="${bx + 36}" cy="${by - 110}" rx="16" ry="12" fill="#e8c79a" ${Ow(1.8)}/>` +
      `<ellipse cx="${bx + 46}" cy="${by - 116}" rx="6.5" ry="4.8" fill="#2b1a10"/><circle cx="${bx + 44}" cy="${by - 118}" r="1.4" fill="#fff" fill-opacity="0.7"/>` +
      `<circle cx="${bx + 2}" cy="${by - 110}" r="5" fill="#ff9a8a" fill-opacity="0.45"/>` +
      eyes + mouth
    // Sniffing the air; a "!" as the bees come out.
    const sniff = once(showIn([2.4, 3.4]), BEAR,
      anim({ type: 'keys', period: 0.5, keys: [{ t: 0, x: 0, o: 1 }, { t: 0.5, x: 10, o: 0 }], pivot: [bx + 56, by - 118] },
        `<path d="M${bx + 56} ${by - 122}q5-3 8 0M${bx + 58} ${by - 114}q5-3 8 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`))
    const alarm = once(showIn([9.5, 10.4]), [bx + 10, by - 180],
      `<path d="M${bx + 6} ${by - 196}h8l-2 22h-4z" fill="#e63946" ${Ow(1.6)}/><circle cx="${bx + 10}" cy="${by - 166}" r="3.5" fill="#e63946" ${Ow(1.4)}/>`)
    // Dust from his heels as he runs.
    const dust = once(showIn([RUN[0], RUN[1]]), BEAR,
      anim({ type: 'keys', period: 0.4, keys: [{ t: 0, x: 0, y: 0, sx: 0.6, sy: 0.6, o: 0.9 }, { t: 0.4, x: -30, y: -10, sx: 1.4, sy: 1.4, o: 0 }], pivot: [bx - 24, by - 6] },
        `<circle cx="${bx - 24}" cy="${by - 6}" r="9" fill="#e9dcc0"/><circle cx="${bx - 34}" cy="${by - 10}" r="6" fill="#e9dcc0"/>`))
    // The lily pad and the frog on his head after the dive.
    const hat = once(showIn([16.85, LOOP]), BEAR,
      `<path d="M${bx - 12} ${by - 148}q22-14 46 0q-22 8-46 0z" fill="#5aa845" ${Ow(1.8)}/><path d="M${bx + 10} ${by - 150}l10 4" stroke="#468a35" stroke-width="1.4"/>` +
        `<g transform="translate(${bx + 10} ${by - 152}) scale(0.62)">${frog(0, 0, (m) => anim({ type: 'blink', duty: 0.08, period: 2.7, phase: 0.3 }, m), (m) => anim({ type: 'keys', period: 0.9, keys: [{ t: 0, sx: 1, sy: 1 }, { t: 0.45, sx: 1.4, sy: 1.4, ease: 'inOut' }], pivot: [0, -9] }, m))}</g>`)
    // In B a bee lands on his nose while he licks the honey.
    const noseBee = diff(
      bx + 52,
      by - 124,
      20,
      '',
      once(showIn([7.6, 9.4]), BEAR, bee(bx + 52, by - 124, (m) => anim({ type: 'keys', period: 0.12, keys: [{ t: 0, sy: 1 }, { t: 0.06, sy: 0.4 }], pivot: [bx + 52, by - 127] }, m))),
      'bear',
      during(7.6, 9.4),
    )
    const bear = keys('bear', bearKeys(), BEAR,
      groundShadow(bx + 4, by, 44, 6) +
        dust +
        arm(bx - 4, backArmKeys, true) +
        leg(bx - 10, legKeys, true) +
        leg(bx + 14, swingKeys([TIPTOE, RUN], 0.17, 24, true), false) +
        `<ellipse cx="${bx + 2}" cy="${by - 62}" rx="40" ry="44" fill="url(#c6-fur)" ${Ow(2)}/>` +
        `<ellipse cx="${bx + 12}" cy="${by - 56}" rx="23" ry="29" fill="#d9a86a"/>` +
        head +
        arm(bx + 14, frontArmKeys, false, honey) +
        sniff + alarm + hat + noseBee)

    // --- The swarm, the splash, ripples and bubbles. ---
    let swarmBees = ''
    for (let i = 0; i < 16; i++) {
      const a = rand() * Math.PI * 2
      const r = 8 + rand() * 30
      swarmBees += buzzing(Math.round(SWARM[0] + Math.cos(a) * r), Math.round(SWARM[1] + Math.sin(a) * r * 0.7), 0.3 + rand() * 0.25, rand())
    }
    const swarm = once(swarmKeys, SWARM, swarmBees)
    const SPLASH: [number, number] = [px + 8, WATERLINE]
    let splash = ''
    for (let i = 0; i < 12; i++) {
      const dx = Math.round((i - 5.5) * 16)
      const up = Math.round(50 + (i % 4) * 22)
      splash += once(
        [{ t: 0, x: 0, y: 0, o: 0, ease: 'step' }, { t: 14.2, o: 1, ease: 'out' }, { t: 14.5, x: dx, y: -up, ease: 'in' }, { t: 14.85, x: dx * 1.4, y: 10 }, { t: 14.9, o: 0 }],
        SPLASH,
        `<ellipse cx="${SPLASH[0]}" cy="${SPLASH[1]}" rx="4" ry="6" fill="#d8f0fb" ${Ow(1.2)}/>`,
      )
    }
    const ripples = once(showIn([14.2, 15.6], [16.9, LOOP]), SPLASH,
      [0, 0.8].map((phase) => anim({ type: 'keys', period: 1.6, phase, keys: [{ t: 0, sx: 0.8, sy: 0.8, o: 0.9 }, { t: 1.6, sx: 1.6, sy: 1.6, o: 0 }], pivot: SPLASH },
        `<ellipse cx="${SPLASH[0]}" cy="${SPLASH[1]}" rx="40" ry="9" fill="none" stroke="#fff" stroke-width="2.4"/>`)).join(''))
    const bubbles = once(showIn([15.75, 16.75]), SPLASH,
      [[-8, 0], [6, 0.25], [0, 0.5]].map(([dx, phase]) => anim({ type: 'keys', period: 0.6, phase, keys: [{ t: 0, y: 6, o: 1 }, { t: 0.6, y: -14, o: 0 }], pivot: SPLASH },
        `<circle cx="${SPLASH[0] + dx}" cy="${SPLASH[1]}" r="3.5" fill="#fff" fill-opacity="0.6" ${Ow(1)}/>`)).join(''))

    // --- Events of B: a rabbit pops out of its burrow as the bear tiptoes by, a duck swims over to the bear in the
    // pond. ---
    const RABBIT: [number, number] = [431, 848]
    const [rx, ry] = RABBIT
    const rabbit = diff(
      rx,
      ry - 32,
      34,
      '',
      `<g clip-path="url(#c6-burrow)">` +
        keys('rabbit', [{ t: 0, y: 34, o: 0, ease: 'step' }, { t: 4.2, o: 1, ease: 'out' }, { t: 4.55, y: 0 }, { t: 6.6, ease: 'in' }, { t: 6.9, y: 34 }, { t: 6.95, o: 0 }], RABBIT,
          `<ellipse cx="${rx}" cy="${ry - 14}" rx="12" ry="15" fill="#e8e1d6" ${Ow(1.6)}/>` +
            anim({ type: 'keys', period: 1.4, keys: [{ t: 0, rot: 0 }, { t: 0.2, rot: -12, ease: 'inOut' }, { t: 0.4, rot: 0 }], pivot: [rx - 2, ry - 40] },
              `<ellipse cx="${rx - 5}" cy="${ry - 52}" rx="4.5" ry="13" fill="#e8e1d6" ${Ow(1.5)}/><ellipse cx="${rx - 5}" cy="${ry - 52}" rx="2" ry="9" fill="#f7b6c2"/>`) +
            `<ellipse cx="${rx + 5}" cy="${ry - 53}" rx="4.5" ry="13" fill="#e8e1d6" ${Ow(1.5)}/><ellipse cx="${rx + 5}" cy="${ry - 53}" rx="2" ry="9" fill="#f7b6c2"/>` +
            `<circle cx="${rx + 2}" cy="${ry - 34}" r="10" fill="#e8e1d6" ${Ow(1.6)}/><circle cx="${rx + 6}" cy="${ry - 36}" r="1.8" fill="${INK}"/><circle cx="${rx + 11}" cy="${ry - 31}" r="1.8" fill="#f58aa0"/>`,
        ) +
        `</g>`,
      'rabbit',
      during(4.2, 6.9),
    )
    const burrow = `<ellipse cx="${rx}" cy="${ry + 2}" rx="22" ry="7" fill="#8a6a3e" ${Ow(1.6)}/><ellipse cx="${rx}" cy="${ry}" rx="15" ry="4.5" fill="#2e1a0c"/>`
    const DUCK: [number, number] = [1290, 806]
    const [dx0, dy0] = DUCK
    const duck = diff(
      dx0 - 1,
      dy0 - 13,
      29,
      '',
      keys('duck', [{ t: 0, x: 0, y: 0, sx: 1, o: 0, ease: 'step' }, { t: 15, o: 1, ease: 'out' }, { t: 16.3, x: -80, ease: 'inOut' }, { t: 16.5, y: 2, ease: 'inOut' }, { t: 16.7, y: 0 }, { t: 18, sx: 1, ease: 'inOut' }, { t: 18.15, sx: -1, ease: 'in' }, { t: 18.6, x: 0, o: 1 }, { t: 18.65, o: 0 }], DUCK,
        `<ellipse cx="${dx0 + 4}" cy="${dy0 - 8}" rx="17" ry="9" fill="#f4f1e8" ${Ow(1.6)}/><path d="M${dx0 + 18} ${dy0 - 12}l8-6v8z" fill="#f4f1e8" ${Ow(1.4)}/>` +
          `<path d="M${dx0} ${dy0 - 12}q8-4 14 2" fill="none" stroke="#c9c1ad" stroke-width="2"/>` +
          `<circle cx="${dx0 - 10}" cy="${dy0 - 20}" r="8" fill="#f4f1e8" ${Ow(1.6)}/><circle cx="${dx0 - 12}" cy="${dy0 - 22}" r="1.6" fill="${INK}"/>` +
          // Quack!
          anim({ type: 'keys', period: 0.5, keys: [{ t: 0, rot: 0 }, { t: 0.25, rot: -18, ease: 'inOut' }], pivot: [dx0 - 17, dy0 - 19] },
            `<path d="M${dx0 - 17} ${dy0 - 21}l-10 2l10 3z" fill="#f2a93b" ${Ow(1.2)}/>`) +
          `<path d="M${dx0 - 17} ${dy0 - 19}l-10 1l10 2z" fill="#f2a93b" ${Ow(1.2)}/>` +
          `<path d="M${dx0 - 16} ${dy0 - 4}h40" stroke="#fff" stroke-opacity="0.7" stroke-width="2"/>`),
      'duck',
      during(15, 18.7),
    )

    // --- Life around: butterflies, dragonflies over the pond. ---
    const flap = (pivot: [number, number], phase: number) => (m: string) =>
      anim({ type: 'keys', period: 0.3, phase, keys: [{ t: 0, sx: 1 }, { t: 0.15, sx: 0.3, ease: 'inOut' }], pivot }, m)
    const butterflies = (
      [[300, 760, '#ffd23f', '#f2a93b', 9], [700, 820, '#a5d8ff', '#4d96e6', 11], [980, 680, '#ffb3c7', '#e63946', 8]] as [number, number, string, string, number][]
    )
      .map(([x, y, c1, c2, period], i) =>
        anim({ type: 'path', points: [[0, 0], [60, -40], [120, 10], [60, 30]], period, phase: i * 0.3 }, butterflyAt(x, y, [c1, c2], flap([x, y], i * 0.1))))
      .join('')
    const buzzWings = (pivot: [number, number]) => (m: string) =>
      anim({ type: 'keys', period: 0.1, keys: [{ t: 0, sy: 1 }, { t: 0.05, sy: 0.5 }], pivot }, m)
    const dragonflies =
      anim({ type: 'path', points: [[0, 0], [90, -20], [160, 10], [70, 20]], period: 7 }, dragonfly(980, 730, buzzWings([980, 726]))) +
      anim({ type: 'path', points: [[0, 0], [-70, 10], [-130, -20], [-50, -30]], period: 8, phase: 0.4 }, dragonfly(1240, 700, buzzWings([1240, 696])))

    return (
      `<defs>${NATURE_DEFS}${SPRING_DEFS}` +
      `<linearGradient id="c6-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fb4e8"/><stop offset="0.6" stop-color="#bfe2f5"/><stop offset="1" stop-color="#eef7e4"/></linearGradient>` +
      `<radialGradient id="c6-glow"><stop offset="0" stop-color="#fff4cc" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffe9a8" stop-opacity="0.4"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient>` +
      `<linearGradient id="c6-far" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9cfb0"/><stop offset="1" stop-color="#c4dfc0"/></linearGradient>` +
      `<linearGradient id="c6-hill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd06a"/><stop offset="1" stop-color="#7fb64e"/></linearGradient>` +
      `<linearGradient id="c6-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fca5a"/><stop offset="0.6" stop-color="#74b346"/><stop offset="1" stop-color="#5a9636"/></linearGradient>` +
      `<linearGradient id="c6-path" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cdb07a"/><stop offset="1" stop-color="#e8d6a8"/></linearGradient>` +
      `<linearGradient id="c6-planks" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b07a44"/><stop offset="1" stop-color="#d9a066"/></linearGradient>` +
      `<linearGradient id="c6-roof" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e0634a"/><stop offset="1" stop-color="#a8382a"/></linearGradient>` +
      `<linearGradient id="c6-log" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a0683a"/><stop offset="1" stop-color="#6e4022"/></linearGradient>` +
      `<radialGradient id="c6-shell" cx="0.6" cy="0.3" r="0.8"><stop offset="0" stop-color="#9fcf6a"/><stop offset="1" stop-color="#4f8a33"/></radialGradient>` +
      `<radialGradient id="c6-water" cx="0.55" cy="0.35" r="0.75"><stop offset="0" stop-color="#bfe7f7"/><stop offset="0.6" stop-color="#7cc3e3"/><stop offset="1" stop-color="#4f9cc4"/></radialGradient>` +
      `<radialGradient id="c6-fur" cx="0.62" cy="0.3" r="0.85"><stop offset="0" stop-color="#c48a52"/><stop offset="0.55" stop-color="#9a6234"/><stop offset="1" stop-color="#6a3e20"/></radialGradient>` +
      `<radialGradient id="c6-sunlight" cx="0.87" cy="0.13" r="1"><stop offset="0" stop-color="#fff2c4" stop-opacity="0.32"/><stop offset="0.5" stop-color="#fff2c4" stop-opacity="0.07"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></radialGradient>` +
      // The bear's body below the water line, in the pond, is not drawn.
      `<clipPath id="c6-dry"><path clip-rule="evenodd" d="M0 0H${W}V${H}H0zM950 ${WATERLINE}H1300V${H}H950z"/></clipPath>` +
      `<clipPath id="c6-burrow"><rect x="${rx - 40}" y="${ry - 90}" width="80" height="90"/></clipPath></defs>` +
      sky +
      meadow +
      deer +
      pond +
      willow +
      cherries +
      fence +
      hives +
      forestEdge +
      hut +
      bench +
      flowers +
      hiveBees +
      `<g clip-path="url(#c6-dry)">${bear}</g>` +
      lilacBush(150, 822, 1.1) +
      burrow +
      rabbit +
      ripples +
      bubbles +
      splash +
      duck +
      reeds +
      swarm +
      petals +
      butterflies +
      dragonflies +
      `<rect width="${W}" height="${H}" fill="url(#c6-sunlight)"/>`
    )
  },
})
