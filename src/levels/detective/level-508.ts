// "The cheese shop mystery", scene 3 — the street in the morning: the paperboy's bike still chained up,
// crumbs on the shop's roof, bird tracks on the windowsill, a torn awning, the shopkeeper's curtains
// drawn (he slept all night) and a flower pot tipped over on his sill.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { birdTrack, cloud, crumbs, panes, sky, sun, windowBox } from './shapes.ts'

const bike = () =>
  `<g fill="none" stroke="#2b2b38" stroke-width="5"><circle cx="90" cy="372" r="26"/><circle cx="174" cy="372" r="26"/></g>` +
  `<path d="M90 372L120 330H160L174 372M120 330L132 372H90M160 330l-6 -18h-12M118 330l-4 -12" fill="none" stroke="#e05a47" stroke-width="5" stroke-linejoin="round"/>` +
  `<rect x="104" y="312" width="22" height="6" rx="3" fill="#3b2a1a"/><path d="M146 310h20" stroke="#3b2a1a" stroke-width="5" stroke-linecap="round"/>` +
  // Basket of newspapers over the front wheel
  `<rect x="160" y="318" width="34" height="22" rx="3" fill="#c69563"/><g fill="#f5ecd8"><rect x="164" y="308" width="10" height="14" rx="3"/><rect x="178" y="306" width="10" height="16" rx="3"/></g>`
/** Chain from the front wheel to the bollard, with its padlock. Bounds: x 172–214, y 350–386. */
const chain = () =>
  `<path d="M178 362Q194 352 208 360" fill="none" stroke="#8a8f99" stroke-width="4" stroke-dasharray="5 3"/>` +
  `<rect x="186" y="364" width="18" height="16" rx="3" fill="#5b6b7a"/><path d="M189 364v-5a6 6 0 0 1 12 0v5" fill="none" stroke="#5b6b7a" stroke-width="3"/>`

/** Striped awning over the shop front, x 220–460, scalloped bottom at y 222. */
const awning = () =>
  `<path d="M220 222L232 190H448L460 222Z" fill="#fff"/>` +
  Array.from({ length: 6 }, (_, i) => `<path d="M${232 + i * 36} 190H${250 + i * 36}L${246 + i * 40} 222H${226 + i * 40}Z" fill="#e5484d"/>`).join('') +
  `<path d="M220 222${'q20 14 40 0'.repeat(6)}" fill="#e5484d"/>` +
  `<path d="M220 222H460" stroke="#b83236" stroke-width="2"/>`
/** A flap torn off the awning hanging down by (420, 222). Bounds: x 404–436, y 218–256. */
const tornFlap = () =>
  `<path d="M408 220L414 232L420 224L426 234L432 222Z" fill="#7a5233"/><path d="M414 228L422 254L432 228Z" fill="#e5484d" stroke="#b83236" stroke-width="1.5"/>`

/** Flower pot on the sill: upright (A) or tipped over (B); (x, y) = bottom middle. Bounds: x ±28, y from −50 to 0. */
const pot = (x: number, y: number) =>
  `<path d="M${x - 14} ${y}L${x - 18} ${y - 24}H${x + 18}L${x + 14} ${y}Z" fill="#d9774a"/>` +
  `<path d="M${x} ${y - 24}V${y - 40}" stroke="#3f9b4b" stroke-width="3"/><g fill="#e8457a"><circle cx="${x - 9}" cy="${y - 38}" r="7"/><circle cx="${x + 9}" cy="${y - 40}" r="7"/><circle cx="${x}" cy="${y - 46}" r="7"/></g>`
const potDown = (x: number, y: number) =>
  `<ellipse cx="${x + 12}" cy="${y - 3}" rx="14" ry="4" fill="#6b4a2b"/><path d="M${x - 22} ${y - 4}L${x + 2} ${y - 18}V${y}Z" fill="#d9774a"/>` +
  `<path d="M${x + 2} ${y - 9}H${x + 14}" stroke="#3f9b4b" stroke-width="3"/><g fill="#e8457a"><circle cx="${x + 18}" cy="${y - 12}" r="6"/><circle cx="${x + 22}" cy="${y - 3}" r="6"/></g>`

/** Curtains of the window at (560, 120) 80×70: open at the sides (A) or drawn shut (B). */
const curtains = (shut: boolean) =>
  shut
    ? `<path d="M568 128H600V182Q588 176 568 182Z" fill="#8e6bbf"/><path d="M600 128H632V182Q612 176 600 182Z" fill="#7a58ab"/>`
    : `<path d="M568 128H584Q576 156 584 182H568Z" fill="#8e6bbf"/><path d="M632 128H616Q624 156 616 182H632Z" fill="#7a58ab"/>`

export default detectiveLevel({
  id: 508,
  case: 'cheese',
  title: 'cheeseStreet',
  parTimeSec: 74,
  scene: ({ clue, anim, extra }) =>
    sky('#ffe3c4') +
    sun(130, 90) +
    anim({ type: 'path', points: [[0, 0], [90, 0]], period: 50 }, cloud(320, 50, 0.7)) +
    // The cheese shop
    `<rect x="200" y="120" width="270" height="260" fill="#f5d48a"/><rect x="190" y="100" width="290" height="24" fill="#8a5a2b"/>` +
    clue('roofCrumbs', 300, 96, 28, '', crumbs(300, 98, '#e6a22a')) +
    `<rect x="230" y="236" width="120" height="94" fill="#bfe6ff"/><rect x="230" y="236" width="120" height="94" fill="none" stroke="#8a5a2b" stroke-width="6"/>` +
    `<path d="M240 318h100" stroke="#a8743f" stroke-width="5"/><path d="M252 316v-10a14 5 0 0 1 28 0v10ZM290 316v-14a16 6 0 0 1 32 0v14Z" fill="#ffd45e"/>` +
    `<rect x="222" y="330" width="136" height="14" rx="3" fill="#e8dcc0"/>` +
    clue('birdTracks', 290, 334, 30, '', birdTrack(270, 340) + birdTrack(290, 336) + birdTrack(310, 340)) +
    `<rect x="380" y="250" width="70" height="130" fill="#5b8db8"/><circle cx="392" cy="318" r="4" fill="#f2c14e"/>` +
    awning() +
    clue('awningTorn', 420, 236, 26, '', tornFlap()) +
    // The shopkeeper's house
    `<rect x="500" y="80" width="220" height="300" fill="#c7d8e8"/><path d="M490 84L610 30L730 84Z" fill="#5b6b7a"/>` +
    windowBox(560, 120, 80, 70) +
    panes(560, 120, 80, 70) +
    clue('curtainsDrawn', 600, 155, 44, curtains(false), curtains(true)) +
    windowBox(560, 262, 90, 68) +
    panes(560, 262, 90, 68) +
    clue('potTipped', 610, 310, 36, pot(608, 334), potDown(608, 334)) +
    `<rect x="672" y="240" width="40" height="140" fill="#3f9b6b"/>` +
    // Street lamp, pavement and cobbles
    `<path d="M760 390V150" stroke="#2b2b38" stroke-width="7"/><path d="M744 150h32l-6 -26h-20Z" fill="#2b2b38"/><rect x="752" y="128" width="16" height="16" fill="#fff3b0"/>` +
    `<rect y="380" width="800" height="22" fill="#cfc8bd"/><rect y="402" width="800" height="98" fill="#a9a39a"/>` +
    Array.from({ length: 30 }, (_, i) => `<ellipse cx="${(i % 10) * 82 + (Math.floor(i / 10) % 2) * 41 + 20}" cy="${424 + Math.floor(i / 10) * 28}" rx="34" ry="10" fill="#bdb7ad"/>`).join('') +
    `<rect x="198" y="330" width="14" height="62" rx="4" fill="#5b6b7a"/>` +
    bike() +
    clue('bikeChained', 194, 366, 26, '', chain()) +
    // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
    decor({ anim }, [
      ['newspapers', 43, 398],
      ['bucket', 198, 461],
      ['broom', 386, 428],
      ['cactus', 603, 483],
      ['bench', 734, 437],
    ]) +
    extras({ extra, anim }, [
      ['plane', 50, 173],
      ['hotAirBalloon', 65, 38],
      ['scooter', 97, 487],
      ['swallow', 198, 46],
      ['mailbox', 268, 428],
      ['wheelbarrow', 344, 481],
      ['cat', 472, 423, '#e8d7b8'],
      ['dragonfly', 510, 30],
      ['puppy', 643, 404, '#8a5a2b'],
      ['paperPlane', 747, 61],
    ]),
})
