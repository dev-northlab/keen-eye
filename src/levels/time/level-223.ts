import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { level223Redesign } from './level-223-redesign.ts'
import { around, bareTree, barrel, beehive, bird, birdHouse, birds, bucket, butterfly, chimney, cloud, crate, fence, grass, hen, house, icicles, logPile, oak, pane, person, picket, rabbit, roofSnow, sack, sky, small, smoke, snowCap, snowfall, snowman, squirrel, stones, winterPerson, winterSky } from './shapes.ts'

/** Apples in the crown of `oak(x, y, s)`. */
const apples = (x: number, y: number, s: number) =>
  [[-20, -56], [12, -74], [22, -50], [-4, -84], [-28, -42]].map(([dx, dy]) => `<circle cx="${x + dx * s}" cy="${y + dy * s}" r="4.5" fill="#e63946"/>`).join('')

/** Scarecrow on a pole; (x, y) = foot. Its hat is `strawHat`. Bounds: x ±30, y from −90 to 0. */
const scarecrow = (x: number, y: number) =>
  `<path d="M${x} ${y}V${y - 80}M${x - 30} ${y - 60}h60" stroke="#8a5a33" stroke-width="5"/>` +
  `<path d="M${x - 16} ${y - 66}h32l4 34h-40Z" fill="#457b9d"/><circle cx="${x}" cy="${y - 76}" r="10" fill="#f2c14e"/>`

/** Hat of `scarecrow(x, y)`. Bounds: x ±14, y from −92 to −80. */
const strawHat = (x: number, y: number, color: string) => `<path d="M${x - 14} ${y - 82}h28M${x - 8} ${y - 82}q8 -14 16 0" stroke="${color}" stroke-width="4" fill="${color}"/>`

/** Wheelbarrow, faces right; (x, y) = ground under the wheel. Bounds: x from −70 to +8, y from −36 to 0. */
const wheelbarrow = (x: number, y: number, color: string) =>
  `<path d="M${x - 70} ${y - 26}L${x - 50} ${y - 20}" stroke="#6b4f3a" stroke-width="4"/><path d="M${x - 56} ${y - 34}h46l-10 22h-30Z" fill="${color}"/>` +
  `<circle cx="${x}" cy="${y - 8}" r="8" fill="#3d4a55"/><path d="M${x - 14} ${y - 18}L${x} ${y - 8}" stroke="#6b4f3a" stroke-width="3"/>`

export default svgLevel({
  id: 223,
  chapter: 'time',
  title: 'orchardHives',
  pair: 'summer-winter',
  parTimeSec: 135,
  redesign: level223Redesign,
  scene: ({ diff, time, trap, extra, anim }) => {
    const winter = time(false, true)
    // Two apple trees that change on their own; the middle one is the trap.
    const tree = (x: number, y: number, s: number) => (winter ? bareTree(x, y, s * 0.9) : oak(x, y, s) + apples(x, y, s))
    let rungs = ''
    for (const y of [315, 300, 270, 255]) rungs += `<path d="M${160 + (330 - y) * 0.22} ${y}h22" stroke="#a0703f" stroke-width="3"/>`
    return (
      time(sky(false, 280), winterSky(280)) +
      `<path d="M0 290Q200 240 420 280T800 270V300H0Z" fill="${time('#86b85a', '#e4edf4')}"/>` +
      `<rect y="290" width="800" height="210" fill="${time('#9ccc65', '#f4f8fb')}"/>` +
      tree(90, 330, 1.1) +
      tree(400, 330, 1.1) +
      `<path d="M150 330l20 -90M172 330l20 -90" stroke="#a0703f" stroke-width="4"/>` +
      rungs +
      diff(...around(158, 281, 184, 289), `<path d="M160.7 285h22" stroke="#a0703f" stroke-width="3"/>`, '') +
      trap(250, 272, 50, oak(250, 320, 1) + apples(250, 320, 1), bareTree(250, 320, 0.9), 'leaves') +
      // Shed
      chimney(690, 205, '#7a5236') +
      house(640, 330, 160, 110, 50, '#a0703f', '#5a3d2b') +
      time('', roofSnow(640, 170, 92, 52) + snowCap(680, 167, 20)) +
      diff(...around(577, 247, 613, 283), pane(580, 250, 30, 30), '') +
      diff(...around(650, 270, 690, 330), `<rect x="650" y="270" width="40" height="60" fill="#5a3d2b"/>`, `<rect x="650" y="270" width="40" height="60" fill="#2a9d8f"/>`) +
      trap(700, 230, 20, '', icicles(548, 732, 222), 'icicles') +
      trap(712, 145, 28, '', smoke(695, 173), 'smoke') +
      diff(...around(739, 252, 771, 330), birdHouse(755, 330, '#e07a5f'), birdHouse(755, 330, '#3a86ff')) +
      // Apiary
      small(110, 440, beehive(110, 440, '#f4d35e')) +
      diff(...around(166, 382, 214, 440), small(190, 440, beehive(190, 440, '#f4d35e')), small(190, 440, beehive(190, 440, '#8ecae6'))) +
      small(270, 440, beehive(270, 440, '#f4d35e')) +
      time('', snowCap(86, 384, 48) + snowCap(166, 384, 48) + snowCap(246, 384, 48)) +
      scarecrow(480, 420) +
      diff(...around(466, 328, 494, 346), strawHat(480, 420, '#e9c46a'), strawHat(480, 420, '#e63946')) +
      diff(...around(350, 434, 428, 470), wheelbarrow(420, 470, '#e63946'), wheelbarrow(420, 470, '#3a86ff')) +
      fence(520, 10, 480, '#e9d3a7', 22, [5]) +
      diff(...around(630, 436, 640, 480), picket(630, 480), '') +
      diff(...around(726, 436, 754, 470), barrel(740, 470), barrel(740, 470, '#2f6e8c')) +
      trap(300, 432, 44, '', snowman(300, 474), 'snowman') +
      trap(540, 434, 39, person(540, 470, '#8ac926'), winterPerson(540, 470, '#e76f51'), 'clothes') +
      trap(420, 80, 32, birds(420, 80), '', 'birds') +
      // Decor: the same in both seasons, snowed on in winter (grass and butterflies only in summer)
      cloud(150, 80, 0.6) +
      cloud(600, 80, 0.5) +
      cloud(300, 150, 0.4) +
      cloud(780, 60, 0.4) +
      squirrel(20, 330) +
      rabbit(510, 285) +
      bird(610, 188, '#e63946') +
      logPile(270, 375) +
      time('', snowCap(255, 343, 30)) +
      sack(320, 370) +
      time('', snowCap(310, 347, 20)) +
      crate(600, 395, 26) +
      time('', snowCap(587, 369, 26)) +
      bucket(700, 395) +
      time('', snowCap(684, 369, 32)) +
      hen(40, 470) +
      time(butterfly(340, 320) + grass(560, 360) + stones(235, 490), '') +
      // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 130, 185],
        ['birds', 501, 171],
        ['birds', 697, 51],
      ]) +
      time('', snowfall(223, 290, 44))
    )
  },
})
