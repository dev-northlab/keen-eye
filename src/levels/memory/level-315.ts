import { balloon, bin, cityTree, pigeon } from '../chapter-02/shapes.ts'
import { memoryLevel } from '../helpers.ts'
import { cloud, sun } from '../shapes.ts'
import { around, banana, big, daySky, produce, pumpkin, signPost, stall, stallAwning, watermelon } from './shapes.ts'
import { bird, birds, crate, poster, sack } from '../time/shapes.ts'

export default memoryLevel({
  id: 315,
  title: 'memoryMarket',
  showSeconds: 3,
  scene: ({ diff }) => {
    const bananas = diff(...around(358, 242, 442, 304), '#ffd23f', '#8ac926')
    return (
      daySky(300) +
      sun(90, 70) +
      big(720, 70, 0.9, cloud(0, 0)) +
      `<rect y="300" width="800" height="200" fill="#e9dcc7"/>` +
      stall(400, 440, 460) +
      stallAwning(400, 160, 480, '#e63946') +
      diff(...around(536, 132, 584, 160, 30), '', big(560, 160, 2, pigeon(0, 0))) +
      produce(260, 340, '#ff9f1c', 4) +
      diff(...around(212, 252, 308, 310), `<circle cx="274" cy="270" r="15" fill="#ff9f1c"/>`, '') +
      produce(400, 340, '', 0) +
      banana(400, 288, bananas) +
      banana(392, 272, bananas) +
      banana(408, 256, bananas) +
      produce(540, 340, '#e63946', 5) +
      diff(...around(74, 408, 166, 470), watermelon(120, 470), '') +
      diff(...around(286, 402, 374, 476), '', pumpkin(330, 476)) +
      // Decor: small things that fill the scene, the same in both pictures
      cloud(300, 60, 0.6) +
      birds(450, 80) +
      balloon(200, 100, '#ff6b8b') +
      pigeon(250, 160) +
      pigeon(460, 160, true) +
      cityTree(740, 290, 1.5) +
      bird(760, 190, '#e63946') +
      sack(40, 350) +
      sack(70, 352, '#c9a86a') +
      crate(130, 350, 30) +
      bin(20, 480) +
      poster(490, 370, 40, 50, '#ffd23f') +
      crate(450, 490, 30, '#b07a42') +
      crate(482, 490, 30) +
      sack(540, 490) +
      diff(...around(630, 350, 770, 460), signPost(680, 460), signPost(720, 460))
    )
  },
})
