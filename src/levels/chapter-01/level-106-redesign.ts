import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 106 ("horseStables") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. The drawn scene's differences, smaller where they can be: the grey horse's
// right ear, which twitches in the drawn scene, turns dark brown, and the dog's tail, which wags faster, turns white
// (pictures do not move); the hay net's cords turn red instead of the net growing; the left horseshoe turns silver
// instead of being gone; the right horseshoe is gone instead of tilting; the third name plate turns orange; the
// bucket on the second door turns blue instead of moving; the folded rug loses one of its three stripes. Touched up
// by hand: B is A with only Gemini's eight changes laid over it. Gemini also turned the grey horse's left ear dark
// brown and touched the flower in the window, the ivy on the left and the straw under the trunk: those stay as in A.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The hay net in the third stall: yellow cords in A, red in B.
  { x: 1618, y: 543, r: 132 },
  // The horseshoe above the leftmost stall: golden in A, silver in B.
  { x: 377, y: 365, r: 81 },
  // The horseshoe above the rightmost stall, only in A.
  { x: 2250, y: 384, r: 73 },
  // The grey horse's right ear: grey in A, dark brown in B.
  { x: 1071, y: 484, r: 73 },
  // The name plate on the third stall door: yellow in A, orange in B.
  { x: 1621, y: 837, r: 73 },
  // The bucket on the second stall door: red in A, blue in B.
  { x: 1141, y: 993, r: 73 },
  // The tail of the dog lying on the floor: light brown in A, white in B.
  { x: 539, y: 1460, r: 73 },
  // The folded blue rug on the trunk: three yellow stripes in A, two in B.
  { x: 1790, y: 1328, r: 79 },
]

export const level106Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-106-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-106-b-<n>.webp).
  imageB: 'levels/redesign/level-106-a.avif',
  patchesB: zonePatches('levels/redesign/level-106-b', differences, viewBox),
  viewBox,
  differences,
}
