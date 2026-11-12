import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 309 ("memoryReef") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the right one of the three yellow fish gone, a sea turtle new at the top right,
// the octopus red. Gemini changed nothing else; B is A with its changes laid over it, one cut-out per zone.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The right one of the three yellow fish: there in A, gone in B.
  { x: 902, y: 1006, r: 125 },
  // The green sea turtle at the top right: not in A, there in B.
  { x: 1292, y: 568, r: 260 },
  // The octopus at the bottom right: purple in A, red in B.
  { x: 1306, y: 2150, r: 290 },
]

export const level309Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-309-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-309-b-<n>.webp).
  imageB: 'levels/redesign/level-309-a.avif',
  patchesB: zonePatches('levels/redesign/level-309-b', differences, viewBox),
  viewBox,
  differences,
}
