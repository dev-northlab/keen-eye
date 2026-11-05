// "The ski lodge mystery", scene 2 — the ski room: a pair of skis gone from the rack, fresh wax shavings
// on the snowboard in the vice, a route drawn on the trail map, the bulb out, a locker open, the helmet
// knocked over, goggles and a scarf gone from their hooks, snow on the bench and the sled turned over.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'

const SKIS: [number, string][] = [[50, '#3a6ea5'], [100, '#f2b632'], [150, '#e5484d'], [200, '#3fbf5f']]

/** Pair of skis standing in the rack, left ski at x. Bounds: x from −4 to +20, y 226–390. */
const skis = (x: number, color: string) =>
  [x, x + 12].map((sx) => `<path d="M${sx - 4} 390V238Q${sx - 4} 226 ${sx} 226Q${sx + 4} 226 ${sx + 4} 238V390Z" fill="${color}"/><path d="M${sx} 250V380" stroke="#fff" stroke-width="1.4"/>`).join('')

/** Route drawn on the trail map from the lodge to the summit. Bounds: x 376–440, y 90–194. */
const route = () =>
  `<path d="M380 190Q396 160 388 140T426 104" stroke="#e5484d" stroke-width="3" stroke-dasharray="6 4" fill="none"/>` +
  `<path d="M422 92l14 14M436 92l-14 14" stroke="#e5484d" stroke-width="3.4" stroke-linecap="round"/>`

const bulb = (on: boolean) =>
  (on ? `<circle cx="560" cy="42" r="20" fill="#ffd54a" fill-opacity="0.35"/>` : '') +
  `<rect x="555" y="24" width="10" height="8" fill="#8a8f99"/><circle cx="560" cy="40" r="9" fill="${on ? '#fff3b0' : '#b8bcc4'}"/>`

/** Ski helmet on top of the first locker: upright (A) or knocked onto its side (B). Bounds: x 593–637, y 92–130. */
const helmet = () => `<path d="M595 130Q595 100 615 100Q635 100 635 130Z" fill="#8e6bbf"/><rect x="599" y="118" width="32" height="8" rx="3" fill="#2b2b38"/>`

/** Goggles hanging from the hook at (610, 250). Bounds: x 590–630, y 250–290. */
const goggles = () =>
  `<path d="M610 252L594 276M610 252L626 276" stroke="#2b2b38" stroke-width="2.4"/><rect x="592" y="272" width="36" height="16" rx="8" fill="#f2994a"/><rect x="596" y="275" width="28" height="10" rx="5" fill="#ffd54a" fill-opacity="0.8"/>`

/** Striped scarf hanging from the hook at (690, 250). Bounds: x 676–704, y 248–340. */
const scarf = () =>
  `<path d="M680 254Q690 246 700 254V340H690V266H688V330H678Z" fill="#e5484d"/><path d="M678 290h10M678 310h10M690 300h10M690 322h10" stroke="#fff" stroke-width="4"/>`

/** Sled on the floor: on its runners (A) or upside down (B). Bounds: x 648–752, y 412–450. */
const sled = (up: boolean) =>
  up
    ? `<path d="M652 436H748Q756 436 752 428" stroke="#5b6b7a" stroke-width="4" fill="none"/><path d="M660 436V428M740 436V428" stroke="#5b6b7a" stroke-width="3"/><rect x="654" y="414" width="94" height="14" rx="4" fill="#c69563"/>` +
      `<path d="M680 414V428M704 414V428M728 414V428" stroke="#a8743f" stroke-width="2"/>`
    : `<rect x="654" y="434" width="94" height="14" rx="4" fill="#a8743f"/><path d="M652 418H748Q756 418 752 426" stroke="#5b6b7a" stroke-width="4" fill="none"/><path d="M660 418V434M740 418V434" stroke="#5b6b7a" stroke-width="3"/>`

export default detectiveLevel({
  id: 527,
  case: 'lodge',
  title: 'lodgeSkiRoom',
  parTimeSec: 120,
  scene: ({ clue, anim, extra }) =>
    `<rect width="800" height="400" fill="#c7d8e8"/><path d="${Array.from({ length: 20 }, (_, i) => `M${i * 40 + 20} 0V400`).join('')}" stroke="#b3c6d8" stroke-width="2"/>` +
    `<rect y="400" width="800" height="100" fill="#5b6b7a"/><path d="${Array.from({ length: 4 }, (_, i) => `M0 ${420 + i * 22}H800`).join('')}" stroke="#4a5866" stroke-width="2"/>` +
    // Ski rack
    SKIS.filter(([x]) => x !== 150).map(([x, c]) => skis(x, c)).join('') +
    clue('skisGone', 156, 308, 84, skis(150, '#e5484d'), '') +
    `<rect x="30" y="250" width="220" height="10" rx="3" fill="#8a5a2b"/><rect x="30" y="370" width="220" height="10" rx="3" fill="#8a5a2b"/>` +
    // Waxing bench with the snowboard in the vice
    `<path d="M320 312V400M500 312V400" stroke="#6b4a2b" stroke-width="10"/><rect x="300" y="300" width="220" height="14" rx="3" fill="#8a5a2b"/>` +
    `<rect x="312" y="286" width="196" height="14" rx="7" fill="#8e6bbf"/><path d="M340 293h40M400 293l20 0" stroke="#f2c14e" stroke-width="4"/>` +
    `<rect x="318" y="276" width="14" height="30" fill="#5b6b7a"/>` +
    clue(
      'boardWaxed',
      470,
      286,
      34,
      '',
      `<path d="M442 290H500" stroke="#fff" stroke-opacity="0.7" stroke-width="4"/><rect x="464" y="276" width="16" height="10" rx="2" fill="#e8f6ff" stroke="#a9c7dc" stroke-width="1.2"/>` +
        `<path d="M446 284q4 -6 8 0q4 -6 8 0M486 282q4 -6 8 0" stroke="#e8f6ff" stroke-width="2.4" fill="none"/>`,
    ) +
    // Trail map
    `<rect x="350" y="70" width="130" height="140" rx="4" fill="#f5f2ea" stroke="#8a5a2b" stroke-width="4"/>` +
    `<path d="M360 196L430 92L470 196Z" fill="#dfe8f2"/><path d="M430 92L400 196M430 92L450 196" stroke="#3a6ea5" stroke-width="2"/><path d="M430 92Q440 140 462 190" stroke="#2b2b38" stroke-width="2" fill="none"/>` +
    `<rect x="372" y="186" width="16" height="12" fill="#a8743f"/><path d="M370 186l10 -8l10 8Z" fill="#b83236"/>` +
    clue('trailMapMarked', 408, 142, 62, '', route()) +
    `<path d="M560 0V24" stroke="#555" stroke-width="2"/>` +
    clue('bulbOff', 560, 40, 22, bulb(true), bulb(false)) +
    // Lockers
    [580, 650, 720].map((x) => `<rect x="${x}" y="130" width="70" height="90" fill="#3f9b6b" stroke="#2f7d55" stroke-width="3"/><path d="M${x + 16} 146h38M${x + 16} 154h38" stroke="#2f7d55" stroke-width="3"/><rect x="${x + 54}" y="172" width="6" height="16" rx="2" fill="#dfe3ea"/>`).join('') +
    clue('lockerOpen', 692, 175, 62, '', `<rect x="652" y="132" width="66" height="86" fill="#1f2d24"/><path d="M670 140h30v40l-15 -6l-15 6Z" fill="#5b8db8"/><rect x="718" y="128" width="14" height="94" fill="#5cb382" stroke="#2f7d55" stroke-width="2"/>`) +
    clue('helmetFallen', 615, 112, 30, helmet(), `<g transform="rotate(-100 615 116)">${helmet()}</g>`) +
    // Hooks, the bench and the sled
    `<rect x="580" y="244" width="210" height="8" rx="3" fill="#8a5a2b"/>` +
    [610, 690, 750].map((x) => `<path d="M${x} 250v6q0 4 4 4" stroke="#5b6b7a" stroke-width="3" fill="none"/>`).join('') +
    clue('gogglesGone', 610, 270, 30, goggles(), '') +
    clue('scarfGone', 690, 294, 48, scarf(), '') +
    `<path d="M736 256Q750 250 764 256L776 300L768 302V340H732V302L724 300Z" fill="#3a6ea5"/><path d="M750 258V340" stroke="#2a5585" stroke-width="2"/>` +
    `<rect x="580" y="352" width="210" height="12" rx="3" fill="#a8743f"/><path d="M596 364V400M774 364V400" stroke="#6b4a2b" stroke-width="8"/>` +
    clue('snowOnBench', 620, 344, 26, '', `<path d="M602 352Q600 336 614 338Q620 328 630 336Q642 336 640 352Z" fill="#f4f8fc" stroke="#c7d8e8" stroke-width="1.4"/><ellipse cx="636" cy="358" rx="8" ry="2.4" fill="#bfe6ff"/>`) +
    clue('sledTipped', 700, 432, 58, sled(true), sled(false)) +
    // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
    decor({ anim }, [
      ['bucket', 38, 486],
      ['antlers', 202, 127],
      ['fireExtinguisher', 422, 435],
      ['sconce', 467, 59],
      ['keyRack', 757, 69],
    ]) +
    extras({ extra, anim }, [
      ['roundMirror', 40, 210],
      ['calendar', 48, 57],
      ['hatBox', 107, 446, '#7b5ea7'],
      ['pouf', 173, 484, '#f2994a'],
      ['newspapers', 223, 428],
      ['photoOval', 328, 56],
      ['cactus', 328, 488],
      ['spider', 360, 272],
      ['puppy', 538, 439, '#e8d7b8'],
      ['dartboard', 555, 195],
    ]),
})
