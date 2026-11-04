import { balloon, bin, pigeon } from '../chapter-02/shapes.ts'
import { extras } from '../extras.ts'
import { memoryLevel } from '../helpers.ts'
import { cloud, sun } from '../shapes.ts'
import { around, banana, big, daySky, ground, produce, pumpkin, signPost, stall, stallAwning, watermelon } from './shapes.ts'
import { bird, birds, crate, poster, sack } from '../time/shapes.ts'

export default memoryLevel({
  id: 315,
  title: 'memoryMarket',
  showSeconds: 3,
  scene: ({ diff, extra, anim }) => {
    const bananas = diff(...around(208, 362, 292, 424), '#ffd23f', '#8ac926')
    return (
      daySky(380) +
      sun(80, 70) +
      big(400, 70, 0.9, cloud(0, 0)) +
      ground(380, '#e9dcc7') +
      stall(250, 560, 440) +
      stallAwning(250, 280, 460, '#e63946') +
      diff(...around(386, 252, 434, 280, 30), '', big(410, 280, 2, pigeon(0, 0))) +
      produce(110, 460, '#ff9f1c', 4) +
      diff(...around(62, 372, 158, 430), `<circle cx="124" cy="390" r="15" fill="#ff9f1c"/>`, '') +
      produce(250, 460, '', 0) +
      banana(250, 408, bananas) +
      banana(242, 392, bananas) +
      banana(258, 376, bananas) +
      produce(390, 460, '#e63946', 5) +
      diff(...around(44, 598, 136, 660), watermelon(90, 660), '') +
      diff(...around(206, 616, 294, 690), '', pumpkin(250, 690)) +
      // Decor: small things that fill the scene, the same in both pictures
      cloud(230, 90, 0.6) +
      birds(300, 190) +
      balloon(150, 160, '#ff6b8b') +
      pigeon(150, 280) +
      pigeon(310, 280, true) +
      bird(40, 282, '#e63946') +
      sack(25, 740) +
      sack(55, 742, '#c9a86a') +
      crate(140, 745, 30) +
      bin(480, 748) +
      poster(300, 480, 40, 50, '#ffd23f') +
      crate(175, 745, 30, '#b07a42') +
      crate(208, 745, 30) +
      sack(300, 745) +
      diff(...around(336, 598, 476, 708), signPost(386, 708), signPost(426, 708)) +
      // The extra objects of hard mode (docs/hard-mode-extra-objects.md).
      extras({ extra, anim }, [
        ['bin', 20, 478],
        ['ball', 470, 425, '#8338ec'],
        ['shoppingBag', 98, 745],
        ['balloon', 455, 165, '#3a86ff'],
      ])
    )
  },
})
