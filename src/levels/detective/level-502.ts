// "The missing cake", scene 2 — the garden behind the house: the gate stands open, tulips are
// trampled, someone dug a hole by the bush, the cake's paper doily lies under it, big muddy tracks.
import { detectiveLevel } from '../helpers.ts'
import { bush, cloud, door, fence, grass, paw, sky, sun, tree } from './shapes.ts'

/** Garden gate between posts at 600 and 694 on y = 330: shut (A) or swung open towards us (B). Bounds: x 606–688, y 248–348. */
const gate = (open: boolean) =>
  open
    ? `<path d="M608 254L640 262V348L608 332Z" fill="#f5ecd8" stroke="#000" stroke-opacity="0.12" stroke-width="1.5"/><path d="M610 270L638 276M610 306L638 314" stroke="#d8ccb2" stroke-width="5"/>`
    : `<g fill="#f5ecd8" stroke="#000" stroke-opacity="0.12" stroke-width="1.5">${[612, 638, 664].map((x) => `<path d="M${x} 330V258L${x + 9} 250L${x + 18} 258V330Z"/>`).join('')}</g>` +
      `<path d="M608 272H686M608 306H686M610 304L684 274" stroke="#d8ccb2" stroke-width="5"/>`

/** Tulip; (x, y) = foot of the stem. Bounds: x ±12, y from −58 to 0. `bent` lays it over to the right. Bounds: x to +28, y from −22 to 0. */
const tulip = (x: number, y: number, color: string, bent = false) =>
  bent
    ? `<path d="M${x} ${y}Q${x} ${y - 16} ${x + 18} ${y - 12}" stroke="#3f9b4b" stroke-width="4" fill="none"/><ellipse cx="${x + 20}" cy="${y - 10}" rx="9" ry="7" fill="${color}"/>`
    : `<path d="M${x} ${y}V${y - 42}" stroke="#3f9b4b" stroke-width="4"/><path d="M${x} ${y - 12}q-12 -4 -11 -20q8 6 11 16Z" fill="#3f9b4b"/>` +
      `<path d="M${x - 9} ${y - 52}V${y - 44}Q${x - 9} ${y - 36} ${x} ${y - 36}Q${x + 9} ${y - 36} ${x + 9} ${y - 44}V${y - 52}L${x + 4} ${y - 46}L${x} ${y - 54}L${x - 4} ${y - 46}Z" fill="${color}"/>`

/** Big muddy paw print (half again a cat's); (x, y) = middle of the pad. Bounds: x ±14, y from −17 to +12. */
const bigPaw = (x: number, y: number) => `<g transform="translate(${x} ${y}) scale(1.5)">${paw(0, 0, '#5b3a1e')}</g>`

const hole = (x: number, y: number) =>
  `<ellipse cx="${x + 12}" cy="${y - 2}" rx="30" ry="11" fill="#8a5a2b"/><ellipse cx="${x - 10}" cy="${y + 4}" rx="20" ry="8" fill="#3b2a1a"/>` +
  `<circle cx="${x + 30}" cy="${y + 8}" r="4" fill="#8a5a2b"/><circle cx="${x - 30}" cy="${y - 6}" r="3" fill="#8a5a2b"/>`

/** Lacy paper doily from under the cake. Bounds: ±20. */
const doily = (x: number, y: number) =>
  `<g fill="#fff">${Array.from({ length: 12 }, (_, i) => `<circle cx="${(x + 15 * Math.cos((i * Math.PI) / 6)).toFixed(1)}" cy="${(y + 7 * Math.sin((i * Math.PI) / 6)).toFixed(1)}" r="4.5"/>`).join('')}` +
  `<ellipse cx="${x}" cy="${y}" rx="15" ry="7"/></g><ellipse cx="${x}" cy="${y}" rx="7" ry="3" fill="none" stroke="#e8d9c0" stroke-width="1.5"/>`

const stones = [[110, 400], [170, 420], [240, 436], [320, 446], [400, 452], [480, 448], [550, 430], [600, 404], [632, 376], [648, 350]]

export default detectiveLevel({
  id: 502,
  case: 'cake',
  title: 'cakeGarden',
  parTimeSec: 62,
  scene: ({ clue, anim }) =>
    sky('#bfe6ff') +
    sun(720, 80) +
    anim({ type: 'path', points: [[0, 0], [70, 0]], period: 40 }, cloud(330, 80)) +
    `<rect y="270" width="800" height="70" fill="#9ad27a"/>` +
    tree(740, 300) +
    grass(330) +
    // The house's back wall and door
    `<rect y="90" width="172" height="300" fill="#f3d9b1"/><path d="M0 64H196L172 100H0Z" fill="#c0603a"/>` +
    door(50, 230, 72, 150, '#5b8db8') +
    fence(170, 606, 330) +
    fence(694, 800, 330) +
    `<rect x="600" y="246" width="8" height="88" fill="#d8ccb2"/><rect x="686" y="246" width="8" height="88" fill="#d8ccb2"/>` +
    clue('gateOpen', 647, 296, 58, gate(false), gate(true)) +
    stones.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="26" ry="9" fill="#c9c2b6"/>`).join('') +
    // Flower bed
    `<path d="M200 382Q300 360 420 382Q300 404 200 382Z" fill="#8a5a2b"/>` +
    tulip(220, 384, '#e5484d') +
    tulip(250, 382, '#ffc94a') +
    clue('tulipsTrampled', 300, 350, 50, tulip(280, 381, '#e5484d') + tulip(310, 381, '#ba68c8'), tulip(280, 381, '#e5484d', true) + tulip(310, 381, '#ba68c8', true)) +
    tulip(340, 382, '#ffc94a') +
    tulip(370, 383, '#e5484d') +
    tulip(400, 384, '#ba68c8') +
    bush(520, 384, '#3f9b4b') +
    `<g fill="#e5484d"><circle cx="490" cy="346" r="6"/><circle cx="530" cy="334" r="6"/><circle cx="556" cy="356" r="6"/></g>` +
    clue('doily', 578, 380, 26, '', doily(578, 380)) +
    clue('holeDug', 445, 420, 44, '', hole(445, 420)) +
    clue('bigTracks', 640, 446, 50, '', bigPaw(612, 454) + bigPaw(640, 434) + bigPaw(668, 454)) +
    anim({ type: 'path', points: [[0, 0], [60, -30], [120, 0], [60, 20]], period: 9 }, `<path d="M150 200l-10 -8v16Zm0 0l10 -8v16Z" fill="#ff8a65"/>`),
})
