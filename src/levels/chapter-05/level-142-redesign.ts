import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 142 ("lunarBase") redrawn as two pictures (public/levels/redesign/, Gemini's full 2624×1632), the zones measured
// on their pixel difference. Each change is a part of an object, all still (pictures do not move): a tiny satellite
// flies above the big dome, the middle sprout's leaves turn yellow, the small dome's glass violet, the left pad light
// red, the dish antenna loses its red tip, the lowest solar panel turns dark green, the rover orange, the right crate's
// label blue, the chest badge of the astronaut with the yellow visor blue, and a crater goes. B is A with only
// Gemini's satellite, dome, pad light, panel, label, badge and crater laid over it. Fixed by hand: Gemini yellowed the
// right sprout and added a fourth one, so A's middle sprout's leaves are recoloured; it only made the dish's tip
// smaller, so A's tip is cloned out with the hill beside it; it left the rover half yellow, so A's body is recoloured
// orange; it also removed the big crater above the right one, which is left out.
const viewBox = { w: 2624, h: 1632 }
const differences: Difference[] = [
  // A tiny yellow satellite with blue panels in the sky above the big glass dome, only in B.
  { x: 1050, y: 274, r: 73 },
  // The leaves of the middle of the three sprouts in the big dome: green in A, yellow in B.
  { x: 944, y: 1046, r: 73 },
  // The glass of the small dome on the right: clear in A, violet in B.
  { x: 1836, y: 1066, r: 110 },
  // The left light of the landing pad: green in A, red in B.
  { x: 329, y: 1279, r: 73 },
  // The red tip on top of the dish antenna, only in A.
  { x: 2364, y: 806, r: 73 },
  // The lowest of the three solar panels on the right: blue in A, dark green in B.
  { x: 2294, y: 1278, r: 88 },
  // The rover's body: yellow in A, orange in B.
  { x: 1704, y: 1462, r: 92 },
  // The label on the right one of the two grey crates: yellow in A, blue in B.
  { x: 2076, y: 1490, r: 73 },
  // The chest badge of the astronaut with the yellow visor: red in A, blue in B.
  { x: 671, y: 1450, r: 73 },
  // The crater between the footprints and the astronaut with the blue visor, only in A.
  { x: 1116, y: 1534, r: 105 },
]

export const level142Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-142-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-142-b-<n>.webp).
  imageB: 'levels/redesign/level-142-a.avif',
  patchesB: zonePatches('levels/redesign/level-142-b', differences, viewBox),
  viewBox,
  differences,
}
