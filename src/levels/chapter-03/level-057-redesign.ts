import type { LevelPictures } from '../../engine/types.ts'

// Level 57 ("winterForest") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the top
// of the fir with the bird loses its snow, the red bird on its branch turns blue, the smoke above the chimney is gone,
// the left roof loses its rightmost icicle, the lantern by the cabin goes out, the deer loses the white spots on its
// back, the rabbit at the bottom left gets dark grey ears and the berries of the bush at the bottom right turn blue.
// B is A with only these changes of Gemini's laid over it (the bird, the smoke, the lantern, the deer, the ears);
// it left the other three undone (its fir top was only redrawn), so they are done by hand on A's picture: the snow
// clumps of the fir's upper half filled with the needles around them, the icicle painted out with the log wall
// beside it, the berries recoloured with their shading kept.
export const level057Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-057-a.webp',
  imageB: 'levels/redesign/level-057-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // Snow on the upper half of the fir with the bird, only in A.
    { x: 466, y: 662, r: 110 },
    // The bird on the branch of that fir: red in A, blue in B.
    { x: 588, y: 837, r: 75 },
    // The white smoke above the cabin's chimney, only in A.
    { x: 1859, y: 468, r: 204 },
    // The rightmost icicle of the left part of the roof, only in A.
    { x: 1488, y: 1024, r: 60 },
    // The lantern by the cabin: lit in A, dark in B.
    { x: 1897, y: 1024, r: 60 },
    // The white spots on the deer's back, only in A.
    { x: 845, y: 1327, r: 122 },
    // The ears of the rabbit at the bottom left: light in A, dark grey in B.
    { x: 292, y: 1476, r: 60 },
    // The berries of the bush at the bottom right: red in A, blue in B.
    { x: 2454, y: 1396, r: 216 },
  ],
}
