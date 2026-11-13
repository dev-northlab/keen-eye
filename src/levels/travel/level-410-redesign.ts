import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 410 ("newYork") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): the torch's flame, two crown rays, the bush's
// yellow flowers, the water tank's lid, a tree of the rooftop garden, the ferry's hull, the gull, the Empire State
// Building's spire. Gemini also redrew the trees on the island, the people on the ferry and the water: B is A with only
// the listed changes of Gemini's laid over it. It kept the spire: taken away by hand on A's picture (the sky filled
// smoothly).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The golden flame of the statue's torch: there in A, gone in B.
  { x: 510, y: 303, r: 73 },
  // Two rays at the left of the statue's crown: there in A, gone in B.
  { x: 424, y: 434, r: 73 },
  // The yellow flowers of the bush at the bottom left: there in A, gone in B.
  { x: 172, y: 1484, r: 208 },
  // The cone lid of the wooden water tank: there in A, gone in B.
  { x: 2322, y: 747, r: 73 },
  // The middle tree of the rooftop garden: there in A, gone in B.
  { x: 1637, y: 699, r: 96 },
  // The ferry's hull: orange in A, blue in B.
  { x: 1410, y: 1400, r: 257 },
  // The gull flying left of the tall dark tower: there in A, gone in B.
  { x: 1184, y: 453, r: 73 },
  // The spire on top of the Empire State Building: there in A, gone in B.
  { x: 1837, y: 281, r: 73 },
]

export const level410Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-410-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-410-b-<n>.webp).
  imageB: 'levels/redesign/level-410-a.avif',
  patchesB: zonePatches('levels/redesign/level-410-b', differences, viewBox),
  viewBox,
  differences,
}
