// "The night train mystery", scene 2 — the corridor: every ticket on the board punched, a compartment
// curtain drawn, a ceiling lamp out, a painting knocked crooked, a suitcase fallen off the pile, a
// flower pot tipped over, and on the carpet a newspaper, one pearl and small shoe prints.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { hills, picture, sneaker } from './shapes.ts'

/** Ceiling lamp at x: lit or out. Bounds: x ±20, y 2–34. */
const lamp = (x: number, on: boolean) =>
  (on ? `<circle cx="${x}" cy="22" r="19" fill="#ffd54a" fill-opacity="0.35"/>` : '') + `<path d="M${x - 20} 14A20 18 0 0 0 ${x + 20} 14Z" fill="${on ? '#fff3b0' : '#b8bcc4'}"/>`

/** Sliding compartment door, x to x + 110, glass in its upper half, curtains open at the sides. */
const door = (x: number) =>
  `<rect x="${x}" y="110" width="110" height="270" fill="#6b4a2b"/><rect x="${x + 14}" y="130" width="82" height="80" fill="#fff3d0"/>` +
  `<path d="M${x + 14} 130h12v80h-12ZM${x + 96} 130h-12v80h12Z" fill="#7a58ab"/><rect x="${x + 90}" y="250" width="8" height="30" rx="3" fill="#c9953f"/>`

const ticket = (x: number, y: number) =>
  `<rect x="${x}" y="${y}" width="30" height="26" rx="2" fill="#fff8e0"/><path d="M${x + 5} ${y + 8}h14M${x + 5} ${y + 14}h10" stroke="#9a9aa6" stroke-width="2"/>`

/** Pile of suitcases in front of the first door: the top one on the pile (A) or fallen beside it (B). Bounds: x 70–176, y 330–402. */
const topCase = (fallen: boolean) =>
  fallen
    ? `<g transform="rotate(8 150 388)"><rect x="128" y="376" width="44" height="24" rx="4" fill="#3f9b6b"/><path d="M142 376v-6h16v6" fill="none" stroke="#2f7d55" stroke-width="3"/></g>`
    : `<rect x="76" y="334" width="44" height="26" rx="4" fill="#3f9b6b"/><path d="M90 334v-4h16v4" fill="none" stroke="#2f7d55" stroke-width="3"/>`

/** Flower pot by the corridor's end: upright (A) or knocked over to the left (B). */
const flowerPot = () =>
  `<path d="M760 356V334" stroke="#3f9b4b" stroke-width="3"/><path d="M760 346q-12 -4 -14 -12q10 0 14 8Z" fill="#3f9b4b"/>` +
  `<g fill="#e8457a"><circle cx="760" cy="328" r="8"/></g><circle cx="760" cy="328" r="3" fill="#f2c14e"/>` +
  `<path d="M748 380L744 356H776L772 380Z" fill="#d9774a"/>`

const newspaper = (x: number, y: number) =>
  `<g transform="rotate(-10 ${x} ${y})"><rect x="${x - 24}" y="${y - 14}" width="48" height="28" fill="#f5f2ea"/><path d="M${x} ${y - 14}V${y + 14}" stroke="#c9c2b6" stroke-width="1.5"/>` +
  `<path d="M${x - 20} ${y - 8}h16M${x - 20} ${y - 2}h16M${x - 20} ${y + 4}h12M${x + 4} ${y - 8}h16" stroke="#8a8f99" stroke-width="2"/><rect x="${x + 4}" y="${y - 3}" width="16" height="12" fill="#a9b2bd"/></g>`

export default detectiveLevel({
  id: 522,
  case: 'train',
  title: 'trainCorridor',
  parTimeSec: 110,
  scene: ({ clue, anim, extra }) =>
    `<rect width="800" height="380" fill="#c69563"/><rect width="800" height="14" fill="#8a5a2b"/><path d="M0 70H800M0 300H800" stroke="#a8743f" stroke-width="6"/>` +
    `<rect y="380" width="800" height="120" fill="#3a3a5a"/><rect y="404" width="800" height="84" fill="#8e2f45"/><path d="M0 410H800M0 482H800" stroke="#f2c14e" stroke-width="3"/>` +
    lamp(200, true) +
    clue('bulbOff', 470, 26, 24, lamp(470, true), lamp(470, false)) +
    lamp(740, true) +
    door(40) +
    door(330) +
    door(600) +
    clue('curtainShut', 385, 170, 58, '', `<path d="M344 130H385V210Q366 200 344 210ZM426 130H385V210Q404 200 426 210Z" fill="#7a58ab"/><path d="M385 130V210" stroke="#5e3f8a" stroke-width="2"/>`) +
    clue('paintingCrooked', 240, 190, 62, picture(240, 190, 80, 60, hills(80, 60)), `<g transform="rotate(-7 240 190)">${picture(240, 190, 80, 60, hills(80, 60))}</g>`) +
    // Ticket board
    `<rect x="482" y="150" width="80" height="82" rx="4" fill="#5e3b1a"/>` +
    ticket(488, 158) +
    ticket(526, 158) +
    ticket(488, 198) +
    ticket(526, 198) +
    clue('ticketsPunched', 531, 191, 34, '', `<g fill="#5e3b1a">${[171, 211].flatMap((y) => [512, 550].map((x) => `<circle cx="${x}" cy="${y}" r="4"/>`)).join('')}</g>`) +
    // Suitcases
    `<rect x="62" y="360" width="72" height="40" rx="5" fill="#a8743f"/><path d="M86 360V400M110 360V400" stroke="#5e3b1a" stroke-width="4"/>` +
    clue('luggageFallen', 121, 366, 62, topCase(false), topCase(true)) +
    clue('plantTipped', 728, 352, 58, flowerPot(), `<g transform="rotate(-80 744 380)">${flowerPot()}</g>`) +
    clue('newspaperDropped', 300, 450, 30, '', newspaper(300, 450)) +
    clue('pearlOnCarpet', 470, 432, 20, '', `<circle cx="470" cy="434" r="5.5" fill="#fffaf0" stroke="#c9c2b6" stroke-width="1"/><circle cx="468" cy="432" r="1.6" fill="#fff"/>`) +
    clue('smallShoePrints', 601, 458, 24, '', `<g transform="translate(601 458) scale(0.6) translate(-601 -458)">${sneaker(590, 470, '#2b2b38') + sneaker(612, 446, '#2b2b38')}</g>`) +
    // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
    decor({ anim }, [
      ['fireExtinguisher', 132, 490],
      ['photoOval', 178, 96],
      ['dartboard', 455, 245],
      ['boots', 751, 482, '#4c9a52'],
      ['keyRack', 757, 49],
    ]) +
    extras({ extra, anim }, [
      ['butterflyFrame', 40, 248],
      ['globe', 58, 472],
      ['cactus', 203, 488],
      ['scarfHook', 231, 329, '#4c9a52'],
      ['wallPhone', 359, 60],
      ['bucket', 393, 481],
      ['sconce', 542, 79],
      ['pouf', 548, 424],
      ['hatBox', 672, 451, '#7b5ea7'],
      ['roundMirror', 750, 245],
    ]),
})
