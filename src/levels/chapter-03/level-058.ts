// Motion differences: the bees fly faster on picture B; the honey drip bobs only on B; the leafy twig sways faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level058Redesign } from './level-058-redesign.ts'
import { acorn, anthill, bear, bird, bluebells, bush, cloud, floor, flower, pine, pineCone, sun, wildStrawberry } from './shapes.ts'
import { bee } from '../shapes.ts'

/** Tree hollow; (x, y) = center, scale s. Bounds: x ±16·s, y ±22·s. */
const hollow = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><ellipse rx="16" ry="22" fill="#2b2b2b"/><path d="M-12 -14q12 -8 24 0" stroke="#ffb703" stroke-width="5" fill="none"/></g>`

/** Honeycomb cell cluster; (x, y) = center. Bounds: x ±16, y ±14. */
const comb = (x: number, y: number) =>
  [[0, 0], [-10, -6], [10, -6], [0, -12], [-10, 6], [10, 6]].map(([dx, dy]) => `<path d="M${x + dx} ${y + dy - 6}l5 3v6l-5 3l-5 -3v-6Z" fill="#ffb703" stroke="#e08a00" stroke-width="1"/>`).join('')

/** Honey drip; (x, y) = top. Bounds: x ±5, y from 0 to +16. */
const drip = (x: number, y: number) => `<path d="M${x - 4} ${y}h8v6q0 8 -4 10q-4 -2 -4 -10Z" fill="#ffb703"/>`

/** Leafy twig from the pivot (x, y) to the right. Bounds: x from −2 to +30, y from −14 to +6. */
const twig = (x: number, y: number) =>
  `<path d="M${x} ${y}q14 -2 28 -8" stroke="#6b4f3a" stroke-width="2.5" fill="none"/><ellipse cx="${x + 10}" cy="${y - 8}" rx="6" ry="4" fill="#4caf6a" transform="rotate(-20 ${x + 10} ${y - 8})"/><ellipse cx="${x + 22}" cy="${y - 10}" rx="6" ry="4" fill="#4caf6a" transform="rotate(-30 ${x + 22} ${y - 10})"/>`

export default svgLevel({
  id: 58,
  chapter: 'forest',
  title: 'beeTree',
  parTimeSec: 120,
  redesign: level058Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    const buzzing = (period: number) =>
      anim({ id: 'bees', type: 'path', points: [[0, 0], [30, -20], [60, 0], [30, 16]], period }, bee(500, 240) + bee(520, 256) + bee(488, 262))
    const honey = drip(420, 344)
    const swaying = (period: number) => anim({ type: 'sway', angle: 10, pivot: [240, 150], period }, twig(240, 150))

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(680, 70) +
      anim({ type: 'path', points: [[0, 0], [50, 0]], period: 30 }, cloud(200, 60, 0.8)) +
      `<path d="M0 290Q200 260 400 280T800 270V500H0Z" fill="#a9d3a0"/>` +
      pine(60, 300, 1.2, '#2f7d55') +
      pine(740, 290, 1.3, '#2f7d55') +
      pine(660, 310, 0.8, '#3b9467') +
      // Hollow tree
      `<rect x="360" y="120" width="80" height="380" fill="#8a5a3b"/><path d="M370 120v380M430 120v380" stroke="#6b4f3a" stroke-width="5"/>` +
      `<path d="M360 160h-120M360 150l-60 -40M440 180h120M440 170l50 -40" stroke="#8a5a3b" stroke-width="12" stroke-linecap="round"/>` +
      `<circle cx="400" cy="90" r="70" fill="#4caf6a"/><circle cx="320" cy="120" r="44" fill="#3f9a5a"/><circle cx="480" cy="120" r="48" fill="#3f9a5a"/><circle cx="400" cy="150" r="36" fill="#4caf6a"/>` +
      diff(256, 146, 20, swaying(2.4), swaying(1)) +
      diff(560, 170, 18, '', bird(560, 180, '#e63946')) +
      diff(400, 300, 30, hollow(400, 300), hollow(400, 300, 1.3)) +
      diff(400, 230, 20, comb(400, 230), '') +
      comb(420, 330) +
      diff(420, 352, 18, honey, anim({ id: 'drip', type: 'bob', dx: 0, dy: 5, period: 1.3 }, honey), 'drip') +
      diff(504, 249, 34, buzzing(5), buzzing(2.5), 'bees') +
      bee(300, 220) +
      `<rect y="400" width="800" height="100" fill="#8fca68"/>` +
      diff(540, 446, 44, bear(540, 480), bear(540, 480, true)) +
      bush(140, 450, 1.2) +
      bush(700, 460, 1, '#4caf6a') +
      diff(220, 468, 18, flower(220, 486, '#ff6b8b'), flower(220, 486, '#b38cff')) +
      flower(250, 490, '#ffffff') +
      flower(660, 492, '#ff9f43') +
      floor(rand, 410, 490, 8) +
      wildStrawberry(300, 472) +
      pineCone(85, 306) +
      acorn(612, 480) +
      anthill(55, 490) +
      bluebells(455, 484) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['feather', 442, 414],
        ['rabbit', 68, 347],
        ['frog', 641, 454],
        ['anthill', 245, 339],
        ['mushroom', 736, 340],
        ['fern', 86, 478],
        ['pineCone', 553, 343],
        ['birds', 122, 109],
        ['butterfly', 605, 31],
        ['cloud', 181, 232],
      ])
    )
  },
})
