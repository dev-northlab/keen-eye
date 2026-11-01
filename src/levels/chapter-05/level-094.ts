// Motion differences: the crystals glow faster on picture B; the cart rolls faster on B; the bat flutters faster on B.
import { svgLevel } from '../helpers.ts'
import { alien, star } from './shapes.ts'

/** Crystal cluster without its own fill (colored by the parent); (x, y) = bottom center. Bounds: x ±30·s, y from −60·s to 0. */
const cluster = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 0l8 -34l10 34ZM-12 0l12 -60l12 60ZM12 0l10 -40l8 40Z"/><path d="M-2 -6l2 -46" stroke="#fff" stroke-opacity="0.6" stroke-width="3"/></g>`

/** Glowing mushroom; (x, y) = stem foot. Bounds: x ±14, y from −24 to 0. */
const mushroom = (x: number, y: number, cap: string) =>
  `<rect x="${x - 3}" y="${y - 12}" width="6" height="12" fill="#e6e6f0"/><path d="M${x - 14} ${y - 10}a14 14 0 0 1 28 0Z" fill="${cap}"/>`

/** Mine cart full of ore; (x, y) = rail level center. Bounds: x ±26, y from −40 to 0. */
const cart = (x: number, y: number) =>
  `<g fill="#ffd166"><circle cx="${x - 12}" cy="${y - 30}" r="8"/><circle cx="${x + 2}" cy="${y - 33}" r="8"/><circle cx="${x + 14}" cy="${y - 29}" r="7"/></g>` +
  `<path d="M${x - 26} ${y - 30}h52l-6 24h-40Z" fill="#8d99ae"/><circle cx="${x - 14}" cy="${y - 6}" r="6" fill="#3d4a55"/><circle cx="${x + 14}" cy="${y - 6}" r="6" fill="#3d4a55"/>`

/** Space bat; (x, y) = center. Bounds: x ±20, y ±8. */
const bat = (x: number, y: number) =>
  `<path d="M${x} ${y}q-6 -8 -20 -6q8 4 6 12q6 -6 14 -6q8 0 14 6q-2 -8 6 -12q-14 -2 -20 6Z" fill="#14081f"/><circle cx="${x - 2}" cy="${y - 1}" r="1" fill="#ff6b6b"/><circle cx="${x + 2}" cy="${y - 1}" r="1" fill="#ff6b6b"/>`

/** Pickaxe leaning; (x, y) = handle foot. Bounds: x from −14 to +16, y from −40 to 0. */
const pickaxe = (x: number, y: number) =>
  `<path d="M${x} ${y}l10 -36" stroke="#a0703f" stroke-width="4"/><path d="M${x - 4} ${y - 34}q14 -8 20 4" stroke="#8d99ae" stroke-width="5" fill="none"/>`

export default svgLevel({
  id: 94,
  chapter: 'space',
  title: 'crystalCave',
  parTimeSec: 140,
  scene: ({ diff, anim }) => {
    const glowing = (period: number) => anim({ type: 'color', colors: ['#3ae0ff', '#b38cff', '#ff9ff3', '#3ae0ff'], period }, cluster(160, 380))
    const rolling = (period: number) => anim({ id: 'cart', type: 'path', points: [[0, 0], [280, 0]], period }, cart(420, 470))
    const fluttering = (period: number) => anim({ id: 'bat', type: 'bob', dx: 20, dy: 6, period }, bat(480, 150))

    return (
      `<rect width="800" height="500" fill="#2b1d3f"/>` +
      // Opening to the sky
      `<ellipse cx="420" cy="0" rx="160" ry="70" fill="#0b1030"/>` +
      `<g fill="#fff"><circle cx="330" cy="20" r="2"/><circle cx="460" cy="40" r="1.6"/><circle cx="520" cy="15" r="2"/></g>` +
      diff(380, 30, 18, star(380, 30, 6, '#fff3b0'), '') +
      `<rect width="250" height="20" fill="#1f1430"/><rect x="590" width="210" height="20" fill="#1f1430"/>` +
      `<g fill="#1f1430"><path d="M110 20l10 60l10 -60ZM190 20l8 40l8 -40ZM610 20l10 50l10 -50Z"/></g>` +
      diff(700, 42, 25, `<path d="M690 20l10 44l10 -44Z" fill="#1f1430"/>`, '') +
      // Walls and floor
      `<path d="M0 0h40q30 200 -10 500H0Z" fill="#1f1430"/><path d="M800 0h-50q-30 250 20 500h30Z" fill="#1f1430"/>` +
      `<path d="M0 410q200 -30 400 -10t400 0V500H0Z" fill="#3a2a50"/>` +
      `<g fill="#3ae0ff" fill-opacity="0.8">${cluster(60, 230, 0.4)}${cluster(740, 260, 0.4)}</g>` +
      diff(620, 160, 18, `<g fill="#ff9ff3">${cluster(620, 172, 0.4)}</g>`, '') +
      diff(480, 150, 22, fluttering(2.4), fluttering(1), 'bat') +
      // Glowing crystals
      `<ellipse cx="160" cy="370" rx="70" ry="40" fill="#3ae0ff" fill-opacity="0.12"/>` +
      diff(160, 350, 43, glowing(5), glowing(2)) +
      diff(60, 428, 19, mushroom(60, 440, '#8ac926'), mushroom(60, 440, '#ff9f43')) +
      mushroom(90, 450, '#8ac926') +
      // Miner
      diff(250, 439, 18, alien(250, 470, '#8ac926'), alien(250, 470, '#8ac926', 2)) +
      `<path d="M240 436q10 -14 20 0Z" fill="#ffd166"/><circle cx="250" cy="430" r="3" fill="#fff7a1"/>` +
      diff(206, 452, 22, pickaxe(200, 470), '') +
      diff(330, 461, 26, `<g fill="#ffd166"><circle cx="318" cy="464" r="8"/><circle cx="334" cy="462" r="9"/><circle cx="346" cy="466" r="6"/><circle cx="328" cy="452" r="7"/></g>`, `<g fill="#bfc7d5"><circle cx="318" cy="464" r="8"/><circle cx="334" cy="462" r="9"/><circle cx="346" cy="466" r="6"/><circle cx="328" cy="452" r="7"/></g>`) +
      // Rails and cart
      `<path d="M380 470h420M380 480h420" stroke="#8d99ae" stroke-width="3"/><g fill="#5a3d2b">${[390, 430, 470, 510, 550, 590, 630, 670, 710, 750, 790].map((x) => `<rect x="${x - 3}" y="468" width="6" height="16"/>`).join('')}</g>` +
      diff(420, 450, 34, rolling(10), rolling(5), 'cart')
    )
  },
})
