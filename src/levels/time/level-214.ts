import { svgLevel } from '../helpers.ts'
import { bareTree, bench, bird, birdHouse, bush, cabin, chimney, cloud, fern, grass, hedgehog, lilyPad, logPile, mushroom, oak, pane, pine, pineSnow, rabbit, reeds, rock, roofSnow, signpost, sky, smoke, snowCap, snowfall, stones, stump, winterSky } from './shapes.ts'

/** Height of the bridge deck (a curve from x 330 to 470) at x. */
const deckY = (x: number) => {
  const t = (x - 330) / 140
  return 400 - 80 * t * (1 - t)
}

/** Bridge rail post at x, from the rail down to the deck. Bounds: x ±3, y from deckY − 26 to deckY. */
const post = (x: number) => `<rect x="${x - 3}" y="${deckY(x) - 26}" width="6" height="26" fill="#6b4f3a"/>`

export default svgLevel({
  id: 214,
  chapter: 'time',
  title: 'forestYear',
  pair: 'summer-winter',
  parTimeSec: 110,
  scene: ({ diff, time, trap, rand }) => {
    let back = ''
    let backSnow = ''
    for (let x = 30; x < 800; x += 60 + rand() * 30) {
      const s = 0.7 + rand() * 0.4
      back += pine(x, 262, s, '#2f6e4c')
      backSnow += pineSnow(x, 262, s)
    }
    return (
      time(sky(false, 260), winterSky(260)) +
      back +
      time('', backSnow) +
      `<rect y="260" width="800" height="240" fill="${time('#7cb35a', '#f4f8fb')}"/>` +
      // Creek, open in summer and frozen in winter
      `<path d="M0 370Q200 330 400 360T800 350V400Q600 420 400 410T0 425Z" fill="${time('#5aa9d6', '#cfe6f3')}"/>` +
      trap(180, 385, 34, `<path d="M150 384q10 -5 20 0t20 0" stroke="#ffffff" stroke-opacity="0.6" stroke-width="3" fill="none"/>`,
        `<path d="M156 392l40 -12" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>`, 'ice') +
      // Footbridge
      `<path d="M326 402Q400 356 474 402" stroke="#8a5a33" stroke-width="10" fill="none"/>` +
      `<path d="M330 374Q400 334 470 374" stroke="#a0703f" stroke-width="5" fill="none"/>` +
      post(350) +
      post(385) +
      post(450) +
      diff(420, 369, 20, post(420), '') +
      // Forester's hut
      cabin(640, 300, 120, 80) +
      chimney(670, 202, '#7a5236') +
      time('', roofSnow(640, 176, 70, 48) + snowCap(660, 168, 20)) +
      diff(606, 256, 22, pane(594, 244, 24, 24), '') +
      diff(663, 278, 28, `<rect x="650" y="256" width="26" height="44" fill="#5a3d2b"/>`, `<rect x="650" y="256" width="26" height="44" fill="#9c4a3a"/>`) +
      trap(690, 140, 32, '', smoke(675, 170), 'smoke') +
      pine(760, 330, 1.1) +
      trap(760, 260, 36, '', pineSnow(760, 330, 1.1), 'snow') +
      trap(130, 262, 62, oak(130, 320, 1.2), bareTree(130, 320, 1.2), 'leaves') +
      diff(470, 291, 43, birdHouse(470, 330, '#ffb703'), birdHouse(470, 330, '#e07a5f')) +
      diff(60, 440, 42, signpost(60, 471, -1), signpost(60, 471, 1)) +
      trap(250, 470, 26, mushroom(240, 485) + mushroom(262, 488, '#ff9f43', 0.8), '', 'flowers') +
      diff(330, 470, 22, stump(330, 481), '') +
      diff(520, 471, 22, rock(520, 478, 0.9), '') +
      diff(620, 460, 34, bench(620, 475), bench(620, 475, '#2f6e8c')) +
      time('', snowCap(588, 442, 64)) +
      rock(730, 470, 1.3) +
      // Decor: the same in both seasons, snowed on in winter (grass and butterflies only in summer)
      cloud(300, 70, 0.6) +
      cloud(520, 110, 0.4) +
      pine(30, 320, 0.6) +
      time('', pineSnow(30, 320, 0.6)) +
      bush(260, 290, 0.8) +
      time('', snowCap(243, 270, 34)) +
      logPile(330, 300) +
      time('', snowCap(315, 268, 30)) +
      rabbit(375, 320) +
      bird(560, 305, '#e63946') +
      reeds(290, 360) +
      time(fern(220, 330) + lilyPad(260, 380, '#ff6b8b') + lilyPad(560, 395), '') +
      stump(740, 440) +
      time('', snowCap(726, 420, 28)) +
      time(hedgehog(780, 450, true), '') +
      time(grass(150, 480) + stones(420, 480), '') +
      time('', snowfall(214, 270, 40))
    )
  },
})
