// Chapter 2 "city": reusable flat cartoon shapes. Each returns SVG markup positioned at (x, y);
// the bounds in the comments are what a difference zone must cover.
export { cloud, grass, pick, sun } from '../shapes.ts'

export const FACADES = ['#f2cc8f', '#e07a5f', '#81b29a', '#f4d6a0', '#7aa6d6', '#c98bb9', '#ffd6a5', '#bdb2ff']
export const BRIGHT = ['#e63946', '#3a86ff', '#ffb703', '#8ac926', '#ff006e', '#8338ec', '#fb8500']

/** Window with a sill; (x, y) = center. Bounds: x ±14, y from −16 to +19. */
export const window = (x: number, y: number, glass = '#bde3f2') =>
  `<g transform="translate(${x} ${y})"><rect x="-13" y="-16" width="26" height="32" fill="#f4efe6"/>` +
  `<rect x="-10" y="-13" width="20" height="26" fill="${glass}"/><path d="M0 -13v26M-10 0h20" stroke="#f4efe6" stroke-width="2"/>` +
  `<rect x="-14" y="15" width="28" height="4" fill="#d9d2c5"/></g>`

/** Door; (x, y) = bottom center. Bounds: x ±16, y from −46 to 0. */
export const door = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><rect x="-16" y="-46" width="32" height="46" rx="3" fill="${color}"/>` +
  `<rect x="-11" y="-40" width="22" height="14" fill="#ffffff" fill-opacity="0.35"/><circle cx="9" cy="-20" r="2.5" fill="#ffd166"/></g>`

/**
 * House front: wall from (x, y − h) of width w with a flat roof ledge and rows of windows.
 * Windows start 36 units under the roof, in rows 42 apart, and keep clear of the door's column.
 */
export const building = (x: number, y: number, w: number, h: number, color: string, glass = '#bde3f2') => {
  let windows = ''
  const cols = Math.max(1, Math.floor((w - 20) / 44))
  const gap = w / (cols + 1)
  for (let yy = y - h + 36; yy < y - 40; yy += 42) for (let c = 1; c <= cols; c++) windows += window(x + gap * c, yy, glass)
  return (
    `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${color}"/>` +
    `<rect x="${x - 4}" y="${y - h - 8}" width="${w + 8}" height="10" fill="#ffffff" fill-opacity="0.4"/>` +
    windows
  )
}

/** Striped awning; (x, y) = middle of its top edge. Bounds: x ±(w/2 + 2), y from 0 to +28. */
export const awning = (x: number, y: number, w: number, color: string) => {
  const n = 6
  let stripes = ''
  for (let i = 0; i < n; i++) {
    const x0 = x - w / 2 + (w / n) * i
    stripes += `<path d="M${x0} ${y}h${w / n}l2 22h${-w / n - 4}Z" fill="${i % 2 ? '#ffffff' : color}"/>`
  }
  let scallops = ''
  for (let i = 0; i < n; i++) scallops += `q${w / n / 2} 8 ${w / n} 0`
  return stripes + `<path d="M${x - w / 2 - 2} ${y + 22}${scallops}" fill="${color}"/>`
}

/** Shop sign board; (x, y) = center. Bounds: x ±(w/2), y ±12. */
export const signBoard = (x: number, y: number, w: number, color: string) =>
  `<rect x="${x - w / 2}" y="${y - 12}" width="${w}" height="24" rx="4" fill="${color}"/>` +
  `<rect x="${x - w / 2 + 8}" y="${y - 4}" width="${w - 16}" height="8" rx="4" fill="#ffffff" fill-opacity="0.7"/>`

/** Car, faces right; (x, y) = ground under the middle. Bounds: x ±42, y from −38 to 0. */
export const car = (x: number, y: number, color: string, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<path d="M-40 -8q0 -12 10 -12h8l10 -16h26l12 16h10q6 0 6 8v12h-82Z" fill="${color}"/>` +
  `<path d="M-8 -18l8 -12h14l9 12Z" fill="#bde3f2"/>` +
  `<rect x="-42" y="-10" width="6" height="6" rx="1" fill="#ffd166"/><rect x="36" y="-10" width="6" height="6" rx="1" fill="#e63946"/>` +
  `<circle cx="-22" cy="-2" r="9" fill="#2b2b2b"/><circle cx="-22" cy="-2" r="3.5" fill="#ccc"/>` +
  `<circle cx="22" cy="-2" r="9" fill="#2b2b2b"/><circle cx="22" cy="-2" r="3.5" fill="#ccc"/></g>`

/** Bus, faces right; (x, y) = ground under the middle. Bounds: x ±62, y from −56 to 0. */
export const bus = (x: number, y: number, color: string, flip = false) => {
  let windows = ''
  for (let i = 0; i < 4; i++) windows += `<rect x="${-52 + i * 24}" y="-46" width="18" height="18" rx="2" fill="#bde3f2"/>`
  return (
    `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
    `<rect x="-60" y="-56" width="120" height="48" rx="8" fill="${color}"/>${windows}` +
    `<rect x="44" y="-46" width="14" height="30" rx="2" fill="#bde3f2"/><rect x="-60" y="-24" width="120" height="6" fill="#ffffff" fill-opacity="0.5"/>` +
    `<circle cx="-36" cy="-4" r="10" fill="#2b2b2b"/><circle cx="-36" cy="-4" r="4" fill="#ccc"/>` +
    `<circle cx="36" cy="-4" r="10" fill="#2b2b2b"/><circle cx="36" cy="-4" r="4" fill="#ccc"/></g>`
  )
}

/** Bicycle, faces right; (x, y) = ground under the middle. Bounds: x ±28, y from −34 to 0. */
export const bike = (x: number, y: number, color: string, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)" fill="none" stroke-width="3">` +
  `<circle cx="-16" cy="-11" r="11" stroke="#333"/><circle cx="16" cy="-11" r="11" stroke="#333"/>` +
  `<path d="M-16 -11l10 -16h14l8 16M-6 -27h12M-6 -27l6 16l-16 0M0 -11l12 -16" stroke="${color}"/>` +
  `<path d="M12 -27l-2 -7h8M-10 -30h8" stroke="#333"/></g>`

/** Round street tree; (x, y) = bottom of the trunk. Bounds: x ±24·s, y from −66·s to 0. */
export const cityTree = (x: number, y: number, s = 1, leaves = '#4caf6a') =>
  `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-4" y="-30" width="8" height="30" fill="#8a5a3b"/>` +
  `<circle cy="-44" r="22" fill="${leaves}"/><circle cx="-8" cy="-52" r="7" fill="#fff" fill-opacity="0.2"/></g>`

/** Lamp post; (x, y) = foot. The head is `lampHead`. Bounds of the post: x ±4, y from −92 to 0. */
export const lampPost = (x: number, y: number) =>
  `<rect x="${x - 3}" y="${y - 92}" width="6" height="92" fill="#3d4a55"/><rect x="${x - 8}" y="${y - 4}" width="16" height="4" fill="#3d4a55"/>`

/** Lamp head on the post at (x, y) (its foot). Bounds: x ±10, y from −112 to −88. */
export const lampHead = (x: number, y: number, light = '#ffd166') =>
  `<path d="M${x - 10} ${y - 92}h20l-4 -20h-12Z" fill="#3d4a55"/><circle cx="${x}" cy="${y - 100}" r="7" fill="${light}"/>`

/** Park bench; (x, y) = ground center. Bounds: x ±30, y from −30 to 0. */
export const bench = (x: number, y: number, color = '#a0703f') =>
  `<g transform="translate(${x} ${y})"><rect x="-30" y="-30" width="60" height="6" rx="2" fill="${color}"/>` +
  `<rect x="-30" y="-20" width="60" height="6" rx="2" fill="${color}"/><rect x="-26" y="-14" width="4" height="14" fill="#3d4a55"/>` +
  `<rect x="22" y="-14" width="4" height="14" fill="#3d4a55"/></g>`

/** Traffic light; (x, y) = foot. Bounds: x ±9, y from −86 to 0. `on` = index of the lit lamp (0 red, 1 yellow, 2 green). */
export const trafficLight = (x: number, y: number, on: number) => {
  const colors = ['#e63946', '#ffb703', '#8ac926']
  let lamps = ''
  colors.forEach((c, i) => {
    lamps += `<circle cx="0" cy="${-74 + i * 18}" r="6" fill="${c}" fill-opacity="${i === on ? 1 : 0.3}"/>`
  })
  return `<g transform="translate(${x} ${y})"><rect x="-2" y="-40" width="4" height="40" fill="#3d4a55"/><rect x="-9" y="-86" width="18" height="52" rx="4" fill="#2b2b2b"/>${lamps}</g>`
}

/** Litter bin; (x, y) = bottom center. Bounds: x ±10, y from −28 to 0. */
export const bin = (x: number, y: number, color = '#5c8d5a') =>
  `<path d="M${x - 9} ${y - 24}h18l-2 24h-14Z" fill="${color}"/><rect x="${x - 10}" y="${y - 28}" width="20" height="5" rx="2" fill="${color}"/>`

/** Fire hydrant; (x, y) = bottom center. Bounds: x ±9, y from −32 to 0. */
export const hydrant = (x: number, y: number, color = '#e63946') =>
  `<g transform="translate(${x} ${y})"><rect x="-6" y="-26" width="12" height="26" rx="3" fill="${color}"/>` +
  `<circle cy="-28" r="5" fill="${color}"/><rect x="-9" y="-18" width="18" height="5" rx="2" fill="${color}"/></g>`

/** Standing person, faces right; (x, y) = feet. Bounds: x ±13, y from −62 to 0. */
export const person = (x: number, y: number, shirt: string, flip = false, skin = '#f2d29b', hair = '#5a3d2b') =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<rect x="-9" y="-24" width="7" height="24" fill="#3d4a55"/><rect x="2" y="-24" width="7" height="24" fill="#3d4a55"/>` +
  `<path d="M-11 -48h22l3 26h-28Z" fill="${shirt}"/><path d="M-11 -46l-2 20M11 -46l2 20" stroke="${shirt}" stroke-width="5" stroke-linecap="round"/>` +
  `<circle cy="-54" r="8" fill="${skin}"/><path d="M-8 -56q8 -10 16 0v-4q-8 -6 -16 0Z" fill="${hair}"/>` +
  `<circle cx="3" cy="-55" r="1.2" fill="#222"/></g>`

/** Dog, faces right; (x, y) = feet. Bounds: x ±22, y from −26 to 0. */
export const dog = (x: number, y: number, color = '#c48a5a', flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  `<path d="M-12 -10v10M-4 -10v10M4 -10v10M12 -10v10" stroke="${color}" stroke-width="4"/>` +
  `<rect x="-16" y="-20" width="32" height="12" rx="6" fill="${color}"/>` +
  `<path d="M-16 -16l-6 -8" stroke="${color}" stroke-width="4" stroke-linecap="round"/>` +
  `<circle cx="16" cy="-20" r="7" fill="${color}"/><path d="M12 -26l-2 -5l6 2Z" fill="${color}"/>` +
  `<circle cx="22" cy="-19" r="1.8" fill="#222"/></g>`

/** Pigeon, faces right; (x, y) = feet. Bounds: x ±12, y from −14 to 0. */
export const pigeon = (x: number, y: number, flip = false, color = '#8d99ae') =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><ellipse cy="-6" rx="10" ry="5" fill="${color}"/>` +
  `<circle cx="8" cy="-10" r="4" fill="${color}"/><path d="M11 -10l4 1l-4 2Z" fill="#f4a261"/>` +
  `<path d="M-10 -6l-4 -4" stroke="${color}" stroke-width="3"/><path d="M-3 0v-3M3 0v-3" stroke="#f4a261" stroke-width="1.5"/></g>`

/** Balloon on a string; (x, y) = balloon center. Bounds: x ±13, y from −18 to +42. */
export const balloon = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y + 18}q4 12 -2 24" stroke="#777" stroke-width="1.5" fill="none"/>` +
  `<ellipse cx="${x}" cy="${y}" rx="13" ry="17" fill="${color}"/><path d="M${x - 3} ${y + 17}h6l-3 5Z" fill="${color}"/>`

/** Flower box; (x, y) = bottom center. Bounds: x ±18, y from −18 to 0. */
export const flowerBox = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})"><circle cx="-10" cy="-12" r="5" fill="${color}"/><circle cx="0" cy="-14" r="5" fill="${color}"/>` +
  `<circle cx="10" cy="-12" r="5" fill="${color}"/><path d="M-18 -8h36l-3 8h-30Z" fill="#a0703f"/></g>`

/** Traffic cone; (x, y) = bottom center. Bounds: x ±10, y from −24 to 0. */
export const cone = (x: number, y: number) =>
  `<path d="M${x - 5} ${y - 24}h10l5 22h-20Z" fill="#fb8500"/><rect x="${x - 10}" y="${y - 3}" width="20" height="3" fill="#2b2b2b"/>` +
  `<path d="M${x - 7} ${y - 12}h14" stroke="#fff" stroke-width="3"/>`

/** Road from x0 to x1 with its top at y: asphalt with a dashed line, a sidewalk above. */
export const street = (y: number, h = 120, sidewalk = 20) =>
  `<rect y="${y - sidewalk}" width="800" height="${sidewalk}" fill="#cfd5da"/>` +
  `<rect y="${y}" width="800" height="${h}" fill="#4a5058"/>` +
  `<path d="M0 ${y + h / 2}H800" stroke="#fff" stroke-width="4" stroke-dasharray="30 22"/>`

/** Far skyline: tower silhouettes from the deterministic `rand`, standing on y. */
export const skyline = (rand: () => number, y: number, color = '#b8c4d6') => {
  let towers = ''
  for (let x = -10; x < 800; x += 60 + rand() * 30) {
    const h = 60 + rand() * 90
    towers += `<rect x="${x}" y="${y - h}" width="${50 + rand() * 30}" height="${h}" fill="${color}"/>`
  }
  return towers
}
