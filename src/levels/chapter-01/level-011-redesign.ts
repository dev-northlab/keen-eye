import type { LevelPictures } from '../../engine/types.ts'

// Level 11 ("windmill") redrawn as two pictures (public/levels/redesign/), the zones measured on their pixel
// difference. The drawn scene's flag, door and window; its two moving differences become still ones (pictures do
// not move): the swing gets a red seat instead of not being there, and the windmill a red top sail instead of
// turning the other way. Gemini also took the lit window's glints off the pond; B got them back from A.
export const level011Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-011-a.avif',
  imageB: 'levels/redesign/level-011-b.avif',
  viewBox: { w: 1306, h: 816 },
  differences: [
    // The flag on the house roof: red in A, blue in B.
    { x: 244, y: 227, r: 46 },
    // The house door: brown in A, teal in B.
    { x: 269, y: 503, r: 50 },
    // The house window: lit in A, dark in B.
    { x: 164, y: 462, r: 46 },
    // The swing's seat under the tree: wooden in A, red in B.
    { x: 705, y: 528, r: 40 },
    // The windmill's top sail: white in A, red in B.
    { x: 984, y: 228, r: 62 },
  ],
}
