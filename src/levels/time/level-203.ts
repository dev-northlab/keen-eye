import { svgLevel } from '../helpers.ts'
import { birds, bucket, bush, butterfly, cloud, DUSK, fern, fireLogs, flame, grass, hedgehog, logPile, moon, mushroom, pine, rabbit, rock, signpost, sky, squirrel, stars, stones, stump, sun, tent } from './shapes.ts'

export default svgLevel({
  id: 203,
  chapter: 'time',
  title: 'duskCamp',
  pair: 'day-night',
  parTimeSec: 75,
  scene: ({ diff, time, trap, rand }) => {
    let backPines = ''
    for (let x = 20; x < 800; x += 46 + rand() * 20) backPines += pine(x, 300, 0.9 + rand() * 0.5, '#2f6e4c')
    return (
      sky(time(false, true), 300) +
      cloud(560, 70, 0.6) +
      `<path d="M0 300Q200 220 400 280T800 260V320H0Z" fill="#6aa86f"/>` +
      backPines +
      `<rect y="300" width="800" height="200" fill="#7cb35a"/>` +
      `<ellipse cx="520" cy="440" rx="90" ry="22" fill="#b89b6a"/>` +
      tent(330, 400, '#e07a5f') +
      `<path d="M330 340L310 400h40Z" fill="#9c3f2e"/>` +
      pine(90, 420, 1.2) +
      diff(170, 395, 28, pine(170, 420, 0.5), '') +
      diff(640, 362, 42, signpost(640, 393, 1), signpost(640, 393, -1)) +
      diff(470, 470, 24, mushroom(470, 485), mushroom(470, 485, '#8338ec')) +
      diff(240, 455, 24, rabbit(240, 470), '') +
      diff(720, 455, 24, stump(720, 466), '') +
      rock(410, 470, 1.2) +
      rock(760, 384, 0.8) +
      fireLogs(520, 440) +
      // Decor: the same at both moments, darkened by the evening with the rest
      cloud(330, 140, 0.45) +
      cloud(700, 140, 0.5) +
      squirrel(30, 330) +
      bush(400, 330, 0.8) +
      logPile(250, 350) +
      hedgehog(545, 345) +
      butterfly(400, 380, '#ffd23f') +
      bucket(440, 405) +
      grass(380, 440) +
      grass(760, 330) +
      stones(310, 470) +
      mushroom(130, 470, '#ff9f43', 0.8) +
      fern(30, 470) +
      mushroom(60, 480, '#e63946', 0.7) +
      stump(590, 470) +
      time('', DUSK) +
      trap(520, 412, 30, '', flame(520, 440), 'lights') +
      trap(440, 60, 40, birds(440, 60), '', 'birds') +
      trap(250, 70, 42, '', stars(250, 70), 'stars') +
      trap(80, 70, 54, sun(80, 70), moon(80, 70), 'moon')
    )
  },
})
