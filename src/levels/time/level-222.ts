import { svgLevel } from '../helpers.ts'
import { around, balloon, bench, bin, bucket, bunting, cloud, cone, DUSK, ferrisWheel, glow, gondola, lampHead, lampPost, moon, person, pigeon, rim, sky, stall, stars, sun } from './shapes.ts'

/** Merry-go-round; (x, y) = ground center. Its flag and horses are drawn apart. Bounds: x ±86, y from −150 to 0. */
const carousel = (x: number, y: number) => {
  let stripes = ''
  for (let i = 0; i < 8; i++) stripes += `<path d="M${x} ${y - 150}L${x - 80 + i * 20} ${y - 100}h20Z" fill="${i % 2 ? '#ffffff' : '#e63946'}"/>`
  return (
    `<ellipse cx="${x}" cy="${y - 6}" rx="86" ry="12" fill="#b5835a"/>` +
    `<path d="M${x - 60} ${y - 100}V${y - 10}M${x} ${y - 100}V${y - 10}M${x + 60} ${y - 100}V${y - 10}" stroke="#ffd23f" stroke-width="4"/>` +
    stripes + `<path d="M${x} ${y - 150}v-30" stroke="#5c677d" stroke-width="3"/>`
  )
}

/** Carousel horse, faces right; (x, y) = body center. Bounds: x from −18 to +20, y from −14 to +12. */
const horse = (x: number, y: number, color: string) =>
  `<ellipse cx="${x}" cy="${y}" rx="16" ry="8" fill="${color}"/><path d="M${x + 10} ${y - 4}l8 -10l2 8Z" fill="${color}"/>` +
  `<path d="M${x - 10} ${y + 6}v6M${x + 8} ${y + 6}v6" stroke="${color}" stroke-width="3"/>`

/** Ticket booth; (x, y) = ground center, roof drawn apart. Bounds of the walls: x ±30, y from −60 to 0. */
const booth = (x: number, y: number) =>
  `<rect x="${x - 30}" y="${y - 60}" width="60" height="60" fill="#f4efe6"/><rect x="${x - 15}" y="${y - 45}" width="30" height="20" fill="#bde3f2"/>`

/** Roof of `booth(x, y)`. Bounds: x ±36, y from −96 to −60. */
const boothRoof = (x: number, y: number, color: string) => `<path d="M${x - 36} ${y - 58}L${x} ${y - 96}L${x + 36} ${y - 58}Z" fill="${color}"/>`

/** Cotton candy on a stick; (x, y) = stick bottom. Bounds: x ±10, y from −30 to 0. */
const candy = (x: number, y: number) => `<path d="M${x} ${y}v-14" stroke="#f4efe6" stroke-width="2"/><circle cx="${x}" cy="${y - 20}" r="10" fill="#ff8fab"/>`

/** Lights all around the rim of the wheel. */
const rimLights = (lit: boolean) => {
  let out = ''
  for (let a = 0; a < 360; a += 22.5) {
    const [x, y] = rim(560, 190, 120, a)
    out += (lit ? `<circle cx="${x}" cy="${y}" r="7" fill="#ffe08a" fill-opacity="0.4"/>` : '') + `<circle cx="${x}" cy="${y}" r="3" fill="${lit ? '#fff3b0' : '#c9d1d9'}"/>`
  }
  return out
}

export default svgLevel({
  id: 222,
  chapter: 'time',
  title: 'funfair',
  pair: 'day-night',
  parTimeSec: 135,
  scene: ({ diff, time, trap }) => {
    const colors = ['#e63946', '#3a86ff', '#ffb703', '#2a9d8f', '#8338ec', '#ff6b8b', '#8ac926', '#fb8500']
    let gondolas = ''
    for (let i = 0; i < 8; i++) {
      const [x, y] = rim(560, 190, 120, i * 45)
      gondolas += i === 3 ? diff(...around(x - 11, y - 2, x + 11, y + 20), gondola(x, y, colors[i]), gondola(x, y, '#ffffff')) : gondola(x, y, colors[i])
    }
    return (
      sky(time(false, true), 340) +
      `<rect y="340" width="800" height="160" fill="#d8c08f"/>` +
      ferrisWheel(560, 190, 120) +
      time(rimLights(false), '') +
      gondolas +
      carousel(200, 400) +
      diff(...around(202, 222, 230, 240), `<path d="M202 222h28l-6 9l6 9h-28Z" fill="#3a86ff"/>`, `<path d="M202 222h28l-6 9l6 9h-28Z" fill="#e63946"/>`) +
      horse(150, 350, '#ffffff') +
      diff(...around(232, 334, 270, 362), horse(250, 350, '#ffb703'), horse(250, 350, '#8ac926')) +
      bunting(280, 300, 470, 300, ['#e63946', '#ffb703', '#2a9d8f', '#3a86ff', '#8338ec', '#ff6b8b']) +
      diff(...around(352, 312, 366, 328), `<path d="M352.2 313.6h14l-7 14Z" fill="#2a9d8f"/>`, `<path d="M352.2 313.6h14l-7 14Z" fill="#ffffff"/>`) +
      booth(400, 450) +
      diff(...around(364, 354, 436, 392), boothRoof(400, 450, '#e63946'), boothRoof(400, 450, '#3a86ff')) +
      stall(80, 470, '#ff6b8b') +
      candy(60, 430) +
      candy(84, 430) +
      diff(...around(98, 400, 118, 430), candy(108, 430), '') +
      balloon(680, 360, '#e63946') +
      balloon(700, 350, '#ffd23f') +
      diff(...around(707, 344, 733, 404), balloon(720, 362, '#3a86ff'), balloon(720, 362, '#8ac926')) +
      person(700, 480, '#2a9d8f') +
      person(330, 490, '#e76f51', true) +
      diff(...around(470, 452, 490, 480), bin(480, 480, '#5c8d5a'), bin(480, 480, '#e63946')) +
      diff(...around(610, 444, 630, 480), cone(620, 480), '') +
      lampPost(310, 480) +
      // Decor: the same at both moments, darkened by the evening with the rest
      cloud(200, 60, 0.5) +
      cloud(250, 150, 0.5) +
      cloud(750, 150, 0.5) +
      balloon(380, 160, '#ff6b8b') +
      balloon(540, 380, '#ff6b8b') +
      balloon(600, 370, '#8ac926') +
      pigeon(650, 420) +
      bench(210, 480, '#e63946') +
      pigeon(160, 490) +
      pigeon(260, 490, true) +
      bucket(400, 490, '#e63946') +
      cone(15, 490) +
      cone(560, 490) +
      bench(740, 490) +
      bin(780, 490) +
      time('', DUSK) +
      time('', glow(385, 405, 30, 20)) +
      trap(560, 70, 24, '', rimLights(true), 'lights') +
      trap(160, 302, 22, '', `<path d="M120 300h160" stroke="#3d4a55" stroke-width="1.5"/>` +
        [130, 150, 170, 190, 210, 230, 250, 270].map((x) => `<circle cx="${x}" cy="302" r="7" fill="#ffe08a" fill-opacity="0.4"/><circle cx="${x}" cy="302" r="3" fill="#fff3b0"/>`).join(''), 'lights') +
      trap(310, 380, 34, lampHead(310, 480, false), lampHead(310, 480, true), 'lights') +
      trap(330, 80, 40, '', stars(330, 80), 'stars') +
      trap(90, 70, 54, sun(90, 70), moon(90, 70), 'moon')
    )
  },
})
