// "The circus mystery", scene 3 — the animal yard: the monkey asleep in its locked cage, the lantern
// out, the white rabbit gone from its hutch, carrots gone from its bowl, peanut shells by the wagon,
// the water barrel knocked over, hay scattered and the seal's ball fallen off its nose.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { cloud, grass, lantern, sky } from './shapes.ts'

/** The monkey's eyes: open (A) or shut with a snore (B). Bounds: x 140–189, y 178–225. */
const monkeyEyes = (awake: boolean) =>
  awake
    ? `<circle cx="144" cy="222" r="3.4" fill="#2b2b38"/><circle cx="156" cy="222" r="3.4" fill="#2b2b38"/>`
    : `<path d="M140 222q4 3 8 0M152 222q4 3 8 0" stroke="#2b2b38" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
      `<path d="M168 194h10l-10 9h10M180 178h9l-9 8h9" stroke="#fff" stroke-width="2.4" fill="none" stroke-linejoin="round"/>`

/** White rabbit sitting in the hutch. Bounds: x 326–372, y 234–282. */
const rabbit = () =>
  `<g fill="#fff"><ellipse cx="335" cy="244" rx="4" ry="10"/><ellipse cx="344" cy="244" rx="4" ry="10"/><ellipse cx="352" cy="268" rx="20" ry="14"/><circle cx="339" cy="258" r="10"/></g>` +
  `<circle cx="335" cy="256" r="1.8" fill="#e8457a"/>`

const carrot = (x: number) =>
  `<path d="M${x - 4} 356L${x} 330L${x + 4} 356Z" fill="#f2994a"/><path d="M${x} 331l-4 -8M${x} 331l4 -8" stroke="#3f9b4b" stroke-width="2.4" stroke-linecap="round"/>`

/** Water barrel standing at y 330 (A) or lying in a puddle (B). Bounds: x 440–500, y 270–334. */
const barrel = (standing: boolean) =>
  standing
    ? `<rect x="446" y="272" width="48" height="58" rx="8" fill="#a8743f"/><path d="M446 286H494M446 316H494" stroke="#5e3b1a" stroke-width="4"/><ellipse cx="470" cy="274" rx="22" ry="5" fill="#5cc3e0"/>`
    : `<ellipse cx="470" cy="332" rx="30" ry="4" fill="#5cc3e0"/><rect x="440" y="284" width="58" height="46" rx="8" fill="#a8743f"/><path d="M454 284V330M484 284V330" stroke="#5e3b1a" stroke-width="4"/>` +
      `<ellipse cx="494" cy="307" rx="5" ry="22" fill="#5cc3e0"/>`

const peanut = (x: number, y: number, a: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="7" ry="4" fill="#d9b277" stroke="#a8743f" stroke-width="1.2" transform="rotate(${a} ${x} ${y})"/>`

const ball = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="12" fill="#e5484d"/><path d="M${x - 12} ${y}H${x + 12}" stroke="#fff" stroke-width="4"/><circle cx="${x}" cy="${y}" r="12" fill="none" stroke="#3a6ea5" stroke-width="2"/>`

export default detectiveLevel({
  id: 518,
  case: 'circus',
  title: 'circusMenagerie',
  parTimeSec: 100,
  scene: ({ clue, anim, extra }) =>
    sky('#cfe8f5') +
    cloud(420, 70, 0.8) +
    // The big top behind
    `<path d="M520 270L640 60L760 270Z" fill="#fff1dc"/><path d="M640 60L560 270H600ZM640 60L660 270H700ZM640 60L740 270H760Z" fill="#e5484d"/>` +
    `<path d="M640 60V30" stroke="#5e3b1a" stroke-width="3"/>` +
    anim({ type: 'sway', angle: 10, pivot: [640, 30], period: 2.4 }, `<path d="M640 30l26 8l-26 8Z" fill="#3fbf5f"/>`) +
    grass(330, '#9ccf6a') +
    `<path d="M0 420Q200 400 400 430T800 420V500H0Z" fill="#d9c08a"/>` +
    // The monkey's cage wagon
    `<path d="M20 110H280L260 84H40Z" fill="#f2b632"/><rect x="30" y="110" width="240" height="200" fill="#e5484d"/><rect x="60" y="140" width="180" height="150" fill="#5b3a4a"/>` +
    `<path d="M110 260a40 30 0 1 0 80 0a40 30 0 1 0 -80 0Z" fill="#8a5a2b"/><circle cx="150" cy="222" r="24" fill="#8a5a2b"/>` +
    `<circle cx="127" cy="218" r="8" fill="#e8c39e"/><circle cx="173" cy="218" r="8" fill="#e8c39e"/><ellipse cx="150" cy="228" rx="16" ry="14" fill="#e8c39e"/>` +
    `<path d="M144 234q6 4 12 0" stroke="#7a3b2a" stroke-width="2" fill="none"/>` +
    clue('monkeyAsleep', 165, 201, 36, monkeyEyes(true), monkeyEyes(false)) +
    [75, 105, 135, 165, 195, 225].map((x) => `<path d="M${x} 140V290" stroke="#f2c14e" stroke-width="5"/>`).join('') +
    `<rect x="232" y="206" width="16" height="14" rx="3" fill="#5b6b7a"/><path d="M235 206v-5a5 5 0 0 1 10 0v5" fill="none" stroke="#5b6b7a" stroke-width="3"/>` +
    `<g fill="#5e3b1a"><circle cx="80" cy="316" r="22"/><circle cx="220" cy="316" r="22"/></g><g fill="#c9953f"><circle cx="80" cy="316" r="7"/><circle cx="220" cy="316" r="7"/></g>` +
    `<path d="M262 104h12v6" fill="none" stroke="#2b2b38" stroke-width="3"/>` +
    clue('lanternOut', 270, 132, 24, lantern(270, 108, true), lantern(270, 108, false)) +
    clue('peanutShells', 200, 400, 26, '', peanut(184, 398, 20) + peanut(200, 392, -30) + peanut(214, 404, 60) + peanut(196, 410, 0)) +
    // Rabbit hutch and its bowl
    `<path d="M316 290V332M404 290V332" stroke="#6b4a2b" stroke-width="6"/><path d="M298 216L360 190L422 216Z" fill="#8a5a2b"/><rect x="306" y="214" width="108" height="76" fill="#c69563"/>` +
    `<rect x="318" y="226" width="84" height="56" fill="#5e3b1a" fill-opacity="0.35"/>` +
    clue('hutchEmpty', 349, 258, 32, rabbit(), '') +
    `<path d="${[330, 342, 354, 366, 378, 390].map((x) => `M${x} 226V282`).join('')}${[238, 250, 262, 274].map((y) => `M318 ${y}H402`).join('')}" stroke="#dfe3ea" stroke-width="1.4"/>` +
    carrot(350) +
    clue('carrotGone', 365, 340, 22, carrot(360) + carrot(370), '') +
    `<path d="M336 352Q360 374 384 352Z" fill="#5b8db8"/>` +
    clue('barrelTipped', 470, 306, 44, barrel(true), barrel(false)) +
    // Hay bale
    `<rect x="560" y="266" width="84" height="64" rx="6" fill="#e8c35a"/><path d="M572 266V330M630 266V330" stroke="#c9953f" stroke-width="4"/><path d="M570 290l16 -6M600 300l14 -8M590 316l16 -4" stroke="#c9953f" stroke-width="2"/>` +
    clue(
      'hayScattered',
      612,
      352,
      32,
      '',
      `<path d="M588 346l14 -4M596 360l18 2M612 342l16 6M620 362l14 -6M604 352l10 -2M630 350l10 4" stroke="#c9953f" stroke-width="3.4" stroke-linecap="round"/>`,
    ) +
    // The seal's pool
    `<ellipse cx="650" cy="440" rx="130" ry="34" fill="#a9b2bd"/><ellipse cx="650" cy="442" rx="118" ry="27" fill="#5cc3e0"/>` +
    `<ellipse cx="700" cy="396" rx="50" ry="18" fill="#8a8f99"/>` +
    `<path d="M672 388Q666 346 700 330Q716 322 728 334Q720 346 716 362Q714 378 730 390Z" fill="#5b6b7a"/><circle cx="724" cy="338" r="14" fill="#5b6b7a"/>` +
    `<ellipse cx="740" cy="342" rx="6" ry="4" fill="#2b2b38"/><circle cx="726" cy="334" r="2.4" fill="#fff"/>` +
    clue('sealBall', 746, 352, 46, ball(742, 324), ball(752, 382)) +
    // Decor of every mode and the extra objects of normal mode (docs/extra-objects.md).
    decor({ anim }, [
      ['shovel', 58, 425],
      ['pouf', 198, 484, '#4fb3a9'],
      ['broom', 416, 478],
      ['hatBox', 537, 381],
      ['newspapers', 748, 483],
    ]) +
    extras({ extra, anim }, [
      ['bucket', 113, 486],
      ['swallow', 143, 56],
      ['rake', 154, 342],
      ['crow', 258, 355],
      ['tent', 302, 458],
      ['paperPlane', 362, 96],
      ['haybale', 488, 430],
      ['sparrow', 541, 484],
      ['hotAirBalloon', 570, 43],
      ['dragonfly', 755, 155],
    ]),
})
