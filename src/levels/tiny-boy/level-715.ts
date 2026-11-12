import type { Level } from '../../engine/types.ts'

// "Tiny boy" 15: the boy walking past the garden gate of a peach house with a ball, a car parked in front
// (public/levels/tiny-boy/, Gemini, 2752×1536), nine differences, all Gemini's. B is A with only those parts taken from
// its B (feathered masks), so its re-noised grass and moved soap bubbles are left out; the hanging pot it took away
// leaves its empty hanger on the hook. Zones measured on the pixel difference; the left window's is kept clear of the
// hanging pot's beside it.
const level: Level = {
  id: 715,
  chapter: 'tinyBoy',
  title: 'gardenGate',
  kind: 'image',
  imageA: 'levels/tiny-boy/level-715-a.avif',
  imageB: 'levels/tiny-boy/level-715-b.avif',
  viewBox: { w: 2752, h: 1536 },
  differences: [
    // The stripes of his trousers: pink and lilac with a grey side stripe in A, blue with a blue side stripe in B.
    { x: 1790, y: 1184, r: 95 },
    // The ball in his hand: green and yellow in A, red and white in B.
    { x: 1708, y: 1004, r: 60 },
    // The garden gnome's hat: red in A, blue in B.
    { x: 1250, y: 850, r: 60 },
    // The cat sitting by the gate, only in A.
    { x: 2308, y: 958, r: 100 },
    // The hanging flower pot by the drainpipe, only in A.
    { x: 1504, y: 418, r: 60 },
    // The curtains of the left window: pink and rainbow in A, blue in B.
    { x: 1700, y: 420, r: 130 },
    // The curtains of the right window: red and green in A, blue in B.
    { x: 2448, y: 436, r: 140 },
    // The clothes on the line: a pink shirt and a red T-shirt in A, blue and purple in B.
    { x: 616, y: 504, r: 85 },
    // The car's tail light: all red in A, with an orange lamp in B.
    { x: 764, y: 1234, r: 80 },
  ],
  parTimeSec: 90,
  multiplayerReady: true,
}

export default level
