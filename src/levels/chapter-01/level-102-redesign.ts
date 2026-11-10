import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 102 ("vegetableBeds") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. The drawn scene's differences, smaller where they can be: the bird on the
// fence, which turns in the drawn scene, turns yellow; the pinwheel, which spins the other way in the drawn scene,
// gets one purple blade, and the bee, which hovers faster in the drawn scene, is gone (pictures do not move); one
// tomato turns green; the carrot is gone; the shovel, which leans in the drawn scene, gets a red handle; the pumpkin
// turns pale instead of growing. Touched up by hand: Gemini redrew the whole garden, so B is A with only Gemini's
// bird, shovel, pumpkin and the grass where the bee was laid over it. Gemini also turned three blades purple (A's
// red blade recoloured purple instead), greened tomatoes on the second and fifth plants instead of the fourth (A's
// tomato recoloured green) and removed the ninth carrot instead of the sixth (its bare soil laid over the sixth).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The bird on the fence left of the scarecrow: red in A, yellow in B.
  { x: 881, y: 466, r: 73 },
  // The pinwheel's top blade: red in A, purple in B.
  { x: 1326, y: 952, r: 73 },
  // The middle tomato of the fourth tomato plant: red in A, green in B.
  { x: 2083, y: 763, r: 73 },
  // The sixth carrot from the left, only in A.
  { x: 573, y: 1100, r: 96 },
  // The shovel's handle in the beet bed: wooden in A, red in B.
  { x: 659, y: 1324, r: 90 },
  // The third pumpkin: orange in A, pale yellow in B.
  { x: 1924, y: 1446, r: 110 },
  // The bee above the left end of the lettuce bed, only in A.
  { x: 1700, y: 962, r: 78 },
]

export const level102Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-102-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-102-b-<n>.webp).
  imageB: 'levels/redesign/level-102-a.avif',
  patchesB: zonePatches('levels/redesign/level-102-b', differences, viewBox),
  viewBox,
  differences,
}
