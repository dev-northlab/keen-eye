// Motion differences: the eel sways faster on picture B; the diver's bubbles rise only on B; the fish circles faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { anchor, bottleMessage, clam, coral, fish, jellyfish, seahorse, seaUrchin, seaweed, snorkelMask, starfish } from './shapes.ts'

/** Diver, faces right; (x, y) = feet. Bounds: x ±16, y from −62 to 0. */
const diver = (x: number, y: number, suit: string) =>
  `<g transform="translate(${x} ${y})"><path d="M-8 0l-6 -6h10M8 0l6 -6h-10" fill="#2b2b2b"/><rect x="-9" y="-24" width="7" height="22" fill="${suit}"/><rect x="2" y="-24" width="7" height="22" fill="${suit}"/>` +
  `<path d="M-11 -48h22l3 26h-28Z" fill="${suit}"/><rect x="-16" y="-50" width="8" height="26" rx="3" fill="#ffd166"/><circle cy="-54" r="8" fill="#f2d29b"/>` +
  `<circle cy="-54" r="9" fill="none" stroke="#3a86ff" stroke-width="3"/></g>`

/** Diver's bubbles over the head at (x, y). Bounds: x ±8, y from −26 to 0. */
const bubbles = (x: number, y: number) => `<circle cx="${x + 2}" cy="${y - 6}" r="3" fill="#fff" fill-opacity="0.7"/><circle cx="${x - 2}" cy="${y - 15}" r="4" fill="#fff" fill-opacity="0.6"/><circle cx="${x + 3}" cy="${y - 24}" r="2.5" fill="#fff" fill-opacity="0.5"/>`

/** Eel out of a porthole from the pivot (x, y) to the right. Bounds: x from −2 to +44, y from −14 to +10. */
const eel = (x: number, y: number) => `<path d="M${x} ${y}q14 -10 24 0t18 -6" stroke="#8ac926" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="${x + 40}" cy="${y - 8}" r="1.5" fill="#222"/>`

/** Ship's wheel; (x, y) = center. Bounds: radius 16. */
const wheel = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><circle r="11" fill="none" stroke="#8a5a3b" stroke-width="4"/><path d="M-15 0h30M0 -15v30M-10 -10l20 20M-10 10l20 -20" stroke="#8a5a3b" stroke-width="3"/><circle r="3" fill="#5a3d2b"/></g>`

/** Gold coins; (x, y) = bottom center, `n` coins. Bounds: x ±14, y from −14 to 0. */
const coins = (x: number, y: number, n: number) =>
  [[-8, -4], [4, -4], [-2, -11]].slice(0, n).map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="4.5" fill="#ffd166" stroke="#e08a00" stroke-width="1"/>`).join('')

export default svgLevel({
  id: 69,
  chapter: 'sea',
  title: 'shipwreck',
  parTimeSec: 130,
  scene: ({ diff, anim, rand, extra }) => {
    let drifting = ''
    for (let i = 0; i < 12; i++) drifting += `<circle cx="${rand() * 800}" cy="${rand() * 500}" r="${2 + rand() * 3}" fill="#fff" fill-opacity="0.4"/>`
    const snake = eel(470, 300)
    const air = bubbles(200, 338)
    const circling = (period: number) => anim({ id: 'fish', type: 'path', points: [[0, 0], [60, -30], [120, 0], [60, 30]], period }, fish(560, 160, '#ff9f43', 1.1))

    return (
      `<rect width="800" height="500" fill="#1a6f9a"/>` +
      `<rect width="800" height="260" fill="#1f8fbf"/>` +
      `<path d="M120 0l40 240h-30ZM380 0l40 240h-30ZM640 0l40 240h-30Z" fill="#fff" fill-opacity="0.07"/>` +
      diff(560, 160, 26, circling(8), circling(4), 'fish') +
      fish(120, 180, '#ff6b8b', 1.2, true) +
      diff(700, 230, 20, fish(700, 230, '#8ac926'), fish(700, 230, '#b38cff')) +
      jellyfish(100, 320, '#b38cff') +
      // Wreck
      `<path d="M300 440q0 -40 40 -40h260q40 0 60 -40q20 60 -40 80H340q-40 0 -40 0Z" fill="#6b4f3a"/>` +
      `<path d="M330 410h300" stroke="#5a3d2b" stroke-width="5"/><path d="M320 436h330" stroke="#8a5a3b" stroke-width="3"/>` +
      `<rect x="438" y="200" width="6" height="200" fill="#5a3d2b" transform="rotate(8 441 300)"/><path d="M450 230l60 50l-70 10Z" fill="#d9d2c5" fill-opacity="0.8"/>` +
      `<circle cx="470" cy="300" r="12" fill="#2b2b2b"/>` +
      diff(490, 298, 26, snake, anim({ type: 'sway', angle: 8, pivot: [470, 300], period: 2 }, snake)) +
      `<circle cx="400" cy="420" r="8" fill="#2b2b2b"/>` +
      `<circle cx="540" cy="420" r="8" fill="#2b2b2b"/>` +
      wheel(600, 380) +
      diff(360, 380, 22, anchor(360, 380, '#8d99ae'), anchor(360, 380, '#ffd166')) +
      // Floor
      `<path d="M0 460Q200 440 400 460T800 450V500H0Z" fill="#c9b79c"/>` +
      diver(200, 400, '#2b2b2b') +
      diff(200, 325, 18, air, anim({ id: 'air', type: 'path', points: [[0, 0], [0, -14]], period: 1.6 }, air), 'air') +
      diff(260, 416, 30, diver(260, 440, '#e63946'), diver(260, 440, '#ffb703')) +
      diff(700, 456, 18, coins(700, 462, 3), coins(700, 462, 2)) +
      diff(120, 462, 18, starfish(120, 462, '#ff6b8b'), starfish(120, 462, '#ffb703')) +
      seaweed(60, 480, 1.3) +
      diff(760, 462, 32, coral(760, 480, '#ff6b8b'), coral(760, 480, '#8ac926')) +
      seaweed(300, 490, 1) +
      seaUrchin(212, 472) +
      clam(380, 472) +
      seahorse(150, 260) +
      bottleMessage(600, 474) +
      snorkelMask(172, 490) +
      anim({ type: 'path', points: [[0, 0], [4, -40]], period: 4 }, drifting) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['fish', 51, 77, '#ffb703'],
        ['fish', 317, 86, '#9ef01a'],
        ['jellyfish', 467, 46],
        ['fish', 473, 206, '#ff9f43'],
        ['seahorse', 131, 356],
        ['fish', 750, 145, '#ffb703'],
        ['fish', 655, 351, '#9ef01a'],
        ['jellyfish', 247, 231],
        ['fish', 459, 374, '#4dabf7'],
        ['seahorse', 604, 44],
      ])
    )
  },
})
