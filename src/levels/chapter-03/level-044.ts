// Motion differences: the snail crawls faster on picture B; the frog hops only on B; the chimney smoke rises faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { acorn, bluebells, fern, floor, frog, hedgehog, lantern, leafPile, mushroom, oak, pine, pineCone, rock } from './shapes.ts'

/** Fly agaric with `spots`; (x, y) = bottom of the stem. Bounds: x ±20, y from −44 to 0. */
const agaric = (x: number, y: number, spots: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-7" y="-22" width="14" height="22" rx="4" fill="#fff3d6"/><rect x="-10" y="-14" width="20" height="4" rx="2" fill="#fff3d6"/>` +
  `<path d="M-20 -20q20 -32 40 0Z" fill="#e63946"/>` +
  [[-10, -26], [0, -34], [10, -26], [-4, -22], [6, -30]].slice(0, spots).map(([dx, dy]) => `<circle cx="${dx}" cy="${dy}" r="3" fill="#fff"/>`).join('') +
  `</g>`

/** Snail, faces right; (x, y) = bottom center. Bounds: x ±16, y from −22 to 0. */
const snail = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-14 0q-2 -8 8 -8h20q4 0 2 8Z" fill="#c9a06c"/><circle cx="-2" cy="-12" r="10" fill="#e9a23b"/>` +
  `<circle cx="-2" cy="-12" r="5" fill="none" stroke="#c0392b" stroke-width="2"/><path d="M12 -8l2 -10M16 -8l4 -8" stroke="#c9a06c" stroke-width="2"/><circle cx="14" cy="-19" r="1.8" fill="#222"/><circle cx="20" cy="-17" r="1.8" fill="#222"/></g>`

/** Gnome house in a mushroom; (x, y) = bottom center. The door is separate. Bounds: x ±46, y from −110 to 0. */
const gnomeHouse = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><rect x="-26" y="-70" width="52" height="70" rx="8" fill="#fff3d6"/><path d="M-46 -64q46 -60 92 0Z" fill="#e63946"/>` +
  `<circle cx="-20" cy="-84" r="6" fill="#fff"/><circle cx="8" cy="-96" r="7" fill="#fff"/><circle cx="26" cy="-78" r="5" fill="#fff"/>` +
  `<circle cx="12" cy="-44" r="7" fill="#bde3f2" stroke="#6b4f3a" stroke-width="2"/><rect x="-6" y="-110" width="10" height="28" fill="#8d99ae"/></g>`
/** Gnome house door; (x, y) = house bottom center. Bounds: x from −22 to −2, y from −34 to 0. */
const gnomeDoor = (x: number, y: number, color: string) =>
  `<path d="M${x - 22} ${y}v-24q10 -12 20 0v24Z" fill="${color}"/><circle cx="${x - 6}" cy="${y - 12}" r="1.8" fill="#ffd166"/>`

/** Smoke over the chimney top at (x, y). Bounds: x from −10 to +12, y from −36 to +4. */
const smoke = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y - 4}" r="6" fill="#e3e3ec"/><circle cx="${x + 4}" cy="${y - 16}" r="7" fill="#ededf3"/><circle cx="${x - 1}" cy="${y - 28}" r="8" fill="#f4f4f8"/>`

/** Basket with `n` mushrooms; (x, y) = bottom center. Bounds: x ±24, y from −36 to 0. */
const basket = (x: number, y: number, n: number) =>
  [[-12, -22], [2, -26], [14, -22]].slice(0, n).map(([dx, dy]) => mushroom(x + dx, y + dy, '#c9a06c', 0.6)).join('') +
  `<path d="M${x - 24} ${y - 20}h48l-6 20h-36Z" fill="#c68b4e"/><path d="M${x - 20} ${y - 12}h40M${x - 18} ${y - 5}h36" stroke="#9c6a37" stroke-width="2"/>`

export default svgLevel({
  id: 44,
  chapter: 'forest',
  title: 'mushrooms',
  parTimeSec: 120,
  scene: ({ diff, anim, rand, extra }) => {
    const crawling = (period: number) => anim({ id: 'snail', type: 'path', points: [[0, 0], [60, 0]], period }, snail(560, 480))
    const sitting = frog(180, 440)
    const puffing = (period: number) => anim({ id: 'smoke', type: 'path', points: [[0, 0], [0, -14]], period }, smoke(399, 340))

    return (
      `<rect width="800" height="500" fill="#2f5e3a"/>` +
      `<rect width="800" height="220" fill="#3f7a4a"/>` +
      `<g fill="#2f5e3a"><ellipse cx="80" cy="30" rx="140" ry="80"/><ellipse cx="330" cy="10" rx="160" ry="90"/><ellipse cx="580" cy="40" rx="150" ry="80"/><ellipse cx="790" cy="20" rx="130" ry="90"/></g>` +
      pine(420, 320, 1.8, '#2b6b45') +
      pine(560, 310, 1.5, '#2b6b45') +
      pine(80, 300, 1.4, '#256b47') +
      pine(220, 290, 1.1, '#256b47') +
      oak(640, 300, 1.3, '#3f9a5a') +
      pine(760, 300, 1.2, '#256b47') +
      `<rect y="300" width="800" height="200" fill="#5f8f4e"/><path d="M0 320Q400 280 800 320V330H0Z" fill="#5f8f4e"/>` +
      // Gnome house
      diff(401, 322, 30, puffing(5), puffing(2), 'smoke') +
      gnomeHouse(400, 450) +
      diff(388, 434, 20, gnomeDoor(400, 450, '#3a86ff'), gnomeDoor(400, 450, '#e63946')) +
      // Mushrooms
      diff(100, 440, 26, agaric(100, 462, 5), agaric(100, 462, 3)) +
      agaric(150, 480, 4) +
      diff(690, 428, 32, mushroom(690, 450, '#e9a23b', 1.5), mushroom(690, 450, '#8338ec', 1.5)) +
      mushroom(730, 470, '#e9a23b', 0.9) +
      mushroom(300, 400, '#a0703f', 0.8) +
      mushroom(500, 390, '#e63946', 0.7) +
      diff(180, 430, 20, sitting, anim({ id: 'frog', type: 'bob', dx: 0, dy: 6, period: 0.9 }, sitting), 'frog') +
      diff(270, 466, 22, hedgehog(270, 480), hedgehog(270, 480, true)) +
      diff(562, 469, 24, crawling(10), crawling(5), 'snail') +
      diff(600, 410, 26, basket(600, 426, 3), basket(600, 426, 2)) +
      rock(40, 495, 1.1, '#6f8f6a') +
      fern(760, 480) +
      fern(330, 490) +
      floor(rand, 330, 420, 10) +
      lantern(460, 452) +
      acorn(215, 432) +
      pineCone(380, 488) +
      leafPile(510, 432) +
      bluebells(700, 352) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['bluebells', 286, 331],
        ['hedgehog', 106, 361],
        ['acorn', 701, 320],
        ['wildStrawberry', 542, 361],
        ['leafPile', 324, 439],
        ['butterfly', 487, 464],
        ['squirrel', 203, 372],
        ['feather', 636, 356],
        ['frog', 475, 360],
        ['pineCone', 536, 419],
      ])
    )
  },
})
