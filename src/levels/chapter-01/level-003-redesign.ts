import type { LevelPictures } from '../../engine/types.ts'

// Level 3 ("pond") redrawn as two pictures (public/levels/redesign/), the zones measured on their pixel difference.
// The same differences as the drawn scene.
export const level003Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-003-a.avif',
  imageB: 'levels/redesign/level-003-b.avif',
  viewBox: { w: 1306, h: 816 },
  differences: [
    // The cattails on the left bank, only in A.
    { x: 200, y: 555, r: 150 },
    // A bird in the sky by the sun, only in B.
    { x: 410, y: 174, r: 40 },
    // The lily pad with the pink water lily, only in A.
    { x: 408, y: 648, r: 60 },
    // The right duck, only in A.
    { x: 880, y: 625, r: 75 },
    // The frog: green in A, orange in B.
    { x: 1024, y: 680, r: 60 },
  ],
}
