// "Memory" category: big flat cartoon objects that a glance is enough to remember, and small decor
// that fills the scene around them (the same in both pictures). Each returns SVG markup positioned
// at (x, y); the bounds in the comments are what a difference zone must cover.
import { MEMORY_VIEWBOX } from '../helpers.ts'

export { shelf } from '../detective/shapes.ts'
export { around } from '../time/shapes.ts'

/** Size of a "memory" picture (portrait, `MEMORY_VIEWBOX`). */
const { w: W, h: H } = MEMORY_VIEWBOX

/** Markup drawn around the origin, moved to (x, y) and scaled by s: other chapters' shapes made big. */
export const big = (x: number, y: number, s: number, markup: string) =>
  `<g transform="translate(${x} ${y}) scale(${s})">${markup}</g>`

// --- Rooms ---

/** Wall down to y, floor below it with a skirting board. */
export const room = (y: number, wall: string, floor: string) =>
  `<rect width="${W}" height="${y}" fill="${wall}"/><rect y="${y}" width="${W}" height="${H - y}" fill="${floor}"/>` +
  `<rect y="${y - 8}" width="${W}" height="10" fill="#ffffff" fill-opacity="0.55"/>`

/** Window with a cross bar; (x, y) = top-left corner, w × h. Bounds: the rectangle plus 6. */
export const windowPane = (x: number, y: number, w: number, h: number, sky = '#bfe6f7') =>
  `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="4" fill="#ffffff"/>` +
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${sky}"/>` +
  `<path d="M${x + w / 2} ${y}V${y + h}M${x} ${y + h / 2}H${x + w}" stroke="#ffffff" stroke-width="6"/>`

/** Curtains at both sides of a window from x0 to x1, hanging from y for h. Bounds: x0 − 22 … x1 + 22, y − 8 … y + h. */
export const curtains = (x0: number, x1: number, y: number, h: number, color: string) =>
  `<rect x="${x0 - 22}" y="${y - 8}" width="${x1 - x0 + 44}" height="6" rx="3" fill="#8a5a33"/>` +
  `<path d="M${x0 - 20} ${y}h40q-14 ${h / 2} 0 ${h}h-40Z" fill="${color}"/>` +
  `<path d="M${x1 + 20} ${y}h-40q14 ${h / 2} 0 ${h}h40Z" fill="${color}"/>`

/** Table with its top from x0 to x1 at y, legs down to the floor at `floor`. */
export const table = (x0: number, x1: number, y: number, floor: number, color = '#b5793f') =>
  `<rect x="${x0 + 16}" y="${y}" width="16" height="${floor - y}" fill="${color}"/><rect x="${x1 - 32}" y="${y}" width="16" height="${floor - y}" fill="${color}"/>` +
  `<rect x="${x0}" y="${y - 6}" width="${x1 - x0}" height="22" rx="6" fill="${color}"/>` +
  `<rect x="${x0}" y="${y - 6}" width="${x1 - x0}" height="7" rx="3" fill="#ffffff" fill-opacity="0.25"/>`

/** Round wall clock; (x, y) = center. Bounds: radius r + 4. */
export const wallClock = (x: number, y: number, r: number, rim = '#3a86ff') =>
  `<circle cx="${x}" cy="${y}" r="${r + 4}" fill="${rim}"/><circle cx="${x}" cy="${y}" r="${r - 4}" fill="#ffffff"/>` +
  `<path d="M${x} ${y}V${y - r * 0.6}M${x} ${y}L${x + r * 0.42} ${y + r * 0.2}" stroke="#23302b" stroke-width="5" stroke-linecap="round"/>` +
  `<circle cx="${x}" cy="${y}" r="5" fill="#23302b"/>`

/** Framed picture of a hill and a sun; (x, y) = top-left corner, w × h. Bounds: the rectangle plus 8. */
export const painting = (x: number, y: number, w: number, h: number, frame = '#c9953f', sky = '#ffe9a8') =>
  `<rect x="${x - 8}" y="${y - 8}" width="${w + 16}" height="${h + 16}" rx="3" fill="${frame}"/>` +
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${sky}"/>` +
  `<circle cx="${x + w * 0.72}" cy="${y + h * 0.32}" r="${h * 0.15}" fill="#ff9f43"/>` +
  `<path d="M${x} ${y + h}V${y + h * 0.7}Q${x + w * 0.35} ${y + h * 0.3} ${x + w * 0.7} ${y + h * 0.75}T${x + w} ${y + h * 0.65}V${y + h}Z" fill="#3fa46f"/>`

/** Potted plant; (x, y) = bottom center of the pot. Bounds: x ±40, y from −110 to 0. */
export const pottedPlant = (x: number, y: number, pot = '#e07a5f', leaves = '#3fa46f') =>
  `<g fill="${leaves}"><ellipse cx="${x - 22}" cy="${y - 70}" rx="14" ry="34" transform="rotate(-28 ${x - 22} ${y - 70})"/>` +
  `<ellipse cx="${x + 22}" cy="${y - 70}" rx="14" ry="34" transform="rotate(28 ${x + 22} ${y - 70})"/>` +
  `<ellipse cx="${x}" cy="${y - 76}" rx="14" ry="34"/></g>` +
  `<path d="M${x - 30} ${y - 46}h60l-8 46h-44Z" fill="${pot}"/><rect x="${x - 34}" y="${y - 50}" width="68" height="12" rx="4" fill="${pot}"/>`

/** Rug; (x, y) = center. Bounds: x ±rx, y ±0.3·rx. */
export const rug = (x: number, y: number, rx: number, color: string) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * 0.3}" fill="${color}"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="${rx * 0.75}" ry="${rx * 0.2}" fill="none" stroke="#ffffff" stroke-opacity="0.5" stroke-width="5"/>`

// --- Kitchen and party ---

/** Teapot; (x, y) = bottom center. Bounds: x from −68 to +76, y from −88 to 0. */
export const teapot = (x: number, y: number, color: string) =>
  `<path d="M${x - 44} ${y - 50}q-26 -4 -22 20q4 18 26 14" stroke="${color}" stroke-width="9" fill="none"/>` +
  `<path d="M${x + 36} ${y - 34}L${x + 70} ${y - 66}" stroke="${color}" stroke-width="14" stroke-linecap="round"/>` +
  `<ellipse cx="${x}" cy="${y - 36}" rx="48" ry="36" fill="${color}"/>` +
  `<ellipse cx="${x}" cy="${y - 70}" rx="26" ry="8" fill="${color}"/><circle cx="${x}" cy="${y - 80}" r="8" fill="${color}"/>` +
  `<ellipse cx="${x - 18}" cy="${y - 48}" rx="12" ry="7" fill="#ffffff" fill-opacity="0.35"/>`

/** Cup on a saucer; (x, y) = bottom center. Bounds: x ±34, y from −44 to 0. */
export const cup = (x: number, y: number, color: string) =>
  `<circle cx="${x + 24}" cy="${y - 26}" r="9" fill="none" stroke="${color}" stroke-width="6"/>` +
  `<path d="M${x - 24} ${y - 44}h48l-6 36h-36Z" fill="${color}"/>` +
  `<ellipse cx="${x}" cy="${y - 4}" rx="34" ry="5" fill="#ffffff"/>`

/** Fruit bowl (empty); (x, y) = bottom center. Bounds: x ±64, y from −44 to 0. */
export const bowl = (x: number, y: number, color: string) =>
  `<path d="M${x - 64} ${y - 44}h128q-6 44 -64 44q-58 0 -64 -44Z" fill="${color}"/>` +
  `<path d="M${x - 64} ${y - 44}h128" stroke="#ffffff" stroke-opacity="0.5" stroke-width="5"/>`

/** Round fruit; (x, y) = center. Bounds: x ±r, y from −r − 10 to +r. */
export const fruit = (x: number, y: number, r: number, color: string) =>
  `<path d="M${x} ${y - r + 2}q3 -8 9 -10" stroke="#6b3f1d" stroke-width="3" fill="none"/>` +
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/><ellipse cx="${x - r * 0.35}" cy="${y - r * 0.35}" rx="${r * 0.3}" ry="${r * 0.18}" fill="#ffffff" fill-opacity="0.45"/>`

/** Banana; (x, y) = middle. Bounds: x ±34, y from −14 to +16. */
export const banana = (x: number, y: number, color = '#ffd23f') =>
  `<path d="M${x - 34} ${y - 8}q34 34 68 0q-34 18 -68 0Z" fill="${color}" stroke="${color}" stroke-width="6" stroke-linejoin="round"/>` +
  `<path d="M${x + 32} ${y - 8}l4 -6" stroke="#6b3f1d" stroke-width="4" stroke-linecap="round"/>`

/** Layer cake; (x, y) = bottom center of the plate. Bounds: x ±70, y from −96 to 0. Candles go on top at y − 96. */
export const cake = (x: number, y: number, cream: string) =>
  `<ellipse cx="${x}" cy="${y - 4}" rx="70" ry="8" fill="#ffffff"/>` +
  `<rect x="${x - 56}" y="${y - 56}" width="112" height="50" rx="8" fill="#c98b5a"/>` +
  `<rect x="${x - 44}" y="${y - 96}" width="88" height="42" rx="8" fill="#c98b5a"/>` +
  `<path d="M${x - 56} ${y - 50}h112v-6h-112ZM${x - 44} ${y - 90}h88v-6h-88Z" fill="${cream}"/>` +
  `<path d="M${x - 56} ${y - 50}q14 14 28 0t28 0t28 0t28 0M${x - 44} ${y - 90}q11 12 22 0t22 0t22 0t22 0" stroke="${cream}" stroke-width="6" fill="none"/>`

/** Candle with a flame; (x, y) = bottom center. Bounds: x ±8, y from −42 to 0. */
export const candle = (x: number, y: number, color: string) =>
  `<rect x="${x - 4}" y="${y - 24}" width="8" height="24" rx="2" fill="${color}"/>` +
  `<path d="M${x} ${y - 42}q8 9 0 14q-8 -5 0 -14Z" fill="#ff9f1c"/>`

/** Gift box with a ribbon bow; (x, y) = bottom center, side s. Bounds: x ±s/2, y from −s − 16 to 0. */
export const gift = (x: number, y: number, s: number, box: string, ribbon: string) =>
  `<rect x="${x - s / 2}" y="${y - s}" width="${s}" height="${s}" rx="4" fill="${box}"/>` +
  `<rect x="${x - 5}" y="${y - s}" width="10" height="${s}" fill="${ribbon}"/>` +
  `<ellipse cx="${x - 10}" cy="${y - s - 6}" rx="11" ry="7" fill="${ribbon}"/><ellipse cx="${x + 10}" cy="${y - s - 6}" rx="11" ry="7" fill="${ribbon}"/>`

/** Party balloon on a string; (x, y) = balloon center. Bounds: x ±30, y from −38 to +110. */
export const partyBalloon = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y + 40}q-12 20 0 40t0 30" stroke="#6b766f" stroke-width="2" fill="none"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="30" ry="38" fill="${color}"/><path d="M${x - 6} ${y + 44}h12l-6 -8Z" fill="${color}"/>` +
  `<ellipse cx="${x - 11}" cy="${y - 14}" rx="7" ry="11" fill="#ffffff" fill-opacity="0.4"/>`

/** Garland of triangle flags from x0 to x1 hanging from y. Bounds: x0 … x1, y to y + 56. */
export const garland = (x0: number, x1: number, y: number, colors: string[]) => {
  const n = colors.length
  const step = (x1 - x0) / n
  const sag = (i: number) => y + 20 * Math.sin((Math.PI * i) / n)
  return (
    `<path d="M${x0} ${y}Q${(x0 + x1) / 2} ${y + 40} ${x1} ${y}" stroke="#6b766f" stroke-width="2" fill="none"/>` +
    colors
      .map((c, i) => {
        const a = x0 + step * i + 6
        return `<path d="M${a} ${sag(i + 0.2)}h${step - 12}l${-(step - 12) / 2} 34Z" fill="${c}"/>`
      })
      .join('')
  )
}

// --- Bedroom and classroom ---

/** Bed; (x, y) = floor under the middle, w wide. Bounds: x ±w/2, y from −120 to 0. */
export const bed = (x: number, y: number, w: number, blanket: string) =>
  `<rect x="${x - w / 2}" y="${y - 120}" width="22" height="120" rx="6" fill="#a0703f"/><rect x="${x + w / 2 - 22}" y="${y - 80}" width="22" height="80" rx="6" fill="#a0703f"/>` +
  `<rect x="${x - w / 2 + 10}" y="${y - 64}" width="${w - 20}" height="34" rx="6" fill="#f4efe6"/>` +
  `<rect x="${x - w / 2 + 26}" y="${y - 80}" width="58" height="24" rx="10" fill="#ffffff"/>` +
  `<rect x="${x - w / 2 + 70}" y="${y - 70}" width="${w - 80}" height="44" rx="10" fill="${blanket}"/>` +
  `<rect x="${x - w / 2 + 10}" y="${y - 30}" width="${w - 20}" height="12" fill="#8a5a33"/>`

/** Teddy bear sitting; (x, y) = bottom center. Bounds: x ±36, y from −92 to 0. */
export const teddy = (x: number, y: number, color = '#c48a5a') =>
  `<g fill="${color}"><circle cx="${x - 22}" cy="${y - 80}" r="12"/><circle cx="${x + 22}" cy="${y - 80}" r="12"/>` +
  `<ellipse cx="${x}" cy="${y - 28}" rx="30" ry="28"/><circle cx="${x}" cy="${y - 64}" r="24"/>` +
  `<ellipse cx="${x - 24}" cy="${y - 8}" rx="12" ry="8"/><ellipse cx="${x + 24}" cy="${y - 8}" rx="12" ry="8"/></g>` +
  `<ellipse cx="${x}" cy="${y - 58}" rx="10" ry="7" fill="#f2d7b6"/><circle cx="${x}" cy="${y - 61}" r="3" fill="#3d2a20"/>` +
  `<circle cx="${x - 9}" cy="${y - 70}" r="3" fill="#3d2a20"/><circle cx="${x + 9}" cy="${y - 70}" r="3" fill="#3d2a20"/>` +
  `<ellipse cx="${x}" cy="${y - 26}" rx="16" ry="14" fill="#f2d7b6"/>`

/** Table lamp; (x, y) = bottom center. Bounds: x ±36, y from −110 to 0. */
export const tableLamp = (x: number, y: number, shade: string) =>
  `<rect x="${x - 22}" y="${y - 8}" width="44" height="8" rx="4" fill="#5c677d"/><rect x="${x - 4}" y="${y - 66}" width="8" height="60" fill="#5c677d"/>` +
  `<path d="M${x - 24} ${y - 110}h48l12 46h-72Z" fill="${shade}"/>`

/** Chest of drawers; (x, y) = floor under the middle. Bounds: x ±60, y from −110 to 0. */
export const drawers = (x: number, y: number, color = '#d9a066') =>
  `<rect x="${x - 60}" y="${y - 110}" width="120" height="104" rx="6" fill="${color}"/>` +
  `<path d="M${x - 52} ${y - 76}h104M${x - 52} ${y - 42}h104" stroke="#a0703f" stroke-width="4"/>` +
  `<g fill="#6b4f3a"><circle cx="${x}" cy="${y - 92}" r="5"/><circle cx="${x}" cy="${y - 58}" r="5"/><circle cx="${x}" cy="${y - 24}" r="5"/></g>` +
  `<rect x="${x - 54}" y="${y - 8}" width="12" height="8" fill="#6b4f3a"/><rect x="${x + 42}" y="${y - 8}" width="12" height="8" fill="#6b4f3a"/>`

/** Stack of books; `colors` from the bottom up, each 18 high. Bounds: x ±34, y from −18·n to 0. */
export const books = (x: number, y: number, colors: string[]) =>
  colors
    .map((c, i) => `<rect x="${x - 32 + (i % 2) * 4}" y="${y - 18 * (i + 1)}" width="60" height="17" rx="3" fill="${c}"/>`)
    .join('')

/** Desk globe; (x, y) = bottom center. Bounds: x ±40, y from −112 to 0. */
export const globe = (x: number, y: number, sea = '#4dabf7') =>
  `<path d="M${x - 24} ${y}h48l-8 -12h-32Z" fill="#5c677d"/><rect x="${x - 3}" y="${y - 28}" width="6" height="18" fill="#5c677d"/>` +
  `<path d="M${x - 34} ${y - 68}a38 38 0 0 0 66 22" stroke="#c9953f" stroke-width="6" fill="none"/>` +
  `<circle cx="${x}" cy="${y - 72}" r="36" fill="${sea}"/>` +
  `<path d="M${x - 20} ${y - 96}q14 -6 22 6q-6 12 6 18q-4 14 -18 10q-4 -16 -14 -18q-6 -10 4 -16ZM${x + 12} ${y - 56}q14 -8 20 4q-6 12 -16 8Z" fill="#3fa46f"/>`

/** Blackboard; (x, y) = top-left corner, w × h. Bounds: the rectangle plus 10, plus the chalk ledge (+16 below). */
export const blackboard = (x: number, y: number, w: number, h: number) =>
  `<rect x="${x - 10}" y="${y - 10}" width="${w + 20}" height="${h + 20}" rx="4" fill="#a0703f"/>` +
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#2f5d4b"/>` +
  `<rect x="${x + 10}" y="${y + h + 8}" width="${w - 20}" height="8" rx="2" fill="#a0703f"/>`

/** School desk with a chair behind it; (x, y) = floor under the middle. Bounds: x ±70, y from −96 to 0. */
export const schoolDesk = (x: number, y: number, color = '#e9b872') =>
  `<rect x="${x - 34}" y="${y - 96}" width="68" height="44" rx="6" fill="#3a86ff"/><rect x="${x - 26}" y="${y - 52}" width="8" height="52" fill="#5c677d"/><rect x="${x + 18}" y="${y - 52}" width="8" height="52" fill="#5c677d"/>` +
  `<rect x="${x - 62}" y="${y - 50}" width="10" height="50" fill="#5c677d"/><rect x="${x + 52}" y="${y - 50}" width="10" height="50" fill="#5c677d"/>` +
  `<rect x="${x - 70}" y="${y - 62}" width="140" height="16" rx="4" fill="${color}"/>`

/** Backpack; (x, y) = bottom center. Bounds: x ±30, y from −76 to 0. */
export const backpack = (x: number, y: number, color: string) =>
  `<path d="M${x - 14} ${y - 64}q14 -24 28 0" stroke="#3d4a55" stroke-width="6" fill="none"/>` +
  `<rect x="${x - 30}" y="${y - 66}" width="60" height="66" rx="16" fill="${color}"/>` +
  `<rect x="${x - 20}" y="${y - 30}" width="40" height="24" rx="6" fill="#ffffff" fill-opacity="0.35"/>`

// --- Outdoors ---

/** Day sky down to y. */
export const daySky = (y = H, color = '#bfe6f7') => `<rect width="${W}" height="${y}" fill="${color}"/>`

/** Soft hills along y (their tops reach y − 50), filling down to the bottom. */
export const hills = (y: number, color: string) =>
  `<path d="M0 ${y}Q80 ${y - 70} 170 ${y - 10}T340 ${y - 20}T${W} ${y - 10}V${H}H0Z" fill="${color}"/>`

/** Ground (grass, sand, snow) from y down to the bottom. */
export const ground = (y: number, color: string) => `<rect y="${y}" width="${W}" height="${H - y}" fill="${color}"/>`

/** Barn; (x, y) = ground center. Bounds: x ±96, y from −190 to 0. The door is `barnDoor`. */
export const barn = (x: number, y: number, wall = '#d64545') =>
  `<path d="M${x - 90} ${y}V${y - 120}L${x} ${y - 186}L${x + 90} ${y - 120}V${y}Z" fill="${wall}"/>` +
  `<path d="M${x - 96} ${y - 118}L${x} ${y - 190}L${x + 96} ${y - 118}" stroke="#ffffff" stroke-width="8" fill="none" stroke-linejoin="round"/>` +
  `<circle cx="${x}" cy="${y - 136}" r="16" fill="#ffffff"/><circle cx="${x}" cy="${y - 136}" r="10" fill="#7a4e33"/>`

/** Barn door with a cross; (x, y) = bottom center. Bounds: x ±40, y from −90 to 0. */
export const barnDoor = (x: number, y: number, color = '#ffffff') =>
  `<rect x="${x - 40}" y="${y - 90}" width="80" height="90" fill="${color}"/>` +
  `<path d="M${x - 34} ${y - 84}L${x + 34} ${y - 6}M${x + 34} ${y - 84}L${x - 34} ${y - 6}" stroke="#d64545" stroke-width="6"/>` +
  `<rect x="${x - 34}" y="${y - 84}" width="68" height="78" fill="none" stroke="#d64545" stroke-width="5"/>`

/** Big round tree; (x, y) = bottom of the trunk. Bounds: x ±80, y from −220 to 0. */
export const roundTree = (x: number, y: number, crown = '#4c9a3f') =>
  `<rect x="${x - 14}" y="${y - 110}" width="28" height="110" rx="8" fill="#8a5a33"/>` +
  `<circle cx="${x - 44}" cy="${y - 120}" r="36" fill="${crown}"/><circle cx="${x + 44}" cy="${y - 120}" r="36" fill="${crown}"/>` +
  `<circle cx="${x}" cy="${y - 160}" r="60" fill="${crown}"/><circle cx="${x - 18}" cy="${y - 180}" r="18" fill="#ffffff" fill-opacity="0.15"/>`

/** Wooden sign on a post; (x, y) = foot. Bounds: x ±50, y from −110 to 0. */
export const signPost = (x: number, y: number, color = '#c68b4e') =>
  `<rect x="${x - 6}" y="${y - 80}" width="12" height="80" fill="#8a5a33"/>` +
  `<rect x="${x - 50}" y="${y - 110}" width="100" height="44" rx="6" fill="${color}"/>` +
  `<path d="M${x - 34} ${y - 94}h68M${x - 34} ${y - 82}h44" stroke="#6b3f1d" stroke-width="5" stroke-linecap="round"/>`

/** Watering can, spout to the right; (x, y) = bottom center. Bounds: x from −46 to +62, y from −64 to 0. */
export const wateringCan = (x: number, y: number, color: string) =>
  `<path d="M${x + 26} ${y - 22}L${x + 58} ${y - 54}" stroke="${color}" stroke-width="10" stroke-linecap="round"/>` +
  `<path d="M${x - 30} ${y - 40}q-16 0 -16 -12q0 -12 16 -12" stroke="${color}" stroke-width="7" fill="none"/>` +
  `<rect x="${x - 30}" y="${y - 48}" width="60" height="48" rx="8" fill="${color}"/>` +
  `<rect x="${x + 50}" y="${y - 64}" width="14" height="14" rx="3" fill="${color}" transform="rotate(45 ${x + 57} ${y - 57})"/>`

/** Wheelbarrow, handles to the left; (x, y) = ground under the wheel. Bounds: x from −120 to +20, y from −70 to 0. */
export const wheelbarrow = (x: number, y: number, color: string) =>
  `<path d="M${x - 120} ${y - 60}L${x - 70} ${y - 40}M${x - 80} ${y - 20}V${y}" stroke="#6b4f3a" stroke-width="6" stroke-linecap="round"/>` +
  `<path d="M${x - 90} ${y - 56}h100l-24 40h-56Z" fill="${color}"/>` +
  `<circle cx="${x}" cy="${y - 18}" r="18" fill="#3d3d3d"/><circle cx="${x}" cy="${y - 18}" r="7" fill="#c9d1cc"/>`

/** Carrot growing in a bed: leaves and an orange top; (x, y) = soil line. Bounds: x ±16, y from −40 to +14. */
export const carrotPlant = (x: number, y: number) =>
  `<path d="M${x} ${y}l-12 -34M${x} ${y}l0 -40M${x} ${y}l12 -34" stroke="#3fa46f" stroke-width="6" stroke-linecap="round"/>` +
  `<path d="M${x - 12} ${y - 2}h24l-12 16Z" fill="#ff8c1a"/>`

/** Cabbage; (x, y) = bottom center. Bounds: x ±30, y from −46 to 0. */
export const cabbage = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y - 22}" r="24" fill="#8fd16a"/><path d="M${x - 28} ${y - 10}q8 -36 28 -36q20 0 28 36q-28 14 -56 0Z" fill="#5fae4b"/>` +
  `<path d="M${x} ${y - 46}v30" stroke="#d6f0c4" stroke-width="3"/>`

/** Birdhouse on a pole; (x, y) = foot. Bounds: x ±32, y from −160 to 0. */
export const birdhouse = (x: number, y: number, color: string) =>
  `<rect x="${x - 4}" y="${y - 100}" width="8" height="100" fill="#8a5a33"/>` +
  `<rect x="${x - 26}" y="${y - 140}" width="52" height="46" fill="${color}"/>` +
  `<path d="M${x - 32} ${y - 136}L${x} ${y - 160}L${x + 32} ${y - 136}Z" fill="#8a3b2e"/>` +
  `<circle cx="${x}" cy="${y - 120}" r="9" fill="#3d2a20"/>`

/** Scarecrow; (x, y) = foot of the pole. Bounds: x ±60, y from −176 to 0. The hat is `strawHat`. */
export const scarecrow = (x: number, y: number, shirt = '#3a86ff') =>
  `<rect x="${x - 4}" y="${y - 130}" width="8" height="130" fill="#8a5a33"/><rect x="${x - 60}" y="${y - 112}" width="120" height="8" fill="#8a5a33"/>` +
  `<path d="M${x - 40} ${y - 116}h80l-10 66h-60Z" fill="${shirt}"/><path d="M${x - 30} ${y - 50}l-6 12M${x + 30} ${y - 50}l6 12" stroke="#f2c14e" stroke-width="5"/>` +
  `<circle cx="${x}" cy="${y - 136}" r="20" fill="#f2d29b"/><circle cx="${x - 7}" cy="${y - 138}" r="3" fill="#3d2a20"/><circle cx="${x + 7}" cy="${y - 138}" r="3" fill="#3d2a20"/>`

/** Straw hat on the scarecrow at (x, y). Bounds: x ±34, y from −176 to −146. */
export const strawHat = (x: number, y: number, band = '#e63946') =>
  `<ellipse cx="${x}" cy="${y - 150}" rx="34" ry="6" fill="#f2c14e"/><path d="M${x - 18} ${y - 150}q2 -26 18 -26q16 0 18 26Z" fill="#f2c14e"/>` +
  `<rect x="${x - 18}" y="${y - 160}" width="36" height="6" fill="${band}"/>`

/** Snowball heap of `n` balls (1–3) left to right; (x, y) = ground at the first. Bounds: x from −20 to +20 + 40·(n − 1), y from −40 to 0. */
export const snowballs = (x: number, y: number, n: number) =>
  [0, 1, 2]
    .slice(0, n)
    .map((i) => `<circle cx="${x + 40 * i}" cy="${y - 18}" r="18" fill="#ffffff" stroke="#c9d6e3" stroke-width="3"/>`)
    .join('')

/** Sled, facing right; (x, y) = ground under the middle. Bounds: x ±62, y from −36 to 0. */
export const sled = (x: number, y: number, color: string) =>
  `<path d="M${x - 56} ${y - 4}h104q14 0 14 -16" stroke="#5c677d" stroke-width="6" fill="none" stroke-linecap="round"/>` +
  `<path d="M${x - 40} ${y - 4}v-14M${x + 30} ${y - 4}v-14" stroke="#5c677d" stroke-width="6"/>` +
  `<rect x="${x - 56}" y="${y - 36}" width="106" height="18" rx="6" fill="${color}"/>`

/** Big snowman; (x, y) = bottom center. Bounds: x ±58, y from −200 to 0. The scarf is `scarf`. */
export const bigSnowman = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y - 54}" r="54" fill="#ffffff"/><circle cx="${x}" cy="${y - 136}" r="38" fill="#ffffff"/>` +
  `<rect x="${x - 26}" y="${y - 200}" width="52" height="32" rx="4" fill="#3d3d3d"/><rect x="${x - 36}" y="${y - 174}" width="72" height="8" rx="3" fill="#3d3d3d"/>` +
  `<circle cx="${x - 12}" cy="${y - 144}" r="4" fill="#3d3d3d"/><circle cx="${x + 12}" cy="${y - 144}" r="4" fill="#3d3d3d"/>` +
  `<path d="M${x} ${y - 134}l26 6l-26 6Z" fill="#ff8c1a"/>` +
  `<g fill="#3d3d3d"><circle cx="${x}" cy="${y - 70}" r="5"/><circle cx="${x}" cy="${y - 46}" r="5"/></g>`

/** Scarf of `bigSnowman(x, y)`. Bounds: x from −40 to +40, y from −110 to −56. */
export const scarf = (x: number, y: number, color: string) =>
  `<rect x="${x - 40}" y="${y - 110}" width="80" height="16" rx="8" fill="${color}"/><rect x="${x + 12}" y="${y - 104}" width="18" height="48" rx="6" fill="${color}"/>`

/** Market stall: counter and posts (the awning is `stallAwning`); (x, y) = ground center, w wide. Bounds: x ±w/2, y from −220 to 0. */
export const stall = (x: number, y: number, w: number) =>
  `<rect x="${x - w / 2 + 6}" y="${y - 220}" width="12" height="220" fill="#8a5a33"/><rect x="${x + w / 2 - 18}" y="${y - 220}" width="12" height="220" fill="#8a5a33"/>` +
  `<rect x="${x - w / 2}" y="${y - 100}" width="${w}" height="100" rx="6" fill="#c68b4e"/>` +
  `<path d="M${x - w / 2} ${y - 66}h${w}M${x - w / 2} ${y - 33}h${w}" stroke="#9c6a37" stroke-width="4"/>`

/** Striped awning over a stall at x, w wide, its top at y. Bounds: x ±(w/2 + 10), y to y + 56. */
export const stallAwning = (x: number, y: number, w: number, a: string, b = '#ffffff') => {
  const n = 8
  const s = (w + 20) / n
  return Array.from({ length: n }, (_, i) => {
    const x0 = x - w / 2 - 10 + s * i
    return `<path d="M${x0} ${y}h${s}v40a${s / 2} ${s / 2 - 6} 0 0 1 ${-s} 0Z" fill="${i % 2 ? b : a}"/>`
  }).join('')
}

/** Box of produce on the counter: a crate with fruit heaped on it; (x, y) = bottom center. Bounds: x ±50, y from −76 to 0. */
export const produce = (x: number, y: number, color: string, n = 5) =>
  `<rect x="${x - 50}" y="${y - 40}" width="100" height="40" rx="4" fill="#e9b872"/>` +
  Array.from({ length: n }, (_, i) => {
    const row = i < 3 ? 0 : 1
    const col = row === 0 ? i - 1 : i - 3.5
    return `<circle cx="${x + col * 28}" cy="${y - 50 - row * 20}" r="15" fill="${color}"/>`
  }).join('') +
  `<rect x="${x - 50}" y="${y - 40}" width="100" height="10" fill="#c68b4e"/>`

/** Watermelon; (x, y) = bottom center. Bounds: x ±46, y from −62 to 0. */
export const watermelon = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 31}" rx="46" ry="31" fill="#3f8f3a"/>` +
  `<path d="M${x - 30} ${y - 54}q8 22 0 46M${x} ${y - 62}q10 31 0 62M${x + 30} ${y - 54}q-8 22 0 46" stroke="#2a6b2e" stroke-width="6" fill="none"/>`

/** Pumpkin; (x, y) = bottom center. Bounds: x ±44, y from −74 to 0. */
export const pumpkin = (x: number, y: number) =>
  `<rect x="${x - 5}" y="${y - 74}" width="10" height="18" rx="3" fill="#6b8f3a"/>` +
  `<g fill="#ff8c1a"><ellipse cx="${x - 22}" cy="${y - 30}" rx="22" ry="30"/><ellipse cx="${x + 22}" cy="${y - 30}" rx="22" ry="30"/></g>` +
  `<ellipse cx="${x}" cy="${y - 30}" rx="24" ry="31" fill="#ffa53a"/>`

// --- Busier scenes (316–330) ---

/** Lamp hanging from the ceiling on a cord down to `cord`; (x, 0) = cord top. Bounds: x ±30, y from 0 to cord + 40. */
export const hangingLamp = (x: number, cord: number, shade: string) =>
  `<path d="M${x} 0V${cord}" stroke="#3d4a55" stroke-width="3"/>` +
  `<path d="M${x - 14} ${cord}h28l16 30h-60Z" fill="${shade}"/><circle cx="${x}" cy="${cord + 34}" r="6" fill="#fff3b0"/>`

/** Kite with a bowed tail; (x, y) = center of the diamond. Bounds: x ±24, y from −34 to +84. */
export const kite = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y + 34}q-10 14 0 25t0 25" stroke="#6b766f" stroke-width="2" fill="none"/>` +
  `<path d="M${x - 8} ${y + 52}l8 4l8 -4v8l-8 -4l-8 4ZM${x - 8} ${y + 72}l8 4l8 -4v8l-8 -4l-8 4Z" fill="#ffffff"/>` +
  `<path d="M${x} ${y - 34}L${x + 24} ${y}L${x} ${y + 34}L${x - 24} ${y}Z" fill="${color}"/>` +
  `<path d="M${x} ${y - 34}V${y + 34}M${x - 24} ${y}H${x + 24}" stroke="#ffffff" stroke-opacity="0.7" stroke-width="2.5"/>`

/** Suitcase; (x, y) = bottom center. Bounds: x ±18, y from −58 to 0. */
export const suitcase = (x: number, y: number, color: string) =>
  `<path d="M${x - 8} ${y - 48}v-8h16v8" stroke="#3d4a55" stroke-width="4" fill="none"/>` +
  `<rect x="${x - 18}" y="${y - 48}" width="36" height="48" rx="5" fill="${color}"/>` +
  `<path d="M${x - 18} ${y - 30}h36" stroke="#ffffff" stroke-opacity="0.5" stroke-width="3"/>`

// --- Decor: small things that fill a scene (the same in both pictures) ---

/** Vase with three flowers; (x, y) = bottom center. Bounds: x ±13, y from −51 to 0. */
export const flowerVase = (x: number, y: number, color: string, flower = '#ff6b8b') =>
  `<path d="M${x} ${y - 24}l-8 -18M${x} ${y - 24}v-20M${x} ${y - 24}l8 -16" stroke="#3fa46f" stroke-width="2.5"/>` +
  `<g fill="${flower}"><circle cx="${x - 8}" cy="${y - 43}" r="5"/><circle cx="${x}" cy="${y - 46}" r="5"/><circle cx="${x + 8}" cy="${y - 41}" r="5"/></g>` +
  `<path d="M${x - 6} ${y - 26}h12q8 10 4 22q-2 4 -10 4q-8 0 -10 -4q-4 -12 4 -22Z" fill="${color}"/>`

/** Pillow; (x, y) = center. Bounds: x ±18, y ±12. */
export const pillow = (x: number, y: number, color: string) =>
  `<path d="M${x - 18} ${y - 12}q18 6 36 0q-4 12 0 24q-18 -6 -36 0q4 -12 0 -24Z" fill="${color}"/><circle cx="${x}" cy="${y}" r="2.5" fill="#ffffff" fill-opacity="0.6"/>`

/** Mug; (x, y) = bottom center. Bounds: x from −9 to +15, y from −18 to 0. */
export const mug = (x: number, y: number, color: string) =>
  `<path d="M${x + 8} ${y - 13}h3a4 4 0 0 1 0 8h-3" stroke="${color}" stroke-width="3" fill="none"/><rect x="${x - 9}" y="${y - 18}" width="18" height="18" rx="3" fill="${color}"/>`

/** Glass jar with a lid; (x, y) = bottom center. Bounds: x ±11, y from −28 to 0. */
export const glassJar = (x: number, y: number, lid: string, fill = '#ffd23f') =>
  `<rect x="${x - 10}" y="${y - 22}" width="20" height="22" rx="4" fill="#e3f2fa"/><rect x="${x - 8}" y="${y - 14}" width="16" height="12" rx="2" fill="${fill}"/>` +
  `<rect x="${x - 11}" y="${y - 28}" width="22" height="7" rx="2" fill="${lid}"/>`

/** Bottle with a label; (x, y) = bottom center. Bounds: x ±8, y from −36 to 0. */
export const bottle = (x: number, y: number, color: string) =>
  `<rect x="${x - 3}" y="${y - 36}" width="6" height="10" fill="${color}"/><rect x="${x - 8}" y="${y - 28}" width="16" height="28" rx="5" fill="${color}"/>` +
  `<rect x="${x - 6}" y="${y - 18}" width="12" height="8" fill="#ffffff" fill-opacity="0.6"/>`

/** Toy cube with a dot; (x, y) = bottom center, side s. Bounds: x ±s/2, y from −s to 0. */
export const cube = (x: number, y: number, s: number, color: string) =>
  `<rect x="${x - s / 2}" y="${y - s}" width="${s}" height="${s}" rx="${s * 0.12}" fill="${color}"/><circle cx="${x}" cy="${y - s / 2}" r="${s * 0.2}" fill="#ffffff" fill-opacity="0.7"/>`

/** Star sticker; (x, y) = center. Bounds: x ±14, y from −14 to +11. */
export const sticker = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y - 14}l4 9h10l-8 6l3 10l-9 -6l-9 6l3 -10l-8 -6h10Z" fill="${color}"/>`

/** Plate lying on a table; (x, y) = center. Bounds: x ±18, y ±5. */
export const plate = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="18" ry="5" fill="#ffffff"/><ellipse cx="${x}" cy="${y}" rx="11" ry="3" fill="#e9edf2"/>`

/** Pair of slippers seen from above; (x, y) = center. Bounds: x ±19, y ±6. */
export const slipperPair = (x: number, y: number, color: string) =>
  `<g fill="${color}"><ellipse cx="${x - 9}" cy="${y}" rx="9" ry="5.5"/><ellipse cx="${x + 9}" cy="${y}" rx="9" ry="5.5"/></g>` +
  `<g fill="#ffffff" fill-opacity="0.5"><ellipse cx="${x - 13}" cy="${y}" rx="3.5" ry="3.5"/><ellipse cx="${x + 5}" cy="${y}" rx="3.5" ry="3.5"/></g>`



/** Bubble; (x, y) = center. Bounds: radius r + 2. */
export const bubble = (x: number, y: number, r: number) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#ffffff" stroke-opacity="0.8" stroke-width="2.5"/>`


