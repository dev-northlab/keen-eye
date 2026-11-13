import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 404 ("tokyo") as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured on their
// pixel difference. Small parts only (docs/redesign-travel.md): Tokyo Tower's antenna, the train's pantograph, the
// rightmost paper lantern, the umbrella, the white-eye on the left cherry tree, the torii's plaque, the stone
// lantern's knob, the cat. Gemini also redrew the cherry trees and the grass everywhere: B is A with only the listed
// changes of Gemini's laid over it. It kept the stone lantern's knob (it added a ring under it): taken away by hand on
// A's picture, the blurred post and grass behind copied from just above.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // The antenna on top of Tokyo Tower: there in A, gone in B.
  { x: 2097, y: 310, r: 123 },
  // The pantograph on the bullet train's roof: there in A, gone in B.
  { x: 817, y: 1084, r: 79 },
  // The rightmost paper lantern on the string: there in A, gone in B.
  { x: 2295, y: 187, r: 79 },
  // The woman's paper umbrella: red in A, blue in B.
  { x: 1259, y: 1329, r: 110 },
  // The white-eye bird on top of the left cherry tree: there in A, gone in B.
  { x: 255, y: 558, r: 79 },
  // The black name plaque between the torii's beams: there in A, gone in B.
  { x: 1740, y: 1342, r: 79 },
  // The round knob on the stone lantern's roof: there in A, gone in B.
  { x: 1536, y: 1378, r: 79 },
  // The cat at the foot of the right cherry tree: there in A, gone in B.
  { x: 2484, y: 1538, r: 99 },
]

export const level404Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-404-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-404-b-<n>.webp).
  imageB: 'levels/redesign/level-404-a.avif',
  patchesB: zonePatches('levels/redesign/level-404-b', differences, viewBox),
  viewBox,
  differences,
}
