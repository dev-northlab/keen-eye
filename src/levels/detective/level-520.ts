// "The circus mystery", scene 5 — the trailers at night: a light on in the magician's trailer, its door
// ajar, white rabbit fur on the grass, the campfire out, a shirt gone from the washing line, playing
// cards dropped along the path, a flat tyre on the clown's trailer and a deck chair folded up.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { furTuft, playingCard } from './shapes.ts'

const STARS: [number, number][] = [[60, 40], [150, 90], [240, 30], [330, 70], [420, 24], [520, 60], [600, 110], [780, 40], [470, 110], [250, 120]]

const shirt = (x: number, top: number, color: string) =>
  `<path d="M${x - 14} ${top}H${x + 14}L${x + 20} ${top + 10}L${x + 14} ${top + 14}V${top + 44}H${x - 14}V${top + 14}L${x - 20} ${top + 10}Z" fill="${color}"/>` +
  `<path d="M${x - 8} ${top - 4}v8M${x + 8} ${top - 4}v8" stroke="#a8743f" stroke-width="3"/>`

/** Deck chair in front of the clown's trailer: open (A) or folded up (B). Bounds: x 696–746, y 360–420. */
const chair = (open: boolean) =>
  open
    ? `<path d="M700 420L736 368M744 420L712 384" stroke="#a8743f" stroke-width="4" stroke-linecap="round"/><path d="M704 404L734 370L742 376L714 410Z" fill="#3fbf5f"/><path d="M712 396l24 -24" stroke="#fff" stroke-width="3"/>`
    : `<path d="M714 420L718 362M726 420L722 362" stroke="#a8743f" stroke-width="4" stroke-linecap="round"/><rect x="714" y="368" width="12" height="40" rx="2" fill="#3fbf5f"/><path d="M720 368V408" stroke="#fff" stroke-width="3"/>`

export default detectiveLevel({
  id: 520,
  case: 'circus',
  title: 'circusTrailers',
  parTimeSec: 102,
  scene: ({ clue, anim, extra }) =>
    `<rect width="800" height="500" fill="#2b3a67"/>` +
    STARS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" fill="#fff3b0"/>`).join('') +
    `<circle cx="700" cy="70" r="30" fill="#fff3b0"/><circle cx="712" cy="62" r="26" fill="#2b3a67"/>` +
    `<rect y="360" width="800" height="140" fill="#4f6b3f"/><path d="M0 470Q300 420 520 440T800 430V500H0Z" fill="#8a7a5a"/>` +
    // The magician's trailer
    `<rect x="30" y="170" width="300" height="170" rx="30" fill="#4a3a7a"/><rect x="30" y="300" width="300" height="12" fill="#f2c14e"/>` +
    `<path d="M170 196l4 9l10 1l-8 6l3 10l-9 -6l-9 6l3 -10l-8 -6l10 -1Z" fill="#f2c14e"/>` +
    `<rect x="60" y="200" width="80" height="60" rx="6" fill="#c9953f"/>` +
    clue('windowLit', 100, 230, 40, `<rect x="68" y="208" width="64" height="44" fill="#1f2a4a"/>`, `<rect x="68" y="208" width="64" height="44" fill="#ffe680"/><path d="M80 246l16 -30M100 246l14 -24" stroke="#fff" stroke-opacity="0.6" stroke-width="3"/>`) +
    `<rect x="230" y="220" width="60" height="120" fill="#6b5aa6"/><circle cx="280" cy="282" r="4" fill="#f2c14e"/>` +
    clue('doorAjar', 239, 280, 60, '', `<rect x="232" y="222" width="14" height="116" fill="#1a1530"/><path d="M247 222V338" stroke="#8e7bd0" stroke-width="3"/>`) +
    `<path d="M0 300H30" stroke="#5b6b7a" stroke-width="6"/><g fill="#2b2b38"><circle cx="80" cy="346" r="20"/><circle cx="190" cy="346" r="20"/></g><g fill="#c9953f"><circle cx="80" cy="346" r="7"/><circle cx="190" cy="346" r="7"/></g>` +
    clue('rabbitFur', 183, 402, 28, '', furTuft(170, 398) + furTuft(196, 408)) +
    // Washing line
    `<path d="M360 140V360M580 140V360" stroke="#6b4a2b" stroke-width="6"/><path d="M360 150Q470 172 580 150" stroke="#dfe3ea" stroke-width="2" fill="none"/>` +
    shirt(392, 156, '#5b8db8') +
    shirt(440, 162, '#f28fb1') +
    clue('washingGone', 490, 184, 30, shirt(490, 162, '#f2b632'), '') +
    shirt(540, 158, '#fff') +
    // Campfire
    `<g fill="#8a8f99"><circle cx="390" cy="404" r="8"/><circle cx="450" cy="404" r="8"/><circle cx="404" cy="412" r="8"/><circle cx="436" cy="412" r="8"/></g>` +
    clue(
      'campfireOut',
      420,
      376,
      36,
      `<path d="M420 340Q446 368 434 392H406Q394 368 420 340Z" fill="#ff8a3d"/><path d="M420 362Q432 378 426 392H414Q408 378 420 362Z" fill="#ffd54a"/>`,
      `<path d="M420 386q-8 -10 0 -20t0 -20" stroke="#9a9aa6" stroke-width="3" stroke-linecap="round" fill="none"/>`,
    ) +
    `<path d="M396 404L444 388M396 388L444 404" stroke="#6b4a2b" stroke-width="8" stroke-linecap="round"/>` +
    `<rect x="470" y="404" width="60" height="16" rx="8" fill="#8a5a2b"/>` +
    clue('cardTrail', 581, 447, 36, '', playingCard(566, 444, 14) + playingCard(596, 450, -30)) +
    // The clown's trailer
    `<rect x="600" y="190" width="180" height="150" rx="24" fill="#f2b632"/><path d="M600 290H780" stroke="#e5484d" stroke-width="12"/>` +
    `<circle cx="700" cy="240" r="20" fill="#fff"/><circle cx="700" cy="240" r="14" fill="#1f2a4a"/>` +
    anim({ type: 'sway', angle: 10, pivot: [640, 190], period: 2.6 }, `<path d="M640 190V164" stroke="#5e3b1a" stroke-width="3"/><path d="M640 164l20 6l-20 6Z" fill="#e5484d"/>`) +
    `<circle cx="740" cy="350" r="20" fill="#2b2b38"/><circle cx="740" cy="350" r="7" fill="#c9953f"/>` +
    clue(
      'flatTyre',
      650,
      350,
      28,
      `<circle cx="650" cy="350" r="20" fill="#2b2b38"/><circle cx="650" cy="350" r="7" fill="#c9953f"/>`,
      `<ellipse cx="650" cy="357" rx="24" ry="13" fill="#2b2b38"/><circle cx="650" cy="354" r="6" fill="#c9953f"/>`,
    ) +
    clue('chairFolded', 720, 392, 40, chair(true), chair(false)) +
    // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
    decor({ anim }, [
      ['shovel', 98, 455],
      ['wheelbarrow', 269, 481],
      ['bench', 334, 472],
      ['molehill', 658, 484],
      ['bucket', 753, 486],
    ]) +
    extras({ extra, anim }, [
      ['mouse', 47, 379],
      ['bat', 48, 151],
      ['firefly', 209, 484],
      ['hotAirBalloon', 240, 93],
      ['fox', 261, 402],
      ['tortoise', 331, 368],
      ['crow', 478, 485],
      ['owl', 545, 380],
      ['plane', 550, 83],
      ['skyLantern', 757, 35],
    ]),
})
