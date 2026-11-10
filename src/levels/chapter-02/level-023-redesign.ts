import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 23 ("park") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is small, all still (pictures do not move): three apples grow on the third tree,
// the kite's left half turns yellow, a duckling swims beside the duck, the fountain's jet is off, the bench's backrest
// turns blue, the dog gets a black ear, the ice cream cart's parasol turns light blue. Touched up by hand: B is A with
// only Gemini's apples, kite, duckling and the grass behind the jet laid over it. Gemini drew four apples (three are
// taken), took the fountain's column away with the jet (the column stays, its cap painted over where the jet stood),
// drew a new taller bench and another ice cream (those stay as in A), and left the parasol pink: the backrest and the
// parasol are recolored by hand, keeping their shading. The dog in A has no ears, so its black ear is drawn by hand.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The kite: all red in A, its left half yellow in B.
  { x: 1968, y: 360, r: 78 },
  // Three red apples on the third tree from the left, only in B.
  { x: 848, y: 568, r: 98 },
  // The fountain's water jet, only in A.
  { x: 1312, y: 1170, r: 125 },
  // A duckling right of the yellow duck in the pond, only in B.
  { x: 614, y: 1212, r: 60 },
  // The ice cream cart's parasol: pink in A, light blue in B.
  { x: 2032, y: 1296, r: 115 },
  // The backrest of the bench left of the fountain: brown in A, blue in B.
  { x: 984, y: 1382, r: 100 },
  // The dog's black ear, only in B.
  { x: 2304, y: 1402, r: 60 },
]

export const level023Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-023-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-023-b-<n>.webp).
  imageB: 'levels/redesign/level-023-a.avif',
  patchesB: zonePatches('levels/redesign/level-023-b', differences, viewBox),
  viewBox,
  differences,
}
