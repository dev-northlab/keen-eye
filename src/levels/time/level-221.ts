import { extras } from '../extras.ts'
import { svgLevel } from '../helpers.ts'
import { around, ball, bareTree, bench, bike, bin, bird, birds, bush, cloud, cone, flowers, icicles, oak, pane, person, pigeon, signBoard, sky, small, snowCap, snowfall, snowman, winterPerson, winterSky } from './shapes.ts'

/** Hopscotch drawn in chalk; (x, y) = center. Bounds: x ±30, y ±40. */
const hopscotch = (x: number, y: number) =>
  `<path d="M${x - 12} ${y + 40}h24v-24h-24ZM${x - 24} ${y + 16}h24v-24h-24ZM${x} ${y + 16}h24v-24h-24ZM${x - 12} ${y - 8}h24v-24h-24Z" fill="none" stroke="#ffffff" stroke-width="2.5"/>` +
  `<circle cx="${x}" cy="${y - 36}" r="6" fill="none" stroke="#ffffff" stroke-width="2.5"/>`

/** Basketball backboard; (x0, y0) = top-left corner, 50 × 36. */
const backboard = (x0: number, y0: number, color: string) =>
  `<rect x="${x0}" y="${y0}" width="50" height="36" rx="3" fill="${color}"/><rect x="${x0 + 15}" y="${y0 + 14}" width="20" height="14" fill="none" stroke="#e63946" stroke-width="2"/>`

export default svgLevel({
  id: 221,
  chapter: 'time',
  title: 'schoolYard',
  pair: 'summer-winter',
  parTimeSec: 135,
  scene: ({ diff, time, trap, extra, anim }) => {
    let windows = ''
    for (let i = 0; i < 8; i++) {
      const x = 110 + i * 76
      if (i !== 6) windows += pane(x, 150, 34, 40)
      if (i !== 4) windows += pane(x, 230, 34, 40)
    }
    return (
      time(sky(false, 320), winterSky(320)) +
      // School
      `<rect x="80" y="120" width="640" height="200" fill="#e9c46a"/><rect x="74" y="112" width="652" height="10" fill="#b5835a"/>` +
      time('', `<rect x="72" y="106" width="656" height="7" rx="3" fill="#ffffff"/>`) +
      windows +
      diff(...around(563, 147, 603, 193), pane(566, 150, 34, 40), '') +
      diff(...around(365, 198, 435, 222), signBoard(400, 210, 70, '#2a9d8f'), signBoard(400, 210, 70, '#e63946')) +
      diff(...around(376, 260, 424, 320), `<rect x="376" y="260" width="48" height="60" fill="#6b4f3a"/><path d="M400 260v60" stroke="#4a3526" stroke-width="2"/>`,
        `<rect x="376" y="260" width="48" height="60" fill="#3a86ff"/><path d="M400 260v60" stroke="#4a3526" stroke-width="2"/>`) +
      `<rect x="688" y="52" width="4" height="60" fill="#5c677d"/>` +
      diff(...around(692, 54, 720, 72), `<path d="M692 54h28l-6 9l6 9h-28Z" fill="#3a86ff"/>`, `<path d="M692 54h28l-6 9l6 9h-28Z" fill="#ffb703"/>`) +
      trap(250, 130, 22, '', icicles(80, 720, 122), 'icicles') +
      // Yard
      `<rect y="320" width="800" height="180" fill="${time('#c2c7cc', '#f4f8fb')}"/>` +
      trap(200, 440, 34, hopscotch(200, 440), '', 'snow') +
      `<path d="M640 470V330" stroke="#5c677d" stroke-width="6"/><circle cx="612" cy="362" r="10" fill="none" stroke="#e63946" stroke-width="3"/>` +
      diff(...around(600, 320, 650, 356), backboard(600, 320, '#ffffff'), backboard(600, 320, '#ffd23f')) +
      diff(...around(270, 440, 330, 470), bench(300, 470), bench(300, 470, '#2a9d8f')) +
      diff(...around(452, 446, 508, 480), bike(480, 480, '#e63946'), bike(480, 480, '#2a9d8f')) +
      diff(...around(670, 452, 690, 480), bin(680, 480, '#5c8d5a'), bin(680, 480, '#3a86ff')) +
      diff(...around(378, 446, 402, 470), ball(390, 470, '#ff9f43'), ball(390, 470, '#8338ec')) +
      trap(60, 367, 52, oak(60, 420, 1.1), bareTree(60, 420, 1.0), 'leaves') +
      trap(530, 373, 29, small(530, 400, person(530, 400, '#ff6b8b')), small(530, 400, winterPerson(530, 400, '#8338ec')), 'clothes') +
      trap(760, 432, 40, '', snowman(760, 474), 'snowman') +
      trap(300, 60, 32, birds(300, 60), '', 'birds') +
      // Decor: the same in both seasons, snowed on in winter (grass and butterflies only in summer)
      cloud(150, 60, 0.6) +
      cloud(480, 60, 0.6) +
      bird(160, 112) +
      bird(520, 112, '#e63946') +
      bush(120, 320, 0.8) +
      bush(260, 320, 0.8) +
      bush(500, 320, 0.8) +
      bush(700, 320, 0.8) +
      time('', snowCap(104, 301, 32) + snowCap(244, 301, 32) + snowCap(484, 301, 32) + snowCap(684, 301, 32)) +
      bin(230, 380) +
      time('', snowCap(220, 352, 20)) +
      bench(740, 380) +
      time('', snowCap(710, 350, 60)) +
      pigeon(560, 440) +
      bench(100, 490, '#e63946') +
      time('', snowCap(70, 460, 60)) +
      cone(30, 490) +
      cone(580, 490) +
      time(flowers(450, 380, '#ffd23f'), '') +
      // The extra objects of normal mode (docs/extra-objects.md): flocks in the sky, the same at both moments.
      extras({ extra, anim }, [
        ['birds', 609, 52],
        ['birds', 75, 56],
        ['birds', 407, 74],
      ]) +
      time('', snowfall(221, 320, 44))
    )
  },
})
