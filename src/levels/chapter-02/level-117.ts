// Motion differences: the right duck in the pool bobs faster on picture B; the squirrel flicks its tail only on B.
import { butterfly } from '../chapter-03/shapes.ts'
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level117Redesign } from './level-117-redesign.ts'
import { balloon, cityTree, cloud, coffeeCup, dog, flowerBox, lampHead, lampPost, person, pigeon, scooter, shoppingBag, skateboard, skyline } from './shapes.ts'

/** Small park bench, 44 wide, with `slats` back slats; (x, y) = ground center. Bounds: x ±22, y from −28 to 0. */
const bench = (x: number, y: number, slats: number) => {
  let s = `<rect x="${x - 22}" y="${y - 14}" width="44" height="5" rx="2" fill="#a0703f"/><path d="M${x - 18} ${y - 9}v9M${x + 18} ${y - 9}v9" stroke="#3d4a55" stroke-width="3"/>`
  for (let i = 0; i < slats; i++) s += `<rect x="${x - 22}" y="${y - 28 + (i * 12) / slats}" width="44" height="${8 / slats + 1}" rx="1" fill="#a0703f"/>`
  return s
}

/** Small duck, faces right; (x, y) = waterline. Bounds: x ±13, y from −18 to +2. */
const duck = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-5" rx="12" ry="6" fill="#f4f1e8"/><circle cx="7" cy="-13" r="5" fill="#3f8f5a"/>` +
  `<path d="M11 -13l5 1.5l-5 1.5Z" fill="#ff922b"/><circle cx="8" cy="-14" r="1" fill="#222"/><path d="M-12 -6l-2 -4l6 2Z" fill="#d9d2c5"/></g>`

/** Kite; (x, y) = center. Bounds: x ±16, y ±22. */
const kite = (x: number, y: number) =>
  `<path d="M${x} ${y - 22}L${x + 16} ${y}L${x} ${y + 22}L${x - 16} ${y}Z" fill="#ff006e"/>` +
  `<path d="M${x} ${y - 22}V${y + 22}M${x - 16} ${y}H${x + 16}" stroke="#ffd166" stroke-width="2"/>`

/** Squirrel on a trunk, head up; (x, y) = body center. Tail separate. Bounds: x ±8, y ±14. */
const squirrel = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})" fill="#c0692b"><ellipse rx="6" ry="10"/><circle cy="-11" r="5"/><path d="M-4 -15l1 -5l3 3Z"/><circle cx="2" cy="-12" r="1" fill="#222"/></g>`
const squirrelTail = (x: number, y: number) => `<path d="M${x} ${y}q14 -2 12 -16q-2 -8 -8 -6" stroke="#c0692b" stroke-width="6" stroke-linecap="round" fill="none"/>`

/** Bird perched, faces left; (x, y) = feet. Bounds: x ±11, y from −14 to 0. */
const bird = (x: number, y: number) =>
  `<g transform="translate(${x} ${y}) scale(-1 1)"><ellipse cy="-6" rx="8" ry="5" fill="#3a86ff"/><circle cx="6" cy="-10" r="4" fill="#3a86ff"/>` +
  `<path d="M9 -10l4 1l-4 2Z" fill="#f4a261"/><circle cx="7" cy="-11" r="1" fill="#fff"/></g>`

export default svgLevel({
  id: 117,
  chapter: 'city',
  title: 'fountainPark',
  parTimeSec: 85,
  redesign: level117Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    let backTrees = ''
    for (let x = 10; x < 800; x += 52) backTrees += cityTree(x + rand() * 10, 262, 1 + rand() * 0.3, rand() < 0.5 ? '#4caf6a' : '#3f9a5a')
    let flowers = ''
    for (let i = 0; i < 8; i++) flowers += `<circle cx="${20 + i * 12}" cy="${448 + (i % 2) * 6}" r="5" fill="${['#ff6b8b', '#ffd166', '#b38cff'][i % 3]}"/>`
    for (let i = 0; i < 8; i++) flowers += `<circle cx="${700 + i * 12}" cy="${480 + (i % 2) * 6}" r="5" fill="${['#ff9f43', '#ffffff', '#ff6b8b'][i % 3]}"/>`
    const jets = anim({ type: 'bob', dx: 0, dy: -4, period: 0.8 }, `<path d="M400 290q-30 -30 -40 0M400 290q30 -30 40 0M400 290v-34" stroke="#bde3f2" stroke-width="5" fill="none" stroke-linecap="round"/>`)
    const bobbing = (period: number) => anim({ type: 'bob', dx: 2, dy: -3, period }, duck(452, 384))
    const flick = (moving: boolean) => (moving ? anim({ type: 'sway', angle: 24, pivot: [82, 306], period: 0.9 }, squirrelTail(82, 306)) : squirrelTail(82, 306))

    return (
      `<rect width="800" height="500" fill="#cdeafd"/>` +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 32 }, cloud(560, 60, 0.6)) +
      `<path d="M300 50q5 -6 10 0q5 -6 10 0M330 70q4 -5 8 0q4 -5 8 0" stroke="#3d4a55" stroke-width="2" fill="none"/>` +
      `<path d="M120 92q-10 40 20 70q20 30 10 60" stroke="#3d4a55" stroke-width="1" fill="none"/>` +
      diff(120, 70, 28, kite(120, 70), `<g transform="rotate(20 120 70)">${kite(120, 70)}</g>`) +
      `<path d="M120 92l-6 10l6 6l-6 10" stroke="#ffd166" stroke-width="3" fill="none"/>` +
      skyline(rand, 200, '#b8c4d6') +
      `<rect y="230" width="800" height="270" fill="#8fca68"/>` + backTrees +
      `<ellipse cx="400" cy="400" rx="300" ry="96" fill="#e3cfa0"/><path d="M0 470L160 430M800 470L640 430" stroke="#e3cfa0" stroke-width="40"/>` +
      // Fountain
      `<ellipse cx="400" cy="384" rx="120" ry="30" fill="#b8c4cc"/><ellipse cx="400" cy="380" rx="110" ry="24" fill="#6cc0e0"/>` +
      `<rect x="390" y="300" width="20" height="80" fill="#c9d1da"/><ellipse cx="400" cy="304" rx="46" ry="10" fill="#c9d1da"/><ellipse cx="400" cy="301" rx="40" ry="6" fill="#6cc0e0"/>` +
      jets + `<path d="M356 306q-8 30 -2 66M444 306q8 30 2 66" stroke="#bde3f2" stroke-width="3" stroke-opacity="0.8" fill="none"/>` +
      duck(350, 386) + diff(452, 376, 22, bobbing(1.6), bobbing(0.6)) +
      // Lamps and benches
      lampPost(250, 370) + lampHead(250, 370) + lampPost(550, 370) + lampHead(550, 370) +
      diff(550, 252, 22, '', bird(550, 260)) +
      bench(170, 424, 2) + diff(630, 412, 24, bench(630, 424, 2), bench(630, 424, 3)) +
      // Big tree with a squirrel
      `<rect x="52" y="230" width="28" height="200" rx="8" fill="#8a5a3b"/><circle cx="66" cy="200" r="70" fill="#4caf6a"/><circle cx="20" cy="240" r="40" fill="#3f9a5a"/><circle cx="110" cy="240" r="40" fill="#5fae4b"/>` +
      squirrel(74, 300) + diff(86, 296, 22, flick(false), flick(true)) +
      // People
      person(120, 470, '#e63946') + `<path d="M126 444l18 20" stroke="#3d4a55" stroke-width="1.5"/>` +
      diff(155, 470, 30, dog(150, 486, '#c48a5a'), dog(160, 486, '#c48a5a')) +
      `<rect x="296" y="440" width="54" height="34" rx="4" fill="#f4f4f4"/><path d="M296 452h54" stroke="#ff6b8b" stroke-width="4"/><circle cx="306" cy="478" r="6" fill="#3d3d3d"/><circle cx="340" cy="478" r="6" fill="#3d3d3d"/>` +
      `<path d="M323 440v-34" stroke="#3d4a55" stroke-width="2"/><path d="M293 408q30 -24 60 0Z" fill="#ff6b8b"/><path d="M308 408q15 -18 30 0" fill="#fff"/>` +
      person(370, 470, '#ffb703') +
      pigeon(388, 482) + diff(426, 476, 22, pigeon(426, 486, true), '') + pigeon(460, 484, false, '#a3aab3') +
      diff(240, 478, 22, `<circle cx="240" cy="480" r="9" fill="#3a86ff"/><path d="M231 480h18" stroke="#fff" stroke-width="2"/>`, `<circle cx="240" cy="478" r="11" fill="#3a86ff"/><path d="M229 478h22" stroke="#fff" stroke-width="2"/>`) +
      person(706, 444, '#8ac926', true, '#c68b5e', '#2b2b2b') +
      diff(716, 372, 22, balloon(716, 372, '#ff006e'), balloon(716, 372, '#f0388f')) +
      balloon(690, 380, '#ffd166') +
      person(560, 470, '#3a86ff') + person(590, 476, '#ff006e', true) +
      flowerBox(200, 486, '#ff6b8b') + flowers +
      skateboard(510, 490) +
      scooter(660, 472) +
      shoppingBag(198, 422) +
      butterfly(310, 330) +
      coffeeCup(158, 412) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['cloud', 481, 56],
        ['birds', 720, 69],
        ['ladybug', 645, 287],
        ['mushroom', 178, 325],
        ['chick', 287, 289],
      ])
    )
  },
})
