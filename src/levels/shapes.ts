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

export const FLOWER_COLORS = ['#ff6b8b', '#ffffff', '#b38cff', '#ff9f43', '#4dabf7']

/** Picks a random element of `items`. */
export const pick = <T>(rand: () => number, items: T[]): T => items[Math.floor(rand() * items.length)]
