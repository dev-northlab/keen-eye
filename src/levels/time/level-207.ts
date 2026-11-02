import { svgLevel } from '../helpers.ts'
import { bareTree, bike, building, car, cityTree, door, hangingSign, hydrant, icicles, person, sky, snowCap, snowfall, street, winterPerson, winterSky } from './shapes.ts'

/** Snow lying on the roof of a `car` (city shapes) at (x, y). Bounds: x from −14 to +30, y from −42 to −32. */
const carSnow = (x: number, y: number) => `<path d="M${x - 14} ${y - 34}q2 -8 10 -8h20q10 0 14 8Z" fill="#ffffff"/>`

/** Litter bin; (x, y) = bottom center. Bounds: x ±11, y from −30 to 0. */
const bin = (x: number, y: number, color: string) =>
  `<path d="M${x - 9} ${y - 24}h18l-2 24h-14Z" fill="${color}"/><rect x="${x - 11}" y="${y - 30}" width="22" height="6" rx="2" fill="${color}"/>`

export default svgLevel({
  id: 207,
  chapter: 'time',
  title: 'snowStreet',
  pair: 'summer-winter',
  parTimeSec: 85,
  scene: ({ diff, time, trap }) =>
    time(sky(false, 330), winterSky(330)) +
    building(30, 330, 220, 250, '#81b29a') +
    time('', snowCap(26, 72, 228)) +
    diff(140, 160, 24, `<rect x="126" y="144" width="28" height="35" fill="#81b29a"/>`, '') +
    // Bakery
    `<rect x="270" y="150" width="230" height="180" fill="#ffd6a5"/><rect x="266" y="142" width="238" height="10" fill="#ffffff" fill-opacity="0.4"/>` +
    time('', snowCap(266, 138, 238)) +
    `<rect x="290" y="250" width="130" height="70" fill="#f4efe6"/><rect x="295" y="255" width="120" height="60" fill="#bde3f2"/>` +
    `<rect x="290" y="236" width="130" height="10" fill="#e07a5f"/>` +
    diff(465, 306, 28, door(465, 330, '#3a86ff'), door(465, 330, '#e63946')) +
    `<path d="M500 186h14" stroke="#3d4a55" stroke-width="2"/>` +
    diff(526, 208, 34, hangingSign(526, 186, '#bc6c25', 'bread'), hangingSign(526, 186, '#bc6c25', 'fish')) +
    trap(355, 250, 34, '', icicles(290, 420, 246), 'icicles') +
    building(570, 330, 200, 210, '#bdb2ff') +
    time('', snowCap(566, 112, 208)) +
    street(350, 110) +
    `<rect y="460" width="800" height="40" fill="${time('#cfd5da', '#eef3f7')}"/>` +
    time('', `<rect y="326" width="800" height="6" fill="#ffffff"/>`) +
    trap(200, 300, 46, cityTree(200, 345, 1.2), bareTree(200, 345, 0.75), 'leaves') +
    diff(120, 330, 24, hydrant(120, 346), '') +
    trap(320, 316, 38, person(320, 348, '#ff006e'), winterPerson(320, 348, '#8338ec'), 'clothes') +
    diff(400, 330, 35, bike(400, 348, '#ffb703'), bike(400, 348, '#3a86ff')) +
    diff(560, 330, 24, bin(560, 348, '#5c8d5a'), bin(560, 348, '#e07a5f')) +
    winterPerson(640, 348, '#2a9d8f', true) +
    car(680, 430, '#e63946') +
    trap(690, 392, 26, '', carSnow(680, 430), 'snow') +
    time('', snowfall(207, 330, 34)),
})
