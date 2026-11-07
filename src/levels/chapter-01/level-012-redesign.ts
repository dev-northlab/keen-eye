import type { LevelPictures } from '../../engine/types.ts'

// Level 12 ("evening") redrawn as two pictures (public/levels/redesign/), the zones measured on their pixel
// difference. The drawn scene's differences made smaller: the moon becomes a crescent instead of going, the smoke
// loses its top, the cat turns ginger instead of going, and the pumpkin turns green; the window that blinks in the
// drawn scene is still here (pictures do not move): dark in B. Gemini took the smoke's ring off with its top and
// left a speck there, painted away in B.
export const level012Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-012-a.webp',
  imageB: 'levels/redesign/level-012-b.webp',
  viewBox: { w: 1306, h: 816 },
  differences: [
    // The moon: full in A, a crescent in B.
    { x: 1062, y: 113, r: 44 },
    // The top of the chimney smoke (its ring and the puff above), only in A.
    { x: 620, y: 165, r: 58 },
    // The cat on the roof: black in A, ginger in B.
    { x: 795, y: 289, r: 44 },
    // The bottom-right window: lit in A, dark in B.
    { x: 802, y: 515, r: 50 },
    // The left pumpkin: orange in A, green in B.
    { x: 337, y: 724, r: 44 },
  ],
}
