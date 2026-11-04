import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { around, bareTree, bench, bin, birdHouse, bush, butterfly, cloud, dog, duck, flowers, grass, hangingSign, lilyPad, oak, person, pigeon, pine, pineSnow, pond, reeds, rock, signpost, sky, small, snowCap, snowfall, snowman, squirrel, winterPerson, winterSky } from './shapes.ts'

/** Gazebo; (x, y) = ground center. Its spire ball is apart. Bounds: x ±70, y from −130 to 0. */
const gazebo = (x: number, y: number) =>
  `<rect x="${x - 60}" y="${y - 30}" width="120" height="30" fill="#e9d3a7"/>` +
  `<path d="M${x - 50} ${y - 80}V${y - 30}M${x - 17} ${y - 80}V${y - 30}M${x + 17} ${y - 80}V${y - 30}M${x + 50} ${y - 80}V${y - 30}" stroke="#ffffff" stroke-width="6"/>` +
  `<path d="M${x - 70} ${y - 80}L${x} ${y - 130}L${x + 70} ${y - 80}Z" fill="#2f6e8c"/><path d="M${x} ${y - 130}v-6" stroke="#3d4a55" stroke-width="3"/>`

/** Pram, faces right; (x, y) = ground center. Bounds: x from −24 to +26, y from −36 to 0. */
const pram = (x: number, y: number, color: string) =>
  `<path d="M${x - 20} ${y - 30}a20 16 0 0 0 40 0Z" fill="${color}"/><path d="M${x - 20} ${y - 30}a20 20 0 0 1 20 -6v6Z" fill="${color}" fill-opacity="0.7"/>` +
  `<path d="M${x + 20} ${y - 30}l6 -6" stroke="#3d4a55" stroke-width="3"/><circle cx="${x - 12}" cy="${y - 5}" r="5" fill="#3d4a55"/><circle cx="${x + 12}" cy="${y - 5}" r="5" fill="#3d4a55"/>`

export default svgLevel({
  id: 225,
  chapter: 'time',
  title: 'parkPond',
  pair: 'summer-winter',
  parTimeSec: 140,
  scene: ({ diff, time, trap, rand, extra, anim }) => {
    let skyline = ''
    for (let x = -10; x < 800; x += 50 + rand() * 30) {
      const h = 40 + rand() * 70
      skyline += `<rect x="${x.toFixed(0)}" y="${(230 - h).toFixed(0)}" width="${(40 + rand() * 30).toFixed(0)}" height="${h.toFixed(0)}" fill="#b8c4d6"/>`
    }
    return (
      time(sky(false, 230), winterSky(230)) +
      skyline +
      `<rect y="230" width="800" height="270" fill="${time('#8fc25a', '#f4f8fb')}"/>` +
      pond(420, 330, 200, 55, time(false, true)) +
      time('', small(380, 330, winterPerson(380, 330, '#e63946', true)) + small(470, 350, winterPerson(470, 350, '#3a86ff'))) +
      gazebo(130, 330) +
      time('', snowCap(56, 244, 148)) +
      diff(...around(124, 186, 136, 198), `<circle cx="130" cy="192" r="6" fill="#ffd23f"/>`, `<circle cx="130" cy="192" r="6" fill="#e63946"/>`) +
      // Kiosk
      `<rect x="640" y="260" width="80" height="70" fill="#f4a261"/><path d="M630 262h100l-10 -20h-80Z" fill="#9c4a3a"/>` +
      `<rect x="672" y="276" width="40" height="22" fill="#bde3f2"/>` +
      time('', snowCap(632, 238, 96)) +
      diff(...around(645, 295, 665, 330), `<rect x="645" y="295" width="20" height="35" fill="#6b4f3a"/>`, `<rect x="645" y="295" width="20" height="35" fill="#2a9d8f"/>`) +
      `<path d="M720 270h10" stroke="#3d4a55" stroke-width="2"/>` +
      diff(...around(706, 270, 754, 312), hangingSign(730, 270, '#2f6e8c', 'cup'), hangingSign(730, 270, '#2f6e8c', 'bread')) +
      trap(560, 232, 56, oak(560, 290, 1.1), bareTree(560, 290, 1.0), 'leaves') +
      trap(420, 330, 40, `<path d="M390 334q10 -5 20 0t20 0" stroke="#ffffff" stroke-opacity="0.6" stroke-width="3" fill="none"/>`, '', 'ice') +
      trap(300, 320, 28, small(290, 326, duck(290, 326)) + small(322, 316, duck(322, 316)), '', 'birds') +
      trap(130, 360, 26, flowers(118, 372, '#ff6b8b') + flowers(150, 374, '#ffd23f'), '', 'flowers') +
      diff(...around(20, 408, 72, 470), signpost(46, 470, 1), signpost(46, 470, -1)) +
      diff(...around(170, 440, 230, 470), bench(200, 470), bench(200, 470, '#3a86ff')) +
      time('', snowCap(167, 436, 66)) +
      diff(...around(280, 452, 300, 480), bin(290, 480, '#5c8d5a'), bin(290, 480, '#ffb703')) +
      trap(260, 384, 39, person(260, 420, '#ff9f43'), winterPerson(260, 420, '#8338ec'), 'clothes') +
      diff(...around(396, 440, 446, 476), pram(421, 476, '#ff6b8b'), pram(421, 476, '#4dabf7')) +
      trap(500, 420, 44, '', snowman(500, 464), 'snowman') +
      diff(...around(538, 454, 582, 480), dog(560, 480), dog(560, 480, '#3d3d3d')) +
      diff(...around(739, 392, 771, 470), birdHouse(755, 470, '#e07a5f'), birdHouse(755, 470, '#8ac926')) +
      // Decor: the same in both seasons, snowed on in winter (grass and butterflies only in summer)
      cloud(300, 60, 0.6) +
      cloud(600, 50, 0.5) +
      cloud(450, 100, 0.4) +
      pine(25, 330, 0.6) +
      time('', pineSnow(25, 330, 0.6)) +
      squirrel(40, 370) +
      bush(250, 270, 0.7) +
      time('', snowCap(236, 254, 28)) +
      bench(400, 275) +
      time('', snowCap(370, 245, 60)) +
      reeds(232, 310) +
      rock(350, 490, 0.8) +
      time('', snowCap(338, 478, 24)) +
      pigeon(640, 420) +
      bench(650, 480) +
      time('', snowCap(620, 450, 60)) +
      time(lilyPad(540, 320) + lilyPad(600, 350, '#ff6b8b') + butterfly(330, 410) + grass(125, 495), '') +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 534, 91],
        ['birds', 106, 100],
        ['birds', 315, 120],
      ]) +
      time('', snowfall(225, 240, 44))
    )
  },
})
