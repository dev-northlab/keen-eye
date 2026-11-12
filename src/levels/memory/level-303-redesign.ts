import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 303 ("memoryBeach") as two portrait pictures (public/levels/redesign/, Gemini's full 1696×2528), the zones
// measured on their pixel difference: the sailboat gone from the sea, the parasol's canopy yellow, a crab new right of
// the towel. B is A with only these changes of Gemini's laid over it (it also redrew a few pebbles and dune grass: left
// out).
const viewBox = { w: 1696, h: 2528 }
const differences: Difference[] = [
  // The sailboat with the red hull: there in A, gone in B.
  { x: 1118, y: 1118, r: 260 },
  // The parasol's canopy: pink in A, yellow in B.
  { x: 1158, y: 1722, r: 235 },
  // The crab right of the towel: not in A, there in B.
  { x: 1536, y: 2392, r: 175 },
]

export const level303Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-303-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-303-b-<n>.webp).
  imageB: 'levels/redesign/level-303-a.avif',
  patchesB: zonePatches('levels/redesign/level-303-b', differences, viewBox),
  viewBox,
  differences,
}
