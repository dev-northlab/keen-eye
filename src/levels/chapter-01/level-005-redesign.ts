import type { LevelPictures } from '../../engine/types.ts'

// Level 5 ("pigsty") redrawn as two pictures (public/levels/redesign/), the zones measured on their pixel difference.
// The same differences as the drawn scene.
export const level005Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-005-a.avif',
  imageB: 'levels/redesign/level-005-b.avif',
  viewBox: { w: 1306, h: 816 },
  differences: [
    // The fourth sunflower, only in A.
    { x: 285, y: 410, r: 62 },
    // The barn's round window, only in A.
    { x: 992, y: 432, r: 45 },
    // The pig in the mud: pink in A, brown in B.
    { x: 400, y: 656, r: 85 },
    // The fruit in the trough, only in A.
    { x: 904, y: 690, r: 90 },
    // The bucket: grey in A, red in B.
    { x: 176, y: 752, r: 45 },
  ],
}
