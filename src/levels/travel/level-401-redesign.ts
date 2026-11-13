import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 401 ("paris") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on their
// pixel difference. Small parts only (docs/redesign-travel.md): the flag on the tower's tip, one of three geraniums,
// the coffee cup, the painter's beret, the baguette, the cat, the round tree's blossoms, the hanging basket's flowers.
// Gemini redrew the tower's lattice, the trees, the ivy and every flower box besides, so B is A with only the listed
// changes of Gemini's laid over it. It left the coffee cup on the table: taken away by hand on A's picture (the wall
// panel copied from just above, the table's back edge from just left, the table top filled smoothly).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The small French flag on the tip of the Eiffel Tower: there in A, gone in B.
  { x: 1332, y: 97, r: 79 },
  // The right one of the three red geraniums in the window box of the right house: there in A, gone in B.
  { x: 2130, y: 960, r: 79 },
  // The coffee cup and its saucer on the café table: there in A, gone in B.
  { x: 470, y: 1462, r: 79 },
  // The painter's beret: black in A, red in B.
  { x: 1632, y: 1365, r: 79 },
  // The baguette in the bicycle's basket: there in A, gone in B.
  { x: 2354, y: 1428, r: 79 },
  // The cat on the left house's window ledge: there in A, gone in B.
  { x: 662, y: 950, r: 80 },
  // The pink blossoms of the small round tree by the painter: there in A, gone in B.
  { x: 1980, y: 1360, r: 120 },
  // The flowers in the basket hanging from the street lamp: there in A, an empty basket in B.
  { x: 1032, y: 1294, r: 79 },
]

export const level401Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-401-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-401-b-<n>.webp).
  imageB: 'levels/redesign/level-401-a.avif',
  patchesB: zonePatches('levels/redesign/level-401-b', differences, viewBox),
  viewBox,
  differences,
}
