import type { LevelPictures } from '../../engine/types.ts'

// Level 1 ("barnyard") redrawn as two pictures (public/levels/redesign/), the zones measured on their pixel
// difference. The same differences as the drawn scene, except the last: there the hen turns, here a second one comes.
export const level001Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-001-a.avif',
  imageB: 'levels/redesign/level-001-b.avif',
  viewBox: { w: 1200, h: 896 },
  differences: [
    // The sun: yellow in A, orange in B.
    { x: 1051, y: 143, r: 72 },
    // The big cloud in the middle of the sky, only in A.
    { x: 600, y: 108, r: 110 },
    // The barn's right window, only in A.
    { x: 968, y: 452, r: 50 },
    // The haystack by the barn with its shadow, only in A.
    { x: 1095, y: 632, r: 110 },
    // A chicken by the fence on the left, only in B.
    { x: 255, y: 720, r: 60 },
  ],
}
