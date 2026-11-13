import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 328 ("memoryWorkshop") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference, small parts of objects: the lamp's bulb gone (the shade dark), the screwdriver's
// handle blue, the ladder's middle rung gone, the toolbox's handle gone, the yellow can's wire handle gone. With the bulb out
// the wall and the pegboard came out a shade darker in B, so a cut-out would show the rung's shadow and a seam round
// the lamp: B is its own picture, whole (nothing else differs).
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The light bulb in the red hanging lamp: lit in A, gone in B.
  { x: 849, y: 285, r: 130 },
  // The screwdriver's handle on the pegboard: red in A, blue in B.
  { x: 1210, y: 540, r: 102 },
  // The middle rung of the ladder at the left: there in A, gone in B.
  { x: 243, y: 1231, r: 125 },
  // The black handle on top of the red toolbox: there in A, gone in B.
  { x: 815, y: 1420, r: 102 },
  // The wire handle of the yellow paint can: there in A, gone in B.
  { x: 1318, y: 1482, r: 102 },
]

export const level328Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-328-a.avif',
  imageB: 'levels/redesign/level-328-b.avif',
  viewBox,
  differences,
}
