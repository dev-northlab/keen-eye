// Alien beach: a pink shore of a purple sea under two suns among the space world's ten hardest (hidden until
// released, levels/upcoming.ts). New in space: a tentacled sea creature, an alien surfing a hoverboard, a swimmer
// in a ring, a spiral shell hut with an antenna, a three-eyed crab, a rocket sand sculpture, a mushroom parasol
// with a sunbather and a glowing tide pool fish. Motion differences: the tentacle waves and the tide pool fish
// darts only on picture A; the hut's antenna light flashes only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { alien } from './shapes.ts'

/** Three-eyed crab without its middle eye; (x, y) = bottom center. Bounds: x ±26, y from −30 to 0. */
const crab = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-14 -4l-8 4M-10 -2l-6 2M14 -4l8 4M10 -2l6 2" stroke="#e76f51" stroke-width="3"/>` +
  `<ellipse cy="-10" rx="16" ry="10" fill="#e76f51"/><circle cx="-22" cy="-16" r="5" fill="#e76f51"/><circle cx="22" cy="-16" r="5" fill="#e76f51"/>` +
  `<path d="M-8 -18v-10M8 -18v-10" stroke="#e76f51" stroke-width="2"/><circle cx="-8" cy="-28" r="3.5" fill="#fff"/><circle cx="8" cy="-28" r="3.5" fill="#fff"/>` +
  `<circle cx="-8" cy="-28" r="1.5" fill="#222"/><circle cx="8" cy="-28" r="1.5" fill="#222"/></g>`

export default svgLevel({
  id: 194,
  chapter: 'space',
  title: 'alienBeach',
  parTimeSec: 102,
  scene: ({ diff, anim, extra }) => {
    const tentacle = `<path d="M392 314Q404 290 396 274Q390 262 404 256" stroke="#2a9d8f" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="398" cy="290" r="2" fill="#7bdff2"/><circle cx="396" cy="276" r="2" fill="#7bdff2"/>`
    const light = `<circle cx="110" cy="292" r="5" fill="#3ae0ff"/><circle cx="110" cy="292" r="10" fill="#3ae0ff" fill-opacity="0.35"/>`
    const glowFish = `<ellipse cx="740" cy="446" rx="7" ry="4" fill="#ccff33"/><path d="M733 446l-5 -4v8Z" fill="#ccff33"/>`
    return (
      `<rect width="800" height="500" fill="#ffb4a2"/><rect width="800" height="120" fill="#ff8fa3" fill-opacity="0.5"/>` +
      `<circle cx="150" cy="96" r="54" fill="#ffd6a5" fill-opacity="0.5"/><circle cx="150" cy="96" r="40" fill="#ff7b00"/>` +
      diff(230, 60, 22, `<circle cx="230" cy="60" r="14" fill="#ffffff"/>`, `<circle cx="230" cy="60" r="14" fill="#7bdff2"/>`) +
      // The purple sea: the tentacled creature, the hoverboard surfer, the swimmer's ring
      `<rect y="220" width="800" height="116" fill="#7b2cbf"/>` +
      anim({ type: 'path', points: [[0, 0], [28, 0]], period: 6 }, `<path d="M40 240q10 -6 20 0t20 0M480 236q10 -6 20 0t20 0M220 300q10 -6 20 0t20 0M620 250q10 -6 20 0t20 0" stroke="#c77dff" stroke-width="3" fill="none"/>`) +
      `<path d="M300 312Q272 296 280 280Q286 272 294 278" stroke="#2a9d8f" stroke-width="8" fill="none" stroke-linecap="round"/>` +
      diff(398, 284, 36, anim({ type: 'sway', angle: 8, pivot: [392, 314], period: 1.6 }, tentacle), tentacle) +
      `<path d="M296 314a34 30 0 0 1 68 0Z" fill="#2a9d8f"/><circle cx="312" cy="306" r="3" fill="#7bdff2"/><circle cx="350" cy="304" r="3" fill="#7bdff2"/>` +
      `<circle cx="318" cy="296" r="5" fill="#fff"/><circle cx="342" cy="296" r="5" fill="#fff"/><circle cx="318" cy="296" r="2.2" fill="#222"/><circle cx="342" cy="296" r="2.2" fill="#222"/>` +
      diff(330, 284, 22, `<circle cx="330" cy="284" r="4" fill="#fff"/><circle cx="330" cy="284" r="1.8" fill="#222"/>`, '') +
      `<ellipse cx="330" cy="316" rx="44" ry="5" fill="#c77dff"/><ellipse cx="560" cy="290" rx="30" ry="6" fill="#ffffff" fill-opacity="0.35"/>` +
      alien(560, 270, '#ff6bd6', 2) +
      diff(560, 272, 24, `<ellipse cx="560" cy="272" rx="22" ry="4" fill="#ffd23f"/>`, `<ellipse cx="560" cy="272" rx="22" ry="4" fill="#3ae0ff"/>`) +
      `<circle cx="680" cy="300" r="9" fill="#8ac926"/><circle cx="680" cy="298" r="3" fill="#fff"/><circle cx="680" cy="298" r="1.4" fill="#222"/>` +
      diff(680, 307, 22, `<ellipse cx="680" cy="308" rx="17" ry="6" fill="none" stroke="#ff006e" stroke-width="6"/>`, `<ellipse cx="680" cy="308" rx="17" ry="6" fill="none" stroke="#ffd23f" stroke-width="6"/>`) +
      // The pink sand
      `<path d="M0 330Q400 318 800 334V500H0Z" fill="#ffd6a5"/><path d="M0 334Q400 322 800 338" stroke="#ffe8cc" stroke-width="5" fill="none"/>` +
      // Shell hut: its window, the antenna light
      `<path d="M30 412Q22 330 96 322Q156 330 150 412Z" fill="#f4a6a6"/><path d="M90 400q-34 -6 -30 -40q8 -26 40 -24q24 6 22 30q-4 18 -22 16q-14 -4 -10 -16" stroke="#e07a8a" stroke-width="4" fill="none"/>` +
      `<path d="M80 412V390a12 12 0 0 1 24 0V412Z" fill="#7a3b2a"/><path d="M110 322V298" stroke="#8d99ae" stroke-width="2"/>` +
      diff(66, 356, 22, `<circle cx="66" cy="356" r="8" fill="#7bdff2" stroke="#e07a8a" stroke-width="3"/>`, '') +
      diff(110, 292, 22, light, anim({ type: 'blink', duty: 0.5, period: 1.4 }, light)) +
      // Three-eyed crab, the rocket sand sculpture
      crab(260, 458) + diff(260, 428, 22, `<path d="M260 448V424" stroke="#e76f51" stroke-width="2"/><circle cx="260" cy="422" r="4" fill="#fff"/><circle cx="260" cy="422" r="1.7" fill="#222"/>`, '') +
      `<path d="M418 472V432Q430 402 442 432V472Z" fill="#e9b872"/><path d="M418 450L404 472H418Z" fill="#e9b872"/><circle cx="430" cy="436" r="5" fill="#d9a35e"/>` +
      diff(448, 461, 22, `<path d="M442 450L456 472H442Z" fill="#e9b872"/>`, '') +
      // Mushroom parasol, the sunbather's drink
      `<path d="M600 470V384" stroke="#f1f1f1" stroke-width="6"/><path d="M552 388Q600 336 648 388Z" fill="#ff6bd6"/><circle cx="584" cy="372" r="5" fill="#fff" fill-opacity="0.7"/><circle cx="616" cy="368" r="4" fill="#fff" fill-opacity="0.7"/>` +
      `<rect x="556" y="462" width="80" height="12" rx="2" fill="#3a86ff"/><ellipse cx="590" cy="458" rx="22" ry="7" fill="#8ac926"/><circle cx="616" cy="454" r="8" fill="#8ac926"/><circle cx="618" cy="452" r="2" fill="#222"/>` +
      diff(646, 452, 22, `<path d="M640 446H652L650 462H642Z" fill="#7bdff2"/><path d="M648 446L654 436" stroke="#ff006e" stroke-width="1.5"/>`, '') +
      // Tide pool and its glowing fish
      `<ellipse cx="740" cy="446" rx="40" ry="14" fill="#7bdff2"/><ellipse cx="740" cy="446" rx="40" ry="14" fill="none" stroke="#e9b872" stroke-width="4"/>` +
      diff(740, 446, 22, anim({ type: 'bob', dx: 8, dy: 0, period: 1.6 }, glowFish), glowFish) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['planet', 560, 110, '#7bdff2'],
        ['sparkle', 360, 60],
        ['alienPlant', 196, 484],
        ['crystal', 520, 482],
        ['moonPebbles', 330, 384],
      ])
    )
  },
})
