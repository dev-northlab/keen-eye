// "The night train mystery", scene 4 — the luggage car: the poodle's leash tied to the wall ring, a
// dinosaur sticker on the countess's trunk, the trunk's lid lifted, a parcel tipped on the pile, the
// lantern out, letters spilled from the mail sack, a luggage label torn off, the cobweb torn and a box
// opened.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { box, cobweb, lantern, shelf } from './shapes.ts'

/** The poodle's leash: lying in a loop (A) or tied to the wall ring (B). Bounds: x 60–128, y 380–460. */
const leash = (tied: boolean) =>
  tied
    ? `<path d="M126 416Q96 404 66 386" stroke="#e5484d" stroke-width="3" fill="none"/><circle cx="65" cy="385" r="4" fill="#b83236"/><path d="M65 389l-3 8M65 389l4 7" stroke="#e5484d" stroke-width="2.4"/>`
    : `<path d="M126 418Q96 430 80 446Q70 456 86 458Q100 456 94 446" stroke="#e5484d" stroke-width="3" fill="none"/>`

/** Lid of the trunk: shut with its clasp (A) or lifted, a scarf hanging out (B). Bounds: x 180–290, y 306–338. */
const lid = (shut: boolean) =>
  shut
    ? `<rect x="180" y="316" width="110" height="20" rx="6" fill="#2a5585"/><rect x="229" y="328" width="12" height="10" rx="2" fill="#f2c14e"/>`
    : `<rect x="182" y="326" width="106" height="12" fill="#1a2a40"/><rect x="180" y="306" width="110" height="20" rx="6" fill="#2a5585"/>` +
      `<path d="M206 330q4 6 0 8h10q-2 -4 2 -8Z" fill="#e8457a"/>`

const dino = (x: number, y: number) =>
  `<rect x="${x - 14}" y="${y - 12}" width="28" height="24" rx="5" fill="#fff"/>` +
  `<path d="M${x - 10} ${y + 6}Q${x - 6} ${y - 4} ${x + 2} ${y - 2}L${x + 5} ${y - 8}Q${x + 10} ${y - 9} ${x + 10} ${y - 5}L${x + 6} ${y - 3}L${x + 6} ${y + 4}H${x + 3}V${y + 8}H${x}V${y + 4}H${x - 4}V${y + 8}H${x - 7}V${y + 4}Z" fill="#3fbf5f"/>`

const parcel = (x: number, y: number, w: number, h: number) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#d0a066"/><path d="M${x + w / 2} ${y}V${y + h}M${x} ${y + h / 2}H${x + w}" stroke="#8a5a2b" stroke-width="2"/>`

const letter = (x: number, y: number, a: number) =>
  `<g transform="rotate(${a} ${x} ${y})"><rect x="${x - 10}" y="${y - 7}" width="20" height="14" fill="#fff"/><path d="M${x - 10} ${y - 7}L${x} ${y + 1}L${x + 10} ${y - 7}" fill="none" stroke="#a9b2bd" stroke-width="1.4"/></g>`

export default detectiveLevel({
  id: 524,
  case: 'train',
  title: 'trainLuggageCar',
  parTimeSec: 112,
  scene: ({ clue, anim, extra }) =>
    `<rect width="800" height="400" fill="#a8743f"/>` +
    `<path d="${Array.from({ length: 16 }, (_, i) => `M${i * 50 + 25} 0V400`).join('')}" stroke="#8a5a2b" stroke-width="3"/>` +
    `<rect y="400" width="800" height="100" fill="#6b4a2b"/><path d="M0 400H800" stroke="#4a3220" stroke-width="5"/>` +
    clue('cobwebTorn', 60, 60, 46, cobweb(60, 60), cobweb(60, 60, true)) +
    // Sliding door with its little window
    `<rect x="330" y="120" width="140" height="280" fill="#8a5a2b"/><rect x="370" y="160" width="60" height="60" fill="#1f2a4a"/><circle cx="412" cy="178" r="6" fill="#fff3b0"/>` +
    `<path d="M330 120H470M400 120V400" stroke="#5e3b1a" stroke-width="4"/><rect x="452" y="260" width="8" height="40" rx="3" fill="#c9953f"/>` +
    `<path d="M400 0V40" stroke="#555" stroke-width="3"/>` +
    clue('lanternOut', 400, 64, 24, lantern(400, 40, true), lantern(400, 40, false)) +
    // The poodle in its basket
    `<circle cx="60" cy="380" r="7" fill="none" stroke="#8a8f99" stroke-width="3"/>` +
    `<ellipse cx="110" cy="440" rx="54" ry="18" fill="#c69563"/>` +
    `<g fill="#fff">${[[86, 422], [102, 414], [118, 420], [96, 428], [112, 430]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13"/>`).join('')}<circle cx="138" cy="402" r="14"/></g>` +
    `<ellipse cx="148" cy="408" rx="8" ry="6" fill="#fff"/><circle cx="152" cy="406" r="2.5" fill="#2b2b38"/><path d="M132 396q-2 -6 -6 2" stroke="#2b2b38" stroke-width="2" fill="none"/>` +
    `<path d="M124 412l10 6" stroke="#e5484d" stroke-width="5"/>` +
    `<path d="M56 440Q110 470 164 440V452Q110 480 56 452Z" fill="#a8743f"/>` +
    clue('leashTied', 94, 420, 54, leash(false), leash(true)) +
    // The countess's trunk
    `<rect x="182" y="336" width="106" height="84" fill="#3a6ea5"/><path d="M182 360H288M182 400H288" stroke="#2a5585" stroke-width="3"/>` +
    `<g fill="#f2c14e"><rect x="182" y="336" width="10" height="10"/><rect x="278" y="336" width="10" height="10"/><rect x="182" y="410" width="10" height="10"/><rect x="278" y="410" width="10" height="10"/></g>` +
    clue('trunkOpen', 235, 322, 58, lid(true), lid(false)) +
    clue('stickerOnTrunk', 204, 404, 20, '', dino(204, 404)) +
    // Pile of parcels
    parcel(480, 360, 80, 40) +
    parcel(488, 330, 64, 30) +
    clue('parcelTipped', 520, 306, 34, parcel(496, 306, 48, 24), parcel(508, 282, 24, 48)) +
    // Mail sack
    `<path d="M612 400Q604 360 624 338L620 326H660L656 338Q676 360 668 400Z" fill="#c9b38a"/><path d="M622 332H658" stroke="#8a5a2b" stroke-width="4"/><path d="M628 370h24" stroke="#3a6ea5" stroke-width="5"/>` +
    clue('mailSpilled', 672, 430, 34, '', letter(654, 424, -10) + letter(676, 436, 14) + letter(690, 420, -24) + letter(664, 444, 6)) +
    clue('boxOpen', 742, 371, 48, box(720, 400, 44, 36), box(720, 400, 44, 36, true)) +
    // High shelf with a suitcase and its label
    shelf(560, 200, 230) +
    `<rect x="620" y="160" width="80" height="40" rx="5" fill="#8e2f45"/><path d="M650 160v-8h20v8" fill="none" stroke="#5e1f30" stroke-width="4"/><rect x="580" y="176" width="30" height="24" rx="3" fill="#5b8db8"/>` +
    `<path d="M668 156Q690 156 704 162" stroke="#5e3b1a" stroke-width="1.6" fill="none"/>` +
    clue(
      'labelTorn',
      708,
      176,
      22,
      `<g transform="rotate(-12 708 164)"><rect x="700" y="164" width="16" height="24" rx="2" fill="#f5ecd8" stroke="#c9953f" stroke-width="1.4"/><path d="M704 174h8M704 180h6" stroke="#8a8f99" stroke-width="1.6"/></g>`,
      `<path d="M703 163l6 6l-3 2l6 3" stroke="#f5ecd8" stroke-width="2" fill="none"/>`,
    ) +
    // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
    decor({ anim }, [
      ['keyRack', 42, 144],
      ['hatBox', 352, 486, '#f2c14e'],
      ['roundMirror', 445, 240],
      ['butterflyFrame', 745, 238],
      ['newspapers', 758, 473],
    ]) +
    extras({ extra, anim }, [
      ['calendar', 123, 282],
      ['globe', 178, 487],
      ['sconce', 207, 74],
      ['yarnBasket', 273, 476],
      ['treasureMap', 279, 220],
      ['pouf', 398, 429, '#f2994a'],
      ['bucket', 513, 486],
      ['wallPhone', 574, 65],
      ['mouse', 592, 424],
      ['dartboard', 755, 55],
    ]),
})
