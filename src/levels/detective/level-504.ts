// "The missing cake", scene 4 — the attic: cake crumbs by the hatch, a box knocked open, a chewed
// slipper, paw prints on the dusty floor and a torn cobweb.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { boards, box, cobweb, crumbs, pawTrail } from './shapes.ts'

const trunk = (x: number, y: number) =>
  `<rect x="${x}" y="${y - 70}" width="160" height="70" rx="6" fill="#8a5a2b"/><path d="M${x} ${y - 66}Q${x + 80} ${y - 110} ${x + 160} ${y - 66}Z" fill="#a8743f"/>` +
  `<path d="M${x + 30} ${y - 84}V${y}M${x + 130} ${y - 84}V${y}" stroke="#5e3b1a" stroke-width="8"/><rect x="${x + 70}" y="${y - 74}" width="20" height="22" rx="3" fill="#f2c14e"/>`

/** Slipper with bite marks along its toe. Bounds: x ±30, y ±16. */
const slipper = (x: number, y: number) =>
  `<g transform="rotate(-10 ${x} ${y})"><ellipse cx="${x}" cy="${y + 2}" rx="28" ry="11" fill="#e57373"/><path d="M${x - 26} ${y}Q${x - 18} ${y - 14} ${x + 2} ${y - 10}V${y + 8}Q${x - 18} ${y + 10} ${x - 26} ${y}Z" fill="#ef9a9a"/>` +
  `<path d="M${x - 24} ${y - 6}l4 5l3 -7l4 6l3 -7l4 6" stroke="#9b3b3b" stroke-width="2.2" fill="none" stroke-linejoin="round"/><circle cx="${x - 8}" cy="${y - 2}" r="5" fill="#fff"/></g>`

/** Rocking horse; (x, y) = middle of the rocker on the floor. */
const rockingHorse = (x: number, y: number) =>
  `<path d="M${x - 60} ${y - 10}Q${x} ${y + 10} ${x + 60} ${y - 10}" stroke="#a8743f" stroke-width="7" fill="none" stroke-linecap="round"/>` +
  `<path d="M${x - 30} ${y - 4}L${x - 20} ${y - 46}M${x + 30} ${y - 4}L${x + 20} ${y - 46}" stroke="#f5ecd8" stroke-width="7" stroke-linecap="round"/>` +
  `<ellipse cx="${x}" cy="${y - 54}" rx="36" ry="16" fill="#f5ecd8"/><path d="M${x + 26} ${y - 60}L${x + 40} ${y - 96}L${x + 62} ${y - 86}L${x + 42} ${y - 56}Z" fill="#f5ecd8"/>` +
  `<path d="M${x + 36} ${y - 98}q-14 10 -8 34" stroke="#e05a47" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="${x + 50}" cy="${y - 86}" r="3" fill="#3b2a1a"/>` +
  `<path d="M${x - 36} ${y - 56}q-16 6 -14 24" stroke="#e05a47" stroke-width="6" fill="none" stroke-linecap="round"/><rect x="${x - 12}" y="${y - 72}" width="22" height="8" rx="3" fill="#5b8db8"/>`

const roundWindow = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="54" fill="#f5ecd8"/><circle cx="${x}" cy="${y}" r="44" fill="#bfe6ff"/><circle cx="${x + 14}" cy="${y - 14}" r="14" fill="#ffd54a"/>` +
  `<path d="M${x - 44} ${y}H${x + 44}M${x} ${y - 44}V${y + 44}" stroke="#f5ecd8" stroke-width="7"/>`

export default detectiveLevel({
  id: 504,
  case: 'cake',
  title: 'cakeAttic',
  parTimeSec: 66,
  scene: ({ clue, anim, extra }) =>
    `<rect width="800" height="500" fill="#b48a63"/>` +
    Array.from({ length: 16 }, (_, i) => `<path d="M${i * 52 + 20} 0V370" stroke="#a07650" stroke-width="3"/>`).join('') +
    `<rect y="370" width="800" height="130" fill="#9b6a3f"/>` +
    boards(370, '#80542e') +
    // Sloped roof on both sides, beams
    `<path d="M0 0H270L0 210Z" fill="#7a5233"/><path d="M800 0H530L800 210Z" fill="#7a5233"/>` +
    `<path d="M270 0L0 210M530 0L800 210" stroke="#5e3b1a" stroke-width="12"/><rect y="24" width="800" height="14" fill="#5e3b1a"/>` +
    roundWindow(400, 130) +
    anim({ type: 'sway', angle: 8, pivot: [520, 38], period: 3.2 }, `<path d="M520 38V120" stroke="#444" stroke-width="2"/><circle cx="520" cy="128" r="10" fill="#fff3b0"/>`) +
    clue('cobwebTorn', 150, 160, 48, cobweb(150, 160), cobweb(150, 160, true)) +
    trunk(80, 380) +
    anim({ type: 'sway', angle: 6, pivot: [400, 376], period: 3 }, rockingHorse(400, 376)) +
    box(560, 380, 120, 70) +
    clue('boxOpen', 625, 262, 62, box(590, 310, 70, 56), box(590, 310, 70, 56, true)) +
    // The hatch to the stairs
    `<rect x="300" y="420" width="130" height="50" rx="4" fill="#5e3b1a"/><path d="M320 470V428M410 470V428M320 444H410M320 460H410" stroke="#a8743f" stroke-width="5"/>` +
    clue('crumbs', 486, 436, 30, '', crumbs(486, 436, '#d9a35a') + `<circle cx="478" cy="442" r="3" fill="#f7c6d9"/><circle cx="496" cy="430" r="3" fill="#f7c6d9"/>`) +
    clue('chewedSlipper', 180, 432, 36, '', slipper(180, 432)) +
    clue('pawPrints', 650, 444, 40, '', pawTrail([[628, 452], [650, 432], [674, 450]], '#3b2a1a')) +
    // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
    decor({ anim }, [
      ['sconce', 162, 254],
      ['hatBox', 277, 486, '#f7a1c4'],
      ['butterflyFrame', 295, 73],
      ['boots', 556, 472],
      ['scarfHook', 566, 144, '#4c9a52'],
    ]) +
    extras({ extra, anim }, [
      ['tortoise', 66, 443],
      ['wallPhone', 259, 185],
      ['pouf', 318, 399, '#e5484d'],
      ['birdcage', 348, 281],
      ['newspapers', 418, 413],
      ['keyRack', 442, 69],
      ['dartboard', 450, 190],
      ['photoOval', 513, 306],
      ['toyDrum', 575, 410],
      ['mouse', 757, 424, '#b9a58a'],
    ]),
})
