import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { around, balloon, barrel, bench, bin, bird, bulbs, clockFace, cloud, crate, dog, door, DUSK, flowerBox, fruit, glow, lampHead, lampPost, moon, pane, person, pigeon, poster, pot, sack, sky, small, stall, stars, sun } from './shapes.ts'

export default svgLevel({
  id: 216,
  chapter: 'time',
  title: 'marketSquare',
  pair: 'day-night',
  parTimeSec: 120,
  scene: ({ diff, time, trap, rand, extra, anim }) => {
    let cobbles = ''
    for (let i = 0; i < 40; i++) cobbles += `<ellipse cx="${(rand() * 800).toFixed(0)}" cy="${(310 + rand() * 185).toFixed(0)}" rx="9" ry="4" fill="#b8a585"/>`
    return (
      sky(time(false, true), 300) +
      // Bakery, town hall and a guest house around the square
      `<rect y="130" width="240" height="170" fill="#e9c46a"/><rect y="122" width="244" height="10" fill="#b5835a"/>` +
      pane(30, 160, 36, 40) +
      pane(170, 160, 36, 40) +
      pane(30, 220, 36, 40) +
      pane(170, 220, 36, 40) +
      diff(...around(97, 157, 139, 203), pane(100, 160, 36, 40), '') +
      diff(...around(30, 202, 66, 220), flowerBox(48, 220, '#ff6b8b'), flowerBox(48, 220, '#4dabf7')) +
      `<rect x="260" y="110" width="280" height="190" fill="#d9c2a3"/><path d="M250 112L400 40L550 112Z" fill="#b5835a"/>` +
      pane(290, 140, 30, 50) +
      pane(350, 140, 30, 50) +
      pane(420, 140, 30, 50) +
      pane(480, 140, 30, 50) +
      diff(...around(384, 254, 416, 300), door(400, 300, '#7a3b22'), door(400, 300, '#2f6e8c')) +
      `<rect x="560" y="140" width="240" height="160" fill="#a8dadc"/><rect x="556" y="132" width="248" height="10" fill="#457b9d"/>` +
      pane(590, 170, 30, 36) +
      pane(660, 170, 30, 36) +
      pane(730, 170, 30, 36) +
      pane(590, 236, 30, 36) +
      pane(730, 236, 30, 36) +
      door(675, 300, '#457b9d') +
      `<rect y="300" width="800" height="200" fill="#cbb89a"/>` +
      cobbles +
      // Stalls
      stall(170, 420, '#e63946') +
      fruit(195, 376, '#ffb703') +
      diff(...around(129, 360, 161, 376), fruit(145, 376, '#e63946'), fruit(145, 376, '#8ac926')) +
      stall(400, 420, '#2a9d8f') +
      fruit(375, 376, '#ff9f43') +
      fruit(425, 376, '#b38cff') +
      diff(...around(380, 392, 420, 412), `<rect x="380" y="392" width="40" height="20" rx="3" fill="#2b2d42"/><path d="M386 402h28" stroke="#ffffff" stroke-width="2"/>`,
        `<rect x="380" y="392" width="40" height="20" rx="3" fill="#e63946"/><path d="M386 402h28" stroke="#ffffff" stroke-width="2"/>`) +
      stall(630, 420, '#ffb703') +
      fruit(605, 376, '#e63946') +
      diff(...around(639, 360, 671, 376), fruit(655, 376, '#ffd23f'), '') +
      person(240, 480, '#3a86ff') +
      small(306, 470, person(306, 470, '#ff6b8b')) +
      diff(...around(287, 374, 313, 434), balloon(300, 392, '#e63946'), balloon(300, 392, '#8338ec')) +
      person(470, 478, '#8338ec', true) +
      person(580, 486, '#e76f51') +
      diff(...around(498, 454, 542, 480), dog(520, 480), dog(520, 480, '#3d3d3d')) +
      lampPost(740, 470) +
      // Decor: the same at both moments, darkened by the evening with the rest
      cloud(250, 60, 0.5) +
      cloud(530, 50, 0.4) +
      bird(200, 122, '#e63946') +
      poster(280, 215, 26, 34, '#e63946') +
      poster(500, 215, 26, 34, '#3a86ff') +
      flowerBox(188, 280, '#ffd23f') +
      flowerBox(605, 292, '#ff6b8b') +
      flowerBox(745, 292, '#ffd23f') +
      bin(40, 400) +
      sack(520, 360) +
      crate(480, 415, 26) +
      barrel(560, 410) +
      bench(80, 480) +
      pot(400, 490) +
      pigeon(660, 490, true) +
      // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 726, 84],
      ]) +
      time('', DUSK) +
      time('', glow(290, 140, 30, 50) + glow(480, 140, 30, 50) + glow(30, 220, 36, 40)) +
      trap(400, 82, 26, clockFace(400, 82, 20, 8, 0), clockFace(400, 82, 20, 7, 30), 'clock') +
      trap(745, 188, 24, '', glow(730, 170, 30, 36), 'lights') +
      trap(244, 316, 24, bulbs(0, 300, 800, 300, 18, false), bulbs(0, 300, 800, 300, 18, true), 'lights') +
      trap(740, 370, 34, lampHead(740, 470, false), lampHead(740, 470, true), 'lights') +
      trap(620, 60, 40, '', stars(620, 60), 'stars') +
      trap(80, 70, 54, sun(80, 70), moon(80, 70), 'moon')
    )
  },
})
