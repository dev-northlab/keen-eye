import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 310 ("memoryCamp") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the red canoe on the lake gone, the tent blue, a fly agaric new on the meadow.
// Gemini redrew the grass all over the meadow (the same objects in the same places), so a cut-out would show a seam:
// B is its own picture, whole.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The red canoe on the lake: there in A, gone in B.
  { x: 1018, y: 1262, r: 250 },
  // The tent at the left: orange in A, blue in B.
  { x: 395, y: 1610, r: 400 },
  // The red fly agaric on the meadow below the fire: not in A, there in B.
  { x: 920, y: 2098, r: 140 },
]

export const level310Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-310-a.avif',
  imageB: 'levels/redesign/level-310-b.avif',
  viewBox,
  differences,
}
