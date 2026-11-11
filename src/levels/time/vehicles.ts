// "Time" category: vehicles and the things around them — the emergency services of level 210, the military base
// of level 220, the construction site of 221, the airport of 222 and the army camp of level 225.
// Flat cartoon shapes at (x, y) = foot center unless said otherwise; the bounds in the comments are what a
// difference zone must cover. Parts that can differ (a barrel, a tail rotor, a fin star, a dish) are their own
// functions, drawn at the same place as on the whole shape.

const TRACK = '#3b3f36'
const DARK = '#2f3329'
const GLASS = '#bde3f2'

/** Markup drawn at `s` of its size around (x, y): aircraft flying in the distance. */
export const scaledAt = (x: number, y: number, s: number, body: string) =>
  `<g transform="translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})">${body}</g>`

/** Five-pointed star; (x, y) = center, r = outer radius. Bounds: radius r. */
export const star5 = (x: number, y: number, r: number, color = '#ffffff') => {
  const points: string[] = []
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2
    const d = i % 2 === 0 ? r : r * 0.42
    points.push(`${(x + Math.cos(a) * d).toFixed(1)} ${(y + Math.sin(a) * d).toFixed(1)}`)
  }
  return `<path d="M${points.join('L')}Z" fill="${color}"/>`
}

/** Tank facing right, without its barrel (`tankBarrel`). Bounds: x ±78, y from −76 to 0. */
export const tank = (x: number, y: number, body = '#6b7f3a', patch = '#4f5f2a') =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="-70" y="-26" width="140" height="26" rx="13" fill="${TRACK}"/>` +
  [-52, -26, 0, 26, 52].map((w) => `<circle cx="${w}" cy="-13" r="9" fill="#6b6f63"/><circle cx="${w}" cy="-13" r="3" fill="${DARK}"/>`).join('') +
  `<path d="M-74 -26L-62 -46H66L78 -26Z" fill="${body}"/>` +
  `<ellipse cx="-30" cy="-36" rx="14" ry="5" fill="${patch}"/><ellipse cx="30" cy="-34" rx="18" ry="5" fill="${patch}"/>` +
  `<path d="M-36 -46Q-34 -70 -4 -72H18Q34 -70 38 -46Z" fill="${body}"/>` +
  `<ellipse cx="4" cy="-58" rx="12" ry="5" fill="${patch}"/>` +
  `<ellipse cx="-8" cy="-72" rx="12" ry="4" fill="${DARK}"/>` +
  `<path d="M-60 -46v-16" stroke="${DARK}" stroke-width="2"/></g>`

/** Barrel of a `tank` at (x, y), `len` long with its muzzle. Bounds: x from +36 to +44 + len, y from −70 to −58. */
export const tankBarrel = (x: number, y: number, len: number, color = '#4f5f2a') =>
  `<rect x="${x + 36}" y="${y - 68}" width="${len}" height="8" fill="${color}"/>` +
  `<rect x="${x + 36 + len}" y="${y - 70}" width="8" height="12" rx="2" fill="${DARK}"/>`

/** Helicopter standing on its skids, nose to the left, without its tail rotor (`tailRotor`). Bounds: x from −86 to +118, y from −62 to 0. */
export const helicopter = (x: number, y: number, body = '#5b7042') =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-56 0H44M-42 0V-12M28 0V-12" stroke="${DARK}" stroke-width="4" stroke-linecap="round" fill="none"/>` +
  `<path d="M34 -38L108 -44V-34L34 -22Z" fill="${body}"/>` +
  `<path d="M100 -44L110 -62H118L114 -36Z" fill="${body}"/>` +
  `<ellipse cx="-6" cy="-30" rx="46" ry="22" fill="${body}"/>` +
  `<path d="M-50 -28Q-48 -48 -22 -50V-28Z" fill="${GLASS}"/>` +
  `<rect x="0" y="-36" width="18" height="12" rx="2" fill="${GLASS}"/>` +
  `<rect x="-10" y="-58" width="8" height="8" fill="${DARK}"/>` +
  `<rect x="-86" y="-62" width="160" height="5" rx="2.5" fill="${DARK}"/><circle cx="-6" cy="-60" r="4" fill="#8d99a6"/></g>`

/** Tail rotor of a `helicopter` at (x, y). Bounds: x from +100 to +124, y from −64 to −40. */
export const tailRotor = (x: number, y: number) =>
  `<path d="M${x + 103} ${y - 61}l18 18M${x + 121} ${y - 61}l-18 18" stroke="${DARK}" stroke-width="3.5" stroke-linecap="round"/>` +
  `<circle cx="${x + 112}" cy="${y - 52}" r="3" fill="#8d99a6"/>`

/** Jet, nose to the left: parked on its wheels or flying with them up. Its fin star is `finStar`. Bounds: x from −112 to +104, y from −86 to 0 (flying: to −22). */
export const jet = (x: number, y: number, body = '#8d99a6', dark = '#6c7884', wheels = true) =>
  `<g transform="translate(${x} ${y})">` +
  (wheels
    ? `<path d="M-72 -26V-8M18 -28V-8M36 -28V-8" stroke="${DARK}" stroke-width="3"/>` +
      [-72, 18, 36].map((w) => `<circle cx="${w}" cy="-7" r="7" fill="${TRACK}"/><circle cx="${w}" cy="-7" r="2.5" fill="#ccc"/>`).join('')
    : '') +
  `<path d="M52 -46L78 -86H92L96 -46Z" fill="${body}"/>` +
  `<path d="M-112 -32Q-96 -46 -60 -46H80L96 -40V-26H-60Q-96 -24 -112 -32Z" fill="${body}"/>` +
  `<path d="M-74 -46Q-60 -62 -36 -58L-24 -46Z" fill="${GLASS}" stroke="#55606b" stroke-width="2"/>` +
  `<path d="M-20 -32H50L70 -22H-10Z" fill="${dark}"/>` +
  `<path d="M60 -38L100 -36L104 -30H66Z" fill="${dark}"/>` +
  `<rect x="96" y="-40" width="8" height="14" fill="#555"/>` +
  `<path d="M-112 -32h10" stroke="${dark}" stroke-width="3"/></g>`

/** Star on the fin of a `jet` at (x, y). Bounds: x from +71 to +89, y from −72 to −54. */
export const finStar = (x: number, y: number, color = '#e63946') => star5(x + 80, y - 63, 9, color)

/** Fuel truck, cab to the left. Bounds: x ±80, y from −66 to 0. */
export const fuelTruck = (x: number, y: number, body = '#6b7f3a', tankColor = '#a3a66a') =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="-78" y="-26" width="156" height="10" fill="${DARK}"/>` +
  `<path d="M-80 -24V-58Q-80 -66 -72 -66H-40V-24Z" fill="${body}"/><rect x="-74" y="-60" width="26" height="16" rx="2" fill="${GLASS}"/>` +
  `<rect x="-34" y="-66" width="114" height="42" rx="18" fill="${tankColor}"/>` +
  `<path d="M-20 -60v30M56 -60v30" stroke="#868955" stroke-width="3"/><rect x="2" y="-50" width="36" height="12" rx="2" fill="#e63946"/>` +
  `<circle cx="66" cy="-30" r="7" fill="${DARK}"/><circle cx="66" cy="-30" r="3" fill="#8d99a6"/>` +
  [-60, 20, 50].map((w) => `<circle cx="${w}" cy="-11" r="11" fill="${TRACK}"/><circle cx="${w}" cy="-11" r="4" fill="#ccc"/>`).join('') +
  `</g>`

/** Radar dish on top of its mast, facing right (`dir` 1) or left (−1); (x, y) = dish center. Bounds: x ±22, y ±18. */
export const radarDish = (x: number, y: number, dir: 1 | -1 = 1) =>
  `<g transform="translate(${x} ${y}) scale(${dir} 1)">` +
  `<path d="M-14 -18Q10 0 -14 18Q-2 0 -14 -18Z" fill="#e9ecef" stroke="#8d99a6" stroke-width="2"/>` +
  `<path d="M-6 0H18" stroke="#55606b" stroke-width="3"/><circle cx="20" cy="0" r="3" fill="#e63946"/></g>`

/** Windsock on its pole, blowing to the right. Bounds: x from −3 to +52, y from −76 to 0. */
export const windsock = (x: number, y: number) =>
  `<path d="M${x} ${y}V${y - 74}" stroke="#55606b" stroke-width="4"/>` +
  `<path d="M${x} ${y - 74}L${x + 50} ${y - 66}V${y - 60}L${x} ${y - 52}Z" fill="#fb8500"/>` +
  `<path d="M${x + 14} ${y - 72}V${y - 54}M${x + 34} ${y - 69}V${y - 57}" stroke="#ffffff" stroke-width="6"/>`

/** Pegboard on a wall with its top-left corner at (x, y), w × h. */
export const pegboard = (x: number, y: number, w: number, h: number) => {
  let holes = ''
  for (let i = 8; i < w - 4; i += 12) for (let j = 8; j < h - 4; j += 12) holes += `<circle cx="${x + i}" cy="${y + j}" r="1.3" fill="#9c7a4a"/>`
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#d8b47c"/>${holes}`
}

/** Open-end wrench hanging upright; (x, y) = center. Bounds: x ±9, y ±22. */
export const wrench = (x: number, y: number, color = '#8d99a6') =>
  `<rect x="${x - 3}" y="${y - 12}" width="6" height="26" rx="3" fill="${color}"/>` +
  `<circle cx="${x}" cy="${y - 14}" r="8" fill="${color}"/><rect x="${x - 3}" y="${y - 23}" width="6" height="9" fill="#d8b47c"/>` +
  `<circle cx="${x}" cy="${y + 15}" r="6" fill="${color}"/><circle cx="${x}" cy="${y + 15}" r="2.5" fill="#d8b47c"/>`

/** Hammer hanging head up; (x, y) = center. Bounds: x ±10, y ±20. */
export const hammer = (x: number, y: number) =>
  `<rect x="${x - 2.5}" y="${y - 12}" width="5" height="32" rx="2" fill="#b5835a"/><rect x="${x - 10}" y="${y - 20}" width="20" height="9" rx="2" fill="#55606b"/>`

/** Screwdriver hanging tip down; (x, y) = center. Bounds: x ±4, y ±20. */
export const screwdriver = (x: number, y: number, handle = '#e63946') =>
  `<rect x="${x - 4}" y="${y - 20}" width="8" height="16" rx="3" fill="${handle}"/><path d="M${x} ${y - 4}V${y + 20}" stroke="#8d99a6" stroke-width="2.5"/>`

/** Pliers hanging jaws up; (x, y) = center. Bounds: x ±7, y ±18. */
export const pliers = (x: number, y: number) =>
  `<path d="M${x - 2} ${y - 18}L${x} ${y - 4}L${x + 2} ${y - 18}" stroke="#55606b" stroke-width="3" fill="none"/>` +
  `<path d="M${x} ${y - 4}L${x - 6} ${y + 18}M${x} ${y - 4}L${x + 6} ${y + 18}" stroke="#2a9d8f" stroke-width="4" stroke-linecap="round"/>`

/** Workbench with a saw on top; (x, y) = foot center, w wide. Bounds: x ±w/2, y from −30 to 0. */
export const workbench = (x: number, y: number, w: number) =>
  `<rect x="${x - w / 2}" y="${y - 24}" width="${w}" height="6" fill="#8a5a33"/>` +
  `<path d="M${x - w / 2 + 4} ${y - 18}V${y}M${x + w / 2 - 4} ${y - 18}V${y}M${x - w / 2 + 4} ${y - 8}H${x + w / 2 - 4}" stroke="#6b4426" stroke-width="4"/>` +
  `<path d="M${x - 18} ${y - 24}L${x + 10} ${y - 30}L${x + 12} ${y - 24}Z" fill="#ced4da"/><rect x="${x + 10}" y="${y - 31}" width="10" height="7" rx="2" fill="#b5835a"/>`

/** Toolbox with a handle; (x, y) = bottom center. Bounds: x ±24, y from −36 to 0. */
export const toolbox = (x: number, y: number, color = '#e63946') =>
  `<rect x="${x - 22}" y="${y - 22}" width="44" height="22" rx="2" fill="${color}"/>` +
  `<rect x="${x - 24}" y="${y - 28}" width="48" height="7" rx="2" fill="${color}"/>` +
  `<path d="M${x - 10} ${y - 28}v-6h20v6" stroke="#2b2d42" stroke-width="3" fill="none"/>` +
  `<rect x="${x - 4}" y="${y - 20}" width="8" height="5" fill="#ced4da"/>`

/** Jerrycan; (x, y) = bottom center. Bounds: x ±11, y from −34 to 0. */
export const jerrycan = (x: number, y: number, color = '#4f6b2f') =>
  `<rect x="${x - 10}" y="${y - 30}" width="20" height="30" rx="3" fill="${color}"/>` +
  `<path d="M${x - 6} ${y - 24}l12 18M${x + 6} ${y - 24}l-12 18" stroke="#3b4f22" stroke-width="2"/>` +
  `<path d="M${x - 8} ${y - 30}v-4h8v4" stroke="${color}" stroke-width="3" fill="none"/><rect x="${x + 3}" y="${y - 34}" width="5" height="4" fill="#2b2d42"/>`

/** Stack of n tires; (x, y) = bottom center. Bounds: x ±22, y from −12·n − 4 to 0. */
export const tireStack = (x: number, y: number, n: number) => {
  let tires = ''
  for (let i = 0; i < n; i++) {
    const cy = y - 6 - i * 12
    tires += `<rect x="${x - 22}" y="${cy - 6}" width="44" height="12" rx="6" fill="${TRACK}"/><ellipse cx="${x}" cy="${cy - 4}" rx="10" ry="2.5" fill="#1d201a"/>`
  }
  return tires
}

/** Wall of sandbags, three rows; (x, y) = bottom center. Bounds: x ±32, y from −30 to 0. */
export const sandbags = (x: number, y: number) => {
  let bags = ''
  const rows: [number, number[]][] = [[-5, [-22, 0, 22]], [-15, [-11, 11]], [-25, [0]]]
  for (const [dy, xs] of rows) for (const dx of xs) bags += `<rect x="${x + dx - 11}" y="${y + dy - 5}" width="22" height="11" rx="5" fill="#cdb98a" stroke="#a8925f" stroke-width="1.5"/>`
  return bags
}

/** Ladder leaning to the right, from its foot (x, y) up to (x + dx, y − h). */
export const ladder = (x: number, y: number, dx: number, h: number) => {
  let rungs = ''
  for (let t = 0.15; t < 1; t += 0.17) rungs += `<path d="M${x + dx * t} ${y - h * t}h14" stroke="#ced4da" stroke-width="3"/>`
  return `<path d="M${x} ${y}L${x + dx} ${y - h}M${x + 14} ${y}L${x + dx + 14} ${y - h}" stroke="#adb5bd" stroke-width="4"/>${rungs}`
}

/** Fire extinguisher; (x, y) = bottom center. Bounds: x ±8, y from −30 to 0. */
export const extinguisher = (x: number, y: number) =>
  `<rect x="${x - 6}" y="${y - 24}" width="12" height="24" rx="5" fill="#e63946"/><rect x="${x - 3}" y="${y - 30}" width="6" height="6" fill="#2b2d42"/>` +
  `<path d="M${x + 3} ${y - 28}q6 2 5 10" stroke="#2b2d42" stroke-width="2" fill="none"/>`

/** Flag on a pole; (x, y) = foot of the pole, h high. Bounds: x from −3 to +44, y from −h to 0. */
export const flag = (x: number, y: number, h: number, color = '#3a86ff') =>
  `<path d="M${x} ${y}V${y - h}" stroke="#55606b" stroke-width="4"/>` +
  `<path d="M${x + 2} ${y - h + 2}h40v28h-40Z" fill="${color}"/>${star5(x + 22, y - h + 16, 8, '#ffd23f')}`

/** Army tent with a door flap. Bounds: x ±90, y from −62 to 0. */
export const armyTent = (x: number, y: number, canvas = '#8a8f5a', dark = '#6b7046') =>
  `<path d="M${x - 90} ${y}L${x - 64} ${y - 60}H${x + 64}L${x + 90} ${y}Z" fill="${canvas}"/>` +
  `<path d="M${x - 64} ${y - 60}L${x - 52} ${y}M${x + 64} ${y - 60}L${x + 52} ${y}" stroke="${dark}" stroke-width="3"/>` +
  `<path d="M${x - 16} ${y}L${x} ${y - 46}L${x + 16} ${y}Z" fill="#3a3f36"/><path d="M${x} ${y - 46}L${x + 16} ${y}L${x + 26} ${y}Z" fill="${dark}"/>` +
  `<rect x="${x - 66}" y="${y - 62}" width="132" height="4" rx="2" fill="${dark}"/>`

/** Army truck with a canvas cover, cab to the left; its spare wheel is `spareWheel`. Bounds: x from −92 to +92, y from −72 to 0. */
export const cargoTruck = (x: number, y: number, body = '#5c6b33', canvas = '#8a8f5a') =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="-86" y="-26" width="178" height="10" fill="${DARK}"/>` +
  `<path d="M-90 -24V-56Q-90 -64 -82 -64H-44V-24Z" fill="${body}"/><rect x="-84" y="-58" width="24" height="14" rx="2" fill="${GLASS}"/>` +
  `<rect x="-92" y="-36" width="4" height="6" fill="#ffd166"/>` +
  `<path d="M-38 -24V-60Q-38 -72 -26 -72H80Q92 -72 92 -60V-24Z" fill="${canvas}"/>` +
  `<path d="M-6 -72V-30M26 -72V-30M58 -72V-30" stroke="#6b7046" stroke-width="3"/><rect x="-38" y="-30" width="130" height="6" fill="${body}"/>` +
  [-66, 34, 66].map((w) => `<circle cx="${w}" cy="-12" r="12" fill="${TRACK}"/><circle cx="${w}" cy="-12" r="4" fill="#ccc"/>`).join('') +
  `</g>`

/** Spare wheel on the back of a `cargoTruck` at (x, y). Bounds: x from +92 to +104, y from −56 to −24. */
export const spareWheel = (x: number, y: number) =>
  `<ellipse cx="${x + 98}" cy="${y - 40}" rx="6" ry="16" fill="${TRACK}"/><ellipse cx="${x + 98}" cy="${y - 40}" rx="2.5" ry="6" fill="#8d99a6"/>`

/** Open jeep facing right. Bounds: x ±46, y from −50 to 0. */
export const jeep = (x: number, y: number, body = '#6b7f3a') =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="-30" y="-46" width="12" height="12" rx="2" fill="${DARK}"/>` +
  `<path d="M-44 -10V-34H40Q46 -34 46 -26V-10Z" fill="${body}"/>` +
  `<path d="M10 -34L16 -50" stroke="${DARK}" stroke-width="3"/><path d="M12 -36L16 -48" stroke="${GLASS}" stroke-width="3"/>` +
  `<circle cx="41" cy="-26" r="3" fill="#ffd166"/><path d="M-36 -22h20M22 -22h14" stroke="#4f5f2a" stroke-width="2"/>` +
  [-26, 28].map((w) => `<circle cx="${w}" cy="-11" r="11" fill="${TRACK}"/><circle cx="${w}" cy="-11" r="4" fill="#ccc"/>`).join('') +
  `</g>`

/** Armoured carrier on eight wheels, nose to the left, without its hatch lid (`apcHatch`). Bounds: x from −86 to +86, y from −66 to 0. */
export const apc = (x: number, y: number, body = '#6b7f3a', dark = '#4f5f2a') =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-86 -26L-66 -54H72L86 -26L80 -14H-80Z" fill="${body}"/>` +
  `<path d="M-60 -40h14M-30 -40h14M10 -40h14" stroke="${DARK}" stroke-width="3"/>` +
  `<rect x="-24" y="-66" width="34" height="12" rx="3" fill="${dark}"/><rect x="-54" y="-63" width="30" height="4" fill="${dark}"/>` +
  `<ellipse cx="40" cy="-54" rx="13" ry="3" fill="${DARK}"/>` +
  [-56, -20, 20, 56].map((w) => `<circle cx="${w}" cy="-13" r="13" fill="${TRACK}"/><circle cx="${w}" cy="-13" r="4.5" fill="#6b6f63"/>`).join('') +
  `</g>`

/** Hatch lid of an `apc` at (x, y): closed, or open and standing up. Bounds: x from +22 to +53, y from −80 to −52. */
export const apcHatch = (x: number, y: number, open: boolean, color = '#4f5f2a') =>
  open
    ? `<path d="M${x + 28} ${y - 55}L${x + 22} ${y - 78}L${x + 34} ${y - 80}L${x + 40} ${y - 55}Z" fill="${color}"/>`
    : `<ellipse cx="${x + 40}" cy="${y - 56}" rx="12" ry="4" fill="${color}" stroke="${DARK}" stroke-width="1.5"/>`

/** Red cross; (x, y) = center. Bounds: radius 11. */
export const redCross = (x: number, y: number) =>
  `<path d="M${x - 3} ${y - 8}h6v5h5v6h-5v5h-6v-5h-5v-6h5Z" fill="#e63946"/>`

// --- Emergency services (level 210) ---

/** Fire engine facing right, with a ladder on top; its hose reel is `hoseReel`. Bounds: x from −106 to +108, y from −82 to 0. */
export const fireEngine = (x: number, y: number, body = '#e63946') =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="-104" y="-26" width="212" height="10" fill="${DARK}"/>` +
  `<rect x="-104" y="-66" width="164" height="42" rx="3" fill="${body}"/>` +
  `<path d="M-96 -58h36v28h-36ZM-52 -58h36v28h-36ZM-8 -58h28v28h-28Z" fill="#c92a36"/>` +
  `<rect x="-104" y="-30" width="164" height="5" fill="#ffffff"/>` +
  `<path d="M60 -24V-66Q60 -74 68 -74H94Q108 -74 108 -60V-24Z" fill="${body}"/><rect x="74" y="-68" width="28" height="18" rx="2" fill="${GLASS}"/>` +
  `<rect x="104" y="-36" width="5" height="7" fill="#ffd166"/><rect x="78" y="-82" width="16" height="8" rx="2" fill="#3a86ff"/>` +
  `<rect x="-102" y="-78" width="160" height="10" rx="2" fill="#adb5bd"/>` +
  Array.from({ length: 13 }, (_, i) => `<path d="M${-94 + i * 12} -77v8" stroke="#6c757d" stroke-width="2"/>`).join('') +
  [-76, -42, 80].map((w) => `<circle cx="${w}" cy="-12" r="13" fill="${TRACK}"/><circle cx="${w}" cy="-12" r="4.5" fill="#ccc"/>`).join('') +
  `</g>`

/** Rolled hose on the side of a `fireEngine` at (x, y). Bounds: x from +24 to +52, y from −58 to −30. */
export const hoseReel = (x: number, y: number) =>
  `<circle cx="${x + 38}" cy="${y - 44}" r="14" fill="#f1e3c6"/><circle cx="${x + 38}" cy="${y - 44}" r="9" fill="none" stroke="#d9c08f" stroke-width="2"/>` +
  `<circle cx="${x + 38}" cy="${y - 44}" r="4" fill="#8d99a6"/>`

/** Police car facing right, white with a blue stripe; its light bar is `lightBar`. Bounds: x ±54, y from −54 to 0. */
export const policeCar = (x: number, y: number) =>
  `<g transform="translate(${x} ${y - 8})">` +
  `<path d="M-54 -12q0 -14 12 -14h10l14 -20h34l16 20h14q8 0 8 10v14h-108Z" fill="#f8f9fa"/>` +
  `<path d="M-15 -42L-24 -28H26L16 -42Z" fill="${GLASS}"/><path d="M2 -42V-28" stroke="#f8f9fa" stroke-width="3"/>` +
  `<rect x="-54" y="-18" width="108" height="7" fill="#1d4ed8"/><rect x="49" y="-24" width="5" height="5" fill="#ffd166"/>` +
  [-30, 30].map((w) => `<circle cx="${w}" cy="-2" r="10" fill="${TRACK}"/><circle cx="${w}" cy="-2" r="3.5" fill="#ccc"/>`).join('') +
  `</g>`

/** Light bar on the roof of a `policeCar` at (x, y), its two lamps' colours. Bounds: x ±14, y from −62 to −54. */
export const lightBar = (x: number, y: number, left = '#e63946', right = '#3a86ff') =>
  `<rect x="${x - 14}" y="${y - 62}" width="13" height="8" rx="2" fill="${left}"/><rect x="${x + 1}" y="${y - 62}" width="13" height="8" rx="2" fill="${right}"/>`

/** Ambulance van facing right; the red cross on its side is `redCross` at (x − 20, y − 45). Bounds: x from −64 to +66, y from −84 to 0. */
export const ambulance = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-64 -14V-70Q-64 -78 -56 -78H30Q40 -78 46 -64L60 -42Q66 -36 66 -28V-14Z" fill="#f8f9fa"/>` +
  `<path d="M34 -72L48 -46H24V-72Z" fill="${GLASS}"/><rect x="-6" y="-70" width="22" height="16" rx="2" fill="${GLASS}"/>` +
  `<rect x="-64" y="-34" width="130" height="6" fill="#e63946"/><rect x="-10" y="-84" width="16" height="6" rx="2" fill="#3a86ff"/>` +
  `<rect x="61" y="-26" width="5" height="6" fill="#ffd166"/><path d="M-64 -14H66" stroke="${DARK}" stroke-width="4"/>` +
  [-40, 40].map((w) => `<circle cx="${w}" cy="-12" r="12" fill="${TRACK}"/><circle cx="${w}" cy="-12" r="4" fill="#ccc"/>`).join('') +
  `</g>`

/** Bell; (x, y) = top of its hanger. Bounds: x ±11, y from −2 to +25. */
export const bell = (x: number, y: number) =>
  `<path d="M${x} ${y - 2}v4M${x - 9} ${y + 20}q0 -18 9 -18q9 0 9 18Z" stroke="#7a5236" stroke-width="2" fill="#ffd23f"/><circle cx="${x}" cy="${y + 22}" r="3" fill="#7a5236"/>`

// --- Construction site (level 221) ---

/** Excavator facing right, its arm reaching forward; the bucket is `excavatorBucket`. Bounds: x from −62 to +106, y from −104 to 0. */
export const excavator = (x: number, y: number, body = '#ffb703') =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="-62" y="-22" width="104" height="22" rx="11" fill="${TRACK}"/>` +
  [-46, -20, 6, 30].map((w) => `<circle cx="${w}" cy="-11" r="6" fill="#6b6f63"/>`).join('') +
  `<rect x="-58" y="-34" width="96" height="12" fill="${DARK}"/>` +
  `<rect x="-60" y="-62" width="40" height="28" rx="3" fill="${body}"/>` +
  `<path d="M-20 -34V-80Q-20 -86 -14 -86H8L14 -34Z" fill="${body}"/><path d="M-14 -80H6L10 -54H-14Z" fill="${GLASS}"/>` +
  `<path d="M10 -50L62 -98L102 -48" stroke="${body}" stroke-width="11" stroke-linejoin="round" fill="none"/>` +
  `<path d="M14 -46L58 -86" stroke="${DARK}" stroke-width="3"/><circle cx="62" cy="-98" r="5" fill="${DARK}"/></g>`

/** Bucket at the end of an `excavator`'s arm (x + 102, y − 48), turned `deg`. Bounds: radius 30 around that point. */
export const excavatorBucket = (x: number, y: number, deg = 0) =>
  `<g transform="translate(${x + 102} ${y - 48}) rotate(${deg})">` +
  `<path d="M-6 -4L16 2L14 24L-2 16Z" fill="#e09f00"/><path d="M14 24l-4 4M8 22l-4 4M2 19l-4 4" stroke="${DARK}" stroke-width="3"/>` +
  `<circle r="4" fill="${DARK}"/></g>`

/** Dump truck facing right, its load is `dumpLoad`. Bounds: x ±78, y from −66 to 0. */
export const dumpTruck = (x: number, y: number, body = '#f4a261', cab = '#e76f51') =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="-74" y="-28" width="150" height="10" fill="${DARK}"/>` +
  `<path d="M-76 -26L-70 -66H30L34 -26Z" fill="${body}"/><path d="M-60 -60v28M-30 -60v28M0 -60v28" stroke="#d9823f" stroke-width="3"/>` +
  `<path d="M40 -26V-62Q40 -68 46 -68H64Q78 -68 78 -54V-26Z" fill="${cab}"/><rect x="50" y="-62" width="20" height="16" rx="2" fill="${GLASS}"/>` +
  [-52, -22, 58].map((w) => `<circle cx="${w}" cy="-13" r="13" fill="${TRACK}"/><circle cx="${w}" cy="-13" r="4.5" fill="#ccc"/>`).join('') +
  `</g>`

/** Heap of earth in a `dumpTruck`, rising `h` over the rim. Bounds: x from −70 to +26, y from −66 − h/2 to −64. */
export const dumpLoad = (x: number, y: number, h: number) =>
  `<path d="M${x - 70} ${y - 64}Q${x - 22} ${y - 64 - h} ${x + 26} ${y - 64}Z" fill="#8a5a3b"/>`

/** Concrete mixer truck facing right; the stripes of its drum are `mixerStripes`. Bounds: x ±80, y from −90 to 0. */
export const mixerTruck = (x: number, y: number, cab = '#3a86ff') =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="-76" y="-28" width="154" height="10" fill="${DARK}"/>` +
  `<ellipse cx="-20" cy="-56" rx="54" ry="30" transform="rotate(-12 -20 -56)" fill="#ced4da"/>` +
  `<path d="M-72 -40L-80 -46L-74 -54" stroke="#8d99a6" stroke-width="5" fill="none"/>` +
  `<path d="M40 -26V-62Q40 -68 46 -68H64Q80 -68 80 -54V-26Z" fill="${cab}"/><rect x="50" y="-62" width="20" height="16" rx="2" fill="${GLASS}"/>` +
  [-52, -22, 58].map((w) => `<circle cx="${w}" cy="-13" r="13" fill="${TRACK}"/><circle cx="${w}" cy="-13" r="4.5" fill="#ccc"/>`).join('') +
  `</g>`

/** Stripes on the drum of a `mixerTruck`. Bounds: x from −52 to +12, y from −82 to −28. */
export const mixerStripes = (x: number, y: number, color = '#fb8500') =>
  `<path d="M${x - 48} ${y - 74}Q${x - 30} ${y - 56} ${x - 40} ${y - 32}M${x - 14} ${y - 82}Q${x + 4} ${y - 60} ${x - 8} ${y - 30}" stroke="${color}" stroke-width="8" fill="none"/>`

/** Bulldozer facing right with its blade; the exhaust is `bulldozerExhaust`. Bounds: x from −62 to +74, y from −72 to 0. */
export const bulldozer = (x: number, y: number, body = '#ffb703') =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="-62" y="-24" width="112" height="24" rx="12" fill="${TRACK}"/>` +
  [-44, -18, 8, 32].map((w) => `<circle cx="${w}" cy="-12" r="7" fill="#6b6f63"/>`).join('') +
  `<rect x="-56" y="-46" width="100" height="22" rx="3" fill="${body}"/>` +
  `<path d="M-50 -46V-72H-8L-2 -46Z" fill="${body}"/><path d="M-44 -66H-12L-8 -50H-44Z" fill="${GLASS}"/>` +
  `<path d="M44 -36L60 -28" stroke="${DARK}" stroke-width="5"/><path d="M58 -50Q74 -26 60 0H70Q80 -26 66 -50Z" fill="#6c757d"/></g>`

/** Exhaust pipe on the hood of a `bulldozer`. Bounds: x from +14 to +26, y from −80 to −46. */
export const bulldozerExhaust = (x: number, y: number) =>
  `<rect x="${x + 16}" y="${y - 76}" width="8" height="30" fill="#55606b"/><rect x="${x + 14}" y="${y - 80}" width="12" height="5" rx="2" fill="${DARK}"/>`

/** Wheelbarrow, handles to the left. Bounds: x from −34 to +26, y from −30 to 0. */
export const wheelbarrow = (x: number, y: number, color = '#2a9d8f') =>
  `<path d="M${x - 34} ${y - 26}L${x - 14} ${y - 18}M${x - 10} ${y - 6}l-6 6" stroke="#6b4f3a" stroke-width="3" fill="none"/>` +
  `<path d="M${x - 16} ${y - 28}H${x + 22}L${x + 12} ${y - 12}H${x - 10}Z" fill="${color}"/>` +
  `<circle cx="${x + 14}" cy="${y - 8}" r="8" fill="${TRACK}"/><circle cx="${x + 14}" cy="${y - 8}" r="3" fill="#ccc"/>`

/** Shovel stuck in the ground, leaning right; (x, y) = tip of the blade. Bounds: x from −6 to +24, y from −58 to +4. */
export const shovel = (x: number, y: number) =>
  `<path d="M${x + 2} ${y - 10}L${x + 18} ${y - 54}" stroke="#a0703f" stroke-width="4"/><path d="M${x + 12} ${y - 56}h12" stroke="#2b2d42" stroke-width="4" stroke-linecap="round"/>` +
  `<path d="M${x - 6} ${y - 14}L${x + 8} ${y - 10}L${x + 4} ${y + 4}L${x - 6} ${y}Z" fill="#8d99a6"/>`

/** Worker's hard hat; (x, y) = bottom center. Bounds: x ±11, y from −10 to 0. */
export const hardHat = (x: number, y: number, color = '#ffb703') =>
  `<path d="M${x - 9} ${y}q0 -10 9 -10q9 0 9 10Z" fill="${color}"/><rect x="${x - 11}" y="${y - 2}" width="22" height="3" rx="1" fill="${color}"/>`

/** Pallet of bricks; (x, y) = bottom center. Bounds: x ±20, y from −24 to 0. */
export const brickPallet = (x: number, y: number) => {
  let bricks = ''
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) bricks += `<rect x="${x - 18 + c * 12 + (r % 2) * 2}" y="${y - 24 + r * 6}" width="11" height="5" fill="#c0504d"/>`
  return `<rect x="${x - 20}" y="${y - 6}" width="40" height="6" fill="#a0703f"/>${bricks}`
}

/** Striped road barrier on two feet. Bounds: x ±30, y from −30 to 0. */
export const barrier = (x: number, y: number) =>
  `<path d="M${x - 24} ${y}V${y - 22}M${x + 24} ${y}V${y - 22}" stroke="#55606b" stroke-width="3"/>` +
  `<rect x="${x - 30}" y="${y - 30}" width="60" height="10" fill="#ffffff"/>` +
  `<path d="M${x - 24} ${y - 30}l-6 10h8l6 -10ZM${x - 4} ${y - 30}l-6 10h8l6 -10ZM${x + 16} ${y - 30}l-6 10h8l6 -10Z" fill="#e63946"/>`

// --- Airport (level 222) ---

/** Airliner parked on its wheels, nose to the left; its fin logo is `finLogo`, the band on its engine `engineBand`. Bounds: x from −200 to +238, y from −152 to 0. */
export const airliner = (x: number, y: number, stripe = '#1d4ed8') => {
  let windows = ''
  for (let w = -132; w <= 146; w += 14) windows += `<circle cx="${w}" cy="-76" r="3" fill="#5f7f99"/>`
  return (
    `<g transform="translate(${x} ${y})">` +
    `<path d="M-160 -50V-12M20 -50V-12M44 -50V-12" stroke="${DARK}" stroke-width="4"/>` +
    [-160, 20, 44].map((w) => `<circle cx="${w}" cy="-9" r="9" fill="${TRACK}"/><circle cx="${w}" cy="-9" r="3" fill="#ccc"/>`).join('') +
    `<path d="M140 -92L190 -152H216L208 -92Z" fill="#f8f9fa" stroke="#ced4da" stroke-width="1.5"/>` +
    `<path d="M-200 -66Q-200 -92 -160 -92H180L214 -78Q220 -70 212 -60L190 -48H-170Q-200 -48 -200 -66Z" fill="#f8f9fa" stroke="#ced4da" stroke-width="1.5"/>` +
    `<path d="M-192 -78L-178 -85H-166V-76H-190Z" fill="#2b3a4a"/>` +
    `<rect x="-196" y="-64" width="392" height="6" fill="${stripe}"/>` +
    windows +
    `<rect x="-154" y="-88" width="12" height="28" rx="2" fill="none" stroke="#adb5bd" stroke-width="2"/>` +
    `<rect x="160" y="-88" width="12" height="26" rx="2" fill="none" stroke="#adb5bd" stroke-width="2"/>` +
    `<path d="M170 -74L232 -70L238 -62H176Z" fill="#ced4da"/>` +
    `<path d="M-50 -56H70L120 -40L100 -38H-30Z" fill="#ced4da"/>` +
    `<rect x="-40" y="-54" width="62" height="24" rx="11" fill="#adb5bd"/><ellipse cx="-38" cy="-42" rx="4" ry="11" fill="#55606b"/></g>`
  )
}

/** Logo on the fin of an `airliner` at (x, y): a disc or a triangle. Bounds: x from +178 to +198, y from −130 to −110. */
export const finLogo = (x: number, y: number, triangle = false, color = '#ffb703') =>
  triangle
    ? `<path d="M${x + 188} ${y - 130}L${x + 198} ${y - 111}H${x + 178}Z" fill="${color}"/>`
    : `<circle cx="${x + 188}" cy="${y - 120}" r="9" fill="${color}"/>`

/** Coloured band on the engine of an `airliner` at (x, y). Bounds: x from 0 to +12, y from −54 to −30. */
export const engineBand = (x: number, y: number, color = '#e63946') => `<rect x="${x}" y="${y - 54}" width="12" height="24" fill="${color}"/>`

/** Stairs truck: a low truck with a flight of steps rising to the left, up to a door sill at (x − 40, y − 58); its rail is `stairsRail`. Bounds: x from −44 to +56, y from −62 to 0. */
export const stairsTruck = (x: number, y: number, body = '#f8f9fa') =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="-20" y="-24" width="76" height="14" rx="3" fill="#ffb703"/><rect x="34" y="-40" width="22" height="18" rx="3" fill="#ffb703"/><rect x="38" y="-36" width="14" height="8" fill="${GLASS}"/>` +
  `<path d="M-44 -58H-30L30 -24H10Z" fill="${body}" stroke="#adb5bd" stroke-width="2"/>` +
  Array.from({ length: 6 }, (_, i) => `<path d="M${-30 + i * 10} ${-52 + i * 5.6}h-10" stroke="#8d99a6" stroke-width="2"/>`).join('') +
  [-6, 40].map((w) => `<circle cx="${w}" cy="-8" r="8" fill="${TRACK}"/>`).join('') +
  `</g>`

/** Hand rail of a `stairsTruck`. Bounds: x from −42 to +32, y from −80 to −24. */
export const stairsRail = (x: number, y: number) =>
  `<path d="M${x - 40} ${y - 78}L${x + 28} ${y - 42}M${x - 40} ${y - 78}V${y - 58}M${x - 6} ${y - 60}V${y - 40}M${x + 28} ${y - 42}V${y - 24}" stroke="#55606b" stroke-width="3" fill="none"/>`

/** Baggage tug facing right; its beacon is `tugBeacon`. Bounds: x from −32 to +32, y from −40 to 0. */
export const baggageTug = (x: number, y: number, body = '#2a9d8f') =>
  `<g transform="translate(${x} ${y})">` +
  `<rect x="-30" y="-24" width="62" height="14" rx="4" fill="${body}"/><path d="M-26 -24V-40H-2V-24" stroke="${DARK}" stroke-width="3" fill="none"/>` +
  `<rect x="-22" y="-32" width="12" height="8" fill="${DARK}"/><path d="M-32 -16h-8" stroke="${DARK}" stroke-width="3"/>` +
  [-16, 18].map((w) => `<circle cx="${w}" cy="-8" r="8" fill="${TRACK}"/><circle cx="${w}" cy="-8" r="3" fill="#ccc"/>`).join('') +
  `</g>`

/** Amber beacon on the roof of a `baggageTug`. Bounds: x from −20 to −8, y from −50 to −40. */
export const tugBeacon = (x: number, y: number) =>
  `<path d="M${x - 20} ${y - 40}q0 -10 6 -10q6 0 6 10Z" fill="#fb8500"/>`

/** Flat baggage cart, 70 wide, its bed at y − 18. Bounds: x ±40, y from −18 to 0. */
export const baggageCart = (x: number, y: number) =>
  `<rect x="${x - 35}" y="${y - 18}" width="70" height="6" fill="#8d99a6"/><path d="M${x - 35} ${y - 15}h-5" stroke="#55606b" stroke-width="3"/>` +
  [-22, 22].map((w) => `<circle cx="${x + w}" cy="${y - 6}" r="6" fill="${TRACK}"/>`).join('')

/** Suitcase standing on its end; (x, y) = bottom center, w × h, turned `deg` about its center. Bounds: radius half its diagonal around the center. */
export const suitcase = (x: number, y: number, w: number, h: number, color: string, deg = 0) =>
  `<g transform="rotate(${deg} ${x} ${y - h / 2})"><rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" rx="3" fill="${color}"/>` +
  `<path d="M${x - 4} ${y - h}v-4h8v4" stroke="#2b2d42" stroke-width="2" fill="none"/><path d="M${x - w / 2 + 3} ${y - h / 2}h${w - 6}" stroke="#ffffff" stroke-opacity="0.5" stroke-width="2"/></g>`

/** "Follow me" car facing right; its roof sign is `followSign`. Bounds: x ±40, y from −36 to 0. */
export const followCar = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M-40 -10q0 -12 10 -12h6l10 -14h24l12 14h8q10 0 10 8v4Z" fill="#ffd23f"/><path d="M-12 -32L-18 -22H18L10 -32Z" fill="${GLASS}"/>` +
  `<rect x="-40" y="-12" width="80" height="6" fill="#2b2d42"/>` +
  [-22, 22].map((w) => `<circle cx="${w}" cy="-6" r="7" fill="${TRACK}"/>`).join('') +
  `</g>`

/** Chequered sign on the roof of a `followCar`. Bounds: x ±14, y from −50 to −36. */
export const followSign = (x: number, y: number) =>
  `<rect x="${x - 14}" y="${y - 50}" width="28" height="12" fill="#ffffff" stroke="#2b2d42" stroke-width="1.5"/>` +
  `<path d="M${x - 14} ${y - 50}h7v6h-7ZM${x} ${y - 50}h7v6h-7ZM${x - 7} ${y - 44}h7v6h-7ZM${x + 7} ${y - 44}h7v6h-7Z" fill="#2b2d42"/><path d="M${x} ${y - 38}v2" stroke="#2b2d42" stroke-width="2"/>`
