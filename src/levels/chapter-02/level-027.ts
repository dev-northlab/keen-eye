// Motion differences: the neon sign blinks only on picture B; the taxi drives faster on B.
import { svgLevel } from '../helpers.ts'
import { bin, bollard, building, car, cityTree, door, lampHead, lampPost, mailbox, manhole, newspaperBox, person, shoppingBag, signBoard, skyline, street } from './shapes.ts'

const LIT = '#ffd166'
const DARK = '#2d3a55'

/** Star; (x, y) = center. Bounds: radius 6. */
const star = (x: number, y: number) =>
  `<path d="M${x} ${y - 6}l1.8 4.2l4.2 0.4l-3.2 2.8l1.2 4.2l-4 -2.4l-4 2.4l1.2 -4.2l-3.2 -2.8l4.2 -0.4Z" fill="#fff3a3"/>`

/** Taxi roof sign on the car at (x, y) = ground center. Bounds: x ±12, y from −46 to −38. */
const roofSign = (x: number, y: number, color: string) => `<rect x="${x - 12}" y="${y - 46}" width="24" height="8" rx="2" fill="${color}"/>`

export default svgLevel({
  id: 27,
  chapter: 'city',
  title: 'nightCity',
  parTimeSec: 110,
  scene: ({ diff, anim, rand, secret }) => {
    let stars = ''
    for (let i = 0; i < 16; i++) {
      const x = rand() * 800
      const y = 15 + rand() * 90
      if (Math.hypot(x - 120, y - 70) < 60 || Math.hypot(x - 600, y - 40) < 40) continue
      stars += star(x, y)
    }
    const driving = (period: number) =>
      anim({ id: 'taxi', type: 'path', points: [[0, 0], [-230, 0]], period }, car(560, 470, '#ffb703', true) + roofSign(560, 470, '#2b2b2b'))
    const neon = signBoard(460, 250, 70, '#ff006e')

    return (
      `<rect width="800" height="500" fill="#1d2a4a"/>` +
      stars +
      diff(600, 40, 18, '', star(600, 40)) +
      diff(120, 70, 36, `<circle cx="120" cy="70" r="30" fill="#f4f1de"/>`, `<circle cx="120" cy="70" r="30" fill="#f4f1de"/><circle cx="108" cy="62" r="24" fill="#1d2a4a"/>`) +
      skyline(rand, 200, '#2b3b63') +
      building(0, 340, 200, 240, '#3b4a75', DARK) +
      building(200, 340, 160, 190, '#4a3b75', DARK) +
      building(360, 340, 200, 260, '#3b4a75', DARK) +
      building(560, 340, 240, 220, '#4a3b75', DARK) +
      // Lit windows (same grid as the buildings: 36 under the roof, 42 per row)
      `<rect x="30" y="123" width="20" height="26" fill="${LIT}"/><rect x="110" y="165" width="20" height="26" fill="${LIT}"/>` +
      `<rect x="150" y="207" width="20" height="26" fill="${LIT}"/><rect x="270" y="173" width="20" height="26" fill="${LIT}"/>` +
      `<rect x="390" y="103" width="20" height="26" fill="${LIT}"/><rect x="470" y="187" width="20" height="26" fill="${LIT}"/>` +
      `<rect x="630" y="143" width="20" height="26" fill="${LIT}"/><rect x="710" y="227" width="20" height="26" fill="${LIT}"/>` +
      diff(760, 198, 22, `<rect x="750" y="185" width="20" height="26" fill="${LIT}"/>`, `<rect x="750" y="185" width="20" height="26" fill="${DARK}"/>`) +
      door(100, 340, '#2b2b3a') +
      door(460, 340, '#2b2b3a') +
      diff(460, 250, 38, neon, anim({ type: 'blink', period: 1.2, duty: 0.7 }, neon)) +
      street(360, 140) +
      lampPost(260, 340) +
      diff(260, 240, 18, lampHead(260, 340), lampHead(260, 340, '#8ac926')) +
      lampPost(620, 340) +
      lampHead(620, 340) +
      `<circle cx="260" cy="244" r="40" fill="#ffd166" fill-opacity="0.1"/><circle cx="620" cy="244" r="40" fill="#ffd166" fill-opacity="0.1"/>` +
      cityTree(40, 340, 1, '#2f5e3a') +
      // The chapter's hidden key on the pavement, behind the purple passer-by's legs
      secret(304, 337, -6) +
      bin(720, 340, '#3d4a55') +
      person(300, 340, '#8338ec') +
      person(680, 340, '#e63946', true) +
      car(160, 440, '#3a86ff') +
      diff(160, 398, 18, roofSign(160, 440, '#ffb703'), roofSign(160, 440, '#e63946')) +
      diff(560, 451, 47, driving(14), driving(7), 'taxi') +
      mailbox(165, 352) +
      bollard(360, 352) +
      newspaperBox(520, 352) +
      shoppingBag(752, 352) +
      manhole(700, 470)
    )
  },
})
