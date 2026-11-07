import type { LevelPictures } from '../../engine/types.ts'

// Level 2 ("garden") redrawn as two pictures (public/levels/redesign/), the zones measured on their pixel difference.
// Like the drawn scene: the smoke, the window, the scarecrow's hat and a gap in the carrot bed (two carrots here);
// the scarecrow's coat stands in for the watering can, which the pictures leave as it is.
export const level002Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-002-a.webp',
  imageB: 'levels/redesign/level-002-b.webp',
  viewBox: { w: 1306, h: 816 },
  differences: [
    // The smoke above the chimney, only in A.
    { x: 330, y: 105, r: 100 },
    // The cottage window: grey glass in A, lit yellow in B.
    { x: 150, y: 425, r: 50 },
    // The scarecrow's top hat: dark blue in A, red in B.
    { x: 915, y: 312, r: 60 },
    // The scarecrow's coat: brown in A, blue in B.
    { x: 917, y: 465, r: 90 },
    // Two carrots in the lower bed, only in A.
    { x: 850, y: 735, r: 75 },
  ],
}
