import type { Difference, LevelPictures } from '../../engine/types.ts'

// Level 326 ("memoryBathroom") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference. From here on "memory" changes are small parts of objects: the towel's white
// stripes gone, the yellow bottle's cap red, one of the two toothbrushes gone, a blue bow tie new on the rubber duck,
// the right purple slipper gone. The gone slipper leaves a soft shadow fainter than a cut-out's threshold, so a cut-out
// would leave its ghost on A: B is its own picture, whole (Gemini only nudged some foam and steam besides).
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The two white stripes across the bottom of the green towel: there in A, gone in B.
  { x: 340, y: 510, r: 175 },
  // The cap of the yellow shampoo bottle: dark grey in A, red in B.
  { x: 882, y: 840, r: 102 },
  // The second toothbrush in the pink cup: there in A, gone in B.
  { x: 1170, y: 1150, r: 102 },
  // The blue bow tie on the rubber duck's neck: not in A, there in B.
  { x: 636, y: 1912, r: 102 },
  // The right one of the two purple slippers: there in A, gone in B.
  { x: 1513, y: 1898, r: 105 },
]

export const level326Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-326-a.avif',
  imageB: 'levels/redesign/level-326-b.avif',
  viewBox,
  differences,
}
