// "Time" category: flat cartoon shapes for the moments of a scene (evening light, snow, bare trees)
// and the details that differ. Each returns SVG markup positioned at (x, y); the bounds in the
// comments are what a difference or trap zone must cover.
import { rng } from '../helpers.ts'
export { cloud, pick, sun } from '../shapes.ts'
export { awning, bench, bike, building, car, cityTree, door, dog, hydrant, lampPost, person, pigeon, street, window } from '../chapter-02/shapes.ts'
export { bush, cabin, fireLogs, flame, mushroom, oak, pine, rabbit, rock, stump, tent } from '../chapter-03/shapes.ts'
export { buoy, gull, lifeRing, sailboat, waves } from '../chapter-04/shapes.ts'

// --- Sky and light ---

/** Evening over the whole picture: drawn after the scenery, before the lights that glow in the dark. */
export const DUSK = `<rect width="800" height="500" fill="#0d1440" fill-opacity="0.42"/>`

/** Sky down to y: day blue, or an evening sky with a sunset glow at the horizon. */
export const sky = (evening: boolean, y = 500) =>
  evening
    ? `<rect width="800" height="${y}" fill="#4b4f9e"/><rect y="${y - 70}" width="800" height="40" fill="#b07ab0"/>` +
      `<rect y="${y - 30}" width="800" height="30" fill="#f2a46e"/>`
    : `<rect width="800" height="${y}" fill="#bfe6f7"/>`

/** Pale winter sky down to y. */
export const winterSky = (y = 500) => `<rect width="800" height="${y}" fill="#dbe7f0"/>`

/** Full moon with a halo; (x, y) = center. Bounds: radius 40. */
export const moon = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="40" fill="#fff6c9" fill-opacity="0.18"/><circle cx="${x}" cy="${y}" r="26" fill="#fff6c9"/>` +
  `<circle cx="${x - 8}" cy="${y - 6}" r="5" fill="#e9dfa8"/><circle cx="${x + 9}" cy="${y + 7}" r="4" fill="#e9dfa8"/>`

/** Four-pointed star; (x, y) = center. Bounds: radius 1.4·s… 7·s. */
export const star = (x: number, y: number, s = 1) =>
  `<path d="M${x} ${y - 7 * s}q${s} ${6 * s} ${7 * s} ${7 * s}q${-6 * s} ${s} ${-7 * s} ${7 * s}q${-s} ${-6 * s} ${-7 * s} ${-7 * s}q${6 * s} ${-s} ${7 * s} ${-7 * s}Z" fill="#fff7d1"/>`

/** A few stars around (x, y) from fixed offsets. Bounds: radius 40. */
export const stars = (x: number, y: number) =>
  star(x - 24, y - 14, 0.9) + star(x + 18, y - 22, 0.7) + star(x + 4, y + 6, 1.1) + star(x - 14, y + 24, 0.6) + star(x + 26, y + 18, 0.8)

/** Lit glass over a `window` (chapter 2 shapes) at (x, y). Bounds: x ±16, y ±19. */
export const windowLight = (x: number, y: number) =>
  `<rect x="${x - 16}" y="${y - 19}" width="32" height="38" rx="4" fill="#ffd866" fill-opacity="0.25"/>` +
  `<rect x="${x - 10}" y="${y - 13}" width="20" height="26" fill="#ffd866"/><path d="M${x} ${y - 13}v26M${x - 10} ${y}h20" stroke="#e8b74a" stroke-width="2"/>`

/** Lit glass of a w × h window with its top-left corner at (x, y). Bounds: the window plus 4. */
export const glow = (x: number, y: number, w: number, h: number) =>
  `<rect x="${x - 4}" y="${y - 4}" width="${w + 8}" height="${h + 8}" rx="4" fill="#ffd866" fill-opacity="0.25"/>` +
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffd866"/>`

/** Lamp head (city `lampPost` at foot (x, y)), dark or lit. Bounds: x ±10 (lit: ±34), y from −134 to −66. */
export const lampHead = (x: number, y: number, lit: boolean) =>
  (lit ? `<circle cx="${x}" cy="${y - 100}" r="34" fill="#ffe08a" fill-opacity="0.3"/>` : '') +
  `<path d="M${x - 10} ${y - 92}h20l-4 -20h-12Z" fill="#3d4a55"/>` +
  `<circle cx="${x}" cy="${y - 100}" r="7" fill="${lit ? '#fff3b0' : '#d8dee4'}"/>`

/** Ground shadow cast to the left (low morning sun on the right); (x, y) = foot of the object. Bounds: x from −len to +10, y ±8. */
export const shadow = (x: number, y: number, len: number) =>
  `<ellipse cx="${x - len / 2 + 5}" cy="${y}" rx="${len / 2 + 5}" ry="8" fill="#1d3b2a" fill-opacity="0.22"/>`

/** Flying birds ("v" marks) around (x, y). Bounds: x ±30, y ±16. */
export const birds = (x: number, y: number) =>
  [[-20, -6, 1], [4, 6, 0.8], [20, -10, 0.9]]
    .map(([dx, dy, s]) => `<path d="M${x + dx - 9 * s} ${y + dy - 4 * s}q${5 * s} ${-2 * s} ${9 * s} ${4 * s}q${4 * s} ${-6 * s} ${9 * s} ${-4 * s}" stroke="#3d4a55" stroke-width="2.5" fill="none" stroke-linecap="round"/>`)
    .join('')

// --- Winter ---

/** Snow cap lying on a ledge from x to x + w at height y. Bounds: x from −3 to w + 3, y from −8 to +4. */
export const snowCap = (x: number, y: number, w: number) => {
  let bumps = ''
  for (let i = 0; i < Math.max(1, Math.round(w / 24)); i++) bumps += `q${w / Math.max(1, Math.round(w / 24)) / 2} -8 ${w / Math.max(1, Math.round(w / 24))} 0`
  return `<path d="M${x - 3} ${y + 4}V${y}${bumps}l3 0V${y + 4}Z" fill="#ffffff"/>`
}

/** Snow on the slopes of a gable roof with its ridge at (x, y) and eaves at (x ± half, y + rise). Bounds: the roof plus 4. */
export const roofSnow = (x: number, y: number, half: number, rise: number) =>
  `<path d="M${x - half - 4} ${y + rise + 2}L${x} ${y - 4}L${x + half + 4} ${y + rise + 2}L${x + half - 6} ${y + rise + 4}q-${half / 2} -12 -${half - 6} -${rise * 0.55}q-${half / 2} ${rise * 0.4} -${half - 6} ${rise * 0.55 + 4}Z" fill="#ffffff"/>`

/** Icicles hanging under an edge from x0 to x1 at y. Bounds: x0…x1, y to y + 16. */
export const icicles = (x0: number, x1: number, y: number) => {
  let out = ''
  for (let x = x0 + 4, i = 0; x < x1 - 4; x += 12, i++) out += `<path d="M${x - 4} ${y}h8l-4 ${10 + (i % 3) * 3}Z" fill="#cfe8f7"/>`
  return out
}

/** Snowman; (x, y) = bottom center. Bounds: x ±26, y from −84 to 0. */
export const snowman = (x: number, y: number, scarf = '#e63946') =>
  `<g transform="translate(${x} ${y})"><circle cy="-20" r="20" fill="#ffffff"/><circle cy="-50" r="14" fill="#ffffff"/>` +
  `<circle cy="-72" r="10" fill="#ffffff"/><path d="M-1 -72l9 3l-9 2Z" fill="#fb8500"/><circle cx="-4" cy="-75" r="1.5" fill="#222"/><circle cx="4" cy="-75" r="1.5" fill="#222"/>` +
  `<rect x="-12" y="-62" width="24" height="6" rx="3" fill="${scarf}"/><path d="M-14 -50l-12 -10M14 -50l12 -10" stroke="#6b4f3a" stroke-width="2.5" stroke-linecap="round"/>` +
  `<rect x="-8" y="-84" width="16" height="4" fill="#3d4a55"/></g>`

/** Bare tree with snow on its branches; (x, y) = bottom of the trunk. Bounds: x ±40·s, y from −100·s to 0. */
export const bareTree = (x: number, y: number, s = 1, snow = true) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-6 0V-50L-30 -80M-2 -54L-2 -100M2 -60L30 -86M0 -40L24 -56M-4 -66L-20 -92" stroke="#7a5236" stroke-width="7" stroke-linecap="round" fill="none"/>` +
  (snow ? `<path d="M-30 -84l10 0M-6 -102l8 0M26 -90l9 1M20 -60l8 0M-24 -96l7 0" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>` : '') +
  `</g>`

/** Snow on a `pine` (forest shapes) at (x, y), scale s. Bounds: x ±30·s, y from −100·s to −14·s. */
export const pineSnow = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="#ffffff"><path d="M0 -100L-9 -82q9 4 18 0Z"/>` +
  `<path d="M-22 -60q11 -6 22 -2q11 -4 22 2l-6 -6h-32Z"/><path d="M-30 -16q15 -6 30 -2q15 -4 30 2l-6 -6h-48Z"/></g>`

/** Puffs of chimney smoke rising from (x, y). Bounds: x from −6 to +34, y from −56 to 0. */
export const smoke = (x: number, y: number) =>
  `<g fill="#9aa5b4" fill-opacity="0.8"><circle cx="${x + 2}" cy="${y - 8}" r="8"/><circle cx="${x + 14}" cy="${y - 26}" r="11"/><circle cx="${x + 22}" cy="${y - 46}" r="10"/></g>`

/** Snow flakes over the picture above y (the same in every picture of a level: own seed). */
export const snowfall = (seed: number, y: number, n = 40) => {
  const rand = rng(seed)
  let out = ''
  for (let i = 0; i < n; i++) out += `<circle cx="${(rand() * 800).toFixed(1)}" cy="${(rand() * y).toFixed(1)}" r="${(1.5 + rand() * 2).toFixed(1)}" fill="#ffffff"/>`
  return out
}

/** Pond; (x, y) = center, rx × ry. Summer water with ripples or winter ice. Bounds: x ±rx, y ±ry. */
export const pond = (x: number, y: number, rx: number, ry: number, frozen: boolean) =>
  frozen
    ? `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#cfe6f3"/><path d="M${x - rx / 2} ${y - ry / 4}l${rx / 3} ${-ry / 6}M${x} ${y + ry / 3}l${rx / 2.5} ${-ry / 5}" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>`
    : `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#5aa9d6"/><path d="M${x - rx / 2} ${y}q8 -5 16 0t16 0M${x + rx / 6} ${y + ry / 3}q8 -5 16 0t16 0" stroke="#ffffff" stroke-opacity="0.6" stroke-width="2.5" fill="none"/>`

/**
 * Person in winter clothes (city `person` with a coat, hat and scarf), faces right; (x, y) = feet.
 * Bounds: x ±15, y from −72 to 0.
 */
export const winterPerson = (x: number, y: number, coat: string, flip = false, hat = '#e63946') =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<rect x="-9" y="-20" width="7" height="20" fill="#3d4a55"/><rect x="2" y="-20" width="7" height="20" fill="#3d4a55"/>` +
  `<path d="M-13 -48h26l3 32h-32Z" fill="${coat}"/><path d="M-12 -46l-3 22M12 -46l3 22" stroke="${coat}" stroke-width="6" stroke-linecap="round"/>` +
  `<circle cy="-54" r="8" fill="#f2d29b"/><rect x="-9" y="-49" width="18" height="5" rx="2" fill="${hat}"/>` +
  `<path d="M-9 -57q9 -12 18 0Z" fill="${hat}"/><circle cy="-66" r="4" fill="#ffffff"/><circle cx="3" cy="-55" r="1.2" fill="#222"/></g>`

// --- Details that differ ---

/** Gable house; (x, y) = ground center, w × h walls, roof rising `rise` above them. No windows or door. Bounds: x ±(w/2 + 12), y from −(h + rise) to 0. */
export const house = (x: number, y: number, w: number, h: number, rise: number, wall: string, roof: string) =>
  `<rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" fill="${wall}"/>` +
  `<path d="M${x - w / 2 - 12} ${y - h + 2}L${x} ${y - h - rise}L${x + w / 2 + 12} ${y - h + 2}Z" fill="${roof}"/>`

/** Square window with a frame; (x, y) = top-left corner, size w × h. Bounds: the rectangle plus 3. */
export const pane = (x: number, y: number, w: number, h: number, frame = '#f4efe6', glass = '#bde3f2') =>
  `<rect x="${x - 3}" y="${y - 3}" width="${w + 6}" height="${h + 6}" fill="${frame}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${glass}"/>` +
  `<path d="M${x + w / 2} ${y}v${h}M${x} ${y + h / 2}h${w}" stroke="${frame}" stroke-width="2.5"/>`

/** Chimney standing on a roof at (x, y) = its bottom center. Bounds: x ±10, y from −34 to 0. */
export const chimney = (x: number, y: number, color = '#9c4a3a') =>
  `<rect x="${x - 8}" y="${y - 30}" width="16" height="30" fill="${color}"/><rect x="${x - 10}" y="${y - 34}" width="20" height="6" fill="#6b3a2e"/>`

/** Weather vane on a roof ridge at (x, y), arrow pointing right (dir 1) or left (−1). Bounds: x ±20, y from −46 to 0. */
export const vane = (x: number, y: number, dir: 1 | -1 = 1) =>
  `<g transform="translate(${x} ${y}) scale(${dir} 1)"><path d="M0 0V-40" stroke="#3d4a55" stroke-width="2.5"/>` +
  `<path d="M-18 -32h30" stroke="#3d4a55" stroke-width="2.5"/><path d="M12 -38l8 6l-8 6Z" fill="#3d4a55"/>` +
  `<path d="M-18 -32l-2 -6h6l2 6l-2 6h-6Z" fill="#3d4a55"/><path d="M-6 -42q6 -6 10 0q-2 4 -10 0Z" fill="#3d4a55"/></g>`

/** Picket fence: n boards from x0 every `step` units on the ground at y. Bounds: x0 − 2 … last board + 12, y from −44 to 0. */
export const fence = (x0: number, n: number, y: number, color = '#e9d3a7', step = 22, skip: number[] = []) => {
  let boards = ''
  for (let i = 0; i < n; i++) if (!skip.includes(i)) boards += picket(x0 + i * step, y, color)
  return `<rect x="${x0 - 2}" y="${y - 30}" width="${(n - 1) * step + 14}" height="6" fill="#cdb58a"/><rect x="${x0 - 2}" y="${y - 14}" width="${(n - 1) * step + 14}" height="6" fill="#cdb58a"/>` + boards
}

/** One fence board with its left edge at x on the ground at y. Bounds: x…x + 10, y from −44 to 0. */
export const picket = (x: number, y: number, color = '#e9d3a7') => `<path d="M${x} ${y}V${y - 38}l5 -6l5 6V${y}Z" fill="${color}"/>`

/** Mailbox on a post; (x, y) = foot. Bounds: x ±14, y from −50 to 0. */
export const mailbox = (x: number, y: number, color = '#3a86ff') =>
  `<rect x="${x - 2}" y="${y - 32}" width="5" height="32" fill="#6b4f3a"/><path d="M${x - 14} ${y - 32}v-12a6 6 0 0 1 6 -6h16a6 6 0 0 1 6 6v12Z" fill="${color}"/>` +
  `<path d="M${x + 10} ${y - 46}v-4h6v4Z" fill="#e63946"/>`

/** Sitting cat, faces right; (x, y) = bottom center. Bounds: x ±18, y from −36 to 0. */
export const cat = (x: number, y: number, color = '#f08c3a', flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><path d="M-10 -2q-14 -2 -8 -14" stroke="${color}" stroke-width="4" fill="none" stroke-linecap="round"/>` +
  `<ellipse cy="-12" rx="11" ry="12" fill="${color}"/><circle cx="4" cy="-26" r="8" fill="${color}"/>` +
  `<path d="M-2 -31l1 -5l5 3ZM6 -33l5 -3l0 6Z" fill="${color}"/><circle cx="7" cy="-27" r="1.4" fill="#222"/></g>`

/** Hen house / dog kennel; (x, y) = ground center. Bounds: x ±30, y from −50 to 0. */
export const kennel = (x: number, y: number, color = '#c1622f') =>
  `<rect x="${x - 24}" y="${y - 32}" width="48" height="32" fill="${color}"/><path d="M${x - 30} ${y - 30}L${x} ${y - 50}L${x + 30} ${y - 30}Z" fill="#6b3a2e"/>` +
  `<path d="M${x - 10} ${y}v-14a10 10 0 0 1 20 0v14Z" fill="#3d2a20"/>`

/** Wooden crate; (x, y) = bottom center, size s. Bounds: x ±s/2, y from −s to 0. */
export const crate = (x: number, y: number, s = 30, color = '#c68b4e') =>
  `<rect x="${x - s / 2}" y="${y - s}" width="${s}" height="${s}" fill="${color}"/><path d="M${x - s / 2} ${y - s}l${s} ${s}M${x - s / 2 + 3} ${y - s + 3}h${s - 6}v${s - 6}h${-s + 6}Z" stroke="#9c6a37" stroke-width="2.5" fill="none"/>`

/** Barrel; (x, y) = bottom center. Bounds: x ±14, y from −34 to 0. */
export const barrel = (x: number, y: number, color = '#a0703f') =>
  `<path d="M${x - 12} ${y}q-4 -17 0 -34h24q4 17 0 34Z" fill="${color}"/><path d="M${x - 14} ${y - 9}h28M${x - 14} ${y - 25}h28" stroke="#5a3d1e" stroke-width="3"/>`

/** Swing frame with one seat; (x, y) = ground center. The seat is `swingSeat`. Bounds: x ±44, y from −90 to 0. */
export const swingFrame = (x: number, y: number, color = '#3a86ff') =>
  `<path d="M${x - 44} ${y}L${x - 30} ${y - 90}H${x + 30}L${x + 44} ${y}" stroke="${color}" stroke-width="6" fill="none" stroke-linejoin="round"/>`

/** Swing seat on ropes hanging from the frame bar at (x, y) = bar point above it. Bounds: x ±14, y from 0 to +66. */
export const swingSeat = (x: number, y: number, color = '#e63946') =>
  `<path d="M${x - 10} ${y}v60M${x + 10} ${y}v60" stroke="#6b4f3a" stroke-width="2"/><rect x="${x - 14}" y="${y + 58}" width="28" height="8" rx="2" fill="${color}"/>`

/** Slide; (x, y) = ground under the ladder. Bounds: x from −6 to +86, y from −76 to 0. */
export const slide = (x: number, y: number, color = '#ffb703') =>
  `<path d="M${x} ${y}V${y - 70}M${x + 18} ${y}V${y - 70}" stroke="#8d99ae" stroke-width="4"/><path d="M${x} ${y - 20}h18M${x} ${y - 40}h18M${x} ${y - 60}h18" stroke="#8d99ae" stroke-width="3"/>` +
  `<path d="M${x - 4} ${y - 76}h26l60 70l4 6h-10l-60 -66h-20Z" fill="${color}"/>`

/** Ball; (x, y) = bottom center. Bounds: x ±12, y from −24 to 0. */
export const ball = (x: number, y: number, color = '#e63946') =>
  `<circle cx="${x}" cy="${y - 12}" r="12" fill="${color}"/><path d="M${x - 12} ${y - 12}h24M${x} ${y - 24}q-8 12 0 24" stroke="#ffffff" stroke-width="2.5" fill="none"/>`

/** Laundry line from x0 to x1 sagging under y with items `colors` (shirts). Bounds: x0…x1, y from −2 to +36. */
export const laundry = (x0: number, x1: number, y: number, colors: (string | null)[]) => {
  const step = (x1 - x0) / (colors.length + 1)
  let items = ''
  colors.forEach((c, i) => {
    if (c) items += shirt(x0 + step * (i + 1), y + 6, c)
  })
  return `<path d="M${x0} ${y}Q${(x0 + x1) / 2} ${y + 12} ${x1} ${y}" stroke="#555" stroke-width="1.5" fill="none"/>` + items
}

/** Shirt hanging with its collar at (x, y). Bounds: x ±14, y from −2 to +28. */
export const shirt = (x: number, y: number, color: string) =>
  `<path d="M${x - 6} ${y}l-8 6l4 6l4 -2v18h12v-18l4 2l4 -6l-8 -6q-6 4 -12 0Z" fill="${color}"/>`

/** Flag on a pole; (x, y) = pole foot. Bounds: x from −2 to +30, y from −70 to 0. */
export const flagPole = (x: number, y: number, color: string) =>
  `<rect x="${x - 2}" y="${y - 70}" width="4" height="70" fill="#5c677d"/><path d="M${x + 2} ${y - 68}h28l-6 9l6 9h-28Z" fill="${color}"/>`

/** Shop sign hanging from a bracket; (x, y) = bracket point. A cup, fish or bread icon. Bounds: x ±24, y from 0 to +42. */
export const hangingSign = (x: number, y: number, color: string, icon: 'cup' | 'fish' | 'bread') => {
  const art = {
    cup: `<path d="M${x - 8} ${y + 16}h14v10a7 7 0 0 1 -14 0Z" fill="#ffffff"/><path d="M${x + 6} ${y + 19}a4 4 0 0 1 0 7" stroke="#ffffff" stroke-width="2" fill="none"/>`,
    fish: `<ellipse cx="${x - 1}" cy="${y + 24}" rx="9" ry="5" fill="#ffffff"/><path d="M${x + 7} ${y + 24}l7 -5v10Z" fill="#ffffff"/>`,
    bread: `<path d="M${x - 11} ${y + 28}q0 -12 11 -12q11 0 11 12Z" fill="#ffffff"/>`,
  }[icon]
  return `<path d="M${x - 14} ${y}h28M${x - 10} ${y}v6M${x + 10} ${y}v6" stroke="#3d4a55" stroke-width="2"/>` +
    `<rect x="${x - 22}" y="${y + 6}" width="44" height="34" rx="5" fill="${color}"/>${art}`
}

/** Lighthouse; (x, y) = bottom center. Bounds: x ±26, y from −170 to 0. Its light is `beam`. */
export const lighthouse = (x: number, y: number, stripe = '#e63946') =>
  `<path d="M${x - 22} ${y}L${x - 14} ${y - 140}h28L${x + 22} ${y}Z" fill="#ffffff"/>` +
  `<path d="M${x - 20} ${y - 30}h40l-2 -24h-36ZM${x - 16} ${y - 84}h32l-2 -24h-28Z" fill="${stripe}"/>` +
  `<rect x="${x - 18}" y="${y - 146}" width="36" height="8" fill="#3d4a55"/><rect x="${x - 10}" y="${y - 164}" width="20" height="18" fill="#bde3f2"/>` +
  `<path d="M${x - 14} ${y - 164}L${x} ${y - 176}L${x + 14} ${y - 164}Z" fill="#3d4a55"/>`

/** Lighthouse light at the lamp of `lighthouse(x, y)`, shining both ways. Bounds: x ±60, y from −182 to −146. */
export const beam = (x: number, y: number) =>
  `<path d="M${x} ${y - 155}L${x - 60} ${y - 176}V${y - 136}ZM${x} ${y - 155}L${x + 60} ${y - 176}V${y - 136}Z" fill="#fff3b0" fill-opacity="0.45"/>` +
  `<rect x="${x - 10}" y="${y - 164}" width="20" height="18" fill="#ffe08a"/>`

/** Pier deck from x0 to x1 at height y over water, posts every 60. */
export const pier = (x0: number, x1: number, y: number) => {
  let posts = ''
  for (let x = x0 + 10; x < x1; x += 60) posts += `<rect x="${x}" y="${y}" width="10" height="60" fill="#6b4f3a"/>`
  let planks = ''
  for (let x = x0 + 18; x < x1; x += 18) planks += `M${x} ${y}v14`
  return posts + `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="14" fill="#a0703f"/><path d="${planks}" stroke="#8a5a33" stroke-width="1.5"/>`
}

/** Rowing boat, faces right; (x, y) = waterline center. Bounds: x ±40, y from −16 to +6. */
export const rowboat = (x: number, y: number, hull = '#3a86ff') =>
  `<path d="M${x - 40} ${y - 14}h80l-10 20h-60Z" fill="${hull}"/><path d="M${x - 38} ${y - 10}h76" stroke="#ffffff" stroke-width="3"/>`

/** Bird house on a pole; (x, y) = pole foot. Bounds: x ±16, y from −76 to 0. */
export const birdHouse = (x: number, y: number, color = '#e07a5f') =>
  `<rect x="${x - 2}" y="${y - 48}" width="4" height="48" fill="#6b4f3a"/><rect x="${x - 12}" y="${y - 70}" width="24" height="24" fill="${color}"/>` +
  `<path d="M${x - 16} ${y - 68}L${x} ${y - 78}L${x + 16} ${y - 68}Z" fill="#6b3a2e"/><circle cx="${x}" cy="${y - 58}" r="4" fill="#3d2a20"/>`

/** Signpost with an arrow pointing right (1) or left (−1); (x, y) = foot. Bounds: x ±30, y from −64 to 0. */
export const signpost = (x: number, y: number, dir: 1 | -1 = 1, color = '#c68b4e') =>
  `<rect x="${x - 3}" y="${y - 56}" width="6" height="56" fill="#6b4f3a"/>` +
  `<path d="M${x - 26 * dir} ${y - 62}h${44 * dir}l${8 * dir} 9l${-8 * dir} 9h${-44 * dir}Z" fill="${color}"/>`

/** Tulips or daisies around (x, y). Bounds: x ±24, y from −22 to 0. */
export const flowers = (x: number, y: number, color = '#ff6b8b') =>
  [-16, -4, 9, 19]
    .map((dx, i) => `<path d="M${x + dx} ${y}v-${12 + (i % 2) * 4}" stroke="#3f8f3a" stroke-width="2.5"/><circle cx="${x + dx}" cy="${y - 14 - (i % 2) * 4}" r="${4.5}" fill="${color}"/>`)
    .join('')
