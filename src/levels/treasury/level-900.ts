// "Treasury" (docs/hidden-item-feature.md): the bonus level opened by the keys of every chapter.
// A vault under a beamed ceiling: torches, an open chest of gold, a coin heap with a crown.
// Motion differences: the lantern swings wider on picture B; the sparkle over the chest blinks faster on B.
import { svgLevel } from '../helpers.ts'
import { level900Redesign } from './level-900-redesign.ts'

const GOLD = '#f7c948'
const GOLD_DARK = '#c9952c'

/** Wall torch; (x, y) = bracket center. Bounds: x ±14, y from −40 to +30. */
const torch = (x: number, y: number, flame: string) =>
  `<circle cx="${x}" cy="${y - 22}" r="46" fill="#ffb347" fill-opacity="0.16"/>` +
  `<path d="M${x - 10} ${y + 6}h20l-6 24h-8Z" fill="#5e3b1a"/><rect x="${x - 12}" y="${y - 2}" width="24" height="9" rx="2" fill="#8a8f99"/>` +
  flame

/** Torch flame on the bracket at (x, y). Bounds: x ±10, y from −36 to −2. */
const flame = (x: number, y: number) =>
  `<path d="M${x} ${y - 36}q12 14 9 26q-3 8 -9 8t-9 -8q-3 -12 9 -26Z" fill="#ff8c1a"/>` +
  `<path d="M${x} ${y - 24}q6 8 4 14q-1 4 -4 4t-4 -4q-2 -6 4 -14Z" fill="#ffe066"/>`

/** Four-point sparkle; (x, y) = center, `s` = half size. */
const sparkle = (x: number, y: number, s: number) =>
  `<path d="M${x} ${y - s}Q${x + s * 0.18} ${y - s * 0.18} ${x + s} ${y}Q${x + s * 0.18} ${y + s * 0.18} ${x} ${y + s}Q${x - s * 0.18} ${y + s * 0.18} ${x - s} ${y}Q${x - s * 0.18} ${y - s * 0.18} ${x} ${y - s}Z" fill="#fffbe0"/>`

/** Crown; (x, y) = center. Bounds: x ±20, y ±13. */
const crown = (x: number, y: number, gem: string) =>
  `<path d="M${x - 20} ${y + 13}V${y - 8}l10 9l10 -14l10 14l10 -9V${y + 13}Z" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="2" stroke-linejoin="round"/>` +
  `<circle cx="${x}" cy="${y + 5}" r="4.5" fill="${gem}"/><circle cx="${x - 12}" cy="${y + 6}" r="2.5" fill="#fff8dc"/><circle cx="${x + 12}" cy="${y + 6}" r="2.5" fill="#fff8dc"/>`

/** Goblet; (x, y) = center. Bounds: x ±11, y ±17. */
const goblet = (x: number, y: number) =>
  `<path d="M${x - 11} ${y - 17}h22q0 16 -11 18q-11 -2 -11 -18Z" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="2"/>` +
  `<path d="M${x} ${y + 1}v10M${x - 8} ${y + 15}h16" stroke="${GOLD_DARK}" stroke-width="4" stroke-linecap="round"/>` +
  `<circle cx="${x}" cy="${y - 9}" r="3" fill="#e63946"/>`

/** Potion bottle standing on y; (x, y) = bottom center. Bounds: x ±10, y from −34 to 0. */
const bottle = (x: number, y: number, color: string) =>
  `<path d="M${x - 4} ${y - 34}h8v10q6 4 6 12v12h-20v-12q0 -8 6 -12Z" fill="${color}" stroke="#2a1d15" stroke-width="1.5"/>` +
  `<rect x="${x - 5}" y="${y - 36}" width="10" height="5" rx="1" fill="#8a5a2b"/>` +
  `<path d="M${x - 6} ${y - 12}v8" stroke="#fff" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round"/>`

/** Stack of `n` coins standing on y; (x, y) = bottom center. Bounds: x ±13, y from −(7n + 2) to +5. */
const coins = (x: number, y: number, n: number) =>
  Array.from({ length: n }, (_, i) =>
    `<ellipse cx="${x}" cy="${y - i * 7}" rx="12" ry="4.5" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="1.5"/>`,
  ).join('')

/** Shield emblem; (x, y) = center. Bounds: ±14. */
const star = (x: number, y: number) =>
  `<path d="M${x} ${y - 14}l4 9l10 1l-7.5 6.5l2.5 10l-9 -5.5l-9 5.5l2.5 -10l-7.5 -6.5l10 -1Z" fill="${GOLD}"/>`
const cross = (x: number, y: number) => `<path d="M${x - 4} ${y - 14}h8v10h10v8h-10v10h-8v-10h-10v-8h10Z" fill="${GOLD}"/>`

/** Padlock of the small chest; (x, y) = center. Bounds: x ±8, y ±10. */
const roundLock = (x: number, y: number) =>
  `<path d="M${x - 5} ${y - 2}v-4a5 5 0 0 1 10 0v4" fill="none" stroke="#8a8f99" stroke-width="2.5"/>` +
  `<rect x="${x - 8}" y="${y - 2}" width="16" height="12" rx="3" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="1.5"/>`
const heartLock = (x: number, y: number) =>
  `<path d="M${x - 5} ${y - 2}v-4a5 5 0 0 1 10 0v4" fill="none" stroke="#8a8f99" stroke-width="2.5"/>` +
  `<path d="M${x} ${y + 10}l-8 -8a4.2 4.2 0 0 1 8 -4a4.2 4.2 0 0 1 8 4Z" fill="#e63946" stroke="#8c1c24" stroke-width="1.5" stroke-linejoin="round"/>`

/** Sword hilt sticking out of the barrel; (x, y) = crossguard center. Bounds: x ±14, y from −16 to +8. */
const hilt = (x: number, y: number, guard: string) =>
  `<path d="M${x} ${y - 4}v-10" stroke="#5e3b1a" stroke-width="4" stroke-linecap="round"/><circle cx="${x}" cy="${y - 15}" r="3.5" fill="${guard}"/>` +
  `<rect x="${x - 13}" y="${y - 3}" width="26" height="6" rx="3" fill="${guard}"/>`

/** Lantern hanging from the hook at (x, y). Bounds: x ±14, y from 0 to +52 (zone center y + 30). */
const lantern = (x: number, y: number) =>
  `<path d="M${x} ${y}v12" stroke="#3b2a1a" stroke-width="2.5"/>` +
  `<path d="M${x - 10} ${y + 12}h20l4 8h-28Z" fill="#3b2a1a"/>` +
  `<rect x="${x - 11}" y="${y + 20}" width="22" height="24" fill="#ffe08a" stroke="#3b2a1a" stroke-width="3"/>` +
  `<path d="M${x} ${y + 20}v24" stroke="#3b2a1a" stroke-width="2"/>` +
  `<path d="M${x - 13} ${y + 44}h26l-4 7h-18Z" fill="#3b2a1a"/>`

export default svgLevel({
  id: 900,
  chapter: 'treasury',
  title: 'treasury',
  parTimeSec: 150,
  multiplayerReady: false,
  redesign: level900Redesign,
  scene: ({ diff, anim, rand }) => {
    // Wall stones in staggered rows, each a little lighter or darker.
    let stones = ''
    for (let row = 0; row < 9; row++) {
      for (let col = -1; col < 10; col++) {
        const x = col * 90 + (row % 2) * 45
        const shade = ['#4f3d30', '#55422f', '#4a392c', '#5a4634'][Math.floor(rand() * 4)]
        stones += `<rect x="${x + 2}" y="${34 + row * 40 + 2}" width="86" height="36" rx="5" fill="${shade}"/>`
      }
    }
    // Coins scattered on the floor, away from the differences on it.
    let scattered = ''
    for (let i = 0; i < 14; i++) {
      const x = 30 + rand() * 740
      const y = 455 + rand() * 40
      if ([245, 520, 650].some((cx) => Math.abs(x - cx) < 40)) continue
      scattered += `<ellipse cx="${x}" cy="${y}" rx="7" ry="3" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="1"/>`
    }
    // Sparkles over the gold, all blinking in their own rhythm (the same in both pictures).
    const twinkles = [
      [360, 318, 7],
      [300, 418, 6],
      [118, 400, 6],
      [190, 428, 5],
      [470, 352, 6],
      [92, 168, 5],
    ]
      .map(([x, y, s], i) => anim({ type: 'blink', period: 1.4 + i * 0.35, phase: i * 0.2, duty: 0.55 }, sparkle(x, y, s)))
      .join('')
    const swing = (angle: number) => anim({ id: 'lantern', type: 'sway', angle, pivot: [400, 60], period: 3 }, lantern(400, 60))
    const shine = sparkle(440, 296, 12)

    return (
      `<rect width="800" height="500" fill="#3f3026"/>` +
      stones +
      // Arch behind the chest, the glow of the gold inside it
      `<path d="M260 380V250a140 120 0 0 1 280 0V380Z" fill="#6b5340"/><path d="M280 380V254a120 104 0 0 1 240 0V380Z" fill="#2a1d15"/>` +
      `<ellipse cx="400" cy="330" rx="150" ry="90" fill="#ffd166" fill-opacity="0.18"/>` +
      // Beamed ceiling with the lantern hook
      `<rect width="800" height="36" fill="#5e3b1a"/><path d="M0 36H800" stroke="#3b2a1a" stroke-width="4"/>` +
      `<path d="M120 0v36M400 0v36M680 0v36" stroke="#4a2e14" stroke-width="6"/>` +
      `<path d="M400 36v24" stroke="#3b2a1a" stroke-width="2.5"/>` +
      diff(400, 90, 30, swing(8), swing(20), 'lantern') +
      // Cobweb in the corner
      `<path d="M0 36q30 10 40 40M0 36q22 26 18 54M0 36q40 2 66 16M6 52q14 -2 22 -12M8 70q18 -6 26 -22M12 84q22 -10 32 -28" fill="none" stroke="#e8e0d0" stroke-opacity="0.45" stroke-width="1.2"/>` +
      // Torches
      torch(80, 190, anim({ type: 'sway', angle: 7, pivot: [80, 188], period: 0.9 }, flame(80, 188))) +
      torch(720, 190, anim({ type: 'sway', angle: 7, pivot: [720, 188], period: 1.1, phase: 0.4 }, flame(720, 188))) +
      // Shelf of potions
      `<rect x="36" y="262" width="170" height="10" rx="2" fill="#8a5a2b"/><path d="M50 272l10 16M192 272l-10 16" stroke="#5e3b1a" stroke-width="5"/>` +
      bottle(66, 262, '#3a86ff') +
      diff(106, 244, 22, bottle(106, 262, '#4caf50'), bottle(106, 262, '#9b5de5')) +
      bottle(146, 262, '#e63946') +
      `<rect x="168" y="234" width="12" height="28" fill="#2f6f9f"/><rect x="181" y="230" width="14" height="32" fill="#8c1c24"/>` +
      // Shield on the wall
      `<path d="M566 166h68v34q0 34 -34 50q-34 -16 -34 -50Z" fill="#2f5e9e" stroke="${GOLD_DARK}" stroke-width="5" stroke-linejoin="round"/>` +
      diff(600, 202, 20, star(600, 202), cross(600, 202)) +
      // Floor
      `<rect y="380" width="800" height="120" fill="#5a3f2a"/><path d="M0 380H800" stroke="#3b2a1a" stroke-width="4"/>` +
      `<path d="M0 420H800M0 462H800" stroke="#4a3220" stroke-width="2"/>` +
      scattered +
      // Heap of coins with the crown
      `<path d="M70 456q20 -48 80 -52q60 4 80 52Z" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="2"/>` +
      `<path d="M96 440q10 -6 20 0M150 430q10 -6 20 0M186 446q10 -6 20 0M126 452q10 -6 20 0" stroke="${GOLD_DARK}" stroke-width="2" fill="none"/>` +
      diff(150, 400, 26, crown(150, 400, '#e63946'), crown(150, 400, '#3a86ff')) +
      diff(245, 448, 24, goblet(245, 448), '') +
      // The open chest: lid tipped back, gold heaped inside
      `<path d="M322 340L334 288H466L478 340Z" fill="#7a4a24" stroke="#3b2a1a" stroke-width="3" stroke-linejoin="round"/>` +
      `<path d="M330 330L340 296H460L470 330" fill="none" stroke="${GOLD_DARK}" stroke-width="4"/>` +
      `<path d="M322 344q78 -40 156 0Z" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="2"/>` +
      `<circle cx="372" cy="330" r="5" fill="#e63946"/><circle cx="416" cy="326" r="5" fill="#3a86ff"/><circle cx="446" cy="334" r="4" fill="#4caf50"/>` +
      `<rect x="318" y="340" width="164" height="68" rx="4" fill="#8a5a2b" stroke="#3b2a1a" stroke-width="3"/>` +
      `<path d="M318 362H482M340 340V408M460 340V408" stroke="${GOLD_DARK}" stroke-width="5"/>` +
      `<rect x="390" y="356" width="20" height="18" rx="3" fill="${GOLD}" stroke="#3b2a1a" stroke-width="2"/>` +
      diff(440, 296, 22, anim({ type: 'blink', period: 1.6, duty: 0.6 }, shine), anim({ type: 'blink', period: 0.7, duty: 0.6 }, shine)) +
      twinkles +
      diff(520, 458, 26, coins(520, 470, 3), coins(520, 470, 5)) +
      // Small locked chest
      `<rect x="608" y="418" width="84" height="52" rx="4" fill="#7a4a24" stroke="#3b2a1a" stroke-width="3"/>` +
      `<path d="M608 418q42 -26 84 0Z" fill="#8a5a2b" stroke="#3b2a1a" stroke-width="3" stroke-linejoin="round"/>` +
      `<path d="M622 410V470M678 410V470" stroke="#8a8f99" stroke-width="4"/>` +
      diff(650, 440, 20, roundLock(650, 440), heartLock(650, 440)) +
      // Barrel of swords
      `<path d="M728 404V368M762 404V364" stroke="#c0c6cf" stroke-width="5" stroke-linecap="round"/>` +
      hilt(728, 364, '#8a8f99') +
      diff(762, 360, 22, hilt(762, 360, GOLD), hilt(762, 360, '#e63946')) +
      `<path d="M706 404h84l-6 76h-72Z" fill="#8a5a2b" stroke="#3b2a1a" stroke-width="3" stroke-linejoin="round"/>` +
      `<path d="M708 424h80M710 460h76" stroke="#5e3b1a" stroke-width="5"/>`
    )
  },
})
