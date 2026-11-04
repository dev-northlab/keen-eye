import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { around, bench, bin, bird, clockFace, cloud, door, DUSK, flowerBox, fountain, glow, hangingSign, lampHead, lampPost, moon, pane, parasol, person, pigeon, pot, sky, small, stars, sun } from './shapes.ts'

/** Café table; (x, y) = ground center. Bounds: x ±22, y from −36 to 0. */
const table = (x: number, y: number, color: string) =>
  `<ellipse cx="${x}" cy="${y - 32}" rx="22" ry="5" fill="${color}"/><path d="M${x} ${y - 30}V${y}M${x - 12} ${y}h24" stroke="#3d4a55" stroke-width="3"/>`

export default svgLevel({
  id: 226,
  chapter: 'time',
  title: 'oldTownSquare',
  pair: 'day-night',
  parTimeSec: 150,
  scene: ({ diff, time, trap, rand, extra, anim }) => {
    let cobbles = ''
    for (let i = 0; i < 46; i++) cobbles += `<ellipse cx="${(rand() * 800).toFixed(0)}" cy="${(310 + rand() * 185).toFixed(0)}" rx="9" ry="4" fill="#b8a585"/>`
    return (
      sky(time(false, true), 300) +
      // Left houses
      `<rect y="150" width="170" height="150" fill="#e07a5f"/><rect y="142" width="174" height="10" fill="#9c4a3a"/>` +
      pane(20, 180, 34, 40) +
      pane(110, 180, 34, 40) +
      pane(20, 240, 34, 40) +
      diff(...around(107, 237, 147, 283), pane(110, 240, 34, 40), '') +
      diff(...around(19, 220, 55, 238), flowerBox(37, 238, '#ff6b8b'), flowerBox(37, 238, '#ffd23f')) +
      `<rect x="170" y="130" width="180" height="170" fill="#f2cc8f"/><rect x="166" y="122" width="188" height="10" fill="#b5835a"/>` +
      pane(190, 160, 30, 36) +
      pane(250, 160, 30, 36) +
      pane(310, 160, 30, 36) +
      diff(...around(244, 254, 276, 300), door(260, 300, '#2f6e8c'), door(260, 300, '#e63946')) +
      // Clock tower
      `<rect x="360" y="70" width="80" height="230" fill="#d9c2a3"/><path d="M350 72L400 20L450 72Z" fill="#7a4e33"/>` +
      `<rect x="385" y="250" width="30" height="50" rx="12" fill="#6b4f3a"/>` +
      diff(...around(390, 165, 410, 185), `<circle cx="400" cy="175" r="10" fill="#f4efe6"/><circle cx="400" cy="175" r="7" fill="#bde3f2"/>`, '') +
      diff(...around(314, 210, 362, 252), hangingSign(338, 210, '#2a9d8f', 'bread'), hangingSign(338, 210, '#2a9d8f', 'fish')) +
      // Right houses
      `<rect x="450" y="140" width="180" height="160" fill="#81b29a"/><rect x="446" y="132" width="188" height="10" fill="#4f7f68"/>` +
      pane(470, 170, 30, 36) +
      pane(530, 170, 30, 36) +
      pane(590, 170, 30, 36) +
      pane(470, 236, 30, 36) +
      pane(590, 236, 30, 36) +
      diff(...around(527, 233, 563, 275), pane(530, 236, 30, 36), '') +
      `<rect x="630" y="160" width="170" height="140" fill="#bdb2ff"/><rect x="626" y="152" width="178" height="10" fill="#7d6fd1"/>` +
      pane(650, 190, 30, 36) +
      pane(740, 190, 30, 36) +
      diff(...around(689, 254, 721, 300), door(705, 300, '#ffb703'), door(705, 300, '#2a9d8f')) +
      // Square
      `<rect y="300" width="800" height="200" fill="#cbb89a"/>` +
      cobbles +
      fountain(400, 440, false) +
      diff(...around(433, 418, 457, 432), pigeon(445, 432), '') +
      parasol(600, 470, '#e63946') +
      table(540, 476, '#ffffff') +
      diff(...around(578, 434, 622, 470), table(600, 470, '#ffffff'), table(600, 470, '#ffb703')) +
      diff(...around(130, 440, 190, 470), bench(160, 470), bench(160, 470, '#3a86ff')) +
      person(240, 482, '#3a86ff') +
      person(500, 488, '#e76f51', true) +
      small(680, 486, person(680, 486, '#8ac926')) +
      lampPost(300, 470) +
      lampPost(700, 470) +
      // Decor: the same at both moments, darkened by the evening with the rest
      cloud(250, 60, 0.6) +
      cloud(520, 80, 0.5) +
      cloud(720, 120, 0.4) +
      bird(60, 142) +
      bird(300, 122, '#e63946') +
      bench(50, 380) +
      bin(110, 360) +
      pigeon(220, 360) +
      bench(530, 380, '#3a86ff') +
      pigeon(600, 380, true) +
      pot(630, 345) +
      pigeon(30, 480) +
      pot(80, 480, '#3a86ff') +
      pot(330, 492) +
      bin(780, 490) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 727, 62],
      ]) +
      time('', DUSK) +
      time('', glow(20, 180, 34, 40) + glow(250, 160, 30, 36) + glow(590, 170, 30, 36)) +
      trap(400, 110, 28, clockFace(400, 110, 22, 10, 10), clockFace(400, 110, 22, 8, 40), 'clock') +
      trap(205, 178, 24, '', glow(190, 160, 30, 36), 'lights') +
      trap(755, 208, 24, '', glow(740, 190, 30, 36), 'lights') +
      trap(300, 370, 34, lampHead(300, 470, false), lampHead(300, 470, true), 'lights') +
      trap(700, 370, 34, lampHead(700, 470, false), lampHead(700, 470, true), 'lights') +
      trap(600, 60, 40, '', stars(600, 60), 'stars') +
      trap(80, 70, 54, sun(80, 70), moon(80, 70), 'moon')
    )
  },
})
