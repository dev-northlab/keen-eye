import type { Difference, LevelPictures } from '../../engine/types.ts'
import { zonePatches } from '../picture-style.ts'

// Level 417 ("barcelona") as two pictures (public/levels/redesign/, Gemini's full 2624×1600), the zones measured on
// their pixel difference. Small parts only (docs/redesign-travel.md): the middle spire's pinnacle, the left spire's
// round window, the crane's counterweight, the crate on its hook, a parakeet, the bench's blue tiles, the red balloon,
// the yellow ball. Gemini also redrew the gardens, the city and the lizard and took both parakeets away: B is A with
// only the listed changes of Gemini's laid over it (the left parakeet). It kept the lizard's curled tail tip, too
// tangled with the tail to paint away, so the yellow ball on the sand goes instead, taken away by hand on A's picture
// with its shadow (the sand cloned from beside it).
const viewBox = { w: 2624, h: 1600 }
const differences: Difference[] = [
  // The mosaic pinnacle on the middle spire: there in A, a plain pointed tip in B.
  { x: 970, y: 259, r: 108 },
  // The round blue window of the left spire: there in A, gone in B.
  { x: 754, y: 638, r: 66 },
  // The grey counterweight on the crane's back arm: there in A, gone in B.
  { x: 1498, y: 341, r: 82 },
  // The wooden crate hanging from the crane's hook: there in A, gone in B.
  { x: 2100, y: 621, r: 60 },
  // The left one of the two parakeets in the palm: there in A, gone in B.
  { x: 2364, y: 664, r: 61 },
  // The patch of tiles in the middle of the mosaic bench: blue in A, red in B.
  { x: 1034, y: 1426, r: 136 },
  // The child's red balloon: there in A, gone in B.
  { x: 1876, y: 1326, r: 106 },
  // The yellow ball on the sand, with its shadow: there in A, gone in B.
  { x: 702, y: 1538, r: 62 },
]

export const level417Redesign: LevelPictures = {
  imageA: 'levels/redesign/level-417-a.avif',
  // B is A with cut-outs of B over it, one per zone (public/levels/redesign/level-417-b-<n>.webp).
  imageB: 'levels/redesign/level-417-a.avif',
  patchesB: zonePatches('levels/redesign/level-417-b', differences, viewBox),
  viewBox,
  differences,
}
