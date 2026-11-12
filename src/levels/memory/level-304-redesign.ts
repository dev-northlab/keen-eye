import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 304 ("memoryBedroom") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the big painting in the blue frame gone, the duvet green, the teddy bear moved
// to the right. The move's zone covers both places of the bear, as in the drawn scene; so the duvet's zone is only its
// middle, and B is a whole picture: a cut-out of that zone would leave the duvet's ends blue.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The big landscape painting in the blue frame: there in A, gone in B.
  { x: 346, y: 452, r: 290 },
  // The duvet on the bed: blue in A, green in B.
  { x: 830, y: 1570, r: 180 },
  // The teddy bear on the floor: at the left in A, moved to the right in B (the zone covers both places).
  { x: 480, y: 2085, r: 430 },
]

export const level304Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-304-a.avif',
  imageB: 'levels/redesign/level-304-b.avif',
  viewBox,
  differences,
}
