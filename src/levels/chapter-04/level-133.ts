// Motion differences: the moray peeks out of its hole only on picture B; the jellyfish pulses faster on B.
import { svgLevel } from '../helpers.ts'
import { anchor, clam, crab, fish, jellyfish, octopus, sandBits, seahorse, seaUrchin, seaweed, snorkelMask, starfish } from './shapes.ts'

const coin = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="4" fill="#ffd23f" stroke="#c9a227" stroke-width="1.5"/>`

/** Gem; (x, y) = center. Bounds: radius 7. */
const gem = (x: number, y: number, color: string) => `<path d="M${x - 7} ${y - 2}l4 -5h6l4 5l-7 9Z" fill="${color}"/><path d="M${x - 3} ${y - 7}l3 5l3 -5" stroke="#fff" stroke-opacity="0.5" stroke-width="1" fill="none"/>`

/** Bottle lying on the sand; (x, y) = center. Bounds: x ±20, y ±7. */
const bottle = (x: number, y: number) =>
  `<g transform="translate(${x} ${y}) rotate(-12)"><rect x="-14" y="-6" width="24" height="12" rx="5" fill="#5fae7a" fill-opacity="0.85"/><rect x="10" y="-3" width="9" height="6" fill="#5fae7a"/><rect x="-6" y="-4" width="10" height="8" fill="#f4ecd8"/></g>`

/** Broken hull section with `planks` plank lines; (x, y) = top-left, 44 × 40. */
const hullPatch = (x: number, y: number, planks: number) => {
  let s = `<rect x="${x}" y="${y}" width="44" height="40" fill="#5a3a24"/>`
  for (let i = 1; i <= planks; i++) s += `<path d="M${x} ${y + (40 * i) / (planks + 1)}h44" stroke="#3a2416" stroke-width="2.5"/>`
  return s
}

/** Moray eel head peeking from a hole at (x, y), facing right. Bounds: x from −6 to +24, y ±10. */
const eel = (x: number, y: number) =>
  `<path d="M${x - 6} ${y + 8}q14 -18 30 -8q-4 8 -14 8Z" fill="#8a9a3a"/><circle cx="${x + 14}" cy="${y - 2}" r="2" fill="#ffd23f"/><circle cx="${x + 14}" cy="${y - 2}" r="0.9" fill="#222"/>`

export default svgLevel({
  id: 133,
  chapter: 'sea',
  title: 'sunkenChest',
  parTimeSec: 125,
  scene: ({ diff, anim, rand }) => {
    let coins = ''
    for (const [x, y] of [[280, 480], [318, 484], [340, 474], [372, 488], [440, 486], [500, 470]]) coins += coin(x, y)
    let weeds = ''
    for (const [x, s, p] of [[40, 1.7, 2.6], [320, 1.2, 3.1], [780, 1.6, 2.3]] as const) weeds += anim({ type: 'sway', angle: 9, pivot: [x, 470], period: p }, seaweed(x, 470, s, '#2a8f6a'))
    const pulse = (period: number) => anim({ type: 'bob', dx: 0, dy: -8, period }, jellyfish(560, 132, '#ffb3d9'))
    const peek = (moving: boolean) => (moving ? anim({ type: 'bob', dx: 6, dy: 0, period: 2 }, eel(120, 372)) : eel(120, 372))

    return (
      `<rect width="800" height="500" fill="#14567a"/><rect width="800" height="160" fill="#1d6f96"/>` +
      `<path d="M200 0L160 440H260ZM520 0L500 440H580Z" fill="#ffffff" fill-opacity="0.06"/>` +
      anim({ type: 'path', points: [[0, 0], [500, -20]], period: 22 }, fish(120, 80, '#ffd23f', 1)) +
      anim({ type: 'path', points: [[0, 0], [-420, 30]], period: 26 }, fish(700, 210, '#ff9f43', 1.2, true)) +
      diff(560, 139, 31, pulse(2.6), pulse(1)) +
      // Wreck
      `<path d="M0 420L20 200L300 250L280 420Z" fill="#6b4a2e"/><path d="M20 240L296 288M14 290L290 330M8 340L286 374" stroke="#4a3220" stroke-width="4"/>` +
      `<path d="M120 250L260 60" stroke="#5a3a24" stroke-width="14"/><path d="M200 140L260 160" stroke="#5a3a24" stroke-width="6"/>` +
      `<circle cx="80" cy="300" r="12" fill="#2b1d14" stroke="#c9a227" stroke-width="3"/>` +
      diff(200, 330, 26, hullPatch(178, 310, 3), hullPatch(178, 310, 4)) +
      `<path d="M80 360q40 -30 80 0v40h-80Z" fill="#4f5f66"/><ellipse cx="118" cy="378" rx="16" ry="12" fill="#1b2a30"/>` +
      diff(130, 372, 26, peek(false), peek(true)) +
      // Sand
      `<path d="M0 420Q200 400 400 420T800 410V500H0Z" fill="#d9c79a"/>` + sandBits(rand, 430, 496, 14) +
      // Chest
      `<path d="M350 404l10 -40h80l10 40Z" fill="#7a4a2a"/><path d="M360 364h80" stroke="#c9a227" stroke-width="4"/>` +
      `<path d="M352 404q48 -22 96 0Z" fill="#ffd23f"/>` + coin(380, 398) + coin(420, 396) + gem(396, 392, '#3a86ff') +
      diff(414, 390, 22, gem(414, 388, '#e63946'), gem(414, 388, '#c93a6a')) +
      `<rect x="350" y="404" width="100" height="46" rx="4" fill="#8a5a33"/><path d="M372 404v46M428 404v46" stroke="#c9a227" stroke-width="5"/>` +
      `<rect x="392" y="418" width="16" height="14" rx="2" fill="#c9a227"/>` +
      coins + diff(300, 470, 22, coin(300, 470), '') +
      diff(232, 462, 26, bottle(226, 464), bottle(238, 462)) +
      diff(470, 476, 22, '', crab(470, 486, '#e05a47')) +
      // Anchor, cannonballs, octopus
      diff(640, 392, 28, anchor(640, 396, '#a9b4c2'), `<g transform="rotate(24 640 396)">${anchor(640, 396, '#a9b4c2')}</g>`) +
      `<circle cx="572" cy="480" r="10" fill="#3d3d3d"/><circle cx="608" cy="482" r="10" fill="#3d3d3d"/>` +
      diff(590, 468, 22, `<circle cx="590" cy="466" r="10" fill="#4a4a4a"/>`, `<circle cx="590" cy="464" r="12.5" fill="#4a4a4a"/>`) +
      `<path d="M690 450q30 -40 70 -20q20 14 10 34Z" fill="#6f7f86"/>` +
      diff(722, 428, 30, octopus(722, 444, '#8338ec'), octopus(722, 444, '#9a4ae0')) +
      starfish(530, 444, '#ff9f43') + starfish(760, 488, '#ff6b8b') +
      weeds +
      seaUrchin(512, 490) +
      clam(660, 480) +
      seahorse(450, 322) +
      snorkelMask(140, 472) +
      fish(130, 150, '#ffb703')
    )
  },
})
