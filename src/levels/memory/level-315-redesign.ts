import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 315 ("memoryMarket") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the bananas green, a pigeon new on the right end of the awning, the top right
// orange gone from the pile, the watermelon gone. Gemini also moved the stall's shadow on the cobbles a little: left
// out, B is A with its four changes laid over it, one cut-out per zone.
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The bunch of bananas in the middle crate: yellow in A, green in B.
  { x: 850, y: 1358, r: 170 },
  // The grey pigeon on the right end of the awning: not in A, there in B.
  { x: 1585, y: 898, r: 102 },
  // The top right orange of the pile: there in A, gone in B.
  { x: 425, y: 1315, r: 102 },
  // The big watermelon on the cobbles at the bottom left: there in A, gone in B.
  { x: 349, y: 2168, r: 230 },
]

export const level315Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-315-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-315-b-<n>.webp).
  imageB: 'levels/redesign/level-315-a.avif',
  patchesB: zonePatches('levels/redesign/level-315-b', differences, viewBox),
  viewBox,
  differences,
}
