// Comet mining: an ice mine on a comet among the space world's ten hardest (hidden until released,
// levels/upcoming.ts). New in space: a drilling rig with its beacon, auger and side tank, ore carts on rails, a
// two-legged mining walker with a claw, a miner, a mothership, a gas jet and an ice mite. Motion differences: the
// auger turns and the probe drone hovers only on picture A; the rig's beacon flashes only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { astronaut, crater, probe, starField } from './shapes.ts'

/** Ore cart on rails; (x, y) = rail level under its center. Bounds: x ±30, y from −26 to +2. */
const cart = (x: number, y: number) =>
  `<path d="M${x - 30} ${y - 26}H${x + 30}L${x + 24} ${y - 6}H${x - 24}Z" fill="#5c677d"/><path d="M${x - 28} ${y - 20}H${x + 28}" stroke="#3d4a55" stroke-width="2"/>` +
  `<circle cx="${x - 14}" cy="${y - 4}" r="6" fill="#2b2d42"/><circle cx="${x + 14}" cy="${y - 4}" r="6" fill="#2b2d42"/>`

/** Pile of ice chunks; (x, y) = bottom center. Bounds: x ±24, y from −14 to 0. */
const icePile = (x: number, y: number) =>
  `<path d="M${x - 24} ${y}L${x - 18} ${y - 10}L${x - 8} ${y - 8}L${x - 2} ${y - 14}L${x + 8} ${y - 9}L${x + 18} ${y - 12}L${x + 24} ${y}Z" fill="#d7f0ff"/>`

/** Mining walker facing right, without its cockpit glass or the chunk in its claw; (x, y) = between its feet. Bounds: x from −36 to +56, y from −120 to 0. */
const walker = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-12 -60L-24 -30L-14 0M12 -60L22 -30L14 0" stroke="#5c677d" stroke-width="8" fill="none" stroke-linejoin="round"/>` +
  `<path d="M-24 0h20M6 0h20" stroke="#3d4a55" stroke-width="6" stroke-linecap="round"/><rect x="-26" y="-100" width="52" height="44" rx="6" fill="#ffb703"/>` +
  `<path d="M-26 -78H26" stroke="#e09f00" stroke-width="3"/><path d="M-18 -100a18 18 0 0 1 36 0Z" fill="#3d4a55"/>` +
  `<path d="M26 -80L50 -64" stroke="#5c677d" stroke-width="6" stroke-linecap="round"/><path d="M50 -64l6 10M50 -64l-2 12" stroke="#3d4a55" stroke-width="4" stroke-linecap="round"/></g>`

/** Ice mite peeking from a crevice; (x, y) = bottom center. Bounds: x ±16, y from −18 to 0. */
const iceMite = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><circle cx="-10" cy="-5" r="5" fill="#7bdff2"/><circle cx="-1" cy="-7" r="6" fill="#7bdff2"/><circle cx="9" cy="-9" r="7" fill="#9be7f7"/>` +
  `<path d="M7 -15l-3 -3M12 -15l3 -3" stroke="#7bdff2" stroke-width="1.5"/><circle cx="7" cy="-10" r="1.6" fill="#222"/><circle cx="12" cy="-10" r="1.6" fill="#222"/></g>`

export default svgLevel({
  id: 191,
  chapter: 'space',
  title: 'cometMining',
  parTimeSec: 100,
  scene: ({ diff, anim, rand, extra }) => {
    const beacon = `<circle cx="150" cy="138" r="6" fill="#ff3b3b"/><circle cx="150" cy="138" r="11" fill="#ff3b3b" fill-opacity="0.35"/>`
    const bit = `<path d="M150 336L156 350L150 364L144 350ZM136 350L150 344L164 350L150 356Z" fill="#adb5bd"/><circle cx="150" cy="350" r="3" fill="#3d4a55"/>`
    const drone = probe(330, 200)
    return (
      `<rect width="800" height="500" fill="#14122e"/>` + starField(rand, 0, 300, 50) +
      `<circle cx="720" cy="70" r="30" fill="#fff3b0" fill-opacity="0.3"/><circle cx="720" cy="70" r="16" fill="#fff3b0"/>` +
      // The mothership and its windows
      `<ellipse cx="430" cy="92" rx="110" ry="22" fill="#5c677d"/><path d="M340 86H520" stroke="#8d99ae" stroke-width="3"/><path d="M380 112l-10 12M480 112l10 12" stroke="#5c677d" stroke-width="4"/>` +
      `<circle cx="380" cy="94" r="5" fill="#ffd23f"/><circle cx="410" cy="94" r="5" fill="#ffd23f"/><circle cx="480" cy="94" r="5" fill="#ffd23f"/>` +
      diff(450, 94, 22, `<circle cx="450" cy="94" r="5" fill="#ffd23f"/>`, '') +
      diff(330, 200, 22, anim({ type: 'bob', dx: 3, dy: 3, period: 2.6 }, drone), drone) +
      // The comet's icy ground, its gas jet, the ice mite
      `<path d="M0 320Q120 296 240 312T480 300T800 316V500H0Z" fill="#a9bccf"/>` + crater(420, 360, 30, '#8fa3b8') + crater(260, 480, 24, '#8fa3b8') + crater(740, 470, 20, '#8fa3b8') +
      `<path d="M610 304Q606 280 614 262H626Q634 280 630 304Z" fill="#e9f7fb" fill-opacity="0.6"/>` +
      diff(620, 243, 22, `<path d="M614 263Q612 242 620 224Q628 242 626 263Z" fill="#e9f7fb" fill-opacity="0.6"/>`, '') +
      `<ellipse cx="60" cy="472" rx="24" ry="6" fill="#5c6f86"/>` + diff(60, 462, 22, iceMite(60, 472), '') +
      // The drilling rig: beacon, side tank, auger
      `<path d="M120 362L140 150M180 362L160 150M126 320L174 280M128 280L172 240M130 240L170 200M134 200L166 170" stroke="#8d99ae" stroke-width="5" fill="none"/>` +
      `<rect x="128" y="144" width="44" height="8" fill="#5c677d"/><path d="M150 152V338" stroke="#5c677d" stroke-width="4"/><ellipse cx="150" cy="352" rx="22" ry="7" fill="#5c6f86"/>` +
      diff(150, 138, 22, beacon, anim({ type: 'blink', duty: 0.5, period: 1.2 }, beacon)) +
      diff(150, 350, 24, anim({ type: 'rotate', pivot: [150, 350], period: 0.8 }, bit), bit) +
      diff(196, 250, 22, `<rect x="186" y="233" width="20" height="34" rx="6" fill="#ff9f43"/>`, `<rect x="186" y="233" width="20" height="34" rx="6" fill="#3a86ff"/>`) +
      // Rails and the ore carts
      `<path d="M220 436H520M220 442H520" stroke="#5c677d" stroke-width="2"/><path d="M230 436v8M260 436v8M290 436v8M320 436v8M350 436v8M380 436v8M410 436v8M440 436v8M470 436v8M500 436v8" stroke="#6c757d" stroke-width="3"/>` +
      cart(330, 436) + icePile(330, 410) + cart(430, 436) + icePile(430, 410) +
      diff(334, 400, 22, `<path d="M326 406L330 394L338 392L342 404Z" fill="#bde9fb"/>`, '') +
      // The walker: cockpit glass, the chunk in its claw
      walker(560, 440) +
      diff(566, 331, 22, `<path d="M552 338a12 10 0 0 1 24 0Z" fill="#7bdff2"/>`, `<path d="M552 338a12 10 0 0 1 24 0Z" fill="#ff6bd6"/>`) +
      diff(614, 388, 22, `<path d="M606 384L614 380L622 386L618 396L608 394Z" fill="#d7f0ff"/>`, '') +
      // The miner's visor
      astronaut(700, 450, '#f1f1f1', '#ffb703') +
      diff(703, 408, 22, `<ellipse cx="703" cy="408" rx="6" ry="5" fill="#ffb703"/>`, `<ellipse cx="703" cy="408" rx="6" ry="5" fill="#3ae0ff"/>`) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['spaceStar', 560, 150],
        ['sparkle', 250, 60],
        ['asteroid', 760, 200],
        ['crystal', 470, 480],
        ['crater', 770, 370],
      ])
    )
  },
})
