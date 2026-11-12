import type { Level } from '../../engine/types.ts'

// "Tiny boy" 13: the boy on the floor by the Christmas tree, among his presents and toys (public/levels/tiny-boy/,
// Gemini, 2752×1536), seven differences. Six are Gemini's; B is A with only those parts taken from its B (feathered
// masks). Its B also changed a second ball and a second candle, a cookie, the snow globe, a stocking, the train and the
// feathers, all left as in A; the star it took off the sweater left a faint ghost, covered with the knit beside it. The
// candy cane is recoloured by hand (Gemini kept it red), shading kept. Zones measured on the pixel difference.
const level: Level = {
  id: 713,
  chapter: 'tinyBoy',
  title: 'christmasMorning',
  kind: 'image',
  imageA: 'levels/tiny-boy/level-713-a.avif',
  imageB: 'levels/tiny-boy/level-713-b.avif',
  viewBox: { w: 2752, h: 1536 },
  differences: [
    // A white star on his jumper, only in A.
    { x: 1298, y: 844, r: 60 },
    // The glittery ball on the tree: bronze in A, red in B.
    { x: 536, y: 611, r: 130 },
    // A candle on the tree: lit in A, out in B.
    { x: 372, y: 872, r: 84 },
    // Two of the three cookies on the plate, only in A.
    { x: 2509, y: 180, r: 74 },
    // The plush reindeer's nose: red in A, brown in B.
    { x: 2324, y: 1256, r: 60 },
    // A building block by the paper bag: coral in A, blue in B.
    { x: 2126, y: 781, r: 72 },
    // The candy cane's stripes: red in A, green in B.
    { x: 2049, y: 1240, r: 105 },
  ],
  parTimeSec: 90,
  multiplayerReady: true,
}

export default level
