// "The circus mystery", scene 2 — the dressing room: a mirror bulb gone out, the magician's own top hat
// squashed flat, the clown's wig gone from its stand, the lamp knocked crooked, a costume missing from
// the rack, a prop box opened, a playing card and silver glitter on the floor.
import { detectiveLevel } from '../helpers.ts'
import { boards, box, door, jar, playingCard, room, topHat } from './shapes.ts'

const bulb = (x: number, on: boolean) => `<circle cx="${x}" cy="72" r="8" fill="${on ? '#fff3b0' : '#b8bcc4'}" stroke="#c9953f" stroke-width="2"/>`

/** The magician's top hat on the table, squashed flat under something heavy. Bounds: x 196–244, y 230–252. */
const squashed = () =>
  `<path d="M198 248L202 236Q212 228 222 238L234 230L242 248Z" fill="#2b2b38"/><path d="M200 242Q214 236 222 242T240 240" stroke="#e5484d" stroke-width="4" fill="none"/>` +
  `<ellipse cx="220" cy="247" rx="24" ry="5" fill="#2b2b38"/>`

/** Orange curly wig on the head form at (330, 200). Bounds: x 294–366, y 158–212. */
const wig = () =>
  `<g fill="#f2994a">${[[306, 200], [310, 186], [320, 174], [334, 170], [348, 178], [354, 192]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="12"/>`).join('')}</g>`

/** Lamp shade hanging from the cord at (380, 66). Bounds: x 346–414, y 66–104. */
const shade = () => `<path d="M346 96Q350 66 380 66Q410 66 414 96Z" fill="#8e6bbf"/><ellipse cx="380" cy="98" rx="10" ry="6" fill="#fff3b0"/>`

/** Costume on a hanger of the rack, x ±22, y 132–220. */
const costume = (x: number, color: string, dots: string) =>
  `<path d="M${x - 18} 132H${x + 18}L${x + 22} 220H${x - 22}Z" fill="${color}"/>` +
  `<g fill="${dots}">${[[-8, 150], [8, 166], [-10, 186], [6, 204], [12, 142]].map(([dx, y]) => `<circle cx="${x + dx}" cy="${y}" r="3.5"/>`).join('')}</g>`

const star = (x: number, y: number, s = 5) =>
  `<path d="M${x} ${y - s}L${x + s * 0.3} ${y - s * 0.3}L${x + s} ${y}L${x + s * 0.3} ${y + s * 0.3}L${x} ${y + s}L${x - s * 0.3} ${y + s * 0.3}L${x - s} ${y}L${x - s * 0.3} ${y - s * 0.3}Z"/>`

export default detectiveLevel({
  id: 517,
  case: 'circus',
  title: 'circusDressingRoom',
  parTimeSec: 98,
  scene: ({ clue }) =>
    room('#f0d7e6', '#a8743f', 380) +
    boards(380, '#8a5a2b') +
    // Mirror with a row of bulbs
    `<rect x="70" y="80" width="200" height="150" rx="8" fill="#c9953f"/><rect x="82" y="92" width="176" height="126" fill="#dff1fb"/>` +
    `<path d="M100 200l40 -40M130 206l30 -30" stroke="#fff" stroke-width="5" stroke-linecap="round"/>` +
    [86, 116, 146, 206, 236, 266].map((x) => bulb(x, true)).join('') +
    clue('bulbOff', 176, 72, 20, bulb(176, true), bulb(176, false)) +
    // Dressing table with makeup
    `<rect x="72" y="262" width="10" height="118" fill="#6b4a2b"/><rect x="268" y="262" width="10" height="118" fill="#6b4a2b"/><rect x="60" y="250" width="230" height="14" rx="3" fill="#8a5a2b"/>` +
    jar(100, 250, '#f28fb1') +
    jar(134, 250, '#bfe6ff') +
    `<ellipse cx="166" cy="244" rx="12" ry="6" fill="#fff"/><circle cx="166" cy="238" r="5" fill="#f2c9a0"/>` +
    clue('squashedHat', 220, 231, 32, topHat(220, 250, '#8e6bbf'), squashed()) +
    // Wig stand
    `<path d="M330 226V376" stroke="#5b6b7a" stroke-width="6"/><ellipse cx="330" cy="378" rx="24" ry="5" fill="#5b6b7a"/><ellipse cx="330" cy="202" rx="22" ry="28" fill="#f5ecd8"/>` +
    clue('wigGone', 330, 184, 42, wig(), '') +
    // Lamp
    `<path d="M380 0V66" stroke="#555" stroke-width="3"/>` +
    clue('lampCrooked', 378, 86, 42, shade(), `<g transform="rotate(16 380 66)">${shade()}</g>`) +
    // Star poster and the door
    `<rect x="440" y="60" width="60" height="80" rx="3" fill="#2b2b38"/><g fill="#f2c14e">${star(470, 92, 16)}</g><rect x="448" y="120" width="44" height="8" rx="2" fill="#e5484d"/>` +
    door(410, 170, 100, 210, '#3f9b6b') +
    clue('boxOpen', 549, 351, 52, box(524, 380, 50, 36), box(524, 380, 50, 36, true)) +
    // Costume rack
    `<path d="M590 120H786M594 120V380M782 120V380" stroke="#8a8f99" stroke-width="6"/>` +
    [600, 650, 700, 750].map((x) => `<path d="M${x} 116v4l-16 12h32Z" fill="none" stroke="#5b6b7a" stroke-width="2.5"/>`).join('') +
    costume(600, '#f2b632', '#e5484d') +
    costume(650, '#e8913a', '#7a5233') +
    clue('costumeGone', 700, 176, 50, costume(700, '#e5484d', '#f2c14e'), '') +
    costume(750, '#4a3a7a', '#f2c14e') +
    `<rect x="600" y="340" width="40" height="40" rx="4" fill="#5b8db8"/><rect x="650" y="350" width="34" height="30" rx="4" fill="#e8457a"/>` +
    clue('playingCard', 250, 440, 22, '', playingCard(250, 440)) +
    clue('glitter', 470, 440, 26, '', `<g fill="#dfe3ea" stroke="#8a8f99" stroke-width="0.8">${star(456, 432)}${star(474, 426, 4)}${star(486, 444)}${star(462, 452, 4)}${star(478, 456, 3.5)}</g>`),
})
