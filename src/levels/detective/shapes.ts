// Drawing helpers of the "detective" scenes: rooms, furniture and the evidence left behind.
// Coordinates are in the 800×500 viewBox; "bounds" are relative to the given point.

/** Wall from the top down to the floor line `y`, a skirting board, and the floor below. */
export const room = (wall: string, floor: string, y: number) =>
  `<rect width="800" height="500" fill="${wall}"/><rect y="${y}" width="800" height="${500 - y}" fill="${floor}"/>` +
  `<rect y="${y - 10}" width="800" height="10" fill="#000" fill-opacity="0.12"/>`

/** Checkered floor tiles from `y` down. */
export function tiles(y: number, a: string, b: string) {
  let s = ''
  for (let row = 0; y + row * 34 < 500; row++)
    for (let col = 0; col < 20; col++) if ((row + col) % 2) s += `<rect x="${col * 40}" y="${y + row * 34}" width="40" height="34" fill="${(row + col) % 4 === 1 ? a : b}"/>`
  return s
}

/** Floor boards from `y` down: seams every 28 units, staggered joints. */
export function boards(y: number, line: string) {
  let s = ''
  for (let row = 0; y + row * 28 < 500; row++) {
    const top = y + row * 28
    s += `<path d="M0 ${top}H800" stroke="${line}" stroke-width="2"/>`
    for (let x = (row % 2) * 90 + 40; x < 800; x += 180) s += `<path d="M${x} ${top}v28" stroke="${line}" stroke-width="2"/>`
  }
  return s
}

/** Wallpaper stripes over the wall. */
export const stripes = (y: number, color: string) =>
  Array.from({ length: 20 }, (_, i) => `<rect x="${i * 40 + 14}" width="12" height="${y}" fill="${color}"/>`).join('')

export const sky = (color: string) => `<rect width="800" height="500" fill="${color}"/>`
export const sun = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="34" fill="#ffd54a"/><circle cx="${x}" cy="${y}" r="46" fill="#ffd54a" fill-opacity="0.25"/>`
export const cloud = (x: number, y: number, s = 1) =>
  `<g fill="#fff"><ellipse cx="${x}" cy="${y}" rx="${46 * s}" ry="${18 * s}"/><circle cx="${x - 16 * s}" cy="${y - 12 * s}" r="${18 * s}"/><circle cx="${x + 14 * s}" cy="${y - 16 * s}" r="${22 * s}"/></g>`
export const grass = (y: number, color = '#7cc25a') => `<rect y="${y}" width="800" height="${500 - y}" fill="${color}"/>`

/** Window frame with the sky behind; (x, y) = top-left. The glass (see `panes`) fills x+8…x+w−8, y+8…y+h−8. */
export const windowBox = (x: number, y: number, w: number, h: number, skyColor = '#bfe6ff') =>
  `<rect x="${x - 8}" y="${y + h - 4}" width="${w + 16}" height="10" rx="3" fill="#fff"/>` +
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#fff"/><rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${h - 16}" fill="${skyColor}"/>`
/** Closed sashes: tinted glass with a cross bar. Bounds: the glass of `windowBox`. */
export const panes = (x: number, y: number, w: number, h: number) =>
  `<rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${h - 16}" fill="#e8f6ff" fill-opacity="0.55"/>` +
  `<path d="M${x + w / 2} ${y + 8}V${y + h - 8}M${x + 8} ${y + h / 2}H${x + w - 8}" stroke="#fff" stroke-width="6"/>` +
  `<path d="M${x + 16} ${y + 26}l14 -12M${x + w / 2 + 8} ${y + h / 2 + 18}l14 -12" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`
/** Sashes swung open into the room: two narrow glass panels at the sides. Bounds: the glass of `windowBox`. */
export const openPanes = (x: number, y: number, w: number, h: number) =>
  [
    [x + 8, 1],
    [x + w - 8, -1],
  ]
    .map(
      ([edge, dir]) =>
        `<path d="M${edge} ${y + 8}L${edge + dir * 18} ${y + 18}V${y + h - 18}L${edge} ${y + h - 8}Z" fill="#e8f6ff" fill-opacity="0.7" stroke="#fff" stroke-width="4" stroke-linejoin="round"/>`,
    )
    .join('')

/** Door; (x, y) = top-left, two panels and a knob on the left. */
export const door = (x: number, y: number, w: number, h: number, color: string) =>
  `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 6}" fill="#000" fill-opacity="0.15"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>` +
  `<rect x="${x + 12}" y="${y + 14}" width="${w - 24}" height="${h * 0.36}" rx="3" fill="#000" fill-opacity="0.1"/>` +
  `<rect x="${x + 12}" y="${y + h * 0.5}" width="${w - 24}" height="${h * 0.4}" rx="3" fill="#000" fill-opacity="0.1"/>` +
  `<circle cx="${x + 12}" cy="${y + h * 0.46}" r="5" fill="#f2c14e"/>`

/** Table; (x, y) = left end of the top, legs down to y + h. */
export const table = (x: number, y: number, w: number, h: number, color: string) =>
  `<rect x="${x + 12}" y="${y + 10}" width="12" height="${h - 10}" fill="${color}"/><rect x="${x + w - 24}" y="${y + 10}" width="12" height="${h - 10}" fill="${color}"/>` +
  `<rect x="${x}" y="${y}" width="${w}" height="14" rx="4" fill="${color}"/><rect x="${x}" y="${y + 10}" width="${w}" height="4" fill="#000" fill-opacity="0.15"/>`

/** Wall shelf; (x, y) = left end of the board. */
export const shelf = (x: number, y: number, w: number, color = '#a8743f') =>
  `<rect x="${x}" y="${y}" width="${w}" height="8" fill="${color}"/><path d="M${x + 14} ${y + 8}v14l12-14M${x + w - 14} ${y + 8}v14l-12-14" fill="${color}"/>`

/** Jar on a shelf; (x, y) = bottom middle. Bounds: x ±13, y from −34 to 0. */
export const jar = (x: number, y: number, color: string) =>
  `<rect x="${x - 13}" y="${y - 28}" width="26" height="28" rx="5" fill="${color}"/><rect x="${x - 11}" y="${y - 34}" width="22" height="7" rx="2" fill="#e05a47"/>` +
  `<rect x="${x - 8}" y="${y - 20}" width="16" height="10" rx="2" fill="#fff" fill-opacity="0.7"/>`

/** Framed picture; (x, y) = center; `art` is drawn in a −w/2…w/2 × −h/2…h/2 box around (0, 0). */
export const picture = (x: number, y: number, w: number, h: number, art: string, frame = '#c9953f') =>
  `<g transform="translate(${x} ${y})"><rect x="${-w / 2 - 7}" y="${-h / 2 - 7}" width="${w + 14}" height="${h + 14}" rx="3" fill="${frame}"/>` +
  `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#e7f3fb"/>${art}</g>`
/** Landscape art for `picture`: hills and a sun. */
export const hills = (w: number, h: number) =>
  `<path d="M${-w / 2} ${h / 2}V${h * 0.1}Q${-w / 4} ${-h * 0.2} 0 ${h * 0.1}T${w / 2} ${h * 0.05}V${h / 2}Z" fill="#7cc25a"/><circle cx="${w * 0.22}" cy="${-h * 0.2}" r="${h * 0.14}" fill="#ffc94a"/>`

/** Wall clock with a swinging pendulum markup separate (`pendulum`); (x, y) = center of the face. */
export const clockFace = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="26" fill="#8a5a2b"/><circle cx="${x}" cy="${y}" r="20" fill="#fffaf0"/>` +
  `<path d="M${x} ${y}V${y - 13}M${x} ${y}h9" stroke="#3b2a1a" stroke-width="3" stroke-linecap="round"/>`
export const pendulum = (x: number, y: number) =>
  `<path d="M${x} ${y + 24}V${y + 70}" stroke="#8a5a2b" stroke-width="3"/><circle cx="${x}" cy="${y + 74}" r="9" fill="#f2c14e"/>`

/** Potted plant; (x, y) = bottom middle of the pot. Bounds: x ±30, y from −80 to 0. */
export const plant = (x: number, y: number) =>
  `<path d="M${x} ${y - 30}Q${x - 30} ${y - 56} ${x - 26} ${y - 76}Q${x - 6} ${y - 60} ${x} ${y - 30}M${x} ${y - 30}Q${x + 30} ${y - 60} ${x + 22} ${y - 80}Q${x + 2} ${y - 62} ${x} ${y - 30}M${x} ${y - 30}Q${x - 4} ${y - 62} ${x + 2} ${y - 78}Q${x + 8} ${y - 60} ${x} ${y - 30}" fill="#3f9b4b"/>` +
  `<path d="M${x - 20} ${y - 32}H${x + 20}L${x + 15} ${y}H${x - 15}Z" fill="#d9774a"/><rect x="${x - 22}" y="${y - 36}" width="44" height="7" rx="2" fill="#c0603a"/>`

/** Hanging lamp from the ceiling; (x, y) = bottom of the shade. */
export const hangingLamp = (x: number, y: number, color = '#e05a47') =>
  `<path d="M${x} 0V${y - 26}" stroke="#555" stroke-width="3"/><path d="M${x - 34} ${y}Q${x - 30} ${y - 30} ${x} ${y - 30}Q${x + 30} ${y - 30} ${x + 34} ${y}Z" fill="${color}"/>` +
  `<ellipse cx="${x}" cy="${y + 2}" rx="10" ry="6" fill="#fff3b0"/>`

/** Paw print, toes up; (x, y) = middle of the pad. Bounds: x ±9, y from −11 to +8. */
export const paw = (x: number, y: number, color = '#7a5233') =>
  `<g fill="${color}" fill-opacity="0.8"><ellipse cx="${x}" cy="${y + 2}" rx="6.5" ry="5.5"/><circle cx="${x - 6}" cy="${y - 5}" r="2.6"/>` +
  `<circle cx="${x - 2}" cy="${y - 8.5}" r="2.6"/><circle cx="${x + 2.5}" cy="${y - 8.5}" r="2.6"/><circle cx="${x + 6.5}" cy="${y - 5}" r="2.6"/></g>`
/** Trail of paw prints at the given points. */
export const pawTrail = (points: [number, number][], color?: string) => points.map(([x, y]) => paw(x, y, color)).join('')

/** Bird track (three toes forward, one back); (x, y) = heel. Bounds: x ±7, y from −9 to +4. */
export const birdTrack = (x: number, y: number, color = '#4a4a4a') =>
  `<path d="M${x} ${y + 4}V${y - 4}M${x} ${y - 2}l-6 -6M${x} ${y - 2}l6 -6M${x} ${y - 2}V${y - 9}" stroke="${color}" stroke-width="1.8" stroke-linecap="round" fill="none"/>`

/** Sneaker print with a zigzag sole; (x, y) = center, pointing up. Bounds: x ±9, y ±20. */
export const sneaker = (x: number, y: number, color = '#6b6f80') =>
  `<path d="M${x - 7} ${y - 12}Q${x} ${y - 22} ${x + 7} ${y - 12}L${x + 8} ${y + 2}Q${x + 6} ${y + 20} ${x} ${y + 19}Q${x - 6} ${y + 20} ${x - 7} ${y + 4}Z" fill="${color}" fill-opacity="0.55"/>` +
  `<path d="M${x - 5} ${y - 10}l10 4l-10 4l10 4l-10 4" stroke="#fff" stroke-opacity="0.6" stroke-width="1.6" fill="none"/>`

/** Crumbs scattered around (x, y). Bounds: x ±24, y from −8 to +4. */
export const crumbs = (x: number, y: number, color = '#d9a35a') =>
  `<g fill="${color}">` +
  [[-22, 0], [-14, -5], [-6, 1], [2, -6], [9, 0], [16, -4], [21, 1], [-2, 3]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="2.4"/>`).join('') +
  `</g>`

/** Tufted cobweb around (x, y); `torn` leaves a ragged gap and a dangling thread. Bounds: ±44. */
export function cobweb(x: number, y: number, torn = false) {
  const spokes = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4)
  const keep = (i: number) => !torn || i < 3 || i > 5
  const rings = [14, 26, 38]
    .map((r) => {
      let d = ''
      spokes.forEach((a, i) => {
        if (!keep(i) || !keep((i + 1) % 8)) return
        const b = spokes[(i + 1) % 8]
        d += `M${(x + r * Math.cos(a)).toFixed(1)} ${(y + r * Math.sin(a)).toFixed(1)}L${(x + r * Math.cos(b)).toFixed(1)} ${(y + r * Math.sin(b)).toFixed(1)}`
      })
      return d
    })
    .join('')
  const lines = spokes
    .filter((_, i) => keep(i))
    .map((a) => `M${x} ${y}L${(x + 42 * Math.cos(a)).toFixed(1)} ${(y + 42 * Math.sin(a)).toFixed(1)}`)
    .join('')
  const dangling = torn ? `M${x - 10} ${y + 12}q-6 14 2 28` : ''
  return `<path d="${lines}${rings}${dangling}" stroke="#fff" stroke-opacity="0.85" stroke-width="1.4" fill="none"/>`
}

/** Cardboard box; (x, y) = bottom-left. `open` folds the top flaps out. Bounds: x from −16 to w+16, y from −h−22 to 0. */
export const box = (x: number, y: number, w: number, h: number, open = false) =>
  `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#d0a066"/><rect x="${x}" y="${y - h}" width="${w}" height="10" fill="#000" fill-opacity="0.08"/>` +
  (open
    ? `<path d="M${x} ${y - h}L${x - 16} ${y - h - 20}L${x + w * 0.4} ${y - h - 22}L${x + w * 0.5} ${y - h}ZM${x + w} ${y - h}L${x + w + 16} ${y - h - 20}L${x + w * 0.6} ${y - h - 22}L${x + w * 0.5} ${y - h}Z" fill="#b8874f"/>` +
      `<rect x="${x + 6}" y="${y - h}" width="${w - 12}" height="8" fill="#5e3b1a" fill-opacity="0.6"/>`
    : `<path d="M${x + w / 2} ${y - h}v${h * 0.45}" stroke="#b8874f" stroke-width="5"/>`)

/** Black feather lying at (x, y), tilted. Bounds: x ±20, y ±10. */
export const feather = (x: number, y: number) =>
  `<path d="M${x - 19} ${y + 8}Q${x - 4} ${y - 12} ${x + 19} ${y - 9}Q${x + 6} ${y + 6} ${x - 19} ${y + 8}Z" fill="#2b2b38"/>` +
  `<path d="M${x - 19} ${y + 8}L${x + 16} ${y - 7}" stroke="#7a7a8c" stroke-width="1.4"/>`

/** Bush; (x, y) = bottom middle. Bounds: x ±60, y from −62 to 0. */
export const bush = (x: number, y: number, color = '#3f9b4b') =>
  `<g fill="${color}"><ellipse cx="${x}" cy="${y - 22}" rx="60" ry="22"/><circle cx="${x - 26}" cy="${y - 34}" r="24"/><circle cx="${x + 4}" cy="${y - 42}" r="22"/><circle cx="${x + 30}" cy="${y - 32}" r="22"/></g>`

/** Tree; (x, y) = foot of the trunk. Bounds: x ±62, y from −190 to 0. */
export const tree = (x: number, y: number) =>
  `<rect x="${x - 10}" y="${y - 90}" width="20" height="90" fill="#8a5a2b"/>` +
  `<g fill="#4caf50"><circle cx="${x}" cy="${y - 130}" r="56"/><circle cx="${x - 38}" cy="${y - 100}" r="32"/><circle cx="${x + 38}" cy="${y - 104}" r="32"/></g>`

/** Picket fence from x1 to x2 standing on y; `skip` = x of pickets left out (drawn by the scene). */
export function fence(x1: number, x2: number, y: number, color = '#f5ecd8', skip: number[] = []) {
  let s = `<rect x="${x1}" y="${y - 58}" width="${x2 - x1}" height="8" fill="${color}"/><rect x="${x1}" y="${y - 26}" width="${x2 - x1}" height="8" fill="${color}"/>`
  for (let x = x1 + 4; x + 14 <= x2; x += 26) if (!skip.includes(x)) s += picket(x, y, color)
  return s
}
/** One picket of `fence`, its left edge at x. Bounds: x from 0 to 16, y from −80 to 0. */
export const picket = (x: number, y: number, color = '#f5ecd8') =>
  `<path d="M${x} ${y}V${y - 72}L${x + 8} ${y - 80}L${x + 16} ${y - 72}V${y}Z" fill="${color}" stroke="#000" stroke-opacity="0.12" stroke-width="1.5"/>`

/** Cheese wheel seen from the side; (x, y) = bottom middle, `r` its half width. Bounds: x ±r, y from −r·0.9 to 0. */
export const cheese = (x: number, y: number, r: number) =>
  `<path d="M${x - r} ${y - r * 0.3}V${y - r * 0.6}A${r} ${r * 0.3} 0 0 1 ${x + r} ${y - r * 0.6}V${y - r * 0.3}A${r} ${r * 0.3} 0 0 1 ${x - r} ${y - r * 0.3}Z" fill="#f2b632"/>` +
  `<ellipse cx="${x}" cy="${y - r * 0.6}" rx="${r}" ry="${r * 0.3}" fill="#ffd45e"/>` +
  `<circle cx="${x - r * 0.4}" cy="${y - r * 0.6}" r="${r * 0.08}" fill="#e6a22a"/><circle cx="${x + r * 0.3}" cy="${y - r * 0.55}" r="${r * 0.1}" fill="#e6a22a"/>`

/** Coin stack; (x, y) = bottom middle. Bounds: x ±12, y from −4−5n to +3. */
export const coins = (x: number, y: number, n: number) =>
  Array.from({ length: n }, (_, i) => `<ellipse cx="${x}" cy="${y - i * 5}" rx="12" ry="4" fill="#f2c14e" stroke="#c9953f" stroke-width="1.5"/>`).join('')

/** Candle in a holder; (x, y) = bottom of the holder. Flame separate. Bounds: x ±16, y from −50 to 0. */
export const candle = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y - 3}" rx="16" ry="4" fill="#c9953f"/><rect x="${x - 6}" y="${y - 40}" width="12" height="36" fill="#fff6dc"/>` +
  `<path d="M${x} ${y - 40}v-6" stroke="#3b2a1a" stroke-width="2"/>`
/** Flame of `candle` at (x, y). Bounds: x ±7, y from −64 to −44. */
export const flame = (x: number, y: number) =>
  `<path d="M${x} ${y - 64}Q${x + 8} ${y - 52} ${x} ${y - 44}Q${x - 8} ${y - 52} ${x} ${y - 64}Z" fill="#ffb300"/><ellipse cx="${x}" cy="${y - 49}" rx="2.5" ry="4" fill="#fff3b0"/>`
/** Smoke wisp over an out `candle`. Bounds: x ±7, y from −70 to −46. */
export const smoke = (x: number, y: number) =>
  `<path d="M${x} ${y - 46}q-6 -6 0 -12t0 -12" stroke="#9a9aa6" stroke-width="2.4" stroke-linecap="round" fill="none"/>`

/** Blue amphora; (x, y) = bottom middle. Bounds: x ±32, y from −92 to 0. */
export const vase = (x: number, y: number) =>
  `<path d="M${x - 18} ${y - 90}H${x + 18}L${x + 12} ${y - 74}Q${x + 34} ${y - 56} ${x + 30} ${y - 30}Q${x + 26} ${y - 8} ${x + 16} ${y}H${x - 16}Q${x - 26} ${y - 8} ${x - 30} ${y - 30}Q${x - 34} ${y - 56} ${x - 12} ${y - 74}Z" fill="#3a6ea5"/>` +
  `<path d="M${x - 29} ${y - 44}q7 -8 14 0t14 0t14 0t14 0" stroke="#fff" stroke-width="4" fill="none"/><rect x="${x - 20}" y="${y - 92}" width="40" height="6" rx="3" fill="#2a5585"/>`

/** Blue and white shards. Bounds: x ±30, y ±12. */
export const shards = (x: number, y: number) =>
  `<g fill="#3a6ea5"><path d="M${x - 28} ${y + 6}l10 -14l8 12Z"/><path d="M${x - 4} ${y + 10}l6 -16l12 10Z"/><path d="M${x + 16} ${y}l12 -8l2 14Z"/><path d="M${x - 10} ${y - 8}l8 -4l2 8Z"/></g>` +
  `<path d="M${x + 4} ${y + 4}l8 -4" stroke="#fff" stroke-width="3"/>`

/** Wall spotlight at (x, y): lit or off. Bounds: ±18. */
export const spotlight = (x: number, y: number, on: boolean) =>
  (on ? `<circle cx="${x}" cy="${y + 4}" r="17" fill="#ffd54a" fill-opacity="0.45"/>` : '') +
  `<path d="M${x - 10} ${y - 8}H${x + 10}L${x + 7} ${y + 4}H${x - 7}Z" fill="#2b2b38"/><ellipse cx="${x}" cy="${y + 5}" rx="7" ry="3" fill="${on ? '#fff3b0' : '#5b6b7a'}"/>`

/** Top hat; (x, y) = bottom middle of the brim. Bounds: x ±24, y from −40 to +2. */
export const topHat = (x: number, y: number, band = '#e5484d') =>
  `<rect x="${x - 16}" y="${y - 40}" width="32" height="38" rx="3" fill="#2b2b38"/><rect x="${x - 16}" y="${y - 14}" width="32" height="7" fill="${band}"/>` +
  `<ellipse cx="${x}" cy="${y - 3}" rx="24" ry="5" fill="#2b2b38"/>`

/** Print of a white glove, fingers up; (x, y) = middle of the palm. Bounds: x ±10, y from −14 to +8. */
export const glovePrint = (x: number, y: number) =>
  `<g fill="#fff" fill-opacity="0.85"><ellipse cx="${x}" cy="${y + 1}" rx="7" ry="7"/>` +
  [-5, -1.7, 1.7, 5].map((dx) => `<rect x="${x + dx - 1.6}" y="${y - 14}" width="3.2" height="12" rx="1.6"/>`).join('') +
  `<rect x="${x + 4}" y="${y - 2}" width="3.2" height="10" rx="1.6" transform="rotate(-50 ${x + 5.6} ${y + 3})"/></g>`

/** Playing card lying tilted; (x, y) = center. Bounds: ±20. */
export const playingCard = (x: number, y: number, angle = -18) =>
  `<g transform="rotate(${angle} ${x} ${y})"><rect x="${x - 11}" y="${y - 15}" width="22" height="30" rx="3" fill="#fff" stroke="#c9c2b6" stroke-width="1.2"/>` +
  `<path d="M${x} ${y - 7}c-6 -6 -10 2 0 9c10 -7 6 -15 0 -9Z" fill="#e5484d"/></g>`

/** Banana peel lying flat; (x, y) = center. Bounds: x ±18, y ±10. */
export const bananaPeel = (x: number, y: number) =>
  `<g fill="#f2c94c" stroke="#c9953f" stroke-width="1.2"><path d="M${x - 4} ${y + 2}Q${x - 18} ${y - 2} ${x - 16} ${y + 8}Q${x - 8} ${y + 8} ${x - 2} ${y + 4}Z"/>` +
  `<path d="M${x + 4} ${y + 2}Q${x + 18} ${y - 2} ${x + 16} ${y + 8}Q${x + 8} ${y + 8} ${x + 2} ${y + 4}Z"/><path d="M${x - 3} ${y + 4}Q${x - 6} ${y - 8} ${x} ${y - 10}Q${x + 6} ${y - 8} ${x + 3} ${y + 4}Z"/></g>` +
  `<rect x="${x - 2}" y="${y + 2}" width="4" height="5" rx="1" fill="#7a5233"/>`

/** Lantern hanging from a hook at (x, y): lit or out. Bounds: x ±13, y from 0 to +40. */
export const lantern = (x: number, y: number, lit: boolean) =>
  (lit ? `<circle cx="${x}" cy="${y + 24}" r="13" fill="#ffd54a" fill-opacity="0.4"/>` : '') +
  `<path d="M${x - 6} ${y + 8}a6 6 0 0 1 12 0" fill="none" stroke="#2b2b38" stroke-width="2"/><rect x="${x - 9}" y="${y + 8}" width="18" height="5" fill="#2b2b38"/>` +
  `<rect x="${x - 7}" y="${y + 13}" width="14" height="20" fill="${lit ? '#ffe680' : '#8a8f99'}" stroke="#2b2b38" stroke-width="2"/><rect x="${x - 9}" y="${y + 33}" width="18" height="5" fill="#2b2b38"/>`

/** Bit of white fur. Bounds: x ±12, y ±9. */
export const furTuft = (x: number, y: number, color = '#fff') =>
  `<path d="M${x - 12} ${y + 6}q4 -10 8 -4q2 -10 6 -2q4 -9 6 1q5 -6 4 6q-6 6 -24 -1Z" fill="${color}" stroke="#c9c2b6" stroke-width="1"/>`

/** Snowy ground from `y` down with soft drifts. */
export const snowGround = (y: number) =>
  `<rect y="${y}" width="800" height="${500 - y}" fill="#f4f8fc"/>` +
  `<path d="M0 ${y}Q100 ${y - 14} 200 ${y}T400 ${y}T600 ${y}T800 ${y}V${y + 12}H0Z" fill="#f4f8fc"/>`

/** Fir tree with snow; (x, y) = foot of the trunk, `s` scale. Bounds: x ±44s, y from −150s to 0. */
export const fir = (x: number, y: number, s = 1) =>
  `<rect x="${x - 6 * s}" y="${y - 20 * s}" width="${12 * s}" height="${20 * s}" fill="#7a5233"/>` +
  [0, 1, 2]
    .map((i) => {
      const top = y - 150 * s + i * 40 * s
      const w = (24 + i * 10) * s
      return `<path d="M${x} ${top}L${x + w} ${top + 60 * s}H${x - w}Z" fill="#2f7d55"/><path d="M${x} ${top}L${x + w * 0.45} ${top + 24 * s}Q${x} ${top + 30 * s} ${x - w * 0.45} ${top + 24 * s}Z" fill="#fff"/>`
    })
    .join('')

/** Small handprint, fingers up; (x, y) = middle of the palm. Bounds: x ±7, y from −11 to +6. */
export const smallHand = (x: number, y: number) =>
  `<g fill="#fff" fill-opacity="0.55"><ellipse cx="${x}" cy="${y + 1}" rx="5" ry="5"/>` +
  [-3.6, -1.2, 1.2, 3.6].map((dx) => `<rect x="${x + dx - 1.1}" y="${y - 11}" width="2.2" height="8" rx="1.1"/>`).join('') +
  `<rect x="${x + 3}" y="${y - 2}" width="2.2" height="7" rx="1.1" transform="rotate(-50 ${x + 4} ${y + 2})"/></g>`

/** The golden snowflake trophy; (x, y) = bottom middle of its base. Bounds: x ±24, y from −54 to 0. */
export const trophy = (x: number, y: number) =>
  `<path d="M${x - 16} ${y - 52}H${x + 16}Q${x + 16} ${y - 24} ${x} ${y - 20}Q${x - 16} ${y - 24} ${x - 16} ${y - 52}Z" fill="#f2c14e"/>` +
  `<path d="M${x - 16} ${y - 48}q-10 0 -6 10t8 4M${x + 16} ${y - 48}q10 0 6 10t-8 4" stroke="#f2c14e" stroke-width="3" fill="none"/>` +
  `<rect x="${x - 4}" y="${y - 20}" width="8" height="10" fill="#e0b030"/><rect x="${x - 14}" y="${y - 10}" width="28" height="10" rx="2" fill="#c9953f"/>` +
  `<path d="M${x} ${y - 46}V${y - 30}M${x - 7} ${y - 42}l14 8M${x + 7} ${y - 42}l-14 8" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`
