import type { LevelPictures } from '../../engine/types.ts'

// Level 46 ("rangerCabin") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the smoke
// over the chimney is gone, the lit left window is dark, the woodpile loses a top log, the axe's head turns red, the
// ranger's hat green, the dog's tail white, the birdhouse's box blue and the bucket in the well red. B is A with only
// these changes of Gemini's laid over it. Gemini took both top logs of the woodpile: only the left one is taken (the
// right one put back from A); it left a faint trace of the smoke, painted over with the sky.
export const level046Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-046-a.avif',
  imageB: 'levels/redesign/level-046-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The white smoke over the chimney, only in A.
    { x: 1534, y: 536, r: 215 },
    // The left window of the cabin: lit in A, dark in B.
    { x: 1278, y: 1144, r: 98 },
    // The left one of the two top logs of the woodpile, only in A.
    { x: 502, y: 1354, r: 81 },
    // The head of the axe in the chopping block: grey in A, red in B.
    { x: 824, y: 1424, r: 106 },
    // The ranger's hat: brown in A, green in B.
    { x: 1830, y: 1346, r: 74 },
    // The dog's tail: brown in A, white in B.
    { x: 1970, y: 1460, r: 74 },
    // The box of the birdhouse on the pole: red in A, blue in B.
    { x: 202, y: 1034, r: 77 },
    // The bucket hanging in the well: grey in A, red in B.
    { x: 2234, y: 1282, r: 74 },
  ],
}
