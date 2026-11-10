import type { LevelPictures } from '../../engine/types.ts'

// Level 15 ("fair") redrawn as two pictures (public/levels/redesign/), the zones measured on their pixel
// difference. The drawn scene's differences, smaller where they can be: the flag, which flutters in the drawn scene,
// turns blue (pictures do not move); the blue tent's doorway closes; one basket's apples, one pumpkin of the pile
// and the yellow balloon change as drawn. Gemini changed nothing else.
export const level015Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-015-a.avif',
  imageB: 'levels/redesign/level-015-b.avif',
  viewBox: { w: 1306, h: 816 },
  differences: [
    // The flag on the red-and-white tent: red in A, blue in B.
    { x: 349, y: 214, r: 46 },
    // The blue tent's doorway: open in A, closed in B.
    { x: 981, y: 560, r: 106 },
    // The apples in the middle basket: red in A, yellow in B.
    { x: 660, y: 488, r: 44 },
    // The rightmost pumpkin of the pile, only in A.
    { x: 671, y: 748, r: 46 },
    // The yellow balloon: yellow in A, green in B.
    { x: 1252, y: 248, r: 44 },
  ],
}
