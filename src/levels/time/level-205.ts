import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { ball, bench, bin, bird, birdHouse, bucket, bush, butterfly, cat, cloud, dog, DUSK, flowers, glow, grass, lampHead, lampPost, laundry, moon, oak, pane, pigeon, pot, shirt, sky, slide, stars, stones, sun, swingFrame, swingSeat } from './shapes.ts'

export default svgLevel({
  id: 205,
  chapter: 'time',
  title: 'duskYard',
  pair: 'day-night',
  parTimeSec: 75,
  scene: ({ diff, time, trap, extra, anim }) => {
    // Apartment block: 6 columns × 4 floors of windows; one is a difference.
    let windows = ''
    for (let row = 0; row < 4; row++)
      for (let col = 0; col < 6; col++) if (row !== 1 || col !== 4) windows += pane(180 + col * 75, 80 + row * 52, 30, 34)
    return (
      sky(time(false, true), 300) +
      `<rect x="150" y="60" width="470" height="240" fill="#e8c9a0"/><rect x="144" y="52" width="482" height="10" fill="#b5835a"/>` +
      windows +
      diff(495, 149, 26, pane(480, 132, 30, 34), '') +
      `<rect x="370" y="250" width="40" height="50" fill="#6b4f3a"/>` +
      `<rect y="300" width="800" height="200" fill="#b9cf8f"/>` +
      `<rect x="40" y="420" width="180" height="50" fill="#e8d5a3" stroke="#a0703f" stroke-width="6"/>` +
      oak(240, 380, 1.1) +
      swingFrame(500, 440) +
      swingSeat(485, 350) +
      diff(515, 383, 37, swingSeat(515, 350, '#3a86ff'), '') +
      slide(80, 400) +
      diff(290, 460, 24, ball(290, 472), ball(290, 472, '#ffd23f')) +
      bench(620, 450) +
      diff(600, 410, 26, cat(600, 428), cat(600, 428, '#f2f2f2')) +
      `<path d="M690 300V360M780 300V360" stroke="#5c677d" stroke-width="3"/>` +
      laundry(690, 780, 306, ['#ff6b8b', null, '#4dabf7']) +
      diff(735, 325, 24, shirt(735, 312, '#ffd23f'), shirt(735, 312, '#8ac926')) +
      lampPost(350, 470) +
      // Decor: the same at both moments, darkened by the evening with the rest
      cloud(330, 30, 0.4) +
      bird(200, 52) +
      bush(185, 300, 0.8) +
      pot(330, 300) +
      bin(440, 300) +
      bush(600, 300, 0.9) +
      flowers(660, 300, '#ffd23f') +
      butterfly(420, 330) +
      dog(30, 410) +
      bucket(130, 455, '#ff6b8b') +
      stones(450, 470) +
      pigeon(700, 470) +
      birdHouse(770, 470) +
      grass(40, 490) +
      grass(400, 490) +
      // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 662, 199],
      ]) +
      time('', DUSK) +
      trap(350, 370, 36, lampHead(350, 470, false), lampHead(350, 470, true), 'lights') +
      trap(270, 149, 28, '', glow(255, 132, 30, 34), 'lights') +
      time('', glow(405, 236, 30, 34) + glow(180, 236, 30, 34)) +
      trap(80, 150, 42, '', stars(80, 150), 'stars') +
      trap(720, 70, 54, sun(720, 70), moon(720, 70), 'moon')
    )
  },
})
