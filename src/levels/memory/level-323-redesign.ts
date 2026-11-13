import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 323 ("memoryCastle") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the shield over the gate red, the purple banner right of the gate gone, a bucket
// new under the well's roof, the hay cart moved right (its zone covers both places; Gemini turned its shafts to the
// left too), the top barrel gone. Gemini redrew the wall's stones and the courtyard's flagstones all over (the same
// objects in the same places), so a cut-out would show a seam: B is its own picture, whole.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The shield with a white cross above the gate: blue in A, red in B.
  { x: 848, y: 643, r: 102 },
  // The purple banner right of the gate: there in A, gone in B.
  { x: 1150, y: 790, r: 170 },
  // The metal bucket hanging under the well's roof: not in A, there in B.
  { x: 482, y: 1439, r: 102 },
  // The hay cart: in the middle in A, further right in B.
  { x: 965, y: 1640, r: 295 },
  // The top barrel of the stack of three: there in A, gone in B.
  { x: 1398, y: 2160, r: 115 },
]

export const level323Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-323-a.avif',
  imageB: 'levels/redesign/level-323-b.avif',
  viewBox,
  differences,
}
