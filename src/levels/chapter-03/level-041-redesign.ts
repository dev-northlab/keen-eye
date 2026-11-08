import type { LevelPictures } from '../../engine/types.ts'

// Level 41 ("clearing") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the top
// of the small round tree's crown turns orange, the red bird by the oak blue, the pink butterfly yellow, the deer
// loses the white spots on its back, the white rabbit turns grey, moss covers the top of the grey rock, the red
// mushroom's cap turns brown and the orange flower's petals blue. B is A with only these changes of Gemini's laid
// over it. Gemini also turned the orange mushroom brown and the pink flower above the rock blue (both left out), and
// took away the purple flower in front of the rabbit (put back from A).
export const level041Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-041-a.webp',
  imageB: 'levels/redesign/level-041-b.webp',
  viewBox: { w: 2624, h: 1632 },
  differences: [
    // The top of the small round tree's crown: green in A, orange in B.
    { x: 970, y: 634, r: 84 },
    // The bird by the big oak: red in A, blue in B.
    { x: 2026, y: 745, r: 89 },
    // The butterfly in the middle: pink in A, yellow in B.
    { x: 1314, y: 983, r: 74 },
    // The white spots on the deer's back, only in A.
    { x: 478, y: 1132, r: 127 },
    // The rabbit behind the purple flower: white in A, grey in B.
    { x: 1844, y: 1359, r: 107 },
    // Moss on top of the grey rock at the bottom right, only in B.
    { x: 2492, y: 1462, r: 118 },
    // The cap of the mushroom at the bottom left: red in A, brown in B (white dots on both).
    { x: 268, y: 1535, r: 80 },
    // The petals of the flower at the bottom right: orange in A, blue in B.
    { x: 2292, y: 1480, r: 73 },
  ],
}
