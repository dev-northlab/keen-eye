// Reusable flat cartoon shapes. Each returns SVG markup positioned at (x, y).

/** Bounds: x ±50·s, y from −44·s to +22·s. */
export const cloud = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="#ffffff">` +
  `<ellipse rx="50" ry="22"/><circle cx="-20" cy="-12" r="22"/><circle cx="15" cy="-18" r="26"/></g>`

/** Bounds: circle of radius 52 around (x, y). */
export const sun = (x: number, y: number, color = '#ffd23f') =>
  `<circle cx="${x}" cy="${y}" r="52" fill="#fff3b0" opacity="0.6"/>` +
  `<circle cx="${x}" cy="${y}" r="40" fill="${color}"/>`

/** (x, y) is the bottom of the stem. Bounds: x ±10, y from −30 to 0. */
export const flower = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M0 0V-18" stroke="#3f8f3a" stroke-width="3"/>` +
  `<circle cx="0" cy="-26" r="5" fill="${color}"/><circle cx="-6" cy="-20" r="5" fill="${color}"/>` +
  `<circle cx="6" cy="-20" r="5" fill="${color}"/><circle cx="-4" cy="-13" r="4" fill="${color}"/>` +
  `<circle cx="4" cy="-13" r="4" fill="${color}"/><circle cx="0" cy="-19" r="4" fill="#ffe36e"/></g>`

/** (x, y) is the bottom of the trunk. Crown center is at (x, y − 110). */
export const tree = (x: number, y: number) =>
  `<rect x="${x - 12}" y="${y - 90}" width="24" height="90" rx="6" fill="#8a5a33"/>` +
  `<circle cx="${x - 40}" cy="${y - 90}" r="38" fill="#4c9a3f"/>` +
  `<circle cx="${x + 40}" cy="${y - 90}" r="38" fill="#4c9a3f"/>` +
  `<circle cx="${x}" cy="${y - 120}" r="55" fill="#5bb04a"/>`

/** Bounds: x ±9, y from −14 to 0. */
export const grass = (x: number, y: number) =>
  `<path d="M${x - 9} ${y}L${x - 5} ${y - 12}L${x - 1} ${y}L${x + 3} ${y - 14}L${x + 9} ${y}Z" fill="#5fae4b"/>`

/** Faces right. Bounds: x from −30 to +38, y from −27 to +14. */
export const duck = (x: number, y: number) =>
  `<path d="M${x - 22} ${y - 4}L${x - 30} ${y - 14}L${x - 14} ${y - 8}Z" fill="#fab005"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="26" ry="14" fill="#ffd43b"/>` +
  `<ellipse cx="${x - 4}" cy="${y - 2}" rx="12" ry="6" fill="#fab005"/>` +
  `<circle cx="${x + 18}" cy="${y - 16}" r="11" fill="#ffd43b"/>` +
  `<path d="M${x + 28} ${y - 18}L${x + 38} ${y - 14}L${x + 28} ${y - 11}Z" fill="#ff922b"/>` +
  `<circle cx="${x + 21}" cy="${y - 19}" r="2" fill="#222"/>`

/** Faces right; (x, y) = body center. Bounds: x from −32 to +33, y from −31 to +26. */
export const hen = (x: number, y: number, flip = false, color = '#ffffff') =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<path d="M-6 16V26M6 16V26" stroke="#ff9f1c" stroke-width="3"/>` +
  `<path d="M-20 -4L-32 -16L-16 -12Z" fill="#f1f1f1"/>` +
  `<ellipse rx="22" ry="16" fill="${color}"/>` +
  `<circle cx="14" cy="-27" r="4" fill="#e63946"/><circle cx="19" cy="-26" r="4" fill="#e63946"/>` +
  `<circle cx="16" cy="-16" r="10" fill="${color}"/>` +
  `<path d="M25 -18L33 -15L25 -12Z" fill="#ff9f1c"/>` +
  `<circle cx="19" cy="-18" r="1.8" fill="#222"/></g>`

/** Faces right; (x, y) = body center. Bounds: x from −44 to +51, y from −30 to +30. */
export const pig = (x: number, y: number, flip = false, color = '#f7a8b8') =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<rect x="-24" y="10" width="10" height="20" rx="3" fill="#e48aa0"/><rect x="12" y="10" width="10" height="20" rx="3" fill="#e48aa0"/>` +
  `<path d="M-35 -4q-10 -4 -6 -12q4 -6 -2 -10" stroke="#e48aa0" stroke-width="3" fill="none"/>` +
  `<ellipse rx="36" ry="24" fill="${color}"/>` +
  `<circle cx="30" cy="-6" r="16" fill="${color}"/>` +
  `<path d="M20 -18L24 -30L32 -20Z" fill="#e48aa0"/>` +
  `<ellipse cx="44" cy="-2" rx="7" ry="6" fill="#e48aa0"/>` +
  `<circle cx="42" cy="-3" r="1.4" fill="#8a3b52"/><circle cx="46" cy="-3" r="1.4" fill="#8a3b52"/>` +
  `<circle cx="33" cy="-11" r="2" fill="#222"/></g>`

/** Faces right; (x, y) = body center. Bounds: x from −36 to +45, y from −23 to +28. */
export const sheep = (x: number, y: number, flip = false, wool = '#fbfbf7') =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<path d="M-20 10V28M-8 10V28M8 10V28M20 10V28" stroke="#3d3d3d" stroke-width="4"/>` +
  `<g fill="${wool}"><circle cx="-22" cy="0" r="14"/><circle cx="-8" cy="-8" r="15"/><circle cx="8" cy="-8" r="15"/>` +
  `<circle cx="22" cy="0" r="14"/><circle cx="-14" cy="8" r="13"/><circle cx="0" cy="8" r="14"/><circle cx="14" cy="8" r="13"/></g>` +
  `<ellipse cx="34" cy="-4" rx="10" ry="13" fill="#3d3d3d"/>` +
  `<ellipse cx="26" cy="-12" rx="7" ry="3" fill="#3d3d3d" transform="rotate(-30 26 -12)"/>` +
  `<circle cx="38" cy="-7" r="2" fill="#fff"/></g>`

/** Faces right; (x, y) = body center. Bounds: x from −58 to +66, y from −44 to +44. */
export const cow = (x: number, y: number, flip = false, spots = '#2b2b2b') =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<path d="M-48 -10q-10 10 -6 30" stroke="#d9d9d9" stroke-width="4" fill="none"/>` +
  `<g fill="#f2f2f2"><rect x="-40" y="14" width="11" height="30" rx="3"/><rect x="-22" y="14" width="11" height="30" rx="3"/>` +
  `<rect x="14" y="14" width="11" height="30" rx="3"/><rect x="30" y="14" width="11" height="30" rx="3"/></g>` +
  `<rect x="-50" y="-24" width="94" height="46" rx="20" fill="#ffffff"/>` +
  `<ellipse cx="-24" cy="-6" rx="13" ry="10" fill="${spots}"/><ellipse cx="10" cy="8" rx="10" ry="8" fill="${spots}"/>` +
  `<path d="M42 -34l-6 -10M58 -34l6 -10" stroke="#c9b79c" stroke-width="4" stroke-linecap="round"/>` +
  `<ellipse cx="50" cy="-20" rx="14" ry="17" fill="#ffffff"/>` +
  `<ellipse cx="52" cy="-4" rx="12" ry="8" fill="#f7b6c2"/>` +
  `<circle cx="54" cy="-24" r="2.2" fill="#222"/></g>`

/** Faces right; (x, y) = ground under the middle. Bounds: x from −60 to +58, y from −88 to 0. */
export const tractor = (x: number, y: number, color = '#d62828') =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="38" y="-68" width="6" height="22" fill="#555"/>` +
  `<rect x="-40" y="-60" width="64" height="30" rx="4" fill="${color}"/>` +
  `<rect x="10" y="-50" width="48" height="24" rx="4" fill="${color}"/>` +
  `<path d="M-38 -60V-86H-6L2 -60" fill="#bde3f2" stroke="#333" stroke-width="4"/>` +
  `<circle cx="-30" cy="-30" r="30" fill="#2b2b2b"/><circle cx="-30" cy="-30" r="12" fill="#f2c14e"/>` +
  `<circle cx="42" cy="-16" r="16" fill="#2b2b2b"/><circle cx="42" cy="-16" r="6" fill="#f2c14e"/></g>`

/** (x, y) = ground center. Bounds: x ±32, y from −78 to 0. */
export const beehive = (x: number, y: number, color = '#f4d35e') =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="-28" y="-20" width="56" height="20" fill="${color}" stroke="#c9a227" stroke-width="2"/>` +
  `<rect x="-28" y="-40" width="56" height="20" fill="${color}" stroke="#c9a227" stroke-width="2"/>` +
  `<rect x="-28" y="-60" width="56" height="20" fill="${color}" stroke="#c9a227" stroke-width="2"/>` +
  `<path d="M-32 -60L0 -78L32 -60Z" fill="#8a5a33"/>` +
  `<rect x="-8" y="-9" width="16" height="5" rx="2" fill="#5a3d1e"/></g>`

/** Bounds: x ±10, y from −10 to +6. */
export const bee = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<ellipse cx="-3" cy="-6" rx="5" ry="4" fill="#ffffff" opacity="0.85"/><ellipse cx="3" cy="-6" rx="5" ry="4" fill="#ffffff" opacity="0.85"/>` +
  `<ellipse rx="8" ry="5.5" fill="#ffd23f"/><path d="M-2 -5V5M3 -5V5" stroke="#222" stroke-width="2"/>` +
  `<circle cx="8" cy="0" r="2" fill="#222"/></g>`

/** (x, y) = bottom of the stem, flower head h above. Bounds: x ±20, y from −h−20 to 0. */
export const sunflower = (x: number, y: number, h: number, center = '#6b3f1d') => {
  let petals = ''
  for (let a = 0; a < 360; a += 30) petals += `<ellipse cx="0" cy="-12" rx="5" ry="8" transform="rotate(${a})"/>`
  return (
    `<path d="M${x} ${y}V${y - h}" stroke="#3f8f3a" stroke-width="4"/>` +
    `<path d="M${x} ${y - h * 0.45}q12 -10 18 -2q-8 8 -18 2Z" fill="#4c9a3f"/>` +
    `<g transform="translate(${x} ${y - h})" fill="#ffc300">${petals}<circle r="9" fill="${center}"/></g>`
  )
}

/** (x, y) = bottom center. Bounds: x ±17, y from −30 to 0. */
export const bucket = (x: number, y: number, color = '#8d99ae') =>
  `<path d="M${x - 13} ${y - 22}Q${x} ${y - 38} ${x + 13} ${y - 22}" stroke="#555" stroke-width="2" fill="none"/>` +
  `<path d="M${x - 15} ${y - 24}L${x + 15} ${y - 24}L${x + 11} ${y}L${x - 11} ${y}Z" fill="${color}"/>` +
  `<rect x="${x - 16}" y="${y - 26}" width="32" height="4" rx="2" fill="#5c677d"/>`

/** (x, y) = bottom center; `fruit` colors the heap. Bounds: x ±28, y from −36 to 0. */
export const basket = (x: number, y: number, fruit = '#e63946') =>
  `<circle cx="${x - 12}" cy="${y - 26}" r="9" fill="${fruit}"/><circle cx="${x + 2}" cy="${y - 28}" r="9" fill="${fruit}"/>` +
  `<circle cx="${x + 15}" cy="${y - 25}" r="9" fill="${fruit}"/>` +
  `<path d="M${x - 28} ${y - 24}L${x + 28} ${y - 24}L${x + 22} ${y}L${x - 22} ${y}Z" fill="#c68b4e"/>` +
  `<path d="M${x - 26} ${y - 16}H${x + 26}M${x - 24} ${y - 8}H${x + 24}" stroke="#9c6a37" stroke-width="2"/>`

/** Round hay bale; (x, y) = center. Bounds: x ±42, y ±34. */
export const hayBale = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="42" ry="34" fill="#f2c14e"/>` +
  `<path d="M${x - 26} ${y - 13}q10 -8 20 0M${x + 2} ${y - 18}q10 -8 20 0M${x - 16} ${y + 12}q10 -8 20 0M${x + 12} ${y + 7}q10 -8 18 0" stroke="#d9a43a" stroke-width="3" fill="none"/>`

/** Wooden fence from x0 to x1; rails at y and y + 23, posts down to y + 45. */
export const fence = (x0: number, x1: number, y: number, color = '#e9d3a7') => {
  let posts = ''
  for (let x = x0 + 4; x < x1 - 10; x += 40) posts += `<rect x="${x}" y="${y - 15}" width="14" height="60" rx="3" fill="${color}"/>`
  return (
    `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="8" fill="#d8bd8a"/>` +
    `<rect x="${x0}" y="${y + 23}" width="${x1 - x0}" height="8" fill="#d8bd8a"/>` +
    posts
  )
}

/** (x, y) = center. Bounds: x from −10 to +10, y from −16 to +10. */
export const apple = (x: number, y: number, color = '#e63946') =>
  `<path d="M${x} ${y - 9}q2 -6 7 -7" stroke="#6b3f1d" stroke-width="2" fill="none"/>` +
  `<circle cx="${x}" cy="${y}" r="10" fill="${color}"/>`

/** Small decoration items for the farm scenes. */

/** Faces right; (x, y) = body center. Bounds: x from −10 to +12, y from −14 to +9. */
export const chick = (x: number, y: number, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<path d="M-2 5V9M3 5V9" stroke="#ff9f1c" stroke-width="1.6"/>` +
  `<ellipse rx="9" ry="7" fill="#ffd43b"/><circle cx="5" cy="-7" r="5.5" fill="#ffd43b"/>` +
  `<path d="M10 -8L13 -6.5L10 -5Z" fill="#ff9f1c"/><circle cx="7" cy="-8" r="1" fill="#222"/>` +
  `<path d="M-6 -1q3 3 7 1" stroke="#fab005" stroke-width="1.6" fill="none"/></g>`

/** (x, y) = bottom center. Bounds: x ±16, y from −26 to 0. */
export const pumpkin = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M0 -18q1 -6 5 -8" stroke="#5c7a2a" stroke-width="3" fill="none"/>` +
  `<ellipse cx="-7" cy="-9" rx="9" ry="9" fill="#e8772e"/><ellipse cx="7" cy="-9" rx="9" ry="9" fill="#e8772e"/>` +
  `<ellipse cy="-9" rx="7" ry="10" fill="#f28c38"/></g>`

/** Carrot growing in the ground; (x, y) = ground. Bounds: x ±9, y from −18 to +4. */
export const carrot = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M0 -4L-7 -17M0 -4L0 -18M0 -4L7 -16" stroke="#4c9a3f" stroke-width="3" stroke-linecap="round"/>` +
  `<path d="M-5 -3H5L0 4Z" fill="#f08c2e"/></g>`

/** (x, y) = bottom center. Bounds: x ±10, y from −32 to 0. */
export const milkCan = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-9 0V-18L-5 -24H5L9 -18V0Z" fill="#c9d1d9"/>` +
  `<rect x="-6" y="-29" width="12" height="5" rx="1" fill="#a7b1bc"/><rect x="-4" y="-32" width="8" height="3" rx="1.5" fill="#8d99ae"/>` +
  `<rect x="-9" y="-12" width="18" height="3" fill="#8d99ae"/></g>`

/** Spout to the right; (x, y) = bottom center. Bounds: x from −16 to +20, y from −22 to 0. */
export const wateringCan = (x: number, y: number, color = '#4dabf7') =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-6 -16Q-16 -20 -12 -8" stroke="${color}" stroke-width="3" fill="none"/>` +
  `<path d="M8 -9L18 -19" stroke="${color}" stroke-width="3.5"/><rect x="15" y="-22" width="5" height="5" rx="1" fill="${color}"/>` +
  `<rect x="-9" y="-16" width="18" height="16" rx="2" fill="${color}"/></g>`

/** A few stones; (x, y) = ground center. Bounds: x ±17, y from −11 to 0. */
export const stones = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<ellipse cx="-7" cy="-5" rx="10" ry="6" fill="#9aa5ad"/><ellipse cx="7" cy="-4" rx="9" ry="5" fill="#b4bec5"/>` +
  `<ellipse cx="1" cy="-8" rx="6" ry="4" fill="#c6ced3"/></g>`

/** Faces right; (x, y) = bottom center. Bounds: x from −12 to +13, y from −15 to 0. */
export const snail = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-12 0H10Q13 0 12 -4L9 -10M9 -6L12 -12" stroke="#d6b07a" stroke-width="2.5" fill="none" stroke-linecap="round"/>` +
  `<path d="M-12 -1H9" stroke="#d6b07a" stroke-width="3"/>` +
  `<circle cx="-2" cy="-7" r="7" fill="#b5651d"/><path d="M-2 -7m-3.5 0a3.5 3.5 0 1 1 3.5 3.5" stroke="#8a4b16" stroke-width="1.5" fill="none"/></g>`

/** Three eggs in a nest; (x, y) = bottom center. Bounds: x ±15, y from −14 to 0. */
export const eggNest = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<ellipse cx="-6" cy="-7" rx="4.5" ry="6" fill="#fdf6e3"/><ellipse cx="6" cy="-7" rx="4.5" ry="6" fill="#f3e3c3"/>` +
  `<ellipse cy="-8" rx="4.5" ry="6" fill="#fffaf0"/>` +
  `<path d="M-15 -5Q0 4 15 -5Q14 1 0 1Q-14 1 -15 -5Z" fill="#a8743f"/>` +
  `<path d="M-12 -3l5 2M3 -1l6 -2" stroke="#7a5230" stroke-width="1.2"/></g>`

/** Birdhouse on a pole; (x, y) = bottom of the pole. Bounds: x ±13, y from −52 to 0. */
export const birdhouse = (x: number, y: number, color = '#e9a23b') =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="-2" y="-30" width="4" height="30" fill="#8a5a33"/>` +
  `<rect x="-9" y="-44" width="18" height="16" fill="${color}"/><path d="M-13 -42L0 -52L13 -42Z" fill="#8e2c27"/>` +
  `<circle cy="-37" r="3.5" fill="#4a2f17"/></g>`

/** Flower pot; (x, y) = bottom center. Bounds: x ±11, y from −28 to 0. */
export const flowerPot = (x: number, y: number, color = '#ff6b8b') =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M0 -12V-20" stroke="#3f8f3a" stroke-width="2"/>` +
  `<circle cy="-23" r="5" fill="${color}"/><circle cy="-23" r="2" fill="#ffe36e"/>` +
  `<path d="M-9 -13H9L6 0H-6Z" fill="#c8623b"/><rect x="-11" y="-15" width="22" height="4" rx="1" fill="#a84f2e"/></g>`

/** Small wheelbarrow, handles left; (x, y) = ground under the wheel. Bounds: x from −36 to +8, y from −22 to 0. */
export const wheelbarrow = (x: number, y: number, load = '#8a5a33') =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-12 -10L-20 0M-26 -12L-36 -16" stroke="#6b4a2b" stroke-width="2.5" stroke-linecap="round"/>` +
  `<ellipse cx="-10" cy="-16" rx="10" ry="4" fill="${load}"/>` +
  `<path d="M-24 -16H4L-4 -6H-18Z" fill="#4c9a3f"/>` +
  `<circle cy="-6" r="6" fill="#333"/><circle cy="-6" r="2" fill="#aaa"/></g>`

/** Horseshoe lying in the grass; (x, y) = center. Bounds: x ±9, y ±9. */
export const horseshoe = (x: number, y: number) =>
  `<path d="M${x - 6} ${y + 8}V${y}A6 6 0 0 1 ${x + 6} ${y}V${y + 8}" stroke="#7d8790" stroke-width="4" fill="none" stroke-linecap="round"/>`

/** Ladybug; (x, y) = center. Bounds: x ±7, y ±6. */
export const ladybug = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<circle cx="6" r="3" fill="#222"/><ellipse rx="6" ry="5" fill="#e63946"/><path d="M0 -5V5" stroke="#222" stroke-width="1"/>` +
  `<circle cx="-3" cy="-2" r="1.2" fill="#222"/><circle cx="3" cy="2" r="1.2" fill="#222"/><circle cx="-2" cy="3" r="1" fill="#222"/></g>`

/** Sitting cat, faces right; (x, y) = bottom center. Bounds: x from −14 to +12, y from −30 to 0. */
export const cat = (x: number, y: number, color = '#f08c2e') =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-8 -2Q-16 -2 -13 -12" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round"/>` +
  `<ellipse cy="-9" rx="9" ry="10" fill="${color}"/><circle cx="3" cy="-21" r="7" fill="${color}"/>` +
  `<path d="M-2 -25L-2 -30L2 -27ZM5 -27L9 -30L9 -25Z" fill="${color}"/>` +
  `<circle cx="5" cy="-22" r="1.1" fill="#222"/><circle cx="8.5" cy="-22" r="1.1" fill="#222"/></g>`

export const FLOWER_COLORS = ['#ff6b8b', '#ffffff', '#b38cff', '#ff9f43', '#4dabf7']

/** Picks a random element of `items`. */
export const pick = <T>(rand: () => number, items: T[]): T => items[Math.floor(rand() * items.length)]
