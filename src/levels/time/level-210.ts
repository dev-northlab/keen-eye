import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level210Redesign } from './level-210-redesign.ts'
import { around, bareTree, bench, bin, butterfly, cloud, cone, door, flowerBox, grass, hydrant, icicles, oak, pane, person, sky, snowCap, snowfall, snowman, winterPerson, winterSky } from './shapes.ts'
import { ambulance, bell, fireEngine, hoseReel, jeep, lightBar, policeCar, redCross, star5 } from './vehicles.ts'

export default svgLevel({
  id: 210,
  chapter: 'time',
  title: 'emergencyServices',
  pair: 'summer-winter',
  parTimeSec: 85,
  redesign: level210Redesign,
  scene: ({ diff, time, trap, extra, anim }) =>
    time(sky(false, 290), winterSky(290)) +
    // Fire station with its bell tower
    `<rect x="20" y="150" width="200" height="140" fill="#c0504d"/><rect x="16" y="144" width="208" height="8" fill="#7a3b22"/>` +
    `<rect x="220" y="80" width="64" height="210" fill="#b24745"/><path d="M212 82L252 50L292 82Z" fill="#7a3b22"/>` +
    `<path d="M238 128V104q14 -16 28 0V128Z" fill="#3a2a22"/>` +
    diff(...around(241, 100, 263, 126, 22), bell(252, 102), '') +
    time('', snowCap(212, 76, 80)) +
    `<rect x="36" y="200" width="80" height="90" rx="4" fill="#dee2e6"/><rect x="128" y="200" width="80" height="90" rx="4" fill="#dee2e6"/>` +
    `<path d="M36 222h80M36 244h80M36 266h80M128 222h80M128 244h80M128 266h80" stroke="#adb5bd" stroke-width="3"/>` +
    pane(60, 160, 30, 26) +
    pane(152, 160, 30, 26) +
    pane(237, 160, 30, 34) +
    door(252, 290, '#7a3b22') +
    // Police station
    `<rect x="310" y="160" width="210" height="130" fill="#a9bccf"/><rect x="306" y="152" width="218" height="10" fill="#1d3557"/>` +
    `<rect x="310" y="196" width="210" height="8" fill="#1d4ed8"/>` +
    pane(330, 215, 34, 36) +
    pane(466, 215, 34, 36) +
    pane(330, 170, 34, 20) +
    pane(466, 170, 34, 20) +
    door(415, 290, '#1d3557') +
    diff(...around(405, 216, 425, 238, 22), `<path d="M415 216v6" stroke="#55606b" stroke-width="3"/><rect x="407" y="222" width="16" height="16" rx="4" fill="#3a86ff"/>`, '') +
    time('', snowCap(304, 148, 222)) +
    // Hospital
    `<rect x="540" y="130" width="250" height="160" fill="#f1e3c6"/><rect x="536" y="122" width="258" height="10" fill="#8d99a6"/>` +
    `<rect x="650" y="84" width="40" height="38" rx="4" fill="#ffffff"/>${redCross(670, 103)}` +
    pane(560, 150, 30, 34) +
    pane(610, 150, 30, 34) +
    pane(700, 150, 30, 34) +
    pane(750, 150, 30, 34) +
    pane(560, 210, 30, 34) +
    pane(750, 210, 30, 34) +
    `<rect x="640" y="230" width="60" height="60" fill="#9fc9de"/><path d="M670 230V290" stroke="#ffffff" stroke-width="3"/><rect x="630" y="222" width="80" height="8" fill="#e63946"/>` +
    time('', snowCap(532, 118, 266) + snowCap(648, 80, 44)) +
    // Pavement, road and the cars of the emergency services
    `<rect y="290" width="800" height="40" fill="${time('#c9c9c9', '#eef3f7')}"/><rect y="328" width="800" height="4" fill="#8d99a6"/>` +
    `<rect y="332" width="800" height="88" fill="#6c757d"/>` +
    Array.from({ length: 10 }, (_, i) => `<rect x="${i * 84 + 10}" y="373" width="44" height="5" fill="#f8f9fa"/>`).join('') +
    `<rect y="420" width="800" height="4" fill="#8d99a6"/><rect y="424" width="800" height="76" fill="${time('#a5cf7a', '#f4f8fb')}"/>` +
    fireEngine(130, 412) +
    diff(...around(152, 346, 184, 390, 22), hoseReel(130, 412), '') +
    time('', snowCap(30, 332, 156)) +
    policeCar(318, 412) +
    diff(...around(304, 350, 332, 358, 22), lightBar(318, 412), lightBar(318, 412, '#3a86ff')) +
    ambulance(456, 412) +
    diff(...around(428, 359, 444, 375, 22), redCross(436, 367), '') +
    jeep(600, 412) +
    diff(...around(594, 381, 610, 397, 22), star5(602, 389, 8), '') +
    time('', snowCap(400, 332, 86)) +
    // Natural changes of winter
    trap(735, 262, 50, oak(735, 330, 1.1), bareTree(735, 330, 1.1), 'leaves') +
    trap(600, 142, 42, '', icicles(560, 640, 132), 'icicles') +
    trap(530, 452, 44, '', snowman(530, 494), 'snowman') +
    trap(660, 457, 38, person(660, 492, '#1d4ed8'), winterPerson(660, 492, '#1d4ed8', false, '#1d3557'), 'clothes') +
    // Decor: the same in both seasons, snowed on in winter (grass and butterflies only in summer)
    cloud(380, 70, 0.5) +
    cloud(720, 50, 0.4) +
    flowerBox(483, 251, '#ff6b8b') +
    hydrant(70, 494) +
    cone(160, 492) +
    cone(196, 492) +
    bench(310, 494) +
    time('', snowCap(278, 460, 64)) +
    bin(400, 494) +
    time('', snowCap(390, 466, 20)) +
    time(grass(30, 496) + grass(240, 498) + grass(770, 496) + butterfly(460, 470), '') +
    // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
    extras({ extra, anim }, [
      ['birds', 110, 70],
      ['birds', 520, 80],
    ]) +
    time('', snowfall(210, 290, 34)),
})
