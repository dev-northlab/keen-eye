// "Treasury" (docs/hidden-item-feature.md): the bonus level opened by the keys of every chapter, the hardest
// scene of the game: 15 small differences among a crowded vault. A beamed ceiling with a lantern, a bat and
// pennants; shelves of books and potions; an arch with the open chest of gold; a big treasure map pinned to the
// wall (four differences on it: the ship's sail, the palm, the X, the compass); a shield, a ring of keys, barrels,
// sacks, a coin heap with a crown and lots of loot on the floor.
// Motion differences: the lantern swings wider on B, the spider runs up and down its thread faster on B, the
// sparkle over the chest blinks faster on B.
import { svgLevel } from '../helpers.ts'
import { level900Redesign } from './level-900-redesign.ts'

const GOLD = '#f7c948'
const GOLD_DARK = '#c9952c'
const INK = '#3b2a1a'
const WOOD = '#8a5a2b'
const WOOD_DARK = '#5e3b1a'
const STEEL = '#8a8f99'
const PAPER = '#ecd9a8'
const MAP_INK = '#7a5530'

/** Wall torch; (x, y) = bracket center. Bounds: x ±14, y from −40 to +30. */
const torch = (x: number, y: number, flame: string) =>
  `<circle cx="${x}" cy="${y - 22}" r="46" fill="#ffb347" fill-opacity="0.16"/>` +
  `<path d="M${x - 10} ${y + 6}h20l-6 24h-8Z" fill="${WOOD_DARK}"/><rect x="${x - 12}" y="${y - 2}" width="24" height="9" rx="2" fill="${STEEL}"/>` +
  flame

/** Flame standing on (x, y), `s` = scale (1: a torch's). Bounds: x ±10s, y from −36s to −2s. */
const flame = (x: number, y: number, s = 1) =>
  `<path d="M${x} ${y - 36 * s}q${12 * s} ${14 * s} ${9 * s} ${26 * s}q${-3 * s} ${8 * s} ${-9 * s} ${8 * s}t${-9 * s} ${-8 * s}q${-3 * s} ${-12 * s} ${9 * s} ${-26 * s}Z" fill="#ff8c1a"/>` +
  `<path d="M${x} ${y - 24 * s}q${6 * s} ${8 * s} ${4 * s} ${14 * s}q${-1 * s} ${4 * s} ${-4 * s} ${4 * s}t${-4 * s} ${-4 * s}q${-2 * s} ${-6 * s} ${4 * s} ${-14 * s}Z" fill="#ffe066"/>`

/** Four-point sparkle; (x, y) = center, `s` = half size. */
const sparkle = (x: number, y: number, s: number) =>
  `<path d="M${x} ${y - s}Q${x + s * 0.18} ${y - s * 0.18} ${x + s} ${y}Q${x + s * 0.18} ${y + s * 0.18} ${x} ${y + s}Q${x - s * 0.18} ${y + s * 0.18} ${x - s} ${y}Q${x - s * 0.18} ${y - s * 0.18} ${x} ${y - s}Z" fill="#fffbe0"/>`

/** Crown; (x, y) = center. Bounds: x ±20, y ±13. */
const crown = (x: number, y: number, gem: string) =>
  `<path d="M${x - 20} ${y + 13}V${y - 8}l10 9l10 -14l10 14l10 -9V${y + 13}Z" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="2" stroke-linejoin="round"/>` +
  `<circle cx="${x}" cy="${y + 5}" r="4.5" fill="${gem}"/><circle cx="${x - 12}" cy="${y + 6}" r="2.5" fill="#fff8dc"/><circle cx="${x + 12}" cy="${y + 6}" r="2.5" fill="#fff8dc"/>`

/** Goblet, with a gem on its cup unless `gem` is empty; (x, y) = center. Bounds: x ±11, y ±17. */
const goblet = (x: number, y: number, gem: string) =>
  `<path d="M${x - 11} ${y - 17}h22q0 16 -11 18q-11 -2 -11 -18Z" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="2"/>` +
  `<path d="M${x} ${y + 1}v10M${x - 8} ${y + 15}h16" stroke="${GOLD_DARK}" stroke-width="4" stroke-linecap="round"/>` +
  (gem ? `<circle cx="${x}" cy="${y - 9}" r="4.5" fill="${gem}" stroke="#8c1c24" stroke-width="1"/>` : '')

/** Potion bottle standing on y; (x, y) = bottom center. Bounds: x ±10, y from −36 to 0. */
const bottle = (x: number, y: number, color: string, cork = WOOD) =>
  `<path d="M${x - 4} ${y - 34}h8v10q6 4 6 12v12h-20v-12q0 -8 6 -12Z" fill="${color}" stroke="#2a1d15" stroke-width="1.5"/>` +
  `<rect x="${x - 5}" y="${y - 36}" width="10" height="5" rx="1" fill="${cork}"/>` +
  `<path d="M${x - 6} ${y - 12}v8" stroke="#fff" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round"/>`

/** Round jar standing on y; (x, y) = bottom center. Bounds: x ±11, y from −24 to 0. */
const jar = (x: number, y: number, color: string) =>
  `<rect x="${x - 7}" y="${y - 24}" width="14" height="5" rx="2" fill="${WOOD_DARK}"/>` +
  `<path d="M${x - 7} ${y - 19}q-4 2 -4 8v8q0 3 3 3h16q3 0 3 -3v-8q0 -6 -4 -8Z" fill="${color}" stroke="#2a1d15" stroke-width="1.5"/>`

/** Book standing on y; (x, y) = bottom left corner. */
const book = (x: number, y: number, w: number, h: number, color: string) =>
  `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="1.5" fill="${color}" stroke="#2a1d15" stroke-width="1.2"/>` +
  `<path d="M${x + 2} ${y - h + 5}h${w - 4}M${x + 2} ${y - 6}h${w - 4}" stroke="${GOLD}" stroke-width="1.5"/>`

/** Hourglass standing on y; (x, y) = bottom center. Bounds: x ±10, y from −34 to 0. `top` = sand still up. */
const hourglass = (x: number, y: number, top: boolean) =>
  `<path d="M${x - 7} ${y - 30}h14q0 9 -6 13q6 4 6 13h-14q0 -9 6 -13q-6 -4 -6 -13Z" fill="#dff1f7" fill-opacity="0.75" stroke="#2a1d15" stroke-width="1.2"/>` +
  (top
    ? `<path d="M${x - 5} ${y - 27}h10q0 6 -5 9q-5 -3 -5 -9Z" fill="#e8b04a"/><path d="M${x - 4} ${y - 4}h8l-4 -2Z" fill="#e8b04a"/>`
    : `<path d="M${x - 1.5} ${y - 22}h3l-1.5 3Z" fill="#e8b04a"/><path d="M${x - 5} ${y - 4}q0 -6 5 -9q5 3 5 9Z" fill="#e8b04a"/>`) +
  `<rect x="${x - 10}" y="${y - 34}" width="20" height="4" rx="1.5" fill="${WOOD_DARK}"/><rect x="${x - 10}" y="${y - 4}" width="20" height="4" rx="1.5" fill="${WOOD_DARK}"/>`

/** Candle standing on y; (x, y) = bottom center. Bounds: x ±9, y from −34 to 0. */
const candle = (x: number, y: number, light: string) =>
  `<ellipse cx="${x}" cy="${y - 1}" rx="9" ry="3" fill="${STEEL}"/><rect x="${x - 4}" y="${y - 20}" width="8" height="19" fill="#fff4d6"/>` +
  `<path d="M${x} ${y - 20}v-3" stroke="${INK}" stroke-width="1.2"/>` +
  light

/** Stack of `n` coins standing on y; (x, y) = bottom center. Bounds: x ±13, y from −(7n + 2) to +5. */
const coins = (x: number, y: number, n: number) =>
  Array.from({ length: n }, (_, i) =>
    `<ellipse cx="${x}" cy="${y - i * 7}" rx="12" ry="4.5" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="1.5"/>`,
  ).join('')

/** Shield emblem; (x, y) = center. Bounds: ±14. */
const star = (x: number, y: number) =>
  `<path d="M${x} ${y - 14}l4 9l10 1l-7.5 6.5l2.5 10l-9 -5.5l-9 5.5l2.5 -10l-7.5 -6.5l10 -1Z" fill="${GOLD}"/>`
const gemStar = (x: number, y: number) => star(x, y) + `<circle cx="${x}" cy="${y + 1}" r="3.5" fill="#e63946" stroke="#8c1c24" stroke-width="1"/>`

/** Padlock of the small chest, with or without a keyhole; (x, y) = center. Bounds: x ±8, y ±11. */
const padlock = (x: number, y: number, keyhole: boolean) =>
  `<path d="M${x - 5} ${y - 2}v-4a5 5 0 0 1 10 0v4" fill="none" stroke="${STEEL}" stroke-width="2.5"/>` +
  `<rect x="${x - 8}" y="${y - 2}" width="16" height="12" rx="3" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="1.5"/>` +
  (keyhole ? `<circle cx="${x}" cy="${y + 2.5}" r="2.6" fill="${INK}"/><path d="M${x} ${y + 3}v4.5" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>` : '')

/** Sword hilt sticking out of a barrel; (x, y) = crossguard center. Bounds: x ±14, y from −19 to +3. */
const hilt = (x: number, y: number, guard: string) =>
  `<path d="M${x} ${y - 4}v-10" stroke="${WOOD_DARK}" stroke-width="4" stroke-linecap="round"/><circle cx="${x}" cy="${y - 15}" r="3.5" fill="${guard}"/>` +
  `<rect x="${x - 13}" y="${y - 3}" width="26" height="6" rx="3" fill="${guard}"/>`

/** Lantern hanging from the hook at (x, y). Bounds: x ±14, y from 0 to +52. */
const lantern = (x: number, y: number) =>
  `<path d="M${x} ${y}v12" stroke="${INK}" stroke-width="2.5"/>` +
  `<path d="M${x - 10} ${y + 12}h20l4 8h-28Z" fill="${INK}"/>` +
  `<rect x="${x - 11}" y="${y + 20}" width="22" height="24" fill="#ffe08a" stroke="${INK}" stroke-width="3"/>` +
  `<path d="M${x} ${y + 20}v24" stroke="${INK}" stroke-width="2"/>` +
  `<path d="M${x - 13} ${y + 44}h26l-4 7h-18Z" fill="${INK}"/>`

/** Spider with its last bit of thread; (x, y) = body center. Bounds: x ±11, y from −14 to +8. */
const spider = (x: number, y: number) =>
  `<path d="M${x} ${y - 14}v8" stroke="#e8e0d0" stroke-opacity="0.7" stroke-width="1"/>` +
  `<path d="M${x - 4} ${y - 2}l-6 -4M${x - 4} ${y + 1}l-7 1M${x - 4} ${y + 3}l-5 5M${x + 4} ${y - 2}l6 -4M${x + 4} ${y + 1}l7 1M${x + 4} ${y + 3}l5 5" stroke="#1d1712" stroke-width="1.4" stroke-linecap="round"/>` +
  `<circle cx="${x}" cy="${y}" r="5" fill="#1d1712"/><circle cx="${x}" cy="${y - 5}" r="3" fill="#1d1712"/>` +
  `<circle cx="${x - 1.2}" cy="${y - 5.5}" r="0.9" fill="#fff"/><circle cx="${x + 1.2}" cy="${y - 5.5}" r="0.9" fill="#fff"/>`

/** Bat hanging upside down from the beam at (x, y), wings folded. Bounds: x ±13, y from 0 to +30. */
const bat = (x: number, y: number) =>
  `<path d="M${x - 3} ${y}v4M${x + 3} ${y}v4" stroke="#1d1712" stroke-width="1.5"/>` +
  `<path d="M${x} ${y + 3}q-14 2 -13 14q4 -3 6 1q2 -4 7 -2q5 -2 7 2q2 -4 6 -1q1 -12 -13 -14Z" fill="#2a2130"/>` +
  `<circle cx="${x}" cy="${y + 22}" r="7" fill="#3a2f44"/><path d="M${x - 5} ${y + 28}l-2 3l4 -1M${x + 5} ${y + 28}l2 3l-4 -1" fill="#3a2f44"/>`
const batEyes = (x: number, y: number) =>
  `<circle cx="${x - 2.5}" cy="${y + 21}" r="1.4" fill="#ffe066"/><circle cx="${x + 2.5}" cy="${y + 21}" r="1.4" fill="#ffe066"/>`

/** Sack of gold tied at the neck, standing on y; (x, y) = bottom center. Bounds: x ±22, y from −46 to 0. */
const sack = (x: number, y: number) =>
  `<path d="M${x - 8} ${y - 34}q-16 6 -14 22q2 12 22 12q20 0 22 -12q2 -16 -14 -22Z" fill="#b08850" stroke="${INK}" stroke-width="2"/>` +
  `<path d="M${x - 8} ${y - 34}l-4 -8q12 -6 24 0l-4 8Z" fill="#b08850" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>` +
  `<path d="M${x - 9} ${y - 33}h18" stroke="#8c1c24" stroke-width="3" stroke-linecap="round"/>` +
  `<ellipse cx="${x - 2}" cy="${y - 42}" rx="5" ry="2" fill="${GOLD}" stroke="${GOLD_DARK}"/><ellipse cx="${x + 5}" cy="${y - 43}" rx="4" ry="1.8" fill="${GOLD}" stroke="${GOLD_DARK}"/>`

/** Barrel standing on y; (x, y) = bottom center, `w` = width, `h` = height. */
const barrel = (x: number, y: number, w: number, h: number) =>
  `<path d="M${x - w / 2 + 6} ${y - h}h${w - 12}q6 ${h / 2} 0 ${h}h${-(w - 12)}q-6 ${-h / 2} 0 ${-h}Z" fill="${WOOD}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>` +
  `<path d="M${x - w / 2 + 3} ${y - h * 0.72}h${w - 6}M${x - w / 2 + 3} ${y - h * 0.28}h${w - 6}" stroke="${WOOD_DARK}" stroke-width="5"/>`

/** Gem; (x, y) = center, `s` = half width. */
const gem = (x: number, y: number, s: number, color: string) =>
  `<path d="M${x - s} ${y - s * 0.3}l${s * 0.5} ${-s * 0.6}h${s}l${s * 0.5} ${s * 0.6}l${-s} ${s * 1.2}Z" fill="${color}" stroke="#2a1d15" stroke-width="1"/>` +
  `<path d="M${x - s * 0.4} ${y - s * 0.6}l${s * 0.3} ${s * 0.5}" stroke="#fff" stroke-opacity="0.6" stroke-width="1"/>`

/** Pirate ship on the map; (x, y) = hull center. The sail is drawn apart by `sail`. */
const ship = (x: number, y: number) =>
  `<path d="M${x - 14} ${y}h28l-5 7h-18Z" fill="${MAP_INK}"/><path d="M${x} ${y}v-22" stroke="${MAP_INK}" stroke-width="1.6"/>` +
  `<path d="M${x - 22} ${y + 10}q4 -3 8 0t8 0M${x + 8} ${y + 10}q4 -3 8 0t8 0" fill="none" stroke="#7aa6b8" stroke-width="1.3"/>`
/** The ship's sail at the mast (x, y = hull center); Bounds: x from −9 to +10, y from −21 to −4. */
const sail = (x: number, y: number, color: string) =>
  `<path d="M${x + 1} ${y - 21}q10 7 9 17h-9Z" fill="${color}" stroke="${MAP_INK}" stroke-width="1.2"/>` +
  `<path d="M${x - 1} ${y - 18}q-8 6 -8 13h8Z" fill="${color}" stroke="${MAP_INK}" stroke-width="1.2"/>`

/** Palm tree on the map with four leaves or two; (x, y) = foot of the trunk. Bounds: x ±14, y from −30 to 0. */
const palm = (x: number, y: number, leaves: 2 | 4) =>
  `<path d="M${x} ${y}q-2 -12 3 -24" fill="none" stroke="${MAP_INK}" stroke-width="2.5" stroke-linecap="round"/>` +
  `<path d="M${x + 3} ${y - 24}q-8 -6 -15 -1M${x + 3} ${y - 24}q8 -7 14 -1${leaves === 4 ? `M${x + 3} ${y - 24}q-4 -8 -11 -6M${x + 3} ${y - 24}q5 -8 11 -5` : ''}" fill="none" stroke="#4f8a3a" stroke-width="2.4" stroke-linecap="round"/>`

/** The red X of the treasure; (x, y) = center. Bounds: ±8. */
const xMark = (x: number, y: number) =>
  `<path d="M${x - 7} ${y - 7}l14 14M${x + 7} ${y - 7}l-14 14" stroke="#c0392b" stroke-width="3.5" stroke-linecap="round"/>`

/** Compass rose turned by `angle`; (x, y) = center. Bounds: r 16. */
const compass = (x: number, y: number, angle: number) =>
  `<g transform="rotate(${angle} ${x} ${y})">` +
  `<circle cx="${x}" cy="${y}" r="10" fill="none" stroke="${MAP_INK}" stroke-width="1.2"/>` +
  `<path d="M${x} ${y - 16}l3 13l-3 3l-3 -3Z" fill="#c0392b"/><path d="M${x} ${y + 16}l3 -13l-3 -3l-3 3Z" fill="${MAP_INK}"/>` +
  `<path d="M${x - 14} ${y}l11 -3l3 3l-3 3ZM${x + 14} ${y}l-11 -3l-3 3l3 3Z" fill="${MAP_INK}"/>` +
  `</g>`

/** Anchor hung on the wall; (x, y) = ring center. Bounds: x ±20, y from −6 to +44. */
const anchor = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="5" fill="none" stroke="${STEEL}" stroke-width="3"/>` +
  `<path d="M${x} ${y + 5}v34M${x - 10} ${y + 13}h20M${x - 18} ${y + 26}q2 14 18 14q16 0 18 -14" fill="none" stroke="${STEEL}" stroke-width="4" stroke-linecap="round"/>` +
  `<path d="M${x - 18} ${y + 26}l-2 6l6 -2ZM${x + 18} ${y + 26}l2 6l-6 -2Z" fill="${STEEL}" stroke="${STEEL}" stroke-width="2" stroke-linejoin="round"/>`

/** Vase standing on y; (x, y) = bottom center. Bounds: x ±12, y from −34 to 0. */
const vase = (x: number, y: number) =>
  `<path d="M${x - 5} ${y - 34}h10l-1 6q9 6 9 16q0 9 -6 12h-14q-6 -3 -6 -12q0 -10 9 -16Z" fill="#2f6f9f" stroke="#2a1d15" stroke-width="1.5"/>` +
  `<path d="M${x - 9} ${y - 16}h18" stroke="${GOLD}" stroke-width="2.5"/>`

/** Gold bar; (x, y) = center. Bounds: x ±13, y ±6. */
const goldBar = (x: number, y: number) =>
  `<path d="M${x - 13} ${y + 6}l4 -12h18l4 12Z" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="1.5" stroke-linejoin="round"/>`

/** Parrot in a cage hanging from the beam at (x, 36); the cage is 30 wide, from y 58 to 112. */
const parrotCage = (x: number, parrot: string) =>
  `<path d="M${x} 36v22" stroke="${INK}" stroke-width="2"/><circle cx="${x}" cy="60" r="3" fill="none" stroke="${GOLD_DARK}" stroke-width="2"/>` +
  `<path d="M${x - 15} 108V80q0 -18 15 -18q15 0 15 18V108" fill="#fff8dc" fill-opacity="0.08" stroke="${GOLD_DARK}" stroke-width="2"/>` +
  `<path d="M${x - 7} 108V66M${x} 108V62M${x + 7} 108V66" stroke="${GOLD_DARK}" stroke-width="1.2"/>` +
  `<path d="M${x - 10} 96h20" stroke="${WOOD_DARK}" stroke-width="2.5" stroke-linecap="round"/>` +
  parrot +
  `<rect x="${x - 17}" y="106" width="34" height="6" rx="2" fill="${GOLD_DARK}"/>`
/** The parrot on the perch of the cage at x. Bounds: x ±8, y from 74 to 104. */
const parrot = (x: number) =>
  `<path d="M${x + 2} 92l3 12l-5 -4Z" fill="#2f9e6e"/>` +
  `<ellipse cx="${x}" cy="86" rx="6" ry="9" fill="#e63946"/><circle cx="${x + 1}" cy="78" r="5" fill="#e63946"/>` +
  `<path d="M${x + 5} 77q5 1 3 6l-3 -2Z" fill="#f7c948"/><circle cx="${x + 2}" cy="77" r="1.4" fill="#fff"/><circle cx="${x + 2.3}" cy="77" r="0.7" fill="#1d1712"/>` +
  `<path d="M${x - 5} 84q-3 6 1 11l5 -4Z" fill="#3a86ff"/>`

/** Gold plate standing on y; (x, y) = bottom center, `r` = radius. */
const plate = (x: number, y: number, r: number) =>
  `<circle cx="${x}" cy="${y - r}" r="${r}" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="1.5"/><circle cx="${x}" cy="${y - r}" r="${r * 0.6}" fill="none" stroke="${GOLD_DARK}" stroke-width="1"/>`

/** Jewelry box standing on y, lid open; (x, y) = bottom center. Bounds: x ±16, y from −24 to 0. */
const jewelBox = (x: number, y: number) =>
  `<path d="M${x - 14} ${y - 14}l2 -10h24l2 10Z" fill="#8c1c24" stroke="#2a1d15" stroke-width="1.2"/>` +
  `<rect x="${x - 16}" y="${y - 14}" width="32" height="14" rx="2" fill="#a0303a" stroke="#2a1d15" stroke-width="1.2"/>` +
  `<path d="M${x - 16} ${y - 7}h32" stroke="${GOLD}" stroke-width="1.5"/>` +
  `<circle cx="${x - 8}" cy="${y - 15}" r="2.4" fill="#fff8dc"/><circle cx="${x - 3}" cy="${y - 16}" r="2.4" fill="#fff8dc"/><circle cx="${x + 2}" cy="${y - 15.5}" r="2.4" fill="#fff8dc"/><circle cx="${x + 8}" cy="${y - 15}" r="2.6" fill="#4caf50"/>`

/** Candlestick standing on y; (x, y) = bottom center, the flame passed in. Bounds: x ±8, y from −40 to 0. */
const candlestick = (x: number, y: number, light: string) =>
  `<path d="M${x - 8} ${y}h16l-5 -4h-6Z" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="1"/><path d="M${x} ${y - 4}v-10" stroke="${GOLD_DARK}" stroke-width="3"/>` +
  `<rect x="${x - 3}" y="${y - 28}" width="6" height="14" fill="#fff4d6"/>` +
  light

/** Wooden crate standing on y; (x, y) = bottom left corner, `w` × `h`. */
const crate = (x: number, y: number, w: number, h: number) =>
  `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#9a6a38" stroke="${INK}" stroke-width="2.5"/>` +
  `<path d="M${x} ${y - h}l${w} ${h}M${x + 4} ${y - h / 2}h${w - 8}" stroke="${WOOD_DARK}" stroke-width="3"/>`

/** Knight's helmet; (x, y) = bottom center. Bounds: x ±16, y from −30 to 0. */
const helmet = (x: number, y: number) =>
  `<path d="M${x - 15} ${y}v-16q0 -14 15 -14q15 0 15 14v16Z" fill="#b8bec8" stroke="#5c626c" stroke-width="2"/>` +
  `<path d="M${x - 11} ${y - 14}h22M${x - 11} ${y - 10}h22" stroke="#3a3f48" stroke-width="2.2"/><path d="M${x} ${y - 30}q8 -8 14 -2" fill="none" stroke="#e63946" stroke-width="4" stroke-linecap="round"/>`

/** Standing candelabra with three candles; (x, y) = foot center, the three flames passed in. Bounds: x ±24, y from −96 to 0. */
const candelabra = (x: number, y: number, light: string) =>
  `<path d="M${x - 14} ${y}h28l-8 -6h-12Z" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="1.5"/>` +
  `<path d="M${x} ${y - 6}v-58M${x - 20} ${y - 70}q0 10 20 10q20 0 20 -10" fill="none" stroke="${GOLD_DARK}" stroke-width="4" stroke-linecap="round"/>` +
  [-20, 0, 20].map((dx) => `<rect x="${x + dx - 3}" y="${y - (dx ? 84 : 80) - 4}" width="6" height="14" fill="#fff4d6"/>`).join('') +
  light

/** Framed painting of a ship at sea; (x, y) = top left corner, 60 × 44. */
const painting = (x: number, y: number) =>
  `<rect x="${x}" y="${y}" width="60" height="44" rx="2" fill="#9fd3e6" stroke="${GOLD_DARK}" stroke-width="5"/>` +
  `<path d="M${x + 3} ${y + 30}q8 -4 14 0t14 0t14 0t13 0V${y + 41}H${x + 3}Z" fill="#2f6f9f"/>` +
  `<path d="M${x + 20} ${y + 30}h20l-4 5h-12Z" fill="${WOOD_DARK}"/><path d="M${x + 30} ${y + 30}v-18" stroke="${WOOD_DARK}" stroke-width="1.5"/>` +
  `<path d="M${x + 31} ${y + 13}q8 6 7 15h-7ZM${x + 29} ${y + 15}q-7 5 -7 13h7Z" fill="#fff"/><circle cx="${x + 49}" cy="${y + 11}" r="4" fill="#ffe066"/>`

/** Coil of rope on a peg; (x, y) = peg. Bounds: x ±16, y from −4 to +30. */
const rope = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="3" fill="${WOOD_DARK}"/>` +
  `<ellipse cx="${x}" cy="${y + 14}" rx="15" ry="13" fill="none" stroke="#c9a768" stroke-width="5"/><ellipse cx="${x}" cy="${y + 14}" rx="9" ry="8" fill="none" stroke="#b08a4a" stroke-width="4"/>` +
  `<path d="M${x + 8} ${y + 25}q4 6 -2 10" fill="none" stroke="#c9a768" stroke-width="4" stroke-linecap="round"/>`

/** Globe on a stand, standing on y; (x, y) = foot center. Bounds: x ±16, y from −56 to 0. */
const globe = (x: number, y: number) =>
  `<path d="M${x - 12} ${y}l12 -18l12 18" fill="none" stroke="${WOOD_DARK}" stroke-width="3.5" stroke-linejoin="round"/>` +
  `<circle cx="${x}" cy="${y - 36}" r="15" fill="#6fb3d9" stroke="${INK}" stroke-width="2"/>` +
  `<path d="M${x - 8} ${y - 46}q6 -2 9 3q-2 6 -8 5q-4 -3 -1 -8ZM${x + 2} ${y - 32}q7 -2 9 4q-3 7 -8 6q-3 -4 -1 -10Z" fill="#7fae5a"/>` +
  `<path d="M${x - 17} ${y - 36}a17 17 0 0 0 34 0" fill="none" stroke="${GOLD_DARK}" stroke-width="2.5"/>`

/** Scrolls lying in a little pile on y; (x, y) = bottom center. Bounds: x ±18, y from −18 to 0. */
const scrolls = (x: number, y: number) =>
  `<rect x="${x - 18}" y="${y - 8}" width="30" height="8" rx="4" fill="${PAPER}" stroke="${MAP_INK}" stroke-width="1.2"/>` +
  `<rect x="${x - 10}" y="${y - 9}" width="28" height="8" rx="4" fill="#e6cf98" stroke="${MAP_INK}" stroke-width="1.2"/>` +
  `<rect x="${x - 14}" y="${y - 17}" width="26" height="8" rx="4" fill="${PAPER}" stroke="${MAP_INK}" stroke-width="1.2"/><path d="M${x - 2} ${y - 17}v8" stroke="#8c1c24" stroke-width="2"/>`

/** Mouse hugging a coin; (x, y) = bottom center. Bounds: x ±14, y from −20 to 0. */
const mouse = (x: number, y: number) =>
  `<path d="M${x + 10} ${y - 3}q10 2 8 -8" fill="none" stroke="#c7a3a3" stroke-width="1.5" stroke-linecap="round"/>` +
  `<ellipse cx="${x + 2}" cy="${y - 7}" rx="10" ry="7" fill="#9a9aa2"/><circle cx="${x - 7}" cy="${y - 12}" r="6" fill="#a8a8b0"/>` +
  `<circle cx="${x - 9}" cy="${y - 18}" r="3.5" fill="#d8b0b0" stroke="#a8a8b0" stroke-width="1.5"/><circle cx="${x - 10}" cy="${y - 12}" r="1.2" fill="#1d1712"/><circle cx="${x - 13}" cy="${y - 10}" r="1.3" fill="#e08a9a"/>` +
  `<ellipse cx="${x - 4}" cy="${y - 5}" rx="5.5" ry="5" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="1.2"/>`

/** Round wooden buckler on the wall; (x, y) = center. Bounds: r 18. */
const buckler = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="18" fill="${WOOD}" stroke="${STEEL}" stroke-width="3"/>` +
  `<path d="M${x - 16} ${y}h32M${x} ${y - 16}v32" stroke="${WOOD_DARK}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="6" fill="${STEEL}" stroke="#5c626c" stroke-width="1.5"/>`

/** Horn hanging on a nail by its strap; (x, y) = nail. Bounds: x ±18, y from −3 to +28. */
const horn = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="2.5" fill="${STEEL}"/><path d="M${x} ${y}l-12 14M${x} ${y}l12 12" stroke="#8c1c24" stroke-width="2"/>` +
  `<path d="M${x - 16} ${y + 12}q14 16 32 0l2 6q-20 18 -38 0Z" fill="#efe3c4" stroke="${MAP_INK}" stroke-width="1.5" stroke-linejoin="round"/>` +
  `<path d="M${x - 8} ${y + 18}l2 4M${x + 6} ${y + 18}l-1 5" stroke="${GOLD_DARK}" stroke-width="2"/>`

export default svgLevel({
  id: 900,
  chapter: 'treasury',
  title: 'treasury',
  parTimeSec: 240,
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
    // Coins scattered on the floor, away from the differences and the loot on it.
    let scattered = ''
    for (let i = 0; i < 40; i++) {
      const x = 20 + rand() * 760
      const y = 452 + rand() * 42
      if ([40, 210, 450, 540, 632].some((cx) => Math.abs(x - cx) < 44)) continue
      scattered += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="6" ry="2.6" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="1"/>`
    }
    // Waves on the map's sea.
    const waves = [
      [578, 80],
      [640, 74],
      [700, 92],
      [598, 140],
      [720, 140],
      [586, 172],
      [700, 232],
      [632, 236],
      [764, 162],
    ]
      .map(([x, y]) => `<path d="M${x} ${y}q4 -3 8 0t8 0" fill="none" stroke="#7aa6b8" stroke-width="1.3"/>`)
      .join('')
    // Sparkles over the gold, all blinking in their own rhythm (the same in both pictures).
    const twinkles = [
      [330, 318, 7],
      [272, 420, 6],
      [86, 384, 6],
      [168, 426, 5],
      [452, 356, 6],
      [500, 120, 5],
      [700, 456, 5],
    ]
      .map(([x, y, s], i) => anim({ type: 'blink', period: 1.4 + i * 0.35, phase: i * 0.2, duty: 0.55 }, sparkle(x, y, s)))
      .join('')
    const swing = (angle: number) => anim({ id: 'lantern', type: 'sway', angle, pivot: [370, 60], period: 3 }, lantern(370, 60))
    const crawl = (period: number) => anim({ id: 'spider', type: 'bob', dx: 0, dy: 5, period }, spider(40, 76))
    const shine = sparkle(412, 296, 12)
    const torchFlame = (x: number, period: number, phase: number) =>
      anim({ type: 'sway', angle: 7, pivot: [x, 168], period, phase }, flame(x, 168))
    const candleFlame = (x: number, y: number, period: number) =>
      anim({ type: 'sway', angle: 8, pivot: [x, y - 23], period }, flame(x, y - 23, 0.4))

    return (
      `<rect width="800" height="500" fill="#3f3026"/>` +
      stones +
      // Arch behind the chest, the glow of the gold inside it
      `<path d="M245 380V250a125 115 0 0 1 250 0V380Z" fill="#6b5340"/><path d="M263 380V254a107 100 0 0 1 214 0V380Z" fill="#2a1d15"/>` +
      `<path d="M263 300h214M263 340h214" stroke="#3a2a1e" stroke-width="2"/>` +
      `<ellipse cx="370" cy="330" rx="140" ry="86" fill="#ffd166" fill-opacity="0.18"/>` +
      // A ledge inside the arch with plates, a candlestick, a jewelry box and goblets
      `<rect x="278" y="250" width="184" height="7" rx="2" fill="${WOOD}"/>` +
      plate(298, 250, 13) +
      plate(318, 250, 9) +
      candlestick(342, 250, candleFlame(342, 245, 1.3)) +
      jewelBox(380, 250) +
      goblet(414, 233, '#3a86ff') +
      plate(444, 250, 12) +
      // Beamed ceiling with the lantern hook, pennants and a sleeping bat
      `<rect width="800" height="36" fill="${WOOD_DARK}"/><path d="M0 36H800" stroke="${INK}" stroke-width="4"/>` +
      `<path d="M120 0v36M370 0v36M680 0v36" stroke="#4a2e14" stroke-width="6"/>` +
      `<path d="M150 38q75 22 150 0" fill="none" stroke="#c9b48a" stroke-width="1.5"/>` +
      [
        [166, '#e63946'],
        [190, '#f7c948'],
        [214, '#3a86ff'],
        [238, '#4caf50'],
        [262, '#e63946'],
        [284, '#f7c948'],
      ]
        .map(([x, c]) => {
          const px = x as number
          const py = 38 + 11 * (1 - ((px - 225) / 75) ** 2)
          return `<path d="M${px - 7} ${py.toFixed(1)}h14l-7 14Z" fill="${c}"/>`
        })
        .join('') +
      bat(520, 36) +
      bat(458, 36) +
      anim({ type: 'blink', period: 5.1, phase: 0.5, duty: 0.9 }, batEyes(458, 36)) +
      parrotCage(306, anim({ type: 'sway', angle: 6, pivot: [306, 104], period: 2.4 }, parrot(306))) +
      painting(86, 54) +
      anim({ type: 'blink', period: 4.2, duty: 0.92 }, batEyes(520, 36)) +
      diff(370, 90, 30, swing(8), swing(20), 'lantern') +
      // Cobweb in the corner, the spider on its thread
      `<path d="M0 36q30 10 40 40M0 36q22 26 18 54M0 36q40 2 66 16M6 52q14 -2 22 -12M8 70q18 -6 26 -22M12 84q22 -10 32 -28" fill="none" stroke="#e8e0d0" stroke-opacity="0.45" stroke-width="1.2"/>` +
      `<path d="M40 38v24" stroke="#e8e0d0" stroke-opacity="0.7" stroke-width="1"/>` +
      diff(40, 76, 24, crawl(2.8), crawl(1.1), 'spider') +
      // Torches
      torch(222, 170, torchFlame(222, 0.9, 0)) +
      torch(522, 170, torchFlame(522, 1.1, 0.4)) +
      // Upper shelf: books, an hourglass, a scroll, a candle
      `<rect x="20" y="150" width="182" height="9" rx="2" fill="${WOOD}"/><path d="M34 159l9 14M188 159l-9 14" stroke="${WOOD_DARK}" stroke-width="5"/>` +
      book(26, 150, 10, 30, '#8c1c24') +
      book(37, 150, 12, 34, '#2f6f9f') +
      book(50, 150, 9, 27, '#4caf50') +
      diff(70, 134, 20, book(60, 150, 11, 31, '#6a4fd8'), book(60, 150, 11, 31, '#e07a1f')) +
      `<rect x="74" y="141" width="34" height="9" rx="2" fill="#2f5e9e" stroke="#2a1d15" stroke-width="1.2"/><rect x="77" y="133" width="30" height="8" rx="2" fill="#a0522d" stroke="#2a1d15" stroke-width="1.2"/>` +
      diff(140, 133, 21, hourglass(140, 150, true), hourglass(140, 150, false)) +
      `<rect x="154" y="140" width="22" height="10" rx="5" fill="${PAPER}" stroke="${MAP_INK}" stroke-width="1.2"/><path d="M165 140v10" stroke="#8c1c24" stroke-width="2"/>` +
      candle(188, 150, candleFlame(188, 150, 0.8)) +
      anchor(110, 192) +
      // Lower shelf: potions and jars
      `<rect x="20" y="262" width="182" height="10" rx="2" fill="${WOOD}"/><path d="M34 272l10 16M188 272l-10 16" stroke="${WOOD_DARK}" stroke-width="5"/>` +
      bottle(40, 262, '#3a86ff') +
      diff(78, 245, 22, bottle(78, 262, '#4caf50'), bottle(78, 262, '#4caf50', '#e63946')) +
      bottle(114, 262, '#e63946') +
      jar(144, 262, '#d98c3a') +
      jar(170, 262, '#6fb3a8') +
      `<rect x="183" y="248" width="14" height="14" rx="2" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="1.2"/>` +
      // The treasure map pinned to the wall: islands, a ship, the dotted way to the X, a compass rose
      `<path d="M548 58q60 -8 120 0t120 -2v190q-60 8 -120 0t-120 2Z" fill="${PAPER}" stroke="#b08a4a" stroke-width="2.5"/>` +
      `<path d="M556 66q56 -6 112 0t112 -2v176q-56 6 -112 0t-112 2Z" fill="none" stroke="#c9a768" stroke-width="1"/>` +
      waves +
      // Big island with the palm
      `<path d="M624 168q8 -26 42 -26q36 0 44 24q-6 18 -42 18q-36 0 -44 -16Z" fill="#d9b36b" stroke="${MAP_INK}" stroke-width="1.5"/>` +
      `<path d="M640 168l4 -4M652 172l4 -4M686 170l4 -4M696 164l4 -4" stroke="#7fae5a" stroke-width="1.5"/>` +
      diff(668, 136, 20, palm(666, 154, 4), palm(666, 154, 2)) +
      // Mountain island
      `<path d="M716 112q18 -16 50 -6q4 12 -10 16q-24 4 -40 -10Z" fill="#d9b36b" stroke="${MAP_INK}" stroke-width="1.5"/>` +
      `<path d="M730 110l10 -14l6 8l5 -6l9 12" fill="none" stroke="${MAP_INK}" stroke-width="1.5" stroke-linejoin="round"/>` +
      // Treasure island with the X, the dotted way from the big island
      `<path d="M712 206q6 -18 34 -18q30 0 34 16q-4 14 -34 14q-28 0 -34 -12Z" fill="#d9b36b" stroke="${MAP_INK}" stroke-width="1.5"/>` +
      `<path d="M690 180q10 12 24 10" fill="none" stroke="#8c1c24" stroke-width="2" stroke-dasharray="3 3"/>` +
      diff(746, 201, 22, xMark(740, 204), xMark(754, 198)) +
      // A whale spouting
      `<path d="M664 228q4 -10 18 -10q12 0 14 8q-6 6 -18 6q-8 0 -14 -4Z" fill="#7aa6b8" stroke="${MAP_INK}" stroke-width="1.2"/><path d="M662 226l-6 -5v10Z" fill="#7aa6b8" stroke="${MAP_INK}" stroke-width="1.2"/>` +
      `<path d="M684 218q-2 -6 -6 -8M684 218q2 -6 6 -8" fill="none" stroke="#7aa6b8" stroke-width="1.3"/>` +
      ship(612, 100) +
      diff(612, 91, 20, sail(612, 100, '#f4efe0'), sail(612, 100, '#cfe0ea')) +
      diff(582, 216, 20, compass(582, 216, 0), compass(582, 216, 45)) +
      `<circle cx="556" cy="64" r="4" fill="#e63946"/><circle cx="780" cy="62" r="4" fill="#e63946"/><circle cx="556" cy="244" r="4" fill="#e63946"/><circle cx="780" cy="242" r="4" fill="#e63946"/>` +
      rope(552, 292) +
      // Shield over crossed swords
      `<path d="M584 280l72 72M656 280l-72 72" stroke="#c0c6cf" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M578 286l12 -6M650 280l12 6M578 346l12 6M650 352l12 -6" stroke="${GOLD_DARK}" stroke-width="6" stroke-linecap="round"/>` +
      `<path d="M590 284h60v32q0 30 -30 44q-30 -14 -30 -44Z" fill="#2f5e9e" stroke="${GOLD_DARK}" stroke-width="5" stroke-linejoin="round"/>` +
      diff(620, 316, 20, star(620, 316), gemStar(620, 316)) +
      // Ring of keys on a nail
      `<circle cx="720" cy="290" r="3" fill="${STEEL}"/><circle cx="720" cy="306" r="12" fill="none" stroke="${STEEL}" stroke-width="2.5"/>` +
      `<path d="M712 316l-6 22M720 318v24M728 316l6 22" stroke="${GOLD_DARK}" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M703 334h6M703 338h4M717 338h6M717 342h4M731 334h6M733 338h4" stroke="${GOLD_DARK}" stroke-width="2.5"/>` +
      // Banner on the wall above the keys
      `<path d="M752 270h30v56l-15 -10l-15 10Z" fill="#8c1c24" stroke="${INK}" stroke-width="2"/><circle cx="767" cy="292" r="7" fill="${GOLD}"/>` +
      // Floor
      `<rect y="380" width="800" height="120" fill="#5a3f2a"/><path d="M0 380H800" stroke="${INK}" stroke-width="4"/>` +
      `<path d="M0 420H800M0 462H800" stroke="#4a3220" stroke-width="2"/>` +
      `<path d="M90 380v40M260 420v42M430 380v40M600 420v42M150 462v38M520 462v38M710 380v40" stroke="#4a3220" stroke-width="2"/>` +
      scattered +
      buckler(98, 308) +
      horn(504, 232) +
      // A crate with a helmet and a candelabra by the left wall
      crate(14, 404, 60, 52) +
      helmet(44, 352) +
      candelabra(
        176,
        404,
        [-20, 0, 20].map((dx, i) => anim({ type: 'sway', angle: 8, pivot: [176 + dx, dx ? 316 : 320], period: 0.8 + i * 0.15 }, flame(176 + dx, dx ? 316 : 320, 0.4))).join(''),
      ) +
      // Heap of coins with the crown, a goblet and gems beside it
      `<path d="M28 458q22 -52 82 -56q60 4 82 56Z" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="2"/>` +
      `<path d="M54 442q10 -6 20 0M110 432q10 -6 20 0M146 448q10 -6 20 0M84 452q10 -6 20 0" stroke="${GOLD_DARK}" stroke-width="2" fill="none"/>` +
      gem(62, 446, 6, '#3a86ff') +
      gem(160, 436, 5, '#4caf50') +
      diff(110, 400, 22, crown(110, 400, '#e63946'), crown(110, 400, '#3a86ff')) +
      diff(210, 448, 22, goblet(210, 448, '#e63946'), goblet(210, 448, '')) +
      gem(246, 472, 6, '#e63946') +
      gem(262, 482, 5, '#9b5de5') +
      `<path d="M150 484q20 10 44 2" fill="none" stroke="#fff8dc" stroke-width="3.5" stroke-dasharray="0.1 5" stroke-linecap="round"/>` +
      // Spyglass on the floor before the chest
      `<path d="M300 478l60 -12" stroke="${GOLD_DARK}" stroke-width="9" stroke-linecap="round"/><path d="M300 478l26 -5" stroke="${WOOD}" stroke-width="7" stroke-linecap="round"/><circle cx="361" cy="466" r="5" fill="#9fd3e6" stroke="${GOLD_DARK}" stroke-width="2"/>` +
      // The open chest: lid tipped back, gold heaped inside
      `<path d="M292 340L304 288H436L448 340Z" fill="#7a4a24" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>` +
      `<path d="M300 330L310 296H430L440 330" fill="none" stroke="${GOLD_DARK}" stroke-width="4"/>` +
      `<path d="M292 344q78 -40 156 0Z" fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="2"/>` +
      `<circle cx="342" cy="330" r="5" fill="#e63946"/><circle cx="386" cy="326" r="5" fill="#3a86ff"/><circle cx="416" cy="334" r="4" fill="#4caf50"/>` +
      `<path d="M352 336q14 8 30 0" fill="none" stroke="#fff8dc" stroke-width="3" stroke-dasharray="0.1 4.5" stroke-linecap="round"/>` +
      `<rect x="288" y="340" width="164" height="68" rx="4" fill="${WOOD}" stroke="${INK}" stroke-width="3"/>` +
      `<path d="M288 362H452M310 340V408M430 340V408" stroke="${GOLD_DARK}" stroke-width="5"/>` +
      `<rect x="360" y="356" width="20" height="18" rx="3" fill="${GOLD}" stroke="${INK}" stroke-width="2"/>` +
      diff(412, 296, 22, anim({ type: 'blink', period: 1.6, duty: 0.6 }, shine), anim({ type: 'blink', period: 0.7, duty: 0.6 }, shine)) +
      // Sack of gold and a small barrel beside the chest
      sack(482, 410) +
      goldBar(492, 424) +
      goldBar(520, 420) +
      goldBar(506, 412) +
      barrel(232, 404, 40, 46) +
      `<ellipse cx="232" cy="358" rx="14" ry="4" fill="${GOLD}" stroke="${GOLD_DARK}"/>` +
      diff(540, 458, 26, coins(540, 470, 4), coins(540, 470, 5)) +
      // Small locked chest
      `<rect x="590" y="418" width="84" height="52" rx="4" fill="#7a4a24" stroke="${INK}" stroke-width="3"/>` +
      `<path d="M590 418q42 -26 84 0Z" fill="${WOOD}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>` +
      `<path d="M604 410V470M660 410V470" stroke="${STEEL}" stroke-width="4"/>` +
      diff(632, 440, 20, padlock(632, 440, true), padlock(632, 440, false)) +
      vase(690, 474) +
      globe(686, 418) +
      scrolls(578, 418) +
      mouse(40, 494) +
      jewelBox(452, 488) +
      // Barrel of swords
      `<path d="M732 404V368M766 404V364" stroke="#c0c6cf" stroke-width="5" stroke-linecap="round"/>` +
      hilt(732, 364, STEEL) +
      hilt(766, 360, GOLD) +
      barrel(750, 482, 84, 78) +
      twinkles
    )
  },
})
