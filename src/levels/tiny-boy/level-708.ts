import type { Level } from '../../engine/types.ts'

// "Tiny boy" 8: the boy in the helicopter of a fair's merry-go-round (public/levels/tiny-boy/, Gemini, 2752×1536),
// seven small differences. B is A with only three parts taken from Gemini's B (feathered masks): the bottom light of
// the helicopter (it turned both blue), the tail propeller (it drew it with two blades and also took the white sticker
// off the tail, inside that zone) and the small star on the minibus (it also took the round badge away, left as in A).
// The rest it got wrong and were done by hand: one bunting flag recoloured (it recoloured and shifted them all), one
// balloon by the ticket booth and one tulip recoloured (it changed neither), and one ear of the plush bunny painted out
// with a smooth fill from the blurred background (it turned the bunny into an earless bear). The tulips are pink, so
// the reddest one turns yellow. Zones measured on the pixel difference.
const level: Level = {
  id: 708,
  chapter: 'tinyBoy',
  title: 'fairHelicopter',
  kind: 'image',
  imageA: 'levels/tiny-boy/level-708-a.webp',
  imageB: 'levels/tiny-boy/level-708-b.webp',
  viewBox: { w: 2752, h: 1536 },
  differences: [
    // The light under the helicopter's body: green in A, blue in B.
    { x: 1246, y: 1125, r: 62 },
    // The black tail propeller: three blades in A, two in B.
    { x: 1944, y: 696, r: 130 },
    // The small star on the white and blue minibus, only in A.
    { x: 2164, y: 966, r: 60 },
    // A balloon tied to the ticket booth: blue in A, orange in B.
    { x: 440, y: 690, r: 60 },
    // A small bunting flag: blue in A, green in B.
    { x: 1088, y: 171, r: 60 },
    // The right ear of the plush bunny on the prize shelf, only in A.
    { x: 324, y: 622, r: 60 },
    // A tulip in the flower bed: pink-red in A, yellow in B.
    { x: 186, y: 1212, r: 60 },
  ],
  parTimeSec: 90,
  multiplayerReady: true,
}

export default level
