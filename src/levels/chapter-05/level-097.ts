// Motion differences: the neon planet blinks faster on picture B; the robot waiter rolls faster on B; the arriving saucer hovers faster on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { parasol } from '../chapter-04/shapes.ts'
import { alien, alienPlant, crystal, fuelCanister, helmet, robot, rocket, star, starField, toolbox, ufo } from './shapes.ts'

/** Alien head behind the diner window; (x, y) = head center. Bounds: x ±10, y from −14 to +10. */
const head = (x: number, y: number, color: string) =>
  `<path d="M${x - 4} ${y - 8}l-3 -5M${x + 4} ${y - 8}l3 -5" stroke="${color}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="10" fill="${color}"/><circle cx="${x}" cy="${y - 1}" r="3" fill="#fff"/>`

/** Neon planet sign; (x, y) = center. Bounds: x ±29, y ±16. */
const neon = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="14" fill="none" stroke="#ff6bd6" stroke-width="4"/><ellipse cx="${x}" cy="${y}" rx="26" ry="7" fill="none" stroke="#3ae0ff" stroke-width="3"/>`

/** Table with a cup; (x, y) = foot. Bounds: x ±30, y from −24 to 0. */
const table = (x: number, y: number) =>
  `<rect x="${x - 2}" y="${y - 16}" width="4" height="16" fill="#5c677d"/><rect x="${x - 30}" y="${y - 20}" width="60" height="5" rx="2" fill="#bfc7d5"/><rect x="${x - 5}" y="${y - 28}" width="10" height="8" rx="2" fill="#fff"/>`

const steam = (x: number, y: number) => `<path d="M${x - 2} ${y}q-4 -6 0 -12t0 -12M${x + 4} ${y}q-4 -6 0 -10" stroke="#fff" stroke-opacity="0.7" stroke-width="2" fill="none"/>`

export default svgLevel({
  id: 97,
  chapter: 'space',
  title: 'spaceCafe',
  parTimeSec: 140,
  scene: ({ diff, anim, rand, extra }) => {
    const blinking = (period: number) => anim({ type: 'blink', duty: 0.6, period }, neon(400, 172))
    const rolling = (period: number) => anim({ id: 'waiter', type: 'path', points: [[0, 0], [240, 0]], period }, robot(200, 440, '#bfc7d5', '#8ac926'))
    const hovering = (period: number) => anim({ id: 'saucer', type: 'bob', dx: 0, dy: 10, period }, ufo(620, 120, '#8ac926', '#ffffff'))

    return (
      `<rect width="800" height="500" fill="#120f2e"/>` +
      starField(rand, 0, 300, 70) +
      diff(160, 80, 18, star(160, 80, 9, '#ffd23f'), '') +
      diff(620, 116, 37, hovering(4), hovering(1.6), 'saucer') +
      // Asteroid
      `<path d="M30 340q40 -30 200 -20h360q150 -6 190 30q20 80 -60 120q-150 40 -350 30q-200 0 -320 -40q-50 -60 -20 -120Z" fill="#7d6b8d"/>` +
      `<path d="M30 340q40 -30 200 -20h360q150 -6 190 30" stroke="#9a88aa" stroke-width="10" fill="none"/>` +
      `<ellipse cx="560" cy="460" rx="30" ry="9" fill="#6a5a78"/><ellipse cx="300" cy="476" rx="20" ry="6" fill="#6a5a78"/>` +
      // Diner
      `<rect x="220" y="200" width="360" height="140" rx="10" fill="#e6e6f0"/><rect x="220" y="320" width="360" height="20" fill="#e63946"/>` +
      `<rect x="300" y="150" width="200" height="46" rx="8" fill="#1d1640"/><rect x="390" y="196" width="20" height="4" fill="#5c677d"/>` +
      `<path d="M330 172h30M440 172h30" stroke="#ffd166" stroke-width="4" stroke-linecap="round"/>` +
      diff(400, 172, 30, blinking(2), blinking(0.8)) +
      `<rect x="240" y="236" width="130" height="56" rx="6" fill="#ffd166"/><rect x="430" y="236" width="130" height="56" rx="6" fill="#ffd166"/>` +
      head(280, 266, '#8ac926') +
      head(330, 270, '#ff9f43') +
      diff(460, 264, 18, head(460, 266, '#3ae0ff'), head(460, 266, '#ff6b8b')) +
      head(520, 268, '#8ac926') +
      diff(400, 320, 24, `<rect x="388" y="300" width="24" height="40" rx="3" fill="#3a86ff"/>`, `<rect x="388" y="300" width="24" height="40" rx="3" fill="#8338ec"/>`) +
      // Parked ships
      rocket(80, 340, '#f1f1f1', '#3a86ff') +
      diff(80, 284, 18, '', `<circle cx="80" cy="284" r="7" fill="#ffd166" stroke="#3d4a55" stroke-width="3"/>`) +
      diff(720, 320, 24, ufo(720, 316), ufo(720, 316, '#9b7bff', '#3ae0ff')) +
      // Terrace
      `<rect x="128" y="360" width="4" height="60" fill="#3d4a55"/>` +
      diff(130, 357, 41, parasol(130, 420, '#ff6b8b'), parasol(130, 420, '#8ac926')) +
      table(130, 420) +
      alien(80, 430, '#ff9f43', 2) +
      table(680, 400) +
      diff(680, 360, 18, steam(680, 368), '') +
      alien(730, 410, '#3ae0ff') +
      diff(200, 414, 30, rolling(10), rolling(5), 'waiter') +
      alienPlant(600, 350) +
      helmet(250, 350) +
      toolbox(480, 460) +
      fuelCanister(140, 455) +
      crystal(700, 455) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['asteroid', 214, 134],
        ['sparkle', 702, 36],
        ['probe', 539, 153],
        ['spaceStar', 707, 256],
        ['ringPlanet', 63, 58],
        ['asteroid', 417, 46],
        ['fuelCanister', 515, 432],
        ['helmet', 84, 456],
        ['toolbox', 678, 439],
        ['beacon', 583, 399],
      ])
    )
  },
})
