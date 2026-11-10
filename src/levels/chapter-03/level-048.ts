// Motion differences: the fish jumps faster on picture B; the bird flies the other way round on B; the mist bobs only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level048Redesign } from './level-048-redesign.ts'
import { acorn, anthill, bear, bluebells, fern, floor, pine, pineCone, rock, trailSign } from './shapes.ts'
import { person } from '../chapter-02/shapes.ts'

/** Short rainbow; (x, y) = base center. Bounds: x ±40, y from −30 to +4. */
const rainbow = (x: number, y: number) =>
  ['#e63946', '#ffb703', '#8ac926', '#3a86ff'].map((c, i) => `<path d="M${x - 40 + i * 6} ${y}a${40 - i * 6} ${30 - i * 5} 0 0 1 ${80 - i * 12} 0" fill="none" stroke="${c}" stroke-width="5"/>`).join('')

/** Leaping fish; (x, y) = center. Bounds: x ±14, y ±10. */
const fish = (x: number, y: number) =>
  `<g transform="translate(${x} ${y}) rotate(-40)"><ellipse rx="10" ry="5" fill="#ff9f43"/><path d="M-8 0l-7 -5v10Z" fill="#ff9f43"/><circle cx="6" cy="-1" r="1.2" fill="#222"/></g>`

/** Flying bird, faces right; (x, y) = body center. Bounds: x ±16, y from −8 to +6. */
const flier = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-16 -2q8 -8 16 0q8 -8 16 0" stroke="#2b2b3a" stroke-width="3" fill="none"/><ellipse rx="6" ry="4" fill="#2b2b3a"/><path d="M6 -1l5 1l-5 2Z" fill="#f4a261"/></g>`

/** Mist puffs; (x, y) = center. Bounds: x ±22, y ±10. */
const mist = (x: number, y: number) =>
  `<g fill="#fff" fill-opacity="0.7"><circle cx="${x - 12}" cy="${y + 2}" r="8"/><circle cx="${x}" cy="${y - 2}" r="10"/><circle cx="${x + 13}" cy="${y + 3}" r="7"/></g>`

/** Backpack on the hiker at (x, y) = feet, facing right. Bounds: x from −22 to −10, y from −48 to −28. */
const backpack = (x: number, y: number, color: string) => `<rect x="${x - 22}" y="${y - 48}" width="12" height="20" rx="4" fill="${color}"/>`

/** Rail of the log bridge from x0 to x1 at y. Bounds: x from x0 − 2 to x1 + 2, y from −22 to 0. */
const rail = (x0: number, x1: number, y: number) =>
  `<path d="M${x0} ${y - 20}H${x1}" stroke="#8a5a3b" stroke-width="4"/><path d="M${x0 + 6} ${y}v-20M${(x0 + x1) / 2} ${y}v-20M${x1 - 6} ${y}v-20" stroke="#8a5a3b" stroke-width="3"/>`

export default svgLevel({
  id: 48,
  chapter: 'forest',
  title: 'waterfall',
  parTimeSec: 120,
  redesign: level048Redesign,
  scene: ({ diff, anim, rand, secret, extra }) => {
    let streaks = ''
    for (let i = 0; i < 14; i++) streaks += `<path d="M${340 + rand() * 120} ${120 + rand() * 200}v${16 + rand() * 20}" stroke="#fff" stroke-opacity="0.7" stroke-width="3" stroke-linecap="round"/>`
    let ripples = ''
    for (let i = 0; i < 10; i++) ripples += `<path d="M${rand() * 760} ${400 + rand() * 90}h${20 + rand() * 30}" stroke="#a5dcf3" stroke-width="3" stroke-linecap="round"/>`
    const jumping = (period: number) => anim({ id: 'fish', type: 'bob', dx: 4, dy: 10, period }, fish(300, 400))
    const flying = (reverse: boolean) =>
      anim({ id: 'bird', type: 'path', points: [[0, 0], [160, -14]], flipX: 120, period: 8, reverse }, flier(120, 100))
    const haze = mist(400, 384)

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      diff(120, 100, 20, flying(false), flying(true), 'bird') +
      // Cliffs
      `<path d="M0 140h330v240H0Z" fill="#8d99ae"/><path d="M470 140h330v240H470Z" fill="#8d99ae"/>` +
      `<path d="M0 140h330v30H0ZM470 140h330v30H470Z" fill="#5f9e4a"/>` +
      `<path d="M40 190h60v40H40ZM200 240h50v30h-50ZM520 210h70v40h-70ZM700 250h60v36h-60Z" fill="#7f8c9d"/>` +
      pine(60, 150, 0.9, '#2f7d55') +
      pine(150, 146, 1.1, '#3b9467') +
      pine(620, 146, 1, '#3b9467') +
      pine(720, 150, 1.2, '#2f7d55') +
      // Waterfall
      `<rect x="330" y="140" width="140" height="240" fill="#63b8e3"/><rect x="350" y="140" width="100" height="240" fill="#9fd8f0"/>` +
      anim({ type: 'path', points: [[0, 0], [0, 60]], period: 1.2 }, streaks) +
      diff(400, 253, 48, rainbow(400, 270), '') +
      // Pool
      `<rect y="380" width="800" height="120" fill="#4fa9d8"/><rect y="390" width="800" height="110" fill="#63b8e3"/>` +
      anim({ type: 'bob', dx: 10, dy: 0, period: 4 }, ripples) +
      diff(400, 384, 26, haze, anim({ id: 'mist', type: 'bob', dx: 6, dy: 4, period: 1.6 }, haze), 'mist') +
      diff(300, 396, 24, jumping(2.4), jumping(1), 'fish') +
      // Banks
      `<path d="M0 380q60 -20 120 0v120H0Z" fill="#8fca68"/><path d="M680 380q60 -20 120 0v120h-120Z" fill="#8fca68"/>` +
      diff(60, 436, 44, bear(60, 470), bear(60, 470, true)) +
      rock(100, 496, 1.1) +
      diff(740, 470, 26, '', rock(740, 480, 1.2, '#6f8f6a')) +
      // Log bridge
      `<rect x="120" y="440" width="560" height="16" rx="8" fill="#8a5a3b"/>` +
      diff(208, 430, 30, rail(180, 236, 440), '') +
      person(560, 440, '#ffb703') +
      diff(544, 402, 18, backpack(560, 440, '#e63946'), backpack(560, 440, '#3a86ff')) +
      // The chapter's hidden key on the bank, under the fern
      secret(690, 482, 15) +
      fern(700, 490) +
      floor(rand, 384, 396, 4) +
      trailSign(530, 170) +
      pineCone(270, 170) +
      anthill(760, 405) +
      acorn(30, 390) +
      bluebells(200, 170) +
      // The extra objects of normal mode (docs/extra-objects.md).
      extras({ extra, anim }, [
        ['bird', 498, 199],
        ['fern', 666, 277],
        ['bird', 485, 356],
        ['frog', 656, 424],
        ['fish', 431, 477, '#4dabf7'],
        ['fish', 544, 477, '#4dabf7'],
        ['cloud', 422, 79],
        ['butterfly', 677, 44],
        ['cloud', 555, 72],
        ['butterfly', 74, 35],
      ])
    )
  },
})
