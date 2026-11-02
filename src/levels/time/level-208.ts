import { svgLevel } from '../helpers.ts'
import { bareTree, birdHouse, cabin, chimney, cloud, mushroom, oak, pine, pineSnow, pond, rock, signpost, sky, smoke, snowCap, snowfall, stump, winterSky } from './shapes.ts'

export default svgLevel({
  id: 208,
  chapter: 'time',
  title: 'snowForest',
  pair: 'summer-winter',
  parTimeSec: 85,
  scene: ({ diff, time, trap, rand }) => {
    let back = ''
    let backSnow = ''
    for (let x = 10; x < 800; x += 50 + rand() * 24) {
      const s = 0.8 + rand() * 0.5
      back += pine(x, 280, s, '#2f6e4c')
      backSnow += pineSnow(x, 280, s)
    }
    return (
      time(sky(false, 280), winterSky(280)) +
      cloud(620, 60, 0.6) +
      back +
      time('', backSnow) +
      `<rect y="280" width="800" height="220" fill="${time('#7cb35a', '#f4f8fb')}"/>` +
      // Forest cabin
      cabin(250, 360, 170, 100) +
      chimney(300, 226, '#7a5236') +
      time('', snowCap(166, 254, 168) + snowCap(290, 190, 20)) +
      diff(210, 310, 24, `<rect x="196" y="296" width="28" height="28" fill="#f4efe6"/><rect x="199" y="299" width="22" height="22" fill="#bde3f2"/>`, '') +
      diff(285, 337, 26, `<rect x="270" y="314" width="30" height="46" fill="#5a3d2b"/>`, `<rect x="270" y="314" width="30" height="46" fill="#2f6e8c"/>`) +
      trap(322, 168, 34, '', smoke(305, 192), 'smoke') +
      pine(80, 400, 1.3) +
      trap(80, 340, 40, '', pineSnow(80, 400, 1.3), 'snow') +
      trap(560, 300, 64, oak(560, 360, 1.25), bareTree(560, 360, 1.15), 'leaves') +
      trap(640, 440, 56, pond(640, 440, 120, 34, false), pond(640, 440, 120, 34, true), 'ice') +
      diff(420, 352, 42, birdHouse(420, 392), birdHouse(420, 392, '#3a86ff')) +
      diff(150, 440, 42, signpost(150, 471, 1), signpost(150, 471, -1)) +
      diff(330, 455, 24, stump(330, 466), '') +
      diff(470, 465, 24, rock(470, 474, 0.9), '') +
      trap(250, 470, 26, mushroom(240, 485) + mushroom(262, 488, '#ff9f43', 0.8), '', 'flowers') +
      time('', snowfall(208, 290, 36))
    )
  },
})
