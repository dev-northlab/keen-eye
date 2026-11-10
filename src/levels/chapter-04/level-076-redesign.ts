import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 76 ("storm") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the right wing of the
// highest gull turns grey, the right of the two low gulls gets black wing tips, the yellow container on the ship turns purple, the
// bell in the bell buoy dark grey, the red parts of the upper life ring yellow, a small dark rock sticks out below the
// beach ball, the dark rock at the bottom left turns sandy brown, the white curl of foam and the driftwood at the bottom
// are gone. B is A with only these changes laid over it. Fixed by hand: Gemini turned the red container on top purple,
// so A's own yellow container is tinted purple instead. The yellow lightning bolt is gone from both pictures (cleared with
// Gemini's cloud, A's white streaks kept), and A's highest gull gets a grey right wing in its place as a difference.
// Gemini's redrawn surf is left out.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The right wing of the highest gull: white in A, grey in B.
  { x: 1272, y: 108, r: 60 },
  // The wing tips of the right one of the two low gulls above the ship: white in A, black in B.
  { x: 1641, y: 575, r: 72 },
  // The middle container on the cargo ship: yellow in A, purple in B.
  { x: 1346, y: 937, r: 60 },
  // The bell inside the red bell buoy: yellow in A, dark grey in B.
  { x: 2296, y: 1129, r: 60 },
  // The upper life ring on the left: red and white in A, yellow and white in B.
  { x: 407, y: 1298, r: 95 },
  // A small dark rock below the beach ball, only in B.
  { x: 2064, y: 1354, r: 140 },
  // The rock at the bottom left: dark in A, sandy brown in B.
  { x: 632, y: 1540, r: 147 },
  // The white curl of foam at the bottom, left of the yellow fish, only in A.
  { x: 1062, y: 1518, r: 102 },
  // The driftwood at the bottom right corner, only in A.
  { x: 2485, y: 1551, r: 95 },
]

export const level076Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-076-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-076-b-<n>.webp).
  imageB: 'levels/redesign/level-076-a.avif',
  patchesB: zonePatches('levels/redesign/level-076-b', differences, viewBox),
  viewBox,
  differences,
}
