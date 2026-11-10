// Motion differences: the frog hops only on picture B; the spider on its thread bobs faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level122Redesign } from './level-122-redesign.ts'
import { acorn, anthill, feather, fern, frog, lantern, mushroom, pineCone } from './shapes.ts'

/** Fly agaric; (x, y) = stem foot; `dots` white dots on the cap. Bounds: x ±16, y from −34 to 0. */
const agaric = (x: number, y: number, cap = '#d62828', dots = 4) => {
  const spots: [number, number][] = [[-8, -24], [0, -29], [8, -24], [-2, -20], [4, -25]]
  let s = `<rect x="${x - 4}" y="${y - 18}" width="8" height="18" rx="3" fill="#f4f1e8"/><path d="M${x - 7} ${y - 12}h14" stroke="#e9e3d0" stroke-width="3"/>` + `<path d="M${x - 16} ${y - 16}q16 -30 32 0Z" fill="${cap}"/>`
  for (let i = 0; i < dots; i++) s += `<circle cx="${x + spots[i][0]}" cy="${y + spots[i][1]}" r="3" fill="#fff"/>`
  return s
}

/** Porcini; (x, y) = stem foot, cap radius r. */
const porcini = (x: number, y: number, r: number) =>
  `<path d="M${x - 8} ${y}q-2 -14 2 -20h12q4 6 2 20Z" fill="#efe2c4"/><path d="M${x - r} ${y - 18}q${r} ${-r * 1.4} ${r * 2} 0Z" fill="#8a4f2a"/>`

/** Chanterelle; (x, y) = foot. Bounds: x ±8, y from −14 to 0. */
const chanterelle = (x: number, y: number) => `<path d="M${x - 2} ${y}l-6 -12q8 -4 16 0l-6 12Z" fill="#f2a93b"/>`

/** Beetle, faces right; (x, y) = center. Bounds: x ±10, y ±7. */
const beetle = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-6 -6l-3 -2M0 -6v-3M6 -6l3 -2M-6 6l-3 2M0 6v3M6 6l3 2" stroke="#222" stroke-width="1.5"/>` +
  `<ellipse rx="8" ry="6" fill="#2a6f5a"/><path d="M-1 -6v12" stroke="#1d4f40" stroke-width="1.5"/><circle cx="9" r="3" fill="#222"/></g>`

/** Snail, faces left; (x, y) = foot. Bounds: x from −14 to +12, y from −16 to 0. */
const snail = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-14 0q0 -6 6 -6h18v6Z" fill="#c9b79c"/><path d="M-12 -6l-2 -8M-9 -6l1 -8" stroke="#c9b79c" stroke-width="1.5"/>` +
  `<circle cx="4" cy="-8" r="8" fill="#b5803f"/><path d="M4 -8m-4 0a4 4 0 1 1 4 4" stroke="#8a5a33" stroke-width="1.5" fill="none"/></g>`

/** Spider on its thread end at (x, y). Bounds: x ±8, y ±6. */
const spider = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-7 -4l3 2M-8 0h4M-7 4l3 -2M7 -4l-3 2M8 0h-4M7 4l-3 -2" stroke="#222" stroke-width="1.5"/><circle r="4" fill="#222"/></g>`

export default svgLevel({
  id: 122,
  chapter: 'forest',
  title: 'mushroomHollow',
  parTimeSec: 115,
  redesign: level122Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let trunks = ''
    for (const [x, w, c] of [[90, 60, '#4a3426'], [300, 34, '#5a4030'], [470, 40, '#4f3829'], [620, 30, '#5a4030'], [760, 54, '#4a3426']] as const)
      trunks += `<rect x="${x - w / 2}" y="0" width="${w}" height="380" fill="${c}"/>`
    let moss = ''
    for (let i = 0; i < 60; i++) moss += `<circle cx="${(rand() * 800).toFixed(1)}" cy="${(360 + rand() * 140).toFixed(1)}" r="${(3 + rand() * 5).toFixed(1)}" fill="${rand() < 0.5 ? '#6f9e52' : '#4f7d3c'}"/>`
    let tiny = ''
    for (let i = 0; i < 16; i++) {
      const x = 20 + rand() * 760
      const y = 410 + rand() * 80
      if ([[250, 440], [600, 430], [520, 480], [150, 470], [700, 470], [340, 470]].every(([zx, zy]) => Math.hypot(x - zx, y - zy) > 34))
        tiny += `<rect x="${x - 1}" y="${y - 6}" width="2" height="6" fill="#f4f1e8"/><circle cx="${x}" cy="${y - 7}" r="3" fill="#f4f1e8"/>`
    }
    const spinning = (period: number) => anim({ type: 'bob', dx: 0, dy: 6, period }, spider(560, 234))
    const hop = (moving: boolean) => (moving ? anim({ type: 'bob', dx: 0, dy: -8, period: 1.4 }, frog(340, 484)) : frog(340, 484))

    return (
      `<rect width="800" height="500" fill="#2f4a3a"/>` +
      `<path d="M180 0L120 380H260ZM520 0L480 380H600Z" fill="#f6f1c8" fill-opacity="0.08"/>` +
      trunks +
      [[40, 20, 70], [180, 0, 80], [330, 30, 70], [470, 0, 80], [640, 20, 76], [780, 10, 70]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#24402e"/>`).join('') +
      `<path d="M240 40q-6 60 4 120M260 30q4 50 -4 90M700 60q-8 50 2 110" stroke="#4f7d3c" stroke-width="4" fill="none"/>` +
      `<ellipse cx="300" cy="200" rx="7" ry="10" fill="#2b1d14"/><ellipse cx="760" cy="230" rx="9" ry="12" fill="#2b1d14"/>` +
      `<g transform="translate(300 196)"><circle r="5" fill="#8d6e53"/><circle cx="-2" cy="-1" r="1.5" fill="#fff"/><circle cx="2" cy="-1" r="1.5" fill="#fff"/></g>` +
      `<path d="M610 250q10 -8 20 -2q-6 8 -20 2ZM626 300q12 -6 18 2q-8 6 -18 -2Z" fill="#d9a05b"/>` +
      `<path d="M500 150Q560 140 640 152" stroke="#4f3829" stroke-width="7" fill="none"/>` +
      `<path d="M560 150V240" stroke="#e9e3d0" stroke-width="1"/>` + diff(560, 236, 22, spinning(2.4), spinning(1)) +
      `<path d="M0 370Q200 330 400 360T800 350V500H0Z" fill="#5d8a4a"/>` + moss +
      // Big root with a fairy door
      `<path d="M30 400q30 -60 60 -60q30 0 60 60Z" fill="#4a3426"/><path d="M76 400v-24a14 14 0 0 1 28 0v24Z" fill="#c0573f"/><circle cx="98" cy="388" r="2" fill="#f2c14e"/>` +
      // Mossy log with the snail
      `<rect x="300" y="360" width="220" height="40" rx="20" fill="#7a5038"/><ellipse cx="510" cy="380" rx="12" ry="20" fill="#c9a06c"/>` +
      `<path d="M310 362q60 -10 120 0q40 4 80 -2" stroke="#6f9e52" stroke-width="8" fill="none"/>` +
      diff(420, 352, 22, '', snail(420, 362)) +
      fern(200, 420) + fern(560, 410, '#4f8f50') + fern(780, 430) + fern(30, 470, '#4f8f50') +
      `<path d="M540 380l40 -40M560 380l20 -40M560 360h30" stroke="#e9e3d0" stroke-width="0.8" stroke-opacity="0.6"/>` +
      tiny +
      // Mushrooms
      agaric(210, 470) + diff(252, 440, 24, agaric(252, 456, '#d62828'), agaric(252, 456, '#e0502a')) + agaric(286, 482, '#d62828', 3) +
      diff(150, 466, 26, mushroom(150, 484, '#b5803f'), `<g transform="rotate(-16 150 484)">${mushroom(150, 484, '#b5803f')}</g>`) +
      mushroom(110, 492, '#b5803f', 0.7) +
      agaric(640, 454) + diff(600, 432, 24, agaric(600, 448), agaric(600, 448, '#d62828', 2)) +
      porcini(660, 492, 14) + diff(704, 468, 26, porcini(704, 486, 15), porcini(704, 486, 18)) + porcini(750, 490, 12) +
      chanterelle(380, 440) + chanterelle(396, 444) + chanterelle(470, 448) + chanterelle(486, 452) +
      diff(340, 470, 24, hop(false), hop(true)) +
      diff(520, 472, 24, beetle(514, 474), beetle(526, 474)) +
      `<path d="M0 0h800v10H0Z" fill="#26392d"/>` +
      lantern(168, 402) +
      anthill(445, 486) +
      acorn(566, 480) +
      feather(470, 418) +
      pineCone(720, 408) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['frog', 655, 399],
        ['mushroom', 433, 450],
        ['pineCone', 208, 366],
        ['bluebells', 84, 457],
        ['acorn', 741, 412],
      ])
    )
  },
})
