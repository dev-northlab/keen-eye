// Drawing helpers of the "travel" levels: shapes shared by several places. Landmarks are drawn
// in their own level files.
export { cloud, pick, sun } from '../shapes.ts'
export { bench, bike, car, cityTree, lampHead, lampPost, person, pigeon } from '../chapter-02/shapes.ts'

/** Sky down to `horizon`, lighter in bands toward it. */
export const sky = (color = '#9ad8f2', horizon = 500) =>
  `<rect width="800" height="${horizon}" fill="${color}"/>` +
  [0.55, 0.75, 0.88].map((k, i) => `<rect y="${horizon * k}" width="800" height="${horizon * (1 - k)}" fill="#ffffff" fill-opacity="${0.12 + i * 0.04}"/>`).join('')

/** Flying gull; (x, y) = body. Bounds: x ±12, y from −5 to +3. */
export const gull = (x: number, y: number, color = '#3d4a55') =>
  `<path d="M${x - 12} ${y - 2}q6 -6 12 1q6 -7 12 -1" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round"/>`

/** Water from `y` to the bottom with a few wave lines placed by `rand`. */
export function water(y: number, color: string, rand: () => number, waves = 14) {
  let lines = ''
  for (let i = 0; i < waves; i++) {
    const x = rand() * 760
    const wy = y + 14 + rand() * (480 - y)
    lines += `<path d="M${x} ${wy}q8 -5 16 0t16 0" fill="none" stroke="#ffffff" stroke-opacity="0.45" stroke-width="2.4" stroke-linecap="round"/>`
  }
  return `<rect y="${y}" width="800" height="${500 - y}" fill="${color}"/>${lines}`
}

/** Palm tree; (x, y) = foot of the trunk, leaning by `lean`. Bounds: x ±(52 + |lean|), y from −120·s to 0. */
export const palm = (x: number, y: number, s = 1, lean = 10) => {
  const tx = x + lean * s
  const ty = y - 100 * s
  let leaves = ''
  for (const [dx, dy] of [[-48, 4], [-36, -18], [0, -26], [36, -18], [48, 6]])
    leaves +=
      `<path d="M${tx} ${ty}Q${tx + (dx / 2) * s} ${ty + (dy / 2 - 22) * s} ${tx + dx * s} ${ty + dy * s}` +
      `Q${tx + (dx / 2) * s} ${ty + (dy / 2 + 4) * s} ${tx} ${ty + 6 * s}Z" fill="#3f9b4b"/>`
  return (
    `<path d="M${x - 6 * s} ${y}Q${x} ${y - 50 * s} ${tx - 3 * s} ${ty}h${6 * s}Q${x + 6 * s} ${y - 50 * s} ${x + 6 * s} ${y}Z" fill="#a8743f"/>` +
    leaves
  )
}

/** Paper lantern; (x, y) = top of the string. Bounds: x ±10, y from 0 to +30. */
export const lantern = (x: number, y: number, color = '#e63946') =>
  `<path d="M${x} ${y}v6" stroke="#3d4a55" stroke-width="1.5"/><ellipse cx="${x}" cy="${y + 17}" rx="10" ry="12" fill="${color}"/>` +
  `<rect x="${x - 5}" y="${y + 4}" width="10" height="3" fill="#3d4a55"/><rect x="${x - 5}" y="${y + 27}" width="10" height="3" fill="#3d4a55"/>`

/** Rounded hill silhouette across the picture from x0 to x1, its top at `top`, foot at `foot`. */
export const hill = (x0: number, x1: number, top: number, foot: number, color: string) =>
  `<path d="M${x0} ${foot}Q${(x0 + x1) / 2} ${2 * top - foot} ${x1} ${foot}Z" fill="${color}"/>`

/** Travel suitcase standing on its wheels; (x, y) = ground under the middle. Bounds: x ±10, y from −32 to 0. */
export const suitcase = (x: number, y: number, color = '#e63946') =>
  `<path d="M${x - 4} ${y - 25}v-6h8v6" fill="none" stroke="#3d4a55" stroke-width="2"/>` +
  `<rect x="${x - 9}" y="${y - 26}" width="18" height="22" rx="3" fill="${color}"/>` +
  `<path d="M${x - 4} ${y - 23}v16M${x + 4} ${y - 23}v16" stroke="#1d1d1d" stroke-opacity="0.25" stroke-width="2"/>` +
  `<circle cx="${x - 5}" cy="${y - 2}" r="2" fill="#3d4a55"/><circle cx="${x + 5}" cy="${y - 2}" r="2" fill="#3d4a55"/>`
