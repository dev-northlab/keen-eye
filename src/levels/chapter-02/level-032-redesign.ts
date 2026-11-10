import type { LevelPictures } from '../../engine/types.ts'

// Level 32 ("bridge") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the gull's wing tips
// turn black, the left street lamp on the bridge is off, the yellow car's roof turns purple, the fisherman's hat from
// yellow to blue, a blue flag sits on the red boat's mast, the buoy turns from red to blue, a duckling swims beside the
// duck. B is A with only these changes of Gemini's laid over it: Gemini also lit the right street lamp, redrew the
// blue bird on the railing and drew the flag's reflection in the water (those stay as in A).
export const level032Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-032-a.avif',
  imageB: 'levels/redesign/level-032-b.avif',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The white gull's wing tips: grey in A, black in B.
    { x: 978, y: 378, r: 75 },
    // The left street lamp on the bridge: light glass in A, dark in B.
    { x: 854, y: 624, r: 60 },
    // The yellow car's roof: yellow in A, purple in B.
    { x: 1310, y: 858, r: 85 },
    // The fisherman's hat: yellow in A, blue in B.
    { x: 200, y: 1164, r: 70 },
    // A small blue flag on top of the red boat's mast, only in B.
    { x: 472, y: 1366, r: 60 },
    // The buoy in the river: red in A, blue in B.
    { x: 2296, y: 1466, r: 105 },
    // A duckling right of the yellow duck, only in B.
    { x: 2056, y: 1546, r: 82 },
  ],
}
