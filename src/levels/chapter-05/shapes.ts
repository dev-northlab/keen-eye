// Chapter 5 "space": reusable flat cartoon shapes. Each returns SVG markup positioned at (x, y);
// the bounds in the comments are what a difference zone must cover.
export { pick } from '../shapes.ts'
export { person } from '../chapter-02/shapes.ts'
export { rock } from '../chapter-04/shapes.ts'

const r1 = (n: number) => Math.round(n * 10) / 10

/** Star dots from `rand` between y0 and y1 (whole width). */
export const starField = (rand: () => number, y0: number, y1: number, n = 40) => {
  let out = ''
  for (let i = 0; i < n; i++) {
    const x = r1(5 + rand() * 790)
    const y = r1(y0 + rand() * (y1 - y0))
    out += `<circle cx="${x}" cy="${y}" r="${r1(0.8 + rand() * 1.4)}" fill="#fff" fill-opacity="${r1(0.4 + rand() * 0.6)}"/>`
  }
  return out
}

/** Five-pointed star; (x, y) = center. Bounds: radius r. */
export const star = (x: number, y: number, r: number, color = '#ffd23f') => {
  let d = ''
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2
    const k = i % 2 === 0 ? r : r * 0.45
    d += `${i === 0 ? 'M' : 'L'}${r1(x + k * Math.cos(a))} ${r1(y + k * Math.sin(a))}`
  }
  return `<path d="${d}Z" fill="${color}"/>`
}

/** Twinkle (four-pointed sparkle); (x, y) = center. Bounds: radius r. */
export const sparkle = (x: number, y: number, r: number, color = '#ffffff') =>
  `<path d="M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z" fill="${color}"/>`

/** Planet; (x, y) = center. Bounds: radius r; with a ring x ±1.8·r, y ±r. */
export const planet = (x: number, y: number, r: number, color: string, ring?: string) => {
  const rx = r1(r * 1.7)
  const ry = r1(r * 0.35)
  const sw = r1(r * 0.14)
  const back = ring ? `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="${ring}" stroke-width="${sw}"/>` : ''
  const front = ring ? `<path d="M${r1(x - rx)} ${y}A${rx} ${ry} 0 0 0 ${r1(x + rx)} ${y}" fill="none" stroke="${ring}" stroke-width="${sw}"/>` : ''
  return (
    back +
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>` +
    `<path d="M${r1(x - r * 0.2)} ${r1(y + r * 0.98)}A${r} ${r} 0 0 0 ${r1(x + r * 0.98)} ${r1(y - r * 0.2)}A${r1(r * 1.1)} ${r1(r * 1.1)} 0 0 1 ${r1(x - r * 0.2)} ${r1(y + r * 0.98)}Z" fill="#000" fill-opacity="0.15"/>` +
    `<circle cx="${r1(x - r * 0.35)}" cy="${r1(y - r * 0.35)}" r="${r1(r * 0.22)}" fill="#fff" fill-opacity="0.25"/>` +
    front
  )
}

/** Rocket, nose up; (x, y) = nozzle bottom. Bounds: x ±22·s, y from −96·s to 0. */
export const rocket = (x: number, y: number, body = '#f1f1f1', trim = '#e63946', s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 -36L-22 -10L-14 -16ZM14 -36L22 -10L14 -16Z" fill="${trim}"/>` +
  `<path d="M-8 -16h16l4 16h-24Z" fill="#5c677d"/><path d="M-14 -16V-70Q-14 -90 0 -96Q14 -90 14 -70V-16Z" fill="${body}"/>` +
  `<path d="M-13 -78Q-10 -90 0 -96Q10 -90 13 -78Z" fill="${trim}"/><circle cy="-56" r="7" fill="#8ecae6" stroke="#3d4a55" stroke-width="3"/>` +
  `<path d="M-8 -66q0 -14 6 -20" stroke="#fff" stroke-opacity="0.6" stroke-width="3" fill="none" stroke-linecap="round"/></g>`

/** Rocket flame below (x, y) = nozzle bottom. Bounds: x ±12·s, y from 0 to +30·s. */
export const flame = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-12 0q12 60 24 0Z" fill="#ff7b54"/><path d="M-7 0q7 36 14 0Z" fill="#ffd23f"/></g>`

/** Astronaut, faces right; (x, y) = feet. Bounds: x ±17, y from −52 to 0. */
export const astronaut = (x: number, y: number, suit = '#f1f1f1', visor = '#ffb703', flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><rect x="-17" y="-38" width="8" height="20" rx="2" fill="#bfc7d5"/>` +
  `<rect x="-9" y="-17" width="8" height="17" rx="3" fill="${suit}"/><rect x="1" y="-17" width="8" height="17" rx="3" fill="${suit}"/>` +
  `<rect x="-11" y="-36" width="22" height="22" rx="6" fill="${suit}"/><path d="M8 -30l6 9" stroke="${suit}" stroke-width="6" stroke-linecap="round"/>` +
  `<rect x="-4" y="-30" width="8" height="6" rx="1" fill="#e63946"/><circle cy="-42" r="10" fill="${suit}"/>` +
  `<ellipse cx="3" cy="-42" rx="6" ry="5" fill="${visor}"/><path d="M1 -44q2 -2 5 -1" stroke="#fff" stroke-opacity="0.7" stroke-width="1.5" fill="none"/></g>`

/** Little alien, faces the viewer; (x, y) = feet. Bounds: x ±16, y from −47 to 0. */
export const alien = (x: number, y: number, color = '#8ac926', eyes: 1 | 2 = 1) =>
  `<g transform="translate(${x} ${y})"><path d="M-5 0v-9M5 0v-9" stroke="${color}" stroke-width="4"/><path d="M-9 -18l-5 7M9 -18l5 7" stroke="${color}" stroke-width="3" stroke-linecap="round"/>` +
  `<ellipse cy="-16" rx="10" ry="9" fill="${color}"/><path d="M-4 -38l-4 -6M4 -38l4 -6" stroke="${color}" stroke-width="2"/>` +
  `<circle cx="-8" cy="-44" r="2.5" fill="${color}"/><circle cx="8" cy="-44" r="2.5" fill="${color}"/><circle cy="-30" r="10" fill="${color}"/>` +
  (eyes === 1
    ? `<circle cy="-31" r="4.5" fill="#fff"/><circle cy="-31" r="2" fill="#222"/>`
    : `<circle cx="-4" cy="-31" r="3" fill="#fff"/><circle cx="4" cy="-31" r="3" fill="#fff"/><circle cx="-4" cy="-31" r="1.4" fill="#222"/><circle cx="4" cy="-31" r="1.4" fill="#222"/>`) +
  `<path d="M-3 -25q3 2 6 0" stroke="#222" stroke-width="1.5" fill="none"/></g>`

/** Flying saucer; (x, y) = center. Bounds: x ±34, y from −20 to +9. */
export const ufo = (x: number, y: number, color = '#9b7bff', lights = '#ffd23f') =>
  `<g transform="translate(${x} ${y})"><path d="M-15 -3a15 17 0 0 1 30 0Z" fill="#bde3f2" fill-opacity="0.9"/><ellipse rx="34" ry="9" fill="${color}"/>` +
  `<path d="M-30 -2h60" stroke="#fff" stroke-opacity="0.3" stroke-width="2"/>` +
  `<circle cx="-20" cy="3" r="3" fill="${lights}"/><circle cy="4" r="3" fill="${lights}"/><circle cx="20" cy="3" r="3" fill="${lights}"/></g>`

/** Satellite; (x, y) = center. Bounds: x ±40, y ±10. */
export const satellite = (x: number, y: number, panel = '#3a86ff') =>
  `<g transform="translate(${x} ${y})"><path d="M-14 0h28" stroke="#8d99ae" stroke-width="3"/>` +
  `<rect x="-40" y="-8" width="26" height="16" fill="${panel}"/><rect x="14" y="-8" width="26" height="16" fill="${panel}"/>` +
  `<path d="M-27 -8v16M27 -8v16M-40 0h26M14 0h26" stroke="#fff" stroke-opacity="0.4" stroke-width="1.5"/>` +
  `<rect x="-8" y="-10" width="16" height="20" rx="2" fill="#ffd166"/><circle r="3" fill="#3d4a55"/></g>`

/** Crater; (x, y) = center. Bounds: x ±rx, y ±0.35·rx. */
export const crater = (x: number, y: number, rx: number, color = '#8f89a8') =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${r1(rx * 0.35)}" fill="${color}"/>` +
  `<ellipse cx="${x}" cy="${r1(y + rx * 0.07)}" rx="${r1(rx * 0.78)}" ry="${r1(rx * 0.24)}" fill="#000" fill-opacity="0.15"/>`

/** Flag on a pole; (x, y) = pole foot. Bounds: x from −2 to +24, y from −50 to 0. */
export const flag = (x: number, y: number, color: string) =>
  `<rect x="${x - 1.5}" y="${y - 50}" width="3" height="50" fill="#d0d4de"/><path d="M${x + 1.5} ${y - 50}h22v14h-22Z" fill="${color}"/>`

/** Habitat dome; (x, y) = bottom center. Bounds: x ±r, y from −r to 0. */
export const dome = (x: number, y: number, r: number, glass = '#bde3f2') =>
  `<path d="M${x - r} ${y}a${r} ${r} 0 0 1 ${2 * r} 0Z" fill="${glass}" fill-opacity="0.85"/>` +
  `<path d="M${x - r} ${y}a${r} ${r} 0 0 1 ${2 * r} 0M${x} ${y - r}V${y}M${r1(x - r * 0.7)} ${r1(y - r * 0.7)}Q${x} ${r1(y - r * 0.45)} ${r1(x + r * 0.7)} ${r1(y - r * 0.7)}" fill="none" stroke="#e6e6f0" stroke-width="3"/>` +
  `<rect x="${x - r}" y="${y - 6}" width="${2 * r}" height="6" fill="#8d99ae"/>`

/** Rover, faces right; (x, y) = ground center. Bounds: x ±30, y from −42 to 0. */
export const rover = (x: number, y: number, color = '#ffb703', flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><rect x="14" y="-38" width="3" height="14" fill="#8d99ae"/><rect x="10" y="-42" width="12" height="6" rx="1" fill="#3d4a55"/>` +
  `<rect x="-26" y="-28" width="30" height="4" fill="#3a86ff"/><rect x="-28" y="-24" width="56" height="12" rx="3" fill="${color}"/>` +
  `<circle cx="-20" cy="-7" r="7" fill="#3d4a55"/><circle cy="-7" r="7" fill="#3d4a55"/><circle cx="20" cy="-7" r="7" fill="#3d4a55"/>` +
  `<circle cx="-20" cy="-7" r="2.5" fill="#bfc7d5"/><circle cy="-7" r="2.5" fill="#bfc7d5"/><circle cx="20" cy="-7" r="2.5" fill="#bfc7d5"/></g>`

/** Dish antenna on a stand, opening up; (x, y) = stand foot. Bounds: x ±22, y from −59 to 0. */
export const dish = (x: number, y: number, color = '#e6e6f0') =>
  `<path d="M${x - 10} ${y}L${x} ${y - 30}L${x + 10} ${y}" stroke="#8d99ae" stroke-width="4" fill="none"/>` +
  `<path d="M${x - 22} ${y - 48}q22 36 44 0Z" fill="${color}"/><path d="M${x} ${y - 36}v-20" stroke="#5c677d" stroke-width="2"/><circle cx="${x}" cy="${y - 56}" r="3" fill="#e63946"/>`

/** Comet heading left-down; (x, y) = head. Bounds: x from −8 to +70, y from −30 to +8. */
export const comet = (x: number, y: number, tail = '#bde3f2') =>
  `<path d="M${x - 5} ${y - 6}L${x + 70} ${y - 30}L${x + 6} ${y + 5}Z" fill="${tail}" fill-opacity="0.55"/><circle cx="${x}" cy="${y}" r="8" fill="#fff"/>`

/** Asteroid; (x, y) = center. Bounds: radius 18·s. */
export const asteroid = (x: number, y: number, s = 1, color = '#8d7b6a') =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-16 -6L-8 -16L6 -17L16 -8L17 6L8 16L-6 16L-16 8Z" fill="${color}"/>` +
  `<circle cx="-5" cy="-5" r="4" fill="#000" fill-opacity="0.2"/><circle cx="7" cy="6" r="3" fill="#000" fill-opacity="0.2"/><circle cx="6" cy="-9" r="2" fill="#000" fill-opacity="0.2"/></g>`

/** Robot; (x, y) = feet. Bounds: x ±16, y from −54 to 0. */
export const robot = (x: number, y: number, color = '#8d99ae', eye = '#3ae0ff') =>
  `<g transform="translate(${x} ${y})"><rect x="-10" y="-12" width="6" height="12" fill="#5c677d"/><rect x="4" y="-12" width="6" height="12" fill="#5c677d"/>` +
  `<path d="M-13 -30v14M13 -30v14" stroke="#5c677d" stroke-width="5" stroke-linecap="round"/><rect x="-11" y="-34" width="22" height="22" rx="3" fill="${color}"/>` +
  `<rect x="-9" y="-50" width="18" height="14" rx="3" fill="${color}"/><path d="M0 -50v-2" stroke="#5c677d" stroke-width="2"/><circle cy="-52" r="2" fill="#e63946"/>` +
  `<circle cx="-4" cy="-43" r="2.5" fill="${eye}"/><circle cx="4" cy="-43" r="2.5" fill="${eye}"/><rect x="-5" y="-28" width="10" height="6" rx="1" fill="#3d4a55"/></g>`
