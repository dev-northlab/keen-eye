// Motion differences: a maple leaf swings on its twig only on picture B; the squirrel flicks its tail faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level121Redesign } from './level-121-redesign.ts'
import { stones } from '../shapes.ts'
import { anthill, deer, feather, fox, hedgehog, mushroom, oak, pineCone, stump, trailSign } from './shapes.ts'

/** Maple-ish leaf; (x, y) = center, `turn` degrees. Bounds: radius 8. */
const leaf = (x: number, y: number, color: string, turn = 0) =>
  `<path d="M${x} ${y - 8}l3 5l5 -1l-2 5l3 3l-6 1l-1 5h-4l-1 -5l-6 -1l3 -3l-2 -5l5 1Z" fill="${color}" transform="rotate(${turn} ${x} ${y})"/>`

/** Birch trunk from (x, y) up by h, with dark marks. */
const birch = (x: number, y: number, h: number) => {
  let s = `<rect x="${x - 9}" y="${y - h}" width="18" height="${h}" fill="#f4f1e8"/>`
  for (let k = 20; k < h; k += 34) s += `<path d="M${x - 9} ${y - k}h${8 + (k % 3) * 2}" stroke="#2b2b2b" stroke-width="3"/>`
  return s
}

/** Squirrel clinging to a trunk, head up; (x, y) = body center. Tail separate. Bounds: x ±8, y ±16. */
const climber = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#c0692b"><ellipse rx="7" ry="11"/><circle cy="-12" r="6"/><path d="M-4 -17l1 -5l3 3ZM4 -17l-1 -5l-3 3Z"/>` +
  `<circle cx="2" cy="-13" r="1.2" fill="#222"/><ellipse cx="0" cy="4" rx="3" ry="4" fill="#f2d29b"/></g>`
const climberTail = (x: number, y: number) => `<path d="M${x} ${y}q16 -2 14 -18q-2 -8 -9 -6" stroke="#c0692b" stroke-width="7" stroke-linecap="round" fill="none"/>`

const acorn = (x: number, y: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="4" ry="5" fill="#b5803f"/><path d="M${x - 5} ${y - 3}q5 -6 10 0Z" fill="#6b4a2a"/><path d="M${x} ${y - 6}v-3" stroke="#6b4a2a" stroke-width="1.5"/>`

/** Painted trail marker on a trunk; (x, y) = center. Bounds: x ±10, y ±8. */
const marker = (x: number, y: number) =>
  `<rect x="${x - 10}" y="${y - 7}" width="20" height="14" fill="#f4f1e8" stroke="#8a5a3b" stroke-width="1.5"/><rect x="${x - 10}" y="${y - 2}" width="20" height="5" fill="#e63946"/>`

/** Bracket fungus on a trunk side; (x, y) = attach point, width w. */
const fungus = (x: number, y: number, w: number) =>
  `<path d="M${x} ${y - w * 0.3}q${w} -2 ${w} ${w * 0.3}q-${w * 0.5} ${w * 0.2} -${w} 0Z" fill="#d9a05b"/><path d="M${x + 2} ${y - 1}q${w * 0.4} -${w * 0.1} ${w * 0.8} 0" stroke="#b07a3f" stroke-width="1.5" fill="none"/>`

export default svgLevel({
  id: 121,
  chapter: 'forest',
  title: 'autumnGlade',
  parTimeSec: 115,
  redesign: level121Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    const autumn = ['#e07a2c', '#d9482b', '#f2b134', '#c9622c', '#e8a33c']
    let backTrees = ''
    for (let x = -10; x < 820; x += 46) backTrees += oak(x + rand() * 12, 268, 1 + rand() * 0.4, autumn[Math.floor(rand() * autumn.length)])
    let scatter = ''
    for (let i = 0; i < 70; i++) {
      const x = rand() * 800
      const y = 300 + rand() * 196
      const c = autumn[Math.floor(rand() * autumn.length)]
      const t = Math.floor(rand() * 360)
      if (Math.hypot(x - 172, y - 452) > 28 && Math.hypot(x - 440, y - 470) > 26 && Math.hypot(x - 560, y - 452) > 34 && Math.hypot(x - 330, y - 450) > 24)
        scatter += leaf(x, y, c, t)
    }
    let falling = ''
    for (const [x, y, p] of [[260, 120, 7], [480, 80, 9], [720, 140, 8], [90, 260, 10]])
      falling += anim({ type: 'sway', angle: 24, pivot: [x, y - 50], period: p / 2 }, leaf(x, y, '#e8a33c', 30))
    let pile = ''
    for (let i = 0; i < 14; i++) pile += leaf(120 + (i % 7) * 14, 466 - Math.floor(i / 7) * 10 + (i % 2) * 3, autumn[i % 5], i * 37)
    const swinging = (moving: boolean) =>
      moving ? anim({ type: 'sway', angle: 22, pivot: [212, 218], period: 1.3 }, `<path d="M212 218v8" stroke="#6b4a2a" stroke-width="1.5"/>` + leaf(212, 234, '#d9482b')) : `<path d="M212 218v8" stroke="#6b4a2a" stroke-width="1.5"/>` + leaf(212, 234, '#d9482b')
    const flick = (period: number) => anim({ type: 'sway', angle: 22, pivot: [656, 312], period }, climberTail(656, 312))

    return (
      `<rect width="800" height="500" fill="#f6e2b8"/>` +
      `<path d="M300 60q5 -6 10 0q5 -6 10 0M326 72q5 -6 10 0q5 -6 10 0M352 84q5 -6 10 0q5 -6 10 0M278 72q5 -6 10 0q5 -6 10 0" stroke="#5a4a3a" stroke-width="2" fill="none"/>` +
      `<path d="M0 220Q200 160 400 200T800 180V300H0Z" fill="#d9a066"/>` + backTrees +
      `<rect y="268" width="800" height="232" fill="#c9b45a"/><path d="M0 268Q400 300 800 268" fill="#b9a24a"/>` +
      // Big maple on the left
      `<rect x="86" y="160" width="30" height="300" rx="8" fill="#7a4e33"/><path d="M110 230q50 -20 100 -12" stroke="#7a4e33" stroke-width="7" fill="none"/>` +
      `<circle cx="60" cy="120" r="70" fill="#d9482b"/><circle cx="150" cy="96" r="64" fill="#e07a2c"/><circle cx="100" cy="40" r="60" fill="#f2b134"/>` +
      diff(212, 232, 24, swinging(false), swinging(true)) +
      // Birches with a squirrel, a marker and a fungus
      birch(650, 470, 380) + birch(710, 476, 420) + birch(770, 466, 360) +
      `<circle cx="680" cy="80" r="50" fill="#f2c94c"/><circle cx="760" cy="110" r="46" fill="#f2b134"/>` +
      climber(650, 300) + diff(662, 300, 24, flick(1.8), flick(0.6)) +
      diff(710, 370, 22, marker(710, 370), `<g transform="rotate(18 710 370)">${marker(710, 370)}</g>`) +
      diff(728, 250, 22, fungus(719, 252, 14), fungus(719, 252, 18)) +
      // Animals on the glade
      scatter +
      deer(440, 360, false, '#c48a5a') + fox(270, 400, true) +
      `<ellipse cx="180" cy="470" rx="80" ry="16" fill="#d9822c"/>` + pile +
      diff(172, 452, 22, leaf(172, 452, '#e07a2c', 15), leaf(172, 452, '#d4552c', 15)) +
      stump(330, 470) + acorn(320, 450) + acorn(332, 449) + diff(344, 448, 22, acorn(344, 450), '') +
      mushroom(400, 486, '#e63946', 0.8) + diff(440, 474, 22, '', mushroom(440, 486, '#c9622c', 0.7)) +
      diff(560, 452, 28, hedgehog(552, 466), hedgehog(566, 466)) +
      mushroom(610, 488, '#f2b134', 0.6) + mushroom(626, 490, '#f2b134', 0.5) +
      stones(380, 450) +
      pineCone(40, 490) +
      anthill(497, 490) +
      feather(330, 300) +
      trailSign(585, 348) +
      falling +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['squirrel', 147, 370],
        ['feather', 338, 331],
        ['leafPile', 490, 341],
        ['birds', 573, 61],
        ['cloud', 420, 102],
      ])
    )
  },
})
