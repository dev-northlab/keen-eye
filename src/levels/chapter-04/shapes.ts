// Chapter 4 "sea": reusable flat cartoon shapes. Each returns SVG markup positioned at (x, y);
// the bounds in the comments are what a difference zone must cover.
export { cloud, pick, sun } from '../shapes.ts'
export { person } from '../chapter-02/shapes.ts'

/** Wave band from y down to 400 units, `n` crests of width w, filled with color. */
export const waves = (y: number, n: number, w: number, color: string, bottom = 500) =>
  `<path d="M0 ${y}` + `q${w / 4} -12 ${w / 2} 0t${w / 2} 0`.repeat(n) + `V${bottom}H0Z" fill="${color}"/>`

/** Palm; (x, y) = bottom of the trunk. Bounds: x from −53·s to +81·s (mirrored with `flip`), y from −124·s to 0. */
export const palm = (x: number, y: number, s = 1, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><path d="M0 0q-6 -50 14 -90" stroke="#9a6b43" stroke-width="10" stroke-linecap="round" fill="none"/>` +
  `<path d="M14 -90q-40 -12 -62 10M14 -90q-26 -34 -60 -28M14 -90q38 -20 62 4M14 -90q26 -34 56 -22M14 -90q-10 30 -30 40M14 -90q16 26 34 40" fill="none" stroke="#3f9a5a" stroke-width="10" stroke-linecap="round"/>` +
  `<circle cx="10" cy="-82" r="5" fill="#8a5a3b"/><circle cx="20" cy="-80" r="5" fill="#8a5a3b"/></g>`

/** Sailboat, faces right; (x, y) = waterline center. Bounds: x ±36, y from −84 to +8. */
export const sailboat = (x: number, y: number, hull: string, sail = '#ffffff') =>
  `<g transform="translate(${x} ${y})"><path d="M-36 -8h72l-10 16h-52Z" fill="${hull}"/><rect x="-1" y="-84" width="3" height="76" fill="#3d4a55"/>` +
  `<path d="M3 -80L34 -14H3Z" fill="${sail}"/><path d="M-3 -70L-30 -14h27Z" fill="${sail}" fill-opacity="0.85"/></g>`

/** Fish, faces right; (x, y) = center, scale s. Bounds: x ±16·s, y ±8·s. */
export const fish = (x: number, y: number, color: string, s = 1, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><ellipse rx="10" ry="6" fill="${color}"/><path d="M-8 0l-8 -7v14Z" fill="${color}"/>` +
  `<path d="M-2 -5q4 -4 6 0" stroke="#fff" stroke-opacity="0.5" stroke-width="2" fill="none"/><circle cx="5" cy="-1.5" r="1.5" fill="#222"/></g>`

/** Crab; (x, y) = bottom center. Bounds: x ±20, y from −18 to 0. */
export const crab = (x: number, y: number, color = '#e63946') =>
  `<g transform="translate(${x} ${y})"><path d="M-14 -4l-6 4M-10 -2l-4 2M10 -2l4 2M14 -4l6 4" stroke="${color}" stroke-width="2.5"/>` +
  `<ellipse cy="-8" rx="13" ry="8" fill="${color}"/><circle cx="-18" cy="-14" r="4" fill="${color}"/><circle cx="18" cy="-14" r="4" fill="${color}"/>` +
  `<path d="M-13 -11l-4 -6M13 -11l4 -6" stroke="${color}" stroke-width="2.5"/><circle cx="-5" cy="-16" r="2" fill="#222"/><circle cx="5" cy="-16" r="2" fill="#222"/></g>`

/** Starfish; (x, y) = center. Bounds: radius 14. */
export const starfish = (x: number, y: number, color = '#ff9f43') =>
  `<path d="M${x} ${y - 14}l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1Z" fill="${color}"/>`

/** Shell; (x, y) = bottom center. Bounds: x ±10, y from −12 to 0. */
export const shell = (x: number, y: number, color = '#ffb84d') =>
  `<path d="M${x - 10} ${y}q0 -14 10 -12q10 -2 10 12Z" fill="${color}"/><path d="M${x} ${y}v-11M${x - 5} ${y}l-2 -9M${x + 5} ${y}l2 -9" stroke="#fff" stroke-opacity="0.5" stroke-width="1.5"/>`

/** Flying gull, faces right; (x, y) = body center. Bounds: x ±16, y from −8 to +6. */
export const gull = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-16 -2q8 -8 16 0q8 -8 16 0" stroke="#fff" stroke-width="3" fill="none"/><ellipse rx="7" ry="4" fill="#fff"/>` +
  `<circle cx="7" cy="-3" r="3" fill="#fff"/><path d="M9 -3l5 1l-5 2Z" fill="#f4a261"/></g>`

/** Standing gull, faces right; (x, y) = feet. Bounds: x ±12, y from −18 to 0. */
export const gullStanding = (x: number, y: number, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><path d="M-3 0v-5M3 0v-5" stroke="#f4a261" stroke-width="1.5"/><ellipse cy="-9" rx="10" ry="6" fill="#fff"/>` +
  `<path d="M-10 -9l-4 -4" stroke="#8d99ae" stroke-width="3"/><circle cx="8" cy="-14" r="4" fill="#fff"/><path d="M11 -14l5 1l-5 2Z" fill="#f4a261"/><circle cx="9" cy="-15" r="1" fill="#222"/></g>`

/** Seaweed; (x, y) = base. Bounds: x ±10, y from −40·s to 0. */
export const seaweed = (x: number, y: number, s = 1, color = '#2a9d8f') =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0q-10 -12 0 -24t0 -16" stroke="${color}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
  `<path d="M6 0q8 -10 2 -20t4 -16" stroke="${color}" stroke-width="4" fill="none" stroke-linecap="round"/></g>`

/** Coral; (x, y) = base. Bounds: x ±18, y from −36 to 0. */
export const coral = (x: number, y: number, color = '#ff6b8b') =>
  `<g transform="translate(${x} ${y})" stroke="${color}" stroke-width="7" stroke-linecap="round" fill="none"><path d="M0 0v-30M0 -14l-14 -14M0 -10l14 -16M-14 -28l-4 -6M14 -26l4 -8"/></g>`

/** Jellyfish; (x, y) = bell center. Bounds: x ±14, y from −12 to +26. */
export const jellyfish = (x: number, y: number, color = '#b38cff') =>
  `<g transform="translate(${x} ${y})"><path d="M-14 0a14 12 0 0 1 28 0Z" fill="${color}" fill-opacity="0.85"/>` +
  `<path d="M-9 2q-2 10 2 22M-3 2q2 10 -2 24M3 2q-2 10 2 22M9 2q2 10 -2 24" stroke="${color}" stroke-width="2" fill="none"/></g>`

/** Octopus; (x, y) = bottom center. Bounds: x ±24, y from −36 to 0. */
export const octopus = (x: number, y: number, color = '#8338ec') =>
  `<g transform="translate(${x} ${y})"><path d="M-20 0q-4 -10 2 -14M-10 0q-2 -10 4 -14M0 0q0 -10 0 -14M10 0q2 -10 -4 -14M20 0q4 -10 -2 -14" stroke="${color}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
  `<circle cy="-24" r="14" fill="${color}"/><circle cx="-5" cy="-26" r="3" fill="#fff"/><circle cx="5" cy="-26" r="3" fill="#fff"/><circle cx="-4" cy="-26" r="1.5" fill="#222"/><circle cx="6" cy="-26" r="1.5" fill="#222"/></g>`

/** Buoy; (x, y) = waterline center. Bounds: x ±10, y from −22 to +8. */
export const buoy = (x: number, y: number, color = '#e63946') =>
  `<path d="M${x - 8} ${y + 8}l4 -26h8l4 26Z" fill="${color}"/><rect x="${x - 6}" y="${y - 10}" width="12" height="4" fill="#fff"/><circle cx="${x}" cy="${y - 20}" r="4" fill="#ffd166"/>`

/** Anchor; (x, y) = center. Bounds: x ±14, y ±16. */
export const anchor = (x: number, y: number, color = '#3d4a55') =>
  `<g transform="translate(${x} ${y})" stroke="${color}" stroke-width="4" fill="none" stroke-linecap="round"><circle cy="-12" r="4"/><path d="M0 -8v22M-10 0h20M-14 6q6 10 14 10q8 0 14 -10"/></g>`

/** Life ring; (x, y) = center. Bounds: radius 14. */
export const lifeRing = (x: number, y: number, color = '#e63946') =>
  `<circle cx="${x}" cy="${y}" r="11" fill="none" stroke="${color}" stroke-width="6"/><path d="M${x - 11} ${y}h22M${x} ${y - 11}v22" stroke="#fff" stroke-width="3"/>`

/** Beach parasol; (x, y) = pole foot. Bounds: x ±40, y from −74 to 0. */
export const parasol = (x: number, y: number, color: string) =>
  `<rect x="${x - 2}" y="${y - 60}" width="4" height="60" fill="#3d4a55"/>` +
  `<path d="M${x - 40} ${y - 56}q40 -24 80 0q-10 -4 -20 0q-10 -4 -20 0q-10 -4 -20 0q-10 -4 -20 0Z" fill="${color}"/>` +
  `<path d="M${x - 20} ${y - 68}q10 -2 20 -4v16q-10 2 -20 -4Z" fill="#fff" fill-opacity="0.5"/>`

/** Beach towel; (x, y) = center. Bounds: x ±30, y ±12. */
export const towel = (x: number, y: number, color: string) =>
  `<rect x="${x - 30}" y="${y - 12}" width="60" height="24" rx="2" fill="${color}"/><path d="M${x - 30} ${y - 4}h60M${x - 30} ${y + 4}h60" stroke="#fff" stroke-width="3"/>`

/** Bucket and spade; (x, y) = bottom center. Bounds: x ±16, y from −26 to 0. */
export const bucket = (x: number, y: number, color = '#3a86ff') =>
  `<path d="M${x - 10} ${y - 18}h20l-3 18h-14Z" fill="${color}"/><path d="M${x - 9} ${y - 18}q9 -10 18 0" stroke="${color}" stroke-width="2" fill="none"/>` +
  `<path d="M${x + 12} ${y}l4 -24" stroke="#8a5a3b" stroke-width="2.5"/><path d="M${x + 10} ${y - 2}h8l-2 -8h-6Z" fill="#8d99ae"/>`

/** Sandcastle; (x, y) = bottom center. The flag is separate. Bounds: x ±30, y from −50 to 0. */
export const sandcastle = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#e9c46a"><rect x="-30" y="-24" width="60" height="24"/><rect x="-22" y="-44" width="16" height="20"/><rect x="6" y="-50" width="16" height="26"/>` +
  `<path d="M-22 -44h4v-4h4v4h4v-4h4v4M6 -50h4v-4h4v4h4v-4h4v4"/><rect x="-4" y="-12" width="8" height="12" fill="#c9a06c"/></g>`

/** Sandcastle flag at (x, y) = castle bottom center. Bounds: x from +10 to +26, y from −66 to −50. */
export const castleFlag = (x: number, y: number, color: string) =>
  `<path d="M${x + 14} ${y - 50}v-16" stroke="#3d4a55" stroke-width="1.5"/><path d="M${x + 15} ${y - 66}h10l-3 4l3 4h-10Z" fill="${color}"/>`

/** Rock; (x, y) = bottom center. Bounds: x ±20·s, y from −16·s to 0. */
export const rock = (x: number, y: number, s = 1, color = '#8d99ae') =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-20 0q-2 -14 12 -16q18 -2 28 12v4Z" fill="${color}"/><path d="M-10 -8q8 -6 16 -2" stroke="#fff" stroke-opacity="0.3" stroke-width="3" fill="none"/></g>`

/** Dolphin leaping, faces right; (x, y) = center. Bounds: x ±26, y ±14. */
export const dolphin = (x: number, y: number, color = '#5c8fbf', flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1) rotate(-20)"><path d="M-24 4q10 -16 32 -10q10 2 16 8q-8 6 -20 6q-16 2 -28 -4Z" fill="${color}"/>` +
  `<path d="M-2 -6l4 -10l6 8Z" fill="${color}"/><path d="M-24 4l-6 -8l0 12Z" fill="${color}"/><circle cx="14" cy="-1" r="1.5" fill="#222"/></g>`

/** Sea turtle, faces right; (x, y) = bottom center. Bounds: x ±24, y from −22 to 0. */
export const turtle = (x: number, y: number, color = '#4caf6a', flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><path d="M-16 -4l-6 4M12 -4l6 4M-12 -6l-8 -4M10 -8l8 -4" stroke="${color}" stroke-width="4" stroke-linecap="round"/>` +
  `<ellipse cy="-10" rx="16" ry="11" fill="#2f7d55"/><path d="M-8 -16h16M-10 -8h20M0 -20v18" stroke="#4caf6a" stroke-width="2"/><circle cx="20" cy="-10" r="6" fill="${color}"/><circle cx="22" cy="-11" r="1.3" fill="#222"/></g>`

/** Sand with a few shells from `rand` between y0 and y1. */
export const sandBits = (rand: () => number, y0: number, y1: number, n = 10) => {
  let out = ''
  for (let i = 0; i < n; i++) {
    const x = 10 + rand() * 780
    const y = y0 + rand() * (y1 - y0)
    out += rand() < 0.5 ? `<ellipse cx="${x}" cy="${y}" rx="6" ry="2.5" fill="#d8b07a"/>` : `<circle cx="${x}" cy="${y}" r="2" fill="#c9a06c"/>`
  }
  return out
}
