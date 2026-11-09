// Motion differences: the gull flies faster on picture B; the crab scuttles faster on B; the ball bounces only on B.
import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level061Redesign } from './level-061-redesign.ts'
import { bottleMessage, bucket, castleFlag, cloud, coconut, crab, flipFlops, gull, palm, parasol, person, sailboat, sandBits, sandcastle, shell, starfish, sun, sunglasses, sunHat, towel, waves } from './shapes.ts'

/** Beach ball; (x, y) = center. Bounds: radius 11. */
const ball = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="10" fill="#e63946"/><path d="M${x - 10} ${y}a10 10 0 0 0 20 0Z" fill="#3a86ff"/><path d="M${x - 7} ${y - 7}a10 10 0 0 1 14 0Z" fill="#ffd166"/>`

export default svgLevel({
  id: 61,
  chapter: 'sea',
  title: 'beach',
  parTimeSec: 130,
  redesign: level061Redesign,
  scene: ({ diff, anim, rand, extra }) => {
    const soaring = (period: number) => anim({ id: 'gull', type: 'path', points: [[0, 0], [160, -20], [300, 0]], period }, gull(200, 90))
    const scuttling = (period: number) => anim({ id: 'crab', type: 'path', points: [[0, 0], [80, 0]], period }, crab(560, 470))
    const beachBall = ball(400, 440)

    return (
      `<rect width="800" height="500" fill="#bfe6f7"/>` +
      sun(680, 70) +
      anim({ type: 'path', points: [[0, 0], [60, 0]], period: 30 }, cloud(120, 60, 0.8)) +
      diff(200, 90, 20, soaring(10), soaring(5), 'gull') +
      `<rect y="200" width="800" height="140" fill="#3ba7cc"/>` +
      anim({ type: 'bob', dx: 12, dy: 0, period: 4 }, waves(210, 10, 100, '#5cc0de', 340)) +
      sailboat(640, 250, '#e63946') +
      // Sand
      `<path d="M0 320Q200 300 400 325T800 315V500H0Z" fill="#f2d79e"/>` +
      sandBits(rand, 340, 490) +
      palm(60, 340, 1.1) +
      palm(760, 350, 0.9, true) +
      diff(200, 346, 42, parasol(200, 400, '#e63946'), parasol(200, 400, '#8ac926')) +
      diff(240, 420, 32, towel(240, 420, '#3a86ff'), towel(240, 420, '#ff006e')) +
      parasol(620, 420, '#ffb703') +
      towel(660, 440, '#8338ec') +
      person(150, 460, '#ffb703') +
      diff(720, 455, 20, person(720, 490, '#2a9d8f', true), person(720, 490, '#e63946', true)) +
      sandcastle(400, 400) +
      diff(418, 342, 18, castleFlag(400, 400, '#e63946'), castleFlag(400, 400, '#3a86ff')) +
      bucket(450, 400) +
      diff(400, 440, 18, beachBall, anim({ id: 'ball', type: 'bob', dx: 0, dy: 6, period: 0.9 }, beachBall), 'ball') +
      diff(560, 461, 22, scuttling(7), scuttling(3.5), 'crab') +
      diff(300, 470, 18, starfish(300, 470), '') +
      starfish(720, 470, '#ff6b8b') +
      diff(500, 470, 18, shell(500, 476), shell(500, 476, '#b38cff')) +
      shell(120, 490, '#ff8f6b') +
      shell(340, 490) +
      sunglasses(305, 412) +
      flipFlops(505, 412) +
      sunHat(565, 398) +
      coconut(85, 345) +
      bottleMessage(440, 332) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['clam', 76, 434],
        ['flipFlops', 698, 372],
        ['sunglasses', 545, 378],
        ['rock', 353, 353],
        ['coconut', 177, 459],
        ['fish', 593, 228, '#4dabf7'],
        ['bottle', 194, 269],
        ['buoy', 374, 228],
        ['gull', 84, 99],
        ['gull', 564, 65],
      ])
    )
  },
})
