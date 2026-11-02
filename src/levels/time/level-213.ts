import { svgLevel } from '../helpers.ts'
import { barrel, crate, DUSK, glow, gull, lampHead, lampPost, lifeRing, moon, pane, sky, stars, sun, waves } from './shapes.ts'

/** Mooring bollard; (x, y) = bottom center. Bounds: x ±10, y from −18 to 0. */
const bollard = (x: number, y: number) =>
  `<rect x="${x - 7}" y="${y - 14}" width="14" height="14" fill="#3d4a55"/><ellipse cx="${x}" cy="${y - 14}" rx="10" ry="4" fill="#2b2d42"/>`

/** Portholes of the ship's cabin, dark or lit. */
const portholes = (fill: string) => [612, 640, 668].map((x) => `<circle cx="${x}" cy="296" r="7" fill="${fill}" stroke="#8d99ae" stroke-width="2"/>`).join('')

export default svgLevel({
  id: 213,
  chapter: 'time',
  title: 'harborEvening',
  pair: 'day-night',
  parTimeSec: 100,
  scene: ({ diff, time, trap }) =>
    sky(time(false, true), 270) +
    `<path d="M0 270V236h40v-20h30v30h50v-14h40v18h60v-24h30v34Z" fill="#9aa9bd"/>` +
    `<rect y="270" width="800" height="130" fill="#3ba7cc"/>` +
    waves(300, 8, 100, '#2f93ba', 400) +
    // Cargo ship at the quay
    `<rect x="418" y="220" width="4" height="110" fill="#5c677d"/>` +
    diff(436, 231, 20, `<path d="M422 222h28l-6 9l6 9h-28Z" fill="#ffb703"/>`, `<path d="M422 222h28l-6 9l6 9h-28Z" fill="#2a9d8f"/>`) +
    `<rect x="600" y="226" width="30" height="46" fill="#2b2d42"/>` +
    diff(615, 242, 20, `<rect x="600" y="236" width="30" height="12" fill="#e63946"/>`, `<rect x="600" y="236" width="30" height="12" fill="#ffffff"/>`) +
    `<rect x="560" y="270" width="120" height="62" fill="#f4efe6"/>` +
    portholes('#bde3f2') +
    diff(580, 302, 20, lifeRing(580, 302, '#e63946'), '') +
    `<path d="M330 330H730L700 392H360Z" fill="#2b2d42"/><path d="M345 362H715" stroke="#e63946" stroke-width="10"/>` +
    // Quay with a warehouse
    `<rect y="400" width="800" height="100" fill="#a7b4c2"/><rect y="400" width="800" height="8" fill="#8d99ae"/>` +
    `<rect x="20" y="250" width="210" height="150" fill="#c1622f"/><path d="M12 254L125 214L238 254Z" fill="#7a3b22"/>` +
    `<rect x="95" y="320" width="60" height="80" fill="#6b4f3a"/><path d="M95 340h60M95 360h60M95 380h60" stroke="#5a3d1e" stroke-width="2"/>` +
    pane(170, 286, 30, 24) +
    diff(70, 300, 22, pane(58, 288, 24, 24), '') +
    crate(300, 450, 30) +
    crate(300, 420, 30, '#b07a42') +
    diff(300, 375, 22, crate(300, 390, 30), '') +
    diff(380, 433, 23, barrel(380, 450), barrel(380, 450, '#2f6e8c')) +
    diff(520, 412, 20, bollard(520, 420), '') +
    bollard(640, 420) +
    lampPost(200, 470) +
    time('', DUSK) +
    time('', glow(170, 286, 30, 24)) +
    trap(640, 296, 30, '', portholes('#ffe08a'), 'lights') +
    trap(200, 370, 34, lampHead(200, 470, false), lampHead(200, 470, true), 'lights') +
    trap(250, 110, 40, gull(230, 100) + gull(272, 120), '', 'birds') +
    trap(90, 80, 42, '', stars(90, 80), 'stars') +
    trap(740, 80, 54, sun(740, 80), moon(740, 80), 'moon'),
})
