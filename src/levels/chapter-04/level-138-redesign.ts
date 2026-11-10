import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 138 ("crabPools") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones
// measured on their pixel difference. Each change is a part of an object, all still (pictures do not move): the orange
// starfish in the left pool loses its top arm, the right fish in the upper right pool turns blue, the red anemone
// orange, the snail's shell yellow, the left purple shell loses its stripes, the left crab its right claw, the middle
// crab's shell turns blue, a hermit crab sits on the rock, a mussel goes and the orange scallop shell turns purple.
// B is A with only Gemini's fish, anemone, snail, shell, hermit crab, mussel and scallop laid over it. Fixed by hand:
// Gemini kept the starfish's five arms and the crab's claw, so the top arm and the claw are covered with the pool
// floor and the rock above them; it turned the middle crab blue all over, so only A's crab shell is recoloured.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The top arm of the orange starfish in the left pool, only in A.
  { x: 684, y: 788, r: 73 },
  // The right one of the two small fish in the upper right pool: orange in A, blue in B.
  { x: 1764, y: 764, r: 73 },
  // The left anemone in the big bottom pool: red in A, orange in B.
  { x: 984, y: 1360, r: 84 },
  // The shell of the snail at the lower edge of the big pool: brown in A, yellow in B.
  { x: 1364, y: 1476, r: 73 },
  // The white stripes of the left purple shell in the small bottom right pool, only in A.
  { x: 2036, y: 1384, r: 73 },
  // The right claw of the red crab on the left, only in A.
  { x: 456, y: 1084, r: 73 },
  // The shell of the middle crab: red in A, blue in B.
  { x: 984, y: 1108, r: 73 },
  // The hermit crab in a yellow shell on the rock, only in B.
  { x: 1696, y: 996, r: 73 },
  // The lower right one of the four dark blue mussels, only in A.
  { x: 2232, y: 1044, r: 73 },
  // The scallop shell at the bottom right corner: orange in A, purple in B.
  { x: 2492, y: 1540, r: 73 },
]

export const level138Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-138-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-138-b-<n>.webp).
  imageB: 'levels/redesign/level-138-a.avif',
  patchesB: zonePatches('levels/redesign/level-138-b', differences, viewBox),
  viewBox,
  differences,
}
