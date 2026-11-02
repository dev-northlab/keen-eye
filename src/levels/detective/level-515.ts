// "The broken vase", scene 5 — the gift shop: the vase postcards sold out, a receipt for glue and a
// glue smear on the counter, the cash drawer open, a mini vase gone from the shelf, one umbrella taken
// and a backpack by the door with a strap torn off.
import { detectiveLevel } from '../helpers.ts'
import { boards, door, room, shelf, vase } from './shapes.ts'

const miniVase = (x: number, y: number) => `<g transform="translate(${x} ${y}) scale(0.3) translate(${-x} ${-y})">${vase(x, y)}</g>`

/** Two postcards of the vase in the rack's top pockets. Bounds: x 80–140, y 198–232. */
const vaseCards = () =>
  [80, 114]
    .map((x) => `<rect x="${x}" y="198" width="26" height="34" rx="2" fill="#fff"/><path d="M${x + 9} 204h8l-2 5q6 6 3 14h-10q-3 -8 3 -14Z" fill="#3a6ea5"/>`)
    .join('')

/** Furled umbrella standing in the stand, handle up; (x, y) = top of the handle. Bounds: x from −7 to +10, y from 0 to +46. */
const umbrella = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y + 14}Q${x - 7} ${y + 30} ${x} ${y + 46}Q${x + 7} ${y + 30} ${x} ${y + 14}Z" fill="${color}"/>` +
  `<path d="M${x} ${y + 14}V${y + 4}q0 -4 4 -4t4 4" fill="none" stroke="#5e3b1a" stroke-width="3" stroke-linecap="round"/>`

const receipt = (x: number, y: number) =>
  `<path d="M${x - 10} ${y - 14}H${x + 10}V${y + 10}Q${x} ${y + 16} ${x - 10} ${y + 10}Z" fill="#fff"/>` +
  `<path d="M${x - 6} ${y - 9}h12M${x - 6} ${y - 4}h8M${x - 6} ${y + 6}h12" stroke="#9a9aa6" stroke-width="1.6"/><rect x="${x - 6}" y="${y - 1}" width="8" height="4" rx="1" fill="#f2b632"/>`

const smear = (x: number, y: number) =>
  `<path d="M${x - 16} ${y}Q${x - 10} ${y - 7} ${x} ${y - 4}Q${x + 12} ${y - 8} ${x + 16} ${y}Q${x + 6} ${y + 5} ${x - 16} ${y}Z" fill="#e8f6ff" stroke="#a9c7dc" stroke-width="1.5"/>` +
  `<path d="M${x - 6} ${y - 3}h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`

/** Cash drawer pulled out under the register at (545, 272). Bounds: x 508–582, y 268–292. */
const drawer = () =>
  `<rect x="508" y="268" width="74" height="22" rx="3" fill="#a9b2bd"/><path d="M526 272v14M545 272v14M564 272v14" stroke="#8a8f99" stroke-width="2"/>` +
  `<g fill="#f2c14e"><circle cx="518" cy="280" r="4"/><circle cx="536" cy="281" r="4"/><circle cx="555" cy="279" r="4"/></g><rect x="566" y="276" width="12" height="8" fill="#7cc25a"/>`

/** Blue backpack, one strap torn off (a stub left); (x, y) = bottom middle. Bounds: x ±24, y from −46 to 0. */
const backpack = (x: number, y: number) =>
  `<path d="M${x - 8} ${y - 44}q8 -6 16 0" fill="none" stroke="#2a5585" stroke-width="4"/>` +
  `<rect x="${x - 22}" y="${y - 42}" width="44" height="42" rx="12" fill="#3a6ea5"/><rect x="${x - 14}" y="${y - 20}" width="28" height="16" rx="5" fill="#2a5585"/>` +
  `<path d="M${x + 16} ${y - 36}q10 12 4 30" fill="none" stroke="#2a5585" stroke-width="5"/><path d="M${x - 16} ${y - 36}l-5 7" stroke="#2a5585" stroke-width="5"/>`

export default detectiveLevel({
  id: 515,
  case: 'vase',
  title: 'vaseGiftShop',
  parTimeSec: 88,
  scene: ({ clue, anim }) =>
    room('#f7e9f0', '#c69563', 380) +
    boards(380, '#a8743f') +
    // Poster of the vase
    `<rect x="400" y="60" width="90" height="110" rx="4" fill="#fff"/><rect x="408" y="68" width="74" height="94" fill="#e3edff"/>` +
    vase(445, 160) +
    // Postcard rack
    `<path d="M110 190V378" stroke="#8a8f99" stroke-width="5"/><ellipse cx="110" cy="380" rx="34" ry="6" fill="#8a8f99"/>` +
    clue('postcardsSold', 110, 214, 36, vaseCards(), '') +
    [262, 302].map((y) => [80, 114].map((x) => `<rect x="${x}" y="${y - 34}" width="26" height="34" rx="2" fill="#fff"/><path d="M${x + 3} ${y - 8}l8 -12l6 8l4 -4l3 8Z" fill="#7cc25a"/>`).join('')).join('') +
    [230, 262, 302].map((y) => `<path d="M76 ${y}H144" stroke="#8a8f99" stroke-width="3"/>`).join('') +
    // Shelf of souvenirs
    shelf(220, 150, 160, '#c69563') +
    miniVase(250, 150) +
    clue('miniVaseGone', 300, 136, 24, miniVase(300, 150), '') +
    miniVase(350, 150) +
    shelf(560, 150, 70, '#c69563') +
    `<circle cx="584" cy="136" r="12" fill="#f2b632"/><rect x="602" y="122" width="16" height="28" rx="3" fill="#e8457a"/>` +
    // Umbrella stand
    umbrella(198, 290, '#e5484d') +
    clue('umbrellaGone', 214, 306, 26, umbrella(213, 286, '#3f9b4b'), '') +
    umbrella(228, 292, '#f2b632') +
    `<rect x="186" y="326" width="54" height="54" rx="4" fill="#5b6b7a"/><rect x="186" y="326" width="54" height="8" fill="#4a5866"/>` +
    // Counter with the register
    `<rect x="360" y="282" width="240" height="98" fill="#b5835a"/><rect x="352" y="272" width="256" height="12" rx="3" fill="#8a5a2b"/>` +
    clue('glueReceipt', 400, 260, 24, '', receipt(400, 258)) +
    clue('glueSmear', 472, 276, 24, '', smear(472, 276)) +
    `<path d="M512 272L518 236H572L578 272Z" fill="#6f8091"/><rect x="530" y="220" width="30" height="18" rx="3" fill="#2f7d55"/>` +
    `<g fill="#dfe3ea">${[526, 540, 554].flatMap((x) => [246, 258].map((y) => `<rect x="${x}" y="${y}" width="10" height="7" rx="2"/>`)).join('')}</g>` +
    clue('cashOpen', 545, 280, 40, '', drawer()) +
    door(660, 170, 100, 210, '#8e6bbf') +
    anim({ type: 'sway', angle: 14, pivot: [710, 142], period: 1.8 }, `<path d="M710 142V152" stroke="#8a6a3a" stroke-width="2"/><path d="M700 166q0 -14 10 -14t10 14Z" fill="#f2c14e"/>`) +
    clue('backpack', 620, 376, 34, '', backpack(620, 400)),
})
