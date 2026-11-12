import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level225Redesign } from './level-225-redesign.ts'
import { around, bareTree, barrel, butterfly, cloud, crate, door, grass, icicles, mountains, oak, pane, person, pond, roofSnow, sky, smoke, snowCap, snowfall, snowman, winterPerson, winterSky } from './shapes.ts'
import {
  apc,
  apcHatch,
  armyTent,
  cargoTruck,
  extinguisher,
  hammer,
  helicopter,
  jeep,
  jerrycan,
  jet,
  ladder,
  pegboard,
  pliers,
  redCross,
  sandbags,
  scaledAt,
  screwdriver,
  spareWheel,
  tailRotor,
  tank,
  tankBarrel,
  toolbox,
  windsock,
  workbench,
  wrench,
} from './vehicles.ts'

export default svgLevel({
  id: 225,
  chapter: 'time',
  title: 'armyCamp',
  pair: 'summer-winter',
  parTimeSec: 140,
  redesign: level225Redesign,
  scene: ({ diff, time, trap, extra, anim }) =>
    time(sky(false, 230), winterSky(230)) +
    mountains(230, time(false, true)) +
    `<rect y="230" width="800" height="270" fill="${time('#8fc25a', '#f4f8fb')}"/>` +
    // Tent and its flag
    armyTent(110, 300) +
    time('', snowCap(44, 238, 132)) +
    `<path d="M214 300V178" stroke="#55606b" stroke-width="4"/>` +
    diff(...around(214, 180, 258, 212), `<path d="M216 182h40v28h-40Z" fill="#3a86ff"/>`, `<path d="M216 182L256 196L216 210Z" fill="#3a86ff"/>`) +
    // Workshop under a canvas roof
    `<path d="M246 300V222M394 300V222" stroke="#6b4f3a" stroke-width="5"/>` +
    `<path d="M232 226L320 200L408 226L400 234H240Z" fill="#6b7f3a"/>` +
    time('', roofSnow(320, 200, 88, 26)) +
    pegboard(262, 236, 110, 38) +
    wrench(278, 255) +
    diff(...around(286, 235, 306, 275), hammer(296, 255), '') +
    screwdriver(318, 255, '#ffb703') +
    pliers(336, 256) +
    wrench(356, 255, '#adb5bd') +
    workbench(316, 300, 100) +
    toolbox(386, 300, '#e63946') +
    // Field kitchen
    `<rect x="426" y="262" width="70" height="30" rx="3" fill="#5c6b33"/><rect x="430" y="270" width="24" height="14" fill="#3a3f36"/>` +
    `<rect x="482" y="236" width="8" height="26" fill="#55606b"/><path d="M418 292H500" stroke="#2f3329" stroke-width="4"/>` +
    `<circle cx="440" cy="292" r="9" fill="#3b3f36"/><circle cx="480" cy="292" r="9" fill="#3b3f36"/>` +
    diff(...around(432, 240, 460, 262), `<rect x="434" y="246" width="24" height="16" rx="2" fill="#adb5bd"/><rect x="432" y="242" width="28" height="5" rx="2" fill="#8d99a6"/><circle cx="446" cy="240" r="3" fill="#55606b"/>`, '') +
    time('', snowCap(462, 262, 18)) +
    // Command cabin
    `<rect x="590" y="240" width="130" height="60" fill="#a3a66a"/><path d="M582 242L655 212L728 242Z" fill="#4f5f2a"/>` +
    `<rect x="700" y="206" width="10" height="30" fill="#7a3b22"/>` +
    pane(640, 255, 28, 24, '#6b7046') +
    pane(684, 255, 28, 24, '#6b7046') +
    diff(...around(594, 254, 626, 300), door(610, 300, '#5c4a32'), door(610, 300, '#2a9d8f')) +
    time('', roofSnow(655, 212, 73, 30)) +
    // Watchtower
    `<path d="M746 300L754 200M794 300L786 200M748 270L790 240M750 240L788 270" stroke="#6b4f3a" stroke-width="4"/>` +
    `<rect x="740" y="170" width="56" height="30" fill="#8a7a4e"/><rect x="748" y="176" width="40" height="12" fill="#3a3f36"/>` +
    `<path d="M734 172L768 150L802 172Z" fill="#4f5f2a"/>` +
    time('', snowCap(736, 166, 64)) +
    windsock(742, 150) +
    // Middle row: truck, jeep, carrier, pond
    cargoTruck(118, 385) +
    diff(...around(208, 327, 224, 363), spareWheel(118, 385), '') +
    time('', snowCap(82, 313, 128)) +
    jeep(330, 385) +
    diff(...around(264, 346, 288, 382), jerrycan(276, 381), '') +
    jerrycan(394, 385, '#4f6b2f') +
    apc(500, 388) +
    diff(...around(520, 306, 554, 338), apcHatch(500, 388, false), apcHatch(500, 388, true)) +
    pond(700, 380, 80, 22, time(false, true)) +
    // Front row: tank, soldier, medical helicopter, sandbags and crates
    tank(100, 482) +
    diff(...around(134, 393, 202, 426), tankBarrel(100, 482, 56),
      `<g transform="rotate(-15 136 418)">${tankBarrel(100, 482, 56)}</g>`) +
    time('', snowCap(70, 410, 50)) +
    `<ellipse cx="430" cy="474" rx="96" ry="20" fill="${time('#7da84e', '#dfe9f0')}"/><ellipse cx="430" cy="474" rx="84" ry="15" fill="none" stroke="#ffd23f" stroke-width="3"/>` +
    helicopter(430, 478, '#e9ecef') +
    tailRotor(430, 478) +
    diff(...around(436, 428, 476, 468), redCross(456, 448), '') +
    sandbags(735, 490) +
    crate(784, 488, 26, '#8a7a4e') +
    // Decor: the same in both seasons, snowed on in winter (grass and butterflies only in summer)
    scaledAt(150, 100, 0.5, jet(150, 100, '#8d99a6', '#6c7884', false)) +
    scaledAt(430, 132, 0.55, helicopter(430, 132) + tailRotor(430, 132)) +
    cloud(620, 60, 0.45) +
    extinguisher(232, 300) +
    barrel(14, 300, '#4f6b2f') +
    ladder(758, 300, 12, 100) +
    time(grass(40, 495) + grass(330, 496) + butterfly(60, 392) + grass(690, 470), '') +
    // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
    extras({ extra, anim }, [
      ['birds', 300, 70],
      ['birds', 560, 80],
    ]) +
    trap(535, 245, 40, oak(535, 300, 0.9), bareTree(535, 300, 0.9), 'leaves') +
    trap(718, 172, 36, '', smoke(704, 200), 'smoke') +
    trap(683, 250, 35, '', icicles(650, 716, 242), 'icicles') +
    trap(700, 380, 40, '', '', 'ice') +
    trap(250, 445, 38, person(250, 480, '#6b7f3a'), winterPerson(250, 480, '#6b7f3a', false, '#4f5f2a'), 'clothes') +
    trap(610, 438, 44, '', snowman(610, 480), 'snowman') +
    time('', snowfall(225, 240, 44)),
})
