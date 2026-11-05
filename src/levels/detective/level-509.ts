// "The cheese shop mystery", scene 4 — the cellar: the mouse hole is plugged with a cork (the mouse
// couldn't get out), the silver spoon is gone from its hook, a black feather on the stairs, a bottle
// fallen over, the candle blown out and a torn cobweb.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { candle, cheese, cobweb, feather, flame, shelf, smoke } from './shapes.ts'

function stones() {
  let s = `<rect width="800" height="390" fill="#6d6a75"/>`
  for (let row = 0; row * 44 < 390; row++)
    for (let x = (row % 2) * -40; x < 800; x += 80)
      s += `<rect x="${x + 3}" y="${row * 44 + 3}" width="74" height="38" rx="8" fill="#77747f"/>`
  return s
}

const bottle = (x: number, y: number, color: string) =>
  `<path d="M${x - 9} ${y}V${y - 26}Q${x - 9} ${y - 32} ${x - 4} ${y - 34}V${y - 44}H${x + 4}V${y - 34}Q${x + 9} ${y - 32} ${x + 9} ${y - 26}V${y}Z" fill="${color}"/>` +
  `<rect x="${x - 6}" y="${y - 22}" width="12" height="10" fill="#f5ecd8"/>`
/** Bottle lying on the shelf; (x, y) = bottom middle of where it stood. Bounds: x from −22 to +22, y from −14 to 0. */
const bottleDown = (x: number, y: number, color: string) =>
  `<path d="M${x - 22} ${y}V${y - 14}H${x + 4}Q${x + 10} ${y - 14} ${x + 12} ${y - 9}H${x + 22}V${y - 5}H${x + 12}Q${x + 10} ${y} ${x + 4} ${y}Z" fill="${color}"/>` +
  `<rect x="${x - 14}" y="${y - 12}" width="10" height="10" fill="#f5ecd8"/>`

/** Silver spoon hanging from its hook at (x, y). Bounds: x ±8, y from 0 to +46. */
const spoon = (x: number, y: number) =>
  `<path d="M${x} ${y + 2}V${y + 30}" stroke="#c7ccd6" stroke-width="4" stroke-linecap="round"/><ellipse cx="${x}" cy="${y + 38}" rx="7" ry="9" fill="#dfe3ea"/>` +
  `<ellipse cx="${x - 2}" cy="${y + 36}" rx="2" ry="4" fill="#fff"/>`
const hook = (x: number, y: number) => `<path d="M${x} ${y - 6}v6q0 5 -4 4" fill="none" stroke="#3b2a1a" stroke-width="2.5"/>`

const glow = (x: number, y: number) => `<circle cx="${x}" cy="${y - 54}" r="22" fill="#ffd54a" fill-opacity="0.3"/>` + flame(x, y)

export default detectiveLevel({
  id: 509,
  case: 'cheese',
  title: 'cheeseCellar',
  parTimeSec: 76,
  scene: ({ clue, anim, extra }) =>
    stones() +
    `<rect y="390" width="800" height="110" fill="#57535e"/><path d="M0 390H800" stroke="#45424b" stroke-width="6"/>` +
    // Stairs down from the shop
    `<path d="M0 150H40V190H80V230H120V270H160V310H200V350H240V390H0Z" fill="#8a7f72"/>` +
    `<path d="M0 150H40M40 190H80M80 230H120M120 270H160M160 310H200M200 350H240" stroke="#a89c8d" stroke-width="5"/>` +
    clue('feather', 140, 262, 26, '', feather(140, 262)) +
    clue('cobwebTorn', 730, 92, 48, cobweb(730, 92), cobweb(730, 92, true)) +
    anim({ type: 'bob', dx: 0, dy: 26, period: 4 }, `<path d="M640 0V60" stroke="#ddd" stroke-width="1"/><circle cx="640" cy="64" r="6" fill="#2b2b38"/><path d="M632 60l-6 -4M648 60l6 -4M632 68l-6 4M648 68l6 4" stroke="#2b2b38" stroke-width="2"/>`) +
    // Shelf of bottles and jars
    shelf(400, 150, 240, '#8a5a2b') +
    bottle(430, 150, '#3f9b6b') +
    clue('bottleFallen', 466, 128, 32, bottle(466, 150, '#7a3b8f'), bottleDown(466, 150, '#7a3b8f')) +
    bottle(520, 150, '#b84b4b') +
    bottle(556, 150, '#3f9b6b') +
    bottle(600, 150, '#c9953f') +
    shelf(400, 230, 240, '#8a5a2b') +
    cheese(440, 230, 26) +
    cheese(500, 230, 30) +
    cheese(560, 230, 26) +
    cheese(612, 230, 22) +
    // Hooks with a ladle and the spoon
    `<rect x="470" y="290" width="160" height="8" rx="3" fill="#8a5a2b"/>` +
    hook(500, 298) +
    `<path d="M500 300V330" stroke="#8a8f99" stroke-width="4"/><path d="M490 330a10 10 0 0 0 20 0Z" fill="#8a8f99"/>` +
    hook(560, 298) +
    clue('spoonGone', 560, 322, 28, spoon(560, 298), '') +
    hook(600, 298) +
    `<path d="M600 300V340" stroke="#a8743f" stroke-width="5" stroke-linecap="round"/>` +
    // Barrel table with the candle
    `<path d="M276 390Q268 352 278 316H342Q352 352 344 390Z" fill="#8a5a2b"/><path d="M272 340H348M272 370H348" stroke="#5e3b1a" stroke-width="4"/>` +
    candle(310, 318) +
    clue('candleOut', 310, 266, 26, glow(310, 318), smoke(310, 318)) +
    // The mouse hole
    `<path d="M684 390V378A16 16 0 0 1 716 378V390Z" fill="#1f1d24"/>` +
    clue('corkedHole', 700, 378, 24, '', `<path d="M687 390V379A13 13 0 0 1 713 379V390Z" fill="#c69563"/><circle cx="694" cy="380" r="2" fill="#a8743f"/><circle cx="705" cy="384" r="2" fill="#a8743f"/>`) +
    // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
    decor({ anim }, [
      ['keyRack', 42, 49],
      ['hatBox', 207, 481, '#f2c14e'],
      ['butterflyFrame', 350, 53],
      ['newspapers', 518, 483],
      ['pan', 647, 319],
    ]) +
    extras({ extra, anim }, [
      ['globe', 93, 442],
      ['birdcage', 198, 126],
      ['sconce', 222, 309],
      ['cactus', 323, 468],
      ['garlic', 390, 234],
      ['treasureMap', 514, 55],
      ['wallPhone', 604, 180],
      ['fireExtinguisher', 637, 470],
      ['calendar', 758, 182],
      ['pouf', 758, 484, '#4fb3a9'],
    ]),
})
