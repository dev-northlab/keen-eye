import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 416 ("london") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on their
// pixel difference. Small parts only (docs/redesign-travel.md): the clock's hands, the Union flag, a capsule of the
// London Eye, a passenger in the bus's upper left window, the telephone box's sign, the umbrella, Big Ben's finial, the
// cab's roof light. Gemini also redrew the trees, the flower beds, the water and the other passengers, set the clock to
// twelve and took the capsule at the very top of the wheel rather than the top right one: B is A with only the listed
// changes of Gemini's laid over it. It kept Big Ben's finial and the cab's roof light (only shrank it): both are taken
// away by hand on A's picture (the sky filled smoothly; the pavement, curb and roof filled across row by row).
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The clock's hands on Big Ben's front face: twenty past ten in A, both at twelve in B.
  { x: 336, y: 478, r: 108 },
  // The Union flag on the Victoria Tower's pole: there in A, a bare pole in B.
  { x: 1423, y: 354, r: 60 },
  // The capsule at the very top of the London Eye: there in A, gone in B.
  { x: 2063, y: 142, r: 60 },
  // The bus's upper left window: empty in A, a passenger in green in B.
  { x: 745, y: 1370, r: 60 },
  // The sign (and its crown) at the top of the telephone box: there in A, gone in B.
  { x: 1938, y: 1398, r: 60 },
  // The umbrella of the person at the right: black in A, red in B.
  { x: 2340, y: 1377, r: 109 },
  // The golden finial on top of Big Ben's spire: there in A, gone in B.
  { x: 338, y: 62, r: 60 },
  // The yellow light on the cab's roof: there in A, gone in B.
  { x: 1548, y: 1466, r: 60 },
]

export const level416Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-416-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-416-b-<n>.webp).
  imageB: 'levels/redesign/level-416-a.avif',
  patchesB: zonePatches('levels/redesign/level-416-b', differences, viewBox),
  viewBox,
  differences,
}
