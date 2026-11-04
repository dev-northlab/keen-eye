// Motion differences: the woodpecker pecks faster on picture B; the beetle crawls the other way round on B; the spider bobs only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { acorn, anthill, bird, bluebells, floor, leafPile, mushroom, pine, pineCone, squirrel } from './shapes.ts'

/** Woodpecker clinging to the trunk, faces left; (x, y) = feet. Bounds: x ±14, y from −30 to +2. */
const woodpecker = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cx="2" cy="-12" rx="8" ry="12" fill="#2b2b3a"/><path d="M-2 -8l10 4l-10 4Z" fill="#fff"/>` +
  `<circle cx="-4" cy="-24" r="6" fill="#2b2b3a"/><path d="M-6 -30l4 -6l4 6Z" fill="#e63946"/><path d="M-10 -24l-8 2l8 2Z" fill="#8d99ae"/><circle cx="-6" cy="-25" r="1.2" fill="#fff"/></g>`

/** Beetle, faces right; (x, y) = bottom center. Bounds: x ±9, y from −10 to 0. */
const beetle = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><ellipse cy="-5" rx="8" ry="5" fill="#e63946"/><path d="M0 -10v10" stroke="#222" stroke-width="1.5"/><circle cx="7" cy="-5" r="3" fill="#222"/><circle cx="-3" cy="-6" r="1.5" fill="#222"/><circle cx="3" cy="-3" r="1.5" fill="#222"/></g>`

/** Bracket fungi, `n` shelves growing to the right of (x, y) (to the left with `flip`). Bounds: x from −2 to +22, y from −6 to +22. */
const fungi = (x: number, y: number, n: number, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">` +
  [0, 12, 24].slice(0, n).map((dy) => `<path d="M0 ${dy}q12 -8 22 0q-10 6 -22 0Z" fill="#e9a23b"/><path d="M0 ${dy}q12 -8 22 0" stroke="#c0392b" stroke-width="2" fill="none"/>`).join('') +
  `</g>`

/** Leaf cluster; (x, y) = center. Bounds: x ±22, y ±14. */
const leaves = (x: number, y: number, color: string) =>
  `<g transform="translate(${x} ${y})" fill="${color}"><ellipse cx="-12" cy="-4" rx="10" ry="6" transform="rotate(-30 -12 -4)"/><ellipse cx="10" cy="-6" rx="10" ry="6" transform="rotate(25 10 -6)"/><ellipse cx="0" cy="6" rx="10" ry="6"/></g>`

/** Nut; (x, y) = bottom center. Bounds: x ±6, y from −12 to 0. */
const nut = (x: number, y: number) => `<ellipse cx="${x}" cy="${y - 5}" rx="5" ry="5" fill="#c9a06c"/><path d="M${x - 6} ${y - 8}h12l-2 -4h-8Z" fill="#8a5a3b"/>`

/** Spider on a thread from (x, y). Bounds: x ±8, y from 0 to +30. */
const spider = (x: number, y: number) =>
  `<path d="M${x} ${y}v22" stroke="#555" stroke-width="1"/><circle cx="${x}" cy="${y + 24}" r="5" fill="#2b2b3a"/><path d="M${x - 8} ${y + 20}l8 4l8 -4M${x - 8} ${y + 28}l8 -4l8 4" stroke="#2b2b3a" stroke-width="1.5" fill="none"/>`

export default svgLevel({
  id: 56,
  chapter: 'forest',
  title: 'woodpecker',
  parTimeSec: 120,
  scene: ({ diff, anim, rand, extra }) => {
    let chips = ''
    for (let i = 0; i < 6; i++) chips += `<rect x="${410 + rand() * 30}" y="${200 + rand() * 60}" width="4" height="3" fill="#c9a06c"/>`
    const pecking = (period: number) => anim({ id: 'woodpecker', type: 'bob', dx: 5, dy: 0, period }, woodpecker(450, 220))
    const crawling = (reverse: boolean) =>
      anim({ id: 'beetle', type: 'path', points: [[0, 0], [120, 0]], flipX: 520, period: 10, reverse }, beetle(520, 480))
    const dangling = spider(620, 300)

    return (
      `<rect width="800" height="500" fill="#a9d3a0"/>` +
      `<rect width="800" height="300" fill="#bfe6f7"/><path d="M0 300Q400 260 800 300V320H0Z" fill="#a9d3a0"/>` +
      pine(80, 320, 1.6, '#3b9467') +
      pine(720, 320, 1.8, '#3b9467') +
      pine(200, 310, 1, '#7fb88a') +
      pine(620, 300, 0.9, '#7fb88a') +
      // Big trunk
      `<rect x="340" y="0" width="120" height="500" fill="#8a5a3b"/><path d="M360 0v500M440 0v500" stroke="#6b4f3a" stroke-width="6"/>` +
      `<path d="M380 60q10 40 0 80M420 300q-10 40 0 80" stroke="#6b4f3a" stroke-width="4" fill="none"/>` +
      `<path d="M340 120h-80M340 120l-40 -30" stroke="#8a5a3b" stroke-width="14" stroke-linecap="round"/><path d="M460 160h90M460 160l40 -24" stroke="#8a5a3b" stroke-width="14" stroke-linecap="round"/>` +
      diff(250, 100, 26, leaves(250, 100, '#4caf6a'), leaves(250, 100, '#e9a23b')) +
      leaves(300, 80, '#4caf6a') +
      leaves(560, 150, '#4caf6a') +
      leaves(520, 120, '#5fae4b') +
      diff(530, 170, 18, bird(530, 180, '#3a86ff'), bird(530, 180, '#ffb703')) +
      // Hole with a squirrel
      `<ellipse cx="400" cy="320" rx="22" ry="28" fill="#2b2b2b"/>` +
      diff(400, 328, 22, squirrel(400, 346, false, '#c0392b'), '') +
      chips +
      diff(450, 206, 24, pecking(0.6), pecking(0.25), 'woodpecker') +
      diff(466, 392, 26, fungi(458, 384, 3), fungi(458, 384, 2)) +
      fungi(342, 420, 2, true) +
      diff(620, 316, 22, dangling, anim({ id: 'spider', type: 'bob', dx: 0, dy: 6, period: 1.2 }, dangling), 'spider') +
      // Ground
      `<rect y="440" width="800" height="60" fill="#8fca68"/>` +
      mushroom(300, 480, '#e63946') +
      diff(120, 470, 18, '', nut(120, 476)) +
      nut(150, 486) +
      diff(520, 475, 18, crawling(false), crawling(true), 'beetle') +
      floor(rand, 450, 490, 8) +
      pineCone(50, 485) +
      acorn(230, 480) +
      bluebells(340, 480) +
      leafPile(470, 480) +
      anthill(730, 482) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['feather', 137, 310],
        ['rabbit', 713, 394],
        ['frog', 317, 311],
        ['anthill', 521, 340],
        ['mushroom', 273, 433],
        ['fern', 82, 415],
        ['pineCone', 451, 457],
        ['cloud', 154, 68],
        ['birds', 674, 60],
        ['butterfly', 490, 76],
      ])
    )
  },
})
