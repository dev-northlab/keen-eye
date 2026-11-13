import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 423 ("singapore") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): the middle Supertree's crown colour, the palms on
// the SkyPark, the orchid's flowers, the Merlion's jet, a capsule of the Flyer, the SkyPark's cantilever nose, the tip
// of the museum's left petal, the bumboat's lanterns, a small balloon. Gemini's first B made the first four (and took
// the skyway bridge away), its second edit in the same chat the next four; B is A with only those parts of the two laid
// over it. The bridge is left out (its zone would overlap the orange crown's): the balloon left of the Supertrees is
// taken away by hand in its place (a fill of sky).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The crown of the middle Supertree: purple in A, orange in B.
  { x: 1052, y: 544, r: 183 },
  // The palm trees on the SkyPark on top of Marina Bay Sands: there in A, gone in B.
  { x: 1845, y: 335, r: 212 },
  // The pink flowers of the potted orchid on the quay: there in A, only leaves in B.
  { x: 260, y: 1477, r: 128 },
  // The jet of water from the Merlion's mouth: there in A, gone in B.
  { x: 2108, y: 1330, r: 261 },
  // The capsule at the 3 o'clock place of the Flyer's rim: there in A, gone in B.
  { x: 740, y: 530, r: 60 },
  // The SkyPark's pointed cantilever nose: there in A, cut off flat in B.
  { x: 2274, y: 369, r: 60 },
  // The tip of the lotus museum's far left petal: there in A, cut off in B.
  { x: 318, y: 838, r: 60 },
  // The row of red lanterns on the bumboat: there in A, gone in B.
  { x: 980, y: 1330, r: 109 },
  // The small yellow balloon left of the Supertrees: there in A, gone in B.
  { x: 876, y: 364, r: 60 },
]

export const level423Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-423-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-423-b-<n>.webp).
  imageB: 'levels/redesign/level-423-a.avif',
  patchesB: zonePatches('levels/redesign/level-423-b', differences, viewBox),
  viewBox,
  differences,
}
