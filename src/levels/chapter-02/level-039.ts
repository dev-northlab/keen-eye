// Motion differences: the skater rides the ramp faster on picture B; the bird on the wire hops only on B.
import { svgLevel } from '../helpers.ts'
import { bench, cityTree, cloud, cone, dog, person, skyline, sun } from './shapes.ts'

/** Skateboarder, faces right; (x, y) = board level. The helmet is separate. Bounds: x ±16, y from −66 to 0. */
const skater = (x: number, y: number, shirt: string) =>
  person(x, y - 6, shirt) + `<rect x="${x - 16}" y="${y - 6}" width="32" height="4" rx="2" fill="#333"/><circle cx="${x - 9}" cy="${y - 1}" r="3" fill="#e63946"/><circle cx="${x + 9}" cy="${y - 1}" r="3" fill="#e63946"/>`
/** Helmet on a skater at (x, y) = board level. Bounds: x ±10, y from −72 to −60. */
const helmet = (x: number, y: number, color: string) => `<path d="M${x - 10} ${y - 62}q10 -14 20 0Z" fill="${color}"/><rect x="${x - 11}" y="${y - 63}" width="22" height="3" fill="${color}"/>`

/** Graffiti blob on the wall; (x, y) = center. Bounds: x ±30, y ±18. */
const graffiti = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><ellipse rx="28" ry="16" fill="${color}"/><ellipse cx="-10" cy="-6" rx="10" ry="6" fill="#fff" fill-opacity="0.4"/>` +
  `<path d="M-16 4h32" stroke="#2b2b2b" stroke-width="4" stroke-linecap="round"/></g>`

/** Grind rail; (x, y) = left foot. Bounds: x from −2 to +62, y from −20 to 0. */
const rail = (x: number, y: number) =>
  `<rect x="${x}" y="${y - 20}" width="60" height="5" rx="2" fill="#8d99ae"/><rect x="${x + 4}" y="${y - 16}" width="4" height="16" fill="#5c677d"/><rect x="${x + 52}" y="${y - 16}" width="4" height="16" fill="#5c677d"/>`

/** Small bird; (x, y) = feet. Bounds: x ±10, y from −14 to 0. */
const bird = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-6" rx="8" ry="5" fill="#2b2b3a"/><circle cx="6" cy="-10" r="4" fill="#2b2b3a"/>` +
  `<path d="M9 -10l4 1l-4 2Z" fill="#f4a261"/><path d="M-8 -6l-3 -4" stroke="#2b2b3a" stroke-width="2.5"/></g>`

export default svgLevel({
  id: 39,
  chapter: 'city',
  title: 'skatepark',
  parTimeSec: 110,
  scene: ({ diff, anim, rand }) => {
    const riding = (period: number) =>
      anim({ id: 'skater', type: 'path', points: [[0, 0], [60, -30], [120, 0]], flipX: 300, period }, skater(300, 440, '#e63946'))
    const perched = bird(500, 150)

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(700, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(200, 60, 0.8)) +
      skyline(rand, 240) +
      `<path d="M120 150Q500 180 760 140" stroke="#3d4a55" stroke-width="2" fill="none"/>` +
      `<rect x="116" y="130" width="6" height="190" fill="#3d4a55"/><rect x="756" y="120" width="6" height="200" fill="#3d4a55"/>` +
      diff(500, 143, 18, perched, anim({ id: 'bird', type: 'bob', dx: 0, dy: 4, period: 0.7 }, perched), 'bird') +
      // Wall with graffiti
      `<rect y="200" width="800" height="120" fill="#c9b79c"/><rect y="196" width="800" height="6" fill="#a89985"/>` +
      diff(200, 260, 36, graffiti(200, 260, '#ff006e'), graffiti(200, 260, '#3a86ff')) +
      graffiti(400, 250, '#8ac926') +
      graffiti(620, 262, '#ffb703') +
      cityTree(60, 320, 1.1) +
      cityTree(740, 320, 1) +
      // Concrete park
      `<rect y="320" width="800" height="180" fill="#cfd5da"/>` +
      `<path d="M160 440q70 -90 140 0v60h-140Z" fill="#8d99ae"/><path d="M160 440q70 -90 140 0" stroke="#5c677d" stroke-width="4" fill="none"/>` +
      `<path d="M460 440q70 -90 140 0v60h-140Z" fill="#8d99ae"/><path d="M460 440q70 -90 140 0" stroke="#5c677d" stroke-width="4" stroke-linecap="round" fill="none"/>` +
      diff(300, 407, 38, riding(5), riding(2.5), 'skater') +
      skater(600, 470, '#8338ec') +
      diff(600, 404, 18, helmet(600, 470, '#3a86ff'), helmet(600, 470, '#ffb703')) +
      diff(501, 460, 34, rail(470, 470), '') +
      diff(700, 452, 32, bench(700, 466, '#a0703f'), bench(700, 466, '#3a86ff')) +
      person(640, 466, '#ffb703', true) +
      dog(80, 470, '#2b2b3a', true) +
      cone(120, 490) +
      diff(150, 478, 18, cone(150, 490), '')
    )
  },
})
