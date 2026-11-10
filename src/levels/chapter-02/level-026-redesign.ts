import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 26 ("market") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): the lamp's shade
// turns green, the left awning's middle red stripe turns blue, one tomato in the middle of its crate turns yellow, the
// scale's right pan is gone, a ginger cat sits in front of the yellow-striped stall, the red shirt of the woman
// between the stalls turns teal, the seller's yellow balloon turns green. Touched up by hand: B is A with only
// Gemini's shade, stripe, cat and balloon laid over it. Gemini also turned the next white stripe blue and the green
// crate into tomatoes (those stay as in A), and left the tomatoes, the pan and the shirt as they were: the tomato and
// the shirt are recolored by hand, keeping their shading, and the pan painted out with the wall below it.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The shade of the lamp hanging above the street: dark grey in A, green in B.
  { x: 1318, y: 638, r: 66 },
  // The seller's balloon: yellow in A, green in B.
  { x: 2336, y: 770, r: 82 },
  // The middle stripe of the left awning: red in A, blue in B.
  { x: 496, y: 934, r: 60 },
  // One tomato in the middle of the crate on the green stall: red in A, yellow in B.
  { x: 1190, y: 1042, r: 60 },
  // The scale's right pan, only in A.
  { x: 1406, y: 1046, r: 60 },
  // The shirt of the woman between the first and the second stall: red in A, teal in B.
  { x: 820, y: 1190, r: 72 },
  // A ginger cat in front of the yellow-striped stall, only in B.
  { x: 1800, y: 1272, r: 85 },
]

export const level026Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-026-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-026-b-<n>.webp).
  imageB: 'levels/redesign/level-026-a.avif',
  patchesB: zonePatches('levels/redesign/level-026-b', differences, viewBox),
  viewBox,
  differences,
}
