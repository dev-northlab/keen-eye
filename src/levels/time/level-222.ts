import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level222Redesign } from './level-222-redesign.ts'
import { around, cloud, cone, DUSK, glow, lampHead, lampPost, moon, pane, sky, stars, sun } from './shapes.ts'
import {
  airliner,
  baggageCart,
  baggageTug,
  engineBand,
  finLogo,
  followCar,
  followSign,
  fuelTruck,
  jet,
  radarDish,
  scaledAt,
  stairsRail,
  stairsTruck,
  suitcase,
  tugBeacon,
  windsock,
} from './vehicles.ts'

const TERMINAL_PANES = [34, 70, 106, 142, 178, 214, 250, 286]

export default svgLevel({
  id: 222,
  chapter: 'time',
  title: 'atTheAirport',
  pair: 'day-night',
  parTimeSec: 135,
  redesign: level222Redesign,
  scene: ({ diff, time, trap, extra, anim }) =>
    sky(time(false, true), 300) +
    // Terminal with its glass front
    `<rect x="20" y="170" width="310" height="130" fill="#d9dee3"/><path d="M12 174Q175 120 338 174Z" fill="#8d99a6"/>` +
    TERMINAL_PANES.map((x) => pane(x, 196, 30, 70, '#8d99a6', '#5f8fb0')).join('') +
    `<rect x="150" y="276" width="50" height="24" fill="#5f8fb0"/><path d="M175 276v24" stroke="#d9dee3" stroke-width="2"/>` +
    [60, 175, 290].map((x) => `<path d="M${x} 150V118" stroke="#55606b" stroke-width="2"/>`).join('') +
    `<path d="M61 118h20v12h-20ZM176 118h20v12h-20ZM291 118h20v12h-20Z" fill="#e63946"/>` +
    // Control tower with its radar
    `<rect x="362" y="104" width="36" height="196" fill="#d9d4c3"/>` +
    pane(372, 150, 16, 22, '#b8b2a0', '#5f7f99') +
    pane(372, 210, 16, 22, '#b8b2a0', '#5f7f99') +
    `<rect x="340" y="70" width="80" height="34" fill="#c4bfae"/><rect x="336" y="64" width="88" height="8" fill="#55606b"/>` +
    pane(346, 76, 20, 22, '#55606b', '#5f7f99') +
    pane(370, 76, 20, 22, '#55606b', '#5f7f99') +
    pane(394, 76, 20, 22, '#55606b', '#5f7f99') +
    `<path d="M380 64V50" stroke="#8d99a6" stroke-width="4"/>` +
    diff(...around(358, 28, 402, 64), radarDish(380, 46), radarDish(380, 46, -1)) +
    // Lamp, windsock and the hangar
    lampPost(560, 300) +
    windsock(588, 300) +
    `<rect x="600" y="200" width="190" height="100" fill="#adb5bd"/><path d="M594 202Q695 140 796 202Z" fill="#6c757d"/>` +
    `<rect x="630" y="226" width="130" height="74" fill="#3a3f36"/><path d="M650 292Q690 274 744 280L752 292Z" fill="#e9ecef"/>` +
    `<path d="M700 172V138" stroke="#55606b" stroke-width="2"/>` +
    diff(...around(699, 138, 725, 156), `<path d="M701 140h22l-6 7l6 7h-22Z" fill="#3a86ff"/>`, '') +
    // Apron
    `<rect y="300" width="800" height="200" fill="#9aa0a6"/>` +
    `<path d="M0 446H800" stroke="#ffd23f" stroke-width="3"/><path d="M0 304H800" stroke="#868e96" stroke-width="4"/>` +
    // The airliner, its stairs, the fuel truck
    airliner(470, 430) +
    diff(...around(646, 298, 670, 322), finLogo(470, 430), finLogo(470, 430, true)) +
    diff(...around(468, 374, 484, 402), engineBand(470, 430), engineBand(470, 430, '#3a86ff')) +
    stairsTruck(364, 430) +
    diff(...around(320, 348, 398, 408), stairsRail(364, 430), '') +
    fuelTruck(706, 492, '#3a86ff', '#dee2e6') +
    cone(540, 492) +
    cone(580, 492) +
    // Baggage train and the follow-me car
    baggageTug(60, 492) +
    diff(...around(38, 440, 54, 454), tugBeacon(60, 492), '') +
    baggageCart(140, 492) +
    baggageCart(226, 492) +
    suitcase(120, 474, 18, 26, '#3a86ff') +
    diff(...around(132, 438, 166, 476), suitcase(149, 474, 18, 30, '#e63946'), suitcase(149, 474, 18, 30, '#e63946', 90)) +
    suitcase(212, 474, 20, 24, '#8338ec') +
    diff(...around(229, 438, 255, 476), suitcase(242, 474, 22, 30, '#2a9d8f'), '') +
    followCar(370, 492) +
    diff(...around(354, 440, 386, 458), followSign(370, 492), '') +
    // Decor: the same at both moments, darkened by the evening with the rest
    cloud(470, 150, 0.4) +
    cloud(200, 70, 0.45) +
    scaledAt(600, 110, 0.35, `<g transform="rotate(-12 600 110)">${jet(600, 110, '#ced4da', '#adb5bd', false)}</g>`) +
    // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
    extras({ extra, anim }, [
      ['birds', 110, 70],
      ['birds', 480, 60],
    ]) +
    time('', DUSK) +
    time('', TERMINAL_PANES.filter((x) => x !== 106).map((x) => glow(x, 196, 30, 70)).join('') + glow(346, 76, 20, 22) + glow(370, 76, 20, 22) + glow(394, 76, 20, 22) +
      glow(150, 276, 50, 24) + glow(372, 210, 16, 22)) +
    trap(121, 231, 30, '', glow(106, 196, 30, 70), 'lights') +
    trap(380, 161, 20, '', glow(372, 150, 16, 22), 'lights') +
    trap(560, 200, 34, lampHead(560, 300, false), lampHead(560, 300, true), 'lights') +
    trap(270, 60, 40, '', stars(270, 60), 'stars') +
    trap(740, 60, 54, sun(740, 60), moon(740, 60), 'moon'),
})
