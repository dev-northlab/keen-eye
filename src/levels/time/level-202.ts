import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level202Redesign } from './level-202-redesign.ts'
import { awning, bench, bin, bird, bollard, car, cityTree, cloud, cone, door, DUSK, flowerBox, glow, hangingSign, hydrant, lampHead, lampPost, moon, person, pigeon, poster, pot, roadSign, sky, street, sun, window, windowLight } from './shapes.ts'

/** Headlight beam to the left of a car (city shapes) standing at (x, y). Bounds: x from −110 to −40, y from −28 to +12. */
const beam = (x: number, y: number) =>
  `<path d="M${x - 40} ${y - 7}L${x - 110} ${y - 28}V${y + 12}Z" fill="#fff3b0" fill-opacity="0.5"/><rect x="${x - 42}" y="${y - 10}" width="6" height="6" rx="1" fill="#fff8d0"/>`

export default svgLevel({
  id: 202,
  chapter: 'time',
  title: 'duskStreet',
  pair: 'day-night',
  parTimeSec: 75,
  redesign: level202Redesign,
  scene: ({ diff, time, trap, extra, anim }) => {
    let corner = ''
    for (const y of [146, 188, 230]) for (const x of [55, 100, 145]) if (x !== 100 || y !== 188) corner += window(x, y)
    let tower = ''
    for (const y of [116, 158, 200, 242]) for (const x of [515, 560, 605]) tower += window(x, y, '#cfe3ee')
    return (
      sky(time(false, true), 330) +
      // Corner house
      `<rect x="10" y="110" width="180" height="220" fill="#e07a5f"/><rect x="6" y="102" width="188" height="10" fill="#ffffff" fill-opacity="0.4"/>` +
      corner +
      door(100, 330, '#5a3d2b') +
      diff(100, 190, 24, window(100, 188), '') +
      diff(55, 259, 26, `<g transform="translate(55 268)"><circle cx="-10" cy="-12" r="5" fill="#ff6b8b"/><circle cy="-14" r="5" fill="#ff6b8b"/><circle cx="10" cy="-12" r="5" fill="#ff6b8b"/><path d="M-18 -8h36l-3 8h-30Z" fill="#a0703f"/></g>`, '') +
      // Café
      `<rect x="210" y="170" width="210" height="160" fill="#f4d6a0"/><rect x="206" y="162" width="218" height="10" fill="#ffffff" fill-opacity="0.4"/>` +
      window(250, 206) +
      window(315, 206) +
      window(380, 206) +
      awning(315, 245, 190, '#e63946') +
      `<rect x="226" y="276" width="116" height="52" fill="#f4efe6"/><rect x="230" y="280" width="108" height="46" fill="#bde3f2"/>` +
      door(385, 330, '#3a86ff') +
      `<path d="M420 198h12" stroke="#3d4a55" stroke-width="2"/>` +
      diff(446, 220, 34, hangingSign(446, 198, '#2f7d55', 'cup'), hangingSign(446, 198, '#2f7d55', 'bread')) +
      // Tower
      `<rect x="470" y="80" width="180" height="250" fill="#7aa6d6"/><rect x="466" y="72" width="188" height="10" fill="#ffffff" fill-opacity="0.4"/>` +
      tower +
      door(560, 330, '#2b2d42') +
      cityTree(720, 340, 1.4) +
      street(350, 110) +
      `<rect y="460" width="800" height="40" fill="#cfd5da"/>` +
      lampPost(200, 345) +
      diff(255, 332, 24, hydrant(255, 348), hydrant(255, 348, '#ffb703')) +
      person(440, 348, '#8338ec') +
      pigeon(500, 348) +
      diff(560, 333, 35, bench(560, 348), bench(560, 348, '#3a86ff')) +
      car(650, 430, '#ffb703') +
      // Decor: the same at both moments, darkened by the evening with the rest
      cloud(330, 60, 0.6) +
      cloud(110, 50, 0.5) +
      flowerBox(145, 266, '#ffd23f') +
      bird(280, 246, '#e63946') +
      poster(478, 272, 22, 30, '#ffb703') +
      roadSign(160, 348) +
      pot(650, 348) +
      pigeon(765, 348, true) +
      cone(20, 492) +
      bin(180, 490) +
      bench(320, 492, '#3a86ff') +
      pigeon(366, 492) +
      bollard(520, 492) +
      bollard(600, 492) +
      bin(700, 492, '#e07a5f') +
      // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 202, 58],
        ['birds', 699, 191],
      ]) +
      time('', DUSK) +
      trap(200, 245, 36, lampHead(200, 345, false), lampHead(200, 345, true), 'lights') +
      trap(605, 158, 26, '', windowLight(605, 158), 'lights') +
      trap(565, 423, 40, '', beam(650, 430), 'lights') +
      // A lit café window: part of the evening, not a trap of its own.
      time('', glow(230, 280, 108, 46)) +
      trap(730, 70, 54, sun(730, 70), moon(730, 70), 'moon')
    )
  },
})
