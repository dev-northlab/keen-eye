import { svgLevel } from '../helpers.ts'
import { around, bench, bin, carriage, carriageWindows, chimney, clockFace, cloud, DUSK, glow, moon, pane, person, pigeon, poster, pot, sky, stars, sun } from './shapes.ts'

/** Lamp hanging from the canopy at x. Bounds: x ±14 (lit: ±24), y from 252 to 296. */
const hangLamp = (x: number, lit: boolean) =>
  (lit ? `<circle cx="${x}" cy="${280}" r="24" fill="#ffe08a" fill-opacity="0.3"/>` : '') +
  `<path d="M${x} 252v16" stroke="#3d4a55" stroke-width="2"/><path d="M${x - 14} 280q14 -16 28 0Z" fill="#3d4a55"/>` +
  `<circle cx="${x}" cy="${283}" r="5" fill="${lit ? '#fff3b0' : '#d8dee4'}"/>`

/** Suitcase; (x, y) = bottom center. Bounds: x ±12, y from −26 to 0. */
const suitcase = (x: number, y: number, color: string) =>
  `<path d="M${x - 5} ${y - 20}v-6h10v6" stroke="#3d4a55" stroke-width="2" fill="none"/><rect x="${x - 12}" y="${y - 20}" width="24" height="20" rx="3" fill="${color}"/>`

export default svgLevel({
  id: 218,
  chapter: 'time',
  title: 'railwayEvening',
  pair: 'day-night',
  parTimeSec: 125,
  scene: ({ diff, time, trap }) =>
    sky(time(false, true), 330) +
    // Station house
    `<rect x="40" y="140" width="300" height="190" fill="#d9a066"/><path d="M30 142L190 100L350 142Z" fill="#8d5a3b"/>` +
    pane(64, 180, 32, 56) +
    pane(124, 180, 32, 56) +
    pane(224, 180, 32, 56) +
    diff(...around(281, 177, 319, 239), pane(284, 180, 32, 56), '') +
    diff(...around(172, 270, 208, 330), `<rect x="172" y="270" width="36" height="60" fill="#6b4f3a"/>`, `<rect x="172" y="270" width="36" height="60" fill="#2a9d8f"/>`) +
    diff(...around(90, 260, 120, 300), `<rect x="90" y="260" width="30" height="40" fill="#ffb703"/><path d="M96 272h18M96 282h12" stroke="#ffffff" stroke-width="3"/>`,
      `<rect x="90" y="260" width="30" height="40" fill="#8338ec"/><path d="M96 272h18M96 282h12" stroke="#ffffff" stroke-width="3"/>`) +
    // Platform and canopy
    `<rect y="330" width="800" height="70" fill="#bfc5cc"/><rect y="396" width="800" height="6" fill="#8d99ae"/>` +
    `<rect y="402" width="800" height="98" fill="#7d8590"/><path d="M0 462H800M0 470H800" stroke="#5c677d" stroke-width="3"/>` +
    `<rect x="360" y="240" width="440" height="12" fill="#5c677d"/><path d="M420 252V330M600 252V330M780 252V330" stroke="#5c677d" stroke-width="6"/>` +
    diff(...around(645, 216, 735, 240), `<rect x="645" y="216" width="90" height="24" rx="4" fill="#3a86ff"/><rect x="653" y="224" width="74" height="8" rx="4" fill="#ffffff" fill-opacity="0.7"/>`,
      `<rect x="645" y="216" width="90" height="24" rx="4" fill="#e63946"/><rect x="653" y="224" width="74" height="8" rx="4" fill="#ffffff" fill-opacity="0.7"/>`) +
    diff(...around(428, 226, 452, 240), pigeon(440, 240), '') +
    diff(...around(390, 348, 450, 378), bench(420, 378), bench(420, 378, '#8338ec')) +
    diff(...around(628, 364, 652, 392), suitcase(640, 392, '#e63946'), '') +
    person(260, 390, '#ffb703') +
    person(700, 392, '#3a86ff', true) +
    // Train
    carriage(40, 470, 200, '#2a9d8f') +
    carriage(250, 470, 200, '#2a9d8f') +
    carriage(460, 470, 200, '#2a9d8f') +
    diff(...around(340, 442, 360, 454), `<rect x="340" y="442" width="20" height="12" fill="#ffd23f"/><path d="M347 445v6" stroke="#2b2b2b" stroke-width="2"/>`,
      `<rect x="340" y="442" width="20" height="12" fill="#ffffff"/><path d="M345 445h6l-4 6" stroke="#2b2b2b" stroke-width="2" fill="none"/>`) +
    `<path d="M670 408h80q20 0 26 20v24h-106Z" fill="#e63946"/><rect x="742" y="414" width="22" height="18" rx="3" fill="#bde3f2"/>` +
    `<circle cx="694" cy="464" r="7" fill="#2b2b2b"/><circle cx="752" cy="464" r="7" fill="#2b2b2b"/>` +
    // Decor: the same at both moments, darkened by the evening with the rest
    cloud(150, 50, 0.4) +
    cloud(300, 60, 0.6) +
    cloud(580, 150, 0.5) +
    chimney(80, 132, '#7a3b22') +
    poster(290, 280, 26, 30, '#e63946') +
    poster(606, 280, 20, 28, '#3a86ff') +
    pigeon(560, 240) +
    pigeon(780, 240, true) +
    bin(30, 396) +
    pot(55, 396) +
    bench(100, 396) +
    suitcase(320, 396, '#3a86ff') +
    bin(500, 396) +
    pigeon(530, 392) +
    bench(760, 396) +
    time('', DUSK) +
    time('', glow(64, 180, 32, 56) + glow(124, 180, 32, 56) + carriageWindows(40, 470, 200, '#ffe08a') + carriageWindows(250, 470, 200, '#ffe08a')) +
    trap(190, 124, 22, clockFace(190, 124, 16, 9, 0), clockFace(190, 124, 16, 6, 45), 'clock') +
    trap(560, 428, 32, '', carriageWindows(460, 470, 200, '#ffe08a'), 'lights') +
    trap(500, 276, 24, hangLamp(500, false), hangLamp(500, true), 'lights') +
    time(hangLamp(680, false), hangLamp(680, true)) +
    trap(780, 440, 20, '', `<path d="M776 440L800 428V452Z" fill="#fff3b0" fill-opacity="0.6"/><circle cx="774" cy="440" r="4" fill="#fff8d0"/>`, 'lights') +
    trap(430, 70, 40, '', stars(430, 70), 'stars') +
    trap(700, 80, 54, sun(700, 80), moon(700, 80), 'moon'),
})
