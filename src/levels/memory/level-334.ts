// Attic: old things under a sloping roof among the ten hardest of "memory" (hidden until released, levels/upcoming.ts).
// A hanging bulb, a round window, an old trunk, an armchair with a teddy, an umbrella, a rocking horse, boxes and a suitcase.
import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
import { around, big, books, cube, glassJar, painting, sled, suitcase, teddy } from './shapes.ts'

/** Rocking horse facing right, without its mane; (x, y) = floor under the middle. Bounds: x ±60, y from −100 to 0. */
const rockingHorse = (x: number, y: number) =>
  `<path d="M${x - 60} ${y - 14}Q${x} ${y + 10} ${x + 60} ${y - 14}" stroke="#8a5a33" stroke-width="7" fill="none"/>` +
  `<path d="M${x - 34} ${y - 8}L${x - 26} ${y - 46}M${x + 30} ${y - 8}L${x + 24} ${y - 46}" stroke="#e9c46a" stroke-width="8"/>` +
  `<ellipse cx="${x - 2}" cy="${y - 52}" rx="40" ry="16" fill="#e9c46a"/><path d="M${x + 26} ${y - 60}L${x + 40} ${y - 92}L${x + 58} ${y - 84}L${x + 50} ${y - 70}L${x + 36} ${y - 56}Z" fill="#e9c46a"/>` +
  `<circle cx="${x + 46}" cy="${y - 84}" r="2" fill="#222"/><path d="M${x - 42} ${y - 54}q-14 4 -14 20" stroke="#8a5a33" stroke-width="5" fill="none"/><rect x="${x - 10}" y="${y - 68}" width="22" height="8" rx="3" fill="#e63946"/>`

/** Closed umbrella leaning on the wall; (x, y) = tip on the floor. Bounds: x from −2 to +22, y from −80 to 0. */
const umbrella = (x: number, y: number) =>
  `<path d="M${x} ${y}L${x + 14} ${y - 70}" stroke="#5c677d" stroke-width="2"/><path d="M${x + 2} ${y - 10}L${x + 8} ${y - 66}L${x + 20} ${y - 62}Z" fill="#3a86ff"/>` +
  `<path d="M${x + 14} ${y - 70}q2 -8 8 -6" stroke="#5c677d" stroke-width="3" fill="none"/>`

export default memoryLevel({
  id: 334,
  title: 'memoryAttic',
  showSeconds: 5,
  scene: ({ diff, extra, anim }) =>
    `<rect width="500" height="750" fill="#a07c55"/><path d="M0 60L250 0M0 140L250 20M500 60L250 0M500 140L250 20" stroke="#8a6a44" stroke-width="6"/>` +
    `<path d="M0 250L250 40L500 250V560H0Z" fill="#e9d8c4"/><rect y="560" width="500" height="190" fill="#8a6a44"/><path d="M0 600H500M0 650H500M0 700H500" stroke="#7a5a3a" stroke-width="2"/>` +
    `<path d="M0 250L250 40L500 250" stroke="#6b4f3a" stroke-width="10" fill="none"/>` +
    `<circle cx="250" cy="180" r="42" fill="#bde3f2" stroke="#6b4f3a" stroke-width="8"/><path d="M208 180H292M250 138V222" stroke="#6b4f3a" stroke-width="5"/>` +
    `<path d="M70 200l30 40M60 230l50 0M80 210q10 14 0 26" stroke="#ffffff" stroke-opacity="0.6" stroke-width="1.5" fill="none"/>` +
    // The hanging bulb: lit or dark
    `<path d="M250 40V266" stroke="#3d3d3d" stroke-width="2"/><rect x="244" y="262" width="12" height="10" fill="#5c677d"/>` +
    diff(...around(224, 258, 276, 310, 30), `<circle cx="250" cy="284" r="26" fill="#fff3b0" fill-opacity="0.5"/><circle cx="250" cy="284" r="12" fill="#ffd23f"/>`, `<circle cx="250" cy="284" r="12" fill="#d8dee4"/>`) +
    // The mirror, the sled on the wall
    `<ellipse cx="80" cy="330" rx="30" ry="44" fill="#bde3f2" stroke="#c9953f" stroke-width="7"/>` + sled(400, 320, '#e63946') +
    // The armchair and its teddy, the umbrella moved
    `<rect x="40" y="430" width="120" height="60" rx="14" fill="#8338ec"/><rect x="40" y="480" width="120" height="30" rx="8" fill="#6a2bc4"/><path d="M50 510V540M150 510V540" stroke="#4a3426" stroke-width="6"/>` +
    diff(...around(78, 415, 122, 470, 30), big(100, 470, 0.6, teddy(0, 0)), '') +
    diff(...around(192, 480, 252, 560, 30), umbrella(200, 560), umbrella(232, 560)) +
    // The trunk's lock, the rocking horse's mane
    `<rect x="30" y="560" width="140" height="80" rx="8" fill="#7a4e2d"/><path d="M30 584H170M60 560V640M140 560V640" stroke="#c9953f" stroke-width="5"/>` +
    diff(...around(90, 584, 110, 602, 30), `<rect x="90" y="584" width="20" height="18" rx="3" fill="#c9953f"/><circle cx="100" cy="593" r="3" fill="#3d3d3d"/>`, `<rect x="90" y="584" width="20" height="18" rx="3" fill="#adb5bd"/><circle cx="100" cy="593" r="3" fill="#3d3d3d"/>`) +
    rockingHorse(380, 660) +
    diff(...around(404, 560, 436, 592, 30), `<path d="M416 572q-8 6 -10 18M422 566q-6 8 -6 20M430 562q-6 8 -4 20" stroke="#8a5a33" stroke-width="5" fill="none"/>`, `<path d="M416 572q-8 6 -10 18M422 566q-6 8 -6 20M430 562q-6 8 -4 20" stroke="#2b2b2b" stroke-width="5" fill="none"/>`) +
    // The stack of boxes, the suitcase
    `<rect x="400" y="480" width="80" height="40" fill="#c68b4e" stroke="#8a5a33" stroke-width="2"/><rect x="404" y="440" width="72" height="40" fill="#d9a066" stroke="#8a5a33" stroke-width="2"/>` +
    diff(...around(408, 400, 472, 440, 30), `<rect x="408" y="400" width="64" height="40" fill="#c68b4e" stroke="#8a5a33" stroke-width="2"/><path d="M408 420h64" stroke="#e9c46a" stroke-width="4"/>`, '') +
    diff(...around(275, 639, 325, 720, 30), big(300, 720, 1.4, suitcase(0, 0, '#3fa46f')), big(300, 720, 1.4, suitcase(0, 0, '#e63946'))) +
    // Decor: small things that fill the attic, the same in both pictures
    painting(330, 500, 50, 40, '#c9953f') +
    big(180, 724, 1, books(0, 0, ['#3a86ff', '#e07a5f'])) +
    cube(40, 724, 24, '#ffd23f') +
    glassJar(480, 700, '#e63946', '#ff9f43') +
    `<ellipse cx="250" cy="560" rx="70" ry="6" fill="#000000" fill-opacity="0.08"/>` +
    // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
    extras({ extra, anim }, [
      ['cube', 380, 740, '#3a86ff'],
      ['sticker', 60, 250, '#ffd23f'],
      ['frame', 190, 400, '#e63946'],
      ['slippers', 60, 700, '#ff6b8b'],
    ]),
})
