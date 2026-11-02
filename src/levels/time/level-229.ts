import { svgLevel } from '../helpers.ts'
import { around, bareTree, bench, birdHouse, chimney, flowers, house, icicles, mountains, oak, pane, person, pine, pineSnow, pond, roofSnow, signBoard, signpost, sky, smoke, snowCap, snowfall, vane, winterPerson, winterSky } from './shapes.ts'

/** Height of the cable at x. */
const cableY = (x: number) => 100 + 0.1625 * x

/** Cable-car cabin hanging from the cable at x. Bounds: x ±15, y from cableY(x) to cableY(x) + 44. */
const cabin = (x: number, color: string) => {
  const y = cableY(x)
  return `<path d="M${x} ${y}v18" stroke="#3d4a55" stroke-width="2.5"/><rect x="${x - 15}" y="${y + 18}" width="30" height="26" rx="5" fill="${color}"/>` +
    `<rect x="${x - 10}" y="${y + 22}" width="20" height="10" rx="2" fill="#bde3f2"/>`
}

/** Pylon of the cable car standing at x. */
const pylon = (x: number) => `<path d="M${x - 16} 300L${x - 3} ${cableY(x)}h6L${x + 16} 300Z" fill="#8d99ae"/>`

export default svgLevel({
  id: 229,
  chapter: 'time',
  title: 'cableCar',
  pair: 'summer-winter',
  parTimeSec: 150,
  scene: ({ diff, time, trap }) => {
    let logs = ''
    for (let row = 0; row < 3; row++)
      for (let col = 0; col < 4; col++) if (row !== 2 || col !== 3) logs += `<circle cx="${320 + col * 10}" cy="${414 - row * 12}" r="6" fill="#c9a06c" stroke="#8a5a33" stroke-width="2"/>`
    return (
      time(sky(false, 300), winterSky(300)) +
      mountains(300, time(false, true)) +
      `<rect y="300" width="800" height="200" fill="${time('#8fc25a', '#f4f8fb')}"/>` +
      pylon(250) +
      pylon(560) +
      `<path d="M0 100L800 230" stroke="#3d4a55" stroke-width="2.5"/>` +
      cabin(150, '#ffb703') +
      diff(...around(385, 165, 415, 209), cabin(400, '#e63946'), cabin(400, '#2a9d8f')) +
      diff(...around(665, 210, 695, 255), cabin(680, '#ffb703'), '') +
      pine(740, 380, 1.3) +
      time('', pineSnow(740, 380, 1.3)) +
      // Lodge
      chimney(250, 278, '#7a5236') +
      house(180, 420, 220, 120, 70, '#a0703f', '#5a3d2b') +
      time('', roofSnow(180, 230, 122, 72) + snowCap(240, 240, 20)) +
      pane(90, 330, 36, 36) +
      diff(...around(147, 327, 189, 369), pane(150, 330, 36, 36), '') +
      diff(...around(224, 374, 256, 420), `<rect x="224" y="374" width="32" height="46" fill="#5a3d2b"/>`, `<rect x="224" y="374" width="32" height="46" fill="#e63946"/>`) +
      diff(...around(150, 266, 210, 290), signBoard(180, 278, 60, '#2f6e8c'), signBoard(180, 278, 60, '#ffb703')) +
      diff(...around(160, 184, 200, 230), vane(180, 230, 1), vane(180, 230, -1)) +
      trap(272, 218, 28, '', smoke(255, 246), 'smoke') +
      trap(90, 310, 20, '', icicles(58, 302, 302), 'icicles') +
      logs +
      time('', snowCap(312, 384, 36)) +
      diff(...around(343, 383, 357, 397), `<circle cx="350" cy="390" r="6" fill="#c9a06c" stroke="#8a5a33" stroke-width="2"/>`, '') +
      diff(...around(404, 322, 436, 400), birdHouse(420, 400, '#e07a5f'), birdHouse(420, 400, '#8338ec')) +
      trap(600, 282, 50, oak(600, 330, 1.0), bareTree(600, 330, 0.95), 'leaves') +
      trap(300, 470, 26, pond(300, 470, 60, 16, false), pond(300, 470, 60, 16, true), 'ice') +
      diff(...around(494, 408, 546, 470), signpost(520, 470, -1), signpost(520, 470, 1)) +
      diff(...around(620, 440, 680, 470), bench(650, 470), bench(650, 470, '#e63946')) +
      time('', snowCap(617, 436, 66)) +
      trap(740, 434, 39, person(740, 470, '#2a9d8f', true), winterPerson(740, 470, '#ffb703', true, '#3a86ff'), 'clothes') +
      trap(60, 470, 26, flowers(60, 488, '#b38cff'), '', 'flowers') +
      time('', snowfall(229, 300, 46))
    )
  },
})
