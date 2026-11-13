import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 407 ("yerevan") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): Sis's snow cap, the clock's hands, a flower pot
// on the ledge, the shutters, the grapes, the fountain's middle jet, the coffee cups, two apricots. Gemini also redrew
// the cornices, the trees and the people and moved the right flower pot further along the ledge instead of taking the
// middle one: B is A with only the listed changes of Gemini's laid over it (the right pot gone, its new place left
// out). It drew one hand at three o'clock instead of the two at four, and took both cups off the table. It kept the
// apricots: two at the right of the tree are covered by hand on A's picture with leaves from the left of its crown.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The snow cap of the small left peak (Sis): there in A, bare rock in B.
  { x: 468, y: 668, r: 77 },
  // The clock's hands: four o'clock in A, a single hand at three in B.
  { x: 819, y: 582, r: 73 },
  // The right one of the three flower pots on the ledge: there in A, gone in B.
  { x: 636, y: 1010, r: 73 },
  // The shutters of the window on the right building: green in A, brown in B.
  { x: 1994, y: 1033, r: 84 },
  // The bunch of purple grapes on the vine: there in A, gone in B.
  { x: 2504, y: 1090, r: 82 },
  // The middle, tallest jet of the fountain: there in A, gone in B.
  { x: 1890, y: 1364, r: 136 },
  // The coffee cups on the café table: there in A, gone in B.
  { x: 1082, y: 1500, r: 81 },
  // Two apricots at the right of the apricot tree: there in A, leaves in B.
  { x: 437, y: 1378, r: 73 },
]

export const level407Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-407-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-407-b-<n>.webp).
  imageB: 'levels/redesign/level-407-a.avif',
  patchesB: zonePatches('levels/redesign/level-407-b', differences, viewBox),
  viewBox,
  differences,
}
