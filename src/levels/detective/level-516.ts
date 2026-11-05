// "The circus mystery", scene 1 — the ring before the show: the ringmaster's top hat gone from its
// pole, the rope ladder let down, unicycle tracks in the sawdust, the spotlight off, white glove prints
// on the drum, a stool knocked over, a pennant missing from the string and a banana peel.
import { decor, extras } from '../extras.ts'
import { detectiveLevel } from '../helpers.ts'
import { bananaPeel, glovePrint, spotlight, topHat } from './shapes.ts'

const PENNANTS = ['#f2b632', '#3a6ea5', '#3fbf5f', '#8e6bbf']
const HEADS = ['#f2c9a0', '#e8b88c', '#c98a5e', '#8a5a2b', '#f0c4a0']

/** Rope ladder of the hat pole: rolled up under the crossbar (A) or let down (B). Bounds: x 586–614, y 148–308. */
const ladder = (down: boolean) =>
  down
    ? `<path d="M590 150V306M610 150V306" stroke="#c9953f" stroke-width="3"/>` +
      Array.from({ length: 7 }, (_, i) => `<path d="M590 ${168 + i * 22}H610" stroke="#a8743f" stroke-width="4"/>`).join('')
    : `<rect x="586" y="148" width="28" height="18" rx="9" fill="#c9953f"/><path d="M594 152h12M594 158h12" stroke="#a8743f" stroke-width="2"/>`

/** Clown stool on the floor at y 362: upright (A) or lying on its side (B). Bounds: x 176–222, y 320–364. */
const stool = (upright: boolean) =>
  upright
    ? `<path d="M188 330L182 362M212 330L218 362M200 330V362" stroke="#8a5a2b" stroke-width="5" stroke-linecap="round"/><ellipse cx="200" cy="327" rx="22" ry="7" fill="#f2b632"/>`
    : `<path d="M186 334H220M186 344H220M186 354H220" stroke="#8a5a2b" stroke-width="5" stroke-linecap="round"/><ellipse cx="183" cy="344" rx="7" ry="18" fill="#f2b632"/>`

export default detectiveLevel({
  id: 516,
  case: 'circus',
  title: 'circusRing',
  parTimeSec: 96,
  scene: ({ clue, anim, extra }) =>
    // Tent wall, stands full of people, sawdust floor and the ring
    `<rect width="800" height="240" fill="#fff1dc"/>` +
    Array.from({ length: 10 }, (_, i) => `<path d="M${i * 80} 0h40l-6 240h-28Z" fill="#e5484d"/>`).join('') +
    `<rect y="226" width="800" height="90" fill="#5b3a4a"/>` +
    [0, 1].map((row) => Array.from({ length: 25 }, (_, i) => `<circle cx="${16 + i * 32 + row * 16}" cy="${252 + row * 30}" r="10" fill="${HEADS[(i * 3 + row) % 5]}"/>`).join('')).join('') +
    `<rect y="310" width="800" height="190" fill="#c98a5e"/>` +
    `<ellipse cx="400" cy="410" rx="340" ry="76" fill="#e8c48a" stroke="#b83236" stroke-width="14"/>` +
    Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2
      return `<circle cx="${(400 + Math.cos(a) * 340).toFixed(1)}" cy="${(410 + Math.sin(a) * 76).toFixed(1)}" r="4" fill="#f2c14e"/>`
    }).join('') +
    // Pennants on a string, one of them gone
    `<path d="M0 186H800" stroke="#5e3b1a" stroke-width="2"/>` +
    Array.from({ length: 20 }, (_, i) => {
      const flag = `<path d="M${10 + i * 40} 186h20l-10 22Z" fill="${PENNANTS[i % 4]}"/>`
      return i === 8 ? clue('pennantGone', 340, 196, 20, flag, '') : flag
    }).join('') +
    // Trapeze swinging under the roof
    anim(
      { type: 'sway', angle: 6, pivot: [250, 0], period: 3.2 },
      `<path d="M222 0V110M278 0V110" stroke="#8a8f99" stroke-width="3"/><path d="M216 110H284" stroke="#e5484d" stroke-width="7" stroke-linecap="round"/>`,
    ) +
    clue('spotlightOff', 400, 44, 22, spotlight(400, 44, true), spotlight(400, 44, false)) +
    // The ringmaster's hat pole with its crossbar and rope ladder
    `<rect x="636" y="104" width="8" height="270" fill="#c9953f"/><ellipse cx="640" cy="374" rx="22" ry="6" fill="#8a5a2b"/>` +
    `<path d="M640 104v-6a6 6 0 0 1 12 0" fill="none" stroke="#8a8f99" stroke-width="3"/><path d="M644 150H584" stroke="#8a5a2b" stroke-width="6"/>` +
    clue('hatGone', 640, 86, 32, topHat(640, 104), '') +
    clue('ropeLadder', 600, 228, 82, ladder(false), ladder(true)) +
    // Drum pedestal and the stools
    `<rect x="446" y="318" width="70" height="62" fill="#3a6ea5"/><path d="M446 334l12 14l12 -14l12 14l12 -14l12 14l10 -12" fill="none" stroke="#f2c14e" stroke-width="3"/>` +
    `<ellipse cx="481" cy="380" rx="35" ry="9" fill="#2a5585"/><ellipse cx="481" cy="318" rx="35" ry="9" fill="#5b8db8"/>` +
    clue('glovePrints', 481, 347, 26, '', glovePrint(470, 352) + glovePrint(492, 348)) +
    clue('stoolTipped', 200, 343, 33, stool(true), stool(false)) +
    `<path d="M108 328L102 362M132 328L138 362M120 328V362" stroke="#8a5a2b" stroke-width="5" stroke-linecap="round"/><ellipse cx="120" cy="325" rx="22" ry="7" fill="#3fbf5f"/>` +
    // Ball by the ring and the sawdust tracks
    `<circle cx="700" cy="444" r="26" fill="#f2b632"/><path d="M676 436q24 14 48 0M680 456q20 10 40 0" stroke="#e5484d" stroke-width="5" fill="none"/>` +
    clue('unicycleTracks', 300, 424, 62, '', `<ellipse cx="300" cy="424" rx="58" ry="14" fill="none" stroke="#a8743f" stroke-width="3" stroke-dasharray="8 6"/>`) +
    clue('bananaPeel', 540, 452, 22, '', bananaPeel(540, 452)) +
    // Decor of every mode and the extra objects of hard mode (docs/hard-mode-extra-objects.md).
    decor({ anim }, [
      ['boots', 41, 487, '#4fa3c7'],
      ['teddy', 195, 470, '#c98a6a'],
      ['toyDrum', 475, 435],
      ['haybale', 628, 405],
      ['pouf', 758, 484, '#4fb3a9'],
    ]) +
    extras({ extra, anim }, [
      ['bucket', 38, 406],
      ['spider', 65, 117],
      ['mouse', 107, 479],
      ['broom', 136, 438],
      ['bunting', 392, 118],
      ['sparrow', 426, 444],
      ['birdcage', 543, 46],
      ['umbrellaStand', 613, 472],
      ['newspapers', 663, 483],
      ['wateringCan', 708, 412],
    ]),
})
