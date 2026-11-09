import type { Level } from '../../engine/types.ts'

// "Tiny boy" 2: the boy digging by a sand hill (public/levels/tiny-boy/, Gemini, 2752×1536). B is A with only the
// listed parts taken from Gemini's B (feathered masks): its B dropped all four big rocks at the foot of the hill, so
// only the upper one goes; the other three stay as in A. Zones measured on the pixel difference.
const level: Level = {
  id: 702,
  chapter: 'tinyBoy',
  title: 'sandHill',
  kind: 'image',
  imageA: 'levels/tiny-boy/level-702-a.webp',
  imageB: 'levels/tiny-boy/level-702-b.webp',
  viewBox: { w: 2752, h: 1536 },
  differences: [
    // The toy by his foot: a pink spade in A, a purple rake in B.
    { x: 1112, y: 883, r: 70 },
    // The yellow sieve scoop in his hand, only in A.
    { x: 1167, y: 670, r: 105 },
    // The scoop in the toy box: blue in A, red in B.
    { x: 1522, y: 1038, r: 80 },
    // A green tuft in the sand at the top right, only in B.
    { x: 2312, y: 184, r: 80 },
    // The upper big rock at the foot of the hill, only in A.
    { x: 742, y: 1126, r: 80 },
  ],
  parTimeSec: 60,
  multiplayerReady: false,
}

export default level
