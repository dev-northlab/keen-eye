import type { LevelPictures } from '../../engine/types.ts'

// Level 6 ("henhouse") redrawn as two pictures (public/levels/redesign/), the zones measured on their pixel difference.
// The same differences as the drawn scene.
export const level006Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-006-a.avif',
  imageB: 'levels/redesign/level-006-b.avif',
  viewBox: { w: 1306, h: 816 },
  differences: [
    // The henhouse doorway: dark and open in A, a cream door in B.
    { x: 272, y: 424, r: 80 },
    // The grain sack: beige in A, light blue in B.
    { x: 490, y: 722, r: 62 },
    // The left hen: white in A, brown in B.
    { x: 680, y: 680, r: 65 },
    // An egg in the nest, only in A.
    { x: 1066, y: 722, r: 45 },
    // The rooster on the fence post: facing right in A, left in B.
    { x: 1144, y: 496, r: 85 },
  ],
}
