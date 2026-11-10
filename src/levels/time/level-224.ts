import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { around, bench, bin, buoy, cloud, dog, duck, DUSK, flowerBox, glow, lampHead, lampPost, moon, oak, pane, person, pigeon, pot, rowboat, sky, stars, sun } from './shapes.ts'

const HOUSES = ['#e07a5f', '#f2cc8f', '#81b29a', '#e9c46a', '#bdb2ff', '#8ecae6']

/** Far bank house i: x0 = 5 + 133·i, 125 wide, wall from `top` to 240 under a 30 high gable. */
const farHouse = (i: number) => {
  const x0 = 5 + i * 133
  const top = 150 + (i % 2) * 16
  return `<rect x="${x0}" y="${top}" width="125" height="${240 - top}" fill="${HOUSES[i]}"/>` +
    `<path d="M${x0 - 6} ${top + 2}L${x0 + 62} ${top - 30}L${x0 + 131} ${top + 2}Z" fill="#7a4e33"/>`
}

export default svgLevel({
  id: 224,
  chapter: 'time',
  title: 'riverTown',
  pair: 'day-night',
  parTimeSec: 140,
  scene: ({ diff, time, trap, extra, anim }) => {
    let houses = ''
    for (let i = 0; i < 6; i++) {
      const x0 = 5 + i * 133
      const top = 150 + (i % 2) * 16
      houses += farHouse(i) + pane(x0 + 18, top + 22, 22, 26)
      if (i !== 0) houses += pane(x0 + 85, top + 22, 22, 26)
      if (i !== 3) houses += `<rect x="${x0 + 52}" y="216" width="20" height="24" fill="#6b4f3a"/>`
    }
    let rail = ''
    for (let x = 20; x < 800; x += 40) if (x !== 460) rail += `<rect x="${x - 3}" y="400" width="6" height="24" fill="#5c677d"/>`
    return (
      sky(time(false, true), 240) +
      houses +
      diff(...around(87, 169, 115, 201), pane(90, 172, 22, 26), '') +
      diff(...around(456, 216, 476, 240), `<rect x="456" y="216" width="20" height="24" fill="#6b4f3a"/>`, `<rect x="456" y="216" width="20" height="24" fill="#e63946"/>`) +
      diff(...around(621, 116, 643, 144), `<rect x="624" y="118" width="16" height="26" fill="#9c4a3a"/><rect x="621" y="116" width="22" height="5" fill="#6b3a2e"/>`, '') +
      // River and the stone bridge
      `<rect y="240" width="800" height="160" fill="#5aa9d6"/><path d="M0 300q40 -6 80 0t80 0M520 360q40 -6 80 0t80 0" stroke="#ffffff" stroke-opacity="0.4" stroke-width="3" fill="none"/>` +
      `<rect x="190" y="282" width="420" height="48" fill="#b5a58a"/>` +
      [280, 400, 520].map((x) => `<ellipse cx="${x}" cy="330" rx="44" ry="40" fill="#5aa9d6"/>`).join('') +
      `<rect x="170" y="262" width="460" height="20" fill="#c9b99c"/><rect x="170" y="252" width="460" height="10" fill="#a8977a"/>` +
      lampPost(260, 254) +
      lampPost(400, 254) +
      lampPost(540, 254) +
      diff(...around(543, 198, 565, 214), `<path d="M543 200h20l-4 6l4 6h-20Z" fill="#e63946"/>`, `<path d="M543 200h20l-4 6l4 6h-20Z" fill="#3a86ff"/>`) +
      diff(...around(260, 356, 340, 376), rowboat(300, 370, '#ffb703'), rowboat(300, 370, '#2a9d8f')) +
      diff(...around(590, 328, 610, 358), buoy(600, 350), buoy(600, 350, '#ffffff')) +
      // Promenade
      `<rect y="400" width="800" height="100" fill="#d8c08f"/>` +
      `<rect y="398" width="800" height="5" fill="#5c677d"/>` +
      rail +
      diff(...around(457, 400, 463, 424), `<rect x="457" y="400" width="6" height="24" fill="#5c677d"/>`, '') +
      oak(80, 470, 0.9) +
      diff(...around(170, 440, 230, 470), bench(200, 470), bench(200, 470, '#e63946')) +
      person(320, 490, '#e76f51') +
      diff(...around(538, 454, 582, 480), dog(560, 480), dog(560, 480, '#f2f2f2')) +
      person(640, 488, '#3a86ff', true) +
      lampPost(700, 480) +
      time(lampHead(260, 254, false) + lampHead(540, 254, false), '') +
      // Decor: the same at both moments, darkened by the evening with the rest
      cloud(450, 60, 0.6) +
      cloud(330, 100, 0.4) +
      flowerBox(167, 232, '#ff6b8b') +
      flowerBox(367, 216, '#ffd23f') +
      flowerBox(766, 232, '#ff6b8b') +
      duck(60, 330) +
      buoy(140, 380, '#ffb703') +
      buoy(400, 380, '#3a86ff') +
      duck(680, 270) +
      bin(20, 490) +
      pigeon(280, 490) +
      bench(400, 490, '#3a86ff') +
      bin(470, 490) +
      pigeon(740, 492, true) +
      pot(760, 490) +
      // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 304, 54],
        ['birds', 598, 51],
        ['birds', 73, 71],
      ]) +
      time('', DUSK) +
      time('', lampHead(260, 254, true) + lampHead(540, 254, true) + glow(155, 188, 22, 26) + glow(626, 172, 22, 26)) +
      trap(400, 154, 34, lampHead(400, 254, false), lampHead(400, 254, true), 'lights') +
      trap(300, 185, 22, '', glow(289, 172, 22, 26), 'lights') +
      trap(700, 380, 34, lampHead(700, 480, false), lampHead(700, 480, true), 'lights') +
      trap(730, 320, 30, '', `<path d="M700 300h60M710 316h40M716 332h28M724 346h12" stroke="#fff6c9" stroke-width="5" stroke-linecap="round" stroke-opacity="0.8"/>`, 'moon') +
      trap(180, 60, 40, '', stars(180, 60), 'stars') +
      trap(720, 60, 54, sun(720, 60), moon(720, 60), 'moon')
    )
  },
})
