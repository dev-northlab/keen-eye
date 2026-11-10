// Motion differences: the kite flies faster on picture B; the fountain jet bobs slower on B.
import { bird, butterfly } from '../chapter-03/shapes.ts'
import { duck, flower, FLOWER_COLORS } from '../shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { ball, bench, bin, cityTree, cloud, coffeeCup, dog, grass, lampHead, lampPost, person, pick, scooter, sun } from './shapes.ts'
import { level023Redesign } from './level-023-redesign.ts'

/** Kite with a tail; (x, y) = kite center. Bounds: x ±20, y from −24 to +44. */
const kite = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><path d="M0 -24L18 0L0 24L-18 0Z" fill="${color}"/><path d="M0 -24v48M-18 0h36" stroke="#fff" stroke-opacity="0.5" stroke-width="2"/>` +
  `<path d="M0 24q-8 10 0 20" stroke="#555" stroke-width="2" fill="none"/>` +
  `<path d="M-6 30l6 4l-6 4ZM-4 40l6 2l-6 4Z" fill="${color}"/></g>`

/** Fountain basin; (x, y) = ground center. Bounds: x ±60, y from −30 to 0. The jet is separate. */
const basin = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse rx="60" ry="14" fill="#8d99ae"/><ellipse cy="-4" rx="52" ry="10" fill="#63b8e3"/>` +
  `<rect x="-6" y="-30" width="12" height="26" fill="#8d99ae"/></g>`

/** Water jet over the fountain at (x, y) = ground center. Bounds: x ±14, y from −72 to −30. */
const jet = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M0 -32q-14 -20 -10 -38q10 6 10 20q0 -14 10 -20q4 18 -10 38Z" fill="#9fd8f0"/>` +
  `<circle cy="-66" r="6" fill="#bde3f2"/></g>`

/** Ice cream cart; (x, y) = ground center. The parasol is separate. Bounds: x ±30, y from −40 to 0. */
const cart = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-28" y="-40" width="56" height="30" rx="4" fill="#ffffff"/>` +
  `<rect x="-28" y="-40" width="56" height="10" rx="4" fill="#ff6b8b"/><circle cx="-16" cy="-4" r="7" fill="#333"/><circle cx="16" cy="-4" r="7" fill="#333"/>` +
  `<rect x="-2" y="-78" width="4" height="40" fill="#3d4a55"/></g>`
/** Cart parasol; (x, y) = cart ground center. Bounds: x ±36, y from −96 to −76. */
const cartParasol = (x: number, y: number) =>
  `<path d="M${x - 36} ${y - 78}q36 -22 72 0q-9 -4 -18 0q-9 -4 -18 0q-9 -4 -18 0q-9 -4 -18 0Z" fill="#ff6b8b"/>`

export default svgLevel({
  id: 23,
  chapter: 'city',
  title: 'park',
  parTimeSec: 110,
  redesign: level023Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let tufts = ''
    for (let i = 0; i < 16; i++) tufts += grass(10 + rand() * 780, 300 + rand() * 190)
    let flowers = ''
    for (let i = 0; i < 10; i++) flowers += flower(20 + rand() * 300, 440 + rand() * 50, pick(rand, FLOWER_COLORS))
    const flying = (period: number) =>
      anim({ id: 'kite', type: 'path', points: [[0, 0], [40, -20], [80, 0]], period }, kite(600, 110, '#e63946'))
    const splashing = (period: number) => anim({ id: 'jet', type: 'bob', dx: 0, dy: 5, period }, jet(400, 400))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(120, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 28 }, cloud(380, 60, 0.7)) +
      `<path d="M0 240Q200 190 400 230T800 220V500H0Z" fill="#a6d985"/>` +
      `<rect y="280" width="800" height="220" fill="#8fca68"/>` +
      // Far trees
      cityTree(60, 250, 1.2) +
      cityTree(140, 240, 0.9, '#3f9a5a') +
      diff(260, 178, 34, cityTree(260, 240, 1.4), cityTree(260, 240, 1.4, '#e9a23b')) +
      cityTree(700, 240, 1.3) +
      cityTree(770, 255, 1) +
      diff(600, 110, 46, flying(10), flying(5), 'kite') +
      `<path d="M600 154L520 320" stroke="#777" stroke-width="1.5"/>` +
      // Pond
      `<ellipse cx="140" cy="370" rx="120" ry="40" fill="#63b8e3"/>` +
      `<ellipse cx="140" cy="370" rx="110" ry="32" fill="#7cc7ee"/>` +
      duck(110, 366) +
      diff(176, 360, 36, '', duck(172, 366)) +
      // Path with the fountain
      `<path d="M300 500Q320 400 400 380Q480 400 500 500Z" fill="#e9d8b6"/>` +
      diff(400, 350, 24, splashing(1.1), splashing(2.4), 'jet') +
      basin(400, 400) +
      diff(300, 436, 32, bench(300, 450, '#a0703f'), bench(300, 450, '#3a86ff')) +
      bench(520, 440) +
      bin(560, 450) +
      lampPost(640, 420) +
      lampHead(640, 420) +
      person(520, 320, '#ffb703') +
      diff(690, 440, 26, dog(690, 452, '#c48a5a'), dog(690, 452, '#c48a5a', true)) +
      cart(620, 480) +
      diff(620, 394, 38, cartParasol(620, 480), '') +
      person(670, 480, '#8338ec', true) +
      tufts +
      flowers +
      ball(455, 305) +
      scooter(455, 478) +
      bird(530, 410) +
      butterfly(330, 290) +
      coffeeCup(505, 424) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['balloon', 369, 164, '#3a86ff'],
        ['birds', 262, 62],
        ['cloud', 499, 166],
        ['bee', 556, 307],
        ['flower', 325, 373, '#ff6b8b'],
        ['stones', 749, 306],
        ['snail', 182, 245],
        ['flower', 190, 479, '#4dabf7'],
        ['ladybug', 515, 448],
        ['mushroom', 50, 330],
      ])
    )
  },
})
