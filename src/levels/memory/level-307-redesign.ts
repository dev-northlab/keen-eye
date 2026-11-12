import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 307 ("memoryStreet") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the dog gone from the pavement, a red fire hydrant new there, the car yellow.
// Gemini stood the hydrant right by the dog's place, not at the pavement's end, so their zones are the smallest
// allowed and pulled apart (the hydrant's cut-out also takes the dog's tail away). B is A with only these changes of
// Gemini's laid over it (it also redrew a few flowers in the shop's window boxes: left out).
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The brown dog on the pavement: there in A, gone in B.
  { x: 1190, y: 1610, r: 105 },
  // The red fire hydrant on the pavement: not in A, there in B.
  { x: 1410, y: 1640, r: 105 },
  // The car in the middle of the road: blue in A, yellow in B.
  { x: 520, y: 2054, r: 270 },
]

export const level307Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-307-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-307-b-<n>.webp).
  imageB: 'levels/redesign/level-307-a.avif',
  patchesB: zonePatches('levels/redesign/level-307-b', differences, viewBox),
  viewBox,
  differences,
}
