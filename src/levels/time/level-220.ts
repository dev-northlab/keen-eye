import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level220Redesign } from './level-220-redesign.ts'
import { around, barrel, birds, cloud, cone, crate, door, DUSK, glow, lampHead, lampPost, moon, pane, sky, stars, sun } from './shapes.ts'
import {
  extinguisher,
  finStar,
  flag,
  fuelTruck,
  hammer,
  helicopter,
  jerrycan,
  jet,
  ladder,
  pegboard,
  pliers,
  radarDish,
  sandbags,
  scaledAt,
  screwdriver,
  tailRotor,
  tank,
  tankBarrel,
  tireStack,
  toolbox,
  windsock,
  workbench,
  wrench,
} from './vehicles.ts'

export default svgLevel({
  id: 220,
  chapter: 'time',
  title: 'militaryBase',
  pair: 'day-night',
  parTimeSec: 125,
  redesign: level220Redesign,
  scene: ({ diff, time, trap, extra, anim }) =>
    sky(time(false, true), 300) +
    `<path d="M0 262Q120 222 250 252T520 246T800 254V300H0Z" fill="#7d9a5b"/>` +
    // Hangar with tools on its wall
    `<rect x="10" y="200" width="230" height="100" fill="#8a9a6e"/>` +
    `<path d="M4 202Q125 104 246 202Z" fill="#6b7d4f"/>` +
    `<path d="M50 176Q125 126 200 176" stroke="#5a6b42" stroke-width="3" fill="none"/>` +
    [42, 70, 98, 126, 154, 182].map((x) => pane(x, 206, 18, 10, '#5a6b42', '#a9c7d6')).join('') +
    `<rect x="26" y="226" width="120" height="74" fill="#3a3f36"/>` +
    `<path d="M40 286Q70 270 128 274L140 286Z" fill="#5d6873"/>` +
    `<rect x="20" y="224" width="20" height="76" fill="#76865c"/><path d="M30 226v74" stroke="#5a6b42" stroke-width="2"/>` +
    pegboard(158, 218, 78, 52) +
    hammer(172, 244) +
    diff(...around(189, 222, 207, 266), wrench(198, 244), '') +
    screwdriver(226, 244) +
    pliers(212, 246) +
    workbench(196, 300, 72) +
    extinguisher(152, 300) +
    // Control tower, radar and flag
    `<rect x="292" y="122" width="36" height="178" fill="#d9d4c3"/>` +
    pane(302, 168, 16, 22, '#b8b2a0', '#5f7f99') +
    pane(302, 232, 16, 22, '#b8b2a0', '#5f7f99') +
    door(310, 300, '#55606b') +
    `<rect x="270" y="86" width="80" height="36" fill="#c4bfae"/><rect x="266" y="80" width="88" height="8" fill="#55606b"/>` +
    pane(276, 92, 20, 22, '#55606b', '#5f7f99') +
    pane(300, 92, 20, 22, '#55606b', '#5f7f99') +
    pane(324, 92, 20, 22, '#55606b', '#5f7f99') +
    `<path d="M266 128h88M270 122v6M290 122v6M310 122v6M330 122v6M350 122v6" stroke="#55606b" stroke-width="3"/>` +
    diff(...around(322, 36, 338, 80),
      `<path d="M330 80V42M324 56h12M326 66h8" stroke="#55606b" stroke-width="3"/><circle cx="330" cy="40" r="3.5" fill="#e63946"/>`, '') +
    `<rect x="390" y="268" width="40" height="32" fill="#a3a66a"/><rect x="386" y="262" width="48" height="8" fill="#6b7f3a"/>` +
    `<path d="M410 262V208M400 262L410 232L420 262" stroke="#8d99a6" stroke-width="4" fill="none"/>` +
    diff(...around(388, 187, 432, 223), radarDish(410, 205), radarDish(410, 205, -1)) +
    flag(470, 300, 150) +
    lampPost(545, 300) +
    // Barracks
    `<rect x="560" y="210" width="230" height="90" fill="#c9bf94"/><path d="M552 212L590 192H760L798 212Z" fill="#6b7f3a"/>` +
    pane(580, 230, 30, 34) +
    pane(630, 230, 30, 34) +
    pane(730, 230, 30, 34) +
    door(695, 300, '#4f5f2a') +
    // Apron
    `<rect y="300" width="800" height="200" fill="#bdb8a6"/>` +
    `<path d="M0 396H800M200 300V396M600 300V396M100 396V500M400 396V500M700 396V500" stroke="#a9a493" stroke-width="2"/>` +
    `<path d="M0 302H800" stroke="#9c9786" stroke-width="4"/>` +
    // Middle row: tires and cans, the jet with its ladder, the fuel truck
    tireStack(260, 390, 3) +
    jerrycan(300, 390) +
    jerrycan(324, 390, '#6b7f3a') +
    diff(...around(337, 356, 359, 390), jerrycan(348, 390), '') +
    jet(490, 392) +
    diff(...around(561, 320, 579, 338), finStar(490, 392), '') +
    ladder(400, 392, 22, 50) +
    fuelTruck(690, 392) +
    windsock(40, 392) +
    cone(90, 392) +
    // Front row: two tanks, a helicopter on its pad, a toolbox, sandbags
    tank(120, 482) +
    diff(...around(154, 410, 236, 426), tankBarrel(120, 482, 70), tankBarrel(120, 482, 44)) +
    diff(...around(246, 448, 294, 484), toolbox(270, 484), toolbox(270, 484, '#3a86ff')) +
    `<ellipse cx="420" cy="474" rx="96" ry="20" fill="#9c9786"/><ellipse cx="420" cy="474" rx="84" ry="15" fill="none" stroke="#ffd23f" stroke-width="3"/>` +
    helicopter(420, 478) +
    diff(...around(520, 414, 544, 438), tailRotor(420, 478), '') +
    tank(636, 486, '#7d8f4a', '#5c6b33') +
    tankBarrel(636, 486, 60, '#5c6b33') +
    sandbags(768, 490) +
    // Decor: the same at both moments, darkened by the evening with the rest
    scaledAt(172, 122, 0.5, jet(172, 122, '#8d99a6', '#6c7884', false) + finStar(172, 122)) +
    scaledAt(440, 132, 0.55, helicopter(440, 132) + tailRotor(440, 132)) +
    cloud(690, 165, 0.45) +
    crate(372, 300, 22, '#8a7a4e') +
    barrel(255, 300, '#4f6b2f') +
    cone(140, 392) +
    crate(786, 392, 22, '#8a7a4e') +
    crate(786, 370, 22, '#8a7a4e') +
    // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
    extras({ extra, anim }, [
      ['birds', 190, 60],
      ['birds', 470, 60],
    ]) +
    time('', DUSK) +
    time('', glow(276, 92, 20, 22) + glow(300, 92, 20, 22) + glow(324, 92, 20, 22) + glow(630, 230, 30, 34) + glow(730, 230, 30, 34)) +
    trap(310, 179, 20, '', glow(302, 168, 16, 22), 'lights') +
    trap(595, 247, 30, '', glow(580, 230, 30, 34), 'lights') +
    trap(545, 200, 34, lampHead(545, 300, false), lampHead(545, 300, true), 'lights') +
    trap(80, 70, 34, birds(80, 70), '', 'birds') +
    trap(600, 55, 40, '', stars(600, 55), 'stars') +
    trap(720, 70, 54, sun(720, 70), moon(720, 70), 'moon'),
})
