import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level215Redesign } from './level-215-redesign.ts'
import { bike, bird, birdHouse, bucket, bush, butterfly, cat, chimney, cloud, dog, DUSK, fence, flowerBox, flowers, glow, grass, house, lampHead, lampPost, mailbox, moon, oak, pane, rock, sky, stars, stones, sun, vane } from './shapes.ts'

/** Garden gnome; (x, y) = bottom center. Bounds: x ±10, y from −34 to 0. */
const gnome = (x: number, y: number, hat: string) =>
  `<path d="M${x - 9} ${y}h18l-2 -14h-14Z" fill="#3a86ff"/><circle cx="${x}" cy="${y - 18}" r="6" fill="#f2d29b"/>` +
  `<path d="M${x - 6} ${y - 15}q6 10 12 0Z" fill="#ffffff"/><path d="M${x - 8} ${y - 21}L${x} ${y - 34}L${x + 8} ${y - 21}Z" fill="${hat}"/>`

/** Flower pot; (x, y) = bottom center. Bounds: x ±10, y from −22 to 0. */
const pot = (x: number, y: number) =>
  `<path d="M${x - 8} ${y - 12}h16l-3 12h-10Z" fill="#c1622f"/><circle cx="${x - 4}" cy="${y - 16}" r="4" fill="#ff6b8b"/><circle cx="${x + 4}" cy="${y - 18}" r="4" fill="#ff6b8b"/>`

/** Garland from the house to the tree; bulbs dark or lit. */
const garland = (lit: boolean) =>
  `<path d="M330 200Q470 250 610 214" stroke="#3d4a55" stroke-width="1.5" fill="none"/>` +
  [[360, 214], [400, 225], [440, 230], [480, 230], [520, 226], [560, 220], [596, 215]]
    .map(([x, y]) => (lit ? `<circle cx="${x}" cy="${y + 4}" r="9" fill="#ffe08a" fill-opacity="0.35"/>` : '') + `<circle cx="${x}" cy="${y + 4}" r="4" fill="${lit ? '#fff3b0' : '#c9d1d9'}"/>`)
    .join('')

export default svgLevel({
  id: 215,
  chapter: 'time',
  title: 'yardNight',
  pair: 'day-night',
  parTimeSec: 110,
  redesign: level215Redesign,
  scene: ({ diff, time, trap, extra, anim }) =>
    sky(time(false, true), 300) +
    // House with a porch
    house(195, 330, 260, 170, 80, '#bde0fe', '#6b4f3a') +
    diff(195, 125, 20, `<circle cx="195" cy="125" r="12" fill="#f4efe6"/><circle cx="195" cy="125" r="9" fill="#bde3f2"/>`, '') +
    pane(95, 190, 40, 44) +
    pane(255, 190, 40, 44) +
    pane(95, 262, 40, 44) +
    `<rect x="176" y="270" width="38" height="60" fill="#6b4f3a"/><rect x="160" y="262" width="70" height="8" fill="#8a5a33"/>` +
    // Garage
    `<rect x="360" y="240" width="140" height="90" fill="#e9d3a7"/><path d="M350 244L430 206L510 244Z" fill="#6b4f3a"/>` +
    `<rect x="376" y="270" width="88" height="60" fill="#8d99ae"/><path d="M376 282h88M376 294h88M376 306h88M376 318h88" stroke="#5c677d" stroke-width="2"/>` +
    diff(482, 262, 20, pane(474, 254, 16, 16), '') +
    diff(430, 183, 32, vane(430, 206, 1), vane(430, 206, -1)) +
    `<rect y="300" width="800" height="200" fill="#9ccc65"/>` +
    `<rect y="330" width="800" height="170" fill="#8fc25a"/><path d="M176 330L150 500H250L214 330Z" fill="#d8c08f"/>` +
    oak(640, 330, 1.3) +
    fence(540, 12, 420, '#e9d3a7', 22) +
    diff(700, 359, 26, cat(700, 378), cat(700, 378, '#f2f2f2')) +
    diff(300, 345, 30, mailbox(300, 370, '#3a86ff'), mailbox(300, 370, '#2a9d8f')) +
    pot(110, 352) +
    diff(140, 341, 20, pot(140, 352), '') +
    diff(520, 457, 22, gnome(520, 474, '#e63946'), gnome(520, 474, '#ffb703')) +
    diff(400, 444, 35, bike(400, 462, '#e63946'), bike(400, 462, '#8338ec')) +
    lampPost(80, 470) +
    // Decor: the same at both moments, darkened by the evening with the rest
    cloud(330, 50, 0.5) +
    cloud(460, 110, 0.4) +
    chimney(270, 126) +
    bird(372, 236) +
    flowerBox(275, 252, '#ff6b8b') +
    bush(530, 330, 0.8) +
    rock(470, 360) +
    butterfly(600, 395) +
    bird(787, 376, '#e63946') +
    birdHouse(30, 490, '#ffb703') +
    stones(200, 470) +
    grass(300, 480) +
    flowers(600, 470, '#ffd23f') +
    bucket(660, 470) +
    dog(740, 475) +
    // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
    extras({ extra, anim }, [
      ['birds', 644, 170],
      ['birds', 94, 79],
    ]) +
    time('', DUSK) +
    time('', glow(95, 262, 40, 44)) +
    trap(115, 212, 30, '', glow(95, 190, 40, 44), 'lights') +
    trap(195, 250, 22, `<circle cx="195" cy="250" r="6" fill="#d8dee4"/>`, `<circle cx="195" cy="250" r="22" fill="#ffe08a" fill-opacity="0.35"/><circle cx="195" cy="250" r="6" fill="#fff3b0"/>`, 'lights') +
    trap(560, 224, 24, garland(false), garland(true), 'lights') +
    trap(80, 370, 34, lampHead(80, 470, false), lampHead(80, 470, true), 'lights') +
    trap(560, 70, 42, '', stars(560, 70), 'stars') +
    trap(720, 70, 54, sun(720, 70), moon(720, 70), 'moon'),
})
