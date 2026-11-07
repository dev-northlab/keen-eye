import type { LevelPictures } from '../../engine/types.ts'

// Level 19 ("nightBarn") redrawn as two pictures (public/levels/redesign/, Gemini's full 2612×1632), the zones
// measured on their pixel difference. The drawn scene's differences, smaller where they can be: the bat, which flies
// faster in the drawn scene, turns light brown (pictures do not move); the cat's tail, which swings in the drawn scene,
// is gone instead; the new star, the crescent moon, the green lantern and the white owl as drawn (the owl as a whole
// one, Gemini drew a new white owl in its place). Touched up by hand: B is A with only Gemini's star, moon, bat,
// lantern with its glow and owl laid over it. Gemini also redrew the whole cat curled up the other way and left a
// ghost of the tail on the hay bale, so B keeps A's cat with the tail painted over with the bale's own hay.
export const level019Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-019-a.webp',
  imageB: 'levels/redesign/level-019-b.webp',
  viewBox: { w: 2612, h: 1632 },
  differences: [
    // The star above the left half of the barn roof, only in B.
    { x: 996, y: 418, r: 60 },
    // The moon: full in A, a crescent in B.
    { x: 2268, y: 292, r: 120 },
    // The bat above the barn: black in A, light brown in B.
    { x: 1470, y: 391, r: 76 },
    // The street lantern's glass and glow: yellow in A, green in B.
    { x: 523, y: 731, r: 145 },
    // The owl on the fence post: brown in A, white with grey spots in B.
    { x: 2260, y: 1000, r: 125 },
    // The cat's tail hanging down the hay bale, only in A.
    { x: 2051, y: 1314, r: 66 },
  ],
}
