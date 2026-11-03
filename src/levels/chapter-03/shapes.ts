// Chapter 3 "forest": reusable flat cartoon shapes. Each returns SVG markup positioned at (x, y);
// the bounds in the comments are what a difference zone must cover.
export { cloud, flower, FLOWER_COLORS, grass, pick, sun } from '../shapes.ts'

/** Pine; (x, y) = bottom of the trunk. Bounds: x ±30·s, y from −100·s to 0. */
export const pine = (x: number, y: number, s = 1, color = '#2f7d55') =>
  `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-5" y="-16" width="10" height="16" fill="#6b4f3a"/>` +
  `<path d="M0 -100L-30 -40h60Z" fill="${color}"/><path d="M0 -100L-22 -60h44Z" fill="${color}"/>` +
  `<path d="M0 -100L-10 -78" stroke="#fff" stroke-opacity="0.2" stroke-width="4" stroke-linecap="round"/>` +
  `<path d="M0 -70L-30 -16h60Z" fill="${color}"/></g>`

/** Round-crowned tree; (x, y) = bottom of the trunk. Bounds: x ±36·s, y from −96·s to 0. */
export const oak = (x: number, y: number, s = 1, leaves = '#4caf6a') =>
  `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-7" y="-40" width="14" height="40" rx="3" fill="#8a5a3b"/>` +
  `<circle cx="-18" cy="-52" r="18" fill="${leaves}"/><circle cx="18" cy="-52" r="18" fill="${leaves}"/>` +
  `<circle cy="-68" r="26" fill="${leaves}"/><circle cx="-8" cy="-78" r="8" fill="#fff" fill-opacity="0.2"/></g>`

/** Bush; (x, y) = bottom center. Bounds: x ±24·s, y from −26·s to 0. */
export const bush = (x: number, y: number, s = 1, color = '#5fae4b') =>
  `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="-12" cy="-10" r="12" fill="${color}"/><circle cx="12" cy="-10" r="12" fill="${color}"/>` +
  `<circle cy="-16" r="12" fill="${color}"/><rect x="-24" y="-10" width="48" height="10" fill="${color}"/></g>`

/** Mushroom; (x, y) = bottom of the stem. Bounds: x ±14·s, y from −30·s to 0. */
export const mushroom = (x: number, y: number, cap = '#e63946', s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-5" y="-14" width="10" height="14" rx="3" fill="#fff3d6"/>` +
  `<path d="M-14 -12q14 -24 28 0Z" fill="${cap}"/><circle cx="-5" cy="-19" r="2.5" fill="#fff"/><circle cx="5" cy="-17" r="2" fill="#fff"/></g>`

/** Rock; (x, y) = bottom center. Bounds: x ±20·s, y from −16·s to 0. */
export const rock = (x: number, y: number, s = 1, color = '#8d99ae') =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-20 0q-2 -14 12 -16q18 -2 28 12v4Z" fill="${color}"/><path d="M-10 -8q8 -6 16 -2" stroke="#fff" stroke-opacity="0.3" stroke-width="3" fill="none"/></g>`

/** Tree stump; (x, y) = bottom center. Bounds: x ±16, y from −22 to 0. */
export const stump = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-14" y="-18" width="28" height="18" fill="#8a5a3b"/><ellipse cy="-18" rx="16" ry="5" fill="#c9a06c"/>` +
  `<ellipse cy="-18" rx="8" ry="2.5" fill="none" stroke="#a0703f" stroke-width="1.5"/></g>`

/** Fallen log; (x, y) = bottom center. Bounds: x ±32, y from −14 to 0. */
export const log = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-30" y="-14" width="60" height="14" rx="7" fill="#8a5a3b"/><circle cx="26" cy="-7" r="6" fill="#c9a06c"/></g>`

/** Fox, faces right; (x, y) = feet. Bounds: x ±26, y from −32 to 0. */
export const fox = (x: number, y: number, flip = false, coat = '#f07f2c') =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><path d="M-14 -6v6M-6 -6v6M6 -6v6M14 -6v6" stroke="#333" stroke-width="4"/>` +
  `<path d="M-16 -14q-12 2 -10 10q6 2 12 -4Z" fill="${coat}"/><circle cx="-24" cy="-6" r="4" fill="#fff"/>` +
  `<rect x="-16" y="-20" width="34" height="16" rx="7" fill="${coat}"/><path d="M12 -22l4 -10l6 8l6 -8l4 10q-2 10 -10 12Z" fill="${coat}"/>` +
  `<path d="M14 -12l8 4l6 -4Z" fill="#fff"/><circle cx="23" cy="-15" r="1.6" fill="#222"/><circle cx="26" cy="-9" r="2" fill="#222"/></g>`

/** Rabbit, faces right; (x, y) = feet. Bounds: x ±14, y from −32 to 0. */
export const rabbit = (x: number, y: number, flip = false, color = '#d9d2c5') =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><ellipse cy="-9" rx="12" ry="9" fill="${color}"/><circle cx="-12" cy="-10" r="4" fill="#fff"/>` +
  `<circle cx="8" cy="-18" r="7" fill="${color}"/><path d="M4 -24l-2 -8l5 1ZM10 -24l3 -8l3 2Z" fill="${color}"/>` +
  `<circle cx="10" cy="-19" r="1.5" fill="#222"/><circle cx="14" cy="-16" r="1.5" fill="#f7a8b8"/></g>`

/** Bear, faces right; (x, y) = feet. Bounds: x ±34, y from −58 to 0. */
export const bear = (x: number, y: number, flip = false, coat = '#6b4f3a') =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><rect x="-26" y="-18" width="12" height="18" rx="4" fill="${coat}"/><rect x="10" y="-18" width="12" height="18" rx="4" fill="${coat}"/>` +
  `<ellipse cy="-30" rx="32" ry="24" fill="${coat}"/><circle cx="22" cy="-44" r="14" fill="${coat}"/>` +
  `<circle cx="14" cy="-54" r="4" fill="${coat}"/><circle cx="30" cy="-54" r="4" fill="${coat}"/>` +
  `<ellipse cx="28" cy="-40" rx="6" ry="4" fill="#c9a06c"/><circle cx="30" cy="-41" r="1.8" fill="#222"/><circle cx="20" cy="-46" r="1.6" fill="#222"/></g>`

/** Deer, faces right; (x, y) = feet. The antlers are part of it. Bounds: x ±30, y from −72 to 0. */
export const deer = (x: number, y: number, flip = false, coat = '#c48a5a') =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><path d="M-20 -30v30M-10 -30v30M8 -30v30M18 -30v30" stroke="${coat}" stroke-width="5"/>` +
  `<rect x="-26" y="-46" width="48" height="20" rx="9" fill="${coat}"/><path d="M18 -44l6 -18l10 -4l-2 10l-6 14Z" fill="${coat}"/>` +
  `<circle cx="22" cy="-60" r="7" fill="${coat}"/><path d="M26 -62l2 -6M22 -62l-4 -8M18 -64l-6 -4M28 -68l6 -4" stroke="#8a5a3b" stroke-width="2.5" stroke-linecap="round"/>` +
  `<path d="M20 -66l-4 -6M28 -66l4 -6" stroke="#8a5a3b" stroke-width="2.5" stroke-linecap="round"/>` +
  `<circle cx="27" cy="-62" r="1.5" fill="#222"/><circle cx="-10" cy="-38" r="2.5" fill="#fff"/><circle cx="2" cy="-34" r="2.5" fill="#fff"/></g>`

/** Squirrel, faces right; (x, y) = feet. Bounds: x ±16, y from −30 to 0. */
export const squirrel = (x: number, y: number, flip = false, coat = '#c0392b') =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><path d="M-8 -6q-14 -4 -8 -22q8 -4 10 6Z" fill="${coat}"/>` +
  `<ellipse cx="2" cy="-8" rx="10" ry="8" fill="${coat}"/><circle cx="10" cy="-16" r="6" fill="${coat}"/><path d="M7 -20l-1 -6l4 3ZM12 -21l2 -6l2 4Z" fill="${coat}"/>` +
  `<circle cx="12" cy="-17" r="1.4" fill="#222"/><circle cx="6" cy="-8" r="3" fill="#f2d29b"/></g>`

/** Hedgehog, faces right; (x, y) = feet. Bounds: x ±18, y from −20 to 0. */
export const hedgehog = (x: number, y: number, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><path d="M-18 0q-2 -20 14 -20q8 0 12 6l8 8q-4 6 -34 6Z" fill="#6b4f3a"/>` +
  `<path d="M-14 -4l-4 -8M-8 -10l-2 -8M0 -14l2 -8M8 -12l4 -6" stroke="#4a3426" stroke-width="2.5" stroke-linecap="round"/>` +
  `<path d="M8 -14q10 2 10 10Z" fill="#c9a06c"/><circle cx="17" cy="-5" r="1.5" fill="#222"/><circle cx="11" cy="-10" r="1.2" fill="#222"/></g>`

/** Perched bird, faces right; (x, y) = feet. Bounds: x ±11, y from −14 to 0. */
export const bird = (x: number, y: number, color = '#3a86ff', flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><ellipse cy="-6" rx="8" ry="5" fill="${color}"/><circle cx="6" cy="-10" r="4" fill="${color}"/>` +
  `<path d="M9 -10l4 1l-4 2Z" fill="#f4a261"/><path d="M-8 -6l-3 -4" stroke="${color}" stroke-width="2.5"/><circle cx="7" cy="-11" r="1" fill="#fff"/></g>`

/** Butterfly; (x, y) = body center. Bounds: x ±12, y ±9. */
export const butterfly = (x: number, y: number, color = '#ff6b8b') =>
  `<g transform="translate(${x} ${y})"><ellipse cx="-6" cy="-3" rx="6" ry="5" fill="${color}"/><ellipse cx="6" cy="-3" rx="6" ry="5" fill="${color}"/>` +
  `<ellipse cx="-5" cy="4" rx="4" ry="3.5" fill="${color}"/><ellipse cx="5" cy="4" rx="4" ry="3.5" fill="${color}"/><rect x="-1" y="-7" width="2" height="14" rx="1" fill="#333"/></g>`

/** Frog; (x, y) = bottom center. Bounds: x ±14, y from −16 to 0. */
export const frog = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-6" rx="14" ry="7" fill="#5fae4b"/><circle cx="-6" cy="-14" r="4" fill="#5fae4b"/><circle cx="6" cy="-14" r="4" fill="#5fae4b"/>` +
  `<circle cx="-6" cy="-14" r="1.6" fill="#222"/><circle cx="6" cy="-14" r="1.6" fill="#222"/></g>`

/** Tent; (x, y) = ground center. Bounds: x ±50, y from −60 to 0. */
export const tent = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><path d="M-50 0L0 -60L50 0Z" fill="${color}"/><path d="M0 -60L-16 0h32Z" fill="#2b2b2b" fill-opacity="0.35"/>` +
  `<path d="M0 -60v-8" stroke="#3d4a55" stroke-width="3"/></g>`

/** Campfire logs; (x, y) = ground center. The flame is separate. Bounds: x ±22, y from −12 to 0. */
export const fireLogs = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-20 -2l40 -8M-20 -10l40 8" stroke="#8a5a3b" stroke-width="7" stroke-linecap="round"/><ellipse rx="22" ry="4" fill="#8d99ae"/></g>`
/** Campfire flame over logs at (x, y). Bounds: x ±12, y from −40 to −6. */
export const flame = (x: number, y: number, inner = '#ffd166') =>
  `<path d="M${x} ${y - 6}q-14 -10 -8 -26q4 4 6 10q0 -12 8 -18q6 14 2 24q6 -4 4 -10q6 14 -12 20Z" fill="#fb8500"/>` +
  `<path d="M${x} ${y - 8}q-6 -6 -2 -14q4 4 6 8q0 -6 2 -8q4 10 -6 14Z" fill="${inner}"/>`

/** Log cabin; (x, y) = ground center, w × h walls. Bounds: x ±(w/2 + 10), y from −(h + 44) to 0. */
export const cabin = (x: number, y: number, w: number, h: number, wall = '#a0703f', roof = '#5a3d2b') => {
  let logs = ''
  for (let yy = y - h + 12; yy < y; yy += 14) logs += `<path d="M${x - w / 2} ${yy}h${w}" stroke="#8a5a33" stroke-width="2"/>`
  return (
    `<rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" fill="${wall}"/>${logs}` +
    `<path d="M${x - w / 2 - 10} ${y - h + 4}L${x} ${y - h - 44}L${x + w / 2 + 10} ${y - h + 4}Z" fill="${roof}"/>`
  )
}

/** Fern; (x, y) = bottom center. Bounds: x ±16, y from −30 to 0. */
export const fern = (x: number, y: number, color = '#3f9a5a') =>
  `<g transform="translate(${x} ${y})" fill="${color}"><path d="M0 0q-18 -10 -14 -30q10 8 14 30Z"/><path d="M0 0q18 -10 14 -30q-10 8 -14 30Z"/><path d="M0 0q-4 -16 0 -30q4 14 0 30Z"/></g>`

/** Small forest-floor items for the forest scenes. */

/** Pine cone lying on the ground; (x, y) = bottom center. Bounds: x ±9, y from −9 to 0. */
export const pineCone = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-4.5" rx="9" ry="4.5" fill="#8a5a33"/>` +
  `<path d="M-6 -7l2 5M-2 -8l2 6M2 -8l2 6M6 -7l1 4" stroke="#5e3b1f" stroke-width="1.4"/></g>`

/** Acorn; (x, y) = bottom center. Bounds: x ±6, y from −16 to 0. */
export const acorn = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-5" rx="5" ry="6" fill="#c68b4e"/>` +
  `<path d="M-6 -9Q0 -15 6 -9Z" fill="#7a5230"/><path d="M0 -13V-16" stroke="#5e3b1f" stroke-width="1.6"/></g>`

/** Anthill; (x, y) = ground center. Bounds: x ±18, y from −16 to 0. */
export const anthill = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-18 0Q-8 -18 0 -16Q8 -18 18 0Z" fill="#b08355"/>` +
  `<path d="M-8 -6l2 -1M3 -10l2 1M8 -4l2 -1M-2 -3l2 1" stroke="#5e3b1f" stroke-width="1.6" stroke-linecap="round"/></g>`

/** Wild strawberry plant; (x, y) = ground. Bounds: x ±12, y from −14 to 0. */
export const wildStrawberry = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-10 0Q-12 -8 -4 -9Q0 -14 4 -9Q12 -8 10 0Z" fill="#4c9a3f"/>` +
  `<g fill="#e63946"><ellipse cx="-6" cy="-2" rx="3" ry="3.6"/><ellipse cx="5" cy="-3" rx="3" ry="3.6"/></g></g>`

/** Bluebells; (x, y) = ground. Bounds: x ±10, y from −22 to 0. */
export const bluebells = (x: number, y: number, color = '#7b8cde') =>
  `<g transform="translate(${x} ${y})"><path d="M0 0Q-2 -12 -6 -18M0 0Q1 -12 6 -20M0 0V-10" stroke="#3f8f3a" stroke-width="2" fill="none"/>` +
  `<g fill="${color}"><path d="M-9 -16l3 -5l3 4Z"/><path d="M3 -18l3 -4l4 5Z"/><path d="M-3 -9l3 -4l3 4Z"/></g></g>`

/** Trail marker on a post; (x, y) = foot. Bounds: x ±14, y from −40 to 0. */
export const trailSign = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-2" y="-34" width="4" height="34" fill="#8a5a33"/>` +
  `<path d="M-12 -38H8L14 -32L8 -26H-12Z" fill="#d9a86c"/><path d="M-8 -32H6" stroke="#5e3b1f" stroke-width="2"/></g>`

/** Pile of fallen leaves; (x, y) = ground center. Bounds: x ±16, y from −9 to 0. */
export const leafPile = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cx="-6" cy="-4" rx="8" ry="4" fill="#e07a2e" transform="rotate(-15 -6 -4)"/>` +
  `<ellipse cx="6" cy="-4" rx="8" ry="4" fill="#d9a43a" transform="rotate(20 6 -4)"/><ellipse cy="-6" rx="7" ry="3.5" fill="#c1440e"/></g>`

/** Feather on the ground; (x, y) = center. Bounds: x ±10, y ±5. */
export const feather = (x: number, y: number, color = '#f4efe6') =>
  `<g transform="translate(${x} ${y}) rotate(-15)"><path d="M-10 0Q0 -6 10 0Q0 5 -10 0Z" fill="${color}"/>` +
  `<path d="M-11 0H10" stroke="#a0896b" stroke-width="1"/></g>`

/** Camping lantern; (x, y) = bottom center. Bounds: x ±7, y from −22 to 0. */
export const lantern = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-4 -17A4 4 0 0 1 4 -17" stroke="#333" stroke-width="1.6" fill="none"/>` +
  `<rect x="-6" y="-17" width="12" height="3" rx="1" fill="#2a5f44"/><rect x="-5" y="-14" width="10" height="11" fill="#ffd166"/>` +
  `<rect x="-6" y="-3" width="12" height="3" rx="1" fill="#2a5f44"/></g>`

/** Backpack leaning on the ground; (x, y) = bottom center. Bounds: x ±11, y from −24 to 0. */
export const backpack = (x: number, y: number, color = '#e76f51') =>
  `<g transform="translate(${x} ${y})"><path d="M-4 -22A4 4 0 0 1 4 -22" stroke="#5e3b1f" stroke-width="2" fill="none"/>` +
  `<rect x="-10" y="-22" width="20" height="22" rx="5" fill="${color}"/><rect x="-7" y="-10" width="14" height="8" rx="2" fill="#000" fill-opacity="0.15"/>` +
  `<rect x="-10" y="-16" width="20" height="3" fill="#000" fill-opacity="0.15"/></g>`

/** Forest floor band with a few ferns and grass tufts from `rand`, over y0..y1. */
export const floor = (rand: () => number, y0: number, y1: number, n = 14) => {
  let out = ''
  for (let i = 0; i < n; i++) {
    const x = 10 + rand() * 780
    const y = y0 + rand() * (y1 - y0)
    out += rand() < 0.3 ? fern(x, y) : `<path d="M${x - 8} ${y}l4 -12l4 12l4 -14l5 14Z" fill="#4c8a3c"/>`
  }
  return out
}
