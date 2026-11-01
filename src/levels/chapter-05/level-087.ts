// Motion differences: the big asteroid spins faster on picture B; the rocket flies faster on B; the sparkle twinkles only on B.
import { svgLevel } from '../helpers.ts'
import { asteroid, astronaut, flag, flame, planet, rocket, sparkle, star, starField } from './shapes.ts'

/** Crystals; (x, y) = bottom center. Bounds: x from −8 to +14, y from −24 to 0. */
const crystals = (x: number, y: number) => `<path d="M${x - 8} ${y}l4 -18l4 18ZM${x} ${y}l5 -24l5 24ZM${x + 8} ${y}l3 -14l3 14Z" fill="#3ae0ff"/>`

/** Rocket heading right with its flame, centered at (0, 0). Bounds: radius 40. */
const ship = `<g transform="rotate(90)">${rocket(0, 20, '#f1f1f1', '#ff9f43', 0.6)}${flame(0, 20, 0.6)}</g>`

export default svgLevel({
  id: 87,
  chapter: 'space',
  title: 'asteroidBelt',
  parTimeSec: 140,
  scene: ({ diff, anim, rand }) => {
    const spinning = (period: number) => anim({ type: 'rotate', pivot: [220, 170], period }, asteroid(220, 170, 2))
    const flying = (period: number) => anim({ id: 'ship', type: 'path', points: [[0, 0], [220, 0]], flipX: 140, period }, `<g transform="translate(140 440)">${ship}</g>`)
    const twinkle = sparkle(360, 80, 10)

    return (
      `<rect width="800" height="500" fill="#120f2e"/><ellipse cx="420" cy="260" rx="420" ry="90" fill="#9b7bff" fill-opacity="0.1" transform="rotate(-15 420 260)"/>` +
      starField(rand, 0, 500, 80) +
      diff(70, 70, 51, planet(70, 70, 50, '#e76f51'), planet(70, 70, 50, '#2a9d8f')) +
      diff(360, 80, 18, twinkle, anim({ type: 'blink', duty: 0.5, period: 1 }, twinkle)) +
      diff(740, 60, 18, star(740, 60, 9, '#ffd23f'), star(740, 60, 9, '#ff6b8b')) +
      anim({ type: 'rotate', pivot: [520, 60], period: 18 }, asteroid(520, 60, 0.8)) +
      asteroid(300, 190, 0.7, '#a08d7a') +
      anim({ type: 'rotate', pivot: [330, 300], period: 24, reverse: true }, asteroid(330, 300, 1.2)) +
      asteroid(760, 380, 1.4, '#a08d7a') +
      asteroid(420, 470, 0.9) +
      asteroid(690, 460, 1) +
      diff(220, 170, 37, spinning(14), spinning(5)) +
      diff(600, 110, 28, asteroid(600, 110, 1.5), asteroid(600, 110, 1.5, '#6a7b8d')) +
      diff(700, 260, 19, asteroid(700, 260, 1, '#a08d7a'), '') +
      // Flag rock
      asteroid(130, 330, 1.6) +
      diff(134, 263, 18, flag(122, 306, '#e63946'), flag(122, 306, '#ffd166')) +
      // Crystal rock
      asteroid(470, 250, 1.8, '#7d6b8d') +
      diff(473, 210, 18, crystals(470, 222), '') +
      // Miner
      asteroid(580, 400, 1.8) +
      diff(583, 330, 18, astronaut(580, 372, '#f1f1f1', '#ffb703'), astronaut(580, 372, '#f1f1f1', '#8ac926')) +
      diff(140, 440, 41, flying(9), flying(4.5), 'ship')
    )
  },
})
