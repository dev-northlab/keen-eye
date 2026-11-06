// Roadside diner: a chrome diner by a desert road, by day and in the evening, among the ten hardest of "time"
// (hidden until released, levels/upcoming.ts). A billboard, the diner with its roof sign, a customer, curtains and a
// door, a waitress on roller skates, a gas pump, a water tower, a parked car, a motorcycle, a bin and a road sign; a
// neon star lights up at night.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { around, bench, bin, bird, birds, car, cloud, cone, crate, barrel, dog, door, DUSK, glow, hydrant, lampHead, lampPost, moon, person, pigeon, roadSign, rock, shadow, sky, stars, sun } from './shapes.ts'

/** Neon star on the pole sign, dark by day or lit. Bounds: radius 38 around (600, 150). */
const neon = (lit: boolean) =>
  (lit ? `<circle cx="600" cy="150" r="36" fill="#ff6bd6" fill-opacity="0.3"/>` : '') +
  `<path d="M600 124L607 142H626L611 154L617 174L600 162L583 174L589 154L574 142H593Z" fill="${lit ? '#ff6bd6' : '#c9b4c9'}" stroke="#5c677d" stroke-width="2"/>`

export default svgLevel({
  id: 237,
  chapter: 'time',
  title: 'roadsideDiner',
  pair: 'day-night',
  parTimeSec: 168,
  scene: ({ diff, time, trap, extra, anim }) => {
    const burger = (bun: string) =>
      `<path d="M100 156a20 14 0 0 1 40 0Z" fill="${bun}"/><rect x="100" y="157" width="40" height="6" fill="#6b3a2a"/><rect x="98" y="164" width="44" height="4" fill="#8ac926"/><path d="M100 170h40a4 4 0 0 1 -4 8h-32a4 4 0 0 1 -4 -8Z" fill="${bun}"/>`
    return (
      sky(time(false, true), 300) +
      `<path d="M0 300V262L90 250V236H210V256L470 262V244H560L580 266L800 270V300Z" fill="#c97b3a"/><rect y="300" width="800" height="200" fill="#d9c08f"/>` +
      `<rect y="430" width="800" height="60" fill="#5c677d"/><path d="M0 460H800" stroke="#ffd23f" stroke-width="4" stroke-dasharray="30 22"/>` +
      // The billboard's burger
      `<path d="M60 300V200M180 300V200" stroke="#6b4f3a" stroke-width="6"/><rect x="40" y="120" width="160" height="80" fill="#f4f1e8" stroke="#3d4a55" stroke-width="3"/>` +
      diff(...around(98, 140, 142, 180), burger('#e9a23b'), burger('#c0392b')) +
      // The water tower and its band
      `<path d="M680 300L684 150M720 300L716 150M682 220H718M682 260H718" stroke="#8d99ae" stroke-width="4"/><rect x="670" y="100" width="60" height="50" rx="10" fill="#adb5bd"/>` +
      diff(...around(676, 106, 724, 116), `<rect x="676" y="106" width="48" height="10" fill="#e63946"/>`, `<rect x="676" y="106" width="48" height="10" fill="#3a86ff"/>`) +
      // The diner: roof sign, a customer, the curtains, the door
      `<rect x="220" y="200" width="340" height="120" rx="30" fill="#e6e6f0"/><rect x="220" y="290" width="340" height="10" fill="#e63946"/><path d="M380 200V196M400 200V196" stroke="#5c677d" stroke-width="3"/>` +
      `<rect x="340" y="170" width="100" height="26" rx="4" fill="#2b2d42"/>` +
      diff(...around(352, 178, 428, 188), `<rect x="352" y="178" width="76" height="10" rx="3" fill="#ffd23f"/>`, `<rect x="352" y="178" width="76" height="10" rx="3" fill="#3ae0ff"/>`) +
      `<rect x="270" y="240" width="60" height="34" rx="4" fill="#bde3f2"/><rect x="360" y="240" width="40" height="34" rx="4" fill="#bde3f2"/><rect x="430" y="240" width="60" height="34" rx="4" fill="#bde3f2"/>` +
      diff(...around(288, 249, 312, 274), `<circle cx="300" cy="256" r="7" fill="#5a3d2b"/><path d="M288 274q12 -18 24 0Z" fill="#3a86ff"/>`, '') +
      diff(...around(430, 240, 490, 274), `<path d="M430 240h14l-14 34ZM490 240h-14l14 34Z" fill="#e63946"/>`, `<path d="M430 240h14l-14 34ZM490 240h-14l14 34Z" fill="#8ac926"/>`) +
      diff(...around(504, 274, 536, 320), door(520, 320, '#e63946'), door(520, 320, '#2a9d8f')) +
      // The neon pole sign
      `<path d="M600 300V176" stroke="#5c677d" stroke-width="5"/>` +
      // Gas pump, waitress's apron, the motorcycle's helmet, the car's roof box, the bin, the road sign
      diff(...around(104, 300, 136, 350), `<rect x="104" y="300" width="32" height="50" rx="4" fill="#e63946"/><rect x="110" y="308" width="20" height="12" fill="#f4f1e8"/>`, `<rect x="104" y="300" width="32" height="50" rx="4" fill="#2a9d8f"/><rect x="110" y="308" width="20" height="12" fill="#f4f1e8"/>`) +
      `<path d="M136 320q14 4 10 24" stroke="#2b2b2b" stroke-width="2" fill="none"/>` +
      person(360, 382, '#e63946') + `<circle cx="354" cy="384" r="3" fill="#2b2b2b"/><circle cx="366" cy="384" r="3" fill="#2b2b2b"/>` +
      diff(...around(351, 350, 369, 362), `<path d="M352 350H368L366 362H354Z" fill="#ffffff"/>`, `<path d="M352 350H368L366 362H354Z" fill="#ffd23f"/>`) +
      `<circle cx="420" cy="410" r="10" fill="#2b2b2b"/><circle cx="462" cy="410" r="10" fill="#2b2b2b"/><path d="M420 410L436 392H456L462 410M430 392H448" stroke="#3d4a55" stroke-width="5" fill="none"/><path d="M456 392l6 -10" stroke="#3d4a55" stroke-width="3"/>` +
      diff(...around(432, 376, 448, 388), `<path d="M432 388a8 8 0 0 1 16 0Z" fill="#ffd23f"/>`, '') +
      car(640, 420, '#3a86ff', true) +
      diff(...around(626, 370, 654, 382), `<rect x="626" y="370" width="28" height="12" rx="3" fill="#2b2b2b"/>`, '') +
      diff(...around(570, 302, 590, 330), bin(580, 330, '#5c8d5a'), bin(580, 330, '#e63946')) +
      diff(...around(750, 272, 770, 330), roadSign(760, 330, '#3a86ff'), roadSign(760, 330, '#e63946')) +
      lampPost(260, 440) +
      // Decor: the same at both moments, darkened by the evening with the rest
      cloud(300, 90, 0.5) +
      cloud(760, 40, 0.4) +
      barrel(30, 340) +
      crate(40, 400, 24) +
      hydrant(480, 352) +
      dog(320, 422) +
      pigeon(90, 440) +
      pigeon(700, 442, true) +
      cone(540, 422) +
      rock(40, 470, 0.7) +
      rock(780, 482, 0.6) +
      bird(220, 200) +
      bird(520, 200, '#e63946') +
      bench(160, 420) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 260, 140],
      ]) +
      time('', DUSK) +
      trap(600, 150, 40, neon(false), neon(true), 'lights') +
      trap(380, 257, 31, '', glow(360, 240, 40, 34), 'lights') +
      trap(260, 340, 34, lampHead(260, 440, false), lampHead(260, 440, true), 'lights') +
      trap(665, 300, 46, shadow(700, 300, 80), '', 'shadow') +
      trap(520, 90, 35, birds(520, 90), '', 'birds') +
      trap(420, 60, 42, '', stars(420, 60), 'stars') +
      trap(120, 60, 54, sun(120, 60), moon(120, 60), 'moon')
    )
  },
})
