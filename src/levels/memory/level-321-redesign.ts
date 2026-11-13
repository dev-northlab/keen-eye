import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 321 ("memoryPicnic") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the kite moved right and lower (its zone covers both places), a pink butterfly
// new, the rightmost sandwich gone, the juice purple, the dog gone. Gemini redrew the meadow's grass and the blanket's
// folds all over (the same objects in the same places), so a cut-out would show a seam: B is its own picture, whole.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The yellow kite: higher and further left in A, right and lower in B.
  { x: 1135, y: 413, r: 300 },
  // The pink butterfly right of the blue one: not in A, there in B.
  { x: 1081, y: 1055, r: 130 },
  // The rightmost of the three sandwiches on the plate: there in A, gone in B.
  { x: 950, y: 1745, r: 102 },
  // The juice in the bottle: orange in A, purple in B.
  { x: 1256, y: 1683, r: 150 },
  // The brown dog at the bottom right: there in A, gone in B.
  { x: 1362, y: 2271, r: 205 },
]

export const level321Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-321-a.avif',
  imageB: 'levels/redesign/level-321-b.avif',
  viewBox,
  differences,
}
