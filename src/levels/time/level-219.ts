import { svgLevel } from '../helpers.ts'
import { around, bareTree, buoy, canoe, chimney, door, duck, house, kennel, lifeRing, mountains, oak, pane, person, pier, pine, pineSnow, pond, roofSnow, sky, small, smoke, snowfall, snowman, vane, winterPerson, winterSky } from './shapes.ts'

/** Picnic table; (x, y) = ground center. Bounds: x ±30, y from −30 to 0. */
const picnicTable = (x: number, y: number, color: string) =>
  `<rect x="${x - 30}" y="${y - 30}" width="60" height="8" rx="2" fill="${color}"/><path d="M${x - 22} ${y - 22}l-6 22M${x + 22} ${y - 22}l6 22" stroke="${color}" stroke-width="5"/>` +
  `<rect x="${x - 28}" y="${y - 12}" width="56" height="5" rx="2" fill="${color}"/>`

export default svgLevel({
  id: 219,
  chapter: 'time',
  title: 'lakeCottage',
  pair: 'summer-winter',
  parTimeSec: 125,
  scene: ({ diff, time, trap, rand }) => {
    let pines = ''
    let pinesSnow = ''
    for (let x = 220; x < 800; x += 44 + rand() * 20) {
      const s = 0.6 + rand() * 0.3
      pines += pine(x, 268, s, '#2f6e4c')
      pinesSnow += pineSnow(x, 268, s)
    }
    return (
      time(sky(false, 230), winterSky(230)) +
      mountains(240, time(false, true)) +
      `<rect y="240" width="800" height="260" fill="${time('#8fc25a', '#f4f8fb')}"/>` +
      pines +
      time('', pinesSnow) +
      pond(450, 330, 270, 62, time(false, true)) +
      // Cottage
      chimney(165, 274) +
      house(110, 400, 160, 110, 60, '#e07a5f', '#5a3d2b') +
      time('', roofSnow(110, 230, 92, 62)) +
      pane(50, 320, 30, 30) +
      diff(...around(137, 317, 173, 353), pane(140, 320, 30, 30), '') +
      diff(...around(94, 354, 126, 400), door(110, 400, '#3a86ff'), door(110, 400, '#ffb703')) +
      diff(...around(90, 184, 130, 230), vane(110, 230, 1), vane(110, 230, -1)) +
      trap(186, 214, 28, '', smoke(170, 242), 'smoke') +
      diff(...around(200, 350, 260, 400), kennel(230, 400), kennel(230, 400, '#8338ec')) +
      diff(...around(320, 298, 340, 328), buoy(330, 320), buoy(330, 320, '#2a9d8f')) +
      pier(560, 690, 366) +
      `<rect x="596" y="380" width="8" height="40" fill="#6b4f3a"/>` +
      diff(...around(586, 366, 614, 394), lifeRing(600, 380), '') +
      diff(...around(256, 428, 344, 444), canoe(300, 440, '#e63946'), canoe(300, 440, '#2a9d8f')) +
      diff(...around(450, 420, 510, 450), picnicTable(480, 450, '#a0703f'), picnicTable(480, 450, '#e9c46a')) +
      trap(480, 320, 40, `<path d="M450 322q10 -5 20 0t20 0" stroke="#ffffff" stroke-opacity="0.6" stroke-width="3" fill="none"/>`,
        `<path d="M452 330l40 -14" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>`, 'ice') +
      trap(600, 320, 30, small(586, 330, duck(586, 330)) + small(618, 318, duck(618, 318)), '', 'birds') +
      trap(720, 362, 62, oak(720, 420, 1.2), bareTree(720, 420, 1.1), 'leaves') +
      trap(400, 430, 44, '', snowman(400, 474), 'snowman') +
      trap(560, 436, 38, person(560, 474, '#ff9f43'), winterPerson(560, 474, '#3a86ff', false, '#2a9d8f'), 'clothes') +
      small(640, 480, person(640, 480, '#ffd23f', true)) +
      time('', snowfall(219, 260, 40))
    )
  },
})
