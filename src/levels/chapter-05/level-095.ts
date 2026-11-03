// Motion differences: the gardening robot rolls faster on picture B; the alien flower nods faster on B; the sprinkler sprays only on B.
import { svgLevel } from '../helpers.ts'
import { wateringCan } from '../shapes.ts'
import { fuelCanister, helmet, planet, probe, robot, starField, toolbox } from './shapes.ts'

/** Tomato plant; (x, y) = base. Bounds: x ±16, y from −50 to 0. */
const tomato = (x: number, y: number, fruit: string) =>
  `<path d="M${x} ${y}v-46" stroke="#2f7d55" stroke-width="3"/><path d="M${x} ${y - 20}q-14 -4 -16 -14M${x} ${y - 34}q14 -2 16 -12" stroke="#4caf6a" stroke-width="5" stroke-linecap="round" fill="none"/>` +
  `<circle cx="${x - 8}" cy="${y - 14}" r="6" fill="${fruit}"/><circle cx="${x + 8}" cy="${y - 28}" r="6" fill="${fruit}"/>`

/** Carrot tops; (x, y) = soil. Bounds: x ±10, y from −20 to +4. */
const carrot = (x: number, y: number) =>
  `<path d="M${x - 5} ${y}h10l-5 4Z" fill="#ff9f43"/><path d="M${x} ${y}l-8 -16M${x} ${y}v-20M${x} ${y}l8 -16" stroke="#4caf6a" stroke-width="3" stroke-linecap="round"/>`

/** Lettuce; (x, y) = soil center. Bounds: x ±14, y from −16 to 0. */
const lettuce = (x: number, y: number, color: string) =>
  `<path d="M${x - 14} ${y}q0 -14 14 -16q14 2 14 16Z" fill="${color}"/><path d="M${x} ${y}v-12M${x - 7} ${y}l3 -10M${x + 7} ${y}l-3 -10" stroke="#fff" stroke-opacity="0.4" stroke-width="2"/>`

/** Alien flower on a long stem; (x, y) = base. Bounds: x ±16, y from −96 to 0. */
const tallFlower = (x: number, y: number) =>
  `<path d="M${x} ${y}q10 -40 0 -80" stroke="#2f7d55" stroke-width="4" fill="none"/>` +
  `<g fill="#ff6b8b"><circle cx="${x - 9}" cy="${y - 80}" r="7"/><circle cx="${x + 9}" cy="${y - 80}" r="7"/><circle cx="${x}" cy="${y - 89}" r="7"/><circle cx="${x}" cy="${y - 71}" r="7"/></g><circle cx="${x}" cy="${y - 80}" r="6" fill="#ffd166"/>`

/** Butterfly; (x, y) = center. Bounds: x ±11, y ±9. */
const butterfly = (x: number, y: number, color: string) =>
  `<path d="M${x} ${y}q-12 -14 -11 0q-1 10 11 0q12 10 11 0q1 -14 -11 0Z" fill="${color}"/><path d="M${x} ${y - 6}v12" stroke="#3d4a55" stroke-width="2"/>`

const spray = `<g fill="#8ecae6"><circle cx="560" cy="250" r="3"/><circle cx="548" cy="244" r="3"/><circle cx="572" cy="244" r="3"/><circle cx="540" cy="234" r="2.5"/><circle cx="580" cy="234" r="2.5"/><circle cx="560" cy="238" r="2.5"/></g>`

export default svgLevel({
  id: 95,
  chapter: 'space',
  title: 'spaceGarden',
  parTimeSec: 140,
  scene: ({ diff, anim, rand }) => {
    const rolling = (period: number) => anim({ id: 'robot', type: 'path', points: [[0, 0], [240, 0]], flipX: 160, period }, robot(160, 480, '#ffb703'))
    const nodding = (period: number) => anim({ type: 'sway', angle: 10, pivot: [700, 420], period }, tallFlower(700, 420))

    return (
      `<rect width="800" height="500" fill="#151033"/>` +
      starField(rand, 0, 200, 40) +
      diff(60, 60, 30, planet(60, 60, 28, '#e76f51'), planet(60, 60, 28, '#9b7bff')) +
      `<rect y="430" width="800" height="70" fill="#8f89a8"/>` +
      // Greenhouse dome
      `<path d="M20 440A380 380 0 0 1 780 440Z" fill="#bde3f2" fill-opacity="0.22"/>` +
      `<path d="M20 440A380 380 0 0 1 780 440M400 60V440M120 170Q400 110 680 170M60 300Q400 230 740 300" fill="none" stroke="#e6e6f0" stroke-opacity="0.8" stroke-width="4"/>` +
      `<rect y="440" width="800" height="60" fill="#8d99ae"/>` +
      // Hanging lamps
      `<path d="M260 120v40M540 120v40" stroke="#5c677d" stroke-width="2"/><path d="M248 160h24l-4 10h-16Z" fill="#ffd166"/>` +
      diff(540, 166, 18, `<path d="M528 160h24l-4 10h-16Z" fill="#ffd166"/>`, `<path d="M528 160h24l-4 10h-16Z" fill="#ff6b8b"/>`) +
      // Sprinkler
      `<path d="M560 420V262" stroke="#8d99ae" stroke-width="3"/><rect x="554" y="256" width="12" height="8" rx="2" fill="#5c677d"/>` +
      diff(560, 242, 26, '', anim({ type: 'blink', duty: 0.5, period: 1 }, spray)) +
      // Beds
      `<rect x="60" y="410" width="300" height="24" rx="4" fill="#7a4e33"/><rect x="440" y="410" width="300" height="24" rx="4" fill="#7a4e33"/>` +
      tomato(90, 410, '#e63946') +
      diff(150, 386, 26, tomato(150, 410, '#e63946'), tomato(150, 410, '#ffd166')) +
      tomato(210, 410, '#e63946') +
      carrot(260, 410) +
      carrot(290, 410) +
      diff(320, 400, 18, carrot(320, 410), '') +
      lettuce(470, 410, '#8ac926') +
      diff(510, 402, 18, lettuce(510, 410, '#8ac926'), lettuce(510, 410, '#b38cff')) +
      lettuce(600, 410, '#8ac926') +
      tallFlower(640, 420) +
      diff(700, 360, 70, nodding(4), nodding(1.6)) +
      // Visitors
      anim({ type: 'bob', dx: 30, dy: 10, period: 6 }, butterfly(380, 280, '#ffd166')) +
      diff(300, 220, 18, butterfly(300, 220, '#3ae0ff'), '') +
      `<g fill="#bfc7d5">${[80, 200, 330, 470, 610, 740].map((x) => `<rect x="${x}" y="462" width="40" height="6" rx="3"/>`).join('')}</g>` +
      diff(160, 453, 30, rolling(12), rolling(6), 'robot') +
      toolbox(520, 462) +
      wateringCan(610, 465) +
      helmet(700, 465) +
      fuelCanister(440, 464) +
      probe(460, 200)
    )
  },
})
