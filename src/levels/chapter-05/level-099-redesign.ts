import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 99 ("robotFactory") redrawn as two pictures (public/levels/redesign/, Gemini's full 2752×1536), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the
// screen's fourth bar is as short as the first, the big gear turns blue, the hammer goes from the tool board, the
// warning light turns green, the crane's claw yellow, the belt robot's head loses its antenna, the bucket's paint turns
// green, the top crate goes, the yellow robot's eyes turn red and the blue robot's body and head orange. Gemini
// returned B at another size, redrawn (a blurred floor, the belt and the robots moved), so B is A with every change
// painted by hand: recoloured with the shading kept, the bar's top, the hammer, the antenna and the crate covered with
// the screen, wood, wall and floor beside them (seamless clones), the crates' lids under the top one mirrored from
// their ends.
const viewBox = { w: 2752, h: 1536 }
const differences: Difference[] = [
  // The fourth bar on the wall screen: tall in A, as short as the first in B.
  { x: 691, y: 480, r: 62 },
  // The big gear on the wall: yellow in A, blue in B.
  { x: 1032, y: 456, r: 100 },
  // The hammer in the middle of the tool board, only in A.
  { x: 1690, y: 532, r: 119 },
  // The warning light on the wall at the right: orange in A, green in B.
  { x: 2478, y: 328, r: 62 },
  // The claw at the end of the crane arm: grey in A, yellow in B.
  { x: 2134, y: 568, r: 85 },
  // The red antenna on the small robot head riding on the belt, only in A.
  { x: 1032, y: 1008, r: 62 },
  // The paint in the bucket: red in A, green in B.
  { x: 346, y: 1396, r: 62 },
  // The top crate of the stack, only in A.
  { x: 694, y: 1318, r: 75 },
  // The eyes of the yellow robot, the second in the row: cyan in A, red in B.
  { x: 2135, y: 1308, r: 62 },
  // The body and head of the blue robot, the third in the row: blue in A, orange in B.
  { x: 2338, y: 1347, r: 88 },
]

export const level099Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-099-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-099-b-<n>.webp).
  imageB: 'levels/redesign/level-099-a.avif',
  patchesB: zonePatches('levels/redesign/level-099-b', differences, viewBox),
  viewBox,
  differences,
}
