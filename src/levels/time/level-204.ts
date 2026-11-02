import { svgLevel } from '../helpers.ts'
import { beam, buoy, crate, DUSK, glow, gull, lampHead, lampPost, lifeRing, lighthouse, moon, pier, rowboat, sailboat, sky, sun, waves } from './shapes.ts'

/** Flag cloth on a pole at foot (x, y). Bounds: x from +2 to +30, y from −68 to −50. */
const flagCloth = (x: number, y: number, color: string) => `<path d="M${x + 2} ${y - 68}h28l-6 9l6 9h-28Z" fill="${color}"/>`

export default svgLevel({
  id: 204,
  chapter: 'time',
  title: 'duskPier',
  pair: 'day-night',
  parTimeSec: 75,
  scene: ({ diff, time, trap }) =>
    sky(time(false, true), 270) +
    `<path d="M560 300q60 -50 140 -40q70 6 100 40Z" fill="#8d99ae"/>` +
    lighthouse(690, 290) +
    `<rect y="270" width="800" height="230" fill="#3ba7cc"/>` +
    waves(300, 8, 100, '#2f93ba') +
    sailboat(560, 360, '#ffffff', '#ffd23f') +
    diff(470, 420, 24, buoy(470, 424), buoy(470, 424, '#2a9d8f')) +
    diff(320, 440, 42, rowboat(320, 446), rowboat(320, 446, '#e63946')) +
    pier(0, 420, 330) +
    // Harbour hut on the pier
    `<rect x="40" y="250" width="110" height="80" fill="#e9d3a7"/><path d="M30 252L95 210L160 252Z" fill="#2f6e8c"/>` +
    `<rect x="110" y="282" width="26" height="48" fill="#6b4f3a"/>` +
    `<rect x="56" y="270" width="36" height="28" fill="#f4efe6"/><rect x="59" y="273" width="30" height="22" fill="#bde3f2"/>` +
    `<rect x="268" y="262" width="4" height="68" fill="#5c677d"/>` +
    diff(286, 271, 24, flagCloth(268, 330, '#e63946'), flagCloth(268, 330, '#3a86ff')) +
    diff(200, 315, 24, crate(200, 330), '') +
    diff(360, 360, 24, lifeRing(360, 358), '') +
    `<rect x="356" y="344" width="10" height="46" fill="#6b4f3a"/>` +
    lampPost(400, 330) +
    time('', DUSK) +
    trap(400, 230, 36, lampHead(400, 330, false), lampHead(400, 330, true), 'lights') +
    trap(690, 135, 50, '', beam(690, 290), 'lights') +
    time('', glow(59, 273, 30, 22)) +
    trap(470, 90, 40, gull(450, 80) + gull(492, 98), '', 'birds') +
    trap(120, 70, 54, sun(120, 70), moon(120, 70), 'moon'),
})
