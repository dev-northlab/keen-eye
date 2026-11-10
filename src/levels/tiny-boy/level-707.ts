import type { Level } from '../../engine/types.ts'

// "Tiny boy" 7: the boy by his chalk drawings on the driveway (public/levels/tiny-boy/, Gemini, 2752×1536), seven
// small differences. B is A with only the listed parts taken from Gemini's B (feathered masks): the one blue stripe on
// his trousers (it turned two blue), the teddy bear's nose (it also smudged the eyes, left as in A) and the bubble by
// the garage (it took both bubbles away). The rest Gemini got wrong and were done by hand: one ray of the chalk sun
// painted out with the asphalt beside it (it took the whole sun away), one hole of his clog filled from the clog round
// it, the yellow chalk recoloured green (it changed all three) and a red flower in the window box recoloured purple (it
// redrew the box shifted). Zones measured on the pixel difference.
const level: Level = {
  id: 707,
  chapter: 'tinyBoy',
  title: 'chalkDrawings',
  kind: 'image',
  imageA: 'levels/tiny-boy/level-707-a.avif',
  imageB: 'levels/tiny-boy/level-707-b.avif',
  viewBox: { w: 2752, h: 1536 },
  differences: [
    // One stripe on his trousers, at the knee: pink in A, light blue in B.
    { x: 1109, y: 1148, r: 60 },
    // A small hole on his left clog, only in A.
    { x: 992, y: 1285, r: 60 },
    // The bottom ray of the chalk sun, only in A.
    { x: 1391, y: 1268, r: 60 },
    // A piece of chalk: yellow in A, green in B.
    { x: 1650, y: 1373, r: 60 },
    // The nose of the teddy bear on the car's bumper, only in A.
    { x: 2228, y: 847, r: 60 },
    // A flower in the window box: red in A, purple in B.
    { x: 1737, y: 443, r: 60 },
    // A soap bubble by the garage door, only in A.
    { x: 2123, y: 604, r: 60 },
  ],
  parTimeSec: 90,
  multiplayerReady: true,
}

export default level
