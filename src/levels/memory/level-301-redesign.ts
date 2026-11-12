import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 301 ("memoryKitchen") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference. "Memory" changes stay big, to be remembered in 5 seconds: the wall clock gone, the
// teapot blue, the top orange gone. B is A with only these changes of Gemini's laid over it (it also redrew the herbs'
// leaves a little: left out).
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The round wall clock with the blue rim: there in A, gone in B.
  { x: 1328, y: 890, r: 215 },
  // The teapot on the table: red in A, blue in B.
  { x: 382, y: 1722, r: 235 },
  // The top orange in the yellow bowl: there in A, gone in B.
  { x: 988, y: 1588, r: 120 },
]

export const level301Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-301-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-301-b-<n>.webp).
  imageB: 'levels/redesign/level-301-a.avif',
  patchesB: zonePatches('levels/redesign/level-301-b', differences, viewBox),
  viewBox,
  differences,
}
