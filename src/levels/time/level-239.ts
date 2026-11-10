// Roof terrace: a roof terrace above the city by day and in the evening, among the ten hardest of "time" (hidden until
// released, levels/upcoming.ts). A water tower with its plaque and ladder, a pigeon coop, a satellite dish, an
// antenna on a chimney, solar panels, a skylight, a tomato bed, a watering can, a parasol and a towel on a lounger.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { around, bin, bird, birds, bulbs, cat, clockFace, crate, DUSK, glow, moon, parasol, pigeon, pot, ropeCoil, shadow, sky, stars, sun, towel } from './shapes.ts'

/** Satellite dish on a short mast at (x, y), facing right (1) or left (−1). Bounds: x ±20, y from −46 to 0. */
const dish = (x: number, y: number, dir: 1 | -1) =>
  `<path d="M${x} ${y}V${y - 22}" stroke="#5c677d" stroke-width="3"/><g transform="translate(${x} ${y - 28}) scale(${dir} 1) rotate(-30)">` +
  `<path d="M-16 0a16 16 0 0 0 32 0Z" fill="#e6e6f0" stroke="#8d99ae" stroke-width="2"/><path d="M0 0V-14" stroke="#5c677d" stroke-width="2"/><circle cy="-15" r="2.5" fill="#5c677d"/></g>`

/** Canopy of `parasol(x, y, color)` (chapter 4) in another color. Bounds: x ±40, y from −68 to −52. */
const canopy = (x: number, y: number, color: string) =>
  `<path d="M${x - 40} ${y - 56}q40 -24 80 0q-10 -4 -20 0q-10 -4 -20 0q-10 -4 -20 0q-10 -4 -20 0Z" fill="${color}"/>`

export default svgLevel({
  id: 239,
  chapter: 'time',
  title: 'roofTerrace',
  pair: 'day-night',
  parTimeSec: 172,
  scene: ({ diff, time, trap, extra, anim }) => {
    const skylineGlow = glow(162, 200, 10, 12) + glow(350, 190, 10, 12) + glow(610, 210, 10, 12) + glow(450, 230, 10, 12)
    return (
      sky(time(false, true), 300) +
      // The skyline, its clock tower and the building next door
      `<path d="M140 300V180H200V220H240V160H300V300ZM330 300V170H390V300ZM420 300V210H500V300ZM600 300V190H660V240H700V300Z" fill="#9aa8c0"/>` +
      `<rect x="520" y="100" width="80" height="200" fill="#8d99b5"/><path d="M514 102L560 62L606 102Z" fill="#6b7896"/>` +
      `<rect x="740" y="120" width="60" height="180" fill="#c9b79c"/><rect x="756" y="140" width="28" height="22" fill="#5c677d"/><rect x="756" y="210" width="28" height="22" fill="#5c677d"/>` +
      // The roof: parapet and floor
      `<rect y="300" width="800" height="200" fill="#a8a29e"/><rect y="296" width="800" height="14" fill="#8d8680"/>` +
      // The water tower: plaque, ladder
      `<path d="M60 300L66 170M120 300L114 170M64 240H116" stroke="#6b4f3a" stroke-width="5"/><rect x="50" y="100" width="80" height="70" rx="6" fill="#a0703f"/><path d="M50 116H130M50 154H130" stroke="#5c677d" stroke-width="3"/>` +
      `<path d="M46 102L90 78L134 102Z" fill="#6b4f3a"/>` +
      diff(...around(76, 128, 104, 146), `<rect x="76" y="128" width="28" height="18" rx="2" fill="#e63946"/>`, `<rect x="76" y="128" width="28" height="18" rx="2" fill="#3a86ff"/>`) +
      diff(...around(122, 170, 136, 230), `<path d="M124 170V230M134 170V230M124 182H134M124 194H134M124 206H134M124 218H134" stroke="#5c677d" stroke-width="2"/>`, '') +
      // The pigeon coop: its door, a pigeon on its roof
      `<rect x="210" y="300" width="100" height="60" fill="#c68b4e"/><path d="M204 302L316 288V300L204 312Z" fill="#7a4e2d"/><path d="M220 314H244V350H220ZM276 314H300V350H276Z" fill="#8a5a33"/>` +
      diff(...around(248, 316, 272, 356), `<rect x="248" y="316" width="24" height="40" fill="#2a9d8f"/>`, `<rect x="248" y="316" width="24" height="40" fill="#e63946"/>`) +
      diff(...around(288, 276, 312, 290), pigeon(300, 290), '') +
      // The satellite dish, the antenna on the chimney, the solar panel
      diff(...around(410, 250, 450, 296), dish(430, 296, 1), dish(430, 296, -1)) +
      `<rect x="504" y="230" width="32" height="70" fill="#9c4a3a"/><rect x="500" y="226" width="40" height="8" fill="#7a3b2a"/>` +
      diff(...around(510, 178, 530, 230), `<path d="M520 226V180M510 192H530M512 204H528" stroke="#3d4a55" stroke-width="2"/>`, '') +
      `<path d="M600 330L606 300H664L660 330Z" fill="#5c677d"/><rect x="606" y="306" width="12" height="18" fill="#1d3557"/>` +
      diff(...around(624, 306, 652, 324), `<rect x="624" y="306" width="28" height="18" fill="#1d3557"/><path d="M638 306v18M624 315h28" stroke="#8ecae6" stroke-width="1"/>`, `<rect x="624" y="306" width="28" height="18" fill="#e9c46a"/><path d="M638 306v18M624 315h28" stroke="#8ecae6" stroke-width="1"/>`) +
      // The skylight, the tomato bed, the watering can
      diff(...around(360, 410, 400, 432), `<path d="M360 432V420Q380 404 400 420V432Z" fill="#bde3f2" stroke="#8d99ae" stroke-width="2"/>`, '') +
      `<rect x="140" y="436" width="84" height="18" fill="#7a4e2d"/><path d="M156 436V420M180 436V418M204 436V420" stroke="#3f9a5a" stroke-width="3"/>` +
      diff(...around(152, 412, 212, 434), `<circle cx="156" cy="420" r="5" fill="#e63946"/><circle cx="180" cy="418" r="5" fill="#e63946"/><circle cx="204" cy="420" r="5" fill="#e63946"/>`, `<circle cx="156" cy="420" r="5" fill="#ffd23f"/><circle cx="180" cy="418" r="5" fill="#ffd23f"/><circle cx="204" cy="420" r="5" fill="#ffd23f"/>`) +
      diff(...around(234, 458, 268, 478), `<path d="M238 478V462H258V478Z" fill="#3fa46f"/><path d="M258 466L268 458" stroke="#3fa46f" stroke-width="3"/><path d="M238 464q-6 6 0 12" stroke="#3fa46f" stroke-width="2" fill="none"/>`, '') +
      // The parasol's canopy, the towel on the lounger
      parasol(680, 460, '#ffd23f') +
      diff(...around(640, 386, 720, 406), canopy(680, 460, '#ffd23f'), canopy(680, 460, '#2a9d8f')) +
      `<path d="M690 476L700 452H760L770 476" stroke="#8d99ae" stroke-width="3" fill="none"/>` +
      diff(...around(690, 450, 750, 474), towel(720, 462, '#ff6b8b'), towel(720, 462, '#3a86ff')) +
      // Decor: the same at both moments, darkened by the evening with the rest
      pot(330, 482) +
      pot(560, 482, '#3a86ff') +
      pot(470, 482, '#e07a5f', '#8ac926') +
      pigeon(180, 296) +
      pigeon(580, 296, true) +
      cat(40, 482, '#5c677d') +
      bin(784, 440) +
      crate(330, 332, 24) +
      crate(110, 482, 22) +
      ropeCoil(420, 482) +
      bird(60, 96) +
      bird(760, 118, '#e63946') +
      // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 230, 190],
      ]) +
      time('', DUSK) +
      time('', skylineGlow + glow(756, 140, 28, 22)) +
      trap(770, 221, 24, '', glow(756, 210, 28, 22), 'lights') +
      trap(500, 368, 66, bulbs(440, 360, 560, 360, 5, false), bulbs(440, 360, 560, 360, 5, true), 'lights') +
      trap(560, 132, 20, clockFace(560, 132, 16, 3, 0), clockFace(560, 132, 16, 8, 30), 'clock') +
      trap(85, 320, 47, shadow(120, 320, 80), '', 'shadow') +
      trap(440, 120, 35, birds(440, 120), '', 'birds') +
      trap(680, 60, 42, '', stars(680, 60), 'stars') +
      trap(300, 70, 54, sun(300, 70), moon(300, 70), 'moon')
    )
  },
})
