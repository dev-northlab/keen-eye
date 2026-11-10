import type { LevelPictures } from '../../engine/types.ts'

// Level 16 ("harvest") redrawn as two pictures (public/levels/redesign/), the zones measured on their pixel
// difference. The drawn scene's differences: the flying crow, which turns around in the drawn scene, turns brown
// (pictures do not move); the scarecrow's hat turns green instead of vanishing; the crow on its arm, the hay bale
// (tied with a red ribbon instead of vanishing) and one basket's apples as drawn; the tractor's exhaust, which bobs
// in the drawn scene, loses its upper puffs. Touched up by hand: Gemini redrew the whole exhaust as one plume, so B
// got A's three puffs back with the upper two painted over with sky, and the scarecrow's shoulder next to the
// removed crow, lightened by Gemini, was restored from A.
export const level016Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-016-a.avif',
  imageB: 'levels/redesign/level-016-b.avif',
  viewBox: { w: 1312, h: 816 },
  differences: [
    // The crow flying over the tree: black in A, brown in B.
    { x: 427, y: 192, r: 40 },
    // The scarecrow's hat: brown in A, green in B (the center leans left, clear of the crow's zone).
    { x: 706, y: 468, r: 40 },
    // The crow on the scarecrow's right arm, only in A.
    { x: 782, y: 505, r: 40 },
    // The upper exhaust puffs over the tractor, only in A.
    { x: 650, y: 302, r: 42 },
    // The right hay bale: plain in A, tied with a red ribbon in B.
    { x: 1166, y: 733, r: 70 },
    // The apples in the left basket: red in A, green in B.
    { x: 247, y: 733, r: 46 },
  ],
}
