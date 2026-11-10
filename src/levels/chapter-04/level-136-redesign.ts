import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 136 ("boatPort") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the blue house's
// door turns red, the top crate of the stack goes, a seagull stands on the left pier, the life ring by the left pier
// turns yellow, the fishing man wears a dark blue cap, the middle boat's cabin roof stripe turns blue, the rowboat
// loses its white stripe, the green-striped boat gets a third window, the sailboat's pennant turns red and the left
// buoy's ball red. B is A with only these changes of Gemini's laid over it. Fixed by hand: Gemini also took away a
// bottom crate, so only the wall behind the top crate is taken; it turned the middle boat's hull stripe blue too, so
// only the roof is taken; it redrew the rowboat longer, so A's own stripe is painted over with the red hull.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The door of the blue house, second from the left: green in A, red in B.
  { x: 448, y: 732, r: 73 },
  // The top crate of the stack of three on the quay, only in A.
  { x: 1104, y: 668, r: 73 },
  // The seagull standing on the left pier by the quay, only in B.
  { x: 648, y: 936, r: 73 },
  // The life ring by the left pier: red and white in A, yellow and white in B.
  { x: 824, y: 1316, r: 73 },
  // The dark blue cap of the man fishing on the right pier, only in B.
  { x: 1840, y: 884, r: 73 },
  // The stripe on the middle boat's cabin roof: red in A, blue in B.
  { x: 1308, y: 1036, r: 80 },
  // The white stripe of the small red rowboat, only in A.
  { x: 1244, y: 1468, r: 96 },
  // The third round window between the two of the green-striped boat's cabin, only in B.
  { x: 2300, y: 1276, r: 73 },
  // The pennant on top of the sailboat's mast: blue in A, red in B.
  { x: 2544, y: 988, r: 73 },
  // The ball on top of the yellow buoy at the left: yellow in A, red in B.
  { x: 372, y: 1396, r: 73 },
]

export const level136Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-136-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-136-b-<n>.webp).
  imageB: 'levels/redesign/level-136-a.avif',
  patchesB: zonePatches('levels/redesign/level-136-b', differences, viewBox),
  viewBox,
  differences,
}
