import { svgLevel } from '../helpers.ts'
import { barrel, bollard, bucket, buoy, cloud, crate, gull, icicles, lifeRing, pier, pine, pineSnow, rock, ropeCoil, rowboat, sack, sailboat, shell, sky, snowCap, snowfall, starfish, waves, winterSky } from './shapes.ts'

/** Flag cloth on a pole at foot (x, y). Bounds: x from +2 to +30, y from −68 to −50. */
const flagCloth = (x: number, y: number, color: string) => `<path d="M${x + 2} ${y - 68}h28l-6 9l6 9h-28Z" fill="${color}"/>`

export default svgLevel({
  id: 209,
  chapter: 'time',
  title: 'snowPier',
  pair: 'summer-winter',
  parTimeSec: 85,
  scene: ({ diff, time, trap }) =>
    time(sky(false, 250), winterSky(250)) +
    `<path d="M0 250q120 -60 260 -40q90 14 160 40Z" fill="${time('#6aa86f', '#e9f0f5')}"/>` +
    `<rect y="250" width="800" height="250" fill="#3ba7cc"/>` +
    waves(280, 8, 100, '#2f93ba') +
    // Shore with the boathouse on the right
    `<path d="M520 250H800V500H600Q560 380 520 250Z" fill="${time('#e3c88f', '#f4f8fb')}"/>` +
    `<rect x="600" y="160" width="160" height="120" fill="#c1622f"/><path d="M588 164L680 110L772 164Z" fill="#3d4a55"/>` +
    time('', snowCap(588, 160, 184)) +
    trap(680, 172, 40, '', icicles(600, 760, 166), 'icicles') +
    `<rect x="650" y="210" width="60" height="70" fill="#6b4f3a"/><path d="M650 228h60M650 246h60M650 264h60" stroke="#5a3d1e" stroke-width="2"/>` +
    diff(626, 210, 24, `<rect x="614" y="196" width="24" height="24" fill="#f4efe6"/><rect x="617" y="199" width="18" height="18" fill="#bde3f2"/>`, '') +
    pier(0, 520, 330) +
    time('', snowCap(0, 326, 520)) +
    diff(120, 315, 24, crate(120, 330, 28), '') +
    diff(170, 312, 24, barrel(170, 330), barrel(170, 330, '#3a86ff')) +
    `<rect x="266" y="262" width="4" height="68" fill="#5c677d"/>` +
    diff(284, 271, 24, flagCloth(266, 330, '#ffb703'), flagCloth(266, 330, '#8338ec')) +
    `<rect x="420" y="344" width="10" height="46" fill="#6b4f3a"/>` +
    diff(425, 360, 24, lifeRing(425, 358), '') +
    sailboat(380, 420, '#3a86ff') +
    diff(240, 440, 24, buoy(240, 444), buoy(240, 444, '#ffb703')) +
    // Ice along the shore in winter
    trap(560, 440, 60, '', `<path d="M500 500Q520 420 560 390Q600 420 620 500Z" fill="#dcecf5"/><path d="M540 450l30 -10M550 480l40 -12" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>`, 'ice') +
    rowboat(100, 460, '#e63946') +
    trap(420, 80, 40, gull(400, 70) + gull(442, 92), '', 'birds') +
    // Decor: the same in both seasons, snowed on in winter (grass and butterflies only in summer)
    cloud(200, 80, 0.6) +
    cloud(620, 60, 0.5) +
    pine(60, 240, 0.5) +
    time('', pineSnow(60, 240, 0.5)) +
    pine(200, 230, 0.4) +
    time('', pineSnow(200, 230, 0.4)) +
    bollard(20, 330) +
    time('', snowCap(13, 308, 14)) +
    ropeCoil(50, 336) +
    sack(340, 330) +
    time('', snowCap(330, 307, 20)) +
    bucket(370, 330) +
    time('', snowCap(354, 304, 32)) +
    crate(480, 330, 24) +
    time('', snowCap(468, 306, 24)) +
    bollard(640, 300) +
    time('', snowCap(633, 278, 14)) +
    rock(770, 330, 0.8) +
    time('', snowCap(758, 318, 24)) +
    time(shell(680, 410), '') +
    time(starfish(740, 470), '') +
    buoy(320, 470, '#ffffff') +
    buoy(460, 460, '#3a86ff') +
    time('', snowfall(209, 300, 36)),
})
