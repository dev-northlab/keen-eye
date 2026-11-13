import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 311 ("memoryWinter") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: a red bird new on the birdhouse roof, the snowman's scarf green, the rightmost
// of the three big snowballs gone, the sled gone. Gemini also redrew the house's and trees' edges a little and left
// runner tracks where the sled stood: left out, B is A with its four changes laid over it, one cut-out per zone.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The red bird on the birdhouse roof at the left: not in A, there in B.
  { x: 229, y: 643, r: 110 },
  // The big snowman's scarf: red in A, green in B.
  { x: 490, y: 1420, r: 105 },
  // The rightmost of the three big snowballs: there in A, gone in B.
  { x: 1515, y: 1570, r: 120 },
  // The red sled at the bottom right: there in A, gone in B.
  { x: 1370, y: 2075, r: 320 },
]

export const level311Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-311-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-311-b-<n>.webp).
  imageB: 'levels/redesign/level-311-a.avif',
  patchesB: zonePatches('levels/redesign/level-311-b', differences, viewBox),
  viewBox,
  differences,
}
