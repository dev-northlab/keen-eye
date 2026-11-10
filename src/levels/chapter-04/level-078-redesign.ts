import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 78 ("cruise") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Each change is a part of an object, all still (pictures do not move): the gull at the top left
// gets black wing tips, the lower gull left of the sun turns grey, the right funnel blue, the blue pennant purple, the
// yellow flag on the top deck green, the left life ring on the liner's side yellow, the purple shirt of the man on the
// top deck teal, the tug's hull blue and the red buoy at the right green. B is A with only these changes laid over it.
// The list's "small yellow box" is the yellow flag in these pictures (the box beside it is cream); Gemini turned both
// green, only the flag is taken. Its redrawn sea is left out.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The wing tips of the gull at the top left: white in A, black in B.
  { x: 328, y: 278, r: 61 },
  // The lower of the two gulls left of the sun: white in A, grey in B.
  { x: 1843, y: 448, r: 60 },
  // The right funnel: red in A, blue in B.
  { x: 1311, y: 806, r: 64 },
  // The last pennant of the string: blue in A, purple in B.
  { x: 788, y: 800, r: 60 },
  // The small flag on the top deck at the right: yellow in A, green in B.
  { x: 1573, y: 780, r: 60 },
  // The left life ring on the liner's side: red and white in A, yellow and white in B.
  { x: 751, y: 1137, r: 60 },
  // The shirt of the man on the right of the top deck: purple in A, teal in B.
  { x: 983, y: 719, r: 85 },
  // The hull of the small tug boat at the left: red in A, blue in B.
  { x: 394, y: 1424, r: 117 },
  // The buoy at the right, near the right edge: red in A, green in B.
  { x: 2297, y: 1432, r: 85 },
]

export const level078Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-078-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-078-b-<n>.webp).
  imageB: 'levels/redesign/level-078-a.avif',
  patchesB: zonePatches('levels/redesign/level-078-b', differences, viewBox),
  viewBox,
  differences,
}
